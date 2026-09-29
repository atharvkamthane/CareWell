import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { demoPatient, patients, prescriptions as seedPrescriptions, reports as seedReports, visits as seedVisits, type Prescription, type Report, type Visit } from '../data/demo';

interface DemoRecordState {
  visits: Record<string, Visit[]>;
  conditions: Record<string, string[]>;
  prescriptions: Record<string, Prescription[]>;
  reports: Record<string, Report[]>;
}
interface DemoRecordContextValue extends DemoRecordState {
  addVisit: (patientId: string, visit: Visit) => void;
  addDiagnosis: (patientId: string, diagnosis: string) => void;
  addPrescription: (patientId: string, prescription: Prescription) => void;
  addReport: (patientId: string, report: Report) => void;
}
const DemoRecordContext = createContext<DemoRecordContextValue | null>(null);

function baselineVisits(patientId: string): Visit[] {
  const patient = patients.find((entry) => entry.id === patientId);
  if (patientId === demoPatient.id) return seedVisits;
  if (!patient) return [];
  return seedVisits.slice(0, 2).map((visit) => ({ ...visit, diagnosis: patient.conditions[0] ?? visit.diagnosis }));
}
function baselinePrescriptions(patientId: string): Prescription[] {
  if (patientId === demoPatient.id) return seedPrescriptions;
  return patients.some((entry) => entry.id === patientId) ? seedPrescriptions.slice(0, 1) : [];
}
function baselineReports(patientId: string): Report[] {
  if (patientId === demoPatient.id) return seedReports;
  return patients.some((entry) => entry.id === patientId) ? seedReports.slice(0, 1) : [];
}

export function DemoRecordSessionProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<DemoRecordState>({ visits: {}, conditions: {}, prescriptions: {}, reports: {} });
  const addVisit = useCallback((patientId: string, visit: Visit) => {
    setRecords((current) => ({ ...current, visits: { ...current.visits, [patientId]: [visit, ...(current.visits[patientId] ?? baselineVisits(patientId))] } }));
  }, []);
  const addDiagnosis = useCallback((patientId: string, diagnosis: string) => {
    setRecords((current) => ({ ...current, conditions: { ...current.conditions, [patientId]: [...(current.conditions[patientId] ?? patients.find((entry) => entry.id === patientId)?.conditions ?? []), diagnosis] } }));
  }, []);
  const addPrescription = useCallback((patientId: string, prescription: Prescription) => {
    setRecords((current) => ({ ...current, prescriptions: { ...current.prescriptions, [patientId]: [prescription, ...(current.prescriptions[patientId] ?? baselinePrescriptions(patientId))] } }));
  }, []);
  const addReport = useCallback((patientId: string, report: Report) => {
    setRecords((current) => ({ ...current, reports: { ...current.reports, [patientId]: [report, ...(current.reports[patientId] ?? baselineReports(patientId))] } }));
  }, []);
  const value = useMemo(() => ({ ...records, addVisit, addDiagnosis, addPrescription, addReport }), [records, addVisit, addDiagnosis, addPrescription, addReport]);
  return <DemoRecordContext.Provider value={value}>{children}</DemoRecordContext.Provider>;
}

export function useDemoRecordSession() {
  const value = useContext(DemoRecordContext);
  if (!value) throw new Error('useDemoRecordSession must be used inside the application.');
  return value;
}
