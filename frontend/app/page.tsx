"use client";

import { useState } from "react";

export default function UserFeedbackPage() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitReview = async () => {
    if (!review.trim()) {
      alert("Please write a short review before submitting.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/submit-review`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, review }),
        }
      );

      setSuccess(true);
      setReview("");
    } catch (err) {
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Share Your Experience</h1>

      <p style={styles.subtitle}>
        Your feedback helps us improve. Our AI analyzes reviews to generate
        insights and recommendations.
      </p>

      <div style={styles.card}>
        <p style={styles.context}>
          You’re rating your overall experience with our platform — including
          usability, performance, and AI-generated responses.
        </p>

        <label style={styles.label}>⭐ Overall Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={styles.select}
        >
          {[
            { value: 5, label: "Excellent" },
            { value: 4, label: "Very Good" },
            { value: 3, label: "Good" },
            { value: 2, label: "Fair" },
            { value: 1, label: "Poor" },
          ].map((r) => (
            <option key={r.value} value={r.value}>
              {r.value} – {r.label}
            </option>
          ))}
        </select>

        <label style={styles.label}>📝 Your Review</label>
        <textarea
          placeholder="Tell us what you liked and what could be improved..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={styles.textarea}
        />

        <button
          onClick={submitReview}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>

        {success && (
          <p style={styles.success}>
            ✅ Thank you! Your feedback was submitted successfully.
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle at top, #111 0%, #000 60%)",
    color: "#fff",
    padding: 32,
  },

  title: {
    fontSize: 42,
    fontWeight: 800,
    marginBottom: 12,
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 18,
    opacity: 0.85,
    marginBottom: 28,
    maxWidth: 600,
    textAlign: "center" as const,
    lineHeight: 1.6,
  },

  card: {
    width: 520,
    background: "#0f0f0f",
    padding: 32,
    borderRadius: 16,
    border: "1px solid #222",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  },

  context: {
    fontSize: 14,
    opacity: 0.75,
    marginBottom: 20,
    lineHeight: 1.5,
  },

  label: {
    display: "block",
    marginBottom: 10,
    marginTop: 20,
    fontSize: 15,
    fontWeight: 600,
  },

  select: {
    width: "100%",
    padding: 14,
    fontSize: 16,
    borderRadius: 8,
    background: "#000",
    color: "#fff",
    border: "1px solid #333",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: 140,
    padding: 14,
    fontSize: 15,
    borderRadius: 8,
    background: "#000",
    color: "#fff",
    border: "1px solid #333",
    resize: "vertical" as const,
    outline: "none",
  },

  button: {
    width: "100%",
    marginTop: 24,
    padding: 16,
    fontSize: 17,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#fff",
    fontWeight: 700,
  },

  success: {
    marginTop: 18,
    color: "#22c55e",
    fontSize: 15,
    fontWeight: 500,
  },
};
