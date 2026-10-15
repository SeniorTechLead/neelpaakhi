export function ChangGharSVG() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Two-storey chang ghar with balconies on both floors">
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
      {/* Narrow road along the left side, lined with trees */}
      <path d="M62,226 L76,226 L52,300 L4,300 Z" fill="#d9c9a8"/>
      <path d="M62,226 L4,300 M76,226 L52,300" stroke="#b8a888" strokeWidth="1" fill="none"/>
      {[[58,228,7],[46,242,9],[32,259,12],[14,281,16]].map(([bx,by,r],i) => (
        <g key={`r${i}`}>
          <line x1={bx} y1={by - r * 2.2} x2={bx} y2={by} stroke="#6a4a2a" strokeWidth={1.2 + i * 0.6}/>
          <ellipse cx={bx} cy={by - r * 2.4} rx={r} ry={r * 1.25} fill={i % 2 ? "#4a7a44" : "#3f6b3a"}/>
        </g>
      ))}
      {/* Garden trees on the right */}
      {[[330,174,16],[368,186,11]].map(([cx,cy,r],i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx} y2={cy+50} stroke="#6a4a2a" strokeWidth="2.5"/>
          <ellipse cx={cx} cy={cy} rx={r} ry={r*1.25} fill={i%2 ? "#4a7a44" : "#3f6b3a"}/>
        </g>
      ))}
      <g transform="translate(200, 44)">
        {/* Ground-floor deck and front step */}
        <rect x="-98" y="180" width="196" height="8" fill="#8a6a44"/>
        <rect x="-16" y="188" width="22" height="4" fill="#8a6a44"/>
        {/* Ground floor */}
        <rect x="-74" y="132" width="148" height="48" fill="#c9a46a"/>
        <rect x="-74" y="132" width="148" height="48" fill="url(#cg-bamboo)"/>
        <rect x="-58" y="146" width="22" height="20" fill="#3f5f6a" opacity="0.75" rx="1"/>
        <rect x="-18" y="142" width="26" height="38" fill="#5a4028" rx="1"/>
        <rect x="26" y="146" width="22" height="20" fill="#3f5f6a" opacity="0.75" rx="1"/>
        {/* Ground-floor balcony: corner posts and railing, open at the door */}
        {[-95, 91].map(x => <rect key={x} x={x} y="132" width="4" height="48" fill="#6a4a2a"/>)}
        <line x1="-96" y1="166" x2="-22" y2="166" stroke="#6a4a2a" strokeWidth="1.5"/>
        <line x1="12" y1="166" x2="96" y2="166" stroke="#6a4a2a" strokeWidth="1.5"/>
        {[...Array.from({ length: 10 }, (_, i) => -90 + i * 7.5), ...Array.from({ length: 11 }, (_, i) => 16 + i * 7.5)].map(x => (
          <line key={x} x1={x} y1="166" x2={x} y2="180" stroke="#6a4a2a" strokeWidth="1"/>
        ))}
        {/* Upper floor and its balcony */}
        <rect x="-98" y="126" width="196" height="6" fill="#8a6a44"/>
        <rect x="-66" y="84" width="132" height="42" fill="#d4b37a"/>
        <rect x="-66" y="84" width="132" height="42" fill="url(#cg-bamboo)"/>
        <rect x="-48" y="94" width="20" height="18" fill="#3f5f6a" opacity="0.75" rx="1"/>
        <rect x="-10" y="94" width="20" height="18" fill="#3f5f6a" opacity="0.75" rx="1"/>
        <rect x="28" y="94" width="20" height="18" fill="#3f5f6a" opacity="0.75" rx="1"/>
        {[-95, 91].map(x => <rect key={x} x={x} y="88" width="4" height="38" fill="#6a4a2a"/>)}
        <line x1="-96" y1="114" x2="96" y2="114" stroke="#6a4a2a" strokeWidth="1.5"/>
        {Array.from({ length: 25 }, (_, i) => -90 + i * 7.5).map(x => (
          <line key={x} x1={x} y1="114" x2={x} y2="126" stroke="#6a4a2a" strokeWidth="1"/>
        ))}
        {/* Steep thatched roof, wide enough to shelter the balcony */}
        <path d="M-108,88 L0,30 L108,88Z" fill="#9a7a42"/>
        <path d="M-108,88 L0,30 L108,88" fill="none" stroke="#6a4a2a" strokeWidth="2"/>
        {[-80, -54, -27, 0, 27, 54, 80].map(x => (
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
        {/* Bar counter */}
        <rect x="44" y="140" width="70" height="30" fill="#5a4a3a" opacity="0.6" rx="1"/>
        <rect x="42" y="137" width="74" height="4" fill="#8a6a44" opacity="0.6" rx="1"/>
        {[52,62,70,80,90,100].map((x,i) =>
          <rect key={x} x={x} y={i%2 ? 127 : 124} width="4" height={i%2 ? 10 : 13} rx="1" fill="#d4b85e" opacity="0.25"/>
        )}
      </g>
      <path d="M0,240 L400,240 L400,300 L0,300Z" fill="#1a2a1a" opacity="0.5"/>
      <rect width="400" height="300" fill="url(#rs-warm)"/>
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
      {/* Stone coping around a rectangular pond */}
      <rect x="62" y="148" width="276" height="118" rx="3" fill="#8a7a6a" opacity="0.6"/>
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={62 + i * 23} y1="148" x2={62 + i * 23} y2="160" stroke="#5a4a3a" strokeWidth="1" opacity="0.5"/>
      ))}
      {/* Water */}
      <rect x="76" y="160" width="248" height="94" rx="2" fill="url(#fp-water)"/>
      <rect x="76" y="160" width="248" height="94" rx="2" fill="none" stroke="#1a3a4a" strokeWidth="2" opacity="0.6"/>
      <path d="M95,185 Q150,180 205,185 Q260,180 305,185" fill="none" stroke="#f5f0e8" strokeWidth="0.6" opacity="0.18"/>
      <path d="M105,230 Q160,225 215,230 Q265,226 300,230" fill="none" stroke="#f5f0e8" strokeWidth="0.5" opacity="0.12"/>
      {/* Lily pads */}
      {[[105,180,15],[120,236,12],[292,226,16],[270,178,11]].map(([cx,cy,r],i) => (
        <path key={i} d={`M${cx},${cy} L${cx+r},${cy-2} A${r},${r*0.55} 0 1,1 ${cx+r*0.9},${cy+3} Z`} fill="#5a8a4a" opacity="0.85"/>
      ))}
      <circle cx="292" cy="221" r="4.5" fill="#e8b4c8" opacity="0.9"/>
      {/* Fish */}
      {[[185,196,1],[232,214,-1],[165,226,1]].map(([x,y,d],i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${d * 1.3},1.3)`}>
          <ellipse cx="0" cy="0" rx="9" ry="3.5" fill={i === 1 ? "#f5f0e8" : "#d4743a"} opacity="0.9"/>
          <path d="M-8,0 L-14,-4 L-14,4 Z" fill={i === 1 ? "#f5f0e8" : "#d4743a"} opacity="0.9"/>
          {i === 1 && <ellipse cx="2" cy="-0.5" rx="3" ry="1.6" fill="#d4743a"/>}
        </g>
      ))}
      {/* Reeds */}
      {[[50,170],[56,166],[346,172],[352,168]].map(([x,y],i) => (
        <g key={i}>
          <line x1={x} y1={y+30} x2={x+(i%2?3:-3)} y2={y-18} stroke="#6a8a4a" strokeWidth="1.5" opacity="0.7"/>
          <ellipse cx={x+(i%2?3:-3)} cy={y-20} rx="2" ry="5" fill="#7a5a3a" opacity="0.8"/>
        </g>
      ))}
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
      {/* Trees around the garden */}
      {[[70,150,16],[110,158,11],[300,152,14],[340,160,10]].map(([cx,cy,r],i) => (
        <g key={i} opacity="0.35">
          <line x1={cx} y1={cy} x2={cx} y2={cy+20} stroke="#2a2a1a" strokeWidth="2"/>
          <ellipse cx={cx} cy={cy} rx={r} ry={r*1.2} fill="#2a3a2a"/>
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
