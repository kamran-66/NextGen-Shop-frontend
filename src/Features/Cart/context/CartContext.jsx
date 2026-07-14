import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';



export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

        const addToCart = async (product) => {
                const existingCart = [...cartItems];
                const itemIndex = existingCart.findIndex(item => item.id === product.id);

                        if (itemIndex > -1) {
                            existingCart[itemIndex].quantity += 1;
                        } else {
                            existingCart.push({ ...product, quantity: 1 });
                        }

                        setCartItems(existingCart);

                        
                        const token = localStorage.getItem('token');
                        if (!token) {
                            console.log("Product added to Guest Cart locally!");
                            return; 
                        }

                
                try {
                    const response = await axios.post(`http://ecommerce_backend.test/api/cart/add/${product.id}`, {}, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    console.log("Product successfully added to database:", response.data);
                } catch (error) {
                    console.error("Sync error in cart from database:", error);
                }
            };

                    const updateQuantity = (productId, newQuantity) => {
                        if (newQuantity < 1) return;

                        const existingCart = [...cartItems];
                        const itemIndex = existingCart.findIndex(item => item.id === productId);

                        if (itemIndex > -1) {
                            existingCart[itemIndex].quantity = newQuantity;
                            setCartItems(existingCart);
                        }
                    };
                const removeItem = async (productId) => {
                        const updatedCart = cartItems.filter(item => item.id !== productId);
                        setCartItems(updatedCart);

                        const token = localStorage.getItem('token');
                        if (!token) {
                            console.log("Item removed from Guest Cart locally!");
                            
                            return; 
                        }
        
                        
                        try {
                            const response = await axios.delete(`http://ecommerce_backend.test/api/cart/remove/${productId}`, {
                                headers: { 'Authorization': `Bearer ${token}` }
                            });
                            console.log("Item removed successfully from database:", response.data);
                        } catch (error) {
                            console.error("Error from backend:", error);
                        }
        
    };
    
      
    
        const clearCart = () => {
            setCartItems([]);
            localStorage.removeItem('cart');
    };
    
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);


    return (

        <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateQuantity, removeItem, clearCart }}>
        
            {children}
        </CartContext.Provider>
    );
};

