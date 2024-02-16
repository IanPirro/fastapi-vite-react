import clsx from 'clsx'
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
} from 'react'

import css from './Input.module.css'

type DomProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange'
>

export interface InputProps extends DomProps {
  errorMessage?: string
  inputClassName?: string
  containerClassName?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
}

function Input(
  {
    disabled,
    errorMessage,
    inputClassName,
    containerClassName,
    onChange,
    readOnly,
    label,
    ...rest
  }: InputProps,
  reference: React.ForwardedRef<HTMLInputElement>
) {
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      event.preventDefault()
      if (onChange) onChange(event)
    },
    [onChange]
  )

  return (
    <>
      <div
        className={clsx(
          css.root,
          {
            [css.disabled]: disabled,
            [css.inputError]: !!errorMessage,
          },
          containerClassName
        )}
      >
        {label && (
          <label htmlFor={rest.name} className={css.label}>
            {label}
          </label>
        )}
        <input
          className={clsx(css.input, inputClassName)}
          disabled={disabled}
          onChange={handleChange}
          readOnly={readOnly}
          {...rest}
          ref={reference}
        />
      </div>
      <aside>
        {errorMessage && <p className="text-red-500 mb-5">{errorMessage}</p>}
      </aside>
    </>
  )
}

export default forwardRef<HTMLInputElement, InputProps>(Input)
