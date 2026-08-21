import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "▪▫░▓/\\|×+·01";

function scramble(text: string, resolved: number) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === " ") out += " ";
    else if (i < resolved) out += ch;
    else out += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return out;
}

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** Characters resolved per frame. */
  speed?: number;
  delay?: number;
};

/**
 * Decode-on-view text scramble (monospace use). Falls back to plain text under
 * reduced motion. React Bits "ScrambleText" pattern.
 */
export function ScrambleText({ text, className, speed = 2, delay = 0 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduced = useReducedMotion();
  // Reserve space with a full scramble so monospace width is stable.
  const [display, setDisplay] = useState(() => scramble(text, 0));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    let timeout = 0;
    const tick = () => {
      frame += 1;
      const resolved = frame * speed;
      setDisplay(scramble(text, resolved));
      if (resolved < text.length) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    timeout = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [inView, text, reduced, speed, delay]);

  return (
    <span ref={ref} className={className} aria-label={text} role="text">
      {display}
    </span>
  );
}
