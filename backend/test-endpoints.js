const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testEndpoints() {
  console.log('🧪 Test des endpoints backend DevJob\n');

  try {
    // Test 1: Health check
    console.log('1️⃣ Test Health Check...');
    const health = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Health:', health.data.message);

    // Test 2: Test inscription recruteur
    console.log('\n2️⃣ Test inscription recruteur...');
    const testEmail = `test-${Date.now()}@example.com`;
    try {
      const register = await axios.post(`${BASE_URL}/api/auth/register`, {
        name: 'Test Recruteur',
        address: '123 Test Street',
        email: testEmail,
        password: 'password123'
      });
      console.log('✅ Inscription réussie:', register.data.message || 'OK');
      
      // Test 3: Test connexion avec les mêmes identifiants
      console.log('\n3️⃣ Test connexion recruteur...');
      const login = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: testEmail,
        password: 'password123'
      });
      console.log('✅ Connexion réussie:', login.data.recruiter?.name);

      // Test 4: Test accès CV avec token
      console.log('\n4️⃣ Test accès CV protégé...');
      const cvAccess = await axios.get(`${BASE_URL}/api/cv`, {
        headers: { Authorization: `Bearer ${login.data.token}` }
      });
      console.log('✅ Accès CV autorisé:', cvAccess.data.total, 'CV trouvés');

    } catch (authError) {
      if (authError.response?.status === 409) {
        console.log('⚠️ Email déjà utilisé (normal pour les tests)');
      } else {
        console.log('❌ Erreur auth:', authError.response?.data?.error || authError.message);
      }
    }

    // Test 5: Test newsletter (doit être permissif maintenant)
    console.log('\n5️⃣ Test newsletter...');
    try {
      const newsletter = await axios.post(`${BASE_URL}/api/newsletter/subscribe`, {
        email: 'test@newsletter.com',
        nom: 'Test',
        prenom: 'User'
      });
      console.log('✅ Newsletter:', newsletter.data.message);
    } catch (newsError) {
      console.log('⚠️ Newsletter:', newsError.response?.data?.message || 'Erreur');
    }

    // Test 6: Test jobs
    console.log('\n6️⃣ Test jobs...');
    const jobs = await axios.get(`${BASE_URL}/api/jobs`);
    console.log('✅ Jobs disponibles:', jobs.data?.length || 0);

    console.log('\n🎉 Tous les tests terminés !');

  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Attendre que le serveur soit prêt
setTimeout(testEndpoints, 2000);
