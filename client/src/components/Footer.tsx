import { Sparkles } from "lucide-react";
import { SiGumroad, SiEtsy, SiGithub } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="font-serif text-xl font-bold">AMPHETAMEMES</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Psychedelic truth-revealing art prompts that evolve with culture. 
              AI-powered template system with real-time trend integration.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#templates" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Templates
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Gumroad"
              >
                <SiGumroad className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Etsy"
              >
                <SiEtsy className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Amphetamemes. All rights reserved. Truth-revealing prompts for the psychedelic age.</p>
        </div>
      </div>
    </footer>
  );
}
