import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { ensureCustomerProfile } from "../lib/customerProfile";

import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";

import PageTransition from "../components/PageTransition";

function Account() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setLoginError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSigningIn) return;

    setLoginError("");
    setIsSigningIn(true);

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    try {
      // Validate input
      if (!email || !password) {
        throw new Error("Please enter your email and password.");
      }

      // Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Confirm login session exists
      if (!data.user || !data.session) {
        throw new Error("Unable to establish a login session.");
      }

      try {
        // Automatically prepare the customer profile.
        // Existing profiles are not overwritten.
        await ensureCustomerProfile(data.user);
      } catch (profileError) {
        console.error("Customer profile synchronization failed:", profileError);

        // Authentication has already succeeded.
        // We can report the profile problem separately.
        setLoginError(
          "You are signed in, but your customer profile could not be prepared.",
        );

        return;
      }

      // Login was successful
      // Clear password from the form state
      setForm((previous) => ({
        ...previous,
        password: "",
      }));

      // Redirect to Raybook homepage
      navigate("/", { replace: true });
    } catch (error) {
      if (error.code === "email_not_confirmed") {
        setLoginError("Please confirm your email address before signing in.");
      } else if (error.code === "invalid_credentials") {
        setLoginError("Incorrect email or password.");
      } else {
        setLoginError(error.message || "Unable to sign in. Please try again.");
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <PageTransition>
      <section className="account-page">
        <div className="account-wrapper">
          {/* LEFT SIDE */}

          <div className="account-intro">
            <span className="section-label">WELCOME TO RAYBOOK</span>

            <h1>
              Your experiences,
              <br />
              <span>all in one place.</span>
            </h1>

            <p>
              Sign in to manage your tickets, saved events and upcoming
              experiences.
            </p>
          </div>

          {/* RIGHT SIDE - LOGIN FORM */}

          <form className="login-card" onSubmit={handleSubmit}>
            <div className="login-icon">
              <UserRound size={25} />
            </div>

            <h2>Welcome back</h2>

            <p>Sign in to continue to your account.</p>

            {/* EMAIL ADDRESS */}

            <label>
              Email address
              <div className="form-input">
                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={isSigningIn}
                />
              </div>
            </label>

            {/* PASSWORD */}

            <label>
              Password
              <div className="form-input">
                <LockKeyhole size={18} />

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={updateField}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  disabled={isSigningIn}
                />
              </div>
            </label>

            {/* LOGIN ERROR */}

            {loginError && (
              <p className="login-error" role="alert">
                {loginError}
              </p>
            )}

            {/* SIGN IN BUTTON */}

            <button
              className="login-button"
              type="submit"
              disabled={isSigningIn}
            >
              {isSigningIn ? "Signing in..." : "Sign in"}

              {!isSigningIn && <ArrowRight size={18} />}
            </button>

            {/* REGISTRATION LINK */}

            <div className="login-register">
              Don't have an account?{" "}
              <Link to="/signup" className="create-account-link">
                Create account
              </Link>
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}

export default Account;
