import { mat4 } from "gl-matrix";

export class Camera {
  private _rotation: number = 0;

  private projectionMatrix: mat4 = mat4.create();
  private viewMatrix: mat4 = mat4.create();
  private viewProjMatrix: mat4 = mat4.create();

  constructor(
    private left: number = -1.0,
    private right: number = 1.0,
    private bottom: number = -1.0,
    private top: number = 1.0,
    private _position: [number, number, number] = [0, 0, 0]
  ) {
    this.recalculateMatrices();
  }

  private recalculateMatrices() {
    mat4.ortho(
      this.projectionMatrix,
      this.left,
      this.right,
      this.bottom,
      this.top,
      -1,
      1
    );

    const transform = mat4.create();
    mat4.translate(transform, transform, this._position);
    mat4.rotateZ(transform, transform, this._rotation);
    mat4.invert(this.viewMatrix, transform);

    mat4.mul(this.viewProj, this.projectionMatrix, this.viewMatrix);
  }

  public get position(): [number, number, number] {
    return this._position;
  }

  public set position(position: [number, number, number]) {
    this._position = position;
    this.recalculateMatrices();
  }

  public move(delta: [number, number, number]) {
    this.position = [
      this._position[0] + delta[0],
      this._position[1] + delta[1],
      this._position[2] + delta[2]
    ];
  }

  public get rotation(): number {
    return this._rotation;
  }

  public set rotation(radians: number) {
    this._rotation = radians;
    this.recalculateMatrices();
  }

  public get viewProj() {
    return this.viewProjMatrix;
  }

  public get projection() {
    return this.projectionMatrix;
  }

  public get view() {
    return this.viewMatrix;
  }
}
