import React from "react";
import { useState } from 'react';
import { Facebook, Instagram, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';

export function Footer() {
  const { addNewsletter } = useAdmin();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    addNewsletter(email);
    showToast('Subscribed to newsletter successfully', 'success');
    setEmail('');
  };

  return (
    <footer className="w-full bg-brand-dark text-brand-light pt-24 pb-8 px-8 md:px-12 lg:px-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5 flex flex-col items-start gap-12">
            <div className="flex items-center gap-6">
              <Link to="/" className="font-heading font-bold text-2xl tracking-tight text-brand-light">
                Woodworking.Inc
              </Link>
              <div className="w-px h-10 bg-white/20"></div>
              <p className="text-white/80 text-sm max-w-[180px] font-light leading-relaxed">Stay up to date with our latest news and projects.</p>
            </div>
            
            <form onSubmit={handleSubscribe} className="bg-[#6B5A4E] p-8 rounded-lg w-full max-w-md shadow-lg shadow-black/10">
              <div className="flex w-full">
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email Address" 
                  className="bg-[#EFE4CC] text-brand-dark px-4 py-3 w-full rounded-sm focus:outline-none placeholder:text-brand-dark/50"
                  required
                />
                <button type="submit" className="bg-brand-dark text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded-sm ml-2 hover:bg-brand-gold hover:text-brand-dark transition-colors shrink-0">
                  Sign up
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-7 flex flex-col md:flex-row justify-between gap-12 lg:pl-16">
            <div className="flex flex-col gap-5">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-white/50 mb-2">Navigate</h4>
              <Link to="/" className="hover:text-brand-gold transition-colors font-medium text-sm">Home</Link>
              <Link to="/about" className="hover:text-brand-gold transition-colors font-medium text-sm">About</Link>
              <Link to="/portfolio" className="hover:text-brand-gold transition-colors font-medium text-sm">Portfolio</Link>
              <Link to="/services" className="hover:text-brand-gold transition-colors font-medium text-sm">Services</Link>
              <Link to="/contact" className="hover:text-brand-gold transition-colors font-medium text-sm">Contact</Link>
              <Link to="/admin" className="hover:text-brand-gold transition-colors font-medium text-sm">Admin Portal</Link>
            </div>
            
            <div className="flex flex-col gap-5">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-white/50 mb-2">Services</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {['Kitchens', 'Bathrooms', 'Cabinetry', 'Tables', 'Seating', 'Closets', 'Doors', 'Millwork', 'CNC', 'Commercial'].map(link => (
                  <Link key={link} to={`/services/${link.toLowerCase()}`} className="hover:text-brand-gold transition-colors font-medium text-sm">{link}</Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors">
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 tracking-wider">
          <p>© Copyright Woodworking.Inc 2026</p>
        </div>
      </div>
    </footer>
  );
}
