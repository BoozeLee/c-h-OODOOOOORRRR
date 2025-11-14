import { Button } from "@/components/ui/button";
import { Moon, Sun, Sparkles, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isDark, setIsDark] = useState(false);
  const [location] = useLocation();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    console.log("Theme toggled:", !isDark ? "dark" : "light");
  };

  const isHomePage = location === "/";

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer hover-elevate transition-colors">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 
              className="font-serif text-2xl font-bold"
              data-testid="text-logo"
            >
              AMPHETAMEMES
            </h1>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {isHomePage ? (
            <>
              <a 
                href="#templates" 
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="link-templates"
              >
                Templates
              </a>
              <a 
                href="#how-it-works" 
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="link-how-it-works"
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="link-pricing"
              >
                Pricing
              </a>
            </>
          ) : (
            <Link href="/">
              <span className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-home">
                Home
              </span>
            </Link>
          )}
          <Link href="/store">
            <span className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-store">
              Store
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          <Button 
            asChild
            variant="default"
            size="sm"
            data-testid="button-buy-templates"
          >
            <Link href="/store">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy Templates
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
