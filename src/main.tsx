import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GoalApiProvider from "./context/GoalApiContext.tsx";
import DailySalesProvider from "./context/DailySalesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoalApiProvider>
      <DailySalesProvider>
        <App />
      </DailySalesProvider>
    </GoalApiProvider>
  </React.StrictMode>,
);
