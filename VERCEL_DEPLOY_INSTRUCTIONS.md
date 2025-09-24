# 🚀 Instructions de Déploiement Vercel - DevJob

## ⚠️ IMPORTANT: Configuration du Root Directory

### 📁 Étapes obligatoires sur Vercel :

1. **Allez sur [vercel.com](https://vercel.com)**
2. **Cliquez "New Project"**
3. **Importez le repository `mouna10technologie/eee`**
4. **⚡ CRUCIAL: Configurez le Root Directory :**
   - Dans "Configure Project"
   - **Root Directory:** `projt` (pas la racine !)
   - **Framework Preset:** `Vite`

### 🔧 Configuration automatique :

Une fois le Root Directory défini sur `projt`, Vercel utilisera automatiquement :
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`

### 📋 Résumé de la structure :

```
eee/                    ← Repository GitHub
├── backend/           ← Backend (non déployé sur Vercel)
├── projt/            ← ROOT DIRECTORY pour Vercel
│   ├── src/
│   ├── dist/         ← Output après build
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json   ← Configuration routes SPA
│   └── index.html
└── README.md
```

### 🎯 Pourquoi cette approche ?

- **Séparation claire** : Frontend et backend séparés
- **Build optimisé** : Vercel ne build que le frontend
- **Chemins corrects** : Résout les erreurs de résolution de modules
- **SPA Support** : Routes React Router fonctionnelles

### 🐛 Si le déploiement échoue encore :

1. **Vérifiez le Root Directory** = `projt`
2. **Redéployez** après avoir changé la configuration
3. **Vérifiez les logs** de build sur Vercel

### 🎉 Résultat attendu :

Votre site DevJob avec recherche IA sera accessible sur :
`https://votre-projet.vercel.app`
