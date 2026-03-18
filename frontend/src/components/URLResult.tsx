import { useState } from "react";

type Props = {
  shortCode: string;
  originalUrl: string;
};

export default function URLResult({ shortCode, originalUrl }: Props) {
  const [copied, setCopied] = useState(false);
  const shortUrl = `${import.meta.env.VITE_API_URL}/${shortCode}`;
  const favicon = `https://www.google.com/s2/favicons?domain=${originalUrl}&sz=32`;

  const copy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full p-4 rounded-xl bg-white/10 border border-white/20 flex items-center gap-4">
      <img src={favicon} alt="favicon" className="w-6 h-6 rounded" />
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{shortUrl}</p>
        <p className="text-white/40 text-sm truncate">{originalUrl}</p>
      </div>
      <button
        onClick={copy}
        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
