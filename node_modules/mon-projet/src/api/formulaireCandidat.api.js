import axios from "axios";

const API_URL = "http://localhost:5000/api/candidats"; // URL de base pour les candidats

// Créer un nouveau candidat
export const createCandidat = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du candidat:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la création du candidat"
    );
  }
};

// Récupérer tous les candidats
export const getAllCandidats = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des candidats:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la récupération des candidats"
    );
  }
};

// Récupérer un candidat par ID
export const getCandidatById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du candidat:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la récupération du candidat"
    );
  }
};

// Mettre à jour un candidat
export const updateCandidat = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du candidat:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la mise à jour du candidat"
    );
  }
};

// Supprimer un candidat
export const deleteCandidat = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression du candidat:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la suppression du candidat"
    );
  }
};

// Rechercher des candidats par critères
export const searchCandidats = async (searchParams) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: searchParams
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la recherche de candidats:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la recherche de candidats"
    );
  }
};
