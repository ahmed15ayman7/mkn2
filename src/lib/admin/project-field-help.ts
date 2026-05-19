export type ProjectFieldHelpKey =
  | "slug"
  | "featured"
  | "titleEn"
  | "titleAr"
  | "descEn"
  | "descAr"
  | "locationEn"
  | "locationAr"
  | "areaSqm"
  | "completionDate"
  | "investmentValue"
  | "coverImage"
  | "images"
  | "heroSubtitleEn"
  | "heroSubtitleAr"
  | "panoramicVideoUrl"
  | "deliveryTitleEn"
  | "deliveryTitleAr"
  | "deliveryBody1En"
  | "deliveryBody1Ar"
  | "deliveryBody2En"
  | "deliveryBody2Ar"
  | "deliveryVideoUrl"
  | "deliveryCtaEn"
  | "deliveryCtaAr"
  | "brochureUrl"
  | "panoramicBackgroundVideoUrl"
  | "panoramicImageUrl"
  | "designGalleryImages"
  | "galleryImages"
  | "coastalTitleEn"
  | "coastalTitleAr"
  | "coastalCol1En"
  | "coastalCol1Ar"
  | "coastalCol2En"
  | "coastalCol2Ar"
  | "coastalCol3En"
  | "coastalCol3Ar"
  | "coastalHighlightEn"
  | "coastalHighlightAr"
  | "approachColumns"
  | "mapImageUrl"
  | "mapLogoUrl"
  | "locationLabelEn"
  | "locationLabelAr"
  | "locationBlurbEn"
  | "locationBlurbAr"
  | "luxuryTitleEn"
  | "luxuryTitleAr"
  | "luxuryCol1En"
  | "luxuryCol1Ar"
  | "luxuryCol2En"
  | "luxuryCol2Ar"
  | "amenities"
  | "materialColorsIntroImageUrl"
  | "materialColors"
  | "creditsTitleEn"
  | "creditsTitleAr"
  | "projectCredits"
  | "facilitiesTitleEn"
  | "facilitiesTitleAr"
  | "facilitiesEn"
  | "facilitiesAr"
  | "closingImageUrl"
  | "ctaEyebrowEn"
  | "ctaEyebrowAr"
  | "ctaTitleEn"
  | "ctaTitleAr"
  | "ctaBodyEn"
  | "ctaBodyAr"
  | "ctaButtonEn"
  | "ctaButtonAr"
  | "ctaWhatsappUrl";

export type FieldHelpEntry = {
  sectionAr: string;
  helpAr: string;
};

export const PROJECT_FIELD_HELP: Record<ProjectFieldHelpKey, FieldHelpEntry> = {
  slug: {
    sectionAr: "قائمة المشاريع (لا تظهر في صفحة التفاصيل)",
    helpAr: "معرّف الرابط بالإنجليزية فقط، مثل sea-point. يُستخدم في /projects/sea-point",
  },
  featured: {
    sectionAr: "الصفحة الرئيسية وقائمة المشاريع",
    helpAr: "عند التفعيل يظهر المشروع في الكاروسيل والشبكة المميزة بالصفحة الرئيسية.",
  },
  titleEn: {
    sectionAr: "الهيرو + البطاقات + الخريطة",
    helpAr: "اسم المشروع بالإنجليزية. يظهر كعنوان كبير في الهيرو وفي بطاقة الخريطة.",
  },
  titleAr: {
    sectionAr: "الهيرو + البطاقات + الخريطة",
    helpAr: "اسم المشروع بالعربية. نفس مكان العنوان الإنجليزي عند اختيار اللغة العربية.",
  },
  descEn: {
    sectionAr: "بطاقات المشاريع والكاروسيل",
    helpAr: "وصف مختصر للبطاقات في الصفحة الرئيسية وصفحة المشاريع. لا يُستخدم كنص الهيرو.",
  },
  descAr: {
    sectionAr: "بطاقات المشاريع والكاروسيل",
    helpAr: "الوصف المختصر بالعربية لبطاقات القائمة فقط.",
  },
  locationEn: {
    sectionAr: "الهيرو (شبكة البيانات) + البطاقات",
    helpAr: "الموقع بالإنجليزية. يظهر في عمود LOCATION أسفل الهيرو.",
  },
  locationAr: {
    sectionAr: "الهيرو (شبكة البيانات) + البطاقات",
    helpAr: "الموقع بالعربية في نفس مكان عمود الموقع.",
  },
  areaSqm: {
    sectionAr: "الهيرو — عمود START SPACE",
    helpAr: "المساحة بالمتر المربع. تُعرض مثل: 138 m². اتركه فارغاً لإخفاء القيمة.",
  },
  completionDate: {
    sectionAr: "الهيرو — عمود DELIVERY + قسم التسليم",
    helpAr: "تاريخ التسليم. إن كان في الماضي يظهر «تسليم فوري». يظهر أيضاً سنة التسليم في قسم DELIVERY.",
  },
  investmentValue: {
    sectionAr: "الهيرو — عمود START PRICE",
    helpAr: "سعر البداية بالريال. يُنسّق تلقائياً مثل: 850,000 SAR.",
  },
  coverImage: {
    sectionAr: "الهيرو — خلفية كاملة",
    helpAr: "صورة الخلفية الرئيسية للهيرو. يفضّل دقة عالية ونسبة أفقية.",
  },
  images: {
    sectionAr: "قائمة المشاريع فقط",
    helpAr: "صور إضافية لبطاقة المشروع في القائمة. لا تدخل معرض صفحة التفاصيل مباشرة.",
  },
  heroSubtitleEn: {
    sectionAr: "الهيرو — تحت زر التشغيل",
    helpAr: "سطر صغير بأحرف كبيرة فوق العنوان، مثل: FULL FINISHED, READY TO MOVE.",
  },
  heroSubtitleAr: {
    sectionAr: "الهيرو — تحت زر التشغيل",
    helpAr: "نفس السطر التعريفي بالعربية.",
  },
  panoramicVideoUrl: {
    sectionAr: "الهيرو — زر التشغيل الدائري",
    helpAr: "رابط يوتيوب أو MP4. يوتيوب يفتح في نافذة منبثقة. يظهر زر ▶ فقط إن وُجد الرابط.",
  },
  deliveryTitleEn: {
    sectionAr: "قسم التسليم (الخلفية الخضراء)",
    helpAr: "عنوان كبير مثل DELIVERY. يُقسّم بصرياً لعرض حرفين في سطر منفصل.",
  },
  deliveryTitleAr: {
    sectionAr: "قسم التسليم",
    helpAr: "عنوان قسم التسليم بالعربية.",
  },
  deliveryBody1En: {
    sectionAr: "قسم التسليم — العمود الأيسر",
    helpAr: "الفقرة الأولى بجانب زر الفيديو.",
  },
  deliveryBody1Ar: {
    sectionAr: "قسم التسليم",
    helpAr: "الفقرة الأولى بالعربية.",
  },
  deliveryBody2En: {
    sectionAr: "قسم التسليم",
    helpAr: "فقرة ثانوية أصغر تحت الأولى.",
  },
  deliveryBody2Ar: {
    sectionAr: "قسم التسليم",
    helpAr: "الفقرة الثانوية بالعربية.",
  },
  deliveryVideoUrl: {
    sectionAr: "قسم التسليم — زر التشغيل",
    helpAr: "فيديو يوتيوب أو MP4 يفتح في نافذة عند الضغط على ▶ في قسم التسليم.",
  },
  deliveryCtaEn: {
    sectionAr: "قسم التسليم — زر التحميل",
    helpAr: "نص زر تحميل الكتيب بالإنجليزية.",
  },
  deliveryCtaAr: {
    sectionAr: "قسم التسليم",
    helpAr: "نص الزر بالعربية.",
  },
  brochureUrl: {
    sectionAr: "قسم التسليم — رابط الزر",
    helpAr: "رابط PDF أو صفحة الكتيب. يفتح في تبويب جديد.",
  },
  panoramicBackgroundVideoUrl: {
    sectionAr: "شريط الفيديو بين التسليم والمعرض",
    helpAr: "فيديو بعرض كامل يعمل تلقائياً بدون زر تشغيل. يوتيوب أو MP4.",
  },
  panoramicImageUrl: {
    sectionAr: "شريط الفيديو — بوستر",
    helpAr: "صورة غلاف تظهر قبل تحميل فيديو MP4. اختياري ليوتيوب.",
  },
  designGalleryImages: {
    sectionAr: "معرض التصميم — صور التصميم",
    helpAr: "صور التصميم تظهر أولاً في صف الصور الأفقي. أضف الروابط واحداً واحداً.",
  },
  galleryImages: {
    sectionAr: "معرض الساحل — صور المعرض",
    helpAr: "صور إضافية في المعرض بعد صور التصميم. يُفضّل 5 صور على الأقل.",
  },
  coastalTitleEn: {
    sectionAr: "معرض الساحل — العنوان",
    helpAr: "عنوان كبير أعلى المعرض.",
  },
  coastalTitleAr: {
    sectionAr: "معرض الساحل",
    helpAr: "عنوان المعرض بالعربية.",
  },
  coastalCol1En: {
    sectionAr: "معرض الساحل — عمودان نصيان",
    helpAr: "العمود الأول من النص فوق شبكة الصور.",
  },
  coastalCol1Ar: {
    sectionAr: "معرض الساحل",
    helpAr: "العمود الأول بالعربية.",
  },
  coastalCol2En: {
    sectionAr: "معرض الساحل",
    helpAr: "العمود الثاني من النص.",
  },
  coastalCol2Ar: {
    sectionAr: "معرض الساحل",
    helpAr: "العمود الثاني بالعربية.",
  },
  coastalCol3En: {
    sectionAr: "معرض الساحل (أسفل الصور — معطّل حالياً في الواجهة)",
    helpAr: "نص إضافي تحت المعرض. محفوظ للاستخدام لاحقاً.",
  },
  coastalCol3Ar: {
    sectionAr: "معرض الساحل",
    helpAr: "نفس الحقل بالعربية.",
  },
  coastalHighlightEn: {
    sectionAr: "معرض الساحل (اقتباس — معطّل حالياً)",
    helpAr: "اقتباس مميز بخط مائل. محفوظ للاستخدام لاحقاً.",
  },
  coastalHighlightAr: {
    sectionAr: "معرض الساحل",
    helpAr: "الاقتباس بالعربية.",
  },
  approachColumns: {
    sectionAr: "أعمدة النهج — قبل الخريطة",
    helpAr: "شبكة أعمدة: فقرة عادية أو خطوة برقم وعنوان كبير.",
  },
  mapImageUrl: {
    sectionAr: "خريطة الموقع — خلفية",
    helpAr: "صورة الخريطة أو الموقع بعرض كامل.",
  },
  mapLogoUrl: {
    sectionAr: "خريطة الموقع — البطاقة البيضاء",
    helpAr: "شعار يظهر داخل البطاقة فوق الخريطة.",
  },
  locationLabelEn: {
    sectionAr: "خريطة الموقع — تسمية البطاقة",
    helpAr: "تسمية صغيرة مثل Location.",
  },
  locationLabelAr: {
    sectionAr: "خريطة الموقع",
    helpAr: "التسمية بالعربية.",
  },
  locationBlurbEn: {
    sectionAr: "خريطة الموقع — نص البطاقة",
    helpAr: "وصف قصير تحت اسم المشروع. إن تُرك فارغاً يُستخدم الموقع.",
  },
  locationBlurbAr: {
    sectionAr: "خريطة الموقع",
    helpAr: "الوصف بالعربية.",
  },
  luxuryTitleEn: {
    sectionAr: "قسم المميزات — العنوان",
    helpAr: "عنوان فوق بطاقات المميزات.",
  },
  luxuryTitleAr: {
    sectionAr: "قسم المميزات",
    helpAr: "العنوان بالعربية.",
  },
  luxuryCol1En: {
    sectionAr: "قسم المميزات — مقدمة",
    helpAr: "عمود نصي قبل شبكة البطاقات.",
  },
  luxuryCol1Ar: {
    sectionAr: "قسم المميزات",
    helpAr: "العمود الأول بالعربية.",
  },
  luxuryCol2En: {
    sectionAr: "قسم المميزات",
    helpAr: "العمود الثاني من المقدمة.",
  },
  luxuryCol2Ar: {
    sectionAr: "قسم المميزات",
    helpAr: "العمود الثاني بالعربية.",
  },
  amenities: {
    sectionAr: "قسم المميزات — شبكة البطاقات",
    helpAr: "بطاقات 3×2: عنوان، وصف، لون/صورة اختيارية.",
  },
  materialColorsIntroImageUrl: {
    sectionAr: "ألوان المواد — البطاقة الأولى",
    helpAr: "صورة داخلية اختيارية تظهر كأول بطاقة قبل عينات الألوان.",
  },
  materialColors: {
    sectionAr: "ألوان المواد",
    helpAr: "بطاقات لون: فئة، اسم، HEX، رموز RAL و NCS.",
  },
  creditsTitleEn: {
    sectionAr: "الاعتمادات — العمود الأول",
    helpAr: "عنوان القسم مثل Credits. افتراضي إن تُرك فارغاً.",
  },
  creditsTitleAr: {
    sectionAr: "الاعتمادات",
    helpAr: "عنوان القسم بالعربية.",
  },
  projectCredits: {
    sectionAr: "الاعتمادات — الأعمدة",
    helpAr: "كل عمود: فئة (إدارة، تصميم…) وقائمة أدوار وأسماء.",
  },
  facilitiesTitleEn: {
    sectionAr: "قائمة المرافق",
    helpAr: "عنوان القائمة متعددة الأعمدة.",
  },
  facilitiesTitleAr: {
    sectionAr: "قائمة المرافق",
    helpAr: "العنوان بالعربية.",
  },
  facilitiesEn: {
    sectionAr: "قائمة المرافق",
    helpAr: "عنصر واحد في كل سطر بالإنجليزية.",
  },
  facilitiesAr: {
    sectionAr: "قائمة المرافق",
    helpAr: "عنصر واحد في كل سطر بالعربية.",
  },
  closingImageUrl: {
    sectionAr: "صورة الإغلاق — قبل Say Hi",
    helpAr: "صورة بانورامية أخيرة بعرض كامل قبل قسم التواصل.",
  },
  ctaEyebrowEn: {
    sectionAr: "Say Hi — السطر العلوي",
    helpAr: "نص صغير فوق العنوان مثل: WE WOULD LOVE TO HEAR FROM YOU.",
  },
  ctaEyebrowAr: {
    sectionAr: "Say Hi",
    helpAr: "السطر العلوي بالعربية.",
  },
  ctaTitleEn: {
    sectionAr: "Say Hi — العنوان الكبير",
    helpAr: "عنوان ضخم مثل SAY HI.",
  },
  ctaTitleAr: {
    sectionAr: "Say Hi",
    helpAr: "العنوان بالعربية.",
  },
  ctaBodyEn: {
    sectionAr: "Say Hi — الوصف",
    helpAr: "فقرة في منتصف القسم.",
  },
  ctaBodyAr: {
    sectionAr: "Say Hi",
    helpAr: "الوصف بالعربية.",
  },
  ctaButtonEn: {
    sectionAr: "Say Hi — الزر",
    helpAr: "نص الزر مثل DROP US A LINE.",
  },
  ctaButtonAr: {
    sectionAr: "Say Hi",
    helpAr: "نص الزر بالعربية.",
  },
  ctaWhatsappUrl: {
    sectionAr: "Say Hi — رابط الزر",
    helpAr: "رابط واتساب أو رقم. إن تُرك فارغاً يوجّه لصفحة اتصل بنا.",
  },
};
