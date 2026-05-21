import { Bell, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

export function NavBar() {
  const cartCount = useAppStore((s) => s.cart.reduce((a, c) => a + c.qty, 0));
  return <header className="sticky top-0 z-20 p-3"><div className="glass mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
    <Link to="/" className="font-semibold text-neon-cyan">Shirwal Connect</Link>
    <nav className="flex items-center gap-3 text-sm"><Link to="/notifications"><Bell size={16}/></Link><Link to="/cart" className="flex gap-1"><ShoppingCart size={16}/>{cartCount}</Link><Link to="/profile"><User size={16}/></Link></nav>
  </div></header>;
}
