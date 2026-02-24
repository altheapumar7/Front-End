import React from 'react';

const StatCard = ({ title, value, color, icon }) => {
 
  const colorConfig = {
    blue: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-l-blue-600' },
    indigo: { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-l-indigo-600' },
    green: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-l-green-600' },
    orange: { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-l-orange-600' }
  };

  const selectedColor = colorConfig[color] || colorConfig.blue;

  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${selectedColor.border} border-l-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2 group-hover:text-gray-500 transition-colors">
            {title}
          </p>
          <p className={`text-4xl font-black tracking-tight ${selectedColor.text}`}>
            {value}
          </p>
        </div>
        
       
        <div className={`p-3 rounded-xl ${selectedColor.bg} ${selectedColor.text} transition-transform group-hover:scale-110`}>
          {icon || (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          )}
        </div>
      </div>
      
     
      <div className="mt-4 flex items-center text-[10px] font-bold text-gray-400">
        <span className="text-green-500 mr-1 font-black uppercase">Updated</span> 
        just now
      </div>
    </div>
  );
};

export default StatCard;