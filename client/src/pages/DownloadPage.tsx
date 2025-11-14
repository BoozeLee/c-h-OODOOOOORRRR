import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, FileJson, FileText, FileSpreadsheet } from "lucide-react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Template } from "@shared/schema";

function exportAsJSON(templates: Template[], bundleType: string) {
  const data = {
    bundle: bundleType,
    exportedAt: new Date().toISOString(),
    templates: templates.map(t => ({
      id: t.id,
      title: t.title,
      category: t.category,
      narrative: t.narrative,
      promptContent: t.promptContent,
      trendIntensity: t.trendIntensity,
      energyScore: t.energyScore,
      remixCount: t.remixCount,
      createdAt: t.createdAt,
    }))
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `amphetamemes-${bundleType}-bundle.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportAsCSV(templates: Template[], bundleType: string) {
  const escapeCSV = (value: any) => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const headers = ['ID', 'Title', 'Category', 'Narrative', 'Prompt', 'Trend Intensity', 'Energy Score', 'Remix Count', 'Created At'];
  const rows = templates.map(t => [
    t.id,
    t.title,
    t.category,
    t.narrative,
    t.promptContent,
    t.trendIntensity,
    t.energyScore,
    t.remixCount,
    t.createdAt instanceof Date ? t.createdAt.toISOString() : t.createdAt
  ]);

  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map(row => row.map(escapeCSV).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `amphetamemes-${bundleType}-bundle.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportAsText(templates: Template[], bundleType: string) {
  const textContent = templates.map((t, idx) => `
===========================================
TEMPLATE ${idx + 1}: ${t.title}
===========================================

Category: ${t.category}
Narrative: ${t.narrative}

MIDJOURNEY/DALL-E PROMPT:
${t.promptContent}

METADATA:
- Trend Intensity: ${t.trendIntensity}%
- Energy Score: ${t.energyScore}
- Remix Count: ${t.remixCount}
- Created: ${t.createdAt instanceof Date ? t.createdAt.toLocaleDateString() : new Date(t.createdAt).toLocaleDateString()}

`).join('\n');

  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `amphetamemes-${bundleType}-bundle.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function DownloadPage() {
  const params = useParams();
  const token = params.token;
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'text' | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/download/${token}`],
    enabled: !!token,
  });

  const handleExport = (format: 'json' | 'csv' | 'text') => {
    if (!data?.templates) return;

    setExportFormat(format);
    
    try {
      switch (format) {
        case 'json':
          exportAsJSON(data.templates, data.bundleType);
          break;
        case 'csv':
          exportAsCSV(data.templates, data.bundleType);
          break;
        case 'text':
          exportAsText(data.templates, data.bundleType);
          break;
      }
      
      toast({
        title: "Export Successful",
        description: `Downloaded ${data.templates.length} templates as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to download templates. Please try again.",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => setExportFormat(null), 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your templates...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4 text-destructive">Download Not Found</h1>
            <p className="text-muted-foreground mb-8">
              This download link is invalid or has expired. Please check your email or contact support.
            </p>
            <Button asChild data-testid="button-back-to-store">
              <Link href="/store">Back to Store</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-['Bungee']">
              <span className="text-primary">Your</span> Templates
            </h1>
            <p className="text-xl text-muted-foreground">
              {data.templates.length} psychedelic art templates ready to download
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Options
              </CardTitle>
              <CardDescription>
                Download your {data.bundleType} bundle in your preferred format
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => handleExport('json')}
                disabled={exportFormat === 'json'}
                className="h-auto py-4 flex-col gap-2"
                data-testid="button-export-json"
              >
                <FileJson className="w-8 h-8" />
                <span className="font-bold">JSON</span>
                <span className="text-xs opacity-70">Developer-friendly</span>
              </Button>
              <Button 
                onClick={() => handleExport('csv')}
                disabled={exportFormat === 'csv'}
                className="h-auto py-4 flex-col gap-2"
                data-testid="button-export-csv"
              >
                <FileSpreadsheet className="w-8 h-8" />
                <span className="font-bold">CSV</span>
                <span className="text-xs opacity-70">Spreadsheet format</span>
              </Button>
              <Button 
                onClick={() => handleExport('text')}
                disabled={exportFormat === 'text'}
                className="h-auto py-4 flex-col gap-2"
                data-testid="button-export-text"
              >
                <FileText className="w-8 h-8" />
                <span className="font-bold">Text</span>
                <span className="text-xs opacity-70">Midjourney/DALL-E ready</span>
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.templates.map((template: Template, idx: number) => (
              <Card key={template.id} data-testid={`card-template-${idx}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      {template.category}
                    </span>
                  </div>
                  <CardDescription>{template.narrative}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Art Prompt:</p>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded font-mono">
                      {template.promptContent}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Trend</p>
                      <p className="font-bold text-primary">{template.trendIntensity}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Energy</p>
                      <p className="font-bold text-primary">{template.energyScore}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Remixes</p>
                      <p className="font-bold text-primary">{template.remixCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" data-testid="button-buy-more">
              <Link href="/store">
                Buy More Templates
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
