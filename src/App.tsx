import { useState } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import { routes } from "./utilities/routes/routes";
import BackgroundImage from "./components/background";
import Ambulance from "./components/ambulance-modal";

function App() {

  const element = useRoutes(routes);

  return (
    <div className="App">
      {element}
      <BackgroundImage />
      <Footer />
    </div>
  );
}

export default App;
