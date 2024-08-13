"use client";

import { useEffect, useState } from "react";

import { cn } from "../../lib/utils";

interface MeteorsProps {
  number?: number;
}
export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    [],
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          className={cn(
            "ypointer-events-none yabsolute yleft-1/2 ytop-1/2 ysize-0.5 yrotate-[215deg] yanimate-meteor yrounded-full ybg-slate-500 yshadow-[0_0_0_1px_#ffffff10]",
          )}
          style={style}
        >
          {/* Meteor Tail */}
          <div className="ypointer-events-none yabsolute ytop-1/2 y-z-10 yh-px yw-[50px] y-translate-y-1/2 ybg-gradient-to-r yfrom-slate-500 yto-transparent" />
        </span>
      ))}
    </>
  );
};

export default Meteors;
