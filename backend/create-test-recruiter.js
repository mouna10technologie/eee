const mongoose = require('mongoose');
const Recruiter = require('./models/Recruiter');
require('dotenv').config();

async function createTestRecruiter() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Vérifier si le recruteur test existe déjà
    const existing = await Recruiter.findOne({ email: 'test@recruiter.com' });
    if (existing) {
      console.log('✅ Recruteur test existe déjà:', existing.email);
      return;
    }

    // Créer un nouveau recruteur test
    const testRecruiter = new Recruiter({
      name: 'Recruteur Test',
      address: '123 Rue de la Tech, Casablanca',
      email: 'test@recruiter.com',
      password: 'password123'
    });

    await testRecruiter.save();
    console.log('✅ Recruteur test créé avec succès!');
    console.log('📧 Email: test@recruiter.com');
    console.log('🔑 Mot de passe: password123');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Déconnecté de MongoDB');
  }
}

createTestRecruiter();
