import * as React from "react";
import { useMeasure } from "@uidotdev/usehooks";
import { cva } from "class-variance-authority";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const processCardVariants = cva("flex border backdrop-blur-lg transition-colors", {
  variants: {
    variant: {
      orange:
        "flex border text-slate-50 border-orange-500/40 backdrop-blur-2xl bg-gradient-to-br from-[rgba(234,88,12,0.15)_40%] to-[rgba(234,88,12,0.25)_120%] hover:bg-[rgba(234,88,12,0.2)]",
      light: "shadow",
    },
    size: {
      sm: "min-w-[25%] max-w-[25%]",
      md: "min-w-[50%] max-w-[50%]",
      lg: "min-w-[75%] max-w-[75%]",
      xl: "min-w-full max-w-full",
    },
  },
  defaultVariants: {
    variant: "orange",
    size: "md",
  },
});

const ContainerScrollContext = React.createContext(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    );
  }
  return context;
}

export const ContainerScroll = ({ children, className, ...props }) => {
  const scrollRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-[120vh]", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

export const ContainerSticky = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("sticky left-0 top-0 w-full overflow-hidden", className)}
    {...props}
  />
));
ContainerSticky.displayName = "ContainerSticky";

export const ProcessCardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
ProcessCardTitle.displayName = "ProcessCardTitle";

export const ProcessCardBody = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-8 p-6", className)} {...props} />
));
ProcessCardBody.displayName = "ProcessCardBody";

export const ProcessCard = ({
  className,
  style,
  variant,
  size,
  itemsLength,
  index,
  ...props
}) => {
  const { scrollYProgress } = useContainerScrollContext();
  const start = index / itemsLength;
  const end = start + 1 / itemsLength;
  const { innerWidth } = window;
  const [ref, { width }] = useMeasure();

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [innerWidth, -((width ?? 0) * index) + 64 * index]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        x: index > 0 ? x : 0,
        ...style,
      }}
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    />
  );
};
ProcessCard.displayName = "ProcessCard";
