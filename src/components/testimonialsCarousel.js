"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./testimonialsCarousel.module.css";

const TESTIMONIALS = [
  {
    name: "Ms. Gloria",
    role: "Senior Tester",
    image: "/img/testimonials/gloria.avif",
    quote:
      "It would help us to go see things that are not possible anymore since we can't travel, we are limited in mobility. We wanna go see, and we can actually use these and actually place yourself there, and be on the boat. And see things that you wouldn't otherwise.",
  },
  {
    name: "Ed Loeswick",
    role: "Personal Trainer",
    image: "/img/testimonials/ed1.avif",
    quote:
      "You got something those older adults really want. Conceptually, it's a great idea. And in terms of people liking to use it? Off the charts.",
  },
  {
    name: "Bob (Chateau Cupertino)",
    role: "Senior Tester",
    image: "/img/testimonials/bob.avif",
    quote:
      "In the afternoon I get really lonely and bored, because just the tablet is not enough. I think this virtual reality thing would make it more fun. (paraphrased)",
  },
  {
    name: "Jack (Coastside Seniors)",
    role: "Senior Tester",
    image: "/img/testimonials/jack.avif",
    quote:
      "When you get a job, you become serious. When you become a grandparent, you get even more serious. But once you retire, like I'm retired now, you learn to be a kid again. You learn to play again.",
  },
];

const TESTIMONIAL_COUNT = TESTIMONIALS.length;
const LOOP_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS];

function getInitials(name) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ item }) {
  return (
    <article className={styles.testimonialCard}>
      <div className={styles.testimonialCardAvatar}>
        {item.image ? (
          <Image src={item.image} alt={item.name} width={88} height={88} />
        ) : (
          <span className={styles.avatarInitials} aria-hidden="true">
            {item.initials || getInitials(item.name)}
          </span>
        )}
      </div>
      <div className={styles.testimonialCardMeta}>
        <div className={styles.testimonialName}>{item.name}</div>
        <div className={styles.testimonialRole}>{item.role}</div>
      </div>
      <p className={styles.testimonialText}>&ldquo;{item.quote}&rdquo;</p>
    </article>
  );
}

export default function TestimonialsCarousel() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [noTransition, setNoTransition] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      const card = track.querySelector(`.${styles.testimonialCard}`);
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      setStep(card.offsetWidth + gap);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    measure();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (index !== TESTIMONIAL_COUNT) return;

    const track = trackRef.current;
    if (!track) return;

    function onTransitionEnd(event) {
      if (event.target !== track || event.propertyName !== "transform") return;

      setNoTransition(true);
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false));
      });
    }

    track.addEventListener("transitionend", onTransitionEnd);
    return () => track.removeEventListener("transitionend", onTransitionEnd);
  }, [index]);

  function goNext() {
    setNoTransition(false);
    setIndex((current) =>
      current >= TESTIMONIAL_COUNT - 1 ? TESTIMONIAL_COUNT : current + 1
    );
  }

  function goPrev() {
    if (index === 0) {
      setNoTransition(true);
      setIndex(TESTIMONIAL_COUNT);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setNoTransition(false);
          setIndex(TESTIMONIAL_COUNT - 1);
        });
      });
      return;
    }

    setNoTransition(false);
    setIndex((current) => current - 1);
  }

  return (
    <div className={styles.carousel}>
      <button
        type="button"
        className={styles.arrow}
        onClick={goPrev}
        aria-label="Previous testimonials"
      >
        ‹
      </button>

      <div ref={viewportRef} className={styles.viewport}>
        <div
          ref={trackRef}
          className={`${styles.track} ${noTransition ? styles.trackNoTransition : ""}`}
          style={{ transform: `translate3d(-${index * step}px, 0, 0)` }}
        >
          {LOOP_ITEMS.map((item, itemIndex) => (
            <TestimonialCard key={`${item.name}-${itemIndex}`} item={item} />
          ))}
        </div>
      </div>

      <button
        type="button"
        className={styles.arrow}
        onClick={goNext}
        aria-label="Next testimonials"
      >
        ›
      </button>
    </div>
  );
}
