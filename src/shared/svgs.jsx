export function ChangGharSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Two-storey chang ghar on stilts">
      <defs>
        <linearGradient id="cg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a9cfe0"/>
          <stop offset="65%" stopColor="#e8dcc8"/>
          <stop offset="100%" stopColor="#f0d9b5"/>
        </linearGradient>
        <pattern id="cg-bamboo" width="6" height="30" patternUnits="userSpaceOnUse">
          <line x1="2" y1="0" x2="2" y2="30" stroke="#5a4028" strokeWidth="0.5" opacity="0.35"/>
          <line x1="4.5" y1="0" x2="4.5" y2="30" stroke="#8a6a44" strokeWidth="0.4" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#cg-sky)"/>
      {/* Hills */}
      <path d="M0,150 Q60,95 130,120 Q200,80 270,112 Q330,90 400,125 L400,200 L0,200Z" fill="#6f8f7a" opacity="0.55"/>
      <path d="M0,175 Q100,150 200,165 Q300,148 400,170 L400,210 L0,210Z" fill="#5f8a5a" opacity="0.6"/>
      {/* Garden ground */}
      <path d="M0,228 Q100,222 200,226 Q300,220 400,228 L400,300 L0,300Z" fill="#7aaa6e"/>
      <path d="M0,240 Q200,232 400,242 L400,300 L0,300Z" fill="#6a9a5e" opacity="0.6"/>
      {/* Trees */}
      {[[50,170,18],[92,182,12],[330,174,16],[368,186,11]].map(([cx,cy,r],i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx} y2={cy+50} stroke="#6a4a2a" strokeWidth="2.5"/>
          <ellipse cx={cx} cy={cy} rx={r} ry={r*1.25} fill={i%2 ? "#4a7a44" : "#3f6b3a"}/>
        </g>
      ))}
      <g transform="translate(200, 0)">
        {/* Stilts */}
        {[-70,-40,-10,20,50,70].map(x => (
          <rect key={x} x={x-2.5} y="186" width="5" height="44" fill="#6a4a2a"/>
        ))}
        <line x1="-70" y1="214" x2="70" y2="214" stroke="#6a4a2a" strokeWidth="2" opacity="0.7"/>
        {/* Stairs to the raised floor */}
        {[0,1,2,3,4,5].map(i => (
          <rect key={i} x={84+i*4} y={190+i*7} width="16" height="3" fill="#8a6a44"/>
        ))}
        <line x1="82" y1="188" x2="106" y2="230" stroke="#6a4a2a" strokeWidth="2"/>
        {/* Ground (raised) floor */}
        <rect x="-80" y="180" width="168" height="7" fill="#8a6a44"/>
        <rect x="-74" y="132" width="148" height="48" fill="#c9a46a"/>
        <rect x="-74" y="132" width="148" height="48" fill="url(#cg-bamboo)"/>
        <rect x="-58" y="146" width="22" height="20" fill="#3f5f6a" opacity="0.75" rx="1"/>
        <rect x="-18" y="142" width="26" height="38" fill="#5a4028" rx="1"/>
        <rect x="26" y="146" width="22" height="20" fill="#3f5f6a" opacity="0.75" rx="1"/>
        {/* Upper floor verandah + railing */}
        <rect x="-86" y="126" width="172" height="6" fill="#8a6a44"/>
        <rect x="-66" y="84" width="132" height="42" fill="#d4b37a"/>
        <rect x="-66" y="84" width="132" height="42" fill="url(#cg-bamboo)"/>
        <rect x="-48" y="94" width="20" height="18" fill="#3f5f6a" opacity="0.75" rx="1"/>
        <rect x="-10" y="94" width="20" height="18" fill="#3f5f6a" opacity="0.75" rx="1"/>
        <rect x="28" y="94" width="20" height="18" fill="#3f5f6a" opacity="0.75" rx="1"/>
        <line x1="-86" y1="114" x2="86" y2="114" stroke="#6a4a2a" strokeWidth="1.5"/>
        {Array.from({ length: 18 }, (_, i) => -84 + i * 10).map(x => (
          <line key={x} x1={x} y1="114" x2={x} y2="126" stroke="#6a4a2a" strokeWidth="1"/>
        ))}
        {/* Steep thatched roof */}
        <path d="M-98,88 L0,30 L98,88Z" fill="#9a7a42"/>
        <path d="M-98,88 L0,30 L98,88" fill="none" stroke="#6a4a2a" strokeWidth="2"/>
        {[-72, -48, -24, 0, 24, 48, 72].map(x => (
          <line key={x} x1="0" y1="34" x2={x} y2="86" stroke="#7a5a2a" strokeWidth="0.6" opacity="0.6"/>
        ))}
      </g>
      {/* Path */}
      {[[290,252],[300,262],[312,272],[326,284]].map(([cx,cy],i) =>
        <ellipse key={i} cx={cx} cy={cy} rx={9} ry={3.5} fill="#e8dcc8" opacity="0.8"/>
      )}
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

export function FishPondSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="fp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a3a"/>
          <stop offset="70%" stopColor="#2a4a5a"/>
          <stop offset="100%" stopColor="#2a3a3a"/>
        </linearGradient>
        <radialGradient id="fp-water" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#3a7a8a" stopOpacity="0.75"/>
          <stop offset="100%" stopColor="#1a3a4a" stopOpacity="0.9"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#fp-sky)"/>
      {/* Garden behind */}
      {[[60,100,25,18],[120,90,30,22],[300,95,28,20],[350,105,22,16]].map(([cx,cy,rx,ry],i) =>
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#3a5a3a" opacity="0.45"/>
      )}
      <rect x="0" y="130" width="400" height="170" fill="#22331f" opacity="0.7"/>
      <g transform="translate(200,205) scale(1.3) translate(-200,-205)">
      {/* River-stone edge */}
      {Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 2;
        return <ellipse key={i} cx={200 + Math.cos(a) * 138} cy={205 + Math.sin(a) * 62} rx="11" ry="6" fill="#8a7a6a" opacity="0.55"/>;
      })}
      {/* Pond */}
      <ellipse cx="200" cy="205" rx="130" ry="56" fill="url(#fp-water)"/>
      <path d="M110,200 Q160,194 210,200 Q250,195 290,201" fill="none" stroke="#f5f0e8" strokeWidth="0.5" opacity="0.18"/>
      <path d="M130,222 Q180,216 230,222 Q260,218 280,222" fill="none" stroke="#f5f0e8" strokeWidth="0.4" opacity="0.12"/>
      {/* Lily pads */}
      {[[130,190,14],[150,226,10],[268,218,13],[250,188,9]].map(([cx,cy,r],i) => (
        <path key={i} d={`M${cx},${cy} L${cx+r},${cy-2} A${r},${r*0.55} 0 1,1 ${cx+r*0.9},${cy+3} Z`} fill="#5a8a4a" opacity="0.85"/>
      ))}
      <circle cx="268" cy="214" r="3.5" fill="#e8b4c8" opacity="0.9"/>
      {/* Fish */}
      {[[190,198,1],[222,214,-1],[176,222,1]].map(([x,y,d],i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${d},1)`}>
          <ellipse cx="0" cy="0" rx="9" ry="3.5" fill={i === 1 ? "#f5f0e8" : "#d4743a"} opacity="0.9"/>
          <path d="M-8,0 L-14,-4 L-14,4 Z" fill={i === 1 ? "#f5f0e8" : "#d4743a"} opacity="0.9"/>
          {i === 1 && <ellipse cx="2" cy="-0.5" rx="3" ry="1.6" fill="#d4743a"/>}
        </g>
      ))}
      {/* Reeds */}
      {[[72,190],[80,186],[330,192],[338,188]].map(([x,y],i) => (
        <g key={i}>
          <line x1={x} y1={y+30} x2={x+(i%2?3:-3)} y2={y-18} stroke="#6a8a4a" strokeWidth="1.5" opacity="0.7"/>
          <ellipse cx={x+(i%2?3:-3)} cy={y-20} rx="2" ry="5" fill="#7a5a3a" opacity="0.8"/>
        </g>
      ))}
      </g>
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
