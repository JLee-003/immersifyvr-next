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
      "October 12, 2024, was our first visit to Chateau Cupertino to playtest, where we shared ImmersifyVR with residents and staff. At this time, we only had one prototype of an application: swimming. We were able to run the experience for five residents, and we received valuable feedback on the experience that guided our development of swimming.",
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
                    person. In these workshops we run sessions, listen to residents, 
                    and learn how the experiences feel in real spaces. This page
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
