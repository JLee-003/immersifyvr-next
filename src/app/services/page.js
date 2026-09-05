"use client";

import styles from "./page.module.css";
import reveal from "@/styles/revealAnimation.module.css";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

import { Fragment } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContentBlock from "@/components/contentBlock";
import SquishToMiddle from "@/components/squishToMiddle";
import QuoteButton from "@/components/quoteButton";
import SectionBand from "@/components/sectionBand";
import ServicesVideoHero from "@/components/servicesVideoHero";

const OFFER_ICONS = {
  "Engaging Motivation": (
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  ),
  "Safe Exercise": (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  "Immersive Technology": (
    <>
      <path d="M5 9h14a3 3 0 0 1 3 3v3.5a3.5 3.5 0 0 1-3.5 3.5h-3.9L12 15l-2.6 4H5.5A3.5 3.5 0 0 1 2 15.5V12a3 3 0 0 1 3-3z" />
      <path d="M7 9a5 5 0 0 1 10 0" />
      <path d="M2 13h-1" />
      <path d="M23 13h-1" />
    </>
  ),
};

const OFFERS = [
  {
    title: "Engaging Motivation",
    image: "/img/2024-10-12 Chateau/chateau-3.avif",
    text: "We provide motivation to exercise through entertaining VR activities like swimming to catch fish. Instead of providing generalized and basic exercise, our application combines physical activity into an engaging environment.",
  },
  {
    title: "Safe Exercise",
    image: "/img/2025-02-15 Chateau/chateau-1.avif",
    text: "We utilize virtual reality to provide a stress and danger-free environment for the elderly and disabled to overcome daily limitations. Virtual reality allows anyone to immerse themselves in a realistic experience in any safe space they choose.",
  },
  {
    title: "Immersive Technology",
    image: "/img/2025-04-05 Chateau/chateau-1.avif",
    text: "We use Unity's XR Interaction Toolkit to create an experience with visually pleasing aesthetics and intuitive controls, making our experience feel as simple and effective as possible. We are constantly creating new activities based on user feedback.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Workshops at Retirement Homes",
    text: "We host promotional workshops at retirement homes. Our team comes to you to demonstrate VR experiences to residents and staff.",
  },
  {
    title: "One-on-Ones with Personal Trainers",
    text: "One-on-one sessions with residents feature personalized VR exercise experiences, with individual attention and support throughout.",
  },
  {
    title: "Ongoing Technical Support",
    text: "Ongoing technical support helps you troubleshoot issues and get assistance whenever you need it.",
  },
];

const GET_STARTED_STEPS = [
  {
    title: "Explore",
    text: "Explore our website and find out about all the things you can experience with ImmersifyVR, from immersive VR activities to how our sessions work.",
  },
  {
    title: "Book a Session",
    text: (
      <>
        Simply click{" "}
        <Link href="/quote" className={styles.inlineLink}>
          Book a Session
        </Link>{" "}
        at the top right or at the bottom of this page.
      </>
    ),
  },
  {
    title: "That's it!",
    text: "The ImmersifyVR team will get back to you in 1–3 business days. When you get a response back, we'll find you a time to dive into ImmersifyVR with a personal trainer!",
  },
];

function CurvedArrow({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="get-started-arrowhead"
          markerWidth="16"
          markerHeight="16"
          refX="14"
          refY="8"
          orient="30"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M2 2 L14 8 L2 14"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      <path
        d="M8 26 C30 10, 64 10, 88 26"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        markerEnd="url(#get-started-arrowhead)"
      />
    </svg>
  );
}

export default function Services() {
  const whatWeOffer = useRevealOnScroll();
  const process = useRevealOnScroll();

  return (
    <div>
      <Navbar />
      <ServicesVideoHero />
      <div className={styles.contentBelowNav}>
        <SectionBand alt>
          <SquishToMiddle>
            <ContentBlock titleText="What We Offer">
              <div ref={whatWeOffer.sectionRef}>
                <div className={styles.whatWeOfferContainer}>
                  {OFFERS.map((offer, index) => (
                    <div
                      key={offer.title}
                      className={`${styles.offerRow} ${reveal.revealCard} ${whatWeOffer.isVisible(index) ? reveal.revealVisible : ""}`}
                      data-reveal-index={index}
                    >
                      <div
                        className={`${styles.offerImage} ${reveal.revealMedia}`}
                      >
                        <img src={offer.image} alt={offer.title} />
                      </div>
                      <div className={styles.offerText}>
                        <div className={styles.offerHeader}>
                          <div
                            className={`${styles.offerIcon} ${reveal.revealMedia}`}
                            aria-hidden="true"
                          >
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
                              {OFFER_ICONS[offer.title]}
                            </svg>
                          </div>
                          <h2 className={reveal.revealTitle}>{offer.title}</h2>
                        </div>
                        <p className={reveal.revealBody}>{offer.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ContentBlock>
          </SquishToMiddle>
        </SectionBand>
        <SectionBand>
          <SquishToMiddle>
            <ContentBlock titleText="The Process">
              <div ref={process.sectionRef}>
                <ol className={styles.processTimeline}>
                  {PROCESS_STEPS.map((step, index) => (
                    <li
                      key={step.title}
                      className={`${styles.processStep} ${reveal.revealCard} ${process.isVisible(index) ? reveal.revealVisible : ""}`}
                      data-reveal-index={index}
                    >
                    <div
                      className={`${styles.numberIcon} ${reveal.revealMedia}`}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </div>
                    <div className={styles.processStepBody}>
                      <h2
                        className={`${styles.featureTitle} ${reveal.revealTitle}`}
                      >
                        {step.title}
                      </h2>
                      <p
                        className={`${styles.featureDescription} ${reveal.revealBody}`}
                      >
                        {step.text}
                      </p>
                    </div>
                  </li>
                  ))}
                </ol>
              </div>
            </ContentBlock>
          </SquishToMiddle>
        </SectionBand>
        <SectionBand alt>
          <SquishToMiddle>
            <ContentBlock titleText="How to Get Started">
              <div>
                <ol className={styles.getStartedRow}>
                  {GET_STARTED_STEPS.map((step, index) => (
                    <Fragment key={step.title}>
                      <li className={styles.getStartedItem}>
                        <div className={styles.getStartedCard}>
                          <h2 className={styles.featureTitle}>
                            {step.title}
                          </h2>
                          <p className={styles.featureDescription}>
                            {step.text}
                          </p>
                        </div>
                      </li>
                      {index < GET_STARTED_STEPS.length - 1 ? (
                        <li
                          className={styles.getStartedArrowCell}
                          aria-hidden="true"
                        >
                          <CurvedArrow className={styles.getStartedArrow} />
                        </li>
                      ) : null}
                    </Fragment>
                  ))}
                </ol>
              </div>
            </ContentBlock>
          </SquishToMiddle>
        </SectionBand>
        <div className={styles.quoteSection}>
          <div className={styles.quoteBackground}>
            <div className={styles.quoteOverlay}>
              <div className={styles.quoteContent}>
                <h2 className={styles.quoteHeader}>
                  Ready to Get Started?
                </h2>
                <QuoteButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
