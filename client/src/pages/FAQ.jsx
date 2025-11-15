import { Link } from "react-router-dom";
import { Sparkles, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    category: "Account",
    questions: [
      { q: "How do I create an account?", a: "Click the 'Get Started' or 'Log In' button..." },
      { q: "Is my data secure?", a: "Yes! We take security seriously..." },
      { q: "Can I delete my account?", a: "Yes, you can delete your account at any time..." }
    ]
  },
  {
    category: "Courses",
    questions: [
      { q: "How do course recommendations work?", a: "Our intelligent quiz system analyzes..." },
      { q: "Can I enroll in multiple courses?", a: "Absolutely! There's no limit..." },
      { q: "What if I don't like a recommended course?", a: "You can browse all available courses..." },
      { q: "How is course difficulty determined?", a: "Courses are categorized into three levels..." }
    ]
  },
  {
    category: "Quiz",
    questions: [
      { q: "How long does the quiz take?", a: "The personalization quiz typically takes 3-5 minutes..." },
      { q: "Can I retake the quiz?", a: "Yes! You can retake the quiz anytime..." },
      { q: "Do I need to complete the quiz to use SkillSync?", a: "No, the quiz is optional but highly recommended..." }
    ]
  },
  {
    category: "Progress & Learning",
    questions: [
      { q: "How do I track my progress?", a: "Your Dashboard provides a comprehensive view..." },
      { q: "What are learning streaks?", a: "Learning streaks track consecutive days..." },
      { q: "Can I see my learning history?", a: "Yes! Your Profile page contains a complete history..." }
    ]
  },
  {
    category: "General",
    questions: [
      { q: "Is SkillSync free?", a: "Yes, SkillSync is completely free to use..." },
      { q: "What types of courses are available?", a: "We offer courses across multiple disciplines..." },
      { q: "How often are new courses added?", a: "We regularly update our course catalog..." }
    ]
  }
];

export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState({});

  const toggleAccordion = (categoryIndex, faqIndex) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [`${categoryIndex}-${faqIndex}`]: !prev[`${categoryIndex}-${faqIndex}`]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold font-sans">SkillSync</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/courses"><span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">Courses</span></Link>
              <Link to="/feedback"><span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">Feedback</span></Link>
              <Link to="/faq"><span className="text-sm text-blue-500 cursor-pointer font-medium">FAQ</span></Link>
            </nav>
            <Link to="/dashboard">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">Dashboard</button>
            </Link>
          </div>
        </div>
      </header>

      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-6">
              <HelpCircle className="h-8 w-8 text-blue-500" />
            </div>
            <h1 className="text-5xl font-bold mb-4 font-sans">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-500">Find answers to common questions about SkillSync</p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold mb-4 font-sans">{category.category}</h2>
                <div className="bg-white rounded-xl shadow overflow-hidden">
                  {category.questions.map((faq, faqIndex) => {
                    const isOpen = openIndexes[`${categoryIndex}-${faqIndex}`];
                    return (
                      <div key={faqIndex} className="border-b last:border-b-0">
                        <button
                          className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-50"
                          onClick={() => toggleAccordion(categoryIndex, faqIndex)}
                        >
                          <span>{faq.q}</span>
                          <span className="text-xl">{isOpen ? "-" : "+"}</span>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 text-gray-500">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow p-12">
              <h2 className="text-2xl font-bold mb-4 font-sans">Still have questions?</h2>
              <p className="text-gray-500 mb-6">
                Can't find the answer you're looking for? Get in touch with us.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Contact Support</button>
                </Link>
                <Link to="/feedback">
                  <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100">Share Feedback</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
