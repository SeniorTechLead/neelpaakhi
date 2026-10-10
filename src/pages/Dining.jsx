import { P, font } from "../shared/theme.js";
import { useMobile } from "../shared/hooks.js";
import FadeIn from "../shared/FadeIn.jsx";
import PageShell from "../shared/PageShell.jsx";
import Newsletter from "../shared/Newsletter.jsx";
import { musicSchedule, dailyMusic } from "../shared/data.js";
import { RestaurantSVG, BarCampfireSVG } from "../shared/svgs.jsx";

export default function Dining() {
  const mobile = useMobile();

  return (
    <PageShell>
      {/* DINING */}
      <section style={{
        padding: "160px 24px 120px",
        background: `linear-gradient(180deg, ${P.deep} 0%, ${P.warm} 100%)`,
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

          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 40 : 48, marginBottom: 80 }}>
            <FadeIn>
              <div>
                <div style={{ aspectRatio: "4/3", marginBottom: 24, position: "relative", overflow: "hidden" }}>
                  <RestaurantSVG />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 16px 16px",
                    background: "linear-gradient(transparent, rgba(25,20,40,0.7))",
                  }}>
                    <div style={{ fontFamily: font.accent, fontSize: 13, color: P.gold, letterSpacing: 2 }}>
                      RESTAURANT &middot; BAR
                    </div>
                  </div>
                </div>
                <h3 style={{ fontFamily: font.display, fontSize: 24, color: P.cream, marginBottom: 12 }}>
                  The Restaurant + Bar
                </h3>
                <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.8, color: P.muted }}>
                  One open room {"\u2014"} no wall between the dining tables and the bar counter.
                  44-48 seats on the ground floor of the main building.
                  The menu moves with the seasons: river fish, bamboo shoot preparations,
                  smoked pork from the hills, and Assamese thalis that honor the land.
                  In the corner, a small raised stage (6ft {"\u00D7"} 4ft) {"\u2014"} just enough
                  room for a guitarist on a stool. Intimate, unhurried music while you eat.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <div style={{ aspectRatio: "4/3", marginBottom: 24, position: "relative", overflow: "hidden" }}>
                  <BarCampfireSVG />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 16px 16px",
                    background: "linear-gradient(transparent, rgba(25,20,40,0.7))",
                  }}>
                    <div style={{ fontFamily: font.accent, fontSize: 13, color: P.gold, letterSpacing: 2 }}>
                      COURTYARD &middot; LIVE MUSIC
                    </div>
                  </div>
                </div>
                <h3 style={{ fontFamily: font.display, fontSize: 24, color: P.cream, marginBottom: 12 }}>
                  The Jacaranda Stage
                </h3>
                <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.8, color: P.muted }}>
                  A raised stage beneath the old jacaranda tree in the courtyard.
                  Pull up a chair by the fire. No food, no bar {"\u2014"} just music,
                  the tree{"\u2019"}s canopy overhead, and the stars beyond it.
                  On Fridays, Saturdays, and Sundays the performance moves here.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section style={{
        padding: "100px 24px",
        background: P.deep,
        borderTop: `1px solid ${P.gold}11`,
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
                a guitar, and a room willing to listen. At Neel Paakhi, every evening is a doorway
                back to that era.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 4, color: P.muted, marginBottom: 20, textAlign: "center" }}>THROUGH THE DAY</div>
              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12 }}>
                {dailyMusic.map((m, i) => (
                  <div key={i} style={{
                    padding: "20px 16px", textAlign: "center",
                    background: `${P.river}22`, border: `1px solid ${P.gold}0a`,
                    transition: "all 0.4s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${P.gold}22`; e.currentTarget.style.background = `${P.river}44`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${P.gold}0a`; e.currentTarget.style.background = `${P.river}22`; }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
                    <div style={{ fontFamily: font.display, fontSize: 16, color: P.goldLight, marginBottom: 8 }}>{m.time}</div>
                    <p style={{ fontFamily: font.accent, fontSize: 12, lineHeight: 1.6, color: P.muted, margin: 0 }}>{m.desc}</p>
                  </div>
                ))}
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

          <FadeIn delay={0.2}>
            <div style={{
              marginTop: 48, padding: mobile ? "32px 24px" : "40px 48px",
              background: `linear-gradient(135deg, ${P.warm}44 0%, ${P.river}33 100%)`,
              border: `1px solid ${P.gold}15`,
              position: "relative",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "auto 1fr", gap: mobile ? 16 : 32, alignItems: "start" }}>
                <div style={{ textAlign: "center" }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" style={{ opacity: 0.7 }}>
                    <ellipse cx="20" cy="28" rx="11" ry="9" fill="none" stroke="#d4b85e" strokeWidth="1.2"/>
                    <ellipse cx="20" cy="22" rx="8" ry="6.5" fill="none" stroke="#d4b85e" strokeWidth="1.2"/>
                    <circle cx="20" cy="27" r="3" fill="none" stroke="#d4b85e" strokeWidth="0.8" opacity="0.6"/>
                    <rect x="18.5" y="4" width="3" height="19" fill="none" stroke="#d4b85e" strokeWidth="1" rx="1"/>
                    <rect x="17.5" y="1" width="5" height="4" fill="none" stroke="#d4b85e" strokeWidth="0.8" rx="1"/>
                    <circle cx="18" cy="2.5" r="0.8" fill="#d4b85e" opacity="0.5"/>
                    <circle cx="22" cy="2.5" r="0.8" fill="#d4b85e" opacity="0.5"/>
                    <line x1="19" y1="5" x2="19" y2="35" stroke="#d4b85e" strokeWidth="0.3" opacity="0.4"/>
                    <line x1="20" y1="5" x2="20" y2="36" stroke="#d4b85e" strokeWidth="0.3" opacity="0.4"/>
                    <line x1="21" y1="5" x2="21" y2="35" stroke="#d4b85e" strokeWidth="0.3" opacity="0.4"/>
                    <line x1="17" y1="33" x2="23" y2="33" stroke="#d4b85e" strokeWidth="0.8" opacity="0.5"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 4, color: P.gold, marginBottom: 12 }}>TWO STAGES, ONE SOUL</div>
                  <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.9, color: `${P.cream}cc`, margin: 0 }}>
                    <strong style={{ color: P.goldLight }}>Inside</strong> {"\u2014"} a 6ft {"\u00D7"} 4ft raised
                    platform in the corner of the restaurant. A mic stand, a stool,
                    a guitar rack, warm amber light. Every evening while you eat and drink.
                  </p>
                  <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.9, color: `${P.cream}cc`, marginTop: 16, marginBottom: 0 }}>
                    <strong style={{ color: P.goldLight }}>Outside</strong> {"\u2014"} the jacaranda stage,
                    in the courtyard. The garden is the gallery.
                    No food, no bar {"\u2014"} just the performer and anyone who wants to listen.
                    The bigger nights live here.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
