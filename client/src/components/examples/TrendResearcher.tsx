import TrendResearcher from '../TrendResearcher';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

export default function TrendResearcherExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-6 max-w-2xl">
        <TrendResearcher onTrendSelected={(trend) => console.log("Selected:", trend)} />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
