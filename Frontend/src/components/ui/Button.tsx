import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full font-button text-sm tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-on-primary hover:bg-on-primary-fixed-variant hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5',
        secondary:
          'border border-outline-variant text-primary bg-transparent hover:bg-surface-container hover:shadow-md hover:-translate-y-0.5',
        gold:
          'bg-gold-accent text-charcoal-text font-semibold hover:bg-gold-accent/90 hover:shadow-lg hover:shadow-gold-accent/30 hover:-translate-y-0.5',
        ghost:
          'text-primary hover:bg-surface-container hover:scale-105',
        corporate:
          'bg-primary text-on-primary hover:bg-on-primary-fixed-variant hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5',
        default:
          'bg-primary text-on-primary hover:bg-on-primary-fixed-variant hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5',
        destructive:
          'bg-error text-on-error hover:bg-error/90 hover:shadow-md hover:-translate-y-0.5',
        outline:
          'border border-outline-variant text-primary bg-transparent hover:bg-surface-container hover:shadow-md hover:-translate-y-0.5',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-6 py-3.5',
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base font-semibold',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, fullWidth = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth && 'w-full',
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
