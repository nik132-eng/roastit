"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Header() {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
    >
      <nav className="container mx-auto flex items-center justify-between p-3 lg:p-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="flex items-center space-x-2 text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl lg:text-3xl"
            >
              🔥
            </motion.span>
            <span>RoastIt</span>
          </Link>
        </motion.div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          {session ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 lg:gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/upload" 
                  className="inline-flex items-center px-3 py-2 lg:px-6 lg:py-2 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 text-sm lg:text-base"
                >
                  <span className="mr-1 lg:mr-2">📸</span>
                  <span className="hidden sm:inline">Upload</span>
                  <span className="sm:hidden">+</span>
                </Link>
              </motion.div>

              {session.user?.image && (
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={`/user/${session.user.id}`}>
                    <div className="relative">
                      <Image
                        src={session.user.image}
                        alt={session.user.name ?? ""}
                        width={32}
                        height={32}
                        className="lg:w-10 lg:h-10 rounded-full border-2 border-purple-300 hover:border-purple-500 transition-colors"
                      />
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </Link>
                </motion.div>
              )}

              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut()} 
                className="px-3 py-2 lg:px-4 lg:py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 text-sm lg:text-base"
              >
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Exit</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signIn("google")} 
              className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 text-sm lg:text-base"
            >
              <span className="mr-1 lg:mr-2">🚀</span>
              <span className="hidden sm:inline">Sign In with Google</span>
              <span className="sm:hidden">Sign In</span>
            </motion.button>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
