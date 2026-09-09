import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Accessible form input matching the clinic's luxury aesthetic with gold accents and high-clarity typography.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    const inputElement = (
      <input
        type={type}
        id={inputId}
        className={cn(
          'w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3.5 font-body-md text-sm text-on-surface placeholder:text-outline/50 transition-all duration-200 focus:border-gold-accent/70 focus:outline-none focus:ring-2 focus:ring-gold-accent/20 disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-error/60 focus:border-error focus:ring-error/20' : '',
          className,
        )}
        ref={ref}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error && inputId ? `${inputId}-error` : undefined}
        {...props}
      />
    );

    if (label || error) {
      return (
        <div className="w-full space-y-2 text-left">
          {label && (
            <label
              htmlFor={inputId}
              className="block font-label-caps text-[11px] uppercase tracking-[0.1em] text-primary"
            >
              {label}
            </label>
          )}
          {inputElement}
          {error && (
            <p
              id={inputId ? `${inputId}-error` : undefined}
              className="mt-1 font-body-md text-xs text-error"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      );
    }

    return inputElement;
  },
);
Input.displayName = 'Input';

export { Input };
