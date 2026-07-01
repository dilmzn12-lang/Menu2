import React, { useState, useEffect, useRef } from 'react';
import { Language, ScreenState, CategoryId, TRANSLATIONS } from './types';
import { MENU_CATEGORIES } from './menuData';
import Volumetric3DAsset from './components/Volumetric3DAsset';
import PopularCarousel from './components/PopularCarousel';
import RatingsReviews from './components/RatingsReviews';
import { shopAmbience } from './utils/ambience';
import { ITEM_DESCRIPTIONS } from './utils/descriptions';
import { 
  Coffee, 
  Cookie, 
  CupSoda, 
  GlassWater, 
  Languages, 
  Star, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronRight,
  Award, 
  Compass, 
  MapPin, 
  CheckCircle2, 
  Play, 
  ArrowRight,
  Info
} from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('intro');
  const [lang, setLang] = useState<Language>('en');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('iced_coffee');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  
  // Ref for audio/ambient context if needed
  const timerRef = useRef<number | null>(null);

  const triggerVibe = (pattern: number | number[] = 12) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  };

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      shopAmbience.stop();
    };
  }, []);

  // Calculate page scroll progress for top status bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAmbience = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      shopAmbience.start();
    } else {
      shopAmbience.stop();
    }
    triggerVibe(15);
  };

  const handleItemSelect = (item: any) => {
    triggerVibe(12);
    if (activeItemId === item.id) {
      setActiveItemId(null);
    } else {
      setActiveItemId(item.id);
    }
  };

  // Auto advance intro to language select after 7.5 seconds
  useEffect(() => {
    if (screen === 'intro') {
      timerRef.current = window.setTimeout(() => {
        setScreen('langSelect');
      }, 7500);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [screen]);

  // Update text direction and HTML attribute whenever language changes
  const selectLanguage = (selectedLang: Language) => {
    setLang(selectedLang);
    setActiveItemId(null);
    const isRtl = selectedLang === 'ar' || selectedLang === 'ku';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = selectedLang;
    setScreen('menu');
    triggerVibe(18);
  };

  // Quick anchor scroll helper
  const scrollToCategory = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    triggerVibe(12);
  };

  // Map category ID to its corresponding Lucide icon
  const getCategoryIcon = (id: CategoryId, className: string) => {
    switch (id) {
      case 'iced_coffee':
        return <GlassWater className={className} />;
      case 'smoothies':
        return <CupSoda className={className} />;
      case 'sweet':
        return <Cookie className={className} />;
      case 'coffee':
        return <Coffee className={className} />;
    }
  };

  const isRtl = lang === 'ar' || lang === 'ku';

  // INTRO CINEMATIC SCREEN
  if (screen === 'intro') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 overflow-hidden bg-slate-950">
        {/* Animated Background Mesh representing premium café aroma */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 filter blur-[120px] animate-pulse [animation-duration:8s]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 filter blur-[120px] animate-pulse [animation-duration:6s] [animation-delay:2s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/5 filter blur-[150px] animate-pulse" />
        </div>

        {/* Floating Coffee Steam Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-200/40 rounded-full animate-bubble"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-${10 + Math.random() * 20}%`,
                animationDuration: `${6 + Math.random() * 8}s`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `scale(${0.5 + Math.random() * 1.5})`,
              }}
            />
          ))}
        </div>

        {/* Top Header details */}
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-rose-400 text-[10px] font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-spin [animation-duration:4s]" />
            <span>SPECIALTY ROASTS & PASTRIES</span>
          </div>
          <span className="font-serif italic text-sm text-slate-400">Welcome to a modern multi-sensory showcase</span>
        </div>

        {/* Center Brewing / Pouring Cinematic Visual Animation */}
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center justify-center">
          {/* Neon Halo Rings */}
          <div className="absolute w-56 h-56 rounded-full border border-slate-700/30 scale-100 animate-ping [animation-duration:3s]" />
          <div className="absolute w-44 h-44 rounded-full border border-slate-600/40 animate-pulse" />
          
          <div className="w-56 h-56 flex items-center justify-center relative filter drop-shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            {/* We display a spinning interactive Iced Coffee Cup inside cinematic stage */}
            <Volumetric3DAsset 
              item={{
                id: 'intro-item',
                name: 'Welcome Pour',
                posNum: 5,
                rating: 5,
                isPopular: true,
                modelConfig: {
                  type: 'iced_cup',
                  baseColor: '#8B5A2B',
                  fluidColor: '#FDF4E3',
                  details: ['straw', 'ice', 'milk_swirl'],
                }
              }} 
              interactive={true} 
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-indigo-300 tracking-tight text-center mt-6">
            BLACK COFFEE
          </h1>
          <p className="text-sm font-mono text-slate-400 text-center tracking-wide mt-2">
            VIBRANT INTERACTIVE MENU EXPERIENCE
          </p>

          {/* Kurdistan Flag blended with Cafe Theme */}
          <div className="mt-5 relative group select-none flex flex-col items-center">
            {/* Soft glowing ambient light behind the flag */}
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500 rounded-2xl blur-md opacity-25 group-hover:opacity-45 transition duration-1000 animate-pulse" />
            
            <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex flex-col items-center gap-2 w-64 shadow-xl">
              {/* Flag bands in elegant shape */}
              <div className="w-full h-8 rounded-md overflow-hidden flex flex-col relative shadow-inner">
                {/* Red band */}
                <div className="w-full h-1/3 bg-gradient-to-r from-red-600 to-red-500" />
                {/* White band with golden sun */}
                <div className="w-full h-1/3 bg-white flex items-center justify-center relative">
                  <div className="absolute w-4.5 h-4.5 bg-amber-400 rounded-full flex items-center justify-center animate-spin [animation-duration:15s] shadow-[0_0_8px_#fbbf24]">
                    {Array.from({ length: 21 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-[1.5px] h-2 bg-amber-400 rounded-full"
                        style={{ transform: `rotate(${i * (360 / 21)}deg) translateY(-2px)` }}
                      />
                    ))}
                    <div className="w-2.5 h-2.5 bg-amber-500 rounded-full border border-amber-300 z-10" />
                  </div>
                </div>
                {/* Green band */}
                <div className="w-full h-1/3 bg-gradient-to-r from-emerald-600 to-emerald-500" />
              </div>
              
              <div className="text-center">
                <div className="text-[10px] font-mono tracking-wider text-amber-200/90 font-extrabold uppercase">
                  بەخێربێن بۆ بلاک کۆفی
                </div>
                <div className="text-[9px] text-slate-300 font-medium mt-0.5">
                  Kurdistan Special Edition • ٢٠٢٦
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skip action at bottom */}
        <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-4">
          <button
            onClick={() => {
              setScreen('langSelect');
              triggerVibe(15);
            }}
            className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 rounded-full font-display font-bold text-sm text-white hover:opacity-95 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>SKIP INTRO</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <span className="text-[10px] text-slate-500 font-mono">
            Auto-advancing in a moment...
          </span>
        </div>

        {/* Dynamic style for particles float upwards */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes bubble {
            0% {
              transform: translateY(0) scale(0.5) translateX(0);
              opacity: 0;
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% {
              transform: translateY(-500px) scale(1.5) translateX(30px);
              opacity: 0;
            }
          }
          .animate-bubble {
            animation: bubble 8s infinite linear;
          }
        `}} />
      </div>
    );
  }

  // LANGUAGE SELECTION SCREEN
  if (screen === 'langSelect') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-teal-500/20 via-pink-500/20 to-amber-500/20 bg-slate-900 overflow-hidden">
        {/* Abstract glowing blobs for young, cheerful energetic vibes */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/20 filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-500/20 filter blur-3xl" />

        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 shadow-2xl text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
            <Languages className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-display font-black text-white tracking-tight leading-tight mb-2">
            CHOOSE YOUR LANGUAGE
          </h2>
          <p className="text-sm text-slate-300 font-medium mb-8">
            Select your script preference for the full interface
          </p>

          <div className="space-y-4">
            {/* Arabic mode */}
            <button
              onClick={() => selectLanguage('ar')}
              className="w-full p-4 bg-white hover:bg-emerald-50 text-slate-800 rounded-2xl font-semibold shadow-md border-2 border-transparent hover:border-emerald-400 active:scale-95 transition-all text-lg flex items-center justify-between cursor-pointer"
            >
              <span className="font-arabic font-bold text-emerald-600">العربية</span>
              <span className="text-xs text-slate-400 font-mono">Arabic (RTL)</span>
            </button>

            {/* Kurdish Sorani mode */}
            <button
              onClick={() => selectLanguage('ku')}
              className="w-full p-4 bg-white hover:bg-amber-50 text-slate-800 rounded-2xl font-semibold shadow-md border-2 border-transparent hover:border-amber-400 active:scale-95 transition-all text-lg flex items-center justify-between cursor-pointer"
            >
              <span className="font-arabic font-bold text-amber-600">کوردی</span>
              <span className="text-xs text-slate-400 font-mono">Kurdish (RTL)</span>
            </button>

            {/* English mode */}
            <button
              onClick={() => selectLanguage('en')}
              className="w-full p-4 bg-white hover:bg-indigo-50 text-slate-800 rounded-2xl font-semibold shadow-md border-2 border-transparent hover:border-indigo-400 active:scale-95 transition-all text-lg flex items-center justify-between cursor-pointer"
            >
              <span className="font-display font-extrabold text-indigo-600">English</span>
              <span className="text-xs text-slate-400 font-mono">English (LTR)</span>
            </button>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/10 text-[10px] text-slate-400 font-mono">
            BLACK COFFEE SHOWCASE
          </div>
        </div>
      </div>
    );
  }

  // MAIN DIGITAL MENU SHOWCASE DASHBOARD (Vibrant, bright pastel-mesh theme!)
  return (
    <div className={`min-h-screen w-full overflow-x-hidden mesh-bg relative pb-16 font-sans text-slate-800 antialiased selection:bg-rose-100 ${
      lang === 'ar' || lang === 'ku' ? 'font-arabic' : 'font-sans'
    }`}>
      {/* SCROLL PROGRESS BAR AT VERY TOP */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100/30 z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-indigo-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* SAFE PULSING GRADIENT GLOWS */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-emerald-400/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-3/4 left-0 w-80 h-80 bg-pink-400/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/10 rounded-full filter blur-[130px] pointer-events-none" />

      {/* STICKY MAIN HEADER */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-xs px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          
          {/* Café Logo / Title branding with Artistic Flair */}
          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg transform -rotate-6 transition-transform hover:rotate-0 duration-300 shrink-0">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h1 className="text-base font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 leading-none">
                {TRANSLATIONS.welcome_title[lang]}
              </h1>
              <span className="text-[9px] font-mono font-bold text-emerald-600 tracking-widest uppercase">
                Artistic Showcase
              </span>
            </div>
          </div>

          {/* Quick Language Switcher dropdown button & Audio Toggle */}
          <div className="flex items-center gap-1.5">
            {/* Ambient Audio Toggle with pulsing visual feedback when active */}
            <button
              onClick={toggleAmbience}
              className={`w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center border cursor-pointer shrink-0 ${
                soundEnabled 
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-md scale-105' 
                  : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800 hover:bg-slate-50'
              }`}
              title={lang === 'en' ? 'Coffee Shop Ambience' : lang === 'ar' ? 'أجواء المقهى الموسيقية' : 'کەشوهەوای کافێ'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 animate-bounce [animation-duration:1.5s]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Direct selector buttons in header */}
            <div className={`flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-full border border-slate-200 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {(['en', 'ar', 'ku'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => selectLanguage(l)}
                  className={`text-[9px] font-display font-black px-2 py-1 rounded-full transition-all cursor-pointer ${
                    lang === l 
                      ? 'bg-white text-emerald-600 shadow-xs font-extrabold' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {l === 'en' ? 'english' : l === 'ar' ? 'عربي' : 'کوردی'}
                </button>
              ))}
            </div>
          </div>

        </div>
      </header>

      {/* STICKY CATEGORIES QUICK-NAV (scrollable) */}
      <nav className="sticky top-[61px] z-30 bg-white/50 backdrop-blur-lg border-b border-slate-200/40 py-2.5 shadow-xs">
        <div className="max-w-md mx-auto px-4 overflow-x-auto no-scrollbar flex gap-2 justify-start md:justify-center">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-display font-bold transition-all shadow-xs cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white font-extrabold shadow-md scale-102'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {getCategoryIcon(cat.id, `w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`)}
                <span>{TRANSLATIONS[cat.nameKey][lang]}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* CORE BODY CONTAINER (MAX WIDTH MOBILE OPTIMIZED) */}
      <main className="max-w-md mx-auto px-4 mt-4">
        
        {/* POPULAR HIGHLIGHT CAROUSEL SHOWCASE */}
        <PopularCarousel lang={lang} onSelectCategory={(id) => scrollToCategory(id)} />

        {/* CLARIFYING NOTICE (Display Only) */}
        <div className={`p-4 rounded-2xl bg-amber-50 border border-amber-200/70 text-amber-800 flex items-start gap-3 mb-8 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-display font-bold text-xs block mb-0.5">
              {lang === 'en' ? 'Interactive Showcase Only' : lang === 'ar' ? 'عرض تفاعلي فقط' : 'تەنها بۆ بینین و پیشاندانی کارلێکەرە'}
            </span>
            <span className="text-[11px] leading-relaxed block text-amber-700/90 font-medium">
              {lang === 'en' 
                ? 'Welcome to a high-fidelity visual menu representation! All ordering, cart checkout, and pricing features are strictly disabled to focus purely on the 3D aesthetic showcase.' 
                : lang === 'ar'
                ? 'مرحباً بك في العرض البصري لقائمتنا الرقمية! جميع خصائص الطلب، السلة والدفع معطلة تماماً للتركيز على الجمالية والتدوير ثلاثي الأبعاد.'
                : 'بەخێربێن بۆ مینیوی فەرمی کارلێکەر! هەموو تایبەتمەندیەکانی کڕین، سەبەتە و پارەدان ناچالاک کراون بۆ تیشک خستنە سەر پیشاندانی سێ ڕەهەندی.'}
            </span>
          </div>
        </div>

        {/* CATEGORY SECTIONS LIST */}
        <div className="space-y-16">
          {MENU_CATEGORIES.map((category) => (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-[120px]"
            >
              {/* Category Engraved Underline Title Treatment */}
              <div className="text-center mb-8 relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                </div>
                
                <span className="relative inline-flex items-center gap-3 bg-slate-50 border border-slate-200 px-5 py-1.5 rounded-full shadow-sm">
                  {getCategoryIcon(category.id, 'w-4 h-4 text-rose-500')}
                  <span className="font-serif italic font-semibold text-rose-500 text-sm">
                    {lang === 'en' ? 'Chef Selected' : lang === 'ar' ? 'اختيارات الشيف' : 'هەڵبژاردەی شێف'}
                  </span>
                </span>

                <h2 className="text-xl font-display font-black text-slate-800 uppercase tracking-widest mt-3 relative z-10 inline-block px-4">
                  <span className="text-rose-400 font-mono tracking-tighter">___</span>
                  <span className="mx-2 text-slate-800">{TRANSLATIONS[category.nameKey][lang]}</span>
                  <span className="text-rose-400 font-mono tracking-tighter">___</span>
                </h2>
              </div>

              {/* Grid of 10 Item Cards */}
              <div className="grid grid-cols-1 gap-6">
                {category.items.map((item) => {
                  const isActive = activeItemId === item.id;
                  return (
                    <div key={item.id} className="relative group">
                      {/* Active Selection Halo Glow */}
                      {isActive && (
                        <div 
                          className="absolute inset-0 rounded-3xl opacity-40 filter blur-xl animate-pulse transition-all duration-500 -z-10"
                          style={{ 
                            backgroundColor: item.modelConfig.baseColor,
                            transform: 'scale(1.05)',
                            boxShadow: `0 0 35px 10px ${item.modelConfig.baseColor}40`
                          }}
                        />
                      )}

                      <div
                        className={`glass-card rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer border-2 ${
                          isActive 
                            ? 'border-emerald-500 shadow-xl bg-emerald-50/10' 
                            : 'border-white/50'
                        }`}
                        onClick={() => handleItemSelect(item)}
                      >
                        {/* Background Soft Accent Sphere */}
                        <div 
                          className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 filter blur-xl animate-pulse"
                          style={{ backgroundColor: item.modelConfig.baseColor }}
                        />

                        {/* Top card header detail (Position / Popularity) */}
                        <div className={`flex items-center justify-between z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          {/* Position Number Label */}
                          <span className="font-mono text-[11px] font-black text-slate-400 bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-md">
                            {TRANSLATIONS.position[lang]} #{item.posNum}
                          </span>
                          
                          {/* Popularity indicator */}
                          {item.isPopular && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200/40 px-2.5 py-1 rounded-md animate-pulse">
                              <Award className="w-3 h-3 text-rose-500" />
                              <span>{TRANSLATIONS.popular_badge[lang]}</span>
                            </span>
                          )}
                        </div>

                        {/* 360 DEGREE INTERACTIVE VOLUMETRIC VIEWPORT */}
                        <div className="relative py-4 flex justify-center items-center">
                          <Volumetric3DAsset item={item} interactive={true} />
                          
                          {/* Sub-hint overlay */}
                          <div className="absolute bottom-0 bg-slate-800/5 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[9px] font-mono text-slate-500 pointer-events-none">
                            {TRANSLATIONS.drag_to_rotate[lang]}
                          </div>
                        </div>

                        {/* Lower Description detail & title block */}
                        <div className="pt-2 z-10">
                          <div className={`flex justify-between items-center gap-2 mb-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                            {/* Fixed Product Name with speaker button */}
                            <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                              <h3 className="text-base font-display font-black text-slate-800 tracking-tight leading-none">
                                {item.name}
                              </h3>
                              {isActive && (
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white animate-scale-up">
                                  <Sparkles className="w-3 h-3 text-white" />
                                </span>
                              )}
                            </div>

                            {/* Guest star rating score */}
                            <div className={`flex items-center gap-0.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="text-[11px] font-mono font-bold text-slate-500">
                                {item.rating}
                              </span>
                            </div>
                          </div>

                          {/* Premium Multilingual Description Text */}
                          <p className={`text-xs text-slate-500 leading-relaxed font-medium mb-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                            {ITEM_DESCRIPTIONS[item.id]?.[lang]}
                          </p>

                          {/* Garnish ingredients chips listing */}
                          <div className={`flex flex-wrap gap-1 mt-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            {item.modelConfig.details.map((garnish) => (
                              <span
                                key={garnish}
                                className="text-[9px] bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200/40 px-2 py-0.5 rounded-md font-mono transition-all uppercase"
                              >
                                {garnish.replace('_', ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* CUSTOMER GUEST REVIEWS SECTION */}
        <RatingsReviews lang={lang} />

      </main>

      {/* FOOTER SECTION */}
      <footer className="mt-16 border-t border-slate-200/50 bg-white/40 py-8 px-4 text-center text-xs text-slate-400 font-mono z-10 relative">
        <div className="max-w-md mx-auto">
          <p className="leading-relaxed">
            {TRANSLATIONS.all_rights[lang]}
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <span className="hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Erbil Café Lab
            </span>
            <span>•</span>
            <span className="hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Gulan District
            </span>
          </div>
        </div>
      </footer>

      {/* ARTISTIC FLAIR PULSING TICKER STRIP */}
      <div className="h-6 bg-gradient-to-r from-emerald-500 to-teal-600 w-full relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-around gap-12 whitespace-nowrap animate-pulse">
          <span className="text-[9px] font-black text-white uppercase tracking-[0.25em]">
            {lang === 'en' 
              ? 'Refreshing • Vibrant • Youthful • Premium • 100% Arabica • Freshly Baked • Daily Smoothies • Specialty Brew Lab'
              : lang === 'ar'
              ? 'منعش • حيوي • شبابي • متميز • ١٠٠٪ أرابيكا • خبز طازج • سموذي يومي • مختبر القهوة'
              : 'نوێکار • زیندوو • گەنجانە • نایاب • ١٠٠٪ عەرەبی • نانی گەرم • سمووزی ڕۆژانە • تاقیگەی تایبەت'}
          </span>
        </div>
      </div>
    </div>
  );
}
