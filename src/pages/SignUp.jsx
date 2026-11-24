import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  CheckCircle2,
} from "lucide-react";

import { supabase } from "../lib/supabase";

import PageTransition from "../components/PageTransition";
import "../styles/SignUp.css";

function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading || signupComplete) return;

    setError("");
    setSuccess("");

    const fullName = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (fullName.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password: form.password,

        options: {
          data: {
            full_name: fullName,
            raybook_signup_type: "customer",
          },

          emailRedirectTo: `${window.location.origin}/account`,
        },
      });

      if (signupError) {
        throw signupError;
      }

      if (!data.user) {
        throw new Error("Unable to complete registration. Please try again.");
      }

      setForm((previous) => ({
        ...previous,
        password: "",
        confirmPassword: "",
      }));

      setSignupComplete(true);

      if (data.session) {
        setSuccess(
          "Your account has been created successfully. You are now signed in.",
        );
      } else {
        setSuccess(
          "Registration request received. If the account is eligible, you will receive an email with a confirmation link. Please check your inbox.",
        );
      }
    } catch (err) {
      console.error("Supabase signup error:", err.name || "SignupError");

      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="signup-page">
        <div className="signup-wrapper">
          {/* LEFT SIDE - INTRODUCTION */}

          <div className="signup-intro">
            <span className="section-label">JOIN THE EXPERIENCE</span>

            <h1>
              Every great moment
              <br />
              <span>starts here.</span>
            </h1>

            <p>
              Create your Raybook account to discover events, secure tickets,
              and keep your favourite experiences in one place.
            </p>

            <div className="signup-benefits">
              <div>
                <CheckCircle2 size={19} />
                Discover new experiences
              </div>

              <div>
                <CheckCircle2 size={19} />
                Manage your bookings
              </div>

              <div>
                <CheckCircle2 size={19} />
                Save events you love
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - SIGNUP FORM */}

          <form className="signup-card" onSubmit={handleSubmit}>
            <div className="signup-icon">
              <UserRound size={25} />
            </div>

            <h2>Create your account</h2>

            <p>Join Raybook and start making memories.</p>

            {/* FULL NAME */}

            <label htmlFor="signup-name">Full name</label>

            <div className="signup-input">
              <UserRound size={18} />

              <input
                id="signup-name"
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                disabled={loading || signupComplete}
              />
            </div>

            {/* EMAIL ADDRESS */}

            <label htmlFor="signup-email">Email address</label>

            <div className="signup-input">
              <Mail size={18} />

              <input
                id="signup-email"
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                autoComplete="email"
                required
                disabled={loading || signupComplete}
              />
            </div>

            {/* PASSWORD */}

            <label htmlFor="signup-password">Password</label>

            <div className="signup-input">
              <LockKeyhole size={18} />

              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={updateField}
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                required
                disabled={loading || signupComplete}
              />

              <button
                type="button"
                className="signup-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}

            <label htmlFor="signup-confirm">Confirm password</label>

            <div className="signup-input">
              <LockKeyhole size={18} />

              <input
                id="signup-confirm"
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={updateField}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
                disabled={loading || signupComplete}
              />

              <button
                type="button"
                className="signup-eye"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* ERROR MESSAGE */}

            {error && (
              <p className="signup-error" role="alert">
                {error}
              </p>
            )}

            {/* SUCCESS MESSAGE */}

            {success && (
              <p className="signup-success" role="status" aria-live="polite">
                <CheckCircle2 size={18} />
                {success}
              </p>
            )}

            {/* CREATE ACCOUNT BUTTON */}

            <button
              className="signup-submit"
              type="submit"
              disabled={loading || signupComplete}
            >
              {loading
                ? "Creating account..."
                : signupComplete
                  ? "Registration received"
                  : "Create account"}

              {!loading && !signupComplete && <ArrowRight size={18} />}
            </button>

            {/* SIGN IN LINK */}

            <div className="signup-login">
              Already have an account? <Link to="/account">Sign in</Link>
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}

export default SignUp;
