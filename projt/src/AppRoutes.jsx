import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import Developpeurs from "./Developpeurs";
import Recruteurs from "./Recruteurs";
import Candidat from "./Candidat";
import FormulaireCandidat from "./FormulaireCandidat";
import IA from "./IA";
import Actualites_dev from "./Actualites_dev";
import Contact from "./Contact";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Developpeurs" element={<Developpeurs />} />
      <Route path="/Recruteurs" element={<Recruteurs />} />
      <Route path="/Candidat" element={<Candidat />} />
      <Route path="/Actualites_dev" element={<Actualites_dev />} />
      <Route path="/IA" element={<IA />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/formulaire" element={<FormulaireCandidat />} />
    </Routes>
  );
}

export default AppRoutes;
