/* JSModeler 0.45 - http://www.github.com/kovacsv/JSModeler */
'use strict';
JSM.ConvertBodyToThreeMeshes = function(a, b, e) {
    var d = {
        textureLoadedCallback: null,
        hasConvexPolygons: !1
    };
    void 0 !== e && null !== e && (d.textureLoadedCallback = JSM.ValueOrDefault(e.textureLoadedCallback, d.textureLoadedCallback), d.hasConvexPolygons = JSM.ValueOrDefault(e.hasConvexPolygons, d.hasConvexPolygons));
    var c = [],
        g = null,
        f = null;
    JSM.ExplodeBody(a, b, {
        hasConvexPolygons: d.hasConvexPolygons,
        onPointGeometryStart: function(a) {
            f = new THREE.PointsMaterial({
                color: a.diffuse,
                size: a.pointSize
            });
            g = new THREE.Geometry
        },
        onPointGeometryEnd: function() {
            var a = new THREE.Points(g, f);
            c.push(a)
        },
        onPoint: function(a) {
            g.vertices.push(new THREE.Vector3(a.x, a.y, a.z))
        },
        onLineGeometryStart: function(a) {
            g = new THREE.Geometry;
            f = new THREE.LineBasicMaterial({
                color: a.diffuse
            })
        },
        onLineGeometryEnd: function() {
            var a = new THREE.LineSegments(g, f);
            c.push(a)
        },
        onLine: function(a, b) {
            g.vertices.push(new THREE.Vector3(a.x, a.y, a.z));
            g.vertices.push(new THREE.Vector3(b.x, b.y, b.z))
        },
        onGeometryStart: function(a) {
            var b = null !== a.texture,
                e = 1 !== a.opacity,
                c =
                a.diffuse,
                G = a.specular,
                t = a.shininess;
            0 === t && (G = 0, t = 1);
            f = new THREE.MeshPhongMaterial({
                color: c,
                specular: G,
                shininess: t
            });
            a.singleSided || (f.side = THREE.DoubleSide);
            e && (f.opacity = a.opacity, f.transparent = !0);
            if (b) {
                var m = f;
                a = a.texture;
                (new THREE.TextureLoader).load(a, function(a) {
                    a.image = JSM.ResizeImageToPowerOfTwoSides(a.image);
                    a.wrapS = THREE.RepeatWrapping;
                    a.wrapT = THREE.RepeatWrapping;
                    m.map = a;
                    m.needsUpdate = !0;
                    null !== d.textureLoadedCallback && d.textureLoadedCallback()
                })
            }
            g = new THREE.Geometry
        },
        onGeometryEnd: function() {
            g.computeFaceNormals();
            var a = new THREE.Mesh(g, f);
            c.push(a)
        },
        onTriangle: function(a, b, e, c, d, f, m, F, p) {
            var n = g.vertices.length;
            g.vertices.push(new THREE.Vector3(a.x, a.y, a.z));
            g.vertices.push(new THREE.Vector3(b.x, b.y, b.z));
            g.vertices.push(new THREE.Vector3(e.x, e.y, e.z));
            a = new THREE.Face3(n + 0, n + 1, n + 2);
            g.faces.push(a);
            null !== c && (null !== d && null !== f) && (a = [], a.push(new THREE.Vector3(c.x, c.y, c.z)), a.push(new THREE.Vector3(d.x, d.y, d.z)), a.push(new THREE.Vector3(f.x, f.y, f.z)), g.faces[g.faces.length - 1].vertexNormals = a);
            null !== m && (null !==
                F && null !== p) && (c = [], c.push(new THREE.Vector2(m.x, -m.y)), c.push(new THREE.Vector2(F.x, -F.y)), c.push(new THREE.Vector2(p.x, -p.y)), g.faceVertexUvs[0].push(c))
        }
    });
    return c
};
JSM.ConvertModelToThreeMeshes = function(a, b) {
    var e = [],
        d = a.GetMaterialSet(),
        c, g, f;
    for (c = 0; c < a.BodyCount(); c++) {
        g = a.GetBody(c);
        f = JSM.ConvertBodyToThreeMeshes(g, d, b);
        for (g = 0; g < f.length; g++) e.push(f[g])
    }
    return e
};
JSM.ConvertJSONDataToThreeMeshes = function(a, b, e) {
    function d(a, e, c, d) {
        function g(a, c, d, f, k, n) {
            function m(a, b, c, e, d) {
                var f = new THREE.Vector2(a, b);
                if (!JSM.IsZero(d)) {
                    var g = Math.sin(d * JSM.DegRad);
                    d = Math.cos(d * JSM.DegRad);
                    f.x = d * a - g * b;
                    f.y = g * a + d * b
                }
                f.x = c[0] + f.x * e[0];
                f.y = c[1] + f.y * e[1];
                return f
            }
            var p = a.material;
            a = a.parameters;
            var h = k[p];
            k = h.texture;
            var u = h.offset,
                v = h.scale,
                w = h.rotation,
                x = new THREE.Color,
                s = new THREE.Color,
                y = h.shininess || 0;
            x.setRGB(h.diffuse[0], h.diffuse[1], h.diffuse[2]);
            s.setRGB(h.specular[0],
                h.specular[1], h.specular[2]);
            if (void 0 !== k && null !== k) {
                x.setRGB(1, 1, 1);
                s.setRGB(1, 1, 1);
                if (void 0 === u || null === u) u = [0, 0];
                if (void 0 === v || null === v) v = [1, 1];
                if (void 0 === w || null === w) w = 0
            }
            0 === y && (s.setRGB(0, 0, 0), y = 1);
            var z = new THREE.MeshPhongMaterial({
                color: x.getHex(),
                specular: s.getHex(),
                shininess: y,
                side: THREE.DoubleSide
            });
            1 !== h.opacity && (z.opacity = h.opacity, z.transparent = !0);
            void 0 !== k && null !== k && (new THREE.TextureLoader).load(k, function(a) {
                a.image = JSM.ResizeImageToPowerOfTwoSides(a.image);
                a.wrapS = THREE.RepeatWrapping;
                a.wrapT = THREE.RepeatWrapping;
                z.map = a;
                z.needsUpdate = !0;
                void 0 !== b && null !== b && b()
            });
            var h = new THREE.Geometry,
                q, A, B, r, C, D, E, t, l;
            for (l = 0; l < a.length; l += 9) q = 3 * a[l + 0], A = 3 * a[l + 1], B = 3 * a[l + 2], r = 3 * a[l + 3], C = 3 * a[l + 4], D = 3 * a[l + 5], x = 2 * a[l + 6], s = 2 * a[l + 7], y = 2 * a[l + 8], E = h.vertices.length, t = h.faces.length, h.vertices.push(new THREE.Vector3(c[q + 0], c[q + 1], c[q + 2])), h.vertices.push(new THREE.Vector3(c[A + 0], c[A + 1], c[A + 2])), h.vertices.push(new THREE.Vector3(c[B + 0], c[B + 1], c[B + 2])), h.faces.push(new THREE.Face3(E + 0, E + 1, E + 2)), q = [], q.push(new THREE.Vector3(d[r + 0], d[r + 1], d[r + 2])), q.push(new THREE.Vector3(d[C + 0], d[C + 1], d[C + 2])), q.push(new THREE.Vector3(d[D + 0], d[D + 1], d[D + 2])), h.faces[t].vertexNormals = q, void 0 !== k && null !== k && (r = [], r.push(m(f[x + 0], f[x + 1], u, v, w)), r.push(m(f[s + 0], f[s + 1], u, v, w)), r.push(m(f[y + 0], f[y + 1], u, v, w)), h.faceVertexUvs[0].push(r));
            c = new THREE.Mesh(h, z);
            c.originalJsonMaterialIndex = p;
            c.originalJsonMeshIndex = e;
            n.push(c)
        }
        var f = a.vertices;
        if (void 0 !== f) {
            var k = a.normals;
            if (void 0 !== k) {
                var p = a.uvs;
                if (void 0 !== p) {
                    a =
                        a.triangles;
                    var n;
                    for (n = 0; n < a.length; n++) g(a[n], f, k, p, c, d)
                }
            }
        }
    }
    var c = [],
        g = a.materials;
    if (void 0 === g) return c;
    var f = a.meshes;
    if (void 0 === f) return c;
    var k = 0;
    JSM.AsyncRunTask(function() {
        d(f[k], k, g, c);
        k += 1;
        return !0
    }, e, f.length, 0, c);
    return c
};
JSM.ThreeViewer = function() {
    this.enableDraw = this.drawLoop = this.settings = this.navigation = this.cameraMove = this.runAfterRender = this.runBeforeRender = this.directionalLight = this.ambientLight = this.renderer = this.camera = this.scene = this.canvas = null
};
JSM.ThreeViewer.prototype.Start = function(a, b) {
    if (!JSM.IsWebGLEnabled() || !this.InitSettings(b) || !this.InitThree(a) || !this.InitCamera(b) || !this.InitLights()) return !1;
   
    this.drawLoop = !1;
    this.enableDraw = !0;
    this.DrawIfNeeded();
    return !0
};
JSM.ThreeViewer.prototype.InitSettings = function(a) {
    this.settings = {
        cameraEyePosition: new JSM.Coord(1, 1, 1),
        cameraCenterPosition: new JSM.Coord(0, 0, 0),
        cameraUpVector: new JSM.Coord(0, 0, 1),
        lightAmbientColor: [0.5, 0.5, 0.5],
        lightDiffuseColor: [0.5, 0.5, 0.5]
    };
    void 0 !== a && (void 0 !== a.cameraEyePosition && (this.settings.cameraEyePosition = JSM.CoordFromArray(a.cameraEyePosition)), void 0 !== a.cameraCenterPosition && (this.settings.cameraCenterPosition = JSM.CoordFromArray(a.cameraCenterPosition)), void 0 !== a.cameraUpVector &&
        (this.settings.cameraUpVector = JSM.CoordFromArray(a.cameraUpVector)), void 0 !== a.lightAmbientColor && (this.settings.lightAmbientColor = a.lightAmbientColor), void 0 !== a.lightDiffuseColor && (this.settings.lightDiffuseColor = a.lightDiffuseColor));
    return !0
};
JSM.ThreeViewer.prototype.InitThree = function(a) {
	
    this.canvas = a;
    if (!this.canvas || !this.canvas.getContext) return !1;
    this.scene = new THREE.Scene;
    if (!this.scene) return !1;
    this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: !0
    });
    if (!this.renderer) return !1;
    this.renderer.setClearColor(new THREE.Color(16777215));
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    
   
    
//    var grid = new THREE.GridHelper(1000, 1000, 0x000000, 0x000000);
//	grid.material.opacity = 0.2;
////	grid.position.y = yx;
//	grid.material.tranparent = true;
//	this.scene.add(grid);
    
    
    return !0
};
JSM.ThreeViewer.prototype.InitCamera = function(a) {
	
    this.cameraMove = new JSM.Camera(JSM.CoordFromArray(a.cameraEyePosition), JSM.CoordFromArray(a.cameraCenterPosition), JSM.CoordFromArray(a.cameraUpVector), a.fieldOfView, a.nearClippingPlane, a.farClippingPlane);
    if (!this.cameraMove) return !1;
    this.navigation = new JSM.Navigation;
    if (!this.navigation.Init(this.canvas, this.cameraMove, this.DrawIfNeeded.bind(this), this.Resize.bind(this))) return !1;
    this.camera = new THREE.PerspectiveCamera(this.cameraMove.fieldOfView,
        this.canvas.width / this.canvas.height, this.cameraMove.nearClippingPlane, this.cameraMove.farClippingPlane);
    if (!this.camera) return !1;
    this.scene.add(this.camera);
    return !0
};
JSM.ThreeViewer.prototype.InitLights = function() {
	
    var a = new THREE.Color,
        b = new THREE.Color;
    a.setRGB(this.settings.lightAmbientColor[0], this.settings.lightAmbientColor[1], this.settings.lightAmbientColor[2]);
    b.setRGB(this.settings.lightDiffuseColor[0], this.settings.lightDiffuseColor[1], this.settings.lightDiffuseColor[2]);
    this.ambientLight = new THREE.AmbientLight(a.getHex());
    if (!this.ambientLight) return !1;
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(b.getHex());
    if (!this.directionalLight) return !1;
    a = (new THREE.Vector3).subVectors(this.cameraMove.eye, this.cameraMove.center);
    this.directionalLight.position.set(a.x, a.y, a.z);
    this.scene.add(this.directionalLight);
    

    
    
    return !0
};
JSM.ThreeViewer.prototype.SetRunBeforeRender = function(a) {
    this.runBeforeRender = a
};
JSM.ThreeViewer.prototype.SetRunAfterRender = function(a) {
    this.runAfterRender = a
};
JSM.ThreeViewer.prototype.SetClearColor = function(a) {
    this.renderer.setClearColor(new THREE.Color(a));
    this.DrawIfNeeded()
};
JSM.ThreeViewer.prototype.AddMesh = function(a) {
	
    this.scene.add(a);
    this.DrawIfNeeded()
};
JSM.ThreeViewer.prototype.AddMeshes = function(a) {
	
    var b;
    for (b = 0; b < a.length; b++) this.scene.add(a[b]);
    this.DrawIfNeeded()
};
JSM.ThreeViewer.prototype.MeshCount = function() {
	
    var a = 0,
        b = this;
    this.scene.traverse(function(e) {
        b.IsRelevantObject(e) && (a += 1)
    });
    return a
};
JSM.ThreeViewer.prototype.VisibleMeshCount = function() {
    var a = 0,
        b = this;
    this.scene.traverse(function(e) {
        b.IsVisibleObject(e) && (a += 1)
    });
    return a
};
JSM.ThreeViewer.prototype.VertexCount = function() {
    var a = 0,
        b = this;
    this.scene.traverse(function(e) {
        b.IsRelevantObject(e) && (a += e.geometry.vertices.length)
    });
    return a
};
JSM.ThreeViewer.prototype.FaceCount = function() {
    var a = 0;
    this.scene.traverse(function(b) {
        b instanceof THREE.Mesh && (a += b.geometry.faces.length)
    });
    return a
};
JSM.ThreeViewer.prototype.GetMesh = function(a) {
    var b = null,
        e = 0,
        d;
    for (d = 0; d < this.scene.children.length; d++)
        if (b = this.scene.children[d], this.IsRelevantObject(b)) {
            if (e == a) return b;
            e += 1
        } return null
};
JSM.ThreeViewer.prototype.ShowMesh = function(a) {
    a.visible = !0;
    this.DrawIfNeeded()
};
JSM.ThreeViewer.prototype.HideMesh = function(a) {
    a.visible = !1;
    this.DrawIfNeeded()
};
JSM.ThreeViewer.prototype.RemoveMesh = function(a) {
    a.geometry.dispose();
    this.scene.remove(a);
    this.DrawIfNeeded()
};
JSM.ThreeViewer.prototype.RemoveMeshes = function() {
    var a, b;
    for (b = 0; b < this.scene.children.length; b++) a = this.scene.children[b], this.IsRelevantObject(a) && (a.geometry.dispose(), this.scene.remove(a), b--);
    this.DrawIfNeeded()
};
JSM.ThreeViewer.prototype.RemoveLastMesh = function() {
    var a = null,
        b = this;
    this.scene.traverse(function(e) {
        b.IsRelevantObject(e) && (a = e)
    });
    null !== a && this.scene.remove(a);
    this.DrawIfNeeded()
};
JSM.ThreeViewer.prototype.SetCamera = function(a, b, e) {
    this.navigation.SetCamera(a, b, e);
    this.navigation.SetOrbitCenter(b.Clone());
    this.DrawIfNeeded()
};
JSM.ThreeViewer.prototype.Resize = function() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.DrawIfNeeded()
};
JSM.ThreeViewer.prototype.FitInWindow = function() {
    if (0 !== this.VisibleMeshCount()) {
        var a = this.GetBoundingSphere();
        this.navigation.FitInWindow(a.GetCenter(), a.GetRadius());
        this.DrawIfNeeded()
    }
};
JSM.ThreeViewer.prototype.FitMeshesInWindow = function(a) {
    if (0 !== a.length) {
        var b = this.GetFilteredBoundingSphere(function(b) {
            return -1 != a.indexOf(b)
        });
        this.navigation.FitInWindow(b.GetCenter(), b.GetRadius());
        this.DrawIfNeeded()
    }
};
JSM.ThreeViewer.prototype.AdjustClippingPlanes = function(a) {
    this.GetBoundingSphere().GetRadius() < a ? (this.camera.near = 0.1, this.camera.far = 1E3) : (this.camera.near = 10, this.camera.far = 1E6);
    this.camera.updateProjectionMatrix();
    this.Draw()
};
JSM.ThreeViewer.prototype.GetCenter = function() {
    var a = this;
    return this.GetFilteredCenter(function(b) {
        return a.IsVisibleObject(b)
    })
};
JSM.ThreeViewer.prototype.GetBoundingBox = function() {
    var a = this;
    return this.GetFilteredBoundingBox(function(b) {
        return a.IsVisibleObject(b)
    })
};
JSM.ThreeViewer.prototype.GetBoundingSphere = function() {
    var a = this;
    return this.GetFilteredBoundingSphere(function(b) {
        return a.IsVisibleObject(b)
    })
};
JSM.ThreeViewer.prototype.GetFilteredCenter = function(a) {
    return this.GetFilteredBoundingBox(a).GetCenter()
};
JSM.ThreeViewer.prototype.GetFilteredBoundingBox = function(a) {
    var b = new JSM.Coord(JSM.Inf, JSM.Inf, JSM.Inf),
        e = new JSM.Coord(-JSM.Inf, -JSM.Inf, -JSM.Inf),
        d, c;
    this.scene.traverse(function(g) {
        if (a(g)) {
            d = g.geometry;
            var f;
            for (f = 0; f < d.vertices.length; f++) c = d.vertices[f].clone(), c.add(g.position), b.x = JSM.Minimum(b.x, c.x), b.y = JSM.Minimum(b.y, c.y), b.z = JSM.Minimum(b.z, c.z), e.x = JSM.Maximum(e.x, c.x), e.y = JSM.Maximum(e.y, c.y), e.z = JSM.Maximum(e.z, c.z)
        }
    });
    return new JSM.Box(b, e)
};
JSM.ThreeViewer.prototype.GetFilteredBoundingSphere = function(a) {
    var b = this.GetFilteredCenter(a),
        e = 0,
        d, c, g;
    this.scene.traverse(function(f) {
        if (a(f)) {
            d = f.geometry;
            var k;
            for (k = 0; k < d.vertices.length; k++) c = d.vertices[k].clone(), c.add(f.position), g = b.DistanceTo(new JSM.Coord(c.x, c.y, c.z)), JSM.IsGreater(g, e) && (e = g)
        }
    });
    return new JSM.Sphere(b, e)
};
JSM.ThreeViewer.prototype.GetObjectsUnderPosition = function(a, b) {
    var e = this.camera.position,
        d = new THREE.Vector3(2 * (a / this.canvas.width) - 1, 2 * -(b / this.canvas.height) + 1, 0.5);
    d.unproject(this.camera);
    d.sub(e);
    d.normalize();
    return (new THREE.Raycaster(e, d)).intersectObjects(this.scene.children)
};
JSM.ThreeViewer.prototype.GetObjectsUnderMouse = function() {
    return this.GetObjectsUnderPosition(this.navigation.mouse.curr.x, this.navigation.mouse.curr.y)
};
JSM.ThreeViewer.prototype.GetObjectsUnderTouch = function() {
    return this.GetObjectsUnderPosition(this.navigation.touch.curr.x, this.navigation.touch.curr.y)
};
JSM.ThreeViewer.prototype.ProjectVector = function(a, b, e) {
    var d = this.canvas.width / 2,
        c = this.canvas.height / 2;
    a = new THREE.Vector3(a, b, e);
    a.project(this.camera);
    a.x = a.x * d + d;
    a.y = -(a.y * c) + c;
    return a
};
JSM.ThreeViewer.prototype.EnableDraw = function(a) {
    this.enableDraw = a
};
JSM.ThreeViewer.prototype.Draw = function() {
    if (this.enableDraw) {
        null !== this.runBeforeRender && this.runBeforeRender();
        this.camera.position.set(this.cameraMove.eye.x, this.cameraMove.eye.y, this.cameraMove.eye.z);
        this.camera.up.set(this.cameraMove.up.x, this.cameraMove.up.y, this.cameraMove.up.z);
        this.camera.lookAt(new THREE.Vector3(this.cameraMove.center.x, this.cameraMove.center.y, this.cameraMove.center.z));
        var a = (new THREE.Vector3).subVectors(this.cameraMove.eye, this.cameraMove.center);
        this.directionalLight.position.set(a.x,
            a.y, a.z);
       
        
       
        
        this.renderer.render(this.scene, this.camera);
        null !== this.runAfterRender && this.runAfterRender();
        
        
        
 

        
        
        
 
        this.drawLoop && requestAnimationFrame(this.Draw.bind(this))
    }
};
JSM.ThreeViewer.prototype.DrawIfNeeded = function() {
    this.drawLoop || this.Draw()
};
JSM.ThreeViewer.prototype.StartDrawLoop = function() {
    this.drawLoop = !0;
    this.Draw()
};
JSM.ThreeViewer.prototype.IsRelevantObject = function(a) {
    return a instanceof THREE.Mesh || a instanceof THREE.LineSegments || a instanceof THREE.Points
};
JSM.ThreeViewer.prototype.IsVisibleObject = function(a) {
    return this.IsRelevantObject(a) && a.visible
};