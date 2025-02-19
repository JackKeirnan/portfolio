import Image from 'next/image';
import { LanguageWidget } from './languagewidget';


type ProjectType = {
    image: string;
    title: string;
    description: string;
    id: number;
    languages: string[];
}

const projects: ProjectType[] = [
    {
        image: '/Images/UniWebHome.png',
        title: "University Website Project",
        description: "A university project that tasked us with creating a website themed around the UN's sustainability goals. We created a recipe browsing website to tackle healthy eating, resulting in us using an API to access thousands of recipes to provide the user with a clear and easy way to locate, favourite and rate their respective favourite recipes.",
        id: 1,
        languages : ["Java", "HTML", "CSS", "JavaScript", "React", "SpringBoot"]
    },
    {
        image: '/Images/500px.jpg',
        title: "Aritifical Intelligence Internship",
        description: "I worked as an intern software developer at AuraVision, learning and experiencing all the aspects and qualities required to run a small-scale start-up tech company. I was given and completed tasks such as creating a meta-data parser to handle their large intake of information via email and parse it into their respective databases.",
        id: 2,
        languages : ["JavaScript", "Serverless", "AWS"]
    },
    {
        image: '/Images/CalicoWebsite.png',
        title: "Freelance Web Development and Portfolio",
        description: "Worked with several clients to design/redesign their websites according to their liking. Held meetings to discuss what technology they wanted to use and how the process would be undertaken. Maintained frequent communication with each client to ensure that they were happy with the final product and also offered to continue the maintenance of some of the clients websites. My portfolio was created in order to showcase the work that I have done and also allow myself to easily update it with new personal projects that I complete in my free time.",
        id: 3,
        languages : ["SquareSpace", "Wix", "Webflow", "JavaScript", "NextJS", "Tailwind"]
    },
    {
        image: '/Images/UniGameSheet.png',
        title: "Personal Video Game Projects",
        description: "Designed and developed video games, ranging my University Dissertation or small-scale personal projects. Primarily used Unity to develop the video game itself with the logic handled by C#. I sourced assets publicly from websites such as Itch.io or occasionally contacted friends to draw them for me. Game topics include: a built-upon Pong game and a clinic-based strategy game (dissertation topic). Currently working on a pixel horror game alongside mods for my favourite games such as: Terraria.",
        id: 4,
        languages : ["Unity", "C#", "Figma"]
    }
]

const Project =({project}: {project: ProjectType}) => {
    return(
        <div
        key={project.id}
        className="flex flex-col flex-shrink-0 bg-neutral-800 max-w-[30rem] max-h-[50rem] overflow-hidden border border-white-5 rounded-md">
            <div>
                <Image 
                className='mx-auto w-[30rem] h-[15em]'
                src={project.image} 
                alt='Image describing the given project' 
                width={5000} 
                height={5000}>
                </Image>
            </div>
            <div
            className='pt-3 pb-3 px-2'>
                <h3 className='text-xl font-semibold text-white mb-4 text-center'>{project.title}</h3>
                <p className='text-neutral-400 text-center'>{project.description}</p>
            </div>
            <div className=''>
                <LanguageWidget languageinput={project.languages} />
            </div>
        </div>
        
    )
  }

  export const ProjectGrid = () => {
    return( 
        <div className="p-10 sticky top-0 flex justify-center">
            <div className='grid md:grid-cols-2 gap-20'>
                {projects.map((project: ProjectType) => {
                    return <Project project={project} key={project.id} />;
                })}
            </div>
        </div>
    );
};
