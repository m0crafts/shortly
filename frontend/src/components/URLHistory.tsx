import URLResult from "./URLResult";

type HistoryItem = {
  shortCode: string;
  originalUrl: string;
};

type Props = {
  history: HistoryItem[];
};

export default function URLHistory({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
      {history.map((item) => (
        <URLResult key={item.shortCode} shortCode={item.shortCode} originalUrl={item.originalUrl} />
      ))}
    </div>
  );
}
