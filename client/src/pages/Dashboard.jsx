import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQuiz } from "@/contexts/QuizContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import JavaImage from '../assets/java.png';
import DsaImage from '../assets/Dsa.png';
import ExcelImage from '../assets/Excel.png';

import {
  Flame,
  BookOpen,
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle,
  Quote,
  Star,
} from "lucide-react";

const carouselImages = [
  "https://img.freepik.com/free-photo/science-dna-research-development-human_53876-121145.jpg",
  "https://previews.123rf.com/images/annebel146/annebel1462304/annebel146230400306/202866384-genetics-and-medical-science-concept-shiny-dna-molecule-colorful-background-genetic-research-and.jpg",
  "https://png.pngtree.com/png-clipart/20250101/original/pngtree-high-quality-image-of-a-dna-strand-representing-molecular-biology-research-png-image_18496660.png",
];

export default function Dashboard({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { quizData } = useQuiz();
  const { toast } = useToast();

  const { data: enrollments = [], isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["/api/enrollments"],
    enabled: isAuthenticated,
  });

  const completedCourses = enrollments.filter((e) => e.completed).length;
  const totalProgress = enrollments.length
    ? enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length
    : 0;
  const learningStreak = 7;

  const motivationalMessages = [
    "You're doing great! Keep up the momentum!",
    "Every step forward is progress. Stay consistent!",
    "Your dedication is inspiring. Keep learning!",
    "Small daily improvements lead to stunning results!",
    "You're building valuable skills every day!",
  ];

  const randomMessage =
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (enrollmentsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 overflow-auto">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-sans">SkillSync</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/dashboard"
                className="text-sm font-medium text-blue-500"
              >
                Dashboard
              </Link>
              <Link
                to="/courses"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Courses
              </Link>
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Profile
              </Link>
              <Link
                to="/notifications"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Notifications
              </Link>
            </nav>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                navigate("/login");
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 font-sans">
            Welcome back, {user?.firstName || "Learner"}!
          </h1>
          <p className="text-xl text-gray-500">{randomMessage}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: "Learning Streak",
              value: `${learningStreak} days`,
              icon: Flame,
              gradient: "from-indigo-500 via-blue-500 to-cyan-400",
              shadow: "shadow-blue-300/50",
            },
            {
              title: "Courses Enrolled",
              value: enrollments.length,
              icon: BookOpen,
              gradient: "from-amber-400 via-yellow-400 to-orange-300",
              shadow: "shadow-amber-300/50",
            },
            {
              title: "Completed",
              value: completedCourses,
              icon: Award,
              gradient: "from-emerald-400 via-green-400 to-lime-300",
              shadow: "shadow-emerald-300/50",
            },
            {
              title: "Overall Progress",
              value: `${Math.round(totalProgress)}%`,
              icon: TrendingUp,
              gradient: "from-pink-500 via-rose-500 to-red-400",
              shadow: "shadow-pink-300/50",
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-tr ${stat.gradient} ${stat.shadow}`}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm mb-1 font-medium tracking-wide">
                      {stat.title}
                    </p>
                    <p className="text-white text-4xl font-extrabold drop-shadow-sm animate-pulse">
                      {stat.value}
                    </p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel */}
        <section className="relative mb-12 rounded-2xl overflow-hidden shadow-lg">
          <div className="relative w-full h-[400px]">
            <img
              src={carouselImages[currentIndex]}
              alt="Learning Carousel"
              className="w-full h-full object-cover transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex flex-col justify-center px-10">
              <h2 className="text-4xl font-bold text-white mb-4 max-w-lg">
                Achieve your career goals with SkillSync
              </h2>
              <p className="text-gray-200 mb-6 max-w-md">
                Learn from 350+ top universities and companies worldwide.
              </p>

              <div className="flex max-w-md">
                <input
                  type="text"
                  placeholder="Search for courses, skills, or topics..."
                  className="w-full px-4 py-2 rounded-l-lg focus:outline-none"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </section>
{/* Testimonials */} <section className="bg-white rounded-xl shadow p-6 mb-8"> <h2 className="text-2xl font-bold mb-6 text-center"> What learners are achieving through SkillSync </h2> <div className="grid md:grid-cols-3 gap-6"> {[ { name: "Aishwarya", quote: "I found a full-time job after completing my SkillSync courses. The hands-on projects helped me gain real experience!", }, { name: "John K.", quote: "SkillSync has redefined my career path. Each course felt practical and motivating!", }, { name: "Meera S.", quote: "The personalized learning and quiz system made SkillSync unique. Highly recommend for learners!", }, ].map((t, i) => ( <div key={i} className="p-5 rounded-lg border hover:shadow-md transition" > <Quote className="h-6 w-6 text-blue-500 mb-3" /> <p className="italic text-gray-700 mb-3">“{t.quote}”</p> <p className="font-semibold text-gray-900">— {t.name}</p> </div> ))} </div> </section>

        {/* Featured Courses */}

    <section className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Featured Courses
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Java Programming Mastery",
            desc: "Master OOPs, collections, and build real-world Java apps.",
            rating: 4.7,
            image: JavaImage,
            route: "/courses/java",
          },
          {
            title: "Data Structures & Algorithms",
            desc: "Sharpen your DSA skills for interviews and problem-solving.",
            rating: 4.8,
            image: DsaImage,
            route: "/courses/dsa",
          },
          {
            title: "Excel for Data Analysis",
            desc: "Learn Excel formulas, charts, and pivot tables like a pro.",
            rating: 4.5,
            image: ExcelImage,
            route: "/courses/excel",
          },
        ].map((course, i) => (
          <div
            key={i}
            onClick={() => navigate("/courses", { state: { selectedCourse: course.title } })}
            className="cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-3">{course.desc}</p>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-yellow-500" />{" "}
                <span className="text-sm font-medium text-gray-800">
                  {course.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>


        {/* Pricing Plans */}
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Plans for you or your team
          </h2>
          <div className="flex justify-center mb-6 space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              For Individuals
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              For Teams
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "SkillSync Starter",
                price: "₹1,499 / month",
                desc: "Access all single-course enrollments with certificates.",
                features: [
                  "Access 100+ beginner courses",
                  "Certificates on completion",
                  "Community support",
                ],
              },
              {
                title: "SkillSync Pro (Most Popular)",
                price: "₹2,099 / month",
                desc: "Unlimited learning with all specialization tracks.",
                features: [
                  "Unlimited course access",
                  "Live workshops & projects",
                  "Priority mentor support",
                ],
                highlight: true,
              },
              {
                title: "SkillSync Premium Annual",
                price: "₹13,999 / year",
                desc: "Best for committed learners looking to grow steadily.",
                features: [
                  "Save 30% yearly",
                  "Early access to new content",
                  "Exclusive webinars & badges",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-6 rounded-lg border ${
                  plan.highlight ? "border-blue-500 shadow-lg" : "border-gray-200"
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-gray-600 mb-2">{plan.desc}</p>
                <p className="text-2xl font-semibold text-blue-600 mb-4">
                  {plan.price}
                </p>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Start Free Trial
                </button>
              </div>
            ))}
          </div>

          {/* Plan Confirmation Modal */}
          {selectedPlan && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
                <h3 className="text-xl font-bold mb-2 text-blue-600">
                  🎉 Trial Activated!
                </h3>
                <p className="text-gray-700 mb-4">
                  You selected{" "}
                  <span className="font-semibold text-blue-600">
                    {selectedPlan.title}
                  </span>{" "}
                  ({selectedPlan.price})
                </p>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-blue-50 rounded-xl shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Discover Your Learning Path Today
          </h2>
          <p className="text-gray-600 mb-6">
            Unsure where to start? Take our quiz to find your perfect learning
            track or explore our FAQ page.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/quiz">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Take the Quiz
              </button>
            </Link>
            <Link to="/faq">
              <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100">
                View FAQ
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
