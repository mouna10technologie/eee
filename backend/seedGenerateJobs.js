const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');

dotenv.config();

const villes = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Oujda'];
const secteurs = ['Informatique', 'Finance', 'Design', 'Marketing', 'Management'];
const contrats = ['CDI', 'CDD', 'Stage', 'Freelance', 'Télétravail'];
const entreprises = ['TechCorp', 'DataWorks', 'CloudOps', 'CreativeLab', 'SecureNet', 'AI Solutions', 'WebFactory'];
const titresBase = [
  'Développeur Full-Stack',
  'Développeur Frontend React',
  'Développeur Backend Node.js',
  'Ingénieur DevOps',
  'Data Scientist',
  'Ingénieur IA',
  'Designer UI/UX',
  'Chef de Projet Digital',
  'Analyste Sécurité',
  'Product Owner'
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function buildJob(i) {
  const titre = `${pick(titresBase)} ${i+1}`;
  const entreprise = pick(entreprises);
  const ville = pick(villes);
  const secteur = pick(secteurs);
  const typeContrat = pick(contrats);
  const salaire = typeContrat === 'Stage' ? '3000 - 5000 MAD' : `${12000 + (i%10)*1000} - ${18000 + (i%10)*1000} MAD`;
  const competencesMap = {
    'Informatique': ['JavaScript','React','Node.js','MongoDB','Git','Docker','Kubernetes'],
    'Finance': ['Comptabilité','Fiscalité','Excel','Power BI','Reporting'],
    'Design': ['Figma','Adobe XD','Photoshop','Illustrator'],
    'Marketing': ['SEO','SEA','Analytics','Réseaux Sociaux'],
    'Management': ['Agile','Scrum','Communication','Leadership']
  };
  const competencesRequises = competencesMap[secteur];
  const description = `Nous recherchons un ${titre} basé à ${ville}. Vous travaillerez sur des projets ${secteur.toLowerCase()}.
  Compétences clés: ${competencesRequises.slice(0,3).join(', ')}.`;
  const experienceRequise = pick(['Débutant','1-3 ans','3-5 ans','5-10 ans']);
  const niveauEtude = pick(['Bac+2','Bac+3','Bac+5']);
  const motsCles = [titre.toLowerCase().split(' ')[0], secteur.toLowerCase(), ville.toLowerCase()];
  const datePublication = new Date(Date.now() - Math.floor(Math.random()*30)*24*3600*1000);

  return {
    titre,
    entreprise,
    description,
    ville,
    secteur,
    typeContrat,
    salaire,
    competencesRequises,
    experienceRequise,
    niveauEtude,
    actif: true,
    motsCles,
    datePublication
  };
}

async function ensureAtLeastNJobs(target = 40) {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connecté à MongoDB');
  const count = await Job.countDocuments();
  console.log(`📊 Jobs existants: ${count}`);
  const toInsert = Math.max(0, target - count);
  if (toInsert === 0) {
    console.log(`✅ Déjà au moins ${target} offres. Rien à faire.`);
    await mongoose.connection.close();
    return;
  }
  const batch = Array.from({ length: toInsert }, (_, i) => buildJob(i));
  const inserted = await Job.insertMany(batch);
  console.log(`✅ ${inserted.length} offres ajoutées pour atteindre ${target}+`);
  const final = await Job.countDocuments();
  console.log(`📈 Total actuel: ${final}`);
  await mongoose.connection.close();
  console.log('🔌 Connexion fermée');
}

const argTarget = parseInt(process.argv[2], 10);
const target = Number.isFinite(argTarget) && argTarget > 0 ? argTarget : 40;
ensureAtLeastNJobs(target).catch(err => { console.error('❌ Erreur seed:', err); process.exit(1); });
