import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Mail, Lock, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = login(email, password);
    setLoading(false);
    if (result.success) navigate("/dashboard");
    else setError(result.error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24 pb-16 bg-warm-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wider text-warm-950 font-display"
          >
            HOME<span className="text-accent-500">-COMING</span>
          </Link>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <LogIn className="h-5 w-5 text-accent-500" /> Welcome back
            </CardTitle>
            <CardDescription>
              Sign in to continue your heritage journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="diaspora@example.com"
                  className="pl-10"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in…" : "Sign In"}{" "}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-warm-400">or</span>
              <Separator className="flex-1" />
            </div>

            <p className="mt-4 text-center text-sm text-warm-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-accent-600 hover:text-accent-700"
              >
                Create one
              </Link>
            </p>
            <p className="mt-3 text-center text-xs text-warm-400">
              Demo: diaspora@example.com / password123
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const result = register(email, password);
    setLoading(false);
    if (result.success) navigate("/emotional-mapping");
    else setError(result.error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24 pb-16 bg-warm-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wider text-warm-950 font-display"
          >
            HOME<span className="text-accent-500">-COMING</span>
          </Link>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-accent-500" /> Begin your return
            </CardTitle>
            <CardDescription>
              Create an account to start your heritage journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-10"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-400" />
                <Input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat your password"
                  className="pl-10"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account…" : "Create Account"}{" "}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-warm-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-accent-600 hover:text-accent-700"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
