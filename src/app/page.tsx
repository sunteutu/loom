import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { FlaskConical } from "lucide-react";
import { HomeDashboard } from "@/components/HomeDashboard";

export default async function Home() {
  // Session state comes from the server (Clerk middleware), so the right
  // variant is in the very first render — no signed-out flash after login.
  const { userId } = await auth();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-8 pb-16 pt-8">
      {userId ? <HomeDashboard /> : <Landing />}
    </main>
  );
}

function Landing() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-3">
        <FlaskConical aria-hidden className="h-7 w-7 text-indigo-11" />
      </div>
      <div className="max-w-lg">
        <h1 className="text-3xl font-semibold tracking-tight">Loom</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Construiește studii de research — ghiduri de interviu și chestionare
          — pornind de la un catalog de indicatori gold-standard, cu mapare
          automată pe obiectivele stakeholderilor.
        </p>
      </div>
      <div className="flex gap-3">
        <SignInButton>
          <button className="inline-flex h-10 items-center rounded-lg bg-indigo-9 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-10">
            Intră în cont
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:border-ring hover:text-foreground">
            Creează cont
          </button>
        </SignUpButton>
      </div>
    </div>
  );
}
