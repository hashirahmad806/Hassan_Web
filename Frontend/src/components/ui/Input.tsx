import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Field label */
  label: string;
  /** Error message from validation */
  error?: string;
}

/**
 * Accessible form input with label and error state.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className={styles.wrapper}>
        <label htmlFor={inputId} className="mb-2 block font-label-caps text-label-caps text-primary">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={[
            styles.input,
            'w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest',
            'px-4 py-3 font-body-md text-body-md text-on-surface',
            'transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
            error ? 'border-error' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
