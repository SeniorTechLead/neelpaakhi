import { useInView } from "./hooks.js";

export default function FadeIn({ children, delay = 0, y = 40, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}
