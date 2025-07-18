'use client';

interface ScrollToTopButtonProps {
  className?: string;
}

export function ScrollToTopButton({ className = "" }: ScrollToTopButtonProps) {
  const scrollToTop = () => {
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      heroElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback to scrolling to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className={`inline-flex items-center px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 hover:border-purple-300 dark:hover:border-purple-600 ${className}`}
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
      Back to Top
    </button>
  );
}
