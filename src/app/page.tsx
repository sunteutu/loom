import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { FlaskConical } from "lucide-react";
import { HomeDashboard } from "@/components/HomeDashboard";
import { HomeHero } from "@/components/HomeHero";

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

/* Pe tema Clasic landing-ul rămâne cel sobru din live; pe temele custom
   intră hero-ul din mockup. CSS-ul comută variantele pe `html[data-theme]`. */
function Landing() {
  return (
    <>
      <div className="home-when-classic">
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-3">
            <FlaskConical aria-hidden className="h-7 w-7 text-indigo-11" />
          </div>
          <div className="max-w-lg">
            <h1 className="text-3xl font-semibold tracking-tight">Loom</h1>
            <p className="mt-2 text-base text-muted-foreground">
              Construiește studii de research — ghiduri de interviu și
              chestionare — pornind de la un catalog de indicatori
              gold-standard, cu mapare automată pe obiectivele stakeholderilor.
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
      </div>

      <div className="home-when-themed">
        <HomeHero>
          <SignInButton>
            <button className="loom-btn loom-btn-primary bg-indigo-9">
              Intră în cont
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="loom-btn loom-btn-secondary">
              Creează cont
            </button>
          </SignUpButton>
        </HomeHero>

        <section aria-label="Ce face loom" className="mt-14">
          <div className="loom-cards">
            <div className="loom-card bg-card">
              <div className="loom-chip">🗺️</div>
              <h3>Mapare</h3>
              <p>
                Lipește întrebările stakeholderilor și mapează-le pe indicatori.
              </p>
              <div className="loom-card-meta">
                <span className="loom-badge loom-badge-warm">calitativ</span>
              </div>
            </div>
            <div className="loom-card bg-card">
              <div className="loom-chip alt">🎙️</div>
              <h3>Ghiduri</h3>
              <p>Ghiduri de interviu cu timing, verificări și export Word.</p>
              <div className="loom-card-meta">
                <span className="loom-badge loom-badge-accent">interviuri</span>
              </div>
            </div>
            <div className="loom-card bg-card">
              <div className="loom-chip">📊</div>
              <h3>Chestionare</h3>
              <p>Sondaje cantitative cu estimare LOI și lint automat.</p>
              <div className="loom-card-meta">
                <span className="loom-badge loom-badge-neutral">
                  cantitativ
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
