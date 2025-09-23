import axios from "axios";

const API_URL = "http://localhost:5000/api/candidatures"; // URL pour les candidatures

// Soumettre une candidature
export const submitCandidature = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la soumission de la candidature:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la soumission de la candidature"
    );
  }
};

// Récupérer toutes les candidatures
export const getAllCandidatures = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des candidatures:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la récupération des candidatures"
    );
  }
};

// Récupérer une candidature par ID
export const getCandidatureById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la candidature:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la récupération de la candidature"
    );
  }
};

// Mettre à jour le statut d'une candidature
export const updateCandidatureStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la mise à jour du statut"
    );
  }
};

// Supprimer une candidature
export const deleteCandidature = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la candidature:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la suppression de la candidature"
    );
  }
};

// Filtrer les candidatures par statut
export const getCandidaturesByStatus = async (status) => {
  try {
    const response = await axios.get(`${API_URL}/status/${status}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du filtrage par statut:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors du filtrage par statut"
    );
  }
};
