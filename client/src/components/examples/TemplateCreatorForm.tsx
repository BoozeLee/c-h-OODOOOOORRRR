import TemplateCreatorForm from '../TemplateCreatorForm';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

export default function TemplateCreatorFormExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-6 max-w-2xl">
        <TemplateCreatorForm onTemplateCreated={(template) => console.log("Created:", template)} />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
