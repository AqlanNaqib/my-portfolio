"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { FaPlay, FaForward, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { IntroSound } from "./intro-sound";
import { useStoredBoolean } from "./use-stored-boolean";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export const INTRO_SEEN_KEY = "an-intro-seen";
const MUTED_KEY = "an-intro-muted";

const NAME = "AQLAN NAQIB";
const TAGLINE = "Building software that makes a difference.";

// Seconds. Visual timings in globals.css use the same --impact value.
const TIMING = {
  full: { impact: 1.05, exit: 3.9, close: 4.8 },
  reduced: { impact: 0.2, exit: 2.6, close: 3.2 },
};

type Phase = "gate" | "playing" | "exiting";

type CinematicIntroProps = {
  /** "gate" asks the visitor to click first (needed for sound); "playing" starts straight away (replay). */
  initialPhase?: "gate" | "playing";
  /** Marks the first-load intro so returning visitors never see it flash before hydration. */
  isInitial?: boolean;
  /** Called when the intro starts handing over to the page. */
  onReveal: () => void;
  /** Called once the intro has fully gone. */
  onClose: () => void;
};

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function CinematicIntro({
  initialPhase = "gate",
  isInitial = false,
  onReveal,
  onClose,
}: CinematicIntroProps) {
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [fastExit, setFastExit] = useState(false);
  const [muted, setMuted] = useStoredBoolean(MUTED_KEY);
  const reduced = usePrefersReducedMotion();

  const soundRef = useRef<IntroSound | null>(null);
  const timersRef = useRef<number[]>([]);
  const skipRef = useRef<HTMLButtonElement | null>(null);
  const callbacks = useRef({ onReveal, onClose });
  useEffect(() => {
    callbacks.current = { onReveal, onClose };
  });

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  const later = (fn: () => void, seconds: number) => {
    timersRef.current.push(window.setTimeout(fn, seconds * 1000));
  };

  const finish = useCallback(() => {
    markIntroSeen();
    callbacks.current.onClose();
  }, []);

  // Stays true through "exiting" so the timeline isn't torn down mid-transition.
  const started = phase !== "gate";

  // Drive the timeline once started. Started by a click, so audio is allowed.
  useEffect(() => {
    if (!started) return;
    const t = reduced ? TIMING.reduced : TIMING.full;

    const sound = new IntroSound(muted);
    soundRef.current = sound;
    sound.play(t.impact);

    later(() => {
      setPhase("exiting");
      callbacks.current.onReveal();
    }, t.exit);
    later(() => {
      soundRef.current?.stop(0.6);
      finish();
    }, t.close);

    return () => {
      clearTimers();
      sound.stop(0.15);
      soundRef.current = null;
    };
    // `muted` is read once at start; later changes go through setMuted below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, reduced, finish]);

  useEffect(() => {
    soundRef.current?.setMuted(muted);
  }, [muted]);

  useEffect(() => () => clearTimers(), []);

  const skip = useCallback(() => {
    clearTimers();
    soundRef.current?.stop(0.25);
    soundRef.current = null;
    setFastExit(true);
    setPhase("exiting");
    callbacks.current.onReveal();
    later(finish, reduced ? 0.05 : 0.45);
  }, [finish, reduced]);

  // Escape skips at any point.
  useEffect(() => {
    if (phase === "exiting") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        skip();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, skip]);

  // Keep keyboard focus inside the intro once it starts playing.
  useEffect(() => {
    if (phase === "playing") skipRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const t = reduced ? TIMING.reduced : TIMING.full;

  return (
    <div
      className={`intro${isInitial ? " intro--initial" : ""}`}
      data-phase={phase}
      data-fast={fastExit ? "" : undefined}
      data-reduced={reduced ? "" : undefined}
      style={{ "--impact": `${t.impact}s` } as CSSProperties}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio intro"
    >
      <div className="intro-controls">
        <button
          type="button"
          className="intro-ctl"
          onClick={() => setMuted(!muted)}
          aria-pressed={muted}
          aria-label={muted ? "Unmute intro sound" : "Mute intro sound"}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? <FaVolumeMute aria-hidden /> : <FaVolumeUp aria-hidden />}
        </button>
        {phase !== "exiting" && (
          <button ref={skipRef} type="button" className="intro-skip" onClick={skip}>
            Skip Intro <FaForward aria-hidden />
          </button>
        )}
      </div>

      {phase === "gate" ? (
        <div className="intro-gate">
          <p className="intro-gate-kicker">Aqlan Naqib · Portfolio</p>
          <button
            type="button"
            className="intro-enter"
            onClick={() => setPhase("playing")}
            autoFocus
          >
            <span className="intro-enter-ring" aria-hidden />
            <FaPlay aria-hidden className="intro-enter-icon" />
            <span className="sr-only">Enter portfolio{muted ? "" : " with sound"}</span>
          </button>
          <p className="intro-gate-hint">
            Click to enter <span aria-hidden>·</span> {muted ? "sound off" : "sound on"}
          </p>
        </div>
      ) : (
        <div className="intro-stage">
          <div className="intro-beam" aria-hidden />
          <div className="intro-bloom" aria-hidden />
          <div className="intro-title-wrap">
            <p className="intro-name">
              <span className="sr-only">Aqlan Naqib</span>
              <span aria-hidden className="intro-letters">
                {NAME.split("").map((ch, i) =>
                  ch === " " ? (
                    <span key={i} className="intro-space" />
                  ) : (
                    <span key={i} className="intro-letter" style={{ "--i": i } as CSSProperties}>
                      {ch}
                    </span>
                  ),
                )}
              </span>
            </p>
            <span className="intro-rule" aria-hidden />
            <p className="intro-tagline">{TAGLINE}</p>
          </div>
        </div>
      )}
    </div>
  );
}
