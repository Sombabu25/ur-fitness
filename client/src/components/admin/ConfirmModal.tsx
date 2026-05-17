'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title = 'Confirm Delete', message = 'Are you sure? This action cannot be undone.', loading }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-brand-card border border-brand-border rounded-2xl w-full max-w-sm p-6 z-10 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#FF2D55]/10 border border-[#FF2D55]/30 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} className="text-[#FF2D55]" />
            </div>
            <h2 className="font-display text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-brand-sub text-sm font-body mb-6">{message}</p>
            <div className="flex gap-3">
              <button onClick={onClose} className="btn-secondary flex-1 py-3 rounded-xl font-body font-semibold text-sm uppercase tracking-wide">
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-[#FF2D55] hover:bg-[#FF2D55]/80 text-white font-body font-semibold text-sm uppercase tracking-wide transition-colors"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
