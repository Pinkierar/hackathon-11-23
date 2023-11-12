import P5, { p5InstanceExtensions } from 'p5';

declare global {
  type P5Type = P5 & p5InstanceExtensions;
  type Falsy = false | 0 | '' | null | undefined;
  type Vector4b = [boolean, boolean, boolean, boolean];
  type Vector4n = [number, number, number, number];
  type Matrix4x4n = [Vector4n, Vector4n, Vector4n, Vector4n];
  type Matrix4x4b = [Vector4b, Vector4b, Vector4b, Vector4b];
}
