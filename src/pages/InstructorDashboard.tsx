import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Plus, FileText, Clock, Users, AlertCircle } from "lucide-react";

const InstructorDashboard = () => {
  const exams = [
    {
      id: "1",
      title: "Computer Science Midterm",
      status: "active",
      students: 28,
      duration: "90 min",
      created: "2025-01-15",
    },
    {
      id: "2",
      title: "Database Systems Final",
      status: "scheduled",
      students: 32,
      duration: "120 min",
      created: "2025-01-10",
    },
    {
      id: "3",
      title: "Web Development Quiz",
      status: "completed",
      students: 25,
      duration: "45 min",
      created: "2025-01-05",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Instructor Dashboard</h1>
              <p className="text-muted-foreground">Manage your exams and monitor student performance</p>
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/instructor/create-exam">
                <Plus className="mr-2" />
                Create New Exam
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">12</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Now</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">1</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Students Tested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">285</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Events Detected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">47</div>
              </CardContent>
            </Card>
          </div>

          {/* Exams List */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Your Exams</CardTitle>
              <CardDescription>Manage and monitor all your examination sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exams.map((exam) => (
                  <div 
                    key={exam.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{exam.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            exam.status === 'active' 
                              ? 'bg-success/10 text-success' 
                              : exam.status === 'scheduled'
                              ? 'bg-secondary/10 text-secondary'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {exam.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {exam.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {exam.duration}
                          </span>
                          <span>Created {exam.created}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {exam.status === 'active' && (
                        <Button asChild variant="secondary" size="sm">
                          <Link to="/monitor">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Monitor
                          </Link>
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
