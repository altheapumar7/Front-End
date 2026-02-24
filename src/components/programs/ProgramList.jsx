import React from 'react';
import ProgramCard from './ProgramCard'; 

const ProgramList = ({ programs, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map(p => (
        <ProgramCard key={p.id} program={p} onClick={() => onViewDetails(p)} />
      ))}
    </div>
  );
};

export default ProgramList;