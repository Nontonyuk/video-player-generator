import { Play, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[var(--vercel-blue)] rounded-lg flex items-center justify-center">
              <Play className="text-white w-4 h-4" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Video Player Generator</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-[var(--vercel-gray)]">Ready for Vercel deployment</span>
            <Button 
              className="bg-[var(--vercel-blue)] text-white px-4 py-2 text-sm font-medium hover:bg-blue-600"
              onClick={() => window.open('https://vercel.com/new', '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              Deploy
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
