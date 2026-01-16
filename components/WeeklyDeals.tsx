import React, { useState, useEffect } from 'react';

export const WeeklyDeals: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 45, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev; // Expired (loop it if needed)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="weekly-deals relative w-full rounded-2xl overflow-hidden bg-brand-dark shadow-xl mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
         <svg className="h-full w-full" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
               <circle cx="2" cy="2" r="1" fill="currentColor" className="text-white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern-circles)" />
         </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 text-white">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="inline-block px-3 py-1 bg-brand-accent rounded-full text-xs font-bold uppercase tracking-wider text-white mb-2 shadow-sm">
            Weekly Special
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Organic Summer <br className="hidden md:block"/> Harvest Sale
          </h2>
          <p className="text-brand-light text-lg max-w-md">
            Get up to <span className="font-bold text-white">40% OFF</span> on all fresh seasonal fruits and vegetables.
          </p>
          <button className="mt-4 bg-white text-brand-dark px-6 py-2.5 rounded-full font-semibold hover:bg-brand-light transition-colors shadow-lg">
            Shop Deals
          </button>
        </div>

        <div className="mt-8 md:mt-0 flex items-center gap-6">
           <div className="flex gap-3">
              <TimeUnit value={timeLeft.hours} label="HRS" />
              <div className="text-2xl font-bold text-brand-light self-start mt-2">:</div>
              <TimeUnit value={timeLeft.minutes} label="MIN" />
              <div className="text-2xl font-bold text-brand-light self-start mt-2">:</div>
              <TimeUnit value={timeLeft.seconds} label="SEC" />
           </div>
        </div>

        {/* Decorative Image Overlays */}
        <img 
            src="https://picsum.photos/seed/fruit1/200/200" 
            alt="Fruit" 
            className="absolute -right-10 -bottom-10 w-40 h-40 object-cover rounded-full border-4 border-white/20 hidden lg:block opacity-80"
        />
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center text-2xl font-bold shadow-inner">
      {value.toString().padStart(2, '0')}
    </div>
    <span className="text-xs font-medium text-brand-light mt-2">{label}</span>
  </div>
);
