import { OS } from "@/os/OS";

/**
 * every desktop route shares this layout so JackOS (and its open windows)
 * survives the window manager's URL changes, pages just set metadata
 */
export default function OSLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <OS />
    </>
  );
}
