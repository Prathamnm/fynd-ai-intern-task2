"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backend) {
      setError("Backend URL not configured");
      setLoading(false);
      return;
    }

    fetch(`${backend}/admin/stats`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Backend not reachable");
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Admin Dashboard</h1>

      {loading && <p style={styles.info}>Loading analytics...</p>}

      {error && <p style={styles.error}>❌ {error}</p>}

      {stats && (
        <div style={styles.card}>
          <div style={styles.stat}>
            <span style={styles.label}>Total Reviews</span>
            <span style={styles.value}>{stats.total_reviews}</span>
          </div>

          <div style={styles.stat}>
            <span style={styles.label}>Average Rating</span>
            <span style={styles.value}>⭐ {stats.average_rating}</span>
          </div>
        </div>
      )}

      <p style={styles.footer}>Fynd AI Intern Task 2</p>
    </div>
  );
}
const styles: any = {
  container: {
    padding: 60,
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#e5e7eb",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    fontSize: 42,
    marginBottom: 40,
    fontWeight: 700,
  },
  info: {
    fontSize: 18,
    color: "#93c5fd",
  },
  error: {
    fontSize: 18,
    color: "#f87171",
    fontWeight: 600,
  },
  card: {
    backgroundColor: "#020617",
    padding: 40,
    borderRadius: 18,
    maxWidth: 560,
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  },
  stat: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  label: {
    fontSize: 18,
    color: "#94a3b8",
  },
  value: {
    fontSize: 34,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 60,
    fontSize: 14,
    color: "#64748b",
  },
};
