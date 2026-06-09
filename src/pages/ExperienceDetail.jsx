import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clock,
  MapPin,
  ChefHat,
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { experiences } from "../data/experiences";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useState } from "react";

export default function ExperienceDetail() {
  const { id } = useParams();
  const { user, booking, createBooking } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [booked, setBooked] = useState(false);

  const exp = experiences.find((e) => e.id === Number(id));
  if (!exp) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 bg-warm-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-warm-950 font-display">
            Experience not found
          </h2>
          <Button className="mt-4" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isBooked = booked || (booking && booking.experienceId === exp.id);

  const handleBook = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    createBooking(exp);
    setBooked(true);
    toast(`Booked: ${exp.title}`, "success");
  };

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-6">
        {/* Back link */}
        <Link
          to="/experiences"
          className="inline-flex items-center gap-2 text-sm text-warm-600 hover:text-warm-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to experiences
        </Link>

        {/* Hero banner */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
          <img
            src={exp.banner}
            alt={exp.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%2312372A' width='800' height='400'/%3E%3Ctext fill='%23AD8B3A' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='24'%3EImage Unavailable%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex gap-2 mb-3">
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
            <h1 className="text-3xl md:text-4xl font-bold text-white font-display">
              {exp.title}
            </h1>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description + meta */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>About This Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-warm-700 leading-relaxed">{exp.desc}</p>
                <div className="mt-6 flex gap-6 text-sm">
                  <div className="flex items-center gap-2 text-warm-600">
                    <Clock className="h-4 w-4 text-accent-500" />
                    <span>
                      <strong>{exp.duration}</strong> days
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-600">
                    <MapPin className="h-4 w-4 text-accent-500" />
                    <span>
                      <strong>{exp.places.length}</strong>{" "}
                      {exp.places.length === 1 ? "place" : "places"} to visit
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Places */}
            <div>
              <h3 className="text-lg font-semibold text-warm-950 font-display mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent-500" /> Places You'll
                Visit
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {exp.places.map((p) => (
                  <Card
                    key={p.name}
                    className="border-0 shadow-sm overflow-hidden group"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-warm-950">{p.name}</h4>
                      <p className="mt-1 text-sm text-warm-600">{p.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Dishes */}
            <div>
              <h3 className="text-lg font-semibold text-warm-950 font-display mb-4 flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-accent-500" /> Traditional
                Dishes You'll Learn
              </h3>
              <div className="space-y-4">
                {exp.dishes.map((d) => (
                  <Card key={d.name} className="border-0 shadow-sm">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-warm-950">{d.name}</h4>
                      <p className="mt-1 text-sm text-warm-600">{d.desc}</p>
                      <div className="mt-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-warm-400 mb-2">
                          Recipe
                        </p>
                        <ol className="list-decimal list-inside space-y-1">
                          {d.recipe.map((step, i) => (
                            <li key={i} className="text-sm text-warm-700">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Activities */}
            <div>
              <h3 className="text-lg font-semibold text-warm-950 font-display mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent-500" /> Hands-On
                Activities
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {exp.activities.map((a) => (
                  <Card
                    key={a.name}
                    className="border-0 shadow-sm overflow-hidden group"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={a.img}
                        alt={a.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-warm-950">{a.name}</h4>
                      <p className="mt-1 text-sm text-warm-600">{a.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — booking CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-warm-950 font-display">
                      {exp.duration} days
                    </p>
                    <p className="text-sm text-warm-500">
                      immersive experience in {exp.country}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-warm-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      Cultural Ambassador pairing included
                    </div>
                    <div className="flex items-center gap-2 text-sm text-warm-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {exp.places.length} heritage{" "}
                      {exp.places.length === 1 ? "site" : "sites"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-warm-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {exp.dishes.length} traditional{" "}
                      {exp.dishes.length === 1 ? "dish" : "dishes"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-warm-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {exp.activities.length} hands-on{" "}
                      {exp.activities.length === 1 ? "activity" : "activities"}
                    </div>
                  </div>

                  {isBooked ? (
                    <div className="text-center">
                      <Badge className="bg-green-100 text-green-700 border-green-300 mb-3">
                        Confirmed
                      </Badge>
                      <Button className="w-full" asChild>
                        <Link to="/dashboard">
                          View in Dashboard{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full" size="lg" onClick={handleBook}>
                      Begin Your Return <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}

                  <p className="mt-3 text-center text-xs text-warm-400">
                    {user
                      ? "You'll be redirected to your dashboard after booking."
                      : "You'll need to sign in to complete your booking."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
