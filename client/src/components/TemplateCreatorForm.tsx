import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Template } from "@shared/schema";

const categories = [
  "Social Media",
  "Climate",
  "AI Tech",
  "Politics",
  "Capitalism",
  "Surveillance",
  "Technology",
  "Culture",
  "Psychology",
  "General"
];

interface TemplateCreatorFormProps {
  onTemplateCreated?: (template: Template) => void;
}

export default function TemplateCreatorForm({ onTemplateCreated }: TemplateCreatorFormProps) {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("General");
  const { toast } = useToast();

  const createMutation = useMutation({
    mutationFn: async (data: { topic: string; category: string }) => {
      const response = await apiRequest("POST", "/api/templates/generate", data);
      return await response.json() as Template;
    },
    onSuccess: (template) => {
      toast({
        title: "Template Created!",
        description: `"${template.title}" has been generated with AI-powered research.`,
      });
      setTopic("");
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      if (onTemplateCreated) {
        onTemplateCreated(template);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate template. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim().length < 3) {
      toast({
        title: "Topic too short",
        description: "Please enter at least 3 characters",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate({ topic, category });
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl">
          <Sparkles className="w-7 h-7 text-primary" />
          AI Template Creator
        </CardTitle>
        <CardDescription>
          Enter a topic and let AI research current trends to generate a psychedelic art prompt
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic or Theme</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., social media addiction, climate anxiety, AI consciousness..."
              disabled={createMutation.isPending}
              data-testid="input-template-topic"
            />
            <p className="text-xs text-muted-foreground">
              AI will research real-time trends and cultural context
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={setCategory}
              disabled={createMutation.isPending}
            >
              <SelectTrigger id="category" data-testid="select-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={createMutation.isPending || topic.trim().length < 3}
            data-testid="button-generate-template"
          >
            {createMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Researching & Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Template
              </>
            )}
          </Button>
        </form>

        {createMutation.data && (
          <div className="mt-6 p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-md border-2 border-primary/20">
            <h3 className="font-bold text-xl mb-2" data-testid="text-generated-title">
              {createMutation.data.title}
            </h3>
            <p className="text-sm italic text-muted-foreground mb-4" data-testid="text-generated-narrative">
              "{createMutation.data.narrative}"
            </p>
            <div className="bg-card p-4 rounded-md">
              <code className="text-sm font-mono break-words" data-testid="text-generated-prompt">
                {createMutation.data.promptContent}
              </code>
            </div>
            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
              <span>Trend: {createMutation.data.trendIntensity}%</span>
              <span>Energy: {createMutation.data.energyScore}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
