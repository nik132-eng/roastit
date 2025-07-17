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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-400 mb-4">
            Posted by <Link href={`/user/${post.author.id}`} className="hover:underline">{post.author.name}</Link>
          </p>
          <div className="relative w-full" style={{ paddingTop: '100%' }}>
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">The Roasts</h2>
          {session && <RoastForm postId={post.id} />}
          <div className="space-y-4 mt-4">
            {post.roasts.map((roast) => (
              <div key={roast.id} className="bg-gray-800 p-4 rounded-lg">
                <p>{roast.text}</p>
                <p className="text-sm text-gray-400 mt-2">
                  - <Link href={`/user/${roast.author.id}`} className="hover:underline">{roast.author.name}</Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
