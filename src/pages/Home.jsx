import { useState, useEffect } from "react";
import { P, font } from "../shared/theme.js";

// Darker tones for text on the light section (gold alone is too faint on cream)
const LIGHT = { accent: "#8a6a1e", body: "#4a4238" };
import { useMobile } from "../shared/hooks.js";
import FadeIn from "../shared/FadeIn.jsx";
import PageShell from "../shared/PageShell.jsx";
import Newsletter from "../shared/Newsletter.jsx";
import { ChangGharSVG, RestaurantSVG, YogaDeckSVG } from "../shared/svgs.jsx";

export default function Home() {
  const mobile = useMobile();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <PageShell>
      {/* Fixed photo backdrop; the page content scrolls over it */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <img
          src="/pictures/neelpaakhi-hero.jpeg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(13,27,30,0.58) 0%, rgba(13,27,30,0.45) 40%, rgba(13,27,30,0.62) 100%)",
        }} />
      </div>

      {/* HERO */}
      <section style={{
        height: "88vh", minHeight: 560, position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1,
      }}>

        {/* Hero text content */}
        <div style={{
          position: "relative", zIndex: 2, textAlign: "center",
          opacity: heroOpacity, transform: `translateY(${scrollY * 0.15}px)`,
          maxWidth: 800, padding: "0 24px",
          marginTop: "8vh",
        }}>
          <div style={{
            fontFamily: font.accent, fontSize: 13, letterSpacing: 8,
            color: P.cream, marginBottom: 24, textTransform: "uppercase", fontWeight: 400,
            animation: "fadeUp 1s ease 0.3s both",
            textShadow: "0 1px 12px rgba(0,0,0,0.6)",
          }}>
            A Boutique Retreat
          </div>
          <h1 style={{
            fontFamily: font.display, fontSize: "clamp(48px, 10vw, 96px)",
            fontWeight: 400, letterSpacing: 2, lineHeight: 0.95,
            color: P.cream, margin: "0 0 8px",
            animation: "fadeUp 1s ease 0.5s both",
            textShadow: "0 2px 24px rgba(0,0,0,0.55)",
          }}>
            Neel Paakhi
          </h1>
          <div style={{
            fontFamily: font.display, fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 400, fontStyle: "italic",
            color: P.goldLight, margin: "0 0 32px",
            animation: "fadeUp 1s ease 0.7s both",
            textShadow: "0 2px 30px rgba(0,0,0,0.4)",
          }}>
            {"\u09A8\u09C0\u09B2 \u09AA\u09BE\u0996\u09C0"}
          </div>
          <div style={{
            width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${P.gold}, transparent)`,
            margin: "0 auto 28px",
            animation: "fadeUp 1s ease 0.9s both",
          }} />
          <p style={{
            fontFamily: font.accent, fontSize: "clamp(16px, 2.5vw, 22px)",
            fontWeight: 400, color: P.cream, lineHeight: 1.7,
            maxWidth: 520, margin: "0 auto 40px",
            animation: "fadeUp 1s ease 1.1s both",
            textShadow: "0 1px 14px rgba(0,0,0,0.7)",
          }}>
            Where acoustic melodies dissolve into the azure sky, and the gentle breeze brings you the scent of bamboo and river stone in every breath.
          </p>
          <div style={{
            fontFamily: font.body, fontSize: 11, letterSpacing: 4, color: P.cream,
            animation: "fadeUp 1s ease 1.4s both",
            textShadow: "0 1px 10px rgba(0,0,0,0.7)",
          }}>
            FULUNG &middot; NORTH GUWAHATI &middot; ASSAM
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          zIndex: 2, textAlign: "center", opacity: heroOpacity,
        }}>
          <div style={{
            width: 1, height: 40, background: `linear-gradient(180deg, ${P.cream}, transparent)`,
            margin: "0 auto", animation: "breathe 2s ease-in-out infinite",
          }} />
        </div>
      </section>

      {/* TEASER CARDS */}
      <section style={{
        position: "relative", zIndex: 1,
        padding: "120px 24px",
        background: "linear-gradient(180deg, rgba(245,240,232,0.86) 0%, rgba(232,220,200,0.92) 100%)",
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, letterSpacing: 5, color: LIGHT.accent, marginBottom: 16 }}>DISCOVER</div>
              <h2 style={{ fontFamily: font.display, fontSize: 42, fontWeight: 400, color: P.river }}>
                A world built on <span style={{ fontStyle: "italic", color: LIGHT.accent }}>sound, soil, and stillness</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 24 }}>
            {[
              {
                title: "The Chang Ghar",
                desc: "One two-storey chang ghar — the traditional Assamese stilt house — for a single party at a time. Handcrafted. Unhurried.",
                link: "/chang-ghar",
                label: "YOUR STAY",
                Svg: ChangGharSVG,
              },
              {
                title: "Dining & Music",
                desc: "A restaurant and bar with a stage in the corner, and a second stage under the jacaranda tree where the courtyard becomes the gallery.",
                link: "/dining",
                label: "THE TABLE & THE STAGE",
                Svg: RestaurantSVG,
              },
              {
                title: "Experiences & Retreats",
                desc: "Yoga at sunrise. Brahmaputra boat rides. Weaving workshops. Campfire circles. Corporate offsites and wellness retreats designed around your intention.",
                link: "/experiences",
                label: "EXPERIENCES & RETREATS",
                Svg: YogaDeckSVG,
              },
              {
                title: "Our Story",
                desc: "Built for those who remember a slower world — where a song on the radio could stop an entire household.",
                link: "/our-story",
                label: "THE AZURE FEATHER",
                icon: (
                  <div style={{
                    aspectRatio: "4/3",
                    background: `linear-gradient(135deg, ${P.river} 0%, ${P.bamboo}88 50%, ${P.terracotta}44 100%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="48" height="64" viewBox="0 0 48 64" style={{ opacity: 0.7 }}>
                      <path d="M24,62 Q23,50 22,38 Q20,28 16,20 Q12,12 6,6 Q14,10 20,16 Q24,20 26,28 Q27,20 30,14 Q34,8 42,4 Q36,12 32,20 Q28,28 26,38 Q25,50 24,62Z" fill={P.gold} opacity="0.75"/>
                      <path d="M24,62 Q23,42 20,24 Q16,14 6,6" fill="none" stroke={P.goldLight} strokeWidth="1" opacity="0.6"/>
                    </svg>
                  </div>
                ),
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <a
                  href={card.link}
                  style={{
                    display: "block", textDecoration: "none",
                    background: "#fffdf8",
                    border: `1px solid ${P.gold}33`,
                    boxShadow: "0 8px 24px rgba(26,58,74,0.08)",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${P.gold}88`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${P.gold}33`; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                    {card.Svg ? <card.Svg /> : card.icon}
                  </div>
                  <div style={{ padding: 28 }}>
                    <div style={{ fontFamily: font.body, fontSize: 9, letterSpacing: 4, color: LIGHT.accent, marginBottom: 10 }}>{card.label}</div>
                    <h3 style={{ fontFamily: font.display, fontSize: 24, fontStyle: "italic", color: P.river, marginBottom: 12 }}>{card.title}</h3>
                    <p style={{ fontFamily: font.accent, fontSize: 16, lineHeight: 1.8, color: LIGHT.body, marginBottom: 16 }}>{card.desc}</p>
                    <div style={{
                      fontFamily: font.body, fontSize: 10, letterSpacing: 3, color: LIGHT.accent,
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                      DISCOVER MORE
                      <span style={{ fontSize: 14, transition: "transform 0.3s" }}>{"\u2192"}</span>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
