import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
// The import for CategoryId is removed because it is a type and not used at runtime in JavaScript.

export const GrocerySidebar = ({ activeCategory, onSelectCategory }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="grocery-sidebar h-full flex flex-col">
       <div className="mb-6 hidden lg:block">
         <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Departments</h3>
       </div>

      <nav className="space-y-1">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                category-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                ${isActive ? 'bg-brand-light text-brand-dark font-medium shadow-sm ring-1 ring-brand-green/20' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{category.icon}</span>
              <span className="text-sm">{category.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-green" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-100 hidden lg:block">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Filters</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green" />
            <span className="text-sm text-slate-600 group-hover:text-slate-900">Organic Only</span>
          </label>
           <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green" />
            <span className="text-sm text-slate-600 group-hover:text-slate-900">On Sale</span>
          </label>
           <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green" />
            <span className="text-sm text-slate-600 group-hover:text-slate-900">Local Grown</span>
          </label>
        </div>
      </div>

      <div className="mt-auto pt-6 pb-6 hidden lg:block">
        <div className="bg-gradient-to-br from-brand-accent/10 to-orange-100 p-4 rounded-xl border border-orange-200/50">
          <p className="text-xs font-bold text-brand-accent uppercase mb-1">Free Delivery</p>
          <p className="text-sm text-slate-700 leading-snug">On your first order of $50+</p>
          <button className="mt-3 text-xs font-bold text-brand-accent hover:underline">Learn more</button>
        </div>
      </div>
    </div>
  );
};
