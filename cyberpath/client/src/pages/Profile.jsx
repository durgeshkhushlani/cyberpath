import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import api from '../api/axios';

const Profile = () => {
  const { user, fetchUserContext, calculateProgressPercent } = useStore();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.put('/user/profile', { displayName, email });
      await fetchUserContext();
      toast.success('Profile updated');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
    try {
      await api.post('/auth/change-password', { currentPassword, newPassword });
      toast.success('Password updated successfully');
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password update failed');
    }
  };

  const handleResetOnboarding = async () => {
    if (!window.confirm("WARNING: This will reset your progress when picking a new mode. Are you sure?")) return;
    try {
      await api.post('/user/reset-onboarding');
      window.location.href = '/onboarding';
    } catch (err) {
      toast.error('Reset failed');
    }
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/feedback', { email: feedbackEmail, message: feedbackMsg });
      toast.success('Feedback sent to administrators secretly!');
      setFeedbackMsg('');
      setFeedbackEmail('');
    } catch (err) {
      toast.error('Failed to send feedback');
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-text-primary">Profile Settings</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        <div className="space-y-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Personal Details</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="label-text">Username</label>
                <input type="text" value={user.username} readOnly className="input-field opacity-50 cursor-not-allowed bg-surface" />
              </div>
              <div>
                <label className="label-text">Display Name</label>
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="label-text">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="Optional" />
              </div>
              <button type="submit" className="btn-primary mt-2">Save Details</button>
            </form>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-6">Current Roadmap</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-text-muted">Mode</span>
                <span className="font-mono text-text-primary bg-surface-2 px-2 py-0.5 rounded capitalize">{user.selectedMode?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-text-muted">Style</span>
                <span className="font-mono text-text-primary bg-surface-2 px-2 py-0.5 rounded capitalize">{user.learningStyle?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-text-muted">Progress</span>
                <span className="font-mono text-accent font-bold">{calculateProgressPercent()}%</span>
              </div>
            </div>
            <button onClick={handleResetOnboarding} className="btn-outline w-full mt-6 text-danger border-danger hover:bg-danger/10 hover:text-danger">
              Reset & Redo Onboarding
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="label-text">Current Password</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="input-field" required />
              </div>
              <div>
                <label className="label-text">New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field" required />
              </div>
              <div>
                <label className="label-text">Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" required />
              </div>
              <button type="submit" className="btn-primary mt-2">Update Password</button>
            </form>
          </div>

          <div className="card border-accent border-opacity-30">
            <h2 className="text-xl font-bold mb-2">Send Feedback</h2>
            <p className="text-sm text-text-secondary mb-4">Tell us what you think. Messages are secretly forwarded to the admins.</p>
            <form onSubmit={handleFeedback} className="space-y-4">
              <div>
                <label className="label-text">Email (Optional)</label>
                <input type="email" value={feedbackEmail} onChange={(e) => setFeedbackEmail(e.target.value)} className="input-field text-sm" placeholder="contact@example.com" />
              </div>
              <div>
                <label className="label-text">Message</label>
                <textarea rows="3" value={feedbackMsg} onChange={(e) => setFeedbackMsg(e.target.value)} className="input-field text-sm resize-none" required></textarea>
              </div>
              <button type="submit" className="btn-outline w-full">Send Feedback</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
