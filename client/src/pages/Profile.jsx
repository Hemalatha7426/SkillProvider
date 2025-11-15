import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit3, LogOut, Camera, Award, Activity } from "lucide-react";

export default function Profile({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  // Retrieve signup data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("userData"));

  const [user, setUser] = useState(
    storedUser || {
      name: "Guest User",
      phone: "0000000000",
      role: "student",
      email: "guest@example.com",
      createdAt: new Date().toISOString(),
      avatar: null,
    }
  );

  const [editUser, setEditUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated && !storedUser) {
      navigate("/login");
    }
  }, [isAuthenticated, storedUser, navigate]);

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
    navigate("/login");
  };

  // Handle avatar upload
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated profile
  const handleSave = () => {
    const updatedUser = { ...editUser, avatar: avatarPreview };
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  // Cancel editing
  const handleCancel = () => {
    setEditUser(user);
    setAvatarPreview(user.avatar);
    setIsEditing(false);
  };

  // Sample enrollments
  const enrollments = [
    {
      id: 1,
      completed: true,
      progress: 100,
      course: { id: 101, title: "React Basics", description: "Learn React from scratch." },
    },
    {
      id: 2,
      completed: false,
      progress: 45,
      course: { id: 102, title: "JavaScript Advanced", description: "Deep dive into JS." },
    },
  ];
  const completedCourses = enrollments.filter((e) => e.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white font-bold">
              ✨
            </div>
            <span className="text-xl font-bold font-sans">SkillSync</span>
          </Link>

          <nav className="hidden md:flex gap-6 text-gray-600">
            <Link to="/dashboard" className="hover:text-black">
              Dashboard
            </Link>
            <Link to="/courses" className="hover:text-black">
              Courses
            </Link>
            <span className="text-blue-600 font-semibold">Profile</span>
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </header>

      {/* Profile Section */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 relative">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="h-28 w-28 rounded-full object-cover border-4 border-blue-100"
                />
              ) : (
                <div className="h-28 w-28 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 border-4 border-blue-50">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
              )}
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer text-white hover:bg-blue-600">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatar}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    name="name"
                    value={editUser.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="border rounded px-3 py-2 w-full"
                  />
                  <input
                    name="email"
                    value={editUser.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border rounded px-3 py-2 w-full"
                  />
                  <input
                    name="phone"
                    value={editUser.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="border rounded px-3 py-2 w-full"
                  />
                  <select
                    name="role"
                    value={editUser.role}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 w-full"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold font-sans">{user.name}</h1>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="text-gray-500 mb-2">📞 {user.phone}</p>
                  <p className="text-gray-600 capitalize">
                    🎓 Role: {user.role}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Joined on {new Date(user.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </>
              )}
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-6 right-6 text-gray-600 hover:text-blue-600 transition"
              >
                <Edit3 size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Achievements + Activity */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Award className="text-yellow-500" /> Achievements
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Completed “React Basics” with 100% score</li>
              <li>Top learner in JavaScript course</li>
              <li>30-day consistent learning streak</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Activity className="text-green-500" /> Recent Activity
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>📚 Completed a quiz in "React Basics"</p>
              <p>🚀 Advanced 10% in "JavaScript Advanced"</p>
              <p>⭐ Rated "React Basics" 5 stars</p>
            </div>
          </div>
        </div>

        {/* Learning History */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Learning History
          </h2>
          {enrollments.length > 0 ? (
            enrollments.map((e) => (
              <div
                key={e.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border bg-white shadow mb-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{e.course.title}</h3>
                    {e.completed && (
                      <span className="text-green-600 text-xs font-semibold">
                        ✅ Completed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {e.course.description}
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${e.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">
                    {e.progress}% Progress
                  </span>
                </div>
                <Link to={`/courses/${e.course.id}`}>
                  <button className="px-4 py-2 border rounded hover:bg-gray-100 transition">
                    View Course
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg mb-2">No courses yet</p>
              <p className="text-sm mb-4">
                Start your learning journey today
              </p>
              <Link to="/courses">
                <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  Browse Courses
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
