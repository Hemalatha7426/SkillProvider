import React from "react";
import { Link } from "react-router-dom";

import { Sparkles, Target, Heart, Zap, Users, Lightbulb } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Personalization",
      description: "Every learner is unique. We tailor recommendations to your individual goals and interests."
    },
    {
      icon: Heart,
      title: "Accessibility",
      description: "Quality education should be accessible to everyone, regardless of background or location."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We leverage cutting-edge technology to create engaging, effective learning experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold font-sans">SkillSync</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/courses">
                <span className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
                  Courses
                </span>
              </Link>
              <Link to="/about">
                <span className="text-sm font-medium text-blue-500 cursor-pointer">About</span>
              </Link>
              <Link to="/contact">
                <span className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
                  Contact
                </span>
              </Link>
            </nav>
            <Link to="/dashboard">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-500 text-sm font-medium mb-6">
            <Lightbulb className="h-4 w-4" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 font-sans">
            Empowering Learners Through Personalization
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            SkillSync helps learners discover personalized learning paths based on their interests, skill level, and career goals. We believe everyone deserves access to education that adapts to their unique journey.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 font-sans">What We Do</h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  SkillSync is an intelligent learning platform that matches learners with the perfect courses for their goals. Through our interactive quiz system, we understand your interests, current skill level, and learning objectives.
                </p>
                <p>
                  Our algorithm analyzes your responses to recommend courses across multiple disciplines, from web development and data science to design and business skills. We track your progress, celebrate your achievements, and keep you motivated throughout your learning journey.
                </p>
                <p>
                  Whether you're looking to switch careers, improve existing skills, or learn something new for personal growth, SkillSync provides the guidance and resources you need to succeed.
                </p>
              </div>
            </div>
            <div className="bg-white shadow rounded-xl p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 shrink-0">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">For Everyone</h3>
                  <p className="text-gray-600">
                    From complete beginners to advanced professionals, SkillSync adapts to your level
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 shrink-0">
                  <Target className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Goal-Oriented</h3>
                  <p className="text-gray-600">
                    Courses aligned with your specific career and personal development goals
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 shrink-0">
                  <Zap className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Progress Tracking</h3>
                  <p className="text-gray-600">
                    Visualize your growth with detailed analytics and motivational streaks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-sans">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white shadow rounded-xl p-8 text-center hover:shadow-lg transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-sans">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-xl p-12 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 mx-auto mb-6">
              <Sparkles className="h-12 w-12 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4 font-sans">Built with Passion</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
              SkillSync was created to solve a real problem: helping learners navigate the overwhelming world of online education. Our platform combines intelligent algorithms with a user-friendly interface to make learning accessible and effective for everyone.
            </p>
            <p className="text-gray-600 mb-8">
              We're constantly improving and adding new features based on user feedback. Have suggestions? We'd love to hear from you!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium">
                  Get in Touch
                </button>
              </Link>
              <Link to="/feedback">
                <button className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-md font-medium">
                  Share Feedback
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-sans">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners discovering their personalized learning paths
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/quiz">
              <button className="bg-white text-blue-500 px-8 py-3 rounded-full font-medium hover:bg-gray-100">
                Take the Quiz
              </button>
            </Link>
            <Link to="/courses">
              <button className="border border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-blue-500">
                Browse Courses
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold font-sans">SkillSync</span>
              </div>
              <p className="text-sm text-gray-500">
                Personalized learning paths for everyone
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm">Product</h3>
              <ul className="space-y-3">
                <li><Link to="/courses"><span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">Courses</span></Link></li>
                <li><Link to="/quiz"><span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">Quiz</span></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about"><span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">About</span></Link></li>
                <li><Link to="/contact"><span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">Contact</span></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm">Support</h3>
              <ul className="space-y-3">
                <li><Link to="/faq"><span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">FAQ</span></Link></li>
                <li><Link to="/feedback"><span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">Feedback</span></Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2024 SkillSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
