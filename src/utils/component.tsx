import {
  FC,
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  memo,
  PropsWithRef,
} from 'react';

export const component = <Props,>(render: FC<Props>) =>
  memo(render) as FC<PropsWithRef<Props>>;

export const componentWithRef = <Props, Ref>(
  render: ForwardRefRenderFunction<Ref, Props>,
) =>
  memo(forwardRef(render)) as unknown as FC<
    Props & { ref?: ForwardedRef<Ref> | null }
  >;
