import { forwardRef, type SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

/**
 * Accessible select dropdown with label and error state.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, id, className = '', ...props }, ref) => {
    const selectId = id ?? props.name;

    return (
      <div>
        <label htmlFor={selectId} className="mb-2 block font-label-caps text-label-caps text-primary">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={[
            'w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest',
            'px-4 py-3 font-body-md text-body-md text-on-surface',
            'transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
            error ? 'border-error' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
