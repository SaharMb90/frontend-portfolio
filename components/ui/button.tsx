'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClass: Record<ButtonVariant, string> = {
  default: 'ui-btn--default',
  outline: 'ui-btn--outline',
  ghost: 'ui-btn--ghost',
  danger: 'ui-btn--danger',
};

const sizeClass: Record<ButtonSize, string> = { sm: 'ui-btn--sm', md: 'ui-btn--md' };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'default', size = 'md', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn('ui-btn', variantClass[variant], sizeClass[size], className)}
      {...props}
    />
  );
});
