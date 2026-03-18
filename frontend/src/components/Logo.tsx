export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Icon */}
      <svg width="36" height="33" viewBox="0 0 153 141" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M68.25 117.26l55.13-55.48 27.91-28.09a22 22 0 0 0 1.84-8.88c0-13.52-12.4-24.52-27.81-24.81H58.76a28.59 28.59 0 0 0-29 28.22V106a27.36 27.36 0 0 0 24.38 15.31 26.61 26.61 0 0 0 14.11-4.05z"
          fill="#e62c5a"
          opacity=".8"
        />
        <path
          d="M123.33 113V35.22A27.35 27.35 0 0 0 99 19.91a26.65 26.65 0 0 0-14.08 4L29.74 79.39l-27.9 28.16A22.18 22.18 0 0 0 0 116.38c0 13.51 12.39 24.5 27.79 24.79h66.6A28.58 28.58 0 0 0 123.33 113z"
          fill="#0fabf6"
          opacity=".8"
        />
        <path
          d="M84.87 23.91L29.74 79.39V106a27.35 27.35 0 0 0 24.38 15.31 26.72 26.72 0 0 0 14.07-4l55.13-55.48V35.22A27.35 27.35 0 0 0 99 19.91a26.65 26.65 0 0 0-14.13 4z"
          fill="#501b8d"
          opacity=".5"
        />
      </svg>

      {/* Text */}
      <span className="text-white font-bold text-xl tracking-wide">Shortly</span>
    </div>
  );
}
