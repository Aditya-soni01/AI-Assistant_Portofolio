/**
 * @file main.jsx
 * @description React application entry point.
 *
 * Responsibilities:
 *  - Import global styles (Tailwind base + custom CSS)
 *  - Wrap the App component with any top-level providers
 *  - Mount the React tree into the #root DOM node defined in index.html
 *
 * StrictMode is intentionally enabled:
 *  - Surfaces deprecated lifecycle usage and legacy API calls during development
 *  - Has zero impact on the production bundle (stripped by React at build time)
 *  - Double-invokes render functions in dev to help detect side-effects
 */

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/index.css";

// ─── Root Element ─────────────────────────────────────────────────────────────
// Locate the mount point declared in index.html.
// Throw early with a clear message if the element is missing — this surfaces
// copy-paste errors during project setup rather than a cryptic React error.
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    '[dev-portfolio] Mount failed: no element with id="root" found in index.html. ' +
      "Ensure index.html contains <div id=\"root\"></div> inside <body>."
  );
}

// ─── React 18 Concurrent Root ─────────────────────────────────────────────────
// createRoot enables concurrent features (automatic batching, transitions, etc.)
// and is required for React 18+. The legacy ReactDOM.render API is removed.
const root = ReactDOM.createRoot(rootElement);

// ─── Render ───────────────────────────────────────────────────────────────────
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);