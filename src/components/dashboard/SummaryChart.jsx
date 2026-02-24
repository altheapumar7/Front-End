import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const SummaryChart = ({ programs }) => {
  const activeCount = programs.filter(p => p.status === 'Active').length;
  const phasedOutCount = programs.filter(p => p.status === 'Phased Out').length;
  const reviewCount = programs.filter(p => p.status === 'Under Review').length;

  const data = [
    { name: 'Active', value: activeCount, color: '#2563eb' },
    { name: 'Phased Out', value: phasedOutCount, color: '#ef4444' },
    { name: 'Under Review', value: reviewCount, color: '#f59e0b' },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Data Analytics</h3>
          <p className="text-lg font-black text-gray-800">Program Status Distribution</p>
        </div>
        <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
          Live Updates
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="h-64 w-full md:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70} 
                outerRadius={90}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                ))}
              </Pie>
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ 
                  borderRadius: '15px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  padding: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{item.name}</span>
              </div>
              <span className="text-lg font-black text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryChart;