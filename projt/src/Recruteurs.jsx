import "./Recruteurs.css";
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
    </>
  );
}
export default Recruteurs;
