import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Features/Auth/context/AuthContext'; 
import { CartContext } from '../Features/Cart/context/CartContext'; 

function Navbar() {
  const { user, logout, token } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 text-white px-6 py-4 flex justify-between items-center shadow-xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      {/* Left: Brand Logo / Name */}
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition duration-300">
          Next-Gen Shop
        </Link>
      </div>

      {/* Right: Actions & User Profile */}
      <div className="flex items-center gap-6">
        {/* Navigation Links */}
        <Link to="/" className="text-zinc-400 hover:text-zinc-100 font-semibold text-sm tracking-wide transition duration-200">
          Products
        </Link>

        {/* 🛒 Cart Icon with Dynamic Count */}
        <Link to="/cart" className="relative p-2 text-zinc-400 hover:text-zinc-100 transition duration-200">
          <span className="text-xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-blue-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-blue-500/30 animate-pulse">
              {cartCount}
            </span>
          )}
        </Link>

        {/* 👤 Authentication / Profile Section */}
        {token && user ? (
          <div className="flex items-center gap-4 bg-zinc-800/80 px-4 py-2 rounded-xl border border-zinc-700/50 shadow-inner">
            {/* User Profile Avatar (Initial Character) */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-md uppercase select-none">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>

            {/* Navigation Buttons inside profile container */}
            <div className="flex items-center gap-2">
              <Link 
                to="/my-orders" 
                className="text-zinc-200 bg-zinc-700 hover:bg-zinc-600 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium border border-zinc-600 transition duration-200"
              >
                My Orders
              </Link>
              
              {/* Check if User is Admin (All safe fallback checks) */}
              {(user?.is_admin === 1 || user?.is_admin === true || user?.role === 'admin') && (
                <div className="flex items-center gap-2">
                  {/* Admin Panel Button */}
                  <Link 
                    to="/admin/orders" 
                    className="text-amber-100 bg-amber-600/20 hover:bg-amber-600 text-amber-400 hover:text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition duration-200 border border-amber-500/30 whitespace-nowrap"
                  >
                    ⚙️ Admin
                  </Link>

                  {/* Dashboard Button */}
                  <Link 
                    to="/admin/dashboard" 
                    className="text-blue-100 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition duration-200 border border-blue-500/30 whitespace-nowrap"
                  >
                    📊 Dashboard
                  </Link>
                </div>
              )}
            </div>
        
            {/* User Details - (FIXED: Missing closing tag added below) */}
            <div className="flex flex-col text-left hidden lg:flex border-l border-zinc-700/60 pl-3">
              <span className="text-xs font-bold text-zinc-300 tracking-wide">{user.name}</span>
              <span className="text-[11px] text-zinc-500 truncate max-w-[110px]">{user.email}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              className="text-xs bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg font-semibold border border-red-500/20 transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-zinc-400 hover:text-zinc-100 transition duration-200">
              Login
            </Link>
            <Link to="/register" className="text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition duration-200">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;