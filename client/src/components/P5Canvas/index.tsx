import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Contextual } from '#includes/graphics';
import P5, { Vector } from 'p5';
import style from './style.module.scss';
import { cl } from '#includes/cl';

export type Sketch = {
  setup?: () => void;
  draw?: () => void;
};

type P5CanvasPropsMin = {
  children?: never;
  sketch?: (p: P5Type) => Sketch;
};

type P5CanvasProps = Omit<HTMLAttributes<HTMLElement>, keyof P5CanvasPropsMin> &
  P5CanvasPropsMin;

const size: Vector = new Vector(1, 1);

export const P5Canvas = observer<P5CanvasProps>((props) => {
  const { children, sketch, className, ...otherProps } = props;

  const [p, setP] = useState<P5Type | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const p5 = new P5((p: P5Type) => {
      const { draw, setup } = sketch
        ? sketch(p)
        : ({} as { draw: undefined; setup: undefined });

      p.setup = () => {
        p.createCanvas(size.x, size.y, p.P2D);
        setup && setup();
      };
      p.draw = () => draw && draw();

      Contextual.init(p);
      setP(p);
    }, container);

    return () => {
      setP(null);
      Contextual.clear();
      p5.remove();
    };
  }, [containerRef.current, sketch]);

  useEffect(() => {
    const resizeListener = () => {
      if (!p) return;
      if (!containerRef.current) return;
      const container = containerRef.current;

      const { width, height } = container.getBoundingClientRect();
      const zoom = window.devicePixelRatio;

      size.set(width, height).mult(zoom);
      p.resizeCanvas(size.x, size.y);
    };

    window.addEventListener('resize', resizeListener);
    resizeListener();

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [p, containerRef]);

  return (
    <div
      className={cl(style.container, className)}
      {...otherProps}
      ref={containerRef}
    />
  );
});
