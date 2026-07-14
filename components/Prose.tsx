import type { Locale } from "@/lib/site";
import type { ArticleBlock } from "@/lib/types";

/** Server-renders article body blocks into semantic HTML (all in initial HTML). */
export function Prose({ blocks, locale }: { blocks: ArticleBlock[]; locale: Locale }) {
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{block.text[locale]}</h2>;
          case "p":
            return <p key={i}>{block.text[locale]}</p>;
          case "note":
            return (
              <p key={i} className="prose-note">
                {block.text[locale]}
              </p>
            );
          case "list":
            return (
              <ul key={i}>
                {block.items[locale].map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
