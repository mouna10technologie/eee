const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Job = require('../models/Job');

// 📄 GET: Toutes les offres d'emploi
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, ville, secteur, typeContrat } = req.query;
    
    // Construction du filtre
    let filter = { actif: true };
    if (ville) filter.ville = { $regex: ville, $options: 'i' };
    if (secteur) filter.secteur = { $regex: secteur, $options: 'i' };
    if (typeContrat) filter.typeContrat = typeContrat;

    const jobs = await Job.find(filter)
      .sort({ datePublication: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Job.countDocuments(filter);

    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des jobs:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// 🔍 GET: Une offre d'emploi par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de job invalide' });
    }
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: 'Offre d\'emploi non trouvée' });
    }
    res.json(job);
  } catch (error) {
    console.error('Erreur lors de la récupération du job:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// ➕ POST: Créer une nouvelle offre d'emploi
router.post('/', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Erreur lors de la création du job:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'offre' });
  }
});

// 📝 PUT: Modifier une offre d'emploi
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de job invalide' });
    }
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedJob) {
      return res.status(404).json({ error: 'Offre d\'emploi non trouvée' });
    }
    
    res.json(updatedJob);
  } catch (error) {
    console.error('Erreur lors de la modification du job:', error);
    res.status(500).json({ error: 'Erreur lors de la modification' });
  }
});

// ❌ DELETE: Supprimer une offre d'emploi (désactiver)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de job invalide' });
    }
    const job = await Job.findByIdAndUpdate(
      id,
      { actif: false },
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({ error: 'Offre d\'emploi non trouvée' });
    }
    
    res.json({ message: 'Offre d\'emploi désactivée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du job:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

// 🎯 POST: Postuler à une offre d'emploi
router.post('/:id/apply', async (req, res) => {
  try {
    const { candidatId, message } = req.body;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de job invalide' });
    }
    const job = await Job.findById(id);
    
    if (!job) {
      return res.status(404).json({ error: 'Offre d\'emploi non trouvée' });
    }

    // Ici, vous pourriez créer une candidature dans votre modèle Candidature
    // ou ajouter le candidat à une liste de postulants dans le job
    
    res.json({ 
      message: 'Candidature envoyée avec succès',
      jobId: req.params.id,
      jobTitle: job.titre
    });
  } catch (error) {
    console.error('Erreur lors de la candidature:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de la candidature' });
  }
});

module.exports = router;
