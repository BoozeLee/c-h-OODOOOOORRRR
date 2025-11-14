import ExportDialog from '../ExportDialog';
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

export default function ExportDialogExample() {
  const mockTemplate = {
    id: "123",
    title: "Scrollpocalypse Now",
    category: "Social Media",
    narrative: "The endless scroll as modern mythology",
    promptContent: "A smartphone transforms into an ancient scroll, infinitely unfurling with TikTok videos instead of hieroglyphics. Underground comix style, bold black linework, electric pink and acid green, Ben-Day dots pattern, psychedelic, truth-revealing, rebellious mood.",
    trendIntensity: 87,
    energyScore: 94,
    remixCount: 234,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return (
    <div className="p-6">
      <ExportDialog template={mockTemplate}>
        <Button>Open Export Dialog</Button>
      </ExportDialog>
      <Toaster />
    </div>
  );
}
