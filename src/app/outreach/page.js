"use client";

import styles from "./page.module.css";
import reveal from "@/styles/revealAnimation.module.css";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SquishToMiddle from "@/components/squishToMiddle";
import ContentBlock from "@/components/contentBlock";
import SectionBand from "@/components/sectionBand";
import MosaicGallery from "@/components/mosaicGallery";

const VISITS = [
  {
    id: "chateau-cupertino-2024-10-12",
    date: "October 12, 2024",
    location: "Chateau Cupertino",
    notes:
      "On October 12, 2024, our team visited Chateau Cupertino to share ImmersifyVR with residents and staff. This is placeholder copy for the session notes — who we met, which experiences we ran, and what we noticed that day. We'll replace it with a fuller write-up of the visit.",
    images: [
      {
        src: "/img/2024-10-12 Chateau/chateau-12.avif",
        alt: "A moment from our visit to Chateau Cupertino",
      },
      {
        src: "/img/2024-10-12 Chateau/chateau-1.avif",
        alt: "Residents trying ImmersifyVR at Chateau Cupertino",
      },
      {
        src: "/img/2024-10-12 Chateau/chateau-2.avif",
        alt: "The ImmersifyVR team during the Chateau Cupertino visit",
      },
      {
        src: "/img/2024-10-12 Chateau/chateau-3.avif",
        alt: "A resident using a VR headset at Chateau Cupertino",
      },
      {
        src: "/img/2024-10-12 Chateau/chateau-6.avif",
        alt: "Group photo from the Chateau Cupertino outreach visit",
      },
    ],
  },
];

export default function Outreach() {
  const introSection = useRevealOnScroll();
  const visitsSection = useRevealOnScroll();

  return (
    <div>
      <Navbar />
      <div className={styles.contentBelowNav}>
        <SectionBand alt>
          <SquishToMiddle>
            <ContentBlock titleText="Outreach">
              <div ref={introSection.sectionRef}>
                <div
                  className={`${reveal.revealCard} ${introSection.isVisible(0) ? reveal.revealVisible : ""}`}
                  data-reveal-index={0}
                >
                  <p className={`${styles.aboutIntro} ${reveal.revealBody}`}>
                    We visit retirement communities to introduce ImmersifyVR in
                    person — running sessions, listening to residents, and
                    learning how the experiences feel in real spaces. This page
                    collects notes and photos from each visit.
                  </p>
                </div>
              </div>
            </ContentBlock>
          </SquishToMiddle>
        </SectionBand>
        <SectionBand extraBottom>
          <SquishToMiddle>
            <div ref={visitsSection.sectionRef} className={styles.visitsList}>
              {VISITS.map((visit, index) => (
                <ContentBlock key={visit.id} titleText={visit.location}>
                  <article
                    className={`${styles.visitCard} ${reveal.revealCard} ${visitsSection.isVisible(index) ? reveal.revealVisible : ""}`}
                    data-reveal-index={index}
                  >
                    <div className={`${styles.visitMeta} ${reveal.revealTitle}`}>
                      <span className={styles.dateBadge}>{visit.date}</span>
                    </div>
                    <p className={`${styles.visitNotes} ${reveal.revealBody}`}>
                      {visit.notes}
                    </p>
                    <div className={reveal.revealMedia}>
                      <MosaicGallery images={visit.images} />
                    </div>
                  </article>
                </ContentBlock>
              ))}
            </div>
          </SquishToMiddle>
        </SectionBand>
      </div>
      <Footer />
    </div>
  );
}
