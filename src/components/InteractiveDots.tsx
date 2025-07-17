'use client';

import { useEffect, useRef, useCallback } from 'react';

interface InteractiveDotsProps {
  backgroundColor?: string;
  dotColor?: string;
  gridSpacing?: number;
  animationSpeed?: number;
}

const InteractiveDots = ({
  backgroundColor = '#F0EEE6',
  dotColor = '#666666',
  gridSpacing = 30,
  animationSpeed = 0.005
}: InteractiveDotsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const dotsRef = useRef<
    Array<{
      x: number;
      y: number;
      originalX: number;
      originalY: number;
      phase: number;
    }>
  >([]);
  const dprRef = useRef<number>(1);

  const initializeDots = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use CSS pixel dimensions for calculations
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    const dots: Array<{
      x: number;
      y: number;
      originalX: number;
      originalY: number;
      phase: number;
    }> = [];

    // Create grid of dots
    for (let x = gridSpacing / 2; x < canvasWidth; x += gridSpacing) {
      for (let y = gridSpacing / 2; y < canvasHeight; y += gridSpacing) {
        dots.push({
          x,
          y,
          originalX: x,
          originalY: y,
          phase: Math.random() * Math.PI * 2, // Random phase for subtle animation
        });
      }
    }

    dotsRef.current = dots;
  }, [gridSpacing]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    // Use parent container dimensions instead of window dimensions
    const container = canvas.parentElement;
    const displayWidth = container?.clientWidth || window.innerWidth;
    const displayHeight = container?.clientHeight || window.innerHeight;

    // Set the actual size in memory (scaled up for high DPI)
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    // Scale the canvas back down using CSS
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';

    // Scale the drawing context so everything draws at the correct size
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    initializeDots();
  }, [initializeDots]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current += animationSpeed;

    // Use CSS pixel dimensions for calculations
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Update and draw dots (simple breathing animation only)
    dotsRef.current.forEach((dot) => {
      // No mouse or ripple influence - just subtle breathing animation
      dot.x = dot.originalX;
      dot.y = dot.originalY;

      // Simple breathing animation only
      const baseDotSize = 1.5;
      const dotSize = baseDotSize + Math.sin(timeRef.current + dot.phase) * 0.3;
      const opacity = Math.max(
        0.2,
        0.4 + Math.abs(Math.sin(timeRef.current * 0.3 + dot.phase)) * 0.1
      );

      // Draw dot
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);

      // Color with opacity
      const red = Number.parseInt(dotColor.slice(1, 3), 16);
      const green = Number.parseInt(dotColor.slice(3, 5), 16);
      const blue = Number.parseInt(dotColor.slice(5, 7), 16);
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
      ctx.fill();
    });

    // Pure background effect - no ripples needed

    animationFrameId.current = requestAnimationFrame(animate);
  }, [backgroundColor, dotColor, animationSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    const handleResize = () => resizeCanvas();

    window.addEventListener('resize', handleResize);
    // Remove mouse event listeners to make it purely background
    // canvas.addEventListener('mousemove', handleMouseMove);
    // canvas.addEventListener('mousedown', handleMouseDown);
    // canvas.addEventListener('mouseup', handleMouseUp);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      // canvas.removeEventListener('mousemove', handleMouseMove);
      // canvas.removeEventListener('mousedown', handleMouseDown);
      // canvas.removeEventListener('mouseup', handleMouseUp);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      timeRef.current = 0;
      dotsRef.current = [];
    };
  }, [animate, resizeCanvas]);

  return (
    <div
      className='absolute inset-0 w-full h-full overflow-hidden pointer-events-none'
      style={{ backgroundColor }}
    >
      <canvas 
        ref={canvasRef} 
        className='block w-full h-full pointer-events-none' 
      />
    </div>
  );
};

export default InteractiveDots;
