import React from 'react'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Footer from "./Footer";
import Header from "./Header";

import "./App.css";

function App() {


  return (
    <>
    <BrowserRouter>
    <AppRoutes/>
      <Header />
      
    
    
      <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
