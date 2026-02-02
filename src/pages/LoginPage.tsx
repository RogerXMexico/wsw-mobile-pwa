import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
    } else {
      if (!name.trim()) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, name);
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Check your email to confirm your account!');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="text-6xl mb-4">🐒</div>
        <h1 className="text-2xl font-bold text-white">WSW Options University</h1>
        <p className="text-zinc-400 mt-2 text-sm">Master the Options Jungle</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#39ff14]/15 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#39ff14]/50 transition-colors text-base"
              placeholder="Your name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#39ff14]/15 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#39ff14]/50 transition-colors text-base"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#39ff14]/15 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#39ff14]/50 transition-colors text-base"
            placeholder="••••••••"
            required
            minLength={6}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-[#39ff14]/10 border border-emerald-500/30 rounded-xl p-3 text-[#39ff14] text-sm">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[#39ff14] text-black font-semibold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-base"
        >
          {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      {/* Toggle */}
      <div className="mt-6 text-zinc-400 text-sm">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
          className="text-[#39ff14] font-medium"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
    </div>
  );
}
