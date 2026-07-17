import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, PieChart, Pie, Cell 
} from 'recharts';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 145800,
        totalOrders: 312,
        totalProducts: 48,
        totalUsers: 184
    });

    // Mock data for beautiful visualization (Aap dynamic bhi kar sakte hain backend se)
    const salesData = [
        { name: 'Jan', Sales: 12000, Orders: 25 },
        { name: 'Feb', Sales: 19000, Orders: 38 },
        { name: 'Mar', Sales: 15000, Orders: 32 },
        { name: 'Apr', Sales: 28000, Orders: 56 },
        { name: 'May', Sales: 22000, Orders: 45 },
        { name: 'Jun', Sales: 34000, Orders: 72 },
        { name: 'Jul', Sales: 45800, Orders: 94 },
    ];

    const categoryData = [
        { name: 'Electronics', value: 45 },
        { name: 'Accessories', value: 30 },
        { name: 'Gaming Gear', value: 25 },
    ];

    const COLORS = ['#3b82f6', '#8b5cf6', '#10b981'];

    useEffect(() => {
        // Agar aapne backend se real stats fetch karne hon to yahan API call laga sakte hain
        // axios.get('http://ecommerce_backend.test/api/admin/dashboard-stats', ... )
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-400">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium tracking-wide">Compiling analytics dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-950 min-h-screen text-zinc-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto mt-2 text-left">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">Overview of Next-Gen-Shop business performance metrics.</p>
                </div>

                {/* 4 Overview Analytics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {/* Revenue Card */}
                    <div className="bg-zinc-900 border border-zinc-800/80 p-5 rounded-2xl shadow-xl hover:border-zinc-700/40 transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] uppercase font-extrabold text-zinc-500 tracking-widest">Total Revenue</p>
                                <h3 className="text-2xl font-black text-emerald-400 mt-2 tracking-tight">
                                    Rs {stats.totalRevenue.toLocaleString()}
                                </h3>
                            </div>
                            <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-3 font-medium"><span className="text-emerald-400 font-bold">↑ 12%</span> vs last month</p>
                    </div>

                    {/* Orders Card */}
                    <div className="bg-zinc-900 border border-zinc-800/80 p-5 rounded-2xl shadow-xl hover:border-zinc-700/40 transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] uppercase font-extrabold text-zinc-500 tracking-widest">Total Orders</p>
                                <h3 className="text-2xl font-black text-blue-400 mt-2 tracking-tight">{stats.totalOrders}</h3>
                            </div>
                            <div className="bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20 text-blue-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-3 font-medium"><span className="text-blue-400 font-bold">↑ 8%</span> sales velocity</p>
                    </div>

                    {/* Products Card */}
                    <div className="bg-zinc-900 border border-zinc-800/80 p-5 rounded-2xl shadow-xl hover:border-zinc-700/40 transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] uppercase font-extrabold text-zinc-500 tracking-widest">Live Products</p>
                                <h3 className="text-2xl font-black text-purple-400 mt-2 tracking-tight">{stats.totalProducts}</h3>
                            </div>
                            <div className="bg-purple-500/10 p-2.5 rounded-xl border border-purple-500/20 text-purple-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-3 font-medium">Active items in stock</p>
                    </div>

                    {/* Users Card */}
                    <div className="bg-zinc-900 border border-zinc-800/80 p-5 rounded-2xl shadow-xl hover:border-zinc-700/40 transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] uppercase font-extrabold text-zinc-500 tracking-widest">Total Customers</p>
                                <h3 className="text-2xl font-black text-amber-400 mt-2 tracking-tight">{stats.totalUsers}</h3>
                            </div>
                            <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-amber-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-3 font-medium"><span className="text-amber-400 font-bold">↑ 24+</span> new signups</p>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Main Sales Trend Analytics Chart */}
                    <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800/80 p-5 rounded-2xl shadow-xl">
                        <h2 className="text-sm uppercase font-extrabold tracking-wider text-zinc-400 mb-6 border-b border-zinc-800/60 pb-3">
                            Revenue & Order Velocity
                        </h2>
                        <div className="h-80 w-full text-xs">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                    <XAxis dataKey="name" stroke="#71717a" tickLine={false} />
                                    <YAxis stroke="#71717a" tickLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#f4f4f5' }}
                                    />
                                    <Area type="monotone" dataKey="Sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Category Distribution Pie Chart */}
                    <div className="bg-zinc-900 border border-zinc-800/80 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
                        <div>
                            <h2 className="text-sm uppercase font-extrabold tracking-wider text-zinc-400 mb-6 border-b border-zinc-800/60 pb-3">
                                Stock Distribution
                            </h2>
                            <div className="h-48 w-full flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Legends */}
                        <div className="space-y-2 mt-4">
                            {categoryData.map((item, idx) => (
                                <div key={item.name} className="flex justify-between items-center text-xs font-medium">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                                        <span className="text-zinc-400">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-zinc-200">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;