import Image from "next/image";
import { LanguageWidget } from "./languagewidget";
import type { ProjectType } from "../Data/types";


export const PopupModal = ({ project }: { project: ProjectType }) => {
    return (
        <dialog id={`my_modal_${project.id}`} className="modal">
            <div className="modal-box bg-neutral-800 max-w-[75rem] max-h-[80rem] overflow-hidden border border-purple-900 rounded-md cursor-pointer p-0">
                <div className="relative w-[80rem] h-[20rem] overflow-hidden">
                    <Image
                        className='absolute w-full h-full top-0 left-0 object-cover'
                        src={project.image}
                        alt='Image describing the given project'
                        width={5000}
                        height={5000}
                    />
                    </div>
                    <div className='pt-3 pb-3 px-2'>
                        <h3 className='text-3xl font-semibold text-purple-900 mb-4 text-center'>{project.title}</h3>
                        {project.longdescription.map((paragraph, index) => (
                            <div key={index}>
                            <p className='text-neutral-400 text-center text-lg'>{paragraph}</p>
                            <br />
                            </div>
                        ))}
                    </div>
                    <div className=''>
                        <LanguageWidget languageinput={project.languages} />
                    </div>
            </div>
            <form method="dialog" className="modal-backdrop">
            <button>close</button>
            </form>
        </dialog>
    );
};
