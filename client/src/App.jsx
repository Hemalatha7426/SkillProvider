import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import FAQ from "./pages/FAQ";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

// ProtectedRoute Component
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Loading screen during API or auth process
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* ================= Public Routes ================= */}
        <Route path="/" element={<Landing />} />

        {/* ================= Auth Routes ================= */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setIsLoading={setIsLoading}
              />
            )
          }
        />

        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signup
                setIsAuthenticated={setIsAuthenticated}
                setIsLoading={setIsLoading}
              />
            )
          }
        />

        {/* ================= Protected Routes ================= */}
<Route
  path="/dashboard"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Dashboard setIsAuthenticated={setIsAuthenticated} />
    </ProtectedRoute>
  }
/>


        <Route
          path="/courses"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CourseDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Quiz />
            </ProtectedRoute>
          }
        />

<Route
  path="/profile"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Profile
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </ProtectedRoute>
  }
/>


        <Route
          path="/notifications"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Feedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faq"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FAQ />
            </ProtectedRoute>
          }
        />

        {/* ================= Fallback Route ================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
