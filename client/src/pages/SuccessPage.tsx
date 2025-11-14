import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Mail } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [, setLocation] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("session_id");
    setSessionId(id);
  }, []);

  const { data: sessionData, isLoading } = useQuery({
    queryKey: [`/api/session/${sessionId}`],
    enabled: !!sessionId,
    retry: 5,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Confirming your purchase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Bungee']">
              <span className="text-primary">Payment</span> Successful!
            </h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your purchase. Your energetic templates are ready!
            </p>
          </div>

          {sessionData?.downloadToken && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Your Templates Are Ready
                </CardTitle>
                <CardDescription>
                  Download your {sessionData.bundleType} bundle now
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Secure Download Link</p>
                    <p className="text-sm text-muted-foreground">
                      Your unique download token: <code className="bg-muted px-2 py-1 rounded text-xs">{sessionData.downloadToken.slice(0, 16)}...</code>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">All Formats Included</p>
                    <p className="text-sm text-muted-foreground">
                      JSON, CSV, and plain text formats ready to use
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Complete Metadata</p>
                    <p className="text-sm text-muted-foreground">
                      Energetic fields, trend data, and provenance tracking
                    </p>
                  </div>
                </div>
                <Button 
                  asChild 
                  className="w-full" 
                  size="lg"
                  data-testid="button-download-templates"
                >
                  <Link href={`/download/${sessionData.downloadToken}`}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Templates Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your AI-generated psychedelic templates are crafted using real-time cultural research 
                via Perplexity AI. Each template captures the zeitgeist of 2025 with underground comix 
                aesthetics and truth-revealing satire.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1" data-testid="button-browse-templates">
                  <Link href="/">
                    <Download className="w-4 h-4 mr-2" />
                    Browse More Templates
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1" data-testid="button-buy-more">
                  <Link href="/store">
                    Buy More Bundles
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Questions? Contact support or visit our{" "}
              <Link href="/#how-it-works" className="text-primary hover:underline">
                How It Works
              </Link>{" "}
              section.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
