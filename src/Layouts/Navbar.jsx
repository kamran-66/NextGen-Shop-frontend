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
    <nav className="bg-zinc-800 border-b border-zinc-700 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      {/* Left: Brand Logo / Name */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-2xl font-black tracking-wider text-blue-500 hover:text-blue-400 transition">
          Next-Gen Shop
        </Link>
      </div>

      {/* Right: Actions & User Profile */}
      <div className="flex items-center gap-6">
        {/* Navigation Links */}
        <Link to="/" className="text-zinc-300 hover:text-white font-medium transition">
          Products
        </Link>

        {/* 🛒 Cart Icon with Dynamic Count */}
        <Link to="/cart" className="relative p-2 text-zinc-300 hover:text-white transition">
          <span className="text-xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {cartCount}
            </span>
          )}
        </Link>

        {/* 👤 Authentication / Profile Section */}
        {token && user ? (
          <div className="flex items-center gap-4 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-700">
            {/* User Profile Avatar (Initial Character) */}
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm text-white shadow-md uppercase">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>

            
        <Link 
            to="/my-orders" 
            className="text-white bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded-md text-sm font-medium transition"
        >
            My Orders
        </Link>
            
             {(user.is_admin === 1 || user.is_admin === true || user.role === 'admin') && (
            <Link 
                to="/admin/orders" 
                className="text-white bg-amber-600 hover:bg-amber-700 px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition shadow-sm border border-amber-500"
            >
                ⚙️ Admin Panel
            </Link>
        )}
        
            {/* User Details */}
            <div className="flex flex-col text-left hidden sm:flex">
              <span className="text-sm font-semibold text-zinc-200">{user.name}</span>
              <span className="text-xs text-zinc-400 truncate max-w-[120px]">{user.email}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              className="ml-2 text-xs bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-full font-medium transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition">
              Login
            </Link>
            <Link to="/register" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;