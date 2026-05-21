import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <motion.div whileHover={{ y: -3, scale: 1.01 }} className={`glass p-4 ${className}`}>{children}</motion.div>;
}
