import React from 'react';
import { Info } from 'lucide-react';
import { useStore } from '../store/useStore';

const Announcement = () => {
  const { announcements, dismissAnnouncement } = useStore();

  if (!announcements || announcements.length === 0) return null;

  return (
    <div className="space-y-4 mb-8">
      {announcements.map(ann => (
        <div key={ann._id} className="bg-surface-2 border-l-4 border-accent rounded-r-md rounded-l-sm p-4 flex items-start sm:items-center justify-between gap-4 shadow-sm border border-border border-l-accent">
          <div className="flex gap-3 items-start sm:items-center text-text-primary">
            <Info className="w-5 h-5 text-accent shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-sm leading-relaxed">{ann.message}</p>
          </div>
          <button 
            onClick={() => dismissAnnouncement(ann._id)}
            className="shrink-0 text-xs font-mono font-medium border border-accent text-accent px-3 py-1.5 rounded hover:bg-accent hover:text-white transition-colors"
          >
            Okay, got it
          </button>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
