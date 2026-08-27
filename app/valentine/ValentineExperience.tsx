"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PixelSprite from "./PixelSprite";
import Scenery from "./Scenery";
import {
  CAT_CRY,
  CAT_HAPPY,
  CAT_HOPEFUL,
  CAT_PLEAD,
  CAT_SAD,
  CAT_SHY,
  HEART,
  HUG,
  SPEAKER,
  SPEAKER_MUTED,
} from "./pixel-data";

type Scene = "start" | "ask" | "yay" | "date" | "time" | "plan" | "done";

const SCENE_ORDER: Scene[] = ["ask", "yay", "date", "time", "plan", "done"];

/** Escalating guilt trip, one line per rejected attempt. */
const TAUNTS = [
  "Babe please :(",
  "Are you sure?? :(",
  "Think about it again...",
  "Heart broken :(",
  "The cat is crying now",
  "Look at that face...",
  "U r breaking my heart :((",
  "Ok the No button quit.",
];

const MOODS = [
  CAT_SHY,
  CAT_HOPEFUL,
  CAT_PLEAD,
  CAT_PLEAD,
  CAT_SAD,
  CAT_SAD,
  CAT_CRY,
  CAT_CRY,
  CAT_CRY,
];

/** Deterministic wobble for the shrinking No button. */
const JITTER = [
  [0, 0, 0],
  [8, -6, -6],
  [-10, 8, 7],
  [12, 5, -9],
  [-13, -7, 10],
  [9, 11, -12],
  [-8, -12, 13],
  [11, -5, -14],
  [0, 0, 0],
];

const TIME_SLOTS = [
  { label: "Brunch", value: "11:00" },
  { label: "Coffee", value: "15:00" },
  { label: "Sunset", value: "17:30" },
  { label: "Dinner", value: "19:00" },
  { label: "Late night", value: "21:30" },
];

const PLANS = [
  "Dinner date",
  "Movie night",
  "Coffee & walk",
  "Picnic",
  "Mini golf",
  "Surprise me",
];

function toISODate(date: Date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

/** ISO date of the next upcoming `weekday` (0 = Sunday). */
function nextWeekday(weekday: number) {
  const date = new Date();
  const delta = (weekday - date.getDay() + 7) % 7 || 7;
  date.setDate(date.getDate() + delta);
  return toISODate(date);
}

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(value: string) {
  if (!value) return "—";
  const [hours, minutes] = value.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** Chiptune blips synthesised on the fly — no audio files to ship. */
function useBlips(muted: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  return useCallback(
    (notes: number[], step = 0.085) => {
      if (muted || typeof window === "undefined") return;
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return;

      const ctx = ctxRef.current ?? (ctxRef.current = new Ctor());
      if (ctx.state === "suspended") void ctx.resume();

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const at = ctx.currentTime + i * step;
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, at);
        gain.gain.setValueAtTime(0.0001, at);
        gain.gain.exponentialRampToValueAtTime(0.09, at + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + step * 0.9);
        osc.connect(gain).connect(ctx.destination);
        osc.start(at);
        osc.stop(at + step);
      });
    },
    [muted]
  );
}

export default function ValentineExperience() {
  const [scene, setScene] = useState<Scene>("start");
  const [noCount, setNoCount] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [plan, setPlan] = useState("");
  const [muted, setMuted] = useState(false);
  const [copied, setCopied] = useState(false);

  const blip = useBlips(muted);

  // The experience is a full-screen overlay; stop the site behind it scrolling.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const noGone = noCount >= TAUNTS.length;
  const today = useMemo(() => toISODate(new Date()), []);
  const quickDates = useMemo(
    () => [
      { label: "This Fri", value: nextWeekday(5) },
      { label: "This Sat", value: nextWeekday(6) },
      { label: "This Sun", value: nextWeekday(0) },
    ],
    []
  );

  const confetti = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const angle = (i / 22) * Math.PI * 2;
        const distance = 120 + (i % 5) * 46;
        return {
          tx: `${Math.round(Math.cos(angle) * distance)}px`,
          ty: `${Math.round(Math.sin(angle) * distance - 60)}px`,
          rot: `${(i % 2 ? 1 : -1) * (120 + i * 9)}deg`,
          delay: `${(i % 6) * 0.05}s`,
        };
      }),
    []
  );

  const go = (next: Scene, notes: number[] = [660, 880]) => {
    blip(notes);
    setScene(next);
  };

  const handleNo = () => {
    blip([200, 150]);
    setNoCount((n) => Math.min(n + 1, TAUNTS.length));
  };

  const restart = () => {
    blip([523, 659]);
    setNoCount(0);
    setDate("");
    setTime("");
    setPlan("");
    setCopied(false);
    setScene("ask");
  };

  const summary = `IT'S A DATE 💌  ${formatDate(date)} · ${formatTime(time)} · ${plan}`;

  const share = async () => {
    blip([784, 988]);
    try {
      if (navigator.share) {
        await navigator.share({ title: "It's a date!", text: summary });
        return;
      }
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      /* Cancelled share or blocked clipboard — nothing to recover from. */
    }
  };

  const stepIndex = SCENE_ORDER.indexOf(scene);

  return (
    <div className="vday">
      <Scenery />

      {scene !== "start" && (
        <div className="vday__hud">
          <div className="vday__pips" aria-hidden="true">
            {SCENE_ORDER.map((_, i) => (
              <PixelSprite
                key={i}
                rows={HEART}
                className={`vday__pip${i <= stepIndex ? " vday__pip--on" : ""}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="vday__icon-btn"
            onClick={() => setMuted((m) => !m)}
            aria-pressed={muted}
            aria-label={muted ? "Unmute sound" : "Mute sound"}
          >
            <PixelSprite
              rows={muted ? SPEAKER_MUTED : SPEAKER}
              style={{ width: 20 }}
            />
          </button>
        </div>
      )}

      <div className="vday__stage">
        {scene === "start" && (
          <>
            <div className="pxl-frame pxl-portrait">
              <PixelSprite rows={CAT_SHY} label="A small pixel cat" />
            </div>
            <h1 className="pxl-title">
              Will you be
              <br />
              my valentine?
            </h1>
            <p className="pxl-sub">A tiny game. One question. No pressure. (some pressure)</p>
            <button
              type="button"
              className="pxl-btn vday__blink"
              onClick={() => go("ask", [523, 659, 784])}
            >
              ▶ Press start
            </button>
          </>
        )}

        {scene === "ask" && (
          <>
            <div className="pxl-frame pxl-portrait">
              <PixelSprite rows={MOODS[noCount]} label="A hopeful pixel cat" />
            </div>

            <h1 className="pxl-title">Will you go out with me?</h1>

            <div className="vday__duel">
              <button
                type="button"
                className="pxl-btn vday__yes"
                style={{ ["--grow" as string]: Math.min(1 + noCount * 0.19, 2.2) }}
                onClick={() => go("yay", [659, 784, 988, 1319])}
              >
                Yes ✧
              </button>

              <button
                type="button"
                className={`pxl-btn pxl-btn--ghost vday__no${noGone ? " vday__no--gone" : ""}`}
                style={{
                  ["--shrink" as string]: Math.max(1 - noCount * 0.1, 0.42),
                  ["--dx" as string]: `${JITTER[noCount][0]}px`,
                  ["--dy" as string]: `${JITTER[noCount][1]}px`,
                  ["--tilt" as string]: `${JITTER[noCount][2]}deg`,
                }}
                onClick={handleNo}
                disabled={noGone}
                aria-hidden={noGone}
                tabIndex={noGone ? -1 : 0}
              >
                No
              </button>
            </div>

            <p className="pxl-sub vday__taunt" key={noCount} aria-live="polite">
              {noCount > 0 ? TAUNTS[noCount - 1] : " "}
            </p>
          </>
        )}

        {scene === "yay" && (
          <>
            <div className="pxl-frame pxl-portrait pxl-portrait--light" style={{ width: 168 }}>
              <PixelSprite rows={HUG} label="Two pixel characters hugging" />
            </div>
            <h1 className="pxl-title">Yay!</h1>
            <p className="pxl-sub">I&apos;m so glad u said yes.</p>
            <button
              type="button"
              className="pxl-btn pxl-btn--ghost"
              onClick={() => go("date")}
            >
              Press to continue →
            </button>
          </>
        )}

        {scene === "date" && (
          <>
            <p className="pxl-bubble">Maybeeeeee...</p>
            <div className="pxl-frame pxl-portrait pxl-portrait--light" style={{ width: 104 }}>
              <PixelSprite rows={CAT_HOPEFUL} label="A scheming pixel cat" />
            </div>

            <h1 className="pxl-title">Pick a date</h1>
            <p className="pxl-sub">Choose the day for our cute little plan.</p>

            <input
              type="date"
              className="pxl-input"
              value={date}
              min={today}
              onChange={(event) => {
                blip([880]);
                setDate(event.target.value);
              }}
              aria-label="Date of our date"
            />

            <div className="vday__grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {quickDates.map((quick) => (
                <button
                  key={quick.label}
                  type="button"
                  className={`pxl-chip${date === quick.value ? " pxl-chip--on" : ""}`}
                  onClick={() => {
                    blip([880]);
                    setDate(quick.value);
                  }}
                >
                  {quick.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="pxl-btn"
              onClick={() => go("time")}
              disabled={!date}
            >
              Lock it in →
            </button>
          </>
        )}

        {scene === "time" && (
          <>
            <div className="pxl-frame pxl-portrait pxl-portrait--light" style={{ width: 96 }}>
              <PixelSprite rows={CAT_HAPPY} label="A delighted pixel cat" />
            </div>

            <h1 className="pxl-title">What time?</h1>
            <p className="pxl-sub">{formatDate(date)} — pick your hour.</p>

            <div className="vday__grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.value}
                  type="button"
                  className={`pxl-chip${time === slot.value ? " pxl-chip--on" : ""}`}
                  onClick={() => {
                    blip([740]);
                    setTime(slot.value);
                  }}
                >
                  {slot.label}
                </button>
              ))}
              <label className="pxl-chip" style={{ cursor: "text" }}>
                <span style={{ opacity: 0.6 }}>Custom</span>
                <input
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  aria-label="Custom time"
                  style={{
                    width: "100%",
                    font: "inherit",
                    fontSize: 9,
                    color: "inherit",
                    textAlign: "center",
                    background: "transparent",
                    border: 0,
                  }}
                />
              </label>
            </div>

            <button
              type="button"
              className="pxl-btn"
              onClick={() => go("plan")}
              disabled={!time}
            >
              Next →
            </button>
          </>
        )}

        {scene === "plan" && (
          <>
            <div className="pxl-frame pxl-portrait pxl-portrait--light" style={{ width: 96 }}>
              <PixelSprite rows={CAT_PLEAD} label="An excited pixel cat" />
            </div>

            <h1 className="pxl-title">What would you like to do?</h1>

            <div className="vday__grid">
              {PLANS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`pxl-chip${plan === option ? " pxl-chip--on" : ""}`}
                  onClick={() => {
                    blip([740, 988]);
                    setPlan(option);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="pxl-btn"
              onClick={() => go("done", [659, 784, 988, 1319])}
              disabled={!plan}
            >
              Lock it in
            </button>
          </>
        )}

        {scene === "done" && (
          <>
            {confetti.map((piece, i) => (
              <PixelSprite
                key={i}
                rows={HEART}
                className="vday__confetti"
                style={{
                  ["--tx" as string]: piece.tx,
                  ["--ty" as string]: piece.ty,
                  ["--rot" as string]: piece.rot,
                  animationDelay: piece.delay,
                }}
              />
            ))}

            <div
              className="pxl-frame pxl-portrait pxl-portrait--light"
              style={{ width: 150 }}
            >
              <PixelSprite rows={HUG} label="Two pixel characters hugging" />
            </div>

            <h1 className="pxl-title">It&apos;s a date!</h1>

            <div className="pxl-frame vday__ticket">
              <p className="vday__row">
                <span>Date:</span>
                <b>{formatDate(date)}</b>
              </p>
              <p className="vday__row">
                <span>Time:</span>
                <b>{formatTime(time)}</b>
              </p>
              <p className="vday__row">
                <span>Activity:</span>
                <b>{plan}</b>
              </p>
              <p className="pxl-tiny vday__note">
                Don&apos;t be late. I&apos;ll be the nervous one.
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <button type="button" className="pxl-btn" onClick={share}>
                {copied ? "Copied!" : "Send it"}
                <PixelSprite rows={HEART} tint="#fff4fa" style={{ width: 14 }} />
              </button>
              <button type="button" className="pxl-btn pxl-btn--ghost" onClick={restart}>
                Play again
              </button>
            </div>

            <div className="vday__cheer" style={{ display: "flex", gap: 8 }} aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <PixelSprite
                  key={i}
                  rows={HEART}
                  style={{
                    width: 16,
                    animation: `vday-bob 1.6s ease-in-out ${i * 0.18}s infinite`,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="vday__scan" aria-hidden="true" />
    </div>
  );
}
