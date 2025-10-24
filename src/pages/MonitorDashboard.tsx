import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Camera, AlertTriangle, CheckCircle, Users, Activity } from "lucide-react";

interface DetectionEvent {
  id: string;
  zone: string;
  type: "standing" | "left_seat" | "multiple_students";
  timestamp: string;
  severity: "low" | "medium" | "high";
}

const MonitorDashboard = () => {
  const [events, setEvents] = useState<DetectionEvent[]>([
    {
      id: "1",
      zone: "Zone A-3",
      type: "standing",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      severity: "low"
    },
    {
      id: "2",
      zone: "Zone B-7",
      type: "left_seat",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      severity: "high"
    },
  ]);

  const [activeStudents] = useState(28);
  const [totalZones] = useState(32);

  useEffect(() => {
    // Simulate real-time event detection
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const zones = ["A-1", "A-2", "A-3", "B-1", "B-5", "B-7", "C-2", "C-4"];
        const types: DetectionEvent["type"][] = ["standing", "left_seat", "multiple_students"];
        const severities: DetectionEvent["severity"][] = ["low", "medium", "high"];
        
        const newEvent: DetectionEvent = {
          id: Date.now().toString(),
          zone: `Zone ${zones[Math.floor(Math.random() * zones.length)]}`,
          type: types[Math.floor(Math.random() * types.length)],
          timestamp: new Date().toISOString(),
          severity: severities[Math.floor(Math.random() * severities.length)]
        };

        setEvents(prev => [newEvent, ...prev].slice(0, 10));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getEventLabel = (type: DetectionEvent["type"]) => {
    switch (type) {
      case "standing":
        return "Student Standing";
      case "left_seat":
        return "Left Seat";
      case "multiple_students":
        return "Multiple Students";
    }
  };

  const getSeverityColor = (severity: DetectionEvent["severity"]) => {
    switch (severity) {
      case "low":
        return "bg-success/10 text-success border-success/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Live Monitoring Dashboard</h1>
            <p className="text-muted-foreground">Real-time AI zone detection and event tracking</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Active Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse-glow" />
                  <span className="text-2xl font-bold text-success">Monitoring</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Active Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{activeStudents}/{totalZones}</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Compliant Zones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">26</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Events Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">{events.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Zone Grid Visualization */}
            <Card className="lg:col-span-2 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-secondary" />
                  Zone Status Grid
                </CardTitle>
                <CardDescription>Real-time visualization of all monitored zones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-8 gap-2">
                  {Array.from({ length: 32 }, (_, i) => {
                    const hasEvent = events.some(e => e.zone.includes(`${Math.floor(i / 8) + 1}-${(i % 8) + 1}`));
                    const isOccupied = i < activeStudents;
                    
                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all ${
                          hasEvent
                            ? 'border-destructive bg-destructive/10 shadow-alert'
                            : isOccupied
                            ? 'border-success bg-success/10'
                            : 'border-muted bg-muted/50'
                        }`}
                      >
                        {String.fromCharCode(65 + Math.floor(i / 8))}-{(i % 8) + 1}
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex items-center gap-6 mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-success bg-success/10" />
                    <span className="text-sm text-muted-foreground">Normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-destructive bg-destructive/10" />
                    <span className="text-sm text-muted-foreground">Alert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-muted bg-muted/50" />
                    <span className="text-sm text-muted-foreground">Empty</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Log */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Recent Events
                </CardTitle>
                <CardDescription>AI-detected zone violations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="w-12 h-12 mx-auto mb-3 text-success" />
                      <p className="font-medium">All Clear</p>
                      <p className="text-sm">No events detected</p>
                    </div>
                  ) : (
                    events.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-medium text-sm">{event.zone}</span>
                          <Badge className={getSeverityColor(event.severity)}>
                            {event.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {getEventLabel(event.type)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimestamp(event.timestamp)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorDashboard;
