import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") || [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      // Reject any login attempt from non-admin emails
      if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
        console.warn("Unauthorized login attempt blocked:", user.email);
        return false;
      }
      return true;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user?.email) {
        // Temporarily bypass Firestore for testing
        token.role = ADMIN_EMAILS.includes(user.email) ? "admin" : "user";
        token.isActive = true;
      }
      return token;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.isActive = token.isActive;
      }
      return session;
    },
  },
});