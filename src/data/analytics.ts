export type AnalyticsFilters = { region: string; disease: string; ageGroup: string; period: string };

export const regions = ['Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Aurangabad'];
export const diseases = ['Dengue', 'Malaria', 'Influenza', 'Diabetes', 'Hypertension'];
export const ageGroups = ['All ages', '0–17', '18–34', '35–49', '50–64', '65+'];

export const monthlyCases = [
  { month: 'Apr', dengue: 118, malaria: 82, influenza: 201, diabetes: 164, hypertension: 189 },
  { month: 'May', dengue: 129, malaria: 76, influenza: 219, diabetes: 171, hypertension: 196 },
  { month: 'Jun', dengue: 159, malaria: 91, influenza: 205, diabetes: 183, hypertension: 207 },
  { month: 'Jul', dengue: 194, malaria: 116, influenza: 191, diabetes: 176, hypertension: 214 },
  { month: 'Aug', dengue: 210, malaria: 128, influenza: 223, diabetes: 189, hypertension: 221 },
  { month: 'Sep', dengue: 176, malaria: 105, influenza: 247, diabetes: 194, hypertension: 230 },
];

export const diseaseDistribution = [
  { name: 'Dengue', value: 986, color: '#167c73' },
  { name: 'Malaria', value: 598, color: '#74a69e' },
  { name: 'Influenza', value: 1286, color: '#d6a04f' },
  { name: 'Diabetes', value: 1077, color: '#6686a1' },
  { name: 'Hypertension', value: 1257, color: '#a4b7b2' },
];

export const regionalDistribution = [
  { region: 'Pune', dengue: 276, malaria: 142, influenza: 230, diabetes: 190, hypertension: 270, index: 82 },
  { region: 'Mumbai', dengue: 314, malaria: 167, influenza: 286, diabetes: 246, hypertension: 300, index: 91 },
  { region: 'Nagpur', dengue: 188, malaria: 153, influenza: 242, diabetes: 209, hypertension: 251, index: 64 },
  { region: 'Nashik', dengue: 121, malaria: 92, influenza: 262, diabetes: 197, hypertension: 215, index: 48 },
  { region: 'Aurangabad', dengue: 87, malaria: 44, influenza: 266, diabetes: 235, hypertension: 221, index: 37 },
];

export const ageDistribution = [
  { group: '0–17', count: 426 },
  { group: '18–34', count: 1184 },
  { group: '35–49', count: 1478 },
  { group: '50–64', count: 1327 },
  { group: '65+', count: 789 },
];

export const trendComparison = [
  { month: 'Apr', dengue: 100, malaria: 100, influenza: 100, diabetes: 100, hypertension: 100 },
  { month: 'May', dengue: 109, malaria: 93, influenza: 109, diabetes: 104, hypertension: 104 },
  { month: 'Jun', dengue: 135, malaria: 111, influenza: 102, diabetes: 112, hypertension: 110 },
  { month: 'Jul', dengue: 164, malaria: 141, influenza: 95, diabetes: 107, hypertension: 113 },
  { month: 'Aug', dengue: 178, malaria: 156, influenza: 111, diabetes: 115, hypertension: 117 },
  { month: 'Sep', dengue: 149, malaria: 128, influenza: 123, diabetes: 118, hypertension: 122 },
];

export const dashboardSummary = {
  totalCases: '5,204', monitored: '5', regions: '5', period: 'Apr – Sep 2026',
};

// Opaque synthetic cohort inputs used only for the suppression decision. Never render or tooltip these values.
const privateCohortSize: Record<string, number> = {
  'Nashik|Malaria|65+': 6,
  'Aurangabad|Dengue|18–34': 7,
  'Nagpur|Dengue|0–17': 8,
};

export function cohortIsSuppressed(filters: AnalyticsFilters): boolean {
  if (filters.region === 'All regions' || filters.disease === 'All diseases' || filters.ageGroup === 'All ages') return false;
  const key = `${filters.region}|${filters.disease}|${filters.ageGroup}`;
  return (privateCohortSize[key] ?? 18) < 10;
}

export const adminActivity = [
  { time: '10:44', action: 'Disease analytics viewed', actor: 'Public health team', outcome: 'Authorized' },
  { time: '10:31', action: 'Regional trend report generated', actor: 'Public health team', outcome: 'Authorized' },
  { time: '09:58', action: 'Analytics access policy checked', actor: 'System', outcome: 'Authorized' },
  { time: '09:16', action: 'Unrecognized analytics request', actor: 'Unknown', outcome: 'Rejected' },
];
