import { create } from 'zustand';
import api from '../api/axios';
import { roadmapData } from '../data/roadmap';

export const useStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  theme: localStorage.getItem('theme') || 'dark',
  announcements: [],
  progress: null, // { completedTaskIds: [], completedDays: [], totalTasksInMode: 0 }

  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    set({ theme: newTheme });
  },

  login: async (username, password) => {
    const res = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', res.data.token);
    set({ user: res.data.user, token: res.data.token, isAuthenticated: true });
    await get().fetchUserContext();
  },

  register: async (username, password, displayName) => {
    const res = await api.post('/auth/register', { username, password, displayName });
    localStorage.setItem('token', res.data.token);
    set({ user: res.data.user, token: res.data.token, isAuthenticated: true });
    await get().fetchUserContext();
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false, announcements: [], progress: null });
  },

  fetchUserContext: async () => {
    if (!get().isAuthenticated) return;
    try {
        const [userRes, progressRes, annRes] = await Promise.all([
          api.get('/user/profile'),
          api.get('/progress'),
          api.get('/user/announcements')
        ]);
        set({
            user: userRes.data,
            progress: progressRes.data,
            announcements: annRes.data
        });
    } catch(err) {
        if(err.response?.status === 401) {
            get().logout();
        }
    }
  },

  setOnboarding: async (payload) => {
    const res = await api.post('/user/onboarding', payload);
    set({ user: res.data });
    await get().fetchUserContext();
  },

  dismissAnnouncement: async (id) => {
    await api.post(`/user/dismiss-announcement/${id}`);
    set(state => ({
      announcements: state.announcements.filter(a => a._id !== id)
    }));
  },

  completeTask: async (taskId) => {
    const res = await api.post('/progress/complete-task', { taskId });
    set({ progress: res.data });
  },

  uncompleteTask: async (taskId) => {
    const res = await api.post('/progress/uncomplete-task', { taskId });
    set({ progress: res.data });
  },

  calculateProgressPercent: () => {
    const p = get().progress;
    if (!p || !p.totalTasksInMode || p.totalTasksInMode === 0) return 0;
    const progressPercent = (p.completedTaskIds.length / p.totalTasksInMode) * 100;
    return progressPercent > 100 ? 100 : Number(progressPercent.toFixed(1));
  }
}));
