import { prisma } from "@/lib/db";
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { PostCard } from "@/components/PostCard";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

export default async function Home() {
  try {
    // Get posts from database with roasts count for trending functionality
    const dbPosts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        roasts: true, // Include roasts to count for trending
      },
    });

    // Sort posts by trending (most roasts/comments) first, then by date
    const sortedPosts = dbPosts.sort((a, b) => {
      const aRoastCount = a.roasts?.length || 0;
      const bRoastCount = b.roasts?.length || 0;
      
      // If roast counts are different, sort by roast count (trending)
      if (aRoastCount !== bRoastCount) {
        return bRoastCount - aRoastCount;
      }
      
      // If roast counts are the same, sort by date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    if (dbPosts.length === 0) {
      return (
        <>
          <HeroSection />
          <main className="container mx-auto px-4 py-12 lg:py-16">
            <div className="text-center py-12 lg:py-20 motion-preset-fade-lg motion-delay-300">
              <div className="motion-preset-bounce motion-delay-500 mb-8">
                <div className="text-8xl lg:text-9xl mb-6">🎭</div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6">
                  No posts yet!
                </h2>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 motion-preset-slide-up motion-delay-700 max-w-2xl mx-auto">
                Be the first to upload something for the community to roast!
              </p>
              <Link 
                href="/upload" 
                className="motion-preset-pop motion-delay-1000 inline-flex items-center px-8 py-4 lg:px-10 lg:py-5 text-lg lg:text-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl motion-preset-bounce-lg"
              >
                <span className="mr-3">🔥</span>
                Start Roasting
                <span className="ml-3">🎯</span>
              </Link>
            </div>
          </main>
        </>
      );
    }

    return (
      <>
        <HeroSection />
        <main id="posts" className="container mx-auto px-4 py-12 lg:py-16 scroll-smooth">
          {/* Section Header with Trending Info */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 motion-preset-fade-lg">
              🔥 Trending & Latest Roasts
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 motion-preset-slide-up motion-delay-300 max-w-3xl mx-auto mb-6">
              Sorted by community engagement - the most roasted posts appear first!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></span>
                <span>Trending (Most Comments)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
                <span>Latest Posts</span>
              </div>
            </div>
          </div>
          
          {/* Posts Grid with Smooth Scroll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-10 max-w-7xl mx-auto">
            {sortedPosts.map((post, index) => {
              const roastCount = post.roasts?.length || 0;
              const isTrending = roastCount >= 3; // Posts with 3+ roasts are trending
              
              return (
                <PostCard
                  key={post.id}
                  post={{
                    id: post.id,
                    title: post.title,
                    imageUrl: post.imageUrl,
                    createdAt: post.createdAt
                  }}
                  author={post.author}
                  index={index}
                  roastCount={roastCount}
                  isTrending={isTrending}
                />
              );
            })}
          </div>
          
          {/* Scroll to Top Button */}
          <div className="text-center mt-12 lg:mt-16">
            <ScrollToTopButton />
          </div>
          
          {/* Reduced spacing at bottom */}
          <div className="h-8 lg:h-12"></div>
        </main>
      </>
    );
  } catch (error) {
    console.error("Error loading posts:", error);
    return (
      <main className="container mx-auto p-4">
        <div className="text-center py-8">
          <h2 className="text-xl text-red-500">Error loading posts</h2>
          <p className="text-gray-500 mt-2">Please try again later: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </main>
    );
  }
}