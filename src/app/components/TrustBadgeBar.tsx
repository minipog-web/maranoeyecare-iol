'use client';

import Icon from '@/components/ui/AppIcon';

type IconName = string;

interface Badge {
  icon: IconName;
  text: string;
}

interface TrustBadgeBarProps {
  variant?: 'authority' | 'clinical' | 'safety';
}

const variants: Record<string, Badge[]> = {
  authority: [
    { icon: 'TrophyIcon', text: '15× NJ Monthly Top Doctor' },
    { icon: 'HeartIcon', text: '40,000+ Successful Surgeries' },
    { icon: 'AcademicCapIcon', text: 'Board Certified Ophthalmologist' },
  ],
  clinical: [
    { icon: 'CheckCircleIcon', text: '99% Patient Satisfaction Rate [1]' },
    { icon: 'BeakerIcon', text: 'Biometry-Guided Lens Selection' },
    { icon: 'BoltIcon', text: 'LENSAR® FEMTO Laser on Every Premium IOL' },
  ],
  safety: [
    { icon: 'LockClosedIcon', text: 'HIPAA-Protected Information' },
    { icon: 'ChatBubbleLeftRightIcon', text: 'No-Obligation Consultation' },
    { icon: 'CreditCardIcon', text: 'HSA · FSA · CareCredit Accepted' },
  ],
};

export default function TrustBadgeBar({ variant = 'authority' }: TrustBadgeBarProps) {
  const badges = variants[variant];

  return (
    <div className="border-y border-border/40 bg-white/[0.015] py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-0 sm:divide-x sm:divide-white/[0.08]">
          {badges.map((badge, idx) => (
            <div
              key={badge.text}
              className={`flex items-center justify-center gap-2.5 text-xs text-muted-foreground py-1 px-4 ${
                idx === 0
                  ? 'sm:pl-0 sm:justify-start'
                  : idx === 2
                    ? 'sm:pr-0 sm:justify-end'
                    : 'sm:justify-center'
              }`}
            >
              <Icon name={badge.icon as 'TrophyIcon'} size={14} className="text-primary shrink-0" />
              <span className="font-medium tracking-wide">
                {(() => {
                  const parts = badge.text.split(/(\[\d+\])/);
                  return parts.map((part, idx) => {
                    const match = part.match(/^\[(\d+)\]$/);
                    if (match) {
                      const num = match[1];
                      return (
                        <sup key={idx} className="text-[9px] font-bold">
                          <a
                            href={`#footnote-${num}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-primary hover:underline ml-0.5"
                          >
                            [{num}]
                          </a>
                        </sup>
                      );
                    }
                    return part;
                  });
                })()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
