import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function LoginPage() {
  const session = await auth();

  // Already logged in — redirect appropriately
  if (session?.user) {
    if (session.user.role === "admin") {
      redirect("/admin");
    } else {
      redirect("/");
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/30 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo / brand */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Structro <span className="text-amber-400">Admin</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the management dashboard
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl backdrop-blur-xl">
          <p className="mb-6 text-center text-sm text-gray-600">
            Only authorised administrators can access this area.
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/admin" });
            }}
          >
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="w-full gap-3 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 border-neutral-200"
            >
              {/* Google SVG */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Unauthorised access is logged and monitored.
          </p>
        </div>
      </div>
    </main>
  );
}
