import { Link } from "react-router-dom";
import { Globe, Users, Shield, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const BADGES = [
  { icon: Globe, label: "ASEAN Heritage Network" },
  { icon: Users, label: "Cultural Ambassador Matching" },
  { icon: Shield, label: "Dual-Blind Privacy" },
];

export default function Landing() {
  return (
    <>
      <header className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-primary-950/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center text-white">
          <h1 className="text-4xl font-bold leading-tight tracking-wide md:text-6xl font-display">
            You are not a tourist.
            <br />
            <span className="text-accent-400">You are coming home.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-100 md:text-xl">
            A heritage reconnection platform built for the Southeast Asian
            diaspora. Not sightseeing packages — curated return journeys with
            Cultural Ambassadors who share your roots.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-accent-500 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur"
              >
                <Icon className="h-4 w-4 text-accent-400" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="xl" asChild>
              <Link to="/register">
                Begin Your Return <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-accent-500 text-accent-400 hover:bg-accent-500/10"
              asChild
            >
              <Link to="/gallery">Explore the Heritage Gallery</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Below-fold intro cards */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">
            What We Do
          </p>
          <h2 className="mt-2 text-3xl font-bold text-warm-950 md:text-4xl font-display">
            Not tourism. Belonging.
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-warm-600">
            HOME-COMING exists because existing travel platforms treat diaspora
            visitors the same as tourists. We built something different.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "The Experience",
                desc: "Immersive stays in local communities. Live as a resident, learn traditional crafts, join community activities — not a hotel itinerary.",
                cta: "Browse Journeys",
                to: "/experiences",
              },
              {
                title: "The Ambassador",
                desc: "A local peer matched to your heritage background. Not a tour guide reciting facts — a companion who shares your roots.",
                cta: "Learn More",
                to: "/partnerships",
              },
              {
                title: "The Support Layer",
                desc: "Resources for intergenerational trauma and Bicultural Affirmation. Helping you integrate both your heritage and adopted identities.",
                cta: "Get Started",
                to: "/register",
              },
            ].map((item) => (
              <Card key={item.title} className="border-0 shadow-md text-left">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-warm-950 font-display">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-warm-600">
                    {item.desc}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-5 w-fit"
                    asChild
                  >
                    <Link to={item.to}>
                      {item.cta} <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
