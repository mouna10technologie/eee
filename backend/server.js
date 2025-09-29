const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route de test
app.get("/api/health", (req, res) => {
  res.json({ 
    success: true, 
    message: "Backend DevJob opérationnel !", 
    timestamp: new Date().toISOString(),
    routes: [
      "/api/auth (login, register)",
      "/api/cv (protected)",
      "/candidatures",
      "/api/candidats", 
      "/api/contact",
      "/api/jobs",
      "/api/newsletter"
    ]
  });
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cv", require("./routes/cv"));
app.use("/candidatures", require("./routes/candidatures"));
app.use("/api/candidats", require("./routes/candidats"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api", require("./routes/aiJobSearch"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/newsletter", require("./routes/newsletter"));

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} non trouvée`,
    availableRoutes: [
      "GET /api/health",
      "POST /api/auth/login",
      "POST /api/auth/register", 
      "GET /api/cv (protected)",
      "GET /candidatures",
      "POST /api/newsletter/subscribe"
    ]
  });
});

// Connexion MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(process.env.PORT || 5000, () =>
      console.log("🚀 Serveur sur http://localhost:5000")
    );
  })
  .catch((err) => console.error("❌ Erreur MongoDB:", err));
