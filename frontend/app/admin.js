"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/stats`)
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <p>Total Reviews: {stats.total_reviews}</p>
      <p>Average Rating: {stats.average_rating}</p>
    </main>
  );
}
