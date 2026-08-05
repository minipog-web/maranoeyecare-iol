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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-0 sm:divide-x sm:divide-white/[0.08]">
          {badges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center justify-center text-center gap-2 text-xs sm:text-sm lg:text-base text-foreground font-semibold py-1.5 px-4 sm:px-6"
            >
              <Icon name={badge.icon as 'TrophyIcon'} size={18} className="text-primary shrink-0" />
              <span className="font-semibold tracking-wider whitespace-nowrap text-xs sm:text-sm lg:text-base">
                {(() => {
                  const parts = badge.text.split(/(\[\d+\])/);
                  return parts.map((part, idx) => {
                    const match = part.match(/^\[(\d+)\]$/);
                    if (match) {
                      const num = match[1];
                      return (
                        <sup key={idx} className="text-xs font-bold inline-flex items-center">
                          <a
                            href={`#footnote-${num}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-primary hover:underline px-1 py-0.5 touch-manipulation inline-block min-w-[24px] min-h-[24px] text-center"
                            aria-label={`View citation footnote ${num}`}
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
