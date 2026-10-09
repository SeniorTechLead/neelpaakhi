import { useState, useEffect } from "react";
import { P, font, navigate } from "../shared/theme.js";
import { useMobile } from "../shared/hooks.js";
import FadeIn from "../shared/FadeIn.jsx";
import PageShell from "../shared/PageShell.jsx";
import Newsletter from "../shared/Newsletter.jsx";
import { BoundaryCottageSVG, RestaurantSVG, YogaDeckSVG } from "../shared/svgs.jsx";

export default function Home() {
  const mobile = useMobile();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = 1 + scrollY * 0.0003;

  return (
    <PageShell>
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

              {/* Restaurant + Bar interior */}
              <rect x="100" y="410" width="300" height="80" fill="#2a2a22" opacity="0.85"/>
              <rect x="100" y="410" width="8" height="80" fill="#8a5a3a" opacity="0.6"/>
              {[140,220,300,380].map(x => <rect key={x} x={x} y="420" width="6" height="70" fill="#6a5a4a" opacity="0.7"/>)}

              {/* Roof overhang */}
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

        {/* Firefly particles */}
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

      {/* TEASER CARDS */}
      <section style={{
        padding: "120px 24px",
        background: `linear-gradient(180deg, ${P.deep} 0%, ${P.warm} 50%, ${P.deep} 100%)`,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>DISCOVER</div>
              <h2 style={{ fontFamily: font.display, fontSize: 42, fontWeight: 400, color: P.cream }}>
                A world built on <span style={{ fontStyle: "italic", color: P.goldLight }}>sound, soil, and stillness</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 24 }}>
            {[
              {
                title: "The Cottages",
                desc: "Fifteen bamboo cottages — eleven along the boundary, four around the campfire. Handcrafted. Unhurried.",
                link: "/rooms",
                label: "ACCOMMODATIONS",
                Svg: BoundaryCottageSVG,
              },
              {
                title: "Dining & Music",
                desc: "A restaurant and bar with a stage in the corner, and a second stage under the jacaranda tree where the cottage verandahs become the gallery.",
                link: "/dining",
                label: "THE TABLE & THE STAGE",
                Svg: RestaurantSVG,
              },
              {
                title: "Experiences & Retreats",
                desc: "Yoga at sunrise. Brahmaputra boat rides. Weaving workshops. Campfire circles. Corporate offsites and wellness retreats designed around your intention.",
                link: "/experiences",
                label: "EXPERIENCES & RETREATS",
                Svg: YogaDeckSVG,
              },
              {
                title: "Our Story",
                desc: "Built for those who remember a slower world — where Bhupen Hazarika on the radio could stop an entire household.",
                link: "/our-story",
                label: "THE AZURE FEATHER",
                icon: (
                  <div style={{
                    aspectRatio: "4/3",
                    background: `linear-gradient(135deg, ${P.river} 0%, ${P.bamboo}88 50%, ${P.terracotta}44 100%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="48" height="64" viewBox="0 0 48 64" style={{ opacity: 0.7 }}>
                      <path d="M24,62 Q23,50 22,38 Q20,28 16,20 Q12,12 6,6 Q14,10 20,16 Q24,20 26,28 Q27,20 30,14 Q34,8 42,4 Q36,12 32,20 Q28,28 26,38 Q25,50 24,62Z" fill={P.gold} opacity="0.75"/>
                      <path d="M24,62 Q23,42 20,24 Q16,14 6,6" fill="none" stroke={P.goldLight} strokeWidth="1" opacity="0.6"/>
                    </svg>
                  </div>
                ),
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div
                  onClick={() => navigate(card.link)}
                  style={{
                    background: P.warm,
                    border: `1px solid ${P.gold}11`,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${P.gold}33`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${P.gold}11`; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                    {card.Svg ? <card.Svg /> : card.icon}
                  </div>
                  <div style={{ padding: 28 }}>
                    <div style={{ fontFamily: font.body, fontSize: 9, letterSpacing: 4, color: P.gold, marginBottom: 10 }}>{card.label}</div>
                    <h3 style={{ fontFamily: font.display, fontSize: 24, fontStyle: "italic", color: P.goldLight, marginBottom: 12 }}>{card.title}</h3>
                    <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.8, color: P.muted, marginBottom: 16 }}>{card.desc}</p>
                    <div style={{
                      fontFamily: font.body, fontSize: 10, letterSpacing: 3, color: P.gold,
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                      DISCOVER MORE
                      <span style={{ fontSize: 14, transition: "transform 0.3s" }}>{"\u2192"}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
