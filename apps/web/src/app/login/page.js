"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import "./login.css";

/* ─── Animated Waveform SVG (for background) ─── */
function AnimatedWaveform({ className, width = 160, height = 30 }) {
  const pathRef = useRef(null);

  useEffect(() => {
    let frame;
    let t = 0;
    const animate = () => {
      t += 0.02;
      const points = [];
      const segments = 20;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        const y =
          height / 2 +
          Math.sin(t + i * 0.4) * 6 +
          Math.sin(t * 1.3 + i * 0.7) * 3;
        points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      if (pathRef.current) {
        pathRef.current.setAttribute("d", points.join(" "));
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [width, height]);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path ref={pathRef} />
    </svg>
  );
}

/* ─── Mini Waveform (for audio card) ─── */
function MiniWaveform() {
  return (
    <div className="mini-waveform">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="mini-waveform__bar" />
      ))}
    </div>
  );
}

/* ─── Bitrate Graph SVG ─── */
function BitrateGraph({ className, width = 80, height = 28 }) {
  const bars = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3, 0.75, 0.55, 0.85];
  const barW = (width - bars.length * 2) / bars.length;

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
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

/* ─── SVG Icons ─── */
function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 6 10-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="3" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

/* ─── Streamline Logo ─── */
function StreamlineLogo() {
  return (
    <svg className="login-logo__icon" viewBox="0 0 32 32" fill="none">
      {/* Play triangle */}
      <path d="M11 7.5v17l13-8.5-13-8.5z" fill="currentColor" opacity="0.9" />
      {/* Waveform lines */}
      <path
        d="M5 16h3M24 12v8M27 14v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/* ─── Circuit-style SVG Connector Lines ─── */
function ConnectorLines({ cardRef, pageRef }) {
  const svgRef = useRef(null);
  const [paths, setPaths] = useState([]);

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

    const statusCards = pageRef.current.querySelectorAll(".status-card");
    const newPaths = [];

    statusCards.forEach((sc) => {
      const r = sc.getBoundingClientRect();
      const isLeft = (r.left + r.width / 2) < cardCX;
      const isTop = (r.top + r.height / 2) < cardCY;

      // Start path EXACTLY from the border edge of the corner card
      let scx, scy;
      if (isLeft) {
        // Starts at right edge of Left corner card
        scx = r.right - page.left;
        scy = r.top - page.top + r.height / 2;
      } else {
        // Starts at left edge of Right corner card
        scx = r.left - page.left;
        scy = r.top - page.top + r.height / 2;
      }

      // Ends at exact left/right border edge of login card
      let targetX, targetY;
      if (isLeft && isTop) {
        targetX = cx;
        targetY = cy + ch * 0.22;
      } else if (!isLeft && isTop) {
        targetX = cx + cw;
        targetY = cy + ch * 0.22;
      } else if (isLeft && !isTop) {
        targetX = cx;
        targetY = cy + ch * 0.78;
      } else {
        targetX = cx + cw;
        targetY = cy + ch * 0.78;
      }

      // 45-degree orthodiagonal trace calculation
      const dx_total = Math.abs(targetX - scx);
      const dy_total = Math.abs(targetY - scy);
      const h_span = (dx_total - dy_total) / 2;

      let d;
      let corners = [];

      if (isLeft) {
        const c1x = scx + h_span;
        const c1y = scy;
        const c2x = targetX - h_span;
        const c2y = targetY;

        d = `M ${scx} ${scy} L ${c1x} ${c1y} L ${c2x} ${c2y} L ${targetX} ${targetY}`;
        corners = [
          { x: scx, y: scy },
          { x: c1x, y: c1y },
          { x: c2x, y: c2y },
          { x: targetX, y: targetY },
        ];
      } else {
        const c1x = scx - h_span;
        const c1y = scy;
        const c2x = targetX + h_span;
        const c2y = targetY;

        d = `M ${scx} ${scy} L ${c1x} ${c1y} L ${c2x} ${c2y} L ${targetX} ${targetY}`;
        corners = [
          { x: scx, y: scy },
          { x: c1x, y: c1y },
          { x: c2x, y: c2y },
          { x: targetX, y: targetY },
        ];
      }

      newPaths.push({
        d,
        corners,
        startX: scx,
        startY: scy,
        endX: targetX,
        endY: targetY,
      });
    });

    setPaths(newPaths);
  }, [cardRef, pageRef]);

  useEffect(() => {
    const timer = setTimeout(computePaths, 300);
    window.addEventListener("resize", computePaths);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", computePaths);
    };
  }, [computePaths]);

  if (paths.length === 0) return null;

  const gradientIds = [
    "conn-grad-tl",
    "conn-grad-tr",
    "conn-grad-bl",
    "conn-grad-br",
  ];

  return (
    <svg ref={svgRef} className="connector-svg">
      <defs>
        {paths.map((p, i) => (
          <linearGradient
            key={gradientIds[i]}
            id={gradientIds[i]}
            x1={p.startX}
            y1={p.startY}
            x2={p.endX}
            y2={p.endY}
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
          <path
            className="connector-path"
            d={p.d}
            stroke={`url(#${gradientIds[i]})`}
          />
          <path
            className="connector-path-glow"
            d={p.d}
            stroke="#7C6CF8"
          />
          {p.corners.map((c, ci) => {
            const isTerminal = ci === 0 || ci === 3;
            return (
              <circle
                key={ci}
                className="connector-node"
                cx={c.x}
                cy={c.y}
                r={isTerminal ? 3.5 : 2}
                fill={isTerminal ? "#7C6CF8" : "none"}
                stroke="#7C6CF8"
                strokeWidth={1.2}
                opacity={isTerminal ? 0.9 : 0.7}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Main Login Page
   ═══════════════════════════════════════════════ */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [mounted, setMounted] = useState(false);

  const emailError = !email.trim() ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Enter a valid email address" : null;
  const passwordError = !password ? "Password is required" : password.length < 8 ? "Password must be at least 8 characters" : !/[A-Z]/.test(password) ? "Password must contain an uppercase letter" : !/[a-z]/.test(password) ? "Password must contain a lowercase letter" : !/[0-9]/.test(password) ? "Password must contain a number" : null;
  const isFormValid = email.trim() && !emailError && password && !passwordError;

  const pageRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
    },
  });

  if (!mounted) {
    return <div className="login-page" />;
  }

  return (
    <div className="login-page" ref={pageRef}>
      {/* ── Background Elements ── */}
      <div className="login-bg-canvas">
        {/* Connection lines */}
        <div className="bg-line bg-line--1" />
        <div className="bg-line bg-line--2" />
        <div className="bg-line bg-line--3" />
        <div className="bg-line bg-line--4" />
        <div className="bg-line bg-line--5" />
        <div className="bg-line bg-line--6" />

        {/* Glowing nodes */}
        <div className="bg-node bg-node--1" />
        <div className="bg-node bg-node--2" />
        <div className="bg-node bg-node--3" />
        <div className="bg-node bg-node--4" />
        <div className="bg-node bg-node--5" />
        <div className="bg-node bg-node--6" />
        <div className="bg-node bg-node--7" />
        <div className="bg-node bg-node--8" />
        <div className="bg-node bg-node--9" />
        <div className="bg-node bg-node--10" />
        <div className="bg-node bg-node--11" />
        <div className="bg-node bg-node--12" />

        {/* Waveform traces */}
        <AnimatedWaveform
          className="bg-waveform bg-waveform--1"
          width={160}
          height={30}
        />
        <AnimatedWaveform
          className="bg-waveform bg-waveform--2"
          width={120}
          height={24}
        />

        {/* Bitrate graphs */}
        <BitrateGraph
          className="bg-bitrate bg-bitrate--1"
          width={80}
          height={28}
        />
        <BitrateGraph
          className="bg-bitrate bg-bitrate--2"
          width={70}
          height={24}
        />
      </div>

      {/* ── Dynamic SVG Connectors ── */}
      <ConnectorLines pageRef={pageRef} cardRef={cardRef} />

      {/* ── Status Cards ── */}
      {/* Top Left — LIVE */}
      <motion.div
        className="status-card status-card--tl"
        {...fadeUp(0.5)}
      >
        <div className="status-card__header">
          <span className="status-card__live-dot" />
          <span>LIVE</span>
        </div>
        <div className="status-card__value">3.2K</div>
        <div className="status-card__meta">watching now</div>
      </motion.div>

      {/* Top Right — Stream Quality */}
      <motion.div
        className="status-card status-card--tr"
        {...fadeUp(0.7)}
      >
        <div className="status-card__header">Stream Quality</div>
        <div className="status-card__quality-row">
          <span className="status-card__quality-main">1080p</span>
          <span className="status-card__quality-sub">60 FPS</span>
        </div>
      </motion.div>

      {/* Bottom Left — Audio Levels */}
      <motion.div
        className="status-card status-card--bl"
        {...fadeUp(0.9)}
      >
        <div className="status-card__header">Audio Levels</div>
        <MiniWaveform />
      </motion.div>

      {/* Bottom Right — Network */}
      <motion.div
        className="status-card status-card--br"
        {...fadeUp(1.1)}
      >
        <div className="status-card__header">
          <span className="status-card__network-dot" />
          <span>Network</span>
        </div>
        <div className="status-card__value" style={{ fontSize: 14 }}>
          Excellent
        </div>
        <div className="status-card__meta">18 ms latency</div>
      </motion.div>

      {/* ── Login Card ── */}
      <motion.div
        className="login-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        {...fadeUp(0.15)}
      >
        {/* Dynamic interactive elements inside the card */}
        <div className="login-card__interactive-border" />
        <div className="login-card__shine" />
        <div className="login-card__sheen" />

        {/* Logo */}
        <div className="login-logo">
          <StreamlineLogo />
          <span className="login-logo__text">Streamline</span>
        </div>

        {/* Heading */}
        <div className="login-heading">
          <h1 className="login-heading__title">Welcome Back</h1>
          <p className="login-heading__subtitle">
            Sign in to continue streaming.
          </p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="login-email">
              Email
            </label>
            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <MailIcon />
              </span>
              <input
                id="login-email"
                className="input-group__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            {touched.email && emailError && <span className="input-group__warning">{emailError}</span>}
          </div>

          {/* Password */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="login-password">
              Password
            </label>
            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <LockIcon />
              </span>
              <input
                id="login-password"
                className="input-group__input input-group__input--password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-group__toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {touched.password && passwordError && <span className="input-group__warning">{passwordError}</span>}
          </div>

          {/* Extras */}
          <div className="login-extras">
            <a href="#" className="login-extras__forgot">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button type="submit" className="login-button" disabled={!isFormValid}>
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider" style={{ margin: "24px 0" }}>
          <div className="login-divider__line" />
          <span className="login-divider__text">or continue with</span>
          <div className="login-divider__line" />
        </div>

        {/* Social */}
        <div className="login-socials">
          <button
            type="button"
            className="login-social-btn"
            id="login-google-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="login-social-btn"
            id="login-github-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.82 8.21 11.42.6.11.82-.26.82-.58v-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.24 1.85 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.56 21.82 24 17.31 24 12 24 5.37 18.63 0 12 0z" />
            </svg>
            GitHub
          </button>
        </div>

        {/* Sign up */}
        <p className="login-signup">
          Don&apos;t have an account? <a href="/signup">Sign up</a>
        </p>
      </motion.div>
    </div>
  );
}
