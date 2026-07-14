import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://ecommerce_backend.test/api/orders', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.status) {
                    setOrders(response.data.orders);
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError(err.response?.data?.message || 'Failed to load your orders. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6 max-w-4xl mt-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-left">
                    {error}
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg shadow max-w-md mx-auto mt-10">
                <h2 className="text-2xl font-bold text-gray-700">No Orders Found!</h2>
                <p className="text-gray-500 mt-2">You haven't placed any orders yet.</p>
                <button onClick={() => navigate('/')} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                    Shop Now
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-5xl mt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-left">My Orders</h1>
            
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white border rounded-lg shadow-sm overflow-hidden text-left">
                        {/* Order Header */}
                        <div className="bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center gap-2">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Order ID</p>
                                <p className="text-sm font-bold text-gray-800">#NGS-{order.id}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Date Placed</p>
                                <p className="text-sm text-gray-700">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Bill</p>
                                <p className="text-sm font-bold text-gray-900">Rs. {order.total}</p>
                            </div>
                            <div>
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Order Body */}
                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Items List */}
                            <div className="md:col-span-2 space-y-3">
                                <p className="text-sm font-semibold text-gray-600 border-b pb-1">Items Ordered</p>
                                {order.items && order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm items-center">
                                        <div className="text-gray-800">
                                            <span className="font-medium">{item.product?.name || 'Product'}</span>
                                            <span className="text-gray-500 text-xs ml-2">x {item.quantity}</span>
                                        </div>
                                        <span className="text-gray-600 font-medium">Rs. {item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Shipping Details */}
                            <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-2">
                                <p className="text-sm font-semibold text-gray-600 border-b pb-1">Delivery Details</p>
                                <p><span className="font-semibold text-gray-500">Phone:</span> {order.phone}</p>
                                <p><span className="font-semibold text-gray-500">Address:</span> {order.shipping_address}</p>
                                <p><span className="font-semibold text-gray-500">Payment:</span> {order.payment_method}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;