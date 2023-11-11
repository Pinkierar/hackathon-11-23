import {HTMLAttributes, useEffect, useRef, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Contextual} from '#includes/graphics';
import P5 from 'p5';
import style from './style.module.scss';

type P5CanvasPropsMin = {
  children?: never,
  sketch?: (p: P5Type) => {
    setup?: () => void,
    draw?: () => void,
  },
};

type P5CanvasProps =
  Omit<HTMLAttributes<HTMLElement>, keyof P5CanvasPropsMin>
  & P5CanvasPropsMin;

export const P5Canvas = observer<P5CanvasProps>(props => {
  const {
    children,
    sketch,
    ...otherProps
  } = props;

  const [p, setP] = useState<P5Type | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    new P5((p: P5Type) => {
      const {draw, setup} = sketch
        ? sketch(p)
        : ({} as { draw: undefined, setup: undefined });

      p.setup = () => {
        p.createCanvas(1, 1, 'p2d', canvas);
        setup && setup();
      };
      p.draw = () => draw && draw();

      setP(p);
    });

    return () => {
      setP(null);
    };
  }, [canvasRef.current, sketch]);

  useEffect(() => {
    if (p === null) Contextual.clear();
    else Contextual.init(p);
  }, [p]);

  useEffect(() => {
    const resizeListener = () => {
      if (!p) return;
      if (!containerRef.current) return;
      const container = containerRef.current;

      const {width, height} = container.getBoundingClientRect();
      const zoom = window.devicePixelRatio;

      const size = p.createVector(width, height).mult(zoom);

      p.resizeCanvas(size.x, size.y);
    };

    resizeListener();
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [p, containerRef]);

  return (
    <div className={style.container} {...otherProps} ref={containerRef}>
      <canvas className={style.canvas} ref={canvasRef}/>
    </div>
  );
});