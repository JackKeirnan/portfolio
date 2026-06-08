// Icon keys map to MUI icons in the components that render them.
export type IconKey = "code" | "web" | "design" | "storage" | "github" | "work";

export type ProjectType = {
    id: number;
    slug: string;
    image: string;
    title: string;
    description: string;
    longdescription: string[];
    languages: string[];
};

export type SkillGroup = {
    icon: IconKey;
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
    icon: "email" | "linkedin" | "github" | "whatsapp";
    href: string;
};

export type Developer = {
    name: string;
    title: string;
    portrait: string;
    intro: {
        heading: string;
        paragraphs: string[];
    };
    about: {
        paragraphs: string[];
    };
    skills: {
        heading: string;
        subtitle: string;
        groups: SkillGroup[];
    };
    education: {
        heading: string;
        subtitle: string;
        items: EducationType[];
    };
    experience: {
        heading: string;
        subtitle: string;
        items: ExperienceType[];
    };
    work: {
        heading: string;
    };
    projects: ProjectType[];
    contact: {
        heading: string;
        blurb: string;
        links: ContactLink[];
    };
    footer: string;
};
