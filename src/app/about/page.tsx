"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

// ─── Pillar hover zones ──────────────────────────────────────────────────────
// Positions expressed as percentages of the artwork image (1024 × 1456 px).
// Each zone sits over the corresponding pillar card in the artwork.
const pillars = [
  { key: "competitive", glow: "#00d2ff",  left: "3.5%",  width: "17%", top: "60.5%", height: "12.5%" },
  { key: "collect",     glow: "#ff2bd6",  left: "21.5%", width: "17%", top: "60.5%", height: "12.5%" },
  { key: "skill",       glow: "#ff7a00",  left: "39.5%", width: "17%", top: "60.5%", height: "12.5%" },
  { key: "explore",     glow: "#7cff00",  left: "57.5%", width: "17%", top: "60.5%", height: "12.5%" },
  { key: "community",   glow: "#ff4f73",  left: "75.5%", width: "20%", top: "60.5%", height: "12.5%" },
];

// ─── World panel hover zones ─────────────────────────────────────────────────
const worlds = [
  { key: "world-1", left: "31%", width: "14%", top: "76%", height: "11%" },
  { key: "world-2", left: "45%", width: "14%", top: "76%", height: "11%" },
  { key: "world-3", left: "59%", width: "14%", top: "76%", height: "11%" },
  { key: "world-4", left: "73%", width: "14%", top: "76%", height: "11%" },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* ── Artwork — the page itself ── */}
      <div className={styles.artworkRoot}>
        <Image
          src="/aboutus_clean.png"
          alt="ZUNO About"
          width={1024}
          height={1456}
          priority
          className={styles.artwork}
          sizes="100vw"
        />

        {/* ── Ambient layer ── */}
        <div className={styles.ambient} aria-hidden="true">
          <span className={styles.particle} style={{ top: "8%",  left: "12%", animationDelay: "0s" }} />
          <span className={styles.particle} style={{ top: "22%", left: "72%", animationDelay: "-3.2s" }} />
          <span className={styles.particle} style={{ top: "42%", left: "38%", animationDelay: "-6.1s" }} />
          <span className={styles.particle} style={{ top: "58%", left: "85%", animationDelay: "-1.7s" }} />
          <span className={styles.particle} style={{ top: "80%", left: "22%", animationDelay: "-4.9s" }} />
          <span className={styles.sweep} />
        </div>

        {/* ── Button hotspots ── */}

        {/* "Our Story" — bottom-left of hero section */}
        <button
          type="button"
          className={styles.hotspot}
          style={{ top: "22.5%", left: "4%", width: "16%", height: "3%" }}
          onClick={() => {
            document.getElementById("story-anchor")?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label="Our Story"
        />

        {/* Scroll anchor for story section */}
        <div id="story-anchor" className={styles.scrollAnchor} style={{ top: "28%" }} />

        {/* "Discover The World" */}
        <Link
          href="#universe-anchor"
          className={styles.hotspot}
          style={{ top: "54.5%", left: "36%", width: "24%", height: "3%" }}
          aria-label="Discover The World"
        />

        <div id="universe-anchor" className={styles.scrollAnchor} style={{ top: "73%" }} />

        {/* "Explore Worlds" */}
        <Link
          href="/levels"
          className={styles.hotspot}
          style={{ top: "86.5%", left: "4%", width: "18%", height: "3%" }}
          aria-label="Explore Worlds"
        />

        {/* "All Heroes →" */}
        <Link
          href="/heroes"
          className={styles.hotspot}
          style={{ top: "89%", left: "76%", width: "21%", height: "2.5%" }}
          aria-label="All Heroes"
        />

        {/* "Play ZUNO Now" */}
        <Link
          href="/"
          className={styles.hotspot}
          style={{ top: "97.5%", left: "28%", width: "44%", height: "3%" }}
          aria-label="Play ZUNO Now"
        />

        {/* ── Pillar hover glows ── */}
        {pillars.map((p) => (
          <div
            key={p.key}
            className={styles.pillarZone}
            style={{
              top: p.top,
              left: p.left,
              width: p.width,
              height: p.height,
              ["--pglow" as string]: p.glow,
            }}
            aria-hidden="true"
          />
        ))}

        {/* ── World panel hover glows ── */}
        {worlds.map((w) => (
          <div
            key={w.key}
            className={styles.worldZone}
            style={{ top: w.top, left: w.left, width: w.width, height: w.height }}
            aria-hidden="true"
          />
        ))}

        {/* ── Hero hotspots (invisible) — over baked artwork cards ── */}
        {/* Jean */}
        <button
          type="button"
          className={styles.heroHotspot}
          style={{ top: "89.2%", left: "4%", width: "15%", height: "7.8%" }}
          onClick={() => {
            /* TODO: open hero modal for Jean */
          }}
          aria-label="Jean"
        />

        {/* Marjorie */}
        <button
          type="button"
          className={styles.heroHotspot}
          style={{ top: "89.2%", left: "20.2%", width: "15%", height: "7.8%" }}
          onClick={() => {
            /* TODO: open hero modal for Marjorie */
          }}
          aria-label="Marjorie"
        />

        {/* Kael */}
        <button
          type="button"
          className={styles.heroHotspot}
          style={{ top: "89.2%", left: "36.4%", width: "15%", height: "7.8%" }}
          onClick={() => {
            /* TODO: open hero modal for Kael */
          }}
          aria-label="Kael"
        />

        {/* Pando */}
        <button
          type="button"
          className={styles.heroHotspot}
          style={{ top: "89.2%", left: "52.6%", width: "15%", height: "7.8%" }}
          onClick={() => {
            /* TODO: open hero modal for Pando */
          }}
          aria-label="Pando"
        />

        {/* Aelis */}
        <button
          type="button"
          className={styles.heroHotspot}
          style={{ top: "89.2%", left: "68.8%", width: "15%", height: "7.8%" }}
          onClick={() => {
            /* TODO: open hero modal for Aelis */
          }}
          aria-label="Aelis"
        />
      </div>
    </main>
  );
}
