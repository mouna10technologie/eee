const axios = require('axios');

async function testNewsletterAPI() {
  console.log('🧪 Test de l\'API Newsletter...\n');

  try {
    // Test 1: Inscription normale
    console.log('1️⃣ Test d\'inscription normale...');
    const response1 = await axios.post('http://localhost:5000/api/newsletter/subscribe', {
      email: 'test@example.com',
      nom: 'Test',
      prenom: 'User'
    });
    console.log('✅ Inscription réussie:', response1.data.message);

    // Test 2: Inscription avec email déjà existant
    console.log('\n2️⃣ Test d\'inscription avec email existant...');
    try {
      await axios.post('http://localhost:5000/api/newsletter/subscribe', {
        email: 'test@example.com'
      });
    } catch (error) {
      console.log('✅ Erreur attendue:', error.response.data.error);
    }

    // Test 3: Inscription avec email invalide
    console.log('\n3️⃣ Test avec email invalide...');
    try {
      await axios.post('http://localhost:5000/api/newsletter/subscribe', {
        email: 'email-invalide'
      });
    } catch (error) {
      console.log('✅ Erreur attendue:', error.response.data.error);
    }

    // Test 4: Récupération des statistiques
    console.log('\n4️⃣ Test des statistiques...');
    const stats = await axios.get('http://localhost:5000/api/newsletter/stats');
    console.log('✅ Statistiques:', stats.data.stats);

    console.log('\n🎉 Tous les tests sont passés !');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    if (error.response) {
      console.error('Détails:', error.response.data);
    }
  }
}

testNewsletterAPI();
