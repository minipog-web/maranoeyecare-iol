'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { trackEvent } from '@/lib/gtag';

interface FAQItem {
  question: string;
  concern: string;
  answer: string;
  highlight?: string;
}

const objectionFAQs: FAQItem[] = [
  {
    question: "I'm worried about glare and halos, especially when driving at night.",
    concern: 'Night Vision',
    answer:
      'This is the most common concern patients share with us. It is why Dr. Marano frequently recommends the Clareon Vivity lens for active drivers. Unlike older multifocal lenses that divide light rays, Vivity uses non-diffractive optics. In clinical trials, patients experienced night glare levels virtually identical to standard single-vision lenses. Every eye is unique, which is why Dr. Marano reviews your corneal measurements carefully before making any recommendation.',
    highlight: 'Vivity: halo rates nearly identical to standard monofocal',
  },
  {
    question: 'Why should I consider paying out-of-pocket for premium lenses?',
    concern: 'Cost',
    answer:
      'Cataract surgery is a once-in-a-lifetime procedure. The lens you choose permanently replaces your cloudy natural lens. Standard lenses leave you dependent on reading glasses for phones, menus, computers, and hobbies. Choosing a premium lens gives you continuous, multi-distance focus every single day without searching for glasses. The upgrade also includes precision 3D mapping and the LENSAR femtosecond laser system. We offer interest-free CareCredit financing and HSA/FSA payment options to keep monthly payments easy.',
    highlight:
      'Investment in lifetime visual clarity · LENSAR laser precision included · HSA/FSA eligible',
  },
  {
    question: "What if I don't like the result? Can the lens be changed?",
    concern: 'Regret Risk',
    answer:
      'Lens exchanges are possible, but they are exceptionally rare. Across clinical studies, 99% of premium lens recipients state they would make the same choice again. Dr. Marano prevents disappointment before surgery begins by performing comprehensive corneal topography and discussing your daily routine. If your eye anatomy is not an ideal fit for a premium lens, he will clearly advise against it.',
    highlight: '99% of patients would choose a premium lens again',
  },
  {
    question: 'My insurance covers the basic lens. Why should I pay more?',
    concern: 'Insurance',
    answer:
      'Medicare and private insurance cover standard cataract removal with a monofocal lens. A monofocal lens gives you clear vision at one fixed distance, usually far away, so you still require reading glasses for your phone, computer, and close-up tasks every day. A premium lens restores a broader depth of focus so you can navigate your day without reaching for glasses. The out-of-pocket fee covers that added visual independence, while your insurance still pays for the core surgery and facility fees.',
    highlight: 'Standard lens = glasses for reading. Premium lens = everyday visual freedom.',
  },
  {
    question: 'Will premium lenses make my surgery more complicated or risky?',
    concern: 'Safety',
    answer:
      'No. The surgery is the same gentle, 10-minute outpatient procedure performed with numbing eye drops. The only difference is the optical design of the lens placed inside your eye. Dr. Marano has performed over 40,000 successful eye surgeries and has been named a New Jersey Top Doctor for 15 consecutive years.',
    highlight: 'Same 10-min procedure · Thousands of successful outcomes · No general anesthesia',
  },
];

const proceduralFAQs: FAQItem[] = [
  {
    question: 'Does Dr. Marano perform the surgery himself?',
    concern: '',
    answer:
      'Yes. Dr. Matthew Marano Jr., MD performs every cataract surgery personally. You will meet with him at consultation, and he will be your surgeon on the day of your procedure.',
  },
  {
    question: 'How long is recovery, and when can I return to my hobbies?',
    concern: '',
    answer:
      "Most patients return to light daily activities within 24 to 48 hours. Distance vision typically clears rapidly first, while fine reading vision naturally lags behind by about two weeks as your brain neuroadapts to the new premium optics. High-performance activities like golf, tennis, and cycling can typically be resumed after 1 to 2 weeks following Dr. Marano's post-operative evaluation.",
  },
  {
    question: 'Will I feel any pain?',
    concern: '',
    answer:
      'No. Numbing eye drops are used with no needles, no injections, and no general anesthesia. Most patients describe feeling light pressure for a few minutes, but no pain. You remain awake and comfortable throughout.',
  },
  {
    question: 'Can I use HSA or FSA funds?',
    concern: '',
    answer:
      'Yes. Both HSA and FSA funds can be used for your premium upgrade. We also offer CareCredit® to break the cost into interest-free monthly payments.',
  },
  {
    question: 'What if I have dry eyes or other eye conditions?',
    concern: '',
    answer:
      'Conditions like dry eye, macular changes, or a history of LASIK affect which lens is safest and most effective for you. Dr. Marano performs a full biometric evaluation at consultation and will only recommend premium lenses when the clinical data supports an excellent outcome.',
  },
  {
    question: 'What if I have astigmatism? Do Toric lenses cost more?',
    concern: '',
    answer:
      'Toric lenses are specialty optics designed to correct astigmatism (an irregular curve in your cornea) during cataract surgery. If you have astigmatism and do not choose a Toric lens, you will still need glasses for distance vision. While most clinics charge extra for Toric astigmatism correction, at Marano Eye Care, all our premium lenses (Clareon Vivity, PanOptix Pro, and TECNIS PureSee) include the Toric version at no additional charge beyond the standard premium upgrade. (Note: While toric versions of premium lenses carry no additional upgrade fee, a standard monofocal toric lens does involve a higher out-of-pocket cost compared to a standard non-toric monofocal lens).',
  },
];

function FAQItemRow({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const delays = ['delay-75', 'delay-150', 'delay-300', 'delay-450', 'delay-600'];
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 animate-fade-up fill-both ${delays[index % delays.length]} ${
        isOpen
          ? 'border-white/10 bg-[#13151b] shadow-[0_16px_36px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.07)] -translate-y-0.5'
          : 'border-border bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] hover:shadow-[0_12px_24px_rgba(0,0,0,0.45)] hover:-translate-y-0.5'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 sm:p-6 text-left touch-manipulation group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        {...{ 'aria-expanded': isOpen }}
      >
        <span aria-hidden="true" className="text-xl mt-0.5 shrink-0 select-none">
          {['🌙', '💰', '🔄', '🛡️', '✅'][index] ?? '❓'}
        </span>
        <div className="flex-1 min-w-0">
          {item.concern && (
            <span className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">
              {item.concern}
            </span>
          )}
          <p className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
            {item.question}
          </p>
        </div>
        <span
          className={`shrink-0 mt-0.5 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'border-primary/40 bg-primary/10 rotate-45'
              : 'border-border group-hover:border-primary/40'
          }`}
        >
          <Icon
            name="PlusIcon"
            size={16}
            className={isOpen ? 'text-primary' : 'text-muted-foreground'}
          />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[3.75rem] sm:pl-[4.25rem]">
            <p className="text-base sm:text-lg text-foreground/95 leading-relaxed mb-3.5 font-normal">
              {item.answer}
            </p>
            {item.highlight && (
              <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
                <p className="text-sm sm:text-base font-bold text-primary leading-relaxed">
                  {item.highlight}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProceduralFAQRow({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const delays = ['delay-75', 'delay-150', 'delay-200', 'delay-300', 'delay-450', 'delay-600'];
  return (
    <div
      className={`border-b border-border/50 last:border-0 transition-colors animate-fade-up fill-both ${delays[index % delays.length]} ${
        isOpen ? 'border-primary/20' : ''
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left touch-manipulation group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        {...{ 'aria-expanded': isOpen }}
      >
        <p className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {item.question}
        </p>
        <span
          className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <Icon name="ChevronDownIcon" size={18} className="text-primary" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-base sm:text-lg text-foreground/95 leading-relaxed pb-4 font-normal">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openObjection, setOpenObjection] = useState<number | null>(0);
  const [openProcedural, setOpenProcedural] = useState<number | null>(null);

  const handleObjectionToggle = (index: number, question: string) => {
    const isOpening = openObjection !== index;
    setOpenObjection(isOpening ? index : null);
    if (isOpening) {
      trackEvent({
        action: 'faq_expand',
        category: 'Engagement',
        label: question,
      });
    }
  };

  const handleProceduralToggle = (index: number, question: string) => {
    const isOpening = openProcedural !== index;
    setOpenProcedural(isOpening ? index : null);
    if (isOpening) {
      trackEvent({
        action: 'faq_expand',
        category: 'Engagement',
        label: question,
      });
    }
  };

  // Dynamically generate FAQ Schema Markup for Google Rich Results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      ...objectionFAQs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
      ...proceduralFAQs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    ],
  };

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden bg-[#0e1118]">
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_10%_30%,rgba(197,160,89,0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 grid-lines-bg opacity-15" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20 mb-8 sm:mb-12">
          <div className="w-full lg:w-2/5 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3">
              Common Questions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-5 sm:mb-6">
              Every Concern{' '}
              <span className="font-semibold text-gradient-primary">Answered Honestly.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-8 md:hidden lg:block">
              These are the questions Dr. Marano hears most often. He&apos;d rather you come in
              already informed than arrive with unanswered fears.
            </p>

            {/* CTA */}
            <a
              href="#booking"
              onClick={() =>
                trackEvent({
                  action: 'faq_booking_click',
                  category: 'Engagement',
                  label: 'Book a Free Consultation',
                })
              }
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 bg-primary text-[#040506] rounded-xl text-sm font-semibold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[52px] shadow-[0_4px_16px_rgba(197,160,89,0.25),0_2px_4px_rgba(0,0,0,0.15)] btn-shimmer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              Book a Free Consultation
              <Icon name="ArrowRightIcon" size={16} />
            </a>

            {/* Trust micro-badge */}
            <div className="flex items-center gap-3 mt-6">
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

          {/* Right: Objection FAQs */}
          <div className="w-full lg:w-3/5 space-y-3">
            {objectionFAQs.map((faq, i) => (
              <FAQItemRow
                key={i}
                item={faq}
                index={i}
                isOpen={openObjection === i}
                onToggle={() => handleObjectionToggle(i, faq.concern || faq.question)}
              />
            ))}
          </div>
        </div>

        {/* Patients Also Ask — procedural */}
        <div className="glass-card border border-border rounded-3xl p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon name="ChatBubbleLeftRightIcon" size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Patients Also Ask
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Quick answers to common procedural questions
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-10 sm:gap-x-16">
            <div>
              {proceduralFAQs.slice(0, 3).map((faq, i) => (
                <ProceduralFAQRow
                  key={i}
                  item={faq}
                  index={i}
                  isOpen={openProcedural === i}
                  onToggle={() => handleProceduralToggle(i, faq.question)}
                />
              ))}
            </div>
            <div>
              {proceduralFAQs.slice(3).map((faq, i) => (
                <ProceduralFAQRow
                  key={i + 3}
                  item={faq}
                  index={i + 3}
                  isOpen={openProcedural === i + 3}
                  onToggle={() => handleProceduralToggle(i + 3, faq.question)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
