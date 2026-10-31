import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchApiJson } from "../../api";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(location.state?.message || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const { response, data: result } = await fetchApiJson("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

if (!response.ok) {
  throw new Error(result.message || "Could not sign in.");
}


      sessionStorage.setItem("authToken", result.token);
      sessionStorage.setItem("authUser", JSON.stringify(result.user));
      navigate("/home", { state: { user: result.user } });
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
      <section className="login-panel" aria-label="Royal Rajasthan login">
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
              <Sparkles size={14} /> A royal welcome
            </span>
            <h1>A taste of Rajasthan, served with warmth.</h1>
            <p>
              Sign in to make a reservation, explore your favourites, and enjoy
              a little royal treatment.
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
              <span className="login-heading-kicker">WELCOME BACK</span>
              <h2>Sign in to your account</h2>
              <p>Enter your details below to continue.</p>
            </div>

            {message && <p className="login-message">{message}</p>}
            {errorMessage && <p className="login-error">{errorMessage}</p>}

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="login-label" htmlFor="login-email">
                Email address
              </label>
              <div className="login-input-wrap">
                <Mail className="login-input-icon" size={18} />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="login-password-heading">
                <label className="login-label" htmlFor="login-password">
                  Password
                </label>
                <a className="login-forgot" href="#forgot-password">
                  Forgot password?
                </a>
              </div>
              <div className="login-input-wrap">
                <LockKeyhole className="login-input-icon" size={18} />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

              <label className="login-remember">
                <input type="checkbox" name="remember" />
                <span>Keep me signed in</span>
              </label>

              <button className="login-submit" type="submit" disabled={isSubmitting}>
                <span>{isSubmitting ? "Signing in…" : "Sign in"}</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="login-signup">
              New to Royal Rajasthan? <Link to="/signup">Create an account</Link>
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
