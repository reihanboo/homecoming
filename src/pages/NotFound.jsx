import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24 pb-16 bg-warm-50">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-accent-500 font-display">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-warm-950 font-display">
          Page not found
        </h2>
        <p className="mt-2 text-warm-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button className="mt-8" asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
