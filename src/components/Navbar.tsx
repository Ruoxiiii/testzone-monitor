import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LabGuard
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/instructor" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Instructor Dashboard
            </Link>
            <Link to="/monitor" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Live Monitor
            </Link>
            <Button asChild variant="hero" size="sm">
              <Link to="/exam/demo">Take Demo Exam</Link>
            </Button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t space-y-2">
            <Link 
              to="/instructor" 
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Instructor Dashboard
            </Link>
            <Link 
              to="/monitor" 
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Live Monitor
            </Link>
            <div className="px-4 pt-2">
              <Button asChild variant="hero" size="sm" className="w-full">
                <Link to="/exam/demo" onClick={() => setIsMobileMenuOpen(false)}>Take Demo Exam</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
