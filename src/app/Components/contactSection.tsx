import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function ContactSection() {
    return (
        <section className="py-20 text-center text-gray-400">
            <h2 className="text-4xl font-semibold mb-6 text-purple-900">Get in Touch</h2>
            <p className="max-w-2xl mx-auto mb-8">
                Whether it be for a website, project, or just a chat, I'd love to hear from you! Please use the following methods to contact me.
            </p>
            <div className="flex justify-center gap-3">
                {/* Email */}
                <a href="mailto:jackkeirnan@gmail.com" className="btn w-[5rem] bg-purple-900 text-gray-400 hover:bg-purple-900 hover:border-5 hover:border-gray-400 flex justify-center items-center">
                    <EmailIcon className="text-gray-400 w-6 h-6" />
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/jackkeirnan/" className="btn w-[5rem] bg-purple-900 text-gray-400 hover:bg-purple-900 hover:border-5 hover:border-gray-400 flex justify-center items-center">
                    <LinkedInIcon className="text-gray-400 w-6 h-6" />
                </a>
                {/* GitHub */}
                <a href="https://github.com/JackKeirnan" className="btn w-[5rem] bg-purple-900 text-gray-400 hover:bg-purple-900 hover:border-5 hover:border-gray-400 flex justify-center items-center">
                    <GitHubIcon className="text-gray-400 w-6 h-6" />
                </a>
                {/* WhatsApp */}
                <a href="https://wa.me/+447306375586" className="btn w-[5rem] bg-purple-900 text-gray-400 hover:bg-purple-900 hover:border-5 hover:border-gray-400 flex justify-center items-center">
                    <WhatsAppIcon className="text-gray-400 w-6 h-6" />
                </a>
            </div>
        </section>
    );
}
