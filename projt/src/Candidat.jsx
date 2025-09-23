import React, { useState } from "react";
import "./Candidat.css";
import { submitCandidature } from "./api/candidat.api";

function Candidat() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    situationFamiliale: "",
    niveauEtude: "",
    posteChoisi: "",
    cv: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({
        ...prev,
        cv: file,
      }));
      if (errors.cv) {
        setErrors((prev) => ({
          ...prev,
          cv: "",
        }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        cv: "Veuillez sélectionner un fichier PDF valide",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }

    if (!formData.situationFamiliale) {
      newErrors.situationFamiliale = "La situation familiale est requise";
    }

    if (!formData.niveauEtude) {
      newErrors.niveauEtude = "Le niveau d'étude est requis";
    }

    if (!formData.posteChoisi.trim()) {
      newErrors.posteChoisi = "Le poste choisi est requis";
    }

    if (!formData.cv) {
      newErrors.cv = "Le CV est requis";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setSubmitMessage("");

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // Créer FormData pour l'envoi
        const formDataToSend = new FormData();
        formDataToSend.append("nom", formData.nom);
        formDataToSend.append("prenom", formData.prenom);
        formDataToSend.append("situationFamiliale", formData.situationFamiliale);
        formDataToSend.append("niveauEtude", formData.niveauEtude);
        formDataToSend.append("posteChoisi", formData.posteChoisi);
        
        if (formData.cv) {
          formDataToSend.append("cv", formData.cv);
        }

        const result = await submitCandidature(formDataToSend);
        setSubmitMessage("Votre candidature a été soumise avec succès !");
        
        // Reset form
        setFormData({
          nom: "",
          prenom: "",
          situationFamiliale: "",
          niveauEtude: "",
          posteChoisi: "",
          cv: null,
        });
        
        console.log("Candidature soumise:", result);
      } catch (error) {
        console.error("Erreur:", error);
        setSubmitMessage("Erreur lors de la soumission: " + error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="candidat-container">
      <div className="candidat-header">
        <h1 className="candidat-title">Formulaire de Candidature</h1>
        <p className="candidat-subtitle">
          Rejoignez notre plateforme et trouvez votre prochain défi
          professionnel
        </p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="candidat-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom" className="form-label">
                Nom <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className={`form-input ${errors.nom ? "error" : ""}`}
                placeholder="Votre nom"
              />
              {errors.nom && (
                <span className="error-message">{errors.nom}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="prenom" className="form-label">
                Prénom <span className="required">*</span>
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                className={`form-input ${errors.prenom ? "error" : ""}`}
                placeholder="Votre prénom"
              />
              {errors.prenom && (
                <span className="error-message">{errors.prenom}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="situationFamiliale" className="form-label">
                Situation Familiale <span className="required">*</span>
              </label>
              <select
                id="situationFamiliale"
                name="situationFamiliale"
                value={formData.situationFamiliale}
                onChange={handleInputChange}
                className={`form-select ${
                  errors.situationFamiliale ? "error" : ""
                }`}
              >
                <option value="">Sélectionnez votre situation</option>
                <option value="celibataire">Célibataire</option>
                <option value="marie">Marié(e)</option>
                <option value="divorce">Divorcé(e)</option>
                <option value="veuf">Veuf/Veuve</option>
                <option value="concubinage">En concubinage</option>
              </select>
              {errors.situationFamiliale && (
                <span className="error-message">
                  {errors.situationFamiliale}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="niveauEtude" className="form-label">
                Niveau d'Étude <span className="required">*</span>
              </label>
              <select
                id="niveauEtude"
                name="niveauEtude"
                value={formData.niveauEtude}
                onChange={handleInputChange}
                className={`form-select ${errors.niveauEtude ? "error" : ""}`}
              >
                <option value="">Sélectionnez votre niveau</option>
                <option value="bac">Baccalauréat</option>
                <option value="bac+2">Bac+2 (BTS/DUT)</option>
                <option value="bac+3">Bac+3 (Licence)</option>
                <option value="bac+5">Bac+5 (Master/Ingénieur)</option>
                <option value="doctorat">Doctorat</option>
                <option value="autre">Autre</option>
              </select>
              {errors.niveauEtude && (
                <span className="error-message">{errors.niveauEtude}</span>
              )}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="posteChoisi" className="form-label">
              Poste Choisi <span className="required">*</span>
            </label>
            <input
              type="text"
              id="posteChoisi"
              name="posteChoisi"
              value={formData.posteChoisi}
              onChange={handleInputChange}
              className={`form-input ${errors.posteChoisi ? "error" : ""}`}
              placeholder="Ex: Développeur Full Stack, Data Scientist, etc."
            />
            {errors.posteChoisi && (
              <span className="error-message">{errors.posteChoisi}</span>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="cv" className="form-label">
              Télécharger CV (PDF) <span className="required">*</span>
            </label>
            <div className="file-upload-container">
              <input
                type="file"
                id="cv"
                name="cv"
                accept=".pdf"
                onChange={handleFileChange}
                className="file-input"
              />
              <label
                htmlFor="cv"
                className={`file-upload-label ${errors.cv ? "error" : ""}`}
              >
                <span className="file-upload-icon">📄</span>
                <span className="file-upload-text">
                  {formData.cv ? formData.cv.name : "Choisir un fichier PDF"}
                </span>
              </label>
            </div>
            {errors.cv && <span className="error-message">{errors.cv}</span>}
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? "submitting" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Soumission en cours..." : "Soumettre ma candidature"}
            </button>
          </div>

          {submitMessage && (
            <div className={`submit-message ${submitMessage.includes("succès") ? "success" : "error"}`}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Candidat;
