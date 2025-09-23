import "./FormulaireCandidat.css";
import React, { useState } from "react";

function FormulaireCandidat() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    diplome: "",
    experience: "",
    salaire: "",
    photo: "",
    competences: "",
    localisation: "",
    github: "",
    portfolio: "",
    telephone: "",
  });

  const [cvFile, setCvFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const candidat = {
      ...formData,
      competences: formData.competences.split(",").map((comp) => comp.trim()),
    };

    const formDataToSend = new FormData();
    for (const key in candidat) {
      formDataToSend.append(key, candidat[key]);
    }

    if (cvFile) {
      formDataToSend.append("cv", cvFile);
    }

    fetch("http://localhost:5000/candidats", {
      method: "POST",
      body: formDataToSend,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'envoi");
        return res.json();
      })
      .then((data) => {
        alert("Candidat ajouté avec succès !");
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de l'envoi du candidat.");
      });
  };

  return (
    <div className="formulaire-container">
      <h2>Ajouter un candidat</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Prénom</label>
          <input
            name="prenom"
            placeholder="Prénom"
            onChange={handleChange}
            value={formData.prenom}
            required
          />
        </div>

        <div className="form-group">
          <label>Nom</label>
          <input
            name="nom"
            placeholder="Nom"
            onChange={handleChange}
            value={formData.nom}
            required
          />
        </div>

        <div className="form-group">
          <label>Âge</label>
          <input
            name="age"
            type="number"
            placeholder="Âge"
            onChange={handleChange}
            value={formData.age}
            required
          />
        </div>

        <div className="form-group">
          <label>Diplôme</label>
          <input
            name="diplome"
            placeholder="Diplôme"
            onChange={handleChange}
            value={formData.diplome}
          />
        </div>

        <div className="form-group">
          <label>Expérience</label>
          <input
            name="experience"
            placeholder="Expérience"
            onChange={handleChange}
            value={formData.experience}
          />
        </div>

        <div className="form-group">
          <label>Salaire</label>
          <input
            name="salaire"
            placeholder="Salaire"
            onChange={handleChange}
            value={formData.salaire}
          />
        </div>

        <div className="form-group">
          <label>Photo (URL)</label>
          <input
            name="photo"
            placeholder="URL de la photo"
            onChange={handleChange}
            value={formData.photo}
          />
        </div>

        <div className="form-group">
          <label>Compétences</label>
          <input
            name="competences"
            placeholder="Compétences (séparées par des virgules)"
            onChange={handleChange}
            value={formData.competences}
          />
        </div>

        <div className="form-group">
          <label>Localisation</label>
          <input
            name="localisation"
            placeholder="Localisation"
            onChange={handleChange}
            value={formData.localisation}
          />
        </div>

        <div className="form-group">
          <label>Lien GitHub</label>
          <input
            name="github"
            placeholder="https://github.com/..."
            onChange={handleChange}
            value={formData.github}
          />
        </div>

        <div className="form-group">
          <label>Lien Portfolio</label>
          <input
            name="portfolio"
            placeholder="https://votre-portfolio.com"
            onChange={handleChange}
            value={formData.portfolio}
          />
        </div>

        <div className="form-group">
          <label>Numéro de téléphone</label>
          <input
            name="telephone"
            placeholder="+33 6 12 34 56 78"
            onChange={handleChange}
            value={formData.telephone}
          />
        </div>

        <div className="form-group">
          <label>Téléchargez votre CV</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default FormulaireCandidat;
