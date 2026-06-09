import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Eagerly loaded — always visible
import Landing from "./pages/Landing";

// Lazy-loaded pages
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ExperiencesPage = lazy(() => import("./pages/ExperiencesPage"));
const ExperienceDetail = lazy(() => import("./pages/ExperienceDetail"));
const PartnershipsPage = lazy(() => import("./pages/PartnershipsPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Auth pages are small but lazy-load for consistency
const LoginPage = lazy(() =>
  import("./pages/Auth").then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import("./pages/Auth").then((m) => ({ default: m.RegisterPage })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent-500 border-t-transparent" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <AuthProvider>
          <ErrorBoundary>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <ScrollToTop />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/experiences" element={<ExperiencesPage />} />
                    <Route
                      path="/experiences/:id"
                      element={<ExperienceDetail />}
                    />
                    <Route
                      path="/partnerships"
                      element={<PartnershipsPage />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </AuthProvider>
      </ToastProvider>
    </HashRouter>
  );
}
