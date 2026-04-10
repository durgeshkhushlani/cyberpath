import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { roadmapData } from '../data/roadmap';
import { ChevronDown, ChevronUp, CheckCircle2, Circle, ExternalLink, Calendar as CalendarIcon } from 'lucide-react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, isToday, parseISO } from 'date-fns';
import api from '../api/axios';

const TaskItem = ({ task, isCompleted, toggleTask }) => (
  <div 
    className={`flex items-start gap-4 p-4 rounded-md border transition-all cursor-pointer ${isCompleted ? 'bg-surface-2 border-accent' : 'bg-surface border-border hover:border-text-muted'}`}
    onClick={() => toggleTask(task.id, isCompleted)}
  >
    <div className="mt-0.5 shrink-0">
      {isCompleted ? <CheckCircle2 className="w-5 h-5 text-accent" /> : <Circle className="w-5 h-5 text-text-muted" />}
    </div>
    <div className="flex-1">
      <p className={`text-sm ${isCompleted ? 'text-text-primary line-through opacity-70' : 'text-text-primary'}`}>{task.text}</p>
    </div>
  </div>
);

const Roadmap = () => {
  const { user, progress, completeTask, uncompleteTask, fetchUserContext } = useStore();
  const [activeWeek, setActiveWeek] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!user || !progress || !user.selectedMode) return null;

  const modeData = roadmapData[user.selectedMode];
  if (!modeData) return <div>Roadmap data not found for this mode.</div>;

  const toggleTask = async (taskId, isCompleted) => {
    if (isCompleted) {
      await uncompleteTask(taskId);
    } else {
      await completeTask(taskId);
    }
    // Also handle day completion logic for day_based in a real app, 
    // for simplicity, we mock or allow user to mark day complete separately
  };

  const markDayComplete = async (dateStr) => {
    await api.post('/progress/complete-day', { date: dateStr });
    await fetchUserContext();
  };

  const renderTaskBased = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-text-primary">Your Roadmap</h1>
        <p className="text-text-secondary mt-1">Complete tasks at your own pace. Expand a week to view topics.</p>
      </div>

      <div className="space-y-4">
        {modeData.weeks.map((week) => (
          <div key={week.weekNumber} className="card p-0 overflow-hidden">
            <div 
              className="p-6 flex items-center justify-between cursor-pointer hover:bg-surface-2 transition-colors border-b border-border"
              onClick={() => setActiveWeek(activeWeek === week.weekNumber ? null : week.weekNumber)}
            >
              <div>
                <h3 className="text-lg font-bold text-text-primary">Week {week.weekNumber}: {week.title}</h3>
              </div>
              {activeWeek === week.weekNumber ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
            
            {activeWeek === week.weekNumber && (
              <div className="p-6 space-y-8 bg-background/50">
                {week.days.map(day => (
                  <div key={day.day}>
                    <h4 className="text-md font-mono font-bold text-accent mb-4">Topic: {day.title}</h4>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-3">
                        {day.tasks.map(task => (
                           <TaskItem 
                             key={task.id} 
                             task={task} 
                             isCompleted={progress.completedTaskIds.includes(task.id)}
                             toggleTask={toggleTask}
                           />
                        ))}
                      </div>
                      
                      <div className="bg-surface-2 border border-border rounded-md p-4 space-y-4 h-fit">
                        <div>
                           <h5 className="text-xs font-mono text-text-muted uppercase mb-2">Resources</h5>
                           <ul className="space-y-2">
                             {day.resources?.map((res, i) => (
                               <li key={i}>
                                 <a href={res.url} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline flex items-center gap-1">
                                    <ExternalLink className="w-3 h-3" /> {res.label}
                                 </a>
                               </li>
                             )) || <li className="text-xs text-text-muted">No specific resources</li>}
                           </ul>
                        </div>
                        {day.tools && day.tools.length > 0 && (
                          <div className="pt-4 border-t border-border mt-4">
                             <h5 className="text-xs font-mono text-text-muted uppercase mb-2">Tools</h5>
                             <div className="flex flex-wrap gap-2">
                               {day.tools.map(tool => (
                                  <span key={tool} className="text-xs font-mono bg-background px-2 py-1 border border-border rounded">{tool}</span>
                               ))}
                             </div>
                          </div>
                        )}
                        {day.tip && (
                           <div className="pt-4 border-t border-border mt-4">
                              <p className="text-xs italic text-text-secondary">💡 {day.tip}</p>
                           </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDayBased = () => {
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(selectedDate),
      end: endOfMonth(selectedDate)
    });

    const isDayCompleted = (date) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      return progress.completedDays.includes(dateStr);
    };

    const firstDayTasks = modeData.weeks[0].days[0]; // Simplified: mapping day logically is complex in a mock, we just show First Day task or empty
    
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-mono font-bold text-text-primary">Daily Calendar</h1>
          <p className="text-text-secondary mt-1">Complete all tasks assigned to the day to maintain your streak.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card h-fit md:col-span-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-mono">{format(selectedDate, 'MMMM yyyy')}</h3>
              <CalendarIcon className="w-5 h-5 text-accent" />
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono text-text-muted mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {daysInMonth.map(day => (
                <div 
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    aspect-square flex items-center justify-center rounded text-sm cursor-pointer border
                    ${isSameDay(day, selectedDate) ? 'border-accent text-accent font-bold bg-accent/10' : 'border-transparent text-text-secondary hover:border-border'}
                    ${isToday(day) && !isSameDay(day, selectedDate) ? 'bg-surface-2 border-border' : ''}
                  `}
                >
                  <div className="relative flex flex-col items-center justify-center w-full h-full">
                    <span>{format(day, 'd')}</span>
                    {isDayCompleted(day) && <div className="absolute bottom-1 w-1 h-1 bg-success rounded-full"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-bold border-b border-border pb-4">
              Tasks for {format(selectedDate, 'MMM d, yyyy')}
            </h3>
            
            {/* For simulation, we show Day 1's content if selectedDate is today of modeStartDate, else static */}
            <div className="space-y-4">
               {firstDayTasks ? firstDayTasks.tasks.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    isCompleted={progress.completedTaskIds.includes(task.id)}
                    toggleTask={toggleTask}
                  />
               )) : <p className="text-text-muted">No specific tasks scheduled for this day.</p>}
            </div>

            <div className="pt-6">
               <button 
                 onDoubleClick={() => markDayComplete(format(selectedDate, 'yyyy-MM-dd'))}
                 className="btn-outline w-full text-xs text-text-muted border-border border-dashed hover:border-success hover:text-success"
               >
                 Double click to forcefully mark day complete (Simulation)
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {user.learningStyle === 'day_based' ? renderDayBased() : renderTaskBased()}
    </div>
  );
};

export default Roadmap;
