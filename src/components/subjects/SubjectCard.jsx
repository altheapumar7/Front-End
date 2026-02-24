import React from 'react';

const SubjectCard = ({ subject, onClick }) => {
  const getBadgeColor = (type) => {
    if (type === 'Per Semester') return 'bg-blue-100 text-blue-700';
    if (type === 'Per Term') return 'bg-purple-100 text-purple-700';
    return 'bg-orange-100 text-orange-700';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold text-blue-600 font-mono tracking-wider">
          {subject.code}
        </span>
        <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase ${getBadgeColor(subject.offer)}`}>
          {subject.offer}
        </span>
      </div>
      
      <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
        {subject.title}
      </h3>
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span>{subject.units} Units</span>
        </div>
        <div className="italic">
          {subject.sem}
        </div>
      </div>
      
      {subject.pre && (
        <div className="mt-3 pt-3 border-t border-dashed text-[11px] text-gray-400">
          Requires: <span className="text-gray-600 font-semibold">{subject.pre}</span>
        </div>
      )}
    </div>
  );
};

export default SubjectCard;