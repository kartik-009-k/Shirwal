import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

export function AnalyticsChart({ values }: { values: number[] }) {
  const data = values.map((v, i) => ({ day: `D${i + 1}`, orders: v }));
  return <div className="glass h-64 p-4"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><XAxis dataKey="day" stroke="#94a3b8" /><Tooltip /><Line type="monotone" dataKey="orders" stroke="#22d3ee" strokeWidth={2} /></LineChart></ResponsiveContainer></div>;
}
