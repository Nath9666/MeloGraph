import React from "react";
import images from "./images";

const Pannel: React.FC = () => {
  // Générer plusieurs instances de chaque image en fonction de la propriété `number`
  const expandedImages = images.flatMap((image) =>
    Array.from({ length: image.number }, (_, index) => ({
      ...image,
      key: `${image.name}-${index}`,
    }))
  );

  return (
    <div className="relative h-1/2 overflow-hidden">
      <div className="absolute top-0 left-0 w-full animate-scroll">
        {expandedImages.map((image, index) => (
          <div key={image.key} className="mb-4">
            <img src={image.src} alt={image.alt} className="w-full" />
          </div>
        ))}
        {expandedImages.map((image, index) => (
          <div key={`${image.key}-duplicate`} className="mb-4">
            <img src={image.src} alt={image.alt} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pannel;