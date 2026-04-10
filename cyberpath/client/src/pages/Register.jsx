import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Map, Target } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';

const Register = () => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { register } = useStore();
  const navigate = useNavigate();

  const validate = () => {
    let errs = {};
    if (username.length < 3) errs.username = "Username must be at least 3 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(username)) errs.username = "Alphanumeric and underscores only";
    if (password.length < 6) errs.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register(username, password, displayName);
      navigate('/onboarding');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
        <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 relative py-12">
          <div className="lg:hidden mb-8">
            <h1 className="text-4xl font-mono tracking-tighter text-text-primary">
              <span className="text-accent">Cyber</span>Path
            </h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-text-secondary mb-8">Start your journey into cybersecurity today.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-text">Username</label>
              <input 
                type="text" 
                value={username} onChange={e => { setUsername(e.target.value); setErrors({...errors, username: null})}}
                className={`input-field ${errors.username ? 'border-danger' : ''}`}
                placeholder="soc_analyst_01"
              />
              {errors.username && <p className="text-danger text-xs mt-1">{errors.username}</p>}
            </div>
            <div>
              <label className="label-text">Display Name (Optional)</label>
              <input 
                type="text" 
                value={displayName} onChange={e => setDisplayName(e.target.value)}
                className="input-field"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="label-text">Password</label>
              <input 
                type="password" 
                value={password} onChange={e => { setPassword(e.target.value); setErrors({...errors, password: null})}}
                className={`input-field ${errors.password ? 'border-danger' : ''}`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-danger text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="label-text">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setErrors({...errors, confirmPassword: null})}}
                className={`input-field ${errors.confirmPassword ? 'border-danger' : ''}`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-danger text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className="btn-primary w-full py-3 mt-4">Register</button>
          </form>

          <p className="mt-6 text-text-secondary text-sm">
            Already have an account? <Link to="/login" className="text-accent hover:underline">Sign in here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
