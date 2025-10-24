import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const CreateExam = () => {
  const navigate = useNavigate();
  const [examTitle, setExamTitle] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [duration, setDuration] = useState("60");
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", question: "", options: ["", "", "", ""], correctAnswer: 0 }
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now().toString(), question: "", options: ["", "", "", ""], correctAnswer: 0 }
    ]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!examTitle || !examDescription) {
      toast.error("Please fill in exam title and description");
      return;
    }

    const hasEmptyQuestions = questions.some(q => 
      !q.question || q.options.some(opt => !opt)
    );

    if (hasEmptyQuestions) {
      toast.error("Please complete all questions and options");
      return;
    }

    toast.success("Exam created successfully!");
    setTimeout(() => navigate("/instructor"), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate("/instructor")}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-3xl">Create New Exam</CardTitle>
              <CardDescription>Set up a new examination with questions and monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Exam Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Exam Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Computer Science Midterm"
                      value={examTitle}
                      onChange={(e) => setExamTitle(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the exam..."
                      value={examDescription}
                      onChange={(e) => setExamDescription(e.target.value)}
                      className="mt-1.5"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="60"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mt-1.5"
                      min="1"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Questions</h3>
                    <Button type="button" onClick={addQuestion} variant="secondary">
                      <Plus className="mr-2 w-4 h-4" />
                      Add Question
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {questions.map((question, qIndex) => (
                      <Card key={question.id} className="shadow-soft">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Question {qIndex + 1}</CardTitle>
                            {questions.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeQuestion(question.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label>Question Text</Label>
                            <Textarea
                              placeholder="Enter your question..."
                              value={question.question}
                              onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                              className="mt-1.5"
                              rows={2}
                            />
                          </div>

                          <div className="space-y-3">
                            <Label>Options</Label>
                            {question.options.map((option, optIndex) => (
                              <div key={optIndex} className="flex items-center gap-3">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`correct-${question.id}`}
                                    checked={question.correctAnswer === optIndex}
                                    onChange={() => updateQuestion(question.id, 'correctAnswer', optIndex)}
                                    className="w-4 h-4 text-primary"
                                  />
                                </div>
                                <Input
                                  placeholder={`Option ${optIndex + 1}`}
                                  value={option}
                                  onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                                  className="flex-1"
                                />
                              </div>
                            ))}
                            <p className="text-xs text-muted-foreground">
                              Select the radio button to mark the correct answer
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t">
                  <Button type="submit" variant="hero" size="lg" className="flex-1">
                    Create Exam
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate("/instructor")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
