import { useEffect } from "react";

import { SITE_TITLE } from "@/lib/meta";

/**
 * Minimal per-route metadata manager (no external helmet dependency).
 * Updates <title> and the meta description; every route passes a readable title.
 */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Hive Foundry` : SITE_TITLE;
    if (description) {
      const el = document.querySelector('meta[name="description"]');
      el?.setAttribute("content", description);
    }
  }, [title, description]);
}
