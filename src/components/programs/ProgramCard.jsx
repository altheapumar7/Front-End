import React from 'react';

const ProgramCard = ({ program, onClick }) => {
  const isActive = program.status === 'Active';
  const isPhasedOut = program.status === 'Phased Out';

  // Dynamic Styles base sa status
  const getStatusStyles = () => {
    if (isActive) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (isPhasedOut) return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-slate-100 text-slate-500 border-slate-200';
  };

  const getAccentColor = () => {
    if (isActive) return 'bg-emerald-500';
    if (isPhasedOut) return 'bg-red-500';
    return 'bg-slate-300';
  };

  return (
    <div 
      onClick={onClick} 
      className="group relative cursor-pointer bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 overflow-hidden h-full"
    >
      {/* Sidebar Accent: Karon naay Red kung Phased Out */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getAccentColor()}`}></div>

      <div className="p-8">
        {/* Top Section: Tag and Status */}
        <div className="flex justify-between items-start mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider border border-slate-200">
            {program.code}
          </span>
          
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getStatusStyles()}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${getAccentColor()} ${isActive ? 'animate-pulse' : ''}`}></span>
            {program.status}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-8 min-h-[3rem]">
          {program.name}
        </h3>

        {/* Data Grid */}
        <div className="grid grid-cols-2 border-t border-slate-100 pt-6 gap-4">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
            <p className="text-sm font-bold text-slate-700">{program.duration}</p>
          </div>
          <div className="border-l border-slate-100 pl-4">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Credits</p>
            <p className="text-sm font-bold text-slate-700">{program.units} Units</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex items-center justify-between">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
            Explore Curriculum
          </span>
          <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;