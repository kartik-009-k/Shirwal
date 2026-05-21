import type { Product, Vendor } from '../types';

export const categories = ['Restaurants','Kirana','Medical','Salons','Electricians','Mechanics','Fertilizer','Dairy','Transport'];
export const vendors: Vendor[] = [
  { id:'v1', name:'Sahyadri Spice Kitchen', category:'Restaurants', rating:4.7, eta:'22 min' },
  { id:'v2', name:'Patil Kirana & Mart', category:'Kirana', rating:4.5, eta:'15 min' },
  { id:'v3', name:'Shivam Agro Inputs', category:'Fertilizer', rating:4.6, eta:'30 min' },
  { id:'v4', name:'Neon Cut Salon', category:'Salons', rating:4.8, eta:'18 min' },
];
export const products: Product[] = [
  { id:'p1', vendorId:'v1', name:'Kolhapuri Thali', price:220, description:'Spicy local thali with bhakri and solkadhi.' },
  { id:'p2', vendorId:'v2', name:'Premium Grocery Basket', price:799, description:'Rice, dal, spices and essentials for weekly stock.' },
  { id:'p3', vendorId:'v3', name:'Organic Soil Booster 10kg', price:480, description:'Balanced NPK blend for sugarcane and vegetable crops.' },
  { id:'p4', vendorId:'v4', name:'Signature Styling Session', price:349, description:'Haircut + beard + head massage.' }
];
