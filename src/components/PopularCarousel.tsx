import React, { useState, useRef } from 'react';
import { MenuItem, Language, TRANSLATIONS } from '../types';
import { MENU_CATEGORIES } from '../menuData';
import Volumetric3DAsset from './Volumetric3DAsset';
import { Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface PopularCarouselProps {
  lang: Language;
  onSelectCategory: (id: any) => void;
}

export default function PopularCarousel({ lang, onSelectCategory }: PopularCarouselProps) {
  const isRtl = lang === 'ar' || lang === 'ku';

  // Gather some iconic popular items across different categories to showcase at the top
  const popularShowcaseItems: { item: MenuItem; categoryId: string; categoryName: string }[] = [
    {
      item: MENU_CATEGORIES[0].items[0], // Iced Latte
      categoryId: 'iced_coffee',
      categoryName: TRANSLATIONS.category_iced_coffee[lang],
    },
    {
      item: MENU_CATEGORIES[1].items[1], // Mojeto
      categoryId: 'smoothies',
      categoryName: TRANSLATIONS.category_smoothies[lang],
    },
    {
      item: MENU_CATEGORIES[2].items[4], // Pistachio Croissants
      categoryId: 'sweet',
      categoryName: TRANSLATIONS.category_sweet[lang],
    },
    {
      item: MENU_CATEGORIES[3].items[2], // Latte
      categoryId: 'coffee',
      categoryName: TRANSLATIONS.category_coffee[lang],
    },
    {
      item: MENU_CATEGORIES[2].items[8], // Darck cake
      categoryId: 'sweet',
      categoryName: TRANSLATIONS.category_sweet[lang],
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const touchStartRef = useRef<number | null>(null);

  const triggerVibe = (pattern: number | number[] = 12) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % popularShowcaseItems.length);
    triggerVibe(12);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + popularShowcaseItems.length) % popularShowcaseItems.length);
    triggerVibe(12);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartRef.current === null || !e.touches[0]) return;
    const diff = touchStartRef.current - e.touches[0].clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left
        isRtl ? prevSlide() : nextSlide();
      } else {
        // Swiped right
        isRtl ? nextSlide() : prevSlide();
      }
      touchStartRef.current = null;
    }
  };

  const activeShowcase = popularShowcaseItems[activeIndex];

  return (
    <div className="relative mt-4 mb-8 bg-gradient-to-tr from-white/60 to-white/90 p-6 rounded-3xl border border-white/60 shadow-xl overflow-hidden">
      {/* Absolute Decorative Glow Mesh */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-rose-300/25 rounded-full filter blur-xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-300/25 rounded-full filter blur-xl pointer-events-none" />

      {/* Header section */}
      <div className={`flex items-center justify-between mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className="p-2 bg-amber-100 rounded-xl text-amber-600 animate-pulse">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-rose-500/90 tracking-wider uppercase font-display">
              {lang === 'en' ? 'CHEF RECOMMENDATIONS' : lang === 'ar' ? 'توصيات الشيف المميزة' : 'پێشنیارەکانی شێف'}
            </h3>
            <h2 className="text-lg font-black text-slate-800 font-display">
              {TRANSLATIONS.most_popular[lang]}
            </h2>
          </div>
        </div>
      </div>

      {/* Carousel Core view */}
      <div 
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Column: Volumetric 3D interactive viewer */}
          <div className="relative flex justify-center items-center">
            {/* Spinning background rings */}
            <div className="absolute w-44 h-44 rounded-full border border-dashed border-slate-300/60 animate-spin [animation-duration:32s]" />
            <div className="absolute w-40 h-40 rounded-full border border-dashed border-slate-200/40 animate-spin [animation-duration:16s] [animation-direction:reverse]" />
            
            <Volumetric3DAsset item={activeShowcase.item} interactive={true} />

            {/* Position counter badge floating */}
            <div className="absolute bottom-1 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-slate-100 tracking-wide">
              {TRANSLATIONS.drag_to_rotate[lang]}
            </div>
          </div>

          {/* Right Column: Informative Copy Card */}
          <div className={`flex flex-col justify-center h-full text-center md:text-left ${isRtl ? 'md:text-right' : ''}`}>
            {/* Category tag */}
            <button
              onClick={() => {
                onSelectCategory(activeShowcase.categoryId);
                triggerVibe(15);
              }}
              className="self-center md:self-start px-3 py-1 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-600 rounded-full text-xs font-bold tracking-wide transition-all mb-3 cursor-pointer"
            >
              {activeShowcase.categoryName}
            </button>

            {/* Product Title */}
            <h3 className="text-2xl font-black text-slate-800 font-display tracking-tight leading-tight mb-2">
              {activeShowcase.item.name}
            </h3>

            {/* Rating stars & index indicator */}
            <div className={`flex items-center justify-center md:justify-start gap-1 mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(activeShowcase.item.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 ml-1.5 mr-1.5">
                {activeShowcase.item.rating}/5
              </span>
              <span className="text-xs text-rose-500 font-bold px-2 py-0.5 bg-rose-50 rounded-md">
                {TRANSLATIONS.popular_badge[lang]}
              </span>
            </div>

            {/* Extra interactive visual details descriptive listing */}
            <div className="bg-white/50 p-3.5 rounded-xl border border-white/60 mb-2">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                {lang === 'en' ? 'CRAFT DETAIL PROFILES' : lang === 'ar' ? 'مواصفات وإضافات الصنف' : 'تایبەتمەندی و پێکهاتەکان'}
              </span>
              <div className={`flex flex-wrap gap-1.5 justify-center md:justify-start ${isRtl ? 'flex-row-reverse' : ''}`}>
                {activeShowcase.item.modelConfig.details.map((detail) => (
                  <span
                    key={detail}
                    className="text-[11px] bg-slate-200/60 text-slate-700 px-2 py-0.5 rounded-md font-mono"
                  >
                    #{detail.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Manual Arrow Controls (perfectly styled vectors) */}
        <button
          onClick={isRtl ? nextSlide : prevSlide}
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white active:scale-95 transition-all z-10 cursor-pointer`}
          aria-label="Previous slice"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={isRtl ? prevSlide : nextSlide}
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white active:scale-95 transition-all z-10 cursor-pointer`}
          aria-label="Next slice"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Page Dots Indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {popularShowcaseItems.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              triggerVibe(10);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-300/70 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
