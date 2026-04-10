import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Map, Target } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <div className="flex flex-1">
        {/* Left Panel */}
        <div className="hidden lg:flex w-[60%] border-r border-border bg-surface flex-col justify-center px-24">
          <h1 className="text-5xl font-mono tracking-tighter text-text-primary mb-4">
            <span className="text-accent">Cyber</span>Path
          </h1>
          <p className="text-xl text-text-secondary mb-12">Your structured path to a cybersecurity career.</p>
          
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-surface-2 rounded-lg border border-border">
                <Map className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-lg mb-1 text-text-primary">Curated Roadmaps</h3>
                <p className="text-text-muted">Structured paths from absolute beginner to interview-ready analyst.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-surface-2 rounded-lg border border-border">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-lg mb-1 text-text-primary">Adaptive Tracking</h3>
                <p className="text-text-muted">Learn how you want. Track progress by tasks or stick to a daily calendar.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-surface-2 rounded-lg border border-border">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-lg mb-1 text-text-primary">Industry Context</h3>
                <p className="text-text-muted">Stay updated with curated insights from top cybersecurity intelligence sources.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 relative">
          <div className="lg:hidden mb-8">
            <h1 className="text-4xl font-mono tracking-tighter text-text-primary">
              <span className="text-accent">Cyber</span>Path
            </h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-text-secondary mb-8">Enter your credentials to access your roadmap.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label-text">Username</label>
              <input 
                type="text" 
                value={username} onChange={e => setUsername(e.target.value)}
                className="input-field"
                placeholder="soc_analyst_01"
                required
              />
            </div>
            <div>
              <label className="label-text">Password</label>
              <input 
                type="password" 
                value={password} onChange={e => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full py-3">Sign In</button>
          </form>

          <p className="mt-6 text-text-secondary text-sm">
            Don't have an account? <Link to="/register" className="text-accent hover:underline">Register here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
