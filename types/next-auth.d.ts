import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    isActive?: boolean;
  }

  interface Session {
    user: {
      role?: string;
      isActive?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    isActive?: boolean;
  }
}