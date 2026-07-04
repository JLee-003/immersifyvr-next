"use client";

import styles from "./profileGallery.module.css";
import reveal from "@/styles/revealAnimation.module.css";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import Image from "next/image";
import { useState } from "react";

export default function ProfileGallery({ profiles, revealOnScroll = false }) {
  const [openCards, setOpenCards] = useState({});
  const { sectionRef, isVisible } = useRevealOnScroll();

  const toggleCard = (index) => {
    setOpenCards((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  return (
    <div
      ref={revealOnScroll ? sectionRef : undefined}
      className={styles.gallery}
    >
      {profiles.map((profile, index) => (
        <div
          key={index}
          className={`${styles.profileCard} ${revealOnScroll ? reveal.revealCard : ""} ${revealOnScroll && isVisible(index) ? reveal.revealVisible : ""}`}
          data-reveal-index={revealOnScroll ? index : undefined}
        >
          <div
            className={`${styles.profileImageWrap} ${revealOnScroll ? reveal.revealMedia : ""}`}
          >
            <Image
              src={profile.src}
              alt={profile.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className={styles.profileImage}
              priority={index < 2}
            />
          </div>
          <div
            className={`${styles.profileInfoPanel} ${
              openCards[index] ? styles.profileInfoPanelOpen : ""
            } ${revealOnScroll ? reveal.revealTitle : ""}`}
          >
            {profile.introduction ? (
              <button
                type="button"
                className={`${styles.profileHeaderRow} ${styles.profileHeaderButton}`}
                onClick={() => toggleCard(index)}
                aria-expanded={Boolean(openCards[index])}
                aria-label={
                  openCards[index]
                    ? `Collapse ${profile.name} introduction`
                    : `Expand ${profile.name} introduction`
                }
              >
                <div className={styles.profileHeaderText}>
                  <h3 className={styles.profileName}>{profile.name}</h3>
                  <p className={styles.profileRole}>{profile.role}</p>
                </div>
                <span
                  className={`${styles.expandArrow} ${
                    openCards[index] ? styles.expandArrowOpen : ""
                  }`}
                  aria-hidden={true}
                />
              </button>
            ) : (
              <div className={styles.profileHeaderRow}>
                <div className={styles.profileHeaderText}>
                  <h3 className={styles.profileName}>{profile.name}</h3>
                  <p className={styles.profileRole}>{profile.role}</p>
                </div>
              </div>
            )}
            {profile.introduction ? (
              <div
                className={`${styles.profileIntroWrap} ${
                  openCards[index] ? styles.profileIntroWrapOpen : ""
                }`}
              >
                <div className={styles.profileIntroInner}>
                  <p className={styles.profileIntro}>{profile.introduction}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
