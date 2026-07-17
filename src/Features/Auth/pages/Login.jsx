import { useContext, useState } from 'react';
import api from '@/Api/api.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '@/Features/Auth/context/AuthContext.jsx'

function Login() {
    const { login } = useContext(AuthContext);
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
        <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-white p-6">
            <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-800/80 hover:border-zinc-700/50 transition duration-300">
                {/* Heading with smooth gradient */}
                <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Welcome Back
                </h2>

                {error && (
                    <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-semibold text-center tracking-wide animate-shake">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5 text-left">
                    <div>
                        <label className="block text-xs uppercase font-extrabold tracking-wider text-zinc-400 mb-2">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            required
                            className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/20 transition duration-150 text-sm"
                            placeholder="saqi@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-extrabold tracking-wider text-zinc-400 mb-2">
                            Password
                        </label>
                        <input 
                            type="password" 
                            required
                            className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/20 transition duration-150 text-sm"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed py-3 rounded-xl font-bold transition duration-200 mt-4 text-sm tracking-wide shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-[0.98]"
                    >
                        {loading ? "Logging in..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs font-medium text-zinc-500 tracking-wide">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-400 hover:text-blue-300 transition font-bold ml-1">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;