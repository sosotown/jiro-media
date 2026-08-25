import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-heading text-2xl font-bold tracking-tight text-foreground group-hover:text-accent-strong transition-colors">
            二郎系マガジン
          </span>
          <span className="hidden text-xs text-muted sm:inline">
            二郎系食べ歩き記録
          </span>
        </Link>
      </div>
    </header>
  );
}
