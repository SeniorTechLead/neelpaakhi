import { P, font } from "../shared/theme.js";
import { useMobile } from "../shared/hooks.js";
import FadeIn from "../shared/FadeIn.jsx";
import PageShell from "../shared/PageShell.jsx";
import Newsletter from "../shared/Newsletter.jsx";
import { rooms } from "../shared/data.js";
import { ChangGharSVG } from "../shared/svgs.jsx";

export default function Rooms() {
  const mobile = useMobile();

  return (
    <PageShell>
      <section style={{
        padding: "160px 24px 120px",
        background: P.deep,
        position: "relative",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>ACCOMMODATIONS</div>
              <h2 style={{ fontFamily: font.display, fontSize: 42, fontWeight: 400, color: P.cream }}>
                One suite. <span style={{ fontStyle: "italic", color: P.goldLight }}>Two storeys.</span>
              </h2>
              <p style={{ fontFamily: font.accent, fontSize: 16, color: P.muted, marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
                A single two-storey chang ghar, the traditional Assamese stilt house,
                for one party at a time. Handcrafted in bamboo and timber.
              </p>
            </div>
          </FadeIn>

          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            {rooms.map((r, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{
                  background: P.warm,
                  border: `1px solid ${P.gold}11`,
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${P.gold}33`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = `${P.gold}11`}
                >
                  <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                    <ChangGharSVG />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 16px 12px",
                      background: "linear-gradient(transparent, rgba(13,27,30,0.8))",
                    }}>
                      <div style={{ fontFamily: font.body, fontSize: 9, letterSpacing: 3, color: P.gold }}>
                        TWO-STOREY CHANG GHAR
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: mobile ? 24 : 32 }}>
                    <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 4, color: P.gold, marginBottom: 12 }}>
                      PRIVATE SUITE
                    </div>
                    <h3 style={{ fontFamily: font.display, fontSize: 24, fontStyle: "italic", color: P.goldLight, marginBottom: 14 }}>
                      {r.name}
                    </h3>
                    <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.8, color: P.muted, marginBottom: 20 }}>
                      {r.desc}
                    </p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{ fontFamily: font.display, fontSize: 28, color: P.gold }}>{"\u20B9"}{r.price}</span>
                      <span style={{ fontFamily: font.body, fontSize: 11, color: P.muted }}> / night</span>
                      {r.originalPrice && (
                        <span style={{ fontFamily: font.display, fontSize: 22, color: P.terracottaLight, textDecoration: "line-through" }}>{"\u20B9"}{r.originalPrice}</span>
                      )}
                    </div>
                    <div style={{ fontFamily: font.body, fontSize: 9, letterSpacing: 2, color: P.bambooLight, marginTop: 6 }}>
                      LAUNCH PRICE {"\u2014"} 33% OFF
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
