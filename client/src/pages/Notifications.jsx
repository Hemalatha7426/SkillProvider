import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


// Mock hooks for authentication and toast
function useAuth() {
  // Replace with real auth check
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  return { isAuthenticated, isLoading };
}

function useToast() {
  return {
    toast: ({ title, description, variant }) => alert(`${title}\n${description}`),
  };
}

// Mock API functions
async function apiRequest(method, url, data) {
  console.log(method, url, data);
  return Promise.resolve();
}

export default function Notifications() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    { id: 1, type: "achievement", title: "New Achievement", message: "You completed a course!", read: false, createdAt: new Date() },
    { id: 2, type: "course", title: "Course Update", message: "New module added", read: true, createdAt: new Date() },
  ]);

  const iconMap = {
    achievement: "🏆",
    course: "📖",
    progress: "📈",
    general: "🔔",
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    apiRequest("PATCH", `/api/notifications/${id}/read`, {});
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    apiRequest("DELETE", `/api/notifications/${id}`, {});
    toast({ title: "Notification Deleted", description: "Notification removed" });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white font-bold">✨</div>
              <span className="text-xl font-bold font-sans">SkillSync</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard"><span className="text-gray-600 hover:text-black cursor-pointer">Dashboard</span></Link>
            <Link to="/courses"><span className="text-gray-600 hover:text-black cursor-pointer">Courses</span></Link>
            <Link to="/notifications"><span className="text-blue-600 cursor-pointer">Notifications</span></Link>
          </nav>
          <a href="/api/logout">
            <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition">Log Out</button>
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 font-sans">Notifications</h1>
            <p className="text-gray-500">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
                : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-base">{unreadCount} New</span>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`bg-white p-6 rounded-xl shadow hover:shadow-md transition flex gap-4 ${
                  !n.read ? "border-l-4 border-blue-500 bg-blue-50" : ""
                }`}
              >
                <div className="text-2xl">{iconMap[n.type] || "🔔"}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold font-sans">{n.title}</h3>
                    {!n.read && <span className="h-2 w-2 bg-blue-500 rounded-full mt-2"></span>}
                  </div>
                  <p className="text-gray-500 mb-3">{n.message}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>
                      {new Date(n.createdAt).toLocaleDateString()} at{" "}
                      {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <div className="flex gap-2">
                      {!n.read && (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="px-2 py-1 border rounded hover:bg-green-100 transition text-green-600"
                        >
                          ✅ Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(n.id)}
                        className="px-2 py-1 border rounded hover:bg-red-100 transition text-red-600"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-12 rounded-xl shadow text-center">
              <div className="text-6xl mb-4 text-gray-300">🔔</div>
              <h3 className="text-lg font-semibold mb-2">No Notifications Yet</h3>
              <p className="text-gray-500 mb-6">
                You'll see notifications here when you enroll in courses, complete milestones, or earn achievements
              </p>
              <Link href="/dashboard">
                <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  Go to Dashboard
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
