"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./mosaicGallery.module.css";

const GRID_COLS = 12;

function getMosaicSpans(count, seed = 0) {
  if (count <= 0) return [];
  if (count === 1) return [{ colSpan: GRID_COLS, rowSpan: 2 }];
  if (count === 2) {
    const lead = seed % 2 === 0 ? 7 : 5;
    return [
      { colSpan: lead, rowSpan: 2 },
      { colSpan: GRID_COLS - lead, rowSpan: 2 },
    ];
  }

  const featuredSpan = [7, 8, 6][seed % 3];
  const sideSpan = GRID_COLS - featuredSpan;
  const items = [{ colSpan: featuredSpan, rowSpan: 2 }];
  let remaining = count - 1;

  if (remaining === 1) {
    items.push({ colSpan: sideSpan, rowSpan: 2 });
    return items;
  }

  items.push({ colSpan: sideSpan, rowSpan: 1 });
  items.push({ colSpan: sideSpan, rowSpan: 1 });
  remaining -= 2;

  let rowSeed = seed;
  while (remaining > 0) {
    const take = remaining === 4 ? 4 : Math.min(3, remaining);

    if (take === 1) {
      items.push({ colSpan: GRID_COLS, rowSpan: 1 });
    } else if (take === 2) {
      const lead = rowSeed % 2 === 0 ? 7 : 5;
      items.push({ colSpan: lead, rowSpan: 1 });
      items.push({ colSpan: GRID_COLS - lead, rowSpan: 1 });
    } else if (take === 3) {
      if (rowSeed % 2 === 0) {
        items.push({ colSpan: 4, rowSpan: 1 });
        items.push({ colSpan: 4, rowSpan: 1 });
        items.push({ colSpan: 4, rowSpan: 1 });
      } else {
        items.push({ colSpan: 3, rowSpan: 1 });
        items.push({ colSpan: 6, rowSpan: 1 });
        items.push({ colSpan: 3, rowSpan: 1 });
      }
    } else {
      items.push({ colSpan: 3, rowSpan: 1 });
      items.push({ colSpan: 3, rowSpan: 1 });
      items.push({ colSpan: 3, rowSpan: 1 });
      items.push({ colSpan: 3, rowSpan: 1 });
    }

    remaining -= take;
    rowSeed += 1;
  }

  return items;
}

export default function MosaicGallery({ images, className = "" }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const touchStartY = useRef(null);
  const isOpen = activeIndex !== null;
  const activeImage = isOpen ? images[activeIndex] : null;

  const spans = useMemo(() => {
    const seed = images.reduce((sum, image) => sum + image.src.length, 0);
    return getMosaicSpans(images.length, seed);
  }, [images]);

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

    function scrollPage(deltaX, deltaY, deltaMode) {
      let x = deltaX;
      let y = deltaY;
      if (deltaMode === 1) {
        x *= 16;
        y *= 16;
      } else if (deltaMode === 2) {
        x *= window.innerWidth;
        y *= window.innerHeight;
      }
      window.scrollBy(x, y);
    }

    function onWheel(event) {
      event.preventDefault();
      scrollPage(event.deltaX, event.deltaY, event.deltaMode);
    }

    function onTouchStart(event) {
      if (event.touches.length !== 1) return;
      touchStartY.current = event.touches[0].clientY;
    }

    function onTouchMove(event) {
      if (touchStartY.current === null || event.touches.length !== 1) return;
      const currentY = event.touches[0].clientY;
      window.scrollBy(0, touchStartY.current - currentY);
      touchStartY.current = currentY;
      event.preventDefault();
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      touchStartY.current = null;
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
            style={{
              "--mosaic-col-span": String(spans[index]?.colSpan ?? 4),
              "--mosaic-row-span": String(spans[index]?.rowSpan ?? 1),
            }}
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
              fill
              sizes="100vw"
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
