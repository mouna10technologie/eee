import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

// Récupérer toutes les offres d'emploi avec filtres
export const getAllJobs = async (filters = {}) => {
  try {
    const response = await axios.get(API_URL, {
      params: filters // page, limit, ville, secteur, typeContrat
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des offres:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la récupération des offres d'emploi"
    );
  }
};

// Récupérer une offre d'emploi par ID
export const getJobById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'offre:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la récupération de l'offre d'emploi"
    );
  }
};

// Créer une nouvelle offre d'emploi
export const createJob = async (jobData) => {
  try {
    const response = await axios.post(API_URL, jobData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'offre:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la création de l'offre d'emploi"
    );
  }
};

// Mettre à jour une offre d'emploi
export const updateJob = async (id, jobData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, jobData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'offre:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la mise à jour de l'offre d'emploi"
    );
  }
};

// Supprimer (désactiver) une offre d'emploi
export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'offre:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la suppression de l'offre d'emploi"
    );
  }
};

// Postuler à une offre d'emploi
export const applyToJob = async (jobId, applicationData) => {
  try {
    const response = await axios.post(`${API_URL}/${jobId}/apply`, applicationData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la candidature:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de l'envoi de la candidature"
    );
  }
};

// Rechercher des offres d'emploi par critères
export const searchJobs = async (searchParams) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ...searchParams,
        page: searchParams.page || 1,
        limit: searchParams.limit || 10
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la recherche d'offres:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la recherche d'offres d'emploi"
    );
  }
};

// Récupérer les offres d'emploi par ville
export const getJobsByCity = async (ville, page = 1, limit = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: { ville, page, limit }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des offres par ville:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la récupération des offres par ville"
    );
  }
};

// Récupérer les offres d'emploi par secteur
export const getJobsBySector = async (secteur, page = 1, limit = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: { secteur, page, limit }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des offres par secteur:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la récupération des offres par secteur"
    );
  }
};

// Récupérer les offres d'emploi par type de contrat
export const getJobsByContractType = async (typeContrat, page = 1, limit = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: { typeContrat, page, limit }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des offres par type de contrat:", error);
    throw new Error(
      error.response?.data?.error || 
      "Erreur lors de la récupération des offres par type de contrat"
    );
  }
};
