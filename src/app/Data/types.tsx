export type ProjectType = {
    image: string;
    title: string;
    description: string;
    longdescription: string[];
    id: number;
    languages: string[];
}

export type ExperienceType = {
    company: string;
    position: string;
    duration: string;
    description: string[];
}

export type EducationType = {
    school: string;
    degree: string;
    duration: string;
    description: string[];
}

export type SkillType = {
    name: string;
    level: string;
}