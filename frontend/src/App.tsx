import "./App.css";
import Fingerprint from "./Fingerprint";
import ProjectList from "./ProjectList";
import CookieConsent from "react-cookie-consent";
import CategoryFilter from "./CategoryFilter";
import WelcomeBand from "./WelcomeBand";

function App() {
  return (
    <>
      <div className="container mt-4">
        <div className="row bg-primary text-white">
          <WelcomeBand />
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter />
          </div>
          <div className="col-md-9">
            <ProjectList />
          </div>
        </div>
      </div>

      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Fingerprint />
    </>
  );
}

export default App;
