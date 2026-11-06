"use client";

import { useState } from "react";

export default function ProductGallery({ images, alt, model }: { images: string[]; alt: string; model: string }) {
  const uniqueImages = [...new Set(images.filter(Boolean))];
  const [active, setActive] = useState(0);
  const current = uniqueImages[active] || uniqueImages[0];
  return (
    <div className="product-gallery" aria-label={`Product photos for ${model}`}>
      <div className="product-gallery-main">
        <img src={current} alt={alt} fetchPriority="high" />
      </div>
      {uniqueImages.length > 1 && (
        <>
          <div className="product-gallery-thumbs" aria-label="More product photos">
            {uniqueImages.map((src, index) => (
              <button key={src} type="button" className="product-gallery-thumb" aria-label={`Show photo ${index + 1} of ${model}`} aria-pressed={active === index} onClick={() => setActive(index)}>
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
          <div className="product-gallery-count">{active + 1} / {uniqueImages.length} · BOSCH PRODUCT PHOTOS</div>
        </>
      )}
    </div>
  );
}
