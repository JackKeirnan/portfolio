// Projects are grouped under these headings in the My Projects window.
export type ProjectCategory = "Freelance" | "University" | "Game Dev" | "Personal";

export type ProjectType = {
    id: number;
    slug: string;
    image: string;
    title: string;
    description: string;
    longdescription: string[];
    languages: string[];
    // Grouping/banner for the project (shown in the My Projects window and on the project detail window).
    category: ProjectCategory;
    // Optional live deployment link.
    liveUrl?: string;
    // Toggle visibility. Defaults to shown; set to false to hide everywhere.
    enabled?: boolean;
};

export type SkillGroup = {
    // Short heading for the group, e.g. "Languages"; shown in About Me and /plain.
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

/** One line in the About JackOS credits; href links to the source or licence. */
export type Credit = {
    label: string;
    detail: string;
    href?: string;
};

export type Developer = {
    name: string;
    title: string;
    portrait: string;
    // Path under public/ to the downloadable CV. Unset hides the download button.
    cvPdf?: string;
    terminal: {
        // Lines printed by the Terminal app's `whoami` command.
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
    // Shown in About JackOS and on /plain. Add any third-party asset here.
    credits: Credit[];
    footer: string;
};
