import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import MemoProvider from "./context/MemoProvider";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MemoProvider>
        <App />
      </MemoProvider>
    </BrowserRouter>
  </StrictMode>
);
