"use client";

import { useEffect, useState } from "react";

export default function HeroBackgroundRotator({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = window.setInterval(() => {
      setVisible(false);

      window.setTimeout(() => {
        setIndex((current) => (current + 1) % images.length);
        setVisible(true);
      }, 500);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;

    const nextImage = new Image();
    nextImage.src = images[(index + 1) % images.length];
  }, [images, index]);

  if (images.length === 0) {
    return <div className="absolute inset-0 bg-[#201f1a]" />;
  }

  return (
    <div className="absolute inset-0">
      <img
        src={images[index]}
        alt=""
        aria-hidden="true"
        className={`h-full w-full object-cover object-center transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,16,.88),rgba(20,20,16,.72)_50%,rgba(20,20,16,.64))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(255,207,36,.20),transparent_34rem)]" />
    </div>
  );
}
