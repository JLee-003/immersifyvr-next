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
    id: "chateau-cupertino-2025-07-26",
    date: "July 26, 2025",
    location: "Chateau Cupertino",
    notes:
      "On July 26, 2025, only one resident, Bob Stetson, participated in our workshop, and he was the first resident to participate in our personal trainer program following the visit. After this visit, we had only minor changes left to swimming, so we started looking to creating a new experience.",
    images: [
      {
        src: "/img/2025-07-26 Chateau/chateau-1.avif",
        alt: "A moment from our July visit to Chateau Cupertino",
      },
      {
        src: "/img/2025-07-26 Chateau/chateau-2.avif",
        alt: "Residents and staff during the July Chateau Cupertino visit",
      },
      {
        src: "/img/2025-07-26 Chateau/chateau-3.avif",
        alt: "The ImmersifyVR team at Chateau Cupertino",
      },
      {
        src: "/img/2025-07-26 Chateau/chateau-4.avif",
        alt: "A resident using ImmersifyVR at Chateau Cupertino",
      },
      {
        src: "/img/2025-07-26 Chateau/chateau-5.avif",
        alt: "Playtesting ImmersifyVR at Chateau Cupertino",
      },
      {
        src: "/img/2025-07-26 Chateau/chateau-6.avif",
        alt: "A group moment from the July Chateau Cupertino visit",
      },
      {
        src: "/img/2025-07-26 Chateau/chateau-7.avif",
        alt: "Photos from the July 26 Chateau Cupertino outreach visit",
      },
    ],
  },
  {
    id: "chateau-cupertino-2025-04-05",
    date: "April 5, 2025",
    location: "Chateau Cupertino",
    notes:
      "April 5, 2025, marked our third visit to Chateau Cupertino to playtest. We restructured the tutorial to be more effective yet also shorter, and we once again reworked the swimming mechanics. Three residents participated in this workshop. By this workshop, we had a decently polished swimming environment, as we added colorful fish to catch and coral as well as other details to the ocean floor.",
    images: [
      {
        src: "/img/2025-04-05 Chateau/chateau-1.avif",
        alt: "A moment from our April visit to Chateau Cupertino",
      },
      {
        src: "/img/2025-04-05 Chateau/chateau-2.avif",
        alt: "Residents and staff during the April Chateau Cupertino visit",
      },
      {
        src: "/img/2025-04-05 Chateau/chateau-3.avif",
        alt: "The ImmersifyVR team at Chateau Cupertino",
      },
      {
        src: "/img/2025-04-05 Chateau/chateau-4.avif",
        alt: "A resident using ImmersifyVR at Chateau Cupertino",
      },
      {
        src: "/img/2025-04-05 Chateau/chateau-5.avif",
        alt: "Photos from the April 5 Chateau Cupertino outreach visit",
      },
    ],
  },
  {
    id: "chateau-cupertino-2025-02-15",
    date: "February 15, 2025",
    location: "Chateau Cupertino",
    notes:
      "February 15, 2025, was our second visit to Chateau Cupertino to playtest. By then, we implemented a crude tutorial and reworked our swimming mechanics. We ran the experience for three residents, and the feedback we received guided us in improving the experience for all users.",
    images: [
      {
        src: "/img/2025-02-15 Chateau/chateau-1.avif",
        alt: "A moment from our February visit to Chateau Cupertino",
      },
      {
        src: "/img/2025-02-15 Chateau/chateau-2.avif",
        alt: "Residents and staff during the February Chateau Cupertino visit",
      },
      {
        src: "/img/2025-02-15 Chateau/chateau-3.avif",
        alt: "The ImmersifyVR team at Chateau Cupertino",
      },
      {
        src: "/img/2025-02-15 Chateau/chateau-4.avif",
        alt: "A resident using ImmersifyVR at Chateau Cupertino",
      },
      {
        src: "/img/2025-02-15 Chateau/chateau-5.avif",
        alt: "Playtesting ImmersifyVR at Chateau Cupertino",
      },
      {
        src: "/img/2025-02-15 Chateau/chateau-6.avif",
        alt: "A group moment from the February Chateau Cupertino visit",
      },
      {
        src: "/img/2025-02-15 Chateau/chateau-7.avif",
        alt: "Residents trying VR at Chateau Cupertino",
      },
      {
        src: "/img/2025-02-15 Chateau/chateau-8.avif",
        alt: "Photos from the February 15 Chateau Cupertino outreach visit",
      },
    ],
  },
  {
    id: "chateau-cupertino-2024-10-12",
    date: "October 12, 2024",
    location: "Chateau Cupertino",
    notes:
      "October 12, 2024, was our first visit to Chateau Cupertino to playtest, where we shared ImmersifyVR with residents and staff. At this time, we only had one prototype of an application: swimming. We were able to run the experience for five residents, and we received valuable feedback on the experience that guided our development of swimming.",
    images: [
      {
        src: "/img/2024-10-12 Chateau/chateau-5.avif",
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
        src: "/img/2024-10-12 Chateau/chateau-4.avif",
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
        <div ref={visitsSection.sectionRef}>
          {VISITS.map((visit, index) => (
            <SectionBand
              key={visit.id}
              alt={index % 2 === 1}
              extraBottom={index === VISITS.length - 1}
            >
              <SquishToMiddle>
                <ContentBlock titleText={visit.location}>
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
              </SquishToMiddle>
            </SectionBand>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
