import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  BookOpen,
  Globe,
  Target,
  ArrowRight,
  ArrowLeft,
  Check,
  Heart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../context/AuthContext";

const COUNTRIES = ["Indonesia", "Vietnam", "Philippines", "Thailand"];
const LANGUAGE_OPTIONS = [
  {
    value: "fluent",
    label: "Fluent speaker",
    desc: "I grew up speaking the language at home.",
  },
  {
    value: "conversational",
    label: "Conversational",
    desc: "I understand some and can hold basic conversations.",
  },
  {
    value: "learning",
    label: "Learning",
    desc: "I know a few words and want to learn more.",
  },
  {
    value: "disconnected",
    label: "Disconnected",
    desc: "The language was lost in my family. I want to reconnect.",
  },
];

const STEPS = [
  { id: 1, label: "Heritage", icon: Globe },
  { id: 2, label: "Roots", icon: BookOpen },
  { id: 3, label: "Language", icon: Globe },
  { id: 4, label: "Purpose", icon: Target },
];

export default function EmotionalMapping() {
  const { user, profile, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [country, setCountry] = useState(profile.country || "");
  const [heritage, setHeritage] = useState(profile.heritage || "");
  const [language, setLanguage] = useState(profile.language || "");
  const [goal, setGoal] = useState(profile.goal || "");
  const [submitting, setSubmitting] = useState(false);

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-24 bg-warm-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-warm-950 font-display">
            Please sign in
          </h2>
          <p className="mt-2 text-warm-600">
            You need to be logged in to access your journey.
          </p>
          <Button className="mt-6" onClick={() => navigate("/login")}>
            Go to Sign In
          </Button>
        </div>
      </div>
    );
  }

  // Redirect if already completed
  if (profile.emotionalMappingComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-24 bg-warm-50">
        <div className="text-center">
          <Check className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-warm-950 font-display">
            Assessment complete
          </h2>
          <p className="mt-2 text-warm-600">
            Your emotional mapping profile is ready.
          </p>
          <Button className="mt-6" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const canNext = () => {
    if (step === 1) return country.trim().length > 0;
    if (step === 2) return heritage.trim().length > 0;
    if (step === 3) return language.trim().length > 0;
    if (step === 4) return goal.trim().length > 0;
    return false;
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    setSubmitting(true);
    updateProfile({
      country,
      heritage,
      language,
      goal,
      emotionalMappingComplete: true,
    });
    // Brief pause so the user sees the completion state
    setTimeout(() => {
      setSubmitting(false);
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">
            Emotional Mapping
          </p>
          <h1 className="mt-2 text-3xl font-bold text-warm-950 md:text-4xl font-display">
            Where do your roots lead?
          </h1>
          <p className="mt-3 max-w-lg mx-auto text-lg text-warm-600">
            This short assessment helps us understand your heritage background so
            we can craft a journey that truly feels like home.
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      step > s.id
                        ? "bg-green-500 text-white"
                        : step === s.id
                          ? "bg-accent-500 text-white"
                          : "bg-warm-200 text-warm-500"
                    }`}
                  >
                    {step > s.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <s.icon className="h-4 w-4" />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium hidden sm:block ${
                      step >= s.id ? "text-warm-900" : "text-warm-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 mt-[-1.25rem] ${
                      step > s.id ? "bg-green-400" : "bg-warm-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <Card className="border-0 shadow-lg">
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent-500" />
                  Where is your heritage from?
                </CardTitle>
                <CardDescription>
                  Select the Southeast Asian country your family traces back to.
                  This helps us connect you with the right community and
                  experiences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {COUNTRIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCountry(c)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                      country === c
                        ? "border-accent-500 bg-accent-50 text-accent-800"
                        : "border-warm-200 hover:border-warm-300 bg-white text-warm-700"
                    }`}
                  >
                    <span className="font-medium">{c}</span>
                  </button>
                ))}
                <div className="relative pt-2">
                  <p className="text-xs text-warm-400 mb-1">
                    Don&apos;t see your country? Type it here:
                  </p>
                  <Input
                    value={COUNTRIES.includes(country) ? "" : country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Malaysia, Cambodia, Laos…"
                  />
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent-500" />
                  Tell us about your roots
                </CardTitle>
                <CardDescription>
                  Share what you know about your family&apos;s heritage. Even
                  fragments matter — a region, a tradition, a story passed down.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={heritage}
                  onChange={(e) => setHeritage(e.target.value)}
                  placeholder="e.g. My grandmother was from Central Java. She used to cook rendang every Sunday and told stories about the rice fields where she grew up…"
                  rows={6}
                  className="w-full rounded-lg border border-warm-200 px-4 py-3 text-sm text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Maternal lineage",
                    "Paternal lineage",
                    "Food traditions",
                    "Religious customs",
                    "Textiles & crafts",
                    "Music & dance",
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`cursor-pointer transition-colors ${
                        heritage.includes(tag)
                          ? "border-accent-500 bg-accent-50 text-accent-700"
                          : "hover:border-warm-300"
                      }`}
                      onClick={() => {
                        setHeritage((prev) =>
                          prev.includes(tag)
                            ? prev.replace(tag, "").replace(/\s{2,}/g, " ").trim()
                            : prev
                              ? `${prev} ${tag}`
                              : tag,
                        );
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent-500" />
                  Your language connection
                </CardTitle>
                <CardDescription>
                  Language is the bridge to heritage. How connected are you to
                  your ancestral language?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setLanguage(opt.desc)}
                    className={`w-full text-left px-4 py-4 rounded-lg border-2 transition-colors ${
                      language === opt.desc
                        ? "border-accent-500 bg-accent-50 text-accent-800"
                        : "border-warm-200 hover:border-warm-300 bg-white text-warm-700"
                    }`}
                  >
                    <span className="font-medium block">{opt.label}</span>
                    <span className="text-sm text-warm-500 block mt-0.5">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </CardContent>
            </>
          )}

          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent-500" />
                  What are you hoping to find?
                </CardTitle>
                <CardDescription>
                  Every return journey is personal. What would make this
                  experience meaningful for you?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. I want to visit the village my grandparents left, learn to cook dishes from my heritage region, and understand the traditions they carried with them…"
                  rows={5}
                  className="w-full rounded-lg border border-warm-200 px-4 py-3 text-sm text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Trace ancestry",
                    "Learn cooking",
                    "Visit homeland",
                    "Language study",
                    "Cultural immersion",
                    "Family history",
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`cursor-pointer transition-colors ${
                        goal.includes(tag)
                          ? "border-accent-500 bg-accent-50 text-accent-700"
                          : "hover:border-warm-300"
                      }`}
                      onClick={() => {
                        setGoal((prev) =>
                          prev.includes(tag)
                            ? prev.replace(tag, "").replace(/\s{2,}/g, " ").trim()
                            : prev
                              ? `${prev} ${tag}`
                              : tag,
                        );
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </>
          )}

          {/* Navigation */}
          <div className="px-6 pb-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              className={step === 1 ? "invisible" : ""}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {step < 4 ? (
              <Button onClick={handleNext} disabled={!canNext()}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!canNext() || submitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {submitting ? (
                  "Completing…"
                ) : (
                  <>
                    Complete Assessment <Heart className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>

        {/* Skip link */}
        {step === 1 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-warm-400 hover:text-warm-600 underline underline-offset-2 transition-colors"
            >
              I&apos;ll do this later — take me to my dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
