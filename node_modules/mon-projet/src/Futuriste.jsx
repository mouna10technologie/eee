import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Futuriste.css";

function Futuriste() {
  const navigate = useNavigate();

  // Liste des images situées dans public/image
  // Ajoutez ici les noms de fichiers présents dans votre dossier public/image
  const galleryImages = [
    "/image/AA1MONYm.jpg",
    "/image/AA1MOSoX.jpg",
    "/image/ai robot.png",
    // "/image/Artificial-Intelligence7.jpg", // décommentez si ce fichier existe
    "/image/brt.jpg",
    "/image/brt.png",
    "/image/brttt.jpg",
    "/image/btr.webp",
    "/image/ia1.avif",
    "/image/ia2.avif",
    "/image/ia3.avif",
    "/image/rb.webp",
    "/image/ro.jpg",
    "/image/robbota.webp",
    "/image/robo.webp",
    "/image/robo5.webp",
    "/image/robot1.jpg",
    "/image/robot2.jpg",
    "/image/robot3.jpg",
    // Nouveaux fichiers fournis
    "/image/robot678.webp",
    "/image/robot765.jpg",
    "/image/robot876.webp",
    "/image/robot987.jpg",
    "/image/robota.webp",
  ];

  // Précharger les images et ne garder que celles qui se chargent
  const [loadedImages, setLoadedImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const preload = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ ok: true, src });
        img.onerror = () => resolve({ ok: false, src });
        img.src = src;
      });
    Promise.all(galleryImages.map(preload)).then((results) => {
      if (!isMounted) return;
      const ok = results.filter((r) => r.ok).map((r) => r.src);
      setLoadedImages(ok);
      setCurrentSlide(0);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loadedImages.length) return;
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % loadedImages.length);
    }, 3000); // 3s par slide
    return () => clearInterval(id);
  }, [loadedImages.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % loadedImages.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + loadedImages.length) % loadedImages.length);
  const goToSlide = (index) => setCurrentSlide(index);

  const handleGoHome = () => navigate("/");

  return (
    <div className="futuriste-page">
      {/* Visuel fort/futuriste */}
      <section className="futuriste-hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="futuriste-title">
            {"Recrutement IT : Anticiper. Innover. Reussir.".split("").map(
              (c, i) => (
                <span
                  key={i}
                  className="letter-glow"
                  style={{ animationDelay: `${i * 0.02}s` }}
                >
                  {c === " " ? "\u00A0" : c}
                </span>
              )
            )}
          </h1>
          <p className="futuriste-subtitle">
            Les talents tech façonnent demain. Les entreprises qui gagnent sont
            celles qui savent les attirer, les évaluer et les inspirer.
          </p>
          <p className="futuriste-hook">
            "L'emploi tech évolue. Soyez du côté du futur."
          </p>
          <button className="btn-retour-home" onClick={handleGoHome}>
            Retour à l'accueil
            <span className="arrow-home">→</span>
          </button>
        </div>
      </section>

      {/* Slider auto-défilant d'images */}
      <section className="slider-section">
        <div className="slider-container">
          {loadedImages.length > 0 && (
            <img
              key={currentSlide}
              src={loadedImages[currentSlide]}
              alt={`slide-futuriste-${currentSlide + 1}`}
              className="slider-image"
            />
          )}
          <button className="slider-btn prev" onClick={prevSlide} aria-label="Précédent">❮</button>
          <button className="slider-btn next" onClick={nextSlide} aria-label="Suivant">❯</button>
          <div className="slider-dots">
            {loadedImages.map((_, i) => (
              <button
                key={i}
                className={`slider-dot ${i === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(i)}
                aria-label={`Aller au slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enjeux du recrutement IT */}
      <section className="enjeux-section">
        <div className="enjeux-grid">
          <div className="enjeux-card">
            <h3>Compétences rares</h3>
            <p>
              IA, cybersécurité, cloud, data: les expertises critiques se font
              rares, la concurrence est mondiale.
            </p>
          </div>
          <div className="enjeux-card">
            <h3>Vitesse et qualité</h3>
            <p>
              Aller vite sans compromettre l'évaluation: process agiles et
              épreuves techniques adaptées.
            </p>
          </div>
          <div className="enjeux-card">
            <h3>Marque employeur</h3>
            <p>
              Les meilleurs profils choisissent l'impact, la culture et la
              vision: valorisez votre proposition unique.
            </p>
          </div>
          <div className="enjeux-card">
            <h3>Diversité & inclusion</h3>
            <p>
              Les équipes plurielle innovent plus. Construisez des parcours
              justes et accessibles.
            </p>
          </div>
        </div>
      </section>

      {/* Galerie d'images depuis public/image */}
      <section className="galerie-section">
        <h2 className="galerie-title">Galerie futuriste</h2>
        <div className="galerie-grid">
          {loadedImages.map((src, idx) => (
            <figure key={idx} className="galerie-item">
              <img src={src} alt={`galerie-futuriste-${idx + 1}`} />
              <figcaption>Technologies, IA et développement</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Futuriste;
