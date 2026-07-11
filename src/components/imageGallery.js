"use client";

import { useState } from 'react';
import styles from './imageGallery.module.css';

export default function ImageGallery({
  images,
  altText,
  className = "",
  aspectRatio = false,
  compact = false,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className={`${styles.gallery} ${aspectRatio ? styles.galleryAspectRatio : ""} ${compact ? styles.galleryCompact : ""} ${className}`.trim()}
    >
      <button 
        className={styles.arrow} 
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        ‹
      </button>
      <div className={styles.sliderContainer}>
        <div 
          className={styles.slider}
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`${altText} - Image ${index + 1}`}
              className={styles.image}
            />
          ))}
        </div>
      </div>
      <button 
        className={styles.arrow} 
        onClick={goToNext}
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  );
}
