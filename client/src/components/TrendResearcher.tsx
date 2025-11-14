import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { TrendingUp, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrendResearcherProps {
  onTrendSelected?: (trend: string) => void;
}

export default function TrendResearcher({ onTrendSelected }: TrendResearcherProps) {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const researchMutation = useMutation({
    mutationFn: async (searchQuery: string) => {
      try {
        const response = await apiRequest("POST", "/api/trends/research", { query: searchQuery });
        return await response.json() as { trends: string };
      } catch (error: any) {
        console.error("Trend research error:", error);
        let errorMessage = "Failed to research trends";
        
        if (error instanceof Error) {
          const match = error.message.match(/\d+:\s*(.+)/);
          errorMessage = match ? match[1] : error.message;
        }
        
        throw new Error(errorMessage);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Research Failed",
        description: error.message || "Failed to research trends. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length < 2) {
      toast({
        title: "Query too short",
        description: "Please enter at least 2 characters",
        variant: "destructive",
      });
      return;
    }
    researchMutation.mutate(query);
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <TrendingUp className="w-6 h-6 text-secondary" />
          Trend Research
        </CardTitle>
        <CardDescription>
          Discover what's trending right now to inspire your next template
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., social media, AI, climate..."
              disabled={researchMutation.isPending}
              data-testid="input-trend-query"
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={researchMutation.isPending || query.trim().length < 2}
              data-testid="button-research-trends"
            >
              {researchMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Research
                </>
              )}
            </Button>
          </div>
        </form>

        {researchMutation.data && (
          <div className="mt-6 space-y-4">
            <div className="bg-muted/50 p-6 rounded-md border">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Current Trends
              </h4>
              <div className="prose prose-sm max-w-none" data-testid="text-trends-result">
                <div className="whitespace-pre-wrap text-sm">
                  {researchMutation.data.trends}
                </div>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Click "Generate Template" above and use these insights for your topic
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
