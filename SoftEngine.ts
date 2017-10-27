///<reference path="babylon.math.ts"/>
module SoftEngine {
    export class Camera {
        Position: BABYLON.Vector3;
        Target: BABYLON.Vector3;

        constructor() {
            this.Position = BABYLON.Vector3.Zero();
            this.Target = BABYLON.Vector3.Zero();
        }
    }

    export class Mesh {
        Position: BABYLON.Vector3;
        Rotation: BABYLON.Vector3;
        Vertices: BABYLON.Vector3[];

        constructor(public name: string, verticesCount: number) {
            this.Vertices = new Array(verticesCount);
            this.Rotation = BABYLON.Vector3.Zero();
            this.Rotation = BABYLON.Vector3.Zero();
        }
    }

    export class Device {
        private backBuffer: ImageData;
        private workingCanvas: HTMLCanvasElement;
        private workingContext: CanvasRenderingContext2D;
    }
}