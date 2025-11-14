import TemplateCard from '../TemplateCard';

export default function TemplateCardExample() {
  return (
    <div className="p-6 max-w-md">
      <TemplateCard
        title="Scrollpocalypse Now"
        category="Social Media"
        narrative="The endless scroll as modern mythology"
        trendIntensity={87}
        energyScore={94}
        remixCount={234}
        lastUpdated="2h ago"
        preview="A smartphone transforms into an ancient scroll, infinitely unfurling..."
      />
    </div>
  );
}
