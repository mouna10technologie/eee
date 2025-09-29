import React, { useEffect, useState } from "react";
import "./Recruteurs.css";
import {
  loginRecruiter,
  registerRecruiter,
  logoutRecruiter,
  isAuthenticated,
  getUser,
  getAllCV,
  getCVDownloadUrl,
  getCVStats,
} from "./api";
function CarteRecruteurs1({ image, lien }) {
  return (
    <div className="div_reruteurs1">
      <a
        href={lien}
        target="_blank"
        rel="noopener noreferrer"
        className="img-link"
      >
        <img
          src={image}
          alt="image des sites freelance"
          width="100px"
          height="100px"
        />
      </a>
      <a
        href={lien}
        target="_blank"
        rel="noopener noreferrer"
        className="visit-text"
      >
        cliquer pour visiter
      </a>
    </div>
  );
}

function CarteRecruteurs({ titre, description, url, image }) {
  const handleClick = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="div_recruteurs">
      {image && (
        <div className="image-recruteur-container">
          <img src={image} alt={titre} className="image-recruteur" />
        </div>
      )}
      <div className="contenu-recruteur">
        <h2>{titre}</h2>
        <h4>{description}</h4>
        {url && (
          <button className="btn-carte-recruteur" onClick={handleClick}>
            Visiter le site
          </button>
        )}
      </div>
    </div>
  );
}

function CarteSiteRecrutement({
  nom,
  description,
  url,
  logo,
  type,
  pays,
  specialite,
}) {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="carte-site-recrutement" onClick={handleClick}>
      <div className="carte-site-header">
        <div className="logo-site">
          <img src={logo} alt={`Logo ${nom}`} />
        </div>
        <div className="badge-type">
          <span className={`badge ${type}`}>
            {type === "maroc" ? " Maroc" : "🌍 International"}
          </span>
        </div>
      </div>

      <div className="carte-site-body">
        <h3 className="nom-site">{nom}</h3>
        <p className="description-site">{description}</p>

        <div className="info-site">
          <div className="specialite-section">
            <span className="specialite-badge">{specialite}</span>
          </div>
          <div className="pays-section">
            <span className="pays-info">📍 {pays}</span>
          </div>
        </div>
      </div>

      <div className="carte-site-footer">
        <button className="btn-visiter">
          <span>Visiter le site</span>
          <span className="arrow">→</span>
        </button>
      </div>

      <div className="hover-overlay">
        <span className="click-text">Cliquez pour visiter</span>
      </div>
    </div>
  );
}

function Recruteurs() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState(getUser());
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCVList, setShowCVList] = useState(false);
  
  // Formulaires
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", address: "", email: "", password: "" });
  
  // États
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cvList, setCvList] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchCV = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllCV();
      setCvList(data?.data || []);
      setShowCVList(true);
    } catch (e) {
      setError(e.message || "Impossible de récupérer les CV");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getCVStats();
      setStats(data?.stats || null);
    } catch (e) {
      console.error('Erreur stats:', e);
    }
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await loginRecruiter(loginForm.email, loginForm.password);
      if (res?.success) {
        setLoggedIn(true);
        setCurrentUser(res.recruiter);
        setShowLogin(false);
        setLoginForm({ email: "", password: "" });
        await fetchStats();
      } else {
        setError(res?.error || "Identifiants invalides");
      }
    } catch (e2) {
      if (e2.message.includes('404')) {
        setError("❌ Email non trouvé. Vérifiez votre adresse email ou inscrivez-vous.");
      } else if (e2.message.includes('401')) {
        setError("❌ Mot de passe incorrect. Vérifiez votre mot de passe.");
      } else if (e2.message.includes('400')) {
        setError("❌ Email ou mot de passe manquant. Remplissez tous les champs.");
      } else {
        setError("❌ Erreur de connexion: " + (e2.message || "Problème de réseau"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await registerRecruiter(registerForm);
      if (res?.success) {
        setSuccess("✅ Inscription réussie ! Vous êtes maintenant connecté et pouvez accéder aux CV.");
        setLoggedIn(true);
        setCurrentUser(res.recruiter);
        setShowRegister(false);
        setRegisterForm({ name: "", address: "", email: "", password: "" });
        await fetchStats();
      } else {
        setError(res?.error || "Erreur lors de l'inscription");
      }
    } catch (e2) {
      if (e2.message.includes('409')) {
        setError("❌ Cet email est déjà utilisé. Utilisez un autre email ou connectez-vous.");
      } else if (e2.message.includes('400')) {
        setError("❌ Informations manquantes. Remplissez tous les champs (nom, email, mot de passe).");
      } else {
        setError("❌ Erreur lors de l'inscription: " + (e2.message || "Problème de réseau"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutRecruiter();
    setLoggedIn(false);
    setCurrentUser(null);
    setCvList([]);
    setStats(null);
    setShowCVList(false);
  };

  const resetForms = () => {
    setShowLogin(false);
    setShowRegister(false);
    setError("");
    setSuccess("");
    setLoginForm({ email: "", password: "" });
    setRegisterForm({ name: "", address: "", email: "", password: "" });
  };

  useEffect(() => {
    if (loggedIn && !stats) {
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);
  let box2 = [
    {
      titre: "Plateformes de sourcing et publication d'offres",
      description:
        "Les plateformes de sourcing et de publication d'offres incluent LinkedIn Recruiter pour contacter directement des développeurs, des sites d'annonces comme Indeed, Monster et Glassdoor, GitHub pour identifier et évaluer les contributions des développeurs, Stack Overflow Jobs pour les profils tech spécialisés, et AngelList pour recruter dans les startups.",
      url: "https://www.linkedin.com/talent/",
      image: "/Linkedin.webp",
    },

    {
      titre:
        "Outils de gestion du recrutement (ATS - Applicant Tracking Systems)",
      description:
        "Les ATS (Applicant Tracking Systems) comme Greenhouse, Lever, SmartRecruiters, Workable et Breezy HR permettent de centraliser les candidatures, gérer le pipeline de recrutement et intégrer des tests techniques.",
      url: "https://www.greenhouse.io/",
      image: "/Technologie.jpeg",
    },

    {
      titre: "Tests techniques et évaluation des compétences",
      description:
        "Les outils de tests techniques comme Codility, HackerRank, LeetCode, DevSkiller et Kaggle permettent d'évaluer les compétences des développeurs et data scientists via des exercices de codage et projets réels.",
      url: "https://www.codility.com/",
      image: "/DevloppeurX.jpeg",
    },

    {
      titre: "Outils de vidéo conférence",
      description:
        "Les outils de vidéoconférence comme Zoom, Microsoft Teams, Google Meet et Whereby sont utilisés pour réaliser des entretiens à distance.",
      url: "https://zoom.us/",
      image: "/microsoft.png",
    },
    {
      titre: "Outils de communication et collaboration interne",
      description:
        "Les outils comme Slack et Microsoft Teams facilitent la communication et la collaboration entre recruteurs et équipes techniques.",
      url: "https://slack.com/",
      image: "/Un_developpeur.png",
    },
  ];

  // Sites de recrutement pour développeurs
  const sitesRecrutement = [
    // Sites Marocains
    {
      nom: "Rekrute.com",
      description:
        "Premier site d'emploi au Maroc, spécialisé dans tous les secteurs y compris l'IT",
      url: "https://www.rekrute.com",
      logo: "/Developeurs.png",
      type: "maroc",
      pays: "Maroc",
      specialite: "Généraliste IT",
    },
    {
      nom: "Emploi.ma",
      description:
        "Plateforme leader au Maroc pour les offres d'emploi tech et développement",
      url: "https://www.emploi.ma",
      logo: "/DevloppeurX.jpeg",
      type: "maroc",
      pays: "Maroc",
      specialite: "Tech & Dev",
    },
    {
      nom: "Bayt.com",
      description:
        "Site d'emploi du Moyen-Orient et Afrique du Nord, très actif au Maroc",
      url: "https://www.bayt.com",
      logo: "/Developeurs.png",
      type: "maroc",
      pays: "MENA",
      specialite: "IT & Software",
    },
    {
      nom: "M3alem.com",
      description:
        "Plateforme marocaine pour freelances et projets de développement",
      url: "https://www.m3alem.com",
      logo: "/DevloppeurX.jpeg",
      type: "maroc",
      pays: "Maroc",
      specialite: "Freelance Dev",
    },

    // Sites Internationaux
    {
      nom: "LinkedIn Jobs",
      description:
        "Réseau professionnel mondial, incontournable pour le recrutement tech",
      url: "https://www.linkedin.com/jobs",
      logo: "/Developeurs.png",
      type: "international",
      pays: "Mondial",
      specialite: "Professional Network",
    },
    {
      nom: "Stack Overflow Jobs",
      description:
        "Plateforme spécialisée pour développeurs et professionnels tech",
      url: "https://stackoverflow.com/jobs",
      logo: "/DevloppeurX.jpeg",
      type: "international",
      pays: "Mondial",
      specialite: "Développeurs",
    },
    {
      nom: "GitHub Jobs",
      description:
        "Offres d'emploi directement intégrées à la plateforme de développement",
      url: "https://jobs.github.com",
      logo: "/Developeurs.png",
      type: "international",
      pays: "Mondial",
      specialite: "Open Source",
    },
    {
      nom: "AngelList",
      description:
        "Spécialisé dans les startups et entreprises tech innovantes",
      url: "https://angel.co/jobs",
      logo: "/DevloppeurX.jpeg",
      type: "international",
      pays: "Mondial",
      specialite: "Startups",
    },
    {
      nom: "Remote.co",
      description:
        "Plateforme dédiée aux emplois en télétravail pour développeurs",
      url: "https://remote.co",
      logo: "/Developeurs.png",
      type: "international",
      pays: "Remote",
      specialite: "Télétravail",
    },
    {
      nom: "Dice.com",
      description: "Site américain spécialisé dans les emplois technologiques",
      url: "https://www.dice.com",
      logo: "/DevloppeurX.jpeg",
      type: "international",
      pays: "USA",
      specialite: "Tech Jobs",
    },
  ];
  let box6 = [
    { image: "/Codeur-logo.png", lien: "https://www.codeur.com/" },

    { image: "/Freelancer.webp", lien: "https://www.freelancer.com/" },

    {
      image: "/Fiverr.png",
      lien: "https://www.fiverr.com/?msockid=0bd7572cab456563326442e2aa3c6404",
    },

    { image: "/Guru.jpg", lien: "https://www.guru.com/" },

    {
      image: "/Euros5.webp",
      lien: "https://comeup.com/en/5euros-devient-comeup",
    },

    {
      image: "/Le-studio.webp",
      lien: "https://www.bing.com/search?q=Le+Studio+Tech&FORM=HDRSC1",
    },

    { image: "/LeHibou.png", lien: "https://www.lehibou.com/" },
    { image: "/Linkedin.webp", lien: "https://fr.linkedin.com/" },

    { image: "/Malt.webp", lien: "https://www.malt.fr/" },

    { image: "/Toptal.png", lien: "https://www.toptal.com/" },
    { image: "/Upwork.webp", lien: "https://www.upwork.com/" },
    {
      image: "/PeoplePerHour-logo1.png",
      lien: "https://www.peopleperhour.com/",
    },
    {
      image: "/Creme.jpg",
      lien: "https://www.cremedelacreme.io/?utm_source=chatgpt.com",
    },
  ];

  return (
    <>
      <div className="les_recruteurs">
        <img
          src="/Recruteur.jpg"
          alt="image sur les recruteurs "
          width="400px"
          height="400px"
        />
        <h1 className="h1_recruteurs_static">Les recruteurs</h1>
        <h3 className="h3_recruteurs_static">
          Le recruteur est un professionnel qui identifie et sélectionne les
          meilleurs profils pour répondre aux besoins d'une entreprise,
          notamment dans le secteur tech.
        </h3>

        {/* 🎯 ESPACE RECRUTEUR - Authentification & Accès CV */}
        <div style={{
          backgroundColor: "#f8f9fa",
          border: "2px solid #007bff",
          borderRadius: "12px",
          padding: "25px",
          margin: "30px 20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ color: "#007bff", marginBottom: "20px", textAlign: "center" }}>
            🎯 Espace Recruteur
          </h2>

          {!loggedIn ? (
            // Interface non connecté
            <div>
              <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
                <button 
                  onClick={() => { resetForms(); setShowLogin(true); }}
                  className="btn-carte-recruteur"
                  style={{ backgroundColor: "#007bff", color: "white", padding: "12px 24px" }}
                >
                  🔐 Se connecter
                </button>
                <button 
                  onClick={() => { resetForms(); setShowRegister(true); }}
                  className="btn-carte-recruteur"
                  style={{ backgroundColor: "#28a745", color: "white", padding: "12px 24px" }}
                >
                  ✍️ S'inscrire
                </button>
              </div>

              {/* Formulaire de connexion */}
              {showLogin && (
                <form onSubmit={handleLogin} style={{ 
                  backgroundColor: "white", 
                  padding: "20px", 
                  borderRadius: "8px", 
                  border: "1px solid #ddd",
                  marginBottom: "15px"
                }}>
                  <h3 style={{ marginBottom: "15px", color: "#007bff" }}>🔐 Connexion Recruteur</h3>
                  <div style={{ marginBottom: "15px" }}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      required
                      style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      required
                      style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" disabled={loading} className="btn-carte-recruteur">
                      {loading ? "Connexion..." : "Se connecter"}
                    </button>
                    <button type="button" onClick={resetForms} className="btn-carte-recruteur">
                      Annuler
                    </button>
                  </div>
                </form>
              )}

              {/* Formulaire d'inscription */}
              {showRegister && (
                <form onSubmit={handleRegister} style={{ 
                  backgroundColor: "white", 
                  padding: "20px", 
                  borderRadius: "8px", 
                  border: "1px solid #ddd",
                  marginBottom: "15px"
                }}>
                  <h3 style={{ marginBottom: "15px", color: "#28a745" }}>✍️ Inscription Recruteur</h3>
                  <div style={{ marginBottom: "15px" }}>
                    <input
                      type="text"
                      placeholder="Nom du recruteur"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                      required
                      style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <input
                      type="text"
                      placeholder="Adresse du recruteur"
                      value={registerForm.address}
                      onChange={(e) => setRegisterForm({...registerForm, address: e.target.value})}
                      required
                      style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                      required
                      style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <input
                      type="password"
                      placeholder="Mot de passe (min. 6 caractères)"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      required
                      minLength="6"
                      style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" disabled={loading} className="btn-carte-recruteur">
                      {loading ? "Inscription..." : "S'inscrire"}
                    </button>
                    <button type="button" onClick={resetForms} className="btn-carte-recruteur">
                      Annuler
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            // Interface connecté
            <div>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <p style={{ fontSize: "18px", marginBottom: "15px" }}>
                  👋 Bienvenue <strong>{currentUser?.name}</strong> !
                </p>
                {stats && (
                  <div style={{ 
                    backgroundColor: "white", 
                    padding: "15px", 
                    borderRadius: "8px", 
                    marginBottom: "15px",
                    border: "1px solid #ddd"
                  }}>
                    <p><strong>📊 Statistiques:</strong> {stats.totalCV} CV disponibles sur {stats.totalCandidatures} candidatures</p>
                  </div>
                )}
              </div>
              
              <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
                <button 
                  onClick={fetchCV}
                  disabled={loading}
                  className="btn-carte-recruteur"
                  style={{ backgroundColor: "#17a2b8", color: "white", padding: "12px 24px" }}
                >
                  {loading ? "Chargement..." : "📋 Voir les CV"}
                </button>
                <button 
                  onClick={handleLogout}
                  className="btn-carte-recruteur"
                  style={{ backgroundColor: "#dc3545", color: "white", padding: "12px 24px" }}
                >
                  🚪 Se déconnecter
                </button>
              </div>
            </div>
          )}

          {/* Messages d'erreur */}
          {error && (
            <div style={{ 
              backgroundColor: "#f8d7da", 
              color: "#721c24", 
              padding: "12px", 
              borderRadius: "4px", 
              marginTop: "15px",
              border: "1px solid #f5c6cb"
            }}>
              {error}
            </div>
          )}

          {/* Messages de succès */}
          {success && (
            <div style={{ 
              backgroundColor: "#d4edda", 
              color: "#155724", 
              padding: "12px", 
              borderRadius: "4px", 
              marginTop: "15px",
              border: "1px solid #c3e6cb"
            }}>
              {success}
            </div>
          )}
        </div>
      </div>

      {/* Section des sites de recrutement */}
      <div className="section-sites-recrutement">
        <div className="sites-header">
          <h2 className="titre-sites-recrutement-static">
            🚀 Plateformes de Recrutement pour Développeurs
          </h2>
          <p className="sous-titre-sites">
            Découvrez les meilleures plateformes pour trouver votre prochain
            emploi
          </p>
        </div>

        <div className="grille-sites">
          {sitesRecrutement.map((site, index) => (
            <CarteSiteRecrutement
              key={index}
              nom={site.nom}
              description={site.description}
              url={site.url}
              logo={site.logo}
              type={site.type}
              pays={site.pays}
              specialite={site.specialite}
            />
          ))}
        </div>
      </div>

      <div className="div_recruter">
        <h2 className="titre-outils-recruteurs-static">
          Les outils couramment utilisés par les recruteurs pour le recrutement
          des développeurs
          <span className="main-pointeuse-recruteur">👇</span>
        </h2>
      </div>

      <div className="Recruteurs">
        {box2.map((valeur, index3) => (
          <CarteRecruteurs
            key={index3}
            titre={valeur.titre}
            description={valeur.description}
            url={valeur.url}
            image={valeur.image}
          />
        ))}
      </div>

      <div>
        <p className="p_recruteurs1 texte-blanc-freelance">
          Découvrez une sélection des sites freelance
        </p>
      </div>
      <div className="Recruteurs1">
        {box6.map((valeur1, index7) => (
          <CarteRecruteurs1
            key={index7}
            image={valeur1.image}
            lien={valeur1.lien}
          />
        ))}
      </div>

      {/* 📋 Section CV - Affichage sécurisé des CV */}
      {loggedIn && showCVList && (
        <div style={{
          backgroundColor: "#f8f9fa",
          border: "2px solid #17a2b8",
          borderRadius: "12px",
          padding: "25px",
          margin: "30px 20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#17a2b8", margin: 0 }}>📋 Liste des CV</h2>
            <button 
              onClick={() => setShowCVList(false)}
              style={{ 
                backgroundColor: "#6c757d", 
                color: "white", 
                border: "none", 
                padding: "8px 16px", 
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              ✖️ Fermer
            </button>
          </div>

          {loading && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p>🔄 Chargement des CV...</p>
            </div>
          )}

          {!loading && cvList.length === 0 && (
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "white", borderRadius: "8px" }}>
              <p>📭 Aucun CV disponible pour le moment.</p>
            </div>
          )}

          {!loading && cvList.length > 0 && (
            <div style={{ display: "grid", gap: "15px" }}>
              {cvList.map((candidat) => (
                <div key={candidat._id} style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "15px" }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: "0 0 10px 0", color: "#007bff" }}>
                        👤 {candidat.prenom} {candidat.nom}
                      </h3>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>📧 Email:</strong> {candidat.email || "Non renseigné"}
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>💼 Poste visé:</strong> {candidat.posteChoisi || "Non spécifié"}
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>🎓 Niveau d'étude:</strong> {candidat.niveauEtude || "Non renseigné"}
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>👥 Situation:</strong> {candidat.situationFamiliale || "Non renseignée"}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6c757d" }}>
                        📅 Candidature déposée le: {new Date(candidat.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
                      {candidat.cv ? (
                        <a 
                          href={getCVDownloadUrl(candidat.cv)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "6px",
                            textDecoration: "none",
                            fontWeight: "bold",
                            textAlign: "center",
                            minWidth: "150px"
                          }}
                        >
                          📄 Télécharger CV
                        </a>
                      ) : (
                        <div style={{
                          backgroundColor: "#ffc107",
                          color: "#856404",
                          padding: "10px 20px",
                          borderRadius: "6px",
                          fontWeight: "bold",
                          textAlign: "center",
                          minWidth: "150px"
                        }}>
                          ⚠️ Pas de CV
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "20px", padding: "15px", backgroundColor: "white", borderRadius: "8px" }}>
            <p style={{ margin: 0, color: "#6c757d" }}>
              📊 <strong>{cvList.length}</strong> CV{cvList.length > 1 ? 's' : ''} affiché{cvList.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
export default Recruteurs;
