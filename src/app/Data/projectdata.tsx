import { ProjectType } from "./types"

export const projects: ProjectType[] = [
    {
        image: '/Images/CalicoWebsite.png',
        title: "Calico Business Consulting",
        description: "Built a professional online home for a new consultancy — from blank canvas to launch-ready.",
        longdescription: [
            "Collaborated with a business and accounting consultancy start-up to design and launch a custom website tailored to their brand and needs.",
            "This was my first freelance project, beginning in early 2024, and I continue to support them with site updates and feature additions. While there were some early challenges, the experience was invaluable in shaping my approach to client communication, project structuring, and real-world development.",
            "We selected SquareSpace for its ease of use, cost-effectiveness, and low-maintenance requirements. After multiple design demos and feedback sessions, we delivered a clean, professional site aligned with their business goals.",
        ],
        id: 1,
        languages : ["SquareSpace", "JavaScript", "HTML", "CSS"]
    },
    {
        image: '/Images/SeverinOne.png',
        title: "Severin Hair Studio",
        description: "Gave a growing salon a stylish digital storefront with custom functionality and flair.",
        longdescription: [
            "Severin approached me to create a website that would reflect their modern aesthetic and serve as a digital storefront for potential clients. The goal was to design a clean, welcoming platform that showcased their services, pricing, and a curated portfolio of past work.",
            "I built the site using Wix for its ease of maintenance and quick deployment. To enhance functionality and interactivity beyond Wix’s default tools, I incorporated custom JavaScript, allowing for a more dynamic user experience.",
            "The final site balanced form and function — maintaining the simplicity requested by the client in order to emphasise the detailed and intricate work that he has displayed. It helped the business improve their online presence, attract new clients, and present a more professional image in a highly competitive industry.",
        ],
        id: 2,
        languages : ["Wix", "JavaScript", "HTML", "CSS"]
    },
    {
        image: '/Images/AtelierOne.png',
        title: "Atelier Lavender",
        description: "Transformed an architecture studio’s outdated site into a sleek, modern web experience.",
        longdescription: [
            "Partnered with a start-up architecture and project management firm to redesign and modernize their website from the ground up. The client wanted a digital presence that reflected their clean, design-first ethos — something both elegant and highly functional.",
            "I migrated their existing site to a custom build using TypeScript and Tailwind CSS, improving load times, accessibility, and mobile responsiveness. The final product delivered a minimalist, refined UI that aligned with their brand while allowing for future scalability and updates.",
            "The redesign not only modernized the look and feel but also enhanced usability, making it easier for potential clients to navigate services, view project galleries, and get in touch.",
        ],
        id: 3,
        languages : ["TypeScript", "NextJS", "TailwindCSS", "HTML", "React"]
    },
    {
        image: '/Images/UniWebHome.png',
        title: "University Website Project",
        description: "Led a university team in building a full-stack recipe website inspired by a UN sustainability goal.",
        longdescription: [
            "As part of a university project, I worked in a team of six to develop a website themed around one of the UN's Sustainable Development Goals. I naturally took on a leadership role, guiding the team through initial planning and helping us converge on a concept: a recipe browsing platform that promotes sustainable eating habits.",
            "We followed an Agile methodology, managing tasks through a shared backlog and running weekly sprints. We also rotated the Scrum Master role to ensure everyone gained experience leading team discussions.",
            "On the technical side, we used Spring Boot with Java for the backend and chose MySQL for our database solution. The front-end was built with React, along with JavaScript, HTML, and CSS — tools we were familiar with from coursework.",
            "This four-month project not only introduced me to full-stack development, but also sparked a deeper interest in web technologies. It challenged me to improve both my technical and leadership skills, and I was proud to receive strong marks for both my contributions and project coordination."
        ],
        id: 4,
        languages : ["Java", "HTML", "CSS", "JavaScript", "React", "SpringBoot", "MySQL"]
    },
    {
        image: '/Images/UniGameSheet.png',
        title: "Personal Video Game Projects",
        description: "Blended creative design with technical development to build games in Unity — from university research to passion projects.",
        longdescription: [
            "My interest in game development began as a lifelong passion for video games, and evolved into hands-on experience during my final year of university. For my dissertation, I designed and built a strategy game in Unity that simulated the escalating impact of a healthcare crisis — inspired by games like Two Point Hospital.",
            "This project involved learning C# and Unity on the fly, as I had limited prior experience. Despite the steep learning curve, I successfully developed a working game and documented the entire process in a detailed 15,000-word dissertation, for which I earned a high grade.",
            "Since then, I’ve continued to explore game development through smaller-scale personal projects, experimenting with features in Unity3D and pushing myself to improve both technically and creatively. Game development has remained a rewarding outlet for creative exploration and a way to sharpen my coding skills in a playful yet personal environment."
        ],
        id: 5,
        languages : ["Unity", "C#", "Figma"]
    }
]