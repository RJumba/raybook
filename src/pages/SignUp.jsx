import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";

import PageTransition from "../components/PageTransition";

function AnimatedLogo() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Soft animated glow */}
      <motion.div
        className="absolute h-28 w-28 rounded-full bg-red-600/20 blur-3xl sm:h-36 sm:w-36"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating logo */}
      <motion.div
        className="
          relative flex h-20 w-20 items-center justify-center
          rounded-[24px] bg-red-600
          shadow-[0_20px_60px_rgba(220,38,38,0.35)]
          sm:h-24 sm:w-24 sm:rounded-[28px]
        "
        initial={{
          opacity: 0,
          scale: 0.7,
          rotate: -8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
          y: [0, -8, 0],
        }}
        transition={{
          opacity: {
            duration: 0.5,
          },
          scale: {
            duration: 0.5,
          },
          rotate: {
            duration: 0.5,
          },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{
          scale: 1.07,
          rotate: 3,
        }}
      >
        <span className="select-none text-5xl font-black text-white sm:text-6xl">
          R
        </span>

        {/* Small shine */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}

function InputField({
  icon: Icon,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  rightElement,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/75">
        {label}
      </label>

      <div
        className="
          group relative flex items-center overflow-hidden
          rounded-2xl border border-white/10
          bg-white/[0.045]
          transition-all duration-300
          focus-within:border-red-500/70
          focus-within:bg-white/[0.065]
          focus-within:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]
        "
      >
        <div className="pointer-events-none absolute left-4 text-white/35 transition-colors duration-300 group-focus-within:text-red-500">
          <Icon size={19} strokeWidth={1.8} />
        </div>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="
            h-14 w-full bg-transparent
            pl-12 pr-12 text-[15px] text-white
            outline-none
            placeholder:text-white/25
          "
        />

        {rightElement}
      </div>
    </div>
  );
}

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const passwordsMatch =
    !formData.confirmPassword ||
    formData.password === formData.confirmPassword;

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
      Supabase account creation will be connected here later.

      Example later:

      await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      });
    */
  };

  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-red-700/10 blur-[120px]" />

          <div className="absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-red-600/10 blur-[140px]" />

          <div
            className="
              absolute inset-0 opacity-[0.025]
              [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
              [background-size:42px_42px]
            "
          />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-[1450px] items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              grid w-full max-w-6xl overflow-hidden
              rounded-[28px] border border-white/10
              bg-[#101010]/95
              shadow-[0_30px_100px_rgba(0,0,0,.55)]
              backdrop-blur-xl
              lg:grid-cols-[0.92fr_1.08fr]
            "
          >
            {/* ======================================================
                LEFT SIDE
            ====================================================== */}
            <section
              className="
                relative hidden min-h-[720px] overflow-hidden
                border-r border-white/10
                bg-[#0c0c0c]
                p-12 lg:flex lg:flex-col lg:justify-between
              "
            >
              {/* Decorative red shape */}
              <motion.div
                className="absolute -right-36 -top-36 h-[390px] w-[390px] rounded-full border border-red-500/20"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="absolute inset-12 rounded-full border border-red-500/15" />
                <div className="absolute inset-24 rounded-full border border-red-500/10" />
              </motion.div>

              <div className="relative z-10">
                <AnimatedLogo />

                <motion.div
                  className="mt-14"
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.6,
                  }}
                >
                  <span className="text-xs font-semibold tracking-[0.28em] text-red-500">
                    JOIN THE EXPERIENCE
                  </span>

                  <h1 className="mt-5 max-w-md text-4xl font-semibold leading-[1.08] tracking-[-0.04em] xl:text-5xl">
                    Your next experience
                    <span className="text-red-500"> starts here.</span>
                  </h1>

                  <p className="mt-5 max-w-md text-[15px] leading-7 text-white/45">
                    Create your account to discover experiences, reserve
                    tickets and keep everything connected in one place.
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="relative z-10 space-y-5"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                }}
              >
                {[
                  "Discover upcoming experiences",
                  "Keep your bookings organised",
                  "Enjoy a faster checkout experience",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/55"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-500">
                      <Check size={14} />
                    </span>

                    {item}
                  </div>
                ))}
              </motion.div>
            </section>

            {/* ======================================================
                RIGHT SIDE / SIGN UP FORM
            ====================================================== */}
            <section className="relative px-5 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16 xl:px-20">
              {/* Mobile logo */}
              <div className="mb-9 lg:hidden">
                <AnimatedLogo />
              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.55,
                }}
              >
                <span className="text-xs font-semibold tracking-[0.24em] text-red-500">
                  CREATE ACCOUNT
                </span>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                  Join us.
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  Enter your details below to create your account.
                </p>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="mt-9 space-y-5"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.55,
                }}
              >
                <InputField
                  icon={User}
                  label="Full name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  autoComplete="name"
                />

                <InputField
                  icon={Mail}
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  autoComplete="email"
                />

                <InputField
                  icon={Lock}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  autoComplete="new-password"
                  rightElement={
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      className="
                        absolute right-4 text-white/35
                        transition-colors hover:text-white
                      "
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  }
                />

                <div>
                  <InputField
                    icon={Lock}
                    label="Confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={(event) =>
                      updateField(
                        "confirmPassword",
                        event.target.value
                      )
                    }
                    autoComplete="new-password"
                    rightElement={
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (previous) => !previous
                          )
                        }
                        className="
                          absolute right-4 text-white/35
                          transition-colors hover:text-white
                        "
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    }
                  />

                  {!passwordsMatch && (
                    <motion.p
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-xs text-red-400"
                    >
                      The passwords do not match.
                    </motion.p>
                  )}
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setAcceptedTerms((previous) => !previous)
                    }
                    className={`
                      mt-[2px] flex h-5 w-5 shrink-0
                      items-center justify-center rounded-md
                      border transition-all duration-200
                      ${
                        acceptedTerms
                          ? "border-red-500 bg-red-600 text-white"
                          : "border-white/20 bg-white/5 text-transparent"
                      }
                    `}
                  >
                    <Check size={13} />
                  </button>

                  <span className="text-xs leading-5 text-white/40">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-white/70 transition-colors hover:text-red-500"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-white/70 transition-colors hover:text-red-500"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                {/* Create account */}
                <motion.button
                  type="submit"
                  disabled={
                    !acceptedTerms ||
                    !passwordsMatch
                  }
                  whileHover={
                    acceptedTerms && passwordsMatch
                      ? {
                          scale: 1.015,
                        }
                      : {}
                  }
                  whileTap={
                    acceptedTerms && passwordsMatch
                      ? {
                          scale: 0.985,
                        }
                      : {}
                  }
                  className="
                    group relative mt-2 flex h-14 w-full
                    items-center justify-center gap-2
                    overflow-hidden rounded-2xl
                    bg-red-600 px-6
                    text-sm font-semibold text-white
                    shadow-[0_14px_40px_rgba(220,38,38,.24)]
                    transition-all duration-300
                    hover:bg-red-500
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <span className="relative z-10">
                    Create account
                  </span>

                  <ArrowRight
                    size={17}
                    className="
                      relative z-10
                      transition-transform duration-300
                      group-hover:translate-x-1
                    "
                  />

                  <div
                    className="
                      absolute inset-y-0 -left-1/3
                      w-1/3 skew-x-[-20deg]
                      bg-white/15
                      transition-all duration-700
                      group-hover:left-[120%]
                    "
                  />
                </motion.button>
              </motion.form>

              {/* Existing account */}
              <motion.div
                className="mt-8 border-t border-white/10 pt-7 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.55,
                  duration: 0.5,
                }}
              >
                <p className="text-sm text-white/40">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="
                      font-medium text-white
                      transition-colors duration-200
                      hover:text-red-500
                    "
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </section>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
}

export default SignUp;