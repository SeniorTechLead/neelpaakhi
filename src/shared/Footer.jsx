import { P, font } from "./theme.js";
import { useMobile } from "./hooks.js";

// Deep jacaranda band with blossom-coloured headings
const J = { bg: "#2b2140", blossom: "#c3b0ea", line: "rgba(195,176,234,0.25)" };
const linkStyle = { color: "inherit", textDecoration: "none", transition: "color 0.3s" };
const hover = {
  onMouseEnter: (e) => { e.currentTarget.style.color = J.blossom; },
  onMouseLeave: (e) => { e.currentTarget.style.color = "inherit"; },
};

export default function Footer() {
  const mobile = useMobile();

  return (
    <footer style={{
      position: "relative", zIndex: 1,
      padding: "64px 24px 40px",
      background: J.bg,
      borderTop: `1px solid ${J.line}`,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 40 }}>
        <div>
          <div style={{ fontFamily: font.accent, fontSize: 26, color: P.emberLight, letterSpacing: 3, marginBottom: 14 }}>NEEL PAAKHI</div>
          <p style={{ fontFamily: font.accent, fontSize: 17, color: P.sand, lineHeight: 1.7 }}>
            A boutique retreat<br />
            Fulung, North Guwahati<br />
            Kamrup, Assam 781030
          </p>
        </div>
        <div>
          <div style={{ fontFamily: font.body, fontSize: 12, fontWeight: 500, letterSpacing: 3, color: J.blossom, marginBottom: 14 }}>CONNECT</div>
          <div style={{ fontFamily: font.accent, fontSize: 17, color: P.sand, lineHeight: 1.9 }}>
            <div>stay@neelpaakhi.com</div>
            <div>+91 99540-85641</div>
            <div>+91 99571-84887</div>
          </div>
        </div>
        <div style={{ textAlign: mobile ? "left" : "right" }}>
          <div style={{ fontFamily: font.body, fontSize: 12, fontWeight: 500, letterSpacing: 3, color: J.blossom, marginBottom: 14 }}>EXPLORE</div>
          <div style={{ fontFamily: font.accent, fontSize: 17, color: P.sand, lineHeight: 1.9 }}>
            <div><a href="/chang-ghar" style={linkStyle} {...hover}>The Chang Ghar</a></div>
            <div><a href="/dining" style={linkStyle} {...hover}>Dining</a></div>
            <div><a href="/experiences" style={linkStyle} {...hover}>Experiences</a></div>
            <div><a href="/our-story" style={linkStyle} {...hover}>Our Story</a></div>
          </div>
        </div>
      </div>
      <div style={{
        maxWidth: 900, margin: "32px auto 0",
        paddingTop: 28, borderTop: `1px solid ${J.line}`,
        textAlign: "center",
      }}>
        <div style={{ fontFamily: font.body, fontSize: 12, letterSpacing: 3, color: "rgba(232,220,200,0.75)" }}>
          &copy; 2026 NEEL PAAKHI &middot; ALL RIGHTS RESERVED
        </div>
        <div style={{ fontFamily: font.body, fontSize: 11, letterSpacing: 1.5, lineHeight: 1.6, color: "rgba(232,220,200,0.6)", marginTop: 10 }}>
          ALL CONTENT &amp; DESIGNS ARE PROPRIETARY TO NEEL PAAKHI. UNAUTHORIZED USE IS PROHIBITED.
        </div>
      </div>
    </footer>
  );
}
