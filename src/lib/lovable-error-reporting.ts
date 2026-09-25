// Centralized error-reporting hook used by the app's error boundaries.
//
// The root route's ErrorComponent imports `reportLovableError` from this module,
// but the file was missing from the project, which broke the build. This is a
// minimal, dependency-free implementation.
//
// It deduplicates by error identity (React re-invokes effects in dev / on
// re-render, so the same error should not be reported repeatedly) and forwards
// to `console.error`, which `src/lib/error-capture.ts` already augments with
// full stack + cause-chain expansion during SSR. No remote endpoint is
// configured for this project, so nothing is sent over the network.

type ErrorMeta = Record<string, unknown>;

const reported = new WeakSet<object>();

export function reportLovableError(error: unknown, meta?: ErrorMeta): void {
  if (typeof error === "object" && error !== null) {
    if (reported.has(error)) return;
    reported.add(error);
  }

  console.error("[reportLovableError]", meta ?? {}, error);
}
