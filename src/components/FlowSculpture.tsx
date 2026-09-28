"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, ArrowDown } from "lucide-react";
import { useReaderLanguage } from "./ReaderLanguage";
type Form = "wing" | "fan" | "wake";
export function FlowSculpture() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const motion = useRef({
    yaw: -0.25,
    pitch: 0.38,
    form: "wing" as Form,
    paused: false,
  });
  const [form, setForm] = useState<Form>("wing");
  const [paused, setPaused] = useState(false);
  const { language } = useReaderLanguage();
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      last = 0,
      t = 0,
      visible = true,
      w = 1,
      h = 1;
    const count = 1900;
    const points = Array.from({ length: count }, (_, i) => ({
      u: (i * 0.61803398875) % 1,
      v: (i * 0.754877666) % 1,
      r: (i * 0.41421356) % 1,
    }));
    const current = points.map(() => [0, 0, 0]);
    function resize() {
      const rect = c!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const d = Math.min(devicePixelRatio, 1.5);
      c!.width = w * d;
      c!.height = h * d;
      ctx!.setTransform(d, 0, 0, d, 0, 0);
    }
    const observer = new ResizeObserver(resize);
    observer.observe(c);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(c);
    resize();
    function draw(now: number) {
      frame = requestAnimationFrame(draw);
      if (now - last < 32 || !visible || document.hidden) return;
      last = now;
      const moving = !motion.current.paused && !reduced.matches;
      if (moving) t += 0.006;
      ctx!.clearRect(0, 0, w, h);
      const radius = Math.min(w * 0.36, h * 0.45);
      const yaw = motion.current.yaw + (moving ? Math.sin(t * 0.3) * 0.15 : 0);
      const pitch = motion.current.pitch;
      const glow = ctx!.createRadialGradient(
        w / 2,
        h * 0.48,
        0,
        w / 2,
        h * 0.48,
        radius * 1.4,
      );
      glow.addColorStop(0, "#183f552c");
      glow.addColorStop(0.55, "#10243318");
      glow.addColorStop(1, "#060b1000");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, w, h);
      for (let i = 0; i < 120; i++) {
        const p = points[i];
        ctx!.fillStyle = `rgba(150,188,215,${0.08 + p.r * 0.27})`;
        ctx!.fillRect(p.u * w, p.v * h, p.r > 0.94 ? 2 : 1, p.r > 0.94 ? 2 : 1);
      }
      const render: {
        x: number;
        y: number;
        z: number;
        r: number;
        i: number;
      }[] = [];
      for (let i = 0; i < count; i++) {
        const p = points[i];
        let x = 0,
          y = 0,
          z = 0;
        if (motion.current.form === "wing") {
          const span = (p.u - 0.5) * 2.5;
          const chord = 0.78 - Math.abs(span) * 0.37;
          x = span;
          y = (p.v - 0.5) * chord + Math.abs(span) * 0.32;
          z = Math.sin(p.v * Math.PI) * chord * 0.22 * (i % 2 ? 1 : -0.45);
        } else if (motion.current.form === "fan") {
          const blade = Math.floor(p.u * 15);
          const r = 0.24 + p.v * 0.94;
          const theta = (blade * Math.PI * 2) / 15 + p.r * 0.22 + p.v * 0.55;
          x = r * Math.cos(theta);
          y = r * Math.sin(theta);
          z = Math.sin(p.v * Math.PI) * 0.26 + p.r * 0.08;
        } else {
          const length = (p.u - 0.5) * 2.6;
          const r = 0.26 + 0.23 * p.u;
          x = length;
          y =
            Math.cos(p.v * Math.PI * 2 + length * 3 + t) * r +
            (i % 2 ? 0.32 : -0.32);
          z = Math.sin(p.v * Math.PI * 2 + length * 3 + t) * r;
        }
        const q = current[i];
        const blend = reduced.matches ? 1 : 0.085;
        q[0] += (x - q[0]) * blend;
        q[1] += (y - q[1]) * blend;
        q[2] += (z - q[2]) * blend;
        const xx = q[0] * Math.cos(yaw) - q[2] * Math.sin(yaw),
          zz = q[0] * Math.sin(yaw) + q[2] * Math.cos(yaw);
        const yy = q[1] * Math.cos(pitch) - zz * Math.sin(pitch),
          depth = q[1] * Math.sin(pitch) + zz * Math.cos(pitch);
        const scale = 2.7 / (2.7 + depth);
        render.push({
          x: w / 2 + xx * radius * scale,
          y: h * 0.46 + yy * radius * scale,
          z: depth,
          r: (0.45 + p.r * 1.25) * scale,
          i,
        });
      }
      render.sort((a, b) => b.z - a.z);
      for (const p of render) {
        const seed = points[p.i];
        const alpha = 0.33 + seed.r * 0.65;
        ctx!.fillStyle =
          seed.r > 0.88
            ? `rgba(255,207,153,${alpha})`
            : `rgba(169,222,255,${alpha})`;
        if (seed.r > 0.975) {
          ctx!.shadowColor = "#a5ddff";
          ctx!.shadowBlur = 12;
        } else ctx!.shadowBlur = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;
    }
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
    };
  }, []);
  function choose(next: Form) {
    motion.current.form = next;
    setForm(next);
  }
  return (
    <section
      className="flow-opening"
      aria-label="Interactive aerospace introduction"
    >
      <div className="flow-overline">
        REGHURAM KESAVAN <span>ENGINEERING · CURIOSITY · MOTION</span>
      </div>
      <div className="flow-stage">
        <canvas
          ref={canvas}
          tabIndex={0}
          role="img"
          aria-label="Aerospace particle sculpture. Drag to rotate, or use arrow keys."
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            e.currentTarget.dataset.drag = "yes";
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.dataset.drag === "yes") {
              motion.current.yaw += e.movementX * 0.006;
              motion.current.pitch = Math.max(
                -1.3,
                Math.min(1.3, motion.current.pitch + e.movementY * 0.006),
              );
            }
          }}
          onPointerUp={(e) => {
            e.currentTarget.dataset.drag = "no";
            e.currentTarget.releasePointerCapture(e.pointerId);
          }}
          onPointerCancel={(e) => {
            e.currentTarget.dataset.drag = "no";
          }}
          onKeyDown={(e) => {
            if (
              ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                e.key,
              )
            ) {
              e.preventDefault();
              motion.current.yaw +=
                e.key === "ArrowLeft"
                  ? -0.12
                  : e.key === "ArrowRight"
                    ? 0.12
                    : 0;
              motion.current.pitch +=
                e.key === "ArrowUp" ? -0.12 : e.key === "ArrowDown" ? 0.12 : 0;
            }
          }}
        />
        <h1>
          <span>Reghuram</span>
          <span>Kesavan.</span>
        </h1>
        <div className="flow-subtitle">
          <p>
            {language === "fr"
              ? "L’aérospatiale, sous un autre angle."
              : language === "de"
                ? "Luft- und Raumfahrt. Anders betrachtet."
                : "Aerospace, from another perspective."}
          </p>
          <small>DRAG TO ROTATE · ARROW KEYS TO EXPLORE</small>
        </div>
      </div>
      <div className="flow-controls">
        <div aria-label="Choose sculpture geometry">
          {(["wing", "fan", "wake"] as Form[]).map((f) => (
            <button key={f} aria-pressed={form === f} onClick={() => choose(f)}>
              {f === "wing"
                ? "01 / Wing"
                : f === "fan"
                  ? "02 / Fan"
                  : "03 / Wake"}
            </button>
          ))}
        </div>
        <div>
          <button
            aria-label={
              paused ? "Play sculpture animation" : "Pause sculpture animation"
            }
            onClick={() => {
              motion.current.paused = !paused;
              setPaused(!paused);
            }}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button
            aria-label="Reset sculpture view"
            onClick={() => {
              motion.current.yaw = -0.25;
              motion.current.pitch = 0.38;
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <div className="flow-foot">
        <span>Generative geometry · an artistic interpretation</span>
        <a href="#the-person">
          Meet the engineer <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}
