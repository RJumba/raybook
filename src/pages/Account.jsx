import { Link } from "react-router-dom";

import {
  ArrowRight,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import PageTransition from "../components/PageTransition";

function Account() {
  return (
    <PageTransition>
      <section className="account-page">
        <div className="account-wrapper">
          <div className="account-intro">
            <span className="section-label">
              WELCOME TO RAYBOOK
            </span>

            <h1>
              Your experiences,
              <br />
              <span>all in one place.</span>
            </h1>

            <p>
              Sign in to manage your tickets, saved
              events and upcoming experiences.
            </p>
          </div>

          <div className="login-card">
            <div className="login-icon">
              <UserRound size={25} />
            </div>

            <h2>Welcome back</h2>

            <p>
              Sign in to continue to your account.
            </p>

            <label>
              Email address

              <div className="form-input">
                <Mail size={18} />

                <input
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
            </label>

            <label>
              Password

              <div className="form-input">
                <LockKeyhole size={18} />

                <input
                  type="password"
                  placeholder="Enter password"
                />
              </div>
            </label>

            <button
              className="login-button"
              onClick={() =>
                alert(
                  "Authentication will be connected to Supabase later."
                )
              }
            >
              Sign in
              <ArrowRight size={18} />
            </button>

            <div className="login-register">
              Don't have an account?{" "}
              <Link to="/account">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Account;