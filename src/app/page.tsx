import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
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
              <Link href={`/user/${post.author.id}`} className="text-sm text-gray-400 hover:underline">
                by {post.author.name ?? 'Unknown'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}