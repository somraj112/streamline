"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "./signup.css";

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
function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

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
    <svg className="signup-logo__icon" viewBox="0 0 32 32" fill="none">
      <path d="M11 7.5v17l13-8.5-13-8.5z" fill="currentColor" opacity="0.9" />
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
        scx = r.right - page.left;
        scy = r.top - page.top + r.height / 2;
      } else {
        scx = r.left - page.left;
        scy = r.top - page.top + r.height / 2;
      }

      // Ends at exact left/right border edge of signup card
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

      {paths.map((p, i) => {
        if (!p) return null;
        return (
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
            {p.corners && p.corners.map((c, ci) => {
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
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Main Signup Page Component
   ═══════════════════════════════════════════════ */
export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [touched, setTouched] = useState({});
  const [mounted, setMounted] = useState(false);

  const nameError = !name.trim() ? "Full name is required" : name.trim().length < 2 ? "Name must be at least 2 characters" : null;
  const emailError = !email.trim() ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Enter a valid email address" : null;
  const passwordError = !password ? "Password is required" : password.length < 8 ? "Password must be at least 8 characters" : !/[A-Z]/.test(password) ? "Password must contain an uppercase letter" : !/[a-z]/.test(password) ? "Password must contain a lowercase letter" : !/[0-9]/.test(password) ? "Password must contain a number" : null;
  const confirmError = !confirmPassword ? "Please confirm your password" : confirmPassword !== password ? "Passwords do not match" : null;
  const isFormValid = name.trim() && !nameError && email.trim() && !emailError && password && !passwordError && confirmPassword && !confirmError && agreeTerms;

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
    setTouched({ name: true, email: true, password: true, confirm: true });
  };

  if (!mounted) {
    return <div className="signup-page" />;
  }

  return (
    <div className="signup-page" ref={pageRef}>
      {/* ── Background Canvas ── */}
      <div className="signup-bg-canvas">
        <div className="bg-line bg-line--1" />
        <div className="bg-line bg-line--2" />
        <div className="bg-line bg-line--3" />
        <div className="bg-line bg-line--4" />
        <div className="bg-line bg-line--5" />
        <div className="bg-line bg-line--6" />

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
      <div className="status-card status-card--tl">
        <div className="status-card__header">
          <span className="status-card__live-dot" />
          <span>LIVE</span>
        </div>
        <div className="status-card__value">3.2K</div>
        <div className="status-card__meta">watching now</div>
      </div>

      {/* Top Right — Stream Quality */}
      <div className="status-card status-card--tr">
        <div className="status-card__header">Stream Quality</div>
        <div className="status-card__quality-row">
          <span className="status-card__quality-main">1080p</span>
          <span className="status-card__quality-sub">60 FPS</span>
        </div>
      </div>

      {/* Bottom Left — Audio Levels */}
      <div className="status-card status-card--bl">
        <div className="status-card__header">Audio Levels</div>
        <MiniWaveform />
      </div>

      {/* Bottom Right — Network */}
      <div className="status-card status-card--br">
        <div className="status-card__header">
          <span className="status-card__network-dot" />
          <span>Network</span>
        </div>
        <div className="status-card__value" style={{ fontSize: 14 }}>
          Excellent
        </div>
        <div className="status-card__meta">18 ms latency</div>
      </div>

      {/* ── Signup Card ── */}
      <div
        className="signup-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
      >
        <div className="signup-card__interactive-border" />
        <div className="signup-card__shine" />
        <div className="signup-card__sheen" />

        {/* Logo */}
        <div className="signup-logo">
          <StreamlineLogo />
          <span className="signup-logo__text">Streamline</span>
        </div>

        {/* Heading */}
        <div className="signup-heading">
          <h1 className="signup-heading__title">Create Account</h1>
          <p className="signup-heading__subtitle">
            Sign up to get started.
          </p>
        </div>

        {/* Form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="signup-name">
              Full Name
            </label>
            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <UserIcon />
              </span>
              <input
                id="signup-name"
                className="input-group__input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="John Doe"
                autoComplete="name"
              />
            </div>
            {touched.name && nameError && <span className="input-group__warning">{nameError}</span>}
          </div>

          {/* Email */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="signup-email">
              Email
            </label>
            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <MailIcon />
              </span>
              <input
                id="signup-email"
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
            <label className="input-group__label" htmlFor="signup-password">
              Password
            </label>
            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <LockIcon />
              </span>
              <input
                id="signup-password"
                className="input-group__input input-group__input--password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder="Create password"
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="signup-confirm">
              Confirm Password
            </label>
            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <LockIcon />
              </span>
              <input
                id="signup-confirm"
                className="input-group__input input-group__input--password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur("confirm")}
                placeholder="Confirm password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-group__toggle"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {touched.confirm && confirmError && <span className="input-group__warning">{confirmError}</span>}
          </div>

          {/* Agreement Checkbox */}
          <label className="signup-agree" htmlFor="signup-agree-check">
            <input
              id="signup-agree-check"
              className="signup-agree__checkbox"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span className="signup-agree__text">
              I agree to the{" "}
              <a href="#" className="signup-agree__link">
                Terms & Privacy Policy
              </a>
            </span>
          </label>

          {/* Submit */}
          <button type="submit" className="signup-button" disabled={!isFormValid}>
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <p className="signup-signin">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}