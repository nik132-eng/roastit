import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

type UserProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    return <div className="text-center p-10">User not found</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex items-center gap-4 mb-8">
        <Image
          src={user.image ?? "/default-avatar.png"}
          alt={user.name ?? "User avatar"}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-400">{user.posts.length} posts</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Posts by {user.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {user.posts.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id} className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-gray-800">
            <div className="relative w-full h-64">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold truncate">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
