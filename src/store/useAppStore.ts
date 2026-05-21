import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products, vendors } from '../data/mockData';
import type { Role } from '../types';

type AppState = {
  role: Role;
  favorites: string[];
  cart: { productId: string; qty: number }[];
  notifications: string[];
  setRole: (role: Role) => void;
  toggleFavorite: (id: string) => void;
  addToCart: (id: string) => void;
};

export const useAppStore = create<AppState>()(persist((set) => ({
  role: 'customer', favorites: [], cart: [],
  notifications: ['Welcome to Shirwal Connect.','New vendor approved in Shirwal Bazaar.'],
  setRole: (role) => set({ role }),
  toggleFavorite: (id) => set((s) => ({ favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [...s.favorites, id] })),
  addToCart: (id) => set((s) => {
    const existing = s.cart.find((c) => c.productId === id);
    return { cart: existing ? s.cart.map((c) => c.productId === id ? { ...c, qty: c.qty + 1 } : c) : [...s.cart, { productId: id, qty: 1 }] };
  }),
}), { name: 'shirwal-connect-store', partialize: (s) => ({ role: s.role, favorites: s.favorites, cart: s.cart }) }));

export const mockMetrics = { vendors, products, dailyOrders: [22,34,27,45,39,56,62] };
