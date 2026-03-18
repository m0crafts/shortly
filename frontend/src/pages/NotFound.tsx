import { useNavigate } from "react-router-dom";
import Astronaut from "../components/Astronaut";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center px-4">
      {/* Astronaut */}
      <Astronaut />

      <h1 className="text-white text-6xl font-black tracking-tight">404</h1>
      <p className="text-white/50 text-lg mt-3 mb-8 text-center max-w-sm">
        Looks like this link drifted off into space.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-medium transition"
      >
        Back to Earth
      </button>
    </div>
  );
}
