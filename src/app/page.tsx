import { prisma } from "@/lib/db";
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { PostCard } from "@/components/PostCard";

export default async function Home() {
  try {
    // First try to get posts without author relationship to see if that's the issue
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // If we have posts, try to get them with authors
    const postsWithAuthors = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });

    console.log("Posts with authors:", postsWithAuthors.length);

    if (posts.length === 0) {
      return (
        <>
          <HeroSection />
          <main className="container mx-auto px-4 py-20 lg:py-24">
            <div className="text-center py-20 lg:py-32 motion-preset-fade-lg motion-delay-300">
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
        <main id="posts" className="container mx-auto px-4 py-20 lg:py-24">
          <div className="text-center mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 motion-preset-fade-lg">
              Latest Roasts 🔥
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 motion-preset-slide-up motion-delay-300 max-w-3xl mx-auto">
              Check out what the community is roasting today!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-10 max-w-7xl mx-auto">
            {posts.map((post, index) => {
              // Find the corresponding post with author data
              const postWithAuthor = postsWithAuthors.find(p => p.id === post.id);
              
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  author={postWithAuthor?.author}
                  index={index}
                />
              );
            })}
          </div>
          
          {/* Add spacing at bottom */}
          <div className="h-20 lg:h-32"></div>
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