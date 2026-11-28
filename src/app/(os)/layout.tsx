import { OS } from "@/os/OS";
import { THEME_SCRIPT } from "@/os/storage";

/**
 * every desktop route shares this layout so JackOS (and its open windows)
 * survives the window manager's URL changes, pages just set metadata
 */
export default function OSLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      {children}
      <OS />
    </>
  );
}
