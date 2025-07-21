import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const trimmedUser = username.trim();
        const trimmedPass = password.trim();

        if (trimmedUser === 'admin' && trimmedPass === 'admin') {
            navigate('/home');
        } else {
            alert('Identifiants incorrects');
        }
    };

    const handleGoogleLogin = () => {
        alert('Connexion Google non encore implémentée.');
        // 👉 Ici, tu pourras ajouter Firebase/Auth0 plus tard
    };

    const handleGitHubLogin = () => {
        alert('Connexion GitHub non encore implémentée.');
        // 👉 Idem ici
    };

    return (
        <>
            <style>{`
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { margin: 0; padding: 0; width: 100%; }
                #root { width: 100%; }
            `}</style>

            <div
                className="flex flex-col min-h-screen bg-white font-[Inter,_Noto_Sans,sans-serif]"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100vw',
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 w-full">
                    <form
                        onSubmit={handleLogin}
                        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome back</h2>

                        <div>
                            <label className="block text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="admin"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="admin"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
                        >
                            Log in
                        </button>

                        <p className="text-center text-sm text-gray-500 underline cursor-pointer hover:text-gray-700">
                            Forgot password?
                        </p>

                        <div className="space-y-3 pt-4">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition"
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                                Log in with Google
                            </button>

                            <button
                                type="button"
                                onClick={handleGitHubLogin}
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition"
                            >
                                <img
                                    src="https://www.svgrepo.com/show/512317/github-142.svg"
                                    alt="GitHub"
                                    className="w-5 h-5"
                                />
                                Log in with GitHub
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
