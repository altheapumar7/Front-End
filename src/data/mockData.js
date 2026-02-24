export const MOCK_DATA = {
  programs: [
    { id: 'p1', code: 'BSIT', name: 'BS in Information Technology', type: "Bachelor's", duration: '4 Years', units: 140, status: 'Active', desc: 'Focuses on software and networking.' },
    { id: 'p2', code: 'BSCS', name: 'BS in Computer Science', type: "Bachelor's", duration: '4 Years', units: 142, status: 'Active', desc: 'Deep dive into algorithms and theory.' },
    { id: 'p3', code: 'DIT', name: 'Diploma in IT', type: 'Diploma', duration: '2 Years', units: 72, status: 'Phased Out', desc: 'Technical vocational course.' },
  ],
  subjects: [
    { id: 's1', pId: 'p1', code: 'IT101', title: 'Intro to Computing', units: 3, sem: '1st Semester', year: 1, pre: 'none', co: 'none', offer: 'Per Semester' },
    { id: 's2', pId: 'p1', code: 'IT102', title: 'Programming 1', units: 3, sem: '2nd Semester', year: 1, pre: 'IT101', co: 'none', offer: 'Both' },
    { id: 's3', pId: 'p1', code: 'IT201', title: 'Web Development', units: 3, sem: '1st Semester', year: 2, pre: 'IT102', co: 'IT202', offer: 'Per Semester' },
    { id: 's4', pId: 'p1', code: 'IT301', title: 'Networking', units: 3, sem: '1st Semester', year: 3, pre: 'IT101', co: 'none', offer: 'Per Term' },
    { id: 's5', pId: 'p2', code: 'CS201', title: 'Data Structures', units: 4, sem: '1st Semester', year: 2, pre: 'IT102', co: 'CS202', offer: 'Per Term' },
    { id: 's6', pId: 'p3', code: 'TECH101', title: 'Hardware Basics', units: 3, sem: '1st Semester', year: 1, pre: 'none', co: 'none', offer: 'Both' }
  ]
};

