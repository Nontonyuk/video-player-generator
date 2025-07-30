import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Smartphone, Settings } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Rocket className="w-6 h-6 text-[var(--vercel-blue)]" />,
      title: "One-Click Deploy",
      description: "Generated code is optimized for Vercel deployment with zero configuration needed.",
      bgColor: "bg-blue-100"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-green-600" />,
      title: "Responsive Design",
      description: "Generated players work perfectly across all devices and screen sizes.",
      bgColor: "bg-green-100"
    },
    {
      icon: <Settings className="w-6 h-6 text-purple-600" />,
      title: "Multiple Players",
      description: "Support for Plyr.io, JW Player, Fluid Player, and HTML5 video.",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="bg-white border border-gray-200">
          <CardContent className="p-6 text-center">
            <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
              {feature.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-[var(--vercel-gray)]">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
