'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-lines-bg opacity-40" />

      <div className="relative z-10 text-center max-w-xl">
        {/* Eyeball icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_40px_rgba(197,160,89,0.15)]">
            <Icon name="EyeSlashIcon" size={36} className="text-primary" />
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">Error 404</p>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-4 leading-tight">
          This page isn&apos;t{' '}
          <span className="font-semibold text-gradient-primary">in focus.</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. But your clarity does — let&apos;s
          get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary text-[#020304] rounded-xl text-sm font-bold hover:bg-accent transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[52px] shadow-[0_0_28px_rgba(197,160,89,0.25)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <Icon name="HomeIcon" size={16} />
            Return Home
          </a>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border-bright bg-muted/40 rounded-xl text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-muted/80 transition-all min-h-[52px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <Icon name="ArrowLeftIcon" size={16} />
            Go Back
          </button>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Need help? Call us at{' '}
          <a href="tel:9733220100" className="text-primary hover:underline font-semibold">
            (973) 322-0100
          </a>
        </p>
      </div>
    </div>
  );
}
