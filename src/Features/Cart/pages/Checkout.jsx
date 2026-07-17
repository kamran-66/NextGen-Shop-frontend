import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Format string to remove underscores or hyphens for clean UI
    const formatProductName = (name) => {
        if (!name) return '';
        return name.replace(/[_-]/g, ' ');
    };

    const calculateTotal = () => {
        return cartItems ? cartItems.reduce((total, item) => {
            const price = item.product?.price || item.price || 0;
            return total + (price * item.quantity);
        }, 0) : 0;
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://ecommerce_backend.test/api/checkout', {
                shipping_address: address,
                phone: phone,
                payment_method: paymentMethod
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.status) {
                alert('Congratulations! Your order has been placed successfully.');
                clearCart();

                navigate('/order-success', {
                    state: {
                        orderId: response.data.order?.id || response.data.order_id,
                        total: calculateTotal()
                    }
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong while placing your order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="bg-zinc-950 min-h-screen flex items-center justify-center p-4">
                <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl max-w-md w-full bg-zinc-900/30 shadow-xl">
                    <h2 className="text-2xl font-extrabold text-zinc-200 tracking-wide">Your cart is currently empty!</h2>
                    <p className="text-zinc-500 text-sm mt-2 max-w-[280px] mx-auto leading-relaxed">Please add some products to your cart before checking out.</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="mt-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition duration-200 shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-95"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-950 min-h-screen text-zinc-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto mt-2 text-left">
                {/* Heading */}
                <h1 className="text-2xl font-extrabold mb-8 tracking-wide bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    Checkout
                </h1>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                        ⚠️ {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Column: Shipping Form */}
                    <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800/80 p-6 md:p-8 rounded-2xl shadow-xl">
                        <h2 className="text-lg font-bold text-zinc-200 mb-6 border-b border-zinc-800/60 pb-3 tracking-wide">
                            Shipping Information
                        </h2>
                        
                        <form onSubmit={handlePlaceOrder} className="space-y-5">
                            <div>
                                <label className="block text-xs uppercase font-extrabold tracking-wider text-zinc-400 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., 03001234567"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/20 transition duration-150 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-extrabold tracking-wider text-zinc-400 mb-2">
                                    Complete Shipping Address
                                </label>
                                <textarea
                                    rows="3"
                                    required
                                    placeholder="Enter your full street, house number, city, etc..."
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/20 transition duration-150 text-sm resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-extrabold tracking-wider text-zinc-400 mb-2">
                                    Payment Method
                                </label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/20 transition duration-150 text-sm cursor-pointer"
                                >
                                    <option value="COD" className="bg-zinc-900">Cash on Delivery (COD)</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition duration-200 shadow-lg active:scale-[0.99] mt-2 ${
                                    loading 
                                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50 shadow-none' 
                                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/10 hover:shadow-emerald-500/20'
                                }`}
                            >
                                {loading ? 'Processing Order...' : 'Place Order'}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="bg-zinc-900 border border-zinc-800/80 p-5 md:p-6 rounded-2xl shadow-xl h-fit sticky top-24">
                        <h2 className="text-lg font-bold text-zinc-200 mb-4 border-b border-zinc-800/60 pb-3 tracking-wide">
                            Order Summary
                        </h2>
                        
                        <div className="divide-y divide-zinc-800/40 max-h-60 overflow-y-auto mb-5 pr-1 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                                    <div>
                                        <p className="text-zinc-200 font-bold tracking-wide">
                                            {formatProductName(item.product?.name || item.name)}
                                        </p>
                                        <p className="text-zinc-500 text-xs font-semibold mt-0.5">Quantity: {item.quantity}</p>
                                    </div>
                                    <span className="font-bold text-zinc-300 text-sm tracking-tight">
                                        Rs {parseFloat((item.product?.price || item.price || 0) * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-zinc-800/80 pt-4 flex justify-between items-center font-black text-base text-zinc-200 tracking-wide">
                            <span className="text-xs uppercase tracking-wider font-extrabold text-zinc-400">Total Bill:</span>
                            <span className="text-xl text-emerald-400 font-black tracking-tight">
                                Rs {calculateTotal().toLocaleString()}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;