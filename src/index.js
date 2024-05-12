import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./locales/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> // 개발자 도구 제거
  <App />
  // </React.StrictMode>
);
