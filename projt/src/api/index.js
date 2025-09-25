// ===== INDEX DES APIs - DEVJOB =====
// Fichier centralisé pour importer toutes les APIs

// APIs existantes
export * from './candidat.api';
export * from './contact.api';
export * from './formulaireCandidat.api';

// Nouvelles APIs créées
export * from './jobs.api';
export * from './aiJobSearch.api';
export * from './newsletter.api';

// Configuration globale pour toutes les APIs
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Fonction utilitaire pour gérer les erreurs API
export const handleApiError = (error) => {
  console.error('Erreur API:', error);
  
  if (error.response) {
    // Erreur de réponse du serveur
    return {
      success: false,
      message: error.response.data?.message || error.response.data?.error || 'Erreur du serveur',
      status: error.response.status
    };
  } else if (error.request) {
    // Erreur de réseau
    return {
      success: false,
      message: 'Erreur de connexion au serveur',
      status: 0
    };
  } else {
    // Autre erreur
    return {
      success: false,
      message: error.message || 'Une erreur inattendue s\'est produite',
      status: -1
    };
  }
};

// Fonction utilitaire pour formater les réponses API
export const formatApiResponse = (data) => {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };
};

// Types de contrats disponibles
export const CONTRACT_TYPES = {
  CDI: 'cdi',
  CDD: 'cdd',
  STAGE: 'stage',
  FREELANCE: 'freelance',
  TELETRAVAIL: 'télétravail'
};

// Villes principales du Maroc
export const MOROCCAN_CITIES = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Fès',
  'Tanger',
  'Agadir',
  'Meknès',
  'Oujda',
  'Kenitra',
  'Tétouan',
  'Safi',
  'Mohammedia',
  'El Jadida',
  'Beni Mellal',
  'Nador'
];

// Secteurs d'activité
export const BUSINESS_SECTORS = [
  'Informatique',
  'Télécommunications',
  'Finance',
  'Marketing',
  'Ressources Humaines',
  'Ingénierie',
  'Santé',
  'Éducation',
  'Commerce',
  'Industrie',
  'Agriculture',
  'Tourisme',
  'Transport',
  'Énergie',
  'Construction'
];

// Niveaux d'expérience
export const EXPERIENCE_LEVELS = {
  JUNIOR: { min: 0, max: 2, label: 'Junior (0-2 ans)' },
  INTERMEDIATE: { min: 2, max: 5, label: 'Intermédiaire (2-5 ans)' },
  SENIOR: { min: 5, max: 10, label: 'Senior (5-10 ans)' },
  EXPERT: { min: 10, max: 999, label: 'Expert (10+ ans)' }
};

// Statuts de candidature
export const APPLICATION_STATUS = {
  PENDING: 'en_attente',
  REVIEWED: 'examinée',
  ACCEPTED: 'acceptée',
  REJECTED: 'rejetée',
  INTERVIEW: 'entretien'
};

// Configuration des préférences de newsletter
export const NEWSLETTER_PREFERENCES = {
  JOB_ALERTS: 'alertes_emploi',
  WEEKLY_DIGEST: 'resume_hebdomadaire',
  COMPANY_NEWS: 'actualites_entreprises',
  CAREER_TIPS: 'conseils_carriere',
  MARKET_TRENDS: 'tendances_marche'
};
