"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import QuoteButton from "@/components/quoteButton";
import ContentBlock from "@/components/contentBlock";
import PillarsGrid from "@/components/pillarsGrid";
import SquishToMiddle from "@/components/squishToMiddle";
import ImageGallery from "@/components/imageGallery";
import TestimonialsCarousel from "@/components/testimonialsCarousel";
import AwardsSection from "@/components/awardsSection";
import HeroSlideshow from "@/components/heroSlideshow";
import RainingDotsBackground from "@/components/rainingDotsBackground";

const HERO_SLIDESHOW_IMAGES = [
  "/img/chateau-1.avif",
  "/img/chateau-2.avif",
  "/img/chateau-5.avif",
  "/img/chateau-6.avif",
  "/img/chateau-7.avif",
  "/img/chateau-8.avif",
  { src: "/img/chateau-9.avif", objectPosition: "center 38%" },
  "/img/chateau-10.avif",
  { src: "/img/chateau-11.avif", objectPosition: "center 28%" },
  "/img/ed2.avif",
];

export default function Home() {
  const experienceRefs = useRef([]);
  const pillarsSectionRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [visibleExperiences, setVisibleExperiences] = useState(() => new Set());
  const [visiblePillars, setVisiblePillars] = useState(() => new Set());
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);

  useEffect(() => {
    const cards = experienceRefs.current.filter(Boolean);
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.dataset.experienceIndex);
          setVisibleExperiences((prev) => {
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

  useEffect(() => {
    const section = pillarsSectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-pillar-index]");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.dataset.pillarIndex);
          setVisiblePillars((prev) => {
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

  useEffect(() => {
    const section = testimonialsRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTestimonialsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar />

      <div className={styles.hero}>
        <HeroSlideshow images={HERO_SLIDESHOW_IMAGES} />
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h2>
              Welcome to <span>ImmersifyVR</span>
            </h2>
            <p>
              We offer story-driven experiences that empower
              the elderly or the disabled to become{" "}
              physically active.
            </p>
            <QuoteButton />
          </div>
        </div>
      </div>

      <section className={`${styles.homeSection} ${styles.homeSectionOverHero}`}>
        <RainingDotsBackground />
        <div className={styles.homeSectionContent}>
          <SquishToMiddle>
            <div className={styles.homeQuote}>
              <h2 className={styles.homeQuoteText}>
                ImmersifyVR is a{" "}
                <span className={styles.accent}>virtual reality</span> exercise
                simulator designed to make{" "}
                <span className={styles.accent}>exercising fun</span>.
              </h2>
            </div>
            <div className={styles.statsStrip}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>650+</div>
                <div className={styles.statLabel}>Hours dedicated</div>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.statItem}>
                <div className={styles.statNumber}>3</div>
                <div className={styles.statLabel}>Locations visited</div>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.statItem}>
                <div className={styles.statNumber}>16+</div>
                <div className={styles.statLabel}>Participants</div>
              </div>
            </div>
          </SquishToMiddle>
        </div>
      </section>

      <section className={`${styles.homeSection} ${styles.homeSectionAlt}`}>
        <SquishToMiddle>
          <ContentBlock titleText="Our Experiences">
            <div className={styles.experiencesList}>
              <article
                ref={(el) => {
                  experienceRefs.current[0] = el;
                }}
                data-experience-index={0}
                className={`${styles.experienceCard} ${visibleExperiences.has(0) ? styles.experienceVisible : ""}`}
              >
                <div className={styles.experienceMedia}>
                  <ImageGallery
                    aspectRatio
                    images={[
                      "/img/beach-view.png",
                      "/img/swimming-1.avif",
                      "/img/swimming-2.avif",
                      "/img/swimming-3.avif",
                    ]}
                    altText="Virtual Swimming Experience"
                  />
                </div>
                <div className={styles.experienceBody}>
                  <h2>Virtual Swimming</h2>
                  <p>
                    Swim through a vibrant virtual ocean and catch as many fish
                    as you can! Explore deeper waters, discover hidden treasures,
                    and even ride alongside whales. Users can expect a
                    low-to-moderate intensity upper-body workout.
                  </p>
                </div>
              </article>
              <article
                ref={(el) => {
                  experienceRefs.current[1] = el;
                }}
                data-experience-index={1}
                className={`${styles.experienceCard} ${visibleExperiences.has(1) ? styles.experienceVisible : ""}`}
              >
                <div className={styles.experienceMedia}>
                  <ImageGallery
                    aspectRatio
                    images={["/img/spaceball-1.avif", "/img/spaceball-2.avif"]}
                    altText="Spaceball Experience"
                  />
                </div>
                <div className={styles.experienceBody}>
                  <h2>Spaceball</h2>
                  <p>
                    Play a tennis-like game in a virtual space arena! Compete
                    against alien opponents and try to beat three unique and
                    increasingly challenging levels. Users can expect a
                    moderate-intensity upper-body workout.
                  </p>
                </div>
              </article>
              <article
                ref={(el) => {
                  experienceRefs.current[2] = el;
                }}
                data-experience-index={2}
                className={`${styles.experienceCard} ${visibleExperiences.has(2) ? styles.experienceVisible : ""}`}
              >
                <div className={styles.experienceMedia}>
                  <ImageGallery
                    aspectRatio
                    images={["/img/climbing-1.avif", "/img/climbing-2.avif"]}
                    altText="Rock Climbing Experience"
                  />
                </div>
                <div className={styles.experienceBody}>
                  <h2>Rock Climbing</h2>
                  <p>
                    Climb at your own pace, reach new heights, and enjoy scenic
                    views along the way. This low-intensity activity is designed
                    to provide a relaxed and accessible climbing experience.
                  </p>
                </div>
              </article>
            </div>
          </ContentBlock>
        </SquishToMiddle>
      </section>

      <section
        ref={pillarsSectionRef}
        className={`${styles.homeSection} ${styles.homeSectionExtraBottom}`}
      >
        <SquishToMiddle>
        <ContentBlock
          titleText="Our Core Pillars"
          headerSpacerSize="medium"
        >
          <PillarsGrid className={styles.pillarsGrid}>
            <div
              className={`${styles.featureCard} ${styles.pillarCard} ${visiblePillars.has(0) ? styles.pillarVisible : ""}`}
              data-pillar-card
              data-pillar-index={0}
            >
              <div className={styles.featureCardImage}>
                <Image
                  src="/img/swimming-1.avif"
                  alt="Engaging Storylines"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.featureCardImg}
                />
              </div>
              <div className={styles.featureCardContent}>
                <div className={styles.featureCardHeader}>
                  <div className={styles.featureIcon}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--blue-color)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 7v14"></path>
                      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                    </svg>
                  </div>
                  <h2 className={styles.featureTitle}>Engaging Storylines</h2>
                </div>
                <p className={styles.featureDescription}>
                  Our VR experiences are story-driven, empowering users to
                  become the protagonists of captivating adventures.
                  By placing them at the center of immersive, interactive worlds,
                  ImmersifyVR transforms exercise into a meaningful experience
                  that feels exciting.
                </p>
              </div>
            </div>
            <div
              className={`${styles.featureCard} ${styles.pillarCard} ${visiblePillars.has(1) ? styles.pillarVisible : ""}`}
              data-pillar-card
              data-pillar-index={1}
            >
              <div className={styles.featureCardImage}>
                <Image
                  src="/img/chateau-2.avif"
                  alt="Accessible Design"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.featureCardImg}
                />
              </div>
              <div className={styles.featureCardContent}>
                <div className={styles.featureCardHeader}>
                  <div className={styles.featureIcon}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--blue-color)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="16" cy="4" r="1"></circle>
                      <path d="m18 19 1-7-6 1"></path>
                      <path d="m5 8 3-3 5.5 3-2.36 3.5"></path>
                      <path d="M4.24 14.5a5 5 0 0 0 6.88 6"></path>
                      <path d="M13.76 17.5a5 5 0 0 0-6.88-6"></path>
                    </svg>
                  </div>
                  <h2 className={styles.featureTitle}>Accessible Design</h2>
                </div>
                <p className={styles.featureDescription}>
                ImmersifyVR is designed with accessibility at its core,
                creating intuitive experiences for users with different
                levels of technological and VR familiarity.
                With activities that vary in intensity,
                our platform adapts to each user’s needs, comfort, and abilities,
                making exercise more approachable.
                </p>
              </div>
            </div>
            <div
              className={`${styles.featureCard} ${styles.pillarCard} ${visiblePillars.has(2) ? styles.pillarVisible : ""}`}
              data-pillar-card
              data-pillar-index={2}
            >
              <div className={styles.featureCardImage}>
                <Image
                  src="/img/chateau-10.avif"
                  alt="Lowering Barriers"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.featureCardImg}
                />
              </div>
              <div className={styles.featureCardContent}>
                <div className={styles.featureCardHeader}>
                  <div className={styles.featureIcon}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--blue-color)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13 4h3a2 2 0 0 1 2 2v14"></path>
                      <path d="M2 20h3"></path>
                      <path d="M13 20h9"></path>
                      <path d="M10 12v.01"></path>
                      <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"></path>
                    </svg>
                  </div>
                  <h2 className={styles.featureTitle}>Lowering Barriers</h2>
                </div>
                <p className={styles.featureDescription}>
                  ImmersifyVR works to lower the intimidating barriers
                  that often come with traditional exercise and new technology
                  by offering a more approachable, practical, and affordable
                  way for elderly and disabled users to stay active.
                </p>
              </div>
            </div>
            <div
              className={`${styles.featureCard} ${styles.pillarCard} ${visiblePillars.has(3) ? styles.pillarVisible : ""}`}
              data-pillar-card
              data-pillar-index={3}
            >
              <div className={styles.featureCardImage}>
                <Image
                  src="/img/chateau-11.avif"
                  alt="Staying Active"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.featureCardImg}
                />
              </div>
              <div className={styles.featureCardContent}>
                <div className={styles.featureCardHeader}>
                  <div className={styles.featureIcon}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--blue-color)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className={styles.featureTitle}>Staying Active</h2>
                </div>
                <p className={styles.featureDescription}>
                  ImmersifyVR provides a variety of activities designed to keep
                  users active and engaged. Our activities encourage users to
                  interact with virtual environments. Our activities are
                  designed to keep users active without the monotony and
                  potential hazard of traditional exercise.
                </p>
              </div>
            </div>
          </PillarsGrid>
        </ContentBlock>
        </SquishToMiddle>
      </section>

      <section
        ref={testimonialsRef}
        className={`${styles.homeSection} ${styles.homeSectionTestimonials} ${styles.homeSectionExtraBottom} ${testimonialsVisible ? styles.testimonialsVisible : ""}`}
      >
        <SquishToMiddle>
          <div className={styles.testimonialsReveal}>
          <ContentBlock titleText="Testimonials">
            <TestimonialsCarousel />
          </ContentBlock>
          </div>
        </SquishToMiddle>
      </section>

      <section className={`${styles.homeSection} ${styles.homeSectionExtraBottom}`}>
        <SquishToMiddle>
          <ContentBlock titleText="Awards & Recognition">
            <AwardsSection />
          </ContentBlock>
        </SquishToMiddle>
      </section>

      <Footer />
    </div>
  );
}
