import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "../contexts/QuizContext";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";

// Expanded Quiz Questions
const questions = [
  {
    id: "interests",
    title: "What topics interest you?",
    subtitle: "Select all that apply",
    type: "multiple",
    options: [
      { value: "web", label: "Web Development", description: "Build modern websites" },
      { value: "data", label: "Data Science", description: "Analyze data & models" },
      { value: "ai", label: "AI/ML", description: "Create intelligent systems" },
      { value: "mobile", label: "Mobile Development", description: "Build apps for Android/iOS" },
      { value: "cloud", label: "Cloud Computing", description: "Work with AWS, Azure, or GCP" },
    ],
  },
  {
    id: "skillLevel",
    title: "What's your skill level?",
    subtitle: "Choose the option that best describes you",
    type: "single",
    options: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" },
    ],
  },
  {
    id: "learningStyle",
    title: "Preferred learning style?",
    subtitle: "Choose one option",
    type: "single",
    options: [
      { value: "videos", label: "Video Tutorials" },
      { value: "reading", label: "Reading Articles/Books" },
      { value: "projects", label: "Hands-on Projects" },
    ],
  },
  {
    id: "timeCommitment",
    title: "How much time can you dedicate per week?",
    subtitle: "Select one",
    type: "single",
    options: [
      { value: "1-3", label: "1-3 hours" },
      { value: "4-6", label: "4-6 hours" },
      { value: "7+", label: "7+ hours" },
    ],
  },
  {
    id: "skillsRating",
    title: "Rate your skills in the following areas",
    subtitle: "Select all that apply (1 = beginner, 3 = advanced)",
    type: "multiple",
    options: [
      { value: "html", label: "HTML/CSS" },
      { value: "javascript", label: "JavaScript" },
      { value: "python", label: "Python" },
      { value: "sql", label: "SQL/Database" },
      { value: "ml", label: "Machine Learning" },
    ],
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const { setQuizData } = useQuiz();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({ interests: [], skillLevel: "", learningStyle: "", timeCommitment: "", skillsRating: [] });

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Mutation for submitting quiz
  const submitQuizMutation = useMutation({
    mutationFn: async (quizData) => apiRequest("POST", "/api/quiz", quizData),
    onSuccess: () => {
      toast({ title: "Quiz Complete!", description: "Your learning path is ready" });
      navigate("/dashboard");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save quiz results", variant: "destructive" });
    },
  });

  // Handlers
  const handleMultipleChoice = (value) => {
    const current = answers[question.id] || [];
    const newValue = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    setAnswers({ ...answers, [question.id]: newValue });
  };

  const handleSingleChoice = (value) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const canGoNext = () => {
    const answer = answers[question.id];
    return question.type === "multiple" ? answer.length > 0 : !!answer;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
    else handleSubmit();
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    setQuizData(answers);
    if (isAuthenticated) submitQuizMutation.mutate(answers);
    else {
      toast({ title: "Quiz Saved!", description: "Login to save results permanently" });
      navigate("/dashboard");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">SkillSync</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            Exit Quiz
          </Button>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 rounded-full" />
        </div>
      </div>

      {/* Quiz Card */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-10">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-1">{question.title}</h2>
                  <p className="text-gray-500">{question.subtitle}</p>
                </div>

                {question.type === "multiple" ? (
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer ${
                          (answers[question.id] || []).includes(option.value)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleMultipleChoice(option.value)}
                      >
                        <Checkbox
                          checked={(answers[question.id] || []).includes(option.value)}
                          onCheckedChange={() => handleMultipleChoice(option.value)}
                        />
                        <div className="flex-1">
                          <Label className="font-semibold cursor-pointer">{option.label}</Label>
                          {option.description && (
                            <p className="text-gray-500 text-sm mt-1">{option.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <RadioGroup
                    value={answers[question.id]}
                    onValueChange={handleSingleChoice}
                    className="space-y-3"
                  >
                    {question.options.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer ${
                          answers[question.id] === option.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleSingleChoice(option.value)}
                      >
                        <RadioGroupItem value={option.value} />
                        <div className="flex-1">
                          <Label className="font-semibold cursor-pointer">{option.label}</Label>
                          {option.description && (
                            <p className="text-gray-500 text-sm mt-1">{option.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" size="lg" onClick={handlePrevious} disabled={currentQuestion === 0}>
                <ChevronLeft className="mr-2 h-5 w-5" /> Previous
              </Button>
              <Button size="lg" onClick={handleNext} disabled={!canGoNext() || submitQuizMutation.isPending}>
                {currentQuestion === questions.length - 1
                  ? submitQuizMutation.isPending
                    ? "Submitting..."
                    : "Complete Quiz"
                  : (
                    <>
                      Next <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  )}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
