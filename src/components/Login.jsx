import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { LogIn, Loader } from 'lucide-react';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) alert(error.message);
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans" dir="rtl">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-300">

                <div className="text-center">
                    {/* Logo Placeholder */}
                    <div className="w-24 h-24 bg-blue-50 rounded-full mx-auto flex items-center justify-center mb-4">
                        <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">نظام إدارة العمليات</h2>
                    <p className="mt-2 text-sm text-gray-600">الرجاء تسجيل الدخول للمتابعة</p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-2 text-right">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="name@company.com"
                        />
                    </div>
                    <div className="space-y-2 text-right">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">كلمة المرور</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader className="animate-spin" size={20} /> : <LogIn size={20} />}
                        تسجيل الدخول
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-xs text-gray-400">PULSAR S.A.S - System v1.0</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
