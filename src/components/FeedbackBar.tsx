import React from 'react';
import { Mail, Facebook, Instagram, MessageSquare } from 'lucide-react';

export function FeedbackBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-[200] bg-brand-dark text-brand-light py-2 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] text-xs sm:text-sm font-body text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
      <div className="flex items-center gap-1.5">
        <span>Custom Demo Concept by <strong>aB Labs</strong>.</span>
        <span className="hidden md:inline">Like this design? Let's launch it!</span>
      </div>
      
      <div className="flex items-center gap-2">
        <a 
          href="mailto:ablabs.contact.01@gmail.com" 
          className="inline-flex items-center gap-1.5 text-brand-gold hover:text-white transition-colors font-bold uppercase tracking-wider text-[10px] sm:text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full"
          title="Email us"
        >
          <Mail size={14} />
          <span className="hidden sm:inline">Contact Me</span>
          <span className="sm:hidden">Email</span>
        </a>

        <a 
          href="sms:+13157906716" 
          className="inline-flex items-center justify-center text-brand-gold hover:text-white transition-colors bg-white/5 hover:bg-white/10 w-8 h-8 rounded-full"
          title="Text us: +13157906716"
        >
          <MessageSquare size={14} />
        </a>

        <a 
          href="https://www.facebook.com/peakclipped" 
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center text-brand-gold hover:text-white transition-colors bg-white/5 hover:bg-white/10 w-8 h-8 rounded-full"
          title="Facebook"
        >
          <Facebook size={14} />
        </a>

        <a 
          href="https://www.instagram.com/ab.labs_/" 
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center text-brand-gold hover:text-white transition-colors bg-white/5 hover:bg-white/10 w-8 h-8 rounded-full"
          title="Instagram"
        >
          <Instagram size={14} />
        </a>
      </div>
    </div>
  );
}
