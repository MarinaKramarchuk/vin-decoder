import "./App.scss";
import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/home/Home";
import { VariablesPage } from "./pages/variables/Variables";
import { VariableDetailsPage } from "./pages/details";

function App() {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <Link to="/">
              VIN<span>Decoder</span>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__list">
              <li>
                <Link to="/" className="header__link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/variables" className="header__link">
                  Variables
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

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
