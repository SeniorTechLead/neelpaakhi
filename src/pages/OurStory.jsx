import { P, font } from "../shared/theme.js";
import { useMobile } from "../shared/hooks.js";
import FadeIn from "../shared/FadeIn.jsx";
import PageShell from "../shared/PageShell.jsx";
import Newsletter from "../shared/Newsletter.jsx";

export default function OurStory() {
  const mobile = useMobile();

  return (
    <PageShell>
      <section style={{
        padding: "160px 24px 120px",
        background: `linear-gradient(180deg, ${P.deep} 0%, ${P.warm} 100%)`,
        position: "relative",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 40 : 60, alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16, textTransform: "uppercase" }}>
                  Our Story
                </div>
                <h2 style={{ fontFamily: font.display, fontSize: 38, fontWeight: 400, lineHeight: 1.2, marginBottom: 24, color: P.cream }}>
                  Built for those who<br /><span style={{ fontStyle: "italic", color: P.goldLight }}>remember a slower world</span>
                </h2>
                <div style={{ width: 50, height: 1, background: P.gold, marginBottom: 24 }} />
                <p style={{ fontFamily: font.accent, fontSize: 17, lineHeight: 1.9, color: P.muted, marginBottom: 16 }}>
                  There was a time when evenings smelled of incense and river water.
                  When a Bhupen Hazarika song on the radio could stop an entire household.
                  When letters arrived by post and tea was brewed slow.
                </p>
                <p style={{ fontFamily: font.accent, fontSize: 17, lineHeight: 1.9, color: P.muted, marginBottom: 16 }}>
                  Neel Paakhi is built on the belief that that time didn't pass — we just
                  stopped listening. This is a place where the unhurried magic of the 1970s
                  never ended, where Jayanta Hazarika's melodies still drift across paddy fields
                  at dusk, and a campfire under the stars is the only evening plan you need.
                </p>
                <p style={{ fontFamily: font.accent, fontSize: 17, lineHeight: 1.9, color: P.muted }}>
                  On the quiet north bank of the Brahmaputra, we are building a retreat
                  that heals through sound, space, and soil — a place to recover something
                  the modern world forgot it lost.
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
                    flexDirection: "column", gap: 16,
                  }}>
                    <img
                      src="/pictures/neel-paakhi-feather.png"
                      alt="Neel Paakhi quill feather"
                      style={{ width: 180, height: "auto", opacity: 0.9 }}
                    />
                    <div>
                      <div style={{ fontFamily: font.display, fontSize: 26, fontStyle: "italic", letterSpacing: 2, color: P.gold, opacity: 0.9, textAlign: "center" }}>
                        Neel Paakhi
                      </div>
                      <div style={{ fontFamily: font.body, fontSize: 9, letterSpacing: 5, color: P.muted, opacity: 0.6, textAlign: "center", marginTop: 4 }}>THE AZURE FEATHER</div>
                    </div>
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

          <div style={{ marginTop: 80 }}>
            <FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 24 }}>
                {[
                  { title: "Remember", icon: "\u{1F4FB}", text: "The golden age of Assamese and Bengali music lives here. Bhupen da, Jayanta da, Hemanta — not as nostalgia, but as the present." },
                  { title: "Listen", icon: "\u{1F3B5}", text: "The acoustic stage is the heart. Live music every evening — from folk to Rabindrasangeet — flows through the courtyard into your room." },
                  { title: "Root", icon: "\u{1F331}", text: "Bamboo, river stone, Muga silk, gamosa patterns. Every surface tells an Assamese story from a time when craft was slow and honest." },
                  { title: "Breathe", icon: "\u{1F32C}\uFE0F", text: "No screens, no rush. Campfire, stargazing, yoga at dawn. A rhythm that belongs to the 1970s and refuses to leave." },
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

      <Newsletter />
    </PageShell>
  );
}
