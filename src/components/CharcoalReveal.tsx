"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CharcoalReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative block w-full ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(4px)" }}
        animate={isInView ? { clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" } : {}}
        transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
        className="block w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
