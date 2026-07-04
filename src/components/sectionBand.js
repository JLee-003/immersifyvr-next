import styles from "./sectionBand.module.css";

export default function SectionBand({
  alt = false,
  children,
  tightTop = false,
  tightBottom = false,
  extraBottom = false,
}) {
  return (
    <section
      className={`${styles.band} ${alt ? styles.alt : ""} ${tightTop ? styles.bandTightTop : ""} ${tightBottom ? styles.bandTightBottom : ""} ${extraBottom ? styles.bandExtraBottom : ""}`}
    >
      {children}
    </section>
  );
}

