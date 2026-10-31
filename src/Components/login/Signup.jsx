import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
  UtensilsCrossed,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not create your account.");
      }

      navigate("/login", { state: { message: result.message } });
    } catch (error) {
      setErrorMessage(
        error.message === "Failed to fetch"
          ? "Server se connect nahi ho pa raha. Backend chala kar dobara try karo."
          : error.message,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel" aria-label="Create a Royal Rajasthan account">
        <div className="login-art" aria-hidden="true">
          <div className="login-art-glow" />
          <div className="login-brand">
            <span className="login-brand-icon">
              <UtensilsCrossed size={22} strokeWidth={1.7} />
            </span>
            <span>ROYAL RAJASTHAN</span>
          </div>

          <div className="login-art-copy">
            <span className="login-eyebrow">
              <Sparkles size={14} /> Your royal experience
            </span>
            <h1>Make every visit a little more special.</h1>
            <p>
              Create an account to keep your favourite moments and meals close.
            </p>
          </div>

          <div className="login-art-footer">
            <span className="login-art-line" />
            <span>GOOD FOOD. GREAT MEMORIES.</span>
          </div>
        </div>

        <div className="login-form-side">
          <div className="login-form-wrap">
            <div className="login-mobile-brand">
              <span className="login-brand-icon">
                <UtensilsCrossed size={20} strokeWidth={1.7} />
              </span>
              <span>ROYAL RAJASTHAN</span>
            </div>

            <div className="login-heading">
              <span className="login-heading-kicker">JOIN THE TABLE</span>
              <h2>Create your account</h2>
              <p>It only takes a moment to get started.</p>
            </div>

            {errorMessage && <p className="login-error">{errorMessage}</p>}

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="login-label" htmlFor="signup-name">
                Full name
              </label>
              <div className="login-input-wrap">
                <UserRound className="login-input-icon" size={18} />
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>

              <label className="login-label signup-field-label" htmlFor="signup-email">
                Email address
              </label>
              <div className="login-input-wrap">
                <Mail className="login-input-icon" size={18} />
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <label className="login-label signup-field-label" htmlFor="signup-password">
                Password
              </label>
              <div className="login-input-wrap">
                <LockKeyhole className="login-input-icon" size={18} />
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <button
                  className="login-password-toggle"
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button className="login-submit" type="submit" disabled={isSubmitting}>
                <span>{isSubmitting ? "Creating account…" : "Create account"}</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="login-signup">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>

            <p className="login-terms">
              By continuing, you agree to our <a href="#terms">Terms</a> and{" "}
              <a href="#privacy">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
