export const P = {
  river: "#1a3a4a", riverLight: "#3a7a8a", bamboo: "#4a6741", bambooLight: "#7aaa6e",
  terracotta: "#c4714a", terracottaLight: "#d4956e", cream: "#f5f0e8", sand: "#e8dcc8",
  gold: "#b8943e", goldLight: "#d4b85e", charcoal: "#1a1a1a", warm: "#2a2420",
  deep: "#0d1b1e", text: "#f5f0e8", muted: "#a09888",
};

export const font = {
  display: "'Playfair Display', 'Georgia', serif",
  body: "'DM Sans', 'Helvetica Neue', sans-serif",
  accent: "'Cormorant Garamond', 'Georgia', serif",
};

export function navigate(href) {
  if (href.startsWith('#')) {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = href;
  }
}
