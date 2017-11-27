///<reference path="babylon.math.ts"/>
var SoftEngine;
(function (SoftEngine) {
    var Camera = /** @class */ (function () {
        function Camera() {
            this.Position = BABYLON.Vector3.Zero();
            this.Target = BABYLON.Vector3.Zero();
        }
        return Camera;
    }());
    SoftEngine.Camera = Camera;
    var Mesh = /** @class */ (function () {
        function Mesh(name, verticesCount, facesCount) {
            this.name = name;
            this.Vertices = new Array(verticesCount);
            this.Faces = new Array(facesCount);
            this.Rotation = new BABYLON.Vector3(0, 0, 0);
            this.Position = new BABYLON.Vector3(0, 0, 0);
        }
        return Mesh;
    }());
    SoftEngine.Mesh = Mesh;
    var Device = /** @class */ (function () {
        function Device(canvas) {
            this.workingCanvas = canvas;
            this.workingWidth = canvas.width;
            this.workingHeight = canvas.height;
            this.workingContext = this.workingCanvas.getContext("2d");
            this.depthbuffer = new Array(this.workingHeight * this.workingWidth);
        }
        Device.prototype.clear = function () {
            this.workingContext
                .clearRect(0, 0, this.workingWidth, this.workingHeight);
            this.backbuffer = this.workingContext
                .getImageData(0, 0, this.workingWidth, this.workingHeight);
            for (var i = 0; i < this.depthbuffer.length; i++) {
                this.depthbuffer[i] = 10000000;
            }
        };
        Device.prototype.present = function () {
            this.workingContext.putImageData(this.backbuffer, 0, 0);
        };
        Device.prototype.putPixel = function (x, y, z, color) {
            this.backbufferdata = this.backbuffer.data;
            var index = ((x >> 0) + (y >> 0) * this.workingWidth);
            var index4 = index * 4;
            if (this.depthbuffer[index] < z)
                return;
            this.depthbuffer[index] = z;
            this.backbufferdata[index4] = color.r * 255;
            this.backbufferdata[index4 + 1] = color.g * 255;
            this.backbufferdata[index4 + 2] = color.b * 255;
            this.backbufferdata[index4 + 3] = color.a * 255;
        };
        Device.prototype.project = function (coord, transMat) {
            var point = BABYLON.Vector3.TransformCoordinates(coord, transMat);
            var x = point.x * this.workingWidth + this.workingWidth / 2.0;
            var y = -point.y * this.workingHeight + this.workingHeight / 2.0;
            return (new BABYLON.Vector3(x, y, point.z));
        };
        Device.prototype.drawPoint = function (point, color) {
            if (point.x >= 0 && point.y >= 0 &&
                point.x < this.workingWidth && point.y < this.workingHeight) {
                this.putPixel(point.x, point.y, point.z, color);
            }
        };
        Device.prototype.clamp = function (value) {
            var min = 0;
            var max = 1;
            return Math.max(min, Math.min(value, max));
        };
        Device.prototype.interpolate = function (min, max, gradient) {
            return min + (max - min) * this.clamp(gradient);
        };
        Device.prototype.processScanLine = function (y, pa, pb, pc, pd, color) {
            var gradient1 = pa.y != pb.y ? (y - pa.y) / (pb.y - pa.y) : 1;
            var gradient2 = pc.y != pd.y ? (y - pc.y) / (pd.y - pc.y) : 1;
            var sx = this.interpolate(pa.x, pb.x, gradient1) >> 0;
            var ex = this.interpolate(pc.x, pd.x, gradient2) >> 0;
            for (var x = sx; x < ex; x++) {
                this.drawPoint(new BABYLON.Vector2(x, y), color);
            }
        };
        Device.prototype.drawTriangle = function (p1, p2, p3, color) {
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
            var dP1P2;
            var dP1P3;
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
                    }
                    else {
                        this.processScanLine(y, p1, p3, p2, p3, color);
                    }
                }
            }
            else {
                for (var y = p1.y >> 0; y <= p3.y >> 0; y++) {
                    if (y < p2.y) {
                        this.processScanLine(y, p1, p2, p1, p3, color);
                    }
                    else {
                        this.processScanLine(y, p2, p3, p1, p3, color);
                    }
                }
            }
        };
        Device.prototype.render = function (camera, meshes) {
            var viewMatrix = BABYLON.Matrix.LookAtLH(camera.Position, camera.Target, BABYLON.Vector3.Up());
            var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(0.78, this.workingWidth / this.workingHeight, 0.01, 1.0);
            for (var index = 0; index < meshes.length; index++) {
                var currentMesh = meshes[index];
                var WorldMatrix = BABYLON.Matrix.RotationYawPitchRoll(currentMesh.Rotation.y, currentMesh.Rotation.x, currentMesh.Rotation.z).multiply(BABYLON.Matrix.Translation(currentMesh.Position.x, currentMesh.Position.y, currentMesh.Position.z));
                var transformMatrix = WorldMatrix.multiply(viewMatrix)
                    .multiply(projectionMatrix);
            }
            for (var indexFaces = 0; indexFaces < currentMesh.Faces.length; indexFaces++) {
                var currentFace = currentMesh.Faces[indexFaces];
                var vertexA = currentMesh.Vertices[currentFace.A];
                var vertexB = currentMesh.Vertices[currentFace.B];
                var vertexC = currentMesh.Vertices[currentFace.C];
                var pixelA = this.project(vertexA, transformMatrix);
                var pixelB = this.project(vertexB, transformMatrix);
                var pixelC = this.project(vertexC, transformMatrix);
                var color = 0.25 +
                    ((indexFaces % currentMesh.Faces.length) /
                        currentMesh.Faces.length) * 0.75;
                this.drawTriangle(pixelA, pixelB, pixelC, new BABYLON.Color4(color, color, color, 1));
            }
        };
        return Device;
    }());
    SoftEngine.Device = Device;
})(SoftEngine || (SoftEngine = {}));
