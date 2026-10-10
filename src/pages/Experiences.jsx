import { P, font, navigate } from "../shared/theme.js";
import { useMobile } from "../shared/hooks.js";
import FadeIn from "../shared/FadeIn.jsx";
import PageShell from "../shared/PageShell.jsx";
import Newsletter from "../shared/Newsletter.jsx";
import { curatedExperiences, retreatPackages } from "../shared/data.js";
import { YogaDeckSVG, FishPondSVG, CampfireCircleSVG } from "../shared/svgs.jsx";

export default function Experiences() {
  const mobile = useMobile();

  return (
    <PageShell>
      {/* WELLNESS */}
      <section style={{
        padding: "160px 24px 120px",
        background: `linear-gradient(180deg, ${P.deep} 0%, ${P.warm} 50%, ${P.deep} 100%)`,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>EXPERIENCES & RETREATS</div>
              <h2 style={{ fontFamily: font.display, fontSize: 42, fontWeight: 400, color: P.cream }}>
                Discover. <span style={{ fontStyle: "italic", color: P.goldLight }}>Slow down. Return renewed.</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 4, color: P.muted, marginBottom: 20, textAlign: "center" }}>AT THE RETREAT</div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 24 }}>
            {[
              { title: "Yoga Deck", Svg: YogaDeckSVG, desc: "A covered bamboo platform open to the morning sky. Daily sessions at sunrise. The paddy fields are your horizon line." },
              { title: "Fish Pond", Svg: FishPondSVG, desc: "A quiet rectangular garden pond with a stone edge and lily pads. Sit at the water\u2019s edge and watch the fish drift by \u2014 the perfect pause before the evening campfire." },
              { title: "Campfire Circle", Svg: CampfireCircleSVG, desc: "Campfire areas tucked into the garden. Stargazing with zero light pollution. Acoustic guitars, rice beer, and stories under an Assamese sky." },
            ].map((w, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{
                  textAlign: "center",
                  background: `${P.river}33`,
                  border: `1px solid ${P.gold}11`,
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${P.gold}33`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = `${P.gold}11`}
                >
                  <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                    <w.Svg />
                  </div>
                  <div style={{ padding: 24 }}>
                    <div style={{ fontFamily: font.display, fontSize: 22, fontStyle: "italic", color: P.goldLight, marginBottom: 12 }}>{w.title}</div>
                    <p style={{ fontFamily: font.accent, fontSize: 14, lineHeight: 1.8, color: P.muted }}>{w.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CURATED EXPERIENCES */}
      <section style={{
        padding: "100px 24px",
        background: P.deep,
        borderTop: `1px solid ${P.gold}11`,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>BEYOND THE RETREAT</div>
              <h2 style={{ fontFamily: font.display, fontSize: 36, fontWeight: 400, color: P.cream, fontStyle: "italic" }}>
                The north bank <span style={{ fontStyle: "normal" }}>is</span> the experience
              </h2>
              <p style={{ fontFamily: font.accent, fontSize: 16, color: P.muted, marginTop: 16, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.8 }}>
                Every journey begins at the front desk. Our team arranges each experience
                personally {"\u2014"} from the boat to the loom to the temple trail.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            {curatedExperiences.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  padding: mobile ? "24px 20px" : "28px 32px",
                  background: `${P.river}33`,
                  border: `1px solid ${P.gold}11`,
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${P.gold}33`; e.currentTarget.style.background = `${P.river}55`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${P.gold}11`; e.currentTarget.style.background = `${P.river}33`; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 22 }}>{exp.icon}</span>
                    <span style={{ fontFamily: font.body, fontSize: 9, letterSpacing: 2, color: P.muted }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontFamily: font.display, fontSize: 20, color: P.goldLight, marginBottom: 6 }}>{exp.title}</div>
                  <div style={{ fontFamily: font.body, fontSize: 9, letterSpacing: 2, color: `${P.muted}88`, marginBottom: 12 }}>{exp.season}</div>
                  <p style={{ fontFamily: font.accent, fontSize: 14, lineHeight: 1.7, color: P.muted, margin: 0 }}>{exp.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* RETREATS & OFFSITES */}
      <section id="retreats" style={{
        padding: "120px 24px",
        background: `linear-gradient(180deg, ${P.deep} 0%, ${P.warm} 50%, ${P.deep} 100%)`,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>RETREATS & OFFSITES</div>
              <h2 style={{ fontFamily: font.display, fontSize: 36, fontWeight: 400, color: P.cream }}>
                Curated stays for <span style={{ fontStyle: "italic", color: P.goldLight }}>deeper purpose</span>
              </h2>
              <p style={{ fontFamily: font.accent, fontSize: 16, color: P.muted, marginTop: 16, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.8 }}>
                Whether your team needs to reconnect, or you need to reconnect with yourself {"\u2014"}
                we design the stay around your intention.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gap: 32 }}>
            {retreatPackages.map((pkg, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{
                  padding: mobile ? "32px 24px" : "40px 48px",
                  background: `linear-gradient(135deg, ${P.warm}44 0%, ${P.river}33 100%)`,
                  border: `1px solid ${P.gold}15`,
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${P.gold}33`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = `${P.gold}15`}
                >
                  <div style={{ fontFamily: font.body, fontSize: 9, letterSpacing: 3, color: P.bambooLight, marginBottom: 16 }}>{pkg.label}</div>
                  <h3 style={{ fontFamily: font.display, fontSize: mobile ? 24 : 28, color: P.cream, marginBottom: 6 }}>{pkg.title}</h3>
                  <div style={{ fontFamily: font.accent, fontSize: 16, fontStyle: "italic", color: P.goldLight, marginBottom: 20 }}>{pkg.subtitle}</div>
                  <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.8, color: P.muted, marginBottom: 24 }}>{pkg.desc}</p>

                  <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 8 : 12, marginBottom: 28 }}>
                    {pkg.highlights.map((h, j) => (
                      <div key={j} style={{ fontFamily: font.accent, fontSize: 13, color: `${P.cream}aa`, lineHeight: 1.6, paddingLeft: 16, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: P.gold }}>{"\u2022"}</span>
                        {h}
                      </div>
                    ))}
                  </div>

                  <div
                    onClick={() => navigate("#book")}
                    style={{
                      display: "inline-block",
                      padding: "12px 28px",
                      border: `1px solid ${P.gold}`,
                      color: P.gold,
                      fontFamily: font.body, fontSize: 11, letterSpacing: 3,
                      cursor: "pointer", transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => { e.target.style.background = P.gold; e.target.style.color = P.deep; }}
                    onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = P.gold; }}
                  >{pkg.cta.toUpperCase()}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section style={{
        padding: "120px 24px",
        background: P.deep,
        borderTop: `1px solid ${P.gold}11`,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 40 : 60 }}>
              <div>
                <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>GETTING HERE</div>
                <h2 style={{ fontFamily: font.display, fontSize: 36, fontWeight: 400, color: P.cream, marginBottom: 24 }}>
                  Close enough to escape.<br /><span style={{ fontStyle: "italic", color: P.goldLight }}>Far enough to breathe.</span>
                </h2>
                <div style={{ width: 50, height: 1, background: P.gold, marginBottom: 24 }} />
                <div style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 2, color: P.muted }}>
                  <p style={{ marginBottom: 12 }}>
                    Fulung village, North Guwahati — on the quiet north bank of the Brahmaputra.
                    Just 25 minutes from Paltan Bazaar via the newly opened Kumar Bhaskar Varma Setu,
                    yet a world away in spirit.
                  </p>
                  <p style={{ marginBottom: 16 }}>
                    Near Dirgheswari Temple. Close to The Art of Living Ashram.
                    The city is a short drive away — but you won't miss it.
                  </p>
                </div>
                {[
                  { label: "Paltan Bazaar (city centre)", dist: "25 min" },
                  { label: "Guwahati Airport", dist: "40 min" },
                  { label: "Guwahati Railway Station", dist: "10 min" },
                  { label: "Kamakhya Temple", dist: "20 min" },
                  { label: "Dirgheswari Temple", dist: "5 min" },
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

      <Newsletter />
    </PageShell>
  );
}
