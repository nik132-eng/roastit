"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InteractiveDots from "./InteractiveDots";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    imageUrl: string;
    createdAt: Date;
  };
  author?: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
  index: number;
}

export function PostCard({ post, author, index }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/post/${post.id}`}>
        <div className="relative group cursor-pointer">
          {/* Main Card with Interactive Background */}
          <motion.div 
            className="relative bg-white/85 dark:bg-gray-800/85 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              scale: 1.02
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Interactive Dots Background */}
            <div className="absolute inset-0 opacity-25 lg:opacity-35">
              <InteractiveDots
                backgroundColor="transparent"
                dotColor="#8b5cf6"
                gridSpacing={30}
                animationSpeed={0.003}
              />
            </div>
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden z-10">
              <motion.div
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
              
              {/* Gradient Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"
              />

              {/* Floating Action Button */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isHovered ? 1 : 0,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/40 animate-pulse-glow hover:bg-white/40 hover:scale-110 transition-all duration-200">
                  <span className="text-lg sm:text-2xl">🔥</span>
                </div>
              </motion.div>

              {/* Interactive Badge */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ 
                  x: isHovered ? 0 : -100,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-30 cursor-pointer"
              >
                <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1 text-white text-xs sm:text-sm font-medium hover:bg-black/80 transition-all duration-200">
                  <span className="mr-1">👀</span>
                  <span className="hidden sm:inline">Roast Me!</span>
                  <span className="sm:hidden">Roast!</span>
                </div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-5 md:p-6 relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <motion.h3 
                className="font-bold text-base sm:text-lg md:text-xl text-gray-900 dark:text-white mb-2 sm:mb-3 line-clamp-2"
                animate={{
                  color: isHovered ? "#8b5cf6" : undefined
                }}
                transition={{ duration: 0.2 }}
              >
                {post.title}
              </motion.h3>

              {/* Author & Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {author?.image && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Image
                        src={author.image}
                        alt={author.name || "User"}
                        width={28}
                        height={28}
                        className="sm:w-8 sm:h-8 rounded-full border-2 border-purple-200 animate-float"
                      />
                    </motion.div>
                  )}
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-20 sm:max-w-none">
                      {author?.name || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Reaction Preview */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    delay: 0.1
                  }}
                  className="flex space-x-1"
                >
                  <span className="text-base sm:text-lg animate-bounce" style={{ animationDelay: '100ms' }}>😂</span>
                  <span className="text-base sm:text-lg animate-bounce" style={{ animationDelay: '200ms' }}>🔥</span>
                  <span className="text-base sm:text-lg animate-bounce" style={{ animationDelay: '300ms' }}>💀</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Animated Border Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-3xl blur-xl opacity-20 -z-10 scale-110 animate-pulse-glow"
          />
        </div>
      </Link>
    </motion.div>
  );
}
