import { ProjectType } from "./types"

export const projects: ProjectType[] = [
    {
        image: '/Images/UniWebHome.png',
        title: "University Website Project",
        description: "A university project that tasked us with creating a website themed around a specific UN sustainability goal.",
        longdescription: [
            "The task was distributed among a group of six university students, with the main goal being the full-stack development of a website themed around one of the UN’s sustainability goals. I took on a leading role in the group and guided us towards a consensus, resulting in the design of a recipe browsing website.",
            "We delegated tasks using an Agile development methodology, which required us to create a backlog of ideas and tasks essential for the website. We organized weekly sprints and rotated the role of scrum master so that everyone had an equal experience of leading discussions in meetings.",
            "For the development process, the university required us to use SpringBoot and Java for the backend, with a personal choice of database software. We selected MySQL for hosting purposes. For the front-end, we used React with JavaScript, HTML, and CSS, as these technologies were taught to us and we were most familiar with them.",
            "Over a period of about four months, I developed key skills and gained a keen interest in web development—an area I hadn't been exposed to much in the past. I received a high grade for my role in the website’s development, as well as for my leadership skills in facing the challenges of a primarily online-based university project."
        ],
        id: 1,
        languages : ["Java", "HTML", "CSS", "JavaScript", "React", "SpringBoot", "MySQL"]
    },
    {
        image: '/Images/AWS.png',
        title: "Artificial Intelligence Internship",
        description: "I worked as an intern software developer at AuraVision, learning and experiencing all the aspects and qualities required for working in a professional environment.",
        longdescription: [
            "During the autumn/winter of 2022, I worked as a part-time intern at a newly established AI startup called AuraVision. This was alongside my final year of university, and I worked there for three months.",
            "My main task during that period was to create a parser to organize large amounts of metadata from several clients. This task was difficult to balance with my intensive university coursework, but I embraced the challenge.",
            "The two primary platforms I was asked to learn and use were AWS (specifically Lambda functions to automate the process via the cloud) and Serverless to aid in automation. I received guidance from the lead software engineers at the company whenever I had questions.",
            "Although I only had one year of experience with JavaScript at the time, I successfully completed the task with the help of my senior colleagues. I learned invaluable skills not only in using the provided frameworks but also in understanding industry-standard coding practices.",
            "It was an amazing experience, and I even found time to visit their offices in London whenever I had a free day from university!"
        ],
        id: 2,
        languages : ["JavaScript", "Serverless", "AWS"]
    },
    {
        image: '/Images/CalicoWebsite.png',
        title: "Freelance Web Development/Portfolio",
        description: "Worked with several clients to design/redesign their websites according to their needs.",
        longdescription: [
            "After graduating in July 2023, I took around eight months off to travel and recharge. Upon returning to the UK and beginning my job search, I wanted to engage in something productive that would also allow me to further my skills in a field I'm passionate about.",
            "I reached out to some potential clients through mutual connections and agreed to develop their websites from scratch, with some asking me to take on a more permanent role in maintaining them.",
            "I worked with Calico Consultancy to create a detailed and interactive website to help launch the business. They requested the use of Squarespace to keep maintenance and adjustments simple, and although I hadn’t used the platform before, my experience in full-stack development allowed me to quickly succeed.",
            "Another client, Severin Hair Studio, was found through a mutual connection. After discussing the requirements, we decided to use Wix for development. A mock-up was provided to guide the design, and I used my JavaScript knowledge to add custom snippets whenever Wix didn’t have a necessary feature. Once development was complete, I continued to make adjustments as requested and helped maintain the website.",
            "For my portfolio, I spent time experimenting with different frameworks and services such as Webflow and WordPress. Many early versions of the site were built using Webflow, but I eventually rebuilt it using Next.js and Tailwind to have more control. It remains a work in progress, but I find it an invaluable way to showcase my web development skills in a dynamic manner."
        ],
        id: 3,
        languages : ["SquareSpace", "Wix", "Webflow", "JavaScript", "NextJS", "Tailwind"]
    },
    {
        image: '/Images/UniGameSheet.png',
        title: "Personal Video Game Projects",
        description: "Designed and developed video games, ranging from my University Dissertation to smaller-scale personal projects.",
        longdescription: [
            "I’ve been an avid fan of video games since I was young and have maintained a keen interest in how they are developed. My final year of university provided a perfect opportunity to explore video game development. I took a module to help me learn the necessary skills and chose to focus my final-year project on making a game and documenting the process.",
            "For my dissertation, I developed a strategy game that simulated the ramping effects of a health crisis (e.g., Covid-19) on the healthcare industry. I drew inspiration from games like Two Point Hospital and others in the genre. All the work was developed in Unity and C#, and I learned as I went due to my limited experience.",
            "I documented the project in just under 15,000 words and received a high grade for my efforts. This result sparked my continued interest in video game development, and I began creating smaller-scale projects to further my understanding of Unity, even experimenting with Unity3D. I continue to develop these projects in my free time, especially when inspired by the new games that I play!"
        ],
        id: 4,
        languages : ["Unity", "C#", "Figma"]
    }
]