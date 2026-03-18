export default function Astronaut() {
  return (
    <div className="astronaut w-64 h-64 relative">
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        {/* Stars */}
        <circle cx="20" cy="30" r="2" fill="white" opacity="0.8" />
        <circle cx="270" cy="20" r="1.5" fill="white" opacity="0.6" />
        <circle cx="285" cy="120" r="2" fill="white" opacity="0.7" />
        <circle cx="15" cy="200" r="1.5" fill="white" opacity="0.5" />
        <circle cx="260" cy="240" r="2" fill="white" opacity="0.8" />
        <circle cx="50" cy="260" r="1.5" fill="white" opacity="0.6" />
        <circle cx="240" cy="60" r="1" fill="white" opacity="0.9" />
        <circle cx="80" cy="40" r="1" fill="white" opacity="0.7" />

        {/* Rocket trail */}
        <ellipse
          cx="80"
          cy="210"
          rx="8"
          ry="22"
          fill="#f97316"
          opacity="0.9"
          transform="rotate(-45 80 210)"
        />
        <ellipse
          cx="68"
          cy="222"
          rx="5"
          ry="16"
          fill="#fbbf24"
          opacity="0.7"
          transform="rotate(-45 68 222)"
        />
        <ellipse
          cx="58"
          cy="232"
          rx="3"
          ry="10"
          fill="#fde68a"
          opacity="0.5"
          transform="rotate(-45 58 232)"
        />

        {/* Rocket body */}
        <g transform="rotate(-45 150 150)">
          <ellipse cx="150" cy="130" rx="18" ry="35" fill="#e2e8f0" />
          {/* Rocket tip */}
          <ellipse cx="150" cy="98" rx="18" ry="22" fill="#7c3aed" />
          {/* Rocket window */}
          <circle cx="150" cy="125" r="10" fill="#7c3aed" opacity="0.85" />
          <circle cx="150" cy="125" r="7" fill="#312e81" />
          <ellipse cx="147" cy="122" rx="3" ry="2" fill="white" opacity="0.4" />
          {/* Rocket fins */}
          <polygon points="132,155 118,175 132,165" fill="#cbd5e1" />
          <polygon points="168,155 182,175 168,165" fill="#cbd5e1" />
          {/* Rocket exhaust */}
          <ellipse cx="150" cy="168" rx="10" ry="8" fill="#f97316" opacity="0.9" />
          <ellipse cx="150" cy="178" rx="7" ry="6" fill="#fbbf24" opacity="0.7" />
          <ellipse cx="150" cy="186" rx="4" ry="4" fill="#fde68a" opacity="0.5" />
        </g>

        {/* Astronaut body */}
        <g transform="translate(120, 80)">
          {/* Body */}
          <ellipse cx="50" cy="95" rx="32" ry="40" fill="#e2e8f0" />
          {/* Helmet */}
          <circle cx="50" cy="52" r="30" fill="#e2e8f0" />
          {/* Visor */}
          <circle cx="50" cy="52" r="20" fill="#7c3aed" opacity="0.85" />
          {/* Visor shine */}
          <ellipse cx="43" cy="44" rx="6" ry="4" fill="white" opacity="0.3" transform="rotate(-20 43 44)" />
          {/* Left arm - waving */}
          <ellipse cx="22" cy="88" rx="10" ry="22" fill="#e2e8f0" transform="rotate(30 22 88)" />
          <circle cx="14" cy="108" r="8" fill="#cbd5e1" />
          {/* Right arm */}
          <ellipse cx="78" cy="88" rx="10" ry="22" fill="#e2e8f0" transform="rotate(-30 78 88)" />
          <circle cx="86" cy="108" r="8" fill="#cbd5e1" />
          {/* Legs */}
          <ellipse cx="36" cy="130" rx="10" ry="18" fill="#cbd5e1" />
          <ellipse cx="64" cy="130" rx="10" ry="18" fill="#cbd5e1" />
          {/* Boots */}
          <ellipse cx="34" cy="145" rx="13" ry="6" fill="#94a3b8" />
          <ellipse cx="66" cy="145" rx="13" ry="6" fill="#94a3b8" />
          {/* Chest panel */}
          <rect x="34" y="84" width="32" height="18" rx="3" fill="#94a3b8" />
          <circle cx="50" cy="93" r="4" fill="#7c3aed" />
        </g>
      </svg>
    </div>
  );
}
