"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
}

interface StarsBackgroundProps {
  className?: string;
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  starColor?: string;
}

export const StarsBackground: React.FC<StarsBackgroundProps> = ({
  className,
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  starColor = "#FFF",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateStars = useCallback((width: number, height: number): Star[] => {
    const area = width * height;
    const numStars = Math.floor(area * starDensity);
    return Array.from({ length: numStars }, () => {
      const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
      const twinkleSpeed = shouldTwinkle
        ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
        : null;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.9 + 0.5,
        opacity: Math.random(),
        twinkleSpeed,
      };
    });
  }, [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars = generateStars(window.innerWidth, window.innerHeight);
    let animationFrameId: number;

    const resizeCanvas = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      stars = generateStars(width, height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const render = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        if (star.twinkleSpeed !== null) {
          star.opacity += star.twinkleSpeed * 0.008;
          if (star.opacity > 1 || star.opacity < 0.2) {
            star.twinkleSpeed = -star.twinkleSpeed;
          }
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.opacity));
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [generateStars, starColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
};
