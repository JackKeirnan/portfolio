import Image from 'next/image';
import {motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';

type ProjectType = {
    image: string;
    title: string;
    description: string
    id: number;
    // add a languages used here list/string ??
}

const projects: ProjectType[] = [
    {
        image: '/Images/500px.jpg',
        title: "Project 1",
        description: "project 1 description project 1 description project 1 description project 1 description project 1 description project 1 description project 1 description project 1 description project 1 description project 1 description project 1 description project 1 description project 1 description project 1 description project 1 description project 1 description",
        id: 1
    },
    {
        image: '/Images/500px.jpg',
        title: "Project 2",
        description: "project 2 description",
        id: 2
    },
    {
        image: '/Images/500px.jpg',
        title: "Project 3",
        description: "project 3 description",
        id: 3
    },
    {
        image: '/Images/500px.jpg',
        title: "Project 4",
        description: "project 4 description",
        id: 4
    }
]

const Project =({project}: {project: ProjectType}) => {
    return(
        <div
        key={project.id}
        className="flex flex-col flex-shrink-0 bg-gray-800 max-w-[30rem] max-h-[40rem] overflow-hidden border border-white-5"
        >
            <div className="image-container">
                <Image 
                className='mx-auto w-[30rem] h-[22.5rem]'
                src={project.image} 
                alt='Image describing the given project' 
                width={500} 
                height={500}>
                </Image>
            </div>
            <div
            className='pt-3 pb-3 px-2'>
                <h3 className='text-xl font-semibold text-white mb-4 text-center'>{project.title}</h3>
                <p className='text-gray-400 text-center'>{project.description}</p>
            </div>
        </div>
        
    )
  }

  export const ProjectGrid = () => {
    return( 
        <div className="p-10 sticky top-0 flex justify-center">
            <div className='grid grid-cols-2 gap-10'>
                {projects.map((project: ProjectType) => {
                    return <Project project={project} key={project.id} />;
                })}
            </div>
        </div>
    );
};
