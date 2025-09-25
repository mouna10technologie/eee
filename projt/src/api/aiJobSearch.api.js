import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Recherche d'emploi intelligente avec IA
export const searchJobsWithAI = async (query) => {
  try {
    const response = await axios.post(`${API_URL}/ai-job-search`, {
      query: query
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la recherche IA:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la recherche intelligente d'emplois"
    );
  }
};

// Obtenir des suggestions de recherche basées sur l'IA
export const getSearchSuggestions = async (partialQuery) => {
  try {
    const response = await axios.get(`${API_URL}/search-suggestions`, {
      params: { q: partialQuery }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des suggestions:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la récupération des suggestions"
    );
  }
};

// Analyser le profil utilisateur pour des recommandations
export const getJobRecommendations = async (userProfile) => {
  try {
    const response = await axios.post(`${API_URL}/job-recommendations`, {
      profile: userProfile
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des recommandations:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la récupération des recommandations d'emploi"
    );
  }
};

// Analyser un CV pour extraire les compétences
export const analyzeCVSkills = async (cvFile) => {
  try {
    const formData = new FormData();
    formData.append('cv', cvFile);
    
    const response = await axios.post(`${API_URL}/analyze-cv`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'analyse du CV:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de l'analyse du CV"
    );
  }
};

// Obtenir des statistiques sur le marché de l'emploi
export const getJobMarketStats = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/job-market-stats`, {
      params: filters
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la récupération des statistiques du marché"
    );
  }
};

// Recherche avancée avec filtres multiples
export const advancedJobSearch = async (searchCriteria) => {
  try {
    const response = await axios.post(`${API_URL}/advanced-search`, searchCriteria);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la recherche avancée:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la recherche avancée"
    );
  }
};

// Obtenir des emplois similaires basés sur un emploi donné
export const getSimilarJobs = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/similar-jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des emplois similaires:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la récupération des emplois similaires"
    );
  }
};

// Évaluer la compatibilité entre un profil et un emploi
export const evaluateJobMatch = async (jobId, candidateProfile) => {
  try {
    const response = await axios.post(`${API_URL}/evaluate-match`, {
      jobId,
      profile: candidateProfile
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'évaluation de compatibilité:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de l'évaluation de la compatibilité"
    );
  }
};

// Obtenir des tendances du marché de l'emploi
export const getJobTrends = async (timeframe = '6months') => {
  try {
    const response = await axios.get(`${API_URL}/job-trends`, {
      params: { timeframe }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tendances:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la récupération des tendances du marché"
    );
  }
};
