import { Link } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const features = [
    {
      icon: "🎯",
      title: "Personalized Paths",
      description: "Get course recommendations tailored to your unique interests, skills, and career goals"
    },
    {
      icon: "📈",
      title: "Track Your Progress",
      description: "Visualize your learning journey with detailed analytics and progress charts"
    },
    {
      icon: "🏆",
      title: "Boost Your Skills",
      description: "Advance your career with expert-curated courses across multiple disciplines"
    }
  ];

  const steps = [
    { number: "1", title: "Take the Quiz", description: "Answer a few questions about your interests and goals" },
    { number: "2", title: "Get Your Path", description: "Receive personalized course recommendations" },
    { number: "3", title: "Start Learning", description: "Begin your journey to mastering new skills" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white font-bold">✨</div>
              <span className="text-xl font-bold font-sans">SkillSync</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-500 hover:text-gray-900">How it Works</a>
              <Link to="/about"><span className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer">About</span></Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/login"><button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">Log In</button></Link>
              <Link to="/signup"><button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Get Started</button></Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-500 text-sm font-medium mb-6">
                🚀 Discover Your Path
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight font-sans">
                Discover Your Ideal Learning Path
              </h1>
              <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                SkillSync uses intelligent personalization to match you with courses that align with your interests, skill level, and career aspirations. Start your journey today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/quiz"><button className="flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">🧠 Start Quiz</button></Link>
                <Link to="/courses"><button className="flex items-center gap-2 px-8 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50">📖 Explore Courses</button></Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-6">
              {["🧠","🎯","📈","🏆"].map((icon, i) => (
                <div key={i} className="p-8 bg-white rounded-2xl shadow hover:shadow-lg text-center text-4xl">{icon}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-sans">Why Choose SkillSync?</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Experience a personalized learning journey designed around you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition-all text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 font-sans">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-sans">How It Works</h2>
            <p className="text-xl text-gray-500">Three simple steps to unlock your personalized learning path</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white text-2xl font-bold mb-6 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3 font-sans">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-sans">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Take our interactive quiz and get personalized course recommendations in minutes</p>
          <Link to="/quiz"><button className="flex items-center gap-2 px-8 py-3 bg-white text-blue-500 rounded-full font-medium hover:bg-gray-100 mx-auto">🧠 Start Your Quiz Now</button></Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4"><div className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-500 text-white">✨</div><span className="text-lg font-bold font-sans">SkillSync</span></div>
              <p className="text-sm text-gray-500">Personalized learning paths for everyone</p>
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
