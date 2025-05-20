import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize React app
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found!");
}
