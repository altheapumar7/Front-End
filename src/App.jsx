import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  Search, 
  Clock, 
  Layers, 
  Info, 
  CheckCircle2 
} from 'lucide-react';
import StatCard from './components/dashboard/StatCard';
import ProgramList from './components/programs/ProgramList';
import SubjectList from './components/subjects/SubjectList';
import Modal from './components/shared/Modal';
import SummaryChart from './components/dashboard/SummaryChart';
import { MOCK_DATA } from './data/mockData';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  
  const stats = useMemo(() => ({
    totalPrograms: MOCK_DATA.programs.length,
    totalSubjects: MOCK_DATA.subjects.length,
    activePrograms: MOCK_DATA.programs.filter(p => p.status === 'Active').length,
    hasPreReq: MOCK_DATA.subjects.filter(s => s.pre).length
  }), []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
     
      <nav className="w-64 bg-slate-900 text-white p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tighter uppercase">EDUMANAGER</h1>
        </div>
        
        <div className="space-y-3">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
            { id: 'programs', label: 'Programs', icon: <GraduationCap size={20} /> },
            { id: 'subjects', label: 'Subjects', icon: <BookOpen size={20} /> }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setView(item.id); setSearchTerm(''); }}
              className={`w-full flex items-center gap-4 p-3.5 rounded-xl capitalize font-bold transition-all duration-200 ${
                view === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-black text-slate-800 capitalize tracking-tight">{view}</h2>
            {view !== 'dashboard' && (
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder={`Search ${view} by name or code...`}
                
                  className="pl-12 pr-6 py-3.5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm w-96 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium transition-all"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </header>

          {/* DASHBOARD VIEW */}
          {view === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Programs" value={stats.totalPrograms} color="blue" />
                <StatCard title="Total Subjects" value={stats.totalSubjects} color="indigo" />
                <StatCard title="Active Status" value={stats.activePrograms} color="green" />
                <StatCard title="With Pre-requisites" value={stats.hasPreReq} color="orange" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <div className="lg:col-span-2">
                  <SummaryChart programs={MOCK_DATA.programs} />
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest">Recent Activity</h3>
                  </div>
                  <ul className="space-y-3">
                    {MOCK_DATA.subjects.slice(0, 5).map(s => (
                      <li key={s.id} className="text-sm p-3 bg-slate-50 rounded-lg border-l-4 border-blue-500">
                        New Subject: <span className="font-bold text-slate-700">{s.code}</span> added to system
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* PROGRAMS VIEW */}
          {view === 'programs' && (
            <ProgramList 
              programs={MOCK_DATA.programs.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                p.code.toLowerCase().includes(searchTerm.toLowerCase())
              )} 
              onViewDetails={(p) => setSelectedItem({ ...p, type: 'program' })}
            />
          )}

          {/* SUBJECTS VIEW */}
          {view === 'subjects' && (
            <SubjectList 
              subjects={MOCK_DATA.subjects.filter(s => 
                s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                s.code.toLowerCase().includes(searchTerm.toLowerCase())
              )} 
              onViewDetails={(s) => setSelectedItem({ ...s, type: 'subject' })}
            />
          )}
        </div>
      </main>

      
      {selectedItem && (
        <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          title={selectedItem.name || selectedItem.title}
        >
          <div className="space-y-8 p-2">
            {/* 1. Header Grid for Code, Duration/Semester, and Units */}
            <div className="grid grid-cols-3 gap-6 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-600">
                  <Info size={14} />
                  <p className="text-[10px] font-black uppercase tracking-wider">Code</p>
                </div>
                <p className="font-black text-slate-800 text-lg">{selectedItem.code}</p>
              </div>
              <div className="space-y-1 border-x border-blue-100 px-6">
                <div className="flex items-center gap-2 text-blue-600">
                  <Clock size={14} />
                  <p className="text-[10px] font-black uppercase tracking-wider">
                    {selectedItem.type === 'program' ? 'Duration' : 'Semester'}
                  </p>
                </div>
                <p className="font-black text-slate-800 text-lg">
                  {selectedItem.duration || selectedItem.semester || '1st Sem'}
                </p>
              </div>
              <div className="space-y-1 pl-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Layers size={14} />
                  <p className="text-[10px] font-black uppercase tracking-wider">Total Units</p>
                </div>
                <p className="font-black text-slate-800 text-lg">
                  {selectedItem.totalCredits || selectedItem.units || '3'} Units
                </p>
              </div>
            </div>

            {/* 2. Full Description */}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Description</h4>
              <p className="text-slate-600 leading-relaxed text-sm italic">
                {selectedItem.description || "Detailed program description focused on student success and industry-standard training."}
              </p>
            </div>

            {/* 3. PROGRAM SPECIFIC: Year Level Curriculum */}
            {selectedItem.type === 'program' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest">Curriculum Overview</h4>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">Standard Track</span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((year, index) => {
                    const yearSubjects = MOCK_DATA.subjects.filter(s => s.year === index + 1 && s.programId === selectedItem.id);
                    return (
                      <div key={year} className="group p-4 bg-slate-50 hover:bg-white hover:shadow-md hover:border-blue-200 border border-slate-100 rounded-2xl transition-all">
                        <h5 className="text-[11px] font-black text-blue-500 mb-3 uppercase tracking-tighter">{year}</h5>
                        <ul className="space-y-2">
                          {yearSubjects.length > 0 ? yearSubjects.map(s => (
                            <li key={s.id} className="text-[10px] flex items-center justify-between text-slate-500 group-hover:text-slate-700">
                              <span className="font-black bg-slate-200 px-1.5 py-0.5 rounded text-[9px] mr-2 text-slate-600">{s.code}</span>
                              <span className="truncate flex-1 font-medium">{s.title}</span>
                            </li>
                          )) : (
                            <li className="text-[10px] text-slate-400 italic flex items-center gap-2">
                              <div className="w-1 h-1 bg-slate-300 rounded-full" /> No subjects assigned
                            </li>
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. SUBJECT SPECIFIC: Prerequisites & Assignment */}
            {selectedItem.type === 'subject' && (
              <div className="grid grid-cols-2 gap-8 pt-4 animate-in fade-in">
                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black text-blue-600 uppercase mb-2">Program Assignment</p>
                    <p className="text-sm font-black text-slate-800">
                      {MOCK_DATA.programs.find(p => p.id === selectedItem.programId)?.name || 'BS in Information Technology'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-500 uppercase mb-2 border-l-4 border-blue-500 pl-3">Pre-requisites</p>
                    <p className="text-sm font-bold text-slate-700 ml-3 capitalize">{selectedItem.pre || 'none'}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black text-blue-600 uppercase mb-2">Offering Term</p>
                    <p className="text-sm font-black text-slate-800">Per Semester Track</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-500 uppercase mb-2 border-l-4 border-blue-500 pl-3">Co-requisites</p>
                    <p className="text-sm font-bold text-slate-700 ml-3 capitalize">{selectedItem.co || 'none'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}