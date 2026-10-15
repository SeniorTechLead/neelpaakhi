import { P, font } from "../shared/theme.js";
import { useMobile } from "../shared/hooks.js";
import FadeIn from "../shared/FadeIn.jsx";
import PageShell from "../shared/PageShell.jsx";
import Newsletter from "../shared/Newsletter.jsx";
import { RestaurantSVG } from "../shared/svgs.jsx";

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
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: P.gold, marginBottom: 16 }}>THE TABLE</div>
              <h2 style={{ fontFamily: font.display, fontSize: 42, fontWeight: 400, color: P.cream }}>
                Where <span style={{ fontStyle: "italic", color: P.goldLight }}>every meal becomes a memory</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ marginBottom: 40 }}>
            <FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 24 : 48, alignItems: "center" }}>
                <div style={{ aspectRatio: "4/3", position: "relative", overflow: "hidden" }}>
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
                <div>
                <h3 style={{ fontFamily: font.display, fontSize: 24, color: P.cream, marginBottom: 12 }}>
                  The Restaurant + Bar
                </h3>
                <p style={{ fontFamily: font.accent, fontSize: 15, lineHeight: 1.8, color: P.muted }}>
                  One open room {"\u2014"} no wall between the dining tables and the bar counter.
                  44-48 seats on the ground floor of the main building.
                  The menu moves with the seasons: river fish, bamboo shoot preparations,
                  smoked pork from the hills, and Assamese thalis that honor the land.
                  A quiet room for long, unhurried meals.
                </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
