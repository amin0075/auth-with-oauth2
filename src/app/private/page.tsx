import type React from "react";
import type { Metadata } from "next";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth/nextjs/actions";
import { toggleRole } from "@/actions/toggleRole";

export const metadata: Metadata = {
  title: "private",
  description: "private",
};

export default async function Private() {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });
  return (
    <div className="flex flex-col w-full gap-4 p-4">
      private: {currentUser.role}
      <div className="flex items-center gap-4">
        <Button onClick={toggleRole}>Toggle role</Button>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </div>
  );
}
