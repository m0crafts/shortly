import { useState } from "react";
import URLInput from "../components/URLInput";
import URLHistory from "../components/URLHistory";

type HistoryItem = {
  shortCode: string;
  originalUrl: string;
};

export default function Home() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async (url: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original_url: url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }
      setHistory((prev) => [{ shortCode: data.short_code, originalUrl: url }, ...prev]);
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 w-full">
      <div className="animated-border w-full max-w-xl">
        <div className="backdrop-blur-md bg-[#1a1740] rounded-2xl p-4 sm:p-8 flex flex-col gap-4">
          <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">Shorten a URL</h1>
          <p className="text-white/40 text-sm">Paste a long link and get a short one instantly.</p>
          <URLInput onShorten={handleShorten} loading={loading} />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <URLHistory history={history} />
        </div>
      </div>
    </main>
  );
}
