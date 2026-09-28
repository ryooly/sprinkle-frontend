import { createFileRoute } from "@tanstack/react-router";
import { FaChrome, FaEdge, FaFirefox, FaOpera, FaSafari } from "react-icons/fa";
import {
  AppWindow,
  Bookmark,
  Boxes,
  Copy,
  Download,
  GitBranch,
  Globe,
  Info,
  MessageCircle,
  MoreVertical,
  Pencil,
  Scale,
  Sparkles,
  UserPlus,
} from "lucide-react";

type ExtensionSearch = { user?: string };

export const Route = createFileRoute("/extensions/$slug")({
  component: ExtensionDetail,
  // Uploader username is passed via ?user= from the card links
  validateSearch: (search: Record<string, unknown>): ExtensionSearch => {
    const user = search["user"];
    return typeof user === "string" ? { user } : {};
  },
  head: () => ({
    meta: [{ title: "Extension — Sprinkle" }],
  }),
});

/* ─── Placeholder data (basic structure only — wire to real API later) ─── */

const EXT = {
  owner: "Edge0",
  name: "Audio8-ASR-Infinite",
  likes: "1.32k",
  followers: "1.25k",
  license: "apache-2.0",
  downloadsLastMonth: "19,963",
};

/* Real hashtags for this extension — kept short on purpose */
const HASHTAGS = ["#speech-recognition", "#streaming", "#audio", "#realtime", "#ai"];

/* Browsers this extension supports — official brand marks from react-icons */
const BROWSERS = [
  { name: "Chrome", Logo: FaChrome, color: "#4285F4" },
  { name: "Edge", Logo: FaEdge, color: "#0F6CBD" },
  { name: "Firefox", Logo: FaFirefox, color: "#FF7139" },
  { name: "Opera Mini", Logo: FaOpera, color: "#FF1B2D" },
  { name: "Safari", Logo: FaSafari, color: "#1B88EE" },
];

function ExtensionDetail() {
  const { slug } = Route.useParams();
  const { user } = Route.useSearch();
  // Uploader username comes from the clicked card; placeholder as fallback
  const owner = user ?? EXT.owner;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Red section — extension key information ─────────────────────── */}
      <header className="border-b border-border bg-sidebar">
        <div className="mx-auto max-w-7xl px-5 py-4">
          {/* Title row */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="flex items-center gap-2 font-mono text-base font-semibold">
              <Boxes className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">{owner}</span>
              <span className="text-muted-foreground/50">/</span>
              <span className="text-foreground">{slug || EXT.name}</span>
              <button
                type="button"
                aria-label="Copy name"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-muted/50"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </h1>

            <button
              type="button"
              className="inline-flex h-7 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-foreground dark:bg-card/60"
            >
              <ThumbsUpGradient className="h-3.5 w-3.5" />
              Like <span className="font-semibold text-foreground">{EXT.likes}</span>
            </button>
            <button
              type="button"
              className="inline-flex h-7 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-foreground dark:bg-card/60"
            >
              <UserPlus className="h-3.5 w-3.5" />
              Follow <span className="font-semibold text-foreground">{EXT.followers}</span>
            </button>
          </div>

          {/* Hashtags + license */}
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            {HASHTAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                [{tag}]
              </button>
            ))}
            <span className="inline-flex h-6 items-center gap-1 rounded-md border border-border bg-card px-2 text-[11px] text-muted-foreground dark:bg-card/60">
              <Scale className="h-3 w-3" />
              License: {EXT.license}
            </span>
          </div>

          {/* Tabs + actions */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <nav className="flex items-center gap-5 text-sm">
              <button
                type="button"
                className="border-b-2 border-foreground pb-1.5 font-medium text-foreground"
              >
                Model card
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 border-b-2 border-transparent pb-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Files and versions
                <span className="rounded bg-muted px-1 py-0.5 font-mono text-[10px] text-muted-foreground dark:bg-card">
                  ⌘ xet
                </span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 border-b-2 border-transparent pb-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                Community <span className="font-mono text-xs">2</span>
              </button>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="More actions"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground dark:bg-card/60"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:border-muted-foreground/40 dark:bg-card/60"
              >
                <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
                Saved
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:border-muted-foreground/40 dark:bg-card/60"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                Repository
              </button>
              <button
                type="button"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #873CF2 0%, #0077FE 20%, #25BD4E 40%, #FEA302 60%, #FC3A66 80%, #01B0F1 100%)",
                }}
                className="group relative inline-flex h-8 items-center gap-1.5 overflow-hidden rounded-md border border-white/20 px-3 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_8px_rgba(135,60,242,0.35)] transition-all duration-300 hover:-translate-y-px hover:border-white/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_16px_rgba(0,119,254,0.45)] active:translate-y-0"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <Download className="relative h-3.5 w-3.5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                <span className="relative font-medium tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  Download
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body: white section (description) + green section (stats) ──── */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* White section — description and license */}
        <section className="min-w-0 rounded-lg border border-border bg-card p-5 shadow-sm dark:bg-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{EXT.name}</h2>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit model card
            </button>
          </div>

          {/* Badge strip — placeholder badges until real links exist */}
          <div className="mb-5 flex flex-wrap items-center justify-center gap-1.5">
            {[
              { label: "HUGGING FACE", tone: "bg-muted text-foreground" },
              { label: EXT.name.toUpperCase(), tone: "bg-[#ffd21e] text-[#2f1670]" },
              { label: "GITHUB", tone: "bg-foreground text-background" },
              { label: "ARXIV", tone: "bg-muted text-foreground" },
              { label: "COMING SOON", tone: "bg-rose-600 text-white" },
              { label: "LICENSE APACHE 2.0", tone: "bg-sky-600 text-white" },
            ].map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex h-6 items-center rounded-sm px-2.5 font-mono text-[10px] font-bold tracking-wide ${badge.tone}`}
              >
                {badge.label}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-foreground/90">
            <strong>{EXT.name}</strong> is a native streaming speech recognition model built to be
            as responsive as possible. It offers a selectable audio clock (80/120/160 ms) and a
            transcription delay (240–560 ms). With our adapted vLLM build it transcribes
            unlimited-length audio <strong>24/7</strong> without drifting.
          </p>

          <h3 className="mb-2 mt-5 text-base font-semibold">Highlights</h3>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
            <li>
              <strong>Super responsive</strong> — the native streaming architecture decodes 12.5
              times per second.
            </li>
            <li>
              <strong>Unlimited-length transcription</strong> — a rolling KV Cache keeps both memory
              and latency constant, even in 24/7 operation.
            </li>
            <li>
              <strong>Selectable streaming clock</strong> — one text token per clock step (12.5 /
              8.3 / 6.25 decisions per second), balancing perception granularity and resource cost.
            </li>
            <li>
              <strong>Configurable transcription delay</strong> — set how much delay to trade for
              accuracy.
            </li>
            <li>
              <strong>Semantic VAD</strong> — distinguishes thinking pauses, stuttering and real end
              of turn.
            </li>
          </ul>

          {/* License block */}
          <h3 className="mb-2 mt-6 text-base font-semibold">License</h3>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Scale className="h-4 w-4 shrink-0" />
            Released under the <span className="font-medium text-foreground">Apache-2.0</span>{" "}
            license — free for commercial and personal use.
          </p>
        </section>

        {/* Green section — download details and statistics */}
        <aside className="flex min-w-0 flex-col gap-5">
          {/* Downloads + sparkline */}
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Downloads last month</div>
                <div className="text-xl font-semibold">{EXT.downloadsLastMonth}</div>
              </div>
              {/* Placeholder sparkline */}
              <svg
                viewBox="0 0 120 36"
                className="h-9 w-28 shrink-0 text-[#8a3ffc]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2 32h80M92 32l6-22 6 18 8-8" />
              </svg>
            </div>
          </div>

          {/* Browser compatibility */}
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <AppWindow className="h-4 w-4 text-muted-foreground" />
              Browser
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {BROWSERS.map(({ name, Logo, color }) => (
                <span
                  key={name}
                  className="inline-flex h-6 items-center gap-1.5 rounded-md border border-border bg-background px-2 text-[11px] text-muted-foreground"
                >
                  <Logo size={14} style={{ color }} />
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Inference providers */}
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              Inference Providers
              <span className="rounded bg-[#388bfd]/15 px-1 py-0.5 text-[10px] font-semibold text-[#58a6ff]">
                NEW
              </span>
            </div>
            <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
              Automatic Speech Recognition
            </div>
            <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-background px-2.5 py-2 text-[11px] text-muted-foreground">
              This model isn&apos;t deployed by any Inference Provider.
              <button
                type="button"
                className="inline-flex h-6 shrink-0 items-center gap-1 rounded-md border border-border bg-card px-2 font-medium text-foreground transition-colors hover:border-muted-foreground/40"
              >
                Ask for provider support
              </button>
            </div>
          </div>

          {/* Model tree */}
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              Model tree for {owner}/{EXT.name}
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between pl-4 text-xs">
              <span className="text-muted-foreground">Quantizations</span>
              <span className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2">
                2 models
              </span>
            </div>
          </div>

          {/* Spaces using */}
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              Spaces using {owner}/{EXT.name}
              <span className="font-mono text-xs text-muted-foreground">2</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["embed1/hfviewer", "hugging-apps/audio8-asr-infinite-demo"].map((space) => (
                <span
                  key={space}
                  className="inline-flex h-6 items-center gap-1.5 rounded-md border border-border bg-background px-2 font-mono text-[11px] text-muted-foreground"
                >
                  {space}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

/* Like icon — lucide thumbs-up geometry painted with the same rainbow
   gradient as the Download button (applied as a stroke gradient) */
function ThumbsUpGradient({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#thumbs-up-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="thumbs-up-gradient"
          x1="0"
          y1="0"
          x2="24"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#873CF2" />
          <stop offset="0.2" stopColor="#0077FE" />
          <stop offset="0.4" stopColor="#25BD4E" />
          <stop offset="0.6" stopColor="#FEA302" />
          <stop offset="0.8" stopColor="#FC3A66" />
          <stop offset="1" stopColor="#01B0F1" />
        </linearGradient>
      </defs>
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
      <path d="M7 10v12" />
    </svg>
  );
}

/* GitHub mark — lucide dropped brand icons in v1, so it lives here instead */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
