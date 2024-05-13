import {
  FC,
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  memo,
  PropsWithRef,
  ReactElement,
  RefObject,
} from 'react';
import { Props } from './props.ts';

export const component = <Props,>(render: FC<Props>) =>
  memo(render) as FC<PropsWithRef<Props>>;

export const componentWithRef = <Props, Ref>(
  render: ForwardRefRenderFunction<Ref, Props>,
) =>
  memo(forwardRef(render)) as unknown as FC<
    Props & { ref?: ForwardedRef<Ref> | null }
  >;

export type DefaultElement<P = Props, Ref = unknown> = ReactElement<P> & {
  ref?: RefObject<Ref>;
};
