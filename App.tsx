import React, { useState, useMemo } from 'react';
import { GrocerySidebar } from './components/GrocerySidebar';
import { ProductGrid } from './components/ProductGrid';
import { WeeklyDeals } from './components/WeeklyDeals';
import { CartSummary } from './components/CartSummary';
import { Product, CartItem, CategoryId } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter products based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Cart Handlers
  const addToCart = (product: Product, quantity: number, weightOption: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.weightOption === weightOption
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.weightOption === weightOption
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, weightOption }];
    });
  };

  const removeFromCart = (productId: string, weightOption: string) => {
    setCartItems((prev) => prev.filter(item => !(item.product.id === productId && item.weightOption === weightOption)));
  };

  const updateQuantity = (productId: string, weightOption: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId && item.weightOption === weightOption) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center text-white font-bold">FM</div>
              <h1 className="text-xl font-bold tracking-tight text-brand-dark">FreshMarket</h1>
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <input 
              type="text" 
              placeholder="Search for apples, organic milk..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
            />
            <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>

          <div className="flex items-center gap-4">
             <button className="text-sm font-medium text-slate-600 hover:text-brand-green transition-colors">Log In</button>
             <button className="bg-brand-dark text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-green transition-colors shadow-sm">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex max-w-[1600px] mx-auto w-full items-start pt-6">
        
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky lg:top-20 z-40 lg:z-0 top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white lg:bg-transparent border-r lg:border-none border-gray-200 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto px-4 pb-10
        `}>
          <GrocerySidebar 
            activeCategory={activeCategory} 
            onSelectCategory={(id) => {
              setActiveCategory(id);
              setIsMobileMenuOpen(false);
            }} 
          />
        </aside>

        {/* Backdrop for mobile sidebar */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Center Content */}
        <main className="flex-1 px-4 lg:px-8 pb-20 min-w-0">
          <WeeklyDeals />
          
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 capitalize">
                {activeCategory === 'all' ? 'All Products' : activeCategory}
              </h2>
              <span className="text-sm text-slate-500">{filteredProducts.length} items found</span>
            </div>
            
            <ProductGrid 
              products={filteredProducts} 
              onAddToCart={addToCart} 
            />
          </div>
        </main>

        {/* Right Sidebar - Cart */}
        <aside className="hidden xl:block w-80 sticky top-24 h-[calc(100vh-6rem)] pr-4">
          <CartSummary 
            items={cartItems} 
            onRemove={removeFromCart} 
            onUpdateQuantity={updateQuantity}
          />
        </aside>

        {/* Mobile Floating Cart Button */}
        <div className="xl:hidden fixed bottom-4 right-4 z-50">
             <button 
              className="bg-brand-dark text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
              onClick={() => alert("Mobile cart functionality would open a modal/drawer here.")} 
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="font-bold">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
             </button>
        </div>

      </div>
    </div>
  );
};

export default App;