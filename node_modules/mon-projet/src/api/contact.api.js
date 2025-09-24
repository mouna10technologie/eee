import axios from "axios";

const API_URL = "http://localhost:5000/api/contact"; // Adjust if your backend URL is different

// Send a new contact message
export const sendContactMessage = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de contact:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de l'envoi du message de contact"
    );
  }
};

// Get all contact messages
export const getContactMessages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la récupération des messages"
    );
  }
};

// Delete a contact message
export const deleteContactMessage = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression du message:", error);
    throw new Error(
      error.response?.data?.message || 
      "Erreur lors de la suppression du message"
    );
  }
};
