import React from 'react';
import { MOCK_DATA } from '../../data/mockData'; 

const SubjectList = ({ subjects, onViewDetails }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Subject Code</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Title & Description</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Program</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Units</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Offering</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subjects.map(s => {
              const assignedProgram = MOCK_DATA.programs.find(p => p.id === s.pId);
              
              return (
                <tr key={s.id} className="hover:bg-blue-50/30 transition-all group">
                  {/* Code with Mono font and subtle background */}
                  <td className="px-8 py-5">
                    <span className="font-mono font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-sm">
                      {s.code}
                    </span>
                  </td>
                  
                  {/* Title with better weight */}
                  <td className="px-8 py-5">
                    <p className="text-slate-800 font-black text-sm group-hover:text-blue-700 transition-colors">
                      {s.title}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">Core Curriculum</p>
                  </td>
                  
                  {/* Program Badge */}
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black bg-slate-100 text-slate-500 uppercase">
                      {assignedProgram ? assignedProgram.code : 'General'}
                    </span>
                  </td>

                  {/* Units with emphasis */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black text-slate-700">{s.units}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Units</span>
                    </div>
                  </td>

                  {/* Offering Badge (Requirement 3C) */}
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm ${
                      s.offer === 'Per Semester' 
                        ? 'bg-blue-600 text-white' 
                        : s.offer === 'Both'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-purple-500 text-white'
                    }`}>
                      {s.offer}
                    </span>
                  </td>

                  {/* Action Button - Styled as a real button */}
                  <td className="px-8 py-5 text-center">
                    <button 
                      onClick={() => onViewDetails(s)}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                    >
                      View Info
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectList;