import { TrendingUp } from "lucide-react";

interface TrendMeterProps {
  intensity: number;
  label?: string;
}

export default function TrendMeter({ intensity, label = "Trend Intensity" }: TrendMeterProps) {
  const getIntensityColor = (value: number) => {
    if (value >= 80) return "bg-destructive";
    if (value >= 60) return "bg-primary";
    if (value >= 40) return "bg-accent";
    return "bg-secondary";
  };

  return (
    <div className="space-y-2" data-testid="trend-meter">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          {label}
        </span>
        <span className="font-semibold" data-testid="text-trend-intensity">
          {intensity}%
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${getIntensityColor(intensity)} transition-all duration-500`}
          style={{ width: `${intensity}%` }}
          data-testid="bar-trend-intensity"
        />
      </div>
    </div>
  );
}
