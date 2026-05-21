const logos = [
  {
    name: "Boeing",
    svg: (
      <svg viewBox="0 0 120 40" fill="currentColor" className="h-6 w-auto">
        <text x="0" y="30" fontSize="28" fontWeight="700" fontFamily="serif" letterSpacing="-1">
          BOEING
        </text>
      </svg>
    ),
  },
  {
    name: "Airbus",
    svg: (
      <svg viewBox="0 0 110 40" fill="currentColor" className="h-6 w-auto">
        <text x="0" y="30" fontSize="26" fontWeight="300" fontFamily="sans-serif" letterSpacing="2">
          AIRBUS
        </text>
      </svg>
    ),
  },
  {
    name: "Embraer",
    svg: (
      <svg viewBox="0 0 130 40" fill="currentColor" className="h-6 w-auto">
        <text x="0" y="30" fontSize="24" fontWeight="600" fontFamily="sans-serif" letterSpacing="1">
          EMBRAER
        </text>
      </svg>
    ),
  },
  {
    name: "Lockheed",
    svg: (
      <svg viewBox="0 0 180 40" fill="currentColor" className="h-6 w-auto">
        <text x="0" y="30" fontSize="22" fontWeight="500" fontFamily="sans-serif" letterSpacing="1">
          LOCKHEED
        </text>
      </svg>
    ),
  },
  {
    name: "Bombardier",
    svg: (
      <svg viewBox="0 0 200 40" fill="currentColor" className="h-6 w-auto">
        <text x="0" y="30" fontSize="22" fontWeight="400" fontFamily="sans-serif" letterSpacing="0.5">
          BOMBARDIER
        </text>
      </svg>
    ),
  },
  {
    name: "Dassault",
    svg: (
      <svg viewBox="0 0 150 40" fill="currentColor" className="h-6 w-auto">
        <text x="0" y="30" fontSize="22" fontWeight="600" fontFamily="serif" letterSpacing="1">
          DASSAULT
        </text>
      </svg>
    ),
  },
  {
    name: "Gulfstream",
    svg: (
      <svg viewBox="0 0 190 40" fill="currentColor" className="h-6 w-auto">
        <text x="0" y="30" fontSize="20" fontWeight="400" fontFamily="sans-serif" letterSpacing="2">
          GULFSTREAM
        </text>
      </svg>
    ),
  },
  {
    name: "Cessna",
    svg: (
      <svg viewBox="0 0 130 40" fill="currentColor" className="h-6 w-auto">
        <text x="0" y="30" fontSize="24" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.5">
          CESSNA
        </text>
      </svg>
    ),
  },
];

function LogoMarquee() {
  const repeated = [...logos, ...logos];

  return (
    <div className="w-full border-y border-gray-200 bg-[var(--azul-escuro)] py-6 overflow-hidden">
      <p className="text-center text-xs font-semibold tracking-widest uppercase text-gray-400 mb-5">Utilizado por líderes da indústria aeronáutica</p>

      <div className="relative">
        <div className="flex gap-16 w-max" style={{ animation: "marquee 28s linear infinite" }}>
          {repeated.map((logo, i) => (
            <div key={i} className="flex items-center text-white hover:text-gray-500 transition-colors duration-300 select-none cursor-default shrink-0">
              {logo.svg}
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--azul-escuro)] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--azul-escuro)] pointer-events-none z-10" />
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default LogoMarquee;
