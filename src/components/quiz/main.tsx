import React from "react";
import ReactDOM from "react-dom/client";
import QuizApp from "./QuizApp";
import "./QuizApp.css";

ReactDOM.createRoot(document.getElementById("quiz-root")!).render(
  <React.StrictMode>
    <QuizApp />
  </React.StrictMode>
);
