export type Role = 'customer' | 'vendor' | 'admin';
export interface Vendor { id: string; name: string; category: string; rating: number; eta: string; }
export interface Product { id: string; vendorId: string; name: string; price: number; description: string; }
