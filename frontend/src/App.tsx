import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // import the provider

import ProjectsPage from "./pages/ProjectsPage";
import DonatePage from "./pages/DonatePage";
import CartPage from "./pages/CartPage";
import AdminProjectsPage from "./pages/AdminProjectsPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route
            path="/donate/:projectName/:projectId"
            element={<DonatePage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/adminprojects" element={<AdminProjectsPage />}></Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
