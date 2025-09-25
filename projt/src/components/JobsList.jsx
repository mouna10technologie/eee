import React, { useState, useEffect } from 'react';
import { getAllJobs, searchJobs } from '../api/jobs.api';
import './JobsList.css';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    ville: '',
    secteur: '',
    typeContrat: '',
    page: 1,
    limit: 10
  });
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Charger les offres d'emploi
  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAllJobs(filters);
      setJobs(response.jobs || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des offres:', err);
    } finally {
      setLoading(false);
    }
  };

  // Rechercher des offres
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadJobs();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const searchFilters = {
        ...filters,
        search: searchQuery
      };
      
      const response = await searchJobs(searchFilters);
      setJobs(response.jobs || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors de la recherche:', err);
    } finally {
      setLoading(false);
    }
  };

  // Gérer les changements de filtres
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset à la première page
    }));
  };

  // Changer de page
  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  // Charger les offres au montage et quand les filtres changent
  useEffect(() => {
    loadJobs();
  }, [filters]);

  if (loading) {
    return (
      <div className="jobs-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des offres d'emploi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-error">
        <h3>Erreur</h3>
        <p>{error}</p>
        <button onClick={loadJobs} className="retry-button">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="jobs-list-container">
      <div className="jobs-header">
        <h2>Offres d'Emploi</h2>
        <p>{jobs.length} offre(s) trouvée(s)</p>
      </div>

      {/* Barre de recherche */}
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher une offre d'emploi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="search-button">
            🔍 Rechercher
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="filters-section">
        <select
          value={filters.ville}
          onChange={(e) => handleFilterChange('ville', e.target.value)}
        >
          <option value="">Toutes les villes</option>
          <option value="Casablanca">Casablanca</option>
          <option value="Rabat">Rabat</option>
          <option value="Marrakech">Marrakech</option>
          <option value="Fès">Fès</option>
          <option value="Tanger">Tanger</option>
        </select>

        <select
          value={filters.secteur}
          onChange={(e) => handleFilterChange('secteur', e.target.value)}
        >
          <option value="">Tous les secteurs</option>
          <option value="Informatique">Informatique</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Ingénierie">Ingénierie</option>
        </select>

        <select
          value={filters.typeContrat}
          onChange={(e) => handleFilterChange('typeContrat', e.target.value)}
        >
          <option value="">Tous les contrats</option>
          <option value="cdi">CDI</option>
          <option value="cdd">CDD</option>
          <option value="stage">Stage</option>
          <option value="freelance">Freelance</option>
        </select>

        <button onClick={() => {
          setFilters({
            ville: '',
            secteur: '',
            typeContrat: '',
            page: 1,
            limit: 10
          });
          setSearchQuery('');
        }} className="clear-filters">
          Effacer les filtres
        </button>
      </div>

      {/* Liste des offres */}
      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <div className="no-jobs">
            <h3>Aucune offre trouvée</h3>
            <p>Essayez de modifier vos critères de recherche.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <h3 className="job-title">{job.titre}</h3>
                <span className="job-type">{job.typeContrat?.toUpperCase()}</span>
              </div>
              
              <div className="job-company">
                <strong>{job.entreprise}</strong>
              </div>
              
              <div className="job-location">
                📍 {job.ville}
              </div>
              
              <div className="job-sector">
                🏢 {job.secteur}
              </div>
              
              <div className="job-description">
                <p>{job.description?.substring(0, 150)}...</p>
              </div>
              
              {job.salaire && (
                <div className="job-salary">
                  💰 {job.salaire}
                </div>
              )}
              
              <div className="job-footer">
                <span className="job-date">
                  Publié le {new Date(job.datePublication).toLocaleDateString()}
                </span>
                <button className="apply-button">
                  Postuler
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page <= 1}
            className="pagination-button"
          >
            ← Précédent
          </button>
          
          <span className="pagination-info">
            Page {filters.page} sur {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page >= totalPages}
            className="pagination-button"
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsList;
