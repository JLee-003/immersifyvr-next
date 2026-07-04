import styles from "./page.module.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContentBlock from "@/components/contentBlock";
import SquishToMiddle from "@/components/squishToMiddle";
import QuoteButton from "@/components/quoteButton";
import SectionBand from "@/components/sectionBand";
import ServicesVideoHero from "@/components/servicesVideoHero";

export default function Services() {
  return (
    <div>
      <Navbar />
      <ServicesVideoHero />
      <div className={styles.contentBelowNav}>
      <SectionBand alt>
        <SquishToMiddle>
        <ContentBlock titleText="What We Offer">
          <div className={styles.whatWeOfferContainer}>
            <div className={styles.offerImage}>
              <img src="/img/chateau-3.avif" alt="Engaging Motivation" />
            </div>
            <div className={styles.offerText}>
              <h2>Engaging Motivation</h2>
              <p>
                We provide motivation to exercise through entertaining VR
                activities like swimming to catch fish. Instead of providing
                generalized and basic exercise, our application combines
                physical activity into an engaging environment.
              </p>
            </div>
            <div className={styles.offerImage}>
              <img src="/img/chateau-4.avif" alt="Safe Exercise" />
            </div>
            <div className={styles.offerText}>
              <h2>Safe Exercise</h2>
              <p>
                We utilize virtual reality to provide a stress and danger-free
                environment for the elderly and disabled to overcome daily
                limitations. Virtual reality allows anyone to immerse
                themselves in a realistic experience in any safe space they
                choose.
              </p>
            </div>
            <div className={styles.offerImage}>
              <img src="/img/chateau-5.avif" alt="Immersive Technology" />
            </div>
            <div className={styles.offerText}>
              <h2>Immersive Technology</h2>
              <p>
                We use Unity&apos;s XR Interaction Toolkit to create an
                experience with visually pleasing aesthetics and intuitive
                controls, making our experience feel as simple and effective
                as possible. We are constantly creating new activities based
                on user feedback.
              </p>
            </div>
          </div>
        </ContentBlock>
        </SquishToMiddle>
      </SectionBand>
      <SectionBand extraBottom>
        <SquishToMiddle>
        <ContentBlock titleText="The Process">
          <ol className={styles.processTimeline}>
            <li className={styles.processStep}>
              <div className={styles.numberIcon} aria-hidden="true">1</div>
              <div className={styles.processStepBody}>
                <h2 className={styles.featureTitle}>
                  Workshops at Retirement Homes
                </h2>
                <p className={styles.featureDescription}>
                  We host promotional workshops at retirement homes. Our team
                  comes to you to demonstrate VR experiences to residents and
                  staff.
                </p>
              </div>
            </li>
            <li className={styles.processStep}>
              <div className={styles.numberIcon} aria-hidden="true">2</div>
              <div className={styles.processStepBody}>
                <h2 className={styles.featureTitle}>
                  One-on-Ones with Personal Trainers
                </h2>
                <p className={styles.featureDescription}>
                  One-on-one sessions with residents feature personalized VR
                  exercise experiences, with individual attention and support
                  throughout.
                </p>
              </div>
            </li>
            <li className={styles.processStep}>
              <div className={styles.numberIcon} aria-hidden="true">3</div>
              <div className={styles.processStepBody}>
                <h2 className={styles.featureTitle}>Ongoing Technical Support</h2>
                <p className={styles.featureDescription}>
                  Ongoing technical support helps you troubleshoot issues and
                  get assistance whenever you need it.
                </p>
              </div>
            </li>
          </ol>
        </ContentBlock>
        </SquishToMiddle>
      </SectionBand>
      <div className={styles.quoteSection}>
        <div className={styles.quoteBackground}>
          <div className={styles.quoteOverlay}>
            <div className={styles.quoteContent}>
              <h2 className={styles.quoteHeader}>Ready to start?</h2>
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
