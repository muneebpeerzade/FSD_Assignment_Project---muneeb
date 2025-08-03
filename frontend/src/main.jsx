import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { JobProvider } from "./context/JobContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <JobProvider>
      <App />
    </JobProvider>
  </StrictMode>
);
