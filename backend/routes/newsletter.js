const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// ➕ POST: S'abonner à la newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email, nom, prenom, preferences } = req.body;
    
    // Validation de l'email
    if (!email) {
      return res.status(400).json({ 
        success: false,
        error: 'Email requis' 
      });
    }

    // Vérifier si l'email existe déjà
    const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });
    
    if (existingSubscriber) {
      if (existingSubscriber.statut === 'désabonné') {
        // Réactiver l'abonnement
        existingSubscriber.statut = 'actif';
        existingSubscriber.dateInscription = new Date();
        if (preferences) existingSubscriber.preferences = { ...existingSubscriber.preferences, ...preferences };
        await existingSubscriber.save();
        
        return res.status(200).json({
          success: true,
          message: 'Votre abonnement a été réactivé avec succès !',
          subscriber: existingSubscriber
        });
      } else {
        // Email déjà abonné et actif - retourner succès au lieu d'erreur
        return res.status(200).json({
          success: true,
          message: 'Vous êtes déjà abonné à notre newsletter !',
          subscriber: existingSubscriber
        });
      }
    }

    // Créer un nouvel abonné
    const newSubscriber = new Newsletter({
      email: email.toLowerCase(),
      nom,
      prenom,
      preferences: preferences || {},
      ipAddress: req.ip || req.connection.remoteAddress
    });

    const savedSubscriber = await newSubscriber.save();

    res.status(201).json({
      success: true,
      message: 'Merci pour votre abonnement ! Vous recevrez bientôt nos dernières actualités.',
      subscriber: {
        id: savedSubscriber._id,
        email: savedSubscriber.email,
        dateInscription: savedSubscriber.dateInscription
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'abonnement newsletter:', error);
    
    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        message: 'Vous êtes déjà abonné à notre newsletter !'
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Format d\'email invalide'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    });
  }
});

// ❌ POST: Se désabonner de la newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email requis'
      });
    }

    const subscriber = await Newsletter.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        error: 'Email non trouvé dans notre liste'
      });
    }

    subscriber.statut = 'désabonné';
    await subscriber.save();

    res.json({
      success: true,
      message: 'Vous avez été désabonné avec succès de notre newsletter'
    });

  } catch (error) {
    console.error('Erreur lors du désabonnement:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    });
  }
});

// 📊 GET: Statistiques newsletter (pour admin)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Newsletter.aggregate([
      {
        $group: {
          _id: '$statut',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalAbonnes = await Newsletter.countDocuments({ statut: 'actif' });
    const totalInscriptions = await Newsletter.countDocuments();
    const inscriptionsRecentes = await Newsletter.countDocuments({
      dateInscription: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      success: true,
      stats: {
        totalAbonnes,
        totalInscriptions,
        inscriptionsRecentes,
        repartitionStatuts: stats
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    });
  }
});

// 📄 GET: Liste des abonnés (pour admin)
router.get('/subscribers', async (req, res) => {
  try {
    const { page = 1, limit = 50, statut = 'actif' } = req.query;

    const subscribers = await Newsletter.find({ statut })
      .select('email nom prenom dateInscription preferences')
      .sort({ dateInscription: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Newsletter.countDocuments({ statut });

    res.json({
      success: true,
      subscribers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des abonnés:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    });
  }
});

// 📝 PUT: Mettre à jour les préférences
router.put('/preferences', async (req, res) => {
  try {
    const { email, preferences } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email requis'
      });
    }

    const subscriber = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase(), statut: 'actif' },
      { preferences },
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        error: 'Abonné non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Préférences mises à jour avec succès',
      preferences: subscriber.preferences
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour des préférences:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    });
  }
});

module.exports = router;
