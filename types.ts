export type CategoryId = 'all' | 'fruits' | 'vegetables' | 'dairy' | 'bakery';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  image: string;
  weightOptions: string[];
  isOrganic?: boolean;
  discount?: number; // percentage
}

export interface CartItem {
  product: Product;
  quantity: number;
  weightOption: string;
}
