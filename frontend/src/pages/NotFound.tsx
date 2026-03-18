import { useNavigate } from "react-router-dom";
import Astronaut from "../components/Astronaut";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-4">
      <Astronaut />
      <h1 className="text-white text-7xl sm:text-8xl font-black tracking-tight">404</h1>
      <p className="text-white/50 text-base sm:text-lg text-center max-w-xs">
        Looks like this link drifted off into space.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-2 px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-medium transition"
      >
        Back to Earth
      </button>
    </main>
  );
}
