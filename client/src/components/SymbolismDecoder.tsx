import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Brain, Atom } from "lucide-react";

export default function SymbolismDecoder() {
  const symbols = [
    {
      icon: Brain,
      title: "Sacred Geometry",
      meaning: "The Superbrain Paradox reveals duality consciousness - pink/blue hemispheres united by the Star of David. 'As above, so below' encoded in bilateral symmetry.",
      color: "text-primary"
    },
    {
      icon: Atom,
      title: "Quantum Portals",
      meaning: "Circular mandalas represent infinite possibility states. The observer collapses potential into manifestation through conscious attention.",
      color: "text-secondary"
    },
    {
      icon: Eye,
      title: "Media Satire",
      meaning: "CNN3 logo parodies truth manipulation. The alien/hooded figure symbolizes hidden controllers broadcasting manufactured reality.",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 
          className="font-serif text-5xl font-bold text-center mb-4 uppercase"
          data-testid="text-symbolism-decoder-title"
        >
          Decode The Symbols
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Hidden meanings in psychedelic underground comix tradition
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {symbols.map((symbol, index) => {
            const Icon = symbol.icon;
            return (
              <Card 
                key={index} 
                className="hover-elevate transition-all"
                data-testid={`card-symbol-${index}`}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-md bg-card flex items-center justify-center mb-4 border-2`}>
                    <Icon className={`w-7 h-7 ${symbol.color}`} />
                  </div>
                  <CardTitle className="text-2xl" data-testid={`text-symbol-title-${index}`}>
                    {symbol.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-symbol-meaning-${index}`}>
                    {symbol.meaning}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
