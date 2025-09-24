const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true
  },
  entreprise: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  ville: {
    type: String,
    required: true,
    trim: true
  },
  secteur: {
    type: String,
    required: true,
    trim: true
  },
  typeContrat: {
    type: String,
    required: true,
    enum: ['CDI', 'CDD', 'Stage', 'Freelance', 'Alternance', 'Télétravail']
  },
  salaire: {
    type: String,
    trim: true
  },
  competencesRequises: [{
    type: String,
    trim: true
  }],
  experienceRequise: {
    type: String,
    enum: ['Débutant', '1-3 ans', '3-5 ans', '5-10 ans', '10+ ans']
  },
  niveauEtude: {
    type: String,
    enum: ['Bac', 'Bac+2', 'Bac+3', 'Bac+5', 'Doctorat', 'Autre']
  },
  datePublication: {
    type: Date,
    default: Date.now
  },
  dateExpiration: {
    type: Date
  },
  actif: {
    type: Boolean,
    default: true
  },
  // Champs pour l'IA
  motsCles: [{
    type: String,
    trim: true
  }],
  // Score de pertinence calculé par l'IA
  scoreIA: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index pour la recherche textuelle
jobSchema.index({
  titre: 'text',
  description: 'text',
  entreprise: 'text',
  competencesRequises: 'text',
  motsCles: 'text'
});

// Index pour les filtres géographiques et sectoriels
jobSchema.index({ ville: 1, secteur: 1, typeContrat: 1 });

module.exports = mongoose.model('Job', jobSchema);
