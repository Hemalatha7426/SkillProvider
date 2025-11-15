import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import JavaImage from '../assets/java.png';
import DsaImage from '../assets/dsa.png';
import ExcelImage from '../assets/excel.png';
import JavaScriptImage from '../assets/javascript.png';
import UIUXImage from '../assets/UI UX.png';
import ReactImage from '../assets/React.png';



import {
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Star,
  Users,
  Clock,
  X,
  Globe,
} from "lucide-react";

// ✅ Mock Courses Data (with images & language)
const mockCourses = [
  {
    id: "1",
    title: "Mastering JavaScript",
    description: "Learn JavaScript from scratch and build real-world projects.",
    category: "Web Development",
    level: "Beginner",
    language: "English",
    duration: "8 hours",
    enrolledCount: 120,
    rating: 4.5,
    image: JavaScriptImage,
  },
  {
    id: "2",
    title: "React for Beginners",
    description: "Learn React and build dynamic user interfaces with components.",
    category: "Web Development",
    level: "Intermediate",
    language: "English",
    duration: "12 hours",
    enrolledCount: 90,
    rating: 4.7,
    image: ReactImage,
  },

  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles to create intuitive interfaces.",
    category: "UI/UX Design",
    level: "Beginner",
    language: "Tamil",
    duration: "6 hours",
    enrolledCount: 60,
    rating: 4.2,
    image: UIUXImage,
  },
  {
  id: "4",
  title: "Java Programming Mastery",
  description: "Learn the fundamentals of Java programming, OOP concepts, and real-world applications.",
  category: "Programming",
  level: "Intermediate",
  language: "English",
  duration: "8 hours",
  enrolledCount: 85,
  rating: 4.6,
  image: JavaImage,
},
{
  id: "5",
  title: "Data Structures and Algorithms (DSA) Mastery",
  description: "Master the core concepts of Data Structures and Algorithms with practical coding challenges and problem-solving techniques.",
  category: "Programming",
  level: "Intermediate",
  language: "English",
  duration: "10 hours",
  enrolledCount: 120,
  rating: 4.7,
  image: DsaImage,
},
{
  id: "6",
  title: "Excel Mastery for Data Analysis",
  description: "Learn Excel from basics to advanced — formulas, charts, pivot tables, and automation for data-driven decision-making.",
  category: "Data Analysis",
  level: "Beginner",
  language: "English",
  duration: "5 hours",
  enrolledCount: 150,
  rating: 4.5,
  image: ExcelImage,
}


];

// ✅ Filters
const categories = [
  "Web Development",
  "Data Science",
  "AI & Machine Learning",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
  "UI/UX Design",
  "Blockchain",
];

const levels = ["Beginner", "Intermediate", "Advanced"];
const languages = ["English", "Hindi", "Tamil"];

export default function Courses() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevel("");
    setSelectedLanguage("");
    setSearch("");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedLevel || selectedLanguage || search;

  // ✅ Filter courses
  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    const matchesLanguage =
      !selectedLanguage || course.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesLevel && matchesLanguage;
  });

  // ✅ Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popular")
      return (b.enrolledCount || 0) - (a.enrolledCount || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <Link to="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-sans">SkillSync</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-gray-500 hover:text-gray-900">
              Dashboard
            </Link>
            <Link to="/courses" className="text-blue-500 font-medium">
              Courses
            </Link>
            <Link to="/about" className="text-gray-500 hover:text-gray-900">
              About
            </Link>
          </nav>
          <Link to="/dashboard">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              My Dashboard
            </button>
          </Link>
        </div>
      </header>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-2 font-sans">Explore Courses</h1>
        <p className="text-xl text-gray-500 mb-8">
          Discover courses across multiple disciplines and skill levels
        </p>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-48 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 relative"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" /> Filters
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                  {(selectedCategories.length || 0) +
                    (selectedLevel ? 1 : 0) +
                    (selectedLanguage ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-500 text-sm">Active filters:</span>
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm"
                >
                  {cat}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleCategory(cat)}
                  />
                </span>
              ))}
              {selectedLevel && (
                <span className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm">
                  {selectedLevel}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedLevel("")}
                  />
                </span>
              )}
              {selectedLanguage && (
                <span className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm">
                  {selectedLanguage}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedLanguage("")}
                  />
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-blue-500 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-white p-6 rounded-xl shadow space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Category</h3>
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 text-sm mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4"
                      />
                      {category}
                    </label>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Level</h3>
                  {levels.map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-2 text-sm mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLevel === level}
                        onChange={() =>
                          setSelectedLevel(selectedLevel === level ? "" : level)
                        }
                        className="h-4 w-4"
                      />
                      {level}
                    </label>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Language</h3>
                  {languages.map((lang) => (
                    <label
                      key={lang}
                      className="flex items-center gap-2 text-sm mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLanguage === lang}
                        onChange={() =>
                          setSelectedLanguage(selectedLanguage === lang ? "" : lang)
                        }
                        className="h-4 w-4"
                      />
                      {lang}
                    </label>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}

          {/* Course Cards */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            {sortedCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link to={`/courses/${course.id}`}>
                      <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-all">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-40 w-full object-cover"
                        />
                        <div className="p-5 flex flex-col h-full">
                          <div className="flex justify-between mb-2 text-xs">
                            <span className="bg-gray-200 px-2 py-1 rounded-full">
                              {course.category}
                            </span>
                            <span className="border px-2 py-1 rounded-full">
                              {course.level}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-3">
                            {course.description}
                          </p>
                          <div className="space-y-2 mt-auto text-gray-500 text-sm">
                            <div className="flex justify-between">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" /> {course.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />{" "}
                                {course.enrolledCount || 0}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              {course.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-400" />{" "}
                                  {course.rating}/5
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Globe className="h-4 w-4" /> {course.language}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-xl shadow text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
