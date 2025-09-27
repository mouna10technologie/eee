import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AIJobSearch.css';

function AIJobSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [jobResults, setJobResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestedFilters, setSuggestedFilters] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      console.log('🔍 Recherche backend avec:', searchQuery);
      const { data } = await axios.post('http://localhost:5000/api/search-jobs', { query: searchQuery });
      setJobResults(data.jobs || []);
      setSuggestedFilters(data.filters || null);
    } catch (err) {
      console.error('❌ Erreur complète manuelle:', err);
      setError('Erreur lors de la recherche. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleSearch = async (exampleQuery) => {
    setSearchQuery(exampleQuery);
    setLoading(true);
    setError('');
    
    try {
      console.log('🔍 Recherche backend avec:', exampleQuery);
      const { data } = await axios.post('http://localhost:5000/api/search-jobs', { query: exampleQuery });
      setJobResults(data.jobs || []);
      setSuggestedFilters(data.filters || null);
    } catch (err) {
      console.error('❌ Erreur complète:', err);
      setError('Erreur lors de la recherche. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-job-search">
      <div className="search-container">
        <h2 className="search-title">
          🤖 Recherche d'emploi intelligente
        </h2>
        <p className="search-subtitle">
          Décrivez le poste que vous recherchez en langage naturel
        </p>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ex: Je cherche un poste de développeur React à Casablanca..."
              className="search-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={loading || !searchQuery.trim()}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <span className="search-icon">🔍</span>
              )}
            </button>
          </div>
        </form>


        {/* Exemples de recherches */}
        <div className="example-searches">
          <p className="examples-title">Exemples de recherches :</p>
          <div className="example-buttons">
            <button 
              className="example-btn"
              onClick={() => handleExampleSearch("Développeur full-stack avec React et Node.js à Rabat")}
            >
              Développeur full-stack React/Node.js à Rabat
            </button>
            <button 
              className="example-btn"
              onClick={() => handleExampleSearch("Ingénieur en intelligence artificielle, télétravail possible")}
            >
              Ingénieur IA en télétravail
            </button>
            <button 
              className="example-btn"
              onClick={() => handleExampleSearch("Stage en cybersécurité à Casablanca pour étudiant")}
            >
              Stage cybersécurité Casablanca
            </button>
          </div>
        </div>

        {/* Affichage des erreurs */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Filtres suggérés par l'IA */}
        {suggestedFilters && (
          <div className="suggested-filters">
            <h3>🎯 Critères détectés :</h3>
            <div className="filters-grid">
              {suggestedFilters.poste && (
                <div className="filter-item">
                  <span className="filter-label">Poste :</span>
                  <span className="filter-value">{suggestedFilters.poste}</span>
                </div>
              )}
              {suggestedFilters.ville && (
                <div className="filter-item">
                  <span className="filter-label">Ville :</span>
                  <span className="filter-value">{suggestedFilters.ville}</span>
                </div>
              )}
              {suggestedFilters.secteur && (
                <div className="filter-item">
                  <span className="filter-label">Secteur :</span>
                  <span className="filter-value">{suggestedFilters.secteur}</span>
                </div>
              )}
              {suggestedFilters.contrat && (
                <div className="filter-item">
                  <span className="filter-label">Type de contrat :</span>
                  <span className="filter-value">{suggestedFilters.contrat}</span>
                </div>
              )}
            </div>
          </div>
        )}


        {/* Résultats de recherche */}
        {jobResults.length > 0 && (
          <div className="search-results">
            <h3>📋 {jobResults.length} offre(s) trouvée(s)</h3>
            <div className="jobs-grid">
              {jobResults.map((job, index) => (
                <div key={index} className="job-card">
                  <div className="job-header">
                    <h4 className="job-title">{job.titre}</h4>
                    <span className="job-company">{job.entreprise}</span>
                  </div>
                  <div className="job-details">
                    <div className="job-location">
                      📍 {job.ville}
                    </div>
                    <div className="job-contract">
                      💼 {job.typeContrat}
                    </div>
                    <div className="job-sector">
                      🏢 {job.secteur}
                    </div>
                    {job.salaire && (
                      <div className="job-salary">
                        💰 {job.salaire}
                      </div>
                    )}
                  </div>
                  <p className="job-description">
                    {job.description.length > 150 
                      ? `${job.description.substring(0, 150)}...` 
                      : job.description
                    }
                  </p>
                  <div className="job-actions">
                    {job._id && (
                      <>
                        <button 
                          className="apply-btn"
                          onClick={() => navigate(`/job/${job._id}`, { state: { openForm: true } })}
                        >
                          Postuler
                        </button>
                        <button 
                          className="details-btn"
                          onClick={() => navigate(`/job/${job._id}`)}
                        >
                          Voir détails
                        </button>
                      </>
                    )}
                  </div>
                  <div className="job-meta">
                    <span className="job-date">
                      📅 Publié le {new Date(job.datePublication).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message si aucun résultat */}
        {jobResults.length === 0 && searchQuery && !loading && (
          <div className="no-results">
            <p>🔍 Aucune offre ne correspond à votre recherche.</p>
            <p>Essayez de reformuler votre demande ou utilisez des termes plus généraux.</p>
            <p style={{fontSize: '12px', color: '#666'}}>
              Recherche effectuée: "{searchQuery}" | Erreur: {error || 'aucune'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default AIJobSearch;
