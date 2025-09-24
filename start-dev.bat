@echo off
echo 🚀 Démarrage de DevJob en mode développement...
echo.

echo 📦 Installation des dépendances backend...
cd backend
call npm install
echo.

echo 🌱 Initialisation de la base de données avec des exemples...
node seedJobs.js
echo.

echo 🖥️ Démarrage du serveur backend...
start "Backend Server" cmd /k "npm start"
echo.

echo ⏳ Attente de 3 secondes pour le démarrage du backend...
timeout /t 3 /nobreak > nul

echo 📦 Installation des dépendances frontend...
cd ..\projt
call npm install
echo.

echo 🌐 Démarrage du serveur frontend...
start "Frontend Server" cmd /k "npm run dev"
echo.

echo ✅ DevJob est en cours de démarrage !
echo 📍 Backend: http://localhost:5000
echo 📍 Frontend: http://localhost:5173
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
pause > nul
