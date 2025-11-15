import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-red-500 text-3xl">⚠️</span>
          <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
        </div>
        <p className="text-gray-600 text-sm mb-6">
          Did you forget to add the page to the router?
        </p>
        <Link href="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
