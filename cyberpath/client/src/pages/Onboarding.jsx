import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Target, CalendarDays, ListTodo } from 'lucide-react';
import { useStore } from '../store/useStore';
import { roadmapData } from '../data/roadmap';
import toast from 'react-hot-toast';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(null);
  const [style, setStyle] = useState(null);
  const { setOnboarding, user } = useStore();
  const navigate = useNavigate();

  const handleFinish = async () => {
    try {
      const modeData = roadmapData[mode];
      await setOnboarding({
        selectedMode: mode,
        learningStyle: style,
        totalTasksInMode: modeData ? modeData.totalTasks : 0
      });
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to save onboarding preferences');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6 max-w-5xl mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-text-primary mb-3">Choose Your Path</h2>
        <p className="text-text-secondary">Select the intensity and depth of your cybersecurity training.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { id: 'deep_dive', title: 'Deep Dive', badge: '2 Months', desc: 'Start from absolute zero. Every concept is built from the ground up.', inc: ['8-week structure', 'All fundamentals', 'Hands-on tool labs', 'Cloud & AD basics', 'Interview prep'] },
          { id: 'standard', title: 'Standard', badge: '1 Month', desc: 'Moves faster through fundamentals and spends more time on tools and labs.', inc: ['4-week structure', 'Accelerated OS/Net', 'Full tool coverage', 'IR process', 'Interview prep'] },
          { id: 'intensive', title: 'Intensive', badge: '2 Weeks', desc: 'Skips fundamentals. Focuses on the most frequently asked topics.', inc: ['Core tools only', 'MITRE ATT&CK', 'Top 50 interview Qs', 'Resume optimization'] }
        ].map(m => (
          <div 
            key={m.id} 
            onClick={() => setMode(m.id)}
            className={`card cursor-pointer transition-all border-2 ${mode === m.id ? 'border-accent bg-surface-2' : 'border-border hover:border-text-muted'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-mono font-bold text-text-primary">{m.title}</h3>
              <span className="badge bg-surface border-border text-text-secondary">{m.badge}</span>
            </div>
            <p className="text-sm text-text-secondary mb-6 h-20">{m.desc}</p>
            <ul className="space-y-2 text-sm text-text-muted">
              {m.inc.map((item, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <Shield className="w-4 h-4 text-accent shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button 
          disabled={!mode} 
          onClick={() => setStep(2)}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 max-w-4xl mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-text-primary mb-3">Choose Learning Style</h2>
        <p className="text-text-secondary">How do you prefer to track your progress?</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div 
          onClick={() => setStyle('day_based')}
          className={`card cursor-pointer transition-all border-2 ${style === 'day_based' ? 'border-accent bg-surface-2' : 'border-border hover:border-text-muted'}`}
        >
          <CalendarDays className={`w-10 h-10 mb-4 ${style === 'day_based' ? 'text-accent' : 'text-text-muted'}`} />
          <h3 className="text-xl font-mono font-bold text-text-primary mb-2">Day-Based Learning</h3>
          <p className="text-sm text-accent mb-4">"Structured. Consistent. Calendar-driven."</p>
          <p className="text-sm text-text-secondary mb-4">Each day has a fixed set of tasks. Your progress is tracked on a calendar. Streaks and completions are monitored daily.</p>
          <div className="text-xs text-text-muted mt-auto pt-4 border-t border-border">Best for: People who thrive with daily routine</div>
        </div>

        <div 
          onClick={() => setStyle('task_based')}
          className={`card cursor-pointer transition-all border-2 ${style === 'task_based' ? 'border-accent bg-surface-2' : 'border-border hover:border-text-muted'}`}
        >
          <ListTodo className={`w-10 h-10 mb-4 ${style === 'task_based' ? 'text-accent' : 'text-text-muted'}`} />
          <h3 className="text-xl font-mono font-bold text-text-primary mb-2">Task-Based Learning</h3>
          <p className="text-sm text-accent mb-4">"Flexible. Topic-driven. Self-paced."</p>
          <p className="text-sm text-text-secondary mb-4">Complete tasks in any order. Progress is measured by overall percentage, not by date. No missed days.</p>
          <div className="text-xs text-text-muted mt-auto pt-4 border-t border-border">Best for: People with variable schedules</div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={() => setStep(1)} className="btn-outline">Back</button>
        <button 
          disabled={!style} 
          onClick={() => setStep(3)}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 max-w-xl mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-text-primary mb-3">Confirmation</h2>
        <p className="text-text-secondary">You are about to start your journey.</p>
      </div>

      <div className="card text-center space-y-6 p-8">
        <div>
          <h4 className="text-text-muted font-mono text-sm uppercase mb-1">Selected Mode</h4>
          <p className="text-2xl font-bold text-text-primary">{mode.replace('_', ' ').toUpperCase()}</p>
        </div>
        <div>
          <h4 className="text-text-muted font-mono text-sm uppercase mb-1">Learning Style</h4>
          <div className="flex items-center justify-center gap-2">
            {style === 'day_based' ? <CalendarDays className="w-5 h-5 text-accent"/> : <ListTodo className="w-5 h-5 text-accent"/>}
            <p className="text-xl font-bold text-text-primary">{style === 'day_based' ? 'Daily Calendar' : 'Flexible Tasks'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={() => setStep(2)} className="btn-outline">Back</button>
        <button onClick={handleFinish} className="btn-primary flex gap-2 items-center">
          <Target className="w-5 h-5" /> Start My Roadmap
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};

export default Onboarding;
