"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./awardsSection.module.css";

const AWARDS = [
  {
    name: "2025–2026 Conrad Innovator",
    logo: "/img/conradlogo.avif",
    logoAlt: "Conrad Innovator logo",
    certificate: "/img/conrad.pdf",
  },
  {
    name: "Future Impact Challenge 2025 1st Place",
    logo: "/img/ficlogo.avif",
    logoAlt: "Future Impact Challenge logo",
    certificate: "/img/fic.pdf",
  },
  {
    name: "1517 Grant — $1000",
    logo: "/img/1517logo.avif",
    logoAlt: "1517 Fund logo",
  },
];

function AwardLogo({ logo, logoAlt, featured = false }) {
  if (logo) {
    return (
      <div
        className={`${styles.awardLogo} ${featured ? styles.awardLogoFeatured : ""}`}
      >
        <Image
          src={logo}
          alt={logoAlt}
          fill
          sizes={
            featured
              ? "(max-width: 768px) 200px, 280px"
              : "(max-width: 768px) 120px, 160px"
          }
          className={styles.awardLogoImg}
        />
      </div>
    );
  }

  return (
    <div className={styles.awardLogoPlaceholder} aria-hidden="true">
      <span className={styles.awardLogoPlaceholderLabel}>Logo</span>
    </div>
  );
}

function AwardCard({
  award,
  featured = false,
  compact = false,
  visible = false,
  awardIndex,
}) {
  const cardClass = [
    styles.awardCard,
    styles.awardRevealCard,
    featured ? styles.awardCardFeatured : "",
    compact ? styles.awardCardCompact : "",
    award.certificate ? styles.awardCardLink : "",
    visible ? styles.awardVisible : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <AwardLogo logo={award.logo} logoAlt={award.logoAlt} featured={featured} />
      <h3 className={styles.awardName}>{award.name}</h3>
    </>
  );

  if (award.certificate) {
    return (
      <a
        href={award.certificate}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        data-award-index={awardIndex}
        aria-label={`${award.name} — view certificate`}
      >
        {content}
      </a>
    );
  }

  return (
    <article className={cardClass} data-award-index={awardIndex}>
      {content}
    </article>
  );
}

export default function AwardsSection() {
  const sectionRef = useRef(null);
  const [visibleAwards, setVisibleAwards] = useState(() => new Set());
  const [featured, ...secondary] = AWARDS;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-award-index]");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.dataset.awardIndex);
          setVisibleAwards((prev) => {
            if (prev.has(index)) return prev;
            const next = new Set(prev);
            next.add(index);
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={styles.awardsLayout}>
      <AwardCard
        award={featured}
        featured
        visible={visibleAwards.has(0)}
        awardIndex={0}
      />
      <div className={styles.awardsSecondary}>
        {secondary.map((award, index) => (
          <AwardCard
            key={award.name}
            award={award}
            compact
            visible={visibleAwards.has(index + 1)}
            awardIndex={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
