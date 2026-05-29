'use client';

interface TrustBadgeBarProps {
  variant?: 'authority' | 'clinical' | 'safety';
}

const variants = {
  authority: [
    { icon: '🏆', text: '15× NJ Monthly Top Doctor' },
    { icon: '⭐', text: '6,200+ Premium IOLs Implanted' },
    { icon: '🎓', text: 'Fellowship Trained · Board Certified' },
  ],
  clinical: [
    { icon: '✅', text: '99% Would Choose Same Lens Again' },
    { icon: '🔬', text: 'Biometry-Guided Lens Selection' },
    { icon: '📊', text: 'FDA-Approved Premium IOLs Only' },
  ],
  safety: [
    { icon: '🔒', text: 'HIPAA-Protected Information' },
    { icon: '📞', text: 'No-Obligation Consultation' },
    { icon: '💳', text: 'HSA · FSA · CareCredit Accepted' },
  ],
};

export default function TrustBadgeBar({ variant = 'authority' }: TrustBadgeBarProps) {
  const badges = variants[variant];

  return (
    <div className="border-y border-border/40 bg-white/[0.015] py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-4">
          {badges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span className="text-base leading-none">{badge.icon}</span>
              <span className="font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
