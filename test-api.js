const axios = require('axios');

async function testAPI() {
  try {
    console.log('🔍 Test de l\'API de recherche...');
    
    const response = await axios.post('http://localhost:5000/api/search-jobs', {
      query: 'cybersécurité'
    });
    
    console.log('✅ Réponse reçue:');
    console.log('Nombre de jobs:', response.data.jobs.length);
    console.log('Filtres détectés:', response.data.filters);
    
    if (response.data.jobs.length > 0) {
      console.log('Premier job:', response.data.jobs[0].titre);
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testAPI();
