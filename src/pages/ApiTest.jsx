
import { useState } from "react";

import PageTransition from "../components/PageTransition";
import { checkApiHealth } from "../services/api";

function ApiTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const testConnection = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await checkApiHealth();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the API."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="account-page">
        <div
          className="login-card"
          style={{ width: "100%", maxWidth: 520 }}
        >
          <span className="section-label">
            RAYBOOK DEVELOPMENT
          </span>

          <h2>Frontend ↔ Backend</h2>

          <p>
            Let's check whether React can communicate
            with our FastAPI server.
          </p>

          <button
            type="button"
            className="login-button"
            onClick={testConnection}
            disabled={loading}
          >
            {loading
              ? "Connecting..."
              : "Test API Connection"}
          </button>

          {result && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ color: "#168a50" }}>
                Connection successful!
              </h3>

              <pre
                style={{
                  padding: 18,
                  borderRadius: 12,
                  background: "#f5f5f5",
                  overflowX: "auto",
                  fontSize: 12,
                }}
              >
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          {error && (
            <p
              role="alert"
              style={{
                marginTop: 20,
                color: "#c2182b",
              }}
            >
              Connection failed: {error}
            </p>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

export default ApiTest;
