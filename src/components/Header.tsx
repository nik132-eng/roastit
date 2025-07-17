"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          RoastIt
        </Link>
        <div>
          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/upload" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Upload
              </Link>
              {session.user?.image && (
                <Link href={`/user/${session.user.id}`}>
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? ""}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </Link>
              )}
              <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={() => signIn("google")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Sign In with Google
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
