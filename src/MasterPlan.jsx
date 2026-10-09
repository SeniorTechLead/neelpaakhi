import { useState, useEffect, useRef, useCallback, Fragment } from "react";

const PALETTE = {
  charcoal: "#1a1a2e",
  dark: "#16213e",
  navy: "#0f3460",
  gold: "#b8943e",
  goldLight: "#d4b65a",
  cream: "#f5f0e8",
  bamboo: "#4a7c59",
  bambooLight: "#6b8f5e",
  terracotta: "#c4724e",
  terracottaLight: "#d4956e",
  river: "#3a6b8a",
};

const TABS = ["Contents", "Site Plan", "Ground Floor", "Cottages", "Traffic", "Phase 0", "Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5", "Phase 6", "Phase 7", "Phase 8"];

function useMobile(breakpoint = 768) {
  const [m, setM] = useState(typeof window !== "undefined" && window.innerWidth < breakpoint);
  useEffect(() => {
    const onResize = () => setM(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return m;
}

function FeatherSVG({ size = 40, color = PALETTE.gold }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" fill="none">
      <path d="M20 55 C21 35 22 15 20 2" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {[0,1,2,3,4,5].map(i => (
        <path key={`l${i}`} d={`M20 ${10+i*7} C${12-i*1.5} ${13+i*7} ${8-i} ${16+i*7} ${14-i*0.5} ${18+i*7}`}
          stroke={color} strokeWidth="0.6" fill="none" opacity="0.7"/>
      ))}
      {[0,1,2,3,4,5].map(i => (
        <path key={`r${i}`} d={`M20 ${12+i*7} C${26+i*1.2} ${14+i*7} ${30+i*0.8} ${17+i*7} ${24+i*0.4} ${19+i*7}`}
          stroke={color} strokeWidth="0.6" fill="none" opacity="0.7"/>
      ))}
    </svg>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "10px 16px",
      background: active ? PALETTE.gold : "transparent",
      color: active ? PALETTE.charcoal : `${PALETTE.cream}99`,
      border: `1px solid ${active ? PALETTE.gold : `${PALETTE.cream}22`}`,
      borderRadius: 8,
      cursor: "pointer",
      fontSize: 12,
      fontWeight: active ? 700 : 400,
      letterSpacing: 1,
      fontFamily: "monospace",
      transition: "all 0.2s",
      whiteSpace: "nowrap",
    }}>{label}</button>
  );
}

function Card({ title, children, accent = PALETTE.gold, style = {} }) {
  return (
    <div style={{
      padding: 20,
      background: `${PALETTE.charcoal}cc`,
      border: `1px solid ${accent}33`,
      borderRadius: 12,
      marginBottom: 16,
      ...style,
    }}>
      {title && <h4 style={{
        color: accent, fontSize: 13, letterSpacing: 2, margin: "0 0 14px",
        fontFamily: "monospace",
      }}>{title}</h4>}
      {children}
    </div>
  );
}

function Stat({ label, value, sub, color = PALETTE.gold }) {
  return (
    <div style={{ textAlign: "center", padding: 12 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 10, color: `${PALETTE.cream}99`, letterSpacing: 1, marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 9, color: `${PALETTE.cream}55`, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ZOOM MODAL — click any diagram to view fullscreen
// Scroll/pinch to zoom · drag to pan · Esc/✕ to close
// ═══════════════════════════════════════════════════════════
function ZoomModal({ svgRef, onClose }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef(null);
  const containerRef = useRef(null);
  const lastTouchDist = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      setScale(s => Math.min(6, Math.max(0.3, s * factor)));
    };
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    // Touch pinch-zoom
    const getTouchDist = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };
    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        lastTouchDist.current = getTouchDist(e.touches);
      }
    };
    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && lastTouchDist.current) {
        e.preventDefault();
        const dist = getTouchDist(e.touches);
        const factor = dist / lastTouchDist.current;
        setScale(s => Math.min(6, Math.max(0.3, s * factor)));
        lastTouchDist.current = dist;
      }
    };
    const handleTouchEnd = () => { lastTouchDist.current = null; };
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handlePointerDown = (e) => {
    dragging.current = true;
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (dragging.current && dragStart.current) {
      setPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
    }
  };
  const handlePointerUp = () => { dragging.current = false; };

  if (!svgRef) return null;
  return (
    <div ref={(el) => { containerRef.current = el; if (el) el.focus(); }} tabIndex={-1} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.92)",
      cursor: dragging.current ? "grabbing" : "grab",
      overflow: "hidden", outline: "none", touchAction: "none",
    }}>
      {/* Close button */}
      <button onClick={onClose} style={{
        position: "fixed", top: 16, right: 16, zIndex: 10001,
        width: 40, height: 40, borderRadius: 8, border: `1px solid ${PALETTE.cream}33`,
        background: `${PALETTE.charcoal}cc`, color: PALETTE.cream, cursor: "pointer",
        fontSize: 20, fontFamily: "monospace", display: "flex", alignItems: "center", justifyContent: "center",
      }}>✕</button>
      {/* Zoom controls */}
      <div onClick={e => e.stopPropagation()} style={{
        position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 8, alignItems: "center", zIndex: 10000,
        background: `${PALETTE.charcoal}ee`, borderRadius: 8, padding: "6px 12px",
        border: `1px solid ${PALETTE.gold}44`,
      }}>
        <button onClick={() => setScale(s => Math.max(0.3, s * 0.75))} style={{
          width: 32, height: 32, borderRadius: 6, border: `1px solid ${PALETTE.gold}44`,
          background: `${PALETTE.gold}11`, color: PALETTE.gold, cursor: "pointer",
          fontSize: 16, fontWeight: 700, fontFamily: "monospace",
        }}>−</button>
        <button onClick={() => { setScale(1); setPos({ x: 0, y: 0 }); }} style={{
          padding: "4px 10px", borderRadius: 6, border: `1px solid ${PALETTE.cream}22`,
          background: "transparent", color: `${PALETTE.cream}77`, cursor: "pointer",
          fontSize: 11, fontFamily: "monospace", minWidth: 48, textAlign: "center",
        }}>{Math.round(scale * 100)}%</button>
        <button onClick={() => setScale(s => Math.min(6, s * 1.33))} style={{
          width: 32, height: 32, borderRadius: 6, border: `1px solid ${PALETTE.gold}44`,
          background: `${PALETTE.gold}11`, color: PALETTE.gold, cursor: "pointer",
          fontSize: 16, fontWeight: 700, fontFamily: "monospace",
        }}>+</button>
      </div>

      {/* Content — always draggable */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          position: "absolute", left: "50%", top: "50%",
          transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${scale})`,
          transformOrigin: "center center",
          transition: dragging.current ? "none" : "transform 0.12s ease",
          touchAction: "none", userSelect: "none",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: svgRef }} />
      </div>

      {/* Hint */}
      <div style={{
        position: "fixed", bottom: 60, left: "50%", transform: "translateX(-50%)",
        fontSize: 10, color: `${PALETTE.cream}44`, fontFamily: "monospace", zIndex: 10000,
      }}>Scroll to zoom · Drag to pan · Esc or ✕ to close</div>
    </div>
  );
}

function Zoomable({ children }) {
  const ref = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [svgHtml, setSvgHtml] = useState(null);
  const handleClose = useCallback(() => setZoomed(false), []);

  const handleClick = () => {
    if (ref.current) {
      const svgs = ref.current.querySelectorAll("svg");
      const img = ref.current.querySelector("img");
      if (svgs.length > 1) {
        // Multiple SVGs (e.g. grid of floor plans) — capture entire container
        setSvgHtml(ref.current.innerHTML);
        setZoomed(true);
      } else if (svgs.length === 1) {
        setSvgHtml(svgs[0].outerHTML);
        setZoomed(true);
      } else if (img) {
        setSvgHtml(`<img src="${img.src}" style="max-width:90vw;max-height:85vh;object-fit:contain;" />`);
        setZoomed(true);
      }
    }
  };

  return (
    <>
      <div ref={ref} onClick={handleClick} style={{ cursor: "zoom-in", position: "relative" }}>
        {children}
        <div style={{
          position: "absolute", top: 6, right: 6,
          background: `${PALETTE.gold}33`, borderRadius: 4,
          padding: "2px 6px", fontSize: 9, color: PALETTE.gold,
          fontFamily: "monospace", pointerEvents: "none",
        }}>CLICK TO ZOOM</div>
      </div>
      {zoomed && <ZoomModal svgRef={svgHtml} onClose={handleClose} />}
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// CONTENTS TAB
// ═══════════════════════════════════════════════════════════
function ContentsTab({ onNavigate }) {
  const mobile = useMobile();
  const phases = [
    {
      phase: "PHASE 0", label: "Land Acquisition", tab: 5,
      color: PALETTE.gold, cost: "₹3.43 Cr",
      items: ["6.85 katha (~19,728 sq ft) @ ₹50L/katha", "3 base parcels (south) + 2 expansion parcels (north)", "Registration, stamp duty, legal", "Survey & boundary demarcation", "Appreciating asset regardless of operations"],
    },
    {
      phase: "PHASE 1", label: "Landscape + Cottages + Pool", tab: 6,
      color: PALETTE.bambooLight, cost: "₹1.30-1.95 Cr",
      items: ["Landscaping, walking trail (~350m), perimeter trees", "Plunge pool & deck (east boundary wellness strip)", "Restroom A (M+F, east boundary) + Restroom B (M+F, building divider)", "Vehicle corridor (west→east)", "6 starter cottages (5 north + 1 west)", "Approach road & gates A/B/C"],
    },
    {
      phase: "PHASE 2", label: "Restaurant + Bar + Kitchen + 2 Cottages", tab: 7,
      color: PALETTE.terracottaLight, cost: "₹1.20-1.55 Cr",
      items: ["Restaurant + bar (44-48 seats + bar counter)", "Kitchen + service zone (rear, south end)", "Jacaranda stage (raised stage under tree)", "Courtyard + jacaranda", "Yoga platform (east boundary, diagonal)", "2 west column cottages (8 total)", "G+4 structural frame for future floors"],
    },
    {
      phase: "PHASE 3", label: "TigmaMinds HQ (Full 1F) + 3 Cottages", tab: 8,
      color: PALETTE.river, cost: "₹0.95-1.30 Cr",
      items: ["Full 1F slab over entire building footprint", "Open-plan office + Training room / Academy", "Conference room + Gym + breakout zones", "3 west column cottages (11 boundary cottages complete)", "Plumbing roughed in for hotel conversion"],
    },
    {
      phase: "PHASE 4", label: "4 Campfire Cottages + FF&E", tab: 9,
      color: PALETTE.bambooLight, cost: "₹45-70L",
      items: ["4 campfire cottages (15 cottages complete)", "Campfire pit", "Complete paths, landscaping", "FF&E for all cottages + common areas"],
    },
    {
      phase: "PHASE 5", label: "Hotel Rooms — Second Floor", tab: 10,
      color: PALETTE.gold, cost: "₹57-78L",
      items: ["2F slab over building footprint", "6 rooms (4 standard + 2 deluxe)", "Central corridor + lift shaft + stairwells", "Balconies overlooking courtyard & paddy fields"],
    },
    {
      phase: "PHASE 6", label: "Hotel Rooms (3F)", tab: 11,
      color: PALETTE.gold, cost: "₹62-85L",
      items: ["3F: 4 standard + 1 jr suite + 1 suite", "Higher ceilings, premium finishes", "Private sit-outs, rain showers", "Passenger lift operational"],
    },
    {
      phase: "PHASE 7", label: "Hotel Rooms — Fourth Floor", tab: 12,
      color: PALETTE.gold, cost: "₹62-85L",
      items: ["4F: 4 deluxe + 2 suites", "Panoramic views of river & hills", "Multi-level parking (G through 4F) if demand warrants", "Total keys: 33 (15 cottages + 18 rooms)"],
    },
    {
      phase: "PHASE 8", label: "Rooftop — Infinity Pool + Restaurant", tab: 13,
      color: PALETTE.terracottaLight, cost: "₹40-60L",
      items: ["Infinity-edge swimming pool", "Open-air rooftop restaurant + bar", "Stargazing lounge", "Ground plunge pool relocated or retired"],
    },
  ];

  const tabs = [
    { name: "Site Plan", tab: 1, desc: "Overall layout, topography, road access, and dimensions" },
    { name: "Ground Floor", tab: 2, desc: "Detailed architectural plan — reception, restaurant + bar, jacaranda stage, kitchen" },
    { name: "Cottages", tab: 3, desc: "15 cottages (11 boundary + 4 campfire) + 1 suite, floor plans, specifications" },
    { name: "Traffic Analysis", tab: 4, desc: "Visitor flow projections, seasonal patterns, revenue potential" },
  ];

  return (
    <div>
      <Card title="THE NEEL PAAKHI MASTER PLAN">
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.8, marginBottom: 16 }}>
          A phased development strategy for a <strong style={{ color: PALETTE.gold }}>boutique luxury retreat</strong> in
          Fulung, North Guwahati. Each phase is self-sustaining — no phase requires the next to succeed.
          The full vision is a <strong style={{ color: PALETTE.river }}>G+4 structure with rooftop amenities</strong>, 27-33 keys,
          but the plan is designed so that any phase can be the last — and still leave a profitable, functioning property.
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: 10, marginBottom: 16,
        }}>
          <Stat label="TOTAL LAND" value="6.85 katha" sub="~19,728 sq ft, Fulung" color={PALETTE.gold}/>
          <Stat label="FULL BUILD" value="G+4 + Rooftop" sub="+ 15 cottages + 1 suite" color={PALETTE.river}/>
          <Stat label="TOTAL INVEST" value="₹9.5-12.0 Cr" sub="all phases (0-8)" color={PALETTE.terracottaLight}/>
          <Stat label="ANNUAL REV" value="₹3.3-4.3 Cr" sub="at maturity" color={PALETTE.bambooLight}/>
        </div>
      </Card>

      <Card title="PHASED ROADMAP">
        {phases.map((p, i) => (
          <div key={i} onClick={() => onNavigate(p.tab)} style={{
            padding: 14, marginBottom: i < phases.length - 1 ? 10 : 0,
            background: `${p.color}11`, border: `1px solid ${p.color}22`,
            borderRadius: 8, cursor: "pointer", transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: 2, fontFamily: "monospace" }}>{p.phase}</span>
                <span style={{ fontSize: 11, color: `${PALETTE.cream}88`, marginLeft: 8 }}>{p.label}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.cost}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {p.items.map((item, j) => (
                <span key={j} style={{
                  fontSize: 9, color: `${PALETTE.cream}77`, padding: "2px 8px",
                  background: `${p.color}0a`, borderRadius: 10, border: `1px solid ${p.color}15`,
                }}>{item}</span>
              ))}
            </div>
            <div style={{
              fontSize: 9, color: p.color, marginTop: 6, fontFamily: "monospace",
              letterSpacing: 1, opacity: 0.7,
            }}>CLICK TO VIEW →</div>
          </div>
        ))}
      </Card>

      <Card title="CUMULATIVE SUMMARY">
        <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, lineHeight: 1.5, marginBottom: 10 }}>
          Running totals after each phase. Each phase is self-sustaining — any row can be the stopping point.
        </div>
        <div style={{ overflowX: mobile ? "auto" : "visible" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto auto", gap: 0, fontSize: 10, minWidth: mobile ? 520 : "auto" }}>
          {["Phase", "What's Built", "Phase Cost", "Cumul. Cost", "Keys"].map((h, i) => (
            <div key={h} style={{ padding: "6px 8px", fontWeight: 700, color: PALETTE.gold, borderBottom: `1px solid ${PALETTE.gold}33`,
              borderRight: i < 4 ? `1px solid ${PALETTE.cream}11` : "none", whiteSpace: "nowrap" }}>{h}</div>
          ))}
          {[
            { ph: "0", built: "Land acquired", cost: "₹3.43 Cr", cumul: "₹3.43 Cr", keys: "0", color: PALETTE.gold },
            { ph: "1", built: "6 cottages + pool + landscape", cost: "₹1.30-1.95 Cr", cumul: "₹4.73-5.38 Cr", keys: "6", color: PALETTE.bambooLight },
            { ph: "2", built: "+ Restaurant + bar + G+4 frame + 2 cottages", cost: "₹1.20-1.55 Cr", cumul: "₹5.93-6.93 Cr", keys: "8", color: PALETTE.terracottaLight },
            { ph: "3", built: "+ TigmaMinds 1F + 3 cottages", cost: "₹0.95-1.30 Cr", cumul: "₹6.88-8.23 Cr", keys: "11", color: PALETTE.river },
            { ph: "4", built: "+ 4 campfire cottages + FF&E", cost: "₹45-70L", cumul: "₹7.33-8.93 Cr", keys: "15", color: PALETTE.bambooLight },
            { ph: "5", built: "+ 2F hotel (6 rooms)", cost: "₹57-78L", cumul: "₹7.90-9.71 Cr", keys: "21", color: PALETTE.gold },
            { ph: "6", built: "+ 3F hotel (6 rooms) + lift", cost: "₹62-85L", cumul: "₹8.52-10.56 Cr", keys: "27", color: PALETTE.gold },
            { ph: "7", built: "+ 4F hotel (6 rooms)", cost: "₹62-85L", cumul: "₹9.14-11.41 Cr", keys: "33", color: PALETTE.gold },
            { ph: "8", built: "+ Rooftop pool + restaurant", cost: "₹40-60L", cumul: "₹9.54-12.01 Cr", keys: "33", color: PALETTE.terracottaLight },
          ].map((row, i) => (
            <Fragment key={i}>
              <div style={{ padding: "5px 8px", color: row.color, fontWeight: 600, borderBottom: `1px solid ${PALETTE.cream}08`,
                borderRight: `1px solid ${PALETTE.cream}11`, whiteSpace: "nowrap" }}>{row.ph}</div>
              <div style={{ padding: "5px 8px", color: `${PALETTE.cream}88`, borderBottom: `1px solid ${PALETTE.cream}08`,
                borderRight: `1px solid ${PALETTE.cream}11` }}>{row.built}</div>
              <div style={{ padding: "5px 8px", color: `${PALETTE.cream}77`, borderBottom: `1px solid ${PALETTE.cream}08`,
                borderRight: `1px solid ${PALETTE.cream}11`, whiteSpace: "nowrap" }}>{row.cost}</div>
              <div style={{ padding: "5px 8px", color: PALETTE.gold, fontWeight: 600, borderBottom: `1px solid ${PALETTE.cream}08`,
                borderRight: `1px solid ${PALETTE.cream}11`, whiteSpace: "nowrap" }}>{row.cumul}</div>
              <div style={{ padding: "5px 8px", color: row.keys === "0" ? `${PALETTE.cream}44` : PALETTE.bambooLight, fontWeight: 600,
                borderBottom: `1px solid ${PALETTE.cream}08`, textAlign: "center" }}>{row.keys}</div>
            </Fragment>
          ))}
        </div>
        </div>
        <div style={{ marginTop: 10, padding: 10, background: `${PALETTE.gold}08`, borderRadius: 6, border: `1px solid ${PALETTE.gold}18` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: PALETTE.gold, fontWeight: 600 }}>Full Build (Phases 0-8)</span>
            <span style={{ fontSize: 14, color: PALETTE.gold, fontWeight: 700 }}>₹9.5-12.0 Cr · 33 keys</span>
          </div>
        </div>
      </Card>

      <Card title="DETAILED TABS">
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 8 }}>
          {tabs.map((t, i) => (
            <div key={i} onClick={() => onNavigate(t.tab)} style={{
              padding: 12, background: `${PALETTE.gold}0a`, border: `1px solid ${PALETTE.gold}15`,
              borderRadius: 8, cursor: "pointer",
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: PALETTE.gold, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}66`, lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SITE PLAN TAB
// ═══════════════════════════════════════════════════════════
function SitePlanTab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="SITE LAYOUT — FULUNG, NORTH GUWAHATI">
        <Zoomable>
          <img src="/images/neel-paakhi-site-plan.png" alt="Site Plan" style={{ width: "100%", maxWidth: 620, display: "block", margin: "0 auto 16px" }} />
        </Zoomable>

        <div style={{ fontSize: 11, color: `${PALETTE.cream}88`, lineHeight: 1.7, textAlign: "center", marginBottom: 16 }}>
          Total land: <strong style={{ color: PALETTE.gold }}>~19,728 sq ft</strong> (6.85 katha) · <strong style={{ color: PALETTE.bambooLight }}>15 cottages</strong> (11 boundary + 4 campfire) + 1 suite · Campfire · Yoga deck · Jacaranda stage
        </div>
      </Card>

      <Card title="LEGEND">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { label: "Compound boundary", color: "#c0b890", style: "solid", desc: "Yellow perimeter (survey boundary)" },
            { label: "Setback line", color: "#e04040", style: "dashed", desc: "3m inward from boundary" },
            { label: "G+4 Building outline", color: "#80c8e0", style: "solid", desc: "Restaurant, lobby, hotel floors" },
            { label: "Walking trail", color: "#5a9a4a", style: "dashed", desc: "~350m perimeter loop" },
            { label: "Gates A / B / C", color: "#e0c870", style: "marker", desc: "A: cars+walk, B: walk+2W, C: cars+walk" },
            { label: "Vehicle corridor", color: "#6a6050", style: "dashed", desc: "E-W lane between zones" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
              background: `${PALETTE.charcoal}88`, borderRadius: 6,
            }}>
              <div style={{
                width: item.style === "marker" ? 10 : 24,
                height: item.style === "marker" ? 10 : 3,
                flexShrink: 0,
                borderRadius: item.style === "marker" ? "50%" : 1,
                background: item.style === "dashed" ? "transparent" : item.color,
                borderBottom: item.style === "dashed" ? `2px dashed ${item.color}` : "none",
              }} />
              <div>
                <div style={{ fontSize: 10, color: item.color, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 9, color: `${PALETTE.cream}55` }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, borderTop: `1px solid ${PALETTE.cream}11`, paddingTop: 12 }}>
          <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, letterSpacing: 1, marginBottom: 8, fontFamily: "monospace" }}>COTTAGE ROOFING COLORS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              { label: "Blue", color: "#2080d0" },
              { label: "Red", color: "#cc3030" },
              { label: "Green", color: "#28a745" },
              { label: "Yellow", color: "#e8b800" },
              { label: "Peach", color: "#e8956a" },
              { label: "White (Suite)", color: "#d8d8d8" },
            ].map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "4px 8px",
                background: `${c.color}15`, borderRadius: 4, border: `1px solid ${c.color}33`,
              }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: c.color }} />
                <span style={{ fontSize: 10, color: `${PALETTE.cream}88` }}>{c.label}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 16, fontSize: 10, color: `${PALETTE.cream}55` }}>
            <span>Solid outline = Phase 1</span>
            <span>Dotted outline = Future phases</span>
          </div>
        </div>

        <div style={{ marginTop: 12, borderTop: `1px solid ${PALETTE.cream}11`, paddingTop: 12 }}>
          <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, letterSpacing: 1, marginBottom: 8, fontFamily: "monospace" }}>FACILITIES</div>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 6 }}>
            {[
              { label: "Restrooms A / B / C", desc: "M + F blocks at three locations" },
              { label: "Parking", desc: "7 cars + 2W, west boundary" },
              { label: "Yoga deck", desc: "East boundary, diagonal platform" },
              { label: "Plunge pool", desc: "7×3m, east wellness strip" },
              { label: "Jacaranda stage", desc: "Raised stage under tree, cottage verandahs as gallery" },
              { label: "Campfire", desc: "Between nest cottage rows" },
            ].map((f, i) => (
              <div key={i} style={{ padding: "6px 8px", background: `${PALETTE.charcoal}88`, borderRadius: 4 }}>
                <div style={{ fontSize: 10, color: `${PALETTE.cream}99`, fontWeight: 600 }}>{f.label}</div>
                <div style={{ fontSize: 9, color: `${PALETTE.cream}44` }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// GROUND FLOOR TAB
// ═══════════════════════════════════════════════════════════
function GroundFloorTab() {
  const mobile = useMobile();
  const zones = [
    { name: "G+4 Building (East Diagonal)", area: "~1,880 sq ft footprint", desc: "Runs along the east diagonal boundary. 17m × 10m (57 × 33ft). Lower portion: restaurant + bar + kitchen (south). Upper portion: grand lobby with reception desks aligned to the diagonal. Structure sized for 4 upper floors + rooftop", color: PALETTE.gold },
    { name: "Restaurant + Bar & Kitchen", area: "~990 sq ft", desc: "Lower portion of the G+4 building along east diagonal. Indoor: 28-32 seats with bar counter (6-8 stools). Kitchen behind. Total with outdoor: 44-48 seats. Deliveries from south road, invisible to guests", color: PALETTE.terracottaLight },
    { name: "Jacaranda Stage", area: "~10m canopy", desc: "Centre of courtyard — a raised stage (8×6ft) beneath the jacaranda tree. Cottage verandahs are the gallery. Music-only venue, no food or bar. Live music drifts across the courtyard to cottage guests", color: PALETTE.gold },
    { name: "Courtyard + Plunge Pool", area: "~1,200 sq ft", desc: "West of the building, open-to-sky. Jacaranda stage at centre. Plunge pool (7×3m) on east boundary wellness strip alongside yoga deck", color: PALETTE.bambooLight },
    { name: "Grand Lobby & Reception", area: "~660 sq ft", desc: "Upper portion of the G+4 building. Reception desks aligned along the east diagonal. Guests walk across a grand lobby to reach them", color: PALETTE.river },
    { name: "Restroom C (NE Nook)", area: "~250 sq ft", desc: "Above reception, NE nook where north lobby wall meets east setback. Male + Female. First thing guests see after arrival", color: `${PALETTE.river}88` },
    { name: "Restroom A (East Boundary)", area: "~200 sq ft", desc: "Between plunge pool and yoga deck on east boundary wellness strip. Male + Female, serving courtyard and cottage guests", color: `${PALETTE.river}88` },
    { name: "Staff Toilet", area: "~60 sq ft", desc: "Behind restaurant + bar, kitchen side. Staff only", color: `${PALETTE.cream}44` },
    { name: "Parking (7 cars + 2W)", area: "~1,200 sq ft", desc: "West wall, south of vehicle corridor. 7 car spots (x=2.1m) + two-wheeler parking below cars (same x). Both face east", color: `${PALETTE.cream}44` },
    { name: "Perimeter Walking Trail", area: "~350m loop", desc: "Shaded trail around entire property with native trees — neem, bamboo, jackfruit, areca nut", color: "#6b8f5e" },
  ];

  return (
    <div>
      <Card title="GROUND FLOOR — BUILDING ZONE (PHASE 2)">
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 16 }}>
          The ground floor is the soul of Neel Paakhi. It houses everything that makes the retreat a destination:
          the restaurant + bar, the jacaranda stage, the courtyard, and the arrival experience. Built on the southern 3 parcels
          (~12,240 sq ft total, ~60% ground coverage = ~7,344 sq ft footprint).
        </div>
        
        {zones.map((z, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12,
            padding: 12, background: `${PALETTE.charcoal}88`, borderRadius: 8,
            borderLeft: `3px solid ${z.color}`,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: z.color }}>{z.name}</div>
              <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, marginTop: 2 }}>{z.area}</div>
              <div style={{ fontSize: 11, color: `${PALETTE.cream}99`, marginTop: 4, lineHeight: 1.5 }}>{z.desc}</div>
            </div>
          </div>
        ))}
      </Card>

      <Card title="G+4 BUILDING — GROUND FLOOR PLAN" accent={PALETTE.gold}>
        <Zoomable>
          <img src="/images/neel-paakhi-ground-floor.png" alt="Ground Floor Plan" style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto 12px" }} />
        </Zoomable>
        <div style={{ fontSize: 11, color: `${PALETTE.cream}77`, lineHeight: 1.7, marginBottom: 12, padding: 10, background: `${PALETTE.gold}08`, borderRadius: 6, border: `1px solid ${PALETTE.gold}18` }}>
          Parallelogram footprint along the east diagonal boundary (4.8m setback). 10m (33ft) wide perpendicular to boundary.
          17m (57ft) along the east diagonal boundary. ~1,880 sq ft footprint.
          South end: restaurant + bar + kitchen (deliveries from Gate B). North end: reception + lobby (guest arrival from corridor).
          Upper floors (1F–4F): balconies project up to 1.5m into the setback on all sides (permitted above 3.65m height per NBC/state rules). Ground floor walls sit at the setback line.
        </div>
      </Card>

      <Card title="G+4 BUILDING — FIRST FLOOR PLAN (TIGMAMINDS HQ)" accent={PALETTE.river}>
        <Zoomable>
          <img src="/images/neel-paakhi-first-floor.png" alt="First Floor Plan" style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto 12px" }} />
        </Zoomable>
        <div style={{ fontSize: 11, color: `${PALETTE.cream}77`, lineHeight: 1.7, marginBottom: 12, padding: 10, background: `${PALETTE.river}08`, borderRadius: 6, border: `1px solid ${PALETTE.river}18` }}>
          Phase 3: TigmaMinds HQ above restaurant+kitchen. Same parallelogram footprint, 33ft wide.
          South→north: Open Office (33×16ft) → Training (33×13ft) → Stairs/Elev/WC → Conference (18×20ft) + Gym (15×20ft).
          1.5m balconies on all sides. Cottages corridor connects to stair landing on the west.
        </div>
      </Card>

      <Card title="PARKING LAYOUT — WEST SIDE" accent={`${PALETTE.cream}88`}>
        <Zoomable>
          <img src="/images/neel-paakhi-parking.png" alt="Parking Layout" style={{ width: "100%", maxWidth: 460, display: "block", margin: "0 auto 12px" }} />
        </Zoomable>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <div style={{ padding: 10, background: `${PALETTE.cream}08`, borderRadius: 6 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: `${PALETTE.cream}88`, marginBottom: 6 }}>4W — CAR PARKING</div>
            {[
              { label: "Car spots", value: "6 along west boundary" },
              { label: "Each spot", value: "6.5ft × 16.5ft (2m × 5m)" },
              { label: "X position", value: "x = 3.5m (east of trail)" },
              { label: "Aisle (east of cars)", value: "3.6m / 12ft wide" },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: i < 3 ? `1px solid ${PALETTE.cream}08` : "none" }}>
                <span style={{ fontSize: 10, color: `${PALETTE.cream}55` }}>{d.label}</span>
                <span style={{ fontSize: 10, color: PALETTE.cream, fontFamily: "monospace" }}>{d.value}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: 10, background: `${PALETTE.cream}08`, borderRadius: 6 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: `${PALETTE.cream}88`, marginBottom: 6 }}>2W — SEPARATE STRIP (WEST OF CARS)</div>
            {[
              { label: "2W strip position", value: "x = 1.5m (against wall)" },
              { label: "Each bike spot", value: "2.6ft × 5ft (0.8m × 1.5m)" },
              { label: "Bikes", value: "~14 spots, nose-in east" },
              { label: "Same Y-range as cars", value: "parallel strip" },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: i < 3 ? `1px solid ${PALETTE.cream}08` : "none" }}>
                <span style={{ fontSize: 10, color: `${PALETTE.cream}55` }}>{d.label}</span>
                <span style={{ fontSize: 10, color: PALETTE.cream, fontFamily: "monospace" }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 10, color: `${PALETTE.cream}55`, marginTop: 8, lineHeight: 1.5 }}>
          Two parallel strips south of vehicle corridor: 2W against the west boundary (x=1.5m), 4W cars east of that (x=3.5m).
          Both face east (nose-in). Aisle (12ft) east of car spots for manoeuvring. Overflow: west road shoulder (3-4 cars on event nights).
        </div>

        <div style={{ padding: 10, background: `${PALETTE.cream}06`, borderRadius: 6, marginTop: 10, border: `1px solid ${PALETTE.cream}10` }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: `${PALETTE.cream}88`, marginBottom: 6 }}>GAP: PARKING AISLE TO BUILDING (WEST FACE)</div>
          <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, lineHeight: 1.5, marginBottom: 8 }}>
            The building runs along the east diagonal, so the gap between the parking aisle east edge (~8.5m) and the building west face widens from south to north.
          </div>
          {[
            { label: "Lobby + Reception (north, y=21.8m)", value: "5.2m (16.9 ft)" },
            { label: "Stairs / Elev / Lobby (y=15.8m)", value: "3.7m (12.1 ft)" },
            { label: "Kitchen / Stairs (y=13.8m)", value: "3.2m (10.5 ft)" },
            { label: "Restaurant / Kitchen (y=10.3m)", value: "2.3m (7.6 ft)" },
            { label: "Restaurant (south end, y=4.8m)", value: "1.0m (3.2 ft)" },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: i < 4 ? `1px solid ${PALETTE.cream}08` : "none" }}>
              <span style={{ fontSize: 10, color: `${PALETTE.cream}55` }}>{d.label}</span>
              <span style={{ fontSize: 10, color: PALETTE.cream, fontFamily: "monospace" }}>{d.value}</span>
            </div>
          ))}
          <div style={{ fontSize: 10, color: `${PALETTE.cream}44`, marginTop: 6, lineHeight: 1.4 }}>
            Narrowest point (~1.0m) at south end — pedestrian access only. Car parking starts further north where gap is 2.3m+. Widens to ~5.2m at lobby end near the vehicle corridor.
          </div>
        </div>
      </Card>

      <Card title="MUSIC PROGRAMME">
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10 }}>
          {[
            { day: "Friday", name: "Xomoy", genre: "Assamese folk", color: PALETTE.bambooLight },
            { day: "Saturday", name: "Purano Din", genre: "Old Hindi gold", color: PALETTE.gold },
            { day: "Sunday", name: "Pahadi", genre: "Nepali hill songs", color: PALETTE.terracottaLight },
          ].map((n, i) => (
            <div key={i} style={{
              padding: 12, borderRadius: 8, textAlign: "center",
              background: `${n.color}15`, border: `1px solid ${n.color}33`,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: n.color }}>{n.name}</div>
              <div style={{ fontSize: 10, color: `${PALETTE.cream}77`, marginTop: 4 }}>{n.day}s</div>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}55`, marginTop: 2 }}>{n.genre}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="STRUCTURAL NOTE" accent={PALETTE.river}>
        <div style={{ fontSize: 11, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 12 }}>
          The ground floor is designed from day one to carry the structural load of a <strong style={{ color: PALETTE.river }}>G+4 building with rooftop amenities</strong>.
          Column positions, foundation depth, and beam sizing all account for upper floors.
          Phase 3 builds the full first floor as TigmaMinds HQ. Phases 5-7 add hotel rooms floor by floor. Phase 8 crowns it with a rooftop infinity pool and open-air restaurant.
          Zero structural rework at any stage — just build upward on the existing frame.
        </div>
        <div style={{ padding: 10, background: `${PALETTE.gold}08`, borderRadius: 6, border: `1px solid ${PALETTE.gold}18` }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: PALETTE.gold, marginBottom: 4 }}>ZONING VERIFICATION REQUIRED</div>
          <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, lineHeight: 1.6 }}>
            GMDA Byelaws 2014 allow G+4 with a structural engineer's hazard safety certificate (Form 7).
            Buildings up to ~19m (~G+4 + rooftop parapet) require approval from the competent authority.
            However, Fulung's exact jurisdiction — whether GMDA, Kamrup Rural panchayat, or a transition zone —
            needs confirmation from a local Registered Technical Person (RTP). Panchayat rules are typically
            more relaxed on height. Approval timeline for G+4 and above: up to 90 days vs 10-15 days for G+2.
          </div>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// COTTAGES TAB
// ═══════════════════════════════════════════════════════════
function CottagesTab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="BAMBOO & WOOD COTTAGES — THE NEEL PAAKHI EXPERIENCE">
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 16 }}>
          Cottages are not budget accommodation — they <em>are</em> the experience. Campfire evenings,
          live music drifting from the jacaranda stage, bamboo walls, the sound of crickets, starlit skies.
          With no vehicles circulating through the cottage zone (cars enter west, exit east), 
          all pathways are pedestrian-only — more space for cottages, more quiet for guests.
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <Stat label="COTTAGES" value="15" sub="11 boundary + 4 campfire (+ 1 suite)"  color={PALETTE.bambooLight}/>
          <Stat label="ROOF SIZE" value="11×18ft" sub="boundary (198 sqft) · 11×14.5ft campfire (160 sqft)" color={PALETTE.bambooLight}/>
          <Stat label="BUILD COST" value="₹3-8L" sub="per cottage" color={PALETTE.gold}/>
          <Stat label="ADR" value="₹4,500-5,500" sub="single tier pricing" color={PALETTE.terracottaLight}/>
        </div>

        <Card title="THE 15 COTTAGES" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: `${PALETTE.cream}88`, lineHeight: 1.7, marginBottom: 12 }}>
            The cottage zone (above the vehicle corridor) has 3 clusters:
            5 cottages along the north row near the tree screen (11×18ft, back porch facing trail) + 1 Grand Suite (NE corner),
            6 cottages along the west column facing east (11×18ft, back porch facing trail),
            4 compact cottages around the campfire (11×14.5ft, verandah facing campfire). Phase 4.
            Phase 1 builds the 5 north row + 1 west column. Phases 2-3 complete the west column. Phase 4 adds campfire cottages.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[
              { name: "Brahmaputra", desc: "The great river", icon: "🌊" },
              { name: "Kamakhya", desc: "Sacred temple", icon: "🛕" },
              { name: "Kaziranga", desc: "Rhino sanctuary", icon: "🦏" },
              { name: "Majuli", desc: "River island", icon: "🏝️" },
              { name: "Manas", desc: "Tiger reserve", icon: "🐅" },
              { name: "Dihing", desc: "Rainforest river", icon: "🌿" },
              { name: "Nilachal", desc: "Blue hill", icon: "⛰️" },
              { name: "Sualkuchi", desc: "Silk village", icon: "🧵" },
              { name: "Bihu", desc: "Harvest festival", icon: "🎶" },
              { name: "Neel Paakhi Suite", desc: "The blue feather", icon: "🪶" },
            ].map((c, i) => (
              <div key={i} style={{
                padding: 8, borderRadius: 6,
                background: `${PALETTE.bamboo}22`,
                border: `1px solid ${PALETTE.bambooLight}33`,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ fontSize: 14 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: PALETTE.bambooLight }}>{c.name}</div>
                  <div style={{ fontSize: 8, color: `${PALETTE.cream}55` }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Card>

      <Card title="COTTAGE LAYOUT — GAPS & SPACING">
        <Zoomable>
          <img src="/images/neel-paakhi-cottage-spatial.png" alt="Spatial map — inter-cluster distances" style={{ width: "100%", maxWidth: 600, display: "block", margin: "0 auto 12px" }} />
        </Zoomable>
        <Zoomable>
          <img src="/images/neel-paakhi-cottage-north.png" alt="North Row — 5 boundary cottages" style={{ width: "100%", maxWidth: 600, display: "block", margin: "0 auto 12px" }} />
        </Zoomable>
        <Zoomable>
          <img src="/images/neel-paakhi-cottage-west.png" alt="West Column — 6 boundary cottages" style={{ width: "100%", maxWidth: 600, display: "block", margin: "0 auto 12px" }} />
        </Zoomable>
        <Zoomable>
          <img src="/images/neel-paakhi-cottage-campfire.png" alt="Campfire Cluster — 4 compact cottages" style={{ width: "100%", maxWidth: 600, display: "block", margin: "0 auto 12px" }} />
        </Zoomable>
        <div style={{ fontSize: 11, color: `${PALETTE.cream}77`, lineHeight: 1.7, padding: 10, background: `${PALETTE.bamboo}08`, borderRadius: 6, border: `1px solid ${PALETTE.bambooLight}18` }}>
          3ft gap between roof edges across all rows — enough for a stepping-stone path between cottages
          but tight enough for a cozy, village-like feel. Back porches (4ft) face the perimeter trail on north and west rows — intentionally overhang the trail for shade.
          Front verandahs (5ft boundary, 4ft campfire) face the courtyard/campfire.
          Total footprint per boundary cottage: 27ft deep × 11ft wide (297 sq ft including porches).
        </div>
      </Card>

      <Card title="COTTAGE SPECIFICATIONS">
        {[
          { label: "Structure", detail: "A-frame bamboo frame, timber panel walls, raised platform (2-3 ft above ground)" },
          { label: "Roof", detail: "Blue corrugated tin (Pepsi Blue) — signature Neel Paakhi colour" },
          { label: "Boundary (11)", detail: "198 sq ft roof (11×18ft): bedroom 133 + toilet 20 + shower 45 sq ft. 5ft front verandah (55 sqft) + 4ft back porch (44 sqft). Total 297 sqft." },
          { label: "Campfire (4)", detail: "160 sq ft roof (11×14.5ft): bedroom 102 + toilet 20 + shower 38 sq ft. 4ft front verandah (44 sqft). Total 204 sqft. Cozy fireside units." },
          { label: "Layout", detail: "5 north row + 6 west column (11×18ft) + suite NE + 4 around campfire (11×14.5ft)" },
          { label: "Lighting", detail: "Warm ambient solar path lights, lantern-style cottage lighting" },
          { label: "Lifespan", detail: "5-7 years with annual treatment. Replaceable modular construction." },
        ].map((spec, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, padding: "8px 0",
            borderBottom: i < 6 ? `1px solid ${PALETTE.cream}11` : "none",
          }}>
            <div style={{ width: 90, fontSize: 10, color: PALETTE.bambooLight, fontWeight: 600, flexShrink: 0 }}>
              {spec.label}
            </div>
            <div style={{ fontSize: 11, color: `${PALETTE.cream}99`, lineHeight: 1.5 }}>{spec.detail}</div>
          </div>
        ))}
      </Card>

      <Card title="FLOOR PLAN & DIMENSIONS">
        <Zoomable><div style={{ maxWidth: 360, margin: "0 auto" }}>
          {/* Boundary cottage floor plan — 11 × 18 ft roof + 5ft verandah + 4ft back porch
              Layout: bedroom left (7ft wide, full depth) | toilet+shower right (4ft wide, stacked)
              Width check: 7 + 4 = 11 ft ✓   Depth check: 5 + 13 = 18 ft ✓ */}
          <div>
            <div style={{ fontSize: 10, color: PALETTE.gold, letterSpacing: 1, marginBottom: 8, fontFamily: "monospace" }}>BOUNDARY COTTAGE (11) — 11 × 18 FT ROOF (3.35 × 5.49m)</div>
            <svg viewBox="0 -14 140 156" style={{ width: "100%", background: `${PALETTE.charcoal}`, borderRadius: 6, border: `1px solid ${PALETTE.gold}33` }}>
              {/* Back porch — 11 × 4ft = 44 sqft (top, facing trees/trail) — overhangs trail for shade */}
              <rect x="12" y="2" width="99" height="17" fill={`${PALETTE.bamboo}15`} stroke={PALETTE.bambooLight} strokeWidth="0.5" rx="2" strokeDasharray="3,2"/>
              <text x="61" y="12" textAnchor="middle" fill={PALETTE.bambooLight} fontSize="4" fontFamily="monospace">BACK PORCH · 44 sq ft</text>

              {/* Cottage outline — roof footprint */}
              <rect x="12" y="17" width="99" height="81" fill={`${PALETTE.gold}15`} stroke={PALETTE.gold} strokeWidth="1" rx="2"/>

              {/* Bedroom — 7 wide × 18 deep = 126 sq ft (left side) */}
              <rect x="14" y="19" width="63" height="77" fill={`${PALETTE.navy}44`} rx="1"/>
              <text x="45" y="40" textAnchor="middle" fill={PALETTE.cream} fontSize="5" fontFamily="monospace">BEDROOM</text>
              <text x="45" y="48" textAnchor="middle" fill={`${PALETTE.cream}55`} fontSize="4" fontFamily="monospace">126 sq ft</text>
              {/* Bed icon */}
              <rect x="27" y="58" width="20" height="11" fill={`${PALETTE.cream}15`} rx="1" stroke={`${PALETTE.cream}33`} strokeWidth="0.3"/>
              {/* Sitting area hint */}
              <rect x="30" y="78" width="14" height="8" fill={`${PALETTE.cream}08`} rx="1" stroke={`${PALETTE.cream}22`} strokeWidth="0.3"/>
              <text x="37" y="84" textAnchor="middle" fill={`${PALETTE.cream}33`} fontSize="2.5" fontFamily="monospace">chair</text>

              {/* Toilet — 4 wide × 5 deep = 20 sq ft (top-right) */}
              <rect x="79" y="19" width="30" height="22" fill={`${PALETTE.river}33`} rx="1"/>
              <text x="94" y="30" textAnchor="middle" fill={PALETTE.river} fontSize="4" fontFamily="monospace">TOILET</text>
              <text x="94" y="37" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace">20 sq ft</text>

              {/* Rain shower — 4 wide × 13 deep = 52 sq ft (bottom-right) */}
              <rect x="79" y="43" width="30" height="53" fill={`${PALETTE.river}22`} rx="1"/>
              <text x="94" y="64" textAnchor="middle" fill={PALETTE.river} fontSize="4" fontFamily="monospace">SHOWER</text>
              <text x="94" y="74" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace">52 sq ft</text>

              {/* Verandah — full width × 5 deep = 55 sq ft (bottom, facing courtyard) */}
              <rect x="12" y="100" width="99" height="22" fill={`${PALETTE.gold}15`} stroke={PALETTE.gold} strokeWidth="0.5" rx="2" strokeDasharray="3,2"/>
              <text x="61" y="109" textAnchor="middle" fill={PALETTE.gold} fontSize="5" fontFamily="monospace">VERANDAH</text>
              <text x="61" y="116" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace">55 sq ft (open sit-out)</text>

              {/* Width dimension — bottom */}
              <line x1="12" y1="128" x2="111" y2="128" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <line x1="12" y1="126" x2="12" y2="130" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <line x1="111" y1="126" x2="111" y2="130" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <text x="61" y="138" textAnchor="middle" fill={`${PALETTE.cream}66`} fontSize="4.5" fontFamily="monospace" fontWeight="bold">11 ft (3.35m)</text>

              {/* Depth dimension — right side, roof only */}
              <line x1="122" y1="17" x2="122" y2="98" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <line x1="120" y1="17" x2="124" y2="17" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <line x1="120" y1="98" x2="124" y2="98" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <text x="133" y="58" textAnchor="middle" fill={`${PALETTE.cream}66`} fontSize="4.5" fontFamily="monospace" fontWeight="bold" transform="rotate(90, 133, 58)">18 ft (5.49m)</text>

              {/* Inner dimension lines — width split */}
              <line x1="14" y1="-5" x2="77" y2="-5" stroke={`${PALETTE.cream}33`} strokeWidth="0.3"/>
              <text x="45" y="-7" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace">7 ft</text>
              <line x1="79" y1="-5" x2="109" y2="-5" stroke={`${PALETTE.cream}33`} strokeWidth="0.3"/>
              <text x="94" y="-7" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace">4 ft</text>

              {/* Inner dimension lines — depth split (right column) */}
              <line x1="113" y1="19" x2="113" y2="41" stroke={`${PALETTE.cream}33`} strokeWidth="0.3"/>
              <text x="118" y="31" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace" transform="rotate(90, 118, 31)">5 ft</text>
              <line x1="113" y1="43" x2="113" y2="96" stroke={`${PALETTE.cream}33`} strokeWidth="0.3"/>
              <text x="118" y="70" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace" transform="rotate(90, 118, 70)">13 ft</text>

              {/* Verandah depth */}
              <line x1="122" y1="100" x2="122" y2="122" stroke={`${PALETTE.cream}33`} strokeWidth="0.3"/>
              <text x="130" y="112" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace" transform="rotate(90, 130, 112)">5 ft</text>

              {/* Back porch depth */}
              <line x1="2" y1="2" x2="2" y2="19" stroke={`${PALETTE.cream}33`} strokeWidth="0.3"/>
              <text x="7" y="12" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace" transform="rotate(90, 7, 12)">4 ft</text>

              {/* Total area badge */}
              <rect x="55" y="-13" width="38" height="6" fill={PALETTE.gold} rx="1"/>
              <text x="74" y="-8" textAnchor="middle" fill={PALETTE.charcoal} fontSize="3.5" fontFamily="monospace" fontWeight="bold">198 SQ FT ROOF</text>

              {/* Price */}
              <text x="61" y="148" textAnchor="middle" fill={PALETTE.gold} fontSize="3.5" fontFamily="monospace">₹4,500-5,500 / night</text>
            </svg>
          </div>

          {/* Campfire cottage — same as before, 11 × 14.5ft, no back porch */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 10, color: PALETTE.terracottaLight, letterSpacing: 1, marginBottom: 8, fontFamily: "monospace" }}>CAMPFIRE COTTAGE (4) — 11 × 14.5 FT ROOF (3.35 × 4.42m)</div>
            <svg viewBox="0 -14 140 134" style={{ width: "100%", background: `${PALETTE.charcoal}`, borderRadius: 6, border: `1px solid ${PALETTE.terracottaLight}33` }}>
              {/* Cottage outline — roof footprint */}
              <rect x="12" y="8" width="99" height="65" fill={`${PALETTE.terracottaLight}15`} stroke={PALETTE.terracottaLight} strokeWidth="1" rx="2"/>

              {/* Bedroom — 7 wide × 14.5 deep = 102 sq ft (left side) */}
              <rect x="14" y="10" width="63" height="61" fill={`${PALETTE.navy}44`} rx="1"/>
              <text x="45" y="28" textAnchor="middle" fill={PALETTE.cream} fontSize="5" fontFamily="monospace">BEDROOM</text>
              <text x="45" y="36" textAnchor="middle" fill={`${PALETTE.cream}55`} fontSize="4" fontFamily="monospace">102 sq ft</text>
              <rect x="27" y="44" width="20" height="11" fill={`${PALETTE.cream}15`} rx="1" stroke={`${PALETTE.cream}33`} strokeWidth="0.3"/>

              {/* Toilet — 4 wide × 5 deep = 20 sq ft (top-right) */}
              <rect x="79" y="10" width="30" height="22" fill={`${PALETTE.river}33`} rx="1"/>
              <text x="94" y="21" textAnchor="middle" fill={PALETTE.river} fontSize="4" fontFamily="monospace">TOILET</text>
              <text x="94" y="28" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace">20 sq ft</text>

              {/* Rain shower — 4 wide × 9.5 deep = 38 sq ft (bottom-right) */}
              <rect x="79" y="34" width="30" height="39" fill={`${PALETTE.river}22`} rx="1"/>
              <text x="94" y="50" textAnchor="middle" fill={PALETTE.river} fontSize="4" fontFamily="monospace">SHOWER</text>
              <text x="94" y="60" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace">38 sq ft</text>

              {/* Verandah — full width × 4 deep = 44 sq ft (facing campfire) */}
              <rect x="12" y="75" width="99" height="22" fill={`${PALETTE.terracottaLight}15`} stroke={PALETTE.terracottaLight} strokeWidth="0.5" rx="2" strokeDasharray="3,2"/>
              <text x="61" y="84" textAnchor="middle" fill={PALETTE.terracottaLight} fontSize="5" fontFamily="monospace">VERANDAH</text>
              <text x="61" y="91" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3" fontFamily="monospace">44 sq ft (facing campfire)</text>

              {/* Width dimension */}
              <line x1="12" y1="103" x2="111" y2="103" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <line x1="12" y1="101" x2="12" y2="105" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <line x1="111" y1="101" x2="111" y2="105" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <text x="61" y="113" textAnchor="middle" fill={`${PALETTE.cream}66`} fontSize="4.5" fontFamily="monospace" fontWeight="bold">11 ft (3.35m)</text>

              {/* Depth dimension */}
              <line x1="122" y1="8" x2="122" y2="73" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <line x1="120" y1="8" x2="124" y2="8" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <line x1="120" y1="73" x2="124" y2="73" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
              <text x="133" y="44" textAnchor="middle" fill={`${PALETTE.cream}66`} fontSize="4.5" fontFamily="monospace" fontWeight="bold" transform="rotate(90, 133, 44)">14.5 ft (4.42m)</text>

              {/* Total area badge */}
              <rect x="50" y="-13" width="44" height="6" fill={PALETTE.terracottaLight} rx="1"/>
              <text x="72" y="-8" textAnchor="middle" fill={PALETTE.charcoal} fontSize="3.5" fontFamily="monospace" fontWeight="bold">160 SQ FT ROOF</text>

              {/* Price */}
              <text x="61" y="118" textAnchor="middle" fill={PALETTE.terracottaLight} fontSize="3.5" fontFamily="monospace">₹4,500-5,500 / night</text>
            </svg>
          </div>
        </div></Zoomable>

        {/* Yoga platform */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 10, color: PALETTE.river, letterSpacing: 1, marginBottom: 8, fontFamily: "monospace" }}>YOGA / MEDITATION PLATFORM</div>
          <svg viewBox="0 0 300 60" style={{ width: "100%", background: `${PALETTE.charcoal}`, borderRadius: 6, border: `1px solid ${PALETTE.river}33`, marginBottom: 12 }}>
            <rect x="20" y="8" width="260" height="30" fill={`${PALETTE.river}22`} stroke={PALETTE.river} strokeWidth="0.8" rx="3"/>
            <text x="150" y="24" textAnchor="middle" fill={PALETTE.river} fontSize="6" fontFamily="monospace">YOGA PLATFORM</text>
            <text x="150" y="33" textAnchor="middle" fill={`${PALETTE.cream}55`} fontSize="4.5" fontFamily="monospace">Open-air · raised bamboo deck · 26 ft × 13 ft (340 sq ft)</text>

            {/* Width */}
            <line x1="20" y1="46" x2="280" y2="46" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
            <line x1="20" y1="44" x2="20" y2="48" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
            <line x1="280" y1="44" x2="280" y2="48" stroke={`${PALETTE.cream}55`} strokeWidth="0.4"/>
            <text x="150" y="55" textAnchor="middle" fill={`${PALETTE.cream}66`} fontSize="5" fontFamily="monospace" fontWeight="bold">26 ft × 13 ft (8m × 4m · 340 sq ft)</text>
          </svg>
        </div>

        <div>
          <div style={{ fontSize: 10, color: PALETTE.gold, letterSpacing: 1, marginBottom: 8, fontFamily: "monospace" }}>BOUNDARY COTTAGE (11 UNITS — NORTH ROW + WEST COLUMN)</div>
          {[
            { label: "Roof (W×D)", value: "11 × 18ft (3.35 × 5.49m)" },
            { label: "Roof area", value: "~198 sqft" },
            { label: "Front verandah", value: "55 sqft (11 × 5ft, facing courtyard)" },
            { label: "Back porch", value: "44 sqft (11 × 4ft, overhangs trail)" },
            { label: "Total footprint", value: "297 sqft" },
            { label: "Gap (roof edge)", value: "3ft (0.91m)" },
          ].map((d, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "4px 0",
              borderBottom: `1px solid ${PALETTE.cream}08`,
            }}>
              <span style={{ fontSize: 9, color: `${PALETTE.cream}55` }}>{d.label}</span>
              <span style={{ fontSize: 9, color: PALETTE.gold, fontFamily: "monospace" }}>{d.value}</span>
            </div>
          ))}

          <div style={{ fontSize: 10, color: PALETTE.terracottaLight, letterSpacing: 1, marginTop: 12, marginBottom: 8, fontFamily: "monospace" }}>CAMPFIRE COTTAGE (4 UNITS — AROUND CAMPFIRE)</div>
          {[
            { label: "Roof (W×D)", value: "11 × 14.5ft (3.35 × 4.42m)" },
            { label: "Roof area", value: "~160 sqft" },
            { label: "Verandah", value: "44 sqft (11 × 4ft, facing campfire)" },
            { label: "Total footprint", value: "204 sqft" },
            { label: "Gap (roof edge)", value: "3ft (0.91m)" },
          ].map((d, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "4px 0",
              borderBottom: i < 5 ? `1px solid ${PALETTE.cream}08` : "none",
            }}>
              <span style={{ fontSize: 9, color: `${PALETTE.cream}55` }}>{d.label}</span>
              <span style={{ fontSize: 9, color: PALETTE.gold, fontFamily: "monospace" }}>{d.value}</span>
            </div>
          ))}

          <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, letterSpacing: 1, marginTop: 12, marginBottom: 6, fontFamily: "monospace" }}>COMMON AMENITIES</div>
          {[
            { label: "Raised platform", value: "2-3 ft above ground" },
            { label: "Yoga deck", value: "26×13ft (8×4m, east diagonal)" },
            { label: "Campfire", value: "~6.5ft diameter, chairs at 13ft" },
            { label: "Pathways", value: "1.5-2m wide, pedestrian only" },
          ].map((d, i) => (
            <div key={`c${i}`} style={{
              display: "flex", justifyContent: "space-between", padding: "3px 0",
              borderBottom: i < 3 ? `1px solid ${PALETTE.cream}08` : "none",
            }}>
              <span style={{ fontSize: 9, color: `${PALETTE.cream}55` }}>{d.label}</span>
              <span style={{ fontSize: 9, color: PALETTE.cream, fontFamily: "monospace" }}>{d.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="COTTAGE ZONE LAYOUT">
        <div style={{
          padding: 14, borderRadius: 8, marginBottom: 12,
          background: `${PALETTE.bamboo}22`, border: `1px solid ${PALETTE.bambooLight}33`,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: PALETTE.bambooLight, marginBottom: 8 }}>
            COTTAGE ZONE — 15 COTTAGES (11 BOUNDARY + 4 CAMPFIRE)
          </div>
          <div style={{ fontSize: 11, color: `${PALETTE.cream}88`, lineHeight: 1.7 }}>
            Cottages fill the northern zone in a <strong style={{ color: PALETTE.bambooLight }}>multi-cluster layout</strong>:
            5 canopy cottages along the north tree screen + 1 grand suite in the NE corner,
            6 canopy cottages along the west column facing east, and 4 canopy cottages around the campfire
            (2 per side, sideways orientation). The jacaranda stage sits at the centre.
            Stone paths connect all units. The entire zone is pedestrian-only — no vehicles enter.
            Yoga deck and plunge pool on the east boundary diagonal. Mixed roof colours create a striking aerial view.
          </div>
        </div>
      </Card>

      <Card title="WHY COTTAGES FIRST?" accent={PALETTE.gold}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 12 }}>
          {[
            { metric: "Build cost (15 units)", cottage: "₹50-85L", hotel: "₹1.5-2.5 Cr", winner: "cottage" },
            { metric: "Time to revenue", cottage: "2-3 months", hotel: "8-12 months", winner: "cottage" },
            { metric: "Payback period", cottage: "<1.5 years", hotel: "7-10 years", winner: "cottage" },
            { metric: "Annual revenue", cottage: "₹1.46-1.75 Cr", hotel: "comparable but slower", winner: "cottage" },
          ].map((row, i) => (
            <div key={i} style={{
              padding: 10, borderRadius: 6,
              background: `${PALETTE.gold}11`, border: `1px solid ${PALETTE.gold}22`,
            }}>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}66`, letterSpacing: 1, marginBottom: 6 }}>
                {row.metric.toUpperCase()}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: PALETTE.bambooLight }}>{row.cottage}</div>
                  <div style={{ fontSize: 8, color: `${PALETTE.cream}55` }}>Cottages</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: `${PALETTE.cream}44` }}>{row.hotel}</div>
                  <div style={{ fontSize: 8, color: `${PALETTE.cream}33` }}>Hotel rooms</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="COMPETITIVE LANDSCAPE — NE INDIA" accent={PALETTE.river}>
        <div style={{ fontSize: 11, color: `${PALETTE.cream}88`, lineHeight: 1.6, marginBottom: 14 }}>
          Neel Paakhi sits in a <strong style={{ color: PALETTE.gold }}>sweet spot</strong> between
          budget homestays and luxury lodges. The competitors below define the pricing ceiling;
          our cottages undercut them on rate while matching the core value proposition —
          <strong style={{ color: PALETTE.bambooLight }}> standalone privacy, nature immersion, curated experience</strong>.
        </div>

        {/* Competitor table */}
        <div style={{ marginBottom: 16 }}>
          {[
            { name: "Diphlu River Lodge", loc: "Kaziranga", type: "Standalone cottages", size: "400-500 sqft", rate: "₹17,000-23,000", positioning: "Ultra-premium safari lodge. Gold standard in NE India. 12 cottages on riverfront.", color: PALETTE.terracottaLight },
            { name: "Ri Kynjai", loc: "Shillong", type: "Lake-view cottages", size: "350-500 sqft", rate: "₹8,400-14,400", positioning: "Premium lake resort. 45 acres. Hybrid vernacular cottages command 70% premium over rooms.", color: PALETTE.river },
            { name: "IORA Retreat", loc: "Kaziranga", type: "Hotel rooms + suites", size: "300-400 sqft", rate: "₹6,500-9,500", positioning: "4-star hotel on 20 acres. 42 rooms. Conventional hotel, not cottage experience.", color: PALETTE.gold },
            { name: "Vivanta Guwahati", loc: "Guwahati", type: "City hotel rooms", size: "300-400 sqft", rate: "₹5,400-12,000", positioning: "Tata brand city hotel. Business + leisure. No nature/cottage component.", color: `${PALETTE.cream}88` },
          ].map((comp, i) => (
            <div key={i} style={{
              padding: 12, borderRadius: 6, marginBottom: 8,
              background: `${PALETTE.cream}06`, border: `1px solid ${PALETTE.cream}11`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: comp.color }}>{comp.name}</span>
                  <span style={{ fontSize: 9, color: `${PALETTE.cream}55`, marginLeft: 8 }}>{comp.loc}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: comp.color, fontFamily: "monospace" }}>{comp.rate}</span>
              </div>
              <div style={{ display: "flex", gap: 16, marginBottom: 4 }}>
                <span style={{ fontSize: 9, color: `${PALETTE.cream}66` }}>{comp.type}</span>
                <span style={{ fontSize: 9, color: `${PALETTE.cream}66` }}>{comp.size}</span>
              </div>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}55`, lineHeight: 1.4 }}>{comp.positioning}</div>
            </div>
          ))}
        </div>

        {/* Neel Paakhi positioning */}
        <div style={{
          padding: 14, borderRadius: 8, marginBottom: 14,
          background: `${PALETTE.bamboo}15`, border: `2px solid ${PALETTE.bambooLight}44`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 700, color: PALETTE.bambooLight }}>Neel Paakhi</span>
              <span style={{ fontSize: 9, color: `${PALETTE.cream}55`, marginLeft: 8 }}>Fulung, Guwahati outskirts</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: PALETTE.bambooLight, fontFamily: "monospace" }}>₹4,500-5,500</span>
          </div>
          <div style={{ display: "flex", gap: 16, marginBottom: 6 }}>
            <span style={{ fontSize: 9, color: PALETTE.bambooLight }}>Bamboo cottages + G+4 building</span>
            <span style={{ fontSize: 9, color: PALETTE.bambooLight }}>160-312 sqft (all canopy-size)</span>
          </div>
          <div style={{ fontSize: 10, color: `${PALETTE.cream}88`, lineHeight: 1.5 }}>
            15 standalone bamboo cottages (no corridors, no key-cards) + restaurant/bar + jacaranda stage.
            Priced 50-65% below Ri Kynjai cottages, 75% below Diphlu.
            Spacious boundary cottages (297 sqft with back porch) + intimate campfire units. <strong style={{ color: PALETTE.bambooLight }}>Outdoor-first living</strong> — verandah, campfire, jacaranda stage, yoga deck, plunge pool.
            Guests pay for the experience, not the square footage.
          </div>
        </div>

        {/* The niche argument */}
        <div style={{ fontSize: 10, color: PALETTE.gold, letterSpacing: 1, marginBottom: 8, fontFamily: "monospace" }}>THE SWEET SPOT</div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[
            { label: "BUDGET HOMESTAYS", range: "₹800-2,000", issue: "No privacy, shared bathrooms, inconsistent quality", color: `${PALETTE.cream}55` },
            { label: "NEEL PAAKHI", range: "₹4,500-5,500", issue: "Standalone cottage + ensuite bath + curated F&B + campfire culture. Low capex, fast payback.", color: PALETTE.bambooLight },
            { label: "LUXURY LODGES", range: "₹8,000-23,000", issue: "Premium experience but 5-10x the build cost. 7-10 year payback. High barrier to entry.", color: PALETTE.terracottaLight },
          ].map((tier, i) => (
            <div key={i} style={{
              padding: 10, borderRadius: 6, textAlign: "center",
              background: i === 1 ? `${PALETTE.bamboo}22` : `${PALETTE.cream}06`,
              border: i === 1 ? `2px solid ${PALETTE.bambooLight}44` : `1px solid ${PALETTE.cream}11`,
            }}>
              <div style={{ fontSize: 8, color: tier.color, letterSpacing: 1, marginBottom: 4, fontWeight: 600 }}>{tier.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: tier.color, fontFamily: "monospace", marginBottom: 6 }}>{tier.range}</div>
              <div style={{ fontSize: 8, color: `${PALETTE.cream}66`, lineHeight: 1.4 }}>{tier.issue}</div>
            </div>
          ))}
        </div>

        {/* Why all canopy — no nest tier */}
        <div style={{ fontSize: 10, color: PALETTE.gold, letterSpacing: 1, marginBottom: 8, fontFamily: "monospace" }}>WHY ALL CANOPY — NO NEST TIER</div>
        <div style={{
          padding: 12, borderRadius: 6, marginBottom: 14,
          background: `${PALETTE.cream}06`, border: `1px solid ${PALETTE.cream}11`,
        }}>
          <div style={{ fontSize: 10, color: `${PALETTE.cream}88`, lineHeight: 1.6, marginBottom: 10 }}>
            The original plan had two cottage tiers — <strong style={{ color: `${PALETTE.cream}55` }}>Nest (10 × 13ft, ₹3,000-3,500)</strong> and
            <strong style={{ color: PALETTE.gold }}> Canopy (11 × 14.5ft, ₹5,500-6,500)</strong>. But the 2x price jump for a 23% size increase
            doesn't hold up:
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
            {[
              { label: "Size difference", value: "130 vs 160 sqft", detail: "Only 30 sqft more roof — a guest inside can barely tell" },
              { label: "Build cost", value: "Roughly equal", detail: "Same bamboo frame, same tin roof, ~15 min extra material" },
              { label: "Price gap", value: "₹3,250 vs ₹6,000", detail: "2x rate for 23% more space — hard to justify side by side" },
              { label: "Real difference", value: "Shower: 24 vs 38 sqft", detail: "The shower is what makes canopy feel premium, not the bedroom" },
            ].map((item, i) => (
              <div key={i} style={{ padding: 8, borderRadius: 4, background: `${PALETTE.cream}04` }}>
                <div style={{ fontSize: 9, color: PALETTE.gold, fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: PALETTE.cream, fontFamily: "monospace", marginBottom: 2 }}>{item.value}</div>
                <div style={{ fontSize: 8, color: `${PALETTE.cream}55` }}>{item.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: `${PALETTE.cream}88`, lineHeight: 1.6 }}>
            <strong style={{ color: PALETTE.bambooLight }}>Decision:</strong> 15 cottages in two sizes — 11 spacious boundary cottages (11×18ft, 297 sqft with porches) + 4 compact campfire cottages (11×14.5ft, 204 sqft).
            Same price tier (₹4,500-5,500/night). Boundary cottages sell space and privacy; campfire cottages sell the fireside experience.
          </div>
        </div>

        {/* Revenue model */}
        <div style={{ fontSize: 10, color: PALETTE.gold, letterSpacing: 1, marginBottom: 8, fontFamily: "monospace" }}>REVENUE MODEL — 15 COTTAGES AT MATURITY</div>
        <div style={{ marginBottom: 8 }}>
          {[
            { label: "ADR", value: "₹5,000", note: "single tier pricing, boundary + campfire" },
            { label: "Occupancy (yr 2+)", value: "50-60%", note: "seasonality: 70%+ Oct-Mar, 30-40% monsoon" },
            { label: "Room nights / year", value: "2,738-3,285", note: "15 cottages × 365 days × 50-60%" },
            { label: "Gross cottage revenue", value: "₹1.37-1.64 Cr", note: "room nights × ₹5,000 ADR (rack rate)" },
            { label: "OTA/partner commission", value: "−₹14-16L", note: "~60% OTA @ ~17% avg, ~40% direct (no fee) — ~10% blended", color: PALETTE.terracottaLight },
            { label: "Net cottage revenue", value: "₹1.23-1.48 Cr", note: "after ~10% blended commission (yr 3-4)", color: PALETTE.bambooLight },
            { label: "F&B contribution", value: "₹35-50L", note: "restaurant + bar (walk-ins + guests)" },
            { label: "Net total revenue", value: "₹1.58-1.98 Cr", note: "cottages (net) + F&B, before hotel rooms", color: PALETTE.bambooLight },
            { label: "Total build cost", value: "₹2.50-3.50 Cr", note: "Phase 1+2 (6 cottages + restaurant + G+4 frame)" },
            { label: "Payback", value: "1.5-2 years", note: "on net cottage + F&B revenue" },
          ].map((row, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              padding: "5px 0", borderBottom: i < 9 ? `1px solid ${PALETTE.cream}08` : "none",
            }}>
              <span style={{ fontSize: 10, color: `${PALETTE.cream}77` }}>{row.label}</span>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: row.color || PALETTE.gold, fontFamily: "monospace" }}>{row.value}</span>
                <div style={{ fontSize: 8, color: `${PALETTE.cream}44` }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 10, background: `${PALETTE.cream}06`, borderRadius: 4, marginBottom: 8 }}>
          <div style={{ fontSize: 9, color: `${PALETTE.cream}66`, fontWeight: 600, marginBottom: 6 }}>PRICING MODEL — GUEST PAYS ₹5,000 ON EVERY CHANNEL</div>
          <div style={{ overflowX: mobile ? "auto" : "visible" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto auto", gap: 0, fontSize: 9, marginBottom: 8, minWidth: mobile ? 480 : "auto" }}>
            {["Channel", "We list", "Platform fee", "Guest pays", "We net"].map((h, i) => (
              <div key={h} style={{ padding: "4px 6px", fontWeight: 700, color: `${PALETTE.cream}77`, borderBottom: `1px solid ${PALETTE.cream}15`,
                borderRight: i < 4 ? `1px solid ${PALETTE.cream}08` : "none" }}>{h}</div>
            ))}
            {[
              { ch: "Direct (website)", list: "₹5,000", fee: "0%", pays: "₹5,000", net: "₹5,000", color: PALETTE.bambooLight },
              { ch: "Airbnb", list: "₹4,386", fee: "3% host + 14% guest", pays: "~₹5,000", net: "₹4,254", color: PALETTE.gold },
              { ch: "Booking.com", list: "₹5,000", fee: "~18%", pays: "₹5,000", net: "₹4,100", color: PALETTE.gold },
              { ch: "MakeMyTrip", list: "₹5,000", fee: "~20%", pays: "₹5,000", net: "₹4,000", color: PALETTE.gold },
            ].map((row, i) => (
              <Fragment key={i}>
                <div style={{ padding: "3px 6px", color: row.color, fontWeight: 600, borderRight: `1px solid ${PALETTE.cream}08`, borderBottom: `1px solid ${PALETTE.cream}06` }}>{row.ch}</div>
                <div style={{ padding: "3px 6px", color: `${PALETTE.cream}66`, borderRight: `1px solid ${PALETTE.cream}08`, borderBottom: `1px solid ${PALETTE.cream}06` }}>{row.list}</div>
                <div style={{ padding: "3px 6px", color: `${PALETTE.cream}55`, borderRight: `1px solid ${PALETTE.cream}08`, borderBottom: `1px solid ${PALETTE.cream}06` }}>{row.fee}</div>
                <div style={{ padding: "3px 6px", color: `${PALETTE.cream}77`, borderRight: `1px solid ${PALETTE.cream}08`, borderBottom: `1px solid ${PALETTE.cream}06` }}>{row.pays}</div>
                <div style={{ padding: "3px 6px", color: row.color, fontWeight: 600, borderBottom: `1px solid ${PALETTE.cream}06` }}>{row.net}</div>
              </Fragment>
            ))}
          </div>
          </div>
          <div style={{ fontSize: 9, color: `${PALETTE.cream}55`, lineHeight: 1.5, marginBottom: 6 }}>
            <strong style={{ color: `${PALETTE.cream}66` }}>Airbnb split-fee:</strong> We list at ₹5,000÷1.14 = ₹4,386 so the guest sees ₹4,386 + 14% service fee ≈ ₹5,000 at checkout. We then pay 3% host fee on ₹4,386. Effective cut: ~15% of guest price.
          </div>
          <div style={{ fontSize: 9, color: `${PALETTE.cream}66`, fontWeight: 600, marginTop: 8, marginBottom: 4 }}>OTA MIX & BLENDED COMMISSION (OFF ₹5,000 GUEST PRICE)</div>
          <div style={{ overflowX: mobile ? "auto" : "visible" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr auto", gap: 0, fontSize: 9, minWidth: mobile ? 440 : "auto" }}>
            {["Period", "Airbnb", "Booking/MMT", "Direct", "Blended"].map((h, i) => (
              <div key={h} style={{ padding: "4px 6px", fontWeight: 700, color: `${PALETTE.cream}77`, borderBottom: `1px solid ${PALETTE.cream}15`,
                borderRight: i < 4 ? `1px solid ${PALETTE.cream}08` : "none" }}>{h}</div>
            ))}
            {[
              { period: "Yr 1-2", airbnb: "40% (15%)", bmmt: "40% (19%)", direct: "20% (0%)", blended: "~14%", color: PALETTE.terracottaLight },
              { period: "Yr 3-4", airbnb: "35% (15%)", bmmt: "25% (19%)", direct: "40% (0%)", blended: "~10%", color: PALETTE.gold },
              { period: "Yr 5+", airbnb: "25% (15%)", bmmt: "15% (19%)", direct: "60% (0%)", blended: "~7%", color: PALETTE.bambooLight },
            ].map((row, i) => (
              <Fragment key={i}>
                <div style={{ padding: "3px 6px", color: row.color, fontWeight: 600, borderRight: `1px solid ${PALETTE.cream}08`, borderBottom: `1px solid ${PALETTE.cream}06` }}>{row.period}</div>
                <div style={{ padding: "3px 6px", color: `${PALETTE.cream}66`, borderRight: `1px solid ${PALETTE.cream}08`, borderBottom: `1px solid ${PALETTE.cream}06` }}>{row.airbnb}</div>
                <div style={{ padding: "3px 6px", color: `${PALETTE.cream}66`, borderRight: `1px solid ${PALETTE.cream}08`, borderBottom: `1px solid ${PALETTE.cream}06` }}>{row.bmmt}</div>
                <div style={{ padding: "3px 6px", color: `${PALETTE.cream}66`, borderRight: `1px solid ${PALETTE.cream}08`, borderBottom: `1px solid ${PALETTE.cream}06` }}>{row.direct}</div>
                <div style={{ padding: "3px 6px", color: row.color, fontWeight: 600, borderBottom: `1px solid ${PALETTE.cream}06` }}>{row.blended}</div>
              </Fragment>
            ))}
          </div>
          </div>
          <div style={{ fontSize: 8, color: `${PALETTE.cream}44`, marginTop: 6, fontStyle: "italic" }}>
            Maturity model uses yr 3-4 blended rate (~10%). Airbnb is strongest for unique/cottage stays; NE India adoption growing fast.
          </div>
        </div>

        <div style={{
          padding: 10, borderRadius: 6, marginTop: 8,
          background: `${PALETTE.gold}11`, border: `1px solid ${PALETTE.gold}22`,
        }}>
          <div style={{ fontSize: 10, color: `${PALETTE.cream}88`, lineHeight: 1.5 }}>
            <strong style={{ color: PALETTE.gold }}>The thesis:</strong> Build the experience first (₹2-3 Cr), prove demand with 15 cottages,
            then layer hotel rooms (Phases 5-7, ₹1.81-2.48 Cr) on top of a running, revenue-generating property.
            Total 33 keys at maturity (15 cottages + 18 rooms). Competitors built the hotel first and the experience second — or never.
          </div>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TRAFFIC TAB
// ═══════════════════════════════════════════════════════════
function TrafficTab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="ONE-WAY VEHICLE FLOW: WEST IN → EAST OUT">
        <Zoomable>
          <img src="/images/neel-paakhi-traffic.png" alt="Traffic Flow" style={{ width: "100%", maxWidth: 560, display: "block", margin: "0 auto 16px" }} />
        </Zoomable>

        {/* Legend */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: 6, marginTop: 4 }}>
          {[
            { color: "#6b8f5e", label: "Car entry", desc: "West road (N or S)" },
            { color: "#5a9aba", label: "Car exit", desc: "East road (N or S)" },
            { color: PALETTE.terracottaLight, label: "Service + 2W", desc: "South road → Gate B → kitchen" },
            { color: PALETTE.gold, label: "Pedestrian", desc: "All gates, all roads" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, padding: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: i === 3 ? "50%" : 2, background: item.color, flexShrink: 0 }}/>
              <div>
                <div style={{ fontSize: 9, color: item.color, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 8, color: `${PALETTE.cream}44` }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="FLOW DETAILS">
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ padding: 12, background: "#6b8f5e15", borderRadius: 8, borderLeft: "3px solid #6b8f5e" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b8f5e", marginBottom: 4 }}>VEHICLE ENTRY (WEST ROAD → GATE A → CORRIDOR → PARKING)</div>
            <div style={{ fontSize: 11, color: `${PALETTE.cream}88`, lineHeight: 1.6 }}>
              Cars arrive on the west road from either direction — southbound from the main road or northbound from the south. Both enter through Gate A at the vehicle corridor (the gap between cottage zone and building zone) and proceed east to parking (7 car spots on the west boundary).
            </div>
          </div>
          <div style={{ padding: 12, background: "#5a9aba15", borderRadius: 8, borderLeft: "3px solid #5a9aba" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5a9aba", marginBottom: 4 }}>VEHICLE EXIT (PARKING → CORRIDOR → GATE C → EAST ROAD)</div>
            <div style={{ fontSize: 11, color: `${PALETTE.cream}88`, lineHeight: 1.6 }}>
              Departing vehicles exit eastward through the corridor and out through Gate C onto the east diagonal road — north to the main road or south, depending on destination. Entry (west, Gate A) and exit (east, Gate C) are always on separate roads.
            </div>
          </div>
          <div style={{ padding: 12, background: `${PALETTE.terracotta}15`, borderRadius: 8, borderLeft: `3px solid ${PALETTE.terracottaLight}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: PALETTE.terracottaLight, marginBottom: 4 }}>SERVICE + 2W (SOUTH ROAD → GATE B → KITCHEN / 2W PARKING)</div>
            <div style={{ fontSize: 11, color: `${PALETTE.cream}88`, lineHeight: 1.6 }}>
              Kitchen deliveries, waste, laundry, staff, and two-wheelers enter from the south road via Gate B (walk + 2W). Two-wheeler parking is along the west boundary south of car spots. Invisible to arriving guests — the main guest flow is from the west and north.
            </div>
          </div>
          <div style={{ padding: 12, background: `${PALETTE.gold}11`, borderRadius: 8, borderLeft: `3px solid ${PALETTE.gold}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: PALETTE.gold, marginBottom: 4 }}>PEDESTRIAN (GATE B + ALL ROADS + COTTAGE ZONE)</div>
            <div style={{ fontSize: 11, color: `${PALETTE.cream}88`, lineHeight: 1.6 }}>
              Walk-in guests and two-wheelers enter from Gate B (south, walk + 2W) or any road. Gate C on the east diagonal is bidirectional for pedestrians. The cottage zone is entirely pedestrian — no vehicles enter it. Guests walk between cottages and the building zone via landscaped stone paths.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PHASE 0 — LAND ACQUISITION
// ═══════════════════════════════════════════════════════════
function Phase0Tab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="PHASE 0 — LAND (IN PROGRESS)">
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 16 }}>
          All 5 plots in Fulung, North Guwahati have been acquired — <strong style={{ color: PALETTE.gold }}>6.85 katha (~19,728 sq ft)</strong>.
          Registration, stamp duty, boundary survey, and legal verification are complete. The compound is secured.
        </div>
        <div style={{
          padding: 20, borderRadius: 10, textAlign: "center", marginBottom: 16,
          background: `linear-gradient(135deg, ${PALETTE.gold}22 0%, ${PALETTE.gold}11 100%)`,
          border: `2px solid ${PALETTE.gold}44`,
        }}>
          <div style={{ fontSize: 10, color: PALETTE.gold, letterSpacing: 2, fontFamily: "monospace" }}>TOTAL LAND COST</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: PALETTE.gold, marginTop: 6 }}>₹3.43 Cr</div>
          <div style={{ fontSize: 11, color: `${PALETTE.cream}66`, marginTop: 4 }}>5 plots · 6.85 katha · ₹50L/katha</div>
          <div style={{ fontSize: 10, color: "#4aae5a", marginTop: 4, fontWeight: 600 }}>LOI Signed · 45–60 days</div>
        </div>
      </Card>

      <Card title="PLOT-BY-PLOT BREAKDOWN">
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 8 }}>
          {[
            { plot: "16", area: "3,600", katha: "1.25", cost: "62.5L", pos: "South" },
            { plot: "17", area: "4,090", katha: "1.42", cost: "71.0L", pos: "Centre" },
            { plot: "18", area: "4,550", katha: "1.58", cost: "79.0L", pos: "North" },
            { plot: "19", area: "3,600", katha: "1.25", cost: "62.5L", pos: "NW" },
            { plot: "19A", area: "3,888", katha: "1.35", cost: "67.5L", pos: "NE" },
          ].map((p, i) => (
            <div key={i} style={{
              padding: 10, borderRadius: 8, textAlign: "center",
              background: i < 3 ? `${PALETTE.navy}44` : `${PALETTE.bamboo}33`,
              border: `1px solid ${i < 3 ? `${PALETTE.gold}33` : `${PALETTE.bambooLight}33`}`,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: i < 3 ? PALETTE.gold : PALETTE.bambooLight }}>{p.plot}</div>
              <div style={{ fontSize: 8, color: `${PALETTE.cream}66`, marginTop: 2 }}>{p.pos}</div>
              <div style={{ fontSize: 10, color: `${PALETTE.cream}bb`, marginTop: 6 }}>{p.area} sqft</div>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}66` }}>{p.katha} katha</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: PALETTE.gold, marginTop: 4 }}>₹{p.cost}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 12, padding: 10, background: `${PALETTE.gold}15`, borderRadius: 8,
          textAlign: "center", fontSize: 13, color: PALETTE.gold, fontWeight: 600,
        }}>
          Total: ₹3.43 Cr (6.85 katha @ ₹50L/katha) — Base: ₹2.13 Cr (Plots 16-18) + Expansion: ₹1.30 Cr (19 + 19A)
        </div>
      </Card>

      <Card title="PHASE 0 COST BREAKDOWN">
        {[
          { cat: "Land — Plots 16-18 (base, south-centre-north)", amt: "₹2.13 Cr", pct: 62 },
          { cat: "Land — Plot 19 (NW, cottage expansion)", amt: "₹62.5L", pct: 18 },
          { cat: "Land — Plot 19A (NE, cottage expansion)", amt: "₹67.5L", pct: 20 },
        ].map((row, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: `${PALETTE.cream}99` }}>{row.cat}</span>
              <span style={{ fontSize: 11, color: PALETTE.gold, fontWeight: 600 }}>{row.amt}</span>
            </div>
            <div style={{ height: 4, background: `${PALETTE.cream}11`, borderRadius: 2 }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${row.pct}%`, background: PALETTE.gold }}/>
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 12, padding: 10, background: `${PALETTE.gold}15`, borderRadius: 6,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, color: PALETTE.gold, fontWeight: 600 }}>Total Phase 0</span>
          <span style={{ fontSize: 18, color: PALETTE.gold, fontWeight: 700 }}>₹3.43 Cr</span>
        </div>
        <div style={{ fontSize: 10, color: `${PALETTE.cream}55`, marginTop: 8, lineHeight: 1.5 }}>
          Excludes registration, stamp duty, and legal fees (~3-5% additional, or ₹10-17L).
          Includes boundary survey and demarcation.
        </div>
      </Card>

      <Card title="STATUS" accent={PALETTE.gold}>
        <div style={{
          padding: 14, borderRadius: 8, marginBottom: 12,
          background: `linear-gradient(135deg, ${PALETTE.gold}22 0%, ${PALETTE.gold}08 100%)`,
          border: `1px solid ${PALETTE.gold}44`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%", background: "#4aae5a",
              boxShadow: "0 0 6px #4aae5a88",
            }}/>
            <span style={{ fontSize: 13, fontWeight: 700, color: PALETTE.gold, letterSpacing: 1, fontFamily: "monospace" }}>
              IN PROGRESS
            </span>
          </div>
          <div style={{ fontSize: 11, color: `${PALETTE.cream}bb`, lineHeight: 1.7 }}>
            LOI signed. Expected completion in <strong style={{ color: PALETTE.gold }}>45–60 days</strong>.
            All 5 plots acquired. Registration, stamp duty, survey, and boundary demarcation complete.
            The compound boundary — west road, east diagonal road, south frontage — is fully secured with three gate positions (A, B, C).
          </div>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PHASE 1 — LANDSCAPE + COTTAGES + POOL
// ═══════════════════════════════════════════════════════════
function Phase1Tab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="PHASE 1 — LANDSCAPE + COTTAGES + PLUNGE POOL">
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 16 }}>
          With the land secured (Phase 0), Phase 1 creates the <strong style={{ color: PALETTE.bambooLight }}>core outdoor retreat experience</strong>:
          landscaped grounds, a walking trail, 6 cottages (5 north row + 1 west column), a plunge pool, restrooms, and the vehicle corridor.
          No restaurant or bar yet — this phase proves demand with accommodation, nature, and evening bonfires.
          Revenue starts from <strong style={{ color: PALETTE.gold }}>cottage bookings from day one</strong>.
        </div>
        <div style={{
          padding: 16, borderRadius: 10, textAlign: "center", marginBottom: 16,
          background: `${PALETTE.bamboo}15`,
          border: `1px solid ${PALETTE.bambooLight}33`,
        }}>
          <div style={{ fontSize: 10, color: PALETTE.bambooLight, letterSpacing: 2, fontFamily: "monospace" }}>PHASE 1 INVESTMENT</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: PALETTE.bambooLight, marginTop: 6 }}>₹1.30-1.95 Cr</div>
          <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, marginTop: 4 }}>Landscaping + 6 cottages (5 north + 1 west) + plunge pool + restrooms + vehicle corridor + gates</div>
        </div>
      </Card>

      <Card title="PHASE 1 COST BREAKDOWN">
        {[
          { cat: "Landscaping, trail, perimeter trees, approach", amt: "₹25-35L", pct: 18 },
          { cat: "6 cottages (5 north row + 1 west column)", amt: "₹30-48L", pct: 30 },
          { cat: "Plunge pool + deck surround", amt: "₹5-6L", pct: 3 },
          { cat: "Restrooms A + B (M+F each)", amt: "₹5-10L", pct: 5 },
          { cat: "Vehicle corridor, parking gravel, gates A/B/C", amt: "₹12-18L", pct: 9 },
          { cat: "FF&E + pre-opening expenses", amt: "₹20-30L", pct: 15 },
          { cat: "Yoga deck (east boundary, diagonal)", amt: "₹3-5L", pct: 3 },
        ].map((row, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: `${PALETTE.cream}99` }}>{row.cat}</span>
              <span style={{ fontSize: 11, color: PALETTE.bambooLight, fontWeight: 600 }}>{row.amt}</span>
            </div>
            <div style={{ height: 4, background: `${PALETTE.cream}11`, borderRadius: 2 }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${row.pct}%`, background: PALETTE.bambooLight }}/>
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 12, padding: 10, background: `${PALETTE.bamboo}15`, borderRadius: 6,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, color: PALETTE.bambooLight, fontWeight: 600 }}>Total Phase 1</span>
          <span style={{ fontSize: 18, color: PALETTE.bambooLight, fontWeight: 700 }}>₹1.30-1.95 Cr</span>
        </div>
      </Card>

      <Card title="WHAT PHASE 1 DELIVERS">
        {[
          { item: "6 cottages (5 north row + 1 west column)", detail: "A-frame bamboo cottages (11×18ft roof + 5ft verandah + 4ft back porch). Brahmaputra, Kamakhya, Kaziranga, Majuli, Manas, Dihing", color: PALETTE.bambooLight },
          { item: "Landscaping + walking trail (~350m)", detail: "Perimeter shaded loop with native trees — neem, bamboo, jackfruit, areca nut. Stone pathways", color: "#6b8f5e" },
          { item: "Plunge pool + deck surround", detail: "7×3m on east boundary wellness strip, parallel to diagonal. Fibre composite, removable, 12-year warranty", color: PALETTE.river },
          { item: "Vehicle corridor", detail: "East-west one-way lane between cottage zone and future building footprint. Cars enter west (Gate A), exit east (Gate C)", color: `${PALETTE.cream}77` },
          { item: "Three gates", detail: "Gate A (west, cars+people), Gate B (south, walk+2W), Gate C (east diagonal, people + car exit)", color: PALETTE.gold },
          { item: "Parking (7 cars + 2W)", detail: "West wall south of vehicle corridor. 7 car spots + two-wheeler parking below", color: `${PALETTE.cream}44` },
          { item: "Yoga deck (east boundary)", detail: "Raised bamboo deck, 8×4m (26×13ft), aligned parallel to east diagonal", color: PALETTE.river },
          { item: "Restrooms A + B (M+F each)", detail: "Restroom A on east boundary between pool and yoga. Restroom B at building divider between future restaurant and lobby zones", color: PALETTE.river },
        ].map((z, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8,
            padding: 10, background: `${PALETTE.charcoal}88`, borderRadius: 8,
            borderLeft: `3px solid ${z.color}`,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: z.color }}>{z.item}</div>
              <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, marginTop: 2 }}>{z.detail}</div>
            </div>
          </div>
        ))}
      </Card>

      <Card title="PHASE 1 REVENUE (COTTAGES ONLY)" accent={PALETTE.bambooLight}>
        <div style={{ fontSize: 11, color: `${PALETTE.cream}88`, lineHeight: 1.7, marginBottom: 12 }}>
          Phase 1 generates revenue from <strong style={{ color: PALETTE.bambooLight }}>cottage bookings</strong>.
          Weekend retreats, couples getaways, corporate off-sites. Campfire evenings and nature walks are the draw.
          No restaurant or bar yet — guests can order in or we partner with local caterers.
        </div>
        <div style={{
          padding: 14, background: `${PALETTE.bamboo}15`, borderRadius: 8,
          border: `1px solid ${PALETTE.bambooLight}33`, marginBottom: 10,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, color: PALETTE.bambooLight, letterSpacing: 1 }}>GROSS ANNUAL REVENUE (6 UNITS)</div>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}55`, marginTop: 2 }}>₹4,500-5,500 ADR × 40-55% occupancy</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: PALETTE.bambooLight }}>₹46-72L</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 14px" }}>
          <span style={{ fontSize: 10, color: `${PALETTE.cream}55` }}>OTA/partner commission (~14% blended, yr 1-2)</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: PALETTE.terracottaLight, fontFamily: "monospace" }}>−₹6-10L</span>
        </div>
        <div style={{
          padding: 14, background: `${PALETTE.bambooLight}18`, borderRadius: 8,
          border: `1px solid ${PALETTE.bambooLight}44`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, color: PALETTE.bambooLight, letterSpacing: 1 }}>NET ANNUAL REVENUE</div>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}55`, marginTop: 2 }}>after OTA/partner commission (80% OTA in yr 1-2)</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: PALETTE.bambooLight }}>₹40-62L</div>
          </div>
        </div>
      </Card>

      <Card title="TIMELINE" accent={PALETTE.gold}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          {[
            { label: "Landscaping + trail", time: "2-3 mo", color: "#6b8f5e" },
            { label: "Cottages + pool + gates", time: "2-3 mo", color: PALETTE.bambooLight },
          ].map((t, i) => (
            <div key={i} style={{ padding: 12, background: `${t.color}15`, borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: t.color }}>{t.time}</div>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}66`, marginTop: 4 }}>{t.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 10, color: `${PALETTE.cream}55`, textAlign: "center" }}>
          Total Phase 1: ~3-5 months. Can start immediately after Phase 0 land registration.
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PHASE 2 — RESTAURANT + BAR + KITCHEN + G+4 FRAME
// ═══════════════════════════════════════════════════════════
function Phase2Tab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="PHASE 2 — RESTAURANT + BAR + KITCHEN + JACARANDA STAGE">
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 16 }}>
          Phase 2 builds the <strong style={{ color: PALETTE.terracottaLight }}>soul of Neel Paakhi</strong>: the restaurant + bar, kitchen,
          jacaranda stage, reception, courtyard, and the <strong style={{ color: PALETTE.river }}>G+4 structural frame</strong> that
          carries all future floors. The ground floor is mostly open-air with a very tall ceiling — imagine the second-floor
          slab soaring above the lobby, jacaranda tree, plunge pool, and courtyard.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          <Stat label="REST. + BAR" value="44-48" sub="seats + bar counter" color={PALETTE.terracottaLight}/>
          <Stat label="STAGE" value="Jacaranda" sub="cottage verandahs as gallery" color={PALETTE.gold}/>
          <Stat label="STRUCTURE" value="G+4" sub="frame built now" color={PALETTE.river}/>
        </div>
      </Card>

      <Card title="PHASE 2 COST BREAKDOWN">
        {[
          { cat: "G+4 structural frame (columns, beams, foundation)", amt: "₹45-55L", pct: 38 },
          { cat: "Restaurant + bar (indoor, 6×4ft stage corner)", amt: "₹25-35L", pct: 21 },
          { cat: "Bar counter, back-bar, equipment & glassware", amt: "₹5-8L", pct: 5 },
          { cat: "Kitchen + service zone (south end of building)", amt: "₹15-20L", pct: 11 },
          { cat: "Jacaranda stage (raised platform, lighting)", amt: "₹2-3L", pct: 2 },
          { cat: "Reception + lobby", amt: "₹8-12L", pct: 8 },
          { cat: "Courtyard paving, jacaranda, Restroom C", amt: "₹10-12L", pct: 8 },
          { cat: "Restroom C (NE nook) + staff toilet", amt: "₹5-8L", pct: 5 },
        ].map((row, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: `${PALETTE.cream}99` }}>{row.cat}</span>
              <span style={{ fontSize: 11, color: PALETTE.terracottaLight, fontWeight: 600 }}>{row.amt}</span>
            </div>
            <div style={{ height: 4, background: `${PALETTE.cream}11`, borderRadius: 2 }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${row.pct}%`,
                background: i === 0 ? PALETTE.river : PALETTE.terracottaLight }}/>
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 12, padding: 10, background: `${PALETTE.terracotta}15`, borderRadius: 6,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, color: PALETTE.terracottaLight, fontWeight: 600 }}>Total Phase 2</span>
          <span style={{ fontSize: 18, color: PALETTE.terracottaLight, fontWeight: 700 }}>₹1.20-1.55 Cr</span>
        </div>
      </Card>

      <Card title="WHAT PHASE 2 DELIVERS">
        {[
          { item: "Restaurant + bar", detail: "44-48 seats + bar counter (6-8 stools), green-roof, retractable screens. One open room — no wall between dining and bar. 6×4ft raised stage in the corner for a solo guitarist", color: PALETTE.terracottaLight },
          { item: "Kitchen + service zone", detail: "South end of building. Deliveries from south road via Gate B, invisible to guests. Full commercial kitchen", color: PALETTE.terracottaLight },
          { item: "Jacaranda stage", detail: "Raised stage (8×6ft) beneath the jacaranda tree. Cottage verandahs are the gallery — no amphitheater seating needed. Music-only venue, no food or bar", color: PALETTE.gold },
          { item: "Reception + lobby", detail: "Along east diagonal wall — guests walk across a grand lobby to reach reception desks aligned with the diagonal", color: PALETTE.river },
          { item: "Central courtyard + jacaranda stage", detail: "~1,200 sq ft, open-to-sky. Stone paving, raised stage under jacaranda, herb garden", color: PALETTE.bambooLight },
          { item: "G+4 structural frame", detail: "All columns, beams, and foundation sized for 4 upper floors + rooftop. Zero rework when building up", color: PALETTE.river },
        ].map((z, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8,
            padding: 10, background: `${PALETTE.charcoal}88`, borderRadius: 8,
            borderLeft: `3px solid ${z.color}`,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: z.color }}>{z.item}</div>
              <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, marginTop: 2 }}>{z.detail}</div>
            </div>
          </div>
        ))}
      </Card>

      <Card title="COMBINED REVENUE (PHASE 1 + 2)" accent={PALETTE.gold}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ padding: 14, background: `${PALETTE.bamboo}22`, borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: PALETTE.bambooLight, letterSpacing: 1, marginBottom: 8 }}>COTTAGE (NET)</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: PALETTE.bambooLight }}>₹40-62L</div>
            <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, marginTop: 4, lineHeight: 1.5 }}>6 cottages × ₹4,500-5,500 ADR × 40-55% occ<br/>after ~14% commission (80% OTA, yr 1-2)</div>
          </div>
          <div style={{ padding: 14, background: `${PALETTE.terracotta}22`, borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: PALETTE.terracottaLight, letterSpacing: 1, marginBottom: 8 }}>F&B REVENUE</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: PALETTE.terracottaLight }}>₹45-80L</div>
            <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, marginTop: 4, lineHeight: 1.5 }}>34-42 seats × ₹500-800 avg × 30-40 covers/day<br/>no OTA commission on F&B</div>
          </div>
        </div>
        <div style={{
          padding: 14, background: `${PALETTE.gold}15`, borderRadius: 8,
          border: `1px solid ${PALETTE.gold}33`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, color: PALETTE.gold, letterSpacing: 1 }}>NET ANNUAL REVENUE</div>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}55`, marginTop: 2 }}>Cottages (net) + F&B + events + music nights</div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: PALETTE.gold }}>₹85L-1.42 Cr</div>
          </div>
        </div>
      </Card>

      <Card title="TIMELINE" accent={PALETTE.gold}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "G+4 frame + foundation", time: "3-4 mo", color: PALETTE.river },
            { label: "Restaurant + bar + kitchen", time: "2-3 mo", color: PALETTE.terracottaLight },
            { label: "Jacaranda stage + courtyard + reception", time: "1-2 mo", color: PALETTE.gold },
          ].map((t, i) => (
            <div key={i} style={{ padding: 12, background: `${t.color}15`, borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: t.color }}>{t.time}</div>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}66`, marginTop: 4 }}>{t.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 10, color: `${PALETTE.cream}55`, textAlign: "center" }}>
          Total Phase 2: ~6-8 months. Can overlap with Phase 1 cottage operations.
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PHASE 3 — TIGMAMINDS HQ (FULL 1F)
// ═══════════════════════════════════════════════════════════
function Phase3Tab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="PHASE 3 — FIRST FLOOR: TIGMAMINDS HQ (FULL 1F)" accent={PALETTE.river}>
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 12 }}>
          The full first floor slab is poured over the entire building footprint — above the restaurant, kitchen, lobby, and reception.
          This becomes the India headquarters for <strong style={{ color: PALETTE.river }}>TigmaMinds Private Limited</strong> (tigmaminds.com)
          and <strong style={{ color: PALETTE.river }}>TigmaMinds Academy</strong> (tigmaminds.academy). Rather than renting office space in Guwahati,
          build it on top of Neel Paakhi — turning a cost centre into an owned asset.
        </div>
        <div style={{ fontSize: 11, color: `${PALETTE.cream}77`, lineHeight: 1.7, marginBottom: 12, padding: 10, background: `${PALETTE.gold}08`, borderRadius: 6, border: `1px solid ${PALETTE.gold}18` }}>
          The retreat setting <em>is</em> the pitch: host Academy cohorts, client workshops, and investor meetings 
          in a boutique property we own — not a generic co-working space. The first floor is designed so it{' '}
          <strong style={{ color: PALETTE.gold }}>could convert to hotel rooms later</strong> if the business evolves 
          (plumbing roughed in at regular intervals, modular partition walls).
        </div>
      </Card>

      <Card title="FIRST FLOOR LAYOUT (~1,900 sq ft usable)">
        <Zoomable>
          <img src="/images/neel-paakhi-first-floor.png" alt="First Floor Plan" style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto 12px" }} />
        </Zoomable>
        <div style={{ fontSize: 11, color: `${PALETTE.cream}77`, lineHeight: 1.7, marginBottom: 12, padding: 10, background: `${PALETTE.river}08`, borderRadius: 6, border: `1px solid ${PALETTE.river}18` }}>
          Same parallelogram footprint as ground floor (10m / 33ft wide). Full 1F slab over the entire building footprint.
          Zones stacked south→north: Open Office (33×16ft) → Training (33×13ft) → Stairs/Elev/WC → Conference (18×20ft) + Gym (15×20ft).
        </div>
        {/* Old schematic SVG kept for reference but hidden — replaced by to-scale PNG above */}
        {false && <Zoomable><svg viewBox="0 0 220 180" style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto 12px" }}>
          <rect x="0" y="0" width="220" height="180" fill={PALETTE.dark} rx="4"/>
          
          {/* Floor outline — trapezoidal like ground floor */}
          <polygon points="10,10 200,10 185,170 10,170" fill={`${PALETTE.navy}55`} stroke={`${PALETTE.gold}33`} strokeWidth="0.8"/>
          
          {/* Central corridor */}
          <rect x="90" y="10" width="8" height="160" fill={`${PALETTE.gold}15`} stroke={`${PALETTE.gold}33`} strokeWidth="0.4"/>
          <text x="94" y="92" textAnchor="middle" fill={`${PALETTE.gold}55`} fontSize="3" fontFamily="monospace" transform="rotate(-90, 94, 92)">CORRIDOR</text>
          
          {/* West wing — Open Office */}
          <rect x="14" y="14" width="72" height="80" fill={`${PALETTE.river}22`} rx="2" stroke={PALETTE.river} strokeWidth="0.5"/>
          <text x="50" y="38" textAnchor="middle" fill={PALETTE.river} fontSize="5.5" fontWeight="bold" fontFamily="monospace">OPEN OFFICE</text>
          <text x="50" y="46" textAnchor="middle" fill={`${PALETTE.cream}55`} fontSize="3" fontFamily="monospace">TigmaMinds</text>
          <text x="50" y="53" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="2.8" fontFamily="monospace">~12-16 workstations</text>
          <text x="50" y="59" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="2.8" fontFamily="monospace">Standing desks, collaboration pods</text>
          {/* Desk icons */}
          {[0,1,2,3].map(r => [0,1,2].map(c => (
            <rect key={`d${r}${c}`} x={22+c*20} y={64+r*7} width="14" height="4" rx="0.5" fill={`${PALETTE.river}44`} stroke={`${PALETTE.river}66`} strokeWidth="0.3"/>
          )))}
          
          {/* West wing — Training Room */}
          <rect x="14" y="98" width="72" height="68" fill={`${PALETTE.bamboo}22`} rx="2" stroke={PALETTE.bamboo} strokeWidth="0.5"/>
          <text x="50" y="118" textAnchor="middle" fill={PALETTE.bambooLight} fontSize="5" fontWeight="bold" fontFamily="monospace">TRAINING ROOM</text>
          <text x="50" y="126" textAnchor="middle" fill={`${PALETTE.cream}55`} fontSize="3" fontFamily="monospace">TigmaMinds Academy</text>
          <text x="50" y="133" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="2.8" fontFamily="monospace">20-seat classroom / workshop</text>
          <text x="50" y="139" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="2.8" fontFamily="monospace">Projector, whiteboard, breakout nook</text>
          {/* Chair rows */}
          {[0,1,2,3].map(r => [0,1,2,3,4].map(c => (
            <circle key={`s${r}${c}`} cx={24+c*13} cy={146+r*5} r="1.8" fill={`${PALETTE.bamboo}44`} stroke={`${PALETTE.bamboo}66`} strokeWidth="0.3"/>
          )))}
          
          {/* East wing — Conference Room */}
          <rect x="102" y="14" width="88" height="44" fill={`${PALETTE.gold}15`} rx="2" stroke={`${PALETTE.gold}55`} strokeWidth="0.5"/>
          <text x="146" y="30" textAnchor="middle" fill={PALETTE.gold} fontSize="4.5" fontWeight="bold" fontFamily="monospace">CONFERENCE</text>
          <text x="146" y="37" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="2.8" fontFamily="monospace">8-10 seats, AV, video conferencing</text>
          <text x="146" y="43" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="2.8" fontFamily="monospace">Client meetings, investor pitches</text>
          {/* Table */}
          <rect x="120" y="46" width="52" height="6" rx="1" fill={`${PALETTE.gold}22`} stroke={`${PALETTE.gold}44`} strokeWidth="0.3"/>
          
          {/* East wing — Gym */}
          <rect x="102" y="62" width="88" height="50" fill={`${PALETTE.terracotta}15`} rx="2" stroke={PALETTE.terracottaLight} strokeWidth="0.5"/>
          <text x="146" y="78" textAnchor="middle" fill={PALETTE.terracottaLight} fontSize="5" fontWeight="bold" fontFamily="monospace">GYM</text>
          <text x="146" y="86" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="2.8" fontFamily="monospace">~400-500 sq ft</text>
          <text x="146" y="92" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="2.8" fontFamily="monospace">Free weights, cardio, functional zone</text>
          <text x="146" y="98" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="2.8" fontFamily="monospace">Shared with hotel guests from Phase 5</text>
          
          {/* East wing — Pantry + Restrooms */}
          <rect x="102" y="116" width="42" height="50" fill={`${PALETTE.cream}08`} rx="2" stroke={`${PALETTE.cream}22`} strokeWidth="0.4"/>
          <text x="123" y="136" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3.5" fontFamily="monospace">PANTRY</text>
          <text x="123" y="143" textAnchor="middle" fill={`${PALETTE.cream}33`} fontSize="2.5" fontFamily="monospace">Kitchenette, coffee</text>
          <text x="123" y="149" textAnchor="middle" fill={`${PALETTE.cream}33`} fontSize="2.5" fontFamily="monospace">machine, fridge</text>
          
          <rect x="148" y="116" width="42" height="50" fill={`${PALETTE.cream}08`} rx="2" stroke={`${PALETTE.cream}22`} strokeWidth="0.4"/>
          <text x="169" y="136" textAnchor="middle" fill={`${PALETTE.cream}44`} fontSize="3.5" fontFamily="monospace">RESTROOMS</text>
          <text x="169" y="143" textAnchor="middle" fill={`${PALETTE.cream}33`} fontSize="2.5" fontFamily="monospace">M + F</text>
          <text x="169" y="149" textAnchor="middle" fill={`${PALETTE.cream}33`} fontSize="2.5" fontFamily="monospace">+ shower (gym)</text>
          
          {/* Stairwell */}
          <rect x="92" y="140" width="8" height="26" fill={`${PALETTE.gold}22`} rx="1" stroke={`${PALETTE.gold}44`} strokeWidth="0.4"/>
          <text x="96" y="155" textAnchor="middle" fill={`${PALETTE.gold}55`} fontSize="2.5" fontFamily="monospace" transform="rotate(-90, 96, 155)">STAIRS</text>
          
          {/* Direction labels */}
          <text x="50" y="7" textAnchor="middle" fill={`${PALETTE.cream}25`} fontSize="2.5" fontFamily="monospace">↑ N — Reception below</text>
          <text x="100" y="178" textAnchor="middle" fill={`${PALETTE.cream}25`} fontSize="2.5" fontFamily="monospace">↓ S — Restaurant + Bar & Kitchen below</text>
          
          {/* Compass */}
          <g transform="translate(205, 170)">
            <text textAnchor="middle" fill={`${PALETTE.cream}33`} fontSize="3" fontFamily="monospace" y="-4">↑N</text>
          </g>
        </svg></Zoomable>}
      </Card>

      <Card title="ZONE BREAKDOWN">
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <Stat label="OPEN OFFICE" value="~538" sub="sq ft · 33 × 16ft · 12-16 desks" color={PALETTE.river}/>
          <Stat label="TRAINING" value="~431" sub="sq ft · 33 × 13ft · classroom" color={PALETTE.bambooLight}/>
          <Stat label="CONFERENCE" value="~355" sub="sq ft · 18 × 20ft · 8-10 seats" color={PALETTE.gold}/>
          <Stat label="GYM" value="~291" sub="sq ft · 15 × 20ft · dual-use" color={PALETTE.terracottaLight}/>
        </div>
        {[
          { zone: "Open Office (33 × 16ft)", area: "~538 sq ft", detail: "Standing desks, collaboration pods. Paddy field views west, courtyard views east. 12-16 workstations." },
          { zone: "Training Room (33 × 13ft)", area: "~431 sq ft", detail: "Academy classroom for cohorts (full-stack, data engineering, ML). Projector, whiteboards. Doubles as workshop space." },
          { zone: "Conference Room (18 × 20ft)", area: "~355 sq ft", detail: "8-10 seat boardroom. Video conferencing, AV system. Client meetings, investor pitches." },
          { zone: "Gym (15 × 20ft)", area: "~291 sq ft", detail: "Free weights, cardio, functional zone. Team use; shared with hotel guests from Phase 5." },
          { zone: "Stairs / Elevator / WC", area: "~215 sq ft", detail: "Same shaft position as ground floor. WC with shower (gym users). Passage connects north and south wings." },
        ].map((z, i) => (
          <div key={i} style={{
            padding: "8px 0",
            borderBottom: i < 4 ? `1px solid ${PALETTE.cream}11` : "none",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: PALETTE.gold }}>{z.zone}</span>
              <span style={{ fontSize: 10, color: `${PALETTE.cream}55` }}>{z.area}</span>
            </div>
            <div style={{ fontSize: 10, color: `${PALETTE.cream}55`, marginTop: 2 }}>{z.detail}</div>
          </div>
        ))}
      </Card>

      <Card title="PHASE 3 COST ESTIMATE" accent={PALETTE.terracottaLight}>
        {[
          { item: "Full 1F slab over entire building footprint", detail: "RCC slab, walls on existing G+4 frame. Complete footprint including above reception.", cost: "₹43-60L" },
          { item: "Interior fit-out (office + training + breakout)", detail: "Flooring, partitions, electrical, data cabling, AC for all zones", cost: "₹24-36L" },
          { item: "Gym equipment + fit-out", detail: "Free weights, cardio, mirrors, rubber flooring, shower", cost: "₹5-8L" },
          { item: "Conference room AV + meeting rooms", detail: "Display, camera, speakers, video conferencing, 1-2 small meeting rooms", cost: "₹4-6L" },
          { item: "Furniture (desks, chairs, tables)", detail: "Standing desks, ergonomic chairs, training tables, collaboration pods, storage", cost: "₹10-12L" },
          { item: "Networking + IT", detail: "Fibre uplink, Wi-Fi 6, switches, UPS, server rack", cost: "₹5-8L" },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            padding: "8px 0",
            borderBottom: i < 5 ? `1px solid ${PALETTE.cream}11` : "none",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: `${PALETTE.cream}88` }}>{item.item}</div>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}55`, marginTop: 2 }}>{item.detail}</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: PALETTE.terracottaLight, flexShrink: 0, marginLeft: 12 }}>
              {item.cost}
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 12, padding: 10, background: `${PALETTE.gold}15`, borderRadius: 6,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, color: PALETTE.gold, fontWeight: 600 }}>Total Phase 3 investment</span>
          <span style={{ fontSize: 16, color: PALETTE.gold, fontWeight: 700 }}>₹0.95-1.30 Cr</span>
        </div>
      </Card>

      <Card title="WHY THIS SEQUENCE WORKS">
        <div style={{ fontSize: 11, color: `${PALETTE.cream}88`, lineHeight: 1.7 }}>
          {[
            { icon: "💰", text: "Saves on external office rent — we own the space instead of leasing it." },
            { icon: "🎓", text: "Academy batches generate revenue from the property regardless of hotel occupancy." },
            { icon: "🏗️", text: "De-risks later phases: hotel rooms (Phases 5-7) only get built after multiple proof points (cottage demand + F&B revenue + functioning office floor)." },
            { icon: "🔄", text: "Convertible: office layout designed with plumbing roughed in — can become hotel rooms if the business evolves." },
            { icon: "🏋️", text: "Gym is dual-use: team perk now, guest amenity later. No wasted build." },
            { icon: "🤝", text: "The retreat setting is a recruiting and client advantage — host workshops at Neel Paakhi, not a Guwahati office park." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <span style={{ marginRight: 8 }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PHASE 4 — REMAINING COTTAGES + FF&E
// ═══════════════════════════════════════════════════════════
function Phase4Tab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="PHASE 4 — 4 CAMPFIRE COTTAGES + FF&E">
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 16 }}>
          With Phases 1-3 operational (11 boundary cottages + restaurant + bar + TigmaMinds office all generating revenue),
          Phase 4 adds the <strong style={{ color: PALETTE.bambooLight }}>4 campfire cottages</strong> (compact 11×14.5ft, verandah facing campfire) completing all 15.
          Also includes the campfire pit and full FF&E for all cottages and common areas.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <Stat label="NEW COTTAGES" value="4" sub="campfire units (compact)" color={PALETTE.bambooLight}/>
          <Stat label="BUILD COST" value="₹3-5L" sub="per cottage (smaller)" color={PALETTE.bambooLight}/>
          <Stat label="TOTAL COTTAGES" value="15" sub="all cottages complete" color={PALETTE.terracottaLight}/>
          <Stat label="TIME TO BUILD" value="1-2 mo" sub="parallel construction" color={PALETTE.gold}/>
        </div>
      </Card>

      <Card title="PHASE 4 COST BREAKDOWN">
        {[
          { cat: "4 campfire cottages + campfire pit", amt: "₹12-20L", pct: 35 },
          { cat: "Complete paths, landscaping extensions", amt: "₹5-8L", pct: 12 },
          { cat: "FF&E for all cottages + common areas", amt: "₹18-22L", pct: 35 },
          { cat: "Outdoor dining furniture (campfire zone)", amt: "₹4-5L", pct: 8 },
        ].map((row, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: `${PALETTE.cream}99` }}>{row.cat}</span>
              <span style={{ fontSize: 11, color: PALETTE.bambooLight, fontWeight: 600 }}>{row.amt}</span>
            </div>
            <div style={{ height: 4, background: `${PALETTE.cream}11`, borderRadius: 2 }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${row.pct}%`, background: PALETTE.bambooLight }}/>
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 12, padding: 10, background: `${PALETTE.bamboo}15`, borderRadius: 6,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, color: PALETTE.bambooLight, fontWeight: 600 }}>Total Phase 4</span>
          <span style={{ fontSize: 18, color: PALETTE.bambooLight, fontWeight: 700 }}>₹45-70L</span>
        </div>
      </Card>

      <Card title="CUMULATIVE REVENUE (PHASES 1-4)" accent={PALETTE.gold}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ padding: 14, background: `${PALETTE.bamboo}22`, borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: PALETTE.bambooLight, letterSpacing: 1, marginBottom: 8 }}>15 COTTAGES (NET)</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: PALETTE.bambooLight }}>₹1.11-1.33 Cr/yr</div>
            <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, marginTop: 4 }}>15 × ₹4,500 ADR × 50-60% occ<br/>after ~10% commission (60% OTA, yr 3-4)</div>
          </div>
          <div style={{ padding: 14, background: `${PALETTE.terracotta}22`, borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: PALETTE.terracottaLight, letterSpacing: 1, marginBottom: 8 }}>F&B + EVENTS</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: PALETTE.terracottaLight }}>₹45-80L/yr</div>
            <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, marginTop: 4 }}>Restaurant + bar + music nights + events</div>
          </div>
        </div>
        <div style={{
          padding: 14, background: `${PALETTE.gold}15`, borderRadius: 8, border: `1px solid ${PALETTE.gold}33`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, color: PALETTE.gold, letterSpacing: 1 }}>NET ANNUAL REVENUE</div>
              <div style={{ fontSize: 9, color: `${PALETTE.cream}55`, marginTop: 2 }}>Cottages (net) + F&B + events + TigmaMinds savings</div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: PALETTE.gold }}>₹1.56-2.13 Cr</div>
          </div>
        </div>
      </Card>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════
// PHASE 5 — SECOND FLOOR HOTEL ROOMS
// ═══════════════════════════════════════════════════════════
function Phase5Tab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="PHASE 5 — SECOND FLOOR: HOTEL ROOMS" accent={PALETTE.gold}>
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 16 }}>
          Phase 5 is the <strong style={{ color: PALETTE.gold }}>first hotel floor</strong>. The 2F slab covers the
          <strong style={{ color: PALETTE.river }}> full building footprint</strong> — including above the courtyard, jacaranda,
          and lobby. This is where the very tall ground-floor ceiling ends and the hotel tower begins.
          <br/><br/>
          <strong style={{ color: PALETTE.river }}>Trigger:</strong> Sustained 60%+ cottage occupancy for 12+ months, and TigmaMinds office (1F) operational.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          <Stat label="ROOMS" value="6" sub="4 standard + 2 deluxe" color={PALETTE.gold}/>
          <Stat label="FLOOR AREA" value="~1,880" sub="sq ft (building footprint)" color={PALETTE.gold}/>
          <Stat label="ADR" value="₹4,500-6,000" sub="per room per night" color={PALETTE.terracottaLight}/>
        </div>
      </Card>

      <Card title="2F FLOOR PLAN — 6 ROOMS" accent={PALETTE.gold}>
        <img
          src="/images/neel-paakhi-second-floor.png"
          alt="Second floor hotel room layout"
          style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
        />
        <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, lineHeight: 1.6 }}>
          Double-loaded central corridor with rooms on both sides. 4 standard rooms (south wing, 14 × 15ft each)
          and 2 deluxe rooms (north wing, 14 × 20ft each). Elevator/stairs shaft in the center matches GF and 1F.
          Linen closet replaces the WC from 1F — all rooms have ensuite bathrooms.
        </div>
      </Card>

      <Card title="ROOM TYPES ACROSS FLOORS (2F–4F)">
        <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, lineHeight: 1.5, marginBottom: 10 }}>
          All hotel floors share the same structural grid — two room sizes based on bay position.
          Room categories are differentiated by <strong style={{ color: `${PALETTE.cream}99` }}>finishes and amenities</strong>, not footprint.
        </div>
        <div style={{ overflowX: mobile ? "auto" : "visible" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr auto 1fr", gap: 0, fontSize: 10, minWidth: mobile ? 520 : "auto" }}>
          {/* Header */}
          {["Category", "Size", "Finishes", "Tariff", "Floors"].map((h, i) => (
            <div key={h} style={{ padding: "6px 8px", fontWeight: 700, color: PALETTE.gold, borderBottom: `1px solid ${PALETTE.gold}33`,
              borderRight: i < 4 ? `1px solid ${PALETTE.cream}11` : "none" }}>{h}</div>
          ))}
          {/* Rows */}
          {[
            { cat: "Standard", size: "14 × 15ft (~210 sq ft)", finishes: "Quality fixtures, rain shower, AC", tariff: "₹4,500-5,500", floors: "2F, 3F", color: PALETTE.gold },
            { cat: "Deluxe", size: "14 × 15ft (~210 sq ft)", finishes: "Premium fixtures, minibar, upgraded linen", tariff: "₹5,500-7,000", floors: "2F, 4F", color: "#c88820" },
            { cat: "Jr Suite", size: "14 × 20ft (~280 sq ft)", finishes: "Living area, premium bath, espresso machine", tariff: "₹7,000-9,000", floors: "3F", color: PALETTE.terracottaLight },
            { cat: "Suite", size: "14 × 20ft (~280 sq ft)", finishes: "Separate living room, luxury bath, full minibar", tariff: "₹9,000-12,000", floors: "3F, 4F", color: PALETTE.terracottaLight },
          ].map((row, i) => (
            <Fragment key={i}>
              <div style={{ padding: "5px 8px", color: row.color, fontWeight: 600, borderBottom: `1px solid ${PALETTE.cream}08`,
                borderRight: `1px solid ${PALETTE.cream}11`, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: row.color, opacity: 0.4, flexShrink: 0 }}/>
                {row.cat}
              </div>
              <div style={{ padding: "5px 8px", color: `${PALETTE.cream}88`, borderBottom: `1px solid ${PALETTE.cream}08`,
                borderRight: `1px solid ${PALETTE.cream}11` }}>{row.size}</div>
              <div style={{ padding: "5px 8px", color: `${PALETTE.cream}77`, borderBottom: `1px solid ${PALETTE.cream}08`,
                borderRight: `1px solid ${PALETTE.cream}11` }}>{row.finishes}</div>
              <div style={{ padding: "5px 8px", color: PALETTE.gold, fontWeight: 600, borderBottom: `1px solid ${PALETTE.cream}08`,
                borderRight: `1px solid ${PALETTE.cream}11`, whiteSpace: "nowrap" }}>{row.tariff}</div>
              <div style={{ padding: "5px 8px", color: `${PALETTE.cream}66`, borderBottom: `1px solid ${PALETTE.cream}08` }}>{row.floors}</div>
            </Fragment>
          ))}
        </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 9, color: `${PALETTE.cream}55`, fontStyle: "italic" }}>
          Standard and Deluxe share the same 14×15ft footprint — Deluxe is a finishes/amenity upgrade, not a size upgrade.
          Jr Suite and Suite share the same 14×20ft footprint in the larger north bay.
          Tariffs are indicative rack rates per night; seasonal and occupancy-based pricing applies.
          Hotel rooms launch at ~15-20% below rack rate for the first 6-12 months to build OTA ratings and occupancy. Cottages launch at full rate — already 40-70% below competitors.
        </div>
      </Card>

      <Card title="PHASE 5 COST BREAKDOWN">
        {[
          { cat: "2F RCC slab + columns (full footprint)", amt: "₹23-31L", pct: 38 },
          { cat: "Room construction (walls, doors, windows, bath)", amt: "₹18-24L", pct: 28 },
          { cat: "Interior fit-out + FF&E", amt: "₹10-15L", pct: 18 },
          { cat: "Corridor, stairwell, lift shaft", amt: "₹6-8L", pct: 16 },
        ].map((row, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: `${PALETTE.cream}99` }}>{row.cat}</span>
              <span style={{ fontSize: 11, color: PALETTE.gold, fontWeight: 600 }}>{row.amt}</span>
            </div>
            <div style={{ height: 4, background: `${PALETTE.cream}11`, borderRadius: 2 }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${row.pct}%`, background: PALETTE.gold }}/>
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 12, padding: 10, background: `${PALETTE.gold}15`, borderRadius: 6,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, color: PALETTE.gold, fontWeight: 600 }}>Total Phase 5</span>
          <span style={{ fontSize: 18, color: PALETTE.gold, fontWeight: 700 }}>₹57-78L</span>
        </div>
      </Card>

      <Card title="ROOM FEATURES (2F STANDARD)">
        {[
          { label: "Size", value: "300-400 sq ft per room" },
          { label: "Layout", value: "King bed, work desk, ensuite bathroom, wardrobe" },
          { label: "Balcony", value: "Private balcony overlooking courtyard, paddy fields, or hills" },
          { label: "Bath", value: "Rain shower, modern fixtures, heated water" },
          { label: "Amenities", value: "AC, Wi-Fi, minibar, safe, blackout curtains" },
          { label: "Corridor", value: "Central corridor with lift shaft (lift installed Phase 6)" },
        ].map((spec, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, padding: "6px 0",
            borderBottom: i < 5 ? `1px solid ${PALETTE.cream}11` : "none",
          }}>
            <div style={{ width: 80, fontSize: 10, color: PALETTE.gold, fontWeight: 600, flexShrink: 0 }}>{spec.label}</div>
            <div style={{ fontSize: 10, color: `${PALETTE.cream}88` }}>{spec.value}</div>
          </div>
        ))}
      </Card>

      <Card title="TIMELINE" accent={PALETTE.gold}>
        <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, lineHeight: 1.6 }}>
          Construction: 4-5 months. Interior fit-out: 2 months. Total Phase 5: ~6-7 months.
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PHASE 6 — THIRD FLOOR HOTEL ROOMS
// ═══════════════════════════════════════════════════════════
function Phase6Tab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="PHASE 6 — THIRD FLOOR: PREMIUM ROOMS + SUITES" accent={PALETTE.gold}>
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 16 }}>
          Phase 6 adds the <strong style={{ color: PALETTE.gold }}>third floor</strong> with premium rooms and suites.
          Higher ceilings, premium finishes, private sit-outs. The passenger lift is installed at this stage,
          serving all floors from ground to 3F.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          <Stat label="ROOMS" value="6" sub="4 standard + 1 jr suite + 1 suite" color={PALETTE.gold}/>
          <Stat label="SUITE SIZE" value="~293" sub="sq ft (14×20ft)" color={PALETTE.terracottaLight}/>
          <Stat label="LIFT" value="Installed" sub="G to 3F" color={PALETTE.river}/>
        </div>
      </Card>

      <Card title="THIRD FLOOR LAYOUT">
        <Zoomable>
          <img src="/images/neel-paakhi-third-floor.png" alt="Third Floor Plan" style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto 12px" }} />
        </Zoomable>
        <div style={{ fontSize: 11, color: `${PALETTE.cream}77`, lineHeight: 1.7, padding: 10, background: `${PALETTE.gold}08`, borderRadius: 6, border: `1px solid ${PALETTE.gold}18` }}>
          Same parallelogram footprint as 2F. South wing: 4 standard rooms (14×15ft each). North wing: Junior Suite (RM 305, east) + Suite (RM 306, west), both 14×20ft.
          Suite features living area, premium bath, and upgraded finishes. Passenger lift installed at this stage.
        </div>
      </Card>

      <Card title="PHASE 6 COST BREAKDOWN">
        {[
          { cat: "3F RCC slab + columns", amt: "₹22-29L", pct: 33 },
          { cat: "Room + suite construction (premium finishes)", amt: "₹18-25L", pct: 28 },
          { cat: "Interior fit-out + FF&E (premium)", amt: "₹12-16L", pct: 19 },
          { cat: "Passenger lift (installation)", amt: "₹10-15L", pct: 20 },
        ].map((row, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: `${PALETTE.cream}99` }}>{row.cat}</span>
              <span style={{ fontSize: 11, color: PALETTE.gold, fontWeight: 600 }}>{row.amt}</span>
            </div>
            <div style={{ height: 4, background: `${PALETTE.cream}11`, borderRadius: 2 }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${row.pct}%`, background: PALETTE.gold }}/>
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 12, padding: 10, background: `${PALETTE.gold}15`, borderRadius: 6,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, color: PALETTE.gold, fontWeight: 600 }}>Total Phase 6</span>
          <span style={{ fontSize: 18, color: PALETTE.gold, fontWeight: 700 }}>₹62-85L</span>
        </div>
      </Card>

      <Card title="TIMELINE" accent={PALETTE.gold}>
        <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, lineHeight: 1.6 }}>
          Construction: 4-5 months. Interior + lift: 2-3 months. Total Phase 6: ~6-8 months. 2F hotel operations continue during construction.
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PHASE 7 — FOURTH FLOOR HOTEL ROOMS
// ═══════════════════════════════════════════════════════════
function Phase7Tab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="PHASE 7 — FOURTH FLOOR: PREMIUM ROOMS + SUITES" accent={PALETTE.gold}>
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 16 }}>
          Phase 7 adds the <strong style={{ color: PALETTE.gold }}>fourth and final guest floor</strong> — all premium.
          4 deluxe rooms + 2 suites with panoramic views of the Brahmaputra, hills, and paddy fields.
          Top floor gets the best views; no standard rooms.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          <Stat label="ROOMS" value="6" sub="4 deluxe + 2 suites" color={PALETTE.gold}/>
          <Stat label="TOTAL KEYS" value="33" sub="15 cottages + 18 rooms" color={PALETTE.terracottaLight}/>
          <Stat label="SUITE SIZE" value="~293 sq ft" sub="14 × 20ft" color={`${PALETTE.cream}77`}/>
        </div>
      </Card>

      <Card title="FOURTH FLOOR LAYOUT">
        <Zoomable>
          <img src="/images/neel-paakhi-fourth-floor.png" alt="Fourth Floor Plan" style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto 12px" }} />
        </Zoomable>
        <div style={{ fontSize: 11, color: `${PALETTE.cream}77`, lineHeight: 1.7, padding: 10, background: `${PALETTE.gold}08`, borderRadius: 6, border: `1px solid ${PALETTE.gold}18` }}>
          All-premium top floor — 4 deluxe rooms (14×15ft, ~220 sq ft) in the south bays and 2 suites
          (14×20ft, ~293 sq ft) in the north bay. Best views of the Brahmaputra, hills, and paddy fields.
          Same structural grid as floors 2-3, double-loaded central corridor.
        </div>
      </Card>

      <Card title="PHASE 7 COST BREAKDOWN">
        {[
          { cat: "4F RCC slab + columns", amt: "₹22-29L", pct: 33 },
          { cat: "Room + suite construction (premium finishes)", amt: "₹18-25L", pct: 28 },
          { cat: "Interior fit-out + FF&E (premium)", amt: "₹12-16L", pct: 19 },
          { cat: "Multi-level parking structure (optional)", amt: "₹10-15L", pct: 20 },
        ].map((row, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: `${PALETTE.cream}99` }}>{row.cat}</span>
              <span style={{ fontSize: 11, color: PALETTE.gold, fontWeight: 600 }}>{row.amt}</span>
            </div>
            <div style={{ height: 4, background: `${PALETTE.cream}11`, borderRadius: 2 }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${row.pct}%`, background: PALETTE.gold }}/>
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 12, padding: 10, background: `${PALETTE.gold}15`, borderRadius: 6,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, color: PALETTE.gold, fontWeight: 600 }}>Total Phase 7</span>
          <span style={{ fontSize: 18, color: PALETTE.gold, fontWeight: 700 }}>₹62-85L</span>
        </div>
      </Card>

      <Card title="TIMELINE" accent={PALETTE.gold}>
        <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, lineHeight: 1.6 }}>
          Construction: 4-5 months. Interior: 2 months. Total Phase 7: ~6-7 months. Lower floors operational during build.
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PHASE 8 — ROOFTOP: INFINITY POOL + RESTAURANT
// ═══════════════════════════════════════════════════════════
function Phase8Tab() {
  const mobile = useMobile();
  return (
    <div>
      <Card title="PHASE 8 — ROOFTOP: INFINITY POOL + OPEN-AIR RESTAURANT" accent={PALETTE.terracottaLight}>
        <div style={{ fontSize: 12, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 16 }}>
          The <strong style={{ color: PALETTE.terracottaLight }}>crown of Neel Paakhi</strong>. The full building footprint
          (~1,880 sq ft) becomes an open-air rooftop with an infinity-edge pool facing the river, a rooftop restaurant
          and bar, and a stargazing lounge. The ground-floor plunge pool can be relocated or retired at this point.
          <br/><br/>
          <strong style={{ color: PALETTE.river }}>Trigger:</strong> Hotel floors (2F–4F) operational, sustained demand for premium amenities.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          <Stat label="POOL" value="7 × 3m" sub="infinity edge → river" color={PALETTE.river}/>
          <Stat label="RESTAURANT" value="20-24" sub="seats + bar counter" color={PALETTE.terracottaLight}/>
          <Stat label="VIEWS" value="360°" sub="river, hills, paddy" color={PALETTE.gold}/>
        </div>
      </Card>

      <Card title="ROOFTOP LAYOUT" accent={PALETTE.river}>
        <Zoomable>
          <img src="/images/neel-paakhi-rooftop.png" alt="Rooftop floor plan" style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto 12px" }} />
        </Zoomable>
        <div style={{ fontSize: 11, color: `${PALETTE.cream}77`, lineHeight: 1.7, padding: 10, background: `${PALETTE.river}08`, borderRadius: 6, border: `1px solid ${PALETTE.river}18` }}>
          Same parallelogram footprint as all floors — 17m × 10m (57 × 33ft). Pool deck occupies the south half
          (infinity edge facing east toward the Brahmaputra). Restaurant + bar + stargazing lounge in the north half.
          Elevator/stairs shaft in the center (same position as all floors). 1.5m balcony overhang on all sides.
        </div>
      </Card>

      <Card title="ZONE DETAILS">
        {[
          { item: "Infinity Pool + Sun Deck (south)", detail: "7×3m (23×10ft) infinity-edge pool — overflow edge faces east toward the Brahmaputra and hills. Sun deck with loungers on the west side. Heated option for winter months. ~620 sq ft total zone", color: PALETTE.river },
          { item: "Pool Bar + Deck Loungers", detail: "Wet bar counter with 6-8 stools between pool and shaft. Cocktails, fresh juice, light bites. Deck loungers on the west side for post-swim relaxation. ~450 sq ft", color: PALETTE.river },
          { item: "Rooftop Restaurant (northeast)", detail: "20-24 seats, premium menu separate from ground floor. Sunset dining with panoramic views over paddy fields and hills. Open-air with retractable canopy for rain. ~390 sq ft", color: PALETTE.terracottaLight },
          { item: "Bar + Stargazing Lounge (northwest)", detail: "Full bar counter with cocktails and craft drinks. Stargazing corner with low seating, minimal lighting, telescope station. Away from city light pollution — Fulung's dark skies are a unique selling point. ~320 sq ft", color: PALETTE.gold },
          { item: "Mechanical + Shaft", detail: "Elevator, stairs, passage — same shaft position as all floors. Mechanical room replaces linen closet (pool pump equipment, water treatment, lighting controls). ~240 sq ft", color: `${PALETTE.cream}77` },
        ].map((z, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8,
            padding: 10, background: `${PALETTE.charcoal}88`, borderRadius: 8,
            borderLeft: `3px solid ${z.color}`,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: z.color }}>{z.item}</div>
              <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, marginTop: 2 }}>{z.detail}</div>
            </div>
          </div>
        ))}
      </Card>

      <Card title="PHASE 8 COST BREAKDOWN">
        {[
          { cat: "Rooftop slab waterproofing + structural", amt: "₹10-14L", pct: 23 },
          { cat: "Infinity pool (construction + plumbing)", amt: "₹15-20L", pct: 35 },
          { cat: "Restaurant + bar fit-out", amt: "₹10-15L", pct: 25 },
          { cat: "Pool bar, stargazing lounge, lighting, mechanical", amt: "₹7-12L", pct: 17 },
        ].map((row, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: `${PALETTE.cream}99` }}>{row.cat}</span>
              <span style={{ fontSize: 11, color: PALETTE.terracottaLight, fontWeight: 600 }}>{row.amt}</span>
            </div>
            <div style={{ height: 4, background: `${PALETTE.cream}11`, borderRadius: 2 }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${row.pct}%`, background: PALETTE.terracottaLight }}/>
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 12, padding: 10, background: `${PALETTE.terracotta}15`, borderRadius: 6,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, color: PALETTE.terracottaLight, fontWeight: 600 }}>Total Phase 8</span>
          <span style={{ fontSize: 18, color: PALETTE.terracottaLight, fontWeight: 700 }}>₹40-60L</span>
        </div>
      </Card>

      <Card title="TIMELINE" accent={PALETTE.gold}>
        <div style={{ fontSize: 10, color: `${PALETTE.cream}66`, lineHeight: 1.6 }}>
          Pool construction: 3-4 months (waterproofing critical — rooftop pools require specialized membrane systems).
          Restaurant fit-out: 2 months. Total Phase 8: ~5-6 months. Hotel floors below remain fully operational during build.
          Pool water supply: rooftop tank + pump system from ground-level bore well. Heated pool option adds ₹3-5L.
        </div>
      </Card>

      <Card title="FULL BUILD VISION (ALL 8 PHASES)" accent={PALETTE.gold}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: 10, marginBottom: 12 }}>
          <Stat label="STRUCTURE" value="G+4" sub="+ rooftop pool & restaurant" color={PALETTE.river}/>
          <Stat label="TOTAL KEYS" value="27-33" sub="15 cottages + 12-18 rooms" color={PALETTE.gold}/>
          <Stat label="TOTAL INVEST" value="₹9.5-12.0 Cr" sub="all phases (0-8)" color={PALETTE.terracottaLight}/>
          <Stat label="ANNUAL REV" value="₹3.3-4.3 Cr" sub="at mature occupancy" color={PALETTE.bambooLight}/>
        </div>
        <div style={{ fontSize: 10, color: `${PALETTE.cream}55`, lineHeight: 1.6 }}>
          Phase 0: Land (₹3.43 Cr) → Phase 1: 6 cottages + landscape (₹1.30-1.95 Cr) → Phase 2: Restaurant + Bar + G+4 frame + 2 cottages (₹1.20-1.55 Cr) →
          Phase 3: TigmaMinds full 1F + 3 cottages (₹0.95-1.30 Cr) → Phase 4: 4 campfire cottages (₹45-70L) →
          Phases 5-7: Hotel floors 2F-4F (₹1.81-2.48 Cr) → Phase 8: Rooftop (₹40-60L). Each phase is self-sustaining.
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
// PASSWORD GATE
// ═══════════════════════════════════════════════════════════
const PASSCODE = "neela2027";

function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === PASSCODE) {
      sessionStorage.setItem("np_auth", "1");
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(180deg, ${PALETTE.dark} 0%, ${PALETTE.charcoal} 100%)`,
      fontFamily: "'Georgia', 'Palatino', serif",
    }}>
      <form onSubmit={handleSubmit} style={{ textAlign: "center", padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, cursor: "pointer" }} onClick={() => window.location.href = "/"}>
          <img src="/pictures/neel-paakhi-feather.png" alt="" style={{ height: 52, width: "auto", filter: "drop-shadow(0 0 6px rgba(0, 180, 255, 0.3))" }} />
        </div>
        <h1 onClick={() => window.location.href = "/"} style={{
          fontSize: 24, fontWeight: 400, letterSpacing: 6, margin: "0 0 4px",
          color: PALETTE.cream, fontFamily: "'Georgia', serif", cursor: "pointer",
        }}>NEEL PAAKHI</h1>
        <div style={{
          fontSize: 9, letterSpacing: 3, color: `${PALETTE.cream}55`,
          marginBottom: 32, fontFamily: "monospace",
        }}>MASTER PLAN · CONFIDENTIAL</div>
        <input
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder="Enter access code"
          autoFocus
          style={{
            padding: "12px 20px", fontSize: 14, width: "100%", maxWidth: 260, boxSizing: "border-box",
            background: `${PALETTE.cream}0a`, border: `1px solid ${error ? "#e74c3c" : PALETTE.gold + "44"}`,
            borderRadius: 8, color: PALETTE.cream, textAlign: "center",
            outline: "none", fontFamily: "monospace", letterSpacing: 2,
            transition: "border-color 0.3s",
          }}
        />
        <div style={{ marginTop: 12 }}>
          <button type="submit" style={{
            padding: "10px 32px", background: PALETTE.gold, color: PALETTE.charcoal,
            border: "none", borderRadius: 6, fontSize: 11, fontWeight: 700,
            letterSpacing: 2, cursor: "pointer", fontFamily: "monospace",
          }}>ENTER</button>
        </div>
        {error && <div style={{
          marginTop: 12, fontSize: 11, color: "#e74c3c", fontFamily: "monospace",
        }}>Invalid access code</div>}
      </form>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function NeelPaakhiMasterPlan() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("np_auth") === "1");
  const [activeTab, setActiveTab] = useState(0);
  const [fontScale, setFontScale] = useState(1);
  const mobile = useMobile();

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  const renderTab = () => {
    switch(activeTab) {
      case 0: return <ContentsTab onNavigate={setActiveTab} />;
      case 1: return <SitePlanTab />;
      case 2: return <GroundFloorTab />;
      case 3: return <CottagesTab />;
      case 4: return <TrafficTab />;
      case 5: return <Phase0Tab />;
      case 6: return <Phase1Tab />;
      case 7: return <Phase2Tab />;
      case 8: return <Phase3Tab />;
      case 9: return <Phase4Tab />;
      case 10: return <Phase5Tab />;
      case 11: return <Phase6Tab />;
      case 12: return <Phase7Tab />;
      case 13: return <Phase8Tab />;
      default: return <ContentsTab onNavigate={setActiveTab} />;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${PALETTE.dark} 0%, ${PALETTE.charcoal} 100%)`,
      color: PALETTE.cream,
      fontFamily: "'Georgia', 'Palatino', serif",
      overflowX: "hidden",
      ...(fontScale !== 1 ? { zoom: fontScale } : {}),
    }}>
      {/* Back to main site — fixed top left */}
      <div onClick={() => window.location.href = "/"} style={{
        position: "fixed", top: 12, left: 12, zIndex: 999,
        display: "flex", gap: 4, alignItems: "center",
        background: `${PALETTE.charcoal}ee`, borderRadius: 8,
        padding: "6px 10px", border: `1px solid ${PALETTE.gold}22`,
        backdropFilter: "blur(8px)", cursor: "pointer",
        fontSize: 9, color: PALETTE.gold, fontFamily: "monospace", letterSpacing: 1,
      }}>← MAIN SITE</div>

      {/* Font size toggle — fixed top right, always visible */}
      <div style={{
        position: "fixed", top: 12, right: 12, zIndex: 999,
        display: "flex", gap: 4, alignItems: "center",
        background: `${PALETTE.charcoal}ee`, borderRadius: 8,
        padding: "4px 6px", border: `1px solid ${PALETTE.gold}22`,
        backdropFilter: "blur(8px)",
      }}>
        <button onClick={() => setFontScale(s => Math.max(0.8, s - 0.1))} style={{
          width: 28, height: 28, borderRadius: 6, border: `1px solid ${PALETTE.gold}44`,
          background: `${PALETTE.gold}11`, color: PALETTE.gold, cursor: "pointer",
          fontSize: 13, fontWeight: 700, fontFamily: "monospace", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>A-</button>
        <button onClick={() => setFontScale(1)} style={{
          width: 28, height: 28, borderRadius: 6, border: `1px solid ${PALETTE.cream}22`,
          background: "transparent", color: `${PALETTE.cream}55`, cursor: "pointer",
          fontSize: 9, fontFamily: "monospace", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>{Math.round(fontScale * 100)}%</button>
        <button onClick={() => setFontScale(s => Math.min(1.4, s + 0.1))} style={{
          width: 28, height: 28, borderRadius: 6, border: `1px solid ${PALETTE.gold}44`,
          background: `${PALETTE.gold}11`, color: PALETTE.gold, cursor: "pointer",
          fontSize: 13, fontWeight: 700, fontFamily: "monospace", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>A+</button>
      </div>

      {/* Header */}
      <div style={{
        textAlign: "center",
        padding: mobile ? "40px 16px 16px" : "32px 16px 20px",
        borderBottom: `1px solid ${PALETTE.gold}22`,
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <FeatherSVG size={24} />
        </div>
        <h1 onClick={() => window.location.href = "/"} style={{
          fontSize: 28, fontWeight: 400, letterSpacing: 6, margin: 0,
          color: PALETTE.cream, fontFamily: "'Georgia', serif", cursor: "pointer",
        }}>NEEL PAAKHI</h1>
        <div style={{
          fontSize: 9, letterSpacing: 3, color: `${PALETTE.cream}66`,
          marginTop: 4, fontFamily: "monospace",
        }}>MASTER PLAN</div>
        <div style={{
          fontSize: 8, color: `${PALETTE.cream}44`, marginTop: 4,
          fontFamily: "monospace", letterSpacing: 2,
        }}>FULUNG · NORTH GUWAHATI · ASSAM</div>
      </div>

      {/* Strategy banner */}
      <div style={{
        textAlign: "center", padding: mobile ? "10px 12px" : "14px 16px",
        background: `linear-gradient(90deg, ${PALETTE.gold}11, ${PALETTE.gold}22, ${PALETTE.gold}11)`,
        fontSize: mobile ? 8 : 11, color: PALETTE.gold, letterSpacing: mobile ? 1 : 2, fontFamily: "monospace",
      }}>
        LAND · COTTAGES · RESTAURANT · TIGMAMINDS · HOTEL FLOORS · ROOFTOP
      </div>

      {/* Tabs */}
      {mobile ? (
        <div style={{ padding: "12px 16px 0" }}>
          <select value={activeTab} onChange={e => setActiveTab(+e.target.value)} style={{
            width: "100%", padding: "10px 12px", fontSize: 12,
            background: PALETTE.charcoal, color: PALETTE.gold,
            border: `1px solid ${PALETTE.gold}44`, borderRadius: 6,
            fontFamily: "monospace", letterSpacing: 1, outline: "none",
          }}>
            {TABS.map((tab, i) => <option key={i} value={i}>{tab}</option>)}
          </select>
        </div>
      ) : (
        <div style={{
          display: "flex", gap: 6, padding: "16px 16px 0",
          overflowX: "auto", flexWrap: "nowrap",
        }}>
          {TABS.map((tab, i) => (
            <Tab key={i} label={tab} active={activeTab === i} onClick={() => setActiveTab(i)} />
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ display: "flex", justifyContent: "center", padding: "0 16px" }}>
        <div style={{ width: "100%", maxWidth: 700 }}>
          {renderTab()}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "24px 16px",
        borderTop: `1px solid ${PALETTE.gold}22`, marginTop: 16,
      }}>
        <div style={{ fontSize: 9, color: `${PALETTE.cream}33`, letterSpacing: 2, fontFamily: "monospace" }}>
          NEEL PAAKHI · FULUNG · NORTH GUWAHATI · MASTER PLAN · FEB 2026
        </div>
      </div>
    </div>
  );
}
