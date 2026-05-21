import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/ui/NavBar';
import { FloatingDock } from '../components/ui/FloatingDock';

export function AppLayout(){
  return <div className="gradient-bg min-h-screen"><NavBar/><main className="mx-auto max-w-6xl p-4"><Outlet/></main><FloatingDock/></div>
}
