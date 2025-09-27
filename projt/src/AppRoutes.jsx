import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./Home";
import Developpeurs from "./Developpeurs";
import Recruteurs from "./Recruteurs";
import Candidat from "./Candidat";
import FormulaireCandidat from "./FormulaireCandidat";
import IA from "./IA";
import Actualites_dev from "./Actualites_dev";
import Contact from "./Contact";
import Futuriste from "./Futuriste";
import JobDetails from "./JobDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Gardes contre les URLs invalides vers JobDetails */}
      <Route path="/job" element={<Navigate to="/" replace />} />
      <Route path="/job/undefined" element={<Navigate to="/" replace />} />
      <Route path="/Developpeurs" element={<Developpeurs />} />
      <Route path="/Recruteurs" element={<Recruteurs />} />
      <Route path="/Candidat" element={<Candidat />} />
      <Route path="/Actualites_dev" element={<Actualites_dev />} />
      <Route path="/IA" element={<IA />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/formulaire" element={<FormulaireCandidat />} />
      <Route path="/Futuriste" element={<Futuriste />} />
      <Route path="/job/:id" element={<JobDetails />} />
    </Routes>
  );
}

export default AppRoutes;
