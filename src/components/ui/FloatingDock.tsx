import { Home, Search, Store, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FloatingDock(){
  const items = [{to:'/home',icon:<Home size={18}/>},{to:'/search',icon:<Search size={18}/>},{to:'/vendors',icon:<Store size={18}/>},{to:'/admin/dashboard',icon:<LayoutDashboard size={18}/>}];
  return <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2"><div className="glass flex gap-4 px-5 py-3">{items.map(i=><Link key={i.to} to={i.to}>{i.icon}</Link>)}</div></div>
}
