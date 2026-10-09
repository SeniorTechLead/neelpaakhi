import { useState, useEffect, useRef } from "react";

const P = {
  river: "#1a3a4a", riverLight: "#3a7a8a", bamboo: "#4a6741", bambooLight: "#7aaa6e",
  terracotta: "#c4714a", terracottaLight: "#d4956e", cream: "#f5f0e8", sand: "#e8dcc8",
  gold: "#b8943e", goldLight: "#d4b85e", charcoal: "#1a1a1a", warm: "#2a2420",
  deep: "#0d1b1e", text: "#f5f0e8", muted: "#a09888",
};

const font = {
  display: "'Playfair Display', 'Georgia', serif",
  body: "'DM Sans', 'Helvetica Neue', sans-serif",
  accent: "'Cormorant Garamond', 'Georgia', serif",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, y = 40, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

/* ── SVG Illustrations (matching hero art style) ── */

function BoundaryCottageSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a3a"/>
          <stop offset="60%" stopColor="#2a4a5a"/>
          <stop offset="100%" stopColor="#3a5a4a"/>
        </linearGradient>
        <radialGradient id="bc-glow" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#d4b85e" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#d4b85e" stopOpacity="0"/>
        </radialGradient>
        <pattern id="bc-bamboo" width="6" height="30" patternUnits="userSpaceOnUse">
          <line x1="2" y1="0" x2="2" y2="30" stroke="#6b8f5e" strokeWidth="0.4" opacity="0.25"/>
          <line x1="4.5" y1="0" x2="4.5" y2="30" stroke="#4a6741" strokeWidth="0.3" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#bc-sky)"/>
      {/* Stars */}
      {[[40,25,1],[120,18,0.8],[200,30,1.2],[300,15,0.7],[350,35,0.9]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.5"/>
      )}
      {/* Treeline */}
      <path d="M0,120 Q50,100 100,115 Q150,95 200,110 Q250,100 300,115 Q350,105 400,120 L400,160 L0,160Z" fill="#2a4a3a" opacity="0.5"/>
      {/* Ground */}
      <path d="M0,200 Q100,195 200,198 Q300,193 400,200 L400,300 L0,300Z" fill="#1a2a1a" opacity="0.7"/>
      {/* Trail (walking path behind cottage) */}
      <rect x="0" y="188" width="400" height="14" fill="#8a7a6a" opacity="0.08" rx="2"/>
      <path d="M0,195 Q100,193 200,195 Q300,193 400,195" fill="none" stroke="#f5f0e8" strokeWidth="0.3" opacity="0.15"/>
      {/* Trees behind */}
      {[[80,140],[140,130],[310,135],[360,138]].map(([cx,cy],i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx} y2={cy+55} stroke="#5a4a3a" strokeWidth="2" opacity="0.4"/>
          <ellipse cx={cx} cy={cy-5} rx={12} ry={16} fill="#3a5a3a" opacity="0.4"/>
        </g>
      ))}
      {/* Main cottage — A-frame */}
      <g transform="translate(200, 120)">
        {/* Foundation / platform */}
        <rect x="-55" y="68" width="110" height="6" fill="#6a5a4a" opacity="0.8" rx="1"/>
        {/* Walls */}
        <rect x="-45" y="20" width="90" height="50" fill="#3a2a1a" opacity="0.9" rx="1"/>
        <rect x="-45" y="20" width="90" height="50" fill="url(#bc-bamboo)" opacity="0.25"/>
        {/* A-frame roof */}
        <path d="M-58,22 L0,-25 L58,22" fill="#5a4a3a" opacity="0.9"/>
        <path d="M-58,22 L0,-25 L58,22" fill="none" stroke="#4a6741" strokeWidth="1" opacity="0.4"/>
        {/* Blue tin roof accent */}
        <path d="M-52,20 L0,-20 L52,20" fill="#3a6a8a" opacity="0.25"/>
        {/* Window glow */}
        <rect x="-15" y="35" width="12" height="16" fill="#d4b85e" opacity="0.12" rx="1"/>
        <rect x="5" y="35" width="12" height="16" fill="#d4b85e" opacity="0.08" rx="1"/>
        {/* Door */}
        <rect x="-5" y="42" width="10" height="28" fill="#d4b85e" opacity="0.1" rx="1"/>
        {/* Back porch (overhangs trail — behind cottage, shown as extension) */}
        <rect x="-50" y="68" width="100" height="10" fill="#4a6741" opacity="0.15"/>
        <text x="0" y="76" textAnchor="middle" fill="#7aaa6e" fontSize="5" fontFamily="'DM Sans', sans-serif" opacity="0.5">4ft back porch → trail</text>
        {/* Verandah (front, facing viewer) */}
        <rect x="-48" y="8" width="96" height="14" fill="#d4b85e" opacity="0.08"/>
        <text x="0" y="17" textAnchor="middle" fill="#d4b85e" fontSize="5" fontFamily="'DM Sans', sans-serif" opacity="0.4">5ft verandah</text>
      </g>
      {/* Warm glow overlay */}
      <rect width="400" height="300" fill="url(#bc-glow)"/>
      {/* Stepping stones between */}
      {[[100,230],[120,235],[260,228],[280,233]].map(([cx,cy],i) =>
        <ellipse key={i} cx={cx} cy={cy} rx={5} ry={2} fill="#8a7a6a" opacity="0.12"/>
      )}
    </svg>
  );
}

function CampfireCottageSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cf-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2030"/>
          <stop offset="50%" stopColor="#2a3a4a"/>
          <stop offset="100%" stopColor="#1a2a2a"/>
        </linearGradient>
        <radialGradient id="cf-fireglow" cx="50%" cy="70%" r="40%">
          <stop offset="0%" stopColor="#d4956e" stopOpacity="0.2"/>
          <stop offset="50%" stopColor="#c4714a" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#c4714a" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#cf-sky)"/>
      {/* Stars */}
      {[[30,20,1.2],[80,35,0.7],[150,12,1],[240,25,0.9],[310,18,1.1],[370,30,0.6],[180,40,0.5]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.6"/>
      )}
      {/* Ground */}
      <path d="M0,180 Q100,175 200,178 Q300,173 400,180 L400,300 L0,300Z" fill="#1a2a1a" opacity="0.7"/>
      {/* Two cottages flanking */}
      {[[-1,130],[1,320]].map(([side, tx], ci) => (
        <g key={ci} transform={`translate(${tx}, 110)`}>
          <rect x="-30" y="15" width="60" height="38" fill="#3a2a1a" opacity="0.8" rx="1"/>
          <path d={`M-38,17 L0,-10 L38,17`} fill="#5a4a3a" opacity="0.85"/>
          <path d={`M-34,16 L0,-7 L34,16`} fill="#3a6a8a" opacity="0.2"/>
          <rect x="-5" y="30" width="10" height="23" fill="#d4b85e" opacity="0.1" rx="1"/>
          <rect x="-28" y="52" width="56" height="4" fill="#6a5a4a" opacity="0.5" rx="1"/>
        </g>
      ))}
      {/* Campfire in center */}
      <g transform="translate(200, 210)">
        {/* Stone ring */}
        {[[-14,4],[-10,7],[0,8],[10,7],[14,4],[10,1],[0,0],[-10,1]].map(([cx,cy],i) =>
          <circle key={i} cx={cx} cy={cy} r={3} fill="#6a5a4a" opacity="0.5"/>
        )}
        {/* Fire glow */}
        <ellipse cx="0" cy="0" rx="30" ry="18" fill="#d4b85e" opacity="0.05"/>
        <ellipse cx="0" cy="-2" rx="14" ry="10" fill="#c4714a" opacity="0.12"/>
        {/* Flames */}
        <path d="M-5,2 Q-7,-10 -3,-18 Q0,-12 3,-18 Q7,-10 5,2Z" fill="#d4956e" opacity="0.6"/>
        <path d="M-3,1 Q-4,-7 0,-14 Q4,-7 3,1Z" fill="#d4b85e" opacity="0.5"/>
        <path d="M-1,0 Q0,-6 1,0Z" fill="#f5f0e8" opacity="0.4"/>
        {/* Seated figures */}
        <g transform="translate(-35, -8)" opacity="0.5">
          <ellipse cx="0" cy="8" rx="5" ry="2" fill="#5a4a3a" opacity="0.5"/>
          <path d="M-3,3 Q-3,-3 -1,-8 L2,-8 Q4,-3 3,3Z" fill="#1a1a12"/>
          <ellipse cx="0.5" cy="-11" rx="3" ry="3.5" fill="#1a1a12"/>
        </g>
        <g transform="translate(35, -6)" opacity="0.45">
          <ellipse cx="0" cy="8" rx="5" ry="2" fill="#5a4a3a" opacity="0.5"/>
          <path d="M-3,3 Q-3,-3 -1,-8 L2,-8 Q4,-3 3,3Z" fill="#1a1a12"/>
          <ellipse cx="0.5" cy="-11" rx="3" ry="3.5" fill="#1a1a12"/>
        </g>
        {/* Guitar player */}
        <g transform="translate(-55, -10)" opacity="0.4">
          <path d="M-3,3 Q-3,-3 -1,-8 L2,-8 Q4,-3 3,3Z" fill="#1a1a12"/>
          <ellipse cx="0.5" cy="-11" rx="3" ry="3.5" fill="#1a1a12"/>
          <ellipse cx="7" cy="-1" rx="4" ry="5" fill="#3a2a1a" opacity="0.7"/>
          <line x1="4" y1="-6" x2="-6" y2="-14" stroke="#3a2a1a" strokeWidth="1.2"/>
        </g>
      </g>
      {/* Fire glow overlay */}
      <rect width="400" height="300" fill="url(#cf-fireglow)"/>
    </svg>
  );
}

function RestaurantSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="rs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a3a"/>
          <stop offset="60%" stopColor="#2a3a4a"/>
          <stop offset="100%" stopColor="#1a2a2a"/>
        </linearGradient>
        <radialGradient id="rs-warm" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#d4b85e" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#d4b85e" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#rs-sky)"/>
      {/* Stars */}
      {[[60,20,0.8],[140,30,1],[250,15,0.7],[340,28,0.9]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.4"/>
      )}
      {/* Bamboo pergola structure */}
      <g transform="translate(0, 60)">
        {/* Vertical bamboo pillars */}
        {[40,120,200,280,360].map(x =>
          <rect key={x} x={x-2} y="40" width="4" height="140" fill="#6a5a4a" opacity="0.6" rx="1"/>
        )}
        {/* Pergola roof beams */}
        <rect x="30" y="35" width="340" height="8" fill="#3a5a4a" opacity="0.7" rx="2"/>
        <rect x="35" y="30" width="330" height="6" fill="#4a6741" opacity="0.5" rx="1"/>
        {/* Cross beams */}
        {[60,100,140,180,220,260,300,340].map(x =>
          <rect key={x} x={x} y="36" width="2" height="6" fill="#5a7a5a" opacity="0.3"/>
        )}
        {/* String lights */}
        <path d="M50,42 Q70,48 90,42 Q110,48 130,42 Q150,48 170,42 Q190,48 210,42 Q230,48 250,42 Q270,48 290,42 Q310,48 330,42 Q350,48 370,42" fill="none" stroke="#d4b85e" strokeWidth="0.5" opacity="0.4"/>
        {[70,110,150,190,230,270,310,350].map((cx,i) =>
          <circle key={cx} cx={cx} cy="46" r="2" fill="#d4b85e" opacity={0.5 + (i%3)*0.15}/>
        )}
        {/* Warm light spill on ground */}
        <rect x="40" y="80" width="320" height="90" fill="#d4b85e" opacity="0.04"/>
        {/* Dining tables */}
        {[[90,120,22,12],[160,115,26,14],[240,118,24,12],[310,122,22,10]].map(([x,y,w,h],i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx="2" fill="#4a3a2a" opacity="0.4"/>
            <rect x={x+2} y={y+2} width={w-4} height={h-4} rx="1" fill="#d4b85e" opacity="0.03"/>
          </g>
        ))}
        {/* Music stage (left) */}
        <rect x="40" y="140" width="50" height="30" fill="#5a4a3a" opacity="0.6" rx="1"/>
        <rect x="38" y="137" width="54" height="5" fill="#6b8f5e" opacity="0.4" rx="1"/>
        {/* Acoustic canopy over stage */}
        <path d="M35,125 Q65,112 95,125" fill="none" stroke="#6b8f5e" strokeWidth="1.5" opacity="0.4"/>
        {/* Musician */}
        <g transform="translate(62, 148)" opacity="0.5" fill="#1a1a12">
          <ellipse cx="0" cy="-10" rx="3.5" ry="4"/>
          <path d="M-4,-6 L-5,6 L5,6 L4,-6Z"/>
          <ellipse cx="6" cy="0" rx="4.5" ry="5.5" fill="#3a2a1a" opacity="0.7"/>
          <line x1="3" y1="-7" x2="10" y2="4" stroke="#3a2a1a" strokeWidth="1"/>
        </g>
      </g>
      {/* Ground */}
      <path d="M0,240 L400,240 L400,300 L0,300Z" fill="#1a2a1a" opacity="0.5"/>
      {/* Warm overlay */}
      <rect width="400" height="300" fill="url(#rs-warm)"/>
    </svg>
  );
}

function BarCampfireSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bar-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2030"/>
          <stop offset="100%" stopColor="#2a3a3a"/>
        </linearGradient>
        <radialGradient id="bar-glow" cx="65%" cy="55%" r="45%">
          <stop offset="0%" stopColor="#d4b85e" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#d4b85e" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bar-sky)"/>
      {/* Stars */}
      {[[50,15,1],[130,28,0.7],[220,10,1.1],[320,22,0.8],[380,32,0.6]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.5"/>
      )}
      {/* Bamboo bar counter (wraparound, viewed from front) */}
      <g transform="translate(0, 80)">
        {/* Back wall / shelving */}
        <rect x="180" y="20" width="200" height="100" fill="#2a2a22" opacity="0.7" rx="1"/>
        {/* Bottle shelves */}
        {[40,65,90].map(y => (
          <g key={y}>
            <rect x="190" y={y} width="180" height="2" fill="#6a5a4a" opacity="0.4"/>
            {[200,220,240,260,280,300,320,340,350].map((bx,i) =>
              <rect key={i} x={bx} y={y-12} width={4} height={12} fill="#d4b85e" opacity={0.05 + (i%3)*0.03} rx="0.5"/>
            )}
          </g>
        ))}
        {/* Bar counter */}
        <rect x="50" y="115" width="330" height="10" fill="#5a4a3a" opacity="0.8" rx="2"/>
        <rect x="55" y="117" width="320" height="5" fill="#d4b85e" opacity="0.04"/>
        {/* Bar stools */}
        {[90,140,190,240,290,340].map(x => (
          <g key={x}>
            <rect x={x-3} y="126" width="6" height="20" fill="#4a3a2a" opacity="0.5" rx="1"/>
            <rect x={x-6} y="124" width="12" height="4" fill="#5a4a3a" opacity="0.6" rx="1"/>
          </g>
        ))}
        {/* Warm lights above bar */}
        {[100,160,220,280,340].map((cx,i) =>
          <circle key={cx} cx={cx} cy="18" r="2.5" fill="#d4b85e" opacity={0.3 + (i%2)*0.1}/>
        )}
      </g>
      {/* Courtyard view through opening */}
      <rect x="20" y="100" width="130" height="80" fill="#1a2a2a" opacity="0.3" rx="2"/>
      {/* Jacaranda tree silhouette through opening */}
      <g transform="translate(80, 100)" opacity="0.3">
        <path d="M0,60 Q-1,40 0,20 Q1,5 3,-5" fill="none" stroke="#5a4a3a" strokeWidth="2"/>
        <ellipse cx="3" cy="-10" rx="20" ry="14" fill="#3a5a3a" opacity="0.5"/>
      </g>
      {/* Ground */}
      <rect x="0" y="250" width="400" height="50" fill="#1a2a1a" opacity="0.5"/>
      <rect width="400" height="300" fill="url(#bar-glow)"/>
    </svg>
  );
}

function YogaDeckSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="yd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3a5a"/>
          <stop offset="40%" stopColor="#4a6a7a"/>
          <stop offset="70%" stopColor="#d4956e"/>
          <stop offset="100%" stopColor="#b8943e"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#yd-sky)"/>
      {/* Distant hills */}
      <path d="M0,160 Q100,140 200,155 Q300,135 400,150 L400,180 L0,180Z" fill="#2a4a3a" opacity="0.4"/>
      {/* Paddy field lines */}
      <g opacity="0.15" stroke="#6b8f5e" strokeWidth="0.5" fill="none">
        <path d="M0,175 Q100,170 200,174 Q300,168 400,173"/>
        <path d="M0,182 Q100,178 200,181 Q300,176 400,180"/>
      </g>
      {/* Deck platform */}
      <g transform="translate(60, 170)">
        <rect x="0" y="0" width="280" height="80" fill="#5a4a3a" opacity="0.3" rx="2"/>
        {/* Bamboo deck planks */}
        {[0,8,16,24,32,40,48,56,64,72].map(y =>
          <line key={y} x1="5" y1={y+3} x2="275" y2={y+3} stroke="#6a5a4a" strokeWidth="0.5" opacity="0.3"/>
        )}
        {/* Pillars */}
        {[10,140,270].map(x =>
          <rect key={x} x={x-2} y="-5" width="4" height="90" fill="#5a4a3a" opacity="0.4" rx="1"/>
        )}
        {/* Yoga figure (simplified) */}
        <g transform="translate(140, 20)" opacity="0.5" fill="#1a1a12">
          {/* Seated meditation pose */}
          <ellipse cx="0" cy="-18" rx="4" ry="5"/>
          <path d="M-6,-12 Q-8,-4 -12,0 L12,0 Q8,-4 6,-12Z"/>
          <ellipse cx="0" cy="2" rx="14" ry="4" opacity="0.3"/>
          {/* Arms extended */}
          <line x1="-6" y1="-10" x2="-16" y2="-5" stroke="#1a1a12" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="6" y1="-10" x2="16" y2="-5" stroke="#1a1a12" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      </g>
      {/* Sun glow */}
      <circle cx="200" cy="130" r="25" fill="#d4b85e" opacity="0.15"/>
      <circle cx="200" cy="130" r="12" fill="#f5f0e8" opacity="0.3"/>
      {/* Ground */}
      <rect x="0" y="260" width="400" height="40" fill="#1a2a1a" opacity="0.6"/>
    </svg>
  );
}

function PlungePoolSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a3a"/>
          <stop offset="70%" stopColor="#2a4a5a"/>
          <stop offset="100%" stopColor="#2a3a3a"/>
        </linearGradient>
        <linearGradient id="pp-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a7a8a" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#1a3a4a" stopOpacity="0.6"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#pp-sky)"/>
      {/* Foliage backdrop */}
      {[[60,100,25,18],[120,90,30,22],[300,95,28,20],[350,105,22,16]].map(([cx,cy,rx,ry],i) =>
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#3a5a3a" opacity="0.4"/>
      )}
      {/* Tropical plants */}
      {[[40,120],[160,100],[340,115]].map(([cx,cy],i) => (
        <g key={i} opacity="0.4">
          <path d={`M${cx},${cy+40} Q${cx-5},${cy+10} ${cx-15},${cy-5}`} fill="none" stroke="#4a6741" strokeWidth="1.5"/>
          <path d={`M${cx},${cy+40} Q${cx+3},${cy+15} ${cx+12},${cy}`} fill="none" stroke="#3a5a3a" strokeWidth="1.5"/>
          <ellipse cx={cx-12} cy={cy-5} rx="8" ry="4" fill="#4a6741" opacity="0.5" transform={`rotate(-20,${cx-12},${cy-5})`}/>
          <ellipse cx={cx+10} cy={cy} rx="7" ry="3.5" fill="#3a5a3a" opacity="0.5" transform={`rotate(15,${cx+10},${cy})`}/>
        </g>
      ))}
      {/* Pool */}
      <g transform="translate(80, 140)">
        {/* Deck surround */}
        <rect x="-15" y="-10" width="270" height="110" fill="#5a4a3a" opacity="0.25" rx="3"/>
        {/* Water */}
        <rect x="0" y="0" width="240" height="80" fill="url(#pp-water)" rx="4"/>
        <rect x="0" y="0" width="240" height="80" fill="none" stroke="#3a7a8a" strokeWidth="1.5" opacity="0.4" rx="4"/>
        {/* Water ripples */}
        <path d="M20,30 Q60,25 100,30 Q140,25 180,30 Q200,25 220,30" fill="none" stroke="#f5f0e8" strokeWidth="0.4" opacity="0.12"/>
        <path d="M30,50 Q70,45 110,50 Q150,45 190,50 Q210,47 220,50" fill="none" stroke="#f5f0e8" strokeWidth="0.3" opacity="0.08"/>
        {/* Lounger */}
        <rect x="245" y="15" width="8" height="28" fill="#6a5a4a" opacity="0.3" rx="1"/>
        <rect x="245" y="50" width="8" height="28" fill="#6a5a4a" opacity="0.3" rx="1"/>
      </g>
      {/* Ground */}
      <rect x="0" y="260" width="400" height="40" fill="#1a2a1a" opacity="0.5"/>
    </svg>
  );
}

function CampfireCircleSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1520"/>
          <stop offset="100%" stopColor="#1a2a2a"/>
        </linearGradient>
        <radialGradient id="cc-glow" cx="50%" cy="65%" r="35%">
          <stop offset="0%" stopColor="#d4956e" stopOpacity="0.15"/>
          <stop offset="60%" stopColor="#c4714a" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="#c4714a" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#cc-sky)"/>
      {/* Many stars */}
      {[[20,15,1.2],[65,30,0.6],[110,10,0.9],[155,25,0.7],[200,8,1.4],[245,20,0.8],[290,12,1],[335,28,0.6],[380,18,0.9],[50,45,0.5],[170,38,0.7],[320,40,0.8]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.6"/>
      )}
      {/* Ground */}
      <path d="M0,170 Q100,165 200,168 Q300,163 400,170 L400,300 L0,300Z" fill="#1a2a1a" opacity="0.6"/>
      {/* Cottage silhouettes in background */}
      {[[80,140,30],[320,145,28]].map(([cx,cy,w],i) => (
        <g key={i} opacity="0.25">
          <rect x={cx-w/2} y={cy} width={w} height={20} fill="#2a2a1a"/>
          <path d={`M${cx-w/2-4},${cy+2} L${cx},${cy-12} L${cx+w/2+4},${cy+2}`} fill="#3a3a2a"/>
        </g>
      ))}
      {/* Campfire */}
      <g transform="translate(200, 200)">
        {/* Stone ring */}
        {[[-16,5],[-12,8],[-4,10],[4,10],[12,8],[16,5],[12,1],[4,-1],[-4,-1],[-12,1]].map(([cx,cy],i) =>
          <circle key={i} cx={cx} cy={cy} r={3.5} fill="#6a5a4a" opacity="0.5"/>
        )}
        {/* Warm ground glow */}
        <ellipse cx="0" cy="2" rx="40" ry="20" fill="#d4b85e" opacity="0.04"/>
        <ellipse cx="0" cy="0" rx="20" ry="12" fill="#c4714a" opacity="0.1"/>
        {/* Flames */}
        <path d="M-6,3 Q-9,-12 -4,-22 Q-1,-15 3,-22 Q8,-12 6,3Z" fill="#d4956e" opacity="0.6"/>
        <path d="M-4,2 Q-5,-8 0,-16 Q5,-8 4,2Z" fill="#d4b85e" opacity="0.5"/>
        <path d="M-2,1 Q0,-8 2,1Z" fill="#f5f0e8" opacity="0.4"/>
        {/* Seated people around fire */}
        {[[-45,-10],[-30,-18],[30,-18],[45,-10],[-40,10],[40,10]].map(([px,py],i) => (
          <g key={i} transform={`translate(${px}, ${py})`} opacity={0.3 + (i%2)*0.1}>
            <path d="M-3,3 Q-3,-3 -1,-8 L2,-8 Q4,-3 3,3Z" fill="#1a1a12"/>
            <ellipse cx="0.5" cy="-11" rx="3" ry="3.5" fill="#1a1a12"/>
          </g>
        ))}
      </g>
      {/* Fire glow overlay */}
      <rect width="400" height="300" fill="url(#cc-glow)"/>
    </svg>
  );
}

const rooms = [
  { name: "Boundary Cottage", size: "297 sq ft", count: 11, type: "boundary",
    desc: "A-frame bamboo cottage with woven walls, rain shower, and 5ft open verandah facing the courtyard. 4ft back porch overhangs the walking trail \u2014 shade for morning walkers, privacy for you. Handwoven Assamese cotton bedlinen. Morning birdsong is your alarm.",
    price: "4,500\u20135,500" },
  { name: "Campfire Cottage", size: "204 sq ft", count: 4, type: "campfire",
    desc: "Compact bamboo retreat with the campfire just steps from your verandah. Rain shower, Muga silk accents, and the sound of crackling fire and acoustic guitar drifting through the night air. Cozy fireside living.",
    price: "4,500\u20135,500" },
];

const musicSchedule = [
  { day: "Xomoy Fridays", desc: "Assamese folk night. Jayanta Hazarika tributes, Bhupen da classics, Bihu rhythms around the fire. Local artists and guest musicians.", icon: "\u{1F3B6}" },
  { day: "Purano Din Saturdays", desc: "Bengali evening by candlelight. Rabindrasangeet, Hemanta Mukherjee covers, Manna Dey, Nachiketa, Anjan Dutt. Tagore set to acoustic guitar.", icon: "\u{1F56F}\uFE0F" },
  { day: "Pahadi Sundays", desc: "Nepali and Naga hill songs. Narayan Gopal classics, Alobo Naga covers, Tetseo Sisters\u2013style folk harmonies. New-age Northeast indie. Acoustic and intimate.", icon: "\u26F0\uFE0F" },
];

const dailyMusic = [
  { time: "Morning", icon: "\u{1F305}", desc: "Soft Assamese folk \u2014 Jayanta Hazarika melodies, Zubeen Garg acoustic covers, Bhupen Hazarika classics" },
  { time: "Afternoon", icon: "\u2600\uFE0F", desc: "Instrumental sitar, flute, lo-fi Nepali ballads, Jayanta Hazarika deep cuts" },
  { time: "Evening", icon: "\u{1F306}", desc: "Live acoustic \u2014 Jayanta Hazarika favourites, old Hindi covers, Bengali classics, campfire requests" },
  { time: "Night", icon: "\u{1F319}", desc: "Campfire jams \u2014 Nepali, Naga, Assamese, Hindi soul. Guest requests." },
];

export default function NeelPaakhiWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState(null);
  const [subMsg, setSubMsg] = useState("");
  const [mobile, setMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSubscribe = async () => {
    if (!email) return;
    setSubStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubStatus("success");
        setSubMsg(data.message);
        setEmail("");
      } else {
        setSubStatus("error");
        setSubMsg(data.error);
      }
    } catch {
      setSubStatus("error");
      setSubMsg("Connection failed. Please try again.");
    }
  };

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = 1 + scrollY * 0.0003;

  return (
    <div style={{ fontFamily: font.body, background: P.deep, color: P.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${P.gold}44; color: ${P.cream}; }
        @keyframes breathe { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes drift { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes line { from { width: 0; } to { width: 80px; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 32px",
        background: scrollY > 100 ? `${P.deep}ee` : "transparent",
        backdropFilter: scrollY > 100 ? "blur(12px)" : "none",
        transition: "all 0.5s ease",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{ fontFamily: font.accent, fontSize: 22, fontWeight: 300, letterSpacing: 3, color: P.gold }}>
            NEEL PAAKHI
          </div>
          <div style={{ fontFamily: font.accent, fontSize: 9, letterSpacing: 4, color: P.muted, marginTop: -2 }}>
            THE AZURE FEATHER
          </div>
        </div>
        {mobile ? (
          <div style={{ cursor: "pointer", padding: 8 }} onClick={() => setMenuOpen(!menuOpen)}>
            <div style={{ width: 22, height: 2, background: P.gold, marginBottom: 5, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <div style={{ width: 22, height: 2, background: P.gold, marginBottom: 5, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 2, background: P.gold, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </div>
        ) : (
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {["Story", "Rooms", "Dining", "Wellness", "Music", "Visit"].map((s) => (
              <span key={s} onClick={() => scrollTo(s.toLowerCase())} style={{
                fontFamily: font.body, fontSize: 11, letterSpacing: 2, color: P.muted,
                cursor: "pointer", textTransform: "uppercase", fontWeight: 400,
                transition: "color 0.3s", borderBottom: "1px solid transparent",
              }}
              onMouseEnter={(e) => { e.target.style.color = P.gold; e.target.style.borderBottomColor = P.gold; }}
              onMouseLeave={(e) => { e.target.style.color = P.muted; e.target.style.borderBottomColor = "transparent"; }}
              >{s}</span>
            ))}
            <span onClick={() => window.location.href = "/masterplan"} style={{
              fontFamily: font.body, fontSize: 11, letterSpacing: 2, color: P.muted,
              cursor: "pointer", textTransform: "uppercase", fontWeight: 400,
              transition: "color 0.3s", borderBottom: "1px solid transparent",
            }}
            onMouseEnter={(e) => { e.target.style.color = P.gold; e.target.style.borderBottomColor = P.gold; }}
            onMouseLeave={(e) => { e.target.style.color = P.muted; e.target.style.borderBottomColor = "transparent"; }}
            >Master Plan</span>
            <span onClick={() => scrollTo("book")} style={{
              fontFamily: font.body, fontSize: 11, letterSpacing: 2,
              padding: "8px 20px", border: `1px solid ${P.gold}`, color: P.gold,
              cursor: "pointer", transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { e.target.style.background = P.gold; e.target.style.color = P.deep; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = P.gold; }}
            >RESERVE</span>
          </div>
        )}
      </nav>

      {/* MOBILE MENU */}
      {mobile && menuOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, bottom: 0, zIndex: 99,
          background: `${P.deep}f5`, backdropFilter: "blur(16px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
        }}>
          {["Story", "Rooms", "Dining", "Wellness", "Music", "Visit"].map((s) => (
            <span key={s} onClick={() => scrollTo(s.toLowerCase())} style={{
              fontFamily: font.accent, fontSize: 22, letterSpacing: 3, color: P.cream,
              cursor: "pointer",
            }}>{s}</span>
          ))}
          <span onClick={() => window.location.href = "/masterplan"} style={{
            fontFamily: font.accent, fontSize: 22, letterSpacing: 3, color: P.cream,
            cursor: "pointer",
          }}>Master Plan</span>
          <span onClick={() => scrollTo("book")} style={{
            fontFamily: font.body, fontSize: 13, letterSpacing: 3,
            padding: "12px 32px", border: `1px solid ${P.gold}`, color: P.gold,
            cursor: "pointer", marginTop: 16,
          }}>RESERVE</span>
        </div>
      )}

      {/* HERO */}
      <section style={{
        height: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1,
      }}>
        {/* ARCHITECTURAL ILLUSTRATION BACKGROUND */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          transform: `scale(${heroScale})`,
        }}>
          <svg viewBox="0 0 1600 900" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a2a3a"/>
                <stop offset="30%" stopColor="#2a4a5a"/>
                <stop offset="55%" stopColor="#4a7a6a"/>
                <stop offset="75%" stopColor="#d4956e"/>
                <stop offset="90%" stopColor="#c4714a"/>
                <stop offset="100%" stopColor="#b8943e"/>
              </linearGradient>
              <linearGradient id="waterG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b8943e" stopOpacity="0.3"/>
                <stop offset="30%" stopColor="#2a4a5a" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#0d1b1e"/>
              </linearGradient>
              <radialGradient id="warmglow" cx="50%" cy="70%" r="60%">
                <stop offset="0%" stopColor="#d4b85e" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#d4b85e" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="foliageG" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#4a6741"/>
                <stop offset="70%" stopColor="#2a3a2a"/>
                <stop offset="100%" stopColor="#1a2a1a" stopOpacity="0.8"/>
              </radialGradient>
              <radialGradient id="moonG" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f5f0e8" stopOpacity="0.8"/>
                <stop offset="40%" stopColor="#d4b85e" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#d4b85e" stopOpacity="0"/>
              </radialGradient>
              <pattern id="bambooP" width="8" height="40" patternUnits="userSpaceOnUse">
                <line x1="2" y1="0" x2="2" y2="40" stroke="#6b8f5e" strokeWidth="0.5" opacity="0.3"/>
                <line x1="6" y1="0" x2="6" y2="40" stroke="#4a6741" strokeWidth="0.3" opacity="0.2"/>
              </pattern>
              <pattern id="jaliP" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="3" fill="none" stroke="#d4b85e" strokeWidth="0.5"/>
                <circle cx="0" cy="0" r="2" fill="none" stroke="#d4b85e" strokeWidth="0.3"/>
                <circle cx="12" cy="0" r="2" fill="none" stroke="#d4b85e" strokeWidth="0.3"/>
                <circle cx="0" cy="12" r="2" fill="none" stroke="#d4b85e" strokeWidth="0.3"/>
                <circle cx="12" cy="12" r="2" fill="none" stroke="#d4b85e" strokeWidth="0.3"/>
              </pattern>
            </defs>

            {/* Sky */}
            <rect width="1600" height="900" fill="url(#sky)"/>

            {/* Stars */}
            <g opacity="0.6">
              {[[120,60,1.5],[340,95,1],[520,40,1.2],[780,75,0.8],[950,35,1.3],[1100,80,1],[1280,50,1.5],[1420,90,0.7],[200,130,0.6],[680,110,0.9],[1350,120,1.1],[450,150,0.5]].map(([cx,cy,r],i) =>
                <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8"/>
              )}
            </g>

            {/* Moon */}
            <circle cx="1300" cy="120" r="50" fill="url(#moonG)"/>
            <circle cx="1300" cy="120" r="18" fill="#f5f0e8" opacity="0.85"/>

            {/* Distant hills */}
            <path d="M0,380 Q200,340 400,360 Q600,320 800,350 Q1000,310 1200,340 Q1400,320 1600,360 L1600,450 L0,450Z" fill="#1a3a2a" opacity="0.6"/>
            <path d="M0,400 Q300,370 500,390 Q700,360 900,385 Q1100,355 1300,375 Q1500,365 1600,380 L1600,460 L0,460Z" fill="#2a4a3a" opacity="0.5"/>

            {/* Paddy fields */}
            <path d="M0,440 Q400,420 800,435 Q1200,415 1600,440 L1600,500 L0,500Z" fill="#3a5a3a" opacity="0.4"/>
            <g opacity="0.15" stroke="#6b8f5e" strokeWidth="0.5" fill="none">
              <path d="M0,445 Q400,430 800,442 Q1200,425 1600,445"/>
              <path d="M0,455 Q400,440 800,450 Q1200,435 1600,453"/>
              <path d="M0,465 Q400,450 800,460 Q1200,448 1600,462"/>
            </g>

            {/* === HOTEL BUILDING === */}
            <g transform="translate(280, 0)">
              {/* Foundation */}
              <rect x="100" y="490" width="900" height="8" fill="#8a7a6a" opacity="0.8"/>
              <rect x="95" y="495" width="910" height="12" fill="#6a5a4a" opacity="0.6"/>

              {/* Restaurant + Bar under bamboo pergola */}
              <rect x="100" y="410" width="300" height="80" fill="#2a2a22" opacity="0.85"/>
              <rect x="100" y="410" width="8" height="80" fill="#8a5a3a" opacity="0.6"/>
              {[140,220,300,380].map(x => <rect key={x} x={x} y="420" width="6" height="70" fill="#6a5a4a" opacity="0.7"/>)}

              {/* Bamboo pergola */}
              <rect x="90" y="405" width="320" height="8" fill="#3a5a4a" opacity="0.8" rx="2"/>

              {/* String lights */}
              <path d="M110,410 Q130,415 150,410 Q170,415 190,410 Q210,415 230,410 Q250,415 270,410 Q290,415 310,410 Q330,415 350,410 Q370,415 390,410" fill="none" stroke="#d4b85e" strokeWidth="0.5" opacity="0.4"/>
              {[130,170,210,250,290,330,370].map((cx,i) =>
                <circle key={cx} cx={cx} cy="413" r="2" fill="#d4b85e" opacity={0.7 + (i%3)*0.1}/>
              )}

              {/* Warm light spill */}
              <rect x="108" y="430" width="290" height="55" fill="#d4b85e" opacity="0.06"/>

              {/* Dining table silhouettes */}
              {[[150,460,24],[210,455,28],[275,458,22],[340,462,26]].map(([x,y,w],i) =>
                <rect key={i} x={x} y={y} width={w} height={14} rx="2" fill="#4a3a2a" opacity="0.3"/>
              )}

              {/* Music stage */}
              <rect x="100" y="455" width="50" height="35" fill="#5a4a3a" opacity="0.7"/>
              <rect x="98" y="452" width="54" height="6" fill="#6b8f5e" opacity="0.5" rx="1"/>
              <path d="M95,440 Q125,425 155,440" fill="none" stroke="#6b8f5e" strokeWidth="2" opacity="0.6"/>
              <path d="M98,443 Q125,430 152,443" fill="none" stroke="#6b8f5e" strokeWidth="1.5" opacity="0.4"/>
              {/* Musician silhouette */}
              <g transform="translate(120, 456)" opacity="0.5" fill="#2a2a1a">
                <ellipse cx="0" cy="-12" rx="4" ry="5"/>
                <path d="M-5,-7 L-7,8 L7,8 L5,-7Z"/>
                <ellipse cx="8" cy="-2" rx="6" ry="8" fill="none" stroke="#2a2a1a" strokeWidth="1.2"/>
                <line x1="3" y1="-10" x2="14" y2="5" stroke="#2a2a1a" strokeWidth="1"/>
              </g>

              {/* Courtyard gap */}
              <rect x="410" y="430" width="180" height="60" fill="#1a2a2a" opacity="0.3"/>

              {/* Jacaranda tree */}
              <g transform="translate(500, 400)">
                <path d="M0,90 Q-3,60 -2,30 Q0,10 5,0" fill="none" stroke="#5a4a3a" strokeWidth="4"/>
                <path d="M0,50 Q-15,35 -25,20" fill="none" stroke="#5a4a3a" strokeWidth="2.5"/>
                <path d="M2,40 Q18,25 28,15" fill="none" stroke="#5a4a3a" strokeWidth="2"/>
                <path d="M-1,65 Q-20,55 -30,45" fill="none" stroke="#5a4a3a" strokeWidth="2"/>
                <ellipse cx="0" cy="-5" rx="50" ry="35" fill="url(#foliageG)" opacity="0.8"/>
                <ellipse cx="-20" cy="5" rx="30" ry="22" fill="#3a5a3a" opacity="0.6"/>
                <ellipse cx="22" cy="0" rx="28" ry="20" fill="#3a5a3a" opacity="0.5"/>
                {[[-25,-15,4],[-10,-22,5],[15,-18,4],[30,-8,3],[-35,-2,3],[5,-28,3]].map(([cx,cy,r],i) =>
                  <circle key={i} cx={cx} cy={cy} r={r} fill="#7a5a8a" opacity="0.3"/>
                )}
              </g>

              {/* Stone path in courtyard */}
              {[[460,480],[475,475],[490,482],[510,478],[525,484],[540,477]].map(([cx,cy],i) =>
                <ellipse key={i} cx={cx} cy={cy} rx={6} ry={3} fill="#8a7a6a" opacity="0.2"/>
              )}
              <rect x="430" y="486" width="140" height="3" fill="#3a7a8a" opacity="0.25" rx="1"/>

              {/* Main building (ground floor only — Phase 1) */}
              <rect x="600" y="420" width="400" height="78" fill="#2a2a22" opacity="0.9"/>

              {/* Jali screen band */}
              <rect x="600" y="430" width="400" height="20" fill="url(#jaliP)" opacity="0.35"/>

              {/* Ground floor windows */}
              {[[620,0.15,30],[670,0.2,60],[820,0.12,30],[870,0.18,30],[920,0.1,30]].map(([x,op,w],i) =>
                <rect key={`g-${i}`} x={x} y="450" width={w} height="28" fill="#d4b85e" opacity={op} rx="1"/>
              )}

              {/* Green sloped roof — low-rise */}
              <path d="M590,420 L800,390 L1010,420" fill="#3a5a3a" opacity="0.7"/>
              <path d="M590,420 L800,390 L1010,420" fill="none" stroke="#4a6741" strokeWidth="1" opacity="0.5"/>

              {/* Solar panels on green roof */}
              <g opacity="0.2">
                <rect x="830" y="398" width="50" height="14" fill="#2a3a4a" rx="1" transform="rotate(-5, 855, 405)"/>
                <rect x="890" y="400" width="40" height="12" fill="#2a3a4a" rx="1" transform="rotate(-5, 910, 406)"/>
              </g>

              {/* Bamboo cladding texture */}
              <rect x="600" y="420" width="400" height="78" fill="url(#bambooP)" opacity="0.15"/>

              {/* Lobby entrance glow */}
              <rect x="760" y="450" width="40" height="48" fill="#d4b85e" opacity="0.1" rx="3"/>
              <path d="M760,450 Q780,442 800,450" fill="none" stroke="#b8943e" strokeWidth="1" opacity="0.4"/>

              {/* Warm glow overlay on building */}
              <rect x="600" y="420" width="400" height="78" fill="url(#warmglow)"/>
            </g>

            {/* Left bamboo grove */}
            <g opacity="0.7">
              {[[60,350,3],[80,340,2.5],[95,355,2],[45,360,2.5]].map(([x,y,w],i) =>
                <line key={i} x1={x} y1={y} x2={x-3} y2="500" stroke={i%2 ? "#3a5a3a" : "#4a6741"} strokeWidth={w}/>
              )}
              {[[-30,50,350,12],[-15,85,335,14],[25,65,345,10],[25,100,350,11]].map(([rot,cx,cy,rx],i) =>
                <ellipse key={i} cx={cx} cy={cy} rx={rx} ry="4" fill="#4a6741" opacity="0.5" transform={`rotate(${rot}, ${cx}, ${cy})`}/>
              )}
            </g>

            {/* Right bamboo grove */}
            <g opacity="0.6">
              {[[1480,360,3],[1500,345,2.5],[1520,355,2],[1540,365,2]].map(([x,y,w],i) =>
                <line key={i} x1={x} y1={y} x2={x-2} y2="500" stroke={i%2 ? "#3a5a3a" : "#4a6741"} strokeWidth={w}/>
              )}
            </g>

            {/* Foreground ground */}
            <path d="M0,500 Q200,490 400,495 Q600,488 800,493 Q1000,486 1200,492 Q1400,488 1600,495 L1600,900 L0,900Z" fill="#1a2a1a" opacity="0.8"/>

            {/* Stone path */}
            {[[800,520,40],[790,540,35],[805,560,30],[795,580,28],[800,600,25]].map(([cx,cy,rx],i) =>
              <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={5} fill="#8a7a6a" opacity="0.15"/>
            )}

            {/* === BAMBOO COTTAGES + CAMPFIRE === */}
            {(() => {
              const cottages = [
                [380,512,44,28],[490,506,48,30],[670,504,44,28],[780,508,40,26],
              ];
              return <g opacity="0.85">
                {cottages.map(([tx,ty,w,h],i) => (
                  <g key={`c${i}`} transform={`translate(${tx},${ty})`}>
                    <rect x={-w/2} y="8" width={w} height={h} fill="#3a2a1a" opacity="0.9" rx="1"/>
                    <rect x={-w/2} y="8" width={w} height={h} fill="url(#bambooP)" opacity="0.3"/>
                    <path d={`M${-w/2-6},10 L0,${-8-(i%2)*2} L${w/2+6},10`} fill="#5a4a3a" opacity="0.9"/>
                    <rect x="-5" y="18" width="10" height={h-10} fill="#d4b85e" opacity={0.09+i*0.02} rx="1"/>
                  </g>
                ))}

                {/* Campfire */}
                <g transform="translate(580, 540)">
                  {[[-12,4],[-8,7],[0,8],[8,7],[12,4],[8,1],[0,0],[-8,1]].map(([cx,cy],i) =>
                    <circle key={i} cx={cx} cy={cy} r={2.5} fill="#6a5a4a" opacity="0.6"/>
                  )}
                  <ellipse cx="0" cy="0" rx="35" ry="20" fill="#d4b85e" opacity="0.04"/>
                  <ellipse cx="0" cy="0" rx="18" ry="12" fill="#d4b85e" opacity="0.08"/>
                  <ellipse cx="0" cy="-2" rx="10" ry="8" fill="#c4714a" opacity="0.15"/>
                  <path d="M-4,2 Q-6,-8 -2,-14 Q0,-10 2,-14 Q6,-8 4,2Z" fill="#d4956e" opacity="0.6"/>
                  <path d="M-2,1 Q-3,-6 0,-11 Q3,-6 2,1Z" fill="#d4b85e" opacity="0.5"/>
                  <path d="M-1,0 Q0,-5 1,0Z" fill="#f5f0e8" opacity="0.4"/>

                  {/* Singer with guitar */}
                  <g transform="translate(-28, -6)" opacity="0.7">
                    <ellipse cx="0" cy="10" rx="6" ry="2.5" fill="#5a4a3a" opacity="0.6"/>
                    <line x1="-3" y1="4" x2="-4" y2="10" stroke="#1a1a12" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="3" y1="4" x2="4" y2="10" stroke="#1a1a12" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M-4,4 Q-5,-4 -2,-10 L3,-10 Q5,-4 4,4Z" fill="#1a1a12"/>
                    <ellipse cx="0.5" cy="-14" rx="3.5" ry="4" fill="#1a1a12"/>
                    <path d="M-3,-6 Q-8,-8 -10,-14" fill="none" stroke="#1a1a12" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3,-4 Q7,-2 8,2" fill="none" stroke="#1a1a12" strokeWidth="1.5" strokeLinecap="round"/>
                    <ellipse cx="7" cy="-1" rx="5" ry="6.5" fill="#3a2a1a" opacity="0.8"/>
                    <ellipse cx="7" cy="-1" rx="5" ry="6.5" fill="none" stroke="#d4b85e" strokeWidth="0.5" opacity="0.3"/>
                    <circle cx="7" cy="-1" r="1.8" fill="none" stroke="#d4b85e" strokeWidth="0.4" opacity="0.25"/>
                    <line x1="4" y1="-6" x2="-9" y2="-16" stroke="#3a2a1a" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>

                  {/* Listeners */}
                  <g transform="translate(26, -4)" opacity="0.55">
                    <ellipse cx="0" cy="10" rx="5" ry="2" fill="#5a4a3a" opacity="0.5"/>
                    <path d="M-3,4 Q-3,-3 -1,-8 L2,-8 Q4,-3 3,4Z" fill="#1a1a12"/>
                    <ellipse cx="0.5" cy="-11.5" rx="3" ry="3.5" fill="#1a1a12"/>
                  </g>
                  <g transform="translate(38, -8)" opacity="0.4">
                    <path d="M-3,3 Q-2,-2 -1,-7 L2,-7 Q3,-2 3,3Z" fill="#1a1a12"/>
                    <ellipse cx="0.5" cy="-10" rx="2.8" ry="3.2" fill="#1a1a12"/>
                  </g>
                </g>

                {/* Trees between cottages */}
                {[[430,512,8],[590,502,6],[730,506,7]].map(([cx,cy,r],i) =>
                  <g key={`t${i}`}>
                    <line x1={cx} y1={cy} x2={cx} y2={cy+r*1.5} stroke="#5a4a3a" strokeWidth="1.5" opacity="0.5"/>
                    <ellipse cx={cx} cy={cy} rx={r} ry={r*0.7} fill="#3a5a3a" opacity="0.5"/>
                  </g>
                )}
              </g>;
            })()}

            {/* Water reflection */}
            <rect x="0" y="680" width="1600" height="220" fill="url(#waterG)" opacity="0.4"/>
            <g opacity="0.08" stroke="#d4b85e" strokeWidth="0.5" fill="none">
              <path d="M200,710 Q500,705 800,712 Q1100,706 1400,710"/>
              <path d="M100,740 Q400,735 700,742 Q1000,736 1300,740"/>
              <path d="M0,770 Q300,765 600,772 Q900,766 1200,770"/>
            </g>

            {/* Mist */}
            <rect x="0" y="470" width="1600" height="60" fill="#2a4a5a" opacity="0.08"/>

            {/* Dark overlay for text readability */}
            <rect x="0" y="0" width="1600" height="900" fill="url(#sky)" opacity="0.15"/>
            <rect x="0" y="400" width="1600" height="500" fill="#0d1b1e" opacity="0.4"/>

          </svg>
        </div>

        {/* Firefly particles (animated in CSS) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden" }}>
          {[[28,52,3],[33,50,2.5],[42,53,3.5],[69,51,4],[22,54,2.8],[55,48,3.2]].map(([left,top,dur], i) => (
            <div key={i} style={{
              position: "absolute", width: 3, height: 3, borderRadius: "50%",
              background: P.gold,
              left: `${left}%`, top: `${top}%`,
              animation: `breathe ${dur}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }} />
          ))}
        </div>

        {/* Hero text content */}
        <div style={{
          position: "relative", zIndex: 2, textAlign: "center",
          opacity: heroOpacity, transform: `translateY(${scrollY * 0.15}px)`,
          maxWidth: 800, padding: "0 24px",
          marginTop: "18vh",
        }}>
          <div style={{
            fontFamily: font.accent, fontSize: 13, letterSpacing: 8,
            color: P.gold, marginBottom: 24, textTransform: "uppercase", fontWeight: 300,
            animation: "fadeUp 1s ease 0.3s both",
          }}>
            A Boutique Retreat
          </div>
          <h1 style={{
            fontFamily: font.display, fontSize: "clamp(48px, 10vw, 96px)",
            fontWeight: 400, letterSpacing: 2, lineHeight: 0.95,
            color: P.cream, margin: "0 0 8px",
            animation: "fadeUp 1s ease 0.5s both",
            textShadow: "0 2px 40px rgba(0,0,0,0.5)",
          }}>
            Neel Paakhi
          </h1>
          <div style={{
            fontFamily: font.display, fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 400, fontStyle: "italic",
            color: P.goldLight, margin: "0 0 32px",
            animation: "fadeUp 1s ease 0.7s both",
            textShadow: "0 2px 30px rgba(0,0,0,0.4)",
          }}>
            {"\u09A8\u09C0\u09B2 \u09AA\u09BE\u0996\u09C0"}
          </div>
          <div style={{
            width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${P.gold}, transparent)`,
            margin: "0 auto 28px",
            animation: "fadeUp 1s ease 0.9s both",
          }} />
          <p style={{
            fontFamily: font.accent, fontSize: "clamp(16px, 2.5vw, 22px)",
            fontWeight: 300, color: `${P.cream}cc`, lineHeight: 1.7,
            maxWidth: 520, margin: "0 auto 40px",
            animation: "fadeUp 1s ease 1.1s both",
            textShadow: "0 1px 20px rgba(0,0,0,0.5)",
          }}>
            Where acoustic melodies dissolve into the azure sky, and the gentle breeze brings you the scent of bamboo and river stone in every breath.
          </p>
          <div style={{
            fontFamily: font.body, fontSize: 11, letterSpacing: 4, color: P.muted,
            animation: "fadeUp 1s ease 1.4s both",
          }}>
            FULUNG &middot; NORTH GUWAHATI &middot; ASSAM
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          zIndex: 2, textAlign: "center", opacity: heroOpacity,
        }}>
          <div style={{
            width: 1, height: 40, background: `linear-gradient(180deg, ${P.gold}, transparent)`,
            margin: "0 auto", animation: "breathe 2s ease-in-out infinite",
          }} />
        </div>
      </section>

      {/* STORY */}
      <section id="story" style={{
        padding: "120px 24px",
        background: `linear-gradient(180deg, ${P.deep} 0%, ${P.warm} 100%)`,
        position: "relative",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 40 : 60, alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16, textTransform: "uppercase" }}>
                  Our Story
                </div>
                <h2 style={{ fontFamily: font.display, fontSize: 38, fontWeight: 400, lineHeight: 1.2, marginBottom: 24, color: P.cream }}>
                  Built for those who<br /><span style={{ fontStyle: "italic", color: P.goldLight }}>remember a slower world</span>
                </h2>
                <div style={{ width: 50, height: 1, background: P.gold, marginBottom: 24 }} />
                <p style={{ fontFamily: font.accent, fontSize: 17, lineHeight: 1.9, color: P.muted, marginBottom: 16 }}>
                  There was a time when evenings smelled of incense and river water.
                  When a Bhupen Hazarika song on the radio could stop an entire household.
                  When letters arrived by post and tea was brewed slow.
                </p>
                <p style={{ fontFamily: font.accent, fontSize: 17, lineHeight: 1.9, color: P.muted, marginBottom: 16 }}>
                  Neel Paakhi is built on the belief that that time didn't pass — we just
                  stopped listening. This is a place where the unhurried magic of the 1970s
                  never ended, where Jayanta Hazarika's melodies still drift across paddy fields
                  at dusk, and a campfire under the stars is the only evening plan you need.
                </p>
                <p style={{ fontFamily: font.accent, fontSize: 17, lineHeight: 1.9, color: P.muted }}>
                  On the quiet north bank of the Brahmaputra, we are building a retreat
                  that heals through sound, space, and soil — a place to recover something
                  the modern world forgot it lost.
                </p>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{
                  aspectRatio: "3/4", borderRadius: 2,
                  background: `linear-gradient(135deg, ${P.river} 0%, ${P.bamboo}88 50%, ${P.terracotta}44 100%)`,
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", inset: 20,
                    border: `1px solid ${P.gold}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column", gap: 12,
                  }}>
                    <svg width="48" height="64" viewBox="0 0 48 64" style={{ opacity: 0.7 }}>
                      {/* Feather — quill curves left, vane tapers to tip */}
                      <path d="M24,62 Q23,50 22,38 Q20,28 16,20 Q12,12 6,6 Q14,10 20,16 Q24,20 26,28 Q27,20 30,14 Q34,8 42,4 Q36,12 32,20 Q28,28 26,38 Q25,50 24,62Z" fill={P.gold} opacity="0.75"/>
                      {/* Central rachis */}
                      <path d="M24,62 Q23,42 20,24 Q16,14 6,6" fill="none" stroke={P.goldLight} strokeWidth="1" opacity="0.6"/>
                      {/* Barb lines */}
                      <path d="M20,30 Q16,26 12,24" fill="none" stroke={P.deep} strokeWidth="0.5" opacity="0.3"/>
                      <path d="M22,22 Q18,18 14,16" fill="none" stroke={P.deep} strokeWidth="0.5" opacity="0.3"/>
                      <path d="M26,30 Q30,26 34,24" fill="none" stroke={P.deep} strokeWidth="0.5" opacity="0.3"/>
                      <path d="M27,22 Q31,18 36,14" fill="none" stroke={P.deep} strokeWidth="0.5" opacity="0.3"/>
                    </svg>
                    <div style={{ fontFamily: font.accent, fontSize: 14, letterSpacing: 3, color: P.gold, opacity: 0.8 }}>THE AZURE FEATHER</div>
                  </div>
                </div>
                <div style={{
                  position: "absolute", top: -16, right: -16,
                  width: 100, height: 100,
                  border: `1px solid ${P.gold}22`,
                }} />
              </div>
            </div>
          </FadeIn>

          {/* Four pillars */}
          <div style={{ marginTop: 80 }}>
            <FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 24 }}>
                {[
                  { title: "Remember", icon: "\u{1F4FB}", text: "The golden age of Assamese and Bengali music lives here. Bhupen da, Jayanta da, Hemanta — not as nostalgia, but as the present." },
                  { title: "Listen", icon: "\u{1F3B5}", text: "The acoustic stage is the heart. Live music every evening — from folk to Rabindrasangeet — flows through the courtyard into your room." },
                  { title: "Root", icon: "\u{1F331}", text: "Bamboo, river stone, Muga silk, gamosa patterns. Every surface tells an Assamese story from a time when craft was slow and honest." },
                  { title: "Breathe", icon: "\u{1F32C}\uFE0F", text: "No screens, no rush. Campfire, stargazing, yoga at dawn. A rhythm that belongs to the 1970s and refuses to leave." },
                ].map((p, i) => (
                  <FadeIn key={i} delay={i * 0.15}>
                    <div style={{
                      padding: 28, textAlign: "center",
                      background: `${P.river}44`,
                      border: `1px solid ${P.gold}11`,
                      transition: "all 0.4s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${P.gold}44`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = `${P.gold}11`}
                    >
                      <div style={{ fontSize: 28, marginBottom: 16 }}>{p.icon}</div>
                      <div style={{ fontFamily: font.display, fontSize: 20, fontStyle: "italic", color: P.goldLight, marginBottom: 12 }}>{p.title}</div>
                      <p style={{ fontFamily: font.accent, fontSize: 14, lineHeight: 1.7, color: P.muted }}>{p.text}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" style={{
        padding: "120px 24px",
        background: P.deep,
        position: "relative",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>ACCOMMODATIONS</div>
              <h2 style={{ fontFamily: font.display, fontSize: 42, fontWeight: 400, color: P.cream }}>
                Fifteen cottages. <span style={{ fontStyle: "italic", color: P.goldLight }}>Two rhythms.</span>
              </h2>
              <p style={{ fontFamily: font.accent, fontSize: 16, color: P.muted, marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
                Eleven spacious boundary cottages along the north and west perimeter,
                and four intimate campfire cottages clustered around the fire pit.
                All handcrafted in bamboo. Same price tier.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 40 : 32 }}>
            {rooms.map((r, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{
                  background: P.warm,
                  border: `1px solid ${P.gold}11`,
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${P.gold}33`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = `${P.gold}11`}
                >
                  <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                    {r.type === "boundary" ? <BoundaryCottageSVG /> : <CampfireCottageSVG />}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 16px 12px",
                      background: "linear-gradient(transparent, rgba(13,27,30,0.8))",
                    }}>
                      <div style={{ fontFamily: font.body, fontSize: 9, letterSpacing: 3, color: P.gold }}>
                        {r.count} COTTAGES &middot; {r.size}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: mobile ? 24 : 32 }}>
                    <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 4, color: P.gold, marginBottom: 12 }}>
                      {r.type.toUpperCase()} COTTAGE
                    </div>
                    <h3 style={{ fontFamily: font.display, fontSize: 24, fontStyle: "italic", color: P.goldLight, marginBottom: 14 }}>
                      {r.name}
                    </h3>
                    <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.8, color: P.muted, marginBottom: 20 }}>
                      {r.desc}
                    </p>
                    <div>
                      <span style={{ fontFamily: font.display, fontSize: 24, color: P.gold }}>{"\u20B9"}{r.price}</span>
                      <span style={{ fontFamily: font.body, fontSize: 11, color: P.muted }}> / night</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DINING & MUSIC - combined */}
      <section id="dining" style={{
        padding: "120px 24px",
        background: `linear-gradient(180deg, ${P.warm} 0%, ${P.deep} 100%)`,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>THE TABLE & THE STAGE</div>
              <h2 style={{ fontFamily: font.display, fontSize: 42, fontWeight: 400, color: P.cream }}>
                Where <span style={{ fontStyle: "italic", color: P.goldLight }}>every meal becomes a memory</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 40 : 48, marginBottom: 80 }}>
            <FadeIn>
              <div>
                <div style={{
                  aspectRatio: "4/3",
                  marginBottom: 24, position: "relative", overflow: "hidden",
                }}>
                  <RestaurantSVG />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 16px 16px",
                    background: "linear-gradient(transparent, rgba(13,27,30,0.7))",
                  }}>
                    <div style={{ fontFamily: font.accent, fontSize: 13, color: P.gold, letterSpacing: 2 }}>
                      BAMBOO PERGOLA DINING
                    </div>
                  </div>
                </div>
                <h3 style={{ fontFamily: font.display, fontSize: 24, color: P.cream, marginBottom: 12 }}>
                  Open-air restaurant + bar
                </h3>
                <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.8, color: P.muted }}>
                  Forty-five seats under a bamboo pergola strung with warm lights.
                  The menu moves with the seasons — river fish, bamboo shoot preparations,
                  smoked pork from the hills, and Assamese thalis that honor the land.
                  The kitchen is semi-open: you watch your meal come alive.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <div style={{
                  aspectRatio: "4/3",
                  marginBottom: 24, position: "relative", overflow: "hidden",
                }}>
                  <BarCampfireSVG />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 16px 16px",
                    background: "linear-gradient(transparent, rgba(13,27,30,0.7))",
                  }}>
                    <div style={{ fontFamily: font.accent, fontSize: 13, color: P.gold, letterSpacing: 2 }}>
                      ACOUSTIC STAGE &middot; CAMPFIRE
                    </div>
                  </div>
                </div>
                <h3 style={{ fontFamily: font.display, fontSize: 24, color: P.cream, marginBottom: 12 }}>
                  The Bamboo Bar
                </h3>
                <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.8, color: P.muted }}>
                  A wraparound bamboo counter facing the central courtyard.
                  Craft cocktails infused with Assam tea and local botanicals.
                  Rice beer from the hills. And always — always — a melody drifting
                  from the stage just a few steps away.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" style={{
        padding: "100px 24px",
        background: P.deep,
        borderTop: `1px solid ${P.gold}11`,
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>THE SOUNDTRACK</div>
              <h2 style={{ fontFamily: font.display, fontSize: 36, fontWeight: 400, color: P.cream, fontStyle: "italic" }}>
                A time machine tuned to<br />the golden decades.
              </h2>
              <p style={{ fontFamily: font.accent, fontSize: 16, color: P.muted, marginTop: 16, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.8 }}>
                The 70s and 80s gave us music that didn't need amplifiers — just a voice,
                a guitar, and a room willing to listen. At Neel Paakhi, every evening is a doorway
                back to that era.
              </p>
            </div>
          </FadeIn>

          {/* Daily music schedule */}
          <FadeIn>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 4, color: P.muted, marginBottom: 20, textAlign: "center" }}>THROUGH THE DAY</div>
              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12 }}>
                {dailyMusic.map((m, i) => (
                  <div key={i} style={{
                    padding: "20px 16px", textAlign: "center",
                    background: `${P.river}22`, border: `1px solid ${P.gold}0a`,
                    transition: "all 0.4s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${P.gold}22`; e.currentTarget.style.background = `${P.river}44`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${P.gold}0a`; e.currentTarget.style.background = `${P.river}22`; }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
                    <div style={{ fontFamily: font.display, fontSize: 16, color: P.goldLight, marginBottom: 8 }}>{m.time}</div>
                    <p style={{ fontFamily: font.accent, fontSize: 12, lineHeight: 1.6, color: P.muted, margin: 0 }}>{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Signature evenings */}
          <FadeIn>
            <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 4, color: P.muted, marginBottom: 20, textAlign: "center" }}>SIGNATURE EVENINGS</div>
          </FadeIn>
          <div style={{ display: "grid", gap: 16 }}>
            {musicSchedule.map((m, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  display: "grid", gridTemplateColumns: "auto 1fr", gap: 24,
                  padding: "28px 32px",
                  background: `${P.river}33`,
                  border: `1px solid ${P.gold}11`,
                  transition: "all 0.4s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${P.gold}33`; e.currentTarget.style.background = `${P.river}55`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${P.gold}11`; e.currentTarget.style.background = `${P.river}33`; }}
                >
                  <div style={{ fontSize: 28, alignSelf: "center" }}>{m.icon}</div>
                  <div>
                    <div style={{ fontFamily: font.display, fontSize: 20, color: P.goldLight, marginBottom: 6 }}>{m.day}</div>
                    <p style={{ fontFamily: font.accent, fontSize: 14, lineHeight: 1.7, color: P.muted }}>{m.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div style={{
              marginTop: 32, padding: 24, textAlign: "center",
              background: `${P.gold}08`, border: `1px solid ${P.gold}22`,
            }}>
              <p style={{ fontFamily: font.accent, fontSize: 15, fontStyle: "italic", color: P.goldLight }}>
                Monthly Hazarika Nights — a dedicated evening celebrating
                the legacy of Bhupen da and Jayanta da, with guest artists from across Assam.
              </p>
            </div>
          </FadeIn>

          {/* THE STAGE */}
          <FadeIn delay={0.2}>
            <div style={{
              marginTop: 48, padding: mobile ? "32px 24px" : "40px 48px",
              background: `linear-gradient(135deg, ${P.warm}44 0%, ${P.river}33 100%)`,
              border: `1px solid ${P.gold}15`,
              position: "relative",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "auto 1fr", gap: mobile ? 16 : 32, alignItems: "start" }}>
                <div style={{ textAlign: "center" }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" style={{ opacity: 0.7 }}>
                    {/* Acoustic guitar body */}
                    <ellipse cx="20" cy="28" rx="11" ry="9" fill="none" stroke="#d4b85e" strokeWidth="1.2"/>
                    <ellipse cx="20" cy="22" rx="8" ry="6.5" fill="none" stroke="#d4b85e" strokeWidth="1.2"/>
                    {/* Sound hole */}
                    <circle cx="20" cy="27" r="3" fill="none" stroke="#d4b85e" strokeWidth="0.8" opacity="0.6"/>
                    {/* Neck */}
                    <rect x="18.5" y="4" width="3" height="19" fill="none" stroke="#d4b85e" strokeWidth="1" rx="1"/>
                    {/* Headstock */}
                    <rect x="17.5" y="1" width="5" height="4" fill="none" stroke="#d4b85e" strokeWidth="0.8" rx="1"/>
                    {/* Tuning pegs */}
                    <circle cx="18" cy="2.5" r="0.8" fill="#d4b85e" opacity="0.5"/>
                    <circle cx="22" cy="2.5" r="0.8" fill="#d4b85e" opacity="0.5"/>
                    {/* Strings */}
                    <line x1="19" y1="5" x2="19" y2="35" stroke="#d4b85e" strokeWidth="0.3" opacity="0.4"/>
                    <line x1="20" y1="5" x2="20" y2="36" stroke="#d4b85e" strokeWidth="0.3" opacity="0.4"/>
                    <line x1="21" y1="5" x2="21" y2="35" stroke="#d4b85e" strokeWidth="0.3" opacity="0.4"/>
                    {/* Bridge */}
                    <line x1="17" y1="33" x2="23" y2="33" stroke="#d4b85e" strokeWidth="0.8" opacity="0.5"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 4, color: P.gold, marginBottom: 12 }}>THE STAGE</div>
                  <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.9, color: `${P.cream}cc`, margin: 0 }}>
                    A raised bamboo platform (8ft {"\u00D7"} 10ft) with a curved acoustic canopy overhead.
                    Two monitor speakers angled toward the performer. Warm amber spotlights.
                    A single mic stand, a stool, and a guitar rack. That{"\u2019"}s all.
                    The music does the rest.
                  </p>
                  <p style={{ fontFamily: font.accent, fontSize: 14, lineHeight: 1.8, color: P.muted, marginTop: 12, marginBottom: 0 }}>
                    The restaurant + bar tables arc around the stage in a gentle crescent {"\u2014"} every seat
                    within 30 feet of the performer. No bad seats. Just raw, intimate sound.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WELLNESS */}
      <section id="wellness" style={{
        padding: "120px 24px",
        background: `linear-gradient(180deg, ${P.deep} 0%, ${P.warm} 50%, ${P.deep} 100%)`,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>WELLNESS</div>
              <h2 style={{ fontFamily: font.display, fontSize: 42, fontWeight: 400, color: P.cream }}>
                The body <span style={{ fontStyle: "italic", color: P.goldLight }}>remembers stillness</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 24 }}>
            {[
              { title: "Yoga Deck", Svg: YogaDeckSVG, desc: "A covered bamboo platform open to the morning sky. Daily sessions at sunrise. The paddy fields are your horizon line." },
              { title: "Plunge Pool", Svg: PlungePoolSVG, desc: "A courtyard plunge pool surrounded by tropical landscaping. Wooden deck with loungers. The perfect reset between afternoon exploration and evening campfire." },
              { title: "Campfire Circle", Svg: CampfireCircleSVG, desc: "Two campfire areas nestled among the cottages. Stargazing with zero light pollution. Acoustic guitars, rice beer, and stories under an Assamese sky." },
            ].map((w, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{
                  textAlign: "center",
                  background: `${P.river}33`,
                  border: `1px solid ${P.gold}11`,
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${P.gold}33`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = `${P.gold}11`}
                >
                  <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                    <w.Svg />
                  </div>
                  <div style={{ padding: 24 }}>
                    <div style={{ fontFamily: font.display, fontSize: 22, fontStyle: "italic", color: P.goldLight, marginBottom: 12 }}>{w.title}</div>
                    <p style={{ fontFamily: font.accent, fontSize: 14, lineHeight: 1.8, color: P.muted }}>{w.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="visit" style={{
        padding: "120px 24px",
        background: P.deep,
        borderTop: `1px solid ${P.gold}11`,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 40 : 60 }}>
              <div>
                <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>GETTING HERE</div>
                <h2 style={{ fontFamily: font.display, fontSize: 36, fontWeight: 400, color: P.cream, marginBottom: 24 }}>
                  Close enough to escape.<br /><span style={{ fontStyle: "italic", color: P.goldLight }}>Far enough to breathe.</span>
                </h2>
                <div style={{ width: 50, height: 1, background: P.gold, marginBottom: 24 }} />
                <div style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 2, color: P.muted }}>
                  <p style={{ marginBottom: 12 }}>
                    Fulung village, North Guwahati — on the quiet north bank of the Brahmaputra,
                    just 25 km from the city but a world away in spirit.
                  </p>
                  <p style={{ marginBottom: 16 }}>
                    Near Dirgheswari Temple. Close to The Art of Living Ashram.
                    The new Guwahati bridges bring you here in under 40 minutes.
                  </p>
                </div>
                {[
                  { label: "Guwahati Airport", dist: "21 km" },
                  { label: "Guwahati Railway Station", dist: "4 km" },
                  { label: "Kamakhya Temple", dist: "12 km" },
                  { label: "Dirgheswari Temple", dist: "3 km" },
                ].map((d, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: `1px solid ${P.gold}11`,
                    fontFamily: font.accent, fontSize: 14,
                  }}>
                    <span style={{ color: P.muted }}>{d.label}</span>
                    <span style={{ color: P.gold, fontFamily: font.body, letterSpacing: 1 }}>{d.dist}</span>
                  </div>
                ))}
              </div>
              <div style={{
                background: `linear-gradient(135deg, ${P.river} 0%, ${P.bamboo}44 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", gap: 16, position: "relative",
              }}>
                <div style={{ position: "absolute", inset: 20, border: `1px solid ${P.gold}22` }} />
                <div style={{ fontFamily: font.body, fontSize: 11, letterSpacing: 3, color: P.gold }}>26.2431° N</div>
                <div style={{ fontFamily: font.body, fontSize: 11, letterSpacing: 3, color: P.gold }}>91.7656° E</div>
                <div style={{ width: 40, height: 1, background: `${P.gold}44`, margin: "8px 0" }} />
                <div style={{ fontFamily: font.accent, fontSize: 13, color: P.muted, letterSpacing: 2 }}>ELEVATION 51m</div>
                <div style={{ fontFamily: font.accent, fontSize: 14, color: P.goldLight, fontStyle: "italic", marginTop: 8 }}>
                  North bank of the Brahmaputra
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section id="book" style={{
        padding: "120px 24px",
        background: `linear-gradient(180deg, ${P.deep} 0%, ${P.river}44 50%, ${P.deep} 100%)`,
        textAlign: "center",
      }}>
        <FadeIn>
          <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 20 }}>OPENING 2028</div>
          <h2 style={{ fontFamily: font.display, fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 400, color: P.cream, marginBottom: 12 }}>
            Be among the first to
          </h2>
          <h2 style={{ fontFamily: font.display, fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 400, fontStyle: "italic", color: P.goldLight, marginBottom: 32 }}>
            hear the azure feather fall
          </h2>
          <div style={{ width: 60, height: 1, background: P.gold, margin: "0 auto 32px" }} />
          <p style={{ fontFamily: font.accent, fontSize: 17, color: P.muted, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.8 }}>
            Register your interest and we will reach out with exclusive
            pre-opening rates and an invitation to our first Hazarika Night.
          </p>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", gap: 0, justifyContent: "center", maxWidth: 460, margin: "0 auto" }}>
            <input type="email" placeholder="Your email address" value={email}
              onChange={(e) => { setEmail(e.target.value); setSubStatus(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              style={{
              flex: 1, padding: "14px 20px",
              background: `${P.warm}`, border: `1px solid ${P.gold}33`,
              color: P.cream, fontFamily: font.accent, fontSize: 14,
              outline: "none", borderRight: mobile ? undefined : "none",
              borderBottom: mobile ? "none" : undefined,
            }} />
            <button onClick={handleSubscribe} disabled={subStatus === "loading"} style={{
              padding: "14px 28px",
              background: subStatus === "loading" ? P.muted : P.gold,
              border: `1px solid ${P.gold}`,
              color: P.deep, fontFamily: font.body, fontSize: 11,
              letterSpacing: 3, cursor: subStatus === "loading" ? "wait" : "pointer", fontWeight: 500,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { if (subStatus !== "loading") e.target.style.background = P.goldLight; }}
            onMouseLeave={(e) => { if (subStatus !== "loading") e.target.style.background = P.gold; }}
            >{subStatus === "loading" ? "..." : "NOTIFY ME"}</button>
          </div>
          {subStatus && (
            <div style={{
              fontFamily: font.accent, fontSize: 14, marginTop: 16, textAlign: "center",
              color: subStatus === "success" ? P.bambooLight : subStatus === "error" ? P.terracottaLight : P.muted,
            }}>{subMsg}</div>
          )}
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "48px 24px",
        background: P.charcoal,
        borderTop: `1px solid ${P.gold}11`,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 32 }}>
          <div>
            <div style={{ fontFamily: font.accent, fontSize: 20, color: P.gold, letterSpacing: 2, marginBottom: 12 }}>NEEL PAAKHI</div>
            <p style={{ fontFamily: font.accent, fontSize: 13, color: P.muted, lineHeight: 1.7 }}>
              A boutique retreat<br />
              Fulung, North Guwahati<br />
              Kamrup, Assam 781030
            </p>
          </div>
          <div>
            <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 3, color: P.gold, marginBottom: 12 }}>CONNECT</div>
            <div style={{ fontFamily: font.accent, fontSize: 13, color: P.muted, lineHeight: 2 }}>
              <div>stay@neelpaakhi.com</div>
              <div>+91 99540-85641</div>
              <div>+91 99571-84887</div>
            </div>
          </div>
          <div style={{ textAlign: mobile ? "left" : "right" }}>
            <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 3, color: P.gold, marginBottom: 12 }}>EXPLORE</div>
            <div style={{ fontFamily: font.accent, fontSize: 13, color: P.muted, lineHeight: 2 }}>
              <div style={{ cursor: "pointer" }} onClick={() => scrollTo("rooms")}>Cottages</div>
              <div style={{ cursor: "pointer" }} onClick={() => scrollTo("dining")}>Dining</div>
              <div style={{ cursor: "pointer" }} onClick={() => scrollTo("music")}>Music Evenings</div>
              <div style={{ cursor: "pointer" }} onClick={() => scrollTo("wellness")}>Wellness</div>
              <div style={{ cursor: "pointer" }} onClick={() => window.location.href = "/masterplan"}>Master Plan</div>
            </div>
          </div>
        </div>
        <div style={{
          maxWidth: 900, margin: "32px auto 0",
          paddingTop: 24, borderTop: `1px solid ${P.gold}11`,
          textAlign: "center",
        }}>
          <div style={{ fontFamily: font.body, fontSize: 9, letterSpacing: 3, color: `${P.muted}66` }}>
            &copy; 2026 NEEL PAAKHI &middot; ALL RIGHTS RESERVED
          </div>
          <div style={{ fontFamily: font.body, fontSize: 8, letterSpacing: 2, color: `${P.muted}44`, marginTop: 8 }}>
            ALL CONTENT &amp; DESIGNS ARE PROPRIETARY TO NEEL PAAKHI. UNAUTHORIZED USE IS PROHIBITED.
          </div>
        </div>
      </footer>
    </div>
  );
}
