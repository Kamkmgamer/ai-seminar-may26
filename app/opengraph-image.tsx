import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "AI Seminar 2026 - Bilingual Workshop Guide";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/svg+xml";

export default async function Image() {
  return new ImageResponse(
    (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={1200}
        height={630}
        viewBox="0 0 1200 630"
      >
        <rect width={1200} height={630} fill="#0f0f0f" />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#16213e" />
          </linearGradient>
        </defs>
        <rect width={1200} height={630} fill="url(#grad)" />
        <path
          d="M600 115 L480 515 L520 515 L560 355 L640 355 L680 515 L720 515 L600 115 Z"
          fill="#fafafa"
        />
        <circle cx={600} cy={290} r={40} fill="#fafafa" />
        <text
          x={600}
          y={580}
          fontFamily="system-ui, sans-serif"
          fontSize={48}
          fill="#888"
          textAnchor="middle"
        >
          AI Seminar 2026
        </text>
      </svg>
    ),
    {
      ...size,
    }
  );
}