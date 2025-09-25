#!/usr/bin/env node

/**
 * Script de test des connexions Backend-Frontend
 * DevJob - Vérification automatique des APIs
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000';
const TIMEOUT = 5000;

// Configuration des couleurs pour la console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  title: (msg) => console.log(`${colors.bold}${colors.blue}\n🔍 ${msg}${colors.reset}`)
};

// Tests des endpoints
const tests = [
  {
    name: 'Jobs API',
    endpoint: '/api/jobs',
    method: 'GET',
    description: 'Récupération des offres d\'emploi'
  },
  {
    name: 'Candidats API',
    endpoint: '/api/candidats',
    method: 'GET',
    description: 'Récupération des candidats'
  },
  {
    name: 'Contact API',
    endpoint: '/api/contact',
    method: 'GET',
    description: 'Récupération des messages de contact'
  },
  {
    name: 'Newsletter API',
    endpoint: '/api/newsletter/subscribers',
    method: 'GET',
    description: 'Récupération des abonnés newsletter'
  },
  {
    name: 'AI Job Search',
    endpoint: '/api/search-suggestions',
    method: 'GET',
    description: 'Suggestions de recherche IA'
  },
  {
    name: 'Candidatures API',
    endpoint: '/candidatures',
    method: 'GET',
    description: 'Récupération des candidatures'
  }
];

// Vérification des fichiers frontend
const frontendFiles = [
  'projt/src/api/jobs.api.js',
  'projt/src/api/aiJobSearch.api.js',
  'projt/src/api/newsletter.api.js',
  'projt/src/api/candidat.api.js',
  'projt/src/api/contact.api.js',
  'projt/src/api/formulaireCandidat.api.js',
  'projt/src/api/index.js',
  'projt/src/components/JobsList.jsx',
  'projt/src/components/JobsList.css'
];

// Vérification des fichiers backend
const backendFiles = [
  'backend/routes/jobs.js',
  'backend/routes/candidats.js',
  'backend/routes/contact.js',
  'backend/routes/newsletter.js',
  'backend/routes/aiJobSearch.js',
  'backend/routes/candidatures.js',
  'backend/server.js'
];

async function testEndpoint(test) {
  try {
    const response = await axios({
      method: test.method,
      url: `${BASE_URL}${test.endpoint}`,
      timeout: TIMEOUT,
      validateStatus: (status) => status < 500 // Accepter les erreurs 4xx
    });
    
    if (response.status < 400) {
      log.success(`${test.name}: ${test.description}`);
      return true;
    } else {
      log.warning(`${test.name}: Endpoint accessible mais retourne ${response.status}`);
      return false;
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      log.error(`${test.name}: Serveur non démarré (${BASE_URL})`);
    } else if (error.code === 'ENOTFOUND') {
      log.error(`${test.name}: URL non trouvée`);
    } else {
      log.error(`${test.name}: ${error.message}`);
    }
    return false;
  }
}

function checkFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    log.success(`Fichier trouvé: ${filePath}`);
    return true;
  } else {
    log.error(`Fichier manquant: ${filePath}`);
    return false;
  }
}

async function checkServerStatus() {
  log.title('Vérification du serveur backend');
  
  try {
    const response = await axios.get(BASE_URL, { timeout: TIMEOUT });
    log.success('Serveur backend accessible');
    return true;
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      log.error('Serveur backend non démarré');
      log.info('Démarrez le serveur avec: cd backend && npm start');
    } else {
      log.error(`Erreur serveur: ${error.message}`);
    }
    return false;
  }
}

async function testAllEndpoints() {
  log.title('Test des endpoints API');
  
  let successCount = 0;
  const totalTests = tests.length;
  
  for (const test of tests) {
    const success = await testEndpoint(test);
    if (success) successCount++;
  }
  
  console.log(`\n📊 Résultats: ${successCount}/${totalTests} endpoints fonctionnels`);
  return successCount === totalTests;
}

function checkAllFiles() {
  log.title('Vérification des fichiers frontend');
  
  let frontendSuccess = 0;
  for (const file of frontendFiles) {
    if (checkFile(file)) frontendSuccess++;
  }
  
  log.title('Vérification des fichiers backend');
  
  let backendSuccess = 0;
  for (const file of backendFiles) {
    if (checkFile(file)) backendSuccess++;
  }
  
  console.log(`\n📁 Fichiers Frontend: ${frontendSuccess}/${frontendFiles.length}`);
  console.log(`📁 Fichiers Backend: ${backendSuccess}/${backendFiles.length}`);
  
  return frontendSuccess === frontendFiles.length && backendSuccess === backendFiles.length;
}

function generateReport(serverOk, filesOk, endpointsOk) {
  log.title('Rapport Final');
  
  console.log(`🖥️  Serveur Backend: ${serverOk ? '✅ OK' : '❌ KO'}`);
  console.log(`📁 Fichiers: ${filesOk ? '✅ OK' : '❌ KO'}`);
  console.log(`🔗 Endpoints: ${endpointsOk ? '✅ OK' : '❌ KO'}`);
  
  if (serverOk && filesOk && endpointsOk) {
    log.success('\n🎉 TOUTES LES CONNEXIONS SONT FONCTIONNELLES !');
    console.log(`
${colors.green}┌─────────────────────────────────────────┐
│  ✅ Backend-Frontend 100% Connecté !    │
│                                         │
│  🚀 Votre application DevJob est        │
│     prête pour la production !          │
└─────────────────────────────────────────┘${colors.reset}
    `);
  } else {
    log.error('\n🚨 PROBLÈMES DÉTECTÉS');
    
    if (!serverOk) {
      log.info('👉 Démarrez le serveur: cd backend && npm start');
    }
    if (!filesOk) {
      log.info('👉 Vérifiez que tous les fichiers ont été créés');
    }
    if (!endpointsOk) {
      log.info('👉 Vérifiez les routes dans server.js');
    }
  }
}

async function main() {
  console.log(`${colors.bold}${colors.blue}
╔══════════════════════════════════════════════════════════════╗
║                    🔍 TEST DES CONNEXIONS                    ║
║                   Backend ↔ Frontend DevJob                  ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}
  `);
  
  // Vérifications
  const serverOk = await checkServerStatus();
  const filesOk = checkAllFiles();
  const endpointsOk = serverOk ? await testAllEndpoints() : false;
  
  // Rapport final
  generateReport(serverOk, filesOk, endpointsOk);
  
  // Code de sortie
  process.exit(serverOk && filesOk && endpointsOk ? 0 : 1);
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (error) => {
  log.error(`Erreur non gérée: ${error.message}`);
  process.exit(1);
});

// Lancement du script
if (require.main === module) {
  main();
}

module.exports = { testEndpoint, checkFile, main };
