"use client";

import { useState, useEffect, useCallback, useMemo, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import styles from "./heroSlideshow.module.css";

const AUTO_PLAY_MS = 4000;
const TRANSITION_MS = 1200;
const MANUAL_NAV_COOLDOWN_MS = 1500;

function normalizeImages(images) {
  return images.map((image) =>
    typeof image === "string" ? { src: image } : image
  );
}

export default function HeroSlideshow({ images, altText = "ImmersifyVR showcase" }) {
  const slides = useMemo(() => normalizeImages(images), [images]);
  const isInfinite = slides.length > 1;

  const extendedSlides = useMemo(() => {
    if (!isInfinite) return slides;
    return [slides[slides.length - 1], ...slides, slides[0]];
  }, [slides, isInfinite]);

  const [positionIndex, setPositionIndex] = useState(isInfinite ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [manualNavLocked, setManualNavLocked] = useState(false);
  const [autoPlayResetKey, setAutoPlayResetKey] = useState(0);
  const positionRef = useRef(positionIndex);
  const resetTimerRef = useRef(null);
  const manualNavTimerRef = useRef(null);

  positionRef.current = positionIndex;

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const jumpToRealSlide = useCallback(
    (targetIndex) => {
      clearResetTimer();
      setTransitionEnabled(false);
      setPositionIndex(targetIndex);
    },
    [clearResetTimer]
  );

  const scheduleCloneReset = useCallback(() => {
    clearResetTimer();
    resetTimerRef.current = window.setTimeout(() => {
      resetTimerRef.current = null;
      const current = positionRef.current;
      const lastCloneIndex = extendedSlides.length - 1;

      if (current === lastCloneIndex) {
        jumpToRealSlide(1);
      } else if (current === 0) {
        jumpToRealSlide(slides.length);
      }
    }, TRANSITION_MS);
  }, [clearResetTimer, extendedSlides.length, jumpToRealSlide, slides.length]);

  const goToPrevious = useCallback(() => {
    if (!isInfinite) return;
    setPositionIndex((prev) => (prev <= 0 ? prev : prev - 1));
  }, [isInfinite]);

  const goToNext = useCallback(() => {
    if (!isInfinite) return;
    setPositionIndex((prev) => {
      const lastCloneIndex = extendedSlides.length - 1;
      return prev >= lastCloneIndex ? prev : prev + 1;
    });
  }, [extendedSlides.length, isInfinite]);

  const lockManualNav = useCallback(() => {
    setManualNavLocked(true);
    if (manualNavTimerRef.current !== null) {
      window.clearTimeout(manualNavTimerRef.current);
    }
    manualNavTimerRef.current = window.setTimeout(() => {
      manualNavTimerRef.current = null;
      setManualNavLocked(false);
    }, MANUAL_NAV_COOLDOWN_MS);
  }, []);

  const resetAutoPlayTimer = useCallback(() => {
    setAutoPlayResetKey((key) => key + 1);
  }, []);

  const handleManualPrevious = () => {
    if (manualNavLocked) return;
    goToPrevious();
    lockManualNav();
    resetAutoPlayTimer();
  };

  const handleManualNext = () => {
    if (manualNavLocked) return;
    goToNext();
    lockManualNav();
    resetAutoPlayTimer();
  };

  useEffect(() => {
    if (!isInfinite || !transitionEnabled) return;

    const lastCloneIndex = extendedSlides.length - 1;
    if (positionIndex !== lastCloneIndex && positionIndex !== 0) return;

    scheduleCloneReset();
  }, [positionIndex, transitionEnabled, extendedSlides.length, isInfinite, scheduleCloneReset]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !isInfinite) return;

    let intervalId = null;

    const stopAutoPlay = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const startAutoPlay = () => {
      stopAutoPlay();
      intervalId = window.setInterval(goToNext, AUTO_PLAY_MS);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoPlay();
        clearResetTimer();
      } else {
        startAutoPlay();
      }
    };

    if (!document.hidden) {
      startAutoPlay();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAutoPlay();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [goToNext, isInfinite, clearResetTimer, autoPlayResetKey]);

  useEffect(() => () => {
    clearResetTimer();
    if (manualNavTimerRef.current !== null) {
      window.clearTimeout(manualNavTimerRef.current);
    }
  }, [clearResetTimer]);

  useLayoutEffect(() => {
    if (!transitionEnabled) {
      const frameId = requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [transitionEnabled, positionIndex]);

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") {
      return;
    }
    if (!isInfinite) return;

    clearResetTimer();
    const current = positionRef.current;
    const lastCloneIndex = extendedSlides.length - 1;

    if (current === lastCloneIndex) {
      jumpToRealSlide(1);
    } else if (current === 0) {
      jumpToRealSlide(slides.length);
    }
  };

  return (
    <div className={styles.slideshow}>
      {isInfinite && (
        <button
          type="button"
          className={styles.arrow}
          onClick={handleManualPrevious}
          disabled={manualNavLocked}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}
      <div className={styles.sliderContainer}>
        <div
          className={`${styles.slider} ${transitionEnabled ? "" : styles.noTransition}`}
          style={{ transform: `translate3d(-${positionIndex * 100}%, 0, 0)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, index) => (
            <div key={`${slide.src}-${index}`} className={styles.slide}>
              <Image
                src={slide.src}
                alt={index === positionIndex ? altText : ""}
                fill
                priority={index === 1 || (!isInfinite && index === 0)}
                className={styles.image}
                style={
                  slide.objectPosition
                    ? { objectPosition: slide.objectPosition }
                    : undefined
                }
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      {isInfinite && (
        <button
          type="button"
          className={styles.arrow}
          onClick={handleManualNext}
          disabled={manualNavLocked}
          aria-label="Next image"
        >
          ›
        </button>
      )}
    </div>
  );
}
