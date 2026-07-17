import { useEffect, useState } from 'react';
import api from '@/Api/api.jsx'; 
import { useContext } from 'react';
import { CartContext } from '../../Cart/context/CartContext';

function Home() {
  const { addToCart } = useContext(CartContext);
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

  // Format string to remove underscores or hyphens for clean UI
  const formatProductName = (name) => {
    if (!name) return '';
    return name.replace(/[_-]/g, ' ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium tracking-wide">Loading premium products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      {/* Page Title */}
      <h1 className="text-3xl font-extrabold mb-10 text-center tracking-wide bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
        Next-Gen-Shop Products
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl max-w-md mx-auto bg-zinc-900/30">
          <p className="text-zinc-400 font-medium">No products found. Check your backend!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map(product => {
            const isOutOfStock = product.stock === 0;
            return (
              <div 
                key={product.id} 
                className="group relative border border-zinc-800/80 rounded-2xl bg-zinc-900 overflow-hidden shadow-xl hover:shadow-2xl hover:border-zinc-700/50 transition duration-300 flex flex-col justify-between"
              >
                {/* Product Image Wrapper */}
                <div className="relative overflow-hidden bg-zinc-950 h-52 w-full">
                  <img 
                    src={`http://ecommerce_backend.test/storage/${product.image}`} 
                    alt={product.name} 
                    className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${isOutOfStock ? 'opacity-40 grayscale' : ''}`}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop";
                    }} 
                  />
                  {/* Subtle Stock Badge */}
                  <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide shadow-md ${isOutOfStock ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-zinc-900/80 text-zinc-300 border border-zinc-800'}`}>
                    Stock: {product.stock}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Cleaned Product Name */}
                    <h2 className="text-lg font-bold text-zinc-100 tracking-wide mb-1.5 line-clamp-1 group-hover:text-blue-400 transition duration-200">
                      {formatProductName(product.name)}
                    </h2>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-5 line-clamp-2 min-h-[32px]">
                      {product.description || 'No description available for this item.'}
                    </p>
                  </div>

                  {/* Price & CTA Action */}
                  <div className="flex justify-between items-center mt-auto border-t border-zinc-800/60 pt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Price</span>
                      <span className="text-lg font-black text-emerald-400 tracking-tight">
                        RS {parseFloat(product.price).toLocaleString()}
                      </span>
                    </div>

                    <button 
                      onClick={() => addToCart(product)} 
                      disabled={isOutOfStock} 
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition duration-200 active:scale-95 shadow-lg ${
                        isOutOfStock 
                          ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50 shadow-none" 
                          : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/10 hover:shadow-blue-500/20"
                      }`}
                    >  
                      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;