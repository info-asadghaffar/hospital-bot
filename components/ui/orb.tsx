
"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OrbProps {
    className?: string;
    volumeMode?: "manual" | "automatic";
    getInputVolume?: () => number;
    getOutputVolume?: () => number;
}

export function Orb({ className, getInputVolume, getOutputVolume }: OrbProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const render = () => {
            time += 0.05;
            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;

            // Get volumes if available
            const inputVol = getInputVolume ? getInputVolume() : 0;
            const outputVol = getOutputVolume ? getOutputVolume() : 0;
            const totalEnergy = Math.max(0.2, inputVol + outputVol); // Baseline size + energy

            ctx.clearRect(0, 0, width, height);

            // Create gradient
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width / 2);
            gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)"); // Blue core
            gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.5)"); // Purple mid
            gradient.addColorStop(1, "rgba(59, 130, 246, 0)"); // Fade out

            ctx.fillStyle = gradient;

            // Draw dynamic orb
            ctx.beginPath();
            // Radius pulses with time and volume
            const baseRadius = (Math.min(width, height) / 3);
            const pulse = Math.sin(time) * 5;
            const radius = baseRadius * (0.8 + totalEnergy * 0.5) + pulse;

            ctx.arc(centerX, centerY, Math.max(0, radius), 0, Math.PI * 2);
            ctx.fill();

            animationId = requestAnimationFrame(render);
        };

        // Handle resize
        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        window.addEventListener("resize", resize);
        resize();
        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, [getInputVolume, getOutputVolume]);

    return (
        <div className={cn("relative w-full h-full", className)}>
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
