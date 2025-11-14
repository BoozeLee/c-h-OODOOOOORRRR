import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import QuickStatsBar from "@/components/QuickStatsBar";
import VisualShowcase from "@/components/VisualShowcase";
import TemplateGallery from "@/components/TemplateGallery";
import HowItWorks from "@/components/HowItWorks";
import SymbolismDecoder from "@/components/SymbolismDecoder";
import TemplateCreatorForm from "@/components/TemplateCreatorForm";
import TrendResearcher from "@/components/TrendResearcher";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        <HeroSection />
        <QuickStatsBar />
        
        <VisualShowcase />
        
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TemplateCreatorForm />
              <TrendResearcher />
            </div>
          </div>
        </section>
        
        <div id="templates">
          <TemplateGallery />
        </div>
        
        <div id="how-it-works">
          <HowItWorks />
        </div>
        
        <SymbolismDecoder />
        
        <div id="pricing">
          <PricingSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
