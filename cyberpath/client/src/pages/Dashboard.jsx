import React from 'react';
import { useStore } from '../store/useStore';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { ArrowRight, CheckCircle, Activity, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { differenceInDays } from 'date-fns';

const Dashboard = () => {
  const { user, progress, calculateProgressData } = useStore();
  
  if (!user || !progress) return <div>Loading...</div>;

  const progressData = calculateProgressData();
  const percent = progressData.percent;
  
  const datachart = [{ name: 'Progress', value: percent, fill: '#2563EB' }];

  const daysActive = user.modeStartDate ? differenceInDays(new Date(), new Date(user.modeStartDate)) : 0;
  
  const calculateStreak = () => {
     if(user.learningStyle !== 'day_based' || !progress.completedDays.length) return 0;
     let streak = 0;
     const sortedDates = [...progress.completedDays].sort().reverse();
     
     const today = new Date().toISOString().split('T')[0];
     let currentDate = new Date(today);
     
     if(sortedDates.includes(today)) streak++;
     else currentDate.setDate(currentDate.getDate() - 1); // allow missing today, check yesterday
     
     for (const date of sortedDates) {
       if(date === today) continue; 
       if (date === currentDate.toISOString().split('T')[0]) {
         streak++;
         currentDate.setDate(currentDate.getDate() - 1);
       } else break;
     }
     return streak;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-text-primary">Welcome back, {user.displayName || user.username}</h1>
        <p className="text-text-secondary mt-1">Ready to continue your {user.selectedMode?.replace('_', ' ')} roadmap?</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Progress Card */}
        <div className="card md:col-span-2 flex flex-col md:flex-row items-center justify-between p-8">
          <div className="w-48 h-48 relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" cy="50%" 
                innerRadius="80%" outerRadius="100%" 
                barSize={12} 
                data={datachart}
                startAngle={90} endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar minAngle={15} background={{ fill: '#1A2F52' }} clockWise dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-mono font-bold text-text-primary">{percent}%</span>
              <span className="text-xs text-text-muted tracking-widest uppercase">Complete</span>
            </div>
          </div>
          
          <div className="flex-1 mt-6 md:mt-0 md:ml-12 w-full">
            <h3 className="text-xl font-bold mb-4">Your current status</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-surface-2 rounded-md p-4 border border-border">
                <span className="block text-text-muted text-xs font-mono uppercase mb-1">Mode</span>
                <span className="text-text-primary font-medium capitalize">{user.selectedMode?.replace('_', ' ')}</span>
              </div>
              <div className="bg-surface-2 rounded-md p-4 border border-border">
                <span className="block text-text-muted text-xs font-mono uppercase mb-1">Style</span>
                <span className="text-text-primary font-medium capitalize">{user.learningStyle?.replace('_', ' ')}</span>
              </div>
            </div>
            <Link to="/roadmap" className="btn-primary w-full group">
              Continue Learning
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Stats Column */}
        <div className="space-y-6 flex flex-col">
          <div className="card flex-1 flex flex-col justify-center items-center text-center">
            <CheckCircle className="w-8 h-8 text-success mb-3" />
            <span className="text-3xl font-mono font-bold text-text-primary mb-1">{progressData.completed} <span className="text-lg text-text-muted">/ {progressData.total}</span></span>
            <span className="text-sm text-text-secondary">Tasks Completed</span>
          </div>
          
          <div className="card flex-1 flex flex-col justify-center items-center text-center">
            <Activity className="w-8 h-8 text-accent mb-3" />
            <span className="text-3xl font-mono font-bold text-text-primary mb-1">{daysActive}</span>
            <span className="text-sm text-text-secondary">Days Active</span>
          </div>

          {user.learningStyle === 'day_based' && (
            <div className="card flex-1 flex flex-col justify-center items-center text-center border-orange-900/30">
              <Flame className="w-8 h-8 text-warning mb-3" />
              <span className="text-3xl font-mono font-bold text-text-primary mb-1">{calculateStreak()}</span>
              <span className="text-sm text-text-secondary">Day Streak</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
