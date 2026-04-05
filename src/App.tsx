import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/home/home";
import { VariablesPage } from "./pages/variables/variables";
import { VariableDetailsPage } from "./pages/details";

function App() {
  return (
    <>
      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/variables">Variables List</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/variables" element={<VariablesPage />} />
          <Route
            path="/variables/:variableId"
            element={<VariableDetailsPage />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
