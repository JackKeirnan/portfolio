type LanguageType = {
    languageName: string,
    id: number
    // add more informatino about languages here
}

const Language = ({language}: {language: LanguageType}) => {
    return(
        <div></div>
    )
}

export const languagewidget = (languageinput : string[]) => {

    const foundList : LanguageType[] = [];

    for (let i = 0; i < languageinput.length; i++){

    }

    return( 
        <div className="py-20 p-5 relative h-[300vh]">
            <div className='sticky top-0 flex h-screen items-center overflow-hidden w-full'>
                <div className='bg-gray-500 flex gap-4 w-full'>
                    {foundList.map((language: LanguageType ) => {
                        return <Language language={language} key={language.id} />;
                    })}
                </div>
            </div>
        </div>



)}