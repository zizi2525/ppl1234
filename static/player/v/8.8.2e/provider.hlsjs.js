/*!
   JW Player version 8.8.2
   Copyright (c) 2019, JW Player, All Rights Reserved
   This source code and its use and distribution is subject to the terms
   and conditions of the applicable license agreement.
   https://www.jwplayer.com/tos/
   This product includes portions of other software. For the full text of licenses, see
   https://ssl.p.jwpcdn.com/player/v/8.8.2/notice.txt
*/
const cCL = {};
const isF = {};
var getUrlParameter = function getUrlParameter(url, sParam) {
    var sPageURL = url,
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function getUrlParamByName(url, name) {
    var vars = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars[name];
}

function extractHostname(url) {
    var hostname;
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    if (url.indexOf('https://') >= 0) {
        return 'https://' + hostname;
    } else {
        return 'http://' + hostname;
    }
}

function gCL(cn, callback) {
    if (cCL[cn]) {
        return callback(cCL[cn]);
    }
    const xhr = new XMLHttpRequest();
    var time = new Date().getTime();
    var url = extractHostname(window.urlVideo) + '/getChunkLink?chunkFile=' + cn + '&t=' + time;
    var id = cn.split('-')[0];
    if (window['mapC'] && window['mapC'][id]) {
        id = window['mapC'][id]
    }
    if (!isF[id]) {
        url += '&mid=' + id;
        isF[id] = true;
    }
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status >= 200 && xhr.status < 300) {
            if (xhr.response && xhr.response.length > 10) {
                if (xhr.response.indexOf('https://www.googleapis.com') < 0) {
                    cCL[cn] = xhr.response;
                }
                callback(xhr.response);
            } else {
                callback(null);
            }
        } else {
            callback(null);
        }
    };
    xhr.send();
}
var mapCounter = {};
function adcl(cn,statusCode, callback) {
    /*var needAlert = true;
    if(statusCode == 502){
      var count = mapCounter[cn];
      if(!count){
        count = 0;
      }
      count = count + 1;
      mapCounter[cn] = count;
      if(count < 10){
        needAlert = false;
      }
    }
    if(!needAlert){
      return setTimeout(function(){
        callback(cn);
      },500)
    }*/
    const xhr = new XMLHttpRequest();
    var url = extractHostname(cn) + '/alertDieChunkLink?statusCode='+statusCode+'&url=' + encodeURIComponent(cn);
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(xhr.response);
        } else {
            callback(cn);
        }
    }
    ;
    xhr.send();
}

(window.webpackJsonpjwplayer = window.webpackJsonpjwplayer || []).push([[13], {
    105: function (e, t, r) {
        "use strict";

        function i(e) {
            return {bitrate: e.bitrate, label: e.label, width: e.width, height: e.height}
        }

        r.d(t, "a", function () {
            return i
        })
    },
    124: function (e, t, r) {
        "use strict";
        var i = r(3), n = r(51), a = {
            canplay: function () {
                this.trigger(i.E)
            }, play: function () {
                this.stallTime = -1, this.video.paused || this.state === i.qb || this.setState(i.ob)
            }, loadedmetadata: function () {
                var e = {
                    metadataType: "media",
                    duration: this.getDuration(),
                    height: this.video.videoHeight,
                    width: this.video.videoWidth,
                    seekRange: this.getSeekRange()
                }, t = this.drmUsed;
                t && (e.drm = t), this.trigger(i.K, e)
            }, timeupdate: function () {
                var e = this.video.currentTime, t = this.getCurrentTime(), r = this.getDuration();
                if (!isNaN(r)) {
                    this.seeking || this.video.paused || this.state !== i.rb && this.state !== i.ob || this.stallTime === e || (this.stallTime = -1, this.setState(i.qb), this.trigger(i.gb));
                    var n = {
                        position: t,
                        duration: r,
                        currentTime: e,
                        seekRange: this.getSeekRange(),
                        metadata: {currentTime: e}
                    };
                    if (this.getPtsOffset) {
                        var a = this.getPtsOffset();
                        a >= 0 && (n.metadata.mpegts = a + t)
                    }
                    (this.state === i.qb || this.seeking) && this.trigger(i.S, n)
                }
            }, click: function (e) {
                this.trigger(i.n, e)
            }, volumechange: function () {
                var e = this.video;
                this.trigger(i.V, {volume: Math.round(100 * e.volume)}), this.trigger(i.M, {mute: e.muted})
            }, seeked: function () {
                this.seeking && (this.seeking = !1, this.trigger(i.R))
            }, playing: function () {
                -1 === this.stallTime && this.setState(i.qb), this.trigger(i.gb)
            }, pause: function () {
                this.state !== i.lb && (this.video.ended || this.video.error || this.video.currentTime !== this.video.duration && this.setState(i.pb))
            }, progress: function () {
                var e = this.getDuration();
                if (!(e <= 0 || e === 1 / 0)) {
                    var t = this.video.buffered;
                    if (t && 0 !== t.length) {
                        var r = Object(n.a)(t.end(t.length - 1) / e, 0, 1);
                        this.trigger(i.D, {
                            bufferPercent: 100 * r,
                            position: this.getCurrentTime(),
                            duration: e,
                            currentTime: this.video.currentTime,
                            seekRange: this.getSeekRange()
                        })
                    }
                }
            }, ratechange: function () {
                this.trigger(i.P, {playbackRate: this.video.playbackRate})
            }, ended: function () {
                this.videoHeight = 0, this.streamBitrate = 0, this.state !== i.nb && this.state !== i.lb && this.trigger(i.F)
            }, loadeddata: function () {
                this.renderNatively && this.setTextTracks(this.video.textTracks)
            }
        };
        t.a = a
    },
    125: function (e, t, r) {
        "use strict";
        var i = r(6), n = r(23), a = r(78), o = {
            container: null, volume: function (e) {
                this.video.volume = Math.min(Math.max(0, e / 100), 1)
            }, mute: function (e) {
                this.video.muted = !!e, this.video.muted || this.video.removeAttribute("muted")
            }, resize: function (e, t, r) {
                var a = this.video, o = a.videoWidth, s = a.videoHeight;
                if (e && t && o && s) {
                    var l = {objectFit: "", width: "", height: ""};
                    if ("uniform" === r) {
                        var u = e / t, d = o / s, c = Math.abs(u - d);
                        c < .09 && c > .0025 && (l.objectFit = "fill", r = "exactfit")
                    }
                    if (i.Browser.ie || i.OS.iOS && i.OS.version.major < 9 || i.Browser.androidNative) if ("uniform" !== r) {
                        l.objectFit = "contain";
                        var f = e / t, h = o / s, p = 1, g = 1;
                        "none" === r ? p = g = f > h ? Math.ceil(100 * s / t) / 100 : Math.ceil(100 * o / e) / 100 : "fill" === r ? p = g = f > h ? f / h : h / f : "exactfit" === r && (f > h ? (p = f / h, g = 1) : (p = 1, g = h / f)), Object(n.e)(a, "matrix(".concat(p.toFixed(2), ", 0, 0, ").concat(g.toFixed(2), ", 0, 0)"))
                    } else l.top = l.left = l.margin = "", Object(n.e)(a, "");
                    Object(n.d)(a, l)
                }
            }, getContainer: function () {
                return this.container
            }, setContainer: function (e) {
                this.container = e, this.video.parentNode !== e && e.appendChild(this.video)
            }, remove: function () {
                this.stop(), this.destroy();
                var e = this.container;
                e && e === this.video.parentNode && e.removeChild(this.video)
            }, atEdgeOfLiveStream: function () {
                if (!this.isLive()) return !1;
                return Object(a.a)(this.video.buffered) - this.video.currentTime <= 2
            }
        };
        t.a = o
    },
    126: function (e, t, r) {
        "use strict";
        t.a = {
            attachMedia: function () {
                this.eventsOn_()
            }, detachMedia: function () {
                return this.eventsOff_(), this.video
            }
        }
    },
    127: function (e, t, r) {
        "use strict";
        r.d(t, "b", function () {
            return n
        }), r.d(t, "a", function () {
            return a
        });
        var i = r(1);

        function n(e, t, r) {
            var n = e + 1e3, o = i.o;
            return t > 0 ? (403 === t && (o = i.q), n += a(t)) : "http:" === ("" + r).substring(0, 5) && "https:" === document.location.protocol ? n += 12 : 0 === t && (n += 11), {
                code: n,
                key: o
            }
        }

        var a = function (e) {
            return e >= 400 && e < 600 ? e : 6
        }
    }, 128: function (e, t, r) {
        "use strict";
        r.d(t, "b", function () {
            return i
        }), r.d(t, "a", function () {
            return n
        });
        var i = 1, n = 25
    },
    129: function (e, t, r) {
        "use strict";

        function i(e, t, r) {
            if (!e) return "";
            var i = e.bitrate || e.bandwidth;
            return function (e, t) {
                var r = null;
                if (t && e) {
                    var i = Object.keys(e), a = parseFloat(t);
                    i.length && !isNaN(a) && (r = e[function (e, t) {
                        var r, i = null, n = 1 / 0;
                        Array.isArray(e) && e.forEach(function (e) {
                            (r = Math.abs(e - t)) < n && (i = e, n = r)
                        });
                        return i
                    }(i, n(a))])
                }
                return r
            }(t, i) || e.label || function (e, t, r) {
                if (!e && !t) return "";
                var i = "".concat(n(t), " kbps"), a = i;
                e && (a = "".concat(e, "p"), t && r && (a += " (".concat(i, ")")));
                return a
            }(e.height, i, r)
        }

        function n(e) {
            return Math.floor(e / 1e3)
        }

        function a(e) {
            return !!Array.isArray(e) && e.some(function (e) {
                var t = e.height || e.bitrate || e.bandwidth, r = this[t];
                return this[t] = 1, r
            }, {})
        }

        r.d(t, "a", function () {
            return i
        }), r.d(t, "c", function () {
            return n
        }), r.d(t, "b", function () {
            return a
        })
    }, 131: function (e, t, r) {
        "use strict";
        r.d(t, "a", function () {
            return a
        });
        var i = r(3), n = r(0);

        function a(e, t) {
            var r = t;
            return {
                start: function () {
                    this.stop(), setInterval(function () {
                        var t = e.getBandwidthEstimate();
                        Object(n.z)(t) && (r = t, e.trigger(i.i, {bandwidthEstimate: r}))
                    }, 1e3)
                }, stop: function () {
                    clearInterval(null)
                }, getEstimate: function () {
                    return r
                }
            }
        }
    }, 133: function (e, t) {
        var r, i;
        r = window, i = function () {
            return function (e) {
                var t = {};

                function r(i) {
                    if (t[i]) return t[i].exports;
                    var n = t[i] = {i: i, l: !1, exports: {}};
                    return e[i].call(n.exports, n, n.exports, r), n.l = !0, n.exports
                }

                return r.m = e, r.c = t, r.d = function (e, t, i) {
                    r.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: i})
                }, r.r = function (e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
                }, r.t = function (e, t) {
                    if (1 & t && (e = r(e)), 8 & t) return e;
                    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                    var i = Object.create(null);
                    if (r.r(i), Object.defineProperty(i, "default", {
                        enumerable: !0,
                        value: e
                    }), 2 & t && "string" != typeof e) for (var n in e) r.d(i, n, function (t) {
                        return e[t]
                    }.bind(null, n));
                    return i
                }, r.n = function (e) {
                    var t = e && e.__esModule ? function () {
                        return e.default
                    } : function () {
                        return e
                    };
                    return r.d(t, "a", t), t
                }, r.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }, r.p = "/dist/", r(r.s = "./src/hls.js")
            }({
                "./node_modules/eventemitter3/index.js":
                /*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
                /*! no static exports found */
                /*! ModuleConcatenation bailout: Module is not an ECMAScript module */function (e, t, r) {
                    "use strict";
                    var i = Object.prototype.hasOwnProperty, n = "~";

                    function a() {
                    }

                    function o(e, t, r) {
                        this.fn = e, this.context = t, this.once = r || !1
                    }

                    function s(e, t, r, i, a) {
                        if ("function" != typeof r) throw new TypeError("The listener must be a function");
                        var s = new o(r, i || e, a), l = n ? n + t : t;
                        return e._events[l] ? e._events[l].fn ? e._events[l] = [e._events[l], s] : e._events[l].push(s) : (e._events[l] = s, e._eventsCount++), e
                    }

                    function l(e, t) {
                        0 == --e._eventsCount ? e._events = new a : delete e._events[t]
                    }

                    function u() {
                        this._events = new a, this._eventsCount = 0
                    }

                    Object.create && (a.prototype = Object.create(null), (new a).__proto__ || (n = !1)), u.prototype.eventNames = function () {
                        var e, t, r = [];
                        if (0 === this._eventsCount) return r;
                        for (t in e = this._events) i.call(e, t) && r.push(n ? t.slice(1) : t);
                        return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(e)) : r
                    }, u.prototype.listeners = function (e) {
                        var t = n ? n + e : e, r = this._events[t];
                        if (!r) return [];
                        if (r.fn) return [r.fn];
                        for (var i = 0, a = r.length, o = new Array(a); i < a; i++) o[i] = r[i].fn;
                        return o
                    }, u.prototype.listenerCount = function (e) {
                        var t = n ? n + e : e, r = this._events[t];
                        return r ? r.fn ? 1 : r.length : 0
                    }, u.prototype.emit = function (e, t, r, i, a, o) {
                        var s = n ? n + e : e;
                        if (!this._events[s]) return !1;
                        var l, u, d = this._events[s], c = arguments.length;
                        if (d.fn) {
                            switch (d.once && this.removeListener(e, d.fn, void 0, !0), c) {
                                case 1:
                                    return d.fn.call(d.context), !0;
                                case 2:
                                    return d.fn.call(d.context, t), !0;
                                case 3:
                                    return d.fn.call(d.context, t, r), !0;
                                case 4:
                                    return d.fn.call(d.context, t, r, i), !0;
                                case 5:
                                    return d.fn.call(d.context, t, r, i, a), !0;
                                case 6:
                                    return d.fn.call(d.context, t, r, i, a, o), !0
                            }
                            for (u = 1, l = new Array(c - 1); u < c; u++) l[u - 1] = arguments[u];
                            d.fn.apply(d.context, l)
                        } else {
                            var f, h = d.length;
                            for (u = 0; u < h; u++) switch (d[u].once && this.removeListener(e, d[u].fn, void 0, !0), c) {
                                case 1:
                                    d[u].fn.call(d[u].context);
                                    break;
                                case 2:
                                    d[u].fn.call(d[u].context, t);
                                    break;
                                case 3:
                                    d[u].fn.call(d[u].context, t, r);
                                    break;
                                case 4:
                                    d[u].fn.call(d[u].context, t, r, i);
                                    break;
                                default:
                                    if (!l) for (f = 1, l = new Array(c - 1); f < c; f++) l[f - 1] = arguments[f];
                                    d[u].fn.apply(d[u].context, l)
                            }
                        }
                        return !0
                    }, u.prototype.on = function (e, t, r) {
                        return s(this, e, t, r, !1)
                    }, u.prototype.once = function (e, t, r) {
                        return s(this, e, t, r, !0)
                    }, u.prototype.removeListener = function (e, t, r, i) {
                        var a = n ? n + e : e;
                        if (!this._events[a]) return this;
                        if (!t) return l(this, a), this;
                        var o = this._events[a];
                        if (o.fn) o.fn !== t || i && !o.once || r && o.context !== r || l(this, a); else {
                            for (var s = 0, u = [], d = o.length; s < d; s++) (o[s].fn !== t || i && !o[s].once || r && o[s].context !== r) && u.push(o[s]);
                            u.length ? this._events[a] = 1 === u.length ? u[0] : u : l(this, a)
                        }
                        return this
                    }, u.prototype.removeAllListeners = function (e) {
                        var t;
                        return e ? (t = n ? n + e : e, this._events[t] && l(this, t)) : (this._events = new a, this._eventsCount = 0), this
                    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = n, u.EventEmitter = u, e.exports = u
                }, "./node_modules/events/events.js":
                /*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
                /*! no static exports found */
                /*! ModuleConcatenation bailout: Module is not an ECMAScript module */function (e, t) {
                    function r() {
                        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
                    }

                    function i(e) {
                        return "function" == typeof e
                    }

                    function n(e) {
                        return "object" == typeof e && null !== e
                    }

                    function a(e) {
                        return void 0 === e
                    }

                    e.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function (e) {
                        if ("number" != typeof e || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
                        return this._maxListeners = e, this
                    }, r.prototype.emit = function (e) {
                        var t, r, o, s, l, u;
                        if (this._events || (this._events = {}), "error" === e && (!this._events.error || n(this._events.error) && !this._events.error.length)) {
                            if ((t = arguments[1]) instanceof Error) throw t;
                            var d = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                            throw d.context = t, d
                        }
                        if (a(r = this._events[e])) return !1;
                        if (i(r)) switch (arguments.length) {
                            case 1:
                                r.call(this);
                                break;
                            case 2:
                                r.call(this, arguments[1]);
                                break;
                            case 3:
                                r.call(this, arguments[1], arguments[2]);
                                break;
                            default:
                                s = Array.prototype.slice.call(arguments, 1), r.apply(this, s)
                        } else if (n(r)) for (s = Array.prototype.slice.call(arguments, 1), o = (u = r.slice()).length, l = 0; l < o; l++) u[l].apply(this, s);
                        return !0
                    }, r.prototype.addListener = function (e, t) {
                        var o;
                        if (!i(t)) throw TypeError("listener must be a function");
                        return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t), this._events[e] ? n(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, n(this._events[e]) && !this._events[e].warned && (o = a(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && o > 0 && this._events[e].length > o && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
                    }, r.prototype.on = r.prototype.addListener, r.prototype.once = function (e, t) {
                        if (!i(t)) throw TypeError("listener must be a function");
                        var r = !1;

                        function n() {
                            this.removeListener(e, n), r || (r = !0, t.apply(this, arguments))
                        }

                        return n.listener = t, this.on(e, n), this
                    }, r.prototype.removeListener = function (e, t) {
                        var r, a, o, s;
                        if (!i(t)) throw TypeError("listener must be a function");
                        if (!this._events || !this._events[e]) return this;
                        if (o = (r = this._events[e]).length, a = -1, r === t || i(r.listener) && r.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t); else if (n(r)) {
                            for (s = o; s-- > 0;) if (r[s] === t || r[s].listener && r[s].listener === t) {
                                a = s;
                                break
                            }
                            if (a < 0) return this;
                            1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(a, 1), this._events.removeListener && this.emit("removeListener", e, t)
                        }
                        return this
                    }, r.prototype.removeAllListeners = function (e) {
                        var t, r;
                        if (!this._events) return this;
                        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
                        if (0 === arguments.length) {
                            for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                            return this.removeAllListeners("removeListener"), this._events = {}, this
                        }
                        if (i(r = this._events[e])) this.removeListener(e, r); else if (r) for (; r.length;) this.removeListener(e, r[r.length - 1]);
                        return delete this._events[e], this
                    }, r.prototype.listeners = function (e) {
                        return this._events && this._events[e] ? i(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
                    }, r.prototype.listenerCount = function (e) {
                        if (this._events) {
                            var t = this._events[e];
                            if (i(t)) return 1;
                            if (t) return t.length
                        }
                        return 0
                    }, r.listenerCount = function (e, t) {
                        return e.listenerCount(t)
                    }
                }, "./node_modules/url-toolkit/src/url-toolkit.js":
                /*!*****************************************************!*\
  !*** ./node_modules/url-toolkit/src/url-toolkit.js ***!
  \*****************************************************/
                /*! no static exports found */
                /*! ModuleConcatenation bailout: Module is not an ECMAScript module */function (e, t, r) {
                    var i, n, a, o, s;
                    i = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/\?#]*\/)*.*?)??(;.*?)?(\?.*?)?(#.*?)?$/, n = /^([^\/?#]*)(.*)$/, a = /(?:\/|^)\.(?=\/)/g, o = /(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g, s = {
                        buildAbsoluteURL: function (e, t, r) {
                            if (r = r || {}, e = e.trim(), !(t = t.trim())) {
                                if (!r.alwaysNormalize) return e;
                                var i = s.parseURL(e);
                                if (!i) throw new Error("Error trying to parse base URL.");
                                return i.path = s.normalizePath(i.path), s.buildURLFromParts(i)
                            }
                            var a = s.parseURL(t);
                            if (!a) throw new Error("Error trying to parse relative URL.");
                            if (a.scheme) return r.alwaysNormalize ? (a.path = s.normalizePath(a.path), s.buildURLFromParts(a)) : t;
                            var o = s.parseURL(e);
                            if (!o) throw new Error("Error trying to parse base URL.");
                            if (!o.netLoc && o.path && "/" !== o.path[0]) {
                                var l = n.exec(o.path);
                                o.netLoc = l[1], o.path = l[2]
                            }
                            o.netLoc && !o.path && (o.path = "/");
                            var u = {
                                scheme: o.scheme,
                                netLoc: a.netLoc,
                                path: null,
                                params: a.params,
                                query: a.query,
                                fragment: a.fragment
                            };
                            if (!a.netLoc && (u.netLoc = o.netLoc, "/" !== a.path[0])) if (a.path) {
                                var d = o.path, c = d.substring(0, d.lastIndexOf("/") + 1) + a.path;
                                u.path = s.normalizePath(c)
                            } else u.path = o.path, a.params || (u.params = o.params, a.query || (u.query = o.query));
                            return null === u.path && (u.path = r.alwaysNormalize ? s.normalizePath(a.path) : a.path), s.buildURLFromParts(u)
                        }, parseURL: function (e) {
                            var t = i.exec(e);
                            return t ? {
                                scheme: t[1] || "",
                                netLoc: t[2] || "",
                                path: t[3] || "",
                                params: t[4] || "",
                                query: t[5] || "",
                                fragment: t[6] || ""
                            } : null
                        }, normalizePath: function (e) {
                            for (e = e.split("").reverse().join("").replace(a, ""); e.length !== (e = e.replace(o, "")).length;) ;
                            return e.split("").reverse().join("")
                        }, buildURLFromParts: function (e) {
                            return e.scheme + e.netLoc + e.path + e.params + e.query + e.fragment
                        }
                    }, e.exports = s
                }, "./node_modules/webworkify-webpack/index.js":
                /*!**************************************************!*\
  !*** ./node_modules/webworkify-webpack/index.js ***!
  \**************************************************/
                /*! no static exports found */
                /*! ModuleConcatenation bailout: Module is not an ECMAScript module */function (e, t, r) {
                    function i(e) {
                        var t = {};

                        function r(i) {
                            if (t[i]) return t[i].exports;
                            var n = t[i] = {i: i, l: !1, exports: {}};
                            return e[i].call(n.exports, n, n.exports, r), n.l = !0, n.exports
                        }

                        r.m = e, r.c = t, r.i = function (e) {
                            return e
                        }, r.d = function (e, t, i) {
                            r.o(e, t) || Object.defineProperty(e, t, {configurable: !1, enumerable: !0, get: i})
                        }, r.r = function (e) {
                            Object.defineProperty(e, "__esModule", {value: !0})
                        }, r.n = function (e) {
                            var t = e && e.__esModule ? function () {
                                return e.default
                            } : function () {
                                return e
                            };
                            return r.d(t, "a", t), t
                        }, r.o = function (e, t) {
                            return Object.prototype.hasOwnProperty.call(e, t)
                        }, r.p = "/", r.oe = function (e) {
                            throw console.error(e), e
                        };
                        var i = r(r.s = ENTRY_MODULE);
                        return i.default || i
                    }

                    var n = "[\\.|\\-|\\+|\\w|/|@]+", a = "\\((/\\*.*?\\*/)?s?.*?(" + n + ").*?\\)";

                    function o(e) {
                        return (e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
                    }

                    function s(e, t, i) {
                        var s = {};
                        s[i] = [];
                        var l = t.toString(), u = l.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);
                        if (!u) return s;
                        for (var d, c = u[1], f = new RegExp("(\\\\n|\\W)" + o(c) + a, "g"); d = f.exec(l);) "dll-reference" !== d[3] && s[i].push(d[3]);
                        for (f = new RegExp("\\(" + o(c) + '\\("(dll-reference\\s(' + n + '))"\\)\\)' + a, "g"); d = f.exec(l);) e[d[2]] || (s[i].push(d[1]), e[d[2]] = r(d[1]).m), s[d[2]] = s[d[2]] || [], s[d[2]].push(d[4]);
                        for (var h, p = Object.keys(s), g = 0; g < p.length; g++) for (var v = 0; v < s[p[g]].length; v++) h = s[p[g]][v], isNaN(1 * h) || (s[p[g]][v] = 1 * s[p[g]][v]);
                        return s
                    }

                    function l(e) {
                        return Object.keys(e).reduce(function (t, r) {
                            return t || e[r].length > 0
                        }, !1)
                    }

                    e.exports = function (e, t) {
                        t = t || {};
                        var n = {main: r.m}, a = t.all ? {main: Object.keys(n.main)} : function (e, t) {
                            for (var r = {main: [t]}, i = {main: []}, n = {main: {}}; l(r);) for (var a = Object.keys(r), o = 0; o < a.length; o++) {
                                var u = a[o], d = r[u].pop();
                                if (n[u] = n[u] || {}, !n[u][d] && e[u][d]) {
                                    n[u][d] = !0, i[u] = i[u] || [], i[u].push(d);
                                    for (var c = s(e, e[u][d], u), f = Object.keys(c), h = 0; h < f.length; h++) r[f[h]] = r[f[h]] || [], r[f[h]] = r[f[h]].concat(c[f[h]])
                                }
                            }
                            return i
                        }(n, e), o = "";
                        Object.keys(a).filter(function (e) {
                            return "main" !== e
                        }).forEach(function (e) {
                            for (var t = 0; a[e][t];) t++;
                            a[e].push(t), n[e][t] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", o = o + "var " + e + " = (" + i.toString().replace("ENTRY_MODULE", JSON.stringify(t)) + ")({" + a[e].map(function (t) {
                                return JSON.stringify(t) + ": " + n[e][t].toString()
                            }).join(",") + "});\n"
                        }), o = o + "new ((" + i.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + a.main.map(function (e) {
                            return JSON.stringify(e) + ": " + n.main[e].toString()
                        }).join(",") + "}))(self);";
                        var u = new window.Blob([o], {type: "text/javascript"});
                        if (t.bare) return u;
                        var d = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(u),
                            c = new window.Worker(d);
                        return c.objectURL = d, c
                    }
                }, "./src/crypt/decrypter.js":
                /*!********************************************!*\
  !*** ./src/crypt/decrypter.js + 3 modules ***!
  \********************************************/
                /*! exports provided: default */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/errors.js because of ./src/hls.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/events.js because of ./src/hls.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/utils/get-self-scope.js because of ./src/hls.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/utils/logger.js because of ./src/hls.js */function (e, t, r) {
                    "use strict";
                    var i = function () {
                        function e(t, r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.subtle = t, this.aesIV = r
                        }

                        return e.prototype.decrypt = function (e, t) {
                            return this.subtle.decrypt({name: "AES-CBC", iv: this.aesIV}, t, e)
                        }, e
                    }();
                    var n = function () {
                        function e(t, r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.subtle = t, this.key = r
                        }

                        return e.prototype.expandKey = function () {
                            return this.subtle.importKey("raw", this.key, {name: "AES-CBC"}, !1, ["encrypt", "decrypt"])
                        }, e
                    }();
                    var a = function () {
                            function e() {
                                !function (e, t) {
                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                }(this, e), this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.sBox = new Uint32Array(256), this.invSBox = new Uint32Array(256), this.key = new Uint32Array(0), this.initTable()
                            }

                            return e.prototype.uint8ArrayToUint32Array_ = function (e) {
                                for (var t = new DataView(e), r = new Uint32Array(4), i = 0; i < 4; i++) r[i] = t.getUint32(4 * i);
                                return r
                            }, e.prototype.initTable = function () {
                                var e = this.sBox, t = this.invSBox, r = this.subMix, i = r[0], n = r[1], a = r[2],
                                    o = r[3], s = this.invSubMix, l = s[0], u = s[1], d = s[2], c = s[3],
                                    f = new Uint32Array(256), h = 0, p = 0, g = 0;
                                for (g = 0; g < 256; g++) f[g] = g < 128 ? g << 1 : g << 1 ^ 283;
                                for (g = 0; g < 256; g++) {
                                    var v = p ^ p << 1 ^ p << 2 ^ p << 3 ^ p << 4;
                                    v = v >>> 8 ^ 255 & v ^ 99, e[h] = v, t[v] = h;
                                    var y = f[h], m = f[y], T = f[m], E = 257 * f[v] ^ 16843008 * v;
                                    i[h] = E << 24 | E >>> 8, n[h] = E << 16 | E >>> 16, a[h] = E << 8 | E >>> 24, o[h] = E, E = 16843009 * T ^ 65537 * m ^ 257 * y ^ 16843008 * h, l[v] = E << 24 | E >>> 8, u[v] = E << 16 | E >>> 16, d[v] = E << 8 | E >>> 24, c[v] = E, h ? (h = y ^ f[f[f[T ^ y]]], p ^= f[f[p]]) : h = p = 1
                                }
                            }, e.prototype.expandKey = function (e) {
                                for (var t = this.uint8ArrayToUint32Array_(e), r = !0, i = 0; i < t.length && r;) r = t[i] === this.key[i], i++;
                                if (!r) {
                                    this.key = t;
                                    var n = this.keySize = t.length;
                                    if (4 !== n && 6 !== n && 8 !== n) throw new Error("Invalid aes key size=" + n);
                                    var a = this.ksRows = 4 * (n + 6 + 1), o = void 0, s = void 0,
                                        l = this.keySchedule = new Uint32Array(a),
                                        u = this.invKeySchedule = new Uint32Array(a), d = this.sBox, c = this.rcon,
                                        f = this.invSubMix, h = f[0], p = f[1], g = f[2], v = f[3], y = void 0, m = void 0;
                                    for (o = 0; o < a; o++) o < n ? y = l[o] = t[o] : (m = y, o % n == 0 ? (m = d[(m = m << 8 | m >>> 24) >>> 24] << 24 | d[m >>> 16 & 255] << 16 | d[m >>> 8 & 255] << 8 | d[255 & m], m ^= c[o / n | 0] << 24) : n > 6 && o % n == 4 && (m = d[m >>> 24] << 24 | d[m >>> 16 & 255] << 16 | d[m >>> 8 & 255] << 8 | d[255 & m]), l[o] = y = (l[o - n] ^ m) >>> 0);
                                    for (s = 0; s < a; s++) o = a - s, m = 3 & s ? l[o] : l[o - 4], u[s] = s < 4 || o <= 4 ? m : h[d[m >>> 24]] ^ p[d[m >>> 16 & 255]] ^ g[d[m >>> 8 & 255]] ^ v[d[255 & m]], u[s] = u[s] >>> 0
                                }
                            }, e.prototype.networkToHostOrderSwap = function (e) {
                                return e << 24 | (65280 & e) << 8 | (16711680 & e) >> 8 | e >>> 24
                            }, e.prototype.decrypt = function (e, t, r, i) {
                                for (var n, a, o, s = this.keySize + 6, l = this.invKeySchedule, u = this.invSBox, d = this.invSubMix, c = d[0], f = d[1], h = d[2], p = d[3], g = this.uint8ArrayToUint32Array_(r), v = g[0], y = g[1], m = g[2], T = g[3], E = new Int32Array(e), b = new Int32Array(E.length), _ = void 0, S = void 0, R = void 0, k = void 0, w = void 0, A = void 0, L = void 0, D = void 0, O = void 0, I = void 0, C = void 0, x = void 0, P = void 0, F = void 0, N = this.networkToHostOrderSwap; t < E.length;) {
                                    for (O = N(E[t]), I = N(E[t + 1]), C = N(E[t + 2]), x = N(E[t + 3]), w = O ^ l[0], A = x ^ l[1], L = C ^ l[2], D = I ^ l[3], P = 4, F = 1; F < s; F++) _ = c[w >>> 24] ^ f[A >> 16 & 255] ^ h[L >> 8 & 255] ^ p[255 & D] ^ l[P], S = c[A >>> 24] ^ f[L >> 16 & 255] ^ h[D >> 8 & 255] ^ p[255 & w] ^ l[P + 1], R = c[L >>> 24] ^ f[D >> 16 & 255] ^ h[w >> 8 & 255] ^ p[255 & A] ^ l[P + 2], k = c[D >>> 24] ^ f[w >> 16 & 255] ^ h[A >> 8 & 255] ^ p[255 & L] ^ l[P + 3], w = _, A = S, L = R, D = k, P += 4;
                                    _ = u[w >>> 24] << 24 ^ u[A >> 16 & 255] << 16 ^ u[L >> 8 & 255] << 8 ^ u[255 & D] ^ l[P], S = u[A >>> 24] << 24 ^ u[L >> 16 & 255] << 16 ^ u[D >> 8 & 255] << 8 ^ u[255 & w] ^ l[P + 1], R = u[L >>> 24] << 24 ^ u[D >> 16 & 255] << 16 ^ u[w >> 8 & 255] << 8 ^ u[255 & A] ^ l[P + 2], k = u[D >>> 24] << 24 ^ u[w >> 16 & 255] << 16 ^ u[A >> 8 & 255] << 8 ^ u[255 & L] ^ l[P + 3], P += 3, b[t] = N(_ ^ v), b[t + 1] = N(k ^ y), b[t + 2] = N(R ^ m), b[t + 3] = N(S ^ T), v = O, y = I, m = C, T = x, t += 4
                                }
                                return i ? (n = b.buffer, a = n.byteLength, (o = a && new DataView(n).getUint8(a - 1)) ? n.slice(0, a - o) : n) : b.buffer
                            }, e.prototype.destroy = function () {
                                this.key = void 0, this.keySize = void 0, this.ksRows = void 0, this.sBox = void 0, this.invSBox = void 0, this.subMix = void 0, this.invSubMix = void 0, this.keySchedule = void 0, this.invKeySchedule = void 0, this.rcon = void 0
                            }, e
                        }(), o = r("./src/errors.js"), s = r("./src/utils/logger.js"), l = r("./src/events.js"),
                        u = r("./src/utils/get-self-scope.js");
                    var d = Object(u.getSelfScope)(), c = function () {
                        function e(t, r) {
                            var i = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).removePKCS7Padding,
                                n = void 0 === i || i;
                            if (function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.logEnabled = !0, this.observer = t, this.config = r, this.removePKCS7Padding = n, n) try {
                                var a = d.crypto;
                                a && (this.subtle = a.subtle || a.webkitSubtle)
                            } catch (e) {
                            }
                            this.disableWebCrypto = !this.subtle
                        }

                        return e.prototype.isSync = function () {
                            return this.disableWebCrypto && this.config.enableSoftwareAES
                        }, e.prototype.decrypt = function (e, t, r, o) {
                            var l = this;
                            if (this.disableWebCrypto && this.config.enableSoftwareAES) {
                                this.logEnabled && (s.logger.log("JS AES decrypt"), this.logEnabled = !1);
                                var u = this.decryptor;
                                u || (this.decryptor = u = new a), u.expandKey(t), o(u.decrypt(e, 0, r, this.removePKCS7Padding))
                            } else {
                                this.logEnabled && (s.logger.log("WebCrypto AES decrypt"), this.logEnabled = !1);
                                var d = this.subtle;
                                this.key !== t && (this.key = t, this.fastAesKey = new n(d, t)), this.fastAesKey.expandKey().then(function (n) {
                                    new i(d, r).decrypt(e, n).catch(function (i) {
                                        l.onWebCryptoError(i, e, t, r, o)
                                    }).then(function (e) {
                                        o(e)
                                    })
                                }).catch(function (i) {
                                    l.onWebCryptoError(i, e, t, r, o)
                                })
                            }
                        }, e.prototype.onWebCryptoError = function (e, t, r, i, n) {
                            this.config.enableSoftwareAES ? (s.logger.log("WebCrypto Error, disable WebCrypto API"), this.disableWebCrypto = !0, this.logEnabled = !0, this.decrypt(t, r, i, n)) : (s.logger.error("decrypting error : " + e.message), this.observer.trigger(l.default.ERROR, {
                                type: o.ErrorTypes.MEDIA_ERROR,
                                details: o.ErrorDetails.FRAG_DECRYPT_ERROR,
                                fatal: !0,
                                reason: e.message
                            }))
                        }, e.prototype.destroy = function () {
                            var e = this.decryptor;
                            e && (e.destroy(), this.decryptor = void 0)
                        }, e
                    }();
                    t.default = c
                }, "./src/demux/demuxer-inline.js":
                /*!**************************************************!*\
  !*** ./src/demux/demuxer-inline.js + 11 modules ***!
  \**************************************************/
                /*! exports provided: default */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/crypt/decrypter.js because of ./src/hls.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/demux/id3.js because of ./src/hls.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/demux/mp4demuxer.js because of ./src/hls.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/errors.js because of ./src/hls.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/events.js because of ./src/hls.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/polyfills/number-isFinite.js because of ./src/hls.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/utils/get-self-scope.js because of ./src/hls.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/utils/logger.js because of ./src/hls.js */function (e, t, r) {
                    "use strict";
                    var i = r("./src/events.js"), n = r("./src/errors.js"), a = r("./src/crypt/decrypter.js"),
                        o = r("./src/polyfills/number-isFinite.js"), s = r("./src/utils/logger.js"),
                        l = r("./src/utils/get-self-scope.js");

                    function u(e, t) {
                        return 255 === e[t] && 240 == (246 & e[t + 1])
                    }

                    function d(e, t) {
                        return 1 & e[t + 1] ? 7 : 9
                    }

                    function c(e, t) {
                        return (3 & e[t + 3]) << 11 | e[t + 4] << 3 | (224 & e[t + 5]) >>> 5
                    }

                    function f(e, t) {
                        return !!(t + 1 < e.length && u(e, t))
                    }

                    function h(e, t) {
                        if (t + 1 < e.length && u(e, t)) {
                            var r = d(e, t);
                            t + 5 < e.length && (r = c(e, t));
                            var i = t + r;
                            if (i === e.length || i + 1 < e.length && u(e, i)) return !0
                        }
                        return !1
                    }

                    function p(e, t, r, a, o) {
                        if (!e.samplerate) {
                            var l = function (e, t, r, a) {
                                var o, l = void 0, u = void 0, d = void 0, c = void 0,
                                    f = navigator.userAgent.toLowerCase(), h = a,
                                    p = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
                                if (l = 1 + ((192 & t[r + 2]) >>> 6), !((o = (60 & t[r + 2]) >>> 2) > p.length - 1)) return d = (1 & t[r + 2]) << 2, d |= (192 & t[r + 3]) >>> 6, s.logger.log("manifest codec:" + a + ",ADTS data:type:" + l + ",sampleingIndex:" + o + "[" + p[o] + "Hz],channelConfig:" + d), /firefox/i.test(f) ? o >= 6 ? (l = 5, c = new Array(4), u = o - 3) : (l = 2, c = new Array(2), u = o) : -1 !== f.indexOf("android") ? (l = 2, c = new Array(2), u = o) : (l = 5, c = new Array(4), a && (-1 !== a.indexOf("mp4a.40.29") || -1 !== a.indexOf("mp4a.40.5")) || !a && o >= 6 ? u = o - 3 : ((a && -1 !== a.indexOf("mp4a.40.2") && (o >= 6 && 1 === d || /vivaldi/i.test(f)) || !a && 1 === d) && (l = 2, c = new Array(2)), u = o)), c[0] = l << 3, c[0] |= (14 & o) >> 1, c[1] |= (1 & o) << 7, c[1] |= d << 3, 5 === l && (c[1] |= (14 & u) >> 1, c[2] = (1 & u) << 7, c[2] |= 8, c[3] = 0), {
                                    config: c,
                                    samplerate: p[o],
                                    channelCount: d,
                                    codec: "mp4a.40." + l,
                                    manifestCodec: h
                                };
                                e.trigger(i.default.ERROR, {
                                    type: n.ErrorTypes.MEDIA_ERROR,
                                    details: n.ErrorDetails.FRAG_PARSING_ERROR,
                                    fatal: !0,
                                    reason: "invalid ADTS sampling index:" + o
                                })
                            }(t, r, a, o);
                            e.config = l.config, e.samplerate = l.samplerate, e.channelCount = l.channelCount, e.codec = l.codec, e.manifestCodec = l.manifestCodec, s.logger.log("parsed codec:" + e.codec + ",rate:" + l.samplerate + ",nb channel:" + l.channelCount)
                        }
                    }

                    function g(e) {
                        return 9216e4 / e
                    }

                    function v(e, t, r, i, n) {
                        var a = function (e, t, r, i, n) {
                            var a, o = void 0, s = e.length;
                            if (a = d(e, t), o = c(e, t), (o -= a) > 0 && t + a + o <= s) return {
                                headerLength: a,
                                frameLength: o,
                                stamp: r + i * n
                            }
                        }(t, r, i, n, g(e.samplerate));
                        if (a) {
                            var o = a.stamp, s = a.headerLength, l = a.frameLength,
                                u = {unit: t.subarray(r + s, r + s + l), pts: o, dts: o};
                            return e.samples.push(u), e.len += l, {sample: u, length: l + s}
                        }
                    }

                    var y = r("./src/demux/id3.js");
                    var m = function () {
                        function e(t, r, i) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.observer = t, this.config = i, this.remuxer = r
                        }

                        return e.prototype.resetInitSegment = function (e, t, r, i) {
                            this._audioTrack = {
                                container: "audio/adts",
                                type: "audio",
                                id: 0,
                                sequenceNumber: 0,
                                isAAC: !0,
                                samples: [],
                                len: 0,
                                manifestCodec: t,
                                duration: i,
                                inputTimeScale: 9e4
                            }
                        }, e.prototype.resetTimeStamp = function () {
                        }, e.probe = function (e) {
                            if (!e) return !1;
                            for (var t = (y.default.getID3Data(e, 0) || []).length, r = e.length; t < r; t++) if (h(e, t)) return s.logger.log("ADTS sync word found !"), !0;
                            return !1
                        }, e.prototype.append = function (e, t, r, i) {
                            for (var n = this._audioTrack, a = y.default.getID3Data(e, 0) || [], l = y.default.getTimeStamp(a), u = Object(o.isFiniteNumber)(l) ? 90 * l : 9e4 * t, d = 0, c = u, h = e.length, g = a.length, m = [{
                                pts: c,
                                dts: c,
                                data: a
                            }]; g < h - 1;) if (f(e, g) && g + 5 < h) {
                                p(n, this.observer, e, g, n.manifestCodec);
                                var T = v(n, e, g, u, d);
                                if (!T) {
                                    s.logger.log("Unable to parse AAC frame");
                                    break
                                }
                                g += T.length, c = T.sample.pts, d++
                            } else y.default.isHeader(e, g) ? (a = y.default.getID3Data(e, g), m.push({
                                pts: c,
                                dts: c,
                                data: a
                            }), g += a.length) : g++;
                            this.remuxer.remux(n, {samples: []}, {
                                samples: m,
                                inputTimeScale: 9e4
                            }, {samples: []}, t, r, i)
                        }, e.prototype.destroy = function () {
                        }, e
                    }(), T = r("./src/demux/mp4demuxer.js"), E = {
                        BitratesMap: [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
                        SamplingRateMap: [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3],
                        SamplesCoefficients: [[0, 72, 144, 12], [0, 0, 0, 0], [0, 72, 144, 12], [0, 144, 144, 12]],
                        BytesInSlot: [0, 1, 1, 4],
                        appendFrame: function (e, t, r, i, n) {
                            if (!(r + 24 > t.length)) {
                                var a = this.parseHeader(t, r);
                                if (a && r + a.frameLength <= t.length) {
                                    var o = i + n * (9e4 * a.samplesPerFrame / a.sampleRate),
                                        s = {unit: t.subarray(r, r + a.frameLength), pts: o, dts: o};
                                    return e.config = [], e.channelCount = a.channelCount, e.samplerate = a.sampleRate, e.samples.push(s), e.len += a.frameLength, {
                                        sample: s,
                                        length: a.frameLength
                                    }
                                }
                            }
                        },
                        parseHeader: function (e, t) {
                            var r = e[t + 1] >> 3 & 3, i = e[t + 1] >> 1 & 3, n = e[t + 2] >> 4 & 15,
                                a = e[t + 2] >> 2 & 3, o = e[t + 2] >> 1 & 1;
                            if (1 !== r && 0 !== n && 15 !== n && 3 !== a) {
                                var s = 3 === r ? 3 - i : 3 === i ? 3 : 4, l = 1e3 * E.BitratesMap[14 * s + n - 1],
                                    u = 3 === r ? 0 : 2 === r ? 1 : 2, d = E.SamplingRateMap[3 * u + a],
                                    c = e[t + 3] >> 6 == 3 ? 1 : 2, f = E.SamplesCoefficients[r][i],
                                    h = E.BytesInSlot[i], p = 8 * f * h;
                                return {
                                    sampleRate: d,
                                    channelCount: c,
                                    frameLength: parseInt(f * l / d + o, 10) * h,
                                    samplesPerFrame: p
                                }
                            }
                        },
                        isHeaderPattern: function (e, t) {
                            return 255 === e[t] && 224 == (224 & e[t + 1]) && 0 != (6 & e[t + 1])
                        },
                        isHeader: function (e, t) {
                            return !!(t + 1 < e.length && this.isHeaderPattern(e, t))
                        },
                        probe: function (e, t) {
                            if (t + 1 < e.length && this.isHeaderPattern(e, t)) {
                                var r = this.parseHeader(e, t), i = 4;
                                r && r.frameLength && (i = r.frameLength);
                                var n = t + i;
                                if (n === e.length || n + 1 < e.length && this.isHeaderPattern(e, n)) return !0
                            }
                            return !1
                        }
                    }, b = E;
                    var _ = function () {
                        function e(t) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.data = t, this.bytesAvailable = t.byteLength, this.word = 0, this.bitsAvailable = 0
                        }

                        return e.prototype.loadWord = function () {
                            var e = this.data, t = this.bytesAvailable, r = e.byteLength - t, i = new Uint8Array(4),
                                n = Math.min(4, t);
                            if (0 === n) throw new Error("no bytes available");
                            i.set(e.subarray(r, r + n)), this.word = new DataView(i.buffer).getUint32(0), this.bitsAvailable = 8 * n, this.bytesAvailable -= n
                        }, e.prototype.skipBits = function (e) {
                            var t = void 0;
                            this.bitsAvailable > e ? (this.word <<= e, this.bitsAvailable -= e) : (e -= this.bitsAvailable, e -= (t = e >> 3) >> 3, this.bytesAvailable -= t, this.loadWord(), this.word <<= e, this.bitsAvailable -= e)
                        }, e.prototype.readBits = function (e) {
                            var t = Math.min(this.bitsAvailable, e), r = this.word >>> 32 - t;
                            return e > 32 && s.logger.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= t, this.bitsAvailable > 0 ? this.word <<= t : this.bytesAvailable > 0 && this.loadWord(), (t = e - t) > 0 && this.bitsAvailable ? r << t | this.readBits(t) : r
                        }, e.prototype.skipLZ = function () {
                            var e = void 0;
                            for (e = 0; e < this.bitsAvailable; ++e) if (0 != (this.word & 2147483648 >>> e)) return this.word <<= e, this.bitsAvailable -= e, e;
                            return this.loadWord(), e + this.skipLZ()
                        }, e.prototype.skipUEG = function () {
                            this.skipBits(1 + this.skipLZ())
                        }, e.prototype.skipEG = function () {
                            this.skipBits(1 + this.skipLZ())
                        }, e.prototype.readUEG = function () {
                            var e = this.skipLZ();
                            return this.readBits(e + 1) - 1
                        }, e.prototype.readEG = function () {
                            var e = this.readUEG();
                            return 1 & e ? 1 + e >>> 1 : -1 * (e >>> 1)
                        }, e.prototype.readBoolean = function () {
                            return 1 === this.readBits(1)
                        }, e.prototype.readUByte = function () {
                            return this.readBits(8)
                        }, e.prototype.readUShort = function () {
                            return this.readBits(16)
                        }, e.prototype.readUInt = function () {
                            return this.readBits(32)
                        }, e.prototype.skipScalingList = function (e) {
                            var t = 8, r = 8, i = void 0;
                            for (i = 0; i < e; i++) 0 !== r && (r = (t + this.readEG() + 256) % 256), t = 0 === r ? t : r
                        }, e.prototype.readSPS = function () {
                            var e, t, r, i, n = 0, a = 0, o = 0, s = 0, l = void 0, u = void 0, d = void 0,
                                c = this.readUByte.bind(this), f = this.readBits.bind(this),
                                h = this.readUEG.bind(this), p = this.readBoolean.bind(this),
                                g = this.skipBits.bind(this), v = this.skipEG.bind(this), y = this.skipUEG.bind(this),
                                m = this.skipScalingList.bind(this);
                            if (c(), e = c(), f(5), g(3), c(), y(), 100 === e || 110 === e || 122 === e || 244 === e || 44 === e || 83 === e || 86 === e || 118 === e || 128 === e) {
                                var T = h();
                                if (3 === T && g(1), y(), y(), g(1), p()) for (u = 3 !== T ? 8 : 12, d = 0; d < u; d++) p() && m(d < 6 ? 16 : 64)
                            }
                            y();
                            var E = h();
                            if (0 === E) h(); else if (1 === E) for (g(1), v(), v(), l = h(), d = 0; d < l; d++) v();
                            y(), g(1), t = h(), r = h(), 0 === (i = f(1)) && g(1), g(1), p() && (n = h(), a = h(), o = h(), s = h());
                            var b = [1, 1];
                            if (p() && p()) switch (c()) {
                                case 1:
                                    b = [1, 1];
                                    break;
                                case 2:
                                    b = [12, 11];
                                    break;
                                case 3:
                                    b = [10, 11];
                                    break;
                                case 4:
                                    b = [16, 11];
                                    break;
                                case 5:
                                    b = [40, 33];
                                    break;
                                case 6:
                                    b = [24, 11];
                                    break;
                                case 7:
                                    b = [20, 11];
                                    break;
                                case 8:
                                    b = [32, 11];
                                    break;
                                case 9:
                                    b = [80, 33];
                                    break;
                                case 10:
                                    b = [18, 11];
                                    break;
                                case 11:
                                    b = [15, 11];
                                    break;
                                case 12:
                                    b = [64, 33];
                                    break;
                                case 13:
                                    b = [160, 99];
                                    break;
                                case 14:
                                    b = [4, 3];
                                    break;
                                case 15:
                                    b = [3, 2];
                                    break;
                                case 16:
                                    b = [2, 1];
                                    break;
                                case 255:
                                    b = [c() << 8 | c(), c() << 8 | c()]
                            }
                            return {
                                width: Math.ceil(16 * (t + 1) - 2 * n - 2 * a),
                                height: (2 - i) * (r + 1) * 16 - (i ? 2 : 4) * (o + s),
                                pixelRatio: b
                            }
                        }, e.prototype.readSliceType = function () {
                            return this.readUByte(), this.readUEG(), this.readUEG()
                        }, e
                    }();
                    var S = function () {
                        function e(t, r, i, n) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.decryptdata = i, this.discardEPB = n, this.decrypter = new a.default(t, r, {removePKCS7Padding: !1})
                        }

                        return e.prototype.decryptBuffer = function (e, t) {
                            this.decrypter.decrypt(e, this.decryptdata.key.buffer, this.decryptdata.iv.buffer, t)
                        }, e.prototype.decryptAacSample = function (e, t, r, i) {
                            var n = e[t].unit, a = n.subarray(16, n.length - n.length % 16),
                                o = a.buffer.slice(a.byteOffset, a.byteOffset + a.length), s = this;
                            this.decryptBuffer(o, function (a) {
                                a = new Uint8Array(a), n.set(a, 16), i || s.decryptAacSamples(e, t + 1, r)
                            })
                        }, e.prototype.decryptAacSamples = function (e, t, r) {
                            for (; ; t++) {
                                if (t >= e.length) return void r();
                                if (!(e[t].unit.length < 32)) {
                                    var i = this.decrypter.isSync();
                                    if (this.decryptAacSample(e, t, r, i), !i) return
                                }
                            }
                        }, e.prototype.getAvcEncryptedData = function (e) {
                            for (var t = 16 * Math.floor((e.length - 48) / 160) + 16, r = new Int8Array(t), i = 0, n = 32; n <= e.length - 16; n += 160, i += 16) r.set(e.subarray(n, n + 16), i);
                            return r
                        }, e.prototype.getAvcDecryptedUnit = function (e, t) {
                            t = new Uint8Array(t);
                            for (var r = 0, i = 32; i <= e.length - 16; i += 160, r += 16) e.set(t.subarray(r, r + 16), i);
                            return e
                        }, e.prototype.decryptAvcSample = function (e, t, r, i, n, a) {
                            var o = this.discardEPB(n.data), s = this.getAvcEncryptedData(o), l = this;
                            this.decryptBuffer(s.buffer, function (s) {
                                n.data = l.getAvcDecryptedUnit(o, s), a || l.decryptAvcSamples(e, t, r + 1, i)
                            })
                        }, e.prototype.decryptAvcSamples = function (e, t, r, i) {
                            for (; ; t++, r = 0) {
                                if (t >= e.length) return void i();
                                for (var n = e[t].units; !(r >= n.length); r++) {
                                    var a = n[r];
                                    if (!(a.length <= 48 || 1 !== a.type && 5 !== a.type)) {
                                        var o = this.decrypter.isSync();
                                        if (this.decryptAvcSample(e, t, r, i, a, o), !o) return
                                    }
                                }
                            }
                        }, e
                    }();
                    var R = {video: 1, audio: 2, id3: 3, text: 4}, k = function () {
                        function e(t, r, i, n) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.observer = t, this.config = i, this.typeSupported = n, this.remuxer = r, this.sampleAes = null
                        }

                        return e.prototype.setDecryptData = function (e) {
                            null != e && null != e.key && "SAMPLE-AES" === e.method ? this.sampleAes = new S(this.observer, this.config, e, this.discardEPB) : this.sampleAes = null
                        }, e.probe = function (t) {
                            var r = e._syncOffset(t);
                            return !(r < 0) && (r && s.logger.warn("MPEG2-TS detected but first sync word found @ offset " + r + ", junk ahead ?"), !0)
                        }, e._syncOffset = function (e) {
                            for (var t = Math.min(1e3, e.length - 564), r = 0; r < t;) {
                                if (71 === e[r] && 71 === e[r + 188] && 71 === e[r + 376]) return r;
                                r++
                            }
                            return -1
                        }, e.createTrack = function (e, t) {
                            return {
                                container: "video" === e || "audio" === e ? "video/mp2t" : void 0,
                                type: e,
                                id: R[e],
                                pid: -1,
                                inputTimeScale: 9e4,
                                sequenceNumber: 0,
                                samples: [],
                                len: 0,
                                dropped: "video" === e ? 0 : void 0,
                                isAAC: "audio" === e || void 0,
                                duration: "audio" === e ? t : void 0
                            }
                        }, e.prototype.resetInitSegment = function (t, r, i, n) {
                            this.pmtParsed = !1, this._pmtId = -1, this._avcTrack = e.createTrack("video", n), this._audioTrack = e.createTrack("audio", n), this._id3Track = e.createTrack("id3", n), this._txtTrack = e.createTrack("text", n), this.aacOverFlow = null, this.aacLastPTS = null, this.avcSample = null, this.audioCodec = r, this.videoCodec = i, this._duration = n
                        }, e.prototype.resetTimeStamp = function () {
                        }, e.prototype.append = function (t, r, a, o) {
                            var l = void 0, u = t.length, d = void 0, c = void 0, f = void 0, h = void 0, p = !1;
                            this.contiguous = a;
                            var g = this.pmtParsed, v = this._avcTrack, y = this._audioTrack, m = this._id3Track,
                                T = v.pid, E = y.pid, b = m.pid, _ = this._pmtId, S = v.pesData, R = y.pesData,
                                k = m.pesData, w = this._parsePAT, A = this._parsePMT, L = this._parsePES,
                                D = this._parseAVCPES.bind(this), O = this._parseAACPES.bind(this),
                                I = this._parseMPEGPES.bind(this), C = this._parseID3PES.bind(this),
                                x = e._syncOffset(t);
                            for (u -= (u + x) % 188, l = x; l < u; l += 188) if (71 === t[l]) {
                                if (d = !!(64 & t[l + 1]), c = ((31 & t[l + 1]) << 8) + t[l + 2], (48 & t[l + 3]) >> 4 > 1) {
                                    if ((f = l + 5 + t[l + 4]) === l + 188) continue
                                } else f = l + 4;
                                switch (c) {
                                    case T:
                                        d && (S && (h = L(S)) && void 0 !== h.pts && D(h, !1), S = {
                                            data: [],
                                            size: 0
                                        }), S && (S.data.push(t.subarray(f, l + 188)), S.size += l + 188 - f);
                                        break;
                                    case E:
                                        d && (R && (h = L(R)) && void 0 !== h.pts && (y.isAAC ? O(h) : I(h)), R = {
                                            data: [],
                                            size: 0
                                        }), R && (R.data.push(t.subarray(f, l + 188)), R.size += l + 188 - f);
                                        break;
                                    case b:
                                        d && (k && (h = L(k)) && void 0 !== h.pts && C(h), k = {
                                            data: [],
                                            size: 0
                                        }), k && (k.data.push(t.subarray(f, l + 188)), k.size += l + 188 - f);
                                        break;
                                    case 0:
                                        d && (f += t[f] + 1), _ = this._pmtId = w(t, f);
                                        break;
                                    case _:
                                        d && (f += t[f] + 1);
                                        var P = A(t, f, !0 === this.typeSupported.mpeg || !0 === this.typeSupported.mp3, null != this.sampleAes);
                                        (T = P.avc) > 0 && (v.pid = T), (E = P.audio) > 0 && (y.pid = E, y.isAAC = P.isAAC), (b = P.id3) > 0 && (m.pid = b), p && !g && (s.logger.log("reparse from beginning"), p = !1, l = x - 188), g = this.pmtParsed = !0;
                                        break;
                                    case 17:
                                    case 8191:
                                        break;
                                    default:
                                        p = !0
                                }
                            } else this.observer.trigger(i.default.ERROR, {
                                type: n.ErrorTypes.MEDIA_ERROR,
                                details: n.ErrorDetails.FRAG_PARSING_ERROR,
                                fatal: !1,
                                reason: "TS packet did not start with 0x47"
                            });
                            S && (h = L(S)) && void 0 !== h.pts ? (D(h, !0), v.pesData = null) : v.pesData = S, R && (h = L(R)) && void 0 !== h.pts ? (y.isAAC ? O(h) : I(h), y.pesData = null) : (R && R.size && s.logger.log("last AAC PES packet truncated,might overlap between fragments"), y.pesData = R), k && (h = L(k)) && void 0 !== h.pts ? (C(h), m.pesData = null) : m.pesData = k, null == this.sampleAes ? this.remuxer.remux(y, v, m, this._txtTrack, r, a, o) : this.decryptAndRemux(y, v, m, this._txtTrack, r, a, o)
                        }, e.prototype.decryptAndRemux = function (e, t, r, i, n, a, o) {
                            if (e.samples && e.isAAC) {
                                var s = this;
                                this.sampleAes.decryptAacSamples(e.samples, 0, function () {
                                    s.decryptAndRemuxAvc(e, t, r, i, n, a, o)
                                })
                            } else this.decryptAndRemuxAvc(e, t, r, i, n, a, o)
                        }, e.prototype.decryptAndRemuxAvc = function (e, t, r, i, n, a, o) {
                            if (t.samples) {
                                var s = this;
                                this.sampleAes.decryptAvcSamples(t.samples, 0, 0, function () {
                                    s.remuxer.remux(e, t, r, i, n, a, o)
                                })
                            } else this.remuxer.remux(e, t, r, i, n, a, o)
                        }, e.prototype.destroy = function () {
                            this._initPTS = this._initDTS = void 0, this._duration = 0
                        }, e.prototype._parsePAT = function (e, t) {
                            return (31 & e[t + 10]) << 8 | e[t + 11]
                        }, e.prototype._parsePMT = function (e, t, r, i) {
                            var n, a = void 0, o = {audio: -1, avc: -1, id3: -1, isAAC: !0};
                            for (n = t + 3 + ((15 & e[t + 1]) << 8 | e[t + 2]) - 4, t += 12 + ((15 & e[t + 10]) << 8 | e[t + 11]); t < n;) {
                                switch (a = (31 & e[t + 1]) << 8 | e[t + 2], e[t]) {
                                    case 207:
                                        if (!i) {
                                            s.logger.log("unkown stream type:" + e[t]);
                                            break
                                        }
                                    case 15:
                                        -1 === o.audio && (o.audio = a);
                                        break;
                                    case 21:
                                        -1 === o.id3 && (o.id3 = a);
                                        break;
                                    case 219:
                                        if (!i) {
                                            s.logger.log("unkown stream type:" + e[t]);
                                            break
                                        }
                                    case 27:
                                        -1 === o.avc && (o.avc = a);
                                        break;
                                    case 3:
                                    case 4:
                                        r ? -1 === o.audio && (o.audio = a, o.isAAC = !1) : s.logger.log("MPEG audio found, not supported in this browser for now");
                                        break;
                                    case 36:
                                        s.logger.warn("HEVC stream type found, not supported for now");
                                        break;
                                    default:
                                        s.logger.log("unkown stream type:" + e[t])
                                }
                                t += 5 + ((15 & e[t + 3]) << 8 | e[t + 4])
                            }
                            return o
                        }, e.prototype._parsePES = function (e) {
                            var t = 0, r = void 0, i = void 0, n = void 0, a = void 0, o = void 0, l = void 0,
                                u = void 0, d = void 0, c = e.data;
                            if (!e || 0 === e.size) return null;
                            for (; c[0].length < 19 && c.length > 1;) {
                                var f = new Uint8Array(c[0].length + c[1].length);
                                f.set(c[0]), f.set(c[1], c[0].length), c[0] = f, c.splice(1, 1)
                            }
                            if (1 === ((r = c[0])[0] << 16) + (r[1] << 8) + r[2]) {
                                if ((n = (r[4] << 8) + r[5]) && n > e.size - 6) return null;
                                192 & (i = r[7]) && ((l = 536870912 * (14 & r[9]) + 4194304 * (255 & r[10]) + 16384 * (254 & r[11]) + 128 * (255 & r[12]) + (254 & r[13]) / 2) > 4294967295 && (l -= 8589934592), 64 & i ? ((u = 536870912 * (14 & r[14]) + 4194304 * (255 & r[15]) + 16384 * (254 & r[16]) + 128 * (255 & r[17]) + (254 & r[18]) / 2) > 4294967295 && (u -= 8589934592), l - u > 54e5 && (s.logger.warn(Math.round((l - u) / 9e4) + "s delta between PTS and DTS, align them"), l = u)) : u = l), d = (a = r[8]) + 9, e.size -= d, o = new Uint8Array(e.size);
                                for (var h = 0, p = c.length; h < p; h++) {
                                    var g = (r = c[h]).byteLength;
                                    if (d) {
                                        if (d > g) {
                                            d -= g;
                                            continue
                                        }
                                        r = r.subarray(d), g -= d, d = 0
                                    }
                                    o.set(r, t), t += g
                                }
                                return n && (n -= a + 3), {data: o, pts: l, dts: u, len: n}
                            }
                            return null
                        }, e.prototype.pushAccesUnit = function (e, t) {
                            if (e.units.length && e.frame) {
                                var r = t.samples, i = r.length;
                                !this.config.forceKeyFrameOnDiscontinuity || !0 === e.key || t.sps && (i || this.contiguous) ? (e.id = i, r.push(e)) : t.dropped++
                            }
                            e.debug.length && s.logger.log(e.pts + "/" + e.dts + ":" + e.debug)
                        }, e.prototype._parseAVCPES = function (e, t) {
                            var r = this, i = this._avcTrack, n = this._parseAVCNALu(e.data), a = void 0,
                                o = this.avcSample, s = void 0, l = !1, u = void 0, d = this.pushAccesUnit.bind(this),
                                c = function (e, t, r, i) {
                                    return {key: e, pts: t, dts: r, units: [], debug: i}
                                };
                            e.data = null, o && n.length && !i.audFound && (d(o, i), o = this.avcSample = c(!1, e.pts, e.dts, "")), n.forEach(function (t) {
                                switch (t.type) {
                                    case 1:
                                        s = !0, o || (o = r.avcSample = c(!0, e.pts, e.dts, "")), o.frame = !0;
                                        var n = t.data;
                                        if (l && n.length > 4) {
                                            var f = new _(n).readSliceType();
                                            2 !== f && 4 !== f && 7 !== f && 9 !== f || (o.key = !0)
                                        }
                                        break;
                                    case 5:
                                        s = !0, o || (o = r.avcSample = c(!0, e.pts, e.dts, "")), o.key = !0, o.frame = !0;
                                        break;
                                    case 6:
                                        s = !0, (a = new _(r.discardEPB(t.data))).readUByte();
                                        for (var h = 0, p = 0, g = !1, v = 0; !g && a.bytesAvailable > 1;) {
                                            h = 0;
                                            do {
                                                h += v = a.readUByte()
                                            } while (255 === v);
                                            p = 0;
                                            do {
                                                p += v = a.readUByte()
                                            } while (255 === v);
                                            if (4 === h && 0 !== a.bytesAvailable) {
                                                if (g = !0, 181 === a.readUByte()) if (49 === a.readUShort()) if (1195456820 === a.readUInt()) if (3 === a.readUByte()) {
                                                    var y = a.readUByte(), m = 31 & y, T = [y, a.readUByte()];
                                                    for (u = 0; u < m; u++) T.push(a.readUByte()), T.push(a.readUByte()), T.push(a.readUByte());
                                                    r._insertSampleInOrder(r._txtTrack.samples, {
                                                        type: 3,
                                                        pts: e.pts,
                                                        bytes: T
                                                    })
                                                }
                                            } else if (p < a.bytesAvailable) for (u = 0; u < p; u++) a.readUByte()
                                        }
                                        break;
                                    case 7:
                                        if (s = !0, l = !0, !i.sps) {
                                            var E = (a = new _(t.data)).readSPS();
                                            i.width = E.width, i.height = E.height, i.pixelRatio = E.pixelRatio, i.sps = [t.data], i.duration = r._duration;
                                            var b = t.data.subarray(1, 4), S = "avc1.";
                                            for (u = 0; u < 3; u++) {
                                                var R = b[u].toString(16);
                                                R.length < 2 && (R = "0" + R), S += R
                                            }
                                            i.codec = S
                                        }
                                        break;
                                    case 8:
                                        s = !0, i.pps || (i.pps = [t.data]);
                                        break;
                                    case 9:
                                        s = !1, i.audFound = !0, o && d(o, i), o = r.avcSample = c(!1, e.pts, e.dts, "");
                                        break;
                                    case 12:
                                        s = !1;
                                        break;
                                    default:
                                        s = !1, o && (o.debug += "unknown NAL " + t.type + " ")
                                }
                                o && s && o.units.push(t)
                            }), t && o && (d(o, i), this.avcSample = null)
                        }, e.prototype._insertSampleInOrder = function (e, t) {
                            var r = e.length;
                            if (r > 0) {
                                if (t.pts >= e[r - 1].pts) e.push(t); else for (var i = r - 1; i >= 0; i--) if (t.pts < e[i].pts) {
                                    e.splice(i, 0, t);
                                    break
                                }
                            } else e.push(t)
                        }, e.prototype._getLastNalUnit = function () {
                            var e = this.avcSample, t = void 0;
                            if (!e || 0 === e.units.length) {
                                var r = this._avcTrack.samples;
                                e = r[r.length - 1]
                            }
                            if (e) {
                                var i = e.units;
                                t = i[i.length - 1]
                            }
                            return t
                        }, e.prototype._parseAVCNALu = function (e) {
                            var t = 0, r = e.byteLength, i = void 0, n = void 0, a = this._avcTrack,
                                o = a.naluState || 0, s = o, l = [], u = void 0, d = -1, c = void 0;
                            for (-1 === o && (d = 0, c = 31 & e[0], o = 0, t = 1); t < r;) if (i = e[t++], o) if (1 !== o) if (i) if (1 === i) {
                                if (d >= 0) u = {data: e.subarray(d, t - o - 1), type: c}, l.push(u); else {
                                    var f = this._getLastNalUnit();
                                    if (f && (s && t <= 4 - s && f.state && (f.data = f.data.subarray(0, f.data.byteLength - s)), (n = t - o - 1) > 0)) {
                                        var h = new Uint8Array(f.data.byteLength + n);
                                        h.set(f.data, 0), h.set(e.subarray(0, n), f.data.byteLength), f.data = h
                                    }
                                }
                                t < r ? (d = t, c = 31 & e[t], o = 0) : o = -1
                            } else o = 0; else o = 3; else o = i ? 0 : 2; else o = i ? 0 : 1;
                            if (d >= 0 && o >= 0 && (u = {
                                data: e.subarray(d, r),
                                type: c,
                                state: o
                            }, l.push(u)), 0 === l.length) {
                                var p = this._getLastNalUnit();
                                if (p) {
                                    var g = new Uint8Array(p.data.byteLength + e.byteLength);
                                    g.set(p.data, 0), g.set(e, p.data.byteLength), p.data = g
                                }
                            }
                            return a.naluState = o, l
                        }, e.prototype.discardEPB = function (e) {
                            for (var t, r = e.byteLength, i = [], n = 1, a = void 0; n < r - 2;) 0 === e[n] && 0 === e[n + 1] && 3 === e[n + 2] ? (i.push(n + 2), n += 2) : n++;
                            if (0 === i.length) return e;
                            t = r - i.length, a = new Uint8Array(t);
                            var o = 0;
                            for (n = 0; n < t; o++, n++) o === i[0] && (o++, i.shift()), a[n] = e[o];
                            return a
                        }, e.prototype._parseAACPES = function (e) {
                            var t, r, a = this._audioTrack, o = e.data, l = e.pts, u = this.aacOverFlow,
                                d = this.aacLastPTS, c = void 0, h = void 0, y = void 0;
                            if (u) {
                                var m = new Uint8Array(u.byteLength + o.byteLength);
                                m.set(u, 0), m.set(o, u.byteLength), o = m
                            }
                            for (h = 0, r = o.length; h < r - 1 && !f(o, h); h++) ;
                            if (h) {
                                var T = void 0, E = void 0;
                                if (h < r - 1 ? (T = "AAC PES did not start with ADTS header,offset:" + h, E = !1) : (T = "no ADTS header found in AAC PES", E = !0), s.logger.warn("parsing error:" + T), this.observer.trigger(i.default.ERROR, {
                                    type: n.ErrorTypes.MEDIA_ERROR,
                                    details: n.ErrorDetails.FRAG_PARSING_ERROR,
                                    fatal: E,
                                    reason: T
                                }), E) return
                            }
                            if (p(a, this.observer, o, h, this.audioCodec), c = 0, t = g(a.samplerate), u && d) {
                                var b = d + t;
                                Math.abs(b - l) > 1 && (s.logger.log("AAC: align PTS for overlapping frames by " + Math.round((b - l) / 90)), l = b)
                            }
                            for (; h < r;) if (f(o, h) && h + 5 < r) {
                                var _ = v(a, o, h, l, c);
                                if (!_) break;
                                h += _.length, y = _.sample.pts, c++
                            } else h++;
                            u = h < r ? o.subarray(h, r) : null, this.aacOverFlow = u, this.aacLastPTS = y
                        }, e.prototype._parseMPEGPES = function (e) {
                            for (var t = e.data, r = t.length, i = 0, n = 0, a = e.pts; n < r;) if (b.isHeader(t, n)) {
                                var o = b.appendFrame(this._audioTrack, t, n, a, i);
                                if (!o) break;
                                n += o.length, i++
                            } else n++
                        }, e.prototype._parseID3PES = function (e) {
                            this._id3Track.samples.push(e)
                        }, e
                    }();
                    var w = function () {
                        function e(t, r, i) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.observer = t, this.config = i, this.remuxer = r
                        }

                        return e.prototype.resetInitSegment = function (e, t, r, i) {
                            this._audioTrack = {
                                container: "audio/mpeg",
                                type: "audio",
                                id: -1,
                                sequenceNumber: 0,
                                isAAC: !1,
                                samples: [],
                                len: 0,
                                manifestCodec: t,
                                duration: i,
                                inputTimeScale: 9e4
                            }
                        }, e.prototype.resetTimeStamp = function () {
                        }, e.probe = function (e) {
                            var t = void 0, r = void 0, i = y.default.getID3Data(e, 0);
                            if (i && void 0 !== y.default.getTimeStamp(i)) for (t = i.length, r = Math.min(e.length - 1, t + 100); t < r; t++) if (b.probe(e, t)) return s.logger.log("MPEG Audio sync word found !"), !0;
                            return !1
                        }, e.prototype.append = function (e, t, r, i) {
                            for (var n = y.default.getID3Data(e, 0), a = y.default.getTimeStamp(n), o = a ? 90 * a : 9e4 * t, s = n.length, l = e.length, u = 0, d = 0, c = this._audioTrack, f = [{
                                pts: o,
                                dts: o,
                                data: n
                            }]; s < l;) if (b.isHeader(e, s)) {
                                var h = b.appendFrame(c, e, s, o, u);
                                if (!h) break;
                                s += h.length, d = h.sample.pts, u++
                            } else y.default.isHeader(e, s) ? (n = y.default.getID3Data(e, s), f.push({
                                pts: d,
                                dts: d,
                                data: n
                            }), s += n.length) : s++;
                            this.remuxer.remux(c, {samples: []}, {
                                samples: f,
                                inputTimeScale: 9e4
                            }, {samples: []}, t, r, i)
                        }, e.prototype.destroy = function () {
                        }, e
                    }();
                    var A = function () {
                        function e() {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e)
                        }

                        return e.getSilentFrame = function (e, t) {
                            switch (e) {
                                case"mp4a.40.2":
                                    if (1 === t) return new Uint8Array([0, 200, 0, 128, 35, 128]);
                                    if (2 === t) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                                    if (3 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                                    if (4 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                                    if (5 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                                    if (6 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
                                    break;
                                default:
                                    if (1 === t) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                                    if (2 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                                    if (3 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
                            }
                            return null
                        }, e
                    }();
                    var L = Math.pow(2, 32) - 1, D = function () {
                        function e() {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e)
                        }

                        return e.init = function () {
                            e.types = {
                                avc1: [],
                                avcC: [],
                                btrt: [],
                                dinf: [],
                                dref: [],
                                esds: [],
                                ftyp: [],
                                hdlr: [],
                                mdat: [],
                                mdhd: [],
                                mdia: [],
                                mfhd: [],
                                minf: [],
                                moof: [],
                                moov: [],
                                mp4a: [],
                                ".mp3": [],
                                mvex: [],
                                mvhd: [],
                                pasp: [],
                                sdtp: [],
                                stbl: [],
                                stco: [],
                                stsc: [],
                                stsd: [],
                                stsz: [],
                                stts: [],
                                tfdt: [],
                                tfhd: [],
                                traf: [],
                                trak: [],
                                trun: [],
                                trex: [],
                                tkhd: [],
                                vmhd: [],
                                smhd: []
                            };
                            var t = void 0;
                            for (t in e.types) e.types.hasOwnProperty(t) && (e.types[t] = [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)]);
                            var r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
                                i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
                            e.HDLR_TYPES = {video: r, audio: i};
                            var n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
                                a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
                            e.STTS = e.STSC = e.STCO = a, e.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), e.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]), e.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), e.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
                            var o = new Uint8Array([105, 115, 111, 109]), s = new Uint8Array([97, 118, 99, 49]),
                                l = new Uint8Array([0, 0, 0, 1]);
                            e.FTYP = e.box(e.types.ftyp, o, l, o, s), e.DINF = e.box(e.types.dinf, e.box(e.types.dref, n))
                        }, e.box = function (e) {
                            for (var t = Array.prototype.slice.call(arguments, 1), r = 8, i = t.length, n = i, a = void 0; i--;) r += t[i].byteLength;
                            for ((a = new Uint8Array(r))[0] = r >> 24 & 255, a[1] = r >> 16 & 255, a[2] = r >> 8 & 255, a[3] = 255 & r, a.set(e, 4), i = 0, r = 8; i < n; i++) a.set(t[i], r), r += t[i].byteLength;
                            return a
                        }, e.hdlr = function (t) {
                            return e.box(e.types.hdlr, e.HDLR_TYPES[t])
                        }, e.mdat = function (t) {
                            return e.box(e.types.mdat, t)
                        }, e.mdhd = function (t, r) {
                            r *= t;
                            var i = Math.floor(r / (L + 1)), n = Math.floor(r % (L + 1));
                            return e.box(e.types.mdhd, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, 85, 196, 0, 0]))
                        }, e.mdia = function (t) {
                            return e.box(e.types.mdia, e.mdhd(t.timescale, t.duration), e.hdlr(t.type), e.minf(t))
                        }, e.mfhd = function (t) {
                            return e.box(e.types.mfhd, new Uint8Array([0, 0, 0, 0, t >> 24, t >> 16 & 255, t >> 8 & 255, 255 & t]))
                        }, e.minf = function (t) {
                            return "audio" === t.type ? e.box(e.types.minf, e.box(e.types.smhd, e.SMHD), e.DINF, e.stbl(t)) : e.box(e.types.minf, e.box(e.types.vmhd, e.VMHD), e.DINF, e.stbl(t))
                        }, e.moof = function (t, r, i) {
                            return e.box(e.types.moof, e.mfhd(t), e.traf(i, r))
                        }, e.moov = function (t) {
                            for (var r = t.length, i = []; r--;) i[r] = e.trak(t[r]);
                            return e.box.apply(null, [e.types.moov, e.mvhd(t[0].timescale, t[0].duration)].concat(i).concat(e.mvex(t)))
                        }, e.mvex = function (t) {
                            for (var r = t.length, i = []; r--;) i[r] = e.trex(t[r]);
                            return e.box.apply(null, [e.types.mvex].concat(i))
                        }, e.mvhd = function (t, r) {
                            r *= t;
                            var i = Math.floor(r / (L + 1)), n = Math.floor(r % (L + 1)),
                                a = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
                            return e.box(e.types.mvhd, a)
                        }, e.sdtp = function (t) {
                            var r = t.samples || [], i = new Uint8Array(4 + r.length), n = void 0, a = void 0;
                            for (a = 0; a < r.length; a++) n = r[a].flags, i[a + 4] = n.dependsOn << 4 | n.isDependedOn << 2 | n.hasRedundancy;
                            return e.box(e.types.sdtp, i)
                        }, e.stbl = function (t) {
                            return e.box(e.types.stbl, e.stsd(t), e.box(e.types.stts, e.STTS), e.box(e.types.stsc, e.STSC), e.box(e.types.stsz, e.STSZ), e.box(e.types.stco, e.STCO))
                        }, e.avc1 = function (t) {
                            var r = [], i = [], n = void 0, a = void 0, o = void 0;
                            for (n = 0; n < t.sps.length; n++) o = (a = t.sps[n]).byteLength, r.push(o >>> 8 & 255), r.push(255 & o), r = r.concat(Array.prototype.slice.call(a));
                            for (n = 0; n < t.pps.length; n++) o = (a = t.pps[n]).byteLength, i.push(o >>> 8 & 255), i.push(255 & o), i = i.concat(Array.prototype.slice.call(a));
                            var s = e.box(e.types.avcC, new Uint8Array([1, r[3], r[4], r[5], 255, 224 | t.sps.length].concat(r).concat([t.pps.length]).concat(i))),
                                l = t.width, u = t.height, d = t.pixelRatio[0], c = t.pixelRatio[1];
                            return e.box(e.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l >> 8 & 255, 255 & l, u >> 8 & 255, 255 & u, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), s, e.box(e.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])), e.box(e.types.pasp, new Uint8Array([d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d, c >> 24, c >> 16 & 255, c >> 8 & 255, 255 & c])))
                        }, e.esds = function (e) {
                            var t = e.config.length;
                            return new Uint8Array([0, 0, 0, 0, 3, 23 + t, 0, 1, 0, 4, 15 + t, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([t]).concat(e.config).concat([6, 1, 2]))
                        }, e.mp4a = function (t) {
                            var r = t.samplerate;
                            return e.box(e.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]), e.box(e.types.esds, e.esds(t)))
                        }, e.mp3 = function (t) {
                            var r = t.samplerate;
                            return e.box(e.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]))
                        }, e.stsd = function (t) {
                            return "audio" === t.type ? t.isAAC || "mp3" !== t.codec ? e.box(e.types.stsd, e.STSD, e.mp4a(t)) : e.box(e.types.stsd, e.STSD, e.mp3(t)) : e.box(e.types.stsd, e.STSD, e.avc1(t))
                        }, e.tkhd = function (t) {
                            var r = t.id, i = t.duration * t.timescale, n = t.width, a = t.height,
                                o = Math.floor(i / (L + 1)), s = Math.floor(i % (L + 1));
                            return e.box(e.types.tkhd, new Uint8Array([1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 0, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, n >> 8 & 255, 255 & n, 0, 0, a >> 8 & 255, 255 & a, 0, 0]))
                        }, e.traf = function (t, r) {
                            var i = e.sdtp(t), n = t.id, a = Math.floor(r / (L + 1)), o = Math.floor(r % (L + 1));
                            return e.box(e.types.traf, e.box(e.types.tfhd, new Uint8Array([0, 0, 0, 0, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n])), e.box(e.types.tfdt, new Uint8Array([1, 0, 0, 0, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o])), e.trun(t, i.length + 16 + 20 + 8 + 16 + 8 + 8), i)
                        }, e.trak = function (t) {
                            return t.duration = t.duration || 4294967295, e.box(e.types.trak, e.tkhd(t), e.mdia(t))
                        }, e.trex = function (t) {
                            var r = t.id;
                            return e.box(e.types.trex, new Uint8Array([0, 0, 0, 0, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]))
                        }, e.trun = function (t, r) {
                            var i = t.samples || [], n = i.length, a = 12 + 16 * n, o = new Uint8Array(a), s = void 0,
                                l = void 0, u = void 0, d = void 0, c = void 0, f = void 0;
                            for (r += 8 + a, o.set([0, 0, 15, 1, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r], 0), s = 0; s < n; s++) u = (l = i[s]).duration, d = l.size, c = l.flags, f = l.cts, o.set([u >>> 24 & 255, u >>> 16 & 255, u >>> 8 & 255, 255 & u, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d, c.isLeading << 2 | c.dependsOn, c.isDependedOn << 6 | c.hasRedundancy << 4 | c.paddingValue << 1 | c.isNonSync, 61440 & c.degradPrio, 15 & c.degradPrio, f >>> 24 & 255, f >>> 16 & 255, f >>> 8 & 255, 255 & f], 12 + 16 * s);
                            return e.box(e.types.trun, o)
                        }, e.initSegment = function (t) {
                            e.types || e.init();
                            var r = e.moov(t), i = void 0;
                            return (i = new Uint8Array(e.FTYP.byteLength + r.byteLength)).set(e.FTYP), i.set(r, e.FTYP.byteLength), i
                        }, e
                    }();
                    var O = function () {
                        function e(t, r, i, n) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.observer = t, this.config = r, this.typeSupported = i;
                            var a = navigator.userAgent;
                            this.isSafari = n && n.indexOf("Apple") > -1 && a && !a.match("CriOS"), this.ISGenerated = !1
                        }

                        return e.prototype.destroy = function () {
                        }, e.prototype.resetTimeStamp = function (e) {
                            this._initPTS = this._initDTS = e
                        }, e.prototype.resetInitSegment = function () {
                            this.ISGenerated = !1
                        }, e.prototype.remux = function (e, t, r, n, a, o, l) {
                            if (this.ISGenerated || this.generateIS(e, t, a), this.ISGenerated) {
                                var u = e.samples.length, d = t.samples.length, c = a, f = a;
                                if (u && d) {
                                    var h = (e.samples[0].pts - t.samples[0].pts) / t.inputTimeScale;
                                    c += Math.max(0, h), f += Math.max(0, -h)
                                }
                                if (u) {
                                    e.timescale || (s.logger.warn("regenerate InitSegment as audio detected"), this.generateIS(e, t, a));
                                    var p = this.remuxAudio(e, c, o, l);
                                    if (d) {
                                        var g = void 0;
                                        p && (g = p.endPTS - p.startPTS), t.timescale || (s.logger.warn("regenerate InitSegment as video detected"), this.generateIS(e, t, a)), this.remuxVideo(t, f, o, g, l)
                                    }
                                } else if (d) {
                                    var v = this.remuxVideo(t, f, o, 0, l);
                                    v && e.codec && this.remuxEmptyAudio(e, c, o, v)
                                }
                            }
                            r.samples.length && this.remuxID3(r, a), n.samples.length && this.remuxText(n, a), this.observer.trigger(i.default.FRAG_PARSED)
                        }, e.prototype.generateIS = function (e, t, r) {
                            var a = this.observer, o = e.samples, l = t.samples, u = this.typeSupported,
                                d = "audio/mp4", c = {}, f = {tracks: c}, h = void 0 === this._initPTS, p = void 0,
                                g = void 0;
                            if (h && (p = g = 1 / 0), e.config && o.length && (e.timescale = e.samplerate, s.logger.log("audio sampling rate : " + e.samplerate), e.isAAC || (u.mpeg ? (d = "audio/mpeg", e.codec = "") : u.mp3 && (e.codec = "mp3")), c.audio = {
                                container: d,
                                codec: e.codec,
                                initSegment: !e.isAAC && u.mpeg ? new Uint8Array : D.initSegment([e]),
                                metadata: {channelCount: e.channelCount}
                            }, h && (p = g = o[0].pts - e.inputTimeScale * r)), t.sps && t.pps && l.length) {
                                var v = t.inputTimeScale;
                                t.timescale = v, c.video = {
                                    container: "video/mp4",
                                    codec: t.codec,
                                    initSegment: D.initSegment([t]),
                                    metadata: {width: t.width, height: t.height}
                                }, h && (p = Math.min(p, l[0].pts - v * r), g = Math.min(g, l[0].dts - v * r), this.observer.trigger(i.default.INIT_PTS_FOUND, {initPTS: p}))
                            }
                            Object.keys(c).length ? (a.trigger(i.default.FRAG_PARSING_INIT_SEGMENT, f), this.ISGenerated = !0, h && (this._initPTS = p, this._initDTS = g)) : a.trigger(i.default.ERROR, {
                                type: n.ErrorTypes.MEDIA_ERROR,
                                details: n.ErrorDetails.FRAG_PARSING_ERROR,
                                fatal: !1,
                                reason: "no audio/video samples found"
                            })
                        }, e.prototype.remuxVideo = function (e, t, r, a, o) {
                            var l, u, d, c = 8, f = void 0, h = void 0, p = void 0, g = void 0, v = e.timescale,
                                y = e.samples, m = [], T = y.length, E = this._PTSNormalize, b = this._initPTS,
                                _ = this.nextAvcDts, S = this.isSafari;
                            if (0 !== T) {
                                S && (r |= y.length && _ && (o && Math.abs(t - _ / v) < .1 || Math.abs(y[0].pts - _ - b) < v / 5)), r || (_ = t * v), y.forEach(function (e) {
                                    e.pts = E(e.pts - b, _), e.dts = E(e.dts - b, _)
                                }), y.sort(function (e, t) {
                                    var r = e.dts - t.dts, i = e.pts - t.pts;
                                    return r || i || e.id - t.id
                                });
                                var R = y.reduce(function (e, t) {
                                    return Math.max(Math.min(e, t.pts - t.dts), -18e3)
                                }, 0);
                                if (R < 0) {
                                    s.logger.warn("PTS < DTS detected in video samples, shifting DTS by " + Math.round(R / 90) + " ms to overcome this issue");
                                    for (var k = 0; k < y.length; k++) y[k].dts += R
                                }
                                var w = y[0];
                                g = Math.max(w.dts, 0), p = Math.max(w.pts, 0);
                                var A = Math.round((g - _) / 90);
                                r && A && (A > 1 ? s.logger.log("AVC:" + A + " ms hole between fragments detected,filling it") : A < -1 && s.logger.log("AVC:" + -A + " ms overlapping between fragments detected"), g = _, y[0].dts = g, p = Math.max(p - A, _), y[0].pts = p, s.logger.log("Video/PTS/DTS adjusted: " + Math.round(p / 90) + "/" + Math.round(g / 90) + ",delta:" + A + " ms")), w = y[y.length - 1], d = Math.max(w.dts, 0), u = Math.max(w.pts, 0, d), S && (f = Math.round((d - g) / (y.length - 1)));
                                for (var L = 0, O = 0, I = 0; I < T; I++) {
                                    for (var C = y[I], x = C.units, P = x.length, F = 0, N = 0; N < P; N++) F += x[N].data.length;
                                    O += F, L += P, C.length = F, C.dts = S ? g + I * f : Math.max(C.dts, g), C.pts = Math.max(C.pts, C.dts)
                                }
                                var M = O + 4 * L + 8;
                                try {
                                    h = new Uint8Array(M)
                                } catch (e) {
                                    return void this.observer.trigger(i.default.ERROR, {
                                        type: n.ErrorTypes.MUX_ERROR,
                                        details: n.ErrorDetails.REMUX_ALLOC_ERROR,
                                        fatal: !1,
                                        bytes: M,
                                        reason: "fail allocating video mdat " + M
                                    })
                                }
                                var U = new DataView(h.buffer);
                                U.setUint32(0, M), h.set(D.types.mdat, 4);
                                for (var B = 0; B < T; B++) {
                                    for (var j = y[B], G = j.units, K = 0, H = void 0, V = 0, W = G.length; V < W; V++) {
                                        var Y = G[V], q = Y.data, X = Y.data.byteLength;
                                        U.setUint32(c, X), c += 4, h.set(q, c), c += X, K += 4 + X
                                    }
                                    if (S) H = Math.max(0, f * Math.round((j.pts - j.dts) / f)); else {
                                        if (B < T - 1) f = y[B + 1].dts - j.dts; else {
                                            var z = this.config, J = j.dts - y[B > 0 ? B - 1 : B].dts;
                                            if (z.stretchShortVideoTrack) {
                                                var Q = z.maxBufferHole, $ = Math.floor(Q * v),
                                                    Z = (a ? p + a * v : this.nextAudioPts) - j.pts;
                                                Z > $ ? ((f = Z - J) < 0 && (f = J), s.logger.log("It is approximately " + Z / 90 + " ms to the next segment; using duration " + f / 90 + " ms for the last video frame.")) : f = J
                                            } else f = J
                                        }
                                        H = Math.round(j.pts - j.dts)
                                    }
                                    m.push({
                                        size: K,
                                        duration: f,
                                        cts: H,
                                        flags: {
                                            isLeading: 0,
                                            isDependedOn: 0,
                                            hasRedundancy: 0,
                                            degradPrio: 0,
                                            dependsOn: j.key ? 2 : 1,
                                            isNonSync: j.key ? 0 : 1
                                        }
                                    })
                                }
                                this.nextAvcDts = d + f;
                                var ee = e.dropped;
                                if (e.len = 0, e.nbNalu = 0, e.dropped = 0, m.length && navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                                    var te = m[0].flags;
                                    te.dependsOn = 2, te.isNonSync = 0
                                }
                                e.samples = m, l = D.moof(e.sequenceNumber++, g, e), e.samples = [];
                                var re = {
                                    data1: l,
                                    data2: h,
                                    startPTS: p / v,
                                    endPTS: (u + f) / v,
                                    startDTS: g / v,
                                    endDTS: this.nextAvcDts / v,
                                    type: "video",
                                    hasAudio: !1,
                                    hasVideo: !0,
                                    nb: m.length,
                                    dropped: ee
                                };
                                return this.observer.trigger(i.default.FRAG_PARSING_DATA, re), re
                            }
                        }, e.prototype.remuxAudio = function (e, t, r, a) {
                            var o = e.inputTimeScale, l = e.timescale, u = o / l, d = (e.isAAC ? 1024 : 1152) * u,
                                c = this._PTSNormalize, f = this._initPTS, h = !e.isAAC && this.typeSupported.mpeg,
                                p = void 0, g = void 0, v = void 0, y = void 0, m = void 0, T = void 0, E = void 0,
                                b = e.samples, _ = [], S = this.nextAudioPts;
                            if (r |= b.length && S && (a && Math.abs(t - S / o) < .1 || Math.abs(b[0].pts - S - f) < 20 * d), b.forEach(function (e) {
                                e.pts = e.dts = c(e.pts - f, t * o)
                            }), 0 !== (b = b.filter(function (e) {
                                return e.pts >= 0
                            })).length) {
                                if (r || (S = a ? t * o : b[0].pts), e.isAAC) for (var R = this.config.maxAudioFramesDrift, k = 0, w = S; k < b.length;) {
                                    var L, O = b[k];
                                    L = O.pts - w;
                                    var I = Math.abs(1e3 * L / o);
                                    if (L <= -R * d) s.logger.warn("Dropping 1 audio frame @ " + (w / o).toFixed(3) + "s due to " + Math.round(I) + " ms overlap."), b.splice(k, 1), e.len -= O.unit.length; else if (L >= R * d && I < 1e4 && w) {
                                        var C = Math.round(L / d);
                                        s.logger.warn("Injecting " + C + " audio frame @ " + (w / o).toFixed(3) + "s due to " + Math.round(1e3 * L / o) + " ms gap.");
                                        for (var x = 0; x < C; x++) {
                                            var P = Math.max(w, 0);
                                            (v = A.getSilentFrame(e.manifestCodec || e.codec, e.channelCount)) || (s.logger.log("Unable to get silent frame for given audio codec; duplicating last frame instead."), v = O.unit.subarray()), b.splice(k, 0, {
                                                unit: v,
                                                pts: P,
                                                dts: P
                                            }), e.len += v.length, w += d, k++
                                        }
                                        O.pts = O.dts = w, w += d, k++
                                    } else Math.abs(L), O.pts = O.dts = w, w += d, k++
                                }
                                for (var F = 0, N = b.length; F < N; F++) {
                                    var M = b[F], U = M.unit, B = M.pts;
                                    if (void 0 !== E) g.duration = Math.round((B - E) / u); else {
                                        var j = Math.round(1e3 * (B - S) / o), G = 0;
                                        if (r && e.isAAC && j) {
                                            if (j > 0 && j < 1e4) G = Math.round((B - S) / d), s.logger.log(j + " ms hole between AAC samples detected,filling it"), G > 0 && ((v = A.getSilentFrame(e.manifestCodec || e.codec, e.channelCount)) || (v = U.subarray()), e.len += G * v.length); else if (j < -12) {
                                                s.logger.log("drop overlapping AAC sample, expected/parsed/delta:" + (S / o).toFixed(3) + "s/" + (B / o).toFixed(3) + "s/" + -j + "ms"), e.len -= U.byteLength;
                                                continue
                                            }
                                            B = S
                                        }
                                        if (T = B, !(e.len > 0)) return;
                                        var K = h ? e.len : e.len + 8;
                                        p = h ? 0 : 8;
                                        try {
                                            y = new Uint8Array(K)
                                        } catch (e) {
                                            return void this.observer.trigger(i.default.ERROR, {
                                                type: n.ErrorTypes.MUX_ERROR,
                                                details: n.ErrorDetails.REMUX_ALLOC_ERROR,
                                                fatal: !1,
                                                bytes: K,
                                                reason: "fail allocating audio mdat " + K
                                            })
                                        }
                                        h || (new DataView(y.buffer).setUint32(0, K), y.set(D.types.mdat, 4));
                                        for (var H = 0; H < G; H++) (v = A.getSilentFrame(e.manifestCodec || e.codec, e.channelCount)) || (s.logger.log("Unable to get silent frame for given audio codec; duplicating this frame instead."), v = U.subarray()), y.set(v, p), p += v.byteLength, g = {
                                            size: v.byteLength,
                                            cts: 0,
                                            duration: 1024,
                                            flags: {
                                                isLeading: 0,
                                                isDependedOn: 0,
                                                hasRedundancy: 0,
                                                degradPrio: 0,
                                                dependsOn: 1
                                            }
                                        }, _.push(g)
                                    }
                                    y.set(U, p);
                                    var V = U.byteLength;
                                    p += V, g = {
                                        size: V,
                                        cts: 0,
                                        duration: 0,
                                        flags: {
                                            isLeading: 0,
                                            isDependedOn: 0,
                                            hasRedundancy: 0,
                                            degradPrio: 0,
                                            dependsOn: 1
                                        }
                                    }, _.push(g), E = B
                                }
                                var W = 0, Y = _.length;
                                if (Y >= 2 && (W = _[Y - 2].duration, g.duration = W), Y) {
                                    this.nextAudioPts = S = E + u * W, e.len = 0, e.samples = _, m = h ? new Uint8Array : D.moof(e.sequenceNumber++, T / u, e), e.samples = [];
                                    var q = T / o, X = S / o, z = {
                                        data1: m,
                                        data2: y,
                                        startPTS: q,
                                        endPTS: X,
                                        startDTS: q,
                                        endDTS: X,
                                        type: "audio",
                                        hasAudio: !0,
                                        hasVideo: !1,
                                        nb: Y
                                    };
                                    return this.observer.trigger(i.default.FRAG_PARSING_DATA, z), z
                                }
                                return null
                            }
                        }, e.prototype.remuxEmptyAudio = function (e, t, r, i) {
                            var n = e.inputTimeScale, a = n / (e.samplerate ? e.samplerate : n), o = this.nextAudioPts,
                                l = (void 0 !== o ? o : i.startDTS * n) + this._initDTS,
                                u = i.endDTS * n + this._initDTS, d = 1024 * a, c = Math.ceil((u - l) / d),
                                f = A.getSilentFrame(e.manifestCodec || e.codec, e.channelCount);
                            if (s.logger.warn("remux empty Audio"), f) {
                                for (var h = [], p = 0; p < c; p++) {
                                    var g = l + p * d;
                                    h.push({unit: f, pts: g, dts: g}), e.len += f.length
                                }
                                e.samples = h, this.remuxAudio(e, t, r)
                            } else s.logger.trace("Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!")
                        }, e.prototype.remuxID3 = function (e) {
                            var t = e.samples.length, r = void 0, n = e.inputTimeScale, a = this._initPTS,
                                o = this._initDTS;
                            if (t) {
                                for (var s = 0; s < t; s++) (r = e.samples[s]).pts = (r.pts - a) / n, r.dts = (r.dts - o) / n;
                                this.observer.trigger(i.default.FRAG_PARSING_METADATA, {samples: e.samples})
                            }
                            e.samples = []
                        }, e.prototype.remuxText = function (e) {
                            e.samples.sort(function (e, t) {
                                return e.pts - t.pts
                            });
                            var t = e.samples.length, r = void 0, n = e.inputTimeScale, a = this._initPTS;
                            if (t) {
                                for (var o = 0; o < t; o++) (r = e.samples[o]).pts = (r.pts - a) / n;
                                this.observer.trigger(i.default.FRAG_PARSING_USERDATA, {samples: e.samples})
                            }
                            e.samples = []
                        }, e.prototype._PTSNormalize = function (e, t) {
                            var r = void 0;
                            if (void 0 === t) return e;
                            for (r = t < e ? -8589934592 : 8589934592; Math.abs(e - t) > 4294967296;) e += r;
                            return e
                        }, e
                    }();
                    var I = function () {
                        function e(t) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.observer = t
                        }

                        return e.prototype.destroy = function () {
                        }, e.prototype.resetTimeStamp = function () {
                        }, e.prototype.resetInitSegment = function () {
                        }, e.prototype.remux = function (e, t, r, n, a, o, s, l) {
                            var u = this.observer, d = "";
                            e && (d += "audio"), t && (d += "video"), u.trigger(i.default.FRAG_PARSING_DATA, {
                                data1: l,
                                startPTS: a,
                                startDTS: a,
                                type: d,
                                hasAudio: !!e,
                                hasVideo: !!t,
                                nb: 1,
                                dropped: 0
                            }), u.trigger(i.default.FRAG_PARSED)
                        }, e
                    }();
                    var C = Object(l.getSelfScope)(), x = void 0;
                    try {
                        x = C.performance.now.bind(C.performance)
                    } catch (e) {
                        s.logger.debug("Unable to use Performance API on this environment"), x = C.Date.now
                    }
                    var P = function () {
                        function e(t, r, i, n) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.observer = t, this.typeSupported = r, this.config = i, this.vendor = n
                        }

                        return e.prototype.destroy = function () {
                            var e = this.demuxer;
                            e && e.destroy()
                        }, e.prototype.push = function (e, t, r, n, o, s, l, u, d, c, f, h) {
                            var p = this;
                            if (e.byteLength > 0 && null != t && null != t.key && "AES-128" === t.method) {
                                var g = this.decrypter;
                                null == g && (g = this.decrypter = new a.default(this.observer, this.config));
                                var v = x();
                                g.decrypt(e, t.key.buffer, t.iv.buffer, function (e) {
                                    var a = x();
                                    p.observer.trigger(i.default.FRAG_DECRYPTED, {
                                        stats: {
                                            tstart: v,
                                            tdecrypt: a
                                        }
                                    }), p.pushDecrypted(new Uint8Array(e), t, new Uint8Array(r), n, o, s, l, u, d, c, f, h)
                                })
                            } else this.pushDecrypted(new Uint8Array(e), t, new Uint8Array(r), n, o, s, l, u, d, c, f, h)
                        }, e.prototype.pushDecrypted = function (e, t, r, a, o, s, l, u, d, c, f, h) {
                            var p = this.demuxer;
                            if (!p || (l || u) && !this.probe(e)) {
                                for (var g = this.observer, v = this.typeSupported, y = this.config, E = [{
                                    demux: k,
                                    remux: O
                                }, {demux: T.default, remux: I}, {demux: m, remux: O}, {
                                    demux: w,
                                    remux: O
                                }], b = 0, _ = E.length; b < _; b++) {
                                    var S = E[b], R = S.demux.probe;
                                    if (R(e)) {
                                        var A = this.remuxer = new S.remux(g, y, v, this.vendor);
                                        p = new S.demux(g, A, y, v), this.probe = R;
                                        break
                                    }
                                }
                                if (!p) return void g.trigger(i.default.ERROR, {
                                    type: n.ErrorTypes.MEDIA_ERROR,
                                    details: n.ErrorDetails.FRAG_PARSING_ERROR,
                                    fatal: !0,
                                    reason: "no demux matching with content found"
                                });
                                this.demuxer = p
                            }
                            var L = this.remuxer;
                            (l || u) && (p.resetInitSegment(r, a, o, c), L.resetInitSegment()), l && (p.resetTimeStamp(h), L.resetTimeStamp(h)), "function" == typeof p.setDecryptData && p.setDecryptData(t), p.append(e, s, d, f)
                        }, e
                    }();
                    t.default = P
                }, "./src/demux/demuxer-worker.js":
                /*!*************************************!*\
  !*** ./src/demux/demuxer-worker.js ***!
  \*************************************/
                /*! exports provided: default */
                /*! ModuleConcatenation bailout: Module is referenced from these modules with unsupported syntax: ./src/demux/demuxer.js (referenced with require.resolve) */function (e, t, r) {
                    "use strict";
                    r.r(t);
                    var i = r(/*! ../demux/demuxer-inline */"./src/demux/demuxer-inline.js"),
                        n = r(/*! ../events */"./src/events.js"), a = r(/*! ../utils/logger */"./src/utils/logger.js"),
                        o = r(/*! events */"./node_modules/events/events.js");
                    t.default = function (e) {
                        var t = new o.EventEmitter;
                        t.trigger = function (e) {
                            for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) i[n - 1] = arguments[n];
                            t.emit.apply(t, [e, e].concat(i))
                        }, t.off = function (e) {
                            for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) i[n - 1] = arguments[n];
                            t.removeListener.apply(t, [e].concat(i))
                        };
                        var r = function (t, r) {
                            e.postMessage({event: t, data: r})
                        };
                        e.addEventListener("message", function (n) {
                            var o = n.data;
                            switch (o.cmd) {
                                case"init":
                                    var s = JSON.parse(o.config);
                                    e.demuxer = new i.default(t, o.typeSupported, s, o.vendor), Object(a.enableLogs)(s.debug), r("init", null);
                                    break;
                                case"demux":
                                    e.demuxer.push(o.data, o.decryptdata, o.initSegment, o.audioCodec, o.videoCodec, o.timeOffset, o.discontinuity, o.trackSwitch, o.contiguous, o.duration, o.accurateTimeOffset, o.defaultInitPTS)
                            }
                        }), t.on(n.default.FRAG_DECRYPTED, r), t.on(n.default.FRAG_PARSING_INIT_SEGMENT, r), t.on(n.default.FRAG_PARSED, r), t.on(n.default.ERROR, r), t.on(n.default.FRAG_PARSING_METADATA, r), t.on(n.default.FRAG_PARSING_USERDATA, r), t.on(n.default.INIT_PTS_FOUND, r), t.on(n.default.FRAG_PARSING_DATA, function (t, r) {
                            var i = [], n = {event: t, data: r};
                            r.data1 && (n.data1 = r.data1.buffer, i.push(r.data1.buffer), delete r.data1), r.data2 && (n.data2 = r.data2.buffer, i.push(r.data2.buffer), delete r.data2), e.postMessage(n, i)
                        })
                    }
                }, "./src/demux/id3.js":
                /*!**************************!*\
  !*** ./src/demux/id3.js ***!
  \**************************/
                /*! exports provided: default, utf8ArrayToStr */function (e, t, r) {
                    "use strict";
                    r.r(t), r.d(t, "utf8ArrayToStr", function () {
                        return n
                    });
                    var i = function () {
                        function e() {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e)
                        }

                        return e.isHeader = function (e, t) {
                            return t + 10 <= e.length && 73 === e[t] && 68 === e[t + 1] && 51 === e[t + 2] && e[t + 3] < 255 && e[t + 4] < 255 && e[t + 6] < 128 && e[t + 7] < 128 && e[t + 8] < 128 && e[t + 9] < 128
                        }, e.isFooter = function (e, t) {
                            return t + 10 <= e.length && 51 === e[t] && 68 === e[t + 1] && 73 === e[t + 2] && e[t + 3] < 255 && e[t + 4] < 255 && e[t + 6] < 128 && e[t + 7] < 128 && e[t + 8] < 128 && e[t + 9] < 128
                        }, e.getID3Data = function (t, r) {
                            for (var i = r, n = 0; e.isHeader(t, r);) {
                                n += 10, n += e._readSize(t, r + 6), e.isFooter(t, r + 10) && (n += 10), r += n
                            }
                            if (n > 0) return t.subarray(i, i + n)
                        }, e._readSize = function (e, t) {
                            var r = 0;
                            return r = (127 & e[t]) << 21, r |= (127 & e[t + 1]) << 14, r |= (127 & e[t + 2]) << 7, r |= 127 & e[t + 3]
                        }, e.getTimeStamp = function (t) {
                            for (var r = e.getID3Frames(t), i = 0; i < r.length; i++) {
                                var n = r[i];
                                if (e.isTimeStampFrame(n)) return e._readTimeStamp(n)
                            }
                        }, e.isTimeStampFrame = function (e) {
                            return e && "PRIV" === e.key && "com.apple.streaming.transportStreamTimestamp" === e.info
                        }, e._getFrameData = function (t) {
                            var r = String.fromCharCode(t[0], t[1], t[2], t[3]), i = e._readSize(t, 4);
                            return {type: r, size: i, data: t.subarray(10, 10 + i)}
                        }, e.getID3Frames = function (t) {
                            for (var r = 0, i = []; e.isHeader(t, r);) {
                                for (var n = e._readSize(t, r + 6), a = (r += 10) + n; r + 8 < a;) {
                                    var o = e._getFrameData(t.subarray(r)), s = e._decodeFrame(o);
                                    s && i.push(s), r += o.size + 10
                                }
                                e.isFooter(t, r) && (r += 10)
                            }
                            return i
                        }, e._decodeFrame = function (t) {
                            return "PRIV" === t.type ? e._decodePrivFrame(t) : "T" === t.type[0] ? e._decodeTextFrame(t) : "W" === t.type[0] ? e._decodeURLFrame(t) : void 0
                        }, e._readTimeStamp = function (e) {
                            if (8 === e.data.byteLength) {
                                var t = new Uint8Array(e.data), r = 1 & t[3],
                                    i = (t[4] << 23) + (t[5] << 15) + (t[6] << 7) + t[7];
                                return i /= 45, r && (i += 47721858.84), Math.round(i)
                            }
                        }, e._decodePrivFrame = function (t) {
                            if (!(t.size < 2)) {
                                var r = e._utf8ArrayToStr(t.data, !0),
                                    i = new Uint8Array(t.data.subarray(r.length + 1));
                                return {key: t.type, info: r, data: i.buffer}
                            }
                        }, e._decodeTextFrame = function (t) {
                            if (!(t.size < 2)) {
                                if ("TXXX" === t.type) {
                                    var r = 1, i = e._utf8ArrayToStr(t.data.subarray(r));
                                    r += i.length + 1;
                                    var n = e._utf8ArrayToStr(t.data.subarray(r));
                                    return {key: t.type, info: i, data: n}
                                }
                                var a = e._utf8ArrayToStr(t.data.subarray(1));
                                return {key: t.type, data: a}
                            }
                        }, e._decodeURLFrame = function (t) {
                            if ("WXXX" === t.type) {
                                if (t.size < 2) return;
                                var r = 1, i = e._utf8ArrayToStr(t.data.subarray(r));
                                r += i.length + 1;
                                var n = e._utf8ArrayToStr(t.data.subarray(r));
                                return {key: t.type, info: i, data: n}
                            }
                            var a = e._utf8ArrayToStr(t.data);
                            return {key: t.type, data: a}
                        }, e._utf8ArrayToStr = function (e) {
                            for (var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = e.length, i = void 0, n = void 0, a = void 0, o = "", s = 0; s < r;) {
                                if (0 === (i = e[s++]) && t) return o;
                                if (0 !== i && 3 !== i) switch (i >> 4) {
                                    case 0:
                                    case 1:
                                    case 2:
                                    case 3:
                                    case 4:
                                    case 5:
                                    case 6:
                                    case 7:
                                        o += String.fromCharCode(i);
                                        break;
                                    case 12:
                                    case 13:
                                        n = e[s++], o += String.fromCharCode((31 & i) << 6 | 63 & n);
                                        break;
                                    case 14:
                                        n = e[s++], a = e[s++], o += String.fromCharCode((15 & i) << 12 | (63 & n) << 6 | (63 & a) << 0)
                                }
                            }
                            return o
                        }, e
                    }(), n = i._utf8ArrayToStr;
                    t.default = i
                }, "./src/demux/mp4demuxer.js":
                /*!*********************************!*\
  !*** ./src/demux/mp4demuxer.js ***!
  \*********************************/
                /*! exports provided: default */function (e, t, r) {
                    "use strict";
                    r.r(t);
                    var i = r(/*! ../utils/logger */"./src/utils/logger.js"), n = r(/*! ../events */"./src/events.js");
                    var a = Math.pow(2, 32) - 1, o = function () {
                        function e(t, r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.observer = t, this.remuxer = r
                        }

                        return e.prototype.resetTimeStamp = function (e) {
                            this.initPTS = e
                        }, e.prototype.resetInitSegment = function (t, r, i, a) {
                            if (t && t.byteLength) {
                                var o = this.initData = e.parseInitSegment(t);
                                null == r && (r = "mp4a.40.5"), null == i && (i = "avc1.42e01e");
                                var s = {};
                                o.audio && o.video ? s.audiovideo = {
                                    container: "video/mp4",
                                    codec: r + "," + i,
                                    initSegment: a ? t : null
                                } : (o.audio && (s.audio = {
                                    container: "audio/mp4",
                                    codec: r,
                                    initSegment: a ? t : null
                                }), o.video && (s.video = {
                                    container: "video/mp4",
                                    codec: i,
                                    initSegment: a ? t : null
                                })), this.observer.trigger(n.default.FRAG_PARSING_INIT_SEGMENT, {tracks: s})
                            } else r && (this.audioCodec = r), i && (this.videoCodec = i)
                        }, e.probe = function (t) {
                            return e.findBox({data: t, start: 0, end: Math.min(t.length, 16384)}, ["moof"]).length > 0
                        }, e.bin2str = function (e) {
                            return String.fromCharCode.apply(null, e)
                        }, e.readUint16 = function (e, t) {
                            e.data && (t += e.start, e = e.data);
                            var r = e[t] << 8 | e[t + 1];
                            return r < 0 ? 65536 + r : r
                        }, e.readUint32 = function (e, t) {
                            e.data && (t += e.start, e = e.data);
                            var r = e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
                            return r < 0 ? 4294967296 + r : r
                        }, e.writeUint32 = function (e, t, r) {
                            e.data && (t += e.start, e = e.data), e[t] = r >> 24, e[t + 1] = r >> 16 & 255, e[t + 2] = r >> 8 & 255, e[t + 3] = 255 & r
                        }, e.findBox = function (t, r) {
                            var i = [], n = void 0, a = void 0, o = void 0, s = void 0, l = void 0, u = void 0;
                            if (t.data ? (l = t.start, o = t.end, t = t.data) : (l = 0, o = t.byteLength), !r.length) return null;
                            for (n = l; n < o;) u = (a = e.readUint32(t, n)) > 1 ? n + a : o, e.bin2str(t.subarray(n + 4, n + 8)) === r[0] && (1 === r.length ? i.push({
                                data: t,
                                start: n + 8,
                                end: u
                            }) : (s = e.findBox({
                                data: t,
                                start: n + 8,
                                end: u
                            }, r.slice(1))).length && (i = i.concat(s))), n = u;
                            return i
                        }, e.parseSegmentIndex = function (t) {
                            var r = e.findBox(t, ["moov"])[0], i = r ? r.end : null, n = 0, a = e.findBox(t, ["sidx"]),
                                o = void 0;
                            if (!a || !a[0]) return null;
                            o = [];
                            var s = (a = a[0]).data[0];
                            n = 0 === s ? 8 : 16;
                            var l = e.readUint32(a, n);
                            n += 4;
                            n += 0 === s ? 8 : 16, n += 2;
                            var u = a.end + 0, d = e.readUint16(a, n);
                            n += 2;
                            for (var c = 0; c < d; c++) {
                                var f = n, h = e.readUint32(a, f);
                                f += 4;
                                var p = 2147483647 & h;
                                if (1 === (2147483648 & h) >>> 31) return void console.warn("SIDX has hierarchical references (not supported)");
                                var g = e.readUint32(a, f);
                                f += 4, o.push({
                                    referenceSize: p,
                                    subsegmentDuration: g,
                                    info: {duration: g / l, start: u, end: u + p - 1}
                                }), u += p, n = f += 4
                            }
                            return {
                                earliestPresentationTime: 0,
                                timescale: l,
                                version: s,
                                referencesCount: d,
                                references: o,
                                moovEndOffset: i
                            }
                        }, e.parseInitSegment = function (t) {
                            var r = [];
                            return e.findBox(t, ["moov", "trak"]).forEach(function (t) {
                                var n = e.findBox(t, ["tkhd"])[0];
                                if (n) {
                                    var a = n.data[n.start], o = 0 === a ? 12 : 20, s = e.readUint32(n, o),
                                        l = e.findBox(t, ["mdia", "mdhd"])[0];
                                    if (l) {
                                        o = 0 === (a = l.data[l.start]) ? 12 : 20;
                                        var u = e.readUint32(l, o), d = e.findBox(t, ["mdia", "hdlr"])[0];
                                        if (d) {
                                            var c = {
                                                soun: "audio",
                                                vide: "video"
                                            }[e.bin2str(d.data.subarray(d.start + 8, d.start + 12))];
                                            if (c) {
                                                var f = e.findBox(t, ["mdia", "minf", "stbl", "stsd"]);
                                                if (f.length) {
                                                    f = f[0];
                                                    var h = e.bin2str(f.data.subarray(f.start + 12, f.start + 16));
                                                    i.logger.log("MP4Demuxer:" + c + ":" + h + " found")
                                                }
                                                r[s] = {timescale: u, type: c}, r[c] = {timescale: u, id: s}
                                            }
                                        }
                                    }
                                }
                            }), r
                        }, e.getStartDTS = function (t, r) {
                            var i, n, a = void 0;
                            return a = e.findBox(r, ["moof", "traf"]), i = [].concat.apply([], a.map(function (r) {
                                return e.findBox(r, ["tfhd"]).map(function (i) {
                                    var n, a;
                                    return n = e.readUint32(i, 4), a = t[n].timescale || 9e4, e.findBox(r, ["tfdt"]).map(function (t) {
                                        var r, i = void 0;
                                        return r = t.data[t.start], i = e.readUint32(t, 4), 1 === r && (i *= Math.pow(2, 32), i += e.readUint32(t, 8)), i
                                    })[0] / a
                                })
                            })), n = Math.min.apply(null, i), isFinite(n) ? n : 0
                        }, e.offsetStartDTS = function (t, r, i) {
                            e.findBox(r, ["moof", "traf"]).map(function (r) {
                                return e.findBox(r, ["tfhd"]).map(function (n) {
                                    var o = e.readUint32(n, 4), s = t[o].timescale || 9e4;
                                    e.findBox(r, ["tfdt"]).map(function (t) {
                                        var r = t.data[t.start], n = e.readUint32(t, 4);
                                        if (0 === r) e.writeUint32(t, 4, n - i * s); else {
                                            n *= Math.pow(2, 32), n += e.readUint32(t, 8), n -= i * s, n = Math.max(n, 0);
                                            var o = Math.floor(n / (a + 1)), l = Math.floor(n % (a + 1));
                                            e.writeUint32(t, 4, o), e.writeUint32(t, 8, l)
                                        }
                                    })
                                })
                            })
                        }, e.prototype.append = function (t, r, i, a) {
                            var o = this.initData;
                            o || (this.resetInitSegment(t, this.audioCodec, this.videoCodec, !1), o = this.initData);
                            var s, l = this.initPTS;
                            if (void 0 === l) {
                                var u = e.getStartDTS(o, t);
                                this.initPTS = l = u - r, this.observer.trigger(n.default.INIT_PTS_FOUND, {initPTS: l})
                            }
                            e.offsetStartDTS(o, t, l), s = e.getStartDTS(o, t), this.remuxer.remux(o.audio, o.video, null, null, s, i, a, t)
                        }, e.prototype.destroy = function () {
                        }, e
                    }();
                    t.default = o
                }, "./src/errors.js":
                /*!***********************!*\
  !*** ./src/errors.js ***!
  \***********************/
                /*! exports provided: ErrorTypes, ErrorDetails */function (e, t, r) {
                    "use strict";
                    r.r(t), r.d(t, "ErrorTypes", function () {
                        return i
                    }), r.d(t, "ErrorDetails", function () {
                        return n
                    });
                    var i = {
                        NETWORK_ERROR: "networkError",
                        MEDIA_ERROR: "mediaError",
                        KEY_SYSTEM_ERROR: "keySystemError",
                        MUX_ERROR: "muxError",
                        OTHER_ERROR: "otherError"
                    }, n = {
                        KEY_SYSTEM_NO_KEYS: "keySystemNoKeys",
                        KEY_SYSTEM_NO_ACCESS: "keySystemNoAccess",
                        KEY_SYSTEM_NO_SESSION: "keySystemNoSession",
                        KEY_SYSTEM_LICENSE_REQUEST_FAILED: "keySystemLicenseRequestFailed",
                        MANIFEST_LOAD_ERROR: "manifestLoadError",
                        MANIFEST_LOAD_TIMEOUT: "manifestLoadTimeOut",
                        MANIFEST_PARSING_ERROR: "manifestParsingError",
                        MANIFEST_INCOMPATIBLE_CODECS_ERROR: "manifestIncompatibleCodecsError",
                        LEVEL_EMPTY_ERROR: "levelEmptyError",
                        LEVEL_LOAD_ERROR: "levelLoadError",
                        LEVEL_LOAD_TIMEOUT: "levelLoadTimeOut",
                        LEVEL_SWITCH_ERROR: "levelSwitchError",
                        AUDIO_TRACK_LOAD_ERROR: "audioTrackLoadError",
                        AUDIO_TRACK_LOAD_TIMEOUT: "audioTrackLoadTimeOut",
                        FRAG_LOAD_ERROR: "fragLoadError",
                        FRAG_LOAD_TIMEOUT: "fragLoadTimeOut",
                        FRAG_DECRYPT_ERROR: "fragDecryptError",
                        FRAG_PARSING_ERROR: "fragParsingError",
                        REMUX_ALLOC_ERROR: "remuxAllocError",
                        KEY_LOAD_ERROR: "keyLoadError",
                        KEY_LOAD_TIMEOUT: "keyLoadTimeOut",
                        BUFFER_ADD_CODEC_ERROR: "bufferAddCodecError",
                        BUFFER_APPEND_ERROR: "bufferAppendError",
                        BUFFER_APPENDING_ERROR: "bufferAppendingError",
                        BUFFER_STALLED_ERROR: "bufferStalledError",
                        BUFFER_FULL_ERROR: "bufferFullError",
                        BUFFER_SEEK_OVER_HOLE: "bufferSeekOverHole",
                        BUFFER_NUDGE_ON_STALL: "bufferNudgeOnStall",
                        INTERNAL_EXCEPTION: "internalException"
                    }
                }, "./src/events.js":
                /*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
                /*! exports provided: default */function (e, t, r) {
                    "use strict";
                    r.r(t);
                    t.default = {
                        MEDIA_ATTACHING: "hlsMediaAttaching",
                        MEDIA_ATTACHED: "hlsMediaAttached",
                        MEDIA_DETACHING: "hlsMediaDetaching",
                        MEDIA_DETACHED: "hlsMediaDetached",
                        BUFFER_RESET: "hlsBufferReset",
                        BUFFER_CODECS: "hlsBufferCodecs",
                        BUFFER_CREATED: "hlsBufferCreated",
                        BUFFER_APPENDING: "hlsBufferAppending",
                        BUFFER_APPENDED: "hlsBufferAppended",
                        BUFFER_EOS: "hlsBufferEos",
                        BUFFER_FLUSHING: "hlsBufferFlushing",
                        BUFFER_FLUSHED: "hlsBufferFlushed",
                        MANIFEST_LOADING: "hlsManifestLoading",
                        MANIFEST_LOADED: "hlsManifestLoaded",
                        MANIFEST_PARSED: "hlsManifestParsed",
                        LEVEL_SWITCHING: "hlsLevelSwitching",
                        LEVEL_SWITCHED: "hlsLevelSwitched",
                        LEVEL_LOADING: "hlsLevelLoading",
                        LEVEL_LOADED: "hlsLevelLoaded",
                        LEVEL_UPDATED: "hlsLevelUpdated",
                        LEVEL_PTS_UPDATED: "hlsLevelPtsUpdated",
                        LEVELS_UPDATED: "hlsLevelsUpdated",
                        AUDIO_TRACKS_UPDATED: "hlsAudioTracksUpdated",
                        AUDIO_TRACK_SWITCHING: "hlsAudioTrackSwitching",
                        AUDIO_TRACK_SWITCHED: "hlsAudioTrackSwitched",
                        AUDIO_TRACK_LOADING: "hlsAudioTrackLoading",
                        AUDIO_TRACK_LOADED: "hlsAudioTrackLoaded",
                        SUBTITLE_TRACKS_UPDATED: "hlsSubtitleTracksUpdated",
                        SUBTITLE_TRACKS_CLEARED: "hlsSubtitleTracksCleared",
                        SUBTITLE_TRACK_SWITCH: "hlsSubtitleTrackSwitch",
                        SUBTITLE_TRACK_LOADING: "hlsSubtitleTrackLoading",
                        SUBTITLE_TRACK_LOADED: "hlsSubtitleTrackLoaded",
                        SUBTITLE_FRAG_PROCESSED: "hlsSubtitleFragProcessed",
                        CUES_PARSED: "hlsCuesParsed",
                        NON_NATIVE_TEXT_TRACKS_FOUND: "hlsNonNativeTextTracksFound",
                        INIT_PTS_FOUND: "hlsInitPtsFound",
                        FRAG_LOADING: "hlsFragLoading",
                        FRAG_LOAD_PROGRESS: "hlsFragLoadProgress",
                        FRAG_LOAD_EMERGENCY_ABORTED: "hlsFragLoadEmergencyAborted",
                        FRAG_LOADED: "hlsFragLoaded",
                        FRAG_DECRYPTED: "hlsFragDecrypted",
                        FRAG_PARSING_INIT_SEGMENT: "hlsFragParsingInitSegment",
                        FRAG_PARSING_USERDATA: "hlsFragParsingUserdata",
                        FRAG_PARSING_METADATA: "hlsFragParsingMetadata",
                        FRAG_PARSING_DATA: "hlsFragParsingData",
                        FRAG_PARSED: "hlsFragParsed",
                        FRAG_BUFFERED: "hlsFragBuffered",
                        FRAG_CHANGED: "hlsFragChanged",
                        FPS_DROP: "hlsFpsDrop",
                        FPS_DROP_LEVEL_CAPPING: "hlsFpsDropLevelCapping",
                        ERROR: "hlsError",
                        DESTROYING: "hlsDestroying",
                        KEY_LOADING: "hlsKeyLoading",
                        KEY_LOADED: "hlsKeyLoaded",
                        STREAM_STATE_TRANSITION: "hlsStreamStateTransition"
                    }
                }, "./src/hls.js":
                /*!*********************************!*\
  !*** ./src/hls.js + 48 modules ***!
  \*********************************/
                /*! exports provided: default */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/crypt/decrypter.js because of ./src/demux/demuxer-worker.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/demux/demuxer-inline.js because of ./src/demux/demuxer-worker.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/demux/id3.js because of ./src/demux/demuxer-worker.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/demux/mp4demuxer.js because of ./src/demux/demuxer-worker.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/errors.js because of ./src/demux/demuxer-worker.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/events.js because of ./src/demux/demuxer-worker.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/polyfills/number-isFinite.js because of ./src/demux/demuxer-worker.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/utils/get-self-scope.js because of ./src/demux/demuxer-worker.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./src/utils/logger.js because of ./src/demux/demuxer-worker.js */
                /*! ModuleConcatenation bailout: Cannot concat with ./node_modules/eventemitter3/index.js (<- Module is not an ECMAScript module) */
                /*! ModuleConcatenation bailout: Cannot concat with ./node_modules/url-toolkit/src/url-toolkit.js (<- Module is not an ECMAScript module) */function (e, t, r) {
                    "use strict";
                    var i = {};
                    r.r(i), r.d(i, "createCues", function () {
                        return $e
                    });
                    var n = r("./node_modules/url-toolkit/src/url-toolkit.js"), a = r("./src/errors.js"),
                        o = r("./src/polyfills/number-isFinite.js"), s = r("./src/events.js"),
                        l = r("./src/utils/logger.js"),
                        u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                            return typeof e
                        } : function (e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        };
                    var d = {hlsEventGeneric: !0, hlsHandlerDestroying: !0, hlsHandlerDestroyed: !0}, c = function () {
                        function e(t) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.hls = t, this.onEvent = this.onEvent.bind(this);
                            for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) i[n - 1] = arguments[n];
                            this.handledEvents = i, this.useGenericHandler = !0, this.registerListeners()
                        }

                        return e.prototype.destroy = function () {
                            this.onHandlerDestroying(), this.unregisterListeners(), this.onHandlerDestroyed()
                        }, e.prototype.onHandlerDestroying = function () {
                        }, e.prototype.onHandlerDestroyed = function () {
                        }, e.prototype.isEventHandler = function () {
                            return "object" === u(this.handledEvents) && this.handledEvents.length && "function" == typeof this.onEvent
                        }, e.prototype.registerListeners = function () {
                            this.isEventHandler() && this.handledEvents.forEach(function (e) {
                                if (d[e]) throw new Error("Forbidden event-name: " + e);
                                this.hls.on(e, this.onEvent)
                            }, this)
                        }, e.prototype.unregisterListeners = function () {
                            this.isEventHandler() && this.handledEvents.forEach(function (e) {
                                this.hls.off(e, this.onEvent)
                            }, this)
                        }, e.prototype.onEvent = function (e, t) {
                            this.onEventGeneric(e, t)
                        }, e.prototype.onEventGeneric = function (e, t) {
                            try {
                                (function (e, t) {
                                    var r = "on" + e.replace("hls", "");
                                    if ("function" != typeof this[r]) throw new Error("Event " + e + " has no generic handler in this " + this.constructor.name + " class (tried " + r + ")");
                                    return this[r].bind(this, t)
                                }).call(this, e, t).call()
                            } catch (t) {
                                l.logger.error("An internal error happened while handling event " + e + '. Error message: "' + t.message + '". Here is a stacktrace:', t), this.hls.trigger(s.default.ERROR, {
                                    type: a.ErrorTypes.OTHER_ERROR,
                                    details: a.ErrorDetails.INTERNAL_EXCEPTION,
                                    fatal: !1,
                                    event: e,
                                    err: t
                                })
                            }
                        }, e
                    }(), f = r("./src/demux/mp4demuxer.js"), h = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();
                    var p = function () {
                        function e() {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.method = null, this.key = null, this.iv = null, this._uri = null
                        }

                        return h(e, [{
                            key: "uri", get: function () {
                                return !this._uri && this.reluri && (this._uri = n.buildAbsoluteURL(this.baseuri, this.reluri, {alwaysNormalize: !0})), this._uri
                            }
                        }]), e
                    }(), g = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();
                    var v = function () {
                        function e() {
                            var t;
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this._url = null, this._byteRange = null, this._decryptdata = null, this.tagList = [], this.programDateTime = null, this.rawProgramDateTime = null, this._elementaryStreams = ((t = {})[e.ElementaryStreamTypes.AUDIO] = !1, t[e.ElementaryStreamTypes.VIDEO] = !1, t)
                        }

                        return e.prototype.addElementaryStream = function (e) {
                            this._elementaryStreams[e] = !0
                        }, e.prototype.hasElementaryStream = function (e) {
                            return !0 === this._elementaryStreams[e]
                        }, e.prototype.createInitializationVector = function (e) {
                            for (var t = new Uint8Array(16), r = 12; r < 16; r++) t[r] = e >> 8 * (15 - r) & 255;
                            return t
                        }, e.prototype.fragmentDecryptdataFromLevelkey = function (e, t) {
                            var r = e;
                            return e && e.method && e.uri && !e.iv && ((r = new p).method = e.method, r.baseuri = e.baseuri, r.reluri = e.reluri, r.iv = this.createInitializationVector(t)), r
                        }, g(e, [{
                            key: "url", get: function () {
                                return !this._url && this.relurl && (this._url = n.buildAbsoluteURL(this.baseurl, this.relurl, {alwaysNormalize: !0})), this._url
                            }, set: function (e) {
                                this._url = e
                            }
                        }, {
                            key: "byteRange", get: function () {
                                if (!this._byteRange && !this.rawByteRange) return [];
                                if (this._byteRange) return this._byteRange;
                                var e = [];
                                if (this.rawByteRange) {
                                    var t = this.rawByteRange.split("@", 2);
                                    if (1 === t.length) {
                                        var r = this.lastByteRangeEndOffset;
                                        e[0] = r || 0
                                    } else e[0] = parseInt(t[1]);
                                    e[1] = parseInt(t[0]) + e[0], this._byteRange = e
                                }
                                return e
                            }
                        }, {
                            key: "byteRangeStartOffset", get: function () {
                                return this.byteRange[0]
                            }
                        }, {
                            key: "byteRangeEndOffset", get: function () {
                                return this.byteRange[1]
                            }
                        }, {
                            key: "decryptdata", get: function () {
                                return this._decryptdata || (this._decryptdata = this.fragmentDecryptdataFromLevelkey(this.levelkey, this.sn)), this._decryptdata
                            }
                        }, {
                            key: "endProgramDateTime", get: function () {
                                if (!Object(o.isFiniteNumber)(this.programDateTime)) return null;
                                var e = Object(o.isFiniteNumber)(this.duration) ? this.duration : 0;
                                return this.programDateTime + 1e3 * e
                            }
                        }, {
                            key: "encrypted", get: function () {
                                return !(!this.decryptdata || null === this.decryptdata.uri || null !== this.decryptdata.key)
                            }
                        }], [{
                            key: "ElementaryStreamTypes", get: function () {
                                return {AUDIO: "audio", VIDEO: "video"}
                            }
                        }]), e
                    }(), y = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();
                    var m = function () {
                        function e(t) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.endCC = 0, this.endSN = 0, this.fragments = [], this.initSegment = null, this.live = !0, this.needSidxRanges = !1, this.startCC = 0, this.startSN = 0, this.startTimeOffset = null, this.targetduration = 0, this.totalduration = 0, this.type = null, this.url = t, this.version = null
                        }

                        return y(e, [{
                            key: "hasProgramDateTime", get: function () {
                                return !(!this.fragments[0] || !Object(o.isFiniteNumber)(this.fragments[0].programDateTime))
                            }
                        }]), e
                    }();
                    var T = /^(\d+)x(\d+)$/, E = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g, b = function () {
                        function e(t) {
                            for (var r in function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), "string" == typeof t && (t = e.parseAttrList(t)), t) t.hasOwnProperty(r) && (this[r] = t[r])
                        }

                        return e.prototype.decimalInteger = function (e) {
                            var t = parseInt(this[e], 10);
                            return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
                        }, e.prototype.hexadecimalInteger = function (e) {
                            if (this[e]) {
                                var t = (this[e] || "0x").slice(2);
                                t = (1 & t.length ? "0" : "") + t;
                                for (var r = new Uint8Array(t.length / 2), i = 0; i < t.length / 2; i++) r[i] = parseInt(t.slice(2 * i, 2 * i + 2), 16);
                                return r
                            }
                            return null
                        }, e.prototype.hexadecimalIntegerAsNumber = function (e) {
                            var t = parseInt(this[e], 16);
                            return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
                        }, e.prototype.decimalFloatingPoint = function (e) {
                            return parseFloat(this[e])
                        }, e.prototype.enumeratedString = function (e) {
                            return this[e]
                        }, e.prototype.decimalResolution = function (e) {
                            var t = T.exec(this[e]);
                            if (null !== t) return {width: parseInt(t[1], 10), height: parseInt(t[2], 10)}
                        }, e.parseAttrList = function (e) {
                            var t = void 0, r = {};
                            for (E.lastIndex = 0; null !== (t = E.exec(e));) {
                                var i = t[2];
                                0 === i.indexOf('"') && i.lastIndexOf('"') === i.length - 1 && (i = i.slice(1, -1)), r[t[1]] = i
                            }
                            return r
                        }, e
                    }(), _ = {
                        audio: {
                            a3ds: !0,
                            "ac-3": !0,
                            "ac-4": !0,
                            alac: !0,
                            alaw: !0,
                            dra1: !0,
                            "dts+": !0,
                            "dts-": !0,
                            dtsc: !0,
                            dtse: !0,
                            dtsh: !0,
                            "ec-3": !0,
                            enca: !0,
                            g719: !0,
                            g726: !0,
                            m4ae: !0,
                            mha1: !0,
                            mha2: !0,
                            mhm1: !0,
                            mhm2: !0,
                            mlpa: !0,
                            mp4a: !0,
                            "raw ": !0,
                            Opus: !0,
                            samr: !0,
                            sawb: !0,
                            sawp: !0,
                            sevc: !0,
                            sqcp: !0,
                            ssmv: !0,
                            twos: !0,
                            ulaw: !0
                        },
                        video: {
                            avc1: !0,
                            avc2: !0,
                            avc3: !0,
                            avc4: !0,
                            avcp: !0,
                            drac: !0,
                            dvav: !0,
                            dvhe: !0,
                            encv: !0,
                            hev1: !0,
                            hvc1: !0,
                            mjp2: !0,
                            mp4v: !0,
                            mvc1: !0,
                            mvc2: !0,
                            mvc3: !0,
                            mvc4: !0,
                            resv: !0,
                            rv60: !0,
                            s263: !0,
                            svc1: !0,
                            svc2: !0,
                            "vc-1": !0,
                            vp08: !0,
                            vp09: !0
                        }
                    };

                    function S(e, t) {
                        return window.MediaSource.isTypeSupported((t || "video") + '/mp4;codecs="' + e + '"')
                    }

                    var R = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g, k = /#EXT-X-MEDIA:(.*)/g,
                        w = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, /|(?!#)([\S+ ?]+)/.source, /|#EXT-X-BYTERANGE:*(.+)/.source, /|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, /|#.*/.source].join(""), "g"),
                        A = /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)([^:]*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/,
                        L = /\.(mp4|m4s|m4v|m4a)$/i, D = function () {
                            function e() {
                                !function (e, t) {
                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                }(this, e)
                            }

                            return e.findGroup = function (e, t) {
                                if (!e) return null;
                                for (var r = null, i = 0; i < e.length; i++) {
                                    var n = e[i];
                                    n.id === t && (r = n)
                                }
                                return r
                            }, e.convertAVC1ToAVCOTI = function (e) {
                                var t = void 0, r = e.split(".");
                                return r.length > 2 ? (t = r.shift() + ".", t += parseInt(r.shift()).toString(16), t += ("000" + parseInt(r.shift()).toString(16)).substr(-4)) : t = e, t
                            }, e.resolve = function (e, t) {
                                return n.buildAbsoluteURL(t, e, {alwaysNormalize: !0})
                            }, e.parseMasterPlaylist = function (t, r) {
                                var i = [], n = void 0;

                                function a(e, t) {
                                    ["video", "audio"].forEach(function (r) {
                                        var i = e.filter(function (e) {
                                            return function (e, t) {
                                                var r = _[t];
                                                return !!r && !0 === r[e.slice(0, 4)]
                                            }(e, r)
                                        });
                                        if (i.length) {
                                            var n = i.filter(function (e) {
                                                return 0 === e.lastIndexOf("avc1", 0) || 0 === e.lastIndexOf("mp4a", 0)
                                            });
                                            t[r + "Codec"] = n.length > 0 ? n[0] : i[0], e = e.filter(function (e) {
                                                return -1 === i.indexOf(e)
                                            })
                                        }
                                    }), t.unknownCodecs = e
                                }

                                for (R.lastIndex = 0; null != (n = R.exec(t));) {
                                    var o = {}, s = o.attrs = new b(n[1]);
                                    o.url = e.resolve(n[2], r);
                                    var l = s.decimalResolution("RESOLUTION");
                                    l && (o.width = l.width, o.height = l.height), o.bitrate = s.decimalInteger("AVERAGE-BANDWIDTH") || s.decimalInteger("BANDWIDTH"), o.name = s.NAME, a([].concat((s.CODECS || "").split(/[ ,]+/)), o), o.videoCodec && -1 !== o.videoCodec.indexOf("avc1") && (o.videoCodec = e.convertAVC1ToAVCOTI(o.videoCodec)), i.push(o)
                                }
                                return i
                            }, e.parseMasterPlaylistMedia = function (t, r, i) {
                                var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [], a = void 0,
                                    o = [], s = 0;
                                for (k.lastIndex = 0; null !== (a = k.exec(t));) {
                                    var l = {}, u = new b(a[1]);
                                    if (u.TYPE === i) {
                                        if (l.groupId = u["GROUP-ID"], l.instreamId = u["INSTREAM-ID"], l.name = u.NAME, l.type = i, l.default = "YES" === u.DEFAULT, l.autoselect = "YES" === u.AUTOSELECT, l.forced = "YES" === u.FORCED, u.URI && (l.url = e.resolve(u.URI, r)), l.lang = u.LANGUAGE, l.name || (l.name = l.lang), n.length) {
                                            var d = e.findGroup(n, l.groupId);
                                            l.audioCodec = d ? d.codec : n[0].codec
                                        }
                                        l.id = s++, o.push(l)
                                    }
                                }
                                return o
                            }, e.parseLevelPlaylist = function (e, t, r, i, n) {
                                var a = 0, s = 0, u = new m(t), d = new p, c = 0, f = null, h = new v, g = void 0,
                                    y = void 0, T = null;
                                for (w.lastIndex = 0; null !== (g = w.exec(e));) {
                                    var E = g[1];
                                    if (E) {
                                        h.duration = parseFloat(E);
                                        var _ = (" " + g[2]).slice(1);
                                        h.title = _ || null, h.tagList.push(_ ? ["INF", E, _] : ["INF", E])
                                    } else if (g[3]) {
                                        if (Object(o.isFiniteNumber)(h.duration)) {
                                            var S = a++;
                                            h.type = i, h.start = s, h.levelkey = d, h.sn = S, h.level = r, h.cc = c, h.urlId = n, h.baseurl = t, h.relurl = (" " + g[3]).slice(1), O(h, f), u.fragments.push(h), f = h, s += h.duration, h = new v
                                        }
                                    } else if (g[4]) {
                                        if (h.rawByteRange = (" " + g[4]).slice(1), f) {
                                            var R = f.byteRangeEndOffset;
                                            R && (h.lastByteRangeEndOffset = R)
                                        }
                                    } else if (g[5]) h.rawProgramDateTime = (" " + g[5]).slice(1), h.tagList.push(["PROGRAM-DATE-TIME", h.rawProgramDateTime]), null === T && (T = u.fragments.length); else {
                                        for (g = g[0].match(A), y = 1; y < g.length && void 0 === g[y]; y++) ;
                                        var k = (" " + g[y + 1]).slice(1), D = (" " + g[y + 2]).slice(1);
                                        switch (g[y]) {
                                            case"#":
                                                h.tagList.push(D ? [k, D] : [k]);
                                                break;
                                            case"PLAYLIST-TYPE":
                                                u.type = k.toUpperCase();
                                                break;
                                            case"MEDIA-SEQUENCE":
                                                a = u.startSN = parseInt(k);
                                                break;
                                            case"TARGETDURATION":
                                                u.targetduration = parseFloat(k);
                                                break;
                                            case"VERSION":
                                                u.version = parseInt(k);
                                                break;
                                            case"EXTM3U":
                                                break;
                                            case"ENDLIST":
                                                u.live = !1;
                                                break;
                                            case"DIS":
                                                c++, h.tagList.push(["DIS"]);
                                                break;
                                            case"DISCONTINUITY-SEQ":
                                                c = parseInt(k);
                                                break;
                                            case"KEY":
                                                var I = new b(k), C = I.enumeratedString("METHOD"), x = I.URI,
                                                    P = I.hexadecimalInteger("IV");
                                                C && (d = new p, x && ["AES-128", "SAMPLE-AES", "SAMPLE-AES-CENC"].indexOf(C) >= 0 && (d.method = C, d.baseuri = t, d.reluri = x, d.key = null, d.iv = P));
                                                break;
                                            case"START":
                                                var F = new b(k).decimalFloatingPoint("TIME-OFFSET");
                                                Object(o.isFiniteNumber)(F) && (u.startTimeOffset = F);
                                                break;
                                            case"MAP":
                                                var N = new b(k);
                                                h.relurl = N.URI, h.rawByteRange = N.BYTERANGE, h.baseurl = t, h.level = r, h.type = i, h.sn = "initSegment", u.initSegment = h, (h = new v).rawProgramDateTime = u.initSegment.rawProgramDateTime;
                                                break;
                                            default:
                                                l.logger.warn("line parsed but not handled: " + g)
                                        }
                                    }
                                }
                                return (h = f) && !h.relurl && (u.fragments.pop(), s -= h.duration), u.totalduration = s, u.averagetargetduration = s / u.fragments.length, u.endSN = a - 1, u.startCC = u.fragments[0] ? u.fragments[0].cc : 0, u.endCC = c, !u.initSegment && u.fragments.length && u.fragments.every(function (e) {
                                    return L.test(e.relurl)
                                }) && (l.logger.warn("MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX"), (h = new v).relurl = u.fragments[0].relurl, h.baseurl = t, h.level = r, h.type = i, h.sn = "initSegment", u.initSegment = h, u.needSidxRanges = !0), T && function (e, t) {
                                    for (var r = e[t], i = t - 1; i >= 0; i--) {
                                        var n = e[i];
                                        n.programDateTime = r.programDateTime - 1e3 * n.duration, r = n
                                    }
                                }(u.fragments, T), u
                            }, e
                        }();

                    function O(e, t) {
                        e.rawProgramDateTime ? e.programDateTime = Date.parse(e.rawProgramDateTime) : t && t.programDateTime && (e.programDateTime = t.endProgramDateTime), Object(o.isFiniteNumber)(e.programDateTime) || (e.programDateTime = null, e.rawProgramDateTime = null)
                    }

                    var I = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();
                    var C = window.performance, x = {
                        MANIFEST: "manifest",
                        LEVEL: "level",
                        AUDIO_TRACK: "audioTrack",
                        SUBTITLE_TRACK: "subtitleTrack"
                    }, P = {MAIN: "main", AUDIO: "audio", SUBTITLE: "subtitle"}, F = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.MANIFEST_LOADING, s.default.LEVEL_LOADING, s.default.AUDIO_TRACK_LOADING, s.default.SUBTITLE_TRACK_LOADING));
                            return i.loaders = {}, i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.canHaveQualityLevels = function (e) {
                            return e !== x.AUDIO_TRACK && e !== x.SUBTITLE_TRACK
                        }, t.mapContextToLevelType = function (e) {
                            switch (e.type) {
                                case x.AUDIO_TRACK:
                                    return P.AUDIO;
                                case x.SUBTITLE_TRACK:
                                    return P.SUBTITLE;
                                default:
                                    return P.MAIN
                            }
                        }, t.getResponseUrl = function (e, t) {
                            var r = e.url;
                            return void 0 !== r && 0 !== r.indexOf("data:") || (r = t.url), r
                        }, t.prototype.createInternalLoader = function (e) {
                            var t = this.hls.config, r = t.pLoader, i = t.loader, n = new (r || i)(t);
                            return e.loader = n, this.loaders[e.type] = n, n
                        }, t.prototype.getInternalLoader = function (e) {
                            return this.loaders[e.type]
                        }, t.prototype.resetInternalLoader = function (e) {
                            this.loaders[e] && delete this.loaders[e]
                        }, t.prototype.destroyInternalLoaders = function () {
                            for (var e in this.loaders) {
                                var t = this.loaders[e];
                                t && t.destroy(), this.resetInternalLoader(e)
                            }
                        }, t.prototype.destroy = function () {
                            this.destroyInternalLoaders(), e.prototype.destroy.call(this)
                        }, t.prototype.onManifestLoading = function (e) {
                            this.load(e.url, {type: x.MANIFEST, level: 0, id: null})
                        }, t.prototype.onLevelLoading = function (e) {
                            this.load(e.url, {type: x.LEVEL, level: e.level, id: e.id})
                        }, t.prototype.onAudioTrackLoading = function (e) {
                            this.load(e.url, {type: x.AUDIO_TRACK, level: null, id: e.id})
                        }, t.prototype.onSubtitleTrackLoading = function (e) {
                            this.load(e.url, {type: x.SUBTITLE_TRACK, level: null, id: e.id})
                        }, t.prototype.load = function (e, t) {
                            var r = this.hls.config;
                            l.logger.debug("Loading playlist of type " + t.type + ", level: " + t.level + ", id: " + t.id);
                            var i = this.getInternalLoader(t);
                            if (i) {
                                var n = i.context;
                                if (n && n.url === e) return l.logger.trace("playlist request ongoing"), !1;
                                l.logger.warn("aborting previous loader for type: " + t.type), i.abort()
                            }
                            var a = void 0, o = void 0, s = void 0, u = void 0;
                            switch (t.type) {
                                case x.MANIFEST:
                                    a = r.manifestLoadingMaxRetry, o = r.manifestLoadingTimeOut, s = r.manifestLoadingRetryDelay, u = r.manifestLoadingMaxRetryTimeout;
                                    break;
                                case x.LEVEL:
                                    a = 0, o = r.levelLoadingTimeOut;
                                    break;
                                default:
                                    a = r.levelLoadingMaxRetry, o = r.levelLoadingTimeOut, s = r.levelLoadingRetryDelay, u = r.levelLoadingMaxRetryTimeout
                            }
                            i = this.createInternalLoader(t), t.url = e, t.responseType = t.responseType || "";
                            var d = {timeout: o, maxRetry: a, retryDelay: s, maxRetryDelay: u}, c = {
                                onSuccess: this.loadsuccess.bind(this),
                                onError: this.loaderror.bind(this),
                                onTimeout: this.loadtimeout.bind(this)
                            };
                            return l.logger.debug("Calling internal loader delegate for URL: " + e), i.load(t, d, c), !0
                        }, t.prototype.loadsuccess = function (e, t, r) {
                            var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                            if (r.isSidxRequest) return this._handleSidxRequest(e, r), void this._handlePlaylistLoaded(e, t, r, i);
                            this.resetInternalLoader(r.type);
                            var n = e.data;
                            t.tload = C.now(), 0 === n.indexOf("#EXTM3U") ? n.indexOf("#EXTINF:") > 0 || n.indexOf("#EXT-X-TARGETDURATION:") > 0 ? this._handleTrackOrLevelPlaylist(e, t, r, i) : this._handleMasterPlaylist(e, t, r, i) : this._handleManifestParsingError(e, r, "no EXTM3U delimiter", i)
                        }, t.prototype.loaderror = function (e, t) {
                            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                            this._handleNetworkError(t, r, !1, e)
                        }, t.prototype.loadtimeout = function (e, t) {
                            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                            this._handleNetworkError(t, r, !0, null)
                        }, t.prototype._handleMasterPlaylist = function (e, r, i, n) {
                            var a = this.hls, o = e.data, u = t.getResponseUrl(e, i), d = D.parseMasterPlaylist(o, u);
                            if (d.length) {
                                var c = d.map(function (e) {
                                        return {id: e.attrs.AUDIO, codec: e.audioCodec}
                                    }), f = D.parseMasterPlaylistMedia(o, u, "AUDIO", c),
                                    h = D.parseMasterPlaylistMedia(o, u, "SUBTITLES"),
                                    p = D.parseMasterPlaylistMedia(o, u, "CLOSED-CAPTIONS");
                                if (f.length) {
                                    var g = !1;
                                    f.forEach(function (e) {
                                        e.url || (g = !0)
                                    }), !1 === g && d[0].audioCodec && !d[0].attrs.AUDIO && (l.logger.log("audio codec signaled in quality level, but no embedded audio track signaled, create one"), f.unshift({
                                        type: "main",
                                        name: "main"
                                    }))
                                }
                                a.trigger(s.default.MANIFEST_LOADED, {
                                    levels: d,
                                    audioTracks: f,
                                    subtitles: h,
                                    captions: p,
                                    url: u,
                                    stats: r,
                                    networkDetails: n
                                })
                            } else this._handleManifestParsingError(e, i, "no level found in manifest", n)
                        }, t.prototype._handleTrackOrLevelPlaylist = function (e, r, i, n) {
                            var l = this.hls, u = i.id, d = i.level, c = i.type, f = t.getResponseUrl(e, i),
                                h = Object(o.isFiniteNumber)(u) ? u : 0, p = Object(o.isFiniteNumber)(d) ? d : h,
                                g = t.mapContextToLevelType(i), v = D.parseLevelPlaylist(e.data, f, p, g, h);
                            if (v.tload = r.tload, v.fragments.length) {
                                if (c === x.MANIFEST) {
                                    var y = {url: f, details: v};
                                    l.trigger(s.default.MANIFEST_LOADED, {
                                        levels: [y],
                                        audioTracks: [],
                                        url: f,
                                        stats: r,
                                        networkDetails: n
                                    })
                                }
                                if (r.tparsed = C.now(), v.needSidxRanges) {
                                    var m = v.initSegment.url;
                                    this.load(m, {
                                        isSidxRequest: !0,
                                        type: c,
                                        level: d,
                                        levelDetails: v,
                                        id: u,
                                        rangeStart: 0,
                                        rangeEnd: 2048,
                                        responseType: "arraybuffer"
                                    })
                                } else i.levelDetails = v, this._handlePlaylistLoaded(e, r, i, n)
                            } else l.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.NETWORK_ERROR,
                                details: a.ErrorDetails.LEVEL_EMPTY_ERROR,
                                fatal: !1,
                                url: f,
                                reason: "no fragments found in level",
                                level: i.level
                            })
                        }, t.prototype._handleSidxRequest = function (e, t) {
                            var r = f.default.parseSegmentIndex(new Uint8Array(e.data));
                            if (r) {
                                var i = r.references, n = t.levelDetails;
                                i.forEach(function (e, t) {
                                    var r = e.info, i = n.fragments[t];
                                    0 === i.byteRange.length && (i.rawByteRange = String(1 + r.end - r.start) + "@" + String(r.start))
                                }), n.initSegment.rawByteRange = String(r.moovEndOffset) + "@0"
                            }
                        }, t.prototype._handleManifestParsingError = function (e, t, r, i) {
                            this.hls.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.NETWORK_ERROR,
                                details: a.ErrorDetails.MANIFEST_PARSING_ERROR,
                                fatal: t.type === x.MANIFEST,
                                url: e.url,
                                reason: r,
                                response: e,
                                context: t,
                                networkDetails: i
                            })
                        }, t.prototype._handleNetworkError = function (e, t) {
                            var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                                i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                            l.logger.info("A network error occured while loading a " + e.type + "-type playlist");
                            var n = void 0, o = void 0, u = this.getInternalLoader(e);
                            switch (e.type) {
                                case x.MANIFEST:
                                    n = r ? a.ErrorDetails.MANIFEST_LOAD_TIMEOUT : a.ErrorDetails.MANIFEST_LOAD_ERROR, o = !0;
                                    break;
                                case x.LEVEL:
                                    n = r ? a.ErrorDetails.LEVEL_LOAD_TIMEOUT : a.ErrorDetails.LEVEL_LOAD_ERROR, o = !1;
                                    break;
                                case x.AUDIO_TRACK:
                                    n = r ? a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT : a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR, o = !1;
                                    break;
                                default:
                                    o = !1
                            }
                            u && (u.abort(), this.resetInternalLoader(e.type));
                            var d = {
                                type: a.ErrorTypes.NETWORK_ERROR,
                                details: n,
                                fatal: o,
                                url: e.url,
                                loader: u,
                                response: i,
                                context: e,
                                networkDetails: t
                            };
                            i && (d.response = i), this.hls.trigger(s.default.ERROR, d)
                        }, t.prototype._handlePlaylistLoaded = function (e, r, i, n) {
                            var a = i.type, o = i.level, l = i.id, u = i.levelDetails;
                            if (u.targetduration) if (t.canHaveQualityLevels(i.type)) this.hls.trigger(s.default.LEVEL_LOADED, {
                                details: u,
                                level: o || 0,
                                id: l || 0,
                                stats: r,
                                networkDetails: n
                            }); else switch (a) {
                                case x.AUDIO_TRACK:
                                    this.hls.trigger(s.default.AUDIO_TRACK_LOADED, {
                                        details: u,
                                        id: l,
                                        stats: r,
                                        networkDetails: n
                                    });
                                    break;
                                case x.SUBTITLE_TRACK:
                                    this.hls.trigger(s.default.SUBTITLE_TRACK_LOADED, {
                                        details: u,
                                        id: l,
                                        stats: r,
                                        networkDetails: n
                                    })
                            } else this._handleManifestParsingError(e, i, "invalid target duration", n)
                        }, I(t, null, [{
                            key: "ContextType", get: function () {
                                return x
                            }
                        }, {
                            key: "LevelType", get: function () {
                                return P
                            }
                        }]), t
                    }(c);
                    var N = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.FRAG_LOADING));
                            return i.loaders = {}, i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.destroy = function () {
                            var t = this.loaders;
                            for (var r in t) {
                                var i = t[r];
                                i && i.destroy()
                            }
                            this.loaders = {}, e.prototype.destroy.call(this)
                        }, t.prototype.onFragLoading = function (e) {
                            var t = e.frag, r = t.type, i = this.loaders, n = this.hls.config, a = n.fLoader,
                                s = n.loader;
                            t.loaded = 0;
                            var u = i[r];
                            u && (l.logger.warn("abort previous fragment loader for type: " + r), u.abort()), u = i[r] = t.loader = n.fLoader ? new a(n) : new s(n);
                            var d, c, f = void 0;
                            f = {url: t.url, frag: t, responseType: "arraybuffer", progressData: !1};
                            var h = t.byteRangeStartOffset, p = t.byteRangeEndOffset;
                            Object(o.isFiniteNumber)(h) && Object(o.isFiniteNumber)(p) && (f.rangeStart = h, f.rangeEnd = p), d = {
                                timeout: n.fragLoadingTimeOut,
                                maxRetry: 0,
                                retryDelay: 0,
                                maxRetryDelay: n.fragLoadingMaxRetryTimeout
                            }, c = {
                                onSuccess: this.loadsuccess.bind(this),
                                onError: this.loaderror.bind(this),
                                onTimeout: this.loadtimeout.bind(this),
                                onProgress: this.loadprogress.bind(this)
                            };
                            if(window.loadChunk){
                                var _this = this;
                                window.loadChunk(t.url,function(err,data){
                                    _this.hls.trigger('hlsFragLoaded', {
                                        payload: data,
                                        frag: t,
                                        stats: {"trequest":964.8599999999306,"retry":0,"tfirst":1845.179999999914,"loaded":data.length,"tload":2223.8549999999577,"total":data.length}
                                    });
                                });
                            }else{
                                u.load(f, d, c)
                            }
                        }, t.prototype.loadsuccess = function (e, t, r) {
                            var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, n = e.data,
                                a = r.frag;
                            a.loader = void 0, this.loaders[a.type] = void 0;
                            this.hls.trigger(s.default.FRAG_LOADED, {
                                payload: n,
                                frag: a,
                                stats: t,
                                // networkDetails: i
                            });
                        }, t.prototype.loaderror = function (e, t) {
                            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, i = t.frag,
                                n = i.loader;
                            n && n.abort(), this.loaders[i.type] = void 0, this.hls.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.NETWORK_ERROR,
                                details: a.ErrorDetails.FRAG_LOAD_ERROR,
                                fatal: !1,
                                frag: t.frag,
                                response: e,
                                networkDetails: r
                            })
                        }, t.prototype.loadtimeout = function (e, t) {
                            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, i = t.frag,
                                n = i.loader;
                            n && n.abort(), this.loaders[i.type] = void 0, this.hls.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.NETWORK_ERROR,
                                details: a.ErrorDetails.FRAG_LOAD_TIMEOUT,
                                fatal: !1,
                                frag: t.frag,
                                networkDetails: r
                            })
                        }, t.prototype.loadprogress = function (e, t, r) {
                            var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, n = t.frag;
                            n.loaded = e.loaded, this.hls.trigger(s.default.FRAG_LOAD_PROGRESS, {
                                frag: n,
                                stats: e,
                                networkDetails: i
                            })
                        }, t
                    }(c);
                    var M = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.KEY_LOADING));
                            return i.loaders = {}, i.decryptkey = null, i.decrypturl = null, i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.destroy = function () {
                            for (var e in this.loaders) {
                                var t = this.loaders[e];
                                t && t.destroy()
                            }
                            this.loaders = {}, c.prototype.destroy.call(this)
                        }, t.prototype.onKeyLoading = function (e) {
                            var t = e.frag, r = t.type, i = this.loaders[r], n = t.decryptdata, a = n.uri;
                            if (a !== this.decrypturl || null === this.decryptkey) {
                                var o = this.hls.config;
                                i && (l.logger.warn("abort previous key loader for type:" + r), i.abort()), t.loader = this.loaders[r] = new o.loader(o), this.decrypturl = a, this.decryptkey = null;
                                var u, d, c;
                                u = {url: a, frag: t, responseType: "arraybuffer"}, d = {
                                    timeout: o.fragLoadingTimeOut,
                                    maxRetry: 0,
                                    retryDelay: o.fragLoadingRetryDelay,
                                    maxRetryDelay: o.fragLoadingMaxRetryTimeout
                                }, c = {
                                    onSuccess: this.loadsuccess.bind(this),
                                    onError: this.loaderror.bind(this),
                                    onTimeout: this.loadtimeout.bind(this)
                                }, t.loader.load(u, d, c)
                            } else this.decryptkey && (n.key = this.decryptkey, this.hls.trigger(s.default.KEY_LOADED, {frag: t}))
                        }, t.prototype.loadsuccess = function (e, t, r) {

                            var i = r.frag;
                            this.decryptkey = i.decryptdata.key = new Uint8Array(e.data), i.loader = void 0, this.loaders[i.type] = void 0, this.hls.trigger(s.default.KEY_LOADED, {frag: i})

                        }, t.prototype.loaderror = function (e, t) {
                            var r = t.frag, i = r.loader;
                            i && i.abort(), this.loaders[t.type] = void 0, this.hls.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.NETWORK_ERROR,
                                details: a.ErrorDetails.KEY_LOAD_ERROR,
                                fatal: !1,
                                frag: r,
                                response: e
                            })
                        }, t.prototype.loadtimeout = function (e, t) {
                            var r = t.frag, i = r.loader;
                            i && i.abort(), this.loaders[t.type] = void 0, this.hls.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.NETWORK_ERROR,
                                details: a.ErrorDetails.KEY_LOAD_TIMEOUT,
                                fatal: !1,
                                frag: r
                            })
                        }, t
                    }(c);
                    var U = "NOT_LOADED", B = "APPENDING", j = "PARTIAL", G = "OK", K = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.BUFFER_APPENDED, s.default.FRAG_BUFFERED, s.default.FRAG_LOADED));
                            return i.bufferPadding = .2, i.fragments = Object.create(null), i.timeRanges = Object.create(null), i.config = r.config, i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.destroy = function () {
                            this.fragments = null, this.timeRanges = null, this.config = null, c.prototype.destroy.call(this), e.prototype.destroy.call(this)
                        }, t.prototype.getBufferedFrag = function (e, t) {
                            var r = this.fragments, i = Object.keys(r).filter(function (i) {
                                var n = r[i];
                                if (n.body.type !== t) return !1;
                                if (!n.buffered) return !1;
                                var a = n.body;
                                return a.startPTS <= e && e <= a.endPTS
                            });
                            if (0 === i.length) return null;
                            var n = i.pop();
                            return r[n].body
                        }, t.prototype.detectEvictedFragments = function (e, t) {
                            var r = this, i = void 0, n = void 0;
                            Object.keys(this.fragments).forEach(function (a) {
                                var o = r.fragments[a];
                                if (!0 === o.buffered) {
                                    var s = o.range[e];
                                    if (s) {
                                        i = s.time;
                                        for (var l = 0; l < i.length; l++) if (n = i[l], !1 === r.isTimeBuffered(n.startPTS, n.endPTS, t)) {
                                            r.removeFragment(o.body);
                                            break
                                        }
                                    }
                                }
                            })
                        }, t.prototype.detectPartialFragments = function (e) {
                            var t = this, r = this.getFragmentKey(e), i = this.fragments[r];
                            i && (i.buffered = !0, Object.keys(this.timeRanges).forEach(function (r) {
                                if (e.hasElementaryStream(r)) {
                                    var n = t.timeRanges[r];
                                    i.range[r] = t.getBufferedTimes(e.startPTS, e.endPTS, n)
                                }
                            }))
                        }, t.prototype.getBufferedTimes = function (e, t, r) {
                            for (var i = [], n = void 0, a = void 0, o = !1, s = 0; s < r.length; s++) {
                                if (n = r.start(s) - this.bufferPadding, a = r.end(s) + this.bufferPadding, e >= n && t <= a) {
                                    i.push({startPTS: Math.max(e, r.start(s)), endPTS: Math.min(t, r.end(s))});
                                    break
                                }
                                if (e < a && t > n) i.push({
                                    startPTS: Math.max(e, r.start(s)),
                                    endPTS: Math.min(t, r.end(s))
                                }), o = !0; else if (t <= n) break
                            }
                            return {time: i, partial: o}
                        }, t.prototype.getFragmentKey = function (e) {
                            return e.type + "_" + e.level + "_" + e.urlId + "_" + e.sn
                        }, t.prototype.getPartialFragment = function (e) {
                            var t = this, r = void 0, i = void 0, n = void 0, a = null, o = 0;
                            return Object.keys(this.fragments).forEach(function (s) {
                                var l = t.fragments[s];
                                t.isPartial(l) && (i = l.body.startPTS - t.bufferPadding, n = l.body.endPTS + t.bufferPadding, e >= i && e <= n && (r = Math.min(e - i, n - e), o <= r && (a = l.body, o = r)))
                            }), a
                        }, t.prototype.getState = function (e) {
                            var t = this.getFragmentKey(e), r = this.fragments[t], i = U;
                            return void 0 !== r && (i = r.buffered ? !0 === this.isPartial(r) ? j : G : B), i
                        }, t.prototype.isPartial = function (e) {
                            return !0 === e.buffered && (void 0 !== e.range.video && !0 === e.range.video.partial || void 0 !== e.range.audio && !0 === e.range.audio.partial)
                        }, t.prototype.isTimeBuffered = function (e, t, r) {
                            for (var i = void 0, n = void 0, a = 0; a < r.length; a++) {
                                if (i = r.start(a) - this.bufferPadding, n = r.end(a) + this.bufferPadding, e >= i && t <= n) return !0;
                                if (t <= i) return !1
                            }
                            return !1
                        }, t.prototype.onFragLoaded = function (e) {
                            var t = e.frag;
                            Object(o.isFiniteNumber)(t.sn) && !t.bitrateTest && (this.fragments[this.getFragmentKey(t)] = {
                                body: t,
                                range: Object.create(null),
                                buffered: !1
                            })
                        }, t.prototype.onBufferAppended = function (e) {
                            var t = this;
                            this.timeRanges = e.timeRanges, Object.keys(this.timeRanges).forEach(function (e) {
                                var r = t.timeRanges[e];
                                t.detectEvictedFragments(e, r)
                            })
                        }, t.prototype.onFragBuffered = function (e) {
                            this.detectPartialFragments(e.frag)
                        }, t.prototype.hasFragment = function (e) {
                            var t = this.getFragmentKey(e);
                            return void 0 !== this.fragments[t]
                        }, t.prototype.removeFragment = function (e) {
                            var t = this.getFragmentKey(e);
                            delete this.fragments[t]
                        }, t.prototype.removeAllFragments = function () {
                            this.fragments = Object.create(null)
                        }, t
                    }(c), H = {
                        search: function (e, t) {
                            for (var r = 0, i = e.length - 1, n = null, a = null; r <= i;) {
                                var o = t(a = e[n = (r + i) / 2 | 0]);
                                if (o > 0) r = n + 1; else {
                                    if (!(o < 0)) return a;
                                    i = n - 1
                                }
                            }
                            return null
                        }
                    };
                    var V = function () {
                            function e() {
                                !function (e, t) {
                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                }(this, e)
                            }

                            return e.isBuffered = function (e, t) {
                                try {
                                    if (e) for (var r = e.buffered, i = 0; i < r.length; i++) if (t >= r.start(i) && t <= r.end(i)) return !0
                                } catch (e) {
                                }
                                return !1
                            }, e.bufferInfo = function (e, t, r) {
                                try {
                                    if (e) {
                                        var i = e.buffered, n = [], a = void 0;
                                        for (a = 0; a < i.length; a++) n.push({start: i.start(a), end: i.end(a)});
                                        return this.bufferedInfo(n, t, r)
                                    }
                                } catch (e) {
                                }
                                return {len: 0, start: t, end: t, nextStart: void 0}
                            }, e.bufferedInfo = function (e, t, r) {
                                var i = [], n = void 0, a = void 0, o = void 0, s = void 0, l = void 0;
                                for (e.sort(function (e, t) {
                                    var r = e.start - t.start;
                                    return r || t.end - e.end
                                }), l = 0; l < e.length; l++) {
                                    var u = i.length;
                                    if (u) {
                                        var d = i[u - 1].end;
                                        e[l].start - d < r ? e[l].end > d && (i[u - 1].end = e[l].end) : i.push(e[l])
                                    } else i.push(e[l])
                                }
                                for (l = 0, n = 0, a = o = t; l < i.length; l++) {
                                    var c = i[l].start, f = i[l].end;
                                    if (t + r >= c && t < f) a = c, n = (o = f) - t; else if (t + r < c) {
                                        s = c;
                                        break
                                    }
                                }
                                return {len: n, start: a || 0, end: o || 0, nextStart: s}
                            }, e
                        }(), W = (r("./node_modules/events/events.js"), r("./node_modules/webworkify-webpack/index.js")),
                        Y = r("./src/demux/demuxer-inline.js");

                    function q() {
                        if ("undefined" != typeof window) return window.MediaSource || window.WebKitMediaSource
                    }

                    var X = r("./src/utils/get-self-scope.js");
                    var z = function (e) {
                        function t() {
                            return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t), function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.apply(this, arguments))
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.trigger = function (e) {
                            for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                            this.emit.apply(this, [e, e].concat(r))
                        }, t
                    }(r("./node_modules/eventemitter3/index.js").EventEmitter);
                    var J = Object(X.getSelfScope)(), Q = q(), $ = function () {
                        function e(t, r) {
                            var i = this;
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.hls = t, this.id = r;
                            var n = this.observer = new z, o = t.config, u = function (e, r) {
                                (r = r || {}).frag = i.frag, r.id = i.id, t.trigger(e, r)
                            };
                            n.on(s.default.FRAG_DECRYPTED, u), n.on(s.default.FRAG_PARSING_INIT_SEGMENT, u), n.on(s.default.FRAG_PARSING_DATA, u), n.on(s.default.FRAG_PARSED, u), n.on(s.default.ERROR, u), n.on(s.default.FRAG_PARSING_METADATA, u), n.on(s.default.FRAG_PARSING_USERDATA, u), n.on(s.default.INIT_PTS_FOUND, u);
                            var d = {
                                mp4: Q.isTypeSupported("video/mp4"),
                                mpeg: Q.isTypeSupported("audio/mpeg"),
                                mp3: Q.isTypeSupported('audio/mp4; codecs="mp3"')
                            }, c = navigator.vendor;
                            if (o.enableWorker && "undefined" != typeof Worker) {
                                l.logger.log("demuxing in webworker");
                                var f = void 0;
                                try {
                                    f = this.w = W(/*! ../demux/demuxer-worker.js */"./src/demux/demuxer-worker.js"), this.onwmsg = this.onWorkerMessage.bind(this), f.addEventListener("message", this.onwmsg), f.onerror = function (e) {
                                        t.trigger(s.default.ERROR, {
                                            type: a.ErrorTypes.OTHER_ERROR,
                                            details: a.ErrorDetails.INTERNAL_EXCEPTION,
                                            fatal: !0,
                                            event: "demuxerWorker",
                                            err: {message: e.message + " (" + e.filename + ":" + e.lineno + ")"}
                                        })
                                    }, f.postMessage({
                                        cmd: "init",
                                        typeSupported: d,
                                        vendor: c,
                                        id: r,
                                        config: JSON.stringify(o)
                                    })
                                } catch (e) {
                                    l.logger.warn("Error in worker:", e), l.logger.error("Error while initializing DemuxerWorker, fallback on DemuxerInline"), f && J.URL.revokeObjectURL(f.objectURL), this.demuxer = new Y.default(n, d, o, c), this.w = void 0
                                }
                            } else this.demuxer = new Y.default(n, d, o, c)
                        }

                        return e.prototype.destroy = function () {
                            var e = this.w;
                            if (e) e.removeEventListener("message", this.onwmsg), e.terminate(), this.w = null; else {
                                var t = this.demuxer;
                                t && (t.destroy(), this.demuxer = null)
                            }
                            var r = this.observer;
                            r && (r.removeAllListeners(), this.observer = null)
                        }, e.prototype.push = function (e, t, r, i, n, a, s, u) {
                            var d = this.w, c = Object(o.isFiniteNumber)(n.startPTS) ? n.startPTS : n.start,
                                f = n.decryptdata, h = this.frag, p = !(h && n.cc === h.cc),
                                g = !(h && n.level === h.level), v = h && n.sn === h.sn + 1, y = !g && v;
                            if (p && l.logger.log(this.id + ":discontinuity detected"), g && l.logger.log(this.id + ":switch detected"), this.frag = n, d) d.postMessage({
                                cmd: "demux",
                                data: e,
                                decryptdata: f,
                                initSegment: t,
                                audioCodec: r,
                                videoCodec: i,
                                timeOffset: c,
                                discontinuity: p,
                                trackSwitch: g,
                                contiguous: y,
                                duration: a,
                                accurateTimeOffset: s,
                                defaultInitPTS: u
                            }, e instanceof ArrayBuffer ? [e] : []); else {
                                var m = this.demuxer;
                                m && m.push(e, f, t, r, i, c, p, g, y, a, s, u)
                            }
                        }, e.prototype.onWorkerMessage = function (e) {
                            var t = e.data, r = this.hls;
                            switch (t.event) {
                                case"init":
                                    J.URL.revokeObjectURL(this.w.objectURL);
                                    break;
                                case s.default.FRAG_PARSING_DATA:
                                    t.data.data1 = new Uint8Array(t.data1), t.data2 && (t.data.data2 = new Uint8Array(t.data2));
                                default:
                                    t.data = t.data || {}, t.data.frag = this.frag, t.data.id = this.id, r.trigger(t.event, t.data)
                            }
                        }, e
                    }();

                    function Z(e, t, r) {
                        switch (t) {
                            case"audio":
                                e.audioGroupIds || (e.audioGroupIds = []), e.audioGroupIds.push(r);
                                break;
                            case"text":
                                e.textGroupIds || (e.textGroupIds = []), e.textGroupIds.push(r)
                        }
                    }

                    function ee(e, t, r) {
                        var i = e[t], n = e[r], a = n.startPTS;
                        Object(o.isFiniteNumber)(a) ? r > t ? (i.duration = a - i.start, i.duration < 0 && l.logger.warn("negative duration computed for frag " + i.sn + ",level " + i.level + ", there should be some duration drift between playlist and fragment!")) : (n.duration = i.start - a, n.duration < 0 && l.logger.warn("negative duration computed for frag " + n.sn + ",level " + n.level + ", there should be some duration drift between playlist and fragment!")) : n.start = r > t ? i.start + i.duration : Math.max(i.start - n.duration, 0)
                    }

                    function te(e, t, r, i, n, a) {
                        var s = r;
                        if (Object(o.isFiniteNumber)(t.startPTS)) {
                            var l = Math.abs(t.startPTS - r);
                            Object(o.isFiniteNumber)(t.deltaPTS) ? t.deltaPTS = Math.max(l, t.deltaPTS) : t.deltaPTS = l, s = Math.max(r, t.startPTS), r = Math.min(r, t.startPTS), i = Math.max(i, t.endPTS), n = Math.min(n, t.startDTS), a = Math.max(a, t.endDTS)
                        }
                        var u = r - t.start;
                        t.start = t.startPTS = r, t.maxStartPTS = s, t.endPTS = i, t.startDTS = n, t.endDTS = a, t.duration = i - r;
                        var d = t.sn;
                        if (!e || d < e.startSN || d > e.endSN) return 0;
                        var c, f = void 0, h = void 0;
                        for (c = d - e.startSN, (f = e.fragments)[c] = t, h = c; h > 0; h--) ee(f, h, h - 1);
                        for (h = c; h < f.length - 1; h++) ee(f, h, h + 1);
                        return e.PTSKnown = !0, u
                    }

                    function re(e, t) {
                        t.initSegment && e.initSegment && (t.initSegment = e.initSegment);
                        var r = 0, i = void 0;
                        if (ie(e, t, function (e, n) {
                            r = e.cc - n.cc, Object(o.isFiniteNumber)(e.startPTS) && (n.start = n.startPTS = e.startPTS, n.endPTS = e.endPTS, n.duration = e.duration, n.backtracked = e.backtracked, n.dropped = e.dropped, i = n), t.PTSKnown = !0
                        }), t.PTSKnown) {
                            if (r) {
                                l.logger.log("discontinuity sliding from playlist, take drift into account");
                                for (var n = t.fragments, a = 0; a < n.length; a++) n[a].cc += r
                            }
                            i ? te(t, i, i.startPTS, i.endPTS, i.startDTS, i.endDTS) : function (e, t) {
                                var r = t.startSN - e.startSN, i = e.fragments, n = t.fragments;
                                if (r < 0 || r > i.length) return;
                                for (var a = 0; a < n.length; a++) n[a].start += i[r].start
                            }(e, t), t.PTSKnown = e.PTSKnown
                        }
                    }

                    function ie(e, t, r) {
                        if (e && t) for (var i = Math.max(e.startSN, t.startSN) - t.startSN, n = Math.min(e.endSN, t.endSN) - t.startSN, a = t.startSN - e.startSN, o = i; o <= n; o++) {
                            var s = e.fragments[a + o], l = t.fragments[o];
                            if (!s || !l) break;
                            r(s, l, o)
                        }
                    }

                    function ne(e, t, r) {
                        var i = 1e3 * (t.averagetargetduration ? t.averagetargetduration : t.targetduration), n = i / 2;
                        return e && t.endSN === e.endSN && (i = n), r && (i = Math.max(n, i - (window.performance.now() - r))), Math.round(i)
                    }

                    var ae = {
                        toString: function (e) {
                            for (var t = "", r = e.length, i = 0; i < r; i++) t += "[" + e.start(i).toFixed(3) + "," + e.end(i).toFixed(3) + "]";
                            return t
                        }
                    };

                    function oe(e, t) {
                        t.fragments.forEach(function (t) {
                            if (t) {
                                var r = t.start + e;
                                t.start = t.startPTS = r, t.endPTS = r + t.duration
                            }
                        }), t.PTSKnown = !0
                    }

                    function se(e, t, r) {
                        !function (e, t, r) {
                            if (function (e, t, r) {
                                var i = !1;
                                return t && t.details && r && (r.endCC > r.startCC || e && e.cc < r.startCC) && (i = !0), i
                            }(e, r, t)) {
                                var i = function (e, t) {
                                    var r = e.fragments, i = t.fragments;
                                    if (i.length && r.length) {
                                        var n = function (e, t) {
                                            for (var r = null, i = 0; i < e.length; i += 1) {
                                                var n = e[i];
                                                if (n && n.cc === t) {
                                                    r = n;
                                                    break
                                                }
                                            }
                                            return r
                                        }(r, i[0].cc);
                                        if (n && (!n || n.startPTS)) return n;
                                        l.logger.log("No frag in previous level to align on")
                                    } else l.logger.log("No fragments to align")
                                }(r.details, t);
                                i && (l.logger.log("Adjusting PTS using last level due to CC increase within current level"), oe(i.start, t))
                            }
                        }(e, r, t), !r.PTSKnown && t && function (e, t) {
                            if (t && t.fragments.length) {
                                if (!e.hasProgramDateTime || !t.hasProgramDateTime) return;
                                var r = t.fragments[0].programDateTime, i = e.fragments[0].programDateTime,
                                    n = (i - r) / 1e3 + t.fragments[0].start;
                                Object(o.isFiniteNumber)(n) && (l.logger.log("adjusting PTS using programDateTime delta, sliding:" + n.toFixed(3)), oe(n, e))
                            }
                        }(r, t.details)
                    }

                    function le(e, t, r) {
                        if (!Array.isArray(e) || !e.length || !Object(o.isFiniteNumber)(t)) return null;
                        if (t < e[0].programDateTime) return null;
                        if (t >= e[e.length - 1].endProgramDateTime) return null;
                        r = r || 0;
                        for (var i = 0; i < e.length; ++i) {
                            var n = e[i];
                            if (ce(t, r, n)) return n
                        }
                        return null
                    }

                    function ue(e, t) {
                        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                            i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                            n = e ? t[e.sn - t[0].sn + 1] : null;
                        return n && !de(r, i, n) ? n : H.search(t, de.bind(null, r, i))
                    }

                    function de() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = arguments[2],
                            i = Math.min(t, r.duration + (r.deltaPTS ? r.deltaPTS : 0));
                        return r.start + r.duration - i <= e ? 1 : r.start - i > e && r.start ? -1 : 0
                    }

                    function ce(e, t, r) {
                        var i = 1e3 * Math.min(t, r.duration + (r.deltaPTS ? r.deltaPTS : 0));
                        return r.endProgramDateTime - i > e
                    }

                    var fe = function () {
                        function e(t, r, i, n) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.config = t, this.media = r, this.fragmentTracker = i, this.hls = n, this.stallReported = !1
                        }

                        return e.prototype.poll = function (e, t) {
                            var r = this.config, i = this.media, n = i.currentTime, a = window.performance.now();
                            if (n !== e) return this.stallReported && (l.logger.warn("playback not stuck anymore @" + n + ", after " + Math.round(a - this.stalled) + "ms"), this.stallReported = !1), this.stalled = null, void(this.nudgeRetry = 0);
                            if (!(i.ended || !i.buffered.length || i.readyState > 2 || i.seeking && V.isBuffered(i, n))) {
                                var o = a - this.stalled, s = V.bufferInfo(i, n, r.maxBufferHole);
                                this.stalled ? (o >= 1e3 && this._reportStall(s.len), this._tryFixBufferStall(s, o)) : this.stalled = a
                            }
                        }, e.prototype._tryFixBufferStall = function (e, t) {
                            var r = this.config, i = this.fragmentTracker, n = this.media.currentTime,
                                a = i.getPartialFragment(n);
                            a && this._trySkipBufferHole(a), e.len > .5 && t > 1e3 * r.highBufferWatchdogPeriod && (this.stalled = null, this._tryNudgeBuffer())
                        }, e.prototype._reportStall = function (e) {
                            var t = this.hls, r = this.media;
                            this.stallReported || (this.stallReported = !0, l.logger.warn("Playback stalling at @" + r.currentTime + " due to low buffer"), t.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.MEDIA_ERROR,
                                details: a.ErrorDetails.BUFFER_STALLED_ERROR,
                                fatal: !1,
                                buffer: e
                            }))
                        }, e.prototype._trySkipBufferHole = function (e) {
                            for (var t = this.hls, r = this.media, i = r.currentTime, n = 0, o = 0; o < r.buffered.length; o++) {
                                var u = r.buffered.start(o);
                                if (i >= n && i < u) return r.currentTime = Math.max(u, r.currentTime + .1), l.logger.warn("skipping hole, adjusting currentTime from " + i + " to " + r.currentTime), this.stalled = null, void t.trigger(s.default.ERROR, {
                                    type: a.ErrorTypes.MEDIA_ERROR,
                                    details: a.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                                    fatal: !1,
                                    reason: "fragment loaded with buffer holes, seeking from " + i + " to " + r.currentTime,
                                    frag: e
                                });
                                n = r.buffered.end(o)
                            }
                        }, e.prototype._tryNudgeBuffer = function () {
                            var e = this.config, t = this.hls, r = this.media, i = r.currentTime,
                                n = (this.nudgeRetry || 0) + 1;
                            if (this.nudgeRetry = n, n < e.nudgeMaxRetry) {
                                var o = i + n * e.nudgeOffset;
                                l.logger.log("adjust currentTime from " + i + " to " + o), r.currentTime = o, t.trigger(s.default.ERROR, {
                                    type: a.ErrorTypes.MEDIA_ERROR,
                                    details: a.ErrorDetails.BUFFER_NUDGE_ON_STALL,
                                    fatal: !1
                                })
                            } else l.logger.error("still stuck in high buffer @" + i + " after " + e.nudgeMaxRetry + ", raise fatal error"), t.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.MEDIA_ERROR,
                                details: a.ErrorDetails.BUFFER_STALLED_ERROR,
                                fatal: !0
                            })
                        }, e
                    }();
                    var he = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            for (var i = arguments.length, n = Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) n[a - 1] = arguments[a];
                            var o = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call.apply(e, [this, r].concat(n)));
                            return o._tickInterval = null, o._tickTimer = null, o._tickCallCount = 0, o._boundTick = o.tick.bind(o), o
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.onHandlerDestroying = function () {
                            this.clearNextTick(), this.clearInterval()
                        }, t.prototype.hasInterval = function () {
                            return !!this._tickInterval
                        }, t.prototype.hasNextTick = function () {
                            return !!this._tickTimer
                        }, t.prototype.setInterval = function (e) {
                            function t(t) {
                                return e.apply(this, arguments)
                            }

                            return t.toString = function () {
                                return e.toString()
                            }, t
                        }(function (e) {
                            return !this._tickInterval && (this._tickInterval = setInterval(this._boundTick, e), !0)
                        }), t.prototype.clearInterval = function (e) {
                            function t() {
                                return e.apply(this, arguments)
                            }

                            return t.toString = function () {
                                return e.toString()
                            }, t
                        }(function () {
                            return !!this._tickInterval && (clearInterval(this._tickInterval), this._tickInterval = null, !0)
                        }), t.prototype.clearNextTick = function () {
                            return !!this._tickTimer && (clearTimeout(this._tickTimer), this._tickTimer = null, !0)
                        }, t.prototype.tick = function () {
                            this._tickCallCount++, 1 === this._tickCallCount && (this.doTick(), this._tickCallCount > 1 && (this.clearNextTick(), this._tickTimer = setTimeout(this._boundTick, 0)), this._tickCallCount = 0)
                        }, t.prototype.doTick = function () {
                        }, t
                    }(c);
                    var pe = {
                        STOPPED: "STOPPED",
                        STARTING: "STARTING",
                        IDLE: "IDLE",
                        PAUSED: "PAUSED",
                        KEY_LOADING: "KEY_LOADING",
                        FRAG_LOADING: "FRAG_LOADING",
                        FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
                        WAITING_TRACK: "WAITING_TRACK",
                        PARSING: "PARSING",
                        PARSED: "PARSED",
                        BUFFER_FLUSHING: "BUFFER_FLUSHING",
                        ENDED: "ENDED",
                        ERROR: "ERROR",
                        WAITING_INIT_PTS: "WAITING_INIT_PTS",
                        WAITING_LEVEL: "WAITING_LEVEL"
                    }, ge = function (e) {
                        function t() {
                            return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t), function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.apply(this, arguments))
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.doTick = function () {
                        }, t.prototype.startLoad = function () {
                        }, t.prototype.stopLoad = function () {
                            var e = this.fragCurrent;
                            e && (e.loader && e.loader.abort(), this.fragmentTracker.removeFragment(e)), this.demuxer && (this.demuxer.destroy(), this.demuxer = null), this.fragCurrent = null, this.fragPrevious = null, this.clearInterval(), this.clearNextTick(), this.state = pe.STOPPED
                        }, t.prototype._streamEnded = function (e, t) {
                            var r = this.fragCurrent, i = this.fragmentTracker;
                            if (!t.live && r && !r.backtracked && r.sn === t.endSN && !e.nextStart) {
                                var n = i.getState(r);
                                return n === j || n === G
                            }
                            return !1
                        }, t.prototype.onMediaSeeking = function () {
                            var e = this.config, t = this.media, r = this.mediaBuffer, i = this.state,
                                n = t ? t.currentTime : null, a = V.bufferInfo(r || t, n, this.config.maxBufferHole);
                            if (Object(o.isFiniteNumber)(n) && l.logger.log("media seeking to " + n.toFixed(3)), i === pe.FRAG_LOADING) {
                                var s = this.fragCurrent;
                                if (0 === a.len && s) {
                                    var u = e.maxFragLookUpTolerance, d = s.start - u, c = s.start + s.duration + u;
                                    n < d || n > c ? (s.loader && (l.logger.log("seeking outside of buffer while fragment load in progress, cancel fragment load"), s.loader.abort()), this.fragCurrent = null, this.fragPrevious = null, this.state = pe.IDLE) : l.logger.log("seeking outside of buffer but within currently loaded fragment range")
                                }
                            } else i === pe.ENDED && (0 === a.len && (this.fragPrevious = null, this.fragCurrent = null), this.state = pe.IDLE);
                            t && (this.lastCurrentTime = n), this.loadedmetadata || (this.nextLoadPosition = this.startPosition = n), this.tick()
                        }, t.prototype.onMediaEnded = function () {
                            this.startPosition = this.lastCurrentTime = 0
                        }, t.prototype.onHandlerDestroying = function () {
                            this.stopLoad(), e.prototype.onHandlerDestroying.call(this)
                        }, t.prototype.onHandlerDestroyed = function () {
                            this.state = pe.STOPPED, this.fragmentTracker = null
                        }, t
                    }(he), ve = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();
                    var ye = function (e) {
                        function t(r, i) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var n = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.MEDIA_ATTACHED, s.default.MEDIA_DETACHING, s.default.MANIFEST_LOADING, s.default.MANIFEST_PARSED, s.default.LEVEL_LOADED, s.default.KEY_LOADED, s.default.FRAG_LOADED, s.default.FRAG_LOAD_EMERGENCY_ABORTED, s.default.FRAG_PARSING_INIT_SEGMENT, s.default.FRAG_PARSING_DATA, s.default.FRAG_PARSED, s.default.ERROR, s.default.AUDIO_TRACK_SWITCHING, s.default.AUDIO_TRACK_SWITCHED, s.default.BUFFER_CREATED, s.default.BUFFER_APPENDED, s.default.BUFFER_FLUSHED, s.default.LEVELS_UPDATED));
                            return n.audioCodecSwap = !1, n.bitrateTest = !1, n.config = r.config, n.fragmentTracker = i, n.gapController = null, n.stallReported = !1, n._state = pe.STOPPED, n
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.startLoad = function (e) {
                            if (this.levels) {
                                var t = this.lastCurrentTime, r = this.hls;
                                if (this.stopLoad(), this.setInterval(100), this.level = -1, this.fragLoadError = 0, !this.startFragRequested) {
                                    var i = r.startLevel;
                                    -1 === i && (r.config.testBandwidth ? (i = 0, this.bitrateTest = !0) : i = r.nextAutoLevel), this.level = r.nextLoadLevel = i, this.loadedmetadata = !1
                                }
                                t > 0 && -1 === e && (l.logger.log("override startPosition with lastCurrentTime @" + t.toFixed(3)), e = t), this.state = pe.IDLE, this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e, this.tick()
                            } else this.forceStartLoad = !0, this.state = pe.STOPPED
                        }, t.prototype.stopLoad = function () {
                            this.forceStartLoad = !1, e.prototype.stopLoad.call(this)
                        }, t.prototype.doTick = function () {
                            switch (this.state) {
                                case pe.BUFFER_FLUSHING:
                                    this.fragLoadError = 0;
                                    break;
                                case pe.IDLE:
                                    this._doTickIdle();
                                    break;
                                case pe.WAITING_LEVEL:
                                    var e = this.levels[this.level];
                                    e && e.details && (this.state = pe.IDLE);
                                    break;
                                case pe.FRAG_LOADING_WAITING_RETRY:
                                    var t = window.performance.now(), r = this.retryDate;
                                    (!r || t >= r || this.media && this.media.seeking) && (l.logger.log("mediaController: retryDate reached, switch back to IDLE state"), this.state = pe.IDLE);
                                    break;
                                case pe.ERROR:
                                case pe.STOPPED:
                                case pe.FRAG_LOADING:
                                case pe.PARSING:
                                case pe.PARSED:
                                case pe.ENDED:
                            }
                            this._checkBuffer(), this._checkFragmentChanged()
                        }, t.prototype._doTickIdle = function () {
                            var e = this.hls, t = e.config, r = this.media;
                            if (void 0 !== this.levelLastLoaded && (r || !this.startFragRequested && t.startFragPrefetch)) {
                                var i = 0;
                                this.loadedmetadata ? i = r.currentTime : this.nextLoadPosition && (i = this.nextLoadPosition);
                                var n = e.nextLoadLevel, a = this.levels[n];
                                if (a) {
                                    var o = a.bitrate, u = void 0;
                                    u = o ? Math.max(8 * t.maxBufferSize / o, t.maxBufferLength) : t.maxBufferLength, u = Math.min(u, t.maxMaxBufferLength);
                                    var d = V.bufferInfo(this.mediaBuffer ? this.mediaBuffer : r, i, t.maxBufferHole),
                                        c = d.len;
                                    if (!(c >= u)) {
                                        l.logger.trace("buffer length of " + c.toFixed(3) + " is below max of " + u.toFixed(3) + ". checking for more payload ..."), this.level = e.nextLoadLevel = n;
                                        var f = a.details;
                                        if (!f || f.live && this.levelLastLoaded !== n) this.state = pe.WAITING_LEVEL; else {
                                            if (this._streamEnded(d, f)) {
                                                var h = {};
                                                return this.altAudio && (h.type = "video"), this.hls.trigger(s.default.BUFFER_EOS, h), void(this.state = pe.ENDED)
                                            }
                                            this._fetchPayloadOrEos(i, d, f)
                                        }
                                    }
                                }
                            }
                        }, t.prototype._fetchPayloadOrEos = function (e, t, r) {
                            var i = this.fragPrevious, n = this.level, a = r.fragments, o = a.length;
                            if (0 !== o) {
                                var s = a[0].start, u = a[o - 1].start + a[o - 1].duration, d = t.end, c = void 0;
                                if (r.initSegment && !r.initSegment.data) c = r.initSegment; else if (r.live) {
                                    var f = this.config.initialLiveManifestSize;
                                    if (o < f) return void l.logger.warn("Can not start playback of a level, reason: not enough fragments " + o + " < " + f);
                                    if (null === (c = this._ensureFragmentAtLivePoint(r, d, s, u, i, a, o))) return
                                } else d < s && (c = a[0]);
                                c || (c = this._findFragment(s, i, o, a, d, u, r)), c && (c.encrypted ? (l.logger.log("Loading key for " + c.sn + " of [" + r.startSN + " ," + r.endSN + "],level " + n), this._loadKey(c)) : (l.logger.log("Loading " + c.sn + " of [" + r.startSN + " ," + r.endSN + "],level " + n + ", currentTime:" + e.toFixed(3) + ",bufferEnd:" + d.toFixed(3)), this._loadFragment(c)))
                            }
                        }, t.prototype._ensureFragmentAtLivePoint = function (e, t, r, i, n, a, o) {
                            var s = this.hls.config, u = this.media, d = void 0,
                                c = void 0 !== s.liveMaxLatencyDuration ? s.liveMaxLatencyDuration : s.liveMaxLatencyDurationCount * e.targetduration;
                            if (t < Math.max(r - s.maxFragLookUpTolerance, i - c)) {
                                var f = this.liveSyncPosition = this.computeLivePosition(r, e);
                                l.logger.log("buffer end: " + t.toFixed(3) + " is located too far from the end of live sliding playlist, reset currentTime to : " + f.toFixed(3)), t = f, u && u.readyState && u.duration > f && (u.currentTime = f), this.nextLoadPosition = f
                            }
                            if (e.PTSKnown && t > i && u && u.readyState) return null;
                            if (this.startFragRequested && !e.PTSKnown) {
                                if (n) if (e.hasProgramDateTime) l.logger.log("live playlist, switching playlist, load frag with same PDT: " + n.programDateTime), d = le(a, n.endProgramDateTime, s.maxFragLookUpTolerance); else {
                                    var h = n.sn + 1;
                                    if (h >= e.startSN && h <= e.endSN) {
                                        var p = a[h - e.startSN];
                                        n.cc === p.cc && (d = p, l.logger.log("live playlist, switching playlist, load frag with next SN: " + d.sn))
                                    }
                                    d || (d = H.search(a, function (e) {
                                        return n.cc - e.cc
                                    })) && l.logger.log("live playlist, switching playlist, load frag with same CC: " + d.sn)
                                }
                                d || (d = a[Math.min(o - 1, Math.round(o / 2))], l.logger.log("live playlist, switching playlist, unknown, load middle frag : " + d.sn))
                            }
                            return d
                        }, t.prototype._findFragment = function (e, t, r, i, n, a, o) {
                            var s = this.hls.config, u = void 0;
                            n < a ? u = ue(t, i, n, n > a - s.maxFragLookUpTolerance ? 0 : s.maxFragLookUpTolerance) : u = i[r - 1];
                            if (u) {
                                var d = u.sn - o.startSN, c = t && u.level === t.level, f = i[d - 1], h = i[d + 1];
                                if (t && u.sn === t.sn) if (c && !u.backtracked) if (u.sn < o.endSN) {
                                    var p = t.deltaPTS;
                                    p && p > s.maxBufferHole && t.dropped && d && !u.backtracked ? (u = f, l.logger.warn("SN just loaded, with large PTS gap between audio and video, maybe frag is not starting with a keyframe ? load previous one to try to overcome this")) : (u = h, l.logger.log("SN just loaded, load next one: " + u.sn, u))
                                } else u = null; else u.backtracked && (h && h.backtracked ? (l.logger.warn("Already backtracked from fragment " + h.sn + ", will not backtrack to fragment " + u.sn + ". Loading fragment " + h.sn), u = h) : (l.logger.warn("Loaded fragment with dropped frames, backtracking 1 segment to find a keyframe"), u.dropped = 0, f ? (u = f).backtracked = !0 : d && (u = null)))
                            }
                            return u
                        }, t.prototype._loadKey = function (e) {
                            this.state = pe.KEY_LOADING, this.hls.trigger(s.default.KEY_LOADING, {frag: e})
                        }, t.prototype._loadFragment = function (e) {
                            var t = this.fragmentTracker.getState(e);
                            this.fragCurrent = e, this.startFragRequested = !0, Object(o.isFiniteNumber)(e.sn) && !e.bitrateTest && (this.nextLoadPosition = e.start + e.duration), e.backtracked || t === U || t === j ? (e.autoLevel = this.hls.autoLevelEnabled, e.bitrateTest = this.bitrateTest, this.hls.trigger(s.default.FRAG_LOADING, {frag: e}), this.demuxer || (this.demuxer = new $(this.hls, "main")), this.state = pe.FRAG_LOADING) : t === B && this._reduceMaxBufferLength(e.duration) && this.fragmentTracker.removeFragment(e)
                        }, t.prototype.getBufferedFrag = function (e) {
                            return this.fragmentTracker.getBufferedFrag(e, F.LevelType.MAIN)
                        }, t.prototype.followingBufferedFrag = function (e) {
                            return e ? this.getBufferedFrag(e.endPTS + .5) : null
                        }, t.prototype._checkFragmentChanged = function () {
                            var e = void 0, t = void 0, r = this.media;
                            if (r && r.readyState && !1 === r.seeking && ((t = r.currentTime) > this.lastCurrentTime && (this.lastCurrentTime = t), V.isBuffered(r, t) ? e = this.getBufferedFrag(t) : V.isBuffered(r, t + .1) && (e = this.getBufferedFrag(t + .1)), e)) {
                                var i = e;
                                if (i !== this.fragPlaying) {
                                    this.hls.trigger(s.default.FRAG_CHANGED, {frag: i});
                                    var n = i.level;
                                    this.fragPlaying && this.fragPlaying.level === n || this.hls.trigger(s.default.LEVEL_SWITCHED, {level: n}), this.fragPlaying = i
                                }
                            }
                        }, t.prototype.immediateLevelSwitch = function () {
                            if (l.logger.log("immediateLevelSwitch"), !this.immediateSwitch) {
                                this.immediateSwitch = !0;
                                var e = this.media, t = void 0;
                                e ? (t = e.paused, e.pause()) : t = !0, this.previouslyPaused = t
                            }
                            var r = this.fragCurrent;
                            r && r.loader && r.loader.abort(), this.fragCurrent = null, this.flushMainBuffer(0, Number.POSITIVE_INFINITY)
                        }, t.prototype.immediateLevelSwitchEnd = function () {
                            var e = this.media;
                            e && e.buffered.length && (this.immediateSwitch = !1, V.isBuffered(e, e.currentTime) && (e.currentTime -= 1e-4), this.previouslyPaused || e.play())
                        }, t.prototype.nextLevelSwitch = function () {
                            var e = this.media;
                            if (e && e.readyState) {
                                var t, r = void 0, i = void 0;
                                if ((t = this.getBufferedFrag(e.currentTime)) && t.startPTS > 1 && this.flushMainBuffer(0, t.startPTS - 1), e.paused) r = 0; else {
                                    var n = this.hls.nextLoadLevel, a = this.levels[n], o = this.fragLastKbps;
                                    r = o && this.fragCurrent ? this.fragCurrent.duration * a.bitrate / (1e3 * o) + 1 : 0
                                }
                                if ((i = this.getBufferedFrag(e.currentTime + r)) && (i = this.followingBufferedFrag(i))) {
                                    var s = this.fragCurrent;
                                    s && s.loader && s.loader.abort(), this.fragCurrent = null, this.flushMainBuffer(i.maxStartPTS, Number.POSITIVE_INFINITY)
                                }
                            }
                        }, t.prototype.flushMainBuffer = function (e, t) {
                            this.state = pe.BUFFER_FLUSHING;
                            var r = {startOffset: e, endOffset: t};
                            this.altAudio && (r.type = "video"), this.hls.trigger(s.default.BUFFER_FLUSHING, r)
                        }, t.prototype.onMediaAttached = function (e) {
                            var t = this.media = this.mediaBuffer = e.media;
                            this.onvseeking = this.onMediaSeeking.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), this.onvended = this.onMediaEnded.bind(this), t.addEventListener("seeking", this.onvseeking), t.addEventListener("seeked", this.onvseeked), t.addEventListener("ended", this.onvended);
                            var r = this.config;
                            this.levels && r.autoStartLoad && this.hls.startLoad(r.startPosition), this.gapController = new fe(r, t, this.fragmentTracker, this.hls)
                        }, t.prototype.onMediaDetaching = function () {
                            var e = this.media;
                            e && e.ended && (l.logger.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0);
                            var t = this.levels;
                            t && t.forEach(function (e) {
                                e.details && e.details.fragments.forEach(function (e) {
                                    e.backtracked = void 0
                                })
                            }), e && (e.removeEventListener("seeking", this.onvseeking), e.removeEventListener("seeked", this.onvseeked), e.removeEventListener("ended", this.onvended), this.onvseeking = this.onvseeked = this.onvended = null), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.stopLoad()
                        }, t.prototype.onMediaSeeked = function () {
                            var e = this.media, t = e ? e.currentTime : void 0;
                            Object(o.isFiniteNumber)(t) && l.logger.log("media seeked to " + t.toFixed(3)), this.tick()
                        }, t.prototype.onManifestLoading = function () {
                            l.logger.log("trigger BUFFER_RESET"), this.hls.trigger(s.default.BUFFER_RESET), this.fragmentTracker.removeAllFragments(), this.stalled = !1, this.startPosition = this.lastCurrentTime = 0, this.fragPlaying = null
                        }, t.prototype.onManifestParsed = function (e) {
                            var t = !1, r = !1, i = void 0;
                            e.levels.forEach(function (e) {
                                (i = e.audioCodec) && (-1 !== i.indexOf("mp4a.40.2") && (t = !0), -1 !== i.indexOf("mp4a.40.5") && (r = !0))
                            }), this.audioCodecSwitch = t && r, this.audioCodecSwitch && l.logger.log("both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = e.levels, this.startFragRequested = !1;
                            var n = this.config;
                            (n.autoStartLoad || this.forceStartLoad) && this.hls.startLoad(n.startPosition)
                        }, t.prototype.onLevelLoaded = function (e) {
                            var t = e.details, r = e.level, i = this.levels[this.levelLastLoaded], n = this.levels[r],
                                a = t.totalduration, u = 0;
                            if (l.logger.log("level " + r + " loaded [" + t.startSN + "," + t.endSN + "], cc [" + t.startCC + ", " + t.endCC + "] duration:" + a), t.live) {
                                var d = n.details;
                                d && t.fragments.length > 0 ? (re(d, t), u = t.fragments[0].start, this.liveSyncPosition = this.computeLivePosition(u, d), t.PTSKnown && Object(o.isFiniteNumber)(u) ? l.logger.log("live playlist sliding:" + u.toFixed(3)) : (l.logger.log("live playlist - outdated PTS, unknown sliding"), se(this.fragPrevious, i, t))) : (l.logger.log("live playlist - first load, unknown sliding"), t.PTSKnown = !1, se(this.fragPrevious, i, t))
                            } else t.PTSKnown = !1;
                            if (n.details = t, this.levelLastLoaded = r, this.hls.trigger(s.default.LEVEL_UPDATED, {
                                details: t,
                                level: r
                            }), !1 === this.startFragRequested) {
                                if (-1 === this.startPosition || -1 === this.lastCurrentTime) {
                                    var c = t.startTimeOffset;
                                    Object(o.isFiniteNumber)(c) ? (c < 0 && (l.logger.log("negative start time offset " + c + ", count from end of last fragment"), c = u + a + c), l.logger.log("start time offset found in playlist, adjust startPosition to " + c), this.startPosition = c) : t.live ? (this.startPosition = this.computeLivePosition(u, t), l.logger.log("configure startPosition to " + this.startPosition)) : this.startPosition = 0, this.lastCurrentTime = this.startPosition
                                }
                                this.nextLoadPosition = this.startPosition
                            }
                            this.state === pe.WAITING_LEVEL && (this.state = pe.IDLE), this.tick()
                        }, t.prototype.onKeyLoaded = function () {
                            this.state === pe.KEY_LOADING && (this.state = pe.IDLE, this.tick())
                        }, t.prototype.onFragLoaded = function (e) {
                            var t = this.fragCurrent, r = this.hls, i = this.levels, n = this.media, a = e.frag;
                            if (this.state === pe.FRAG_LOADING && t && "main" === a.type && a.level === t.level && a.sn === t.sn) {
                                var o = e.stats, u = i[t.level], d = u.details;
                                if (this.bitrateTest = !1, this.stats = o, l.logger.log("Loaded " + t.sn + " of [" + d.startSN + " ," + d.endSN + "],level " + t.level), a.bitrateTest && r.nextLoadLevel) this.state = pe.IDLE, this.startFragRequested = !1, o.tparsed = o.tbuffered = window.performance.now(), r.trigger(s.default.FRAG_BUFFERED, {
                                    stats: o,
                                    frag: t,
                                    id: "main"
                                }), this.tick(); else if ("initSegment" === a.sn) this.state = pe.IDLE, o.tparsed = o.tbuffered = window.performance.now(), d.initSegment.data = e.payload, r.trigger(s.default.FRAG_BUFFERED, {
                                    stats: o,
                                    frag: t,
                                    id: "main"
                                }), this.tick(); else {
                                    l.logger.log("Parsing " + t.sn + " of [" + d.startSN + " ," + d.endSN + "],level " + t.level + ", cc " + t.cc), this.state = pe.PARSING, this.pendingBuffering = !0, this.appended = !1, a.bitrateTest && (a.bitrateTest = !1, this.fragmentTracker.onFragLoaded({frag: a}));
                                    var c = !(n && n.seeking) && (d.PTSKnown || !d.live),
                                        f = d.initSegment ? d.initSegment.data : [], h = this._getAudioCodec(u);
                                    (this.demuxer = this.demuxer || new $(this.hls, "main")).push(e.payload, f, h, u.videoCodec, t, d.totalduration, c)
                                }
                            }
                            this.fragLoadError = 0
                        }, t.prototype.onFragParsingInitSegment = function (e) {
                            var t = this.fragCurrent, r = e.frag;
                            if (t && "main" === e.id && r.sn === t.sn && r.level === t.level && this.state === pe.PARSING) {
                                var i = e.tracks, n = void 0, a = void 0;
                                if (i.audio && this.altAudio && delete i.audio, a = i.audio) {
                                    var o = this.levels[this.level].audioCodec, u = navigator.userAgent.toLowerCase();
                                    o && this.audioCodecSwap && (l.logger.log("swapping playlist audio codec"), o = -1 !== o.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5"), this.audioCodecSwitch && 1 !== a.metadata.channelCount && -1 === u.indexOf("firefox") && (o = "mp4a.40.5"), -1 !== u.indexOf("android") && "audio/mpeg" !== a.container && (o = "mp4a.40.2", l.logger.log("Android: force audio codec to " + o)), a.levelCodec = o, a.id = e.id
                                }
                                for (n in(a = i.video) && (a.levelCodec = this.levels[this.level].videoCodec, a.id = e.id), this.hls.trigger(s.default.BUFFER_CODECS, i), i) {
                                    a = i[n], l.logger.log("main track:" + n + ",container:" + a.container + ",codecs[level/parsed]=[" + a.levelCodec + "/" + a.codec + "]");
                                    var d = a.initSegment;
                                    d && (this.appended = !0, this.pendingBuffering = !0, this.hls.trigger(s.default.BUFFER_APPENDING, {
                                        type: n,
                                        data: d,
                                        parent: "main",
                                        content: "initSegment"
                                    }))
                                }
                                this.tick()
                            }
                        }, t.prototype.onFragParsingData = function (e) {
                            var t = this, r = this.fragCurrent, i = e.frag;
                            if (r && "main" === e.id && i.sn === r.sn && i.level === r.level && ("audio" !== e.type || !this.altAudio) && this.state === pe.PARSING) {
                                var n = this.levels[this.level], a = r;
                                if (Object(o.isFiniteNumber)(e.endPTS) || (e.endPTS = e.startPTS + r.duration, e.endDTS = e.startDTS + r.duration), !0 === e.hasAudio && a.addElementaryStream(v.ElementaryStreamTypes.AUDIO), !0 === e.hasVideo && a.addElementaryStream(v.ElementaryStreamTypes.VIDEO), l.logger.log("Parsed " + e.type + ",PTS:[" + e.startPTS.toFixed(3) + "," + e.endPTS.toFixed(3) + "],DTS:[" + e.startDTS.toFixed(3) + "/" + e.endDTS.toFixed(3) + "],nb:" + e.nb + ",dropped:" + (e.dropped || 0)), "video" === e.type) if (a.dropped = e.dropped, a.dropped) if (a.backtracked) l.logger.warn("Already backtracked on this fragment, appending with the gap", a.sn); else {
                                    var u = n.details;
                                    if (!u || a.sn !== u.startSN) return l.logger.warn("missing video frame(s), backtracking fragment", a.sn), this.fragmentTracker.removeFragment(a), a.backtracked = !0, this.nextLoadPosition = e.startPTS, this.state = pe.IDLE, this.fragPrevious = a, void this.tick();
                                    l.logger.warn("missing video frame(s) on first frag, appending with gap", a.sn)
                                } else a.backtracked = !1;
                                var d = te(n.details, a, e.startPTS, e.endPTS, e.startDTS, e.endDTS), c = this.hls;
                                c.trigger(s.default.LEVEL_PTS_UPDATED, {
                                    details: n.details,
                                    level: this.level,
                                    drift: d,
                                    type: e.type,
                                    start: e.startPTS,
                                    end: e.endPTS
                                }), [e.data1, e.data2].forEach(function (r) {
                                    r && r.length && t.state === pe.PARSING && (t.appended = !0, t.pendingBuffering = !0, c.trigger(s.default.BUFFER_APPENDING, {
                                        type: e.type,
                                        data: r,
                                        parent: "main",
                                        content: "data"
                                    }))
                                }), this.tick()
                            }
                        }, t.prototype.onFragParsed = function (e) {
                            var t = this.fragCurrent, r = e.frag;
                            t && "main" === e.id && r.sn === t.sn && r.level === t.level && this.state === pe.PARSING && (this.stats.tparsed = window.performance.now(), this.state = pe.PARSED, this._checkAppendedParsed())
                        }, t.prototype.onAudioTrackSwitching = function (e) {
                            var t = !!e.url, r = e.id;
                            if (!t) {
                                if (this.mediaBuffer !== this.media) {
                                    l.logger.log("switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
                                    var i = this.fragCurrent;
                                    i.loader && (l.logger.log("switching to main audio track, cancel main fragment load"), i.loader.abort()), this.fragCurrent = null, this.fragPrevious = null, this.demuxer && (this.demuxer.destroy(), this.demuxer = null), this.state = pe.IDLE
                                }
                                var n = this.hls;
                                n.trigger(s.default.BUFFER_FLUSHING, {
                                    startOffset: 0,
                                    endOffset: Number.POSITIVE_INFINITY,
                                    type: "audio"
                                }), n.trigger(s.default.AUDIO_TRACK_SWITCHED, {id: r}), this.altAudio = !1
                            }
                        }, t.prototype.onAudioTrackSwitched = function (e) {
                            var t = e.id, r = !!this.hls.audioTracks[t].url;
                            if (r) {
                                var i = this.videoBuffer;
                                i && this.mediaBuffer !== i && (l.logger.log("switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = i)
                            }
                            this.altAudio = r, this.tick()
                        }, t.prototype.onBufferCreated = function (e) {
                            var t = e.tracks, r = void 0, i = void 0, n = !1;
                            for (var a in t) {
                                var o = t[a];
                                "main" === o.id ? (i = a, r = o, "video" === a && (this.videoBuffer = t[a].buffer)) : n = !0
                            }
                            n && r ? (l.logger.log("alternate track found, use " + i + ".buffered to schedule main fragment loading"), this.mediaBuffer = r.buffer) : this.mediaBuffer = this.media
                        }, t.prototype.onBufferAppended = function (e) {
                            if ("main" === e.parent) {
                                var t = this.state;
                                t !== pe.PARSING && t !== pe.PARSED || (this.pendingBuffering = e.pending > 0, this._checkAppendedParsed())
                            }
                        }, t.prototype._checkAppendedParsed = function () {
                            if (!(this.state !== pe.PARSED || this.appended && this.pendingBuffering)) {
                                var e = this.fragCurrent;
                                if (e) {
                                    var t = this.mediaBuffer ? this.mediaBuffer : this.media;
                                    l.logger.log("main buffered : " + ae.toString(t.buffered)), this.fragPrevious = e;
                                    var r = this.stats;
                                    r.tbuffered = window.performance.now(), this.fragLastKbps = Math.round(8 * r.total / (r.tbuffered - r.tfirst)), this.hls.trigger(s.default.FRAG_BUFFERED, {
                                        stats: r,
                                        frag: e,
                                        id: "main"
                                    }), this.state = pe.IDLE
                                }
                                this.tick()
                            }
                        }, t.prototype.onError = function (e) {
                            var t = e.frag || this.fragCurrent;
                            if (!t || "main" === t.type) {
                                var r = !!this.media && V.isBuffered(this.media, this.media.currentTime) && V.isBuffered(this.media, this.media.currentTime + .5);
                                switch (e.details) {
                                    case a.ErrorDetails.FRAG_LOAD_ERROR:
                                    case a.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    case a.ErrorDetails.KEY_LOAD_ERROR:
                                    case a.ErrorDetails.KEY_LOAD_TIMEOUT:
                                        if (!e.fatal) if (this.fragLoadError + 1 <= this.config.fragLoadingMaxRetry) {
                                            var i = Math.min(Math.pow(2, this.fragLoadError) * this.config.fragLoadingRetryDelay, this.config.fragLoadingMaxRetryTimeout);
                                            l.logger.warn("mediaController: frag loading failed, retry in " + i + " ms"), this.retryDate = window.performance.now() + i, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.fragLoadError++, this.state = pe.FRAG_LOADING_WAITING_RETRY
                                        } else l.logger.error("mediaController: " + e.details + " reaches max retry, redispatch as fatal ..."), e.fatal = !0, this.state = pe.ERROR;
                                        break;
                                    case a.ErrorDetails.LEVEL_LOAD_ERROR:
                                    case a.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                        this.state !== pe.ERROR && (e.fatal ? (this.state = pe.ERROR, l.logger.warn("streamController: " + e.details + ",switch to " + this.state + " state ...")) : e.levelRetry || this.state !== pe.WAITING_LEVEL || (this.state = pe.IDLE));
                                        break;
                                    case a.ErrorDetails.BUFFER_FULL_ERROR:
                                        "main" !== e.parent || this.state !== pe.PARSING && this.state !== pe.PARSED || (r ? (this._reduceMaxBufferLength(this.config.maxBufferLength), this.state = pe.IDLE) : (l.logger.warn("buffer full error also media.currentTime is not buffered, flush everything"), this.fragCurrent = null, this.flushMainBuffer(0, Number.POSITIVE_INFINITY)))
                                }
                            }
                        }, t.prototype._reduceMaxBufferLength = function (e) {
                            var t = this.config;
                            return t.maxMaxBufferLength >= e && (t.maxMaxBufferLength /= 2, l.logger.warn("main:reduce max buffer length to " + t.maxMaxBufferLength + "s"), !0)
                        }, t.prototype._checkBuffer = function () {
                            var e = this.media;
                            if (e && 0 !== e.readyState) {
                                var t = (this.mediaBuffer ? this.mediaBuffer : e).buffered;
                                !this.loadedmetadata && t.length ? (this.loadedmetadata = !0, this._seekToStartPos()) : this.immediateSwitch ? this.immediateLevelSwitchEnd() : this.gapController.poll(this.lastCurrentTime, t)
                            }
                        }, t.prototype.onFragLoadEmergencyAborted = function () {
                            this.state = pe.IDLE, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.tick()
                        }, t.prototype.onBufferFlushed = function () {
                            var e = this.mediaBuffer ? this.mediaBuffer : this.media;
                            e && this.fragmentTracker.detectEvictedFragments(v.ElementaryStreamTypes.VIDEO, e.buffered), this.state = pe.IDLE, this.fragPrevious = null
                        }, t.prototype.onLevelsUpdated = function (e) {
                            this.levels = e.levels
                        }, t.prototype.swapAudioCodec = function () {
                            this.audioCodecSwap = !this.audioCodecSwap
                        }, t.prototype.computeLivePosition = function (e, t) {
                            var r = void 0 !== this.config.liveSyncDuration ? this.config.liveSyncDuration : this.config.liveSyncDurationCount * t.targetduration;
                            return e + Math.max(0, t.totalduration - r)
                        }, t.prototype._seekToStartPos = function () {
                            var e = this.media, t = e.currentTime, r = e.seeking ? t : this.startPosition;
                            t !== r && (l.logger.log("target start position not buffered, seek to buffered.start(0) " + r + " from current time " + t + " "), e.currentTime = r)
                        }, t.prototype._getAudioCodec = function (e) {
                            var t = this.config.defaultAudioCodec || e.audioCodec;
                            return this.audioCodecSwap && (l.logger.log("swapping playlist audio codec"), t && (t = -1 !== t.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5")), t
                        }, ve(t, [{
                            key: "state", set: function (e) {
                                if (this.state !== e) {
                                    var t = this.state;
                                    this._state = e, l.logger.log("main stream:" + t + "->" + e), this.hls.trigger(s.default.STREAM_STATE_TRANSITION, {
                                        previousState: t,
                                        nextState: e
                                    })
                                }
                            }, get: function () {
                                return this._state
                            }
                        }, {
                            key: "currentLevel", get: function () {
                                var e = this.media;
                                if (e) {
                                    var t = this.getBufferedFrag(e.currentTime);
                                    if (t) return t.level
                                }
                                return -1
                            }
                        }, {
                            key: "nextBufferedFrag", get: function () {
                                var e = this.media;
                                return e ? this.followingBufferedFrag(this.getBufferedFrag(e.currentTime)) : null
                            }
                        }, {
                            key: "nextLevel", get: function () {
                                var e = this.nextBufferedFrag;
                                return e ? e.level : -1
                            }
                        }, {
                            key: "liveSyncPosition", get: function () {
                                return this._liveSyncPosition
                            }, set: function (e) {
                                this._liveSyncPosition = e
                            }
                        }]), t
                    }(ge), me = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                        return typeof e
                    } : function (e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, Te = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();
                    window.performance;
                    var Ee = void 0, be = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.MANIFEST_LOADED, s.default.LEVEL_LOADED, s.default.AUDIO_TRACK_SWITCHED, s.default.FRAG_LOADED, s.default.ERROR));
                            return i.canload = !1, i.currentLevelIndex = null, i.manualLevelIndex = -1, i.timer = null, Ee = /chrome|firefox/.test(navigator.userAgent.toLowerCase()), i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.onHandlerDestroying = function () {
                            this.clearTimer(), this.manualLevelIndex = -1
                        }, t.prototype.clearTimer = function () {
                            null !== this.timer && (clearTimeout(this.timer), this.timer = null)
                        }, t.prototype.startLoad = function () {
                            var e = this._levels;
                            this.canload = !0, this.levelRetryCount = 0, e && e.forEach(function (e) {
                                e.loadError = 0;
                                var t = e.details;
                                t && t.live && (e.details = void 0)
                            }), null !== this.timer && this.loadLevel()
                        }, t.prototype.stopLoad = function () {
                            this.canload = !1
                        }, t.prototype.onManifestLoaded = function (e) {
                            var t = [], r = [], i = void 0, n = {}, o = null, u = !1, d = !1;
                            if (e.levels.forEach(function (e) {
                                var r = e.attrs;
                                e.loadError = 0, e.fragmentError = !1, u = u || !!e.videoCodec, d = d || !!e.audioCodec, Ee && e.audioCodec && -1 !== e.audioCodec.indexOf("mp4a.40.34") && (e.audioCodec = void 0), (o = n[e.bitrate]) ? o.url.push(e.url) : (e.url = [e.url], e.urlId = 0, n[e.bitrate] = e, t.push(e)), r && (r.AUDIO && (d = !0, Z(o || e, "audio", r.AUDIO)), r.SUBTITLES && Z(o || e, "text", r.SUBTITLES))
                            }), u && d && (t = t.filter(function (e) {
                                return !!e.videoCodec
                            })), t = t.filter(function (e) {
                                var t = e.audioCodec, r = e.videoCodec;
                                return (!t || S(t)) && (!r || S(r))
                            }), e.audioTracks && (r = e.audioTracks.filter(function (e) {
                                return !e.audioCodec || S(e.audioCodec, "audio")
                            })).forEach(function (e, t) {
                                e.id = t
                            }), t.length > 0) {
                                i = t[0].bitrate, t.sort(function (e, t) {
                                    return e.bitrate - t.bitrate
                                }), this._levels = t;
                                for (var c = 0; c < t.length; c++) if (t[c].bitrate === i) {
                                    this._firstLevel = c, l.logger.log("manifest loaded," + t.length + " level(s) found, first bitrate:" + i);
                                    break
                                }
                                this.hls.trigger(s.default.MANIFEST_PARSED, {
                                    levels: t,
                                    audioTracks: r,
                                    firstLevel: this._firstLevel,
                                    stats: e.stats,
                                    audio: d,
                                    video: u,
                                    altAudio: r.some(function (e) {
                                        return !!e.url
                                    })
                                })
                            } else this.hls.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.MEDIA_ERROR,
                                details: a.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                                fatal: !0,
                                url: this.hls.url,
                                reason: "no level with compatible codecs found in manifest"
                            })
                        }, t.prototype.setLevelInternal = function (e) {
                            var t = this._levels, r = this.hls;
                            if (e >= 0 && e < t.length) {
                                if (this.clearTimer(), this.currentLevelIndex !== e) {
                                    l.logger.log("switching to level " + e), this.currentLevelIndex = e;
                                    var i = t[e];
                                    i.level = e, r.trigger(s.default.LEVEL_SWITCHING, i)
                                }
                                var n = t[e], o = n.details;
                                if (!o || o.live) {
                                    var u = n.urlId;
                                    r.trigger(s.default.LEVEL_LOADING, {url: n.url[u], level: e, id: u})
                                }
                            } else r.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.OTHER_ERROR,
                                details: a.ErrorDetails.LEVEL_SWITCH_ERROR,
                                level: e,
                                fatal: !1,
                                reason: "invalid level idx"
                            })
                        }, t.prototype.onError = function (e) {
                            if (e.fatal) e.type === a.ErrorTypes.NETWORK_ERROR && this.clearTimer(); else {
                                var t = !1, r = !1, i = void 0;
                                switch (e.details) {
                                    case a.ErrorDetails.FRAG_LOAD_ERROR:
                                    case a.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    case a.ErrorDetails.KEY_LOAD_ERROR:
                                    case a.ErrorDetails.KEY_LOAD_TIMEOUT:
                                        i = e.frag.level, r = !0;
                                        break;
                                    case a.ErrorDetails.LEVEL_LOAD_ERROR:
                                    case a.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                        i = e.context.level, t = !0;
                                        break;
                                    case a.ErrorDetails.REMUX_ALLOC_ERROR:
                                        i = e.level, t = !0
                                }
                                void 0 !== i && this.recoverLevel(e, i, t, r)
                            }
                        }, t.prototype.recoverLevel = function (e, t, r, i) {
                            var n = this, a = this.hls.config, o = e.details, s = this._levels[t], u = void 0,
                                d = void 0, c = void 0;
                            if (s.loadError++, s.fragmentError = i, r) {
                                if (!(this.levelRetryCount + 1 <= a.levelLoadingMaxRetry)) return l.logger.error("level controller, cannot recover from " + o + " error"), this.currentLevelIndex = null, this.clearTimer(), void(e.fatal = !0);
                                d = Math.min(Math.pow(2, this.levelRetryCount) * a.levelLoadingRetryDelay, a.levelLoadingMaxRetryTimeout), this.timer = setTimeout(function () {
                                    return n.loadLevel()
                                }, d), e.levelRetry = !0, this.levelRetryCount++, l.logger.warn("level controller, " + o + ", retry in " + d + " ms, current retry count is " + this.levelRetryCount)
                            }
                            (r || i) && ((u = s.url.length) > 1 && s.loadError < u ? (s.urlId = (s.urlId + 1) % u, s.details = void 0, l.logger.warn("level controller, " + o + " for level " + t + ": switching to redundant URL-id " + s.urlId)) : -1 === this.manualLevelIndex ? (c = 0 === t ? this._levels.length - 1 : t - 1, l.logger.warn("level controller, " + o + ": switch to " + c), this.hls.nextAutoLevel = this.currentLevelIndex = c) : i && (l.logger.warn("level controller, " + o + ": reload a fragment"), this.currentLevelIndex = null))
                        }, t.prototype.onFragLoaded = function (e) {
                            var t = e.frag;
                            if (void 0 !== t && "main" === t.type) {
                                var r = this._levels[t.level];
                                void 0 !== r && (r.fragmentError = !1, r.loadError = 0, this.levelRetryCount = 0)
                            }
                        }, t.prototype.onLevelLoaded = function (e) {
                            var t = this, r = e.level, i = e.details;
                            if (r === this.currentLevelIndex) {
                                var n = this._levels[r];
                                if (n.fragmentError || (n.loadError = 0, this.levelRetryCount = 0), i.live) {
                                    var a = ne(n.details, i, e.stats.trequest);
                                    l.logger.log("live playlist, reload in " + Math.round(a) + " ms"), this.timer = setTimeout(function () {
                                        return t.loadLevel()
                                    }, a)
                                } else this.clearTimer()
                            }
                        }, t.prototype.onAudioTrackSwitched = function (e) {
                            var t = this.hls.audioTracks[e.id].groupId, r = this.hls.levels[this.currentLevelIndex];
                            if (r && r.audioGroupIds) {
                                var i = r.audioGroupIds.findIndex(function (e) {
                                    return e === t
                                });
                                i !== r.urlId && (r.urlId = i, this.startLoad())
                            }
                        }, t.prototype.loadLevel = function () {
                            if (l.logger.debug("call to loadLevel"), null !== this.currentLevelIndex && this.canload) {
                                var e = this._levels[this.currentLevelIndex];
                                if ("object" === (void 0 === e ? "undefined" : me(e)) && e.url.length > 0) {
                                    var t = this.currentLevelIndex, r = e.urlId, i = e.url[r];
                                    l.logger.log("Attempt loading level index " + t + " with URL-id " + r), this.hls.trigger(s.default.LEVEL_LOADING, {
                                        url: i,
                                        level: t,
                                        id: r
                                    })
                                }
                            }
                        }, t.prototype.removeLevel = function (e, t) {
                            this._levels = this.levels.filter(function (r, i) {
                                return i !== e || r.url.length > 1 && void 0 !== t && (r.url = r.url.filter(function (e, r) {
                                    return r !== t
                                }), r.urlId = 0, !0)
                            }), this.hls.trigger(s.default.LEVELS_UPDATED, {levels: this._levels})
                        }, Te(t, [{
                            key: "levels", get: function () {
                                return this._levels
                            }
                        }, {
                            key: "level", get: function () {
                                return this.currentLevelIndex
                            }, set: function (e) {
                                var t = this._levels;
                                t && (e = Math.min(e, t.length - 1), this.currentLevelIndex === e && t[e].details || this.setLevelInternal(e))
                            }
                        }, {
                            key: "manualLevel", get: function () {
                                return this.manualLevelIndex
                            }, set: function (e) {
                                this.manualLevelIndex = e, void 0 === this._startLevel && (this._startLevel = e), -1 !== e && (this.level = e)
                            }
                        }, {
                            key: "firstLevel", get: function () {
                                return this._firstLevel
                            }, set: function (e) {
                                this._firstLevel = e
                            }
                        }, {
                            key: "startLevel", get: function () {
                                if (void 0 === this._startLevel) {
                                    var e = this.hls.config.startLevel;
                                    return void 0 !== e ? e : this._firstLevel
                                }
                                return this._startLevel
                            }, set: function (e) {
                                this._startLevel = e
                            }
                        }, {
                            key: "nextLoadLevel", get: function () {
                                return -1 !== this.manualLevelIndex ? this.manualLevelIndex : this.hls.nextAutoLevel
                            }, set: function (e) {
                                this.level = e, -1 === this.manualLevelIndex && (this.hls.nextAutoLevel = e)
                            }
                        }]), t
                    }(c);
                    var _e = function () {
                        function e(t) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.alpha_ = t ? Math.exp(Math.log(.5) / t) : 0, this.estimate_ = 0, this.totalWeight_ = 0
                        }

                        return e.prototype.sample = function (e, t) {
                            var r = Math.pow(this.alpha_, e);
                            this.estimate_ = t * (1 - r) + r * this.estimate_, this.totalWeight_ += e
                        }, e.prototype.getTotalWeight = function () {
                            return this.totalWeight_
                        }, e.prototype.getEstimate = function () {
                            if (this.alpha_) {
                                var e = 1 - Math.pow(this.alpha_, this.totalWeight_);
                                return this.estimate_ / e
                            }
                            return this.estimate_
                        }, e
                    }();
                    var Se = function () {
                        function e(t, r, i, n) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.hls = t, this.defaultEstimate_ = n, this.minWeight_ = .001, this.minDelayMs_ = 50, this.slow_ = new _e(r), this.fast_ = new _e(i)
                        }

                        return e.prototype.sample = function (e, t) {
                            var r = 8e3 * t / (e = Math.max(e, this.minDelayMs_)), i = e / 1e3;
                            this.fast_.sample(i, r), this.slow_.sample(i, r)
                        }, e.prototype.canEstimate = function () {
                            var e = this.fast_;
                            return e && e.getTotalWeight() >= this.minWeight_
                        }, e.prototype.getEstimate = function () {
                            return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_
                        }, e.prototype.destroy = function () {
                        }, e
                    }(), Re = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();
                    var ke = window.performance, we = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.FRAG_LOADING, s.default.FRAG_LOADED, s.default.FRAG_BUFFERED, s.default.ERROR));
                            return i.lastLoadedFragLevel = 0, i._nextAutoLevel = -1, i.hls = r, i.timer = null, i._bwEstimator = null, i.onCheck = i._abandonRulesCheck.bind(i), i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.destroy = function () {
                            this.clearTimer(), c.prototype.destroy.call(this)
                        }, t.prototype.onFragLoading = function (e) {
                            var t = e.frag;
                            if ("main" === t.type && (this.timer || (this.fragCurrent = t, this.timer = setInterval(this.onCheck, 100)), !this._bwEstimator)) {
                                var r = this.hls, i = r.config, n = t.level, a = void 0, o = void 0;
                                r.levels[n].details.live ? (a = i.abrEwmaFastLive, o = i.abrEwmaSlowLive) : (a = i.abrEwmaFastVoD, o = i.abrEwmaSlowVoD), this._bwEstimator = new Se(r, o, a, i.abrEwmaDefaultEstimate)
                            }
                        }, t.prototype._abandonRulesCheck = function () {
                            var e = this.hls, t = e.media, r = this.fragCurrent;
                            if (r) {
                                var i = r.loader, n = e.minAutoLevel;
                                if (!i || i.stats && i.stats.aborted) return l.logger.warn("frag loader destroy or aborted, disarm abandonRules"), this.clearTimer(), void(this._nextAutoLevel = -1);
                                var a = i.stats;
                                if (t && a && (!t.paused && 0 !== t.playbackRate || !t.readyState) && r.autoLevel && r.level) {
                                    var o = ke.now() - a.trequest, u = Math.abs(t.playbackRate);
                                    if (o > 500 * r.duration / u) {
                                        var d = e.levels, c = Math.max(1, a.bw ? a.bw / 8 : 1e3 * a.loaded / o),
                                            f = d[r.level],
                                            h = f.realBitrate ? Math.max(f.realBitrate, f.bitrate) : f.bitrate,
                                            p = a.total ? a.total : Math.max(a.loaded, Math.round(r.duration * h / 8)),
                                            g = t.currentTime, v = (p - a.loaded) / c,
                                            y = (V.bufferInfo(t, g, e.config.maxBufferHole).end - g) / u;
                                        if (y < 2 * r.duration / u && v > y) {
                                            var m = void 0, T = void 0;
                                            for (T = r.level - 1; T > n; T--) {
                                                var E = d[T].realBitrate ? Math.max(d[T].realBitrate, d[T].bitrate) : d[T].bitrate;
                                                if ((m = r.duration * E / (6.4 * c)) < y) break
                                            }
                                            m < v && (l.logger.warn("loading too slow, abort fragment loading and switch to level " + T + ":fragLoadedDelay[" + T + "]<fragLoadedDelay[" + (r.level - 1) + "];bufferStarvationDelay:" + m.toFixed(1) + "<" + v.toFixed(1) + ":" + y.toFixed(1)), e.nextLoadLevel = T, this._bwEstimator.sample(o, a.loaded), i.abort(), this.clearTimer(), e.trigger(s.default.FRAG_LOAD_EMERGENCY_ABORTED, {
                                                frag: r,
                                                stats: a
                                            }))
                                        }
                                    }
                                }
                            }
                        }, t.prototype.onFragLoaded = function (e) {
                            var t = e.frag;
                            if ("main" === t.type && Object(o.isFiniteNumber)(t.sn)) {
                                if (this.clearTimer(), this.lastLoadedFragLevel = t.level, this._nextAutoLevel = -1, this.hls.config.abrMaxWithRealBitrate) {
                                    var r = this.hls.levels[t.level],
                                        i = (r.loaded ? r.loaded.bytes : 0) + e.stats.loaded,
                                        n = (r.loaded ? r.loaded.duration : 0) + e.frag.duration;
                                    r.loaded = {bytes: i, duration: n}, r.realBitrate = Math.round(8 * i / n)
                                }
                                if (e.frag.bitrateTest) {
                                    var a = e.stats;
                                    a.tparsed = a.tbuffered = a.tload, this.onFragBuffered(e)
                                }
                            }
                        }, t.prototype.onFragBuffered = function (e) {
                            var t = e.stats, r = e.frag;
                            if (!0 !== t.aborted && "main" === r.type && Object(o.isFiniteNumber)(r.sn) && (!r.bitrateTest || t.tload === t.tbuffered)) {
                                var i = t.tparsed - t.trequest;
                                l.logger.log("latency/loading/parsing/append/kbps:" + Math.round(t.tfirst - t.trequest) + "/" + Math.round(t.tload - t.tfirst) + "/" + Math.round(t.tparsed - t.tload) + "/" + Math.round(t.tbuffered - t.tparsed) + "/" + Math.round(8 * t.loaded / (t.tbuffered - t.trequest))), this._bwEstimator.sample(i, t.loaded), t.bwEstimate = this._bwEstimator.getEstimate(), r.bitrateTest ? this.bitrateTestDelay = i / 1e3 : this.bitrateTestDelay = 0
                            }
                        }, t.prototype.onError = function (e) {
                            switch (e.details) {
                                case a.ErrorDetails.FRAG_LOAD_ERROR:
                                case a.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    this.clearTimer()
                            }
                        }, t.prototype.clearTimer = function () {
                            clearInterval(this.timer), this.timer = null
                        }, t.prototype._findBestLevel = function (e, t, r, i, n, a, o, s, u) {
                            for (var d = n; d >= i; d--) {
                                var c = u[d];
                                if (c) {
                                    var f = c.details, h = f ? f.totalduration / f.fragments.length : t,
                                        p = !!f && f.live, g = void 0;
                                    g = d <= e ? o * r : s * r;
                                    var v = u[d].realBitrate ? Math.max(u[d].realBitrate, u[d].bitrate) : u[d].bitrate,
                                        y = v * h / g;
                                    if (l.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + d + "/" + Math.round(g) + "/" + v + "/" + h + "/" + a + "/" + y), g > v && (!y || p && !this.bitrateTestDelay || y < a)) return d
                                }
                            }
                            return -1
                        }, Re(t, [{
                            key: "nextAutoLevel", get: function () {
                                var e = this._nextAutoLevel, t = this._bwEstimator;
                                if (!(-1 === e || t && t.canEstimate())) return e;
                                var r = this._nextABRAutoLevel;
                                return -1 !== e && (r = Math.min(e, r)), r
                            }, set: function (e) {
                                this._nextAutoLevel = e
                            }
                        }, {
                            key: "_nextABRAutoLevel", get: function () {
                                var e = this.hls, t = this.fragCurrent, r = this.lastLevelLoaded, i = this._bwEstimator,
                                    n = e.maxAutoLevel, a = e.levels, o = e.config, s = e.minAutoLevel, u = e.media,
                                    d = o.abrBandWidthFactor, c = o.abrBandWidthUpFactor, f = t ? t.duration : 0,
                                    h = u ? u.currentTime : 0,
                                    p = u && 0 !== u.playbackRate ? Math.abs(u.playbackRate) : 1,
                                    g = i ? i.getEstimate() : o.abrEwmaDefaultEstimate,
                                    v = (V.bufferInfo(u, h, o.maxBufferHole).end - h) / p,
                                    y = this._findBestLevel(r, f, g, s, n, v, d, c, a);
                                if (y >= 0) return y;
                                l.logger.trace("rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering");
                                var m = f ? Math.min(f, o.maxStarvationDelay) : o.maxStarvationDelay;
                                if (0 === v) {
                                    var T = this.bitrateTestDelay;
                                    if (T) m = (f ? Math.min(f, o.maxLoadingDelay) : o.maxLoadingDelay) - T, l.logger.trace("bitrate test took " + Math.round(1e3 * T) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * m) + " ms"), d = c = 1
                                }
                                return y = this._findBestLevel(r, f, g, s, n, v + m, d, c, a), Math.max(y, 0)
                            }
                        }]), t
                    }(c);
                    var Ae = q(), Le = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.MEDIA_ATTACHING, s.default.MEDIA_DETACHING, s.default.MANIFEST_PARSED, s.default.BUFFER_RESET, s.default.BUFFER_APPENDING, s.default.BUFFER_CODECS, s.default.BUFFER_EOS, s.default.BUFFER_FLUSHING, s.default.LEVEL_PTS_UPDATED, s.default.LEVEL_UPDATED));
                            return i._msDuration = null, i._levelDuration = null, i._levelTargetDuration = 10, i._live = null, i._objectUrl = null, i.bufferCodecEventsExpected = 0, i.onsbue = i.onSBUpdateEnd.bind(i), i.onsbe = i.onSBUpdateError.bind(i), i.pendingTracks = {}, i.tracks = {}, i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.destroy = function () {
                            c.prototype.destroy.call(this)
                        }, t.prototype.onLevelPtsUpdated = function (e) {
                            var t = e.type, r = this.tracks.audio;
                            if ("audio" === t && r && "audio/mpeg" === r.container) {
                                var i = this.sourceBuffer.audio;
                                if (Math.abs(i.timestampOffset - e.start) > .1) {
                                    var n = i.updating;
                                    try {
                                        i.abort()
                                    } catch (e) {
                                        l.logger.warn("can not abort audio buffer: " + e)
                                    }
                                    n ? this.audioTimestampOffset = e.start : (l.logger.warn("change mpeg audio timestamp offset from " + i.timestampOffset + " to " + e.start), i.timestampOffset = e.start)
                                }
                            }
                        }, t.prototype.onManifestParsed = function (e) {
                            this.bufferCodecEventsExpected = e.altAudio ? 2 : 1, l.logger.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected")
                        }, t.prototype.onMediaAttaching = function (e) {
                            var t = this.media = e.media;
                            if (t) {
                                var r = this.mediaSource = new Ae;
                                this.onmso = this.onMediaSourceOpen.bind(this), this.onmse = this.onMediaSourceEnded.bind(this), this.onmsc = this.onMediaSourceClose.bind(this), r.addEventListener("sourceopen", this.onmso), r.addEventListener("sourceended", this.onmse), r.addEventListener("sourceclose", this.onmsc), t.src = window.URL.createObjectURL(r), this._objectUrl = t.src
                            }
                        }, t.prototype.onMediaDetaching = function () {
                            l.logger.log("media source detaching");
                            var e = this.mediaSource;
                            if (e) {
                                if ("open" === e.readyState) try {
                                    e.endOfStream()
                                } catch (e) {
                                    l.logger.warn("onMediaDetaching:" + e.message + " while calling endOfStream")
                                }
                                e.removeEventListener("sourceopen", this.onmso), e.removeEventListener("sourceended", this.onmse), e.removeEventListener("sourceclose", this.onmsc), this.media && (window.URL.revokeObjectURL(this._objectUrl), this.media.src === this._objectUrl ? (this.media.removeAttribute("src"), this.media.load()) : l.logger.warn("media.src was changed by a third party - skip cleanup")), this.mediaSource = null, this.media = null, this._objectUrl = null, this.pendingTracks = {}, this.tracks = {}, this.sourceBuffer = {}, this.flushRange = [], this.segments = [], this.appended = 0
                            }
                            this.onmso = this.onmse = this.onmsc = null, this.hls.trigger(s.default.MEDIA_DETACHED)
                        }, t.prototype.onMediaSourceOpen = function () {
                            l.logger.log("media source opened"), this.hls.trigger(s.default.MEDIA_ATTACHED, {media: this.media});
                            var e = this.mediaSource;
                            e && e.removeEventListener("sourceopen", this.onmso), this.checkPendingTracks()
                        }, t.prototype.checkPendingTracks = function () {
                            var e = this.bufferCodecEventsExpected, t = this.pendingTracks, r = Object.keys(t).length;
                            (r && !e || 2 === r) && (this.createSourceBuffers(t), this.pendingTracks = {}, this.doAppending())
                        }, t.prototype.onMediaSourceClose = function () {
                            l.logger.log("media source closed")
                        }, t.prototype.onMediaSourceEnded = function () {
                            l.logger.log("media source ended")
                        }, t.prototype.onSBUpdateEnd = function () {
                            if (this.audioTimestampOffset) {
                                var e = this.sourceBuffer.audio;
                                l.logger.warn("change mpeg audio timestamp offset from " + e.timestampOffset + " to " + this.audioTimestampOffset), e.timestampOffset = this.audioTimestampOffset, delete this.audioTimestampOffset
                            }
                            this._needsFlush && this.doFlush(), this._needsEos && this.checkEos(), this.appending = !1;
                            var t = this.parent, r = this.segments.reduce(function (e, r) {
                                return r.parent === t ? e + 1 : e
                            }, 0), i = {}, n = this.sourceBuffer;
                            for (var a in n) i[a] = n[a].buffered;
                            this.hls.trigger(s.default.BUFFER_APPENDED, {
                                parent: t,
                                pending: r,
                                timeRanges: i
                            }), this._needsFlush || this.doAppending(), this.updateMediaElementDuration(), 0 === r && this.flushLiveBackBuffer()
                        }, t.prototype.onSBUpdateError = function (e) {
                            l.logger.error("sourceBuffer error:", e), this.hls.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.MEDIA_ERROR,
                                details: a.ErrorDetails.BUFFER_APPENDING_ERROR,
                                fatal: !1
                            })
                        }, t.prototype.onBufferReset = function () {
                            var e = this.sourceBuffer;
                            for (var t in e) {
                                var r = e[t];
                                try {
                                    this.mediaSource.removeSourceBuffer(r), r.removeEventListener("updateend", this.onsbue), r.removeEventListener("error", this.onsbe)
                                } catch (e) {
                                }
                            }
                            this.sourceBuffer = {}, this.flushRange = [], this.segments = [], this.appended = 0
                        }, t.prototype.onBufferCodecs = function (e) {
                            var t = this;
                            if (!Object.keys(this.sourceBuffer).length) {
                                Object.keys(e).forEach(function (r) {
                                    t.pendingTracks[r] = e[r]
                                });
                                var r = this.mediaSource;
                                this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0), r && "open" === r.readyState && this.checkPendingTracks()
                            }
                        }, t.prototype.createSourceBuffers = function (e) {
                            var t = this.sourceBuffer, r = this.mediaSource;
                            for (var i in e) if (!t[i]) {
                                var n = e[i], o = n.levelCodec || n.codec, u = n.container + ";codecs=" + o;
                                l.logger.log("creating sourceBuffer(" + u + ")");
                                try {
                                    var d = t[i] = r.addSourceBuffer(u);
                                    d.addEventListener("updateend", this.onsbue), d.addEventListener("error", this.onsbe), this.tracks[i] = {
                                        codec: o,
                                        container: n.container
                                    }, n.buffer = d
                                } catch (e) {
                                    l.logger.error("error while trying to add sourceBuffer:" + e.message), this.hls.trigger(s.default.ERROR, {
                                        type: a.ErrorTypes.MEDIA_ERROR,
                                        details: a.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                                        fatal: !1,
                                        err: e,
                                        mimeType: u
                                    })
                                }
                            }
                            this.hls.trigger(s.default.BUFFER_CREATED, {tracks: e})
                        }, t.prototype.onBufferAppending = function (e) {
                            this._needsFlush || (this.segments ? this.segments.push(e) : this.segments = [e], this.doAppending())
                        }, t.prototype.onBufferAppendFail = function (e) {
                            l.logger.error("sourceBuffer error:", e.event), this.hls.trigger(s.default.ERROR, {
                                type: a.ErrorTypes.MEDIA_ERROR,
                                details: a.ErrorDetails.BUFFER_APPENDING_ERROR,
                                fatal: !1
                            })
                        }, t.prototype.onBufferEos = function (e) {
                            var t = this.sourceBuffer, r = e.type;
                            for (var i in t) r && i !== r || t[i].ended || (t[i].ended = !0, l.logger.log(i + " sourceBuffer now EOS"));
                            this.checkEos()
                        }, t.prototype.checkEos = function () {
                            var e = this.sourceBuffer, t = this.mediaSource;
                            if (t && "open" === t.readyState) {
                                for (var r in e) {
                                    var i = e[r];
                                    if (!i.ended) return;
                                    if (i.updating) return void(this._needsEos = !0)
                                }
                                l.logger.log("all media data are available, signal endOfStream() to MediaSource and stop loading fragment");
                                try {
                                    t.endOfStream()
                                } catch (e) {
                                    l.logger.warn("exception while calling mediaSource.endOfStream()")
                                }
                                this._needsEos = !1
                            } else this._needsEos = !1
                        }, t.prototype.onBufferFlushing = function (e) {
                            this.flushRange.push({
                                start: e.startOffset,
                                end: e.endOffset,
                                type: e.type
                            }), this.flushBufferCounter = 0, this.doFlush()
                        }, t.prototype.flushLiveBackBuffer = function () {
                            if (this._live) {
                                var e = this.hls.config.liveBackBufferLength;
                                if (isFinite(e) && !(e < 0)) for (var t = this.media.currentTime, r = this.sourceBuffer, i = Object.keys(r), n = t - Math.max(e, this._levelTargetDuration), a = i.length - 1; a >= 0; a--) {
                                    var o = i[a], s = r[o].buffered;
                                    s.length > 0 && n > s.start(0) && this.removeBufferRange(o, r[o], 0, n)
                                }
                            }
                        }, t.prototype.onLevelUpdated = function (e) {
                            var t = e.details;
                            t.fragments.length > 0 && (this._levelDuration = t.totalduration + t.fragments[0].start, this._levelTargetDuration = t.averagetargetduration || t.targetduration || 10, this._live = t.live, this.updateMediaElementDuration())
                        }, t.prototype.updateMediaElementDuration = function () {
                            var e, t = this.hls.config;
                            if (null !== this._levelDuration && this.media && this.mediaSource && this.sourceBuffer && 0 !== this.media.readyState && "open" === this.mediaSource.readyState) {
                                for (var r in this.sourceBuffer) if (!0 === this.sourceBuffer[r].updating) return;
                                e = this.media.duration, null === this._msDuration && (this._msDuration = this.mediaSource.duration), !0 === this._live && !0 === t.liveDurationInfinity ? (l.logger.log("Media Source duration is set to Infinity"), this._msDuration = this.mediaSource.duration = 1 / 0) : (this._levelDuration > this._msDuration && this._levelDuration > e || !Object(o.isFiniteNumber)(e)) && (l.logger.log("Updating Media Source duration to " + this._levelDuration.toFixed(3)), this._msDuration = this.mediaSource.duration = this._levelDuration)
                            }
                        }, t.prototype.doFlush = function () {
                            for (; this.flushRange.length;) {
                                var e = this.flushRange[0];
                                if (!this.flushBuffer(e.start, e.end, e.type)) return void(this._needsFlush = !0);
                                this.flushRange.shift(), this.flushBufferCounter = 0
                            }
                            if (0 === this.flushRange.length) {
                                this._needsFlush = !1;
                                var t = 0, r = this.sourceBuffer;
                                try {
                                    for (var i in r) t += r[i].buffered.length
                                } catch (e) {
                                    l.logger.error("error while accessing sourceBuffer.buffered")
                                }
                                this.appended = t, this.hls.trigger(s.default.BUFFER_FLUSHED)
                            }
                        }, t.prototype.doAppending = function () {
                            var e = this.hls, t = this.segments, r = this.sourceBuffer;
                            if (Object.keys(r).length) {
                                if (this.media.error) return this.segments = [], void l.logger.error("trying to append although a media error occured, flush segment and abort");
                                if (this.appending) return;
                                if (t && t.length) {
                                    var i = t.shift();
                                    try {
                                        var n = r[i.type];
                                        n ? n.updating ? t.unshift(i) : (n.ended = !1, this.parent = i.parent, n.appendBuffer(i.data), this.appendError = 0, this.appended++, this.appending = !0) : this.onSBUpdateEnd()
                                    } catch (r) {
                                        l.logger.error("error while trying to append buffer:" + r.message), t.unshift(i);
                                        var o = {type: a.ErrorTypes.MEDIA_ERROR, parent: i.parent};
                                        22 !== r.code ? (this.appendError ? this.appendError++ : this.appendError = 1, o.details = a.ErrorDetails.BUFFER_APPEND_ERROR, this.appendError > e.config.appendErrorMaxRetry ? (l.logger.log("fail " + e.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"), this.segments = [], o.fatal = !0, e.trigger(s.default.ERROR, o)) : (o.fatal = !1, e.trigger(s.default.ERROR, o))) : (this.segments = [], o.details = a.ErrorDetails.BUFFER_FULL_ERROR, o.fatal = !1, e.trigger(s.default.ERROR, o))
                                    }
                                }
                            }
                        }, t.prototype.flushBuffer = function (e, t, r) {
                            var i = void 0, n = this.sourceBuffer;
                            if (Object.keys(n).length) {
                                if (l.logger.log("flushBuffer,pos/start/end: " + this.media.currentTime.toFixed(3) + "/" + e + "/" + t), this.flushBufferCounter < this.appended) {
                                    for (var a in n) if (!r || a === r) {
                                        if ((i = n[a]).ended = !1, i.updating) return l.logger.warn("cannot flush, sb updating in progress"), !1;
                                        if (this.removeBufferRange(a, i, e, t)) return this.flushBufferCounter++, !1
                                    }
                                } else l.logger.warn("abort flushing too many retries");
                                l.logger.log("buffer flushed")
                            }
                            return !0
                        }, t.prototype.removeBufferRange = function (e, t, r, i) {
                            try {
                                for (var n = 0; n < t.buffered.length; n++) {
                                    var a = t.buffered.start(n), o = t.buffered.end(n), s = Math.max(a, r),
                                        u = Math.min(o, i);
                                    if (Math.min(u, o) - s > .5) return l.logger.log("sb remove " + e + " [" + s + "," + u + "], of [" + a + "," + o + "], pos:" + this.media.currentTime), t.remove(s, u), !0
                                }
                            } catch (e) {
                                l.logger.warn("removeBufferRange failed", e)
                            }
                            return !1
                        }, t
                    }(c), De = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();
                    var Oe = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.FPS_DROP_LEVEL_CAPPING, s.default.MEDIA_ATTACHING, s.default.MANIFEST_PARSED, s.default.LEVELS_UPDATED, s.default.BUFFER_CODECS, s.default.MEDIA_DETACHING));
                            return i.autoLevelCapping = Number.POSITIVE_INFINITY, i.firstLevel = null, i.levels = [], i.media = null, i.restrictedLevels = [], i.timer = null, i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.destroy = function () {
                            this.hls.config.capLevelToPlayerSize && (this.media = null, this._stopCapping())
                        }, t.prototype.onFpsDropLevelCapping = function (e) {
                            t.isLevelAllowed(e.droppedLevel, this.restrictedLevels) && this.restrictedLevels.push(e.droppedLevel)
                        }, t.prototype.onMediaAttaching = function (e) {
                            this.media = e.media instanceof window.HTMLVideoElement ? e.media : null
                        }, t.prototype.onManifestParsed = function (e) {
                            var t = this.hls;
                            this.restrictedLevels = [], this.levels = e.levels, this.firstLevel = e.firstLevel, t.config.capLevelToPlayerSize && e.video && this._startCapping()
                        }, t.prototype.onBufferCodecs = function (e) {
                            this.hls.config.capLevelToPlayerSize && e.video && this._startCapping()
                        }, t.prototype.onLevelsUpdated = function (e) {
                            this.levels = e.levels
                        }, t.prototype.onMediaDetaching = function () {
                            this._stopCapping()
                        }, t.prototype.detectPlayerSize = function () {
                            if (this.media && this.mediaHeight > 0 && this.mediaWidth > 0) {
                                var e = this.levels ? this.levels.length : 0;
                                if (e) {
                                    var t = this.hls;
                                    t.autoLevelCapping = this.getMaxLevel(e - 1), t.autoLevelCapping > this.autoLevelCapping && t.streamController.nextLevelSwitch(), this.autoLevelCapping = t.autoLevelCapping
                                }
                            }
                        }, t.prototype.getMaxLevel = function (e) {
                            var r = this;
                            if (!this.levels) return -1;
                            var i = this.levels.filter(function (i, n) {
                                return t.isLevelAllowed(n, r.restrictedLevels) && n <= e
                            });
                            return t.getMaxLevelByMediaSize(i, this.mediaWidth, this.mediaHeight)
                        }, t.prototype._startCapping = function () {
                            this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY, this.hls.firstLevel = this.getMaxLevel(this.firstLevel), clearInterval(this.timer), this.timer = setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize())
                        }, t.prototype._stopCapping = function () {
                            this.restrictedLevels = [], this.firstLevel = null, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (this.timer = clearInterval(this.timer), this.timer = null)
                        }, t.isLevelAllowed = function (e) {
                            return -1 === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []).indexOf(e)
                        }, t.getMaxLevelByMediaSize = function (e, t, r) {
                            if (!e || e && !e.length) return -1;
                            for (var i, n, a = e.length - 1, o = 0; o < e.length; o += 1) {
                                var s = e[o];
                                if ((s.width >= t || s.height >= r) && (i = s, !(n = e[o + 1]) || i.width !== n.width || i.height !== n.height)) {
                                    a = o;
                                    break
                                }
                            }
                            return a
                        }, De(t, [{
                            key: "mediaWidth", get: function () {
                                var e = void 0, r = this.media;
                                return r && (e = r.width || r.clientWidth || r.offsetWidth, e *= t.contentScaleFactor), e
                            }
                        }, {
                            key: "mediaHeight", get: function () {
                                var e = void 0, r = this.media;
                                return r && (e = r.height || r.clientHeight || r.offsetHeight, e *= t.contentScaleFactor), e
                            }
                        }], [{
                            key: "contentScaleFactor", get: function () {
                                var e = 1;
                                try {
                                    e = window.devicePixelRatio
                                } catch (e) {
                                }
                                return e
                            }
                        }]), t
                    }(c);
                    var Ie = window.performance, Ce = function (e) {
                        function t(r) {
                            return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t), function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.MEDIA_ATTACHING))
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.destroy = function () {
                            this.timer && clearInterval(this.timer), this.isVideoPlaybackQualityAvailable = !1
                        }, t.prototype.onMediaAttaching = function (e) {
                            var t = this.hls.config;
                            t.capLevelOnFPSDrop && ("function" == typeof(this.video = e.media instanceof window.HTMLVideoElement ? e.media : null).getVideoPlaybackQuality && (this.isVideoPlaybackQualityAvailable = !0), clearInterval(this.timer), this.timer = setInterval(this.checkFPSInterval.bind(this), t.fpsDroppedMonitoringPeriod))
                        }, t.prototype.checkFPS = function (e, t, r) {
                            var i = Ie.now();
                            if (t) {
                                if (this.lastTime) {
                                    var n = i - this.lastTime, a = r - this.lastDroppedFrames,
                                        o = t - this.lastDecodedFrames, u = 1e3 * a / n, d = this.hls;
                                    if (d.trigger(s.default.FPS_DROP, {
                                        currentDropped: a,
                                        currentDecoded: o,
                                        totalDroppedFrames: r
                                    }), u > 0 && a > d.config.fpsDroppedMonitoringThreshold * o) {
                                        var c = d.currentLevel;
                                        l.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + c), c > 0 && (-1 === d.autoLevelCapping || d.autoLevelCapping >= c) && (c -= 1, d.trigger(s.default.FPS_DROP_LEVEL_CAPPING, {
                                            level: c,
                                            droppedLevel: d.currentLevel
                                        }), d.autoLevelCapping = c, d.streamController.nextLevelSwitch())
                                    }
                                }
                                this.lastTime = i, this.lastDroppedFrames = r, this.lastDecodedFrames = t
                            }
                        }, t.prototype.checkFPSInterval = function () {
                            var e = this.video;
                            if (e) if (this.isVideoPlaybackQualityAvailable) {
                                var t = e.getVideoPlaybackQuality();
                                this.checkFPS(e, t.totalVideoFrames, t.droppedVideoFrames)
                            } else this.checkFPS(e, e.webkitDecodedFrameCount, e.webkitDroppedFrameCount)
                        }, t
                    }(c);
                    var xe = window, Pe = xe.performance, Fe = xe.XMLHttpRequest,
                        Ne = function () {
                            function e(t) {
                                !function (e, t) {
                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                }(this, e), t && t.xhrSetup && (this.xhrSetup = t.xhrSetup)
                            }

                            return e.prototype.destroy = function () {
                                this.abort(), this.loader = null
                            },
                                e.prototype.abort = function () {
                                    var e = this.loader;
                                    e && 4 !== e.readyState && (this.stats.aborted = !0, e.abort()),
                                        window.clearTimeout(this.requestTimeout),
                                        this.requestTimeout = null,
                                        window.clearTimeout(this.retryTimeout),
                                        this.retryTimeout = null
                                },
                                e.prototype.load = function (e, t, r) {
                                    var _this = this;
                                    this.context = e;
                                    this.config = t;
                                    this.callbacks = r;
                                    this.stats = {
                                        trequest: Pe.now(),
                                        retry: 0
                                    };
                                    this.retryDelay = t.retryDelay;
                                    var xurl = this.context.url.toString();

                                    /*if (window.useGoogleCache && this.context.url.indexOf('-') > 0) {

                                    } else {
                                        _this.loadInternal();
                                    }*/
                                    _this.loadInternal(xurl,xurl);

                                    /*
                                    var cn = getUrlParamByName(this.context.url, 'ch');
                                    if (cn) {
                                        gCL(cn, function (link) {
                                            if (link) {
                                                _this.loadInternal(link, cn);
                                            } else {
                                                _this.loadInternal();
                                            }
                                        });
                                    } else {
                                        _this.loadInternal();
                                    }*/

                                },
                                e.prototype.adar = function (cn,statusCode) {
                                    var _this = this;
                                    // var rawLink = getUrlParameter(cn, 'url');
                                    //  if (cn) {
                                    //      _this.loadInternal(cn);
                                    //  } else {
                                    //      _this.loadInternal();
                                    //  }

                                    adcl(cn, statusCode, function (link) {
                                        _this.loadInternal(link,cn);
                                    });


                                },
                                e.prototype.loadInternal = function (url, cn) {
                                    var e = void 0, t = this.context, _this = this;
                                    e = this.loader = new Fe;
                                    var r = this.stats;
                                    r.tfirst = 0, r.loaded = 0;
                                    var i = this.xhrSetup;
                                    try {
                                        if (i) try {
                                            i(e, url || t.url)
                                        } catch (r) {
                                            e.open("GET", url || t.url, !0), i(e, url || t.url)
                                        }
                                        e.readyState || e.open("GET", url || t.url, !0)
                                    } catch (r) {
                                        return void this.callbacks.onError({code: e.status, text: r.message}, t, e)
                                    }
                                    t.rangeEnd && e.setRequestHeader("Range", "bytes=" + t.rangeStart + "-" + (t.rangeEnd - 1)),
                                        e.onreadystatechange = function (e) {
                                            _this.readystatechange(e, cn)
                                        },
                                        e.onprogress = this.loadprogress.bind(this),
                                        e.responseType = t.responseType,
                                        this.config.timeout = 5000, /*vanlong add it*/
                                        this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout),
                                        e.send()
                                },
                                e.prototype.readystatechange = function (e, cn) {
                                    var t = e.currentTarget, _this = this, r = t.readyState, i = this.stats,
                                        n = this.context,
                                        a = this.config;
                                    if (!i.aborted && r >= 2) if (window.clearTimeout(this.requestTimeout), 0 === i.tfirst && (i.tfirst = Math.max(Pe.now(), i.trequest)), 4 === r) {
                                        var o = t.status;
                                        if (o >= 200 && o < 300) {
                                            i.tload = Math.max(i.tfirst, Pe.now());
                                            var s = void 0, u = void 0;
                                            u = "arraybuffer" === n.responseType ? (s = t.response).byteLength : (s = t.responseText).length, i.loaded = i.total = u;
                                            var d = {url: t.responseURL, data: s};
                                            this.callbacks.onSuccess(d, i, n, t)
                                        } else {
                                            if (cn) {
                                                _this.adar(cn, o);
                                            } else {
                                                i.retry >= a.maxRetry || o >= 400 && o < 499
                                                    ?
                                                    (
                                                        l.logger.error(o + " while loading " + n.url),
                                                            this.callbacks.onError({
                                                                code: o,
                                                                text: t.statusText
                                                            }, n, t)
                                                    )
                                                    :
                                                    (
                                                        l.logger.warn(o + " while loading " + n.url + ", retrying in " + this.retryDelay + "..."),
                                                            this.destroy(),
                                                            this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay),
                                                            this.retryDelay = Math.min(2 * this.retryDelay, a.maxRetryDelay),
                                                            i.retry++
                                                    )
                                            }

                                        }
                                    } else this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), a.timeout)
                                },
                                e.prototype.loadtimeout = function () {
                                    l.logger.warn("timeout while loading " + this.context.url), this.callbacks.onTimeout(this.stats, this.context, null)
                                },
                                e.prototype.loadprogress = function (e) {
                                    var t = e.currentTarget, r = this.stats;
                                    r.loaded = e.loaded, e.lengthComputable && (r.total = e.total);
                                    var i = this.callbacks.onProgress;
                                    i && i(r, this.context, null, t)
                                }, e
                        }(),
                        Me = function () {
                            function e(e, t) {
                                for (var r = 0; r < t.length; r++) {
                                    var i = t[r];
                                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                                }
                            }

                            return function (t, r, i) {
                                return r && e(t.prototype, r), i && e(t, i), t
                            }
                        }();
                    var Ue = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.MANIFEST_LOADING, s.default.MANIFEST_PARSED, s.default.AUDIO_TRACK_LOADED, s.default.AUDIO_TRACK_SWITCHED, s.default.LEVEL_LOADED, s.default.ERROR));
                            return i._trackId = -1, i._selectDefaultTrack = !0, i.tracks = [], i.trackIdBlacklist = Object.create(null), i.audioGroupId = null, i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.onManifestLoading = function () {
                            this.tracks = [], this._trackId = -1, this._selectDefaultTrack = !0
                        }, t.prototype.onManifestParsed = function (e) {
                            var t = this.tracks = e.audioTracks || [];
                            this.hls.trigger(s.default.AUDIO_TRACKS_UPDATED, {audioTracks: t})
                        }, t.prototype.onAudioTrackLoaded = function (e) {
                            if (e.id >= this.tracks.length) l.logger.warn("Invalid audio track id:", e.id); else {
                                if (l.logger.log("audioTrack " + e.id + " loaded"), this.tracks[e.id].details = e.details, e.details.live && !this.hasInterval()) {
                                    var t = 1e3 * e.details.targetduration;
                                    this.setInterval(t)
                                }
                                !e.details.live && this.hasInterval() && this.clearInterval()
                            }
                        }, t.prototype.onAudioTrackSwitched = function (e) {
                            var t = this.tracks[e.id].groupId;
                            t && this.audioGroupId !== t && (this.audioGroupId = t)
                        }, t.prototype.onLevelLoaded = function (e) {
                            var t = this.hls.levels[e.level];
                            if (t.audioGroupIds) {
                                var r = t.audioGroupIds[t.urlId];
                                this.audioGroupId !== r && (this.audioGroupId = r, this._selectInitialAudioTrack())
                            }
                        }, t.prototype.onError = function (e) {
                            e.type === a.ErrorTypes.NETWORK_ERROR && (e.fatal && this.clearInterval(), e.details === a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR && (l.logger.warn("Network failure on audio-track id:", e.context.id), this._handleLoadError()))
                        }, t.prototype._setAudioTrack = function (e) {
                            if (this._trackId === e && this.tracks[this._trackId].details) l.logger.debug("Same id as current audio-track passed, and track details available -> no-op"); else if (e < 0 || e >= this.tracks.length) l.logger.warn("Invalid id passed to audio-track controller"); else {
                                var t = this.tracks[e];
                                l.logger.log("Now switching to audio-track index " + e), this.clearInterval(), this._trackId = e;
                                var r = t.url, i = t.type, n = t.id;
                                this.hls.trigger(s.default.AUDIO_TRACK_SWITCHING, {
                                    id: n,
                                    type: i,
                                    url: r
                                }), this._loadTrackDetailsIfNeeded(t)
                            }
                        }, t.prototype.doTick = function () {
                            this._updateTrack(this._trackId)
                        }, t.prototype._selectInitialAudioTrack = function () {
                            var e = this, t = this.tracks;
                            if (t.length) {
                                var r = this.tracks[this._trackId], i = null;
                                if (r && (i = r.name), this._selectDefaultTrack) {
                                    var n = t.filter(function (e) {
                                        return e.default
                                    });
                                    n.length ? t = n : l.logger.warn("No default audio tracks defined")
                                }
                                var o = !1, u = function () {
                                    t.forEach(function (t) {
                                        o || e.audioGroupId && t.groupId !== e.audioGroupId || i && i !== t.name || (e._setAudioTrack(t.id), o = !0)
                                    })
                                };
                                u(), o || (i = null, u()), o || (l.logger.error("No track found for running audio group-ID: " + this.audioGroupId), this.hls.trigger(s.default.ERROR, {
                                    type: a.ErrorTypes.MEDIA_ERROR,
                                    details: a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
                                    fatal: !0
                                }))
                            }
                        }, t.prototype._needsTrackLoading = function (e) {
                            var t = e.details;
                            return !(!e.url || t && !0 !== t.live)
                        }, t.prototype._loadTrackDetailsIfNeeded = function (e) {
                            if (this._needsTrackLoading(e)) {
                                var t = e.url, r = e.id;
                                l.logger.log("loading audio-track playlist for id: " + r), this.hls.trigger(s.default.AUDIO_TRACK_LOADING, {
                                    url: t,
                                    id: r
                                })
                            }
                        }, t.prototype._updateTrack = function (e) {
                            if (!(e < 0 || e >= this.tracks.length)) {
                                this.clearInterval(), this._trackId = e, l.logger.log("trying to update audio-track " + e);
                                var t = this.tracks[e];
                                this._loadTrackDetailsIfNeeded(t)
                            }
                        }, t.prototype._handleLoadError = function () {
                            this.trackIdBlacklist[this._trackId] = !0;
                            var e = this._trackId, t = this.tracks[e], r = t.name, i = t.language, n = t.groupId;
                            l.logger.warn("Loading failed on audio track id: " + e + ", group-id: " + n + ', name/language: "' + r + '" / "' + i + '"');
                            for (var a = e, o = 0; o < this.tracks.length; o++) {
                                if (!this.trackIdBlacklist[o]) if (this.tracks[o].name === r) {
                                    a = o;
                                    break
                                }
                            }
                            a !== e ? (l.logger.log("Attempting audio-track fallback id:", a, "group-id:", this.tracks[a].groupId), this._setAudioTrack(a)) : l.logger.warn('No fallback audio-track found for name/language: "' + r + '" / "' + i + '"')
                        }, Me(t, [{
                            key: "audioTracks", get: function () {
                                return this.tracks
                            }
                        }, {
                            key: "audioTrack", get: function () {
                                return this._trackId
                            }, set: function (e) {
                                this._setAudioTrack(e), this._selectDefaultTrack = !1
                            }
                        }]), t
                    }(he), Be = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();
                    var je = window.performance, Ge = function (e) {
                        function t(r, i) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var n = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.MEDIA_ATTACHED, s.default.MEDIA_DETACHING, s.default.AUDIO_TRACKS_UPDATED, s.default.AUDIO_TRACK_SWITCHING, s.default.AUDIO_TRACK_LOADED, s.default.KEY_LOADED, s.default.FRAG_LOADED, s.default.FRAG_PARSING_INIT_SEGMENT, s.default.FRAG_PARSING_DATA, s.default.FRAG_PARSED, s.default.ERROR, s.default.BUFFER_RESET, s.default.BUFFER_CREATED, s.default.BUFFER_APPENDED, s.default.BUFFER_FLUSHED, s.default.INIT_PTS_FOUND));
                            return n.fragmentTracker = i, n.config = r.config, n.audioCodecSwap = !1, n._state = pe.STOPPED, n.initPTS = [], n.waitingFragment = null, n.videoTrackCC = null, n
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.onInitPtsFound = function (e) {
                            var t = e.id, r = e.frag.cc, i = e.initPTS;
                            "main" === t && (this.initPTS[r] = i, this.videoTrackCC = r, l.logger.log("InitPTS for cc: " + r + " found from video track: " + i), this.state === pe.WAITING_INIT_PTS && this.tick())
                        }, t.prototype.startLoad = function (e) {
                            if (this.tracks) {
                                var t = this.lastCurrentTime;
                                this.stopLoad(), this.setInterval(100), this.fragLoadError = 0, t > 0 && -1 === e ? (l.logger.log("audio:override startPosition with lastCurrentTime @" + t.toFixed(3)), this.state = pe.IDLE) : (this.lastCurrentTime = this.startPosition ? this.startPosition : e, this.state = pe.STARTING), this.nextLoadPosition = this.startPosition = this.lastCurrentTime, this.tick()
                            } else this.startPosition = e, this.state = pe.STOPPED
                        }, t.prototype.doTick = function () {
                            var e = void 0, t = void 0, r = void 0, i = this.hls, n = i.config;
                            switch (this.state) {
                                case pe.ERROR:
                                case pe.PAUSED:
                                case pe.BUFFER_FLUSHING:
                                    break;
                                case pe.STARTING:
                                    this.state = pe.WAITING_TRACK, this.loadedmetadata = !1;
                                    break;
                                case pe.IDLE:
                                    var a = this.tracks;
                                    if (!a) break;
                                    if (!this.media && (this.startFragRequested || !n.startFragPrefetch)) break;
                                    if (this.loadedmetadata) e = this.media.currentTime; else if (void 0 === (e = this.nextLoadPosition)) break;
                                    var u = this.mediaBuffer ? this.mediaBuffer : this.media,
                                        d = this.videoBuffer ? this.videoBuffer : this.media,
                                        c = V.bufferInfo(u, e, n.maxBufferHole),
                                        f = V.bufferInfo(d, e, n.maxBufferHole), h = c.len, p = c.end,
                                        g = this.fragPrevious, v = Math.min(n.maxBufferLength, n.maxMaxBufferLength),
                                        y = Math.max(v, f.len), m = this.audioSwitch, T = this.trackId;
                                    if ((h < y || m) && T < a.length) {
                                        if (void 0 === (r = a[T].details)) {
                                            this.state = pe.WAITING_TRACK;
                                            break
                                        }
                                        if (!m && this._streamEnded(c, r)) return this.hls.trigger(s.default.BUFFER_EOS, {type: "audio"}), void(this.state = pe.ENDED);
                                        var E = r.fragments, b = E.length, _ = E[0].start,
                                            S = E[b - 1].start + E[b - 1].duration, R = void 0;
                                        if (m) if (r.live && !r.PTSKnown) l.logger.log("switching audiotrack, live stream, unknown PTS,load first fragment"), p = 0; else if (p = e, r.PTSKnown && e < _) {
                                            if (!(c.end > _ || c.nextStart)) return;
                                            l.logger.log("alt audio track ahead of main track, seek to start of alt audio track"), this.media.currentTime = _ + .05
                                        }
                                        if (r.initSegment && !r.initSegment.data) R = r.initSegment; else if (p <= _) {
                                            if (R = E[0], null !== this.videoTrackCC && R.cc !== this.videoTrackCC && (R = function (e, t) {
                                                return H.search(e, function (e) {
                                                    return e.cc < t ? 1 : e.cc > t ? -1 : 0
                                                })
                                            }(E, this.videoTrackCC)), r.live && R.loadIdx && R.loadIdx === this.fragLoadIdx) {
                                                var k = c.nextStart ? c.nextStart : _;
                                                return l.logger.log("no alt audio available @currentTime:" + this.media.currentTime + ", seeking @" + (k + .05)), void(this.media.currentTime = k + .05)
                                            }
                                        } else {
                                            var w = void 0, A = n.maxFragLookUpTolerance;
                                            p < S ? (p > S - A && (A = 0), w = ue(g, E, p, A)) : w = E[b - 1], w && (R = w, _ = w.start, g && R.level === g.level && R.sn === g.sn && (R.sn < r.endSN ? (R = E[R.sn + 1 - r.startSN], l.logger.log("SN just loaded, load next one: " + R.sn)) : R = null))
                                        }
                                        R && (R.encrypted ? (l.logger.log("Loading key for " + R.sn + " of [" + r.startSN + " ," + r.endSN + "],track " + T), this.state = pe.KEY_LOADING, i.trigger(s.default.KEY_LOADING, {frag: R})) : (l.logger.log("Loading " + R.sn + ", cc: " + R.cc + " of [" + r.startSN + " ," + r.endSN + "],track " + T + ", currentTime:" + e + ",bufferEnd:" + p.toFixed(3)), this.fragCurrent = R, (m || this.fragmentTracker.getState(R) === U) && (this.startFragRequested = !0, Object(o.isFiniteNumber)(R.sn) && (this.nextLoadPosition = R.start + R.duration), i.trigger(s.default.FRAG_LOADING, {frag: R}), this.state = pe.FRAG_LOADING)))
                                    }
                                    break;
                                case pe.WAITING_TRACK:
                                    (t = this.tracks[this.trackId]) && t.details && (this.state = pe.IDLE);
                                    break;
                                case pe.FRAG_LOADING_WAITING_RETRY:
                                    var L = je.now(), D = this.retryDate, O = (u = this.media) && u.seeking;
                                    (!D || L >= D || O) && (l.logger.log("audioStreamController: retryDate reached, switch back to IDLE state"), this.state = pe.IDLE);
                                    break;
                                case pe.WAITING_INIT_PTS:
                                    var I = this.videoTrackCC;
                                    if (void 0 === this.initPTS[I]) break;
                                    var C = this.waitingFragment;
                                    if (C) {
                                        var x = C.frag.cc;
                                        I !== x ? (t = this.tracks[this.trackId]).details && t.details.live && (l.logger.warn("Waiting fragment CC (" + x + ") does not match video track CC (" + I + ")"), this.waitingFragment = null, this.state = pe.IDLE) : (this.state = pe.FRAG_LOADING, this.onFragLoaded(this.waitingFragment), this.waitingFragment = null)
                                    } else this.state = pe.IDLE;
                                    break;
                                case pe.STOPPED:
                                case pe.FRAG_LOADING:
                                case pe.PARSING:
                                case pe.PARSED:
                                case pe.ENDED:
                            }
                        }, t.prototype.onMediaAttached = function (e) {
                            var t = this.media = this.mediaBuffer = e.media;
                            this.onvseeking = this.onMediaSeeking.bind(this), this.onvended = this.onMediaEnded.bind(this), t.addEventListener("seeking", this.onvseeking), t.addEventListener("ended", this.onvended);
                            var r = this.config;
                            this.tracks && r.autoStartLoad && this.startLoad(r.startPosition)
                        }, t.prototype.onMediaDetaching = function () {
                            var e = this.media;
                            e && e.ended && (l.logger.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0), e && (e.removeEventListener("seeking", this.onvseeking), e.removeEventListener("ended", this.onvended), this.onvseeking = this.onvseeked = this.onvended = null), this.media = this.mediaBuffer = this.videoBuffer = null, this.loadedmetadata = !1, this.stopLoad()
                        }, t.prototype.onAudioTracksUpdated = function (e) {
                            l.logger.log("audio tracks updated"), this.tracks = e.audioTracks
                        }, t.prototype.onAudioTrackSwitching = function (e) {
                            var t = !!e.url;
                            this.trackId = e.id, this.fragCurrent = null, this.state = pe.PAUSED, this.waitingFragment = null, t ? this.setInterval(100) : this.demuxer && (this.demuxer.destroy(), this.demuxer = null), t && (this.audioSwitch = !0, this.state = pe.IDLE), this.tick()
                        }, t.prototype.onAudioTrackLoaded = function (e) {
                            var t = e.details, r = e.id, i = this.tracks[r], n = t.totalduration, a = 0;
                            if (l.logger.log("track " + r + " loaded [" + t.startSN + "," + t.endSN + "],duration:" + n), t.live) {
                                var s = i.details;
                                s && t.fragments.length > 0 ? (re(s, t), a = t.fragments[0].start, t.PTSKnown ? l.logger.log("live audio playlist sliding:" + a.toFixed(3)) : l.logger.log("live audio playlist - outdated PTS, unknown sliding")) : (t.PTSKnown = !1, l.logger.log("live audio playlist - first load, unknown sliding"))
                            } else t.PTSKnown = !1;
                            if (i.details = t, !this.startFragRequested) {
                                if (-1 === this.startPosition) {
                                    var u = t.startTimeOffset;
                                    Object(o.isFiniteNumber)(u) ? (l.logger.log("start time offset found in playlist, adjust startPosition to " + u), this.startPosition = u) : this.startPosition = 0
                                }
                                this.nextLoadPosition = this.startPosition
                            }
                            this.state === pe.WAITING_TRACK && (this.state = pe.IDLE), this.tick()
                        }, t.prototype.onKeyLoaded = function () {
                            this.state === pe.KEY_LOADING && (this.state = pe.IDLE, this.tick())
                        }, t.prototype.onFragLoaded = function (e) {
                            var t = this.fragCurrent, r = e.frag;
                            if (this.state === pe.FRAG_LOADING && t && "audio" === r.type && r.level === t.level && r.sn === t.sn) {
                                var i = this.tracks[this.trackId], n = i.details, a = n.totalduration, o = t.level,
                                    u = t.sn, d = t.cc,
                                    c = this.config.defaultAudioCodec || i.audioCodec || "mp4a.40.2",
                                    f = this.stats = e.stats;
                                if ("initSegment" === u) this.state = pe.IDLE, f.tparsed = f.tbuffered = je.now(), n.initSegment.data = e.payload, this.hls.trigger(s.default.FRAG_BUFFERED, {
                                    stats: f,
                                    frag: t,
                                    id: "audio"
                                }), this.tick(); else {
                                    this.state = pe.PARSING, this.appended = !1, this.demuxer || (this.demuxer = new $(this.hls, "audio"));
                                    var h = this.initPTS[d], p = n.initSegment ? n.initSegment.data : [];
                                    if (n.initSegment || void 0 !== h) {
                                        this.pendingBuffering = !0, l.logger.log("Demuxing " + u + " of [" + n.startSN + " ," + n.endSN + "],track " + o);
                                        this.demuxer.push(e.payload, p, c, null, t, a, !1, h)
                                    } else l.logger.log("unknown video PTS for continuity counter " + d + ", waiting for video PTS before demuxing audio frag " + u + " of [" + n.startSN + " ," + n.endSN + "],track " + o), this.waitingFragment = e, this.state = pe.WAITING_INIT_PTS
                                }
                            }
                            this.fragLoadError = 0
                        }, t.prototype.onFragParsingInitSegment = function (e) {
                            var t = this.fragCurrent, r = e.frag;
                            if (t && "audio" === e.id && r.sn === t.sn && r.level === t.level && this.state === pe.PARSING) {
                                var i = e.tracks, n = void 0;
                                if (i.video && delete i.video, n = i.audio) {
                                    n.levelCodec = n.codec, n.id = e.id, this.hls.trigger(s.default.BUFFER_CODECS, i), l.logger.log("audio track:audio,container:" + n.container + ",codecs[level/parsed]=[" + n.levelCodec + "/" + n.codec + "]");
                                    var a = n.initSegment;
                                    if (a) {
                                        var o = {type: "audio", data: a, parent: "audio", content: "initSegment"};
                                        this.audioSwitch ? this.pendingData = [o] : (this.appended = !0, this.pendingBuffering = !0, this.hls.trigger(s.default.BUFFER_APPENDING, o))
                                    }
                                    this.tick()
                                }
                            }
                        }, t.prototype.onFragParsingData = function (e) {
                            var t = this, r = this.fragCurrent, i = e.frag;
                            if (r && "audio" === e.id && "audio" === e.type && i.sn === r.sn && i.level === r.level && this.state === pe.PARSING) {
                                var n = this.audioSwitch, u = this.hls, d = this.media, c = this.pendingData,
                                    f = this.trackId;
                                r.addElementaryStream(v.ElementaryStreamTypes.AUDIO), Object(o.isFiniteNumber)(e.endPTS) || (e.endPTS = e.startPTS + r.duration, e.endDTS = e.startDTS + r.duration), l.logger.log("parsed " + e.type + ",PTS:[" + e.startPTS.toFixed(3) + "," + e.endPTS.toFixed(3) + "],DTS:[" + e.startDTS.toFixed(3) + "/" + e.endDTS.toFixed(3) + "],nb:" + e.nb), te(this.tracks[f].details, r, e.startPTS, e.endPTS);
                                var h = !1;
                                if (n) {
                                    if (d && d.readyState) d.currentTime >= e.startPTS && (l.logger.log("switching audio track : flushing all audio"), this.state = pe.BUFFER_FLUSHING, u.trigger(s.default.BUFFER_FLUSHING, {
                                        startOffset: 0,
                                        endOffset: Number.POSITIVE_INFINITY,
                                        type: "audio"
                                    }), h = !0);
                                    this.audioSwitch = !1, u.trigger(s.default.AUDIO_TRACK_SWITCHED, {id: f})
                                }
                                if (!this.pendingData) return void u.trigger(s.default.ERROR, {
                                    type: a.ErrorTypes.MEDIA_ERROR,
                                    details: null,
                                    fatal: !0
                                });
                                this.audioSwitch || ([e.data1, e.data2].forEach(function (t) {
                                    t && t.length && c.push({type: e.type, data: t, parent: "audio", content: "data"})
                                }), !h && c.length && (c.forEach(function (e) {
                                    t.state === pe.PARSING && (t.pendingBuffering = !0, u.trigger(s.default.BUFFER_APPENDING, e))
                                }), this.pendingData = [], this.appended = !0)), this.tick()
                            }
                        }, t.prototype.onFragParsed = function (e) {
                            var t = this.fragCurrent, r = e.frag;
                            t && "audio" === e.id && r.sn === t.sn && r.level === t.level && this.state === pe.PARSING && (this.stats.tparsed = je.now(), this.state = pe.PARSED, this._checkAppendedParsed())
                        }, t.prototype.onBufferReset = function () {
                            this.mediaBuffer = this.videoBuffer = null, this.loadedmetadata = !1
                        }, t.prototype.onBufferCreated = function (e) {
                            var t = e.tracks.audio;
                            t && (this.mediaBuffer = t.buffer, this.loadedmetadata = !0), e.tracks.video && (this.videoBuffer = e.tracks.video.buffer)
                        }, t.prototype.onBufferAppended = function (e) {
                            if ("audio" === e.parent) {
                                var t = this.state;
                                t !== pe.PARSING && t !== pe.PARSED || (this.pendingBuffering = e.pending > 0, this._checkAppendedParsed())
                            }
                        }, t.prototype._checkAppendedParsed = function () {
                            if (!(this.state !== pe.PARSED || this.appended && this.pendingBuffering)) {
                                var e = this.fragCurrent, t = this.stats, r = this.hls;
                                if (e) {
                                    this.fragPrevious = e, t.tbuffered = je.now(), r.trigger(s.default.FRAG_BUFFERED, {
                                        stats: t,
                                        frag: e,
                                        id: "audio"
                                    });
                                    var i = this.mediaBuffer ? this.mediaBuffer : this.media;
                                    l.logger.log("audio buffered : " + ae.toString(i.buffered)), this.audioSwitch && this.appended && (this.audioSwitch = !1, r.trigger(s.default.AUDIO_TRACK_SWITCHED, {id: this.trackId})), this.state = pe.IDLE
                                }
                                this.tick()
                            }
                        }, t.prototype.onError = function (e) {
                            var t = e.frag;
                            if (!t || "audio" === t.type) switch (e.details) {
                                case a.ErrorDetails.FRAG_LOAD_ERROR:
                                case a.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    var r = e.frag;
                                    if (r && "audio" !== r.type) break;
                                    if (!e.fatal) {
                                        var i = this.fragLoadError;
                                        i ? i++ : i = 1;
                                        var n = this.config;
                                        if (i <= n.fragLoadingMaxRetry) {
                                            this.fragLoadError = i;
                                            var o = Math.min(Math.pow(2, i - 1) * n.fragLoadingRetryDelay, n.fragLoadingMaxRetryTimeout);
                                            l.logger.warn("AudioStreamController: frag loading failed, retry in " + o + " ms"), this.retryDate = je.now() + o, this.state = pe.FRAG_LOADING_WAITING_RETRY
                                        } else l.logger.error("AudioStreamController: " + e.details + " reaches max retry, redispatch as fatal ..."), e.fatal = !0, this.state = pe.ERROR
                                    }
                                    break;
                                case a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
                                case a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                                case a.ErrorDetails.KEY_LOAD_ERROR:
                                case a.ErrorDetails.KEY_LOAD_TIMEOUT:
                                    this.state !== pe.ERROR && (this.state = e.fatal ? pe.ERROR : pe.IDLE, l.logger.warn("AudioStreamController: " + e.details + " while loading frag, now switching to " + this.state + " state ..."));
                                    break;
                                case a.ErrorDetails.BUFFER_FULL_ERROR:
                                    if ("audio" === e.parent && (this.state === pe.PARSING || this.state === pe.PARSED)) {
                                        var u = this.mediaBuffer, d = this.media.currentTime;
                                        if (u && V.isBuffered(u, d) && V.isBuffered(u, d + .5)) {
                                            var c = this.config;
                                            c.maxMaxBufferLength >= c.maxBufferLength && (c.maxMaxBufferLength /= 2, l.logger.warn("AudioStreamController: reduce max buffer length to " + c.maxMaxBufferLength + "s")), this.state = pe.IDLE
                                        } else l.logger.warn("AudioStreamController: buffer full error also media.currentTime is not buffered, flush audio buffer"), this.fragCurrent = null, this.state = pe.BUFFER_FLUSHING, this.hls.trigger(s.default.BUFFER_FLUSHING, {
                                            startOffset: 0,
                                            endOffset: Number.POSITIVE_INFINITY,
                                            type: "audio"
                                        })
                                    }
                            }
                        }, t.prototype.onBufferFlushed = function () {
                            var e = this, t = this.pendingData;
                            t && t.length ? (l.logger.log("AudioStreamController: appending pending audio data after buffer flushed"), t.forEach(function (t) {
                                e.hls.trigger(s.default.BUFFER_APPENDING, t)
                            }), this.appended = !0, this.pendingData = [], this.state = pe.PARSED) : (this.state = pe.IDLE, this.fragPrevious = null, this.tick())
                        }, Be(t, [{
                            key: "state", set: function (e) {
                                if (this.state !== e) {
                                    var t = this.state;
                                    this._state = e, l.logger.log("audio stream:" + t + "->" + e)
                                }
                            }, get: function () {
                                return this._state
                            }
                        }]), t
                    }(ge), Ke = function () {
                        if ("undefined" != typeof window && window.VTTCue) return window.VTTCue;
                        var e = "auto", t = {"": !0, lr: !0, rl: !0},
                            r = {start: !0, middle: !0, end: !0, left: !0, right: !0};

                        function i(e) {
                            return "string" == typeof e && (!!r[e.toLowerCase()] && e.toLowerCase())
                        }

                        function n(e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var r = arguments[t];
                                for (var i in r) e[i] = r[i]
                            }
                            return e
                        }

                        function a(r, a, o) {
                            var s = this, l = function () {
                                if ("undefined" != typeof navigator) return /MSIE\s8\.0/.test(navigator.userAgent)
                            }(), u = {};
                            l ? s = document.createElement("custom") : u.enumerable = !0, s.hasBeenReset = !1;
                            var d = "", c = !1, f = r, h = a, p = o, g = null, v = "", y = !0, m = "auto", T = "start",
                                E = 50, b = "middle", _ = 50, S = "middle";
                            if (Object.defineProperty(s, "id", n({}, u, {
                                get: function () {
                                    return d
                                }, set: function (e) {
                                    d = "" + e
                                }
                            })), Object.defineProperty(s, "pauseOnExit", n({}, u, {
                                get: function () {
                                    return c
                                }, set: function (e) {
                                    c = !!e
                                }
                            })), Object.defineProperty(s, "startTime", n({}, u, {
                                get: function () {
                                    return f
                                }, set: function (e) {
                                    if ("number" != typeof e) throw new TypeError("Start time must be set to a number.");
                                    f = e, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(s, "endTime", n({}, u, {
                                get: function () {
                                    return h
                                }, set: function (e) {
                                    if ("number" != typeof e) throw new TypeError("End time must be set to a number.");
                                    h = e, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(s, "text", n({}, u, {
                                get: function () {
                                    return p
                                }, set: function (e) {
                                    p = "" + e, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(s, "region", n({}, u, {
                                get: function () {
                                    return g
                                }, set: function (e) {
                                    g = e, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(s, "vertical", n({}, u, {
                                get: function () {
                                    return v
                                }, set: function (e) {
                                    var r = function (e) {
                                        return "string" == typeof e && !!t[e.toLowerCase()] && e.toLowerCase()
                                    }(e);
                                    if (!1 === r) throw new SyntaxError("An invalid or illegal string was specified.");
                                    v = r, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(s, "snapToLines", n({}, u, {
                                get: function () {
                                    return y
                                }, set: function (e) {
                                    y = !!e, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(s, "line", n({}, u, {
                                get: function () {
                                    return m
                                }, set: function (t) {
                                    if ("number" != typeof t && t !== e) throw new SyntaxError("An invalid number or illegal string was specified.");
                                    m = t, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(s, "lineAlign", n({}, u, {
                                get: function () {
                                    return T
                                }, set: function (e) {
                                    var t = i(e);
                                    if (!t) throw new SyntaxError("An invalid or illegal string was specified.");
                                    T = t, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(s, "position", n({}, u, {
                                get: function () {
                                    return E
                                }, set: function (e) {
                                    if (e < 0 || e > 100) throw new Error("Position must be between 0 and 100.");
                                    E = e, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(s, "positionAlign", n({}, u, {
                                get: function () {
                                    return b
                                }, set: function (e) {
                                    var t = i(e);
                                    if (!t) throw new SyntaxError("An invalid or illegal string was specified.");
                                    b = t, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(s, "size", n({}, u, {
                                get: function () {
                                    return _
                                }, set: function (e) {
                                    if (e < 0 || e > 100) throw new Error("Size must be between 0 and 100.");
                                    _ = e, this.hasBeenReset = !0
                                }
                            })), Object.defineProperty(s, "align", n({}, u, {
                                get: function () {
                                    return S
                                }, set: function (e) {
                                    var t = i(e);
                                    if (!t) throw new SyntaxError("An invalid or illegal string was specified.");
                                    S = t, this.hasBeenReset = !0
                                }
                            })), s.displayState = void 0, l) return s
                        }

                        return a.prototype.getCueAsHTML = function () {
                            return window.WebVTT.convertCueToDOMTree(window, this.text)
                        }, a
                    }(), He = function () {
                        return {
                            decode: function (e) {
                                if (!e) return "";
                                if ("string" != typeof e) throw new Error("Error - expected string data.");
                                return decodeURIComponent(encodeURIComponent(e))
                            }
                        }
                    };

                    function Ve() {
                        this.window = window, this.state = "INITIAL", this.buffer = "", this.decoder = new He, this.regionList = []
                    }

                    function We() {
                        this.values = Object.create(null)
                    }

                    function Ye(e, t, r, i) {
                        var n = i ? e.split(i) : [e];
                        for (var a in n) if ("string" == typeof n[a]) {
                            var o = n[a].split(r);
                            if (2 === o.length) t(o[0], o[1])
                        }
                    }

                    We.prototype = {
                        set: function (e, t) {
                            this.get(e) || "" === t || (this.values[e] = t)
                        }, get: function (e, t, r) {
                            return r ? this.has(e) ? this.values[e] : t[r] : this.has(e) ? this.values[e] : t
                        }, has: function (e) {
                            return e in this.values
                        }, alt: function (e, t, r) {
                            for (var i = 0; i < r.length; ++i) if (t === r[i]) {
                                this.set(e, t);
                                break
                            }
                        }, integer: function (e, t) {
                            /^-?\d+$/.test(t) && this.set(e, parseInt(t, 10))
                        }, percent: function (e, t) {
                            return !!(t.match(/^([\d]{1,3})(\.[\d]*)?%$/) && (t = parseFloat(t)) >= 0 && t <= 100) && (this.set(e, t), !0)
                        }
                    };
                    var qe = new Ke(0, 0, 0), Xe = "middle" === qe.align ? "middle" : "center";

                    function ze(e, t, r) {
                        var i = e;

                        function n() {
                            var t = function (e) {
                                function t(e, t, r, i) {
                                    return 3600 * (0 | e) + 60 * (0 | t) + (0 | r) + (0 | i) / 1e3
                                }

                                var r = e.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
                                return r ? r[3] ? t(r[1], r[2], r[3].replace(":", ""), r[4]) : r[1] > 59 ? t(r[1], r[2], 0, r[4]) : t(0, r[1], r[2], r[4]) : null
                            }(e);
                            if (null === t) throw new Error("Malformed timestamp: " + i);
                            return e = e.replace(/^[^\sa-zA-Z-]+/, ""), t
                        }

                        function a() {
                            e = e.replace(/^\s+/, "")
                        }

                        if (a(), t.startTime = n(), a(), "--\x3e" !== e.substr(0, 3)) throw new Error("Malformed time stamp (time stamps must be separated by '--\x3e'): " + i);
                        e = e.substr(3), a(), t.endTime = n(), a(), function (e, t) {
                            var i = new We;
                            Ye(e, function (e, t) {
                                switch (e) {
                                    case"region":
                                        for (var n = r.length - 1; n >= 0; n--) if (r[n].id === t) {
                                            i.set(e, r[n].region);
                                            break
                                        }
                                        break;
                                    case"vertical":
                                        i.alt(e, t, ["rl", "lr"]);
                                        break;
                                    case"line":
                                        var a = t.split(","), o = a[0];
                                        i.integer(e, o), i.percent(e, o) && i.set("snapToLines", !1), i.alt(e, o, ["auto"]), 2 === a.length && i.alt("lineAlign", a[1], ["start", Xe, "end"]);
                                        break;
                                    case"position":
                                        a = t.split(","), i.percent(e, a[0]), 2 === a.length && i.alt("positionAlign", a[1], ["start", Xe, "end", "line-left", "line-right", "auto"]);
                                        break;
                                    case"size":
                                        i.percent(e, t);
                                        break;
                                    case"align":
                                        i.alt(e, t, ["start", Xe, "end", "left", "right"])
                                }
                            }, /:/, /\s/), t.region = i.get("region", null), t.vertical = i.get("vertical", "");
                            var n = i.get("line", "auto");
                            "auto" === n && -1 === qe.line && (n = -1), t.line = n, t.lineAlign = i.get("lineAlign", "start"), t.snapToLines = i.get("snapToLines", !0), t.size = i.get("size", 100), t.align = i.get("align", Xe);
                            var a = i.get("position", "auto");
                            "auto" === a && 50 === qe.position && (a = "start" === t.align || "left" === t.align ? 0 : "end" === t.align || "right" === t.align ? 100 : 50), t.position = a
                        }(e, t)
                    }

                    function Je(e) {
                        return e.replace(/<br(?: \/)?>/gi, "\n")
                    }

                    Ve.prototype = {
                        parse: function (e) {
                            var t = this;

                            function r() {
                                var e = t.buffer, r = 0;
                                for (e = Je(e); r < e.length && "\r" !== e[r] && "\n" !== e[r];) ++r;
                                var i = e.substr(0, r);
                                return "\r" === e[r] && ++r, "\n" === e[r] && ++r, t.buffer = e.substr(r), i
                            }

                            e && (t.buffer += t.decoder.decode(e, {stream: !0}));
                            try {
                                var i = void 0;
                                if ("INITIAL" === t.state) {
                                    if (!/\r\n|\n/.test(t.buffer)) return this;
                                    var n = (i = r()).match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
                                    if (!n || !n[0]) throw new Error("Malformed WebVTT signature.");
                                    t.state = "HEADER"
                                }
                                for (var a = !1; t.buffer;) {
                                    if (!/\r\n|\n/.test(t.buffer)) return this;
                                    switch (a ? a = !1 : i = r(), t.state) {
                                        case"HEADER":
                                            /:/.test(i) ? Ye(i, function (e, t) {
                                            }, /:/) : i || (t.state = "ID");
                                            continue;
                                        case"NOTE":
                                            i || (t.state = "ID");
                                            continue;
                                        case"ID":
                                            if (/^NOTE($|[ \t])/.test(i)) {
                                                t.state = "NOTE";
                                                break
                                            }
                                            if (!i) continue;
                                            if (t.cue = new Ke(0, 0, ""), t.state = "CUE", -1 === i.indexOf("--\x3e")) {
                                                t.cue.id = i;
                                                continue
                                            }
                                        case"CUE":
                                            try {
                                                ze(i, t.cue, t.regionList)
                                            } catch (e) {
                                                t.cue = null, t.state = "BADCUE";
                                                continue
                                            }
                                            t.state = "CUETEXT";
                                            continue;
                                        case"CUETEXT":
                                            var o = -1 !== i.indexOf("--\x3e");
                                            if (!i || o && (a = !0)) {
                                                t.oncue && t.oncue(t.cue), t.cue = null, t.state = "ID";
                                                continue
                                            }
                                            t.cue.text && (t.cue.text += "\n"), t.cue.text += i;
                                            continue;
                                        case"BADCUE":
                                            i || (t.state = "ID");
                                            continue
                                    }
                                }
                            } catch (e) {
                                "CUETEXT" === t.state && t.cue && t.oncue && t.oncue(t.cue), t.cue = null, t.state = "INITIAL" === t.state ? "BADWEBVTT" : "BADCUE"
                            }
                            return this
                        }, flush: function () {
                            try {
                                if (this.buffer += this.decoder.decode(), (this.cue || "HEADER" === this.state) && (this.buffer += "\n\n", this.parse()), "INITIAL" === this.state) throw new Error("Malformed WebVTT signature.")
                            } catch (e) {
                                throw e
                            }
                            return this.onflush && this.onflush(), this
                        }
                    };
                    var Qe = Ve;

                    function $e(e, t, r) {
                        for (var i = void 0, n = void 0, a = void 0, o = void 0, s = void 0, l = [], u = 0; u < r.rows.length; u++) if (a = !0, o = 0, s = "", !(i = r.rows[u]).isEmpty()) {
                            for (var d = 0; d < i.chars.length; d++) i.chars[d].uchar.match(/\s/) && a ? o++ : (s += i.chars[d].uchar, a = !1);
                            i.cueStartTime = e, e === t && (t += 1e-4), n = new Ke(e, t, Je(s.trim())), o >= 16 ? o-- : o++, navigator.userAgent.match(/Firefox\//) ? n.line = u + 1 : n.line = u > 7 ? u - 2 : u + 1, Math.abs(32 - (n.text.length + 2 * o)) > 2 && (n.align = "left", n.position = Math.max(10, Math.min(90, 10 + 2.5 * o))), l.push(n)
                        }
                        return l
                    }

                    function Ze(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }

                    var et = {
                            42: 225,
                            92: 233,
                            94: 237,
                            95: 243,
                            96: 250,
                            123: 231,
                            124: 247,
                            125: 209,
                            126: 241,
                            127: 9608,
                            128: 174,
                            129: 176,
                            130: 189,
                            131: 191,
                            132: 8482,
                            133: 162,
                            134: 163,
                            135: 9834,
                            136: 224,
                            137: 32,
                            138: 232,
                            139: 226,
                            140: 234,
                            141: 238,
                            142: 244,
                            143: 251,
                            144: 193,
                            145: 201,
                            146: 211,
                            147: 218,
                            148: 220,
                            149: 252,
                            150: 8216,
                            151: 161,
                            152: 42,
                            153: 8217,
                            154: 9473,
                            155: 169,
                            156: 8480,
                            157: 8226,
                            158: 8220,
                            159: 8221,
                            160: 192,
                            161: 194,
                            162: 199,
                            163: 200,
                            164: 202,
                            165: 203,
                            166: 235,
                            167: 206,
                            168: 207,
                            169: 239,
                            170: 212,
                            171: 217,
                            172: 249,
                            173: 219,
                            174: 171,
                            175: 187,
                            176: 195,
                            177: 227,
                            178: 205,
                            179: 204,
                            180: 236,
                            181: 210,
                            182: 242,
                            183: 213,
                            184: 245,
                            185: 123,
                            186: 125,
                            187: 92,
                            188: 94,
                            189: 95,
                            190: 124,
                            191: 8764,
                            192: 196,
                            193: 228,
                            194: 214,
                            195: 246,
                            196: 223,
                            197: 165,
                            198: 164,
                            199: 9475,
                            200: 197,
                            201: 229,
                            202: 216,
                            203: 248,
                            204: 9487,
                            205: 9491,
                            206: 9495,
                            207: 9499
                        }, tt = function (e) {
                            var t = e;
                            return et.hasOwnProperty(e) && (t = et[e]), String.fromCharCode(t)
                        }, rt = 15, it = 100, nt = {17: 1, 18: 3, 21: 5, 22: 7, 23: 9, 16: 11, 19: 12, 20: 14},
                        at = {17: 2, 18: 4, 21: 6, 22: 8, 23: 10, 19: 13, 20: 15},
                        ot = {25: 1, 26: 3, 29: 5, 30: 7, 31: 9, 24: 11, 27: 12, 28: 14},
                        st = {25: 2, 26: 4, 29: 6, 30: 8, 31: 10, 27: 13, 28: 15},
                        lt = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"],
                        ut = {
                            verboseFilter: {DATA: 3, DEBUG: 3, INFO: 2, WARNING: 2, TEXT: 1, ERROR: 0},
                            time: null,
                            verboseLevel: 0,
                            setTime: function (e) {
                                this.time = e
                            },
                            log: function (e, t) {
                                var r = this.verboseFilter[e];
                                this.verboseLevel >= r && console.log(this.time + " [" + e + "] " + t)
                            }
                        }, dt = function (e) {
                            for (var t = [], r = 0; r < e.length; r++) t.push(e[r].toString(16));
                            return t
                        }, ct = function () {
                            function e(t, r, i, n, a) {
                                Ze(this, e), this.foreground = t || "white", this.underline = r || !1, this.italics = i || !1, this.background = n || "black", this.flash = a || !1
                            }

                            return e.prototype.reset = function () {
                                this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1
                            }, e.prototype.setStyles = function (e) {
                                for (var t = ["foreground", "underline", "italics", "background", "flash"], r = 0; r < t.length; r++) {
                                    var i = t[r];
                                    e.hasOwnProperty(i) && (this[i] = e[i])
                                }
                            }, e.prototype.isDefault = function () {
                                return "white" === this.foreground && !this.underline && !this.italics && "black" === this.background && !this.flash
                            }, e.prototype.equals = function (e) {
                                return this.foreground === e.foreground && this.underline === e.underline && this.italics === e.italics && this.background === e.background && this.flash === e.flash
                            }, e.prototype.copy = function (e) {
                                this.foreground = e.foreground, this.underline = e.underline, this.italics = e.italics, this.background = e.background, this.flash = e.flash
                            }, e.prototype.toString = function () {
                                return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash
                            }, e
                        }(), ft = function () {
                            function e(t, r, i, n, a, o) {
                                Ze(this, e), this.uchar = t || " ", this.penState = new ct(r, i, n, a, o)
                            }

                            return e.prototype.reset = function () {
                                this.uchar = " ", this.penState.reset()
                            }, e.prototype.setChar = function (e, t) {
                                this.uchar = e, this.penState.copy(t)
                            }, e.prototype.setPenState = function (e) {
                                this.penState.copy(e)
                            }, e.prototype.equals = function (e) {
                                return this.uchar === e.uchar && this.penState.equals(e.penState)
                            }, e.prototype.copy = function (e) {
                                this.uchar = e.uchar, this.penState.copy(e.penState)
                            }, e.prototype.isEmpty = function () {
                                return " " === this.uchar && this.penState.isDefault()
                            }, e
                        }(), ht = function () {
                            function e() {
                                Ze(this, e), this.chars = [];
                                for (var t = 0; t < it; t++) this.chars.push(new ft);
                                this.pos = 0, this.currPenState = new ct
                            }

                            return e.prototype.equals = function (e) {
                                for (var t = !0, r = 0; r < it; r++) if (!this.chars[r].equals(e.chars[r])) {
                                    t = !1;
                                    break
                                }
                                return t
                            }, e.prototype.copy = function (e) {
                                for (var t = 0; t < it; t++) this.chars[t].copy(e.chars[t])
                            }, e.prototype.isEmpty = function () {
                                for (var e = !0, t = 0; t < it; t++) if (!this.chars[t].isEmpty()) {
                                    e = !1;
                                    break
                                }
                                return e
                            }, e.prototype.setCursor = function (e) {
                                this.pos !== e && (this.pos = e), this.pos < 0 ? (ut.log("DEBUG", "Negative cursor position " + this.pos), this.pos = 0) : this.pos > it && (ut.log("DEBUG", "Too large cursor position " + this.pos), this.pos = it)
                            }, e.prototype.moveCursor = function (e) {
                                var t = this.pos + e;
                                if (e > 1) for (var r = this.pos + 1; r < t + 1; r++) this.chars[r].setPenState(this.currPenState);
                                this.setCursor(t)
                            }, e.prototype.backSpace = function () {
                                this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState)
                            }, e.prototype.insertChar = function (e) {
                                e >= 144 && this.backSpace();
                                var t = tt(e);
                                this.pos >= it ? ut.log("ERROR", "Cannot insert " + e.toString(16) + " (" + t + ") at position " + this.pos + ". Skipping it!") : (this.chars[this.pos].setChar(t, this.currPenState), this.moveCursor(1))
                            }, e.prototype.clearFromPos = function (e) {
                                var t = void 0;
                                for (t = e; t < it; t++) this.chars[t].reset()
                            }, e.prototype.clear = function () {
                                this.clearFromPos(0), this.pos = 0, this.currPenState.reset()
                            }, e.prototype.clearToEndOfRow = function () {
                                this.clearFromPos(this.pos)
                            }, e.prototype.getTextString = function () {
                                for (var e = [], t = !0, r = 0; r < it; r++) {
                                    var i = this.chars[r].uchar;
                                    " " !== i && (t = !1), e.push(i)
                                }
                                return t ? "" : e.join("")
                            }, e.prototype.setPenStyles = function (e) {
                                this.currPenState.setStyles(e), this.chars[this.pos].setPenState(this.currPenState)
                            }, e
                        }(), pt = function () {
                            function e() {
                                Ze(this, e), this.rows = [];
                                for (var t = 0; t < rt; t++) this.rows.push(new ht);
                                this.currRow = rt - 1, this.nrRollUpRows = null, this.lastOutputScreen = null, this.reset()
                            }

                            return e.prototype.reset = function () {
                                for (var e = 0; e < rt; e++) this.rows[e].clear();
                                this.currRow = rt - 1
                            }, e.prototype.equals = function (e) {
                                for (var t = !0, r = 0; r < rt; r++) if (!this.rows[r].equals(e.rows[r])) {
                                    t = !1;
                                    break
                                }
                                return t
                            }, e.prototype.copy = function (e) {
                                for (var t = 0; t < rt; t++) this.rows[t].copy(e.rows[t])
                            }, e.prototype.isEmpty = function () {
                                for (var e = !0, t = 0; t < rt; t++) if (!this.rows[t].isEmpty()) {
                                    e = !1;
                                    break
                                }
                                return e
                            }, e.prototype.backSpace = function () {
                                this.rows[this.currRow].backSpace()
                            }, e.prototype.clearToEndOfRow = function () {
                                this.rows[this.currRow].clearToEndOfRow()
                            }, e.prototype.insertChar = function (e) {
                                this.rows[this.currRow].insertChar(e)
                            }, e.prototype.setPen = function (e) {
                                this.rows[this.currRow].setPenStyles(e)
                            }, e.prototype.moveCursor = function (e) {
                                this.rows[this.currRow].moveCursor(e)
                            }, e.prototype.setCursor = function (e) {
                                ut.log("INFO", "setCursor: " + e), this.rows[this.currRow].setCursor(e)
                            }, e.prototype.setPAC = function (e) {
                                ut.log("INFO", "pacData = " + JSON.stringify(e));
                                var t = e.row - 1;
                                if (this.nrRollUpRows && t < this.nrRollUpRows - 1 && (t = this.nrRollUpRows - 1), this.nrRollUpRows && this.currRow !== t) {
                                    for (var r = 0; r < rt; r++) this.rows[r].clear();
                                    var i = this.currRow + 1 - this.nrRollUpRows, n = this.lastOutputScreen;
                                    if (n) {
                                        var a = n.rows[i].cueStartTime;
                                        if (a && a < ut.time) for (var o = 0; o < this.nrRollUpRows; o++) this.rows[t - this.nrRollUpRows + o + 1].copy(n.rows[i + o])
                                    }
                                }
                                this.currRow = t;
                                var s = this.rows[this.currRow];
                                if (null !== e.indent) {
                                    var l = e.indent, u = Math.max(l - 1, 0);
                                    s.setCursor(e.indent), e.color = s.chars[u].penState.foreground
                                }
                                var d = {
                                    foreground: e.color,
                                    underline: e.underline,
                                    italics: e.italics,
                                    background: "black",
                                    flash: !1
                                };
                                this.setPen(d)
                            }, e.prototype.setBkgData = function (e) {
                                ut.log("INFO", "bkgData = " + JSON.stringify(e)), this.backSpace(), this.setPen(e), this.insertChar(32)
                            }, e.prototype.setRollUpRows = function (e) {
                                this.nrRollUpRows = e
                            }, e.prototype.rollUp = function () {
                                if (null !== this.nrRollUpRows) {
                                    ut.log("TEXT", this.getDisplayText());
                                    var e = this.currRow + 1 - this.nrRollUpRows, t = this.rows.splice(e, 1)[0];
                                    t.clear(), this.rows.splice(this.currRow, 0, t), ut.log("INFO", "Rolling up")
                                } else ut.log("DEBUG", "roll_up but nrRollUpRows not set yet")
                            }, e.prototype.getDisplayText = function (e) {
                                e = e || !1;
                                for (var t = [], r = "", i = -1, n = 0; n < rt; n++) {
                                    var a = this.rows[n].getTextString();
                                    a && (i = n + 1, e ? t.push("Row " + i + ": '" + a + "'") : t.push(a.trim()))
                                }
                                return t.length > 0 && (r = e ? "[" + t.join(" | ") + "]" : t.join("\n")), r
                            }, e.prototype.getTextAndFormat = function () {
                                return this.rows
                            }, e
                        }(), gt = function () {
                            function e(t, r) {
                                Ze(this, e), this.chNr = t, this.outputFilter = r, this.mode = null, this.verbose = 0, this.displayedMemory = new pt, this.nonDisplayedMemory = new pt, this.lastOutputScreen = new pt, this.currRollUpRow = this.displayedMemory.rows[rt - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null
                            }

                            return e.prototype.reset = function () {
                                this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.currRollUpRow = this.displayedMemory.rows[rt - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null
                            }, e.prototype.getHandler = function () {
                                return this.outputFilter
                            }, e.prototype.setHandler = function (e) {
                                this.outputFilter = e
                            }, e.prototype.setPAC = function (e) {
                                this.writeScreen.setPAC(e)
                            }, e.prototype.setBkgData = function (e) {
                                this.writeScreen.setBkgData(e)
                            }, e.prototype.setMode = function (e) {
                                e !== this.mode && (this.mode = e, ut.log("INFO", "MODE=" + e), "MODE_POP-ON" === this.mode ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), "MODE_ROLL-UP" !== this.mode && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = e)
                            }, e.prototype.insertChars = function (e) {
                                for (var t = 0; t < e.length; t++) this.writeScreen.insertChar(e[t]);
                                var r = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
                                ut.log("INFO", r + ": " + this.writeScreen.getDisplayText(!0)), "MODE_PAINT-ON" !== this.mode && "MODE_ROLL-UP" !== this.mode || (ut.log("TEXT", "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)), this.outputDataUpdate())
                            }, e.prototype.ccRCL = function () {
                                ut.log("INFO", "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON")
                            }, e.prototype.ccBS = function () {
                                ut.log("INFO", "BS - BackSpace"), "MODE_TEXT" !== this.mode && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate())
                            }, e.prototype.ccAOF = function () {
                            }, e.prototype.ccAON = function () {
                            }, e.prototype.ccDER = function () {
                                ut.log("INFO", "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate()
                            }, e.prototype.ccRU = function (e) {
                                ut.log("INFO", "RU(" + e + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(e)
                            }, e.prototype.ccFON = function () {
                                ut.log("INFO", "FON - Flash On"), this.writeScreen.setPen({flash: !0})
                            }, e.prototype.ccRDC = function () {
                                ut.log("INFO", "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON")
                            }, e.prototype.ccTR = function () {
                                ut.log("INFO", "TR"), this.setMode("MODE_TEXT")
                            }, e.prototype.ccRTD = function () {
                                ut.log("INFO", "RTD"), this.setMode("MODE_TEXT")
                            }, e.prototype.ccEDM = function () {
                                ut.log("INFO", "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate(!0)
                            }, e.prototype.ccCR = function () {
                                ut.log("CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate(!0)
                            }, e.prototype.ccENM = function () {
                                ut.log("INFO", "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset()
                            }, e.prototype.ccEOC = function () {
                                if (ut.log("INFO", "EOC - End Of Caption"), "MODE_POP-ON" === this.mode) {
                                    var e = this.displayedMemory;
                                    this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = e, this.writeScreen = this.nonDisplayedMemory, ut.log("TEXT", "DISP: " + this.displayedMemory.getDisplayText())
                                }
                                this.outputDataUpdate(!0)
                            }, e.prototype.ccTO = function (e) {
                                ut.log("INFO", "TO(" + e + ") - Tab Offset"), this.writeScreen.moveCursor(e)
                            }, e.prototype.ccMIDROW = function (e) {
                                var t = {flash: !1};
                                if (t.underline = e % 2 == 1, t.italics = e >= 46, t.italics) t.foreground = "white"; else {
                                    t.foreground = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"][Math.floor(e / 2) - 16]
                                }
                                ut.log("INFO", "MIDROW: " + JSON.stringify(t)), this.writeScreen.setPen(t)
                            }, e.prototype.outputDataUpdate = function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = ut.time;
                                null !== t && this.outputFilter && (null !== this.cueStartTime || this.displayedMemory.isEmpty() ? this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue && (this.outputFilter.newCue(this.cueStartTime, t, this.lastOutputScreen), !0 === e && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue()), this.cueStartTime = this.displayedMemory.isEmpty() ? null : t) : this.cueStartTime = t, this.lastOutputScreen.copy(this.displayedMemory))
                            }, e.prototype.cueSplitAtTime = function (e) {
                                this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.displayedMemory), this.cueStartTime = e))
                            }, e
                        }();

                    function vt(e, t, r) {
                        r && (r.a = e, r.b = t)
                    }

                    function yt(e, t, r) {
                        if (r) return r.a === e && r.b === t
                    }

                    var mt = function () {
                        function e(t, r, i, n) {
                            Ze(this, e), this.channels = {
                                1: new gt(1, t),
                                2: new gt(2, r),
                                3: new gt(3, i),
                                4: new gt(4, n)
                            }, this.currChNr = -1, this.cmdHistory = {1: {a: null, b: null}, 3: {a: null, b: null}}
                        }

                        return e.prototype.getHandler = function (e) {
                            return this.channels[e].getHandler()
                        }, e.prototype.setHandler = function (e, t) {
                            this.channels[e].setHandler(t)
                        }, e.prototype.addData = function (e, t, r) {
                            var i = void 0, n = void 0, a = void 0, o = !1;
                            ut.setTime(e);
                            for (var s = 0; s < t.length; s += 2) if (n = 127 & t[s], a = 127 & t[s + 1], 0 !== n || 0 !== a) {
                                if (ut.log("DATA", "[" + dt([t[s], t[s + 1]]) + "] -> (" + dt([n, a]) + ")"), (i = this.parseCmd(n, a, r)) || (i = this.parseMidrow(n, a, r)), i || (i = this.parsePAC(n, a, r)), i || (i = this.parseBackgroundAttributes(n, a, r)), !i) if (o = this.parseChars(n, a)) if (this.currChNr && this.currChNr >= 0) if (3 === r && this.currChNr > 2 || 1 === r && this.currChNr < 3) this.channels[this.currChNr].insertChars(o); else ut.log("WARNING", "The last seen channel number does not fall within the current field. Deferring character insertion until the field and channel match."); else ut.log("WARNING", "No channel found yet. TEXT-MODE?");
                                i || o || ut.log("WARNING", "Couldn't parse cleaned data " + dt([n, a]) + " orig: " + dt([t[s], t[s + 1]]))
                            }
                        }, e.prototype.parseCmd = function (e, t, r) {
                            var i = this.cmdHistory, n = function (e) {
                                var t = void 0;
                                20 === e ? t = 1 : 28 === e ? t = 2 : 21 === e ? t = 3 : 29 === e && (t = 4);
                                return t
                            }(e), a = function (e, t) {
                                var r = null;
                                23 === e ? r = t : 31 === e && (r = t + 1);
                                return r
                            }(t, r);
                            if (!(n && t >= 32 && t <= 47) && !(a && t >= 33 && t <= 35)) return !1;
                            if (yt(e, t, i[r])) return vt(null, null, i[r]), ut.log("DEBUG", "Repeated command (" + dt([e, t]) + ") is dropped"), !0;
                            var o = void 0;
                            return n ? (o = this.channels[n], 32 === t ? o.ccRCL() : 33 === t ? o.ccBS() : 34 === t ? o.ccAOF() : 35 === t ? o.ccAON() : 36 === t ? o.ccDER() : 37 === t ? o.ccRU(2) : 38 === t ? o.ccRU(3) : 39 === t ? o.ccRU(4) : 40 === t ? o.ccFON() : 41 === t ? o.ccRDC() : 42 === t ? o.ccTR() : 43 === t ? o.ccRTD() : 44 === t ? o.ccEDM() : 45 === t ? o.ccCR() : 46 === t ? o.ccENM() : 47 === t && o.ccEOC()) : (o = this.channels[a]).ccTO(t - 32), vt(e, t, i[r]), this.currChNr = n, !0
                        }, e.prototype.parseMidrow = function (e, t, r) {
                            var i = null;
                            return (17 === e || 25 === e) && t >= 32 && t <= 47 && ((i = 17 === e ? r : r + 1) !== this.currChNr ? (ut.log("ERROR", "Mismatch channel in midrow parsing"), !1) : (this.channels[i].ccMIDROW(t), ut.log("DEBUG", "MIDROW (" + dt([e, t]) + ")"), !0))
                        }, e.prototype.parsePAC = function (e, t, r) {
                            var i = this.cmdHistory, n = null, a = null;
                            if (!((e >= 17 && e <= 23 || e >= 25 && e <= 31) && t >= 64 && t <= 127) && !((16 === e || 24 === e) && t >= 64 && t <= 95)) return !1;
                            if (yt(e, t, i[r])) return vt(null, null, i[r]), !0;
                            var o = void 0;
                            return e <= 23 ? (o = 1, n = r) : (o = 2, n = r + 1), a = t >= 64 && t <= 95 ? 1 === o ? nt[e] : ot[e] : 1 === o ? at[e] : st[e], this.channels[n].setPAC(this.interpretPAC(a, t)), vt(e, t, i[r]), this.currChNr = n, !0
                        }, e.prototype.interpretPAC = function (e, t) {
                            var r = t, i = {color: null, italics: !1, indent: null, underline: !1, row: e};
                            return r = t > 95 ? t - 96 : t - 64, i.underline = 1 == (1 & r), r <= 13 ? i.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(r / 2)] : r <= 15 ? (i.italics = !0, i.color = "white") : i.indent = 4 * Math.floor((r - 16) / 2), i
                        }, e.prototype.parseChars = function (e, t, r) {
                            var i = null, n = null, a = null;
                            if (e >= 25 ? (i = 2, a = e - 8) : (i = 1, a = e), a >= 17 && a <= 19) {
                                var o = t;
                                o = 17 === a ? t + 80 : 18 === a ? t + 112 : t + 144, ut.log("INFO", "Special char '" + tt(o) + "' in channel " + i), n = [o]
                            } else e >= 32 && e <= 127 && (n = 0 === t ? [e] : [e, t]);
                            if (n) {
                                var s = dt(n);
                                ut.log("DEBUG", "Char codes =  " + s.join(",")), vt(e, t, this.cmdHistory[r])
                            }
                            return n
                        }, e.prototype.parseBackgroundAttributes = function (e, t, r) {
                            var i, n = void 0, a = void 0;
                            return ((16 === e || 24 === e) && t >= 32 && t <= 47 || (23 === e || 31 === e) && t >= 45 && t <= 47) && (n = {}, 16 === e || 24 === e ? (a = Math.floor((t - 32) / 2), n.background = lt[a], t % 2 == 1 && (n.background = n.background + "_semi")) : 45 === t ? n.background = "transparent" : (n.foreground = "black", 47 === t && (n.underline = !0)), i = e < 24 ? r : r + 1, this.channels[i].setBkgData(n), vt(e, t, this.cmdHistory[r]), !0)
                        }, e.prototype.reset = function () {
                            for (var e = 0; e < this.channels.length; e++) this.channels[e] && this.channels[e].reset();
                            this.cmdHistory = {1: {a: null, b: null}, 3: {a: null, b: null}}
                        }, e.prototype.cueSplitAtTime = function (e) {
                            for (var t = 0; t < this.channels.length; t++) this.channels[t] && this.channels[t].cueSplitAtTime(e)
                        }, e
                    }();
                    var Tt = function () {
                        function e(t, r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.timelineController = t, this.trackName = r, this.startTime = null, this.endTime = null, this.screen = null
                        }

                        return e.prototype.dispatchCue = function () {
                            null !== this.startTime && (this.timelineController.addCues(this.trackName, this.startTime, this.endTime, this.screen), this.startTime = null)
                        }, e.prototype.newCue = function (e, t, r) {
                            (null === this.startTime || this.startTime > e) && (this.startTime = e), this.endTime = t, this.screen = r, this.timelineController.createCaptionsTrack(this.trackName)
                        }, e
                    }(), Et = r("./src/demux/id3.js"), bt = function (e, t, r) {
                        return e.substr(r || 0, t.length) === t
                    }, _t = function (e) {
                        for (var t = 5381, r = e.length; r;) t = 33 * t ^ e.charCodeAt(--r);
                        return (t >>> 0).toString()
                    }, St = {
                        parse: function (e, t, r, i, n, a) {
                            var s = Object(Et.utf8ArrayToStr)(new Uint8Array(e)).trim().replace(/\r\n|\n\r|\n|\r/g, "\n").split("\n"),
                                l = "00:00.000", u = 0, d = 0, c = 0, f = [], h = void 0, p = !0, g = new Qe;
                            g.oncue = function (e) {
                                var t = r[i], n = r.ccOffset;
                                t && t.new && (void 0 !== d ? n = r.ccOffset = t.start : function (e, t, r) {
                                    var i = e[t], n = e[i.prevCC];
                                    if (!n || !n.new && i.new) return e.ccOffset = e.presentationOffset = i.start, void(i.new = !1);
                                    for (; n && n.new;) e.ccOffset += i.start - n.start, i.new = !1, n = e[(i = n).prevCC];
                                    e.presentationOffset = r
                                }(r, i, c)), c && (n = c - r.presentationOffset), e.startTime += n - d, e.endTime += n - d, e.id = _t(e.startTime.toString()) + _t(e.endTime.toString()) + _t(e.text), e.text = decodeURIComponent(encodeURIComponent(e.text)), e.endTime > 0 && f.push(e)
                            }, g.onparsingerror = function (e) {
                                h = e
                            }, g.onflush = function () {
                                h && a ? a(h) : n(f)
                            }, s.forEach(function (e) {
                                if (p) {
                                    if (bt(e, "X-TIMESTAMP-MAP=")) {
                                        p = !1, e.substr(16).split(",").forEach(function (e) {
                                            bt(e, "LOCAL:") ? l = e.substr(6) : bt(e, "MPEGTS:") && (u = parseInt(e.substr(7)))
                                        });
                                        try {
                                            t + (9e4 * r[i].start || 0) < 0 && (t += 8589934592), u -= t, n = l, a = parseInt(n.substr(-3)), s = parseInt(n.substr(-6, 2)), f = parseInt(n.substr(-9, 2)), v = n.length > 9 ? parseInt(n.substr(0, n.indexOf(":"))) : 0, d = (Object(o.isFiniteNumber)(a) && Object(o.isFiniteNumber)(s) && Object(o.isFiniteNumber)(f) && Object(o.isFiniteNumber)(v) ? (a += 1e3 * s, a += 6e4 * f, a += 36e5 * v) : -1) / 1e3, c = u / 9e4, -1 === d && (h = new Error("Malformed X-TIMESTAMP-MAP: " + e))
                                        } catch (t) {
                                            h = new Error("Malformed X-TIMESTAMP-MAP: " + e)
                                        }
                                        return
                                    }
                                    "" === e && (p = !1)
                                }
                                var n, a, s, f, v;
                                g.parse(e + "\n")
                            }), g.flush()
                        }
                    };

                    function Rt(e) {
                        if (e) for ("disabled" === e.mode && (e.mode = "hidden"); e.cues && e.cues.length > 0;) e.removeCue(e.cues[0])
                    }

                    var kt = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.MEDIA_ATTACHING, s.default.MEDIA_DETACHING, s.default.FRAG_PARSING_USERDATA, s.default.FRAG_DECRYPTED, s.default.MANIFEST_LOADING, s.default.MANIFEST_LOADED, s.default.FRAG_LOADED, s.default.LEVEL_SWITCHING, s.default.INIT_PTS_FOUND, s.default.FRAG_PARSING_INIT_SEGMENT, s.default.SUBTITLE_TRACKS_CLEARED));
                            if (i.hls = r, i.config = r.config, i.enabled = !0, i.Cues = r.config.cueHandler, i.textTracks = [], i.tracks = [], i.unparsedVttFrags = [], i.initPTS = [], i.cueRanges = {}, i.captionsTracks = {}, i.captionsProperties = {
                                textTrack1: {
                                    label: i.config.captionsTextTrack1Label,
                                    languageCode: i.config.captionsTextTrack1LanguageCode
                                },
                                textTrack2: {
                                    label: i.config.captionsTextTrack2Label,
                                    languageCode: i.config.captionsTextTrack2LanguageCode
                                },
                                textTrack3: {
                                    label: i.config.captionsTextTrack1Label,
                                    languageCode: i.config.captionsTextTrack1LanguageCode
                                },
                                textTrack4: {
                                    label: i.config.captionsTextTrack2Label,
                                    languageCode: i.config.captionsTextTrack2LanguageCode
                                }
                            }, i.config.enableCEA708Captions) {
                                var n = new Tt(i, "textTrack1"), a = new Tt(i, "textTrack2"),
                                    o = new Tt(i, "textTrack3"), l = new Tt(i, "textTrack4");
                                i.cea608Parser = new mt(n, a, o, l)
                            }
                            return i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.addCues = function (e, t, r, i) {
                            var n = this, a = this.cueRanges[e];
                            a || (a = this.cueRanges[e] = []);
                            for (var o, l, u, d, c = !1, f = a.length; f--;) {
                                var h = a[f], p = (o = h[0], l = h[1], u = t, d = r, Math.min(l, d) - Math.max(o, u));
                                if (p >= 0 && (h[0] = Math.min(h[0], t), h[1] = Math.max(h[1], r), c = !0, p / (r - t) > .5)) return
                            }
                            c || a.push([t, r]);
                            var g = this.Cues.createCues(t, r, i);
                            this.config.renderNatively ? g.forEach(function (t) {
                                n.captionsTracks[e].addCue(t)
                            }) : this.hls.trigger(s.default.CUES_PARSED, {type: "captions", cues: g, track: e})
                        }, t.prototype.onInitPtsFound = function (e) {
                            var t = this;
                            if ("main" === e.id && (this.initPTS[e.frag.cc] = e.initPTS), this.unparsedVttFrags.length) {
                                var r = this.unparsedVttFrags;
                                this.unparsedVttFrags = [], r.forEach(function (e) {
                                    t.onFragLoaded(e)
                                })
                            }
                        }, t.prototype.getExistingTrack = function (e) {
                            var t = this.media;
                            if (t) for (var r = 0; r < t.textTracks.length; r++) {
                                var i = t.textTracks[r];
                                if (i[e]) return i
                            }
                            return null
                        }, t.prototype.createCaptionsTrack = function (e) {
                            this.captionsTracks[e] || (this.config.renderNatively ? this.createNativeTrack(e) : this.createNonNativeTrack(e))
                        }, t.prototype.createNativeTrack = function (e) {
                            var t = this.captionsProperties[e], r = t.label, i = t.languageCode,
                                n = this.captionsTracks;
                            if (!n[e]) {
                                var a = this.getExistingTrack(e);
                                if (a) n[e] = a, Rt(n[e]), function (e, t) {
                                    var r = null;
                                    try {
                                        r = new window.Event("addtrack")
                                    } catch (e) {
                                        (r = document.createEvent("Event")).initEvent("addtrack", !1, !1)
                                    }
                                    r.track = e, t.dispatchEvent(r)
                                }(n[e], this.media); else {
                                    var o = this.createTextTrack("captions", r, i);
                                    o && (o[e] = !0, n[e] = o)
                                }
                            }
                        }, t.prototype.createNonNativeTrack = function (e) {
                            var t = this.captionsTracks, r = this.captionsProperties[e];
                            if (r) {
                                var i = {_id: e, label: r.label, kind: "captions", default: !1};
                                t[e] = i, this.hls.trigger(s.default.NON_NATIVE_TEXT_TRACKS_FOUND, {tracks: [i]})
                            }
                        }, t.prototype.createTextTrack = function (e, t, r) {
                            var i = this.media;
                            if (i) return i.addTextTrack(e, t, r)
                        }, t.prototype.destroy = function () {
                            c.prototype.destroy.call(this)
                        }, t.prototype.onMediaAttaching = function (e) {
                            this.media = e.media, this._cleanTracks()
                        }, t.prototype.onMediaDetaching = function () {
                            var e = this.captionsTracks;
                            Object.keys(e).forEach(function (t) {
                                Rt(e[t]), delete e[t]
                            })
                        }, t.prototype.onManifestLoading = function () {
                            this.lastSn = -1, this.prevCC = -1, this.vttCCs = {
                                ccOffset: 0,
                                presentationOffset: 0,
                                0: {start: 0, prevCC: -1, new: !1}
                            }, this._cleanTracks()
                        }, t.prototype._cleanTracks = function () {
                            var e = this.media;
                            if (e && e.textTracks) for (var t = e.textTracks, r = 0; r < t.length; r++) (t[r].textTrack1 || t[r].textTrack2) && Rt(t[r])
                        }, t.prototype.onManifestLoaded = function (e) {
                            var t = this;
                            if (this.textTracks = [], this.unparsedVttFrags = this.unparsedVttFrags || [], this.initPTS = [], this.cueRanges = {}, this.config.enableWebVTT) {
                                var r = this.tracks && e.subtitles && this.tracks.length === e.subtitles.length;
                                if (this.tracks = e.subtitles || [], this.config.renderNatively) {
                                    var i = this.media ? this.media.textTracks : [];
                                    this.tracks.forEach(function (e, r) {
                                        var n = void 0;
                                        if (r < i.length) {
                                            var a = [].slice.call(i).find(function (t) {
                                                return function (e, t) {
                                                    return e && e.label === t.name && !(e.textTrack1 || e.textTrack2)
                                                }(t, e)
                                            });
                                            a && (n = a)
                                        }
                                        n || (n = t.createTextTrack("subtitles", e.name, e.lang)), e.default ? n.mode = t.hls.subtitleDisplay ? "showing" : "hidden" : n.mode = "disabled", t.textTracks.push(n)
                                    })
                                } else if (!r && this.tracks && this.tracks.length) {
                                    var n = this.tracks.map(function (e) {
                                        return {label: e.name, kind: e.type.toLowerCase(), default: e.default}
                                    });
                                    this.hls.trigger(s.default.NON_NATIVE_TEXT_TRACKS_FOUND, {tracks: n})
                                }
                            }
                            this.config.enableCEA708Captions && e.captions && e.captions.forEach(function (e) {
                                var r = /(?:CC|SERVICE)([1-4])/.exec(e.instreamId);
                                if (r) {
                                    var i = "textTrack" + r[1];
                                    t.captionsProperties[i].label = e.name, e.lang && (t.captionsProperties[i].languageCode = e.lang)
                                }
                            })
                        }, t.prototype.onLevelSwitching = function () {
                            this.enabled = "NONE" !== this.hls.currentLevel.closedCaptions
                        }, t.prototype.onFragLoaded = function (e) {
                            var t = e.frag, r = e.payload;
                            if ("main" === t.type) {
                                var i = t.sn;
                                if (i !== this.lastSn + 1) {
                                    var n = this.cea608Parser;
                                    n && n.reset()
                                }
                                this.lastSn = i
                            } else if ("subtitle" === t.type) if (r.byteLength) {
                                if (!Object(o.isFiniteNumber)(this.initPTS[t.cc])) return this.unparsedVttFrags.push(e), void(this.initPTS.length && this.hls.trigger(s.default.SUBTITLE_FRAG_PROCESSED, {
                                    success: !1,
                                    frag: t
                                }));
                                var a = t.decryptdata;
                                null != a && null != a.key && "AES-128" === a.method || this._parseVTTs(t, r)
                            } else this.hls.trigger(s.default.SUBTITLE_FRAG_PROCESSED, {success: !1, frag: t})
                        }, t.prototype._parseVTTs = function (e, t) {
                            var r = this, i = this.vttCCs;
                            i[e.cc] || (i[e.cc] = {start: e.start, prevCC: this.prevCC, new: !0}, this.prevCC = e.cc);
                            var n = this.config.renderNatively ? this.textTracks : this.tracks, a = this.hls;
                            St.parse(t, this.initPTS[e.cc], i, e.cc, function (t) {
                                var i = n[e.level];
                                if (r.config.renderNatively) t.filter(function (e) {
                                    return !i.cues.getCueById(e.id)
                                }).forEach(function (e) {
                                    i.addCue(e)
                                }); else {
                                    var o = i.default ? "default" : "subtitles" + e.level;
                                    a.trigger(s.default.CUES_PARSED, {type: "subtitles", cues: t, track: o})
                                }
                                a.trigger(s.default.SUBTITLE_FRAG_PROCESSED, {success: !0, frag: e})
                            }, function (t) {
                                l.logger.log("Failed to parse VTT cue: " + t), a.trigger(s.default.SUBTITLE_FRAG_PROCESSED, {
                                    success: !1,
                                    frag: e
                                })
                            })
                        }, t.prototype.onFragDecrypted = function (e) {
                            var t = e.payload, r = e.frag;
                            if ("subtitle" === r.type) {
                                if (!Object(o.isFiniteNumber)(this.initPTS[r.cc])) return void this.unparsedVttFrags.push(e);
                                this._parseVTTs(r, t)
                            }
                        }, t.prototype.onSubtitleTracksCleared = function () {
                            this.tracks = [], this.captionsTracks = {}
                        }, t.prototype.onFragParsingUserdata = function (e) {
                            if (this.enabled && this.config.enableCEA708Captions) for (var t = 0; t < e.samples.length; t++) {
                                var r = this.extractCea608Data(e.samples[t].bytes);
                                this.cea608Parser.addData(e.samples[t].pts, r[0], 1), this.cea608Parser.addData(e.samples[t].pts, r[1], 3)
                            }
                        }, t.prototype.onFragParsingInitSegment = function () {
                            void 0 === this.initPTS && this.onInitPtsFound({initPTS: 9e4})
                        }, t.prototype.extractCea608Data = function (e) {
                            for (var t = 31 & e[0], r = 2, i = void 0, n = void 0, a = void 0, o = void 0, s = [[], []], l = 0; l < t; l++) i = e[r++], n = 127 & e[r++], a = 127 & e[r++], o = 3 & i, 0 === n && 0 === a || 0 != (4 & i) && (0 !== o && 1 !== o || (s[o].push(n), s[o].push(a)));
                            return s
                        }, t
                    }(c), wt = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();

                    function At(e) {
                        for (var t = [], r = 0; r < e.length; r++) {
                            var i = e[r];
                            "subtitles" === i.kind && i.label && t.push(e[r])
                        }
                        return t
                    }

                    var Lt = function (e) {
                        function t(r) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.MEDIA_ATTACHED, s.default.MEDIA_DETACHING, s.default.MANIFEST_LOADED, s.default.SUBTITLE_TRACK_LOADED));
                            return i.tracks = [], i.trackId = -1, i.media = null, i.stopped = !0, i.subtitleDisplay = !0, i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.destroy = function () {
                            c.prototype.destroy.call(this)
                        }, t.prototype.onMediaAttached = function (e) {
                            var t = this;
                            this.media = e.media, this.media && (this.queuedDefaultTrack && (this.subtitleTrack = this.queuedDefaultTrack, delete this.queuedDefaultTrack), this.trackChangeListener = this._onTextTracksChanged.bind(this), this.useTextTrackPolling = !(this.media.textTracks && "onchange" in this.media.textTracks), this.useTextTrackPolling ? this.subtitlePollingInterval = setInterval(function () {
                                t.trackChangeListener()
                            }, 500) : this.media.textTracks.addEventListener("change", this.trackChangeListener))
                        }, t.prototype.onMediaDetaching = function () {
                            this.media && (this.useTextTrackPolling ? clearInterval(this.subtitlePollingInterval) : this.media.textTracks.removeEventListener("change", this.trackChangeListener), this.media = null)
                        }, t.prototype.onManifestLoaded = function (e) {
                            var t = this, r = e.subtitles || [];
                            this.tracks = r, this.hls.trigger(s.default.SUBTITLE_TRACKS_UPDATED, {subtitleTracks: r}), r.forEach(function (e) {
                                e.default && (t.media ? t.subtitleTrack = e.id : t.queuedDefaultTrack = e.id)
                            })
                        }, t.prototype.onSubtitleTrackLoaded = function (e) {
                            var t = this, r = e.id, i = e.details, n = this.trackId, a = this.tracks, o = a[n];
                            if (r >= a.length || r !== n || !o || this.stopped) this._clearReloadTimer(); else if (l.logger.log("subtitle track " + r + " loaded"), i.live) {
                                var s = ne(o.details, i, e.stats.trequest);
                                l.logger.log("Reloading live subtitle playlist in " + s + "ms"), this.timer = setTimeout(function () {
                                    t._loadCurrentTrack()
                                }, s)
                            } else this._clearReloadTimer()
                        }, t.prototype.startLoad = function () {
                            this.stopped = !1, this._loadCurrentTrack()
                        }, t.prototype.stopLoad = function () {
                            this.stopped = !0, this._clearReloadTimer()
                        }, t.prototype._clearReloadTimer = function () {
                            this.timer && (clearTimeout(this.timer), this.timer = null)
                        }, t.prototype._loadCurrentTrack = function () {
                            var e = this.trackId, t = this.tracks, r = this.hls, i = t[e];
                            e < 0 || !i || i.details && !i.details.live || (l.logger.log("Loading subtitle track " + e), r.trigger(s.default.SUBTITLE_TRACK_LOADING, {
                                url: i.url,
                                id: e
                            }))
                        }, t.prototype._toggleTrackModes = function (e) {
                            var t = this.media, r = this.subtitleDisplay, i = this.trackId;
                            if (t) {
                                var n = At(t.textTracks);
                                if (-1 === e) [].slice.call(n).forEach(function (e) {
                                    e.mode = "disabled"
                                }); else {
                                    var a = n[i];
                                    a && (a.mode = "disabled")
                                }
                                var o = n[e];
                                o && (o.mode = r ? "showing" : "hidden")
                            }
                        }, t.prototype._setSubtitleTrackInternal = function (e) {
                            var t = this.hls, r = this.tracks;
                            !Object(o.isFiniteNumber)(e) || e < -1 || e >= r.length || (this.trackId = e, l.logger.log("Switching to subtitle track " + e), t.trigger(s.default.SUBTITLE_TRACK_SWITCH, {id: e}), this._loadCurrentTrack())
                        }, t.prototype._onTextTracksChanged = function () {
                            if (this.media && this.hls.config.renderNatively) {
                                for (var e = -1, t = At(this.media.textTracks), r = 0; r < t.length; r++) if ("hidden" === t[r].mode) e = r; else if ("showing" === t[r].mode) {
                                    e = r;
                                    break
                                }
                                this.subtitleTrack = e
                            }
                        }, wt(t, [{
                            key: "subtitleTracks", get: function () {
                                return this.tracks
                            }
                        }, {
                            key: "subtitleTrack", get: function () {
                                return this.trackId
                            }, set: function (e) {
                                this.trackId !== e && (this._toggleTrackModes(e), this._setSubtitleTrackInternal(e))
                            }
                        }]), t
                    }(c), Dt = r("./src/crypt/decrypter.js");
                    var Ot = window.performance, It = function (e) {
                        function t(r, i) {
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var n = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this, r, s.default.MEDIA_ATTACHED, s.default.MEDIA_DETACHING, s.default.ERROR, s.default.KEY_LOADED, s.default.FRAG_LOADED, s.default.SUBTITLE_TRACKS_UPDATED, s.default.SUBTITLE_TRACK_SWITCH, s.default.SUBTITLE_TRACK_LOADED, s.default.SUBTITLE_FRAG_PROCESSED, s.default.LEVEL_UPDATED));
                            return n.fragmentTracker = i, n.config = r.config, n.state = pe.STOPPED, n.tracks = [], n.tracksBuffered = [], n.currentTrackId = -1, n.decrypter = new Dt.default(r, r.config), n.lastAVStart = 0, n
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.prototype.onSubtitleFragProcessed = function (e) {
                            var t = e.frag, r = e.success;
                            if (this.fragPrevious = t, this.state = pe.IDLE, r) {
                                var i = this.tracksBuffered[this.currentTrackId];
                                if (i) {
                                    for (var n = void 0, a = t.start, o = 0; o < i.length; o++) if (a >= i[o].start && a <= i[o].end) {
                                        n = i[o];
                                        break
                                    }
                                    var s = t.start + t.duration;
                                    n ? n.end = s : (n = {start: a, end: s}, i.push(n))
                                }
                            }
                        }, t.prototype.onMediaAttached = function (e) {
                            this.media = e.media, this.state = pe.IDLE
                        }, t.prototype.onMediaDetaching = function () {
                            this.media = null, this.state = pe.STOPPED
                        }, t.prototype.onError = function (e) {
                            var t = e.frag;
                            t && "subtitle" === t.type && (this.state = pe.IDLE)
                        }, t.prototype.onSubtitleTracksUpdated = function (e) {
                            var t = this;
                            l.logger.log("subtitle tracks updated"), this.tracksBuffered = [], this.tracks = e.subtitleTracks, this.tracks.forEach(function (e) {
                                t.tracksBuffered[e.id] = []
                            })
                        }, t.prototype.onSubtitleTrackSwitch = function (e) {
                            if (this.currentTrackId = e.id, this.tracks && -1 !== this.currentTrackId) {
                                var t = this.tracks[this.currentTrackId];
                                t && t.details && this.setInterval(500)
                            } else this.clearInterval()
                        }, t.prototype.onSubtitleTrackLoaded = function (e) {
                            var t = e.id, r = e.details, i = this.currentTrackId, n = this.tracks, a = n[i];
                            t >= n.length || t !== i || !a || (r.live && function (e, t) {
                                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, i = -1;
                                ie(e, t, function (e, t, r) {
                                    t.start = e.start, i = r
                                });
                                var n = t.fragments;
                                if (i < 0) n.forEach(function (e) {
                                    e.start += r
                                }); else for (var a = i + 1; a < n.length; a++) n[a].start = n[a - 1].start + n[a - 1].duration
                            }(a.details, r, this.lastAVStart), a.details = r, this.setInterval(500))
                        }, t.prototype.onKeyLoaded = function () {
                            this.state === pe.KEY_LOADING && (this.state = pe.IDLE)
                        }, t.prototype.onFragLoaded = function (e) {
                            var t = this.fragCurrent, r = e.frag.decryptdata, i = e.frag, n = this.hls;
                            if (this.state === pe.FRAG_LOADING && t && "subtitle" === e.frag.type && t.sn === e.frag.sn && e.payload.byteLength > 0 && r && r.key && "AES-128" === r.method) {
                                var a = Ot.now();
                                this.decrypter.decrypt(e.payload, r.key.buffer, r.iv.buffer, function (e) {
                                    var t = Ot.now();
                                    n.trigger(s.default.FRAG_DECRYPTED, {
                                        frag: i,
                                        payload: e,
                                        stats: {tstart: a, tdecrypt: t}
                                    })
                                })
                            }
                        }, t.prototype.onLevelUpdated = function (e) {
                            var t = e.details.fragments;
                            this.lastAVStart = t.length ? t[0].start : 0
                        }, t.prototype.doTick = function () {
                            if (this.media) switch (this.state) {
                                case pe.IDLE:
                                    var e = this.config, t = this.currentTrackId, r = this.fragmentTracker,
                                        i = this.media, n = this.tracks;
                                    if (!n || !n[t] || !n[t].details) break;
                                    var a = e.maxBufferHole, o = e.maxFragLookUpTolerance,
                                        u = Math.min(e.maxBufferLength, e.maxMaxBufferLength),
                                        d = V.bufferedInfo(this._getBuffered(), i.currentTime, a), c = d.end, f = d.len,
                                        h = n[t].details, p = h.fragments, g = p.length,
                                        v = p[g - 1].start + p[g - 1].duration;
                                    if (f > u) return;
                                    var y = void 0, m = this.fragPrevious;
                                    c < v ? (m && h.hasProgramDateTime && (y = le(p, m.endProgramDateTime, o)), y || (y = ue(m, p, c, o))) : y = p[g - 1], y && y.encrypted ? (l.logger.log("Loading key for " + y.sn), this.state = pe.KEY_LOADING, this.hls.trigger(s.default.KEY_LOADING, {frag: y})) : y && r.getState(y) === U && (this.fragCurrent = y, this.state = pe.FRAG_LOADING, this.hls.trigger(s.default.FRAG_LOADING, {frag: y}))
                            } else this.state = pe.IDLE
                        }, t.prototype.stopLoad = function () {
                            this.lastAVStart = 0, e.prototype.stopLoad.call(this)
                        }, t.prototype._getBuffered = function () {
                            return this.tracksBuffered[this.currentTrackId] || []
                        }, t
                    }(ge), Ct = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();
                    var xt = window.XMLHttpRequest, Pt = "com.widevine.alpha", Ft = "com.microsoft.playready",
                        Nt = function (e) {
                            function t(r) {
                                !function (e, t) {
                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                }(this, t);
                                var i = function (e, t) {
                                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                                }(this, e.call(this, r, s.default.MEDIA_ATTACHED, s.default.MANIFEST_PARSED));
                                return i._widevineLicenseUrl = r.config.widevineLicenseUrl, i._licenseXhrSetup = r.config.licenseXhrSetup, i._emeEnabled = r.config.emeEnabled, i._requestMediaKeySystemAccess = r.config.requestMediaKeySystemAccessFunc, i._mediaKeysList = [], i._media = null, i._hasSetMediaKeys = !1, i._isMediaEncrypted = !1, i._requestLicenseFailureCount = 0, i
                            }

                            return function (e, t) {
                                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                                e.prototype = Object.create(t && t.prototype, {
                                    constructor: {
                                        value: e,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                            }(t, e), t.prototype.getLicenseServerUrl = function (e) {
                                var t = void 0;
                                switch (e) {
                                    case Pt:
                                        t = this._widevineLicenseUrl;
                                        break;
                                    default:
                                        t = null
                                }
                                return t || (l.logger.error('No license server URL configured for key-system "' + e + '"'), this.hls.trigger(s.default.ERROR, {
                                    type: a.ErrorTypes.KEY_SYSTEM_ERROR,
                                    details: a.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                                    fatal: !0
                                })), t
                            }, t.prototype._attemptKeySystemAccess = function (e, t, r) {
                                var i = this, n = function (e, t, r) {
                                    switch (e) {
                                        case Pt:
                                            return function (e, t, r) {
                                                var i = {videoCapabilities: []};
                                                return t.forEach(function (e) {
                                                    i.videoCapabilities.push({contentType: 'video/mp4; codecs="' + e + '"'})
                                                }), [i]
                                            }(0, r);
                                        default:
                                            throw Error("Unknown key-system: " + e)
                                    }
                                }(e, 0, r);
                                n ? (l.logger.log("Requesting encrypted media key-system access"), this.requestMediaKeySystemAccess(e, n).then(function (t) {
                                    i._onMediaKeySystemAccessObtained(e, t)
                                }).catch(function (t) {
                                    l.logger.error('Failed to obtain key-system "' + e + '" access:', t)
                                })) : l.logger.warn("Can not create config for key-system (maybe because platform is not supported):", e)
                            }, t.prototype._onMediaKeySystemAccessObtained = function (e, t) {
                                var r = this;
                                l.logger.log('Access for key-system "' + e + '" obtained');
                                var i = {
                                    mediaKeys: null,
                                    mediaKeysSession: null,
                                    mediaKeysSessionInitialized: !1,
                                    mediaKeySystemAccess: t,
                                    mediaKeySystemDomain: e
                                };
                                this._mediaKeysList.push(i), t.createMediaKeys().then(function (t) {
                                    i.mediaKeys = t, l.logger.log('Media-keys created for key-system "' + e + '"'), r._onMediaKeysCreated()
                                }).catch(function (e) {
                                    l.logger.error("Failed to create media-keys:", e)
                                })
                            }, t.prototype._onMediaKeysCreated = function () {
                                var e = this;
                                this._mediaKeysList.forEach(function (t) {
                                    t.mediaKeysSession || (t.mediaKeysSession = t.mediaKeys.createSession(), e._onNewMediaKeySession(t.mediaKeysSession))
                                })
                            }, t.prototype._onNewMediaKeySession = function (e) {
                                var t = this;
                                l.logger.log("New key-system session " + e.sessionId), e.addEventListener("message", function (r) {
                                    t._onKeySessionMessage(e, r.message)
                                }, !1)
                            }, t.prototype._onKeySessionMessage = function (e, t) {
                                l.logger.log("Got EME message event, creating license request"), this._requestLicense(t, function (t) {
                                    l.logger.log("Received license data, updating key-session"), e.update(t)
                                })
                            }, t.prototype._onMediaEncrypted = function (e, t) {
                                l.logger.log('Media is encrypted using "' + e + '" init data type'), this._isMediaEncrypted = !0, this._mediaEncryptionInitDataType = e, this._mediaEncryptionInitData = t, this._attemptSetMediaKeys(), this._generateRequestWithPreferredKeySession()
                            }, t.prototype._attemptSetMediaKeys = function () {
                                if (!this._hasSetMediaKeys) {
                                    var e = this._mediaKeysList[0];
                                    if (!e || !e.mediaKeys) return l.logger.error("Fatal: Media is encrypted but no CDM access or no keys have been obtained yet"), void this.hls.trigger(s.default.ERROR, {
                                        type: a.ErrorTypes.KEY_SYSTEM_ERROR,
                                        details: a.ErrorDetails.KEY_SYSTEM_NO_KEYS,
                                        fatal: !0
                                    });
                                    l.logger.log("Setting keys for encrypted media"), this._media.setMediaKeys(e.mediaKeys), this._hasSetMediaKeys = !0
                                }
                            }, t.prototype._generateRequestWithPreferredKeySession = function () {
                                var e = this, t = this._mediaKeysList[0];
                                if (!t) return l.logger.error("Fatal: Media is encrypted but not any key-system access has been obtained yet"), void this.hls.trigger(s.default.ERROR, {
                                    type: a.ErrorTypes.KEY_SYSTEM_ERROR,
                                    details: a.ErrorDetails.KEY_SYSTEM_NO_ACCESS,
                                    fatal: !0
                                });
                                if (t.mediaKeysSessionInitialized) l.logger.warn("Key-Session already initialized but requested again"); else {
                                    var r = t.mediaKeysSession;
                                    r || (l.logger.error("Fatal: Media is encrypted but no key-session existing"), this.hls.trigger(s.default.ERROR, {
                                        type: a.ErrorTypes.KEY_SYSTEM_ERROR,
                                        details: a.ErrorDetails.KEY_SYSTEM_NO_SESSION,
                                        fatal: !0
                                    }));
                                    var i = this._mediaEncryptionInitDataType, n = this._mediaEncryptionInitData;
                                    l.logger.log('Generating key-session request for "' + i + '" init data type'), t.mediaKeysSessionInitialized = !0, r.generateRequest(i, n).then(function () {
                                        l.logger.debug("Key-session generation succeeded")
                                    }).catch(function (t) {
                                        l.logger.error("Error generating key-session request:", t), e.hls.trigger(s.default.ERROR, {
                                            type: a.ErrorTypes.KEY_SYSTEM_ERROR,
                                            details: a.ErrorDetails.KEY_SYSTEM_NO_SESSION,
                                            fatal: !1
                                        })
                                    })
                                }
                            }, t.prototype._createLicenseXhr = function (e, t, r) {
                                var i = new xt, n = this._licenseXhrSetup;
                                try {
                                    if (n) try {
                                        n(i, e)
                                    } catch (t) {
                                        i.open("POST", e, !0), n(i, e)
                                    }
                                    i.readyState || i.open("POST", e, !0)
                                } catch (e) {
                                    return l.logger.error("Error setting up key-system license XHR", e), void this.hls.trigger(s.default.ERROR, {
                                        type: a.ErrorTypes.KEY_SYSTEM_ERROR,
                                        details: a.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                                        fatal: !0
                                    })
                                }
                                return i.responseType = "arraybuffer", i.onreadystatechange = this._onLicenseRequestReadyStageChange.bind(this, i, e, t, r), i
                            }, t.prototype._onLicenseRequestReadyStageChange = function (e, t, r, i) {
                                switch (e.readyState) {
                                    case 4:
                                        if (200 === e.status) this._requestLicenseFailureCount = 0, l.logger.log("License request succeeded"), i(e.response); else {
                                            if (l.logger.error("License Request XHR failed (" + t + "). Status: " + e.status + " (" + e.statusText + ")"), this._requestLicenseFailureCount++, this._requestLicenseFailureCount <= 3) {
                                                var n = 3 - this._requestLicenseFailureCount + 1;
                                                return l.logger.warn("Retrying license request, " + n + " attempts left"), void this._requestLicense(r, i)
                                            }
                                            this.hls.trigger(s.default.ERROR, {
                                                type: a.ErrorTypes.KEY_SYSTEM_ERROR,
                                                details: a.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                                                fatal: !0
                                            })
                                        }
                                }
                            }, t.prototype._generateLicenseRequestChallenge = function (e, t) {
                                var r = void 0;
                                return e.mediaKeySystemDomain === Ft ? l.logger.error("PlayReady is not supported (yet)") : e.mediaKeySystemDomain === Pt ? r = t : l.logger.error("Unsupported key-system:", e.mediaKeySystemDomain), r
                            }, t.prototype._requestLicense = function (e, t) {
                                l.logger.log("Requesting content license for key-system");
                                var r = this._mediaKeysList[0];
                                if (!r) return l.logger.error("Fatal error: Media is encrypted but no key-system access has been obtained yet"), void this.hls.trigger(s.default.ERROR, {
                                    type: a.ErrorTypes.KEY_SYSTEM_ERROR,
                                    details: a.ErrorDetails.KEY_SYSTEM_NO_ACCESS,
                                    fatal: !0
                                });
                                var i = this.getLicenseServerUrl(r.mediaKeySystemDomain),
                                    n = this._createLicenseXhr(i, e, t);
                                l.logger.log("Sending license request to URL: " + i), n.send(this._generateLicenseRequestChallenge(r, e))
                            }, t.prototype.onMediaAttached = function (e) {
                                var t = this;
                                if (this._emeEnabled) {
                                    var r = e.media;
                                    this._media = r, r.addEventListener("encrypted", function (e) {
                                        t._onMediaEncrypted(e.initDataType, e.initData)
                                    })
                                }
                            }, t.prototype.onManifestParsed = function (e) {
                                if (this._emeEnabled) {
                                    var t = e.levels.map(function (e) {
                                        return e.audioCodec
                                    }), r = e.levels.map(function (e) {
                                        return e.videoCodec
                                    });
                                    this._attemptKeySystemAccess(Pt, t, r)
                                }
                            }, Ct(t, [{
                                key: "requestMediaKeySystemAccess", get: function () {
                                    if (!this._requestMediaKeySystemAccess) throw new Error("No requestMediaKeySystemAccess function configured");
                                    return this._requestMediaKeySystemAccess
                                }
                            }]), t
                        }(c), Mt = {
                            autoStartLoad: !0,
                            startPosition: -1,
                            defaultAudioCodec: void 0,
                            debug: !1,
                            capLevelOnFPSDrop: !1,
                            capLevelToPlayerSize: !1,
                            initialLiveManifestSize: 1,
                            maxBufferLength: 30,
                            maxBufferSize: 6e9,
                            maxBufferHole: .5,
                            lowBufferWatchdogPeriod: .5,
                            highBufferWatchdogPeriod: 3,
                            nudgeOffset: .1,
                            nudgeMaxRetry: 3,
                            maxFragLookUpTolerance: .25,
                            liveSyncDurationCount: 3,
                            liveMaxLatencyDurationCount: 1 / 0,
                            liveSyncDuration: void 0,
                            liveMaxLatencyDuration: void 0,
                            liveDurationInfinity: !1,
                            liveBackBufferLength: 1 / 0,
                            maxMaxBufferLength: 600,
                            enableWorker: !0,
                            enableSoftwareAES: !0,
                            manifestLoadingTimeOut: 1e4,
                            manifestLoadingMaxRetry: 1,
                            manifestLoadingRetryDelay: 1e3,
                            manifestLoadingMaxRetryTimeout: 64e3,
                            startLevel: void 0,
                            levelLoadingTimeOut: 1e4,
                            levelLoadingMaxRetry: 4,
                            levelLoadingRetryDelay: 1e3,
                            levelLoadingMaxRetryTimeout: 64e3,
                            fragLoadingTimeOut: 2e4,
                            fragLoadingMaxRetry: 6,
                            fragLoadingRetryDelay: 1e3,
                            fragLoadingMaxRetryTimeout: 64e3,
                            startFragPrefetch: !1,
                            fpsDroppedMonitoringPeriod: 5e3,
                            fpsDroppedMonitoringThreshold: .2,
                            appendErrorMaxRetry: 3,
                            loader: Ne,
                            fLoader: void 0,
                            pLoader: void 0,
                            xhrSetup: void 0,
                            licenseXhrSetup: void 0,
                            abrController: we,
                            bufferController: Le,
                            capLevelController: Oe,
                            fpsController: Ce,
                            stretchShortVideoTrack: !1,
                            maxAudioFramesDrift: 1,
                            forceKeyFrameOnDiscontinuity: !0,
                            abrEwmaFastLive: 3,
                            abrEwmaSlowLive: 9,
                            abrEwmaFastVoD: 3,
                            abrEwmaSlowVoD: 9,
                            abrEwmaDefaultEstimate: 5e5,
                            abrBandWidthFactor: .95,
                            abrBandWidthUpFactor: .7,
                            abrMaxWithRealBitrate: !1,
                            maxStarvationDelay: 4,
                            maxLoadingDelay: 4,
                            minAutoBitrate: 0,
                            emeEnabled: !1,
                            widevineLicenseUrl: void 0,
                            requestMediaKeySystemAccessFunc: "undefined" != typeof window && window.navigator && window.navigator.requestMediaKeySystemAccess ? window.navigator.requestMediaKeySystemAccess.bind(window.navigator) : null,
                            testBandwidth: !0
                        };
                    Mt.subtitleStreamController = It, Mt.subtitleTrackController = Lt, Mt.timelineController = kt, Mt.cueHandler = i, Mt.enableCEA708Captions = !0, Mt.enableWebVTT = !0, Mt.captionsTextTrack1Label = "English", Mt.captionsTextTrack1LanguageCode = "en", Mt.captionsTextTrack2Label = "Spanish", Mt.captionsTextTrack2LanguageCode = "es", Mt.audioStreamController = Ge, Mt.audioTrackController = Ue, Mt.emeController = Nt;
                    var Ut = function () {
                        function e(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var i = t[r];
                                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                            }
                        }

                        return function (t, r, i) {
                            return r && e(t.prototype, r), i && e(t, i), t
                        }
                    }();
                    var Bt = function (e) {
                        function t() {
                            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t);
                            var i = function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, e.call(this)), n = t.DefaultConfig;
                            if ((r.liveSyncDurationCount || r.liveMaxLatencyDurationCount) && (r.liveSyncDuration || r.liveMaxLatencyDuration)) throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
                            for (var a in n) a in r || (r[a] = n[a]);
                            if (void 0 !== r.liveMaxLatencyDurationCount && r.liveMaxLatencyDurationCount <= r.liveSyncDurationCount) throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');
                            if (void 0 !== r.liveMaxLatencyDuration && (r.liveMaxLatencyDuration <= r.liveSyncDuration || void 0 === r.liveSyncDuration)) throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');
                            Object(l.enableLogs)(r.debug), i.config = r, i._autoLevelCapping = -1;
                            var o = i.abrController = new r.abrController(i), s = new r.bufferController(i),
                                u = new r.capLevelController(i), d = new r.fpsController(i), c = new F(i), f = new N(i),
                                h = new M(i), p = i.levelController = new be(i), g = new K(i),
                                v = [p, i.streamController = new ye(i, g)], y = r.audioStreamController;
                            y && v.push(new y(i, g)), i.networkControllers = v;
                            var m = [c, f, h, o, s, u, d, g];
                            if (y = r.audioTrackController) {
                                var T = new y(i);
                                i.audioTrackController = T, m.push(T)
                            }
                            if (y = r.subtitleTrackController) {
                                var E = new y(i);
                                i.subtitleTrackController = E, v.push(E)
                            }
                            if (y = r.emeController) {
                                var b = new y(i);
                                i.emeController = b, m.push(b)
                            }
                            return (y = r.subtitleStreamController) && v.push(new y(i, g)), (y = r.timelineController) && m.push(new y(i)), i.coreComponents = m, i
                        }

                        return function (e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                        }(t, e), t.isSupported = function () {
                            return e = q(), t = window.SourceBuffer || window.WebKitSourceBuffer, r = e && "function" == typeof e.isTypeSupported && e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'), i = !t || t.prototype && "function" == typeof t.prototype.appendBuffer && "function" == typeof t.prototype.remove, !!r && !!i;
                            var e, t, r, i
                        }, Ut(t, null, [{
                            key: "version", get: function () {
                                return "0.11.0"
                            }
                        }, {
                            key: "Events", get: function () {
                                return s.default
                            }
                        }, {
                            key: "ErrorTypes", get: function () {
                                return a.ErrorTypes
                            }
                        }, {
                            key: "ErrorDetails", get: function () {
                                return a.ErrorDetails
                            }
                        }, {
                            key: "DefaultConfig", get: function () {
                                return t.defaultConfig ? t.defaultConfig : Mt
                            }, set: function (e) {
                                t.defaultConfig = e
                            }
                        }]), t.prototype.destroy = function () {
                            l.logger.log("destroy"), this.trigger(s.default.DESTROYING), this.detachMedia(), this.coreComponents.concat(this.networkControllers).forEach(function (e) {
                                e.destroy()
                            }), this.url = null, this.removeAllListeners(), this._autoLevelCapping = -1
                        }, t.prototype.attachMedia = function (e) {
                            l.logger.log("attachMedia"), this.media = e, this.trigger(s.default.MEDIA_ATTACHING, {media: e})
                        }, t.prototype.detachMedia = function () {
                            l.logger.log("detachMedia"), this.trigger(s.default.MEDIA_DETACHING), this.media = null
                        }, t.prototype.loadSource = function (e) {
                            e = n.buildAbsoluteURL(window.location.href, e, {alwaysNormalize: !0}), l.logger.log("loadSource:" + e), this.url = e, this.trigger(s.default.MANIFEST_LOADING, {url: e})
                        }, t.prototype.startLoad = function () {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
                            l.logger.log("startLoad(" + e + ")"), this.networkControllers.forEach(function (t) {
                                t.startLoad(e)
                            })
                        }, t.prototype.stopLoad = function () {
                            l.logger.log("stopLoad"), this.networkControllers.forEach(function (e) {
                                e.stopLoad()
                            })
                        }, t.prototype.swapAudioCodec = function () {
                            l.logger.log("swapAudioCodec"), this.streamController.swapAudioCodec()
                        }, t.prototype.recoverMediaError = function () {
                            l.logger.log("recoverMediaError");
                            var e = this.media;
                            this.detachMedia(), this.attachMedia(e)
                        }, t.prototype.removeLevel = function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                            this.levelController.removeLevel(e, t)
                        }, Ut(t, [{
                            key: "levels", get: function () {
                                return this.levelController.levels
                            }
                        }, {
                            key: "currentLevel", get: function () {
                                return this.streamController.currentLevel
                            }, set: function (e) {
                                l.logger.log("set currentLevel:" + e), this.loadLevel = e, this.streamController.immediateLevelSwitch()
                            }
                        }, {
                            key: "nextLevel", get: function () {
                                return this.streamController.nextLevel
                            }, set: function (e) {
                                l.logger.log("set nextLevel:" + e), this.levelController.manualLevel = e, this.streamController.nextLevelSwitch()
                            }
                        }, {
                            key: "loadLevel", get: function () {
                                return this.levelController.level
                            }, set: function (e) {
                                l.logger.log("set loadLevel:" + e), this.levelController.manualLevel = e
                            }
                        }, {
                            key: "nextLoadLevel", get: function () {
                                return this.levelController.nextLoadLevel
                            }, set: function (e) {
                                this.levelController.nextLoadLevel = e
                            }
                        }, {
                            key: "firstLevel", get: function () {
                                return Math.max(this.levelController.firstLevel, this.minAutoLevel)
                            }, set: function (e) {
                                l.logger.log("set firstLevel:" + e), this.levelController.firstLevel = e
                            }
                        }, {
                            key: "bandwidthEstimate", get: function () {
                                var e = this.abrController._bwEstimator;
                                return e ? e.getEstimate() : NaN
                            }
                        }, {
                            key: "startLevel", get: function () {
                                return this.levelController.startLevel
                            }, set: function (e) {
                                l.logger.log("set startLevel:" + e);
                                -1 !== e && (e = Math.max(e, this.minAutoLevel)), this.levelController.startLevel = e
                            }
                        }, {
                            key: "autoLevelCapping", get: function () {
                                return this._autoLevelCapping
                            }, set: function (e) {
                                l.logger.log("set autoLevelCapping:" + e), this._autoLevelCapping = e
                            }
                        }, {
                            key: "autoLevelEnabled", get: function () {
                                return -1 === this.levelController.manualLevel
                            }
                        }, {
                            key: "manualLevel", get: function () {
                                return this.levelController.manualLevel
                            }
                        }, {
                            key: "minAutoLevel", get: function () {
                                for (var e = this.levels, t = this.config.minAutoBitrate, r = e ? e.length : 0, i = 0; i < r; i++) {
                                    if ((e[i].realBitrate ? Math.max(e[i].realBitrate, e[i].bitrate) : e[i].bitrate) > t) return i
                                }
                                return 0
                            }
                        }, {
                            key: "maxAutoLevel", get: function () {
                                var e = this.levels, t = this.autoLevelCapping;
                                return -1 === t && e && e.length ? e.length - 1 : t
                            }
                        }, {
                            key: "nextAutoLevel", get: function () {
                                return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel)
                            }, set: function (e) {
                                this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, e)
                            }
                        }, {
                            key: "audioTracks", get: function () {
                                var e = this.audioTrackController;
                                return e ? e.audioTracks : []
                            }
                        }, {
                            key: "audioTrack", get: function () {
                                var e = this.audioTrackController;
                                return e ? e.audioTrack : -1
                            }, set: function (e) {
                                var t = this.audioTrackController;
                                t && (t.audioTrack = e)
                            }
                        }, {
                            key: "liveSyncPosition", get: function () {
                                return this.streamController.liveSyncPosition
                            }
                        }, {
                            key: "subtitleTracks", get: function () {
                                var e = this.subtitleTrackController;
                                return e ? e.subtitleTracks : []
                            }
                        }, {
                            key: "subtitleTrack", get: function () {
                                var e = this.subtitleTrackController;
                                return e ? e.subtitleTrack : -1
                            }, set: function (e) {
                                var t = this.subtitleTrackController;
                                t && (t.subtitleTrack = e)
                            }
                        }, {
                            key: "subtitleDisplay", get: function () {
                                var e = this.subtitleTrackController;
                                return !!e && e.subtitleDisplay
                            }, set: function (e) {
                                var t = this.subtitleTrackController;
                                t && (t.subtitleDisplay = e)
                            }
                        }]), t
                    }(z);
                    t.default = Bt
                }, "./src/polyfills/number-isFinite.js":
                /*!******************************************!*\
  !*** ./src/polyfills/number-isFinite.js ***!
  \******************************************/
                /*! exports provided: isFiniteNumber */function (e, t, r) {
                    "use strict";
                    r.r(t), r.d(t, "isFiniteNumber", function () {
                        return i
                    });
                    var i = Number.isFinite || function (e) {
                        return "number" == typeof e && isFinite(e)
                    }
                }, "./src/utils/get-self-scope.js":
                /*!*************************************!*\
  !*** ./src/utils/get-self-scope.js ***!
  \*************************************/
                /*! exports provided: getSelfScope */function (e, t, r) {
                    "use strict";

                    function i() {
                        return "undefined" == typeof window ? self : window
                    }

                    r.r(t), r.d(t, "getSelfScope", function () {
                        return i
                    })
                }, "./src/utils/logger.js":
                /*!*****************************!*\
  !*** ./src/utils/logger.js ***!
  \*****************************/
                /*! exports provided: enableLogs, logger */function (e, t, r) {
                    "use strict";
                    r.r(t), r.d(t, "enableLogs", function () {
                        return d
                    }), r.d(t, "logger", function () {
                        return c
                    });
                    var i = r(/*! ./get-self-scope */"./src/utils/get-self-scope.js"),
                        n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                            return typeof e
                        } : function (e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        };

                    function a() {
                    }

                    var o = {trace: a, debug: a, log: a, warn: a, info: a, error: a}, s = o;
                    var l = Object(i.getSelfScope)();

                    function u(e) {
                        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                        r.forEach(function (t) {
                            s[t] = e[t] ? e[t].bind(e) : function (e) {
                                var t = l.console[e];
                                return t ? function () {
                                    for (var r = arguments.length, i = Array(r), n = 0; n < r; n++) i[n] = arguments[n];
                                    i[0] && (i[0] = function (e, t) {
                                        return t = "[" + e + "] > " + t
                                    }(e, i[0])), t.apply(l.console, i)
                                } : a
                            }(t)
                        })
                    }

                    var d = function (e) {
                        if (!0 === e || "object" === (void 0 === e ? "undefined" : n(e))) {
                            u(e, "debug", "log", "info", "warn", "error");
                            try {
                                s.log()
                            } catch (e) {
                                s = o
                            }
                        } else s = o
                    }, c = s
                }
            }).default
        }, "object" == typeof t && "object" == typeof e ? e.exports = i() : "function" == typeof define && define.amd ? define([], i) : "object" == typeof t ? t.Hls = i() : r.Hls = i()
    }, 148: function (e, t, r) {
        "use strict";
        r.r(t);
        var i = {};
        r.r(i), r.d(i, "debug", function () {
            return y
        }), r.d(i, "log", function () {
            return m
        }), r.d(i, "info", function () {
            return T
        }), r.d(i, "warn", function () {
            return E
        }), r.d(i, "error", function () {
            return b
        });
        var n = r(0), a = r(133), o = r.n(a), s = r(74), l = 9;

        function u(e, t, r) {
            for (var i = e.length, n = t, a = []; n < t + r;) {
                if (i - n < 8) return a;
                var o = n;
                n += 4;
                var l = Object(s.b)(e.subarray(n, n += 4));
                if (i - n < l + 2) return a;
                if (e.subarray(n, n += 1)[0] > 0) return a;
                var u = e[n];
                3 !== u && 0 !== u || (l -= 1, n += 1);
                var d = e.buffer.slice(o - 10, n + l + 1);
                a.push({data: d}), n += l + 1
            }
            return a
        }

        function d(e, t) {
            for (var r = 0; r < t.length; r++) {
                var i = t[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        var c = function () {
            function e(t, r, i, n) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.video = t, this.hlsjs = i, this.videoListeners = r, this.hlsjsListeners = n
            }

            var t, r, i;
            return t = e, (r = [{
                key: "on", value: function () {
                    var e = this;
                    this.off(), Object(n.i)(this.videoListeners, function (t, r) {
                        e.video.addEventListener(r, t, !1)
                    }), Object(n.i)(this.hlsjsListeners, function (t, r) {
                        e.hlsjs.on(r, t)
                    })
                }
            }, {
                key: "off", value: function () {
                    var e = this;
                    Object(n.i)(this.videoListeners, function (t, r) {
                        e.video.removeEventListener(r, t)
                    }), Object(n.i)(this.hlsjsListeners, function (t, r) {
                        e.hlsjs.off(r, t)
                    })
                }
            }]) && d(t.prototype, r), i && d(t, i), e
        }(), f = r(129);

        function h(e, t) {
            var r = Object(f.b)(e), i = Object(n.A)(e, function (e, i) {
                return {
                    label: Object(f.a)(e, t, r),
                    level_id: e.id,
                    hlsjsIndex: i,
                    bitrate: e.bitrate,
                    height: e.height,
                    width: e.width,
                    audioGroupId: e.attrs ? e.attrs.AUDIO : void 0
                }
            });
            return (i = g(i)).length > 1 && i.unshift({label: "Auto", level_id: "auto", hlsjsIndex: -1}), i
        }

        function p(e, t) {
            return Math.max(0, Object(n.p)(t, Object(n.l)(t, function (t) {
                return t.hlsjsIndex === e
            })))
        }

        var g = function (e) {
            return e.sort(function (e, t) {
                return e.height && t.height ? e.height === t.height ? t.bitrate - e.bitrate : t.height - e.height : t.bitrate - e.bitrate
            })
        }, v = function (e, t, r) {
            window.jwplayer.debug && e.call(console, "[Hls.js ".concat(t, "] -> ").concat(r))
        }, y = function (e) {
            v(console.debug, "debug", e)
        }, m = function (e) {
            v(console.log, "log", e)
        }, T = function (e) {
            v(console.info, "info", e)
        }, E = function (e) {
            v(console.warn, "warn", e)
        }, b = function (e) {
            v(console.error, "error", e)
        }, _ = r(128);

        function S(e) {

            var t = e.withCredentials, r = e.aesToken, a = e.renderNatively, o = e.capLevelToPlayerSize,
                s = e.onXhrOpen, l = {
                    liveSyncDuration: 25,
                    autoStartLoad: !1,
                    maxBufferSize: 2e9,
                    maxMaxBufferLength: _.a,
                    capLevelToPlayerSize: o,
                    renderNatively: a,
                    debug: i,
                    captionsTextTrack1Label: "Unknown CC",
                    captionsTextTrack2Label: "Unknown CC"
                };
            return (t || r || s) && (l = Object(n.j)({}, l, function (e, t, r) {
                return {
                    xhrSetup: function (i, n) {
                        if (e && (i.withCredentials = !0), t) {
                            var a = n.indexOf("?") > 0 ? "&token=" : "?token=";
                            i.open("GET", n + a + t, !0)
                        }
                        "function" == typeof r && r(i, n)
                    }, fetchSetup: function (e, t) {
                        return t.credentials = "include", new Request(e.url, t)
                    }
                }
            }(t, r, s))), l
        }

        var R = r(127), k = r(1), w = o.a.ErrorTypes.NETWORK_ERROR, A = o.a.ErrorDetails, L = A.MANIFEST_PARSING_ERROR,
            D = A.LEVEL_EMPTY_ERROR, O = A.MANIFEST_INCOMPATIBLE_CODECS_ERROR, I = A.FRAG_PARSING_ERROR,
            C = A.FRAG_DECRYPT_ERROR, x = A.BUFFER_STALLED_ERROR, P = A.BUFFER_APPEND_ERROR, F = A.INTERNAL_EXCEPTION,
            N = A.MANIFEST_LOAD_ERROR, M = A.LEVEL_LOAD_ERROR, U = A.LEVEL_LOAD_TIMEOUT, B = A.BUFFER_SEEK_OVER_HOLE,
            j = 23e4, G = 232002, K = 230002, H = 232600, V = 232631, W = 232632, Y = 233600, q = 233650, X = 234001,
            z = 234002, J = 239e3, Q = [N, L, O, M], $ = [x, B], Z = [D, M, U];

        function ee(e) {
            if (e) {
                if (/^frag/.test(e)) return 2e3;
                if (/^(manifest|level|audioTrack)/.test(e)) return 1e3;
                if (/^key/.test(e)) return 4e3
            }
            return 0
        }

        var te = r(125), re = r(126), ie = r(77), ne = r(8);

        function ae(e) {
            return (ae = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function oe(e) {
            return (oe = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function se(e, t) {
            return (se = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function le(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        var ue = function (e) {
            function t() {
                var e, r, i;
                return function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), r = this, e = !(i = oe(t).call(this)) || "object" !== ae(i) && "function" != typeof i ? le(r) : i, Object(n.j)(le(le(e)), te.a, re.a, ie.a), e
            }

            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && se(e, t)
            }(t, ne["a"]), t
        }(), de = r(105);
        var ce = r(70), fe = r(6), he = r(3), pe = r(17), ge = r(124), ve = r(18), ye = r(72), me = r(131);

        function Te(e) {
            return (Te = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function Ee(e, t) {
            return function (e) {
                if (Array.isArray(e)) return e
            }(e) || function (e, t) {
                var r = [], i = !0, n = !1, a = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(i = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); i = !0) ;
                } catch (e) {
                    n = !0, a = e
                } finally {
                    try {
                        i || null == s.return || s.return()
                    } finally {
                        if (n) throw a
                    }
                }
                return r
            }(e, t) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function be(e, t) {
            for (var r = 0; r < t.length; r++) {
                var i = t[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }

        function _e(e, t, r) {
            return (_e = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (e, t, r) {
                var i = function (e, t) {
                    for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Se(e));) ;
                    return e
                }(e, t);
                if (i) {
                    var n = Object.getOwnPropertyDescriptor(i, t);
                    return n.get ? n.get.call(r) : n.value
                }
            })(e, t, r || e)
        }

        function Se(e) {
            return (Se = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function Re(e, t) {
            return (Re = Object.setPrototypeOf || function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function ke(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        r.d(t, "default", function () {
            return et
        });
        var we = window.VTTCue || window.TextTrackCue;

        function Ae(e, t, r) {
            var i = Math.max(t || 0, e + .25);
            return new we(e, i, r)
        }

        var Le = o.a.Events, De = Le.SUBTITLE_TRACKS_CLEARED, Oe = Le.MEDIA_ATTACHED, Ie = Le.MEDIA_DETACHED,
            Ce = Le.MANIFEST_LOADED, xe = Le.MANIFEST_PARSED, Pe = Le.LEVEL_SWITCHING, Fe = Le.LEVEL_LOADED,
            Ne = Le.LEVEL_UPDATED, Me = Le.LEVEL_PTS_UPDATED, Ue = Le.FRAG_CHANGED, Be = Le.LEVEL_SWITCHED,
            je = Le.FRAG_PARSING_METADATA, Ge = Le.BUFFER_APPENDING, Ke = Le.BUFFER_APPENDED, He = Le.BUFFER_CODECS,
            Ve = Le.FRAG_BUFFERED, We = Le.KEY_LOADING, Ye = Le.SUBTITLE_TRACKS_UPDATED,
            qe = Le.NON_NATIVE_TEXT_TRACKS_FOUND, Xe = Le.CUES_PARSED, ze = Le.AUDIO_TRACKS_UPDATED, Je = Le.ERROR,
            Qe = o.a.ErrorTypes, $e = Qe.MEDIA_ERROR, Ze = Qe.NETWORK_ERROR, et = function (e) {
                function t(e, r, i) {
                    var n, a, o;
                    return function (e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), a = this, (n = !(o = Se(t).call(this)) || "object" !== Te(o) && "function" != typeof o ? ke(a) : o).bandwidthMonitor = Object(me.a)(ke(ke(n)), r.bandwidthEstimate), n.bitrateSelection = r.bitrateSelection, n.bufferStallTimeout = 1e3, n.connectionTimeout = null, n.connectionTimeoutDuration = 1e4, n.currentHlsjsLevel = null, n.currentJwItem = null, n.dvrEnd = null, n.dvrPosition = null, n.dvrUpdatedTime = 0, n.eventHandler = null, n.hlsjs = null, n.hlsjsConfig = null, n.hlsjsOptions = null, n.jwConfig = r, n.jwLevels = null, n.lastEndSn = null, n.lastPosition = 0, n.lastRecoveryTime = null, n.levelDuration = 0, n.live = !1, n.livePaused = !1, n.maxRetries = 3, n.playerId = e, n.recoveringMediaError = !1, n.recoveringNetworkError = !1, n.recoveryInterval = 5e3, n.renderNatively = nt(r.renderCaptionsNatively), n.retryCount = 0, n.savedVideoProperties = !1, n.seeking = !1, n.src = null, n.staleManifestDurationMultiplier = 3e3, n.staleManifestTimeout = null, n.state = he.nb, n.streamBitrate = 0, n.streamType = "VOD", n.supports = t.supports, n.supportsPlaybackRate = !0, n.video = i, n.videoFound = !1, n.videoHeight = 0, n
                }

                var r, i, a;
                return function (e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && Re(e, t)
                }(t, ue), r = t, a = [{
                    key: "getName", value: function () {
                        return tt()
                    }
                }, {
                    key: "setEdition", value: function (e) {
                        t.supports = Object(ve.a)(e)
                    }
                }], (i = [{
                    key: "trigger", value: function (e, r) {
                        if (e === he.bb && r.newstate === he.qb && !this.videoHeight) {
                            var i = this.getCurrentHlsjsLevel();
                            this.checkAdaptation(i)
                        }
                        _e(Se(t.prototype), "trigger", this).call(this, e, r)
                    }
                }, {
                    key: "initHlsjs", value: function (e) {
                        var t = {
                            withCredentials: !!at(e, this.jwConfig, "withCredentials"),
                            aesToken: at(e, this.jwConfig, "aestoken"),
                            renderNatively: this.renderNatively,
                            capLevelToPlayerSize: !e.stereomode,
                            onXhrOpen: e.sources[0].onXhrOpen
                        };
                        this.setupSideloadedTracks(e.tracks), this.hlsjs && Object(n.B)(this.hlsjsOptions)(t) || (this.hlsjsOptions = t, this.restoreVideoProperties(), this.stopStaleTimeout(), this.hlsjsConfig = S(t), this.hlsjs = new o.a(this.hlsjsConfig), this.eventHandler = new c(this.video, this.createVideoListeners(), this.hlsjs, this.createHlsjsListeners()))
                    }
                }, {
                    key: "init", value: function (e) {
                        this.destroy(), this.initHlsjs(e)
                    }
                }, {
                    key: "preload", value: function (e) {
                        rt("preload", e), "metadata" === e.preload && (this.maxBufferLength = _.b), this.load(e)
                    }
                }, {
                    key: "load", value: function (e) {
                        var t = this.hlsjs, r = this.video, i = this.src, a = e.sources[0].file, o = a.url ? a.url : a;
                        if (i !== o || this.videoSrc !== r.src) {
                            var s = e.starttime || -1;
                            s < -1 && (s = this.lastPosition);
                            var l = this.bandwidthMonitor.getEstimate();
                            Object(n.z)(l) && (t.config.abrEwmaDefaultEstimate = l, t.config.testBandwidth = !1), rt("load", e), this.initHlsjs(e), this.currentJwItem = e, this.src = o, this.videoHeight = 0, this.eventsOn_(), t.attachMedia(r), t.config.startPosition = s, t.loadSource(o), this.videoSrc = r.src
                        } else this.maxBufferLength = _.a
                    }
                }, {
                    key: "play", value: function () {
                        if (this.livePaused) {
                            this.livePaused = !1;
                            var e = Object(n.j)({}, this.currentJwItem);
                            delete e.startTime, this.src = null, this._clearNonNativeCues(), this.clearMetaCues(), this.load(e)
                        }
                        return this.video.play() || Object(ye.a)(this.video)
                    }
                }, {
                    key: "pause", value: function () {
                        this.live && "LIVE" === this.streamType && !this.livePaused && this.livePause(), this.video.pause()
                    }
                }, {
                    key: "livePause", value: function () {
                        this.livePaused = !0, this.hlsjs.stopLoad(), this.stopStaleTimeout()
                    }
                }, {
                    key: "stop", value: function () {
                        this.clearTracks(), this.hlsjs && (this.hlsjs.trigger(De), this.eventsOff_(), this.hlsjs.stopLoad()), this.pause(), this.setState(he.nb)
                    }
                }, {
                    key: "seek", value: function (e) {
                        var t = this.getDuration();
                        if (t && t !== 1 / 0 && !Object(n.u)(t)) {
                            this.stopStaleTimeout();
                            var r = e >= 0 ? e : e + this.video.duration, i = this.getSeekRange();
                            if ("DVR" === this.streamType) if (this.dvrPosition = r - this.dvrEnd, e < 0) r += Math.min(12, (Object(pe.a)() - this.dvrUpdatedTime) / 1e3);
                            this.seeking = !0, this.trigger(he.Q, {
                                position: this.getCurrentTime(),
                                offset: r
                            }), this.video.currentTime = r;
                            var a = this.video.currentTime, o = {
                                position: this.getCurrentTime(),
                                duration: t,
                                currentTime: a,
                                seekRange: i,
                                metadata: {currentTime: a}
                            };
                            this.trigger("time", o)
                        } else it("Returned early from seek", "Duration", t)
                    }
                }, {
                    key: "getCurrentQuality", value: function () {
                        var e = 0;
                        return this.hlsjs && !this.hlsjs.autoLevelEnabled && (e = p(this.hlsjs.manualLevel, this.jwLevels)), e
                    }
                }, {
                    key: "getQualityLevels", value: function () {
                        return Object(n.A)(this.jwLevels, function (e) {
                            return Object(de.a)(e)
                        })
                    }
                }, {
                    key: "getCurrentAudioTrack", value: function () {
                        return Object(n.v)(this.currentAudioTrackIndex) ? this.currentAudioTrackIndex : -1
                    }
                }, {
                    key: "getAudioTracks", value: function () {
                        return this.audioTracks || []
                    }
                }, {
                    key: "getCurrentTime", value: function () {
                        return this.live && "DVR" === this.streamType ? (this.dvrPosition || this.updateDvrPosition(this.getSeekRange()), this.dvrPosition) : this.video.currentTime
                    }
                }, {
                    key: "getDuration", value: function () {
                        if (this.live && this.currentJwItem) {
                            var e = this.levelDuration, t = this.currentJwItem.minDvrWindow;
                            return Object(ce.a)(e, t) ? (this.streamType = "DVR", -e) : (this.streamType = "LIVE", 1 / 0)
                        }
                        return this.streamType = "VOD", this.video.duration
                    }
                }, {
                    key: "getCurrentHlsjsLevel", value: function () {
                        var e = 0;
                        if (this.hlsjs) {
                            var t = this.hlsjs, r = t.firstLevel, i = t.currentLevel;
                            e = i > 0 ? i : r
                        }
                        return e
                    }
                }, {
                    key: "getName", value: function () {
                        return tt()
                    }
                }, {
                    key: "getPlaybackRate", value: function () {
                        return this.video.playbackRate
                    }
                }, {
                    key: "getSeekRange", value: function () {
                        var e = this.levelDuration, t = this.video, r = t.seekable, i = t.duration,
                            a = r.length ? Math.max(r.end(0), r.end(r.length - 1)) : i;
                        return Object(n.u)(i) ? {start: 0, end: 0} : {start: Math.max(0, a - e), end: a}
                    }
                }, {
                    key: "getBandwidthEstimate", value: function () {
                        var e = this.hlsjs;
                        if (e) return e.bandwidthEstimate
                    }
                }, {
                    key: "setCurrentQuality", value: function (e) {
                        if (!(e < 0)) {
                            var t, r, i, n = this.hlsjs.levels,
                                a = (t = e, r = this.jwLevels, i = -1, t > -1 && r[t] && (i = r[t].hlsjsIndex), i);
                            this.hlsjs.nextLevel = a, this.trigger(he.J, {
                                levels: this.jwLevels,
                                currentQuality: e
                            }), this.bitrateSelection = this.jwLevels[e].bitrate, rt("Setting level to ", a, n[Math.max(a, 0)], this.jwLevels[e])
                        }
                    }
                }, {
                    key: "setCurrentAudioTrack", value: function (e) {
                        var t = p(this.getCurrentHlsjsLevel(), this.jwLevels);
                        if (this.jwLevels && this.jwLevels[t]) {
                            var r = this.jwLevels[t].audioGroupId;
                            Object(n.G)(this.audioTracksMap) && (this.audioTracks = this.audioTracksMap[r], Object(n.v)(e) && Object(n.G)(this.audioTracks) && this.audioTracks[e] && this.currentAudioTrackIndex !== e && (this.trigger(he.f, {
                                tracks: this.audioTracks,
                                currentTrack: e
                            }), null !== this.currentAudioTrackIndex && this.audioTracks[e].hlsjsIndex !== this.hlsjs.audioTrack && this.trigger(he.g, {
                                tracks: this.audioTracks,
                                currentTrack: e
                            }), this.currentAudioTrackIndex = e, this.audioTracks[e].hlsjsIndex !== this.hlsjs.audioTrack && (this.hlsjs.audioTrack = this.audioTracks[e].hlsjsIndex, rt("Setting audio track to", this.audioTracks[e]))))
                        }
                    }
                }, {
                    key: "updateAudioTrack", value: function (e) {
                        if (this.hlsjs.audioTracks.length) {
                            var t = this.currentAudioTrackIndex;
                            Object(n.v)(t) ? this.audioTracks[t].hlsjsIndex !== this.hlsjs.audioTrack && (this.currentAudioTrackIndex = null) : t = function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                                return Math.max(Object(n.p)(e, Object(n.l)(e, function (e) {
                                    return e.defaulttrack
                                })), 0)
                            }(this.audioTracksMap[e.attrs.AUDIO]), this.setCurrentAudioTrack(t)
                        }
                    }
                }, {
                    key: "updateDvrPosition", value: function (e) {
                        this.dvrPosition = this.video.currentTime - e.end, this.dvrEnd = e.end, this.dvrUpdatedTime = Object(pe.a)()
                    }
                }, {
                    key: "setCurrentSubtitleTrack", value: function (e) {
                        this.hlsjs.subtitleTrack = e
                    }
                }, {
                    key: "setPlaybackRate", value: function (e) {
                        this.video.playbackRate = this.video.defaultPlaybackRate = e
                    }
                }, {
                    key: "isLive", value: function () {
                        return this.live
                    }
                }, {
                    key: "checkAdaptation", value: function (e) {
                        var t = this, r = this.hlsjs, i = r.levels, n = r.autoLevelEnabled, a = i[e];
                        if (a) {
                            var o = a.width, s = a.height, l = a.bitrate;
                            if (o = o || this.video.videoWidth, (s = s || this.video.videoHeight) !== this.videoHeight || l !== this.streamBitrate) {
                                var u = p(e, this.jwLevels), d = "api";
                                this.streamBitrate || this.videoHeight ? n && (d = "auto") : d = "initial choice", this.videoHeight = s, this.streamBitrate = l;
                                var c = n ? "auto" : "manual", f = n && i.length > 1 ? "auto" : this.jwLevels[u].label,
                                    h = function () {
                                        t.trigger(he.U, {
                                            reason: d,
                                            mode: c,
                                            level: {bitrate: l, index: u, label: f, width: o, height: s}
                                        })
                                    };
                                fe.Browser.ie ? this.once("time", h, this) : h()
                            }
                        }
                    }
                }, {
                    key: "createVideoListeners", value: function () {
                        var e = this, t = {
                            waiting: function () {
                                e.seeking ? e.setState(he.ob) : e.state === he.qb && (e.atEdgeOfLiveStream() && e.setPlaybackRate(1), e.stallTime = e.video.currentTime, e.setState(he.rb))
                            }
                        };
                        return Object(n.i)(ge.a, function (r, i) {
                            "error" !== i && (t[i] = r.bind(e))
                        }), t
                    }
                }, {
                    key: "createHlsjsListeners", value: function () {
                        var e = this, t = {};
                        return t[Oe] = function () {
                            rt("Media attached"), e.recoveringMediaError && (e.hlsjs.startLoad(), e.recoveringMediaError = !1, e.resetRecovery(), e.stopStaleTimeout())
                        }, t[Ie] = function () {
                            rt("Media detached"), e._clearNonNativeCues()
                        }, t[Ce] = function (e, t) {
                            rt("Manifest loaded", t)
                        }, t[xe] = function (t, r) {
                            rt("Manifest parsed", r);
                            var i = r.levels, a = e.bitrateSelection, o = e.hlsjs, s = e.jwConfig, l = -1, u = -1;
                            e.currentHlsjsLevel = null, e.jwLevels = h(i, s.qualityLabels), Object(n.z)(a) && (u = l = function (e, t) {
                                if (!t) return -1;
                                for (var r = Number.MAX_VALUE, i = -1, n = 0; n < e.length; n++) {
                                    var a = e[n];
                                    if (a.bitrate) {
                                        var o = Math.abs(t - a.bitrate);
                                        if (o <= r && (r = o, i = n), !o) break
                                    }
                                }
                                return i
                            }(i, a)), o.startLevel = l, o.nextLevel = u, o.startLoad(o.config.startPosition), e.trigger(he.I, {
                                levels: e.jwLevels,
                                currentQuality: p(l, e.jwLevels)
                            })
                        }, t[Pe] = function (t, r) {
                            rt("Level switch requested", r, e.hlsjs.levels, "ABR:", e.hlsjs.autoLevelEnabled)
                        }, t[Fe] = function (t, r) {
                            rt("Level loaded", r);
                            var i = r.details, n = i.endSN, a = i.live, o = i.targetduration;
                            e.checkStaleManifest(n, a, o)
                        }, t[Ne] = function (t, r) {
                            rt("Level updated", r);
                            var i = r.details, n = i.live, a = i.totalduration;
                            e.live = n, e.levelDuration = a;
                            var o = e.getSeekRange(), s = Math.abs(e.dvrEnd - o.end) > 1;
                            "DVR" === e.streamType && s && e.updateDvrPosition(o), n && e.state === he.nb && e.livePause()
                        }, t[Me] = function (t, r) {
                            rt("Level PTS updated", r), e.levelDuration = r.details.totalduration
                        }, t[Ue] = function (e, t) {
                            rt("Frag changed", t)
                        }, t[Be] = function (t, r) {
                            rt("Level changed", r);
                            var i = r.level, n = e.hlsjs.levels[i];
                            i !== e.currentHlsjsLevel ? (rt("Level switch complete", i, n), e.setCurrentLevel(i)) : e.checkAdaptation(i)
                        }, t[je] = function (t, r) {
                            rt("Frag metadata parsed", r);
                            var i = e.hlsjs.levels[r.frag.level], a = i ? i.details : null,
                                o = a ? Object(n.l)(a.fragments, function (e) {
                                    return e.sn === r.frag.sn
                                }) : null;
                            Object(n.i)(r.samples, function (t) {
                                var r = t.unit, i = t.data, d = t.pts, c = function (e) {
                                    for (var t = 0, r = 0, i = 10, n = []; t + l < e.length;) {
                                        var a = Object(s.c)(e.subarray(t, t += 3));
                                        if ("ID3" === a) {
                                            var o = e.subarray(t, t += 2), d = e.subarray(t, t += 1)[0];
                                            if (0 != (128 & d) || o[0] < 3) break;
                                            var c = Object(s.b)(e.subarray(t, t += 4));
                                            0 != (64 & d) && (i += Object(s.b)(e.subarray(t, t += 4))), n = n.concat(u(e, r + i, c)), t += c
                                        } else {
                                            if ("3DI" !== a) {
                                                t -= 3;
                                                break
                                            }
                                            t += 7
                                        }
                                        r = t
                                    }
                                    return {position: t, cues: n}
                                }(r || i).cues;
                                if (c) {
                                    var f = Object(s.a)(c);
                                    if (f) if (a) if (o) if (o.endPTS) {
                                        var h = Math.max(d, 0),
                                            p = Ae(h, o.endPTS, JSON.stringify(Object(n.j)({metadataType: "id3"}, f)));
                                        e.addVTTCue({type: "metadata", cue: p}) && e.trigger(he.L, {
                                            metadataType: "id3",
                                            metadataTime: h,
                                            metadata: f
                                        })
                                    } else it("No endPTS found for matching ID3 fragment"); else it("No matching fragment found for ID3 level"); else {
                                        if (f.PRIV && "com.apple.streaming.transportStreamTimestamp" in f.PRIV) return;
                                        it("No matching level found for ID3 metadata")
                                    } else it("No metadata found in the ID3 cues")
                                } else it("No cues found in ID3 byte array")
                            })
                        }, t[Ge] = function (e, t) {
                            rt("Buffer appending", t)
                        }, t[Ke] = function (t, r) {
                            var i = e.video.buffered.length;
                            rt("Buffer appended", r, e.state, i, i && e.video.buffered.end(i - 1)), e.atEdgeOfLiveStream() || e.stopStaleTimeout(), e.recoveringNetworkError && (e.resetRecovery(), e.recoveringNetworkError = !1)
                        }, t[He] = function (t, r) {
                            if (!r.audio || !e.videoFound) {
                                var i = r.video ? "video" : "audio";
                                e.videoFound = e.videoFound || "video" === i, rt("Media Type", i), e.trigger(he.T, {mediaType: i})
                            }
                        }, t[Ve] = function (t, r) {
                            rt("Frag buffered", r);
                            var i = r.frag;
                            (i.tagList || []).forEach(function (t) {
                                var r = Ee(t, 2), n = r[0], a = r[1], o = function (e, t, r) {
                                    var i = Math.max(r.startPTS, 0);
                                    switch (e) {
                                        case"PROGRAM-DATE-TIME":
                                            return {
                                                metadataType: "program-date-time",
                                                programDateTime: t,
                                                start: i,
                                                end: Math.max(r.endPTS || 0, i)
                                            };
                                        case"EXT-X-DATERANGE":
                                            var n = {}, a = t.split(",").map(function (e) {
                                                var t = e.split("="), r = t[0], i = (t[1] || "").replace(/^"|"$/g, "");
                                                return n[r] = i, {name: r, value: i}
                                            }), o = n["START-DATE"], s = n["END-DATE"], l = i;
                                            r.programDateTime && (l += (new Date(o) - new Date(r.programDateTime)) / 1e3);
                                            var u = parseFloat(n["PLANNED-DURATION"] || n.DURATION) || 0;
                                            return !u && s && (u = (new Date(s) - new Date(o)) / 1e3), {
                                                metadataType: "date-range",
                                                tag: e,
                                                content: t,
                                                attributes: a,
                                                start: l,
                                                end: l + u,
                                                startDate: o,
                                                endDate: s,
                                                duration: u
                                            };
                                        case"EXT-X-CUE-IN":
                                        case"EXT-X-CUE-OUT":
                                            return {
                                                metadataType: "scte-35",
                                                tag: e,
                                                content: t,
                                                start: i,
                                                end: i + (parseFloat(t) || 0)
                                            };
                                        default:
                                            return null
                                    }
                                }(n, a, i);
                                if (o) {
                                    var s = Ae(o.start, o.end, JSON.stringify(o)),
                                        l = "".concat(i.sn, "_").concat(n, "_").concat(a);
                                    if (e.addVTTCue({type: "metadata", cue: s}, l)) {
                                        var u = o.metadataType;
                                        delete o.metadataType, e.trigger(he.L, {metadataType: u, metadata: o})
                                    }
                                }
                            })
                        }, t[We] = function (e, t) {
                            rt("Key loading", t)
                        }, t[Ye] = function (e, t) {
                            rt("Subtitle tracks updated", t)
                        }, this.renderNatively || (t[qe] = function (t, r) {
                            rt("Externally managed text track found", r), e.addTextTracks(r.tracks)
                        }, t[Xe] = function (t, r) {
                            rt("Externally managed VTTCues found", r), r.cues.forEach(function (t) {
                                e.addVTTCue({type: r.type, cue: t, track: r.track})
                            })
                        }), t[ze] = function (t, r) {
                            rt("Audio tracks updated");
                            var i = r.audioTracks, a = e.hlsjs.levels, o = e.getCurrentHlsjsLevel();
                            i && i.length && (e.currentAudioTrackIndex = null, e.audioTracksMap = function (e) {
                                return Object(n.F)(e, function (e, t, r) {
                                    var i = t.groupId;
                                    return e[i] = e[i] || [], e[i].push({
                                        autoselect: t.autoselect,
                                        defaulttrack: t.default,
                                        groupid: i,
                                        language: t.lang,
                                        name: t.name,
                                        hlsjsIndex: r
                                    }), e
                                }, {})
                            }(i), e.updateAudioTrack(a[o]))
                        }, t[Je] = function (t, r) {
                            var i = function (e) {
                                var t = e.details, r = e.response, i = e.type, n = e.fatal, a = Q.indexOf(t) < 0,
                                    o = $.indexOf(t) >= 0, s = Z.indexOf(t) >= 0, l = k.o, u = j;
                                switch (t) {
                                    case L:
                                        u = H;
                                        break;
                                    case D:
                                        u = V;
                                        break;
                                    case O:
                                        l = k.n, u = W;
                                        break;
                                    case I:
                                        u = Y;
                                        break;
                                    case C:
                                        u = q;
                                        break;
                                    case x:
                                        u = X;
                                        break;
                                    case P:
                                        u = z;
                                        break;
                                    case F:
                                        u = J;
                                        break;
                                    default:
                                        if (i === w) if (navigator.onLine) {
                                            if (/TimeOut$/.test(t)) u = j + 1001 + ee(t); else if (r) {
                                                var d = Object(R.b)(j, r.code, e.url, r.text);
                                                u = d.code, l = d.key, u += ee(t)
                                            }
                                        } else a = !1, s = !1, u = (n = "manifestLoadError" === t) ? G : K, l = k.l
                                }
                                return {key: l, code: u, recoverable: a, stalling: o, suppressLevel: s, fatal: n, error: e}
                            }(r), n = r.type, a = i.key;
                            if (it(i), "DVR" === e.streamType && n === Ze) {
                                var o = e.getSeekRange();
                                e.updateDvrPosition(o)
                            }
                            if (i.suppressLevel) {
                                var s = r.context || r, l = s.level, u = s.urlId, d = void 0 === u ? 0 : u;
                                return e.hlsjs.removeLevel(l, d), e.hlsjs.levels.length ? (e.jwLevels = h(e.hlsjs.levels, e.jwConfig.qualityLabels), e.hlsjs.currentLevel = 0, e.hlsjs.currentLevel = -1, void e.trigger(he.I, {
                                    levels: e.jwLevels,
                                    currentQuality: 0
                                })) : void e.handleError(i.code, r, a)
                            }
                            if (i.fatal) {
                                var c = Object(pe.a)();
                                (i.recoverable && n === Ze || n === $e) && e.retryCount < e.maxRetries ? c >= e.lastRecoveryTime + e.recoveryInterval ? (it("Attempting to recover, retry count:", e.retryCount), n === Ze ? (e.recoveringNetworkError = !0, e.hlsjs.startLoad()) : n === $e && (e.recoveringMediaError = !0, e.hlsjs.recoverMediaError()), e.retryCount += 1, e.lastRecoveryTime = c) : it("Recovery not attempted - too little time between attempts", c - e.lastRecoveryTime) : e.handleError(i.code, r, a)
                            }
                        }, t
                    }
                }, {
                    key: "eventsOn_", value: function () {
                        var e = this.bandwidthMonitor, t = this.eventHandler;
                        rt("eventsOn_"), t.on(), e.start()
                    }
                }, {
                    key: "eventsOff_", value: function () {
                        var e = this.bandwidthMonitor, t = this.eventHandler, r = this.hlsjs;
                        rt("eventsOff_"), r && (this.disableTextTrack(), this.lastPosition = this.video.currentTime, r.detachMedia(), t.off()), this.off(null, null, this), e.stop(), this.resetLifecycleVariables()
                    }
                }, {
                    key: "handleError", value: function (e, t, r) {
                        this.resetLifecycleVariables(), this.trigger(he.G, new k.s(r, e, t))
                    }
                }, {
                    key: "destroy", value: function () {
                        this.hlsjs && (this.eventsOff_(), this.hlsjs.destroy(), this.hlsjs = null, rt("Hlsjs destroyed"))
                    }
                }, {
                    key: "stopStaleTimeout", value: function () {
                        clearTimeout(this.staleManifestTimeout), this.staleManifestTimeout = null
                    }
                }, {
                    key: "startConnectionTimeout", value: function () {
                        var e = this;
                        this.connectionTimeout || (this.connectionTimeout = setTimeout(function () {
                            if (navigator.onLine) return e.stopConnectionTimeout(), void e.hlsjs.startLoad();
                            e.handleError(K, null, k.l)
                        }, this.connectionTimeoutDuration))
                    }
                }, {
                    key: "stopConnectionTimeout", value: function () {
                        clearTimeout(this.connectionTimeout), this.connectionTimeout = null
                    }
                }, {
                    key: "restoreVideoProperties", value: function () {
                        this.savedVideoProperties && (this.volume(this.jwConfig.volume), this.mute(this.jwConfig.mute), this.savedVideoProperties = !1)
                    }
                }, {
                    key: "resetRecovery", value: function () {
                        this.retryCount = 0
                    }
                }, {
                    key: "checkStaleManifest", value: function (e, t, r) {
                        var i = this,
                            n = null !== this.jwConfig.liveTimeout ? this.jwConfig.liveTimeout : this.staleManifestDurationMultiplier * r;
                        0 !== n && (t && this.lastEndSn === e ? this.staleManifestTimeout || (this.staleManifestTimeout = setTimeout(function () {
                            i.checkStreamEnded()
                        }, n)) : this.stopStaleTimeout(), this.lastEndSn = e, this.live = t)
                    }
                }, {
                    key: "checkStreamEnded", value: function () {
                        (this.video.ended || this.atEdgeOfLiveStream()) && this.handleError(230001, null, k.p)
                    }
                }, {
                    key: "resetLifecycleVariables", value: function () {
                        this.resetRecovery(), this.stopStaleTimeout(), this.stopConnectionTimeout(), this.streamBitrate = 0, this.videoFound = !1, this.videoHeight = 0, this.src = null, this.currentHlsjsLevel = null, this.currentJwItem = null, this.jwLevels = null, this.lastRecoveryTime = null, this.lastEndSn = null, this.levelDuration = 0, this.live = !1, this.livePaused = !1, this.recoveringMediaError = !1, this.recoveringNetworkError = !1, this.staleManifestTimeout = null, this.streamType = "VOD"
                    }
                }, {
                    key: "setCurrentLevel", value: function (e) {
                        this.currentHlsjsLevel = e, this.checkAdaptation(e), this.updateAudioTrack(this.hlsjs.levels[e])
                    }
                }, {
                    key: "_clearNonNativeCues", value: function () {
                        var e = this;
                        !this.renderNatively && this._textTracks && this._textTracks.forEach(function (t) {
                            e.clearCueData(t._id)
                        })
                    }
                }, {
                    key: "maxBufferLength", set: function (e) {
                        this.hlsjs && (this.hlsjs.config.maxMaxBufferLength = e)
                    }
                }]) && be(r.prototype, i), a && be(r, a), t
            }(), tt = function () {
                return {name: "hlsjs"}
            }, rt = function () {
                var e;
                window.jwplayer.debug && (e = console).info.apply(e, arguments)
            }, it = function () {
                var e;
                window.jwplayer.debug && (e = console).warn.apply(e, arguments)
            }, nt = function (e) {
                return !(!fe.OS.iOS && !fe.Browser.safari) || fe.Browser.chrome && e
            }, at = function (e, t, r) {
                var i = e.sources[0];
                return void 0 !== i[r] ? i[r] : void 0 !== e[r] ? e[r] : t[r]
            }
    }, 62: function (e, t, r) {
        "use strict";
        r.d(t, "a", function () {
            return n
        });
        var i = r(2);

        function n(e) {
            var t = [], r = (e = Object(i.h)(e)).split("\r\n\r\n");
            1 === r.length && (r = e.split("\n\n"));
            for (var n = 0; n < r.length; n++) if ("WEBVTT" !== r[n]) {
                var o = a(r[n]);
                o.text && t.push(o)
            }
            return t
        }

        function a(e) {
            var t = {}, r = e.split("\r\n");
            1 === r.length && (r = e.split("\n"));
            var n = 1;
            if (r[0].indexOf(" --\x3e ") > 0 && (n = 0), r.length > n + 1 && r[n + 1]) {
                var a = r[n], o = a.indexOf(" --\x3e ");
                o > 0 && (t.begin = Object(i.f)(a.substr(0, o)), t.end = Object(i.f)(a.substr(o + 5)), t.text = r.slice(n + 1).join("\r\n"))
            }
            return t
        }
    }, 66: function (e, t, r) {
        "use strict";
        var i = window.VTTCue;

        function n(e) {
            if ("string" != typeof e) return !1;
            return !!{start: !0, middle: !0, end: !0, left: !0, right: !0}[e.toLowerCase()] && e.toLowerCase()
        }

        if (!i) {
            (i = function (e, t, r) {
                var i = this;
                i.hasBeenReset = !1;
                var a = "", o = !1, s = e, l = t, u = r, d = null, c = "", f = !0, h = "auto", p = "start", g = "auto",
                    v = 100, y = "middle";
                Object.defineProperty(i, "id", {
                    enumerable: !0, get: function () {
                        return a
                    }, set: function (e) {
                        a = "" + e
                    }
                }), Object.defineProperty(i, "pauseOnExit", {
                    enumerable: !0, get: function () {
                        return o
                    }, set: function (e) {
                        o = !!e
                    }
                }), Object.defineProperty(i, "startTime", {
                    enumerable: !0, get: function () {
                        return s
                    }, set: function (e) {
                        if ("number" != typeof e) throw new TypeError("Start time must be set to a number.");
                        s = e, this.hasBeenReset = !0
                    }
                }), Object.defineProperty(i, "endTime", {
                    enumerable: !0, get: function () {
                        return l
                    }, set: function (e) {
                        if ("number" != typeof e) throw new TypeError("End time must be set to a number.");
                        l = e, this.hasBeenReset = !0
                    }
                }), Object.defineProperty(i, "text", {
                    enumerable: !0, get: function () {
                        return u
                    }, set: function (e) {
                        u = "" + e, this.hasBeenReset = !0
                    }
                }), Object.defineProperty(i, "region", {
                    enumerable: !0, get: function () {
                        return d
                    }, set: function (e) {
                        d = e, this.hasBeenReset = !0
                    }
                }), Object.defineProperty(i, "vertical", {
                    enumerable: !0, get: function () {
                        return c
                    }, set: function (e) {
                        var t = function (e) {
                            return "string" == typeof e && !!{
                                "": !0,
                                lr: !0,
                                rl: !0
                            }[e.toLowerCase()] && e.toLowerCase()
                        }(e);
                        if (!1 === t) throw new SyntaxError("An invalid or illegal string was specified.");
                        c = t, this.hasBeenReset = !0
                    }
                }), Object.defineProperty(i, "snapToLines", {
                    enumerable: !0, get: function () {
                        return f
                    }, set: function (e) {
                        f = !!e, this.hasBeenReset = !0
                    }
                }), Object.defineProperty(i, "line", {
                    enumerable: !0, get: function () {
                        return h
                    }, set: function (e) {
                        if ("number" != typeof e && "auto" !== e) throw new SyntaxError("An invalid number or illegal string was specified.");
                        h = e, this.hasBeenReset = !0
                    }
                }), Object.defineProperty(i, "lineAlign", {
                    enumerable: !0, get: function () {
                        return p
                    }, set: function (e) {
                        var t = n(e);
                        if (!t) throw new SyntaxError("An invalid or illegal string was specified.");
                        p = t, this.hasBeenReset = !0
                    }
                }), Object.defineProperty(i, "position", {
                    enumerable: !0, get: function () {
                        return g
                    }, set: function (e) {
                        if (e < 0 || e > 100) throw new Error("Position must be between 0 and 100.");
                        g = e, this.hasBeenReset = !0
                    }
                }), Object.defineProperty(i, "size", {
                    enumerable: !0, get: function () {
                        return v
                    }, set: function (e) {
                        if (e < 0 || e > 100) throw new Error("Size must be between 0 and 100.");
                        v = e, this.hasBeenReset = !0
                    }
                }), Object.defineProperty(i, "align", {
                    enumerable: !0, get: function () {
                        return y
                    }, set: function (e) {
                        var t = n(e);
                        if (!t) throw new SyntaxError("An invalid or illegal string was specified.");
                        y = t, this.hasBeenReset = !0
                    }
                }), i.displayState = void 0
            }).prototype.getCueAsHTML = function () {
                return window.WebVTT.convertCueToDOMTree(window, this.text)
            }
        }
        t.a = i
    }, 68: function (e, t, r) {
        "use strict";

        function i(e, t) {
            var r = e.kind || "cc";
            return e.default || e.defaulttrack ? "default" : e._id || e.file || r + t
        }

        function n(e, t) {
            var r = e.label || e.name || e.language;
            return r || (r = "Unknown CC", (t += 1) > 1 && (r += " [" + t + "]")), {label: r, unknownCount: t}
        }

        r.d(t, "a", function () {
            return i
        }), r.d(t, "b", function () {
            return n
        })
    }, 69: function (e, t, r) {
        "use strict";
        var i = r(66), n = r(10), a = r(27), o = r(4), s = r(62), l = r(2), u = r(1);

        function d(e) {
            throw new u.s(null, e)
        }

        function c(e, t, i) {
            e.xhr = Object(a.a)(e.file, function (a) {
                !function (e, t, i, a) {
                    var c, f, p = e.responseXML ? e.responseXML.firstChild : null;
                    if (p) for ("xml" === Object(o.b)(p) && (p = p.nextSibling); p.nodeType === p.COMMENT_NODE;) p = p.nextSibling;
                    try {
                        if (p && "tt" === Object(o.b)(p)) c = function (e) {
                            e || d(306007);
                            var t = [], r = e.getElementsByTagName("p"), i = 30, n = e.getElementsByTagName("tt");
                            if (n && n[0]) {
                                var a = parseFloat(n[0].getAttribute("ttp:frameRate"));
                                isNaN(a) || (i = a)
                            }
                            r || d(306005), r.length || (r = e.getElementsByTagName("tt:p")).length || (r = e.getElementsByTagName("tts:p"));
                            for (var o = 0; o < r.length; o++) {
                                for (var s = r[o], u = s.getElementsByTagName("br"), c = 0; c < u.length; c++) {
                                    var f = u[c];
                                    f.parentNode.replaceChild(e.createTextNode("\r\n"), f)
                                }
                                var h = s.innerHTML || s.textContent || s.text || "",
                                    p = Object(l.h)(h).replace(/>\s+</g, "><").replace(/(<\/?)tts?:/g, "$1").replace(/<br.*?\/>/g, "\r\n");
                                if (p) {
                                    var g = s.getAttribute("begin"), v = s.getAttribute("dur"),
                                        y = s.getAttribute("end"), m = {begin: Object(l.f)(g, i), text: p};
                                    y ? m.end = Object(l.f)(y, i) : v && (m.end = m.begin + Object(l.f)(v, i)), t.push(m)
                                }
                            }
                            return t.length || d(306005), t
                        }(e.responseXML), f = h(c), delete t.xhr, i(f); else {
                            var g = e.responseText;
                            g.indexOf("WEBVTT") >= 0 ? r.e(17).then(function (e) {
                                return r(132).default
                            }.bind(null, r)).catch(Object(n.c)(301131)).then(function (e) {
                                var r = new e(window);
                                f = [], r.oncue = function (e) {
                                    f.push(e)
                                }, r.onflush = function () {
                                    delete t.xhr, i(f)
                                }, r.parse(g)
                            }).catch(function (e) {
                                delete t.xhr, a(Object(u.A)(null, u.b, e))
                            }) : (c = Object(s.a)(g), f = h(c), delete t.xhr, i(f))
                        }
                    } catch (e) {
                        delete t.xhr, a(Object(u.A)(null, u.b, e))
                    }
                }(a, e, t, i)
            }, function (e, t, r, n) {
                i(Object(u.z)(n, u.b))
            })
        }

        function f(e) {
            e && e.forEach(function (e) {
                var t = e.xhr;
                t && (t.onload = null, t.onreadystatechange = null, t.onerror = null, "abort" in t && t.abort()), delete e.xhr
            })
        }

        function h(e) {
            return e.map(function (e) {
                return new i.a(e.begin, e.end, e.text)
            })
        }

        r.d(t, "c", function () {
            return c
        }), r.d(t, "a", function () {
            return f
        }), r.d(t, "b", function () {
            return h
        })
    }, 70: function (e, t, r) {
        "use strict";

        function i(e, t) {
            return e !== 1 / 0 && Math.abs(e) >= Math.max(a(t), 0)
        }

        function n(e, t) {
            var r = "VOD";
            return e === 1 / 0 ? r = "LIVE" : e < 0 && (r = i(e, a(t)) ? "DVR" : "LIVE"), r
        }

        function a(e) {
            return void 0 === e ? 120 : Math.max(e, 0)
        }

        r.d(t, "a", function () {
            return i
        }), r.d(t, "b", function () {
            return n
        })
    }, 72: function (e, t, r) {
        "use strict";

        function i(e) {
            return new Promise(function (t, r) {
                if (e.paused) return r(n("NotAllowedError", 0, "play() failed."));
                var i = function () {
                    e.removeEventListener("play", a), e.removeEventListener("playing", o), e.removeEventListener("pause", o), e.removeEventListener("abort", o), e.removeEventListener("error", o)
                }, a = function () {
                    e.addEventListener("playing", o), e.addEventListener("abort", o), e.addEventListener("error", o), e.addEventListener("pause", o)
                }, o = function (e) {
                    if (i(), "playing" === e.type) t(); else {
                        var a = 'The play() request was interrupted by a "'.concat(e.type, '" event.');
                        "error" === e.type ? r(n("NotSupportedError", 9, a)) : r(n("AbortError", 20, a))
                    }
                };
                e.addEventListener("play", a)
            })
        }

        function n(e, t, r) {
            var i = new Error(r);
            return i.name = e, i.code = t, i
        }

        r.d(t, "a", function () {
            return i
        })
    }, 74: function (e, t, r) {
        "use strict";
        r.d(t, "c", function () {
            return n
        }), r.d(t, "b", function () {
            return a
        }), r.d(t, "a", function () {
            return o
        });
        var i = {TIT2: "title", TT2: "title", WXXX: "url", TPE1: "artist", TP1: "artist", TALB: "album", TAL: "album"};

        function n(e, t) {
            for (var r, i, n, a = e.length, o = "", s = t || 0; s < a;) if (0 !== (r = e[s++]) && 3 !== r) switch (r >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    o += String.fromCharCode(r);
                    break;
                case 12:
                case 13:
                    i = e[s++], o += String.fromCharCode((31 & r) << 6 | 63 & i);
                    break;
                case 14:
                    i = e[s++], n = e[s++], o += String.fromCharCode((15 & r) << 12 | (63 & i) << 6 | (63 & n) << 0)
            }
            return o
        }

        function a(e) {
            var t = function (e) {
                for (var t = "0x", r = 0; r < e.length; r++) e[r] < 16 && (t += "0"), t += e[r].toString(16);
                return parseInt(t)
            }(e);
            return 127 & t | (32512 & t) >> 1 | (8323072 & t) >> 2 | (2130706432 & t) >> 3
        }

        function o() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).reduce(function (e, t) {
                if (!("value" in t) && "data" in t && t.data instanceof ArrayBuffer) {
                    var r = new Uint8Array(t.data), o = r.length;
                    t = {value: {key: "", data: ""}};
                    for (var s = 10; s < 14 && s < r.length && 0 !== r[s];) t.value.key += String.fromCharCode(r[s]), s++;
                    var l = 19, u = r[l];
                    3 !== u && 0 !== u || (u = r[++l], o--);
                    var d = 0;
                    if (1 !== u && 2 !== u) for (var c = l + 1; c < o; c++) if (0 === r[c]) {
                        d = c - l;
                        break
                    }
                    if (d > 0) {
                        var f = n(r.subarray(l, l += d), 0);
                        if ("PRIV" === t.value.key) {
                            if ("com.apple.streaming.transportStreamTimestamp" === f) {
                                var h = 1 & a(r.subarray(l, l += 4)),
                                    p = a(r.subarray(l, l += 4)) + (h ? 4294967296 : 0);
                                t.value.data = p
                            } else t.value.data = n(r, l + 1);
                            t.value.info = f
                        } else t.value.info = f, t.value.data = n(r, l + 1)
                    } else {
                        var g = r[l];
                        t.value.data = 1 === g || 2 === g ? function (e, t) {
                            for (var r = e.length - 1, i = "", n = t || 0; n < r;) 254 === e[n] && 255 === e[n + 1] || (i += String.fromCharCode((e[n] << 8) + e[n + 1])), n += 2;
                            return i
                        }(r, l + 1) : n(r, l + 1)
                    }
                }
                if (i.hasOwnProperty(t.value.key) && (e[i[t.value.key]] = t.value.data), t.value.info) {
                    var v = e[t.value.key];
                    v !== Object(v) && (v = {}, e[t.value.key] = v), v[t.value.info] = t.value.data
                } else e[t.value.key] = t.value.data;
                return e
            }, {})
        }
    }, 77: function (e, t, r) {
        "use strict";
        var i = r(69), n = r(68), a = r(74), o = r(6), s = r(3), l = r(0), u = {
            _itemTracks: null,
            _textTracks: null,
            _tracksById: null,
            _cuesByTrackId: null,
            _cachedVTTCues: null,
            _metaCuesByTextTime: null,
            _currentTextTrackIndex: -1,
            _unknownCount: 0,
            _activeCues: null,
            _initTextTracks: function () {
                this._textTracks = [], this._tracksById = {}, this._metaCuesByTextTime = {}, this._cuesByTrackId = {}, this._cachedVTTCues = {}, this._unknownCount = 0
            },
            addTracksListener: function (e, t, r) {
                if (!e) return;
                if (d(e, t, r), this.instreamMode) return;
                e.addEventListener ? e.addEventListener(t, r) : e["on" + t] = r
            },
            clearTracks: function () {
                Object(i.a)(this._itemTracks);
                var e = this._tracksById && this._tracksById.nativemetadata;
                (this.renderNatively || e) && (h(this.renderNatively, this.video.textTracks), e && (e.oncuechange = null));
                this._itemTracks = null, this._textTracks = null, this._tracksById = null, this._cuesByTrackId = null, this._metaCuesByTextTime = null, this._unknownCount = 0, this._currentTextTrackIndex = -1, this._activeCues = null, this.renderNatively && (this.removeTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), h(this.renderNatively, this.video.textTracks))
            },
            clearMetaCues: function () {
                var e = this._tracksById && this._tracksById.nativemetadata;
                e && (h(this.renderNatively, [e]), e.mode = "hidden", e.inuse = !0, this._cachedVTTCues[e._id] = {})
            },
            clearCueData: function (e) {
                var t = this._cachedVTTCues;
                t && t[e] && (t[e] = {}, this._tracksById && (this._tracksById[e].data = []))
            },
            disableTextTrack: function () {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    if (e) {
                        e.mode = "disabled";
                        var t = e._id;
                        t && 0 === t.indexOf("nativecaptions") && (e.mode = "hidden")
                    }
                }
            },
            enableTextTrack: function () {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    e && (e.mode = "showing")
                }
            },
            getSubtitlesTrack: function () {
                return this._currentTextTrackIndex
            },
            removeTracksListener: d,
            addTextTracks: c,
            setTextTracks: function (e) {
                if (this._currentTextTrackIndex = -1, !e) return;
                this._textTracks ? (this._unknownCount = 0, this._textTracks = this._textTracks.filter(function (e) {
                    var t = e._id;
                    return this.renderNatively && t && 0 === t.indexOf("nativecaptions") ? (delete this._tracksById[t], !1) : (e.name && 0 === e.name.indexOf("Unknown") && this._unknownCount++, !0)
                }, this), delete this._tracksById.nativemetadata) : this._initTextTracks();
                if (e.length) for (var t = 0, r = e.length; t < r; t++) {
                    var i = e[t];
                    if (!i._id) {
                        if ("captions" === i.kind || "metadata" === i.kind) {
                            if (i._id = "native" + i.kind + t, !i.label && "captions" === i.kind) {
                                var a = Object(n.b)(i, this._unknownCount);
                                i.name = a.label, this._unknownCount = a.unknownCount
                            }
                        } else i._id = Object(n.a)(i, this._textTracks.length);
                        if (this._tracksById[i._id]) continue;
                        i.inuse = !0
                    }
                    if (i.inuse && !this._tracksById[i._id]) if ("metadata" === i.kind) i.mode = "hidden", i.oncuechange = y.bind(this), this._tracksById[i._id] = i; else if (p(i.kind)) {
                        var s = i.mode, u = void 0;
                        if (i.mode = "hidden", !i.cues.length && i.embedded) continue;
                        if (i.mode = s, this._cuesByTrackId[i._id] && !this._cuesByTrackId[i._id].loaded) {
                            for (var d = this._cuesByTrackId[i._id].cues; u = d.shift();) f(this.renderNatively, i, u);
                            i.mode = s, this._cuesByTrackId[i._id].loaded = !0
                        }
                        v.call(this, i)
                    }
                }
                this.renderNatively && (this.textTrackChangeHandler = this.textTrackChangeHandler || function () {
                    var e = this.video.textTracks, t = Object(l.k)(e, function (e) {
                        return (e.inuse || !e._id) && p(e.kind)
                    });
                    if (!this._textTracks || function (e) {
                        if (e.length > this._textTracks.length) return !0;
                        for (var t = 0; t < e.length; t++) {
                            var r = e[t];
                            if (!r._id || !this._tracksById[r._id]) return !0
                        }
                        return !1
                    }.call(this, t)) return void this.setTextTracks(e);
                    for (var r = -1, i = 0; i < this._textTracks.length; i++) if ("showing" === this._textTracks[i].mode) {
                        r = i;
                        break
                    }
                    r !== this._currentTextTrackIndex && this.setSubtitlesTrack(r + 1)
                }.bind(this), this.addTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), (o.Browser.edge || o.Browser.firefox || o.Browser.safari) && (this.addTrackHandler = this.addTrackHandler || function () {
                    this.setTextTracks(this.video.textTracks)
                }.bind(this), this.addTracksListener(this.video.textTracks, "addtrack", this.addTrackHandler)));
                this._textTracks.length && this.trigger("subtitlesTracks", {tracks: this._textTracks})
            },
            setupSideloadedTracks: function (e) {
                if (!this.renderNatively) return;
                var t = e === this._itemTracks;
                t || Object(i.a)(this._itemTracks);
                if (this._itemTracks = e, !e) return;
                t || (this.disableTextTrack(), function () {
                    if (!this._textTracks) return;
                    var e = this._textTracks.filter(function (e) {
                        return e.embedded || "subs" === e.groupid
                    });
                    this._initTextTracks(), e.forEach(function (e) {
                        this._tracksById[e._id] = e
                    }), this._textTracks = e
                }.call(this), this.addTextTracks(e))
            },
            setSubtitlesTrack: function (e) {
                if (!this.renderNatively) return void(this.setCurrentSubtitleTrack && this.setCurrentSubtitleTrack(e - 1));
                if (!this._textTracks) return;
                0 === e && this._textTracks.forEach(function (e) {
                    e.mode = e.embedded ? "hidden" : "disabled"
                });
                if (this._currentTextTrackIndex === e - 1) return;
                this.disableTextTrack(), this._currentTextTrackIndex = e - 1, this._textTracks[this._currentTextTrackIndex] && (this._textTracks[this._currentTextTrackIndex].mode = "showing");
                this.trigger("subtitlesTrackChanged", {
                    currentTrack: this._currentTextTrackIndex + 1,
                    tracks: this._textTracks
                })
            },
            textTrackChangeHandler: null,
            addTrackHandler: null,
            addCuesToTrack: function (e) {
                var t = this._tracksById[e.name];
                if (!t) return;
                t.source = e.source;
                for (var r = e.captions || [], n = [], a = !1, o = 0; o < r.length; o++) {
                    var s = r[o], l = e.name + "_" + s.begin + "_" + s.end;
                    this._metaCuesByTextTime[l] || (this._metaCuesByTextTime[l] = s, n.push(s), a = !0)
                }
                a && n.sort(function (e, t) {
                    return e.begin - t.begin
                });
                var u = Object(i.b)(n);
                Array.prototype.push.apply(t.data, u)
            },
            addCaptionsCue: function (e) {
                if (!e.text || !e.begin || !e.end) return;
                var t, r = e.trackid.toString(), n = this._tracksById && this._tracksById[r];
                n || (n = {
                    kind: "captions",
                    _id: r,
                    data: []
                }, this.addTextTracks([n]), this.trigger("subtitlesTracks", {tracks: this._textTracks}));
                e.useDTS && (n.source || (n.source = e.source || "mpegts"));
                t = e.begin + "_" + e.text;
                var a = this._metaCuesByTextTime[t];
                if (!a) {
                    a = {begin: e.begin, end: e.end, text: e.text}, this._metaCuesByTextTime[t] = a;
                    var o = Object(i.b)([a])[0];
                    n.data.push(o)
                }
            },
            addVTTCue: function (e, t) {
                this._tracksById || this._initTextTracks();
                var r = e.track ? e.track : "native" + e.type, i = this._tracksById[r],
                    n = "captions" === e.type ? "Unknown CC" : "ID3 Metadata", a = e.cue;
                if (!i) {
                    var o = {kind: e.type, _id: r, label: n, embedded: !0};
                    i = g.call(this, o), this.renderNatively || "metadata" === i.kind ? this.setTextTracks(this.video.textTracks) : c.call(this, [i])
                }
                if (function (e, t, r) {
                    var i = e.kind;
                    this._cachedVTTCues[e._id] || (this._cachedVTTCues[e._id] = {});
                    var n, a = this._cachedVTTCues[e._id];
                    switch (i) {
                        case"captions":
                        case"subtitles":
                            n = r || Math.floor(20 * t.startTime);
                            var o = "_" + t.line, s = Math.floor(20 * t.endTime),
                                l = a[n + o] || a[n + 1 + o] || a[n - 1 + o];
                            return !(l && Math.abs(l - s) <= 1) && (a[n + o] = s, !0);
                        case"metadata":
                            var u = t.data ? new Uint8Array(t.data).join("") : t.text;
                            return n = r || t.startTime + u, a[n] ? !1 : (a[n] = t.endTime, !0);
                        default:
                            return !1
                    }
                }.call(this, i, a, t)) return this.renderNatively || "metadata" === i.kind ? f(this.renderNatively, i, a) : i.data.push(a), a;
                return null
            },
            addVTTCuesToTrack: function (e, t) {
                if (!this.renderNatively) return;
                var r, i = this._tracksById[e._id];
                if (!i) return this._cuesByTrackId || (this._cuesByTrackId = {}), void(this._cuesByTrackId[e._id] = {
                    cues: t,
                    loaded: !1
                });
                if (this._cuesByTrackId[e._id] && this._cuesByTrackId[e._id].loaded) return;
                this._cuesByTrackId[e._id] = {cues: t, loaded: !0};
                for (; r = t.shift();) f(this.renderNatively, i, r)
            },
            triggerActiveCues: function (e) {
                var t = this;
                if (!e || !e.length) return void(this._activeCues = null);
                var r = this._activeCues || [], i = Array.prototype.filter.call(e, function (e) {
                    if (r.some(function (t) {
                        return i = t, (r = e).startTime === i.startTime && r.endTime === i.endTime && r.text === i.text && r.data === i.data && r.value === i.value;
                        var r, i
                    })) return !1;
                    if (e.data || e.value) return !0;
                    if (e.text) {
                        var i = JSON.parse(e.text), n = e.startTime, a = {metadataTime: n, metadata: i};
                        i.programDateTime && (a.programDateTime = i.programDateTime), i.metadataType && (a.metadataType = i.metadataType, delete i.metadataType), t.trigger(s.K, a)
                    }
                    return !1
                });
                if (i.length) {
                    var n = Object(a.a)(i), o = i[0].startTime;
                    this.trigger(s.K, {metadataType: "id3", metadataTime: o, metadata: n})
                }
                this._activeCues = Array.prototype.slice.call(e)
            },
            renderNatively: !1
        };

        function d(e, t, r) {
            e && (e.removeEventListener ? e.removeEventListener(t, r) : e["on" + t] = null)
        }

        function c(e) {
            var t = this;
            e && (this._textTracks || this._initTextTracks(), e.forEach(function (e) {
                if (!e.kind || p(e.kind)) {
                    var r = g.call(t, e);
                    v.call(t, r), e.file && (e.data = [], Object(i.c)(e, function (e) {
                        t.addVTTCuesToTrack(r, e)
                    }, function (e) {
                        t.trigger(s.ub, e)
                    }))
                }
            }), this._textTracks && this._textTracks.length && this.trigger("subtitlesTracks", {tracks: this._textTracks}))
        }

        function f(e, t, r) {
            var i = r;
            o.Browser.ie && e && (i = new window.TextTrackCue(r.startTime, r.endTime, r.text)), o.Browser.ie ? function (e, t) {
                var r = [], i = e.mode;
                e.mode = "hidden";
                for (var n = e.cues, a = n.length - 1; a >= 0 && n[a].startTime > t.startTime; a--) r.unshift(n[a]), e.removeCue(n[a]);
                e.addCue(t), r.forEach(function (t) {
                    return e.addCue(t)
                }), e.mode = i
            }(t, i) : t.addCue(i)
        }

        function h(e, t) {
            t && t.length && Object(l.i)(t, function (t) {
                if (!(o.Browser.ie && e && /^(native|subtitle|cc)/.test(t._id))) {
                    t.mode = "disabled", t.mode = "hidden";
                    for (var r = t.cues.length; r--;) t.removeCue(t.cues[r]);
                    t.embedded || (t.mode = "disabled"), t.inuse = !1
                }
            })
        }

        function p(e) {
            return "subtitles" === e || "captions" === e
        }

        function g(e) {
            var t, r = Object(n.b)(e, this._unknownCount), i = r.label;
            if (this._unknownCount = r.unknownCount, this.renderNatively || "metadata" === e.kind) {
                var a = this.video.textTracks;
                (t = Object(l.m)(a, {label: i})) || (t = this.video.addTextTrack(e.kind, i, e.language || "")), t.default = e.default, t.mode = "disabled", t.inuse = !0
            } else (t = e).data = t.data || [];
            return t._id || (t._id = Object(n.a)(e, this._textTracks.length)), t
        }

        function v(e) {
            this._textTracks.push(e), this._tracksById[e._id] = e
        }

        function y(e) {
            this.triggerActiveCues(e.currentTarget.activeCues)
        }

        t.a = u
    }, 78: function (e, t, r) {
        "use strict";

        function i(e) {
            return e && e.length ? e.end(e.length - 1) : 0
        }

        r.d(t, "a", function () {
            return i
        })
    }
}]);
