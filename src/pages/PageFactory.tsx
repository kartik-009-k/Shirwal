import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { AnalyticsChart } from '../components/charts/AnalyticsChart';
import { categories, products, vendors } from '../data/mockData';
import { useAppStore, mockMetrics } from '../store/useAppStore';

export function PageFactory({ title, subtitle }: { title: string; subtitle: string }) {
  const add = useAppStore((s) => s.addToCart);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-24">
    <GlassCard><h1 className="text-2xl font-semibold">{title}</h1><p className="text-slate-300">{subtitle}</p></GlassCard>
    <div className="grid gap-4 md:grid-cols-3">{vendors.map(v=><GlassCard key={v.id}><p className="text-neon-cyan">{v.category}</p><h3 className="font-medium">{v.name}</h3><p className="text-sm">⭐ {v.rating} • ETA {v.eta}</p><button className="mt-3 rounded-xl bg-cyan-500/20 px-3 py-1" onClick={()=>toggleFavorite(v.id)}>Favorite</button></GlassCard>)}</div>
    <div className="grid gap-4 md:grid-cols-2">{products.map(p=><GlassCard key={p.id}><h4>{p.name}</h4><p className="text-sm text-slate-300">{p.description}</p><div className="mt-2 flex items-center justify-between"><span>₹{p.price}</span><button onClick={()=>add(p.id)} className="rounded-xl bg-purple-500/20 px-3 py-1">Add</button></div></GlassCard>)}</div>
    <GlassCard><h3 className="mb-2">Top Categories in Shirwal</h3><div className="flex flex-wrap gap-2">{categories.map(c=><span key={c} className="rounded-full border border-white/20 px-3 py-1 text-xs">{c}</span>)}</div></GlassCard>
    <AnalyticsChart values={mockMetrics.dailyOrders} />
  </motion.div>;
}
