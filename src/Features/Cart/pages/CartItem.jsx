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

    return (
        <div className="container mx-auto p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-6 mt-8">
                
                
                <div className="w-full lg:w-3/4 bg-white p-4 md:p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Shopping Cart</h2>
                    
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <p className="text-lg">Cart is empty!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="border-b text-gray-600 font-medium">
                                        <th className="py-3">Product</th>
                                        <th className="py-3">Price</th>
                                        <th className="py-3">Quantity</th>
                                        <th className="py-3">Total</th>
                                        <th className="py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => {
                                        const productName = item.product?.name || item.name || 'Product';
                                        const productPrice = item.product?.price || item.price || 0;
                                        const productImage = item.product?.image || item.image || 'https://via.placeholder.com/150';

                                        return (
                                            <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                                                
                                                <td className="py-4 flex items-center gap-4">
                                                    <img 
                                                        src={productImage.startsWith('http') ? productImage : `http://ecommerce_backend.test/storage/${productImage}`} 
                                                        alt={productName} 
                                                        className="w-16 h-16 object-cover rounded border" 
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{productName}</p>
                                                    </div>
                                                </td>
                                                
                                                
                                                <td className="py-4 text-gray-700">Rs {productPrice}</td>
                                                
                                              
                                                <td className="py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                            className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 disabled:opacity-50 font-bold"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-bold"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                
                                                
                                                <td className="py-4 font-semibold text-gray-800">
                                                    Rs {productPrice * item.quantity}
                                                </td>
                                                
                                                
                                                <td className="py-4 text-center">
                                                    <button 
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-500 hover:text-red-700 font-medium transition"
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

                
                <div className="w-full lg:w-1/4 bg-white p-4 md:p-6 rounded-lg shadow-md h-fit">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>
                    
                    <div className="space-y-3 border-b pb-4 text-gray-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-800">Rs {subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center my-4">
                        <span className="text-gray-800 font-semibold">Total Amount</span>
                        <span className="text-xl font-bold text-gray-900">Rs {subtotal}</span>
                    </div>
                    
                <button
                    disabled={cartItems.length === 0}
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow transition disabled:opacity-50"
                >
                    Proceed to Checkout
                </button>
                
                </div>

            </div>
        </div>
    );
}