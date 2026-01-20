import { type HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-200 text-gray-700 font-semibold',
      success: 'bg-green-100 text-green-700 font-semibold',
      warning: 'bg-orange-100 text-orange-700 font-semibold',
      error: 'bg-red-100 text-red-700 font-semibold',
      info: 'bg-blue-100 text-blue-700 font-semibold',
    };

    const sizes = {
      sm: 'px-3 py-1 text-xs',
      md: 'px-3.5 py-1.5 text-sm',
    };

    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center rounded-lg',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
