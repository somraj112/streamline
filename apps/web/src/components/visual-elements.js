"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function AnimatedWaveform({ className, width = 160, height = 30 }) {
  const pathRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const segments = 20;
    const step = width / segments;
    const halfH = height / 2;
    let t = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      t += 0.02;
      let d = "";
      for (let i = 0; i <= segments; i++) {
        const y = halfH + Math.sin(t + i * 0.4) * 6 + Math.sin(t * 1.3 + i * 0.7) * 3;
        d += `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)} ${y.toFixed(1)}`;
      }
      if (pathRef.current) pathRef.current.setAttribute("d", d);
      frameRef.current = requestAnimationFrame(tick);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frameRef.current);
      } else {
        running = true;
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [width, height]);

  return (
    <svg className={className} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path ref={pathRef} />
    </svg>
  );
}

export function MiniWaveform() {
  return (
    <div className="mini-waveform">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="mini-waveform__bar" />
      ))}
    </div>
  );
}

export function BitrateGraph({ className, width = 80, height = 28 }) {
  const bars = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3, 0.75, 0.55, 0.85];
  const barW = (width - bars.length * 2) / bars.length;

  return (
    <svg className={className} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * (barW + 2)}
          y={height - h * height}
          width={barW}
          height={h * height}
          rx={1}
        />
      ))}
    </svg>
  );
}

export function ConnectorLines({ cardRef, pageRef }) {
  const [paths, setPaths] = useState([]);
  const rafRef = useRef(null);
  const cardCacheRef = useRef(null);

  const computePaths = useCallback(() => {
    if (!pageRef.current || !cardRef.current) return;
    const page = pageRef.current.getBoundingClientRect();
    const card = cardRef.current.getBoundingClientRect();

    const cx = card.left - page.left;
    const cy = card.top - page.top;
    const cw = card.width;
    const ch = card.height;
    const cardCX = cx + cw / 2;
    const cardCY = cy + ch / 2;

    const cards = cardCacheRef.current ||
      (cardCacheRef.current = pageRef.current.querySelectorAll(".status-card"));
    const len = cards.length;
    const newPaths = new Array(len);

    for (let i = 0; i < len; i++) {
      const sc = cards[i];
      const r = sc.getBoundingClientRect();
      const isLeft = r.left + r.width / 2 < cardCX;
      const isTop = r.top + r.height / 2 < cardCY;

      const scx = isLeft ? r.right - page.left : r.left - page.left;
      const scy = r.top - page.top + r.height / 2;

      let targetX = isLeft ? cx : cx + cw;
      let targetY = isTop ? cy + ch * 0.22 : cy + ch * 0.78;

      const dx = Math.abs(targetX - scx);
      const dy = Math.abs(targetY - scy);
      const halfSpan = (dx - dy) / 2;

      const c1x = isLeft ? scx + halfSpan : scx - halfSpan;
      const c1y = scy;
      const c2x = isLeft ? targetX - halfSpan : targetX + halfSpan;
      const c2y = targetY;

      const d = `M${scx} ${scy}L${c1x} ${c1y}L${c2x} ${c2y}L${targetX} ${targetY}`;
      const corners = [
        { x: scx, y: scy },
        { x: c1x, y: c1y },
        { x: c2x, y: c2y },
        { x: targetX, y: targetY },
      ];

      newPaths[i] = { d, corners, startX: scx, startY: scy, endX: targetX, endY: targetY };
    }

    setPaths(newPaths);
  }, [cardRef, pageRef]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(computePaths);
    const onResize = () => {
      cardCacheRef.current = null;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computePaths);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [computePaths]);

  if (paths.length === 0) return null;

  const gradientIds = ["conn-grad-tl", "conn-grad-tr", "conn-grad-bl", "conn-grad-br"];

  return (
    <svg className="connector-svg">
      <defs>
        {paths.map((p, i) => (
          <linearGradient
            key={gradientIds[i]}
            id={gradientIds[i]}
            x1={p.startX} y1={p.startY} x2={p.endX} y2={p.endY}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#7C6CF8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#7C6CF8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7C6CF8" stopOpacity="0.4" />
          </linearGradient>
        ))}
      </defs>
      {paths.map((p, i) => (
        <g key={i}>
          <path className="connector-path" d={p.d} stroke={`url(#${gradientIds[i]})`} />
          <path className="connector-path-glow" d={p.d} stroke="#7C6CF8" />
          {p.corners.map((c, ci) => (
            <circle
              key={ci}
              className="connector-node"
              cx={c.x} cy={c.y}
              r={ci === 0 || ci === 3 ? 3.5 : 2}
              fill={ci === 0 || ci === 3 ? "#7C6CF8" : "none"}
              stroke="#7C6CF8" strokeWidth={1.2}
              opacity={ci === 0 || ci === 3 ? 0.9 : 0.7}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
