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

    // Format string to remove underscores or hyphens for clean UI
    const formatProductName = (name) => {
        if (!name) return '';
        return name.replace(/[_-]/g, ' ');
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'processing':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'shipped':
                return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            default:
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-400">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium tracking-wide">Fetching your orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-zinc-950 min-h-screen p-6 flex items-center justify-center">
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-xl text-sm font-medium max-w-xl w-full text-left">
                    ⚠️ {error}
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="bg-zinc-950 min-h-screen flex items-center justify-center p-4">
                <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl max-w-md w-full bg-zinc-900/30 shadow-xl">
                    <h2 className="text-2xl font-extrabold text-zinc-200 tracking-wide">No Orders Found!</h2>
                    <p className="text-zinc-500 text-sm mt-2 max-w-[280px] mx-auto leading-relaxed">You haven't placed any orders on Next-Gen Shop yet.</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="mt-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition duration-200 shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-95"
                    >
                        Shop Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-950 min-h-screen text-zinc-100 p-4 md:p-8">
            <div className="max-w-5xl mx-auto mt-2">
                {/* Section Title */}
                <h1 className="text-2xl font-extrabold mb-8 text-left tracking-wide bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    My Orders
                </h1>
                
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-zinc-900 border border-zinc-800/80 rounded-2xl shadow-xl overflow-hidden text-left hover:border-zinc-700/40 transition duration-200">
                            
                            {/* Order Header */}
                            <div className="bg-zinc-950/60 p-4 border-b border-zinc-800/70 flex flex-wrap justify-between items-center gap-4">
                                <div className="flex gap-6 flex-wrap">
                                    <div>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5">Order ID</p>
                                        <p className="text-sm font-black text-zinc-200 tracking-tight">#NGS-{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5">Date Placed</p>
                                        <p className="text-sm font-semibold text-zinc-300">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5">Total Bill</p>
                                        <p className="text-sm font-black text-emerald-400 tracking-tight">Rs {parseFloat(order.total).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-lg border uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Items List */}
                                <div className="md:col-span-2 space-y-3">
                                    <p className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 border-b border-zinc-800/60 pb-2">
                                        Items Ordered
                                    </p>
                                    <div className="divide-y divide-zinc-800/40 space-y-2">
                                        {order.items && order.items.map((item, idx) => (
                                            <div key={item.id} className={`flex justify-between text-sm items-center ${idx > 0 ? 'pt-2' : ''}`}>
                                                <div className="text-zinc-200">
                                                    <span className="font-bold tracking-wide hover:text-blue-400 transition cursor-default">
                                                        {formatProductName(item.product?.name || item.name || 'Product')}
                                                    </span>
                                                    <span className="bg-zinc-950 border border-zinc-800 text-zinc-400 text-[11px] font-bold px-2 py-0.5 rounded-md ml-3">
                                                        x{item.quantity}
                                                    </span>
                                                </div>
                                                <span className="text-zinc-400 font-bold text-sm tracking-tight">
                                                    Rs {parseFloat(item.price * item.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Shipping Details */}
                                <div className="bg-zinc-950/40 border border-zinc-800/60 p-4 rounded-xl text-xs space-y-3">
                                    <p className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 border-b border-zinc-800/60 pb-2">
                                        Delivery Details
                                    </p>
                                    <div className="space-y-2 text-zinc-300">
                                        <p className="flex justify-between"><span className="font-bold text-zinc-500">Phone:</span> <span className="font-medium">{order.phone}</span></p>
                                        <p className="flex flex-col gap-0.5"><span className="font-bold text-zinc-500">Address:</span> <span className="font-medium text-zinc-400 leading-relaxed">{order.shipping_address}</span></p>
                                        <p className="flex justify-between pt-1 border-t border-zinc-800/40"><span className="font-bold text-zinc-500">Payment:</span> <span className="text-blue-400 font-bold bg-blue-500/5 border border-blue-500/10 px-1.5 py-0.5 rounded uppercase text-[10px] tracking-wide">{order.payment_method}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyOrders;