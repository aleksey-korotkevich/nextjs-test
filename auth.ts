import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";

interface User {
  id: string;
  username: string;
  password: string;
}

async function getUser(username: string): Promise<User | undefined> {
  try {
    const user =
      await sql<User>`SELECT * FROM users WHERE username = ${username}`;

    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials;
        const user = await getUser(String(username));

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          String(password),
          user.password
        );

        if (passwordsMatch)
          return {
            ...user,
            id: user.username,
          };

        return null;
      },
    }),
  ],
});

export const signUp = async (credentials: Record<string, string>) => {
  const { username, password } = credentials;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result =
      await sql`INSERT INTO users(username, password) VALUES(${username}, ${hashedPassword})`;

    return result;
  } catch (error) {
    throw error;
  }
};
