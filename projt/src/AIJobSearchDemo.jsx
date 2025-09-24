import React, { useState } from 'react';
import './AIJobSearch.css';

// Données de démonstration
const demoJobs = [
  {
    titre: "Développeur React Senior",
    entreprise: "TechCorp Maroc",
    description: "Nous recherchons un développeur React expérimenté pour rejoindre notre équipe de développement frontend. Vous travaillerez sur des projets innovants utilisant les dernières technologies React, Redux, et TypeScript.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "15000 - 20000 MAD",
    datePublication: new Date('2024-01-15'),
    scoreIA: 95
  },
  {
    titre: "Ingénieur en Intelligence Artificielle",
    entreprise: "AI Solutions",
    description: "Poste d'ingénieur IA pour développer des solutions de machine learning et deep learning. Expérience avec Python, TensorFlow, et PyTorch requise.",
    ville: "Rabat",
    secteur: "Informatique",
    typeContrat: "CDI",
    salaire: "18000 - 25000 MAD",
    datePublication: new Date('2024-01-10'),
    scoreIA: 90
  },
  {
    titre: "Stage Développeur Full-Stack",
    entreprise: "StartupTech",
    description: "Stage de 6 mois pour étudiant en informatique. Travail sur des projets web avec Node.js, React, et MongoDB. Excellente opportunité d'apprentissage.",
    ville: "Casablanca",
    secteur: "Informatique",
    typeContrat: "Stage",
    salaire: "3000 - 4000 MAD",
    datePublication: new Date('2024-01-20'),
    scoreIA: 85
  },
  {
    titre: "Chef de Projet Digital",
    entreprise: "Digital Agency",
    description: "Gestion de projets digitaux pour clients internationaux. Coordination d'équipes techniques, suivi de planning, relation client. Maîtrise de l'anglais requise.",
    ville: "Marrakech",
    secteur: "Marketing",
    typeContrat: "CDI",
    salaire: "12000 - 16000 MAD",
    datePublication: new Date('2024-01-12'),
    scoreIA: 80
  },
  {
    titre: "Consultant en Cybersécurité",
    entreprise: "SecureIT",
    description: "Audit de sécurité, tests d'intrusion, conseil en cybersécurité pour entreprises. Certifications CISSP ou CEH appréciées.",
    ville: "Rabat",
    secteur: "Informatique",
    typeContrat: "Freelance",
    salaire: "500 - 800 MAD/jour",
    datePublication: new Date('2024-01-08'),
    scoreIA: 88
  }
];

function AIJobSearchDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobResults, setJobResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestedFilters, setSuggestedFilters] = useState(null);

  // Fonction de simulation d'analyse IA
  const analyzeQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Détection des villes
    const villes = ['casablanca', 'rabat', 'marrakech', 'fès', 'tanger'];
    const villeDetectee = villes.find(ville => lowerQuery.includes(ville));

    // Détection des postes
    let posteDetecte = null;
    if (lowerQuery.includes('développeur') || lowerQuery.includes('dev')) posteDetecte = 'développeur';
    if (lowerQuery.includes('ingénieur')) posteDetecte = 'ingénieur';
    if (lowerQuery.includes('chef de projet')) posteDetecte = 'chef de projet';
    if (lowerQuery.includes('stage')) posteDetecte = 'stage';
    if (lowerQuery.includes('cybersécurité') || lowerQuery.includes('sécurité')) posteDetecte = 'cybersécurité';

    // Détection du type de contrat
    let contratDetecte = null;
    if (lowerQuery.includes('stage')) contratDetecte = 'Stage';
    if (lowerQuery.includes('freelance')) contratDetecte = 'Freelance';
    if (lowerQuery.includes('cdi')) contratDetecte = 'CDI';

    // Détection du secteur
    let secteurDetecte = null;
    if (lowerQuery.includes('informatique') || lowerQuery.includes('tech') || lowerQuery.includes('it')) secteurDetecte = 'Informatique';
    if (lowerQuery.includes('marketing')) secteurDetecte = 'Marketing';

    return {
      poste: posteDetecte,
      ville: villeDetectee ? villeDetectee.charAt(0).toUpperCase() + villeDetectee.slice(1) : null,
      secteur: secteurDetecte,
      contrat: contratDetecte
    };
  };

  // Fonction de filtrage des emplois
  const filterJobs = (query, filters) => {
    return demoJobs.filter(job => {
      let matches = true;

      // Recherche textuelle générale
      const jobText = `${job.titre} ${job.description} ${job.entreprise}`.toLowerCase();
      const queryWords = query.toLowerCase().split(' ');
      const hasTextMatch = queryWords.some(word => jobText.includes(word));

      if (!hasTextMatch && query.trim()) {
        matches = false;
      }

      // Filtres spécifiques
      if (filters.ville && !job.ville.toLowerCase().includes(filters.ville.toLowerCase())) {
        matches = false;
      }
      if (filters.secteur && job.secteur !== filters.secteur) {
        matches = false;
      }
      if (filters.contrat && job.typeContrat !== filters.contrat) {
        matches = false;
      }
      if (filters.poste && !job.titre.toLowerCase().includes(filters.poste.toLowerCase())) {
        matches = false;
      }

      return matches;
    }).sort((a, b) => b.scoreIA - a.scoreIA);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    
    // Simulation d'un délai d'API
    setTimeout(() => {
      const filters = analyzeQuery(searchQuery);
      const results = filterJobs(searchQuery, filters);
      
      setJobResults(results);
      setSuggestedFilters(filters);
      setLoading(false);
    }, 1000);
  };

  const handleExampleSearch = (exampleQuery) => {
    setSearchQuery(exampleQuery);
    setLoading(true);

    setTimeout(() => {
      const filters = analyzeQuery(exampleQuery);
      const results = filterJobs(exampleQuery, filters);

      setJobResults(results);
      setSuggestedFilters(filters);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="ai-job-search">
      <div className="search-container">
        <h2 className="search-title">
          🤖 Recherche d'emploi intelligente (Démo)
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
              onClick={() => handleExampleSearch("Développeur React à Casablanca")}
            >
              Développeur React à Casablanca
            </button>
            <button 
              className="example-btn"
              onClick={() => handleExampleSearch("Ingénieur en intelligence artificielle à Rabat")}
            >
              Ingénieur IA à Rabat
            </button>
            <button 
              className="example-btn"
              onClick={() => handleExampleSearch("Stage en informatique à Casablanca")}
            >
              Stage informatique Casablanca
            </button>
            <button 
              className="example-btn"
              onClick={() => handleExampleSearch("Consultant cybersécurité freelance")}
            >
              Consultant cybersécurité freelance
            </button>
          </div>
        </div>

        {/* Filtres suggérés par l'IA */}
        {suggestedFilters && (Object.values(suggestedFilters).some(v => v !== null)) && (
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
                    <div className="job-salary">
                      💰 {job.salaire}
                    </div>
                  </div>
                  <p className="job-description">
                    {job.description.length > 150 
                      ? `${job.description.substring(0, 150)}...` 
                      : job.description
                    }
                  </p>
                  <div className="job-actions">
                    <button className="apply-btn">
                      Postuler
                    </button>
                    <button className="details-btn">
                      Voir détails
                    </button>
                  </div>
                  <div className="job-meta">
                    <span className="job-date">
                      📅 Publié le {job.datePublication.toLocaleDateString('fr-FR')}
                    </span>
                    <span className="job-score" style={{marginLeft: '10px', color: '#667eea', fontWeight: 'bold'}}>
                      🎯 Score IA: {job.scoreIA}%
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
            <p>🔍 Aucune offre ne correspond à votre recherche dans notre démo.</p>
            <p>Essayez les exemples ci-dessus pour voir le système en action !</p>
          </div>
        )}

        {/* Note de démonstration */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(102, 126, 234, 0.1)',
          borderRadius: '10px',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          textAlign: 'center'
        }}>
          <p style={{color: '#667eea', fontWeight: '500', margin: 0}}>
            🚀 <strong>Mode Démo</strong> - Cette version utilise des données d'exemple. 
            Pour la version complète avec backend et base de données, suivez les instructions dans le README.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIJobSearchDemo;
