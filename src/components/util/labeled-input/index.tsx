import { FC, ReactNode, useId } from 'react';
import style from './labeled-input.module.scss';
import cn from 'clsx';
import { DefaultProps } from '../../../utils/props.ts';

export type LabeledInputProps<T> = {
  label: ReactNode;
  required?: boolean;
  InputComponent?: FC<T>;
  help?: string;
  status?: 'error';
} & T;

export const LabeledInput = <T extends DefaultProps>({
  id,
  className,
  label,
  required,
  InputComponent,
  help,
  status,
  ...rest
}: LabeledInputProps<T>) => {
  const generatedId = useId();
  const finalId = id ?? generatedId;

  return (
    <div className={cn(style.container, required && style.required, className)}>
      <label htmlFor={finalId} className={cn(style.label)}>
        {label}
      </label>
      {InputComponent && (
        // @ts-ignore
        <InputComponent
          id={finalId}
          className={cn(
            style.input,
            { [style.input_error]: status === 'error' },
            className,
          )}
          {...rest}
        />
      )}
      {help && (
        <span
          style={{
            color: status === 'error' ? '#ff4d4f' : 'rgba(0, 0, 0, 0.45)',
          }}
        >
          {help}
        </span>
      )}
    </div>
  );
};
