import axios from "axios";

const API_URL = "http://localhost:5000/api/newsletter";

// S'abonner à la newsletter
export const subscribeToNewsletter = async (email, preferences = {}) => {
  try {
    const response = await axios.post(`${API_URL}/subscribe`, {
      email,
      preferences
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'abonnement à la newsletter:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de l'abonnement à la newsletter"
    );
  }
};

// Se désabonner de la newsletter
export const unsubscribeFromNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/unsubscribe`, {
      email
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors du désabonnement:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors du désabonnement de la newsletter"
    );
  }
};

// Vérifier le statut d'abonnement
export const checkSubscriptionStatus = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/status/${email}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la vérification du statut:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la vérification du statut d'abonnement"
    );
  }
};

// Mettre à jour les préférences de newsletter
export const updateNewsletterPreferences = async (email, preferences) => {
  try {
    const response = await axios.put(`${API_URL}/preferences`, {
      email,
      preferences
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour des préférences:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la mise à jour des préférences"
    );
  }
};

// Récupérer tous les abonnés (pour admin)
export const getAllSubscribers = async () => {
  try {
    const response = await axios.get(`${API_URL}/subscribers`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des abonnés:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la récupération des abonnés"
    );
  }
};

// Envoyer une newsletter (pour admin)
export const sendNewsletter = async (newsletterData) => {
  try {
    const response = await axios.post(`${API_URL}/send`, newsletterData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la newsletter:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de l'envoi de la newsletter"
    );
  }
};

// Récupérer l'historique des newsletters
export const getNewsletterHistory = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/history`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la récupération de l'historique des newsletters"
    );
  }
};

// Créer un template de newsletter
export const createNewsletterTemplate = async (templateData) => {
  try {
    const response = await axios.post(`${API_URL}/templates`, templateData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du template:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la création du template de newsletter"
    );
  }
};

// Récupérer les templates de newsletter
export const getNewsletterTemplates = async () => {
  try {
    const response = await axios.get(`${API_URL}/templates`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des templates:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la récupération des templates"
    );
  }
};

// Obtenir les statistiques de la newsletter
export const getNewsletterStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la récupération des statistiques de la newsletter"
    );
  }
};
