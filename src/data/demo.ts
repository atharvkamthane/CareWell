export type Role = 'patient' | 'clinician' | 'administrator';

export type Visit = {
  id: string;
  date: string;
  clinic: string;
  doctor: string;
  reason: string;
  diagnosis: string;
  notes: string;
  kind: string;
};

export type Prescription = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribed: string;
  status: 'Active' | 'Completed';
};

export type Report = { id: string; title: string; category: string; date: string; result: string; status: 'Reviewed' | 'Ready' };

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  emergencyContact: string;
  region: string;
  conditions: string[];
  allergies: string[];
  risk: 'Routine' | 'Review' | 'Monitor';
};

export const demoPatient: Patient = {
  id: 'P-20481', name: 'Rahul Mehta', age: 34, gender: 'Male', bloodGroup: 'O+',
  emergencyContact: 'Meera Mehta · +91 90000 01001', region: 'Pune',
  conditions: ['Seasonal allergic rhinitis', 'Vitamin D insufficiency'],
  allergies: ['Penicillin'], risk: 'Review',
};

export const patients: Patient[] = [
  demoPatient,
  { id: 'P-20482', name: 'Ananya Rao', age: 29, gender: 'Female', bloodGroup: 'A+', emergencyContact: 'Dev Rao · +91 90000 01002', region: 'Mumbai', conditions: ['Migraine'], allergies: ['None recorded'], risk: 'Routine' },
  { id: 'P-20483', name: 'Ishaan Kulkarni', age: 42, gender: 'Male', bloodGroup: 'B+', emergencyContact: 'Nisha Kulkarni · +91 90000 01003', region: 'Nagpur', conditions: ['Hypertension'], allergies: ['Sulfa drugs'], risk: 'Monitor' },
  { id: 'P-20484', name: 'Mira Desai', age: 51, gender: 'Female', bloodGroup: 'AB+', emergencyContact: 'Aarav Desai · +91 90000 01004', region: 'Nashik', conditions: ['Type 2 diabetes'], allergies: ['None recorded'], risk: 'Review' },
  { id: 'P-20485', name: 'Arjun Patil', age: 37, gender: 'Male', bloodGroup: 'O−', emergencyContact: 'Kavya Patil · +91 90000 01005', region: 'Aurangabad', conditions: ['Asthma'], allergies: ['Pollen'], risk: 'Routine' },
  { id: 'P-20486', name: 'Tara Shah', age: 63, gender: 'Female', bloodGroup: 'B−', emergencyContact: 'Rohan Shah · +91 90000 01006', region: 'Pune', conditions: ['Hypertension', 'Osteoarthritis'], allergies: ['None recorded'], risk: 'Monitor' },
  { id: 'P-20487', name: 'Kabir Joshi', age: 24, gender: 'Male', bloodGroup: 'A−', emergencyContact: 'Asha Joshi · +91 90000 01007', region: 'Mumbai', conditions: ['Seasonal influenza'], allergies: ['None recorded'], risk: 'Routine' },
  { id: 'P-20488', name: 'Leela Nair', age: 46, gender: 'Female', bloodGroup: 'O+', emergencyContact: 'Kiran Nair · +91 90000 01008', region: 'Nagpur', conditions: ['Hypothyroidism'], allergies: ['Latex'], risk: 'Review' },
  { id: 'P-20489', name: 'Vihaan Joshi', age: 58, gender: 'Male', bloodGroup: 'AB−', emergencyContact: 'Sana Joshi · +91 90000 01009', region: 'Nashik', conditions: ['Type 2 diabetes'], allergies: ['None recorded'], risk: 'Monitor' },
  { id: 'P-20490', name: 'Sana Khan', age: 32, gender: 'Female', bloodGroup: 'A+', emergencyContact: 'Irfan Khan · +91 90000 01010', region: 'Aurangabad', conditions: ['Dengue (recovered)'], allergies: ['None recorded'], risk: 'Routine' },
  { id: 'P-20491', name: 'Dev Malhotra', age: 71, gender: 'Male', bloodGroup: 'B+', emergencyContact: 'Maya Malhotra · +91 90000 01011', region: 'Pune', conditions: ['Hypertension', 'Type 2 diabetes'], allergies: ['Penicillin'], risk: 'Monitor' },
  { id: 'P-20492', name: 'Nila Sane', age: 19, gender: 'Female', bloodGroup: 'O−', emergencyContact: 'Anil Sane · +91 90000 01012', region: 'Mumbai', conditions: ['Iron deficiency'], allergies: ['None recorded'], risk: 'Routine' },
];

export const visits: Visit[] = [
  { id: 'V-3108', date: '12 Sep 2026', clinic: 'Aster Grove Clinic', doctor: 'Dr. Kavita Sharma', reason: 'General consultation', diagnosis: 'Seasonal allergic rhinitis', notes: 'Symptoms improving. Continue hydration and avoid known seasonal triggers.', kind: 'Consultation' },
  { id: 'V-3041', date: '03 Aug 2026', clinic: 'Aster Grove Clinic', doctor: 'Dr. Neel Deshmukh', reason: 'Routine blood panel', diagnosis: 'Vitamin D insufficiency', notes: 'Vitamin D below reference range; follow-up advised in six weeks.', kind: 'Lab report' },
  { id: 'V-2960', date: '18 Jul 2026', clinic: 'Aster Grove Clinic', doctor: 'Dr. Kavita Sharma', reason: 'Follow-up consultation', diagnosis: 'Allergic rhinitis', notes: 'No acute respiratory symptoms reported.', kind: 'Follow-up' },
  { id: 'V-2882', date: '21 May 2026', clinic: 'Riverside Family Health', doctor: 'Dr. Devika Rao', reason: 'Annual preventive visit', diagnosis: 'Preventive screening', notes: 'Routine screening reviewed; no urgent findings.', kind: 'Preventive' },
];

export const prescriptions: Prescription[] = [
  { id: 'RX-8720', medication: 'Cetirizine', dosage: '10 mg', frequency: 'Once daily as needed', duration: '14 days', prescribed: '12 Sep 2026', status: 'Active' },
  { id: 'RX-8044', medication: 'Vitamin D3', dosage: '60,000 IU', frequency: 'Once weekly', duration: '6 weeks', prescribed: '03 Aug 2026', status: 'Active' },
  { id: 'RX-7723', medication: 'Saline nasal spray', dosage: '0.65%', frequency: 'Two sprays as needed', duration: '7 days', prescribed: '18 Jul 2026', status: 'Completed' },
];

export const reports: Report[] = [
  { id: 'R-5503', title: 'Complete blood count', category: 'Blood test', date: '03 Aug 2026', result: 'Within expected range', status: 'Reviewed' },
  { id: 'R-5498', title: 'Vitamin D, 25-OH', category: 'Blood test', date: '03 Aug 2026', result: 'Below reference range', status: 'Reviewed' },
  { id: 'R-5270', title: 'Lipid profile', category: 'Blood test', date: '21 May 2026', result: 'No significant findings', status: 'Reviewed' },
  { id: 'R-5181', title: 'Chest radiograph', category: 'Imaging', date: '18 Jul 2026', result: 'No acute findings', status: 'Ready' },
];

export const clinicians = [
  { name: 'Dr. Kavita Sharma', specialty: 'Primary care', clinic: 'Aster Grove Clinic', seen: '12 patients today' },
  { name: 'Dr. Neel Deshmukh', specialty: 'Internal medicine', clinic: 'Aster Grove Clinic', seen: '9 patients today' },
  { name: 'Dr. Devika Rao', specialty: 'Family medicine', clinic: 'Riverside Family Health', seen: '8 patients today' },
];

export const auditEvents = [
  { time: '10:42', user: 'Dr. Sharma', role: 'Clinician', action: 'Patient record accessed', result: 'Authorized' },
  { time: '10:44', user: 'Admin', role: 'Administrator', action: 'Disease analytics viewed', result: 'Authorized' },
  { time: '10:49', user: 'Unknown', role: '—', action: 'Patient API requested', result: 'Rejected' },
  { time: '11:02', user: 'Dr. Neel Deshmukh', role: 'Clinician', action: 'QR reference validated', result: 'Authorized' },
  { time: '11:18', user: 'Public health team', role: 'Administrator', action: 'Regional trends exported', result: 'Authorized' },
  { time: '11:36', user: 'Unknown', role: '—', action: 'Repeated sign-in attempt', result: 'Rejected' },
];

export const appointments = [
  { time: '09:30', patient: 'Demo patient · P-20482', reason: 'Follow-up review', clinic: 'Aster Grove Clinic' },
  { time: '11:00', patient: 'Demo patient · P-20485', reason: 'Respiratory consultation', clinic: 'Riverside Family Health' },
  { time: '14:15', patient: 'Demo patient · P-20489', reason: 'Medication review', clinic: 'Aster Grove Clinic' },
];
