import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import RoastForm from "@/components/RoastForm";

type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const session = await getAuthSession();
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      roasts: {
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto p-4 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Image and Post Info */}
          <div className="space-y-6">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                {post.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
                Posted by{" "}
                <Link 
                  href={`/user/${post.author.id}`} 
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline font-medium transition-colors"
                >
                  {post.author.name}
                </Link>
              </p>
            </div>
            
            <div className="relative w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Roasts */}
          <div className="space-y-6">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <span className="mr-3">🔥</span>
                The Roasts
              </h2>
              
              {session && (
                <div className="mb-6">
                  <RoastForm postId={post.id} />
                </div>
              )}
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {post.roasts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🦗</div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      No roasts yet! Be the first to roast this image.
                    </p>
                  </div>
                ) : (
                  post.roasts.map((roast) => (
                    <div 
                      key={roast.id} 
                      className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200/50 dark:border-gray-600/50"
                    >
                      <p className="text-gray-800 dark:text-gray-200 mb-3 leading-relaxed">
                        {roast.text}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="mr-2">👤</span>
                        <Link 
                          href={`/user/${roast.author.id}`} 
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline font-medium transition-colors"
                        >
                          {roast.author.name}
                        </Link>
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
