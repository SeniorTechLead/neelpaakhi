import { useState } from "react";
import { P, font } from "./theme.js";
import { useMobile } from "./hooks.js";
import FadeIn from "./FadeIn.jsx";

export default function Newsletter() {
  const mobile = useMobile();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [subStatus, setSubStatus] = useState(null);
  const [subMsg, setSubMsg] = useState("");

  const handleSubscribe = async () => {
    if (!email) return;
    setSubStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
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

  return (
    <section id="book" style={{
      position: "relative", zIndex: 1,
      padding: "120px 24px",
      background: `linear-gradient(180deg, ${P.deep} 0%, ${P.river}44 50%, ${P.deep} 100%)`,
      textAlign: "center",
    }}>
      <FadeIn>
        <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 20 }}>OPENING JANUARY 2027</div>
        <h2 style={{ fontFamily: font.display, fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 400, color: P.cream, marginBottom: 12 }}>
          Be among the first to
        </h2>
        <h2 style={{ fontFamily: font.display, fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 400, fontStyle: "italic", color: P.goldLight, marginBottom: 32 }}>
          hear the azure feather fall
        </h2>
        <div style={{ width: 60, height: 1, background: P.gold, margin: "0 auto 32px" }} />
        <p style={{ fontFamily: font.accent, fontSize: 17, color: P.muted, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.8 }}>
          Register your interest and we will reach out with exclusive
          pre-opening rates and an invitation to our first Golden Era Night.
        </p>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", gap: 0, justifyContent: "center", maxWidth: 460, margin: "0 auto" }}>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
            value={website} onChange={(e) => setWebsite(e.target.value)}
            style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />
          <input type="email" placeholder="Your email address" value={email}
            onChange={(e) => { setEmail(e.target.value); setSubStatus(null); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            style={{
            flex: 1, padding: "14px 20px",
            background: `${P.warm}`, border: `1px solid ${P.gold}33`,
            color: P.cream, fontFamily: font.accent, fontSize: 14,
            outline: "none", borderRight: mobile ? undefined : "none",
            borderBottom: mobile ? "none" : undefined,
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
  );
}
