import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CategoryBadge from "./CategoryBadge";
import TrendMeter from "./TrendMeter";
import ExportDialog from "./ExportDialog";
import { Sparkles, GitBranch, Clock } from "lucide-react";
import type { Template } from "@shared/schema";

interface TemplateCardProps extends Omit<Template, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastUpdated?: string;
  preview?: string;
}

export default function TemplateCard({
  id = "",
  title,
  category,
  narrative,
  promptContent,
  trendIntensity,
  energyScore,
  remixCount,
  createdAt,
  updatedAt,
  lastUpdated,
  preview
}: TemplateCardProps) {
  const fullTemplate: Template = {
    id,
    title,
    category,
    narrative,
    promptContent,
    trendIntensity,
    energyScore,
    remixCount,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date()
  };
  return (
    <Card 
      className="overflow-hidden hover-elevate transition-all duration-300 border-2"
      data-testid={`card-template-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-2">
          <CategoryBadge category={category} />
          <div className="flex items-center gap-1 text-sm font-semibold text-primary">
            <Sparkles className="w-4 h-4" />
            <span data-testid="text-energy-score">{energyScore}</span>
          </div>
        </div>
        
        <h3 
          className="font-bold text-2xl leading-tight"
          data-testid="text-template-title"
        >
          {title}
        </h3>
        
        <p 
          className="text-sm text-muted-foreground italic"
          data-testid="text-narrative"
        >
          "{narrative}"
        </p>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        <TrendMeter intensity={trendIntensity} />
        
        {preview && (
          <div className="bg-muted p-3 rounded-md">
            <code className="text-xs font-mono break-words" data-testid="text-preview">
              {preview}
            </code>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 pt-4 border-t border-card-border flex-wrap">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            <span data-testid="text-remix-count">{remixCount} remixes</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span data-testid="text-last-updated">{lastUpdated}</span>
          </span>
        </div>
        
        <ExportDialog template={fullTemplate} />
      </CardFooter>
    </Card>
  );
}
