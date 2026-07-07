import { useContext, useState } from 'react';
import api from '../../../Api/api.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../Features/Auth/context/AuthContext.jsx'

function Login() {
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        
        api.post('/login', {
            email: email,
            password: password
        })
        .then(response => {
            setLoading(false);
                    
            if (response.data.token) {
                console.log(response.data);
                
                login(response.data.user, response.data.token);
                navigate('/'); 
            } else {
                setError("Token not received from server.");
            }
        })
        .catch(err => {
            setLoading(false);
        
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Invalid email or password.");
            }
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white p-6">
            <div className="w-full max-w-md bg-zinc-800 p-8 rounded-lg shadow-lg border border-zinc-700">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Welcome Back</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-400 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <input 
                            type="email" 
                            required
                            className="w-full p-2.5 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:border-blue-500 text-white"
                            placeholder="saqi@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-full p-2.5 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:border-blue-500 text-white"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 p-2.5 rounded font-bold transition duration-200 mt-2"
                    >
                        {loading ? "Logging in..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-400">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;