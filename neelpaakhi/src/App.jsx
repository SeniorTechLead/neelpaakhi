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

const rooms = [
  { name: "Brahmaputra", size: "300 sq ft", bed: "King", desc: "West-facing balcony captures the morning light filtering through bamboo screens. River stone bathroom. Handwoven cotton bedlinen.", price: "3,500" },
  { name: "Kamakhya", size: "300 sq ft", bed: "Twin", desc: "Heritage Assamese motifs in hand-painted terracotta tiles. Jali screen balcony. Brass accents and gamosa textile art.", price: "3,500" },
  { name: "Kaziranga", size: "300 sq ft", bed: "King", desc: "Overlooks the central courtyard. Wildlife-inspired murals by local artists. Teak wood furniture. Private reading nook.", price: "3,500" },
  { name: "Bihu Suite", size: "450 sq ft", bed: "King", desc: "Cultural suite celebrating Assam's harvest festival. Outdoor shower garden. Hand-embroidered wall panels. Private dining balcony.", price: "5,500", suite: true },
  { name: "Neel Paakhi Suite", size: "480 sq ft", bed: "King", desc: "The signature suite. Freestanding bathtub. Private terrace with daybed. Muga silk drapes catch the evening breeze. Bamboo ceiling.", price: "6,000", suite: true },
];

const musicSchedule = [
  { day: "Xomoy Fridays", desc: "Assamese folk night. Jayanta Hazarika tributes. Local artists. Bihu rhythms around the fire.", icon: "\u{1F3B6}" },
  { day: "Purano Din Saturdays", desc: "Bengali evening by candlelight. Rabindrasangeet. Hemanta Mukherjee. Manna Dey. Nachiketa. Anjan Dutt. Tagore set to acoustic guitar.", icon: "\u{1F56F}\uFE0F" },
  { day: "Pahadi Sundays", desc: "Nepali and hill songs. Narayan Gopal. New-age Nepali indie. Acoustic and intimate.", icon: "\u26F0\uFE0F" },
];

export default function NeelPaakhiWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeRoom, setActiveRoom] = useState(0);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState(null);
  const [subMsg, setSubMsg] = useState("");

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
          <span onClick={() => scrollTo("book")} style={{
            fontFamily: font.body, fontSize: 11, letterSpacing: 2,
            padding: "8px 20px", border: `1px solid ${P.gold}`, color: P.gold,
            cursor: "pointer", transition: "all 0.3s",
          }}
          onMouseEnter={(e) => { e.target.style.background = P.gold; e.target.style.color = P.deep; }}
          onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = P.gold; }}
          >RESERVE</span>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        height: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
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

              {/* Restaurant under bamboo pergola */}
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

              {/* Main building (north wing G+2) */}
              <rect x="600" y="340" width="400" height="158" fill="#2a2a22" opacity="0.9"/>

              {/* Jali screen band */}
              <rect x="600" y="380" width="400" height="30" fill="url(#jaliP)" opacity="0.35"/>

              {/* First floor windows */}
              {[[620,0.25],[670,0.35],[720,0.2],[820,0.3],[870,0.15],[920,0.28]].map(([x,op],i) =>
                <rect key={`f1-${i}`} x={x} y="350" width="30" height="24" fill="#d4b85e" opacity={op} rx="1"/>
              )}

              {/* Ground floor windows */}
              {[[620,0.15,30],[670,0.12,60],[820,0.1,30],[870,0.18,30],[920,0.08,30]].map(([x,op,w],i) =>
                <rect key={`g-${i}`} x={x} y="430" width={w} height="28" fill="#d4b85e" opacity={op} rx="1"/>
              )}

              {/* Second floor */}
              <rect x="620" y="270" width="360" height="70" fill="#2a2a22" opacity="0.85"/>
              <rect x="635" y="280" width="45" height="30" fill="#d4b85e" opacity="0.22" rx="1"/>
              <rect x="700" y="280" width="45" height="30" fill="#d4b85e" opacity="0.18" rx="1"/>
              <line x1="630" y1="312" x2="750" y2="312" stroke="#b8943e" strokeWidth="0.8" opacity="0.3"/>
              <rect x="820" y="280" width="40" height="25" fill="#3a7a8a" opacity="0.15" rx="1"/>
              <rect x="880" y="280" width="40" height="25" fill="#3a7a8a" opacity="0.1" rx="1"/>

              {/* Sloped roof */}
              <path d="M610,270 L800,230 L990,270" fill="#3a2a1a" opacity="0.8"/>
              <path d="M780,240 L800,230 L820,240" fill="none" stroke="#b8943e" strokeWidth="1" opacity="0.4"/>

              {/* Solar panels */}
              <g opacity="0.25">
                <rect x="830" y="240" width="60" height="20" fill="#2a3a4a" rx="1" transform="rotate(-8, 860, 250)"/>
                <rect x="900" y="242" width="50" height="18" fill="#2a3a4a" rx="1" transform="rotate(-8, 925, 251)"/>
              </g>

              {/* Rooftop garden */}
              <ellipse cx="660" cy="255" rx="15" ry="10" fill="#3a5a3a" opacity="0.4"/>
              <ellipse cx="690" cy="258" rx="10" ry="8" fill="#2a4a2a" opacity="0.4"/>

              {/* Bamboo cladding texture */}
              <rect x="600" y="340" width="400" height="158" fill="url(#bambooP)" opacity="0.15"/>

              {/* Lobby entrance glow */}
              <rect x="760" y="440" width="40" height="50" fill="#d4b85e" opacity="0.1" rx="3"/>
              <path d="M760,440 Q780,430 800,440" fill="none" stroke="#b8943e" strokeWidth="1" opacity="0.4"/>

              {/* Warm glow overlay on building */}
              <rect x="600" y="340" width="400" height="160" fill="url(#warmglow)"/>
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

            {/* Water reflection */}
            <rect x="0" y="680" width="1600" height="220" fill="url(#waterG)" opacity="0.4"/>
            <g opacity="0.08" stroke="#d4b85e" strokeWidth="0.5" fill="none">
              <path d="M200,710 Q500,705 800,712 Q1100,706 1400,710"/>
              <path d="M100,740 Q400,735 700,742 Q1000,736 1300,740"/>
              <path d="M0,770 Q300,765 600,772 Q900,766 1200,770"/>
            </g>

            {/* Mist */}
            <rect x="0" y="470" width="1600" height="60" fill="#2a4a5a" opacity="0.08"/>

            {/* Dark overlay gradient for text readability at bottom */}
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
            Where acoustic melodies dissolve into the azure sky,
            and every breath carries the scent of bamboo and river stone.
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16, textTransform: "uppercase" }}>
                  Our Story
                </div>
                <h2 style={{ fontFamily: font.display, fontSize: 38, fontWeight: 400, lineHeight: 1.2, marginBottom: 24, color: P.cream }}>
                  Built for those who<br /><span style={{ fontStyle: "italic", color: P.goldLight }}>forgot how to pause</span>
                </h2>
                <div style={{ width: 50, height: 1, background: P.gold, marginBottom: 24 }} />
                <p style={{ fontFamily: font.accent, fontSize: 17, lineHeight: 1.9, color: P.muted, marginBottom: 16 }}>
                  Neel Paakhi was born from a simple conviction: that the right song,
                  played in the right place, at the right hour, can undo months of accumulated tension.
                </p>
                <p style={{ fontFamily: font.accent, fontSize: 17, lineHeight: 1.9, color: P.muted }}>
                  On the quiet north bank of the Brahmaputra, where paddy fields stretch
                  to the horizon and the air still carries the unhurried rhythm of village life,
                  we are building a retreat that heals through sound, space, and soil.
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
                {[
                  { title: "Breathe", icon: "\u{1F32C}\uFE0F", text: "Every space opens to sky. Bamboo jali screens. Cross-ventilation as architecture." },
                  { title: "Listen", icon: "\u{1F3B5}", text: "The acoustic stage is the heart. Music flows through the courtyard into your room." },
                  { title: "Root", icon: "\u{1F331}", text: "Bamboo, river stone, Muga silk, gamosa patterns. Every surface tells an Assamese story." },
                  { title: "Heal", icon: "\u2728", text: "Spa, yoga, campfire, stargazing. Every corner dissolves stress, reconnects with self." },
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
                Ten rooms. <span style={{ fontStyle: "italic", color: P.goldLight }}>Ten stories.</span>
              </h2>
              <p style={{ fontFamily: font.accent, fontSize: 16, color: P.muted, marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>
                Each room is named after an Assamese landmark and carries its spirit in every detail.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            {/* Room selector */}
            <div style={{ display: "flex", gap: 0, marginBottom: 40, justifyContent: "center" }}>
              {rooms.map((r, i) => (
                <button key={i} onClick={() => setActiveRoom(i)} style={{
                  background: activeRoom === i ? P.gold : "transparent",
                  color: activeRoom === i ? P.deep : P.muted,
                  border: `1px solid ${activeRoom === i ? P.gold : P.gold + "33"}`,
                  padding: "10px 20px",
                  fontFamily: font.accent, fontSize: 13, letterSpacing: 1,
                  cursor: "pointer", transition: "all 0.3s ease",
                  borderLeft: i === 0 ? undefined : "none",
                }}>
                  {r.name}
                </button>
              ))}
            </div>

            {/* Room detail */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
              minHeight: 380,
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${P.river}cc 0%, ${rooms[activeRoom].suite ? P.terracotta : P.bamboo}44 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
                transition: "background 0.6s ease",
              }}>
                <div style={{
                  position: "absolute", inset: 30,
                  border: `1px solid ${P.gold}22`,
                }} />
                <div style={{ textAlign: "center", zIndex: 1 }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>{rooms[activeRoom].suite ? "\u{1F451}" : "\u{1F6CF}\uFE0F"}</div>
                  <div style={{ fontFamily: font.display, fontSize: 28, fontStyle: "italic", color: P.goldLight }}>{rooms[activeRoom].name}</div>
                  <div style={{ fontFamily: font.body, fontSize: 11, letterSpacing: 3, color: P.muted, marginTop: 8 }}>{rooms[activeRoom].size}</div>
                </div>
              </div>
              <div style={{
                padding: 48, display: "flex", flexDirection: "column", justifyContent: "center",
                background: `${P.warm}`,
                border: `1px solid ${P.gold}11`,
                borderLeft: "none",
              }}>
                <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 4, color: P.gold, marginBottom: 16 }}>
                  {rooms[activeRoom].suite ? "PREMIUM SUITE" : "GUEST ROOM"} &middot; {rooms[activeRoom].bed} BED
                </div>
                <p style={{ fontFamily: font.accent, fontSize: 17, lineHeight: 1.8, color: P.muted, marginBottom: 24 }}>
                  {rooms[activeRoom].desc}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div>
                    <span style={{ fontFamily: font.body, fontSize: 11, color: P.muted }}>from </span>
                    <span style={{ fontFamily: font.display, fontSize: 28, color: P.gold }}>{"\u20B9"}{rooms[activeRoom].price}</span>
                    <span style={{ fontFamily: font.body, fontSize: 11, color: P.muted }}> / night</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 80 }}>
            <FadeIn>
              <div>
                <div style={{
                  aspectRatio: "4/3",
                  background: `linear-gradient(135deg, ${P.terracotta}88 0%, ${P.river}88 100%)`,
                  marginBottom: 24, position: "relative", overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ fontSize: 56 }}>{"\u{1F37D}\uFE0F"}</div>
                  <div style={{ position: "absolute", bottom: 16, left: 16, fontFamily: font.accent, fontSize: 13, color: P.gold, letterSpacing: 2 }}>
                    BAMBOO PERGOLA DINING
                  </div>
                </div>
                <h3 style={{ fontFamily: font.display, fontSize: 24, color: P.cream, marginBottom: 12 }}>
                  Open-air restaurant
                </h3>
                <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.8, color: P.muted }}>
                  Fifty seats under a bamboo pergola strung with warm lights.
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
                  background: `linear-gradient(135deg, ${P.gold}44 0%, ${P.river}88 100%)`,
                  marginBottom: 24, position: "relative", overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ fontSize: 56 }}>{"\u{1F3B6}"}</div>
                  <div style={{ position: "absolute", bottom: 16, left: 16, fontFamily: font.accent, fontSize: 13, color: P.gold, letterSpacing: 2 }}>
                    ACOUSTIC STAGE
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
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>SIGNATURE EVENINGS</div>
              <h2 style={{ fontFamily: font.display, fontSize: 36, fontWeight: 400, color: P.cream, fontStyle: "italic" }}>
                The music is not entertainment.<br />It is the architecture.
              </h2>
            </div>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { title: "Spa", icon: "\u{1F9D8}", desc: "Two massage rooms. Steam. Meditation space. Local oils and Assamese herbal treatments. The Brahmaputra breeze is the soundtrack." },
              { title: "Yoga Deck", icon: "\u{1F9D8}\u200D\u2640\uFE0F", desc: "A covered bamboo platform open to the morning sky. Daily sessions at sunrise. The paddy fields are your horizon line." },
              { title: "Rooftop", icon: "\u{1F319}", desc: "Infinity pool for sunset. Campfire circle for winter evenings. Stargazing deck with zero light pollution. Sky lounge with cocktails." },
            ].map((w, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{
                  padding: 32, textAlign: "center",
                  background: `${P.river}33`,
                  border: `1px solid ${P.gold}11`,
                  minHeight: 280,
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${P.gold}33`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = `${P.gold}11`}
                >
                  <div style={{ fontSize: 36, marginBottom: 20 }}>{w.icon}</div>
                  <div style={{ fontFamily: font.display, fontSize: 22, fontStyle: "italic", color: P.goldLight, marginBottom: 16 }}>{w.title}</div>
                  <p style={{ fontFamily: font.accent, fontSize: 14, lineHeight: 1.8, color: P.muted }}>{w.desc}</p>
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
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
          <div style={{ display: "flex", gap: 0, justifyContent: "center", maxWidth: 460, margin: "0 auto" }}>
            <input type="email" placeholder="Your email address" value={email}
              onChange={(e) => { setEmail(e.target.value); setSubStatus(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              style={{
              flex: 1, padding: "14px 20px",
              background: `${P.warm}`, border: `1px solid ${P.gold}33`,
              color: P.cream, fontFamily: font.accent, fontSize: 14,
              outline: "none", borderRight: "none",
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
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
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
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 3, color: P.gold, marginBottom: 12 }}>EXPLORE</div>
            <div style={{ fontFamily: font.accent, fontSize: 13, color: P.muted, lineHeight: 2 }}>
              <div style={{ cursor: "pointer" }} onClick={() => scrollTo("rooms")}>Rooms & Suites</div>
              <div style={{ cursor: "pointer" }} onClick={() => scrollTo("dining")}>Dining</div>
              <div style={{ cursor: "pointer" }} onClick={() => scrollTo("music")}>Music Evenings</div>
              <div style={{ cursor: "pointer" }} onClick={() => scrollTo("wellness")}>Wellness</div>
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
        </div>
      </footer>
    </div>
  );
}
