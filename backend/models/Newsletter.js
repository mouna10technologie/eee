const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez entrer un email valide']
  },
  nom: {
    type: String,
    trim: true
  },
  prenom: {
    type: String,
    trim: true
  },
  statut: {
    type: String,
    enum: ['actif', 'inactif', 'désabonné'],
    default: 'actif'
  },
  source: {
    type: String,
    default: 'footer' // d'où vient l'inscription
  },
  preferences: {
    offresEmploi: {
      type: Boolean,
      default: true
    },
    actualitesTech: {
      type: Boolean,
      default: true
    },
    conseils: {
      type: Boolean,
      default: true
    }
  },
  dateInscription: {
    type: Date,
    default: Date.now
  },
  dernierEmail: {
    type: Date
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

// Index pour les recherches fréquentes
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ statut: 1 });
newsletterSchema.index({ dateInscription: -1 });

module.exports = mongoose.model('Newsletter', newsletterSchema);
