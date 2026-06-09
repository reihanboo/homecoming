import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  BookOpen,
  LogOut,
  MapPin,
  ChefHat,
  Activity,
  CheckCircle,
  Circle,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { experiences } from "../data/experiences";

const LIFECYCLE = [
  {
    step: "Emotional Mapping",
    desc: "Complete identity assessment",
    icon: User,
  },
  { step: "Discovery", desc: "Browse the Heritage Gallery", icon: Globe },
  { step: "Ambassador Match", desc: "Paired with a local guide", icon: User },
  {
    step: "The Return",
    desc: "Travel and experience your homeland",
    icon: MapPin,
  },
];

export default function Dashboard() {
  const { user, profile, booking, updateProfile, cancelBooking, logout } =
    useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-24 bg-warm-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-warm-950 font-display">
            Please sign in
          </h2>
          <p className="mt-2 text-warm-600">
            You need to be logged in to access your dashboard.
          </p>
          <Button className="mt-6" onClick={() => navigate("/login")}>
            Go to Sign In
          </Button>
        </div>
      </div>
    );
  }

  const bookedExperience = booking
    ? experiences.find((e) => e.id === booking.experienceId)
    : null;

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-warm-950 font-display">
              Welcome back, {user.name}
            </h1>
            <p className="mt-1 text-warm-600">
              Your heritage journey dashboard.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="w-full justify-start bg-transparent p-0 gap-1">
            {[
              { value: "overview", label: "Journey", icon: LayoutDashboard },
              { value: "profile", label: "Heritage Profile", icon: User },
              { value: "booking", label: "My Booking", icon: BookOpen },
            ].map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-warm-300 rounded-lg"
              >
                <Icon className="h-4 w-4" /> {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* JOURNEY OVERVIEW */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardDescription className="uppercase tracking-wide">
                    Account
                  </CardDescription>
                  <CardTitle className="text-lg">{user.email}</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardDescription className="uppercase tracking-wide">
                    Booking Status
                  </CardDescription>
                  {booking ? (
                    <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" /> Confirmed —{" "}
                      {booking.title}
                    </CardTitle>
                  ) : (
                    <CardTitle className="text-lg text-warm-400">
                      No active booking
                    </CardTitle>
                  )}
                </CardHeader>
              </Card>
            </div>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Your Journey Lifecycle</CardTitle>
                <CardDescription>
                  Track your progress through the diaspora reconnection
                  experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-4">
                  {LIFECYCLE.map((s, i) => {
                    const done = !!booking;
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.step}
                        className={`rounded-xl border p-4 ${done ? "border-green-200 bg-green-50" : "border-warm-200 bg-white"}`}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full mb-3 ${done ? "bg-green-500 text-white" : "bg-warm-200 text-warm-500"}`}
                        >
                          {done ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-warm-500" />
                          <h5 className="text-sm font-semibold text-warm-950">
                            {s.step}
                          </h5>
                        </div>
                        <p className="mt-1 text-xs text-warm-500">{s.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {!booking && (
              <Card className="border-0 shadow-md">
                <CardContent className="py-12 text-center">
                  <Globe className="mx-auto h-12 w-12 text-warm-300 mb-4" />
                  <p className="text-warm-400 text-lg">
                    Ready to begin your journey?
                  </p>
                  <p className="text-warm-400 text-sm mt-1 mb-4">
                    Browse heritage experiences and book your return.
                  </p>
                  <Button asChild>
                    <Link to="/experiences">Browse Experiences</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* HERITAGE PROFILE */}
          <TabsContent value="profile">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Heritage Profile</CardTitle>
                <CardDescription>
                  Tell us about your roots so we can match you with the right
                  experience and ambassador.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-1.5">
                    Heritage Country
                  </label>
                  <select
                    value={editProfile.country}
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        country: e.target.value,
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-warm-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
                  >
                    {["Indonesia", "Philippines", "Vietnam", "Thailand"].map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-1.5">
                    Heritage Background
                  </label>
                  <Textarea
                    value={editProfile.heritage}
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        heritage: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-1.5">
                    Language Proficiency
                  </label>
                  <Input
                    value={editProfile.language}
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        language: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-1.5">
                    Experience Goals
                  </label>
                  <Textarea
                    value={editProfile.goal}
                    onChange={(e) =>
                      setEditProfile({ ...editProfile, goal: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <Button
                  onClick={() => {
                    updateProfile(editProfile);
                    setSaved(true);
                    toast("Profile saved successfully.", "success");
                    setTimeout(() => setSaved(false), 2000);
                  }}
                >
                  {saved ? "Saved" : "Save Profile"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MY BOOKING */}
          <TabsContent value="booking">
            {booking && bookedExperience ? (
              <div className="space-y-6">
                <Card className="border-0 shadow-md border-green-200 bg-green-50/50">
                  <CardHeader>
                    <Badge className="bg-green-100 text-green-700 border-green-300 w-fit mb-2">
                      Confirmed
                    </Badge>
                    <CardTitle>{booking.title}</CardTitle>
                    <CardDescription>{bookedExperience.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-warm-500 uppercase">
                          Country
                        </p>
                        <p className="font-semibold">{booking.country}</p>
                      </div>
                      <div>
                        <p className="text-xs text-warm-500 uppercase">Type</p>
                        <p className="font-semibold">{booking.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-warm-500 uppercase">
                          Duration
                        </p>
                        <p className="font-semibold">{booking.duration} days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-warm-500 mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Places You'll Visit
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {bookedExperience.places.map((p) => (
                      <Card key={p.name} className="border-0 shadow-sm">
                        <CardContent className="p-3 flex gap-3">
                          <img
                            src={p.img}
                            alt={p.name}
                            className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <p className="text-sm font-semibold text-warm-950">
                              {p.name}
                            </p>
                            <p className="text-xs text-warm-500">{p.desc}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-warm-500 mb-3 flex items-center gap-2">
                    <ChefHat className="h-4 w-4" /> Traditional Dishes
                  </h4>
                  <div className="space-y-3">
                    {bookedExperience.dishes.map((d) => (
                      <Card key={d.name} className="border-0 shadow-sm">
                        <CardContent className="p-4">
                          <p className="font-semibold text-warm-950">
                            {d.name}
                          </p>
                          <p className="text-xs text-warm-500 mb-2">{d.desc}</p>
                          <ol className="list-decimal list-inside space-y-1">
                            {d.recipe.map((step, i) => (
                              <li key={i} className="text-xs text-warm-600">
                                {step}
                              </li>
                            ))}
                          </ol>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-warm-500 mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4" /> Activities
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {bookedExperience.activities.map((a) => (
                      <Card key={a.name} className="border-0 shadow-sm">
                        <CardContent className="p-3 flex gap-3">
                          <img
                            src={a.img}
                            alt={a.name}
                            className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <p className="text-sm font-semibold text-warm-950">
                              {a.name}
                            </p>
                            <p className="text-xs text-warm-500">{a.desc}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => {
                    cancelBooking();
                    toast("Booking cancelled.", "info");
                  }}
                >
                  Cancel Booking
                </Button>
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="py-16 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-warm-300 mb-4" />
                  <p className="text-warm-400 text-lg">No active booking</p>
                  <p className="text-warm-400 text-sm mt-1 mb-4">
                    Browse experiences to find your return journey.
                  </p>
                  <Button asChild>
                    <Link to="/experiences">Browse Experiences</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
