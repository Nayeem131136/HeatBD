import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EMERGENCY_CARDS } from '@/utils/heatLogic';

function EmergencyAccordion({ card, index }: { card: typeof EMERGENCY_CARDS[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex items-center justify-between min-h-[48px]"
      >
        <span className="font-bangla font-bold text-sm text-left">{card.title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-lg" style={{ color: 'rgba(250,250,250,0.4)' }}>
          ▾
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="rounded-xl p-3 mb-3" style={{ background: 'rgba(255,23,68,0.08)', border: '1px solid rgba(255,23,68,0.15)' }}>
                <p className="font-bangla text-xs font-semibold mb-1" style={{ color: '#FF1744' }}>লক্ষণ:</p>
                <p className="font-bangla text-xs" style={{ color: 'rgba(250,250,250,0.6)' }}>{card.symptoms}</p>
              </div>
              <p className="font-bangla text-xs font-semibold mb-2" style={{ color: '#00E676' }}>করণীয়:</p>
              <ul className="space-y-1.5">
                {card.treatments.map((t, i) => (
                  <li key={i} className="font-bangla text-xs flex items-start gap-2" style={{ color: 'rgba(250,250,250,0.6)' }}>
                    <span className="text-safe mt-0.5">•</span> {t}
                  </li>
                ))}
              </ul>
              {card.treatments.some(t => t.includes('999')) && (
                <a href="tel:999" className="mt-3 block w-full text-center py-3 rounded-2xl font-bangla font-bold text-sm min-h-[48px]"
                  style={{ background: 'linear-gradient(135deg, #FF1744, #D50000)' }}>
                  📞 999 কল করুন
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EmergencyTab() {
  return (
    <div className="space-y-4">
      {/* CPR Card */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-5 overflow-hidden"
        style={{ border: '1px solid rgba(255,23,68,0.2)', background: 'linear-gradient(135deg, rgba(255,23,68,0.08), rgba(255,23,68,0.02))' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl heart-pump">❤️</span>
          <h2 className="font-bangla font-bold text-base">CPR করার নিয়ম</h2>
        </div>
        <ol className="space-y-2.5">
          {[
            "রোগী সাড়া দিচ্ছে না নিশ্চিত করুন",
            "999 কল করুন বা কাউকে করতে বলুন",
            "বুকের মাঝখানে দুই হাত রাখুন",
            "৩০ বার জোরে চাপ দিন (১০০-১২০ বার/মিনিট)",
            "২ বার মুখে শ্বাস দিন (যদি জানেন)",
            "সাহায্য না আসা পর্যন্ত চালিয়ে যান",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="font-sora font-bold text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full"
                style={{ background: 'rgba(255,23,68,0.2)', color: '#FF1744' }}>
                {i + 1}
              </span>
              <span className="font-bangla text-xs" style={{ color: 'rgba(250,250,250,0.7)' }}>{step}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Emergency Cards */}
      {EMERGENCY_CARDS.map((card, i) => (
        <EmergencyAccordion key={i} card={card} index={i} />
      ))}

      {/* Emergency Call Buttons */}
      <div className="space-y-3 pt-2">
        {[
          { label: '📞 জরুরি সেবা: 999', tel: '999', color: 'linear-gradient(135deg, #FF1744, #D50000)' },
          { label: '🏥 স্বাস্থ্য বাতায়ন: 16000', tel: '16000', color: 'linear-gradient(135deg, #FF6B00, #FF3D00)' },
          { label: '🚑 ফায়ার সার্ভিস: 102', tel: '102', color: 'linear-gradient(135deg, #FF6D00, #E65100)' },
        ].map((btn, i) => (
          <a key={i} href={`tel:${btn.tel}`}
            className="block w-full text-center py-4 rounded-2xl font-bangla font-bold text-sm emergency-pulse"
            style={{ background: btn.color, minHeight: '60px', lineHeight: '28px' }}>
            {btn.label}
          </a>
        ))}
      </div>
    </div>
  );
}
