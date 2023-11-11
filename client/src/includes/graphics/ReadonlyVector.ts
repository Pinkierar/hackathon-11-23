import {Vector} from 'p5';

type ReadonlyVectorField =
  'x' |
  'y' |
  'z' |
  'copy' |
  'angleBetween' |
  'array' |
  'toString' |
  'mag' |
  'magSq' |
  'dot' |
  'cross' |
  'dist' |
  'heading' |
  'equals';

export type _ReadonlyVector = Pick<Vector, ReadonlyVectorField>;