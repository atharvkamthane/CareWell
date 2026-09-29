import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ageDistribution, diseaseDistribution, monthlyCases, regionalDistribution, trendComparison, type AnalyticsFilters } from '../../data/analytics';

const axis = { fontSize: 11, fill: '#76858a' };
const grid = '#edf1f0';
const tooltipStyle = { border: '1px solid #e4eae8', borderRadius: 10, boxShadow: '0 8px 24px rgba(26,54,59,.09)', fontSize: 12 };
const diseaseSeries = [
  { name: 'Dengue', key: 'dengue', color: '#167c73' },
  { name: 'Malaria', key: 'malaria', color: '#d39b4b' },
  { name: 'Influenza', key: 'influenza', color: '#7186a0' },
  { name: 'Diabetes', key: 'diabetes', color: '#9a79a8' },
  { name: 'Hypertension', key: 'hypertension', color: '#89a79f' },
] as const;
const nationalTotal = diseaseDistribution.reduce((sum, item) => sum + item.value, 0);
const monthsFor = <T extends { month: string }>(rows: T[], period: string): T[] => period === 'Last 30 days' ? rows.slice(-1) : period === 'Last 90 days' ? rows.slice(-3) : rows;
const diseaseTotal = (key: string) => monthlyCases.reduce((sum, item) => sum + (item[key as keyof typeof item] as number), 0);
const periodShare = (key: string, period: string) => {
  const total = diseaseTotal(key);
  return total ? monthsFor(monthlyCases, period).reduce((sum, item) => sum + (item[key as keyof typeof item] as number), 0) / total : 1;
};
const ageShare = (ageGroup: string) => ageGroup === 'All ages' ? 1 : (ageDistribution.find((entry) => entry.group === ageGroup)?.count ?? nationalTotal) / nationalTotal;
const overallPeriodShare = (period: string) => { const base = monthlyCases.reduce((sum, month) => sum + diseaseSeries.reduce((inner, item) => inner + month[item.key], 0), 0); return base ? monthsFor(monthlyCases, period).reduce((sum, month) => sum + diseaseSeries.reduce((inner, item) => inner + month[item.key], 0), 0) / base : 1; };
const regionShare = (region: string) => {
  if (region === 'All regions') return 1;
  const selected = regionalDistribution.find((entry) => entry.region === region);
  const total = selected ? diseaseSeries.reduce((sum, item) => sum + selected[item.key], 0) : nationalTotal;
  return total / nationalTotal;
};
const distributionValue = (key: string, filters: AnalyticsFilters) => {
  const national = diseaseDistribution.find((entry) => diseaseSeries.find((series) => series.name === entry.name)?.key === key)?.value ?? 0;
  const regional = filters.region === 'All regions' ? national : regionalDistribution.find((entry) => entry.region === filters.region)?.[key as 'dengue' | 'malaria' | 'influenza' | 'diabetes' | 'hypertension'] ?? 0;
  return Math.round(regional * ageShare(filters.ageGroup) * periodShare(key, filters.period));
};

/** These are illustrative, pre-aggregated synthetic fixtures; filter cross-sections never use patient-level records. */
export function CasesOverTimeChart({ filters }: { filters: AnalyticsFilters }) {
  const series = filters.disease === 'All diseases' ? diseaseSeries : diseaseSeries.filter((item) => item.name === filters.disease);
  const data = monthsFor(monthlyCases, filters.period).map((month) => Object.fromEntries([
    ['month', month.month],
    ...series.map((item) => [item.key, Math.round(month[item.key] * regionShare(filters.region) * ageShare(filters.ageGroup))]),
  ]));
  return <div className="chart-area" role="img" aria-label="Monthly synthetic disease case trends for the selected reporting period, region, disease, and age group"><ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}><CartesianGrid stroke={grid} vertical={false} /><XAxis dataKey="month" tick={axis} axisLine={false} tickLine={false} /><YAxis tick={axis} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} /><Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />{series.map((item, index) => <Line key={item.key} type="monotone" dataKey={item.key} name={item.name} stroke={item.color} strokeWidth={2.3} dot={false} activeDot={{ r: 4 }} animationDuration={900 + index * 160} />)}</LineChart></ResponsiveContainer></div>;
}

export function DiseaseDistributionChart({ filters }: { filters: AnalyticsFilters }) {
  const selected = filters.disease === 'All diseases' ? diseaseSeries : diseaseSeries.filter((item) => item.name === filters.disease);
  const data = selected.map((item) => ({ name: item.name, value: distributionValue(item.key, filters), color: item.color }));
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  return <div className="donut-chart-wrap"><div className="chart-area chart-donut" role="img" aria-label="Aggregate disease category mix scoped to current filters"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="63%" outerRadius="88%" paddingAngle={3} stroke="#fff" strokeWidth={3} animationDuration={950}>{data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [value.toLocaleString(), name]} /></PieChart></ResponsiveContainer></div><div className="donut-center"><strong>{total.toLocaleString()}</strong><span>synthetic cases</span></div><div className="donut-legend">{data.map((entry) => <div key={entry.name}><i style={{ background: entry.color }} /><span>{entry.name}</span><strong>{total ? `${((entry.value / total) * 100).toFixed(0)}%` : '—'}</strong></div>)}</div></div>;
}

export function RegionalChart({ filters }: { filters: AnalyticsFilters }) {
  const base = filters.region === 'All regions' ? regionalDistribution : regionalDistribution.filter((item) => item.region === filters.region);
  const selected = filters.disease === 'All diseases' ? diseaseSeries : diseaseSeries.filter((item) => item.name === filters.disease);
  const data = base.map((entry) => Object.fromEntries([
    ['region', entry.region],
    ...selected.map((item) => [item.key, Math.round(entry[item.key] * ageShare(filters.ageGroup) * periodShare(item.key, filters.period))]),
  ]));
  return <div className="chart-area" role="img" aria-label="Synthetic aggregate disease case categories for the selected filters"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}><CartesianGrid stroke={grid} vertical={false} /><XAxis dataKey="region" tick={axis} axisLine={false} tickLine={false} interval={0} /><YAxis tick={axis} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} /><Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />{selected.map((item, index) => <Bar key={item.key} dataKey={item.key} name={item.name} fill={item.color} radius={[4, 4, 0, 0]} animationDuration={800 + index * 130} />)}</BarChart></ResponsiveContainer></div>;
}

export function AgeGroupChart({ filters }: { filters: AnalyticsFilters }) {
  const base = filters.ageGroup === 'All ages' ? ageDistribution : ageDistribution.filter((item) => item.group === filters.ageGroup);
  const data = base.map((entry) => {
    const diseaseShare = filters.disease === 'All diseases' ? 1 : (diseaseDistribution.find((item) => item.name === filters.disease)?.value ?? nationalTotal) / nationalTotal;
    return { ...entry, count: Math.round(entry.count * regionShare(filters.region) * diseaseShare * overallPeriodShare(filters.period)) };
  });
  return <div className="chart-area chart-short" role="img" aria-label="Synthetic aggregate reports for the selected age band and analytics filters"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 6, right: 10, left: -15, bottom: 0 }}><CartesianGrid stroke={grid} vertical={false} /><XAxis dataKey="group" tick={axis} axisLine={false} tickLine={false} /><YAxis tick={axis} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} /><Bar dataKey="count" name="Aggregated reports" fill="#5e9a90" radius={[5, 5, 0, 0]} animationDuration={900}>{data.map((entry, index) => <Cell key={entry.group} fill={index === 2 ? '#167c73' : '#a9c8c2'} />)}</Bar></BarChart></ResponsiveContainer></div>;
}

export function TrendComparisonChart({ filters }: { filters: AnalyticsFilters }) {
  const base = filters.disease === 'All diseases' ? diseaseSeries : diseaseSeries.filter((item) => item.name === filters.disease);
  const data = monthsFor(trendComparison, filters.period);
  return <div className="chart-area chart-short" role="img" aria-label="Relative national disease trend index for the selected disease and reporting period; regional and age filters scope the count charts"><ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}><CartesianGrid stroke={grid} vertical={false} /><XAxis dataKey="month" tick={axis} axisLine={false} tickLine={false} /><YAxis tick={axis} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} /><Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />{base.map((item, index) => <Line key={item.key} type="monotone" dataKey={item.key} name={`${item.name} index`} stroke={item.color} strokeWidth={2.3} dot={false} animationDuration={900 + index * 160} />)}</LineChart></ResponsiveContainer></div>;
}
export function RegionIndexVisual({ filters }: { filters: AnalyticsFilters }) {
  const data = filters.region === 'All regions' ? regionalDistribution : regionalDistribution.filter((item) => item.region === filters.region);
  return <div className="region-index-list">{data.map((item, index) => <div className="region-index-row" key={item.region}><div className="region-index-rank">0{index + 1}</div><div className="region-index-name"><strong>{item.region}</strong><span>Regional reporting index</span></div><div className="region-index-track"><i style={{ width: `${item.index}%` }} /></div><strong className="region-index-value">{item.index}</strong></div>)}</div>;
}
