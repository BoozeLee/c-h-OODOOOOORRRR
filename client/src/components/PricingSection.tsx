import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingSection() {
  const tiers = [
    {
      name: "Individual Template",
      price: "$3",
      description: "Perfect for trying out single prompts",
      features: [
        "1 core template",
        "Full customization",
        "Export to any format",
        "Community remixes"
      ]
    },
    {
      name: "Category Bundle",
      price: "$25",
      description: "Complete thematic collection",
      features: [
        "All templates in category",
        "Real-time trend updates",
        "Priority evolution hooks",
        "Advanced export options",
        "Remix history tracking"
      ],
      popular: true
    },
    {
      name: "Full System Access",
      price: "$89",
      description: "Unlimited creative power",
      features: [
        "All 10 core templates",
        "Unlimited remixes",
        "AI-powered variations",
        "Custom event hooks",
        "API access",
        "Early access to new templates"
      ]
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 
          className="font-serif text-5xl font-bold text-center mb-4 uppercase"
          data-testid="text-pricing-title"
        >
          Pricing Tiers
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Choose the plan that fits your creative needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card 
              key={index}
              className={`hover-elevate transition-all ${tier.popular ? 'border-primary border-2 shadow-lg' : ''}`}
              data-testid={`card-pricing-${index}`}
            >
              {tier.popular && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                  MOST POPULAR
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl" data-testid={`text-tier-name-${index}`}>
                  {tier.name}
                </CardTitle>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-5xl font-bold" data-testid={`text-tier-price-${index}`}>
                    {tier.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {tier.description}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-start gap-2"
                      data-testid={`text-feature-${index}-${featureIndex}`}
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                  data-testid={`button-select-tier-${index}`}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
