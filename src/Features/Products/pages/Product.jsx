import { useEffect, useState } from 'react';
import api from '@/Api/api.jsx'; 
import { useContext } from 'react';
import { CartContext } from '../../Cart/context/CartContext';

function Home() {
  const {addToCart} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    api.get('/products')
      .then(response => {
        
        setProducts(response.data.data); 
        setLoading(false);
      })
      .catch(error => {
        console.error("Backend se products nahi mil sakay:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-10">Loading for products...</div>;

  return (
    <div className="p-6 bg-zinc-900 min-h-screen text-white">
      
      <h1 className="text-3xl font-bold mb-6 text-center">Next-Gen-Shop Products</h1>
      
      {products.length === 0 ? (
        <p className="text-center text-gray-400">No product found, check backend!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            
            <div key={product.id} className="border border-zinc-700 p-4 rounded-lg bg-zinc-800 shadow">

              <img src={`http://ecommerce_backend.test/storage/${product.image}`} alt={product.name} 
              className="w-full h-48 object-cover object-center"
              onError={(e)=>{
                e.target.src ="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop";

              }} />

                <h2 className="text-md  mb-2">Stock:{product.stock}</h2>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{product.description || 'No description'}</p>
                <div className="flex justify-between items-center">
                <span className="text-green-400 font-bold">RS:{product.price}</span>

                <button onClick={()=> addToCart(product)} disabled={product.stock === 0} className={product.stock === 0 ? "bg-gray-400 cursor-not-allowed px-3 py-1 active:scale-95 rounded text-sm" : "bg-blue-600  hover:bg-blue-700 px-3 py-1 active:scale-95 rounded text-sm"}>  

                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}

                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;