import { HTMLAttributes, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Contextual } from '#includes/graphics';
import P5 from 'p5';
import style from './style.module.scss';
import { cl } from '#includes/cl';

export type Sketch = {
  preload?: () => void;
  setup?: () => void;
  draw?: () => void;
  windowResized?: () => void;
};

type P5CanvasPropsMin = {
  children?: never;
  sketch?: (p: P5Type) => Sketch;
};

type P5CanvasProps = Omit<HTMLAttributes<HTMLElement>, keyof P5CanvasPropsMin> &
  P5CanvasPropsMin;

export const P5Canvas = observer<P5CanvasProps>((props) => {
  const { children, sketch, className, ...otherProps } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const p5 = new P5((p: P5Type) => {
      const { preload, draw, setup, windowResized } = sketch
        ? sketch(p)
        : ({} as Sketch);

      p.preload = () => preload && preload();
      p.setup = () => {
        p.createCanvas(1, 1, p.P2D);
        setup && setup();
        p.windowResized();
      };
      p.draw = () => draw && draw();
      p.windowResized = () => {
        const { width, height } = container.getBoundingClientRect();
        const zoom = window.devicePixelRatio;

        p.resizeCanvas(width * zoom, height * zoom);

        windowResized && windowResized();
      };

      Contextual.init(p);
    }, container);

    return () => {
      Contextual.clear();
      p5.remove();
    };
  }, [containerRef.current, sketch]);

  return (
    <div
      className={cl(style.container, className)}
      {...otherProps}
      ref={containerRef}
    />
  );
});
