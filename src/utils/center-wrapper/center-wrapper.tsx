import style from './center-wrapper.module.scss';
import clsx from 'clsx';
import { componentWithRef, DefaultElement } from '../component.tsx';
import { Props } from '../props.ts';

export type CenterWrapperProps = Props<{
  children: DefaultElement;
}>;

export const CenterWrapper = componentWithRef<
  CenterWrapperProps,
  HTMLDivElement
>(({ className, children: Children, ...restProps }, ref) => (
  <div
    className={clsx(style.centerWrapper, className)}
    ref={ref}
    {...restProps}
  >
    <Children.type ref={Children.ref} {...Children.props} />
  </div>
));
