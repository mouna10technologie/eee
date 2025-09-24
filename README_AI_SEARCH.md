# 🤖 Système de Recherche d'Emploi Intelligent

## 📋 Description

Ce système remplace les filtres de recherche traditionnels par une intelligence artificielle capable de comprendre les requêtes en langage naturel et de fournir des résultats pertinents.

## 🏗️ Architecture

### Frontend (React)
- **Composant AIJobSearch** : Interface de recherche intelligente
- **Communication** : Axios pour les appels API
- **Interface** : Design moderne avec animations et feedback utilisateur

### Backend (Express.js + MongoDB)
- **API de recherche IA** : `/api/search-jobs`
- **Analyse de requêtes** : Extraction automatique des critères (ville, poste, secteur, etc.)
- **Base de données** : MongoDB avec indexation pour recherche rapide

## 🚀 Installation et Configuration

### 1. Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` avec :
```env
MONGODB_URI=mongodb://localhost:27017/devjob
PORT=5000
```

### 2. Insérer les données d'exemple

```bash
cd backend
npm run seed
```

### 3. Démarrer le serveur backend

```bash
cd backend
npm start
```

### 4. Frontend

```bash
cd projt
npm install
npm run dev
```

## 🔍 Fonctionnalités

### Recherche Intelligente
- **Langage naturel** : "Je cherche un poste de développeur React à Casablanca"
- **Extraction automatique** : Ville, poste, secteur, type de contrat
- **Suggestions** : Exemples de recherches populaires

### Filtres Détectés Automatiquement
- **Villes** : Casablanca, Rabat, Marrakech, Fès, etc.
- **Postes** : Développeur, Ingénieur, Designer, Chef de projet, etc.
- **Technologies** : React, Node.js, Python, Java, etc.
- **Contrats** : CDI, CDD, Stage, Freelance, Télétravail

### Résultats Intelligents
- **Score de pertinence** : Classement par IA
- **Informations complètes** : Titre, entreprise, ville, salaire, etc.
- **Actions** : Postuler, voir détails

## 📝 Exemples de Recherches

```
"Développeur full-stack avec React et Node.js à Rabat"
"Ingénieur en intelligence artificielle, télétravail possible"
"Stage en cybersécurité à Casablanca pour étudiant"
"Chef de projet digital en freelance"
"Data scientist avec Python à Marrakech"
```

## 🛠️ API Endpoints

### POST `/api/search-jobs`
Recherche d'emplois avec IA

**Body:**
```json
{
  "query": "Développeur React à Casablanca"
}
```

**Response:**
```json
{
  "jobs": [...],
  "filters": {
    "poste": "développeur",
    "ville": "Casablanca",
    "secteur": "informatique",
    "contrat": null,
    "technologies": ["react"]
  },
  "totalResults": 5,
  "query": "Développeur React à Casablanca"
}
```

### GET `/api/search-suggestions`
Obtenir des suggestions de recherche

## 🎨 Interface Utilisateur

### Composants Principaux
- **Barre de recherche** : Input avec icône de loupe
- **Exemples** : Boutons de recherches populaires
- **Filtres détectés** : Affichage des critères extraits
- **Résultats** : Cartes d'offres d'emploi avec actions

### Design
- **Gradient moderne** : Couleurs professionnelles
- **Animations** : Transitions fluides
- **Responsive** : Adapté mobile et desktop
- **Feedback** : Loading, erreurs, états vides

## 🔧 Personnalisation

### Ajouter de Nouvelles Villes
Modifier le tableau `villes` dans `routes/aiJobSearch.js`

### Ajouter de Nouveaux Postes
Modifier l'objet `postes` dans `routes/aiJobSearch.js`

### Modifier l'Algorithme IA
Personnaliser la fonction `analyzeUserQuery()` pour améliorer la détection

## 📊 Base de Données

### Modèle Job
```javascript
{
  titre: String,
  entreprise: String,
  description: String,
  ville: String,
  secteur: String,
  typeContrat: String,
  salaire: String,
  competencesRequises: [String],
  experienceRequise: String,
  niveauEtude: String,
  motsCles: [String],
  scoreIA: Number
}
```

### Index de Recherche
- **Recherche textuelle** : titre, description, entreprise, compétences
- **Filtres** : ville, secteur, type de contrat

## 🚀 Améliorations Futures

### Intégration IA Avancée
- **OpenAI GPT** : Analyse plus précise des requêtes
- **Recommandations** : Suggestions personnalisées
- **Matching** : Score de compatibilité candidat/poste

### Fonctionnalités Supplémentaires
- **Alertes emploi** : Notifications automatiques
- **Sauvegarde** : Favoris et historique
- **Candidature directe** : Intégration complète

## 🐛 Dépannage

### Erreur de connexion MongoDB
Vérifier que MongoDB est démarré et accessible

### Erreur CORS
Vérifier la configuration CORS dans `server.js`

### Aucun résultat
Exécuter `npm run seed` pour insérer les données d'exemple

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement DevJob.
