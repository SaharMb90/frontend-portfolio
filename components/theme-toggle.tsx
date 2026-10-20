'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export function ThemeToggle({ label }: { label: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      data-theme-state={theme}
    >
      <span aria-hidden="true">{theme === 'dark' ? '\u2600\uFE0F' : '\u{1F319}'}</span>
    </Button>
  );
}
