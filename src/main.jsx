import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Auth from "./context/AuthContext.jsx";
import GlobalData from "./context/GlobalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth>
      <GlobalData>
        <App />
      </GlobalData>
    </Auth>
  </React.StrictMode>
);
