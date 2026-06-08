export default function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-600">{title}</h2>
      <div className="w-16 h-[2px] bg-purple-600/50 mx-auto mt-4" />
      {subtitle && <p className="text-gray-400 mt-4">{subtitle}</p>}
    </div>
  );
}
