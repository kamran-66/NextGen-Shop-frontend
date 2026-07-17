import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get('http://ecommerce_backend.test/api/admin/orders', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.status) {
                setOrders(response.data.orders);
            }
        } catch (err) {
            console.error("Error fetching all orders:", err);
            setError('Failed to load store orders.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    // Format string to remove underscores or hyphens for clean UI
    const formatProductName = (name) => {
        if (!name) return '';
        return name.replace(/[_-]/g, ' ');
    };

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingId(orderId);
        setError('');
        setSuccessMessage('');
        try {
            const response = await axios.put(`http://ecommerce_backend.test/api/admin/orders/${orderId}/status`, 
                { status: newStatus },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.status) {
                setSuccessMessage(`Order #${orderId} status updated to ${newStatus} successfully!`);
                
                setOrders(orders.map(order => 
                    order.id === orderId ? { ...order, status: newStatus } : order
                ));
                
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (err) {
            console.error("Error updating status:", err);
            setError('Failed to update status. Please try again.');
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'shipped': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-400">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium tracking-wide">Loading management board...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-950 min-h-screen text-zinc-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto mt-2 text-left">
                <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    Admin: Order Management
                </h1>
                <p className="text-zinc-500 mb-8 text-sm">Manage and fulfill all customer orders from here.</p>

                {/* Alerts */}
                {successMessage && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                        ✨ {successMessage}
                    </div>
                )}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                        ⚠️ {error}
                    </div>
                )}

                {orders.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
                        <p className="text-zinc-500 font-medium">No customer orders found in the database.</p>
                    </div>
                ) : (
                    <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-zinc-800/60 text-sm">
                                <thead className="bg-zinc-950/80 text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Order Details</th>
                                        <th className="px-6 py-4">Customer Info</th>
                                        <th className="px-6 py-4">Items Placed</th>
                                        <th className="px-6 py-4">Total Price</th>
                                        <th className="px-6 py-4 text-center">Change Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/40">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-zinc-800/20 transition duration-150 group">
                                            {/* Order ID & Date */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-black text-blue-400 tracking-tight group-hover:text-blue-300 transition">
                                                    #NGS-{order.id}
                                                </span>
                                                <div className="text-xs text-zinc-500 mt-1 font-medium">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </div>
                                                <div className="mt-2">
                                                    <span className={`px-2.5 py-0.5 inline-flex text-[10px] font-bold rounded-md border uppercase tracking-wider ${getStatusBadgeClass(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Customer Info */}
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-zinc-200 tracking-wide">{order.user?.name || 'Guest User'}</div>
                                                <div className="text-xs text-zinc-400 mt-0.5 font-medium">{order.phone}</div>
                                                <div className="text-xs text-zinc-500 max-w-xs truncate mt-1 leading-relaxed" title={order.shipping_address}>
                                                    {order.shipping_address}
                                                </div>
                                            </td>

                                            {/* Items */}
                                            <td className="px-6 py-4">
                                                <div className="space-y-1.5">
                                                    {order.items && order.items.map((item) => (
                                                        <div key={item.id} className="text-xs text-zinc-300 font-medium">
                                                            <span className="text-zinc-500 mr-1">•</span>
                                                            {formatProductName(item.product?.name || item.name || 'Product')} 
                                                            <span className="bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-bold px-1.5 py-0.5 rounded ml-2">
                                                                x{item.quantity}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>

                                            {/* Total Bill */}
                                            <td className="px-6 py-4 whitespace-nowrap font-black text-emerald-400 text-base tracking-tight">
                                                Rs {parseFloat(order.total).toLocaleString()}
                                            </td>

                                            {/* Status Controls */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                {updatingId === order.id ? (
                                                    <span className="text-xs text-blue-400 font-bold animate-pulse">Updating...</span>
                                                ) : (
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        className="border border-zinc-800 rounded-xl px-3 py-1.5 bg-zinc-950 text-xs text-zinc-300 font-bold tracking-wide focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-inner hover:border-zinc-700 transition"
                                                    >
                                                        <option value="pending" className="bg-zinc-900">Pending</option>
                                                        <option value="processing" className="bg-zinc-900">Processing</option>
                                                        <option value="shipped" className="bg-zinc-900">Shipped</option>
                                                        <option value="completed" className="bg-zinc-900">Completed</option>
                                                    </select>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderManagement;