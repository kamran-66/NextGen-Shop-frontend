import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Retrieve order details passed from Checkout page
    const orderId = location.state?.orderId || 'N/A';
    const totalAmount = location.state?.total || 0;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                
                {/* Green Success Checkmark Icon */}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
                <p className="text-gray-600 mb-6">Your order has been placed successfully and is now being processed.</p>

                {/* Order Details Card */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 text-left space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Order ID:</span>
                        <span className="font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md text-sm">
                            #{orderId}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-3">
                        <span className="text-gray-500 text-sm">Total Amount paid:</span>
                        <span className="font-bold text-gray-800">Rs. {totalAmount}</span>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="space-y-3">
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200"
                    >
                        Continue Shopping
                    </button>
                    
                    <button 
                        onClick={() => navigate('/my-orders')}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition duration-200"
                    >
                        View My Orders
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccess;