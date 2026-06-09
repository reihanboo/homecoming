import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Search } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { experiences, countries, types } from "../data/experiences";

export default function ExperiencesPage() {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = useMemo(
    () =>
      experiences.filter((e) => {
        const s = search.toLowerCase();
        const c = !countryFilter || e.country === countryFilter;
        const t = !typeFilter || e.type === typeFilter;
        const q =
          !s ||
          e.title.toLowerCase().includes(s) ||
          e.desc.toLowerCase().includes(s) ||
          e.country.toLowerCase().includes(s);
        return c && t && q;
      }),
    [search, countryFilter, typeFilter],
  );

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">
            Heritage Journeys
          </p>
          <h1 className="mt-2 text-4xl font-bold text-warm-950 md:text-5xl font-display">
            Where will your roots lead you?
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-warm-600">
            Each journey is a structured return — not a tour package. You will
            live in communities, learn from elders, and reconnect with the
            places your family once called home.
          </p>
        </div>

        <div className="mb-10 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-400" />
            <Input
              placeholder="Search by country, craft, or tradition..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCountryFilter("")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!countryFilter ? "bg-accent-500 text-white" : "bg-warm-100 text-warm-700 hover:bg-warm-200"}`}
            >
              All Countries
            </button>
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setCountryFilter(countryFilter === c ? "" : c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${countryFilter === c ? "bg-accent-500 text-white" : "bg-warm-100 text-warm-700 hover:bg-warm-200"}`}
              >
                {c}
              </button>
            ))}
            <span className="w-px bg-warm-300 mx-1" />
            <button
              onClick={() => setTypeFilter("")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!typeFilter ? "bg-primary-700 text-white" : "bg-warm-100 text-warm-700 hover:bg-warm-200"}`}
            >
              All Types
            </button>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(typeFilter === t ? "" : t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${typeFilter === t ? "bg-primary-700 text-white" : "bg-warm-100 text-warm-700 hover:bg-warm-200"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((exp, i) => {
              const isFirst =
                i === 0 && !search && !countryFilter && !typeFilter;
              return (
                <Card
                  key={exp.id}
                  className={`group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 ${isFirst ? "sm:col-span-2 lg:col-span-2 lg:grid lg:grid-cols-5" : ""}`}
                >
                  <Link
                    to={`/experiences/${exp.id}`}
                    className={`relative overflow-hidden block ${isFirst ? "lg:col-span-3 aspect-[16/10] lg:aspect-auto" : "aspect-[4/3]"}`}
                  >
                    <img
                      src={exp.banner}
                      alt={exp.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%2312372A' width='400' height='300'/%3E%3Ctext fill='%23AD8B3A' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='18'%3EImage Unavailable%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 backdrop-blur text-warm-800 border-0"
                      >
                        {exp.country}
                      </Badge>
                      <Badge className="bg-accent-500 text-white border-0">
                        {exp.type}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90 text-xs">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{exp.duration} days</span>
                      <span className="mx-1">·</span>
                      <MapPin className="h-3.5 w-3.5" />
                      <span>
                        {exp.places.length}{" "}
                        {exp.places.length === 1 ? "place" : "places"}
                      </span>
                    </div>
                  </Link>
                  <CardContent
                    className={`p-6 ${isFirst ? "lg:col-span-2 flex flex-col justify-center" : ""}`}
                  >
                    <Link to={`/experiences/${exp.id}`} className="group/link">
                      <h3 className="text-xl font-bold text-warm-950 font-display leading-tight group-hover/link:text-accent-700 transition-colors">
                        {exp.title}
                      </h3>
                    </Link>
                    <p className="mt-2 text-sm leading-relaxed text-warm-600">
                      {exp.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.dishes.slice(0, 2).map((d) => (
                        <span
                          key={d.name}
                          className="inline-flex items-center gap-1 rounded-md bg-warm-100 px-2 py-1 text-xs text-warm-700"
                        >
                          {d.name}
                        </span>
                      ))}
                      {exp.activities.slice(0, 1).map((a) => (
                        <span
                          key={a.name}
                          className="inline-flex items-center gap-1 rounded-md bg-primary-50 px-2 py-1 text-xs text-primary-700"
                        >
                          {a.name}
                        </span>
                      ))}
                    </div>
                    <Button className="mt-5" variant="outline" asChild>
                      <Link to={`/experiences/${exp.id}`}>
                        View Journey <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-warm-400">
              No journeys match your search. Try different filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
