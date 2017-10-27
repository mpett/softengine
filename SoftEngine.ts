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

        constructor(public name: string, verticesCount: number, facesCount: number) {
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
            this.workingContext.clearRect(0, 0, this.workingWidth, this.workingHeight);
            this.backbuffer = this.workingContext.getImageData(0, 0, this.workingWidth, this.workingHeight);
        }

        public present(): void {
            this.workingContext.putImageData(this.backbuffer, 0, 0);
        }

        public putPixel(x: number, y: number, color: BABYLON.Color4): void {
            this.backbufferdata = this.backbuffer.data;
            var index: number = ((x >> 0) + (y >> 0) * this.workingWidth) * 4;
            this.backbufferdata[index] = color.r * 255;
            this.backbufferdata[index + 1] = color.g * 255;
            this.backbufferdata[index + 2] = color.b * 255;
            this.backbufferdata[index + 3] = color.a * 255;
        }

        public project(coord: BABYLON.Vector3, transMat: BABYLON.Matrix): BABYLON.Vector2 {
            var point = BABYLON.Vector3.TransformCoordinates(coord, transMat);
            var x = point.x * this.workingWidth + this.workingWidth / 2.0 >> 0;
            var y = -point.y * this.workingHeight + this.workingHeight / 2.0 >> 0;
            return (new BABYLON.Vector2(x, y));
        }

        public drawPoint(point: BABYLON.Vector2): void {
            if (point.x >= 0 && point.y >=0 && point.x < this.workingWidth && point.y < this.workingHeight) {
                this.putPixel(point.x, point.y, new BABYLON.Color4(1, 1, 0, 1));
            }
        }

        public drawLine(point0: BABYLON.Vector2, point1: BABYLON.Vector2): void {
            var distance = point1.subtract(point0).length();
            if (distance < 2)
                return;
            var middlePoint = point0.add((point1.subtract(point0)).scale(0.5));
            this.drawPoint(middlePoint);
            this.drawLine(point0, middlePoint);
            this.drawLine(middlePoint, point1);
        }

        public render(camera: Camera, meshes: Mesh[]): void {
            var viewMatrix = BABYLON.Matrix.LookAtLH(camera.Position, camera.Target, BABYLON.Vector3.Up());
            var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(0.78, this.workingWidth / this.workingHeight, 0.01, 1.0);

            for (var index = 0; index < meshes.length; index++) {
                var currentMesh = meshes[index];
                var WorldMatrix = BABYLON.Matrix.RotationYawPitchRoll(
                    currentMesh.Rotation.y, currentMesh.Rotation.x, currentMesh.Rotation.z
                        ).multiply(BABYLON.Matrix.Translation(
                            currentMesh.Position.x, currentMesh.Position.y, currentMesh.Position.z
                ));
                
                var transformMatrix = WorldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
                for (var indexVertices = 0; indexVertices < currentMesh.Vertices.length;
                            indexVertices++) {
                    var projectedPoint = this.project
                        (currentMesh.Vertices[indexVertices], transformMatrix);
                    this.drawPoint(projectedPoint);
                }

                for (var i = 0; i < currentMesh.Vertices.length - 1; i++) {
                    var point0 = this.project(currentMesh.Vertices[i], transformMatrix);
                    var point1 = this.project(currentMesh.Vertices[i+1], transformMatrix);
                    this.drawLine(point0, point1);
                }

                for (var indexFaces = 0; indexFaces < currentMesh.Faces.length; indexFaces++) {
                    var currentFace = currentMesh.Faces[indexFaces];
                    var vertexA = currentMesh.Vertices[currentFace.A];
                    var vertexB = currentMesh.Vertices[currentFace.B];
                    var vertexC = currentMesh.Vertices[currentFace.C];
                    var pixelA = this.project(vertexA, transformMatrix);
                    var pixelB = this.project(vertexB, transformMatrix);
                    var pixelC = this.project(vertexC, transformMatrix);
                    this.drawLine(pixelA, pixelB);
                    this.drawLine(pixelB, pixelC);
                    this.drawLine(pixelC, pixelA);
                }
            }
        }
    }
}
