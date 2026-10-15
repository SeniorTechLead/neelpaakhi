import { P, font } from "../shared/theme.js";
import { useMobile } from "../shared/hooks.js";
import FadeIn from "../shared/FadeIn.jsx";
import PageShell from "../shared/PageShell.jsx";
import Newsletter from "../shared/Newsletter.jsx";
import { musicSchedule } from "../shared/data.js";
import { CampfireCircleSVG } from "../shared/svgs.jsx";

export default function Music() {
  const mobile = useMobile();

  return (
    <PageShell>
      {/* MUSIC */}
      <section style={{
        padding: "160px 24px 100px",
        background: P.deep,
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>THE SOUNDTRACK</div>
              <h2 style={{ fontFamily: font.display, fontSize: 36, fontWeight: 400, color: P.cream, fontStyle: "italic" }}>
                A time machine tuned to<br />the golden decades.
              </h2>
              <p style={{ fontFamily: font.accent, fontSize: 16, color: P.muted, marginTop: 16, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.8 }}>
                The 70s and 80s gave us music that didn't need amplifiers — just a voice,
                a guitar, and a room willing to listen. At Neel Paakhi, every weekend is a doorway
                back to that era.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 24 : 48, alignItems: "center", marginBottom: 56 }}>
              <div style={{ aspectRatio: "4/3", position: "relative", overflow: "hidden" }}>
                <CampfireCircleSVG />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 16px 16px",
                  background: "linear-gradient(transparent, rgba(25,20,40,0.7))",
                }}>
                  <div style={{ fontFamily: font.accent, fontSize: 13, color: P.gold, letterSpacing: 2 }}>
                    GARDEN &middot; LIVE MUSIC
                  </div>
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: font.display, fontSize: 24, color: P.cream, marginBottom: 12 }}>
                  Music by the Fire
                </h3>
                <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.8, color: P.muted }}>
                  Live acoustic music in the garden, around the campfire.
                  Pull up a chair by the fire. No food, no bar {"\u2014"} just music
                  and the stars overhead. Fridays, Saturdays, and Sundays.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 4, color: P.muted, marginBottom: 20, textAlign: "center" }}>SIGNATURE EVENINGS</div>
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
                Monthly Golden Era Nights — a dedicated evening of timeless songs,
                with guest artists and an open invitation to sing along.
              </p>
            </div>
          </FadeIn>

        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
