import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; 
import { useNavigate } from 'react-router-dom';

export default function CartItem() {
    const { cartItems, updateQuantity, removeItem } = useContext(CartContext);

    const subtotal = cartItems.reduce((total, item) => {
        const price = item.product?.price || item.price || 0;
        return total + (price * item.quantity);
    }, 0);

    const navigate = useNavigate();

    // Format string to remove underscores or hyphens for clean UI
    const formatProductName = (name) => {
        if (!name) return '';
        return name.replace(/[_-]/g, ' ');
    };

    return (
        <div className="bg-zinc-950 min-h-screen text-zinc-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start mt-4">
                
                {/* Left Side: Shopping Cart Items List */}
                <div className="w-full lg:w-3/4 bg-zinc-900 border border-zinc-800/80 p-5 md:p-6 rounded-2xl shadow-xl">
                    <h2 className="text-xl font-extrabold mb-6 tracking-wide bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                        Shopping Cart
                    </h2>
                    
                    {cartItems.length === 0 ? (
                        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/40">
                            <p className="text-zinc-500 font-medium">Your shopping cart is empty!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-zinc-800 text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                                        <th className="pb-3 pl-2">Product</th>
                                        <th className="pb-3">Price</th>
                                        <th className="pb-3">Quantity</th>
                                        <th className="pb-3">Total</th>
                                        <th className="pb-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {cartItems.map((item) => {
                                        const productName = item.product?.name || item.name || 'Product';
                                        const productPrice = item.product?.price || item.price || 0;
                                        const productImage = item.product?.image || item.image || 'https://via.placeholder.com/150';

                                        return (
                                            <tr key={item.id} className="group hover:bg-zinc-800/20 transition duration-150">
                                                {/* Image and Name */}
                                                <td className="py-4 pl-2 flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800/60 shadow-inner">
                                                        <img 
                                                            src={productImage.startsWith('http') ? productImage : `http://ecommerce_backend.test/storage/${productImage}`} 
                                                            alt={productName} 
                                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                                                            onError={(e) => {
                                                                e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop";
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-zinc-100 tracking-wide group-hover:text-blue-400 transition duration-200">
                                                            {formatProductName(productName)}
                                                        </p>
                                                    </div>
                                                </td>
                                                
                                                {/* Base Price */}
                                                <td className="py-4 text-zinc-300 font-medium text-sm">
                                                    Rs {parseFloat(productPrice).toLocaleString()}
                                                </td>
                                                
                                                {/* Quantity Actions */}
                                                <td className="py-4">
                                                    <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 p-1 rounded-xl w-fit shadow-inner">
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                            className="w-7 h-7 flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 disabled:opacity-30 disabled:hover:bg-zinc-900 font-bold transition text-xs"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-bold text-zinc-200 select-none">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-7 h-7 flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 font-bold transition text-xs"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                
                                                {/* Total Price */}
                                                <td className="py-4 font-bold text-emerald-400 text-sm tracking-tight">
                                                    Rs {parseFloat(productPrice * item.quantity).toLocaleString()}
                                                </td>
                                                
                                                {/* Remove Action */}
                                                <td className="py-4 text-center">
                                                    <button 
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg border border-red-500/20 transition duration-200"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Right Side: Order Summary Card */}
                <div className="w-full lg:w-1/4 bg-zinc-900 border border-zinc-800/80 p-5 md:p-6 rounded-2xl shadow-xl h-fit sticky top-24">
                    <h3 className="text-lg font-bold mb-5 tracking-wide text-zinc-100 border-b border-zinc-800/60 pb-3">
                        Order Summary
                    </h3>
                    
                    <div className="space-y-3 border-b border-zinc-800/60 pb-4 text-zinc-400 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Subtotal</span>
                            <span className="font-bold text-zinc-200">Rs {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Shipping</span>
                            <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Free</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center my-5">
                        <span className="text-zinc-300 font-bold text-sm uppercase tracking-wider">Total Amount</span>
                        <span className="text-xl font-black text-emerald-400 tracking-tight">
                            Rs {subtotal.toLocaleString()}
                        </span>
                    </div>
                    
                    <button
                        disabled={cartItems.length === 0}
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:border-zinc-700/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 border border-transparent transition duration-200 text-sm tracking-wide"
                    >
                        Proceed to Checkout
                    </button>
                </div>

            </div>
        </div>
    );
}