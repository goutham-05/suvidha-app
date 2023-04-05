import { Route, Routes, useRoutes } from "react-router-dom";
import "./App.css";
import { routes } from "./utilities/routes/routes";

function App() {

  const element = useRoutes(routes);

  return (
    <div className="App">
      {element}
    </div>
  );
}

export default App;
