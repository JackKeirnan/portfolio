export type TimelineItem = {
  title: string;
  subtitle: string;
  description: string;
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      {/* The vertical line running down the timeline */}
      <div className="absolute left-2 top-2 bottom-2 w-px bg-purple-900/40" aria-hidden />

      <ul className="space-y-10">
        {items.map((item, index) => (
          <li key={index} className="relative pl-10">
            {/* Node dot, centered on the line (line is at left-2 = 8px) */}
            <span className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-purple-600 ring-4 ring-neutral-950" />
            <h3 className="text-xl font-semibold text-purple-400">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
            <p className="text-gray-400 mt-3 leading-relaxed">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
