'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQItem {
  question: string;
  concern: string;
  answer: string;
  highlight?: string;
}

const objectionFAQs: FAQItem[] = [
  {
    question: "I'm worried about halos and glare — especially night driving.",
    concern: 'Night Vision',
    answer:
      "This is the #1 concern we hear — and it's why Dr. Marano recommends the Clareon Vivity for most night drivers. Unlike older diffractive lenses, Vivity uses non-diffractive X-WAVE™ technology that doesn't split light. Clinical data shows halo rates nearly identical to a standard monofocal. Robert D. from Livingston was in the same position: 'Night driving is completely clear.' That said, every patient is different — which is exactly why Dr. Marano reviews your specific eye anatomy before recommending any lens.",
    highlight: 'Vivity: halo rates nearly identical to standard monofocal',
  },
  {
    question: "Is $3,000–$4,000 per eye really worth it?",
    concern: 'Cost',
    answer:
      "Think of it this way: over 20 years, that's less than $0.55 per day for clear vision at every distance. The average American spends over $3,000 on glasses over a decade — and still can't see clearly at arm's length or while driving. Premium IOLs are also HSA and FSA eligible, and we offer CareCredit financing. Most of our patients say it's the best financial decision they've ever made for their quality of life — not just their vision.",
    highlight: 'Less than $0.55/day over 20 years · HSA/FSA eligible · Financing available',
  },
  {
    question: "What if I don't like the result? Can the lens be changed?",
    concern: 'Regret Risk',
    answer:
      "IOL exchange is possible, though uncommon. Here's the reassuring truth: 99% of PanOptix patients say they'd choose the same lens again. Dr. Marano's approach eliminates most regret before it happens — he uses detailed biometry, corneal mapping, and lifestyle interviews to match you to the right lens. He won't recommend a premium lens if your eye anatomy doesn't support a great outcome. That's why our satisfaction rate has remained exceptional across 6,200+ procedures.",
    highlight: '99% of patients would choose the same lens again',
  },
  {
    question: "My insurance covers the basic lens. Why should I pay more?",
    concern: 'Insurance',
    answer:
      "Insurance covers cataract removal — but only at the level of single-focus vision. With a standard monofocal, you'll see clearly at one distance (usually far) and need reading glasses or bifocals for everything else — forever. You'll be trading one pair of glasses for another. Premium IOLs restore your full range of vision. For patients who drive, use a computer, and read daily, that difference is life-changing. The out-of-pocket cost is for the visual freedom the surgery can deliver — not the surgery itself.",
    highlight: 'Standard lens = glasses forever. Premium lens = visual freedom.',
  },
  {
    question: "Will premium lenses make my surgery more complicated or risky?",
    concern: 'Safety',
    answer:
      "No. The surgical procedure is identical regardless of which IOL you choose — a 15-minute microsurgery performed under topical (eye drop) anesthesia. The only thing that changes is what Dr. Marano places in your eye. He has performed this procedure over 6,200 times and has been recognized as New Jersey's Top Doctor for 15 consecutive years. The lens choice affects your outcome — not your safety.",
    highlight: 'Same 15-min procedure · 6,200+ successful outcomes · No general anesthesia',
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
    question: 'How long does the surgery take?',
    concern: '',
    answer:
      'The procedure typically takes 12–18 minutes per eye. Most patients are in and out of the surgical center within 2 hours, including prep and recovery time.',
  },
  {
    question: 'When can I drive after surgery?',
    concern: '',
    answer:
      'Most patients are cleared to drive the next morning, provided their vision meets the legal standard. Dr. Marano will confirm this at your 1-day post-op visit.',
  },
  {
    question: 'Will I feel any pain?',
    concern: '',
    answer:
      'No. Topical anesthetic eye drops are used — no injections, no general anesthesia. Most patients describe feeling light pressure, but no pain. You will be awake but comfortable throughout.',
  },
  {
    question: 'Can I use HSA or FSA funds?',
    concern: '',
    answer:
      'Yes. The premium IOL upgrade cost is an eligible medical expense under HSA and FSA accounts. CareCredit financing is also available for those who prefer monthly payments.',
  },
  {
    question: 'What if I have dry eyes or other eye conditions?',
    concern: '',
    answer:
      'Conditions like dry eye, macular changes, or a history of LASIK affect which lens is safest and most effective for you. Dr. Marano performs a full biometric evaluation at consultation and will only recommend premium lenses when the clinical data supports an excellent outcome.',
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
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-primary/30 bg-primary/[0.03] shadow-[0_0_30px_rgba(0,201,177,0.06)]'
          : 'border-border bg-white/[0.02] hover:border-border-bright hover:bg-white/[0.03]'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 sm:p-6 text-left touch-manipulation group"
        aria-expanded={isOpen}
      >
        <span className="text-xl mt-0.5 shrink-0 select-none">
          {['🌙', '💰', '🔄', '🛡️', '✅'][index] ?? '❓'}
        </span>
        <div className="flex-1 min-w-0">
          {item.concern && (
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary/70 bg-primary/10 px-2.5 py-0.5 rounded-full mb-2">
              {item.concern}
            </span>
          )}
          <p className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary/90 transition-colors leading-snug">
            {item.question}
          </p>
        </div>
        <span
          className={`shrink-0 mt-0.5 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'border-primary/40 bg-primary/10 rotate-45'
              : 'border-border group-hover:border-primary/40'
          }`}
        >
          <Icon name="PlusIcon" size={14} className={isOpen ? 'text-primary' : 'text-muted-foreground'} />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[3.75rem] sm:pl-[4.25rem]">
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.answer}</p>
            {item.highlight && (
              <div className="flex items-start gap-2 px-3 py-2 rounded-xl bg-primary/8 border border-primary/15">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_6px_rgba(0,201,177,0.6)]" />
                <p className="text-xs font-semibold text-primary/90 leading-relaxed">{item.highlight}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProceduralFAQRow({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`border-b border-border/50 last:border-0 transition-colors ${
        isOpen ? 'border-primary/20' : ''
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left touch-manipulation group"
        aria-expanded={isOpen}
      >
        <p className="text-sm font-medium text-foreground/85 group-hover:text-foreground transition-colors">
          {item.question}
        </p>
        <span
          className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <Icon name="ChevronDownIcon" size={16} className="text-muted-foreground" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-muted-foreground leading-relaxed pb-4">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openObjection, setOpenObjection] = useState<number | null>(0);
  const [openProcedural, setOpenProcedural] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 sm:py-28 border-t border-border relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-lines-bg opacity-20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20 mb-12 sm:mb-16">
          <div className="w-full lg:w-2/5 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.45em] text-primary mb-4 opacity-90">
              Common Questions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-5 sm:mb-6">
              Every Concern{' '}
              <span className="text-gradient-primary font-semibold">Answered Honestly.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-8">
              These are the questions Dr. Marano hears most often. He&apos;d rather you come in
              already informed than arrive with unanswered fears.
            </p>

            {/* CTA */}
            <a
              href="#booking"
              className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-accent transition-all hover:scale-105 active:scale-95 touch-manipulation min-h-[52px] shadow-[0_0_24px_rgba(0,201,177,0.22)] btn-shimmer"
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
                6,200+ procedures · 15× NJ Top Doctor
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
                onToggle={() => setOpenObjection(openObjection === i ? null : i)}
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
                  isOpen={openProcedural === i}
                  onToggle={() => setOpenProcedural(openProcedural === i ? null : i)}
                />
              ))}
            </div>
            <div>
              {proceduralFAQs.slice(3).map((faq, i) => (
                <ProceduralFAQRow
                  key={i + 3}
                  item={faq}
                  isOpen={openProcedural === i + 3}
                  onToggle={() => setOpenProcedural(openProcedural === i + 3 ? null : i + 3)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
