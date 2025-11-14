import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sparkles, Copy, Download } from "lucide-react";

export default function TemplateEditor() {
  const [prompt, setPrompt] = useState(
    "A smartphone transforms into an ancient scroll, infinitely unfurling with TikTok videos instead of hieroglyphics. Underground comix style, bold black linework, electric pink and acid green, Ben-Day dots pattern, psychedelic, truth-revealing, rebellious mood."
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    console.log("Prompt copied to clipboard");
  };

  const handleExport = () => {
    console.log("Exporting prompt:", prompt);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 
          className="font-serif text-5xl font-bold mb-4 uppercase text-center"
          data-testid="text-editor-title"
        >
          Interactive Template Editor
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Live preview your psychedelic prompts with real-time editing
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Edit Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                data-testid="input-template-editor"
              />
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopy}
                  data-testid="button-copy-prompt"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleExport}
                  data-testid="button-export-prompt"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-card p-6 rounded-md border-2 border-primary/20 min-h-[300px]">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs text-muted-foreground">Generated Preview</span>
                  </div>
                  
                  <p className="text-sm leading-relaxed" data-testid="text-preview-content">
                    {prompt}
                  </p>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Style: Underground Comix</div>
                      <div>Colors: Electric Pink, Acid Green</div>
                      <div>Mood: Rebellious, Truth-Revealing</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
