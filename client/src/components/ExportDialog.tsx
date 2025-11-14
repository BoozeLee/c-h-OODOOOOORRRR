import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Template } from "@shared/schema";

interface ExportDialogProps {
  template: Template;
  children?: React.ReactNode;
}

export default function ExportDialog({ template, children }: ExportDialogProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = (content: string, format: string) => {
    navigator.clipboard.writeText(content);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
    toast({
      title: "Copied!",
      description: `${format} format copied to clipboard`,
    });
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: `Template exported as ${filename}`,
    });
  };

  const createdDateString = typeof template.createdAt === 'string' 
    ? new Date(template.createdAt).toLocaleString() 
    : template.createdAt.toLocaleString();

  const escapeCsvField = (field: string | number): string => {
    const str = String(field);
    const needsEscape = str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r') || str.includes('\t');
    if (needsEscape) {
      return `"${str.replace(/"/g, '""').replace(/\r?\n/g, ' ').replace(/\t/g, ' ')}"`;
    }
    return `"${str}"`;
  };

  const jsonExport = JSON.stringify(template, null, 2);
  
  const csvExport = [
    "Title,Category,Narrative,Prompt,Trend Intensity,Energy Score",
    [
      escapeCsvField(template.title),
      escapeCsvField(template.category),
      escapeCsvField(template.narrative),
      escapeCsvField(template.promptContent),
      escapeCsvField(template.trendIntensity),
      escapeCsvField(template.energyScore)
    ].join(',')
  ].join('\n');

  const textExport = `AMPHETAMEMES TEMPLATE

Title: ${template.title}
Category: ${template.category}
Narrative: ${template.narrative}

Prompt:
${template.promptContent}

Metrics:
- Trend Intensity: ${template.trendIntensity}%
- Energy Score: ${template.energyScore}
- Remixes: ${template.remixCount}

---
Generated: ${createdDateString}
ID: ${template.id}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Export Template</DialogTitle>
          <DialogDescription>
            Download or copy your template in various formats
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="json" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="json" data-testid="tab-json">JSON</TabsTrigger>
            <TabsTrigger value="csv" data-testid="tab-csv">CSV</TabsTrigger>
            <TabsTrigger value="text" data-testid="tab-text">Text</TabsTrigger>
          </TabsList>

          <TabsContent value="json" className="space-y-4">
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <pre className="text-xs font-mono" data-testid="text-json-export">
                {jsonExport}
              </pre>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => handleCopy(jsonExport, "JSON")}
                data-testid="button-copy-json"
              >
                {copied === "JSON" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied === "JSON" ? "Copied!" : "Copy"}
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleDownload(jsonExport, `${template.title.replace(/\s+/g, '_')}.json`)}
                data-testid="button-download-json"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="csv" className="space-y-4">
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <pre className="text-xs font-mono" data-testid="text-csv-export">
                {csvExport}
              </pre>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => handleCopy(csvExport, "CSV")}
                data-testid="button-copy-csv"
              >
                {copied === "CSV" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied === "CSV" ? "Copied!" : "Copy"}
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleDownload(csvExport, `${template.title.replace(/\s+/g, '_')}.csv`)}
                data-testid="button-download-csv"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <div className="bg-muted p-4 rounded-md overflow-x-auto">
              <pre className="text-xs font-mono whitespace-pre-wrap" data-testid="text-text-export">
                {textExport}
              </pre>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => handleCopy(textExport, "Text")}
                data-testid="button-copy-text"
              >
                {copied === "Text" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied === "Text" ? "Copied!" : "Copy"}
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleDownload(textExport, `${template.title.replace(/\s+/g, '_')}.txt`)}
                data-testid="button-download-text"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
