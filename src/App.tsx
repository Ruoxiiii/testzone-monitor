import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InstructorDashboard from "./pages/InstructorDashboard";
import CreateExam from "./pages/CreateExam";
import ExamSession from "./pages/ExamSession";
import MonitorDashboard from "./pages/MonitorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/instructor/create-exam" element={<CreateExam />} />
          <Route path="/exam/:examId" element={<ExamSession />} />
          <Route path="/monitor" element={<MonitorDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
