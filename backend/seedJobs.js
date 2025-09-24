const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');

dotenv.config();

const sampleJobs = [
  {
    titre: "Développeur React Senior",
    entreprise: "TechCorp Maroc",
    description: "Nous recherchons un développeur React expérimenté pour rejoindre notre équipe de développement frontend. Vous travaillerez sur des projets innovants utilisant les dernières technologies React, Redux, et TypeScript.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "15000 - 20000 MAD",
    competencesRequises: ["React", "JavaScript", "TypeScript", "Redux", "CSS3", "HTML5"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+3",
    motsCles: ["react", "frontend", "javascript", "typescript", "redux"]
  },
  {
    titre: "Ingénieur en Intelligence Artificielle",
    entreprise: "AI Solutions",
    description: "Poste d'ingénieur IA pour développer des solutions de machine learning et deep learning. Expérience avec Python, TensorFlow, et PyTorch requise.",
    ville: "Rabat",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "18000 - 25000 MAD",
    competencesRequises: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "Data Science"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+5",
    motsCles: ["ia", "intelligence artificielle", "machine learning", "python", "tensorflow"]
  },
  {
    titre: "Stage Développeur Full-Stack",
    entreprise: "StartupTech",
    description: "Stage de 6 mois pour étudiant en informatique. Travail sur des projets web avec Node.js, React, et MongoDB. Excellente opportunité d'apprentissage.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "Stage",
    salaire: "3000 - 4000 MAD",
    competencesRequises: ["Node.js", "React", "MongoDB", "JavaScript", "Express.js"],
    experienceRequise: "Débutant",
    niveauEtude: "Bac+3",
    motsCles: ["stage", "fullstack", "nodejs", "react", "mongodb"]
  },
  {
    titre: "Chef de Projet Digital",
    entreprise: "Digital Agency",
    description: "Gestion de projets digitaux pour clients internationaux. Coordination d'équipes techniques, suivi de planning, relation client. Maîtrise de l'anglais requise.",
    ville: "Marrakech",
    secteur: "Marketing",
    typeContrat: "CDI",
    salaire: "12000 - 16000 MAD",
    competencesRequises: ["Gestion de projet", "Agile", "Scrum", "Communication", "Anglais"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+5",
    motsCles: ["chef de projet", "digital", "agile", "scrum", "management"]
  },
  {
    titre: "Développeur PHP/Laravel",
    entreprise: "WebDev Solutions",
    description: "Développement d'applications web avec PHP et Laravel. Travail en équipe sur des projets e-commerce et sites institutionnels.",
    ville: "Fès",
    secteur: "Informatique",
    typeContrat: "CDD",
    salaire: "8000 - 12000 MAD",
    competencesRequises: ["PHP", "Laravel", "MySQL", "JavaScript", "Bootstrap"],
    experienceRequise: "1-3 ans",
    niveauEtude: "Bac+2",
    motsCles: ["php", "laravel", "backend", "mysql", "web"]
  },
  {
    titre: "Data Scientist",
    entreprise: "DataCorp",
    description: "Analyse de données massives, création de modèles prédictifs, visualisation de données. Expertise en Python, R, et outils de Big Data.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "16000 - 22000 MAD",
    competencesRequises: ["Python", "R", "SQL", "Pandas", "Scikit-learn", "Tableau"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+5",
    motsCles: ["data science", "python", "analyse", "big data", "machine learning"]
  },
  {
    titre: "Designer UI/UX",
    entreprise: "Creative Studio",
    description: "Conception d'interfaces utilisateur et expérience utilisateur pour applications mobiles et web. Maîtrise de Figma, Adobe Creative Suite.",
    ville: "Rabat",
    secteur: "Design",
    typeContrat: "Freelance",
    salaire: "200 - 400 MAD/jour",
    competencesRequises: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Prototypage"],
    experienceRequise: "1-3 ans",
    niveauEtude: "Bac+3",
    motsCles: ["design", "ui", "ux", "figma", "adobe", "interface"]
  },
  {
    titre: "Ingénieur DevOps",
    entreprise: "CloudTech",
    description: "Gestion d'infrastructure cloud, automatisation des déploiements, monitoring. Expérience avec AWS, Docker, Kubernetes.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "17000 - 24000 MAD",
    competencesRequises: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+5",
    motsCles: ["devops", "cloud", "aws", "docker", "kubernetes", "infrastructure"]
  },
  {
    titre: "Développeur Mobile Flutter",
    entreprise: "MobileApp Inc",
    description: "Développement d'applications mobiles cross-platform avec Flutter. Intégration d'APIs, optimisation des performances.",
    ville: "Tanger",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "13000 - 18000 MAD",
    competencesRequises: ["Flutter", "Dart", "Firebase", "REST API", "Git"],
    experienceRequise: "1-3 ans",
    niveauEtude: "Bac+3",
    motsCles: ["flutter", "mobile", "dart", "android", "ios", "cross-platform"]
  },
  {
    titre: "Consultant en Cybersécurité",
    entreprise: "SecureIT",
    description: "Audit de sécurité, tests d'intrusion, conseil en cybersécurité pour entreprises. Certifications CISSP ou CEH appréciées.",
    ville: "Rabat",
    secteur: "Informatique",
    typeContrat: "Freelance",
    salaire: "500 - 800 MAD/jour",
    competencesRequises: ["Cybersécurité", "Pentesting", "CISSP", "CEH", "Audit sécurité"],
    experienceRequise: "5-10 ans",
    niveauEtude: "Bac+5",
    motsCles: ["cybersécurité", "sécurité", "pentesting", "audit", "consultant"]
  },
  {
    titre: "Développeur Backend Node.js",
    entreprise: "Backend Solutions",
    description: "Développement d'APIs REST et GraphQL avec Node.js et Express. Travail avec bases de données MongoDB et PostgreSQL.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "14000 - 19000 MAD",
    competencesRequises: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "GraphQL", "REST API"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+3",
    motsCles: ["nodejs", "backend", "api", "express", "mongodb", "postgresql"]
  },
  {
    titre: "Comptable Senior",
    entreprise: "Cabinet Comptable Maroc",
    description: "Gestion comptable complète, établissement des états financiers, déclarations fiscales. Maîtrise des logiciels comptables.",
    ville: "Casablanca",
    secteur: "Finance",
    typeContrat: "CDI",
    salaire: "8000 - 12000 MAD",
    competencesRequises: ["Comptabilité", "Fiscalité", "Sage", "Excel", "Audit"],
    experienceRequise: "5-10 ans",
    niveauEtude: "Bac+5",
    motsCles: ["comptable", "comptabilité", "finance", "fiscalité", "audit"]
  }
];

async function seedDatabase() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Suppression des anciennes données (optionnel)
    await Job.deleteMany({});
    console.log('🗑️ Anciennes données supprimées');

    // Insertion des nouvelles données
    const insertedJobs = await Job.insertMany(sampleJobs);
    console.log(`✅ ${insertedJobs.length} offres d'emploi insérées avec succès`);

    // Fermeture de la connexion
    await mongoose.connection.close();
    console.log('🔌 Connexion fermée');

  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion des données:', error);
    process.exit(1);
  }
}

// Exécution du script
seedDatabase();
