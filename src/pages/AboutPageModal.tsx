import React from 'react';
import { X, ShieldCheck, MapPin, Phone, MessageSquare, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { companyContactDetails } from '../data/whyJianTools';

interface AboutPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: () => void;
}

export const AboutPageModal: React.FC<AboutPageModalProps> = ({
  isOpen,
  onClose,
  onOpenEnquiry
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 dark:bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-[#0D1115] border border-slate-200 dark:border-white/15 shadow-2xl p-6 sm:p-10 my-8 overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Close about modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-mono text-precision-blue mb-2 font-bold">
            <ShieldCheck className="w-4 h-4 text-precision-blue" />
            <span>ABOUT JIAN TOOLS // PRECISION CARBIDE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-3">
            YOUR SOLUTION PROVIDER FOR CARBIDE CUTTING TOOLS.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-steel-300 leading-relaxed max-w-3xl">
            Based in the industrial engineering corridor of Makarpura GIDC, Vadodara, JIAN TOOLS manufactures and supplies high-performance cemented carbide tooling, modular drilling systems, and scarfing solutions for demanding manufacturing operations.
          </p>
        </div>

        {/* Core Pillars Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Virgin Micro-Grain Substrates
            </h4>
            <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed">
              We exclusively use tested virgin tungsten carbide powders with controlled cobalt binder distribution, ensuring superior toughness and wear resistance under high mechanical loads.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Direct Application Engineering
            </h4>
            <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed">
              Our engineers collaborate directly with machine shops, tube mills, and automotive component makers to optimize speeds, feeds, tool life, and custom workpiece drawings.
            </p>
          </div>
        </div>

        {/* Location & Facility Card */}
        <div className="p-6 rounded-xl bg-slate-50 dark:bg-[#0D1115]/80 border border-slate-200 dark:border-white/10 mb-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-precision-blue/10 text-precision-blue mt-0.5 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 dark:text-steel-500 uppercase tracking-widest mb-1 font-bold">
                HEADQUARTERS & MANUFACTURING FACILITY
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {companyContactDetails.address}
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-steel-400">
                Operating Hours: {companyContactDetails.operationalHours}
              </div>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-500 dark:text-steel-500">
            PRECISION • PERFORMANCE • PARTNERSHIP
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenEnquiry();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,102,255,0.4)]"
            >
              TALK TO JIAN TOOLS
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
