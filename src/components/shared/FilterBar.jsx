import React from 'react';

const FilterBar = ({ onSearch, onFilterChange }) => {
  return (
    
    <div className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-300 shadow-xl flex flex-wrap items-center gap-6 mb-12">
      
      <div className="relative flex-1 min-w-[320px]">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
          <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="SEARCH NOW..." 
          className="w-full bg-slate-50 pl-12 pr-4 py-4 rounded-2xl border-4 border-slate-800 focus:border-blue-600 focus:bg-white outline-none text-lg font-black text-slate-900 placeholder:text-slate-400 shadow-inner"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <select 
        className="bg-white px-6 py-4 rounded-2xl border-4 border-slate-800 font-black uppercase text-sm cursor-pointer outline-none focus:border-blue-600"
        onChange={(e) => onFilterChange('semester', e.target.value)}
      >
        <option value="All">All Semesters</option>
        <option value="1st Semester">1st Sem</option>
        <option value="2nd Semester">2nd Sem</option>
      </select>
    </div>
  );
};

export default FilterBar;