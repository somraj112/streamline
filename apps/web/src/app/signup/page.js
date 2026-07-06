"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, UserIcon, StreamlineLogo } from "../../components/icons";
import { AnimatedWaveform, MiniWaveform, BitrateGraph, ConnectorLines } from "../../components/visual-elements";
import "../../components/auth-shared.css";
import "./signup.css";
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

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
    },
  });

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

      {/* ── Signup Card ── */}
      <motion.div
        className="signup-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        {...fadeUp(0.15)}
      >
        <div className="signup-card__interactive-border" />
        <div className="signup-card__shine" />
        <div className="signup-card__sheen" />

        {/* Logo */}
        <div className="signup-logo">
          <StreamlineLogo className="signup-logo__icon" />
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
      </motion.div>
    </div>
  );
}