# 🚀 Déploiement sur Vercel - DevJob

## 📋 Instructions de déploiement

### Option 1: Configuration via l'interface Vercel (Recommandée)

1. **Allez sur [vercel.com](https://vercel.com)** et connectez-vous
2. **Cliquez sur "New Project"**
3. **Importez votre repository GitHub** `mouna10technologie/eee`
4. **IMPORTANT: Configurez les paramètres suivants :**

#### ⚙️ Build & Development Settings
- **Framework Preset:** `Vite`
- **Root Directory:** `projt` ⚠️ (Très important!)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### 📁 Structure du projet
```
eee/
├── backend/          # Backend Express.js
├── projt/           # Frontend React (ROOT DIRECTORY pour Vercel)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

### Option 2: Configuration automatique avec vercel.json

Les fichiers `vercel.json` ont été créés pour automatiser la configuration.

### 🔧 Étapes de déploiement

1. **Commitez et pushez** les nouveaux fichiers :
```bash
git add .
git commit -m "Add Vercel configuration"
git push
```

2. **Sur Vercel, cliquez "Deploy"**

3. **Vérifiez que le Root Directory est bien `projt`**

### 🐛 Résolution des erreurs courantes

#### Erreur: "vite: command not found"
- ✅ **Solution:** Définir `Root Directory` sur `projt`
- ✅ **Vérifier:** Build Command = `npm run build`

#### Erreur: "Cannot find module"
- ✅ **Solution:** Install Command = `npm install`
- ✅ **Vérifier:** Toutes les dépendances sont dans `projt/package.json`

#### Erreur 404 sur les routes React
- ✅ **Solution:** Le fichier `vercel.json` gère les routes SPA

### 🌐 Variables d'environnement (si nécessaire)

Si vous voulez connecter le backend plus tard :
- `VITE_API_URL` = URL de votre API backend

### 📝 Notes importantes

- **Frontend seulement:** Ce déploiement ne contient que le frontend React
- **Backend séparé:** Le backend Express.js doit être déployé séparément
- **Mode démo:** La recherche IA fonctionne avec des données de démonstration

### 🎉 Après le déploiement

Votre site sera accessible sur une URL comme :
`https://votre-projet.vercel.app`

La recherche d'emploi intelligente sera fonctionnelle en mode démo !
