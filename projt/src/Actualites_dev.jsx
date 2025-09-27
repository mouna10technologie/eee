import "./Actualites_dev.css";

function CarteActualités({ titre, description, url, image }) {
  const handleClick = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="div_actualités">
      {image && (
        <div className="image-actualites-container">
          <img src={image} alt={titre} className="image-actualites" />
        </div>
      )}
      <div className="contenu-actualites">
        <h2>{titre}</h2>
        <h4>{description}</h4>
        {url && (
          <button className="btn-carte-actualite" onClick={handleClick}>
            Visiter le site
          </button>
        )}
      </div>
    </div>
  );
}

function CarteActualite({
  titre,
  description,
  image,
  categorie,
  date,
  auteur,
  lienLecture,
}) {
  const handleLireClick = () => {
    if (lienLecture) {
      window.open(lienLecture, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div className="carte-actualite">
      <div className="carte-actualite-header">
        <div className="image-actualite">
          <img src={image} alt={titre} />
        </div>
        <div className="badge-categorie">
          <span
            className={`badge-cat ${categorie
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {categorie}
          </span>
        </div>
      </div>

      <div className="carte-actualite-body">
        <h3 className="titre-actualite">{titre}</h3>
        <p className="description-actualite">{description}</p>

        <div className="meta-actualite">
          <div className="date-actualite">
            <span>📅 {date}</span>
          </div>
          <div className="auteur-actualite">
            <span>✍️ {auteur}</span>
          </div>
        </div>
      </div>

      <div className="carte-actualite-footer">
        <button className="btn-lire" onClick={handleLireClick} aria-label={`Lire l'article: ${titre}`}>
          <span>Lire l'article</span>
          <span className="arrow-read">📖</span>
        </button>
      </div>

      <div className="hover-overlay-actualite">
        <button
          type="button"
          className="btn-overlay-lire"
          onClick={handleLireClick}
          aria-label={`Lire l'article: ${titre}`}
        >
          Cliquer pour lire
        </button>
      </div>
    </div>
  );
}

function Actualites_dev() {
  let box3 = [
    {
      titre: "Sites Web et plateformes de contenu tech",
      description:
        "Sites comme Hacker News, Reddit (r/programming, r/webdev...), Medium, Dev.to et Hashnode offrent des actualités tech, des discussions, des articles et des tutoriels pour les développeurs..",
      url: "https://news.ycombinator.com/",
      image: "/news-technology.webp",
    },
    {
      titre: "Newsletters Tech populaires",
      description:
        "Des newsletters comme JavaScript Weekly, Frontend Focus, TLDR ou The Pragmatic Engineer offrent un résumé régulier de l'actualité tech, du développement web, de l'IA et des tendances du secteur.",
      url: "https://javascriptweekly.com/",
      image: "/Developeurs.png",
    },
    {
      titre: "Podcasts pour développeurs",
      description:
        "Les podcasts comme Syntax.fm, CodeNewbie, Developer Tea, The Changelog et Command Line Heroes permettent aux développeurs de rester informés sur le frontend, les projets open source, les carrières tech et l'histoire de la technologie.",
      url: "https://syntax.fm/",
      image: "/DevloppeurX.jpeg",
    },
    {
      titre: "Chaînes YouTube",
      description:
        "Des chaînes YouTube comme Fireship, The Net Ninja, Traversy Media ou TechWorld with Nana proposent des vidéos pédagogiques et actuelles sur le développement, le DevOps, et les technologies cloud.",
      url: "https://www.youtube.com/@Fireship",
      image: "/google.webp",
    },
    {
      titre: "Communautés / Forums",
      description:
        "Des communautés comme Stack Overflow, Discord, GitHub Trending et Twitter/X permettent de suivre les tendances, échanger avec d'autres développeurs et découvrir des projets ou contenus populaires..",
      url: "https://stackoverflow.com/",
      image: "/Un_developpeur.png",
    },
    {
      titre: "Conférences et événements",
      description:
        "Des conférences comme Google I/O, WWDC, JSConf ou des meetups locaux permettent de découvrir les nouveautés tech, approfondir des sujets spécialisés et rencontrer la communauté.",
      url: "https://events.google.com/io/",
      image: "/Technologie.jpeg",
    },
    {
      titre: "Outils de veille tech automatisée",
      description:
        "Des outils comme Feedly, Daily.dev, Pocket et GitHub permettent d'automatiser la veille tech en centralisant, sauvegardant et suivant les contenus et projets pertinents.",
      url: "https://daily.dev/",
      image: "/ai3.jpg",
    },
  ];

  // Actualités développement avec contenus variés
  const actualitesRecentes = [
    {
      titre: "React 19 : Les nouvelles fonctionnalités révolutionnaires",
      description:
        "Découvrez les Server Components, les nouvelles APIs de concurrence et les améliorations de performance qui transforment le développement React.",
      image: "/Developeurs.png",
      categorie: "Développeurs",
      date: "15 Déc 2024",
      auteur: "Sarah Chen",
      lienLecture: "https://react.dev/blog",
    },
    {
      titre: "GPT-5 et l'avenir de l'IA générative en 2025",
      description:
        "OpenAI annonce des avancées majeures en IA multimodale. Impact sur le développement, l'automatisation du code et les outils de productivité.",
      image: "/DevloppeurX.jpeg",
      categorie: "Intelligence Artificielle",
      date: "12 Déc 2024",
      auteur: "Dr. Alex Kumar",
      lienLecture: "https://openai.com/research",
    },
    {
      titre: "Rust dépasse C++ : La révolution des langages système",
      description:
        "Analyse de l'adoption croissante de Rust dans les projets critiques. Performance, sécurité mémoire et écosystème en pleine expansion.",
      image: "/Developeurs.png",
      categorie: "Langages",
      date: "10 Déc 2024",
      auteur: "Marcus Weber",
      lienLecture: "https://www.rust-lang.org/learn",
    },
    {
      titre: "WebAssembly 3.0 : Performance native dans le navigateur",
      description:
        "Les nouvelles spécifications WASM révolutionnent le web. Applications desktop-class, gaming et calcul scientifique directement en ligne.",
      image: "/DevloppeurX.jpeg",
      categorie: "Nouvelles Technologies",
      date: "8 Déc 2024",
      auteur: "Elena Rodriguez",
      lienLecture: "https://webassembly.org",
    },
    {
      titre: "GitHub Copilot X : L'IA qui code mieux que les humains ?",
      description:
        "Retour d'expérience sur les dernières capacités de Copilot. Génération de tests, debugging automatique et pair programming avec l'IA.",
      image: "/Developeurs.png",
      categorie: "Intelligence Artificielle",
      date: "5 Déc 2024",
      auteur: "Thomas Liu",
      lienLecture: "https://github.com/features/copilot",
    },
    {
      titre: "TypeScript 5.5 : Inférence de types révolutionnaire",
      description:
        "Les nouvelles fonctionnalités de TypeScript améliorent drastiquement l'expérience développeur. Pattern matching et types conditionnels avancés.",
      image: "/DevloppeurX.jpeg",
      categorie: "Langages",
      date: "3 Déc 2024",
      auteur: "Jessica Park",
      lienLecture: "https://www.typescriptlang.org",
    },
    {
      titre: "Edge Computing : L'architecture du futur",
      description:
        "Comment l'edge computing transforme les applications web. Latence ultra-faible, traitement local et nouvelles architectures distribuées.",
      image: "/Developeurs.png",
      categorie: "Nouvelles Technologies",
      date: "1 Déc 2024",
      auteur: "David Kim",
      lienLecture: "https://developer.mozilla.org",
    },
    {
      titre: "Salaires développeurs 2025 : Tendances et prédictions",
      description:
        "Étude complète sur l'évolution des salaires dans la tech. Remote work, spécialisations les plus demandées et négociation salariale.",
      image: "/DevloppeurX.jpeg",
      categorie: "Développeurs",
      date: "28 Nov 2024",
      auteur: "Marie Dubois",
      lienLecture: "https://stackoverflow.com/jobs",
    },
    {
      titre: "Quantum Computing : Premiers algorithmes pratiques",
      description:
        "IBM et Google annoncent des percées en informatique quantique. Applications concrètes pour la cryptographie et l'optimisation.",
      image: "/Developeurs.png",
      categorie: "Nouvelles Technologies",
      date: "25 Nov 2024",
      auteur: "Prof. Ahmed Hassan",
      lienLecture: "https://quantum-computing.ibm.com",
    },
  ];

  return (
    <>
      <div className="Les_actualités">
        <img className="imageac" src="/news-technology.webp" />
        <h1 className="h1_actualités_static">Les actualités</h1>
        <h3 className="h3_actualités_static">
          Suivez les actualités clés du développement, quels que soient votre niveau et votre spécialité : nouvelles technologies, langages à jour, outils émergents et tendances du secteur.
        </h3>
      </div>

      {/* Section des actualités récentes */}
      <div className="section-actualites-recentes">
        <div className="actualites-header">
          <h2 className="titre-actualites-recentes-static">
            🚀 Actualités Développement & Tech
          </h2>
          <p className="sous-titre-actualites">
            Restez à jour avec les dernières innovations technologiques
          </p>
        </div>

        <div className="grille-actualites">
          {actualitesRecentes.map((actualite, index) => (
            <CarteActualite
              key={index}
              titre={actualite.titre}
              description={actualite.description}
              image={actualite.image}
              categorie={actualite.categorie}
              date={actualite.date}
              auteur={actualite.auteur}
              lienLecture={actualite.lienLecture}
            />
          ))}
        </div>
      </div>

      <div className="div_actuel">
        <h2 className="titre-outils-actualites-static">
          Les outils et ressources que les développeurs utilisent pour rester à jour
          <span className="main-pointeuse">👇</span>
        </h2>
      </div>

      <div className="Actualités">
        {box3.map((valeur, index4) => (
          <CarteActualités
            key={index4}
            titre={valeur.titre}
            description={valeur.description}
            url={valeur.url}
            image={valeur.image}
          />
        ))}
      </div>
    </>
  );
}
export default Actualites_dev;
