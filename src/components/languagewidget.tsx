const Language = ({ languageName }: { languageName: string }) => {    
  return(
    <div className="p-2 bg-purple-900 text-neutral-300 rounded-md">
        {languageName}
    </div>
    )
}

interface LanguageWidgetProps {
    languageinput: string[];
  }

  export const LanguageWidget: React.FC<LanguageWidgetProps> = ({ languageinput }) => {
    return (
      <div className="flex flex-col justify-end py-5 p-5 relative w-full">
        <div className="flex flex-wrap gap-5">
          {languageinput.map((language, index) => (
            <Language languageName={language} key={index} />
          ))}
        </div>
      </div>
    );
  };
  