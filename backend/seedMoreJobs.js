const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');

dotenv.config();

const moreJobs = [
  // Développeurs Frontend
  {
    titre: "Développeur React.js Senior",
    entreprise: "TechnoSoft Maroc",
    description: "Nous recherchons un développeur React.js expérimenté pour rejoindre notre équipe frontend. Vous travaillerez sur des applications web modernes avec React, Redux, TypeScript et Next.js. Expérience avec les tests unitaires et l'intégration continue requise.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "16000 - 22000 MAD",
    competencesRequises: ["React.js", "Redux", "TypeScript", "Next.js", "Jest", "CSS3", "HTML5"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+3",
    motsCles: ["react", "frontend", "javascript", "typescript", "redux", "nextjs"]
  },
  {
    titre: "Développeur Vue.js",
    entreprise: "Digital Solutions",
    description: "Développement d'interfaces utilisateur modernes avec Vue.js 3, Vuex, et Nuxt.js. Collaboration étroite avec les équipes UX/UI pour créer des expériences utilisateur exceptionnelles.",
    ville: "Rabat",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "14000 - 19000 MAD",
    competencesRequises: ["Vue.js", "Vuex", "Nuxt.js", "JavaScript", "SASS", "Webpack"],
    experienceRequise: "1-3 ans",
    niveauEtude: "Bac+3",
    motsCles: ["vue", "vuejs", "frontend", "javascript", "nuxt"]
  },
  {
    titre: "Développeur Angular Senior",
    entreprise: "InnovaTech",
    description: "Développement d'applications web complexes avec Angular 15+, RxJS, et NgRx. Expérience avec les Progressive Web Apps (PWA) et l'optimisation des performances.",
    ville: "Marrakech",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "17000 - 23000 MAD",
    competencesRequises: ["Angular", "TypeScript", "RxJS", "NgRx", "PWA", "Material Design"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+5",
    motsCles: ["angular", "typescript", "frontend", "rxjs", "ngrx"]
  },

  // Développeurs Backend
  {
    titre: "Développeur Node.js Full-Stack",
    entreprise: "WebTech Solutions",
    description: "Développement d'APIs REST et GraphQL avec Node.js, Express.js, et MongoDB. Intégration avec des services cloud AWS et déploiement avec Docker. Connaissance de React.js pour le frontend.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "15000 - 21000 MAD",
    competencesRequises: ["Node.js", "Express.js", "MongoDB", "React.js", "AWS", "Docker", "GraphQL"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+3",
    motsCles: ["nodejs", "fullstack", "mongodb", "react", "aws", "docker"]
  },
  {
    titre: "Développeur Python/Django",
    entreprise: "DataFlow Systems",
    description: "Développement d'applications web robustes avec Python et Django. Travail sur des projets de traitement de données et d'analyse. Expérience avec PostgreSQL et Redis.",
    ville: "Rabat",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "14000 - 20000 MAD",
    competencesRequises: ["Python", "Django", "PostgreSQL", "Redis", "REST API", "Celery"],
    experienceRequise: "1-3 ans",
    niveauEtude: "Bac+3",
    motsCles: ["python", "django", "backend", "postgresql", "api"]
  },
  {
    titre: "Développeur Java Spring Boot",
    entreprise: "Enterprise Solutions",
    description: "Développement d'applications d'entreprise avec Java, Spring Boot, et microservices. Architecture distribuée avec Apache Kafka et bases de données relationnelles.",
    ville: "Fès",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "16000 - 22000 MAD",
    competencesRequises: ["Java", "Spring Boot", "Microservices", "Apache Kafka", "MySQL", "Docker"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+5",
    motsCles: ["java", "spring", "microservices", "backend", "kafka"]
  },

  // Intelligence Artificielle et Data Science
  {
    titre: "Ingénieur Machine Learning",
    entreprise: "AI Morocco Labs",
    description: "Développement de modèles de machine learning et deep learning pour des applications industrielles. Expérience avec TensorFlow, PyTorch, et déploiement de modèles en production.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "20000 - 28000 MAD",
    competencesRequises: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "MLOps"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+5",
    motsCles: ["machine learning", "ia", "python", "tensorflow", "pytorch", "data science"]
  },
  {
    titre: "Data Scientist Senior",
    entreprise: "Analytics Pro",
    description: "Analyse de données massives, création de modèles prédictifs et visualisation de données. Expertise en statistiques, Python, R, et outils de Big Data comme Spark.",
    ville: "Rabat",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "18000 - 25000 MAD",
    competencesRequises: ["Python", "R", "Apache Spark", "SQL", "Tableau", "Power BI", "Statistics"],
    experienceRequise: "5-10 ans",
    niveauEtude: "Bac+5",
    motsCles: ["data science", "python", "r", "spark", "analytics", "big data"]
  },
  {
    titre: "Ingénieur en Intelligence Artificielle",
    entreprise: "Smart AI Solutions",
    description: "Recherche et développement en IA, traitement du langage naturel (NLP), vision par ordinateur. Implémentation d'algorithmes d'apprentissage automatique avancés.",
    ville: "Marrakech",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "19000 - 26000 MAD",
    competencesRequises: ["Python", "NLP", "Computer Vision", "OpenCV", "NLTK", "Transformers", "Deep Learning"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+5",
    motsCles: ["intelligence artificielle", "nlp", "computer vision", "deep learning", "python"]
  },

  // DevOps et Infrastructure
  {
    titre: "Ingénieur DevOps Senior",
    entreprise: "CloudOps Morocco",
    description: "Gestion d'infrastructure cloud, automatisation des déploiements avec CI/CD, monitoring et scaling. Expertise AWS, Azure, Kubernetes, et Terraform.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "18000 - 25000 MAD",
    competencesRequises: ["AWS", "Azure", "Kubernetes", "Docker", "Terraform", "Jenkins", "Prometheus"],
    experienceRequise: "5-10 ans",
    niveauEtude: "Bac+5",
    motsCles: ["devops", "cloud", "kubernetes", "aws", "azure", "terraform"]
  },
  {
    titre: "Administrateur Système Linux",
    entreprise: "SysAdmin Solutions",
    description: "Administration de serveurs Linux, gestion de bases de données, sécurité système et monitoring. Expérience avec les environnements haute disponibilité.",
    ville: "Rabat",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "12000 - 18000 MAD",
    competencesRequises: ["Linux", "Bash", "MySQL", "PostgreSQL", "Nginx", "Apache", "Monitoring"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+3",
    motsCles: ["linux", "sysadmin", "serveur", "mysql", "nginx"]
  },

  // Cybersécurité
  {
    titre: "Expert en Cybersécurité",
    entreprise: "SecureNet Morocco",
    description: "Audit de sécurité, tests d'intrusion, analyse de vulnérabilités. Mise en place de politiques de sécurité et formation des équipes. Certifications CISSP, CEH appréciées.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "20000 - 30000 MAD",
    competencesRequises: ["Pentesting", "CISSP", "CEH", "Audit sécurité", "Firewall", "IDS/IPS"],
    experienceRequise: "5-10 ans",
    niveauEtude: "Bac+5",
    motsCles: ["cybersécurité", "sécurité", "pentesting", "audit", "cissp", "ceh"]
  },
  {
    titre: "Analyste en Sécurité Informatique",
    entreprise: "CyberGuard",
    description: "Surveillance des systèmes de sécurité, analyse des incidents, réponse aux menaces. Gestion des outils SIEM et SOC. Formation en cybersécurité requise.",
    ville: "Rabat",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "14000 - 20000 MAD",
    competencesRequises: ["SIEM", "SOC", "Incident Response", "Network Security", "Malware Analysis"],
    experienceRequise: "1-3 ans",
    niveauEtude: "Bac+3",
    motsCles: ["sécurité", "siem", "soc", "incident", "malware"]
  },

  // Stages et Junior
  {
    titre: "Stage Développeur Web Full-Stack",
    entreprise: "StartupTech Maroc",
    description: "Stage de 6 mois pour étudiant en informatique. Apprentissage du développement web avec React, Node.js, et MongoDB. Encadrement par des développeurs seniors.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "Stage",
    salaire: "3500 - 4500 MAD",
    competencesRequises: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    experienceRequise: "Débutant",
    niveauEtude: "Bac+3",
    motsCles: ["stage", "fullstack", "react", "nodejs", "mongodb", "débutant"]
  },
  {
    titre: "Stage en Data Science",
    entreprise: "DataLab Morocco",
    description: "Stage de 4 mois en analyse de données et machine learning. Travail sur des projets réels avec Python, Pandas, et Scikit-learn. Formation aux outils de visualisation.",
    ville: "Rabat",
    secteur: "Informatique",
    typeContrat: "Stage",
    salaire: "3000 - 4000 MAD",
    competencesRequises: ["Python", "Pandas", "Matplotlib", "Scikit-learn", "Statistics"],
    experienceRequise: "Débutant",
    niveauEtude: "Bac+3",
    motsCles: ["stage", "data science", "python", "pandas", "machine learning"]
  },
  {
    titre: "Stage Cybersécurité",
    entreprise: "SecureTech",
    description: "Stage de 6 mois en cybersécurité. Apprentissage des techniques de sécurité informatique, tests de vulnérabilité, et outils de sécurité. Formation certifiante incluse.",
    ville: "Marrakech",
    secteur: "Informatique",
    typeContrat: "Stage",
    salaire: "3200 - 4200 MAD",
    competencesRequises: ["Network Security", "Vulnerability Assessment", "Linux", "Windows Security"],
    experienceRequise: "Débutant",
    niveauEtude: "Bac+3",
    motsCles: ["stage", "cybersécurité", "sécurité", "vulnérabilité", "réseau"]
  },

  // Design et UX/UI
  {
    titre: "Designer UX/UI Senior",
    entreprise: "Creative Digital",
    description: "Conception d'expériences utilisateur et d'interfaces pour applications web et mobile. Maîtrise de Figma, Adobe Creative Suite, et méthodologies de design thinking.",
    ville: "Casablanca",
    secteur: "Design",
    typeContrat: "CDI",
    salaire: "12000 - 18000 MAD",
    competencesRequises: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "Design Thinking"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+3",
    motsCles: ["ux", "ui", "design", "figma", "adobe", "interface"]
  },
  {
    titre: "Graphiste Web",
    entreprise: "Visual Studio",
    description: "Création de supports visuels pour le web et le print. Identité visuelle, bannières, infographies. Maîtrise de la suite Adobe et des tendances graphiques actuelles.",
    ville: "Rabat",
    secteur: "Design",
    typeContrat: "Freelance",
    salaire: "250 - 400 MAD/jour",
    competencesRequises: ["Photoshop", "Illustrator", "InDesign", "Web Design", "Print Design"],
    experienceRequise: "1-3 ans",
    niveauEtude: "Bac+2",
    motsCles: ["graphiste", "web design", "adobe", "photoshop", "illustrator"]
  },

  // Management et Chef de Projet
  {
    titre: "Chef de Projet Digital Senior",
    entreprise: "ProjectLead Morocco",
    description: "Gestion de projets digitaux complexes, coordination d'équipes multidisciplinaires, suivi budgétaire. Méthodologies Agile et Scrum. Relation client et pilotage stratégique.",
    ville: "Casablanca",
    secteur: "Management",
    typeContrat: "CDI",
    salaire: "18000 - 25000 MAD",
    competencesRequises: ["Gestion de projet", "Agile", "Scrum", "Leadership", "Budget", "Communication"],
    experienceRequise: "5-10 ans",
    niveauEtude: "Bac+5",
    motsCles: ["chef de projet", "digital", "agile", "scrum", "management"]
  },
  {
    titre: "Product Owner",
    entreprise: "Agile Solutions",
    description: "Définition de la vision produit, gestion du backlog, collaboration avec les équipes de développement. Expérience en méthodologies Agile et connaissance technique requise.",
    ville: "Rabat",
    secteur: "Management",
    typeContrat: "CDI",
    salaire: "16000 - 22000 MAD",
    competencesRequises: ["Product Management", "Agile", "Scrum", "User Stories", "Roadmap"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+5",
    motsCles: ["product owner", "agile", "scrum", "produit", "backlog"]
  },

  // Télétravail
  {
    titre: "Développeur React Remote",
    entreprise: "RemoteFirst Tech",
    description: "Poste 100% télétravail pour développeur React.js expérimenté. Collaboration avec une équipe internationale, projets innovants, flexibilité horaire. Excellente maîtrise de l'anglais requise.",
    ville: "Télétravail",
    secteur: "Informatique",
    typeContrat: "Télétravail",
    salaire: "18000 - 25000 MAD",
    competencesRequises: ["React.js", "TypeScript", "Next.js", "Git", "English", "Remote Work"],
    experienceRequise: "3-5 ans",
    niveauEtude: "Bac+3",
    motsCles: ["react", "remote", "télétravail", "typescript", "nextjs", "anglais"]
  },
  {
    titre: "Data Analyst Remote",
    entreprise: "Global Analytics",
    description: "Analyse de données en télétravail complet. Création de dashboards, rapports analytiques, et insights business. Outils: Python, SQL, Tableau, Power BI.",
    ville: "Télétravail",
    secteur: "Informatique",
    typeContrat: "Télétravail",
    salaire: "15000 - 21000 MAD",
    competencesRequises: ["Python", "SQL", "Tableau", "Power BI", "Excel", "Statistics"],
    experienceRequise: "1-3 ans",
    niveauEtude: "Bac+3",
    motsCles: ["data analyst", "remote", "télétravail", "python", "sql", "tableau"]
  }
];

async function seedMoreJobs() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Ajout des nouvelles données (sans supprimer les anciennes)
    const insertedJobs = await Job.insertMany(moreJobs);
    console.log(`✅ ${insertedJobs.length} nouvelles offres d'emploi ajoutées avec succès`);

    // Compter le total
    const totalJobs = await Job.countDocuments();
    console.log(`📊 Total d'offres dans la base: ${totalJobs}`);

    // Fermeture de la connexion
    await mongoose.connection.close();
    console.log('🔌 Connexion fermée');

  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des données:', error);
    process.exit(1);
  }
}

// Exécution du script
seedMoreJobs();
