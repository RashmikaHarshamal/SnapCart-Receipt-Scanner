export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">SnapCart</span>
          </div>
          <div className="hidden sm:flex sm:items-center space-x-4">
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">
              Dashboard
            </a>
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">
              History
            </a>
            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">
              Analytics
            </a>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
