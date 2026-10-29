import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/header.css";
import "./styles/nav-overlay.css";
import "./styles/cta.css";
import "./styles/popular.css";
import "./styles/responsive.css";
import "./styles/eyebrow.css";
import "./styles/glass-panel.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
