import React, { useState, useEffect } from "react";
import images from "./images";
import { Progress } from "./@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./@/components/ui/carousel";

type ThemeProps = {
  text: string;
  description: string;
  isTextOnRight: boolean;
  imageUrl: string;
};

const Theme: React.FC<ThemeProps> = ({
  text,
  isTextOnRight,
  imageUrl,
  description,
}) => {
  const ListImages = [];
  images.map((image) =>
    image.themes.map((theme) =>
      theme === text ? ListImages.push(image) : null
    )
  );

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const interval = setInterval(async () => {
      setProgress((prev) => {
        if (prev > 100) {
          return 0;
        }
        return prev + 1;
      });

      if (progress > 100) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        setActiveIndex((prevIndex) => (prevIndex + 1) % ListImages.length);
      }
    }, 100); // Mise à jour toutes les 100 ms

    return () => clearInterval(interval);
  }, [ListImages.length, progress]);

  useEffect(() => {
    if (api) {
      api.scrollTo(activeIndex);
    }
  }, [activeIndex, api]);

  const handlePreviousClick = async () => {
    setProgress(0);
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + ListImages.length) % ListImages.length
    );
  };

  const handleNextClick = async () => {
    setProgress(0);
    setActiveIndex((prevIndex) => (prevIndex + 1) % ListImages.length);
  };

  return (
    <div
      className={`yflex ${
        isTextOnRight ? "yflex-row-reverse" : "yflex-row"
      } yitems-center bg-gradient-custom`}
    >
      <div className="yflex yflex-col yw-1/2 yp-4 ytext-white ygap-y-2">
        <h2 className="special-text ytext-2xl">{text}</h2>
        <p>{description}</p>
        <div className="yflex yflex-row">
          {ListImages.map((image, index) => (
            <div key={index} className="yflex-1" id={index.toString()}>
              <Progress value={index === activeIndex ? progress : 0} />
            </div>
          ))}
        </div>
      </div>
      <div className="yw-1/2 yp-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {ListImages.map((image) => (
              <CarouselItem key={image.id}>
                <img
                  src={image.src}
                  alt={image.name}
                  className="yw-full yh-auto yrounded-xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="yabsolute ytop-1/2 yleft-0 yh-full yz-10 ycursor-pointer ytext-2xl ytext-cyan-100"
            onClick={handlePreviousClick}
          >
            {"<"}
          </CarouselPrevious>
          <CarouselNext
            className="yabsolute ytop-1/2 yright-0 ytransform yz-10 ycursor-pointer ytext-2xl ytext-cyan-100"
            onClick={handleNextClick}
          >
            {">"}
          </CarouselNext>
        </Carousel>
      </div>
    </div>
  );
};

export default Theme;
