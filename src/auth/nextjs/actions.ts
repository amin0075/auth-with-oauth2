"use server";
import { z } from "zod";
import { signInSchema, signUpSchema } from "./schemas";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { OAuthProvider, UserTable } from "@/drizzle/schema";
import {
  comparePasswords,
  generateSalt,
  passwordHasher,
} from "../core/passwordHasher";
import { createUserSession, removeUserFromSession } from "../core/session";
import { cookies } from "next/headers";
import { getOAuthClient } from "../core/oauth/base";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) return "Unable to log you in";

  const user = await db.query.UserTable.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(UserTable.email, data.email),
  });

  if (user == null || user.password == null || user.salt == null) {
    return "Unable to log you in";
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "Unable to log you in";

  await createUserSession(user, await cookies());

  redirect("/");
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) {
    return "unable to create your account.";
  }

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  });
  console.log("existingUser", existingUser);
  if (existingUser != null) {
    return "User already exists for this email.";
  }

  try {
    const salt = generateSalt();
    const hashPassword = await passwordHasher(data.password, salt);

    const [user] = await db
      .insert(UserTable)
      .values({
        name: data.name,
        email: data.email,
        password: hashPassword,
        salt: salt,
      })
      .returning({ id: UserTable.id, role: UserTable.role });

    if (user == null) return "Unable to create your account.";

    await createUserSession(user, await cookies());
    redirect("/");
  } catch {
    return "Unable to create your account.";
  }
}

export async function signOut() {
  await removeUserFromSession(await cookies());
  redirect("/");
}

export async function oAuthSignIn(provider: OAuthProvider) {
  // TODO get oauth url

  redirect(getOAuthClient(provider).createAuthUrl(await cookies()));
}
