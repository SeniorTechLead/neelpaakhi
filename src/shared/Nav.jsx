import { useState, useEffect } from "react";
import { P, font } from "./theme.js";
import { useMobile } from "./hooks.js";

function AzureFeather({ size = 32 }) {
  return (
    <img
      src="/pictures/neel-paakhi-feather.png"
      alt=""
      style={{ display: "block", height: size * 1.6, width: "auto", filter: "drop-shadow(0 0 6px rgba(0, 180, 255, 0.3))" }}
    />
  );
}

const navLinks = [
  { label: "Our Story", href: "/our-story" },
  { label: "The Chang Ghar", href: "/chang-ghar" },
  { label: "Dining", href: "/dining" },
  { label: "Experiences", href: "/experiences" },
];

export default function Nav() {
  const mobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const path = window.location.pathname;

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleReserve = () => {
    setMenuOpen(false);
    if (path === "/") {
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#book";
    }
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 32px",
        background: scrollY > 100 ? `${P.deep}ee` : "linear-gradient(180deg, rgba(13,27,30,0.7) 0%, rgba(13,27,30,0) 100%)",
        backdropFilter: scrollY > 100 ? "blur(12px)" : "none",
        transition: "all 0.5s ease",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <a href="/" aria-label="Neel Paakhi home" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <AzureFeather size={26} />
          <div>
            <div style={{ fontFamily: font.accent, fontSize: 22, fontWeight: 400, letterSpacing: 3, color: P.emberLight }}>
              NEEL PAAKHI
            </div>
            <div style={{ fontFamily: font.body, fontSize: 10, fontWeight: 500, letterSpacing: 3, color: P.sand, marginTop: 1, textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
              THE AZURE FEATHER
            </div>
          </div>
        </a>
        {mobile ? (
          <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} style={{ cursor: "pointer", padding: 8, background: "none", border: "none" }} onClick={() => setMenuOpen(!menuOpen)}>
            <div style={{ width: 22, height: 2, background: P.gold, marginBottom: 5, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <div style={{ width: 22, height: 2, background: P.gold, marginBottom: 5, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 2, background: P.gold, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        ) : (
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} aria-current={path === link.href ? "page" : undefined} style={{
                textDecoration: "none",
                fontFamily: font.body, fontSize: 11, letterSpacing: 2, color: path === link.href ? P.gold : P.sand,
                cursor: "pointer", textTransform: "uppercase", fontWeight: 400,
                transition: "color 0.3s", borderBottom: path === link.href ? `1px solid ${P.gold}` : "1px solid transparent",
              }}
              onMouseEnter={(e) => { e.target.style.color = P.gold; e.target.style.borderBottomColor = P.gold; }}
              onMouseLeave={(e) => { if (path !== link.href) { e.target.style.color = P.sand; e.target.style.borderBottomColor = "transparent"; } }}
              >{link.label}</a>
            ))}
            <button type="button" onClick={handleReserve} style={{
              fontFamily: font.body, fontSize: 11, letterSpacing: 2,
              padding: "8px 20px", border: `1px solid ${P.gold}`, color: P.gold,
              background: "transparent", cursor: "pointer", transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { e.target.style.background = P.gold; e.target.style.color = P.deep; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = P.gold; }}
            >RESERVE</button>
          </div>
        )}
      </nav>

      {mobile && menuOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, bottom: 0, zIndex: 99,
          background: `${P.deep}f5`, backdropFilter: "blur(16px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
        }}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} aria-current={path === link.href ? "page" : undefined} style={{
              textDecoration: "none",
              fontFamily: font.accent, fontSize: 22, letterSpacing: 3,
              color: path === link.href ? P.gold : P.cream,
              cursor: "pointer",
            }}>{link.label}</a>
          ))}
          <button type="button" onClick={handleReserve} style={{
            fontFamily: font.body, fontSize: 13, letterSpacing: 3,
            padding: "12px 32px", border: `1px solid ${P.gold}`, color: P.gold, background: "transparent",
            cursor: "pointer", marginTop: 16,
          }}>RESERVE</button>
        </div>
      )}
    </>
  );
}
