import React, { createContext, useContext, useState } from "react";

// Create the context
const QuizContext = createContext();

// Provider component
export function QuizProvider({ children }) {
  const [quizData, setQuizData] = useState({});

  return (
    <QuizContext.Provider value={{ quizData, setQuizData }}>
      {children}
    </QuizContext.Provider>
  );
}

// Custom hook to use quiz context
export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
