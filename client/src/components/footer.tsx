import { Play, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-[var(--vercel-blue)] rounded flex items-center justify-center">
              <Play className="text-white w-3 h-3" />
            </div>
            <span className="text-[var(--vercel-gray)] text-sm">Video Player Generator</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-[var(--vercel-gray)]">
            <a href="#" className="hover:text-gray-900 transition-colors">Documentation</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
            <a href="#" className="hover:text-gray-900 transition-colors flex items-center">
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
