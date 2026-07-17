import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from '@/Features/Products/pages/Product.jsx';
import Login from '@/Features/Auth/pages/Login.jsx';
import Register from '@/Features/Auth/pages/Register.jsx';
import api from '@/Api/api.jsx'; // 
import ProtectedRoute from '@/Routes/ProtectedRoute';
import Navbar from './Layouts/Navbar';
import GuestRoute from './Features/Auth/components/GuestRoute';
import CartItem from './Features/Cart/pages/CartItem';
import Checkout from './Features/Cart/pages/Checkout';
import OrderSuccess from './Features/Orders/pages/OrderSuccess';
import MyOrders from './Features/Orders/pages/MyOrders';
import OrderManagement from './Features/Admin/OrderManagment';
import Dashboard from './Features/Admin/Dashboard';

function App() {
    
    return (

      <div>
        
        <Navbar />
        
        
            <Routes>
                    <Route path="/" element={<Product />} />
                    <Route path="/cart" element={<CartItem />} />

                <Route element={<GuestRoute />}>
                
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                </Route>
                
                    <Route element={<ProtectedRoute />} >
                    
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/my-orders" element={<MyOrders />} />


                 {/*Strictly Admin Only Routes (Industry Standard Wrapper) */}
                <Route element={<ProtectedRoute adminOnly={true} />}>
                    <Route path="/admin/orders" element={<OrderManagement />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                </Route>
                    
                      
                    </Route>
                
            </Routes>
       

        </div>
    );
}

export default App;