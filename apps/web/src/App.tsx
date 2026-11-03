import { useEffect, useState } from 'react';

type Health = { ok: boolean; db: string };

export default function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then(setHealth)
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <main>
      <h1>Weather</h1>
      {error && <p>API unreachable: {error}</p>}
      {health && (
        <p>
          API: {health.ok ? 'ok' : 'not ok'} · DB: {health.db}
        </p>
      )}
      {!health && !error && <p>Checking API…</p>}
    </main>
  );
}
