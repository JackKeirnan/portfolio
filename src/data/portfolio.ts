import { Developer, ProjectCategory } from "./types";

// Single source of truth for all site copy and asset paths.
// Components read from this object instead of hardcoding content.
export const developer: Developer = {
    name: "Jack Keirnan",
    title: "Software Developer",
    portrait: "/Images/Jack.png",

    intro: {
        heading: "Hi!",
        paragraphs: [
            "I'm Jack – a Software Developer passionate about building clean, effective solutions.",
            "This website is a space where I showcase my projects, skills, and development journey in more detail.",
            "I currently work full-time as a Junior Software Engineer at Eseye, where I'm part of a professional team building real-world software and growing alongside experienced developers.",
            "Outside of my day job, I continue to take on select freelance work — whether it's building something from the ground up or jumping in to support an existing project. I'm always happy to hear from people who need reliable, high-quality software.",
        ],
    },

    about: {
        paragraphs: [
            "Originally from the UK and raised in the Middle East, my background has given me a broad perspective and adaptability — qualities I bring into every project I take on.",
            "With a BSc in Computer Science and hands-on experience in freelance development, I'm committed to continuous learning and refining my craft. I'm a perfectionist at heart, always looking for ways to make things better.",
            "If you're interested in working together on a freelance project or just want to connect, feel free to reach out through any of my socials or contact links.",
        ],
    },

    skills: {
        heading: "Skills",
        subtitle: "Tools and technologies I work with",
        groups: [
            { icon: "code", text: "JavaScript, TypeScript, Python, Java" },
            { icon: "web", text: "React, Next.js, Node.js" },
            { icon: "design", text: "Tailwind CSS, Figma, Framer Motion" },
            { icon: "storage", text: "MySQL, AWS, SpringBoot" },
            { icon: "github", text: "Git, GitHub, Serverless" },
        ],
    },

    education: {
        heading: "Education",
        subtitle: "Academic background and achievements",
        items: [
            {
                degree: "BSc in Computer Science",
                institution: "Brunel University, London",
                description:
                    "Covered core concepts like software engineering, algorithms, and full-stack development, with a speciality in Game Development.",
            },
        ],
    },

    experience: {
        heading: "Experience",
        subtitle: "Work I've done professionally and independently",
        items: [
            {
                role: "Junior Software Engineer",
                meta: "Eseye – July 2025 – Present",
                description:
                    "Working within a professional Agile engineering team at an IoT connectivity company, contributing to the development of customer-facing platform tooling and supporting day-to-day delivery.",
            },
            {
                role: "Freelance Developer",
                meta: "2024 – Present",
                description:
                    "Worked with several clients on primarily web-based projects. Involved rapid-prototyping and personal development.",
            },
            {
                role: "Software Developer Intern",
                meta: "AuraVision – 2022",
                description:
                    "Built internal tools (e.g. AWS and Serverless) for data control alongside learning how to work with a team.",
            },
        ],
    },

    work: {
        heading: "Examples of my Work",
    },

    projects: [
        {
            id: 1,
            slug: "portfolio-website",
            image: "/Images/Portfolio.png",
            title: "Personal Portfolio Website",
            description:
                "Crafted a personal portfolio to highlight my skills, projects, and growth as a developer.",
            longdescription: [
                "Started with detailed designs in Figma to establish a clear visual direction and user experience. Then built an initial version in WebFlow to quickly bring the design to life and get comfortable with web development fundamentals.",
                "After gaining confidence and wanting more control over the codebase and performance, I ported the site into a custom Next.js application using TypeScript and Tailwind CSS. This final iteration allowed me to deepen my expertise with React, improve site speed, and implement a more maintainable, scalable structure.",
                "This project showcases a deliberate progression from design to no-code prototyping, then to a fully custom-coded solution—reflecting both my design sensibility and technical growth.",
            ],
            languages: ["NextJS", "TypeScript", "HTML", "TailwindCSS", "Figma", "WebFlow"],
            category: "Personal",
            enabled: true,
        },
        {
            id: 2,
            slug: "calico-business-consulting",
            image: "/Images/CalicoWebsite.png",
            title: "Calico Business Consulting",
            description:
                "Built a professional online home for a new consultancy — from blank canvas to launch-ready.",
            longdescription: [
                "Collaborated with a business and accounting consultancy start-up to design and launch a custom website tailored to their brand and needs.",
                "This was my first freelance project, beginning in early 2024, and I continue to support them with site updates and feature additions. While there were some early challenges, the experience was invaluable in shaping my approach to client communication, project structuring, and real-world development.",
                "We selected SquareSpace for its ease of use, cost-effectiveness, and low-maintenance requirements. After multiple design demos and feedback sessions, we delivered a clean, professional site aligned with their business goals.",
            ],
            languages: ["SquareSpace", "JavaScript", "HTML", "CSS"],
            category: "Freelance",
            enabled: true,
        },
        {
            id: 3,
            slug: "severin-hair-studio",
            image: "/Images/SeverinOne.png",
            title: "Severin Hair Studio",
            description:
                "Gave a growing salon a stylish digital storefront with custom functionality and flair.",
            longdescription: [
                "Severin approached me to create a website that would reflect their modern aesthetic and serve as a digital storefront for potential clients. The goal was to design a clean, welcoming platform that showcased their services, pricing, and a curated portfolio of past work.",
                "I built the site using Wix for its ease of maintenance and quick deployment. To enhance functionality and interactivity beyond Wix's default tools, I incorporated custom JavaScript, allowing for a more dynamic user experience.",
                "The final site balanced form and function — maintaining the simplicity requested by the client in order to emphasise the detailed and intricate work that he has displayed. It helped the business improve their online presence, attract new clients, and present a more professional image in a highly competitive industry.",
            ],
            languages: ["Wix", "JavaScript", "HTML", "CSS"],
            category: "Freelance",
            enabled: true,
        },
        {
            id: 4,
            slug: "atelier-lavender",
            image: "/Images/AtelierOne.png",
            title: "Atelier Lavender",
            description:
                "Transformed an architecture studio's outdated site into a sleek, modern web experience.",
            longdescription: [
                "Partnered with a start-up architecture and project management firm to redesign and modernize their website from the ground up. The client wanted a digital presence that reflected their clean, design-first ethos — something both elegant and highly functional.",
                "I migrated their existing site to a custom build using TypeScript and Tailwind CSS, improving load times, accessibility, and mobile responsiveness. The final product delivered a minimalist, refined UI that aligned with their brand while allowing for future scalability and updates.",
                "The redesign not only modernized the look and feel but also enhanced usability, making it easier for potential clients to navigate services, view project galleries, and get in touch.",
            ],
            languages: ["TypeScript", "NextJS", "TailwindCSS", "HTML", "React"],
            category: "Freelance",
            enabled: true,
        },
        {
            id: 8,
            slug: "fattoria-cercatoia",
            image: "/Images/Fattoria.png",
            title: "Fattoria Cercatoia",
            description:
                "Built a warm, welcoming site for an Italian agriturismo to showcase its character online.",
            longdescription: [
                "Fattoria Cercatoia needed a digital home that captured the charm and atmosphere of the property while staying simple for visitors to navigate. The goal was an inviting, image-led site that reflected the personality of the place.",
                "I developed the site with TypeScript and React, using Tailwind CSS to create a clean, responsive layout that puts the photography and key information front and centre.",
                "The site is deployed and live on Vercel at fattoria-cercatoia-website.vercel.app.",
            ],
            languages: ["TypeScript", "React", "TailwindCSS", "Vercel"],
            category: "Freelance",
            enabled: false,
            liveUrl: "https://fattoria-cercatoia-website.vercel.app",
        },
        {
            id: 9,
            slug: "l-website",
            image: "/Images/LWebsite.png",
            title: "L Website",
            description:
                "Created a bespoke, interactive single-page site with playful, custom touches.",
            longdescription: [
                "For this freelance project I built a custom single-page website with a focus on interactivity and personality, going beyond a standard static layout to create something memorable for the client.",
                "The site is built with React and TypeScript on Vite, styled with Tailwind CSS, and brought to life with details like an image lightbox gallery and celebratory confetti animations for a more engaging, hands-on feel.",
                "It's deployed and live on Vercel at l-website-delta.vercel.app.",
            ],
            languages: ["TypeScript", "React", "Vite", "TailwindCSS"],
            category: "Freelance",
            enabled: false,
            liveUrl: "https://l-website-delta.vercel.app",
        },
        {
            id: 5,
            slug: "university-website",
            image: "/Images/UniWebHome.png",
            title: "University Website Project",
            description:
                "Led a university team in building a full-stack recipe website inspired by a UN sustainability goal.",
            longdescription: [
                "As part of a university project, I worked in a team of six to develop a website themed around one of the UN's Sustainable Development Goals. I naturally took on a leadership role, guiding the team through initial planning and helping us converge on a concept: a recipe browsing platform that promotes sustainable eating habits.",
                "We followed an Agile methodology, managing tasks through a shared backlog and running weekly sprints. We also rotated the Scrum Master role to ensure everyone gained experience leading team discussions.",
                "On the technical side, we used Spring Boot with Java for the backend and chose MySQL for our database solution. The front-end was built with React, along with JavaScript, HTML, and CSS — tools we were familiar with from coursework.",
                "This four-month project not only introduced me to full-stack development, but also sparked a deeper interest in web technologies. It challenged me to improve both my technical and leadership skills, and I was proud to receive strong marks for both my contributions and project coordination.",
            ],
            languages: ["Java", "HTML", "CSS", "JavaScript", "React", "SpringBoot", "MySQL"],
            category: "University",
            enabled: true,
        },
        {
            id: 6,
            slug: "video-game-projects",
            image: "/Images/UniGameSheet.png",
            title: "Personal Video Game Projects",
            description:
                "Blended creative design with technical development to build games in Unity — from university research to passion projects.",
            longdescription: [
                "My interest in game development began as a lifelong passion for video games, and evolved into hands-on experience during my final year of university. For my dissertation, I designed and built a strategy game in Unity that simulated the escalating impact of a healthcare crisis — inspired by games like Two Point Hospital.",
                "This project involved learning C# and Unity on the fly, as I had limited prior experience. Despite the steep learning curve, I successfully developed a working game and documented the entire process in a detailed 15,000-word dissertation, for which I earned a high grade.",
                "Since then, I've continued to explore game development through smaller-scale personal projects, experimenting with features in Unity3D and pushing myself to improve both technically and creatively. Game development has remained a rewarding outlet for creative exploration and a way to sharpen my coding skills in a playful yet personal environment.",
            ],
            languages: ["Unity", "C#", "Figma"],
            category: "Game Dev",
            enabled: true,
        },
        {
            id: 10,
            slug: "pixel-card-game",
            image: "/Images/WIP.png",
            title: "Pixel Card Game — Scala Quaranta",
            description:
                "A 2D pixel-art implementation of Scala Quaranta, the Italian rummy card game, built in Unity.",
            longdescription: [
                "Pixel Card Game is a personal project recreating Scala Quaranta — a variant of Italian rummy — as a 2D pixel-art game. It's played with two 52-card decks plus four jokers (108 cards) and 13-card hands, where players draw and discard to build melds (sets and runs) and a player's first lay-down must total at least 40 points (\"quaranta\").",
                "I built it in Unity 6 with C#, using the Universal Render Pipeline (URP) 2D renderer and the new Input System. The architecture cleanly separates the card model and rules engine from the UI: the game can run headless for logic testing, while the interactive table builds its entire interface (canvas, piles, cards, and buttons) at runtime.",
                "The project let me deepen my C# skills and practise designing a non-trivial rules engine — meld detection, lay-offs, and turn flow — alongside building an interactive, drag-to-reorder card interface.",
            ],
            languages: ["Unity", "C#"],
            category: "Game Dev",
            enabled: true,
        },
    ],

    contact: {
        heading: "Get in Touch",
        blurb:
            "Whether it be for a website, project, or just a chat, I'd love to hear from you! Please use the following methods to contact me.",
        links: [
            { label: "Email", icon: "email", href: "mailto:jackkeirnan@gmail.com" },
            { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/jackkeirnan/" },
            { label: "GitHub", icon: "github", href: "https://github.com/JackKeirnan" },
            { label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/+447306375586" },
        ],
    },

    footer:
        "© 2026 Jack Keirnan. Built with NextJS and Tailwind, hosted by Vercel. Uses DaisyUI and MaterialUI.",
};

// Primary site navigation, shared by the Navbar.
export const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
];

// Convenience re-export for components that only need the project list.
// Filtered to projects that are enabled (enabled is true or omitted).
export const projects = developer.projects.filter((project) => project.enabled !== false);

// Order in which project categories are displayed on the Work page.
// Categories with no projects are skipped automatically.
export const projectCategories: ProjectCategory[] = [
    "Freelance",
    "University",
    "Game Dev",
    "Personal",
];

// Look up a single enabled project by its URL slug (used by the /work/[slug] route).
// Disabled projects return undefined so their detail page 404s.
export const getProjectBySlug = (slug: string) =>
    projects.find((project) => project.slug === slug);
