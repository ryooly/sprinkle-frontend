import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, type PointerEvent as ReactPointerEvent } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ─── Card data ─────────────────────────────────────────────────────────── */
const CARDS: Record<string, CardItem[]> = {
  Recommendation: [
    {
      id: 1,
      user: "sprinkle-labs",
      repo: "sprinkle-notes",
      genre: "Notes",
      views: "3.5k",
      status: "active",
      claps: 218,
    },
    {
      id: 2,
      user: "flowco",
      repo: "flow-board-lite",
      genre: "Productivity",
      views: "12k",
      status: "active",
      claps: 941,
    },
    {
      id: 3,
      user: "datalens-io",
      repo: "datalens-core",
      genre: "Developer",
      views: "7.1k",
      status: "active",
      claps: 503,
    },
    {
      id: 4,
      user: "pixelcraft",
      repo: "pixelcraft-editor",
      genre: "Design",
      views: "4.8k",
      status: "archived",
      claps: 132,
    },
    {
      id: 5,
      user: "podwave-hq",
      repo: "podwave-2.1",
      genre: "AI",
      views: "9.2k",
      status: "active",
      claps: 677,
    },
    {
      id: 6,
      user: "codegarden",
      repo: "codegarden-sandbox",
      genre: "Developer",
      views: "2.3k",
      status: "archived",
      claps: 88,
    },
  ],
  Productivity: [
    {
      id: 11,
      user: "focusframe",
      repo: "focusframe-pro",
      genre: "Productivity",
      views: "18k",
      status: "active",
      claps: 1420,
    },
    {
      id: 12,
      user: "inboxzero",
      repo: "inboxzero-engine",
      genre: "Productivity",
      views: "6.4k",
      status: "active",
      claps: 390,
    },
    {
      id: 13,
      user: "dailybrief-ai",
      repo: "dailybrief-digest",
      genre: "AI",
      views: "21k",
      status: "active",
      claps: 1830,
    },
    {
      id: 14,
      user: "habitloop",
      repo: "habitloop-tracker",
      genre: "Productivity",
      views: "3.9k",
      status: "archived",
      claps: 104,
    },
    {
      id: 15,
      user: "meetingmind",
      repo: "meetingmind-llm",
      genre: "AI",
      views: "11k",
      status: "active",
      claps: 872,
    },
    {
      id: 16,
      user: "timeblock-io",
      repo: "timeblock-scheduler",
      genre: "Productivity",
      views: "5.7k",
      status: "active",
      claps: 441,
    },
  ],
  AI: [
    {
      id: 21,
      user: "palette-ai",
      repo: "palette-colorgen-2.0",
      genre: "AI",
      views: "42k",
      status: "active",
      claps: 3100,
    },
    {
      id: 22,
      user: "copyforge",
      repo: "copyforge-v3-instruct",
      genre: "Writing",
      views: "716k",
      status: "active",
      claps: 2270,
    },
    {
      id: 23,
      user: "voiceclone-ai",
      repo: "voiceclone-7B",
      genre: "AI",
      views: "31k",
      status: "active",
      claps: 1670,
    },
    {
      id: 24,
      user: "promptvault",
      repo: "promptvault-community",
      genre: "AI",
      views: "43k",
      status: "active",
      claps: 1600,
    },
    {
      id: 25,
      user: "scriptgenius",
      repo: "scriptgenius-34B-GGUF",
      genre: "AI",
      views: "9.5k",
      status: "archived",
      claps: 1040,
    },
    {
      id: 26,
      user: "autodoc-io",
      repo: "autodoc-codegen",
      genre: "Developer",
      views: "3.1M",
      status: "active",
      claps: 2070,
    },
  ],
  Notes: [
    {
      id: 31,
      user: "sprinkle-labs",
      repo: "sprinkle-notes",
      genre: "Notes",
      views: "3.5k",
      status: "active",
      claps: 218,
    },
    {
      id: 32,
      user: "mdstudio",
      repo: "markdown-studio",
      genre: "Writing",
      views: "8.2k",
      status: "active",
      claps: 560,
    },
    {
      id: 33,
      user: "quillpad",
      repo: "quillpad-oss",
      genre: "Writing",
      views: "5.1k",
      status: "active",
      claps: 310,
    },
    {
      id: 34,
      user: "jotter-hq",
      repo: "jotter-minimal",
      genre: "Notes",
      views: "1.9k",
      status: "archived",
      claps: 74,
    },
    {
      id: 35,
      user: "notesync",
      repo: "notesync-realtime",
      genre: "Notes",
      views: "4.4k",
      status: "active",
      claps: 289,
    },
    {
      id: 36,
      user: "inkwell-io",
      repo: "inkwell-editor",
      genre: "Writing",
      views: "2.7k",
      status: "archived",
      claps: 133,
    },
  ],
  Design: [
    {
      id: 41,
      user: "pixelcraft",
      repo: "pixelcraft-editor",
      genre: "Design",
      views: "4.8k",
      status: "active",
      claps: 380,
    },
    {
      id: 42,
      user: "palette-ai",
      repo: "palette-colorgen-2.0",
      genre: "AI",
      views: "42k",
      status: "active",
      claps: 3100,
    },
    {
      id: 43,
      user: "framekit-io",
      repo: "framekit-components",
      genre: "Design",
      views: "6.3k",
      status: "active",
      claps: 492,
    },
    {
      id: 44,
      user: "iconforge",
      repo: "iconforge-svg-pack",
      genre: "Design",
      views: "11k",
      status: "archived",
      claps: 720,
    },
    {
      id: 45,
      user: "colordrop",
      repo: "colordrop-palettes",
      genre: "Design",
      views: "3.2k",
      status: "active",
      claps: 195,
    },
    {
      id: 46,
      user: "vectora-design",
      repo: "vectora-studio",
      genre: "Design",
      views: "7.9k",
      status: "active",
      claps: 614,
    },
  ],
  Developer: [
    {
      id: 51,
      user: "codegarden",
      repo: "codegarden-sandbox",
      genre: "Developer",
      views: "2.3k",
      status: "active",
      claps: 88,
    },
    {
      id: 52,
      user: "volt-analytics",
      repo: "volt-dashboard-v2",
      genre: "Developer",
      views: "14k",
      status: "active",
      claps: 1050,
    },
    {
      id: 53,
      user: "logstream-io",
      repo: "logstream-tail",
      genre: "Developer",
      views: "5.5k",
      status: "archived",
      claps: 310,
    },
    {
      id: 54,
      user: "envsafe",
      repo: "envsafe-manager",
      genre: "Developer",
      views: "8.8k",
      status: "active",
      claps: 660,
    },
    {
      id: 55,
      user: "apiforge",
      repo: "apiforge-designer",
      genre: "Developer",
      views: "19k",
      status: "active",
      claps: 1430,
    },
    {
      id: 56,
      user: "deploykit-io",
      repo: "deploykit-ci",
      genre: "Developer",
      views: "3.3k",
      status: "archived",
      claps: 145,
    },
  ],
  Writing: [
    {
      id: 61,
      user: "quillpad",
      repo: "quillpad-oss",
      genre: "Writing",
      views: "5.1k",
      status: "active",
      claps: 310,
    },
    {
      id: 62,
      user: "copyforge",
      repo: "copyforge-v3-instruct",
      genre: "Writing",
      views: "716k",
      status: "active",
      claps: 2270,
    },
    {
      id: 63,
      user: "draftroom",
      repo: "draftroom-collab",
      genre: "Writing",
      views: "4.6k",
      status: "active",
      claps: 360,
    },
    {
      id: 64,
      user: "storyline-io",
      repo: "storyline-arc",
      genre: "Writing",
      views: "2.1k",
      status: "archived",
      claps: 97,
    },
    {
      id: 65,
      user: "essayist-ai",
      repo: "essayist-writer",
      genre: "AI",
      views: "6.7k",
      status: "active",
      claps: 520,
    },
    {
      id: 66,
      user: "proseflow",
      repo: "proseflow-editor",
      genre: "Writing",
      views: "3.0k",
      status: "active",
      claps: 241,
    },
  ],
};

type CardItem = {
  id: number;
  user: string;
  repo: string;
  genre: string;
  views: string;
  status: "active" | "archived";
  claps: number;
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "GitHub Clone — Dashboard" },
      {
        name: "description",
        content: "A GitHub-style dashboard with Top Repositories and Home sections.",
      },
      { property: "og:title", content: "GitHub Clone — Dashboard" },
      {
        property: "og:description",
        content: "A GitHub-style dashboard with Top Repositories and Home sections.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Index() {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeGenre, setActiveGenre] = useState("Recommendation");
  const [repositoryWidth, setRepositoryWidth] = useState(288);
  const [isResizing, setIsResizing] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const resizeStartRef = useRef({ pointerX: 0, width: 288 });

  const resizeRepository = (clientX: number) => {
    const nextWidth = resizeStartRef.current.width + clientX - resizeStartRef.current.pointerX;
    setRepositoryWidth(Math.min(480, Math.max(224, nextWidth)));
  };

  const handleResizeStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    resizeStartRef.current = {
      pointerX: event.clientX,
      width: repositoryWidth,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsResizing(true);
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchExpanded(false);
      }
    }

    if (searchExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      searchRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchExpanded]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b border-border bg-sidebar px-4">
        {/* Left: menu + logo */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted dark:hover:bg-muted/50 hover:text-foreground"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <a
            href="/"
            aria-label="Sprinkle home"
            className="flex items-center text-foreground transition-opacity hover:opacity-85"
          >
            <SprinkleLogo className="h-8 w-8" />
          </a>
        </div>

        {/* Search bar — expands to full header width on focus */}
        <div
          ref={searchContainerRef}
          className={[
            "relative flex flex-1 items-center transition-all duration-300 ease-out",
            searchExpanded ? "absolute inset-x-0 top-0 z-50 bg-sidebar px-4 py-2 shadow-xl" : "",
          ].join(" ")}
        >
          <div
            className={[
              "flex items-center gap-2 overflow-hidden rounded-md border border-border bg-card transition-all duration-200 ease-out dark:bg-background",
              searchExpanded
                ? "h-10 w-full border-ring ring-1 ring-ring px-3 shadow-lg"
                : "h-8 w-full max-w-md px-2.5 hover:border-muted-foreground/40 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring",
            ].join(" ")}
          >
            <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Type / to search"
              aria-label="Search"
              onFocus={() => setSearchExpanded(true)}
              className="h-full w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {!searchExpanded && (
              <kbd className="hidden shrink-0 items-center rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground sm:inline-flex dark:bg-card">
                /
              </kbd>
            )}
            {searchExpanded && (
              <button
                type="button"
                onClick={() => setSearchExpanded(false)}
                className="mr-1 shrink-0 rounded border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground dark:bg-card"
              >
                Esc
              </button>
            )}
          </div>
        </div>

        {/* Right: theme toggle + profile avatar — same h-8 rhythm as the search bar,
            so the expanded search overlay (z-50) slides over them without layout shifts. */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted dark:hover:bg-muted/50 hover:text-foreground"
          >
            {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Open user menu"
                className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-muted-foreground/50 hover:text-foreground data-[state=open]:border-muted-foreground/50 data-[state=open]:text-foreground"
              >
                <ProfileIcon className="h-full w-full p-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-1">
              {/* User profile header — detached from the menu items by a separator */}
              <DropdownMenuLabel className="flex items-center gap-2.5 rounded-md px-2 py-2 font-normal">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: "#8A3FFC" }}
                  aria-hidden="true"
                >
                  SL
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-semibold text-foreground">
                    Sprinkle Labs
                  </span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    @sprinkle-labs
                  </span>
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="-mx-1 mb-1 mt-0.5" />
              <DropdownMenuItem className="gap-2.5 rounded-md px-2 py-1.5 text-xs">
                <InventoryIcon className="h-4 w-4 text-muted-foreground" />
                <span>Inventory</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5 rounded-md px-2 py-1.5 text-xs">
                <SaveIcon className="h-4 w-4 text-muted-foreground" />
                <span>Save</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5 rounded-md px-2 py-1.5 text-xs">
                <HistoryIcon className="h-4 w-4 text-muted-foreground" />
                <span>History</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="-mx-1 my-1" />
              <DropdownMenuItem className="gap-2.5 rounded-md px-2 py-1.5 text-xs">
                <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex h-[calc(100vh-3.5rem)]">
        {/* Left sidebar: Top Repositories */}
        <aside
          className="hidden h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-5 lg:flex"
          style={{ width: repositoryWidth }}
        >
          <div className="mb-4 flex h-7 min-w-0 items-center justify-between gap-3">
            <h2 className="truncate text-sm font-semibold text-foreground">Top repositories</h2>
            <button
              type="button"
              aria-label="+ Premium"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #873CF2 0%, #0077FE 20%, #25BD4E 40%, #FEA302 60%, #FC3A66 80%, #01B0F1 100%)",
              }}
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-md border border-white/20 px-2.5 py-1 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_8px_rgba(135,60,242,0.35)] transition-all duration-300 hover:-translate-y-px hover:border-white/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_16px_rgba(0,119,254,0.45)] active:translate-y-0"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <PlusIcon className="relative h-3.5 w-3.5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-transform duration-200 group-hover:rotate-90" />
              <span className="relative font-medium tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                Premium
              </span>
            </button>
          </div>

          <div className="mb-3">
            <label htmlFor="repo-search" className="sr-only">
              Find a repository
            </label>
            <div className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 transition-colors hover:border-muted-foreground/40 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring dark:bg-background/80">
              <SearchIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                id="repo-search"
                type="text"
                placeholder="Find a repository..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-0.5">
            {(CARDS[activeGenre] ?? []).slice(0, 4).map((card) => (
              <AppCard key={card.id} card={card} hideAvatar />
            ))}
          </div>

          <button
            type="button"
            className="mt-3 text-left text-xs font-medium text-muted-foreground transition-colors hover:text-[#0969da] dark:hover:text-[#58a6ff]"
          >
            Show more
          </button>
        </aside>

        <div
          role="separator"
          aria-label="Resize repository column"
          aria-orientation="vertical"
          aria-valuemin={224}
          aria-valuemax={480}
          aria-valuenow={repositoryWidth}
          tabIndex={0}
          onPointerDown={handleResizeStart}
          onPointerMove={(event) => {
            if (isResizing) resizeRepository(event.clientX);
          }}
          onPointerUp={(event) => {
            event.currentTarget.releasePointerCapture(event.pointerId);
            setIsResizing(false);
          }}
          onPointerCancel={() => setIsResizing(false)}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              setRepositoryWidth((width) => Math.max(224, width - 16));
            }
            if (event.key === "ArrowRight") {
              setRepositoryWidth((width) => Math.min(480, width + 16));
            }
          }}
          className={[
            "group relative z-10 -mx-1.5 hidden w-3 shrink-0 touch-none cursor-col-resize items-stretch justify-center outline-none lg:flex",
            isResizing ? "after:bg-ring" : "",
          ].join(" ")}
        >
          <span className="w-px bg-transparent transition-colors group-hover:bg-ring group-focus-visible:bg-ring" />
          <span className="absolute top-1/2 grid h-9 w-3 -translate-y-1/2 place-items-center rounded-sm border border-border bg-card text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-foreground group-focus-visible:opacity-100">
            <ResizeGripIcon className="h-4 w-2" />
          </span>
        </div>

        {/* Center: Home */}
        <section className="flex min-w-0 flex-1 flex-col px-5 py-5">
          <div className="mb-4 flex h-7 items-center">
            <h2 className="text-sm font-semibold text-foreground">Home</h2>
          </div>
          <div className="mb-3 flex min-h-10 shrink-0 items-center gap-2 overflow-x-auto pb-1">
            {[
              "Recommendation",
              "Productivity",
              "AI",
              "Notes",
              "Design",
              "Developer",
              "Writing",
            ].map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => setActiveGenre(genre)}
                aria-pressed={activeGenre === genre}
                className={[
                  "h-8 shrink-0 cursor-pointer rounded-full border px-3.5 text-xs font-medium transition-all duration-150",
                  activeGenre === genre
                    ? "border-[#0969da]/40 bg-[#0969da]/10 text-[#0969da] shadow-[0_0_12px_rgba(9,105,218,0.12)] dark:border-[#388bfd]/60 dark:bg-[#388bfd]/15 dark:text-[#58a6ff] dark:shadow-[0_0_12px_rgba(56,139,253,0.15)]"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground/50 hover:bg-accent hover:text-foreground active:scale-95 dark:bg-card/60 dark:hover:bg-card",
                ].join(" ")}
              >
                {genre}
              </button>
            ))}
            <button
              type="button"
              aria-label="Filter genres"
              className="group ml-auto inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border bg-secondary px-3 text-xs font-medium text-secondary-foreground shadow-sm transition-all duration-150 hover:border-muted-foreground/40 hover:bg-accent hover:text-foreground active:translate-y-px"
            >
              <FilterIcon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
              <span>Filter</span>
            </button>
          </div>
          {/* ── Card grid: 2 cols × 3 rows (compact) ───────────────────────── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridAutoRows: "auto",
              gap: "8px",
            }}
          >
            {(CARDS[activeGenre] ?? []).slice(0, 6).map((card) => (
              <AppCard key={card.id} card={card} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ─── AppCard ──────────────────────────────────────────────────────────── */

const AVATAR_COLORS = [
  "#4f46e5",
  "#0284c7",
  "#059669",
  "#d97706",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#15803d",
] as const;

function avatarColor(user: string): string {
  return AVATAR_COLORS[user.charCodeAt(0) % AVATAR_COLORS.length];
}

function formatClaps(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function AppCard({ card, hideAvatar }: { card: CardItem; hideAvatar?: boolean }) {
  const color = avatarColor(card.user);
  const initials = card.user.slice(0, 2).toUpperCase();

  // Sidebar cards: original card surface fading into a silvery tone (token-driven,
  // so it reads subtly in both themes). Home cards keep a solid surface that
  // stands clear of the page background.
  const surface = hideAvatar
    ? "bg-gradient-to-r from-card via-card/95 to-secondary hover:to-accent"
    : "bg-card hover:bg-accent/40 dark:bg-card dark:hover:bg-popover";

  return (
    <button
      type="button"
      className={[
        "group flex w-full items-start gap-3 overflow-hidden rounded-lg border border-border px-3.5 py-3 text-left shadow-sm transition-all duration-150 hover:border-foreground/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4)] dark:hover:border-muted-foreground/40",
        surface,
      ].join(" ")}
    >
      {/* Avatar — omitted in compact sidebar cards */}
      {!hideAvatar && (
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{ background: color }}
          aria-hidden="true"
        >
          {initials}
        </span>
      )}

      {/* Content */}
      <span className="min-w-0 flex-1">
        {/* username/repo title */}
        <span className="block truncate font-mono text-[13px] leading-snug">
          <span className="text-muted-foreground transition-colors group-hover:text-foreground/70">
            {card.user}
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-foreground/90 transition-colors group-hover:text-foreground">
            {card.repo}
          </span>
        </span>

        {/* Metadata row — fixed 2×2 grid so every card keeps an identical height */}
        <span className="mt-1.5 grid h-[36px] shrink-0 grid-cols-2 content-start gap-x-3 gap-y-1 overflow-hidden font-mono">
          {/* Genre */}
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground dark:text-muted-foreground/70">
            <CardGenreIcon genre={card.genre} className="h-3 w-3 shrink-0" />
            {card.genre}
          </span>

          {/* Views */}
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground dark:text-muted-foreground/70">
            <CardEyeIcon className="h-3 w-3 shrink-0" />
            {card.views}
          </span>

          {/* Status */}
          <span
            className={[
              "inline-flex items-center gap-1 text-[11px] font-semibold",
              card.status === "active"
                ? "text-emerald-600 dark:text-emerald-500"
                : "text-muted-foreground dark:text-muted-foreground/50",
            ].join(" ")}
          >
            <CardStatusIcon status={card.status} className="h-3 w-3 shrink-0" />
            {card.status === "active" ? "Active" : "Archived"}
          </span>

          {/* Claps */}
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground dark:text-muted-foreground/70">
            <CardClapsIcon className="h-3 w-3 shrink-0" />
            {formatClaps(card.claps)}
          </span>
        </span>
      </span>
    </button>
  );
}

/* ─── Card meta icons ───────────────────────────────────────────────────── */

function CardGenreIcon({ genre, className }: { genre: string; className?: string }) {
  // Each genre gets a distinct icon path
  const paths: Record<string, string> = {
    Productivity:
      "M13 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM6 10.5 3.5 8 4.56 6.94 6 8.38l3.94-3.94L11 5.5 6 10.5Z",
    AI: "M8 1a1 1 0 0 1 1 1v1h2.5a.5.5 0 0 1 0 1H9v1a1 1 0 0 1-2 0V4H4.5a.5.5 0 0 1 0-1H7V2a1 1 0 0 1 1-1Zm5.5 5.5a.5.5 0 0 1 0 1H13v.5a1 1 0 0 1-1 1h-.5v1.5a.5.5 0 0 1-1 0V9H10a1 1 0 0 1-1-1v-.5H2.5a.5.5 0 0 1 0-1H9V6a1 1 0 0 1 1-1h.5V3.5a.5.5 0 0 1 1 0V5h.5a1 1 0 0 1 1 1v.5h.5Z",
    Notes:
      "M11.5 1h-7A1.5 1.5 0 0 0 3 2.5v11A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 11.5 1ZM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1Zm0 3h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1Zm0 3h4a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1Z",
    Design:
      "M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 1.5a5.5 5.5 0 1 1 0 11A5.5 5.5 0 0 1 8 2.5Zm0 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-3 5a3 3 0 0 1 6 0H5Z",
    Developer:
      "M5.78 5.22a.75.75 0 0 0-1.06 1.06L6.94 8.5 4.72 10.72a.75.75 0 1 0 1.06 1.06l2.75-2.75a.75.75 0 0 0 0-1.06L5.78 5.22ZM9.25 10.5a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5h-2Z",
    Writing:
      "M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354l-1.086-1.086Z",
  };
  const d = paths[genre] ?? paths["Developer"];
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function CardEyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 2C4.5 2 1.5 5 .5 8c1 3 4 6 7.5 6s6.5-3 7.5-6C14.5 5 11.5 2 8 2Zm0 9.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm0-5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
    </svg>
  );
}

function CardStatusIcon({
  status,
  className,
}: {
  status: "active" | "archived";
  className?: string;
}) {
  if (status === "active") {
    // Filled circle (pulse-green dot)
    return (
      <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <circle cx="8" cy="8" r="5" />
      </svg>
    );
  }
  // Lock icon for archived
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 7V5a4 4 0 0 1 8 0v2h.5A1.5 1.5 0 0 1 14 8.5v5A1.5 1.5 0 0 1 12.5 15h-9A1.5 1.5 0 0 1 2 13.5v-5A1.5 1.5 0 0 1 3.5 7H4Zm2 0h4V5a2 2 0 1 0-4 0v2Zm2 3a1 1 0 0 0-1 1v.5a1 1 0 0 0 2 0V11a1 1 0 0 0-1-1Z" />
    </svg>
  );
}

function CardClapsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8.5 1.5a1 1 0 0 1 1.415 0l.585.585.585-.585a1 1 0 0 1 1.415 1.415l-.585.585.585.585a1 1 0 0 1-1.415 1.415L10.5 5l-.585.585A1 1 0 0 1 8.5 4.17V3.5l-.585.585a1 1 0 0 1-1.415 0L6 3.5v.67a1 1 0 0 1-1.415 1.415L4 5l-.585.585A1 1 0 0 1 2 4.17V3.5a1 1 0 0 1 1-1h.17l.415-.415a1 1 0 0 1 1.415 0L5.585 2.5 6 2.085A1 1 0 0 1 7 1.75V1.5h1.5ZM3 7.5A4.5 4.5 0 0 0 7.5 12h1A4.5 4.5 0 0 0 13 7.5V7h-1.5v.5A3 3 0 0 1 8.5 10.5h-1A3 3 0 0 1 4.5 7.5V7H3v.5Z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 3.5h11M2.5 8h7M2.5 12.5h11" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.472 3.472a.75.75 0 1 1-1.06 1.06l-3.472-3.472ZM11.5 7a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Z" />
    </svg>
  );
}

function SprinkleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Central ring uses currentColor so it stays legible on the dark header. */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42 30h12a12 12 0 0 1 12 12v12a12 12 0 0 1-12 12H42a12 12 0 0 1-12-12V42a12 12 0 0 1 12-12Zm3 10a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5v-6a5 5 0 0 0-5-5h-6Z"
      />
      {/* Satellite sprinkles */}
      <circle cx="81" cy="48" r="8" fill="#FFA400" />
      <circle cx="71" cy="71" r="8" fill="#00B2F0" />
      <circle cx="25" cy="25" r="8" fill="#8A3FFC" />
      <path d="M27 69 21 75" stroke="#F43F6B" strokeWidth="16" strokeLinecap="round" />
      <path d="M21 48H13" stroke="#22B558" strokeWidth="16" strokeLinecap="round" />
      <path d="M69 27 75 21" stroke="#0A7CFF" strokeWidth="16" strokeLinecap="round" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.773-1.591 1.591M5.25 12H3m4.707-7.05-1.591 1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
  );
}

function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm0 7c2.145 0 4.057.74 5.5 1.982-.79 1.786-2.653 3.268-5.5 3.268-2.847 0-4.71-1.482-5.5-3.268C3.943 11.24 5.855 10.5 8 10.5Z" />
    </svg>
  );
}

/* ─── Profile menu item icons (Octicons-style, 16×16) ──────────────────── */

function InventoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8.06 2 2 5.08v6.4a.25.25 0 0 0 .37.22L8 9.5l5.63 2.2a.25.25 0 0 0 .37-.22v-6.4L8.06 2ZM1.77 4.03a1.75 1.75 0 0 1 1.55 0L8 6.28l4.68-2.25a1.75 1.75 0 0 1 1.9.17c.53.42.92 1.04.92 1.77v6.4a1.75 1.75 0 0 1-2.32 1.66L8 11.72l-5.18 2.31A1.75 1.75 0 0 1 .5 12.37v-6.4c0-.73.39-1.35.92-1.77a1.75 1.75 0 0 1 .35-.17Z" />
    </svg>
  );
}

function SaveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M2 2.75C2 1.784 2.784 1 3.75 1h8.5c.966 0 1.75.784 1.75 1.75v11.5a.75.75 0 0 1-1.124.65L8 12.822l-4.876 2.078A.75.75 0 0 1 2 14.25V2.75Zm3.5-.25a.25.25 0 0 0-.25.25v9l3.158-1.348a.75.75 0 0 1 .684 0L12.75 12V2.75a.25.25 0 0 0-.25-.25h-7Z" />
    </svg>
  );
}

function HistoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M1.643 3.143.427 1.927A.25.25 0 0 0 .025 2v2.75a.25.25 0 0 0 .25.25h2.75a.25.25 0 0 0 .073-.403L1.97 3.298a6.5 6.5 0 1 1-1.18 4.458.75.75 0 1 0-1.49.19A8 8 0 1 0 1.643 3.143ZM7.25 4.75v4.5a.75.75 0 0 0 1.172.623l2.75-1.833a.75.75 0 1 0-.836-1.252L8.75 7.612V4.75a.75.75 0 0 0-1.5 0Z" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492ZM6.054 8a1.946 1.946 0 1 1 3.892 0 1.946 1.946 0 0 1-3.892 0Z" />
      <path d="M9.835.886 10.53.276a.75.75 0 0 1 1.016.093l1.09 1.255a.75.75 0 0 1-.093 1.067l-.65.52a4.7 4.7 0 0 1 .958.94l.627-.525a.75.75 0 0 1 1.073.085l.922 1.38a.75.75 0 0 1-.223 1.002l-.7.48a4.8 4.8 0 0 1 0 1.12l.7.479a.75.75 0 0 1 .224 1.002l-.923 1.38a.75.75 0 0 1-1.073.085l-.626-.525c-.263.363-.583.684-.941.95l.65.52a.75.75 0 0 1 .093 1.067l-1.09 1.255a.75.75 0 0 1-1.016.093l-.696-.61a4.6 4.6 0 0 1-1.194 0l-.695.61a.75.75 0 0 1-1.017-.093l-1.089-1.255a.75.75 0 0 1 .093-1.067l.65-.52a4.7 4.7 0 0 1-.941-.95l-.627.525a.75.75 0 0 1-1.073-.085l-.921-1.38a.75.75 0 0 1 .223-1.002l.7-.48a4.8 4.8 0 0 1 0-1.12l-.7-.479a.75.75 0 0 1-.224-1.002l.923-1.38a.75.75 0 0 1 1.073-.085l.626.525c.263-.363.583-.684.941-.95l-.65-.52a.75.75 0 0 1-.093-1.067l1.09-1.255a.75.75 0 0 1 1.016-.093l.696.61c.392-.067.8-.067 1.194 0ZM8 1.8a6.2 6.2 0 0 0-.69.04l-.925-.81a2.25 2.25 0 0 0-3.048.279L2.238 2.564a2.25 2.25 0 0 0 .279 3.048l.81.925A6.2 6.2 0 0 0 3.055 8a6.2 6.2 0 0 0 .272 1.463l-.81.925a2.25 2.25 0 0 0-.279 3.048l1.099 1.255a2.25 2.25 0 0 0 3.048.279l.925-.81A6.2 6.2 0 0 0 8 14.2a6.2 6.2 0 0 0 1.463-.272l.925.81a2.25 2.25 0 0 0 3.048-.279l1.099-1.255a2.25 2.25 0 0 0-.279-3.048l-.81-.925c.176-.47.272-.977.272-1.463a6.2 6.2 0 0 0-.272-1.463l.81-.925a2.25 2.25 0 0 0 .279-3.048L13.436 2.564a2.25 2.25 0 0 0-3.048-.279l-.925.81A6.2 6.2 0 0 0 8 1.8Z" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M7.75 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 7.75 2Z" />
    </svg>
  );
}

function RepoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.125-1.5a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1 0-1.5Zm-2 4a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5Z" />
    </svg>
  );
}

function ResizeGripIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 8 16" fill="currentColor" aria-hidden="true">
      <circle cx="2" cy="5" r="1" />
      <circle cx="6" cy="5" r="1" />
      <circle cx="2" cy="11" r="1" />
      <circle cx="6" cy="11" r="1" />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 3h12M4 8h8M6.5 13h3" />
    </svg>
  );
}
