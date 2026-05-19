"use client";
import { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AntiGravityContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export default function AntiGravityContainer({
  children,
  className,
  ...props
}: AntiGravityContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max 2 degrees of tilt
    const maxTilt = 2;
    const rotateXVal = ((y - centerY) / centerY) * -maxTilt;
    const rotateYVal = ((x - centerX) / centerX) * maxTilt;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        z: rotateX !== 0 ? 30 : 0,
        boxShadow: rotateX !== 0 
          ? "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 255, 255, 0.05)"
          : "0 10px 30px rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
      className={cn(
        "glass-panel rounded-2xl transition-colors duration-500 transform-gpu",
        className
      )}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      {...props}
    >
      <div style={{ transform: "translateZ(30px)" }} className="h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
