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

    export interface Face {
        A: number;
        B: number;
        C: number;
    }

    export class Mesh {
        Position: BABYLON.Vector3;
        Rotation: BABYLON.Vector3;
        Vertices: BABYLON.Vector3[];
        Faces: Face[];

        constructor(public name: string, verticesCount: number, 
            facesCount: number) {
            this.Vertices = new Array(verticesCount);
            this.Faces = new Array(facesCount);
            this.Rotation = new BABYLON.Vector3(0,0,0);
            this.Position = new BABYLON.Vector3(0,0,0);
        }
    }

    export class Device {
        private backbuffer: ImageData;
        private workingCanvas: HTMLCanvasElement;
        private workingContext: CanvasRenderingContext2D;
        private workingWidth: number;
        private workingHeight: number;
        private backbufferdata;

        constructor(canvas: HTMLCanvasElement) {
            this.workingCanvas = canvas;
            this.workingWidth = canvas.width;
            this.workingHeight = canvas.height;
            this.workingContext = this.workingCanvas.getContext("2d");
        }

        public clear(): void {
            this.workingContext
                .clearRect(0, 0, this.workingWidth, this.workingHeight);
            this.backbuffer = this.workingContext
                .getImageData(0, 0, this.workingWidth, this.workingHeight);
        }

        public present(): void {
            this.workingContext.putImageData(this.backbuffer, 0, 0);
        }

        public putPixel(x: number, y: number, color: BABYLON.Color4): void {
            this.backbufferdata = this.backbuffer.data;
            var index: number = 
                ((x >> 0) + (y >> 0) * this.workingWidth) * 4;
            this.backbufferdata[index] = color.r * 255;
            this.backbufferdata[index + 1] = color.g * 255;
            this.backbufferdata[index + 2] = color.b * 255;
            this.backbufferdata[index + 3] = color.a * 255;
        }

        public project(coord: BABYLON.Vector3, transMat: BABYLON.Matrix): BABYLON.Vector3 {
            var point = BABYLON.Vector3.TransformCoordinates(coord, transMat);
            var x = point.x * this.workingWidth + this.workingWidth / 2.0;
            var y = -point.y * this.workingHeight + this.workingHeight / 2.0;
            return (new BABYLON.Vector3(x, y, point.z));
        }

        public render(camera: Camera, meshes: Mesh[]): void {
            var viewMatrix = BABYLON.Matrix.LookAtLH(camera.Position, 
                camera.Target, BABYLON.Vector3.Up());
            var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(0.78, 
                this.workingWidth / this.workingHeight, 0.01, 1.0);

            for (var index = 0; index < meshes.length; index++) {
                var currentMesh = meshes[index];
                var WorldMatrix = BABYLON.Matrix.RotationYawPitchRoll(
                    currentMesh.Rotation.y, 
                    currentMesh.Rotation.x, 
                    currentMesh.Rotation.z
                        ).multiply(BABYLON.Matrix.Translation(
                            currentMesh.Position.x, 
                            currentMesh.Position.y, 
                            currentMesh.Position.z
                ));
                
                var transformMatrix = WorldMatrix.multiply(viewMatrix)
                                                    .multiply(projectionMatrix);
            }
        }
    }
}
