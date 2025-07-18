"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import InteractiveDots from "./InteractiveDots";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Interactive Dots Background */}
      <div className="absolute inset-0 opacity-30 lg:opacity-50">
        <InteractiveDots
          backgroundColor="transparent"
          dotColor="#8b5cf6"
          gridSpacing={35}
          animationSpeed={0.004}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-48 h-48 lg:w-72 lg:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-48 h-48 lg:w-72 lg:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-48 h-48 lg:w-72 lg:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Logo/Title */}
        <motion.div variants={itemVariants} className="mb-6 lg:mb-8">
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-white drop-shadow-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            RoastIt
          </motion.h1>
          <div className="text-4xl lg:text-6xl mt-2 lg:mt-4">
            🔥
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={itemVariants} className="mb-8 lg:mb-12">
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-white font-light mb-3 lg:mb-4 drop-shadow-lg">
            Where humor meets creativity
          </h2>
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
            variants={itemVariants}
          >
            Upload your images and let our community of comedians roast them with 
            <span className="font-semibold text-pink-200"> witty</span>, 
            <span className="font-semibold text-blue-200"> creative</span>, and 
            <span className="font-semibold text-purple-200"> hilarious</span> comments!
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          variants={itemVariants} 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-12 max-w-4xl mx-auto"
        >
          <motion.div 
            className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-white/30 shadow-xl"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-3xl lg:text-4xl mb-3 lg:mb-4">📸</div>
            <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Upload</h3>
            <p className="text-purple-100 text-sm lg:text-base">Share your photos with the world</p>
          </motion.div>
          
          <motion.div 
            className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-white/30 shadow-xl"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-3xl lg:text-4xl mb-3 lg:mb-4">😂</div>
            <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Roast</h3>
            <p className="text-purple-100 text-sm lg:text-base">Get creative and funny comments</p>
          </motion.div>
          
          <motion.div 
            className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-white/30 shadow-xl"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-3xl lg:text-4xl mb-3 lg:mb-4">🎉</div>
            <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Enjoy</h3>
            <p className="text-purple-100 text-sm lg:text-base">Laugh and share the fun</p>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/upload"
              className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-semibold text-white bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-full hover:shadow-2xl transition-all duration-300 shadow-lg"
            >
              <span className="mr-2">🚀</span>
              Start Roasting
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#posts"
              className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-semibold text-white border-2 border-white/50 rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="mr-2">👀</span>
              Browse Posts
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
