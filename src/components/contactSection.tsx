import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import type { ContactLink } from "@/data/types";
import { developer } from "@/data/portfolio";

const iconMap: Record<ContactLink["icon"], React.ElementType> = {
    email: EmailIcon,
    linkedin: LinkedInIcon,
    github: GitHubIcon,
    whatsapp: WhatsAppIcon,
};

export default function ContactSection() {
    const { contact } = developer;

    return (
        <section className="py-20 text-center text-gray-400">
            <h2 className="text-4xl font-semibold mb-6 text-purple-900">{contact.heading}</h2>
            <p className="max-w-2xl mx-auto mb-8">{contact.blurb}</p>
            <div className="flex flex-wrap justify-center gap-5">
                {contact.links.map((link) => {
                    const Icon = iconMap[link.icon];
                    return (
                        <a
                            key={link.icon}
                            href={link.href}
                            aria-label={link.label}
                            className="btn w-[5rem] bg-purple-900 text-gray-400 hover:bg-purple-900 hover:border-5 hover:border-gray-400 flex justify-center items-center"
                        >
                            <Icon className="text-gray-400 w-6 h-6" />
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
