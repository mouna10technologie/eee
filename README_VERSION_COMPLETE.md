# DevJob - Version Complète avec Backend et Base de Données

## 🎉 Félicitations ! Votre application DevJob est maintenant complète !

La version démo a été remplacée par une version complète avec :
- ✅ Backend Node.js + Express
- ✅ Base de données MongoDB
- ✅ Système de candidatures fonctionnel
- ✅ Recherche d'emplois avec IA
- ✅ Pages de détails des offres
- ✅ Fonctionnalités "Postuler" et "Voir détails"

## 🚀 Démarrage Rapide

### Option 1: Script automatique (Recommandé)
```bash
# Double-cliquez sur le fichier ou exécutez :
start-dev.bat
```

### Option 2: Démarrage manuel

#### 1. Configuration du Backend
```bash
cd backend
npm install
```

#### 2. Configuration de la base de données
Assurez-vous d'avoir MongoDB installé et configuré, puis :
```bash
# Initialisez avec des données d'exemple
node seedJobs.js
```

#### 3. Démarrage du backend
```bash
npm start
# Le serveur démarre sur http://localhost:5000
```

#### 4. Configuration du Frontend
```bash
cd ../projt
npm install
```

#### 5. Démarrage du frontend
```bash
npm run dev
# Le serveur démarre sur http://localhost:5173
```

## 🔧 Configuration

### Variables d'environnement (backend/.env)
```env
MONGODB_URI=mongodb://localhost:27017/devjob
PORT=5000
```

## 📱 Fonctionnalités Principales

### 🤖 Recherche IA
- Recherche en langage naturel
- Détection automatique des critères (ville, poste, secteur, type de contrat)
- Scoring intelligent des résultats

### 💼 Gestion des Offres
- Affichage détaillé des offres d'emploi
- Informations complètes (salaire, compétences, expérience requise)
- Navigation fluide entre les pages

### 📝 Système de Candidatures
- Formulaire de candidature complet
- Upload de CV (PDF, DOC, DOCX)
- Message de motivation personnalisé
- Stockage sécurisé des données

## 🎯 Utilisation

### Pour les Développeurs
1. **Rechercher des offres** : Utilisez la barre de recherche IA sur la page d'accueil
2. **Voir les détails** : Cliquez sur "Voir détails" pour plus d'informations
3. **Postuler** : Cliquez sur "Postuler" et remplissez le formulaire

### Exemples de recherches
- "Développeur React à Casablanca"
- "Ingénieur en intelligence artificielle"
- "Stage en cybersécurité à Rabat"
- "Chef de projet digital en télétravail"

## 📊 Structure de la Base de Données

### Collection Jobs
- `titre` : Titre du poste
- `entreprise` : Nom de l'entreprise
- `description` : Description détaillée
- `ville` : Localisation
- `secteur` : Secteur d'activité
- `typeContrat` : Type de contrat (CDI, CDD, Stage, Freelance)
- `salaire` : Fourchette salariale
- `competencesRequises` : Array des compétences
- `experienceRequise` : Niveau d'expérience
- `niveauEtude` : Niveau d'étude requis

### Collection Candidatures
- `nom`, `prenom` : Identité du candidat
- `email`, `telephone` : Coordonnées
- `cv` : Fichier CV uploadé
- `message` : Message de motivation
- `posteChoisi` : Poste visé

## 🔄 API Endpoints

### Jobs
- `GET /api/jobs` : Liste des offres
- `GET /api/jobs/:id` : Détails d'une offre
- `POST /api/search-jobs` : Recherche IA

### Candidatures
- `POST /candidatures` : Nouvelle candidature
- `GET /candidatures` : Liste des candidatures

## 🎨 Personnalisation

### Ajouter de nouvelles offres
```javascript
// Via l'API ou directement en base
const newJob = {
  titre: "Nouveau Poste",
  entreprise: "Mon Entreprise",
  description: "Description du poste...",
  ville: "Casablanca",
  secteur: "Informatique",
  typeContrat: "CDI",
  // ... autres champs
};
```

### Modifier l'algorithme IA
Éditez `backend/routes/aiJobSearch.js` pour personnaliser :
- Détection des mots-clés
- Scoring des résultats
- Filtres automatiques

## 🛠️ Développement

### Structure du projet
```
eee/
├── backend/          # Serveur Node.js
│   ├── models/       # Modèles MongoDB
│   ├── routes/       # Routes API
│   └── server.js     # Point d'entrée
├── projt/            # Frontend React
│   └── src/          # Composants React
└── start-dev.bat     # Script de démarrage
```

### Commandes utiles
```bash
# Réinitialiser la base de données
cd backend && node seedJobs.js

# Voir les logs du backend
cd backend && npm start

# Build de production
cd projt && npm run build
```

## 🚀 Déploiement

### Frontend (Vercel)
- Root Directory: `projt`
- Build Command: `npm run build`
- Output Directory: `dist`

### Backend (Heroku/Railway)
- Configurez les variables d'environnement
- Déployez le dossier `backend`

## 🆘 Dépannage

### Problèmes courants
1. **Erreur de connexion MongoDB** : Vérifiez que MongoDB est démarré
2. **Port déjà utilisé** : Changez les ports dans les fichiers de config
3. **CORS Error** : Vérifiez la configuration CORS dans `server.js`

### Support
- Vérifiez les logs dans la console du navigateur
- Consultez les logs du serveur backend
- Assurez-vous que tous les services sont démarrés

## 🎊 Conclusion

Votre application DevJob est maintenant une plateforme complète de recherche d'emploi avec :
- Intelligence artificielle pour la recherche
- Base de données persistante
- Système de candidatures fonctionnel
- Interface utilisateur moderne et responsive

**Bon développement ! 🚀**
