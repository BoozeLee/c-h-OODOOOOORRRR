import TemplateCard from "./TemplateCard";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Template } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export default function TemplateGallery() {
  const { data: templates = [], isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
  });

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 
            className="font-serif text-5xl font-bold mb-4 uppercase"
            data-testid="text-gallery-title"
          >
            Featured Templates
          </h2>
          <p className="text-muted-foreground mb-6">
            Explore AI-powered templates that evolve with cultural trends
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates..."
              className="pl-10"
              data-testid="input-search-templates"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No templates yet. Create your first one above!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard 
                key={template.id}
                {...template}
                lastUpdated={formatDistanceToNow(new Date(template.updatedAt), { addSuffix: true })}
                preview={template.promptContent.substring(0, 80) + "..."}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
