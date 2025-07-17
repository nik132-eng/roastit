import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

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
        <main className="container mx-auto p-4">
          <div className="text-center py-8">
            <h2 className="text-xl text-gray-400">No posts found</h2>
            <p className="text-gray-500 mt-2">Be the first to upload something to roast!</p>
            <Link 
              href="/upload" 
              className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Upload Post
            </Link>
          </div>
        </main>
      );
    }

    return (
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => {
            // Find the corresponding post with author data
            const postWithAuthor = postsWithAuthors.find(p => p.id === post.id);
            
            return (
              <div key={post.id} className="border rounded-lg overflow-hidden bg-gray-800 flex flex-col">
                <Link href={`/post/${post.id}`} className="block relative w-full h-64">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link href={`/post/${post.id}`}>
                    <h2 className="text-lg font-bold truncate hover:underline">{post.title}</h2>
                  </Link>
                  {postWithAuthor?.author ? (
                    <Link href={`/user/${postWithAuthor.author.id}`} className="text-sm text-gray-400 hover:underline">
                      by {postWithAuthor.author.name ?? 'Unknown'}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">by Unknown Author</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
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