import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

// DEMO ONLY — hardcoded credentials for prototype. Replace with a real auth backend.
const DEFAULT_USER = { email: "diaspora@example.com", password: "password123" };
const DEFAULT_PROFILE = {
  country: "Indonesia",
  heritage: "Maternal lineage tracing back along regional maritime rivers.",
  language: "English speaker, intermediate conversational understanding.",
  goal: "Trace ancestry documentation while mastering generational culinary arts.",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("homecoming_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [profile, setProfile] = useState(() => {
    const stored = sessionStorage.getItem("homecoming_profile");
    return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
  });
  const [booking, setBooking] = useState(() => {
    const stored = sessionStorage.getItem("homecoming_booking");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((email, password) => {
    if (email === DEFAULT_USER.email && password === DEFAULT_USER.password) {
      const userData = { email, name: email.split("@")[0] };
      setUser(userData);
      sessionStorage.setItem("homecoming_user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password." };
  }, []);

  const register = useCallback((email, password) => {
    if (!email || !password) {
      return { success: false, error: "All fields are required." };
    }
    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters.",
      };
    }
    const userData = { email, name: email.split("@")[0] };
    setUser(userData);
    // Reset profile for new users so the Emotional Mapping wizard starts fresh
    setProfile({});
    sessionStorage.setItem("homecoming_user", JSON.stringify(userData));
    sessionStorage.setItem("homecoming_profile", JSON.stringify({}));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setBooking(null);
    sessionStorage.removeItem("homecoming_user");
    sessionStorage.removeItem("homecoming_booking");
  }, []);

  const updateProfile = useCallback(
    (newProfile) => {
      const updated = { ...profile, ...newProfile };
      setProfile(updated);
      sessionStorage.setItem("homecoming_profile", JSON.stringify(updated));
    },
    [profile],
  );

  const createBooking = useCallback((experience) => {
    const newBooking = {
      id: Date.now(),
      experienceId: experience.id,
      title: experience.title,
      country: experience.country,
      type: experience.type,
      duration: experience.duration,
      status: "confirmed",
      bookedAt: new Date().toISOString(),
    };
    setBooking(newBooking);
    sessionStorage.setItem("homecoming_booking", JSON.stringify(newBooking));
  }, []);

  const cancelBooking = useCallback(() => {
    setBooking(null);
    sessionStorage.removeItem("homecoming_booking");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        booking,
        login,
        register,
        logout,
        updateProfile,
        createBooking,
        cancelBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
