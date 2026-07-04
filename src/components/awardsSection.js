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

function AwardCard({ award, featured = false, compact = false }) {
  const cardClass = [
    styles.awardCard,
    featured ? styles.awardCardFeatured : "",
    compact ? styles.awardCardCompact : "",
    award.certificate ? styles.awardCardLink : "",
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
        aria-label={`${award.name} — view certificate`}
      >
        {content}
      </a>
    );
  }

  return <article className={cardClass}>{content}</article>;
}

export default function AwardsSection() {
  const [featured, ...secondary] = AWARDS;

  return (
    <div className={styles.awardsLayout}>
      <AwardCard award={featured} featured />
      <div className={styles.awardsSecondary}>
        {secondary.map((award) => (
          <AwardCard key={award.name} award={award} compact />
        ))}
      </div>
    </div>
  );
}
