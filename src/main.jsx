import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const mount = () =>
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

// Mount once the typeface is in, so the page is laid out a single time in its real font.
// Mounting earlier means one full layout in the fallback font and a second when the font swaps.
// The preloader is on screen meanwhile; if the font is slow, give up waiting after a second.
const fontReady = document.fonts?.load('800 1em "Archivo"') ?? Promise.resolve();
const timeout = new Promise((resolve) => setTimeout(resolve, 1000));
Promise.race([fontReady, timeout]).then(mount, mount);
