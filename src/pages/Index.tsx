import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Shield, Camera, FileCheck, AlertCircle, Users, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-lab.jpg";
import monitoringIcon from "@/assets/monitoring-icon.jpg";
import examIcon from "@/assets/exam-icon.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
                <Shield className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">AI-Powered Proctoring</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Ensuring Academic{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Integrity
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground">
                LabGuard uses advanced AI zone monitoring to maintain exam security in computer laboratories. 
                Real-time detection, intelligent alerts, and comprehensive reporting.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="/instructor">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/monitor">View Demo</Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">99.2%</div>
                  <div className="text-sm text-muted-foreground">Detection Accuracy</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <div className="text-3xl font-bold text-primary">Real-time</div>
                  <div className="text-sm text-muted-foreground">Event Monitoring</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <div className="text-3xl font-bold text-primary">AI-Powered</div>
                  <div className="text-sm text-muted-foreground">Zone Detection</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="Computer laboratory with AI monitoring" 
                className="relative rounded-2xl shadow-medium w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Complete Exam Proctoring Solution
            </h2>
            <p className="text-lg text-muted-foreground">
              Powered by YOLO-based AI detection, LabGuard monitors exam zones in real-time 
              to ensure academic integrity throughout your testing sessions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg overflow-hidden mb-4">
                  <img src={monitoringIcon} alt="AI Monitoring" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-secondary" />
                  Zone Monitoring
                </CardTitle>
                <CardDescription>
                  AI-powered detection identifies students leaving seats, standing up, or multiple students in one zone
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg overflow-hidden mb-4">
                  <img src={examIcon} alt="Exam Management" className="w-full h-full object-cover" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-secondary" />
                  Exam Management
                </CardTitle>
                <CardDescription>
                  Create and deliver exams with ease. Simple interface for instructors to build tests and track results
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-warning" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  Real-time Alerts
                </CardTitle>
                <CardDescription>
                  Instant notifications when suspicious activity is detected during examination sessions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-success" />
                  Multi-Student Tracking
                </CardTitle>
                <CardDescription>
                  Monitor entire computer lab simultaneously with individual zone detection for each station
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Event Analytics
                </CardTitle>
                <CardDescription>
                  Comprehensive dashboard showing detected events, timestamps, and behavioral patterns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  Academic Integrity
                </CardTitle>
                <CardDescription>
                  Maintain fairness and trust in your examination process with AI-assisted supervision
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="gradient-hero text-primary-foreground shadow-medium">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Secure Your Exams?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join educational institutions using LabGuard to ensure academic integrity 
                through AI-powered proctoring.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/instructor">Create Your First Exam</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <Link to="/monitor">See Live Monitoring</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 LabGuard. AI-Powered Exam Proctoring System.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
