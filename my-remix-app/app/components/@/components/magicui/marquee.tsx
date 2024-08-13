import { cn } from "../../lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "ygroup yflex yoverflow-hidden yp-2 [--duration:y40s] [--gap:y1rem] [gap:yvar(--gap)] sm:yw-1/4 yw-1/3",
        {
          "yflex-row": !vertical,
          "yflex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("yflex yshrink-0 yjustify-around [gap:yvar(--gap)]", {
              "yanimate-marquee yflex-row": !vertical,
              "yanimate-marquee-vertical yflex-col": vertical,
              "ygroup-hover:[yanimation-play-state:ypaused]": pauseOnHover,
              "[yanimation-direction:yreverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
