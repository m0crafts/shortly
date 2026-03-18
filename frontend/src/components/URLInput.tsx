import { useState } from "react";

type Props = {
  onShorten: (url: string) => void;
  loading: boolean;
};

export default function URLInput({ onShorten, loading }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onShorten(value.trim());
    setValue("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Paste a long URL here..."
        className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition text-sm sm:text-base"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 disabled:opacity-50 text-white font-medium transition text-sm sm:text-base"
      >
        {loading ? "Shortening..." : "Shorten"}
      </button>
    </div>
  );
}
