import React, { useEffect, useRef } from 'react';

interface LazyLoadImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = React.memo(({ src, alt, style, className }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;

    if (!img) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            img.src = src;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px 50px 0px', 
        threshold: 0.01,
      }
    );

    observer.observe(img);

    return () => {
      if (img) {
        observer.unobserve(img);
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      alt={alt}
      data-src={src}
      style={{ ...style }}
      loading="lazy"
      className={className}
    />
  );
});

export default LazyLoadImage;
