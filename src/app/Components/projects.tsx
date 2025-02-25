import Image from 'next/image';
import { LanguageWidget } from './languagewidget';
import { motion } from 'motion/react';
import { PopupModal } from './projectpopup';
import { ProjectType } from '../Data/types';
import { projects } from '../Data/projectdata';

const Project = ({ project, handleShowModal }: { project: ProjectType, handleShowModal: (project: ProjectType) => void }) => {
    return (
        <motion.div
            onClick={() => handleShowModal(project)}  // Open the modal when card is clicked
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            key={project.id}
            className="flex flex-col flex-shrink-0 bg-neutral-800 max-w-[30rem] max-h-[55rem] overflow-hidden border border-purple-900 rounded-md cursor-pointer hover:border-white"
        >
            <div>
                <Image
                    className='mx-auto w-[30rem] h-[15em]'
                    src={project.image}
                    alt='Image describing the given project'
                    width={5000}
                    height={5000}
                />
            </div>
            <div className='pt-3 pb-3 px-2'>
                <h3 className='text-2xl font-semibold text-purple-900 mb-4 text-center'>{project.title}</h3>
                <p className='text-neutral-400 text-center text-lg'>{project.description}</p>
            </div>
            <div className=''>
                <LanguageWidget languageinput={project.languages} />
            </div>
        </motion.div>
    );
};

export const ProjectGrid = () => {
    // Function to handle opening the modal
    const handleShowModal = (project: ProjectType) => {
        const modal = document.getElementById(`my_modal_${project.id}`) as HTMLDialogElement;
        if (modal) {
            modal.showModal(); // Open the specific modal for the selected project
        }
    };

    return (
        <div className="p-10 sticky top-0 flex justify-center">
            <div className='grid md:grid-cols-2 gap-20'>
                {projects.map((project: ProjectType) => (
                    <Project key={project.id} project={project} handleShowModal={handleShowModal} />
                ))}
            </div>

            {/* Render modals dynamically for each project */}
            {projects.map((project: ProjectType) => (
                <PopupModal key={project.id} project={project} />
            ))}
        </div>
    );
};