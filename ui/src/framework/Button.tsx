import clsx from 'clsx'
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  JSXElementConstructor,
  MouseEventHandler,
} from 'react'

import css from './Button.module.css'

export interface ButtonBaseProps {
  as?: string
  size?: 'small' | 'large'
  variant?: 'primary' | 'secondary' | 'link'
  fullWidth?: boolean
}

export type ButtonProps = ButtonBaseProps &
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Button({
  as: component = 'button',
  children,
  className,
  disabled = false,
  onClick,
  fullWidth,
  size = 'small',
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  const Component = component as unknown as JSXElementConstructor<
    Record<string, unknown>
  >

  const handleClick: MouseEventHandler<HTMLElement> = (event) => {
    if (onClick) onClick(event)
  }

  return (
    <Component
      className={clsx(
        css.root,
        {
          [css.full]: fullWidth,
          [css.small]: size === 'small',
          [css.large]: size === 'large',
          [css.primary]: variant === 'primary',
          [css.secondary]: variant === 'secondary',
          [css.link]: variant === 'link',
          [css.disabled]: disabled,
        },
        className
      )}
      disabled={disabled}
      onClick={handleClick}
      type={component === 'button' ? type : undefined}
      {...props}
    >
      <span>{children}</span>
    </Component>
  )
}
