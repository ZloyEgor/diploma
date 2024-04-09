import React, { HTMLProps, useCallback, useRef } from 'react';
import style from './splitter.module.scss';
import clsx from 'clsx';
import { Props } from '../../utils/props.ts';
import { component } from '../../utils/component.tsx';

export type SplitterProps = Props<
  {
    left: React.ReactNode;
    right: React.ReactNode;
    minLeftWidth?: number;
    onMoveStart?: () => void;
    onMoveEnd?: () => void;
    onMove?: () => void;
  },
  false,
  HTMLProps<HTMLDivElement>
>;
export const Splitter = component<SplitterProps>(
  ({
    left,
    right,
    className,
    minLeftWidth = 0,
    onMoveStart,
    onMoveEnd,
    onMove,
    ...rest
  }) => {
    const resizerRef = useRef<HTMLDivElement>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      const startPos = {
        x: e.clientX,
        y: e.clientY,
      };
      const currentLeftWidth =
        leftRef.current?.getBoundingClientRect().width ?? 0;

      const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startPos.x;
        updateWidth(currentLeftWidth, dx);
        updateCursor();
        onMove?.();
      };

      onMoveStart?.();
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        onMoveEnd?.();
        resetCursor();
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      const touch = e.touches[0];
      const startPos = {
        x: touch.clientX,
        y: touch.clientY,
      };
      const currentLeftWidth =
        leftRef.current?.getBoundingClientRect().width ?? 0;

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const dx = touch.clientX - startPos.x;
        updateWidth(currentLeftWidth, dx);
        updateCursor();
        onMove?.();
      };

      onMoveStart?.();
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        onMoveEnd?.();
        resetCursor();
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }, []);

    const updateWidth = (currentLeftWidth: number, dx: number) => {
      const container = containerRef.current;
      const firstHalfEle = leftRef.current;

      if (!container || !firstHalfEle) {
        return;
      }

      const containerWidth = container.getBoundingClientRect().width;
      const delta = Math.max(currentLeftWidth + dx, minLeftWidth);
      const newLeftWidth = (delta * 100) / containerWidth;
      firstHalfEle.style.width = `${newLeftWidth}%`;
    };

    const updateCursor = () => {
      const container = containerRef.current;
      const firstHalfEle = leftRef.current;
      const resizerEle = resizerRef.current;
      const secondHalfEle = rightRef.current;

      if (!container || !firstHalfEle || !resizerEle || !secondHalfEle) {
        return;
      }

      document.body.style.cursor = 'ew-resize';
      firstHalfEle.style.userSelect = 'none';
      firstHalfEle.style.pointerEvents = 'none';
      secondHalfEle.style.userSelect = 'none';
      secondHalfEle.style.pointerEvents = 'none';
    };

    const resetCursor = () => {
      const container = containerRef.current;
      const firstHalfEle = leftRef.current;
      const resizerEle = resizerRef.current;
      const secondHalfEle = rightRef.current;

      if (!container || !firstHalfEle || !resizerEle || !secondHalfEle) {
        return;
      }

      document.body.style.removeProperty('cursor');
      firstHalfEle.style.removeProperty('user-select');
      firstHalfEle.style.removeProperty('pointer-events');
      secondHalfEle.style.removeProperty('user-select');
      secondHalfEle.style.removeProperty('pointer-events');
    };

    return (
      <div
        className={clsx(style.splitter, className)}
        ref={containerRef}
        {...rest}
      >
        <div ref={leftRef} className={style.left}>
          {left}
        </div>
        <div
          ref={resizerRef}
          className={style.resize}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
        <div ref={rightRef} className={style.right}>
          {right}
        </div>
      </div>
    );
  },
);
