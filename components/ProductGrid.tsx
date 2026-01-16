import React, { useState } from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number, weightOption: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, weightOption: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[0]);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate price if necessary, for now assuming price is base price. 
  // Real apps might change price based on weight option.
  const currentPrice = product.price;

  return (
    <div 
      className="product-card bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.discount && (
        <div className="absolute top-3 left-3 z-10 bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
          {product.discount}% OFF
        </div>
      )}
      
      {product.isOrganic && (
         <div className="absolute top-3 right-3 z-10 bg-green-100 text-brand-green border border-green-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          Organic
        </div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Quick Add Button that appears on hover (desktop) */}
        <div className={`absolute bottom-3 right-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}>
          <button 
            onClick={() => onAddToCart(product, 1, selectedWeight)}
            className="bg-white text-brand-green p-2 rounded-full shadow-lg hover:bg-brand-green hover:text-white transition-colors"
            aria-label="Quick Add"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-slate-800 text-lg leading-tight">{product.name}</h3>
        </div>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-slate-900">${currentPrice.toFixed(2)}</span>
          {product.discount && (
             <span className="text-sm text-slate-400 line-through">${(currentPrice * (1 + product.discount/100)).toFixed(2)}</span>
          )}
        </div>

        <div className="mt-auto space-y-3">
          <div className="weight-selector relative">
             <select 
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-1.5 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
            >
              {product.weightOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 hover:bg-white text-slate-500 transition-colors"
              >-</button>
              <span className="px-1 text-sm font-medium w-6 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 hover:bg-white text-slate-500 transition-colors"
              >+</button>
            </div>
            <button 
              onClick={() => {
                onAddToCart(product, quantity, selectedWeight);
                setQuantity(1); // Reset after add
              }}
              className="flex-1 bg-brand-dark text-white py-1.5 rounded-lg text-sm font-medium hover:bg-brand-green active:scale-95 transition-all shadow-sm"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
