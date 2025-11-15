// ———————————————— IMPORTS ————————————————
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Sparkles,
  CheckCircle,
  ArrowLeft,
  FileDown,
  Lock
} from "lucide-react";
import coursesData from "../data/courseData.json";
import generateCertificate from "../utils/generateCertificate";

// ———————————————— COMPONENT ————————————————
export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  // STATES
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [syllabusViewed, setSyllabusViewed] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [notesDownloaded, setNotesDownloaded] = useState(false);

  const [progress, setProgress] = useState(0);
  const [tab, setTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [completionShown, setCompletionShown] = useState(false);

  // USER NAME FOR CERTIFICATE
  const studentName = "Student Name"; // make dynamic later

  // Load course details
  useEffect(() => {
    const found = coursesData.find((c) => c.id === id);
    setCourse(found);
  }, [id]);

  // ——————————— Progress Auto Calculation ————————————
  useEffect(() => {
    let p = 0;
    if (isEnrolled) p = 10;
    if (syllabusViewed) p = 40;
    if (videoWatched) p = 70;
    if (quizCompleted) p = 90;
    if (notesDownloaded) p = 100;

    setProgress(p);

    if (p === 100 && !completionShown) {
      setCompletionShown(true);
      setTimeout(() => {
        alert("🎉 Congratulations! You completed the course!");
      }, 500);
    }
  }, [isEnrolled, syllabusViewed, videoWatched, quizCompleted, notesDownloaded]);

  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <Link to="/courses">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Browse Courses
            </button>
          </Link>
        </div>
      </div>
    );

  // ———————————————— HANDLERS ————————————————
  const handleEnroll = () => {
    setIsEnrolled(true);
    alert(`🎉 You’ve successfully enrolled in ${course.title}!`);
  };

  const handleViewSyllabus = () => setSyllabusViewed(true);

  const handleWatchVideo = () => setVideoWatched(true);

  const handleQuizSubmit = () => {
    let correct = 0;
    course.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) correct++;
    });

    const score = (correct / course.quiz.length) * 100;

    if (score >= 50) {
      alert(`✅ Quiz Completed! You scored ${score}%.`);
      setQuizCompleted(true);
    } else {
      alert(`❌ You scored ${score}%. Try again!`);
    }
  };

  const handleDownloadNotes = () => {
    if (course?.notesUrl) {
      window.open(course.notesUrl, "_blank");
      setNotesDownloaded(true);
    }
  };

  const handleGenerateCertificate = () => {
    generateCertificate(studentName, course.title);
  };

  const LockedTab = ({ message }) => (
    <div className="bg-gray-100 p-10 text-center rounded-xl border">
      <Lock className="mx-auto h-10 w-10 text-gray-400 mb-3" />
      <p className="text-gray-600">{message}</p>
    </div>
  );

  // ———————————————— RENDER ————————————————
  return (
    <div className="min-h-screen bg-gray-50 pb-12">

      {/* HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
          <Link to="/">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-blue-500 flex items-center justify-center rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">SkillSync</span>
            </div>
          </Link>

          <Link to="/courses">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </Link>
        </div>
      </header>

      {/* ——————— HERO ——————— */}
      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b py-12">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
            <p className="text-gray-600 mb-5">{course.description}</p>
               <p className="text-gray-600 mb-5">⭐{course.rating}</p>
                  <p className="text-gray-600 mb-5">👨‍🎓{course.instructor}</p>
              <p className="text-gray-600 mb-5">⏱️{course.duration}</p>     
          </div>

          {/* PROGRESS CARD */}
          <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Progress</h3>
              <span className="text-sm text-gray-600">{progress}%</span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {!isEnrolled ? (
              <button
                onClick={handleEnroll}
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
              >
                Enroll Now
              </button>
            ) : (
              <div className="text-green-600 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" /> Enrolled
              </div>
            )}

            {/* CERTIFICATE BUTTON — only when progress 100 */}
            {progress === 100 && (
              <button
                onClick={handleGenerateCertificate}
                className="w-full mt-4 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700"
              >
                🎓 Download Certificate
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ——————— TABS ——————— */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex border-b mb-6 overflow-x-auto">
          {["overview", "syllabus", "video", "quiz", "notes"].map((t) => (
            <button
              key={t}
              disabled={!isEnrolled && t !== "overview"}
              onClick={() => setTab(t)}
              className={`px-5 py-2 font-medium capitalize ${
                tab === t
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              } ${
                !isEnrolled && t !== "overview"
                  ? "opacity-40 cursor-not-allowed"
                  : ""
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ================= TABS CONTENT ================= */}

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="bg-white p-8 rounded-xl shadow space-y-4">
            <p className="text-gray-600 whitespace-pre-line">
              {course.overview}
            </p>
          </div>
        )}

        {/* SYLLABUS */}
        {tab === "syllabus" &&
          (isEnrolled ? (
            <div className="bg-white p-8 rounded-xl shadow">
              <ul className="space-y-6">
                {course.syllabus.map((module, i) => (
                  <li key={i}>
                    <h4 className="text-blue-600 font-semibold mb-2">
                      {module.module}
                    </h4>
                    <ul className="list-disc ml-6 text-gray-700">
                      {module.topics.map((topic, j) => (
                        <li key={j}>{topic}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              {!syllabusViewed && (
                <button
                  onClick={handleViewSyllabus}
                  className="mt-5 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ) : (
            <LockedTab message="Please enroll to access the syllabus." />
          ))}

        {/* VIDEO */}
        {tab === "video" &&
          (syllabusViewed ? (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              {course.videoUrl.includes("youtu") ? (
                <>
                  <div className="relative pb-[56.25%] h-0 mb-4 overflow-hidden rounded-xl">
                    <iframe
                      src={`https://www.youtube.com/embed/${
                        course.videoUrl.split("youtu.be/")[1]?.split("?")[0] ||
                        course.videoUrl.split("v=")[1]?.split("&")[0]
                      }`}
                      title={course.title}
                      className="absolute top-0 left-0 w-full h-full rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {!videoWatched && (
                    <button
                      onClick={handleWatchVideo}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Mark as Watched
                    </button>
                  )}
                </>
              ) : (
                <video
                  src={course.videoUrl}
                  controls
                  className="w-full rounded-xl mb-4"
                />
              )}
            </div>
          ) : (
            <LockedTab message="Complete the syllabus before watching the video." />
          ))}

        {/* QUIZ */}
        {tab === "quiz" &&
          (videoWatched ? (
            <div className="bg-white p-8 rounded-xl shadow">
              {course.quiz.map((q, i) => (
                <div key={i} className="mb-4">
                  <p className="font-medium">
                    {i + 1}. {q.question}
                  </p>
                  {q.options.map((opt, j) => (
                    <label key={j} className="block">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={opt}
                        checked={quizAnswers[i] === opt}
                        onChange={() =>
                          setQuizAnswers({ ...quizAnswers, [i]: opt })
                        }
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ))}

              <button
                onClick={handleQuizSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit Quiz
              </button>
            </div>
          ) : (
            <LockedTab message="Watch the video before taking the quiz." />
          ))}

        {/* NOTES */}
        {tab === "notes" &&
          (quizCompleted ? (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <FileDown className="mx-auto h-10 w-10 text-blue-500 mb-3" />
              <h3 className="font-semibold text-lg mb-2">
                Download Course Notes
              </h3>
              <p className="text-gray-600 mb-4">
                Get a summary of all key topics covered in this course.
              </p>

              <button
                onClick={handleDownloadNotes}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Download Notes
              </button>

              {notesDownloaded && (
                <p className="text-green-600 mt-3">
                  ✅ Notes downloaded successfully!
                </p>
              )}
            </div>
          ) : (
            <LockedTab message="Complete the quiz before accessing notes." />
          ))}
      </div>
    </div>
  );
}
