"use client";

import { useEffect, useRef } from "react";

interface FloatingCursorProps {
  children?: React.ReactNode;
}

export function FloatingCursor({ children }: FloatingCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      // Cursor follows mouse immediately
      cursorX += (mouseX - cursorX) * 0.9;
      cursorY += (mouseY - cursorY) * 0.9;
      
      // Follower has delay
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

      requestAnimationFrame(animateCursor);
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
      follower.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
      follower.style.opacity = "0";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    animateCursor();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {children}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-50 opacity-0 transition-opacity duration-300 mix-blend-difference"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-purple-400 rounded-full pointer-events-none z-40 opacity-0 transition-opacity duration-300"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
