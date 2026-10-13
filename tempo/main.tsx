import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import TempoHost from "./.tempo/tempo-host";
import "./globals.css";

const isTempoHostRoute = window.location.pathname.startsWith("/tempo-host");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isTempoHostRoute ? <TempoHost /> : <App />}
  </StrictMode>,
);
