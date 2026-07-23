// Helper from the Next.js "Preventing Flash" guide: the script executes
// during HTML parsing on the server-rendered document, but is inert
// (text/plain) when React renders it client-side on soft navigations.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
