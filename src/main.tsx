import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/assets/style/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

console.log("%c Easter Egg Aerocode", "font-size:24px; font-weight:bold; color:#6ba5f1;");
console.log("%c Você não deveria estar aqui... ou deveria?", "color:gray;");
console.log("%c Tomara que meus dados não sejam roubados por um árabe, como o Breno!", "color:gray;");
