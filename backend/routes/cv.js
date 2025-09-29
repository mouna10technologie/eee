const express = require('express');
const router = express.Router();
const Candidature = require('../models/Candidature');
const auth = require('../middlewares/auth');

// 📄 GET: Récupérer tous les CV (protégé - recruteurs seulement)
router.get('/', auth, async (req, res) => {
  try {
    const candidatures = await Candidature.find({ cv: { $ne: null } })
      .select('nom prenom email posteChoisi cv niveauEtude situationFamiliale createdAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'CV récupérés avec succès',
      data: candidatures,
      total: candidatures.length
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des CV:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la récupération des CV'
    });
  }
});

// 🔍 GET: Récupérer un CV spécifique par ID (protégé)
router.get('/:id', auth, async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.id);
    
    if (!candidature) {
      return res.status(404).json({
        success: false,
        error: 'CV non trouvé'
      });
    }

    if (!candidature.cv) {
      return res.status(404).json({
        success: false,
        error: 'Aucun fichier CV associé à cette candidature'
      });
    }

    res.json({
      success: true,
      data: candidature
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du CV:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la récupération du CV'
    });
  }
});

// 📊 GET: Statistiques des CV (protégé)
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const totalCV = await Candidature.countDocuments({ cv: { $ne: null } });
    const totalCandidatures = await Candidature.countDocuments();
    const sansCV = totalCandidatures - totalCV;

    // Statistiques par poste
    const cvParPoste = await Candidature.aggregate([
      { $match: { cv: { $ne: null } } },
      { $group: { _id: "$posteChoisi", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      stats: {
        totalCV,
        totalCandidatures,
        sansCV,
        cvParPoste
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la récupération des statistiques'
    });
  }
});

module.exports = router;
