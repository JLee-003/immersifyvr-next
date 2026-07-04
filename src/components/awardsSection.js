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

function AwardLogo({ logo, logoAlt }) {
  if (logo) {
    return (
      <div className={styles.awardLogo}>
        <Image
          src={logo}
          alt={logoAlt}
          fill
          sizes="(max-width: 768px) 160px, 200px"
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

function AwardCard({ award }) {
  const content = (
    <>
      <AwardLogo logo={award.logo} logoAlt={award.logoAlt} />
      <h3 className={styles.awardName}>{award.name}</h3>
    </>
  );

  if (award.certificate) {
    return (
      <a
        href={award.certificate}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.awardCard} ${styles.awardCardLink}`}
        aria-label={`${award.name} — view certificate`}
      >
        {content}
      </a>
    );
  }

  return <article className={styles.awardCard}>{content}</article>;
}

export default function AwardsSection() {
  return (
    <div className={styles.awardsGrid}>
      {AWARDS.map((award) => (
        <AwardCard key={award.name} award={award} />
      ))}
    </div>
  );
}
