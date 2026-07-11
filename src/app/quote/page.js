import styles from "./page.module.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SquishToMiddle from "@/components/squishToMiddle";
import Spacer from "@/components/spacer";
import QuoteForm from "@/components/quoteForm";

export default function Quote() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
      <SquishToMiddle>
        <Spacer size="large" />
        <div className={styles.quoteContainer}>
          <div className={styles.contactDetails}>
            <h2>Get in Touch</h2>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className={styles.contactText}>
                  <p className={styles.contactLabel}>Email</p>
                  <p className={styles.contactValue}>immersify.vr1@gmail.com</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className={styles.contactText}>
                  <p className={styles.contactLabel}>LinkedIn</p>
                  <p className={styles.contactValue}>ImmersifyVR Team</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className={styles.contactText}>
                  <p className={styles.contactLabel}>Location</p>
                  <p className={styles.contactValue}>
                    Bay Area and Los Angeles, CA
                  </p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                </div>
                <div className={styles.contactText}>
                  <p className={styles.contactLabel}>Response Time</p>
                  <p className={styles.contactValue}>Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formSection}>
            <h2>Book a Session</h2>
            <QuoteForm />
          </div>
        </div>
        <Spacer size="large" />
      </SquishToMiddle>
      </main>
      <Footer />
    </div>
  );
}
