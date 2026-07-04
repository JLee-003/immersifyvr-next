"use client";

import { useRef, useState } from "react";
import styles from "./servicesVideoHero.module.css";

const DEMO_VIDEO_SRC = "/video/demo.mp4";

function VolumeOnIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export default function ServicesVideoHero() {
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(true);

  function applyVolume(nextVolume) {
    const video = videoRef.current;
    if (!video) return;

    const clamped = Math.min(1, Math.max(0, nextVolume));
    video.volume = clamped;
    setVolume(clamped);

    if (clamped === 0) {
      video.muted = true;
      setMuted(true);
      return;
    }

    video.muted = false;
    setMuted(false);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    if (muted || volume === 0) {
      const restore = volume > 0 ? volume : 0.7;
      applyVolume(restore);
      return;
    }

    video.muted = true;
    setMuted(true);
  }

  function handleVolumeChange(event) {
    applyVolume(Number(event.target.value));
  }

  const sliderValue = muted ? 0 : volume;

  return (
    <section className={styles.videoHero} aria-label="ImmersifyVR demo video">
      <video
        ref={videoRef}
        className={styles.videoHeroVideo}
        src={DEMO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="ImmersifyVR demo video"
      />
      <div className={styles.volumeControl}>
        <button
          type="button"
          className={styles.volumeButton}
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          aria-pressed={!muted}
        >
          {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </button>
        <div className={styles.volumeSliderLabel}>
          <input
            type="range"
            className={styles.volumeSlider}
            min="0"
            max="1"
            step="0.01"
            value={sliderValue}
            onChange={handleVolumeChange}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderValue * 100)}
            aria-label="Video volume"
          />
        </div>
      </div>
    </section>
  );
}
