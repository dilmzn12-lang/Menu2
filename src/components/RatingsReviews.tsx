import React from 'react';
import { Language, TRANSLATIONS } from '../types';
import { GUEST_REVIEWS } from '../menuData';
import { Star, MessageSquare } from 'lucide-react';

interface RatingsReviewsProps {
  lang: Language;
}

export default function RatingsReviews({ lang }: RatingsReviewsProps) {
  const isRtl = lang === 'ar' || lang === 'ku';

  // Static ratings breakdown
  const ratingStats = [
    { stars: 5, percentage: '88%', count: 422 },
    { stars: 4, percentage: '10%', count: 48 },
    { stars: 3, percentage: '2%', count: 10 },
    { stars: 2, percentage: '0%', count: 0 },
    { stars: 1, percentage: '0%', count: 0 },
  ];

  return (
    <section id="reviews-section" className="py-12 px-6 rounded-3xl mt-12 bg-white/45 backdrop-blur-md border border-white/60 shadow-xl">
      {/* Section Title */}
      <div className="text-center mb-8">
        <span className="font-serif italic text-rose-500/80 text-lg block mb-1">
          {lang === 'en' ? 'What guests say' : lang === 'ar' ? 'ماذا يقول ضيوفنا' : 'میوانەکانمان چی دەڵێن'}
        </span>
        <h2 className={`text-2xl font-display font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-2 ${lang === 'ar' || lang === 'ku' ? 'flex-row-reverse' : ''}`}>
          <MessageSquare className="w-6 h-6 text-indigo-500" />
          {TRANSLATIONS.customer_reviews[lang]}
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-400 via-pink-400 to-amber-400 mx-auto rounded-full mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left column: Summary */}
        <div className="col-span-1 md:col-span-4 text-center p-6 bg-gradient-to-b from-white/90 to-white/50 rounded-2xl border border-white/80 shadow-sm">
          <h3 className="text-5xl font-display font-black text-slate-800">4.9</h3>
          <div className="flex justify-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm font-semibold text-slate-700">
            {TRANSLATIONS.average_rating[lang]}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {TRANSLATIONS.based_on[lang]}
          </p>
        </div>

        {/* Right column: Star Breakdown */}
        <div className="col-span-1 md:col-span-8 space-y-2">
          {ratingStats.map((stat) => (
            <div
              key={stat.stars}
              className={`flex items-center gap-3 text-sm ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <span className="w-3 font-display font-bold text-slate-600 text-right">{stat.stars}</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <div className="flex-1 h-3 bg-slate-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 to-rose-400 rounded-full"
                  style={{ width: stat.percentage }}
                />
              </div>
              <span className="w-10 font-mono text-xs text-slate-500 text-right">{stat.percentage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontally Scrollable Cards Container */}
      <div className="mt-10 -mx-6 px-6 overflow-x-auto no-scrollbar flex gap-6 scroll-smooth snap-x">
        {GUEST_REVIEWS.map((review) => (
          <div
            key={review.id}
            className="w-[290px] md:w-[320px] shrink-0 snap-center bg-white/85 p-6 rounded-2xl border border-white/90 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            {/* Review quote */}
            <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
              {review.quoteKeys[lang]}
            </p>

            {/* Author details */}
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold shadow-inner ${review.avatarColor}`}>
                {review.author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-display font-bold text-slate-800 truncate">
                  {review.author}
                </h4>
                {/* 5 mini stars */}
                <div className={`flex gap-0.5 mt-0.5 ${isRtl ? 'justify-end' : ''}`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
