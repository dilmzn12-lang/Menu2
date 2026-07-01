import { Language } from '../types';

export interface DescriptionDetail {
  en: string;
  ar: string;
  ku: string;
}

export const ITEM_DESCRIPTIONS: Record<string, DescriptionDetail> = {
  // ICED COFFEE (ic-1 to ic-10)
  'ic-1': {
    en: 'Rich double-shot espresso poured over chilled fresh milk and crisp ice cubes, creating a smooth and balanced classic.',
    ar: 'إسبريسو غني ومزدوج يسكب فوق الحليب الطازج والبارد ومكعبات الثلج، ليمتزج في كلاسيكية ناعمة ومتوازنة.',
    ku: 'شۆتێکی دووانەی دەوڵەمەندی ئێسپرێسۆ لەگەڵ شیری تازەی سارد و سەهۆڵ، تامێکی نەرم و هاوسەنگی کلاسیک دەبەخشێت.',
  },
  'ic-2': {
    en: 'Signature espresso shots combined with ice-cold pure water, offering a bold and highly refreshing caffeine boost.',
    ar: 'شوتات إسبريسو مميزة ممزوجة بالماء البارد والثلج النقي، تمنحك طاقة مركزة وانتعاشاً فائقاً.',
    ku: 'شۆتێکی قاوەی ئێسپرێسۆی تایبەت لەگەڵ ئاوی سارد و سەهۆڵ، وزەیەکی بەهێز و تێرکەر دەبەخشێت.',
  },
  'ic-3': {
    en: 'Decadent chocolate syrup merged with cold espresso and creamy milk, topped with a velvety cloud of cream.',
    ar: 'شراب الشوكولاتة الفاخر الممزوج بالإسبريسو البارد والحليب الكريمي، يعلوه سحاب مخملي من الكريمة الغنية.',
    ku: 'شۆکلاتەی نایاب لەگەڵ ئێسپرێسۆی سارد و شیری کرێمی، لەگەڵ چینی سەرەوەی کرێمی نەرم.',
  },
  'ic-4': {
    en: 'Sweet buttery caramel drizzle layered with premium espresso, iced milk, and a luxurious whipped crown.',
    ar: 'كراميل زبدي حلو غني بطبقات الإسبريسو الفاخر، الحليب البارد، وتاج مخملي من الكريمة المخفوقة.',
    ku: 'کارامێلی شیرینی دەوڵەمەند لەگەڵ ئێسپرێسۆی نایاب، شیری سارد و تاجی کرێمی بە تام.',
  },
  'ic-5': {
    en: 'Authentic creamy hazelnut Nutella blended with iced double espresso, sweet milk, and roasted crunch.',
    ar: 'نوتيلا البندق الكريمية الأصيلة ممزوجة بالإسبريسو المزدوج البارد، الحليب المحلى وقرمشة البندق المحمص.',
    ku: 'نۆتێلای فندقی کرێمی ڕەسەن لەگەڵ دۆبڵ ئێسپرێسۆی سارد و شیری شیرین و فندقی برژاو.',
  },
  'ic-6': {
    en: 'Sweetened condensed milk meets smooth espresso and organic cold milk in a perfectly layered masterpiece.',
    ar: 'حليب مكثف محلى يلتقي بالإسبريسو الناعم والحليب العضوي البارد في لوحة متناسقة الطبقات.',
    ku: 'شیری خەستی شیرین لەگەڵ ئێسپرێسۆ و شیری ساردی ئۆرگانیک لەسەر شێوازی چینی سەرنجڕاکێش.',
  },
  'ic-7': {
    en: 'Blended icy espresso frappe base topped with high-grade cream, chocolate swirls, and colorful sprinkles.',
    ar: 'فرابيه إسبريسو مثلج ممزوج بعناية، مغطى بالكريمة الفاخرة، خيوط الشوكولاتة، والسكاكر الملونة.',
    ku: 'فرابی ئێسپرێسۆی بەستوو لەگەڵ کرێمی نایاب، شوکلاتە و شیرینی ڕەنگاوڕەنگ.',
  },
  'ic-8': {
    en: 'Pure premium Dutch cocoa cold brew with sweet cream and fine dark chocolate shavings.',
    ar: 'شوكولاتة هولندية فاخرة باردة مع الكريمة الحلوة ورقائق الشوكولاتة الداكنة الناعمة.',
    ku: 'شۆکلاتەی هۆڵەندی نایابی سارد لەگەڵ کرێمی شیرین و وردەکاری شۆکلاتەی تۆخ.',
  },
  'ic-9': {
    en: 'Slow-poured espresso over crystalline spring water and ice, preserving the rich amber crema on top.',
    ar: 'إسبريسو يسكب ببطء فوق مياه الينابيع والثلج، ليحافظ على رغوة الكريما الذهبية الغنية بالقمة.',
    ku: 'ئێسپرێسۆ لەسەر ئاوی کانی و سەهۆڵ، کە کفەکەی سەرەوەی بە جوانی دەهێڵێتەوە.',
  },
  'ic-10': {
    en: 'Artisanal single-origin espresso floated over premium sparkling tonic water with a slice of fresh lemon.',
    ar: 'إسبريسو فخم يطفو فوق مياه التونيك الفوارة الفاخرة مع شريحة ليمون منعشة.',
    ku: 'ئێسپرێسۆی نایاب لەسەر ئاوی تۆنیکی گازدار لەگەڵ قاشێک لیمۆی فرێش.',
  },

  // SMOOTHIES (sm-1 to sm-10)
  'sm-1': {
    en: 'Sun-ripened sweet strawberries blended to icy perfection and crowned with organic whipped cream.',
    ar: 'فراولة ناضجة حلوة ممزوجة ببرودة مثالية ومكللة بالكريمة المخفوقة العضوية.',
    ku: 'شلیکە سوور و شیرینەکان بە ساردی تەواو تێکەڵکراون لەگەڵ کرێمی تازە.',
  },
  'sm-2': {
    en: 'Zesty Cuban lime and freshly crushed mint leaves muddled with cold sparkling soda and raw cane sugar.',
    ar: 'ليمون كاريبي حامض مع أوراق النعناع الطازجة المسحوقة، ممزوجة مع الصودا الفوارة وسكر القصب الخام.',
    ku: 'لیمۆی فرێش و گەڵای نەعنای کوتراو لەگەڵ سۆدای گازدار و شەکرە سوورە.',
  },
  'sm-3': {
    en: 'Creamy tropical Alphonso mango pulp whipped into an icy slush, topped with fresh juicy mango cubes.',
    ar: 'لب مانجو ألفونسو الاستوائية الكريمية المخفوقة بالثلج، تعلوها مكعبات المانجو الطازجة والعصارية.',
    ku: 'مانگۆی کەمەرەیی کرێمی تێکەڵکراو لەگەڵ سەهۆڵ، لەگەڵ پارچەی مانگۆی فرێش لەسەرەوە.',
  },
  'sm-4': {
    en: 'Wild organic blueberries blended with creamy yogurt, fresh milk, and a wild berry syrup swirl.',
    ar: 'توت أزرق بري عضوي ممزوج بالزبادي الكريمي، الحليب الطازج وخيوط شراب التوت البري.',
    ku: 'تووی شینی کێوی لەگەڵ ماستی کرێمی، شیری فرێش و ڕازاندنەوەی تایبەت.',
  },
  'sm-5': {
    en: 'Crisp hydrating watermelon blended with micro-crushed ice and sprinkled with dark fruit seeds.',
    ar: 'بطيخ أحمر منعش ومرطب ممزوج بالثلج المسحوق الناعم ومزين ببذور الفاكهة الداكنة.',
    ku: 'شووتی فرێش و تەڕ تێکەڵکراو لەگەڵ سەهۆڵی وردکراو.',
  },
  'sm-6': {
    en: 'A gorgeous violet blend of raspberries, blackberries, and strawberries under a mountain of sweet cream.',
    ar: 'مزيج بنفسجي ساحر من التوت الأحمر، التوت الأسود والفراولة تحت جبل من الكريمة الحلوة.',
    ku: 'تێکەڵەیەکی وەنەوشەیی سەرنجڕاکێش لە تووی سوور، تووی ڕەش و شلیک لەگەڵ کرێمی شیرین.',
  },
  'sm-7': {
    en: 'Vibrant blue Curaçao syrup shaken with sweet lime infusion, sparkling water, and a sweet cherry.',
    ar: 'شراب الكوراساو الأزرق النابض بالحيوية مع الليمون الحلو، المياه الفوارة وكرز سكري.',
    ku: 'شەربەتی کیوراساوی شین لەگەڵ لیمۆی شیرین، ئاوی گازدار و گێلاسی شیرین.',
  },
  'sm-8': {
    en: 'Crisp green apple cold-pressed with bubbly mineral infusion and fresh sweet apple slices.',
    ar: 'تفاح أخضر مقرمش معصور على البارد وممزوج بالمعادن الفوارة وشرائح التفاح الطازجة.',
    ku: 'سێوی سەوزی فرێش لەگەڵ ئاوی کانزایی گازدار و قاشە سێوی نازدار.',
  },
  'sm-9': {
    en: 'Juicy summer peaches blended into a silky, sweet orchard slush with golden undertones.',
    ar: 'خوخ صيفي عصيري ممزوج في سلاش حريري حلو بنكهات ذهبية دافئة.',
    ku: 'خۆخی هاوینەی بە تام تێکەڵکراو لەگەڵ سەهۆڵی نەرم بە ڕەنگی زێڕین.',
  },
  'sm-10': {
    en: 'Rich Madagascar vanilla bean pods blended with creamy gelato, organic milk, and golden sparkles.',
    ar: 'قرون فانيليا مدغشقر الغنية ممزوجة بالجيلاتو الكريمي، الحليب العضوي وبريق زاهٍ.',
    ku: 'فانیلیای ماداگاسکاری دەوڵەمەند لەگەڵ جێلاتۆی کرێمی و شیری ئۆرگانیک.',
  },

  // SWEETS (sw-1 to sw-10)
  'sw-1': {
    en: 'Golden, multi-layered butter pastry baked to a delicate crispy shell with a soft airy interior.',
    ar: 'مخبوز زبدي ذهبي متعدد الطبقات، يخبز ليمنحك قشرة خارجية مقرمشة وقلباً طرياً دافئاً.',
    ku: 'هەویرکاری کەرەیی زێڕینی فرە چین کە دەرەوەی تەقەتەق و ناوەوەی زۆر نەرمە.',
  },
  'sw-2': {
    en: 'Perfect bite-sized baby croissants baked with French Normandy butter for a melt-in-the-mouth texture.',
    ar: 'كرواسون صغير الحجم ومثالي، مخبوز بزبدة نورماندي الفرنسية الفاخرة ليذوب في الفم.',
    ku: 'مینی کرواسی بچووک و بەتام بە کەرەی فەرەنسی نایاب کە لە دەمدا دەتوێتەوە.',
  },
  'sw-3': {
    en: 'Flakey dark-baked croissant piped with molten Belgian dark chocolate and dusted with cocoa powder.',
    ar: 'كرواسون هش محشو بالشوكولاتة البلجيكية الداكنة الذائبة ومرشوش بمسحوق الكاكاو الغني.',
    ku: 'کرواسی نەرم کە بە شۆکلاتەی بەلجیکی تۆخی تواوە پڕکراوەتەوە.',
  },
  'sw-4': {
    en: 'Sweet red strawberry glaze drizzled over a cream-filled butter pastry with a half ripe strawberry.',
    ar: 'صلصة الفراولة الحمراء اللامعة فوق الكرواسون المحشو بالكريمة ويزينه نصف فراولة طازجة.',
    ku: 'کرواسۆن بە کرێم و شەربەتی شلیکی سوور لەگەڵ نیوەی شلیکی تازە لەسەرەوە.',
  },
  'sw-5': {
    en: 'Rich earthy pistachio cream injection, coated in a sweet green glaze and roasted pistachio nuts.',
    ar: 'محشو بكريمة الفستق الحلبي الغنية، ومغطى بطبقة خضراء حلوة مع حبات الفستق المحمص.',
    ku: 'کرێمی فستقی دەوڵەمەند لە ناوەوە لەگەڵ فستقی برژاو و وردکراو لەسەرەوە.',
  },
  'sw-6': {
    en: 'A premium moist vanilla cake orb dipped in hot strawberry lacquer on a lollipop stick, with white sprinkles.',
    ar: 'كرة كعك الفانيليا الرطبة الفاخرة مغموسة في غلاف الفراولة الساخن اللامع ومزينة بالسكاكر.',
    ku: 'کێکی بازنەیی فانیلیای تەڕ کە لە شۆکلاتەی شلیکی سوور نراوە لەسەر دارێک.',
  },
  'sw-7': {
    en: 'A fluffy stack of warm mini pancakes brushed with butter and drenched in Grade-A Canadian maple syrup.',
    ar: 'بان كيك صغير دافئ ورطب، مدهون بالزبدة ومغمور بشراب القيقب الكندي الأصلي.',
    ku: 'مینی پانکێکی نەرم و گەرم لەگەڵ کەرە و شەربەتی مەیپڵی کەنەدی.',
  },
  'sw-8': {
    en: 'Light sponge soaked in three milks, layered with rich heavy cream and finished with golden caramel waves.',
    ar: 'كعكة إسفنجية خفيفة غارقة بثلاثة أنواع من الحليب، تعلوها طبقة كريمة ثقيلة وموجات الكراميل الدافئة.',
    ku: 'کێکی ترێلیچەی بەناوبانگی تەڕ بە سێ جۆر شیر، لەگەڵ چینی کارامێلی زێڕین.',
  },
  'sw-9': {
    en: 'Super-moist double chocolate cake slice loaded with warm fudge frosting and premium gold dust.',
    ar: 'شريحة كعكة الشوكولاتة المزدوجة الرطبة للغاية، محشوة بصلصة الفودج الدافئة والغبار الذهبي.',
    ku: 'کێکی شوکلاتەی تۆخی دووقات بە فۆجی شوکلاتەی گەرم و تۆزی زێڕینی ڕازاوە.',
  },
  'sw-10': {
    en: 'Delightful birthday slice topped with sky-blue icing, rainbow sprinkles, and a tiny glowing wax candle.',
    ar: 'شريحة كعكة عيد الميلاد البهيجة، مغطاة بالكريمة الزرقاء والسكاكر الملونة مع شمعة صغيرة.',
    ku: 'کێکی جەژنی لەدایکبوون بە کرێمی شین و دەنکۆڵەی ڕەنگاوڕەنگ و مۆمێکی بچووک.',
  },

  // HOT BREWS (co-1 to co-10)
  'co-1': {
    en: 'Concentrated single shot of espresso displaying a dense, velvet-textured tiger-striped hazelnut crema.',
    ar: 'جرعة إسبريسو مركزة ومنفردة تتميز برغوة الكريما المخملية ذات الخطوط النمرية الفاتنة.',
    ku: 'تاکە شۆتێکی ئێسپرێسۆی خەست لەگەڵ کفێکی مخمەلی ڕازاوە بە ڕەنگی قاوەیی.',
  },
  'co-2': {
    en: 'Full-bodied double shot of espresso made with selected organic Arabica, providing deep smoky undertones.',
    ar: 'جرعة إسبريسو مزدوجة كاملة القوام من حبوب أرابيكا العضوية، تمنحك إيحاءات عميقة وغنية.',
    ku: 'دۆبڵ شۆتی ئێسپرێسۆی بەهێز لە قاوەی عەرەبی ئۆرگانیک بە تامی قووڵ.',
  },
  'co-3': {
    en: 'Balanced espresso mixed with velvety steamed milk and decorated with elaborate, high-contrast latte art.',
    ar: 'إسبريسو متوازن ممزوج بالحليب الساخن المخملي ومزين برسومات آرت رائعة وعالية التباين.',
    ku: 'ئێسپرێسۆی هاوسەنگ لەگەڵ شیری گەرمی نەرم و نیگارکێشانی لاتی ئاڕتی سەرنجڕاکێش.',
  },
  'co-4': {
    en: 'Double shot of rich ristretto folded with extra-smooth steamed microfoam for an intense yet velvety cup.',
    ar: 'جرعة مزدوجة من الريستريتو الغني الممزوج بالرغوة الحليبية الدقيقة لتجربة قوية ومخملية.',
    ku: 'دۆبڵ شۆت قاوە لەگەڵ شیری گەرم و کەفێکی زۆر تەنک و نەرم بۆ تەمێکی خەستتر.',
  },
  'co-5': {
    en: 'Hot concentrated espresso poured directly over a generous scoop of premium Madagascar vanilla bean gelato.',
    ar: 'إسبريسو ساخن ومركز يسكب مباشرة فوق كرة سخية من جيلاتو فانيليا مدغشقر الفاخرة.',
    ku: 'ئێسپرێسۆی گەرمی خەست کە دەرژێتە سەر سکۆپێک لە ئایسکرێمی فانیلیای نایاب.',
  },
  'co-6': {
    en: 'Equal parts of espresso, warm milk, and deep aerated foam, lightly dusted with organic cocoa powder.',
    ar: 'أجزاء متساوية من الإسبريسو، الحليب الساخن والرغوة الكثيفة، مع رشة خفيفة من بودرة الكاكاو.',
    ku: 'بڕی یەکسان لە ئێسپرێسۆ، شیری گەرم و کەفێکی چڕ، لەگەڵ تۆزی شوکلاتەی بەتام لەسەرەوە.',
  },
  'co-7': {
    en: 'Signature espresso shot marked with just a dollop of velvety hot frothed milk in a classic demitasse.',
    ar: 'جرعة إسبريسو مميزة معلمة بلمسة من رغوة الحليب المخملية في كوب ديميتاس كلاسيكي.',
    ku: 'شۆتێکی ئێسپرێسۆ لەگەڵ بڕێکی زۆر کەم لە کەفی شیری گەرم لە کوپێکی بچووکدا.',
  },
  'co-8': {
    en: 'Premium hot chocolate combined with double espresso and velvety microfoam, topped with whipped cream.',
    ar: 'شوكولاتة ساخنة فاخرة ممزوجة بالإسبريسو المزدوج والرغوة المخملية، تعلوها الكريمة المخفوقة.',
    ku: 'شوکلاتەی گەرمی نایاب لەگەڵ دۆبڵ ئێسپرێسۆ و شیری گەرم و کرێمی نەرم.',
  },
  'co-9': {
    en: 'Espresso shots extracted over hot mineral water, presenting a clean profile with a thin ring of crema.',
    ar: 'شوتات إسبريسو مستخلصة فوق الماء الساخن النقي، تمنحك نكهة نظيفة وقوية مع حلقة خفيفة من الكريما.',
    ku: 'ئێسپرێسۆ لەگەڵ ئاوی گەرم، پێشکەش دەکرێت بە تامێکی ڕوون و چڕ.',
  },
  'co-10': {
    en: 'Cozy brew featuring fifty-fifty milk and dark espresso blend, cooked with patience for ultimate warmth.',
    ar: 'مشروب دافئ ومريح بنسبة ٥٠٪ حليب و٥٠٪ إسبريسو داكن، محضر بحب لدفء لا ينسى.',
    ku: 'قاوەیەکی گەرم کێشراو بە ڕێژەی پەنجا بە پەنجا لە شیر و ئێسپرێسۆ، بۆ بەخشینی گەرمی تەواو.',
  },
};

// Client-side text to speech function that supports English, Arabic, and Kurdish (with proper locale routing)
let currentUtterance: SpeechSynthesisUtterance | null = null;

export function narrateItem(
  name: string,
  id: string,
  lang: Language,
  onStart: () => void,
  onEnd: () => void
) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onEnd();
    return;
  }

  // If already speaking, cancel the previous one
  window.speechSynthesis.cancel();

  const descObj = ITEM_DESCRIPTIONS[id];
  if (!descObj) {
    onEnd();
    return;
  }

  const textToSpeak = lang === 'en' 
    ? `Now presenting: ${name}. ${descObj.en}`
    : lang === 'ar'
    ? `نقدم لكم الآن: ${descObj.ar}`
    : `ئێستا پێشکەشتان دەکەین: ${name}. ${descObj.ku}`;

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  currentUtterance = utterance;

  // Retrieve list of voices
  const voices = typeof window !== 'undefined' ? window.speechSynthesis.getVoices() : [];
  
  let selectedVoice: SpeechSynthesisVoice | null = null;

  if (lang === 'ar') {
    utterance.lang = 'ar-EG';
    // Look for Arabic voices, preferring high-quality/natural ones
    selectedVoice = voices.find(v => v.lang.toLowerCase().includes('ar') && (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('premium'))) 
      || voices.find(v => v.lang.toLowerCase().startsWith('ar')) 
      || null;
  } else if (lang === 'ku') {
    // Kurdish (ckb/ku) written in Arabic script. Fallbacks: Persian (fa), Arabic (ar) since Persian supports 'چ, گ, پ, ژ'
    selectedVoice = voices.find(v => v.lang.toLowerCase().startsWith('ku') || v.lang.toLowerCase().startsWith('ckb'))
      || voices.find(v => v.lang.toLowerCase().startsWith('fa')) // Persian (perfect for Kurdish Arabic script)
      || voices.find(v => v.lang.toLowerCase().startsWith('ar')) // Arabic
      || null;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      // Fallback code
      utterance.lang = 'fa-IR'; 
    }
    // Slower speed for clear Kurdish articulation
    utterance.rate = 0.85;
    utterance.pitch = 1.05;
  } else {
    utterance.lang = 'en-US';
    // Look for English voices
    selectedVoice = voices.find(v => v.lang.toLowerCase().startsWith('en') && (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('premium')))
      || voices.find(v => v.lang.toLowerCase().startsWith('en'))
      || null;
  }

  if (selectedVoice && lang !== 'ku') {
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
  }

  // General adjustments for radio-style natural feeling
  if (lang === 'en') {
    utterance.rate = 0.90;
    utterance.pitch = 0.98;
  } else if (lang === 'ar') {
    utterance.rate = 0.88;
    utterance.pitch = 1.02;
  }

  utterance.onstart = () => {
    onStart();
  };

  utterance.onend = () => {
    if (currentUtterance === utterance) {
      onEnd();
      currentUtterance = null;
    }
  };

  utterance.onerror = () => {
    if (currentUtterance === utterance) {
      onEnd();
      currentUtterance = null;
    }
  };

  window.speechSynthesis.speak(utterance);
}

export function stopNarration() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
