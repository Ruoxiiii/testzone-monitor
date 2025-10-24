import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Shield, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const ExamSession = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds

  const questions = [
    {
      id: 1,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    },
    {
      id: 2,
      question: "Which data structure uses LIFO principle?",
      options: ["Queue", "Stack", "Array", "Tree"],
    },
    {
      id: 3,
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Question Language",
        "System Query List",
        "Standard Quality Logic"
      ],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const answered = Object.keys(answers).length;
    toast.success(`Exam submitted! You answered ${answered} out of ${questions.length} questions.`);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold">Computer Science Demo Exam</h1>
                <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warning/10 border border-warning/20">
                <Clock className="w-5 h-5 text-warning" />
                <span className="font-mono font-semibold text-warning">{formatTime(timeRemaining)}</span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20">
                <Shield className="w-5 h-5 text-success animate-pulse-glow" />
                <span className="text-sm font-medium text-success">Monitoring Active</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-medium mb-6">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-primary">{currentQuestion + 1}</span>
                </div>
                <CardTitle className="text-2xl pt-2">{questions[currentQuestion].question}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    index === currentQuestion
                      ? 'bg-primary text-primary-foreground'
                      : answers[index]
                      ? 'bg-success/20 text-success'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === questions.length - 1 ? (
              <Button variant="hero" onClick={handleSubmit}>
                Submit Exam
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>

          {/* Info Banner */}
          <Card className="mt-6 border-secondary/20 bg-secondary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-secondary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-secondary mb-1">AI Monitoring Active</p>
                  <p className="text-muted-foreground">
                    This exam session is being monitored by LabGuard's AI zone detection system. 
                    Please remain in your designated area throughout the examination.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExamSession;
