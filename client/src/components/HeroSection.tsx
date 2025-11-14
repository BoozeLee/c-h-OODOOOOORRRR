import { Button } from "@/components/ui/button";
import heroBanner from "@assets/Lucid_Origin_Superbrain_ascends_among_swirling_neon_fractal_cl_0_1763051159681.jpg";
import { Sparkles, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 
          className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 uppercase tracking-wide"
          data-testid="text-hero-title"
        >
          Psychedelic Truth-Revealing Art Prompts
        </h1>
        
        <p 
          className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed"
          data-testid="text-hero-subtitle"
        >
          That Evolve With Culture
        </p>
        
        <p 
          className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
          data-testid="text-hero-description"
        >
          AI-powered template system with real-time trend integration. Event-driven evolution. Edge-privacy personalization.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            variant="default"
            className="text-lg px-8 min-h-12"
            data-testid="button-explore-templates"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Explore Templates
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 min-h-12 bg-background/10 backdrop-blur-sm border-2"
            data-testid="button-how-it-works"
          >
            <Zap className="w-5 h-5 mr-2" />
            How It Works
          </Button>
        </div>
      </div>
    </div>
  );
}
