const Language = ({ languageName }: { languageName: string }) => {
  return (
    <span className="px-3 py-1 rounded-full bg-neutral-800 border border-purple-900/40 text-gray-300 text-sm">
      {languageName}
    </span>
  );
};

interface LanguageWidgetProps {
  languageinput: string[];
}

export const LanguageWidget: React.FC<LanguageWidgetProps> = ({ languageinput }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {languageinput.map((language, index) => (
        <Language languageName={language} key={index} />
      ))}
    </div>
  );
};
