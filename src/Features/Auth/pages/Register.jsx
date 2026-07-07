import { useState } from 'react';
import api from '../../../Api/api.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../Features/Auth/context/AuthContext.jsx'


function Register() {
    const {login} = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        
        if (password !== passwordConfirmation) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        
        api.post('/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation 
        })
        .then(response => {
            setLoading(false);
        
            if (response.data.token) {
                 login(response.data.user, response.data.token);
                // localStorage.setItem('auth_token', response.data.token);
                navigate('/'); 
            } else {
            
                navigate('/login');
            }
        })
        .catch(err => {
            setLoading(false);
            
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Registration failed. Please try again.");
            }
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white p-6">
            <div className="w-full max-w-md bg-zinc-800 p-8 rounded-lg shadow-lg border border-zinc-700">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Create Account</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-400 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input 
                            type="text" 
                            required
                            className="w-full p-2.5 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:border-blue-500 text-white"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <input 
                            type="email" 
                            required
                            className="w-full p-2.5 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:border-blue-500 text-white"
                            placeholder="sam@example.com"
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

                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-full p-2.5 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:border-blue-500 text-white"
                            placeholder="••••••••"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 p-2.5 rounded font-bold transition duration-200 mt-2"
                    >
                        {loading ? "Registering..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-zinc-400">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;