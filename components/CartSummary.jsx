import React, { useMemo } from 'react';
// The import for CartItem is removed because it is a type and not used at runtime in JavaScript.

export const CartSummary = ({ items, onRemove, onUpdateQuantity }) => {
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [items]);

  const deliveryFee = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-summary bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span>Shopping Cart</span>
          <span className="bg-brand-dark text-white text-xs py-0.5 px-2 rounded-full">{items.length}</span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-3">
             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl">🧺</div>
             <p>Your cart is empty.</p>
             <p className="text-sm">Start adding fresh items!</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={`${item.product.id}-${item.weightOption}`} className="cart-item flex gap-3 animate-fadeIn">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                   <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{item.product.name}</h4>
                   <p className="text-xs text-slate-500">{item.weightOption}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                   <div className="flex items-center border border-gray-200 rounded-md bg-white">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.weightOption, -1)}
                        className="px-2 py-0.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => onUpdateQuantity(item.product.id, item.weightOption, 1)}
                         className="px-2 py-0.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs"
                      >+</button>
                   </div>
                   <span className="text-sm font-semibold text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>

               <button 
                  onClick={() => onRemove(item.product.id, item.weightOption)}
                  className="text-slate-400 hover:text-red-500 self-start p-1"
                  aria-label="Remove item"
               >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
          ))
        )}
      </div>

      <div className="p-5 border-t border-gray-100 bg-slate-50">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? <span className="text-brand-green font-medium">Free</span> : `$${deliveryFee}`}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <button 
          className="w-full bg-brand-green text-white py-3 rounded-xl font-bold shadow-lg shadow-brand-green/20 hover:bg-brand-dark transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={items.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
