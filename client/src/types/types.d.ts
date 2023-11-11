import P5, { p5InstanceExtensions } from 'p5';

declare global {
  type P5Type = P5 & p5InstanceExtensions;
}
