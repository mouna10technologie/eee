const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Fonction pour analyser la requête utilisateur avec IA simulée
function analyzeUserQuery(query) {
  const lowerQuery = query.toLowerCase();
  
  // Extraction des villes marocaines
  const villes = ['casablanca', 'rabat', 'marrakech', 'fès', 'tanger', 'agadir', 'meknès', 'oujda', 'kenitra', 'tétouan', 'safi', 'mohammedia', 'el jadida', 'beni mellal', 'nador'];
  const villeDetectee = villes.find(ville => lowerQuery.includes(ville));

  // Extraction des postes/métiers
  const postes = {
    'développeur': ['développeur', 'developer', 'dev', 'programmeur'],
    'ingénieur': ['ingénieur', 'engineer', 'ing'],
    'designer': ['designer', 'design', 'graphiste', 'ui/ux'],
    'chef de projet': ['chef de projet', 'project manager', 'pm'],
    'data scientist': ['data scientist', 'data analyst', 'analyste'],
    'devops': ['devops', 'ops', 'infrastructure'],
    'cybersécurité': ['cybersécurité', 'sécurité', 'security'],
    'marketing': ['marketing', 'communication', 'digital'],
    'commercial': ['commercial', 'vente', 'sales'],
    'comptable': ['comptable', 'comptabilité', 'finance']
  };

  let posteDetecte = null;
  for (const [poste, synonymes] of Object.entries(postes)) {
    if (synonymes.some(synonyme => lowerQuery.includes(synonyme))) {
      posteDetecte = poste;
      break;
    }
  }

  // Extraction des technologies
  const technologies = ['react', 'angular', 'vue', 'node.js', 'python', 'java', 'php', 'javascript', 'typescript', 'mongodb', 'mysql', 'postgresql'];
  const techDetectees = technologies.filter(tech => lowerQuery.includes(tech));

  // Extraction du type de contrat
  const contrats = {
    'cdi': ['cdi', 'permanent', 'temps plein'],
    'cdd': ['cdd', 'temporaire', 'contrat déterminé'],
    'stage': ['stage', 'stagiaire', 'étudiant'],
    'freelance': ['freelance', 'indépendant', 'consultant'],
    'télétravail': ['télétravail', 'remote', 'distance', 'domicile']
  };

  let contratDetecte = null;
  for (const [contrat, synonymes] of Object.entries(contrats)) {
    if (synonymes.some(synonyme => lowerQuery.includes(synonyme))) {
      contratDetecte = contrat.toUpperCase();
      break;
    }
  }

  // Extraction du secteur
  const secteurs = {
    'informatique': ['informatique', 'it', 'tech', 'technologie', 'numérique'],
    'finance': ['finance', 'banque', 'assurance', 'comptabilité'],
    'santé': ['santé', 'médical', 'pharmaceutique', 'hôpital'],
    'éducation': ['éducation', 'formation', 'enseignement', 'école'],
    'commerce': ['commerce', 'retail', 'vente', 'distribution'],
    'industrie': ['industrie', 'manufacturier', 'production', 'usine']
  };

  let secteurDetecte = null;
  for (const [secteur, synonymes] of Object.entries(secteurs)) {
    if (synonymes.some(synonyme => lowerQuery.includes(synonyme))) {
      secteurDetecte = secteur;
      break;
    }
  }

  return {
    poste: posteDetecte,
    ville: villeDetectee ? villeDetectee.charAt(0).toUpperCase() + villeDetectee.slice(1) : null,
    secteur: secteurDetecte ? secteurDetecte.charAt(0).toUpperCase() + secteurDetecte.slice(1) : null,
    contrat: contratDetecte,
    technologies: techDetectees,
    queryOriginal: query
  };
}

// Route pour la recherche d'emplois avec IA
router.post('/search-jobs', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ 
        error: 'Requête de recherche requise' 
      });
    }

    // Analyse de la requête utilisateur
    const filters = analyzeUserQuery(query);
    
    // Construction de la requête MongoDB
    let mongoQuery = { actif: true };
    
    // Recherche textuelle si aucun filtre spécifique n'est détecté
    if (!filters.poste && !filters.ville && !filters.secteur && !filters.contrat) {
      mongoQuery.$text = { $search: query };
    } else {
      // Application des filtres détectés
      if (filters.poste) {
        mongoQuery.$or = [
          { titre: { $regex: filters.poste, $options: 'i' } },
          { description: { $regex: filters.poste, $options: 'i' } },
          { competencesRequises: { $in: [new RegExp(filters.poste, 'i')] } }
        ];
      }
      
      if (filters.ville) {
        mongoQuery.ville = { $regex: filters.ville, $options: 'i' };
      }
      
      if (filters.secteur) {
        mongoQuery.secteur = { $regex: filters.secteur, $options: 'i' };
      }
      
      if (filters.contrat) {
        mongoQuery.typeContrat = filters.contrat;
      }
      
      // Recherche par technologies
      if (filters.technologies.length > 0) {
        const techRegex = filters.technologies.map(tech => new RegExp(tech, 'i'));
        mongoQuery.$or = mongoQuery.$or || [];
        mongoQuery.$or.push(
          { competencesRequises: { $in: techRegex } },
          { description: { $in: techRegex } }
        );
      }
    }

    // Exécution de la recherche
    const jobs = await Job.find(mongoQuery)
      .sort({ datePublication: -1 })
      .limit(20)
      .lean();

    // Calcul du score de pertinence (simulation IA)
    const jobsWithScore = jobs.map(job => {
      let score = 0;
      
      // Score basé sur la correspondance des mots-clés
      const jobText = `${job.titre} ${job.description} ${job.competencesRequises.join(' ')}`.toLowerCase();
      const queryWords = query.toLowerCase().split(' ');
      
      queryWords.forEach(word => {
        if (jobText.includes(word)) {
          score += 1;
        }
      });
      
      // Bonus pour les correspondances exactes
      if (filters.poste && jobText.includes(filters.poste.toLowerCase())) {
        score += 5;
      }
      if (filters.ville && job.ville.toLowerCase().includes(filters.ville.toLowerCase())) {
        score += 3;
      }
      if (filters.secteur && job.secteur.toLowerCase().includes(filters.secteur.toLowerCase())) {
        score += 3;
      }
      
      return { ...job, scoreIA: score };
    });

    // Tri par score de pertinence
    jobsWithScore.sort((a, b) => b.scoreIA - a.scoreIA);

    res.json({
      jobs: jobsWithScore,
      filters: {
        poste: filters.poste,
        ville: filters.ville,
        secteur: filters.secteur,
        contrat: filters.contrat,
        technologies: filters.technologies
      },
      totalResults: jobsWithScore.length,
      query: query
    });

  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    res.status(500).json({ 
      error: 'Erreur interne du serveur lors de la recherche' 
    });
  }
});

// Route pour obtenir des suggestions de recherche
router.get('/search-suggestions', async (req, res) => {
  try {
    const suggestions = [
      "Développeur React à Casablanca",
      "Ingénieur en intelligence artificielle",
      "Stage en cybersécurité à Rabat",
      "Chef de projet digital en télétravail",
      "Data scientist avec Python",
      "Designer UI/UX à Marrakech",
      "Développeur full-stack Node.js",
      "Consultant en transformation digitale"
    ];

    res.json({ suggestions });
  } catch (error) {
    console.error('Erreur lors de la récupération des suggestions:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des suggestions' 
    });
  }
});

module.exports = router;
