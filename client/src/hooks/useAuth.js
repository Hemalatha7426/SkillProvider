// src/hooks/useAuth.js
import { useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return { isAuthenticated, isLoading, login: () => setIsAuthenticated(true), logout: () => setIsAuthenticated(false) };
}
