// Script de vérification des fichiers
console.log('🔍 Vérification des fichiers...');

// Vérifier que AIJobSearchDemo existe
try {
  const AIJobSearchDemo = require('./AIJobSearchDemo.jsx');
  console.log('✅ AIJobSearchDemo.jsx trouvé');
} catch (error) {
  console.log('❌ AIJobSearchDemo.jsx manquant:', error.message);
}

// Vérifier que le CSS existe
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'AIJobSearch.css');
if (fs.existsSync(cssPath)) {
  console.log('✅ AIJobSearch.css trouvé');
} else {
  console.log('❌ AIJobSearch.css manquant');
}

console.log('🎉 Vérification terminée');
