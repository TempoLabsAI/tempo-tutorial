"use client";
import { useState } from "react";
import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeartButtonProps {
  saved?: boolean;
  onToggle?: (saved: boolean) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Back-compat with previous API. */
  surface?: "overlay" | "inline";
}

const sizeMap = { sm: 18, md: 22, lg: 26 };
const containerSize = { sm: "w-8 h-8", md: "w-9 h-9", lg: "w-11 h-11" };

/**
 * HeartButton — Airbnb-style.
 * On image overlay: white heart with shadow → red filled when saved.
 * On paper: simple toggle, no extra background chrome.
 */
export function HeartButton({
  saved: initialSaved = false,
  onToggle,
  className,
  size = "md",
  surface = "overlay",
}: HeartButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const prefersReduced = useReducedMotion();
  const iconSize = sizeMap[size];

  function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const next = !saved;
    setSaved(next);
    onToggle?.(next);
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        containerSize[size],
        className,
      )}
    >
      <motion.button
        onClick={handleToggle}
        whileTap={prefersReduced ? {} : { scale: 0.85 }}
        animate={
          prefersReduced ? {} : saved ? { scale: [1, 1.18, 1] } : { scale: 1 }
        }
        transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10 flex items-center justify-center w-full h-full rounded-full"
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        aria-pressed={saved}
      >
        <Heart
          size={iconSize}
          strokeWidth={2}
          className={cn(
            "transition-colors duration-150",
            saved
              ? "fill-accent text-accent"
              : surface === "overlay"
                ? "fill-black/35 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                : "fill-transparent text-ink",
          )}
        />
      </motion.button>
    </div>
  );
}
