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

    // اسٹیٹس تبدیل کرنے کا فنکشن
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
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-6xl mt-6 text-left">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin: Order Management</h1>
            <p className="text-gray-500 mb-6 text-sm">Manage and fulfill all customer orders from here.</p>

           
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
                    {successMessage}
                </div>
            )}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                    {error}
                </div>
            )}

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No customer orders found in the database.</p>
                </div>
            ) : (
                <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-gray-700">Order Details</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700">Customer Info</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700">Items Placed</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700">Total Price</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700 text-center">Change Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        {/* Order ID & Date */}
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className="font-bold text-blue-600">#NGS-{order.id}</span>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </div>
                                            <span className={`mt-2 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeClass(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>

                                        {/* Customer Info */}
                                        <td className="px-4 py-4">
                                            <div className="font-medium text-gray-800">{order.user?.name || 'Guest User'}</div>
                                            <div className="text-xs text-gray-500">{order.phone}</div>
                                            <div className="text-xs text-gray-400 max-w-xs truncate" title={order.shipping_address}>
                                                {order.shipping_address}
                                            </div>
                                        </td>

                                        {/* Items */}
                                        <td className="px-4 py-4">
                                            <div className="space-y-1">
                                                {order.items && order.items.map((item) => (
                                                    <div key={item.id} className="text-xs text-gray-600">
                                                        • {item.product?.name || 'Product'} <span className="font-semibold">x{item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>

                                        {/* Total Bill */}
                                        <td className="px-4 py-4 whitespace-nowrap font-bold text-gray-900">
                                            Rs. {order.total}
                                        </td>

                                        {/* Status Controls */}
                                        <td className="px-4 py-4 whitespace-nowrap text-center">
                                            {updatingId === order.id ? (
                                                <span className="text-xs text-blue-600 animate-pulse">Updating...</span>
                                            ) : (
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className="border border-gray-300 rounded px-2 py-1 bg-white text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="completed">Completed</option>
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
    );
};

export default OrderManagement;