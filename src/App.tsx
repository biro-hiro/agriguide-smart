import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnboardingRedirect from "./components/OnboardingRedirect";
import OnboardingPage from "./pages/OnboardingPage";
import Index from "./pages/Index";
import CropsPage from "./pages/CropsPage";
import PestsPage from "./pages/PestsPage";
import CalendarPage from "./pages/CalendarPage";
import CommunityPage from "./pages/CommunityPage";
import HybridPage from "./pages/HybridPage";
import ToolsPage from "./pages/ToolsPage";
import EnvironmentPage from "./pages/EnvironmentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OnboardingRedirect>
          <Routes>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/" element={<Index />} />
            <Route path="/crops" element={<CropsPage />} />
            <Route path="/pests" element={<PestsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/hybrid" element={<HybridPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/environment" element={<EnvironmentPage />} />
            <Route path="/tips" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </OnboardingRedirect>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
