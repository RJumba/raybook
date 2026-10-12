
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

  const updateField = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    alert("Account registration will be connected to Supabase.");
  };

  return (
    <PageTransition>
      <section className="signup-page">
        <div className="signup-wrapper">
          <div className="signup-intro">
            <span className="section-label">
              JOIN THE EXPERIENCE
            </span>

            <h1>
              Every great moment
              <br />
              <span>starts here.</span>
            </h1>

            <p>
              Create your Raybook account to discover events,
              secure tickets, and keep your favourite
              experiences in one place.
            </p>

            <div className="signup-benefits">
              <div><CheckCircle2 size={19} /> Discover new experiences</div>
              <div><CheckCircle2 size={19} /> Manage your bookings</div>
              <div><CheckCircle2 size={19} /> Save events you love</div>
            </div>
          </div>

          <form className="signup-card" onSubmit={handleSubmit}>
            <div className="signup-icon">
              <UserRound size={25} />
            </div>

            <h2>Create your account</h2>
            <p>Join Raybook and start making memories.</p>

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
              />
            </div>

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
              />
            </div>

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

            {error && <p className="signup-error" role="alert">{error}</p>}

            <button className="signup-submit" type="submit">
              Create account <ArrowRight size={18} />
            </button>

            <div className="signup-login">
              Already have an account?{" "}
              <Link to="/account">Sign in</Link>
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}

export default SignUp;
