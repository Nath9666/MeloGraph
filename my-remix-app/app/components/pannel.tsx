import React from "react";
import images from "./images";
import { cn } from "./@/lib/utils";
import Marquee from "./@/components/magicui/marquee";

const expandedImages = images.flatMap((image) =>
  Array.from({ length: image.number }, (_, index) => ({
    ...image,
    key: `${image.name}-${index}`,
  }))
);

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledImages = shuffleArray([...expandedImages]);

const quarterLength = Math.ceil(shuffledImages.length / 4);

const firstRow = shuffledImages.slice(0, quarterLength);
const secondRow = shuffledImages.slice(quarterLength, quarterLength * 2);
const thirdRow = shuffledImages.slice(quarterLength * 2, quarterLength * 3);
const fourthRow = shuffledImages.slice(quarterLength * 3);

//console.log(firstRow.length, secondRow.length, thirdRow.length, fourthRow.length);

const ReviewCard = ({
  src,
  alt,
}: {
  src: string;
  name: string;
  alt: string;
}) => {
  return (
    <figure
      className={cn(
        "yrelative yh-36 yw-full ycursor-pointer yoverflow-hidden yrounded-xl yborder ymy-2",
        // light styles
        "yborder-gray-950/[.1] ybg-gray-950/[.01] hover:ybg-gray-950/[.05]",
        // dark styles
        "dark:yborder-gray-50/[.1] dark:ybg-gray-50/[.10] dark:yhover:bg-gray-50/[.15]"
      )}
    >
      <div className="yflex yflex-row yitems-center yw-full yh-full">
        <img
          src={src}
          alt={alt}
          className="yw-full yh-full"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </figure>
  );
};

export function MarqueeDemoVertical() {
  return (
    <div className="yrelative yflex yh-[500px] yw-full yflex-row yitems-center yjustify-center yoverflow-hidden yrounded-lg yborder ybg-background md:yshadow-xl">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((expandedImage) => (
          <ReviewCard key={expandedImage.key} {...expandedImage} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {secondRow.map((expandedImage) => (
          <ReviewCard key={expandedImage.key} {...expandedImage} />
        ))}
      </Marquee>
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {thirdRow.map((expandedImage) => (
          <ReviewCard key={expandedImage.key} {...expandedImage} />
        ))}
      </Marquee>
      <Marquee
        pauseOnHover
        vertical
        reverse
        className="[--duration:20s] sm:yblock yhidden"
      >
        {fourthRow.map((expandedImage) => (
          <ReviewCard key={expandedImage.key} {...expandedImage} />
        ))}
      </Marquee>
      <div className="ypointer-events-none yabsolute yinset-x-0 ytop-0 yh-1/3 ybg-gradient-to-b yfrom-white dark:yfrom-background"></div>
      <div className="ypointer-events-none yabsolute yinset-x-0 ybottom-0 yh-1/3 ybg-gradient-to-t yfrom-white dark:yfrom-background"></div>
    </div>
  );
}

const Pannel: React.FC = () => {
  // Générer plusieurs instances de chaque image en fonction de la propriété `number`

  return (
    <div>
      <MarqueeDemoVertical />
    </div>
  );
};

export default Pannel;
