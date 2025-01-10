var Rv = Object.defineProperty,
  Ov = Object.defineProperties;
var Pv = Object.getOwnPropertyDescriptors;
var mo = Object.getOwnPropertySymbols;
var sf = Object.prototype.hasOwnProperty,
  af = Object.prototype.propertyIsEnumerable;
var of = (t, n, e) =>
    n in t
      ? Rv(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
      : (t[n] = e),
  w = (t, n) => {
    for (var e in (n ||= {})) sf.call(n, e) && of(t, e, n[e]);
    if (mo) for (var e of mo(n)) af.call(n, e) && of(t, e, n[e]);
    return t;
  },
  he = (t, n) => Ov(t, Pv(n));
var go = (t, n) => {
  var e = {};
  for (var r in t) sf.call(t, r) && n.indexOf(r) < 0 && (e[r] = t[r]);
  if (t != null && mo)
    for (var r of mo(t)) n.indexOf(r) < 0 && af.call(t, r) && (e[r] = t[r]);
  return e;
};
function Fv(t, n) {
  return Object.is(t, n);
}
var be = null,
  yo = !1,
  vo = 1,
  ur = Symbol("SIGNAL");
function J(t) {
  let n = be;
  return (be = t), n;
}
var Wa = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function lf(t) {
  if (yo) throw new Error("");
  if (be === null) return;
  be.consumerOnSignalRead(t);
  let n = be.nextProducerIndex++;
  if (
    (cr(be), n < be.producerNode.length && be.producerNode[n] !== t && ri(be))
  ) {
    let e = be.producerNode[n];
    Eo(e, be.producerIndexOfThis[n]);
  }
  be.producerNode[n] !== t &&
    ((be.producerNode[n] = t),
    (be.producerIndexOfThis[n] = ri(be) ? pf(t, be, n) : 0)),
    (be.producerLastReadVersion[n] = t.version);
}
function Lv() {
  vo++;
}
function kv(t) {
  if (!(ri(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === vo)) {
    if (!t.producerMustRecompute(t) && !qa(t)) {
      (t.dirty = !1), (t.lastCleanEpoch = vo);
      return;
    }
    t.producerRecomputeValue(t), (t.dirty = !1), (t.lastCleanEpoch = vo);
  }
}
function cf(t) {
  if (t.liveConsumerNode === void 0) return;
  let n = yo;
  yo = !0;
  try {
    for (let e of t.liveConsumerNode) e.dirty || jv(e);
  } finally {
    yo = n;
  }
}
function uf() {
  return be?.consumerAllowSignalWrites !== !1;
}
function jv(t) {
  (t.dirty = !0), cf(t), t.consumerMarkedDirty?.(t);
}
function df(t) {
  return t && (t.nextProducerIndex = 0), J(t);
}
function ff(t, n) {
  if (
    (J(n),
    !(
      !t ||
      t.producerNode === void 0 ||
      t.producerIndexOfThis === void 0 ||
      t.producerLastReadVersion === void 0
    ))
  ) {
    if (ri(t))
      for (let e = t.nextProducerIndex; e < t.producerNode.length; e++)
        Eo(t.producerNode[e], t.producerIndexOfThis[e]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(),
        t.producerLastReadVersion.pop(),
        t.producerIndexOfThis.pop();
  }
}
function qa(t) {
  cr(t);
  for (let n = 0; n < t.producerNode.length; n++) {
    let e = t.producerNode[n],
      r = t.producerLastReadVersion[n];
    if (r !== e.version || (kv(e), r !== e.version)) return !0;
  }
  return !1;
}
function hf(t) {
  if ((cr(t), ri(t)))
    for (let n = 0; n < t.producerNode.length; n++)
      Eo(t.producerNode[n], t.producerIndexOfThis[n]);
  (t.producerNode.length =
    t.producerLastReadVersion.length =
    t.producerIndexOfThis.length =
      0),
    t.liveConsumerNode &&
      (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0);
}
function pf(t, n, e) {
  if ((mf(t), cr(t), t.liveConsumerNode.length === 0))
    for (let r = 0; r < t.producerNode.length; r++)
      t.producerIndexOfThis[r] = pf(t.producerNode[r], t, r);
  return t.liveConsumerIndexOfThis.push(e), t.liveConsumerNode.push(n) - 1;
}
function Eo(t, n) {
  if ((mf(t), cr(t), t.liveConsumerNode.length === 1))
    for (let r = 0; r < t.producerNode.length; r++)
      Eo(t.producerNode[r], t.producerIndexOfThis[r]);
  let e = t.liveConsumerNode.length - 1;
  if (
    ((t.liveConsumerNode[n] = t.liveConsumerNode[e]),
    (t.liveConsumerIndexOfThis[n] = t.liveConsumerIndexOfThis[e]),
    t.liveConsumerNode.length--,
    t.liveConsumerIndexOfThis.length--,
    n < t.liveConsumerNode.length)
  ) {
    let r = t.liveConsumerIndexOfThis[n],
      i = t.liveConsumerNode[n];
    cr(i), (i.producerIndexOfThis[r] = n);
  }
}
function ri(t) {
  return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0;
}
function cr(t) {
  (t.producerNode ??= []),
    (t.producerIndexOfThis ??= []),
    (t.producerLastReadVersion ??= []);
}
function mf(t) {
  (t.liveConsumerNode ??= []), (t.liveConsumerIndexOfThis ??= []);
}
function Vv() {
  throw new Error();
}
var gf = Vv;
function yf() {
  gf();
}
function vf(t) {
  gf = t;
}
var Bv = null;
function Ef(t) {
  let n = Object.create(wf);
  n.value = t;
  let e = () => (lf(n), n.value);
  return (e[ur] = n), e;
}
function Ga(t, n) {
  uf() || yf(), t.equal(t.value, n) || ((t.value = n), Uv(t));
}
function Df(t, n) {
  uf() || yf(), Ga(t, n(t.value));
}
var wf = he(w({}, Wa), { equal: Fv, value: void 0 });
function Uv(t) {
  t.version++, Lv(), cf(t), Bv?.();
}
function R(t) {
  return typeof t == "function";
}
function dr(t) {
  let e = t((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (
    (e.prototype = Object.create(Error.prototype)),
    (e.prototype.constructor = e),
    e
  );
}
var Do = dr(
  (t) =>
    function (e) {
      t(this),
        (this.message = e
          ? `${e.length} errors occurred during unsubscription:
${e.map((r, i) => `${i + 1}) ${r.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = e);
    }
);
function ii(t, n) {
  if (t) {
    let e = t.indexOf(n);
    0 <= e && t.splice(e, 1);
  }
}
var ge = class t {
  constructor(n) {
    (this.initialTeardown = n),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let n;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: e } = this;
      if (e)
        if (((this._parentage = null), Array.isArray(e)))
          for (let o of e) o.remove(this);
        else e.remove(this);
      let { initialTeardown: r } = this;
      if (R(r))
        try {
          r();
        } catch (o) {
          n = o instanceof Do ? o.errors : [o];
        }
      let { _finalizers: i } = this;
      if (i) {
        this._finalizers = null;
        for (let o of i)
          try {
            Cf(o);
          } catch (s) {
            (n = n ?? []),
              s instanceof Do ? (n = [...n, ...s.errors]) : n.push(s);
          }
      }
      if (n) throw new Do(n);
    }
  }
  add(n) {
    var e;
    if (n && n !== this)
      if (this.closed) Cf(n);
      else {
        if (n instanceof t) {
          if (n.closed || n._hasParent(this)) return;
          n._addParent(this);
        }
        (this._finalizers =
          (e = this._finalizers) !== null && e !== void 0 ? e : []).push(n);
      }
  }
  _hasParent(n) {
    let { _parentage: e } = this;
    return e === n || (Array.isArray(e) && e.includes(n));
  }
  _addParent(n) {
    let { _parentage: e } = this;
    this._parentage = Array.isArray(e) ? (e.push(n), e) : e ? [e, n] : n;
  }
  _removeParent(n) {
    let { _parentage: e } = this;
    e === n ? (this._parentage = null) : Array.isArray(e) && ii(e, n);
  }
  remove(n) {
    let { _finalizers: e } = this;
    e && ii(e, n), n instanceof t && n._removeParent(this);
  }
};
ge.EMPTY = (() => {
  let t = new ge();
  return (t.closed = !0), t;
})();
var Ka = ge.EMPTY;
function wo(t) {
  return (
    t instanceof ge ||
    (t && "closed" in t && R(t.remove) && R(t.add) && R(t.unsubscribe))
  );
}
function Cf(t) {
  R(t) ? t() : t.unsubscribe();
}
var mt = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var fr = {
  setTimeout(t, n, ...e) {
    let { delegate: r } = fr;
    return r?.setTimeout ? r.setTimeout(t, n, ...e) : setTimeout(t, n, ...e);
  },
  clearTimeout(t) {
    let { delegate: n } = fr;
    return (n?.clearTimeout || clearTimeout)(t);
  },
  delegate: void 0,
};
function Co(t) {
  fr.setTimeout(() => {
    let { onUnhandledError: n } = mt;
    if (n) n(t);
    else throw t;
  });
}
function oi() {}
var bf = Qa("C", void 0, void 0);
function If(t) {
  return Qa("E", void 0, t);
}
function _f(t) {
  return Qa("N", t, void 0);
}
function Qa(t, n, e) {
  return { kind: t, value: n, error: e };
}
var Fn = null;
function hr(t) {
  if (mt.useDeprecatedSynchronousErrorHandling) {
    let n = !Fn;
    if ((n && (Fn = { errorThrown: !1, error: null }), t(), n)) {
      let { errorThrown: e, error: r } = Fn;
      if (((Fn = null), e)) throw r;
    }
  } else t();
}
function Sf(t) {
  mt.useDeprecatedSynchronousErrorHandling &&
    Fn &&
    ((Fn.errorThrown = !0), (Fn.error = t));
}
var Ln = class extends ge {
    constructor(n) {
      super(),
        (this.isStopped = !1),
        n
          ? ((this.destination = n), wo(n) && n.add(this))
          : (this.destination = zv);
    }
    static create(n, e, r) {
      return new pr(n, e, r);
    }
    next(n) {
      this.isStopped ? Za(_f(n), this) : this._next(n);
    }
    error(n) {
      this.isStopped
        ? Za(If(n), this)
        : ((this.isStopped = !0), this._error(n));
    }
    complete() {
      this.isStopped ? Za(bf, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(n) {
      this.destination.next(n);
    }
    _error(n) {
      try {
        this.destination.error(n);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  $v = Function.prototype.bind;
function Ya(t, n) {
  return $v.call(t, n);
}
var Xa = class {
    constructor(n) {
      this.partialObserver = n;
    }
    next(n) {
      let { partialObserver: e } = this;
      if (e.next)
        try {
          e.next(n);
        } catch (r) {
          bo(r);
        }
    }
    error(n) {
      let { partialObserver: e } = this;
      if (e.error)
        try {
          e.error(n);
        } catch (r) {
          bo(r);
        }
      else bo(n);
    }
    complete() {
      let { partialObserver: n } = this;
      if (n.complete)
        try {
          n.complete();
        } catch (e) {
          bo(e);
        }
    }
  },
  pr = class extends Ln {
    constructor(n, e, r) {
      super();
      let i;
      if (R(n) || !n)
        i = { next: n ?? void 0, error: e ?? void 0, complete: r ?? void 0 };
      else {
        let o;
        this && mt.useDeprecatedNextContext
          ? ((o = Object.create(n)),
            (o.unsubscribe = () => this.unsubscribe()),
            (i = {
              next: n.next && Ya(n.next, o),
              error: n.error && Ya(n.error, o),
              complete: n.complete && Ya(n.complete, o),
            }))
          : (i = n);
      }
      this.destination = new Xa(i);
    }
  };
function bo(t) {
  mt.useDeprecatedSynchronousErrorHandling ? Sf(t) : Co(t);
}
function Hv(t) {
  throw t;
}
function Za(t, n) {
  let { onStoppedNotification: e } = mt;
  e && fr.setTimeout(() => e(t, n));
}
var zv = { closed: !0, next: oi, error: Hv, complete: oi };
var mr = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function ze(t) {
  return t;
}
function Ja(...t) {
  return el(t);
}
function el(t) {
  return t.length === 0
    ? ze
    : t.length === 1
    ? t[0]
    : function (e) {
        return t.reduce((r, i) => i(r), e);
      };
}
var te = (() => {
  class t {
    constructor(e) {
      e && (this._subscribe = e);
    }
    lift(e) {
      let r = new t();
      return (r.source = this), (r.operator = e), r;
    }
    subscribe(e, r, i) {
      let o = qv(e) ? e : new pr(e, r, i);
      return (
        hr(() => {
          let { operator: s, source: a } = this;
          o.add(
            s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o)
          );
        }),
        o
      );
    }
    _trySubscribe(e) {
      try {
        return this._subscribe(e);
      } catch (r) {
        e.error(r);
      }
    }
    forEach(e, r) {
      return (
        (r = Tf(r)),
        new r((i, o) => {
          let s = new pr({
            next: (a) => {
              try {
                e(a);
              } catch (l) {
                o(l), s.unsubscribe();
              }
            },
            error: o,
            complete: i,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(e) {
      var r;
      return (r = this.source) === null || r === void 0
        ? void 0
        : r.subscribe(e);
    }
    [mr]() {
      return this;
    }
    pipe(...e) {
      return el(e)(this);
    }
    toPromise(e) {
      return (
        (e = Tf(e)),
        new e((r, i) => {
          let o;
          this.subscribe(
            (s) => (o = s),
            (s) => i(s),
            () => r(o)
          );
        })
      );
    }
  }
  return (t.create = (n) => new t(n)), t;
})();
function Tf(t) {
  var n;
  return (n = t ?? mt.Promise) !== null && n !== void 0 ? n : Promise;
}
function Wv(t) {
  return t && R(t.next) && R(t.error) && R(t.complete);
}
function qv(t) {
  return (t && t instanceof Ln) || (Wv(t) && wo(t));
}
function tl(t) {
  return R(t?.lift);
}
function q(t) {
  return (n) => {
    if (tl(n))
      return n.lift(function (e) {
        try {
          return t(e, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function G(t, n, e, r, i) {
  return new nl(t, n, e, r, i);
}
var nl = class extends Ln {
  constructor(n, e, r, i, o, s) {
    super(n),
      (this.onFinalize = o),
      (this.shouldUnsubscribe = s),
      (this._next = e
        ? function (a) {
            try {
              e(a);
            } catch (l) {
              n.error(l);
            }
          }
        : super._next),
      (this._error = i
        ? function (a) {
            try {
              i(a);
            } catch (l) {
              n.error(l);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
            } catch (a) {
              n.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: e } = this;
      super.unsubscribe(),
        !e && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }
};
function gr() {
  return q((t, n) => {
    let e = null;
    t._refCount++;
    let r = G(n, void 0, void 0, void 0, () => {
      if (!t || t._refCount <= 0 || 0 < --t._refCount) {
        e = null;
        return;
      }
      let i = t._connection,
        o = e;
      (e = null), i && (!o || i === o) && i.unsubscribe(), n.unsubscribe();
    });
    t.subscribe(r), r.closed || (e = t.connect());
  });
}
var yr = class extends te {
  constructor(n, e) {
    super(),
      (this.source = n),
      (this.subjectFactory = e),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      tl(n) && (this.lift = n.lift);
  }
  _subscribe(n) {
    return this.getSubject().subscribe(n);
  }
  getSubject() {
    let n = this._subject;
    return (
      (!n || n.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: n } = this;
    (this._subject = this._connection = null), n?.unsubscribe();
  }
  connect() {
    let n = this._connection;
    if (!n) {
      n = this._connection = new ge();
      let e = this.getSubject();
      n.add(
        this.source.subscribe(
          G(
            e,
            void 0,
            () => {
              this._teardown(), e.complete();
            },
            (r) => {
              this._teardown(), e.error(r);
            },
            () => this._teardown()
          )
        )
      ),
        n.closed && ((this._connection = null), (n = ge.EMPTY));
    }
    return n;
  }
  refCount() {
    return gr()(this);
  }
};
var Mf = dr(
  (t) =>
    function () {
      t(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var Se = (() => {
    class t extends te {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(e) {
        let r = new Io(this, this);
        return (r.operator = e), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new Mf();
      }
      next(e) {
        hr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(e);
          }
        });
      }
      error(e) {
        hr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = e);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(e);
          }
        });
      }
      complete() {
        hr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: e } = this;
            for (; e.length; ) e.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var e;
        return (
          ((e = this.observers) === null || e === void 0 ? void 0 : e.length) >
          0
        );
      }
      _trySubscribe(e) {
        return this._throwIfClosed(), super._trySubscribe(e);
      }
      _subscribe(e) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(e),
          this._innerSubscribe(e)
        );
      }
      _innerSubscribe(e) {
        let { hasError: r, isStopped: i, observers: o } = this;
        return r || i
          ? Ka
          : ((this.currentObservers = null),
            o.push(e),
            new ge(() => {
              (this.currentObservers = null), ii(o, e);
            }));
      }
      _checkFinalizedStatuses(e) {
        let { hasError: r, thrownError: i, isStopped: o } = this;
        r ? e.error(i) : o && e.complete();
      }
      asObservable() {
        let e = new te();
        return (e.source = this), e;
      }
    }
    return (t.create = (n, e) => new Io(n, e)), t;
  })(),
  Io = class extends Se {
    constructor(n, e) {
      super(), (this.destination = n), (this.source = e);
    }
    next(n) {
      var e, r;
      (r =
        (e = this.destination) === null || e === void 0 ? void 0 : e.next) ===
        null ||
        r === void 0 ||
        r.call(e, n);
    }
    error(n) {
      var e, r;
      (r =
        (e = this.destination) === null || e === void 0 ? void 0 : e.error) ===
        null ||
        r === void 0 ||
        r.call(e, n);
    }
    complete() {
      var n, e;
      (e =
        (n = this.destination) === null || n === void 0
          ? void 0
          : n.complete) === null ||
        e === void 0 ||
        e.call(n);
    }
    _subscribe(n) {
      var e, r;
      return (r =
        (e = this.source) === null || e === void 0
          ? void 0
          : e.subscribe(n)) !== null && r !== void 0
        ? r
        : Ka;
    }
  };
var Te = class extends Se {
  constructor(n) {
    super(), (this._value = n);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(n) {
    let e = super._subscribe(n);
    return !e.closed && n.next(this._value), e;
  }
  getValue() {
    let { hasError: n, thrownError: e, _value: r } = this;
    if (n) throw e;
    return this._throwIfClosed(), r;
  }
  next(n) {
    super.next((this._value = n));
  }
};
var We = new te((t) => t.complete());
function Af(t) {
  return t && R(t.schedule);
}
function xf(t) {
  return t[t.length - 1];
}
function Nf(t) {
  return R(xf(t)) ? t.pop() : void 0;
}
function hn(t) {
  return Af(xf(t)) ? t.pop() : void 0;
}
function Of(t, n, e, r) {
  function i(o) {
    return o instanceof e
      ? o
      : new e(function (s) {
          s(o);
        });
  }
  return new (e || (e = Promise))(function (o, s) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      u.done ? o(u.value) : i(u.value).then(a, l);
    }
    c((r = r.apply(t, n || [])).next());
  });
}
function Rf(t) {
  var n = typeof Symbol == "function" && Symbol.iterator,
    e = n && t[n],
    r = 0;
  if (e) return e.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function () {
        return (
          t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t }
        );
      },
    };
  throw new TypeError(
    n ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function kn(t) {
  return this instanceof kn ? ((this.v = t), this) : new kn(t);
}
function Pf(t, n, e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = e.apply(t, n || []),
    i,
    o = [];
  return (
    (i = Object.create(
      (typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype
    )),
    a("next"),
    a("throw"),
    a("return", s),
    (i[Symbol.asyncIterator] = function () {
      return this;
    }),
    i
  );
  function s(h) {
    return function (p) {
      return Promise.resolve(p).then(h, d);
    };
  }
  function a(h, p) {
    r[h] &&
      ((i[h] = function (y) {
        return new Promise(function (T, M) {
          o.push([h, y, T, M]) > 1 || l(h, y);
        });
      }),
      p && (i[h] = p(i[h])));
  }
  function l(h, p) {
    try {
      c(r[h](p));
    } catch (y) {
      f(o[0][3], y);
    }
  }
  function c(h) {
    h.value instanceof kn
      ? Promise.resolve(h.value.v).then(u, d)
      : f(o[0][2], h);
  }
  function u(h) {
    l("next", h);
  }
  function d(h) {
    l("throw", h);
  }
  function f(h, p) {
    h(p), o.shift(), o.length && l(o[0][0], o[0][1]);
  }
}
function Ff(t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = t[Symbol.asyncIterator],
    e;
  return n
    ? n.call(t)
    : ((t = typeof Rf == "function" ? Rf(t) : t[Symbol.iterator]()),
      (e = {}),
      r("next"),
      r("throw"),
      r("return"),
      (e[Symbol.asyncIterator] = function () {
        return this;
      }),
      e);
  function r(o) {
    e[o] =
      t[o] &&
      function (s) {
        return new Promise(function (a, l) {
          (s = t[o](s)), i(a, l, s.done, s.value);
        });
      };
  }
  function i(o, s, a, l) {
    Promise.resolve(l).then(function (c) {
      o({ value: c, done: a });
    }, s);
  }
}
var _o = (t) => t && typeof t.length == "number" && typeof t != "function";
function So(t) {
  return R(t?.then);
}
function To(t) {
  return R(t[mr]);
}
function Mo(t) {
  return Symbol.asyncIterator && R(t?.[Symbol.asyncIterator]);
}
function Ao(t) {
  return new TypeError(
    `You provided ${
      t !== null && typeof t == "object" ? "an invalid object" : `'${t}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function Gv() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var xo = Gv();
function No(t) {
  return R(t?.[xo]);
}
function Ro(t) {
  return Pf(this, arguments, function* () {
    let e = t.getReader();
    try {
      for (;;) {
        let { value: r, done: i } = yield kn(e.read());
        if (i) return yield kn(void 0);
        yield yield kn(r);
      }
    } finally {
      e.releaseLock();
    }
  });
}
function Oo(t) {
  return R(t?.getReader);
}
function Ie(t) {
  if (t instanceof te) return t;
  if (t != null) {
    if (To(t)) return Kv(t);
    if (_o(t)) return Qv(t);
    if (So(t)) return Yv(t);
    if (Mo(t)) return Lf(t);
    if (No(t)) return Zv(t);
    if (Oo(t)) return Xv(t);
  }
  throw Ao(t);
}
function Kv(t) {
  return new te((n) => {
    let e = t[mr]();
    if (R(e.subscribe)) return e.subscribe(n);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function Qv(t) {
  return new te((n) => {
    for (let e = 0; e < t.length && !n.closed; e++) n.next(t[e]);
    n.complete();
  });
}
function Yv(t) {
  return new te((n) => {
    t.then(
      (e) => {
        n.closed || (n.next(e), n.complete());
      },
      (e) => n.error(e)
    ).then(null, Co);
  });
}
function Zv(t) {
  return new te((n) => {
    for (let e of t) if ((n.next(e), n.closed)) return;
    n.complete();
  });
}
function Lf(t) {
  return new te((n) => {
    Jv(t, n).catch((e) => n.error(e));
  });
}
function Xv(t) {
  return Lf(Ro(t));
}
function Jv(t, n) {
  var e, r, i, o;
  return Of(this, void 0, void 0, function* () {
    try {
      for (e = Ff(t); (r = yield e.next()), !r.done; ) {
        let s = r.value;
        if ((n.next(s), n.closed)) return;
      }
    } catch (s) {
      i = { error: s };
    } finally {
      try {
        r && !r.done && (o = e.return) && (yield o.call(e));
      } finally {
        if (i) throw i.error;
      }
    }
    n.complete();
  });
}
function je(t, n, e, r = 0, i = !1) {
  let o = n.schedule(function () {
    e(), i ? t.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((t.add(o), !i)) return o;
}
function Po(t, n = 0) {
  return q((e, r) => {
    e.subscribe(
      G(
        r,
        (i) => je(r, t, () => r.next(i), n),
        () => je(r, t, () => r.complete(), n),
        (i) => je(r, t, () => r.error(i), n)
      )
    );
  });
}
function Fo(t, n = 0) {
  return q((e, r) => {
    r.add(t.schedule(() => e.subscribe(r), n));
  });
}
function kf(t, n) {
  return Ie(t).pipe(Fo(n), Po(n));
}
function jf(t, n) {
  return Ie(t).pipe(Fo(n), Po(n));
}
function Vf(t, n) {
  return new te((e) => {
    let r = 0;
    return n.schedule(function () {
      r === t.length
        ? e.complete()
        : (e.next(t[r++]), e.closed || this.schedule());
    });
  });
}
function Bf(t, n) {
  return new te((e) => {
    let r;
    return (
      je(e, n, () => {
        (r = t[xo]()),
          je(
            e,
            n,
            () => {
              let i, o;
              try {
                ({ value: i, done: o } = r.next());
              } catch (s) {
                e.error(s);
                return;
              }
              o ? e.complete() : e.next(i);
            },
            0,
            !0
          );
      }),
      () => R(r?.return) && r.return()
    );
  });
}
function Lo(t, n) {
  if (!t) throw new Error("Iterable cannot be null");
  return new te((e) => {
    je(e, n, () => {
      let r = t[Symbol.asyncIterator]();
      je(
        e,
        n,
        () => {
          r.next().then((i) => {
            i.done ? e.complete() : e.next(i.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function Uf(t, n) {
  return Lo(Ro(t), n);
}
function $f(t, n) {
  if (t != null) {
    if (To(t)) return kf(t, n);
    if (_o(t)) return Vf(t, n);
    if (So(t)) return jf(t, n);
    if (Mo(t)) return Lo(t, n);
    if (No(t)) return Bf(t, n);
    if (Oo(t)) return Uf(t, n);
  }
  throw Ao(t);
}
function pe(t, n) {
  return n ? $f(t, n) : Ie(t);
}
function N(...t) {
  let n = hn(t);
  return pe(t, n);
}
function vr(t, n) {
  let e = R(t) ? t : () => t,
    r = (i) => i.error(e());
  return new te(n ? (i) => n.schedule(r, 0, i) : r);
}
function rl(t) {
  return !!t && (t instanceof te || (R(t.lift) && R(t.subscribe)));
}
var Kt = dr(
  (t) =>
    function () {
      t(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function W(t, n) {
  return q((e, r) => {
    let i = 0;
    e.subscribe(
      G(r, (o) => {
        r.next(t.call(n, o, i++));
      })
    );
  });
}
var { isArray: e0 } = Array;
function t0(t, n) {
  return e0(n) ? t(...n) : t(n);
}
function Hf(t) {
  return W((n) => t0(t, n));
}
var { isArray: n0 } = Array,
  { getPrototypeOf: r0, prototype: i0, keys: o0 } = Object;
function zf(t) {
  if (t.length === 1) {
    let n = t[0];
    if (n0(n)) return { args: n, keys: null };
    if (s0(n)) {
      let e = o0(n);
      return { args: e.map((r) => n[r]), keys: e };
    }
  }
  return { args: t, keys: null };
}
function s0(t) {
  return t && typeof t == "object" && r0(t) === i0;
}
function Wf(t, n) {
  return t.reduce((e, r, i) => ((e[r] = n[i]), e), {});
}
function si(...t) {
  let n = hn(t),
    e = Nf(t),
    { args: r, keys: i } = zf(t);
  if (r.length === 0) return pe([], n);
  let o = new te(a0(r, n, i ? (s) => Wf(i, s) : ze));
  return e ? o.pipe(Hf(e)) : o;
}
function a0(t, n, e = ze) {
  return (r) => {
    qf(
      n,
      () => {
        let { length: i } = t,
          o = new Array(i),
          s = i,
          a = i;
        for (let l = 0; l < i; l++)
          qf(
            n,
            () => {
              let c = pe(t[l], n),
                u = !1;
              c.subscribe(
                G(
                  r,
                  (d) => {
                    (o[l] = d), u || ((u = !0), a--), a || r.next(e(o.slice()));
                  },
                  () => {
                    --s || r.complete();
                  }
                )
              );
            },
            r
          );
      },
      r
    );
  };
}
function qf(t, n, e) {
  t ? je(e, t, n) : n();
}
function Gf(t, n, e, r, i, o, s, a) {
  let l = [],
    c = 0,
    u = 0,
    d = !1,
    f = () => {
      d && !l.length && !c && n.complete();
    },
    h = (y) => (c < r ? p(y) : l.push(y)),
    p = (y) => {
      o && n.next(y), c++;
      let T = !1;
      Ie(e(y, u++)).subscribe(
        G(
          n,
          (M) => {
            i?.(M), o ? h(M) : n.next(M);
          },
          () => {
            T = !0;
          },
          void 0,
          () => {
            if (T)
              try {
                for (c--; l.length && c < r; ) {
                  let M = l.shift();
                  s ? je(n, s, () => p(M)) : p(M);
                }
                f();
              } catch (M) {
                n.error(M);
              }
          }
        )
      );
    };
  return (
    t.subscribe(
      G(n, h, () => {
        (d = !0), f();
      })
    ),
    () => {
      a?.();
    }
  );
}
function ye(t, n, e = 1 / 0) {
  return R(n)
    ? ye((r, i) => W((o, s) => n(r, o, i, s))(Ie(t(r, i))), e)
    : (typeof n == "number" && (e = n), q((r, i) => Gf(r, i, t, e)));
}
function il(t = 1 / 0) {
  return ye(ze, t);
}
function Kf() {
  return il(1);
}
function Er(...t) {
  return Kf()(pe(t, hn(t)));
}
function ko(t) {
  return new te((n) => {
    Ie(t()).subscribe(n);
  });
}
function st(t, n) {
  return q((e, r) => {
    let i = 0;
    e.subscribe(G(r, (o) => t.call(n, o, i++) && r.next(o)));
  });
}
function pn(t) {
  return q((n, e) => {
    let r = null,
      i = !1,
      o;
    (r = n.subscribe(
      G(e, void 0, void 0, (s) => {
        (o = Ie(t(s, pn(t)(n)))),
          r ? (r.unsubscribe(), (r = null), o.subscribe(e)) : (i = !0);
      })
    )),
      i && (r.unsubscribe(), (r = null), o.subscribe(e));
  });
}
function Qf(t, n, e, r, i) {
  return (o, s) => {
    let a = e,
      l = n,
      c = 0;
    o.subscribe(
      G(
        s,
        (u) => {
          let d = c++;
          (l = a ? t(l, u, d) : ((a = !0), u)), r && s.next(l);
        },
        i &&
          (() => {
            a && s.next(l), s.complete();
          })
      )
    );
  };
}
function jn(t, n) {
  return R(n) ? ye(t, n, 1) : ye(t, 1);
}
function mn(t) {
  return q((n, e) => {
    let r = !1;
    n.subscribe(
      G(
        e,
        (i) => {
          (r = !0), e.next(i);
        },
        () => {
          r || e.next(t), e.complete();
        }
      )
    );
  });
}
function Qt(t) {
  return t <= 0
    ? () => We
    : q((n, e) => {
        let r = 0;
        n.subscribe(
          G(e, (i) => {
            ++r <= t && (e.next(i), t <= r && e.complete());
          })
        );
      });
}
function ol(t) {
  return W(() => t);
}
function jo(t = l0) {
  return q((n, e) => {
    let r = !1;
    n.subscribe(
      G(
        e,
        (i) => {
          (r = !0), e.next(i);
        },
        () => (r ? e.complete() : e.error(t()))
      )
    );
  });
}
function l0() {
  return new Kt();
}
function Dr(t) {
  return q((n, e) => {
    try {
      n.subscribe(e);
    } finally {
      e.add(t);
    }
  });
}
function gt(t, n) {
  let e = arguments.length >= 2;
  return (r) =>
    r.pipe(
      t ? st((i, o) => t(i, o, r)) : ze,
      Qt(1),
      e ? mn(n) : jo(() => new Kt())
    );
}
function wr(t) {
  return t <= 0
    ? () => We
    : q((n, e) => {
        let r = [];
        n.subscribe(
          G(
            e,
            (i) => {
              r.push(i), t < r.length && r.shift();
            },
            () => {
              for (let i of r) e.next(i);
              e.complete();
            },
            void 0,
            () => {
              r = null;
            }
          )
        );
      });
}
function sl(t, n) {
  let e = arguments.length >= 2;
  return (r) =>
    r.pipe(
      t ? st((i, o) => t(i, o, r)) : ze,
      wr(1),
      e ? mn(n) : jo(() => new Kt())
    );
}
function al(t, n) {
  return q(Qf(t, n, arguments.length >= 2, !0));
}
function ll(...t) {
  let n = hn(t);
  return q((e, r) => {
    (n ? Er(t, e, n) : Er(t, e)).subscribe(r);
  });
}
function qe(t, n) {
  return q((e, r) => {
    let i = null,
      o = 0,
      s = !1,
      a = () => s && !i && r.complete();
    e.subscribe(
      G(
        r,
        (l) => {
          i?.unsubscribe();
          let c = 0,
            u = o++;
          Ie(t(l, u)).subscribe(
            (i = G(
              r,
              (d) => r.next(n ? n(l, d, u, c++) : d),
              () => {
                (i = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function cl(t) {
  return q((n, e) => {
    Ie(t).subscribe(G(e, () => e.complete(), oi)), !e.closed && n.subscribe(e);
  });
}
function ve(t, n, e) {
  let r = R(t) || n || e ? { next: t, error: n, complete: e } : t;
  return r
    ? q((i, o) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        i.subscribe(
          G(
            o,
            (l) => {
              var c;
              (c = r.next) === null || c === void 0 || c.call(r, l), o.next(l);
            },
            () => {
              var l;
              (a = !1),
                (l = r.complete) === null || l === void 0 || l.call(r),
                o.complete();
            },
            (l) => {
              var c;
              (a = !1),
                (c = r.error) === null || c === void 0 || c.call(r, l),
                o.error(l);
            },
            () => {
              var l, c;
              a && ((l = r.unsubscribe) === null || l === void 0 || l.call(r)),
                (c = r.finalize) === null || c === void 0 || c.call(r);
            }
          )
        );
      })
    : ze;
}
var Ph = "https://g.co/ng/security#xss",
  v = class extends Error {
    constructor(n, e) {
      super(vs(n, e)), (this.code = n);
    }
  };
function vs(t, n) {
  return `${`NG0${Math.abs(t)}`}${n ? ": " + n : ""}`;
}
function wi(t) {
  return { toString: t }.toString();
}
var Vo = "__parameters__";
function c0(t) {
  return function (...e) {
    if (t) {
      let r = t(...e);
      for (let i in r) this[i] = r[i];
    }
  };
}
function Fh(t, n, e) {
  return wi(() => {
    let r = c0(n);
    function i(...o) {
      if (this instanceof i) return r.apply(this, o), this;
      let s = new i(...o);
      return (a.annotation = s), a;
      function a(l, c, u) {
        let d = l.hasOwnProperty(Vo)
          ? l[Vo]
          : Object.defineProperty(l, Vo, { value: [] })[Vo];
        for (; d.length <= u; ) d.push(null);
        return (d[u] = d[u] || []).push(s), l;
      }
    }
    return (
      e && (i.prototype = Object.create(e.prototype)),
      (i.prototype.ngMetadataName = t),
      (i.annotationCls = i),
      i
    );
  });
}
var ai = globalThis;
function se(t) {
  for (let n in t) if (t[n] === se) return n;
  throw Error("Could not find renamed property on target object.");
}
function u0(t, n) {
  for (let e in n) n.hasOwnProperty(e) && !t.hasOwnProperty(e) && (t[e] = n[e]);
}
function Le(t) {
  if (typeof t == "string") return t;
  if (Array.isArray(t)) return "[" + t.map(Le).join(", ") + "]";
  if (t == null) return "" + t;
  if (t.overriddenName) return `${t.overriddenName}`;
  if (t.name) return `${t.name}`;
  let n = t.toString();
  if (n == null) return "" + n;
  let e = n.indexOf(`
`);
  return e === -1 ? n : n.substring(0, e);
}
function _l(t, n) {
  return t == null || t === ""
    ? n === null
      ? ""
      : n
    : n == null || n === ""
    ? t
    : t + " " + n;
}
var d0 = se({ __forward_ref__: se });
function Es(t) {
  return (
    (t.__forward_ref__ = Es),
    (t.toString = function () {
      return Le(this());
    }),
    t
  );
}
function lt(t) {
  return Lh(t) ? t() : t;
}
function Lh(t) {
  return (
    typeof t == "function" && t.hasOwnProperty(d0) && t.__forward_ref__ === Es
  );
}
function S(t) {
  return {
    token: t.token,
    providedIn: t.providedIn || null,
    factory: t.factory,
    value: void 0,
  };
}
function Qe(t) {
  return { providers: t.providers || [], imports: t.imports || [] };
}
function Ds(t) {
  return Yf(t, jh) || Yf(t, Vh);
}
function kh(t) {
  return Ds(t) !== null;
}
function Yf(t, n) {
  return t.hasOwnProperty(n) ? t[n] : null;
}
function f0(t) {
  let n = t && (t[jh] || t[Vh]);
  return n || null;
}
function Zf(t) {
  return t && (t.hasOwnProperty(Xf) || t.hasOwnProperty(h0)) ? t[Xf] : null;
}
var jh = se({ ɵprov: se }),
  Xf = se({ ɵinj: se }),
  Vh = se({ ngInjectableDef: se }),
  h0 = se({ ngInjectorDef: se }),
  k = class {
    constructor(n, e) {
      (this._desc = n),
        (this.ngMetadataName = "InjectionToken"),
        (this.ɵprov = void 0),
        typeof e == "number"
          ? (this.__NG_ELEMENT_ID__ = e)
          : e !== void 0 &&
            (this.ɵprov = S({
              token: this,
              providedIn: e.providedIn || "root",
              factory: e.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function Bh(t) {
  return t && !!t.ɵproviders;
}
var p0 = se({ ɵcmp: se }),
  m0 = se({ ɵdir: se }),
  g0 = se({ ɵpipe: se }),
  y0 = se({ ɵmod: se }),
  Zo = se({ ɵfac: se }),
  li = se({ __NG_ELEMENT_ID__: se }),
  Jf = se({ __NG_ENV_ID__: se });
function ws(t) {
  return typeof t == "string" ? t : t == null ? "" : String(t);
}
function v0(t) {
  return typeof t == "function"
    ? t.name || t.toString()
    : typeof t == "object" && t != null && typeof t.type == "function"
    ? t.type.name || t.type.toString()
    : ws(t);
}
function E0(t, n) {
  let e = n ? `. Dependency path: ${n.join(" > ")} > ${t}` : "";
  throw new v(-200, t);
}
function Dc(t, n) {
  throw new v(-201, !1);
}
var V = (function (t) {
    return (
      (t[(t.Default = 0)] = "Default"),
      (t[(t.Host = 1)] = "Host"),
      (t[(t.Self = 2)] = "Self"),
      (t[(t.SkipSelf = 4)] = "SkipSelf"),
      (t[(t.Optional = 8)] = "Optional"),
      t
    );
  })(V || {}),
  Sl;
function Uh() {
  return Sl;
}
function at(t) {
  let n = Sl;
  return (Sl = t), n;
}
function $h(t, n, e) {
  let r = Ds(t);
  if (r && r.providedIn == "root")
    return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (e & V.Optional) return null;
  if (n !== void 0) return n;
  Dc(t, "Injector");
}
var D0 = {},
  ci = D0,
  Tl = "__NG_DI_FLAG__",
  Xo = "ngTempTokenPath",
  w0 = "ngTokenPath",
  C0 = /\n/gm,
  b0 = "\u0275",
  eh = "__source",
  _r;
function I0() {
  return _r;
}
function gn(t) {
  let n = _r;
  return (_r = t), n;
}
function _0(t, n = V.Default) {
  if (_r === void 0) throw new v(-203, !1);
  return _r === null
    ? $h(t, void 0, n)
    : _r.get(t, n & V.Optional ? null : void 0, n);
}
function B(t, n = V.Default) {
  return (Uh() || _0)(lt(t), n);
}
function E(t, n = V.Default) {
  return B(t, Cs(n));
}
function Cs(t) {
  return typeof t > "u" || typeof t == "number"
    ? t
    : 0 | (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4);
}
function Ml(t) {
  let n = [];
  for (let e = 0; e < t.length; e++) {
    let r = lt(t[e]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new v(900, !1);
      let i,
        o = V.Default;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          l = S0(a);
        typeof l == "number" ? (l === -1 ? (i = a.token) : (o |= l)) : (i = a);
      }
      n.push(B(i, o));
    } else n.push(B(r));
  }
  return n;
}
function Hh(t, n) {
  return (t[Tl] = n), (t.prototype[Tl] = n), t;
}
function S0(t) {
  return t[Tl];
}
function T0(t, n, e, r) {
  let i = t[Xo];
  throw (
    (n[eh] && i.unshift(n[eh]),
    (t.message = M0(
      `
` + t.message,
      i,
      e,
      r
    )),
    (t[w0] = i),
    (t[Xo] = null),
    t)
  );
}
function M0(t, n, e, r = null) {
  t =
    t &&
    t.charAt(0) ===
      `
` &&
    t.charAt(1) == b0
      ? t.slice(2)
      : t;
  let i = Le(n);
  if (Array.isArray(n)) i = n.map(Le).join(" -> ");
  else if (typeof n == "object") {
    let o = [];
    for (let s in n)
      if (n.hasOwnProperty(s)) {
        let a = n[s];
        o.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : Le(a)));
      }
    i = `{${o.join(", ")}}`;
  }
  return `${e}${r ? "(" + r + ")" : ""}[${i}]: ${t.replace(
    C0,
    `
  `
  )}`;
}
var bs = Hh(Fh("Optional"), 8);
var wc = Hh(Fh("SkipSelf"), 4);
function Tr(t, n) {
  let e = t.hasOwnProperty(Zo);
  return e ? t[Zo] : null;
}
function A0(t, n, e) {
  if (t.length !== n.length) return !1;
  for (let r = 0; r < t.length; r++) {
    let i = t[r],
      o = n[r];
    if ((e && ((i = e(i)), (o = e(o))), o !== i)) return !1;
  }
  return !0;
}
function x0(t) {
  return t.flat(Number.POSITIVE_INFINITY);
}
function Cc(t, n) {
  t.forEach((e) => (Array.isArray(e) ? Cc(e, n) : n(e)));
}
function zh(t, n, e) {
  n >= t.length ? t.push(e) : t.splice(n, 0, e);
}
function Jo(t, n) {
  return n >= t.length - 1 ? t.pop() : t.splice(n, 1)[0];
}
function N0(t, n) {
  let e = [];
  for (let r = 0; r < t; r++) e.push(n);
  return e;
}
function R0(t, n, e, r) {
  let i = t.length;
  if (i == n) t.push(e, r);
  else if (i === 1) t.push(r, t[0]), (t[0] = e);
  else {
    for (i--, t.push(t[i - 1], t[i]); i > n; ) {
      let o = i - 2;
      (t[i] = t[o]), i--;
    }
    (t[n] = e), (t[n + 1] = r);
  }
}
function bc(t, n, e) {
  let r = Ci(t, n);
  return r >= 0 ? (t[r | 1] = e) : ((r = ~r), R0(t, r, n, e)), r;
}
function ul(t, n) {
  let e = Ci(t, n);
  if (e >= 0) return t[e | 1];
}
function Ci(t, n) {
  return O0(t, n, 1);
}
function O0(t, n, e) {
  let r = 0,
    i = t.length >> e;
  for (; i !== r; ) {
    let o = r + ((i - r) >> 1),
      s = t[o << e];
    if (n === s) return o << e;
    s > n ? (i = o) : (r = o + 1);
  }
  return ~(i << e);
}
var Mr = {},
  Fe = [],
  Bn = new k(""),
  Wh = new k("", -1),
  qh = new k(""),
  es = class {
    get(n, e = ci) {
      if (e === ci) {
        let r = new Error(`NullInjectorError: No provider for ${Le(n)}!`);
        throw ((r.name = "NullInjectorError"), r);
      }
      return e;
    }
  },
  Gh = (function (t) {
    return (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t;
  })(Gh || {}),
  xt = (function (t) {
    return (
      (t[(t.Emulated = 0)] = "Emulated"),
      (t[(t.None = 2)] = "None"),
      (t[(t.ShadowDom = 3)] = "ShadowDom"),
      t
    );
  })(xt || {}),
  le = (function (t) {
    return (
      (t[(t.None = 0)] = "None"),
      (t[(t.SignalBased = 1)] = "SignalBased"),
      (t[(t.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      t
    );
  })(le || {});
function P0(t, n, e) {
  let r = t.length;
  for (;;) {
    let i = t.indexOf(n, e);
    if (i === -1) return i;
    if (i === 0 || t.charCodeAt(i - 1) <= 32) {
      let o = n.length;
      if (i + o === r || t.charCodeAt(i + o) <= 32) return i;
    }
    e = i + 1;
  }
}
function Al(t, n, e) {
  let r = 0;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == "number") {
      if (i !== 0) break;
      r++;
      let o = e[r++],
        s = e[r++],
        a = e[r++];
      t.setAttribute(n, s, a, o);
    } else {
      let o = i,
        s = e[++r];
      L0(o) ? t.setProperty(n, o, s) : t.setAttribute(n, o, s), r++;
    }
  }
  return r;
}
function F0(t) {
  return t === 3 || t === 4 || t === 6;
}
function L0(t) {
  return t.charCodeAt(0) === 64;
}
function ui(t, n) {
  if (!(n === null || n.length === 0))
    if (t === null || t.length === 0) t = n.slice();
    else {
      let e = -1;
      for (let r = 0; r < n.length; r++) {
        let i = n[r];
        typeof i == "number"
          ? (e = i)
          : e === 0 ||
            (e === -1 || e === 2
              ? th(t, e, i, null, n[++r])
              : th(t, e, i, null, null));
      }
    }
  return t;
}
function th(t, n, e, r, i) {
  let o = 0,
    s = t.length;
  if (n === -1) s = -1;
  else
    for (; o < t.length; ) {
      let a = t[o++];
      if (typeof a == "number") {
        if (a === n) {
          s = -1;
          break;
        } else if (a > n) {
          s = o - 1;
          break;
        }
      }
    }
  for (; o < t.length; ) {
    let a = t[o];
    if (typeof a == "number") break;
    if (a === e) {
      if (r === null) {
        i !== null && (t[o + 1] = i);
        return;
      } else if (r === t[o + 1]) {
        t[o + 2] = i;
        return;
      }
    }
    o++, r !== null && o++, i !== null && o++;
  }
  s !== -1 && (t.splice(s, 0, n), (o = s + 1)),
    t.splice(o++, 0, e),
    r !== null && t.splice(o++, 0, r),
    i !== null && t.splice(o++, 0, i);
}
var Kh = "ng-template";
function k0(t, n, e, r) {
  let i = 0;
  if (r) {
    for (; i < n.length && typeof n[i] == "string"; i += 2)
      if (n[i] === "class" && P0(n[i + 1].toLowerCase(), e, 0) !== -1)
        return !0;
  } else if (Ic(t)) return !1;
  if (((i = n.indexOf(1, i)), i > -1)) {
    let o;
    for (; ++i < n.length && typeof (o = n[i]) == "string"; )
      if (o.toLowerCase() === e) return !0;
  }
  return !1;
}
function Ic(t) {
  return t.type === 4 && t.value !== Kh;
}
function j0(t, n, e) {
  let r = t.type === 4 && !e ? Kh : t.value;
  return n === r;
}
function V0(t, n, e) {
  let r = 4,
    i = t.attrs,
    o = i !== null ? $0(i) : 0,
    s = !1;
  for (let a = 0; a < n.length; a++) {
    let l = n[a];
    if (typeof l == "number") {
      if (!s && !yt(r) && !yt(l)) return !1;
      if (s && yt(l)) continue;
      (s = !1), (r = l | (r & 1));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (
          ((r = 2 | (r & 1)),
          (l !== "" && !j0(t, l, e)) || (l === "" && n.length === 1))
        ) {
          if (yt(r)) return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (i === null || !k0(t, i, l, e)) {
          if (yt(r)) return !1;
          s = !0;
        }
      } else {
        let c = n[++a],
          u = B0(l, i, Ic(t), e);
        if (u === -1) {
          if (yt(r)) return !1;
          s = !0;
          continue;
        }
        if (c !== "") {
          let d;
          if (
            (u > o ? (d = "") : (d = i[u + 1].toLowerCase()), r & 2 && c !== d)
          ) {
            if (yt(r)) return !1;
            s = !0;
          }
        }
      }
  }
  return yt(r) || s;
}
function yt(t) {
  return (t & 1) === 0;
}
function B0(t, n, e, r) {
  if (n === null) return -1;
  let i = 0;
  if (r || !e) {
    let o = !1;
    for (; i < n.length; ) {
      let s = n[i];
      if (s === t) return i;
      if (s === 3 || s === 6) o = !0;
      else if (s === 1 || s === 2) {
        let a = n[++i];
        for (; typeof a == "string"; ) a = n[++i];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          i += 4;
          continue;
        }
      }
      i += o ? 1 : 2;
    }
    return -1;
  } else return H0(n, t);
}
function Qh(t, n, e = !1) {
  for (let r = 0; r < n.length; r++) if (V0(t, n[r], e)) return !0;
  return !1;
}
function U0(t) {
  let n = t.attrs;
  if (n != null) {
    let e = n.indexOf(5);
    if (!(e & 1)) return n[e + 1];
  }
  return null;
}
function $0(t) {
  for (let n = 0; n < t.length; n++) {
    let e = t[n];
    if (F0(e)) return n;
  }
  return t.length;
}
function H0(t, n) {
  let e = t.indexOf(4);
  if (e > -1)
    for (e++; e < t.length; ) {
      let r = t[e];
      if (typeof r == "number") return -1;
      if (r === n) return e;
      e++;
    }
  return -1;
}
function z0(t, n) {
  e: for (let e = 0; e < n.length; e++) {
    let r = n[e];
    if (t.length === r.length) {
      for (let i = 0; i < t.length; i++) if (t[i] !== r[i]) continue e;
      return !0;
    }
  }
  return !1;
}
function nh(t, n) {
  return t ? ":not(" + n.trim() + ")" : n;
}
function W0(t) {
  let n = t[0],
    e = 1,
    r = 2,
    i = "",
    o = !1;
  for (; e < t.length; ) {
    let s = t[e];
    if (typeof s == "string")
      if (r & 2) {
        let a = t[++e];
        i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else r & 8 ? (i += "." + s) : r & 4 && (i += " " + s);
    else
      i !== "" && !yt(s) && ((n += nh(o, i)), (i = "")),
        (r = s),
        (o = o || !yt(r));
    e++;
  }
  return i !== "" && (n += nh(o, i)), n;
}
function q0(t) {
  return t.map(W0).join(",");
}
function G0(t) {
  let n = [],
    e = [],
    r = 1,
    i = 2;
  for (; r < t.length; ) {
    let o = t[r];
    if (typeof o == "string")
      i === 2 ? o !== "" && n.push(o, t[++r]) : i === 8 && e.push(o);
    else {
      if (!yt(i)) break;
      i = o;
    }
    r++;
  }
  return { attrs: n, classes: e };
}
function U(t) {
  return wi(() => {
    let n = ep(t),
      e = he(w({}, n), {
        decls: t.decls,
        vars: t.vars,
        template: t.template,
        consts: t.consts || null,
        ngContentSelectors: t.ngContentSelectors,
        onPush: t.changeDetection === Gh.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (n.standalone && t.dependencies) || null,
        getStandaloneInjector: null,
        signals: t.signals ?? !1,
        data: t.data || {},
        encapsulation: t.encapsulation || xt.Emulated,
        styles: t.styles || Fe,
        _: null,
        schemas: t.schemas || null,
        tView: null,
        id: "",
      });
    tp(e);
    let r = t.dependencies;
    return (
      (e.directiveDefs = ih(r, !1)), (e.pipeDefs = ih(r, !0)), (e.id = Y0(e)), e
    );
  });
}
function K0(t) {
  return vn(t) || Yh(t);
}
function Q0(t) {
  return t !== null;
}
function Ye(t) {
  return wi(() => ({
    type: t.type,
    bootstrap: t.bootstrap || Fe,
    declarations: t.declarations || Fe,
    imports: t.imports || Fe,
    exports: t.exports || Fe,
    transitiveCompileScopes: null,
    schemas: t.schemas || null,
    id: t.id || null,
  }));
}
function rh(t, n) {
  if (t == null) return Mr;
  let e = {};
  for (let r in t)
    if (t.hasOwnProperty(r)) {
      let i = t[r],
        o,
        s,
        a = le.None;
      Array.isArray(i)
        ? ((a = i[0]), (o = i[1]), (s = i[2] ?? o))
        : ((o = i), (s = i)),
        n ? ((e[o] = a !== le.None ? [r, a] : r), (n[o] = s)) : (e[o] = r);
    }
  return e;
}
function dt(t) {
  return wi(() => {
    let n = ep(t);
    return tp(n), n;
  });
}
function vn(t) {
  return t[p0] || null;
}
function Yh(t) {
  return t[m0] || null;
}
function Zh(t) {
  return t[g0] || null;
}
function Xh(t) {
  let n = vn(t) || Yh(t) || Zh(t);
  return n !== null ? n.standalone : !1;
}
function Jh(t, n) {
  let e = t[y0] || null;
  if (!e && n === !0)
    throw new Error(`Type ${Le(t)} does not have '\u0275mod' property.`);
  return e;
}
function ep(t) {
  let n = {};
  return {
    type: t.type,
    providersResolver: null,
    factory: null,
    hostBindings: t.hostBindings || null,
    hostVars: t.hostVars || 0,
    hostAttrs: t.hostAttrs || null,
    contentQueries: t.contentQueries || null,
    declaredInputs: n,
    inputTransforms: null,
    inputConfig: t.inputs || Mr,
    exportAs: t.exportAs || null,
    standalone: t.standalone === !0,
    signals: t.signals === !0,
    selectors: t.selectors || Fe,
    viewQuery: t.viewQuery || null,
    features: t.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: rh(t.inputs, n),
    outputs: rh(t.outputs),
    debugInfo: null,
  };
}
function tp(t) {
  t.features?.forEach((n) => n(t));
}
function ih(t, n) {
  if (!t) return null;
  let e = n ? Zh : K0;
  return () => (typeof t == "function" ? t() : t).map((r) => e(r)).filter(Q0);
}
function Y0(t) {
  let n = 0,
    e = [
      t.selectors,
      t.ngContentSelectors,
      t.hostVars,
      t.hostAttrs,
      t.consts,
      t.vars,
      t.decls,
      t.encapsulation,
      t.standalone,
      t.signals,
      t.exportAs,
      JSON.stringify(t.inputs),
      JSON.stringify(t.outputs),
      Object.getOwnPropertyNames(t.type.prototype),
      !!t.contentQueries,
      !!t.viewQuery,
    ].join("|");
  for (let i of e) n = (Math.imul(31, n) + i.charCodeAt(0)) << 0;
  return (n += 2147483648), "c" + n;
}
function Gn(t) {
  return { ɵproviders: t };
}
function Z0(...t) {
  return { ɵproviders: np(!0, t), ɵfromNgModule: !0 };
}
function np(t, ...n) {
  let e = [],
    r = new Set(),
    i,
    o = (s) => {
      e.push(s);
    };
  return (
    Cc(n, (s) => {
      let a = s;
      xl(a, o, [], r) && ((i ||= []), i.push(a));
    }),
    i !== void 0 && rp(i, o),
    e
  );
}
function rp(t, n) {
  for (let e = 0; e < t.length; e++) {
    let { ngModule: r, providers: i } = t[e];
    _c(i, (o) => {
      n(o, r);
    });
  }
}
function xl(t, n, e, r) {
  if (((t = lt(t)), !t)) return !1;
  let i = null,
    o = Zf(t),
    s = !o && vn(t);
  if (!o && !s) {
    let l = t.ngModule;
    if (((o = Zf(l)), o)) i = l;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    i = t;
  }
  let a = r.has(i);
  if (s) {
    if (a) return !1;
    if ((r.add(i), s.dependencies)) {
      let l =
        typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let c of l) xl(c, n, e, r);
    }
  } else if (o) {
    if (o.imports != null && !a) {
      r.add(i);
      let c;
      try {
        Cc(o.imports, (u) => {
          xl(u, n, e, r) && ((c ||= []), c.push(u));
        });
      } finally {
      }
      c !== void 0 && rp(c, n);
    }
    if (!a) {
      let c = Tr(i) || (() => new i());
      n({ provide: i, useFactory: c, deps: Fe }, i),
        n({ provide: qh, useValue: i, multi: !0 }, i),
        n({ provide: Bn, useValue: () => B(i), multi: !0 }, i);
    }
    let l = o.providers;
    if (l != null && !a) {
      let c = t;
      _c(l, (u) => {
        n(u, c);
      });
    }
  } else return !1;
  return i !== t && t.providers !== void 0;
}
function _c(t, n) {
  for (let e of t)
    Bh(e) && (e = e.ɵproviders), Array.isArray(e) ? _c(e, n) : n(e);
}
var X0 = se({ provide: String, useValue: se });
function ip(t) {
  return t !== null && typeof t == "object" && X0 in t;
}
function J0(t) {
  return !!(t && t.useExisting);
}
function eE(t) {
  return !!(t && t.useFactory);
}
function Nl(t) {
  return typeof t == "function";
}
var Is = new k(""),
  Wo = {},
  tE = {},
  dl;
function Sc() {
  return dl === void 0 && (dl = new es()), dl;
}
var ct = class {},
  di = class extends ct {
    get destroyed() {
      return this._destroyed;
    }
    constructor(n, e, r, i) {
      super(),
        (this.parent = e),
        (this.source = r),
        (this.scopes = i),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        Ol(n, (s) => this.processProvider(s)),
        this.records.set(Wh, Cr(void 0, this)),
        i.has("environment") && this.records.set(ct, Cr(void 0, this));
      let o = this.records.get(Is);
      o != null && typeof o.value == "string" && this.scopes.add(o.value),
        (this.injectorDefTypes = new Set(this.get(qh, Fe, V.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      let n = J(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let e = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of e) r();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          J(n);
      }
    }
    onDestroy(n) {
      return (
        this.assertNotDestroyed(),
        this._onDestroyHooks.push(n),
        () => this.removeOnDestroy(n)
      );
    }
    runInContext(n) {
      this.assertNotDestroyed();
      let e = gn(this),
        r = at(void 0),
        i;
      try {
        return n();
      } finally {
        gn(e), at(r);
      }
    }
    get(n, e = ci, r = V.Default) {
      if ((this.assertNotDestroyed(), n.hasOwnProperty(Jf))) return n[Jf](this);
      r = Cs(r);
      let i,
        o = gn(this),
        s = at(void 0);
      try {
        if (!(r & V.SkipSelf)) {
          let l = this.records.get(n);
          if (l === void 0) {
            let c = aE(n) && Ds(n);
            c && this.injectableDefInScope(c)
              ? (l = Cr(Rl(n), Wo))
              : (l = null),
              this.records.set(n, l);
          }
          if (l != null) return this.hydrate(n, l);
        }
        let a = r & V.Self ? Sc() : this.parent;
        return (e = r & V.Optional && e === ci ? null : e), a.get(n, e);
      } catch (a) {
        if (a.name === "NullInjectorError") {
          if (((a[Xo] = a[Xo] || []).unshift(Le(n)), o)) throw a;
          return T0(a, n, "R3InjectorError", this.source);
        } else throw a;
      } finally {
        at(s), gn(o);
      }
    }
    resolveInjectorInitializers() {
      let n = J(null),
        e = gn(this),
        r = at(void 0),
        i;
      try {
        let o = this.get(Bn, Fe, V.Self);
        for (let s of o) s();
      } finally {
        gn(e), at(r), J(n);
      }
    }
    toString() {
      let n = [],
        e = this.records;
      for (let r of e.keys()) n.push(Le(r));
      return `R3Injector[${n.join(", ")}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new v(205, !1);
    }
    processProvider(n) {
      n = lt(n);
      let e = Nl(n) ? n : lt(n && n.provide),
        r = rE(n);
      if (!Nl(n) && n.multi === !0) {
        let i = this.records.get(e);
        i ||
          ((i = Cr(void 0, Wo, !0)),
          (i.factory = () => Ml(i.multi)),
          this.records.set(e, i)),
          (e = n),
          i.multi.push(n);
      }
      this.records.set(e, r);
    }
    hydrate(n, e) {
      let r = J(null);
      try {
        return (
          e.value === Wo && ((e.value = tE), (e.value = e.factory())),
          typeof e.value == "object" &&
            e.value &&
            sE(e.value) &&
            this._ngOnDestroyHooks.add(e.value),
          e.value
        );
      } finally {
        J(r);
      }
    }
    injectableDefInScope(n) {
      if (!n.providedIn) return !1;
      let e = lt(n.providedIn);
      return typeof e == "string"
        ? e === "any" || this.scopes.has(e)
        : this.injectorDefTypes.has(e);
    }
    removeOnDestroy(n) {
      let e = this._onDestroyHooks.indexOf(n);
      e !== -1 && this._onDestroyHooks.splice(e, 1);
    }
  };
function Rl(t) {
  let n = Ds(t),
    e = n !== null ? n.factory : Tr(t);
  if (e !== null) return e;
  if (t instanceof k) throw new v(204, !1);
  if (t instanceof Function) return nE(t);
  throw new v(204, !1);
}
function nE(t) {
  if (t.length > 0) throw new v(204, !1);
  let e = f0(t);
  return e !== null ? () => e.factory(t) : () => new t();
}
function rE(t) {
  if (ip(t)) return Cr(void 0, t.useValue);
  {
    let n = iE(t);
    return Cr(n, Wo);
  }
}
function iE(t, n, e) {
  let r;
  if (Nl(t)) {
    let i = lt(t);
    return Tr(i) || Rl(i);
  } else if (ip(t)) r = () => lt(t.useValue);
  else if (eE(t)) r = () => t.useFactory(...Ml(t.deps || []));
  else if (J0(t)) r = () => B(lt(t.useExisting));
  else {
    let i = lt(t && (t.useClass || t.provide));
    if (oE(t)) r = () => new i(...Ml(t.deps));
    else return Tr(i) || Rl(i);
  }
  return r;
}
function Cr(t, n, e = !1) {
  return { factory: t, value: n, multi: e ? [] : void 0 };
}
function oE(t) {
  return !!t.deps;
}
function sE(t) {
  return (
    t !== null && typeof t == "object" && typeof t.ngOnDestroy == "function"
  );
}
function aE(t) {
  return typeof t == "function" || (typeof t == "object" && t instanceof k);
}
function Ol(t, n) {
  for (let e of t)
    Array.isArray(e) ? Ol(e, n) : e && Bh(e) ? Ol(e.ɵproviders, n) : n(e);
}
function wn(t, n) {
  t instanceof di && t.assertNotDestroyed();
  let e,
    r = gn(t),
    i = at(void 0);
  try {
    return n();
  } finally {
    gn(r), at(i);
  }
}
function lE() {
  return Uh() !== void 0 || I0() != null;
}
function cE(t) {
  return typeof t == "function";
}
var Ge = 0,
  L = 1,
  x = 2,
  _e = 3,
  Et = 4,
  Ze = 5,
  ut = 6,
  fi = 7,
  Dt = 8,
  Ar = 9,
  wt = 10,
  ae = 11,
  hi = 12,
  oh = 13,
  Fr = 14,
  Ke = 15,
  bi = 16,
  br = 17,
  Zt = 18,
  _s = 19,
  op = 20,
  yn = 21,
  fl = 22,
  Un = 23,
  ke = 25,
  sp = 1,
  pi = 6,
  Xt = 7,
  ts = 8,
  xr = 9,
  Ve = 10,
  Tc = (function (t) {
    return (
      (t[(t.None = 0)] = "None"),
      (t[(t.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      t
    );
  })(Tc || {});
function Yt(t) {
  return Array.isArray(t) && typeof t[sp] == "object";
}
function Rt(t) {
  return Array.isArray(t) && t[sp] === !0;
}
function Mc(t) {
  return (t.flags & 4) !== 0;
}
function Ii(t) {
  return t.componentOffset > -1;
}
function Ss(t) {
  return (t.flags & 1) === 1;
}
function $n(t) {
  return !!t.template;
}
function ap(t) {
  return (t[x] & 512) !== 0;
}
var Pl = class {
  constructor(n, e, r) {
    (this.previousValue = n), (this.currentValue = e), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function lp(t, n, e, r) {
  n !== null ? n.applyValueToInputSignal(n, r) : (t[e] = r);
}
function Kn() {
  return cp;
}
function cp(t) {
  return t.type.prototype.ngOnChanges && (t.setInput = dE), uE;
}
Kn.ngInherit = !0;
function uE() {
  let t = dp(this),
    n = t?.current;
  if (n) {
    let e = t.previous;
    if (e === Mr) t.previous = n;
    else for (let r in n) e[r] = n[r];
    (t.current = null), this.ngOnChanges(n);
  }
}
function dE(t, n, e, r, i) {
  let o = this.declaredInputs[r],
    s = dp(t) || fE(t, { previous: Mr, current: null }),
    a = s.current || (s.current = {}),
    l = s.previous,
    c = l[o];
  (a[o] = new Pl(c && c.currentValue, e, l === Mr)), lp(t, n, i, e);
}
var up = "__ngSimpleChanges__";
function dp(t) {
  return t[up] || null;
}
function fE(t, n) {
  return (t[up] = n);
}
var sh = null;
var Mt = function (t, n, e) {
    sh?.(t, n, e);
  },
  fp = "svg",
  hE = "math",
  pE = !1;
function mE() {
  return pE;
}
function Ct(t) {
  for (; Array.isArray(t); ) t = t[Ge];
  return t;
}
function hp(t, n) {
  return Ct(n[t]);
}
function Xe(t, n) {
  return Ct(n[t.index]);
}
function pp(t, n) {
  return t.data[n];
}
function Cn(t, n) {
  let e = n[t];
  return Yt(e) ? e : e[Ge];
}
function gE(t) {
  return (t[x] & 4) === 4;
}
function Ac(t) {
  return (t[x] & 128) === 128;
}
function yE(t) {
  return Rt(t[_e]);
}
function Nr(t, n) {
  return n == null ? null : t[n];
}
function mp(t) {
  t[br] = 0;
}
function vE(t) {
  t[x] & 1024 || ((t[x] |= 1024), Ac(t) && mi(t));
}
function EE(t, n) {
  for (; t > 0; ) (n = n[Fr]), t--;
  return n;
}
function xc(t) {
  return !!(t[x] & 9216 || t[Un]?.dirty);
}
function Fl(t) {
  t[wt].changeDetectionScheduler?.notify(1),
    xc(t)
      ? mi(t)
      : t[x] & 64 &&
        (mE()
          ? ((t[x] |= 1024), mi(t))
          : t[wt].changeDetectionScheduler?.notify());
}
function mi(t) {
  t[wt].changeDetectionScheduler?.notify();
  let n = gi(t);
  for (; n !== null && !(n[x] & 8192 || ((n[x] |= 8192), !Ac(n))); ) n = gi(n);
}
function gp(t, n) {
  if ((t[x] & 256) === 256) throw new v(911, !1);
  t[yn] === null && (t[yn] = []), t[yn].push(n);
}
function DE(t, n) {
  if (t[yn] === null) return;
  let e = t[yn].indexOf(n);
  e !== -1 && t[yn].splice(e, 1);
}
function gi(t) {
  let n = t[_e];
  return Rt(n) ? n[_e] : n;
}
var j = { lFrame: bp(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
function wE() {
  return j.lFrame.elementDepthCount;
}
function CE() {
  j.lFrame.elementDepthCount++;
}
function bE() {
  j.lFrame.elementDepthCount--;
}
function yp() {
  return j.bindingsEnabled;
}
function Lr() {
  return j.skipHydrationRootTNode !== null;
}
function IE(t) {
  return j.skipHydrationRootTNode === t;
}
function _E(t) {
  j.skipHydrationRootTNode = t;
}
function SE() {
  j.skipHydrationRootTNode = null;
}
function K() {
  return j.lFrame.lView;
}
function Ne() {
  return j.lFrame.tView;
}
function nn(t) {
  return (j.lFrame.contextLView = t), t[Dt];
}
function rn(t) {
  return (j.lFrame.contextLView = null), t;
}
function Je() {
  let t = vp();
  for (; t !== null && t.type === 64; ) t = t.parent;
  return t;
}
function vp() {
  return j.lFrame.currentTNode;
}
function TE() {
  let t = j.lFrame,
    n = t.currentTNode;
  return t.isParent ? n : n.parent;
}
function Qn(t, n) {
  let e = j.lFrame;
  (e.currentTNode = t), (e.isParent = n);
}
function Nc() {
  return j.lFrame.isParent;
}
function Rc() {
  j.lFrame.isParent = !1;
}
function Ts() {
  let t = j.lFrame,
    n = t.bindingRootIndex;
  return n === -1 && (n = t.bindingRootIndex = t.tView.bindingStartIndex), n;
}
function ME(t) {
  return (j.lFrame.bindingIndex = t);
}
function Oc() {
  return j.lFrame.bindingIndex++;
}
function Ep(t) {
  let n = j.lFrame,
    e = n.bindingIndex;
  return (n.bindingIndex = n.bindingIndex + t), e;
}
function AE() {
  return j.lFrame.inI18n;
}
function xE(t, n) {
  let e = j.lFrame;
  (e.bindingIndex = e.bindingRootIndex = t), Ll(n);
}
function NE() {
  return j.lFrame.currentDirectiveIndex;
}
function Ll(t) {
  j.lFrame.currentDirectiveIndex = t;
}
function RE(t) {
  let n = j.lFrame.currentDirectiveIndex;
  return n === -1 ? null : t[n];
}
function Dp() {
  return j.lFrame.currentQueryIndex;
}
function Pc(t) {
  j.lFrame.currentQueryIndex = t;
}
function OE(t) {
  let n = t[L];
  return n.type === 2 ? n.declTNode : n.type === 1 ? t[Ze] : null;
}
function wp(t, n, e) {
  if (e & V.SkipSelf) {
    let i = n,
      o = t;
    for (; (i = i.parent), i === null && !(e & V.Host); )
      if (((i = OE(o)), i === null || ((o = o[Fr]), i.type & 10))) break;
    if (i === null) return !1;
    (n = i), (t = o);
  }
  let r = (j.lFrame = Cp());
  return (r.currentTNode = n), (r.lView = t), !0;
}
function Fc(t) {
  let n = Cp(),
    e = t[L];
  (j.lFrame = n),
    (n.currentTNode = e.firstChild),
    (n.lView = t),
    (n.tView = e),
    (n.contextLView = t),
    (n.bindingIndex = e.bindingStartIndex),
    (n.inI18n = !1);
}
function Cp() {
  let t = j.lFrame,
    n = t === null ? null : t.child;
  return n === null ? bp(t) : n;
}
function bp(t) {
  let n = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: t,
    child: null,
    inI18n: !1,
  };
  return t !== null && (t.child = n), n;
}
function Ip() {
  let t = j.lFrame;
  return (j.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
}
var _p = Ip;
function Lc() {
  let t = Ip();
  (t.isParent = !0),
    (t.tView = null),
    (t.selectedIndex = -1),
    (t.contextLView = null),
    (t.elementDepthCount = 0),
    (t.currentDirectiveIndex = -1),
    (t.currentNamespace = null),
    (t.bindingRootIndex = -1),
    (t.bindingIndex = -1),
    (t.currentQueryIndex = 0);
}
function PE(t) {
  return (j.lFrame.contextLView = EE(t, j.lFrame.contextLView))[Dt];
}
function Yn() {
  return j.lFrame.selectedIndex;
}
function Hn(t) {
  j.lFrame.selectedIndex = t;
}
function Sp() {
  let t = j.lFrame;
  return pp(t.tView, t.selectedIndex);
}
function bn() {
  j.lFrame.currentNamespace = fp;
}
function Tp() {
  return j.lFrame.currentNamespace;
}
var Mp = !0;
function Ms() {
  return Mp;
}
function Ot(t) {
  Mp = t;
}
function FE(t, n, e) {
  let { ngOnChanges: r, ngOnInit: i, ngDoCheck: o } = n.type.prototype;
  if (r) {
    let s = cp(n);
    (e.preOrderHooks ??= []).push(t, s),
      (e.preOrderCheckHooks ??= []).push(t, s);
  }
  i && (e.preOrderHooks ??= []).push(0 - t, i),
    o &&
      ((e.preOrderHooks ??= []).push(t, o),
      (e.preOrderCheckHooks ??= []).push(t, o));
}
function As(t, n) {
  for (let e = n.directiveStart, r = n.directiveEnd; e < r; e++) {
    let o = t.data[e].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: l,
        ngAfterViewChecked: c,
        ngOnDestroy: u,
      } = o;
    s && (t.contentHooks ??= []).push(-e, s),
      a &&
        ((t.contentHooks ??= []).push(e, a),
        (t.contentCheckHooks ??= []).push(e, a)),
      l && (t.viewHooks ??= []).push(-e, l),
      c &&
        ((t.viewHooks ??= []).push(e, c), (t.viewCheckHooks ??= []).push(e, c)),
      u != null && (t.destroyHooks ??= []).push(e, u);
  }
}
function qo(t, n, e) {
  Ap(t, n, 3, e);
}
function Go(t, n, e, r) {
  (t[x] & 3) === e && Ap(t, n, e, r);
}
function hl(t, n) {
  let e = t[x];
  (e & 3) === n && ((e &= 16383), (e += 1), (t[x] = e));
}
function Ap(t, n, e, r) {
  let i = r !== void 0 ? t[br] & 65535 : 0,
    o = r ?? -1,
    s = n.length - 1,
    a = 0;
  for (let l = i; l < s; l++)
    if (typeof n[l + 1] == "number") {
      if (((a = n[l]), r != null && a >= r)) break;
    } else
      n[l] < 0 && (t[br] += 65536),
        (a < o || o == -1) &&
          (LE(t, e, n, l), (t[br] = (t[br] & 4294901760) + l + 2)),
        l++;
}
function ah(t, n) {
  Mt(4, t, n);
  let e = J(null);
  try {
    n.call(t);
  } finally {
    J(e), Mt(5, t, n);
  }
}
function LE(t, n, e, r) {
  let i = e[r] < 0,
    o = e[r + 1],
    s = i ? -e[r] : e[r],
    a = t[s];
  i
    ? t[x] >> 14 < t[br] >> 16 &&
      (t[x] & 3) === n &&
      ((t[x] += 16384), ah(a, o))
    : ah(a, o);
}
var Sr = -1,
  yi = class {
    constructor(n, e, r) {
      (this.factory = n),
        (this.resolving = !1),
        (this.canSeeViewProviders = e),
        (this.injectImpl = r);
    }
  };
function kE(t) {
  return t instanceof yi;
}
function jE(t) {
  return (t.flags & 8) !== 0;
}
function VE(t) {
  return (t.flags & 16) !== 0;
}
function xp(t) {
  return t !== Sr;
}
function ns(t) {
  return t & 32767;
}
function BE(t) {
  return t >> 16;
}
function rs(t, n) {
  let e = BE(t),
    r = n;
  for (; e > 0; ) (r = r[Fr]), e--;
  return r;
}
var kl = !0;
function lh(t) {
  let n = kl;
  return (kl = t), n;
}
var UE = 256,
  Np = UE - 1,
  Rp = 5,
  $E = 0,
  At = {};
function HE(t, n, e) {
  let r;
  typeof e == "string"
    ? (r = e.charCodeAt(0) || 0)
    : e.hasOwnProperty(li) && (r = e[li]),
    r == null && (r = e[li] = $E++);
  let i = r & Np,
    o = 1 << i;
  n.data[t + (i >> Rp)] |= o;
}
function Op(t, n) {
  let e = Pp(t, n);
  if (e !== -1) return e;
  let r = n[L];
  r.firstCreatePass &&
    ((t.injectorIndex = n.length),
    pl(r.data, t),
    pl(n, null),
    pl(r.blueprint, null));
  let i = kc(t, n),
    o = t.injectorIndex;
  if (xp(i)) {
    let s = ns(i),
      a = rs(i, n),
      l = a[L].data;
    for (let c = 0; c < 8; c++) n[o + c] = a[s + c] | l[s + c];
  }
  return (n[o + 8] = i), o;
}
function pl(t, n) {
  t.push(0, 0, 0, 0, 0, 0, 0, 0, n);
}
function Pp(t, n) {
  return t.injectorIndex === -1 ||
    (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
    n[t.injectorIndex + 8] === null
    ? -1
    : t.injectorIndex;
}
function kc(t, n) {
  if (t.parent && t.parent.injectorIndex !== -1) return t.parent.injectorIndex;
  let e = 0,
    r = null,
    i = n;
  for (; i !== null; ) {
    if (((r = Vp(i)), r === null)) return Sr;
    if ((e++, (i = i[Fr]), r.injectorIndex !== -1))
      return r.injectorIndex | (e << 16);
  }
  return Sr;
}
function zE(t, n, e) {
  HE(t, n, e);
}
function Fp(t, n, e) {
  if (e & V.Optional || t !== void 0) return t;
  Dc(n, "NodeInjector");
}
function Lp(t, n, e, r) {
  if (
    (e & V.Optional && r === void 0 && (r = null), !(e & (V.Self | V.Host)))
  ) {
    let i = t[Ar],
      o = at(void 0);
    try {
      return i ? i.get(n, r, e & V.Optional) : $h(n, r, e & V.Optional);
    } finally {
      at(o);
    }
  }
  return Fp(r, n, e);
}
function kp(t, n, e, r = V.Default, i) {
  if (t !== null) {
    if (n[x] & 2048 && !(r & V.Self)) {
      let s = KE(t, n, e, r, At);
      if (s !== At) return s;
    }
    let o = jp(t, n, e, r, At);
    if (o !== At) return o;
  }
  return Lp(n, e, r, i);
}
function jp(t, n, e, r, i) {
  let o = qE(e);
  if (typeof o == "function") {
    if (!wp(n, t, r)) return r & V.Host ? Fp(i, e, r) : Lp(n, e, r, i);
    try {
      let s;
      if (((s = o(r)), s == null && !(r & V.Optional))) Dc(e);
      else return s;
    } finally {
      _p();
    }
  } else if (typeof o == "number") {
    let s = null,
      a = Pp(t, n),
      l = Sr,
      c = r & V.Host ? n[Ke][Ze] : null;
    for (
      (a === -1 || r & V.SkipSelf) &&
      ((l = a === -1 ? kc(t, n) : n[a + 8]),
      l === Sr || !uh(r, !1)
        ? (a = -1)
        : ((s = n[L]), (a = ns(l)), (n = rs(l, n))));
      a !== -1;

    ) {
      let u = n[L];
      if (ch(o, a, u.data)) {
        let d = WE(a, n, e, s, r, c);
        if (d !== At) return d;
      }
      (l = n[a + 8]),
        l !== Sr && uh(r, n[L].data[a + 8] === c) && ch(o, a, n)
          ? ((s = u), (a = ns(l)), (n = rs(l, n)))
          : (a = -1);
    }
  }
  return i;
}
function WE(t, n, e, r, i, o) {
  let s = n[L],
    a = s.data[t + 8],
    l = r == null ? Ii(a) && kl : r != s && (a.type & 3) !== 0,
    c = i & V.Host && o === a,
    u = Ko(a, s, e, l, c);
  return u !== null ? Rr(n, s, u, a) : At;
}
function Ko(t, n, e, r, i) {
  let o = t.providerIndexes,
    s = n.data,
    a = o & 1048575,
    l = t.directiveStart,
    c = t.directiveEnd,
    u = o >> 20,
    d = r ? a : a + u,
    f = i ? a + u : c;
  for (let h = d; h < f; h++) {
    let p = s[h];
    if ((h < l && e === p) || (h >= l && p.type === e)) return h;
  }
  if (i) {
    let h = s[l];
    if (h && $n(h) && h.type === e) return l;
  }
  return null;
}
function Rr(t, n, e, r) {
  let i = t[e],
    o = n.data;
  if (kE(i)) {
    let s = i;
    s.resolving && E0(v0(o[e]));
    let a = lh(s.canSeeViewProviders);
    s.resolving = !0;
    let l,
      c = s.injectImpl ? at(s.injectImpl) : null,
      u = wp(t, r, V.Default);
    try {
      (i = t[e] = s.factory(void 0, o, t, r)),
        n.firstCreatePass && e >= r.directiveStart && FE(e, o[e], n);
    } finally {
      c !== null && at(c), lh(a), (s.resolving = !1), _p();
    }
  }
  return i;
}
function qE(t) {
  if (typeof t == "string") return t.charCodeAt(0) || 0;
  let n = t.hasOwnProperty(li) ? t[li] : void 0;
  return typeof n == "number" ? (n >= 0 ? n & Np : GE) : n;
}
function ch(t, n, e) {
  let r = 1 << t;
  return !!(e[n + (t >> Rp)] & r);
}
function uh(t, n) {
  return !(t & V.Self) && !(t & V.Host && n);
}
var Vn = class {
  constructor(n, e) {
    (this._tNode = n), (this._lView = e);
  }
  get(n, e, r) {
    return kp(this._tNode, this._lView, n, Cs(r), e);
  }
};
function GE() {
  return new Vn(Je(), K());
}
function bt(t) {
  return wi(() => {
    let n = t.prototype.constructor,
      e = n[Zo] || jl(n),
      r = Object.prototype,
      i = Object.getPrototypeOf(t.prototype).constructor;
    for (; i && i !== r; ) {
      let o = i[Zo] || jl(i);
      if (o && o !== e) return o;
      i = Object.getPrototypeOf(i);
    }
    return (o) => new o();
  });
}
function jl(t) {
  return Lh(t)
    ? () => {
        let n = jl(lt(t));
        return n && n();
      }
    : Tr(t);
}
function KE(t, n, e, r, i) {
  let o = t,
    s = n;
  for (; o !== null && s !== null && s[x] & 2048 && !(s[x] & 512); ) {
    let a = jp(o, s, e, r | V.Self, At);
    if (a !== At) return a;
    let l = o.parent;
    if (!l) {
      let c = s[op];
      if (c) {
        let u = c.get(e, At, r);
        if (u !== At) return u;
      }
      (l = Vp(s)), (s = s[Fr]);
    }
    o = l;
  }
  return i;
}
function Vp(t) {
  let n = t[L],
    e = n.type;
  return e === 2 ? n.declTNode : e === 1 ? t[Ze] : null;
}
function dh(t, n = null, e = null, r) {
  let i = Bp(t, n, e, r);
  return i.resolveInjectorInitializers(), i;
}
function Bp(t, n = null, e = null, r, i = new Set()) {
  let o = [e || Fe, Z0(t)];
  return (
    (r = r || (typeof t == "object" ? void 0 : Le(t))),
    new di(o, n || Sc(), r || null, i)
  );
}
var Zn = (() => {
  class t {
    static {
      this.THROW_IF_NOT_FOUND = ci;
    }
    static {
      this.NULL = new es();
    }
    static create(e, r) {
      if (Array.isArray(e)) return dh({ name: "" }, r, e, "");
      {
        let i = e.name ?? "";
        return dh({ name: i }, e.parent, e.providers, i);
      }
    }
    static {
      this.ɵprov = S({ token: t, providedIn: "any", factory: () => B(Wh) });
    }
    static {
      this.__NG_ELEMENT_ID__ = -1;
    }
  }
  return t;
})();
var QE = "ngOriginalError";
function ml(t) {
  return t[QE];
}
var Jt = class {
    constructor() {
      this._console = console;
    }
    handleError(n) {
      let e = this._findOriginalError(n);
      this._console.error("ERROR", n),
        e && this._console.error("ORIGINAL ERROR", e);
    }
    _findOriginalError(n) {
      let e = n && ml(n);
      for (; e && ml(e); ) e = ml(e);
      return e || null;
    }
  },
  Up = new k("", {
    providedIn: "root",
    factory: () => E(Jt).handleError.bind(void 0),
  }),
  $p = (() => {
    class t {
      static {
        this.__NG_ELEMENT_ID__ = YE;
      }
      static {
        this.__NG_ENV_ID__ = (e) => e;
      }
    }
    return t;
  })(),
  Vl = class extends $p {
    constructor(n) {
      super(), (this._lView = n);
    }
    onDestroy(n) {
      return gp(this._lView, n), () => DE(this._lView, n);
    }
  };
function YE() {
  return new Vl(K());
}
function ZE() {
  return kr(Je(), K());
}
function kr(t, n) {
  return new Re(Xe(t, n));
}
var Re = (() => {
  class t {
    constructor(e) {
      this.nativeElement = e;
    }
    static {
      this.__NG_ELEMENT_ID__ = ZE;
    }
  }
  return t;
})();
function XE(t) {
  return t instanceof Re ? t.nativeElement : t;
}
var Bl = class extends Se {
  constructor(n = !1) {
    super(),
      (this.destroyRef = void 0),
      (this.__isAsync = n),
      lE() && (this.destroyRef = E($p, { optional: !0 }) ?? void 0);
  }
  emit(n) {
    let e = J(null);
    try {
      super.next(n);
    } finally {
      J(e);
    }
  }
  subscribe(n, e, r) {
    let i = n,
      o = e || (() => null),
      s = r;
    if (n && typeof n == "object") {
      let l = n;
      (i = l.next?.bind(l)), (o = l.error?.bind(l)), (s = l.complete?.bind(l));
    }
    this.__isAsync && ((o = gl(o)), i && (i = gl(i)), s && (s = gl(s)));
    let a = super.subscribe({ next: i, error: o, complete: s });
    return n instanceof ge && n.add(a), a;
  }
};
function gl(t) {
  return (n) => {
    setTimeout(t, void 0, n);
  };
}
var Ee = Bl;
function JE() {
  return this._results[Symbol.iterator]();
}
var Ul = class t {
    get changes() {
      return (this._changes ??= new Ee());
    }
    constructor(n = !1) {
      (this._emitDistinctChangesOnly = n),
        (this.dirty = !0),
        (this._onDirty = void 0),
        (this._results = []),
        (this._changesDetected = !1),
        (this._changes = void 0),
        (this.length = 0),
        (this.first = void 0),
        (this.last = void 0);
      let e = t.prototype;
      e[Symbol.iterator] || (e[Symbol.iterator] = JE);
    }
    get(n) {
      return this._results[n];
    }
    map(n) {
      return this._results.map(n);
    }
    filter(n) {
      return this._results.filter(n);
    }
    find(n) {
      return this._results.find(n);
    }
    reduce(n, e) {
      return this._results.reduce(n, e);
    }
    forEach(n) {
      this._results.forEach(n);
    }
    some(n) {
      return this._results.some(n);
    }
    toArray() {
      return this._results.slice();
    }
    toString() {
      return this._results.toString();
    }
    reset(n, e) {
      this.dirty = !1;
      let r = x0(n);
      (this._changesDetected = !A0(this._results, r, e)) &&
        ((this._results = r),
        (this.length = r.length),
        (this.last = r[this.length - 1]),
        (this.first = r[0]));
    }
    notifyOnChanges() {
      this._changes !== void 0 &&
        (this._changesDetected || !this._emitDistinctChangesOnly) &&
        this._changes.emit(this);
    }
    onDirty(n) {
      this._onDirty = n;
    }
    setDirty() {
      (this.dirty = !0), this._onDirty?.();
    }
    destroy() {
      this._changes !== void 0 &&
        (this._changes.complete(), this._changes.unsubscribe());
    }
  },
  eD = "ngSkipHydration",
  tD = "ngskiphydration";
function Hp(t) {
  let n = t.mergedAttrs;
  if (n === null) return !1;
  for (let e = 0; e < n.length; e += 2) {
    let r = n[e];
    if (typeof r == "number") return !1;
    if (typeof r == "string" && r.toLowerCase() === tD) return !0;
  }
  return !1;
}
function zp(t) {
  return t.hasAttribute(eD);
}
function is(t) {
  return (t.flags & 128) === 128;
}
function nD(t) {
  if (is(t)) return !0;
  let n = t.parent;
  for (; n; ) {
    if (is(t) || Hp(n)) return !0;
    n = n.parent;
  }
  return !1;
}
var Wp = new Map(),
  rD = 0;
function iD() {
  return rD++;
}
function oD(t) {
  Wp.set(t[_s], t);
}
function sD(t) {
  Wp.delete(t[_s]);
}
var fh = "__ngContext__";
function En(t, n) {
  Yt(n) ? ((t[fh] = n[_s]), oD(n)) : (t[fh] = n);
}
function qp(t) {
  return Kp(t[hi]);
}
function Gp(t) {
  return Kp(t[Et]);
}
function Kp(t) {
  for (; t !== null && !Rt(t); ) t = t[Et];
  return t;
}
var $l;
function Qp(t) {
  $l = t;
}
function xs() {
  if ($l !== void 0) return $l;
  if (typeof document < "u") return document;
  throw new v(210, !1);
}
var Ns = new k("", { providedIn: "root", factory: () => aD }),
  aD = "ng",
  jc = new k(""),
  Be = new k("", { providedIn: "platform", factory: () => "unknown" });
var Vc = new k(""),
  Bc = new k("", {
    providedIn: "root",
    factory: () =>
      xs().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
      null,
  });
function lD() {
  let t = new Xn();
  return E(Be) === "browser" && (t.store = cD(xs(), E(Ns))), t;
}
var Xn = (() => {
  class t {
    constructor() {
      (this.store = {}), (this.onSerializeCallbacks = {});
    }
    static {
      this.ɵprov = S({ token: t, providedIn: "root", factory: lD });
    }
    get(e, r) {
      return this.store[e] !== void 0 ? this.store[e] : r;
    }
    set(e, r) {
      this.store[e] = r;
    }
    remove(e) {
      delete this.store[e];
    }
    hasKey(e) {
      return this.store.hasOwnProperty(e);
    }
    get isEmpty() {
      return Object.keys(this.store).length === 0;
    }
    onSerialize(e, r) {
      this.onSerializeCallbacks[e] = r;
    }
    toJson() {
      for (let e in this.onSerializeCallbacks)
        if (this.onSerializeCallbacks.hasOwnProperty(e))
          try {
            this.store[e] = this.onSerializeCallbacks[e]();
          } catch (r) {
            console.warn("Exception in onSerialize callback: ", r);
          }
      return JSON.stringify(this.store).replace(/</g, "\\u003C");
    }
  }
  return t;
})();
function cD(t, n) {
  let e = t.getElementById(n + "-state");
  if (e?.textContent)
    try {
      return JSON.parse(e.textContent);
    } catch (r) {
      console.warn("Exception while restoring TransferState for app " + n, r);
    }
  return {};
}
var Yp = "h",
  Zp = "b",
  Hl = (function (t) {
    return (t.FirstChild = "f"), (t.NextSibling = "n"), t;
  })(Hl || {}),
  uD = "e",
  dD = "t",
  Uc = "c",
  Xp = "x",
  os = "r",
  fD = "i",
  hD = "n",
  pD = "d",
  mD = "__nghData__",
  Jp = mD,
  yl = "ngh",
  gD = "nghm",
  em = () => null;
function yD(t, n, e = !1) {
  let r = t.getAttribute(yl);
  if (r == null) return null;
  let [i, o] = r.split("|");
  if (((r = e ? o : i), !r)) return null;
  let s = o ? `|${o}` : "",
    a = e ? i : s,
    l = {};
  if (r !== "") {
    let u = n.get(Xn, null, { optional: !0 });
    u !== null && (l = u.get(Jp, [])[Number(r)]);
  }
  let c = { data: l, firstChild: t.firstChild ?? null };
  return (
    e && ((c.firstChild = t), Rs(c, 0, t.nextSibling)),
    a ? t.setAttribute(yl, a) : t.removeAttribute(yl),
    c
  );
}
function vD() {
  em = yD;
}
function $c(t, n, e = !1) {
  return em(t, n, e);
}
function ED(t) {
  let n = t._lView;
  return n[L].type === 2 ? null : (ap(n) && (n = n[ke]), n);
}
function DD(t) {
  return t.textContent?.replace(/\s/gm, "");
}
function wD(t) {
  let n = xs(),
    e = n.createNodeIterator(t, NodeFilter.SHOW_COMMENT, {
      acceptNode(o) {
        let s = DD(o);
        return s === "ngetn" || s === "ngtns"
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }),
    r,
    i = [];
  for (; (r = e.nextNode()); ) i.push(r);
  for (let o of i)
    o.textContent === "ngetn"
      ? o.replaceWith(n.createTextNode(""))
      : o.remove();
}
function Rs(t, n, e) {
  (t.segmentHeads ??= {}), (t.segmentHeads[n] = e);
}
function zl(t, n) {
  return t.segmentHeads?.[n] ?? null;
}
function CD(t, n) {
  let e = t.data,
    r = e[uD]?.[n] ?? null;
  return r === null && e[Uc]?.[n] && (r = Hc(t, n)), r;
}
function tm(t, n) {
  return t.data[Uc]?.[n] ?? null;
}
function Hc(t, n) {
  let e = tm(t, n) ?? [],
    r = 0;
  for (let i of e) r += i[os] * (i[Xp] ?? 1);
  return r;
}
function Os(t, n) {
  if (typeof t.disconnectedNodes > "u") {
    let e = t.data[pD];
    t.disconnectedNodes = e ? new Set(e) : null;
  }
  return !!t.disconnectedNodes?.has(n);
}
var Bo = new k(""),
  nm = !1,
  rm = new k("", { providedIn: "root", factory: () => nm }),
  bD = new k("");
var ss = class {
  constructor(n) {
    this.changingThisBreaksApplicationSecurity = n;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ph})`;
  }
};
function _i(t) {
  return t instanceof ss ? t.changingThisBreaksApplicationSecurity : t;
}
function im(t, n) {
  let e = ID(t);
  if (e != null && e !== n) {
    if (e === "ResourceURL" && n === "URL") return !0;
    throw new Error(`Required a safe ${n}, got a ${e} (see ${Ph})`);
  }
  return e === n;
}
function ID(t) {
  return (t instanceof ss && t.getTypeName()) || null;
}
var _D = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function om(t) {
  return (t = String(t)), t.match(_D) ? t : "unsafe:" + t;
}
var zc = (function (t) {
  return (
    (t[(t.NONE = 0)] = "NONE"),
    (t[(t.HTML = 1)] = "HTML"),
    (t[(t.STYLE = 2)] = "STYLE"),
    (t[(t.SCRIPT = 3)] = "SCRIPT"),
    (t[(t.URL = 4)] = "URL"),
    (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    t
  );
})(zc || {});
function sm(t) {
  let n = SD();
  return n ? n.sanitize(zc.URL, t) || "" : im(t, "URL") ? _i(t) : om(ws(t));
}
function SD() {
  let t = K();
  return t && t[wt].sanitizer;
}
var TD = /^>|^->|<!--|-->|--!>|<!-$/g,
  MD = /(<|>)/g,
  AD = "\u200B$1\u200B";
function xD(t) {
  return t.replace(TD, (n) => n.replace(MD, AD));
}
function ND(t) {
  return t.ownerDocument.body;
}
function am(t) {
  return t instanceof Function ? t() : t;
}
function Uo(t) {
  return (t ?? E(Zn)).get(Be) === "browser";
}
var Nt = (function (t) {
    return (
      (t[(t.Important = 1)] = "Important"),
      (t[(t.DashCase = 2)] = "DashCase"),
      t
    );
  })(Nt || {}),
  RD;
function Wc(t, n) {
  return RD(t, n);
}
function Ir(t, n, e, r, i) {
  if (r != null) {
    let o,
      s = !1;
    Rt(r) ? (o = r) : Yt(r) && ((s = !0), (r = r[Ge]));
    let a = Ct(r);
    t === 0 && e !== null
      ? i == null
        ? fm(n, e, a)
        : as(n, e, a, i || null, !0)
      : t === 1 && e !== null
      ? as(n, e, a, i || null, !0)
      : t === 2
      ? Qc(n, a, s)
      : t === 3 && n.destroyNode(a),
      o != null && GD(n, t, o, e, i);
  }
}
function qc(t, n) {
  return t.createText(n);
}
function OD(t, n, e) {
  t.setValue(n, e);
}
function Gc(t, n) {
  return t.createComment(xD(n));
}
function Ps(t, n, e) {
  return t.createElement(n, e);
}
function PD(t, n) {
  lm(t, n), (n[Ge] = null), (n[Ze] = null);
}
function FD(t, n, e, r, i, o) {
  (r[Ge] = i), (r[Ze] = n), Ls(t, r, e, 1, i, o);
}
function lm(t, n) {
  n[wt].changeDetectionScheduler?.notify(1), Ls(t, n, n[ae], 2, null, null);
}
function LD(t) {
  let n = t[hi];
  if (!n) return vl(t[L], t);
  for (; n; ) {
    let e = null;
    if (Yt(n)) e = n[hi];
    else {
      let r = n[Ve];
      r && (e = r);
    }
    if (!e) {
      for (; n && !n[Et] && n !== t; ) Yt(n) && vl(n[L], n), (n = n[_e]);
      n === null && (n = t), Yt(n) && vl(n[L], n), (e = n && n[Et]);
    }
    n = e;
  }
}
function kD(t, n, e, r) {
  let i = Ve + r,
    o = e.length;
  r > 0 && (e[i - 1][Et] = n),
    r < o - Ve
      ? ((n[Et] = e[i]), zh(e, Ve + r, n))
      : (e.push(n), (n[Et] = null)),
    (n[_e] = e);
  let s = n[bi];
  s !== null && e !== s && jD(s, n);
  let a = n[Zt];
  a !== null && a.insertView(t), Fl(n), (n[x] |= 128);
}
function jD(t, n) {
  let e = t[xr],
    i = n[_e][_e][Ke];
  n[Ke] !== i && (t[x] |= Tc.HasTransplantedViews),
    e === null ? (t[xr] = [n]) : e.push(n);
}
function cm(t, n) {
  let e = t[xr],
    r = e.indexOf(n);
  e.splice(r, 1);
}
function Wl(t, n) {
  if (t.length <= Ve) return;
  let e = Ve + n,
    r = t[e];
  if (r) {
    let i = r[bi];
    i !== null && i !== t && cm(i, r), n > 0 && (t[e - 1][Et] = r[Et]);
    let o = Jo(t, Ve + n);
    PD(r[L], r);
    let s = o[Zt];
    s !== null && s.detachView(o[L]),
      (r[_e] = null),
      (r[Et] = null),
      (r[x] &= -129);
  }
  return r;
}
function um(t, n) {
  if (!(n[x] & 256)) {
    let e = n[ae];
    e.destroyNode && Ls(t, n, e, 3, null, null), LD(n);
  }
}
function vl(t, n) {
  if (n[x] & 256) return;
  let e = J(null);
  try {
    (n[x] &= -129),
      (n[x] |= 256),
      n[Un] && hf(n[Un]),
      BD(t, n),
      VD(t, n),
      n[L].type === 1 && n[ae].destroy();
    let r = n[bi];
    if (r !== null && Rt(n[_e])) {
      r !== n[_e] && cm(r, n);
      let i = n[Zt];
      i !== null && i.detachView(t);
    }
    sD(n);
  } finally {
    J(e);
  }
}
function VD(t, n) {
  let e = t.cleanup,
    r = n[fi];
  if (e !== null)
    for (let o = 0; o < e.length - 1; o += 2)
      if (typeof e[o] == "string") {
        let s = e[o + 3];
        s >= 0 ? r[s]() : r[-s].unsubscribe(), (o += 2);
      } else {
        let s = r[e[o + 1]];
        e[o].call(s);
      }
  r !== null && (n[fi] = null);
  let i = n[yn];
  if (i !== null) {
    n[yn] = null;
    for (let o = 0; o < i.length; o++) {
      let s = i[o];
      s();
    }
  }
}
function BD(t, n) {
  let e;
  if (t != null && (e = t.destroyHooks) != null)
    for (let r = 0; r < e.length; r += 2) {
      let i = n[e[r]];
      if (!(i instanceof yi)) {
        let o = e[r + 1];
        if (Array.isArray(o))
          for (let s = 0; s < o.length; s += 2) {
            let a = i[o[s]],
              l = o[s + 1];
            Mt(4, a, l);
            try {
              l.call(a);
            } finally {
              Mt(5, a, l);
            }
          }
        else {
          Mt(4, i, o);
          try {
            o.call(i);
          } finally {
            Mt(5, i, o);
          }
        }
      }
    }
}
function dm(t, n, e) {
  return UD(t, n.parent, e);
}
function UD(t, n, e) {
  let r = n;
  for (; r !== null && r.type & 40; ) (n = r), (r = n.parent);
  if (r === null) return e[Ge];
  {
    let { componentOffset: i } = r;
    if (i > -1) {
      let { encapsulation: o } = t.data[r.directiveStart + i];
      if (o === xt.None || o === xt.Emulated) return null;
    }
    return Xe(r, e);
  }
}
function as(t, n, e, r, i) {
  t.insertBefore(n, e, r, i);
}
function fm(t, n, e) {
  t.appendChild(n, e);
}
function hh(t, n, e, r, i) {
  r !== null ? as(t, n, e, r, i) : fm(t, n, e);
}
function $D(t, n, e, r) {
  t.removeChild(n, e, r);
}
function Kc(t, n) {
  return t.parentNode(n);
}
function HD(t, n) {
  return t.nextSibling(n);
}
function hm(t, n, e) {
  return WD(t, n, e);
}
function zD(t, n, e) {
  return t.type & 40 ? Xe(t, e) : null;
}
var WD = zD,
  ph;
function Fs(t, n, e, r) {
  let i = dm(t, r, n),
    o = n[ae],
    s = r.parent || n[Ze],
    a = hm(s, r, n);
  if (i != null)
    if (Array.isArray(e))
      for (let l = 0; l < e.length; l++) hh(o, i, e[l], a, !1);
    else hh(o, i, e, a, !1);
  ph !== void 0 && ph(o, r, n, e, i);
}
function Qo(t, n) {
  if (n !== null) {
    let e = n.type;
    if (e & 3) return Xe(n, t);
    if (e & 4) return ql(-1, t[n.index]);
    if (e & 8) {
      let r = n.child;
      if (r !== null) return Qo(t, r);
      {
        let i = t[n.index];
        return Rt(i) ? ql(-1, i) : Ct(i);
      }
    } else {
      if (e & 32) return Wc(n, t)() || Ct(t[n.index]);
      {
        let r = pm(t, n);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let i = gi(t[Ke]);
          return Qo(i, r);
        } else return Qo(t, n.next);
      }
    }
  }
  return null;
}
function pm(t, n) {
  if (n !== null) {
    let r = t[Ke][Ze],
      i = n.projection;
    return r.projection[i];
  }
  return null;
}
function ql(t, n) {
  let e = Ve + t + 1;
  if (e < n.length) {
    let r = n[e],
      i = r[L].firstChild;
    if (i !== null) return Qo(r, i);
  }
  return n[Xt];
}
function Qc(t, n, e) {
  let r = Kc(t, n);
  r && $D(t, r, n, e);
}
function mm(t) {
  t.textContent = "";
}
function Yc(t, n, e, r, i, o, s) {
  for (; e != null; ) {
    let a = r[e.index],
      l = e.type;
    if (
      (s && n === 0 && (a && En(Ct(a), r), (e.flags |= 2)),
      (e.flags & 32) !== 32)
    )
      if (l & 8) Yc(t, n, e.child, r, i, o, !1), Ir(n, t, i, a, o);
      else if (l & 32) {
        let c = Wc(e, r),
          u;
        for (; (u = c()); ) Ir(n, t, i, u, o);
        Ir(n, t, i, a, o);
      } else l & 16 ? gm(t, n, r, e, i, o) : Ir(n, t, i, a, o);
    e = s ? e.projectionNext : e.next;
  }
}
function Ls(t, n, e, r, i, o) {
  Yc(e, r, t.firstChild, n, i, o, !1);
}
function qD(t, n, e) {
  let r = n[ae],
    i = dm(t, e, n),
    o = e.parent || n[Ze],
    s = hm(o, e, n);
  gm(r, 0, n, e, i, s);
}
function gm(t, n, e, r, i, o) {
  let s = e[Ke],
    l = s[Ze].projection[r.projection];
  if (Array.isArray(l))
    for (let c = 0; c < l.length; c++) {
      let u = l[c];
      Ir(n, t, i, u, o);
    }
  else {
    let c = l,
      u = s[_e];
    is(r) && (c.flags |= 128), Yc(t, n, c, u, i, o, !0);
  }
}
function GD(t, n, e, r, i) {
  let o = e[Xt],
    s = Ct(e);
  o !== s && Ir(n, t, r, o, i);
  for (let a = Ve; a < e.length; a++) {
    let l = e[a];
    Ls(l[L], l, t, n, r, o);
  }
}
function KD(t, n, e, r, i) {
  if (n) i ? t.addClass(e, r) : t.removeClass(e, r);
  else {
    let o = r.indexOf("-") === -1 ? void 0 : Nt.DashCase;
    i == null
      ? t.removeStyle(e, r, o)
      : (typeof i == "string" &&
          i.endsWith("!important") &&
          ((i = i.slice(0, -10)), (o |= Nt.Important)),
        t.setStyle(e, r, i, o));
  }
}
function QD(t, n, e) {
  t.setAttribute(n, "style", e);
}
function ym(t, n, e) {
  e === "" ? t.removeAttribute(n, "class") : t.setAttribute(n, "class", e);
}
function vm(t, n, e) {
  let { mergedAttrs: r, classes: i, styles: o } = e;
  r !== null && Al(t, n, r),
    i !== null && ym(t, n, i),
    o !== null && QD(t, n, o);
}
var Pt = {};
function b(t = 1) {
  Em(Ne(), K(), Yn() + t, !1);
}
function Em(t, n, e, r) {
  if (!r)
    if ((n[x] & 3) === 3) {
      let o = t.preOrderCheckHooks;
      o !== null && qo(n, o, e);
    } else {
      let o = t.preOrderHooks;
      o !== null && Go(n, o, 0, e);
    }
  Hn(e);
}
function H(t, n = V.Default) {
  let e = K();
  if (e === null) return B(t, n);
  let r = Je();
  return kp(r, e, lt(t), n);
}
function Dm(t, n, e, r, i, o) {
  let s = J(null);
  try {
    let a = null;
    i & le.SignalBased && (a = n[r][ur]),
      a !== null && a.transformFn !== void 0 && (o = a.transformFn(o)),
      i & le.HasDecoratorInputTransform &&
        (o = t.inputTransforms[r].call(n, o)),
      t.setInput !== null ? t.setInput(n, a, o, e, r) : lp(n, a, r, o);
  } finally {
    J(s);
  }
}
function YD(t, n) {
  let e = t.hostBindingOpCodes;
  if (e !== null)
    try {
      for (let r = 0; r < e.length; r++) {
        let i = e[r];
        if (i < 0) Hn(~i);
        else {
          let o = i,
            s = e[++r],
            a = e[++r];
          xE(s, o);
          let l = n[o];
          a(2, l);
        }
      }
    } finally {
      Hn(-1);
    }
}
function ks(t, n, e, r, i, o, s, a, l, c, u) {
  let d = n.blueprint.slice();
  return (
    (d[Ge] = i),
    (d[x] = r | 4 | 128 | 8 | 64),
    (c !== null || (t && t[x] & 2048)) && (d[x] |= 2048),
    mp(d),
    (d[_e] = d[Fr] = t),
    (d[Dt] = e),
    (d[wt] = s || (t && t[wt])),
    (d[ae] = a || (t && t[ae])),
    (d[Ar] = l || (t && t[Ar]) || null),
    (d[Ze] = o),
    (d[_s] = iD()),
    (d[ut] = u),
    (d[op] = c),
    (d[Ke] = n.type == 2 ? t[Ke] : d),
    d
  );
}
function jr(t, n, e, r, i) {
  let o = t.data[n];
  if (o === null) (o = ZD(t, n, e, r, i)), AE() && (o.flags |= 32);
  else if (o.type & 64) {
    (o.type = e), (o.value = r), (o.attrs = i);
    let s = TE();
    o.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return Qn(o, !0), o;
}
function ZD(t, n, e, r, i) {
  let o = vp(),
    s = Nc(),
    a = s ? o : o && o.parent,
    l = (t.data[n] = iw(t, a, e, n, r, i));
  return (
    t.firstChild === null && (t.firstChild = l),
    o !== null &&
      (s
        ? o.child == null && l.parent !== null && (o.child = l)
        : o.next === null && ((o.next = l), (l.prev = o))),
    l
  );
}
function wm(t, n, e, r) {
  if (e === 0) return -1;
  let i = n.length;
  for (let o = 0; o < e; o++) n.push(r), t.blueprint.push(r), t.data.push(null);
  return i;
}
function Cm(t, n, e, r, i) {
  let o = Yn(),
    s = r & 2;
  try {
    Hn(-1), s && n.length > ke && Em(t, n, ke, !1), Mt(s ? 2 : 0, i), e(r, i);
  } finally {
    Hn(o), Mt(s ? 3 : 1, i);
  }
}
function Zc(t, n, e) {
  if (Mc(n)) {
    let r = J(null);
    try {
      let i = n.directiveStart,
        o = n.directiveEnd;
      for (let s = i; s < o; s++) {
        let a = t.data[s];
        if (a.contentQueries) {
          let l = e[s];
          a.contentQueries(1, l, s);
        }
      }
    } finally {
      J(r);
    }
  }
}
function Xc(t, n, e) {
  yp() && (dw(t, n, e, Xe(e, n)), (e.flags & 64) === 64 && Sm(t, n, e));
}
function Jc(t, n, e = Xe) {
  let r = n.localNames;
  if (r !== null) {
    let i = n.index + 1;
    for (let o = 0; o < r.length; o += 2) {
      let s = r[o + 1],
        a = s === -1 ? e(n, t) : t[s];
      t[i++] = a;
    }
  }
}
function bm(t) {
  let n = t.tView;
  return n === null || n.incompleteFirstPass
    ? (t.tView = eu(
        1,
        null,
        t.template,
        t.decls,
        t.vars,
        t.directiveDefs,
        t.pipeDefs,
        t.viewQuery,
        t.schemas,
        t.consts,
        t.id
      ))
    : n;
}
function eu(t, n, e, r, i, o, s, a, l, c, u) {
  let d = ke + r,
    f = d + i,
    h = XD(d, f),
    p = typeof c == "function" ? c() : c;
  return (h[L] = {
    type: t,
    blueprint: h,
    template: e,
    queries: null,
    viewQuery: a,
    declTNode: n,
    data: h.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: f,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof o == "function" ? o() : o,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: l,
    consts: p,
    incompleteFirstPass: !1,
    ssrId: u,
  });
}
function XD(t, n) {
  let e = [];
  for (let r = 0; r < n; r++) e.push(r < t ? null : Pt);
  return e;
}
function JD(t, n, e, r) {
  let o = r.get(rm, nm) || e === xt.ShadowDom,
    s = t.selectRootElement(n, o);
  return ew(s), s;
}
function ew(t) {
  Im(t);
}
var Im = () => null;
function tw(t) {
  zp(t) ? mm(t) : wD(t);
}
function nw() {
  Im = tw;
}
function rw(t, n, e, r) {
  let i = Am(n);
  i.push(e), t.firstCreatePass && xm(t).push(r, i.length - 1);
}
function iw(t, n, e, r, i, o) {
  let s = n ? n.injectorIndex : -1,
    a = 0;
  return (
    Lr() && (a |= 128),
    {
      type: e,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: i,
      attrs: o,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: n,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function mh(t, n, e, r, i) {
  for (let o in n) {
    if (!n.hasOwnProperty(o)) continue;
    let s = n[o];
    if (s === void 0) continue;
    r ??= {};
    let a,
      l = le.None;
    Array.isArray(s) ? ((a = s[0]), (l = s[1])) : (a = s);
    let c = o;
    if (i !== null) {
      if (!i.hasOwnProperty(o)) continue;
      c = i[o];
    }
    t === 0 ? gh(r, e, c, a, l) : gh(r, e, c, a);
  }
  return r;
}
function gh(t, n, e, r, i) {
  let o;
  t.hasOwnProperty(e) ? (o = t[e]).push(n, r) : (o = t[e] = [n, r]),
    i !== void 0 && o.push(i);
}
function ow(t, n, e) {
  let r = n.directiveStart,
    i = n.directiveEnd,
    o = t.data,
    s = n.attrs,
    a = [],
    l = null,
    c = null;
  for (let u = r; u < i; u++) {
    let d = o[u],
      f = e ? e.get(d) : null,
      h = f ? f.inputs : null,
      p = f ? f.outputs : null;
    (l = mh(0, d.inputs, u, l, h)), (c = mh(1, d.outputs, u, c, p));
    let y = l !== null && s !== null && !Ic(n) ? Cw(l, u, s) : null;
    a.push(y);
  }
  l !== null &&
    (l.hasOwnProperty("class") && (n.flags |= 8),
    l.hasOwnProperty("style") && (n.flags |= 16)),
    (n.initialInputs = a),
    (n.inputs = l),
    (n.outputs = c);
}
function sw(t) {
  return t === "class"
    ? "className"
    : t === "for"
    ? "htmlFor"
    : t === "formaction"
    ? "formAction"
    : t === "innerHtml"
    ? "innerHTML"
    : t === "readonly"
    ? "readOnly"
    : t === "tabindex"
    ? "tabIndex"
    : t;
}
function aw(t, n, e, r, i, o, s, a) {
  let l = Xe(n, e),
    c = n.inputs,
    u;
  !a && c != null && (u = c[r])
    ? (nu(t, e, u, r, i), Ii(n) && lw(e, n.index))
    : n.type & 3
    ? ((r = sw(r)),
      (i = s != null ? s(i, n.value || "", r) : i),
      o.setProperty(l, r, i))
    : n.type & 12;
}
function lw(t, n) {
  let e = Cn(n, t);
  e[x] & 16 || (e[x] |= 64);
}
function tu(t, n, e, r) {
  if (yp()) {
    let i = r === null ? null : { "": -1 },
      o = hw(t, e),
      s,
      a;
    o === null ? (s = a = null) : ([s, a] = o),
      s !== null && _m(t, n, e, s, i, a),
      i && pw(e, r, i);
  }
  e.mergedAttrs = ui(e.mergedAttrs, e.attrs);
}
function _m(t, n, e, r, i, o) {
  for (let c = 0; c < r.length; c++) zE(Op(e, n), t, r[c].type);
  gw(e, t.data.length, r.length);
  for (let c = 0; c < r.length; c++) {
    let u = r[c];
    u.providersResolver && u.providersResolver(u);
  }
  let s = !1,
    a = !1,
    l = wm(t, n, r.length, null);
  for (let c = 0; c < r.length; c++) {
    let u = r[c];
    (e.mergedAttrs = ui(e.mergedAttrs, u.hostAttrs)),
      yw(t, e, n, l, u),
      mw(l, u, i),
      u.contentQueries !== null && (e.flags |= 4),
      (u.hostBindings !== null || u.hostAttrs !== null || u.hostVars !== 0) &&
        (e.flags |= 64);
    let d = u.type.prototype;
    !s &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((t.preOrderHooks ??= []).push(e.index), (s = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((t.preOrderCheckHooks ??= []).push(e.index), (a = !0)),
      l++;
  }
  ow(t, e, o);
}
function cw(t, n, e, r, i) {
  let o = i.hostBindings;
  if (o) {
    let s = t.hostBindingOpCodes;
    s === null && (s = t.hostBindingOpCodes = []);
    let a = ~n.index;
    uw(s) != a && s.push(a), s.push(e, r, o);
  }
}
function uw(t) {
  let n = t.length;
  for (; n > 0; ) {
    let e = t[--n];
    if (typeof e == "number" && e < 0) return e;
  }
  return 0;
}
function dw(t, n, e, r) {
  let i = e.directiveStart,
    o = e.directiveEnd;
  Ii(e) && vw(n, e, t.data[i + e.componentOffset]),
    t.firstCreatePass || Op(e, n),
    En(r, n);
  let s = e.initialInputs;
  for (let a = i; a < o; a++) {
    let l = t.data[a],
      c = Rr(n, t, a, e);
    if ((En(c, n), s !== null && ww(n, a - i, c, l, e, s), $n(l))) {
      let u = Cn(e.index, n);
      u[Dt] = Rr(n, t, a, e);
    }
  }
}
function Sm(t, n, e) {
  let r = e.directiveStart,
    i = e.directiveEnd,
    o = e.index,
    s = NE();
  try {
    Hn(o);
    for (let a = r; a < i; a++) {
      let l = t.data[a],
        c = n[a];
      Ll(a),
        (l.hostBindings !== null || l.hostVars !== 0 || l.hostAttrs !== null) &&
          fw(l, c);
    }
  } finally {
    Hn(-1), Ll(s);
  }
}
function fw(t, n) {
  t.hostBindings !== null && t.hostBindings(1, n);
}
function hw(t, n) {
  let e = t.directiveRegistry,
    r = null,
    i = null;
  if (e)
    for (let o = 0; o < e.length; o++) {
      let s = e[o];
      if (Qh(n, s.selectors, !1))
        if ((r || (r = []), $n(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (i = i || new Map()),
              s.findHostDirectiveDefs(s, a, i),
              r.unshift(...a, s);
            let l = a.length;
            Gl(t, n, l);
          } else r.unshift(s), Gl(t, n, 0);
        else
          (i = i || new Map()), s.findHostDirectiveDefs?.(s, r, i), r.push(s);
    }
  return r === null ? null : [r, i];
}
function Gl(t, n, e) {
  (n.componentOffset = e), (t.components ??= []).push(n.index);
}
function pw(t, n, e) {
  if (n) {
    let r = (t.localNames = []);
    for (let i = 0; i < n.length; i += 2) {
      let o = e[n[i + 1]];
      if (o == null) throw new v(-301, !1);
      r.push(n[i], o);
    }
  }
}
function mw(t, n, e) {
  if (e) {
    if (n.exportAs)
      for (let r = 0; r < n.exportAs.length; r++) e[n.exportAs[r]] = t;
    $n(n) && (e[""] = t);
  }
}
function gw(t, n, e) {
  (t.flags |= 1),
    (t.directiveStart = n),
    (t.directiveEnd = n + e),
    (t.providerIndexes = n);
}
function yw(t, n, e, r, i) {
  t.data[r] = i;
  let o = i.factory || (i.factory = Tr(i.type, !0)),
    s = new yi(o, $n(i), H);
  (t.blueprint[r] = s), (e[r] = s), cw(t, n, r, wm(t, e, i.hostVars, Pt), i);
}
function vw(t, n, e) {
  let r = Xe(n, t),
    i = bm(e),
    o = t[wt].rendererFactory,
    s = 16;
  e.signals ? (s = 4096) : e.onPush && (s = 64);
  let a = js(
    t,
    ks(t, i, null, s, r, n, null, o.createRenderer(r, e), null, null, null)
  );
  t[n.index] = a;
}
function Ew(t, n, e, r, i, o) {
  let s = Xe(t, n);
  Dw(n[ae], s, o, t.value, e, r, i);
}
function Dw(t, n, e, r, i, o, s) {
  if (o == null) t.removeAttribute(n, i, e);
  else {
    let a = s == null ? ws(o) : s(o, r || "", i);
    t.setAttribute(n, i, a, e);
  }
}
function ww(t, n, e, r, i, o) {
  let s = o[n];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let l = s[a++],
        c = s[a++],
        u = s[a++],
        d = s[a++];
      Dm(r, e, l, c, u, d);
    }
}
function Cw(t, n, e) {
  let r = null,
    i = 0;
  for (; i < e.length; ) {
    let o = e[i];
    if (o === 0) {
      i += 4;
      continue;
    } else if (o === 5) {
      i += 2;
      continue;
    }
    if (typeof o == "number") break;
    if (t.hasOwnProperty(o)) {
      r === null && (r = []);
      let s = t[o];
      for (let a = 0; a < s.length; a += 3)
        if (s[a] === n) {
          r.push(o, s[a + 1], s[a + 2], e[i + 1]);
          break;
        }
    }
    i += 2;
  }
  return r;
}
function Tm(t, n, e, r) {
  return [t, !0, 0, n, null, r, null, e, null, null];
}
function Mm(t, n) {
  let e = t.contentQueries;
  if (e !== null) {
    let r = J(null);
    try {
      for (let i = 0; i < e.length; i += 2) {
        let o = e[i],
          s = e[i + 1];
        if (s !== -1) {
          let a = t.data[s];
          Pc(o), a.contentQueries(2, n[s], s);
        }
      }
    } finally {
      J(r);
    }
  }
}
function js(t, n) {
  return t[hi] ? (t[oh][Et] = n) : (t[hi] = n), (t[oh] = n), n;
}
function Kl(t, n, e) {
  Pc(0);
  let r = J(null);
  try {
    n(t, e);
  } finally {
    J(r);
  }
}
function Am(t) {
  return t[fi] || (t[fi] = []);
}
function xm(t) {
  return t.cleanup || (t.cleanup = []);
}
function Nm(t, n) {
  let e = t[Ar],
    r = e ? e.get(Jt, null) : null;
  r && r.handleError(n);
}
function nu(t, n, e, r, i) {
  for (let o = 0; o < e.length; ) {
    let s = e[o++],
      a = e[o++],
      l = e[o++],
      c = n[s],
      u = t.data[s];
    Dm(u, c, r, a, l, i);
  }
}
function bw(t, n, e) {
  let r = hp(n, t);
  OD(t[ae], r, e);
}
function Iw(t, n) {
  let e = Cn(n, t),
    r = e[L];
  _w(r, e);
  let i = e[Ge];
  i !== null && e[ut] === null && (e[ut] = $c(i, e[Ar])), ru(r, e, e[Dt]);
}
function _w(t, n) {
  for (let e = n.length; e < t.blueprint.length; e++) n.push(t.blueprint[e]);
}
function ru(t, n, e) {
  Fc(n);
  try {
    let r = t.viewQuery;
    r !== null && Kl(1, r, e);
    let i = t.template;
    i !== null && Cm(t, n, i, 1, e),
      t.firstCreatePass && (t.firstCreatePass = !1),
      n[Zt]?.finishViewCreation(t),
      t.staticContentQueries && Mm(t, n),
      t.staticViewQueries && Kl(2, t.viewQuery, e);
    let o = t.components;
    o !== null && Sw(n, o);
  } catch (r) {
    throw (
      (t.firstCreatePass &&
        ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
      r)
    );
  } finally {
    (n[x] &= -5), Lc();
  }
}
function Sw(t, n) {
  for (let e = 0; e < n.length; e++) Iw(t, n[e]);
}
function Tw(t, n, e, r) {
  let i = J(null);
  try {
    let o = n.tView,
      a = t[x] & 4096 ? 4096 : 16,
      l = ks(
        t,
        o,
        e,
        a,
        null,
        n,
        null,
        null,
        r?.injector ?? null,
        r?.embeddedViewInjector ?? null,
        r?.dehydratedView ?? null
      ),
      c = t[n.index];
    l[bi] = c;
    let u = t[Zt];
    return u !== null && (l[Zt] = u.createEmbeddedView(o)), ru(o, l, e), l;
  } finally {
    J(i);
  }
}
function yh(t, n) {
  return !n || n.firstChild === null || is(t);
}
function Mw(t, n, e, r = !0) {
  let i = n[L];
  if ((kD(i, n, t, e), r)) {
    let s = ql(e, t),
      a = n[ae],
      l = Kc(a, t[Xt]);
    l !== null && FD(i, t[Ze], a, n, l, s);
  }
  let o = n[ut];
  o !== null && o.firstChild !== null && (o.firstChild = null);
}
function ls(t, n, e, r, i = !1) {
  for (; e !== null; ) {
    let o = n[e.index];
    o !== null && r.push(Ct(o)), Rt(o) && Aw(o, r);
    let s = e.type;
    if (s & 8) ls(t, n, e.child, r);
    else if (s & 32) {
      let a = Wc(e, n),
        l;
      for (; (l = a()); ) r.push(l);
    } else if (s & 16) {
      let a = pm(n, e);
      if (Array.isArray(a)) r.push(...a);
      else {
        let l = gi(n[Ke]);
        ls(l[L], l, a, r, !0);
      }
    }
    e = i ? e.projectionNext : e.next;
  }
  return r;
}
function Aw(t, n) {
  for (let e = Ve; e < t.length; e++) {
    let r = t[e],
      i = r[L].firstChild;
    i !== null && ls(r[L], r, i, n);
  }
  t[Xt] !== t[Ge] && n.push(t[Xt]);
}
var Rm = [];
function xw(t) {
  return t[Un] ?? Nw(t);
}
function Nw(t) {
  let n = Rm.pop() ?? Object.create(Ow);
  return (n.lView = t), n;
}
function Rw(t) {
  t.lView[Un] !== t && ((t.lView = null), Rm.push(t));
}
var Ow = he(w({}, Wa), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: (t) => {
      mi(t.lView);
    },
    consumerOnSignalRead() {
      this.lView[Un] = this;
    },
  }),
  Om = 100;
function Pm(t, n = !0, e = 0) {
  let r = t[wt],
    i = r.rendererFactory,
    o = !1;
  o || i.begin?.();
  try {
    Pw(t, e);
  } catch (s) {
    throw (n && Nm(t, s), s);
  } finally {
    o || (i.end?.(), r.inlineEffectRunner?.flush());
  }
}
function Pw(t, n) {
  Ql(t, n);
  let e = 0;
  for (; xc(t); ) {
    if (e === Om) throw new v(103, !1);
    e++, Ql(t, 1);
  }
}
function Fw(t, n, e, r) {
  let i = n[x];
  if ((i & 256) === 256) return;
  let o = !1;
  !o && n[wt].inlineEffectRunner?.flush(), Fc(n);
  let s = null,
    a = null;
  !o && Lw(t) && ((a = xw(n)), (s = df(a)));
  try {
    mp(n), ME(t.bindingStartIndex), e !== null && Cm(t, n, e, 2, r);
    let l = (i & 3) === 3;
    if (!o)
      if (l) {
        let d = t.preOrderCheckHooks;
        d !== null && qo(n, d, null);
      } else {
        let d = t.preOrderHooks;
        d !== null && Go(n, d, 0, null), hl(n, 0);
      }
    if ((kw(n), Fm(n, 0), t.contentQueries !== null && Mm(t, n), !o))
      if (l) {
        let d = t.contentCheckHooks;
        d !== null && qo(n, d);
      } else {
        let d = t.contentHooks;
        d !== null && Go(n, d, 1), hl(n, 1);
      }
    YD(t, n);
    let c = t.components;
    c !== null && km(n, c, 0);
    let u = t.viewQuery;
    if ((u !== null && Kl(2, u, r), !o))
      if (l) {
        let d = t.viewCheckHooks;
        d !== null && qo(n, d);
      } else {
        let d = t.viewHooks;
        d !== null && Go(n, d, 2), hl(n, 2);
      }
    if ((t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), n[fl])) {
      for (let d of n[fl]) d();
      n[fl] = null;
    }
    o || (n[x] &= -73);
  } catch (l) {
    throw (mi(n), l);
  } finally {
    a !== null && (ff(a, s), Rw(a)), Lc();
  }
}
function Lw(t) {
  return t.type !== 2;
}
function Fm(t, n) {
  for (let e = qp(t); e !== null; e = Gp(e))
    for (let r = Ve; r < e.length; r++) {
      let i = e[r];
      Lm(i, n);
    }
}
function kw(t) {
  for (let n = qp(t); n !== null; n = Gp(n)) {
    if (!(n[x] & Tc.HasTransplantedViews)) continue;
    let e = n[xr];
    for (let r = 0; r < e.length; r++) {
      let i = e[r],
        o = i[_e];
      vE(i);
    }
  }
}
function jw(t, n, e) {
  let r = Cn(n, t);
  Lm(r, e);
}
function Lm(t, n) {
  Ac(t) && Ql(t, n);
}
function Ql(t, n) {
  let r = t[L],
    i = t[x],
    o = t[Un],
    s = !!(n === 0 && i & 16);
  if (
    ((s ||= !!(i & 64 && n === 0)),
    (s ||= !!(i & 1024)),
    (s ||= !!(o?.dirty && qa(o))),
    o && (o.dirty = !1),
    (t[x] &= -9217),
    s)
  )
    Fw(r, t, r.template, t[Dt]);
  else if (i & 8192) {
    Fm(t, 1);
    let a = r.components;
    a !== null && km(t, a, 1);
  }
}
function km(t, n, e) {
  for (let r = 0; r < n.length; r++) jw(t, n[r], e);
}
function iu(t) {
  for (t[wt].changeDetectionScheduler?.notify(); t; ) {
    t[x] |= 64;
    let n = gi(t);
    if (ap(t) && !n) return t;
    t = n;
  }
  return null;
}
var zn = class {
    get rootNodes() {
      let n = this._lView,
        e = n[L];
      return ls(e, n, e.firstChild, []);
    }
    constructor(n, e, r = !0) {
      (this._lView = n),
        (this._cdRefInjectingView = e),
        (this.notifyErrorHandler = r),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[Dt];
    }
    set context(n) {
      this._lView[Dt] = n;
    }
    get destroyed() {
      return (this._lView[x] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let n = this._lView[_e];
        if (Rt(n)) {
          let e = n[ts],
            r = e ? e.indexOf(this) : -1;
          r > -1 && (Wl(n, r), Jo(e, r));
        }
        this._attachedToViewContainer = !1;
      }
      um(this._lView[L], this._lView);
    }
    onDestroy(n) {
      gp(this._lView, n);
    }
    markForCheck() {
      iu(this._cdRefInjectingView || this._lView);
    }
    detach() {
      this._lView[x] &= -129;
    }
    reattach() {
      Fl(this._lView), (this._lView[x] |= 128);
    }
    detectChanges() {
      (this._lView[x] |= 1024), Pm(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new v(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      (this._appRef = null), lm(this._lView[L], this._lView);
    }
    attachToAppRef(n) {
      if (this._attachedToViewContainer) throw new v(902, !1);
      (this._appRef = n), Fl(this._lView);
    }
  },
  en = (() => {
    class t {
      static {
        this.__NG_ELEMENT_ID__ = Uw;
      }
    }
    return t;
  })(),
  Vw = en,
  Bw = class extends Vw {
    constructor(n, e, r) {
      super(),
        (this._declarationLView = n),
        (this._declarationTContainer = e),
        (this.elementRef = r);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(n, e) {
      return this.createEmbeddedViewImpl(n, e);
    }
    createEmbeddedViewImpl(n, e, r) {
      let i = Tw(this._declarationLView, this._declarationTContainer, n, {
        embeddedViewInjector: e,
        dehydratedView: r,
      });
      return new zn(i);
    }
  };
function Uw() {
  return ou(Je(), K());
}
function ou(t, n) {
  return t.type & 4 ? new Bw(n, t, kr(t, n)) : null;
}
function jm(t) {
  let n = t[pi] ?? [],
    r = t[_e][ae];
  for (let i of n) $w(i, r);
  t[pi] = Fe;
}
function $w(t, n) {
  let e = 0,
    r = t.firstChild;
  if (r) {
    let i = t.data[os];
    for (; e < i; ) {
      let o = r.nextSibling;
      Qc(n, r, !1), (r = o), e++;
    }
  }
}
function Vm(t) {
  jm(t);
  for (let n = Ve; n < t.length; n++) cs(t[n]);
}
function Hw(t) {
  let n = t[ut]?.i18nNodes;
  if (n) {
    let e = t[ae];
    for (let r of n.values()) Qc(e, r, !1);
    t[ut].i18nNodes = void 0;
  }
}
function cs(t) {
  Hw(t);
  let n = t[L];
  for (let e = ke; e < n.bindingStartIndex; e++)
    if (Rt(t[e])) {
      let r = t[e];
      Vm(r);
    } else Yt(t[e]) && cs(t[e]);
}
function zw(t) {
  let n = t._views;
  for (let e of n) {
    let r = ED(e);
    if (r !== null && r[Ge] !== null)
      if (Yt(r)) cs(r);
      else {
        let i = r[Ge];
        cs(i), Vm(r);
      }
  }
}
var Ww = new RegExp(`^(\\d+)*(${Zp}|${Yp})*(.*)`);
function qw(t) {
  let n = t.match(Ww),
    [e, r, i, o] = n,
    s = r ? parseInt(r, 10) : i,
    a = [];
  for (let [l, c, u] of o.matchAll(/(f|n)(\d*)/g)) {
    let d = parseInt(u, 10) || 1;
    a.push(c, d);
  }
  return [s, ...a];
}
function Gw(t) {
  return !t.prev && t.parent?.type === 8;
}
function El(t) {
  return t.index - ke;
}
function Kw(t, n) {
  let e = t.i18nNodes;
  if (e) {
    let r = e.get(n);
    return r && e.delete(n), r;
  }
  return null;
}
function Vs(t, n, e, r) {
  let i = El(r),
    o = Kw(t, i);
  if (!o) {
    let s = t.data[hD];
    if (s?.[i]) o = Yw(s[i], e);
    else if (n.firstChild === r) o = t.firstChild;
    else {
      let a = r.prev === null,
        l = r.prev ?? r.parent;
      if (Gw(r)) {
        let c = El(r.parent);
        o = zl(t, c);
      } else {
        let c = Xe(l, e);
        if (a) o = c.firstChild;
        else {
          let u = El(l),
            d = zl(t, u);
          if (l.type === 2 && d) {
            let h = Hc(t, u) + 1;
            o = Bs(h, d);
          } else o = c.nextSibling;
        }
      }
    }
  }
  return o;
}
function Bs(t, n) {
  let e = n;
  for (let r = 0; r < t; r++) e = e.nextSibling;
  return e;
}
function Qw(t, n) {
  let e = t;
  for (let r = 0; r < n.length; r += 2) {
    let i = n[r],
      o = n[r + 1];
    for (let s = 0; s < o; s++)
      switch (i) {
        case Hl.FirstChild:
          e = e.firstChild;
          break;
        case Hl.NextSibling:
          e = e.nextSibling;
          break;
      }
  }
  return e;
}
function Yw(t, n) {
  let [e, ...r] = qw(t),
    i;
  if (e === Yp) i = n[Ke][Ge];
  else if (e === Zp) i = ND(n[Ke][Ge]);
  else {
    let o = Number(e);
    i = Ct(n[o + ke]);
  }
  return Qw(i, r);
}
function Zw(t, n) {
  let e = [];
  for (let r of n)
    for (let i = 0; i < (r[Xp] ?? 1); i++) {
      let o = { data: r, firstChild: null };
      r[os] > 0 && ((o.firstChild = t), (t = Bs(r[os], t))), e.push(o);
    }
  return [t, e];
}
var Bm = () => null;
function Xw(t, n) {
  let e = t[pi];
  return !n || e === null || e.length === 0
    ? null
    : e[0].data[fD] === n
    ? e.shift()
    : (jm(t), null);
}
function Jw() {
  Bm = Xw;
}
function vh(t, n) {
  return Bm(t, n);
}
var vi = class {},
  Yl = class {},
  us = class {};
function eC(t) {
  let n = Error(`No component factory found for ${Le(t)}.`);
  return (n[tC] = t), n;
}
var tC = "ngComponent";
var Zl = class {
    resolveComponentFactory(n) {
      throw eC(n);
    }
  },
  Us = (() => {
    class t {
      static {
        this.NULL = new Zl();
      }
    }
    return t;
  })(),
  Wn = class {},
  on = (() => {
    class t {
      constructor() {
        this.destroyNode = null;
      }
      static {
        this.__NG_ELEMENT_ID__ = () => nC();
      }
    }
    return t;
  })();
function nC() {
  let t = K(),
    n = Je(),
    e = Cn(n.index, t);
  return (Yt(e) ? e : t)[ae];
}
var rC = (() => {
    class t {
      static {
        this.ɵprov = S({ token: t, providedIn: "root", factory: () => null });
      }
    }
    return t;
  })(),
  Dl = {};
var Eh = new Set();
function In(t) {
  Eh.has(t) ||
    (Eh.add(t),
    performance?.mark?.("mark_feature_usage", { detail: { feature: t } }));
}
function Dh(...t) {}
function iC() {
  let t = typeof ai.requestAnimationFrame == "function",
    n = ai[t ? "requestAnimationFrame" : "setTimeout"],
    e = ai[t ? "cancelAnimationFrame" : "clearTimeout"];
  if (typeof Zone < "u" && n && e) {
    let r = n[Zone.__symbol__("OriginalDelegate")];
    r && (n = r);
    let i = e[Zone.__symbol__("OriginalDelegate")];
    i && (e = i);
  }
  return { nativeRequestAnimationFrame: n, nativeCancelAnimationFrame: e };
}
var oe = class t {
    constructor({
      enableLongStackTrace: n = !1,
      shouldCoalesceEventChangeDetection: e = !1,
      shouldCoalesceRunChangeDetection: r = !1,
    }) {
      if (
        ((this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new Ee(!1)),
        (this.onMicrotaskEmpty = new Ee(!1)),
        (this.onStable = new Ee(!1)),
        (this.onError = new Ee(!1)),
        typeof Zone > "u")
      )
        throw new v(908, !1);
      Zone.assertZonePatched();
      let i = this;
      (i._nesting = 0),
        (i._outer = i._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
        n &&
          Zone.longStackTraceZoneSpec &&
          (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
        (i.shouldCoalesceEventChangeDetection = !r && e),
        (i.shouldCoalesceRunChangeDetection = r),
        (i.lastRequestAnimationFrameId = -1),
        (i.nativeRequestAnimationFrame = iC().nativeRequestAnimationFrame),
        aC(i);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get("isAngularZone") === !0;
    }
    static assertInAngularZone() {
      if (!t.isInAngularZone()) throw new v(909, !1);
    }
    static assertNotInAngularZone() {
      if (t.isInAngularZone()) throw new v(909, !1);
    }
    run(n, e, r) {
      return this._inner.run(n, e, r);
    }
    runTask(n, e, r, i) {
      let o = this._inner,
        s = o.scheduleEventTask("NgZoneEvent: " + i, n, oC, Dh, Dh);
      try {
        return o.runTask(s, e, r);
      } finally {
        o.cancelTask(s);
      }
    }
    runGuarded(n, e, r) {
      return this._inner.runGuarded(n, e, r);
    }
    runOutsideAngular(n) {
      return this._outer.run(n);
    }
  },
  oC = {};
function su(t) {
  if (t._nesting == 0 && !t.hasPendingMicrotasks && !t.isStable)
    try {
      t._nesting++, t.onMicrotaskEmpty.emit(null);
    } finally {
      if ((t._nesting--, !t.hasPendingMicrotasks))
        try {
          t.runOutsideAngular(() => t.onStable.emit(null));
        } finally {
          t.isStable = !0;
        }
    }
}
function sC(t) {
  t.isCheckStableRunning ||
    t.lastRequestAnimationFrameId !== -1 ||
    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
      ai,
      () => {
        t.fakeTopEventTask ||
          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
            "fakeTopEventTask",
            () => {
              (t.lastRequestAnimationFrameId = -1),
                Xl(t),
                (t.isCheckStableRunning = !0),
                su(t),
                (t.isCheckStableRunning = !1);
            },
            void 0,
            () => {},
            () => {}
          )),
          t.fakeTopEventTask.invoke();
      }
    )),
    Xl(t));
}
function aC(t) {
  let n = () => {
    sC(t);
  };
  t._inner = t._inner.fork({
    name: "angular",
    properties: { isAngularZone: !0 },
    onInvokeTask: (e, r, i, o, s, a) => {
      if (lC(a)) return e.invokeTask(i, o, s, a);
      try {
        return wh(t), e.invokeTask(i, o, s, a);
      } finally {
        ((t.shouldCoalesceEventChangeDetection && o.type === "eventTask") ||
          t.shouldCoalesceRunChangeDetection) &&
          n(),
          Ch(t);
      }
    },
    onInvoke: (e, r, i, o, s, a, l) => {
      try {
        return wh(t), e.invoke(i, o, s, a, l);
      } finally {
        t.shouldCoalesceRunChangeDetection && n(), Ch(t);
      }
    },
    onHasTask: (e, r, i, o) => {
      e.hasTask(i, o),
        r === i &&
          (o.change == "microTask"
            ? ((t._hasPendingMicrotasks = o.microTask), Xl(t), su(t))
            : o.change == "macroTask" &&
              (t.hasPendingMacrotasks = o.macroTask));
    },
    onHandleError: (e, r, i, o) => (
      e.handleError(i, o), t.runOutsideAngular(() => t.onError.emit(o)), !1
    ),
  });
}
function Xl(t) {
  t._hasPendingMicrotasks ||
  ((t.shouldCoalesceEventChangeDetection ||
    t.shouldCoalesceRunChangeDetection) &&
    t.lastRequestAnimationFrameId !== -1)
    ? (t.hasPendingMicrotasks = !0)
    : (t.hasPendingMicrotasks = !1);
}
function wh(t) {
  t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
}
function Ch(t) {
  t._nesting--, su(t);
}
function lC(t) {
  return !Array.isArray(t) || t.length !== 1
    ? !1
    : t[0].data?.__ignore_ng_zone__ === !0;
}
var Um = (() => {
  class t {
    constructor() {
      (this.handler = null), (this.internalCallbacks = []);
    }
    execute() {
      this.executeInternalCallbacks(), this.handler?.execute();
    }
    executeInternalCallbacks() {
      let e = [...this.internalCallbacks];
      this.internalCallbacks.length = 0;
      for (let r of e) r();
    }
    ngOnDestroy() {
      this.handler?.destroy(),
        (this.handler = null),
        (this.internalCallbacks.length = 0);
    }
    static {
      this.ɵprov = S({ token: t, providedIn: "root", factory: () => new t() });
    }
  }
  return t;
})();
function ds(t, n, e) {
  let r = e ? t.styles : null,
    i = e ? t.classes : null,
    o = 0;
  if (n !== null)
    for (let s = 0; s < n.length; s++) {
      let a = n[s];
      if (typeof a == "number") o = a;
      else if (o == 1) i = _l(i, a);
      else if (o == 2) {
        let l = a,
          c = n[++s];
        r = _l(r, l + ": " + c + ";");
      }
    }
  e ? (t.styles = r) : (t.stylesWithoutHost = r),
    e ? (t.classes = i) : (t.classesWithoutHost = i);
}
var fs = class extends Us {
  constructor(n) {
    super(), (this.ngModule = n);
  }
  resolveComponentFactory(n) {
    let e = vn(n);
    return new Or(e, this.ngModule);
  }
};
function bh(t) {
  let n = [];
  for (let e in t) {
    if (!t.hasOwnProperty(e)) continue;
    let r = t[e];
    r !== void 0 &&
      n.push({ propName: Array.isArray(r) ? r[0] : r, templateName: e });
  }
  return n;
}
function cC(t) {
  let n = t.toLowerCase();
  return n === "svg" ? fp : n === "math" ? hE : null;
}
var Jl = class {
    constructor(n, e) {
      (this.injector = n), (this.parentInjector = e);
    }
    get(n, e, r) {
      r = Cs(r);
      let i = this.injector.get(n, Dl, r);
      return i !== Dl || e === Dl ? i : this.parentInjector.get(n, e, r);
    }
  },
  Or = class extends us {
    get inputs() {
      let n = this.componentDef,
        e = n.inputTransforms,
        r = bh(n.inputs);
      if (e !== null)
        for (let i of r)
          e.hasOwnProperty(i.propName) && (i.transform = e[i.propName]);
      return r;
    }
    get outputs() {
      return bh(this.componentDef.outputs);
    }
    constructor(n, e) {
      super(),
        (this.componentDef = n),
        (this.ngModule = e),
        (this.componentType = n.type),
        (this.selector = q0(n.selectors)),
        (this.ngContentSelectors = n.ngContentSelectors
          ? n.ngContentSelectors
          : []),
        (this.isBoundToModule = !!e);
    }
    create(n, e, r, i) {
      let o = J(null);
      try {
        i = i || this.ngModule;
        let s = i instanceof ct ? i : i?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new Jl(n, s) : n,
          l = a.get(Wn, null);
        if (l === null) throw new v(407, !1);
        let c = a.get(rC, null),
          u = a.get(Um, null),
          d = a.get(vi, null),
          f = {
            rendererFactory: l,
            sanitizer: c,
            inlineEffectRunner: null,
            afterRenderEventManager: u,
            changeDetectionScheduler: d,
          },
          h = l.createRenderer(null, this.componentDef),
          p = this.componentDef.selectors[0][0] || "div",
          y = r
            ? JD(h, r, this.componentDef.encapsulation, a)
            : Ps(h, p, cC(p)),
          T = 512;
        this.componentDef.signals
          ? (T |= 4096)
          : this.componentDef.onPush || (T |= 16);
        let M = null;
        y !== null && (M = $c(y, a, !0));
        let z = eu(0, null, null, 1, 0, null, null, null, null, null, null),
          Z = ks(null, z, null, T, null, null, f, h, a, null, M);
        Fc(Z);
        let ie, $e;
        try {
          let de = this.componentDef,
            fe,
            we = null;
          de.findHostDirectiveDefs
            ? ((fe = []),
              (we = new Map()),
              de.findHostDirectiveDefs(de, fe, we),
              fe.push(de))
            : (fe = [de]);
          let Gt = uC(Z, y),
            dn = dC(Gt, y, de, fe, Z, f, h);
          ($e = pp(z, ke)),
            y && pC(h, de, y, r),
            e !== void 0 && mC($e, this.ngContentSelectors, e),
            (ie = hC(dn, de, fe, we, Z, [gC])),
            ru(z, Z, null);
        } finally {
          Lc();
        }
        return new ec(this.componentType, ie, kr($e, Z), Z, $e);
      } finally {
        J(o);
      }
    }
  },
  ec = class extends Yl {
    constructor(n, e, r, i, o) {
      super(),
        (this.location = r),
        (this._rootLView = i),
        (this._tNode = o),
        (this.previousInputValues = null),
        (this.instance = e),
        (this.hostView = this.changeDetectorRef = new zn(i, void 0, !1)),
        (this.componentType = n);
    }
    setInput(n, e) {
      let r = this._tNode.inputs,
        i;
      if (r !== null && (i = r[n])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(n) &&
            Object.is(this.previousInputValues.get(n), e))
        )
          return;
        let o = this._rootLView;
        nu(o[L], o, i, n, e), this.previousInputValues.set(n, e);
        let s = Cn(this._tNode.index, o);
        iu(s);
      }
    }
    get injector() {
      return new Vn(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(n) {
      this.hostView.onDestroy(n);
    }
  };
function uC(t, n) {
  let e = t[L],
    r = ke;
  return (t[r] = n), jr(e, r, 2, "#host", null);
}
function dC(t, n, e, r, i, o, s) {
  let a = i[L];
  fC(r, t, n, s);
  let l = null;
  n !== null && (l = $c(n, i[Ar]));
  let c = o.rendererFactory.createRenderer(n, e),
    u = 16;
  e.signals ? (u = 4096) : e.onPush && (u = 64);
  let d = ks(i, bm(e), null, u, i[t.index], t, o, c, null, null, l);
  return (
    a.firstCreatePass && Gl(a, t, r.length - 1), js(i, d), (i[t.index] = d)
  );
}
function fC(t, n, e, r) {
  for (let i of t) n.mergedAttrs = ui(n.mergedAttrs, i.hostAttrs);
  n.mergedAttrs !== null &&
    (ds(n, n.mergedAttrs, !0), e !== null && vm(r, e, n));
}
function hC(t, n, e, r, i, o) {
  let s = Je(),
    a = i[L],
    l = Xe(s, i);
  _m(a, i, s, e, null, r);
  for (let u = 0; u < e.length; u++) {
    let d = s.directiveStart + u,
      f = Rr(i, a, d, s);
    En(f, i);
  }
  Sm(a, i, s), l && En(l, i);
  let c = Rr(i, a, s.directiveStart + s.componentOffset, s);
  if (((t[Dt] = i[Dt] = c), o !== null)) for (let u of o) u(c, n);
  return Zc(a, s, i), c;
}
function pC(t, n, e, r) {
  if (r) Al(t, e, ["ng-version", "17.3.12"]);
  else {
    let { attrs: i, classes: o } = G0(n.selectors[0]);
    i && Al(t, e, i), o && o.length > 0 && ym(t, e, o.join(" "));
  }
}
function mC(t, n, e) {
  let r = (t.projection = []);
  for (let i = 0; i < n.length; i++) {
    let o = e[i];
    r.push(o != null ? Array.from(o) : null);
  }
}
function gC() {
  let t = Je();
  As(K()[L], t);
}
var sn = (() => {
  class t {
    static {
      this.__NG_ELEMENT_ID__ = yC;
    }
  }
  return t;
})();
function yC() {
  let t = Je();
  return Hm(t, K());
}
var vC = sn,
  $m = class extends vC {
    constructor(n, e, r) {
      super(),
        (this._lContainer = n),
        (this._hostTNode = e),
        (this._hostLView = r);
    }
    get element() {
      return kr(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new Vn(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let n = kc(this._hostTNode, this._hostLView);
      if (xp(n)) {
        let e = rs(n, this._hostLView),
          r = ns(n),
          i = e[L].data[r + 8];
        return new Vn(i, e);
      } else return new Vn(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(n) {
      let e = Ih(this._lContainer);
      return (e !== null && e[n]) || null;
    }
    get length() {
      return this._lContainer.length - Ve;
    }
    createEmbeddedView(n, e, r) {
      let i, o;
      typeof r == "number"
        ? (i = r)
        : r != null && ((i = r.index), (o = r.injector));
      let s = vh(this._lContainer, n.ssrId),
        a = n.createEmbeddedViewImpl(e || {}, o, s);
      return this.insertImpl(a, i, yh(this._hostTNode, s)), a;
    }
    createComponent(n, e, r, i, o) {
      let s = n && !cE(n),
        a;
      if (s) a = e;
      else {
        let p = e || {};
        (a = p.index),
          (r = p.injector),
          (i = p.projectableNodes),
          (o = p.environmentInjector || p.ngModuleRef);
      }
      let l = s ? n : new Or(vn(n)),
        c = r || this.parentInjector;
      if (!o && l.ngModule == null) {
        let y = (s ? c : this.parentInjector).get(ct, null);
        y && (o = y);
      }
      let u = vn(l.componentType ?? {}),
        d = vh(this._lContainer, u?.id ?? null),
        f = d?.firstChild ?? null,
        h = l.create(c, i, f, o);
      return this.insertImpl(h.hostView, a, yh(this._hostTNode, d)), h;
    }
    insert(n, e) {
      return this.insertImpl(n, e, !0);
    }
    insertImpl(n, e, r) {
      let i = n._lView;
      if (yE(i)) {
        let a = this.indexOf(n);
        if (a !== -1) this.detach(a);
        else {
          let l = i[_e],
            c = new $m(l, l[Ze], l[_e]);
          c.detach(c.indexOf(n));
        }
      }
      let o = this._adjustIndex(e),
        s = this._lContainer;
      return Mw(s, i, o, r), n.attachToViewContainerRef(), zh(wl(s), o, n), n;
    }
    move(n, e) {
      return this.insert(n, e);
    }
    indexOf(n) {
      let e = Ih(this._lContainer);
      return e !== null ? e.indexOf(n) : -1;
    }
    remove(n) {
      let e = this._adjustIndex(n, -1),
        r = Wl(this._lContainer, e);
      r && (Jo(wl(this._lContainer), e), um(r[L], r));
    }
    detach(n) {
      let e = this._adjustIndex(n, -1),
        r = Wl(this._lContainer, e);
      return r && Jo(wl(this._lContainer), e) != null ? new zn(r) : null;
    }
    _adjustIndex(n, e = 0) {
      return n ?? this.length + e;
    }
  };
function Ih(t) {
  return t[ts];
}
function wl(t) {
  return t[ts] || (t[ts] = []);
}
function Hm(t, n) {
  let e,
    r = n[t.index];
  return (
    Rt(r) ? (e = r) : ((e = Tm(r, n, null, t)), (n[t.index] = e), js(n, e)),
    zm(e, n, t, r),
    new $m(e, t, n)
  );
}
function EC(t, n) {
  let e = t[ae],
    r = e.createComment(""),
    i = Xe(n, t),
    o = Kc(e, i);
  return as(e, o, r, HD(e, i), !1), r;
}
var zm = Wm,
  au = () => !1;
function DC(t, n, e) {
  return au(t, n, e);
}
function Wm(t, n, e, r) {
  if (t[Xt]) return;
  let i;
  e.type & 8 ? (i = Ct(r)) : (i = EC(n, e)), (t[Xt] = i);
}
function wC(t, n, e) {
  if (t[Xt] && t[pi]) return !0;
  let r = e[ut],
    i = n.index - ke;
  if (!r || nD(n) || Os(r, i)) return !1;
  let s = zl(r, i),
    a = r.data[Uc]?.[i],
    [l, c] = Zw(s, a);
  return (t[Xt] = l), (t[pi] = c), !0;
}
function CC(t, n, e, r) {
  au(t, e, n) || Wm(t, n, e, r);
}
function bC() {
  (zm = CC), (au = wC);
}
var tc = class t {
    constructor(n) {
      (this.queryList = n), (this.matches = null);
    }
    clone() {
      return new t(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  nc = class t {
    constructor(n = []) {
      this.queries = n;
    }
    createEmbeddedView(n) {
      let e = n.queries;
      if (e !== null) {
        let r = n.contentQueries !== null ? n.contentQueries[0] : e.length,
          i = [];
        for (let o = 0; o < r; o++) {
          let s = e.getByIndex(o),
            a = this.queries[s.indexInDeclarationView];
          i.push(a.clone());
        }
        return new t(i);
      }
      return null;
    }
    insertView(n) {
      this.dirtyQueriesWithMatches(n);
    }
    detachView(n) {
      this.dirtyQueriesWithMatches(n);
    }
    finishViewCreation(n) {
      this.dirtyQueriesWithMatches(n);
    }
    dirtyQueriesWithMatches(n) {
      for (let e = 0; e < this.queries.length; e++)
        lu(n, e).matches !== null && this.queries[e].setDirty();
    }
  },
  hs = class {
    constructor(n, e, r = null) {
      (this.flags = e),
        (this.read = r),
        typeof n == "string" ? (this.predicate = NC(n)) : (this.predicate = n);
    }
  },
  rc = class t {
    constructor(n = []) {
      this.queries = n;
    }
    elementStart(n, e) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].elementStart(n, e);
    }
    elementEnd(n) {
      for (let e = 0; e < this.queries.length; e++)
        this.queries[e].elementEnd(n);
    }
    embeddedTView(n) {
      let e = null;
      for (let r = 0; r < this.length; r++) {
        let i = e !== null ? e.length : 0,
          o = this.getByIndex(r).embeddedTView(n, i);
        o &&
          ((o.indexInDeclarationView = r), e !== null ? e.push(o) : (e = [o]));
      }
      return e !== null ? new t(e) : null;
    }
    template(n, e) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].template(n, e);
    }
    getByIndex(n) {
      return this.queries[n];
    }
    get length() {
      return this.queries.length;
    }
    track(n) {
      this.queries.push(n);
    }
  },
  ic = class t {
    constructor(n, e = -1) {
      (this.metadata = n),
        (this.matches = null),
        (this.indexInDeclarationView = -1),
        (this.crossesNgTemplate = !1),
        (this._appliesToNextNode = !0),
        (this._declarationNodeIndex = e);
    }
    elementStart(n, e) {
      this.isApplyingToNode(e) && this.matchTNode(n, e);
    }
    elementEnd(n) {
      this._declarationNodeIndex === n.index && (this._appliesToNextNode = !1);
    }
    template(n, e) {
      this.elementStart(n, e);
    }
    embeddedTView(n, e) {
      return this.isApplyingToNode(n)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-n.index, e),
          new t(this.metadata))
        : null;
    }
    isApplyingToNode(n) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let e = this._declarationNodeIndex,
          r = n.parent;
        for (; r !== null && r.type & 8 && r.index !== e; ) r = r.parent;
        return e === (r !== null ? r.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(n, e) {
      let r = this.metadata.predicate;
      if (Array.isArray(r))
        for (let i = 0; i < r.length; i++) {
          let o = r[i];
          this.matchTNodeWithReadOption(n, e, IC(e, o)),
            this.matchTNodeWithReadOption(n, e, Ko(e, n, o, !1, !1));
        }
      else
        r === en
          ? e.type & 4 && this.matchTNodeWithReadOption(n, e, -1)
          : this.matchTNodeWithReadOption(n, e, Ko(e, n, r, !1, !1));
    }
    matchTNodeWithReadOption(n, e, r) {
      if (r !== null) {
        let i = this.metadata.read;
        if (i !== null)
          if (i === Re || i === sn || (i === en && e.type & 4))
            this.addMatch(e.index, -2);
          else {
            let o = Ko(e, n, i, !1, !1);
            o !== null && this.addMatch(e.index, o);
          }
        else this.addMatch(e.index, r);
      }
    }
    addMatch(n, e) {
      this.matches === null ? (this.matches = [n, e]) : this.matches.push(n, e);
    }
  };
function IC(t, n) {
  let e = t.localNames;
  if (e !== null) {
    for (let r = 0; r < e.length; r += 2) if (e[r] === n) return e[r + 1];
  }
  return null;
}
function _C(t, n) {
  return t.type & 11 ? kr(t, n) : t.type & 4 ? ou(t, n) : null;
}
function SC(t, n, e, r) {
  return e === -1 ? _C(n, t) : e === -2 ? TC(t, n, r) : Rr(t, t[L], e, n);
}
function TC(t, n, e) {
  if (e === Re) return kr(n, t);
  if (e === en) return ou(n, t);
  if (e === sn) return Hm(n, t);
}
function qm(t, n, e, r) {
  let i = n[Zt].queries[r];
  if (i.matches === null) {
    let o = t.data,
      s = e.matches,
      a = [];
    for (let l = 0; s !== null && l < s.length; l += 2) {
      let c = s[l];
      if (c < 0) a.push(null);
      else {
        let u = o[c];
        a.push(SC(n, u, s[l + 1], e.metadata.read));
      }
    }
    i.matches = a;
  }
  return i.matches;
}
function oc(t, n, e, r) {
  let i = t.queries.getByIndex(e),
    o = i.matches;
  if (o !== null) {
    let s = qm(t, n, i, e);
    for (let a = 0; a < o.length; a += 2) {
      let l = o[a];
      if (l > 0) r.push(s[a / 2]);
      else {
        let c = o[a + 1],
          u = n[-l];
        for (let d = Ve; d < u.length; d++) {
          let f = u[d];
          f[bi] === f[_e] && oc(f[L], f, c, r);
        }
        if (u[xr] !== null) {
          let d = u[xr];
          for (let f = 0; f < d.length; f++) {
            let h = d[f];
            oc(h[L], h, c, r);
          }
        }
      }
    }
  }
  return r;
}
function MC(t, n) {
  return t[Zt].queries[n].queryList;
}
function Gm(t, n, e) {
  let r = new Ul((e & 4) === 4);
  return (
    rw(t, n, r, r.destroy), (n[Zt] ??= new nc()).queries.push(new tc(r)) - 1
  );
}
function AC(t, n, e) {
  let r = Ne();
  return (
    r.firstCreatePass &&
      (Km(r, new hs(t, n, e), -1), (n & 2) === 2 && (r.staticViewQueries = !0)),
    Gm(r, K(), n)
  );
}
function xC(t, n, e, r) {
  let i = Ne();
  if (i.firstCreatePass) {
    let o = Je();
    Km(i, new hs(n, e, r), o.index),
      RC(i, t),
      (e & 2) === 2 && (i.staticContentQueries = !0);
  }
  return Gm(i, K(), e);
}
function NC(t) {
  return t.split(",").map((n) => n.trim());
}
function Km(t, n, e) {
  t.queries === null && (t.queries = new rc()), t.queries.track(new ic(n, e));
}
function RC(t, n) {
  let e = t.contentQueries || (t.contentQueries = []),
    r = e.length ? e[e.length - 1] : -1;
  n !== r && e.push(t.queries.length - 1, n);
}
function lu(t, n) {
  return t.queries.getByIndex(n);
}
function OC(t, n) {
  let e = t[L],
    r = lu(e, n);
  return r.crossesNgTemplate ? oc(e, t, n, []) : qm(e, t, r, n);
}
function cu(t, n) {
  In("NgSignals");
  let e = Ef(t),
    r = e[ur];
  return (
    n?.equal && (r.equal = n.equal),
    (e.set = (i) => Ga(r, i)),
    (e.update = (i) => Df(r, i)),
    (e.asReadonly = PC.bind(e)),
    e
  );
}
function PC() {
  let t = this[ur];
  if (t.readonlyFn === void 0) {
    let n = () => this();
    (n[ur] = t), (t.readonlyFn = n);
  }
  return t.readonlyFn;
}
function FC(t) {
  return Object.getPrototypeOf(t.prototype).constructor;
}
function an(t) {
  let n = FC(t.type),
    e = !0,
    r = [t];
  for (; n; ) {
    let i;
    if ($n(t)) i = n.ɵcmp || n.ɵdir;
    else {
      if (n.ɵcmp) throw new v(903, !1);
      i = n.ɵdir;
    }
    if (i) {
      if (e) {
        r.push(i);
        let s = t;
        (s.inputs = $o(t.inputs)),
          (s.inputTransforms = $o(t.inputTransforms)),
          (s.declaredInputs = $o(t.declaredInputs)),
          (s.outputs = $o(t.outputs));
        let a = i.hostBindings;
        a && BC(t, a);
        let l = i.viewQuery,
          c = i.contentQueries;
        if (
          (l && jC(t, l),
          c && VC(t, c),
          LC(t, i),
          u0(t.outputs, i.outputs),
          $n(i) && i.data.animation)
        ) {
          let u = t.data;
          u.animation = (u.animation || []).concat(i.data.animation);
        }
      }
      let o = i.features;
      if (o)
        for (let s = 0; s < o.length; s++) {
          let a = o[s];
          a && a.ngInherit && a(t), a === an && (e = !1);
        }
    }
    n = Object.getPrototypeOf(n);
  }
  kC(r);
}
function LC(t, n) {
  for (let e in n.inputs) {
    if (!n.inputs.hasOwnProperty(e) || t.inputs.hasOwnProperty(e)) continue;
    let r = n.inputs[e];
    if (
      r !== void 0 &&
      ((t.inputs[e] = r),
      (t.declaredInputs[e] = n.declaredInputs[e]),
      n.inputTransforms !== null)
    ) {
      let i = Array.isArray(r) ? r[0] : r;
      if (!n.inputTransforms.hasOwnProperty(i)) continue;
      (t.inputTransforms ??= {}), (t.inputTransforms[i] = n.inputTransforms[i]);
    }
  }
}
function kC(t) {
  let n = 0,
    e = null;
  for (let r = t.length - 1; r >= 0; r--) {
    let i = t[r];
    (i.hostVars = n += i.hostVars),
      (i.hostAttrs = ui(i.hostAttrs, (e = ui(e, i.hostAttrs))));
  }
}
function $o(t) {
  return t === Mr ? {} : t === Fe ? [] : t;
}
function jC(t, n) {
  let e = t.viewQuery;
  e
    ? (t.viewQuery = (r, i) => {
        n(r, i), e(r, i);
      })
    : (t.viewQuery = n);
}
function VC(t, n) {
  let e = t.contentQueries;
  e
    ? (t.contentQueries = (r, i, o) => {
        n(r, i, o), e(r, i, o);
      })
    : (t.contentQueries = n);
}
function BC(t, n) {
  let e = t.hostBindings;
  e
    ? (t.hostBindings = (r, i) => {
        n(r, i), e(r, i);
      })
    : (t.hostBindings = n);
}
function ln(t) {
  let n = t.inputConfig,
    e = {};
  for (let r in n)
    if (n.hasOwnProperty(r)) {
      let i = n[r];
      Array.isArray(i) && i[3] && (e[r] = i[3]);
    }
  t.inputTransforms = e;
}
var Dn = class {},
  Ei = class {};
var sc = class extends Dn {
    constructor(n, e, r) {
      super(),
        (this._parent = e),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new fs(this));
      let i = Jh(n);
      (this._bootstrapComponents = am(i.bootstrap)),
        (this._r3Injector = Bp(
          n,
          e,
          [
            { provide: Dn, useValue: this },
            { provide: Us, useValue: this.componentFactoryResolver },
            ...r,
          ],
          Le(n),
          new Set(["environment"])
        )),
        this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(n));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let n = this._r3Injector;
      !n.destroyed && n.destroy(),
        this.destroyCbs.forEach((e) => e()),
        (this.destroyCbs = null);
    }
    onDestroy(n) {
      this.destroyCbs.push(n);
    }
  },
  ac = class extends Ei {
    constructor(n) {
      super(), (this.moduleType = n);
    }
    create(n) {
      return new sc(this.moduleType, n, []);
    }
  };
var ps = class extends Dn {
  constructor(n) {
    super(),
      (this.componentFactoryResolver = new fs(this)),
      (this.instance = null);
    let e = new di(
      [
        ...n.providers,
        { provide: Dn, useValue: this },
        { provide: Us, useValue: this.componentFactoryResolver },
      ],
      n.parent || Sc(),
      n.debugName,
      new Set(["environment"])
    );
    (this.injector = e),
      n.runEnvironmentInitializers && e.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(n) {
    this.injector.onDestroy(n);
  }
};
function uu(t, n, e = null) {
  return new ps({
    providers: t,
    parent: n,
    debugName: e,
    runEnvironmentInitializers: !0,
  }).injector;
}
var Si = (() => {
  class t {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new Te(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let e = this.taskId++;
      return this.pendingTasks.add(e), e;
    }
    remove(e) {
      this.pendingTasks.delete(e),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
  }
  return t;
})();
function Qm(t) {
  return du(t)
    ? Array.isArray(t) || (!(t instanceof Map) && Symbol.iterator in t)
    : !1;
}
function UC(t, n) {
  if (Array.isArray(t)) for (let e = 0; e < t.length; e++) n(t[e]);
  else {
    let e = t[Symbol.iterator](),
      r;
    for (; !(r = e.next()).done; ) n(r.value);
  }
}
function du(t) {
  return t !== null && (typeof t == "function" || typeof t == "object");
}
function $s(t, n, e) {
  return (t[n] = e);
}
function $C(t, n) {
  return t[n];
}
function tn(t, n, e) {
  let r = t[n];
  return Object.is(r, e) ? !1 : ((t[n] = e), !0);
}
function Ym(t, n, e, r) {
  let i = tn(t, n, e);
  return tn(t, n + 1, r) || i;
}
function HC(t, n, e, r, i) {
  let o = Ym(t, n, e, r);
  return tn(t, n + 2, i) || o;
}
function Ti(t) {
  return (t.flags & 32) === 32;
}
function zC(t, n, e, r, i, o, s, a, l) {
  let c = n.consts,
    u = jr(n, t, 4, s || null, Nr(c, a));
  tu(n, e, u, Nr(c, l)), As(n, u);
  let d = (u.tView = eu(
    2,
    u,
    r,
    i,
    o,
    n.directiveRegistry,
    n.pipeRegistry,
    null,
    n.schemas,
    c,
    null
  ));
  return (
    n.queries !== null &&
      (n.queries.template(n, u), (d.queries = n.queries.embeddedTView(u))),
    u
  );
}
function O(t, n, e, r, i, o, s, a) {
  let l = K(),
    c = Ne(),
    u = t + ke,
    d = c.firstCreatePass ? zC(u, c, l, n, e, r, i, o, s) : c.data[u];
  Qn(d, !1);
  let f = Zm(c, l, d, t);
  Ms() && Fs(c, l, f, d), En(f, l);
  let h = Tm(f, l, f, d);
  return (
    (l[u] = h),
    js(l, h),
    DC(h, d, l),
    Ss(d) && Xc(c, l, d),
    s != null && Jc(l, d, a),
    O
  );
}
var Zm = Xm;
function Xm(t, n, e, r) {
  return Ot(!0), n[ae].createComment("");
}
function WC(t, n, e, r) {
  let i = n[ut],
    o = !i || Lr() || Ti(e) || Os(i, r);
  if ((Ot(o), o)) return Xm(t, n, e, r);
  let s = i.data[dD]?.[r] ?? null;
  s !== null &&
    e.tView !== null &&
    e.tView.ssrId === null &&
    (e.tView.ssrId = s);
  let a = Vs(i, t, n, e);
  Rs(i, r, a);
  let l = Hc(i, r);
  return Bs(l, a);
}
function qC() {
  Zm = WC;
}
function ne(t, n, e, r) {
  let i = K(),
    o = Oc();
  if (tn(i, o, n)) {
    let s = Ne(),
      a = Sp();
    Ew(a, i, t, n, e, r);
  }
  return ne;
}
function GC(t, n, e, r) {
  return tn(t, Oc(), e) ? n + ws(e) + r : Pt;
}
function Ho(t, n) {
  return (t << 17) | (n << 2);
}
function qn(t) {
  return (t >> 17) & 32767;
}
function KC(t) {
  return (t & 2) == 2;
}
function QC(t, n) {
  return (t & 131071) | (n << 17);
}
function lc(t) {
  return t | 2;
}
function Pr(t) {
  return (t & 131068) >> 2;
}
function Cl(t, n) {
  return (t & -131069) | (n << 2);
}
function YC(t) {
  return (t & 1) === 1;
}
function cc(t) {
  return t | 1;
}
function ZC(t, n, e, r, i, o) {
  let s = o ? n.classBindings : n.styleBindings,
    a = qn(s),
    l = Pr(s);
  t[r] = e;
  let c = !1,
    u;
  if (Array.isArray(e)) {
    let d = e;
    (u = d[1]), (u === null || Ci(d, u) > 0) && (c = !0);
  } else u = e;
  if (i)
    if (l !== 0) {
      let f = qn(t[a + 1]);
      (t[r + 1] = Ho(f, a)),
        f !== 0 && (t[f + 1] = Cl(t[f + 1], r)),
        (t[a + 1] = QC(t[a + 1], r));
    } else
      (t[r + 1] = Ho(a, 0)), a !== 0 && (t[a + 1] = Cl(t[a + 1], r)), (a = r);
  else
    (t[r + 1] = Ho(l, 0)),
      a === 0 ? (a = r) : (t[l + 1] = Cl(t[l + 1], r)),
      (l = r);
  c && (t[r + 1] = lc(t[r + 1])),
    _h(t, u, r, !0),
    _h(t, u, r, !1),
    XC(n, u, t, r, o),
    (s = Ho(a, l)),
    o ? (n.classBindings = s) : (n.styleBindings = s);
}
function XC(t, n, e, r, i) {
  let o = i ? t.residualClasses : t.residualStyles;
  o != null &&
    typeof n == "string" &&
    Ci(o, n) >= 0 &&
    (e[r + 1] = cc(e[r + 1]));
}
function _h(t, n, e, r) {
  let i = t[e + 1],
    o = n === null,
    s = r ? qn(i) : Pr(i),
    a = !1;
  for (; s !== 0 && (a === !1 || o); ) {
    let l = t[s],
      c = t[s + 1];
    JC(l, n) && ((a = !0), (t[s + 1] = r ? cc(c) : lc(c))),
      (s = r ? qn(c) : Pr(c));
  }
  a && (t[e + 1] = r ? lc(i) : cc(i));
}
function JC(t, n) {
  return t === null || n == null || (Array.isArray(t) ? t[1] : t) === n
    ? !0
    : Array.isArray(t) && typeof n == "string"
    ? Ci(t, n) >= 0
    : !1;
}
var vt = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function eb(t) {
  return t.substring(vt.key, vt.keyEnd);
}
function tb(t) {
  return nb(t), Jm(t, eg(t, 0, vt.textEnd));
}
function Jm(t, n) {
  let e = vt.textEnd;
  return e === n ? -1 : ((n = vt.keyEnd = rb(t, (vt.key = n), e)), eg(t, n, e));
}
function nb(t) {
  (vt.key = 0),
    (vt.keyEnd = 0),
    (vt.value = 0),
    (vt.valueEnd = 0),
    (vt.textEnd = t.length);
}
function eg(t, n, e) {
  for (; n < e && t.charCodeAt(n) <= 32; ) n++;
  return n;
}
function rb(t, n, e) {
  for (; n < e && t.charCodeAt(n) > 32; ) n++;
  return n;
}
function D(t, n, e) {
  let r = K(),
    i = Oc();
  if (tn(r, i, n)) {
    let o = Ne(),
      s = Sp();
    aw(o, s, r, t, n, r[ae], e, !1);
  }
  return D;
}
function uc(t, n, e, r, i) {
  let o = n.inputs,
    s = i ? "class" : "style";
  nu(t, e, o[s], s, r);
}
function Hs(t, n) {
  return ob(t, n, null, !0), Hs;
}
function Me(t) {
  sb(fb, ib, t, !0);
}
function ib(t, n) {
  for (let e = tb(n); e >= 0; e = Jm(n, e)) bc(t, eb(n), !0);
}
function ob(t, n, e, r) {
  let i = K(),
    o = Ne(),
    s = Ep(2);
  if ((o.firstUpdatePass && ng(o, t, s, r), n !== Pt && tn(i, s, n))) {
    let a = o.data[Yn()];
    rg(o, a, i, i[ae], t, (i[s + 1] = pb(n, e)), r, s);
  }
}
function sb(t, n, e, r) {
  let i = Ne(),
    o = Ep(2);
  i.firstUpdatePass && ng(i, null, o, r);
  let s = K();
  if (e !== Pt && tn(s, o, e)) {
    let a = i.data[Yn()];
    if (ig(a, r) && !tg(i, o)) {
      let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
      l !== null && (e = _l(l, e || "")), uc(i, a, s, e, r);
    } else hb(i, a, s, s[ae], s[o + 1], (s[o + 1] = db(t, n, e)), r, o);
  }
}
function tg(t, n) {
  return n >= t.expandoStartIndex;
}
function ng(t, n, e, r) {
  let i = t.data;
  if (i[e + 1] === null) {
    let o = i[Yn()],
      s = tg(t, e);
    ig(o, r) && n === null && !s && (n = !1),
      (n = ab(i, o, n, r)),
      ZC(i, o, n, e, s, r);
  }
}
function ab(t, n, e, r) {
  let i = RE(t),
    o = r ? n.residualClasses : n.residualStyles;
  if (i === null)
    (r ? n.classBindings : n.styleBindings) === 0 &&
      ((e = bl(null, t, n, e, r)), (e = Di(e, n.attrs, r)), (o = null));
  else {
    let s = n.directiveStylingLast;
    if (s === -1 || t[s] !== i)
      if (((e = bl(i, t, n, e, r)), o === null)) {
        let l = lb(t, n, r);
        l !== void 0 &&
          Array.isArray(l) &&
          ((l = bl(null, t, n, l[1], r)),
          (l = Di(l, n.attrs, r)),
          cb(t, n, r, l));
      } else o = ub(t, n, r);
  }
  return (
    o !== void 0 && (r ? (n.residualClasses = o) : (n.residualStyles = o)), e
  );
}
function lb(t, n, e) {
  let r = e ? n.classBindings : n.styleBindings;
  if (Pr(r) !== 0) return t[qn(r)];
}
function cb(t, n, e, r) {
  let i = e ? n.classBindings : n.styleBindings;
  t[qn(i)] = r;
}
function ub(t, n, e) {
  let r,
    i = n.directiveEnd;
  for (let o = 1 + n.directiveStylingLast; o < i; o++) {
    let s = t[o].hostAttrs;
    r = Di(r, s, e);
  }
  return Di(r, n.attrs, e);
}
function bl(t, n, e, r, i) {
  let o = null,
    s = e.directiveEnd,
    a = e.directiveStylingLast;
  for (
    a === -1 ? (a = e.directiveStart) : a++;
    a < s && ((o = n[a]), (r = Di(r, o.hostAttrs, i)), o !== t);

  )
    a++;
  return t !== null && (e.directiveStylingLast = a), r;
}
function Di(t, n, e) {
  let r = e ? 1 : 2,
    i = -1;
  if (n !== null)
    for (let o = 0; o < n.length; o++) {
      let s = n[o];
      typeof s == "number"
        ? (i = s)
        : i === r &&
          (Array.isArray(t) || (t = t === void 0 ? [] : ["", t]),
          bc(t, s, e ? !0 : n[++o]));
    }
  return t === void 0 ? null : t;
}
function db(t, n, e) {
  if (e == null || e === "") return Fe;
  let r = [],
    i = _i(e);
  if (Array.isArray(i)) for (let o = 0; o < i.length; o++) t(r, i[o], !0);
  else if (typeof i == "object")
    for (let o in i) i.hasOwnProperty(o) && t(r, o, i[o]);
  else typeof i == "string" && n(r, i);
  return r;
}
function fb(t, n, e) {
  let r = String(n);
  r !== "" && !r.includes(" ") && bc(t, r, e);
}
function hb(t, n, e, r, i, o, s, a) {
  i === Pt && (i = Fe);
  let l = 0,
    c = 0,
    u = 0 < i.length ? i[0] : null,
    d = 0 < o.length ? o[0] : null;
  for (; u !== null || d !== null; ) {
    let f = l < i.length ? i[l + 1] : void 0,
      h = c < o.length ? o[c + 1] : void 0,
      p = null,
      y;
    u === d
      ? ((l += 2), (c += 2), f !== h && ((p = d), (y = h)))
      : d === null || (u !== null && u < d)
      ? ((l += 2), (p = u))
      : ((c += 2), (p = d), (y = h)),
      p !== null && rg(t, n, e, r, p, y, s, a),
      (u = l < i.length ? i[l] : null),
      (d = c < o.length ? o[c] : null);
  }
}
function rg(t, n, e, r, i, o, s, a) {
  if (!(n.type & 3)) return;
  let l = t.data,
    c = l[a + 1],
    u = YC(c) ? Sh(l, n, e, i, Pr(c), s) : void 0;
  if (!ms(u)) {
    ms(o) || (KC(c) && (o = Sh(l, null, e, i, a, s)));
    let d = hp(Yn(), e);
    KD(r, s, d, i, o);
  }
}
function Sh(t, n, e, r, i, o) {
  let s = n === null,
    a;
  for (; i > 0; ) {
    let l = t[i],
      c = Array.isArray(l),
      u = c ? l[1] : l,
      d = u === null,
      f = e[i + 1];
    f === Pt && (f = d ? Fe : void 0);
    let h = d ? ul(f, r) : u === r ? f : void 0;
    if ((c && !ms(h) && (h = ul(l, r)), ms(h) && ((a = h), s))) return a;
    let p = t[i + 1];
    i = s ? qn(p) : Pr(p);
  }
  if (n !== null) {
    let l = o ? n.residualClasses : n.residualStyles;
    l != null && (a = ul(l, r));
  }
  return a;
}
function ms(t) {
  return t !== void 0;
}
function pb(t, n) {
  return (
    t == null ||
      t === "" ||
      (typeof n == "string"
        ? (t = t + n)
        : typeof t == "object" && (t = Le(_i(t)))),
    t
  );
}
function ig(t, n) {
  return (t.flags & (n ? 8 : 16)) !== 0;
}
function mb(t, n, e, r, i, o) {
  let s = n.consts,
    a = Nr(s, i),
    l = jr(n, t, 2, r, a);
  return (
    tu(n, e, l, Nr(s, o)),
    l.attrs !== null && ds(l, l.attrs, !1),
    l.mergedAttrs !== null && ds(l, l.mergedAttrs, !0),
    n.queries !== null && n.queries.elementStart(n, l),
    l
  );
}
function m(t, n, e, r) {
  let i = K(),
    o = Ne(),
    s = ke + t,
    a = i[ae],
    l = o.firstCreatePass ? mb(s, o, i, n, e, r) : o.data[s],
    c = og(o, i, l, a, n, t);
  i[s] = c;
  let u = Ss(l);
  return (
    Qn(l, !0),
    vm(a, c, l),
    !Ti(l) && Ms() && Fs(o, i, c, l),
    wE() === 0 && En(c, i),
    CE(),
    u && (Xc(o, i, l), Zc(o, l, i)),
    r !== null && Jc(i, l),
    m
  );
}
function g() {
  let t = Je();
  Nc() ? Rc() : ((t = t.parent), Qn(t, !1));
  let n = t;
  IE(n) && SE(), bE();
  let e = Ne();
  return (
    e.firstCreatePass && (As(e, t), Mc(t) && e.queries.elementEnd(t)),
    n.classesWithoutHost != null &&
      jE(n) &&
      uc(e, n, K(), n.classesWithoutHost, !0),
    n.stylesWithoutHost != null &&
      VE(n) &&
      uc(e, n, K(), n.stylesWithoutHost, !1),
    g
  );
}
function $(t, n, e, r) {
  return m(t, n, e, r), g(), $;
}
var og = (t, n, e, r, i, o) => (Ot(!0), Ps(r, i, Tp()));
function gb(t, n, e, r, i, o) {
  let s = n[ut],
    a = !s || Lr() || Ti(e) || Os(s, o);
  if ((Ot(a), a)) return Ps(r, i, Tp());
  let l = Vs(s, t, n, e);
  return (
    tm(s, o) && Rs(s, o, l.nextSibling),
    s && (Hp(e) || zp(l)) && Ii(e) && (_E(e), mm(l)),
    l
  );
}
function yb() {
  og = gb;
}
function vb(t, n, e, r, i) {
  let o = n.consts,
    s = Nr(o, r),
    a = jr(n, t, 8, "ng-container", s);
  s !== null && ds(a, s, !0);
  let l = Nr(o, i);
  return tu(n, e, a, l), n.queries !== null && n.queries.elementStart(n, a), a;
}
function Ft(t, n, e) {
  let r = K(),
    i = Ne(),
    o = t + ke,
    s = i.firstCreatePass ? vb(o, i, r, n, e) : i.data[o];
  Qn(s, !0);
  let a = sg(i, r, s, t);
  return (
    (r[o] = a),
    Ms() && Fs(i, r, a, s),
    En(a, r),
    Ss(s) && (Xc(i, r, s), Zc(i, s, r)),
    e != null && Jc(r, s),
    Ft
  );
}
function Lt() {
  let t = Je(),
    n = Ne();
  return (
    Nc() ? Rc() : ((t = t.parent), Qn(t, !1)),
    n.firstCreatePass && (As(n, t), Mc(t) && n.queries.elementEnd(t)),
    Lt
  );
}
function kt(t, n, e) {
  return Ft(t, n, e), Lt(), kt;
}
var sg = (t, n, e, r) => (Ot(!0), Gc(n[ae], ""));
function Eb(t, n, e, r) {
  let i,
    o = n[ut],
    s = !o || Lr() || Ti(e);
  if ((Ot(s), s)) return Gc(n[ae], "");
  let a = Vs(o, t, n, e),
    l = CD(o, r);
  return Rs(o, r, a), (i = Bs(l, a)), i;
}
function Db() {
  sg = Eb;
}
function Vr() {
  return K();
}
var gs = "en-US";
var wb = gs;
function Cb(t) {
  typeof t == "string" && (wb = t.toLowerCase().replace(/_/g, "-"));
}
function ag(t, n, e) {
  let r = t[ae];
  switch (e) {
    case Node.COMMENT_NODE:
      return Gc(r, n);
    case Node.TEXT_NODE:
      return qc(r, n);
    case Node.ELEMENT_NODE:
      return Ps(r, n, null);
  }
}
var bb = (t, n, e, r) => (Ot(!0), ag(t, e, r));
function Ib(t, n, e, r) {
  return Ot(!0), ag(t, e, r);
}
function _b() {
  bb = Ib;
}
function me(t, n, e, r) {
  let i = K(),
    o = Ne(),
    s = Je();
  return Tb(o, i, i[ae], s, t, n, r), me;
}
function Sb(t, n, e, r) {
  let i = t.cleanup;
  if (i != null)
    for (let o = 0; o < i.length - 1; o += 2) {
      let s = i[o];
      if (s === e && i[o + 1] === r) {
        let a = n[fi],
          l = i[o + 2];
        return a.length > l ? a[l] : null;
      }
      typeof s == "string" && (o += 2);
    }
  return null;
}
function Tb(t, n, e, r, i, o, s) {
  let a = Ss(r),
    c = t.firstCreatePass && xm(t),
    u = n[Dt],
    d = Am(n),
    f = !0;
  if (r.type & 3 || s) {
    let y = Xe(r, n),
      T = s ? s(y) : y,
      M = d.length,
      z = s ? (ie) => s(Ct(ie[r.index])) : r.index,
      Z = null;
    if ((!s && a && (Z = Sb(t, n, i, r.index)), Z !== null)) {
      let ie = Z.__ngLastListenerFn__ || Z;
      (ie.__ngNextListenerFn__ = o), (Z.__ngLastListenerFn__ = o), (f = !1);
    } else {
      o = Mh(r, n, u, o, !1);
      let ie = e.listen(T, i, o);
      d.push(o, ie), c && c.push(i, z, M, M + 1);
    }
  } else o = Mh(r, n, u, o, !1);
  let h = r.outputs,
    p;
  if (f && h !== null && (p = h[i])) {
    let y = p.length;
    if (y)
      for (let T = 0; T < y; T += 2) {
        let M = p[T],
          z = p[T + 1],
          $e = n[M][z].subscribe(o),
          de = d.length;
        d.push(o, $e), c && c.push(i, r.index, de, -(de + 1));
      }
  }
}
function Th(t, n, e, r) {
  let i = J(null);
  try {
    return Mt(6, n, e), e(r) !== !1;
  } catch (o) {
    return Nm(t, o), !1;
  } finally {
    Mt(7, n, e), J(i);
  }
}
function Mh(t, n, e, r, i) {
  return function o(s) {
    if (s === Function) return r;
    let a = t.componentOffset > -1 ? Cn(t.index, n) : n;
    iu(a);
    let l = Th(n, e, r, s),
      c = o.__ngNextListenerFn__;
    for (; c; ) (l = Th(n, e, c, s) && l), (c = c.__ngNextListenerFn__);
    return i && l === !1 && s.preventDefault(), l;
  };
}
function re(t = 1) {
  return PE(t);
}
function Mb(t, n) {
  let e = null,
    r = U0(t);
  for (let i = 0; i < n.length; i++) {
    let o = n[i];
    if (o === "*") {
      e = i;
      continue;
    }
    if (r === null ? Qh(t, o, !0) : z0(r, o)) return i;
  }
  return e;
}
function jt(t) {
  let n = K()[Ke][Ze];
  if (!n.projection) {
    let e = t ? t.length : 1,
      r = (n.projection = N0(e, null)),
      i = r.slice(),
      o = n.child;
    for (; o !== null; ) {
      let s = t ? Mb(o, t) : 0;
      s !== null && (i[s] ? (i[s].projectionNext = o) : (r[s] = o), (i[s] = o)),
        (o = o.next);
    }
  }
}
function ft(t, n = 0, e) {
  let r = K(),
    i = Ne(),
    o = jr(i, ke + t, 16, null, e || null);
  o.projection === null && (o.projection = n),
    Rc(),
    (!r[ut] || Lr()) && (o.flags & 32) !== 32 && qD(i, r, o);
}
function cn(t, n, e, r) {
  xC(t, n, e, r);
}
function fu(t, n, e) {
  AC(t, n, e);
}
function It(t) {
  let n = K(),
    e = Ne(),
    r = Dp();
  Pc(r + 1);
  let i = lu(e, r);
  if (t.dirty && gE(n) === ((i.metadata.flags & 2) === 2)) {
    if (i.matches === null) t.reset([]);
    else {
      let o = OC(n, r);
      t.reset(o, XE), t.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function _t() {
  return MC(K(), Dp());
}
function C(t, n = "") {
  let e = K(),
    r = Ne(),
    i = t + ke,
    o = r.firstCreatePass ? jr(r, i, 1, n, null) : r.data[i],
    s = lg(r, e, o, n, t);
  (e[i] = s), Ms() && Fs(r, e, s, o), Qn(o, !1);
}
var lg = (t, n, e, r, i) => (Ot(!0), qc(n[ae], r));
function Ab(t, n, e, r, i) {
  let o = n[ut],
    s = !o || Lr() || Ti(e) || Os(o, i);
  return Ot(s), s ? qc(n[ae], r) : Vs(o, t, n, e);
}
function xb() {
  lg = Ab;
}
function Br(t, n, e) {
  let r = K(),
    i = GC(r, t, n, e);
  return i !== Pt && bw(r, Yn(), i), Br;
}
var Nb = (() => {
  class t {
    constructor(e) {
      (this._injector = e), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(e) {
      if (!e.standalone) return null;
      if (!this.cachedInjectors.has(e)) {
        let r = np(!1, e.type),
          i =
            r.length > 0
              ? uu([r], this._injector, `Standalone[${e.type.name}]`)
              : null;
        this.cachedInjectors.set(e, i);
      }
      return this.cachedInjectors.get(e);
    }
    ngOnDestroy() {
      try {
        for (let e of this.cachedInjectors.values()) e !== null && e.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static {
      this.ɵprov = S({
        token: t,
        providedIn: "environment",
        factory: () => new t(B(ct)),
      });
    }
  }
  return t;
})();
function Y(t) {
  In("NgStandalone"),
    (t.getStandaloneInjector = (n) =>
      n.get(Nb).getOrCreateStandaloneInjector(t));
}
function Oe(t, n, e) {
  let r = Ts() + t,
    i = K();
  return i[r] === Pt ? $s(i, r, e ? n.call(e) : n()) : $C(i, r);
}
function Ue(t, n, e, r) {
  return Rb(K(), Ts(), t, n, e, r);
}
function cg(t, n, e, r, i) {
  return Ob(K(), Ts(), t, n, e, r, i);
}
function zs(t, n, e, r, i, o) {
  return Pb(K(), Ts(), t, n, e, r, i, o);
}
function hu(t, n) {
  let e = t[n];
  return e === Pt ? void 0 : e;
}
function Rb(t, n, e, r, i, o) {
  let s = n + e;
  return tn(t, s, i) ? $s(t, s + 1, o ? r.call(o, i) : r(i)) : hu(t, s + 1);
}
function Ob(t, n, e, r, i, o, s) {
  let a = n + e;
  return Ym(t, a, i, o)
    ? $s(t, a + 2, s ? r.call(s, i, o) : r(i, o))
    : hu(t, a + 2);
}
function Pb(t, n, e, r, i, o, s, a) {
  let l = n + e;
  return HC(t, l, i, o, s)
    ? $s(t, l + 3, a ? r.call(a, i, o, s) : r(i, o, s))
    : hu(t, l + 3);
}
var Ws = (() => {
  class t {
    log(e) {
      console.log(e);
    }
    warn(e) {
      console.warn(e);
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "platform" });
    }
  }
  return t;
})();
var ug = new k("");
function Mi(t) {
  return !!t && typeof t.then == "function";
}
function dg(t) {
  return !!t && typeof t.subscribe == "function";
}
var fg = new k(""),
  hg = (() => {
    class t {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((e, r) => {
            (this.resolve = e), (this.reject = r);
          })),
          (this.appInits = E(fg, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let e = [];
        for (let i of this.appInits) {
          let o = i();
          if (Mi(o)) e.push(o);
          else if (dg(o)) {
            let s = new Promise((a, l) => {
              o.subscribe({ complete: a, error: l });
            });
            e.push(s);
          }
        }
        let r = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(e)
          .then(() => {
            r();
          })
          .catch((i) => {
            this.reject(i);
          }),
          e.length === 0 && r(),
          (this.initialized = !0);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  Ur = new k("");
function Fb() {
  vf(() => {
    throw new v(600, !1);
  });
}
function Lb(t) {
  return t.isBoundToModule;
}
function kb(t, n, e) {
  try {
    let r = e();
    return Mi(r)
      ? r.catch((i) => {
          throw (n.runOutsideAngular(() => t.handleError(i)), i);
        })
      : r;
  } catch (r) {
    throw (n.runOutsideAngular(() => t.handleError(r)), r);
  }
}
var _n = (() => {
  class t {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = E(Up)),
        (this.afterRenderEffectManager = E(Um)),
        (this.externalTestViews = new Set()),
        (this.beforeRender = new Se()),
        (this.afterTick = new Se()),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = E(Si).hasPendingTasks.pipe(W((e) => !e))),
        (this._injector = E(ct));
    }
    get destroyed() {
      return this._destroyed;
    }
    get injector() {
      return this._injector;
    }
    bootstrap(e, r) {
      let i = e instanceof us;
      if (!this._injector.get(hg).done) {
        let f = !i && Xh(e),
          h = !1;
        throw new v(405, h);
      }
      let s;
      i ? (s = e) : (s = this._injector.get(Us).resolveComponentFactory(e)),
        this.componentTypes.push(s.componentType);
      let a = Lb(s) ? void 0 : this._injector.get(Dn),
        l = r || s.selector,
        c = s.create(Zn.NULL, [], l, a),
        u = c.location.nativeElement,
        d = c.injector.get(ug, null);
      return (
        d?.registerApplication(u),
        c.onDestroy(() => {
          this.detachView(c.hostView),
            Il(this.components, c),
            d?.unregisterApplication(u);
        }),
        this._loadComponent(c),
        c
      );
    }
    tick() {
      this._tick(!0);
    }
    _tick(e) {
      if (this._runningTick) throw new v(101, !1);
      let r = J(null);
      try {
        (this._runningTick = !0), this.detectChangesInAttachedViews(e);
      } catch (i) {
        this.internalErrorHandler(i);
      } finally {
        this.afterTick.next(), (this._runningTick = !1), J(r);
      }
    }
    detectChangesInAttachedViews(e) {
      let r = 0,
        i = this.afterRenderEffectManager;
      for (;;) {
        if (r === Om) throw new v(103, !1);
        if (e) {
          let o = r === 0;
          this.beforeRender.next(o);
          for (let { _lView: s, notifyErrorHandler: a } of this._views)
            jb(s, o, a);
        }
        if (
          (r++,
          i.executeInternalCallbacks(),
          ![...this.externalTestViews.keys(), ...this._views].some(
            ({ _lView: o }) => dc(o)
          ) &&
            (i.execute(),
            ![...this.externalTestViews.keys(), ...this._views].some(
              ({ _lView: o }) => dc(o)
            )))
        )
          break;
      }
    }
    attachView(e) {
      let r = e;
      this._views.push(r), r.attachToAppRef(this);
    }
    detachView(e) {
      let r = e;
      Il(this._views, r), r.detachFromAppRef();
    }
    _loadComponent(e) {
      this.attachView(e.hostView), this.tick(), this.components.push(e);
      let r = this._injector.get(Ur, []);
      [...this._bootstrapListeners, ...r].forEach((i) => i(e));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((e) => e()),
            this._views.slice().forEach((e) => e.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(e) {
      return (
        this._destroyListeners.push(e), () => Il(this._destroyListeners, e)
      );
    }
    destroy() {
      if (this._destroyed) throw new v(406, !1);
      let e = this._injector;
      e.destroy && !e.destroyed && e.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
  }
  return t;
})();
function Il(t, n) {
  let e = t.indexOf(n);
  e > -1 && t.splice(e, 1);
}
var zo;
function pu(t) {
  zo ??= new WeakMap();
  let n = zo.get(t);
  if (n) return n;
  let e = t.isStable
    .pipe(gt((r) => r))
    .toPromise()
    .then(() => {});
  return zo.set(t, e), t.onDestroy(() => zo?.delete(t)), e;
}
function jb(t, n, e) {
  (!n && !dc(t)) || Vb(t, e, n);
}
function dc(t) {
  return xc(t);
}
function Vb(t, n, e) {
  let r;
  e ? ((r = 0), (t[x] |= 1024)) : t[x] & 64 ? (r = 0) : (r = 1), Pm(t, n, r);
}
var fc = class {
    constructor(n, e) {
      (this.ngModuleFactory = n), (this.componentFactories = e);
    }
  },
  mu = (() => {
    class t {
      compileModuleSync(e) {
        return new ac(e);
      }
      compileModuleAsync(e) {
        return Promise.resolve(this.compileModuleSync(e));
      }
      compileModuleAndAllComponentsSync(e) {
        let r = this.compileModuleSync(e),
          i = Jh(e),
          o = am(i.declarations).reduce((s, a) => {
            let l = vn(a);
            return l && s.push(new Or(l)), s;
          }, []);
        return new fc(r, o);
      }
      compileModuleAndAllComponentsAsync(e) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(e));
      }
      clearCache() {}
      clearCacheFor(e) {}
      getModuleId(e) {}
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })();
var Bb = (() => {
  class t {
    constructor() {
      (this.zone = E(oe)), (this.applicationRef = E(_n));
    }
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription =
          this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this.zone.run(() => {
                this.applicationRef.tick();
              });
            },
          }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
  }
  return t;
})();
function Ub(t) {
  return [
    { provide: oe, useFactory: t },
    {
      provide: Bn,
      multi: !0,
      useFactory: () => {
        let n = E(Bb, { optional: !0 });
        return () => n.initialize();
      },
    },
    {
      provide: Bn,
      multi: !0,
      useFactory: () => {
        let n = E(Wb);
        return () => {
          n.initialize();
        };
      },
    },
    { provide: Up, useFactory: $b },
  ];
}
function $b() {
  let t = E(oe),
    n = E(Jt);
  return (e) => t.runOutsideAngular(() => n.handleError(e));
}
function Hb(t) {
  let n = Ub(() => new oe(zb(t)));
  return Gn([[], n]);
}
function zb(t) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
  };
}
var Wb = (() => {
  class t {
    constructor() {
      (this.subscription = new ge()),
        (this.initialized = !1),
        (this.zone = E(oe)),
        (this.pendingTasks = E(Si));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let e = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (e = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              oe.assertNotInAngularZone(),
                queueMicrotask(() => {
                  e !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(e), (e = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            oe.assertInAngularZone(), (e ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
  }
  return t;
})();
function qb() {
  return (typeof $localize < "u" && $localize.locale) || gs;
}
var gu = new k("", {
  providedIn: "root",
  factory: () => E(gu, V.Optional | V.SkipSelf) || qb(),
});
var pg = new k("");
var Yo = null;
function Gb(t = [], n) {
  return Zn.create({
    name: n,
    providers: [
      { provide: Is, useValue: "platform" },
      { provide: pg, useValue: new Set([() => (Yo = null)]) },
      ...t,
    ],
  });
}
function Kb(t = []) {
  if (Yo) return Yo;
  let n = Gb(t);
  return (Yo = n), Fb(), Qb(n), n;
}
function Qb(t) {
  t.get(jc, null)?.forEach((e) => e());
}
var Vt = (() => {
  class t {
    static {
      this.__NG_ELEMENT_ID__ = Yb;
    }
  }
  return t;
})();
function Yb(t) {
  return Zb(Je(), K(), (t & 16) === 16);
}
function Zb(t, n, e) {
  if (Ii(t) && !e) {
    let r = Cn(t.index, n);
    return new zn(r, r);
  } else if (t.type & 47) {
    let r = n[Ke];
    return new zn(r, n);
  }
  return null;
}
var hc = class {
    constructor() {}
    supports(n) {
      return Qm(n);
    }
    create(n) {
      return new pc(n);
    }
  },
  Xb = (t, n) => n,
  pc = class {
    constructor(n) {
      (this.length = 0),
        (this._linkedRecords = null),
        (this._unlinkedRecords = null),
        (this._previousItHead = null),
        (this._itHead = null),
        (this._itTail = null),
        (this._additionsHead = null),
        (this._additionsTail = null),
        (this._movesHead = null),
        (this._movesTail = null),
        (this._removalsHead = null),
        (this._removalsTail = null),
        (this._identityChangesHead = null),
        (this._identityChangesTail = null),
        (this._trackByFn = n || Xb);
    }
    forEachItem(n) {
      let e;
      for (e = this._itHead; e !== null; e = e._next) n(e);
    }
    forEachOperation(n) {
      let e = this._itHead,
        r = this._removalsHead,
        i = 0,
        o = null;
      for (; e || r; ) {
        let s = !r || (e && e.currentIndex < Ah(r, i, o)) ? e : r,
          a = Ah(s, i, o),
          l = s.currentIndex;
        if (s === r) i--, (r = r._nextRemoved);
        else if (((e = e._next), s.previousIndex == null)) i++;
        else {
          o || (o = []);
          let c = a - i,
            u = l - i;
          if (c != u) {
            for (let f = 0; f < c; f++) {
              let h = f < o.length ? o[f] : (o[f] = 0),
                p = h + f;
              u <= p && p < c && (o[f] = h + 1);
            }
            let d = s.previousIndex;
            o[d] = u - c;
          }
        }
        a !== l && n(s, a, l);
      }
    }
    forEachPreviousItem(n) {
      let e;
      for (e = this._previousItHead; e !== null; e = e._nextPrevious) n(e);
    }
    forEachAddedItem(n) {
      let e;
      for (e = this._additionsHead; e !== null; e = e._nextAdded) n(e);
    }
    forEachMovedItem(n) {
      let e;
      for (e = this._movesHead; e !== null; e = e._nextMoved) n(e);
    }
    forEachRemovedItem(n) {
      let e;
      for (e = this._removalsHead; e !== null; e = e._nextRemoved) n(e);
    }
    forEachIdentityChange(n) {
      let e;
      for (e = this._identityChangesHead; e !== null; e = e._nextIdentityChange)
        n(e);
    }
    diff(n) {
      if ((n == null && (n = []), !Qm(n))) throw new v(900, !1);
      return this.check(n) ? this : null;
    }
    onDestroy() {}
    check(n) {
      this._reset();
      let e = this._itHead,
        r = !1,
        i,
        o,
        s;
      if (Array.isArray(n)) {
        this.length = n.length;
        for (let a = 0; a < this.length; a++)
          (o = n[a]),
            (s = this._trackByFn(a, o)),
            e === null || !Object.is(e.trackById, s)
              ? ((e = this._mismatch(e, o, s, a)), (r = !0))
              : (r && (e = this._verifyReinsertion(e, o, s, a)),
                Object.is(e.item, o) || this._addIdentityChange(e, o)),
            (e = e._next);
      } else
        (i = 0),
          UC(n, (a) => {
            (s = this._trackByFn(i, a)),
              e === null || !Object.is(e.trackById, s)
                ? ((e = this._mismatch(e, a, s, i)), (r = !0))
                : (r && (e = this._verifyReinsertion(e, a, s, i)),
                  Object.is(e.item, a) || this._addIdentityChange(e, a)),
              (e = e._next),
              i++;
          }),
          (this.length = i);
      return this._truncate(e), (this.collection = n), this.isDirty;
    }
    get isDirty() {
      return (
        this._additionsHead !== null ||
        this._movesHead !== null ||
        this._removalsHead !== null ||
        this._identityChangesHead !== null
      );
    }
    _reset() {
      if (this.isDirty) {
        let n;
        for (n = this._previousItHead = this._itHead; n !== null; n = n._next)
          n._nextPrevious = n._next;
        for (n = this._additionsHead; n !== null; n = n._nextAdded)
          n.previousIndex = n.currentIndex;
        for (
          this._additionsHead = this._additionsTail = null, n = this._movesHead;
          n !== null;
          n = n._nextMoved
        )
          n.previousIndex = n.currentIndex;
        (this._movesHead = this._movesTail = null),
          (this._removalsHead = this._removalsTail = null),
          (this._identityChangesHead = this._identityChangesTail = null);
      }
    }
    _mismatch(n, e, r, i) {
      let o;
      return (
        n === null ? (o = this._itTail) : ((o = n._prev), this._remove(n)),
        (n =
          this._unlinkedRecords === null
            ? null
            : this._unlinkedRecords.get(r, null)),
        n !== null
          ? (Object.is(n.item, e) || this._addIdentityChange(n, e),
            this._reinsertAfter(n, o, i))
          : ((n =
              this._linkedRecords === null
                ? null
                : this._linkedRecords.get(r, i)),
            n !== null
              ? (Object.is(n.item, e) || this._addIdentityChange(n, e),
                this._moveAfter(n, o, i))
              : (n = this._addAfter(new mc(e, r), o, i))),
        n
      );
    }
    _verifyReinsertion(n, e, r, i) {
      let o =
        this._unlinkedRecords === null
          ? null
          : this._unlinkedRecords.get(r, null);
      return (
        o !== null
          ? (n = this._reinsertAfter(o, n._prev, i))
          : n.currentIndex != i &&
            ((n.currentIndex = i), this._addToMoves(n, i)),
        n
      );
    }
    _truncate(n) {
      for (; n !== null; ) {
        let e = n._next;
        this._addToRemovals(this._unlink(n)), (n = e);
      }
      this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
        this._additionsTail !== null && (this._additionsTail._nextAdded = null),
        this._movesTail !== null && (this._movesTail._nextMoved = null),
        this._itTail !== null && (this._itTail._next = null),
        this._removalsTail !== null && (this._removalsTail._nextRemoved = null),
        this._identityChangesTail !== null &&
          (this._identityChangesTail._nextIdentityChange = null);
    }
    _reinsertAfter(n, e, r) {
      this._unlinkedRecords !== null && this._unlinkedRecords.remove(n);
      let i = n._prevRemoved,
        o = n._nextRemoved;
      return (
        i === null ? (this._removalsHead = o) : (i._nextRemoved = o),
        o === null ? (this._removalsTail = i) : (o._prevRemoved = i),
        this._insertAfter(n, e, r),
        this._addToMoves(n, r),
        n
      );
    }
    _moveAfter(n, e, r) {
      return (
        this._unlink(n), this._insertAfter(n, e, r), this._addToMoves(n, r), n
      );
    }
    _addAfter(n, e, r) {
      return (
        this._insertAfter(n, e, r),
        this._additionsTail === null
          ? (this._additionsTail = this._additionsHead = n)
          : (this._additionsTail = this._additionsTail._nextAdded = n),
        n
      );
    }
    _insertAfter(n, e, r) {
      let i = e === null ? this._itHead : e._next;
      return (
        (n._next = i),
        (n._prev = e),
        i === null ? (this._itTail = n) : (i._prev = n),
        e === null ? (this._itHead = n) : (e._next = n),
        this._linkedRecords === null && (this._linkedRecords = new ys()),
        this._linkedRecords.put(n),
        (n.currentIndex = r),
        n
      );
    }
    _remove(n) {
      return this._addToRemovals(this._unlink(n));
    }
    _unlink(n) {
      this._linkedRecords !== null && this._linkedRecords.remove(n);
      let e = n._prev,
        r = n._next;
      return (
        e === null ? (this._itHead = r) : (e._next = r),
        r === null ? (this._itTail = e) : (r._prev = e),
        n
      );
    }
    _addToMoves(n, e) {
      return (
        n.previousIndex === e ||
          (this._movesTail === null
            ? (this._movesTail = this._movesHead = n)
            : (this._movesTail = this._movesTail._nextMoved = n)),
        n
      );
    }
    _addToRemovals(n) {
      return (
        this._unlinkedRecords === null && (this._unlinkedRecords = new ys()),
        this._unlinkedRecords.put(n),
        (n.currentIndex = null),
        (n._nextRemoved = null),
        this._removalsTail === null
          ? ((this._removalsTail = this._removalsHead = n),
            (n._prevRemoved = null))
          : ((n._prevRemoved = this._removalsTail),
            (this._removalsTail = this._removalsTail._nextRemoved = n)),
        n
      );
    }
    _addIdentityChange(n, e) {
      return (
        (n.item = e),
        this._identityChangesTail === null
          ? (this._identityChangesTail = this._identityChangesHead = n)
          : (this._identityChangesTail =
              this._identityChangesTail._nextIdentityChange =
                n),
        n
      );
    }
  },
  mc = class {
    constructor(n, e) {
      (this.item = n),
        (this.trackById = e),
        (this.currentIndex = null),
        (this.previousIndex = null),
        (this._nextPrevious = null),
        (this._prev = null),
        (this._next = null),
        (this._prevDup = null),
        (this._nextDup = null),
        (this._prevRemoved = null),
        (this._nextRemoved = null),
        (this._nextAdded = null),
        (this._nextMoved = null),
        (this._nextIdentityChange = null);
    }
  },
  gc = class {
    constructor() {
      (this._head = null), (this._tail = null);
    }
    add(n) {
      this._head === null
        ? ((this._head = this._tail = n),
          (n._nextDup = null),
          (n._prevDup = null))
        : ((this._tail._nextDup = n),
          (n._prevDup = this._tail),
          (n._nextDup = null),
          (this._tail = n));
    }
    get(n, e) {
      let r;
      for (r = this._head; r !== null; r = r._nextDup)
        if ((e === null || e <= r.currentIndex) && Object.is(r.trackById, n))
          return r;
      return null;
    }
    remove(n) {
      let e = n._prevDup,
        r = n._nextDup;
      return (
        e === null ? (this._head = r) : (e._nextDup = r),
        r === null ? (this._tail = e) : (r._prevDup = e),
        this._head === null
      );
    }
  },
  ys = class {
    constructor() {
      this.map = new Map();
    }
    put(n) {
      let e = n.trackById,
        r = this.map.get(e);
      r || ((r = new gc()), this.map.set(e, r)), r.add(n);
    }
    get(n, e) {
      let r = n,
        i = this.map.get(r);
      return i ? i.get(n, e) : null;
    }
    remove(n) {
      let e = n.trackById;
      return this.map.get(e).remove(n) && this.map.delete(e), n;
    }
    get isEmpty() {
      return this.map.size === 0;
    }
    clear() {
      this.map.clear();
    }
  };
function Ah(t, n, e) {
  let r = t.previousIndex;
  if (r === null) return r;
  let i = 0;
  return e && r < e.length && (i = e[r]), r + n + i;
}
var yc = class {
    constructor() {}
    supports(n) {
      return n instanceof Map || du(n);
    }
    create() {
      return new vc();
    }
  },
  vc = class {
    constructor() {
      (this._records = new Map()),
        (this._mapHead = null),
        (this._appendAfter = null),
        (this._previousMapHead = null),
        (this._changesHead = null),
        (this._changesTail = null),
        (this._additionsHead = null),
        (this._additionsTail = null),
        (this._removalsHead = null),
        (this._removalsTail = null);
    }
    get isDirty() {
      return (
        this._additionsHead !== null ||
        this._changesHead !== null ||
        this._removalsHead !== null
      );
    }
    forEachItem(n) {
      let e;
      for (e = this._mapHead; e !== null; e = e._next) n(e);
    }
    forEachPreviousItem(n) {
      let e;
      for (e = this._previousMapHead; e !== null; e = e._nextPrevious) n(e);
    }
    forEachChangedItem(n) {
      let e;
      for (e = this._changesHead; e !== null; e = e._nextChanged) n(e);
    }
    forEachAddedItem(n) {
      let e;
      for (e = this._additionsHead; e !== null; e = e._nextAdded) n(e);
    }
    forEachRemovedItem(n) {
      let e;
      for (e = this._removalsHead; e !== null; e = e._nextRemoved) n(e);
    }
    diff(n) {
      if (!n) n = new Map();
      else if (!(n instanceof Map || du(n))) throw new v(900, !1);
      return this.check(n) ? this : null;
    }
    onDestroy() {}
    check(n) {
      this._reset();
      let e = this._mapHead;
      if (
        ((this._appendAfter = null),
        this._forEach(n, (r, i) => {
          if (e && e.key === i)
            this._maybeAddToChanges(e, r),
              (this._appendAfter = e),
              (e = e._next);
          else {
            let o = this._getOrCreateRecordForKey(i, r);
            e = this._insertBeforeOrAppend(e, o);
          }
        }),
        e)
      ) {
        e._prev && (e._prev._next = null), (this._removalsHead = e);
        for (let r = e; r !== null; r = r._nextRemoved)
          r === this._mapHead && (this._mapHead = null),
            this._records.delete(r.key),
            (r._nextRemoved = r._next),
            (r.previousValue = r.currentValue),
            (r.currentValue = null),
            (r._prev = null),
            (r._next = null);
      }
      return (
        this._changesTail && (this._changesTail._nextChanged = null),
        this._additionsTail && (this._additionsTail._nextAdded = null),
        this.isDirty
      );
    }
    _insertBeforeOrAppend(n, e) {
      if (n) {
        let r = n._prev;
        return (
          (e._next = n),
          (e._prev = r),
          (n._prev = e),
          r && (r._next = e),
          n === this._mapHead && (this._mapHead = e),
          (this._appendAfter = n),
          n
        );
      }
      return (
        this._appendAfter
          ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
          : (this._mapHead = e),
        (this._appendAfter = e),
        null
      );
    }
    _getOrCreateRecordForKey(n, e) {
      if (this._records.has(n)) {
        let i = this._records.get(n);
        this._maybeAddToChanges(i, e);
        let o = i._prev,
          s = i._next;
        return (
          o && (o._next = s),
          s && (s._prev = o),
          (i._next = null),
          (i._prev = null),
          i
        );
      }
      let r = new Ec(n);
      return (
        this._records.set(n, r),
        (r.currentValue = e),
        this._addToAdditions(r),
        r
      );
    }
    _reset() {
      if (this.isDirty) {
        let n;
        for (
          this._previousMapHead = this._mapHead, n = this._previousMapHead;
          n !== null;
          n = n._next
        )
          n._nextPrevious = n._next;
        for (n = this._changesHead; n !== null; n = n._nextChanged)
          n.previousValue = n.currentValue;
        for (n = this._additionsHead; n != null; n = n._nextAdded)
          n.previousValue = n.currentValue;
        (this._changesHead = this._changesTail = null),
          (this._additionsHead = this._additionsTail = null),
          (this._removalsHead = null);
      }
    }
    _maybeAddToChanges(n, e) {
      Object.is(e, n.currentValue) ||
        ((n.previousValue = n.currentValue),
        (n.currentValue = e),
        this._addToChanges(n));
    }
    _addToAdditions(n) {
      this._additionsHead === null
        ? (this._additionsHead = this._additionsTail = n)
        : ((this._additionsTail._nextAdded = n), (this._additionsTail = n));
    }
    _addToChanges(n) {
      this._changesHead === null
        ? (this._changesHead = this._changesTail = n)
        : ((this._changesTail._nextChanged = n), (this._changesTail = n));
    }
    _forEach(n, e) {
      n instanceof Map
        ? n.forEach(e)
        : Object.keys(n).forEach((r) => e(n[r], r));
    }
  },
  Ec = class {
    constructor(n) {
      (this.key = n),
        (this.previousValue = null),
        (this.currentValue = null),
        (this._nextPrevious = null),
        (this._next = null),
        (this._prev = null),
        (this._nextAdded = null),
        (this._nextRemoved = null),
        (this._nextChanged = null);
    }
  };
function xh() {
  return new yu([new hc()]);
}
var yu = (() => {
  class t {
    static {
      this.ɵprov = S({ token: t, providedIn: "root", factory: xh });
    }
    constructor(e) {
      this.factories = e;
    }
    static create(e, r) {
      if (r != null) {
        let i = r.factories.slice();
        e = e.concat(i);
      }
      return new t(e);
    }
    static extend(e) {
      return {
        provide: t,
        useFactory: (r) => t.create(e, r || xh()),
        deps: [[t, new wc(), new bs()]],
      };
    }
    find(e) {
      let r = this.factories.find((i) => i.supports(e));
      if (r != null) return r;
      throw new v(901, !1);
    }
  }
  return t;
})();
function Nh() {
  return new vu([new yc()]);
}
var vu = (() => {
  class t {
    static {
      this.ɵprov = S({ token: t, providedIn: "root", factory: Nh });
    }
    constructor(e) {
      this.factories = e;
    }
    static create(e, r) {
      if (r) {
        let i = r.factories.slice();
        e = e.concat(i);
      }
      return new t(e);
    }
    static extend(e) {
      return {
        provide: t,
        useFactory: (r) => t.create(e, r || Nh()),
        deps: [[t, new wc(), new bs()]],
      };
    }
    find(e) {
      let r = this.factories.find((i) => i.supports(e));
      if (r) return r;
      throw new v(901, !1);
    }
  }
  return t;
})();
function mg(t) {
  try {
    let { rootComponent: n, appProviders: e, platformProviders: r } = t,
      i = Kb(r),
      o = [Hb(), ...(e || [])],
      a = new ps({
        providers: o,
        parent: i,
        debugName: "",
        runEnvironmentInitializers: !1,
      }).injector,
      l = a.get(oe);
    return l.run(() => {
      a.resolveInjectorInitializers();
      let c = a.get(Jt, null),
        u;
      l.runOutsideAngular(() => {
        u = l.onError.subscribe({
          next: (h) => {
            c.handleError(h);
          },
        });
      });
      let d = () => a.destroy(),
        f = i.get(pg);
      return (
        f.add(d),
        a.onDestroy(() => {
          u.unsubscribe(), f.delete(d);
        }),
        kb(c, l, () => {
          let h = a.get(hg);
          return (
            h.runInitializers(),
            h.donePromise.then(() => {
              let p = a.get(gu, gs);
              Cb(p || gs);
              let y = a.get(_n);
              return n !== void 0 && y.bootstrap(n), y;
            })
          );
        })
      );
    });
  } catch (n) {
    return Promise.reject(n);
  }
}
var Rh = !1,
  Jb = !1;
function eI() {
  Rh || ((Rh = !0), vD(), yb(), xb(), Db(), qC(), bC(), Jw(), nw(), _b());
}
function tI(t, n) {
  return pu(t);
}
function gg() {
  return Gn([
    {
      provide: Bo,
      useFactory: () => {
        let t = !0;
        return (
          Uo() && (t = !!E(Xn, { optional: !0 })?.get(Jp, null)),
          t && In("NgHydration"),
          t
        );
      },
    },
    {
      provide: Bn,
      useValue: () => {
        (Jb = !!E(bD, { optional: !0 })), Uo() && E(Bo) && (nI(), eI());
      },
      multi: !0,
    },
    { provide: rm, useFactory: () => Uo() && E(Bo) },
    {
      provide: Ur,
      useFactory: () => {
        if (Uo() && E(Bo)) {
          let t = E(_n),
            n = E(Zn);
          return () => {
            tI(t, n).then(() => {
              zw(t);
            });
          };
        }
        return () => {};
      },
      multi: !0,
    },
  ]);
}
function nI() {
  let t = xs(),
    n;
  for (let e of t.body.childNodes)
    if (e.nodeType === Node.COMMENT_NODE && e.textContent?.trim() === gD) {
      n = e;
      break;
    }
  if (!n) throw new v(-507, !1);
}
function et(t) {
  return typeof t == "boolean" ? t : t != null && t !== "false";
}
function Ai(t, n = NaN) {
  return !isNaN(parseFloat(t)) && !isNaN(Number(t)) ? Number(t) : n;
}
function yg(t) {
  let n = vn(t);
  if (!n) return null;
  let e = new Or(n);
  return {
    get selector() {
      return e.selector;
    },
    get type() {
      return e.componentType;
    },
    get inputs() {
      return e.inputs;
    },
    get outputs() {
      return e.outputs;
    },
    get ngContentSelectors() {
      return e.ngContentSelectors;
    },
    get isStandalone() {
      return n.standalone;
    },
    get isSignal() {
      return n.signals;
    },
  };
}
var Ig = null;
function $r() {
  return Ig;
}
function _g(t) {
  Ig ??= t;
}
var qs = class {};
var De = new k(""),
  Sg = (() => {
    class t {
      historyGo(e) {
        throw new Error("");
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({
          token: t,
          factory: () => E(iI),
          providedIn: "platform",
        });
      }
    }
    return t;
  })();
var iI = (() => {
  class t extends Sg {
    constructor() {
      super(),
        (this._doc = E(De)),
        (this._location = window.location),
        (this._history = window.history);
    }
    getBaseHrefFromDOM() {
      return $r().getBaseHref(this._doc);
    }
    onPopState(e) {
      let r = $r().getGlobalEventTarget(this._doc, "window");
      return (
        r.addEventListener("popstate", e, !1),
        () => r.removeEventListener("popstate", e)
      );
    }
    onHashChange(e) {
      let r = $r().getGlobalEventTarget(this._doc, "window");
      return (
        r.addEventListener("hashchange", e, !1),
        () => r.removeEventListener("hashchange", e)
      );
    }
    get href() {
      return this._location.href;
    }
    get protocol() {
      return this._location.protocol;
    }
    get hostname() {
      return this._location.hostname;
    }
    get port() {
      return this._location.port;
    }
    get pathname() {
      return this._location.pathname;
    }
    get search() {
      return this._location.search;
    }
    get hash() {
      return this._location.hash;
    }
    set pathname(e) {
      this._location.pathname = e;
    }
    pushState(e, r, i) {
      this._history.pushState(e, r, i);
    }
    replaceState(e, r, i) {
      this._history.replaceState(e, r, i);
    }
    forward() {
      this._history.forward();
    }
    back() {
      this._history.back();
    }
    historyGo(e = 0) {
      this._history.go(e);
    }
    getState() {
      return this._history.state;
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵprov = S({
        token: t,
        factory: () => new t(),
        providedIn: "platform",
      });
    }
  }
  return t;
})();
function Tg(t, n) {
  if (t.length == 0) return n;
  if (n.length == 0) return t;
  let e = 0;
  return (
    t.endsWith("/") && e++,
    n.startsWith("/") && e++,
    e == 2 ? t + n.substring(1) : e == 1 ? t + n : t + "/" + n
  );
}
function vg(t) {
  let n = t.match(/#|\?|$/),
    e = (n && n.index) || t.length,
    r = e - (t[e - 1] === "/" ? 1 : 0);
  return t.slice(0, r) + t.slice(e);
}
function Jn(t) {
  return t && t[0] !== "?" ? "?" + t : t;
}
var Ks = (() => {
    class t {
      historyGo(e) {
        throw new Error("");
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: () => E(Mg), providedIn: "root" });
      }
    }
    return t;
  })(),
  oI = new k(""),
  Mg = (() => {
    class t extends Ks {
      constructor(e, r) {
        super(),
          (this._platformLocation = e),
          (this._removeListenerFns = []),
          (this._baseHref =
            r ??
            this._platformLocation.getBaseHrefFromDOM() ??
            E(De).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(e) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(e),
          this._platformLocation.onHashChange(e)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(e) {
        return Tg(this._baseHref, e);
      }
      path(e = !1) {
        let r =
            this._platformLocation.pathname + Jn(this._platformLocation.search),
          i = this._platformLocation.hash;
        return i && e ? `${r}${i}` : r;
      }
      pushState(e, r, i, o) {
        let s = this.prepareExternalUrl(i + Jn(o));
        this._platformLocation.pushState(e, r, s);
      }
      replaceState(e, r, i, o) {
        let s = this.prepareExternalUrl(i + Jn(o));
        this._platformLocation.replaceState(e, r, s);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(e = 0) {
        this._platformLocation.historyGo?.(e);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(B(Sg), B(oI, 8));
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })();
var xi = (() => {
  class t {
    constructor(e) {
      (this._subject = new Ee()),
        (this._urlChangeListeners = []),
        (this._urlChangeSubscription = null),
        (this._locationStrategy = e);
      let r = this._locationStrategy.getBaseHref();
      (this._basePath = lI(vg(Eg(r)))),
        this._locationStrategy.onPopState((i) => {
          this._subject.emit({
            url: this.path(!0),
            pop: !0,
            state: i.state,
            type: i.type,
          });
        });
    }
    ngOnDestroy() {
      this._urlChangeSubscription?.unsubscribe(),
        (this._urlChangeListeners = []);
    }
    path(e = !1) {
      return this.normalize(this._locationStrategy.path(e));
    }
    getState() {
      return this._locationStrategy.getState();
    }
    isCurrentPathEqualTo(e, r = "") {
      return this.path() == this.normalize(e + Jn(r));
    }
    normalize(e) {
      return t.stripTrailingSlash(aI(this._basePath, Eg(e)));
    }
    prepareExternalUrl(e) {
      return (
        e && e[0] !== "/" && (e = "/" + e),
        this._locationStrategy.prepareExternalUrl(e)
      );
    }
    go(e, r = "", i = null) {
      this._locationStrategy.pushState(i, "", e, r),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(e + Jn(r)), i);
    }
    replaceState(e, r = "", i = null) {
      this._locationStrategy.replaceState(i, "", e, r),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(e + Jn(r)), i);
    }
    forward() {
      this._locationStrategy.forward();
    }
    back() {
      this._locationStrategy.back();
    }
    historyGo(e = 0) {
      this._locationStrategy.historyGo?.(e);
    }
    onUrlChange(e) {
      return (
        this._urlChangeListeners.push(e),
        (this._urlChangeSubscription ??= this.subscribe((r) => {
          this._notifyUrlChangeListeners(r.url, r.state);
        })),
        () => {
          let r = this._urlChangeListeners.indexOf(e);
          this._urlChangeListeners.splice(r, 1),
            this._urlChangeListeners.length === 0 &&
              (this._urlChangeSubscription?.unsubscribe(),
              (this._urlChangeSubscription = null));
        }
      );
    }
    _notifyUrlChangeListeners(e = "", r) {
      this._urlChangeListeners.forEach((i) => i(e, r));
    }
    subscribe(e, r, i) {
      return this._subject.subscribe({ next: e, error: r, complete: i });
    }
    static {
      this.normalizeQueryParams = Jn;
    }
    static {
      this.joinWithSlash = Tg;
    }
    static {
      this.stripTrailingSlash = vg;
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)(B(Ks));
      };
    }
    static {
      this.ɵprov = S({ token: t, factory: () => sI(), providedIn: "root" });
    }
  }
  return t;
})();
function sI() {
  return new xi(B(Ks));
}
function aI(t, n) {
  if (!t || !n.startsWith(t)) return n;
  let e = n.substring(t.length);
  return e === "" || ["/", ";", "?", "#"].includes(e[0]) ? e : n;
}
function Eg(t) {
  return t.replace(/\/index.html$/, "");
}
function lI(t) {
  if (new RegExp("^(https?:)?//").test(t)) {
    let [, e] = t.split(/\/\/[^\/]+/);
    return e;
  }
  return t;
}
function Cu(t, n) {
  n = encodeURIComponent(n);
  for (let e of t.split(";")) {
    let r = e.indexOf("="),
      [i, o] = r == -1 ? [e, ""] : [e.slice(0, r), e.slice(r + 1)];
    if (i.trim() === n) return decodeURIComponent(o);
  }
  return null;
}
var Eu = /\s+/,
  Dg = [],
  Ni = (() => {
    class t {
      constructor(e, r) {
        (this._ngEl = e),
          (this._renderer = r),
          (this.initialClasses = Dg),
          (this.stateMap = new Map());
      }
      set klass(e) {
        this.initialClasses = e != null ? e.trim().split(Eu) : Dg;
      }
      set ngClass(e) {
        this.rawClass = typeof e == "string" ? e.trim().split(Eu) : e;
      }
      ngDoCheck() {
        for (let r of this.initialClasses) this._updateState(r, !0);
        let e = this.rawClass;
        if (Array.isArray(e) || e instanceof Set)
          for (let r of e) this._updateState(r, !0);
        else if (e != null)
          for (let r of Object.keys(e)) this._updateState(r, !!e[r]);
        this._applyStateDiff();
      }
      _updateState(e, r) {
        let i = this.stateMap.get(e);
        i !== void 0
          ? (i.enabled !== r && ((i.changed = !0), (i.enabled = r)),
            (i.touched = !0))
          : this.stateMap.set(e, { enabled: r, changed: !0, touched: !0 });
      }
      _applyStateDiff() {
        for (let e of this.stateMap) {
          let r = e[0],
            i = e[1];
          i.changed
            ? (this._toggleClass(r, i.enabled), (i.changed = !1))
            : i.touched ||
              (i.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)),
            (i.touched = !1);
        }
      }
      _toggleClass(e, r) {
        (e = e.trim()),
          e.length > 0 &&
            e.split(Eu).forEach((i) => {
              r
                ? this._renderer.addClass(this._ngEl.nativeElement, i)
                : this._renderer.removeClass(this._ngEl.nativeElement, i);
            });
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(H(Re), H(on));
        };
      }
      static {
        this.ɵdir = dt({
          type: t,
          selectors: [["", "ngClass", ""]],
          inputs: { klass: [le.None, "class", "klass"], ngClass: "ngClass" },
          standalone: !0,
        });
      }
    }
    return t;
  })();
var Du = class {
    constructor(n, e, r, i) {
      (this.$implicit = n),
        (this.ngForOf = e),
        (this.index = r),
        (this.count = i);
    }
    get first() {
      return this.index === 0;
    }
    get last() {
      return this.index === this.count - 1;
    }
    get even() {
      return this.index % 2 === 0;
    }
    get odd() {
      return !this.even;
    }
  },
  Ag = (() => {
    class t {
      set ngForOf(e) {
        (this._ngForOf = e), (this._ngForOfDirty = !0);
      }
      set ngForTrackBy(e) {
        this._trackByFn = e;
      }
      get ngForTrackBy() {
        return this._trackByFn;
      }
      constructor(e, r, i) {
        (this._viewContainer = e),
          (this._template = r),
          (this._differs = i),
          (this._ngForOf = null),
          (this._ngForOfDirty = !0),
          (this._differ = null);
      }
      set ngForTemplate(e) {
        e && (this._template = e);
      }
      ngDoCheck() {
        if (this._ngForOfDirty) {
          this._ngForOfDirty = !1;
          let e = this._ngForOf;
          if (!this._differ && e)
            if (0)
              try {
              } catch {}
            else this._differ = this._differs.find(e).create(this.ngForTrackBy);
        }
        if (this._differ) {
          let e = this._differ.diff(this._ngForOf);
          e && this._applyChanges(e);
        }
      }
      _applyChanges(e) {
        let r = this._viewContainer;
        e.forEachOperation((i, o, s) => {
          if (i.previousIndex == null)
            r.createEmbeddedView(
              this._template,
              new Du(i.item, this._ngForOf, -1, -1),
              s === null ? void 0 : s
            );
          else if (s == null) r.remove(o === null ? void 0 : o);
          else if (o !== null) {
            let a = r.get(o);
            r.move(a, s), wg(a, i);
          }
        });
        for (let i = 0, o = r.length; i < o; i++) {
          let a = r.get(i).context;
          (a.index = i), (a.count = o), (a.ngForOf = this._ngForOf);
        }
        e.forEachIdentityChange((i) => {
          let o = r.get(i.currentIndex);
          wg(o, i);
        });
      }
      static ngTemplateContextGuard(e, r) {
        return !0;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(H(sn), H(en), H(yu));
        };
      }
      static {
        this.ɵdir = dt({
          type: t,
          selectors: [["", "ngFor", "", "ngForOf", ""]],
          inputs: {
            ngForOf: "ngForOf",
            ngForTrackBy: "ngForTrackBy",
            ngForTemplate: "ngForTemplate",
          },
          standalone: !0,
        });
      }
    }
    return t;
  })();
function wg(t, n) {
  t.context.$implicit = n.item;
}
var Qs = (() => {
    class t {
      constructor(e, r) {
        (this._viewContainer = e),
          (this._context = new wu()),
          (this._thenTemplateRef = null),
          (this._elseTemplateRef = null),
          (this._thenViewRef = null),
          (this._elseViewRef = null),
          (this._thenTemplateRef = r);
      }
      set ngIf(e) {
        (this._context.$implicit = this._context.ngIf = e), this._updateView();
      }
      set ngIfThen(e) {
        Cg("ngIfThen", e),
          (this._thenTemplateRef = e),
          (this._thenViewRef = null),
          this._updateView();
      }
      set ngIfElse(e) {
        Cg("ngIfElse", e),
          (this._elseTemplateRef = e),
          (this._elseViewRef = null),
          this._updateView();
      }
      _updateView() {
        this._context.$implicit
          ? this._thenViewRef ||
            (this._viewContainer.clear(),
            (this._elseViewRef = null),
            this._thenTemplateRef &&
              (this._thenViewRef = this._viewContainer.createEmbeddedView(
                this._thenTemplateRef,
                this._context
              )))
          : this._elseViewRef ||
            (this._viewContainer.clear(),
            (this._thenViewRef = null),
            this._elseTemplateRef &&
              (this._elseViewRef = this._viewContainer.createEmbeddedView(
                this._elseTemplateRef,
                this._context
              )));
      }
      static ngTemplateContextGuard(e, r) {
        return !0;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(H(sn), H(en));
        };
      }
      static {
        this.ɵdir = dt({
          type: t,
          selectors: [["", "ngIf", ""]],
          inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" },
          standalone: !0,
        });
      }
    }
    return t;
  })(),
  wu = class {
    constructor() {
      (this.$implicit = null), (this.ngIf = null);
    }
  };
function Cg(t, n) {
  if (!!!(!n || n.createEmbeddedView))
    throw new Error(`${t} must be a TemplateRef, but received '${Le(n)}'.`);
}
var Ri = (() => {
    class t {
      constructor(e, r, i) {
        (this._ngEl = e),
          (this._differs = r),
          (this._renderer = i),
          (this._ngStyle = null),
          (this._differ = null);
      }
      set ngStyle(e) {
        (this._ngStyle = e),
          !this._differ && e && (this._differ = this._differs.find(e).create());
      }
      ngDoCheck() {
        if (this._differ) {
          let e = this._differ.diff(this._ngStyle);
          e && this._applyChanges(e);
        }
      }
      _setStyle(e, r) {
        let [i, o] = e.split("."),
          s = i.indexOf("-") === -1 ? void 0 : Nt.DashCase;
        r != null
          ? this._renderer.setStyle(
              this._ngEl.nativeElement,
              i,
              o ? `${r}${o}` : r,
              s
            )
          : this._renderer.removeStyle(this._ngEl.nativeElement, i, s);
      }
      _applyChanges(e) {
        e.forEachRemovedItem((r) => this._setStyle(r.key, null)),
          e.forEachAddedItem((r) => this._setStyle(r.key, r.currentValue)),
          e.forEachChangedItem((r) => this._setStyle(r.key, r.currentValue));
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(H(Re), H(vu), H(on));
        };
      }
      static {
        this.ɵdir = dt({
          type: t,
          selectors: [["", "ngStyle", ""]],
          inputs: { ngStyle: "ngStyle" },
          standalone: !0,
        });
      }
    }
    return t;
  })(),
  Ys = (() => {
    class t {
      constructor(e) {
        (this._viewContainerRef = e),
          (this._viewRef = null),
          (this.ngTemplateOutletContext = null),
          (this.ngTemplateOutlet = null),
          (this.ngTemplateOutletInjector = null);
      }
      ngOnChanges(e) {
        if (this._shouldRecreateView(e)) {
          let r = this._viewContainerRef;
          if (
            (this._viewRef && r.remove(r.indexOf(this._viewRef)),
            !this.ngTemplateOutlet)
          ) {
            this._viewRef = null;
            return;
          }
          let i = this._createContextForwardProxy();
          this._viewRef = r.createEmbeddedView(this.ngTemplateOutlet, i, {
            injector: this.ngTemplateOutletInjector ?? void 0,
          });
        }
      }
      _shouldRecreateView(e) {
        return !!e.ngTemplateOutlet || !!e.ngTemplateOutletInjector;
      }
      _createContextForwardProxy() {
        return new Proxy(
          {},
          {
            set: (e, r, i) =>
              this.ngTemplateOutletContext
                ? Reflect.set(this.ngTemplateOutletContext, r, i)
                : !1,
            get: (e, r, i) => {
              if (this.ngTemplateOutletContext)
                return Reflect.get(this.ngTemplateOutletContext, r, i);
            },
          }
        );
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(H(sn));
        };
      }
      static {
        this.ɵdir = dt({
          type: t,
          selectors: [["", "ngTemplateOutlet", ""]],
          inputs: {
            ngTemplateOutletContext: "ngTemplateOutletContext",
            ngTemplateOutlet: "ngTemplateOutlet",
            ngTemplateOutletInjector: "ngTemplateOutletInjector",
          },
          standalone: !0,
          features: [Kn],
        });
      }
    }
    return t;
  })();
var Bt = (() => {
    class t {
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵmod = Ye({ type: t });
      }
      static {
        this.ɵinj = Qe({});
      }
    }
    return t;
  })(),
  bu = "browser",
  cI = "server";
function Sn(t) {
  return t === bu;
}
function Oi(t) {
  return t === cI;
}
var Gs = class {};
var Xs = class t {
  constructor(n) {
    (this.normalizedNames = new Map()),
      (this.lazyUpdate = null),
      n
        ? typeof n == "string"
          ? (this.lazyInit = () => {
              (this.headers = new Map()),
                n
                  .split(
                    `
`
                  )
                  .forEach((e) => {
                    let r = e.indexOf(":");
                    if (r > 0) {
                      let i = e.slice(0, r),
                        o = i.toLowerCase(),
                        s = e.slice(r + 1).trim();
                      this.maybeSetNormalizedName(i, o),
                        this.headers.has(o)
                          ? this.headers.get(o).push(s)
                          : this.headers.set(o, [s]);
                    }
                  });
            })
          : typeof Headers < "u" && n instanceof Headers
          ? ((this.headers = new Map()),
            n.forEach((e, r) => {
              this.setHeaderEntries(r, e);
            }))
          : (this.lazyInit = () => {
              (this.headers = new Map()),
                Object.entries(n).forEach(([e, r]) => {
                  this.setHeaderEntries(e, r);
                });
            })
        : (this.headers = new Map());
  }
  has(n) {
    return this.init(), this.headers.has(n.toLowerCase());
  }
  get(n) {
    this.init();
    let e = this.headers.get(n.toLowerCase());
    return e && e.length > 0 ? e[0] : null;
  }
  keys() {
    return this.init(), Array.from(this.normalizedNames.values());
  }
  getAll(n) {
    return this.init(), this.headers.get(n.toLowerCase()) || null;
  }
  append(n, e) {
    return this.clone({ name: n, value: e, op: "a" });
  }
  set(n, e) {
    return this.clone({ name: n, value: e, op: "s" });
  }
  delete(n, e) {
    return this.clone({ name: n, value: e, op: "d" });
  }
  maybeSetNormalizedName(n, e) {
    this.normalizedNames.has(e) || this.normalizedNames.set(e, n);
  }
  init() {
    this.lazyInit &&
      (this.lazyInit instanceof t
        ? this.copyFrom(this.lazyInit)
        : this.lazyInit(),
      (this.lazyInit = null),
      this.lazyUpdate &&
        (this.lazyUpdate.forEach((n) => this.applyUpdate(n)),
        (this.lazyUpdate = null)));
  }
  copyFrom(n) {
    n.init(),
      Array.from(n.headers.keys()).forEach((e) => {
        this.headers.set(e, n.headers.get(e)),
          this.normalizedNames.set(e, n.normalizedNames.get(e));
      });
  }
  clone(n) {
    let e = new t();
    return (
      (e.lazyInit =
        this.lazyInit && this.lazyInit instanceof t ? this.lazyInit : this),
      (e.lazyUpdate = (this.lazyUpdate || []).concat([n])),
      e
    );
  }
  applyUpdate(n) {
    let e = n.name.toLowerCase();
    switch (n.op) {
      case "a":
      case "s":
        let r = n.value;
        if ((typeof r == "string" && (r = [r]), r.length === 0)) return;
        this.maybeSetNormalizedName(n.name, e);
        let i = (n.op === "a" ? this.headers.get(e) : void 0) || [];
        i.push(...r), this.headers.set(e, i);
        break;
      case "d":
        let o = n.value;
        if (!o) this.headers.delete(e), this.normalizedNames.delete(e);
        else {
          let s = this.headers.get(e);
          if (!s) return;
          (s = s.filter((a) => o.indexOf(a) === -1)),
            s.length === 0
              ? (this.headers.delete(e), this.normalizedNames.delete(e))
              : this.headers.set(e, s);
        }
        break;
    }
  }
  setHeaderEntries(n, e) {
    let r = (Array.isArray(e) ? e : [e]).map((o) => o.toString()),
      i = n.toLowerCase();
    this.headers.set(i, r), this.maybeSetNormalizedName(n, i);
  }
  forEach(n) {
    this.init(),
      Array.from(this.normalizedNames.keys()).forEach((e) =>
        n(this.normalizedNames.get(e), this.headers.get(e))
      );
  }
};
var jg = (function (t) {
    return (
      (t[(t.Sent = 0)] = "Sent"),
      (t[(t.UploadProgress = 1)] = "UploadProgress"),
      (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
      (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
      (t[(t.Response = 4)] = "Response"),
      (t[(t.User = 5)] = "User"),
      t
    );
  })(jg || {}),
  Iu = class {
    constructor(n, e = Vg.Ok, r = "OK") {
      (this.headers = n.headers || new Xs()),
        (this.status = n.status !== void 0 ? n.status : e),
        (this.statusText = n.statusText || r),
        (this.url = n.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  };
var Js = class t extends Iu {
  constructor(n = {}) {
    super(n),
      (this.type = jg.Response),
      (this.body = n.body !== void 0 ? n.body : null);
  }
  clone(n = {}) {
    return new t({
      body: n.body !== void 0 ? n.body : this.body,
      headers: n.headers || this.headers,
      status: n.status !== void 0 ? n.status : this.status,
      statusText: n.statusText || this.statusText,
      url: n.url || this.url || void 0,
    });
  }
};
var Vg = (function (t) {
  return (
    (t[(t.Continue = 100)] = "Continue"),
    (t[(t.SwitchingProtocols = 101)] = "SwitchingProtocols"),
    (t[(t.Processing = 102)] = "Processing"),
    (t[(t.EarlyHints = 103)] = "EarlyHints"),
    (t[(t.Ok = 200)] = "Ok"),
    (t[(t.Created = 201)] = "Created"),
    (t[(t.Accepted = 202)] = "Accepted"),
    (t[(t.NonAuthoritativeInformation = 203)] = "NonAuthoritativeInformation"),
    (t[(t.NoContent = 204)] = "NoContent"),
    (t[(t.ResetContent = 205)] = "ResetContent"),
    (t[(t.PartialContent = 206)] = "PartialContent"),
    (t[(t.MultiStatus = 207)] = "MultiStatus"),
    (t[(t.AlreadyReported = 208)] = "AlreadyReported"),
    (t[(t.ImUsed = 226)] = "ImUsed"),
    (t[(t.MultipleChoices = 300)] = "MultipleChoices"),
    (t[(t.MovedPermanently = 301)] = "MovedPermanently"),
    (t[(t.Found = 302)] = "Found"),
    (t[(t.SeeOther = 303)] = "SeeOther"),
    (t[(t.NotModified = 304)] = "NotModified"),
    (t[(t.UseProxy = 305)] = "UseProxy"),
    (t[(t.Unused = 306)] = "Unused"),
    (t[(t.TemporaryRedirect = 307)] = "TemporaryRedirect"),
    (t[(t.PermanentRedirect = 308)] = "PermanentRedirect"),
    (t[(t.BadRequest = 400)] = "BadRequest"),
    (t[(t.Unauthorized = 401)] = "Unauthorized"),
    (t[(t.PaymentRequired = 402)] = "PaymentRequired"),
    (t[(t.Forbidden = 403)] = "Forbidden"),
    (t[(t.NotFound = 404)] = "NotFound"),
    (t[(t.MethodNotAllowed = 405)] = "MethodNotAllowed"),
    (t[(t.NotAcceptable = 406)] = "NotAcceptable"),
    (t[(t.ProxyAuthenticationRequired = 407)] = "ProxyAuthenticationRequired"),
    (t[(t.RequestTimeout = 408)] = "RequestTimeout"),
    (t[(t.Conflict = 409)] = "Conflict"),
    (t[(t.Gone = 410)] = "Gone"),
    (t[(t.LengthRequired = 411)] = "LengthRequired"),
    (t[(t.PreconditionFailed = 412)] = "PreconditionFailed"),
    (t[(t.PayloadTooLarge = 413)] = "PayloadTooLarge"),
    (t[(t.UriTooLong = 414)] = "UriTooLong"),
    (t[(t.UnsupportedMediaType = 415)] = "UnsupportedMediaType"),
    (t[(t.RangeNotSatisfiable = 416)] = "RangeNotSatisfiable"),
    (t[(t.ExpectationFailed = 417)] = "ExpectationFailed"),
    (t[(t.ImATeapot = 418)] = "ImATeapot"),
    (t[(t.MisdirectedRequest = 421)] = "MisdirectedRequest"),
    (t[(t.UnprocessableEntity = 422)] = "UnprocessableEntity"),
    (t[(t.Locked = 423)] = "Locked"),
    (t[(t.FailedDependency = 424)] = "FailedDependency"),
    (t[(t.TooEarly = 425)] = "TooEarly"),
    (t[(t.UpgradeRequired = 426)] = "UpgradeRequired"),
    (t[(t.PreconditionRequired = 428)] = "PreconditionRequired"),
    (t[(t.TooManyRequests = 429)] = "TooManyRequests"),
    (t[(t.RequestHeaderFieldsTooLarge = 431)] = "RequestHeaderFieldsTooLarge"),
    (t[(t.UnavailableForLegalReasons = 451)] = "UnavailableForLegalReasons"),
    (t[(t.InternalServerError = 500)] = "InternalServerError"),
    (t[(t.NotImplemented = 501)] = "NotImplemented"),
    (t[(t.BadGateway = 502)] = "BadGateway"),
    (t[(t.ServiceUnavailable = 503)] = "ServiceUnavailable"),
    (t[(t.GatewayTimeout = 504)] = "GatewayTimeout"),
    (t[(t.HttpVersionNotSupported = 505)] = "HttpVersionNotSupported"),
    (t[(t.VariantAlsoNegotiates = 506)] = "VariantAlsoNegotiates"),
    (t[(t.InsufficientStorage = 507)] = "InsufficientStorage"),
    (t[(t.LoopDetected = 508)] = "LoopDetected"),
    (t[(t.NotExtended = 510)] = "NotExtended"),
    (t[(t.NetworkAuthenticationRequired = 511)] =
      "NetworkAuthenticationRequired"),
    t
  );
})(Vg || {});
var dI = new k("");
var Ng = "b",
  Rg = "h",
  Og = "s",
  Pg = "st",
  Fg = "u",
  Lg = "rt",
  Zs = new k(""),
  fI = ["GET", "HEAD"];
function hI(t, n) {
  let d = E(Zs),
    { isCacheActive: e } = d,
    r = go(d, ["isCacheActive"]),
    { transferCache: i, method: o } = t;
  if (
    !e ||
    (o === "POST" && !r.includePostRequests && !i) ||
    (o !== "POST" && !fI.includes(o)) ||
    i === !1 ||
    r.filter?.(t) === !1
  )
    return n(t);
  let s = E(Xn),
    a = mI(t),
    l = s.get(a, null),
    c = r.includeHeaders;
  if ((typeof i == "object" && i.includeHeaders && (c = i.includeHeaders), l)) {
    let { [Ng]: f, [Lg]: h, [Rg]: p, [Og]: y, [Pg]: T, [Fg]: M } = l,
      z = f;
    switch (h) {
      case "arraybuffer":
        z = new TextEncoder().encode(f).buffer;
        break;
      case "blob":
        z = new Blob([f]);
        break;
    }
    let Z = new Xs(p);
    return N(new Js({ body: z, headers: Z, status: y, statusText: T, url: M }));
  }
  let u = Oi(E(Be));
  return n(t).pipe(
    ve((f) => {
      f instanceof Js &&
        u &&
        s.set(a, {
          [Ng]: f.body,
          [Rg]: pI(f.headers, c),
          [Og]: f.status,
          [Pg]: f.statusText,
          [Fg]: f.url || "",
          [Lg]: t.responseType,
        });
    })
  );
}
function pI(t, n) {
  if (!n) return {};
  let e = {};
  for (let r of n) {
    let i = t.getAll(r);
    i !== null && (e[r] = i);
  }
  return e;
}
function kg(t) {
  return [...t.keys()]
    .sort()
    .map((n) => `${n}=${t.getAll(n)}`)
    .join("&");
}
function mI(t) {
  let { params: n, method: e, responseType: r, url: i } = t,
    o = kg(n),
    s = t.serializeBody();
  s instanceof URLSearchParams ? (s = kg(s)) : typeof s != "string" && (s = "");
  let a = [e, r, i, s, o].join("|"),
    l = gI(a);
  return l;
}
function gI(t) {
  let n = 0;
  for (let e of t) n = (Math.imul(31, n) + e.charCodeAt(0)) << 0;
  return (n += 2147483648), n.toString();
}
function Bg(t) {
  return [
    {
      provide: Zs,
      useFactory: () => (
        In("NgHttpTransferCache"), w({ isCacheActive: !0 }, t)
      ),
    },
    { provide: dI, useValue: hI, multi: !0, deps: [Xn, Zs] },
    {
      provide: Ur,
      multi: !0,
      useFactory: () => {
        let n = E(_n),
          e = E(Zs);
        return () => {
          pu(n).then(() => {
            e.isCacheActive = !1;
          });
        };
      },
    },
  ];
}
var Tu = class extends qs {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  Mu = class t extends Tu {
    static makeCurrent() {
      _g(new t());
    }
    onAndCancel(n, e, r) {
      return (
        n.addEventListener(e, r),
        () => {
          n.removeEventListener(e, r);
        }
      );
    }
    dispatchEvent(n, e) {
      n.dispatchEvent(e);
    }
    remove(n) {
      n.parentNode && n.parentNode.removeChild(n);
    }
    createElement(n, e) {
      return (e = e || this.getDefaultDocument()), e.createElement(n);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(n) {
      return n.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(n) {
      return n instanceof DocumentFragment;
    }
    getGlobalEventTarget(n, e) {
      return e === "window"
        ? window
        : e === "document"
        ? n
        : e === "body"
        ? n.body
        : null;
    }
    getBaseHref(n) {
      let e = yI();
      return e == null ? null : vI(e);
    }
    resetBaseElement() {
      Pi = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(n) {
      return Cu(document.cookie, n);
    }
  },
  Pi = null;
function yI() {
  return (
    (Pi = Pi || document.querySelector("base")),
    Pi ? Pi.getAttribute("href") : null
  );
}
function vI(t) {
  return new URL(t, document.baseURI).pathname;
}
var EI = (() => {
    class t {
      build() {
        return new XMLHttpRequest();
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  Au = new k(""),
  Hg = (() => {
    class t {
      constructor(e, r) {
        (this._zone = r),
          (this._eventNameToPlugin = new Map()),
          e.forEach((i) => {
            i.manager = this;
          }),
          (this._plugins = e.slice().reverse());
      }
      addEventListener(e, r, i) {
        return this._findPluginFor(r).addEventListener(e, r, i);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(e) {
        let r = this._eventNameToPlugin.get(e);
        if (r) return r;
        if (((r = this._plugins.find((o) => o.supports(e))), !r))
          throw new v(5101, !1);
        return this._eventNameToPlugin.set(e, r), r;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(B(Au), B(oe));
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  ea = class {
    constructor(n) {
      this._doc = n;
    }
  },
  _u = "ng-app-id",
  zg = (() => {
    class t {
      constructor(e, r, i, o = {}) {
        (this.doc = e),
          (this.appId = r),
          (this.nonce = i),
          (this.platformId = o),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = Oi(o)),
          this.resetHostNodes();
      }
      addStyles(e) {
        for (let r of e)
          this.changeUsageCount(r, 1) === 1 && this.onStyleAdded(r);
      }
      removeStyles(e) {
        for (let r of e)
          this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
      }
      ngOnDestroy() {
        let e = this.styleNodesInDOM;
        e && (e.forEach((r) => r.remove()), e.clear());
        for (let r of this.getAllStyles()) this.onStyleRemoved(r);
        this.resetHostNodes();
      }
      addHost(e) {
        this.hostNodes.add(e);
        for (let r of this.getAllStyles()) this.addStyleToHost(e, r);
      }
      removeHost(e) {
        this.hostNodes.delete(e);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(e) {
        for (let r of this.hostNodes) this.addStyleToHost(r, e);
      }
      onStyleRemoved(e) {
        let r = this.styleRef;
        r.get(e)?.elements?.forEach((i) => i.remove()), r.delete(e);
      }
      collectServerRenderedStyles() {
        let e = this.doc.head?.querySelectorAll(`style[${_u}="${this.appId}"]`);
        if (e?.length) {
          let r = new Map();
          return (
            e.forEach((i) => {
              i.textContent != null && r.set(i.textContent, i);
            }),
            r
          );
        }
        return null;
      }
      changeUsageCount(e, r) {
        let i = this.styleRef;
        if (i.has(e)) {
          let o = i.get(e);
          return (o.usage += r), o.usage;
        }
        return i.set(e, { usage: r, elements: [] }), r;
      }
      getStyleElement(e, r) {
        let i = this.styleNodesInDOM,
          o = i?.get(r);
        if (o?.parentNode === e) return i.delete(r), o.removeAttribute(_u), o;
        {
          let s = this.doc.createElement("style");
          return (
            this.nonce && s.setAttribute("nonce", this.nonce),
            (s.textContent = r),
            this.platformIsServer && s.setAttribute(_u, this.appId),
            e.appendChild(s),
            s
          );
        }
      }
      addStyleToHost(e, r) {
        let i = this.getStyleElement(e, r),
          o = this.styleRef,
          s = o.get(r)?.elements;
        s ? s.push(i) : o.set(r, { elements: [i], usage: 1 });
      }
      resetHostNodes() {
        let e = this.hostNodes;
        e.clear(), e.add(this.doc.head);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(B(De), B(Ns), B(Bc, 8), B(Be));
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  Su = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/MathML/",
  },
  Ru = /%COMP%/g,
  Wg = "%COMP%",
  DI = `_nghost-${Wg}`,
  wI = `_ngcontent-${Wg}`,
  CI = !0,
  bI = new k("", { providedIn: "root", factory: () => CI });
function II(t) {
  return wI.replace(Ru, t);
}
function _I(t) {
  return DI.replace(Ru, t);
}
function qg(t, n) {
  return n.map((e) => e.replace(Ru, t));
}
var ta = (() => {
    class t {
      constructor(e, r, i, o, s, a, l, c = null) {
        (this.eventManager = e),
          (this.sharedStylesHost = r),
          (this.appId = i),
          (this.removeStylesOnCompDestroy = o),
          (this.doc = s),
          (this.platformId = a),
          (this.ngZone = l),
          (this.nonce = c),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = Oi(a)),
          (this.defaultRenderer = new Fi(e, s, l, this.platformIsServer));
      }
      createRenderer(e, r) {
        if (!e || !r) return this.defaultRenderer;
        this.platformIsServer &&
          r.encapsulation === xt.ShadowDom &&
          (r = he(w({}, r), { encapsulation: xt.Emulated }));
        let i = this.getOrCreateRenderer(e, r);
        return (
          i instanceof na
            ? i.applyToHost(e)
            : i instanceof Li && i.applyStyles(),
          i
        );
      }
      getOrCreateRenderer(e, r) {
        let i = this.rendererByCompId,
          o = i.get(r.id);
        if (!o) {
          let s = this.doc,
            a = this.ngZone,
            l = this.eventManager,
            c = this.sharedStylesHost,
            u = this.removeStylesOnCompDestroy,
            d = this.platformIsServer;
          switch (r.encapsulation) {
            case xt.Emulated:
              o = new na(l, c, r, this.appId, u, s, a, d);
              break;
            case xt.ShadowDom:
              return new xu(l, c, e, r, s, a, this.nonce, d);
            default:
              o = new Li(l, c, r, u, s, a, d);
              break;
          }
          i.set(r.id, o);
        }
        return o;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(
            B(Hg),
            B(zg),
            B(Ns),
            B(bI),
            B(De),
            B(Be),
            B(oe),
            B(Bc)
          );
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  Fi = class {
    constructor(n, e, r, i) {
      (this.eventManager = n),
        (this.doc = e),
        (this.ngZone = r),
        (this.platformIsServer = i),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(n, e) {
      return e
        ? this.doc.createElementNS(Su[e] || e, n)
        : this.doc.createElement(n);
    }
    createComment(n) {
      return this.doc.createComment(n);
    }
    createText(n) {
      return this.doc.createTextNode(n);
    }
    appendChild(n, e) {
      (Ug(n) ? n.content : n).appendChild(e);
    }
    insertBefore(n, e, r) {
      n && (Ug(n) ? n.content : n).insertBefore(e, r);
    }
    removeChild(n, e) {
      n && n.removeChild(e);
    }
    selectRootElement(n, e) {
      let r = typeof n == "string" ? this.doc.querySelector(n) : n;
      if (!r) throw new v(-5104, !1);
      return e || (r.textContent = ""), r;
    }
    parentNode(n) {
      return n.parentNode;
    }
    nextSibling(n) {
      return n.nextSibling;
    }
    setAttribute(n, e, r, i) {
      if (i) {
        e = i + ":" + e;
        let o = Su[i];
        o ? n.setAttributeNS(o, e, r) : n.setAttribute(e, r);
      } else n.setAttribute(e, r);
    }
    removeAttribute(n, e, r) {
      if (r) {
        let i = Su[r];
        i ? n.removeAttributeNS(i, e) : n.removeAttribute(`${r}:${e}`);
      } else n.removeAttribute(e);
    }
    addClass(n, e) {
      n.classList.add(e);
    }
    removeClass(n, e) {
      n.classList.remove(e);
    }
    setStyle(n, e, r, i) {
      i & (Nt.DashCase | Nt.Important)
        ? n.style.setProperty(e, r, i & Nt.Important ? "important" : "")
        : (n.style[e] = r);
    }
    removeStyle(n, e, r) {
      r & Nt.DashCase ? n.style.removeProperty(e) : (n.style[e] = "");
    }
    setProperty(n, e, r) {
      n != null && (n[e] = r);
    }
    setValue(n, e) {
      n.nodeValue = e;
    }
    listen(n, e, r) {
      if (
        typeof n == "string" &&
        ((n = $r().getGlobalEventTarget(this.doc, n)), !n)
      )
        throw new Error(`Unsupported event target ${n} for event ${e}`);
      return this.eventManager.addEventListener(
        n,
        e,
        this.decoratePreventDefault(r)
      );
    }
    decoratePreventDefault(n) {
      return (e) => {
        if (e === "__ngUnwrap__") return n;
        (this.platformIsServer ? this.ngZone.runGuarded(() => n(e)) : n(e)) ===
          !1 && e.preventDefault();
      };
    }
  };
function Ug(t) {
  return t.tagName === "TEMPLATE" && t.content !== void 0;
}
var xu = class extends Fi {
    constructor(n, e, r, i, o, s, a, l) {
      super(n, o, s, l),
        (this.sharedStylesHost = e),
        (this.hostEl = r),
        (this.shadowRoot = r.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let c = qg(i.id, i.styles);
      for (let u of c) {
        let d = document.createElement("style");
        a && d.setAttribute("nonce", a),
          (d.textContent = u),
          this.shadowRoot.appendChild(d);
      }
    }
    nodeOrShadowRoot(n) {
      return n === this.hostEl ? this.shadowRoot : n;
    }
    appendChild(n, e) {
      return super.appendChild(this.nodeOrShadowRoot(n), e);
    }
    insertBefore(n, e, r) {
      return super.insertBefore(this.nodeOrShadowRoot(n), e, r);
    }
    removeChild(n, e) {
      return super.removeChild(this.nodeOrShadowRoot(n), e);
    }
    parentNode(n) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  Li = class extends Fi {
    constructor(n, e, r, i, o, s, a, l) {
      super(n, o, s, a),
        (this.sharedStylesHost = e),
        (this.removeStylesOnCompDestroy = i),
        (this.styles = l ? qg(l, r.styles) : r.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  na = class extends Li {
    constructor(n, e, r, i, o, s, a, l) {
      let c = i + "-" + r.id;
      super(n, e, r, o, s, a, l, c),
        (this.contentAttr = II(c)),
        (this.hostAttr = _I(c));
    }
    applyToHost(n) {
      this.applyStyles(), this.setAttribute(n, this.hostAttr, "");
    }
    createElement(n, e) {
      let r = super.createElement(n, e);
      return super.setAttribute(r, this.contentAttr, ""), r;
    }
  },
  SI = (() => {
    class t extends ea {
      constructor(e) {
        super(e);
      }
      supports(e) {
        return !0;
      }
      addEventListener(e, r, i) {
        return (
          e.addEventListener(r, i, !1), () => this.removeEventListener(e, r, i)
        );
      }
      removeEventListener(e, r, i) {
        return e.removeEventListener(r, i);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(B(De));
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  $g = ["alt", "control", "meta", "shift"],
  TI = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS",
  },
  MI = {
    alt: (t) => t.altKey,
    control: (t) => t.ctrlKey,
    meta: (t) => t.metaKey,
    shift: (t) => t.shiftKey,
  },
  AI = (() => {
    class t extends ea {
      constructor(e) {
        super(e);
      }
      supports(e) {
        return t.parseEventName(e) != null;
      }
      addEventListener(e, r, i) {
        let o = t.parseEventName(r),
          s = t.eventCallback(o.fullKey, i, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => $r().onAndCancel(e, o.domEventName, s));
      }
      static parseEventName(e) {
        let r = e.toLowerCase().split("."),
          i = r.shift();
        if (r.length === 0 || !(i === "keydown" || i === "keyup")) return null;
        let o = t._normalizeKey(r.pop()),
          s = "",
          a = r.indexOf("code");
        if (
          (a > -1 && (r.splice(a, 1), (s = "code.")),
          $g.forEach((c) => {
            let u = r.indexOf(c);
            u > -1 && (r.splice(u, 1), (s += c + "."));
          }),
          (s += o),
          r.length != 0 || o.length === 0)
        )
          return null;
        let l = {};
        return (l.domEventName = i), (l.fullKey = s), l;
      }
      static matchEventFullKeyCode(e, r) {
        let i = TI[e.key] || e.key,
          o = "";
        return (
          r.indexOf("code.") > -1 && ((i = e.code), (o = "code.")),
          i == null || !i
            ? !1
            : ((i = i.toLowerCase()),
              i === " " ? (i = "space") : i === "." && (i = "dot"),
              $g.forEach((s) => {
                if (s !== i) {
                  let a = MI[s];
                  a(e) && (o += s + ".");
                }
              }),
              (o += i),
              o === r)
        );
      }
      static eventCallback(e, r, i) {
        return (o) => {
          t.matchEventFullKeyCode(o, e) && i.runGuarded(() => r(o));
        };
      }
      static _normalizeKey(e) {
        return e === "esc" ? "escape" : e;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(B(De));
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })();
function Gg(t, n) {
  return mg(w({ rootComponent: t }, xI(n)));
}
function xI(t) {
  return {
    appProviders: [...FI, ...(t?.providers ?? [])],
    platformProviders: PI,
  };
}
function NI() {
  Mu.makeCurrent();
}
function RI() {
  return new Jt();
}
function OI() {
  return Qp(document), document;
}
var PI = [
  { provide: Be, useValue: bu },
  { provide: jc, useValue: NI, multi: !0 },
  { provide: De, useFactory: OI, deps: [] },
];
var FI = [
  { provide: Is, useValue: "root" },
  { provide: Jt, useFactory: RI, deps: [] },
  { provide: Au, useClass: SI, multi: !0, deps: [De, oe, Be] },
  { provide: Au, useClass: AI, multi: !0, deps: [De] },
  ta,
  zg,
  Hg,
  { provide: Wn, useExisting: ta },
  { provide: Gs, useClass: EI, deps: [] },
  [],
];
var Kg = (() => {
  class t {
    constructor(e) {
      this._doc = e;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(e) {
      this._doc.title = e || "";
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)(B(De));
      };
    }
    static {
      this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
  }
  return t;
})();
var Nu = (function (t) {
  return (
    (t[(t.NoHttpTransferCache = 0)] = "NoHttpTransferCache"),
    (t[(t.HttpTransferCacheOptions = 1)] = "HttpTransferCacheOptions"),
    t
  );
})(Nu || {});
function Qg(...t) {
  let n = [],
    e = new Set(),
    r = e.has(Nu.HttpTransferCacheOptions);
  for (let { ɵproviders: i, ɵkind: o } of t) e.add(o), i.length && n.push(i);
  return Gn([[], gg(), e.has(Nu.NoHttpTransferCache) || r ? [] : Bg({}), n]);
}
var F = "primary",
  Zi = Symbol("RouteTitle"),
  ku = class {
    constructor(n) {
      this.params = n || {};
    }
    has(n) {
      return Object.prototype.hasOwnProperty.call(this.params, n);
    }
    get(n) {
      if (this.has(n)) {
        let e = this.params[n];
        return Array.isArray(e) ? e[0] : e;
      }
      return null;
    }
    getAll(n) {
      if (this.has(n)) {
        let e = this.params[n];
        return Array.isArray(e) ? e : [e];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function Gr(t) {
  return new ku(t);
}
function kI(t, n, e) {
  let r = e.path.split("/");
  if (
    r.length > t.length ||
    (e.pathMatch === "full" && (n.hasChildren() || r.length < t.length))
  )
    return null;
  let i = {};
  for (let o = 0; o < r.length; o++) {
    let s = r[o],
      a = t[o];
    if (s.startsWith(":")) i[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: t.slice(0, r.length), posParams: i };
}
function jI(t, n) {
  if (t.length !== n.length) return !1;
  for (let e = 0; e < t.length; ++e) if (!Ut(t[e], n[e])) return !1;
  return !0;
}
function Ut(t, n) {
  let e = t ? ju(t) : void 0,
    r = n ? ju(n) : void 0;
  if (!e || !r || e.length != r.length) return !1;
  let i;
  for (let o = 0; o < e.length; o++)
    if (((i = e[o]), !ny(t[i], n[i]))) return !1;
  return !0;
}
function ju(t) {
  return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function ny(t, n) {
  if (Array.isArray(t) && Array.isArray(n)) {
    if (t.length !== n.length) return !1;
    let e = [...t].sort(),
      r = [...n].sort();
    return e.every((i, o) => r[o] === i);
  } else return t === n;
}
function ry(t) {
  return t.length > 0 ? t[t.length - 1] : null;
}
function An(t) {
  return rl(t) ? t : Mi(t) ? pe(Promise.resolve(t)) : N(t);
}
var VI = { exact: oy, subset: sy },
  iy = { exact: BI, subset: UI, ignored: () => !0 };
function Yg(t, n, e) {
  return (
    VI[e.paths](t.root, n.root, e.matrixParams) &&
    iy[e.queryParams](t.queryParams, n.queryParams) &&
    !(e.fragment === "exact" && t.fragment !== n.fragment)
  );
}
function BI(t, n) {
  return Ut(t, n);
}
function oy(t, n, e) {
  if (
    !tr(t.segments, n.segments) ||
    !oa(t.segments, n.segments, e) ||
    t.numberOfChildren !== n.numberOfChildren
  )
    return !1;
  for (let r in n.children)
    if (!t.children[r] || !oy(t.children[r], n.children[r], e)) return !1;
  return !0;
}
function UI(t, n) {
  return (
    Object.keys(n).length <= Object.keys(t).length &&
    Object.keys(n).every((e) => ny(t[e], n[e]))
  );
}
function sy(t, n, e) {
  return ay(t, n, n.segments, e);
}
function ay(t, n, e, r) {
  if (t.segments.length > e.length) {
    let i = t.segments.slice(0, e.length);
    return !(!tr(i, e) || n.hasChildren() || !oa(i, e, r));
  } else if (t.segments.length === e.length) {
    if (!tr(t.segments, e) || !oa(t.segments, e, r)) return !1;
    for (let i in n.children)
      if (!t.children[i] || !sy(t.children[i], n.children[i], r)) return !1;
    return !0;
  } else {
    let i = e.slice(0, t.segments.length),
      o = e.slice(t.segments.length);
    return !tr(t.segments, i) || !oa(t.segments, i, r) || !t.children[F]
      ? !1
      : ay(t.children[F], n, o, r);
  }
}
function oa(t, n, e) {
  return n.every((r, i) => iy[e](t[i].parameters, r.parameters));
}
var Tn = class {
    constructor(n = new ee([], {}), e = {}, r = null) {
      (this.root = n), (this.queryParams = e), (this.fragment = r);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= Gr(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return zI.serialize(this);
    }
  },
  ee = class {
    constructor(n, e) {
      (this.segments = n),
        (this.children = e),
        (this.parent = null),
        Object.values(e).forEach((r) => (r.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return sa(this);
    }
  },
  er = class {
    constructor(n, e) {
      (this.path = n), (this.parameters = e);
    }
    get parameterMap() {
      return (this._parameterMap ??= Gr(this.parameters)), this._parameterMap;
    }
    toString() {
      return cy(this);
    }
  };
function $I(t, n) {
  return tr(t, n) && t.every((e, r) => Ut(e.parameters, n[r].parameters));
}
function tr(t, n) {
  return t.length !== n.length ? !1 : t.every((e, r) => e.path === n[r].path);
}
function HI(t, n) {
  let e = [];
  return (
    Object.entries(t.children).forEach(([r, i]) => {
      r === F && (e = e.concat(n(i, r)));
    }),
    Object.entries(t.children).forEach(([r, i]) => {
      r !== F && (e = e.concat(n(i, r)));
    }),
    e
  );
}
var ud = (() => {
    class t {
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({
          token: t,
          factory: () => new la(),
          providedIn: "root",
        });
      }
    }
    return t;
  })(),
  la = class {
    parse(n) {
      let e = new Bu(n);
      return new Tn(
        e.parseRootSegment(),
        e.parseQueryParams(),
        e.parseFragment()
      );
    }
    serialize(n) {
      let e = `/${ki(n.root, !0)}`,
        r = GI(n.queryParams),
        i = typeof n.fragment == "string" ? `#${WI(n.fragment)}` : "";
      return `${e}${r}${i}`;
    }
  },
  zI = new la();
function sa(t) {
  return t.segments.map((n) => cy(n)).join("/");
}
function ki(t, n) {
  if (!t.hasChildren()) return sa(t);
  if (n) {
    let e = t.children[F] ? ki(t.children[F], !1) : "",
      r = [];
    return (
      Object.entries(t.children).forEach(([i, o]) => {
        i !== F && r.push(`${i}:${ki(o, !1)}`);
      }),
      r.length > 0 ? `${e}(${r.join("//")})` : e
    );
  } else {
    let e = HI(t, (r, i) =>
      i === F ? [ki(t.children[F], !1)] : [`${i}:${ki(r, !1)}`]
    );
    return Object.keys(t.children).length === 1 && t.children[F] != null
      ? `${sa(t)}/${e[0]}`
      : `${sa(t)}/(${e.join("//")})`;
  }
}
function ly(t) {
  return encodeURIComponent(t)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function ra(t) {
  return ly(t).replace(/%3B/gi, ";");
}
function WI(t) {
  return encodeURI(t);
}
function Vu(t) {
  return ly(t)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function aa(t) {
  return decodeURIComponent(t);
}
function Zg(t) {
  return aa(t.replace(/\+/g, "%20"));
}
function cy(t) {
  return `${Vu(t.path)}${qI(t.parameters)}`;
}
function qI(t) {
  return Object.entries(t)
    .map(([n, e]) => `;${Vu(n)}=${Vu(e)}`)
    .join("");
}
function GI(t) {
  let n = Object.entries(t)
    .map(([e, r]) =>
      Array.isArray(r)
        ? r.map((i) => `${ra(e)}=${ra(i)}`).join("&")
        : `${ra(e)}=${ra(r)}`
    )
    .filter((e) => e);
  return n.length ? `?${n.join("&")}` : "";
}
var KI = /^[^\/()?;#]+/;
function Ou(t) {
  let n = t.match(KI);
  return n ? n[0] : "";
}
var QI = /^[^\/()?;=#]+/;
function YI(t) {
  let n = t.match(QI);
  return n ? n[0] : "";
}
var ZI = /^[^=?&#]+/;
function XI(t) {
  let n = t.match(ZI);
  return n ? n[0] : "";
}
var JI = /^[^&#]+/;
function e_(t) {
  let n = t.match(JI);
  return n ? n[0] : "";
}
var Bu = class {
  constructor(n) {
    (this.url = n), (this.remaining = n);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new ee([], {})
        : new ee([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let n = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(n);
      while (this.consumeOptional("&"));
    return n;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let n = [];
    for (
      this.peekStartsWith("(") || n.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), n.push(this.parseSegment());
    let e = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (e = this.parseParens(!0)));
    let r = {};
    return (
      this.peekStartsWith("(") && (r = this.parseParens(!1)),
      (n.length > 0 || Object.keys(e).length > 0) && (r[F] = new ee(n, e)),
      r
    );
  }
  parseSegment() {
    let n = Ou(this.remaining);
    if (n === "" && this.peekStartsWith(";")) throw new v(4009, !1);
    return this.capture(n), new er(aa(n), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let n = {};
    for (; this.consumeOptional(";"); ) this.parseParam(n);
    return n;
  }
  parseParam(n) {
    let e = YI(this.remaining);
    if (!e) return;
    this.capture(e);
    let r = "";
    if (this.consumeOptional("=")) {
      let i = Ou(this.remaining);
      i && ((r = i), this.capture(r));
    }
    n[aa(e)] = aa(r);
  }
  parseQueryParam(n) {
    let e = XI(this.remaining);
    if (!e) return;
    this.capture(e);
    let r = "";
    if (this.consumeOptional("=")) {
      let s = e_(this.remaining);
      s && ((r = s), this.capture(r));
    }
    let i = Zg(e),
      o = Zg(r);
    if (n.hasOwnProperty(i)) {
      let s = n[i];
      Array.isArray(s) || ((s = [s]), (n[i] = s)), s.push(o);
    } else n[i] = o;
  }
  parseParens(n) {
    let e = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let r = Ou(this.remaining),
        i = this.remaining[r.length];
      if (i !== "/" && i !== ")" && i !== ";") throw new v(4010, !1);
      let o;
      r.indexOf(":") > -1
        ? ((o = r.slice(0, r.indexOf(":"))), this.capture(o), this.capture(":"))
        : n && (o = F);
      let s = this.parseChildren();
      (e[o] = Object.keys(s).length === 1 ? s[F] : new ee([], s)),
        this.consumeOptional("//");
    }
    return e;
  }
  peekStartsWith(n) {
    return this.remaining.startsWith(n);
  }
  consumeOptional(n) {
    return this.peekStartsWith(n)
      ? ((this.remaining = this.remaining.substring(n.length)), !0)
      : !1;
  }
  capture(n) {
    if (!this.consumeOptional(n)) throw new v(4011, !1);
  }
};
function uy(t) {
  return t.segments.length > 0 ? new ee([], { [F]: t }) : t;
}
function dy(t) {
  let n = {};
  for (let [r, i] of Object.entries(t.children)) {
    let o = dy(i);
    if (r === F && o.segments.length === 0 && o.hasChildren())
      for (let [s, a] of Object.entries(o.children)) n[s] = a;
    else (o.segments.length > 0 || o.hasChildren()) && (n[r] = o);
  }
  let e = new ee(t.segments, n);
  return t_(e);
}
function t_(t) {
  if (t.numberOfChildren === 1 && t.children[F]) {
    let n = t.children[F];
    return new ee(t.segments.concat(n.segments), n.children);
  }
  return t;
}
function Kr(t) {
  return t instanceof Tn;
}
function n_(t, n, e = null, r = null) {
  let i = fy(t);
  return hy(i, n, e, r);
}
function fy(t) {
  let n;
  function e(o) {
    let s = {};
    for (let l of o.children) {
      let c = e(l);
      s[l.outlet] = c;
    }
    let a = new ee(o.url, s);
    return o === t && (n = a), a;
  }
  let r = e(t.root),
    i = uy(r);
  return n ?? i;
}
function hy(t, n, e, r) {
  let i = t;
  for (; i.parent; ) i = i.parent;
  if (n.length === 0) return Pu(i, i, i, e, r);
  let o = r_(n);
  if (o.toRoot()) return Pu(i, i, new ee([], {}), e, r);
  let s = i_(o, i, t),
    a = s.processChildren
      ? Bi(s.segmentGroup, s.index, o.commands)
      : my(s.segmentGroup, s.index, o.commands);
  return Pu(i, s.segmentGroup, a, e, r);
}
function ca(t) {
  return typeof t == "object" && t != null && !t.outlets && !t.segmentPath;
}
function Hi(t) {
  return typeof t == "object" && t != null && t.outlets;
}
function Pu(t, n, e, r, i) {
  let o = {};
  r &&
    Object.entries(r).forEach(([l, c]) => {
      o[l] = Array.isArray(c) ? c.map((u) => `${u}`) : `${c}`;
    });
  let s;
  t === n ? (s = e) : (s = py(t, n, e));
  let a = uy(dy(s));
  return new Tn(a, o, i);
}
function py(t, n, e) {
  let r = {};
  return (
    Object.entries(t.children).forEach(([i, o]) => {
      o === n ? (r[i] = e) : (r[i] = py(o, n, e));
    }),
    new ee(t.segments, r)
  );
}
var ua = class {
  constructor(n, e, r) {
    if (
      ((this.isAbsolute = n),
      (this.numberOfDoubleDots = e),
      (this.commands = r),
      n && r.length > 0 && ca(r[0]))
    )
      throw new v(4003, !1);
    let i = r.find(Hi);
    if (i && i !== ry(r)) throw new v(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function r_(t) {
  if (typeof t[0] == "string" && t.length === 1 && t[0] === "/")
    return new ua(!0, 0, t);
  let n = 0,
    e = !1,
    r = t.reduce((i, o, s) => {
      if (typeof o == "object" && o != null) {
        if (o.outlets) {
          let a = {};
          return (
            Object.entries(o.outlets).forEach(([l, c]) => {
              a[l] = typeof c == "string" ? c.split("/") : c;
            }),
            [...i, { outlets: a }]
          );
        }
        if (o.segmentPath) return [...i, o.segmentPath];
      }
      return typeof o != "string"
        ? [...i, o]
        : s === 0
        ? (o.split("/").forEach((a, l) => {
            (l == 0 && a === ".") ||
              (l == 0 && a === ""
                ? (e = !0)
                : a === ".."
                ? n++
                : a != "" && i.push(a));
          }),
          i)
        : [...i, o];
    }, []);
  return new ua(e, n, r);
}
var Wr = class {
  constructor(n, e, r) {
    (this.segmentGroup = n), (this.processChildren = e), (this.index = r);
  }
};
function i_(t, n, e) {
  if (t.isAbsolute) return new Wr(n, !0, 0);
  if (!e) return new Wr(n, !1, NaN);
  if (e.parent === null) return new Wr(e, !0, 0);
  let r = ca(t.commands[0]) ? 0 : 1,
    i = e.segments.length - 1 + r;
  return o_(e, i, t.numberOfDoubleDots);
}
function o_(t, n, e) {
  let r = t,
    i = n,
    o = e;
  for (; o > i; ) {
    if (((o -= i), (r = r.parent), !r)) throw new v(4005, !1);
    i = r.segments.length;
  }
  return new Wr(r, !1, i - o);
}
function s_(t) {
  return Hi(t[0]) ? t[0].outlets : { [F]: t };
}
function my(t, n, e) {
  if (((t ??= new ee([], {})), t.segments.length === 0 && t.hasChildren()))
    return Bi(t, n, e);
  let r = a_(t, n, e),
    i = e.slice(r.commandIndex);
  if (r.match && r.pathIndex < t.segments.length) {
    let o = new ee(t.segments.slice(0, r.pathIndex), {});
    return (
      (o.children[F] = new ee(t.segments.slice(r.pathIndex), t.children)),
      Bi(o, 0, i)
    );
  } else
    return r.match && i.length === 0
      ? new ee(t.segments, {})
      : r.match && !t.hasChildren()
      ? Uu(t, n, e)
      : r.match
      ? Bi(t, 0, i)
      : Uu(t, n, e);
}
function Bi(t, n, e) {
  if (e.length === 0) return new ee(t.segments, {});
  {
    let r = s_(e),
      i = {};
    if (
      Object.keys(r).some((o) => o !== F) &&
      t.children[F] &&
      t.numberOfChildren === 1 &&
      t.children[F].segments.length === 0
    ) {
      let o = Bi(t.children[F], n, e);
      return new ee(t.segments, o.children);
    }
    return (
      Object.entries(r).forEach(([o, s]) => {
        typeof s == "string" && (s = [s]),
          s !== null && (i[o] = my(t.children[o], n, s));
      }),
      Object.entries(t.children).forEach(([o, s]) => {
        r[o] === void 0 && (i[o] = s);
      }),
      new ee(t.segments, i)
    );
  }
}
function a_(t, n, e) {
  let r = 0,
    i = n,
    o = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; i < t.segments.length; ) {
    if (r >= e.length) return o;
    let s = t.segments[i],
      a = e[r];
    if (Hi(a)) break;
    let l = `${a}`,
      c = r < e.length - 1 ? e[r + 1] : null;
    if (i > 0 && l === void 0) break;
    if (l && c && typeof c == "object" && c.outlets === void 0) {
      if (!Jg(l, c, s)) return o;
      r += 2;
    } else {
      if (!Jg(l, {}, s)) return o;
      r++;
    }
    i++;
  }
  return { match: !0, pathIndex: i, commandIndex: r };
}
function Uu(t, n, e) {
  let r = t.segments.slice(0, n),
    i = 0;
  for (; i < e.length; ) {
    let o = e[i];
    if (Hi(o)) {
      let l = l_(o.outlets);
      return new ee(r, l);
    }
    if (i === 0 && ca(e[0])) {
      let l = t.segments[n];
      r.push(new er(l.path, Xg(e[0]))), i++;
      continue;
    }
    let s = Hi(o) ? o.outlets[F] : `${o}`,
      a = i < e.length - 1 ? e[i + 1] : null;
    s && a && ca(a)
      ? (r.push(new er(s, Xg(a))), (i += 2))
      : (r.push(new er(s, {})), i++);
  }
  return new ee(r, {});
}
function l_(t) {
  let n = {};
  return (
    Object.entries(t).forEach(([e, r]) => {
      typeof r == "string" && (r = [r]),
        r !== null && (n[e] = Uu(new ee([], {}), 0, r));
    }),
    n
  );
}
function Xg(t) {
  let n = {};
  return Object.entries(t).forEach(([e, r]) => (n[e] = `${r}`)), n;
}
function Jg(t, n, e) {
  return t == e.path && Ut(n, e.parameters);
}
var Ui = "imperative",
  Ae = (function (t) {
    return (
      (t[(t.NavigationStart = 0)] = "NavigationStart"),
      (t[(t.NavigationEnd = 1)] = "NavigationEnd"),
      (t[(t.NavigationCancel = 2)] = "NavigationCancel"),
      (t[(t.NavigationError = 3)] = "NavigationError"),
      (t[(t.RoutesRecognized = 4)] = "RoutesRecognized"),
      (t[(t.ResolveStart = 5)] = "ResolveStart"),
      (t[(t.ResolveEnd = 6)] = "ResolveEnd"),
      (t[(t.GuardsCheckStart = 7)] = "GuardsCheckStart"),
      (t[(t.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
      (t[(t.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
      (t[(t.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
      (t[(t.ChildActivationStart = 11)] = "ChildActivationStart"),
      (t[(t.ChildActivationEnd = 12)] = "ChildActivationEnd"),
      (t[(t.ActivationStart = 13)] = "ActivationStart"),
      (t[(t.ActivationEnd = 14)] = "ActivationEnd"),
      (t[(t.Scroll = 15)] = "Scroll"),
      (t[(t.NavigationSkipped = 16)] = "NavigationSkipped"),
      t
    );
  })(Ae || {}),
  ht = class {
    constructor(n, e) {
      (this.id = n), (this.url = e);
    }
  },
  zi = class extends ht {
    constructor(n, e, r = "imperative", i = null) {
      super(n, e),
        (this.type = Ae.NavigationStart),
        (this.navigationTrigger = r),
        (this.restoredState = i);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  nr = class extends ht {
    constructor(n, e, r) {
      super(n, e), (this.urlAfterRedirects = r), (this.type = Ae.NavigationEnd);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  nt = (function (t) {
    return (
      (t[(t.Redirect = 0)] = "Redirect"),
      (t[(t.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (t[(t.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (t[(t.GuardRejected = 3)] = "GuardRejected"),
      t
    );
  })(nt || {}),
  $u = (function (t) {
    return (
      (t[(t.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (t[(t.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      t
    );
  })($u || {}),
  Mn = class extends ht {
    constructor(n, e, r, i) {
      super(n, e),
        (this.reason = r),
        (this.code = i),
        (this.type = Ae.NavigationCancel);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  rr = class extends ht {
    constructor(n, e, r, i) {
      super(n, e),
        (this.reason = r),
        (this.code = i),
        (this.type = Ae.NavigationSkipped);
    }
  },
  Wi = class extends ht {
    constructor(n, e, r, i) {
      super(n, e),
        (this.error = r),
        (this.target = i),
        (this.type = Ae.NavigationError);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  da = class extends ht {
    constructor(n, e, r, i) {
      super(n, e),
        (this.urlAfterRedirects = r),
        (this.state = i),
        (this.type = Ae.RoutesRecognized);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Hu = class extends ht {
    constructor(n, e, r, i) {
      super(n, e),
        (this.urlAfterRedirects = r),
        (this.state = i),
        (this.type = Ae.GuardsCheckStart);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  zu = class extends ht {
    constructor(n, e, r, i, o) {
      super(n, e),
        (this.urlAfterRedirects = r),
        (this.state = i),
        (this.shouldActivate = o),
        (this.type = Ae.GuardsCheckEnd);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  Wu = class extends ht {
    constructor(n, e, r, i) {
      super(n, e),
        (this.urlAfterRedirects = r),
        (this.state = i),
        (this.type = Ae.ResolveStart);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  qu = class extends ht {
    constructor(n, e, r, i) {
      super(n, e),
        (this.urlAfterRedirects = r),
        (this.state = i),
        (this.type = Ae.ResolveEnd);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Gu = class {
    constructor(n) {
      (this.route = n), (this.type = Ae.RouteConfigLoadStart);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  Ku = class {
    constructor(n) {
      (this.route = n), (this.type = Ae.RouteConfigLoadEnd);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  Qu = class {
    constructor(n) {
      (this.snapshot = n), (this.type = Ae.ChildActivationStart);
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Yu = class {
    constructor(n) {
      (this.snapshot = n), (this.type = Ae.ChildActivationEnd);
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Zu = class {
    constructor(n) {
      (this.snapshot = n), (this.type = Ae.ActivationStart);
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Xu = class {
    constructor(n) {
      (this.snapshot = n), (this.type = Ae.ActivationEnd);
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  };
var qi = class {},
  Gi = class {
    constructor(n) {
      this.url = n;
    }
  };
var Ju = class {
    constructor() {
      (this.outlet = null),
        (this.route = null),
        (this.injector = null),
        (this.children = new ya()),
        (this.attachRef = null);
    }
  },
  ya = (() => {
    class t {
      constructor() {
        this.contexts = new Map();
      }
      onChildOutletCreated(e, r) {
        let i = this.getOrCreateContext(e);
        (i.outlet = r), this.contexts.set(e, i);
      }
      onChildOutletDestroyed(e) {
        let r = this.getContext(e);
        r && ((r.outlet = null), (r.attachRef = null));
      }
      onOutletDeactivated() {
        let e = this.contexts;
        return (this.contexts = new Map()), e;
      }
      onOutletReAttached(e) {
        this.contexts = e;
      }
      getOrCreateContext(e) {
        let r = this.getContext(e);
        return r || ((r = new Ju()), this.contexts.set(e, r)), r;
      }
      getContext(e) {
        return this.contexts.get(e) || null;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  fa = class {
    constructor(n) {
      this._root = n;
    }
    get root() {
      return this._root.value;
    }
    parent(n) {
      let e = this.pathFromRoot(n);
      return e.length > 1 ? e[e.length - 2] : null;
    }
    children(n) {
      let e = ed(n, this._root);
      return e ? e.children.map((r) => r.value) : [];
    }
    firstChild(n) {
      let e = ed(n, this._root);
      return e && e.children.length > 0 ? e.children[0].value : null;
    }
    siblings(n) {
      let e = td(n, this._root);
      return e.length < 2
        ? []
        : e[e.length - 2].children.map((i) => i.value).filter((i) => i !== n);
    }
    pathFromRoot(n) {
      return td(n, this._root).map((e) => e.value);
    }
  };
function ed(t, n) {
  if (t === n.value) return n;
  for (let e of n.children) {
    let r = ed(t, e);
    if (r) return r;
  }
  return null;
}
function td(t, n) {
  if (t === n.value) return [n];
  for (let e of n.children) {
    let r = td(t, e);
    if (r.length) return r.unshift(n), r;
  }
  return [];
}
var tt = class {
  constructor(n, e) {
    (this.value = n), (this.children = e);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function zr(t) {
  let n = {};
  return t && t.children.forEach((e) => (n[e.value.outlet] = e)), n;
}
var ha = class extends fa {
  constructor(n, e) {
    super(n), (this.snapshot = e), fd(this, n);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function gy(t) {
  let n = c_(t),
    e = new Te([new er("", {})]),
    r = new Te({}),
    i = new Te({}),
    o = new Te({}),
    s = new Te(""),
    a = new Qr(e, r, o, s, i, F, t, n.root);
  return (a.snapshot = n.root), new ha(new tt(a, []), n);
}
function c_(t) {
  let n = {},
    e = {},
    r = {},
    i = "",
    o = new Ki([], n, r, i, e, F, t, null, {});
  return new pa("", new tt(o, []));
}
var Qr = class {
  constructor(n, e, r, i, o, s, a, l) {
    (this.urlSubject = n),
      (this.paramsSubject = e),
      (this.queryParamsSubject = r),
      (this.fragmentSubject = i),
      (this.dataSubject = o),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = l),
      (this.title = this.dataSubject?.pipe(W((c) => c[Zi])) ?? N(void 0)),
      (this.url = n),
      (this.params = e),
      (this.queryParams = r),
      (this.fragment = i),
      (this.data = o);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      (this._paramMap ??= this.params.pipe(W((n) => Gr(n)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(W((n) => Gr(n)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function dd(t, n, e = "emptyOnly") {
  let r,
    { routeConfig: i } = t;
  return (
    n !== null &&
    (e === "always" ||
      i?.path === "" ||
      (!n.component && !n.routeConfig?.loadComponent))
      ? (r = {
          params: w(w({}, n.params), t.params),
          data: w(w({}, n.data), t.data),
          resolve: w(w(w(w({}, t.data), n.data), i?.data), t._resolvedData),
        })
      : (r = {
          params: w({}, t.params),
          data: w({}, t.data),
          resolve: w(w({}, t.data), t._resolvedData ?? {}),
        }),
    i && vy(i) && (r.resolve[Zi] = i.title),
    r
  );
}
var Ki = class {
    get title() {
      return this.data?.[Zi];
    }
    constructor(n, e, r, i, o, s, a, l, c) {
      (this.url = n),
        (this.params = e),
        (this.queryParams = r),
        (this.fragment = i),
        (this.data = o),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = l),
        (this._resolve = c);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= Gr(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= Gr(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      let n = this.url.map((r) => r.toString()).join("/"),
        e = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${n}', path:'${e}')`;
    }
  },
  pa = class extends fa {
    constructor(n, e) {
      super(e), (this.url = n), fd(this, e);
    }
    toString() {
      return yy(this._root);
    }
  };
function fd(t, n) {
  (n.value._routerState = t), n.children.forEach((e) => fd(t, e));
}
function yy(t) {
  let n = t.children.length > 0 ? ` { ${t.children.map(yy).join(", ")} } ` : "";
  return `${t.value}${n}`;
}
function Fu(t) {
  if (t.snapshot) {
    let n = t.snapshot,
      e = t._futureSnapshot;
    (t.snapshot = e),
      Ut(n.queryParams, e.queryParams) ||
        t.queryParamsSubject.next(e.queryParams),
      n.fragment !== e.fragment && t.fragmentSubject.next(e.fragment),
      Ut(n.params, e.params) || t.paramsSubject.next(e.params),
      jI(n.url, e.url) || t.urlSubject.next(e.url),
      Ut(n.data, e.data) || t.dataSubject.next(e.data);
  } else
    (t.snapshot = t._futureSnapshot),
      t.dataSubject.next(t._futureSnapshot.data);
}
function nd(t, n) {
  let e = Ut(t.params, n.params) && $I(t.url, n.url),
    r = !t.parent != !n.parent;
  return e && !r && (!t.parent || nd(t.parent, n.parent));
}
function vy(t) {
  return typeof t.title == "string" || t.title === null;
}
var hd = (() => {
    class t {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = F),
          (this.activateEvents = new Ee()),
          (this.deactivateEvents = new Ee()),
          (this.attachEvents = new Ee()),
          (this.detachEvents = new Ee()),
          (this.parentContexts = E(ya)),
          (this.location = E(sn)),
          (this.changeDetector = E(Vt)),
          (this.environmentInjector = E(ct)),
          (this.inputBinder = E(va, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(e) {
        if (e.name) {
          let { firstChange: r, previousValue: i } = e.name;
          if (r) return;
          this.isTrackedInParentContexts(i) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(e) {
        return this.parentContexts.getContext(e)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let e = this.parentContexts.getContext(this.name);
        e?.route &&
          (e.attachRef
            ? this.attach(e.attachRef, e.route)
            : this.activateWith(e.route, e.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new v(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new v(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new v(4012, !1);
        this.location.detach();
        let e = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(e.instance),
          e
        );
      }
      attach(e, r) {
        (this.activated = e),
          (this._activatedRoute = r),
          this.location.insert(e.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(e.instance);
      }
      deactivate() {
        if (this.activated) {
          let e = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(e);
        }
      }
      activateWith(e, r) {
        if (this.isActivated) throw new v(4013, !1);
        this._activatedRoute = e;
        let i = this.location,
          s = e.snapshot.component,
          a = this.parentContexts.getOrCreateContext(this.name).children,
          l = new rd(e, a, i.injector);
        (this.activated = i.createComponent(s, {
          index: i.length,
          injector: l,
          environmentInjector: r ?? this.environmentInjector,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵdir = dt({
          type: t,
          selectors: [["router-outlet"]],
          inputs: { name: "name" },
          outputs: {
            activateEvents: "activate",
            deactivateEvents: "deactivate",
            attachEvents: "attach",
            detachEvents: "detach",
          },
          exportAs: ["outlet"],
          standalone: !0,
          features: [Kn],
        });
      }
    }
    return t;
  })(),
  rd = class t {
    __ngOutletInjector(n) {
      return new t(this.route, this.childContexts, n);
    }
    constructor(n, e, r) {
      (this.route = n), (this.childContexts = e), (this.parent = r);
    }
    get(n, e) {
      return n === Qr
        ? this.route
        : n === ya
        ? this.childContexts
        : this.parent.get(n, e);
    }
  },
  va = new k(""),
  ey = (() => {
    class t {
      constructor() {
        this.outletDataSubscriptions = new Map();
      }
      bindActivatedRouteToOutletComponent(e) {
        this.unsubscribeFromRouteData(e), this.subscribeToRouteData(e);
      }
      unsubscribeFromRouteData(e) {
        this.outletDataSubscriptions.get(e)?.unsubscribe(),
          this.outletDataSubscriptions.delete(e);
      }
      subscribeToRouteData(e) {
        let { activatedRoute: r } = e,
          i = si([r.queryParams, r.params, r.data])
            .pipe(
              qe(
                ([o, s, a], l) => (
                  (a = w(w(w({}, o), s), a)),
                  l === 0 ? N(a) : Promise.resolve(a)
                )
              )
            )
            .subscribe((o) => {
              if (
                !e.isActivated ||
                !e.activatedComponentRef ||
                e.activatedRoute !== r ||
                r.component === null
              ) {
                this.unsubscribeFromRouteData(e);
                return;
              }
              let s = yg(r.component);
              if (!s) {
                this.unsubscribeFromRouteData(e);
                return;
              }
              for (let { templateName: a } of s.inputs)
                e.activatedComponentRef.setInput(a, o[a]);
            });
        this.outletDataSubscriptions.set(e, i);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })();
function u_(t, n, e) {
  let r = Qi(t, n._root, e ? e._root : void 0);
  return new ha(r, n);
}
function Qi(t, n, e) {
  if (e && t.shouldReuseRoute(n.value, e.value.snapshot)) {
    let r = e.value;
    r._futureSnapshot = n.value;
    let i = d_(t, n, e);
    return new tt(r, i);
  } else {
    if (t.shouldAttach(n.value)) {
      let o = t.retrieve(n.value);
      if (o !== null) {
        let s = o.route;
        return (
          (s.value._futureSnapshot = n.value),
          (s.children = n.children.map((a) => Qi(t, a))),
          s
        );
      }
    }
    let r = f_(n.value),
      i = n.children.map((o) => Qi(t, o));
    return new tt(r, i);
  }
}
function d_(t, n, e) {
  return n.children.map((r) => {
    for (let i of e.children)
      if (t.shouldReuseRoute(r.value, i.value.snapshot)) return Qi(t, r, i);
    return Qi(t, r);
  });
}
function f_(t) {
  return new Qr(
    new Te(t.url),
    new Te(t.params),
    new Te(t.queryParams),
    new Te(t.fragment),
    new Te(t.data),
    t.outlet,
    t.component,
    t
  );
}
var Ey = "ngNavigationCancelingError";
function Dy(t, n) {
  let { redirectTo: e, navigationBehaviorOptions: r } = Kr(n)
      ? { redirectTo: n, navigationBehaviorOptions: void 0 }
      : n,
    i = wy(!1, nt.Redirect);
  return (i.url = e), (i.navigationBehaviorOptions = r), i;
}
function wy(t, n) {
  let e = new Error(`NavigationCancelingError: ${t || ""}`);
  return (e[Ey] = !0), (e.cancellationCode = n), e;
}
function h_(t) {
  return Cy(t) && Kr(t.url);
}
function Cy(t) {
  return !!t && t[Ey];
}
var p_ = (() => {
  class t {
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵcmp = U({
        type: t,
        selectors: [["ng-component"]],
        standalone: !0,
        features: [Y],
        decls: 1,
        vars: 0,
        template: function (r, i) {
          r & 1 && $(0, "router-outlet");
        },
        dependencies: [hd],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
function m_(t, n) {
  return (
    t.providers &&
      !t._injector &&
      (t._injector = uu(t.providers, n, `Route: ${t.path}`)),
    t._injector ?? n
  );
}
function pd(t) {
  let n = t.children && t.children.map(pd),
    e = n ? he(w({}, t), { children: n }) : w({}, t);
  return (
    !e.component &&
      !e.loadComponent &&
      (n || e.loadChildren) &&
      e.outlet &&
      e.outlet !== F &&
      (e.component = p_),
    e
  );
}
function $t(t) {
  return t.outlet || F;
}
function g_(t, n) {
  let e = t.filter((r) => $t(r) === n);
  return e.push(...t.filter((r) => $t(r) !== n)), e;
}
function Xi(t) {
  if (!t) return null;
  if (t.routeConfig?._injector) return t.routeConfig._injector;
  for (let n = t.parent; n; n = n.parent) {
    let e = n.routeConfig;
    if (e?._loadedInjector) return e._loadedInjector;
    if (e?._injector) return e._injector;
  }
  return null;
}
var y_ = (t, n, e, r) =>
    W(
      (i) => (
        new id(n, i.targetRouterState, i.currentRouterState, e, r).activate(t),
        i
      )
    ),
  id = class {
    constructor(n, e, r, i, o) {
      (this.routeReuseStrategy = n),
        (this.futureState = e),
        (this.currState = r),
        (this.forwardEvent = i),
        (this.inputBindingEnabled = o);
    }
    activate(n) {
      let e = this.futureState._root,
        r = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(e, r, n),
        Fu(this.futureState.root),
        this.activateChildRoutes(e, r, n);
    }
    deactivateChildRoutes(n, e, r) {
      let i = zr(e);
      n.children.forEach((o) => {
        let s = o.value.outlet;
        this.deactivateRoutes(o, i[s], r), delete i[s];
      }),
        Object.values(i).forEach((o) => {
          this.deactivateRouteAndItsChildren(o, r);
        });
    }
    deactivateRoutes(n, e, r) {
      let i = n.value,
        o = e ? e.value : null;
      if (i === o)
        if (i.component) {
          let s = r.getContext(i.outlet);
          s && this.deactivateChildRoutes(n, e, s.children);
        } else this.deactivateChildRoutes(n, e, r);
      else o && this.deactivateRouteAndItsChildren(e, r);
    }
    deactivateRouteAndItsChildren(n, e) {
      n.value.component &&
      this.routeReuseStrategy.shouldDetach(n.value.snapshot)
        ? this.detachAndStoreRouteSubtree(n, e)
        : this.deactivateRouteAndOutlet(n, e);
    }
    detachAndStoreRouteSubtree(n, e) {
      let r = e.getContext(n.value.outlet),
        i = r && n.value.component ? r.children : e,
        o = zr(n);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, i);
      if (r && r.outlet) {
        let s = r.outlet.detach(),
          a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(n.value.snapshot, {
          componentRef: s,
          route: n,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(n, e) {
      let r = e.getContext(n.value.outlet),
        i = r && n.value.component ? r.children : e,
        o = zr(n);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, i);
      r &&
        (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
        (r.attachRef = null),
        (r.route = null));
    }
    activateChildRoutes(n, e, r) {
      let i = zr(e);
      n.children.forEach((o) => {
        this.activateRoutes(o, i[o.value.outlet], r),
          this.forwardEvent(new Xu(o.value.snapshot));
      }),
        n.children.length && this.forwardEvent(new Yu(n.value.snapshot));
    }
    activateRoutes(n, e, r) {
      let i = n.value,
        o = e ? e.value : null;
      if ((Fu(i), i === o))
        if (i.component) {
          let s = r.getOrCreateContext(i.outlet);
          this.activateChildRoutes(n, e, s.children);
        } else this.activateChildRoutes(n, e, r);
      else if (i.component) {
        let s = r.getOrCreateContext(i.outlet);
        if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(i.snapshot);
          this.routeReuseStrategy.store(i.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            Fu(a.route.value),
            this.activateChildRoutes(n, null, s.children);
        } else {
          let a = Xi(i.snapshot);
          (s.attachRef = null),
            (s.route = i),
            (s.injector = a),
            s.outlet && s.outlet.activateWith(i, s.injector),
            this.activateChildRoutes(n, null, s.children);
        }
      } else this.activateChildRoutes(n, null, r);
    }
  },
  ma = class {
    constructor(n) {
      (this.path = n), (this.route = this.path[this.path.length - 1]);
    }
  },
  qr = class {
    constructor(n, e) {
      (this.component = n), (this.route = e);
    }
  };
function v_(t, n, e) {
  let r = t._root,
    i = n ? n._root : null;
  return ji(r, i, e, [r.value]);
}
function E_(t) {
  let n = t.routeConfig ? t.routeConfig.canActivateChild : null;
  return !n || n.length === 0 ? null : { node: t, guards: n };
}
function Zr(t, n) {
  let e = Symbol(),
    r = n.get(t, e);
  return r === e ? (typeof t == "function" && !kh(t) ? t : n.get(t)) : r;
}
function ji(
  t,
  n,
  e,
  r,
  i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = zr(n);
  return (
    t.children.forEach((s) => {
      D_(s, o[s.value.outlet], e, r.concat([s.value]), i),
        delete o[s.value.outlet];
    }),
    Object.entries(o).forEach(([s, a]) => $i(a, e.getContext(s), i)),
    i
  );
}
function D_(
  t,
  n,
  e,
  r,
  i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = t.value,
    s = n ? n.value : null,
    a = e ? e.getContext(t.value.outlet) : null;
  if (s && o.routeConfig === s.routeConfig) {
    let l = w_(s, o, o.routeConfig.runGuardsAndResolvers);
    l
      ? i.canActivateChecks.push(new ma(r))
      : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
      o.component ? ji(t, n, a ? a.children : null, r, i) : ji(t, n, e, r, i),
      l &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        i.canDeactivateChecks.push(new qr(a.outlet.component, s));
  } else
    s && $i(n, a, i),
      i.canActivateChecks.push(new ma(r)),
      o.component
        ? ji(t, null, a ? a.children : null, r, i)
        : ji(t, null, e, r, i);
  return i;
}
function w_(t, n, e) {
  if (typeof e == "function") return e(t, n);
  switch (e) {
    case "pathParamsChange":
      return !tr(t.url, n.url);
    case "pathParamsOrQueryParamsChange":
      return !tr(t.url, n.url) || !Ut(t.queryParams, n.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !nd(t, n) || !Ut(t.queryParams, n.queryParams);
    case "paramsChange":
    default:
      return !nd(t, n);
  }
}
function $i(t, n, e) {
  let r = zr(t),
    i = t.value;
  Object.entries(r).forEach(([o, s]) => {
    i.component
      ? n
        ? $i(s, n.children.getContext(o), e)
        : $i(s, null, e)
      : $i(s, n, e);
  }),
    i.component
      ? n && n.outlet && n.outlet.isActivated
        ? e.canDeactivateChecks.push(new qr(n.outlet.component, i))
        : e.canDeactivateChecks.push(new qr(null, i))
      : e.canDeactivateChecks.push(new qr(null, i));
}
function Ji(t) {
  return typeof t == "function";
}
function C_(t) {
  return typeof t == "boolean";
}
function b_(t) {
  return t && Ji(t.canLoad);
}
function I_(t) {
  return t && Ji(t.canActivate);
}
function __(t) {
  return t && Ji(t.canActivateChild);
}
function S_(t) {
  return t && Ji(t.canDeactivate);
}
function T_(t) {
  return t && Ji(t.canMatch);
}
function by(t) {
  return t instanceof Kt || t?.name === "EmptyError";
}
var ia = Symbol("INITIAL_VALUE");
function Yr() {
  return qe((t) =>
    si(t.map((n) => n.pipe(Qt(1), ll(ia)))).pipe(
      W((n) => {
        for (let e of n)
          if (e !== !0) {
            if (e === ia) return ia;
            if (e === !1 || e instanceof Tn) return e;
          }
        return !0;
      }),
      st((n) => n !== ia),
      Qt(1)
    )
  );
}
function M_(t, n) {
  return ye((e) => {
    let {
      targetSnapshot: r,
      currentSnapshot: i,
      guards: { canActivateChecks: o, canDeactivateChecks: s },
    } = e;
    return s.length === 0 && o.length === 0
      ? N(he(w({}, e), { guardsResult: !0 }))
      : A_(s, r, i, t).pipe(
          ye((a) => (a && C_(a) ? x_(r, o, t, n) : N(a))),
          W((a) => he(w({}, e), { guardsResult: a }))
        );
  });
}
function A_(t, n, e, r) {
  return pe(t).pipe(
    ye((i) => F_(i.component, i.route, e, n, r)),
    gt((i) => i !== !0, !0)
  );
}
function x_(t, n, e, r) {
  return pe(n).pipe(
    jn((i) =>
      Er(
        R_(i.route.parent, r),
        N_(i.route, r),
        P_(t, i.path, e),
        O_(t, i.route, e)
      )
    ),
    gt((i) => i !== !0, !0)
  );
}
function N_(t, n) {
  return t !== null && n && n(new Zu(t)), N(!0);
}
function R_(t, n) {
  return t !== null && n && n(new Qu(t)), N(!0);
}
function O_(t, n, e) {
  let r = n.routeConfig ? n.routeConfig.canActivate : null;
  if (!r || r.length === 0) return N(!0);
  let i = r.map((o) =>
    ko(() => {
      let s = Xi(n) ?? e,
        a = Zr(o, s),
        l = I_(a) ? a.canActivate(n, t) : wn(s, () => a(n, t));
      return An(l).pipe(gt());
    })
  );
  return N(i).pipe(Yr());
}
function P_(t, n, e) {
  let r = n[n.length - 1],
    o = n
      .slice(0, n.length - 1)
      .reverse()
      .map((s) => E_(s))
      .filter((s) => s !== null)
      .map((s) =>
        ko(() => {
          let a = s.guards.map((l) => {
            let c = Xi(s.node) ?? e,
              u = Zr(l, c),
              d = __(u) ? u.canActivateChild(r, t) : wn(c, () => u(r, t));
            return An(d).pipe(gt());
          });
          return N(a).pipe(Yr());
        })
      );
  return N(o).pipe(Yr());
}
function F_(t, n, e, r, i) {
  let o = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
  if (!o || o.length === 0) return N(!0);
  let s = o.map((a) => {
    let l = Xi(n) ?? i,
      c = Zr(a, l),
      u = S_(c) ? c.canDeactivate(t, n, e, r) : wn(l, () => c(t, n, e, r));
    return An(u).pipe(gt());
  });
  return N(s).pipe(Yr());
}
function L_(t, n, e, r) {
  let i = n.canLoad;
  if (i === void 0 || i.length === 0) return N(!0);
  let o = i.map((s) => {
    let a = Zr(s, t),
      l = b_(a) ? a.canLoad(n, e) : wn(t, () => a(n, e));
    return An(l);
  });
  return N(o).pipe(Yr(), Iy(r));
}
function Iy(t) {
  return Ja(
    ve((n) => {
      if (Kr(n)) throw Dy(t, n);
    }),
    W((n) => n === !0)
  );
}
function k_(t, n, e, r) {
  let i = n.canMatch;
  if (!i || i.length === 0) return N(!0);
  let o = i.map((s) => {
    let a = Zr(s, t),
      l = T_(a) ? a.canMatch(n, e) : wn(t, () => a(n, e));
    return An(l);
  });
  return N(o).pipe(Yr(), Iy(r));
}
var Yi = class {
    constructor(n) {
      this.segmentGroup = n || null;
    }
  },
  ga = class extends Error {
    constructor(n) {
      super(), (this.urlTree = n);
    }
  };
function Hr(t) {
  return vr(new Yi(t));
}
function j_(t) {
  return vr(new v(4e3, !1));
}
function V_(t) {
  return vr(wy(!1, nt.GuardRejected));
}
var od = class {
    constructor(n, e) {
      (this.urlSerializer = n), (this.urlTree = e);
    }
    lineralizeSegments(n, e) {
      let r = [],
        i = e.root;
      for (;;) {
        if (((r = r.concat(i.segments)), i.numberOfChildren === 0)) return N(r);
        if (i.numberOfChildren > 1 || !i.children[F]) return j_(n.redirectTo);
        i = i.children[F];
      }
    }
    applyRedirectCommands(n, e, r) {
      let i = this.applyRedirectCreateUrlTree(
        e,
        this.urlSerializer.parse(e),
        n,
        r
      );
      if (e.startsWith("/")) throw new ga(i);
      return i;
    }
    applyRedirectCreateUrlTree(n, e, r, i) {
      let o = this.createSegmentGroup(n, e.root, r, i);
      return new Tn(
        o,
        this.createQueryParams(e.queryParams, this.urlTree.queryParams),
        e.fragment
      );
    }
    createQueryParams(n, e) {
      let r = {};
      return (
        Object.entries(n).forEach(([i, o]) => {
          if (typeof o == "string" && o.startsWith(":")) {
            let a = o.substring(1);
            r[i] = e[a];
          } else r[i] = o;
        }),
        r
      );
    }
    createSegmentGroup(n, e, r, i) {
      let o = this.createSegments(n, e.segments, r, i),
        s = {};
      return (
        Object.entries(e.children).forEach(([a, l]) => {
          s[a] = this.createSegmentGroup(n, l, r, i);
        }),
        new ee(o, s)
      );
    }
    createSegments(n, e, r, i) {
      return e.map((o) =>
        o.path.startsWith(":")
          ? this.findPosParam(n, o, i)
          : this.findOrReturn(o, r)
      );
    }
    findPosParam(n, e, r) {
      let i = r[e.path.substring(1)];
      if (!i) throw new v(4001, !1);
      return i;
    }
    findOrReturn(n, e) {
      let r = 0;
      for (let i of e) {
        if (i.path === n.path) return e.splice(r), i;
        r++;
      }
      return n;
    }
  },
  sd = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function B_(t, n, e, r, i) {
  let o = md(t, n, e);
  return o.matched
    ? ((r = m_(n, r)),
      k_(r, n, e, i).pipe(W((s) => (s === !0 ? o : w({}, sd)))))
    : N(o);
}
function md(t, n, e) {
  if (n.path === "**") return U_(e);
  if (n.path === "")
    return n.pathMatch === "full" && (t.hasChildren() || e.length > 0)
      ? w({}, sd)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: e,
          parameters: {},
          positionalParamSegments: {},
        };
  let i = (n.matcher || kI)(e, t, n);
  if (!i) return w({}, sd);
  let o = {};
  Object.entries(i.posParams ?? {}).forEach(([a, l]) => {
    o[a] = l.path;
  });
  let s =
    i.consumed.length > 0
      ? w(w({}, o), i.consumed[i.consumed.length - 1].parameters)
      : o;
  return {
    matched: !0,
    consumedSegments: i.consumed,
    remainingSegments: e.slice(i.consumed.length),
    parameters: s,
    positionalParamSegments: i.posParams ?? {},
  };
}
function U_(t) {
  return {
    matched: !0,
    parameters: t.length > 0 ? ry(t).parameters : {},
    consumedSegments: t,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function ty(t, n, e, r) {
  return e.length > 0 && z_(t, e, r)
    ? {
        segmentGroup: new ee(n, H_(r, new ee(e, t.children))),
        slicedSegments: [],
      }
    : e.length === 0 && W_(t, e, r)
    ? {
        segmentGroup: new ee(t.segments, $_(t, e, r, t.children)),
        slicedSegments: e,
      }
    : { segmentGroup: new ee(t.segments, t.children), slicedSegments: e };
}
function $_(t, n, e, r) {
  let i = {};
  for (let o of e)
    if (Ea(t, n, o) && !r[$t(o)]) {
      let s = new ee([], {});
      i[$t(o)] = s;
    }
  return w(w({}, r), i);
}
function H_(t, n) {
  let e = {};
  e[F] = n;
  for (let r of t)
    if (r.path === "" && $t(r) !== F) {
      let i = new ee([], {});
      e[$t(r)] = i;
    }
  return e;
}
function z_(t, n, e) {
  return e.some((r) => Ea(t, n, r) && $t(r) !== F);
}
function W_(t, n, e) {
  return e.some((r) => Ea(t, n, r));
}
function Ea(t, n, e) {
  return (t.hasChildren() || n.length > 0) && e.pathMatch === "full"
    ? !1
    : e.path === "";
}
function q_(t, n, e, r) {
  return $t(t) !== r && (r === F || !Ea(n, e, t)) ? !1 : md(n, t, e).matched;
}
function G_(t, n, e) {
  return n.length === 0 && !t.children[e];
}
var ad = class {};
function K_(t, n, e, r, i, o, s = "emptyOnly") {
  return new ld(t, n, e, r, i, s, o).recognize();
}
var Q_ = 31,
  ld = class {
    constructor(n, e, r, i, o, s, a) {
      (this.injector = n),
        (this.configLoader = e),
        (this.rootComponentType = r),
        (this.config = i),
        (this.urlTree = o),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new od(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(n) {
      return new v(4002, `'${n.segmentGroup}'`);
    }
    recognize() {
      let n = ty(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(n).pipe(
        W((e) => {
          let r = new Ki(
              [],
              Object.freeze({}),
              Object.freeze(w({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              F,
              this.rootComponentType,
              null,
              {}
            ),
            i = new tt(r, e),
            o = new pa("", i),
            s = n_(r, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (o.url = this.urlSerializer.serialize(s)),
            this.inheritParamsAndData(o._root, null),
            { state: o, tree: s }
          );
        })
      );
    }
    match(n) {
      return this.processSegmentGroup(this.injector, this.config, n, F).pipe(
        pn((r) => {
          if (r instanceof ga)
            return (this.urlTree = r.urlTree), this.match(r.urlTree.root);
          throw r instanceof Yi ? this.noMatchError(r) : r;
        })
      );
    }
    inheritParamsAndData(n, e) {
      let r = n.value,
        i = dd(r, e, this.paramsInheritanceStrategy);
      (r.params = Object.freeze(i.params)),
        (r.data = Object.freeze(i.data)),
        n.children.forEach((o) => this.inheritParamsAndData(o, r));
    }
    processSegmentGroup(n, e, r, i) {
      return r.segments.length === 0 && r.hasChildren()
        ? this.processChildren(n, e, r)
        : this.processSegment(n, e, r, r.segments, i, !0).pipe(
            W((o) => (o instanceof tt ? [o] : []))
          );
    }
    processChildren(n, e, r) {
      let i = [];
      for (let o of Object.keys(r.children))
        o === "primary" ? i.unshift(o) : i.push(o);
      return pe(i).pipe(
        jn((o) => {
          let s = r.children[o],
            a = g_(e, o);
          return this.processSegmentGroup(n, a, s, o);
        }),
        al((o, s) => (o.push(...s), o)),
        mn(null),
        sl(),
        ye((o) => {
          if (o === null) return Hr(r);
          let s = _y(o);
          return Y_(s), N(s);
        })
      );
    }
    processSegment(n, e, r, i, o, s) {
      return pe(e).pipe(
        jn((a) =>
          this.processSegmentAgainstRoute(
            a._injector ?? n,
            e,
            a,
            r,
            i,
            o,
            s
          ).pipe(
            pn((l) => {
              if (l instanceof Yi) return N(null);
              throw l;
            })
          )
        ),
        gt((a) => !!a),
        pn((a) => {
          if (by(a)) return G_(r, i, o) ? N(new ad()) : Hr(r);
          throw a;
        })
      );
    }
    processSegmentAgainstRoute(n, e, r, i, o, s, a) {
      return q_(r, i, o, s)
        ? r.redirectTo === void 0
          ? this.matchSegmentAgainstRoute(n, i, r, o, s)
          : this.allowRedirects && a
          ? this.expandSegmentAgainstRouteUsingRedirect(n, i, e, r, o, s)
          : Hr(i)
        : Hr(i);
    }
    expandSegmentAgainstRouteUsingRedirect(n, e, r, i, o, s) {
      let {
        matched: a,
        consumedSegments: l,
        positionalParamSegments: c,
        remainingSegments: u,
      } = md(e, i, o);
      if (!a) return Hr(e);
      i.redirectTo.startsWith("/") &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > Q_ && (this.allowRedirects = !1));
      let d = this.applyRedirects.applyRedirectCommands(l, i.redirectTo, c);
      return this.applyRedirects
        .lineralizeSegments(i, d)
        .pipe(ye((f) => this.processSegment(n, r, e, f.concat(u), s, !1)));
    }
    matchSegmentAgainstRoute(n, e, r, i, o) {
      let s = B_(e, r, i, n, this.urlSerializer);
      return (
        r.path === "**" && (e.children = {}),
        s.pipe(
          qe((a) =>
            a.matched
              ? ((n = r._injector ?? n),
                this.getChildConfig(n, r, i).pipe(
                  qe(({ routes: l }) => {
                    let c = r._loadedInjector ?? n,
                      {
                        consumedSegments: u,
                        remainingSegments: d,
                        parameters: f,
                      } = a,
                      h = new Ki(
                        u,
                        f,
                        Object.freeze(w({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        X_(r),
                        $t(r),
                        r.component ?? r._loadedComponent ?? null,
                        r,
                        J_(r)
                      ),
                      { segmentGroup: p, slicedSegments: y } = ty(e, u, d, l);
                    if (y.length === 0 && p.hasChildren())
                      return this.processChildren(c, l, p).pipe(
                        W((M) => (M === null ? null : new tt(h, M)))
                      );
                    if (l.length === 0 && y.length === 0)
                      return N(new tt(h, []));
                    let T = $t(r) === o;
                    return this.processSegment(c, l, p, y, T ? F : o, !0).pipe(
                      W((M) => new tt(h, M instanceof tt ? [M] : []))
                    );
                  })
                ))
              : Hr(e)
          )
        )
      );
    }
    getChildConfig(n, e, r) {
      return e.children
        ? N({ routes: e.children, injector: n })
        : e.loadChildren
        ? e._loadedRoutes !== void 0
          ? N({ routes: e._loadedRoutes, injector: e._loadedInjector })
          : L_(n, e, r, this.urlSerializer).pipe(
              ye((i) =>
                i
                  ? this.configLoader.loadChildren(n, e).pipe(
                      ve((o) => {
                        (e._loadedRoutes = o.routes),
                          (e._loadedInjector = o.injector);
                      })
                    )
                  : V_(e)
              )
            )
        : N({ routes: [], injector: n });
    }
  };
function Y_(t) {
  t.sort((n, e) =>
    n.value.outlet === F
      ? -1
      : e.value.outlet === F
      ? 1
      : n.value.outlet.localeCompare(e.value.outlet)
  );
}
function Z_(t) {
  let n = t.value.routeConfig;
  return n && n.path === "";
}
function _y(t) {
  let n = [],
    e = new Set();
  for (let r of t) {
    if (!Z_(r)) {
      n.push(r);
      continue;
    }
    let i = n.find((o) => r.value.routeConfig === o.value.routeConfig);
    i !== void 0 ? (i.children.push(...r.children), e.add(i)) : n.push(r);
  }
  for (let r of e) {
    let i = _y(r.children);
    n.push(new tt(r.value, i));
  }
  return n.filter((r) => !e.has(r));
}
function X_(t) {
  return t.data || {};
}
function J_(t) {
  return t.resolve || {};
}
function eS(t, n, e, r, i, o) {
  return ye((s) =>
    K_(t, n, e, r, s.extractedUrl, i, o).pipe(
      W(({ state: a, tree: l }) =>
        he(w({}, s), { targetSnapshot: a, urlAfterRedirects: l })
      )
    )
  );
}
function tS(t, n) {
  return ye((e) => {
    let {
      targetSnapshot: r,
      guards: { canActivateChecks: i },
    } = e;
    if (!i.length) return N(e);
    let o = new Set(i.map((l) => l.route)),
      s = new Set();
    for (let l of o) if (!s.has(l)) for (let c of Sy(l)) s.add(c);
    let a = 0;
    return pe(s).pipe(
      jn((l) =>
        o.has(l)
          ? nS(l, r, t, n)
          : ((l.data = dd(l, l.parent, t).resolve), N(void 0))
      ),
      ve(() => a++),
      wr(1),
      ye((l) => (a === s.size ? N(e) : We))
    );
  });
}
function Sy(t) {
  let n = t.children.map((e) => Sy(e)).flat();
  return [t, ...n];
}
function nS(t, n, e, r) {
  let i = t.routeConfig,
    o = t._resolve;
  return (
    i?.title !== void 0 && !vy(i) && (o[Zi] = i.title),
    rS(o, t, n, r).pipe(
      W(
        (s) => (
          (t._resolvedData = s), (t.data = dd(t, t.parent, e).resolve), null
        )
      )
    )
  );
}
function rS(t, n, e, r) {
  let i = ju(t);
  if (i.length === 0) return N({});
  let o = {};
  return pe(i).pipe(
    ye((s) =>
      iS(t[s], n, e, r).pipe(
        gt(),
        ve((a) => {
          o[s] = a;
        })
      )
    ),
    wr(1),
    ol(o),
    pn((s) => (by(s) ? We : vr(s)))
  );
}
function iS(t, n, e, r) {
  let i = Xi(n) ?? r,
    o = Zr(t, i),
    s = o.resolve ? o.resolve(n, e) : wn(i, () => o(n, e));
  return An(s);
}
function Lu(t) {
  return qe((n) => {
    let e = t(n);
    return e ? pe(e).pipe(W(() => n)) : N(n);
  });
}
var Ty = (() => {
    class t {
      buildTitle(e) {
        let r,
          i = e.root;
        for (; i !== void 0; )
          (r = this.getResolvedTitleForRoute(i) ?? r),
            (i = i.children.find((o) => o.outlet === F));
        return r;
      }
      getResolvedTitleForRoute(e) {
        return e.data[Zi];
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: () => E(oS), providedIn: "root" });
      }
    }
    return t;
  })(),
  oS = (() => {
    class t extends Ty {
      constructor(e) {
        super(), (this.title = e);
      }
      updateTitle(e) {
        let r = this.buildTitle(e);
        r !== void 0 && this.title.setTitle(r);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)(B(Kg));
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  gd = new k("", { providedIn: "root", factory: () => ({}) }),
  yd = new k(""),
  sS = (() => {
    class t {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = E(mu));
      }
      loadComponent(e) {
        if (this.componentLoaders.get(e)) return this.componentLoaders.get(e);
        if (e._loadedComponent) return N(e._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(e);
        let r = An(e.loadComponent()).pipe(
            W(My),
            ve((o) => {
              this.onLoadEndListener && this.onLoadEndListener(e),
                (e._loadedComponent = o);
            }),
            Dr(() => {
              this.componentLoaders.delete(e);
            })
          ),
          i = new yr(r, () => new Se()).pipe(gr());
        return this.componentLoaders.set(e, i), i;
      }
      loadChildren(e, r) {
        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
        if (r._loadedRoutes)
          return N({ routes: r._loadedRoutes, injector: r._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(r);
        let o = aS(r, this.compiler, e, this.onLoadEndListener).pipe(
            Dr(() => {
              this.childrenLoaders.delete(r);
            })
          ),
          s = new yr(o, () => new Se()).pipe(gr());
        return this.childrenLoaders.set(r, s), s;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })();
function aS(t, n, e, r) {
  return An(t.loadChildren()).pipe(
    W(My),
    ye((i) =>
      i instanceof Ei || Array.isArray(i) ? N(i) : pe(n.compileModuleAsync(i))
    ),
    W((i) => {
      r && r(t);
      let o,
        s,
        a = !1;
      return (
        Array.isArray(i)
          ? ((s = i), (a = !0))
          : ((o = i.create(e).injector),
            (s = o.get(yd, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(pd), injector: o }
      );
    })
  );
}
function lS(t) {
  return t && typeof t == "object" && "default" in t;
}
function My(t) {
  return lS(t) ? t.default : t;
}
var vd = (() => {
    class t {
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: () => E(cS), providedIn: "root" });
      }
    }
    return t;
  })(),
  cS = (() => {
    class t {
      shouldProcessUrl(e) {
        return !0;
      }
      extract(e) {
        return e;
      }
      merge(e, r) {
        return e;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  uS = new k("");
var dS = (() => {
  class t {
    get hasRequestedNavigation() {
      return this.navigationId !== 0;
    }
    constructor() {
      (this.currentNavigation = null),
        (this.currentTransition = null),
        (this.lastSuccessfulNavigation = null),
        (this.events = new Se()),
        (this.transitionAbortSubject = new Se()),
        (this.configLoader = E(sS)),
        (this.environmentInjector = E(ct)),
        (this.urlSerializer = E(ud)),
        (this.rootContexts = E(ya)),
        (this.location = E(xi)),
        (this.inputBindingEnabled = E(va, { optional: !0 }) !== null),
        (this.titleStrategy = E(Ty)),
        (this.options = E(gd, { optional: !0 }) || {}),
        (this.paramsInheritanceStrategy =
          this.options.paramsInheritanceStrategy || "emptyOnly"),
        (this.urlHandlingStrategy = E(vd)),
        (this.createViewTransition = E(uS, { optional: !0 })),
        (this.navigationId = 0),
        (this.afterPreactivation = () => N(void 0)),
        (this.rootComponentType = null);
      let e = (i) => this.events.next(new Gu(i)),
        r = (i) => this.events.next(new Ku(i));
      (this.configLoader.onLoadEndListener = r),
        (this.configLoader.onLoadStartListener = e);
    }
    complete() {
      this.transitions?.complete();
    }
    handleNavigationRequest(e) {
      let r = ++this.navigationId;
      this.transitions?.next(
        he(w(w({}, this.transitions.value), e), { id: r })
      );
    }
    setupNavigations(e, r, i) {
      return (
        (this.transitions = new Te({
          id: 0,
          currentUrlTree: r,
          currentRawUrl: r,
          extractedUrl: this.urlHandlingStrategy.extract(r),
          urlAfterRedirects: this.urlHandlingStrategy.extract(r),
          rawUrl: r,
          extras: {},
          resolve: null,
          reject: null,
          promise: Promise.resolve(!0),
          source: Ui,
          restoredState: null,
          currentSnapshot: i.snapshot,
          targetSnapshot: null,
          currentRouterState: i,
          targetRouterState: null,
          guards: { canActivateChecks: [], canDeactivateChecks: [] },
          guardsResult: null,
        })),
        this.transitions.pipe(
          st((o) => o.id !== 0),
          W((o) =>
            he(w({}, o), {
              extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
            })
          ),
          qe((o) => {
            let s = !1,
              a = !1;
            return N(o).pipe(
              qe((l) => {
                if (this.navigationId > o.id)
                  return (
                    this.cancelNavigationTransition(
                      o,
                      "",
                      nt.SupersededByNewNavigation
                    ),
                    We
                  );
                (this.currentTransition = o),
                  (this.currentNavigation = {
                    id: l.id,
                    initialUrl: l.rawUrl,
                    extractedUrl: l.extractedUrl,
                    trigger: l.source,
                    extras: l.extras,
                    previousNavigation: this.lastSuccessfulNavigation
                      ? he(w({}, this.lastSuccessfulNavigation), {
                          previousNavigation: null,
                        })
                      : null,
                  });
                let c =
                    !e.navigated ||
                    this.isUpdatingInternalState() ||
                    this.isUpdatedBrowserUrl(),
                  u = l.extras.onSameUrlNavigation ?? e.onSameUrlNavigation;
                if (!c && u !== "reload") {
                  let d = "";
                  return (
                    this.events.next(
                      new rr(
                        l.id,
                        this.urlSerializer.serialize(l.rawUrl),
                        d,
                        $u.IgnoredSameUrlNavigation
                      )
                    ),
                    l.resolve(null),
                    We
                  );
                }
                if (this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl))
                  return N(l).pipe(
                    qe((d) => {
                      let f = this.transitions?.getValue();
                      return (
                        this.events.next(
                          new zi(
                            d.id,
                            this.urlSerializer.serialize(d.extractedUrl),
                            d.source,
                            d.restoredState
                          )
                        ),
                        f !== this.transitions?.getValue()
                          ? We
                          : Promise.resolve(d)
                      );
                    }),
                    eS(
                      this.environmentInjector,
                      this.configLoader,
                      this.rootComponentType,
                      e.config,
                      this.urlSerializer,
                      this.paramsInheritanceStrategy
                    ),
                    ve((d) => {
                      (o.targetSnapshot = d.targetSnapshot),
                        (o.urlAfterRedirects = d.urlAfterRedirects),
                        (this.currentNavigation = he(
                          w({}, this.currentNavigation),
                          { finalUrl: d.urlAfterRedirects }
                        ));
                      let f = new da(
                        d.id,
                        this.urlSerializer.serialize(d.extractedUrl),
                        this.urlSerializer.serialize(d.urlAfterRedirects),
                        d.targetSnapshot
                      );
                      this.events.next(f);
                    })
                  );
                if (
                  c &&
                  this.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)
                ) {
                  let {
                      id: d,
                      extractedUrl: f,
                      source: h,
                      restoredState: p,
                      extras: y,
                    } = l,
                    T = new zi(d, this.urlSerializer.serialize(f), h, p);
                  this.events.next(T);
                  let M = gy(this.rootComponentType).snapshot;
                  return (
                    (this.currentTransition = o =
                      he(w({}, l), {
                        targetSnapshot: M,
                        urlAfterRedirects: f,
                        extras: he(w({}, y), {
                          skipLocationChange: !1,
                          replaceUrl: !1,
                        }),
                      })),
                    (this.currentNavigation.finalUrl = f),
                    N(o)
                  );
                } else {
                  let d = "";
                  return (
                    this.events.next(
                      new rr(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        d,
                        $u.IgnoredByUrlHandlingStrategy
                      )
                    ),
                    l.resolve(null),
                    We
                  );
                }
              }),
              ve((l) => {
                let c = new Hu(
                  l.id,
                  this.urlSerializer.serialize(l.extractedUrl),
                  this.urlSerializer.serialize(l.urlAfterRedirects),
                  l.targetSnapshot
                );
                this.events.next(c);
              }),
              W(
                (l) => (
                  (this.currentTransition = o =
                    he(w({}, l), {
                      guards: v_(
                        l.targetSnapshot,
                        l.currentSnapshot,
                        this.rootContexts
                      ),
                    })),
                  o
                )
              ),
              M_(this.environmentInjector, (l) => this.events.next(l)),
              ve((l) => {
                if (((o.guardsResult = l.guardsResult), Kr(l.guardsResult)))
                  throw Dy(this.urlSerializer, l.guardsResult);
                let c = new zu(
                  l.id,
                  this.urlSerializer.serialize(l.extractedUrl),
                  this.urlSerializer.serialize(l.urlAfterRedirects),
                  l.targetSnapshot,
                  !!l.guardsResult
                );
                this.events.next(c);
              }),
              st((l) =>
                l.guardsResult
                  ? !0
                  : (this.cancelNavigationTransition(l, "", nt.GuardRejected),
                    !1)
              ),
              Lu((l) => {
                if (l.guards.canActivateChecks.length)
                  return N(l).pipe(
                    ve((c) => {
                      let u = new Wu(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects),
                        c.targetSnapshot
                      );
                      this.events.next(u);
                    }),
                    qe((c) => {
                      let u = !1;
                      return N(c).pipe(
                        tS(
                          this.paramsInheritanceStrategy,
                          this.environmentInjector
                        ),
                        ve({
                          next: () => (u = !0),
                          complete: () => {
                            u ||
                              this.cancelNavigationTransition(
                                c,
                                "",
                                nt.NoDataFromResolver
                              );
                          },
                        })
                      );
                    }),
                    ve((c) => {
                      let u = new qu(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects),
                        c.targetSnapshot
                      );
                      this.events.next(u);
                    })
                  );
              }),
              Lu((l) => {
                let c = (u) => {
                  let d = [];
                  u.routeConfig?.loadComponent &&
                    !u.routeConfig._loadedComponent &&
                    d.push(
                      this.configLoader.loadComponent(u.routeConfig).pipe(
                        ve((f) => {
                          u.component = f;
                        }),
                        W(() => {})
                      )
                    );
                  for (let f of u.children) d.push(...c(f));
                  return d;
                };
                return si(c(l.targetSnapshot.root)).pipe(mn(null), Qt(1));
              }),
              Lu(() => this.afterPreactivation()),
              qe(() => {
                let { currentSnapshot: l, targetSnapshot: c } = o,
                  u = this.createViewTransition?.(
                    this.environmentInjector,
                    l.root,
                    c.root
                  );
                return u ? pe(u).pipe(W(() => o)) : N(o);
              }),
              W((l) => {
                let c = u_(
                  e.routeReuseStrategy,
                  l.targetSnapshot,
                  l.currentRouterState
                );
                return (
                  (this.currentTransition = o =
                    he(w({}, l), { targetRouterState: c })),
                  (this.currentNavigation.targetRouterState = c),
                  o
                );
              }),
              ve(() => {
                this.events.next(new qi());
              }),
              y_(
                this.rootContexts,
                e.routeReuseStrategy,
                (l) => this.events.next(l),
                this.inputBindingEnabled
              ),
              Qt(1),
              ve({
                next: (l) => {
                  (s = !0),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    this.events.next(
                      new nr(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        this.urlSerializer.serialize(l.urlAfterRedirects)
                      )
                    ),
                    this.titleStrategy?.updateTitle(
                      l.targetRouterState.snapshot
                    ),
                    l.resolve(!0);
                },
                complete: () => {
                  s = !0;
                },
              }),
              cl(
                this.transitionAbortSubject.pipe(
                  ve((l) => {
                    throw l;
                  })
                )
              ),
              Dr(() => {
                !s &&
                  !a &&
                  this.cancelNavigationTransition(
                    o,
                    "",
                    nt.SupersededByNewNavigation
                  ),
                  this.currentTransition?.id === o.id &&
                    ((this.currentNavigation = null),
                    (this.currentTransition = null));
              }),
              pn((l) => {
                if (((a = !0), Cy(l)))
                  this.events.next(
                    new Mn(
                      o.id,
                      this.urlSerializer.serialize(o.extractedUrl),
                      l.message,
                      l.cancellationCode
                    )
                  ),
                    h_(l) ? this.events.next(new Gi(l.url)) : o.resolve(!1);
                else {
                  this.events.next(
                    new Wi(
                      o.id,
                      this.urlSerializer.serialize(o.extractedUrl),
                      l,
                      o.targetSnapshot ?? void 0
                    )
                  );
                  try {
                    o.resolve(e.errorHandler(l));
                  } catch (c) {
                    this.options.resolveNavigationPromiseOnError
                      ? o.resolve(!1)
                      : o.reject(c);
                  }
                }
                return We;
              })
            );
          })
        )
      );
    }
    cancelNavigationTransition(e, r, i) {
      let o = new Mn(e.id, this.urlSerializer.serialize(e.extractedUrl), r, i);
      this.events.next(o), e.resolve(!1);
    }
    isUpdatingInternalState() {
      return (
        this.currentTransition?.extractedUrl.toString() !==
        this.currentTransition?.currentUrlTree.toString()
      );
    }
    isUpdatedBrowserUrl() {
      return (
        this.urlHandlingStrategy
          .extract(this.urlSerializer.parse(this.location.path(!0)))
          .toString() !== this.currentTransition?.extractedUrl.toString() &&
        !this.currentTransition?.extras.skipLocationChange
      );
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
  }
  return t;
})();
function fS(t) {
  return t !== Ui;
}
var hS = (() => {
    class t {
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: () => E(pS), providedIn: "root" });
      }
    }
    return t;
  })(),
  cd = class {
    shouldDetach(n) {
      return !1;
    }
    store(n, e) {}
    shouldAttach(n) {
      return !1;
    }
    retrieve(n) {
      return null;
    }
    shouldReuseRoute(n, e) {
      return n.routeConfig === e.routeConfig;
    }
  },
  pS = (() => {
    class t extends cd {
      static {
        this.ɵfac = (() => {
          let e;
          return function (i) {
            return (e || (e = bt(t)))(i || t);
          };
        })();
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  Ay = (() => {
    class t {
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: () => E(mS), providedIn: "root" });
      }
    }
    return t;
  })(),
  mS = (() => {
    class t extends Ay {
      constructor() {
        super(...arguments),
          (this.location = E(xi)),
          (this.urlSerializer = E(ud)),
          (this.options = E(gd, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || "replace"),
          (this.urlHandlingStrategy = E(vd)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.currentUrlTree = new Tn()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = gy(null)),
          (this.stateMemento = this.createStateMemento());
      }
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== "computed"
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      getRouterState() {
        return this.routerState;
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(e) {
        return this.location.subscribe((r) => {
          r.type === "popstate" && e(r.url, r.state);
        });
      }
      handleRouterEvent(e, r) {
        if (e instanceof zi) this.stateMemento = this.createStateMemento();
        else if (e instanceof rr) this.rawUrlTree = r.initialUrl;
        else if (e instanceof da) {
          if (
            this.urlUpdateStrategy === "eager" &&
            !r.extras.skipLocationChange
          ) {
            let i = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl);
            this.setBrowserUrl(i, r);
          }
        } else
          e instanceof qi
            ? ((this.currentUrlTree = r.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                r.finalUrl,
                r.initialUrl
              )),
              (this.routerState = r.targetRouterState),
              this.urlUpdateStrategy === "deferred" &&
                (r.extras.skipLocationChange ||
                  this.setBrowserUrl(this.rawUrlTree, r)))
            : e instanceof Mn &&
              (e.code === nt.GuardRejected || e.code === nt.NoDataFromResolver)
            ? this.restoreHistory(r)
            : e instanceof Wi
            ? this.restoreHistory(r, !0)
            : e instanceof nr &&
              ((this.lastSuccessfulId = e.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(e, r) {
        let i = this.urlSerializer.serialize(e);
        if (this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl) {
          let o = this.browserPageId,
            s = w(w({}, r.extras.state), this.generateNgRouterState(r.id, o));
          this.location.replaceState(i, "", s);
        } else {
          let o = w(
            w({}, r.extras.state),
            this.generateNgRouterState(r.id, this.browserPageId + 1)
          );
          this.location.go(i, "", o);
        }
      }
      restoreHistory(e, r = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let i = this.browserPageId,
            o = this.currentPageId - i;
          o !== 0
            ? this.location.historyGo(o)
            : this.currentUrlTree === e.finalUrl &&
              o === 0 &&
              (this.resetState(e), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (r && this.resetState(e), this.resetUrlToCurrentUrlTree());
      }
      resetState(e) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            e.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(e, r) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: e, ɵrouterPageId: r }
          : { navigationId: e };
      }
      static {
        this.ɵfac = (() => {
          let e;
          return function (i) {
            return (e || (e = bt(t)))(i || t);
          };
        })();
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  Vi = (function (t) {
    return (
      (t[(t.COMPLETE = 0)] = "COMPLETE"),
      (t[(t.FAILED = 1)] = "FAILED"),
      (t[(t.REDIRECTING = 2)] = "REDIRECTING"),
      t
    );
  })(Vi || {});
function gS(t, n) {
  t.events
    .pipe(
      st(
        (e) =>
          e instanceof nr ||
          e instanceof Mn ||
          e instanceof Wi ||
          e instanceof rr
      ),
      W((e) =>
        e instanceof nr || e instanceof rr
          ? Vi.COMPLETE
          : (
              e instanceof Mn
                ? e.code === nt.Redirect ||
                  e.code === nt.SupersededByNewNavigation
                : !1
            )
          ? Vi.REDIRECTING
          : Vi.FAILED
      ),
      st((e) => e !== Vi.REDIRECTING),
      Qt(1)
    )
    .subscribe(() => {
      n();
    });
}
function yS(t) {
  throw t;
}
var vS = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  ES = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  xy = (() => {
    class t {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      constructor() {
        (this.disposed = !1),
          (this.isNgZoneEnabled = !1),
          (this.console = E(Ws)),
          (this.stateManager = E(Ay)),
          (this.options = E(gd, { optional: !0 }) || {}),
          (this.pendingTasks = E(Si)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.navigationTransitions = E(dS)),
          (this.urlSerializer = E(ud)),
          (this.location = E(xi)),
          (this.urlHandlingStrategy = E(vd)),
          (this._events = new Se()),
          (this.errorHandler = this.options.errorHandler || yS),
          (this.navigated = !1),
          (this.routeReuseStrategy = E(hS)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || "ignore"),
          (this.config = E(yd, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!E(va, { optional: !0 })),
          (this.eventsSubscription = new ge()),
          (this.isNgZoneEnabled = E(oe) instanceof oe && oe.isInAngularZone()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (e) => {
                this.console.warn(e);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let e = this.navigationTransitions.events.subscribe((r) => {
          try {
            let i = this.navigationTransitions.currentTransition,
              o = this.navigationTransitions.currentNavigation;
            if (i !== null && o !== null) {
              if (
                (this.stateManager.handleRouterEvent(r, o),
                r instanceof Mn &&
                  r.code !== nt.Redirect &&
                  r.code !== nt.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (r instanceof nr) this.navigated = !0;
              else if (r instanceof Gi) {
                let s = this.urlHandlingStrategy.merge(r.url, i.currentRawUrl),
                  a = {
                    info: i.extras.info,
                    skipLocationChange: i.extras.skipLocationChange,
                    replaceUrl:
                      this.urlUpdateStrategy === "eager" || fS(i.source),
                  };
                this.scheduleNavigation(s, Ui, null, a, {
                  resolve: i.resolve,
                  reject: i.reject,
                  promise: i.promise,
                });
              }
            }
            wS(r) && this._events.next(r);
          } catch (i) {
            this.navigationTransitions.transitionAbortSubject.next(i);
          }
        });
        this.eventsSubscription.add(e);
      }
      resetRootComponentType(e) {
        (this.routerState.root.component = e),
          (this.navigationTransitions.rootComponentType = e);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              Ui,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (e, r) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(e, "popstate", r);
              }, 0);
            }
          );
      }
      navigateToSyncWithBrowser(e, r, i) {
        let o = { replaceUrl: !0 },
          s = i?.navigationId ? i : null;
        if (i) {
          let l = w({}, i);
          delete l.navigationId,
            delete l.ɵrouterPageId,
            Object.keys(l).length !== 0 && (o.state = l);
        }
        let a = this.parseUrl(e);
        this.scheduleNavigation(a, r, s, o);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(e) {
        (this.config = e.map(pd)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(e, r = {}) {
        let {
            relativeTo: i,
            queryParams: o,
            fragment: s,
            queryParamsHandling: a,
            preserveFragment: l,
          } = r,
          c = l ? this.currentUrlTree.fragment : s,
          u = null;
        switch (a) {
          case "merge":
            u = w(w({}, this.currentUrlTree.queryParams), o);
            break;
          case "preserve":
            u = this.currentUrlTree.queryParams;
            break;
          default:
            u = o || null;
        }
        u !== null && (u = this.removeEmptyProps(u));
        let d;
        try {
          let f = i ? i.snapshot : this.routerState.snapshot.root;
          d = fy(f);
        } catch {
          (typeof e[0] != "string" || !e[0].startsWith("/")) && (e = []),
            (d = this.currentUrlTree.root);
        }
        return hy(d, e, u, c ?? null);
      }
      navigateByUrl(e, r = { skipLocationChange: !1 }) {
        let i = Kr(e) ? e : this.parseUrl(e),
          o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
        return this.scheduleNavigation(o, Ui, null, r);
      }
      navigate(e, r = { skipLocationChange: !1 }) {
        return DS(e), this.navigateByUrl(this.createUrlTree(e, r), r);
      }
      serializeUrl(e) {
        return this.urlSerializer.serialize(e);
      }
      parseUrl(e) {
        try {
          return this.urlSerializer.parse(e);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(e, r) {
        let i;
        if (
          (r === !0 ? (i = w({}, vS)) : r === !1 ? (i = w({}, ES)) : (i = r),
          Kr(e))
        )
          return Yg(this.currentUrlTree, e, i);
        let o = this.parseUrl(e);
        return Yg(this.currentUrlTree, o, i);
      }
      removeEmptyProps(e) {
        return Object.entries(e).reduce(
          (r, [i, o]) => (o != null && (r[i] = o), r),
          {}
        );
      }
      scheduleNavigation(e, r, i, o, s) {
        if (this.disposed) return Promise.resolve(!1);
        let a, l, c;
        s
          ? ((a = s.resolve), (l = s.reject), (c = s.promise))
          : (c = new Promise((d, f) => {
              (a = d), (l = f);
            }));
        let u = this.pendingTasks.add();
        return (
          gS(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(u));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: r,
            restoredState: i,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: e,
            extras: o,
            resolve: a,
            reject: l,
            promise: c,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          c.catch((d) => Promise.reject(d))
        );
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })();
function DS(t) {
  for (let n = 0; n < t.length; n++) if (t[n] == null) throw new v(4008, !1);
}
function wS(t) {
  return !(t instanceof qi) && !(t instanceof Gi);
}
var CS = new k("");
function Ny(t, ...n) {
  return Gn([
    { provide: yd, multi: !0, useValue: t },
    [],
    { provide: Qr, useFactory: bS, deps: [xy] },
    { provide: Ur, multi: !0, useFactory: _S },
    n.map((e) => e.ɵproviders),
  ]);
}
function bS(t) {
  return t.routerState.root;
}
function IS(t, n) {
  return { ɵkind: t, ɵproviders: n };
}
function _S() {
  let t = E(Zn);
  return (n) => {
    let e = t.get(_n);
    if (n !== e.components[0]) return;
    let r = t.get(xy),
      i = t.get(SS);
    t.get(TS) === 1 && r.initialNavigation(),
      t.get(MS, null, V.Optional)?.setUpPreloading(),
      t.get(CS, null, V.Optional)?.init(),
      r.resetRootComponentType(e.componentTypes[0]),
      i.closed || (i.next(), i.complete(), i.unsubscribe());
  };
}
var SS = new k("", { factory: () => new Se() }),
  TS = new k("", { providedIn: "root", factory: () => 1 });
var MS = new k("");
function Ry() {
  return IS(8, [ey, { provide: va, useExisting: ey }]);
}
var Ht = class {
  formatMasage() {
    let n = `Ola, selecionei os seguintes produtos na loja.
`,
      e = "",
      i = `
 *Total:* R$ 0

`;
    return `Ol\xE1, vim pelo site da CBD Vital Med e gostaria de saber mais sobre o \xF3leo de Cannabidiol.

`;
  }
  sendMensage() {
    let e = `https://wa.me/+5547992122928?text=${encodeURIComponent(
      this.formatMasage()
    )}`;
    console.log(e), window.open(e, "_blank");
  }
};
var Oy = (() => {
  class t {
    constructor() {}
    sendMensage() {
      new Ht().sendMensage();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵcmp = U({
        type: t,
        selectors: [["app-header"]],
        standalone: !0,
        features: [Y],
        decls: 27,
        vars: 0,
        consts: [
          [1, "relative"],
          [
            "src",
            "assets/media/imagem_segurando.png",
            "alt",
            "pessoa segurando frasco de oleo",
            1,
            "w-full",
            "h-[650px]",
            "object-cover",
          ],
          [1, "absolute", "inset-0", "bg-black", "bg-opacity-50"],
          [
            1,
            "absolute",
            "inset-0",
            "flex",
            "flex-col",
            "justify-center",
            "items-start",
            "px-12",
            "font-normal",
            "text-white",
          ],
          [1, "max-w-lg", "font-thin", "text-6xl", "leading-tight"],
          [
            "pButton",
            "",
            1,
            "bg-green-800",
            "hover:bg-green-900",
            "shadow-md",
            "mt-6",
            "px-8",
            "py-3",
            "rounded-md",
            "font-medium",
            "text-lg",
            "text-white",
            3,
            "click",
          ],
          [
            1,
            "bottom-0",
            "z-20",
            "absolute",
            "bg-white",
            "rounded-t-[150px]",
            "w-full",
            "h-20",
          ],
          [1, "top-6", "right-12", "absolute", "text-white"],
          [1, "flex", "space-x-8", "font-light", "text-lg"],
          ["href", "#sobre", 1, "hover:text-green-200"],
          ["href", "#conheca", 1, "hover:text-green-200"],
          ["href", "#feedbacks", 1, "hover:text-green-200"],
          ["href", "#beneficios", 1, "hover:text-green-200"],
          ["href", "#infos", 1, "hover:text-green-200"],
        ],
        template: function (r, i) {
          r & 1 &&
            (m(0, "header", 0)(1, "div", 0),
            $(2, "img", 1)(3, "div", 2),
            m(4, "div", 3)(5, "h1", 4),
            C(6, " A ci\xEAncia que transforma a sa\xFAde "),
            g(),
            m(7, "button", 5),
            me("click", function () {
              return i.sendMensage();
            }),
            C(8, " Clique e saiba mais "),
            g()(),
            $(9, "div", 6),
            g(),
            m(10, "nav", 7)(11, "ul", 8)(12, "li")(13, "a", 9),
            C(14, "Sobre"),
            g()(),
            m(15, "li")(16, "a", 10),
            C(17, "Como funciona"),
            g()(),
            m(18, "li")(19, "a", 11),
            C(20, "Depoimentos"),
            g()(),
            m(21, "li")(22, "a", 12),
            C(23, "Benef\xEDcios"),
            g()(),
            m(24, "li")(25, "a", 13),
            C(26, "Fale conosco"),
            g()()()()());
        },
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Py = (() => {
  class t {
    constructor() {}
    sendMensage() {
      new Ht().sendMensage();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵcmp = U({
        type: t,
        selectors: [["app-features"]],
        standalone: !0,
        features: [Y],
        decls: 25,
        vars: 0,
        consts: [
          ["id", "sobre", 1, "bg-white", "pb-12", "w-full", "flex", "flex-col"],
          [
            1,
            "bg-white",
            "flex",
            "flex-col",
            "lg:flex-row",
            "lg:justify-between",
            "lg:items-center",
            "w-full",
            "max-w-6xl",
            "mx-auto",
            "px-6",
            "lg:px-8",
            "space-y-8",
            "lg:space-y-0",
          ],
          [1, "flex-1"],
          [
            "src",
            "assets/media/ampola.png",
            "alt",
            "pessoa segurando frasco de oleo",
            1,
            "w-full",
          ],
          [
            1,
            "flex",
            "w-full",
            "flex-col",
            "lg:flex-row",
            "justify-center",
            "lg:justify-center",
            "items-center",
            "space-y-6",
            "lg:space-y-0",
            "lg:space-x-8",
            "mt-5",
          ],
          [1, "text-center"],
          [1, "text-4xl", "font-bold", "text-[#3B4B10]"],
          [1, "text-gray-600"],
          [
            1,
            "flex-1",
            "flex-col",
            "lg:flex-row",
            "lg:justify-between",
            "lg:items-center",
            "w-full",
            "max-w-6xl",
            "mx-auto",
            "px-6",
            "lg:px-8",
            "space-y-8",
            "lg:space-y-0",
          ],
          [
            1,
            "flex",
            "w-full",
            "flex-col",
            "space-y-4",
            "text-center",
            "lg:text-left",
          ],
          [
            1,
            "text-gray-500",
            "text-sm",
            "uppercase",
            "tracking-wide",
            "font-semibold",
          ],
          [1, "text-5xl", "font-normal", "text-gray-900", "leading-tight"],
          [1, "text-gray-600", "text-base", "leading-relaxed"],
          [
            1,
            "bg-[#3B4B10]",
            "mt-6",
            "w-80",
            "h-12",
            "hover:bg-gray-800",
            "shadow-md",
            "py-2",
            "rounded-lg",
            "font-medium",
            "text-lg",
            "text-white",
            3,
            "click",
          ],
        ],
        template: function (r, i) {
          r & 1 &&
            (m(0, "section", 0)(1, "div", 1)(2, "div", 2),
            $(3, "img", 3),
            m(4, "div", 4)(5, "div", 5)(6, "p", 6),
            C(7, "+500"),
            g(),
            m(8, "p", 7),
            C(9, "Pessoas atendidas"),
            g()(),
            m(10, "div", 5)(11, "p", 6),
            C(12, "+300"),
            g(),
            m(13, "p", 7),
            C(14, "Tratamentos iniciados"),
            g()()()(),
            m(15, "div", 8)(16, "div", 9)(17, "h2", 10),
            C(18, " Entenda mais sobre "),
            g(),
            m(19, "h3", 11),
            C(20, " Um produto que eleva sua sa\xFAde e qualidade de vida "),
            g(),
            m(21, "p", 12),
            C(
              22,
              " A medicina natural, bioid\xEAntica e comprovada cientificamente est\xE1 \xE0 sua disposi\xE7\xE3o. Vamos promover sa\xFAde, bem-estar e qualidade de vida a todos que precisam. "
            ),
            g(),
            m(23, "button", 13),
            me("click", function () {
              return i.sendMensage();
            }),
            C(24, " Fale Conosco "),
            g()()()()());
        },
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Fy = (() => {
  class t {
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵcmp = U({
        type: t,
        selectors: [["app-how-to-buy"]],
        standalone: !0,
        features: [Y],
        decls: 26,
        vars: 0,
        consts: [
          ["id", "howtoby", 1, "bg-white", "px-4", "sm:px-8", "py-16"],
          [1, "mx-auto", "max-w-6xl", "text-center"],
          [1, "mb-12", "font-bold", "text-3xl", "text-gray-900"],
          [1, "gap-8", "grid", "grid-cols-1", "md:grid-cols-3"],
          [
            1,
            "relative",
            "bg-white",
            "shadow-md",
            "p-6",
            "border",
            "rounded-lg",
          ],
          [
            1,
            "-top-6",
            "left-1/2",
            "absolute",
            "flex",
            "justify-center",
            "items-center",
            "bg-black",
            "rounded-full",
            "w-12",
            "h-12",
            "font-bold",
            "text-2xl",
            "text-white",
            "transform",
            "-translate-x-1/2",
          ],
          [1, "mt-8", "font-semibold", "text-green-700", "text-lg"],
          [1, "mt-2", "text-gray-600"],
        ],
        template: function (r, i) {
          r & 1 &&
            (m(0, "section", 0)(1, "div", 1)(2, "h2", 2),
            C(3, "Como Comprar?"),
            g(),
            m(4, "div", 3)(5, "div", 4)(6, "div", 5),
            C(7, " 1 "),
            g(),
            m(8, "h3", 6),
            C(9, " Consulta M\xE9dica "),
            g(),
            m(10, "p", 7),
            C(
              11,
              " Ao entrar em contato conosco, voc\xEA ir\xE1 falar com um m\xE9dico para lhe prescrever a receita. "
            ),
            g()(),
            m(12, "div", 4)(13, "div", 5),
            C(14, " 2 "),
            g(),
            m(15, "h3", 6),
            C(16, "Autoriza\xE7\xE3o"),
            g(),
            m(17, "p", 7),
            C(
              18,
              " A autoriza\xE7\xE3o da Anvisa para o uso do produto ser\xE1 feita de forma r\xE1pida e pr\xE1tica pela nossa equipe especializada. "
            ),
            g()(),
            m(19, "div", 4)(20, "div", 5),
            C(21, " 3 "),
            g(),
            m(22, "h3", 6),
            C(23, "Entrega"),
            g(),
            m(24, "p", 7),
            C(
              25,
              " A partir disso, o produto ser\xE1 entregue em sua resid\xEAncia de forma r\xE1pida e segura. "
            ),
            g()()()()());
        },
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Da = class t {
    static isArray(n, e = !0) {
      return Array.isArray(n) && (e || n.length !== 0);
    }
    static isObject(n, e = !0) {
      return (
        typeof n == "object" &&
        !Array.isArray(n) &&
        n != null &&
        (e || Object.keys(n).length !== 0)
      );
    }
    static equals(n, e, r) {
      return r
        ? this.resolveFieldData(n, r) === this.resolveFieldData(e, r)
        : this.equalsByValue(n, e);
    }
    static equalsByValue(n, e) {
      if (n === e) return !0;
      if (n && e && typeof n == "object" && typeof e == "object") {
        var r = Array.isArray(n),
          i = Array.isArray(e),
          o,
          s,
          a;
        if (r && i) {
          if (((s = n.length), s != e.length)) return !1;
          for (o = s; o-- !== 0; )
            if (!this.equalsByValue(n[o], e[o])) return !1;
          return !0;
        }
        if (r != i) return !1;
        var l = this.isDate(n),
          c = this.isDate(e);
        if (l != c) return !1;
        if (l && c) return n.getTime() == e.getTime();
        var u = n instanceof RegExp,
          d = e instanceof RegExp;
        if (u != d) return !1;
        if (u && d) return n.toString() == e.toString();
        var f = Object.keys(n);
        if (((s = f.length), s !== Object.keys(e).length)) return !1;
        for (o = s; o-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(e, f[o])) return !1;
        for (o = s; o-- !== 0; )
          if (((a = f[o]), !this.equalsByValue(n[a], e[a]))) return !1;
        return !0;
      }
      return n !== n && e !== e;
    }
    static resolveFieldData(n, e) {
      if (n && e) {
        if (this.isFunction(e)) return e(n);
        if (e.indexOf(".") == -1) return n[e];
        {
          let r = e.split("."),
            i = n;
          for (let o = 0, s = r.length; o < s; ++o) {
            if (i == null) return null;
            i = i[r[o]];
          }
          return i;
        }
      } else return null;
    }
    static isFunction(n) {
      return !!(n && n.constructor && n.call && n.apply);
    }
    static reorderArray(n, e, r) {
      let i;
      n &&
        e !== r &&
        (r >= n.length && ((r %= n.length), (e %= n.length)),
        n.splice(r, 0, n.splice(e, 1)[0]));
    }
    static insertIntoOrderedArray(n, e, r, i) {
      if (r.length > 0) {
        let o = !1;
        for (let s = 0; s < r.length; s++)
          if (this.findIndexInList(r[s], i) > e) {
            r.splice(s, 0, n), (o = !0);
            break;
          }
        o || r.push(n);
      } else r.push(n);
    }
    static findIndexInList(n, e) {
      let r = -1;
      if (e) {
        for (let i = 0; i < e.length; i++)
          if (e[i] == n) {
            r = i;
            break;
          }
      }
      return r;
    }
    static contains(n, e) {
      if (n != null && e && e.length) {
        for (let r of e) if (this.equals(n, r)) return !0;
      }
      return !1;
    }
    static removeAccents(n) {
      return (
        n &&
          (n = n
            .normalize("NFKD")
            .replace(new RegExp("\\p{Diacritic}", "gu"), "")),
        n
      );
    }
    static isDate(n) {
      return Object.prototype.toString.call(n) === "[object Date]";
    }
    static isEmpty(n) {
      return (
        n == null ||
        n === "" ||
        (Array.isArray(n) && n.length === 0) ||
        (!this.isDate(n) && typeof n == "object" && Object.keys(n).length === 0)
      );
    }
    static isNotEmpty(n) {
      return !this.isEmpty(n);
    }
    static compare(n, e, r, i = 1) {
      let o = -1,
        s = this.isEmpty(n),
        a = this.isEmpty(e);
      return (
        s && a
          ? (o = 0)
          : s
          ? (o = i)
          : a
          ? (o = -i)
          : typeof n == "string" && typeof e == "string"
          ? (o = n.localeCompare(e, r, { numeric: !0 }))
          : (o = n < e ? -1 : n > e ? 1 : 0),
        o
      );
    }
    static sort(n, e, r = 1, i, o = 1) {
      let s = t.compare(n, e, i, r),
        a = r;
      return (t.isEmpty(n) || t.isEmpty(e)) && (a = o === 1 ? r : o), a * s;
    }
    static merge(n, e) {
      if (!(n == null && e == null)) {
        {
          if (
            (n == null || typeof n == "object") &&
            (e == null || typeof e == "object")
          )
            return w(w({}, n || {}), e || {});
          if (
            (n == null || typeof n == "string") &&
            (e == null || typeof e == "string")
          )
            return [n || "", e || ""].join(" ");
        }
        return e || n;
      }
    }
    static isPrintableCharacter(n = "") {
      return this.isNotEmpty(n) && n.length === 1 && n.match(/\S| /);
    }
    static getItemValue(n, ...e) {
      return this.isFunction(n) ? n(...e) : n;
    }
    static findLastIndex(n, e) {
      let r = -1;
      if (this.isNotEmpty(n))
        try {
          r = n.findLastIndex(e);
        } catch {
          r = n.lastIndexOf([...n].reverse().find(e));
        }
      return r;
    }
    static findLast(n, e) {
      let r;
      if (this.isNotEmpty(n))
        try {
          r = n.findLast(e);
        } catch {
          r = [...n].reverse().find(e);
        }
      return r;
    }
    static deepEquals(n, e) {
      if (n === e) return !0;
      if (n && e && typeof n == "object" && typeof e == "object") {
        var r = Array.isArray(n),
          i = Array.isArray(e),
          o,
          s,
          a;
        if (r && i) {
          if (((s = n.length), s != e.length)) return !1;
          for (o = s; o-- !== 0; ) if (!this.deepEquals(n[o], e[o])) return !1;
          return !0;
        }
        if (r != i) return !1;
        var l = n instanceof Date,
          c = e instanceof Date;
        if (l != c) return !1;
        if (l && c) return n.getTime() == e.getTime();
        var u = n instanceof RegExp,
          d = e instanceof RegExp;
        if (u != d) return !1;
        if (u && d) return n.toString() == e.toString();
        var f = Object.keys(n);
        if (((s = f.length), s !== Object.keys(e).length)) return !1;
        for (o = s; o-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(e, f[o])) return !1;
        for (o = s; o-- !== 0; )
          if (((a = f[o]), !this.deepEquals(n[a], e[a]))) return !1;
        return !0;
      }
      return n !== n && e !== e;
    }
  },
  Ly = 0;
function wa(t = "pn_id_") {
  return Ly++, `${t}${Ly}`;
}
function AS() {
  let t = [],
    n = (o, s) => {
      let a = t.length > 0 ? t[t.length - 1] : { key: o, value: s },
        l = a.value + (a.key === o ? 0 : s) + 2;
      return t.push({ key: o, value: l }), l;
    },
    e = (o) => {
      t = t.filter((s) => s.value !== o);
    },
    r = () => (t.length > 0 ? t[t.length - 1].value : 0),
    i = (o) => (o && parseInt(o.style.zIndex, 10)) || 0;
  return {
    get: i,
    set: (o, s, a) => {
      s && (s.style.zIndex = String(n(o, a)));
    },
    clear: (o) => {
      o && (e(i(o)), (o.style.zIndex = ""));
    },
    getCurrent: () => r(),
  };
}
var FF = AS();
var ky = ["*"];
var Pe = (() => {
  class t {
    static STARTS_WITH = "startsWith";
    static CONTAINS = "contains";
    static NOT_CONTAINS = "notContains";
    static ENDS_WITH = "endsWith";
    static EQUALS = "equals";
    static NOT_EQUALS = "notEquals";
    static IN = "in";
    static LESS_THAN = "lt";
    static LESS_THAN_OR_EQUAL_TO = "lte";
    static GREATER_THAN = "gt";
    static GREATER_THAN_OR_EQUAL_TO = "gte";
    static BETWEEN = "between";
    static IS = "is";
    static IS_NOT = "isNot";
    static BEFORE = "before";
    static AFTER = "after";
    static DATE_IS = "dateIs";
    static DATE_IS_NOT = "dateIsNot";
    static DATE_BEFORE = "dateBefore";
    static DATE_AFTER = "dateAfter";
  }
  return t;
})();
var Ca = (() => {
    class t {
      ripple = !1;
      inputStyle = cu("outlined");
      overlayOptions = {};
      csp = cu({ nonce: void 0 });
      filterMatchModeOptions = {
        text: [
          Pe.STARTS_WITH,
          Pe.CONTAINS,
          Pe.NOT_CONTAINS,
          Pe.ENDS_WITH,
          Pe.EQUALS,
          Pe.NOT_EQUALS,
        ],
        numeric: [
          Pe.EQUALS,
          Pe.NOT_EQUALS,
          Pe.LESS_THAN,
          Pe.LESS_THAN_OR_EQUAL_TO,
          Pe.GREATER_THAN,
          Pe.GREATER_THAN_OR_EQUAL_TO,
        ],
        date: [Pe.DATE_IS, Pe.DATE_IS_NOT, Pe.DATE_BEFORE, Pe.DATE_AFTER],
      };
      translation = {
        startsWith: "Starts with",
        contains: "Contains",
        notContains: "Not contains",
        endsWith: "Ends with",
        equals: "Equals",
        notEquals: "Not equals",
        noFilter: "No Filter",
        lt: "Less than",
        lte: "Less than or equal to",
        gt: "Greater than",
        gte: "Greater than or equal to",
        is: "Is",
        isNot: "Is not",
        before: "Before",
        after: "After",
        dateIs: "Date is",
        dateIsNot: "Date is not",
        dateBefore: "Date is before",
        dateAfter: "Date is after",
        clear: "Clear",
        apply: "Apply",
        matchAll: "Match All",
        matchAny: "Match Any",
        addRule: "Add Rule",
        removeRule: "Remove Rule",
        accept: "Yes",
        reject: "No",
        choose: "Choose",
        upload: "Upload",
        cancel: "Cancel",
        pending: "Pending",
        fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        dayNames: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        monthNamesShort: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        chooseYear: "Choose Year",
        chooseMonth: "Choose Month",
        chooseDate: "Choose Date",
        prevDecade: "Previous Decade",
        nextDecade: "Next Decade",
        prevYear: "Previous Year",
        nextYear: "Next Year",
        prevMonth: "Previous Month",
        nextMonth: "Next Month",
        prevHour: "Previous Hour",
        nextHour: "Next Hour",
        prevMinute: "Previous Minute",
        nextMinute: "Next Minute",
        prevSecond: "Previous Second",
        nextSecond: "Next Second",
        am: "am",
        pm: "pm",
        dateFormat: "mm/dd/yy",
        firstDayOfWeek: 0,
        today: "Today",
        weekHeader: "Wk",
        weak: "Weak",
        medium: "Medium",
        strong: "Strong",
        passwordPrompt: "Enter a password",
        emptyMessage: "No results found",
        searchMessage: "{0} results are available",
        selectionMessage: "{0} items selected",
        emptySelectionMessage: "No selected item",
        emptySearchMessage: "No results found",
        emptyFilterMessage: "No results found",
        aria: {
          trueLabel: "True",
          falseLabel: "False",
          nullLabel: "Not Selected",
          star: "1 star",
          stars: "{star} stars",
          selectAll: "All items selected",
          unselectAll: "All items unselected",
          close: "Close",
          previous: "Previous",
          next: "Next",
          navigation: "Navigation",
          scrollTop: "Scroll Top",
          moveTop: "Move Top",
          moveUp: "Move Up",
          moveDown: "Move Down",
          moveBottom: "Move Bottom",
          moveToTarget: "Move to Target",
          moveToSource: "Move to Source",
          moveAllToTarget: "Move All to Target",
          moveAllToSource: "Move All to Source",
          pageLabel: "{page}",
          firstPageLabel: "First Page",
          lastPageLabel: "Last Page",
          nextPageLabel: "Next Page",
          prevPageLabel: "Previous Page",
          rowsPerPageLabel: "Rows per page",
          previousPageLabel: "Previous Page",
          jumpToPageDropdownLabel: "Jump to Page Dropdown",
          jumpToPageInputLabel: "Jump to Page Input",
          selectRow: "Row Selected",
          unselectRow: "Row Unselected",
          expandRow: "Row Expanded",
          collapseRow: "Row Collapsed",
          showFilterMenu: "Show Filter Menu",
          hideFilterMenu: "Hide Filter Menu",
          filterOperator: "Filter Operator",
          filterConstraint: "Filter Constraint",
          editRow: "Row Edit",
          saveEdit: "Save Edit",
          cancelEdit: "Cancel Edit",
          listView: "List View",
          gridView: "Grid View",
          slide: "Slide",
          slideNumber: "{slideNumber}",
          zoomImage: "Zoom Image",
          zoomIn: "Zoom In",
          zoomOut: "Zoom Out",
          rotateRight: "Rotate Right",
          rotateLeft: "Rotate Left",
          listLabel: "Option List",
          selectColor: "Select a color",
          removeLabel: "Remove",
          browseFiles: "Browse Files",
          maximizeLabel: "Maximize",
        },
      };
      zIndex = { modal: 1100, overlay: 1e3, menu: 1e3, tooltip: 1100 };
      translationSource = new Se();
      translationObserver = this.translationSource.asObservable();
      getTranslation(e) {
        return this.translation[e];
      }
      setTranslation(e) {
        (this.translation = w(w({}, this.translation), e)),
          this.translationSource.next(this.translation);
      }
      static ɵfac = function (r) {
        return new (r || t)();
      };
      static ɵprov = S({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
    return t;
  })(),
  ba = (() => {
    class t {
      static ɵfac = function (r) {
        return new (r || t)();
      };
      static ɵcmp = U({
        type: t,
        selectors: [["p-header"]],
        standalone: !0,
        features: [Y],
        ngContentSelectors: ky,
        decls: 1,
        vars: 0,
        template: function (r, i) {
          r & 1 && (jt(), ft(0));
        },
        encapsulation: 2,
      });
    }
    return t;
  })(),
  jy = (() => {
    class t {
      static ɵfac = function (r) {
        return new (r || t)();
      };
      static ɵcmp = U({
        type: t,
        selectors: [["p-footer"]],
        standalone: !0,
        features: [Y],
        ngContentSelectors: ky,
        decls: 1,
        vars: 0,
        template: function (r, i) {
          r & 1 && (jt(), ft(0));
        },
        encapsulation: 2,
      });
    }
    return t;
  })(),
  zt = (() => {
    class t {
      template;
      type;
      name;
      constructor(e) {
        this.template = e;
      }
      getType() {
        return this.name;
      }
      static ɵfac = function (r) {
        return new (r || t)(H(en));
      };
      static ɵdir = dt({
        type: t,
        selectors: [["", "pTemplate", ""]],
        inputs: { type: "type", name: [le.None, "pTemplate", "name"] },
        standalone: !0,
      });
    }
    return t;
  })(),
  eo = (() => {
    class t {
      static ɵfac = function (r) {
        return new (r || t)();
      };
      static ɵmod = Ye({ type: t });
      static ɵinj = Qe({});
    }
    return t;
  })();
var xS = ["*"],
  xn = (() => {
    class t {
      label;
      spin = !1;
      styleClass;
      role;
      ariaLabel;
      ariaHidden;
      ngOnInit() {
        this.getAttributes();
      }
      getAttributes() {
        let e = Da.isEmpty(this.label);
        (this.role = e ? void 0 : "img"),
          (this.ariaLabel = e ? void 0 : this.label),
          (this.ariaHidden = e);
      }
      getClassNames() {
        return `p-icon ${this.styleClass ? this.styleClass + " " : ""}${
          this.spin ? "p-icon-spin" : ""
        }`;
      }
      static ɵfac = function (r) {
        return new (r || t)();
      };
      static ɵcmp = U({
        type: t,
        selectors: [["ng-component"]],
        hostAttrs: [1, "p-element", "p-icon-wrapper"],
        inputs: {
          label: "label",
          spin: [le.HasDecoratorInputTransform, "spin", "spin", et],
          styleClass: "styleClass",
        },
        standalone: !0,
        features: [ln, Y],
        ngContentSelectors: xS,
        decls: 1,
        vars: 0,
        template: function (r, i) {
          r & 1 && (jt(), ft(0));
        },
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return t;
  })();
var Xr = (() => {
  class t extends xn {
    static ɵfac = (() => {
      let e;
      return function (i) {
        return (e || (e = bt(t)))(i || t);
      };
    })();
    static ɵcmp = U({
      type: t,
      selectors: [["ChevronDownIcon"]],
      standalone: !0,
      features: [an, Y],
      decls: 2,
      vars: 5,
      consts: [
        [
          "width",
          "14",
          "height",
          "14",
          "viewBox",
          "0 0 14 14",
          "fill",
          "none",
          "xmlns",
          "http://www.w3.org/2000/svg",
        ],
        [
          "d",
          "M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z",
          "fill",
          "currentColor",
        ],
      ],
      template: function (r, i) {
        r & 1 && (bn(), m(0, "svg", 0), $(1, "path", 1), g()),
          r & 2 &&
            (Me(i.getClassNames()),
            ne("aria-label", i.ariaLabel)("aria-hidden", i.ariaHidden)(
              "role",
              i.role
            ));
      },
      encapsulation: 2,
    });
  }
  return t;
})();
var Ed = (() => {
  class t extends xn {
    static ɵfac = (() => {
      let e;
      return function (i) {
        return (e || (e = bt(t)))(i || t);
      };
    })();
    static ɵcmp = U({
      type: t,
      selectors: [["ChevronLeftIcon"]],
      standalone: !0,
      features: [an, Y],
      decls: 2,
      vars: 5,
      consts: [
        [
          "width",
          "14",
          "height",
          "14",
          "viewBox",
          "0 0 14 14",
          "fill",
          "none",
          "xmlns",
          "http://www.w3.org/2000/svg",
        ],
        [
          "d",
          "M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z",
          "fill",
          "currentColor",
        ],
      ],
      template: function (r, i) {
        r & 1 && (bn(), m(0, "svg", 0), $(1, "path", 1), g()),
          r & 2 &&
            (Me(i.getClassNames()),
            ne("aria-label", i.ariaLabel)("aria-hidden", i.ariaHidden)(
              "role",
              i.role
            ));
      },
      encapsulation: 2,
    });
  }
  return t;
})();
var Jr = (() => {
  class t extends xn {
    static ɵfac = (() => {
      let e;
      return function (i) {
        return (e || (e = bt(t)))(i || t);
      };
    })();
    static ɵcmp = U({
      type: t,
      selectors: [["ChevronRightIcon"]],
      standalone: !0,
      features: [an, Y],
      decls: 2,
      vars: 5,
      consts: [
        [
          "width",
          "14",
          "height",
          "14",
          "viewBox",
          "0 0 14 14",
          "fill",
          "none",
          "xmlns",
          "http://www.w3.org/2000/svg",
        ],
        [
          "d",
          "M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z",
          "fill",
          "currentColor",
        ],
      ],
      template: function (r, i) {
        r & 1 && (bn(), m(0, "svg", 0), $(1, "path", 1), g()),
          r & 2 &&
            (Me(i.getClassNames()),
            ne("aria-label", i.ariaLabel)("aria-hidden", i.ariaHidden)(
              "role",
              i.role
            ));
      },
      encapsulation: 2,
    });
  }
  return t;
})();
var Dd = (() => {
  class t extends xn {
    static ɵfac = (() => {
      let e;
      return function (i) {
        return (e || (e = bt(t)))(i || t);
      };
    })();
    static ɵcmp = U({
      type: t,
      selectors: [["ChevronUpIcon"]],
      standalone: !0,
      features: [an, Y],
      decls: 2,
      vars: 5,
      consts: [
        [
          "width",
          "14",
          "height",
          "14",
          "viewBox",
          "0 0 14 14",
          "fill",
          "none",
          "xmlns",
          "http://www.w3.org/2000/svg",
        ],
        [
          "d",
          "M12.2097 10.4113C12.1057 10.4118 12.0027 10.3915 11.9067 10.3516C11.8107 10.3118 11.7237 10.2532 11.6506 10.1792L6.93602 5.46461L2.22139 10.1476C2.07272 10.244 1.89599 10.2877 1.71953 10.2717C1.54307 10.2556 1.3771 10.1808 1.24822 10.0593C1.11933 9.93766 1.035 9.77633 1.00874 9.6011C0.982477 9.42587 1.0158 9.2469 1.10338 9.09287L6.37701 3.81923C6.52533 3.6711 6.72639 3.58789 6.93602 3.58789C7.14565 3.58789 7.3467 3.6711 7.49502 3.81923L12.7687 9.09287C12.9168 9.24119 13 9.44225 13 9.65187C13 9.8615 12.9168 10.0626 12.7687 10.2109C12.616 10.3487 12.4151 10.4207 12.2097 10.4113Z",
          "fill",
          "currentColor",
        ],
      ],
      template: function (r, i) {
        r & 1 && (bn(), m(0, "svg", 0), $(1, "path", 1), g()),
          r & 2 &&
            (Me(i.getClassNames()),
            ne("aria-label", i.ariaLabel)("aria-hidden", i.ariaHidden)(
              "role",
              i.role
            ));
      },
      encapsulation: 2,
    });
  }
  return t;
})();
var X = (() => {
  class t {
    static zindex = 1e3;
    static calculatedScrollbarWidth = null;
    static calculatedScrollbarHeight = null;
    static browser;
    static addClass(e, r) {
      e && r && (e.classList ? e.classList.add(r) : (e.className += " " + r));
    }
    static addMultipleClasses(e, r) {
      if (e && r)
        if (e.classList) {
          let i = r.trim().split(" ");
          for (let o = 0; o < i.length; o++) e.classList.add(i[o]);
        } else {
          let i = r.split(" ");
          for (let o = 0; o < i.length; o++) e.className += " " + i[o];
        }
    }
    static removeClass(e, r) {
      e &&
        r &&
        (e.classList
          ? e.classList.remove(r)
          : (e.className = e.className.replace(
              new RegExp("(^|\\b)" + r.split(" ").join("|") + "(\\b|$)", "gi"),
              " "
            )));
    }
    static removeMultipleClasses(e, r) {
      e &&
        r &&
        [r]
          .flat()
          .filter(Boolean)
          .forEach((i) => i.split(" ").forEach((o) => this.removeClass(e, o)));
    }
    static hasClass(e, r) {
      return e && r
        ? e.classList
          ? e.classList.contains(r)
          : new RegExp("(^| )" + r + "( |$)", "gi").test(e.className)
        : !1;
    }
    static siblings(e) {
      return Array.prototype.filter.call(e.parentNode.children, function (r) {
        return r !== e;
      });
    }
    static find(e, r) {
      return Array.from(e.querySelectorAll(r));
    }
    static findSingle(e, r) {
      return this.isElement(e) ? e.querySelector(r) : null;
    }
    static index(e) {
      let r = e.parentNode.childNodes,
        i = 0;
      for (var o = 0; o < r.length; o++) {
        if (r[o] == e) return i;
        r[o].nodeType == 1 && i++;
      }
      return -1;
    }
    static indexWithinGroup(e, r) {
      let i = e.parentNode ? e.parentNode.childNodes : [],
        o = 0;
      for (var s = 0; s < i.length; s++) {
        if (i[s] == e) return o;
        i[s].attributes && i[s].attributes[r] && i[s].nodeType == 1 && o++;
      }
      return -1;
    }
    static appendOverlay(e, r, i = "self") {
      i !== "self" && e && r && this.appendChild(e, r);
    }
    static alignOverlay(e, r, i = "self", o = !0) {
      e &&
        r &&
        (o && (e.style.minWidth = `${t.getOuterWidth(r)}px`),
        i === "self"
          ? this.relativePosition(e, r)
          : this.absolutePosition(e, r));
    }
    static relativePosition(e, r, i = !0) {
      let o = (z) => {
          if (z)
            return getComputedStyle(z).getPropertyValue("position") ===
              "relative"
              ? z
              : o(z.parentElement);
        },
        s = e.offsetParent
          ? { width: e.offsetWidth, height: e.offsetHeight }
          : this.getHiddenElementDimensions(e),
        a = r.offsetHeight ?? r.getBoundingClientRect().height,
        l = r.getBoundingClientRect(),
        c = this.getWindowScrollTop(),
        u = this.getWindowScrollLeft(),
        d = this.getViewport(),
        h = o(e)?.getBoundingClientRect() || { top: -1 * c, left: -1 * u },
        p,
        y;
      l.top + a + s.height > d.height
        ? ((p = l.top - h.top - s.height),
          (e.style.transformOrigin = "bottom"),
          l.top + p < 0 && (p = -1 * l.top))
        : ((p = a + l.top - h.top), (e.style.transformOrigin = "top"));
      let T = l.left + s.width - d.width,
        M = l.left - h.left;
      s.width > d.width
        ? (y = (l.left - h.left) * -1)
        : T > 0
        ? (y = M - T)
        : (y = l.left - h.left),
        (e.style.top = p + "px"),
        (e.style.left = y + "px"),
        i &&
          (e.style.marginTop =
            origin === "bottom"
              ? "calc(var(--p-anchor-gutter) * -1)"
              : "calc(var(--p-anchor-gutter))");
    }
    static absolutePosition(e, r, i = !0) {
      let o = e.offsetParent
          ? { width: e.offsetWidth, height: e.offsetHeight }
          : this.getHiddenElementDimensions(e),
        s = o.height,
        a = o.width,
        l = r.offsetHeight ?? r.getBoundingClientRect().height,
        c = r.offsetWidth ?? r.getBoundingClientRect().width,
        u = r.getBoundingClientRect(),
        d = this.getWindowScrollTop(),
        f = this.getWindowScrollLeft(),
        h = this.getViewport(),
        p,
        y;
      u.top + l + s > h.height
        ? ((p = u.top + d - s),
          (e.style.transformOrigin = "bottom"),
          p < 0 && (p = d))
        : ((p = l + u.top + d), (e.style.transformOrigin = "top")),
        u.left + a > h.width
          ? (y = Math.max(0, u.left + f + c - a))
          : (y = u.left + f),
        (e.style.top = p + "px"),
        (e.style.left = y + "px"),
        i &&
          (e.style.marginTop =
            origin === "bottom"
              ? "calc(var(--p-anchor-gutter) * -1)"
              : "calc(var(--p-anchor-gutter))");
    }
    static getParents(e, r = []) {
      return e.parentNode === null
        ? r
        : this.getParents(e.parentNode, r.concat([e.parentNode]));
    }
    static getScrollableParents(e) {
      let r = [];
      if (e) {
        let i = this.getParents(e),
          o = /(auto|scroll)/,
          s = (a) => {
            let l = window.getComputedStyle(a, null);
            return (
              o.test(l.getPropertyValue("overflow")) ||
              o.test(l.getPropertyValue("overflowX")) ||
              o.test(l.getPropertyValue("overflowY"))
            );
          };
        for (let a of i) {
          let l = a.nodeType === 1 && a.dataset.scrollselectors;
          if (l) {
            let c = l.split(",");
            for (let u of c) {
              let d = this.findSingle(a, u);
              d && s(d) && r.push(d);
            }
          }
          a.nodeType !== 9 && s(a) && r.push(a);
        }
      }
      return r;
    }
    static getHiddenElementOuterHeight(e) {
      (e.style.visibility = "hidden"), (e.style.display = "block");
      let r = e.offsetHeight;
      return (e.style.display = "none"), (e.style.visibility = "visible"), r;
    }
    static getHiddenElementOuterWidth(e) {
      (e.style.visibility = "hidden"), (e.style.display = "block");
      let r = e.offsetWidth;
      return (e.style.display = "none"), (e.style.visibility = "visible"), r;
    }
    static getHiddenElementDimensions(e) {
      let r = {};
      return (
        (e.style.visibility = "hidden"),
        (e.style.display = "block"),
        (r.width = e.offsetWidth),
        (r.height = e.offsetHeight),
        (e.style.display = "none"),
        (e.style.visibility = "visible"),
        r
      );
    }
    static scrollInView(e, r) {
      let i = getComputedStyle(e).getPropertyValue("borderTopWidth"),
        o = i ? parseFloat(i) : 0,
        s = getComputedStyle(e).getPropertyValue("paddingTop"),
        a = s ? parseFloat(s) : 0,
        l = e.getBoundingClientRect(),
        u =
          r.getBoundingClientRect().top +
          document.body.scrollTop -
          (l.top + document.body.scrollTop) -
          o -
          a,
        d = e.scrollTop,
        f = e.clientHeight,
        h = this.getOuterHeight(r);
      u < 0
        ? (e.scrollTop = d + u)
        : u + h > f && (e.scrollTop = d + u - f + h);
    }
    static fadeIn(e, r) {
      e.style.opacity = 0;
      let i = +new Date(),
        o = 0,
        s = function () {
          (o =
            +e.style.opacity.replace(",", ".") +
            (new Date().getTime() - i) / r),
            (e.style.opacity = o),
            (i = +new Date()),
            +o < 1 &&
              ((window.requestAnimationFrame && requestAnimationFrame(s)) ||
                setTimeout(s, 16));
        };
      s();
    }
    static fadeOut(e, r) {
      var i = 1,
        o = 50,
        s = r,
        a = o / s;
      let l = setInterval(() => {
        (i = i - a),
          i <= 0 && ((i = 0), clearInterval(l)),
          (e.style.opacity = i);
      }, o);
    }
    static getWindowScrollTop() {
      let e = document.documentElement;
      return (window.pageYOffset || e.scrollTop) - (e.clientTop || 0);
    }
    static getWindowScrollLeft() {
      let e = document.documentElement;
      return (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0);
    }
    static matches(e, r) {
      var i = Element.prototype,
        o =
          i.matches ||
          i.webkitMatchesSelector ||
          i.mozMatchesSelector ||
          i.msMatchesSelector ||
          function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
          };
      return o.call(e, r);
    }
    static getOuterWidth(e, r) {
      let i = e.offsetWidth;
      if (r) {
        let o = getComputedStyle(e);
        i += parseFloat(o.marginLeft) + parseFloat(o.marginRight);
      }
      return i;
    }
    static getHorizontalPadding(e) {
      let r = getComputedStyle(e);
      return parseFloat(r.paddingLeft) + parseFloat(r.paddingRight);
    }
    static getHorizontalMargin(e) {
      let r = getComputedStyle(e);
      return parseFloat(r.marginLeft) + parseFloat(r.marginRight);
    }
    static innerWidth(e) {
      let r = e.offsetWidth,
        i = getComputedStyle(e);
      return (r += parseFloat(i.paddingLeft) + parseFloat(i.paddingRight)), r;
    }
    static width(e) {
      let r = e.offsetWidth,
        i = getComputedStyle(e);
      return (r -= parseFloat(i.paddingLeft) + parseFloat(i.paddingRight)), r;
    }
    static getInnerHeight(e) {
      let r = e.offsetHeight,
        i = getComputedStyle(e);
      return (r += parseFloat(i.paddingTop) + parseFloat(i.paddingBottom)), r;
    }
    static getOuterHeight(e, r) {
      let i = e.offsetHeight;
      if (r) {
        let o = getComputedStyle(e);
        i += parseFloat(o.marginTop) + parseFloat(o.marginBottom);
      }
      return i;
    }
    static getHeight(e) {
      let r = e.offsetHeight,
        i = getComputedStyle(e);
      return (
        (r -=
          parseFloat(i.paddingTop) +
          parseFloat(i.paddingBottom) +
          parseFloat(i.borderTopWidth) +
          parseFloat(i.borderBottomWidth)),
        r
      );
    }
    static getWidth(e) {
      let r = e.offsetWidth,
        i = getComputedStyle(e);
      return (
        (r -=
          parseFloat(i.paddingLeft) +
          parseFloat(i.paddingRight) +
          parseFloat(i.borderLeftWidth) +
          parseFloat(i.borderRightWidth)),
        r
      );
    }
    static getViewport() {
      let e = window,
        r = document,
        i = r.documentElement,
        o = r.getElementsByTagName("body")[0],
        s = e.innerWidth || i.clientWidth || o.clientWidth,
        a = e.innerHeight || i.clientHeight || o.clientHeight;
      return { width: s, height: a };
    }
    static getOffset(e) {
      var r = e.getBoundingClientRect();
      return {
        top:
          r.top +
          (window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0),
        left:
          r.left +
          (window.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft ||
            0),
      };
    }
    static replaceElementWith(e, r) {
      let i = e.parentNode;
      if (!i) throw "Can't replace element";
      return i.replaceChild(r, e);
    }
    static getUserAgent() {
      if (navigator && this.isClient()) return navigator.userAgent;
    }
    static isIE() {
      var e = window.navigator.userAgent,
        r = e.indexOf("MSIE ");
      if (r > 0) return !0;
      var i = e.indexOf("Trident/");
      if (i > 0) {
        var o = e.indexOf("rv:");
        return !0;
      }
      var s = e.indexOf("Edge/");
      return s > 0;
    }
    static isIOS() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    static isAndroid() {
      return /(android)/i.test(navigator.userAgent);
    }
    static isTouchDevice() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    static appendChild(e, r) {
      if (this.isElement(r)) r.appendChild(e);
      else if (r && r.el && r.el.nativeElement)
        r.el.nativeElement.appendChild(e);
      else throw "Cannot append " + r + " to " + e;
    }
    static removeChild(e, r) {
      if (this.isElement(r)) r.removeChild(e);
      else if (r.el && r.el.nativeElement) r.el.nativeElement.removeChild(e);
      else throw "Cannot remove " + e + " from " + r;
    }
    static removeElement(e) {
      "remove" in Element.prototype ? e.remove() : e.parentNode.removeChild(e);
    }
    static isElement(e) {
      return typeof HTMLElement == "object"
        ? e instanceof HTMLElement
        : e &&
            typeof e == "object" &&
            e !== null &&
            e.nodeType === 1 &&
            typeof e.nodeName == "string";
    }
    static calculateScrollbarWidth(e) {
      if (e) {
        let r = getComputedStyle(e);
        return (
          e.offsetWidth -
          e.clientWidth -
          parseFloat(r.borderLeftWidth) -
          parseFloat(r.borderRightWidth)
        );
      } else {
        if (this.calculatedScrollbarWidth !== null)
          return this.calculatedScrollbarWidth;
        let r = document.createElement("div");
        (r.className = "p-scrollbar-measure"), document.body.appendChild(r);
        let i = r.offsetWidth - r.clientWidth;
        return (
          document.body.removeChild(r), (this.calculatedScrollbarWidth = i), i
        );
      }
    }
    static calculateScrollbarHeight() {
      if (this.calculatedScrollbarHeight !== null)
        return this.calculatedScrollbarHeight;
      let e = document.createElement("div");
      (e.className = "p-scrollbar-measure"), document.body.appendChild(e);
      let r = e.offsetHeight - e.clientHeight;
      return (
        document.body.removeChild(e), (this.calculatedScrollbarWidth = r), r
      );
    }
    static invokeElementMethod(e, r, i) {
      e[r].apply(e, i);
    }
    static clearSelection() {
      if (window.getSelection)
        window.getSelection().empty
          ? window.getSelection().empty()
          : window.getSelection().removeAllRanges &&
            window.getSelection().rangeCount > 0 &&
            window.getSelection().getRangeAt(0).getClientRects().length > 0 &&
            window.getSelection().removeAllRanges();
      else if (document.selection && document.selection.empty)
        try {
          document.selection.empty();
        } catch {}
    }
    static getBrowser() {
      if (!this.browser) {
        let e = this.resolveUserAgent();
        (this.browser = {}),
          e.browser &&
            ((this.browser[e.browser] = !0),
            (this.browser.version = e.version)),
          this.browser.chrome
            ? (this.browser.webkit = !0)
            : this.browser.webkit && (this.browser.safari = !0);
      }
      return this.browser;
    }
    static resolveUserAgent() {
      let e = navigator.userAgent.toLowerCase(),
        r =
          /(chrome)[ \/]([\w.]+)/.exec(e) ||
          /(webkit)[ \/]([\w.]+)/.exec(e) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) ||
          /(msie) ([\w.]+)/.exec(e) ||
          (e.indexOf("compatible") < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)) ||
          [];
      return { browser: r[1] || "", version: r[2] || "0" };
    }
    static isInteger(e) {
      return Number.isInteger
        ? Number.isInteger(e)
        : typeof e == "number" && isFinite(e) && Math.floor(e) === e;
    }
    static isHidden(e) {
      return !e || e.offsetParent === null;
    }
    static isVisible(e) {
      return e && e.offsetParent != null;
    }
    static isExist(e) {
      return e !== null && typeof e < "u" && e.nodeName && e.parentNode;
    }
    static focus(e, r) {
      e && document.activeElement !== e && e.focus(r);
    }
    static getFocusableSelectorString(e = "") {
      return `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        .p-inputtext:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        .p-button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`;
    }
    static getFocusableElements(e, r = "") {
      let i = this.find(e, this.getFocusableSelectorString(r)),
        o = [];
      for (let s of i) {
        let a = getComputedStyle(s);
        this.isVisible(s) &&
          a.display != "none" &&
          a.visibility != "hidden" &&
          o.push(s);
      }
      return o;
    }
    static getFocusableElement(e, r = "") {
      let i = this.findSingle(e, this.getFocusableSelectorString(r));
      if (i) {
        let o = getComputedStyle(i);
        if (
          this.isVisible(i) &&
          o.display != "none" &&
          o.visibility != "hidden"
        )
          return i;
      }
      return null;
    }
    static getFirstFocusableElement(e, r = "") {
      let i = this.getFocusableElements(e, r);
      return i.length > 0 ? i[0] : null;
    }
    static getLastFocusableElement(e, r) {
      let i = this.getFocusableElements(e, r);
      return i.length > 0 ? i[i.length - 1] : null;
    }
    static getNextFocusableElement(e, r = !1) {
      let i = t.getFocusableElements(e),
        o = 0;
      if (i && i.length > 0) {
        let s = i.indexOf(i[0].ownerDocument.activeElement);
        r
          ? s == -1 || s === 0
            ? (o = i.length - 1)
            : (o = s - 1)
          : s != -1 && s !== i.length - 1 && (o = s + 1);
      }
      return i[o];
    }
    static generateZIndex() {
      return (this.zindex = this.zindex || 999), ++this.zindex;
    }
    static getSelection() {
      return window.getSelection
        ? window.getSelection().toString()
        : document.getSelection
        ? document.getSelection().toString()
        : document.selection
        ? document.selection.createRange().text
        : null;
    }
    static getTargetElement(e, r) {
      if (!e) return null;
      switch (e) {
        case "document":
          return document;
        case "window":
          return window;
        case "@next":
          return r?.nextElementSibling;
        case "@prev":
          return r?.previousElementSibling;
        case "@parent":
          return r?.parentElement;
        case "@grandparent":
          return r?.parentElement.parentElement;
        default:
          let i = typeof e;
          if (i === "string") return document.querySelector(e);
          if (i === "object" && e.hasOwnProperty("nativeElement"))
            return this.isExist(e.nativeElement) ? e.nativeElement : void 0;
          let s = ((a) => !!(a && a.constructor && a.call && a.apply))(e)
            ? e()
            : e;
          return (s && s.nodeType === 9) || this.isExist(s) ? s : null;
      }
    }
    static isClient() {
      return !!(
        typeof window < "u" &&
        window.document &&
        window.document.createElement
      );
    }
    static getAttribute(e, r) {
      if (e) {
        let i = e.getAttribute(r);
        return isNaN(i)
          ? i === "true" || i === "false"
            ? i === "true"
            : i
          : +i;
      }
    }
    static calculateBodyScrollbarWidth() {
      return window.innerWidth - document.documentElement.offsetWidth;
    }
    static blockBodyScroll(e = "p-overflow-hidden") {
      document.body.style.setProperty(
        "--scrollbar-width",
        this.calculateBodyScrollbarWidth() + "px"
      ),
        this.addClass(document.body, e);
    }
    static unblockBodyScroll(e = "p-overflow-hidden") {
      document.body.style.removeProperty("--scrollbar-width"),
        this.removeClass(document.body, e);
    }
    static createElement(e, r = {}, ...i) {
      if (e) {
        let o = document.createElement(e);
        return this.setAttributes(o, r), o.append(...i), o;
      }
    }
    static setAttribute(e, r = "", i) {
      this.isElement(e) && i !== null && i !== void 0 && e.setAttribute(r, i);
    }
    static setAttributes(e, r = {}) {
      if (this.isElement(e)) {
        let i = (o, s) => {
          let a = e?.$attrs?.[o] ? [e?.$attrs?.[o]] : [];
          return [s].flat().reduce((l, c) => {
            if (c != null) {
              let u = typeof c;
              if (u === "string" || u === "number") l.push(c);
              else if (u === "object") {
                let d = Array.isArray(c)
                  ? i(o, c)
                  : Object.entries(c).map(([f, h]) =>
                      o === "style" && (h || h === 0)
                        ? `${f
                            .replace(/([a-z])([A-Z])/g, "$1-$2")
                            .toLowerCase()}:${h}`
                        : h
                        ? f
                        : void 0
                    );
                l = d.length ? l.concat(d.filter((f) => !!f)) : l;
              }
            }
            return l;
          }, a);
        };
        Object.entries(r).forEach(([o, s]) => {
          if (s != null) {
            let a = o.match(/^on(.+)/);
            a
              ? e.addEventListener(a[1].toLowerCase(), s)
              : o === "pBind"
              ? this.setAttributes(e, s)
              : ((s =
                  o === "class"
                    ? [...new Set(i("class", s))].join(" ").trim()
                    : o === "style"
                    ? i("style", s).join(";").trim()
                    : s),
                (e.$attrs = e.$attrs || {}) && (e.$attrs[o] = s),
                e.setAttribute(o, s));
          }
        });
      }
    }
    static isFocusableElement(e, r = "") {
      return this.isElement(e)
        ? e.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${r},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${r},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${r},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${r},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${r},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${r},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${r}`)
        : !1;
    }
  }
  return t;
})();
var Vy = (() => {
    class t {
      document;
      platformId;
      renderer;
      el;
      zone;
      config;
      constructor(e, r, i, o, s, a) {
        (this.document = e),
          (this.platformId = r),
          (this.renderer = i),
          (this.el = o),
          (this.zone = s),
          (this.config = a);
      }
      animationListener;
      mouseDownListener;
      timeout;
      ngAfterViewInit() {
        Sn(this.platformId) &&
          this.config &&
          this.config.ripple &&
          this.zone.runOutsideAngular(() => {
            this.create(),
              (this.mouseDownListener = this.renderer.listen(
                this.el.nativeElement,
                "mousedown",
                this.onMouseDown.bind(this)
              ));
          });
      }
      onMouseDown(e) {
        let r = this.getInk();
        if (
          !r ||
          this.document.defaultView?.getComputedStyle(r, null).display ===
            "none"
        )
          return;
        if (
          (X.removeClass(r, "p-ink-active"), !X.getHeight(r) && !X.getWidth(r))
        ) {
          let a = Math.max(
            X.getOuterWidth(this.el.nativeElement),
            X.getOuterHeight(this.el.nativeElement)
          );
          (r.style.height = a + "px"), (r.style.width = a + "px");
        }
        let i = X.getOffset(this.el.nativeElement),
          o =
            e.pageX - i.left + this.document.body.scrollTop - X.getWidth(r) / 2,
          s =
            e.pageY -
            i.top +
            this.document.body.scrollLeft -
            X.getHeight(r) / 2;
        this.renderer.setStyle(r, "top", s + "px"),
          this.renderer.setStyle(r, "left", o + "px"),
          X.addClass(r, "p-ink-active"),
          (this.timeout = setTimeout(() => {
            let a = this.getInk();
            a && X.removeClass(a, "p-ink-active");
          }, 401));
      }
      getInk() {
        let e = this.el.nativeElement.children;
        for (let r = 0; r < e.length; r++)
          if (
            typeof e[r].className == "string" &&
            e[r].className.indexOf("p-ink") !== -1
          )
            return e[r];
        return null;
      }
      resetInk() {
        let e = this.getInk();
        e && X.removeClass(e, "p-ink-active");
      }
      onAnimationEnd(e) {
        this.timeout && clearTimeout(this.timeout),
          X.removeClass(e.currentTarget, "p-ink-active");
      }
      create() {
        let e = this.renderer.createElement("span");
        this.renderer.addClass(e, "p-ink"),
          this.renderer.appendChild(this.el.nativeElement, e),
          this.renderer.setAttribute(e, "aria-hidden", "true"),
          this.renderer.setAttribute(e, "role", "presentation"),
          this.animationListener ||
            (this.animationListener = this.renderer.listen(
              e,
              "animationend",
              this.onAnimationEnd.bind(this)
            ));
      }
      remove() {
        let e = this.getInk();
        e &&
          (this.mouseDownListener && this.mouseDownListener(),
          this.animationListener && this.animationListener(),
          (this.mouseDownListener = null),
          (this.animationListener = null),
          X.removeElement(e));
      }
      ngOnDestroy() {
        this.config && this.config.ripple && this.remove();
      }
      static ɵfac = function (r) {
        return new (r || t)(H(De), H(Be), H(on), H(Re), H(oe), H(Ca, 8));
      };
      static ɵdir = dt({
        type: t,
        selectors: [["", "pRipple", ""]],
        hostAttrs: [1, "p-ripple", "p-element"],
        standalone: !0,
      });
    }
    return t;
  })(),
  By = (() => {
    class t {
      static ɵfac = function (r) {
        return new (r || t)();
      };
      static ɵmod = Ye({ type: t });
      static ɵinj = Qe({});
    }
    return t;
  })();
var RS = ["itemsContainer"],
  OS = ["indicatorContent"],
  PS = [[["p-header"]], [["p-footer"]]],
  FS = ["p-header", "p-footer"],
  LS = (t, n) => ({
    "p-carousel p-component": !0,
    "p-carousel-vertical": t,
    "p-carousel-horizontal": n,
  }),
  kS = (t) => ({ height: t }),
  jS = (t) => ({ "p-carousel-prev p-link": !0, "p-disabled": t }),
  Uy = (t, n, e) => ({
    "p-carousel-item p-carousel-item-cloned": !0,
    "p-carousel-item-active": t,
    "p-carousel-item-start": n,
    "p-carousel-item-end": e,
  }),
  wd = (t) => ({ $implicit: t }),
  VS = (t, n, e) => ({
    "p-carousel-item": !0,
    "p-carousel-item-active": t,
    "p-carousel-item-start": n,
    "p-carousel-item-end": e,
  }),
  BS = (t) => ({ "p-carousel-next p-link": !0, "p-disabled": t }),
  US = (t) => ({ "p-carousel-indicator": !0, "p-highlight": t });
function $S(t, n) {
  t & 1 && kt(0);
}
function HS(t, n) {
  if (
    (t & 1 && (m(0, "div", 12), ft(1), O(2, $S, 1, 0, "ng-container", 13), g()),
    t & 2)
  ) {
    let e = re();
    b(2), D("ngTemplateOutlet", e.headerTemplate);
  }
}
function zS(t, n) {
  t & 1 && $(0, "ChevronLeftIcon", 18),
    t & 2 && D("styleClass", "carousel-prev-icon");
}
function WS(t, n) {
  t & 1 && $(0, "ChevronUpIcon", 18),
    t & 2 && D("styleClass", "carousel-prev-icon");
}
function qS(t, n) {
  if (
    (t & 1 &&
      (Ft(0),
      O(1, zS, 1, 1, "ChevronLeftIcon", 17)(2, WS, 1, 1, "ChevronUpIcon", 17),
      Lt()),
    t & 2)
  ) {
    let e = re(2);
    b(), D("ngIf", !e.isVertical()), b(), D("ngIf", e.isVertical());
  }
}
function GS(t, n) {}
function KS(t, n) {
  t & 1 && O(0, GS, 0, 0, "ng-template");
}
function QS(t, n) {
  if ((t & 1 && (m(0, "span", 19), O(1, KS, 1, 0, null, 13), g()), t & 2)) {
    let e = re(2);
    b(), D("ngTemplateOutlet", e.previousIconTemplate);
  }
}
function YS(t, n) {
  if (t & 1) {
    let e = Vr();
    m(0, "button", 14),
      me("click", function (i) {
        nn(e);
        let o = re();
        return rn(o.navBackward(i));
      }),
      O(1, qS, 3, 2, "ng-container", 15)(2, QS, 2, 1, "span", 16),
      g();
  }
  if (t & 2) {
    let e = re();
    D("ngClass", Ue(5, jS, e.isBackwardNavDisabled()))(
      "disabled",
      e.isBackwardNavDisabled()
    ),
      ne("aria-label", e.ariaPrevButtonLabel()),
      b(),
      D("ngIf", !e.previousIconTemplate),
      b(),
      D("ngIf", e.previousIconTemplate);
  }
}
function ZS(t, n) {
  t & 1 && kt(0);
}
function XS(t, n) {
  if (
    (t & 1 && (m(0, "div", 4), O(1, ZS, 1, 0, "ng-container", 20), g()), t & 2)
  ) {
    let e = n.$implicit,
      r = n.index,
      i = re();
    D(
      "ngClass",
      zs(
        6,
        Uy,
        i.totalShiftedItems * -1 === i.value.length,
        r === 0,
        i.clonedItemsForStarting.length - 1 === r
      )
    ),
      ne("aria-hidden", i.totalShiftedItems * -1 !== i.value.length)(
        "aria-label",
        i.ariaSlideNumber(r)
      )("aria-roledescription", i.ariaSlideLabel()),
      b(),
      D("ngTemplateOutlet", i.itemTemplate)(
        "ngTemplateOutletContext",
        Ue(10, wd, e)
      );
  }
}
function JS(t, n) {
  t & 1 && kt(0);
}
function eT(t, n) {
  if (
    (t & 1 && (m(0, "div", 4), O(1, JS, 1, 0, "ng-container", 20), g()), t & 2)
  ) {
    let e = n.$implicit,
      r = n.index,
      i = re();
    D(
      "ngClass",
      zs(
        6,
        VS,
        i.firstIndex() <= r && i.lastIndex() >= r,
        i.firstIndex() === r,
        i.lastIndex() === r
      )
    ),
      ne("aria-hidden", i.totalShiftedItems * -1 !== i.value.length)(
        "aria-label",
        i.ariaSlideNumber(r)
      )("aria-roledescription", i.ariaSlideLabel()),
      b(),
      D("ngTemplateOutlet", i.itemTemplate)(
        "ngTemplateOutletContext",
        Ue(10, wd, e)
      );
  }
}
function tT(t, n) {
  t & 1 && kt(0);
}
function nT(t, n) {
  if (
    (t & 1 && (m(0, "div", 4), O(1, tT, 1, 0, "ng-container", 20), g()), t & 2)
  ) {
    let e = n.$implicit,
      r = n.index,
      i = re();
    D(
      "ngClass",
      zs(
        3,
        Uy,
        i.totalShiftedItems * -1 === i.numVisible,
        r === 0,
        i.clonedItemsForFinishing.length - 1 === r
      )
    ),
      b(),
      D("ngTemplateOutlet", i.itemTemplate)(
        "ngTemplateOutletContext",
        Ue(7, wd, e)
      );
  }
}
function rT(t, n) {
  t & 1 && $(0, "ChevronRightIcon", 18),
    t & 2 && D("styleClass", "carousel-prev-icon");
}
function iT(t, n) {
  t & 1 && $(0, "ChevronDownIcon", 18),
    t & 2 && D("styleClass", "carousel-prev-icon");
}
function oT(t, n) {
  if (
    (t & 1 &&
      (Ft(0),
      O(1, rT, 1, 1, "ChevronRightIcon", 17)(
        2,
        iT,
        1,
        1,
        "ChevronDownIcon",
        17
      ),
      Lt()),
    t & 2)
  ) {
    let e = re(2);
    b(), D("ngIf", !e.isVertical()), b(), D("ngIf", e.isVertical());
  }
}
function sT(t, n) {}
function aT(t, n) {
  t & 1 && O(0, sT, 0, 0, "ng-template");
}
function lT(t, n) {
  if ((t & 1 && (m(0, "span", 19), O(1, aT, 1, 0, null, 13), g()), t & 2)) {
    let e = re(2);
    b(), D("ngTemplateOutlet", e.nextIconTemplate);
  }
}
function cT(t, n) {
  if (t & 1) {
    let e = Vr();
    m(0, "button", 14),
      me("click", function (i) {
        nn(e);
        let o = re();
        return rn(o.navForward(i));
      }),
      O(1, oT, 3, 2, "ng-container", 15)(2, lT, 2, 1, "span", 16),
      g();
  }
  if (t & 2) {
    let e = re();
    D("ngClass", Ue(5, BS, e.isForwardNavDisabled()))(
      "disabled",
      e.isForwardNavDisabled()
    ),
      ne("aria-label", e.ariaNextButtonLabel()),
      b(),
      D("ngIf", !e.nextIconTemplate),
      b(),
      D("ngIf", e.nextIconTemplate);
  }
}
function uT(t, n) {
  if (t & 1) {
    let e = Vr();
    m(0, "li", 4)(1, "button", 22),
      me("click", function (i) {
        let o = nn(e).index,
          s = re(2);
        return rn(s.onDotClick(i, o));
      }),
      g()();
  }
  if (t & 2) {
    let e = n.index,
      r = re(2);
    D("ngClass", Ue(9, US, r._page === e)),
      ne("data-pc-section", "indicator"),
      b(),
      Me(r.indicatorStyleClass),
      D("ngClass", "p-link")("ngStyle", r.indicatorStyle)(
        "tabindex",
        r._page === e ? 0 : -1
      ),
      ne("aria-label", r.ariaPageLabel(e + 1))(
        "aria-current",
        r._page === e ? "page" : void 0
      );
  }
}
function dT(t, n) {
  if (t & 1) {
    let e = Vr();
    m(0, "ul", 21, 1),
      me("keydown", function (i) {
        nn(e);
        let o = re();
        return rn(o.onIndicatorKeydown(i));
      }),
      O(2, uT, 2, 11, "li", 9),
      g();
  }
  if (t & 2) {
    let e = re();
    Me(e.indicatorsContentClass),
      D("ngClass", "p-carousel-indicators p-reset")(
        "ngStyle",
        e.indicatorsContentStyle
      ),
      b(2),
      D("ngForOf", e.totalDotsArray());
  }
}
function fT(t, n) {
  t & 1 && kt(0);
}
function hT(t, n) {
  if (
    (t & 1 &&
      (m(0, "div", 23), ft(1, 1), O(2, fT, 1, 0, "ng-container", 13), g()),
    t & 2)
  ) {
    let e = re();
    b(2), D("ngTemplateOutlet", e.footerTemplate);
  }
}
var $y = (() => {
    class t {
      el;
      zone;
      cd;
      renderer;
      document;
      platformId;
      config;
      updateSlideAccessibility(e, r) {
        e.querySelectorAll(
          "a, button, input, select, textarea, [tabindex]"
        ).forEach((o) => {
          o.tabIndex = r ? 0 : -1;
        });
      }
      updateCarouselItemsAccessibility() {
        this.el.nativeElement
          .querySelectorAll(".p-carousel-item")
          .forEach((r, i) => {
            let o = i === this._page;
            r.setAttribute("aria-hidden", o ? "false" : "true"),
              this.updateSlideAccessibility(r, o);
          });
      }
      get page() {
        return this._page;
      }
      set page(e) {
        this.isCreated &&
          e !== this._page &&
          (this.autoplayInterval && this.stopAutoplay(),
          e > this._page && e <= this.totalDots() - 1
            ? this.step(-1, e)
            : e < this._page && this.step(1, e)),
          (this._page = e);
      }
      get numVisible() {
        return this._numVisible;
      }
      set numVisible(e) {
        this._numVisible = e;
      }
      get numScroll() {
        return this._numVisible;
      }
      set numScroll(e) {
        this._numScroll = e;
      }
      responsiveOptions;
      orientation = "horizontal";
      verticalViewPortHeight = "300px";
      contentClass = "";
      indicatorsContentClass = "";
      indicatorsContentStyle;
      indicatorStyleClass = "";
      indicatorStyle;
      get value() {
        return this._value;
      }
      set value(e) {
        this._value = e;
      }
      circular = !1;
      showIndicators = !0;
      showNavigators = !0;
      autoplayInterval = 0;
      style;
      styleClass;
      onPage = new Ee();
      itemsContainer;
      indicatorContent;
      headerFacet;
      footerFacet;
      templates;
      _numVisible = 1;
      _numScroll = 1;
      _oldNumScroll = 0;
      prevState = { numScroll: 0, numVisible: 0, value: [] };
      defaultNumScroll = 1;
      defaultNumVisible = 1;
      _page = 0;
      _value;
      carouselStyle;
      id;
      totalShiftedItems;
      isRemainingItemsAdded = !1;
      animationTimeout;
      translateTimeout;
      remainingItems = 0;
      _items;
      startPos;
      documentResizeListener;
      clonedItemsForStarting;
      clonedItemsForFinishing;
      allowAutoplay;
      interval;
      isCreated;
      swipeThreshold = 20;
      itemTemplate;
      headerTemplate;
      footerTemplate;
      previousIconTemplate;
      nextIconTemplate;
      window;
      constructor(e, r, i, o, s, a, l) {
        (this.el = e),
          (this.zone = r),
          (this.cd = i),
          (this.renderer = o),
          (this.document = s),
          (this.platformId = a),
          (this.config = l),
          (this.totalShiftedItems = this.page * this.numScroll * -1),
          (this.window = this.document.defaultView);
      }
      ngOnChanges(e) {
        Sn(this.platformId) &&
          (e.value && this.circular && this._value && this.setCloneItems(),
          this.isCreated &&
            (e.numVisible &&
              (this.responsiveOptions &&
                (this.defaultNumVisible = this.numVisible),
              this.isCircular() && this.setCloneItems(),
              this.createStyle(),
              this.calculatePosition()),
            e.numScroll &&
              this.responsiveOptions &&
              (this.defaultNumScroll = this.numScroll))),
          this.cd.markForCheck();
      }
      ngAfterContentInit() {
        (this.id = wa()),
          Sn(this.platformId) &&
            ((this.allowAutoplay = !!this.autoplayInterval),
            this.circular && this.setCloneItems(),
            this.responsiveOptions &&
              ((this.defaultNumScroll = this._numScroll),
              (this.defaultNumVisible = this._numVisible)),
            this.createStyle(),
            this.calculatePosition(),
            this.responsiveOptions && this.bindDocumentListeners()),
          this.templates?.forEach((e) => {
            switch (e.getType()) {
              case "item":
                this.itemTemplate = e.template;
                break;
              case "header":
                this.headerTemplate = e.template;
                break;
              case "footer":
                this.footerTemplate = e.template;
                break;
              case "previousicon":
                this.previousIconTemplate = e.template;
                break;
              case "nexticon":
                this.nextIconTemplate = e.template;
                break;
              default:
                this.itemTemplate = e.template;
                break;
            }
          }),
          this.cd.detectChanges();
      }
      ngAfterContentChecked() {
        if (Sn(this.platformId)) {
          let e = this.isCircular(),
            r = this.totalShiftedItems;
          if (
            this.value &&
            this.itemsContainer &&
            (this.prevState.numScroll !== this._numScroll ||
              this.prevState.numVisible !== this._numVisible ||
              this.prevState.value.length !== this.value.length)
          ) {
            this.autoplayInterval && this.stopAutoplay(!1),
              (this.remainingItems =
                (this.value.length - this._numVisible) % this._numScroll);
            let i = this._page;
            this.totalDots() !== 0 &&
              i >= this.totalDots() &&
              ((i = this.totalDots() - 1),
              (this._page = i),
              this.onPage.emit({ page: this.page })),
              (r = i * this._numScroll * -1),
              e && (r -= this._numVisible),
              i === this.totalDots() - 1 && this.remainingItems > 0
                ? ((r += -1 * this.remainingItems + this._numScroll),
                  (this.isRemainingItemsAdded = !0))
                : (this.isRemainingItemsAdded = !1),
              r !== this.totalShiftedItems && (this.totalShiftedItems = r),
              (this._oldNumScroll = this._numScroll),
              (this.prevState.numScroll = this._numScroll),
              (this.prevState.numVisible = this._numVisible),
              (this.prevState.value = [...this._value]),
              this.totalDots() > 0 &&
                this.itemsContainer.nativeElement &&
                (this.itemsContainer.nativeElement.style.transform =
                  this.isVertical()
                    ? `translate3d(0, ${r * (100 / this._numVisible)}%, 0)`
                    : `translate3d(${r * (100 / this._numVisible)}%, 0, 0)`),
              (this.isCreated = !0),
              this.autoplayInterval &&
                this.isAutoplay() &&
                this.startAutoplay();
          }
          e &&
            (this.page === 0
              ? (r = -1 * this._numVisible)
              : r === 0 &&
                ((r = -1 * this.value.length),
                this.remainingItems > 0 && (this.isRemainingItemsAdded = !0)),
            r !== this.totalShiftedItems && (this.totalShiftedItems = r));
        }
      }
      createStyle() {
        this.carouselStyle ||
          ((this.carouselStyle = this.renderer.createElement("style")),
          (this.carouselStyle.type = "text/css"),
          X.setAttribute(
            this.carouselStyle,
            "nonce",
            this.config?.csp()?.nonce
          ),
          this.renderer.appendChild(this.document.head, this.carouselStyle));
        let e = `
            #${this.id} .p-carousel-item {
				flex: 1 0 ${100 / this.numVisible}%
			}
        `;
        if (this.responsiveOptions) {
          this.responsiveOptions.sort((r, i) => {
            let o = r.breakpoint,
              s = i.breakpoint,
              a = null;
            return (
              o == null && s != null
                ? (a = -1)
                : o != null && s == null
                ? (a = 1)
                : o == null && s == null
                ? (a = 0)
                : typeof o == "string" && typeof s == "string"
                ? (a = o.localeCompare(s, void 0, { numeric: !0 }))
                : (a = o < s ? -1 : o > s ? 1 : 0),
              -1 * a
            );
          });
          for (let r = 0; r < this.responsiveOptions.length; r++) {
            let i = this.responsiveOptions[r];
            e += `
                    @media screen and (max-width: ${i.breakpoint}) {
                        #${this.id} .p-carousel-item {
                            flex: 1 0 ${100 / i.numVisible}%
                        }
                    }
                `;
          }
        }
        this.carouselStyle.innerHTML = e;
      }
      calculatePosition() {
        if (this.responsiveOptions) {
          let e = {
            numVisible: this.defaultNumVisible,
            numScroll: this.defaultNumScroll,
          };
          if (typeof window < "u") {
            let r = window.innerWidth;
            for (let i = 0; i < this.responsiveOptions.length; i++) {
              let o = this.responsiveOptions[i];
              parseInt(o.breakpoint, 10) >= r && (e = o);
            }
          }
          if (this._numScroll !== e.numScroll) {
            let r = this._page;
            r = Math.floor((r * this._numScroll) / e.numScroll);
            let i = e.numScroll * this.page * -1;
            this.isCircular() && (i -= e.numVisible),
              (this.totalShiftedItems = i),
              (this._numScroll = e.numScroll),
              (this._page = r),
              this.onPage.emit({ page: this.page });
          }
          this._numVisible !== e.numVisible &&
            ((this._numVisible = e.numVisible), this.setCloneItems()),
            this.cd.markForCheck();
        }
      }
      setCloneItems() {
        (this.clonedItemsForStarting = []),
          (this.clonedItemsForFinishing = []),
          this.isCircular() &&
            (this.clonedItemsForStarting.push(
              ...this.value.slice(-1 * this._numVisible)
            ),
            this.clonedItemsForFinishing.push(
              ...this.value.slice(0, this._numVisible)
            ));
      }
      firstIndex() {
        return this.isCircular()
          ? -1 * (this.totalShiftedItems + this.numVisible)
          : this.totalShiftedItems * -1;
      }
      lastIndex() {
        return this.firstIndex() + this.numVisible - 1;
      }
      totalDots() {
        return this.value?.length
          ? Math.ceil(
              (this.value.length - this._numVisible) / this._numScroll
            ) + 1
          : 0;
      }
      totalDotsArray() {
        let e = this.totalDots();
        return e <= 0 ? [] : Array(e).fill(0);
      }
      isVertical() {
        return this.orientation === "vertical";
      }
      isCircular() {
        return (
          this.circular && this.value && this.value.length >= this.numVisible
        );
      }
      isAutoplay() {
        return this.autoplayInterval && this.allowAutoplay;
      }
      isForwardNavDisabled() {
        return (
          this.isEmpty() ||
          (this._page >= this.totalDots() - 1 && !this.isCircular())
        );
      }
      isBackwardNavDisabled() {
        return this.isEmpty() || (this._page <= 0 && !this.isCircular());
      }
      isEmpty() {
        return !this.value || this.value.length === 0;
      }
      navForward(e, r) {
        (this.isCircular() || this._page < this.totalDots() - 1) &&
          this.step(-1, r),
          this.autoplayInterval && this.stopAutoplay(),
          e && e.cancelable && e.preventDefault();
      }
      navBackward(e, r) {
        (this.isCircular() || this._page !== 0) && this.step(1, r),
          this.autoplayInterval && this.stopAutoplay(),
          e && e.cancelable && e.preventDefault();
      }
      onDotClick(e, r) {
        let i = this._page;
        this.autoplayInterval && this.stopAutoplay(),
          r > i ? this.navForward(e, r) : r < i && this.navBackward(e, r);
      }
      onIndicatorKeydown(e) {
        switch (e.code) {
          case "ArrowRight":
            this.onRightKey();
            break;
          case "ArrowLeft":
            this.onLeftKey();
            break;
        }
      }
      onRightKey() {
        let e = [
            ...X.find(
              this.indicatorContent.nativeElement,
              '[data-pc-section="indicator"]'
            ),
          ],
          r = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(
          r,
          r + 1 === e.length ? e.length - 1 : r + 1
        );
      }
      onLeftKey() {
        let e = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(e, e - 1 <= 0 ? 0 : e - 1);
      }
      onHomeKey() {
        let e = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(e, 0);
      }
      onEndKey() {
        let e = [
            ...X.find(
              this.indicatorContent.nativeElement,
              '[data-pc-section="indicator"]r'
            ),
          ],
          r = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(r, e.length - 1);
      }
      onTabKey() {
        let e = [
            ...X.find(
              this.indicatorContent.nativeElement,
              '[data-pc-section="indicator"]'
            ),
          ],
          r = e.findIndex((s) => X.getAttribute(s, "data-p-highlight") === !0),
          i = X.findSingle(
            this.indicatorContent.nativeElement,
            '[data-pc-section="indicator"] > button[tabindex="0"]'
          ),
          o = e.findIndex((s) => s === i.parentElement);
        (e[o].children[0].tabIndex = "-1"), (e[r].children[0].tabIndex = "0");
      }
      findFocusedIndicatorIndex() {
        let e = [
            ...X.find(
              this.indicatorContent.nativeElement,
              '[data-pc-section="indicator"]'
            ),
          ],
          r = X.findSingle(
            this.indicatorContent.nativeElement,
            '[data-pc-section="indicator"] > button[tabindex="0"]'
          );
        return e.findIndex((i) => i === r.parentElement);
      }
      changedFocusedIndicator(e, r) {
        let i = [
          ...X.find(
            this.indicatorContent.nativeElement,
            '[data-pc-section="indicator"]'
          ),
        ];
        (i[e].children[0].tabIndex = "-1"),
          (i[r].children[0].tabIndex = "0"),
          i[r].children[0].focus();
      }
      step(e, r) {
        let i = this.totalShiftedItems,
          o = this.isCircular();
        if (r != null)
          (i = this._numScroll * r * -1),
            o && (i -= this._numVisible),
            (this.isRemainingItemsAdded = !1);
        else {
          (i += this._numScroll * e),
            this.isRemainingItemsAdded &&
              ((i += this.remainingItems - this._numScroll * e),
              (this.isRemainingItemsAdded = !1));
          let s = o ? i + this._numVisible : i;
          r = Math.abs(Math.floor(s / this._numScroll));
        }
        o && this.page === this.totalDots() - 1 && e === -1
          ? ((i = -1 * (this.value.length + this._numVisible)), (r = 0))
          : o && this.page === 0 && e === 1
          ? ((i = 0), (r = this.totalDots() - 1))
          : r === this.totalDots() - 1 &&
            this.remainingItems > 0 &&
            ((i += this.remainingItems * -1 - this._numScroll * e),
            (this.isRemainingItemsAdded = !0)),
          this.itemsContainer &&
            ((this.itemsContainer.nativeElement.style.transform =
              this.isVertical()
                ? `translate3d(0, ${i * (100 / this._numVisible)}%, 0)`
                : `translate3d(${i * (100 / this._numVisible)}%, 0, 0)`),
            (this.itemsContainer.nativeElement.style.transition =
              "transform 500ms ease 0s")),
          (this.totalShiftedItems = i),
          (this._page = r),
          this.onPage.emit({ page: this.page }),
          this.cd.markForCheck(),
          this.updateCarouselItemsAccessibility();
      }
      startAutoplay() {
        (this.interval = setInterval(() => {
          this.totalDots() > 0 &&
            (this.page === this.totalDots() - 1
              ? this.step(-1, 0)
              : this.step(-1, this.page + 1));
        }, this.autoplayInterval)),
          (this.allowAutoplay = !0),
          this.cd.markForCheck();
      }
      stopAutoplay(e = !0) {
        this.interval &&
          (clearInterval(this.interval),
          (this.interval = void 0),
          e && (this.allowAutoplay = !1)),
          this.cd.markForCheck();
      }
      isPlaying() {
        return !!this.interval;
      }
      onTransitionEnd() {
        this.itemsContainer &&
          ((this.itemsContainer.nativeElement.style.transition = ""),
          (this.page === 0 || this.page === this.totalDots() - 1) &&
            this.isCircular() &&
            (this.itemsContainer.nativeElement.style.transform =
              this.isVertical()
                ? `translate3d(0, ${
                    this.totalShiftedItems * (100 / this._numVisible)
                  }%, 0)`
                : `translate3d(${
                    this.totalShiftedItems * (100 / this._numVisible)
                  }%, 0, 0)`));
      }
      onTouchStart(e) {
        let r = e.changedTouches[0];
        this.startPos = { x: r.pageX, y: r.pageY };
      }
      onTouchMove(e) {
        e.cancelable && e.preventDefault();
      }
      onTouchEnd(e) {
        let r = e.changedTouches[0];
        this.isVertical()
          ? this.changePageOnTouch(e, r.pageY - this.startPos.y)
          : this.changePageOnTouch(e, r.pageX - this.startPos.x);
      }
      changePageOnTouch(e, r) {
        Math.abs(r) > this.swipeThreshold &&
          (r < 0 ? this.navForward(e) : this.navBackward(e));
      }
      ariaPrevButtonLabel() {
        return this.config.translation.aria
          ? this.config.translation.aria.prevPageLabel
          : void 0;
      }
      ariaSlideLabel() {
        return this.config.translation.aria
          ? this.config.translation.aria.slide
          : void 0;
      }
      ariaNextButtonLabel() {
        return this.config.translation.aria
          ? this.config.translation.aria.nextPageLabel
          : void 0;
      }
      ariaSlideNumber(e) {
        return this.config.translation.aria
          ? this.config.translation.aria.slideNumber.replace(
              /{slideNumber}/g,
              e
            )
          : void 0;
      }
      ariaPageLabel(e) {
        return this.config.translation.aria
          ? this.config.translation.aria.pageLabel.replace(/{page}/g, e)
          : void 0;
      }
      bindDocumentListeners() {
        Sn(this.platformId) &&
          (this.documentResizeListener ||
            (this.documentResizeListener = this.renderer.listen(
              this.window,
              "resize",
              (e) => {
                this.calculatePosition();
              }
            )));
      }
      unbindDocumentListeners() {
        Sn(this.platformId) &&
          this.documentResizeListener &&
          (this.documentResizeListener(), (this.documentResizeListener = null));
      }
      ngOnDestroy() {
        this.responsiveOptions && this.unbindDocumentListeners(),
          this.autoplayInterval && this.stopAutoplay();
      }
      static ɵfac = function (r) {
        return new (r || t)(H(Re), H(oe), H(Vt), H(on), H(De), H(Be), H(Ca));
      };
      static ɵcmp = U({
        type: t,
        selectors: [["p-carousel"]],
        contentQueries: function (r, i, o) {
          if ((r & 1 && (cn(o, ba, 5), cn(o, jy, 5), cn(o, zt, 4)), r & 2)) {
            let s;
            It((s = _t())) && (i.headerFacet = s.first),
              It((s = _t())) && (i.footerFacet = s.first),
              It((s = _t())) && (i.templates = s);
          }
        },
        viewQuery: function (r, i) {
          if ((r & 1 && (fu(RS, 5), fu(OS, 5)), r & 2)) {
            let o;
            It((o = _t())) && (i.itemsContainer = o.first),
              It((o = _t())) && (i.indicatorContent = o.first);
          }
        },
        hostAttrs: [1, "p-element"],
        inputs: {
          page: "page",
          numVisible: "numVisible",
          numScroll: "numScroll",
          responsiveOptions: "responsiveOptions",
          orientation: "orientation",
          verticalViewPortHeight: "verticalViewPortHeight",
          contentClass: "contentClass",
          indicatorsContentClass: "indicatorsContentClass",
          indicatorsContentStyle: "indicatorsContentStyle",
          indicatorStyleClass: "indicatorStyleClass",
          indicatorStyle: "indicatorStyle",
          value: "value",
          circular: [le.HasDecoratorInputTransform, "circular", "circular", et],
          showIndicators: [
            le.HasDecoratorInputTransform,
            "showIndicators",
            "showIndicators",
            et,
          ],
          showNavigators: [
            le.HasDecoratorInputTransform,
            "showNavigators",
            "showNavigators",
            et,
          ],
          autoplayInterval: [
            le.HasDecoratorInputTransform,
            "autoplayInterval",
            "autoplayInterval",
            Ai,
          ],
          style: "style",
          styleClass: "styleClass",
        },
        outputs: { onPage: "onPage" },
        features: [ln, Kn],
        ngContentSelectors: FS,
        decls: 14,
        vars: 23,
        consts: [
          ["itemsContainer", ""],
          ["indicatorContent", ""],
          ["role", "region", 3, "ngClass", "ngStyle"],
          ["class", "p-carousel-header", 4, "ngIf"],
          [3, "ngClass"],
          [1, "p-carousel-container"],
          [
            "type",
            "button",
            "pRipple",
            "",
            3,
            "ngClass",
            "disabled",
            "click",
            4,
            "ngIf",
          ],
          [
            1,
            "p-carousel-items-content",
            3,
            "touchend",
            "touchstart",
            "touchmove",
            "ngStyle",
          ],
          [1, "p-carousel-items-container", 3, "transitionend"],
          [3, "ngClass", 4, "ngFor", "ngForOf"],
          [3, "ngClass", "class", "ngStyle", "keydown", 4, "ngIf"],
          ["class", "p-carousel-footer", 4, "ngIf"],
          [1, "p-carousel-header"],
          [4, "ngTemplateOutlet"],
          ["type", "button", "pRipple", "", 3, "click", "ngClass", "disabled"],
          [4, "ngIf"],
          ["class", "p-carousel-prev-icon", 4, "ngIf"],
          [3, "styleClass", 4, "ngIf"],
          [3, "styleClass"],
          [1, "p-carousel-prev-icon"],
          [4, "ngTemplateOutlet", "ngTemplateOutletContext"],
          [3, "keydown", "ngClass", "ngStyle"],
          ["type", "button", 3, "click", "ngClass", "ngStyle", "tabindex"],
          [1, "p-carousel-footer"],
        ],
        template: function (r, i) {
          if (r & 1) {
            let o = Vr();
            jt(PS),
              m(0, "div", 2),
              O(1, HS, 3, 1, "div", 3),
              m(2, "div", 4)(3, "div", 5),
              O(4, YS, 3, 7, "button", 6),
              m(5, "div", 7),
              me("touchend", function (a) {
                return nn(o), rn(i.onTouchEnd(a));
              })("touchstart", function (a) {
                return nn(o), rn(i.onTouchStart(a));
              })("touchmove", function (a) {
                return nn(o), rn(i.onTouchMove(a));
              }),
              m(6, "div", 8, 0),
              me("transitionend", function () {
                return nn(o), rn(i.onTransitionEnd());
              }),
              O(8, XS, 2, 12, "div", 9)(9, eT, 2, 12, "div", 9)(
                10,
                nT,
                2,
                9,
                "div",
                9
              ),
              g()(),
              O(11, cT, 3, 7, "button", 6),
              g(),
              O(12, dT, 3, 5, "ul", 10),
              g(),
              O(13, hT, 3, 1, "div", 11),
              g();
          }
          r & 2 &&
            (Me(i.styleClass),
            D("ngClass", cg(18, LS, i.isVertical(), !i.isVertical()))(
              "ngStyle",
              i.style
            ),
            ne("id", i.id),
            b(),
            D("ngIf", i.headerFacet || i.headerTemplate),
            b(),
            Me(i.contentClass),
            D("ngClass", "p-carousel-content"),
            b(),
            ne("aria-live", i.allowAutoplay ? "polite" : "off"),
            b(),
            D("ngIf", i.showNavigators),
            b(),
            D(
              "ngStyle",
              Ue(21, kS, i.isVertical() ? i.verticalViewPortHeight : "auto")
            ),
            b(3),
            D("ngForOf", i.clonedItemsForStarting),
            b(),
            D("ngForOf", i.value),
            b(),
            D("ngForOf", i.clonedItemsForFinishing),
            b(),
            D("ngIf", i.showNavigators),
            b(),
            D("ngIf", i.showIndicators),
            b(),
            D("ngIf", i.footerFacet || i.footerTemplate));
        },
        dependencies: () => [Ni, Ag, Qs, Ys, Ri, Vy, Jr, Ed, Xr, Dd],
        styles: [
          `@layer primeng{.p-carousel{display:flex;flex-direction:column}.p-carousel-content{display:flex;flex-direction:column;overflow:auto}.p-carousel-prev,.p-carousel-next{align-self:center;flex-grow:0;flex-shrink:0;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-carousel-container{display:flex;flex-direction:row}.p-carousel-items-content{overflow:hidden;width:100%}.p-carousel-items-container{display:flex;flex-direction:row}.p-carousel-indicators{display:flex;flex-direction:row;justify-content:center;flex-wrap:wrap}.p-carousel-indicator>button{display:flex;align-items:center;justify-content:center}.p-carousel-vertical .p-carousel-container{flex-direction:column}.p-carousel-vertical .p-carousel-items-container{flex-direction:column;height:100%}.p-items-hidden .p-carousel-item{visibility:hidden}.p-items-hidden .p-carousel-item.p-carousel-item-active{visibility:visible}}
`,
        ],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return t;
  })(),
  Hy = (() => {
    class t {
      static ɵfac = function (r) {
        return new (r || t)();
      };
      static ɵmod = Ye({ type: t });
      static ɵinj = Qe({ imports: [Bt, eo, By, Jr, Ed, Xr, Dd, Bt, eo] });
    }
    return t;
  })();
function mT(t, n) {
  if (
    (t & 1 &&
      (m(0, "div", 7)(1, "div", 8),
      $(2, "img", 9),
      g(),
      m(3, "div", 10),
      C(4),
      g(),
      m(5, "div", 11),
      C(6),
      g()()),
    t & 2)
  ) {
    let e = n.$implicit;
    b(2),
      D("src", e.image, sm)("alt", e.name),
      b(2),
      Br(" ", e.message, " "),
      b(2),
      Br(" ", e.name, " ");
  }
}
var zy = (() => {
  class t {
    constructor() {
      (this.responsiveOptions = [
        { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
        { breakpoint: "768px", numVisible: 2, numScroll: 1 },
        { breakpoint: "560px", numVisible: 1, numScroll: 1 },
      ]),
        (this.feedbacks = [
          {
            name: "Camila R. Bellucci",
            message:
              '"A press\xE3o da faculdade me levou a desenvolver uma ansiedade dif\xEDcil de controlar, era como se eu n\xE3o pudesse relaxar. Depois que comecei a usar o \xF3leo da CBD Vital Med, consegui me sentir mais tranquila e focada. Minhas noites de sono tamb\xE9m melhoraram muito. \xC9 incr\xEDvel como algo t\xE3o simples pode fazer tanta diferen\xE7a."',
            image: "assets/media/ampola.png",
          },
          {
            name: "Rafaela M. Schneider",
            message:
              '"Perder minha m\xE3e foi o momento mais doloroso da minha vida, e isso me levou a uma tristeza constante. Eu n\xE3o tinha energia para nada, nem mesmo para cuidar de mim. O \xF3leo da CBD Vital Med foi essencial para virar essa p\xE1gina. Ele me ajudou a retomar o equil\xEDbrio emocional e trouxe de volta a disposi\xE7\xE3o para seguir em frente."',
            image: "assets/media/ampola.png",
          },
          {
            name: "Giovanna T. Goulart",
            message:
              '"Minha ins\xF4nia estava ligada ao meu estilo de vida sedent\xE1rio. Era dif\xEDcil dormir e ainda mais complicado acordar com energia. Desde que comecei a usar o \xF3leo da CBD Vital Med, senti mudan\xE7as em v\xE1rias \xE1reas. Meu sono melhorou muito e, com mais disposi\xE7\xE3o, consegui voltar a me exercitar. Foi um ciclo positivo que come\xE7ou com o \xF3leo."',
            image: "assets/media/ampola.png",
          },
          {
            name: "Renato L. Kowalski",
            message:
              '"Trabalhei por anos em atividades pesadas e, como resultado, desenvolvi uma h\xE9rnia de disco. As dores me acompanhavam o tempo todo, afetando at\xE9 tarefas simples como caminhar. Com o \xF3leo da CBD Vital Med, finalmente encontrei o al\xEDvio que precisava. Ele me devolveu a liberdade de fazer o que gosto, sem o sofrimento constante."',
            image: "assets/media/ampola.png",
          },
          {
            name: "Antonio C. Oliveira ",
            message:
              '"Desde pequeno, enfrento crises epil\xE9pticas que limitaram minha vida de muitas formas. Foram d\xE9cadas lidando com isso, at\xE9 que, aos 40 anos, comecei a usar o \xF3leo da CBD Vital Med. As crises diminu\xEDram tanto que hoje posso levar uma vida muito mais tranquila e sem aquele medo constante. \xC9 um al\xEDvio que eu n\xE3o sabia que era poss\xEDvel."',
            image: "assets/media/ampola.png",
          },
        ]);
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵcmp = U({
        type: t,
        selectors: [["app-feedbacks"]],
        standalone: !0,
        features: [Y],
        decls: 9,
        vars: 5,
        consts: [
          ["id", "feedbacks", 1, "bg-white", "py-12", "w-full", "flex", "px-8"],
          [
            1,
            "flex",
            "flex-col",
            "gap-8",
            "lg:flex-row",
            "lg:items-center",
            "w-full",
            "max-w-6xl",
            "mx-auto",
            "px-6",
            "lg:px-8",
            "space-y-8",
            "lg:space-y-0",
          ],
          [1, "text-left", "mb-8", "w-[30rem]"],
          [1, "text-3xl", "font-bold", "text-gray-800"],
          [1, "text-lg", "text-gray-600"],
          [
            "styleClass",
            "w-full h-full flex max-w-[750px]",
            3,
            "value",
            "numVisible",
            "numScroll",
            "circular",
            "responsiveOptions",
          ],
          ["pTemplate", "item"],
          [
            1,
            "flex",
            "flex-col",
            "h-9/10",
            "gap-2",
            "rounded-[2rem]",
            "grow",
            "border-1",
            "surface-border",
            "m-2",
            "p-8",
            "bg-[#3B4B1026]",
            "feedback-card",
            "relative",
          ],
          [1, ""],
          [
            1,
            "w-16",
            "h-16",
            "rounded-full",
            "border-2",
            "border-white",
            3,
            "src",
            "alt",
          ],
          [1, "text-left", "mt-8", "mb-3"],
          [1, "mt-4", "font-medium"],
        ],
        template: function (r, i) {
          r & 1 &&
            (m(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3),
            C(4, "O QUE FALAM DE N\xD3S?"),
            g(),
            m(5, "p", 4),
            C(
              6,
              " Conhe\xE7a mais do nosso \xF3leo de CBD por meio de feedbacks de pessoas que confiam em nosso produto. "
            ),
            g()(),
            m(7, "p-carousel", 5),
            O(8, mT, 7, 4, "ng-template", 6),
            g()()()),
            r & 2 &&
              (b(7),
              D("value", i.feedbacks)("numVisible", 2)("numScroll", 1)(
                "circular",
                !0
              )("responsiveOptions", i.responsiveOptions));
        },
        dependencies: [Hy, $y, zt, Bt],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Wy = (() => {
  class t {
    constructor() {}
    sendMensage() {
      new Ht().sendMensage();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵcmp = U({
        type: t,
        selectors: [["app-infos"]],
        standalone: !0,
        features: [Y],
        decls: 14,
        vars: 0,
        consts: [
          ["id", "infos", 1, "flex", "flex-col", "w-full"],
          [
            1,
            "flex",
            "flex-col",
            "gap-4",
            "bg-[#3B4B10]",
            "px-4",
            "sm:px-8",
            "py-16",
            "w-full",
            "text-white",
          ],
          [1, "text-[2rem]"],
          [1, "flex", "w-1/2"],
          [
            1,
            "bg-white",
            "text-black",
            "rounded-lg",
            "max-w-80",
            "px-1",
            "py-2",
            3,
            "click",
          ],
          [
            1,
            "flex",
            "flex-col",
            "gap-4",
            "bg-white",
            "px-4",
            "sm:px-8",
            "py-16",
          ],
        ],
        template: function (r, i) {
          r & 1 &&
            (m(0, "section", 0)(1, "div", 1)(2, "p", 2),
            C(3, "Fale conosco!"),
            g(),
            m(4, "p", 3),
            C(
              5,
              " A medicina natural, bioid\xEAntica e comprovada cientificamente est\xE1 \xE0 sua disposi\xE7\xE3o. Vamos promover sa\xFAde, bem-estar e qualidade de vida a todos que precisam. "
            ),
            g(),
            m(6, "button", 4),
            me("click", function () {
              return i.sendMensage();
            }),
            C(7, " Clique aqui para falar conosco "),
            g()(),
            m(8, "div", 5)(9, "p"),
            C(10, "CBD VITAL MED"),
            $(11, "br"),
            g(),
            m(12, "p"),
            C(13, "\xA9 2024 Todos os direitos reservados"),
            g()()());
        },
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var P = (function (t) {
    return (
      (t[(t.State = 0)] = "State"),
      (t[(t.Transition = 1)] = "Transition"),
      (t[(t.Sequence = 2)] = "Sequence"),
      (t[(t.Group = 3)] = "Group"),
      (t[(t.Animate = 4)] = "Animate"),
      (t[(t.Keyframes = 5)] = "Keyframes"),
      (t[(t.Style = 6)] = "Style"),
      (t[(t.Trigger = 7)] = "Trigger"),
      (t[(t.Reference = 8)] = "Reference"),
      (t[(t.AnimateChild = 9)] = "AnimateChild"),
      (t[(t.AnimateRef = 10)] = "AnimateRef"),
      (t[(t.Query = 11)] = "Query"),
      (t[(t.Stagger = 12)] = "Stagger"),
      t
    );
  })(P || {}),
  Wt = "*";
function qy(t, n) {
  return { type: P.Trigger, name: t, definitions: n, options: {} };
}
function Cd(t, n = null) {
  return { type: P.Animate, styles: n, timings: t };
}
function Gy(t, n = null) {
  return { type: P.Sequence, steps: t, options: n };
}
function ei(t) {
  return { type: P.Style, styles: t, offset: null };
}
function bd(t, n, e) {
  return { type: P.State, name: t, styles: n, options: e };
}
function Id(t, n, e = null) {
  return { type: P.Transition, expr: t, animation: n, options: e };
}
var Nn = class {
    constructor(n = 0, e = 0) {
      (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._onDestroyFns = []),
        (this._originalOnDoneFns = []),
        (this._originalOnStartFns = []),
        (this._started = !1),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._position = 0),
        (this.parentPlayer = null),
        (this.totalTime = n + e);
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((n) => n()),
        (this._onDoneFns = []));
    }
    onStart(n) {
      this._originalOnStartFns.push(n), this._onStartFns.push(n);
    }
    onDone(n) {
      this._originalOnDoneFns.push(n), this._onDoneFns.push(n);
    }
    onDestroy(n) {
      this._onDestroyFns.push(n);
    }
    hasStarted() {
      return this._started;
    }
    init() {}
    play() {
      this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
        (this._started = !0);
    }
    triggerMicrotask() {
      queueMicrotask(() => this._onFinish());
    }
    _onStart() {
      this._onStartFns.forEach((n) => n()), (this._onStartFns = []);
    }
    pause() {}
    restart() {}
    finish() {
      this._onFinish();
    }
    destroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this.hasStarted() || this._onStart(),
        this.finish(),
        this._onDestroyFns.forEach((n) => n()),
        (this._onDestroyFns = []));
    }
    reset() {
      (this._started = !1),
        (this._finished = !1),
        (this._onStartFns = this._originalOnStartFns),
        (this._onDoneFns = this._originalOnDoneFns);
    }
    setPosition(n) {
      this._position = this.totalTime ? n * this.totalTime : 1;
    }
    getPosition() {
      return this.totalTime ? this._position / this.totalTime : 1;
    }
    triggerCallback(n) {
      let e = n == "start" ? this._onStartFns : this._onDoneFns;
      e.forEach((r) => r()), (e.length = 0);
    }
  },
  no = class {
    constructor(n) {
      (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._finished = !1),
        (this._started = !1),
        (this._destroyed = !1),
        (this._onDestroyFns = []),
        (this.parentPlayer = null),
        (this.totalTime = 0),
        (this.players = n);
      let e = 0,
        r = 0,
        i = 0,
        o = this.players.length;
      o == 0
        ? queueMicrotask(() => this._onFinish())
        : this.players.forEach((s) => {
            s.onDone(() => {
              ++e == o && this._onFinish();
            }),
              s.onDestroy(() => {
                ++r == o && this._onDestroy();
              }),
              s.onStart(() => {
                ++i == o && this._onStart();
              });
          }),
        (this.totalTime = this.players.reduce(
          (s, a) => Math.max(s, a.totalTime),
          0
        ));
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((n) => n()),
        (this._onDoneFns = []));
    }
    init() {
      this.players.forEach((n) => n.init());
    }
    onStart(n) {
      this._onStartFns.push(n);
    }
    _onStart() {
      this.hasStarted() ||
        ((this._started = !0),
        this._onStartFns.forEach((n) => n()),
        (this._onStartFns = []));
    }
    onDone(n) {
      this._onDoneFns.push(n);
    }
    onDestroy(n) {
      this._onDestroyFns.push(n);
    }
    hasStarted() {
      return this._started;
    }
    play() {
      this.parentPlayer || this.init(),
        this._onStart(),
        this.players.forEach((n) => n.play());
    }
    pause() {
      this.players.forEach((n) => n.pause());
    }
    restart() {
      this.players.forEach((n) => n.restart());
    }
    finish() {
      this._onFinish(), this.players.forEach((n) => n.finish());
    }
    destroy() {
      this._onDestroy();
    }
    _onDestroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this._onFinish(),
        this.players.forEach((n) => n.destroy()),
        this._onDestroyFns.forEach((n) => n()),
        (this._onDestroyFns = []));
    }
    reset() {
      this.players.forEach((n) => n.reset()),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._started = !1);
    }
    setPosition(n) {
      let e = n * this.totalTime;
      this.players.forEach((r) => {
        let i = r.totalTime ? Math.min(1, e / r.totalTime) : 1;
        r.setPosition(i);
      });
    }
    getPosition() {
      let n = this.players.reduce(
        (e, r) => (e === null || r.totalTime > e.totalTime ? r : e),
        null
      );
      return n != null ? n.getPosition() : 0;
    }
    beforeDestroy() {
      this.players.forEach((n) => {
        n.beforeDestroy && n.beforeDestroy();
      });
    }
    triggerCallback(n) {
      let e = n == "start" ? this._onStartFns : this._onDoneFns;
      e.forEach((r) => r()), (e.length = 0);
    }
  },
  Ia = "!";
var gT = ["*", [["p-header"]]],
  yT = ["*", "p-header"],
  vT = (t) => ({ $implicit: t }),
  Ky = (t) => ({ transitionParams: t }),
  ET = (t) => ({ value: "visible", params: t }),
  DT = (t) => ({ value: "hidden", params: t });
function wT(t, n) {
  if ((t & 1 && $(0, "span", 11), t & 2)) {
    let e = re(3);
    Me(e.accordion.collapseIcon),
      D("ngClass", e.iconClass),
      ne("aria-hidden", !0);
  }
}
function CT(t, n) {
  if ((t & 1 && $(0, "ChevronDownIcon", 11), t & 2)) {
    let e = re(3);
    D("ngClass", e.iconClass), ne("aria-hidden", !0);
  }
}
function bT(t, n) {
  if (
    (t & 1 &&
      (Ft(0),
      O(1, wT, 1, 4, "span", 9)(2, CT, 1, 2, "ChevronDownIcon", 10),
      Lt()),
    t & 2)
  ) {
    let e = re(2);
    b(),
      D("ngIf", e.accordion.collapseIcon),
      b(),
      D("ngIf", !e.accordion.collapseIcon);
  }
}
function IT(t, n) {
  if ((t & 1 && $(0, "span", 11), t & 2)) {
    let e = re(3);
    Me(e.accordion.expandIcon),
      D("ngClass", e.iconClass),
      ne("aria-hidden", !0);
  }
}
function _T(t, n) {
  if ((t & 1 && $(0, "ChevronRightIcon", 11), t & 2)) {
    let e = re(3);
    D("ngClass", e.iconClass), ne("aria-hidden", !0);
  }
}
function ST(t, n) {
  if (
    (t & 1 &&
      (Ft(0),
      O(1, IT, 1, 4, "span", 9)(2, _T, 1, 2, "ChevronRightIcon", 10),
      Lt()),
    t & 2)
  ) {
    let e = re(2);
    b(),
      D("ngIf", e.accordion.expandIcon),
      b(),
      D("ngIf", !e.accordion.expandIcon);
  }
}
function TT(t, n) {
  if (
    (t & 1 &&
      (Ft(0),
      O(1, bT, 3, 2, "ng-container", 3)(2, ST, 3, 2, "ng-container", 3),
      Lt()),
    t & 2)
  ) {
    let e = re();
    b(), D("ngIf", e.selected), b(), D("ngIf", !e.selected);
  }
}
function MT(t, n) {}
function AT(t, n) {
  t & 1 && O(0, MT, 0, 0, "ng-template");
}
function xT(t, n) {
  if ((t & 1 && (m(0, "span", 12), C(1), g()), t & 2)) {
    let e = re();
    b(), Br(" ", e.header, " ");
  }
}
function NT(t, n) {
  t & 1 && kt(0);
}
function RT(t, n) {
  t & 1 && ft(0, 1, ["*ngIf", "hasHeaderFacet"]);
}
function OT(t, n) {
  t & 1 && kt(0);
}
function PT(t, n) {
  if ((t & 1 && (Ft(0), O(1, OT, 1, 0, "ng-container", 6), Lt()), t & 2)) {
    let e = re();
    b(), D("ngTemplateOutlet", e.contentTemplate);
  }
}
var FT = ["*"],
  ro = (() => {
    class t {
      el;
      changeDetector;
      id;
      header;
      headerStyle;
      tabStyle;
      contentStyle;
      tabStyleClass;
      headerStyleClass;
      contentStyleClass;
      disabled;
      cache = !0;
      transitionOptions = "400ms cubic-bezier(0.86, 0, 0.07, 1)";
      iconPos = "start";
      get selected() {
        return this._selected;
      }
      set selected(e) {
        (this._selected = e),
          this.loaded ||
            (this._selected && this.cache && (this.loaded = !0),
            this.changeDetector.detectChanges());
      }
      headerAriaLevel = 2;
      selectedChange = new Ee();
      headerFacet;
      templates;
      _selected = !1;
      get iconClass() {
        return this.iconPos === "end"
          ? "p-accordion-toggle-icon-end"
          : "p-accordion-toggle-icon";
      }
      contentTemplate;
      headerTemplate;
      iconTemplate;
      loaded = !1;
      accordion;
      constructor(e, r, i) {
        (this.el = r),
          (this.changeDetector = i),
          (this.accordion = e),
          (this.id = wa());
      }
      ngAfterContentInit() {
        this.templates.forEach((e) => {
          switch (e.getType()) {
            case "content":
              this.contentTemplate = e.template;
              break;
            case "header":
              this.headerTemplate = e.template;
              break;
            case "icon":
              this.iconTemplate = e.template;
              break;
            default:
              this.contentTemplate = e.template;
              break;
          }
        });
      }
      toggle(e) {
        if (this.disabled) return !1;
        let r = this.findTabIndex();
        if (this.selected)
          (this.selected = !1),
            this.accordion.onClose.emit({ originalEvent: e, index: r });
        else {
          if (!this.accordion.multiple)
            for (var i = 0; i < this.accordion.tabs.length; i++)
              this.accordion.tabs[i].selected &&
                ((this.accordion.tabs[i].selected = !1),
                this.accordion.tabs[i].selectedChange.emit(!1),
                this.accordion.tabs[i].changeDetector.markForCheck());
          (this.selected = !0),
            (this.loaded = !0),
            this.accordion.onOpen.emit({ originalEvent: e, index: r });
        }
        this.selectedChange.emit(this.selected),
          this.accordion.updateActiveIndex(),
          this.changeDetector.markForCheck(),
          e?.preventDefault();
      }
      findTabIndex() {
        let e = -1;
        for (var r = 0; r < this.accordion.tabs.length; r++)
          if (this.accordion.tabs[r] == this) {
            e = r;
            break;
          }
        return e;
      }
      get hasHeaderFacet() {
        return this.headerFacet && this.headerFacet.length > 0;
      }
      onKeydown(e) {
        switch (e.code) {
          case "Enter":
          case "Space":
            this.toggle(e), e.preventDefault();
            break;
          default:
            break;
        }
      }
      getTabHeaderActionId(e) {
        return `${e}_header_action`;
      }
      getTabContentId(e) {
        return `${e}_content`;
      }
      ngOnDestroy() {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
      }
      static ɵfac = function (r) {
        return new (r || t)(H(Es(() => io)), H(Re), H(Vt));
      };
      static ɵcmp = U({
        type: t,
        selectors: [["p-accordionTab"]],
        contentQueries: function (r, i, o) {
          if ((r & 1 && (cn(o, ba, 4), cn(o, zt, 4)), r & 2)) {
            let s;
            It((s = _t())) && (i.headerFacet = s),
              It((s = _t())) && (i.templates = s);
          }
        },
        hostAttrs: [1, "p-element"],
        inputs: {
          id: "id",
          header: "header",
          headerStyle: "headerStyle",
          tabStyle: "tabStyle",
          contentStyle: "contentStyle",
          tabStyleClass: "tabStyleClass",
          headerStyleClass: "headerStyleClass",
          contentStyleClass: "contentStyleClass",
          disabled: [le.HasDecoratorInputTransform, "disabled", "disabled", et],
          cache: [le.HasDecoratorInputTransform, "cache", "cache", et],
          transitionOptions: "transitionOptions",
          iconPos: "iconPos",
          selected: "selected",
          headerAriaLevel: [
            le.HasDecoratorInputTransform,
            "headerAriaLevel",
            "headerAriaLevel",
            Ai,
          ],
        },
        outputs: { selectedChange: "selectedChange" },
        features: [ln],
        ngContentSelectors: yT,
        decls: 12,
        vars: 44,
        consts: [
          [1, "p-accordion-tab", 3, "ngClass", "ngStyle"],
          ["role", "heading", 1, "p-accordion-header"],
          [
            "role",
            "button",
            1,
            "p-accordion-header-link",
            3,
            "click",
            "keydown",
            "ngClass",
            "ngStyle",
          ],
          [4, "ngIf"],
          [4, "ngTemplateOutlet", "ngTemplateOutletContext"],
          ["class", "p-accordion-header-text", 4, "ngIf"],
          [4, "ngTemplateOutlet"],
          ["role", "region", 1, "p-toggleable-content"],
          [1, "p-accordion-content", 3, "ngClass", "ngStyle"],
          [3, "class", "ngClass", 4, "ngIf"],
          [3, "ngClass", 4, "ngIf"],
          [3, "ngClass"],
          [1, "p-accordion-header-text"],
        ],
        template: function (r, i) {
          r & 1 &&
            (jt(gT),
            m(0, "div", 0)(1, "div", 1)(2, "a", 2),
            me("click", function (s) {
              return i.toggle(s);
            })("keydown", function (s) {
              return i.onKeydown(s);
            }),
            O(3, TT, 3, 2, "ng-container", 3)(4, AT, 1, 0, null, 4)(
              5,
              xT,
              2,
              1,
              "span",
              5
            )(6, NT, 1, 0, "ng-container", 6)(7, RT, 1, 0, "ng-content", 3),
            g()(),
            m(8, "div", 7)(9, "div", 8),
            ft(10),
            O(11, PT, 2, 1, "ng-container", 3),
            g()()()),
            r & 2 &&
              (Hs("p-accordion-tab-active", i.selected),
              D("ngClass", i.tabStyleClass)("ngStyle", i.tabStyle),
              ne("data-pc-name", "accordiontab"),
              b(),
              Hs("p-highlight", i.selected)("p-disabled", i.disabled),
              ne("aria-level", i.headerAriaLevel)(
                "data-p-disabled",
                i.disabled
              )("data-pc-section", "header"),
              b(),
              D("ngClass", i.headerStyleClass)("ngStyle", i.headerStyle),
              ne("tabindex", i.disabled ? null : 0)(
                "id",
                i.getTabHeaderActionId(i.id)
              )("aria-controls", i.getTabContentId(i.id))(
                "aria-expanded",
                i.selected
              )("aria-disabled", i.disabled)("data-pc-section", "headeraction"),
              b(),
              D("ngIf", !i.iconTemplate),
              b(),
              D("ngTemplateOutlet", i.iconTemplate)(
                "ngTemplateOutletContext",
                Ue(34, vT, i.selected)
              ),
              b(),
              D("ngIf", !i.hasHeaderFacet),
              b(),
              D("ngTemplateOutlet", i.headerTemplate),
              b(),
              D("ngIf", i.hasHeaderFacet),
              b(),
              D(
                "@tabContent",
                i.selected
                  ? Ue(38, ET, Ue(36, Ky, i.transitionOptions))
                  : Ue(42, DT, Ue(40, Ky, i.transitionOptions))
              ),
              ne("id", i.getTabContentId(i.id))("aria-hidden", !i.selected)(
                "aria-labelledby",
                i.getTabHeaderActionId(i.id)
              )("data-pc-section", "toggleablecontent"),
              b(),
              D("ngClass", i.contentStyleClass)("ngStyle", i.contentStyle),
              b(2),
              D(
                "ngIf",
                i.contentTemplate && (i.cache ? i.loaded : i.selected)
              ));
        },
        dependencies: () => [Ni, Qs, Ys, Ri, Jr, Xr],
        styles: [
          `@layer primeng{.p-accordion-header-link{cursor:pointer;display:flex;align-items:center;-webkit-user-select:none;user-select:none;position:relative;text-decoration:none}.p-accordion-header-link:focus{z-index:1}.p-accordion-header-text{line-height:1}.p-accordion .p-toggleable-content{overflow:hidden}.p-accordion .p-accordion-tab-active>.p-toggleable-content:not(.ng-animating){overflow:inherit}.p-accordion-toggle-icon-end{order:1;margin-left:auto}.p-accordion-toggle-icon{order:0}}
`,
        ],
        encapsulation: 2,
        data: {
          animation: [
            qy("tabContent", [
              bd("hidden", ei({ height: "0", visibility: "hidden" })),
              bd("visible", ei({ height: "*", visibility: "visible" })),
              Id("visible <=> hidden", [Cd("{{transitionParams}}")]),
              Id("void => *", Cd(0)),
            ]),
          ],
        },
        changeDetection: 0,
      });
    }
    return t;
  })(),
  io = (() => {
    class t {
      el;
      changeDetector;
      multiple = !1;
      style;
      styleClass;
      expandIcon;
      collapseIcon;
      get activeIndex() {
        return this._activeIndex;
      }
      set activeIndex(e) {
        if (((this._activeIndex = e), this.preventActiveIndexPropagation)) {
          this.preventActiveIndexPropagation = !1;
          return;
        }
        this.updateSelectionState();
      }
      selectOnFocus = !1;
      get headerAriaLevel() {
        return this._headerAriaLevel;
      }
      set headerAriaLevel(e) {
        typeof e == "number" && e > 0
          ? (this._headerAriaLevel = e)
          : this._headerAriaLevel !== 2 && (this._headerAriaLevel = 2);
      }
      onClose = new Ee();
      onOpen = new Ee();
      activeIndexChange = new Ee();
      tabList;
      tabListSubscription = null;
      _activeIndex;
      _headerAriaLevel = 2;
      preventActiveIndexPropagation = !1;
      tabs = [];
      constructor(e, r) {
        (this.el = e), (this.changeDetector = r);
      }
      onKeydown(e) {
        switch (e.code) {
          case "ArrowDown":
            this.onTabArrowDownKey(e);
            break;
          case "ArrowUp":
            this.onTabArrowUpKey(e);
            break;
          case "Home":
            e.shiftKey || this.onTabHomeKey(e);
            break;
          case "End":
            e.shiftKey || this.onTabEndKey(e);
            break;
        }
      }
      focusedElementIsAccordionHeader() {
        return (
          document.activeElement.tagName.toLowerCase() === "a" &&
          document.activeElement.classList.contains("p-accordion-header-link")
        );
      }
      onTabArrowDownKey(e) {
        if (this.focusedElementIsAccordionHeader()) {
          let r = this.findNextHeaderAction(
            e.target.parentElement.parentElement.parentElement
          );
          r ? this.changeFocusedTab(r) : this.onTabHomeKey(e),
            e.preventDefault();
        }
      }
      onTabArrowUpKey(e) {
        if (this.focusedElementIsAccordionHeader()) {
          let r = this.findPrevHeaderAction(
            e.target.parentElement.parentElement.parentElement
          );
          r ? this.changeFocusedTab(r) : this.onTabEndKey(e),
            e.preventDefault();
        }
      }
      onTabHomeKey(e) {
        let r = this.findFirstHeaderAction();
        this.changeFocusedTab(r), e.preventDefault();
      }
      changeFocusedTab(e) {
        e &&
          (X.focus(e),
          this.selectOnFocus &&
            this.tabs.forEach((r, i) => {
              let o = this.multiple
                ? this._activeIndex.includes(i)
                : i === this._activeIndex;
              this.multiple
                ? (this._activeIndex || (this._activeIndex = []),
                  r.id == e.id &&
                    ((r.selected = !r.selected),
                    this._activeIndex.includes(i)
                      ? (this._activeIndex = this._activeIndex.filter(
                          (s) => s !== i
                        ))
                      : this._activeIndex.push(i)))
                : r.id == e.id
                ? ((r.selected = !r.selected), (this._activeIndex = i))
                : (r.selected = !1),
                r.selectedChange.emit(o),
                this.activeIndexChange.emit(this._activeIndex),
                r.changeDetector.markForCheck();
            }));
      }
      findNextHeaderAction(e, r = !1) {
        let i = r ? e : e.nextElementSibling,
          o = X.findSingle(i, '[data-pc-section="header"]');
        return o
          ? X.getAttribute(o, "data-p-disabled")
            ? this.findNextHeaderAction(o.parentElement.parentElement)
            : X.findSingle(o, '[data-pc-section="headeraction"]')
          : null;
      }
      findPrevHeaderAction(e, r = !1) {
        let i = r ? e : e.previousElementSibling,
          o = X.findSingle(i, '[data-pc-section="header"]');
        return o
          ? X.getAttribute(o, "data-p-disabled")
            ? this.findPrevHeaderAction(o.parentElement.parentElement)
            : X.findSingle(o, '[data-pc-section="headeraction"]')
          : null;
      }
      findFirstHeaderAction() {
        let e = this.el.nativeElement.firstElementChild.childNodes[0];
        return this.findNextHeaderAction(e, !0);
      }
      findLastHeaderAction() {
        let e = this.el.nativeElement.firstElementChild.childNodes,
          r = e[e.length - 1];
        return this.findPrevHeaderAction(r, !0);
      }
      onTabEndKey(e) {
        let r = this.findLastHeaderAction();
        this.changeFocusedTab(r), e.preventDefault();
      }
      resetActiveTab() {
        this.tabs?.forEach((e) => {
          (e.selected = !1), e.changeDetector.markForCheck();
        }),
          (this.activeIndex = null);
      }
      ngAfterContentInit() {
        this.initTabs(),
          (this.tabListSubscription = this.tabList.changes.subscribe((e) => {
            this.initTabs();
          }));
      }
      initTabs() {
        (this.tabs = this.tabList.toArray()),
          this.tabs.forEach((e) => {
            e.headerAriaLevel = this._headerAriaLevel;
          }),
          this.updateSelectionState(),
          this.changeDetector.markForCheck();
      }
      getBlockableElement() {
        return this.el.nativeElement.children[0];
      }
      updateSelectionState() {
        if (this.tabs && this.tabs.length && this._activeIndex != null)
          for (let e = 0; e < this.tabs.length; e++) {
            let r = this.multiple
              ? this._activeIndex.includes(e)
              : e === this._activeIndex;
            r !== this.tabs[e].selected &&
              ((this.tabs[e].selected = r),
              this.tabs[e].selectedChange.emit(r),
              this.tabs[e].changeDetector.markForCheck());
          }
      }
      isTabActive(e) {
        return this.multiple
          ? this._activeIndex && this._activeIndex.includes(e)
          : this._activeIndex === e;
      }
      getTabProp(e, r) {
        return e.props ? e.props[r] : void 0;
      }
      updateActiveIndex() {
        let e = this.multiple ? [] : null;
        this.tabs.forEach((r, i) => {
          if (r.selected)
            if (this.multiple) e.push(i);
            else {
              e = i;
              return;
            }
        }),
          (this.preventActiveIndexPropagation = !0),
          (this._activeIndex = e),
          this.activeIndexChange.emit(e);
      }
      ngOnDestroy() {
        this.tabListSubscription && this.tabListSubscription.unsubscribe();
      }
      static ɵfac = function (r) {
        return new (r || t)(H(Re), H(Vt));
      };
      static ɵcmp = U({
        type: t,
        selectors: [["p-accordion"]],
        contentQueries: function (r, i, o) {
          if ((r & 1 && cn(o, ro, 5), r & 2)) {
            let s;
            It((s = _t())) && (i.tabList = s);
          }
        },
        hostAttrs: [1, "p-element"],
        hostBindings: function (r, i) {
          r & 1 &&
            me("keydown", function (s) {
              return i.onKeydown(s);
            });
        },
        inputs: {
          multiple: [le.HasDecoratorInputTransform, "multiple", "multiple", et],
          style: "style",
          styleClass: "styleClass",
          expandIcon: "expandIcon",
          collapseIcon: "collapseIcon",
          activeIndex: "activeIndex",
          selectOnFocus: [
            le.HasDecoratorInputTransform,
            "selectOnFocus",
            "selectOnFocus",
            et,
          ],
          headerAriaLevel: "headerAriaLevel",
        },
        outputs: {
          onClose: "onClose",
          onOpen: "onOpen",
          activeIndexChange: "activeIndexChange",
        },
        features: [ln],
        ngContentSelectors: FT,
        decls: 2,
        vars: 4,
        consts: [[3, "ngClass", "ngStyle"]],
        template: function (r, i) {
          r & 1 && (jt(), m(0, "div", 0), ft(1), g()),
            r & 2 &&
              (Me(i.styleClass),
              D("ngClass", "p-accordion p-component")("ngStyle", i.style));
        },
        dependencies: [Ni, Ri],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return t;
  })(),
  _a = (() => {
    class t {
      static ɵfac = function (r) {
        return new (r || t)();
      };
      static ɵmod = Ye({ type: t });
      static ɵinj = Qe({ imports: [Bt, Jr, Xr, eo] });
    }
    return t;
  })();
var Sa = () => ({
  "background-color": "transparent",
  "border-bottom": "1px solid #3B4B10",
  "border-radius": "0px",
});
function LT(t, n) {
  t & 1 && (m(0, "span", 10)(1, "span", 11), C(2, " Gest\xE3o da dor "), g()());
}
function kT(t, n) {
  t & 1 && (m(0, "span", 10)(1, "span", 11), C(2, " Melhoria do Sono "), g()());
}
function jT(t, n) {
  t & 1 &&
    (m(0, "span", 10)(1, "span", 11),
    C(2, " Doen\xE7as neurol\xF3gicas "),
    g()());
}
function VT(t, n) {
  t & 1 && (m(0, "span", 10)(1, "span", 11), C(2, " Sa\xFAde mental "), g()());
}
var Yy = (() => {
  class t {
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵcmp = U({
        type: t,
        selectors: [["app-beneficios"]],
        standalone: !0,
        features: [Y],
        decls: 24,
        vars: 8,
        consts: [
          [
            "id",
            "beneficios",
            1,
            "flex",
            "flex-col",
            "bg-white",
            "py-12",
            "w-full",
          ],
          [
            1,
            "flex",
            "lg:flex-row",
            "flex-col",
            "justify-center",
            "lg:justify-between",
            "lg:items-center",
            "gap-8",
            "space-y-8",
            "lg:space-y-0",
            "mx-auto",
            "px-6",
            "lg:px-8",
            "w-full",
            "max-w-6xl",
          ],
          [
            1,
            "flex",
            "flex-1",
            "justify-center",
            "items-center",
            "pl-4",
            "w-full",
          ],
          [
            "src",
            "assets/media/ampola-vertical.png",
            "alt",
            "pessoa segurando frasco de oleo",
            1,
            "max-h-[400px]",
          ],
          [1, "flex-1", "space-y-8"],
          [1, "font-semibold", "text-[#3B4B10]", "text-lg"],
          [
            "expandIcon",
            "pi pi-plus text-[#3B4B10]",
            "collapseIcon",
            "pi pi-minus text-[#3B4B10]",
            1,
            "bg-white",
            "w-full",
            "text-black",
          ],
          ["iconPos", "end", 3, "headerStyle"],
          ["pTemplate", "header"],
          [1, "m-0", "text-gray-700", "text-sm"],
          [1, "flex", "items-center", "gap-2", "bg-transparent", "w-full"],
          [1, "font-bold"],
        ],
        template: function (r, i) {
          r & 1 &&
            (m(0, "section", 0)(1, "div", 1)(2, "div", 2),
            $(3, "img", 3),
            g(),
            m(4, "div", 4)(5, "p", 5),
            C(
              6,
              " Potenciais benef\xEDcios do tratamento com cannabis medicinal "
            ),
            g(),
            m(7, "p-accordion", 6)(8, "p-accordionTab", 7),
            O(9, LT, 3, 0, "ng-template", 8),
            m(10, "p", 9),
            C(
              11,
              " A mesma pode atuar no al\xEDvio de dores cr\xF4nicas e agudas, proporcionando uma alternativa natural e eficaz para pacientes que sofrem com desconforto cont\xEDnuo. "
            ),
            g()(),
            m(12, "p-accordionTab", 7),
            O(13, kT, 3, 0, "ng-template", 8),
            m(14, "p", 9),
            C(
              15,
              " A adenosina \xE9 um composto org\xE2nico respons\xE1vel pelo controle da nossa sensa\xE7\xE3o de cansa\xE7o. O CBD ajuda a regular a quantidade de adenosina produzida pelo corpo, promovendo assim a qualidade do sono. "
            ),
            g()(),
            m(16, "p-accordionTab", 7),
            O(17, jT, 3, 0, "ng-template", 8),
            m(18, "p", 9),
            C(
              19,
              " O tratamento com cannabis medicinal tem sido explorado em diversas condi\xE7\xF5es neurol\xF3gicas, como epilepsia e esclerose m\xFAltipla, oferecendo uma alternativa terap\xEAutica promissora para esses pacientes. "
            ),
            g()(),
            m(20, "p-accordionTab", 7),
            O(21, VT, 3, 0, "ng-template", 8),
            m(22, "p", 9),
            C(
              23,
              " Al\xE9m de aliviar a ansiedade, o tratamento com CBD tem demonstrado benef\xEDcios no apoio ao tratamento de depress\xE3o e transtorno de estresse p\xF3s-traum\xE1tico (TEPT), proporcionando maior qualidade de vida aos pacientes que convivem com esses dist\xFArbios. "
            ),
            g()()()()()()),
            r & 2 &&
              (b(8),
              D("headerStyle", Oe(4, Sa)),
              b(4),
              D("headerStyle", Oe(5, Sa)),
              b(4),
              D("headerStyle", Oe(6, Sa)),
              b(4),
              D("headerStyle", Oe(7, Sa)));
        },
        dependencies: [_a, io, ro, zt],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var oo = () => ({
    "background-color": "#3B4B1026",
    "border-radius": "8px",
    "margin-bottom": "8px",
  }),
  so = () => ({
    "background-color": "#3B4B10",
    color: "#FFFFFF",
    "border-radius": "8px",
    padding: "16px",
  });
function BT(t, n) {
  t & 1 &&
    (m(0, "span", 11)(1, "span", 12),
    C(2, " O que \xE9 Cannabis Medicinal? "),
    g()());
}
function UT(t, n) {
  t & 1 &&
    (m(0, "span", 11)(1, "span", 12),
    C(2, " O \xF3leo de Cannabis causa depend\xEAncia?"),
    g()());
}
function $T(t, n) {
  t & 1 &&
    (m(0, "span", 11)(1, "span", 12),
    C(2, "Como o \xF3leo de Cannabis atua no corpo?"),
    g()());
}
function HT(t, n) {
  t & 1 &&
    (m(0, "span", 11)(1, "span", 12),
    C(2, "Quais patologias a CBD ajuda a amenizar?"),
    g()());
}
function zT(t, n) {
  t & 1 &&
    (m(0, "span", 11)(1, "span", 12),
    C(2, "Posso utilizar o \xF3leo em qualquer hor\xE1rio?"),
    g()());
}
var Zy = (() => {
  class t {
    constructor() {}
    sendMensage() {
      new Ht().sendMensage();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵcmp = U({
        type: t,
        selectors: [["app-conheca"]],
        standalone: !0,
        features: [Y],
        decls: 34,
        vars: 20,
        consts: [
          [
            "id",
            "conheca",
            1,
            "flex",
            "flex-col",
            "bg-white",
            "py-12",
            "w-full",
          ],
          [
            1,
            "flex",
            "lg:flex-row",
            "flex-col",
            "lg:justify-between",
            "lg:items-center",
            "gap-8",
            "space-y-8",
            "lg:space-y-0",
            "mx-auto",
            "px-6",
            "lg:px-8",
            "w-full",
            "max-w-6xl",
          ],
          [1, "flex-1"],
          [1, "flex", "flex-col", "gap-6"],
          [1, "font-normal", "text-5xl", "text-gray-900", "leading-tight"],
          [
            1,
            "bg-[#3B4B10]",
            "hover:bg-gray-800",
            "shadow-md",
            "py-2",
            "rounded-lg",
            "w-80",
            "h-12",
            "font-medium",
            "text-lg",
            "text-white",
            3,
            "click",
          ],
          [1, "flex-1", "space-y-8"],
          [
            "expandIcon",
            "pi pi-plus text-[#3B4B10]",
            "collapseIcon",
            "pi pi-minus text-[#3B4B10]",
            1,
            "space-y-4",
            "bg-white",
            "w-full",
            "text-black",
          ],
          ["iconPos", "end", 3, "headerStyle", "contentStyle"],
          ["pTemplate", "header"],
          [1, "m-0", "text-sm", "text-white"],
          [1, "flex", "items-center", "gap-2", "w-full"],
          [1, "font-bold"],
        ],
        template: function (r, i) {
          r & 1 &&
            (m(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(
              4,
              "h2",
              4
            ),
            C(5, " Conhe\xE7a o"),
            $(6, "br"),
            C(7, " CBD Vital "),
            g(),
            m(8, "p"),
            C(
              9,
              " O canabidiol ou CBD \xE9 um fitocanabinoide sem propriedades intoxicantes. Possui capacidades analg\xE9sicas, anti-inflamat\xF3rias, antioxidantes, ansiol\xEDticas, antidepressivas, anticonvulsivas, estimulante \xF3sseo, antin\xE1usea, neuroprotetora e tem efeito imunomodulat\xF3rio. "
            ),
            g(),
            m(10, "button", 5),
            me("click", function () {
              return i.sendMensage();
            }),
            C(11, " Fale Conosco "),
            g()()(),
            m(12, "div", 6)(13, "p-accordion", 7)(14, "p-accordionTab", 8),
            O(15, BT, 3, 0, "ng-template", 9),
            m(16, "p", 10),
            C(
              17,
              " O \xF3leo de Cannabis\xA0\xE9 um produto medicinal comumente usado no tratamento de condi\xE7\xF5es, para amenizar os efeitos colaterais de quem faz. "
            ),
            g()(),
            m(18, "p-accordionTab", 8),
            O(19, UT, 3, 0, "ng-template", 9),
            m(20, "p", 10),
            C(
              21,
              " o \xF3leo de cannabis medicinal n\xE3o causa depend\xEAncia qu\xEDmica. Seus compostos naturais s\xE3o considerados seguros para uso prolongado. "
            ),
            g()(),
            m(22, "p-accordionTab", 8),
            O(23, $T, 3, 0, "ng-template", 9),
            m(24, "p", 10),
            C(
              25,
              " o \xF3leo\xA0atua como relaxante muscular e anti-inflamat\xF3rio. Dentre os benef\xEDcios, produz efeito anticonvulsivo, anti-inflamat\xF3rio, antidepressivo e anti-hipertensivo. "
            ),
            g()(),
            m(26, "p-accordionTab", 8),
            O(27, HT, 3, 0, "ng-template", 9),
            m(28, "p", 10),
            C(
              29,
              " O mesmo ajuda a amenizar mais de 50 patologias, entre elas: a\xA0doen\xE7a\xA0de Parkinson, Alzheimer, diabetes, n\xE1useas, e c\xE2ncer. Al\xE9m disso, atua como analg\xE9sico e imunossupressor, em dist\xFArbios de ansiedade, do sono e do movimento. "
            ),
            g()(),
            m(30, "p-accordionTab", 8),
            O(31, zT, 3, 0, "ng-template", 9),
            m(32, "p", 10),
            C(
              33,
              " \xA0o hor\xE1rio ideal para tomar \xF3leo de CBD varia de acordo com as necessidades de cada pessoa e os efeitos terap\xEAuticos desejados.\xA0Por isso, \xE9 sempre recomendado consultar um profissional de sa\xFAde para obter orienta\xE7\xE3o personalizada "
            ),
            g()()()()()()),
            r & 2 &&
              (b(14),
              D("headerStyle", Oe(10, oo))("contentStyle", Oe(11, so)),
              b(4),
              D("headerStyle", Oe(12, oo))("contentStyle", Oe(13, so)),
              b(4),
              D("headerStyle", Oe(14, oo))("contentStyle", Oe(15, so)),
              b(4),
              D("headerStyle", Oe(16, oo))("contentStyle", Oe(17, so)),
              b(4),
              D("headerStyle", Oe(18, oo))("contentStyle", Oe(19, so)));
        },
        dependencies: [_a, io, ro, zt],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Xy = (() => {
  class t {
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵcmp = U({
        type: t,
        selectors: [["app-main-page"]],
        standalone: !0,
        features: [Y],
        decls: 7,
        vars: 0,
        consts: [[1, "montserrat"]],
        template: function (r, i) {
          r & 1 &&
            $(0, "app-header", 0)(1, "app-features", 0)(2, "app-conheca", 0)(
              3,
              "app-how-to-buy",
              0
            )(4, "app-feedbacks", 0)(5, "app-beneficios", 0)(6, "app-infos", 0);
        },
        dependencies: [Bt, Oy, Py, Fy, zy, Wy, Yy, Zy],
        encapsulation: 2,
      });
    }
  }
  return t;
})();
var Jy = [
  { path: "", pathMatch: "full", redirectTo: "pagina-principal" },
  { path: "pagina-principal", component: Xy },
];
function ev(t) {
  return new v(3e3, !1);
}
function WT() {
  return new v(3100, !1);
}
function qT() {
  return new v(3101, !1);
}
function GT(t) {
  return new v(3001, !1);
}
function KT(t) {
  return new v(3003, !1);
}
function QT(t) {
  return new v(3004, !1);
}
function YT(t, n) {
  return new v(3005, !1);
}
function ZT() {
  return new v(3006, !1);
}
function XT() {
  return new v(3007, !1);
}
function JT(t, n) {
  return new v(3008, !1);
}
function eM(t) {
  return new v(3002, !1);
}
function tM(t, n, e, r, i) {
  return new v(3010, !1);
}
function nM() {
  return new v(3011, !1);
}
function rM() {
  return new v(3012, !1);
}
function iM() {
  return new v(3200, !1);
}
function oM() {
  return new v(3202, !1);
}
function sM() {
  return new v(3013, !1);
}
function aM(t) {
  return new v(3014, !1);
}
function lM(t) {
  return new v(3015, !1);
}
function cM(t) {
  return new v(3016, !1);
}
function uM(t, n) {
  return new v(3404, !1);
}
function dM(t) {
  return new v(3502, !1);
}
function fM(t) {
  return new v(3503, !1);
}
function hM() {
  return new v(3300, !1);
}
function pM(t) {
  return new v(3504, !1);
}
function mM(t) {
  return new v(3301, !1);
}
function gM(t, n) {
  return new v(3302, !1);
}
function yM(t) {
  return new v(3303, !1);
}
function vM(t, n) {
  return new v(3400, !1);
}
function EM(t) {
  return new v(3401, !1);
}
function DM(t) {
  return new v(3402, !1);
}
function wM(t, n) {
  return new v(3505, !1);
}
function Rn(t) {
  switch (t.length) {
    case 0:
      return new Nn();
    case 1:
      return t[0];
    default:
      return new no(t);
  }
}
function pv(t, n, e = new Map(), r = new Map()) {
  let i = [],
    o = [],
    s = -1,
    a = null;
  if (
    (n.forEach((l) => {
      let c = l.get("offset"),
        u = c == s,
        d = (u && a) || new Map();
      l.forEach((f, h) => {
        let p = h,
          y = f;
        if (h !== "offset")
          switch (((p = t.normalizePropertyName(p, i)), y)) {
            case Ia:
              y = e.get(h);
              break;
            case Wt:
              y = r.get(h);
              break;
            default:
              y = t.normalizeStyleValue(h, p, y, i);
              break;
          }
        d.set(p, y);
      }),
        u || o.push(d),
        (a = d),
        (s = c);
    }),
    i.length)
  )
    throw dM(i);
  return o;
}
function Gd(t, n, e, r) {
  switch (n) {
    case "start":
      t.onStart(() => r(e && _d(e, "start", t)));
      break;
    case "done":
      t.onDone(() => r(e && _d(e, "done", t)));
      break;
    case "destroy":
      t.onDestroy(() => r(e && _d(e, "destroy", t)));
      break;
  }
}
function _d(t, n, e) {
  let r = e.totalTime,
    i = !!e.disabled,
    o = Kd(
      t.element,
      t.triggerName,
      t.fromState,
      t.toState,
      n || t.phaseName,
      r ?? t.totalTime,
      i
    ),
    s = t._data;
  return s != null && (o._data = s), o;
}
function Kd(t, n, e, r, i = "", o = 0, s) {
  return {
    element: t,
    triggerName: n,
    fromState: e,
    toState: r,
    phaseName: i,
    totalTime: o,
    disabled: !!s,
  };
}
function it(t, n, e) {
  let r = t.get(n);
  return r || t.set(n, (r = e)), r;
}
function tv(t) {
  let n = t.indexOf(":"),
    e = t.substring(1, n),
    r = t.slice(n + 1);
  return [e, r];
}
var CM = typeof document > "u" ? null : document.documentElement;
function Qd(t) {
  let n = t.parentNode || t.host || null;
  return n === CM ? null : n;
}
function bM(t) {
  return t.substring(1, 6) == "ebkit";
}
var ir = null,
  nv = !1;
function IM(t) {
  ir ||
    ((ir = _M() || {}), (nv = ir.style ? "WebkitAppearance" in ir.style : !1));
  let n = !0;
  return (
    ir.style &&
      !bM(t) &&
      ((n = t in ir.style),
      !n &&
        nv &&
        (n = "Webkit" + t.charAt(0).toUpperCase() + t.slice(1) in ir.style)),
    n
  );
}
function _M() {
  return typeof document < "u" ? document.body : null;
}
function mv(t, n) {
  for (; n; ) {
    if (n === t) return !0;
    n = Qd(n);
  }
  return !1;
}
function gv(t, n, e) {
  if (e) return Array.from(t.querySelectorAll(n));
  let r = t.querySelector(n);
  return r ? [r] : [];
}
var Yd = (() => {
    class t {
      validateStyleProperty(e) {
        return IM(e);
      }
      matchesElement(e, r) {
        return !1;
      }
      containsElement(e, r) {
        return mv(e, r);
      }
      getParentElement(e) {
        return Qd(e);
      }
      query(e, r, i) {
        return gv(e, r, i);
      }
      computeStyle(e, r, i) {
        return i || "";
      }
      animate(e, r, i, o, s, a = [], l) {
        return new Nn(i, o);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || t)();
        };
      }
      static {
        this.ɵprov = S({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  ar = class {
    static {
      this.NOOP = new Yd();
    }
  },
  lr = class {};
var SM = 1e3,
  yv = "{{",
  TM = "}}",
  vv = "ng-enter",
  Nd = "ng-leave",
  Ta = "ng-trigger",
  Ra = ".ng-trigger",
  rv = "ng-animating",
  Rd = ".ng-animating";
function un(t) {
  if (typeof t == "number") return t;
  let n = t.match(/^(-?[\.\d]+)(m?s)/);
  return !n || n.length < 2 ? 0 : Od(parseFloat(n[1]), n[2]);
}
function Od(t, n) {
  switch (n) {
    case "s":
      return t * SM;
    default:
      return t;
  }
}
function Oa(t, n, e) {
  return t.hasOwnProperty("duration") ? t : MM(t, n, e);
}
function MM(t, n, e) {
  let r =
      /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
    i,
    o = 0,
    s = "";
  if (typeof t == "string") {
    let a = t.match(r);
    if (a === null) return n.push(ev(t)), { duration: 0, delay: 0, easing: "" };
    i = Od(parseFloat(a[1]), a[2]);
    let l = a[3];
    l != null && (o = Od(parseFloat(l), a[4]));
    let c = a[5];
    c && (s = c);
  } else i = t;
  if (!e) {
    let a = !1,
      l = n.length;
    i < 0 && (n.push(WT()), (a = !0)),
      o < 0 && (n.push(qT()), (a = !0)),
      a && n.splice(l, 0, ev(t));
  }
  return { duration: i, delay: o, easing: s };
}
function AM(t) {
  return t.length
    ? t[0] instanceof Map
      ? t
      : t.map((n) => new Map(Object.entries(n)))
    : [];
}
function qt(t, n, e) {
  n.forEach((r, i) => {
    let o = Zd(i);
    e && !e.has(i) && e.set(i, t.style[o]), (t.style[o] = r);
  });
}
function sr(t, n) {
  n.forEach((e, r) => {
    let i = Zd(r);
    t.style[i] = "";
  });
}
function ao(t) {
  return Array.isArray(t) ? (t.length == 1 ? t[0] : Gy(t)) : t;
}
function xM(t, n, e) {
  let r = n.params || {},
    i = Ev(t);
  i.length &&
    i.forEach((o) => {
      r.hasOwnProperty(o) || e.push(GT(o));
    });
}
var Pd = new RegExp(`${yv}\\s*(.+?)\\s*${TM}`, "g");
function Ev(t) {
  let n = [];
  if (typeof t == "string") {
    let e;
    for (; (e = Pd.exec(t)); ) n.push(e[1]);
    Pd.lastIndex = 0;
  }
  return n;
}
function co(t, n, e) {
  let r = `${t}`,
    i = r.replace(Pd, (o, s) => {
      let a = n[s];
      return a == null && (e.push(KT(s)), (a = "")), a.toString();
    });
  return i == r ? t : i;
}
var NM = /-+([a-z0-9])/g;
function Zd(t) {
  return t.replace(NM, (...n) => n[1].toUpperCase());
}
function RM(t, n) {
  return t === 0 || n === 0;
}
function OM(t, n, e) {
  if (e.size && n.length) {
    let r = n[0],
      i = [];
    if (
      (e.forEach((o, s) => {
        r.has(s) || i.push(s), r.set(s, o);
      }),
      i.length)
    )
      for (let o = 1; o < n.length; o++) {
        let s = n[o];
        i.forEach((a) => s.set(a, Xd(t, a)));
      }
  }
  return n;
}
function rt(t, n, e) {
  switch (n.type) {
    case P.Trigger:
      return t.visitTrigger(n, e);
    case P.State:
      return t.visitState(n, e);
    case P.Transition:
      return t.visitTransition(n, e);
    case P.Sequence:
      return t.visitSequence(n, e);
    case P.Group:
      return t.visitGroup(n, e);
    case P.Animate:
      return t.visitAnimate(n, e);
    case P.Keyframes:
      return t.visitKeyframes(n, e);
    case P.Style:
      return t.visitStyle(n, e);
    case P.Reference:
      return t.visitReference(n, e);
    case P.AnimateChild:
      return t.visitAnimateChild(n, e);
    case P.AnimateRef:
      return t.visitAnimateRef(n, e);
    case P.Query:
      return t.visitQuery(n, e);
    case P.Stagger:
      return t.visitStagger(n, e);
    default:
      throw QT(n.type);
  }
}
function Xd(t, n) {
  return window.getComputedStyle(t)[n];
}
var PM = new Set([
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "left",
    "top",
    "bottom",
    "right",
    "fontSize",
    "outlineWidth",
    "outlineOffset",
    "paddingTop",
    "paddingLeft",
    "paddingBottom",
    "paddingRight",
    "marginTop",
    "marginLeft",
    "marginBottom",
    "marginRight",
    "borderRadius",
    "borderWidth",
    "borderTopWidth",
    "borderLeftWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "textIndent",
    "perspective",
  ]),
  Pa = class extends lr {
    normalizePropertyName(n, e) {
      return Zd(n);
    }
    normalizeStyleValue(n, e, r, i) {
      let o = "",
        s = r.toString().trim();
      if (PM.has(e) && r !== 0 && r !== "0")
        if (typeof r == "number") o = "px";
        else {
          let a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
          a && a[1].length == 0 && i.push(YT(n, r));
        }
      return s + o;
    }
  };
var Fa = "*";
function FM(t, n) {
  let e = [];
  return (
    typeof t == "string"
      ? t.split(/\s*,\s*/).forEach((r) => LM(r, e, n))
      : e.push(t),
    e
  );
}
function LM(t, n, e) {
  if (t[0] == ":") {
    let l = kM(t, e);
    if (typeof l == "function") {
      n.push(l);
      return;
    }
    t = l;
  }
  let r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
  if (r == null || r.length < 4) return e.push(lM(t)), n;
  let i = r[1],
    o = r[2],
    s = r[3];
  n.push(iv(i, s));
  let a = i == Fa && s == Fa;
  o[0] == "<" && !a && n.push(iv(s, i));
}
function kM(t, n) {
  switch (t) {
    case ":enter":
      return "void => *";
    case ":leave":
      return "* => void";
    case ":increment":
      return (e, r) => parseFloat(r) > parseFloat(e);
    case ":decrement":
      return (e, r) => parseFloat(r) < parseFloat(e);
    default:
      return n.push(cM(t)), "* => *";
  }
}
var Ma = new Set(["true", "1"]),
  Aa = new Set(["false", "0"]);
function iv(t, n) {
  let e = Ma.has(t) || Aa.has(t),
    r = Ma.has(n) || Aa.has(n);
  return (i, o) => {
    let s = t == Fa || t == i,
      a = n == Fa || n == o;
    return (
      !s && e && typeof i == "boolean" && (s = i ? Ma.has(t) : Aa.has(t)),
      !a && r && typeof o == "boolean" && (a = o ? Ma.has(n) : Aa.has(n)),
      s && a
    );
  };
}
var Dv = ":self",
  jM = new RegExp(`s*${Dv}s*,?`, "g");
function wv(t, n, e, r) {
  return new Fd(t).build(n, e, r);
}
var ov = "",
  Fd = class {
    constructor(n) {
      this._driver = n;
    }
    build(n, e, r) {
      let i = new Ld(e);
      return this._resetContextStyleTimingState(i), rt(this, ao(n), i);
    }
    _resetContextStyleTimingState(n) {
      (n.currentQuerySelector = ov),
        (n.collectedStyles = new Map()),
        n.collectedStyles.set(ov, new Map()),
        (n.currentTime = 0);
    }
    visitTrigger(n, e) {
      let r = (e.queryCount = 0),
        i = (e.depCount = 0),
        o = [],
        s = [];
      return (
        n.name.charAt(0) == "@" && e.errors.push(ZT()),
        n.definitions.forEach((a) => {
          if ((this._resetContextStyleTimingState(e), a.type == P.State)) {
            let l = a,
              c = l.name;
            c
              .toString()
              .split(/\s*,\s*/)
              .forEach((u) => {
                (l.name = u), o.push(this.visitState(l, e));
              }),
              (l.name = c);
          } else if (a.type == P.Transition) {
            let l = this.visitTransition(a, e);
            (r += l.queryCount), (i += l.depCount), s.push(l);
          } else e.errors.push(XT());
        }),
        {
          type: P.Trigger,
          name: n.name,
          states: o,
          transitions: s,
          queryCount: r,
          depCount: i,
          options: null,
        }
      );
    }
    visitState(n, e) {
      let r = this.visitStyle(n.styles, e),
        i = (n.options && n.options.params) || null;
      if (r.containsDynamicStyles) {
        let o = new Set(),
          s = i || {};
        r.styles.forEach((a) => {
          a instanceof Map &&
            a.forEach((l) => {
              Ev(l).forEach((c) => {
                s.hasOwnProperty(c) || o.add(c);
              });
            });
        }),
          o.size && e.errors.push(JT(n.name, [...o.values()]));
      }
      return {
        type: P.State,
        name: n.name,
        style: r,
        options: i ? { params: i } : null,
      };
    }
    visitTransition(n, e) {
      (e.queryCount = 0), (e.depCount = 0);
      let r = rt(this, ao(n.animation), e),
        i = FM(n.expr, e.errors);
      return {
        type: P.Transition,
        matchers: i,
        animation: r,
        queryCount: e.queryCount,
        depCount: e.depCount,
        options: or(n.options),
      };
    }
    visitSequence(n, e) {
      return {
        type: P.Sequence,
        steps: n.steps.map((r) => rt(this, r, e)),
        options: or(n.options),
      };
    }
    visitGroup(n, e) {
      let r = e.currentTime,
        i = 0,
        o = n.steps.map((s) => {
          e.currentTime = r;
          let a = rt(this, s, e);
          return (i = Math.max(i, e.currentTime)), a;
        });
      return (
        (e.currentTime = i), { type: P.Group, steps: o, options: or(n.options) }
      );
    }
    visitAnimate(n, e) {
      let r = $M(n.timings, e.errors);
      e.currentAnimateTimings = r;
      let i,
        o = n.styles ? n.styles : ei({});
      if (o.type == P.Keyframes) i = this.visitKeyframes(o, e);
      else {
        let s = n.styles,
          a = !1;
        if (!s) {
          a = !0;
          let c = {};
          r.easing && (c.easing = r.easing), (s = ei(c));
        }
        e.currentTime += r.duration + r.delay;
        let l = this.visitStyle(s, e);
        (l.isEmptyStep = a), (i = l);
      }
      return (
        (e.currentAnimateTimings = null),
        { type: P.Animate, timings: r, style: i, options: null }
      );
    }
    visitStyle(n, e) {
      let r = this._makeStyleAst(n, e);
      return this._validateStyleAst(r, e), r;
    }
    _makeStyleAst(n, e) {
      let r = [],
        i = Array.isArray(n.styles) ? n.styles : [n.styles];
      for (let a of i)
        typeof a == "string"
          ? a === Wt
            ? r.push(a)
            : e.errors.push(eM(a))
          : r.push(new Map(Object.entries(a)));
      let o = !1,
        s = null;
      return (
        r.forEach((a) => {
          if (
            a instanceof Map &&
            (a.has("easing") && ((s = a.get("easing")), a.delete("easing")), !o)
          ) {
            for (let l of a.values())
              if (l.toString().indexOf(yv) >= 0) {
                o = !0;
                break;
              }
          }
        }),
        {
          type: P.Style,
          styles: r,
          easing: s,
          offset: n.offset,
          containsDynamicStyles: o,
          options: null,
        }
      );
    }
    _validateStyleAst(n, e) {
      let r = e.currentAnimateTimings,
        i = e.currentTime,
        o = e.currentTime;
      r && o > 0 && (o -= r.duration + r.delay),
        n.styles.forEach((s) => {
          typeof s != "string" &&
            s.forEach((a, l) => {
              let c = e.collectedStyles.get(e.currentQuerySelector),
                u = c.get(l),
                d = !0;
              u &&
                (o != i &&
                  o >= u.startTime &&
                  i <= u.endTime &&
                  (e.errors.push(tM(l, u.startTime, u.endTime, o, i)),
                  (d = !1)),
                (o = u.startTime)),
                d && c.set(l, { startTime: o, endTime: i }),
                e.options && xM(a, e.options, e.errors);
            });
        });
    }
    visitKeyframes(n, e) {
      let r = { type: P.Keyframes, styles: [], options: null };
      if (!e.currentAnimateTimings) return e.errors.push(nM()), r;
      let i = 1,
        o = 0,
        s = [],
        a = !1,
        l = !1,
        c = 0,
        u = n.steps.map((M) => {
          let z = this._makeStyleAst(M, e),
            Z = z.offset != null ? z.offset : UM(z.styles),
            ie = 0;
          return (
            Z != null && (o++, (ie = z.offset = Z)),
            (l = l || ie < 0 || ie > 1),
            (a = a || ie < c),
            (c = ie),
            s.push(ie),
            z
          );
        });
      l && e.errors.push(rM()), a && e.errors.push(iM());
      let d = n.steps.length,
        f = 0;
      o > 0 && o < d ? e.errors.push(oM()) : o == 0 && (f = i / (d - 1));
      let h = d - 1,
        p = e.currentTime,
        y = e.currentAnimateTimings,
        T = y.duration;
      return (
        u.forEach((M, z) => {
          let Z = f > 0 ? (z == h ? 1 : f * z) : s[z],
            ie = Z * T;
          (e.currentTime = p + y.delay + ie),
            (y.duration = ie),
            this._validateStyleAst(M, e),
            (M.offset = Z),
            r.styles.push(M);
        }),
        r
      );
    }
    visitReference(n, e) {
      return {
        type: P.Reference,
        animation: rt(this, ao(n.animation), e),
        options: or(n.options),
      };
    }
    visitAnimateChild(n, e) {
      return e.depCount++, { type: P.AnimateChild, options: or(n.options) };
    }
    visitAnimateRef(n, e) {
      return {
        type: P.AnimateRef,
        animation: this.visitReference(n.animation, e),
        options: or(n.options),
      };
    }
    visitQuery(n, e) {
      let r = e.currentQuerySelector,
        i = n.options || {};
      e.queryCount++, (e.currentQuery = n);
      let [o, s] = VM(n.selector);
      (e.currentQuerySelector = r.length ? r + " " + o : o),
        it(e.collectedStyles, e.currentQuerySelector, new Map());
      let a = rt(this, ao(n.animation), e);
      return (
        (e.currentQuery = null),
        (e.currentQuerySelector = r),
        {
          type: P.Query,
          selector: o,
          limit: i.limit || 0,
          optional: !!i.optional,
          includeSelf: s,
          animation: a,
          originalSelector: n.selector,
          options: or(n.options),
        }
      );
    }
    visitStagger(n, e) {
      e.currentQuery || e.errors.push(sM());
      let r =
        n.timings === "full"
          ? { duration: 0, delay: 0, easing: "full" }
          : Oa(n.timings, e.errors, !0);
      return {
        type: P.Stagger,
        animation: rt(this, ao(n.animation), e),
        timings: r,
        options: null,
      };
    }
  };
function VM(t) {
  let n = !!t.split(/\s*,\s*/).find((e) => e == Dv);
  return (
    n && (t = t.replace(jM, "")),
    (t = t
      .replace(/@\*/g, Ra)
      .replace(/@\w+/g, (e) => Ra + "-" + e.slice(1))
      .replace(/:animating/g, Rd)),
    [t, n]
  );
}
function BM(t) {
  return t ? w({}, t) : null;
}
var Ld = class {
  constructor(n) {
    (this.errors = n),
      (this.queryCount = 0),
      (this.depCount = 0),
      (this.currentTransition = null),
      (this.currentQuery = null),
      (this.currentQuerySelector = null),
      (this.currentAnimateTimings = null),
      (this.currentTime = 0),
      (this.collectedStyles = new Map()),
      (this.options = null),
      (this.unsupportedCSSPropertiesFound = new Set());
  }
};
function UM(t) {
  if (typeof t == "string") return null;
  let n = null;
  if (Array.isArray(t))
    t.forEach((e) => {
      if (e instanceof Map && e.has("offset")) {
        let r = e;
        (n = parseFloat(r.get("offset"))), r.delete("offset");
      }
    });
  else if (t instanceof Map && t.has("offset")) {
    let e = t;
    (n = parseFloat(e.get("offset"))), e.delete("offset");
  }
  return n;
}
function $M(t, n) {
  if (t.hasOwnProperty("duration")) return t;
  if (typeof t == "number") {
    let o = Oa(t, n).duration;
    return Sd(o, 0, "");
  }
  let e = t;
  if (e.split(/\s+/).some((o) => o.charAt(0) == "{" && o.charAt(1) == "{")) {
    let o = Sd(0, 0, "");
    return (o.dynamic = !0), (o.strValue = e), o;
  }
  let i = Oa(e, n);
  return Sd(i.duration, i.delay, i.easing);
}
function or(t) {
  return (
    t ? ((t = w({}, t)), t.params && (t.params = BM(t.params))) : (t = {}), t
  );
}
function Sd(t, n, e) {
  return { duration: t, delay: n, easing: e };
}
function Jd(t, n, e, r, i, o, s = null, a = !1) {
  return {
    type: 1,
    element: t,
    keyframes: n,
    preStyleProps: e,
    postStyleProps: r,
    duration: i,
    delay: o,
    totalTime: i + o,
    easing: s,
    subTimeline: a,
  };
}
var uo = class {
    constructor() {
      this._map = new Map();
    }
    get(n) {
      return this._map.get(n) || [];
    }
    append(n, e) {
      let r = this._map.get(n);
      r || this._map.set(n, (r = [])), r.push(...e);
    }
    has(n) {
      return this._map.has(n);
    }
    clear() {
      this._map.clear();
    }
  },
  HM = 1,
  zM = ":enter",
  WM = new RegExp(zM, "g"),
  qM = ":leave",
  GM = new RegExp(qM, "g");
function Cv(t, n, e, r, i, o = new Map(), s = new Map(), a, l, c = []) {
  return new kd().buildKeyframes(t, n, e, r, i, o, s, a, l, c);
}
var kd = class {
    buildKeyframes(n, e, r, i, o, s, a, l, c, u = []) {
      c = c || new uo();
      let d = new jd(n, e, c, i, o, u, []);
      d.options = l;
      let f = l.delay ? un(l.delay) : 0;
      d.currentTimeline.delayNextStep(f),
        d.currentTimeline.setStyles([s], null, d.errors, l),
        rt(this, r, d);
      let h = d.timelines.filter((p) => p.containsAnimation());
      if (h.length && a.size) {
        let p;
        for (let y = h.length - 1; y >= 0; y--) {
          let T = h[y];
          if (T.element === e) {
            p = T;
            break;
          }
        }
        p &&
          !p.allowOnlyTimelineStyles() &&
          p.setStyles([a], null, d.errors, l);
      }
      return h.length
        ? h.map((p) => p.buildKeyframes())
        : [Jd(e, [], [], [], 0, f, "", !1)];
    }
    visitTrigger(n, e) {}
    visitState(n, e) {}
    visitTransition(n, e) {}
    visitAnimateChild(n, e) {
      let r = e.subInstructions.get(e.element);
      if (r) {
        let i = e.createSubContext(n.options),
          o = e.currentTimeline.currentTime,
          s = this._visitSubInstructions(r, i, i.options);
        o != s && e.transformIntoNewTimeline(s);
      }
      e.previousNode = n;
    }
    visitAnimateRef(n, e) {
      let r = e.createSubContext(n.options);
      r.transformIntoNewTimeline(),
        this._applyAnimationRefDelays([n.options, n.animation.options], e, r),
        this.visitReference(n.animation, r),
        e.transformIntoNewTimeline(r.currentTimeline.currentTime),
        (e.previousNode = n);
    }
    _applyAnimationRefDelays(n, e, r) {
      for (let i of n) {
        let o = i?.delay;
        if (o) {
          let s =
            typeof o == "number" ? o : un(co(o, i?.params ?? {}, e.errors));
          r.delayNextStep(s);
        }
      }
    }
    _visitSubInstructions(n, e, r) {
      let o = e.currentTimeline.currentTime,
        s = r.duration != null ? un(r.duration) : null,
        a = r.delay != null ? un(r.delay) : null;
      return (
        s !== 0 &&
          n.forEach((l) => {
            let c = e.appendInstructionToTimeline(l, s, a);
            o = Math.max(o, c.duration + c.delay);
          }),
        o
      );
    }
    visitReference(n, e) {
      e.updateOptions(n.options, !0),
        rt(this, n.animation, e),
        (e.previousNode = n);
    }
    visitSequence(n, e) {
      let r = e.subContextCount,
        i = e,
        o = n.options;
      if (
        o &&
        (o.params || o.delay) &&
        ((i = e.createSubContext(o)),
        i.transformIntoNewTimeline(),
        o.delay != null)
      ) {
        i.previousNode.type == P.Style &&
          (i.currentTimeline.snapshotCurrentStyles(), (i.previousNode = La));
        let s = un(o.delay);
        i.delayNextStep(s);
      }
      n.steps.length &&
        (n.steps.forEach((s) => rt(this, s, i)),
        i.currentTimeline.applyStylesToKeyframe(),
        i.subContextCount > r && i.transformIntoNewTimeline()),
        (e.previousNode = n);
    }
    visitGroup(n, e) {
      let r = [],
        i = e.currentTimeline.currentTime,
        o = n.options && n.options.delay ? un(n.options.delay) : 0;
      n.steps.forEach((s) => {
        let a = e.createSubContext(n.options);
        o && a.delayNextStep(o),
          rt(this, s, a),
          (i = Math.max(i, a.currentTimeline.currentTime)),
          r.push(a.currentTimeline);
      }),
        r.forEach((s) => e.currentTimeline.mergeTimelineCollectedStyles(s)),
        e.transformIntoNewTimeline(i),
        (e.previousNode = n);
    }
    _visitTiming(n, e) {
      if (n.dynamic) {
        let r = n.strValue,
          i = e.params ? co(r, e.params, e.errors) : r;
        return Oa(i, e.errors);
      } else return { duration: n.duration, delay: n.delay, easing: n.easing };
    }
    visitAnimate(n, e) {
      let r = (e.currentAnimateTimings = this._visitTiming(n.timings, e)),
        i = e.currentTimeline;
      r.delay && (e.incrementTime(r.delay), i.snapshotCurrentStyles());
      let o = n.style;
      o.type == P.Keyframes
        ? this.visitKeyframes(o, e)
        : (e.incrementTime(r.duration),
          this.visitStyle(o, e),
          i.applyStylesToKeyframe()),
        (e.currentAnimateTimings = null),
        (e.previousNode = n);
    }
    visitStyle(n, e) {
      let r = e.currentTimeline,
        i = e.currentAnimateTimings;
      !i && r.hasCurrentStyleProperties() && r.forwardFrame();
      let o = (i && i.easing) || n.easing;
      n.isEmptyStep
        ? r.applyEmptyStep(o)
        : r.setStyles(n.styles, o, e.errors, e.options),
        (e.previousNode = n);
    }
    visitKeyframes(n, e) {
      let r = e.currentAnimateTimings,
        i = e.currentTimeline.duration,
        o = r.duration,
        a = e.createSubContext().currentTimeline;
      (a.easing = r.easing),
        n.styles.forEach((l) => {
          let c = l.offset || 0;
          a.forwardTime(c * o),
            a.setStyles(l.styles, l.easing, e.errors, e.options),
            a.applyStylesToKeyframe();
        }),
        e.currentTimeline.mergeTimelineCollectedStyles(a),
        e.transformIntoNewTimeline(i + o),
        (e.previousNode = n);
    }
    visitQuery(n, e) {
      let r = e.currentTimeline.currentTime,
        i = n.options || {},
        o = i.delay ? un(i.delay) : 0;
      o &&
        (e.previousNode.type === P.Style ||
          (r == 0 && e.currentTimeline.hasCurrentStyleProperties())) &&
        (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = La));
      let s = r,
        a = e.invokeQuery(
          n.selector,
          n.originalSelector,
          n.limit,
          n.includeSelf,
          !!i.optional,
          e.errors
        );
      e.currentQueryTotal = a.length;
      let l = null;
      a.forEach((c, u) => {
        e.currentQueryIndex = u;
        let d = e.createSubContext(n.options, c);
        o && d.delayNextStep(o),
          c === e.element && (l = d.currentTimeline),
          rt(this, n.animation, d),
          d.currentTimeline.applyStylesToKeyframe();
        let f = d.currentTimeline.currentTime;
        s = Math.max(s, f);
      }),
        (e.currentQueryIndex = 0),
        (e.currentQueryTotal = 0),
        e.transformIntoNewTimeline(s),
        l &&
          (e.currentTimeline.mergeTimelineCollectedStyles(l),
          e.currentTimeline.snapshotCurrentStyles()),
        (e.previousNode = n);
    }
    visitStagger(n, e) {
      let r = e.parentContext,
        i = e.currentTimeline,
        o = n.timings,
        s = Math.abs(o.duration),
        a = s * (e.currentQueryTotal - 1),
        l = s * e.currentQueryIndex;
      switch (o.duration < 0 ? "reverse" : o.easing) {
        case "reverse":
          l = a - l;
          break;
        case "full":
          l = r.currentStaggerTime;
          break;
      }
      let u = e.currentTimeline;
      l && u.delayNextStep(l);
      let d = u.currentTime;
      rt(this, n.animation, e),
        (e.previousNode = n),
        (r.currentStaggerTime =
          i.currentTime - d + (i.startTime - r.currentTimeline.startTime));
    }
  },
  La = {},
  jd = class t {
    constructor(n, e, r, i, o, s, a, l) {
      (this._driver = n),
        (this.element = e),
        (this.subInstructions = r),
        (this._enterClassName = i),
        (this._leaveClassName = o),
        (this.errors = s),
        (this.timelines = a),
        (this.parentContext = null),
        (this.currentAnimateTimings = null),
        (this.previousNode = La),
        (this.subContextCount = 0),
        (this.options = {}),
        (this.currentQueryIndex = 0),
        (this.currentQueryTotal = 0),
        (this.currentStaggerTime = 0),
        (this.currentTimeline = l || new ka(this._driver, e, 0)),
        a.push(this.currentTimeline);
    }
    get params() {
      return this.options.params;
    }
    updateOptions(n, e) {
      if (!n) return;
      let r = n,
        i = this.options;
      r.duration != null && (i.duration = un(r.duration)),
        r.delay != null && (i.delay = un(r.delay));
      let o = r.params;
      if (o) {
        let s = i.params;
        s || (s = this.options.params = {}),
          Object.keys(o).forEach((a) => {
            (!e || !s.hasOwnProperty(a)) && (s[a] = co(o[a], s, this.errors));
          });
      }
    }
    _copyOptions() {
      let n = {};
      if (this.options) {
        let e = this.options.params;
        if (e) {
          let r = (n.params = {});
          Object.keys(e).forEach((i) => {
            r[i] = e[i];
          });
        }
      }
      return n;
    }
    createSubContext(n = null, e, r) {
      let i = e || this.element,
        o = new t(
          this._driver,
          i,
          this.subInstructions,
          this._enterClassName,
          this._leaveClassName,
          this.errors,
          this.timelines,
          this.currentTimeline.fork(i, r || 0)
        );
      return (
        (o.previousNode = this.previousNode),
        (o.currentAnimateTimings = this.currentAnimateTimings),
        (o.options = this._copyOptions()),
        o.updateOptions(n),
        (o.currentQueryIndex = this.currentQueryIndex),
        (o.currentQueryTotal = this.currentQueryTotal),
        (o.parentContext = this),
        this.subContextCount++,
        o
      );
    }
    transformIntoNewTimeline(n) {
      return (
        (this.previousNode = La),
        (this.currentTimeline = this.currentTimeline.fork(this.element, n)),
        this.timelines.push(this.currentTimeline),
        this.currentTimeline
      );
    }
    appendInstructionToTimeline(n, e, r) {
      let i = {
          duration: e ?? n.duration,
          delay: this.currentTimeline.currentTime + (r ?? 0) + n.delay,
          easing: "",
        },
        o = new Vd(
          this._driver,
          n.element,
          n.keyframes,
          n.preStyleProps,
          n.postStyleProps,
          i,
          n.stretchStartingKeyframe
        );
      return this.timelines.push(o), i;
    }
    incrementTime(n) {
      this.currentTimeline.forwardTime(this.currentTimeline.duration + n);
    }
    delayNextStep(n) {
      n > 0 && this.currentTimeline.delayNextStep(n);
    }
    invokeQuery(n, e, r, i, o, s) {
      let a = [];
      if ((i && a.push(this.element), n.length > 0)) {
        (n = n.replace(WM, "." + this._enterClassName)),
          (n = n.replace(GM, "." + this._leaveClassName));
        let l = r != 1,
          c = this._driver.query(this.element, n, l);
        r !== 0 &&
          (c = r < 0 ? c.slice(c.length + r, c.length) : c.slice(0, r)),
          a.push(...c);
      }
      return !o && a.length == 0 && s.push(aM(e)), a;
    }
  },
  ka = class t {
    constructor(n, e, r, i) {
      (this._driver = n),
        (this.element = e),
        (this.startTime = r),
        (this._elementTimelineStylesLookup = i),
        (this.duration = 0),
        (this.easing = null),
        (this._previousKeyframe = new Map()),
        (this._currentKeyframe = new Map()),
        (this._keyframes = new Map()),
        (this._styleSummary = new Map()),
        (this._localTimelineStyles = new Map()),
        (this._pendingStyles = new Map()),
        (this._backFill = new Map()),
        (this._currentEmptyStepKeyframe = null),
        this._elementTimelineStylesLookup ||
          (this._elementTimelineStylesLookup = new Map()),
        (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(e)),
        this._globalTimelineStyles ||
          ((this._globalTimelineStyles = this._localTimelineStyles),
          this._elementTimelineStylesLookup.set(e, this._localTimelineStyles)),
        this._loadKeyframe();
    }
    containsAnimation() {
      switch (this._keyframes.size) {
        case 0:
          return !1;
        case 1:
          return this.hasCurrentStyleProperties();
        default:
          return !0;
      }
    }
    hasCurrentStyleProperties() {
      return this._currentKeyframe.size > 0;
    }
    get currentTime() {
      return this.startTime + this.duration;
    }
    delayNextStep(n) {
      let e = this._keyframes.size === 1 && this._pendingStyles.size;
      this.duration || e
        ? (this.forwardTime(this.currentTime + n),
          e && this.snapshotCurrentStyles())
        : (this.startTime += n);
    }
    fork(n, e) {
      return (
        this.applyStylesToKeyframe(),
        new t(
          this._driver,
          n,
          e || this.currentTime,
          this._elementTimelineStylesLookup
        )
      );
    }
    _loadKeyframe() {
      this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
        (this._currentKeyframe = this._keyframes.get(this.duration)),
        this._currentKeyframe ||
          ((this._currentKeyframe = new Map()),
          this._keyframes.set(this.duration, this._currentKeyframe));
    }
    forwardFrame() {
      (this.duration += HM), this._loadKeyframe();
    }
    forwardTime(n) {
      this.applyStylesToKeyframe(), (this.duration = n), this._loadKeyframe();
    }
    _updateStyle(n, e) {
      this._localTimelineStyles.set(n, e),
        this._globalTimelineStyles.set(n, e),
        this._styleSummary.set(n, { time: this.currentTime, value: e });
    }
    allowOnlyTimelineStyles() {
      return this._currentEmptyStepKeyframe !== this._currentKeyframe;
    }
    applyEmptyStep(n) {
      n && this._previousKeyframe.set("easing", n);
      for (let [e, r] of this._globalTimelineStyles)
        this._backFill.set(e, r || Wt), this._currentKeyframe.set(e, Wt);
      this._currentEmptyStepKeyframe = this._currentKeyframe;
    }
    setStyles(n, e, r, i) {
      e && this._previousKeyframe.set("easing", e);
      let o = (i && i.params) || {},
        s = KM(n, this._globalTimelineStyles);
      for (let [a, l] of s) {
        let c = co(l, o, r);
        this._pendingStyles.set(a, c),
          this._localTimelineStyles.has(a) ||
            this._backFill.set(a, this._globalTimelineStyles.get(a) ?? Wt),
          this._updateStyle(a, c);
      }
    }
    applyStylesToKeyframe() {
      this._pendingStyles.size != 0 &&
        (this._pendingStyles.forEach((n, e) => {
          this._currentKeyframe.set(e, n);
        }),
        this._pendingStyles.clear(),
        this._localTimelineStyles.forEach((n, e) => {
          this._currentKeyframe.has(e) || this._currentKeyframe.set(e, n);
        }));
    }
    snapshotCurrentStyles() {
      for (let [n, e] of this._localTimelineStyles)
        this._pendingStyles.set(n, e), this._updateStyle(n, e);
    }
    getFinalKeyframe() {
      return this._keyframes.get(this.duration);
    }
    get properties() {
      let n = [];
      for (let e in this._currentKeyframe) n.push(e);
      return n;
    }
    mergeTimelineCollectedStyles(n) {
      n._styleSummary.forEach((e, r) => {
        let i = this._styleSummary.get(r);
        (!i || e.time > i.time) && this._updateStyle(r, e.value);
      });
    }
    buildKeyframes() {
      this.applyStylesToKeyframe();
      let n = new Set(),
        e = new Set(),
        r = this._keyframes.size === 1 && this.duration === 0,
        i = [];
      this._keyframes.forEach((a, l) => {
        let c = new Map([...this._backFill, ...a]);
        c.forEach((u, d) => {
          u === Ia ? n.add(d) : u === Wt && e.add(d);
        }),
          r || c.set("offset", l / this.duration),
          i.push(c);
      });
      let o = [...n.values()],
        s = [...e.values()];
      if (r) {
        let a = i[0],
          l = new Map(a);
        a.set("offset", 0), l.set("offset", 1), (i = [a, l]);
      }
      return Jd(
        this.element,
        i,
        o,
        s,
        this.duration,
        this.startTime,
        this.easing,
        !1
      );
    }
  },
  Vd = class extends ka {
    constructor(n, e, r, i, o, s, a = !1) {
      super(n, e, s.delay),
        (this.keyframes = r),
        (this.preStyleProps = i),
        (this.postStyleProps = o),
        (this._stretchStartingKeyframe = a),
        (this.timings = {
          duration: s.duration,
          delay: s.delay,
          easing: s.easing,
        });
    }
    containsAnimation() {
      return this.keyframes.length > 1;
    }
    buildKeyframes() {
      let n = this.keyframes,
        { delay: e, duration: r, easing: i } = this.timings;
      if (this._stretchStartingKeyframe && e) {
        let o = [],
          s = r + e,
          a = e / s,
          l = new Map(n[0]);
        l.set("offset", 0), o.push(l);
        let c = new Map(n[0]);
        c.set("offset", sv(a)), o.push(c);
        let u = n.length - 1;
        for (let d = 1; d <= u; d++) {
          let f = new Map(n[d]),
            h = f.get("offset"),
            p = e + h * r;
          f.set("offset", sv(p / s)), o.push(f);
        }
        (r = s), (e = 0), (i = ""), (n = o);
      }
      return Jd(
        this.element,
        n,
        this.preStyleProps,
        this.postStyleProps,
        r,
        e,
        i,
        !0
      );
    }
  };
function sv(t, n = 3) {
  let e = Math.pow(10, n - 1);
  return Math.round(t * e) / e;
}
function KM(t, n) {
  let e = new Map(),
    r;
  return (
    t.forEach((i) => {
      if (i === "*") {
        r ??= n.keys();
        for (let o of r) e.set(o, Wt);
      } else for (let [o, s] of i) e.set(o, s);
    }),
    e
  );
}
function av(t, n, e, r, i, o, s, a, l, c, u, d, f) {
  return {
    type: 0,
    element: t,
    triggerName: n,
    isRemovalTransition: i,
    fromState: e,
    fromStyles: o,
    toState: r,
    toStyles: s,
    timelines: a,
    queriedElements: l,
    preStyleProps: c,
    postStyleProps: u,
    totalTime: d,
    errors: f,
  };
}
var Td = {},
  ja = class {
    constructor(n, e, r) {
      (this._triggerName = n), (this.ast = e), (this._stateStyles = r);
    }
    match(n, e, r, i) {
      return QM(this.ast.matchers, n, e, r, i);
    }
    buildStyles(n, e, r) {
      let i = this._stateStyles.get("*");
      return (
        n !== void 0 && (i = this._stateStyles.get(n?.toString()) || i),
        i ? i.buildStyles(e, r) : new Map()
      );
    }
    build(n, e, r, i, o, s, a, l, c, u) {
      let d = [],
        f = (this.ast.options && this.ast.options.params) || Td,
        h = (a && a.params) || Td,
        p = this.buildStyles(r, h, d),
        y = (l && l.params) || Td,
        T = this.buildStyles(i, y, d),
        M = new Set(),
        z = new Map(),
        Z = new Map(),
        ie = i === "void",
        $e = { params: bv(y, f), delay: this.ast.options?.delay },
        de = u ? [] : Cv(n, e, this.ast.animation, o, s, p, T, $e, c, d),
        fe = 0;
      return (
        de.forEach((we) => {
          fe = Math.max(we.duration + we.delay, fe);
        }),
        d.length
          ? av(e, this._triggerName, r, i, ie, p, T, [], [], z, Z, fe, d)
          : (de.forEach((we) => {
              let Gt = we.element,
                dn = it(z, Gt, new Set());
              we.preStyleProps.forEach((On) => dn.add(On));
              let ef = it(Z, Gt, new Set());
              we.postStyleProps.forEach((On) => ef.add(On)),
                Gt !== e && M.add(Gt);
            }),
            av(
              e,
              this._triggerName,
              r,
              i,
              ie,
              p,
              T,
              de,
              [...M.values()],
              z,
              Z,
              fe
            ))
      );
    }
  };
function QM(t, n, e, r, i) {
  return t.some((o) => o(n, e, r, i));
}
function bv(t, n) {
  let e = w({}, n);
  return (
    Object.entries(t).forEach(([r, i]) => {
      i != null && (e[r] = i);
    }),
    e
  );
}
var Bd = class {
  constructor(n, e, r) {
    (this.styles = n), (this.defaultParams = e), (this.normalizer = r);
  }
  buildStyles(n, e) {
    let r = new Map(),
      i = bv(n, this.defaultParams);
    return (
      this.styles.styles.forEach((o) => {
        typeof o != "string" &&
          o.forEach((s, a) => {
            s && (s = co(s, i, e));
            let l = this.normalizer.normalizePropertyName(a, e);
            (s = this.normalizer.normalizeStyleValue(a, l, s, e)), r.set(a, s);
          });
      }),
      r
    );
  }
};
function YM(t, n, e) {
  return new Ud(t, n, e);
}
var Ud = class {
  constructor(n, e, r) {
    (this.name = n),
      (this.ast = e),
      (this._normalizer = r),
      (this.transitionFactories = []),
      (this.states = new Map()),
      e.states.forEach((i) => {
        let o = (i.options && i.options.params) || {};
        this.states.set(i.name, new Bd(i.style, o, r));
      }),
      lv(this.states, "true", "1"),
      lv(this.states, "false", "0"),
      e.transitions.forEach((i) => {
        this.transitionFactories.push(new ja(n, i, this.states));
      }),
      (this.fallbackTransition = ZM(n, this.states, this._normalizer));
  }
  get containsQueries() {
    return this.ast.queryCount > 0;
  }
  matchTransition(n, e, r, i) {
    return this.transitionFactories.find((s) => s.match(n, e, r, i)) || null;
  }
  matchStyles(n, e, r) {
    return this.fallbackTransition.buildStyles(n, e, r);
  }
};
function ZM(t, n, e) {
  let r = [(s, a) => !0],
    i = { type: P.Sequence, steps: [], options: null },
    o = {
      type: P.Transition,
      animation: i,
      matchers: r,
      options: null,
      queryCount: 0,
      depCount: 0,
    };
  return new ja(t, o, n);
}
function lv(t, n, e) {
  t.has(n) ? t.has(e) || t.set(e, t.get(n)) : t.has(e) && t.set(n, t.get(e));
}
var XM = new uo(),
  $d = class {
    constructor(n, e, r) {
      (this.bodyNode = n),
        (this._driver = e),
        (this._normalizer = r),
        (this._animations = new Map()),
        (this._playersById = new Map()),
        (this.players = []);
    }
    register(n, e) {
      let r = [],
        i = [],
        o = wv(this._driver, e, r, i);
      if (r.length) throw fM(r);
      i.length && void 0, this._animations.set(n, o);
    }
    _buildPlayer(n, e, r) {
      let i = n.element,
        o = pv(this._normalizer, n.keyframes, e, r);
      return this._driver.animate(i, o, n.duration, n.delay, n.easing, [], !0);
    }
    create(n, e, r = {}) {
      let i = [],
        o = this._animations.get(n),
        s,
        a = new Map();
      if (
        (o
          ? ((s = Cv(
              this._driver,
              e,
              o,
              vv,
              Nd,
              new Map(),
              new Map(),
              r,
              XM,
              i
            )),
            s.forEach((u) => {
              let d = it(a, u.element, new Map());
              u.postStyleProps.forEach((f) => d.set(f, null));
            }))
          : (i.push(hM()), (s = [])),
        i.length)
      )
        throw pM(i);
      a.forEach((u, d) => {
        u.forEach((f, h) => {
          u.set(h, this._driver.computeStyle(d, h, Wt));
        });
      });
      let l = s.map((u) => {
          let d = a.get(u.element);
          return this._buildPlayer(u, new Map(), d);
        }),
        c = Rn(l);
      return (
        this._playersById.set(n, c),
        c.onDestroy(() => this.destroy(n)),
        this.players.push(c),
        c
      );
    }
    destroy(n) {
      let e = this._getPlayer(n);
      e.destroy(), this._playersById.delete(n);
      let r = this.players.indexOf(e);
      r >= 0 && this.players.splice(r, 1);
    }
    _getPlayer(n) {
      let e = this._playersById.get(n);
      if (!e) throw mM(n);
      return e;
    }
    listen(n, e, r, i) {
      let o = Kd(e, "", "", "");
      return Gd(this._getPlayer(n), r, o, i), () => {};
    }
    command(n, e, r, i) {
      if (r == "register") {
        this.register(n, i[0]);
        return;
      }
      if (r == "create") {
        let s = i[0] || {};
        this.create(n, e, s);
        return;
      }
      let o = this._getPlayer(n);
      switch (r) {
        case "play":
          o.play();
          break;
        case "pause":
          o.pause();
          break;
        case "reset":
          o.reset();
          break;
        case "restart":
          o.restart();
          break;
        case "finish":
          o.finish();
          break;
        case "init":
          o.init();
          break;
        case "setPosition":
          o.setPosition(parseFloat(i[0]));
          break;
        case "destroy":
          this.destroy(n);
          break;
      }
    }
  },
  cv = "ng-animate-queued",
  JM = ".ng-animate-queued",
  Md = "ng-animate-disabled",
  eA = ".ng-animate-disabled",
  tA = "ng-star-inserted",
  nA = ".ng-star-inserted",
  rA = [],
  Iv = {
    namespaceId: "",
    setForRemoval: !1,
    setForMove: !1,
    hasAnimation: !1,
    removedBeforeQueried: !1,
  },
  iA = {
    namespaceId: "",
    setForMove: !1,
    setForRemoval: !1,
    hasAnimation: !1,
    removedBeforeQueried: !0,
  },
  St = "__ng_removed",
  fo = class {
    get params() {
      return this.options.params;
    }
    constructor(n, e = "") {
      this.namespaceId = e;
      let r = n && n.hasOwnProperty("value"),
        i = r ? n.value : n;
      if (((this.value = sA(i)), r)) {
        let o = n,
          { value: s } = o,
          a = go(o, ["value"]);
        this.options = a;
      } else this.options = {};
      this.options.params || (this.options.params = {});
    }
    absorbOptions(n) {
      let e = n.params;
      if (e) {
        let r = this.options.params;
        Object.keys(e).forEach((i) => {
          r[i] == null && (r[i] = e[i]);
        });
      }
    }
  },
  lo = "void",
  Ad = new fo(lo),
  Hd = class {
    constructor(n, e, r) {
      (this.id = n),
        (this.hostElement = e),
        (this._engine = r),
        (this.players = []),
        (this._triggers = new Map()),
        (this._queue = []),
        (this._elementListeners = new Map()),
        (this._hostClassName = "ng-tns-" + n),
        pt(e, this._hostClassName);
    }
    listen(n, e, r, i) {
      if (!this._triggers.has(e)) throw gM(r, e);
      if (r == null || r.length == 0) throw yM(e);
      if (!aA(r)) throw vM(r, e);
      let o = it(this._elementListeners, n, []),
        s = { name: e, phase: r, callback: i };
      o.push(s);
      let a = it(this._engine.statesByElement, n, new Map());
      return (
        a.has(e) || (pt(n, Ta), pt(n, Ta + "-" + e), a.set(e, Ad)),
        () => {
          this._engine.afterFlush(() => {
            let l = o.indexOf(s);
            l >= 0 && o.splice(l, 1), this._triggers.has(e) || a.delete(e);
          });
        }
      );
    }
    register(n, e) {
      return this._triggers.has(n) ? !1 : (this._triggers.set(n, e), !0);
    }
    _getTrigger(n) {
      let e = this._triggers.get(n);
      if (!e) throw EM(n);
      return e;
    }
    trigger(n, e, r, i = !0) {
      let o = this._getTrigger(e),
        s = new ho(this.id, e, n),
        a = this._engine.statesByElement.get(n);
      a ||
        (pt(n, Ta),
        pt(n, Ta + "-" + e),
        this._engine.statesByElement.set(n, (a = new Map())));
      let l = a.get(e),
        c = new fo(r, this.id);
      if (
        (!(r && r.hasOwnProperty("value")) && l && c.absorbOptions(l.options),
        a.set(e, c),
        l || (l = Ad),
        !(c.value === lo) && l.value === c.value)
      ) {
        if (!uA(l.params, c.params)) {
          let y = [],
            T = o.matchStyles(l.value, l.params, y),
            M = o.matchStyles(c.value, c.params, y);
          y.length
            ? this._engine.reportError(y)
            : this._engine.afterFlush(() => {
                sr(n, T), qt(n, M);
              });
        }
        return;
      }
      let f = it(this._engine.playersByElement, n, []);
      f.forEach((y) => {
        y.namespaceId == this.id &&
          y.triggerName == e &&
          y.queued &&
          y.destroy();
      });
      let h = o.matchTransition(l.value, c.value, n, c.params),
        p = !1;
      if (!h) {
        if (!i) return;
        (h = o.fallbackTransition), (p = !0);
      }
      return (
        this._engine.totalQueuedPlayers++,
        this._queue.push({
          element: n,
          triggerName: e,
          transition: h,
          fromState: l,
          toState: c,
          player: s,
          isFallbackTransition: p,
        }),
        p ||
          (pt(n, cv),
          s.onStart(() => {
            ti(n, cv);
          })),
        s.onDone(() => {
          let y = this.players.indexOf(s);
          y >= 0 && this.players.splice(y, 1);
          let T = this._engine.playersByElement.get(n);
          if (T) {
            let M = T.indexOf(s);
            M >= 0 && T.splice(M, 1);
          }
        }),
        this.players.push(s),
        f.push(s),
        s
      );
    }
    deregister(n) {
      this._triggers.delete(n),
        this._engine.statesByElement.forEach((e) => e.delete(n)),
        this._elementListeners.forEach((e, r) => {
          this._elementListeners.set(
            r,
            e.filter((i) => i.name != n)
          );
        });
    }
    clearElementCache(n) {
      this._engine.statesByElement.delete(n), this._elementListeners.delete(n);
      let e = this._engine.playersByElement.get(n);
      e &&
        (e.forEach((r) => r.destroy()),
        this._engine.playersByElement.delete(n));
    }
    _signalRemovalForInnerTriggers(n, e) {
      let r = this._engine.driver.query(n, Ra, !0);
      r.forEach((i) => {
        if (i[St]) return;
        let o = this._engine.fetchNamespacesByElement(i);
        o.size
          ? o.forEach((s) => s.triggerLeaveAnimation(i, e, !1, !0))
          : this.clearElementCache(i);
      }),
        this._engine.afterFlushAnimationsDone(() =>
          r.forEach((i) => this.clearElementCache(i))
        );
    }
    triggerLeaveAnimation(n, e, r, i) {
      let o = this._engine.statesByElement.get(n),
        s = new Map();
      if (o) {
        let a = [];
        if (
          (o.forEach((l, c) => {
            if ((s.set(c, l.value), this._triggers.has(c))) {
              let u = this.trigger(n, c, lo, i);
              u && a.push(u);
            }
          }),
          a.length)
        )
          return (
            this._engine.markElementAsRemoved(this.id, n, !0, e, s),
            r && Rn(a).onDone(() => this._engine.processLeaveNode(n)),
            !0
          );
      }
      return !1;
    }
    prepareLeaveAnimationListeners(n) {
      let e = this._elementListeners.get(n),
        r = this._engine.statesByElement.get(n);
      if (e && r) {
        let i = new Set();
        e.forEach((o) => {
          let s = o.name;
          if (i.has(s)) return;
          i.add(s);
          let l = this._triggers.get(s).fallbackTransition,
            c = r.get(s) || Ad,
            u = new fo(lo),
            d = new ho(this.id, s, n);
          this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: n,
              triggerName: s,
              transition: l,
              fromState: c,
              toState: u,
              player: d,
              isFallbackTransition: !0,
            });
        });
      }
    }
    removeNode(n, e) {
      let r = this._engine;
      if (
        (n.childElementCount && this._signalRemovalForInnerTriggers(n, e),
        this.triggerLeaveAnimation(n, e, !0))
      )
        return;
      let i = !1;
      if (r.totalAnimations) {
        let o = r.players.length ? r.playersByQueriedElement.get(n) : [];
        if (o && o.length) i = !0;
        else {
          let s = n;
          for (; (s = s.parentNode); )
            if (r.statesByElement.get(s)) {
              i = !0;
              break;
            }
        }
      }
      if ((this.prepareLeaveAnimationListeners(n), i))
        r.markElementAsRemoved(this.id, n, !1, e);
      else {
        let o = n[St];
        (!o || o === Iv) &&
          (r.afterFlush(() => this.clearElementCache(n)),
          r.destroyInnerAnimations(n),
          r._onRemovalComplete(n, e));
      }
    }
    insertNode(n, e) {
      pt(n, this._hostClassName);
    }
    drainQueuedTransitions(n) {
      let e = [];
      return (
        this._queue.forEach((r) => {
          let i = r.player;
          if (i.destroyed) return;
          let o = r.element,
            s = this._elementListeners.get(o);
          s &&
            s.forEach((a) => {
              if (a.name == r.triggerName) {
                let l = Kd(
                  o,
                  r.triggerName,
                  r.fromState.value,
                  r.toState.value
                );
                (l._data = n), Gd(r.player, a.phase, l, a.callback);
              }
            }),
            i.markedForDestroy
              ? this._engine.afterFlush(() => {
                  i.destroy();
                })
              : e.push(r);
        }),
        (this._queue = []),
        e.sort((r, i) => {
          let o = r.transition.ast.depCount,
            s = i.transition.ast.depCount;
          return o == 0 || s == 0
            ? o - s
            : this._engine.driver.containsElement(r.element, i.element)
            ? 1
            : -1;
        })
      );
    }
    destroy(n) {
      this.players.forEach((e) => e.destroy()),
        this._signalRemovalForInnerTriggers(this.hostElement, n);
    }
  },
  zd = class {
    _onRemovalComplete(n, e) {
      this.onRemovalComplete(n, e);
    }
    constructor(n, e, r, i) {
      (this.bodyNode = n),
        (this.driver = e),
        (this._normalizer = r),
        (this.scheduler = i),
        (this.players = []),
        (this.newHostElements = new Map()),
        (this.playersByElement = new Map()),
        (this.playersByQueriedElement = new Map()),
        (this.statesByElement = new Map()),
        (this.disabledNodes = new Set()),
        (this.totalAnimations = 0),
        (this.totalQueuedPlayers = 0),
        (this._namespaceLookup = {}),
        (this._namespaceList = []),
        (this._flushFns = []),
        (this._whenQuietFns = []),
        (this.namespacesByHostElement = new Map()),
        (this.collectedEnterElements = []),
        (this.collectedLeaveElements = []),
        (this.onRemovalComplete = (o, s) => {});
    }
    get queuedPlayers() {
      let n = [];
      return (
        this._namespaceList.forEach((e) => {
          e.players.forEach((r) => {
            r.queued && n.push(r);
          });
        }),
        n
      );
    }
    createNamespace(n, e) {
      let r = new Hd(n, e, this);
      return (
        this.bodyNode && this.driver.containsElement(this.bodyNode, e)
          ? this._balanceNamespaceList(r, e)
          : (this.newHostElements.set(e, r), this.collectEnterElement(e)),
        (this._namespaceLookup[n] = r)
      );
    }
    _balanceNamespaceList(n, e) {
      let r = this._namespaceList,
        i = this.namespacesByHostElement;
      if (r.length - 1 >= 0) {
        let s = !1,
          a = this.driver.getParentElement(e);
        for (; a; ) {
          let l = i.get(a);
          if (l) {
            let c = r.indexOf(l);
            r.splice(c + 1, 0, n), (s = !0);
            break;
          }
          a = this.driver.getParentElement(a);
        }
        s || r.unshift(n);
      } else r.push(n);
      return i.set(e, n), n;
    }
    register(n, e) {
      let r = this._namespaceLookup[n];
      return r || (r = this.createNamespace(n, e)), r;
    }
    registerTrigger(n, e, r) {
      let i = this._namespaceLookup[n];
      i && i.register(e, r) && this.totalAnimations++;
    }
    destroy(n, e) {
      n &&
        (this.afterFlush(() => {}),
        this.afterFlushAnimationsDone(() => {
          let r = this._fetchNamespace(n);
          this.namespacesByHostElement.delete(r.hostElement);
          let i = this._namespaceList.indexOf(r);
          i >= 0 && this._namespaceList.splice(i, 1),
            r.destroy(e),
            delete this._namespaceLookup[n];
        }));
    }
    _fetchNamespace(n) {
      return this._namespaceLookup[n];
    }
    fetchNamespacesByElement(n) {
      let e = new Set(),
        r = this.statesByElement.get(n);
      if (r) {
        for (let i of r.values())
          if (i.namespaceId) {
            let o = this._fetchNamespace(i.namespaceId);
            o && e.add(o);
          }
      }
      return e;
    }
    trigger(n, e, r, i) {
      if (xa(e)) {
        let o = this._fetchNamespace(n);
        if (o) return o.trigger(e, r, i), !0;
      }
      return !1;
    }
    insertNode(n, e, r, i) {
      if (!xa(e)) return;
      let o = e[St];
      if (o && o.setForRemoval) {
        (o.setForRemoval = !1), (o.setForMove = !0);
        let s = this.collectedLeaveElements.indexOf(e);
        s >= 0 && this.collectedLeaveElements.splice(s, 1);
      }
      if (n) {
        let s = this._fetchNamespace(n);
        s && s.insertNode(e, r);
      }
      i && this.collectEnterElement(e);
    }
    collectEnterElement(n) {
      this.collectedEnterElements.push(n);
    }
    markElementAsDisabled(n, e) {
      e
        ? this.disabledNodes.has(n) || (this.disabledNodes.add(n), pt(n, Md))
        : this.disabledNodes.has(n) &&
          (this.disabledNodes.delete(n), ti(n, Md));
    }
    removeNode(n, e, r) {
      if (xa(e)) {
        this.scheduler?.notify();
        let i = n ? this._fetchNamespace(n) : null;
        i ? i.removeNode(e, r) : this.markElementAsRemoved(n, e, !1, r);
        let o = this.namespacesByHostElement.get(e);
        o && o.id !== n && o.removeNode(e, r);
      } else this._onRemovalComplete(e, r);
    }
    markElementAsRemoved(n, e, r, i, o) {
      this.collectedLeaveElements.push(e),
        (e[St] = {
          namespaceId: n,
          setForRemoval: i,
          hasAnimation: r,
          removedBeforeQueried: !1,
          previousTriggersValues: o,
        });
    }
    listen(n, e, r, i, o) {
      return xa(e) ? this._fetchNamespace(n).listen(e, r, i, o) : () => {};
    }
    _buildInstruction(n, e, r, i, o) {
      return n.transition.build(
        this.driver,
        n.element,
        n.fromState.value,
        n.toState.value,
        r,
        i,
        n.fromState.options,
        n.toState.options,
        e,
        o
      );
    }
    destroyInnerAnimations(n) {
      let e = this.driver.query(n, Ra, !0);
      e.forEach((r) => this.destroyActiveAnimationsForElement(r)),
        this.playersByQueriedElement.size != 0 &&
          ((e = this.driver.query(n, Rd, !0)),
          e.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
    }
    destroyActiveAnimationsForElement(n) {
      let e = this.playersByElement.get(n);
      e &&
        e.forEach((r) => {
          r.queued ? (r.markedForDestroy = !0) : r.destroy();
        });
    }
    finishActiveQueriedAnimationOnElement(n) {
      let e = this.playersByQueriedElement.get(n);
      e && e.forEach((r) => r.finish());
    }
    whenRenderingDone() {
      return new Promise((n) => {
        if (this.players.length) return Rn(this.players).onDone(() => n());
        n();
      });
    }
    processLeaveNode(n) {
      let e = n[St];
      if (e && e.setForRemoval) {
        if (((n[St] = Iv), e.namespaceId)) {
          this.destroyInnerAnimations(n);
          let r = this._fetchNamespace(e.namespaceId);
          r && r.clearElementCache(n);
        }
        this._onRemovalComplete(n, e.setForRemoval);
      }
      n.classList?.contains(Md) && this.markElementAsDisabled(n, !1),
        this.driver.query(n, eA, !0).forEach((r) => {
          this.markElementAsDisabled(r, !1);
        });
    }
    flush(n = -1) {
      let e = [];
      if (
        (this.newHostElements.size &&
          (this.newHostElements.forEach((r, i) =>
            this._balanceNamespaceList(r, i)
          ),
          this.newHostElements.clear()),
        this.totalAnimations && this.collectedEnterElements.length)
      )
        for (let r = 0; r < this.collectedEnterElements.length; r++) {
          let i = this.collectedEnterElements[r];
          pt(i, tA);
        }
      if (
        this._namespaceList.length &&
        (this.totalQueuedPlayers || this.collectedLeaveElements.length)
      ) {
        let r = [];
        try {
          e = this._flushAnimations(r, n);
        } finally {
          for (let i = 0; i < r.length; i++) r[i]();
        }
      } else
        for (let r = 0; r < this.collectedLeaveElements.length; r++) {
          let i = this.collectedLeaveElements[r];
          this.processLeaveNode(i);
        }
      if (
        ((this.totalQueuedPlayers = 0),
        (this.collectedEnterElements.length = 0),
        (this.collectedLeaveElements.length = 0),
        this._flushFns.forEach((r) => r()),
        (this._flushFns = []),
        this._whenQuietFns.length)
      ) {
        let r = this._whenQuietFns;
        (this._whenQuietFns = []),
          e.length
            ? Rn(e).onDone(() => {
                r.forEach((i) => i());
              })
            : r.forEach((i) => i());
      }
    }
    reportError(n) {
      throw DM(n);
    }
    _flushAnimations(n, e) {
      let r = new uo(),
        i = [],
        o = new Map(),
        s = [],
        a = new Map(),
        l = new Map(),
        c = new Map(),
        u = new Set();
      this.disabledNodes.forEach((I) => {
        u.add(I);
        let _ = this.driver.query(I, JM, !0);
        for (let A = 0; A < _.length; A++) u.add(_[A]);
      });
      let d = this.bodyNode,
        f = Array.from(this.statesByElement.keys()),
        h = fv(f, this.collectedEnterElements),
        p = new Map(),
        y = 0;
      h.forEach((I, _) => {
        let A = vv + y++;
        p.set(_, A), I.forEach((Q) => pt(Q, A));
      });
      let T = [],
        M = new Set(),
        z = new Set();
      for (let I = 0; I < this.collectedLeaveElements.length; I++) {
        let _ = this.collectedLeaveElements[I],
          A = _[St];
        A &&
          A.setForRemoval &&
          (T.push(_),
          M.add(_),
          A.hasAnimation
            ? this.driver.query(_, nA, !0).forEach((Q) => M.add(Q))
            : z.add(_));
      }
      let Z = new Map(),
        ie = fv(f, Array.from(M));
      ie.forEach((I, _) => {
        let A = Nd + y++;
        Z.set(_, A), I.forEach((Q) => pt(Q, A));
      }),
        n.push(() => {
          h.forEach((I, _) => {
            let A = p.get(_);
            I.forEach((Q) => ti(Q, A));
          }),
            ie.forEach((I, _) => {
              let A = Z.get(_);
              I.forEach((Q) => ti(Q, A));
            }),
            T.forEach((I) => {
              this.processLeaveNode(I);
            });
        });
      let $e = [],
        de = [];
      for (let I = this._namespaceList.length - 1; I >= 0; I--)
        this._namespaceList[I].drainQueuedTransitions(e).forEach((A) => {
          let Q = A.player,
            Ce = A.element;
          if (($e.push(Q), this.collectedEnterElements.length)) {
            let xe = Ce[St];
            if (xe && xe.setForMove) {
              if (
                xe.previousTriggersValues &&
                xe.previousTriggersValues.has(A.triggerName)
              ) {
                let Pn = xe.previousTriggersValues.get(A.triggerName),
                  ot = this.statesByElement.get(A.element);
                if (ot && ot.has(A.triggerName)) {
                  let po = ot.get(A.triggerName);
                  (po.value = Pn), ot.set(A.triggerName, po);
                }
              }
              Q.destroy();
              return;
            }
          }
          let Tt = !d || !this.driver.containsElement(d, Ce),
            He = Z.get(Ce),
            fn = p.get(Ce),
            ce = this._buildInstruction(A, r, fn, He, Tt);
          if (ce.errors && ce.errors.length) {
            de.push(ce);
            return;
          }
          if (Tt) {
            Q.onStart(() => sr(Ce, ce.fromStyles)),
              Q.onDestroy(() => qt(Ce, ce.toStyles)),
              i.push(Q);
            return;
          }
          if (A.isFallbackTransition) {
            Q.onStart(() => sr(Ce, ce.fromStyles)),
              Q.onDestroy(() => qt(Ce, ce.toStyles)),
              i.push(Q);
            return;
          }
          let rf = [];
          ce.timelines.forEach((xe) => {
            (xe.stretchStartingKeyframe = !0),
              this.disabledNodes.has(xe.element) || rf.push(xe);
          }),
            (ce.timelines = rf),
            r.append(Ce, ce.timelines);
          let Nv = { instruction: ce, player: Q, element: Ce };
          s.push(Nv),
            ce.queriedElements.forEach((xe) => it(a, xe, []).push(Q)),
            ce.preStyleProps.forEach((xe, Pn) => {
              if (xe.size) {
                let ot = l.get(Pn);
                ot || l.set(Pn, (ot = new Set())),
                  xe.forEach((po, za) => ot.add(za));
              }
            }),
            ce.postStyleProps.forEach((xe, Pn) => {
              let ot = c.get(Pn);
              ot || c.set(Pn, (ot = new Set())),
                xe.forEach((po, za) => ot.add(za));
            });
        });
      if (de.length) {
        let I = [];
        de.forEach((_) => {
          I.push(wM(_.triggerName, _.errors));
        }),
          $e.forEach((_) => _.destroy()),
          this.reportError(I);
      }
      let fe = new Map(),
        we = new Map();
      s.forEach((I) => {
        let _ = I.element;
        r.has(_) &&
          (we.set(_, _),
          this._beforeAnimationBuild(I.player.namespaceId, I.instruction, fe));
      }),
        i.forEach((I) => {
          let _ = I.element;
          this._getPreviousPlayers(
            _,
            !1,
            I.namespaceId,
            I.triggerName,
            null
          ).forEach((Q) => {
            it(fe, _, []).push(Q), Q.destroy();
          });
        });
      let Gt = T.filter((I) => hv(I, l, c)),
        dn = new Map();
      dv(dn, this.driver, z, c, Wt).forEach((I) => {
        hv(I, l, c) && Gt.push(I);
      });
      let On = new Map();
      h.forEach((I, _) => {
        dv(On, this.driver, new Set(I), l, Ia);
      }),
        Gt.forEach((I) => {
          let _ = dn.get(I),
            A = On.get(I);
          dn.set(
            I,
            new Map([...(_?.entries() ?? []), ...(A?.entries() ?? [])])
          );
        });
      let Ha = [],
        tf = [],
        nf = {};
      s.forEach((I) => {
        let { element: _, player: A, instruction: Q } = I;
        if (r.has(_)) {
          if (u.has(_)) {
            A.onDestroy(() => qt(_, Q.toStyles)),
              (A.disabled = !0),
              A.overrideTotalTime(Q.totalTime),
              i.push(A);
            return;
          }
          let Ce = nf;
          if (we.size > 1) {
            let He = _,
              fn = [];
            for (; (He = He.parentNode); ) {
              let ce = we.get(He);
              if (ce) {
                Ce = ce;
                break;
              }
              fn.push(He);
            }
            fn.forEach((ce) => we.set(ce, Ce));
          }
          let Tt = this._buildAnimation(A.namespaceId, Q, fe, o, On, dn);
          if ((A.setRealPlayer(Tt), Ce === nf)) Ha.push(A);
          else {
            let He = this.playersByElement.get(Ce);
            He && He.length && (A.parentPlayer = Rn(He)), i.push(A);
          }
        } else
          sr(_, Q.fromStyles),
            A.onDestroy(() => qt(_, Q.toStyles)),
            tf.push(A),
            u.has(_) && i.push(A);
      }),
        tf.forEach((I) => {
          let _ = o.get(I.element);
          if (_ && _.length) {
            let A = Rn(_);
            I.setRealPlayer(A);
          }
        }),
        i.forEach((I) => {
          I.parentPlayer ? I.syncPlayerEvents(I.parentPlayer) : I.destroy();
        });
      for (let I = 0; I < T.length; I++) {
        let _ = T[I],
          A = _[St];
        if ((ti(_, Nd), A && A.hasAnimation)) continue;
        let Q = [];
        if (a.size) {
          let Tt = a.get(_);
          Tt && Tt.length && Q.push(...Tt);
          let He = this.driver.query(_, Rd, !0);
          for (let fn = 0; fn < He.length; fn++) {
            let ce = a.get(He[fn]);
            ce && ce.length && Q.push(...ce);
          }
        }
        let Ce = Q.filter((Tt) => !Tt.destroyed);
        Ce.length ? lA(this, _, Ce) : this.processLeaveNode(_);
      }
      return (
        (T.length = 0),
        Ha.forEach((I) => {
          this.players.push(I),
            I.onDone(() => {
              I.destroy();
              let _ = this.players.indexOf(I);
              this.players.splice(_, 1);
            }),
            I.play();
        }),
        Ha
      );
    }
    afterFlush(n) {
      this._flushFns.push(n);
    }
    afterFlushAnimationsDone(n) {
      this._whenQuietFns.push(n);
    }
    _getPreviousPlayers(n, e, r, i, o) {
      let s = [];
      if (e) {
        let a = this.playersByQueriedElement.get(n);
        a && (s = a);
      } else {
        let a = this.playersByElement.get(n);
        if (a) {
          let l = !o || o == lo;
          a.forEach((c) => {
            c.queued || (!l && c.triggerName != i) || s.push(c);
          });
        }
      }
      return (
        (r || i) &&
          (s = s.filter(
            (a) => !((r && r != a.namespaceId) || (i && i != a.triggerName))
          )),
        s
      );
    }
    _beforeAnimationBuild(n, e, r) {
      let i = e.triggerName,
        o = e.element,
        s = e.isRemovalTransition ? void 0 : n,
        a = e.isRemovalTransition ? void 0 : i;
      for (let l of e.timelines) {
        let c = l.element,
          u = c !== o,
          d = it(r, c, []);
        this._getPreviousPlayers(c, u, s, a, e.toState).forEach((h) => {
          let p = h.getRealPlayer();
          p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
        });
      }
      sr(o, e.fromStyles);
    }
    _buildAnimation(n, e, r, i, o, s) {
      let a = e.triggerName,
        l = e.element,
        c = [],
        u = new Set(),
        d = new Set(),
        f = e.timelines.map((p) => {
          let y = p.element;
          u.add(y);
          let T = y[St];
          if (T && T.removedBeforeQueried) return new Nn(p.duration, p.delay);
          let M = y !== l,
            z = cA((r.get(y) || rA).map((fe) => fe.getRealPlayer())).filter(
              (fe) => {
                let we = fe;
                return we.element ? we.element === y : !1;
              }
            ),
            Z = o.get(y),
            ie = s.get(y),
            $e = pv(this._normalizer, p.keyframes, Z, ie),
            de = this._buildPlayer(p, $e, z);
          if ((p.subTimeline && i && d.add(y), M)) {
            let fe = new ho(n, a, y);
            fe.setRealPlayer(de), c.push(fe);
          }
          return de;
        });
      c.forEach((p) => {
        it(this.playersByQueriedElement, p.element, []).push(p),
          p.onDone(() => oA(this.playersByQueriedElement, p.element, p));
      }),
        u.forEach((p) => pt(p, rv));
      let h = Rn(f);
      return (
        h.onDestroy(() => {
          u.forEach((p) => ti(p, rv)), qt(l, e.toStyles);
        }),
        d.forEach((p) => {
          it(i, p, []).push(h);
        }),
        h
      );
    }
    _buildPlayer(n, e, r) {
      return e.length > 0
        ? this.driver.animate(n.element, e, n.duration, n.delay, n.easing, r)
        : new Nn(n.duration, n.delay);
    }
  },
  ho = class {
    constructor(n, e, r) {
      (this.namespaceId = n),
        (this.triggerName = e),
        (this.element = r),
        (this._player = new Nn()),
        (this._containsRealPlayer = !1),
        (this._queuedCallbacks = new Map()),
        (this.destroyed = !1),
        (this.parentPlayer = null),
        (this.markedForDestroy = !1),
        (this.disabled = !1),
        (this.queued = !0),
        (this.totalTime = 0);
    }
    setRealPlayer(n) {
      this._containsRealPlayer ||
        ((this._player = n),
        this._queuedCallbacks.forEach((e, r) => {
          e.forEach((i) => Gd(n, r, void 0, i));
        }),
        this._queuedCallbacks.clear(),
        (this._containsRealPlayer = !0),
        this.overrideTotalTime(n.totalTime),
        (this.queued = !1));
    }
    getRealPlayer() {
      return this._player;
    }
    overrideTotalTime(n) {
      this.totalTime = n;
    }
    syncPlayerEvents(n) {
      let e = this._player;
      e.triggerCallback && n.onStart(() => e.triggerCallback("start")),
        n.onDone(() => this.finish()),
        n.onDestroy(() => this.destroy());
    }
    _queueEvent(n, e) {
      it(this._queuedCallbacks, n, []).push(e);
    }
    onDone(n) {
      this.queued && this._queueEvent("done", n), this._player.onDone(n);
    }
    onStart(n) {
      this.queued && this._queueEvent("start", n), this._player.onStart(n);
    }
    onDestroy(n) {
      this.queued && this._queueEvent("destroy", n), this._player.onDestroy(n);
    }
    init() {
      this._player.init();
    }
    hasStarted() {
      return this.queued ? !1 : this._player.hasStarted();
    }
    play() {
      !this.queued && this._player.play();
    }
    pause() {
      !this.queued && this._player.pause();
    }
    restart() {
      !this.queued && this._player.restart();
    }
    finish() {
      this._player.finish();
    }
    destroy() {
      (this.destroyed = !0), this._player.destroy();
    }
    reset() {
      !this.queued && this._player.reset();
    }
    setPosition(n) {
      this.queued || this._player.setPosition(n);
    }
    getPosition() {
      return this.queued ? 0 : this._player.getPosition();
    }
    triggerCallback(n) {
      let e = this._player;
      e.triggerCallback && e.triggerCallback(n);
    }
  };
function oA(t, n, e) {
  let r = t.get(n);
  if (r) {
    if (r.length) {
      let i = r.indexOf(e);
      r.splice(i, 1);
    }
    r.length == 0 && t.delete(n);
  }
  return r;
}
function sA(t) {
  return t ?? null;
}
function xa(t) {
  return t && t.nodeType === 1;
}
function aA(t) {
  return t == "start" || t == "done";
}
function uv(t, n) {
  let e = t.style.display;
  return (t.style.display = n ?? "none"), e;
}
function dv(t, n, e, r, i) {
  let o = [];
  e.forEach((l) => o.push(uv(l)));
  let s = [];
  r.forEach((l, c) => {
    let u = new Map();
    l.forEach((d) => {
      let f = n.computeStyle(c, d, i);
      u.set(d, f), (!f || f.length == 0) && ((c[St] = iA), s.push(c));
    }),
      t.set(c, u);
  });
  let a = 0;
  return e.forEach((l) => uv(l, o[a++])), s;
}
function fv(t, n) {
  let e = new Map();
  if ((t.forEach((a) => e.set(a, [])), n.length == 0)) return e;
  let r = 1,
    i = new Set(n),
    o = new Map();
  function s(a) {
    if (!a) return r;
    let l = o.get(a);
    if (l) return l;
    let c = a.parentNode;
    return e.has(c) ? (l = c) : i.has(c) ? (l = r) : (l = s(c)), o.set(a, l), l;
  }
  return (
    n.forEach((a) => {
      let l = s(a);
      l !== r && e.get(l).push(a);
    }),
    e
  );
}
function pt(t, n) {
  t.classList?.add(n);
}
function ti(t, n) {
  t.classList?.remove(n);
}
function lA(t, n, e) {
  Rn(e).onDone(() => t.processLeaveNode(n));
}
function cA(t) {
  let n = [];
  return _v(t, n), n;
}
function _v(t, n) {
  for (let e = 0; e < t.length; e++) {
    let r = t[e];
    r instanceof no ? _v(r.players, n) : n.push(r);
  }
}
function uA(t, n) {
  let e = Object.keys(t),
    r = Object.keys(n);
  if (e.length != r.length) return !1;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    if (!n.hasOwnProperty(o) || t[o] !== n[o]) return !1;
  }
  return !0;
}
function hv(t, n, e) {
  let r = e.get(t);
  if (!r) return !1;
  let i = n.get(t);
  return i ? r.forEach((o) => i.add(o)) : n.set(t, r), e.delete(t), !0;
}
var ni = class {
  constructor(n, e, r, i) {
    (this._driver = e),
      (this._normalizer = r),
      (this._triggerCache = {}),
      (this.onRemovalComplete = (o, s) => {}),
      (this._transitionEngine = new zd(n.body, e, r, i)),
      (this._timelineEngine = new $d(n.body, e, r)),
      (this._transitionEngine.onRemovalComplete = (o, s) =>
        this.onRemovalComplete(o, s));
  }
  registerTrigger(n, e, r, i, o) {
    let s = n + "-" + i,
      a = this._triggerCache[s];
    if (!a) {
      let l = [],
        c = [],
        u = wv(this._driver, o, l, c);
      if (l.length) throw uM(i, l);
      c.length && void 0,
        (a = YM(i, u, this._normalizer)),
        (this._triggerCache[s] = a);
    }
    this._transitionEngine.registerTrigger(e, i, a);
  }
  register(n, e) {
    this._transitionEngine.register(n, e);
  }
  destroy(n, e) {
    this._transitionEngine.destroy(n, e);
  }
  onInsert(n, e, r, i) {
    this._transitionEngine.insertNode(n, e, r, i);
  }
  onRemove(n, e, r) {
    this._transitionEngine.removeNode(n, e, r);
  }
  disableAnimations(n, e) {
    this._transitionEngine.markElementAsDisabled(n, e);
  }
  process(n, e, r, i) {
    if (r.charAt(0) == "@") {
      let [o, s] = tv(r),
        a = i;
      this._timelineEngine.command(o, e, s, a);
    } else this._transitionEngine.trigger(n, e, r, i);
  }
  listen(n, e, r, i, o) {
    if (r.charAt(0) == "@") {
      let [s, a] = tv(r);
      return this._timelineEngine.listen(s, e, a, o);
    }
    return this._transitionEngine.listen(n, e, r, i, o);
  }
  flush(n = -1) {
    this._transitionEngine.flush(n);
  }
  get players() {
    return [...this._transitionEngine.players, ...this._timelineEngine.players];
  }
  whenRenderingDone() {
    return this._transitionEngine.whenRenderingDone();
  }
  afterFlushAnimationsDone(n) {
    this._transitionEngine.afterFlushAnimationsDone(n);
  }
};
function dA(t, n) {
  let e = null,
    r = null;
  return (
    Array.isArray(n) && n.length
      ? ((e = xd(n[0])), n.length > 1 && (r = xd(n[n.length - 1])))
      : n instanceof Map && (e = xd(n)),
    e || r ? new Wd(t, e, r) : null
  );
}
var Wd = class t {
  static {
    this.initialStylesByElement = new WeakMap();
  }
  constructor(n, e, r) {
    (this._element = n),
      (this._startStyles = e),
      (this._endStyles = r),
      (this._state = 0);
    let i = t.initialStylesByElement.get(n);
    i || t.initialStylesByElement.set(n, (i = new Map())),
      (this._initialStyles = i);
  }
  start() {
    this._state < 1 &&
      (this._startStyles &&
        qt(this._element, this._startStyles, this._initialStyles),
      (this._state = 1));
  }
  finish() {
    this.start(),
      this._state < 2 &&
        (qt(this._element, this._initialStyles),
        this._endStyles &&
          (qt(this._element, this._endStyles), (this._endStyles = null)),
        (this._state = 1));
  }
  destroy() {
    this.finish(),
      this._state < 3 &&
        (t.initialStylesByElement.delete(this._element),
        this._startStyles &&
          (sr(this._element, this._startStyles), (this._endStyles = null)),
        this._endStyles &&
          (sr(this._element, this._endStyles), (this._endStyles = null)),
        qt(this._element, this._initialStyles),
        (this._state = 3));
  }
};
function xd(t) {
  let n = null;
  return (
    t.forEach((e, r) => {
      fA(r) && ((n = n || new Map()), n.set(r, e));
    }),
    n
  );
}
function fA(t) {
  return t === "display" || t === "position";
}
var Va = class {
    constructor(n, e, r, i) {
      (this.element = n),
        (this.keyframes = e),
        (this.options = r),
        (this._specialStyles = i),
        (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._onDestroyFns = []),
        (this._initialized = !1),
        (this._finished = !1),
        (this._started = !1),
        (this._destroyed = !1),
        (this._originalOnDoneFns = []),
        (this._originalOnStartFns = []),
        (this.time = 0),
        (this.parentPlayer = null),
        (this.currentSnapshot = new Map()),
        (this._duration = r.duration),
        (this._delay = r.delay || 0),
        (this.time = this._duration + this._delay);
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((n) => n()),
        (this._onDoneFns = []));
    }
    init() {
      this._buildPlayer(), this._preparePlayerBeforeStart();
    }
    _buildPlayer() {
      if (this._initialized) return;
      this._initialized = !0;
      let n = this.keyframes;
      (this.domPlayer = this._triggerWebAnimation(
        this.element,
        n,
        this.options
      )),
        (this._finalKeyframe = n.length ? n[n.length - 1] : new Map());
      let e = () => this._onFinish();
      this.domPlayer.addEventListener("finish", e),
        this.onDestroy(() => {
          this.domPlayer.removeEventListener("finish", e);
        });
    }
    _preparePlayerBeforeStart() {
      this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
    }
    _convertKeyframesToObject(n) {
      let e = [];
      return (
        n.forEach((r) => {
          e.push(Object.fromEntries(r));
        }),
        e
      );
    }
    _triggerWebAnimation(n, e, r) {
      return n.animate(this._convertKeyframesToObject(e), r);
    }
    onStart(n) {
      this._originalOnStartFns.push(n), this._onStartFns.push(n);
    }
    onDone(n) {
      this._originalOnDoneFns.push(n), this._onDoneFns.push(n);
    }
    onDestroy(n) {
      this._onDestroyFns.push(n);
    }
    play() {
      this._buildPlayer(),
        this.hasStarted() ||
          (this._onStartFns.forEach((n) => n()),
          (this._onStartFns = []),
          (this._started = !0),
          this._specialStyles && this._specialStyles.start()),
        this.domPlayer.play();
    }
    pause() {
      this.init(), this.domPlayer.pause();
    }
    finish() {
      this.init(),
        this._specialStyles && this._specialStyles.finish(),
        this._onFinish(),
        this.domPlayer.finish();
    }
    reset() {
      this._resetDomPlayerState(),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._started = !1),
        (this._onStartFns = this._originalOnStartFns),
        (this._onDoneFns = this._originalOnDoneFns);
    }
    _resetDomPlayerState() {
      this.domPlayer && this.domPlayer.cancel();
    }
    restart() {
      this.reset(), this.play();
    }
    hasStarted() {
      return this._started;
    }
    destroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this._resetDomPlayerState(),
        this._onFinish(),
        this._specialStyles && this._specialStyles.destroy(),
        this._onDestroyFns.forEach((n) => n()),
        (this._onDestroyFns = []));
    }
    setPosition(n) {
      this.domPlayer === void 0 && this.init(),
        (this.domPlayer.currentTime = n * this.time);
    }
    getPosition() {
      return +(this.domPlayer.currentTime ?? 0) / this.time;
    }
    get totalTime() {
      return this._delay + this._duration;
    }
    beforeDestroy() {
      let n = new Map();
      this.hasStarted() &&
        this._finalKeyframe.forEach((r, i) => {
          i !== "offset" && n.set(i, this._finished ? r : Xd(this.element, i));
        }),
        (this.currentSnapshot = n);
    }
    triggerCallback(n) {
      let e = n === "start" ? this._onStartFns : this._onDoneFns;
      e.forEach((r) => r()), (e.length = 0);
    }
  },
  Ba = class {
    validateStyleProperty(n) {
      return !0;
    }
    validateAnimatableStyleProperty(n) {
      return !0;
    }
    matchesElement(n, e) {
      return !1;
    }
    containsElement(n, e) {
      return mv(n, e);
    }
    getParentElement(n) {
      return Qd(n);
    }
    query(n, e, r) {
      return gv(n, e, r);
    }
    computeStyle(n, e, r) {
      return Xd(n, e);
    }
    animate(n, e, r, i, o, s = []) {
      let a = i == 0 ? "both" : "forwards",
        l = { duration: r, delay: i, fill: a };
      o && (l.easing = o);
      let c = new Map(),
        u = s.filter((h) => h instanceof Va);
      RM(r, i) &&
        u.forEach((h) => {
          h.currentSnapshot.forEach((p, y) => c.set(y, p));
        });
      let d = AM(e).map((h) => new Map(h));
      d = OM(n, d, c);
      let f = dA(n, d);
      return new Va(n, d, l, f);
    }
  };
var Na = "@",
  Sv = "@.disabled",
  Ua = class {
    constructor(n, e, r, i) {
      (this.namespaceId = n),
        (this.delegate = e),
        (this.engine = r),
        (this._onDestroy = i),
        (this.ɵtype = 0);
    }
    get data() {
      return this.delegate.data;
    }
    destroyNode(n) {
      this.delegate.destroyNode?.(n);
    }
    destroy() {
      this.engine.destroy(this.namespaceId, this.delegate),
        this.engine.afterFlushAnimationsDone(() => {
          queueMicrotask(() => {
            this.delegate.destroy();
          });
        }),
        this._onDestroy?.();
    }
    createElement(n, e) {
      return this.delegate.createElement(n, e);
    }
    createComment(n) {
      return this.delegate.createComment(n);
    }
    createText(n) {
      return this.delegate.createText(n);
    }
    appendChild(n, e) {
      this.delegate.appendChild(n, e),
        this.engine.onInsert(this.namespaceId, e, n, !1);
    }
    insertBefore(n, e, r, i = !0) {
      this.delegate.insertBefore(n, e, r),
        this.engine.onInsert(this.namespaceId, e, n, i);
    }
    removeChild(n, e, r) {
      this.engine.onRemove(this.namespaceId, e, this.delegate);
    }
    selectRootElement(n, e) {
      return this.delegate.selectRootElement(n, e);
    }
    parentNode(n) {
      return this.delegate.parentNode(n);
    }
    nextSibling(n) {
      return this.delegate.nextSibling(n);
    }
    setAttribute(n, e, r, i) {
      this.delegate.setAttribute(n, e, r, i);
    }
    removeAttribute(n, e, r) {
      this.delegate.removeAttribute(n, e, r);
    }
    addClass(n, e) {
      this.delegate.addClass(n, e);
    }
    removeClass(n, e) {
      this.delegate.removeClass(n, e);
    }
    setStyle(n, e, r, i) {
      this.delegate.setStyle(n, e, r, i);
    }
    removeStyle(n, e, r) {
      this.delegate.removeStyle(n, e, r);
    }
    setProperty(n, e, r) {
      e.charAt(0) == Na && e == Sv
        ? this.disableAnimations(n, !!r)
        : this.delegate.setProperty(n, e, r);
    }
    setValue(n, e) {
      this.delegate.setValue(n, e);
    }
    listen(n, e, r) {
      return this.delegate.listen(n, e, r);
    }
    disableAnimations(n, e) {
      this.engine.disableAnimations(n, e);
    }
  },
  qd = class extends Ua {
    constructor(n, e, r, i, o) {
      super(e, r, i, o), (this.factory = n), (this.namespaceId = e);
    }
    setProperty(n, e, r) {
      e.charAt(0) == Na
        ? e.charAt(1) == "." && e == Sv
          ? ((r = r === void 0 ? !0 : !!r), this.disableAnimations(n, r))
          : this.engine.process(this.namespaceId, n, e.slice(1), r)
        : this.delegate.setProperty(n, e, r);
    }
    listen(n, e, r) {
      if (e.charAt(0) == Na) {
        let i = hA(n),
          o = e.slice(1),
          s = "";
        return (
          o.charAt(0) != Na && ([o, s] = pA(o)),
          this.engine.listen(this.namespaceId, i, o, s, (a) => {
            let l = a._data || -1;
            this.factory.scheduleListenerCallback(l, r, a);
          })
        );
      }
      return this.delegate.listen(n, e, r);
    }
  };
function hA(t) {
  switch (t) {
    case "body":
      return document.body;
    case "document":
      return document;
    case "window":
      return window;
    default:
      return t;
  }
}
function pA(t) {
  let n = t.indexOf("."),
    e = t.substring(0, n),
    r = t.slice(n + 1);
  return [e, r];
}
var $a = class {
  constructor(n, e, r) {
    (this.delegate = n),
      (this.engine = e),
      (this._zone = r),
      (this._currentId = 0),
      (this._microtaskId = 1),
      (this._animationCallbacksBuffer = []),
      (this._rendererCache = new Map()),
      (this._cdRecurDepth = 0),
      (e.onRemovalComplete = (i, o) => {
        let s = o?.parentNode(i);
        s && o.removeChild(s, i);
      });
  }
  createRenderer(n, e) {
    let r = "",
      i = this.delegate.createRenderer(n, e);
    if (!n || !e?.data?.animation) {
      let c = this._rendererCache,
        u = c.get(i);
      if (!u) {
        let d = () => c.delete(i);
        (u = new Ua(r, i, this.engine, d)), c.set(i, u);
      }
      return u;
    }
    let o = e.id,
      s = e.id + "-" + this._currentId;
    this._currentId++, this.engine.register(s, n);
    let a = (c) => {
      Array.isArray(c)
        ? c.forEach(a)
        : this.engine.registerTrigger(o, s, n, c.name, c);
    };
    return e.data.animation.forEach(a), new qd(this, s, i, this.engine);
  }
  begin() {
    this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
  }
  _scheduleCountTask() {
    queueMicrotask(() => {
      this._microtaskId++;
    });
  }
  scheduleListenerCallback(n, e, r) {
    if (n >= 0 && n < this._microtaskId) {
      this._zone.run(() => e(r));
      return;
    }
    let i = this._animationCallbacksBuffer;
    i.length == 0 &&
      queueMicrotask(() => {
        this._zone.run(() => {
          i.forEach((o) => {
            let [s, a] = o;
            s(a);
          }),
            (this._animationCallbacksBuffer = []);
        });
      }),
      i.push([e, r]);
  }
  end() {
    this._cdRecurDepth--,
      this._cdRecurDepth == 0 &&
        this._zone.runOutsideAngular(() => {
          this._scheduleCountTask(), this.engine.flush(this._microtaskId);
        }),
      this.delegate.end && this.delegate.end();
  }
  whenRenderingDone() {
    return this.engine.whenRenderingDone();
  }
};
var gA = (() => {
  class t extends ni {
    constructor(e, r, i) {
      super(e, r, i, E(vi, { optional: !0 }));
    }
    ngOnDestroy() {
      this.flush();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)(B(De), B(ar), B(lr));
      };
    }
    static {
      this.ɵprov = S({ token: t, factory: t.ɵfac });
    }
  }
  return t;
})();
function yA() {
  return new Pa();
}
function vA(t, n, e) {
  return new $a(t, n, e);
}
var Tv = [
    { provide: lr, useFactory: yA },
    { provide: ni, useClass: gA },
    { provide: Wn, useFactory: vA, deps: [ta, ni, oe] },
  ],
  EA = [
    { provide: ar, useFactory: () => new Ba() },
    { provide: Vc, useValue: "BrowserAnimations" },
    ...Tv,
  ],
  Rk = [
    { provide: ar, useClass: Yd },
    { provide: Vc, useValue: "NoopAnimations" },
    ...Tv,
  ];
function Mv() {
  return In("NgEagerAnimations"), [...EA];
}
var Av = { providers: [Ny(Jy, Ry()), Qg(), Mv()] };
var xv = (() => {
  class t {
    constructor() {
      this.title = "cbd-vital";
    }
    static {
      this.ɵfac = function (r) {
        return new (r || t)();
      };
    }
    static {
      this.ɵcmp = U({
        type: t,
        selectors: [["app-root"]],
        standalone: !0,
        features: [Y],
        decls: 2,
        vars: 0,
        template: function (r, i) {
          r & 1 && (m(0, "div"), $(1, "router-outlet"), g());
        },
        dependencies: [hd],
      });
    }
  }
  return t;
})();
Gg(xv, Av).catch((t) => console.error(t));
