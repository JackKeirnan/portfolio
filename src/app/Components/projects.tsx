import Image from 'next/image';

type ProjectType = {
    image: string;
    title: string;
    description: string
    // add a languages used here list/string ??
    id: number;
}

const projects: ProjectType[] = [
    {
        image: '/Images/500px.jpg',
        title: "Project 1",
        description: "project 1 description",
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
    }
]

const Project =({project}: {project: ProjectType}) => {
    return(
        <div
        key={project.id}
        className=""
        >
            <div
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className=""
            ></div>
            <div className="image-container" style={{ width: '100%', height: 'auto' }}>
                <Image className='mx-auto w-full h-1/2'src={project.image} alt='Image' width={500} height={500}></Image>
            </div>
            <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
            </div>
        </div>
        
    )
  }


export default Project;
export {projects};
export type {ProjectType};
