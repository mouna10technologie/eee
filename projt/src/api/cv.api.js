import axios from 'axios';
import { getAuthHeader } from './auth.api';

const API_URL = 'http://localhost:5000/api/cv';

// Récupérer tous les CV (protégé)
export const getAllCV = async () => {
  try {
    const response = await axios.get(API_URL, { 
      headers: getAuthHeader() 
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des CV:', error);
    throw new Error(
      error.response?.data?.error || 
      error.message ||
      'Erreur lors de la récupération des CV'
    );
  }
};

// Récupérer un CV par ID (protégé)
export const getCVById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { 
      headers: getAuthHeader() 
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du CV:', error);
    throw new Error(
      error.response?.data?.error || 
      error.message ||
      'Erreur lors de la récupération du CV'
    );
  }
};

// Récupérer les statistiques des CV (protégé)
export const getCVStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats/overview`, { 
      headers: getAuthHeader() 
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw new Error(
      error.response?.data?.error || 
      error.message ||
      'Erreur lors de la récupération des statistiques'
    );
  }
};

// Générer l'URL de téléchargement du CV
export const getCVDownloadUrl = (filename) => {
  return `http://localhost:5000/uploads/${filename}`;
};
