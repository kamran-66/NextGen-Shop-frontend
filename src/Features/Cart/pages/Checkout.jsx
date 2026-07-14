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
                
                // if (setCartItems) setCartItems([]);
                // localStorage.removeItem('cart');
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
            <div className="text-center py-12 bg-white rounded-lg shadow max-w-md mx-auto mt-10">
                <h2 className="text-2xl font-bold text-gray-700">Your cart is currently empty!</h2>
                <p className="text-gray-500 mt-2">Please add some products to your cart before checking out.</p>
                <button onClick={() => navigate('/')} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-6xl mt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-left">Checkout</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-left">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-left">Shipping Information</h2>
                    
                    <form onSubmit={handlePlaceOrder} className="space-y-4">
                        <div>
                            <label className="block text-gray-600 mb-1 text-left">Phone Number</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., 03001234567"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left text-black"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1 text-left">Complete Shipping Address</label>
                            <textarea
                                rows="3"
                                required
                                placeholder="Enter your full street, house number, city, etc..."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left text-black"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1 text-left">Payment Method</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left text-black"
                            >
                                <option value="COD">Cash on Delivery (COD)</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            {loading ? 'Processing Order...' : 'Place Order'}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2 text-left">Order Summary</h2>
                    
                    <div className="divide-y divide-gray-200 max-h-60 overflow-y-auto mb-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                                <div className="text-left">
                                    <p className="text-gray-800 font-medium">{item.product?.name || item.name}</p>
                                    <p className="text-gray-500 text-xs">Quantity: {item.quantity}</p>
                                </div>
                                <span className="font-medium text-gray-800">
                                    Rs. {(item.product?.price || item.price || 0) * item.quantity}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 flex justify-between items-center font-bold text-lg text-gray-900">
                        <span>Total Bill:</span>
                        <span>Rs. {calculateTotal()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;