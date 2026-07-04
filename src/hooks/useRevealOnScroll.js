"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const OBSERVER_OPTIONS = {
  threshold: 0.12,
  rootMargin: "0px 0px -4% 0px",
};

function getRevealTargets(section) {
  const targets = new Set();

  if (section.dataset.revealIndex !== undefined) {
    targets.add(section);
  }

  section.querySelectorAll("[data-reveal-index]").forEach((element) => {
    targets.add(element);
  });

  return [...targets];
}

export function useRevealOnScroll() {
  const sectionRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(() => new Set());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = getRevealTargets(section);
    if (!cards.length) return;

    const markVisible = (index) => {
      setVisibleItems((prev) => {
        if (prev.has(index)) return prev;
        const next = new Set(prev);
        next.add(index);
        return next;
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const index = Number(entry.target.dataset.revealIndex);
        markVisible(index);
        observer.unobserve(entry.target);
      });
    }, OBSERVER_OPTIONS);

    const frame = requestAnimationFrame(() => {
      cards.forEach((card) => observer.observe(card));
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const isVisible = useCallback(
    (index) => visibleItems.has(index),
    [visibleItems]
  );

  return { sectionRef, isVisible };
}
