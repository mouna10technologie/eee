import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './JobDetails.css';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    message: '',
    cv: null
  });
  const [applicationLoading, setApplicationLoading] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  useEffect(() => {
    const isValidObjectId = (val) => typeof val === 'string' && /^[a-fA-F0-9]{24}$/.test(val);
    if (!id || id === 'undefined' || !isValidObjectId(id)) {
      console.error('ID invalide pour JobDetails:', id);
      setError("Identifiant d'offre manquant ou invalide dans l'URL");
      setLoading(false);
      // Naviguer en arrière pour éviter de rester sur une page cassée
      try { navigate(-1); } catch (_) {}
      return;
    }
    fetchJobDetails();
  }, [id]);

  // Ouvrir automatiquement le formulaire si on vient du bouton "Postuler"
  useEffect(() => {
    if (location?.state?.openForm) {
      setShowApplicationForm(true);
      // Nettoyer l'état de navigation pour éviter une réouverture au back
      window.history.replaceState({}, document.title);
    }
  }, [location?.state]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      setJob(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des détails de l\'offre');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setApplicationLoading(true);

    try {
      const formData = new FormData();
      Object.keys(applicationData).forEach(key => {
        if (applicationData[key]) {
          formData.append(key, applicationData[key]);
        }
      });
      formData.append('posteChoisi', job.titre);

      const response = await axios.post('http://localhost:5000/candidatures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setApplicationSuccess(true);
      setShowApplicationForm(false);
      
      // Réinitialiser le formulaire
      setApplicationData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        message: '',
        cv: null
      });

    } catch (err) {
      console.error('Erreur lors de l\'envoi de la candidature:', err);
      alert('Erreur lors de l\'envoi de votre candidature. Veuillez réessayer.');
    } finally {
      setApplicationLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  if (loading) {
    return (
      <div className="job-details-container">
        <div className="loading-spinner-large">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-details-container">
        <div className="error-message-large">
          ⚠️ {error}
          <button onClick={() => navigate(-1)} className="back-button">
            Retour
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-container">
        <div className="error-message-large">
          Offre d'emploi non trouvée
          <button onClick={() => navigate(-1)} className="back-button">
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Retour aux résultats
      </button>

      {applicationSuccess && (
        <div className="success-message">
          ✅ Votre candidature a été envoyée avec succès !
        </div>
      )}

      <div className="job-details-card">
        <div className="job-header">
          <h1 className="job-title">{job.titre}</h1>
          <h2 className="job-company">{job.entreprise}</h2>
        </div>

        <div className="job-meta-info">
          <div className="meta-item">
            <span className="meta-label">📍 Localisation :</span>
            <span className="meta-value">{job.ville}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">🏢 Secteur :</span>
            <span className="meta-value">{job.secteur}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">💼 Type de contrat :</span>
            <span className="meta-value">{job.typeContrat}</span>
          </div>
          {job.salaire && (
            <div className="meta-item">
              <span className="meta-label">💰 Salaire :</span>
              <span className="meta-value">{job.salaire}</span>
            </div>
          )}
          <div className="meta-item">
            <span className="meta-label">🎓 Niveau d'étude :</span>
            <span className="meta-value">{job.niveauEtude || 'Non spécifié'}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">⏱️ Expérience requise :</span>
            <span className="meta-value">{job.experienceRequise || 'Non spécifié'}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">📅 Date de publication :</span>
            <span className="meta-value">{new Date(job.datePublication).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>

        <div className="job-section">
          <h3>📝 Description du poste</h3>
          <p className="job-description">{job.description}</p>
        </div>

        {job.competencesRequises && job.competencesRequises.length > 0 && (
          <div className="job-section">
            <h3>🛠️ Compétences requises</h3>
            <div className="skills-list">
              {job.competencesRequises.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        <div className="job-actions">
          <button 
            className="apply-btn-large"
            onClick={() => setShowApplicationForm(true)}
          >
            📧 Postuler maintenant
          </button>
          <button 
            className="share-btn"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Lien copié dans le presse-papiers !');
            }}
          >
            🔗 Partager
          </button>
        </div>
      </div>

      {/* Formulaire de candidature */}
      {showApplicationForm && (
        <div className="application-modal">
          <div className="application-form-container">
            <div className="application-form-header">
              <h3>Postuler pour : {job.titre}</h3>
              <button 
                className="close-button"
                onClick={() => setShowApplicationForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="application-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="prenom">Prénom *</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={applicationData.prenom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nom">Nom *</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={applicationData.nom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">Téléphone</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={applicationData.telephone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cv">CV (PDF, DOC, DOCX) *</label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message de motivation</label>
                <textarea
                  id="message"
                  name="message"
                  value={applicationData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowApplicationForm(false)}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={applicationLoading}
                >
                  {applicationLoading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetails;
