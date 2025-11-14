import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: string;
  variant?: "default" | "secondary" | "outline";
}

export default function CategoryBadge({ category, variant = "default" }: CategoryBadgeProps) {
  const categoryColors: Record<string, string> = {
    "Social Media": "bg-primary text-primary-foreground",
    "Climate": "bg-secondary text-secondary-foreground",
    "AI Tech": "bg-accent text-accent-foreground",
    "Politics": "bg-chart-4 text-foreground",
    "Capitalism": "bg-chart-5 text-foreground",
    "Surveillance": "bg-destructive text-destructive-foreground",
  };

  const colorClass = categoryColors[category] || "";

  return (
    <Badge 
      variant={variant}
      className={variant === "default" ? colorClass : ""}
      data-testid={`badge-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {category}
    </Badge>
  );
}
