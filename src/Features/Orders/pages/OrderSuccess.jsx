import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Retrieve order details passed from Checkout page
    const orderId = location.state?.orderId || 'N/A';
    const totalAmount = location.state?.total || 0;

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
            <div className="bg-zinc-900 border border-zinc-800/80 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center hover:border-zinc-700/40 transition duration-300">
                
                {/* Emerald Success Checkmark Icon with Glow */}
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/5">
                    <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl font-black mb-2 tracking-wide bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    Thank You!
                </h1>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                    Your order has been placed successfully and is now being processed.
                </p>

                {/* Order Details Card */}
                <div className="bg-zinc-950/50 rounded-xl p-4 mb-6 border border-zinc-800/60 text-left space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-xs uppercase font-extrabold tracking-wider">Order ID</span>
                        <span className="font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/10 px-3 py-1 rounded-lg text-xs tracking-tight">
                            #NGS-{orderId}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-zinc-800/40 pt-3">
                        <span className="text-zinc-500 text-xs uppercase font-extrabold tracking-wider">Total Bill</span>
                        <span className="font-black text-emerald-400 text-sm tracking-tight">
                            Rs {parseFloat(totalAmount).toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="space-y-3">
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-[0.98]"
                    >
                        Continue Shopping
                    </button>
                    
                    <button 
                        onClick={() => navigate('/my-orders')}
                        className="w-full bg-zinc-950 hover:bg-zinc-800/60 text-zinc-300 border border-zinc-800 hover:border-zinc-700 text-xs font-bold py-3.5 px-4 rounded-xl transition duration-200 active:scale-[0.98]"
                    >
                        View My Orders
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccess;