import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, GraduationCap, BookOpen, Search, 
  Clock, Layers, Info, CheckCircle2, LogOut,
  Sun, MessageCircle, Send, X,
  Users, ClipboardList, BarChart3, Settings 
} from 'lucide-react';

import StatCard from '../components/dashboard/StatCard';
import ProgramList from '../components/programs/ProgramList';
import SubjectList from '../components/subjects/SubjectList';
import Modal from '../components/shared/Modal';
import SummaryChart from '../components/dashboard/SummaryChart';
import { MOCK_DATA } from '../data/mockData';

export default function DashboardPage({ onLogout }) {
  const [view, setView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // --- WEATHER & CHAT STATES ---
  const [weather] = useState({ temp: 31, city: 'Tagum City', condition: 'Sunny' });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Hello! I am EduBot. How can I help you today?' }]);

  const stats = useMemo(() => ({
    totalPrograms: MOCK_DATA.programs.length,
    totalSubjects: MOCK_DATA.subjects.length,
    activePrograms: MOCK_DATA.programs.filter(p => p.status === 'Active').length,
    hasPreReq: MOCK_DATA.subjects.filter(s => s.pre).length
  }), []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMessages = [...messages, { role: 'user', text: chatInput }];
    setMessages(newMessages);
    setChatInput('');
    setTimeout(() => {
      setMessages([...newMessages, { role: 'bot', text: "I'm processing your request. Try asking about programs!" }]);
    }, 600);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 relative">
      
      {/* SIDEBAR */}
      <nav className="w-64 bg-slate-900 text-white p-6 shadow-xl flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase">ACAD PORTAL</h1>
        </div>
        
        {/* Updated Navigation Items */}
        <div className="space-y-2 flex-1 overflow-y-auto pr-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
            { id: 'programs', label: 'Programs', icon: <GraduationCap size={18} /> },
            { id: 'subjects', label: 'Subjects', icon: <BookOpen size={18} /> },
            { id: 'students', label: 'Students', icon: <Users size={18} /> },
            { id: 'enrollment', label: 'Enrollment', icon: <ClipboardList size={18} /> },
            { id: 'reports', label: 'Reports', icon: <BarChart3 size={18} /> },
            { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setView(item.id); setSearchTerm(''); }}
              className={`w-full flex items-center gap-4 p-3 rounded-xl font-bold transition-all text-sm ${
                view === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        <button 
          onClick={onLogout}
          className="mt-6 flex items-center gap-3 p-3 rounded-xl font-bold text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut size={20} /> Logout
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER WITH WEATHER */}
          <header className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-black text-slate-800 capitalize tracking-tight">{view}</h2>
              <p className="text-slate-400 text-sm font-bold mt-1">Academic Year 2025-2026</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Weather</p>
                  <p className="text-xs font-bold text-slate-700">{weather.city}</p>
                </div>
                <div className="h-8 w-[1px] bg-slate-100"></div>
                <div className="flex items-center gap-2">
                  <Sun className="text-orange-400" size={20} />
                  <span className="text-xl font-black text-slate-800">{weather.temp}°C</span>
                </div>
              </div>

              {/* Search shown for relevant views */}
              {['programs', 'subjects', 'students', 'enrollment'].includes(view) && (
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder={`Search ${view}...`}
                    className="pl-12 pr-6 py-3 rounded-2xl border-2 border-slate-200 bg-white w-72 outline-none focus:border-blue-500 transition-all text-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              )}
            </div>
          </header>

          {/* VIEW SWITCHER */}
          {view === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-6">
                <StatCard title="Total Programs" value={stats.totalPrograms} color="blue" />
                <StatCard title="Total Subjects" value={stats.totalSubjects} color="indigo" />
                <StatCard title="Active Status" value={stats.activePrograms} color="green" />
                <StatCard title="With Pre-reqs" value={stats.hasPreReq} color="orange" />
              </div>
              <div className="grid grid-cols-3 gap-6 mt-4">
                <div className="col-span-2">
                  <SummaryChart programs={MOCK_DATA.programs} />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                   <h3 className="font-bold text-slate-400 text-xs uppercase mb-4 tracking-widest">Recent Activity</h3>
                   <ul className="space-y-3">
                     {MOCK_DATA.subjects.slice(0, 4).map(s => (
                       <li key={s.id} className="text-[11px] p-3 bg-slate-50 rounded-lg border-l-4 border-blue-500 font-bold">
                         {s.code}: {s.title}
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
            </div>
          )}

          {view === 'programs' && (
            <ProgramList 
              programs={MOCK_DATA.programs.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))} 
              onViewDetails={(p) => setSelectedItem({ ...p, type: 'program' })}
            />
          )}

          {view === 'subjects' && (
            <SubjectList 
              subjects={MOCK_DATA.subjects.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()))} 
              onViewDetails={(s) => setSelectedItem({ ...s, type: 'subject' })}
            />
          )}

          {/* New Views Placeholders */}
          {['students', 'enrollment', 'reports', 'settings'].includes(view) && (
            <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-slate-200 text-center">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 {view === 'students' && <Users className="text-slate-300" size={40} />}
                 {view === 'enrollment' && <ClipboardList className="text-slate-300" size={40} />}
                 {view === 'reports' && <BarChart3 className="text-slate-300" size={40} />}
                 {view === 'settings' && <Settings className="text-slate-300" size={40} />}
              </div>
              <h3 className="text-xl font-bold text-slate-400 capitalize">{view} Management Coming Soon</h3>
              <p className="text-slate-400 text-sm mt-2">This module is currently under design development.</p>
            </div>
          )}
        </div>
      </main>

      {/* FLOATING CHATBOT */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="bg-white w-80 h-[400px] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-4">
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-sm uppercase">
                <MessageCircle size={18} /> EduBot
              </div>
              <button onClick={() => setIsChatOpen(false)}><X size={18} /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] font-bold ${
                    m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 shadow-sm rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex gap-2">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask..." className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-xs outline-none" />
              <button className="bg-blue-600 text-white p-2 rounded-xl"><Send size={14} /></button>
            </form>
          </div>
        ) : (
          <button onClick={() => setIsChatOpen(true)} className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"><MessageCircle size={24} /></button>
        )}
      </div>

      {/* MODAL SYSTEM */}
      {selectedItem && (
        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem.name || selectedItem.title}>
           <div className="space-y-6">
             <div className="grid grid-cols-3 gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
               <div>
                 <p className="text-[9px] font-bold text-blue-600 uppercase">Code</p>
                 <p className="text-sm font-black">{selectedItem.code}</p>
               </div>
               <div className="border-x border-slate-200 px-3">
                 <p className="text-[9px] font-bold text-blue-600 uppercase">
                    {selectedItem.type === 'program' ? 'Duration' : 'Term'}
                 </p>
                 <p className="text-sm font-black">{selectedItem.duration || selectedItem.semester || '1st Sem'}</p>
               </div>
               <div>
                 <p className="text-[9px] font-bold text-blue-600 uppercase">Units</p>
                 <p className="text-sm font-black">{selectedItem.units || selectedItem.totalCredits || '3'}</p>
               </div>
             </div>

             <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</p>
               <p className="text-xs text-slate-600 leading-relaxed italic">
                 {selectedItem.description || "No description provided for this record."}
               </p>
             </div>

             {selectedItem.type === 'program' && (
               <div className="space-y-3">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-1">Curriculum Structure</p>
                 <div className="grid grid-cols-2 gap-3">
                   {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((year) => (
                     <div key={year} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                       <p className="text-[9px] font-black text-blue-500 uppercase">{year}</p>
                       <p className="text-[8px] text-slate-400 font-bold mt-1 italic">Click to view subjects...</p>
                     </div>
                   ))}
                 </div>
               </div>
             )}

             {selectedItem.type === 'subject' && (
               <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                     <p className="text-[9px] font-black text-slate-400 uppercase">Pre-requisites</p>
                     <p className="text-xs font-bold text-blue-600">{selectedItem.pre || 'none'}</p>
                   </div>
                   <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                     <p className="text-[9px] font-black text-slate-400 uppercase">Co-requisites</p>
                     <p className="text-xs font-bold text-blue-600">{selectedItem.co || 'none'}</p>
                   </div>
                 </div>
                 <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                    <p className="text-[9px] font-black text-blue-600 uppercase">Program Assignment</p>
                    <p className="text-xs font-black text-slate-700">
                      {MOCK_DATA.programs.find(p => p.id === selectedItem.programId)?.name || 'General Education'}
                    </p>
                 </div>
               </div>
             )}

             <div className="pt-4 border-t flex gap-2">
               <button className="flex-1 py-2.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase rounded-xl hover:bg-slate-200 transition">Design Edit</button>
               <button className="flex-1 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition">Design Add</button>
             </div>
           </div>
        </Modal>
      )}
    </div>
  );
}