import React, { useEffect, useState } from "react";
import "./IA.css";

// Composant pour les cartes de types d'IA
function CarteTypeIA({
  nom,
  description,
  icone,
  domaine,
  applications,
  niveau,
  couleur,
}) {
  return (
    <div className={`carte-type-ia ${couleur}`}>
      <div className="carte-ia-header">
        <div className="icone-ia">
          <span className="icone-emoji">{icone}</span>
        </div>
        <div className="badge-niveau">
          <span className={`niveau ${niveau.toLowerCase()}`}>{niveau}</span>
        </div>
      </div>
      <div className="carte-ia-body">
        <h3 className="nom-type-ia">{nom}</h3>
        <p className="description-type-ia">{description}</p>
        <div className="domaine-section">
          <h4>🎯 Domaine</h4>
          <span className="domaine-badge">{domaine}</span>
        </div>
        <div className="applications-section">
          <h4>⚡ Applications</h4>
          <div className="applications-tags">
            {applications.map((app, index) => (
              <span key={index} className="application-tag">
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="carte-ia-footer">
        <button className="btn-explorer">
          <span>Explorer</span>
          <span className="arrow-explore">→</span>
        </button>
      </div>
      <div className="hover-overlay-ia">
        <span className="click-text-ia">Découvrir plus</span>
      </div>
    </div>
  );
}

// Composant pour le carrousel 3D
function Carrousel3D() {
  const [rotation, setRotation] = useState(0);

  const imagesIA = [
    {
      src: "/ia.jpeg",
      alt: "Intelligence Artificielle Générale",
      titre: "IA Générale",
    },
    {
      src: "/developpeur_ia.png",
      alt: "Machine Learning",
      titre: "Machine Learning",
    },
    {
      src: "/ai3.jpg",
      alt: "Deep Learning",
      titre: "Deep Learning",
    },
    {
      src: "/ai.jpg",
      alt: "IA Conversationnelle",
      titre: "Chatbots IA",
    },
    {
      src: "/ai3.jpg",
      alt: "Vision par Ordinateur",
      titre: "Computer Vision",
    },
    {
      src: "/ai4.jpg",
      alt: "Traitement du Langage",
      titre: "NLP",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 60);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carrousel-3d-container">
      <div
        className="carrousel-3d"
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {imagesIA.map((image, index) => (
          <div
            key={index}
            className="carrousel-item"
            style={{ transform: `rotateY(${index * 60}deg) translateZ(300px)` }}
          >
            <div className="image-3d-wrapper">
              <img src={image.src} alt={image.alt} />
              <div className="image-overlay">
                <h4>{image.titre}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="carrousel-controls">
        <div className="control-dot active"></div>
        <div className="control-dot"></div>
        <div className="control-dot"></div>
      </div>
    </div>
  );
}

// Composant pour le titre animé
function TitreAnimeIA({ texte }) {
  return (
    <h1 className="titre-ia-anime">
      {texte.split("").map((lettre, index) => (
        <span
          key={index}
          className="lettre-animee-ia"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {lettre === " " ? "\u00A0" : lettre}
        </span>
      ))}
    </h1>
  );
}

function IA() {
  const typesIA = [
    {
      nom: "Machine Learning",
      description:
        "Algorithmes qui apprennent automatiquement à partir de données pour faire des prédictions ou prendre des décisions.",
      icone: "🤖",
      domaine: "Apprentissage Automatique",
      applications: ["Recommandations", "Prédictions", "Classification"],
      niveau: "Avancé",
      couleur: "bleu",
    },
    {
      nom: "Deep Learning",
      description:
        "Réseaux de neurones profonds inspirés du cerveau humain pour résoudre des problèmes complexes.",
      icone: "🧠",
      domaine: "Réseaux de Neurones",
      applications: ["Vision", "Reconnaissance vocale", "Traduction"],
      niveau: "Expert",
      couleur: "violet",
    },
    {
      nom: "IA Conversationnelle",
      description:
        "Systèmes capables de comprendre et de générer du langage naturel pour interagir avec les humains.",
      icone: "💬",
      domaine: "Traitement du Langage",
      applications: ["Chatbots", "Assistants virtuels", "Support client"],
      niveau: "Intermédiaire",
      couleur: "dore",
    },
    {
      nom: "Computer Vision",
      description:
        "Technologie permettant aux machines de voir, identifier et analyser le contenu visuel.",
      icone: "👁️",
      domaine: "Vision Artificielle",
      applications: [
        "Reconnaissance faciale",
        "Analyse d'images",
        "Véhicules autonomes",
      ],
      niveau: "Avancé",
      couleur: "vert",
    },
    {
      nom: "IA Générative",
      description:
        "Modèles capables de créer du nouveau contenu original basé sur les données d'entraînement.",
      icone: "🎨",
      domaine: "Génération de Contenu",
      applications: ["Art IA", "Génération de texte", "Création musicale"],
      niveau: "Expert",
      couleur: "rose",
    },
    {
      nom: "Robotique IA",
      description:
        "Intelligence artificielle intégrée dans des systèmes robotiques pour l'automatisation avancée.",
      icone: "🦾",
      domaine: "Robotique Intelligente",
      applications: [
        "Robots industriels",
        "Drones autonomes",
        "Assistance médicale",
      ],
      niveau: "Expert",
      couleur: "orange",
    },
  ];

  return (
    <div className="section-ia">
      {/* Header avec titre animé */}
      <div className="ia-header">
        <TitreAnimeIA texte="Intelligence Artificielle" />
        <p className="sous-titre-ia">
          Découvrez l'univers fascinant de l'IA et ses applications
          révolutionnaires dans le monde du développement
        </p>
      </div>

      {/* Carrousel 3D */}
      <div className="section-carrousel">
        <h2 className="titre-section-carrousel">
          <span className="lettre-animee-carrousel">E</span>
          <span className="lettre-animee-carrousel">x</span>
          <span className="lettre-animee-carrousel">p</span>
          <span className="lettre-animee-carrousel">l</span>
          <span className="lettre-animee-carrousel">o</span>
          <span className="lettre-animee-carrousel">r</span>
          <span className="lettre-animee-carrousel">e</span>
          <span className="lettre-animee-carrousel">z</span>
          <span className="lettre-animee-carrousel">&nbsp;</span>
          <span className="lettre-animee-carrousel">l</span>
          <span className="lettre-animee-carrousel">'</span>
          <span className="lettre-animee-carrousel">I</span>
          <span className="lettre-animee-carrousel">A</span>
          <span className="lettre-animee-carrousel">&nbsp;</span>
          <span className="lettre-animee-carrousel">e</span>
          <span className="lettre-animee-carrousel">n</span>
          <span className="lettre-animee-carrousel">&nbsp;</span>
          <span className="lettre-animee-carrousel">3</span>
          <span className="lettre-animee-carrousel">D</span>
        </h2>
        <Carrousel3D />
      </div>

      {/* Section des types d'IA */}
      <div className="section-types-ia">
        <h2 className="titre-types-ia">
          <span className="lettre-animee-types">T</span>
          <span className="lettre-animee-types">y</span>
          <span className="lettre-animee-types">p</span>
          <span className="lettre-animee-types">e</span>
          <span className="lettre-animee-types">s</span>
          <span className="lettre-animee-types">&nbsp;</span>
          <span className="lettre-animee-types">d</span>
          <span className="lettre-animee-types">'</span>
          <span className="lettre-animee-types">I</span>
          <span className="lettre-animee-types">A</span>
        </h2>
        <div className="grille-types-ia">
          {typesIA.map((type, index) => (
            <CarteTypeIA key={index} {...type} />
          ))}
        </div>
      </div>

      {/* Section informative */}
      <div className="section-info-ia">
        <div className="info-container">
          <div className="info-text">
            <h3>L'IA dans le Recrutement</h3>
            <p>
              L'intelligence artificielle révolutionne le recrutement en
              analysant rapidement les CV, en identifiant les meilleurs profils
              et en automatisant certaines étapes. Elle rend le processus plus
              rapide et efficace tout en soulevant des enjeux éthiques
              importants sur la transparence et la protection des données.
            </p>
          </div>
          <div className="info-stats">
            <div className="stat-item">
              <span className="stat-number">85%</span>
              <span className="stat-label">Gain de temps</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">60%</span>
              <span className="stat-label">Précision améliorée</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">40%</span>
              <span className="stat-label">Réduction des biais</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IA;
