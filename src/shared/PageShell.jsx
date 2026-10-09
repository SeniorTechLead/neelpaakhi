import { useEffect } from "react";
import { P, font } from "./theme.js";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

export default function PageShell({ children }) {
  useEffect(() => {
    // Scroll to hash if present (for /#book deep links)
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div style={{ fontFamily: font.body, background: P.deep, color: P.text, overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${P.gold}44; color: ${P.cream}; }
        @keyframes breathe { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes drift { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes line { from { width: 0; } to { width: 80px; } }
      `}</style>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
