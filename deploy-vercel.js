#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Déploiement DevJob sur Vercel...');

try {
  // Aller dans le dossier projt
  process.chdir(path.join(__dirname, 'projt'));
  
  console.log('📦 Installation des dépendances...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('🏗️ Build de l\'application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('🌐 Déploiement sur Vercel...');
  execSync('npx vercel --prod', { stdio: 'inherit' });
  
  console.log('✅ Déploiement terminé avec succès !');
} catch (error) {
  console.error('❌ Erreur lors du déploiement:', error.message);
  process.exit(1);
}
