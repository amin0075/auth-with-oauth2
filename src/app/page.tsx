// "use client";
import { signOut } from "@/auth/nextjs/actions";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import Image from "next/image";
import Link from "next/link";

// type User = {
//   name: string;
//   role: string;
//   id: string;
// } | null;

export default async function Home() {
  // const fullUser = null;
  // const fullUser: User = {
  //   name: "John Doe",
  //   role: "user",
  //   id: "12345",
  // };

  const fullUser = await getCurrentUser({
    withFullUser: true,
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <nav className="flex w-full justify-end py-2 px-4">
        <ul className="flex gap-4 w-full">
          <li>
            <Button asChild variant="default">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="secondary">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </li>
        </ul>
      </nav>
      <main className="flex w-fit flex-col p-4">
        {/* use shadcn card component to show user data and add a link to "/private" to go to his dashboard */}
        {fullUser && (
          <Card className="w-fit min-w-[300px] p-4 self-start">
            <h1 className="text-2xl font-bold">Welcome {fullUser?.name}</h1>
            <p className="text-lg">Role: {fullUser?.role}</p>
            <p className="text-lg">ID: {fullUser?.id}</p>
            <div className="flex items-center gap-2">
              <Link href="/private">
                <Button variant="default" className="mt-4">
                  Private Page
                </Button>
              </Link>
              {fullUser.role === "admin" && (
                <Link href="/admin">
                  <Button variant="outline" className="mt-4">
                    Admin Page
                  </Button>
                </Link>
              )}
              <Button
                variant="destructive"
                className="mt-4 text-white bg-red-400"
                onClick={signOut}
              >
                Sign out
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
