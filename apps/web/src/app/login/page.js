"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, StreamlineLogo } from "../../components/icons";
import { AnimatedWaveform, MiniWaveform, BitrateGraph, ConnectorLines } from "../../components/visual-elements";
import "../../components/auth-shared.css";
import "./login.css";

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
      <div className="login-bg-canvas">
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

        <AnimatedWaveform className="bg-waveform bg-waveform--1" width={160} height={30} />
        <AnimatedWaveform className="bg-waveform bg-waveform--2" width={120} height={24} />

        <BitrateGraph className="bg-bitrate bg-bitrate--1" width={80} height={28} />
        <BitrateGraph className="bg-bitrate bg-bitrate--2" width={70} height={24} />
      </div>

      <ConnectorLines pageRef={pageRef} cardRef={cardRef} />

      <motion.div className="status-card status-card--tl" {...fadeUp(0.5)}>
        <div className="status-card__header">
          <span className="status-card__live-dot" />
          <span>LIVE</span>
        </div>
        <div className="status-card__value">3.2K</div>
        <div className="status-card__meta">watching now</div>
      </motion.div>

      <motion.div className="status-card status-card--tr" {...fadeUp(0.7)}>
        <div className="status-card__header">Stream Quality</div>
        <div className="status-card__quality-row">
          <span className="status-card__quality-main">1080p</span>
          <span className="status-card__quality-sub">60 FPS</span>
        </div>
      </motion.div>

      <motion.div className="status-card status-card--bl" {...fadeUp(0.9)}>
        <div className="status-card__header">Audio Levels</div>
        <MiniWaveform />
      </motion.div>

      <motion.div className="status-card status-card--br" {...fadeUp(1.1)}>
        <div className="status-card__header">
          <span className="status-card__network-dot" />
          <span>Network</span>
        </div>
        <div className="status-card__value status-card__value--sm">Excellent</div>
        <div className="status-card__meta">18 ms latency</div>
      </motion.div>

      <motion.div
        className="login-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        {...fadeUp(0.15)}
      >
        <div className="login-card__interactive-border" />
        <div className="login-card__shine" />
        <div className="login-card__sheen" />

        <div className="login-logo">
          <StreamlineLogo className="login-logo__icon" />
          <span className="login-logo__text">Streamline</span>
        </div>

        <div className="login-heading">
          <h1 className="login-heading__title">Welcome Back</h1>
          <p className="login-heading__subtitle">Sign in to continue streaming.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-group__label" htmlFor="login-email">Email</label>
            <div className="input-group__wrapper">
              <span className="input-group__icon"><MailIcon /></span>
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

          <div className="input-group">
            <label className="input-group__label" htmlFor="login-password">Password</label>
            <div className="input-group__wrapper">
              <span className="input-group__icon"><LockIcon /></span>
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

          <div className="login-extras">
            <a href="#" className="login-extras__forgot">Forgot password?</a>
          </div>

          <button type="submit" className="login-button" disabled={!isFormValid}>
            Sign In
          </button>
        </form>

        <div className="login-divider">
          <div className="login-divider__line" />
          <span className="login-divider__text">or continue with</span>
          <div className="login-divider__line" />
        </div>

        <div className="login-socials">
          <button type="button" className="login-social-btn" id="login-google-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button type="button" className="login-social-btn" id="login-github-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.82 8.21 11.42.6.11.82-.26.82-.58v-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.24 1.85 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.56 21.82 24 17.31 24 12 24 5.37 18.63 0 12 0z" />
            </svg>
            GitHub
          </button>
        </div>

        <p className="login-signup">
          Don&apos;t have an account? <a href="/signup">Sign up</a>
        </p>
      </motion.div>
    </div>
  );
}
