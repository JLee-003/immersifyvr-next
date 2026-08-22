"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./mosaicGallery.module.css";

export default function MosaicGallery({ images, className = "" }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;
  const activeImage = isOpen ? images[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);

  const goTo = useCallback(
    (direction) => {
      setActiveIndex((current) => {
        if (current === null) return current;
        return (current + direction + images.length) % images.length;
      });
    },
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") goTo(1);
      if (event.key === "ArrowLeft") goTo(-1);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, goTo]);

  if (!images?.length) return null;

  return (
    <>
      <div className={`${styles.mosaic} ${className}`.trim()}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={styles.tile}
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${image.alt || `photo ${index + 1}`}`}
          >
            <Image
              src={image.src}
              alt={image.alt || `Visit photo ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className={styles.tileImage}
            />
          </button>
        ))}
      </div>

      {isOpen && activeImage ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Visit photo"
          onClick={close}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={close}
            aria-label="Close photo"
          >
            ×
          </button>
          <button
            type="button"
            className={`${styles.lightboxArrow} ${styles.lightboxArrowPrev}`}
            onClick={(event) => {
              event.stopPropagation();
              goTo(-1);
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <div
            className={styles.lightboxStage}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt || "Visit photo"}
              width={1600}
              height={1067}
              className={styles.lightboxImage}
            />
          </div>
          <button
            type="button"
            className={`${styles.lightboxArrow} ${styles.lightboxArrowNext}`}
            onClick={(event) => {
              event.stopPropagation();
              goTo(1);
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
