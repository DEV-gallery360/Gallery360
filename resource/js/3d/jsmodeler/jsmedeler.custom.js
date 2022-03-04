/* JSModeler 0.45 - http://www.github.com/kovacsv/JSModeler */
var JSM = function() {
    this.mainVersion = 0;
    this.subVersion = 45
};
JSM.RandomNumber = function(a, b) {
    return Math.random() * (b - a) + a
}
;
JSM.RandomInt = function(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a)
}
;
JSM.RandomBoolean = function() {
    return 1 === JSM.RandomInt(0, 1)
}
;
JSM.SeededRandomInt = function(a, b, c) {
    return Math.floor((9301 * c + 49297) % 233280 / 233280 * (b - a + 1) + a)
}
;
JSM.ValueOrDefault = function(a, b) {
    return void 0 === a || null === a ? b : a
}
;
JSM.PrevIndex = function(a, b) {
    return 0 < a ? a - 1 : b - 1
}
;
JSM.NextIndex = function(a, b) {
    return a < b - 1 ? a + 1 : 0
}
;
JSM.CopyObjectProperties = function(a, b, c) {
    if (!(void 0 === a || null === a || void 0 === b || null === b))
        for (var d in a)
            if (a.hasOwnProperty(d) && (c || void 0 === b[d] || null === b[d]))
                b[d] = a[d]
}
;
JSM.GetObjectProperty = function(a, b, c) {
    if (void 0 === a || null === a)
        return c;
    a = a[b];
    return void 0 === a || null === a ? c : a
}
;
JSM.Message = function(a) {
    console.log("JSModeler: " + a)
}
;
JSM.Timer = function() {
    this.stop = this.start = 0
}
;
JSM.Timer.prototype.Start = function() {
    this.start = (new Date).getTime()
}
;
JSM.Timer.prototype.Stop = function() {
    this.end = (new Date).getTime()
}
;
JSM.Timer.prototype.Result = function() {
    return this.end - this.start
}
;
JSM.FPSCounter = function() {
    this.current = this.frames = this.start = null
}
;
JSM.FPSCounter.prototype.Get = function(a) {
    var b = (new Date).getTime();
    null === this.start && (this.start = b,
    this.current = this.frames = 0);
    if (null === a || void 0 === a)
        a = 1E3;
    this.frames += 1;
    var c = b - this.start;
    c >= a && (this.current = 1E3 * (this.frames / c),
    this.start = b,
    this.frames = 0);
    return parseInt(this.current, 10)
}
;
JSM.SwapArrayValues = function(a, b, c) {
    var d = a[b];
    a[b] = a[c];
    a[c] = d
}
;
JSM.BubbleSort = function(a, b, c) {
    if (2 > a.length || void 0 === b || null === b)
        return !1;
    if (void 0 === c || null === c)
        c = function(b, c) {
            JSM.SwapArrayValues(a, b, c)
        }
        ;
    var d, e;
    for (d = 0; d < a.length - 1; d++)
        for (e = 0; e < a.length - d - 1; e++)
            b(a[e], a[e + 1]) || c(e, e + 1);
    return !0
}
;
JSM.ShiftArray = function(a, b) {
    var c;
    for (c = 0; c < b; c++)
        a.push(a.shift())
}
;
JSM.AsyncRunTask = function(a, b, c, d, e) {
    function f(b, e, k) {
        var l = a();
        if (void 0 !== k.onProgress && null !== k.onProgress)
            k.onProgress(b, e);
        l && b < c - 1 ? setTimeout(function() {
            f(b + 1, e, k)
        }, d) : setTimeout(function() {
            if (void 0 !== k.onFinish && null !== k.onFinish)
                k.onFinish(e)
        }, d)
    }
    if (void 0 === b || null === b)
        for (b = 0; b < c && !(e = a(),
        !e); b++)
            ;
    else {
        if (void 0 !== b.onStart && null !== b.onStart)
            b.onStart(c, e);
        f(0, e, b)
    }
}
;
JSM.IsWebGLEnabled = function() {
    if (!window.WebGLRenderingContext)
        return !1;
    try {
        var a = document.createElement("canvas");
        if (!a.getContext("experimental-webgl") && !a.getContext("webgl"))
            return !1
    } catch (b) {
        return !1
    }
    return !0
}
;
JSM.IsFileApiEnabled = function() {
    return !window.File || !window.FileReader || !window.FileList || !window.Blob || !window.URL ? !1 : !0
}
;
JSM.LoadJsonFile = function(a, b) {
    var c = new XMLHttpRequest;
    c.overrideMimeType("application/json");
    c.open("GET", a, !0);
    c.onreadystatechange = function() {
        if (4 == c.readyState) {
            var a = JSON.parse(c.responseText);
            b(a)
        }
    }
    ;
    c.send(null)
}
;
JSM.Eps = 1E-8;
JSM.Inf = 9999999999;
JSM.RadDeg = 57.29577951308232;
JSM.DegRad = 0.017453292519943;
JSM.IsZero = function(a) {
    return Math.abs(a) < JSM.Eps
}
;
JSM.IsPositive = function(a) {
    return a > JSM.Eps
}
;
JSM.IsNegative = function(a) {
    return a < -JSM.Eps
}
;
JSM.IsLower = function(a, b) {
    return b - a > JSM.Eps
}
;
JSM.IsGreater = function(a, b) {
    return a - b > JSM.Eps
}
;
JSM.IsEqual = function(a, b) {
    return Math.abs(b - a) < JSM.Eps
}
;
JSM.IsEqualWithEps = function(a, b, c) {
    return Math.abs(b - a) < c
}
;
JSM.IsLowerOrEqual = function(a, b) {
    return JSM.IsLower(a, b) || JSM.IsEqual(a, b)
}
;
JSM.IsGreaterOrEqual = function(a, b) {
    return JSM.IsGreater(a, b) || JSM.IsEqual(a, b)
}
;
JSM.Minimum = function(a, b) {
    return JSM.IsLower(a, b) ? a : b
}
;
JSM.Maximum = function(a, b) {
    return JSM.IsGreater(a, b) ? a : b
}
;
JSM.ArcSin = function(a) {
    return JSM.IsGreaterOrEqual(a, 1) ? Math.PI / 2 : JSM.IsLowerOrEqual(a, -1) ? -Math.PI / 2 : Math.asin(a)
}
;
JSM.ArcCos = function(a) {
    return JSM.IsGreaterOrEqual(a, 1) ? 0 : JSM.IsLowerOrEqual(a, -1) ? Math.PI : Math.acos(a)
}
;
JSM.Coord2D = function(a, b) {
    this.x = a;
    this.y = b
}
;
JSM.Coord2D.prototype.Set = function(a, b) {
    this.x = a;
    this.y = b
}
;
JSM.Coord2D.prototype.IsEqual = function(a) {
    return JSM.IsEqual(this.x, a.x) && JSM.IsEqual(this.y, a.y)
}
;
JSM.Coord2D.prototype.IsEqualWithEps = function(a, b) {
    return JSM.IsEqualWithEps(this.x, a.x, b) && JSM.IsEqualWithEps(this.y, a.y, b)
}
;
JSM.Coord2D.prototype.DistanceTo = function(a) {
    return Math.sqrt((a.x - this.x) * (a.x - this.x) + (a.y - this.y) * (a.y - this.y))
}
;
JSM.Coord2D.prototype.AngleTo = function(a) {
    var b = this.Clone().Normalize();
    a = a.Clone().Normalize();
    if (b.IsEqual(a))
        return 0;
    b = JSM.VectorDot2D(b, a);
    return JSM.ArcCos(b)
}
;
JSM.Coord2D.prototype.Length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
}
;
JSM.Coord2D.prototype.MultiplyScalar = function(a) {
    this.x *= a;
    this.y *= a;
    return this
}
;
JSM.Coord2D.prototype.Normalize = function() {
    var a = this.Length();
    JSM.IsPositive(a) && this.MultiplyScalar(1 / a);
    return this
}
;
JSM.Coord2D.prototype.SetLength = function(a) {
    var b = this.Length();
    JSM.IsPositive(b) && this.MultiplyScalar(a / b);
    return this
}
;
JSM.Coord2D.prototype.Offset = function(a, b) {
    var c = a.Clone().Normalize();
    this.x += c.x * b;
    this.y += c.y * b;
    return this
}
;
JSM.Coord2D.prototype.Rotate = function(a, b) {
    var c = this.x - b.x
      , d = this.y - b.y
      , e = Math.cos(a)
      , f = Math.sin(a);
    this.x = c * e - d * f + b.x;
    this.y = c * f + d * e + b.y;
    return this
}
;
JSM.Coord2D.prototype.ToString = function() {
    return "(" + this.x + ", " + this.y + ")"
}
;
JSM.Coord2D.prototype.Clone = function() {
    return new JSM.Coord2D(this.x,this.y)
}
;
JSM.Vector2D = JSM.Coord2D;
JSM.CoordFromArray2D = function(a) {
    return new JSM.Coord2D(a[0],a[1])
}
;
JSM.CoordToArray2D = function(a) {
    return [a.x, a.y]
}
;
JSM.CoordAdd2D = function(a, b) {
    return new JSM.Coord2D(a.x + b.x,a.y + b.y)
}
;
JSM.CoordSub2D = function(a, b) {
    return new JSM.Coord2D(a.x - b.x,a.y - b.y)
}
;
JSM.VectorDot2D = function(a, b) {
    return a.x * b.x + a.y * b.y
}
;
JSM.Coord = function(a, b, c) {
    this.x = a;
    this.y = b;
    this.z = c
}
;
JSM.Coord.prototype.Set = function(a, b, c) {
    this.x = a;
    this.y = b;
    this.z = c
}
;
JSM.Coord.prototype.IsEqual = function(a) {
    return JSM.IsEqual(this.x, a.x) && JSM.IsEqual(this.y, a.y) && JSM.IsEqual(this.z, a.z)
}
;
JSM.Coord.prototype.IsEqualWithEps = function(a, b) {
    return JSM.IsEqualWithEps(this.x, a.x, b) && JSM.IsEqualWithEps(this.y, a.y, b) && JSM.IsEqualWithEps(this.z, a.z, b)
}
;
JSM.Coord.prototype.DistanceTo = function(a) {
    return Math.sqrt((a.x - this.x) * (a.x - this.x) + (a.y - this.y) * (a.y - this.y) + (a.z - this.z) * (a.z - this.z))
}
;
JSM.Coord.prototype.AngleTo = function(a) {
    var b = this.Clone().Normalize();
    a = a.Clone().Normalize();
    if (b.IsEqual(a))
        return 0;
    b = JSM.VectorDot(b, a);
    return JSM.ArcCos(b)
}
;
JSM.Coord.prototype.IsCollinearWith = function(a) {
    a = this.AngleTo(a);
    return JSM.IsEqual(a, 0) || JSM.IsEqual(a, Math.PI)
}
;
JSM.Coord.prototype.IsPerpendicularWith = function(a) {
    a = this.AngleTo(a);
    return JSM.IsEqual(a, Math.PI / 2)
}
;
JSM.Coord.prototype.Length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
}
;
JSM.Coord.prototype.Add = function(a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z
}
;
JSM.Coord.prototype.Sub = function(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z
}
;
JSM.Coord.prototype.MultiplyScalar = function(a) {
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this
}
;
JSM.Coord.prototype.Normalize = function() {
    var a = this.Length();
    JSM.IsPositive(a) && this.MultiplyScalar(1 / a);
    return this
}
;
JSM.Coord.prototype.SetLength = function(a) {
    var b = this.Length();
    JSM.IsPositive(b) && this.MultiplyScalar(a / b);
    return this
}
;
JSM.Coord.prototype.Offset = function(a, b) {
    var c = a.Clone().Normalize();
    this.x += c.x * b;
    this.y += c.y * b;
    this.z += c.z * b;
    return this
}
;
JSM.Coord.prototype.Rotate = function(a, b, c) {
    var d = a.Clone().Normalize();
    a = d.x;
    var e = d.y
      , d = d.z
      , f = this.x - c.x
      , g = this.y - c.y
      , h = this.z - c.z
      , k = Math.sin(b);
    b = Math.cos(b);
    this.x = -a * (-a * f - e * g - d * h) * (1 - b) + f * b + (-d * g + e * h) * k;
    this.y = -e * (-a * f - e * g - d * h) * (1 - b) + g * b + (d * f - a * h) * k;
    this.z = -d * (-a * f - e * g - d * h) * (1 - b) + h * b + (-e * f + a * g) * k;
    this.x += c.x;
    this.y += c.y;
    this.z += c.z;
    return this
}
;
JSM.Coord.prototype.ToCoord2D = function(a) {
    var b = new JSM.Coord(0,0,0)
      , c = new JSM.Vector(0,0,1)
      , d = JSM.VectorCross(a, c);
    a = a.AngleTo(c);
    b = this.Clone().Rotate(d, a, b);
    return new JSM.Coord2D(b.x,b.y)
}
;
JSM.Coord.prototype.ToString = function() {
    return "(" + this.x + ", " + this.y + ", " + this.z + ")"
}
;
JSM.Coord.prototype.Clone = function() {
    return new JSM.Coord(this.x,this.y,this.z)
}
;
JSM.Vector = JSM.Coord;
JSM.CoordFromArray = function(a) {
    return new JSM.Coord(a[0],a[1],a[2])
}
;
JSM.CoordToArray = function(a) {
    return [a.x, a.y, a.z]
}
;
JSM.CoordAdd = function(a, b) {
    return new JSM.Coord(a.x + b.x,a.y + b.y,a.z + b.z)
}
;
JSM.CoordSub = function(a, b) {
    return new JSM.Coord(a.x - b.x,a.y - b.y,a.z - b.z)
}
;
JSM.VectorDot = function(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z
}
;
JSM.VectorCross = function(a, b) {
    var c = new JSM.Vector(0,0,0);
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
    return c
}
;
JSM.MatrixDeterminant2x2 = function(a, b, c, d) {
    return a * d - b * c
}
;
JSM.MatrixDeterminant3x3 = function(a, b, c, d, e, f, g, h, k) {
    var l = JSM.MatrixDeterminant2x2(e, f, h, k);
    f = JSM.MatrixDeterminant2x2(d, f, g, k);
    d = JSM.MatrixDeterminant2x2(d, e, g, h);
    return a * l - b * f + c * d
}
;
JSM.MatrixDeterminant4x4 = function(a, b, c, d, e, f, g, h, k, l, m, n, q, p, r, s) {
    var v = JSM.MatrixDeterminant3x3(f, g, h, l, m, n, p, r, s)
      , u = JSM.MatrixDeterminant3x3(e, g, h, k, m, n, q, r, s);
    h = JSM.MatrixDeterminant3x3(e, f, h, k, l, n, q, p, s);
    e = JSM.MatrixDeterminant3x3(e, f, g, k, l, m, q, p, r);
    return v * a - u * b + h * c - e * d
}
;
JSM.Orientation = {
    Invalid: 0,
    CounterClockwise: 1,
    Clockwise: 2
};
JSM.MidCoord2D = function(a, b) {
    return new JSM.Coord2D((a.x + b.x) / 2,(a.y + b.y) / 2)
}
;
JSM.CoordOrientation2D = function(a, b, c) {
    var d = a.x;
    a = a.y;
    var e = b.x;
    b = b.y;
    var f = c.x;
    c = c.y;
    d = d * b + a * f + e * c - b * f - a * e - d * c;
    return JSM.IsPositive(d) ? JSM.Orientation.CounterClockwise : JSM.IsNegative(d) ? JSM.Orientation.Clockwise : JSM.Orientation.Invalid
}
;
JSM.CoordSignedDistance2D = function(a, b, c) {
    var d = JSM.CoordSub2D(b, a);
    a = a.DistanceTo(b);
    c = d.AngleTo(c);
    JSM.IsPositive(c) && (a = -a);
    return a
}
;
JSM.PolarToCartesian = function(a, b) {
    var c = new JSM.Coord2D(0,0);
    c.x = a * Math.cos(b);
    c.y = a * Math.sin(b);
    return c
}
;
JSM.GetArcLengthFromAngle = function(a, b) {
    return b * a
}
;
JSM.GetAngleFromArcLength = function(a, b) {
    return JSM.IsEqual(a, 0) ? 0 : b / a
}
;
JSM.MidCoord = function(a, b) {
    return new JSM.Coord((a.x + b.x) / 2,(a.y + b.y) / 2,(a.z + b.z) / 2)
}
;
JSM.CoordSignedDistance = function(a, b, c) {
    var d = JSM.CoordSub(b, a);
    a = a.DistanceTo(b);
    c = d.AngleTo(c);
    JSM.IsPositive(c) && (a = -a);
    return a
}
;
JSM.GetVectorsFullAngle = function(a, b, c) {
    var d = a.AngleTo(b)
      , e = new JSM.Coord(0,0,0);
    JSM.CoordOrientation(a, e, b, c) == JSM.Orientation.Clockwise && (d = 2 * Math.PI - d);
    return d
}
;
JSM.CoordOrientation = function(a, b, c, d) {
    a = a.ToCoord2D(d);
    b = b.ToCoord2D(d);
    c = c.ToCoord2D(d);
    c = JSM.CoordOrientation2D(a, b, c);
    a = new JSM.Vector(0,0,1);
    d = d.AngleTo(a);
    JSM.IsEqual(d, Math.PI) && (c == JSM.Orientation.CounterClockwise ? c = JSM.Orientation.Clockwise : c == JSM.Orientation.Clockwise && (c = JSM.Orientation.CounterClockwise));
    return c
}
;
JSM.SphericalToCartesian = function(a, b, c) {
    var d = new JSM.Coord(0,0,0);
    d.x = a * Math.sin(b) * Math.cos(c);
    d.y = a * Math.sin(b) * Math.sin(c);
    d.z = a * Math.cos(b);
    return d
}
;
JSM.CylindricalToCartesian = function(a, b, c) {
    var d = new JSM.Coord(0,0,0);
    d.x = a * Math.cos(c);
    d.y = a * Math.sin(c);
    d.z = b;
    return d
}
;
JSM.GetArcLength = function(a, b, c) {
    return a.AngleTo(b) * c
}
;
JSM.GetFullArcLength = function(a, b, c, d) {
    return JSM.GetVectorsFullAngle(a, b, d) * c
}
;
JSM.CalculateCentroid = function(a) {
    var b = a.length
      , c = new JSM.Coord(0,0,0);
    if (1 <= b) {
        var d;
        for (d = 0; d < b; d++)
            c = JSM.CoordAdd(c, a[d]);
        c.MultiplyScalar(1 / b)
    }
    return c
}
;
JSM.CalculateTriangleNormal = function(a, b, c) {
    b = JSM.CoordSub(b, a);
    a = JSM.CoordSub(c, a);
    c = new JSM.Vector(0,0,0);
    c.x = b.y * a.z - b.z * a.y;
    c.y = b.z * a.x - b.x * a.z;
    c.z = b.x * a.y - b.y * a.x;
    c.Normalize();
    return c
}
;
JSM.CalculateNormal = function(a) {
    var b = a.length
      , c = new JSM.Vector(0,0,0);
    if (3 <= b) {
        var d, e, f;
        for (d = 0; d < b; d++)
            e = d % b,
            f = (d + 1) % b,
            e = a[e],
            f = a[f],
            c.x += (e.y - f.y) * (e.z + f.z),
            c.y += (e.z - f.z) * (e.x + f.x),
            c.z += (e.x - f.x) * (e.y + f.y)
    }
    c.Normalize();
    return c
}
;
JSM.BarycentricInterpolation = function(a, b, c, d, e, f, g) {
    function h(a, b, c) {
        var d = (a + b + c) / 2;
        a = d * (d - a) * (d - b) * (d - c);
        return 0 > a ? 0 : Math.sqrt(a)
    }
    var k = a.DistanceTo(b)
      , l = b.DistanceTo(c)
      , m = c.DistanceTo(a);
    a = a.DistanceTo(g);
    b = b.DistanceTo(g);
    g = c.DistanceTo(g);
    c = h(k, l, m);
    if (JSM.IsZero(c))
        return d;
    k = h(k, a, b);
    l = h(l, b, g);
    m = h(m, a, g);
    d = d.Clone().MultiplyScalar(l);
    e = e.Clone().MultiplyScalar(m);
    f = f.Clone().MultiplyScalar(k);
    f = JSM.CoordAdd(JSM.CoordAdd(d, e), f);
    f.MultiplyScalar(1 / c);
    return f
}
;
JSM.MatrixIdentity = function() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
}
;
JSM.MatrixClone = function(a) {
    var b = [];
    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[3];
    b[4] = a[4];
    b[5] = a[5];
    b[6] = a[6];
    b[7] = a[7];
    b[8] = a[8];
    b[9] = a[9];
    b[10] = a[10];
    b[11] = a[11];
    b[12] = a[12];
    b[13] = a[13];
    b[14] = a[14];
    b[15] = a[15];
    return b
}
;
JSM.MatrixTranspose = function(a) {
    var b = [];
    b[0] = a[0];
    b[1] = a[4];
    b[2] = a[8];
    b[3] = a[12];
    b[4] = a[1];
    b[5] = a[5];
    b[6] = a[9];
    b[7] = a[13];
    b[8] = a[2];
    b[9] = a[6];
    b[10] = a[10];
    b[11] = a[14];
    b[12] = a[3];
    b[13] = a[7];
    b[14] = a[11];
    b[15] = a[15];
    return b
}
;
JSM.MatrixVectorMultiply = function(a, b) {
    var c = b[0]
      , d = b[1]
      , e = b[2]
      , f = b[3]
      , g = a[1]
      , h = a[2]
      , k = a[3]
      , l = a[5]
      , m = a[6]
      , n = a[7]
      , q = a[9]
      , p = a[10]
      , r = a[11]
      , s = a[13]
      , v = a[14]
      , u = a[15]
      , t = [];
    t[0] = c * a[0] + d * a[4] + e * a[8] + f * a[12];
    t[1] = c * g + d * l + e * q + f * s;
    t[2] = c * h + d * m + e * p + f * v;
    t[3] = c * k + d * n + e * r + f * u;
    return t
}
;
JSM.MatrixMultiply = function(a, b) {
    var c = a[0]
      , d = a[1]
      , e = a[2]
      , f = a[3]
      , g = a[4]
      , h = a[5]
      , k = a[6]
      , l = a[7]
      , m = a[8]
      , n = a[9]
      , q = a[10]
      , p = a[11]
      , r = a[12]
      , s = a[13]
      , v = a[14]
      , u = a[15]
      , t = b[0]
      , y = b[1]
      , B = b[2]
      , C = b[3]
      , w = b[4]
      , x = b[5]
      , A = b[6]
      , E = b[7]
      , G = b[8]
      , H = b[9]
      , z = b[10]
      , D = b[11]
      , K = b[12]
      , L = b[13]
      , F = b[14]
      , J = b[15]
      , I = [];
    I[0] = c * t + d * w + e * G + f * K;
    I[1] = c * y + d * x + e * H + f * L;
    I[2] = c * B + d * A + e * z + f * F;
    I[3] = c * C + d * E + e * D + f * J;
    I[4] = g * t + h * w + k * G + l * K;
    I[5] = g * y + h * x + k * H + l * L;
    I[6] = g * B + h * A + k * z + l * F;
    I[7] = g * C + h * E + k * D + l * J;
    I[8] = m * t + n * w + q * G + p * K;
    I[9] = m * y + n * x + q * H + p * L;
    I[10] = m * B + n * A + q * z + p * F;
    I[11] = m * C + n * E + q * D + p * J;
    I[12] = r * t + s * w + v * G + u * K;
    I[13] = r * y + s * x + v * H + u * L;
    I[14] = r * B + s * A + v * z + u * F;
    I[15] = r * C + s * E + v * D + u * J;
    return I
}
;
JSM.MatrixDeterminant = function(a) {
    var b = a[0]
      , c = a[1]
      , d = a[2]
      , e = a[3]
      , f = a[4]
      , g = a[5]
      , h = a[6]
      , k = a[7]
      , l = a[8]
      , m = a[9]
      , n = a[10]
      , q = a[11]
      , p = a[12]
      , r = a[13]
      , s = a[14];
    a = a[15];
    return (b * g - c * f) * (n * a - q * s) - (b * h - d * f) * (m * a - q * r) + (b * k - e * f) * (m * s - n * r) + (c * h - d * g) * (l * a - q * p) - (c * k - e * g) * (l * s - n * p) + (d * k - e * h) * (l * r - m * p)
}
;
JSM.MatrixInvert = function(a) {
    var b = a[0]
      , c = a[1]
      , d = a[2]
      , e = a[3]
      , f = a[4]
      , g = a[5]
      , h = a[6]
      , k = a[7]
      , l = a[8]
      , m = a[9]
      , n = a[10]
      , q = a[11]
      , p = a[12]
      , r = a[13]
      , s = a[14];
    a = a[15];
    var v = b * g - c * f
      , u = b * h - d * f
      , t = b * k - e * f
      , y = c * h - d * g
      , B = c * k - e * g
      , C = d * k - e * h
      , w = l * r - m * p
      , x = l * s - n * p
      , A = l * a - q * p
      , E = m * s - n * r
      , G = m * a - q * r
      , H = n * a - q * s
      , z = v * H - u * G + t * E + y * A - B * x + C * w;
    if (JSM.IsZero(z))
        return null;
    var D = [];
    D[0] = (g * H - h * G + k * E) / z;
    D[1] = (d * G - c * H - e * E) / z;
    D[2] = (r * C - s * B + a * y) / z;
    D[3] = (n * B - m * C - q * y) / z;
    D[4] = (h * A - f * H - k * x) / z;
    D[5] = (b * H - d * A + e * x) / z;
    D[6] = (s * t - p * C - a * u) / z;
    D[7] = (l * C - n * t + q * u) / z;
    D[8] = (f * G - g * A + k * w) / z;
    D[9] = (c * A - b * G - e * w) / z;
    D[10] = (p * B - r * t + a * v) / z;
    D[11] = (m * t - l * B - q * v) / z;
    D[12] = (g * x - f * E - h * w) / z;
    D[13] = (b * E - c * x + d * w) / z;
    D[14] = (r * u - p * y - s * v) / z;
    D[15] = (l * y - m * u + n * v) / z;
    return D
}
;
JSM.MatrixTranslation = function(a, b, c) {
    var d = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0];
    d[12] = a;
    d[13] = b;
    d[14] = c;
    d[15] = 1;
    return d
}
;
JSM.MatrixRotation = function(a, b, c) {
    var d = a.Clone().Normalize();
    a = d.x;
    var e = d.y
      , d = d.z
      , f = a * a
      , g = e * e
      , h = d * d
      , k = Math.sin(b);
    b = Math.cos(b);
    var l = [];
    if (void 0 === c || null === c)
        l[0] = f + (g + h) * b,
        l[1] = a * e * (1 - b) + d * k,
        l[2] = a * d * (1 - b) - e * k,
        l[3] = 0,
        l[4] = a * e * (1 - b) - d * k,
        l[5] = g + (f + h) * b,
        l[6] = e * d * (1 - b) + a * k,
        l[7] = 0,
        l[8] = a * d * (1 - b) + e * k,
        l[9] = e * d * (1 - b) - a * k,
        l[10] = h + (f + g) * b,
        l[11] = 0,
        l[12] = 0,
        l[13] = 0,
        l[14] = 0;
    else {
        var m = c.x
          , n = c.y;
        c = c.z;
        l[0] = f + (g + h) * b;
        l[1] = a * e * (1 - b) + d * k;
        l[2] = a * d * (1 - b) - e * k;
        l[3] = 0;
        l[4] = a * e * (1 - b) - d * k;
        l[5] = g + (f + h) * b;
        l[6] = e * d * (1 - b) + a * k;
        l[7] = 0;
        l[8] = a * d * (1 - b) + e * k;
        l[9] = e * d * (1 - b) - a * k;
        l[10] = h + (f + g) * b;
        l[11] = 0;
        l[12] = (m * (g + h) - a * (n * e + c * d)) * (1 - b) + (n * d - c * e) * k;
        l[13] = (n * (f + h) - e * (m * a + c * d)) * (1 - b) + (c * a - m * d) * k;
        l[14] = (c * (f + g) - d * (m * a + n * e)) * (1 - b) + (m * e - n * a) * k
    }
    l[15] = 1;
    return l
}
;
JSM.MatrixRotationQuaternion = function(a) {
    var b = a[0]
      , c = a[1]
      , d = a[2]
      , e = a[3]
      , f = b + b
      , g = c + c
      , h = d + d;
    a = b * f;
    var k = b * g
      , b = b * h
      , l = c * g
      , c = c * h
      , d = d * h
      , f = e * f
      , g = e * g
      , e = e * h
      , h = [];
    h[0] = 1 - (l + d);
    h[1] = k + e;
    h[2] = b - g;
    h[3] = 0;
    h[4] = k - e;
    h[5] = 1 - (a + d);
    h[6] = c + f;
    h[7] = 0;
    h[8] = b + g;
    h[9] = c - f;
    h[10] = 1 - (a + l);
    h[11] = 0;
    h[12] = 0;
    h[13] = 0;
    h[14] = 0;
    h[15] = 1;
    return h
}
;
JSM.MatrixRotationX = function(a) {
    var b = Math.sin(a);
    a = Math.cos(a);
    var c = [1, 0, 0, 0, 0];
    c[5] = a;
    c[6] = b;
    c[7] = 0;
    c[8] = 0;
    c[9] = -b;
    c[10] = a;
    c[11] = 0;
    c[12] = 0;
    c[13] = 0;
    c[14] = 0;
    c[15] = 1;
    return c
}
;
JSM.MatrixRotationY = function(a) {
    var b = Math.sin(a);
    a = Math.cos(a);
    var c = [];
    c[0] = a;
    c[1] = 0;
    c[2] = -b;
    c[3] = 0;
    c[4] = 0;
    c[5] = 1;
    c[6] = 0;
    c[7] = 0;
    c[8] = b;
    c[9] = 0;
    c[10] = a;
    c[11] = 0;
    c[12] = 0;
    c[13] = 0;
    c[14] = 0;
    c[15] = 1;
    return c
}
;
JSM.MatrixRotationZ = function(a) {
    var b = Math.sin(a);
    a = Math.cos(a);
    var c = [];
    c[0] = a;
    c[1] = b;
    c[2] = 0;
    c[3] = 0;
    c[4] = -b;
    c[5] = a;
    c[6] = 0;
    c[7] = 0;
    c[8] = 0;
    c[9] = 0;
    c[10] = 1;
    c[11] = 0;
    c[12] = 0;
    c[13] = 0;
    c[14] = 0;
    c[15] = 1;
    return c
}
;
JSM.ApplyTransformation = function(a, b) {
    var c = [];
    c[0] = b.x;
    c[1] = b.y;
    c[2] = b.z;
    c[3] = 1;
    c = JSM.MatrixVectorMultiply(a, c);
    return new JSM.Coord(c[0],c[1],c[2])
}
;
JSM.ApplyRotation = function(a, b) {
    var c = [];
    c[0] = b.x;
    c[1] = b.y;
    c[2] = b.z;
    c[3] = 0;
    c = JSM.MatrixVectorMultiply(a, c);
    return new JSM.Coord(c[0],c[1],c[2])
}
;
JSM.CoordSystem = function(a, b, c, d) {
    this.origo = a;
    this.e1 = b;
    this.e2 = c;
    this.e3 = d
}
;
JSM.CoordSystem.prototype.Set = function(a, b, c, d) {
    this.origo = a;
    this.e1 = b;
    this.e2 = c;
    this.e3 = d
}
;
JSM.CoordSystem.prototype.ToDirectionVectors = function() {
    this.e1 = JSM.CoordSub(this.e1, this.origo);
    this.e2 = JSM.CoordSub(this.e2, this.origo);
    this.e3 = JSM.CoordSub(this.e3, this.origo);
    return this
}
;
JSM.CoordSystem.prototype.ToAbsoluteCoords = function() {
    this.e1 = JSM.CoordAdd(this.e1, this.origo);
    this.e2 = JSM.CoordAdd(this.e2, this.origo);
    this.e3 = JSM.CoordAdd(this.e3, this.origo);
    return this
}
;
JSM.CoordSystem.prototype.Clone = function() {
    return new JSM.CoordSystem(this.origo.Clone(),this.e1.Clone(),this.e2.Clone(),this.e3.Clone())
}
;
JSM.CoordSectorPosition2D = {
    CoordInsideOfSector: 0,
    CoordOnSectorEndCoord: 1,
    CoordOutsideOfSector: 2
};
JSM.SectorSectorPosition2D = {
    SectorsDontIntersect: 0,
    SectorsIntersectCoincident: 1,
    SectorsIntersectEndPoint: 2,
    SectorsIntersectOnePoint: 3
};
JSM.CoordSectorPosition = {
    CoordInsideOfSector: 0,
    CoordOnSectorEndCoord: 1,
    CoordOutsideOfSector: 2
};
JSM.Sector2D = function(a, b) {
    this.beg = a;
    this.end = b
}
;
JSM.Sector2D.prototype.Set = function(a, b) {
    this.beg = a;
    this.end = b
}
;
JSM.Sector2D.prototype.GetLength = function() {
    return this.beg.DistanceTo(this.end)
}
;
JSM.Sector2D.prototype.CoordPosition = function(a) {
    var b = a.x
      , c = a.y
      , d = this.beg.x
      , e = this.beg.y
      , f = this.end.x
      , g = this.end.y
      , h = this.GetLength();
    if (JSM.IsZero(h))
        return a.IsEqual(this.beg) ? JSM.CoordSectorPosition2D.CoordOnSectorEndCoord : JSM.CoordSectorPosition2D.CoordOutsideOfSector;
    a = ((b - d) * (f - d) + (c - e) * (g - e)) / (h * h);
    if (JSM.IsLower(a, 0) || JSM.IsGreater(a, 1))
        return JSM.CoordSectorPosition2D.CoordOutsideOfSector;
    e += a * (g - e);
    return !JSM.IsEqual(d + a * (f - d), b) || !JSM.IsEqual(e, c) ? JSM.CoordSectorPosition2D.CoordOutsideOfSector : JSM.IsEqual(a, 0) || JSM.IsEqual(a, 1) ? JSM.CoordSectorPosition2D.CoordOnSectorEndCoord : JSM.CoordSectorPosition2D.CoordInsideOfSector
}
;
JSM.Sector2D.prototype.SectorPosition = function(a, b) {
    function c(a, b, c) {
        return !c.IsEqual(a) && !c.IsEqual(b) && JSM.IsLowerOrEqual(c.x, Math.max(a.x, b.x)) && JSM.IsLowerOrEqual(c.y, Math.max(a.y, b.y)) && JSM.IsGreaterOrEqual(c.x, Math.min(a.x, b.x)) && JSM.IsGreaterOrEqual(c.y, Math.min(a.y, b.y)) ? !0 : !1
    }
    var d = void 0 !== b && null !== b
      , e = this.beg
      , f = this.end
      , g = a.beg
      , h = a.end
      , k = e.IsEqual(g) || e.IsEqual(h)
      , l = f.IsEqual(g) || f.IsEqual(h);
    if (k && l)
        return JSM.SectorSectorPosition2D.SectorsIntersectCoincident;
    var m = e.x
      , n = e.y
      , q = f.x
      , p = f.y
      , r = g.x
      , s = g.y
      , v = h.x
      , u = h.y
      , t = (v - r) * (n - s) - (u - s) * (m - r)
      , y = (q - m) * (n - s) - (p - n) * (m - r)
      , r = (u - s) * (q - m) - (v - r) * (p - n);
    if (JSM.IsZero(r)) {
        if (JSM.IsZero(t) && JSM.IsZero(y)) {
            if (c(e, f, g) || c(e, f, h) || c(g, h, e) || c(g, h, f))
                return JSM.SectorSectorPosition2D.SectorsIntersectCoincident;
            if (k)
                return d && (b.x = e.x,
                b.y = e.y),
                JSM.SectorSectorPosition2D.SectorsIntersectEndPoint;
            if (l)
                return d && (b.x = f.x,
                b.y = f.y),
                JSM.SectorSectorPosition2D.SectorsIntersectEndPoint
        }
        return JSM.SectorSectorPosition2D.SectorsDontIntersect
    }
    g = t / r;
    y /= r;
    if (JSM.IsLower(g, 0) || JSM.IsGreater(g, 1) || JSM.IsLower(y, 0) || JSM.IsGreater(y, 1))
        return JSM.SectorSectorPosition2D.SectorsDontIntersect;
    if (k)
        return d && (b.x = e.x,
        b.y = e.y),
        JSM.SectorSectorPosition2D.SectorsIntersectEndPoint;
    if (l)
        return d && (b.x = f.x,
        b.y = f.y),
        JSM.SectorSectorPosition2D.SectorsIntersectEndPoint;
    d && (b.x = m + g * (q - m),
    b.y = n + g * (p - n));
    return JSM.SectorSectorPosition2D.SectorsIntersectOnePoint
}
;
JSM.Sector2D.prototype.ProjectCoord = function(a) {
    var b = a.x
      , c = a.y;
    a = this.beg;
    var d = this.end
      , e = a.x
      , f = a.y
      , g = d.x
      , h = d.y
      , k = (g - e) * (g - e) + (h - f) * (h - f);
    if (JSM.IsZero(k))
        return a.Clone();
    b = ((g - e) * (b - e) + (h - f) * (c - f)) / k;
    if (JSM.IsLower(b, 0))
        return a.Clone();
    if (JSM.IsGreater(b, 1))
        return d.Clone();
    b = JSM.CoordSub2D(d, a).MultiplyScalar(b);
    return JSM.CoordAdd2D(a, b)
}
;
JSM.Sector2D.prototype.Clone = function() {
    return new JSM.Sector2D(this.beg.Clone(),this.end.Clone())
}
;
JSM.Sector = function(a, b) {
    this.beg = a;
    this.end = b
}
;
JSM.Sector.prototype.Set = function(a, b) {
    this.beg = a;
    this.end = b
}
;
JSM.Sector.prototype.GetLength = function() {
    return this.beg.DistanceTo(this.end)
}
;
JSM.Sector.prototype.CoordPosition = function(a) {
    var b = a.x
      , c = a.y
      , d = a.z
      , e = this.beg
      , f = JSM.CoordSub(this.end, this.beg)
      , g = e.x
      , h = e.y
      , k = e.z
      , l = e.x + f.x
      , m = e.y + f.y
      , n = e.z + f.z
      , q = (l - g) * (l - g) + (m - h) * (m - h) + (n - k) * (n - k);
    if (JSM.IsZero(q))
        return e.IsEqual(a) ? JSM.CoordSectorPosition.CoordOnSectorEndCoord : JSM.CoordSectorPosition.CoordOutsideOfSector;
    b = ((l - g) * (b - g) + (m - h) * (c - h) + (n - k) * (d - k)) / q;
    f = f.Clone().MultiplyScalar(b);
    e = JSM.CoordAdd(e, f);
    a = a.DistanceTo(e);
    return JSM.IsZero(a) ? JSM.IsLower(b, 0) || JSM.IsGreater(b, 1) ? JSM.CoordSectorPosition.CoordOutsideOfSector : JSM.IsEqual(b, 0) || JSM.IsEqual(b, 1) ? JSM.CoordSectorPosition.CoordOnSectorEndCoord : JSM.CoordSectorPosition.CoordInsideOfSector : JSM.CoordSectorPosition.CoordOutsideOfSector
}
;
JSM.Sector.prototype.Clone = function() {
    return new JSM.Sector(this.beg.Clone(),this.end.Clone())
}
;
JSM.GetSectorSegmentation2D = function(a, b) {
    var c = JSM.CoordSub2D(a.end, a.beg), d = a.beg.DistanceTo(a.end) / b, e = 0, f = [], g, h;
    for (g = 0; g <= b; g++)
        h = a.beg.Clone().Offset(c, e),
        f.push(h),
        e += d;
    return f
}
;
JSM.GetSectorSegmentation = function(a, b) {
    var c = JSM.CoordSub(a.end, a.beg), d = a.beg.DistanceTo(a.end) / b, e = 0, f = [], g, h;
    for (g = 0; g <= b; g++)
        h = a.beg.Clone().Offset(c, e),
        f.push(h),
        e += d;
    return f
}
;
JSM.CoordLinePosition2D = {
    CoordOnLine: 0,
    CoordAtLineLeft: 1,
    CoordAtLineRight: 2
};
JSM.LineLinePosition2D = {
    LinesDontIntersect: 0,
    LinesIntersectsOnePoint: 1,
    LinesIntersectsCoincident: 2
};
JSM.CoordLinePosition = {
    CoordOnLine: 0,
    CoordOutsideOfLine: 1
};
JSM.LineLinePosition = {
    LinesDontIntersect: 0,
    LinesIntersectsOnePoint: 1,
    LinesIntersectsCoincident: 2
};
JSM.Line2D = function(a, b) {
    this.start = a;
    this.direction = b
}
;
JSM.Line2D.prototype.Set = function(a, b) {
    this.start = a;
    this.direction = b
}
;
JSM.Line2D.prototype.CoordPosition = function(a) {
    a = this.CoordSignedDistance(a);
    return JSM.IsPositive(a) ? JSM.CoordLinePosition2D.CoordAtLineLeft : JSM.IsNegative(a) ? JSM.CoordLinePosition2D.CoordAtLineRight : JSM.CoordLinePosition2D.CoordOnLine
}
;
JSM.Line2D.prototype.CoordSignedDistance = function(a) {
    var b = this.start
      , c = this.direction;
    return c.x * (a.y - b.y) - c.y * (a.x - b.x)
}
;
JSM.Line2D.prototype.LinePosition = function(a, b) {
    var c = this.start.x
      , d = this.start.y
      , e = this.start.x + this.direction.x
      , f = this.start.y + this.direction.y
      , g = a.start.x
      , h = a.start.y
      , k = a.start.x + a.direction.x
      , l = a.start.y + a.direction.y
      , m = (k - g) * (d - h) - (l - h) * (c - g)
      , n = (e - c) * (d - h) - (f - d) * (c - g)
      , g = (l - h) * (e - c) - (k - g) * (f - d);
    if (JSM.IsZero(g))
        return JSM.IsZero(m) && JSM.IsZero(n) ? JSM.LineLinePosition2D.LinesIntersectsCoincident : JSM.LineLinePosition2D.LinesDontIntersect;
    m /= g;
    null !== b && (b.x = c + m * (e - c),
    b.y = d + m * (f - d));
    return JSM.LineLinePosition2D.LinesIntersectsOnePoint
}
;
JSM.Line2D.prototype.Clone = function() {
    return new JSM.Line2D(this.start.Clone(),this.direction.Clone())
}
;
JSM.Line = function(a, b) {
    this.start = a;
    this.direction = b
}
;
JSM.Line.prototype.Set = function(a, b) {
    this.start = a;
    this.direction = b
}
;
JSM.Line.prototype.CoordPosition = function(a, b) {
    var c = a.x
      , d = a.y
      , e = a.z
      , f = this.start
      , g = this.direction
      , h = f.x
      , k = f.y
      , l = f.z
      , m = f.x + g.x
      , n = f.y + g.y
      , q = f.z + g.z
      , p = (m - h) * (m - h) + (n - k) * (n - k) + (q - l) * (q - l);
    if (JSM.IsZero(p))
        return void 0 !== b && b.Set(f.x, f.y, f.z),
        f.IsEqual(a) ? JSM.CoordLinePosition.CoordOnLine : JSM.CoordLinePosition.CoordOutsideOfLine;
    c = g.Clone().MultiplyScalar(((m - h) * (c - h) + (n - k) * (d - k) + (q - l) * (e - l)) / p);
    f = JSM.CoordAdd(f, c);
    void 0 !== b && b.Set(f.x, f.y, f.z);
    f = a.DistanceTo(f);
    return JSM.IsZero(f) ? JSM.CoordLinePosition.CoordOnLine : JSM.CoordLinePosition.CoordOutsideOfLine
}
;
JSM.Line.prototype.ProjectCoord = function(a) {
    var b = a.x
      , c = a.y
      , d = a.z;
    a = this.start;
    var e = this.direction
      , f = a.x
      , g = a.y
      , h = a.z
      , k = a.x + e.x
      , l = a.y + e.y
      , m = a.z + e.z
      , n = (k - f) * (k - f) + (l - g) * (l - g) + (m - h) * (m - h);
    if (JSM.IsZero(n))
        return a.Clone();
    b = e.Clone().MultiplyScalar(((k - f) * (b - f) + (l - g) * (c - g) + (m - h) * (d - h)) / n);
    return JSM.CoordAdd(a, b)
}
;
JSM.Line.prototype.ClosestPoint = function(a, b, c) {
    function d(a, b, c, d, e) {
        return (a[b].x - a[c].x) * (a[d].x - a[e].x) + (a[b].y - a[c].y) * (a[d].y - a[e].y) + (a[b].z - a[c].z) * (a[d].z - a[e].z)
    }
    var e = this.direction.Clone().Normalize()
      , f = this.start
      , g = JSM.CoordAdd(f, e)
      , h = a.direction.Clone().Normalize();
    a = a.start;
    var k = JSM.CoordAdd(a, h)
      , l = [f, g, a, k]
      , m = d(l, 1, 0, 1, 0)
      , n = d(l, 0, 2, 1, 0)
      , g = d(l, 0, 2, 3, 2)
      , k = d(l, 3, 2, 1, 0)
      , l = d(l, 3, 2, 3, 2)
      , m = m * l - k * k;
    if (JSM.IsEqual(m, 0))
        return !1;
    n = (g * k - n * l) / m;
    g = (g + n * k) / l;
    void 0 !== b && (e.MultiplyScalar(n),
    e = JSM.CoordAdd(f, e),
    b.Set(e.x, e.y, e.z));
    void 0 !== c && (h.MultiplyScalar(g),
    b = JSM.CoordAdd(a, h),
    c.Set(b.x, b.y, b.z));
    return !0
}
;
JSM.Line.prototype.LinePosition = function(a, b) {
    var c = new JSM.Coord(0,0,0)
      , d = new JSM.Coord(0,0,0);
    return !this.ClosestPoint(a, c, d) ? JSM.LineLinePosition.LinesIntersectsCoincident : c.IsEqual(d) ? (void 0 !== b && b.Set(c.x, c.y, c.z),
    JSM.LineLinePosition.LinesIntersectsOnePoint) : JSM.LineLinePosition.LinesDontIntersect
}
;
JSM.Line.prototype.Clone = function() {
    return new JSM.Line(this.start.Clone(),this.direction.Clone())
}
;
JSM.Box2D = function(a, b) {
    this.min = a;
    this.max = b
}
;
JSM.Box2D.prototype.Set = function(a, b) {
    this.min = a;
    this.max = b
}
;
JSM.Box2D.prototype.GetCenter = function() {
    return JSM.MidCoord2D(this.min, this.max)
}
;
JSM.Box2D.prototype.Clone = function() {
    return new JSM.Box2D(this.min.Clone(),this.max.Clone())
}
;
JSM.Box = function(a, b) {
    this.min = a;
    this.max = b
}
;
JSM.Box.prototype.Set = function(a, b) {
    this.min = a;
    this.max = b
}
;
JSM.Box.prototype.GetCenter = function() {
    return JSM.MidCoord(this.min, this.max)
}
;
JSM.Box.prototype.GetSize = function() {
    return JSM.CoordSub(this.max, this.min)
}
;
JSM.Box.prototype.IsCoordInside = function(a) {
    return JSM.IsLower(a.x, this.min.x) || JSM.IsLower(a.y, this.min.y) || JSM.IsLower(a.z, this.min.z) || JSM.IsGreater(a.x, this.max.x) || JSM.IsGreater(a.y, this.max.y) || JSM.IsGreater(a.z, this.max.z) ? !1 : !0
}
;
JSM.Box.prototype.Clone = function() {
    return new JSM.Box(this.min.Clone(),this.max.Clone())
}
;
JSM.BoxUnion = function(a, b) {
    var c = new JSM.Coord(JSM.Minimum(a.min.x, b.min.x),JSM.Minimum(a.min.y, b.min.y),JSM.Minimum(a.min.z, b.min.z))
      , d = new JSM.Coord(JSM.Maximum(a.max.x, b.max.x),JSM.Maximum(a.max.y, b.max.y),JSM.Maximum(a.max.z, b.max.z));
    return new JSM.Box(c,d)
}
;
JSM.Sphere = function(a, b) {
    this.center = a;
    this.radius = b
}
;
JSM.Sphere.prototype.Set = function(a, b) {
    this.center = a;
    this.radius = b
}
;
JSM.Sphere.prototype.GetCenter = function() {
    return this.center
}
;
JSM.Sphere.prototype.GetRadius = function() {
    return this.radius
}
;
JSM.Sphere.prototype.Clone = function() {
    return new JSM.Sphere(this.center.Clone(),this.radius)
}
;
JSM.Transformation = function() {
    this.matrix = JSM.MatrixIdentity()
}
;
JSM.Transformation.prototype.GetMatrix = function() {
    return this.matrix
}
;
JSM.Transformation.prototype.SetMatrix = function(a) {
    this.matrix = a
}
;
JSM.Transformation.prototype.Append = function(a) {
    this.matrix = JSM.MatrixMultiply(this.matrix, a.matrix)
}
;
JSM.Transformation.prototype.Apply = function(a) {
    return JSM.ApplyTransformation(this.matrix, a)
}
;
JSM.Transformation.prototype.Clone = function() {
    var a = new JSM.Transformation;
    a.matrix = JSM.MatrixClone(this.matrix);
    return a
}
;
JSM.IdentityTransformation = function() {
    var a = new JSM.Transformation;
    a.matrix = JSM.MatrixIdentity();
    return a
}
;
JSM.TranslationTransformation = function(a) {
    var b = new JSM.Transformation;
    b.matrix = JSM.MatrixTranslation(a.x, a.y, a.z);
    return b
}
;
JSM.OffsetTransformation = function(a, b) {
    var c = a.Clone().Normalize().Clone().MultiplyScalar(b);
    return JSM.TranslationTransformation(c)
}
;
JSM.RotationTransformation = function(a, b, c) {
    var d = new JSM.Transformation;
    d.matrix = JSM.MatrixRotation(a, b, c);
    return d
}
;
JSM.RotationXTransformation = function(a, b) {
    var c = new JSM.Transformation;
    void 0 === b || null === b ? c.matrix = JSM.MatrixRotationX(a) : (c.Append(JSM.TranslationTransformation(new JSM.Vector(-b.x,-b.y,-b.z))),
    c.Append(JSM.RotationXTransformation(a)),
    c.Append(JSM.TranslationTransformation(new JSM.Vector(b.x,b.y,b.z))));
    return c
}
;
JSM.RotationYTransformation = function(a, b) {
    var c = new JSM.Transformation;
    void 0 === b || null === b ? c.matrix = JSM.MatrixRotationY(a) : (c.Append(JSM.TranslationTransformation(new JSM.Vector(-b.x,-b.y,-b.z))),
    c.Append(JSM.RotationYTransformation(a)),
    c.Append(JSM.TranslationTransformation(new JSM.Vector(b.x,b.y,b.z))));
    return c
}
;
JSM.RotationZTransformation = function(a, b) {
    var c = new JSM.Transformation;
    void 0 === b || null === b ? c.matrix = JSM.MatrixRotationZ(a) : (c.Append(JSM.TranslationTransformation(new JSM.Vector(-b.x,-b.y,-b.z))),
    c.Append(JSM.RotationZTransformation(a)),
    c.Append(JSM.TranslationTransformation(new JSM.Vector(b.x,b.y,b.z))));
    return c
}
;
JSM.RotationXYZTransformation = function(a, b, c, d) {
    var e = new JSM.Transformation;
    e.Append(JSM.RotationXTransformation(a, d));
    e.Append(JSM.RotationYTransformation(b, d));
    e.Append(JSM.RotationZTransformation(c, d));
    return e
}
;
JSM.CoordPlanePosition = {
    CoordOnPlane: 0,
    CoordInFrontOfPlane: 1,
    CoordAtBackOfPlane: 2
};
JSM.LinePlanePosition = {
    LineParallelToPlane: 0,
    LineIntersectsPlane: 1
};
JSM.Plane = function(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d
}
;
JSM.Plane.prototype.Set = function(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d
}
;
JSM.Plane.prototype.GetNormal = function() {
    return new JSM.Vector(this.a,this.b,this.c)
}
;
JSM.Plane.prototype.CoordSignedDistance = function(a) {
    var b = this.a
      , c = this.b
      , d = this.c;
    return (b * a.x + c * a.y + d * a.z + this.d) / Math.sqrt(b * b + c * c + d * d)
}
;
JSM.Plane.prototype.CoordDistance = function(a) {
    a = this.CoordSignedDistance(a);
    return Math.abs(a)
}
;
JSM.Plane.prototype.ProjectCoord = function(a) {
    var b = a.x
      , c = a.y
      , d = a.z
      , e = this.a
      , f = this.b
      , g = this.c
      , h = this.d
      , k = this.CoordDistance(a);
    JSM.IsGreater(e * b + f * c + g * d + h, 0) && (k = -k);
    b = this.GetNormal().Normalize();
    return a.Clone().Offset(b, k)
}
;
JSM.Plane.prototype.CoordPosition = function(a) {
    a = this.a * a.x + this.b * a.y + this.c * a.z + this.d;
    return JSM.IsPositive(a) ? JSM.CoordPlanePosition.CoordInFrontOfPlane : JSM.IsNegative(a) ? JSM.CoordPlanePosition.CoordAtBackOfPlane : JSM.CoordPlanePosition.CoordOnPlane
}
;
JSM.Plane.prototype.LinePosition = function(a, b) {
    var c = a.direction.Clone().Normalize()
      , d = a.start.x
      , e = a.start.y
      , f = a.start.z
      , g = this.a
      , h = this.b
      , k = this.c
      , l = this.d
      , m = g * (d - (a.start.x + c.x)) + h * (e - (a.start.y + c.y)) + k * (f - (a.start.z + c.z));
    if (JSM.IsZero(m))
        return JSM.LinePlanePosition.LineParallelToPlane;
    void 0 !== b && (c.MultiplyScalar((g * d + h * e + k * f + l) / m),
    c = JSM.CoordAdd(a.start, c),
    b.Set(c.x, c.y, c.z));
    return JSM.LinePlanePosition.LineIntersectsPlane
}
;
JSM.Plane.prototype.LineIntersection = function(a) {
    var b = a.direction.Clone().Normalize()
      , c = a.start.x
      , d = a.start.y
      , e = a.start.z
      , f = this.a
      , g = this.b
      , h = this.c
      , k = this.d
      , l = f * (c - (a.start.x + b.x)) + g * (d - (a.start.y + b.y)) + h * (e - (a.start.z + b.z));
    if (JSM.IsZero(l))
        return null;
    b.MultiplyScalar((f * c + g * d + h * e + k) / l);
    return JSM.CoordAdd(a.start, b)
}
;
JSM.Plane.prototype.Clone = function() {
    return new JSM.Plane(this.a,this.b,this.c,this.d)
}
;
JSM.GetPlaneFromCoordAndDirection = function(a, b) {
    var c = new JSM.Plane
      , d = b.Clone().Normalize()
      , e = d.x
      , f = d.y
      , d = d.z;
    c.Set(e, f, d, -(e * a.x + f * a.y + d * a.z));
    return c
}
;
JSM.GetPlaneFromThreeCoords = function(a, b, c) {
    var d = new JSM.Plane
      , e = (b.y - a.y) * (c.z - a.z) - (c.y - a.y) * (b.z - a.z)
      , f = (b.z - a.z) * (c.x - a.x) - (c.z - a.z) * (b.x - a.x);
    b = (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
    d.Set(e, f, b, -(e * a.x + f * a.y + b * a.z));
    return d
}
;
JSM.CoordPlaneSignedDirectionalDistance = function(a, b, c) {
    var d = b.Clone().Normalize();
    b = a.x;
    var e = a.y
      , f = a.z
      , g = c.a
      , h = c.b
      , k = c.c;
    c = c.d;
    var l = g * (b - (a.x + d.x)) + h * (e - (a.y + d.y)) + k * (f - (a.z + d.z));
    if (JSM.IsZero(l))
        return 0;
    d.MultiplyScalar((g * b + h * e + k * f + c) / l);
    d = JSM.CoordAdd(a, d);
    a = a.DistanceTo(d);
    JSM.IsNegative(g * b + h * e + k * f + c) && (a = -a);
    return a
}
;
JSM.CoordPlaneDirectionalDistance = function(a, b, c) {
    return Math.abs(JSM.CoordPlaneSignedDirectionalDistance(a, b, c))
}
;
JSM.MatrixView = function(a, b, c) {
    if (a.IsEqual(b))
        return JSM.MatrixIdentity();
    var d = [];
    b = JSM.CoordSub(a, b).Normalize();
    c = JSM.VectorCross(c, b).Normalize();
    var e = JSM.VectorCross(b, c).Normalize();
    d[0] = c.x;
    d[1] = e.x;
    d[2] = b.x;
    d[3] = 0;
    d[4] = c.y;
    d[5] = e.y;
    d[6] = b.y;
    d[7] = 0;
    d[8] = c.z;
    d[9] = e.z;
    d[10] = b.z;
    d[11] = 0;
    d[12] = -JSM.VectorDot(c, a);
    d[13] = -JSM.VectorDot(e, a);
    d[14] = -JSM.VectorDot(b, a);
    d[15] = 1;
    return d
}
;
JSM.MatrixPerspective = function(a, b, c, d) {
    var e = [];
    a = 1 / Math.tan(a / 2);
    var f = 1 / (c - d);
    e[0] = a / b;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;
    e[4] = 0;
    e[5] = a;
    e[6] = 0;
    e[7] = 0;
    e[8] = 0;
    e[9] = 0;
    e[10] = (d + c) * f;
    e[11] = -1;
    e[12] = 0;
    e[13] = 0;
    e[14] = 2 * d * c * f;
    e[15] = 0;
    return e
}
;
JSM.Project = function(a, b, c, d, e, f, g, h, k) {
    a = [a.x, a.y, a.z, 1];
    b = JSM.MatrixView(b, c, d);
    e = JSM.MatrixPerspective(e, f, g, h);
    e = JSM.MatrixMultiply(b, e);
    a = JSM.MatrixVectorMultiply(e, a);
    e = a[3];
    if (JSM.IsZero(e))
        return null;
    f = new JSM.Coord(0,0,0);
    f.x = (0.5 * (a[0] / e) + 0.5) * k[2] + k[0];
    f.y = (0.5 * (a[1] / e) + 0.5) * k[3] + k[1];
    f.z = 0.5 * (a[2] / e) + 0.5;
    return f
}
;
JSM.Unproject = function(a, b, c, d, e, f, g, h, k) {
    a = [2 * ((a.x - k[0]) / k[2]) - 1, 2 * ((a.y - k[1]) / k[3]) - 1, 2 * a.z - 1, 1];
    b = JSM.MatrixView(b, c, d);
    e = JSM.MatrixPerspective(e, f, g, h);
    e = JSM.MatrixMultiply(b, e);
    e = JSM.MatrixInvert(e);
    a = JSM.MatrixVectorMultiply(e, a);
    if (JSM.IsZero(a[3]))
        return null;
    e = new JSM.Coord(0,0,0);
    e.x = a[0] / a[3];
    e.y = a[1] / a[3];
    e.z = a[2] / a[3];
    return e
}
;
JSM.ConvexHull2D = function(a) {
    function b(a, b) {
        var c = a.length, d = 0, e;
        for (e = 1; e < c; e++)
            b == d ? d = e : JSM.CoordOrientation2D(a[b], a[d], a[e]) == JSM.Orientation.Clockwise && (d = e);
        return d
    }
    var c = [];
    if (3 > a.length)
        return c;
    var d = function(a) {
        var b = a.length, c = JSM.Inf, d = -1, e, f;
        for (e = 0; e < b; e++)
            f = a[e].x,
            JSM.IsLower(f, c) && (c = f,
            d = e);
        return d
    }(a), e = d, f;
    do
        c.push(e),
        e = f = b(a, e);
    while (f != d);return c
}
;
JSM.ConvexHull3D = function(a) {
    function b() {
        this.position = null
    }
    function c() {
        this.tri2 = this.tri1 = this.vert2 = this.vert1 = null
    }
    function d() {
        this.valid = this.edges = this.vertices = null
    }
    function e(a, c) {
        var d = new b;
        d.position = c;
        a.vertices.push(d);
        return a.vertices.length - 1
    }
    function f(a, b, d, e) {
        var f = -1, g, h;
        for (g = 0; g < a.edges.length; g++)
            if (h = a.edges[g],
            h.vert1 == d && h.vert2 == e || h.vert1 == e && h.vert2 == d) {
                f = g;
                break
            }
        -1 == f && (f = new c,
        f.vert1 = d,
        f.vert2 = e,
        f.tri1 = -1,
        f.tri2 = -1,
        a.edges.push(f),
        f = a.edges.length - 1);
        a = a.edges[f];
        a.tri1 != b && a.tri2 != b && (-1 == a.tri1 ? a.tri1 = b : -1 == a.tri2 && (a.tri2 = b));
        return f
    }
    function g(a, b, c, e) {
        var g = a.triangles.length
          , h = f(a, g, b, c)
          , k = f(a, g, c, e)
          , g = f(a, g, e, b)
          , l = new d;
        l.vertices = [b, c, e];
        l.edges = [h, k, g];
        l.valid = !0;
        a.triangles.push(l);
        return a.triangles.length - 1
    }
    function h(a, b, c) {
        a = a.edges[c];
        a.tri1 == b ? a.tri1 = -1 : a.tri2 == b && (a.tri2 = -1)
    }
    function k(a, b, c, d, e) {
        c = a.vertices[c].position;
        d = a.vertices[d].position;
        e = a.vertices[e].position;
        a = JSM.CoordSub(a.vertices[b].position, e);
        b = JSM.CoordSub(c, e);
        c = JSM.CoordSub(d, e);
        return JSM.VectorDot(a, JSM.VectorCross(b, c)) / 6
    }
    function l(a, b) {
        var c = [], d, e;
        for (d = 0; d < a.triangles.length; d++)
            e = a.triangles[d],
            e.valid ? !JSM.IsLower(k(a, e.vertices[0], e.vertices[2], e.vertices[1], b), 0) ? c.push(!0) : c.push(!1) : c.push(!1);
        var f, l, m, n = [];
        for (d = 0; d < c.length; d++)
            c[d] && (e = a.triangles[d],
            e.valid && (f = a.edges[e.edges[0]],
            l = a.edges[e.edges[1]],
            m = a.edges[e.edges[2]],
            f = -1 == f.tri1 || -1 == f.tri2 || c[f.tri1] != c[f.tri2],
            l = -1 == l.tri1 || -1 == l.tri2 || c[l.tri1] != c[l.tri2],
            m = -1 == m.tri1 || -1 == m.tri2 || c[m.tri1] != c[m.tri2],
            f && n.push([e.vertices[0], e.vertices[1], b]),
            l && n.push([e.vertices[1], e.vertices[2], b]),
            m && n.push([e.vertices[2], e.vertices[0], b])));
        for (d = 0; d < c.length; d++)
            c[d] && (e = a.triangles[d],
            e.valid && (e = a,
            m = d,
            f = e.triangles[m],
            f.valid && (h(e, m, f.edges[0]),
            h(e, m, f.edges[1]),
            h(e, m, f.edges[2]),
            f.valid = !1)));
        for (d = 0; d < n.length; d++)
            c = n[d],
            g(a, c[0], c[1], c[2])
    }
    var m = []
      , n = a.length;
    if (4 > n)
        return m;
    var q = new function() {
        this.vertices = [];
        this.edges = [];
        this.triangles = []
    }
    , p;
    for (p = 0; p < n; p++)
        e(q, a[p]);
    (function(a) {
        var b = -1
          , b = !JSM.IsLower(k(a, 0, 1, 2, 3), 0) ? g(a, 0, 1, 2) : g(a, 0, 2, 1)
          , b = a.triangles[b];
        g(a, b.vertices[0], b.vertices[2], 3);
        g(a, b.vertices[2], b.vertices[1], 3);
        g(a, b.vertices[1], b.vertices[0], 3)
    }
    )(q);
    for (p = 4; p < n; p++)
        l(q, p);
    for (p = 0; p < q.triangles.length; p++)
        a = q.triangles[p],
        a.valid && m.push(a.vertices);
    return m
}
;
JSM.Complexity = {
    Invalid: 0,
    Convex: 1,
    Concave: 2,
    Complex: 3
};
JSM.CoordPolygonPosition2D = {
    OnVertex: 0,
    OnEdge: 1,
    Inside: 2,
    Outside: 3
};
JSM.SectorPolygonPosition2D = {
    IntersectionOnePoint: 0,
    IntersectionCoincident: 1,
    IntersectionOnVertex: 2,
    NoIntersection: 3
};
JSM.Polygon2D = function() {
    this.cache = this.vertices = null;
    this.Clear()
}
;
JSM.Polygon2D.prototype.AddVertex = function(a, b) {
    this.AddVertexCoord(new JSM.Coord2D(a,b))
}
;
JSM.Polygon2D.prototype.AddVertexCoord = function(a) {
    this.vertices.push(a);
    this.ClearCache()
}
;
JSM.Polygon2D.prototype.GetVertex = function(a) {
    return this.vertices[a]
}
;
JSM.Polygon2D.prototype.RemoveVertex = function(a) {
    this.vertices.splice(a, 1)
}
;
JSM.Polygon2D.prototype.VertexCount = function() {
    return this.vertices.length
}
;
JSM.Polygon2D.prototype.EnumerateVertices = function(a, b, c) {
    var d = this.vertices.length;
    for (c(a); a != b; )
        a = (a + 1) % d,
        c(a)
}
;
JSM.Polygon2D.prototype.GetNextVertex = function(a) {
    return JSM.NextIndex(a, this.vertices.length)
}
;
JSM.Polygon2D.prototype.GetPrevVertex = function(a) {
    return JSM.PrevIndex(a, this.vertices.length)
}
;
JSM.Polygon2D.prototype.ShiftVertices = function(a) {
    JSM.ShiftArray(this.vertices, a);
    this.ClearCache()
}
;
JSM.Polygon2D.prototype.ReverseVertices = function() {
    this.vertices.reverse();
    this.ClearCache()
}
;
JSM.Polygon2D.prototype.GetVertexAngle = function(a) {
    var b = this.vertices[this.GetPrevVertex(a)]
      , c = this.vertices[a];
    a = this.vertices[this.GetNextVertex(a)];
    b = JSM.CoordSub2D(b, c);
    c = JSM.CoordSub2D(a, c);
    return b.AngleTo(c)
}
;
JSM.Polygon2D.prototype.GetSignedArea = function() {
    if (null !== this.cache.signedArea)
        return this.cache.signedArea;
    var a = this.vertices.length
      , b = 0;
    if (3 <= a) {
        var c, d, e;
        for (c = 0; c < a; c++)
            d = this.vertices[c],
            e = this.vertices[(c + 1) % a],
            b += d.x * e.y - e.x * d.y;
        b *= 0.5
    }
    return this.cache.signedArea = b
}
;
JSM.Polygon2D.prototype.GetArea = function() {
    var a = this.GetSignedArea();
    return Math.abs(a)
}
;
JSM.Polygon2D.prototype.GetOrientation = function() {
    if (null !== this.cache.orientation)
        return this.cache.orientation;
    var a = JSM.Orientation.Invalid;
    if (3 <= this.vertices.length) {
        var b = this.GetSignedArea();
        JSM.IsPositive(b) ? a = JSM.Orientation.CounterClockwise : JSM.IsNegative(b) && (a = JSM.Orientation.Clockwise)
    }
    return this.cache.orientation = a
}
;
JSM.Polygon2D.prototype.GetComplexity = function() {
    if (null !== this.cache.complexity)
        return this.cache.complexity;
    var a = this.vertices.length;
    if (3 > a)
        return JSM.Complexity.Invalid;
    var b = JSM.Complexity.Invalid;
    if (this.GetOrientation() != JSM.Orientation.Invalid) {
        var b = JSM.Complexity.Convex, c;
        for (c = 0; c < a; c++)
            if (this.IsConcaveVertex(c)) {
                b = JSM.Complexity.Concave;
                break
            }
    }
    return this.cache.complexity = b
}
;
JSM.Polygon2D.prototype.GetVertexOrientation = function(a) {
    if (void 0 !== this.cache.vertexOrientations[a])
        return this.cache.vertexOrientations[a];
    var b = this.vertices[this.GetPrevVertex(a)]
      , c = this.vertices[a]
      , d = this.vertices[this.GetNextVertex(a)]
      , b = JSM.CoordOrientation2D(b, c, d);
    return this.cache.vertexOrientations[a] = b
}
;
JSM.Polygon2D.prototype.IsConvexVertex = function(a) {
    var b = this.GetOrientation();
    a = this.GetVertexOrientation(a);
    return a == JSM.Orientation.Invalid ? !1 : a == b
}
;
JSM.Polygon2D.prototype.IsConcaveVertex = function(a) {
    var b = this.GetOrientation();
    a = this.GetVertexOrientation(a);
    return a == JSM.Orientation.Invalid ? !1 : a != b
}
;
JSM.Polygon2D.prototype.CoordPosition = function(a) {
    function b(a, b, c) {
        var d = b.y - a.y
          , e = c.y - a.y
          , f = JSM.IsNegative(d)
          , g = JSM.IsPositive(d)
          , d = JSM.IsNegative(e)
          , e = JSM.IsPositive(e);
        if (f && d || g && e)
            return 0;
        f = !f && !g;
        d = !d && !e;
        if (f && d)
            return 0;
        e = new JSM.Coord2D(b.x,a.y);
        JSM.IsEqual(b.y, a.y) || (g = Math.abs((b.y - a.y) / (c.y - b.y)),
        e.x = b.x + (c.x - b.x) * g);
        return JSM.IsLower(e.x, a.x) ? 0 : JSM.IsGreater(e.x, a.x) && (f || d) ? (a = JSM.IsGreater(c.y, b.y),
        f && a || d && !a ? 1 : 0) : 1
    }
    var c = this.vertices.length, d = 0, e, f, g, h;
    for (e = 0; e < c; e++) {
        f = this.vertices[e];
        g = this.vertices[(e + 1) % c];
        h = new JSM.Sector2D(f,g);
        h = h.CoordPosition(a);
        if (h == JSM.CoordSectorPosition2D.CoordInsideOfSector)
            return JSM.CoordPolygonPosition2D.OnEdge;
        if (h == JSM.CoordSectorPosition2D.CoordOnSectorEndCoord)
            return JSM.CoordPolygonPosition2D.OnVertex;
        d += b(a, f, g)
    }
    return 0 !== d % 2 ? JSM.CoordPolygonPosition2D.Inside : JSM.CoordPolygonPosition2D.Outside
}
;
JSM.Polygon2D.prototype.SectorPosition = function(a, b, c) {
    var d = JSM.SectorPolygonPosition2D.NoIntersection
      , e = this.vertices.length;
    if (3 > e)
        return d;
    var f, g, h, k, l;
    for (f = 0; f < e; f++)
        if (g = f,
        h = (f + 1) % e,
        k = this.vertices[g],
        l = this.vertices[h],
        !(g == b || h == b || g == c || h == c)) {
            g = new JSM.Sector2D(k,l);
            g = a.SectorPosition(g);
            if (g == JSM.SectorSectorPosition2D.SectorsIntersectOnePoint)
                return JSM.SectorPolygonPosition2D.IntersectionOnePoint;
            if (g == JSM.SectorSectorPosition2D.SectorsIntersectCoincident)
                return JSM.SectorPolygonPosition2D.IntersectionCoincident;
            g == JSM.SectorSectorPosition2D.SectorsIntersectEndPoint && (d = JSM.SectorPolygonPosition2D.IntersectionOnVertex)
        }
    return d
}
;
JSM.Polygon2D.prototype.IsDiagonal = function(a, b) {
    return a == b || (this.GetPrevVertex(a) == b || this.GetNextVertex(a) == b) || this.vertices[a].IsEqual(this.vertices[b]) || function(a, b, e) {
        var f = a.GetVertex(b)
          , g = a.GetVertex(e)
          , f = new JSM.Sector2D(f,g);
        return a.SectorPosition(f, b, e) != JSM.SectorPolygonPosition2D.NoIntersection ? !0 : !1
    }(this, a, b) || !function(a, b, e) {
        b = a.GetVertex(b);
        e = a.GetVertex(e);
        e = new JSM.Coord2D((b.x + e.x) / 2,(b.y + e.y) / 2);
        return a.CoordPosition(e) == JSM.CoordPolygonPosition2D.Inside
    }(this, a, b) ? !1 : !0
}
;
JSM.Polygon2D.prototype.ToArray = function() {
    var a = [], b, c;
    for (b = 0; b < this.vertices.length; b++)
        c = this.vertices[b],
        a.push(c.Clone());
    return a
}
;
JSM.Polygon2D.prototype.FromArray = function(a) {
    this.Clear();
    var b, c;
    for (b = 0; b < a.length; b++)
        c = a[b],
        this.AddVertex(c.x, c.y)
}
;
JSM.Polygon2D.prototype.GetBoundingBox = function() {
    if (null !== this.cache.boundingBox)
        return this.cache.boundingBox;
    var a = new JSM.Box2D(new JSM.Coord2D(JSM.Inf,JSM.Inf),new JSM.Coord2D(-JSM.Inf,-JSM.Inf)), b, c;
    for (b = 0; b < this.vertices.length; b++)
        c = this.vertices[b],
        a.min.x = JSM.Minimum(a.min.x, c.x),
        a.min.y = JSM.Minimum(a.min.y, c.y),
        a.max.x = JSM.Maximum(a.max.x, c.x),
        a.max.y = JSM.Maximum(a.max.y, c.y);
    return this.cache.boundingBox = a
}
;
JSM.Polygon2D.prototype.Clear = function() {
    this.vertices = [];
    this.ClearCache()
}
;
JSM.Polygon2D.prototype.ClearCache = function() {
    this.cache = {
        signedArea: null,
        orientation: null,
        vertexOrientations: {},
        complexity: null,
        boundingBox: null
    }
}
;
JSM.Polygon2D.prototype.Clone = function() {
    var a = new JSM.Polygon2D, b, c;
    for (b = 0; b < this.vertices.length; b++)
        c = this.vertices[b],
        a.AddVertexCoord(c.Clone());
    return a
}
;
JSM.ContourPolygon2D = function() {
    this.contours = null;
    this.Clear()
}
;
JSM.ContourPolygon2D.prototype.AddVertex = function(a, b) {
    this.lastContour.AddVertex(a, b)
}
;
JSM.ContourPolygon2D.prototype.AddVertexCoord = function(a) {
    this.lastContour.AddVertexCoord(a)
}
;
JSM.ContourPolygon2D.prototype.AddContourVertex = function(a, b, c) {
    return this.contours[a].AddVertex(b, c)
}
;
JSM.ContourPolygon2D.prototype.AddContourVertexCoord = function(a, b) {
    return this.contours[a].AddVertexCoord(b)
}
;
JSM.ContourPolygon2D.prototype.VertexCount = function() {
    var a = 0, b;
    for (b = 0; b < this.contours.length; b++)
        a += this.contours[b].VertexCount();
    return a
}
;
JSM.ContourPolygon2D.prototype.ReverseVertices = function() {
    var a;
    for (a = 0; a < this.contours.length; a++)
        this.contours[a].ReverseVertices()
}
;
JSM.ContourPolygon2D.prototype.ContourVertexCount = function(a) {
    return this.contours[a].VertexCount()
}
;
JSM.ContourPolygon2D.prototype.AddContour = function(a) {
    this.lastContour = void 0 === a || null === a ? new JSM.Polygon2D : a;
    this.contours.push(this.lastContour)
}
;
JSM.ContourPolygon2D.prototype.GetLastContour = function() {
    return this.lastContour
}
;
JSM.ContourPolygon2D.prototype.GetContourVertex = function(a, b) {
    return this.contours[a].GetVertex(b)
}
;
JSM.ContourPolygon2D.prototype.GetContour = function(a) {
    return this.contours[a]
}
;
JSM.ContourPolygon2D.prototype.ContourCount = function() {
    return this.contours.length
}
;
JSM.ContourPolygon2D.prototype.GetSignedArea = function() {
    var a = 0, b;
    for (b = 0; b < this.contours.length; b++)
        a += this.contours[b].GetSignedArea();
    return a
}
;
JSM.ContourPolygon2D.prototype.GetArea = function() {
    var a = this.GetSignedArea();
    return Math.abs(a)
}
;
JSM.ContourPolygon2D.prototype.GetOrientation = function() {
    if (null === this.lastContour)
        return JSM.Orientation.Invalid;
    var a = this.contours[0].GetOrientation();
    if (1 == this.contours.length)
        return a;
    if (a == JSM.Orientation.Invalid)
        return JSM.Orientation.Invalid;
    var b, c;
    for (b = 1; b < this.contours.length; b++)
        if (c = this.contours[b].GetOrientation(),
        c == JSM.Orientation.Invalid || a == c)
            return JSM.Orientation.Invalid;
    return a
}
;
JSM.ContourPolygon2D.prototype.GetComplexity = function() {
    if (null === this.lastContour)
        return JSM.Complexity.Invalid;
    if (1 == this.contours.length)
        return this.contours[0].GetComplexity();
    var a, b;
    for (a = 1; a < this.contours.length; a++)
        if (b = this.contours[a].GetComplexity(),
        b == JSM.Complexity.Invalid)
            return JSM.Complexity.Invalid;
    return JSM.Complexity.Complex
}
;
JSM.ContourPolygon2D.prototype.ToArray = function() {
    var a = [], b, c, d, e;
    for (b = 0; b < this.contours.length; b++) {
        d = this.contours[b];
        for (c = 0; c < d.VertexCount(); c++)
            e = d.GetVertex(c),
            a.push(e.Clone());
        b < this.contours.length - 1 && a.push(null)
    }
    return a
}
;
JSM.ContourPolygon2D.prototype.FromArray = function(a) {
    this.Clear();
    this.AddContour();
    var b, c;
    for (b = 0; b < a.length; b++)
        c = a[b],
        null === c ? this.AddContour() : this.AddVertex(c.x, c.y)
}
;
JSM.ContourPolygon2D.prototype.Clear = function() {
    this.contours = [];
    this.lastContour = null
}
;
JSM.ContourPolygon2D.prototype.Clone = function() {
    var a = new JSM.ContourPolygon2D, b, c;
    for (b = 0; b < this.contours.length; b++)
        c = this.contours[b],
        a.AddContour(c.Clone());
    return a
}
;
JSM.Polygon = function() {
    this.cache = this.vertices = null;
    this.Clear()
}
;
JSM.Polygon.prototype.AddVertex = function(a, b, c) {
    this.AddVertexCoord(new JSM.Coord(a,b,c))
}
;
JSM.Polygon.prototype.AddVertexCoord = function(a) {
    this.vertices.push(a);
    this.ClearCache()
}
;
JSM.Polygon.prototype.GetVertex = function(a) {
    return this.vertices[a]
}
;
JSM.Polygon.prototype.VertexCount = function() {
    return this.vertices.length
}
;
JSM.Polygon.prototype.GetNextVertex = function(a) {
    return JSM.NextIndex(a, this.vertices.length)
}
;
JSM.Polygon.prototype.ReverseVertices = function() {
    this.vertices.reverse();
    this.ClearCache()
}
;
JSM.Polygon.prototype.GetPrevVertex = function(a) {
    return JSM.PrevIndex(a, this.vertices.length)
}
;
JSM.Polygon.prototype.GetVertexAngle = function(a) {
    var b = this.vertices[this.GetPrevVertex(a)]
      , c = this.vertices[a];
    a = this.vertices[this.GetNextVertex(a)];
    b = JSM.CoordSub(b, c);
    c = JSM.CoordSub(a, c);
    return b.AngleTo(c)
}
;
JSM.Polygon.prototype.GetNormal = function() {
    if (null !== this.cache.normal)
        return this.cache.normal;
    var a = JSM.CalculateNormal(this.vertices);
    return this.cache.normal = a
}
;
JSM.Polygon.prototype.ToPolygon2D = function() {
    var a = this.GetNormal(), b = new JSM.Polygon2D, c, d;
    for (c = 0; c < this.vertices.length; c++)
        d = this.vertices[c].ToCoord2D(a),
        b.AddVertex(d.x, d.y);
    return b
}
;
JSM.Polygon.prototype.ToArray = function() {
    var a = [], b, c;
    for (b = 0; b < this.vertices.length; b++)
        c = this.vertices[b],
        a.push(c.Clone());
    return a
}
;
JSM.Polygon.prototype.FromArray = function(a) {
    this.Clear();
    var b, c;
    for (b = 0; b < a.length; b++)
        c = a[b],
        this.AddVertex(c.x, c.y, c.z)
}
;
JSM.Polygon.prototype.Clear = function() {
    this.vertices = [];
    this.ClearCache()
}
;
JSM.Polygon.prototype.ClearCache = function() {
    this.cache = {
        normal: null
    }
}
;
JSM.Polygon.prototype.Clone = function() {
    var a = new JSM.Polygon, b, c;
    for (b = 0; b < this.vertices.length; b++)
        c = this.vertices[b],
        a.AddVertexCoord(c.Clone());
    return a
}
;
JSM.ContourPolygon = function() {
    this.contours = null;
    this.Clear()
}
;
JSM.ContourPolygon.prototype.AddVertex = function(a, b, c) {
    this.lastContour.AddVertex(a, b, c)
}
;
JSM.ContourPolygon.prototype.AddVertexCoord = function(a) {
    this.lastContour.AddVertexCoord(a)
}
;
JSM.ContourPolygon.prototype.AddContourVertex = function(a, b, c, d) {
    return this.contours[a].AddVertex(b, c, d)
}
;
JSM.ContourPolygon.prototype.AddContourVertexCoord = function(a, b) {
    return this.contours[a].AddVertexCoord(b)
}
;
JSM.ContourPolygon.prototype.VertexCount = function() {
    var a = 0, b;
    for (b = 0; b < this.contours.length; b++)
        a += this.contours[b].VertexCount();
    return a
}
;
JSM.ContourPolygon.prototype.ContourVertexCount = function(a) {
    return this.contours[a].VertexCount()
}
;
JSM.ContourPolygon.prototype.AddContour = function(a) {
    this.lastContour = void 0 === a || null === a ? new JSM.Polygon : a;
    this.contours.push(this.lastContour)
}
;
JSM.ContourPolygon.prototype.GetLastContour = function() {
    return this.lastContour
}
;
JSM.ContourPolygon.prototype.GetContourVertex = function(a, b) {
    return this.contours[a].GetVertex(b)
}
;
JSM.ContourPolygon.prototype.GetContour = function(a) {
    return this.contours[a]
}
;
JSM.ContourPolygon.prototype.ContourCount = function() {
    return this.contours.length
}
;
JSM.ContourPolygon.prototype.ToContourPolygon2D = function() {
    var a = this.contours[0].GetNormal(), b = new JSM.ContourPolygon2D, c, d, e, f;
    for (c = 0; c < this.contours.length; c++) {
        b.AddContour();
        e = this.contours[c];
        for (d = 0; d < e.VertexCount(); d++)
            f = e.GetVertex(d),
            b.AddVertexCoord(f.ToCoord2D(a))
    }
    return b
}
;
JSM.ContourPolygon.prototype.ToArray = function() {
    var a = [], b, c, d, e;
    for (b = 0; b < this.contours.length; b++) {
        d = this.contours[b];
        for (c = 0; c < d.VertexCount(); c++)
            e = d.GetVertex(c),
            a.push(e.Clone());
        b < this.contours.length - 1 && a.push(null)
    }
    return a
}
;
JSM.ContourPolygon.prototype.FromArray = function(a) {
    this.Clear();
    this.AddContour();
    var b, c;
    for (b = 0; b < a.length; b++)
        c = a[b],
        null === c ? this.AddContour() : this.AddVertex(c.x, c.y, c.z)
}
;
JSM.ContourPolygon.prototype.Clear = function() {
    this.contours = [];
    this.lastContour = null
}
;
JSM.ContourPolygon.prototype.Clone = function() {
    var a = new JSM.ContourPolygon, b, c;
    for (b = 0; b < this.contours.length; b++)
        c = this.contours[b],
        a.AddContour(c.Clone());
    return a
}
;
JSM.OffsetPolygonContour = function(a, b) {
    var c = a.VertexCount(), d = a.GetNormal(), e, f, g, h, k, l = new JSM.Polygon, m;
    for (m = 0; m < c; m++)
        e = a.GetPrevVertex(m),
        f = m,
        g = a.GetNextVertex(m),
        e = a.GetVertex(e),
        f = a.GetVertex(f),
        h = a.GetVertex(g),
        k = JSM.CoordSub(e, f),
        g = JSM.CoordSub(h, f),
        k = k.AngleTo(g) / 2,
        JSM.CoordOrientation(e, f, h, d) == JSM.Orientation.Clockwise && (k = Math.PI - k),
        e = b / Math.sin(k),
        h = f.Clone(),
        h.Offset(g, e),
        h.Rotate(d, k, f),
        l.AddVertex(h.x, h.y, h.z);
    return l
}
;
JSM.CutVertexType = {
    Left: 1,
    Right: 2,
    Cut: 3
};
JSM.PolygonCutter = function(a) {
    this.geometryInterface = a;
    this.Reset()
}
;
JSM.PolygonCutter.prototype.Cut = function(a, b, c, d) {
    this.Reset();
    var e = this.CalculateOriginalPolygonData(a);
    return null !== e ? (a = a.Clone(),
    e == JSM.CutVertexType.Left ? b.push(a) : e == JSM.CutVertexType.Right ? c.push(a) : d.push(a),
    !0) : !this.CalculateCutPolygonData() || !this.CalculateEntryVertices() || !this.CalculateCuttedPolygons(b, c) ? !1 : !0
}
;
JSM.PolygonCutter.prototype.Reset = function() {
    this.entryVertexTypes = this.entryVertices = this.cutVertexIndices = this.cutPolygonVertexDistances = this.cutPolygonVertexTypes = this.cutPolygon = this.originalPolygonVertexTypes = this.originalPolygon = null
}
;
JSM.PolygonCutter.prototype.CalculateOriginalPolygonData = function(a) {
    this.originalPolygon = a;
    this.originalPolygonVertexTypes = [];
    var b = !1, c = !1, d, e;
    for (d = 0; d < this.originalPolygon.VertexCount(); d++)
        e = a.GetVertex(d),
        e = this.geometryInterface.getVertexSide(e),
        e == JSM.CutVertexType.Left ? b = !0 : e == JSM.CutVertexType.Right && (c = !0),
        this.originalPolygonVertexTypes.push(e);
    return b && c ? null : b ? JSM.CutVertexType.Left : c ? JSM.CutVertexType.Right : JSM.CutVertexType.Cut
}
;
JSM.PolygonCutter.prototype.CalculateCutPolygonData = function() {
    function a(a, b) {
        if (0 === a.length)
            return !1;
        var c = a[a.length - 1];
        return c == JSM.CutVertexType.Cut || b == JSM.CutVertexType.Cut ? !1 : c != b
    }
    function b(a, b, c) {
        a.cutPolygon.AddVertexCoord(b);
        a.cutPolygonVertexTypes.push(c);
        c == JSM.CutVertexType.Cut && a.cutVertexIndices.push(a.cutPolygonVertexTypes.length - 1)
    }
    function c(a, c) {
        var d = a.originalPolygon.GetPrevVertex(c)
          , d = a.originalPolygon.GetVertex(d)
          , e = a.originalPolygon.GetVertex(c)
          , d = a.geometryInterface.getIntersectionVertex(d, e);
        if (null === d)
            return !1;
        b(a, d, JSM.CutVertexType.Cut);
        return !0
    }
    function d(a, c, d) {
        var e = a.originalPolygon.GetVertex(c).Clone();
        b(a, e, d);
        var f = a.originalPolygon.VertexCount()
          , g = a.originalPolygonVertexTypes[JSM.PrevIndex(c, f)];
        c = a.originalPolygonVertexTypes[JSM.NextIndex(c, f)];
        d == JSM.CutVertexType.Cut && g == c && b(a, e, d);
        return !0
    }
    this.cutPolygon = this.geometryInterface.createPolygon();
    this.cutPolygonVertexTypes = [];
    this.cutVertexIndices = [];
    var e = this.originalPolygon.VertexCount(), f, g, h, k;
    for (f = 0; f <= e; f++)
        g = f === e,
        h = f,
        g && (h = 0),
        k = this.originalPolygonVertexTypes[h],
        a(this.cutPolygonVertexTypes, k) && c(this, h),
        g || d(this, h, k);
    this.cutPolygonVertexDistances = this.geometryInterface.getVertexDistances(this.cutPolygon);
    return !function(a, b, c) {
        if (2 > b.length)
            return !1;
        JSM.BubbleSort(b, function(a, b) {
            return JSM.IsLower(c[a], c[b])
        }, function(a, c) {
            JSM.SwapArrayValues(b, a, c)
        });
        return !0
    }(this.cutPolygon, this.cutVertexIndices, this.cutPolygonVertexDistances) ? !1 : !0
}
;
JSM.PolygonCutter.prototype.CalculateEntryVertices = function() {
    function a(a, b, c) {
        if (a[c] != JSM.CutVertexType.Cut)
            return 0;
        var d = JSM.PrevIndex(c, a.length)
          , k = JSM.NextIndex(c, a.length)
          , l = a[d];
        a = a[k];
        c = b[c];
        d = b[d];
        b = b[k];
        if (l == JSM.CutVertexType.Right) {
            if (a == JSM.CutVertexType.Left || a == JSM.CutVertexType.Cut && JSM.IsLowerOrEqual(c, b))
                return 1
        } else if (l == JSM.CutVertexType.Left) {
            if (a == JSM.CutVertexType.Right || a == JSM.CutVertexType.Cut && JSM.IsGreaterOrEqual(c, b))
                return -1
        } else if (l == JSM.CutVertexType.Cut)
            if (a == JSM.CutVertexType.Left) {
                if (JSM.IsLowerOrEqual(c, d))
                    return 1
            } else if (a == JSM.CutVertexType.Right && JSM.IsGreaterOrEqual(c, d))
                return -1;
        return 0
    }
    this.entryVertices = [];
    this.entryVertexTypes = [];
    var b, c, d;
    for (b = 0; b < this.cutVertexIndices.length; b++)
        c = this.cutVertexIndices[b],
        d = a(this.cutPolygonVertexTypes, this.cutPolygonVertexDistances, c),
        0 !== d && (this.entryVertices.push(c),
        this.entryVertexTypes.push(d));
    return 0 === this.entryVertices.length || 0 !== this.entryVertices.length % 2 ? !1 : !0
}
;
JSM.PolygonCutter.prototype.CalculateCuttedPolygons = function(a, b) {
    function c(a, b, c, g) {
        function h(a, b, c) {
            return -1 != c[a] ? (b = c[a],
            c[c[a]] = -1,
            c[a] = -1,
            b) : JSM.NextIndex(a, b.VertexCount())
        }
        function k(a, b, c, d, e) {
            c = a.entryVertices[c];
            if (-1 !== b[c]) {
                var f = a.geometryInterface.createPolygon();
                f.AddVertexCoord(a.cutPolygon.GetVertex(c).Clone());
                for (var g = h(c, a.cutPolygon, b), k = null; g != c; ) {
                    null === k && a.cutPolygonVertexTypes[g] !== JSM.CutVertexType.Cut && (k = a.cutPolygonVertexTypes[g]);
                    var l = f
                      , m = a.cutPolygon.GetVertex(g).Clone()
                      , C = l.VertexCount();
                    0 < C && l.GetVertex(C - 1).IsEqual(m) || l.AddVertexCoord(m);
                    g = h(g, a.cutPolygon, b)
                }
                2 < f.VertexCount() && (k == JSM.CutVertexType.Left ? d.push(f) : k == JSM.CutVertexType.Right && e.push(f))
            }
        }
        var l = function(a, b, c) {
            var d = [], e;
            for (e = 0; e < a.VertexCount(); e++)
                d.push(-1);
            var f;
            for (e = 0; e < b.length; e++)
                if (-1 == d[b[e]]) {
                    a: {
                        a = void 0;
                        for (a = e + 1; a < b.length; a++)
                            if (-1 == d[b[a]] && c[e] != c[a]) {
                                f = a;
                                break a
                            }
                        f = -1
                    }
                    if (-1 == f)
                        return null;
                    a = d;
                    var g = b
                      , h = e;
                    a[g[h]] = g[f];
                    a[g[f]] = g[h]
                }
            return d
        }(a.cutPolygon, a.entryVertices, a.entryVertexTypes);
        if (null === l)
            return !1;
        for (var m = g ? a.entryVertices.length - 1 : 0; 0 <= m && m < a.entryVertices.length; )
            k(a, l, m, b, c),
            m = g ? m - 1 : m + 1;
        return !0
    }
    return !c(this, a, b, !1) || !c(this, a, b, !0) ? !1 : !0
}
;
JSM.CutPolygon2DWithLine = function(a, b, c, d, e) {
    return (new JSM.PolygonCutter({
        createPolygon: function() {
            return new JSM.Polygon2D
        },
        getVertexSide: function(a) {
            a = b.CoordPosition(a);
            var c = JSM.CutVertexType.Cut;
            a == JSM.CoordLinePosition2D.CoordAtLineLeft ? c = JSM.CutVertexType.Left : a == JSM.CoordLinePosition2D.CoordAtLineRight && (c = JSM.CutVertexType.Right);
            return c
        },
        getIntersectionVertex: function(a, c) {
            var d = new JSM.Line2D(c,JSM.CoordSub2D(c, a))
              , e = new JSM.Coord2D(0,0);
            return b.LinePosition(d, e) != JSM.LineLinePosition2D.LinesIntersectsOnePoint ? null : e
        },
        getVertexDistances: function(a) {
            for (var c = new JSM.Coord2D(0,0), d = b.start.Clone(), c = b.direction.Clone().Rotate(-Math.PI / 2, c), d = new JSM.Line2D(d,c), e, l = [], c = 0; c < a.VertexCount(); c++)
                e = a.GetVertex(c),
                l.push(d.CoordSignedDistance(e));
            return l
        }
    })).Cut(a, c, d, e)
}
;
JSM.CutPolygonWithPlane = function(a, b, c, d, e) {
    return (new JSM.PolygonCutter({
        createPolygon: function() {
            return new JSM.Polygon
        },
        getVertexSide: function(a) {
            a = b.CoordPosition(a);
            var c = JSM.CutVertexType.Cut;
            a == JSM.CoordPlanePosition.CoordInFrontOfPlane ? c = JSM.CutVertexType.Left : a == JSM.CoordPlanePosition.CoordAtBackOfPlane && (c = JSM.CutVertexType.Right);
            return c
        },
        getIntersectionVertex: function(a, c) {
            var d = new JSM.Line(c,JSM.CoordSub(c, a))
              , e = new JSM.Coord(0,0,0);
            return b.LinePosition(d, e) != JSM.LinePlanePosition.LineIntersectsPlane ? null : e
        },
        getVertexDistances: function(a) {
            for (var c = a.GetNormal(), d = new JSM.Vector(b.a,b.b,b.c), c = JSM.VectorCross(d, c), d = a.GetVertex(0), c = JSM.GetPlaneFromCoordAndDirection(d, c), e, l = [], d = 0; d < a.VertexCount(); d++)
                e = a.GetVertex(d),
                l.push(c.CoordSignedDistance(e));
            return l
        }
    })).Cut(a, c, d, e)
}
;
JSM.SegmentPolygon2D = function(a, b, c) {
    function d(a, b, c, d, e, f, g) {
        e = e.Clone();
        var h, k, l, B;
        for (h = 1; h < c; h++) {
            e.Offset(f, d);
            l = new JSM.Line2D(e,g);
            B = [];
            for (k = 0; k < a.length; k++) {
                var C = b
                  , w = B
                  , x = []
                  , A = [];
                if (JSM.CutPolygon2DWithLine(a[k], l, x, A, [])) {
                    for (var E = void 0, E = 0; E < x.length; E++)
                        C.push(x[E]);
                    for (E = 0; E < A.length; E++)
                        w.push(A[E])
                }
            }
            a = B
        }
        for (k = 0; k < a.length; k++)
            b.push(a[k])
    }
    var e = a.GetBoundingBox()
      , f = (e.max.x - e.min.x) / b
      , g = (e.max.y - e.min.y) / c;
    a = [a];
    var h = new JSM.Coord2D(e.min.x,e.min.y)
      , e = new JSM.Coord2D(e.min.x,e.max.y)
      , k = []
      , l = [];
    d(a, k, b, f, h, new JSM.Vector2D(1,0), new JSM.Vector2D(0,1));
    d(k, l, c, g, e, new JSM.Vector2D(0,-1), new JSM.Vector2D(1,0));
    return l
}
;
JSM.ConvertContourPolygonToPolygon2D = function(a, b) {
    function c(a, b, c, d, e) {
        a.AddVertexCoord(b);
        void 0 !== c && null !== c && c.push([d, e])
    }
    function d(a, b, d, e, f) {
        f = function(a, b, c, d) {
            function e(a, b, c, d, f) {
                function g(a, b, c) {
                    b = new JSM.Sector2D(b,c);
                    a = a.SectorPosition(b, -1, -1);
                    return a == JSM.SectorPolygonPosition2D.IntersectionOnePoint || a == JSM.SectorPolygonPosition2D.IntersectionCoincident ? !0 : !1
                }
                if (g(b, c, d))
                    return !1;
                var h;
                for (b = 1; b < a.ContourCount(); b++)
                    if (void 0 === f.addedHoles[b] && (h = a.GetContour(b),
                    g(h, c, d)))
                        return !1;
                return !0
            }
            function f(a, b) {
                var c;
                for (c = 0; c < b.entryPositions.length; c++)
                    if (a.IsEqual(b.entryPositions[c]))
                        return !0;
                return !1
            }
            c = a.GetContour(c);
            var g, h, k, l;
            for (g = 0; g < b.VertexCount(); g++)
                for (h = 0; h < c.VertexCount(); h++)
                    if (k = b.GetVertex(g),
                    l = c.GetVertex(h),
                    e(a, b, k, l, d) && !f(k, d) && !f(l, d))
                        return d.entryPositions.push(k.Clone()),
                        d.entryPositions.push(l.Clone()),
                        {
                            beg: g,
                            end: h
                        };
            return null
        }(a, b, d, f);
        if (null === f)
            return !1;
        (function(a, b, d, e, f) {
            var g = b.GetContour(d)
              , h = e.beg;
            b = a.GetVertex(h).Clone();
            a.ShiftVertices(h + 1);
            var k = 0
              , l = 0;
            void 0 !== f && null !== f && (k = f[h][0],
            l = f[h][1],
            JSM.ShiftArray(f, h + 1));
            e = e.end;
            h = g.GetPrevVertex(e);
            g.EnumerateVertices(e, h, function(b) {
                c(a, g.GetVertex(b).Clone(), f, d, b)
            });
            c(a, g.GetVertex(e).Clone(), f, d, e);
            c(a, b, f, k, l)
        }
        )(b, a, d, f, e);
        return !0
    }
    var e = a.ContourCount(), f = a.GetContour(0), g = new JSM.Polygon2D, h, k;
    for (h = 0; h < f.VertexCount(); h++)
        k = f.GetVertex(h),
        c(g, k.Clone(), b, 0, h);
    if (1 == e)
        return g;
    f = [];
    for (h = 1; h < e; h++)
        f.push(h);
    for (e = {
        addedHoles: {},
        holeTryouts: {},
        entryPositions: []
    }; 0 < f.length; )
        if (h = f.shift(),
        d(a, g, h, b, e))
            e.addedHoles[h] = !0;
        else {
            void 0 === e.holeTryouts[h] && (e.holeTryouts[h] = 0);
            e.holeTryouts[h] += 1;
            if (10 < e.holeTryouts[h])
                return null;
            f.push(h)
        }
    return g
}
;
JSM.TriangulateConvexPolygon = function(a) {
    var b = [], c;
    for (c = 1; c < a.VertexCount() - 1; c++)
        b.push([0, c, c + 1]);
    return b
}
;
JSM.TriangulateConcavePolygon2D = function(a) {
    function b(a) {
        var b = a.VertexCount(), c, d;
        for (c = 0; c < b; c++)
            for (d = 0; d < b; d++)
                if (c != d && a.IsDiagonal(c, d))
                    return {
                        beg: c,
                        end: d
                    };
        return null
    }
    function c(a, b) {
        function c(a, b, d) {
            b.polygon.AddVertexCoord(a.polygon.GetVertex(d));
            b.map.push(a.map[d])
        }
        var d = {
            polygon: new JSM.Polygon2D,
            map: []
        }, e = {
            polygon: new JSM.Polygon2D,
            map: []
        }, f, q;
        f = b.beg;
        q = a.polygon.GetPrevVertex(b.end);
        c(a, d, b.end);
        a.polygon.EnumerateVertices(f, q, function(b) {
            c(a, d, b)
        });
        f = b.end;
        q = a.polygon.GetPrevVertex(b.beg);
        c(a, e, b.beg);
        a.polygon.EnumerateVertices(f, q, function(b) {
            c(a, e, b)
        });
        return {
            resultData1: d,
            resultData2: e
        }
    }
    var d = []
      , e = function(a) {
        var b = [], c;
        for (c = 0; c < a; c++)
            b[c] = c;
        return b
    }(a.VertexCount());
    d.push({
        polygon: a,
        map: e
    });
    a = [];
    for (var f; 0 < d.length; )
        if (e = d.pop(),
        f = e.polygon.VertexCount(),
        !(3 > f))
            if (3 == f)
                a.push(e.map);
            else {
                f = b(e.polygon);
                if (null === f)
                    return null;
                e = c(e, f);
                d.push(e.resultData1);
                d.push(e.resultData2)
            }
    return a
}
;
JSM.TriangulatePolygon2D = function(a) {
    if (null === a)
        return null;
    var b = a.VertexCount();
    if (3 > b)
        return null;
    if (3 == b)
        return [[0, 1, 2]];
    b = a.GetComplexity();
    return b === JSM.Complexity.Invalid ? null : b == JSM.Complexity.Convex ? JSM.TriangulateConvexPolygon(a) : JSM.TriangulateConcavePolygon2D(a)
}
;
JSM.TriangulatePolygon = function(a) {
    a = a.ToPolygon2D();
    return JSM.TriangulatePolygon2D(a)
}
;
JSM.TraverseOctreeNodes = function(a, b) {
    function c(a, b) {
        if (b(a) && null !== a.children) {
            var f, g;
            for (f = 0; f < a.children.length; f++)
                g = a.children[f],
                c(g, b)
        }
    }
    c(a.root, b)
}
;
JSM.CreateOctreeChildNodes = function(a, b) {
    function c(a, b, c, d, k) {
        var l = a.GetSize().Clone();
        l.MultiplyScalar(0.5);
        a = new JSM.Coord(a.min.x + c * l.x,a.min.y + d * l.y,a.min.z + k * l.z);
        l = JSM.CoordAdd(a, l);
        l = new JSM.Box(a,l);
        return b(l)
    }
    var d = a.GetSize();
    return JSM.IsZero(d.x) && JSM.IsZero(d.y) && JSM.IsZero(d.z) ? null : [c(a, b, 0, 0, 0), c(a, b, 1, 0, 0), c(a, b, 1, 1, 0), c(a, b, 0, 1, 0), c(a, b, 0, 0, 1), c(a, b, 1, 0, 1), c(a, b, 1, 1, 1), c(a, b, 0, 1, 1)]
}
;
JSM.Octree = function(a, b) {
    this.coords = [];
    this.root = this.CreateNewNode(null, a);
    this.maxCoordNumInNodes = b;
    if (void 0 === this.maxCoordNumInNodes || null === this.maxCoordNumInNodes || 0 === this.maxCoordNumInNodes)
        this.maxCoordNumInNodes = 50
}
;
JSM.Octree.prototype.AddCoord = function(a) {
    return this.AddCoordToNode(a, this.root)
}
;
JSM.Octree.prototype.FindCoord = function(a) {
    var b = this.FindNodeForCoord(a, this.root);
    return null === b ? -1 : this.FindCoordInNode(a, b)
}
;
JSM.Octree.prototype.FindCoordInNode = function(a, b) {
    var c, d;
    for (c = 0; c < b.coords.length; c++)
        if (d = b.coords[c],
        a.IsEqual(this.coords[d]))
            return d;
    return -1
}
;
JSM.Octree.prototype.AddCoordToNode = function(a, b) {
    var c = this.FindNodeForCoord(a, b);
    if (null === c)
        return -1;
    var d = this.FindCoordInNode(a, c);
    if (-1 != d)
        return d;
    if (c.coords.length >= this.maxCoordNumInNodes && this.SplitNode(c))
        return this.AddCoordToNode(a, c);
    d = this.coords.length;
    this.coords.push(a);
    c.coords.push(d);
    return d
}
;
JSM.Octree.prototype.FindNodeForCoord = function(a, b) {
    if (null === b.children)
        return b;
    var c = b.box.GetCenter()
      , d = a.x > c.x
      , e = a.y > c.y
      , c = a.z > c.z;
    return !d && !e && !c ? this.FindNodeForCoord(a, b.children[0]) : d && !e && !c ? this.FindNodeForCoord(a, b.children[1]) : d && e && !c ? this.FindNodeForCoord(a, b.children[2]) : !d && e && !c ? this.FindNodeForCoord(a, b.children[3]) : !d && !e && c ? this.FindNodeForCoord(a, b.children[4]) : d && !e && c ? this.FindNodeForCoord(a, b.children[5]) : d && e && c ? this.FindNodeForCoord(a, b.children[6]) : !d && e && c ? this.FindNodeForCoord(a, b.children[7]) : null
}
;
JSM.Octree.prototype.SplitNode = function(a) {
    var b = this
      , c = JSM.CreateOctreeChildNodes(a.box, function(c) {
        return b.CreateNewNode(a, c)
    });
    if (null === c)
        return !1;
    a.children = c;
    c = a.coords;
    a.coords = [];
    var d, e;
    for (d = 0; d < c.length; d++)
        e = this.FindNodeForCoord(this.coords[c[d]], a),
        e.coords.push(c[d]);
    return !0
}
;
JSM.Octree.prototype.CreateNewNode = function(a, b) {
    return {
        parent: a,
        box: b,
        coords: [],
        children: null
    }
}
;
JSM.TriangleOctree = function(a) {
    this.root = this.CreateNewNode(null, a)
}
;
JSM.TriangleOctree.prototype.AddTriangle = function(a, b, c, d) {
    return this.AddTriangleToNode(a, b, c, this.root, d)
}
;
JSM.TriangleOctree.prototype.AddTriangleToNode = function(a, b, c, d, e) {
    if (!d.box.IsCoordInside(a) || !d.box.IsCoordInside(b) || !d.box.IsCoordInside(c))
        return !1;
    if (null === d.children) {
        var f = this;
        d.children = JSM.CreateOctreeChildNodes(d.box, function(a) {
            return f.CreateNewNode(d, a)
        })
    }
    if (null !== d.children) {
        var g, h;
        for (g = 0; g < d.children.length; g++)
            if (h = d.children[g],
            this.AddTriangleToNode(a, b, c, h, e))
                return !0
    }
    d.triangles.push({
        v0: a,
        v1: b,
        v2: c,
        userData: e
    });
    return !0
}
;
JSM.TriangleOctree.prototype.CreateNewNode = function(a, b) {
    return {
        parent: a,
        box: b,
        triangles: [],
        children: null
    }
}
;
JSM.BSPTree = function() {
    this.root = null
}
;
JSM.BSPTree.prototype.AddPolygon = function(a, b) {
    null === this.root && (this.root = this.CreateNewNode());
    return this.AddPolygonToNode(this.root, a, b)
}
;
JSM.BSPTree.prototype.Traverse = function(a) {
    this.TraverseNode(this.root, a)
}
;
JSM.BSPTree.prototype.TraverseNode = function(a, b) {
    null !== a && (b(a),
    this.TraverseNode(a.inside, b),
    this.TraverseNode(a.outside, b))
}
;
JSM.BSPTree.prototype.GetNodes = function() {
    var a = [];
    this.Traverse(function(b) {
        a.push(b)
    });
    return a
}
;
JSM.BSPTree.prototype.NodeCount = function() {
    var a = 0;
    this.Traverse(function() {
        a += 1
    });
    return a
}
;
JSM.BSPTree.prototype.AddPolygonToNode = function(a, b, c) {
    if (3 > b.VertexCount())
        return !1;
    var d;
    if (null === a.polygon) {
        d = b.GetNormal();
        var e = JSM.GetPlaneFromCoordAndDirection(b.GetVertex(0), d);
        a.polygon = b;
        void 0 !== c && (a.userData = c);
        a.plane = e
    } else {
        d = [];
        var f = []
          , e = [];
        JSM.CutPolygonWithPlane(b, a.plane, f, d, e) && (0 < d.length && this.AddInsidePolygonsToNode(a, d, c),
        0 < f.length && this.AddOutsidePolygonsToNode(a, f, c),
        0 < e.length && (d = b.GetNormal(),
        0 < JSM.VectorDot(d, a.plane.GetNormal()) ? this.AddInsidePolygonsToNode(a, e, c) : this.AddOutsidePolygonsToNode(a, e, c)))
    }
    return !0
}
;
JSM.BSPTree.prototype.AddInsidePolygonsToNode = function(a, b, c) {
    null === a.inside && (a.inside = this.CreateNewNode(),
    a.inside.parent = a);
    var d;
    for (d = 0; d < b.length; d++)
        this.AddPolygonToNode(a.inside, b[d], c)
}
;
JSM.BSPTree.prototype.AddOutsidePolygonsToNode = function(a, b, c) {
    null === a.outside && (a.outside = this.CreateNewNode(),
    a.outside.parent = a);
    var d;
    for (d = 0; d < b.length; d++)
        this.AddPolygonToNode(a.outside, b[d], c)
}
;
JSM.BSPTree.prototype.CreateNewNode = function() {
    return {
        polygon: null,
        userData: null,
        plane: null,
        parent: null,
        inside: null,
        outside: null
    }
}
;
JSM.ClipPolygonWithBSPTree = function(a, b, c, d, e, f) {
    function g(a, b, c) {
        if (null !== b) {
            var d = []
              , e = []
              , f = [];
            JSM.CutPolygonWithPlane(a, b.plane, e, d, f) && (0 < d.length && k(b, d, c),
            0 < e.length && l(b, e, c),
            0 < f.length && (a = a.GetNormal(),
            0 < JSM.VectorDot(a, b.plane.GetNormal()) ? k(b, f, !0) : l(b, f, !0)))
        }
    }
    function h(a, b) {
        var c;
        for (c = 0; c < a.length; c++)
            b.push(a[c])
    }
    function k(a, b, c) {
        if (null !== a.inside) {
            a = a.inside;
            var e;
            for (e = 0; e < b.length; e++)
                g(b[e], a, c)
        } else
            h(b, c ? f : d)
    }
    function l(a, b, d) {
        if (null !== a.outside) {
            a = a.outside;
            var f;
            for (f = 0; f < b.length; f++)
                g(b[f], a, d)
        } else
            h(b, d ? e : c)
    }
    g(a, b.root, !1);
    return !0
}
;
JSM.TraverseBSPTreeForEyePosition = function(a, b, c) {
    function d(a) {
        if (null !== a) {
            var f = a.plane.CoordPosition(b);
            f == JSM.CoordPlanePosition.CoordInFrontOfPlane ? (d(a.inside),
            c(a),
            d(a.outside)) : (f == JSM.CoordPlanePosition.CoordAtBackOfPlane ? (d(a.outside),
            c(a)) : d(a.outside),
            d(a.inside))
        }
    }
    d(a.root)
}
;
JSM.GenerateCubicBezierCurve = function(a, b, c, d, e) {
    var f = [], g = 1 / e, h, k;
    for (h = 0; h <= e; h++) {
        k = h * g;
        var l = k * k
          , m = l * k
          , n = 1 - k
          , q = n * n
          , p = q * n;
        k = new JSM.Coord2D(p * a.x + 3 * q * k * b.x + 3 * n * l * c.x + m * d.x,p * a.y + 3 * q * k * b.y + 3 * n * l * c.y + m * d.y);
        f.push(k)
    }
    return f
}
;
JSM.BernsteinPolynomial = function(a, b, c) {
    var d = 1, e = JSM.Minimum(a, b - a), f;
    for (f = 0; f < e; f++)
        d *= b - f,
        d /= f + 1;
    return d * Math.pow(c, a) * Math.pow(1 - c, b - a)
}
;
JSM.GenerateBezierCurve = function(a, b) {
    var c = [], d = a.length - 1, e = 1 / b, f, g, h, k, l, m;
    for (f = 0; f <= b; f++) {
        h = f * e;
        m = new JSM.Coord2D(0,0);
        for (g = 0; g <= d; g++)
            k = a[g],
            l = JSM.BernsteinPolynomial(g, d, h),
            m.x += k.x * l,
            m.y += k.y * l;
        c.push(m)
    }
    return c
}
;
JSM.GetGaussianCParameter = function(a, b, c, d) {
    return Math.sqrt(-(Math.pow(a - c, 2) / (2 * Math.log(d / Math.abs(b)))))
}
;
JSM.GetGaussianValue = function(a, b, c, d) {
    return b * Math.exp(-(Math.pow(a - c, 2) / (2 * Math.pow(d, 2))))
}
;
JSM.GenerateCirclePoints = function(a, b, c) {
    var d = [], e = 2 * Math.PI, f = 2 * Math.PI / b, g, h;
    for (g = 0; g < b; g++)
        h = JSM.CylindricalToCartesian(a, 0, e),
        void 0 !== c && null !== c && (h = JSM.CoordAdd(h, c)),
        d.push(h),
        e += f;
    return d
}
;
JSM.GetRuledMesh = function(a, b, c, d, e) {
    if (a.length === b.length) {
        var f = a.length - 1, g = [], h = [], k;
        for (k = 0; k <= f; k++)
            g.push(JSM.CoordSub(b[k], a[k])),
            h.push(a[k].DistanceTo(b[k]));
        var l, m;
        for (k = 0; k <= f; k++) {
            l = h[k] / c;
            for (b = 0; b <= c; b++)
                m = a[k].Clone().Offset(g[k], l * b),
                d.push(m)
        }
        for (k = 0; k < f; k++)
            for (b = 0; b < c; b++)
                a = k * (c + 1) + b,
                d = a + 1,
                g = a + c + 1,
                h = g + 1,
                a = [a, g, h, d],
                e.push(a)
    }
}
;
JSM.Ray = function(a, b, c) {
    this.origin = a;
    this.direction = b.Normalize();
    this.length = c
}
;
JSM.Ray.prototype.Set = function(a, b, c) {
    this.origin = a;
    this.direction = b.Normalize();
    this.length = c
}
;
JSM.Ray.prototype.GetOrigin = function() {
    return this.origin
}
;
JSM.Ray.prototype.GetDirection = function() {
    return this.direction
}
;
JSM.Ray.prototype.IsLengthReached = function(a) {
    return void 0 === this.length || null === this.length ? !1 : JSM.IsGreater(a, this.length)
}
;
JSM.Ray.prototype.Clone = function() {
    return new JSM.Ray(this.origin.Clone(),this.direction.Clone(),this.length)
}
;
JSM.Path2D = function(a) {
    this.settings = {
        segmentation: 10,
        offset: new JSM.Vector2D(0,0),
        scale: new JSM.Coord2D(1,1)
    };
    JSM.CopyObjectProperties(a, this.settings, !0);
    this.position = new JSM.Coord2D(0,0);
    this.positionAdded = !1;
    this.polygons = [];
    this.currentPolygon = null
}
;
JSM.Path2D.prototype.MoveTo = function(a, b) {
    this.Close();
    this.position.Set(a, b);
    this.positionAdded = !1
}
;
JSM.Path2D.prototype.LineTo = function(a, b) {
    this.positionAdded || this.AddPolygonPoint(this.position.x, this.position.y);
    this.AddPolygonPoint(a, b)
}
;
JSM.Path2D.prototype.CubicBezierTo = function(a, b, c, d, e, f) {
    a = JSM.GenerateCubicBezierCurve(new JSM.Coord2D(this.position.x,this.position.y), new JSM.Coord2D(c,d), new JSM.Coord2D(e,f), new JSM.Coord2D(a,b), this.settings.segmentation);
    for (b = 1; b < a.length; b++)
        this.LineTo(a[b].x, a[b].y)
}
;
JSM.Path2D.prototype.Close = function() {
    function a(a) {
        if (0 === a.VertexCount())
            return !1;
        a.GetVertex(0).IsEqual(a.GetVertex(a.VertexCount() - 1)) && a.RemoveVertex(a.VertexCount() - 1);
        return 3 > a.VertexCount() ? !1 : !0
    }
    function b(a, b) {
        var c, g, h, k;
        for (c = a.length - 1; 0 <= c; c--) {
            g = a[c].GetContour(0);
            a: {
                var l = b;
                h = g.GetOrientation();
                k = l.GetOrientation();
                if (h !== k && (h = l.GetVertex(0),
                g.CoordPosition(h) == JSM.CoordPolygonPosition2D.Inside)) {
                    g = !0;
                    break a
                }
                g = !1
            }
            if (g)
                return a[c]
        }
        return null
    }
    if (null !== this.currentPolygon) {
        if (a(this.currentPolygon)) {
            var c = b(this.polygons, this.currentPolygon);
            null === c ? (c = new JSM.ContourPolygon2D,
            c.AddContour(this.currentPolygon),
            this.polygons.push(c)) : c.AddContour(this.currentPolygon)
        }
        this.currentPolygon = null
    }
}
;
JSM.Path2D.prototype.PolygonCount = function() {
    return this.polygons.length
}
;
JSM.Path2D.prototype.GetPolygon = function(a) {
    return this.polygons[a]
}
;
JSM.Path2D.prototype.GetPolygons = function() {
    return this.polygons
}
;
JSM.Path2D.prototype.GetCurrentPolygon = function() {
    null === this.currentPolygon && (this.currentPolygon = new JSM.Polygon2D);
    return this.currentPolygon
}
;
JSM.Path2D.prototype.AddPolygonPoint = function(a, b) {
    this.GetCurrentPolygon().AddVertex(this.settings.offset.x + a * this.settings.scale.x, this.settings.offset.y + b * this.settings.scale.y);
    this.position.Set(a, b);
    this.positionAdded = !0
}
;
JSM.HexColorToRGBComponents = function(a) {
    for (var b = a.toString(16); 6 > b.length; )
        b = "0" + b;
    a = parseInt(b.substr(0, 2), 16);
    var c = parseInt(b.substr(2, 2), 16)
      , b = parseInt(b.substr(4, 2), 16);
    return [a, c, b]
}
;
JSM.HexColorToNormalizedRGBComponents = function(a) {
    a = JSM.HexColorToRGBComponents(a);
    return [a[0] / 255, a[1] / 255, a[2] / 255]
}
;
JSM.HexColorToRGBColor = function(a) {
    return parseInt("0x" + a, 16)
}
;
JSM.RGBComponentsToHexColor = function(a, b, c) {
    function d(a) {
        for (a = parseInt(a, 10).toString(16); 2 > a.length; )
            a = "0" + a;
        return a
    }
    a = d(a);
    b = d(b);
    c = d(c);
    return parseInt("0x" + a + b + c, 16)
}
;
JSM.Material = function(a) {
    this.diffuse = this.ambient = 52224;
    this.shininess = this.specular = 0;
    this.opacity = 1;
    this.reflection = 0;
    this.singleSided = !1;
    this.pointSize = 0.1;
    this.texture = null;
    this.textureHeight = this.textureWidth = 1;
    JSM.CopyObjectProperties(a, this, !0)
}
;
JSM.MaterialSet = function() {
    this.materials = [];
    this.defaultMaterial = new JSM.Material
}
;
JSM.MaterialSet.prototype.AddMaterial = function(a) {
    this.materials.push(a);
    return this.materials.length - 1
}
;
JSM.MaterialSet.prototype.GetMaterial = function(a) {
    return 0 > a || a >= this.materials.length ? this.defaultMaterial : this.materials[a]
}
;
JSM.MaterialSet.prototype.GetDefaultMaterial = function() {
    return this.defaultMaterial
}
;
JSM.MaterialSet.prototype.Count = function() {
    return this.materials.length
}
;
JSM.BodyVertex = function(a) {
    this.position = a
}
;
JSM.BodyVertex.prototype.GetPosition = function() {
    return this.position
}
;
JSM.BodyVertex.prototype.SetPosition = function(a) {
    this.position = a
}
;
JSM.BodyVertex.prototype.Clone = function() {
    return new JSM.BodyVertex(this.position.Clone())
}
;
JSM.BodyPoint = function(a) {
    this.vertex = a;
    this.material = -1
}
;
JSM.BodyPoint.prototype.GetVertexIndex = function() {
    return this.vertex
}
;
JSM.BodyPoint.prototype.SetVertexIndex = function(a) {
    this.vertex = a
}
;
JSM.BodyPoint.prototype.HasMaterialIndex = function() {
    return -1 !== this.material
}
;
JSM.BodyPoint.prototype.GetMaterialIndex = function() {
    return this.material
}
;
JSM.BodyPoint.prototype.SetMaterialIndex = function(a) {
    this.material = a
}
;
JSM.BodyPoint.prototype.InheritAttributes = function(a) {
    this.material = a.material
}
;
JSM.BodyPoint.prototype.Clone = function() {
    var a = new JSM.BodyPoint(this.vertex);
    a.material = this.material;
    return a
}
;
JSM.BodyLine = function(a, b) {
    this.beg = a;
    this.end = b;
    this.material = -1
}
;
JSM.BodyLine.prototype.GetBegVertexIndex = function() {
    return this.beg
}
;
JSM.BodyLine.prototype.SetBegVertexIndex = function(a) {
    this.beg = a
}
;
JSM.BodyLine.prototype.GetEndVertexIndex = function() {
    return this.end
}
;
JSM.BodyLine.prototype.SetEndVertexIndex = function(a) {
    this.end = a
}
;
JSM.BodyLine.prototype.HasMaterialIndex = function() {
    return -1 !== this.material
}
;
JSM.BodyLine.prototype.GetMaterialIndex = function() {
    return this.material
}
;
JSM.BodyLine.prototype.SetMaterialIndex = function(a) {
    this.material = a
}
;
JSM.BodyLine.prototype.InheritAttributes = function(a) {
    this.material = a.material
}
;
JSM.BodyLine.prototype.Clone = function() {
    var a = new JSM.BodyLine(this.beg,this.end);
    a.material = this.material;
    return a
}
;
JSM.BodyPolygon = function(a) {
    this.vertices = a;
    this.curved = this.material = -1
}
;
JSM.BodyPolygon.prototype.AddVertexIndex = function(a) {
    this.vertices.push(a)
}
;
JSM.BodyPolygon.prototype.InsertVertexIndex = function(a, b) {
    this.vertices.splice(b, 0, a)
}
;
JSM.BodyPolygon.prototype.GetVertexIndex = function(a) {
    return this.vertices[a]
}
;
JSM.BodyPolygon.prototype.SetVertexIndex = function(a, b) {
    this.vertices[a] = b
}
;
JSM.BodyPolygon.prototype.GetVertexIndices = function() {
    return this.vertices
}
;
JSM.BodyPolygon.prototype.SetVertexIndices = function(a) {
    this.vertices = a
}
;
JSM.BodyPolygon.prototype.VertexIndexCount = function() {
    return this.vertices.length
}
;
JSM.BodyPolygon.prototype.HasMaterialIndex = function() {
    return -1 !== this.material
}
;
JSM.BodyPolygon.prototype.GetMaterialIndex = function() {
    return this.material
}
;
JSM.BodyPolygon.prototype.SetMaterialIndex = function(a) {
    this.material = a
}
;
JSM.BodyPolygon.prototype.HasCurveGroup = function() {
    return -1 !== this.curved
}
;
JSM.BodyPolygon.prototype.GetCurveGroup = function() {
    return this.curved
}
;
JSM.BodyPolygon.prototype.SetCurveGroup = function(a) {
    this.curved = a
}
;
JSM.BodyPolygon.prototype.ReverseVertexIndices = function() {
    this.vertices.reverse()
}
;
JSM.BodyPolygon.prototype.InheritAttributes = function(a) {
    this.material = a.material;
    this.curved = a.curved
}
;
JSM.BodyPolygon.prototype.Clone = function() {
    var a = new JSM.BodyPolygon([]), b;
    for (b = 0; b < this.vertices.length; b++)
        a.vertices.push(this.vertices[b]);
    a.material = this.material;
    a.curved = this.curved;
    return a
}
;
JSM.TextureProjectionType = {
    Planar: 0,
    Cubic: 1,
    Cylindrical: 2
};
JSM.BodyTextureProjection = function() {
    this.coords = this.type = null;
    this.SetCubic(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1))
}
;
JSM.BodyTextureProjection.prototype.GetType = function() {
    return this.type
}
;
JSM.BodyTextureProjection.prototype.GetCoords = function() {
    return this.coords
}
;
JSM.BodyTextureProjection.prototype.SetType = function(a) {
    this.type = a
}
;
JSM.BodyTextureProjection.prototype.SetCoords = function(a) {
    this.coords = a
}
;
JSM.BodyTextureProjection.prototype.SetPlanar = function(a, b, c) {
    this.type = JSM.TextureProjectionType.Planar;
    this.coords = new JSM.CoordSystem(a,b,c,new JSM.Coord(0,0,0))
}
;
JSM.BodyTextureProjection.prototype.SetCubic = function(a, b, c, d) {
    this.type = JSM.TextureProjectionType.Cubic;
    this.coords = new JSM.CoordSystem(a,b,c,d)
}
;
JSM.BodyTextureProjection.prototype.SetCylindrical = function(a, b, c, d) {
    this.type = JSM.TextureProjectionType.Cylindrical;
    this.coords = new JSM.CoordSystem(a,c.Clone().SetLength(b),JSM.VectorCross(d, c).SetLength(b),d)
}
;
JSM.BodyTextureProjection.prototype.Transform = function(a) {
    this.coords.ToAbsoluteCoords();
    this.coords.origo = a.Apply(this.coords.origo);
    this.coords.e1 = a.Apply(this.coords.e1);
    this.coords.e2 = a.Apply(this.coords.e2);
    this.coords.e3 = a.Apply(this.coords.e3);
    this.coords.ToDirectionVectors()
}
;
JSM.BodyTextureProjection.prototype.Clone = function() {
    var a = new JSM.BodyTextureProjection;
    a.SetType(this.type);
    a.SetCoords(this.coords.Clone());
    return a
}
;
JSM.Body = function() {
    this.Clear()
}
;
JSM.Body.prototype.AddVertex = function(a) {
    this.vertices.push(a);
    return this.vertices.length - 1
}
;
JSM.Body.prototype.AddPoint = function(a) {
    this.points.push(a);
    return this.points.length - 1
}
;
JSM.Body.prototype.AddLine = function(a) {
    this.lines.push(a);
    return this.lines.length - 1
}
;
JSM.Body.prototype.AddPolygon = function(a) {
    this.polygons.push(a);
    return this.polygons.length - 1
}
;
JSM.Body.prototype.GetVertex = function(a) {
    return this.vertices[a]
}
;
JSM.Body.prototype.GetVertexPosition = function(a) {
    return this.vertices[a].position
}
;
JSM.Body.prototype.SetVertexPosition = function(a, b) {
    this.vertices[a].position = b
}
;
JSM.Body.prototype.GetPoint = function(a) {
    return this.points[a]
}
;
JSM.Body.prototype.GetLine = function(a) {
    return this.lines[a]
}
;
JSM.Body.prototype.GetPolygon = function(a) {
    return this.polygons[a]
}
;
JSM.Body.prototype.SetPointsMaterialIndex = function(a) {
    var b;
    for (b = 0; b < this.points.length; b++)
        this.points[b].SetMaterialIndex(a)
}
;
JSM.Body.prototype.SetLinesMaterialIndex = function(a) {
    var b;
    for (b = 0; b < this.lines.length; b++)
        this.lines[b].SetMaterialIndex(a)
}
;
JSM.Body.prototype.SetPolygonsMaterialIndex = function(a) {
    var b;
    for (b = 0; b < this.polygons.length; b++)
        this.polygons[b].SetMaterialIndex(a)
}
;
JSM.Body.prototype.SetPolygonsCurveGroup = function(a) {
    var b;
    for (b = 0; b < this.polygons.length; b++)
        this.polygons[b].SetCurveGroup(a)
}
;
JSM.Body.prototype.RemoveVertex = function(a) {
    var b = [], c = [], d = [], e, f, g, h;
    for (e = 0; e < this.points.length; e++)
        f = this.points[e],
        f.GetVertexIndex() == a ? b.push(e) : f.GetVertexIndex() >= a && f.SetVertexIndex(f.GetVertexIndex() - 1);
    for (e = 0; e < this.lines.length; e++)
        f = this.lines[e],
        f.GetBegVertexIndex() == a || f.GetEndVertexIndex() == a ? c.push(e) : (f.GetBegVertexIndex() >= a && f.SetBegVertexIndex(f.GetBegVertexIndex() - 1),
        f.GetEndVertexIndex() >= a && f.SetEndVertexIndex(f.GetEndVertexIndex() - 1));
    for (e = 0; e < this.polygons.length; e++) {
        g = this.polygons[e];
        for (f = 0; f < g.VertexIndexCount(); f++)
            if (h = g.GetVertexIndex(f),
            g.GetVertexIndex(f) == a) {
                d.push(e);
                break
            } else
                h >= a && g.SetVertexIndex(f, h - 1)
    }
    for (e = 0; e < b.length; e++)
        this.RemovePoint(b[e] - e);
    for (e = 0; e < c.length; e++)
        this.RemoveLine(c[e] - e);
    for (e = 0; e < d.length; e++)
        this.RemovePolygon(d[e] - e);
    this.vertices.splice(a, 1)
}
;
JSM.Body.prototype.RemovePoint = function(a) {
    this.points.splice(a, 1)
}
;
JSM.Body.prototype.RemoveLine = function(a) {
    this.lines.splice(a, 1)
}
;
JSM.Body.prototype.RemovePolygon = function(a) {
    this.polygons.splice(a, 1)
}
;
JSM.Body.prototype.VertexCount = function() {
    return this.vertices.length
}
;
JSM.Body.prototype.PointCount = function() {
    return this.points.length
}
;
JSM.Body.prototype.LineCount = function() {
    return this.lines.length
}
;
JSM.Body.prototype.PolygonCount = function() {
    return this.polygons.length
}
;
JSM.Body.prototype.GetTextureProjection = function() {
    return this.projection
}
;
JSM.Body.prototype.SetTextureProjection = function(a) {
    this.projection = a
}
;
JSM.Body.prototype.SetPlanarTextureProjection = function(a, b, c) {
    this.projection.SetPlanar(a, b, c)
}
;
JSM.Body.prototype.SetCubicTextureProjection = function(a, b, c, d) {
    this.projection.SetCubic(a, b, c, d)
}
;
JSM.Body.prototype.SetCylindricalTextureProjection = function(a, b, c, d) {
    this.projection.SetCylindrical(a, b, c, d)
}
;
JSM.Body.prototype.Transform = function(a) {
    var b;
    for (b = 0; b < this.vertices.length; b++)
        this.vertices[b].position = a.Apply(this.vertices[b].position);
    this.projection.Transform(a)
}
;
JSM.Body.prototype.GetBoundingBox = function() {
    var a = new JSM.Coord(JSM.Inf,JSM.Inf,JSM.Inf), b = new JSM.Coord(-JSM.Inf,-JSM.Inf,-JSM.Inf), c, d;
    for (c = 0; c < this.vertices.length; c++)
        d = this.vertices[c].position,
        a.x = JSM.Minimum(a.x, d.x),
        a.y = JSM.Minimum(a.y, d.y),
        a.z = JSM.Minimum(a.z, d.z),
        b.x = JSM.Maximum(b.x, d.x),
        b.y = JSM.Maximum(b.y, d.y),
        b.z = JSM.Maximum(b.z, d.z);
    return new JSM.Box(a,b)
}
;
JSM.Body.prototype.GetCenter = function() {
    return this.GetBoundingBox().GetCenter()
}
;
JSM.Body.prototype.GetBoundingSphere = function() {
    var a = this.GetCenter(), b = 0, c, d;
    for (c = 0; c < this.vertices.length; c++)
        d = a.DistanceTo(this.vertices[c].position),
        JSM.IsGreater(d, b) && (b = d);
    return new JSM.Sphere(a,b)
}
;
JSM.Body.prototype.OffsetToOrigo = function() {
    var a = this.GetCenter().Clone();
    a.MultiplyScalar(-1);
    var b;
    for (b = 0; b < this.vertices.length; b++)
        this.vertices[b].position = JSM.CoordAdd(this.vertices[b].position, a)
}
;
JSM.Body.prototype.Merge = function(a) {
    var b = this.vertices.length, c, d;
    for (c = 0; c < a.VertexCount(); c++)
        this.vertices.push(a.GetVertex(c).Clone());
    for (c = 0; c < a.PointCount(); c++)
        d = a.GetPoint(c).Clone(),
        d.SetVertexIndex(d.GetVertexIndex() + b),
        this.points.push(d);
    for (c = 0; c < a.LineCount(); c++)
        d = a.GetLine(c).Clone(),
        d.SetBegVertexIndex(d.GetBegVertexIndex() + b),
        d.SetEndVertexIndex(d.GetEndVertexIndex() + b),
        this.lines.push(d);
    var e;
    for (c = 0; c < a.PolygonCount(); c++) {
        e = a.GetPolygon(c).Clone();
        for (d = 0; d < e.VertexIndexCount(); d++)
            e.vertices[d] += b;
        this.polygons.push(e)
    }
}
;
JSM.Body.prototype.Clear = function() {
    this.vertices = [];
    this.points = [];
    this.lines = [];
    this.polygons = [];
    this.projection = new JSM.BodyTextureProjection
}
;
JSM.Body.prototype.Clone = function() {
    var a = new JSM.Body, b;
    for (b = 0; b < this.vertices.length; b++)
        a.AddVertex(this.vertices[b].Clone());
    for (b = 0; b < this.points.length; b++)
        a.AddPoint(this.points[b].Clone());
    for (b = 0; b < this.lines.length; b++)
        a.AddLine(this.lines[b].Clone());
    for (b = 0; b < this.polygons.length; b++)
        a.AddPolygon(this.polygons[b].Clone());
    a.SetTextureProjection(this.projection.Clone());
    return a
}
;
JSM.Model = function() {
    this.bodies = [];
    this.materials = new JSM.MaterialSet
}
;
JSM.Model.prototype.AddBody = function(a) {
    this.bodies.push(a);
    return this.bodies.length - 1
}
;
JSM.Model.prototype.AddBodies = function(a) {
    var b, c;
    for (b = 0; b < a.length; b++)
        c = a[b],
        this.AddBody(c)
}
;
JSM.Model.prototype.GetBody = function(a) {
    return this.bodies[a]
}
;
JSM.Model.prototype.BodyCount = function() {
    return this.bodies.length
}
;
JSM.Model.prototype.AddMaterial = function(a) {
    return this.materials.AddMaterial(a)
}
;
JSM.Model.prototype.GetMaterial = function(a) {
    return this.materials.GetMaterial(a)
}
;
JSM.Model.prototype.GetDefaultMaterial = function() {
    return this.materials.GetDefaultMaterial()
}
;
JSM.Model.prototype.GetMaterialSet = function() {
    return this.materials
}
;
JSM.Model.prototype.MaterialCount = function() {
    return this.materials.Count()
}
;
JSM.Model.prototype.VertexCount = function() {
    var a = 0, b;
    for (b = 0; b < this.bodies.length; b++)
        a += this.bodies[b].VertexCount();
    return a
}
;
JSM.Model.prototype.PolygonCount = function() {
    var a = 0, b;
    for (b = 0; b < this.bodies.length; b++)
        a += this.bodies[b].PolygonCount();
    return a
}
;
JSM.VertInfo = function() {
    this.edges = [];
    this.pgons = []
}
;
JSM.EdgeInfo = function() {
    this.pgon2 = this.pgon1 = this.vert2 = this.vert1 = -1
}
;
JSM.PolyEdgeInfo = function() {
    this.index = -1;
    this.reverse = !1
}
;
JSM.PgonInfo = function() {
    this.verts = [];
    this.pedges = []
}
;
JSM.AdjacencyInfo = function(a) {
    this.pgons = this.edges = this.verts = null;
    this.Calculate(a)
}
;
JSM.AdjacencyInfo.prototype.Calculate = function(a) {
    function b(a) {
        var b = new JSM.VertInfo;
        a.verts.push(b)
    }
    function c(a, b, c) {
        function d(a, b, c, e, f) {
            var g = new JSM.PolyEdgeInfo, h, k;
            for (h = 0; h < a.edges.length; h++)
                k = a.edges[h],
                k.vert1 === c && k.vert2 === e ? (g.index = h,
                g.reverse = !1) : k.vert1 === e && k.vert2 === c && (g.index = h,
                g.reverse = !0);
            -1 === g.index ? (h = new JSM.EdgeInfo,
            h.vert1 = c,
            h.vert2 = e,
            h.pgon1 = f,
            h.pgon2 = -1,
            a.edges.push(h),
            g.index = a.edges.length - 1,
            g.reverse = !1) : (h = a.edges[g.index],
            -1 === h.pgon1 ? h.pgon1 = f : h.pgon1 !== f && -1 === h.pgon2 && (h.pgon2 = f));
            (function(a, b, c, d, e, f) {
                function g(a, b, c) {
                    -1 == a.edges.indexOf(c) && a.edges.push(c);
                    -1 == a.pgons.indexOf(b) && a.pgons.push(b)
                }
                f.verts.push(c);
                f.pedges.push(e);
                g(a.verts[c], b, e.index);
                g(a.verts[d], b, e.index)
            }
            )(a, f, c, e, g, b)
        }
        b = b.GetPolygon(c);
        var k = new JSM.PgonInfo, l, m, n, q = b.VertexIndexCount();
        for (l = 0; l < q; l++)
            m = b.GetVertexIndex(l),
            n = b.GetVertexIndex(l < q - 1 ? l + 1 : 0),
            d(a, k, m, n, c);
        a.pgons.push(k)
    }
    this.verts = [];
    this.edges = [];
    this.pgons = [];
    var d;
    for (d = 0; d < a.VertexCount(); d++)
        b(this);
    for (d = 0; d < a.PolygonCount(); d++)
        c(this, a, d)
}
;
JSM.AdjacencyInfo.prototype.IsContourVertex = function(a) {
    var b, c;
    for (b = 0; b < a.edges.length; b++)
        if (c = a.edges[b],
        this.IsContourEdge(this.edges[c]))
            return !0;
    return !1
}
;
JSM.AdjacencyInfo.prototype.IsContourEdge = function(a) {
    return 1 == this.GetEdgePolygonCount(a)
}
;
JSM.AdjacencyInfo.prototype.GetEdgePolygonCount = function(a) {
    var b = 0;
    -1 != a.pgon1 && (b += 1);
    -1 != a.pgon2 && (b += 2);
    return b
}
;
JSM.AdjacencyInfo.prototype.GetAnotherPgonOfEdge = function(a, b) {
    return -1 != a.pgon1 && a.pgon1 != b ? a.pgon1 : -1 != a.pgon2 && a.pgon2 != b ? a.pgon2 : -1
}
;
JSM.AdjacencyInfo.prototype.GetPolyEdgeStartVertex = function(a) {
    return a.reverse ? this.edges[a.index].vert2 : this.edges[a.index].vert1
}
;
JSM.AdjacencyInfo.prototype.GetPolyEdgeEndVertex = function(a) {
    return a.reverse ? this.edges[a.index].vert1 : this.edges[a.index].vert2
}
;
JSM.CalculateBodyVertexToPolygon = function(a) {
    var b = [], c, d;
    for (c = 0; c < a.VertexCount(); c++)
        b.push([]);
    var e;
    for (c = 0; c < a.PolygonCount(); c++) {
        e = a.GetPolygon(c);
        for (d = 0; d < e.VertexIndexCount(); d++)
            b[e.GetVertexIndex(d)].push(c)
    }
    return b
}
;
JSM.IsSolidBody = function(a) {
    a = new JSM.AdjacencyInfo(a);
    if (0 === a.edges.length)
        return !1;
    var b, c;
    for (b = 0; b < a.edges.length; b++)
        if (c = a.edges[b],
        -1 === c.pgon1 || -1 === c.pgon2)
            return !1;
    return !0
}
;
JSM.CheckSolidBody = function(a) {
    a = new JSM.AdjacencyInfo(a);
    var b, c, d, e, f, g, h, k;
    for (b = 0; b < a.edges.length; b++) {
        d = a.edges[b];
        if (-1 === d.pgon1 || -1 === d.pgon2)
            return !1;
        g = a.pgons[d.pgon1];
        f = !1;
        for (c = 0; c < g.pedges.length; c++)
            if (e = g.pedges[c],
            e.index == b) {
                h = e.reverse;
                f = !0;
                break
            }
        if (!f)
            return !1;
        d = a.pgons[d.pgon2];
        f = !1;
        for (c = 0; c < d.pedges.length; c++)
            if (e = d.pedges[c],
            e.index == b) {
                k = e.reverse;
                f = !0;
                break
            }
        if (!f || h == k)
            return !1
    }
    return !0
}
;
JSM.TraversePgonsAlongEdges = function(a, b, c) {
    var d = {};
    a = [a];
    for (var e; 0 < a.length; )
        if (e = a.pop(),
        !d[e] && (d[e] = !0,
        c(e)))
            for (var f = b, g = a, h = f.pgons[e], k = void 0, l = void 0, l = void 0, k = 0; k < h.pedges.length; k++)
                l = f.edges[h.pedges[k].index],
                l = f.GetAnotherPgonOfEdge(l, e),
                -1 != l && g.push(l)
}
;
JSM.AddVertexToBody = function(a, b, c, d) {
    return a.AddVertex(new JSM.BodyVertex(new JSM.Coord(b,c,d)))
}
;
JSM.AddPointToBody = function(a, b) {
    return a.AddPoint(new JSM.BodyPoint(b))
}
;
JSM.AddLineToBody = function(a, b, c) {
    return a.AddLine(new JSM.BodyLine(b,c))
}
;
JSM.AddPolygonToBody = function(a, b) {
    return a.AddPolygon(new JSM.BodyPolygon(b))
}
;
JSM.CheckBody = function(a) {
    var b = a.VertexCount(), c, d, e;
    for (c = 0; c < a.PointCount(); c++)
        if (d = a.GetPoint(c),
        0 > d.GetVertexIndex() || d.GetVertexIndex() >= b)
            return !1;
    for (c = 0; c < a.LineCount(); c++)
        if (d = a.GetLine(c),
        0 > d.GetBegVertexIndex() || d.GetBegVertexIndex() >= b || 0 > d.GetEndVertexIndex() || d.GetEndVertexIndex() >= b)
            return !1;
    for (c = 0; c < a.PolygonCount(); c++) {
        e = a.GetPolygon(c);
        if (3 > e.VertexIndexCount())
            return !1;
        for (d = 0; d < e.VertexIndexCount(); d++)
            if (0 > e.GetVertexIndex(d) || e.GetVertexIndex(d) >= b)
                return !1
    }
    return !0
}
;
JSM.CalculateBodyPolygonNormal = function(a, b) {
    var c = a.GetPolygon(b)
      , d = c.VertexIndexCount()
      , e = new JSM.Vector(0,0,0);
    if (3 <= d) {
        var f, g, h;
        for (f = 0; f < d; f++)
            g = f,
            h = (f + 1) % d,
            g = a.GetVertexPosition(c.GetVertexIndex(g)),
            h = a.GetVertexPosition(c.GetVertexIndex(h)),
            e.x += (g.y - h.y) * (g.z + h.z),
            e.y += (g.z - h.z) * (g.x + h.x),
            e.z += (g.x - h.x) * (g.y + h.y)
    }
    e.Normalize();
    return e
}
;
JSM.CalculateBodyPolygonNormals = function(a) {
    var b = [], c;
    for (c = 0; c < a.PolygonCount(); c++)
        b.push(JSM.CalculateBodyPolygonNormal(a, c));
    return b
}
;
JSM.CalculateBodyVertexNormals = function(a) {
    var b = [], c = JSM.CalculateBodyPolygonNormals(a), d = null, e, f, g, h, k, l, m, n;
    for (e = 0; e < a.PolygonCount(); e++)
        if (h = a.GetPolygon(e),
        b[e] = [],
        h.HasCurveGroup()) {
            null === d && (d = JSM.CalculateBodyVertexToPolygon(a));
            for (f = 0; f < h.VertexIndexCount(); f++) {
                k = new JSM.Vector(0,0,0);
                l = 0;
                m = d[h.GetVertexIndex(f)];
                for (g = 0; g < m.length; g++)
                    n = a.GetPolygon(m[g]),
                    n.GetCurveGroup() === h.GetCurveGroup() && (k = JSM.CoordAdd(k, c[m[g]]),
                    l++);
                k.MultiplyScalar(1 / l);
                k.Normalize();
                b[e].push(k)
            }
        } else {
            g = c[e];
            for (f = 0; f < h.VertexIndexCount(); f++)
                b[e].push(new JSM.Vector(g.x,g.y,g.z))
        }
    return b
}
;
JSM.CalculatePolygonCurveGroups = function(a, b) {
    var c = [], d = a.VertexCount(), e, f;
    for (e = 0; e < d; e++)
        c.push(0);
    for (e = 0; e < d; e++)
        f = c[a.GetPrevVertex(e)],
        a.GetVertexAngle(e) > b ? c[e] = f : c[e] = f + 1;
    f = c[0];
    d = c[d - 1];
    if (0 === f && f != d)
        for (e = 0; c[e] == f; e++)
            c[e] = d;
    return c
}
;
JSM.CalculatePolygonCentroid = function(a, b) {
    var c = a.GetPolygon(b), d = c.VertexIndexCount(), e = new JSM.Coord(0,0,0), f;
    for (f = 0; f < d; f++)
        e = JSM.CoordAdd(e, a.GetVertexPosition(c.GetVertexIndex(f)));
    e.MultiplyScalar(1 / d);
    return e
}
;
JSM.MakeBodyInsideOut = function(a) {
    var b, c;
    for (b = 0; b < a.PolygonCount(); b++)
        c = a.GetPolygon(b),
        c.ReverseVertexIndices()
}
;
JSM.SoftMoveBodyVertex = function(a, b, c, d, e) {
    b = a.GetVertexPosition(b).Clone();
    var f = JSM.GetGaussianCParameter(c, e, 0, 1E-5), g, h;
    for (g = 0; g < a.VertexCount(); g++)
        h = b.DistanceTo(a.GetVertex(g).position),
        JSM.IsGreater(h, c) || (h = JSM.GetGaussianValue(h, e, 0, f),
        a.GetVertexPosition(g).Offset(d, h))
}
;
JSM.GenerateWireBody = function(a) {
    var b = new JSM.Body, c;
    for (c = 0; c < a.VertexCount(); c++)
        b.AddVertex(a.GetVertex(c).Clone());
    a = new JSM.AdjacencyInfo(a);
    var d;
    for (c = 0; c < a.edges.length; c++)
        d = a.edges[c],
        JSM.AddLineToBody(b, d.vert1, d.vert2);
    return b
}
;
JSM.TriangulateWithCentroids = function(a) {
    var b = a.PolygonCount(), c, d, e, f, g, h, k;
    for (c = 0; c < b; c++) {
        d = JSM.CalculatePolygonCentroid(a, c);
        e = a.AddVertex(new JSM.BodyVertex(d));
        f = a.GetPolygon(c);
        g = f.VertexIndexCount();
        for (d = 0; d < g; d++)
            h = f.GetVertexIndex(d),
            k = f.GetVertexIndex(d < g - 1 ? d + 1 : 0),
            h = new JSM.BodyPolygon([h, k, e]),
            h.InheritAttributes(f),
            a.AddPolygon(h)
    }
    for (c = 0; c < b; c++)
        a.RemovePolygon(0)
}
;
JSM.TriangulatePolygons = function(a) {
    var b = a.PolygonCount(), c, d, e, f, g;
    for (c = 0; c < b; c++) {
        e = a.GetPolygon(c);
        f = new JSM.Polygon;
        for (d = 0; d < e.VertexIndexCount(); d++)
            g = a.GetVertexPosition(e.GetVertexIndex(d)),
            f.AddVertex(g.x, g.y, g.z);
        f = JSM.TriangulatePolygon(f);
        if (null !== f)
            for (d = 0; d < f.length; d++)
                g = f[d],
                g = new JSM.BodyPolygon([e.GetVertexIndex(g[0]), e.GetVertexIndex(g[1]), e.GetVertexIndex(g[2])]),
                g.InheritAttributes(e),
                a.AddPolygon(g)
    }
    for (c = 0; c < b; c++)
        a.RemovePolygon(0)
}
;
JSM.GenerateRandomMaterials = function(a, b, c) {
    function d(a, b) {
        var c = 0;
        return c = void 0 !== a && a ? JSM.SeededRandomInt(0, 16777215, b + 1) : JSM.RandomInt(0, 16777215)
    }
    var e, f, g = 0;
    for (e = 0; e < a.LineCount(); e++)
        f = d(c, g++),
        f = b.AddMaterial(new JSM.Material({
            ambient: f,
            diffuse: f
        })),
        a.GetLine(e).SetMaterialIndex(f);
    for (e = 0; e < a.PointCount(); e++)
        f = d(c, g++),
        f = b.AddMaterial(new JSM.Material({
            ambient: f,
            diffuse: f
        })),
        a.GetPoint(e).SetMaterialIndex(f);
    for (e = 0; e < a.PolygonCount(); e++)
        f = d(c, g++),
        f = b.AddMaterial(new JSM.Material({
            ambient: f,
            diffuse: f
        })),
        a.GetPolygon(e).SetMaterialIndex(f)
}
;
JSM.AddBodyToBSPTree = function(a, b, c) {
    var d, e, f;
    for (d = 0; d < a.PolygonCount(); d++) {
        f = {
            id: c,
            originalPolygon: d,
            material: -1
        };
        e = a;
        var g = f
          , h = e.GetPolygon(d);
        g.material = h.GetMaterialIndex();
        for (var g = new JSM.Polygon, k = void 0, l = void 0, k = 0; k < h.VertexIndexCount(); k++)
            l = e.GetVertexPosition(h.GetVertexIndex(k)),
            g.AddVertex(l.x, l.y, l.z);
        e = g;
        b.AddPolygon(e, f)
    }
}
;
JSM.CalculatePlanarTextureCoord = function(a, b) {
    var c = new JSM.Coord2D(0,0)
      , d = b.e1.Clone().Normalize()
      , e = b.e2.Clone().Normalize()
      , f = JSM.VectorCross(b.e1, b.e2)
      , f = JSM.GetPlaneFromCoordAndDirection(b.origo, f)
      , e = JSM.GetPlaneFromCoordAndDirection(b.origo, e)
      , d = JSM.GetPlaneFromCoordAndDirection(b.origo, d)
      , f = f.ProjectCoord(a);
    c.x = d.CoordSignedDistance(f);
    c.y = e.CoordSignedDistance(f);
    return c
}
;
JSM.CalculateCubicTextureCoord = function(a, b, c) {
    var d = new JSM.Coord2D(0,0), e = c.e1.Clone().Normalize(), f = c.e2.Clone().Normalize(), g = c.e3.Clone().Normalize(), h = -1, k = 0, l, m, n;
    for (l = 0; 3 > l; l++)
        0 === l ? m = e : 1 === l ? m = f : 2 === l && (m = g),
        n = Math.abs(JSM.VectorDot(b, m)),
        JSM.IsGreater(n, k) && (h = l,
        k = n);
    if (-1 === h)
        return d;
    b = null;
    0 === h ? b = new JSM.CoordSystem(c.origo,f,g,new JSM.Coord(0,0,0)) : 1 === h ? b = new JSM.CoordSystem(c.origo,e,g,new JSM.Coord(0,0,0)) : 2 === h && (b = new JSM.CoordSystem(c.origo,e,f,new JSM.Coord(0,0,0)));
    return null === b ? d : JSM.CalculatePlanarTextureCoord(a, b)
}
;
JSM.CalculateCylindricalTextureCoord = function(a, b, c) {
    var d = new JSM.Coord2D(0,0)
      , e = c.e3.Clone().Normalize();
    if (e.IsCollinearWith(b))
        return d = JSM.CalculateCubicTextureCoord(a, b, c),
        [d, 0];
    var f = (new JSM.Line(c.origo,e)).ProjectCoord(a);
    b = JSM.CoordSignedDistance(c.origo, f, e);
    var g = c.e1.Clone().Normalize();
    a = JSM.CoordSub(a, f);
    e = JSM.GetVectorsFullAngle(a, g, e);
    c = c.e1.Length();
    d.x = e * c;
    d.y = b;
    return [d, e]
}
;
JSM.CalculatePolygonPlanarTextureCoords = function(a, b) {
    var c = [], d = a.GetPolygon(b), e = a.GetTextureProjection().GetCoords(), f, g;
    for (f = 0; f < d.VertexIndexCount(); f++)
        g = a.GetVertexPosition(d.GetVertexIndex(f)),
        c.push(JSM.CalculatePlanarTextureCoord(g, e));
    return c
}
;
JSM.CalculatePolygonCubicTextureCoords = function(a, b, c) {
    var d = [];
    b = a.GetPolygon(b);
    var e = a.GetTextureProjection().GetCoords(), f, g;
    for (f = 0; f < b.VertexIndexCount(); f++)
        g = a.GetVertexPosition(b.GetVertexIndex(f)),
        d.push(JSM.CalculateCubicTextureCoord(g, c, e));
    return d
}
;
JSM.CalculatePolygonCylindricalTextureCoords = function(a, b, c) {
    var d = [], e = [], f = a.GetPolygon(b), g = a.GetTextureProjection().GetCoords(), h;
    for (b = 0; b < f.VertexIndexCount(); b++)
        h = a.GetVertexPosition(f.GetVertexIndex(b)),
        h = JSM.CalculateCylindricalTextureCoord(h, c, g),
        d.push(h[0]),
        e.push(h[1]);
    if (g.e3.Clone().Normalize().IsCollinearWith(c))
        return d;
    c = !1;
    for (b = 0; b < e.length; b++) {
        for (a = b + 1; a < e.length; a++)
            if (JSM.IsGreater(Math.abs(e[b] - e[a]), Math.PI)) {
                c = !0;
                break
            }
        if (c)
            break
    }
    if (c) {
        g = g.e1.Length();
        for (b = 0; b < e.length; b++)
            JSM.IsLower(e[b], Math.PI) && (d[b].x = g * (e[b] + 2 * Math.PI))
    }
    return d
}
;
JSM.CalculateBodyPlanarTextureCoords = function(a) {
    var b = [], c;
    for (c = 0; c < a.PolygonCount(); c++)
        b.push(JSM.CalculatePolygonPlanarTextureCoords(a, c));
    return b
}
;
JSM.CalculateBodyCubicTextureCoords = function(a) {
    var b = [], c = JSM.CalculateBodyPolygonNormals(a), d, e;
    for (d = 0; d < a.PolygonCount(); d++)
        e = c[d],
        b.push(JSM.CalculatePolygonCubicTextureCoords(a, d, e));
    return b
}
;
JSM.CalculateBodyCylindricalTextureCoords = function(a) {
    var b = [], c = JSM.CalculateBodyPolygonNormals(a), d, e;
    for (d = 0; d < a.PolygonCount(); d++)
        e = c[d],
        b.push(JSM.CalculatePolygonCylindricalTextureCoords(a, d, e));
    return b
}
;
JSM.CalculateBodyTextureCoords = function(a) {
    var b = []
      , c = a.GetTextureProjection().GetType();
    c === JSM.TextureProjectionType.Planar ? b = JSM.CalculateBodyPlanarTextureCoords(a) : c === JSM.TextureProjectionType.Cubic ? b = JSM.CalculateBodyCubicTextureCoords(a) : c === JSM.TextureProjectionType.Cylindrical && (b = JSM.CalculateBodyCylindricalTextureCoords(a));
    return b
}
;
JSM.CutBodyByPlane = function(a, b) {
    function c(a, b, c) {
        function d(a, b, c, e) {
            c.push(new JSM.Coord(b.x,b.y,b.z));
            e.push(a)
        }
        function e(c, d, f, g) {
            d = JSM.CoordSub(a[d], a[c]).Normalize();
            c = new JSM.Line(a[c],d);
            c = b.LineIntersection(c);
            f.push(new JSM.Coord(c.x,c.y,c.z));
            g.push(-1)
        }
        var f = void 0 !== c && null !== c, g = a.length, h = [], k = [], l = !1, m, n, p;
        for (m = 0; m < g; m++)
            p = a[m],
            n = b.CoordPosition(p),
            k.push(n !== JSM.CoordPlanePosition.CoordAtBackOfPlane),
            0 < m && k[m - 1] !== k[m] && (l = !0);
        if (!l) {
            if (!1 === k[0])
                return h;
            for (m = 0; m < g; m++)
                p = a[m],
                h.push(new JSM.Coord(p.x,p.y,p.z)),
                f && c.push(m);
            return h
        }
        l = [];
        n = [];
        var q, s;
        for (m = 0; m < g; m++)
            q = m - 1,
            s = m,
            0 === m && (q = g - 1),
            p = a[s],
            k[s] ? (k[q] || e(q, s, l, n),
            d(s, p, l, n)) : k[q] && e(q, s, l, n);
        for (m = 0; m < l.length; m++)
            g = l[m],
            k = h[h.length - 1],
            0 === m || !k.IsEqual(g) ? (h.push(new JSM.Coord(g.x,g.y,g.z)),
            f && (g = n[m],
            c.push(g))) : f && (g = n[m],
            k = n[m - 1],
            -1 !== g ? c[c.length - 1] = g : -1 !== k && (c[c.length - 1] = k));
        return h
    }
    function d(a, b, c) {
        for (var d = -1; c < a.VertexCount(); c++)
            if (b.IsEqual(a.GetVertexPosition(c))) {
                d = c;
                break
            }
        -1 === d && (d = a.AddVertex(new JSM.BodyVertex(new JSM.Coord(b.x,b.y,b.z))));
        return d
    }
    var e = new JSM.Body, f = [], g = [], h = [], k = [], l, m, n, q, p;
    for (l = 0; l < a.PolygonCount(); l++) {
        n = a.GetPolygon(l);
        q = [];
        for (m = 0; m < n.VertexIndexCount(); m++)
            p = a.GetVertexPosition(n.GetVertexIndex(m)),
            q.push(new JSM.Coord(p.x,p.y,p.z));
        p = [];
        q = c(q, b, p);
        for (m = 0; m < p.length; m++)
            -1 !== p[m] && (h[n.GetVertexIndex(p[m])] = !0);
        f.push(q);
        g.push(p)
    }
    var r;
    for (l = 0; l < a.VertexCount(); l++)
        h[l] && (r = a.GetVertexPosition(l),
        k[l] = e.AddVertex(new JSM.BodyVertex(new JSM.Coord(r.x,r.y,r.z))));
    var h = e.VertexCount(), s;
    for (l = 0; l < a.PolygonCount(); l++)
        if (n = a.GetPolygon(l),
        q = f[l],
        p = g[l],
        0 !== p.length) {
            s = [];
            for (m = 0; m < p.length; m++)
                -1 !== p[m] ? s.push(k[n.GetVertexIndex(p[m])]) : (r = q[m],
                s.push(d(e, r, h)));
            m = new JSM.BodyPolygon(s);
            m.InheritAttributes(n);
            e.AddPolygon(m)
        }
    return e
}
;
JSM.GenerateRectangle = function(a, b) {
    var c = new JSM.Body
      , d = a / 2
      , e = b / 2;
    c.AddVertex(new JSM.BodyVertex(new JSM.Coord(-d,-e,0)));
    c.AddVertex(new JSM.BodyVertex(new JSM.Coord(d,-e,0)));
    c.AddVertex(new JSM.BodyVertex(new JSM.Coord(d,e,0)));
    c.AddVertex(new JSM.BodyVertex(new JSM.Coord(-d,e,0)));
    c.AddPolygon(new JSM.BodyPolygon([0, 1, 2, 3]));
    c.SetCubicTextureProjection(new JSM.Coord(-d,-e,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return c
}
;
JSM.GenerateCuboid = function(a, b, c) {
    var d = new JSM.Body;
    a /= 2;
    b /= 2;
    c /= 2;
    d.AddVertex(new JSM.BodyVertex(new JSM.Coord(-a,-b,-c)));
    d.AddVertex(new JSM.BodyVertex(new JSM.Coord(a,-b,-c)));
    d.AddVertex(new JSM.BodyVertex(new JSM.Coord(a,-b,c)));
    d.AddVertex(new JSM.BodyVertex(new JSM.Coord(-a,-b,c)));
    d.AddVertex(new JSM.BodyVertex(new JSM.Coord(-a,b,-c)));
    d.AddVertex(new JSM.BodyVertex(new JSM.Coord(a,b,-c)));
    d.AddVertex(new JSM.BodyVertex(new JSM.Coord(a,b,c)));
    d.AddVertex(new JSM.BodyVertex(new JSM.Coord(-a,b,c)));
    d.AddPolygon(new JSM.BodyPolygon([0, 1, 2, 3]));
    d.AddPolygon(new JSM.BodyPolygon([1, 5, 6, 2]));
    d.AddPolygon(new JSM.BodyPolygon([5, 4, 7, 6]));
    d.AddPolygon(new JSM.BodyPolygon([4, 0, 3, 7]));
    d.AddPolygon(new JSM.BodyPolygon([0, 4, 5, 1]));
    d.AddPolygon(new JSM.BodyPolygon([3, 2, 6, 7]));
    d.SetCubicTextureProjection(new JSM.Coord(-a,-b,-c), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return d
}
;
JSM.GenerateCuboidSides = function(a, b, c, d) {
    var e = new JSM.Body;
    a /= 2;
    b /= 2;
    c /= 2;
    e.AddVertex(new JSM.BodyVertex(new JSM.Coord(-a,-b,-c)));
    e.AddVertex(new JSM.BodyVertex(new JSM.Coord(a,-b,-c)));
    e.AddVertex(new JSM.BodyVertex(new JSM.Coord(a,-b,c)));
    e.AddVertex(new JSM.BodyVertex(new JSM.Coord(-a,-b,c)));
    e.AddVertex(new JSM.BodyVertex(new JSM.Coord(-a,b,-c)));
    e.AddVertex(new JSM.BodyVertex(new JSM.Coord(a,b,-c)));
    e.AddVertex(new JSM.BodyVertex(new JSM.Coord(a,b,c)));
    e.AddVertex(new JSM.BodyVertex(new JSM.Coord(-a,b,c)));
    d[0] && e.AddPolygon(new JSM.BodyPolygon([0, 1, 2, 3]));
    d[1] && e.AddPolygon(new JSM.BodyPolygon([1, 5, 6, 2]));
    d[2] && e.AddPolygon(new JSM.BodyPolygon([5, 4, 7, 6]));
    d[3] && e.AddPolygon(new JSM.BodyPolygon([4, 0, 3, 7]));
    d[4] && e.AddPolygon(new JSM.BodyPolygon([0, 4, 5, 1]));
    d[5] && e.AddPolygon(new JSM.BodyPolygon([3, 2, 6, 7]));
    e.SetCubicTextureProjection(new JSM.Coord(-a,-b,-c), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return e
}
;
JSM.GenerateSegmentedRectangle = function(a, b, c, d) {
    var e = new JSM.Body
      , f = a / 2
      , g = b / 2
      , h = a / c
      , k = b / d;
    (function() {
        var a, b, n;
        for (a = 0; a <= d; a++)
            for (b = 0; b <= c; b++)
                n = new JSM.Coord(b * h - f,a * k - g,0),
                e.AddVertex(new JSM.BodyVertex(n))
    }
    )();
    (function() {
        var a, b, f, g, h, k;
        for (b = 0; b < d; b++)
            for (a = 0; a < c; a++)
                f = b * (c + 1) + a,
                g = f + 1,
                h = f + c + 1,
                k = h + 1,
                e.AddPolygon(new JSM.BodyPolygon([f, g, k, h]))
    }
    )();
    return e
}
;
JSM.GenerateSegmentedCuboid = function(a, b, c, d) {
    function e(a) {
        var b = 0;
        0 < a && a <= d && (b = (d + 1) * (d + 1) + (a - 1) * 4 * d);
        return b
    }
    function f(a) {
        var b = []
          , c = e(a);
        if (0 === a || a === d) {
            for (a = 0; a <= d; a++)
                b.push(c + a);
            for (a = 1; a <= d; a++)
                b.push(c + (a + 1) * d + a);
            for (a = d - 1; 0 <= a; a--)
                b.push(c + (d + 1) * d + a);
            for (a = d - 1; 0 < a; a--)
                b.push(c + a * (d + 1))
        } else if (0 < a && a < d) {
            for (a = 0; a <= d; a++)
                b.push(c + a);
            for (a = 1; a < d; a++)
                b.push(c + d + 2 * a);
            for (a = d; 0 <= a; a--)
                b.push(c + 3 * d + a - 1);
            for (a = d - 1; 0 < a; a--)
                b.push(c + d + 2 * a - 1)
        }
        return b
    }
    function g(a) {
        var b, c, e = a * r;
        if (0 === a || a === d)
            for (a = 0; a <= d; a++)
                for (b = 0; b <= d; b++)
                    c = new JSM.Coord(b * q - l,a * p - m,e - n),
                    k.AddVertex(new JSM.BodyVertex(c));
        else if (0 < a && a < d)
            for (a = 0; a <= d; a++)
                for (b = 0; b <= d; b++)
                    if (0 === a || a === d || 0 === b || b === d)
                        c = new JSM.Coord(b * q - l,a * p - m,e - n),
                        k.AddVertex(new JSM.BodyVertex(c))
    }
    function h(a) {
        var b, c, f, g, h, l;
        if (0 === a || a === d) {
            var m = e(a);
            for (b = 0; b < d; b++)
                for (c = 0; c < d; c++)
                    f = m + b * (d + 1) + c,
                    g = f + 1,
                    h = f + d + 1,
                    l = h + 1,
                    0 === a ? k.AddPolygon(new JSM.BodyPolygon([f, h, l, g])) : k.AddPolygon(new JSM.BodyPolygon([f, g, l, h]))
        }
        if (0 < a && a <= d) {
            c = s[a - 1];
            a = s[a];
            for (b = 0; b < 4 * d; b++)
                f = c[b],
                h = a[b],
                b < 4 * d - 1 ? (g = c[b + 1],
                l = a[b + 1]) : (g = c[0],
                l = a[0]),
                k.AddPolygon(new JSM.BodyPolygon([f, g, l, h]))
        }
    }
    var k = new JSM.Body
      , l = a / 2
      , m = b / 2
      , n = c / 2
      , q = a / d
      , p = b / d
      , r = c / d;
    for (a = 0; a <= d; a++)
        g(a);
    var s = [];
    for (a = 0; a <= d; a++)
        s.push(f(a));
    for (a = 0; a <= d; a++)
        h(a);
    return k
}
;
JSM.GenerateCircle = function(a, b) {
    var c = new JSM.Body, d = JSM.GenerateCirclePoints(a, b), e;
    for (e = 0; e < d.length; e++)
        c.AddVertex(new JSM.BodyVertex(d[e]));
    d = new JSM.BodyPolygon([]);
    for (e = 0; e < b; e++)
        d.AddVertexIndex(e);
    c.AddPolygon(d);
    c.SetCylindricalTextureProjection(new JSM.Coord(0,0,0), a, new JSM.Coord(1,0,0), new JSM.Coord(0,0,1));
    return c
}
;
JSM.GenerateSphere = function(a, b, c) {
    var d = new JSM.Body, e = 2 * b, f = d.AddVertex(new JSM.BodyVertex(JSM.SphericalToCartesian(a, 0, 0))), g = Math.PI / b, h = g, k, l, m;
    for (k = 1; k < b; k++) {
        for (l = m = 0; l < e; l++)
            d.AddVertex(new JSM.BodyVertex(JSM.SphericalToCartesian(a, h, m))),
            m += g;
        h += g
    }
    a = d.AddVertex(new JSM.BodyVertex(JSM.SphericalToCartesian(-a, 0, 0)));
    var n, q;
    for (k = 1; k <= b; k++)
        if (1 === k) {
            g = 1;
            for (l = 0; l < e; l++)
                h = g + l,
                m = h + 1,
                l === e - 1 && (m = g),
                h = new JSM.BodyPolygon([h, m, f]),
                c && h.SetCurveGroup(0),
                d.AddPolygon(h)
        } else if (k < b) {
            g = (k - 1) * e + 1;
            for (l = 0; l < e; l++)
                h = g + l,
                m = h + 1,
                n = h - e,
                q = n + 1,
                l === e - 1 && (m = g,
                q = g - e),
                h = new JSM.BodyPolygon([h, m, q, n]),
                c && h.SetCurveGroup(0),
                d.AddPolygon(h)
        } else if (k === b) {
            g = (k - 2) * e + 1;
            for (l = 0; l < e; l++)
                h = g + l,
                m = h + 1,
                l === e - 1 && (m = g),
                h = new JSM.BodyPolygon([h, a, m]),
                c && h.SetCurveGroup(0),
                d.AddPolygon(h)
        }
    d.SetCubicTextureProjection(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return d
}
;
JSM.GenerateTriangulatedSphere = function(a, b, c) {
    var d;
    d = new JSM.Body;
    var e = (1 + Math.sqrt(5)) / 2;
    JSM.AddVertexToBody(d, 0, 1, +e);
    JSM.AddVertexToBody(d, 0, 1, -e);
    JSM.AddVertexToBody(d, 0, -1, +e);
    JSM.AddVertexToBody(d, 0, -1, -e);
    JSM.AddVertexToBody(d, 1, +e, 0);
    JSM.AddVertexToBody(d, 1, -e, 0);
    JSM.AddVertexToBody(d, -1, +e, 0);
    JSM.AddVertexToBody(d, -1, -e, 0);
    JSM.AddVertexToBody(d, +e, 0, 1);
    JSM.AddVertexToBody(d, -e, 0, 1);
    JSM.AddVertexToBody(d, +e, 0, -1);
    JSM.AddVertexToBody(d, -e, 0, -1);
    JSM.AddPolygonToBody(d, [0, 2, 8]);
    JSM.AddPolygonToBody(d, [0, 4, 6]);
    JSM.AddPolygonToBody(d, [0, 6, 9]);
    JSM.AddPolygonToBody(d, [0, 8, 4]);
    JSM.AddPolygonToBody(d, [0, 9, 2]);
    JSM.AddPolygonToBody(d, [1, 3, 11]);
    JSM.AddPolygonToBody(d, [1, 4, 10]);
    JSM.AddPolygonToBody(d, [1, 6, 4]);
    JSM.AddPolygonToBody(d, [1, 10, 3]);
    JSM.AddPolygonToBody(d, [1, 11, 6]);
    JSM.AddPolygonToBody(d, [2, 5, 8]);
    JSM.AddPolygonToBody(d, [2, 7, 5]);
    JSM.AddPolygonToBody(d, [2, 9, 7]);
    JSM.AddPolygonToBody(d, [3, 5, 7]);
    JSM.AddPolygonToBody(d, [3, 7, 11]);
    JSM.AddPolygonToBody(d, [3, 10, 5]);
    JSM.AddPolygonToBody(d, [4, 8, 10]);
    JSM.AddPolygonToBody(d, [6, 11, 9]);
    JSM.AddPolygonToBody(d, [5, 10, 8]);
    JSM.AddPolygonToBody(d, [7, 9, 11]);
    for (var e = d.GetVertexPosition(0).Length(), f = a / e, g, h, e = 0; e < d.VertexCount(); e++)
        h = d.GetVertex(e),
        h.position.MultiplyScalar(f);
    for (var k, l, m, n, f = 0; f < b; f++) {
        g = d;
        d = new JSM.Body;
        h = new JSM.AdjacencyInfo(g);
        for (e = 0; e < h.verts.length; e++)
            k = g.GetVertexPosition(e),
            JSM.AddVertexToBody(d, k.x, k.y, k.z);
        k = [];
        for (e = 0; e < h.edges.length; e++)
            l = h.edges[e],
            l = JSM.MidCoord(g.GetVertexPosition(l.vert1), g.GetVertexPosition(l.vert2)),
            k.push(d.AddVertex(new JSM.BodyVertex(l.SetLength(a))));
        for (e = 0; e < h.pgons.length; e++) {
            l = h.pgons[e];
            m = [];
            for (g = 0; g < l.pedges.length; g++)
                n = l.pedges[g],
                m.push(h.GetPolyEdgeStartVertex(n)),
                m.push(k[n.index]);
            JSM.AddPolygonToBody(d, [m[0], m[1], m[5]]);
            JSM.AddPolygonToBody(d, [m[1], m[2], m[3]]);
            JSM.AddPolygonToBody(d, [m[3], m[4], m[5]]);
            JSM.AddPolygonToBody(d, [m[1], m[3], m[5]])
        }
    }
    if (c)
        for (e = 0; e < d.PolygonCount(); e++)
            d.GetPolygon(e).SetCurveGroup(0);
    d.SetCubicTextureProjection(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return d
}
;
JSM.GenerateCylinder = function(a, b, c, d, e) {
    var f = new JSM.Body, g = 2 * Math.PI, h = 2 * Math.PI / c, k;
    for (k = 0; k < c; k++)
        f.AddVertex(new JSM.BodyVertex(JSM.CylindricalToCartesian(a, b / 2, g))),
        f.AddVertex(new JSM.BodyVertex(JSM.CylindricalToCartesian(a, -b / 2, g))),
        g -= h;
    for (k = 0; k < c; k++)
        g = 2 * k,
        h = g + 2,
        k === c - 1 && (h = 0),
        g = new JSM.BodyPolygon([g, h, h + 1, g + 1]),
        e && g.SetCurveGroup(0),
        f.AddPolygon(g);
    if (d) {
        d = new JSM.BodyPolygon([]);
        e = new JSM.BodyPolygon([]);
        for (k = 0; k < c; k++)
            d.AddVertexIndex(2 * (c - k - 1)),
            e.AddVertexIndex(2 * k + 1);
        f.AddPolygon(d);
        f.AddPolygon(e)
    }
    f.SetCylindricalTextureProjection(new JSM.Coord(0,0,-(b / 2)), a, new JSM.Coord(1,0,0), new JSM.Coord(0,0,1));
    return f
}
;
JSM.GeneratePie = function(a, b, c, d, e, f) {
    var g = new JSM.Body
      , h = c
      , k = c / (d - 1);
    g.AddVertex(new JSM.BodyVertex(JSM.CylindricalToCartesian(0, b / 2, 0)));
    g.AddVertex(new JSM.BodyVertex(JSM.CylindricalToCartesian(0, -b / 2, 0)));
    for (c = 0; c < d; c++)
        g.AddVertex(new JSM.BodyVertex(JSM.CylindricalToCartesian(a, b / 2, h))),
        g.AddVertex(new JSM.BodyVertex(JSM.CylindricalToCartesian(a, -b / 2, h))),
        h -= k;
    for (c = 0; c <= d; c++)
        h = 2 * c,
        k = h + 2,
        c === d && (k = 0),
        h = new JSM.BodyPolygon([h, k, k + 1, h + 1]),
        f && (0 < c && c < d) && h.SetCurveGroup(0),
        g.AddPolygon(h);
    if (e) {
        e = new JSM.BodyPolygon([]);
        f = new JSM.BodyPolygon([]);
        for (c = 0; c <= d; c++)
            e.AddVertexIndex(2 * (d - c)),
            f.AddVertexIndex(2 * c + 1);
        g.AddPolygon(e);
        g.AddPolygon(f)
    }
    g.SetCylindricalTextureProjection(new JSM.Coord(0,0,-(b / 2)), a, new JSM.Coord(1,0,0), new JSM.Coord(0,0,1));
    return g
}
;
JSM.GenerateCone = function(a, b, c, d, e, f) {
    var g = new JSM.Body
      , h = JSM.IsZero(a)
      , k = JSM.IsZero(b)
      , l = 2 * Math.PI
      , m = 2 * Math.PI / d;
    h && g.AddVertex(new JSM.BodyVertex(JSM.CylindricalToCartesian(0, c / 2, 0)));
    var n;
    for (n = 0; n < d; n++)
        h || g.AddVertex(new JSM.BodyVertex(JSM.CylindricalToCartesian(a, c / 2, l))),
        k || g.AddVertex(new JSM.BodyVertex(JSM.CylindricalToCartesian(b, -c / 2, l))),
        l -= m;
    k && g.AddVertex(new JSM.BodyVertex(JSM.CylindricalToCartesian(0, -c / 2, 0)));
    for (n = 0; n < d; n++)
        h ? (l = n + 1,
        m = l + 1,
        n === d - 1 && (m = 1),
        l = new JSM.BodyPolygon([0, m, l])) : k ? (l = n,
        m = l + 1,
        n === d - 1 && (m = 0),
        l = new JSM.BodyPolygon([l, m, d])) : (l = 2 * n,
        m = l + 2,
        n === d - 1 && (m = 0),
        l = new JSM.BodyPolygon([l, m, m + 1, l + 1])),
        f && l.SetCurveGroup(0),
        g.AddPolygon(l);
    if (e)
        if (h) {
            f = new JSM.BodyPolygon([]);
            for (n = 0; n < d; n++)
                f.AddVertexIndex(n + 1);
            g.AddPolygon(f)
        } else if (k) {
            e = new JSM.BodyPolygon([]);
            for (n = 0; n < d; n++)
                e.AddVertexIndex(d - n - 1);
            g.AddPolygon(e)
        } else {
            e = new JSM.BodyPolygon([]);
            f = new JSM.BodyPolygon([]);
            for (n = 0; n < d; n++)
                e.AddVertexIndex(2 * (d - n - 1)),
                f.AddVertexIndex(2 * n + 1);
            g.AddPolygon(e);
            g.AddPolygon(f)
        }
    g.SetCylindricalTextureProjection(new JSM.Coord(0,0,-(c / 2)), (a + b) / 2, new JSM.Coord(1,0,0), new JSM.Coord(0,0,1));
    return g
}
;
JSM.GeneratePrismGeometry = function(a, b, c) {
    var d = new JSM.Body, e = a.length, f;
    for (f = 0; f < e; f++)
        d.AddVertex(new JSM.BodyVertex(a[f].Clone())),
        d.AddVertex(new JSM.BodyVertex(b[f].Clone()));
    for (f = 0; f < e; f++)
        a = 2 * f,
        b = a + 2,
        f === e - 1 && (b = 0),
        a = new JSM.BodyPolygon([a, b, b + 1, a + 1]),
        d.AddPolygon(a);
    if (c) {
        c = new JSM.BodyPolygon([]);
        a = new JSM.BodyPolygon([]);
        for (f = 0; f < e; f++)
            c.AddVertexIndex(2 * f + 1),
            a.AddVertexIndex(2 * (e - f - 1));
        d.AddPolygon(c);
        d.AddPolygon(a)
    }
    return d
}
;
JSM.GeneratePrismFromPolygon = function(a, b, c, d) {
    var e = [], f = [], g, h, k = a.VertexCount();
    for (g = 0; g < k; g++)
        h = a.GetVertex(g),
        e.push(new JSM.Coord(h.x,h.y,0)),
        f.push(new JSM.Coord(h.x,h.y,b));
    b = JSM.GeneratePrismGeometry(e, f, c);
    if (void 0 !== d && null !== d) {
        a = JSM.CalculatePolygonCurveGroups(a, d);
        for (g = 0; g < k; g++)
            d = b.GetPolygon(g),
            d.SetCurveGroup(a[g])
    }
    g = e[0].Clone();
    e = e[1].Clone();
    k = JSM.CoordSub(e, g).Normalize();
    e = new JSM.Vector(0,0,1);
    k = JSM.VectorCross(e, k);
    a = JSM.VectorCross(k, e);
    b.SetCubicTextureProjection(g, a, k, e);
    return b
}
;
JSM.GeneratePrism = function(a, b, c, d, e) {
    var f = new JSM.Polygon;
    f.FromArray(a);
    a = f.VertexCount();
    var g = [], h = [], k;
    for (k = 0; k < a; k++)
        g.push(f.GetVertex(k).Clone()),
        h.push(f.GetVertex(k).Clone().Offset(b, c));
    c = JSM.GeneratePrismGeometry(g, h, d);
    if (void 0 !== e && null !== e) {
        e = JSM.CalculatePolygonCurveGroups(f, e);
        for (k = 0; k < a; k++)
            d = c.GetPolygon(k),
            d.SetCurveGroup(e[k])
    }
    a = f.GetVertex(0).Clone();
    f = f.GetVertex(1).Clone();
    f = JSM.CoordSub(f, a).Normalize();
    b = b.Clone().Normalize();
    f = JSM.VectorCross(b, f);
    k = JSM.VectorCross(f, b);
    c.SetCubicTextureProjection(a, k, f, b);
    return c
}
;
JSM.GeneratePrismWithHole = function(a, b, c, d, e) {
    function f(a, b) {
        var c = []
          , d = a.ToContourPolygon2D()
          , d = JSM.ConvertContourPolygonToPolygon2D(d, c);
        if (null !== d && (d = JSM.TriangulatePolygon2D(d),
        null !== d)) {
            var e, f, h, k, u, t;
            for (e = 0; e < d.length; e++) {
                h = d[e];
                u = new JSM.BodyPolygon([]);
                t = new JSM.BodyPolygon([]);
                for (f = 0; 3 > f; f++)
                    k = c[h[f]],
                    u.AddVertexIndex(2 * b[k[0]] + 2 * k[1] + 1),
                    k = c[h[2 - f]],
                    t.AddVertexIndex(2 * b[k[0]] + 2 * k[1]);
                g.AddPolygon(u);
                g.AddPolygon(t)
            }
        }
    }
    var g = new JSM.Body
      , h = []
      , k = new JSM.ContourPolygon;
    k.FromArray(a);
    (function(a, b, c, d) {
        var e, f, g, h, k;
        for (e = 0; e < a.ContourCount(); e++) {
            g = a.GetContour(e);
            for (f = 0; f < g.VertexCount(); f++)
                h = g.GetVertex(f).Clone(),
                k = g.GetVertex(f).Clone().Offset(b, c),
                d.AddVertex(new JSM.BodyVertex(h)),
                d.AddVertex(new JSM.BodyVertex(k))
        }
    }
    )(k, b, c, g);
    (function(a, b, c, d) {
        var e = 0, f, g, h, k, t, y;
        for (f = 0; f < a.ContourCount(); f++) {
            g = a.GetContour(f);
            y = null;
            void 0 !== c && null !== c && (y = JSM.CalculatePolygonCurveGroups(g, c));
            h = g.VertexCount();
            b.push(e);
            for (g = 0; g < h; g++)
                k = 2 * e + 2 * g,
                t = k + 2,
                g == h - 1 && (t = 2 * e),
                k = new JSM.BodyPolygon([k, t, t + 1, k + 1]),
                null !== y && k.SetCurveGroup(y[g]),
                d.AddPolygon(k);
            e += h
        }
    }
    )(k, h, e, g);
    d && f(k, h);
    c = JSM.CoordSub(a[1], a[0]).Normalize();
    a = new JSM.Coord(a[0].x,a[0].y,a[0].z);
    b = b.Clone().Normalize();
    c = JSM.VectorCross(b, c);
    d = JSM.VectorCross(c, b);
    g.SetCubicTextureProjection(a, d, c, b);
    return g
}
;
JSM.GeneratePrismsFromPath2D = function(a, b, c, d) {
    function e(a) {
        var b = [], c, d, e, f;
        for (c = 0; c < a.ContourCount(); c++) {
            e = a.GetContour(c);
            for (d = 0; d < e.VertexCount(); d++)
                f = e.GetVertex(d),
                b.push(new JSM.Coord(f.x,f.y,0));
            c < a.ContourCount() - 1 && b.push(null)
        }
        return b
    }
    var f = [];
    a = a.GetPolygons();
    var g = new JSM.Vector(0,0,1), h, k;
    for (h = 0; h < a.length; h++)
        k = a[h],
        1 === k.ContourCount() ? f.push(JSM.GeneratePrism(e(k), g, b, c, d)) : 1 < k.ContourCount() && f.push(JSM.GeneratePrismWithHole(e(k), g, b, c, d));
    return f
}
;
JSM.GeneratePrismShell = function(a, b, c, d, e) {
    var f = new JSM.Body, g = a.length, h;
    for (h = 0; h < g; h++)
        f.AddVertex(new JSM.BodyVertex(a[h]));
    h = new JSM.Polygon;
    h.vertices = a;
    d = JSM.OffsetPolygonContour(h, d).vertices;
    for (h = 0; h < g; h++)
        f.AddVertex(new JSM.BodyVertex(d[h]));
    var k;
    for (h = 0; h < g; h++)
        k = a[h].Clone().Offset(b, c),
        f.AddVertex(new JSM.BodyVertex(k));
    for (h = 0; h < g; h++)
        k = d[h].Clone().Offset(b, c),
        f.AddVertex(new JSM.BodyVertex(k));
    var l;
    for (h = 0; h < g; h++)
        c = h,
        d = c + 1,
        k = c + 2 * g,
        l = k + 1,
        h === g - 1 && (d = 0,
        l = 2 * g),
        f.AddPolygon(new JSM.BodyPolygon([c, d, l, k])),
        f.AddPolygon(new JSM.BodyPolygon([c + g, k + g, l + g, d + g]));
    if (e)
        for (h = 0; h < g; h++)
            c = h,
            d = c + 1,
            k = h + g,
            l = k + 1,
            h === g - 1 && (d = 0,
            l = g),
            f.AddPolygon(new JSM.BodyPolygon([c, k, l, d])),
            f.AddPolygon(new JSM.BodyPolygon([c + 2 * g, d + 2 * g, l + 2 * g, k + 2 * g]));
    e = JSM.CoordSub(a[1], a[0]).Normalize();
    a = new JSM.Coord(a[0].x,a[0].y,a[0].z);
    b = b.Clone().Normalize();
    e = JSM.VectorCross(b, e);
    g = JSM.VectorCross(e, b);
    f.SetCubicTextureProjection(a, g, e, b);
    return f
}
;
JSM.GenerateCylinderShell = function(a, b, c, d, e, f) {
    for (var g = new JSM.Vector(0,0,1), h = -b / 2, k = [], l = 2 * Math.PI / d, m, n = 0, n = 0; n < d; n++)
        m = n * l,
        m = JSM.PolarToCartesian(a, m),
        k.push(new JSM.Coord(m.x,m.y,h));
    a = JSM.GeneratePrismShell(k, g, b, c, e);
    if (f)
        for (f = 0; f < d; f++)
            a.GetPolygon(2 * f).SetCurveGroup(0),
            a.GetPolygon(2 * f + 1).SetCurveGroup(0);
    return a
}
;
JSM.GenerateLineShell = function(a, b, c, d, e, f) {
    var g = new JSM.Body, h = a.length, k = [], l, m, n, q, p, r;
    for (l = 0; l < h; l++)
        0 === l || l === h - 1 ? p = Math.PI / 2 : (m = l - 1,
        n = l,
        q = l + 1,
        r = JSM.CoordSub(a[q], a[n]),
        p = JSM.CoordSub(a[m], a[n]),
        p = r.AngleTo(p) / 2,
        JSM.CoordOrientation(a[m], a[n], a[q], b) == JSM.Orientation.Clockwise && (p = Math.PI - p)),
        k.push(p);
    r = new JSM.Vector(0,0,1);
    m = [];
    var s, v;
    for (l = 0; l < h; l++)
        n = l,
        l === h - 1 ? v = JSM.CoordSub(a[n - 1], a[n]) : (q = (l + 1) % h,
        v = JSM.CoordSub(a[n], a[q])),
        p = k[n],
        q = d / Math.sin(p),
        s = a[n].Clone(),
        s.Offset(v, q),
        s.Rotate(r, -(Math.PI - p), a[n]),
        m.push(s);
    for (l = 0; l < h; l++)
        g.AddVertex(new JSM.BodyVertex(a[l]));
    for (l = 0; l < h; l++)
        g.AddVertex(new JSM.BodyVertex(m[l]));
    for (l = 0; l < h; l++)
        n = a[l].Clone().Offset(b, c),
        g.AddVertex(new JSM.BodyVertex(n));
    for (l = 0; l < h; l++)
        n = m[l].Clone().Offset(b, c),
        g.AddVertex(new JSM.BodyVertex(n));
    for (l = 0; l < h - 1; l++)
        n = l,
        q = n + 1,
        c = n + 2 * h,
        d = c + 1,
        g.AddPolygon(new JSM.BodyPolygon([n, q, d, c])),
        g.AddPolygon(new JSM.BodyPolygon([n + h, c + h, d + h, q + h]));
    e && (n = 0,
    g.AddPolygon(new JSM.BodyPolygon([n, n + 2 * h, n + 3 * h, n + h])),
    n = h - 1,
    g.AddPolygon(new JSM.BodyPolygon([n, n + h, n + 3 * h, n + 2 * h])));
    if (f)
        for (l = 0; l < h - 1; l++)
            n = l,
            q = n + 1,
            c = l + h,
            d = c + 1,
            g.AddPolygon(new JSM.BodyPolygon([n, c, d, q])),
            g.AddPolygon(new JSM.BodyPolygon([n + 2 * h, q + 2 * h, d + 2 * h, c + 2 * h]));
    e = JSM.CoordSub(a[1], a[0]).Normalize();
    a = new JSM.Coord(a[0].x,a[0].y,a[0].z);
    b = b.Clone().Normalize();
    e = JSM.VectorCross(b, e);
    f = JSM.VectorCross(e, b);
    g.SetCubicTextureProjection(a, f, e, b);
    return g
}
;
JSM.GenerateTorus = function(a, b, c, d, e) {
    var f = new JSM.Body, g = 0, h = 2 * Math.PI / d, k = [], l, m;
    for (l = 0; l < d; l++)
        m = JSM.PolarToCartesian(b, g),
        m = new JSM.Coord(m.x + a,0,m.y),
        k.push(m),
        g += h;
    b = new JSM.Coord(0,0,1);
    g = new JSM.Coord(0,0,0);
    h = 2 * Math.PI / c;
    for (l = 0; l < c; l++)
        for (a = 0; a < d; a++)
            m = k[a].Clone().Rotate(b, l * h, g),
            f.AddVertex(new JSM.BodyVertex(m));
    for (l = 0; l < c; l++) {
        new JSM.BodyPolygon([]);
        for (a = 0; a < d; a++)
            h = l * d + a,
            b = h + d,
            k = h + 1,
            g = b + 1,
            a === d - 1 && (k = l * d,
            g = (l + 1) * d),
            l === c - 1 && (b = a,
            g = a + 1,
            a === d - 1 && (g = 0)),
            h = new JSM.BodyPolygon([h, b, g, k]),
            e && h.SetCurveGroup(0),
            f.AddPolygon(h)
    }
    f.SetCubicTextureProjection(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return f
}
;
JSM.GeneratePolyTorus = function(a, b, c, d) {
    var e = new JSM.Body, f = a.length, g = 2 * Math.PI / f, h = [], k;
    for (k = 0; k < f; k++)
        g = a[k],
        g = new JSM.Coord(g.x + b,0,g.y),
        h.push(g);
    b = new JSM.Coord(0,0,1);
    var l = new JSM.Coord(0,0,0), g = 2 * Math.PI / c, m;
    for (k = 0; k < c; k++)
        for (a = 0; a < f; a++)
            m = h[a].Clone().Rotate(b, k * g, l),
            e.AddVertex(new JSM.BodyVertex(m));
    for (k = 0; k < c; k++) {
        new JSM.BodyPolygon([]);
        for (a = 0; a < f; a++)
            h = k * f + a,
            b = h + f,
            g = h + 1,
            l = b + 1,
            a === f - 1 && (g = k * f,
            l = (k + 1) * f),
            k === c - 1 && (b = a,
            l = a + 1,
            a === f - 1 && (l = 0)),
            h = new JSM.BodyPolygon([h, b, l, g]),
            d && h.SetCurveGroup(a),
            e.AddPolygon(h)
    }
    e.SetCubicTextureProjection(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return e
}
;
JSM.GenerateRuledFromSectors = function(a, b, c, d, e) {
    var f = new JSM.Body;
    a = JSM.GetSectorSegmentation(a, c);
    var g = JSM.GetSectorSegmentation(b, c);
    c = [];
    b = [];
    JSM.GetRuledMesh(a, g, d, c, b);
    for (d = 0; d < c.length; d++)
        f.AddVertex(new JSM.BodyVertex(c[d]));
    for (d = 0; d < b.length; d++)
        a = b[d],
        a = new JSM.BodyPolygon(a),
        e && a.SetCurveGroup(0),
        f.AddPolygon(a);
    f.SetCubicTextureProjection(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return f
}
;
JSM.GenerateGrid = function(a, b, c, d, e) {
    var f = new JSM.Sector(new JSM.Coord(0,0,0),new JSM.Coord(a,0,0));
    a = new JSM.Sector(new JSM.Coord(0,b,0),new JSM.Coord(a,b,0));
    return JSM.GenerateRuledFromSectors(f, a, c, d, e)
}
;
JSM.GenerateSquareGrid = function(a, b, c) {
    return JSM.GenerateGrid(a, a, b, b, c)
}
;
JSM.GenerateRuledFromSectorsWithHeight = function(a, b, c, d, e, f) {
    var g = new JSM.Body;
    a = JSM.GetSectorSegmentation(a, c);
    b = JSM.GetSectorSegmentation(b, c);
    var h = []
      , k = [];
    JSM.GetRuledMesh(a, b, d, h, k);
    for (a = 0; a < h.length; a++)
        g.AddVertex(new JSM.BodyVertex(h[a]));
    var l;
    for (a = 0; a < k.length; a++)
        l = k[a],
        l = new JSM.BodyPolygon(l),
        e && l.SetCurveGroup(0),
        g.AddPolygon(l);
    b = g.VertexCount();
    for (a = 0; a < h.length; a++)
        l = h[a],
        l = new JSM.Coord(l.x,l.y,l.z),
        l.z -= f,
        g.AddVertex(new JSM.BodyVertex(l));
    for (a = 0; a < k.length; a++) {
        l = k[a];
        h = [];
        for (f = l.length - 1; 0 <= f; f--)
            h.push(l[f] + b);
        l = new JSM.BodyPolygon(h);
        e && l.SetCurveGroup(0);
        g.AddPolygon(l)
    }
    for (a = 0; a < d; a++)
        e = a + b,
        f = e + 1,
        k = e - b,
        h = k + 1,
        l = new JSM.BodyPolygon([e, f, h, k]),
        g.AddPolygon(l);
    for (a = 0; a < d; a++)
        e = a + c * (d + 1) + b,
        f = e + 1,
        k = e - b,
        h = k + 1,
        l = new JSM.BodyPolygon([e, k, h, f]),
        g.AddPolygon(l);
    for (a = 0; a < c; a++)
        e = a * (d + 1) + b,
        f = e + d + 1,
        k = e - b,
        h = k + d + 1,
        l = new JSM.BodyPolygon([e, k, h, f]),
        g.AddPolygon(l);
    for (a = 0; a < c; a++)
        e = (a + 1) * d + a + b,
        f = e + d + 1,
        k = e - b,
        h = k + d + 1,
        l = new JSM.BodyPolygon([e, f, h, k]),
        g.AddPolygon(l);
    g.SetCubicTextureProjection(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return g
}
;
JSM.GenerateRuledFromCoords = function(a, b, c, d) {
    var e = new JSM.Body
      , f = []
      , g = [];
    JSM.GetRuledMesh(a, b, c, f, g);
    for (a = 0; a < f.length; a++)
        e.AddVertex(new JSM.BodyVertex(f[a]));
    for (a = 0; a < g.length; a++)
        f = g[a],
        f = new JSM.BodyPolygon(f),
        d && f.SetCurveGroup(0),
        e.AddPolygon(f);
    e.SetCubicTextureProjection(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return e
}
;
JSM.GenerateRevolved = function(a, b, c, d, e, f) {
    var g = new JSM.Body
      , h = JSM.IsEqual(c, 2 * Math.PI)
      , k = a.length
      , l = c / d;
    c = JSM.CoordSub(b.end, b.beg);
    var m, n, q;
    for (m = 0; m < k; m++)
        for (n = 0; n <= d; n++)
            h && n === d || (q = a[m].Clone().Rotate(c, n * l, b.beg),
            g.AddVertex(new JSM.BodyVertex(q)));
    l = 0;
    "CurveSegments" == f ? l = 1 : "CurveAll" == f && (l = 2);
    var p, r;
    for (m = 0; m < k - 1; m++)
        for (n = 0; n < d; n++)
            f = m * (d + 1) + n,
            q = f + d + 1,
            p = f + 1,
            r = q + 1,
            h && (f = m * d + n,
            q = f + d,
            p = f + 1,
            r = q + 1,
            n === d - 1 && (p = m * d,
            r = (m + 1) * d)),
            f = new JSM.BodyPolygon([f, p, r, q]),
            1 == l ? f.SetCurveGroup(m) : 2 == l && f.SetCurveGroup(0),
            g.AddPolygon(f);
    if (h && e) {
        e = new JSM.BodyPolygon([]);
        h = new JSM.BodyPolygon([]);
        for (m = 0; m < d; m++)
            e.AddVertexIndex(d * (k - 1) + m),
            h.AddVertexIndex(d - m - 1);
        g.AddPolygon(e);
        g.AddPolygon(h)
    }
    d = c.Clone().Normalize();
    h = new JSM.Line(b.beg,d);
    for (m = e = 0; m < k; m++)
        n = h.ProjectCoord(a[m]),
        e += n.DistanceTo(a[m]);
    e /= k;
    b = new JSM.Coord(b.beg.x,b.beg.y,b.beg.z);
    k = (new JSM.Line(b,c)).ProjectCoord(a[0]);
    a = JSM.CoordSub(a[0], k).Normalize();
    g.SetCylindricalTextureProjection(b, e, a, d);
    return g
}
;
JSM.GenerateTube = function(a, b) {
    var c = new JSM.Body, d = a.length, e = a[0].length, f, g;
    for (g = 0; g < e; g++)
        for (f = 0; f < d; f++)
            c.AddVertex(new JSM.BodyVertex(a[f][g]));
    var h, k;
    for (g = 0; g < d - 1; g++)
        for (f = 0; f < e; f++)
            h = g + d * f,
            k = h + d,
            f === e - 1 && (k = g),
            c.AddPolygon(new JSM.BodyPolygon([h, k, k + 1, h + 1]));
    if (b) {
        g = new JSM.BodyPolygon([]);
        h = new JSM.BodyPolygon([]);
        for (f = 0; f < e; f++)
            g.AddVertexIndex(d * f + d - 1);
        for (f = e - 1; 0 <= f; f--)
            h.AddVertexIndex(d * f);
        c.AddPolygon(g);
        c.AddPolygon(h)
    }
    c.SetCubicTextureProjection(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return c
}
;
JSM.GenerateFunctionSurface = function(a, b, c, d, e) {
    var f = new JSM.Sector(new JSM.Coord(b.x,b.y,0),new JSM.Coord(c.x,b.y,0));
    b = new JSM.Sector(new JSM.Coord(b.x,c.y,0),new JSM.Coord(c.x,c.y,0));
    d = JSM.GenerateRuledFromSectors(f, b, d, d, e);
    for (e = 0; e < d.VertexCount(); e++)
        f = d.GetVertexPosition(e),
        f.z = a(f.x, f.y);
    d.SetCubicTextureProjection(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return d
}
;
JSM.GenerateFunctionSurfaceSolid = function(a, b, c, d, e, f) {
    var g = new JSM.Sector(new JSM.Coord(c.x,b.y,0),new JSM.Coord(b.x,b.y,0));
    b = new JSM.Sector(new JSM.Coord(c.x,c.y,0),new JSM.Coord(b.x,c.y,0));
    e = JSM.GenerateRuledFromSectorsWithHeight(g, b, d, d, e, f);
    g = (d + 1) * (d + 1);
    for (d = 0; d < g; d++)
        f = e.GetVertexPosition(d),
        f.z = a(f.x, f.y);
    e.SetCubicTextureProjection(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return e
}
;
JSM.Camera = function(a, b, c, d, e, f) {
    this.eye = JSM.ValueOrDefault(a, new JSM.Coord(1,1,1));
    this.center = JSM.ValueOrDefault(b, new JSM.Coord(0,0,0));
    this.up = JSM.ValueOrDefault(c, new JSM.Vector(0,0,1));
    this.fieldOfView = JSM.ValueOrDefault(d, 45);
    this.nearClippingPlane = JSM.ValueOrDefault(e, 0.1);
    this.farClippingPlane = JSM.ValueOrDefault(f, 1E3)
}
;
JSM.Camera.prototype.Set = function(a, b, c, d, e, f) {
    this.eye = a;
    this.center = b;
    this.up = c;
    this.fieldOfView = JSM.ValueOrDefault(d, 45);
    this.nearClippingPlane = JSM.ValueOrDefault(e, 0.1);
    this.farClippingPlane = JSM.ValueOrDefault(f, 1E3)
}
;
JSM.Camera.prototype.Clone = function() {
    var a = new JSM.Camera;
    a.eye = this.eye;
    a.center = this.center;
    a.up = this.up;
    a.fieldOfView = this.fieldOfView;
    a.nearClippingPlane = this.nearClippingPlane;
    a.farClippingPlane = this.farClippingPlane;
    return a
}
;
JSM.ExplodeBody = function(a, b, c) {
    function d(a, b, c, d) {
        var k;
        for (k = 0; k < a.Count(); k++)
            b.push([]);
        a = d.itemCount();
        var l;
        for (k = 0; k < a; k++)
            l = d.getMaterial(k),
            -1 !== l ? b[l].push(k) : c.push(k)
    }
    if (void 0 === c || null === c)
        return !1;
    if (void 0 === b || null === b)
        b = new JSM.MaterialSet;
    (function(a, b, c) {
        function h(c, d, g) {
            if (0 !== c.length) {
                d = b.GetMaterial(d);
                if (void 0 !== g.onPointGeometryStart && null !== g.onPointGeometryStart)
                    g.onPointGeometryStart(d);
                if (void 0 !== g.onPoint && null !== g.onPoint) {
                    var h, k;
                    for (h = 0; h < c.length; h++)
                        k = a.GetPoint(c[h]),
                        k = a.GetVertexPosition(k.GetVertexIndex()),
                        g.onPoint(k)
                }
                if (void 0 !== g.onPointGeometryEnd && null !== g.onPointGeometryEnd)
                    g.onPointGeometryEnd(d)
            }
        }
        if (0 !== a.PointCount()) {
            var k = []
              , l = [];
            d(b, k, l, {
                itemCount: function() {
                    return a.PointCount()
                },
                getMaterial: function(b) {
                    return a.GetPoint(b).GetMaterialIndex()
                }
            });
            var m;
            for (m = 0; m < k.length; m++)
                h(k[m], m, c);
            h(l, -1, c)
        }
    }
    )(a, b, c);
    (function(a, b, c) {
        function h(c, d, g) {
            if (0 !== c.length) {
                d = b.GetMaterial(d);
                if (void 0 !== g.onLineGeometryStart && null !== g.onLineGeometryStart)
                    g.onLineGeometryStart(d);
                if (void 0 !== g.onLine && null !== g.onLine) {
                    var h, k, l;
                    for (h = 0; h < c.length; h++)
                        k = a.GetLine(c[h]),
                        l = a.GetVertexPosition(k.GetBegVertexIndex()),
                        k = a.GetVertexPosition(k.GetEndVertexIndex()),
                        g.onLine(l, k)
                }
                if (void 0 !== g.onLineGeometryEnd && null !== g.onLineGeometryEnd)
                    g.onLineGeometryEnd(d)
            }
        }
        if (0 !== a.LineCount()) {
            var k = []
              , l = [];
            d(b, k, l, {
                itemCount: function() {
                    return a.LineCount()
                },
                getMaterial: function(b) {
                    return a.GetLine(b).GetMaterialIndex()
                }
            });
            var m;
            for (m = 0; m < k.length; m++)
                h(k[m], m, c);
            h(l, -1, c)
        }
    }
    )(a, b, c);
    (function(a, b, c) {
        function h(a, b) {
            var c = JSM.CalculateBodyVertexNormals(a), d, e;
            e = !1;
            if (void 0 !== b && null !== b)
                for (d = 0; d < b.Count(); d++)
                    if (null !== b.GetMaterial(d).texture) {
                        e = !0;
                        break
                    }
            var f = null, g;
            if (e) {
                f = JSM.CalculateBodyTextureCoords(a);
                for (d = 0; d < f.length; d++)
                    if (e = a.GetPolygon(d),
                    e.HasMaterialIndex()) {
                        g = b.GetMaterial(e.GetMaterialIndex());
                        for (e = 0; e < f[d].length; e++)
                            f[d][e].x /= g.textureWidth,
                            f[d][e].y /= -g.textureHeight
                    }
            }
            return {
                vertexNormals: c,
                textureCoords: f
            }
        }
        function k(c, d, g, h) {
            if (0 !== c.length) {
                d = b.GetMaterial(d);
                if (void 0 !== h.onGeometryStart && null !== h.onGeometryStart)
                    h.onGeometryStart(d);
                var k;
                for (k = 0; k < c.length; k++) {
                    var l = c[k]
                      , m = g
                      , n = h
                      , q = a.GetPolygon(l)
                      , w = q.VertexIndexCount();
                    if (3 > w)
                        JSM.Message("Invalid polygon found.");
                    else {
                        var x = void 0
                          , A = void 0
                          , E = void 0
                          , G = void 0
                          , H = void 0
                          , z = void 0
                          , D = void 0
                          , K = void 0
                          , L = void 0
                          , x = !1;
                        void 0 !== n.hasConvexPolygons && null !== n.hasConvexPolygons && (x = n.hasConvexPolygons);
                        var F = void 0;
                        if (3 == w || x)
                            for (F = 0; F < w - 2; F++) {
                                if (x = a.GetVertexPosition(q.GetVertexIndex(0)),
                                A = a.GetVertexPosition(q.GetVertexIndex((F + 1) % w)),
                                E = a.GetVertexPosition(q.GetVertexIndex((F + 2) % w)),
                                G = m.vertexNormals[l][0],
                                H = m.vertexNormals[l][(F + 1) % w],
                                z = m.vertexNormals[l][(F + 2) % w],
                                L = K = D = null,
                                null !== m.textureCoords && (D = m.textureCoords[l][0],
                                K = m.textureCoords[l][(F + 1) % w],
                                L = m.textureCoords[l][(F + 2) % w]),
                                void 0 !== n.onTriangle && null !== n.onTriangle)
                                    n.onTriangle(x, A, E, G, H, z, D, K, L)
                            }
                        else {
                            x = new JSM.Polygon;
                            A = void 0;
                            for (F = 0; F < w; F++)
                                A = a.GetVertexPosition(q.vertices[F]),
                                x.AddVertex(A.x, A.y, A.z);
                            F = JSM.CalculateBodyPolygonNormal(a, l);
                            w = JSM.TriangulatePolygon(x, F);
                            if (null !== w)
                                for (var J = void 0, F = 0; F < w.length; F++) {
                                    if (J = w[F],
                                    x = a.GetVertexPosition(q.GetVertexIndex(J[0])),
                                    A = a.GetVertexPosition(q.GetVertexIndex(J[1])),
                                    E = a.GetVertexPosition(q.GetVertexIndex(J[2])),
                                    G = m.vertexNormals[l][J[0]],
                                    H = m.vertexNormals[l][J[1]],
                                    z = m.vertexNormals[l][J[2]],
                                    L = K = D = null,
                                    null !== m.textureCoords && (D = m.textureCoords[l][J[0]],
                                    K = m.textureCoords[l][J[1]],
                                    L = m.textureCoords[l][J[2]]),
                                    void 0 !== n.onTriangle && null !== n.onTriangle)
                                        n.onTriangle(x, A, E, G, H, z, D, K, L)
                                }
                            else
                                JSM.Message("Triangulation failed.")
                        }
                    }
                }
                if (void 0 !== h.onGeometryEnd && null !== h.onGeometryEnd)
                    h.onGeometryEnd(d)
            }
        }
        if (0 !== a.PolygonCount()) {
            var l = []
              , m = [];
            d(b, l, m, {
                itemCount: function() {
                    return a.PolygonCount()
                },
                getMaterial: function(b) {
                    return a.GetPolygon(b).GetMaterialIndex()
                }
            });
            var n = h(a, b), q;
            for (q = 0; q < l.length; q++)
                k(l[q], q, n, c);
            k(m, -1, n, c)
        }
    }
    )(a, b, c);
    return !0
}
;
JSM.ExportBodyContentToStl = function(a, b, c) {
    function d(a) {
        g += a + "\n"
    }
    function e(a, b, c, e) {
        d("\tfacet normal " + a.x + " " + a.y + " " + a.z);
        d("\t\touter loop");
        d("\t\t\tvertex " + b.x + " " + b.y + " " + b.z);
        d("\t\t\tvertex " + c.x + " " + c.y + " " + c.z);
        d("\t\t\tvertex " + e.x + " " + e.y + " " + e.z);
        d("\t\tendloop");
        d("\tendfacet")
    }
    function f(b) {
        var d = a.GetPolygon(b)
          , f = d.VertexIndexCount();
        if (!(3 > f)) {
            var g, n, q, p = null;
            if (3 === f)
                p = JSM.CalculateBodyPolygonNormal(a, b),
                g = a.GetVertex(d.GetVertexIndex(0)).position,
                n = a.GetVertex(d.GetVertexIndex(1)).position,
                q = a.GetVertex(d.GetVertexIndex(2)).position,
                e(p, g, n, q);
            else if (g = !0,
            void 0 !== c && c && (g = !1),
            p = JSM.CalculateBodyPolygonNormal(a, b),
            g) {
                g = new JSM.Polygon;
                for (b = 0; b < f; b++)
                    n = a.GetVertex(d.vertices[b]),
                    g.AddVertex(n.position.x, n.position.y, n.position.z);
                f = JSM.TriangulatePolygon(g, p);
                if (null !== f)
                    for (b = 0; b < f.length; b++)
                        q = f[b],
                        g = a.GetVertex(d.GetVertexIndex(q[0])).position,
                        n = a.GetVertex(d.GetVertexIndex(q[1])).position,
                        q = a.GetVertex(d.GetVertexIndex(q[2])).position,
                        e(p, g, n, q)
            } else
                for (b = 0; b < f - 2; b++)
                    g = a.GetVertex(d.GetVertexIndex(0)).position,
                    n = a.GetVertex(d.GetVertexIndex((b + 1) % f)).position,
                    q = a.GetVertex(d.GetVertexIndex((b + 2) % f)).position,
                    e(p, g, n, q)
        }
    }
    var g = "";
    for (b = 0; b < a.PolygonCount(); b++)
        f(b);
    return g
}
;
JSM.ExportBodyToStl = function(a, b, c) {
    a = "" + ("solid " + b + "\n") + JSM.ExportBodyContentToStl(a, b, c);
    return a += "endsolid " + b + "\n"
}
;
JSM.ExportModelToStl = function(a, b, c) {
    var d;
    d = "" + ("solid " + b + "\n");
    var e, f;
    for (e = 0; e < a.BodyCount(); e++)
        f = a.GetBody(e),
        d += JSM.ExportBodyContentToStl(f, b + (e + 1).toString(), c);
    return d + ("endsolid " + b + "\n")
}
;
JSM.ExportBodyContentToObj = function(a, b, c) {
    function d(b) {
        b = a.GetVertex(b).position;
        g += "v " + b.x + " " + b.y + " " + b.z + "\n"
    }
    function e(b) {
        b = JSM.CalculateBodyPolygonNormal(a, b);
        g += "vn " + b.x + " " + b.y + " " + b.z + "\n"
    }
    function f(d) {
        var e = a.GetPolygon(d);
        g += "f ";
        var f;
        for (f = 0; f < e.VertexIndexCount(); f++) {
            var h = b + e.GetVertexIndex(f) + 1 + "//" + (c + d + 1) + " ";
            g += h
        }
        g += "\n"
    }
    var g = "", h;
    for (h = 0; h < a.VertexCount(); h++)
        d(h);
    for (h = 0; h < a.PolygonCount(); h++)
        e(h);
    for (h = 0; h < a.PolygonCount(); h++)
        f(h);
    return g
}
;
JSM.ExportBodyToObj = function(a) {
    return JSM.ExportBodyContentToObj(a, 0, 0)
}
;
JSM.ExportModelToObj = function(a) {
    var b = "", c = 0, d = 0, e, f;
    for (e = 0; e < a.BodyCount(); e++)
        f = a.GetBody(e),
        b += JSM.ExportBodyContentToObj(f, c, d),
        c += f.VertexCount(),
        d += f.PolygonCount();
    return b
}
;
JSM.ExportMaterialsToGdl = function(a) {
    function b(a, b) {
        var d = JSM.HexColorToRGBComponents(a.diffuse);
        c += 'define material "material' + b + '" 2, ' + (d[0] / 255 + "," + d[1] / 255 + "," + d[2] / 255) + " ! " + b + "\n"
    }
    var c = ""
      , d = !1;
    void 0 !== a && null !== a && (d = !0);
    if (d) {
        b(a.GetDefaultMaterial(), 1);
        for (d = 0; d < a.Count(); d++)
            b(a.GetMaterial(d), d + 2)
    }
    return c
}
;
JSM.ExportBodyGeometryToGdl = function(a, b) {
    function c(a) {
        if (200 < a.length) {
            var b = 0, c, d;
            for (c = 0; c < a.length; c++)
                d = a[c],
                h += d,
                b++,
                200 < b && "," == d && (h += "\n",
                b = 0)
        } else
            h += a
    }
    function d(a) {
        c(a + "\n")
    }
    function e(b) {
        var c = a.GetVertex(b).position;
        d("vert " + c.x + ", " + c.y + ", " + c.z + " ! " + (b + 1))
    }
    function f(b, c) {
        var e = b.edges[c]
          , f = 0;
        -1 != e.pgon1 && -1 != e.pgon2 && a.GetPolygon(e.pgon1).HasCurveGroup() && a.GetPolygon(e.pgon2).HasCurveGroup() && a.GetPolygon(e.pgon1).GetCurveGroup() == a.GetPolygon(e.pgon2).GetCurveGroup() && (f = 2);
        d("edge " + (e.vert1 + 1) + ", " + (e.vert2 + 1) + ", -1, -1, " + f + " ! " + (c + 1))
    }
    function g(e, f, g) {
        var h = -1;
        b && (h = a.GetPolygon(f).GetMaterialIndex() + 2,
        h != g && d('set material "material' + h + '"'));
        e = e.pgons[f];
        g = 0;
        a.GetPolygon(f).HasCurveGroup() && (g = 2);
        c("pgon " + e.pedges.length + ", 0, " + g + ", ");
        g = "";
        var k, l;
        for (k = 0; k < e.pedges.length; k++)
            l = e.pedges[k],
            g = l.reverse ? g + -(l.index + 1) : g + (l.index + 1),
            k < e.pedges.length - 1 && (g += ", ");
        c(g);
        c(" ! " + (f + 1));
        d("");
        return h
    }
    var h = "";
    d("base");
    var k = new JSM.AdjacencyInfo(a), l;
    for (l = 0; l < k.verts.length; l++)
        e(l);
    for (l = 0; l < k.edges.length; l++)
        f(k, l);
    var m = -1;
    for (l = 0; l < k.pgons.length; l++)
        m = g(k, l, m);
    d("body -1");
    return h
}
;
JSM.ExportBodyToGdl = function(a, b) {
    var c = ""
      , d = !1;
    void 0 !== b && null !== b && (c += JSM.ExportMaterialsToGdl(b),
    d = !0);
    return c += JSM.ExportBodyGeometryToGdl(a, d)
}
;
JSM.ExportModelToGdl = function(a, b) {
    var c = ""
      , d = !1;
    void 0 !== b && null !== b && (c += JSM.ExportMaterialsToGdl(b),
    d = !0);
    var e, f;
    for (e = 0; e < a.BodyCount(); e++)
        f = a.GetBody(e),
        c += JSM.ExportBodyGeometryToGdl(f, d);
    return c
}
;
JSM.TriangleBody = function(a) {
    this.name = a;
    this.vertices = [];
    this.normals = [];
    this.uvs = [];
    this.triangles = [];
    this.defaultUVIndex = -1
}
;
JSM.TriangleBody.prototype.SetName = function(a) {
    this.name = a
}
;
JSM.TriangleBody.prototype.GetName = function() {
    return this.name
}
;
JSM.TriangleBody.prototype.AddVertex = function(a, b, c) {
    this.vertices.push(new JSM.Coord(a,b,c));
    return this.vertices.length - 1
}
;
JSM.TriangleBody.prototype.GetVertex = function(a) {
    return this.vertices[a]
}
;
JSM.TriangleBody.prototype.SetVertex = function(a, b, c, d) {
    this.vertices[a] = new JSM.Coord(b,c,d)
}
;
JSM.TriangleBody.prototype.VertexCount = function() {
    return this.vertices.length
}
;
JSM.TriangleBody.prototype.AddNormal = function(a, b, c) {
    this.normals.push(new JSM.Vector(a,b,c));
    return this.normals.length - 1
}
;
JSM.TriangleBody.prototype.GetNormal = function(a) {
    return this.normals[a]
}
;
JSM.TriangleBody.prototype.GetTriangleNormal = function(a, b) {
    var c = null
      , d = this.triangles[a];
    if (-1 == d.curve)
        c = this.GetNormal(d.n0);
    else
        var c = this.GetVertex(d.v0)
          , e = this.GetVertex(d.v1)
          , f = this.GetVertex(d.v2)
          , g = this.GetNormal(d.n0)
          , h = this.GetNormal(d.n1)
          , d = this.GetNormal(d.n2)
          , c = JSM.BarycentricInterpolation(c, e, f, g, h, d, b);
    return c
}
;
JSM.TriangleBody.prototype.NormalCount = function() {
    return this.normals.length
}
;
JSM.TriangleBody.prototype.AddUV = function(a, b) {
    this.uvs.push(new JSM.Coord2D(a,b));
    return this.uvs.length - 1
}
;
JSM.TriangleBody.prototype.AddDefaultUV = function() {
    return -1 != this.defaultUVIndex ? this.defaultUVIndex : this.defaultUVIndex = this.AddUV(0, 0)
}
;
JSM.TriangleBody.prototype.GetUV = function(a) {
    return this.uvs[a]
}
;
JSM.TriangleBody.prototype.UVCount = function() {
    return this.uvs.length
}
;
JSM.TriangleBody.prototype.AddTriangle = function(a, b, c, d, e, f, g, h, k, l, m) {
    this.triangles.push({
        v0: a,
        v1: b,
        v2: c,
        n0: d,
        n1: e,
        n2: f,
        u0: g,
        u1: h,
        u2: k,
        mat: l,
        curve: m
    });
    return this.triangles.length - 1
}
;
JSM.TriangleBody.prototype.GetTriangle = function(a) {
    return this.triangles[a]
}
;
JSM.TriangleBody.prototype.TriangleCount = function() {
    return this.triangles.length
}
;
JSM.TriangleBody.prototype.GetBoundingBox = function() {
    var a = new JSM.Coord(JSM.Inf,JSM.Inf,JSM.Inf), b = new JSM.Coord(-JSM.Inf,-JSM.Inf,-JSM.Inf), c, d;
    for (c = 0; c < this.vertices.length; c++)
        d = this.vertices[c],
        a.x = JSM.Minimum(a.x, d.x),
        a.y = JSM.Minimum(a.y, d.y),
        a.z = JSM.Minimum(a.z, d.z),
        b.x = JSM.Maximum(b.x, d.x),
        b.y = JSM.Maximum(b.y, d.y),
        b.z = JSM.Maximum(b.z, d.z);
    return new JSM.Box(a,b)
}
;
JSM.TriangleBody.prototype.GetCenter = function() {
    return this.GetBoundingBox().GetCenter()
}
;
JSM.TriangleBody.prototype.GetBoundingSphere = function() {
    var a = this.GetCenter(), b = 0, c, d;
    for (c = 0; c < this.vertices.length; c++)
        d = a.DistanceTo(this.vertices[c]),
        JSM.IsGreater(d, b) && (b = d);
    return new JSM.Sphere(a,b)
}
;
JSM.TriangleBody.prototype.Finalize = function(a) {
    function b(b, c, d, e) {
        function f(a, b, c, d, e) {
            var g = new JSM.Vector(0,0,0)
              , h = 0;
            c = a.GetTriangle(c);
            b = e[b];
            var k, l;
            for (e = 0; e < b.length; e++)
                k = b[e],
                l = a.GetTriangle(k),
                c.curve == l.curve && (g = JSM.CoordAdd(g, d[k]),
                h += 1);
            g.MultiplyScalar(1 / h);
            g.Normalize();
            return a.AddNormal(g.x, g.y, g.z)
        }
        var g = b.triangles[c];
        if (void 0 === g.mat || 0 > g.mat)
            g.mat = a.GetDefaultMaterialIndex();
        if (void 0 === g.n0 || void 0 === g.n1 || void 0 === g.n2)
            void 0 === g.curve || 0 > g.curve ? (c = d[c],
            c = b.AddNormal(c.x, c.y, c.z),
            g.n0 = c,
            g.n1 = c,
            g.n2 = c,
            g.curve = -1) : (g.n0 = f(b, g.v0, c, d, e),
            g.n1 = f(b, g.v1, c, d, e),
            g.n2 = f(b, g.v2, c, d, e));
        if (void 0 === g.u0 || void 0 === g.u1 || void 0 === g.u2)
            g.u0 = b.AddDefaultUV(),
            g.u1 = b.AddDefaultUV(),
            g.u2 = b.AddDefaultUV()
    }
    var c = [], d = {}, e;
    for (e = 0; e < this.vertices.length; e++)
        d[e] = [];
    var f, g;
    for (e = 0; e < this.triangles.length; e++)
        f = this.triangles[e],
        g = JSM.CalculateTriangleNormal(this.vertices[f.v0], this.vertices[f.v1], this.vertices[f.v2]),
        c.push(g),
        d[f.v0].push(e),
        d[f.v1].push(e),
        d[f.v2].push(e);
    for (e = 0; e < this.triangles.length; e++)
        b(this, e, c, d)
}
;
JSM.TriangleBody.prototype.Clone = function() {
    var a = new JSM.TriangleBody(this.name), b, c;
    for (b = 0; b < this.vertices.length; b++)
        a.vertices.push(this.vertices[b].Clone());
    for (b = 0; b < this.normals.length; b++)
        a.normals.push(this.normals[b].Clone());
    for (b = 0; b < this.uvs.length; b++)
        a.uvs.push(this.uvs[b].Clone());
    for (b = 0; b < this.triangles.length; b++)
        c = this.triangles[b],
        a.triangles.push({
            v0: c.v0,
            v1: c.v1,
            v2: c.v2,
            n0: c.n0,
            n1: c.n1,
            n2: c.n2,
            u0: c.u0,
            u1: c.u1,
            u2: c.u2,
            mat: c.mat,
            curve: c.curve
        });
    return a
}
;
JSM.ConvertTriangleBodyToOctree = function(a) {
    var b = new JSM.TriangleOctree(a.GetBoundingBox()), c, d, e, f;
    for (c = 0; c < a.TriangleCount(); c++)
        d = a.GetTriangle(c),
        e = a.GetVertex(d.v0),
        f = a.GetVertex(d.v1),
        d = a.GetVertex(d.v2),
        b.AddTriangle(e, f, d, {
            triangleIndex: c
        });
    return b
}
;
JSM.TriangleModel = function() {
    this.materials = [];
    this.bodies = [];
    this.defaultMaterial = -1
}
;
JSM.TriangleModel.prototype.AddMaterial = function(a) {
    this.materials.push(a);
    return this.materials.length - 1
}
;
JSM.TriangleModel.prototype.GetMaterial = function(a) {
    return this.materials[a]
}
;
JSM.TriangleModel.prototype.AddDefaultMaterial = function() {
    -1 == this.defaultMaterial && (this.defaultMaterial = this.AddMaterial({}));
    return this.defaultMaterial
}
;
JSM.TriangleModel.prototype.GetDefaultMaterialIndex = function() {
    return this.AddDefaultMaterial()
}
;
JSM.TriangleModel.prototype.MaterialCount = function() {
    return this.materials.length
}
;
JSM.TriangleModel.prototype.AddBody = function(a) {
    this.bodies.push(a);
    return this.bodies.length - 1
}
;
JSM.TriangleModel.prototype.AddBodyToIndex = function(a, b) {
    this.bodies.splice(b, 0, a);
    return b
}
;
JSM.TriangleModel.prototype.GetBody = function(a) {
    return this.bodies[a]
}
;
JSM.TriangleModel.prototype.VertexCount = function() {
    var a = 0, b, c;
    for (b = 0; b < this.bodies.length; b++)
        c = this.bodies[b],
        a += c.VertexCount();
    return a
}
;
JSM.TriangleModel.prototype.TriangleCount = function() {
    var a = 0, b, c;
    for (b = 0; b < this.bodies.length; b++)
        c = this.bodies[b],
        a += c.TriangleCount();
    return a
}
;
JSM.TriangleModel.prototype.BodyCount = function() {
    return this.bodies.length
}
;
JSM.TriangleModel.prototype.FinalizeMaterials = function() {
    var a = {
        name: "Default",
        ambient: [0.5, 0.5, 0.5],
        diffuse: [0.5, 0.5, 0.5],
        specular: [0.1, 0.1, 0.1],
        shininess: 0,
        opacity: 1,
        reflection: 0,
        texture: null,
        offset: null,
        scale: null,
        rotation: null
    }, b, c;
    for (b = 0; b < this.materials.length; b++)
        c = this.materials[b],
        JSM.CopyObjectProperties(a, c, !1)
}
;
JSM.TriangleModel.prototype.FinalizeBodies = function() {
    var a, b;
    for (a = 0; a < this.bodies.length; a++)
        b = this.bodies[a],
        b.Finalize(this)
}
;
JSM.TriangleModel.prototype.Finalize = function() {
    this.FinalizeBodies();
    this.FinalizeMaterials()
}
;
JSM.ConvertBodyToTriangleBody = function(a) {
    function b(a, b, c, d, e) {
        c = a.AddTriangle(c, d, e);
        a = a.GetTriangle(c);
        b.HasMaterialIndex() && (a.mat = b.GetMaterialIndex());
        b.HasCurveGroup() && (a.curve = b.GetCurveGroup())
    }
    var c = new JSM.TriangleBody, d, e, f;
    for (d = 0; d < a.VertexCount(); d++)
        f = a.GetVertexPosition(d),
        c.AddVertex(f.x, f.y, f.z);
    var g, h, k, l;
    for (d = 0; d < a.PolygonCount(); d++)
        if (g = a.GetPolygon(d),
        h = g.VertexIndexCount(),
        !(3 > h))
            if (3 == h)
                f = g.GetVertexIndex(0),
                h = g.GetVertexIndex(1),
                l = g.GetVertexIndex(2),
                b(c, g, f, h, l);
            else {
                k = new JSM.Polygon;
                for (e = 0; e < h; e++)
                    f = a.GetVertexPosition(g.GetVertexIndex(e)),
                    k.AddVertex(f.x, f.y, f.z);
                e = JSM.CalculateBodyPolygonNormal(a, d);
                k = JSM.TriangulatePolygon(k, e);
                if (null !== k)
                    for (e = 0; e < k.length; e++)
                        l = k[e],
                        f = g.GetVertexIndex(l[0]),
                        h = g.GetVertexIndex(l[1]),
                        l = g.GetVertexIndex(l[2]),
                        b(c, g, f, h, l)
            }
    return c
}
;
JSM.ConvertModelToTriangleModel = function(a) {
    var b = new JSM.TriangleModel, c = a.GetMaterialSet(), d, e;
    for (d = 0; d < c.Count(); d++)
        e = c.GetMaterial(d),
        b.AddMaterial({
            name: "Material" + d,
            ambient: JSM.HexColorToNormalizedRGBComponents(e.ambient),
            diffuse: JSM.HexColorToNormalizedRGBComponents(e.diffuse),
            specular: JSM.HexColorToNormalizedRGBComponents(e.specular),
            shininess: e.shininess,
            opacity: e.opacity,
            reflection: e.reflection
        });
    for (d = 0; d < a.BodyCount(); d++)
        c = a.GetBody(d),
        c = JSM.ConvertBodyToTriangleBody(c),
        b.AddBody(c);
    b.Finalize();
    return b
}
;
JSM.ConvertTriangleModelToJsonData = function(a) {
    function b(a, b, c) {
        var d = [], e = a.MaterialCount(), f;
        for (a = 0; a < b.VertexCount(); a++)
            f = b.GetVertex(a),
            c.vertices.push(f.x, f.y, f.z);
        for (a = 0; a < b.NormalCount(); a++)
            f = b.GetNormal(a),
            c.normals.push(f.x, f.y, f.z);
        for (a = 0; a < b.UVCount(); a++)
            f = b.GetUV(a),
            c.uvs.push(f.x, f.y);
        for (a = 0; a < e; a++)
            d.push([]);
        for (a = 0; a < b.TriangleCount(); a++)
            f = b.GetTriangle(a),
            void 0 === f.mat || (0 > f.mat || f.mat >= e) || d[f.mat].push(a);
        var q, p;
        for (a = 0; a < d.length; a++)
            if (q = d[a],
            0 !== q.length) {
                p = {
                    material: a,
                    parameters: []
                };
                for (e = 0; e < q.length; e++)
                    f = b.GetTriangle(q[e]),
                    p.parameters.push(f.v0, f.v1, f.v2, f.n0, f.n1, f.n2, f.u0, f.u1, f.u2);
                c.triangles.push(p)
            }
    }
    var c = {
        version: 1,
        materials: [],
        meshes: []
    };
    (function(a, b) {
        var c, d, e;
        for (c = 0; c < a.MaterialCount(); c++)
            d = a.GetMaterial(c),
            e = {
                name: JSM.ValueOrDefault(d.name, ""),
                ambient: d.ambient,
                diffuse: d.diffuse,
                specular: d.specular,
                shininess: d.shininess,
                opacity: d.opacity
            },
            void 0 !== d.texture && null !== d.texture && (e.texture = JSM.ValueOrDefault(d.texture, null),
            e.offset = d.offset,
            e.scale = d.scale,
            e.rotation = d.rotation),
            b.push(e)
    }
    )(a, c.materials);
    var d, e, f;
    for (d = 0; d < a.BodyCount(); d++)
        e = a.GetBody(d),
        0 !== e.TriangleCount() && (f = {
            name: e.GetName(),
            vertices: [],
            normals: [],
            uvs: [],
            triangles: []
        },
        b(a, e, f),
        c.meshes.push(f));
    return c
}
;
JSM.MergeJsonDataMeshes = function(a) {
    function b(a, b, c) {
        function d(a, b, c, e, f, g) {
            var h = b.material
              , k = c[h];
            void 0 === k && (a.triangles.push({
                material: h,
                parameters: []
            }),
            k = a.triangles.length - 1,
            c[h] = k);
            a = a.triangles[k].parameters;
            for (c = 0; c < b.parameters.length; c += 9)
                a.push(b.parameters[c] + e, b.parameters[c + 1] + e, b.parameters[c + 2] + e, b.parameters[c + 3] + f, b.parameters[c + 4] + f, b.parameters[c + 5] + f, b.parameters[c + 6] + g, b.parameters[c + 7] + g, b.parameters[c + 8] + g)
        }
        var e = a.vertices.length / 3
          , f = a.normals.length / 3
          , g = a.uvs.length / 2;
        (function(a, b) {
            var c;
            for (c = 0; c < b.vertices.length; c++)
                a.vertices.push(b.vertices[c]);
            for (c = 0; c < b.normals.length; c++)
                a.normals.push(b.normals[c]);
            for (c = 0; c < b.uvs.length; c++)
                a.uvs.push(b.uvs[c])
        }
        )(a, b);
        var r, s;
        for (r = 0; r < b.triangles.length; r++)
            s = b.triangles[r],
            d(a, s, c, e, f, g)
    }
    var c = {
        version: a.version,
        materials: a.materials,
        meshes: []
    }, d = {
        name: "Merged",
        vertices: [],
        normals: [],
        uvs: [],
        triangles: []
    }, e = {}, f, g;
    for (f = 0; f < a.meshes.length; f++)
        g = a.meshes[f],
        b(d, g, e);
    c.meshes.push(d);
    return c
}
;
JSM.RayTriangleIntersection = function(a, b, c, d) {
    var e = a.GetOrigin()
      , f = a.GetDirection();
    c = JSM.CoordSub(c, b);
    d = JSM.CoordSub(d, b);
    var g = JSM.VectorCross(f, d)
      , h = JSM.VectorDot(c, g);
    if (JSM.IsZero(h) || !JSM.IsPositive(h))
        return null;
    var h = 1 / h
      , k = JSM.CoordSub(e, b);
    b = JSM.VectorDot(k, g) * h;
    if (JSM.IsLower(b, 0) || JSM.IsGreater(b, 1))
        return null;
    c = JSM.VectorCross(k, c);
    g = JSM.VectorDot(f, c) * h;
    if (JSM.IsLower(g, 0) || JSM.IsGreater(b + g, 1))
        return null;
    d = JSM.VectorDot(d, c) * h;
    if (!JSM.IsPositive(d) || a.IsLengthReached(d))
        return null;
    a = f.Clone().MultiplyScalar(d);
    return {
        position: JSM.CoordAdd(e, a),
        distance: d
    }
}
;
JSM.RayBoxIntersection = function(a, b, c) {
    var d = a.GetOrigin()
      , e = a.GetDirection()
      , f = JSM.CoordToArray(d)
      , e = JSM.CoordToArray(e);
    b = JSM.CoordToArray(b);
    c = JSM.CoordToArray(c);
    var g = [0, 0, 0], h = [0, 0, 0], k = !0, l;
    for (l = 0; 3 > l; l++)
        JSM.IsLower(f[l], b[l]) ? (g[l] = -1,
        h[l] = b[l],
        k = !1) : JSM.IsGreater(f[l], c[l]) ? (g[l] = 1,
        h[l] = c[l],
        k = !1) : g[l] = 0;
    l = null;
    if (k)
        return l = {
            position: d,
            distance: 0
        };
    k = [0, 0, 0];
    for (l = 0; 3 > l; l++)
        0 !== g[l] && !JSM.IsZero(e[l]) ? k[l] = (h[l] - f[l]) / e[l] : k[l] = -1;
    g = 0;
    for (l = 1; 3 > l; l++)
        JSM.IsLower(k[g], k[l]) && (g = l);
    if (JSM.IsNegative(k[g]))
        return null;
    var m = [0, 0, 0];
    for (l = 0; 3 > l; l++)
        if (g != l) {
            if (m[l] = f[l] + k[g] * e[l],
            JSM.IsLower(m[l], b[l]) || JSM.IsGreater(m[l], c[l]))
                return null
        } else
            m[l] = h[l];
    f = JSM.CoordFromArray(m);
    d = d.DistanceTo(f);
    return a.IsLengthReached(d) ? null : l = {
        position: f,
        distance: d
    }
}
;
JSM.RayOctreeIntersection = function(a, b, c) {
    var d = null
      , e = !1
      , f = null !== c && void 0 !== c;
    JSM.TraverseOctreeNodes(b, function(b) {
        if (!f && e || !JSM.RayBoxIntersection(a, b.box.min, b.box.max))
            return !1;
        var c;
        for (c = 0; c < b.triangles.length; c++) {
            var k = b.triangles[c]
              , l = JSM.RayTriangleIntersection(a, k.v0, k.v1, k.v2);
            if (null !== l) {
                e = !0;
                if (!f)
                    return !1;
                if (null === d || l.distance < d.distance)
                    d = l,
                    d.userData = k.userData
            }
        }
        return !0
    });
    f && null !== d && (c.position = d.position,
    c.distance = d.distance,
    c.userData = d.userData);
    return e
}
;
JSM.RayTriangleBodyIntersection = function(a, b, c) {
    var d = null, e = !1, f = null !== c && void 0 !== c, g, h, k, l;
    for (g = 0; g < b.TriangleCount(); g++)
        if (h = b.GetTriangle(g),
        k = b.GetVertex(h.v0),
        l = b.GetVertex(h.v1),
        h = b.GetVertex(h.v2),
        k = JSM.RayTriangleIntersection(a, k, l, h),
        null !== k) {
            e = !0;
            if (!f)
                break;
            if (null === d || k.distance < d.distance)
                d = k,
                d.triangleIndex = g
        }
    f && null !== d && (c.position = d.position,
    c.distance = d.distance,
    c.triangleIndex = d.triangleIndex);
    return e
}
;
JSM.RayTriangleModelIntersection = function(a, b, c) {
    var d = null, e = !1, f = null !== c && void 0 !== c, g, h, k;
    for (g = 0; g < b.BodyCount(); g++)
        if (h = b.GetBody(g),
        k = f ? {} : null,
        JSM.RayTriangleBodyIntersection(a, h, k)) {
            e = !0;
            if (!f)
                break;
            if (null === d || k.distance < d.distance)
                d = k,
                d.bodyIndex = g
        }
    f && null !== d && (c.position = d.position,
    c.distance = d.distance,
    c.triangleIndex = d.triangleIndex,
    c.bodyIndex = d.bodyIndex);
    return e
}
;
JSM.RayTriangleModelIntersectionWithOctree = function(a, b, c) {
    var d = null, e = !1, f = null !== c && void 0 !== c, g, h, k;
    for (g = 0; g < b.BodyCount(); g++)
        if (h = b.GetBody(g),
        k = f ? {} : null,
        20 < h.TriangleCount() ? (void 0 === h.octree && (h.octree = JSM.ConvertTriangleBodyToOctree(h)),
        h = JSM.RayOctreeIntersection(a, h.octree, k)) : h = JSM.RayTriangleBodyIntersection(a, h, k),
        h) {
            e = !0;
            if (!f)
                break;
            if (null === d || k.distance < d.distance)
                d = k,
                void 0 !== k.userData && (d.triangleIndex = k.userData.triangleIndex),
                d.bodyIndex = g
        }
    f && null !== d && (c.position = d.position,
    c.distance = d.distance,
    c.triangleIndex = d.triangleIndex,
    c.bodyIndex = d.bodyIndex);
    return e
}
;
JSM.BinaryReader = function(a, b) {
    this.arrayBuffer = a;
    this.dataView = new DataView(a);
    this.isLittleEndian = b;
    this.position = 0
}
;
JSM.BinaryReader.prototype.GetPosition = function() {
    return this.position
}
;
JSM.BinaryReader.prototype.GetByteLength = function() {
    return this.arrayBuffer.byteLength
}
;
JSM.BinaryReader.prototype.Skip = function(a) {
    this.position += a
}
;
JSM.BinaryReader.prototype.End = function() {
    return this.position >= this.arrayBuffer.byteLength
}
;
JSM.BinaryReader.prototype.ReadBoolean = function() {
    var a = this.dataView.getInt8(this.position);
    this.position += 1;
    return a ? !0 : !1
}
;
JSM.BinaryReader.prototype.ReadCharacter = function() {
    var a = this.dataView.getInt8(this.position);
    this.position += 1;
    return a
}
;
JSM.BinaryReader.prototype.ReadUnsignedCharacter = function() {
    var a = this.dataView.getUint8(this.position);
    this.position += 1;
    return a
}
;
JSM.BinaryReader.prototype.ReadInteger16 = function() {
    var a = this.dataView.getInt16(this.position, this.isLittleEndian);
    this.position += 2;
    return a
}
;
JSM.BinaryReader.prototype.ReadUnsignedInteger16 = function() {
    var a = this.dataView.getUint16(this.position, this.isLittleEndian);
    this.position += 2;
    return a
}
;
JSM.BinaryReader.prototype.ReadInteger32 = function() {
    var a = this.dataView.getInt32(this.position, this.isLittleEndian);
    this.position += 4;
    return a
}
;
JSM.BinaryReader.prototype.ReadUnsignedInteger32 = function() {
    var a = this.dataView.getUint32(this.position, this.isLittleEndian);
    this.position += 4;
    return a
}
;
JSM.BinaryReader.prototype.ReadFloat32 = function() {
    var a = this.dataView.getFloat32(this.position, this.isLittleEndian);
    this.position += 4;
    return a
}
;
JSM.BinaryReader.prototype.ReadDouble64 = function() {
    var a = this.dataView.getFloat64(this.position, this.isLittleEndian);
    this.position += 8;
    return a
}
;
JSM.GetArrayBufferFromURL = function(a, b) {
    var c = new XMLHttpRequest;
    c.open("GET", a, !0);
    c.responseType = "arraybuffer";
    c.onload = function() {
        var a = c.response;
        if (a && b.onReady)
            b.onReady(a)
    }
    ;
    c.onerror = function() {
        if (b.onError)
            b.onError()
    }
    ;
    c.send(null)
}
;
JSM.GetArrayBufferFromFile = function(a, b) {
    var c = new FileReader;
    c.onloadend = function(a) {
        if (a.target.readyState == FileReader.DONE && b.onReady)
            b.onReady(a.target.result)
    }
    ;
    c.onerror = function() {
        if (b.onError)
            b.onError()
    }
    ;
    c.readAsArrayBuffer(a)
}
;
JSM.GetStringBufferFromURL = function(a, b) {
    var c = new XMLHttpRequest;
    c.open("GET", a, !0);
    c.responseType = "text";
    
	var file=a.substr(a.lastIndexOf('/')+1);$('#down_filename').text(file);$('#down_progress').css('width',0);
	c.onprogress=function(e) {var per = (Math.floor(e.loaded / e.total * 100));$('#down_progress').css('width', per + '%');$('#down_filename').text(file+'('+per+'%)')};
	
    c.onload = function() {
        var a = c.response;
        if (a && b.onReady)
            b.onReady(a)
    };
    c.onerror = function() {
        if (b.onError)
            b.onError()
    };
    c.send(null)
}
;
JSM.GetStringBufferFromFile = function(a, b) {
    var c = new FileReader;
    c.onloadend = function(a) {
        if (a.target.readyState == FileReader.DONE && b.onReady)
            b.onReady(a.target.result)
    }
    ;
    c.onerror = function() {
        if (b.onError)
            b.onError()
    }
    ;
    c.readAsText(a)
}
;
JSM.LoadMultipleBuffers = function(a, b) {
    function c(a, b, f, g) {
        if (b >= a.length)
            g(f);
        else {
            var h = a[b]
              , k = null
              , k = h.isFile ? h.isArrayBuffer ? JSM.GetArrayBufferFromFile : JSM.GetStringBufferFromFile : h.isArrayBuffer ? JSM.GetArrayBufferFromURL : JSM.GetStringBufferFromURL;
            k(h.originalObject, {
                onReady: function(h) {
                    f.push(h);
                    c(a, b + 1, f, g)
                },
                onError: function() {
                    f.push(null);
                    c(a, b + 1, f, g)
                }
            })
        }
    }
    c(a, 0, [], function(a) {
        b(a)
    })
}
;
JSM.Read3dsFile = function(a, b) {
    function c(a, c) {
        if (void 0 !== b.onLog && null !== b.onLog)
            b.onLog(a, c)
    }
    function d(a) {
        for (var b = "", c = 0, d = 0; 64 > d; ) {
            c = a.ReadCharacter();
            if (0 === c)
                break;
            b += String.fromCharCode(c);
            d += 1
        }
        return b
    }
    function e(a) {
        var b = [], c;
        for (c = 0; 3 > c; c++)
            b[c] = a.ReadFloat32();
        return b
    }
    function f(a, b, c) {
        for (; a.GetPosition() <= b - 6; ) {
            var d = a
              , e = c
              , f = d.ReadUnsignedInteger16()
              , d = d.ReadUnsignedInteger32();
            e(f, d)
        }
    }
    if (void 0 === b || null === b)
        b = {};
    (function(a, h) {
        function k(a, b, c) {
            var d = [0, 0, 0];
            b = a.GetPosition() + c - 6;
            var e = !1;
            f(a, b, function(b, c) {
                b == h.MAT_COLOR ? e || (d[0] = a.ReadUnsignedCharacter() / 255,
                d[1] = a.ReadUnsignedCharacter() / 255,
                d[2] = a.ReadUnsignedCharacter() / 255) : b == h.MAT_LIN_COLOR ? (d[0] = a.ReadUnsignedCharacter() / 255,
                d[1] = a.ReadUnsignedCharacter() / 255,
                d[2] = a.ReadUnsignedCharacter() / 255,
                e = !0) : b == h.MAT_COLOR_F ? e || (d[0] = a.ReadFloat32(),
                d[1] = a.ReadFloat32(),
                d[2] = a.ReadFloat32()) : b == h.MAT_LIN_COLOR_F ? (d[0] = a.ReadFloat32(),
                d[1] = a.ReadFloat32(),
                d[2] = a.ReadFloat32(),
                e = !0) : a.Skip(c - 6)
            });
            return d
        }
        function l(a, b, c) {
            var d = 0;
            b = a.GetPosition() + c - 6;
            f(a, b, function(b, c) {
                b == h.PERCENTAGE ? d = a.ReadUnsignedInteger16() / 100 : b == h.PERCENTAGE_F ? d = a.ReadFloat32() : a.Skip(c - 6)
            });
            return d
        }
        function m(a, b, c, e) {
            e.texture = null;
            e.offset = [0, 0];
            e.scale = [1, 1];
            e.rotation = 0;
            b = a.GetPosition() + c - 6;
            f(a, b, function(b, c) {
                b == h.MAT_TEXMAP_NAME ? e.texture = d(a) : b == h.MAT_TEXMAP_UOFFSET ? e.offset[0] = a.ReadFloat32() : b == h.MAT_TEXMAP_VOFFSET ? e.offset[1] = a.ReadFloat32() : b == h.MAT_TEXMAP_USCALE ? e.scale[0] = a.ReadFloat32() : b == h.MAT_TEXMAP_VSCALE ? e.scale[1] = a.ReadFloat32() : b == h.MAT_TEXMAP_ROTATION ? e.rotation = a.ReadFloat32() : a.Skip(c - 6)
            })
        }
        function n(a, e, g) {
            c("Read material chunk (" + e.toString(16) + ", " + g + ")", 2);
            var n = {}
              , p = a.GetPosition() + g - 6;
            f(a, p, function(b, f) {
                b == h.MAT_NAME ? (c("Read material name chunk (" + e.toString(16) + ", " + g + ")", 3),
                n.name = d(a)) : b == h.MAT_AMBIENT ? (c("Read material ambient chunk (" + e.toString(16) + ", " + g + ")", 3),
                n.ambient = k(a, b, f)) : b == h.MAT_DIFFUSE ? (c("Read material diffuse chunk (" + e.toString(16) + ", " + g + ")", 3),
                n.diffuse = k(a, b, f)) : b == h.MAT_SPECULAR ? (c("Read material specular chunk (" + e.toString(16) + ", " + g + ")", 3),
                n.specular = k(a, b, f)) : b == h.MAT_SHININESS ? (c("Read material shininess chunk (" + e.toString(16) + ", " + g + ")", 3),
                n.shininess = l(a, b, f)) : b == h.MAT_SHININESS_STRENGTH ? (c("Read material shininess strength chunk (" + e.toString(16) + ", " + g + ")", 3),
                n.shininessStrength = l(a, b, f)) : b == h.MAT_TRANSPARENCY ? (c("Read material transparency chunk (" + e.toString(16) + ", " + g + ")", 3),
                n.transparency = l(a, b, f)) : b == h.MAT_TEXMAP ? (c("Read material texture map chunk (" + e.toString(16) + ", " + g + ")", 3),
                m(a, b, f, n)) : (c("Skip chunk (" + b.toString(16) + ", " + f + ")", 3),
                a.Skip(f - 6))
            });
            if (void 0 !== b.onMaterial && null !== b.onMaterial)
                b.onMaterial(n)
        }
        function q(a, e, g) {
            c("Read faces chunk (" + e.toString(16) + ", " + g + ")", 4);
            e = a.GetPosition() + g - 6;
            var k = a.ReadUnsignedInteger16(), l, m, n, p;
            for (g = 0; g < k; g++)
                if (l = a.ReadUnsignedInteger16(),
                m = a.ReadUnsignedInteger16(),
                n = a.ReadUnsignedInteger16(),
                p = a.ReadUnsignedInteger16(),
                void 0 !== b.onFace && null !== b.onFace)
                    b.onFace(l, m, n, p);
            f(a, e, function(e, f) {
                if (e == h.TRI_MATERIAL) {
                    c("Read face materials chunk (" + e.toString(16) + ", " + f + ")", 5);
                    var g = d(a), l = a.ReadUnsignedInteger16(), m, n;
                    for (m = 0; m < l; m++)
                        if (n = a.ReadUnsignedInteger16(),
                        void 0 !== b.onFaceMaterial && null !== b.onFaceMaterial)
                            b.onFaceMaterial(n, g)
                } else if (e == h.TRI_SMOOTH) {
                    c("Read face smoothing groups chunk (" + e.toString(16) + ", " + f + ")", 5);
                    for (g = 0; g < k; g++)
                        if (l = a.ReadUnsignedInteger32(),
                        void 0 !== b.onFaceSmoothingGroup && null !== b.onFaceSmoothingGroup)
                            b.onFaceSmoothingGroup(g, l)
                } else
                    c("Skip chunk (" + e.toString(16) + ", " + f + ")", 5),
                    a.Skip(f - 6)
            })
        }
        function p(a, d, e, g) {
            c("Read mesh chunk (" + d + ", " + e.toString(16) + ", " + g + ")", 3);
            if (void 0 !== b.onMesh && null !== b.onMesh)
                b.onMesh(d);
            d = a.GetPosition() + g - 6;
            f(a, d, function(d, e) {
                if (d == h.TRI_VERTEX) {
                    c("Read vertices chunk (" + d.toString(16) + ", " + e + ")", 4);
                    var f = a.ReadUnsignedInteger16(), g, k, l, m;
                    for (g = 0; g < f; g++)
                        if (k = a.ReadFloat32(),
                        l = a.ReadFloat32(),
                        m = a.ReadFloat32(),
                        void 0 !== b.onVertex && null !== b.onVertex)
                            b.onVertex(k, l, m)
                } else if (d == h.TRI_TEXVERTEX) {
                    c("Read texture vertices chunk (" + d.toString(16) + ", " + e + ")", 4);
                    f = a.ReadUnsignedInteger16();
                    for (g = 0; g < f; g++)
                        if (k = a.ReadFloat32(),
                        l = a.ReadFloat32(),
                        void 0 !== b.onTextureVertex && null !== b.onTextureVertex)
                            b.onTextureVertex(k, l)
                } else if (d == h.TRI_FACE)
                    q(a, d, e);
                else if (d == h.TRI_TRANSFORMATION) {
                    c("Read transformation chunk (" + d.toString(16) + ", " + e + ")", 4);
                    f = [];
                    for (g = 0; 4 > g; g++) {
                        for (k = 0; 3 > k; k++)
                            f.push(a.ReadFloat32());
                        3 > g ? f.push(0) : f.push(1)
                    }
                    if (void 0 !== b.onTransformation && null !== b.onTransformation)
                        b.onTransformation(f)
                } else
                    c("Skip chunk (" + d.toString(16) + ", " + e + ")", 4),
                    a.Skip(e - 6)
            })
        }
        function r(a, b, e) {
            c("Read object chunk (" + b.toString(16) + ", " + e + ")", 2);
            b = a.GetPosition() + e - 6;
            var g = d(a);
            f(a, b, function(b, d) {
                b == h.OBJ_TRIMESH ? p(a, g, b, d) : (b == h.OBJ_LIGHT ? c("Skip light chunk (" + g + ", " + b.toString(16) + ", " + d + ")", 3) : b == h.OBJ_CAMERA ? c("Skip camera chunk (" + g + ", " + b.toString(16) + ", " + d + ")", 3) : c("Skip chunk (" + b.toString(16) + ", " + d + ")", 3),
                a.Skip(d - 6))
            })
        }
        function s(a, b, d) {
            c("Read editor chunk (" + b.toString(16) + ", " + d + ")", 1);
            b = a.GetPosition() + d - 6;
            f(a, b, function(b, d) {
                b == h.EDIT_MATERIAL ? n(a, b, d) : b == h.EDIT_OBJECT ? r(a, b, d) : (c("Skip chunk (" + b.toString(16) + ", " + d + ")", 2),
                a.Skip(d - 6))
            })
        }
        function v(a, g, k) {
            function l(a, b) {
                var c = [];
                a.Skip(10);
                var d, f, g, k = a.ReadInteger32();
                for (d = 0; d < k; d++)
                    a.ReadInteger32(),
                    f = a.ReadUnsignedInteger16(),
                    0 !== f && a.ReadFloat32(),
                    b == h.OBJECT_ROTATION ? (g = a.ReadFloat32(),
                    f = e(a),
                    f[3] = g) : f = e(a),
                    c.push(f);
                return c
            }
            c("Read object node chunk (" + g.toString(16) + ", " + k + ")", 2);
            var m = {
                name: "",
                nodeId: -1,
                flags: -1,
                userId: -1,
                pivot: [0, 0, 0],
                positions: [],
                rotations: [],
                scales: []
            };
            g = a.GetPosition() + k - 6;
            f(a, g, function(b, f) {
                b == h.OBJECT_HIERARCHY ? (m.name = d(a),
                m.flags = a.ReadUnsignedInteger32(),
                m.userId = a.ReadUnsignedInteger16()) : b == h.OBJECT_PIVOT ? m.pivot = e(a) : b == h.OBJECT_POSITION ? m.positions = l(a, h.OBJECT_POSITION) : b == h.OBJECT_ROTATION ? m.rotations = l(a, h.OBJECT_ROTATION) : b == h.OBJECT_SCALE ? m.scales = l(a, h.OBJECT_SCALE) : b == h.OBJECT_ID ? m.nodeId = a.ReadUnsignedInteger16() : (c("Skip chunk (" + b.toString(16) + ", " + f + ")", 3),
                a.Skip(f - 6))
            });
            if (void 0 !== b.onObjectNode && null !== b.onObjectNode)
                b.onObjectNode(m)
        }
        function u(a, b, d) {
            c("Read keyframe chunk (" + b.toString(16) + ", " + d + ")", 1);
            b = a.GetPosition() + d - 6;
            f(a, b, function(b, d) {
                b == h.OBJECT_NODE ? v(a, b, d) : (c("Skip chunk (" + b.toString(16) + ", " + d + ")", 2),
                a.Skip(d - 6))
            })
        }
        function t(a, b, d) {
            c("Read main chunk (" + b.toString(16) + ", " + d + ")", 0);
            b = a.GetPosition() + d - 6;
            f(a, b, function(b, d) {
                b == h.EDIT3DS ? s(a, b, d) : b == h.KF3DS ? u(a, b, d) : (c("Skip chunk (" + b.toString(16) + ", " + d + ")", 1),
                a.Skip(d - 6))
            })
        }
        var y = a.GetByteLength();
        f(a, y, function(b, d) {
            b == h.MAIN3DS ? t(a, b, d) : (c("Skip chunk (" + b.toString(16) + ", " + d + ")", 0),
            a.Skip(d - 6))
        })
    }
    )(new JSM.BinaryReader(a,!0), {
        MAIN3DS: 19789,
        EDIT3DS: 15677,
        EDIT_MATERIAL: 45055,
        MAT_NAME: 40960,
        MAT_AMBIENT: 40976,
        MAT_DIFFUSE: 40992,
        MAT_SPECULAR: 41008,
        MAT_SHININESS: 41024,
        MAT_SHININESS_STRENGTH: 41025,
        MAT_TRANSPARENCY: 41040,
        MAT_COLOR_F: 16,
        MAT_COLOR: 17,
        MAT_LIN_COLOR: 18,
        MAT_LIN_COLOR_F: 19,
        MAT_TEXMAP: 41472,
        MAT_TEXMAP_NAME: 41728,
        MAT_TEXMAP_UOFFSET: 41816,
        MAT_TEXMAP_VOFFSET: 41818,
        MAT_TEXMAP_USCALE: 41812,
        MAT_TEXMAP_VSCALE: 41814,
        MAT_TEXMAP_ROTATION: 41820,
        PERCENTAGE: 48,
        PERCENTAGE_F: 49,
        EDIT_OBJECT: 16384,
        OBJ_TRIMESH: 16640,
        OBJ_LIGHT: 17920,
        OBJ_CAMERA: 18176,
        TRI_VERTEX: 16656,
        TRI_TEXVERTEX: 16704,
        TRI_FACE: 16672,
        TRI_TRANSFORMATION: 16736,
        TRI_MATERIAL: 16688,
        TRI_SMOOTH: 16720,
        KF3DS: 45056,
        OBJECT_NODE: 45058,
        OBJECT_HIERARCHY: 45072,
        OBJECT_PIVOT: 45075,
        OBJECT_POSITION: 45088,
        OBJECT_ROTATION: 45089,
        OBJECT_SCALE: 45090,
        OBJECT_ID: 45104
    })
}
;
JSM.Convert3dsToJsonData = function(a, b) {
    function c(a) {
        return void 0 !== b.onFileRequested && null !== b.onFileRequested ? b.onFileRequested(a) : null
    }
    if (void 0 === b || null === b)
        b = {};
    var d = new JSM.TriangleModel
      , e = null
      , f = {}
      , g = {}
      , h = {
        nodes: [],
        nodeIdToIndex: {}
    };
    JSM.Read3dsFile(a, {
        onMaterial: function(a) {
            if (void 0 === f[a.name]) {
                var b = d.AddMaterial({
                    name: a.name,
                    ambient: a.ambient,
                    diffuse: a.diffuse,
                    specular: a.specular,
                    shininess: void 0 === a.shininess || null === a.shininess || void 0 === a.shininessStrength || null === a.shininessStrength ? 0 : a.shininess * a.shininessStrength,
                    opacity: void 0 === a.transparency || null === a.transparency ? 1 : 1 - a.transparency
                })
                  , e = d.GetMaterial(b);
                if (void 0 !== a.texture && null !== a.texture) {
                    var g = c(a.texture);
                    null !== g && (g = new window.Blob([g]),
                    g = window.URL.createObjectURL(g),
                    e.texture = g,
                    e.offset = a.offset,
                    e.scale = a.scale,
                    e.rotation = -a.rotation)
                }
                f[a.name] = b
            }
        },
        onMesh: function(a) {
            if (void 0 === g[a]) {
                var b = d.AddBody(new JSM.TriangleBody(a));
                e = d.GetBody(b);
                e.meshData = {
                    faceToMaterial: {},
                    faceToSmoothingGroup: {},
                    objectNodes: [],
                    transformation: null
                };
                g[a] = b
            }
        },
        onTransformation: function(a) {
            null !== e && (e.meshData.transformation = a)
        },
        onObjectNode: function(a) {
            var b = h.nodes.length;
            h.nodes.push(a);
            h.nodeIdToIndex[a.nodeId] = b;
            a = g[a.name];
            void 0 !== a && d.GetBody(a).meshData.objectNodes.push(b)
        },
        onVertex: function(a, b, c) {
            null !== e && e.AddVertex(a, b, c)
        },
        onTextureVertex: function(a, b) {
            null !== e && e.AddUV(a, b)
        },
        onFace: function(a, b, c) {
            null !== e && e.AddTriangle(a, b, c)
        },
        onFaceMaterial: function(a, b) {
            null !== e && (e.meshData.faceToMaterial[a] = b)
        },
        onFaceSmoothingGroup: function(a, b) {
            null !== e && (e.meshData.faceToSmoothingGroup[a] = b)
        },
        onFileRequested: c
    });
    (function(a, b, c) {
        function d(a, b, c) {
            function e(a, b) {
                var c = b[0], d = b[1], f = b[2], g;
                for (g = 0; 4 > g; g++)
                    a[0 + g] *= c,
                    a[4 + g] *= d,
                    a[8 + g] *= f;
                return a
            }
            function f(a, b) {
                var c = b[0], d = b[1], e = b[2], g;
                for (g = 0; 3 > g; g++)
                    a[12 + g] += a[0 + g] * c + a[4 + g] * d + a[8 + g] * e;
                return a
            }
            function g(a, b) {
                var c, d;
                for (c = 0; c < a.VertexCount(); c++)
                    d = a.GetVertex(c),
                    d = JSM.ApplyTransformation(b, d),
                    a.SetVertex(c, d.x, d.y, d.z)
            }
            function h(a, b, c) {
                var d = JSM.MatrixDeterminant(b);
                JSM.IsNegative(d) && (b = JSM.MatrixClone(b),
                e(b, [-1, 1, 1]),
                c = JSM.MatrixMultiply(c, b),
                g(a, c))
            }
            function k(a, b) {
                if (void 0 !== a.matrix)
                    return a.matrix;
                var c = JSM.MatrixIdentity(), d;
                d = 0 === a.positions.length ? [0, 0, 0] : a.positions[0];
                c = f(c, d);
                if (0 === a.rotations.length)
                    d = [0, 0, 0, 0];
                else {
                    d = a.rotations[0];
                    var g = [0, 0, 0, 1]
                      , h = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
                    JSM.IsPositive(h) && (g = -0.5 * d[3],
                    h = Math.sin(g) / h,
                    g = [h * d[0], h * d[1], h * d[2], Math.cos(g)]);
                    d = g
                }
                d = JSM.MatrixRotationQuaternion(d);
                c = JSM.MatrixMultiply(d, c);
                d = 0 === a.scales.length ? [0, 0, 0, 0] : a.scales[0];
                c = e(c, d);
                65535 != a.userId && (d = b.nodeIdToIndex[a.userId],
                void 0 !== d && (d = k(b.nodes[d], b),
                c = JSM.MatrixMultiply(c, d)));
                return a.matrix = c
            }
            var l = a.meshData;
            l = void 0 === l || null === l ? null : l.transformation;
            if (null !== l) {
                var m = null
                  , m = null !== b ? k(b, c) : l;
                c = JSM.MatrixClone(m);
                m = JSM.MatrixClone(l);
                l = JSM.MatrixInvert(m);
                null !== l && (h(a, m, l),
                b = void 0 === b || null === b ? [0, 0, 0] : b.pivot,
                f(c, [-b[0], -b[1], -b[2]]),
                b = JSM.MatrixMultiply(l, c),
                g(a, b))
            }
        }
        function e(a, b, c, f) {
            d(a, b, f);
            b = a.UVCount() == a.VertexCount();
            f = a.meshData;
            var g, h, k;
            for (g = 0; g < a.TriangleCount(); g++)
                h = a.GetTriangle(g),
                b && (h.u0 = h.v0,
                h.u1 = h.v1,
                h.u2 = h.v2),
                k = f.faceToMaterial[g],
                void 0 !== k && (k = c[k],
                void 0 !== k && (h.mat = k)),
                k = f.faceToSmoothingGroup[g],
                void 0 !== k && 0 < k && (h.curve = k)
        }
        function f(a, b, c, d) {
            b = b.Clone();
            b.SetName(b.GetName() + " (" + d + ")");
            c < a.BodyCount() ? a.AddBodyToIndex(b, c) : a.AddBody(b);
            return b
        }
        var g, h, v, u, t, y, B;
        for (g = 0; g < b.BodyCount(); g++)
            if (v = b.GetBody(g),
            u = v.meshData,
            0 === u.objectNodes.length)
                e(v, null, c, a);
            else {
                y = a.nodes[u.objectNodes[0]];
                for (h = 1; h < u.objectNodes.length; h++)
                    t = a.nodes[u.objectNodes[h]],
                    B = f(b, v, g + 1, h + 1),
                    B.meshData = v.meshData,
                    e(B, t, c, a),
                    g += 1;
                e(v, y, c, a)
            }
    }
    )(h, d, f);
    d.Finalize();
    return JSM.ConvertTriangleModelToJsonData(d)
}
;
JSM.ReadObjFile = function(a, b) {
    function c(a, c, d, e) {
        if (void 0 !== b.onMaterialComponent && null !== b.onMaterialComponent)
            b.onMaterialComponent(a, c, d, e)
    }
    function d(a, c, d) {
        if (void 0 !== b.onVertex && null !== b.onVertex)
            b.onVertex(a, c, d)
    }
    function e(a, c, d) {
        if (void 0 !== b.onNormal && null !== b.onNormal)
            b.onNormal(a, c, d)
    }
    function f(a, c) {
        if (void 0 !== b.onTexCoord && null !== b.onTexCoord)
            b.onTexCoord(a, c)
    }
    function g(a) {
        return void 0 !== b.onFileRequested && null !== b.onFileRequested ? b.onFileRequested(a) : null
    }
    function h(a, h) {
        function n(a, b) {
            return 0 < a ? a - 1 : b + a
        }
        function q(a, b) {
            var c = a.indexOf(b) + b.length;
            return a.substr(c, a.length - c).trim()
        }
        if (0 !== a.length && "#" != a[0]) {
            var p = a.split(/\s+/);
            if (!(0 === p.length || "#" == p[0][0])) {
                var r;
                if ("g" == p[0]) {
                    if (!(2 > p.length)) {
                        var s = "";
                        for (r = 1; r < p.length; r++)
                            s += p[r],
                            r < p.length - 1 && (s += " ");
                        if (void 0 !== b.onMesh && null !== b.onMesh)
                            b.onMesh(s)
                    }
                } else if ("v" == p[0])
                    4 > p.length || (h.vertexCount += 1,
                    d(parseFloat(p[1]), parseFloat(p[2]), parseFloat(p[3])));
                else if ("vn" == p[0])
                    4 > p.length || (h.normalCount += 1,
                    e(parseFloat(p[1]), parseFloat(p[2]), parseFloat(p[3])));
                else if ("vt" == p[0])
                    3 > p.length || (h.uvCount += 1,
                    f(parseFloat(p[1]), parseFloat(p[2])));
                else if ("f" == p[0]) {
                    if (!(4 > p.length)) {
                        var s = [], v = [], u = [], t;
                        for (r = 1; r < p.length; r++)
                            t = p[r].split("/"),
                            s.push(n(parseInt(t[0], 10), h.vertexCount)),
                            1 < t.length && 0 < t[1].length && u.push(n(parseInt(t[1], 10), h.uvCount)),
                            2 < t.length && 0 < t[2].length && v.push(n(parseInt(t[2], 10), h.normalCount));
                        if (void 0 !== b.onFace && null !== b.onFace)
                            b.onFace(s, v, u)
                    }
                } else if ("usemtl" == p[0]) {
                    if (!(2 > p.length) && void 0 !== b.onUseMaterial && null !== b.onUseMaterial)
                        b.onUseMaterial(p[1])
                } else if ("newmtl" == p[0]) {
                    if (!(2 > p.length) && void 0 !== b.onNewMaterial && null !== b.onNewMaterial)
                        b.onNewMaterial(p[1])
                } else if ("Ka" == p[0] || "Kd" == p[0] || "Ks" == p[0])
                    4 > p.length || c(p[0], parseFloat(p[1]), parseFloat(p[2]), parseFloat(p[3]));
                else if ("Ns" == p[0] || "Tr" == p[0] || "d" == p[0]) {
                    if (!(2 > p.length) && void 0 !== b.onMaterialParameter && null !== b.onMaterialParameter)
                        b.onMaterialParameter(p[0], p[1])
                } else if ("map_Kd" == p[0]) {
                    if (!(2 > p.length) && (p = q(a, "map_Kd"),
                    void 0 !== b.onMaterialTexture && null !== b.onMaterialTexture))
                        b.onMaterialTexture(p)
                } else
                    "mtllib" == p[0] && !(2 > p.length) && (p = q(a, "mtllib"),
                    p = g(p.trim()),
                    null !== p && k(p))
            }
        }
    }
    function k(a, b) {
        var c = a.split("\n"), d, e;
        if (c.length == 1) {
            c = a.split("\r");
        }
        for (d = 0; d < c.length; d++)
            e = c[d].trim(),
            h(e, b)
    }
    if (void 0 === b || null === b)
        b = {};
    k(a, {
        vertexCount: 0,
        normalCount: 0,
        uvCount: 0
    })
}
;
JSM.ConvertObjToJsonData = function(a, b) {
    function c(a) {
        return void 0 !== b.onFileRequested && null !== b.onFileRequested ? b.onFileRequested(a) : null
    }
    if (void 0 === b || null === b)
        b = {};
    var d = new JSM.TriangleModel
      , e = d.AddBody(new JSM.TriangleBody("Default"))
      , f = d.GetBody(e)
      , g = {}
      , h = null
      , k = null
      , l = []
      , m = []
      , n = []
      , q = {}
      , p = {}
      , r = {};
    JSM.ReadObjFile(a, {
        onNewMaterial: function(a) {
            var b = d.AddMaterial({
                name: a
            });
            h = d.GetMaterial(b);
            g[a] = b
        },
        onMaterialComponent: function(a, b, c, d) {
            null !== h && ("Ka" == a ? h.ambient = [b, c, d] : "Kd" == a ? h.diffuse = [b, c, d] : "Ks" == a && (h.specular = [b, c, d]))
        },
        onMaterialParameter: function(a, b) {
            null !== h && ("Ns" == a ? (h.shininess = 0,
            JSM.IsPositive(b) && (h.shininess = (Math.log2(parseFloat(b)) - 1) / 10)) : "Tr" == a ? h.opacity = 1 - parseFloat(b) : "d" == a && (h.opacity = parseFloat(b)))
        },
        onMaterialTexture: function(a) {
            null !== h && (a = c(a),
            null !== a && (a = new window.Blob([a]),
            a = window.URL.createObjectURL(a),
            h.texture = a))
        },
        onUseMaterial: function(a) {
            a = g[a];
            void 0 !== a && (k = a)
        },
        onMesh: function(a) {
            a = d.AddBody(new JSM.TriangleBody(a));
            f = d.GetBody(a);
            q = {};
            p = {};
            r = {}
        },
        onVertex: function(a, b, c) {
            l.push(new JSM.Coord(a,b,c))
        },
        onNormal: function(a, b, c) {
            m.push(new JSM.Coord(a,b,c))
        },
        onTexCoord: function(a, b) {
            n.push(new JSM.Coord2D(a,b))
        },
        onFace: function(a, b, c) {
            function d(a, b, c, e) {
                if (!(0 > c || c >= a.length)) {
                    var f = b[c];
                    void 0 === f && (f = e(a[c]),
                    b[c] = f);
                    return f
                }
            }
            function e(a, b, c, f) {
                return d(b, c, f, function(b) {
                    return a.AddVertex(b.x, b.y, b.z)
                })
            }
            function g(a, b, c, e) {
                return d(b, c, e, function(b) {
                    return a.AddNormal(b.x, b.y, b.z)
                })
            }
            function h(a, b, c, e) {
                return d(b, c, e, function(b) {
                    return a.AddUV(b.x, b.y)
                })
            }
            var w, x, A, E, G = b.length == a.length, H = c.length == a.length, z = a.length;
            for (w = 0; w < z - 2; w++)
                x = e(f, l, q, a[0]),
                A = e(f, l, q, a[(w + 1) % z]),
                E = e(f, l, q, a[(w + 2) % z]),
                x = f.AddTriangle(x, A, E),
                x = f.GetTriangle(x),
                G && (x.n0 = g(f, m, p, b[0]),
                x.n1 = g(f, m, p, b[(w + 1) % z]),
                x.n2 = g(f, m, p, b[(w + 2) % z])),
                H && (x.u0 = h(f, n, r, c[0]),
                x.u1 = h(f, n, r, c[(w + 1) % z]),
                x.u2 = h(f, n, r, c[(w + 2) % z])),
                null !== k && (x.mat = k)
        },
        onFileRequested: c
    });
    d.Finalize();
    return JSM.ConvertTriangleModelToJsonData(d)
}
;
JSM.ReadBinaryStlFile = function(a, b) {
    function c(a) {
        var b = [], c;
        for (c = 0; 3 > c; c++)
            b[c] = a.ReadFloat32();
        return b
    }
    if (void 0 === b || null === b)
        b = {};
    var d = new JSM.BinaryReader(a,!0);
    d.Skip(80);
    var e = d.ReadUnsignedInteger32(), f, g, h, k, l;
    for (f = 0; f < e; f++)
        if (l = c(d),
        g = c(d),
        h = c(d),
        k = c(d),
        d.Skip(2),
        void 0 !== b.onFace && null !== b.onFace)
            b.onFace(g, h, k, l)
}
;
JSM.ReadAsciiStlFile = function(a, b) {
    function c(a, c) {
        var d = a[c].trim();
        if (0 === d.length)
            return c + 1;
        d = d.split(/\s+/);
        if (0 === d.length)
            return c + 1;
        if ("solid" != d[0] && "facet" == d[0] && "normal" == d[1]) {
            if (5 > d.length)
                return -1;
            var d = [parseFloat(d[2]), parseFloat(d[3]), parseFloat(d[4])], e = [], l, m;
            for (l = c + 1; l < a.length && 3 > e.length; l++)
                if (m = a[l].trim(),
                0 !== m.length && (m = m.split(/\s+/),
                0 !== m.length && "vertex" == m[0]))
                    if (4 > m.length)
                        break;
                    else
                        m = [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])],
                        e.push(m);
            l += 1;
            if (3 != e.length)
                return -1;
            if (void 0 !== b.onFace && null !== b.onFace)
                b.onFace(e[0], e[1], e[2], d);
            return l
        }
        return c + 1
    }
    if (void 0 === b || null === b)
        b = {};
    for (var d = 0, e = a.split("\n"); d < e.length && -1 != d; )
        d = c(e, d)
}
;
JSM.IsBinaryStlFile = function(a) {
    var b = a.byteLength;
    if (84 > b)
        return !1;
    a = new JSM.BinaryReader(a,!0);
    a.Skip(80);
    a = a.ReadUnsignedInteger32();
    return b != 50 * a + 84 ? !1 : !0
}
;
JSM.ConvertStlToJsonData = function(a, b) {
    var c = new JSM.TriangleModel
      , d = c.AddBody(new JSM.TriangleBody("Default"))
      , e = c.GetBody(d);
    null !== a ? JSM.ReadBinaryStlFile(a, {
        onFace: function(a, b, c, d) {
            a = e.AddVertex(a[0], a[1], a[2]);
            b = e.AddVertex(b[0], b[1], b[2]);
            c = e.AddVertex(c[0], c[1], c[2]);
            d = (new JSM.Vector(d[0],d[1],d[2])).Normalize();
            d = e.AddNormal(d.x, d.y, d.z);
            e.AddTriangle(a, b, c, d, d, d)
        }
    }) : null !== b && JSM.ReadAsciiStlFile(b, {
        onFace: function(a, b, c, d) {
            a = e.AddVertex(a[0], a[1], a[2]);
            b = e.AddVertex(b[0], b[1], b[2]);
            c = e.AddVertex(c[0], c[1], c[2]);
            d = (new JSM.Vector(d[0],d[1],d[2])).Normalize();
            d = e.AddNormal(d.x, d.y, d.z);
            e.AddTriangle(a, b, c, d, d, d)
        }
    });
    c.Finalize();
    return JSM.ConvertTriangleModelToJsonData(c)
}
;
JSM.ReadOffFile = function(a, b) {
    if (void 0 === b || null === b)
        b = {};
    var c = {
        offHeaderFound: !1,
        infoFound: !1,
        vertexCount: 0,
        faceCount: 0,
        readVertices: 0,
        readFaces: 0
    }, d = a.split("\n"), e, f;
    for (e = 0; e < d.length; e++) {
        f = d[e].trim();
        var g = c;
        if (0 !== f.length && "#" != f[0] && (f = f.split(/\s+/),
        !(0 === f.length || "#" == f[0][0])))
            if (g.offHeaderFound)
                if (g.infoFound)
                    if (g.readVertices < g.vertexCount) {
                        if (3 == f.length) {
                            var h = parseFloat(f[0])
                              , k = parseFloat(f[1]);
                            f = parseFloat(f[2]);
                            if (void 0 !== b.onVertex && null !== b.onVertex)
                                b.onVertex(h, k, f);
                            g.readVertices += 1
                        }
                    } else {
                        if (g.readFaces < g.faceCount && (h = parseInt(f[0]),
                        f.length >= h + 1)) {
                            for (var k = [], l = void 0, m = void 0, l = 1; l < h + 1; l++)
                                m = parseInt(f[l]),
                                k.push(m);
                            if (void 0 !== b.onFace && null !== b.onFace)
                                b.onFace(k);
                            g.readFaces += 1
                        }
                    }
                else
                    3 == f.length && (g.vertexCount = parseInt(f[0]),
                    g.faceCount = parseInt(f[1]),
                    g.infoFound = !0);
            else
                1 == f.length && "OFF" == f[0] && (g.offHeaderFound = !0)
    }
}
;
JSM.ConvertOffToJsonData = function(a) {
    var b = new JSM.TriangleModel
      , c = b.AddBody(new JSM.TriangleBody("Default"))
      , d = b.GetBody(c);
    JSM.ReadOffFile(a, {
        onVertex: function(a, b, c) {
            d.AddVertex(a, b, c)
        },
        onFace: function(a) {
            var b, c, h, k, l = a.length;
            for (b = 0; b < l - 2; b++)
                c = a[0],
                h = a[b + 1],
                k = a[b + 2],
                d.AddTriangle(c, h, k)
        }
    });
    b.Finalize();
    return JSM.ConvertTriangleModelToJsonData(b)
}
;
JSM.ImportFileList = function() {
    this.isFile = this.descriptors = null
}
;
JSM.ImportFileList.prototype.InitFromFiles = function(a) {
    this.descriptors = [];
    var b, c;
    for (b = 0; b < a.length; b++)
        c = a[b],
        c = {
            originalObject: c,
            originalFileName: c.name,
            fileName: c.name.toUpperCase(),
            extension: this.GetFileExtension(c.name).toUpperCase()
        },
        this.descriptors.push(c);
    this.isFile = !0
}
;
JSM.ImportFileList.prototype.InitFromURLs = function(a) {
    this.descriptors = [];
    var b, c, d;
    for (b = 0; b < a.length; b++)
        c = a[b],
        d = this.GetFileName(c),
        c = {
            originalObject: c,
            originalFileName: d,
            fileName: d.toUpperCase(),
            extension: this.GetFileExtension(d).toUpperCase()
        },
        this.descriptors.push(c);
    this.isFile = !1
}
;
JSM.ImportFileList.prototype.GetInputList = function() {
    var a = [], b, c, d;
    for (b = 0; b < this.descriptors.length; b++) {
        c = this.descriptors[b];
        d = c.originalObject;
        var e = this.isFile;
        c = ".OBJ" == c.extension || ".MTL" == c.extension || ".OFF" == c.extension ? !1 : !0;
        d = {
            originalObject: d,
            isFile: e,
            isArrayBuffer: c
        };
        a.push(d)
    }
    return a
}
;
JSM.ImportFileList.prototype.GetFileName = function(a) {
    var b = a.split("/");
    1 == b.length && (b = a.split("\\"));
    return 0 === b.length ? "" : decodeURI(b[b.length - 1])
}
;
JSM.ImportFileList.prototype.GetFileDescriptor = function(a) {
    return this.descriptors[a]
}
;
JSM.ImportFileList.prototype.GetMainFileIndex = function() {
    var a, b;
    for (a = 0; a < this.descriptors.length; a++)
        if (b = this.descriptors[a],
        this.IsSupportedExtension(b.extension))
            return a;
    return -1
}
;
JSM.ImportFileList.prototype.GetFileIndexByName = function(a) {
    var b, c, d;
    for (b = 0; b < this.descriptors.length; b++)
        if (c = this.descriptors[b],
        d = this.GetFileName(a),
        c.fileName == d.toUpperCase())
            return b;
    return -1
}
;
JSM.ImportFileList.prototype.IsSupportedExtension = function(a) {
    return ".3DS" == a || ".OBJ" == a || ".STL" == a || ".OFF" == a ? !0 : !1
}
;
JSM.ImportFileList.prototype.GetFileExtension = function(a) {
    var b = a.lastIndexOf(".");
    return -1 == b ? "" : a.substr(b)
}
;
JSM.ConvertImportFileListToJsonData = function(a, b) {
    function c() {
        if (void 0 !== b.onError && null !== b.onError)
            b.onError()
    }
    function d(a, c) {
        if (void 0 !== b.onReady && null !== b.onReady)
            b.onReady(a, c)
    }
    function e(a, b, c, d) {
        var e = a.GetFileIndexByName(c);
        a = a.GetFileName(c);
        if (-1 == e)
            return d.missing.push(a),
            null;
        -1 == d.requested.indexOf(a) && d.requested.push(a);
        return b[e]
    }
    var f = a.GetMainFileIndex();
    if (-1 === f)
        c();
    else {
        var g = a.GetFileDescriptor(f)
          , h = {
            main: g.originalFileName,
            requested: [],
            missing: []
        }
          , k = a.GetInputList();
        try {
            ".3DS" == g.extension ? JSM.LoadMultipleBuffers(k, function(b) {
                var g = b[f];
                null === g ? c() : (g = JSM.Convert3dsToJsonData(g, {
                    onFileRequested: function(c) {
                        return e(a, b, c, h)
                    }
                }),
                d(h, g))
            }) : ".OBJ" == g.extension ? JSM.LoadMultipleBuffers(k, function(b) {
                var g = b[f];
                null === g ? c() : (g = JSM.ConvertObjToJsonData(g, {
                    onFileRequested: function(c) {
                        return e(a, b, c, h)
                    }
                }),
                d(h, g))
            }) : ".STL" == g.extension ? JSM.LoadMultipleBuffers(k, function(a) {
                a = a[f];
                if (null === a)
                    c();
                else if (JSM.IsBinaryStlFile(a))
                    a = JSM.ConvertStlToJsonData(a, null),
                    d(h, a);
                else {
                    for (a = 0; a < k.length; a++)
                        k[a].isArrayBuffer = !1;
                    JSM.LoadMultipleBuffers(k, function(a) {
                        a = a[f];
                        null === a ? c() : (a = JSM.ConvertStlToJsonData(null, a),
                        d(h, a))
                    })
                }
            }) : ".OFF" == g.extension && JSM.LoadMultipleBuffers(k, function(a) {
                a = a[f];
                null === a ? c() : (a = JSM.ConvertOffToJsonData(a),
                d(h, a))
            })
        } catch (l) {
            c()
        }
    }
}
;
JSM.ConvertFileListToJsonData = function(a, b) {
    var c = new JSM.ImportFileList;
    c.InitFromFiles(a);
    JSM.ConvertImportFileListToJsonData(c, b)
}
;
JSM.ConvertURLListToJsonData = function(a, b) {
    var c = new JSM.ImportFileList;
    c.InitFromURLs(a);
    JSM.ConvertImportFileListToJsonData(c, b)
}
;
JSM.IsPowerOfTwo = function(a) {
    return a & 0 === a - 1
}
;
JSM.NextPowerOfTwo = function(a) {
    if (JSM.IsPowerOfTwo(a))
        return a;
    for (var b = 1; b < a; )
        b *= 2;
    return b
}
;
JSM.ResizeImageToPowerOfTwoSides = function(a) {
    if (JSM.IsPowerOfTwo(a.width) && !JSM.IsPowerOfTwo(a.height))
        return a;
    var b = JSM.NextPowerOfTwo(a.width)
      , c = JSM.NextPowerOfTwo(a.height)
      , d = document.createElement("canvas");
    d.width = b;
    d.height = c;
    d = d.getContext("2d");
    d.drawImage(a, 0, 0, b, c);
    return d.getImageData(0, 0, b, c)
}
;
JSM.WebGLInitContext = function(a) {
    if (null === a || void 0 === a.getContext)
        return null;
    var b = a.getContext("webgl") || a.getContext("experimental-webgl");
    if (null === b)
        return null;
    b.viewport(0, 0, a.width, a.height);
    b.clearColor(1, 1, 1, 1);
    return b
}
;
JSM.WebGLInitShaderProgram = function(a, b, c, d) {
    function e(a, b, c, d) {
        c = a.createShader(c);
        a.shaderSource(c, b);
        a.compileShader(c);
        return !a.getShaderParameter(c, a.COMPILE_STATUS) ? (void 0 !== d && null !== d && d(a.getShaderInfoLog(c)),
        null) : c
    }
    b = function(a, b, c, d) {
        b = e(a, b, a.FRAGMENT_SHADER, d);
        c = e(a, c, a.VERTEX_SHADER, d);
        if (null === b || null === c)
            return null;
        d = a.createProgram();
        a.attachShader(d, c);
        a.attachShader(d, b);
        a.linkProgram(d);
        return !a.getProgramParameter(d, a.LINK_STATUS) ? null : d
    }(a, c, b, d);
    if (null === b)
        return null;
    a.useProgram(b);
    return b
}
;
JSM.WebGLGetFloatTextureBufferSize = function(a) {
    return JSM.NextPowerOfTwo(Math.ceil(Math.sqrt(a.length / 4)))
}
;
JSM.WebGLCreateFloatTextureBuffer = function(a, b, c) {
    var d = null;
    if (null !== b) {
        for (; b.length < 4 * c * c; )
            b.push(0);
        d = new Float32Array(b)
    }
    b = a.createTexture();
    a.bindTexture(a.TEXTURE_2D, b);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
    a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, c, c, 0, a.RGBA, a.FLOAT, d);
    a.bindTexture(a.TEXTURE_2D, null);
    return b
}
;
JSM.RenderAmbientLight = function(a) {
    this.color = JSM.HexColorToNormalizedRGBComponents(a)
}
;
JSM.RenderDirectionalLight = function(a, b, c) {
    this.diffuse = JSM.HexColorToNormalizedRGBComponents(a);
    this.specular = JSM.HexColorToNormalizedRGBComponents(b);
    this.direction = c.Clone()
}
;
JSM.RenderMaterialFlags = {
    Point: 1,
    Line: 2,
    Triangle: 4,
    Textured: 8,
    Transparent: 16
};
JSM.RenderMaterial = function(a, b) {
    this.type = a;
    this.ambient = [0, 0.8, 0];
    this.diffuse = [0, 0.8, 0];
    this.specular = [0, 0, 0];
    this.shininess = 0;
    this.opacity = 1;
    this.reflection = 0;
    this.singleSided = !1;
    this.pointSize = 0.1;
    this.texture = null;
    JSM.CopyObjectProperties(b, this, !0)
}
;
JSM.RenderMaterial.prototype.SetType = function(a) {
    this.type = a
}
;
JSM.RenderMaterial.prototype.SetBuffers = function(a, b) {
    this.textureBuffer = a;
    this.textureImage = b
}
;
JSM.RenderMesh = function(a) {
    this.material = a;
    this.uvBuffer = this.normalBuffer = this.vertexBuffer = this.uvArray = this.normalArray = this.vertexArray = null
}
;
JSM.RenderMesh.prototype.SetMaterial = function(a) {
    this.material = a
}
;
JSM.RenderMesh.prototype.GetMaterial = function() {
    return this.material
}
;
JSM.RenderMesh.prototype.SetVertexArray = function(a) {
    this.vertexArray = new Float32Array(a)
}
;
JSM.RenderMesh.prototype.SetNormalArray = function(a) {
    this.normalArray = new Float32Array(a)
}
;
JSM.RenderMesh.prototype.SetUVArray = function(a) {
    this.uvArray = new Float32Array(a)
}
;
JSM.RenderMesh.prototype.HasVertexArray = function() {
    return null !== this.vertexArray
}
;
JSM.RenderMesh.prototype.HasNormalArray = function() {
    return null !== this.normalArray
}
;
JSM.RenderMesh.prototype.HasUVArray = function() {
    return null !== this.uvArray
}
;
JSM.RenderMesh.prototype.GetVertexArray = function() {
    return this.vertexArray
}
;
JSM.RenderMesh.prototype.GetNormalArray = function() {
    return this.normalArray
}
;
JSM.RenderMesh.prototype.GetUVArray = function() {
    return this.uvArray
}
;
JSM.RenderMesh.prototype.SetBuffers = function(a, b, c) {
    this.vertexBuffer = a;
    this.normalBuffer = b;
    this.uvBuffer = c
}
;
JSM.RenderMesh.prototype.GetVertexBuffer = function() {
    return this.vertexBuffer
}
;
JSM.RenderMesh.prototype.GetNormalBuffer = function() {
    return this.normalBuffer
}
;
JSM.RenderMesh.prototype.GetUVBuffer = function() {
    return this.uvBuffer
}
;
JSM.RenderMesh.prototype.VertexCount = function() {
    return parseInt(this.vertexArray.length / 3, 10)
}
;
JSM.RenderMesh.prototype.NormalCount = function() {
    return parseInt(this.normalArray.length / 3, 10)
}
;
JSM.RenderMesh.prototype.UVCount = function() {
    return parseInt(this.uvArray.length / 2, 10)
}
;
JSM.RenderMesh.prototype.GetVertex = function(a) {
    return new JSM.Coord(this.vertexArray[3 * a],this.vertexArray[3 * a + 1],this.vertexArray[3 * a + 2])
}
;
JSM.RenderMesh.prototype.GetTransformedVertex = function(a, b) {
    var c = this.GetVertex(a);
    return b.Apply(c)
}
;
JSM.RenderBody = function() {
    this.transformation = new JSM.Transformation;
    this.meshes = {}
}
;
JSM.RenderBody.prototype.AddMesh = function(a) {
    void 0 === this.meshes[a.material.type] && (this.meshes[a.material.type] = []);
    this.meshes[a.material.type].push(a)
}
;
JSM.RenderBody.prototype.EnumerateMeshes = function(a) {
    for (var b in this.meshes)
        this.meshes.hasOwnProperty(b) && this.EnumerateTypedMeshes(b, a)
}
;
JSM.RenderBody.prototype.HasTypedMeshes = function(a) {
    return void 0 !== this.meshes[a]
}
;
JSM.RenderBody.prototype.EnumerateTypedMeshes = function(a, b) {
    if (this.HasTypedMeshes(a)) {
        var c = this.meshes[a], d, e;
        for (d = 0; d < c.length; d++)
            e = c[d],
            b(e)
    }
}
;
JSM.RenderBody.prototype.EnumerateMeshesWithFlag = function(a, b) {
    for (var c in this.meshes)
        this.meshes.hasOwnProperty(c) && c & a && this.EnumerateTypedMeshes(c, b)
}
;
JSM.RenderBody.prototype.GetTransformation = function() {
    return this.transformation
}
;
JSM.RenderBody.prototype.GetTransformationMatrix = function() {
    return this.transformation.matrix
}
;
JSM.RenderBody.prototype.SetTransformation = function(a) {
    this.transformation = a
}
;
JSM.RenderBody.prototype.AppendTransformation = function(a) {
    this.transformation.Append(a)
}
;
JSM.ShaderType = {
    Point: 0,
    Line: 1,
    Triangle: 2,
    TexturedTriangle: 3
};
JSM.ShaderProgram = function(a) {
    this.context = a;
    this.cullEnabled = this.currentType = this.currentShader = this.shaders = this.globalParams = null
}
;
JSM.ShaderProgram.prototype.Init = function() {
    return !this.InitGlobalParams() || !this.InitShaders() ? !1 : !0
}
;
JSM.ShaderProgram.prototype.GetMaxLightCount = function() {
    return this.globalParams.maxLightCount
}
;
JSM.ShaderProgram.prototype.InitGlobalParams = function() {
    this.globalParams = {
        noDirectionalLight: new JSM.RenderDirectionalLight(0,0,new JSM.Vector(0,0,0)),
        maxLightCount: 4
    };
    return !0
}
;
JSM.ShaderProgram.prototype.InitShaders = function() {
    function a(a, b) {
        var c = null;
        if (a == JSM.ShaderType.Point || a == JSM.ShaderType.Line)
            c = ["#define MAX_LIGHTS " + b.maxLightCount, "struct Light\n{\n\tmediump vec3 diffuseColor;\n};\nstruct Material\n{\n\tmediump vec3 ambientColor;\n\tmediump vec3 diffuseColor;\n};\nuniform mediump vec3 uAmbientLightColor;\nuniform Light uLights[MAX_LIGHTS];\nuniform Material uMaterial;\nvoid main (void) {\n\tmediump vec3 ambientComponent = uMaterial.ambientColor * uAmbientLightColor;\n\tmediump vec3 diffuseComponent = vec3 (0.0, 0.0, 0.0);\n\tfor (int i = 0; i < MAX_LIGHTS; i++) {\n\t\tdiffuseComponent += uMaterial.diffuseColor * uLights[i].diffuseColor;\n\t}\n\tgl_FragColor = vec4 (ambientComponent + diffuseComponent, 1.0);\n}"].join("\n");
        else if (a == JSM.ShaderType.Triangle || a == JSM.ShaderType.TexturedTriangle)
            c = ["#define " + (a == JSM.ShaderType.Triangle ? "NOTEXTURE" : "USETEXTURE"), "#define MAX_LIGHTS " + b.maxLightCount, "struct Light\n{\n\tmediump vec3 diffuseColor;\n\tmediump vec3 specularColor;\n\tmediump vec3 direction;\n};\nstruct Material\n{\n\tmediump vec3 ambientColor;\n\tmediump vec3 diffuseColor;\n\tmediump vec3 specularColor;\n\tmediump float shininess;\n\tmediump float opacity;\n};\nuniform mediump vec3 uAmbientLightColor;\nuniform Light uLights[MAX_LIGHTS];\nuniform Material uMaterial;\nvarying mediump vec3 vVertex;\nvarying mediump vec3 vNormal;\n#ifdef USETEXTURE\nvarying mediump vec2 vUV;\nuniform sampler2D uSampler;\n#endif\nvoid main (void) {\n\tmediump vec3 N = normalize (vNormal);\n\tif (!gl_FrontFacing) {\n\t\tN = -N;\n\t}\n\tmediump vec3 ambientComponent = uMaterial.ambientColor * uAmbientLightColor;\n\tmediump vec3 diffuseComponent = vec3 (0.0, 0.0, 0.0);\n\tmediump vec3 specularComponent = vec3 (0.0, 0.0, 0.0);\n\tmediump vec3 E = normalize (-vVertex);\n\tfor (int i = 0; i < MAX_LIGHTS; i++) {\n\t\tmediump vec3 L = normalize (-uLights[i].direction);\n\t\tmediump vec3 R = normalize (-reflect (L, N));\n\t\tdiffuseComponent += uMaterial.diffuseColor * uLights[i].diffuseColor * max (dot (N, L), 0.0);\n\t\tspecularComponent += uMaterial.specularColor * uLights[i].specularColor * pow (max (dot (R, E), 0.0), uMaterial.shininess);\n\t}\n#ifdef USETEXTURE\n\tmediump vec3 textureColor = texture2D (uSampler, vec2 (vUV.s, vUV.t)).xyz;\n\tambientComponent = ambientComponent * textureColor;\n\tdiffuseComponent = diffuseComponent * textureColor;\n\tspecularComponent = specularComponent * textureColor;\n#endif\n\tambientComponent = clamp (ambientComponent, 0.0, 1.0);\n\tdiffuseComponent = clamp (diffuseComponent, 0.0, 1.0);\n\tspecularComponent = clamp (specularComponent, 0.0, 1.0);\n\tgl_FragColor = vec4 (ambientComponent + diffuseComponent + specularComponent, uMaterial.opacity);\n}"].join("\n");
        return c
    }
    function b(a) {
        var b = null;
        if (a == JSM.ShaderType.Triangle || a == JSM.ShaderType.TexturedTriangle)
            b = ["#define " + (a == JSM.ShaderType.Triangle ? "NOTEXTURE" : "USETEXTURE"), "attribute mediump vec3 aVertexPosition;\nattribute mediump vec3 aVertexNormal;\nuniform mediump mat4 uViewMatrix;\nuniform mediump mat4 uProjectionMatrix;\nuniform mediump mat4 uTransformationMatrix;\nvarying mediump vec3 vVertex;\nvarying mediump vec3 vNormal;\n#ifdef USETEXTURE\nattribute mediump vec2 aVertexUV;\nvarying mediump vec2 vUV;\n#endif\nvoid main (void) {\n\tmat4 modelViewMatrix = uViewMatrix * uTransformationMatrix;\n\tvVertex = vec3 (modelViewMatrix * vec4 (aVertexPosition, 1.0));\n\tvNormal = normalize (vec3 (modelViewMatrix * vec4 (aVertexNormal, 0.0)));\n#ifdef USETEXTURE\n\tvUV = aVertexUV;\n#endif\n\tgl_Position = uProjectionMatrix * vec4 (vVertex, 1.0);\n}"].join("\n");
        else if (a == JSM.ShaderType.Point || a == JSM.ShaderType.Line)
            b = ["#define " + (a == JSM.ShaderType.Point ? "POINT" : "LINE"), "attribute mediump vec3 aVertexPosition;\nuniform mediump mat4 uViewMatrix;\nuniform mediump mat4 uProjectionMatrix;\nuniform mediump mat4 uTransformationMatrix;\n#ifdef POINT\nuniform mediump float uPointSize;\n#endif\nvarying mediump vec3 vVertex;\nvoid main (void) {\n\tmat4 modelViewMatrix = uViewMatrix * uTransformationMatrix;\n\tvVertex = vec3 (modelViewMatrix * vec4 (aVertexPosition, 1.0));\n#ifdef POINT\n\tconst mediump float scale = 200.0;\n\tgl_PointSize = uPointSize * (scale / length (vVertex));\n#endif\n\tgl_Position = uProjectionMatrix * vec4 (vVertex, 1.0);\n}"].join("\n");
        return b
    }
    function c(a, b, c, d) {
        if (d == JSM.ShaderType.Triangle || d == JSM.ShaderType.TexturedTriangle) {
            b.vertexPositionAttribute = a.getAttribLocation(b, "aVertexPosition");
            b.vertexNormalAttribute = a.getAttribLocation(b, "aVertexNormal");
            b.ambientLightColorUniform = a.getUniformLocation(b, "uAmbientLightColor");
            b.lightUniforms = [];
            var k;
            for (k = 0; k < c.maxLightCount; k++)
                b.lightUniforms.push({
                    diffuseColor: a.getUniformLocation(b, "uLights[" + k + "].diffuseColor"),
                    specularColor: a.getUniformLocation(b, "uLights[" + k + "].specularColor"),
                    direction: a.getUniformLocation(b, "uLights[" + k + "].direction")
                });
            b.materialUniforms = {
                ambientColor: a.getUniformLocation(b, "uMaterial.ambientColor"),
                diffuseColor: a.getUniformLocation(b, "uMaterial.diffuseColor"),
                specularColor: a.getUniformLocation(b, "uMaterial.specularColor"),
                shininess: a.getUniformLocation(b, "uMaterial.shininess"),
                opacity: a.getUniformLocation(b, "uMaterial.opacity")
            };
            b.vMatrixUniform = a.getUniformLocation(b, "uViewMatrix");
            b.pMatrixUniform = a.getUniformLocation(b, "uProjectionMatrix");
            b.tMatrixUniform = a.getUniformLocation(b, "uTransformationMatrix");
            d == JSM.ShaderType.TexturedTriangle && (b.vertexUVAttribute = a.getAttribLocation(b, "aVertexUV"),
            b.samplerUniform = a.getUniformLocation(b, "uSampler"))
        } else if (d == JSM.ShaderType.Point || d == JSM.ShaderType.Line) {
            b.vertexPositionAttribute = a.getAttribLocation(b, "aVertexPosition");
            b.ambientLightColorUniform = a.getUniformLocation(b, "uAmbientLightColor");
            b.lightUniforms = [];
            for (k = 0; k < c.maxLightCount; k++)
                b.lightUniforms.push({
                    diffuseColor: a.getUniformLocation(b, "uLights[" + k + "].diffuseColor")
                });
            b.materialUniforms = {
                ambientColor: a.getUniformLocation(b, "uMaterial.ambientColor"),
                diffuseColor: a.getUniformLocation(b, "uMaterial.diffuseColor")
            };
            b.vMatrixUniform = a.getUniformLocation(b, "uViewMatrix");
            b.pMatrixUniform = a.getUniformLocation(b, "uProjectionMatrix");
            b.tMatrixUniform = a.getUniformLocation(b, "uTransformationMatrix");
            d == JSM.ShaderType.Point && (b.pointSizeUniform = a.getUniformLocation(b, "uPointSize"))
        }
    }
    function d(d, f, g, h) {
        var k = b(h)
          , l = a(h, g);
        if (null === k || null === l)
            return !1;
        k = JSM.WebGLInitShaderProgram(d, k, l, function(a) {
            JSM.Message(a)
        });
        if (null === k)
            return !1;
        d.useProgram(k);
        c(d, k, g, h);
        f[h] = k;
        return !0
    }
    this.shaders = {};
    if (!d(this.context, this.shaders, this.globalParams, JSM.ShaderType.Point) || !d(this.context, this.shaders, this.globalParams, JSM.ShaderType.Line) || !d(this.context, this.shaders, this.globalParams, JSM.ShaderType.Triangle) || !d(this.context, this.shaders, this.globalParams, JSM.ShaderType.TexturedTriangle))
        return !1;
    this.context.enable(this.context.DEPTH_TEST);
    this.context.depthFunc(this.context.LEQUAL);
    this.context.enable(this.context.BLEND);
    this.context.blendEquation(this.context.FUNC_ADD);
    this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE_MINUS_SRC_ALPHA);
    this.context.disable(this.context.CULL_FACE);
    this.cullEnabled = !1;
    return !0
}
;
JSM.ShaderProgram.prototype.CompileMaterial = function(a, b) {
    if (null !== a.texture) {
        var c = this.context
          , d = c.createTexture()
          , e = new Image;
        e.src = a.texture;
        e.onload = function() {
            var a = JSM.ResizeImageToPowerOfTwoSides(e);
            c.bindTexture(c.TEXTURE_2D, d);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.LINEAR);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.LINEAR_MIPMAP_LINEAR);
            c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, a);
            c.generateMipmap(c.TEXTURE_2D);
            c.bindTexture(c.TEXTURE_2D, null);
            void 0 !== b && null !== b && b()
        }
        ;
        a.SetBuffers(d, e)
    }
}
;
JSM.ShaderProgram.prototype.CompileMesh = function(a) {
    var b = this.context
      , c = b.createBuffer();
    b.bindBuffer(b.ARRAY_BUFFER, c);
    b.bufferData(b.ARRAY_BUFFER, a.GetVertexArray(), b.STATIC_DRAW);
    c.itemSize = 3;
    c.numItems = a.VertexCount();
    var d = null;
    a.HasNormalArray() && (d = b.createBuffer(),
    b.bindBuffer(b.ARRAY_BUFFER, d),
    b.bufferData(b.ARRAY_BUFFER, a.GetNormalArray(), b.STATIC_DRAW),
    d.itemSize = 3,
    d.numItems = a.NormalCount());
    var e = null;
    a.HasUVArray() && (e = b.createBuffer(),
    b.bindBuffer(b.ARRAY_BUFFER, e),
    b.bufferData(b.ARRAY_BUFFER, a.GetUVArray(), b.STATIC_DRAW),
    e.itemSize = 2,
    e.numItems = a.UVCount());
    a.SetBuffers(c, d, e)
}
;
JSM.ShaderProgram.prototype.GetShader = function(a) {
    return this.shaders[a]
}
;
JSM.ShaderProgram.prototype.UseShader = function(a) {
    this.currentShader = this.GetShader(a);
    this.currentType = a;
    this.context.useProgram(this.currentShader)
}
;
JSM.ShaderProgram.prototype.SetParameters = function(a, b, c, d) {
    var e = this.context, f = this.currentShader, g, h;
    if (this.currentType == JSM.ShaderType.Triangle || this.currentType == JSM.ShaderType.TexturedTriangle) {
        e.uniform3f(f.ambientLightColorUniform, a.color[0], a.color[1], a.color[2]);
        for (a = 0; a < this.globalParams.maxLightCount; a++)
            g = a < b.length ? b[a] : this.globalParams.noDirectionalLight,
            h = JSM.ApplyRotation(c, g.direction),
            e.uniform3f(f.lightUniforms[a].diffuseColor, g.diffuse[0], g.diffuse[1], g.diffuse[2]),
            e.uniform3f(f.lightUniforms[a].specularColor, g.specular[0], g.specular[1], g.specular[2]),
            e.uniform3f(f.lightUniforms[a].direction, h.x, h.y, h.z);
        e.uniformMatrix4fv(f.pMatrixUniform, !1, d);
        e.uniformMatrix4fv(f.vMatrixUniform, !1, c)
    } else if (this.currentType == JSM.ShaderType.Point || this.currentType == JSM.ShaderType.Line) {
        e.uniform3f(f.ambientLightColorUniform, a.color[0], a.color[1], a.color[2]);
        for (a = 0; a < this.globalParams.maxLightCount; a++)
            g = a < b.length ? b[a] : this.globalParams.noDirectionalLight,
            e.uniform3f(f.lightUniforms[a].diffuseColor, g.diffuse[0], g.diffuse[1], g.diffuse[2]);
        e.uniformMatrix4fv(f.pMatrixUniform, !1, d);
        e.uniformMatrix4fv(f.vMatrixUniform, !1, c)
    }
}
;
JSM.ShaderProgram.prototype.SetCullEnabled = function(a) {
    a && !this.cullEnabled ? (this.context.enable(this.context.CULL_FACE),
    this.cullEnabled = !0) : !a && this.cullEnabled && (this.context.disable(this.context.CULL_FACE),
    this.cullEnabled = !1)
}
;
JSM.ShaderProgram.prototype.DrawArrays = function(a, b, c, d, e) {
    var f = this.context
      , g = this.currentShader;
    this.SetCullEnabled(a.singleSided);
    if (this.currentType == JSM.ShaderType.Triangle || this.currentType == JSM.ShaderType.TexturedTriangle)
        f.uniform3f(g.materialUniforms.ambientColor, a.ambient[0], a.ambient[1], a.ambient[2]),
        f.uniform3f(g.materialUniforms.diffuseColor, a.diffuse[0], a.diffuse[1], a.diffuse[2]),
        f.uniform3f(g.materialUniforms.specularColor, a.specular[0], a.specular[1], a.specular[2]),
        f.uniform1f(g.materialUniforms.shininess, a.shininess),
        f.uniform1f(g.materialUniforms.opacity, a.opacity),
        f.uniformMatrix4fv(g.tMatrixUniform, !1, b),
        f.bindBuffer(f.ARRAY_BUFFER, c),
        f.enableVertexAttribArray(g.vertexPositionAttribute),
        f.vertexAttribPointer(g.vertexPositionAttribute, c.itemSize, f.FLOAT, !1, 0, 0),
        f.bindBuffer(f.ARRAY_BUFFER, d),
        f.enableVertexAttribArray(g.vertexNormalAttribute),
        f.vertexAttribPointer(g.vertexNormalAttribute, d.itemSize, f.FLOAT, !1, 0, 0),
        this.currentType == JSM.ShaderType.TexturedTriangle && (f.activeTexture(f.TEXTURE0),
        f.bindTexture(f.TEXTURE_2D, a.textureBuffer),
        f.bindBuffer(f.ARRAY_BUFFER, e),
        f.enableVertexAttribArray(g.vertexUVAttribute),
        f.vertexAttribPointer(g.vertexUVAttribute, e.itemSize, f.FLOAT, !1, 0, 0),
        f.uniform1i(g.samplerUniform, 0)),
        f.drawArrays(f.TRIANGLES, 0, c.numItems);
    else if (this.currentType == JSM.ShaderType.Point || this.currentType == JSM.ShaderType.Line)
        f.uniform3f(g.materialUniforms.ambientColor, a.ambient[0], a.ambient[1], a.ambient[2]),
        f.uniform3f(g.materialUniforms.diffuseColor, a.diffuse[0], a.diffuse[1], a.diffuse[2]),
        f.uniformMatrix4fv(g.tMatrixUniform, !1, b),
        f.bindBuffer(f.ARRAY_BUFFER, c),
        f.enableVertexAttribArray(g.vertexPositionAttribute),
        f.vertexAttribPointer(g.vertexPositionAttribute, c.itemSize, f.FLOAT, !1, 0, 0),
        this.currentType == JSM.ShaderType.Point ? (f.uniform1f(g.pointSizeUniform, a.pointSize),
        f.drawArrays(f.POINTS, 0, c.numItems)) : this.currentType == JSM.ShaderType.Line && f.drawArrays(f.LINES, 0, c.numItems)
}
;
JSM.Renderer = function() {
    this.bodies = this.directionalLights = this.ambientLight = this.shader = this.context = this.canvas = null
}
;
JSM.Renderer.prototype.Init = function(a) {
    return !JSM.IsWebGLEnabled() || !this.InitContext(a) || !this.InitView() || !this.InitShaders() || !this.InitLights() || !this.InitBodies() ? !1 : !0
}
;
JSM.Renderer.prototype.InitContext = function(a) {
    this.canvas = a;
    if (null === this.canvas || void 0 === this.canvas.getContext)
        return !1;
    this.context = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
    if (null === this.context)
        return !1;
    this.context = JSM.WebGLInitContext(a);
    return null === this.context ? !1 : !0
}
;
JSM.Renderer.prototype.InitShaders = function() {
    this.shader = new JSM.ShaderProgram(this.context);
    return this.shader.Init()
}
;
JSM.Renderer.prototype.InitLights = function() {
    this.ambientLight = new JSM.RenderAmbientLight(0);
    this.directionalLights = [];
    return !0
}
;
JSM.Renderer.prototype.InitBodies = function() {
    this.bodies = [];
    return !0
}
;
JSM.Renderer.prototype.InitView = function() {
    this.directionalLights = [];
    return !0
}
;
JSM.Renderer.prototype.SetClearColor = function(a, b, c) {
    this.context.clearColor(a, b, c, 1)
}
;
JSM.Renderer.prototype.SetAmbientLight = function(a) {
    this.ambientLight = a
}
;
JSM.Renderer.prototype.AddLight = function(a) {
    var b = this.shader.GetMaxLightCount();
    if (this.directionalLights.length >= b)
        return -1;
    this.directionalLights.push(a);
    return this.directionalLights.length - 1
}
;
JSM.Renderer.prototype.RemoveLight = function(a) {
    a = this.directionalLights.indexOf(a);
    -1 != a && this.directionalLights.splice(a, 1)
}
;
JSM.Renderer.prototype.RemoveLights = function() {
    this.directionalLights = []
}
;
JSM.Renderer.prototype.GetLight = function(a) {
    return this.directionalLights[a]
}
;
JSM.Renderer.prototype.AddBody = function(a, b) {
    var c = this.shader;
    a.EnumerateMeshes(function(a) {
        c.CompileMaterial(a.GetMaterial(), b);
        c.CompileMesh(a)
    });
    this.bodies.push(a)
}
;
JSM.Renderer.prototype.AddBodies = function(a, b) {
    var c, d;
    for (c = 0; c < a.length; c++)
        d = a[c],
        this.AddBody(d, b)
}
;
JSM.Renderer.prototype.EnumerateBodies = function(a) {
    var b;
    for (b = 0; b < this.bodies.length; b++)
        a(this.bodies[b])
}
;
JSM.Renderer.prototype.RemoveBody = function(a) {
    a = this.bodies.indexOf(a);
    -1 != a && this.bodies.splice(a, 1)
}
;
JSM.Renderer.prototype.RemoveBodies = function() {
    this.bodies = []
}
;
JSM.Renderer.prototype.GetBody = function(a) {
    return this.bodies[a]
}
;
JSM.Renderer.prototype.Resize = function() {
    this.context.viewport(0, 0, this.canvas.width, this.canvas.height)
}
;
JSM.Renderer.prototype.FindObjects = function(a, b, c) {
    b = new JSM.Coord(b,this.canvas.height - c,0.5);
    b = JSM.Unproject(b, a.eye, a.center, a.up, a.fieldOfView * JSM.DegRad, this.canvas.width / this.canvas.height, a.nearClippingPlane, a.farClippingPlane, [0, 0, this.canvas.width, this.canvas.height]);
    var d = new JSM.Ray(a.eye,JSM.CoordSub(b, a.eye),null)
      , e = [];
    this.EnumerateBodies(function(a) {
        var b = a.GetTransformation();
        a.EnumerateMeshesWithFlag(JSM.RenderMaterialFlags.Triangle, function(c) {
            var k = c.VertexCount(), l, m, n, q;
            for (l = 0; l < k; l += 3)
                m = c.GetTransformedVertex(l + 0, b),
                n = c.GetTransformedVertex(l + 1, b),
                q = c.GetTransformedVertex(l + 2, b),
                m = JSM.RayTriangleIntersection(d, m, n, q),
                null !== m && e.push({
                    renderBody: a,
                    renderMesh: c,
                    triangleIndex: parseInt(l / 3, 10),
                    intersection: m
                })
        })
    });
    e.sort(function(a, b) {
        return a.intersection.distance - b.intersection.distance
    });
    return e
}
;
JSM.Renderer.prototype.Render = function(a) {
    function b(a, b, c, g) {
        function h(a) {
            if (a & JSM.RenderMaterialFlags.Triangle) {
                if (a & JSM.RenderMaterialFlags.Textured)
                    return JSM.ShaderType.TexturedTriangle;
                if (!(a & JSM.RenderMaterialFlags.Textured))
                    return JSM.ShaderType.Triangle
            } else {
                if (a & JSM.RenderMaterialFlags.Line)
                    return JSM.ShaderType.Line;
                if (a & JSM.RenderMaterialFlags.Point)
                    return JSM.ShaderType.Point
            }
            return null
        }
        var k = null;
        a.EnumerateBodies(function(l) {
            if (l.HasTypedMeshes(b)) {
                var m = l.GetTransformationMatrix();
                l.EnumerateTypedMeshes(b, function(l) {
                    null === k && (k = h(b),
                    a.shader.UseShader(k),
                    a.shader.SetParameters(a.ambientLight, a.directionalLights, c, g));
                    var q = l.GetMaterial()
                      , p = l.GetVertexBuffer()
                      , r = l.GetNormalBuffer();
                    l = l.GetUVBuffer();
                    a.shader.DrawArrays(q, m, p, r, l)
                })
            }
        })
    }
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
    var c = JSM.MatrixView(a.eye, a.center, a.up);
    a = JSM.MatrixPerspective(a.fieldOfView * JSM.DegRad, this.canvas.width / this.canvas.height, a.nearClippingPlane, a.farClippingPlane);
    b(this, JSM.RenderMaterialFlags.Triangle, c, a);
    b(this, JSM.RenderMaterialFlags.Triangle + JSM.RenderMaterialFlags.Textured, c, a);
    b(this, JSM.RenderMaterialFlags.Line, c, a);
    b(this, JSM.RenderMaterialFlags.Point, c, a);
    b(this, JSM.RenderMaterialFlags.Triangle + JSM.RenderMaterialFlags.Transparent, c, a);
    b(this, JSM.RenderMaterialFlags.Triangle + JSM.RenderMaterialFlags.Transparent + JSM.RenderMaterialFlags.Textured, c, a)
}
;
JSM.PointCloudRenderer = function() {
    this.pointSize = this.points = this.camera = this.shader = this.context = this.canvas = null
}
;
JSM.PointCloudRenderer.prototype.Init = function(a, b) {
    return !JSM.IsWebGLEnabled() || !this.InitContext(a) || !this.InitShaders() || !this.InitBuffers() || !this.InitView(b) ? !1 : !0
}
;
JSM.PointCloudRenderer.prototype.InitContext = function(a) {
    this.canvas = a;
    if (null === this.canvas || void 0 === this.canvas.getContext)
        return !1;
    this.context = this.canvas.getContext("experimental-webgl");
    if (null === this.context)
        return !1;
    this.context.clearColor(1, 1, 1, 1);
    this.context.enable(this.context.DEPTH_TEST);
    return !0
}
;
JSM.PointCloudRenderer.prototype.InitShaders = function() {
    function a(a, b, c) {
        c = a.createShader(c);
        a.shaderSource(c, b);
        a.compileShader(c);
        return !a.getShaderParameter(c, a.COMPILE_STATUS) ? null : c
    }
    var b = a(this.context, "varying highp vec3 vColor;\nvoid main (void) {\n\tgl_FragColor = vec4 (vColor, 1.0);\n}", this.context.FRAGMENT_SHADER)
      , c = a(this.context, "attribute highp vec3 aVertexPosition;\nattribute highp vec3 aVertexColor;\nuniform highp mat4 uViewMatrix;\nuniform highp mat4 uProjectionMatrix;\nuniform highp float uPointSize;\nvarying highp vec3 vColor;\nvoid main (void) {\n\tvColor = aVertexColor;\n\tgl_PointSize = uPointSize;\n\tgl_Position = uProjectionMatrix * uViewMatrix * vec4 (aVertexPosition, 1.0);\n}", this.context.VERTEX_SHADER);
    if (null === b || null === c)
        return !1;
    this.shader = this.context.createProgram();
    this.context.attachShader(this.shader, c);
    this.context.attachShader(this.shader, b);
    this.context.linkProgram(this.shader);
    if (!this.context.getProgramParameter(this.shader, this.context.LINK_STATUS))
        return !1;
    this.context.useProgram(this.shader);
    this.shader.vertexPositionAttribute = this.context.getAttribLocation(this.shader, "aVertexPosition");
    this.context.enableVertexAttribArray(this.shader.vertexPositionAttribute);
    this.shader.vertexColorAttribute = this.context.getAttribLocation(this.shader, "aVertexColor");
    this.context.enableVertexAttribArray(this.shader.vertexColorAttribute);
    this.shader.pMatrixUniform = this.context.getUniformLocation(this.shader, "uProjectionMatrix");
    this.shader.vMatrixUniform = this.context.getUniformLocation(this.shader, "uViewMatrix");
    this.shader.pointSizeUniform = this.context.getUniformLocation(this.shader, "uPointSize");
    return !0
}
;
JSM.PointCloudRenderer.prototype.InitBuffers = function() {
    this.points = [];
    this.pointSize = 1;
    return !0
}
;
JSM.PointCloudRenderer.prototype.InitView = function(a) {
    this.camera = JSM.ValueOrDefault(a, new JSM.Camera);
    return !this.camera ? !1 : !0
}
;
JSM.PointCloudRenderer.prototype.SetClearColor = function(a, b, c) {
    this.context.clearColor(a, b, c, 1)
}
;
JSM.PointCloudRenderer.prototype.SetPointSize = function(a) {
    this.pointSize = a
}
;
JSM.PointCloudRenderer.prototype.AddPoints = function(a, b) {
    var c = this.context.createBuffer()
      , d = new Float32Array(a);
    this.context.bindBuffer(this.context.ARRAY_BUFFER, c);
    this.context.bufferData(this.context.ARRAY_BUFFER, d, this.context.STATIC_DRAW);
    c.itemSize = 3;
    c.numItems = parseInt(d.length / 3, 10);
    var e = this.context.createBuffer()
      , f = new Float32Array(b);
    this.context.bindBuffer(this.context.ARRAY_BUFFER, e);
    this.context.bufferData(this.context.ARRAY_BUFFER, f, this.context.STATIC_DRAW);
    e.itemSize = 3;
    e.numItems = parseInt(f.length / 3, 10);
    this.points.push({
        pointArray: d,
        pointBuffer: c,
        colorBuffer: e
    })
}
;
JSM.PointCloudRenderer.prototype.RemovePoints = function() {
    this.points = []
}
;
JSM.PointCloudRenderer.prototype.Resize = function() {
    this.context.viewport(0, 0, this.canvas.width, this.canvas.height)
}
;
JSM.PointCloudRenderer.prototype.Render = function() {
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
    var a = JSM.MatrixPerspective(this.camera.fieldOfView * JSM.DegRad, this.canvas.width / this.canvas.height, this.camera.nearClippingPlane, this.camera.farClippingPlane);
    this.context.uniformMatrix4fv(this.shader.pMatrixUniform, !1, a);
    a = JSM.MatrixView(this.camera.eye, this.camera.center, this.camera.up);
    this.context.uniformMatrix4fv(this.shader.vMatrixUniform, !1, a);
    this.context.uniform1f(this.shader.pointSizeUniform, this.pointSize);
    for (var b, c, a = 0; a < this.points.length; a++)
        b = this.points[a].pointBuffer,
        c = this.points[a].colorBuffer,
        this.context.bindBuffer(this.context.ARRAY_BUFFER, b),
        this.context.vertexAttribPointer(this.shader.vertexPositionAttribute, b.itemSize, this.context.FLOAT, !1, 0, 0),
        this.context.bindBuffer(this.context.ARRAY_BUFFER, c),
        this.context.vertexAttribPointer(this.shader.vertexColorAttribute, c.itemSize, this.context.FLOAT, !1, 0, 0),
        this.context.drawArrays(this.context.POINTS, 0, b.numItems)
}
;
JSM.ConvertBodyToRenderBody = function(a, b, c) {
    function d(a, b) {
        var c = JSM.HexColorToNormalizedRGBComponents(a.ambient)
          , d = JSM.HexColorToNormalizedRGBComponents(a.diffuse)
          , e = JSM.HexColorToNormalizedRGBComponents(a.specular);
        return new JSM.RenderMaterial(b,{
            ambient: c,
            diffuse: d,
            specular: e,
            shininess: a.shininess,
            opacity: a.opacity,
            singleSided: a.singleSided,
            pointSize: a.pointSize,
            texture: a.texture
        })
    }
    var e = !1;
    void 0 !== c && null !== c && (void 0 !== c.hasConvexPolygons && null !== c.hasConvexPolygons) && (e = c.hasConvexPolygons);
    var f = new JSM.RenderBody
      , g = null
      , h = null
      , k = null;
    JSM.ExplodeBody(a, b, {
        hasConvexPolygons: e,
        onPointGeometryStart: function() {
            g = [];
            k = h = null
        },
        onPointGeometryEnd: function(a) {
            a = d(a, JSM.RenderMaterialFlags.Point);
            a = new JSM.RenderMesh(a);
            a.SetVertexArray(g);
            f.AddMesh(a)
        },
        onPoint: function(a) {
            g.push(a.x, a.y, a.z)
        },
        onLineGeometryStart: function() {
            g = [];
            k = h = null
        },
        onLineGeometryEnd: function(a) {
            a = d(a, JSM.RenderMaterialFlags.Line);
            a = new JSM.RenderMesh(a);
            a.SetVertexArray(g);
            f.AddMesh(a)
        },
        onLine: function(a, b) {
            g.push(a.x, a.y, a.z);
            g.push(b.x, b.y, b.z)
        },
        onGeometryStart: function() {
            g = [];
            h = [];
            k = []
        },
        onGeometryEnd: function(a) {
            var b = JSM.RenderMaterialFlags.Triangle;
            null !== a.texture && (b += JSM.RenderMaterialFlags.Textured);
            1 > a.opacity && (b += JSM.RenderMaterialFlags.Transparent);
            b = d(a, b);
            b = new JSM.RenderMesh(b);
            b.SetVertexArray(g);
            b.SetNormalArray(h);
            null !== a.texture && b.SetUVArray(k);
            f.AddMesh(b)
        },
        onTriangle: function(a, b, c, d, e, f, s, v, u) {
            g.push(a.x, a.y, a.z);
            g.push(b.x, b.y, b.z);
            g.push(c.x, c.y, c.z);
            h.push(d.x, d.y, d.z);
            h.push(e.x, e.y, e.z);
            h.push(f.x, f.y, f.z);
            null !== s && (null !== v && null !== u) && (k.push(s.x, s.y),
            k.push(v.x, v.y),
            k.push(u.x, u.y))
        }
    });
    return f
}
;
JSM.ConvertModelToRenderBodies = function(a, b) {
    var c = [], d = a.GetMaterialSet(), e, f;
    for (e = 0; e < a.BodyCount(); e++)
        f = a.GetBody(e),
        f = JSM.ConvertBodyToRenderBody(f, d, b),
        c.push(f);
    return c
}
;
JSM.ConvertJSONDataToRenderBodies = function(a, b) {
    function c(a, b) {
        function c(a, b, d) {
            function e(a, b, c, d, f) {
                var g = new JSM.Vector2D(a,b);
                if (!JSM.IsZero(f)) {
                    var h = Math.sin(f * JSM.DegRad);
                    f = Math.cos(f * JSM.DegRad);
                    g.x = f * a - h * b;
                    g.y = h * a + f * b
                }
                g.x = c[0] + g.x * d[0];
                g.y = c[1] + g.y * d[1];
                return g
            }
            function f(a, b, c, d, e) {
                var g, h, k;
                for (g = 0; 3 > g; g++) {
                    h = c[d + g];
                    for (k = 0; k < e; k++)
                        a.push(b[h * e + k])
                }
            }
            var g = d[b.material];
            d = new JSM.RenderMaterial(JSM.RenderMaterialFlags.Triangle,{
                ambient: g.ambient || [1, 1, 1],
                diffuse: g.diffuse || [1, 1, 1],
                specular: g.specular || [1, 1, 1],
                shininess: g.shininess || 0,
                opacity: g.opacity || 1
            });
            var h = void 0 !== g.texture && null !== g.texture;
            h && (d.SetType(JSM.RenderMaterialFlags.Triangle + JSM.RenderMaterialFlags.Textured),
            d.texture = g.texture,
            d.ambient = [1, 1, 1],
            d.diffuse = [1, 1, 1]);
            d = new JSM.RenderMesh(d);
            var k = [], l = [], m = [], n;
            for (n = 0; n < b.parameters.length; n += 9)
                f(k, a.vertices, b.parameters, n, 3),
                f(l, a.normals, b.parameters, n + 3, 3),
                f(m, a.uvs, b.parameters, n + 6, 2);
            if (h) {
                a = g.offset || [0, 0];
                b = g.scale || [1, 1];
                g = g.rotation || 0;
                for (n = 0; n < m.length; n += 2)
                    h = e(m[n + 0], m[n + 1], a, b, g),
                    m[n + 0] = h.x,
                    m[n + 1] = -h.y
            }
            d.SetVertexArray(k);
            d.SetNormalArray(l);
            d.SetUVArray(m);
            return d
        }
        var d = new JSM.RenderBody, e, f;
        for (e = 0; e < a.triangles.length; e++)
            f = a.triangles[e],
            f = c(a, f, b),
            d.AddMesh(f);
        return d
    }
    var d = []
      , e = a.materials;
    if (void 0 === e)
        return d;
    var f = a.meshes;
    if (void 0 === f)
        return d;
    var g = 0;
    JSM.AsyncRunTask(function() {
        var a = c(f[g], e);
        d.push(a);
        g += 1;
        return !0
    }, b, f.length, 0, d);
    return d
}
;
JSM.Mouse = function() {
    this.down = !1;
    this.button = 0;
    this.alt = this.ctrl = this.shift = !1;
    this.prev = new JSM.Coord2D(0,0);
    this.curr = new JSM.Coord2D(0,0);
    this.diff = new JSM.Coord2D(0,0)
}
;
JSM.Mouse.prototype.Down = function(a, b) {
    var c = a || window.event;
    this.down = !0;
    this.button = a.which;
    this.shift = a.shiftKey;
    this.ctrl = a.ctrlKey;
    this.alt = a.altKey;
    this.SetCurrent(c, b);
    this.prev = this.curr.Clone()
}
;
JSM.Mouse.prototype.Move = function(a, b) {
    var c = a || window.event;
    this.shift = a.shiftKey;
    this.ctrl = a.ctrlKey;
    this.alt = a.altKey;
    this.SetCurrent(c, b);
    this.diff = JSM.CoordSub2D(this.curr, this.prev);
    this.prev = this.curr.Clone()
}
;
JSM.Mouse.prototype.Up = function(a, b) {
    var c = a || window.event;
    this.down = !1;
    this.SetCurrent(c, b)
}
;
JSM.Mouse.prototype.Out = function(a, b) {
    var c = a || window.event;
    this.down = !1;
    this.SetCurrent(c, b)
}
;
JSM.Mouse.prototype.SetCurrent = function(a, b) {
    var c = a.clientX
      , d = a.clientY;
    if (void 0 !== b.getBoundingClientRect)
        var e = b.getBoundingClientRect()
          , c = c - e.left
          , d = d - e.top;
    void 0 !== window.pageXOffset && void 0 !== window.pageYOffset && (c += window.pageXOffset,
    d += window.pageYOffset);
    this.curr = new JSM.Coord2D(c,d)
}
;
JSM.Touch = function() {
    this.down = !1;
    this.fingers = 0;
    this.prev = new JSM.Coord2D;
    this.curr = new JSM.Coord2D;
    this.diff = new JSM.Coord2D
}
;
JSM.Touch.prototype.Start = function(a, b) {
    0 !== a.touches.length && (this.down = !0,
    this.fingers = a.touches.length,
    this.SetCurrent(a, b),
    this.prev = this.curr.Clone())
}
;
JSM.Touch.prototype.Move = function(a, b) {
    0 !== a.touches.length && (this.fingers = a.touches.length,
    this.SetCurrent(a, b),
    this.diff = JSM.CoordSub2D(this.curr, this.prev),
    this.prev = this.curr.Clone())
}
;
JSM.Touch.prototype.End = function(a, b) {
    0 !== a.touches.length && (this.down = !1,
    this.SetCurrent(a, b))
}
;
JSM.Touch.prototype.SetCurrent = function(a, b) {
    function c(a, b) {
        var c = a.pageX
          , d = a.pageY;
        if (void 0 !== b.getBoundingClientRect)
            var k = b.getBoundingClientRect()
              , c = c - k.left
              , d = d - k.top;
        void 0 !== window.pageXOffset && void 0 !== window.pageYOffset && (c += window.pageXOffset,
        d += window.pageYOffset);
        return new JSM.Coord2D(c,d)
    }
    if (1 == a.touches.length || 3 == a.touches.length)
        this.curr = c(a.touches[0], b);
    else if (2 == a.touches.length) {
        var d = c(a.touches[0], b).DistanceTo(c(a.touches[1], b));
        this.curr = new JSM.Coord2D(d,d)
    }
}
;
JSM.OrderPolygons = function(a, b, c) {
    var d = [], e = [], f = [], g = [], h = [], k = [], l = [], m = a.PolygonCount(), n, q;
    for (n = 0; n < m; n++) {
        k.push(n);
        l.push([]);
        for (q = 0; q < m; q++)
            l[n].push(null)
    }
    (function() {
        var k = JSM.CoordSub(c, b).Normalize(), k = JSM.GetPlaneFromCoordAndDirection(b, k), l, m, n, q, t, y;
        for (l = 0; l < a.PolygonCount(); l++) {
            t = JSM.Inf;
            y = -JSM.Inf;
            n = a.GetPolygon(l);
            for (m = 0; m < n.VertexIndexCount(); m++)
                q = a.GetVertexPosition(n.GetVertexIndex(m)),
                q = k.CoordDistance(q),
                JSM.IsLower(q, t) && (t = q),
                JSM.IsGreater(q, y) && (y = q);
            d.push(t);
            e.push(y);
            m = a.GetPolygon(l);
            n = new JSM.Coord(0,0,0);
            y = t = void 0;
            for (t = 0; t < m.VertexIndexCount(); t++)
                y = a.GetVertexPosition(m.GetVertexIndex(t)),
                n = JSM.CoordAdd(n, y);
            n.MultiplyScalar(1 / m.VertexIndexCount());
            m = n;
            n = k.CoordDistance(m);
            f.push(m);
            g.push(n);
            n = JSM.CalculateBodyPolygonNormal(a, l);
            t = JSM.CoordSub(m, b).Normalize();
            t = JSM.VectorDot(n, t);
            JSM.IsGreaterOrEqual(t, 0) && n.MultiplyScalar(-1);
            m = JSM.GetPlaneFromCoordAndDirection(m, n);
            h.push(m)
        }
    }
    )();
    (function() {
        var a = k.length, b, c;
        for (b = 0; b < a - 1; b++)
            for (c = 0; c < a - b - 1; c++) {
                var d;
                d = k[c];
                var f = k[c + 1];
                d = JSM.IsLower(e[d], e[f]) ? !0 : JSM.IsEqual(e[d], e[f]) && JSM.IsLower(g[d], g[f]) ? !0 : !1;
                if (d) {
                    d = k;
                    var f = c + 1
                      , h = d[c];
                    d[c] = d[f];
                    d[f] = h
                }
            }
    }
    )();
    (function() {
        var b = k.length, c, f;
        for (c = 0; c < b - 1; c++)
            for (f = 0; f < b - c - 1; f++) {
                var g;
                g = k[f];
                var m = k[f + 1];
                if (null !== l[g][m])
                    g = l[g][m];
                else {
                    var n;
                    if (n = JSM.IsLowerOrEqual(d[g], e[m])) {
                        var q = m;
                        n = h[g];
                        for (var B = h[q], C = void 0, w = void 0, x = !0, A = a.GetPolygon(g), C = 0; C < A.VertexIndexCount(); C++)
                            if (w = a.GetVertexPosition(A.GetVertexIndex(C)),
                            B.CoordPosition(w) === JSM.CoordPlanePosition.CoordInFrontOfPlane) {
                                x = !1;
                                break
                            }
                        if (x)
                            n = !1;
                        else {
                            B = !0;
                            q = a.GetPolygon(q);
                            for (C = 0; C < q.VertexIndexCount(); C++)
                                if (w = a.GetVertexPosition(q.GetVertexIndex(C)),
                                n.CoordPosition(w) === JSM.CoordPlanePosition.CoordAtBackOfPlane) {
                                    B = !1;
                                    break
                                }
                            n = B ? !1 : !0
                        }
                    }
                    g = n ? l[g][m] = !0 : l[g][m] = !1
                }
                g && (g = k,
                m = f + 1,
                n = g[f],
                g[f] = g[m],
                g[m] = n)
            }
    }
    )();
    return k
}
;
JSM.CanvasDrawer = function(a) {
    this.canvas = a;
    this.context = this.canvas.getContext("2d")
}
;
JSM.CanvasDrawer.prototype.GetWidth = function() {
    return this.canvas.width
}
;
JSM.CanvasDrawer.prototype.GetHeight = function() {
    return this.canvas.height
}
;
JSM.CanvasDrawer.prototype.Clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
}
;
JSM.CanvasDrawer.prototype.DrawLine = function(a, b) {
    this.context.beginPath();
    this.context.moveTo(a.x, this.canvas.height - a.y);
    this.context.lineTo(b.x, this.canvas.height - b.y);
    this.context.stroke()
}
;
JSM.CanvasDrawer.prototype.DrawPolygon = function(a, b, c) {
    var d = this.context;
    b = JSM.HexColorToRGBComponents(b);
    d.fillStyle = "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")";
    this.context.beginPath();
    for (d = 0; d < a.VertexCount(); d++)
        b = a.GetVertex(d),
        0 === d ? this.context.moveTo(b.x, this.canvas.height - b.y) : this.context.lineTo(b.x, this.canvas.height - b.y);
    this.context.closePath();
    this.context.fill();
    if (c)
        for (d = 0; d < a.VertexCount(); d++)
            b = a.GetVertex(d),
            c = a.GetVertex(d < a.VertexCount() - 1 ? d + 1 : 0),
            this.DrawLine(b, c)
}
;
JSM.SVGDrawer = function(a) {
    this.svgObject = a;
    this.svgNameSpace = "http://www.w3.org/2000/svg"
}
;
JSM.SVGDrawer.prototype.GetWidth = function() {
    return this.svgObject.getAttribute("width")
}
;
JSM.SVGDrawer.prototype.GetHeight = function() {
    return this.svgObject.getAttribute("height")
}
;
JSM.SVGDrawer.prototype.Clear = function() {
    for (; this.svgObject.lastChild; )
        this.svgObject.removeChild(this.svgObject.lastChild)
}
;
JSM.SVGDrawer.prototype.DrawLine = function(a, b) {
    var c = document.createElementNS(this.svgNameSpace, "line")
      , d = this.GetHeight();
    c.setAttributeNS(null, "stroke", "black");
    c.setAttributeNS(null, "x1", a.x);
    c.setAttributeNS(null, "y1", d - a.y);
    c.setAttributeNS(null, "x2", b.x);
    c.setAttributeNS(null, "y2", d - b.y);
    this.svgObject.appendChild(c)
}
;
JSM.SVGDrawer.prototype.DrawPolygon = function(a, b) {
    var c = "", d = this.GetHeight(), e, f;
    for (e = 0; e < a.VertexCount(); e++)
        f = a.GetVertex(e),
        c = c + f.x + ", " + (d - f.y),
        e < a.VertexCount() - 1 && (c += ", ");
    d = document.createElementNS(this.svgNameSpace, "polygon");
    d.setAttributeNS(null, "points", c);
    d.setAttributeNS(null, "fill", function(a) {
        a = JSM.HexColorToRGBComponents(a);
        return "rgb(" + a[0] + "," + a[1] + "," + a[2] + ")"
    }(b));
    d.setAttributeNS(null, "fill-opacity", "1.0");
    d.setAttributeNS(null, "stroke", "black");
    this.svgObject.appendChild(d)
}
;
JSM.DrawProjectedBody = function(a, b, c, d, e, f) {
    function g(a, b) {
        var c = JSM.Project(b, l, m, n, q * JSM.DegRad, p, r, s, v);
        a.AddVertex(c.x, c.y)
    }
    function h(b) {
        var c = new JSM.Polygon2D, d, e;
        for (d = 0; d < b.VertexIndexCount(); d++)
            e = a.GetVertexPosition(b.GetVertexIndex(d)),
            g(c, e);
        return c
    }
    e && f.Clear();
    e = f.GetWidth();
    var k = f.GetHeight(), l = c.eye, m = c.center, n = c.up, q = c.fieldOfView, p = e / k, r = c.nearClippingPlane, s = c.farClippingPlane, v = [0, 0, e, k], u, t, y, B;
    if ("HiddenLinePainter" == d) {
        d = JSM.OrderPolygons(a, l, m);
        if (void 0 === b || null === b)
            b = new JSM.MaterialSet;
        for (c = 0; c < d.length; c++)
            u = a.GetPolygon(d[c]),
            t = h(u),
            y = u.GetMaterialIndex(),
            B = b.GetMaterial(y).diffuse,
            f.DrawPolygon(t, B, !0)
    } else if ("HiddenLineBSPTree" == d) {
        if (void 0 === b || null === b)
            b = new JSM.MaterialSet;
        d = new JSM.BSPTree;
        JSM.AddBodyToBSPTree(a, d);
        JSM.TraverseBSPTreeForEyePosition(d, c.eye, function(c) {
            var d = c.polygon, e = new JSM.Polygon2D, h, k;
            for (h = 0; h < d.VertexCount(); h++)
                k = d.GetVertex(h),
                g(e, k);
            t = e;
            u = a.GetPolygon(c.userData.originalPolygon);
            y = u.GetMaterialIndex();
            B = b.GetMaterial(y).diffuse;
            f.DrawPolygon(t, B, !0)
        })
    } else if ("HiddenLineFrontFacing" == d) {
        if (void 0 === b || null === b)
            b = new JSM.MaterialSet;
        for (c = 0; c < a.PolygonCount(); c++)
            u = a.GetPolygon(c),
            t = h(u),
            t.GetOrientation() == JSM.Orientation.CounterClockwise && (y = u.GetMaterialIndex(),
            B = b.GetMaterial(y).diffuse,
            f.DrawPolygon(t, B, !0))
    } else if ("Wireframe" == d) {
        var C, w, x, A = [];
        for (c = 0; c < a.PolygonCount(); c++) {
            w = C = null;
            u = a.GetPolygon(c);
            k = u.VertexIndexCount();
            for (d = 0; d <= k; d++)
                x = u.GetVertexIndex(d % k),
                e = a.GetVertexPosition(x),
                t = JSM.Project(e, l, m, n, q * JSM.DegRad, p, r, s, v),
                null !== C && (null !== w && void 0 === A[[w, x]]) && (f.DrawLine(C, t),
                A[[w, x]] = !0,
                A[[x, w]] = !0),
                w = x,
                C = t
        }
    }
    return !0
}
;
JSM.Navigation = function() {
    this.fullscreen = this.orbitCenter = this.cameraFarDistanceLimit = this.cameraNearDistanceLimit = this.cameraEnableZoom = this.cameraEnablePan = this.cameraEnableOrbit = this.cameraFixUp = this.touch = this.mouse = this.resizeCallback = this.drawCallback = this.camera = this.canvas = null
}
;
JSM.Navigation.prototype.Init = function(a, b, c, d) {
    this.canvas = a;
    this.camera = b;
    this.drawCallback = c;
    this.resizeCallback = d;
    this.mouse = new JSM.Mouse;
    this.touch = new JSM.Touch;
    this.cameraEnableZoom = this.cameraEnablePan = this.cameraEnableOrbit = this.cameraFixUp = !0;
    this.orbitCenter = this.camera.center.Clone();
    this.fullscreen = !1;
    var e = this;
    document.addEventListener && (document.addEventListener("mousemove", function(a) {
        e.OnMouseMove(a)
    }),
    document.addEventListener("mouseup", function(a) {
        e.OnMouseUp(a)
    }));
    this.canvas.addEventListener && (this.canvas.addEventListener("mousedown", function(a) {
        e.OnMouseDown(a)
    }, !1),
    this.canvas.addEventListener("DOMMouseScroll", function(a) {
        e.OnMouseWheel(a)
    }, !1),
    this.canvas.addEventListener("mousewheel", function(a) {
        e.OnMouseWheel(a)
    }, !1),
    this.canvas.addEventListener("touchstart", function(a) {
        e.OnTouchStart(a)
    }, !1),
    this.canvas.addEventListener("touchmove", function(a) {
        e.OnTouchMove(a)
    }, !1),
    this.canvas.addEventListener("touchend", function(a) {
        e.OnTouchEnd(a)
    }, !1),
    this.canvas.addEventListener("contextmenu", function(a) {
        e.OnContextMenu(a)
    }, !1));
    window.addEventListener && window.addEventListener("resize", function(a) {
        e.OnResize(a)
    }, !1);
    return !0
}
;
JSM.Navigation.prototype.SetCamera = function(a, b, c) {
    this.camera.Set(a, b, c);
    this.orbitCenter = this.camera.center.Clone()
}
;
JSM.Navigation.prototype.EnableFixUp = function(a) {
    this.cameraFixUp = a
}
;
JSM.Navigation.prototype.EnableOrbit = function(a) {
    this.cameraEnableOrbit = a
}
;
JSM.Navigation.prototype.EnablePan = function(a) {
    this.cameraEnablePan = a
}
;
JSM.Navigation.prototype.EnableZoom = function(a) {
    this.cameraEnableZoom = a
}
;
JSM.Navigation.prototype.SetNearDistanceLimit = function(a) {
    this.cameraNearDistanceLimit = a
}
;
JSM.Navigation.prototype.SetFarDistanceLimit = function(a) {
    this.cameraFarDistanceLimit = a
}
;
JSM.Navigation.prototype.SetOrbitCenter = function(a) {
    this.orbitCenter = a
}
;
JSM.Navigation.prototype.FitInWindow = function(a, b) {
    if (!JSM.IsZero(b)) {
        var c = JSM.CoordSub(this.camera.center, a);
        this.camera.center = a;
        this.camera.eye = JSM.CoordSub(this.camera.eye, c);
        var c = JSM.CoordSub(this.camera.eye, this.camera.center).Normalize()
          , d = this.camera.fieldOfView / 2;
        this.canvas.width < this.canvas.height && (d = d * this.canvas.width / this.canvas.height);
        d = b / Math.sin(d * JSM.DegRad);
        this.camera.eye = this.camera.center.Clone().Offset(c, d);
        this.orbitCenter = this.camera.center.Clone()
    }
}
;
JSM.Navigation.prototype.SetFullscreen = function(a) {
    this.fullscreen = a;
    this.ResizeCallback()
}
;
JSM.Navigation.prototype.Orbit = function(a, b) {
    var c = a * JSM.DegRad
      , d = b * JSM.DegRad
      , e = JSM.CoordSub(this.camera.center, this.camera.eye).Normalize()
      , f = JSM.VectorCross(e, this.camera.up).Normalize()
      , g = !this.orbitCenter.IsEqual(this.camera.center);
    this.cameraFixUp ? (e = e.AngleTo(this.camera.up) + d,
    JSM.IsGreater(e, 0) && JSM.IsLower(e, Math.PI) && (this.camera.eye.Rotate(f, -d, this.orbitCenter),
    g && this.camera.center.Rotate(f, -d, this.orbitCenter)),
    this.camera.eye.Rotate(this.camera.up, -c, this.orbitCenter),
    g && this.camera.center.Rotate(this.camera.up, -c, this.orbitCenter)) : (e = JSM.VectorCross(f, e).Normalize(),
    this.camera.eye.Rotate(f, -d, this.orbitCenter),
    this.camera.eye.Rotate(e, -c, this.orbitCenter),
    g && (this.camera.center.Rotate(f, -d, this.orbitCenter),
    this.camera.center.Rotate(e, -c, this.orbitCenter)),
    this.camera.up = e)
}
;
JSM.Navigation.prototype.Pan = function(a, b) {
    var c = JSM.CoordSub(this.camera.center, this.camera.eye).Normalize()
      , d = JSM.VectorCross(c, this.camera.up).Normalize()
      , c = JSM.VectorCross(d, c).Normalize();
    this.camera.eye.Offset(d, -a);
    this.camera.center.Offset(d, -a);
    this.camera.eye.Offset(c, b);
    this.camera.center.Offset(c, b)
}
;
JSM.Navigation.prototype.Zoom = function(a) {
    var b = JSM.CoordSub(this.camera.center, this.camera.eye)
      , c = b.Length()
      , d = 0 < a;
    if (d && null !== this.cameraNearDistanceLimit && c < this.cameraNearDistanceLimit || !d && null !== this.cameraFarDistanceLimit && c > this.cameraFarDistanceLimit)
        return 0;
    this.camera.eye.Offset(b, c * a)
}
;
JSM.Navigation.prototype.DrawCallback = function() {
    void 0 !== this.drawCallback && null !== this.drawCallback && this.drawCallback()
}
;
JSM.Navigation.prototype.ResizeCallback = function() {
    void 0 !== this.resizeCallback && null !== this.resizeCallback && (this.fullscreen && (this.canvas.width = window.innerWidth,
    this.canvas.height = window.innerHeight),
    this.resizeCallback())
}
;
JSM.Navigation.prototype.OnMouseDown = function(a) {
    a.preventDefault();
    this.mouse.Down(a, this.canvas)
}
;
JSM.Navigation.prototype.OnMouseMove = function(a) {
    a.preventDefault();
    this.mouse.Move(a, this.canvas);
    if (this.mouse.down) {
        a = 0;
        if (1 == this.mouse.button) {
            if (!this.cameraEnableOrbit)
                return;
            a = 0.5;
            this.Orbit(this.mouse.diff.x * a, this.mouse.diff.y * a)
        } else if (3 == this.mouse.button) {
            if (!this.cameraEnablePan)
                return;
            a = 0.001 * this.camera.eye.DistanceTo(this.camera.center);
            this.Pan(this.mouse.diff.x * a, this.mouse.diff.y * a)
        }
        this.DrawCallback()
    }
}
;
JSM.Navigation.prototype.OnMouseUp = function(a) {
    a.preventDefault();
    this.mouse.Up(a, this.canvas)
}
;
JSM.Navigation.prototype.OnMouseOut = function(a) {
    a.preventDefault();
    this.mouse.Out(a, this.canvas)
}
;
JSM.Navigation.prototype.OnMouseWheel = function(a) {
    a.preventDefault();
    if (this.cameraEnableZoom) {
        var b = a;
        null === b && (b = window.event);
        a = 0;
        b.detail ? a = -b.detail : b.wheelDelta && (a = b.wheelDelta / 40);
        b = 0.1;
        0 > a && (b *= -1);
        this.Zoom(b);
        this.DrawCallback()
    }
}
;
JSM.Navigation.prototype.OnTouchStart = function(a) {
    a.preventDefault();
    this.touch.Start(a, this.canvas)
}
;
JSM.Navigation.prototype.OnTouchMove = function(a) {
    a.preventDefault();
    this.touch.Move(a, this.canvas);
    if (this.touch.down) {
        a = 0;
        if (1 == this.touch.fingers) {
            if (!this.cameraEnableOrbit)
                return;
            a = 0.5;
            this.Orbit(this.touch.diff.x * a, this.touch.diff.y * a)
        } else if (2 == this.touch.fingers) {
            if (!this.cameraEnableZoom)
                return;
            this.Zoom(0.005 * this.touch.diff.x)
        } else if (3 == this.touch.fingers) {
            if (!this.cameraEnablePan)
                return;
            a = 0.001 * this.camera.eye.DistanceTo(this.camera.center);
            this.Pan(this.touch.diff.x * a, this.touch.diff.y * a)
        }
        this.DrawCallback()
    }
}
;
JSM.Navigation.prototype.OnTouchEnd = function(a) {
    a.preventDefault();
    this.touch.End(a, this.canvas)
}
;
JSM.Navigation.prototype.OnContextMenu = function(a) {
    a.preventDefault()
}
;
JSM.Navigation.prototype.OnResize = function(a) {
    a.preventDefault();
    this.ResizeCallback()
}
;
JSM.SoftwareViewer = function() {
    this.navigation = this.drawMode = this.drawer = this.bodies = this.camera = this.canvas = null
}
;
JSM.SoftwareViewer.prototype.Start = function(a, b) {
    return !this.InitCanvas(a) || !this.InitCamera(b) ? !1 : !0
}
;
JSM.SoftwareViewer.prototype.InitCanvas = function(a) {
    this.bodies = [];
    this.canvas = a;
    if (!this.canvas)
        return !1;
    this.canvas instanceof HTMLCanvasElement ? this.drawer = new JSM.CanvasDrawer(this.canvas) : this.canvas instanceof SVGSVGElement && (this.drawer = new JSM.SVGDrawer(this.canvas));
    if (!this.drawer)
        return !1;
    this.drawMode = "Wireframe";
    return !0
}
;
JSM.SoftwareViewer.prototype.InitCamera = function(a) {
    this.camera = JSM.ValueOrDefault(a, new JSM.Camera);
    if (!this.camera)
        return !1;
    this.navigation = new JSM.Navigation;
    return !this.navigation.Init(this.canvas, this.camera, this.Draw.bind(this), this.Resize.bind(this)) ? !1 : !0
}
;
JSM.SoftwareViewer.prototype.AddBody = function(a, b) {
    this.bodies.push([a, b])
}
;
JSM.SoftwareViewer.prototype.RemoveBodies = function() {
    this.bodies = []
}
;
JSM.SoftwareViewer.prototype.FitInWindow = function() {
    var a = this.GetBoundingSphere();
    this.navigation.FitInWindow(a.GetCenter(), a.GetRadius());
    this.Draw()
}
;
JSM.SoftwareViewer.prototype.GetCenter = function() {
    return this.GetBoundingBox().GetCenter()
}
;
JSM.SoftwareViewer.prototype.GetBoundingBox = function() {
    var a = new JSM.Coord(JSM.Inf,JSM.Inf,JSM.Inf), b = new JSM.Coord(-JSM.Inf,-JSM.Inf,-JSM.Inf), c, d, e, f;
    for (c = 0; c < this.bodies.length; c++) {
        e = this.bodies[c][0];
        for (d = 0; d < e.VertexCount(); d++)
            f = e.GetVertex(d),
            a.x = JSM.Minimum(a.x, f.position.x),
            a.y = JSM.Minimum(a.y, f.position.y),
            a.z = JSM.Minimum(a.z, f.position.z),
            b.x = JSM.Maximum(b.x, f.position.x),
            b.y = JSM.Maximum(b.y, f.position.y),
            b.z = JSM.Maximum(b.z, f.position.z)
    }
    return new JSM.Box(a,b)
}
;
JSM.SoftwareViewer.prototype.GetBoundingSphere = function() {
    var a = this.GetCenter(), b = 0, c, d, e, f;
    for (c = 0; c < this.bodies.length; c++) {
        e = this.bodies[c][0];
        for (d = 0; d < e.VertexCount(); d++)
            f = e.GetVertex(d),
            f = a.DistanceTo(f.position),
            JSM.IsGreater(f, b) && (b = f)
    }
    return new JSM.Sphere(a,b)
}
;
JSM.SoftwareViewer.prototype.Resize = function() {
    this.Draw()
}
;
JSM.SoftwareViewer.prototype.Draw = function() {
    var a, b;
    this.drawer.Clear();
    for (a = 0; a < this.bodies.length; a++)
        b = this.bodies[a],
        JSM.DrawProjectedBody(b[0], b[1], this.camera, this.drawMode, !1, this.drawer);
    return !0
}
;
JSM.SpriteViewer = function() {
    this.navigation = this.projected = this.points = this.callbacks = this.camera = this.canvas = null
}
;
JSM.SpriteViewer.prototype.Start = function(a, b, c) {
    return !this.InitCanvas(a) || !this.InitCamera(b) || !this.InitCallbacks(c) ? !1 : !0
}
;
JSM.SpriteViewer.prototype.InitCanvas = function(a) {
    this.points = [];
    this.canvas = a;
    return !this.canvas ? !1 : !0
}
;
JSM.SpriteViewer.prototype.InitCamera = function(a) {
    this.camera = JSM.ValueOrDefault(a, new JSM.Camera);
    if (!this.camera)
        return !1;
    this.navigation = new JSM.Navigation;
    return !this.navigation.Init(this.canvas, this.camera, this.Draw.bind(this)) ? !1 : !0
}
;
JSM.SpriteViewer.prototype.InitCallbacks = function(a) {
    this.callbacks = {
        onPointDraw: null
    };
    void 0 !== a && (void 0 !== a.onDrawStart && (this.callbacks.onDrawStart = a.onDrawStart),
    void 0 !== a.onPointDraw && (this.callbacks.onPointDraw = a.onPointDraw),
    void 0 !== a.onDrawEnd && (this.callbacks.onDrawEnd = a.onDrawEnd));
    return !0
}
;
JSM.SpriteViewer.prototype.AddPoint = function(a) {
    this.points.push(a)
}
;
JSM.SpriteViewer.prototype.RemovePoints = function() {
    this.points = []
}
;
JSM.SpriteViewer.prototype.Resize = function() {
    this.Draw()
}
;
JSM.SpriteViewer.prototype.NearestPointUnderPosition = function(a, b, c) {
    b = new JSM.Coord2D(b,c);
    c = -1;
    var d = JSM.Inf, e, f, g;
    for (e = 0; e < this.projected.length; e++)
        f = this.projected[e],
        g = b.DistanceTo(new JSM.Coord2D(f.position.x,f.position.y)),
        JSM.IsLower(g, a) && JSM.IsLower(g, d) && (c = f.originalIndex,
        d = g);
    return c
}
;
JSM.SpriteViewer.prototype.NearestPointUnderMouse = function(a) {
    return this.NearestPointUnderPosition(a, this.navigation.mouse.curr.x, this.navigation.mouse.curr.y)
}
;
JSM.SpriteViewer.prototype.NearestPointUnderTouch = function(a) {
    return this.NearestPointUnderPosition(a, this.navigation.touch.curr.x, this.navigation.touch.curr.y)
}
;
JSM.SpriteViewer.prototype.FitInWindow = function() {
    var a = this.GetBoundingSphere();
    this.navigation.FitInWindow(a.GetCenter(), a.GetRadius());
    this.Draw()
}
;
JSM.SpriteViewer.prototype.GetCenter = function() {
    return this.GetBoundingBox().GetCenter()
}
;
JSM.SpriteViewer.prototype.GetBoundingBox = function() {
    var a = new JSM.Coord(JSM.Inf,JSM.Inf,JSM.Inf), b = new JSM.Coord(-JSM.Inf,-JSM.Inf,-JSM.Inf), c, d;
    for (c = 0; c < this.points.length; c++)
        d = this.points[c],
        a.x = JSM.Minimum(a.x, d.x),
        a.y = JSM.Minimum(a.y, d.y),
        a.z = JSM.Minimum(a.z, d.z),
        b.x = JSM.Maximum(b.x, d.x),
        b.y = JSM.Maximum(b.y, d.y),
        b.z = JSM.Maximum(b.z, d.z);
    return new JSM.Box(a,b)
}
;
JSM.SpriteViewer.prototype.GetBoundingSphere = function() {
    var a = this.GetCenter(), b = 0, c, d;
    for (c = 0; c < this.points.length; c++)
        d = this.points[c],
        d = a.DistanceTo(d),
        JSM.IsGreater(d, b) && (b = d);
    return new JSM.Sphere(a,b)
}
;
JSM.SpriteViewer.prototype.Draw = function() {
    if (null !== this.callbacks.onDrawStart)
        this.callbacks.onDrawStart(this.canvas);
    var a = this.canvas.width / this.canvas.height
      , b = [0, 0, this.canvas.width, this.canvas.height];
    this.projected = [];
    var c, d;
    for (c = 0; c < this.points.length; c++)
        d = this.points[c],
        d = JSM.Project(d, this.camera.eye, this.camera.center, this.camera.up, this.camera.fieldOfView * JSM.DegRad, a, this.camera.nearClippingPlane, this.camera.farClippingPlane, b),
        d.y = this.canvas.height - d.y,
        null !== d && this.projected.push({
            position: d,
            originalIndex: c
        });
    this.projected.sort(function(a, b) {
        return a.position.z > b.position.z ? -1 : a.position.z < b.position.z ? 1 : 0
    });
    for (c = 0; c < this.projected.length; c++)
        if (null !== this.callbacks.onPointDraw)
            this.callbacks.onPointDraw(this.canvas, this.projected[c].originalIndex, this.projected[c].position);
    if (null !== this.callbacks.onDrawEnd)
        this.callbacks.onDrawEnd(this.canvas);
    return !0
}
;
JSM.Viewer = function() {
    this.cameraLight = this.navigation = this.renderer = this.camera = null
}
;
JSM.Viewer.prototype.Init = function(a, b) {
    return !this.InitRenderer(a) || !this.InitNavigation(b) || !this.InitLights() ? !1 : !0
}
;
JSM.Viewer.prototype.Reset = function() {
    this.RemoveBodies();
    this.RemoveLights();
    this.SetAmbientLight(new JSM.RenderAmbientLight(8355711));
    this.EnableCameraLight()
}
;
JSM.Viewer.prototype.InitRenderer = function(a) {
    this.renderer = new JSM.Renderer;
    return !this.renderer.Init(a) ? !1 : !0
}
;
JSM.Viewer.prototype.InitNavigation = function(a) {
    this.camera = JSM.ValueOrDefault(a, new JSM.Camera);
    if (!this.camera)
        return !1;
    this.navigation = new JSM.Navigation;
    return !this.navigation.Init(this.renderer.canvas, this.camera, this.Draw.bind(this), this.Resize.bind(this)) ? !1 : !0
}
;
JSM.Viewer.prototype.InitLights = function() {
    this.SetAmbientLight(new JSM.RenderAmbientLight(8355711));
    this.EnableCameraLight();
    return !0
}
;
JSM.Viewer.prototype.SetClearColor = function(a, b, c) {
    this.renderer.SetClearColor(a, b, c)
}
;
JSM.Viewer.prototype.EnableCameraLight = function() {
    null === this.cameraLight && (this.cameraLight = new JSM.RenderDirectionalLight(8355711,16777215,new JSM.Vector(1,0,0)),
    this.AddLight(this.cameraLight))
}
;
JSM.Viewer.prototype.DisableCameraLight = function() {
    null !== this.cameraLight && (this.RemoveLight(this.cameraLight),
    this.cameraLight = null)
}
;
JSM.Viewer.prototype.GetCameraLight = function() {
    return this.cameraLight
}
;
JSM.Viewer.prototype.SetAmbientLight = function(a) {
    this.renderer.SetAmbientLight(a)
}
;
JSM.Viewer.prototype.AddLight = function(a) {
    this.renderer.AddLight(a)
}
;
JSM.Viewer.prototype.RemoveLight = function(a) {
    this.renderer.RemoveLight(a)
}
;
JSM.Viewer.prototype.RemoveLights = function() {
    this.renderer.RemoveLights();
    this.cameraLight = null
}
;
JSM.Viewer.prototype.AddBody = function(a) {
    this.renderer.AddBody(a, this.Draw.bind(this))
}
;
JSM.Viewer.prototype.AddBodies = function(a) {
    this.renderer.AddBodies(a, this.Draw.bind(this))
}
;
JSM.Viewer.prototype.RemoveBody = function(a) {
    this.renderer.RemoveBody(a)
}
;
JSM.Viewer.prototype.RemoveBodies = function() {
    this.renderer.RemoveBodies()
}
;
JSM.Viewer.prototype.FitInWindow = function() {
    var a = this.GetBoundingSphere();
    this.navigation.FitInWindow(a.GetCenter(), a.GetRadius())
}
;
JSM.Viewer.prototype.SetFullscreen = function(a) {
    this.navigation.SetFullscreen(a)
}
;
JSM.Viewer.prototype.GetCenter = function() {
    return this.GetBoundingBox().GetCenter()
}
;
JSM.Viewer.prototype.GetBoundingBox = function() {
    var a = new JSM.Coord(JSM.Inf,JSM.Inf,JSM.Inf)
      , b = new JSM.Coord(-JSM.Inf,-JSM.Inf,-JSM.Inf);
    this.renderer.EnumerateBodies(function(c) {
        var d = c.GetTransformation();
        c.EnumerateMeshes(function(c) {
            var f, g;
            for (f = 0; f < c.VertexCount(); f++)
                g = c.GetTransformedVertex(f, d),
                a.x = JSM.Minimum(a.x, g.x),
                a.y = JSM.Minimum(a.y, g.y),
                a.z = JSM.Minimum(a.z, g.z),
                b.x = JSM.Maximum(b.x, g.x),
                b.y = JSM.Maximum(b.y, g.y),
                b.z = JSM.Maximum(b.z, g.z)
        })
    });
    return new JSM.Box(a,b)
}
;
JSM.Viewer.prototype.GetBoundingSphere = function() {
    var a = this.GetCenter()
      , b = 0;
    this.renderer.EnumerateBodies(function(c) {
        var d = c.GetTransformation();
        c.EnumerateMeshes(function(c) {
            var f, g;
            for (f = 0; f < c.VertexCount(); f++)
                g = c.GetTransformedVertex(f, d),
                g = a.DistanceTo(g),
                JSM.IsGreater(g, b) && (b = g)
        })
    });
    return new JSM.Sphere(a,b)
}
;
JSM.Viewer.prototype.FindObjects = function(a, b) {
    return this.renderer.FindObjects(this.camera, a, b)
}
;
JSM.Viewer.prototype.Resize = function() {
    this.renderer.Resize();
    this.Draw()
}
;
JSM.Viewer.prototype.Draw = function() {
    var a = this.camera
      , b = this.GetCameraLight();
    null !== b && (b.direction = JSM.CoordSub(a.center, a.eye).Normalize());
    this.renderer.Render(a)
}
;
JSM.PointCloudViewer = function() {
    this.navigation = this.renderer = this.canvas = null
}
;
JSM.PointCloudViewer.prototype.Init = function(a, b) {
    return !this.InitRenderer(a, b) || !this.InitNavigation() ? !1 : !0
}
;
JSM.PointCloudViewer.prototype.InitRenderer = function(a, b) {
    this.renderer = new JSM.PointCloudRenderer;
    return !this.renderer.Init(a, b) ? !1 : !0
}
;
JSM.PointCloudViewer.prototype.InitNavigation = function() {
    this.navigation = new JSM.Navigation;
    return !this.navigation.Init(this.renderer.canvas, this.renderer.camera, this.Draw.bind(this), this.Resize.bind(this)) ? !1 : !0
}
;
JSM.PointCloudViewer.prototype.SetClearColor = function(a, b, c) {
    this.renderer.SetClearColor(a, b, c)
}
;
JSM.PointCloudViewer.prototype.SetPointSize = function(a) {
    this.renderer.SetPointSize(a)
}
;
JSM.PointCloudViewer.prototype.AddPoints = function(a, b) {
    this.renderer.AddPoints(a, b)
}
;
JSM.PointCloudViewer.prototype.RemovePoints = function() {
    this.renderer.RemovePoints()
}
;
JSM.PointCloudViewer.prototype.FitInWindow = function() {
    var a = this.GetBoundingSphere();
    this.navigation.FitInWindow(a.GetCenter(), a.GetRadius());
    this.Draw()
}
;
JSM.PointCloudViewer.prototype.GetCenter = function() {
    return this.GetBoundingBox().GetCenter()
}
;
JSM.PointCloudViewer.prototype.GetBoundingBox = function() {
    var a = new JSM.Coord(JSM.Inf,JSM.Inf,JSM.Inf), b = new JSM.Coord(-JSM.Inf,-JSM.Inf,-JSM.Inf), c, d, e, f;
    for (c = 0; c < this.renderer.points.length; c++) {
        e = this.renderer.points[c].pointArray;
        for (d = 0; d < e.length; d += 3)
            f = new JSM.Coord(e[d],e[d + 1],e[d + 2]),
            a.x = JSM.Minimum(a.x, f.x),
            a.y = JSM.Minimum(a.y, f.y),
            a.z = JSM.Minimum(a.z, f.z),
            b.x = JSM.Maximum(b.x, f.x),
            b.y = JSM.Maximum(b.y, f.y),
            b.z = JSM.Maximum(b.z, f.z)
    }
    return new JSM.Box(a,b)
}
;
JSM.PointCloudViewer.prototype.GetBoundingSphere = function() {
    var a = this.GetCenter(), b = 0, c, d, e, f;
    for (c = 0; c < this.renderer.points.length; c++) {
        e = this.renderer.points[c].pointArray;
        for (d = 0; d < e.length; d += 3)
            f = new JSM.Coord(e[d],e[d + 1],e[d + 2]),
            f = a.DistanceTo(f),
            JSM.IsGreater(f, b) && (b = f)
    }
    return new JSM.Sphere(a,b)
}
;
JSM.PointCloudViewer.prototype.Resize = function() {
    this.renderer.Resize();
    this.Draw()
}
;
JSM.PointCloudViewer.prototype.Draw = function() {
    this.renderer.Render()
}
;
JSM.GenerateSolidWithRadius = function(a, b) {
    var c = new JSM.Body
      , d = !0;
    "Tetrahedron" === a ? c = JSM.GenerateTetrahedron() : "Hexahedron" === a ? c = JSM.GenerateHexahedron() : "Octahedron" === a ? c = JSM.GenerateOctahedron() : "Dodecahedron" === a ? c = JSM.GenerateDodecahedron() : "Icosahedron" === a ? c = JSM.GenerateIcosahedron() : "TruncatedTetrahedron" === a ? c = JSM.GenerateTruncatedTetrahedron() : "Cuboctahedron" === a ? c = JSM.GenerateCuboctahedron() : "TruncatedCube" === a ? c = JSM.GenerateTruncatedCube() : "TruncatedOctahedron" === a ? c = JSM.GenerateTruncatedOctahedron() : "Rhombicuboctahedron" === a ? c = JSM.GenerateRhombicuboctahedron() : "TruncatedCuboctahedron" === a ? c = JSM.GenerateTruncatedCuboctahedron() : "SnubCube" === a ? c = JSM.GenerateSnubCube() : "Icosidodecahedron" === a ? c = JSM.GenerateIcosidodecahedron() : "TruncatedDodecahedron" === a ? c = JSM.GenerateTruncatedDodecahedron() : "TruncatedIcosahedron" === a ? c = JSM.GenerateTruncatedIcosahedron() : "Rhombicosidodecahedron" === a ? c = JSM.GenerateRhombicosidodecahedron() : "TruncatedIcosidodecahedron" === a ? c = JSM.GenerateTruncatedIcosidodecahedron() : "SnubDodecahedron" === a ? c = JSM.GenerateSnubDodecahedron() : "TetrakisHexahedron" === a ? (c = JSM.GenerateTetrakisHexahedron(),
    d = !1) : "RhombicDodecahedron" === a ? (c = JSM.GenerateRhombicDodecahedron(),
    d = !1) : "PentakisDodecahedron" === a ? (c = JSM.GeneratePentakisDodecahedron(),
    d = !1) : "SmallStellatedDodecahedron" === a ? (c = JSM.GenerateSmallStellatedDodecahedron(),
    d = !1) : "GreatDodecahedron" === a ? (c = JSM.GenerateGreatDodecahedron(),
    d = !1) : "SmallTriambicIcosahedron" === a ? (c = JSM.GenerateSmallTriambicIcosahedron(),
    d = !1) : "GreatStellatedDodecahedron" === a ? (c = JSM.GenerateGreatStellatedDodecahedron(),
    d = !1) : "SmallTriakisOctahedron" === a ? (c = JSM.GenerateSmallTriakisOctahedron(),
    d = !1) : "StellaOctangula" === a ? (c = JSM.GenerateStellaOctangula(),
    d = !1) : "TriakisTetrahedron" === a && (c = JSM.GenerateTriakisTetrahedron(),
    d = !1);
    if (0 < c.VertexCount()) {
        var e = 0;
        if (d)
            e = c.GetVertexPosition(0).Length();
        else
            for (var f, d = 0; d < c.VertexCount(); d++)
                f = c.GetVertexPosition(d).Length(),
                JSM.IsGreater(f, e) && (e = f);
        e = b / e;
        for (d = 0; d < c.VertexCount(); d++)
            f = c.GetVertex(d),
            f.position.MultiplyScalar(e)
    }
    return c
}
;
JSM.GenerateTetrahedron = function() {
    var a = new JSM.Body;
    a.AddVertex(new JSM.BodyVertex(new JSM.Coord(1,1,1)));
    a.AddVertex(new JSM.BodyVertex(new JSM.Coord(-1,-1,1)));
    a.AddVertex(new JSM.BodyVertex(new JSM.Coord(-1,1,-1)));
    a.AddVertex(new JSM.BodyVertex(new JSM.Coord(1,-1,-1)));
    a.AddPolygon(new JSM.BodyPolygon([0, 1, 3]));
    a.AddPolygon(new JSM.BodyPolygon([0, 2, 1]));
    a.AddPolygon(new JSM.BodyPolygon([0, 3, 2]));
    a.AddPolygon(new JSM.BodyPolygon([1, 2, 3]));
    return a
}
;
JSM.GenerateHexahedron = function() {
    var a = new JSM.Body;
    JSM.AddVertexToBody(a, 1, 1, 1);
    JSM.AddVertexToBody(a, 1, 1, -1);
    JSM.AddVertexToBody(a, 1, -1, 1);
    JSM.AddVertexToBody(a, 1, -1, -1);
    JSM.AddVertexToBody(a, -1, 1, 1);
    JSM.AddVertexToBody(a, -1, 1, -1);
    JSM.AddVertexToBody(a, -1, -1, 1);
    JSM.AddVertexToBody(a, -1, -1, -1);
    JSM.AddPolygonToBody(a, [0, 1, 5, 4]);
    JSM.AddPolygonToBody(a, [0, 2, 3, 1]);
    JSM.AddPolygonToBody(a, [0, 4, 6, 2]);
    JSM.AddPolygonToBody(a, [1, 3, 7, 5]);
    JSM.AddPolygonToBody(a, [2, 6, 7, 3]);
    JSM.AddPolygonToBody(a, [4, 5, 7, 6]);
    return a
}
;
JSM.GenerateOctahedron = function() {
    var a = new JSM.Body;
    JSM.AddVertexToBody(a, 1, 0, 0);
    JSM.AddVertexToBody(a, -1, 0, 0);
    JSM.AddVertexToBody(a, 0, 1, 0);
    JSM.AddVertexToBody(a, 0, -1, 0);
    JSM.AddVertexToBody(a, 0, 0, 1);
    JSM.AddVertexToBody(a, 0, 0, -1);
    JSM.AddPolygonToBody(a, [0, 2, 4]);
    JSM.AddPolygonToBody(a, [0, 3, 5]);
    JSM.AddPolygonToBody(a, [0, 4, 3]);
    JSM.AddPolygonToBody(a, [0, 5, 2]);
    JSM.AddPolygonToBody(a, [1, 2, 5]);
    JSM.AddPolygonToBody(a, [1, 3, 4]);
    JSM.AddPolygonToBody(a, [1, 4, 2]);
    JSM.AddPolygonToBody(a, [1, 5, 3]);
    return a
}
;
JSM.GenerateDodecahedron = function() {
    var a = new JSM.Body
      , b = (1 + Math.sqrt(5)) / 2
      , c = 1 / b;
    JSM.AddVertexToBody(a, 1, 1, 1);
    JSM.AddVertexToBody(a, 1, 1, -1);
    JSM.AddVertexToBody(a, 1, -1, 1);
    JSM.AddVertexToBody(a, -1, 1, 1);
    JSM.AddVertexToBody(a, 1, -1, -1);
    JSM.AddVertexToBody(a, -1, 1, -1);
    JSM.AddVertexToBody(a, -1, -1, 1);
    JSM.AddVertexToBody(a, -1, -1, -1);
    JSM.AddVertexToBody(a, 0, +c, +b);
    JSM.AddVertexToBody(a, 0, +c, -b);
    JSM.AddVertexToBody(a, 0, -c, +b);
    JSM.AddVertexToBody(a, 0, -c, -b);
    JSM.AddVertexToBody(a, +c, +b, 0);
    JSM.AddVertexToBody(a, +c, -b, 0);
    JSM.AddVertexToBody(a, -c, +b, 0);
    JSM.AddVertexToBody(a, -c, -b, 0);
    JSM.AddVertexToBody(a, +b, 0, +c);
    JSM.AddVertexToBody(a, -b, 0, +c);
    JSM.AddVertexToBody(a, +b, 0, -c);
    JSM.AddVertexToBody(a, -b, 0, -c);
    JSM.AddPolygonToBody(a, [0, 8, 10, 2, 16]);
    JSM.AddPolygonToBody(a, [0, 16, 18, 1, 12]);
    JSM.AddPolygonToBody(a, [0, 12, 14, 3, 8]);
    JSM.AddPolygonToBody(a, [1, 9, 5, 14, 12]);
    JSM.AddPolygonToBody(a, [1, 18, 4, 11, 9]);
    JSM.AddPolygonToBody(a, [2, 10, 6, 15, 13]);
    JSM.AddPolygonToBody(a, [2, 13, 4, 18, 16]);
    JSM.AddPolygonToBody(a, [3, 14, 5, 19, 17]);
    JSM.AddPolygonToBody(a, [3, 17, 6, 10, 8]);
    JSM.AddPolygonToBody(a, [4, 13, 15, 7, 11]);
    JSM.AddPolygonToBody(a, [5, 9, 11, 7, 19]);
    JSM.AddPolygonToBody(a, [6, 17, 19, 7, 15]);
    return a
}
;
JSM.GenerateIcosahedron = function() {
    var a = new JSM.Body
      , b = (1 + Math.sqrt(5)) / 2;
    JSM.AddVertexToBody(a, 0, 1, +b);
    JSM.AddVertexToBody(a, 0, 1, -b);
    JSM.AddVertexToBody(a, 0, -1, +b);
    JSM.AddVertexToBody(a, 0, -1, -b);
    JSM.AddVertexToBody(a, 1, +b, 0);
    JSM.AddVertexToBody(a, 1, -b, 0);
    JSM.AddVertexToBody(a, -1, +b, 0);
    JSM.AddVertexToBody(a, -1, -b, 0);
    JSM.AddVertexToBody(a, +b, 0, 1);
    JSM.AddVertexToBody(a, +b, 0, -1);
    JSM.AddVertexToBody(a, -b, 0, 1);
    JSM.AddVertexToBody(a, -b, 0, -1);
    JSM.AddPolygonToBody(a, [0, 2, 8]);
    JSM.AddPolygonToBody(a, [0, 4, 6]);
    JSM.AddPolygonToBody(a, [0, 6, 10]);
    JSM.AddPolygonToBody(a, [0, 8, 4]);
    JSM.AddPolygonToBody(a, [0, 10, 2]);
    JSM.AddPolygonToBody(a, [1, 3, 11]);
    JSM.AddPolygonToBody(a, [1, 4, 9]);
    JSM.AddPolygonToBody(a, [1, 6, 4]);
    JSM.AddPolygonToBody(a, [1, 9, 3]);
    JSM.AddPolygonToBody(a, [1, 11, 6]);
    JSM.AddPolygonToBody(a, [2, 5, 8]);
    JSM.AddPolygonToBody(a, [2, 7, 5]);
    JSM.AddPolygonToBody(a, [2, 10, 7]);
    JSM.AddPolygonToBody(a, [3, 5, 7]);
    JSM.AddPolygonToBody(a, [3, 7, 11]);
    JSM.AddPolygonToBody(a, [3, 9, 5]);
    JSM.AddPolygonToBody(a, [4, 8, 9]);
    JSM.AddPolygonToBody(a, [5, 9, 8]);
    JSM.AddPolygonToBody(a, [6, 11, 10]);
    JSM.AddPolygonToBody(a, [7, 10, 11]);
    return a
}
;
JSM.GenerateTruncatedTetrahedron = function() {
    var a = new JSM.Body;
    JSM.AddVertexToBody(a, 1, 1, 3);
    JSM.AddVertexToBody(a, 1, -1, -3);
    JSM.AddVertexToBody(a, -1, -1, 3);
    JSM.AddVertexToBody(a, -1, 1, -3);
    JSM.AddVertexToBody(a, 1, 3, 1);
    JSM.AddVertexToBody(a, 1, -3, -1);
    JSM.AddVertexToBody(a, -1, -3, 1);
    JSM.AddVertexToBody(a, -1, 3, -1);
    JSM.AddVertexToBody(a, 3, 1, 1);
    JSM.AddVertexToBody(a, 3, -1, -1);
    JSM.AddVertexToBody(a, -3, -1, 1);
    JSM.AddVertexToBody(a, -3, 1, -1);
    JSM.AddPolygonToBody(a, [0, 8, 4]);
    JSM.AddPolygonToBody(a, [1, 9, 5]);
    JSM.AddPolygonToBody(a, [2, 10, 6]);
    JSM.AddPolygonToBody(a, [3, 11, 7]);
    JSM.AddPolygonToBody(a, [0, 2, 6, 5, 9, 8]);
    JSM.AddPolygonToBody(a, [0, 4, 7, 11, 10, 2]);
    JSM.AddPolygonToBody(a, [1, 3, 7, 4, 8, 9]);
    JSM.AddPolygonToBody(a, [1, 5, 6, 10, 11, 3]);
    return a
}
;
JSM.GenerateCuboctahedron = function() {
    var a = new JSM.Body;
    JSM.AddVertexToBody(a, 1, 1, 0);
    JSM.AddVertexToBody(a, 1, -1, 0);
    JSM.AddVertexToBody(a, -1, -1, 0);
    JSM.AddVertexToBody(a, -1, 1, 0);
    JSM.AddVertexToBody(a, 1, 0, 1);
    JSM.AddVertexToBody(a, 1, 0, -1);
    JSM.AddVertexToBody(a, -1, 0, 1);
    JSM.AddVertexToBody(a, -1, 0, -1);
    JSM.AddVertexToBody(a, 0, 1, 1);
    JSM.AddVertexToBody(a, 0, -1, -1);
    JSM.AddVertexToBody(a, 0, -1, 1);
    JSM.AddVertexToBody(a, 0, 1, -1);
    JSM.AddPolygonToBody(a, [0, 5, 11]);
    JSM.AddPolygonToBody(a, [0, 8, 4]);
    JSM.AddPolygonToBody(a, [1, 4, 10]);
    JSM.AddPolygonToBody(a, [1, 9, 5]);
    JSM.AddPolygonToBody(a, [2, 7, 9]);
    JSM.AddPolygonToBody(a, [2, 10, 6]);
    JSM.AddPolygonToBody(a, [3, 6, 8]);
    JSM.AddPolygonToBody(a, [3, 11, 7]);
    JSM.AddPolygonToBody(a, [0, 4, 1, 5]);
    JSM.AddPolygonToBody(a, [0, 11, 3, 8]);
    JSM.AddPolygonToBody(a, [1, 10, 2, 9]);
    JSM.AddPolygonToBody(a, [2, 6, 3, 7]);
    JSM.AddPolygonToBody(a, [4, 8, 6, 10]);
    JSM.AddPolygonToBody(a, [5, 9, 7, 11]);
    return a
}
;
JSM.GenerateTruncatedCube = function() {
    var a = new JSM.Body
      , b = Math.sqrt(2) - 1;
    JSM.AddVertexToBody(a, 1, 1, +b);
    JSM.AddVertexToBody(a, 1, 1, -b);
    JSM.AddVertexToBody(a, 1, -1, +b);
    JSM.AddVertexToBody(a, -1, 1, +b);
    JSM.AddVertexToBody(a, 1, -1, -b);
    JSM.AddVertexToBody(a, -1, 1, -b);
    JSM.AddVertexToBody(a, -1, -1, +b);
    JSM.AddVertexToBody(a, -1, -1, -b);
    JSM.AddVertexToBody(a, 1, +b, 1);
    JSM.AddVertexToBody(a, 1, +b, -1);
    JSM.AddVertexToBody(a, 1, -b, 1);
    JSM.AddVertexToBody(a, -1, +b, 1);
    JSM.AddVertexToBody(a, 1, -b, -1);
    JSM.AddVertexToBody(a, -1, +b, -1);
    JSM.AddVertexToBody(a, -1, -b, 1);
    JSM.AddVertexToBody(a, -1, -b, -1);
    JSM.AddVertexToBody(a, +b, 1, 1);
    JSM.AddVertexToBody(a, +b, 1, -1);
    JSM.AddVertexToBody(a, +b, -1, 1);
    JSM.AddVertexToBody(a, -b, 1, 1);
    JSM.AddVertexToBody(a, +b, -1, -1);
    JSM.AddVertexToBody(a, -b, 1, -1);
    JSM.AddVertexToBody(a, -b, -1, 1);
    JSM.AddVertexToBody(a, -b, -1, -1);
    JSM.AddPolygonToBody(a, [0, 16, 8]);
    JSM.AddPolygonToBody(a, [1, 9, 17]);
    JSM.AddPolygonToBody(a, [2, 10, 18]);
    JSM.AddPolygonToBody(a, [3, 11, 19]);
    JSM.AddPolygonToBody(a, [4, 20, 12]);
    JSM.AddPolygonToBody(a, [5, 21, 13]);
    JSM.AddPolygonToBody(a, [6, 22, 14]);
    JSM.AddPolygonToBody(a, [7, 15, 23]);
    JSM.AddPolygonToBody(a, [0, 1, 17, 21, 5, 3, 19, 16]);
    JSM.AddPolygonToBody(a, [0, 8, 10, 2, 4, 12, 9, 1]);
    JSM.AddPolygonToBody(a, [2, 18, 22, 6, 7, 23, 20, 4]);
    JSM.AddPolygonToBody(a, [3, 5, 13, 15, 7, 6, 14, 11]);
    JSM.AddPolygonToBody(a, [8, 16, 19, 11, 14, 22, 18, 10]);
    JSM.AddPolygonToBody(a, [9, 12, 20, 23, 15, 13, 21, 17]);
    return a
}
;
JSM.GenerateTruncatedOctahedron = function() {
    var a = new JSM.Body;
    JSM.AddVertexToBody(a, 0, 1, 2);
    JSM.AddVertexToBody(a, 0, 1, -2);
    JSM.AddVertexToBody(a, 0, -1, 2);
    JSM.AddVertexToBody(a, 0, -1, -2);
    JSM.AddVertexToBody(a, 0, 2, 1);
    JSM.AddVertexToBody(a, 0, -2, 1);
    JSM.AddVertexToBody(a, 0, 2, -1);
    JSM.AddVertexToBody(a, 0, -2, -1);
    JSM.AddVertexToBody(a, 1, 0, 2);
    JSM.AddVertexToBody(a, 1, 0, -2);
    JSM.AddVertexToBody(a, -1, 0, 2);
    JSM.AddVertexToBody(a, -1, 0, -2);
    JSM.AddVertexToBody(a, 1, 2, 0);
    JSM.AddVertexToBody(a, 1, -2, 0);
    JSM.AddVertexToBody(a, -1, 2, 0);
    JSM.AddVertexToBody(a, -1, -2, 0);
    JSM.AddVertexToBody(a, 2, 0, 1);
    JSM.AddVertexToBody(a, -2, 0, 1);
    JSM.AddVertexToBody(a, 2, 0, -1);
    JSM.AddVertexToBody(a, -2, 0, -1);
    JSM.AddVertexToBody(a, 2, 1, 0);
    JSM.AddVertexToBody(a, -2, 1, 0);
    JSM.AddVertexToBody(a, 2, -1, 0);
    JSM.AddVertexToBody(a, -2, -1, 0);
    JSM.AddPolygonToBody(a, [0, 10, 2, 8]);
    JSM.AddPolygonToBody(a, [1, 9, 3, 11]);
    JSM.AddPolygonToBody(a, [4, 12, 6, 14]);
    JSM.AddPolygonToBody(a, [5, 15, 7, 13]);
    JSM.AddPolygonToBody(a, [16, 22, 18, 20]);
    JSM.AddPolygonToBody(a, [17, 21, 19, 23]);
    JSM.AddPolygonToBody(a, [0, 4, 14, 21, 17, 10]);
    JSM.AddPolygonToBody(a, [0, 8, 16, 20, 12, 4]);
    JSM.AddPolygonToBody(a, [1, 6, 12, 20, 18, 9]);
    JSM.AddPolygonToBody(a, [1, 11, 19, 21, 14, 6]);
    JSM.AddPolygonToBody(a, [2, 5, 13, 22, 16, 8]);
    JSM.AddPolygonToBody(a, [2, 10, 17, 23, 15, 5]);
    JSM.AddPolygonToBody(a, [3, 7, 15, 23, 19, 11]);
    JSM.AddPolygonToBody(a, [3, 9, 18, 22, 13, 7]);
    return a
}
;
JSM.GenerateRhombicuboctahedron = function() {
    var a = new JSM.Body
      , b = 1 + Math.sqrt(2);
    JSM.AddVertexToBody(a, 1, 1, +b);
    JSM.AddVertexToBody(a, 1, 1, -b);
    JSM.AddVertexToBody(a, 1, -1, +b);
    JSM.AddVertexToBody(a, -1, 1, +b);
    JSM.AddVertexToBody(a, 1, -1, -b);
    JSM.AddVertexToBody(a, -1, 1, -b);
    JSM.AddVertexToBody(a, -1, -1, +b);
    JSM.AddVertexToBody(a, -1, -1, -b);
    JSM.AddVertexToBody(a, 1, +b, 1);
    JSM.AddVertexToBody(a, 1, +b, -1);
    JSM.AddVertexToBody(a, 1, -b, 1);
    JSM.AddVertexToBody(a, -1, +b, 1);
    JSM.AddVertexToBody(a, 1, -b, -1);
    JSM.AddVertexToBody(a, -1, +b, -1);
    JSM.AddVertexToBody(a, -1, -b, 1);
    JSM.AddVertexToBody(a, -1, -b, -1);
    JSM.AddVertexToBody(a, +b, 1, 1);
    JSM.AddVertexToBody(a, +b, 1, -1);
    JSM.AddVertexToBody(a, +b, -1, 1);
    JSM.AddVertexToBody(a, -b, 1, 1);
    JSM.AddVertexToBody(a, +b, -1, -1);
    JSM.AddVertexToBody(a, -b, 1, -1);
    JSM.AddVertexToBody(a, -b, -1, 1);
    JSM.AddVertexToBody(a, -b, -1, -1);
    JSM.AddPolygonToBody(a, [0, 16, 8]);
    JSM.AddPolygonToBody(a, [1, 9, 17]);
    JSM.AddPolygonToBody(a, [2, 10, 18]);
    JSM.AddPolygonToBody(a, [3, 11, 19]);
    JSM.AddPolygonToBody(a, [4, 20, 12]);
    JSM.AddPolygonToBody(a, [5, 21, 13]);
    JSM.AddPolygonToBody(a, [6, 22, 14]);
    JSM.AddPolygonToBody(a, [7, 15, 23]);
    JSM.AddPolygonToBody(a, [0, 2, 18, 16]);
    JSM.AddPolygonToBody(a, [0, 3, 6, 2]);
    JSM.AddPolygonToBody(a, [0, 8, 11, 3]);
    JSM.AddPolygonToBody(a, [1, 4, 7, 5]);
    JSM.AddPolygonToBody(a, [1, 5, 13, 9]);
    JSM.AddPolygonToBody(a, [1, 17, 20, 4]);
    JSM.AddPolygonToBody(a, [2, 6, 14, 10]);
    JSM.AddPolygonToBody(a, [3, 19, 22, 6]);
    JSM.AddPolygonToBody(a, [4, 12, 15, 7]);
    JSM.AddPolygonToBody(a, [5, 7, 23, 21]);
    JSM.AddPolygonToBody(a, [8, 9, 13, 11]);
    JSM.AddPolygonToBody(a, [8, 16, 17, 9]);
    JSM.AddPolygonToBody(a, [10, 12, 20, 18]);
    JSM.AddPolygonToBody(a, [10, 14, 15, 12]);
    JSM.AddPolygonToBody(a, [11, 13, 21, 19]);
    JSM.AddPolygonToBody(a, [14, 22, 23, 15]);
    JSM.AddPolygonToBody(a, [16, 18, 20, 17]);
    JSM.AddPolygonToBody(a, [19, 21, 23, 22]);
    return a
}
;
JSM.GenerateTruncatedCuboctahedron = function() {
    var a = new JSM.Body
      , b = 1 + Math.sqrt(2)
      , c = 1 + 2 * Math.sqrt(2);
    JSM.AddVertexToBody(a, 1, +b, +c);
    JSM.AddVertexToBody(a, 1, +b, -c);
    JSM.AddVertexToBody(a, 1, -b, +c);
    JSM.AddVertexToBody(a, -1, +b, +c);
    JSM.AddVertexToBody(a, 1, -b, -c);
    JSM.AddVertexToBody(a, -1, +b, -c);
    JSM.AddVertexToBody(a, -1, -b, +c);
    JSM.AddVertexToBody(a, -1, -b, -c);
    JSM.AddVertexToBody(a, 1, +c, +b);
    JSM.AddVertexToBody(a, 1, -c, +b);
    JSM.AddVertexToBody(a, 1, +c, -b);
    JSM.AddVertexToBody(a, -1, +c, +b);
    JSM.AddVertexToBody(a, 1, -c, -b);
    JSM.AddVertexToBody(a, -1, -c, +b);
    JSM.AddVertexToBody(a, -1, +c, -b);
    JSM.AddVertexToBody(a, -1, -c, -b);
    JSM.AddVertexToBody(a, +b, 1, +c);
    JSM.AddVertexToBody(a, +b, 1, -c);
    JSM.AddVertexToBody(a, -b, 1, +c);
    JSM.AddVertexToBody(a, +b, -1, +c);
    JSM.AddVertexToBody(a, -b, 1, -c);
    JSM.AddVertexToBody(a, +b, -1, -c);
    JSM.AddVertexToBody(a, -b, -1, +c);
    JSM.AddVertexToBody(a, -b, -1, -c);
    JSM.AddVertexToBody(a, +b, +c, 1);
    JSM.AddVertexToBody(a, +b, -c, 1);
    JSM.AddVertexToBody(a, -b, +c, 1);
    JSM.AddVertexToBody(a, +b, +c, -1);
    JSM.AddVertexToBody(a, -b, -c, 1);
    JSM.AddVertexToBody(a, +b, -c, -1);
    JSM.AddVertexToBody(a, -b, +c, -1);
    JSM.AddVertexToBody(a, -b, -c, -1);
    JSM.AddVertexToBody(a, +c, 1, +b);
    JSM.AddVertexToBody(a, -c, 1, +b);
    JSM.AddVertexToBody(a, +c, 1, -b);
    JSM.AddVertexToBody(a, +c, -1, +b);
    JSM.AddVertexToBody(a, -c, 1, -b);
    JSM.AddVertexToBody(a, -c, -1, +b);
    JSM.AddVertexToBody(a, +c, -1, -b);
    JSM.AddVertexToBody(a, -c, -1, -b);
    JSM.AddVertexToBody(a, +c, +b, 1);
    JSM.AddVertexToBody(a, -c, +b, 1);
    JSM.AddVertexToBody(a, +c, -b, 1);
    JSM.AddVertexToBody(a, +c, +b, -1);
    JSM.AddVertexToBody(a, -c, -b, 1);
    JSM.AddVertexToBody(a, -c, +b, -1);
    JSM.AddVertexToBody(a, +c, -b, -1);
    JSM.AddVertexToBody(a, -c, -b, -1);
    JSM.AddPolygonToBody(a, [0, 8, 11, 3]);
    JSM.AddPolygonToBody(a, [1, 5, 14, 10]);
    JSM.AddPolygonToBody(a, [2, 6, 13, 9]);
    JSM.AddPolygonToBody(a, [4, 12, 15, 7]);
    JSM.AddPolygonToBody(a, [16, 19, 35, 32]);
    JSM.AddPolygonToBody(a, [17, 34, 38, 21]);
    JSM.AddPolygonToBody(a, [18, 33, 37, 22]);
    JSM.AddPolygonToBody(a, [23, 39, 36, 20]);
    JSM.AddPolygonToBody(a, [24, 40, 43, 27]);
    JSM.AddPolygonToBody(a, [25, 29, 46, 42]);
    JSM.AddPolygonToBody(a, [26, 30, 45, 41]);
    JSM.AddPolygonToBody(a, [28, 44, 47, 31]);
    JSM.AddPolygonToBody(a, [0, 16, 32, 40, 24, 8]);
    JSM.AddPolygonToBody(a, [1, 10, 27, 43, 34, 17]);
    JSM.AddPolygonToBody(a, [2, 9, 25, 42, 35, 19]);
    JSM.AddPolygonToBody(a, [3, 11, 26, 41, 33, 18]);
    JSM.AddPolygonToBody(a, [4, 21, 38, 46, 29, 12]);
    JSM.AddPolygonToBody(a, [5, 20, 36, 45, 30, 14]);
    JSM.AddPolygonToBody(a, [6, 22, 37, 44, 28, 13]);
    JSM.AddPolygonToBody(a, [7, 15, 31, 47, 39, 23]);
    JSM.AddPolygonToBody(a, [0, 3, 18, 22, 6, 2, 19, 16]);
    JSM.AddPolygonToBody(a, [1, 17, 21, 4, 7, 23, 20, 5]);
    JSM.AddPolygonToBody(a, [8, 24, 27, 10, 14, 30, 26, 11]);
    JSM.AddPolygonToBody(a, [9, 13, 28, 31, 15, 12, 29, 25]);
    JSM.AddPolygonToBody(a, [32, 35, 42, 46, 38, 34, 43, 40]);
    JSM.AddPolygonToBody(a, [33, 41, 45, 36, 39, 47, 44, 37]);
    return a
}
;
JSM.GenerateSnubCube = function() {
    var a = new JSM.Body
      , b = 1 / 3 * (Math.pow(17 + 3 * Math.sqrt(33), 1 / 3) - Math.pow(-17 + 3 * Math.sqrt(33), 1 / 3) - 1)
      , c = 1 / b;
    JSM.AddVertexToBody(a, 1, +b, -c);
    JSM.AddVertexToBody(a, 1, -b, +c);
    JSM.AddVertexToBody(a, -1, +b, +c);
    JSM.AddVertexToBody(a, -1, -b, -c);
    JSM.AddVertexToBody(a, +b, -c, 1);
    JSM.AddVertexToBody(a, -b, +c, 1);
    JSM.AddVertexToBody(a, +b, +c, -1);
    JSM.AddVertexToBody(a, -b, -c, -1);
    JSM.AddVertexToBody(a, -c, 1, +b);
    JSM.AddVertexToBody(a, +c, 1, -b);
    JSM.AddVertexToBody(a, +c, -1, +b);
    JSM.AddVertexToBody(a, -c, -1, -b);
    JSM.AddVertexToBody(a, 1, +c, +b);
    JSM.AddVertexToBody(a, 1, -c, -b);
    JSM.AddVertexToBody(a, -1, +c, -b);
    JSM.AddVertexToBody(a, -1, -c, +b);
    JSM.AddVertexToBody(a, +b, 1, +c);
    JSM.AddVertexToBody(a, -b, 1, -c);
    JSM.AddVertexToBody(a, -b, -1, +c);
    JSM.AddVertexToBody(a, +b, -1, -c);
    JSM.AddVertexToBody(a, +c, +b, 1);
    JSM.AddVertexToBody(a, -c, -b, 1);
    JSM.AddVertexToBody(a, +c, -b, -1);
    JSM.AddVertexToBody(a, -c, +b, -1);
    JSM.AddPolygonToBody(a, [0, 6, 9]);
    JSM.AddPolygonToBody(a, [0, 9, 22]);
    JSM.AddPolygonToBody(a, [0, 17, 6]);
    JSM.AddPolygonToBody(a, [0, 22, 19]);
    JSM.AddPolygonToBody(a, [1, 4, 10]);
    JSM.AddPolygonToBody(a, [1, 10, 20]);
    JSM.AddPolygonToBody(a, [1, 18, 4]);
    JSM.AddPolygonToBody(a, [1, 20, 16]);
    JSM.AddPolygonToBody(a, [2, 5, 8]);
    JSM.AddPolygonToBody(a, [2, 8, 21]);
    JSM.AddPolygonToBody(a, [2, 16, 5]);
    JSM.AddPolygonToBody(a, [2, 21, 18]);
    JSM.AddPolygonToBody(a, [3, 7, 11]);
    JSM.AddPolygonToBody(a, [3, 11, 23]);
    JSM.AddPolygonToBody(a, [3, 19, 7]);
    JSM.AddPolygonToBody(a, [3, 23, 17]);
    JSM.AddPolygonToBody(a, [4, 13, 10]);
    JSM.AddPolygonToBody(a, [4, 18, 15]);
    JSM.AddPolygonToBody(a, [5, 14, 8]);
    JSM.AddPolygonToBody(a, [5, 16, 12]);
    JSM.AddPolygonToBody(a, [6, 12, 9]);
    JSM.AddPolygonToBody(a, [6, 17, 14]);
    JSM.AddPolygonToBody(a, [7, 15, 11]);
    JSM.AddPolygonToBody(a, [7, 19, 13]);
    JSM.AddPolygonToBody(a, [8, 14, 23]);
    JSM.AddPolygonToBody(a, [9, 12, 20]);
    JSM.AddPolygonToBody(a, [10, 13, 22]);
    JSM.AddPolygonToBody(a, [11, 15, 21]);
    JSM.AddPolygonToBody(a, [12, 16, 20]);
    JSM.AddPolygonToBody(a, [13, 19, 22]);
    JSM.AddPolygonToBody(a, [14, 17, 23]);
    JSM.AddPolygonToBody(a, [15, 18, 21]);
    JSM.AddPolygonToBody(a, [0, 19, 3, 17]);
    JSM.AddPolygonToBody(a, [1, 16, 2, 18]);
    JSM.AddPolygonToBody(a, [4, 15, 7, 13]);
    JSM.AddPolygonToBody(a, [5, 12, 6, 14]);
    JSM.AddPolygonToBody(a, [8, 23, 11, 21]);
    JSM.AddPolygonToBody(a, [9, 20, 10, 22]);
    return a
}
;
JSM.GenerateIcosidodecahedron = function() {
    var a = new JSM.Body
      , b = (1 + Math.sqrt(5)) / 2
      , c = b / 2
      , d = (1 + b) / 2;
    JSM.AddVertexToBody(a, 0, 0, +b);
    JSM.AddVertexToBody(a, 0, 0, -b);
    JSM.AddVertexToBody(a, 0, +b, 0);
    JSM.AddVertexToBody(a, 0, -b, 0);
    JSM.AddVertexToBody(a, +b, 0, 0);
    JSM.AddVertexToBody(a, -b, 0, 0);
    JSM.AddVertexToBody(a, 0.5, +c, +d);
    JSM.AddVertexToBody(a, 0.5, +c, -d);
    JSM.AddVertexToBody(a, 0.5, -c, +d);
    JSM.AddVertexToBody(a, -0.5, +c, +d);
    JSM.AddVertexToBody(a, 0.5, -c, -d);
    JSM.AddVertexToBody(a, -0.5, +c, -d);
    JSM.AddVertexToBody(a, -0.5, -c, +d);
    JSM.AddVertexToBody(a, -0.5, -c, -d);
    JSM.AddVertexToBody(a, +c, +d, 0.5);
    JSM.AddVertexToBody(a, +c, -d, 0.5);
    JSM.AddVertexToBody(a, -c, +d, 0.5);
    JSM.AddVertexToBody(a, +c, +d, -0.5);
    JSM.AddVertexToBody(a, -c, -d, 0.5);
    JSM.AddVertexToBody(a, +c, -d, -0.5);
    JSM.AddVertexToBody(a, -c, +d, -0.5);
    JSM.AddVertexToBody(a, -c, -d, -0.5);
    JSM.AddVertexToBody(a, +d, 0.5, +c);
    JSM.AddVertexToBody(a, -d, 0.5, +c);
    JSM.AddVertexToBody(a, +d, 0.5, -c);
    JSM.AddVertexToBody(a, +d, -0.5, +c);
    JSM.AddVertexToBody(a, -d, 0.5, -c);
    JSM.AddVertexToBody(a, -d, -0.5, +c);
    JSM.AddVertexToBody(a, +d, -0.5, -c);
    JSM.AddVertexToBody(a, -d, -0.5, -c);
    JSM.AddPolygonToBody(a, [0, 6, 9]);
    JSM.AddPolygonToBody(a, [0, 12, 8]);
    JSM.AddPolygonToBody(a, [1, 10, 13]);
    JSM.AddPolygonToBody(a, [1, 11, 7]);
    JSM.AddPolygonToBody(a, [2, 14, 17]);
    JSM.AddPolygonToBody(a, [2, 20, 16]);
    JSM.AddPolygonToBody(a, [3, 18, 21]);
    JSM.AddPolygonToBody(a, [3, 19, 15]);
    JSM.AddPolygonToBody(a, [4, 22, 25]);
    JSM.AddPolygonToBody(a, [4, 28, 24]);
    JSM.AddPolygonToBody(a, [5, 26, 29]);
    JSM.AddPolygonToBody(a, [5, 27, 23]);
    JSM.AddPolygonToBody(a, [6, 22, 14]);
    JSM.AddPolygonToBody(a, [7, 17, 24]);
    JSM.AddPolygonToBody(a, [8, 15, 25]);
    JSM.AddPolygonToBody(a, [9, 16, 23]);
    JSM.AddPolygonToBody(a, [10, 28, 19]);
    JSM.AddPolygonToBody(a, [11, 26, 20]);
    JSM.AddPolygonToBody(a, [12, 27, 18]);
    JSM.AddPolygonToBody(a, [13, 21, 29]);
    JSM.AddPolygonToBody(a, [0, 8, 25, 22, 6]);
    JSM.AddPolygonToBody(a, [0, 9, 23, 27, 12]);
    JSM.AddPolygonToBody(a, [1, 7, 24, 28, 10]);
    JSM.AddPolygonToBody(a, [1, 13, 29, 26, 11]);
    JSM.AddPolygonToBody(a, [2, 16, 9, 6, 14]);
    JSM.AddPolygonToBody(a, [2, 17, 7, 11, 20]);
    JSM.AddPolygonToBody(a, [3, 15, 8, 12, 18]);
    JSM.AddPolygonToBody(a, [3, 21, 13, 10, 19]);
    JSM.AddPolygonToBody(a, [4, 24, 17, 14, 22]);
    JSM.AddPolygonToBody(a, [4, 25, 15, 19, 28]);
    JSM.AddPolygonToBody(a, [5, 23, 16, 20, 26]);
    JSM.AddPolygonToBody(a, [5, 29, 21, 18, 27]);
    return a
}
;
JSM.GenerateTruncatedDodecahedron = function() {
    var a = new JSM.Body
      , b = (1 + Math.sqrt(5)) / 2
      , c = 1 / b
      , d = 2 + b
      , e = 2 * b
      , f = Math.pow(b, 2);
    JSM.AddVertexToBody(a, 0, +c, +d);
    JSM.AddVertexToBody(a, 0, +c, -d);
    JSM.AddVertexToBody(a, 0, -c, +d);
    JSM.AddVertexToBody(a, 0, -c, -d);
    JSM.AddVertexToBody(a, +d, 0, +c);
    JSM.AddVertexToBody(a, -d, 0, +c);
    JSM.AddVertexToBody(a, +d, 0, -c);
    JSM.AddVertexToBody(a, -d, 0, -c);
    JSM.AddVertexToBody(a, +c, +d, 0);
    JSM.AddVertexToBody(a, +c, -d, 0);
    JSM.AddVertexToBody(a, -c, +d, 0);
    JSM.AddVertexToBody(a, -c, -d, 0);
    JSM.AddVertexToBody(a, +c, +b, +e);
    JSM.AddVertexToBody(a, +c, +b, -e);
    JSM.AddVertexToBody(a, +c, -b, +e);
    JSM.AddVertexToBody(a, -c, +b, +e);
    JSM.AddVertexToBody(a, +c, -b, -e);
    JSM.AddVertexToBody(a, -c, +b, -e);
    JSM.AddVertexToBody(a, -c, -b, +e);
    JSM.AddVertexToBody(a, -c, -b, -e);
    JSM.AddVertexToBody(a, +e, +c, +b);
    JSM.AddVertexToBody(a, +e, +c, -b);
    JSM.AddVertexToBody(a, +e, -c, +b);
    JSM.AddVertexToBody(a, -e, +c, +b);
    JSM.AddVertexToBody(a, +e, -c, -b);
    JSM.AddVertexToBody(a, -e, +c, -b);
    JSM.AddVertexToBody(a, -e, -c, +b);
    JSM.AddVertexToBody(a, -e, -c, -b);
    JSM.AddVertexToBody(a, +b, +e, +c);
    JSM.AddVertexToBody(a, +b, +e, -c);
    JSM.AddVertexToBody(a, +b, -e, +c);
    JSM.AddVertexToBody(a, -b, +e, +c);
    JSM.AddVertexToBody(a, +b, -e, -c);
    JSM.AddVertexToBody(a, -b, +e, -c);
    JSM.AddVertexToBody(a, -b, -e, +c);
    JSM.AddVertexToBody(a, -b, -e, -c);
    JSM.AddVertexToBody(a, +b, 2, +f);
    JSM.AddVertexToBody(a, +b, 2, -f);
    JSM.AddVertexToBody(a, +b, -2, +f);
    JSM.AddVertexToBody(a, -b, 2, +f);
    JSM.AddVertexToBody(a, +b, -2, -f);
    JSM.AddVertexToBody(a, -b, 2, -f);
    JSM.AddVertexToBody(a, -b, -2, +f);
    JSM.AddVertexToBody(a, -b, -2, -f);
    JSM.AddVertexToBody(a, +f, +b, 2);
    JSM.AddVertexToBody(a, +f, +b, -2);
    JSM.AddVertexToBody(a, +f, -b, 2);
    JSM.AddVertexToBody(a, -f, +b, 2);
    JSM.AddVertexToBody(a, +f, -b, -2);
    JSM.AddVertexToBody(a, -f, +b, -2);
    JSM.AddVertexToBody(a, -f, -b, 2);
    JSM.AddVertexToBody(a, -f, -b, -2);
    JSM.AddVertexToBody(a, 2, +f, +b);
    JSM.AddVertexToBody(a, 2, +f, -b);
    JSM.AddVertexToBody(a, 2, -f, +b);
    JSM.AddVertexToBody(a, -2, +f, +b);
    JSM.AddVertexToBody(a, 2, -f, -b);
    JSM.AddVertexToBody(a, -2, +f, -b);
    JSM.AddVertexToBody(a, -2, -f, +b);
    JSM.AddVertexToBody(a, -2, -f, -b);
    JSM.AddPolygonToBody(a, [0, 12, 15]);
    JSM.AddPolygonToBody(a, [1, 17, 13]);
    JSM.AddPolygonToBody(a, [2, 18, 14]);
    JSM.AddPolygonToBody(a, [3, 16, 19]);
    JSM.AddPolygonToBody(a, [4, 20, 22]);
    JSM.AddPolygonToBody(a, [5, 26, 23]);
    JSM.AddPolygonToBody(a, [6, 24, 21]);
    JSM.AddPolygonToBody(a, [7, 25, 27]);
    JSM.AddPolygonToBody(a, [8, 28, 29]);
    JSM.AddPolygonToBody(a, [9, 32, 30]);
    JSM.AddPolygonToBody(a, [10, 33, 31]);
    JSM.AddPolygonToBody(a, [11, 34, 35]);
    JSM.AddPolygonToBody(a, [36, 44, 52]);
    JSM.AddPolygonToBody(a, [37, 53, 45]);
    JSM.AddPolygonToBody(a, [38, 54, 46]);
    JSM.AddPolygonToBody(a, [39, 55, 47]);
    JSM.AddPolygonToBody(a, [40, 48, 56]);
    JSM.AddPolygonToBody(a, [41, 49, 57]);
    JSM.AddPolygonToBody(a, [42, 50, 58]);
    JSM.AddPolygonToBody(a, [43, 59, 51]);
    JSM.AddPolygonToBody(a, [0, 2, 14, 38, 46, 22, 20, 44, 36, 12]);
    JSM.AddPolygonToBody(a, [0, 15, 39, 47, 23, 26, 50, 42, 18, 2]);
    JSM.AddPolygonToBody(a, [1, 3, 19, 43, 51, 27, 25, 49, 41, 17]);
    JSM.AddPolygonToBody(a, [1, 13, 37, 45, 21, 24, 48, 40, 16, 3]);
    JSM.AddPolygonToBody(a, [4, 6, 21, 45, 53, 29, 28, 52, 44, 20]);
    JSM.AddPolygonToBody(a, [4, 22, 46, 54, 30, 32, 56, 48, 24, 6]);
    JSM.AddPolygonToBody(a, [5, 7, 27, 51, 59, 35, 34, 58, 50, 26]);
    JSM.AddPolygonToBody(a, [5, 23, 47, 55, 31, 33, 57, 49, 25, 7]);
    JSM.AddPolygonToBody(a, [8, 10, 31, 55, 39, 15, 12, 36, 52, 28]);
    JSM.AddPolygonToBody(a, [8, 29, 53, 37, 13, 17, 41, 57, 33, 10]);
    JSM.AddPolygonToBody(a, [9, 11, 35, 59, 43, 19, 16, 40, 56, 32]);
    JSM.AddPolygonToBody(a, [9, 30, 54, 38, 14, 18, 42, 58, 34, 11]);
    return a
}
;
JSM.GenerateTruncatedIcosahedron = function() {
    var a = new JSM.Body
      , b = (1 + Math.sqrt(5)) / 2
      , c = 3 * b
      , d = 1 + 2 * b
      , e = 2 + b
      , f = 2 * b;
    JSM.AddVertexToBody(a, 0, 1, +c);
    JSM.AddVertexToBody(a, 0, 1, -c);
    JSM.AddVertexToBody(a, 0, -1, +c);
    JSM.AddVertexToBody(a, 0, -1, -c);
    JSM.AddVertexToBody(a, 1, +c, 0);
    JSM.AddVertexToBody(a, 1, -c, 0);
    JSM.AddVertexToBody(a, -1, +c, 0);
    JSM.AddVertexToBody(a, -1, -c, 0);
    JSM.AddVertexToBody(a, +c, 0, 1);
    JSM.AddVertexToBody(a, -c, 0, 1);
    JSM.AddVertexToBody(a, +c, 0, -1);
    JSM.AddVertexToBody(a, -c, 0, -1);
    JSM.AddVertexToBody(a, 2, +d, +b);
    JSM.AddVertexToBody(a, 2, +d, -b);
    JSM.AddVertexToBody(a, 2, -d, +b);
    JSM.AddVertexToBody(a, -2, +d, +b);
    JSM.AddVertexToBody(a, 2, -d, -b);
    JSM.AddVertexToBody(a, -2, +d, -b);
    JSM.AddVertexToBody(a, -2, -d, +b);
    JSM.AddVertexToBody(a, -2, -d, -b);
    JSM.AddVertexToBody(a, +d, +b, 2);
    JSM.AddVertexToBody(a, +d, -b, 2);
    JSM.AddVertexToBody(a, -d, +b, 2);
    JSM.AddVertexToBody(a, +d, +b, -2);
    JSM.AddVertexToBody(a, -d, -b, 2);
    JSM.AddVertexToBody(a, +d, -b, -2);
    JSM.AddVertexToBody(a, -d, +b, -2);
    JSM.AddVertexToBody(a, -d, -b, -2);
    JSM.AddVertexToBody(a, +b, 2, +d);
    JSM.AddVertexToBody(a, -b, 2, +d);
    JSM.AddVertexToBody(a, +b, 2, -d);
    JSM.AddVertexToBody(a, +b, -2, +d);
    JSM.AddVertexToBody(a, -b, 2, -d);
    JSM.AddVertexToBody(a, -b, -2, +d);
    JSM.AddVertexToBody(a, +b, -2, -d);
    JSM.AddVertexToBody(a, -b, -2, -d);
    JSM.AddVertexToBody(a, 1, +e, +f);
    JSM.AddVertexToBody(a, 1, +e, -f);
    JSM.AddVertexToBody(a, 1, -e, +f);
    JSM.AddVertexToBody(a, -1, +e, +f);
    JSM.AddVertexToBody(a, 1, -e, -f);
    JSM.AddVertexToBody(a, -1, +e, -f);
    JSM.AddVertexToBody(a, -1, -e, +f);
    JSM.AddVertexToBody(a, -1, -e, -f);
    JSM.AddVertexToBody(a, +e, +f, 1);
    JSM.AddVertexToBody(a, +e, -f, 1);
    JSM.AddVertexToBody(a, -e, +f, 1);
    JSM.AddVertexToBody(a, +e, +f, -1);
    JSM.AddVertexToBody(a, -e, -f, 1);
    JSM.AddVertexToBody(a, +e, -f, -1);
    JSM.AddVertexToBody(a, -e, +f, -1);
    JSM.AddVertexToBody(a, -e, -f, -1);
    JSM.AddVertexToBody(a, +f, 1, +e);
    JSM.AddVertexToBody(a, -f, 1, +e);
    JSM.AddVertexToBody(a, +f, 1, -e);
    JSM.AddVertexToBody(a, +f, -1, +e);
    JSM.AddVertexToBody(a, -f, 1, -e);
    JSM.AddVertexToBody(a, -f, -1, +e);
    JSM.AddVertexToBody(a, +f, -1, -e);
    JSM.AddVertexToBody(a, -f, -1, -e);
    JSM.AddPolygonToBody(a, [0, 28, 36, 39, 29]);
    JSM.AddPolygonToBody(a, [1, 32, 41, 37, 30]);
    JSM.AddPolygonToBody(a, [2, 33, 42, 38, 31]);
    JSM.AddPolygonToBody(a, [3, 34, 40, 43, 35]);
    JSM.AddPolygonToBody(a, [4, 12, 44, 47, 13]);
    JSM.AddPolygonToBody(a, [5, 16, 49, 45, 14]);
    JSM.AddPolygonToBody(a, [6, 17, 50, 46, 15]);
    JSM.AddPolygonToBody(a, [7, 18, 48, 51, 19]);
    JSM.AddPolygonToBody(a, [8, 20, 52, 55, 21]);
    JSM.AddPolygonToBody(a, [9, 24, 57, 53, 22]);
    JSM.AddPolygonToBody(a, [10, 25, 58, 54, 23]);
    JSM.AddPolygonToBody(a, [11, 26, 56, 59, 27]);
    JSM.AddPolygonToBody(a, [0, 2, 31, 55, 52, 28]);
    JSM.AddPolygonToBody(a, [0, 29, 53, 57, 33, 2]);
    JSM.AddPolygonToBody(a, [1, 3, 35, 59, 56, 32]);
    JSM.AddPolygonToBody(a, [1, 30, 54, 58, 34, 3]);
    JSM.AddPolygonToBody(a, [4, 6, 15, 39, 36, 12]);
    JSM.AddPolygonToBody(a, [4, 13, 37, 41, 17, 6]);
    JSM.AddPolygonToBody(a, [5, 7, 19, 43, 40, 16]);
    JSM.AddPolygonToBody(a, [5, 14, 38, 42, 18, 7]);
    JSM.AddPolygonToBody(a, [8, 10, 23, 47, 44, 20]);
    JSM.AddPolygonToBody(a, [8, 21, 45, 49, 25, 10]);
    JSM.AddPolygonToBody(a, [9, 11, 27, 51, 48, 24]);
    JSM.AddPolygonToBody(a, [9, 22, 46, 50, 26, 11]);
    JSM.AddPolygonToBody(a, [12, 36, 28, 52, 20, 44]);
    JSM.AddPolygonToBody(a, [13, 47, 23, 54, 30, 37]);
    JSM.AddPolygonToBody(a, [14, 45, 21, 55, 31, 38]);
    JSM.AddPolygonToBody(a, [15, 46, 22, 53, 29, 39]);
    JSM.AddPolygonToBody(a, [16, 40, 34, 58, 25, 49]);
    JSM.AddPolygonToBody(a, [17, 41, 32, 56, 26, 50]);
    JSM.AddPolygonToBody(a, [18, 42, 33, 57, 24, 48]);
    JSM.AddPolygonToBody(a, [19, 51, 27, 59, 35, 43]);
    return a
}
;
JSM.GenerateRhombicosidodecahedron = function() {
    var a = new JSM.Body
      , b = (1 + Math.sqrt(5)) / 2
      , c = Math.pow(b, 2)
      , d = Math.pow(b, 3)
      , e = 2 * b
      , f = 2 + b;
    JSM.AddVertexToBody(a, 1, 1, +d);
    JSM.AddVertexToBody(a, 1, 1, -d);
    JSM.AddVertexToBody(a, 1, -1, +d);
    JSM.AddVertexToBody(a, -1, 1, +d);
    JSM.AddVertexToBody(a, 1, -1, -d);
    JSM.AddVertexToBody(a, -1, 1, -d);
    JSM.AddVertexToBody(a, -1, -1, +d);
    JSM.AddVertexToBody(a, -1, -1, -d);
    JSM.AddVertexToBody(a, +d, 1, 1);
    JSM.AddVertexToBody(a, +d, 1, -1);
    JSM.AddVertexToBody(a, +d, -1, 1);
    JSM.AddVertexToBody(a, -d, 1, 1);
    JSM.AddVertexToBody(a, +d, -1, -1);
    JSM.AddVertexToBody(a, -d, 1, -1);
    JSM.AddVertexToBody(a, -d, -1, 1);
    JSM.AddVertexToBody(a, -d, -1, -1);
    JSM.AddVertexToBody(a, 1, +d, 1);
    JSM.AddVertexToBody(a, 1, +d, -1);
    JSM.AddVertexToBody(a, 1, -d, 1);
    JSM.AddVertexToBody(a, -1, +d, 1);
    JSM.AddVertexToBody(a, 1, -d, -1);
    JSM.AddVertexToBody(a, -1, +d, -1);
    JSM.AddVertexToBody(a, -1, -d, 1);
    JSM.AddVertexToBody(a, -1, -d, -1);
    JSM.AddVertexToBody(a, +c, +b, +e);
    JSM.AddVertexToBody(a, +c, +b, -e);
    JSM.AddVertexToBody(a, +c, -b, +e);
    JSM.AddVertexToBody(a, -c, +b, +e);
    JSM.AddVertexToBody(a, +c, -b, -e);
    JSM.AddVertexToBody(a, -c, +b, -e);
    JSM.AddVertexToBody(a, -c, -b, +e);
    JSM.AddVertexToBody(a, -c, -b, -e);
    JSM.AddVertexToBody(a, +e, +c, +b);
    JSM.AddVertexToBody(a, +e, +c, -b);
    JSM.AddVertexToBody(a, +e, -c, +b);
    JSM.AddVertexToBody(a, -e, +c, +b);
    JSM.AddVertexToBody(a, +e, -c, -b);
    JSM.AddVertexToBody(a, -e, +c, -b);
    JSM.AddVertexToBody(a, -e, -c, +b);
    JSM.AddVertexToBody(a, -e, -c, -b);
    JSM.AddVertexToBody(a, +b, +e, +c);
    JSM.AddVertexToBody(a, +b, +e, -c);
    JSM.AddVertexToBody(a, +b, -e, +c);
    JSM.AddVertexToBody(a, -b, +e, +c);
    JSM.AddVertexToBody(a, +b, -e, -c);
    JSM.AddVertexToBody(a, -b, +e, -c);
    JSM.AddVertexToBody(a, -b, -e, +c);
    JSM.AddVertexToBody(a, -b, -e, -c);
    JSM.AddVertexToBody(a, +f, 0, +c);
    JSM.AddVertexToBody(a, +f, 0, -c);
    JSM.AddVertexToBody(a, -f, 0, +c);
    JSM.AddVertexToBody(a, -f, 0, -c);
    JSM.AddVertexToBody(a, +c, +f, 0);
    JSM.AddVertexToBody(a, -c, +f, 0);
    JSM.AddVertexToBody(a, +c, -f, 0);
    JSM.AddVertexToBody(a, -c, -f, 0);
    JSM.AddVertexToBody(a, 0, +c, +f);
    JSM.AddVertexToBody(a, 0, -c, +f);
    JSM.AddVertexToBody(a, 0, +c, -f);
    JSM.AddVertexToBody(a, 0, -c, -f);
    JSM.AddPolygonToBody(a, [0, 56, 3]);
    JSM.AddPolygonToBody(a, [1, 5, 58]);
    JSM.AddPolygonToBody(a, [2, 6, 57]);
    JSM.AddPolygonToBody(a, [4, 59, 7]);
    JSM.AddPolygonToBody(a, [8, 48, 10]);
    JSM.AddPolygonToBody(a, [9, 12, 49]);
    JSM.AddPolygonToBody(a, [11, 14, 50]);
    JSM.AddPolygonToBody(a, [13, 51, 15]);
    JSM.AddPolygonToBody(a, [16, 52, 17]);
    JSM.AddPolygonToBody(a, [18, 20, 54]);
    JSM.AddPolygonToBody(a, [19, 21, 53]);
    JSM.AddPolygonToBody(a, [22, 55, 23]);
    JSM.AddPolygonToBody(a, [24, 32, 40]);
    JSM.AddPolygonToBody(a, [25, 41, 33]);
    JSM.AddPolygonToBody(a, [26, 42, 34]);
    JSM.AddPolygonToBody(a, [27, 43, 35]);
    JSM.AddPolygonToBody(a, [28, 36, 44]);
    JSM.AddPolygonToBody(a, [29, 37, 45]);
    JSM.AddPolygonToBody(a, [30, 38, 46]);
    JSM.AddPolygonToBody(a, [31, 47, 39]);
    JSM.AddPolygonToBody(a, [0, 3, 6, 2]);
    JSM.AddPolygonToBody(a, [0, 24, 40, 56]);
    JSM.AddPolygonToBody(a, [1, 4, 7, 5]);
    JSM.AddPolygonToBody(a, [1, 58, 41, 25]);
    JSM.AddPolygonToBody(a, [2, 57, 42, 26]);
    JSM.AddPolygonToBody(a, [3, 56, 43, 27]);
    JSM.AddPolygonToBody(a, [4, 28, 44, 59]);
    JSM.AddPolygonToBody(a, [5, 29, 45, 58]);
    JSM.AddPolygonToBody(a, [6, 30, 46, 57]);
    JSM.AddPolygonToBody(a, [7, 59, 47, 31]);
    JSM.AddPolygonToBody(a, [8, 10, 12, 9]);
    JSM.AddPolygonToBody(a, [8, 32, 24, 48]);
    JSM.AddPolygonToBody(a, [9, 49, 25, 33]);
    JSM.AddPolygonToBody(a, [10, 48, 26, 34]);
    JSM.AddPolygonToBody(a, [11, 13, 15, 14]);
    JSM.AddPolygonToBody(a, [11, 50, 27, 35]);
    JSM.AddPolygonToBody(a, [12, 36, 28, 49]);
    JSM.AddPolygonToBody(a, [13, 37, 29, 51]);
    JSM.AddPolygonToBody(a, [14, 38, 30, 50]);
    JSM.AddPolygonToBody(a, [15, 51, 31, 39]);
    JSM.AddPolygonToBody(a, [16, 17, 21, 19]);
    JSM.AddPolygonToBody(a, [16, 40, 32, 52]);
    JSM.AddPolygonToBody(a, [17, 52, 33, 41]);
    JSM.AddPolygonToBody(a, [18, 22, 23, 20]);
    JSM.AddPolygonToBody(a, [18, 54, 34, 42]);
    JSM.AddPolygonToBody(a, [19, 53, 35, 43]);
    JSM.AddPolygonToBody(a, [20, 44, 36, 54]);
    JSM.AddPolygonToBody(a, [21, 45, 37, 53]);
    JSM.AddPolygonToBody(a, [22, 46, 38, 55]);
    JSM.AddPolygonToBody(a, [23, 55, 39, 47]);
    JSM.AddPolygonToBody(a, [0, 2, 26, 48, 24]);
    JSM.AddPolygonToBody(a, [1, 25, 49, 28, 4]);
    JSM.AddPolygonToBody(a, [3, 27, 50, 30, 6]);
    JSM.AddPolygonToBody(a, [5, 7, 31, 51, 29]);
    JSM.AddPolygonToBody(a, [8, 9, 33, 52, 32]);
    JSM.AddPolygonToBody(a, [10, 34, 54, 36, 12]);
    JSM.AddPolygonToBody(a, [11, 35, 53, 37, 13]);
    JSM.AddPolygonToBody(a, [14, 15, 39, 55, 38]);
    JSM.AddPolygonToBody(a, [16, 19, 43, 56, 40]);
    JSM.AddPolygonToBody(a, [17, 41, 58, 45, 21]);
    JSM.AddPolygonToBody(a, [18, 42, 57, 46, 22]);
    JSM.AddPolygonToBody(a, [20, 23, 47, 59, 44]);
    return a
}
;
JSM.GenerateTruncatedIcosidodecahedron = function() {
    var a = new JSM.Body
      , b = (1 + Math.sqrt(5)) / 2
      , c = 1 / b
      , d = 3 + b
      , e = 2 / b
      , f = 1 + 2 * b
      , g = Math.pow(b, 2)
      , h = -1 + 3 * b
      , k = -1 + 2 * b
      , l = 2 + b
      , m = 2 * b;
    JSM.AddVertexToBody(a, +c, +c, +d);
    JSM.AddVertexToBody(a, +c, +c, -d);
    JSM.AddVertexToBody(a, +c, -c, +d);
    JSM.AddVertexToBody(a, -c, +c, +d);
    JSM.AddVertexToBody(a, +c, -c, -d);
    JSM.AddVertexToBody(a, -c, +c, -d);
    JSM.AddVertexToBody(a, -c, -c, +d);
    JSM.AddVertexToBody(a, -c, -c, -d);
    JSM.AddVertexToBody(a, +c, +d, +c);
    JSM.AddVertexToBody(a, +c, -d, +c);
    JSM.AddVertexToBody(a, -c, +d, +c);
    JSM.AddVertexToBody(a, +c, +d, -c);
    JSM.AddVertexToBody(a, -c, -d, +c);
    JSM.AddVertexToBody(a, +c, -d, -c);
    JSM.AddVertexToBody(a, -c, +d, -c);
    JSM.AddVertexToBody(a, -c, -d, -c);
    JSM.AddVertexToBody(a, +d, +c, +c);
    JSM.AddVertexToBody(a, -d, +c, +c);
    JSM.AddVertexToBody(a, +d, +c, -c);
    JSM.AddVertexToBody(a, +d, -c, +c);
    JSM.AddVertexToBody(a, -d, +c, -c);
    JSM.AddVertexToBody(a, -d, -c, +c);
    JSM.AddVertexToBody(a, +d, -c, -c);
    JSM.AddVertexToBody(a, -d, -c, -c);
    JSM.AddVertexToBody(a, +e, +b, +f);
    JSM.AddVertexToBody(a, +e, +b, -f);
    JSM.AddVertexToBody(a, +e, -b, +f);
    JSM.AddVertexToBody(a, -e, +b, +f);
    JSM.AddVertexToBody(a, +e, -b, -f);
    JSM.AddVertexToBody(a, -e, +b, -f);
    JSM.AddVertexToBody(a, -e, -b, +f);
    JSM.AddVertexToBody(a, -e, -b, -f);
    JSM.AddVertexToBody(a, +b, +f, +e);
    JSM.AddVertexToBody(a, +b, -f, +e);
    JSM.AddVertexToBody(a, -b, +f, +e);
    JSM.AddVertexToBody(a, +b, +f, -e);
    JSM.AddVertexToBody(a, -b, -f, +e);
    JSM.AddVertexToBody(a, +b, -f, -e);
    JSM.AddVertexToBody(a, -b, +f, -e);
    JSM.AddVertexToBody(a, -b, -f, -e);
    JSM.AddVertexToBody(a, +f, +e, +b);
    JSM.AddVertexToBody(a, -f, +e, +b);
    JSM.AddVertexToBody(a, +f, +e, -b);
    JSM.AddVertexToBody(a, +f, -e, +b);
    JSM.AddVertexToBody(a, -f, +e, -b);
    JSM.AddVertexToBody(a, -f, -e, +b);
    JSM.AddVertexToBody(a, +f, -e, -b);
    JSM.AddVertexToBody(a, -f, -e, -b);
    JSM.AddVertexToBody(a, +c, +g, +h);
    JSM.AddVertexToBody(a, +c, +g, -h);
    JSM.AddVertexToBody(a, +c, -g, +h);
    JSM.AddVertexToBody(a, -c, +g, +h);
    JSM.AddVertexToBody(a, +c, -g, -h);
    JSM.AddVertexToBody(a, -c, +g, -h);
    JSM.AddVertexToBody(a, -c, -g, +h);
    JSM.AddVertexToBody(a, -c, -g, -h);
    JSM.AddVertexToBody(a, +g, +h, +c);
    JSM.AddVertexToBody(a, +g, -h, +c);
    JSM.AddVertexToBody(a, -g, +h, +c);
    JSM.AddVertexToBody(a, +g, +h, -c);
    JSM.AddVertexToBody(a, -g, -h, +c);
    JSM.AddVertexToBody(a, +g, -h, -c);
    JSM.AddVertexToBody(a, -g, +h, -c);
    JSM.AddVertexToBody(a, -g, -h, -c);
    JSM.AddVertexToBody(a, +h, +c, +g);
    JSM.AddVertexToBody(a, -h, +c, +g);
    JSM.AddVertexToBody(a, +h, +c, -g);
    JSM.AddVertexToBody(a, +h, -c, +g);
    JSM.AddVertexToBody(a, -h, +c, -g);
    JSM.AddVertexToBody(a, -h, -c, +g);
    JSM.AddVertexToBody(a, +h, -c, -g);
    JSM.AddVertexToBody(a, -h, -c, -g);
    JSM.AddVertexToBody(a, +k, 2, +l);
    JSM.AddVertexToBody(a, +k, 2, -l);
    JSM.AddVertexToBody(a, +k, -2, +l);
    JSM.AddVertexToBody(a, -k, 2, +l);
    JSM.AddVertexToBody(a, +k, -2, -l);
    JSM.AddVertexToBody(a, -k, 2, -l);
    JSM.AddVertexToBody(a, -k, -2, +l);
    JSM.AddVertexToBody(a, -k, -2, -l);
    JSM.AddVertexToBody(a, 2, +l, +k);
    JSM.AddVertexToBody(a, 2, -l, +k);
    JSM.AddVertexToBody(a, -2, +l, +k);
    JSM.AddVertexToBody(a, 2, +l, -k);
    JSM.AddVertexToBody(a, -2, -l, +k);
    JSM.AddVertexToBody(a, 2, -l, -k);
    JSM.AddVertexToBody(a, -2, +l, -k);
    JSM.AddVertexToBody(a, -2, -l, -k);
    JSM.AddVertexToBody(a, +l, +k, 2);
    JSM.AddVertexToBody(a, -l, +k, 2);
    JSM.AddVertexToBody(a, +l, +k, -2);
    JSM.AddVertexToBody(a, +l, -k, 2);
    JSM.AddVertexToBody(a, -l, +k, -2);
    JSM.AddVertexToBody(a, -l, -k, 2);
    JSM.AddVertexToBody(a, +l, -k, -2);
    JSM.AddVertexToBody(a, -l, -k, -2);
    JSM.AddVertexToBody(a, +b, 3, +m);
    JSM.AddVertexToBody(a, +b, 3, -m);
    JSM.AddVertexToBody(a, +b, -3, +m);
    JSM.AddVertexToBody(a, -b, 3, +m);
    JSM.AddVertexToBody(a, +b, -3, -m);
    JSM.AddVertexToBody(a, -b, 3, -m);
    JSM.AddVertexToBody(a, -b, -3, +m);
    JSM.AddVertexToBody(a, -b, -3, -m);
    JSM.AddVertexToBody(a, 3, +m, +b);
    JSM.AddVertexToBody(a, 3, -m, +b);
    JSM.AddVertexToBody(a, -3, +m, +b);
    JSM.AddVertexToBody(a, 3, +m, -b);
    JSM.AddVertexToBody(a, -3, -m, +b);
    JSM.AddVertexToBody(a, 3, -m, -b);
    JSM.AddVertexToBody(a, -3, +m, -b);
    JSM.AddVertexToBody(a, -3, -m, -b);
    JSM.AddVertexToBody(a, +m, +b, 3);
    JSM.AddVertexToBody(a, -m, +b, 3);
    JSM.AddVertexToBody(a, +m, +b, -3);
    JSM.AddVertexToBody(a, +m, -b, 3);
    JSM.AddVertexToBody(a, -m, +b, -3);
    JSM.AddVertexToBody(a, -m, -b, 3);
    JSM.AddVertexToBody(a, +m, -b, -3);
    JSM.AddVertexToBody(a, -m, -b, -3);
    JSM.AddPolygonToBody(a, [0, 3, 6, 2]);
    JSM.AddPolygonToBody(a, [1, 4, 7, 5]);
    JSM.AddPolygonToBody(a, [8, 11, 14, 10]);
    JSM.AddPolygonToBody(a, [9, 12, 15, 13]);
    JSM.AddPolygonToBody(a, [16, 19, 22, 18]);
    JSM.AddPolygonToBody(a, [17, 20, 23, 21]);
    JSM.AddPolygonToBody(a, [24, 72, 96, 48]);
    JSM.AddPolygonToBody(a, [25, 49, 97, 73]);
    JSM.AddPolygonToBody(a, [26, 50, 98, 74]);
    JSM.AddPolygonToBody(a, [27, 51, 99, 75]);
    JSM.AddPolygonToBody(a, [28, 76, 100, 52]);
    JSM.AddPolygonToBody(a, [29, 77, 101, 53]);
    JSM.AddPolygonToBody(a, [30, 78, 102, 54]);
    JSM.AddPolygonToBody(a, [31, 55, 103, 79]);
    JSM.AddPolygonToBody(a, [32, 80, 104, 56]);
    JSM.AddPolygonToBody(a, [33, 57, 105, 81]);
    JSM.AddPolygonToBody(a, [34, 58, 106, 82]);
    JSM.AddPolygonToBody(a, [35, 59, 107, 83]);
    JSM.AddPolygonToBody(a, [36, 84, 108, 60]);
    JSM.AddPolygonToBody(a, [37, 85, 109, 61]);
    JSM.AddPolygonToBody(a, [38, 86, 110, 62]);
    JSM.AddPolygonToBody(a, [39, 63, 111, 87]);
    JSM.AddPolygonToBody(a, [40, 88, 112, 64]);
    JSM.AddPolygonToBody(a, [41, 65, 113, 89]);
    JSM.AddPolygonToBody(a, [42, 66, 114, 90]);
    JSM.AddPolygonToBody(a, [43, 67, 115, 91]);
    JSM.AddPolygonToBody(a, [44, 92, 116, 68]);
    JSM.AddPolygonToBody(a, [45, 93, 117, 69]);
    JSM.AddPolygonToBody(a, [46, 94, 118, 70]);
    JSM.AddPolygonToBody(a, [47, 71, 119, 95]);
    JSM.AddPolygonToBody(a, [0, 24, 48, 51, 27, 3]);
    JSM.AddPolygonToBody(a, [1, 5, 29, 53, 49, 25]);
    JSM.AddPolygonToBody(a, [2, 6, 30, 54, 50, 26]);
    JSM.AddPolygonToBody(a, [4, 28, 52, 55, 31, 7]);
    JSM.AddPolygonToBody(a, [8, 32, 56, 59, 35, 11]);
    JSM.AddPolygonToBody(a, [9, 13, 37, 61, 57, 33]);
    JSM.AddPolygonToBody(a, [10, 14, 38, 62, 58, 34]);
    JSM.AddPolygonToBody(a, [12, 36, 60, 63, 39, 15]);
    JSM.AddPolygonToBody(a, [16, 40, 64, 67, 43, 19]);
    JSM.AddPolygonToBody(a, [17, 21, 45, 69, 65, 41]);
    JSM.AddPolygonToBody(a, [18, 22, 46, 70, 66, 42]);
    JSM.AddPolygonToBody(a, [20, 44, 68, 71, 47, 23]);
    JSM.AddPolygonToBody(a, [72, 112, 88, 104, 80, 96]);
    JSM.AddPolygonToBody(a, [73, 97, 83, 107, 90, 114]);
    JSM.AddPolygonToBody(a, [74, 98, 81, 105, 91, 115]);
    JSM.AddPolygonToBody(a, [75, 99, 82, 106, 89, 113]);
    JSM.AddPolygonToBody(a, [76, 118, 94, 109, 85, 100]);
    JSM.AddPolygonToBody(a, [78, 117, 93, 108, 84, 102]);
    JSM.AddPolygonToBody(a, [79, 103, 87, 111, 95, 119]);
    JSM.AddPolygonToBody(a, [86, 101, 77, 116, 92, 110]);
    JSM.AddPolygonToBody(a, [0, 2, 26, 74, 115, 67, 64, 112, 72, 24]);
    JSM.AddPolygonToBody(a, [1, 25, 73, 114, 66, 70, 118, 76, 28, 4]);
    JSM.AddPolygonToBody(a, [3, 27, 75, 113, 65, 69, 117, 78, 30, 6]);
    JSM.AddPolygonToBody(a, [5, 7, 31, 79, 119, 71, 68, 116, 77, 29]);
    JSM.AddPolygonToBody(a, [8, 10, 34, 82, 99, 51, 48, 96, 80, 32]);
    JSM.AddPolygonToBody(a, [9, 33, 81, 98, 50, 54, 102, 84, 36, 12]);
    JSM.AddPolygonToBody(a, [11, 35, 83, 97, 49, 53, 101, 86, 38, 14]);
    JSM.AddPolygonToBody(a, [13, 15, 39, 87, 103, 55, 52, 100, 85, 37]);
    JSM.AddPolygonToBody(a, [16, 18, 42, 90, 107, 59, 56, 104, 88, 40]);
    JSM.AddPolygonToBody(a, [17, 41, 89, 106, 58, 62, 110, 92, 44, 20]);
    JSM.AddPolygonToBody(a, [19, 43, 91, 105, 57, 61, 109, 94, 46, 22]);
    JSM.AddPolygonToBody(a, [21, 23, 47, 95, 111, 63, 60, 108, 93, 45]);
    return a
}
;
JSM.GenerateSnubDodecahedron = function() {
    var a = new JSM.Body
      , b = (1 + Math.sqrt(5)) / 2
      , c = Math.pow(b / 2 + 0.5 * Math.sqrt(b - 5 / 27), 1 / 3) + Math.pow(b / 2 - 0.5 * Math.sqrt(b - 5 / 27), 1 / 3)
      , d = c - 1 / c
      , e = c * b + Math.pow(b, 2) + b / c
      , c = 2 * d
      , f = 2 * e
      , g = d + e / b + b
      , h = -(d * b) + e + 1 / b
      , k = d / b + e * b - 1
      , l = -(d / b) + e * b + 1
      , m = -d + e / b - b
      , n = d * b + e - 1 / b
      , q = -(d / b) + e * b - 1
      , p = d - e / b - b
      , r = d * b + e + 1 / b
      , s = d + e / b - b
      , v = d * b - e + 1 / b
      , b = d / b + e * b + 1;
    JSM.AddVertexToBody(a, +c, 2, -f);
    JSM.AddVertexToBody(a, +c, -2, +f);
    JSM.AddVertexToBody(a, -c, 2, +f);
    JSM.AddVertexToBody(a, -c, -2, -f);
    JSM.AddVertexToBody(a, 2, -f, +c);
    JSM.AddVertexToBody(a, -2, +f, +c);
    JSM.AddVertexToBody(a, 2, +f, -c);
    JSM.AddVertexToBody(a, -2, -f, -c);
    JSM.AddVertexToBody(a, -f, +c, 2);
    JSM.AddVertexToBody(a, +f, +c, -2);
    JSM.AddVertexToBody(a, +f, -c, 2);
    JSM.AddVertexToBody(a, -f, -c, -2);
    JSM.AddVertexToBody(a, +g, +h, -k);
    JSM.AddVertexToBody(a, +g, -h, +k);
    JSM.AddVertexToBody(a, -g, +h, +k);
    JSM.AddVertexToBody(a, -g, -h, -k);
    JSM.AddVertexToBody(a, +h, -k, +g);
    JSM.AddVertexToBody(a, -h, +k, +g);
    JSM.AddVertexToBody(a, +h, +k, -g);
    JSM.AddVertexToBody(a, -h, -k, -g);
    JSM.AddVertexToBody(a, -k, +g, +h);
    JSM.AddVertexToBody(a, +k, +g, -h);
    JSM.AddVertexToBody(a, +k, -g, +h);
    JSM.AddVertexToBody(a, -k, -g, -h);
    JSM.AddVertexToBody(a, +l, +m, -n);
    JSM.AddVertexToBody(a, +l, -m, +n);
    JSM.AddVertexToBody(a, -l, +m, +n);
    JSM.AddVertexToBody(a, -l, -m, -n);
    JSM.AddVertexToBody(a, +m, -n, +l);
    JSM.AddVertexToBody(a, -m, +n, +l);
    JSM.AddVertexToBody(a, +m, +n, -l);
    JSM.AddVertexToBody(a, -m, -n, -l);
    JSM.AddVertexToBody(a, -n, +l, +m);
    JSM.AddVertexToBody(a, +n, +l, -m);
    JSM.AddVertexToBody(a, +n, -l, +m);
    JSM.AddVertexToBody(a, -n, -l, -m);
    JSM.AddVertexToBody(a, +q, +p, -r);
    JSM.AddVertexToBody(a, +q, -p, +r);
    JSM.AddVertexToBody(a, -q, +p, +r);
    JSM.AddVertexToBody(a, -q, -p, -r);
    JSM.AddVertexToBody(a, +p, -r, +q);
    JSM.AddVertexToBody(a, -p, +r, +q);
    JSM.AddVertexToBody(a, +p, +r, -q);
    JSM.AddVertexToBody(a, -p, -r, -q);
    JSM.AddVertexToBody(a, -r, +q, +p);
    JSM.AddVertexToBody(a, +r, +q, -p);
    JSM.AddVertexToBody(a, +r, -q, +p);
    JSM.AddVertexToBody(a, -r, -q, -p);
    JSM.AddVertexToBody(a, +s, +v, -b);
    JSM.AddVertexToBody(a, +s, -v, +b);
    JSM.AddVertexToBody(a, -s, +v, +b);
    JSM.AddVertexToBody(a, -s, -v, -b);
    JSM.AddVertexToBody(a, +v, -b, +s);
    JSM.AddVertexToBody(a, -v, +b, +s);
    JSM.AddVertexToBody(a, +v, +b, -s);
    JSM.AddVertexToBody(a, -v, -b, -s);
    JSM.AddVertexToBody(a, -b, +s, +v);
    JSM.AddVertexToBody(a, +b, +s, -v);
    JSM.AddVertexToBody(a, +b, -s, +v);
    JSM.AddVertexToBody(a, -b, -s, -v);
    JSM.AddPolygonToBody(a, [0, 3, 51]);
    JSM.AddPolygonToBody(a, [0, 30, 12]);
    JSM.AddPolygonToBody(a, [0, 48, 3]);
    JSM.AddPolygonToBody(a, [0, 51, 30]);
    JSM.AddPolygonToBody(a, [1, 2, 50]);
    JSM.AddPolygonToBody(a, [1, 28, 13]);
    JSM.AddPolygonToBody(a, [1, 49, 2]);
    JSM.AddPolygonToBody(a, [1, 50, 28]);
    JSM.AddPolygonToBody(a, [2, 29, 14]);
    JSM.AddPolygonToBody(a, [2, 49, 29]);
    JSM.AddPolygonToBody(a, [3, 31, 15]);
    JSM.AddPolygonToBody(a, [3, 48, 31]);
    JSM.AddPolygonToBody(a, [4, 7, 55]);
    JSM.AddPolygonToBody(a, [4, 34, 16]);
    JSM.AddPolygonToBody(a, [4, 52, 7]);
    JSM.AddPolygonToBody(a, [4, 55, 34]);
    JSM.AddPolygonToBody(a, [5, 6, 54]);
    JSM.AddPolygonToBody(a, [5, 32, 17]);
    JSM.AddPolygonToBody(a, [5, 53, 6]);
    JSM.AddPolygonToBody(a, [5, 54, 32]);
    JSM.AddPolygonToBody(a, [6, 33, 18]);
    JSM.AddPolygonToBody(a, [6, 53, 33]);
    JSM.AddPolygonToBody(a, [7, 35, 19]);
    JSM.AddPolygonToBody(a, [7, 52, 35]);
    JSM.AddPolygonToBody(a, [8, 11, 59]);
    JSM.AddPolygonToBody(a, [8, 26, 20]);
    JSM.AddPolygonToBody(a, [8, 56, 11]);
    JSM.AddPolygonToBody(a, [8, 59, 26]);
    JSM.AddPolygonToBody(a, [9, 10, 58]);
    JSM.AddPolygonToBody(a, [9, 24, 21]);
    JSM.AddPolygonToBody(a, [9, 57, 10]);
    JSM.AddPolygonToBody(a, [9, 58, 24]);
    JSM.AddPolygonToBody(a, [10, 25, 22]);
    JSM.AddPolygonToBody(a, [10, 57, 25]);
    JSM.AddPolygonToBody(a, [11, 27, 23]);
    JSM.AddPolygonToBody(a, [11, 56, 27]);
    JSM.AddPolygonToBody(a, [12, 18, 21]);
    JSM.AddPolygonToBody(a, [12, 21, 24]);
    JSM.AddPolygonToBody(a, [12, 30, 18]);
    JSM.AddPolygonToBody(a, [13, 16, 22]);
    JSM.AddPolygonToBody(a, [13, 22, 25]);
    JSM.AddPolygonToBody(a, [13, 28, 16]);
    JSM.AddPolygonToBody(a, [14, 17, 20]);
    JSM.AddPolygonToBody(a, [14, 20, 26]);
    JSM.AddPolygonToBody(a, [14, 29, 17]);
    JSM.AddPolygonToBody(a, [15, 19, 23]);
    JSM.AddPolygonToBody(a, [15, 23, 27]);
    JSM.AddPolygonToBody(a, [15, 31, 19]);
    JSM.AddPolygonToBody(a, [16, 34, 22]);
    JSM.AddPolygonToBody(a, [17, 32, 20]);
    JSM.AddPolygonToBody(a, [18, 33, 21]);
    JSM.AddPolygonToBody(a, [19, 35, 23]);
    JSM.AddPolygonToBody(a, [24, 58, 36]);
    JSM.AddPolygonToBody(a, [25, 57, 37]);
    JSM.AddPolygonToBody(a, [26, 59, 38]);
    JSM.AddPolygonToBody(a, [27, 56, 39]);
    JSM.AddPolygonToBody(a, [28, 50, 40]);
    JSM.AddPolygonToBody(a, [29, 49, 41]);
    JSM.AddPolygonToBody(a, [30, 51, 42]);
    JSM.AddPolygonToBody(a, [31, 48, 43]);
    JSM.AddPolygonToBody(a, [32, 54, 44]);
    JSM.AddPolygonToBody(a, [33, 53, 45]);
    JSM.AddPolygonToBody(a, [34, 55, 46]);
    JSM.AddPolygonToBody(a, [35, 52, 47]);
    JSM.AddPolygonToBody(a, [36, 43, 48]);
    JSM.AddPolygonToBody(a, [36, 46, 43]);
    JSM.AddPolygonToBody(a, [36, 58, 46]);
    JSM.AddPolygonToBody(a, [37, 41, 49]);
    JSM.AddPolygonToBody(a, [37, 45, 41]);
    JSM.AddPolygonToBody(a, [37, 57, 45]);
    JSM.AddPolygonToBody(a, [38, 40, 50]);
    JSM.AddPolygonToBody(a, [38, 47, 40]);
    JSM.AddPolygonToBody(a, [38, 59, 47]);
    JSM.AddPolygonToBody(a, [39, 42, 51]);
    JSM.AddPolygonToBody(a, [39, 44, 42]);
    JSM.AddPolygonToBody(a, [39, 56, 44]);
    JSM.AddPolygonToBody(a, [40, 47, 52]);
    JSM.AddPolygonToBody(a, [41, 45, 53]);
    JSM.AddPolygonToBody(a, [42, 44, 54]);
    JSM.AddPolygonToBody(a, [43, 46, 55]);
    JSM.AddPolygonToBody(a, [0, 12, 24, 36, 48]);
    JSM.AddPolygonToBody(a, [1, 13, 25, 37, 49]);
    JSM.AddPolygonToBody(a, [2, 14, 26, 38, 50]);
    JSM.AddPolygonToBody(a, [3, 15, 27, 39, 51]);
    JSM.AddPolygonToBody(a, [4, 16, 28, 40, 52]);
    JSM.AddPolygonToBody(a, [5, 17, 29, 41, 53]);
    JSM.AddPolygonToBody(a, [6, 18, 30, 42, 54]);
    JSM.AddPolygonToBody(a, [7, 19, 31, 43, 55]);
    JSM.AddPolygonToBody(a, [8, 20, 32, 44, 56]);
    JSM.AddPolygonToBody(a, [9, 21, 33, 45, 57]);
    JSM.AddPolygonToBody(a, [10, 22, 34, 46, 58]);
    JSM.AddPolygonToBody(a, [11, 23, 35, 47, 59]);
    return a
}
;
JSM.AddCumulatedPolygonToBody = function(a, b, c) {
    var d = new JSM.Coord(0,0,0), e = new JSM.Vector(0,0,0), f = [], g;
    for (g = 0; g < b.length; g++)
        f.push(a.GetVertexPosition(b[g]));
    g = JSM.CalculateCentroid(f);
    f = JSM.CalculateNormal(f);
    d.Set(g.x, g.y, g.z);
    e.Set(f.x, f.y, f.z);
    d.Offset(e, c);
    c = a.VertexCount();
    JSM.AddVertexToBody(a, d.x, d.y, d.z);
    d = b.length;
    for (e = 0; e < d; e++)
        f = b[e],
        g = b[e < d - 1 ? e + 1 : 0],
        JSM.AddPolygonToBody(a, [f, g, c])
}
;
JSM.GenerateCumulatedTetrahedron = function(a) {
    var b = new JSM.Body;
    b.AddVertex(new JSM.BodyVertex(new JSM.Coord(1,1,1)));
    b.AddVertex(new JSM.BodyVertex(new JSM.Coord(-1,-1,1)));
    b.AddVertex(new JSM.BodyVertex(new JSM.Coord(-1,1,-1)));
    b.AddVertex(new JSM.BodyVertex(new JSM.Coord(1,-1,-1)));
    a *= 2 * Math.sqrt(2);
    JSM.AddCumulatedPolygonToBody(b, [0, 1, 3], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 2, 1], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 3, 2], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 2, 3], a);
    return b
}
;
JSM.GenerateCumulatedHexahedron = function(a) {
    var b = new JSM.Body;
    JSM.AddVertexToBody(b, 1, 1, 1);
    JSM.AddVertexToBody(b, 1, 1, -1);
    JSM.AddVertexToBody(b, 1, -1, 1);
    JSM.AddVertexToBody(b, -1, 1, 1);
    JSM.AddVertexToBody(b, 1, -1, -1);
    JSM.AddVertexToBody(b, -1, 1, -1);
    JSM.AddVertexToBody(b, -1, -1, 1);
    JSM.AddVertexToBody(b, -1, -1, -1);
    a *= 2;
    JSM.AddCumulatedPolygonToBody(b, [0, 1, 5, 3], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 2, 4, 1], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 3, 6, 2], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 4, 7, 5], a);
    JSM.AddCumulatedPolygonToBody(b, [2, 6, 7, 4], a);
    JSM.AddCumulatedPolygonToBody(b, [3, 5, 7, 6], a);
    return b
}
;
JSM.GenerateCumulatedOctahedron = function(a) {
    var b = new JSM.Body;
    JSM.AddVertexToBody(b, 1, 0, 0);
    JSM.AddVertexToBody(b, -1, 0, 0);
    JSM.AddVertexToBody(b, 0, 1, 0);
    JSM.AddVertexToBody(b, 0, -1, 0);
    JSM.AddVertexToBody(b, 0, 0, 1);
    JSM.AddVertexToBody(b, 0, 0, -1);
    a *= Math.sqrt(2);
    JSM.AddCumulatedPolygonToBody(b, [0, 2, 4], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 3, 5], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 4, 3], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 5, 2], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 2, 5], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 3, 4], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 4, 2], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 5, 3], a);
    return b
}
;
JSM.GenerateCumulatedDodecahedron = function(a) {
    var b = new JSM.Body
      , c = (1 + Math.sqrt(5)) / 2
      , d = 1 / c;
    JSM.AddVertexToBody(b, 1, 1, 1);
    JSM.AddVertexToBody(b, 1, 1, -1);
    JSM.AddVertexToBody(b, 1, -1, 1);
    JSM.AddVertexToBody(b, -1, 1, 1);
    JSM.AddVertexToBody(b, 1, -1, -1);
    JSM.AddVertexToBody(b, -1, 1, -1);
    JSM.AddVertexToBody(b, -1, -1, 1);
    JSM.AddVertexToBody(b, -1, -1, -1);
    JSM.AddVertexToBody(b, 0, +d, +c);
    JSM.AddVertexToBody(b, 0, +d, -c);
    JSM.AddVertexToBody(b, 0, -d, +c);
    JSM.AddVertexToBody(b, 0, -d, -c);
    JSM.AddVertexToBody(b, +d, +c, 0);
    JSM.AddVertexToBody(b, +d, -c, 0);
    JSM.AddVertexToBody(b, -d, +c, 0);
    JSM.AddVertexToBody(b, -d, -c, 0);
    JSM.AddVertexToBody(b, +c, 0, +d);
    JSM.AddVertexToBody(b, -c, 0, +d);
    JSM.AddVertexToBody(b, +c, 0, -d);
    JSM.AddVertexToBody(b, -c, 0, -d);
    a *= Math.sqrt(5) - 1;
    JSM.AddCumulatedPolygonToBody(b, [0, 8, 10, 2, 16], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 16, 18, 1, 12], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 12, 14, 3, 8], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 9, 5, 14, 12], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 18, 4, 11, 9], a);
    JSM.AddCumulatedPolygonToBody(b, [2, 10, 6, 15, 13], a);
    JSM.AddCumulatedPolygonToBody(b, [2, 13, 4, 18, 16], a);
    JSM.AddCumulatedPolygonToBody(b, [3, 14, 5, 19, 17], a);
    JSM.AddCumulatedPolygonToBody(b, [3, 17, 6, 10, 8], a);
    JSM.AddCumulatedPolygonToBody(b, [4, 13, 15, 7, 11], a);
    JSM.AddCumulatedPolygonToBody(b, [5, 9, 11, 7, 19], a);
    JSM.AddCumulatedPolygonToBody(b, [6, 17, 19, 7, 15], a);
    return b
}
;
JSM.GenerateCumulatedIcosahedron = function(a) {
    var b = new JSM.Body
      , c = (1 + Math.sqrt(5)) / 2;
    JSM.AddVertexToBody(b, 0, 1, +c);
    JSM.AddVertexToBody(b, 0, 1, -c);
    JSM.AddVertexToBody(b, 0, -1, +c);
    JSM.AddVertexToBody(b, 0, -1, -c);
    JSM.AddVertexToBody(b, 1, +c, 0);
    JSM.AddVertexToBody(b, 1, -c, 0);
    JSM.AddVertexToBody(b, -1, +c, 0);
    JSM.AddVertexToBody(b, -1, -c, 0);
    JSM.AddVertexToBody(b, +c, 0, 1);
    JSM.AddVertexToBody(b, -c, 0, 1);
    JSM.AddVertexToBody(b, +c, 0, -1);
    JSM.AddVertexToBody(b, -c, 0, -1);
    a *= 2;
    JSM.AddCumulatedPolygonToBody(b, [0, 2, 8], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 4, 6], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 6, 9], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 8, 4], a);
    JSM.AddCumulatedPolygonToBody(b, [0, 9, 2], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 3, 11], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 4, 10], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 6, 4], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 10, 3], a);
    JSM.AddCumulatedPolygonToBody(b, [1, 11, 6], a);
    JSM.AddCumulatedPolygonToBody(b, [2, 5, 8], a);
    JSM.AddCumulatedPolygonToBody(b, [2, 7, 5], a);
    JSM.AddCumulatedPolygonToBody(b, [2, 9, 7], a);
    JSM.AddCumulatedPolygonToBody(b, [3, 5, 7], a);
    JSM.AddCumulatedPolygonToBody(b, [3, 7, 11], a);
    JSM.AddCumulatedPolygonToBody(b, [3, 10, 5], a);
    JSM.AddCumulatedPolygonToBody(b, [4, 8, 10], a);
    JSM.AddCumulatedPolygonToBody(b, [6, 11, 9], a);
    JSM.AddCumulatedPolygonToBody(b, [5, 10, 8], a);
    JSM.AddCumulatedPolygonToBody(b, [7, 9, 11], a);
    return b
}
;
JSM.GenerateTetrakisHexahedron = function() {
    return JSM.GenerateCumulatedHexahedron(0.25)
}
;
JSM.GenerateRhombicDodecahedron = function() {
    return JSM.GenerateCumulatedHexahedron(0.5)
}
;
JSM.GeneratePentakisDodecahedron = function() {
    var a = Math.sqrt((65 + 22 * Math.sqrt(5)) / 5) / 19;
    return JSM.GenerateCumulatedDodecahedron(a)
}
;
JSM.GenerateSmallStellatedDodecahedron = function() {
    var a = Math.sqrt((5 + 2 * Math.sqrt(5)) / 5);
    return JSM.GenerateCumulatedDodecahedron(a)
}
;
JSM.GenerateGreatDodecahedron = function() {
    var a = Math.sqrt(3) * (Math.sqrt(5) - 3) / 6;
    return JSM.GenerateCumulatedIcosahedron(a)
}
;
JSM.GenerateSmallTriambicIcosahedron = function() {
    var a = Math.sqrt(15) / 15;
    return JSM.GenerateCumulatedIcosahedron(a)
}
;
JSM.GenerateGreatStellatedDodecahedron = function() {
    var a = Math.sqrt(3) * (3 + Math.sqrt(5)) / 6;
    return JSM.GenerateCumulatedIcosahedron(a)
}
;
JSM.GenerateSmallTriakisOctahedron = function() {
    var a = Math.sqrt(3) - 2 * Math.sqrt(6) / 3;
    return JSM.GenerateCumulatedOctahedron(a)
}
;
JSM.GenerateStellaOctangula = function() {
    var a = Math.sqrt(6) / 3;
    return JSM.GenerateCumulatedOctahedron(a)
}
;
JSM.GenerateTriakisTetrahedron = function() {
    var a = Math.sqrt(6) / 15;
    return JSM.GenerateCumulatedTetrahedron(a)
}
;
JSM.LegoDimensions = function() {
    this.legoWidth = 0.78;
    this.legoSmallHeight = 0.32;
    this.legoLargeHeight = 0.96;
    this.legoWallWidth = 0.16;
    this.legoCylinderWidth = 0.5;
    this.legoCylinderHeight = 0.17;
    this.legoBottomSmallCylinderWidth = 0.3;
    this.legoBottomLargeCylinderWidth = 0.6;
    this.legoBottomLargeCylinderWallWidth = 0.1
}
;
JSM.GenerateLegoBrick = function(a, b, c, d, e, f, g) {
    function h(a, b) {
        var c, d;
        for (c = 0; c < a.VertexCount(); c++)
            d = a.GetVertex(c),
            d.position = JSM.CoordAdd(d.position, b)
    }
    var k = new JSM.LegoDimensions
      , l = new JSM.Vector(0,0,1)
      , m = k.legoWidth
      , n = k.legoLargeHeight;
    c || (n = k.legoSmallHeight);
    c = k.legoWallWidth;
    var q = k.legoCylinderWidth
      , p = k.legoCylinderHeight
      , r = k.legoBottomSmallCylinderWidth
      , s = k.legoBottomLargeCylinderWidth
      , v = k.legoBottomLargeCylinderWallWidth
      , u = [];
    u.push(new JSM.Coord(0,0,0));
    u.push(new JSM.Coord(m * a,0,0));
    u.push(new JSM.Coord(m * a,m * b,0));
    u.push(new JSM.Coord(0,m * b,0));
    var k = new JSM.Body
      , t = JSM.GeneratePrismShell(u, l, n - c, c, !0);
    k.Merge(t);
    for (t = 0; 4 > t; t++)
        u[t].z = n - c;
    t = JSM.GeneratePrism(u, l, c, !0, null);
    k.Merge(t);
    if (d)
        for (t = 0; t < a; t++)
            for (u = 0; u < b; u++)
                d = new JSM.Coord(m * t + m / 2,m * u + m / 2,n + p / 2),
                l = JSM.GenerateCylinder(q / 2, p, f, !0, g),
                h(l, d),
                k.Merge(l);
    if (e)
        if (1 === a && 1 < b || 1 === b && 1 < a) {
            e = b;
            q = !0;
            a > b && (e = a,
            q = !1);
            for (t = 0; t < e - 1; t++)
                d = q ? new JSM.Coord(m / 2,m * (t + 1),(n - c) / 2) : new JSM.Coord(m * (t + 1),m / 2,(n - c) / 2),
                l = JSM.GenerateCylinder(r / 2, n - c, f, !0, g),
                h(l, d),
                k.Merge(l)
        } else if (1 < a && 1 < b)
            for (t = 0; t < a - 1; t++)
                for (u = 0; u < b - 1; u++)
                    d = new JSM.Coord(m * (t + 1),m * (u + 1),(n - c) / 2),
                    l = JSM.GenerateCylinderShell(s / 2, n - c, v, f, !0, g),
                    h(l, d),
                    k.Merge(l);
    k.SetCubicTextureProjection(new JSM.Coord(0,0,0), new JSM.Coord(1,0,0), new JSM.Coord(0,1,0), new JSM.Coord(0,0,1));
    return k
}
;
JSM.GenerateConvexHullBody = function(a) {
    var b = new JSM.Body, c = JSM.ConvexHull3D(a), d = {}, e, f, g, h;
    for (e = 0; e < c.length; e++) {
        g = c[e];
        for (f = 0; f < g.length; f++)
            h = g[f],
            h in d || (d[h] = b.VertexCount(),
            b.AddVertex(new JSM.BodyVertex(a[h])))
    }
    for (e = 0; e < c.length; e++) {
        g = c[e];
        a = [];
        for (f = 0; f < g.length; f++)
            h = g[f],
            a.push(d[h]);
        b.AddPolygon(new JSM.BodyPolygon(a))
    }
    return b
}
;
JSM.GenerateSuperShape = function(a, b, c, d, e, f, g, h, k, l, m, n, q, p) {
    function r(a) {
        var b = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z)
          , c = Math.asin(a.z / b);
        a = Math.atan2(a.y, a.x);
        return [b, c, a]
    }
    function s(a, b, c, d, e, f, g) {
        b = Math.abs(Math.cos(d * a / 4) / b);
        a = Math.abs(Math.sin(d * a / 4) / c);
        return Math.pow(Math.pow(b, f) + Math.pow(a, g), -1 / e)
    }
    function v(p, q) {
        var r = new JSM.Coord(0,0,0)
          , t = s(p, g, h, k, l, m, n)
          , u = s(q, a, b, c, d, e, f);
        r.x = u * Math.cos(q) * t * Math.cos(p);
        r.y = u * Math.sin(q) * t * Math.cos(p);
        r.z = t * Math.sin(p);
        return r
    }
    q = JSM.GenerateSphere(1, q, p);
    var u, t;
    for (p = 0; p < q.VertexCount(); p++)
        u = q.GetVertex(p),
        t = u.position,
        t = r(t),
        t = v(t[1], t[2]),
        u.SetPosition(t);
    return q
}
;
JSM.CatmullClarkSubdivisionOneIteration = function(a) {
    var b = new JSM.Body
      , c = new JSM.AdjacencyInfo(a)
      , d = []
      , e = [];
    (function(a, b, c) {
        var d, e;
        for (d = 0; d < c.verts.length; d++)
            e = a.GetVertexPosition(d),
            b.AddVertex(new JSM.BodyVertex(e.Clone()))
    }
    )(a, b, c);
    (function(a, b, c, d) {
        var e, m, n, q, p;
        for (e = 0; e < c.pgons.length; e++) {
            n = c.pgons[e];
            p = new JSM.Coord(0,0,0);
            for (m = 0; m < n.verts.length; m++)
                q = a.GetVertexPosition(n.verts[m]),
                p = JSM.CoordAdd(p, q);
            p.MultiplyScalar(1 / n.verts.length);
            d.push(b.AddVertex(new JSM.BodyVertex(p)))
        }
    }
    )(a, b, c, d);
    (function(a, b, c, d, e) {
        var m, n, q, p, r;
        for (m = 0; m < c.edges.length; m++) {
            q = c.edges[m];
            n = a.GetVertexPosition(q.vert1);
            p = a.GetVertexPosition(q.vert2);
            if (c.IsContourEdge(q))
                p = JSM.MidCoord(n, p);
            else {
                p = JSM.CoordAdd(n, p);
                for (n = 0; 2 > n; n++)
                    r = 0 === n ? q.pgon1 : q.pgon2,
                    r = b.GetVertexPosition(d[r]),
                    p = JSM.CoordAdd(p, r);
                p.MultiplyScalar(0.25)
            }
            e.push(b.AddVertex(new JSM.BodyVertex(p)))
        }
    }
    )(a, b, c, d, e);
    (function(a, b, c, d) {
        function e(a, b) {
            b.x = a.x;
            b.y = a.y;
            b.z = a.z
        }
        function m(a, b, c, d) {
            d.x = (a.x + 2 * b.x + (c - 3) * d.x) / c;
            d.y = (a.y + 2 * b.y + (c - 3) * d.y) / c;
            d.z = (a.z + 2 * b.z + (c - 3) * d.z) / c
        }
        var n = [], q, p;
        for (p = 0; p < c.edges.length; p++)
            q = c.edges[p],
            q = JSM.MidCoord(a.GetVertexPosition(q.vert1), a.GetVertexPosition(q.vert2)),
            n.push(q);
        var r, s, v, u;
        for (p = 0; p < c.verts.length; p++)
            if (r = c.verts[p],
            s = b.GetVertexPosition(p),
            c.IsContourVertex(r)) {
                v = 0;
                u = new JSM.Coord(0,0,0);
                for (a = 0; a < r.edges.length; a++)
                    q = r.edges[a],
                    c.IsContourEdge(c.edges[q]) && (q = n[r.edges[a]],
                    u.Add(q),
                    v++);
                u.Add(s);
                v++;
                u.MultiplyScalar(1 / v);
                e(u, s)
            } else {
                v = new JSM.Coord(0,0,0);
                u = new JSM.Coord(0,0,0);
                for (a = 0; a < r.pgons.length; a++)
                    q = r.pgons[a],
                    q = b.GetVertexPosition(d[q]),
                    v.Add(q);
                v.MultiplyScalar(1 / r.pgons.length);
                for (a = 0; a < r.edges.length; a++)
                    q = r.edges[a],
                    q = n[q],
                    u.Add(q);
                u.MultiplyScalar(1 / r.edges.length);
                m(v, u, r.edges.length, s)
            }
    }
    )(a, b, c, d);
    (function(a, b, c, d, e) {
        var m, n, q, p, r, s, v, u;
        for (s = 0; s < c.pgons.length; s++) {
            u = c.pgons[s];
            m = u.verts.length;
            for (v = 0; v < m; v++)
                n = u.pedges[v],
                q = u.pedges[(v + 1) % m],
                p = d[s],
                n = e[n.index],
                r = c.GetPolyEdgeStartVertex(q),
                q = e[q.index],
                p = new JSM.BodyPolygon([p, n, r, q]),
                q = a.GetPolygon(s),
                p.material = q.material,
                p.curved = q.curved,
                b.AddPolygon(p)
        }
    }
    )(a, b, c, d, e);
    return b
}
;
JSM.CatmullClarkSubdivision = function(a, b) {
    var c = a, d;
    for (d = 0; d < b; d++)
        c = JSM.CatmullClarkSubdivisionOneIteration(c);
    return c
}
;
JSM.BooleanOperation = function(a, b, c) {
    function d(a, b, c, d) {
        function e(a, c) {
            return b.AddVertex(new JSM.BodyVertex(a))
        }
        var f = new JSM.BodyPolygon([]), g;
        if (d)
            for (d = a.VertexCount() - 1; 0 <= d; d--)
                g = e(a.GetVertex(d), c),
                f.AddVertexIndex(g);
        else
            for (d = 0; d < a.VertexCount(); d++)
                g = e(a.GetVertex(d), c),
                f.AddVertexIndex(g);
        void 0 !== a.userData && f.SetMaterialIndex(a.userData.material);
        b.AddPolygon(f)
    }
    function e(a, b, c, e) {
        var f;
        for (f = 0; f < a.length; f++)
            d(a[f], b, c, e)
    }
    function f(a, b, c, d, e, f) {
        function g(a, b) {
            var c, d;
            for (c = 0; c < a.length; c++)
                d = a[c],
                void 0 === d.userData && (d.userData = b)
        }
        var h, k;
        for (h = 0; h < a.length; h++)
            k = a[h],
            JSM.ClipPolygonWithBSPTree(k.polygon, b, c, d, e, f),
            g(c, k.userData),
            g(d, k.userData),
            g(e, k.userData),
            g(f, k.userData)
    }
    var g = new JSM.BSPTree
      , h = new JSM.BSPTree;
    JSM.AddBodyToBSPTree(b, g, "a");
    JSM.AddBodyToBSPTree(c, h, "b");
    var k = []
      , l = []
      , m = []
      , n = [];
    f(g.GetNodes(), h, k, l, m, n);
    var q = []
      , p = []
      , r = [];
    f(h.GetNodes(), g, q, p, r, []);
    g = new JSM.Body;
    b = new JSM.Octree(JSM.BoxUnion(b.GetBoundingBox(), c.GetBoundingBox()));
    "Union" == a ? (e(k, g, b, !1),
    e(m, g, b, !1),
    e(n, g, b, !1),
    e(q, g, b, !1),
    e(r, g, b, !1)) : "Difference" == a ? (e(k, g, b, !1),
    e(m, g, b, !1),
    e(p, g, b, !0)) : "Intersection" == a && (e(l, g, b, !1),
    e(n, g, b, !1),
    e(p, g, b, !1));
    return g
}
;
JSM.GenerateSurface = function(a, b, c, d, e, f, g, h) {
    var k = new JSM.Body;
    (function(a, b, e, f, k) {
        var r, s, v, u;
        for (r = 0; r <= d; r++)
            for (s = 0; s <= c; s++)
                v = b + s * f,
                u = e + r * k,
                v = g(r, s, v, u, h),
                a.AddVertex(new JSM.BodyVertex(v))
    }
    )(k, a[0], b[0], (a[1] - a[0]) / c, (b[1] - b[0]) / d);
    (function(a) {
        var b, g, h, k, r, s;
        for (g = 0; g < d; g++)
            for (b = 0; b < c; b++)
                h = g * (c + 1) + b,
                k = h + 1,
                r = h + c + 1,
                s = r + 1,
                e ? (k = new JSM.BodyPolygon([h, k, s]),
                f && k.SetCurveGroup(0),
                a.AddPolygon(k),
                k = new JSM.BodyPolygon([h, s, r])) : k = new JSM.BodyPolygon([h, k, s, r]),
                f && k.SetCurveGroup(0),
                a.AddPolygon(k)
    }
    )(k);
    return k
}
;
JSM.SurfaceControlPoints = function(a, b) {
    this.n = a;
    this.m = b;
    this.points = [];
    var c, d;
    for (c = 0; c <= this.n; c++) {
        this.points.push([]);
        for (d = 0; d <= this.m; d++)
            this.points[c].push(new JSM.Coord(0,0,0))
    }
}
;
JSM.SurfaceControlPoints.prototype.GetNValue = function() {
    return this.n
}
;
JSM.SurfaceControlPoints.prototype.GetMValue = function() {
    return this.m
}
;
JSM.SurfaceControlPoints.prototype.GetControlPoint = function(a, b) {
    return this.points[a][b]
}
;
JSM.SurfaceControlPoints.prototype.InitPlanar = function(a, b) {
    var c = a / this.n, d = b / this.m, e, f, g;
    for (e = 0; e <= this.n; e++)
        for (f = 0; f <= this.m; f++)
            g = this.points[e][f],
            g.x = e * c,
            g.y = f * d
}
;
JSM.GenerateBezierSurface = function(a, b, c, d) {
    return JSM.GenerateSurface([0, 1], [0, 1], b, c, !1, d, function(a, b, c, d, k) {
        var l, m, n, q = k.GetNValue(), p = k.GetMValue();
        l = new JSM.Coord(0,0,0);
        for (a = 0; a <= q; a++) {
            m = new JSM.Coord(0,0,0);
            for (b = 0; b <= p; b++)
                n = JSM.BernsteinPolynomial(a, q, c) * JSM.BernsteinPolynomial(b, p, d),
                n = k.GetControlPoint(a, b).Clone().MultiplyScalar(n),
                m = JSM.CoordAdd(m, n);
            l = JSM.CoordAdd(l, m)
        }
        return l
    }, a)
}
;
