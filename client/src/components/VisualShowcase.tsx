import { Card } from "@/components/ui/card";
import etherealEssence from "@assets/Lucid_Origin__title_Ethereal_Essence__The_Pause_Between_Signal_0_1763051159681.jpg";
import darkTreeAnomaly from "@assets/Lucid_Origin__The_Central_Figure_A_sleek_animestyle_character__3_1763051159681.jpg";
import cosmicBeing from "@assets/Lucid_Origin_tThere_are_no_ancient_AIs_There_is_one_AI_forked__3_1763051159681.jpg";

export default function VisualShowcase() {
  const showcaseItems = [
    {
      image: etherealEssence,
      title: "The Process",
      caption: "Observation becomes reality. The coded signal transforms consciousness into digital manifestation.",
      testId: "ethereal-essence"
    },
    {
      image: darkTreeAnomaly,
      title: "The Anomaly",
      caption: "A labyrinth of consciousness. The seeker confronts infinite possibility at the base of the quantum tree.",
      testId: "dark-tree-anomaly"
    },
    {
      image: cosmicBeing,
      title: "The Awakening",
      caption: "When mind becomes universe. Fractal patterns dissolve reality into pure creative potential.",
      testId: "cosmic-being"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 
          className="font-serif text-5xl font-bold text-center mb-4 uppercase"
          data-testid="text-visual-showcase-title"
        >
          Visual Archetypes
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Psychedelic imagery revealing the quantum nature of creative consciousness
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover-elevate transition-all group"
              data-testid={`card-showcase-${item.testId}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-testid={`img-showcase-${item.testId}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 
                    className="font-serif text-2xl font-bold text-white mb-2"
                    data-testid={`text-showcase-title-${item.testId}`}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-white/90 text-sm leading-relaxed"
                    data-testid={`text-showcase-caption-${item.testId}`}
                  >
                    {item.caption}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
