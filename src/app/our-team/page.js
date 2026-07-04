"use client";

import styles from "./page.module.css";
import reveal from "@/styles/revealAnimation.module.css";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import Image from "next/image";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SquishToMiddle from "@/components/squishToMiddle";
import ContentBlock from "@/components/contentBlock";
import ProfileGallery from "@/components/profileGallery";
import ContactForm from "@/components/contactForm";
import contactFormStyles from "@/components/contactForm.module.css";
import SectionBand from "@/components/sectionBand";

const TEAM_PROFILES = [
  {
    src: "/img/jonny-headshot.avif",
    alt: "Team Member 1",
    name: "Jonny Tang",
    role: "Team Member",
    introduction:
      "I love programming, music, art, and helping others. I worked on both the VR and website development and design, such as the spaceball design and the website layout.",
  },
  {
    src: "/img/jaeho-headshot.avif",
    alt: "Team Member 2",
    name: "Jaeho Lee",
    role: "Team Member",
    introduction:
      "I'm a learning game developer and also enjoy music, golf, and running as a hobby. With the team, I work on various parts of the project, from the swimming algorithm to tutorials.",
  },
  {
    src: "/img/lucas-headshot.avif",
    alt: "Team Member 3",
    name: "Lucas Wang",
    role: "Business Coach",
    introduction:
      "I'm a product and user experience designer who loves playing games. I guide the business side of things and help plan our next moves.",
  },
  {
    src: "/img/andy-headshot.avif",
    alt: "Team Member 4",
    name: "Andy Liu",
    role: "Technical Coach",
    introduction:
      "Hi, I'm Andy and I'm into VR development. I mentor the team on technical challenges and help debug our code.",
  },
];

export default function OurTeam() {
  const teamSection = useRevealOnScroll();
  const contactSection = useRevealOnScroll();

  return (
    <div>
      <Navbar />
      <div className={styles.contentBelowNav}>
        <SectionBand extraBottom>
          <SquishToMiddle>
            <ContentBlock titleText="Our Team">
              <div ref={teamSection.sectionRef}>
                <div
                  className={`${reveal.revealCard} ${teamSection.isVisible(0) ? reveal.revealVisible : ""}`}
                  data-reveal-index={0}
                >
                  <p className={`${styles.ourTeamIntro} ${reveal.revealBody}`}>
                    Our project idea stems from our shared passion for virtual
                    reality, game development, and improving the lives of the
                    elderly. We are all people with grandparents who face the
                    same issues we work to solve with ImmersifyVR.
                  </p>
                </div>
                <ProfileGallery profiles={TEAM_PROFILES} revealOnScroll />
              </div>
            </ContentBlock>
          </SquishToMiddle>
        </SectionBand>
        <SectionBand alt extraBottom>
          <SquishToMiddle>
            <ContentBlock>
              <div ref={contactSection.sectionRef}>
                <div
                  className={`${styles.contactLayout} ${reveal.revealCard} ${contactSection.isVisible(0) ? reveal.revealVisible : ""}`}
                  data-reveal-index={0}
                >
                  <Image
                    className={`${styles.contactHeroImage} ${reveal.revealMedia}`}
                    src="/img/presentation.avif"
                    alt="A team member helping out an older adult"
                    width={500}
                    height={500}
                  />
                  <div className={styles.contactFormColumn}>
                    <h2
                      className={`${styles.contactHeading} ${reveal.revealTitle}`}
                    >
                      Contact Us
                    </h2>
                    <div className={reveal.revealBody}>
                      <p className={styles.contactLead}>
                        Have a question about our services? Use this quick-and-easy
                        contact form and we&apos;ll get back to you within a week.
                      </p>
                      <ContactForm
                        containerClassName={contactFormStyles.formContainerColumn}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ContentBlock>
          </SquishToMiddle>
        </SectionBand>
      </div>
      <Footer />
    </div>
  );
}
