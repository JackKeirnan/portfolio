// projects get grouped under these headings in the My Projects window
export type ProjectCategory = "Freelance" | "University" | "Game Dev" | "Personal";

export type ProjectType = {
    id: number;
    slug: string;
    image: string;
    // extra screenshots shown after `image` in the Project Viewer gallery
    gallery?: string[];
    title: string;
    description: string;
    longdescription: string[];
    languages: string[];
    // grouping/banner for the project (shown in the My Projects window and the project detail window)
    category: ProjectCategory;
    // Optional live deployment link.
    liveUrl?: string;
    // optional public source repo, shows as "View on GitHub"
    repoUrl?: string;
    // someone the project was made with, shows as "Made with <name>" and links if href is set
    collaborator?: { name: string; href?: string };
    // Toggle visibility. Defaults to shown; set to false to hide everywhere.
    enabled?: boolean;
};

export type SkillGroup = {
    // short heading for the group e.g. "Languages", shown in About Me and /plain
    label: string;
    text: string;
};

export type EducationType = {
    degree: string;
    institution: string;
    description: string;
};

export type ExperienceType = {
    role: string;
    meta: string;
    description: string;
};

export type ContactLink = {
    label: string;
    href: string;
};

/** one line in the About JackOS credits, href links to the source or licence */
export type Credit = {
    label: string;
    detail: string;
    href?: string;
};

export type Developer = {
    name: string;
    title: string;
    portrait: string;
    // path under public/ to the downloadable CV, leave unset to hide the download button
    cvPdf?: string;
    terminal: {
        // lines the Terminal's `whoami` command prints
        whoami: string[];
    };
    intro: {
        heading: string;
        paragraphs: string[];
    };
    about: {
        paragraphs: string[];
    };
    skills: {
        heading: string;
        groups: SkillGroup[];
    };
    education: {
        heading: string;
        items: EducationType[];
    };
    experience: {
        heading: string;
        items: ExperienceType[];
    };
    projects: ProjectType[];
    contact: {
        heading: string;
        blurb: string;
        links: ContactLink[];
    };
    // shown in About JackOS and on /plain, add any third-party asset here
    credits: Credit[];
    footer: string;
};
