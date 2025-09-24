const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la configuration DevJob...\n');

// Vérification des dossiers
const checkFolder = (folderPath, name) => {
  if (fs.existsSync(folderPath)) {
    console.log(`✅ ${name}: OK`);
    return true;
  } else {
    console.log(`❌ ${name}: MANQUANT`);
    return false;
  }
};

// Vérification des fichiers
const checkFile = (filePath, name) => {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${name}: OK`);
    return true;
  } else {
    console.log(`❌ ${name}: MANQUANT`);
    return false;
  }
};

let allGood = true;

console.log('📁 Vérification des dossiers:');
allGood &= checkFolder('./backend', 'Dossier backend');
allGood &= checkFolder('./projt', 'Dossier frontend');
allGood &= checkFolder('./backend/uploads', 'Dossier uploads');
allGood &= checkFolder('./backend/models', 'Dossier models');
allGood &= checkFolder('./backend/routes', 'Dossier routes');

console.log('\n📄 Vérification des fichiers principaux:');
allGood &= checkFile('./backend/server.js', 'Serveur backend');
allGood &= checkFile('./backend/package.json', 'Package.json backend');
allGood &= checkFile('./backend/.env', 'Fichier .env');
allGood &= checkFile('./projt/package.json', 'Package.json frontend');
allGood &= checkFile('./projt/src/App.jsx', 'App.jsx');
allGood &= checkFile('./projt/src/AIJobSearch.jsx', 'AIJobSearch.jsx');
allGood &= checkFile('./projt/src/JobDetails.jsx', 'JobDetails.jsx');

console.log('\n🔧 Vérification des modèles:');
allGood &= checkFile('./backend/models/Job.js', 'Modèle Job');
allGood &= checkFile('./backend/models/Candidature.js', 'Modèle Candidature');

console.log('\n🛣️ Vérification des routes:');
allGood &= checkFile('./backend/routes/jobs.js', 'Routes jobs');
allGood &= checkFile('./backend/routes/candidatures.js', 'Routes candidatures');
allGood &= checkFile('./backend/routes/aiJobSearch.js', 'Routes recherche IA');

console.log('\n📊 Résumé:');
if (allGood) {
  console.log('🎉 Toutes les vérifications sont passées !');
  console.log('✨ Votre application DevJob est prête à être utilisée.');
  console.log('\n🚀 Pour démarrer:');
  console.log('   1. Double-cliquez sur start-dev.bat');
  console.log('   2. Ou suivez les instructions dans README_VERSION_COMPLETE.md');
} else {
  console.log('⚠️ Certains éléments sont manquants.');
  console.log('📖 Consultez README_VERSION_COMPLETE.md pour plus d\'informations.');
}

console.log('\n📍 URLs de développement:');
console.log('   Backend:  http://localhost:5000');
console.log('   Frontend: http://localhost:5173');
console.log('   API Docs: http://localhost:5000/api');
