const express = require("express");
const router = express.Router();
const multer = require("multer");
const Candidature = require("../models/Candidature");

// Configuration du stockage pour les fichiers (CV, photo, etc.)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Accepter les CV (PDF, DOC, DOCX) et les photos (JPG, PNG)
    const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
});

// ➕ POST: Créer un nouveau candidat
router.post("/", upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), async (req, res) => {
  try {
    const candidatData = {
      ...req.body,
      cv: req.files?.cv ? req.files.cv[0].filename : null,
      photo: req.files?.photo ? req.files.photo[0].filename : null,
    };

    const newCandidat = new Candidature(candidatData);
    const saved = await newCandidat.save();
    
    res.status(201).json({
      success: true,
      message: "Candidat créé avec succès",
      candidat: saved
    });
  } catch (err) {
    console.error("Erreur lors de la création du candidat:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// 📄 GET: Récupérer tous les candidats
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, statut, competences } = req.query;
    
    // Construction du filtre
    let filter = {};
    if (statut) filter.statut = statut;
    if (competences) {
      filter.competences = { $regex: competences, $options: 'i' };
    }

    const candidats = await Candidature.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Candidature.countDocuments(filter);

    res.json({
      success: true,
      candidats,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des candidats:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// 🔍 GET: Récupérer un candidat par ID
router.get("/:id", async (req, res) => {
  try {
    const candidat = await Candidature.findById(req.params.id);
    if (!candidat) {
      return res.status(404).json({ 
        success: false,
        error: "Candidat non trouvé" 
      });
    }
    
    res.json({
      success: true,
      candidat
    });
  } catch (err) {
    console.error("Erreur lors de la récupération du candidat:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// 📝 PUT: Mettre à jour un candidat
router.put("/:id", upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Ajouter les nouveaux fichiers s'ils existent
    if (req.files?.cv) updateData.cv = req.files.cv[0].filename;
    if (req.files?.photo) updateData.photo = req.files.photo[0].filename;

    const updated = await Candidature.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({ 
        success: false,
        error: "Candidat non trouvé" 
      });
    }
    
    res.json({
      success: true,
      message: "Candidat mis à jour avec succès",
      candidat: updated
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du candidat:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// ❌ DELETE: Supprimer un candidat
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Candidature.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ 
        success: false,
        error: "Candidat non trouvé" 
      });
    }
    
    res.json({
      success: true,
      message: "Candidat supprimé avec succès"
    });
  } catch (err) {
    console.error("Erreur lors de la suppression du candidat:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// 🔍 GET: Rechercher des candidats par critères
router.get("/search", async (req, res) => {
  try {
    const { 
      nom, 
      prenom, 
      email, 
      competences, 
      experience, 
      ville,
      page = 1, 
      limit = 10 
    } = req.query;
    
    // Construction du filtre de recherche
    let filter = {};
    
    if (nom) filter.nom = { $regex: nom, $options: 'i' };
    if (prenom) filter.prenom = { $regex: prenom, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (competences) filter.competences = { $regex: competences, $options: 'i' };
    if (experience) filter.experience = { $gte: parseInt(experience) };
    if (ville) filter.ville = { $regex: ville, $options: 'i' };

    const candidats = await Candidature.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Candidature.countDocuments(filter);

    res.json({
      success: true,
      candidats,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
      searchCriteria: req.query
    });
  } catch (err) {
    console.error("Erreur lors de la recherche de candidats:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// 📊 GET: Statistiques des candidats
router.get("/stats", async (req, res) => {
  try {
    const totalCandidats = await Candidature.countDocuments();
    const candidatsActifs = await Candidature.countDocuments({ statut: 'actif' });
    const candidatsEnAttente = await Candidature.countDocuments({ statut: 'en_attente' });
    
    // Statistiques par ville
    const candidatsParVille = await Candidature.aggregate([
      { $group: { _id: "$ville", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    // Statistiques par niveau d'expérience
    const candidatsParExperience = await Candidature.aggregate([
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lt: ["$experience", 2] }, then: "Junior (0-2 ans)" },
                { case: { $lt: ["$experience", 5] }, then: "Intermédiaire (2-5 ans)" },
                { case: { $lt: ["$experience", 10] }, then: "Senior (5-10 ans)" }
              ],
              default: "Expert (10+ ans)"
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      stats: {
        total: totalCandidats,
        actifs: candidatsActifs,
        enAttente: candidatsEnAttente,
        parVille: candidatsParVille,
        parExperience: candidatsParExperience
      }
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des statistiques:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

module.exports = router;
