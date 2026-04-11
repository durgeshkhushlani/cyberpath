import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { roadmapData } from '../data/roadmap';
import { ChevronDown, ChevronUp, CheckCircle2, Circle, ExternalLink, Calendar as CalendarIcon, ArrowRight, ArrowLeft } from 'lucide-react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, isToday, parseISO, addDays, startOfDay, differenceInDays } from 'date-fns';
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

  const allDays = React.useMemo(() => {
    let daysList = [];
    if (modeData && modeData.weeks) {
      modeData.weeks.forEach(week => {
        if (week.days) daysList = [...daysList, ...week.days];
      });
    }
    return daysList;
  }, [modeData]);

  const toggleTask = async (taskId, isCompleted) => {
    if (isCompleted) {
      await uncompleteTask(taskId);
    } else {
      await completeTask(taskId);
    }
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
        {modeData.weeks.map((week, index) => {
          const isLastWeek = index === modeData.weeks.length - 1;
          
          return (
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
                    <h4 className="text-md font-mono font-bold text-accent mb-4">Day {day.day}: {day.title}</h4>
                    
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
                           <h5 className="text-xs font-mono text-text-muted uppercase mb-2">Content & Resources</h5>
                           <ul className="space-y-3">
                             {day.resources?.map((res, i) => (
                                <li key={i} className="flex flex-wrap gap-2 items-center justify-between bg-background p-2 rounded border border-border">
                                  <span className="text-sm font-medium text-text-primary max-w-[70%] truncate" title={res.label}>{res.label}</span>
                                  <a href={res.url} target="_blank" rel="noreferrer" className="btn btn-xs btn-outline border-accent text-accent hover:bg-accent hover:text-white flex items-center gap-1 shrink-0">
                                     <ExternalLink className="w-3 h-3" /> Visit
                                  </a>
                                </li>
                             )) || <li className="text-xs text-text-muted">No specific resources</li>}
                           </ul>
                        </div>
                        {day.tools && day.tools.length > 0 && (
                          <div className="pt-4 border-t border-border mt-4">
                             <h5 className="text-xs font-mono text-text-muted uppercase mb-2">Tools Needed</h5>
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
                
                {/* Advanced Task-Based Navigation Logic */}
                <div className="flex justify-end pt-4 border-t border-border mt-8">
                  {!isLastWeek ? (
                     <button 
                       onClick={(e) => {
                          e.stopPropagation();
                          setActiveWeek(week.weekNumber + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                       }}
                       className="btn btn-primary flex items-center gap-2"
                     >
                       Complete Week & Continue <ArrowRight className="w-4 h-4"/>
                     </button>
                  ) : (
                     <button className="btn btn-success flex items-center gap-2" disabled>
                       <CheckCircle2 className="w-4 h-4"/> Roadmap Complete!
                     </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )})}
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

    const userStartDate = user.createdAt ? startOfDay(parseISO(user.createdAt)) : startOfDay(new Date());
    const dayDifference = differenceInDays(startOfDay(selectedDate), userStartDate);
    const dayNumber = Math.max(1, dayDifference + 1);

    const currentDayTasks = allDays.find(d => d.day === dayNumber);
    
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
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  {currentDayTasks ? `Day ${currentDayTasks.day}: ${currentDayTasks.title}` : `Free Day`}
                </h3>
                <p className="text-sm text-text-muted">{format(selectedDate, 'MMMM do, yyyy')}</p>
              </div>
              <div className="flex items-center gap-2">
                 <button onClick={() => setSelectedDate(addDays(selectedDate, -1))} className="p-2 border border-border rounded hover:bg-surface-2" title="Previous Day"><ArrowLeft className="w-4 h-4"/></button>
                 <button onClick={() => setSelectedDate(addDays(selectedDate, 1))} className="p-2 border border-border rounded hover:bg-surface-2" title="Next Day"><ArrowRight className="w-4 h-4"/></button>
              </div>
            </div>
            
            <div className="space-y-4">
               {currentDayTasks && currentDayTasks.tasks.length > 0 ? (
                 <>
                   {currentDayTasks.tasks.map(task => (
                      <TaskItem 
                        key={task.id} 
                        task={task} 
                        isCompleted={progress.completedTaskIds.includes(task.id)}
                        toggleTask={toggleTask}
                      />
                   ))}
                   
                   {currentDayTasks.resources && currentDayTasks.resources.length > 0 && (
                      <div className="bg-surface-2 border border-border rounded-md p-4 mt-6">
                           <h5 className="text-xs font-mono text-text-muted uppercase mb-3">Today's Content</h5>
                           <ul className="space-y-3">
                             {currentDayTasks.resources.map((res, i) => (
                                <li key={i} className="flex flex-wrap gap-2 items-center justify-between bg-background p-2 rounded border border-border">
                                  <span className="text-sm font-medium text-text-primary max-w-[70%] truncate" title={res.label}>{res.label}</span>
                                  <a href={res.url} target="_blank" rel="noreferrer" className="btn btn-xs btn-outline border-accent text-accent hover:bg-accent hover:text-white flex items-center gap-1 shrink-0">
                                     <ExternalLink className="w-3 h-3" /> Visit
                                  </a>
                                </li>
                             ))}
                           </ul>
                      </div>
                   )}
                 </>
               ) : (
                 <div className="text-center py-12 border-2 border-dashed border-border rounded-md">
                    <p className="text-text-muted">No specific curriculum tasks scheduled for this day.</p>
                 </div>
               )}
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
