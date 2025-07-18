'use client';

import { motion } from 'framer-motion';
import InteractiveDots from './InteractiveDots';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white mt-16">
      {/* Interactive Background */}
      <div className="absolute inset-0 opacity-20">
        <InteractiveDots
          backgroundColor="transparent"
          dotColor="#8b5cf6"
          gridSpacing={40}
          animationSpeed={0.002}
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                RoastIt 🔥
              </h3>
            </motion.div>
            <p className="text-sm text-gray-400 mt-2 max-w-xs">
              Where creativity meets roasting. Share your art, get honest feedback.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center">
            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com/nik132-eng"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="group relative p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-purple-500/20 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-gray-300 group-hover:text-purple-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
              </motion.a>

              <motion.a
                href="mailto:nikunjrohit10@gmail.com"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="group relative p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-purple-500/20 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-gray-300 group-hover:text-purple-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                </svg>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
              </motion.a>

              <motion.a
                href="https://x.com/nikunj_rohit10"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="group relative p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-purple-500/20 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-gray-300 group-hover:text-purple-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
              </motion.a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center md:text-right">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-1"
            >
              <p className="text-xs text-gray-400">
                © {currentYear} RoastIt. All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-end gap-1 text-xs text-gray-500">
                <span>Built with</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="text-red-400"
                >
                  ❤️
                </motion.span>
                <span>by</span>
                <span className="font-medium text-purple-400">Nikunj Rohit</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Bottom Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 pt-6 border-t border-white/10"
        >
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
