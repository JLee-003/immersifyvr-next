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
    id: "coastside-seniors-2026-08-08",
    date: "August 8, 2026",
    location: "Coastside Seniors",
    notes:
      "On August 8, 2026, we visited Coastside Senior Center in Half Moon. With Ed, we ran a workshop for three interested residents. We ran spaceball and swimming, as well as our newest prototype: rock climbing. From this visit, we've compiled a list of action items and big changes to do, such as reworking the spaceball enemy AI. We are also keeping in touch with this senior center along with Mr. Ed to host more workshops in the future.",
    images: [
      {
        src: "/img/2026-08-08 Coastside Seniors/hmb-1.avif",
        alt: "A moment from our visit to Coastside Seniors",
      },
      {
        src: "/img/2026-08-08 Coastside Seniors/hmb-2.avif",
        alt: "Residents and staff during the Coastside Seniors visit",
      },
      {
        src: "/img/2026-08-08 Coastside Seniors/hmb-3.avif",
        alt: "The ImmersifyVR team at Coastside Seniors",
      },
      {
        src: "/img/2026-08-08 Coastside Seniors/hmb-4.avif",
        alt: "A resident using ImmersifyVR at Coastside Seniors",
      },
      {
        src: "/img/2026-08-08 Coastside Seniors/hmb-5.avif",
        alt: "Playtesting ImmersifyVR at Coastside Seniors",
      },
      {
        src: "/img/2026-08-08 Coastside Seniors/hmb-6.avif",
        alt: "A group moment from the Coastside Seniors visit",
      },
      {
        src: "/img/2026-08-08 Coastside Seniors/hmb-7.avif",
        alt: "Residents trying VR at Coastside Seniors",
      },
      {
        src: "/img/2026-08-08 Coastside Seniors/hmb-8.avif",
        alt: "The ImmersifyVR workshop at Coastside Seniors",
      },
      {
        src: "/img/2026-08-08 Coastside Seniors/hmb-9.avif",
        alt: "Outreach photos from Coastside Seniors",
      },
      {
        src: "/img/2026-08-08 Coastside Seniors/hmb-10.avif",
        alt: "Photos from the August 8 Coastside Seniors outreach visit",
      },
    ],
  },
  {
    id: "chateau-cupertino-2026-05-23",
    date: "May 23, 2026",
    location: "Chateau Cupertino",
    notes:
      "We had our fifth workshop at Chateau Cupertino on May 23, 2026. Along with four new residents, Bob had returned after multiple one-to-one sessions with Ed in between. All of the seniors experienced either spaceball or swimming.",
    images: [
      {
        src: "/img/2026-05-23 Chateau/chateau-1.avif",
        alt: "A moment from our May visit to Chateau Cupertino",
      },
      {
        src: "/img/2026-05-23 Chateau/chateau-2.avif",
        alt: "Residents and staff during the May Chateau Cupertino visit",
      },
      {
        src: "/img/2026-05-23 Chateau/chateau-3.avif",
        alt: "The ImmersifyVR team at Chateau Cupertino",
      },
      {
        src: "/img/2026-05-23 Chateau/chateau-4.avif",
        alt: "A resident using ImmersifyVR at Chateau Cupertino",
      },
      {
        src: "/img/2026-05-23 Chateau/chateau-5.avif",
        alt: "Playtesting ImmersifyVR at Chateau Cupertino",
      },
      {
        src: "/img/2026-05-23 Chateau/chateau-6.avif",
        alt: "Photos from the May 23 Chateau Cupertino outreach visit",
      },
    ],
  },
  {
    id: "ed-2025-08-19",
    date: "August 19, 2025",
    location: "Ed",
    notes:
      "On August 19, 2025, we met with Ed Loeswick, a VR expert and our first personal trainer, to discuss our project and have him playtest it before his visits to Bob Stetson.",
    images: [
      {
        src: "/img/2025-08-19 Ed/ed-1.avif",
        alt: "A moment from our August visit with Ed",
      },
      {
        src: "/img/2025-08-19 Ed/ed-2.avif",
        alt: "The ImmersifyVR team during the visit with Ed",
      },
      {
        src: "/img/2025-08-19 Ed/ed-3.avif",
        alt: "Trying ImmersifyVR during the visit with Ed",
      },
      {
        src: "/img/2025-08-19 Ed/ed-4.avif",
        alt: "Photos from the August 19 visit with Ed",
      },
    ],
  },
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
