'use client';

import { Headphones, Images } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { useToast } from '@/components/ui/Toast';
import ThemeToggle from './ThemeToggle';

function PillButton({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-line bg-surface text-ink hover:bg-panel inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium transition-[background-color,transform] duration-150 active:scale-95 md:px-3"
    >
      <Icon aria-hidden="true" className="size-3.5" />
      <span className="sr-only md:not-sr-only">{label}</span>
    </button>
  );
}

export default function HeaderActions() {
  const toast = useToast();

  return (
    <div className="flex items-center justify-end gap-1.5 md:gap-2">
      <PillButton
        icon={Images}
        label="Gallery"
        onClick={() => toast.show('Gallery is coming soon')}
      />
      <PillButton
        icon={Headphones}
        label="Support"
        onClick={() => toast.show('Support is coming soon')}
      />
      <ThemeToggle />
      <button
        type="button"
        aria-label="Account"
        onClick={() => toast.show('Account menu is coming soon')}
        className="rounded-full transition-transform duration-150 hover:scale-105 active:scale-95"
      >
        <Avatar src="/mock/avatar.webp" name="Ali Faisal" />
      </button>
    </div>
  );
}
