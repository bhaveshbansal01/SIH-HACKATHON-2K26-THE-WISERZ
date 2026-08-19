"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Backend authentication later connect kar sakde ho
    alert("Login submitted successfully!");
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        {/* LEFT SIDE */}
        <div style={styles.leftSide}>
          <div style={styles.logoCircle}>✚</div>

          <h1 style={styles.brand}>MedIndia Care</h1>

          <p style={styles.tagline}>
            Your Health, Our Priority
          </p>

          <div style={styles.leftContent}>
            <h2>
              Your journey to better
              <span> health starts in India.</span>
            </h2>

            <p>
              Find trusted hospitals, expert doctors and
              affordable treatments across India.
            </p>

            <div style={styles.features}>
              <div>✓ Verified Hospitals</div>
              <div>✓ Expert Doctors</div>
              <div>✓ Affordable Treatment</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.rightSide}>
          <div style={styles.card}>

            <Link href="/" style={styles.back}>
              ← Back to Home
            </Link>

            <h1 style={styles.title}>Welcome Back</h1>

            <p style={styles.subtitle}>
              Login to your MedIndia Care account
            </p>

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <label style={styles.label}>
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                required
                style={styles.input}
              />

              {/* PASSWORD */}
              <div style={styles.passwordHeader}>
                <label style={styles.label}>
                  Password
                </label>

                <button
                  type="button"
                  style={styles.forgot}
                  onClick={() =>
                    alert("Password reset coming soon.")
                  }
                >
                  Forgot password?
                </button>
              </div>

              <div style={styles.passwordBox}>
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  required
                  style={styles.passwordInput}
                />

                <button
                  type="button"
                  style={styles.showButton}
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* REMEMBER */}
              <label style={styles.remember}>
                <input type="checkbox" />
                Remember me
              </label>

              {/* LOGIN */}
              <button
                type="submit"
                style={styles.loginButton}
              >
                Login
              </button>

            </form>

            <div style={styles.divider}>
              <span>or</span>
            </div>

            <p style={styles.signupText}>
              Don't have an account?{" "}
              <Link
                href="/signup"
                style={styles.signupLink}
              >
                Sign Up
              </Link>
            </p>

          </div>
        </div>

      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f7f3ff 0%, #ffffff 50%, #f5f0ff 100%)",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    maxWidth: "1100px",
    minHeight: "650px",
    background: "#ffffff",
    borderRadius: "25px",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    boxShadow: "0 20px 60px rgba(80, 50, 130, 0.12)",
  },

  leftSide: {
    padding: "45px",
    background:
      "linear-gradient(145deg, #c2b3d2, #ffffff)",
    position: "relative",
  },

  logoCircle: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: "2px solid #d8b4fe",
    color: "#7c3aed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    fontWeight: "bold",
  },

  brand: {
    margin: "10px 0 0",
    color: "#2563eb",
    fontSize: "27px",
  },

  tagline: {
    marginTop: "3px",
    color: "#7b8495",
    fontSize: "13px",
  },

  leftContent: {
    marginTop: "130px",
    maxWidth: "470px",
    color: "#920be7",
  },

  features: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "30px",
    color: "#374151",
    fontSize: "14px",
  },

  rightSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },

  card: {
    width: "100%",
    maxWidth: "400px",
  },

  back: {
    color: "#6d28d9",
    textDecoration: "none",
    fontSize: "14px",
  },

  title: {
    margin: "35px 0 8px",
    fontSize: "34px",
    color: "#172033",
  },

  subtitle: {
    color: "#7b8495",
    marginBottom: "30px",
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#374151",
    marginBottom: "8px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #dce1e8",
    fontSize: "14px",
    marginBottom: "20px",
    outline: "none",
  },

  passwordHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  forgot: {
    border: "none",
    background: "transparent",
    color: "#7c3aed",
    cursor: "pointer",
    fontSize: "12px",
  },

  passwordBox: {
    display: "flex",
    border: "1px solid #dce1e8",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "15px",
  },

  passwordInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "14px",
    fontSize: "14px",
  },

  showButton: {
    border: "none",
    background: "#ffffff",
    color: "#7c3aed",
    padding: "0 14px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  remember: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "22px",
  },

  loginButton: {
    width: "100%",
    border: "none",
    background: "#7c3aed",
    color: "#ffffff",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  divider: {
    textAlign: "center",
    margin: "25px 0",
    color: "#9ca3af",
    fontSize: "13px",
  },

  signupText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
  },

  signupLink: {
    color: "#7c3aed",
    fontWeight: "bold",
    textDecoration: "none",
  },
};