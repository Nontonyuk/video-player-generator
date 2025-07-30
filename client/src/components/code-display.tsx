import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Copy, Link, ExternalLink, Code, Loader2 } from "lucide-react";
import type { PlayerConfig } from "@shared/schema";

interface CodeDisplayProps {
  config: PlayerConfig | null;
}

export default function CodeDisplay({ config }: CodeDisplayProps) {
  const { toast } = useToast();
  const [copying, setCopying] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    setCopying(type);
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => setCopying(null), 1000);
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  if (!config) {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Generated Code</h2>
          <p className="text-[var(--vercel-gray)]">Copy the code below to embed your video player or deploy to Vercel.</p>
        </div>
        
        <div className="text-center py-12">
          <Code className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Generate a player configuration first to see the code here.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Generated Code</h2>
        <p className="text-[var(--vercel-gray)]">Copy the code below to embed your video player or deploy to Vercel.</p>
      </div>

      <Alert className="mb-6 border-[var(--vercel-blue)] bg-blue-50">
        <CheckCircle className="h-4 w-4 text-[var(--vercel-blue)]" />
        <AlertDescription>
          <div>
            <h3 className="font-medium text-gray-900">Code Generated Successfully</h3>
            <p className="text-sm text-[var(--vercel-gray)]">Your video player is ready for deployment</p>
          </div>
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              <Code className="w-4 h-4 mr-2 inline" />
              Embed Code (Iframe)
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(config.iframeCode, "Iframe code")}
              disabled={copying === "iframe"}
              className="text-[var(--vercel-blue)] hover:text-blue-600"
            >
              {copying === "iframe" ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Copy className="w-4 h-4 mr-1" />
              )}
              Copy
            </Button>
          </div>
          <Textarea
            value={config.iframeCode}
            readOnly
            rows={6}
            className="font-mono text-sm bg-gray-50 resize-none"
            placeholder="Generated iframe code will appear here..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              <Link className="w-4 h-4 mr-2 inline" />
              Direct Player Link
            </label>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(config.directLink, "Link")}
                disabled={copying === "link"}
                className="text-[var(--vercel-blue)] hover:text-blue-600"
              >
                {copying === "link" ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <Copy className="w-4 h-4 mr-1" />
                )}
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openLink(config.directLink)}
                className="text-[var(--vercel-blue)] hover:text-blue-600"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Open
              </Button>
            </div>
          </div>
          <Textarea
            value={config.directLink}
            readOnly
            rows={3}
            className="font-mono text-sm bg-gray-50 resize-none"
            placeholder="Direct link will appear here..."
          />
        </div>

        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h3 className="font-medium text-gray-900 mb-3">
              <svg className="w-4 h-4 mr-2 inline" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 7.5L12 0L0 7.5v9L12 24l12-7.5v-9z" />
              </svg>
              Deploy to Vercel
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-[var(--vercel-gray)] mb-4">
              <li>Create a new project in your Vercel dashboard</li>
              <li>Upload the generated HTML file to your project</li>
              <li>Configure your domain settings</li>
              <li>Deploy and share your video player</li>
            </ol>
            <Button
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => window.open('https://vercel.com/new', '_blank')}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 7.5L12 0L0 7.5v9L12 24l12-7.5v-9z" />
              </svg>
              Deploy to Vercel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
