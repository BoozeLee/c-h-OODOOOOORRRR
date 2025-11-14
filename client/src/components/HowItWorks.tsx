import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Zap, Shield } from "lucide-react";
import superbrainParadox from "@assets/Lucid_Origin_Superbrain_Paradox_ThursdayArt_promptComic_cover__1_1763051159681.jpg";

export default function HowItWorks() {
  const features = [
    {
      icon: Database,
      title: "Adaptive Metadata",
      description: "Templates dynamically adjust based on real-time cultural trends using Perplexity AI integration.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Event Hooks",
      description: "Automatic evolution triggers respond to news cycles, social movements, and emerging narratives.",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "Edge Privacy",
      description: "Your customizations stay local. Personalization happens client-side, never sent to servers.",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 
          className="font-serif text-5xl font-bold text-center mb-4 uppercase"
          data-testid="text-how-it-works-title"
        >
          How The System Works
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          An AI-powered template management system that evolves with culture
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-lg overflow-hidden" data-testid="img-superbrain-paradox-container">
            <img 
              src={superbrainParadox} 
              alt="Superbrain Paradox - Dual Consciousness Sacred Geometry"
              className="w-full h-full object-cover"
              data-testid="img-superbrain-paradox"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white text-sm font-mono tracking-wider">
                DUALITY CONSCIOUSNESS • SACRED GEOMETRY • BILATERAL UNITY
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="hover-elevate transition-all"
                  data-testid={`card-feature-${index}`}
                >
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-md bg-card flex items-center justify-center mb-4 border-2`}>
                      <Icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-2xl" data-testid={`text-feature-title-${index}`}>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-feature-description-${index}`}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
