import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <AppLogo
              src="/assets/images/marano_logo.png"
              width={160}
              height={40}
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { label: 'Lens Options', href: '#lenses' },
              { label: 'Vision Outcomes', href: '#vision' },
              { label: 'Our Doctors', href: '#trust' },
              { label: 'Book Consultation', href: '#booking' },
            ]?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* Social + legal */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="tel:9733220100"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors touch-manipulation"
            >
              <Icon name="PhoneIcon" size={14} className="text-primary" />
              973-322-0100
            </a>
            <span className="text-border hidden sm:inline">·</span>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation">
              Privacy
            </Link>
            <span className="text-border hidden sm:inline">·</span>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation">
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="text-center sm:text-left">© 2026 Marano Eye Care. Matthew Marano Jr., MD. All rights reserved.</p>
          <p className="text-center">
            Livingston · Denville · Newark, NJ ·{' '}
            <a href="https://maranoeyecare.com" className="hover:text-primary transition-colors">
              maranoeyecare.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}