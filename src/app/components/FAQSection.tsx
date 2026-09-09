'use client';

import { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';

export type FAQCategory =
  | 'All Questions'
  | 'Vision & Lenses'
  | 'Cost & Insurance'
  | 'Procedure & Recovery'
  | 'Surgeons & Facilities';

export interface FAQItem {
  id: string;
  question: string;
  category: Exclude<FAQCategory, 'All Questions'>;
  icon: string;
  answer: string;
  takeaway: string;
}

const allFAQs: FAQItem[] = [
  {
    id: 'glare-halos',
    question: "I'm worried about glare and halos, especially when driving at night.",
    category: 'Vision & Lenses',
    icon: 'EyeIcon',
    answer:
      'This is the most common concern patients share with us. It is why our surgeons frequently recommend the Clareon Vivity lens for active drivers. Unlike older multifocal lenses that divide light rays, Vivity uses non-diffractive optics. In clinical trials, patients experienced night glare levels virtually identical to standard single-vision lenses. Every eye is unique, which is why Dr. Marano and Dr. Raouf review your corneal measurements carefully before making any recommendation.',
    takeaway:
      'Clareon Vivity delivers night glare and halo rates virtually identical to standard monofocal lenses.',
  },
  {
    id: 'cost-upgrade',
    question: 'Why should I consider paying out-of-pocket for premium lenses?',
    category: 'Cost & Insurance',
    icon: 'SparklesIcon',
    answer:
      'Cataract surgery is a once-in-a-lifetime procedure. The lens you choose permanently replaces your cloudy natural lens. Standard lenses leave you dependent on reading glasses for phones, menus, computers, and hobbies. Choosing a premium lens gives you continuous, multi-distance focus every single day without searching for glasses. The upgrade also includes precision 3D mapping and the LENSAR femtosecond laser system. We offer interest-free CareCredit financing and HSA/FSA payment options to keep monthly payments easy.',
    takeaway:
      'A permanent, once-in-a-lifetime investment in continuous multi-distance vision without reading glasses.',
  },
  {
    id: 'regret-exchange',
    question: "What if I don't like the result? Can the lens be changed?",
    category: 'Vision & Lenses',
    icon: 'ArrowPathIcon',
    answer:
      'Lens exchanges are possible, but they are exceptionally rare. Across clinical studies, 99% of premium lens recipients state they would make the same choice again. Our surgeons prevent disappointment before surgery begins by performing comprehensive corneal topography and discussing your daily routine. If your eye anatomy is not an ideal fit for a premium lens, Dr. Marano and Dr. Raouf will clearly advise against it.',
    takeaway:
      '99% of patients would choose a premium lens again; candidacy is verified through 3D topography beforehand.',
  },
  {
    id: 'insurance-coverage',
    question: 'My insurance covers the basic lens. Why should I pay more?',
    category: 'Cost & Insurance',
    icon: 'ShieldCheckIcon',
    answer:
      'Medicare and private insurance cover standard cataract removal with a monofocal lens. A monofocal lens gives you clear vision at one fixed distance, usually far away, so you still require reading glasses for your phone, computer, and close-up tasks every day. A premium lens restores a broader depth of focus so you can navigate your day without reaching for glasses. The out-of-pocket fee covers that added visual independence, while your insurance still pays for the core surgery and facility fees.',
    takeaway:
      'Insurance covers 100% of the medical procedure; the upgrade covers permanent daily reading freedom.',
  },
  {
    id: 'safety-complications',
    question: 'Will premium lenses make my surgery more complicated or risky?',
    category: 'Procedure & Recovery',
    icon: 'CheckBadgeIcon',
    answer:
      'No. The surgery is the same gentle, 10-minute outpatient procedure performed with numbing eye drops. The only difference is the optical design of the lens placed inside your eye. Our board-certified surgeons, Dr. Matthew Marano Jr. and Dr. Sherief Raouf, bring over four decades of combined surgical excellence and fellowship-trained precision.',
    takeaway:
      'The exact same gentle 10-minute outpatient technique performed by fellowship-trained microsurgeons.',
  },
  {
    id: 'surgeon-care',
    question: 'Do Dr. Marano and Dr. Raouf perform the surgery themselves?',
    category: 'Surgeons & Facilities',
    icon: 'UserGroupIcon',
    answer:
      'Yes. Dr. Matthew Marano Jr., MD and Dr. Sherief Raouf, MD personally perform every cataract surgery. You will meet directly with your surgeon during your consultation, and they will personally perform your procedure and oversee your post-operative care.',
    takeaway:
      '100% direct surgeon care — your surgeon examines your eyes, maps your cornea, and performs your operation.',
  },
  {
    id: 'surgery-location',
    question: 'Where is the cataract surgery performed?',
    category: 'Surgeons & Facilities',
    icon: 'BuildingOfficeIcon',
    answer:
      'Our outpatient cataract microsurgeries are performed at the accredited, state-of-the-art Ridgedale Surgery Center in Cedar Knolls, NJ, utilizing the LENSAR ALLY femtosecond laser system. All preliminary consultations, 3D corneal biometry measurements, and post-operative follow-up appointments take place at your preferred local Marano Eye Care office in Livingston, Denville, or Newark.',
    takeaway:
      'Surgery at the accredited Ridgedale Surgery Center; consults and post-ops at your local Marano office.',
  },
  {
    id: 'recovery-timeline',
    question: 'How long is recovery, and when can I return to my hobbies?',
    category: 'Procedure & Recovery',
    icon: 'ClockIcon',
    answer:
      "Most patients return to light daily activities within 24 to 48 hours. Distance vision typically clears rapidly first, while fine reading vision naturally lags behind by about two weeks as your brain neuroadapts to the new premium optics. High-performance activities like golf, tennis, and cycling can typically be resumed after 1 to 2 weeks following your surgeon's post-operative evaluation.",
    takeaway:
      'Normal daily routines resume in 24–48 hours; sports and hobbies after 1–2 weeks following evaluation.',
  },
  {
    id: 'pain-anesthesia',
    question: 'Will I feel any pain during or after surgery?',
    category: 'Procedure & Recovery',
    icon: 'HeartIcon',
    answer:
      'No. Numbing eye drops are used with no needles, no injections, and no general anesthesia. Most patients describe feeling light pressure for a few minutes, but no pain. You remain awake and comfortable throughout.',
    takeaway:
      'Topical numbing drops only — zero needles, zero stitches, and zero general anesthesia.',
  },
  {
    id: 'hsa-fsa',
    question: 'Can I use HSA or FSA funds for my premium lens upgrade?',
    category: 'Cost & Insurance',
    icon: 'CreditCardIcon',
    answer:
      'Yes. Both HSA and FSA funds can be used for your premium upgrade. We also offer CareCredit® to break the cost into interest-free monthly payments.',
    takeaway:
      '100% eligible for pre-tax HSA and FSA dollars, plus 0% interest 24-month CareCredit financing options.',
  },
  {
    id: 'dry-eyes',
    question: 'What if I have dry eyes or other pre-existing eye conditions?',
    category: 'Procedure & Recovery',
    icon: 'MagnifyingGlassIcon',
    answer:
      'Conditions like dry eye, macular changes, or a history of LASIK affect which lens is safest and most effective for you. Dr. Marano and Dr. Raouf perform a full biometric evaluation at consultation and will only recommend premium lenses when the clinical data supports an excellent outcome.',
    takeaway:
      'We conduct advanced biometric and tear film analysis before recommending any premium technology.',
  },
  {
    id: 'cataract-science',
    question: 'How do cataracts form and progress inside the eye?',
    category: 'Vision & Lenses',
    icon: 'AcademicCapIcon',
    answer:
      'A cataract forms inside your natural crystalline lens as specialized proteins (crystallins) break down, denature, and clump together. Initially, this causes subtle micro-clouding and glare. As protein compaction accelerates, the lens turns noticeably yellow, absorbing blue light and muting color vibrancy. In advanced stages, it turns dark brown and opaque, severely obstructing light from reaching your retina. Cataracts only progress and never reverse on their own.',
    takeaway:
      'Cataracts are progressive protein clumping; surgical lens replacement is the only definitive cure.',
  },
  {
    id: 'lens-longevity',
    question: 'How does cataract surgery work, and will the new lens prescription ever change?',
    category: 'Vision & Lenses',
    icon: 'SparklesIcon',
    answer:
      'During a gentle 10-minute outpatient procedure with numbing eye drops, Dr. Marano or Dr. Raouf removes your cloudy natural cataractous lens and replaces it with a crystal-clear acrylic intraocular lens (IOL). High-purity medical acrylic does not age, degrade, or develop cataracts again. The lens contains a customized optical prescription engineered to remain permanently stable for the rest of your life.',
    takeaway:
      'Medical-grade acrylic never develops cataracts again and maintains a permanently stable optical power.',
  },
  {
    id: 'astigmatism-toric',
    question: 'What if I have astigmatism? Do Toric lenses cost more?',
    category: 'Vision & Lenses',
    icon: 'AdjustmentsHorizontalIcon',
    answer:
      'Toric lenses are specialty optics designed to correct astigmatism (an irregular curve in your cornea) during cataract surgery. If you have astigmatism and do not choose a Toric lens, you will still need glasses for distance vision. While most clinics charge extra for Toric astigmatism correction, at Marano Eye Care, all our premium lenses (Clareon Vivity, PanOptix Pro, and TECNIS PureSee) include the Toric version at no additional charge beyond the standard premium upgrade. (Note: While toric versions of premium lenses carry no additional upgrade fee, a standard monofocal toric lens does involve a higher out-of-pocket cost compared to a standard non-toric monofocal lens).',
    takeaway:
      'Toric astigmatism correction is bundled into all premium lenses at no additional upgrade fee.',
  },
];

const categoryTabs: { label: FAQCategory; count: number }[] = [
  { label: 'All Questions', count: allFAQs.length },
  {
    label: 'Vision & Lenses',
    count: allFAQs.filter((f) => f.category === 'Vision & Lenses').length,
  },
  {
    label: 'Cost & Insurance',
    count: allFAQs.filter((f) => f.category === 'Cost & Insurance').length,
  },
  {
    label: 'Procedure & Recovery',
    count: allFAQs.filter((f) => f.category === 'Procedure & Recovery').length,
  },
  {
    label: 'Surgeons & Facilities',
    count: allFAQs.filter((f) => f.category === 'Surgeons & Facilities').length,
  },
];

function FAQItemCard({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`relative group rounded-2xl transition-all duration-400 overflow-hidden ${
        isOpen
          ? 'bg-gradient-to-b from-[#171a25] via-[#12141d] to-[#0c0e14] border border-primary/45 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(197,160,89,0.12),inset_0_1px_1px_rgba(255,255,255,0.12)] -translate-y-0.5'
          : 'bg-gradient-to-b from-white/[0.03] to-white/[0.008] border border-white/[0.08] hover:border-primary/35 hover:bg-white/[0.045] hover:shadow-[0_14px_32px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:-translate-y-0.5'
      }`}
    >
      {/* Specular Top Light Hairline */}
      <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-50 group-hover:via-primary/50 group-hover:opacity-100 transition-all duration-500" />

      {/* Left Active Jewel Accent Indicator */}
      {isOpen && (
        <div className="absolute left-0 top-3 bottom-3 w-[3.5px] rounded-r-full bg-gradient-to-b from-primary via-accent to-primary shadow-[0_0_14px_rgba(197,160,89,0.9)]" />
      )}

      {/* Ambient Glow Orb */}
      <div
        className={`absolute -top-20 -right-20 w-44 h-44 rounded-full pointer-events-none blur-3xl transition-opacity duration-500 ${
          isOpen
            ? 'bg-primary/[0.14] opacity-100'
            : 'bg-primary/[0.04] opacity-0 group-hover:opacity-100'
        }`}
      />

      <button
        type="button"
        onClick={onToggle}
        id={`faq-btn-${item.id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-ans-${item.id}`}
        className="w-full relative flex items-start gap-4 p-5 sm:p-6 text-left touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
      >
        {/* Sculptural Icon Vessel */}
        <div
          aria-hidden="true"
          className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 mt-0.5 ${
            isOpen
              ? 'bg-gradient-to-br from-primary/30 via-primary/15 to-[#12141c] border-primary/60 text-primary shadow-[0_0_22px_rgba(197,160,89,0.4)]'
              : 'bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent border-white/10 text-muted-foreground group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:shadow-[0_0_16px_rgba(197,160,89,0.2)]'
          }`}
        >
          <Icon name={item.icon} size={20} />
        </div>

        {/* Question Header & Category */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-primary bg-primary/[0.1] px-2.5 py-0.5 rounded-full border border-primary/25 shadow-sm">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isOpen ? 'bg-primary shadow-[0_0_6px_rgba(197,160,89,1)]' : 'bg-primary/60'
                }`}
              />
              {item.category}
            </span>
          </div>
          <h3 className="text-base sm:text-lg md:text-[1.1rem] font-semibold text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
            {item.question}
          </h3>
        </div>

        {/* Dial Button */}
        <span
          className={`shrink-0 mt-1 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'border-primary bg-primary text-[#050608] rotate-180 shadow-[0_0_16px_rgba(197,160,89,0.5)]'
              : 'border-white/12 bg-white/[0.03] text-muted-foreground group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/10'
          }`}
        >
          <Icon name="ChevronDownIcon" size={16} className={isOpen ? 'stroke-[2.5]' : 'stroke-2'} />
        </span>
      </button>

      {/* Expandable Body */}
      <div
        id={`faq-ans-${item.id}`}
        role="region"
        aria-labelledby={`faq-btn-${item.id}`}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pt-0 sm:pl-[4.5rem] lg:pl-[4.75rem]">
            {/* Subtle Hairline Divider */}
            <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 via-white/10 to-transparent mb-4" />

            {/* Answer Text */}
            <p className="text-base sm:text-[1.03rem] text-slate-200/95 leading-relaxed font-normal">
              {item.answer}
            </p>

            {/* Uniform Clinical Takeaway Card */}
            <div className="mt-4 flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-primary/[0.12] via-primary/[0.05] to-transparent border border-primary/25 shadow-sm">
              <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(197,160,89,0.3)]">
                <Icon name="CheckIcon" size={12} className="text-primary stroke-[2.5]" />
              </span>
              <div>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider font-extrabold text-primary mb-0.5">
                  Surgeon Takeaway
                </p>
                <p className="text-xs sm:text-sm font-medium text-foreground/95 leading-relaxed">
                  {item.takeaway}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('All Questions');
  const [openFAQId, setOpenFAQId] = useState<string | null>('glare-halos');

  const filteredFAQs = useMemo(() => {
    if (activeCategory === 'All Questions') return allFAQs;
    return allFAQs.filter((faq) => faq.category === activeCategory);
  }, [activeCategory]);

  const handleToggle = (id: string, question: string) => {
    const isOpening = openFAQId !== id;
    setOpenFAQId(isOpening ? id : null);
    if (isOpening) {
      trackEvent({
        action: 'faq_expand',
        category: 'Engagement',
        label: question,
      });
    }
  };

  const handleCategoryChange = (category: FAQCategory) => {
    setActiveCategory(category);
    trackEvent({
      action: 'faq_category_filter',
      category: 'Engagement',
      label: category,
    });
  };

  // Dynamically generate FAQ Schema Markup for Google Rich Results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden bg-[#090b10]">
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Atmospheric Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(197,160,89,0.035)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 grid-lines-bg opacity-15" />
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-primary/[0.025] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-blue-500/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
          {/* Left Sticky Sidebar */}
          <div className="w-full lg:w-[30%] lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                Uncompromising Transparency
              </p>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-light text-foreground leading-[1.15] mb-5 sm:mb-6">
              Every Concern{' '}
              <span className="font-semibold text-gradient-primary block sm:inline">
                Answered Honestly.
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-8">
              These are the candid questions our surgeons hear every week. We believe you should
              arrive at your consultation empowered with clarity, not burdened with unanswered
              fears.
            </p>

            {/* Surgeon Direct Care Advisory Card */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#141722]/90 to-[#0e1017]/90 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] mb-6 overflow-hidden">
              <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                  <Icon name="SparklesIcon" size={16} />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Surgeon Direct Biometric Review
                </p>
              </div>
              <p className="text-sm text-slate-200/90 leading-relaxed mb-5">
                Every eye anatomy and lifestyle is unique. Have your corneal topography evaluated
                directly by Dr. Marano or Dr. Raouf with zero high-pressure sales.
              </p>
              <a
                href="#booking"
                onClick={() =>
                  trackEvent({
                    action: 'faq_booking_click',
                    category: 'Engagement',
                    label: 'Book a Free Consultation',
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-[#040506] rounded-xl text-sm font-semibold hover:bg-accent transition-all hover:scale-[1.01] active:scale-[0.98] touch-manipulation min-h-[48px] shadow-[0_4px_16px_rgba(197,160,89,0.25),0_2px_4px_rgba(0,0,0,0.15)] btn-shimmer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                Schedule Personal Consultation
                <Icon name="ArrowRightIcon" size={16} />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon
                    key={i}
                    name="StarIcon"
                    variant="solid"
                    size={14}
                    className="text-primary -ml-0.5 first:ml-0"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                40,000+ successful procedures · 15× NJ Top Doctor
              </p>
            </div>
          </div>

          {/* Right: Unified Luxury FAQ List */}
          <div className="w-full lg:w-[70%]">
            {/* Category Filter Buttons — Arrayed Horizontally */}
            <div
              className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6"
              role="tablist"
              aria-label="FAQ Categories"
            >
              {categoryTabs.map((tab) => {
                const isSelected = activeCategory === tab.label;
                return (
                  <button
                    key={tab.label}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleCategoryChange(tab.label)}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 touch-manipulation min-h-[36px] sm:min-h-[38px] ${
                      isSelected
                        ? 'bg-primary text-[#040506] shadow-[0_4px_14px_rgba(197,160,89,0.35)] scale-[1.02]'
                        : 'bg-white/[0.04] text-muted-foreground border border-white/10 hover:text-foreground hover:bg-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                        isSelected
                          ? 'bg-[#040506]/20 text-[#040506]'
                          : 'bg-white/10 text-muted-foreground'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Uniform Beautiful FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <FAQItemCard
                  key={faq.id}
                  item={faq}
                  isOpen={openFAQId === faq.id}
                  onToggle={() => handleToggle(faq.id, faq.question)}
                />
              ))}
            </div>

            {/* Direct Assistance Micro-Card */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-primary/[0.08] via-white/[0.02] to-transparent border border-primary/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
              <div>
                <p className="text-sm font-bold text-foreground">
                  Have a specific question about your prescription or insurance?
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Our surgical coordinators in Livingston, Denville, and Newark answer calls
                  directly.
                </p>
              </div>
              <a
                href="tel:9733220100"
                onClick={() =>
                  trackEvent({
                    action: 'faq_phone_click',
                    category: 'Engagement',
                    label: '(973) 322-0100',
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-primary/40 bg-primary/15 text-primary text-xs font-bold hover:bg-primary/25 transition-all whitespace-nowrap min-h-[44px] shadow-sm hover:scale-[1.02]"
              >
                <Icon name="PhoneIcon" size={14} />
                (973) 322-0100
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
