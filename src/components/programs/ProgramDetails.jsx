import React from 'react';

const ProgramDetails = ({ program, allSubjects, onClose }) => {
  
  const groupedSubjects = [1, 2, 3, 4].map(year => ({
    year,
    list: allSubjects.filter(s => s.pId === program.id && s.year === year)
  }));

  return (
    <div className="bg-white rounded-xl p-8 shadow-xl max-w-4xl w-full mx-auto">
      <div className="flex justify-between items-start mb-6 border-b pb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{program.name}</h2>
          <p className="text-blue-600 font-mono font-semibold">{program.code} • {program.duration}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {groupedSubjects.map(({ year, list }) => (
          <div key={year} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-700 mb-3 border-l-4 border-blue-500 pl-2">
              {year}{year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year
            </h3>
            {list.length > 0 ? (
              <ul className="space-y-2">
                {list.map(s => (
                  <li key={s.id} className="text-sm flex justify-between bg-white p-2 rounded shadow-sm">
                    <span>{s.title}</span>
                    <span className="text-gray-400">{s.units}u</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-400 italic">No subjects encoded for this year level.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramDetails;