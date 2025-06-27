import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import SolidityAudit from "./pages/SolidityAudit";
import ScrollToTop from "./components/ScrollToTop";
import { ThirdwebProvider } from "thirdweb/react";

const queryClient = new QueryClient();

const App = () => (
  <ThirdwebProvider>
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {navItems.map(({ to, page }) => (
              <Route key={to} path={to} element={page} />
            ))}
            <Route path="/solidity-audit" element={<SolidityAudit />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>
  </ThirdwebProvider>
);

export default App;
