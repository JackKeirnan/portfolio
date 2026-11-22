import { OS } from "@/os/OS";

/**
 * Every desktop route shares this layout, so JackOS (and its open windows)
 * survives the URL changes the window manager makes. Pages only set metadata.
 */
export default function OSLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <OS />
    </>
  );
}
