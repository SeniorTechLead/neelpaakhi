import { P, font } from "./theme.js";
import { useMobile } from "./hooks.js";

export default function Footer() {
  const mobile = useMobile();

  return (
    <footer style={{
      position: "relative", zIndex: 1,
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
            <div><a href="/chang-ghar" style={{ color: "inherit", textDecoration: "none" }}>The Chang Ghar</a></div>
            <div><a href="/dining" style={{ color: "inherit", textDecoration: "none" }}>Dining</a></div>
            <div><a href="/experiences" style={{ color: "inherit", textDecoration: "none" }}>Experiences</a></div>
            <div><a href="/our-story" style={{ color: "inherit", textDecoration: "none" }}>Our Story</a></div>
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
  );
}
