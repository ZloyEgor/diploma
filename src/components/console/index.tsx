import { component } from '../../utils/component.tsx';
import { Input } from 'antd';
import { Props } from '../../utils/props.ts';
import { TextAreaProps } from 'antd/es/input';
import clsx from 'clsx';
import style from './console.module.scss';

const { TextArea } = Input;

export type AutocompleteProps = Props<
  {},
  false,
  Omit<TextAreaProps, 'autoSize'>
>;

export const Console = component<AutocompleteProps>(
  ({ className, ...rest }) => {
    return (
      <TextArea
        className={clsx(style.console, className)}
        autoSize={false}
        rows={6}
        value={'SELECT sense LIMIT 1000;'}
        {...rest}
      />
    );
  },
);
