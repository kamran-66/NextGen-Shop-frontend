import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from '@/Features/Products/pages/Product.jsx';
import Login from '@/Features/Auth/pages/Login.jsx';
import Register from '@/Features/Auth/pages/Register.jsx';
import api from '@/Api/api.jsx'; // 
import ProtectedRoute from '@/Routes/ProtectedRoute';
import Navbar from './Layouts/Navbar';
import GuestRoute from './Features/Auth/components/GuestRoute';

function App() {
    return (

      <div>
        <Navbar />
        
            <Routes>

                <Route element={<GuestRoute />}>
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                </Route>
                
                    <Route element={<ProtectedRoute />} >
                    
                    <Route path="/" element={<Product />} />
                      
                    </Route>
                
            </Routes>
       

        </div>
    );
}

export default App;