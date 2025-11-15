import { Link } from "react-router-dom";
import { useState } from "react";
import { Star, Sparkles, Send } from "lucide-react";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState("");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || category === "" || comments.length < 10) {
      alert("Please provide a rating, select a category, and write at least 10 characters.");
      return;
    }
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => {
      alert("Thank you for your feedback!");
      setRating(0);
      setHoveredRating(0);
      setCategory("");
      setComments("");
      setSubmitted(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
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
              <Link to="/courses"><span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">Courses</span></Link>
              <Link to="/feedback"><span className="text-sm text-blue-500 font-medium cursor-pointer">Feedback</span></Link>
              <Link to="/faq"><span className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">FAQ</span></Link>
            </nav>
            <Link to="/dashboard">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">Dashboard</button>
            </Link>
          </div>
        </div>
      </header>

      <div className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 font-sans">Share Your Feedback</h1>
            <p className="text-xl text-gray-500">Help us improve SkillSync with your valuable insights</p>
          </div>

          {/* Feedback Form */}
          <div className="bg-white shadow rounded-xl p-8">
            <h2 className="text-center text-2xl font-bold mb-6">How are we doing?</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div className="text-center">
                <label className="block mb-4 text-lg font-medium">Rating</label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`h-12 w-12 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 font-medium">Category</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  data-testid="select-category"
                >
                  <option value="">Select a category</option>
                  <option value="Course">Course Quality</option>
                  <option value="App">App Experience</option>
                  <option value="General">General Feedback</option>
                  <option value="Bug">Bug Report</option>
                  <option value="Feature">Feature Request</option>
                </select>
              </div>

              {/* Comments */}
              <div>
                <label className="block mb-2 font-medium">Comments</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Tell us what you think... (minimum 10 characters)"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  data-testid="textarea-comments"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                disabled={submitted}
                data-testid="button-submit"
              >
                <Send className="h-5 w-5" />
                {submitted ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Your feedback is important to us and helps shape the future of SkillSync.</p>
            <p className="mt-2">
              For urgent matters, please visit our{" "}
              <Link to="/contact">
                <span className="text-blue-500 hover:underline cursor-pointer">Contact</span>
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
