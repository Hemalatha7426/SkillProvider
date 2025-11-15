import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QuizProvider } from "./contexts/QuizContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <App />
      </QuizProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
