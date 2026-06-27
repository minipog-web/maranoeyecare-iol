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
    { icon: 'CheckCircleIcon', text: '99% Would Choose a Premium Lens Again' },
    { icon: 'BeakerIcon', text: 'Biometry-Guided Lens Selection' },
    { icon: 'ShieldCheckIcon', text: 'FDA-Approved IOLs Only' },
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
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-4">
          {badges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name={badge.icon as 'TrophyIcon'} size={14} className="text-primary shrink-0" />
              <span className="font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
