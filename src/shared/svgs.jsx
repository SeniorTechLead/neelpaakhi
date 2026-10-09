export function BoundaryCottageSVG() {
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
      {[[40,25,1],[120,18,0.8],[200,30,1.2],[300,15,0.7],[350,35,0.9]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.5"/>
      )}
      <path d="M0,120 Q50,100 100,115 Q150,95 200,110 Q250,100 300,115 Q350,105 400,120 L400,160 L0,160Z" fill="#2a4a3a" opacity="0.5"/>
      <path d="M0,200 Q100,195 200,198 Q300,193 400,200 L400,300 L0,300Z" fill="#1a2a1a" opacity="0.7"/>
      <rect x="0" y="188" width="400" height="14" fill="#8a7a6a" opacity="0.08" rx="2"/>
      <path d="M0,195 Q100,193 200,195 Q300,193 400,195" fill="none" stroke="#f5f0e8" strokeWidth="0.3" opacity="0.15"/>
      {[[80,140],[140,130],[310,135],[360,138]].map(([cx,cy],i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx} y2={cy+55} stroke="#5a4a3a" strokeWidth="2" opacity="0.4"/>
          <ellipse cx={cx} cy={cy-5} rx={12} ry={16} fill="#3a5a3a" opacity="0.4"/>
        </g>
      ))}
      <g transform="translate(200, 120)">
        <rect x="-55" y="68" width="110" height="6" fill="#6a5a4a" opacity="0.8" rx="1"/>
        <rect x="-45" y="20" width="90" height="50" fill="#3a2a1a" opacity="0.9" rx="1"/>
        <rect x="-45" y="20" width="90" height="50" fill="url(#bc-bamboo)" opacity="0.25"/>
        <path d="M-58,22 L0,-25 L58,22" fill="#5a4a3a" opacity="0.9"/>
        <path d="M-58,22 L0,-25 L58,22" fill="none" stroke="#4a6741" strokeWidth="1" opacity="0.4"/>
        <path d="M-52,20 L0,-20 L52,20" fill="#3a6a8a" opacity="0.25"/>
        <rect x="-15" y="35" width="12" height="16" fill="#d4b85e" opacity="0.12" rx="1"/>
        <rect x="5" y="35" width="12" height="16" fill="#d4b85e" opacity="0.08" rx="1"/>
        <rect x="-5" y="42" width="10" height="28" fill="#d4b85e" opacity="0.1" rx="1"/>
        <rect x="-50" y="68" width="100" height="10" fill="#4a6741" opacity="0.15"/>
        <text x="0" y="76" textAnchor="middle" fill="#7aaa6e" fontSize="5" fontFamily="'DM Sans', sans-serif" opacity="0.5">4ft back porch → trail</text>
        <rect x="-48" y="8" width="96" height="14" fill="#d4b85e" opacity="0.08"/>
        <text x="0" y="17" textAnchor="middle" fill="#d4b85e" fontSize="5" fontFamily="'DM Sans', sans-serif" opacity="0.4">5ft verandah</text>
      </g>
      <rect width="400" height="300" fill="url(#bc-glow)"/>
      {[[100,230],[120,235],[260,228],[280,233]].map(([cx,cy],i) =>
        <ellipse key={i} cx={cx} cy={cy} rx={5} ry={2} fill="#8a7a6a" opacity="0.12"/>
      )}
    </svg>
  );
}

export function CampfireCottageSVG() {
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
      {[[30,20,1.2],[80,35,0.7],[150,12,1],[240,25,0.9],[310,18,1.1],[370,30,0.6],[180,40,0.5]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.6"/>
      )}
      <path d="M0,180 Q100,175 200,178 Q300,173 400,180 L400,300 L0,300Z" fill="#1a2a1a" opacity="0.7"/>
      {[[-1,130],[1,320]].map(([side, tx], ci) => (
        <g key={ci} transform={`translate(${tx}, 110)`}>
          <rect x="-30" y="15" width="60" height="38" fill="#3a2a1a" opacity="0.8" rx="1"/>
          <path d={`M-38,17 L0,-10 L38,17`} fill="#5a4a3a" opacity="0.85"/>
          <path d={`M-34,16 L0,-7 L34,16`} fill="#3a6a8a" opacity="0.2"/>
          <rect x="-5" y="30" width="10" height="23" fill="#d4b85e" opacity="0.1" rx="1"/>
          <rect x="-28" y="52" width="56" height="4" fill="#6a5a4a" opacity="0.5" rx="1"/>
        </g>
      ))}
      <g transform="translate(200, 210)">
        {[[-14,4],[-10,7],[0,8],[10,7],[14,4],[10,1],[0,0],[-10,1]].map(([cx,cy],i) =>
          <circle key={i} cx={cx} cy={cy} r={3} fill="#6a5a4a" opacity="0.5"/>
        )}
        <ellipse cx="0" cy="0" rx="30" ry="18" fill="#d4b85e" opacity="0.05"/>
        <ellipse cx="0" cy="-2" rx="14" ry="10" fill="#c4714a" opacity="0.12"/>
        <path d="M-5,2 Q-7,-10 -3,-18 Q0,-12 3,-18 Q7,-10 5,2Z" fill="#d4956e" opacity="0.6"/>
        <path d="M-3,1 Q-4,-7 0,-14 Q4,-7 3,1Z" fill="#d4b85e" opacity="0.5"/>
        <path d="M-1,0 Q0,-6 1,0Z" fill="#f5f0e8" opacity="0.4"/>
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
        <g transform="translate(-55, -10)" opacity="0.4">
          <path d="M-3,3 Q-3,-3 -1,-8 L2,-8 Q4,-3 3,3Z" fill="#1a1a12"/>
          <ellipse cx="0.5" cy="-11" rx="3" ry="3.5" fill="#1a1a12"/>
          <ellipse cx="7" cy="-1" rx="4" ry="5" fill="#3a2a1a" opacity="0.7"/>
          <line x1="4" y1="-6" x2="-6" y2="-14" stroke="#3a2a1a" strokeWidth="1.2"/>
        </g>
      </g>
      <rect width="400" height="300" fill="url(#cf-fireglow)"/>
    </svg>
  );
}

export function RestaurantSVG() {
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
      {[[60,20,0.8],[140,30,1],[250,15,0.7],[340,28,0.9]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.4"/>
      )}
      <g transform="translate(0, 60)">
        {[40,120,200,280,360].map(x =>
          <rect key={x} x={x-2} y="40" width="4" height="140" fill="#6a5a4a" opacity="0.6" rx="1"/>
        )}
        <rect x="30" y="35" width="340" height="8" fill="#3a5a4a" opacity="0.7" rx="2"/>
        <rect x="35" y="30" width="330" height="6" fill="#4a6741" opacity="0.5" rx="1"/>
        {[60,100,140,180,220,260,300,340].map(x =>
          <rect key={x} x={x} y="36" width="2" height="6" fill="#5a7a5a" opacity="0.3"/>
        )}
        <path d="M50,42 Q70,48 90,42 Q110,48 130,42 Q150,48 170,42 Q190,48 210,42 Q230,48 250,42 Q270,48 290,42 Q310,48 330,42 Q350,48 370,42" fill="none" stroke="#d4b85e" strokeWidth="0.5" opacity="0.4"/>
        {[70,110,150,190,230,270,310,350].map((cx,i) =>
          <circle key={cx} cx={cx} cy="46" r="2" fill="#d4b85e" opacity={0.5 + (i%3)*0.15}/>
        )}
        <rect x="40" y="80" width="320" height="90" fill="#d4b85e" opacity="0.04"/>
        {[[90,120,22,12],[160,115,26,14],[240,118,24,12],[310,122,22,10]].map(([x,y,w,h],i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx="2" fill="#4a3a2a" opacity="0.4"/>
            <rect x={x+2} y={y+2} width={w-4} height={h-4} rx="1" fill="#d4b85e" opacity="0.03"/>
          </g>
        ))}
        <rect x="40" y="140" width="50" height="30" fill="#5a4a3a" opacity="0.6" rx="1"/>
        <rect x="38" y="137" width="54" height="5" fill="#6b8f5e" opacity="0.4" rx="1"/>
        <path d="M35,125 Q65,112 95,125" fill="none" stroke="#6b8f5e" strokeWidth="1.5" opacity="0.4"/>
        <g transform="translate(62, 148)" opacity="0.5" fill="#1a1a12">
          <ellipse cx="0" cy="-10" rx="3.5" ry="4"/>
          <path d="M-4,-6 L-5,6 L5,6 L4,-6Z"/>
          <ellipse cx="6" cy="0" rx="4.5" ry="5.5" fill="#3a2a1a" opacity="0.7"/>
          <line x1="3" y1="-7" x2="10" y2="4" stroke="#3a2a1a" strokeWidth="1"/>
        </g>
      </g>
      <path d="M0,240 L400,240 L400,300 L0,300Z" fill="#1a2a1a" opacity="0.5"/>
      <rect width="400" height="300" fill="url(#rs-warm)"/>
    </svg>
  );
}

export function BarCampfireSVG() {
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
      {[[50,15,1],[130,28,0.7],[220,10,1.1],[320,22,0.8],[380,32,0.6]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.5"/>
      )}
      <g transform="translate(0, 80)">
        <rect x="180" y="20" width="200" height="100" fill="#2a2a22" opacity="0.7" rx="1"/>
        {[40,65,90].map(y => (
          <g key={y}>
            <rect x="190" y={y} width="180" height="2" fill="#6a5a4a" opacity="0.4"/>
            {[200,220,240,260,280,300,320,340,350].map((bx,i) =>
              <rect key={i} x={bx} y={y-12} width={4} height={12} fill="#d4b85e" opacity={0.05 + (i%3)*0.03} rx="0.5"/>
            )}
          </g>
        ))}
        <rect x="50" y="115" width="330" height="10" fill="#5a4a3a" opacity="0.8" rx="2"/>
        <rect x="55" y="117" width="320" height="5" fill="#d4b85e" opacity="0.04"/>
        {[90,140,190,240,290,340].map(x => (
          <g key={x}>
            <rect x={x-3} y="126" width="6" height="20" fill="#4a3a2a" opacity="0.5" rx="1"/>
            <rect x={x-6} y="124" width="12" height="4" fill="#5a4a3a" opacity="0.6" rx="1"/>
          </g>
        ))}
        {[100,160,220,280,340].map((cx,i) =>
          <circle key={cx} cx={cx} cy="18" r="2.5" fill="#d4b85e" opacity={0.3 + (i%2)*0.1}/>
        )}
      </g>
      <rect x="20" y="100" width="130" height="80" fill="#1a2a2a" opacity="0.3" rx="2"/>
      <g transform="translate(80, 100)" opacity="0.3">
        <path d="M0,60 Q-1,40 0,20 Q1,5 3,-5" fill="none" stroke="#5a4a3a" strokeWidth="2"/>
        <ellipse cx="3" cy="-10" rx="20" ry="14" fill="#3a5a3a" opacity="0.5"/>
      </g>
      <rect x="0" y="250" width="400" height="50" fill="#1a2a1a" opacity="0.5"/>
      <rect width="400" height="300" fill="url(#bar-glow)"/>
    </svg>
  );
}

export function YogaDeckSVG() {
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
      <path d="M0,160 Q100,140 200,155 Q300,135 400,150 L400,180 L0,180Z" fill="#2a4a3a" opacity="0.4"/>
      <g opacity="0.15" stroke="#6b8f5e" strokeWidth="0.5" fill="none">
        <path d="M0,175 Q100,170 200,174 Q300,168 400,173"/>
        <path d="M0,182 Q100,178 200,181 Q300,176 400,180"/>
      </g>
      <g transform="translate(60, 170)">
        <rect x="0" y="0" width="280" height="80" fill="#5a4a3a" opacity="0.3" rx="2"/>
        {[0,8,16,24,32,40,48,56,64,72].map(y =>
          <line key={y} x1="5" y1={y+3} x2="275" y2={y+3} stroke="#6a5a4a" strokeWidth="0.5" opacity="0.3"/>
        )}
        {[10,140,270].map(x =>
          <rect key={x} x={x-2} y="-5" width="4" height="90" fill="#5a4a3a" opacity="0.4" rx="1"/>
        )}
        <g transform="translate(140, 20)" opacity="0.5" fill="#1a1a12">
          <ellipse cx="0" cy="-18" rx="4" ry="5"/>
          <path d="M-6,-12 Q-8,-4 -12,0 L12,0 Q8,-4 6,-12Z"/>
          <ellipse cx="0" cy="2" rx="14" ry="4" opacity="0.3"/>
          <line x1="-6" y1="-10" x2="-16" y2="-5" stroke="#1a1a12" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="6" y1="-10" x2="16" y2="-5" stroke="#1a1a12" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      </g>
      <circle cx="200" cy="130" r="25" fill="#d4b85e" opacity="0.15"/>
      <circle cx="200" cy="130" r="12" fill="#f5f0e8" opacity="0.3"/>
      <rect x="0" y="260" width="400" height="40" fill="#1a2a1a" opacity="0.6"/>
    </svg>
  );
}

export function PlungePoolSVG() {
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
      {[[60,100,25,18],[120,90,30,22],[300,95,28,20],[350,105,22,16]].map(([cx,cy,rx,ry],i) =>
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#3a5a3a" opacity="0.4"/>
      )}
      {[[40,120],[160,100],[340,115]].map(([cx,cy],i) => (
        <g key={i} opacity="0.4">
          <path d={`M${cx},${cy+40} Q${cx-5},${cy+10} ${cx-15},${cy-5}`} fill="none" stroke="#4a6741" strokeWidth="1.5"/>
          <path d={`M${cx},${cy+40} Q${cx+3},${cy+15} ${cx+12},${cy}`} fill="none" stroke="#3a5a3a" strokeWidth="1.5"/>
          <ellipse cx={cx-12} cy={cy-5} rx="8" ry="4" fill="#4a6741" opacity="0.5" transform={`rotate(-20,${cx-12},${cy-5})`}/>
          <ellipse cx={cx+10} cy={cy} rx="7" ry="3.5" fill="#3a5a3a" opacity="0.5" transform={`rotate(15,${cx+10},${cy})`}/>
        </g>
      ))}
      <g transform="translate(80, 140)">
        <rect x="-15" y="-10" width="270" height="110" fill="#5a4a3a" opacity="0.25" rx="3"/>
        <rect x="0" y="0" width="240" height="80" fill="url(#pp-water)" rx="4"/>
        <rect x="0" y="0" width="240" height="80" fill="none" stroke="#3a7a8a" strokeWidth="1.5" opacity="0.4" rx="4"/>
        <path d="M20,30 Q60,25 100,30 Q140,25 180,30 Q200,25 220,30" fill="none" stroke="#f5f0e8" strokeWidth="0.4" opacity="0.12"/>
        <path d="M30,50 Q70,45 110,50 Q150,45 190,50 Q210,47 220,50" fill="none" stroke="#f5f0e8" strokeWidth="0.3" opacity="0.08"/>
        <rect x="245" y="15" width="8" height="28" fill="#6a5a4a" opacity="0.3" rx="1"/>
        <rect x="245" y="50" width="8" height="28" fill="#6a5a4a" opacity="0.3" rx="1"/>
      </g>
      <rect x="0" y="260" width="400" height="40" fill="#1a2a1a" opacity="0.5"/>
    </svg>
  );
}

export function CampfireCircleSVG() {
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
      {[[20,15,1.2],[65,30,0.6],[110,10,0.9],[155,25,0.7],[200,8,1.4],[245,20,0.8],[290,12,1],[335,28,0.6],[380,18,0.9],[50,45,0.5],[170,38,0.7],[320,40,0.8]].map(([cx,cy,r],i) =>
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f0e8" opacity="0.6"/>
      )}
      <path d="M0,170 Q100,165 200,168 Q300,163 400,170 L400,300 L0,300Z" fill="#1a2a1a" opacity="0.6"/>
      {[[80,140,30],[320,145,28]].map(([cx,cy,w],i) => (
        <g key={i} opacity="0.25">
          <rect x={cx-w/2} y={cy} width={w} height={20} fill="#2a2a1a"/>
          <path d={`M${cx-w/2-4},${cy+2} L${cx},${cy-12} L${cx+w/2+4},${cy+2}`} fill="#3a3a2a"/>
        </g>
      ))}
      <g transform="translate(200, 200)">
        {[[-16,5],[-12,8],[-4,10],[4,10],[12,8],[16,5],[12,1],[4,-1],[-4,-1],[-12,1]].map(([cx,cy],i) =>
          <circle key={i} cx={cx} cy={cy} r={3.5} fill="#6a5a4a" opacity="0.5"/>
        )}
        <ellipse cx="0" cy="2" rx="40" ry="20" fill="#d4b85e" opacity="0.04"/>
        <ellipse cx="0" cy="0" rx="20" ry="12" fill="#c4714a" opacity="0.1"/>
        <path d="M-6,3 Q-9,-12 -4,-22 Q-1,-15 3,-22 Q8,-12 6,3Z" fill="#d4956e" opacity="0.6"/>
        <path d="M-4,2 Q-5,-8 0,-16 Q5,-8 4,2Z" fill="#d4b85e" opacity="0.5"/>
        <path d="M-2,1 Q0,-8 2,1Z" fill="#f5f0e8" opacity="0.4"/>
        {[[-45,-10],[-30,-18],[30,-18],[45,-10],[-40,10],[40,10]].map(([px,py],i) => (
          <g key={i} transform={`translate(${px}, ${py})`} opacity={0.3 + (i%2)*0.1}>
            <path d="M-3,3 Q-3,-3 -1,-8 L2,-8 Q4,-3 3,3Z" fill="#1a1a12"/>
            <ellipse cx="0.5" cy="-11" rx="3" ry="3.5" fill="#1a1a12"/>
          </g>
        ))}
      </g>
      <rect width="400" height="300" fill="url(#cc-glow)"/>
    </svg>
  );
}
