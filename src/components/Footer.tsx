import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href="https://www.maranoeyecare.com"
              aria-label="Marano Eye Care — return to homepage"
              className="hover:opacity-80 transition-opacity block rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <AppLogo
                src="/assets/images/marano_logo.png"
                width={160}
                height={40}
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {[
              { label: 'Lens Options', href: '#lenses' },
              { label: 'Vision Outcomes', href: '#vision' },
              { label: 'Our Doctors', href: '#trust' },
              { label: 'Book Consultation', href: '#booking' },
            ]?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-2.5 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none inline-block"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* Social + legal */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <a
              href="tel:9733220100"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors touch-manipulation py-2.5 px-3 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              aria-label="Call Marano Eye Care at 973-322-0100"
            >
              <Icon name="PhoneIcon" size={14} className="text-primary" />
              973-322-0100
            </a>
            <span className="text-border hidden sm:inline">·</span>
            <a
              href="https://www.maranoeyecare.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-2.5 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none inline-block"
            >
              Privacy
            </a>
            <span className="text-border hidden sm:inline">·</span>
            <a
              href="https://www.maranoeyecare.com/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-2.5 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none inline-block"
            >
              Terms
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="text-center sm:text-left">
            © 2026 Marano Eye Care. Matthew Marano Jr., MD. All rights reserved.
          </p>
          <p className="text-center">
            Livingston · Denville · Newark, NJ ·{' '}
            <a
              href="https://www.maranoeyecare.com"
              className="hover:text-primary transition-colors rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              www.maranoeyecare.com
            </a>
          </p>
        </div>

        {/* Clinical References & Footnotes */}
        <div className="mt-8 pt-6 border-t border-border/20 text-[11px] text-muted-foreground/75 leading-relaxed max-w-5xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-[10px] text-primary/80 mb-4 select-none text-center sm:text-left">
            Clinical References & Study Data Disclosures:
          </p>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
            <div className="space-y-3">
              <p id="footnote-1" className="scroll-mt-24">
                <strong className="text-foreground">
                  [1] PanOptix Pro Spectacle Independence:
                </strong>{' '}
                Based on a peer-reviewed clinical meta-analysis of 13 global studies evaluating 513
                patients. Shows a 99% patient satisfaction and spectacle independence rate.{' '}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/32049015/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium block sm:inline mt-1 sm:mt-0"
                >
                  [View on PubMed]
                </a>
              </p>
              <p id="footnote-2" className="scroll-mt-24">
                <strong className="text-foreground">[2] Clareon Vivity Optical Profiles:</strong>{' '}
                Based on Alcon FDA pre-market clinical registry data. Confirms EDOF (Extended Depth
                of Focus) performance utilizing non-diffractive X-WAVE™ technology with glare/halo
                rates matching standard monofocal lenses.{' '}
                <a
                  href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P190018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium block sm:inline mt-1 sm:mt-0"
                >
                  [View FDA PMA Registry]
                </a>
              </p>
            </div>
            <div className="space-y-3">
              <p id="footnote-3" className="scroll-mt-24">
                <strong className="text-foreground">[3] Tecnis Eyhance Clinical Study:</strong>{' '}
                Based on peer-reviewed longitudinal clinical study data comparing TECNIS Eyhance to
                standard monofocals. Demonstrates 100% long-term distance satisfaction and superior
                intermediate range.{' '}
                <a
                  href="https://clinicaltrials.gov/study/NCT03666273"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium block sm:inline mt-1 sm:mt-0"
                >
                  [View on ClinicalTrials.gov]
                </a>
              </p>
              <p className="text-[10px] text-muted-foreground/50 border-t border-border/20 pt-3 select-none">
                Simulations are for illustrative/educational purposes only. Individual patient
                visual outcomes, recovery speeds, and clinical experiences may vary. A comprehensive
                biometric consultation with Dr. Marano is required for medical diagnosis and
                personalized surgical treatment planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
