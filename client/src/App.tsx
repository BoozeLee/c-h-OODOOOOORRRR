import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Route, Switch } from "wouter";
import HomePage from "@/pages/HomePage";
import StorePage from "@/pages/StorePage";
import SuccessPage from "@/pages/SuccessPage";
import DownloadPage from "@/pages/DownloadPage";
import NotFound from "@/pages/not-found";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/store" component={StorePage} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/download/:token" component={DownloadPage} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}
