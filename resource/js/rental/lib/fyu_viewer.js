(function(Q, aa) {
    function sa(a, n, k) {
        this.data = a;
        this.index = n;
        this.type = k;
        this.ldng = !1;
        this.res = -1
    }
    function Ca(a, n, k) {
        function C(b, q) {
            if (!b.plugins.pano || !b.plugins.pano.labels)
                return !1;
            for (var g = b.plugins.pano.labels, v = g.length; 0 < v--; )
                if (q === g[v].Content)
                    return g[v].Desc && 1 < g[v].Desc.length ? {
                        _tl: g[v].Desc,
                        _x: .5,
                        _y: .5
                    } : {
                        _tl: g[v].Title && 1 < g[v].Title.length ? g[v].Title : g[v].Description,
                        _x: .5,
                        _y: .5
                    };
            return !1
        }
        function x(b, q) {
            if (!b.tags)
                return !1;
            for (var g = b.tags.data, v = g.length; 0 < v--; )
                if (q === g[v].Content) {
                    var d = g[v][b.rnd.visible_frame];
                    if (d)
                        return {
                            _tl: g[v].Title && 1 < g[v].Title.length ? g[v].Title : g[v].Description,
                            _x: d.X / 100,
                            _y: d.Y / 100
                        }
                }
            return !1
        }
        function z(b, q, g, v) {
            var d = this;
            d.Fire("WillExit");
            d._v ? (d._v.style.opacity = "0",
            d._v.style.display = "block") : (d._v = ca(),
            d._v.style.cssText = "cursor:default;opacity:0;transition:opacity 400ms ease-in-out;display:block;position:absolute;z-index:5;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.84);",
            d.rnd.el.parentNode.appendChild(d._v),
            d._t = ca(),
            d._t.className = "fy_dsc");
            g && 1 < g.length && (d._t.innerHTML = "<div>" + g + "</div>",
            setTimeout(function() {
                d._t.className += " fy_act"
            }, 50));
            if (v) {
                var A = document.createElement("video");
                A.setAttribute("playsinline", "playsinline");
                A.setAttribute("controls", "controls");
                A.setAttribute("cover", q);
                A.setAttribute("disablePictureInPicture", "1");
                A.setAttribute("controlsList", "nodownload");
                A.setAttribute("muted", "1");
                A.setAttribute("autoplay", "autoplay");
                A.style.cssText = "display:block;outline:0;background:#000;max-width:101%;max-height:101%;overflow:hidden;margin:0 auto;position:relative;top:50%;transform:translateY(-50%);";
                A.src = b.url ? b.url.replace("http:", "https:") : b.replace("http:", "https:");
                d._v.appendChild(A);
                d._v.appendChild(d._t)
            } else
                A = document.createElement("audio"),
                A.setAttribute("controls", "controls"),
                A.setAttribute("controlsList", "nodownload"),
                g = new Image,
                g.src = q,
                g.style.cssText = "width: 100%; height: 100%; object-fit: cover;display:block;",
                A.setAttribute("autoplay", "autoplay"),
                A.style.cssText = "outline:0;max-width:90%;max-height:90%;z-index:1;margin:0 auto;position:absolute;bottom:5%;transform:translateX(-50%);left:50%",
                A.src = b.replace("http:", "https:"),
                d._v.appendChild(A),
                d._v.appendChild(g),
                d._v.appendChild(d._t),
                g.onclick = function() {
                    A.paused ? A.play() : A.pause()
                }
                ;
            P(function() {
                d._v.style.opacity = "1"
            }, 40);
            d._v.bk = da("a");
            d._v.bk.className = "fy_lg fy_bk";
            d._v.bk.title = "back";
            d._v.bk.onclick = function(l) {
                l.preventDefault();
                l.stopPropagation();
                if (d._v) {
                    d._v.style.opacity = "0";
                    d.Fire("WillReturn");
                    var h = {
                        _x: .5,
                        _y: .5
                    }
                      , r = 0;
                    d.rnd && (d.rnd.Zoom(d, -100, h, 1),
                    d.rnd.Zoom(d, 100, h, 0));
                    P(function() {
                        var E = 12
                          , D = function() {
                            S(function(H) {
                                24 < H - r ? (r = H,
                                d.rnd.Zoom(d, -8, h, 0),
                                0 !== --E && D()) : D()
                            })
                        };
                        D();
                        d._t.className = " fy_dsc";
                        P(function() {
                            Y[d.id] || (d.evs.enabled = T[d.id].MAIN,
                            d._v.style.display = "none",
                            d._v.innerHTML = "")
                        }, 350)
                    }, 32)
                }
                fa(d._v.bk);
                d._v.bk = null
            }
            ;
            d.el.appendChild(d._v.bk)
        }
        function m(b) {
            var q = b.url;
            b = b.title;
            var g = this
              , v = 0
              , d = 0;
            g.Fire("WillExit");
            -1 === q.indexOf("http") && (q = g.path + q,
            -1 !== g.path.indexOf("group/") && (q = q.replace(g.fid + "/", "")));
            var A = function(r) {
                if (0 == v)
                    return !1;
                r.preventDefault();
                r.stopPropagation();
                var E = g._h
                  , D = E.getBoundingClientRect()
                  , H = g._j;
                if (E.clientWidth >= v)
                    return !1;
                var M = r.clientX || (r.touches ? r.touches[0].pageX : -1);
                if (-1 === M)
                    return !1;
                M = (r.clientX || r.touches[0].pageX) - D.left;
                M = -(M / E.clientWidth);
                r = -(((r.clientY || r.touches[0].pageY) - D.top) / E.clientHeight);
                M = M.toFixed(3);
                r = r.toFixed(3);
                H.style.width = v + "px";
                H.style.height = d + "px";
                H.style.cursor = "zoom-out";
                H.style.left = (v - E.clientWidth) * M + "px";
                H.style.top = (d - E.clientHeight) * r + "px"
            };
            this._h ? (g._h.style.opacity = "0",
            g._h.style.display = "block") : (this._h = ca(),
            this._j = new Image,
            this._j.id = "fy_img_" + g.id,
            this._h.className = "fy_vsm",
            this._h.style.cssText = "opacity:0;transition:opacity 400ms ease-in-out;cursor: zoom-in; position: absolute; display: block; left: 0; z-index: 5; top: 0; width: 100%; height: 100%; background:#000",
            this._h.appendChild(this._j),
            this.rnd.el.appendChild(this._h),
            this._t = ca(),
            this._t.className = "fy_dsc",
            this._h.appendChild(this._t));
            this._j.style.cssText = "max-width:none;max-height:none;position:absolute;left:0;top:0;transition:all 220ms ease-in-out;width:100%;margin:0 auto;object-fit:contain;height:100%;user-select:none;-webkit-user-drag:none;";
            P(function() {
                g._h.style.opacity = "1"
            }, 20);
            this._j.bk = da("a");
            this._j.bk.className = "fy_lg fy_bk";
            this._j.bk.title = "back";
            this._j.bk.onclick = function(r) {
                r.preventDefault();
                r.stopPropagation();
                if (g._h) {
                    g._h.onclick = null;
                    g._h.onmousemove = null;
                    Z.MOBILE && g._h.removeEventListener("touchmove", A);
                    g._h.style.opacity = "0";
                    g.Fire("WillReturn");
                    var E = {
                        _x: .5,
                        _y: .5
                    }
                      , D = 0;
                    g.rnd && (g.rnd.Zoom(g, -100, E, 1),
                    g.rnd.Zoom(g, 100, E, 0));
                    P(function() {
                        var H = 12
                          , M = function() {
                            S(function(N) {
                                24 < N - D ? (D = N,
                                g.rnd.Zoom(g, -8, E, 0),
                                0 !== --H && M()) : M()
                            })
                        };
                        M();
                        g._t.className = "fy_dsc";
                        P(function() {
                            Y[g.id] || (g.evs.enabled = T[g.id].MAIN,
                            g._h.style.display = "none",
                            g._j.src = "")
                        }, 350)
                    }, 32)
                }
                fa(g._j.bk);
                g._j.bk = null
            }
            ;
            this.el.appendChild(this._j.bk);
            g._j.src = q;
            b && 1 < b.length && (g._t.innerHTML = "<div>" + b + "</div>",
            g._t.className += " fy_act");
            this._j.onload = function(r) {
                g.rnd && (d = g._j.naturalHeight,
                v = g._j.naturalWidth,
                r = g._h.getBoundingClientRect(),
                g._h.style.cursor = r.width + 25 >= v && r.height + 25 >= d ? "default" : "zoom-in")
            }
            ;
            var l = 0
              , h = !1;
            P(function() {
                if (!Y[g.id]) {
                    if (h)
                        return !1;
                    g._h.onclick = function(r) {
                        l ? (g._t.style.opacity = "1",
                        h = !1,
                        g._h.onmousemove = null,
                        Z.MOBILE && g._h.removeEventListener("touchmove", A),
                        g._j.style.cssText = "max-width:none;max-height:none;position:absolute;left:0;top:0;transition:all 220ms ease-in-out;width:100%;margin:0 auto;object-fit:contain;height:100%;user-select:none;-webkit-user-drag:none;") : (g._t.style.opacity = "0",
                        h = !0,
                        P(function() {
                            g._j.style.transition = "none";
                            h = !1
                        }, 300),
                        Z.MOBILE ? g._h.addEventListener("touchmove", A, {
                            passive: !1
                        }) : g._h.onmousemove = A,
                        A(r));
                        l = !l
                    }
                }
            }, 50)
        }
        function y(b, q) {
            var g = ca()
              , v = q.uid;
            b.Fire("WillExit");
            b.el.parentNode.appendChild(g);
            Q.FYU.add(v, g, {
                render: "img",
                preload: 1,
                intro: 2,
                desc: q.title,
                msg: b.config.msg,
                zoom: b.config.zoom,
                fullscreen: b.config.fullscreen,
                pauseOutOfViewPort: b.config.pauseOutOfViewPort,
                prv: b.id
            }).On("init", function(d) {
                f(g.children[0].children[0], b.el.parentNode, b, d)
            }).On("error", function(d) {
                d.Destroy();
                alert("File not Found");
                b.evs.enabled = T[b.id].MAIN;
                b.Resize()
            })
        }
        function f(b, q, g, v) {
            var d = -1;
            ea && (v.orig_el = ea.orig_el,
            ea = v);
            b.style.opacity = "0";
            b.style.position = "absolute";
            b.style.left = "0px";
            b.style.top = "0px";
            b.style.right = "0px";
            b.style.bottom = "0px";
            T[g.id].VIEWPORT = 0;
            for (var A = []; q.childNodes[++d]; )
                A.push(q.childNodes[d]);
            A[0] && (S(function() {
                A[0].style.opacity = "0"
            }),
            P(function() {
                S(function() {
                    var l = q.getElementsByClassName("fy_wrppr")[0];
                    l && fa(l.parentNode);
                    fa(A[0]);
                    b.style.position = "static"
                })
            }, 128));
            q.appendChild(b);
            S(function() {
                b.style.opacity = "1"
            });
            v.Resize();
            g.Fire("update", v)
        }
        function w(b, q) {
            if (X)
                return !1;
            X = !0;
            if (!b.config.sprite || -1 < navigator.userAgent.toLowerCase().indexOf("firef"))
                return !1;
            var g = b.config.sprite.length
              , v = b.path + "web_sprite.mp4"
              , d = da("video");
            d.setAttribute("type", "video/mp4");
            d.setAttribute("playsinline", 1);
            d.setAttribute("muted", 1);
            d.muted = !0;
            d.width = 480;
            d.height = 480 / b.config.fy.ratio;
            d.setAttribute("crossorigin", "anonymous");
            d.src = v;
            d.style.display = "none";
            document.body.appendChild(d);
            var A = !1
              , l = []
              , h = 0
              , r = function(D) {
                if (b.config.fy.t === D)
                    if (t) {
                        b.rnd.ctx.globalAlpha = .1;
                        b.DisplayFrame(D, !0);
                        b.rnd.visible_frame = D;
                        for (var H = 1; 6 >= H; ++H)
                            P(function() {
                                b.rnd.ctx.globalAlpha += .15;
                                b.DisplayFrame(D, !0);
                                b.rnd.visible_frame = D
                            }, 40 * H);
                        P(function() {
                            b.rnd.ctx.globalAlpha = 1
                        }, 460);
                        B = !0;
                        P(function() {
                            b.Fire("_sprt");
                            b.Fire("_lc")
                        }, 1)
                    } else
                        P(function() {
                            b.Fire("_sprt")
                        }, 16)
            };
            d.onerror = function() {
                B || b.Fire("_sprt")
            }
            ;
            d.addEventListener("seeked", function() {
                if (T[b.id].READY)
                    fa(d);
                else {
                    if (A) {
                        var D = l[h];
                        D.getContext("2d").drawImage(d, 0, 0);
                        H = b.config.sprite[h];
                        b.imgdata[H] || (D = new sa(D,H,"c"),
                        ta(b, H, D))
                    } else {
                        D = l[h];
                        D.getContext("2d").drawImage(d, 0, 0);
                        var H = b.config.sprite[h];
                        b.imgdata[H] || (D = new sa(D,H,"c"),
                        ta(b, H, D))
                    }
                    r(H);
                    b.Fire("DidLoadFirst", T[b.id].FramesLoaded / 17);
                    h === g - 1 ? (A = !0,
                    T[b.id].READY || (B || r(b.config.fy.t),
                    H = b.GetFrameIndex(b.config.fy.t),
                    b.evs.ptr.set(H),
                    b.el.className = 0 !== b.evs.dir.sX ? b.el.className + " fy_h" : b.el.className + " fy_v",
                    T[b.id].READY = !0,
                    b.evs.enabled = T[b.id].MAIN,
                    b.config.loop && (T[b.id].LOOP = 1),
                    b.Fire("DidLoadFirst", 1),
                    b.Fire("load")),
                    fa(d)) : (++h,
                    d.currentTime = .04 * h + 1E-5)
                }
            }, !1);
            var E = !1;
            d.addEventListener("canplay", function() {
                if (!E) {
                    var D = d.videoWidth / 1
                      , H = d.videoHeight / 1;
                    D || (D = 480);
                    H || (D /= b.config.fy.ratio);
                    for (var M = 0; M < g; ++M) {
                        var N = da("canvas");
                        N.width = D;
                        N.height = H;
                        l.push(N)
                    }
                    D = l[0];
                    D.getContext("2d").drawImage(d, 0, 0);
                    D = new sa(D,b.config.sprite[0],"c");
                    H = b.config.sprite[0];
                    b.imgdata[H] || ta(b, H, D);
                    r(H);
                    E = !0;
                    h = 1;
                    d.currentTime = .04 * h + 1E-5
                }
            });
            -1 < navigator.userAgent.toLowerCase().indexOf("android") ? (v = d.play(),
            void 0 !== v && v["catch"](function(D) {
                d.load()
            })) : d.load();
            b.config.preload && q.TPreload(1);
            return !0
        }
        var c = this;
        c.id = ++Ma;
        fyu.entries.push(c);
        fyu.o[c.id] = c;
        var p = {}
          , e = {
            INIT: 1,
            ON: 0,
            LOADING: 0,
            PAUSED: 0,
            READY: 0,
            COMPLETE: 0,
            LOOP: 0,
            VIEWPORT: 2,
            RES: 0,
            ERR: 0,
            MAIN: 1,
            T: 0,
            P: 0,
            FramesLoaded: 0,
            FrameMap: [],
            FrameNum: 0,
            FrameAvail: 0,
            FrameData: []
        }
          , u = null;
        T[c.id] = e;
        c.sid = Math.random().toString(36).substring(2, 10);
        c.frame_map = [];
        c.imgdata = [];
        c.config = {};
        c.plugins = {};
        c.Fire = function(b, q, g, v, d) {
            if (!Y[c.id] && (b = p[b])) {
                for (var A = b.length; 0 < A--; )
                    b[A] && b[A](this, q, g, v, d);
                return this
            }
        }
        ;
        c.On = c.on = function(b, q) {
            p[b] ? p[b].unshift(q) : p[b] = [q];
            return this
        }
        ;
        c.Off = c.off = function(b, q) {
            var g = p[b];
            if (!g)
                return this;
            for (var v = g.length; 0 < v--; )
                if (g[v] === q) {
                    g[v] = null;
                    g.splice(v, 1);
                    break
                }
            return this
        }
        ;
        c.On("vport", function(b, q, g) {
            var v = e.VIEWPORT;
            var d = b.el.getBoundingClientRect();
            if (0 === d.width || 0 === d.height)
                d = 0;
            else {
                var A;
                if (!(A = !(40 < d.height))) {
                    var l = d.top + d.height;
                    A = d.left + d.width;
                    g = Math.min(d.height - (l - g), l);
                    q = Math.min(d.width - (A - q), A);
                    A = .22 < g / d.height && .22 < q / d.width ? 30 < g ? 2 : 1 : 39 < g && 39 < q ? 1 : 0
                }
                d = A
            }
            e.VIEWPORT = d;
            v !== e.VIEWPORT && (b.Fire(e.VIEWPORT ? "RequestLoad" : "RequestPause"),
            0 < v && e.VIEWPORT || b.Fire("visible", !!e.VIEWPORT))
        });
        var G = function(b) {
            c.fid = b.uid;
            c.path = b.path.replace("i.fyu.se", "cdn.fyusion.com");
            e.FrameNum = b.fy.f;
            c.config = Na(b, k);
            c.res = "";
            c.config.resolution ? (c.res = c.config.resolution + "/",
            Z.MOBILE && c.config.low && "" == c.config.low[0] && (c.res = "")) : c.config.low && (c.res = c.config.low[0] + "/",
            "" == c.config.low[0] ? c.res = "" : (c.res = c.config.low[0] + "/",
            c.config.res || (c.config.res = []),
            c.config.res.unshift({
                val: "",
                scale: .415,
                all: 1
            })));
            Object.freeze && Object.freeze(c.config);
            c.el = Oa(n, b.fy.m, c.fid, c.config.fy.ratio);
            if (c.el) {
                if (aa.addEventListener)
                    c.rnd = new Pa(c),
                    Qa(c),
                    c.evs = new Ra(c),
                    "img" !== c.config.render && c.config.h264 && Z.WASM ? ua("gl", I) : ua("p", I);
                else {
                    b = "https://fyu.se/assets/2.0/viewer/FyuseViewer.swf?id=" + c.fid;
                    var q = aa.createElement("div");
                    q.style.cssText = "position:absolute;width:100%;height:100%;left:0;top:0";
                    q.innerHTML = '<object style="width:100%;height:100%;position:relative" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" data="' + b + '&autoplay=1" class="viewer"><param name="allowScriptAccess" value="always"> <param name="movie" value="' + b + '&autoplay=0"> <param name="wmode" value="opaque"><param name="hasPriority" value="true"></object>';
                    c.el.parentNode.style.cssText = "position:relative;width:100%;height:100%;width:100%";
                    c.el.appendChild(q)
                }
                c.config.pa && c.config.pa[0] && c.On("DidLoadPano", function(v) {
                    v.plugins.pano.init_heading = c.config.pa[0];
                    v.plugins.pano.init_pitch = c.config.pa[1];
                    c.config.pa[2] && (v.plugins.pano.init_fov = c.config.pa[2])
                });
                if (c.config.autoplay && c.config.ap) {
                    var g = aa.createElement("div");
                    g.innerHTML = '<video class="cmfy_prvw" muted loop playsinline autoplay src="' + (c.path + 'autoplay.mp4"></video>');
                    c.rnd.el.appendChild(g);
                    S(function() {
                        var v = c.config.autospeed / 1 * .63;
                        .2 > v && (v = .2);
                        g.getElementsByTagName("video")[0].playbackRate = v
                    })
                }
            } else
                p.vport = null,
                P(function() {
                    c.Fire("error", "DOMNode")
                }, 0)
        }, t = !0, B = !1, J = 0, I = function(b) {
            if (!Y[c.id]) {
                u = b(c, ha, Da);
                u.ListenFor("ErrorDownload", function(d, A, l) {
                    e.LOADING = !1;
                    e.PAUSED = !0;
                    c.Fire("error", "Download", A, l)
                });
                u.ListenFor("DidStartDownload", function(d, A, l) {
                    e.LOADING = !0;
                    e.PAUSED = !1
                });
                u.ListenFor("DidStopDownload", function(d) {
                    e.LOADING = !1;
                    e.PAUSED = !0
                });
                c.Load = function() {
                    e.ON = 1;
                    c.Fire("RequestLoad")
                }
                ;
                c.On("RequestLoad", function(d) {
                    if (!e.LOADING && !e.COMPLETE && e.ON)
                        if (c.Fire("_rld"),
                        0 === J && (J = e.T = Date.now(),
                        c.Resize()),
                        d.config.fasttags && d.config.tags && !d.tags && P(function() {
                            ya(d, u)
                        }, 200),
                        c.On("LoadPanoTags", function(l, h, r) {
                            h = [];
                            for (var E = 0, D = r.length; E < D; ++E)
                                h.push(r[E].el);
                            P(function() {
                                Ea(l, r)
                            }, 1E3)
                        }),
                        w(c, u)) {
                            var A = !1;
                            d.On("_sprt", function() {
                                !A && (A = !0,
                                c.config.pauseOutOfViewPort ? e.VIEWPORT : 1) && (u.Start(),
                                d.config.fasttags || !d.config.tags || d.tags || P(function() {
                                    d.tags || ya(d, u)
                                }, 840),
                                d.config.pano && ua("pn", function(l) {
                                    Y[d.id] || (l.add(d, d.path + (Z.MOBILE ? "pano_mobile.jpg" : "pano.jpg")),
                                    2 === d.config.pano && d.plugins.pano.makeTags(d.path + "pano_tags.json"),
                                    c.On("WillShowPano", function() {
                                        c.evs.enabled = !1;
                                        e.MAIN = !1
                                    }),
                                    c.On("DidHidePano", function() {
                                        c.evs.enabled = !0;
                                        e.MAIN = !0
                                    }))
                                }))
                            })
                        } else
                            u.Start(),
                            d.config.fasttags || !d.config.tags || d.tags || P(function() {
                                d.tags || ya(d, u)
                            }, 800),
                            d.config.pano && ua("pn", function(l) {
                                Y[d.id] || (l.add(d, d.path + (Z.MOBILE ? "pano_mobile.jpg" : "pano.jpg")),
                                2 === d.config.pano && d.plugins.pano.makeTags(d.path + "pano_tags.json"),
                                c.On("WillShowPano", function() {
                                    c.evs.enabled = !1;
                                    e.MAIN = !1
                                }),
                                c.On("DidHidePano", function() {
                                    c.evs.enabled = !0;
                                    e.MAIN = !0
                                }))
                            })
                });
                c.On("RequestPause", function(d) {
                    e.LOADING && u && (e.READY || (d = Date.now(),
                    e.P += d - e.T,
                    e.T = d,
                    J = 0),
                    u.Stop())
                });
                var q = function() {
                    if (!e.READY) {
                        var d = c.GetFrameIndex(c.rnd.visible_frame);
                        c.evs.ptr.set(d);
                        c.el.className = 0 !== c.evs.dir.sX ? c.el.className + " fy_h" : c.el.className + " fy_v";
                        e.READY = !0;
                        c.evs.enabled = e.MAIN;
                        c.Fire("DidLoadFirst", 1);
                        c.Fire("load")
                    }
                };
                var g = c.config.h264 && "gl" === u.id ? function() {
                    for (var d = 0, A = c.config.map[d], l = A.length, h = 0, r = 0, E = 0; E < c.config.map.length; ++E)
                        r += c.config.map[E].length;
                    e.FrameAvail = r;
                    return function(D, H) {
                        l === D ? (Fa(c),
                        d === c.config.mapL && (e.LOOP = 1),
                        0 === d && q(),
                        A = c.config.map[++d],
                        h = l,
                        A ? l += A.length : A = c.config.map[d - 1]) : e.READY || c.Fire("DidLoadFirst", e.FramesLoaded / l);
                        return H = A[D - h]
                    }
                }() : function(d, A) {
                    e.FrameAvail || (e.FrameAvail = u.FrameAvail - 1);
                    if (!e.LOOP && 1 !== u.jump) {
                        var l = (e.FrameNum / u.jump >> 0) + 1;
                        e.FramesLoaded === l && 1 !== u.jump && (e.LOOP = 1)
                    }
                    e.READY || (16 === e.FramesLoaded && q(),
                    c.Fire("DidLoadFirst", e.FramesLoaded / l));
                    return A
                }
                ;
                u.ListenFor("DidExtractFrame", function(d, A, l, h, r) {
                    if (e.ON) {
                        if (h = g(h, h),
                        !(h > e.FrameNum - 1)) {
                            d = new sa(A,h,l);
                            d.res = r;
                            ta(c, h, d);
                            c.rnd.visible_frame === h && u.RenderRepeat(c.imgdata[h], c.rnd.ctx, c.config.width, c.config.height);
                            if (t && c.imgdata[c.config.fy.t]) {
                                t = !1;
                                var E = c.config.fy.t;
                                if (B)
                                    S(function() {
                                        Y[c.id] || c.rnd.visible_frame === E && c.DisplayFrame(E, !0)
                                    });
                                else {
                                    c.rnd.ctx.globalAlpha = .1;
                                    u.RenderRepeat(c.imgdata[E], c.rnd.ctx, c.config.width, c.config.height);
                                    c.rnd.visible_frame = E;
                                    var D = 0
                                      , H = function() {
                                        S(function() {
                                            Y[c.id] || (c.rnd.ctx.globalAlpha += .1,
                                            u.RenderRepeat(c.imgdata[E], c.rnd.ctx, c.config.width, c.config.height),
                                            c.rnd.visible_frame = E,
                                            8 >= ++D ? S(function() {
                                                H()
                                            }) : c.rnd.ctx.globalAlpha = 1)
                                        })
                                    };
                                    H();
                                    c.Fire("_lc")
                                }
                            }
                            e.FrameAvail - 1 == e.FramesLoaded && (Fa(c),
                            e.COMPLETE = 1,
                            e.LOADING = !1,
                            e.LOOP = 1,
                            e.READY || (e.READY = !0,
                            c.evs.enabled = e.MAIN,
                            c.Fire("DidLoadFirst", 1),
                            c.Fire("load")),
                            c.Fire("complete", e.FramesLoaded));
                            c.Fire("progress", e.FramesLoaded / e.FrameAvail, e.FramesLoaded)
                        }
                    } else
                        d = new sa(A,h,l),
                        d.res = r,
                        ta(c, h, d)
                });
                P(function() {
                    c.Fire("init")
                }, 0);
                if (c.config.preload) {
                    e.ON = 1;
                    var v = c.config.pauseOutOfViewPort ? e.VIEWPORT : 2;
                    P(function() {
                        v && c.Fire("RequestLoad")
                    }, 0)
                } else
                    Sa(c, u)
            }
        }, L, F = Z.MOBILE ? 250 : 112;
        this.DisplayFrame = function(b) {
            if ("c" === this.imgdata[b].type)
                return this.rnd.ctx.drawImage(this.imgdata[b].data, 0, 0, this.imgdata[b].data.width, this.imgdata[b].data.height, 0, 0, c.config.width, c.config.height),
                this;
            u.Render(this.imgdata[b], this.rnd.ctx, this.config.width, this.config.height);
            e.RES && e.RES > this.imgdata[b].res + 1 && (L && clearTimeout(L),
            L = P(function() {
                var q = c.config.res[e.RES - 1];
                q && c.ForceRenderHigh(c.rnd.visible_frame, q.val, e.RES - 1)
            }, F));
            return this
        }
        ;
        this.Resize = this.resize = function() {
            this.rnd && this.rnd.Resize(this);
            return this
        }
        ;
        this.Zoom = function(b) {
            this.rnd && this.rnd.Zoom(this, b);
            return this
        }
        ;
        this.MotionRequest = function() {
            if (this.evs)
                setTimeout(function() {
                    va.Request()
                }, 30);
            else
                this.on("load", function() {
                    setTimeout(function() {
                        va.Request()
                    }, 30)
                })
        }
        ;
        this.m = {
            _m: 0,
            _md: 0,
            _tev: 0,
            _ttl: 0
        };
        var K = new Image;
        K.importance = "low";
        this.FlintRendering = function() {
            if (!this.rnd || this.gt)
                return this;
            var b = this.evs.ptr
              , q = this.GetFrameIndex(this.rnd.visible_frame);
            b = b.frames.srcId;
            this.config.loop || (b = b < q ? Math.floor(.37 * (b - q)) : Math.ceil(.37 * (b - q)),
            b = q + b);
            if (b < q) {
                if (-1 === this.m._m) {
                    if (this.m._md += b - q,
                    -10 > this.m._md) {
                        q = Ga();
                        var g = q - this.evs._ts + this.evs._ti >> 0;
                        K.src = "https://api.fyusion.com/1.2/logs/web/" + this.fid + "?s=" + this.sid + "&l=" + g;
                        this.m._ttl = g;
                        this.m._tev = q;
                        this.m._md = 299999
                    }
                } else
                    this.m._md = 0;
                this.m._m = -1
            } else
                b > q && (1 === this.m._m ? (this.m._md += b - q,
                10 < this.m._md && (q = Ga(),
                g = q - this.evs._ts + this.evs._ti >> 0,
                K.src = "https://api.fyusion.com/1.2/logs/web/" + this.fid + "?s=" + this.sid + "&l=" + g,
                this.m._ttl = g,
                this.m._tev = q,
                this.m._md = -299999)) : this.m._md = 0,
                this.m._m = 1);
            this.rnd.DisplayFrame(b);
            return this
        }
        ;
        this.ForceRenderHigh = function(b, q, g, v) {
            var d = this.imgdata[b];
            if (!(!d || d.res >= g || d.ldng)) {
                var A = this;
                q = this.path + q + (this.config.mask ? "0s_" + this.config.mask + "/" : "") + "frames_" + b + ".jpg?v=1";
                d.ldng = 1;
                u.fetch(q, b, "blob", function(l) {
                    d.ldng = !1;
                    d.data = l;
                    d.type = u.t;
                    d.res = g;
                    v || A.rnd.visible_frame != b || A.DisplayFrame(b, !0)
                }, function() {
                    d.ldng = !1
                })
            }
        }
        ;
        this.GoTo = function(b, q, g) {
            this.gt && (clearTimeout(this.gt),
            this.gt = null);
            if (!this.rnd)
                return this;
            if (b == this.rnd.visible_frame)
                return g && g(1),
                this;
            var v = this
              , d = b;
            b = this.GetFrameIndex(d);
            if (q && 30 > q)
                return this.rnd.DisplayFrame(b, !0) && (this.evs.ptr.frames.curFrameId = b,
                this.evs.ptr.frames.srcId = b),
                g && g(1),
                this;
            var A = v.evs.ptr.frames.curFrameId
              , l = function(W, ba) {
                var ia = W - A;
                if (ba.config.loop && !ba.autoplay) {
                    var ja = A > W ? ba.frame_map.length - A + W : -(ba.frame_map.length - W + A);
                    U(ja) < U(ia) && (ia = ja)
                }
                return ia
            }
              , h = l(b, v);
            if (3 > U(h))
                return this.GoTo(d, 1, g);
            var r = 16 * U(h);
            380 > r ? r = 380 : 1220 < r && (r = 1220);
            q && (r = U(q / 1));
            var E = -1
              , D = r / 34 >> 0
              , H = 0
              , M = 12
              , N = function() {
                var W = v.GetFrameIndex(d);
                b != W && (b = W,
                h = l(W, v),
                H = 1 / (1 + Math.pow(Math.E, -(E / D * 7 - 3.5))) * h);
                var ba = 1 / (1 + Math.pow(Math.E, -((E + 1) / D * 7 - 3.5))) * h
                  , ia = ba - H
                  , ja = 34;
                E >= D && (ja = 16);
                H = ba;
                v.gt = P(function() {
                    if (v.evs.ptr.frames.srcId === W)
                        g && g(1);
                    else if (++E < D) {
                        var R = v.evs.ptr.frames.curFrameId + ia;
                        v.config.loop && (0 > R ? R = v.frame_map.length + R : R > v.frame_map.length && (R -= v.frame_map.length));
                        v.rnd.DisplayFrame(Math.round(R)) && (v.evs.ptr.frames.srcId = Math.round(R));
                        v.evs.ptr.frames.curFrameId = R;
                        N()
                    } else
                        0 < --M ? (R = v.evs.ptr.frames.curFrameId + (0 > ia ? -1 : 1),
                        v.config.loop && (0 > R ? R = v.frame_map.length + R : R > v.frame_map.length && (R -= v.frame_map.length)),
                        v.rnd.DisplayFrame(Math.round(R)) && (v.evs.ptr.frames.srcId = Math.round(R)),
                        v.evs.ptr.frames.curFrameId = R,
                        N()) : g && g(1)
                }, ja)
            };
            N();
            return this
        }
        ;
        this.GetCurrentFrameBlob = function(b) {
            return this.GetFrameBlobForIndex(this.rnd.visible_frame, b)
        }
        ;
        this.GetFrameBlobForIndex = function(b, q) {
            if (this.imgdata && this.imgdata[b] && !this.imgdata[b].ldng)
                return "i" === this.imgdata[b].type || "m" === this.imgdata[b].type ? q(this.imgdata[b].data) : "yuv" === this.imgdata[b].type && (u.Render(this.imgdata[b], null, this.config.width, this.config.height),
                u.dummy_canvas.toBlob(q, "image/jpeg", .8)),
                this;
            q(!1);
            return this
        }
        ;
        this.Fullscreen = function() {
            za(this);
            return this
        }
        ;
        this.Tags = function() {
            this.tags && (this.tags.vis ? this.tags.Hide() : this.tags.Show());
            return this
        }
        ;
        this.Destroy = function(b) {
            if (!Y[this.id]) {
                this.Fire("RequestPause");
                this.Fire("WillDestroy");
                Y[this.id] = !0;
                ea === this && wa();
                fyu.o[this.id] = null;
                delete fyu.o[this.id];
                for (var q = fyu.entries.length; 0 !== q--; )
                    if (fyu.entries[q] === this) {
                        fyu.entries[q] = null;
                        fyu.entries.splice(q, 1);
                        break
                    }
                this.plugins.pano && this.plugins.pano.destroy();
                clearTimeout(this.gt);
                this.gt = null;
                this.rnd && (this.rnd = this.rnd.viewer = null);
                this.imgdata = [];
                this.plugins = null;
                T[this.id] = null;
                delete T[this.id];
                !b && this.el && this.el.parentNode && this.el.parentNode.parentNode && fa(this.el.parentNode);
                this.el = null
            }
        }
        ;
        this.ShowCaption = function() {}
        ;
        this.Audio = function(b, q, g) {
            for (var v = null, d = this.tags.data, A = d.length; 0 < A--; )
                if (d[A].Content === b) {
                    v = d[A];
                    break
                }
            v || (v = {
                ContentImage: q
            });
            this.Video({
                url: b,
                img: v.ContentImage
            }, g);
            return this
        }
        ;
        this.Video = function(b, q) {
            var g = this;
            if (!g.evs.enabled && !q)
                return this;
            var v = !0
              , d = ""
              , A = null;
            b.img ? (d = b.img,
            b = b.url,
            v = !1) : d = b.url ? b.url.replace(".mp4", "_thumb.jpg") : b.replace(".mp4", "_thumb.jpg");
            var l = 0
              , h = x(g, b);
            h || (h = C(g, b)) || (h = {
                _x: .5,
                _y: .5,
                _tl: null
            });
            g.evs.enabled = !1;
            h._tl && (A = h._tl);
            if (q)
                P(function() {
                    S(function(D) {
                        Y[g.id] || z.call(g, b, d, A, v)
                    })
                }, 20);
            else {
                var r = 12
                  , E = function() {
                    S(function(D) {
                        24 < D - l ? (l = D,
                        g.rnd.Zoom(g, 6, h, 1),
                        0 !== --r ? E() : g.rnd.Zoom(g, -100, h, 0)) : E()
                    })
                };
                E();
                P(function() {
                    S(function(D) {
                        Y[g.id] || z.call(g, b, d, A, v)
                    })
                }, 100)
            }
            return this
        }
        ;
        this.ShowImg = function(b, q) {
            var g = this;
            if (!g.evs.enabled && !q)
                return this;
            var v = 0
              , d = x(g, b);
            d || (d = C(g, b)) || (d = {
                _x: .5,
                _y: .5,
                _tl: null
            });
            g.evs.enabled = !1;
            if (q)
                P(function() {
                    Y[g.id] || m.call(g, {
                        url: b,
                        title: d._tl
                    })
                }, 20);
            else {
                var A = 12
                  , l = function() {
                    S(function(h) {
                        24 < h - v ? (v = h,
                        g.rnd.Zoom(g, 6, d, 1),
                        0 !== --A ? l() : g.rnd.Zoom(g, -100, d, 0)) : l()
                    })
                };
                l();
                P(function() {
                    Y[g.id] || m.call(g, {
                        url: b,
                        title: d._tl
                    })
                }, 110)
            }
            return this
        }
        ;
        this.Update = function(b, q) {
            var g = this;
            if (g.fid === b || g.config.prv !== b && !g.evs.enabled && !q)
                return this;
            var v = x(g, b);
            v || (v = {
                _x: .5,
                _y: .5,
                _tl: null
            });
            if (g.config.prv === b) {
                var d = fyu.o[b];
                if (!d)
                    return this;
                d.evs.enabled = T[d.id].MAIN;
                f(d.el, g.el.parentNode, g, d);
                S(function() {
                    d.Fire("WillReturn");
                    d.rnd.Zoom(d, 100, v, 0);
                    var h = 13
                      , r = function() {
                        S(function() {
                            d.rnd.Zoom(d, -8, v, 0);
                            0 !== --h && r()
                        })
                    };
                    d && r();
                    g.Destroy(1)
                });
                return this
            }
            g.evs.enabled = !1;
            if (q)
                P(function() {
                    Y[g.id] || y(g, {
                        uid: b,
                        title: v._tl
                    })
                }, 20);
            else {
                var A = 12
                  , l = function() {
                    S(function() {
                        g.rnd.Zoom(g, 6, v, 1);
                        0 !== --A && l()
                    })
                };
                l();
                P(function() {
                    Y[g.id] || y(g, {
                        uid: b,
                        title: v._tl
                    })
                }, 106)
            }
            return this
        }
        ;
        var X = !1;
        "string" === typeof a ? fyu.h[a] ? setTimeout(function() {
            G.call(c, fyu.h[a])
        }, 0) : (c.fid = a,
        Aa({
            url: "https://api.fyusion.com/1.2/embed/" + a,
            done: function(b) {
                if (!Y[c.id]) {
                    var q = null;
                    try {
                        q = JSON.parse(b.responseText)
                    } catch (g) {}
                    q && q.success ? (fyu.h[a] = q,
                    G.call(c, q)) : (e.ERR = 1,
                    P(function() {
                        c.Fire("error", b.status, b.responseText)
                    }, 0))
                }
            },
            fail: function(b) {
                e.ERR = 1;
                P(function() {
                    c.Fire("error", b.status, b.responseText)
                }, 0)
            },
            retry: 1
        })) : setTimeout(function() {
            G.call(c, a)
        }, 0)
    }
    function Ea(a, n) {
        var k = null
          , C = null
          , x = null
          , z = a;
        k = ca();
        k.className = "fy_tg_prvw fy_fd";
        k.innerHTML = '<span></span><div style="position:relative;overflow:hidden"><img /></div>';
        z = a;
        z.el.appendChild(k);
        z.On("WillReturn", function() {
            k && (k.className = "fy_tg_prvw fy_fd");
            var c = z.el.getElementsByClassName("fy_ctns")[0];
            c && (c.className = "fy_ctns")
        });
        var m = k.getElementsByTagName("img")[0]
          , y = k.getElementsByTagName("span")[0]
          , f = !1;
        C = function(c) {
            if (z.evs.enabled || z.plugins && z.plugins.pano && z.plugins.pano.visible)
                for (var p = n.length; 0 < p--; )
                    if (n[p].el === this) {
                        var e = n[p].Content;
                        e && (e = e.replace("https://fyu.se/v/", "").replace("https://fyuse.com/v/", ""));
                        k.parentNode != z.el && z.el.appendChild(k);
                        n[p].Title && 1 < n[p].Title.length ? (y.style.cssText = "padding-bottom:6px",
                        y.innerHTML = n[p].Title) : n[p].Description && 2 < n[p].Description.length ? (y.style.cssText = "padding-bottom:6px",
                        y.innerHTML = n[p].Description) : n[p].Desc && 2 < n[p].Desc.length ? (y.style.cssText = "padding-bottom:6px",
                        y.innerHTML = n[p].Desc) : (y.style.cssText = "",
                        y.innerHTML = "");
                        e ? n[p].Thumb ? (m.style.transform = "none",
                        m.className = "fy_act",
                        m.src = n[p].Thumb) : (m.className = "fy_act",
                        0 <= e.indexOf("http") ? 0 <= e.indexOf("fyu.se") ? m.src = e.replace(".jpg", "_thumb.jpg") : 0 <= e.indexOf(".jpg") ? m.src = e : m.className = "" : 3 === n[p].Type ? m.src = "https://i.fyu.se/thumb/" + e + "?type=thumb" : (p = z.path + e,
                        -1 !== z.path.indexOf("group/") && (p = p.replace(z.fid + "/", "")),
                        m.src = p)) : m.className = "";
                        c.stopPropagation();
                        c.preventDefault();
                        P(function() {
                            var u = .25 * z.rnd.el.clientWidth >> 0;
                            64 > u && (u = 64);
                            m.style.width = u + "px";
                            u = z.el.getElementsByClassName("fy_ctns")[0];
                            k.className = k.className.replace(" fy_fd", "");
                            u && (u.className += " fy_fd")
                        }, 32);
                        f = !0;
                        break
                    }
        }
        ;
        x = function(c) {
            f && (c.stopPropagation(),
            c.preventDefault(),
            P(function() {
                k.className += " fy_fd";
                var p = z.el.getElementsByClassName("fy_ctns")[0];
                p && (p.className = "fy_ctns")
            }, 32),
            f = !1)
        }
        ;
        for (var w = n.length; 0 < w--; )
            n[w].el.addEventListener("mouseover", C, !1),
            n[w].el.addEventListener("mouseout", x, !1)
    }
    function ya(a, n) {
        a.tags = new function() {
            if (!Y[a.id]) {
                var k = this;
                this.data = [];
                this.vis = !0;
                this.el = null;
                this.el = ca();
                this.el.className = "fy_tgs";
                var C = 960
                  , x = 960 / a.config.fy.ratio;
                this.el.style.width = C + "px";
                this.el.style.height = x + "px";
                var z = a.rnd.trans;
                z = "translate(" + -z.scrollLeft + "px," + -z.scrollTop + "px) scale(" + z.scale * a.rnd.mod + ")";
                k.el.style.top = a.rnd.coords.top;
                k.el.style.left = a.rnd.coords.left;
                k.el.style.transform = z;
                z = null;
                a.el.appendChild(this.el);
                C /= 100;
                x /= 100;
                var m = function(y, f) {
                    if (k.vis)
                        for (var w = 0; w < k.data.length; ++w) {
                            var c = k.data[w];
                            if (c.el) {
                                var p = c[f.index];
                                p ? (p = 0 === a.config.fy.m ? 0 === a.config.fy.r ? "translate(" + p.X * C + "px," + (100 - p.Y) * x + "px)" : "translate(" + (100 - p.Y) * C + "px," + p.X * x + "px)" : "translate(" + p.X * C + "px," + p.Y * x + "px)",
                                c.el.style.msTransform = p,
                                c.el.style.transform = p,
                                c.vis || (c.el.style.display = "block",
                                c.vis = !0)) : c.vis && (c.el.style.display = "none",
                                c.vis = !1)
                            }
                        }
                };
                this.Init = function(y) {
                    this.data = y;
                    for (y = 0; y < this.data.length; ++y) {
                        var f = this.data[y];
                        if (!f.el) {
                            var w = da("a");
                            var c = a.config.tagClass;
                            if (f.Content) {
                                var p = f.Content;
                                if (5 === f.Type)
                                    c += " fy_tg_snd",
                                    w.setAttribute("onclick", "fyu.o[" + a.id + '].Audio("' + p + '")'),
                                    f.ContentImage && (f.Thumb = f.ContentImage.replace(".jpg", "_thumb.jpg"));
                                else if (4 === f.Type)
                                    c += " fy_tg_vid",
                                    w.setAttribute("onclick", "fyu.o[" + a.id + '].Video("' + p + '")'),
                                    f.Thumb = p.replace(".mp4", "_thumb.jpg");
                                else if (3 === f.Type)
                                    c += " fy_tg_fy",
                                    p = p.replace("https://fyu.se/v/", "").replace("https://fyuse.com/v/", ""),
                                    f.Content = p,
                                    w.setAttribute("onclick", "fyu.o[" + a.id + '].Update("' + p + '")');
                                else if (0 < p.indexOf(".jpg") || 0 < p.indexOf(".png"))
                                    c += " fy_tg_img",
                                    f.Content = p,
                                    w.setAttribute("onclick", "fyu.o[" + a.id + '].ShowImg("' + p + '")');
                                else if (f.Title || f.Description)
                                    c += " fy_tg_lnk",
                                    0 === f.Content.indexOf("http") ? (w.href = f.Content,
                                    w.setAttribute("target", "_blank")) : w.setAttribute("onclick", "fyu.o[" + a.id + '].ShowCaption("' + f.Title.replace(/<(?:.|\n)*?>/gm, "") + '")')
                            } else {
                                f.Content = f.Desc;
                                f.Extra && (f.Title = f.Extra);
                                if (!f.Title)
                                    continue;
                                w.setAttribute("target", "_blank");
                                w.setAttribute("href", f.Content)
                            }
                            f.Category && f.Category[0] && (c += " fy_" + f.Category[0]);
                            f.el = da("span");
                            f.el.className = c;
                            f.el.appendChild(w);
                            this.el.appendChild(f.el);
                            c = 0;
                            for (w = f.Trackers.length; c < w; ++c)
                                p = f.Trackers[c],
                                f[p.F] = {
                                    X: 100 * p.X,
                                    Y: 100 * p.Y
                                }
                        }
                    }
                    this.vis && a.rnd.Translate(0, 0, a);
                    n.ListenFor("DidRender", m);
                    a.Fire("load-tags");
                    a.Fire("DidToggleTags", !0);
                    Z.MOBILE || a.config.notagpreview || Ea(a, this.data)
                }
                ;
                this.Show = function() {
                    this.vis || (this.vis = !0,
                    a.rnd.Translate(0, 0, a),
                    m(null, {
                        index: a.rnd.visible_frame
                    }),
                    a.Fire("DidToggleTags", !0))
                }
                ;
                this.Hide = function() {
                    if (this.vis) {
                        this.vis = !1;
                        for (var y = 0; y < k.data.length; ++y) {
                            var f = k.data[y];
                            f.el.style.display = "none";
                            f.vis = !1
                        }
                        a.Fire("DidToggleTags", !1)
                    }
                }
            }
        }
        ;
        Aa({
            url: a.path + "tags.json",
            done: function(k) {
                if (!Y[a.id]) {
                    var C = null;
                    try {
                        C = JSON.parse(k.responseText)
                    } catch (x) {}
                    C && a.tags.Init(C)
                }
            }
        })
    }
    function Qa(a) {
        a.On("load", function(y) {
            var f = ca();
            f.className = "fy_ctns";
            if (a.config.tags) {
                var w = da("a");
                w.className = "fy_btn fy_btg" + (a.tags && a.tags.vis ? " fy_pct" : "");
                f.appendChild(w);
                w.onclick = function() {
                    a.tags && (a.tags.vis ? a.tags.Hide() : a.tags.Show(),
                    a.plugins && a.plugins.pano && a.plugins.pano.label_layer && (a.plugins.pano.vistags ? a.plugins.pano.tagsHide() : a.plugins.pano.tagsShow()))
                }
                ;
                a.On("DidToggleTags", function(e, u) {
                    w.className = u ? "fy_btn fy_btg fy_pct" : "fy_btn fy_btg"
                })
            }
            if (a.config.fullscreen) {
                var c = da("a");
                c.className = "fy_btn fy_bx2";
                f.appendChild(c);
                c.onclick = function() {
                    za(a)
                }
            }
            a.el.appendChild(f);
            f = Math.pow(2, 13) - 1;
            var p = 0;
            p = window.innerWidth;
            c = window.innerHeight;
            p > f && (p = f);
            c > f && (c = f);
            p = (p & f) * Math.pow(2, 39);
            p += (c & f) * Math.pow(2, 26);
            p += (y.rnd.trans.scale * y.rnd.width >> 0 & f) << 13;
            p += y.rnd.trans.scale * y.rnd.height >> 0 & f;
            (new Image).src = "https://api.fyusion.com/1.1/data/webload/360/" + y.fid + "?v=1&r=" + p + "&b=" + escape(Ta(T[y.id].P + Date.now() - T[y.id].T)) + "&s=" + a.sid
        });
        a.On("RequestFS", function(y) {
            za(y)
        });
        a.config.autoplay && a.config.ap && a.On("load", function() {
            var y = null
              , f = null;
            a.config.autoplay && a.config.ap && (y = a.el.getElementsByTagName("video"),
            0 < y.length && (y = y[0],
            f = !0));
            var w = function() {
                if (f) {
                    S(function(p) {
                        setTimeout(function() {
                            y.parentNode && y.parentNode.removeChild(y);
                            y = null;
                            a.Off("display", w)
                        }, 0)
                    });
                    f = !1;
                    var c = 25 * y.currentTime >> 0;
                    2 >= a.config.fy.t || (c = a.config.fy.t + c,
                    c >= a.config.fy.f && (c -= a.config.fy.f));
                    a.GoTo(c, 1)
                }
            };
            w = function() {
                f && (S(function(c) {
                    setTimeout(function() {
                        y.parentNode && y.parentNode.removeChild(y);
                        y = null
                    }, 0)
                }),
                f = !1,
                a.GoTo(25 * y.currentTime >> 0, 1))
            }
            ;
            a.On("display", w)
        });
        var n = !1;
        a.On("showIntro", function() {
            if (!(Y[a.id] || n || 10 > a.config.fy.f)) {
                var y = 1 < a.config.intro ? " fy_" + a.config.intro : ""
                  , f = ca();
                f.className = "fy_t1 fy_fd" + y;
                n = !0;
                //f.innerHTML = a.config.msg ? '<div><svg width="140" height="40"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 0,20 L 12, 32 M 0,20 L 12, 8 M 0,20 L 40, 20 M 140,20 L 128, 32 M 140,20 L 128, 8 M 140,20 L 100, 20"/></svg><svg width="140" height="40" style="position:absolute;left:-2px;top:0;animation-name:fy_al;animation-duration:2s;animation-timing-function:ease;animation-iteration-count:11"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 60, 10 L 70, 35 L 75, 29 L 86, 40 L 90, 35 L 79, 25 L 86, 19 L 60, 10 M 70,12 A 0.5 0.5 0 1 0 51,9 M 62,22 A 0.5 0.5 0 0 1 60,1"/></svg></div><span>' + a.config.msg + "</span>" : Z.MOBILE ? '<div><svg width="140" height="40"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 0,20 L 12, 32 M 0,20 L 12, 8 M 0,20 L 40, 20 M 140,20 L 128, 32 M 140,20 L 128, 8 M 140,20 L 100, 20"/></svg><svg width="140" height="40" style="position:absolute;left:-2px;top:0;animation-name:fy_al;animation-duration:2s;animation-timing-function:ease;animation-iteration-count:11"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 60, 10 L 70, 35 L 75, 29 L 86, 40 L 90, 35 L 79, 25 L 86, 19 L 60, 10 M 70,12 A 0.5 0.5 0 1 0 51,9 M 62,22 A 0.5 0.5 0 0 1 60,1"/></svg></div><span>Swipe to view 360</span>' : '<div><svg width="140" height="40"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 0,20 L 12, 32 M 0,20 L 12, 8 M 0,20 L 40, 20 M 140,20 L 128, 32 M 140,20 L 128, 8 M 140,20 L 100, 20"/></svg><svg width="140" height="40" style="position:absolute;left:-2px;top:0;animation-name:fy_al;animation-duration:2s;animation-timing-function:ease;animation-iteration-count:11"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 60, 10 L 70, 35 L 75, 29 L 86, 40 L 90, 35 L 79, 25 L 86, 19 L 60, 10 M 70,12 A 0.5 0.5 0 1 0 51,9 M 62,22 A 0.5 0.5 0 0 1 60,1"/></svg></div><span>Click and drag to view 360</span>';
                f.innerHTML = a.config.msg ? '<div><svg width="140" height="40"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 0,20 L 12, 32 M 0,20 L 12, 8 M 0,20 L 40, 20 M 140,20 L 128, 32 M 140,20 L 128, 8 M 140,20 L 100, 20"/></svg><svg width="140" height="40" style="position:absolute;left:-2px;top:0;animation-name:fy_al;animation-duration:2s;animation-timing-function:ease;animation-iteration-count:11"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 60, 10 L 70, 35 L 75, 29 L 86, 40 L 90, 35 L 79, 25 L 86, 19 L 60, 10 M 70,12 A 0.5 0.5 0 1 0 51,9 M 62,22 A 0.5 0.5 0 0 1 60,1"/></svg></div><span>' + a.config.msg + "</span>" : Z.MOBILE ? '<div><svg width="140" height="40"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 0,20 L 12, 32 M 0,20 L 12, 8 M 0,20 L 40, 20 M 140,20 L 128, 32 M 140,20 L 128, 8 M 140,20 L 100, 20"/></svg><svg width="140" height="40" style="position:absolute;left:-2px;top:0;animation-name:fy_al;animation-duration:2s;animation-timing-function:ease;animation-iteration-count:11"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 60, 10 L 70, 35 L 75, 29 L 86, 40 L 90, 35 L 79, 25 L 86, 19 L 60, 10 M 70,12 A 0.5 0.5 0 1 0 51,9 M 62,22 A 0.5 0.5 0 0 1 60,1"/></svg></div><span>Swipe to view 360</span>' : '<div><svg width="140" height="40"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 0,20 L 12, 32 M 0,20 L 12, 8 M 0,20 L 40, 20 M 140,20 L 128, 32 M 140,20 L 128, 8 M 140,20 L 100, 20"/></svg><svg width="140" height="40" style="position:absolute;left:-2px;top:0;animation-name:fy_al;animation-duration:2s;animation-timing-function:ease;animation-iteration-count:11"><path stroke-width="1.4" fill="none" stroke="#fff" d="M 60, 10 L 70, 35 L 75, 29 L 86, 40 L 90, 35 L 79, 25 L 86, 19 L 60, 10 M 70,12 A 0.5 0.5 0 1 0 51,9 M 62,22 A 0.5 0.5 0 0 1 60,1"/></svg></div><span>Click and drag to view 360</span>';
                a.el.appendChild(f);
                S(function() {
                    S(function() {
                        f.className = "fy_t1" + y
                    })
                });
                var w = 5
                  , c = function() {
                    0 === --w && (f.className += " fy_fd",
                    P(function() {
                        Y[a.id] || (fa(f),
                        f = null,
                        n = !1)
                    }, 480),
                    a.Off("display", c))
                };
                a.On("display", c)
            }
        });
        a.config.intro && 5 < a.config.fy.f && a.On("load", function() {
            a.Fire("showIntro")
        });
        var k = null
          , C = 0
          , x = !1;
        a.On("DidLoadFirst", function(y, f) {
            if (!k) {
                var w = ca();
                w.style.cssText = "transform:translate3d(0,0,0);height:3px;left:0;position:absolute;text-align:center;top:0;width:100%;z-index:999;";
                w.innerHTML = '<span class="fy_ldr"></span>';
                y.el.appendChild(w);
                k = w.getElementsByTagName("span")[0]
            }
            f *= 100;
            f > C + 1 && (!x || 100 === f) && (x = !0,
            S(function() {
                k && (k.style.width = f + "%",
                C = f,
                x = !1,
                100 === C && S(function() {
                    k && (fa(k.parentNode),
                    k = null)
                }))
            }))
        });
        var z = ca();
        z.className = "fy_l";
        a.el.appendChild(z);
        a.On("load", function() {
            z && (fa(z),
            z = null)
        });
        if (!a.config.nologo || 0 <= a.config.prv) {
            var m = da("a");
            m.className = "fy_lg";
            0 <= a.config.prv ? (m.className += " fy_bk",
            m.title = "back",
            m.setAttribute("onclick", "fyu.o[" + a.id + "].Update(" + a.config.prv + ")")) : (m.setAttribute("target", "_blank"),
            m.href = "https://fyu.se/v/" + a.fid,
            a.config.logo && (m.style.background = "url(" + a.config.logo + ") 32px 32px/52px no-repeat"));
            a.el.appendChild(m)
        }
    }
    function Ha(a) {
        27 === a.keyCode && wa()
    }
    function wa(a) {
        ea && (a && (a.preventDefault(),
        a.stopPropagation()),
        aa.removeEventListener("keydown", Ha),
        /*qa ? aa.exitFullscreen ? aa.exitFullscreen() : aa.mozCancelFullScreen ? aa.mozCancelFullScreen() : aa.webkitExitFullscreen && aa.webkitExitFullscreen() : */(ea.orig_el.appendChild(ea.el),
        a = aa.getElementById("fy_cv"),
        fa(a)),
        a = ea,
        ea = null,
        Y[a.id] || (a.plugins.pano && a.plugins.pano.resize(),
        a.Fire("fullscreen", !1),
        a.Resize()))
    }
    function za(a) {
        if (null === qa)
            try {
                qa = window.self !== window.top
            } catch (f) {
                qa = !0
            }
        if (ea) {
            wa();
        }else if (aa.addEventListener("keydown", Ha), qa) {
            var n = aa.documentElement;
            /*n.requestFullscreen ? n.requestFullscreen() : n.mozRequestFullScreen ? n.mozRequestFullScreen() : n.webkitRequestFullScreen && n.webkitRequestFullScreen();*/
            n = Q.innerWidth;
            var k = Q.innerHeight
              , C = "overflow:hidden;";
            Z.MOBILE && (C = "");
            var x = ca()
              , z = ca();
            x.id = "fy_cv";
            var m = da("a");
            m.className = "fy_cls";
            var y = ca();
            y.className = "fy_clyr";
            x.appendChild(m);
            x.appendChild(y);
            y.onclick = m.onclick = wa;
            x.appendChild(z);
            z.style.cssText = C + "height:100%;position:relative;z-index:100;margin:0;max-width:" + n + "px;max-height:" + k + "px;";
            aa.body.appendChild(x);
            a.orig_el = a.el.parentNode;
            z.appendChild(a.el);
            ea = a;
            a.plugins.pano && a.plugins.pano.resize();
                        
            a.Fire("fullscreen", !0)

            P(function() {
                ea === a && (a.Resize(),
                x.style.opacity = "1")
            }, 200)
        } else {
        	n = Q.innerWidth;
            var k = Q.innerHeight
              , C = "overflow:hidden;";
            Z.MOBILE && (C = "");
            var x = ca()
              , z = ca();
            x.id = "fy_cv";
            var m = da("a");
            m.className = "fy_cls";
            var y = ca();
            y.className = "fy_clyr";
            x.appendChild(m);
            x.appendChild(y);
            y.onclick = m.onclick = wa;
            x.appendChild(z);
            z.style.cssText = C + "height:100%;position:relative;z-index:100;margin:0;max-width:" + n + "px;max-height:" + k + "px;";
            aa.body.appendChild(x);
            a.orig_el = a.el.parentNode;
            z.appendChild(a.el);
            ea = a;
            a.plugins.pano && a.plugins.pano.resize();
            a.Fire("fullscreen", !0);
            P(function() {
                ea === a && (a.Resize(),
                x.style.opacity = "1")
            }, 8)
        }
    }
    function Sa(a, n) {
        var k = ca();
        k.className = "fy_pl";
        var C = da("a")
          , x = new Image;
        C.setAttribute("onclick", "fyu.o[" + a.id + "].Load()");
        x.onload = function() {
            Y[a.id] || (this.style.opacity = "1",
            a.Fire("_lc", 1),
            "p" !== n.id || T[a.id].LOADING || a.config.sprite || n.TPreload(0))
        }
        ;
        if (a.config.res) {
            var z = a.rnd.trans.scale
              , m = a.config.res.length;
            if (0 < m && 0 < z)
                for (T[a.id].RES = 0; 0 < m--; ) {
                    var y = a.config.res[m];
                    if (z >= y.scale / a.rnd.mod) {
                        y.all && (a.res = y.val);
                        T[a.id].RES = m + 1;
                        Z.MOBILE || 2 !== T[a.id].RES || (a.res = "");
                        break
                    }
                }
        }
        
        x.src = a.path + a.res + "frames_" + a.config.fy.t + ".jpg";
        k.appendChild(C);
        k.appendChild(x);
        a.el.appendChild(k);
        var f = function() {
            k && (fa(k),
            k = null,
            a.Off("_rld", f),
            a.Off("load", f))
        };
        n.ListenFor("_rld", f);
        n.ListenFor("load", f);
        
        // 바로 로드 되도록 커스텀 처리
        fyu.o[a.id].Load();
    }
    function Oa(a, n, k, C) {
        var x = ca();
        x.className = 1 === n ? "fy_wrppr fy_lnd" : "fy_wrppr fy_prt";
        if ("string" === typeof a) {
            var z = aa.getElementById(a);
            if (!z)
                return;
            z.appendChild(x)
        } else
            z = a,
            a.appendChild(x);
        "fy_auto" === z.className && (z.className = n ? 1 === C ? "fy_hsq" : 1.334 >= C ? "fy_h4x3" : "fy_h16x9" : 1 === C ? "fy_vsq" : .565 >= C ? "fy_v16x9" : "fy_v4x3");
        a = ca();
        a.setAttribute("data-parent", k);
        a.setAttribute("unselectable", "on");
        a.className = "fyu";
        x.appendChild(a);
        return a
    }
    function ua(a, n) {
        function k(x) {
            if (C[x]) {
                var z = da("script");
                z.type = "text/javascript";
                z.src = "https://cdn.fyusion.com/assets/lib/" + C[x];
                z.onload = function() {
                    k(++x)
                }
                ;
                document.body.appendChild(z)
            }
        }
        var C;
        ha[a] && ha[a].ok ? n(ha[a].obj) : ha[a] && ha[a].ldn ? ha[a].ev.push(n) : (ha[a] = {
            ldn: 1,
            ev: [n]
        },
        "gl" === a ? C = ["new-wasm-viewer.js"] : "v" === a ? C = ["new-video-viewer.js"] : "pn" === a && (C = ["pano-3.1.js"]),
        k(0))
    }
    function Na(a, n) {
        n || (n = {});
        var k = {
            render: "img",
            intro: 1,
            nologo: 0,
            preload: 0,
            pauseOutOfViewPort: 1,
            tags: 1,
            zoom: 0,
            h264: 0,
            zoomMax: 1.35,
            motion: 1,
            fastLoad: 1,
            fullscreen: 1,
            resolution: 0,
            autospeed: 1,
            tagClass: "fy_tg1",
            aspect: {
                mode: 1,
                tolerance: .41
            }
        };
        for (C in n)
            k[C] = n[C];
        k.width = a.fy.w;
        k.height = a.fy.h;
        k.map = a.map;
        k.mapL = a.mapL;
        k.h264 = a.h264 ? a.h264 : k.h264;
        k.sprite = a.sprite;
        k.fy = a.fy;
        k.pano = a.pano;
        k.blur = a.blur;
        k.low = a.low;
        k.wp = a.wp;
        k.ap = a.ap;
        k.pa = a.pa;
        k.fy.ratio = k.width / k.height;
        Z.MOBILE && 1280 > k.width ? (k.width = 960,
        k.height = 960 / k.fy.ratio >> 0) : 1920 < k.width && (k.width = 1920,
        k.height = 1920 / k.fy.ratio >> 0);
        var C = k.fy.p / 1;
        k.tags = k.tags && 0 !== (C & 1);
        k.loop = 0 !== (C & 4);
        n.pano || void 0 === n.pano || (k.pano = null);
        if (!Q.atob || !Q.URL)
            k.res = null;
        else if (!k.res && a.res)
            for (k.res = JSON.parse(a.res),
            C = 0; C < k.res.length; ++C)
                "1080p" === k.res[C] && (k.res[C] = {
                    val: "1080p/",
                    scale: 1
                });
        return k
    }
    function ta(a, n, k) {
        a.imgdata[n] || ++T[a.id].FramesLoaded;
        a.imgdata[n] = k
    }
    function Fa(a) {
        var n = 0
          , k = -1;
        a.frame_map && a.evs.ptr && (n = a.frame_map.length,
        k = a.frame_map[a.evs.ptr.frames.srcId >> 0]);
        if (T[a.id].FramesLoaded > a.frame_map.length + 1) {
            var C = a.imgdata.length;
            a.frame_map = [];
            for (var x = 0; x < C; ++x)
                a.imgdata[x] && a.frame_map.push(x);
            if (-1 < k && n !== a.frame_map.length)
                for (x = 0; x < a.frame_map.length; ++x)
                    if (a.frame_map[x] === k) {
                        a.evs.ptr.set(x);
                        break
                    }
        }
    }
    function Da(a, n, k, C, x, z, m, y) {
        var f = new XMLHttpRequest;
        !k && (k = "text");
        f.open("GET", a, !0);
        f.responseType = k;
        f.onload = function() {
            0 !== f.status || y ? f.readyState === XMLHttpRequest.DONE && 200 === f.status ? C(f.response, a, n, m) : x(a, n, m) : P(function() {
                Da(a, n, k, C, x, z, m, 1)
            }, 300)
        }
        ;
        f.onerror = function() {
            x(a, n, m)
        }
        ;
        f.send(null);
        return f
    }
    function Ta(a) {
        if (!Q.btoa)
            return "";
        var n = navigator.userAgent
          , k = 1 == /Mobi/.test(n) ? "mob" : "dsk"
          , C = "no"
          , x = "no"
          , z = 0
          , m = 0;
        try {
            if (Q.chrome && Q.chrome.webstore || 0 < n.indexOf("Chrome/") ? (z = n.indexOf("Chrome/"),
            m = 7,
            C = "chr") : Q.opr && opr.addons || Q.opera || 0 <= n.indexOf(" OPR/") ? (z = n.indexOf("OPR/"),
            m = 4,
            C = "opr") : Q.ApplePayError || /constructor/i.test(Q.HTMLElement) || "[object SafariRemoteNotification]" === (!Q.safari || safari.pushNotification).toString() ? (z = n.indexOf("Version/"),
            m = 8,
            C = "sfr") : "undefined" !== typeof InstallTrigger ? (z = n.indexOf("Firefox/"),
            m = 8,
            C = "ffrx") : aa.documentMode ? (z = n.indexOf("MSIE "),
            m = 5,
            -1 === z && (z = n.indexOf("rv:"),
            m = 3),
            C = "ie") : Q.StyleMedia ? (z = n.indexOf("Edge/"),
            m = 5,
            C = "edge") : 0 < n.indexOf("UCBrowser/") && (z = n.indexOf("UCBrowser/"),
            m = 10,
            C = "uc"),
            z && (z = n.substring(z + m, n.indexOf(".", z)) / 1,
            !z || 0 > z) && (z = 0),
            "dsk" === k)
                1 == /Windows/.test(n) ? (x = "win",
                1 == /5.1;/.test(n) ? x += " xp" : 1 == /6.0;/.test(n) ? x += " vista" : 1 == /6.1;/.test(n) ? x += " 7" : 1 == /6.2/.test(n) ? x += " 8" : 1 == /10.0;/.test(n) && (x += " 10")) : 1 == /Macintosh/.test(n) && (x = "mac",
                1 == /OS X/.test(n) && (x += " osx"));
            else if ("mob" === k)
                if (1 == /Windows/.test(n))
                    x = "win",
                    1 == /Phone 8/.test(n) ? x += " phone8" : 1 == /Phone 10/.test(n) && (x += " phone10");
                else if (1 == /Android/.test(n)) {
                    var y = function() {
                        if (/Android/.test(navigator.appVersion)) {
                            var f = navigator.appVersion.match(/Android (\d+).(\d+)/);
                            f || (f = navigator.appVersion.match(/Android (\d+)/)) && (f = f[1] / 1);
                            return f
                        }
                    }();
                    x = y[0]
                } else
                    1 == /iPhone;/.test(n) ? (y = function() {
                        if (/iP(hone|od|ad)/.test(navigator.appVersion)) {
                            var f = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                            return [parseInt(f[1], 10), parseInt(f[2], 10), parseInt(f[3] || 0, 10)]
                        }
                    }(),
                    x = "ios " + y[0] + "." + y[1]) : 1 == /iPad;/.test(n) ? (y = function() {
                        if (/iP(hone|od|ad)/.test(navigator.appVersion)) {
                            var f = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                            return [parseInt(f[1], 10), parseInt(f[2], 10), parseInt(f[3] || 0, 10)]
                        }
                    }(),
                    x = "ios " + y[0] + "." + y[1]) : x = "bb"
        } catch (f) {
            z = 0
        }
        a = {
            b: C,
            d: k,
            v: z,
            t: (new Date).getTimezoneOffset() / 60,
            o: x,
            l: a,
            w: Z.WASM ? 1 : 0
        };
        a = btoa(JSON.stringify(a));
        n = "";
        for (k = 0; k < a.length; ++k)
            n += String.fromCharCode(a.charCodeAt(k) / 1 + 1);
        return n
    }
    function ca() {
        return da("div")
    }
    function da(a) {
        return aa.createElement(a)
    }
    function fa(a) {
        a.parentNode.removeChild(a)
    }
    function Aa(a) {
        var n = a.url
          , k = a.method || "GET"
          , C = a.done || function() {}
          , x = a.fail || function() {}
          , z = a.retry || -1;
        if (Q.XDomainRequest) {
            var m = new XDomainRequest;
            m.onload = function() {
                C.call(null, m)
            }
            ;
            m.onerror = function() {
                x.call(null, m)
            }
        } else
            m = Q.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Msxml2.XMLHTTP");
        m.onreadystatechange = function() {
            4 === m.readyState && (200 === m.status ? C.call(null, m) : 0 > --z ? x.call(null, m) : (--a.retry,
            P(function() {
                Aa(a)
            }, 480)))
        }
        ;
        m.open(k, n, !0);
        m.send(null)
    }
    function Ua(a) {
        clearTimeout(Ia);
        Ia = P(function() {
            var n = fyu.entries.length;
            if (0 !== n)
                for (var k = window.innerHeight, C = window.innerWidth; 0 !== n--; ) {
                    var x = fyu.entries[n];
                    x.config.pauseOutOfViewPort && x.Fire("vport", C, k)
                }
        }, 76)
    }
    if (!Q.FYU || !Q.FYU.add) {
        var P = setTimeout
          , U = Math.abs;
        if (aa.addEventListener) {
            var Ba = da("style");
            Ba.type = "text/css";
            Ba.innerHTML = '.fy_pl>img,.fy_wrppr>div{width:100%;height:100%}.fy_cls,.fy_pl>a,.fy_pl>img{display:block}.fy_btn,.fy_cls,.fy_tg1{text-indent:-9999px}.fy_t1,.fy_tg_prvw{pointer-events:none}.fy_rndr,.fy_tg_prvw,.fy_wrppr{overflow:hidden}.fy_rndr{position:absolute!important;background:#222}.fy_wrppr{height:100%;padding:0;margin:0;position:relative;-webkit-tap-highlight-color:transparent;tap-highlight-color:transparent;-webkit-touch-callout:none;touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.fy_pl,.fyu canvas{position:absolute;left:0;top:0}#fy_cv .fyu canvas{max-width:initial}.fyu{touch-action:manipulation;background:#181818;transition:opacity .24s ease-in-out}.fyu canvas{-ms-transform-origin:0 0;-moz-transform-origin:0 0 0;-webkit-transform-origin:0 0 0;transform-origin:0 0 0}.fyu.fy_h{cursor:col-resize;cursor:url(https://cdn.fyusion.com/assets/viewer/cursor_h.gif) 24 16,col-resize}.fyu.fy_v{cursor:col-resize;cursor:url(https://cdn.fyusion.com/assets/viewer/cursor_v.gif) 24 16,col-resize}.fyu:active.fy_h{cursor:col-resize;cursor:url(https://cdn.fyusion.com/assets/viewer/cursor_hgrab.gif) 24 16,col-resize}.fyu:active.fy_v{cursor:col-resize;cursor:url(https://cdn.fyusion.com/assets/viewer/cursor_vgrab.gif) 24 16,col-resize}.fyu .fy_pg,.fyu.fy_pg{image-rendering:optimizequality;cursor:move;cursor:grab;cursor:-moz-grab;cursor:-webkit-grab}.fyu .fy_pg:active,.fyu.fy_pg:active{cursor:grabbing;cursor:-moz-grabbing;cursor:-webkit-grabbing}.fy_cls,.fy_lg,.fy_pl>a,.fy_tg1{cursor:pointer}.fy_pl{z-index:5;right:0;bottom:0}.fy_l,.fy_pl>a{position:absolute;top:50%;left:50%}.fy_pl>img{object-fit:cover;opacity:0;transition:opacity .3s}.fy_pl>a{width:460px;height:460px;z-index:1;background:url(https://cdn.fyusion.com/assets/viewer/arr-h.png) 50% no-repeat;margin-left:-230px;margin-top:-230px}.fy_l{border:6px solid rgba(99,99,99,.4);border-top:6px solid hsla(0,0%,100%,.64);border-radius:100%;height:50px;width:50px;animation:fy_a .8s infinite linear;background:0 0;margin-top:-30px;margin-left:-30px;z-index:4}@keyframes fy_a{0%{transform:translate3d(0,0,0) rotate(0)}to{transform:translate3d(0,0,0) rotate(359deg)}}@keyframes fy_asc{0%{transform:scale(1.4)}50%{transform:scale(.76)}100%{transform:scale(1)}}@keyframes fy_al{0%{transform:translate3d(0,0,0)}50%{transform:translate3d(8px,0,0)}100%{transform:translate3d(0,0,0)}}.fy_cls{position:fixed;right:6px;top:6px;text-align:center;z-index:100;text-decoration:none;text-shadow:none!important;width:46px;height:46px;opacity:1}.fy_cls:after,.fy_cls:before{position:absolute;top:9px;left:18px;content:" ";height:26px;width:3px;background-color:#fff;-ms-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}#fy_cv,#fy_cv .fyu{width:100%;height:100%}.fy_cls:before{-ms-transform:rotate(45deg);transform:rotate(45deg);-webkit-transform:rotate(45deg)}#fy_cv,.fy_clyr{position:absolute;left:0;top:0;right:0;bottom:0}#fy_cv{opacity:0;position:fixed;z-index:9999999999;transition:opacity .27s .08s;-webkit-transition:opacity .27s .08s;background:rgba(0,0,0,.84)}#fy_cv .fyu{position:relative;background:#303030}.fy_lg{transform:scale(.65);position:absolute;left:-24px;top:-24px;z-index:6;width:88px;height:88px;background:url(https://cdn.fyusion.com/0/sv4.png) 32px 32px/52px no-repeat}.fy_t1,.fy_tgs,.fy_vsm{position:absolute;top:0;left:0}.fy_lg.fy_bk{background:url(https://cdn.fyusion.com/assets/back.png) 32px 32px/52px no-repeat}.fy_tgs{-ms-transform-origin:0 0;transform-origin:0 0 0}.fy_tg1{width:48px;height:48px;margin-top:-18px;margin-left:-24px;font-size:0;position:absolute;z-index:4;display:none;image-rendering:optimizeSpeed}.fy_t1,.fy_tg1>a{height:100%;width:100%;font-size:0;text-align:-5000px}.fy_tg1>a{display:block;background:url(https://cdn.fyusion.com/0/sdk/web/tag-plus.svg) 50% no-repeat;background-size:100%;transition:transform .3s ease;-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);animation:fy_asc .6s ease-in-out 72ms 1}.fy_vsm{cursor:-webkit-zoom-in;cursor:zoom-in;z-index:6;background:50% 50%}.fy_btn,.fy_pn{cursor:pointer;text-align:center}.fy_fd{opacity:0!important}.fy_t1{opacity:1;z-index:4;background-color:rgba(0,0,0,.44);display:block;transition:opacity 240ms ease-in-out}.fy_t1 div,.fy_t1 span{display:block;top:50%;position:absolute}.fy_t1 div{width:140px;height:40px;left:50%;margin-top:-28px;margin-left:-70px}.fy_t1 span{font-family:Helvetica,Arial,sans-serif;color:#fff;text-align:center;left:0;width:100%;margin-top:20px;font-size:14px;text-shadow:0 0 1px #000}.fy_t1.fy_2{border-radius:2px;width:220px;height:100px;margin-left:-110px;top:auto;bottom:20px;left:50%}.fy_ctns{height:40px;width:auto;position:absolute;bottom:10px;right:7px;opacity:0;z-index:4;transition:opacity .25s}.fy_btn{display:inline-block;width:40px;height:40px;margin:0 3px;opacity:1;background:url(https://cdn.fyusion.com/assets/viewer/action-icons.png) no-repeat}.fy_btn.fy_bx2{background-position:-246px 0}#fy_cv .fy_bx2{background-position:-164px 0}.fy_btn.fy_btg{background-position:100%;opacity:.65}.fy_btn.fy_pct,.fyu:hover .fy_ctns{opacity:1}.fy_pn{min-width:98px;text-shadow:none;z-index:4;color:#fff;font-family:Arial,sans-serif;padding:5px 17px;font-size:12px;background:rgba(0,0,0,.5);border:1px solid #555;display:block;position:absolute;bottom:15px;left:15px;border-radius:4px}.fy_tg_prvw{position:absolute;bottom:10px;right:10px;opacity:1;transition:opacity .34s ease;z-index:4;background-color:rgba(0,0,0,.48);padding:6px;border-radius:2px;box-sizing:border-box;display:block;align-items:center;-ms-flex-pack:center;-ms-flex-align:center}.fy_tg_prvw>span{font-family:Helvetica,Arial,sans-serif;color:#fff;display:block;font-size:15px;font-weight:500;letter-spacing:.5px;max-width:240px;text-align:center;max-height:300px;overflow:hidden;text-shadow:0 0 1px #000}.fy_tg_prvw>div{display:block;max-width:340px;max-height:340px}.fy_tg_prvw>div img{width:100%;max-width:100%;-webkit-transform:scale(1.32);transform:scale(1.32);-ms-transform:scale(1.32);display:none}.fy_tg_prvw>div img.fy_act{display:block;margin:0 auto}.fy_h16x9>.fy_wrppr>.fyu{height:0;padding:0 0 56.25%}.fy_v16x9>.fy_wrppr>.fyu{height:0;padding:0 0 177%}.fy_h4x3>.fy_wrppr>.fyu{height:0;padding:0 0 75%}.fy_v4x3>.fy_wrppr>.fyu{height:0;padding:0 0 125%}.fy_hsq>.fy_wrppr>.fyu,.fy_vsq>.fy_wrppr>.fyu{height:0;padding:0 0 100%}.fy_v16x9,.fy_v4x3{max-width:380px}.fy_h16x9,.fy_h4x3{max-width:960px}.fy_ldr{background:#fc3549;display:block;height:100%;margin:0 auto;width:0}.cmfy_prvw{width:100%;position:absolute;left:0;z-index:3;top:0;pointer-events:none}.fy_dsc{font-family:Helvetica,Arial,"Lucida Grande",sans-serif;display:none;position:absolute;top:16px;left:50%;transform:translate(-50%,0);-ms-transform:translate(-50%,0);z-index:6;box-sizing:content-box;opacity:0;text-align:center;transition:opacity 440ms ease-in-out;user-select:none;width:48%;text-rendering:optimizeLegibility;transition:opacity .3s ease-in-out}.fy_dsc.fy_act{opacity:1;display:block}.fy_dsc>div{color:#fff;padding:6px 9px;background:rgba(0,0,0,.752);margin:0 auto;text-align:left;display:inline-block;border-radius:4px;text-align:left;font-size:12px;opacity:1;transition:opacity .3s ease-in-out;font-weight:400;line-height:16px;max-width:80%;box-shadow:0 2px 6px rgba(140,200,200,.48)}.fy_dsc>div:hover{opacity:0!important}.fy_hdn{display:none}';
            aa.getElementsByTagName("head")[0].appendChild(Ba)
        }
        var Ja = {
            reg: function(a, n) {
                if (ha[n])
                    for (var k = ha[n].ev, C = k ? k.length : 0; 0 < C--; )
                        k[C] && k[C](a);
                else
                    ha[n] = {};
                ha[n] = {
                    ok: 1,
                    ldn: 0,
                    obj: a
                }
            },
            add: function(a, n, k) {
                return new Ca(a,n,k)
            },
            get: function(a) {
                var n = fyu.entries.length;
                if ("string" === typeof a || a / 1 === a)
                    for (; 0 < n--; ) {
                        if (fyu.entries[n].fid === a || fyu.entries[n].id === a)
                            return fyu.entries[n]
                    }
                else
                    for (; 0 < n--; )
                        if (fyu.entries[n] === a || fyu.entries[n].el === a)
                            return fyu.entries[n]
            },
            removeAll: function(a) {
                a = fyu.entries;
                for (var n = a.length; 0 < n--; )
                    a[n] && a[n].Destroy();
                return !1
            },
            resizeAll: function() {
                var a = fyu.entries.length;
                if (0 !== a)
                    for (; 0 !== a--; ) {
                        var n = fyu.entries[a];
                        n.Resize()
                    }
            }
        };
        Q.FYU = Ja;
        Q.fyu = {
            entries: [],
            o: {},
            h: {},
            fs: null
        };
        var ha = {}, qa = null, ea, Ia, T = [], Y = {}, Ma = -1, Z = function() {
            var a = !!Q.DeviceMotionEvent
              , n = Q.Worker;
            var k = da("canvas");
            k = k.getContext && k.getContext("2d") ? 0 == k.toDataURL("image/webp").indexOf("data:image/webp") : void 0;
            a = {
                TOUCH: !!("ontouchstart"in Q),
                GYRO: a,
                WORKER: n,
                WP: k
            };
            a.WORKER ? (n = da("canvas"),
            (n = n.getContext("webgl") || n.getContext("experimental-webgl")) && n instanceof WebGLRenderingContext && (a.WEBGL = !0,
            "object" === typeof Q.WebAssembly && "function" === typeof Q.WebAssembly.instantiate && (a.WASM = !0))) : (a.WEBGL = !1,
            a.WASM = !1);
            n = -1 < navigator.userAgent.toLowerCase().indexOf("android");
            k = null;
            n || (k = -1 !== navigator.userAgent.indexOf("iPhone") || -1 !== navigator.userAgent.indexOf("iPod") || -1 !== navigator.userAgent.indexOf("iPad"));
            if (k || n)
                a.MOBILE = !0;
            return a
        }(), Ga = function(a) {
            if (a.performance && a.performance.now)
                return function() {
                    return a.performance.now()
                }
                ;
            var n = Date.now();
            return function() {
                return Date.now() - n
            }
        }(Q);
        (function(a) {
            function n(k) {
                function C(t, B) {
                    var J = k.config
                      , I = ".jpg?v=1";
                    Z.WP && k.config.wp && ("" === k.res || "480p/" === k.res) && (I = ".webp?v=1");
                    J = k.path + ((J.mask ? "0s_" + J.mask + "/" : "") + k.res) + "frames_" + t[0] + I;
                    var L = -1;
                    k.config.res && k.config.res[0] && (k.config.res[0].val === k.res ? L = 0 : k.config.res[1] && k.config.res[1] === k.res && (L = 1));
                    z.fetch(J, t[0], "blob", function(F, K, X, b) {
                        z.Fire("DidExtractFrame", F, z.t, b, L);
                        B || (++m,
                        f && z.Start())
                    }, function(F, K, X) {
                        z.Fire("ErrorFrame", t);
                        B || (++m,
                        f && z.Start())
                    }, k.id, t[1])
                }
                function x() {
                    var t = k.config
                      , B = t.fy.t
                      , J = t.fy.f - 1;
                    t = [{
                        l: [],
                        r: []
                    }];
                    var I = {};
                    I[B] = 1;
                    var L = z.jump;
                    t[0].l.push([B, B]);
                    for (var F = B + L; F <= J; F += L)
                        I[F] || (t[0].l.push([F, F]),
                        I[F] = 1);
                    for (F = B - L; 0 <= F; F -= L)
                        I[F] || (t[0].r.push([F, F]),
                        I[F] = 1);
                    if (1 < L && 0 === L % 2) {
                        t[1] = {
                            l: [],
                            r: []
                        };
                        var K = B + L / 2;
                        for (F = K; F <= J; F += L)
                            I[F] || (t[1].l.push([F, F]),
                            I[F] = 1);
                        for (F = K; 0 <= F; F -= L)
                            I[F] || (t[1].r.push([F, F]),
                            I[F] = 1);
                        if (3 <= L) {
                            var X = L / 2
                              , b = X / 2;
                            if (b >> 0 === b) {
                                t[2] = {
                                    l: [],
                                    r: []
                                };
                                t[3] = {
                                    l: [],
                                    r: []
                                };
                                for (F = K = B + (X - b); F <= J; F += L)
                                    I[F] || (t[2].l.push([F, F]),
                                    I[F] = 1);
                                for (F = K; 0 <= F; F -= L)
                                    I[F] || (t[2].r.push([F, F]),
                                    I[F] = 1);
                                for (F = K = B + (X + b); F <= J; F += L)
                                    I[F] || (t[3].l.push([F, F]),
                                    I[F] = 1);
                                for (F = K; 0 <= F; F -= L)
                                    I[F] || (t[3].r.push([F, F]),
                                    I[F] = 1)
                            }
                        }
                    }
                    if (k.config.sprite)
                        for (var q = 0; q < k.config.sprite.length; ++q)
                            B = k.config.sprite[q],
                            I[B] || (t[2] ? t[2].l.push([B, B]) : t[0].l.push([B, B]),
                            I[B] = 1);
                    B = 0;
                    for (q in I)
                        ++B;
                    z.FrameAvail = B;
                    return t
                }
                var z = this, m = 2, y = 0, f = !1, w;
                z.id = "p";
                var c = !0;
                k.On("_lc", function(t, B) {
                    c && (k.Fire("load-cover"),
                    c = !1,
                    S(function() {
                        S(function() {
                        	try{
                        		var J = t.config.res[T[t.id].RES - 1];
                        		J && t.ForceRenderHigh(t.rnd.visible_frame, J.val, T[t.id].RES - 1)                        		
                        	}catch(e){}
                        })
                    }));
                    B || (m += 13,
                    f && z.Start())
                });
                var p = 1;
                1 === k.config.fastLoad && (p = 8,
                540 < k.config.fy.f ? p = 24 : 340 < k.config.fy.f ? p = 16 : 250 < k.config.fy.f ? p = 12 : 120 > k.config.fy.f && (p = 4));
                this.jump = this.jump ? this.jump / 1 : p;
                z.Stop = function() {
                    f = !1;
                    this.Fire("DidStopDownload")
                }
                ;
                var e = !1;
                z.TPreload = function(t) {
                    w = x();
                    var B = w[0];
                    for (t = t ? 1 : 3; (B.l.length || B.r.length) && 0 < t; )
                        (e = B.l.length ? B.r.length ? !e : !0 : !1) ? C(B.l.shift(), 1) : C(B.r.shift(), 1),
                        --t
                }
                ;
                z.Start = function() {
                    f = !0;
                    w || (w = x());
                    var t = w[y];
                    t && 0 === t.l.length && 0 === t.r.length && (t = w[++y]);
                    if (!t)
                        return !0;
                    for (; (t.l.length || t.r.length) && 0 < m; )
                        (e = t.l.length ? t.r.length ? !e : !0 : !1) ? C(t.l.shift()) : C(t.r.shift()),
                        --m;
                    this.Fire("DidStartDownload")
                }
                ;
                var u = new Image
                  , G = !1;
                u.onerror = function() {
                    G = !1
                }
                ;
                window.atob && window.URL && "img" !== k.config.render ? (this.t = "i",
                this.RenderRepeat = function(t, B, J, I) {
                    if (!G)
                        if (u.src)
                            B.drawImage(u, 0, 0, u.width, u.height, 0, 0, J, I);
                        else {
                            var L = URL.createObjectURL(t.data);
                            u.onload = function() {
                                G = !1;
                                B.drawImage(u, 0, 0, u.width, u.height, 0, 0, J, I);
                                z.Fire("DidRender", t);
                                URL.revokeObjectURL(u.src)
                            }
                            ;
                            u.src = L;
                            G = !0
                        }
                }
                ,
                this.Render = function(t, B, J, I) {
                    if ("u" === t.type)
                        return B.drawImage(t.data, 0, 0, t.data.width, t.data.height, 0, 0, J, I),
                        z.Fire("DidRender", t),
                        !0;
                    if (G)
                        return !1;
                    var L = new Image
                      , F = URL.createObjectURL(t.data);
                    L.onload = function() {
                        G = !1;
                        k.rnd.visible_frame !== t.index ? (URL.revokeObjectURL(L.src),
                        L = null) : (B.drawImage(L, 0, 0, L.width, L.height, 0, 0, J, I),
                        t.data = L,
                        t.type = "u",
                        URL.revokeObjectURL(L.src),
                        z.Fire("DidRender", t))
                    }
                    ;
                    G = !0;
                    L.src = F;
                    return !0
                }
                ) : (this.t = "m",
                this.RenderRepeat = this.Render = function(t, B, J, I) {
                    B.drawImage(t.data, 0, 0, t.data.width, t.data.height, 0, 0, J, I);
                    z.Fire("DidRender", t);
                    return !0
                }
                )
            }
            a.FYU.reg(function(k, C, x) {
                C = new n(k);
                C.fetch = "i" === C.t ? x.bind(this) : function(z, m, y, f, w, c, p, e) {
                    var u = new Image;
                    u.onload = function() {
                        f(u, z, m, p)
                    }
                    ;
                    u.onerror = function() {
                        w(z, m, p)
                    }
                    ;
                    u.src = z
                }
                ;
                C.Fire = k.Fire.bind(C);
                C.ListenFor = k.On.bind(C);
                return C
            }, "p")
        }
        )(window);
        Ca.prototype.GetFrameIndex = function(a) {
            if (T[this.id].FramesLoaded > this.frame_map.length + 4) {
                var n = 0
                  , k = -1;
                this.frame_map && this.evs.ptr && (n = this.frame_map.length,
                k = this.frame_map[this.evs.ptr.frames.srcId >> 0]);
                var C = this.imgdata.length;
                this.frame_map = [];
                for (var x = 0; x < C; ++x)
                    this.imgdata[x] && this.frame_map.push(x);
                if (-1 < k && n !== this.frame_map.length)
                    for (x = 0; x < this.frame_map.length; ++x)
                        if (this.frame_map[x] === k) {
                            this.evs.ptr.set(x);
                            break
                        }
            }
            for (x = 0; x < this.frame_map.length; ++x)
                if (a === this.frame_map[x])
                    return x;
            n = 1E3;
            for (x = k = 0; x < this.frame_map.length; ++x)
                C = U(this.frame_map[x] - a),
                C < n && (n = C,
                k = x);
            return k
        }
        ;
        var Ra = function(a) {
            function n(e) {
                return {
                    points: [],
                    addPoint: function(u) {
                        for (; 0 < this.points.length && !(100 >= u - this.points[0].time); )
                            this.points.shift();
                        this.points.push({
                            x: this.move.x,
                            y: this.move.y,
                            time: u
                        })
                    },
                    start: {
                        x: 0,
                        y: 0
                    },
                    move: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    frames: {
                        target: e,
                        srcId: e,
                        curFrameId: e
                    },
                    set: function(u) {
                        this.frames.target = u;
                        this.frames.srcId = u;
                        this.frames.curFrameId = u
                    }
                }
            }
            function k(e, u) {
                var G = u.pageX - e.pageX
                  , t = u.pageY - e.pageY;
                return Math.sqrt(G * G + t * t)
            }
            function C(e) {
                e = e.fy;
                var u = e.cv
                  , G = e.fr
                  , t = 0
                  , B = 0;
                U(e.dx) > U(e.dy) ? t = 0 < e.dx ? 1 : -1 : U(e.dy) > U(e.dx) && (B = 0 < e.dy ? 1 : -1);
                var J = 0 < u ? -t : t;
                u = 0 < u ? -B : B;
                G && (u *= -1,
                B *= -1);
                1 === e.m && (1 === e.r ? (e = -u,
                u = J,
                J = e,
                e = -B,
                B = t) : (e = u,
                u = -J,
                J = e,
                e = B,
                B = -t),
                t = e);
                return {
                    sX: J,
                    sY: u,
                    gX: t,
                    gY: B
                }
            }
            function x(e, u) {
                switch (u.type) {
                case "mousemove":
                case "pointermove":
                    e._move(this, u);
                    break;
                case "touchmove":
                    e._moveTouch(this, u);
                    break;
                case "touchstart":
                    this.gt && (clearTimeout(this.gt),
                    this.gt = null);
                    e._startTouch(this, u);
                    break;
                case "mousedown":
                case "pointerdown":
                    this.gt && (clearTimeout(this.gt),
                    this.gt = null);
                    e._start(this, u);
                    break;
                case "touchend":
                    e._endTouch(this, u);
                    break;
                case "mouseup":
                case "mouseout":
                case "pointerup":
                    e._end(this, u);
                    break;
                case "mouseover":
                    e._startHover(this, u);
                    break;
                case "orientationchange":
                case "resize":
                    this._resize();
                    break;
                case "wheel":
                case "DOMMouseScroll":
                case "mousewheel":
                    e._wheel(this, u);
                    break;
                case "contextmenu":
                    z(u)
                }
            }
            function z(e) {
                e.preventDefault();
                e.stopPropagation();
                return !1
            }
            function m(e, u, G) {
                for (; 0 < c.length && !(100 >= G - c[0].time); )
                    c.shift();
                c.push({
                    x: e,
                    y: u,
                    time: G
                })
            }
            function y(e) {
                var u = {}
                  , G = e.touches
                  , t = G ? G.length : 0;
                if (0 < t) {
                    var B = G[0];
                    u.x = B.pageX;
                    u.y = B.pageY;
                    u.touches = G;
                    u.fingers = t
                } else
                    u.x = e.pageX,
                    u.y = e.pageY;
                u.target = e.target;
                return u
            }
            function f(e, u) {
                var G = this;
                Z.MOBILE ? (this._start = this._startTouch,
                this._move = this._moveTouch,
                this._end = this._endTouch,
                p.add(e.el, "touchstart", this, !1),
                e.el.addEventListener("touchmove", function(t) {
                    if (!e.plugins.pano || !e.plugins.pano.visible)
                        if (e === ea)
                            t.stopPropagation(),
                            t.preventDefault();
                        else {
                            if (t.touches && t.touches[0]) {
                                if (1 < t.touches.length)
                                    return;
                                var B = t.touches[0].pageX;
                                var J = t.touches[0].pageY
                            } else
                                B = t.pageX,
                                J = t.pageY;
                            60 > 180 * Math.atan2(Math.abs(J - G.ptr.start.y), Math.abs(B - G.ptr.start.x)) / Math.PI && (t.preventDefault(),
                            t.stopPropagation())
                        }
                }, {
                    passive: !1,
                    capture: !0
                })) : (!Q.PointerEvent || "ontouchstart"in aa.documentElement ? p.add(e.el, "mousedown", this, !1) : (e.el.style.touchAction = "none",
                p.add(e.el, "pointerdown", this, !1)),
                "ontouchstart"in aa.documentElement && p.add(e.el, "touchstart", this, !1));
                p.add(e.el, "contextmenu", this, !1);
                !u && e.config.zoom ? (p.add(e.el, "mousewheel", this, !1),
                p.add(e.el, "DOMMouseScroll", this, !1)) : u && e.config.zoom && (this.scale = {
                    start: null,
                    end: null,
                    value: 1,
                    minValue: .1
                })
            }
            function w(e, u) {
                if (u && e.config.motion) {
                    var G = this
                      , t = T[e.id];
                    G.mId = va.Start().Push(function(B) {
                        if (!G.focus && 2 === t.VIEWPORT && G.enabled) {
                            var J = -B.rotation_x
                              , I = B.rotation_y;
                            -1 === J && (J = -B.rx,
                            I = B.ry);
                            B = (48 + t.FramesLoaded / 3) / 1.04719;
                            75 > B ? B = 75 : 160 < B && (B = 160);
                            J *= 3.52 * B;
                            I *= 3.52 * B + 12;
                            G.x += J;
                            G.y += I;
                            G._dist(e, {
                                x: J,
                                y: I
                            }, !0);
                            e.FlintRendering()
                        }
                    })
                }
            }
            var c = []
              , p = {
                add: function(e, u, G, t) {
                    e.addEventListener(u, G, {
                        passive: !1,
                        capture: !0
                    })
                },
                remove: function(e, u, G, t) {
                    e.removeEventListener(u, G, {
                        passive: !1,
                        capture: !0
                    })
                }
            };
            return function(e) {
                function u(l, h) {
                    this._ti += l - this._ts >> 0;
                    if (this._ti > 5E3 + h.m._ttl) {
                        var r = new Image;
                        r.src = "https://api.fyusion.com/1.2/logs/web/" + h.fid + "?t=0&s=" + h.sid + "&l=" + this._ti;
                        h.m._ttl = this._ti;
                        h.m._tev = l
                    } else
                        1E4 < l - h.m._tev && (r = new Image,
                        r.src = "https://api.fyusion.com/1.2/logs/web/" + h.fid + "?t=0&s=" + h.sid + "&l=" + this._ti,
                        h.m._ttl = this._ti,
                        h.m._tev = l);
                    this._ts = l
                }
                var G = T[e.id]
                  , t = this;
                this.enabled = !1;
                this.dir = C(e.config);
                this.ptr = n.call(this, e.GetFrameIndex(e.config.fy.t));
                this.whl = this.hScroll = !0;
                var B = function(l) {
                    t.enabled && (ea || t.lock) && l.preventDefault()
                };
                e.On("WillDestroy", function() {
                    aa.removeEventListener("touchmove", B, {
                        passive: !1
                    });
                    t.enabled = !1;
                    p.remove(document, "mouseup", t, !1);
                    p.remove(document, "mousemove", t, !1);
                    p.remove(document, "pointerup", t, !1);
                    p.remove(document, "pointermove", t, !1);
                    va.Clear(t.mId);
                    t.mId = null
                });
                this.scale = {
                    start: null,
                    end: null,
                    value: 1,
                    minValue: .1
                };
                this.dragY = this.dragX = 0;
                this.pan = !1;
                this._ti = this._ts = 0;
                this.handleEvent = x.bind(e, this);
                f.call(this, e, Z.TOUCH);
                e.On("load", function() {
                    w.call(t, e, Z.MOBILE)
                });
                var J = function() {
                    e.Fire("dbtap");
                    if (!this.enabled)
                        return !1;
                    this.enabled = !1;
                    var l = 0
                      , h = this;
                    .4 > (e.rnd.trans.scale - e.rnd.trans.minScale) / (e.rnd.trans.maxScale - e.rnd.trans.minScale) ? P(function() {
                        var r = 12
                          , E = function() {
                            S(function(D) {
                                24 < D - l ? (l = D,
                                e.rnd.Zoom(e, 14, {
                                    pageX: h.ptr.start.x,
                                    pageY: h.ptr.start.y
                                }, 0),
                                D = (e.rnd.trans.scale - e.rnd.trans.minScale) / (e.rnd.trans.maxScale - e.rnd.trans.minScale),
                                0 !== --r && .53 > D ? E() : h.enabled = !0) : E()
                            })
                        };
                        E()
                    }, 0) : P(function() {
                        var r = 64
                          , E = function() {
                            S(function(D) {
                                24 < D - l ? (l = D,
                                e.rnd.Zoom(e, -14, {
                                    pageX: h.ptr.start.x,
                                    pageY: h.ptr.start.y
                                }, 0),
                                e.rnd.trans.scale != e.rnd.trans.minScale && 0 < --r ? E() : h.enabled = !0) : E()
                            })
                        };
                        E()
                    }, 0)
                }
                  , I = 0
                  , L = 0
                  , F = 0;
                this._start = function(l, h) {
                    if (!this.enabled)
                        return !1;
                    "pointerdown" === h.type ? (p.add(document, "pointermove", this, !1),
                    p.add(document, "pointerup", this, !1)) : (p.add(document, "mousemove", this, !1),
                    p.add(document, "mouseup", this, !1));
                    this.ptr.start = y(h);
                    this.ptr.move = y(h);
                    this._pan(l, h);
                    this._ts = h.timeStamp;
                    this.focus = this.swipe = !0;
                    this.ptr.points = [];
                    this.ptr.addPoint(this._ts);
                    this.canvasPan && m(this.ptr.move.x, this.ptr.move.y, this._ts);
                    var r = this.ptr.points[0];
                    l.config.zoom && 260 > r.time - I && 15 > U(L - r.x) && 15 > U(F - r.y) && J.call(this);
                    L = r.x;
                    F = r.y;
                    I = r.time
                }
                ;
                this._move = function(l, h) {
                    var r = y(h);
                    h.preventDefault();
                    h.stopPropagation();
                    this._pan(l, h, !0) ? m(this.dragX, this.dragY, h.timeStamp) : this._dist(l, r) && (this.ptr.addPoint(h.timeStamp),
                    l.FlintRendering())
                }
                ;
                this._end = function(l, h) {
                    this.canvasPan && this._startDecelPan(l, h.timeStamp);
                    this.canvasPan = this.focus = !1;
                    p.remove(document, "mouseup", this, !1);
                    p.remove(document, "mousemove", this, !1);
                    p.remove(document, "pointerup", this, !1);
                    p.remove(document, "pointermove", this, !1);
                    this.swipe = !1;
                    this._startDecel(l, h.timeStamp)
                }
                ;
                this._pan = function(l, h, r, E) {
                    if (r && this.canvasPan)
                        return r = h.pageX,
                        h = h.pageY,
                        E || (r -= l.rnd.el.offsetLeft,
                        h -= l.rnd.el.offsetTop),
                        l.rnd.Translate(1.23 * (r - this.dragX), 1.23 * (h - this.dragY), l),
                        this.dragX = r,
                        this.dragY = h,
                        !0;
                    l.config.zoom && (3 === h.which && 2 === h.button ? (this.canvasPan = !0,
                    this.dragX = this.ptr.start.x - l.rnd.el.offsetLeft,
                    this.dragY = this.ptr.start.y - l.rnd.el.offsetTop) : l.rnd.trans.scale > l.rnd.trans.minScale + .21 && (this.canvasPan = !0,
                    this.dragX = this.ptr.start.x - l.rnd.el.offsetLeft,
                    this.dragY = this.ptr.start.y - l.rnd.el.offsetTop))
                }
                ;
                var K = !1
                  , X = 0
                  , b = 0;
                this._startDecel = function(l, h) {
                    this.ptr.addPoint(h);
                    var r = this.ptr.points[0]
                      , E = this.ptr.points[this.ptr.points.length - 1]
                      , D = E.y - r.y
                      , H = (E.time - r.time) / 18;
                    X = (E.x - r.x) / H || 0;
                    b = D / H || 0;
                    1 < U(X) || 1 < U(b) ? (K = !0,
                    S(this._stepDecel.bind(this, l, h))) : (this._rendering = !1,
                    u.call(this, h, l))
                }
                ;
                var q = !1
                  , g = 0
                  , v = 0;
                this._startDecelPan = function(l, h) {
                    m(this.dragX, this.dragY, h);
                    var r = c[0]
                      , E = c[c.length - 1]
                      , D = E.y - r.y
                      , H = (E.time - r.time) / 18;
                    g = (E.x - r.x) / H || 0;
                    v = D / H || 0;
                    1 < U(g) || 1 < U(v) ? (q = !0,
                    S(this._stepDecelPan.bind(this, l, h))) : (this._rendering = !1,
                    u.call(this, h, l))
                }
                ;
                this._stepDecel = function(l, h) {
                    if (K)
                        if (X *= .72,
                        b *= .72,
                        .278 < U(X) || .278 < U(b)) {
                            this._dist(l, {
                                x: this.ptr.move.x + X,
                                y: this.ptr.move.y + b
                            });
                            l.FlintRendering();
                            var r = this;
                            S(function() {
                                r._stepDecel(l, h + 30)
                            })
                        } else
                            this._rendering = K = !1,
                            u.call(this, h, l)
                }
                ;
                this._stepDecelPan = function(l, h) {
                    if (q)
                        if (g *= .72,
                        v *= .72,
                        .279 < U(g) || .279 < U(v)) {
                            this._pan(l, {
                                pageX: this.dragX + g,
                                pageY: this.dragY + v
                            }, !0, !0);
                            var r = this;
                            S(function() {
                                r._stepDecelPan(l, h + 30)
                            })
                        } else
                            this._rendering = q = !1,
                            u.call(this, h, l)
                }
                ;
                this._startTouch = function(l, h) {
                    if (!this.enabled)
                        return !1;
                    p.add(document, "touchmove", this, !1);
                    p.add(document, "touchend", this, !1);
                    this.swipe = !0;
                    this.ptr.start = y(h);
                    this.ptr.move = y(h);
                    this._ts = h.timeStamp;
                    if (2 === this.ptr.start.fingers)
                        return z(h),
                        this.focus = !0,
                        this.scale.start = h.touches,
                        this.scale.value = 1,
                        !1;
                    l.config.zoom && 1 === this.ptr.start.fingers && l.rnd.trans.scale > l.rnd.trans.minScale + .21 && h.stopPropagation();
                    this._keepScroll(!0);
                    this.ptr.points = [];
                    this.ptr.addPoint(this._ts);
                    l.FlintRendering()
                }
                ;
                this._moveTouch = function(l, h) {
                    var r = y(h);
                    if (1 < r.fingers)
                        return this._mobZoom(l, h),
                        !1;
                    if (this.lock)
                        if (this.hScroll) {
                            var E = this.ptr.points[0];
                            60 > 180 * Math.atan2(Math.abs(r.y - E.y), Math.abs(r.x - E.x)) / Math.PI && (h.preventDefault(),
                            h.stopPropagation())
                        } else
                            h.preventDefault(),
                            h.stopPropagation();
                    if (l.rnd.trans.scale > l.rnd.trans.minScale + .21)
                        return z(h),
                        r = h.touches[0].pageX - l.rnd.el.offsetLeft,
                        E = h.touches[0].pageY - l.rnd.el.offsetTop,
                        this.dragX || (this.dragX = r,
                        this.dragY = E),
                        l.rnd.Translate(1.23 * (r - this.dragX), 1.23 * (E - this.dragY), l),
                        this.dragX = r,
                        this.dragY = E,
                        !1;
                    this._dist(l, r);
                    this.ptr.addPoint(h.timeStamp);
                    l.FlintRendering()
                }
                ;
                this._mobZoom = function(l, h) {
                    h.preventDefault();
                    h.stopPropagation();
                    this.scale.start || (this.scale.start = h,
                    this.scale.value = 1);
                    var r = this.scale.value;
                    this.scale.end = h.touches;
                    var E = this.scale;
                    var D = this.scale.start;
                    var H = this.scale.end;
                    D = D && H && 2 <= D.length && 2 <= H.length ? k(H[0], H[1]) / k(D[0], D[1]) : 1;
                    E.value = D;
                    l.rnd.Zoom(l, 1 > this.scale.value ? 100 * (this.scale.value - r) : 58 * (this.scale.value - r), null, !1, !0);
                    return !1
                }
                ;
                this._endTouch = function(l, h) {
                    this._keepScroll();
                    h.touches && 1 >= h.touches.length && (this.scale.start = null,
                    this.scale.value = 1,
                    l.rnd.trans.scale < l.rnd.trans.minScale && (l.rnd.canvas.style.transition = "transform 260ms cubic-bezier(.16,.49,.37,1.52)",
                    l.rnd.Zoom(l, 1, null, !1, !1, l.rnd.trans.minScale),
                    setTimeout(function() {
                        l.rnd && (l.rnd.canvas.style.transition = "")
                    }, 300)));
                    this.dragY = this.dragX = 0;
                    p.remove(document, "touchend", this, !1);
                    p.remove(document, "touchmove", this, !1);
                    this.swipe = !1;
                    if (h.touches && 0 === h.touches.length) {
                        var r = this.ptr.points[0];
                        if (l.config.zoom && r && 370 > r.time - I && 29 > U(L - r.x) && 29 > U(F - r.y)) {
                            J.call(this);
                            I = this.ptr.points[0].time;
                            return
                        }
                        I = r.time;
                        L = r.x;
                        F = r.y
                    }
                    this._startDecel(l, h.timeStamp)
                }
                ;
                this._keepScroll = function(l) {
                    var h = this;
                    l ? (h.focus = !0,
                    h.lock = !0,
                    clearTimeout(h.timeout),
                    h.timeout = null) : h.timeout = P(function() {
                        h.focus = !1;
                        h.lock = !1
                    }, 210)
                }
                ;
                var d = 0;
                this._wheel = function(l, h) {
                    if (!this.enabled || !this.whl)
                        return !1;
                    h.preventDefault();
                    var r = Date.now();
                    0 > d + 12 - r && (d = r,
                    (r = h.wheelDelta ? h.wheelDelta / 40 : h.detail ? -h.detail : 0) && l.rnd.Zoom(l, r, h));
                    return !1
                }
                ;
                this._dist = function(l, h, r) {
                    var E, D = l.evs.ptr, H = G.FramesLoaded;
                    if (r) {
                        if (90 === window.orientation) {
                            var M = -h.y;
                            var N = h.x
                        } else
                            -90 === window.orientation ? (M = h.y,
                            N = -h.x) : (M = h.x,
                            N = h.y);
                        var W = E = 0
                    } else
                        M = h.x - D.move.x,
                        W = N = h.y - D.move.y,
                        E = U(M / 16),
                        W = U(W / 16);
                    r ? (M *= -this.dir.gX,
                    N *= this.dir.gY) : (M *= this.dir.sX,
                    N *= this.dir.sY);
                    U(M) > U(N) || (M = N,
                    E = W);
                    if (0 !== M) {
                        r ? (E = U(M) / 5.45,
                        W = 0 > M ? -.01 : .01,
                        10 < E && (E = 10)) : (E = Z.TOUCH ? 1 + 4 * (E - .001) : 1 + 3.38 * (E - .001),
                        W = 0 > M ? -.01 : .01,
                        16 < E && (E = 16));
                        r = D.frames.curFrameId;
                        M = l.frame_map.length / 3 + 3;
                        20 > M && !l.config.loop && (M = 20);
                        E *= M * W;
                        H = H / 10 >> 0;
                        if (U(E) > H)
                            r += 0 > E ? -H : H;
                        else if (E)
                            r += E;
                        else
                            return;
                        l.config.loop && T[l.id].LOOP ? 0 > r ? r += l.frame_map.length - 1 : r >= l.frame_map.length && (r = (r >> 0) - (l.frame_map.length - 1)) : r = Math.max(0, Math.min(l.frame_map.length - 1, r));
                        l = Math.round(r);
                        l != D.frames.srcId ? (D.frames.srcId = l,
                        D.frames.curFrameId = l) : D.frames.curFrameId = r;
                        D.move = h;
                        return !0
                    }
                }
                ;
                var A = !1;
                e.On("pan", function(l, h) {
                    h ? A || (l.el.className = l.el.className.replace("fy_h", "fy_pg").replace("fy_v", "fy_pg"),
                    A = !0) : A && (A = !1,
                    l.el.className = 0 !== l.evs.dir.sX ? l.el.className.replace("fy_pg", "fy_h") : l.el.className.replace("fy_pg", "fy_v"))
                })
            }
        }()
          , Pa = function() {
            function a(m) {
                function y(f, w) {
                    w.left > f.maxScrollLeft ? w.left = f.maxScrollLeft : 0 > w.left && (w.left = 0);
                    w.top > f.maxScrollTop ? w.top = f.maxScrollTop : 0 > w.top && (w.top = 0);
                    return w
                }
                this.viewer = m;
                this.el = ca();
                this.el.className = "fy_rndr";
                this.canvas = da("canvas");
                this.canvas.imageSmoothingEnabled = !1;
                this.canvas.className = "fy_cnvs";
                this.canvas.mozOpaque = !0;
                this.ctx = this.canvas.getContext("2d", {
                    alpha: !1,
                    antialias: !1
                });
                this.canvas.width = m.config.width;
                this.canvas.height = m.config.height;
                this.mod = m.config.width / 960;
                this.el.appendChild(this.canvas);
                m.el.appendChild(this.el);
                this.full_width = m.config.width;
                this.full_height = m.config.height;
                this.visible_frame = 0;
                this.coords = {
                    width: "0px",
                    height: "0px",
                    left: "0px",
                    top: "0px"
                };
                this.trans = {
                    scale: 1,
                    minScale: 1,
                    maxScale: m.config.zoomMax,
                    scrollLeft: 0,
                    scrollTop: 0,
                    maxScrollLeft: 0,
                    maxScrollTop: 0
                };
                this.ptrans = {
                    scale: -1,
                    scrollLeft: -1,
                    scrollTop: -1
                };
                n.call(this, m);
                z.call(this, m);
                this.Resize = n.bind(this);
                this.Translate = function(f, w, c) {
                    var p = this.trans;
                    f = y(p, {
                        left: p.scrollLeft - f,
                        top: p.scrollTop - w
                    });
                    p.scrollLeft = f.left;
                    p.scrollTop = f.top;
                    S(x.bind(this, c))
                }
                ;
                this.Zoom = function(f, w, c, p, e, u) {
                    var G = Math.pow(1.01, w);
                    w = this.trans;
                    var t = w.scale;
                    if (c)
                        if (c._x && c._y) {
                            var B = c._x * this.el.clientWidth;
                            c = c._y * this.el.clientHeight
                        } else {
                            var J = document.body;
                            B = this.el.getBoundingClientRect();
                            var I = window;
                            var L = B.top + (I.pageYOffset || J.scrollTop) - (J.clientTop || 0);
                            B = B.left + (I.pageXOffset || J.scrollLeft) - (J.clientLeft || 0);
                            B = c.pageX - B;
                            c = c.pageY - L
                        }
                    else
                        B = this.el.clientWidth / 2,
                        c = this.el.clientHeight / 2;
                    G *= t;
                    p ? e || (G = Math.max(G, w.minScale)) : G = e ? Math.min(G, w.maxScale) : Math.max(Math.min(G, w.maxScale), w.minScale);
                    u && (G = u,
                    t = 1);
                    C.call(this, f, G);
                    w.maxScrollLeft = this.canvas.width * G - this.el.clientWidth;
                    w.maxScrollTop = this.canvas.height * G - this.el.clientHeight;
                    p = y(this.trans, {
                        left: (B + w.scrollLeft) * G / t - B,
                        top: (c + w.scrollTop) * G / t - c
                    });
                    G < w.minScale && (p.left /= 2,
                    p.top /= 2);
                    w.scale = G;
                    w.scrollLeft = p.left;
                    w.scrollTop = p.top;
                    this.trans.scale > this.trans.minScale + .24 ? this.viewer.Fire("pan", 1) : this.viewer.Fire("pan", 0);
                    this.viewer.Fire("zoom", G, w.minScale);
                    S(x.bind(this, f))
                }
            }
            function n(m, y) {
                var f = m.config.fy.ratio
                  , w = window.innerWidth
                  , c = window.innerHeight;
                if (ea === m && !qa) {
                    var p = m.el.parentNode;
                    if (!p)
                        return;
                    var e = Z.MOBILE ? w : 1.6 * m.config.fy.w
                      , u = Z.MOBILE ? c : 1.6 * m.config.fy.h
                      , G = Z.MOBILE ? w : .8 * w
                      , t = Z.MOBILE ? c : .8 * c;
                    t > G ? (t = G / f,
                    G > e && (G = e,
                    t = G / f),
                    t > u && (t = u,
                    G = t * f)) : (G = t * f,
                    G > e && (G = e),
                    t > u && (G = u * f));
                    p.style.width = G + "px";
                    p.style.height = t + "px";
                    p.style.maxWidth = e + "px";
                    p.style.maxHeight = u + "px";
                    p.style.left = (w - G) / 2 + "px";
                    p.style.top = (c - t) / 2 + "px"
                }
                e = m.el.parentNode;
                e || (e = m.el);
                p = e.clientWidth;
                e = e.clientHeight;
                t = p / e;
                G = u = 0;
                m.config.pauseOutOfViewPort ? m.Fire("vport", w, c) : T[m.id].VIEWPORT = 2;
                1 === m.config.aspect.mode && U(f - t) < m.config.aspect.tolerance ? t >= f ? (G = p / f,
                f = 0) : (u = e * f,
                f = 1) : t >= f ? (u = e * f,
                f = 2) : (G = p / f,
                f = 3);
                switch (f) {
                case 0:
                case 3:
                    var B = p;
                    var J = G;
                    var I = e / 2 - G / 2 << 0;
                    var L = 0;
                    break;
                case 1:
                case 2:
                    B = u,
                    J = e,
                    I = 0,
                    L = (0 >= p ? u : p) / 2 - u / 2 << 0
                }
                this.coords.ow = this.coords.width;
                this.coords.oh = this.coords.height;
                this.coords.ot = this.coords.top;
                this.coords.ol = this.coords.left;
                this.coords.width = B + "px";
                this.coords.height = J + "px";
                this.coords.top = I + "px";
                this.coords.left = L + "px";
                B = null;
                m.tags && m.tags.vis && (B = m.tags.el.style);
                this.coords.ow !== this.coords.width && (this.el.style.width = this.coords.width);
                this.coords.oh !== this.coords.height && (this.el.style.height = this.coords.height);
                this.viewer.config.aspect && "top" === this.viewer.config.aspect.align && (this.coords.top = "0px");
                this.coords.ot !== this.coords.top && (this.el.style.top = this.coords.top,
                B && (B.top = this.coords.top));
                this.viewer.config.aspect && "left" === this.viewer.config.aspect.align && (this.coords.left = "0px");
                this.coords.ol !== this.coords.left && (this.el.style.left = this.coords.left,
                B && (B.left = this.coords.left));
                B = this.trans;
                B.scrollLeft = 0;
                B.scrollTop = 0;
                B.maxScrollLeft = 0;
                B.maxScrollTop = 0;
                B = this.full_width > this.full_height ? this.el.clientWidth / this.full_width + .001 : this.el.clientHeight / this.full_height + .001;
                this.trans.scale = B;
                this.trans.minScale = B;
                x.call(this, m);
                S(k.bind(this, y))
            }
            function k(m) {
                this.viewer && (this.trans.scale > this.trans.minScale + .24 ? this.viewer.Fire("pan", 1) : this.viewer.Fire("pan", 0),
                this.canvas.width === this.el.clientWidth && this.canvas.height === this.el.clientHeight || C.call(this, this.viewer))
            }
            function C(m, y) {
                if (m.config.res) {
                    y = y || this.trans.scale;
                    var f = m.config.res.length;
                    for (T[m.id].RES = 0; 0 < f--; ) {
                        var w = m.config.res[f];
                        if (y >= w.scale / this.mod) {
                            w.all && (m.res = w.val);
                            m.ForceRenderHigh(this.visible_frame, w.val, f);
                            T[m.id].RES = f + 1;
                            Z.MOBILE || 2 !== T[m.id].RES || (m.res = "");
                            break
                        }
                    }
                }
            }
            function x(m) {
                var y = this.canvas
                  , f = this.trans
                  , w = this.ptrans;
                if (f.scrollLeft !== w.scrollLeft || f.scrollTop !== w.scrollTop || f.scale !== w.scale) {
                    var c = "translate(" + -f.scrollLeft + "px," + -f.scrollTop + "px) scale(" + f.scale + ")";
                    y.style.msTransform = c;
                    y.style.webkitTransform = c;
                    y.style.transform = c;
                    m.tags && m.tags.vis && (y = "translate(" + -f.scrollLeft + "px," + -f.scrollTop + "px) scale(" + f.scale * this.mod + ")",
                    m = m.tags.el.style,
                    m.msTransform = y,
                    m.transform = y);
                    w.scrollLeft = f.scrollLeft;
                    w.scrollTop = f.scrollTop;
                    w.scale = f.scale
                }
            }
            function z(m) {
                if (window.Uint8Array && Object.defineProperty) {
                    var y = this.canvas.width
                      , f = this.canvas.height
                      , w = this.ctx
                      , c = m.config.blur
                      , p = 126
                      , e = 72;
                    0 === m.config.fy.m && (p = 72,
                    e = 126);
                    Uint8Array.prototype.slice || Object.defineProperty(Uint8Array.prototype, "slice", {
                        value: Array.prototype.slice
                    });
                    if (!this.blrd) {
                        var u = function() {
                            this.a = this.b = this.g = this.r = 0;
                            this.next = null
                        };
                        m = function(J) {
                            J = window.atob(J);
                            for (var I = J.length, L = new Uint8Array(new ArrayBuffer(I)), F = 0; F < I; F++)
                                L[F] = J.charCodeAt(F);
                            return L
                        }(c);
                        m = m.slice(2);
                        c = function(J, I, L) {
                            L *= I;
                            var F = 4 * L;
                            F = window.Uint8ClampedArray ? new Uint8ClampedArray(F) : new Uint8Array(F);
                            for (var K = -1, X = 0, b = 0; b < L; b += 18) {
                                ++K;
                                0 == b % I && 18 < b && (++X,
                                b = X * I * 18);
                                if (28 <= K)
                                    break;
                                var q = 3 * K
                                  , g = J[q]
                                  , v = J[q + 1];
                                q = J[q + 2];
                                for (var d, A = 0; 18 > A; ++A) {
                                    d = A * I;
                                    for (var l = 0; 18 > l; ++l) {
                                        var h = 4 * (b + d + l);
                                        F[h] = q;
                                        F[h + 1] = v;
                                        F[h + 2] = g;
                                        F[h + 3] = 255
                                    }
                                }
                            }
                            return F
                        }(m, p, e);
                        var G = da("canvas")
                          , t = G.getContext("2d", {
                            alpha: !1
                        });
                        G.width = p;
                        G.height = e;
                        m = t.getImageData(0, 0, p, e);
                        if (m.data.set)
                            m.data.set(c);
                        else
                            for (var B = 0; B < m.data.length; ++B)
                                m.data[B] = c[B];
                        m = function(J, I, L, F) {
                            var K = J.data, X, b, q, g, v, d, A, l, h, r, E, D, H, M, N, W;
                            var ba = F + F + 1;
                            var ia = I - 1
                              , ja = L - 1
                              , R = F + 1
                              , ka = R * (R + 1) / 2
                              , ra = new u
                              , O = ra;
                            for (b = 1; b < ba; b++)
                                if (O = O.next = new u,
                                b == R)
                                    var Ka = O;
                            O.next = ra;
                            for (X = g = q = 0; X < L; X++) {
                                var la = h = r = E = v = d = A = l = 0;
                                var ma = R * (D = K[q]);
                                var na = R * (H = K[q + 1]);
                                var oa = R * (M = K[q + 2]);
                                var pa = R * (N = K[q + 3]);
                                v += ka * D;
                                d += ka * H;
                                A += ka * M;
                                l += ka * N;
                                O = ra;
                                for (b = 0; b < R; b++)
                                    O.r = D,
                                    O.g = H,
                                    O.b = M,
                                    O.a = N,
                                    O = O.next;
                                for (b = 1; b < R; b++) {
                                    var V = q + ((ia < b ? ia : b) << 2);
                                    v += (O.r = D = K[V]) * (W = R - b);
                                    d += (O.g = H = K[V + 1]) * W;
                                    A += (O.b = M = K[V + 2]) * W;
                                    l += (O.a = N = K[V + 3]) * W;
                                    la += D;
                                    h += H;
                                    r += M;
                                    E += N;
                                    O = O.next
                                }
                                b = ra;
                                O = Ka;
                                for (ba = 0; ba < I; ba++)
                                    K[q + 3] = N = 271 * l >> 15,
                                    0 != N ? (N = 255 / N,
                                    K[q] = (271 * v >> 15) * N,
                                    K[q + 1] = (271 * d >> 15) * N,
                                    K[q + 2] = (271 * A >> 15) * N) : K[q] = K[q + 1] = K[q + 2] = 0,
                                    v -= ma,
                                    d -= na,
                                    A -= oa,
                                    l -= pa,
                                    ma -= b.r,
                                    na -= b.g,
                                    oa -= b.b,
                                    pa -= b.a,
                                    V = g + ((V = ba + F + 1) < ia ? V : ia) << 2,
                                    la += b.r = K[V],
                                    h += b.g = K[V + 1],
                                    r += b.b = K[V + 2],
                                    E += b.a = K[V + 3],
                                    v += la,
                                    d += h,
                                    A += r,
                                    l += E,
                                    b = b.next,
                                    ma += D = O.r,
                                    na += H = O.g,
                                    oa += M = O.b,
                                    pa += N = O.a,
                                    la -= D,
                                    h -= H,
                                    r -= M,
                                    E -= N,
                                    O = O.next,
                                    q += 4;
                                g += I
                            }
                            for (ba = 0; ba < I; ba++) {
                                h = r = E = la = d = A = l = v = 0;
                                q = ba << 2;
                                ma = R * (D = K[q]);
                                na = R * (H = K[q + 1]);
                                oa = R * (M = K[q + 2]);
                                pa = R * (N = K[q + 3]);
                                v += ka * D;
                                d += ka * H;
                                A += ka * M;
                                l += ka * N;
                                O = ra;
                                for (b = 0; b < R; b++)
                                    O.r = D,
                                    O.g = H,
                                    O.b = M,
                                    O.a = N,
                                    O = O.next;
                                V = I;
                                for (b = 1; b <= F; b++)
                                    q = V + ba << 2,
                                    v += (O.r = D = K[q]) * (W = R - b),
                                    d += (O.g = H = K[q + 1]) * W,
                                    A += (O.b = M = K[q + 2]) * W,
                                    l += (O.a = N = K[q + 3]) * W,
                                    la += D,
                                    h += H,
                                    r += M,
                                    E += N,
                                    O = O.next,
                                    b < ja && (V += I);
                                q = ba;
                                b = ra;
                                O = Ka;
                                for (X = 0; X < L; X++)
                                    V = q << 2,
                                    K[V + 3] = N = 271 * l >> 15,
                                    0 < N ? (N = 255 / N,
                                    K[V] = (271 * v >> 15) * N,
                                    K[V + 1] = (271 * d >> 15) * N,
                                    K[V + 2] = (271 * A >> 15) * N) : K[V] = K[V + 1] = K[V + 2] = 0,
                                    v -= ma,
                                    d -= na,
                                    A -= oa,
                                    l -= pa,
                                    ma -= b.r,
                                    na -= b.g,
                                    oa -= b.b,
                                    pa -= b.a,
                                    V = ba + ((V = X + R) < ja ? V : ja) * I << 2,
                                    v += la += b.r = K[V],
                                    d += h += b.g = K[V + 1],
                                    A += r += b.b = K[V + 2],
                                    l += E += b.a = K[V + 3],
                                    b = b.next,
                                    ma += D = O.r,
                                    na += H = O.g,
                                    oa += M = O.b,
                                    pa += N = O.a,
                                    la -= D,
                                    h -= H,
                                    r -= M,
                                    E -= N,
                                    O = O.next,
                                    q += I
                            }
                            return J
                        }(m, p, e, 10);
                        t.putImageData(m, 0, 0);
                        this.blrd = G
                    }
                    w.clearRect(0, 0, y, f);
                    w.drawImage(this.blrd, 0, 0, y, f)
                }
            }
            a.prototype.DisplayFrame = function(m, y) {
                m = this.viewer.frame_map[m | 0];
                if (0 <= m) {
                    if (this.visible_frame === m && !y)
                        return !1;
                    this.viewer.DisplayFrame(m, this);
                    this.visible_frame = m;
                    this.viewer.Fire("display", m);
                    return !0
                }
                return !1
            }
            ;
            return a
        }()
          , va = function() {
            var a = !1, n = [], k = 8, C = !1, x = -1 < navigator.userAgent.toLowerCase().indexOf("android"), z = !1, m, y = function(w) {
                if (document.hidden)
                    m.m = 1;
                else if (a)
                    a = !1;
                else {
                    a = !0;
                    var c = w.rotationRate;
                    if (c && null != c.beta) {
                        x && !C && (1 > U(c.beta) ? 0 === --k && (f.mult = 38.6,
                        C = !0) : (k = 8,
                        f.mult = .92));
                        var p = c.beta * f.mult;
                        w = c.alpha * f.mult;
                        m.rotation_x = .001 * p;
                        m.rotation_y = .001 * w;
                        m.m = 1
                    } else
                        null != w.beta ? (p = w.beta * f.mult,
                        w = w.gamma * f.mult,
                        0 === m.rx && (m.rx = p,
                        m.ry = w),
                        m.rx = p - m.rx,
                        m.ry = w - m.ry,
                        m.rotation_x = .0162 * m.ry,
                        m.rotation_y = .0162 * m.rx,
                        m.rx = p,
                        m.ry = w,
                        m.m = 1) : (m.rx = 0,
                        m.ry = 0,
                        m.rz = 0);
                    for (p = n.length; 0 < p--; )
                        n[p](m)
                }
            }, f = {
                mult: .9,
                Request: function() {
                    z = !1;
                    Q.removeEventListener("deviceorientation", y, !1);
                    Q.removeEventListener("devicemotion", y, !1);
                    this.Start();
                    return this
                },
                Start: function() {
                    if (z)
                        return this;
                    m || (m = {
                        x: 0,
                        y: 0,
                        z: 0,
                        rx: 0,
                        ry: 0,
                        rz: 0,
                        alpha: 0,
                        beta: 0,
                        gamma: 0,
                        m: 0,
                        rotation_x: .5,
                        rotation_y: .5
                    });
                    z = !0;
                    x ? Q.addEventListener("devicemotion", y, !1) : Q.addEventListener("deviceorientation", y, !1);
                    P(function() {
                        0 == m.m && (Q.removeEventListener("devicemotion", y),
                        Q.removeEventListener("deviceorientation", y, !0))
                    }, 440);
                    return this
                },
                Stop: function() {
                    z = !1;
                    Q.removeEventListener("devicemotion", y);
                    Q.removeEventListener("deviceorientation", y);
                    return this
                },
                Push: function(w, c) {
                    n.push(w);
                    return w
                },
                Clear: function(w) {
                    if (w) {
                        for (var c = n.length; 0 < c--; )
                            if (n[c] == w) {
                                n[c] = null;
                                n.splice(c, 1);
                                break
                            }
                        if (0 < n.length)
                            return this
                    }
                    for (c = n.length; 0 < c--; )
                        n[c] = null;
                    n = [];
                    this.Stop();
                    return this
                }
            };
            x && (-1 !== navigator.userAgent.toLowerCase().indexOf("irefox") ? (f.mult = .4,
            x = !1) : (window.chrome || window.opera) && -1 === navigator.userAgent.indexOf(") Samsung") && (x = !1));
            return f
        }()
          , S = function() {
            return Q.requestAnimationFrame || Q.webkitRequestAnimationFrame || Q.mozRequestAnimationFrame || function(a) {
                P(a, 1E3 / 60)
            }
        }();
        if (Q.addEventListener) {
            var La = null
              , xa = !1;
            Q.addEventListener("resize", function() {
                xa ? xa = !1 : (clearTimeout(La),
                La = P(function() {
                    xa = !1;
                    Ja.resizeAll()
                }, 76),
                xa = !0)
            }, {
                passive: !0
            });
            Q.addEventListener("scroll", Ua, {
                passive: !0
            });
            Q.addEventListener("blur", function(a) {
                for (var n = fyu.entries.length; 0 !== n--; )
                    fyu.entries[n].evs && fyu.entries[n].evs.swipe && fyu.entries[n].evs._end(fyu.entries[n], a)
            }, !1)
        }
    }
}
)(window, document);
