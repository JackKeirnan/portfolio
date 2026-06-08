import { developer } from "@/data/portfolio";

export default function Footer() {
    return (
        <footer className="py-6 text-center text-gray-400 border-t border-purple-900/30">
            <p>{developer.footer}</p>
        </footer>
    );
}
