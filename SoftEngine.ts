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

        public drawPoint(point: BABYLON.Vector2, color: BABYLON.Color4): void {
            if (point.x >= 0 && point.y >= 0 && 
                point.x < this.workingWidth && point.y < this.workingHeight) {
                    this.putPixel(point.x, point.y, color);
                }
        }

        public clamp(value: number): number {
            var min = 0;
            var max = 1;
            return Math.max(min, Math.min(value, max));
        }

        public interpolate(min: number, max: number, gradient: number) {
            return min + (max - min) * this.clamp(gradient);
        }

        public processScanLine(y: number, pa: BABYLON.Vector3, pb: BABYLON.Vector3,
            pc: BABYLON.Vector3, pd: BABYLON.Vector3, color: BABYLON.Color4): void {
                var gradient1 = pa.y != pb.y ? (y - pa.y) / (pb.y - pa.y) : 1;
                var gradient2 = pc.y != pd.y ? (y - pc.y) / (pd.y - pc.y) : 1;
                var sx = this.interpolate(pa.x, pb.x, gradient1) >> 0;
                var ex = this.interpolate(pc.x, pd.x, gradient2) >> 0;
                for (var x = sx; x < ex; x++) {
                    this.drawPoint(new BABYLON.Vector2(x, y), color);
                }
        }

        public drawTriangle(p1: BABYLON.Vector3, p2: BABYLON.Vector3, 
                            p3: BABYLON.Vector3,
                            color: BABYLON.Color4): void {
            if (p1.y > p2.y) {
                var temp = p2;
                p2 = p1;
                p1 = temp;
            }

            if (p2.y > p3.y) {
                var temp = p2;
                p2 = p3;
                p3 = temp;
            }

            if (p1.y > p2.y) {
                var temp = p2;
                p2 = p1;
                p1 = temp;
            }

            var dP1P2: number; var dP1P3: number;

            if (p2.y - p1.y > 0)
                dP1P2 = (p2.x - p1.x) / (p2.y - p1.y);
            else
                dP1P2 = 0;
            
            if (p3.y - p1.y > 0)
                dP1P3 = (p3.x - p1.x) / (p3.y - p1.y);
            else
                dP1P3 = 0;

            if (dP1P2 > dP1P3) {
                for (var y = p1.y >> 0; y <= p3.y >> 0; y++) {
                    if (y < p2.y) {
                        this.processScanLine(y, p1, p3, p1, p2, color);
                    } else {
                        this.processScanLine(y, p1, p3, p2, p3, color);
                    }
                }
            } else {
                for (var y = p1.y >> 0; y <= p3.y >> 0; y++) {
                    if (y < p2.y) {
                        this.processScanLine(y, p1, p2, p1, p3, color);
                    } else {
                        this.processScanLine(y, p2, p3, p1, p3, color);
                    }
                }
            }
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
