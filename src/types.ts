export type Language = 'en' | 'ar' | 'ku';

export type ScreenState = 'intro' | 'langSelect' | 'menu';

export type CategoryId = 'iced_coffee' | 'smoothies' | 'sweet' | 'coffee';

export interface Category {
  id: CategoryId;
  nameKey: string;
  iconName: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string; // Keep product names exactly in English
  posNum: number;
  rating: number;
  isPopular: boolean;
  modelConfig: {
    type: 'iced_cup' | 'hot_cup' | 'smoothie_cup' | 'croissant' | 'cake_pop' | 'cake_pancake' | 'cake_slice';
    baseColor: string; // e.g. '#A16207' (espresso) or '#EC4899' (strawberry)
    fluidColor?: string; // e.g. '#FEF08A' (creamy milk / yellow)
    accentColor?: string; // e.g. '#2563EB' (blueberry)
    toppingColor?: string;
    details: string[]; // ['sprinkles', 'straw', 'lemon', 'foam', 'chocolate_drizzle', 'cream', 'mint']
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  avatarColor: string;
  quoteKeys: {
    en: string;
    ar: string;
    ku: string;
  };
}

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Navigation & Screen Labels
  skip: {
    en: 'Skip Intro',
    ar: 'تخطي العرض',
    ku: 'تێپەڕاندن',
  },
  choose_lang: {
    en: 'Choose Your Language',
    ar: 'اختر لغتك المفضلة',
    ku: 'زمانەکەت هەڵبژێرە',
  },
  welcome_title: {
    en: 'BLACK COFFEE',
    ar: 'بلاك كوفي',
    ku: 'بلاک کۆفی',
  },
  welcome_subtitle: {
    en: 'Premium Multi-Sensory Showcase',
    ar: 'تجربة قائمة طعام رقمية تفاعلية',
    ku: 'مێنیوی دیجیتاڵی کارلێکەر',
  },
  most_popular: {
    en: 'Most Popular Highlights',
    ar: 'أبرز الأصناف الأكثر طلباً',
    ku: 'شازترین و بەناوبانگترینەکان',
  },
  category_iced_coffee: {
    en: 'Iced Coffee',
    ar: 'القهوة الباردة',
    ku: 'قاوەی سارد',
  },
  category_smoothies: {
    en: 'Smoothies & Refresher',
    ar: 'السموذي والانتعاش',
    ku: 'سمووسی و فرێشەر',
  },
  category_sweet: {
    en: 'Sweet & Pastries',
    ar: 'الحلويات والمخبوزات',
    ku: 'شیرینی و هەویرکاری',
  },
  category_coffee: {
    en: 'Hot Coffee Brews',
    ar: 'مشروبات القهوة الساخنة',
    ku: 'قاوەی گەرم',
  },
  drag_to_rotate: {
    en: 'Swipe left/right to rotate 360°',
    ar: 'اسحب يميناً/يساراً للتدوير 360 درجة',
    ku: 'بۆ لای ڕاست/چەپ ڕابکێشە بۆ سووڕانەوەی 360°',
  },
  tilt_hint: {
    en: 'Hover or move pointer to tilt',
    ar: 'حرك المؤشر للميلان ثلاثي الأبعاد',
    ku: 'ئاماژەپێکەر بجوڵێنە بۆ لاربونەوەی سێ ڕەهەندی',
  },
  customer_reviews: {
    en: 'Guest Reviews & Ratings',
    ar: 'تقييمات وآراء ضيوفنا',
    ku: 'سەرنج و هەڵسەنگاندنی میوانان',
  },
  average_rating: {
    en: 'Average Rating',
    ar: 'معدل التقييم العام',
    ku: 'تێکڕای هەڵسەنگاندن',
  },
  based_on: {
    en: 'based on 480+ visits',
    ar: 'بناءً على أكثر من 480 زيارة',
    ku: 'لە کۆی زیاتر لە 480 سەردان',
  },
  popular_badge: {
    en: 'Voted Best Seller',
    ar: 'الأكثر مبيعاً',
    ku: 'پڕفرۆشترین',
  },
  all_rights: {
    en: '© 2026 Black Coffee. Premium Digital Menu Showcase. No Ordering.',
    ar: '© 2026 بلاك كوفي. قائمة رقمية تفاعلية. للعرض فقط.',
    ku: '© 2026 بلاک کۆفی. مێنیوی فەرمی کارلێکەر. تەنها بۆ بینینە.',
  },
  position: {
    en: 'Item',
    ar: 'الصنف',
    ku: 'بابەت',
  },
};
