import { Sparkles, Users, TrendingUp } from "lucide-react";

export default function QuickStatsBar() {
  const stats = [
    { icon: Sparkles, label: "Core Templates", value: "10", color: "text-primary" },
    { icon: Users, label: "Remixes", value: "1000+", color: "text-secondary" },
    { icon: TrendingUp, label: "Real-Time Evolution", value: "Active", color: "text-accent" }
  ];

  return (
    <div className="bg-card border-y border-card-border py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="flex items-center justify-center gap-4"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <div className="text-3xl font-bold" data-testid={`text-stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
