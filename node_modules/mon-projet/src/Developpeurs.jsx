import "./Developpeurs.css";
import { useNavigate } from "react-router-dom";

function CarteDeveloppeurs({ titre, description }) {
  return (
    <div className="div_developpeurs">
      <h2>{titre}</h2>
      <h4>{description}</h4>
    </div>
  );
}

function CarteCandidat({
  nom,
  prenom,
  age,
  diplome,
  experience,
  salaire,
  photo,
  competences,
  localisation,
}) {
  return (
    <div className="carte-candidat">
      <div className="carte-header">
        <div className="photo-candidat">
          <img src={photo} alt={`${prenom} ${nom}`} />
        </div>
        <div className="info-principale">
          <h3 className="nom-candidat">
            {prenom} {nom}
          </h3>
          <p className="age-candidat">{age} ans</p>
          <p className="localisation-candidat">📍 {localisation}</p>
        </div>
      </div>

      <div className="carte-body">
        <div className="diplome-section">
          <h4>🎓 Formation</h4>
          <p>{diplome}</p>
        </div>

        <div className="experience-section">
          <h4>💼 Expérience</h4>
          <p>{experience}</p>
        </div>

        <div className="competences-section">
          <h4>🚀 Compétences</h4>
          <div className="competences-tags">
            {competences.map((comp, index) => (
              <span key={index} className="competence-tag">
                {comp}
              </span>
            ))}
          </div>
        </div>

        <div className="salaire-section">
          <h4>💰 Salaire souhaité</h4>
          <p className="salaire-montant">{salaire}</p>
        </div>
      </div>

      <div className="carte-footer">
        <button className="btn-contact">Contacter</button>
        <button className="btn-profil">Voir profil</button>
      </div>
    </div>
  );
}

function Developpeurs() {
  const navigate = useNavigate();

  let box1 = [
    {
      titre: "Langages de programmation (selon le domaine)",
      description:
        "Les langages et outils varient selon le domaine : web (frontend/backend), mobile, logiciel, data/IA, avec Git pour le versionnement et des bases de données relationnelles ou NoSQL.",
    },
    {
      titre: "Environnement de développement",
      description:
        "Un environnement de développement réunit un éditeur de code (comme VS Code), l’usage du terminal avec des commandes de base, et des gestionnaires de paquets adaptés au langage (npm, pip, composer).",
    },
    {
      titre: "Tests et débogage",
      description:
        "Les tests et le débogage reposent sur des frameworks dédiés (Jest, Pytest, JUnit, PHPUnit) pour valider le bon fonctionnement du code, des débogueurs intégrés aux IDE pour identifier les erreurs à l’exécution, ainsi que des linters et formatters (ESLint, Prettier, Black) pour maintenir un code propre et uniforme.",
    },
    {
      titre: "Déploiement & DevOps (bases recommandées)",
      description:
        "Maîtrise des bases de Docker, des pipelines CI/CD (GitHub Actions, GitLab CI, Jenkins) et des principales plateformes d’hébergement comme Vercel, Netlify, Heroku, AWS et DigitalOcean.",
    },
    {
      titre: "Soft Skills & pratiques pro",
      description:
        "Maîtrise des méthodologies Agile/Scrum, gestion de projet avec Trello/Jira, communication claire en anglais, et lecture efficace de documentation technique.",
    },
    {
      titre: "Portfolio & présence pro",
      description:
        "Avoir un GitHub organisé avec des projets soignés, un portfolio personnel clair incluant projets, CV et contact, un CV à jour, et un profil LinkedIn complet et professionnel.",
    },
    {
      titre: "Plateformes pour trouver un job",
      description:
        "Pour décrocher un job tech, explore des sites spécialisés (LinkedIn, Welcome to the Jungle, Indeed, Stack Overflow Jobs, Malt), engage-toi dans des hackathons, meetups, communautés Discord et forums, et valorise tes contributions open-source pour te différencier.",
    },
    {
      titre: "Bonus : selon le domaine, apprendre…",
      description:
        "Selon le domaine, il est utile d’apprendre la cybersécurité de base, les principes UX/UI surtout pour le frontend, l’architecture logicielle côté backend, ainsi que le Clean Code et les principes SOLID pour un code propre et maintenable.",
    },
  ];

  const candidats = [
    {
      nom: "Martin",
      prenom: "Sophie",
      age: 28,
      diplome: "Master en Informatique - EPITA",
      experience: "5 ans - Full Stack Developer",
      salaire: "55 000€ - 65 000€",
      photo: "/Developeurs.png",
      competences: ["React", "Node.js", "Python", "MongoDB", "AWS"],
      localisation: "Paris, France",
    },
    {
      nom: "Dubois",
      prenom: "Alexandre",
      age: 32,
      diplome: "Ingénieur Logiciel - INSA Lyon",
      experience: "8 ans - Lead Developer",
      salaire: "70 000€ - 80 000€",
      photo: "/DevloppeurX.jpeg",
      competences: ["Java", "Spring", "Angular", "PostgreSQL", "Docker"],
      localisation: "Lyon, France",
    },
    {
      nom: "Leroy",
      prenom: "Emma",
      age: 25,
      diplome: "Licence Pro Développement Web",
      experience: "3 ans - Frontend Developer",
      salaire: "40 000€ - 50 000€",
      photo: "/Developeurs.png",
      competences: ["Vue.js", "TypeScript", "CSS3", "Figma", "Git"],
      localisation: "Nantes, France",
    },
    {
      nom: "Garcia",
      prenom: "Thomas",
      age: 29,
      diplome: "Master DevOps - Université Paris-Saclay",
      experience: "6 ans - DevOps Engineer",
      salaire: "60 000€ - 70 000€",
      photo: "/DevloppeurX.jpeg",
      competences: ["Kubernetes", "Terraform", "Jenkins", "Azure", "Python"],
      localisation: "Toulouse, France",
    },
    {
      nom: "Moreau",
      prenom: "Camille",
      age: 26,
      diplome: "École 42 - Formation Développeur",
      experience: "4 ans - Mobile Developer",
      salaire: "48 000€ - 58 000€",
      photo: "/Developeurs.png",
      competences: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      localisation: "Bordeaux, France",
    },
    {
      nom: "Bernard",
      prenom: "Lucas",
      age: 31,
      diplome: "Master IA - Sorbonne Université",
      experience: "7 ans - Data Scientist",
      salaire: "65 000€ - 75 000€",
      photo: "/DevloppeurX.jpeg",
      competences: ["Python", "TensorFlow", "R", "SQL", "Spark"],
      localisation: "Lille, France",
    },
  ];

  return (
    <>
      <div className="les_developpeurs">
        <img src="/Un_developpeur.png" alt="image sur les developpeurs" />
        <h1 className="h1_developpeurs">Les developpeurs</h1>
        <h3 className="h3_developpeurs">
          <span className="texte-lumineux-dev">
            {"Les développeurs sont les artisans du monde numérique, créant et maintenant les applications et sites web qui facilitent notre quotidien. Maîtres de plusieurs langages de programmation, ils innovent et optimisent les solutions digitales. Leur expertise est essentielle pour toute entreprise souhaitant réussir sa transformation numérique."
              .split("")
              .map((char, index) => (
                <span
                  key={index}
                  className="lettre-brillante-dev"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
          </span>
        </h3>
      </div>
      <div className="button_candidat">
        <span className="hand-icon" aria-hidden="true" title="Cliquez ici">👉</span>
        <button onClick={() => navigate("/formulaire")}>
          ➕ Ajouter un candidat
        </button>
      </div>

      <div className="section-candidats">
        <div className="candidats-header">
          <h2 className="titre-candidats">🚀 Nos Développeurs Talents</h2>
          <p className="sous-titre-candidats">
            Découvrez les profils de nos développeurs expérimentés
          </p>
        </div>

        <div className="grille-candidats">
          {candidats.map((candidat, index) => (
            <CarteCandidat
              key={index}
              nom={candidat.nom}
              prenom={candidat.prenom}
              age={candidat.age}
              diplome={candidat.diplome}
              experience={candidat.experience}
              salaire={candidat.salaire}
              photo={candidat.photo}
              competences={candidat.competences}
              localisation={candidat.localisation}
            />
          ))}
        </div>
      </div>

      <div className="div_devlopper">
        <h2 className="titre-outils-essentiels">
          {"Les outils essentiels qu'un développeur doit maîtriser ou connaître"
            .split("")
            .map((char, index) => (
              <span
                key={index}
                className="lettre-animee"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
        </h2>
      </div>

      <div className="container-cartes-dev">
        {box1.map((valeur, index) => (
          <CarteDeveloppeurs
            key={index}
            titre={valeur.titre}
            description={valeur.description}
          />
        ))}
      </div>
    </>
  );
}

export default Developpeurs;
