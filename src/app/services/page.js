"use client";

import styles from "./page.module.css";
import reveal from "@/styles/revealAnimation.module.css";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContentBlock from "@/components/contentBlock";
import SquishToMiddle from "@/components/squishToMiddle";
import QuoteButton from "@/components/quoteButton";
import SectionBand from "@/components/sectionBand";
import ServicesVideoHero from "@/components/servicesVideoHero";

const OFFERS = [
  {
    title: "Engaging Motivation",
    image: "/img/chateau-3.avif",
    text: "We provide motivation to exercise through entertaining VR activities like swimming to catch fish. Instead of providing generalized and basic exercise, our application combines physical activity into an engaging environment.",
  },
  {
    title: "Safe Exercise",
    image: "/img/chateau-4.avif",
    text: "We utilize virtual reality to provide a stress and danger-free environment for the elderly and disabled to overcome daily limitations. Virtual reality allows anyone to immerse themselves in a realistic experience in any safe space they choose.",
  },
  {
    title: "Immersive Technology",
    image: "/img/chateau-5.avif",
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

export default function Services() {
  const whatWeOffer = useRevealOnScroll();
  const process = useRevealOnScroll();
  const quote = useRevealOnScroll();

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
                        <h2 className={reveal.revealTitle}>{offer.title}</h2>
                        <p className={reveal.revealBody}>{offer.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ContentBlock>
          </SquishToMiddle>
        </SectionBand>
        <SectionBand extraBottom>
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
        <div ref={quote.sectionRef} className={styles.quoteSection}>
          <div className={styles.quoteBackground}>
            <div className={styles.quoteOverlay}>
              <div
                className={`${styles.quoteContent} ${reveal.revealCard} ${quote.isVisible(0) ? reveal.revealVisible : ""}`}
                data-reveal-index={0}
              >
                <h2 className={`${styles.quoteHeader} ${reveal.revealTitle}`}>
                  Ready to start?
                </h2>
                <div className={reveal.revealBody}>
                  <QuoteButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
