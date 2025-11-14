import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, Zap, Rocket, Crown } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BUNDLES = [
  {
    id: "single",
    name: "Single Template",
    price: "$4.99",
    icon: Sparkles,
    count: 1,
    description: "Perfect for trying out energetic templates",
    features: [
      "1 AI-generated psychedelic template",
      "Full energetic metadata (event log, trend intensity)",
      "Export in JSON, CSV, and Text formats",
      "Midjourney/DALL-E ready prompts"
    ]
  },
  {
    id: "starter",
    name: "Starter Pack",
    price: "$12.99",
    icon: Zap,
    count: 3,
    popular: true,
    description: "Get started with multiple templates",
    features: [
      "3 AI-generated templates",
      "All metadata and export formats",
      "Mix and match categories",
      "Save 13% vs. individual purchase"
    ]
  },
  {
    id: "creator",
    name: "Creator Bundle",
    price: "$19.99",
    icon: Rocket,
    count: 5,
    description: "For serious content creators",
    features: [
      "5 premium templates",
      "Full energetic lineage tracking",
      "Priority template generation",
      "Save 33% vs. individual purchase"
    ]
  },
  {
    id: "complete",
    name: "Complete Collection",
    price: "$34.99",
    icon: Crown,
    count: 10,
    description: "Maximum creative power",
    features: [
      "10 AI-generated masterpieces",
      "Complete energetic field system",
      "All categories unlocked",
      "Save 50% vs. individual purchase"
    ]
  }
];

export default function StorePage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (bundleType: string) => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive your templates",
        variant: "destructive"
      });
      return;
    }

    setLoading(bundleType);

    try {
      const response = await apiRequest("POST", "/api/create-checkout-session", {
        bundleType,
        email
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: error.message || "Unable to start checkout. Please try again.",
        variant: "destructive"
      });
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-['Bungee']">
              <span className="text-primary">Template</span> Marketplace
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Purchase energetic template bundles and download them instantly. 
              Each template includes AI-generated psychedelic art prompts with full metadata.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Email for Delivery</CardTitle>
                <CardDescription>
                  We'll send your templates to this email after purchase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                  data-testid="input-email"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUNDLES.map((bundle) => {
              const Icon = bundle.icon;
              return (
                <Card 
                  key={bundle.id} 
                  className={bundle.popular ? "border-primary border-2 relative" : ""}
                  data-testid={`card-bundle-${bundle.id}`}
                >
                  {bundle.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                      POPULAR
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="w-8 h-8 text-primary" />
                      <span className="text-3xl font-bold">{bundle.price}</span>
                    </div>
                    <CardTitle>{bundle.name}</CardTitle>
                    <CardDescription>{bundle.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {bundle.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handlePurchase(bundle.id)}
                      disabled={loading === bundle.id}
                      data-testid={`button-purchase-${bundle.id}`}
                    >
                      {loading === bundle.id ? "Processing..." : `Buy ${bundle.count} Template${bundle.count > 1 ? 's' : ''}`}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>What You Get</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">AI-Generated Prompts</h3>
                    <p className="text-sm text-muted-foreground">
                      Perplexity AI researches current trends and generates psychedelic art prompts 
                      in the style of underground comix (R. Crumb, S. Clay Wilson)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Energetic Metadata</h3>
                    <p className="text-sm text-muted-foreground">
                      Each template includes trend intensity, energy score, narrative context, 
                      and timestamp for complete provenance tracking
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Rocket className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Multi-Format Export</h3>
                    <p className="text-sm text-muted-foreground">
                      Download as JSON (developer-friendly), CSV (spreadsheet), or plain text 
                      (copy-paste into Midjourney/DALL-E)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
