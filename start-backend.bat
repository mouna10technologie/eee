@echo off
echo 🚀 Démarrage du serveur backend DevJob...
echo.

cd backend

echo 📦 Installation des dépendances...
npm install

echo.
echo 🔥 Démarrage du serveur sur http://localhost:5000
echo ⚠️  Assurez-vous que MongoDB est démarré !
echo.

npm start

pause
