import React, { useState } from "react";
import "./Contact.css";

// Composant pour le titre animé
function TitreAnimeContact({ texte }) {
  return (
    <h1 className="titre-contact-anime">
      {texte.split('').map((lettre, index) => (
        <span 
          key={index} 
          className="lettre-animee-contact"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {lettre === ' ' ? '\u00A0' : lettre}
        </span>
      ))}
    </h1>
  );
}

// Composant pour les informations de contact
function InfoContact({ icone, titre, contenu, lien }) {
  return (
    <div className="info-contact-item">
      <div className="icone-contact">
        <span className="icone-emoji">{icone}</span>
      </div>
      <div className="contenu-contact">
        <h4>{titre}</h4>
        {lien ? (
          <a href={lien} className="lien-contact">{contenu}</a>
        ) : (
          <p>{contenu}</p>
        )}
      </div>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi (remplacer par vraie logique d'envoi)
    setTimeout(() => {
      setSubmitMessage('Message envoyé avec succès ! Nous vous répondrons bientôt.');
      setFormData({ nom: '', prenom: '', email: '', message: '' });
      setIsSubmitting(false);
      
      // Effacer le message après 5 secondes
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 2000);
  };

  return (
    <div className="section-contact">
      {/* Header avec titre animé */}
      <div className="contact-header">
        <TitreAnimeContact texte="Contactez-nous" />
        <p className="sous-titre-contact">
          Restez en contact avec les talents, les recruteurs et les opportunités qui comptent
        </p>
      </div>

      <div className="contact-container">
        {/* Section formulaire */}
        <div className="section-formulaire">
          <div className="formulaire-wrapper">
            <h2 className="titre-formulaire">
              <span className="lettre-animee-form">E</span>
              <span className="lettre-animee-form">n</span>
              <span className="lettre-animee-form">v</span>
              <span className="lettre-animee-form">o</span>
              <span className="lettre-animee-form">y</span>
              <span className="lettre-animee-form">e</span>
              <span className="lettre-animee-form">z</span>
              <span className="lettre-animee-form">&nbsp;</span>
              <span className="lettre-animee-form">u</span>
              <span className="lettre-animee-form">n</span>
              <span className="lettre-animee-form">&nbsp;</span>
              <span className="lettre-animee-form">m</span>
              <span className="lettre-animee-form">e</span>
              <span className="lettre-animee-form">s</span>
              <span className="lettre-animee-form">s</span>
              <span className="lettre-animee-form">a</span>
              <span className="lettre-animee-form">g</span>
              <span className="lettre-animee-form">e</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="formulaire-contact">
              <div className="groupe-champs">
                <div className="champ-wrapper">
                  <label htmlFor="prenom">Prénom</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    placeholder="Votre prénom"
                  />
                </div>
                <div className="champ-wrapper">
                  <label htmlFor="nom">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              
              <div className="champ-wrapper">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre.email@exemple.com"
                />
              </div>
              
              <div className="champ-wrapper">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Écrivez votre message ici..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`btn-envoyer ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <span>Envoyer</span>
                    <span className="arrow-send">✈️</span>
                  </>
                )}
              </button>
              
              {submitMessage && (
                <div className="message-succes">
                  <span className="icone-succes">✅</span>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Section informations de contact */}
        <div className="section-infos">
          <div className="infos-wrapper">
            <h2 className="titre-infos">
              <span className="lettre-animee-info">N</span>
              <span className="lettre-animee-info">o</span>
              <span className="lettre-animee-info">s</span>
              <span className="lettre-animee-info">&nbsp;</span>
              <span className="lettre-animee-info">I</span>
              <span className="lettre-animee-info">n</span>
              <span className="lettre-animee-info">f</span>
              <span className="lettre-animee-info">o</span>
              <span className="lettre-animee-info">r</span>
              <span className="lettre-animee-info">m</span>
              <span className="lettre-animee-info">a</span>
              <span className="lettre-animee-info">t</span>
              <span className="lettre-animee-info">i</span>
              <span className="lettre-animee-info">o</span>
              <span className="lettre-animee-info">n</span>
              <span className="lettre-animee-info">s</span>
            </h2>
            
            <div className="liste-infos-contact">
              <InfoContact 
                icone="📞"
                titre="Téléphone"
                contenu="+212 6 79 01 34 59"
                lien="tel:+212679013459"
              />
              <InfoContact 
                icone="📧"
                titre="Email"
                contenu="Dev_job@gmail.com"
                lien="mailto:Dev_job@gmail.com"
              />
              <InfoContact 
                icone="📍"
                titre="Adresse"
                contenu="Casablanca, Maroc"
              />
              <InfoContact 
                icone="🕒"
                titre="Horaires"
                contenu="Lun - Ven : 9h00 - 18h00"
              />
            </div>
            
            {/* Section réseaux sociaux */}
            <div className="section-reseaux">
              <h3>Suivez-nous</h3>
              <div className="reseaux-sociaux">
                <a href="#" className="reseau-social linkedin">
                  <span>💼</span>
                  LinkedIn
                </a>
                <a href="#" className="reseau-social twitter">
                  <span>🐦</span>
                  Twitter
                </a>
                <a href="#" className="reseau-social facebook">
                  <span>📘</span>
                  Facebook
                </a>
                <a href="#" className="reseau-social instagram">
                  <span>📷</span>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
