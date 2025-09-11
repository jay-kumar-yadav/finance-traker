import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599-1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden sm:inline">Finance Tracker</span>
            <span className="sm:hidden">FT</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">Hello, {user.name}</span>
                <Link to="/" className="hover:underline px-3 py-2 rounded hover:bg-blue-700 transition">Home</Link>
                <Link to="/add" className="hover:underline px-3 py-2 rounded hover:bg-blue-700 transition">Add Transaction</Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-blue-800 rounded-lg hover:bg-blue-900 transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline px-3 py-2 rounded hover:bg-blue-700 transition">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-blue-700 transition"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3 pt-4 border-t border-blue-500">
              {user ? (
                <>
                  <div className="px-4 py-2 text-blue-100">
                    Hello, {user.name}
                  </div>
                  <Link 
                    to="/" 
                    className="px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => setShowMenu(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/add" 
                    className="px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => setShowMenu(false)}
                  >
                    Add Transaction
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-800 rounded-lg hover:bg-blue-900 transition text-left font-medium mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => setShowMenu(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium mt-2"
                    onClick={() => setShowMenu(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;