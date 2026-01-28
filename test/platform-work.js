typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
let $t = !1, Mn = !1;
function In() {
  $t = !0;
}
In();
const Dn = 1, Fn = 2, Dr = 4, Ln = 8, zn = 16, jn = 2, Bn = 8, Hn = 1, Yn = 2, Fr = "[", zt = "[!", fr = "]", at = {}, L = /* @__PURE__ */ Symbol(), Vn = "http://www.w3.org/1999/xhtml", Zt = !1;
var Lr = Array.isArray, Un = Array.prototype.indexOf, jt = Array.from, Ot = Object.keys, Pt = Object.defineProperty, Ve = Object.getOwnPropertyDescriptor, zr = Object.getOwnPropertyDescriptors, Wn = Object.prototype, Gn = Array.prototype, ur = Object.getPrototypeOf, xr = Object.isExtensible;
function Kn(e) {
  return e();
}
function er(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function jr() {
  var e, t, r = new Promise((n, s) => {
    e = n, t = s;
  });
  return { promise: r, resolve: e, reject: t };
}
const j = 2, Mt = 4, qt = 8, Br = 1 << 24, Ae = 16, Ne = 32, ze = 64, cr = 128, ae = 512, z = 1024, G = 2048, ge = 4096, re = 8192, ke = 16384, Bt = 32768, ot = 65536, Er = 1 << 17, Hr = 1 << 18, Qe = 1 << 19, Yr = 1 << 20, xe = 1 << 25, Ke = 32768, tr = 1 << 21, dr = 1 << 22, De = 1 << 23, it = /* @__PURE__ */ Symbol("$state"), Vr = /* @__PURE__ */ Symbol("legacy props"), nt = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), vr = 3, vt = 8;
function Jn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Xn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Qn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Zn(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function es() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ts() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function rs(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function ns() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ss() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function is() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ls() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function Ht(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function as() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let q = !1;
function Ee(e) {
  q = e;
}
let x;
function Q(e) {
  if (e === null)
    throw Ht(), at;
  return x = e;
}
function xt() {
  return Q(/* @__PURE__ */ _e(x));
}
function b(e) {
  if (q) {
    if (/* @__PURE__ */ _e(x) !== null)
      throw Ht(), at;
    x = e;
  }
}
function Ur(e = 1) {
  if (q) {
    for (var t = e, r = x; t--; )
      r = /** @type {TemplateNode} */
      /* @__PURE__ */ _e(r);
    x = r;
  }
}
function It(e = !0) {
  for (var t = 0, r = x; ; ) {
    if (r.nodeType === vt) {
      var n = (
        /** @type {Comment} */
        r.data
      );
      if (n === fr) {
        if (t === 0) return r;
        t -= 1;
      } else (n === Fr || n === zt) && (t += 1);
    }
    var s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ _e(r)
    );
    e && r.remove(), r = s;
  }
}
function Wr(e) {
  if (!e || e.nodeType !== vt)
    throw Ht(), at;
  return (
    /** @type {Comment} */
    e.data
  );
}
function Gr(e) {
  return e === this.v;
}
function os(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Kr(e) {
  return !os(e, this.v);
}
let C = null;
function ft(e) {
  C = e;
}
function Yt(e, t = !1, r) {
  C = {
    p: C,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: $t && !t ? { s: null, u: null, $: [] } : null
  };
}
function Vt(e) {
  var t = (
    /** @type {ComponentContext} */
    C
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      hn(n);
  }
  return e !== void 0 && (t.x = e), t.i = !0, C = t.p, e ?? /** @type {T} */
  {};
}
function Et() {
  return !$t || C !== null && C.l === null;
}
let He = [];
function Jr() {
  var e = He;
  He = [], er(e);
}
function kt(e) {
  if (He.length === 0 && !bt) {
    var t = He;
    queueMicrotask(() => {
      t === He && Jr();
    });
  }
  He.push(e);
}
function fs() {
  for (; He.length > 0; )
    Jr();
}
function Xr(e) {
  var t = y;
  if (t === null)
    return m.f |= De, e;
  if ((t.f & Bt) === 0) {
    if ((t.f & cr) === 0)
      throw e;
    t.b.error(e);
  } else
    ut(e, t);
}
function ut(e, t) {
  for (; t !== null; ) {
    if ((t.f & cr) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    t = t.parent;
  }
  throw e;
}
const us = -7169;
function P(e, t) {
  e.f = e.f & us | t;
}
function pr(e) {
  (e.f & ae) !== 0 || e.deps === null ? P(e, z) : P(e, ge);
}
function Qr(e) {
  if (e !== null)
    for (const t of e)
      (t.f & j) === 0 || (t.f & Ke) === 0 || (t.f ^= Ke, Qr(
        /** @type {Derived} */
        t.deps
      ));
}
function Zr(e, t, r) {
  (e.f & G) !== 0 ? t.add(e) : (e.f & ge) !== 0 && r.add(e), Qr(e.deps), P(e, z);
}
const At = /* @__PURE__ */ new Set();
let S = null, fe = null, ie = [], Ut = null, rr = !1, bt = !1;
class ue {
  committed = !1;
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #e = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #t = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #r = 0;
  /**
   * The number of async effects that are currently in flight, _not_ inside a pending boundary
   */
  #i = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #l = null;
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #n = /* @__PURE__ */ new Set();
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  is_fork = !1;
  is_deferred() {
    return this.is_fork || this.#i > 0;
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    ie = [], this.apply();
    var r = [], n = [];
    for (const s of t)
      this.#a(s, r, n);
    this.is_fork || this.#f(), this.is_deferred() ? (this.#o(n), this.#o(r)) : (S = null, kr(n), kr(r), this.#l?.resolve()), fe = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #a(t, r, n) {
    t.f ^= z;
    for (var s = t.first, i = null; s !== null; ) {
      var l = s.f, a = (l & (Ne | ze)) !== 0, o = a && (l & z) !== 0, f = o || (l & re) !== 0 || this.skipped_effects.has(s);
      if (!f && s.fn !== null) {
        a ? s.f ^= z : i !== null && (l & (Mt | qt | Br)) !== 0 ? i.b.defer_effect(s) : (l & Mt) !== 0 ? r.push(s) : pt(s) && ((l & Ae) !== 0 && this.#s.add(s), dt(s));
        var u = s.first;
        if (u !== null) {
          s = u;
          continue;
        }
      }
      var h = s.parent;
      for (s = s.next; s === null && h !== null; )
        h === i && (i = null), s = h.next, h = h.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #o(t) {
    for (var r = 0; r < t.length; r += 1)
      Zr(t[r], this.#s, this.#n);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    r !== L && !this.previous.has(t) && this.previous.set(t, r), (t.f & De) === 0 && (this.current.set(t, t.v), fe?.set(t, t.v));
  }
  activate() {
    S = this, this.apply();
  }
  deactivate() {
    S === this && (S = null, fe = null);
  }
  flush() {
    if (this.activate(), ie.length > 0) {
      if (en(), S !== null && S !== this)
        return;
    } else this.#r === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#t) t(this);
    this.#t.clear();
  }
  #f() {
    if (this.#i === 0) {
      for (const t of this.#e) t();
      this.#e.clear();
    }
    this.#r === 0 && this.#u();
  }
  #u() {
    if (At.size > 1) {
      this.previous.clear();
      var t = fe, r = !0;
      for (const s of At) {
        if (s === this) {
          r = !1;
          continue;
        }
        const i = [];
        for (const [a, o] of this.current) {
          if (s.current.has(a))
            if (r && o !== s.current.get(a))
              s.current.set(a, o);
            else
              continue;
          i.push(a);
        }
        if (i.length === 0)
          continue;
        const l = [...s.current.keys()].filter((a) => !this.current.has(a));
        if (l.length > 0) {
          var n = ie;
          ie = [];
          const a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
          for (const f of i)
            tn(f, l, a, o);
          if (ie.length > 0) {
            S = s, s.apply();
            for (const f of ie)
              s.#a(f, [], []);
            s.deactivate();
          }
          ie = n;
        }
      }
      S = null, fe = t;
    }
    this.committed = !0, At.delete(this);
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(t) {
    this.#r += 1, t && (this.#i += 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(t) {
    this.#r -= 1, t && (this.#i -= 1), this.revive();
  }
  revive() {
    for (const t of this.#s)
      this.#n.delete(t), P(t, G), Se(t);
    for (const t of this.#n)
      P(t, ge), Se(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    this.#e.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#t.add(t);
  }
  settled() {
    return (this.#l ??= jr()).promise;
  }
  static ensure() {
    if (S === null) {
      const t = S = new ue();
      At.add(S), bt || ue.enqueue(() => {
        S === t && t.flush();
      });
    }
    return S;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    kt(t);
  }
  apply() {
  }
}
function lt(e) {
  var t = bt;
  bt = !0;
  try {
    for (var r; ; ) {
      if (fs(), ie.length === 0 && (S?.flush(), ie.length === 0))
        return Ut = null, /** @type {T} */
        r;
      en();
    }
  } finally {
    bt = t;
  }
}
function en() {
  var e = We;
  rr = !0;
  var t = null;
  try {
    var r = 0;
    for (Ft(!0); ie.length > 0; ) {
      var n = ue.ensure();
      if (r++ > 1e3) {
        var s, i;
        cs();
      }
      n.process(ie), Fe.clear();
    }
  } finally {
    rr = !1, Ft(e), Ut = null;
  }
}
function cs() {
  try {
    es();
  } catch (e) {
    ut(e, Ut);
  }
}
let qe = null;
function kr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (ke | re)) === 0 && pt(n) && (qe = /* @__PURE__ */ new Set(), dt(n), n.deps === null && n.first === null && n.nodes === null && (n.teardown === null && n.ac === null ? mn(n) : n.fn = null), qe?.size > 0)) {
        Fe.clear();
        for (const s of qe) {
          if ((s.f & (ke | re)) !== 0) continue;
          const i = [s];
          let l = s.parent;
          for (; l !== null; )
            qe.has(l) && (qe.delete(l), i.push(l)), l = l.parent;
          for (let a = i.length - 1; a >= 0; a--) {
            const o = i[a];
            (o.f & (ke | re)) === 0 && dt(o);
          }
        }
        qe.clear();
      }
    }
    qe = null;
  }
}
function tn(e, t, r, n) {
  if (!r.has(e) && (r.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & j) !== 0 ? tn(
        /** @type {Derived} */
        s,
        t,
        r,
        n
      ) : (i & (dr | Ae)) !== 0 && (i & G) === 0 && rn(s, t, n) && (P(s, G), Se(
        /** @type {Effect} */
        s
      ));
    }
}
function rn(e, t, r) {
  const n = r.get(e);
  if (n !== void 0) return n;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (t.includes(s))
        return !0;
      if ((s.f & j) !== 0 && rn(
        /** @type {Derived} */
        s,
        t,
        r
      ))
        return r.set(
          /** @type {Derived} */
          s,
          !0
        ), !0;
    }
  return r.set(e, !1), !1;
}
function Se(e) {
  for (var t = Ut = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (rr && t === y && (r & Ae) !== 0 && (r & Hr) === 0)
      return;
    if ((r & (ze | Ne)) !== 0) {
      if ((r & z) === 0) return;
      t.f ^= z;
    }
  }
  ie.push(t);
}
function ds(e) {
  let t = 0, r = Je(0), n;
  return () => {
    br() && (c(r), Wt(() => (t === 0 && (n = R(() => e(() => wt(r)))), t += 1, () => {
      kt(() => {
        t -= 1, t === 0 && (n?.(), n = void 0, wt(r));
      });
    })));
  };
}
var vs = ot | Qe | cr;
function ps(e, t, r) {
  new hs(e, t, r);
}
class hs {
  /** @type {Boundary | null} */
  parent;
  is_pending = !1;
  /** @type {TemplateNode} */
  #e;
  /** @type {TemplateNode | null} */
  #t = q ? x : null;
  /** @type {BoundaryProps} */
  #r;
  /** @type {((anchor: Node) => void)} */
  #i;
  /** @type {Effect} */
  #l;
  /** @type {Effect | null} */
  #s = null;
  /** @type {Effect | null} */
  #n = null;
  /** @type {Effect | null} */
  #a = null;
  /** @type {DocumentFragment | null} */
  #o = null;
  /** @type {TemplateNode | null} */
  #f = null;
  #u = 0;
  #c = 0;
  #v = !1;
  /** @type {Set<Effect>} */
  #p = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #h = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #d = null;
  #w = ds(() => (this.#d = Je(this.#u), () => {
    this.#d = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(t, r, n) {
    this.#e = t, this.#r = r, this.#i = n, this.parent = /** @type {Effect} */
    y.b, this.is_pending = !!this.#r.pending, this.#l = wr(() => {
      if (y.b = this, q) {
        const i = this.#t;
        xt(), /** @type {Comment} */
        i.nodeType === vt && /** @type {Comment} */
        i.data === zt ? this.#$() : (this.#y(), this.#c === 0 && (this.is_pending = !1));
      } else {
        var s = this.#m();
        try {
          this.#s = le(() => n(s));
        } catch (i) {
          this.error(i);
        }
        this.#c > 0 ? this.#_() : this.is_pending = !1;
      }
      return () => {
        this.#f?.remove();
      };
    }, vs), q && (this.#e = x);
  }
  #y() {
    try {
      this.#s = le(() => this.#i(this.#e));
    } catch (t) {
      this.error(t);
    }
  }
  #$() {
    const t = this.#r.pending;
    t && (this.#n = le(() => t(this.#e)), ue.enqueue(() => {
      var r = this.#m();
      this.#s = this.#g(() => (ue.ensure(), le(() => this.#i(r)))), this.#c > 0 ? this.#_() : (Ue(
        /** @type {Effect} */
        this.#n,
        () => {
          this.#n = null;
        }
      ), this.is_pending = !1);
    }));
  }
  #m() {
    var t = this.#e;
    return this.is_pending && (this.#f = de(), this.#e.before(this.#f), t = this.#f), t;
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    Zr(t, this.#p, this.#h);
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#r.pending;
  }
  /**
   * @param {() => Effect | null} fn
   */
  #g(t) {
    var r = y, n = m, s = C;
    he(this.#l), X(this.#l), ft(this.#l.ctx);
    try {
      return t();
    } catch (i) {
      return Xr(i), null;
    } finally {
      he(r), X(n), ft(s);
    }
  }
  #_() {
    const t = (
      /** @type {(anchor: Node) => void} */
      this.#r.pending
    );
    this.#s !== null && (this.#o = document.createDocumentFragment(), this.#o.append(
      /** @type {TemplateNode} */
      this.#f
    ), yn(this.#s, this.#o)), this.#n === null && (this.#n = le(() => t(this.#e)));
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   */
  #b(t) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#b(t);
      return;
    }
    if (this.#c += t, this.#c === 0) {
      this.is_pending = !1;
      for (const r of this.#p)
        P(r, G), Se(r);
      for (const r of this.#h)
        P(r, ge), Se(r);
      this.#p.clear(), this.#h.clear(), this.#n && Ue(this.#n, () => {
        this.#n = null;
      }), this.#o && (this.#e.before(this.#o), this.#o = null);
    }
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(t) {
    this.#b(t), this.#u += t, this.#d && ct(this.#d, this.#u);
  }
  get_effect_pending() {
    return this.#w(), c(
      /** @type {Source<number>} */
      this.#d
    );
  }
  /** @param {unknown} error */
  error(t) {
    var r = this.#r.onerror;
    let n = this.#r.failed;
    if (this.#v || !r && !n)
      throw t;
    this.#s && (W(this.#s), this.#s = null), this.#n && (W(this.#n), this.#n = null), this.#a && (W(this.#a), this.#a = null), q && (Q(
      /** @type {TemplateNode} */
      this.#t
    ), Ur(), Q(It()));
    var s = !1, i = !1;
    const l = () => {
      if (s) {
        as();
        return;
      }
      s = !0, i && ls(), ue.ensure(), this.#u = 0, this.#a !== null && Ue(this.#a, () => {
        this.#a = null;
      }), this.is_pending = this.has_pending_snippet(), this.#s = this.#g(() => (this.#v = !1, le(() => this.#i(this.#e)))), this.#c > 0 ? this.#_() : this.is_pending = !1;
    };
    var a = m;
    try {
      X(null), i = !0, r?.(t, l), i = !1;
    } catch (o) {
      ut(o, this.#l && this.#l.parent);
    } finally {
      X(a);
    }
    n && kt(() => {
      this.#a = this.#g(() => {
        ue.ensure(), this.#v = !0;
        try {
          return le(() => {
            n(
              this.#e,
              () => t,
              () => l
            );
          });
        } catch (o) {
          return ut(
            o,
            /** @type {Effect} */
            this.#l.parent
          ), null;
        } finally {
          this.#v = !1;
        }
      });
    });
  }
}
function gs(e, t, r, n) {
  const s = Et() ? hr : gr;
  if (r.length === 0 && e.length === 0) {
    n(t.map(s));
    return;
  }
  var i = S, l = (
    /** @type {Effect} */
    y
  ), a = _s();
  function o() {
    Promise.all(r.map((f) => /* @__PURE__ */ ms(f))).then((f) => {
      a();
      try {
        n([...t.map(s), ...f]);
      } catch (u) {
        (l.f & ke) === 0 && ut(u, l);
      }
      i?.deactivate(), Dt();
    }).catch((f) => {
      ut(f, l);
    });
  }
  e.length > 0 ? Promise.all(e).then(() => {
    a();
    try {
      return o();
    } finally {
      i?.deactivate(), Dt();
    }
  }) : o();
}
function _s() {
  var e = y, t = m, r = C, n = S;
  return function(i = !0) {
    he(e), X(t), ft(r), i && n?.activate();
  };
}
function Dt() {
  he(null), X(null), ft(null);
}
// @__NO_SIDE_EFFECTS__
function hr(e) {
  var t = j | G, r = m !== null && (m.f & j) !== 0 ? (
    /** @type {Derived} */
    m
  ) : null;
  return y !== null && (y.f |= Qe), {
    ctx: C,
    deps: null,
    effects: null,
    equals: Gr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      L
    ),
    wv: 0,
    parent: r ?? y,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function ms(e, t, r) {
  let n = (
    /** @type {Effect | null} */
    y
  );
  n === null && Jn();
  var s = (
    /** @type {Boundary} */
    n.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), l = Je(
    /** @type {V} */
    L
  ), a = !m, o = /* @__PURE__ */ new Map();
  return As(() => {
    var f = jr();
    i = f.promise;
    try {
      Promise.resolve(e()).then(f.resolve, f.reject).then(() => {
        u === S && u.committed && u.deactivate(), Dt();
      });
    } catch (d) {
      f.reject(d), Dt();
    }
    var u = (
      /** @type {Batch} */
      S
    );
    if (a) {
      var h = s.is_rendered();
      s.update_pending_count(1), u.increment(h), o.get(u)?.reject(nt), o.delete(u), o.set(u, f);
    }
    const v = (d, g = void 0) => {
      if (u.activate(), g)
        g !== nt && (l.f |= De, ct(l, g));
      else {
        (l.f & De) !== 0 && (l.f ^= De), ct(l, d);
        for (const [E, p] of o) {
          if (o.delete(E), E === u) break;
          p.reject(nt);
        }
      }
      a && (s.update_pending_count(-1), u.decrement(h));
    };
    f.promise.then(v, (d) => v(null, d || "unknown"));
  }), pn(() => {
    for (const f of o.values())
      f.reject(nt);
  }), new Promise((f) => {
    function u(h) {
      function v() {
        h === i ? f(l) : u(i);
      }
      h.then(v, v);
    }
    u(i);
  });
}
// @__NO_SIDE_EFFECTS__
function gr(e) {
  const t = /* @__PURE__ */ hr(e);
  return t.equals = Kr, t;
}
function nn(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      W(
        /** @type {Effect} */
        t[r]
      );
  }
}
function bs(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & j) === 0)
      return (t.f & ke) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function _r(e) {
  var t, r = y;
  he(bs(e));
  try {
    e.f &= ~Ke, nn(e), t = En(e);
  } finally {
    he(r);
  }
  return t;
}
function sn(e) {
  var t = _r(e);
  if (!e.equals(t) && (e.wv = qn(), (!S?.is_fork || e.deps === null) && (e.v = t, e.deps === null))) {
    P(e, z);
    return;
  }
  Le || (fe !== null ? (br() || S?.is_fork) && fe.set(e, t) : pr(e));
}
let nr = /* @__PURE__ */ new Set();
const Fe = /* @__PURE__ */ new Map();
let ln = !1;
function Je(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Gr,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function Pe(e, t) {
  const r = Je(e);
  return Cs(r), r;
}
// @__NO_SIDE_EFFECTS__
function Be(e, t = !1, r = !0) {
  const n = Je(e);
  return t || (n.equals = Kr), $t && r && C !== null && C.l !== null && (C.l.s ??= []).push(n), n;
}
function ws(e, t) {
  return I(
    e,
    R(() => c(e))
  ), t;
}
function I(e, t, r = !1) {
  m !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!ce || (m.f & Er) !== 0) && Et() && (m.f & (j | Ae | dr | Er)) !== 0 && !Te?.includes(e) && is();
  let n = r ? st(t) : t;
  return ct(e, n);
}
function ct(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    Le ? Fe.set(e, t) : Fe.set(e, r), e.v = t;
    var n = ue.ensure();
    if (n.capture(e, r), (e.f & j) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & G) !== 0 && _r(s), pr(s);
    }
    e.wv = qn(), an(e, G), Et() && y !== null && (y.f & z) !== 0 && (y.f & (Ne | ze)) === 0 && (ne === null ? Os([e]) : ne.push(e)), !n.is_fork && nr.size > 0 && !ln && ys();
  }
  return t;
}
function ys() {
  ln = !1;
  var e = We;
  Ft(!0);
  const t = Array.from(nr);
  try {
    for (const r of t)
      (r.f & z) !== 0 && P(r, ge), pt(r) && dt(r);
  } finally {
    Ft(e);
  }
  nr.clear();
}
function wt(e) {
  I(e, e.v + 1);
}
function an(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = Et(), s = r.length, i = 0; i < s; i++) {
      var l = r[i], a = l.f;
      if (!(!n && l === y)) {
        var o = (a & G) === 0;
        if (o && P(l, t), (a & j) !== 0) {
          var f = (
            /** @type {Derived} */
            l
          );
          fe?.delete(f), (a & Ke) === 0 && (a & ae && (l.f |= Ke), an(f, ge));
        } else o && ((a & Ae) !== 0 && qe !== null && qe.add(
          /** @type {Effect} */
          l
        ), Se(
          /** @type {Effect} */
          l
        ));
      }
    }
}
function st(e) {
  if (typeof e != "object" || e === null || it in e)
    return e;
  const t = ur(e);
  if (t !== Wn && t !== Gn)
    return e;
  var r = /* @__PURE__ */ new Map(), n = Lr(e), s = /* @__PURE__ */ Pe(0), i = Ge, l = (a) => {
    if (Ge === i)
      return a();
    var o = m, f = Ge;
    X(null), Nr(i);
    var u = a();
    return X(o), Nr(f), u;
  };
  return n && r.set("length", /* @__PURE__ */ Pe(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, o, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && ns();
        var u = r.get(o);
        return u === void 0 ? u = l(() => {
          var h = /* @__PURE__ */ Pe(f.value);
          return r.set(o, h), h;
        }) : I(u, f.value, !0), !0;
      },
      deleteProperty(a, o) {
        var f = r.get(o);
        if (f === void 0) {
          if (o in a) {
            const u = l(() => /* @__PURE__ */ Pe(L));
            r.set(o, u), wt(s);
          }
        } else
          I(f, L), wt(s);
        return !0;
      },
      get(a, o, f) {
        if (o === it)
          return e;
        var u = r.get(o), h = o in a;
        if (u === void 0 && (!h || Ve(a, o)?.writable) && (u = l(() => {
          var d = st(h ? a[o] : L), g = /* @__PURE__ */ Pe(d);
          return g;
        }), r.set(o, u)), u !== void 0) {
          var v = c(u);
          return v === L ? void 0 : v;
        }
        return Reflect.get(a, o, f);
      },
      getOwnPropertyDescriptor(a, o) {
        var f = Reflect.getOwnPropertyDescriptor(a, o);
        if (f && "value" in f) {
          var u = r.get(o);
          u && (f.value = c(u));
        } else if (f === void 0) {
          var h = r.get(o), v = h?.v;
          if (h !== void 0 && v !== L)
            return {
              enumerable: !0,
              configurable: !0,
              value: v,
              writable: !0
            };
        }
        return f;
      },
      has(a, o) {
        if (o === it)
          return !0;
        var f = r.get(o), u = f !== void 0 && f.v !== L || Reflect.has(a, o);
        if (f !== void 0 || y !== null && (!u || Ve(a, o)?.writable)) {
          f === void 0 && (f = l(() => {
            var v = u ? st(a[o]) : L, d = /* @__PURE__ */ Pe(v);
            return d;
          }), r.set(o, f));
          var h = c(f);
          if (h === L)
            return !1;
        }
        return u;
      },
      set(a, o, f, u) {
        var h = r.get(o), v = o in a;
        if (n && o === "length")
          for (var d = f; d < /** @type {Source<number>} */
          h.v; d += 1) {
            var g = r.get(d + "");
            g !== void 0 ? I(g, L) : d in a && (g = l(() => /* @__PURE__ */ Pe(L)), r.set(d + "", g));
          }
        if (h === void 0)
          (!v || Ve(a, o)?.writable) && (h = l(() => /* @__PURE__ */ Pe(void 0)), I(h, st(f)), r.set(o, h));
        else {
          v = h.v !== L;
          var E = l(() => st(f));
          I(h, E);
        }
        var p = Reflect.getOwnPropertyDescriptor(a, o);
        if (p?.set && p.set.call(u, f), !v) {
          if (n && typeof o == "string") {
            var _ = (
              /** @type {Source<number>} */
              r.get("length")
            ), $ = Number(o);
            Number.isInteger($) && $ >= _.v && I(_, $ + 1);
          }
          wt(s);
        }
        return !0;
      },
      ownKeys(a) {
        c(s);
        var o = Reflect.ownKeys(a).filter((h) => {
          var v = r.get(h);
          return v === void 0 || v.v !== L;
        });
        for (var [f, u] of r)
          u.v !== L && !(f in a) && o.push(f);
        return o;
      },
      setPrototypeOf() {
        ss();
      }
    }
  );
}
var Tr, on, fn, un;
function sr() {
  if (Tr === void 0) {
    Tr = window, on = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, r = Text.prototype;
    fn = Ve(t, "firstChild").get, un = Ve(t, "nextSibling").get, xr(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), xr(r) && (r.__t = void 0);
  }
}
function de(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  return (
    /** @type {TemplateNode | null} */
    fn.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function _e(e) {
  return (
    /** @type {TemplateNode | null} */
    un.call(e)
  );
}
function w(e, t) {
  if (!q)
    return /* @__PURE__ */ Xe(e);
  var r = /* @__PURE__ */ Xe(x);
  if (r === null)
    r = x.appendChild(de());
  else if (t && r.nodeType !== vr) {
    var n = de();
    return r?.before(n), Q(n), n;
  }
  return Q(r), r;
}
function $s(e, t = !1) {
  if (!q) {
    var r = /* @__PURE__ */ Xe(e);
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ _e(r) : r;
  }
  if (t && x?.nodeType !== vr) {
    var n = de();
    return x?.before(n), Q(n), n;
  }
  return x;
}
function k(e, t = 1, r = !1) {
  let n = q ? x : e;
  for (var s; t--; )
    s = n, n = /** @type {TemplateNode} */
    /* @__PURE__ */ _e(n);
  if (!q)
    return n;
  if (r && n?.nodeType !== vr) {
    var i = de();
    return n === null ? s?.after(i) : n.before(i), Q(i), i;
  }
  return Q(n), n;
}
function cn(e) {
  e.textContent = "";
}
function dn() {
  return !1;
}
function mr(e) {
  var t = m, r = y;
  X(null), he(null);
  try {
    return e();
  } finally {
    X(t), he(r);
  }
}
function vn(e) {
  y === null && (m === null && Zn(), Qn()), Le && Xn();
}
function qs(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function ve(e, t, r) {
  var n = y;
  n !== null && (n.f & re) !== 0 && (e |= re);
  var s = {
    ctx: C,
    deps: null,
    nodes: null,
    f: e | G | ae,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      dt(s), s.f |= Bt;
    } catch (a) {
      throw W(s), a;
    }
  else t !== null && Se(s);
  var i = s;
  if (r && i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
  (i.f & Qe) === 0 && (i = i.first, (e & Ae) !== 0 && (e & ot) !== 0 && i !== null && (i.f |= ot)), i !== null && (i.parent = n, n !== null && qs(i, n), m !== null && (m.f & j) !== 0 && (e & ze) === 0)) {
    var l = (
      /** @type {Derived} */
      m
    );
    (l.effects ??= []).push(i);
  }
  return s;
}
function br() {
  return m !== null && !ce;
}
function pn(e) {
  const t = ve(qt, null, !1);
  return P(t, z), t.teardown = e, t;
}
function Sr(e) {
  vn();
  var t = (
    /** @type {Effect} */
    y.f
  ), r = !m && (t & Ne) !== 0 && (t & Bt) === 0;
  if (r) {
    var n = (
      /** @type {ComponentContext} */
      C
    );
    (n.e ??= []).push(e);
  } else
    return hn(e);
}
function hn(e) {
  return ve(Mt | Yr, e, !1);
}
function xs(e) {
  return vn(), ve(qt | Yr, e, !0);
}
function Es(e) {
  ue.ensure();
  const t = ve(ze | Qe, e, !0);
  return () => {
    W(t);
  };
}
function ks(e) {
  ue.ensure();
  const t = ve(ze | Qe, e, !0);
  return (r = {}) => new Promise((n) => {
    r.outro ? Ue(t, () => {
      W(t), n(void 0);
    }) : (W(t), n(void 0));
  });
}
function Ts(e) {
  return ve(Mt, e, !1);
}
function Xt(e, t) {
  var r = (
    /** @type {ComponentContextLegacy} */
    C
  ), n = { effect: null, ran: !1, deps: e };
  r.l.$.push(n), n.effect = Wt(() => {
    e(), !n.ran && (n.ran = !0, R(t));
  });
}
function Ss() {
  var e = (
    /** @type {ComponentContextLegacy} */
    C
  );
  Wt(() => {
    for (var t of e.l.$) {
      t.deps();
      var r = t.effect;
      (r.f & z) !== 0 && r.deps !== null && P(r, ge), pt(r) && dt(r), t.ran = !1;
    }
  });
}
function As(e) {
  return ve(dr | Qe, e, !0);
}
function Wt(e, t = 0) {
  return ve(qt | t, e, !0);
}
function Ie(e, t = [], r = [], n = []) {
  gs(n, t, r, (s) => {
    ve(qt, () => e(...s.map(c)), !0);
  });
}
function wr(e, t = 0) {
  var r = ve(Ae | t, e, !0);
  return r;
}
function le(e) {
  return ve(Ne | Qe, e, !0);
}
function gn(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = Le, n = m;
    Ar(!0), X(null);
    try {
      t.call(null);
    } finally {
      Ar(r), X(n);
    }
  }
}
function _n(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const s = r.ac;
    s !== null && mr(() => {
      s.abort(nt);
    });
    var n = r.next;
    (r.f & ze) !== 0 ? r.parent = null : W(r, t), r = n;
  }
}
function Ns(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & Ne) === 0 && W(t), t = r;
  }
}
function W(e, t = !0) {
  var r = !1;
  (t || (e.f & Hr) !== 0) && e.nodes !== null && e.nodes.end !== null && (Rs(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), r = !0), _n(e, t && !r), Lt(e, 0), P(e, ke);
  var n = e.nodes && e.nodes.t;
  if (n !== null)
    for (const i of n)
      i.stop();
  gn(e);
  var s = e.parent;
  s !== null && s.first !== null && mn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function Rs(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : /* @__PURE__ */ _e(e);
    e.remove(), e = r;
  }
}
function mn(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function Ue(e, t, r = !0) {
  var n = [];
  bn(e, n, !0);
  var s = () => {
    r && W(e), t && t();
  }, i = n.length;
  if (i > 0) {
    var l = () => --i || s();
    for (var a of n)
      a.out(l);
  } else
    s();
}
function bn(e, t, r) {
  if ((e.f & re) === 0) {
    e.f ^= re;
    var n = e.nodes && e.nodes.t;
    if (n !== null)
      for (const a of n)
        (a.is_global || r) && t.push(a);
    for (var s = e.first; s !== null; ) {
      var i = s.next, l = (s.f & ot) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (s.f & Ne) !== 0 && (e.f & Ae) !== 0;
      bn(s, t, l ? r : !1), s = i;
    }
  }
}
function yr(e) {
  wn(e, !0);
}
function wn(e, t) {
  if ((e.f & re) !== 0) {
    e.f ^= re, (e.f & z) === 0 && (P(e, G), Se(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, s = (r.f & ot) !== 0 || (r.f & Ne) !== 0;
      wn(r, s ? t : !1), r = n;
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const l of i)
        (l.is_global || t) && l.in();
  }
}
function yn(e, t) {
  if (e.nodes)
    for (var r = e.nodes.start, n = e.nodes.end; r !== null; ) {
      var s = r === n ? null : /* @__PURE__ */ _e(r);
      t.append(r), r = s;
    }
}
let We = !1;
function Ft(e) {
  We = e;
}
let Le = !1;
function Ar(e) {
  Le = e;
}
let m = null, ce = !1;
function X(e) {
  m = e;
}
let y = null;
function he(e) {
  y = e;
}
let Te = null;
function Cs(e) {
  m !== null && (Te === null ? Te = [e] : Te.push(e));
}
let J = null, te = 0, ne = null;
function Os(e) {
  ne = e;
}
let $n = 1, Ye = 0, Ge = Ye;
function Nr(e) {
  Ge = e;
}
function qn() {
  return ++$n;
}
function pt(e) {
  var t = e.f;
  if ((t & G) !== 0)
    return !0;
  if (t & j && (e.f &= ~Ke), (t & ge) !== 0) {
    for (var r = (
      /** @type {Value[]} */
      e.deps
    ), n = r.length, s = 0; s < n; s++) {
      var i = r[s];
      if (pt(
        /** @type {Derived} */
        i
      ) && sn(
        /** @type {Derived} */
        i
      ), i.wv > e.wv)
        return !0;
    }
    (t & ae) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    fe === null && P(e, z);
  }
  return !1;
}
function xn(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !Te?.includes(e))
    for (var s = 0; s < n.length; s++) {
      var i = n[s];
      (i.f & j) !== 0 ? xn(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (r ? P(i, G) : (i.f & z) !== 0 && P(i, ge), Se(
        /** @type {Effect} */
        i
      ));
    }
}
function En(e) {
  var t = J, r = te, n = ne, s = m, i = Te, l = C, a = ce, o = Ge, f = e.f;
  J = /** @type {null | Value[]} */
  null, te = 0, ne = null, m = (f & (Ne | ze)) === 0 ? e : null, Te = null, ft(e.ctx), ce = !1, Ge = ++Ye, e.ac !== null && (mr(() => {
    e.ac.abort(nt);
  }), e.ac = null);
  try {
    e.f |= tr;
    var u = (
      /** @type {Function} */
      e.fn
    ), h = u(), v = e.deps;
    if (J !== null) {
      var d;
      if (Lt(e, te), v !== null && te > 0)
        for (v.length = te + J.length, d = 0; d < J.length; d++)
          v[te + d] = J[d];
      else
        e.deps = v = J;
      if (br() && (e.f & ae) !== 0)
        for (d = te; d < v.length; d++)
          (v[d].reactions ??= []).push(e);
    } else v !== null && te < v.length && (Lt(e, te), v.length = te);
    if (Et() && ne !== null && !ce && v !== null && (e.f & (j | ge | G)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      ne.length; d++)
        xn(
          ne[d],
          /** @type {Effect} */
          e
        );
    if (s !== null && s !== e) {
      if (Ye++, s.deps !== null)
        for (let g = 0; g < r; g += 1)
          s.deps[g].rv = Ye;
      if (t !== null)
        for (const g of t)
          g.rv = Ye;
      ne !== null && (n === null ? n = ne : n.push(.../** @type {Source[]} */
      ne));
    }
    return (e.f & De) !== 0 && (e.f ^= De), h;
  } catch (g) {
    return Xr(g);
  } finally {
    e.f ^= tr, J = t, te = r, ne = n, m = s, Te = i, ft(l), ce = a, Ge = o;
  }
}
function Ps(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = Un.call(r, e);
    if (n !== -1) {
      var s = r.length - 1;
      s === 0 ? r = t.reactions = null : (r[n] = r[s], r.pop());
    }
  }
  if (r === null && (t.f & j) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (J === null || !J.includes(t))) {
    var i = (
      /** @type {Derived} */
      t
    );
    (i.f & ae) !== 0 && (i.f ^= ae, i.f &= ~Ke), pr(i), nn(i), Lt(i, 0);
  }
}
function Lt(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      Ps(e, r[n]);
}
function dt(e) {
  var t = e.f;
  if ((t & ke) === 0) {
    P(e, z);
    var r = y, n = We;
    y = e, We = !0;
    try {
      (t & (Ae | Br)) !== 0 ? Ns(e) : _n(e), gn(e);
      var s = En(e);
      e.teardown = typeof s == "function" ? s : null, e.wv = $n;
      var i;
      Zt && Mn && (e.f & G) !== 0 && e.deps;
    } finally {
      We = n, y = r;
    }
  }
}
function c(e) {
  var t = e.f, r = (t & j) !== 0;
  if (m !== null && !ce) {
    var n = y !== null && (y.f & ke) !== 0;
    if (!n && !Te?.includes(e)) {
      var s = m.deps;
      if ((m.f & tr) !== 0)
        e.rv < Ye && (e.rv = Ye, J === null && s !== null && s[te] === e ? te++ : J === null ? J = [e] : J.push(e));
      else {
        (m.deps ??= []).push(e);
        var i = e.reactions;
        i === null ? e.reactions = [m] : i.includes(m) || i.push(m);
      }
    }
  }
  if (Le && Fe.has(e))
    return Fe.get(e);
  if (r) {
    var l = (
      /** @type {Derived} */
      e
    );
    if (Le) {
      var a = l.v;
      return ((l.f & z) === 0 && l.reactions !== null || Tn(l)) && (a = _r(l)), Fe.set(l, a), a;
    }
    var o = (l.f & ae) === 0 && !ce && m !== null && (We || (m.f & ae) !== 0), f = l.deps === null;
    pt(l) && (o && (l.f |= ae), sn(l)), o && !f && kn(l);
  }
  if (fe?.has(e))
    return fe.get(e);
  if ((e.f & De) !== 0)
    throw e.v;
  return e.v;
}
function kn(e) {
  if (e.deps !== null) {
    e.f |= ae;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & j) !== 0 && (t.f & ae) === 0 && kn(
        /** @type {Derived} */
        t
      );
  }
}
function Tn(e) {
  if (e.v === L) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Fe.has(t) || (t.f & j) !== 0 && Tn(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function R(e) {
  var t = ce;
  try {
    return ce = !0, e();
  } finally {
    ce = t;
  }
}
function ir(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (it in e)
      lr(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const r = e[t];
        typeof r == "object" && r && it in r && lr(r);
      }
  }
}
function lr(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let n in e)
      try {
        lr(e[n], t);
      } catch {
      }
    const r = ur(e);
    if (r !== Object.prototype && r !== Array.prototype && r !== Map.prototype && r !== Set.prototype && r !== Date.prototype) {
      const n = zr(r);
      for (let s in n) {
        const i = n[s].get;
        if (i)
          try {
            i.call(e);
          } catch {
          }
      }
    }
  }
}
const Ms = /* @__PURE__ */ new Set(), Rr = /* @__PURE__ */ new Set();
function Is(e, t, r, n = {}) {
  function s(i) {
    if (n.capture || _t.call(t, i), !i.cancelBubble)
      return mr(() => r?.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? kt(() => {
    t.addEventListener(e, s, n);
  }) : t.addEventListener(e, s, n), s;
}
function gt(e, t, r, n, s) {
  var i = { capture: n, passive: s }, l = Is(e, t, r, i);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && pn(() => {
    t.removeEventListener(e, l, i);
  });
}
let Cr = null;
function _t(e) {
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, s = e.composedPath?.() || [], i = (
    /** @type {null | Element} */
    s[0] || e.target
  );
  Cr = e;
  var l = 0, a = Cr === e && e.__root;
  if (a) {
    var o = s.indexOf(a);
    if (o !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var f = s.indexOf(t);
    if (f === -1)
      return;
    o <= f && (l = o);
  }
  if (i = /** @type {Element} */
  s[l] || e.target, i !== t) {
    Pt(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || r;
      }
    });
    var u = m, h = y;
    X(null), he(null);
    try {
      for (var v, d = []; i !== null; ) {
        var g = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var E = i["__" + n];
          E != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i) && E.call(i, e);
        } catch (p) {
          v ? d.push(p) : v = p;
        }
        if (e.cancelBubble || g === t || g === null)
          break;
        i = g;
      }
      if (v) {
        for (let p of d)
          queueMicrotask(() => {
            throw p;
          });
        throw v;
      }
    } finally {
      e.__root = t, delete e.currentTarget, X(u), he(h);
    }
  }
}
function Ds(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function Rt(e, t) {
  var r = (
    /** @type {Effect} */
    y
  );
  r.nodes === null && (r.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function D(e, t) {
  var r = (t & Hn) !== 0, n = (t & Yn) !== 0, s, i = !e.startsWith("<!>");
  return () => {
    if (q)
      return Rt(x, null), x;
    s === void 0 && (s = Ds(i ? e : "<!>" + e), r || (s = /** @type {TemplateNode} */
    /* @__PURE__ */ Xe(s)));
    var l = (
      /** @type {TemplateNode} */
      n || on ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (r) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Xe(l)
      ), o = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      Rt(a, o);
    } else
      Rt(l, l);
    return l;
  };
}
function O(e, t) {
  if (q) {
    var r = (
      /** @type {Effect & { nodes: EffectNodes }} */
      y
    );
    ((r.f & Bt) === 0 || r.nodes.end === null) && (r.nodes.end = x), xt();
    return;
  }
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const Fs = ["touchstart", "touchmove"];
function Ls(e) {
  return Fs.includes(e);
}
function se(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ??= e.nodeValue) && (e.__t = r, e.nodeValue = r + "");
}
function Sn(e, t) {
  return An(e, t);
}
function zs(e, t) {
  sr(), t.intro = t.intro ?? !1;
  const r = t.target, n = q, s = x;
  try {
    for (var i = /* @__PURE__ */ Xe(r); i && (i.nodeType !== vt || /** @type {Comment} */
    i.data !== Fr); )
      i = /* @__PURE__ */ _e(i);
    if (!i)
      throw at;
    Ee(!0), Q(
      /** @type {Comment} */
      i
    );
    const l = An(e, { ...t, anchor: i });
    return Ee(!1), /**  @type {Exports} */
    l;
  } catch (l) {
    if (l instanceof Error && l.message.split(`
`).some((a) => a.startsWith("https://svelte.dev/e/")))
      throw l;
    return l !== at && console.warn("Failed to hydrate: ", l), t.recover === !1 && ts(), sr(), cn(r), Ee(!1), Sn(e, t);
  } finally {
    Ee(n), Q(s);
  }
}
const tt = /* @__PURE__ */ new Map();
function An(e, { target: t, anchor: r, props: n = {}, events: s, context: i, intro: l = !0 }) {
  sr();
  var a = /* @__PURE__ */ new Set(), o = (h) => {
    for (var v = 0; v < h.length; v++) {
      var d = h[v];
      if (!a.has(d)) {
        a.add(d);
        var g = Ls(d);
        t.addEventListener(d, _t, { passive: g });
        var E = tt.get(d);
        E === void 0 ? (document.addEventListener(d, _t, { passive: g }), tt.set(d, 1)) : tt.set(d, E + 1);
      }
    }
  };
  o(jt(Ms)), Rr.add(o);
  var f = void 0, u = ks(() => {
    var h = r ?? t.appendChild(de());
    return ps(
      /** @type {TemplateNode} */
      h,
      {
        pending: () => {
        }
      },
      (v) => {
        if (i) {
          Yt({});
          var d = (
            /** @type {ComponentContext} */
            C
          );
          d.c = i;
        }
        if (s && (n.$$events = s), q && Rt(
          /** @type {TemplateNode} */
          v,
          null
        ), f = e(v, n) || {}, q && (y.nodes.end = x, x === null || x.nodeType !== vt || /** @type {Comment} */
        x.data !== fr))
          throw Ht(), at;
        i && Vt();
      }
    ), () => {
      for (var v of a) {
        t.removeEventListener(v, _t);
        var d = (
          /** @type {number} */
          tt.get(v)
        );
        --d === 0 ? (document.removeEventListener(v, _t), tt.delete(v)) : tt.set(v, d);
      }
      Rr.delete(o), h !== r && h.parentNode?.removeChild(h);
    };
  });
  return ar.set(f, u), f;
}
let ar = /* @__PURE__ */ new WeakMap();
function js(e, t) {
  const r = ar.get(e);
  return r ? (ar.delete(e), r(t)) : Promise.resolve();
}
class Bs {
  /** @type {TemplateNode} */
  anchor;
  /** @type {Map<Batch, Key>} */
  #e = /* @__PURE__ */ new Map();
  /**
   * Map of keys to effects that are currently rendered in the DOM.
   * These effects are visible and actively part of the document tree.
   * Example:
   * ```
   * {#if condition}
   * 	foo
   * {:else}
   * 	bar
   * {/if}
   * ```
   * Can result in the entries `true->Effect` and `false->Effect`
   * @type {Map<Key, Effect>}
   */
  #t = /* @__PURE__ */ new Map();
  /**
   * Similar to #onscreen with respect to the keys, but contains branches that are not yet
   * in the DOM, because their insertion is deferred.
   * @type {Map<Key, Branch>}
   */
  #r = /* @__PURE__ */ new Map();
  /**
   * Keys of effects that are currently outroing
   * @type {Set<Key>}
   */
  #i = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #l = !0;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, r = !0) {
    this.anchor = t, this.#l = r;
  }
  #s = () => {
    var t = (
      /** @type {Batch} */
      S
    );
    if (this.#e.has(t)) {
      var r = (
        /** @type {Key} */
        this.#e.get(t)
      ), n = this.#t.get(r);
      if (n)
        yr(n), this.#i.delete(r);
      else {
        var s = this.#r.get(r);
        s && (this.#t.set(r, s.effect), this.#r.delete(r), s.fragment.lastChild.remove(), this.anchor.before(s.fragment), n = s.effect);
      }
      for (const [i, l] of this.#e) {
        if (this.#e.delete(i), i === t)
          break;
        const a = this.#r.get(l);
        a && (W(a.effect), this.#r.delete(l));
      }
      for (const [i, l] of this.#t) {
        if (i === r || this.#i.has(i)) continue;
        const a = () => {
          if (Array.from(this.#e.values()).includes(i)) {
            var f = document.createDocumentFragment();
            yn(l, f), f.append(de()), this.#r.set(i, { effect: l, fragment: f });
          } else
            W(l);
          this.#i.delete(i), this.#t.delete(i);
        };
        this.#l || !n ? (this.#i.add(i), Ue(l, a, !1)) : a();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #n = (t) => {
    this.#e.delete(t);
    const r = Array.from(this.#e.values());
    for (const [n, s] of this.#r)
      r.includes(n) || (W(s.effect), this.#r.delete(n));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, r) {
    var n = (
      /** @type {Batch} */
      S
    ), s = dn();
    if (r && !this.#t.has(t) && !this.#r.has(t))
      if (s) {
        var i = document.createDocumentFragment(), l = de();
        i.append(l), this.#r.set(t, {
          effect: le(() => r(l)),
          fragment: i
        });
      } else
        this.#t.set(
          t,
          le(() => r(this.anchor))
        );
    if (this.#e.set(n, t), s) {
      for (const [a, o] of this.#t)
        a === t ? n.skipped_effects.delete(o) : n.skipped_effects.add(o);
      for (const [a, o] of this.#r)
        a === t ? n.skipped_effects.delete(o.effect) : n.skipped_effects.add(o.effect);
      n.oncommit(this.#s), n.ondiscard(this.#n);
    } else
      q && (this.anchor = x), this.#s();
  }
}
function $e(e, t, r = !1) {
  q && xt();
  var n = new Bs(e), s = r ? ot : 0;
  function i(l, a) {
    if (q) {
      const f = Wr(e) === zt;
      if (l === f) {
        var o = It();
        Q(o), n.anchor = o, Ee(!1), n.ensure(l, a), Ee(!0);
        return;
      }
    }
    n.ensure(l, a);
  }
  wr(() => {
    var l = !1;
    t((a, o = !0) => {
      l = !0, i(o, a);
    }), l || i(!1, null);
  }, s);
}
function Hs(e, t) {
  return t;
}
function Ys(e, t, r) {
  for (var n = [], s = t.length, i, l = t.length, a = 0; a < s; a++) {
    let h = t[a];
    Ue(
      h,
      () => {
        if (i) {
          if (i.pending.delete(h), i.done.add(h), i.pending.size === 0) {
            var v = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            or(jt(i.done)), v.delete(i), v.size === 0 && (e.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var o = n.length === 0 && r !== null;
    if (o) {
      var f = (
        /** @type {Element} */
        r
      ), u = (
        /** @type {Element} */
        f.parentNode
      );
      cn(u), u.append(f), e.items.clear();
    }
    or(t, !o);
  } else
    i = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(i);
}
function or(e, t = !0) {
  for (var r = 0; r < e.length; r++)
    W(e[r], t);
}
var Or;
function Qt(e, t, r, n, s, i = null) {
  var l = e, a = /* @__PURE__ */ new Map(), o = (t & Dr) !== 0;
  if (o) {
    var f = (
      /** @type {Element} */
      e
    );
    l = q ? Q(/* @__PURE__ */ Xe(f)) : f.appendChild(de());
  }
  q && xt();
  var u = null, h = /* @__PURE__ */ gr(() => {
    var _ = r();
    return Lr(_) ? _ : _ == null ? [] : jt(_);
  }), v, d = !0;
  function g() {
    p.fallback = u, Vs(p, v, l, t, n), u !== null && (v.length === 0 ? (u.f & xe) === 0 ? yr(u) : (u.f ^= xe, mt(u, null, l)) : Ue(u, () => {
      u = null;
    }));
  }
  var E = wr(() => {
    v = /** @type {V[]} */
    c(h);
    var _ = v.length;
    let $ = !1;
    if (q) {
      var Z = Wr(l) === zt;
      Z !== (_ === 0) && (l = It(), Q(l), Ee(!1), $ = !0);
    }
    for (var B = /* @__PURE__ */ new Set(), me = (
      /** @type {Batch} */
      S
    ), be = dn(), F = 0; F < _; F += 1) {
      q && x.nodeType === vt && /** @type {Comment} */
      x.data === fr && (l = /** @type {Comment} */
      x, $ = !0, Ee(!1));
      var pe = v[F], we = n(pe, F), M = d ? null : a.get(we);
      M ? (M.v && ct(M.v, pe), M.i && ct(M.i, F), be && me.skipped_effects.delete(M.e)) : (M = Us(
        a,
        d ? l : Or ??= de(),
        pe,
        we,
        F,
        s,
        t,
        r
      ), d || (M.e.f |= xe), a.set(we, M)), B.add(we);
    }
    if (_ === 0 && i && !u && (d ? u = le(() => i(l)) : (u = le(() => i(Or ??= de())), u.f |= xe)), q && _ > 0 && Q(It()), !d)
      if (be) {
        for (const [Gt, Kt] of a)
          B.has(Gt) || me.skipped_effects.add(Kt.e);
        me.oncommit(g), me.ondiscard(() => {
        });
      } else
        g();
    $ && Ee(!0), c(h);
  }), p = { effect: E, items: a, outrogroups: null, fallback: u };
  d = !1, q && (l = x);
}
function Vs(e, t, r, n, s) {
  var i = (n & Ln) !== 0, l = t.length, a = e.items, o = e.effect.first, f, u = null, h, v = [], d = [], g, E, p, _;
  if (i)
    for (_ = 0; _ < l; _ += 1)
      g = t[_], E = s(g, _), p = /** @type {EachItem} */
      a.get(E).e, (p.f & xe) === 0 && (p.nodes?.a?.measure(), (h ??= /* @__PURE__ */ new Set()).add(p));
  for (_ = 0; _ < l; _ += 1) {
    if (g = t[_], E = s(g, _), p = /** @type {EachItem} */
    a.get(E).e, e.outrogroups !== null)
      for (const M of e.outrogroups)
        M.pending.delete(p), M.done.delete(p);
    if ((p.f & xe) !== 0)
      if (p.f ^= xe, p === o)
        mt(p, null, r);
      else {
        var $ = u ? u.next : o;
        p === e.effect.last && (e.effect.last = p.prev), p.prev && (p.prev.next = p.next), p.next && (p.next.prev = p.prev), Me(e, u, p), Me(e, p, $), mt(p, $, r), u = p, v = [], d = [], o = u.next;
        continue;
      }
    if ((p.f & re) !== 0 && (yr(p), i && (p.nodes?.a?.unfix(), (h ??= /* @__PURE__ */ new Set()).delete(p))), p !== o) {
      if (f !== void 0 && f.has(p)) {
        if (v.length < d.length) {
          var Z = d[0], B;
          u = Z.prev;
          var me = v[0], be = v[v.length - 1];
          for (B = 0; B < v.length; B += 1)
            mt(v[B], Z, r);
          for (B = 0; B < d.length; B += 1)
            f.delete(d[B]);
          Me(e, me.prev, be.next), Me(e, u, me), Me(e, be, Z), o = Z, u = be, _ -= 1, v = [], d = [];
        } else
          f.delete(p), mt(p, o, r), Me(e, p.prev, p.next), Me(e, p, u === null ? e.effect.first : u.next), Me(e, u, p), u = p;
        continue;
      }
      for (v = [], d = []; o !== null && o !== p; )
        (f ??= /* @__PURE__ */ new Set()).add(o), d.push(o), o = o.next;
      if (o === null)
        continue;
    }
    (p.f & xe) === 0 && v.push(p), u = p, o = p.next;
  }
  if (e.outrogroups !== null) {
    for (const M of e.outrogroups)
      M.pending.size === 0 && (or(jt(M.done)), e.outrogroups?.delete(M));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (o !== null || f !== void 0) {
    var F = [];
    if (f !== void 0)
      for (p of f)
        (p.f & re) === 0 && F.push(p);
    for (; o !== null; )
      (o.f & re) === 0 && o !== e.fallback && F.push(o), o = o.next;
    var pe = F.length;
    if (pe > 0) {
      var we = (n & Dr) !== 0 && l === 0 ? r : null;
      if (i) {
        for (_ = 0; _ < pe; _ += 1)
          F[_].nodes?.a?.measure();
        for (_ = 0; _ < pe; _ += 1)
          F[_].nodes?.a?.fix();
      }
      Ys(e, F, we);
    }
  }
  i && kt(() => {
    if (h !== void 0)
      for (p of h)
        p.nodes?.a?.apply();
  });
}
function Us(e, t, r, n, s, i, l, a) {
  var o = (l & Dn) !== 0 ? (l & zn) === 0 ? /* @__PURE__ */ Be(r, !1, !1) : Je(r) : null, f = (l & Fn) !== 0 ? Je(s) : null;
  return {
    v: o,
    i: f,
    e: le(() => (i(t, o ?? r, f ?? s, a), () => {
      e.delete(n);
    }))
  };
}
function mt(e, t, r) {
  if (e.nodes)
    for (var n = e.nodes.start, s = e.nodes.end, i = t && (t.f & xe) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : r; n !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ _e(n)
      );
      if (i.before(n), n === s)
        return;
      n = l;
    }
}
function Me(e, t, r) {
  t === null ? e.effect.first = r : t.next = r, r === null ? e.effect.last = t : r.prev = t;
}
function Ws(e, t, r, n, s) {
  q && xt();
  var i = t.$$slots?.[r], l = !1;
  i === !0 && (i = t.children, l = !0), i === void 0 || i(e, l ? () => n : n);
}
function $r(e, t) {
  Ts(() => {
    var r = e.getRootNode(), n = (
      /** @type {ShadowRoot} */
      r.host ? (
        /** @type {ShadowRoot} */
        r
      ) : (
        /** @type {Document} */
        r.head ?? /** @type {Document} */
        r.ownerDocument.head
      )
    );
    if (!n.querySelector("#" + t.hash)) {
      const s = document.createElement("style");
      s.id = t.hash, s.textContent = t.code, n.appendChild(s);
    }
  });
}
const Pr = [...` 	
\r\f \v\uFEFF`];
function Gs(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (t && (n = n ? n + " " + t : t), r) {
    for (var s in r)
      if (r[s])
        n = n ? n + " " + s : s;
      else if (n.length)
        for (var i = s.length, l = 0; (l = n.indexOf(s, l)) >= 0; ) {
          var a = l + i;
          (l === 0 || Pr.includes(n[l - 1])) && (a === n.length || Pr.includes(n[a])) ? n = (l === 0 ? "" : n.substring(0, l)) + n.substring(a + 1) : l = a;
        }
  }
  return n === "" ? null : n;
}
function rt(e, t, r, n, s, i) {
  var l = e.__className;
  if (q || l !== r || l === void 0) {
    var a = Gs(r, n, i);
    (!q || a !== e.getAttribute("class")) && (a == null ? e.removeAttribute("class") : e.className = a), e.__className = r;
  } else if (i && s !== i)
    for (var o in i) {
      var f = !!i[o];
      (s == null || f !== !!s[o]) && e.classList.toggle(o, f);
    }
  return i;
}
const Ks = /* @__PURE__ */ Symbol("is custom element"), Js = /* @__PURE__ */ Symbol("is html");
function Nn(e, t, r, n) {
  var s = Xs(e);
  q && (s[t] = e.getAttribute(t)), s[t] !== (s[t] = r) && (r == null ? e.removeAttribute(t) : typeof r != "string" && Qs(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function Xs(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [Ks]: e.nodeName.includes("-"),
      [Js]: e.namespaceURI === Vn
    }
  );
}
var Mr = /* @__PURE__ */ new Map();
function Qs(e) {
  var t = e.getAttribute("is") || e.nodeName, r = Mr.get(t);
  if (r) return r;
  Mr.set(t, r = []);
  for (var n, s = e, i = Element.prototype; i !== s; ) {
    n = zr(s);
    for (var l in n)
      n[l].set && r.push(l);
    s = ur(s);
  }
  return r;
}
function Rn(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    C
  ), r = t.l.u;
  if (!r) return;
  let n = () => ir(t.s);
  if (e) {
    let s = 0, i = (
      /** @type {Record<string, any>} */
      {}
    );
    const l = /* @__PURE__ */ hr(() => {
      let a = !1;
      const o = t.s;
      for (const f in o)
        o[f] !== i[f] && (i[f] = o[f], a = !0);
      return a && s++, s;
    });
    n = () => c(l);
  }
  r.b.length && xs(() => {
    Ir(t, n), er(r.b);
  }), Sr(() => {
    const s = R(() => r.m.map(Kn));
    return () => {
      for (const i of s)
        typeof i == "function" && i();
    };
  }), r.a.length && Sr(() => {
    Ir(t, n), er(r.a);
  });
}
function Ir(e, t) {
  if (e.l.s)
    for (const r of e.l.s) c(r);
  t();
}
let Nt = !1;
function Zs(e) {
  var t = Nt;
  try {
    return Nt = !1, [e(), Nt];
  } finally {
    Nt = t;
  }
}
function yt(e, t, r, n) {
  var s = !$t || (r & jn) !== 0, i = (r & Bn) !== 0, l = (
    /** @type {V} */
    n
  ), a = !0, o = () => (a && (a = !1, l = /** @type {V} */
  n), l), f;
  {
    var u = it in e || Vr in e;
    f = Ve(e, t)?.set ?? (u && t in e ? ($) => e[t] = $ : void 0);
  }
  var h, v = !1;
  [h, v] = Zs(() => (
    /** @type {V} */
    e[t]
  )), h === void 0 && n !== void 0 && (h = o(), f && (s && rs(), f(h)));
  var d;
  if (s ? d = () => {
    var $ = (
      /** @type {V} */
      e[t]
    );
    return $ === void 0 ? o() : (a = !0, $);
  } : d = () => {
    var $ = (
      /** @type {V} */
      e[t]
    );
    return $ !== void 0 && (l = /** @type {V} */
    void 0), $ === void 0 ? l : $;
  }, f) {
    var g = e.$$legacy;
    return (
      /** @type {() => V} */
      (function($, Z) {
        return arguments.length > 0 ? ((!s || !Z || g || v) && f(Z ? d() : $), $) : d();
      })
    );
  }
  var E = !1, p = /* @__PURE__ */ gr(() => (E = !1, d()));
  c(p);
  var _ = (
    /** @type {Effect} */
    y
  );
  return (
    /** @type {() => V} */
    (function($, Z) {
      if (arguments.length > 0) {
        const B = Z ? c(p) : s && i ? st($) : $;
        return I(p, B), E = !0, l !== void 0 && (l = B), $;
      }
      return Le && E || (_.f & ke) !== 0 ? p.v : c(p);
    })
  );
}
function ei(e) {
  return new ti(e);
}
class ti {
  /** @type {any} */
  #e;
  /** @type {Record<string, any>} */
  #t;
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(t) {
    var r = /* @__PURE__ */ new Map(), n = (i, l) => {
      var a = /* @__PURE__ */ Be(l, !1, !1);
      return r.set(i, a), a;
    };
    const s = new Proxy(
      { ...t.props || {}, $$events: {} },
      {
        get(i, l) {
          return c(r.get(l) ?? n(l, Reflect.get(i, l)));
        },
        has(i, l) {
          return l === Vr ? !0 : (c(r.get(l) ?? n(l, Reflect.get(i, l))), Reflect.has(i, l));
        },
        set(i, l, a) {
          return I(r.get(l) ?? n(l, a), a), Reflect.set(i, l, a);
        }
      }
    );
    this.#t = (t.hydrate ? zs : Sn)(t.component, {
      target: t.target,
      anchor: t.anchor,
      props: s,
      context: t.context,
      intro: t.intro ?? !1,
      recover: t.recover
    }), (!t?.props?.$$host || t.sync === !1) && lt(), this.#e = s.$$events;
    for (const i of Object.keys(this.#t))
      i === "$set" || i === "$destroy" || i === "$on" || Pt(this, i, {
        get() {
          return this.#t[i];
        },
        /** @param {any} value */
        set(l) {
          this.#t[i] = l;
        },
        enumerable: !0
      });
    this.#t.$set = /** @param {Record<string, any>} next */
    (i) => {
      Object.assign(s, i);
    }, this.#t.$destroy = () => {
      js(this.#t);
    };
  }
  /** @param {Record<string, any>} props */
  $set(t) {
    this.#t.$set(t);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(t, r) {
    this.#e[t] = this.#e[t] || [];
    const n = (...s) => r.call(this, ...s);
    return this.#e[t].push(n), () => {
      this.#e[t] = this.#e[t].filter(
        /** @param {any} fn */
        (s) => s !== n
      );
    };
  }
  $destroy() {
    this.#t.$destroy();
  }
}
let Cn;
typeof HTMLElement == "function" && (Cn = class extends HTMLElement {
  /** The Svelte component constructor */
  $$ctor;
  /** Slots */
  $$s;
  /** @type {any} The Svelte component instance */
  $$c;
  /** Whether or not the custom element is connected */
  $$cn = !1;
  /** @type {Record<string, any>} Component props data */
  $$d = {};
  /** `true` if currently in the process of reflecting component props back to attributes */
  $$r = !1;
  /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
  $$p_d = {};
  /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
  $$l = {};
  /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
  $$l_u = /* @__PURE__ */ new Map();
  /** @type {any} The managed render effect for reflecting attributes */
  $$me;
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {*} use_shadow_dom
   */
  constructor(e, t, r) {
    super(), this.$$ctor = e, this.$$s = t, r && this.attachShadow({ mode: "open" });
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(e, t, r) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
      const n = this.$$c.$on(e, t);
      this.$$l_u.set(t, n);
    }
    super.addEventListener(e, t, r);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(e, t, r) {
    if (super.removeEventListener(e, t, r), this.$$c) {
      const n = this.$$l_u.get(t);
      n && (n(), this.$$l_u.delete(t));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let t = function(s) {
        return (i) => {
          const l = document.createElement("slot");
          s !== "default" && (l.name = s), O(i, l);
        };
      };
      var e = t;
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const r = {}, n = ri(this);
      for (const s of this.$$s)
        s in n && (s === "default" && !this.$$d.children ? (this.$$d.children = t(s), r.default = !0) : r[s] = t(s));
      for (const s of this.attributes) {
        const i = this.$$g_p(s.name);
        i in this.$$d || (this.$$d[i] = Ct(i, s.value, this.$$p_d, "toProp"));
      }
      for (const s in this.$$p_d)
        !(s in this.$$d) && this[s] !== void 0 && (this.$$d[s] = this[s], delete this[s]);
      this.$$c = ei({
        component: this.$$ctor,
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: r,
          $$host: this
        }
      }), this.$$me = Es(() => {
        Wt(() => {
          this.$$r = !0;
          for (const s of Ot(this.$$c)) {
            if (!this.$$p_d[s]?.reflect) continue;
            this.$$d[s] = this.$$c[s];
            const i = Ct(
              s,
              this.$$d[s],
              this.$$p_d,
              "toAttribute"
            );
            i == null ? this.removeAttribute(this.$$p_d[s].attribute || s) : this.setAttribute(this.$$p_d[s].attribute || s, i);
          }
          this.$$r = !1;
        });
      });
      for (const s in this.$$l)
        for (const i of this.$$l[s]) {
          const l = this.$$c.$on(s, i);
          this.$$l_u.set(i, l);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  /**
   * @param {string} attr
   * @param {string} _oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(e, t, r) {
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = Ct(e, r, this.$$p_d, "toProp"), this.$$c?.$set({ [e]: this.$$d[e] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
    });
  }
  /**
   * @param {string} attribute_name
   */
  $$g_p(e) {
    return Ot(this.$$p_d).find(
      (t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e
    ) || e;
  }
});
function Ct(e, t, r, n) {
  const s = r[e]?.type;
  if (t = s === "Boolean" && typeof t != "boolean" ? t != null : t, !n || !r[e])
    return t;
  if (n === "toAttribute")
    switch (s) {
      case "Object":
      case "Array":
        return t == null ? null : JSON.stringify(t);
      case "Boolean":
        return t ? "" : null;
      case "Number":
        return t ?? null;
      default:
        return t;
    }
  else
    switch (s) {
      case "Object":
      case "Array":
        return t && JSON.parse(t);
      case "Boolean":
        return t;
      // conversion already handled above
      case "Number":
        return t != null ? +t : t;
      default:
        return t;
    }
}
function ri(e) {
  const t = {};
  return e.childNodes.forEach((r) => {
    t[
      /** @type {Element} node */
      r.slot || "default"
    ] = !0;
  }), t;
}
function qr(e, t, r, n, s, i) {
  let l = class extends Cn {
    constructor() {
      super(e, r, s), this.$$p_d = t;
    }
    static get observedAttributes() {
      return Ot(t).map(
        (a) => (t[a].attribute || a).toLowerCase()
      );
    }
  };
  return Ot(t).forEach((a) => {
    Pt(l.prototype, a, {
      get() {
        return this.$$c && a in this.$$c ? this.$$c[a] : this.$$d[a];
      },
      set(o) {
        o = Ct(a, o, t), this.$$d[a] = o;
        var f = this.$$c;
        if (f) {
          var u = Ve(f, a)?.get;
          u ? f[a] = o : f.$set({ [a]: o });
        }
      }
    });
  }), n.forEach((a) => {
    Pt(l.prototype, a, {
      get() {
        return this.$$c?.[a];
      }
    });
  }), e.element = /** @type {any} */
  l, l;
}
var ni = /* @__PURE__ */ D('<article><span class="label svelte-itdw9l"> </span></article>');
const si = {
  hash: "svelte-itdw9l",
  code: `.card.svelte-itdw9l {display:flex;align-items:center;justify-content:center;padding:0.75rem 0.75rem;border-radius:8px;border:1px solid #e2e8f0;background:#ffffff;color:#1e293b;min-height:70px;text-align:center;transition:opacity 150ms ease,\r
      background 150ms ease;}.card.excluded.svelte-itdw9l {opacity:0.5;background:#f8fafc;border-color:#e2e8f0;}.card.compact.svelte-itdw9l {padding:0.5rem 0.5rem;min-height:56px;border-radius:6px;font-size:0.8rem;}.label.svelte-itdw9l {font-size:0.85rem;font-weight:500;line-height:1.3;word-break:break-word;}\r
\r
  @media (max-width: 640px) {.card.svelte-itdw9l {min-height:72px;}\r
  }`
};
function On(e, t) {
  Yt(t, !1), $r(e, si);
  let r = yt(t, "activity", 12), n = yt(t, "state", 12, "included"), s = yt(t, "size", 12, "normal");
  var i = {
    get activity() {
      return r();
    },
    set activity(f) {
      r(f), lt();
    },
    get state() {
      return n();
    },
    set state(f) {
      n(f), lt();
    },
    get size() {
      return s();
    },
    set size(f) {
      s(f), lt();
    }
  };
  Rn();
  var l = ni(), a = w(l), o = w(a, !0);
  return b(a), b(l), Ie(() => {
    rt(l, 1, `card ${n()} ${s()}`, "svelte-itdw9l"), Nn(l, "aria-label", (ir(r()), R(() => r().label))), se(o, (ir(r()), R(() => r().label)));
  }), O(e, l), Vt(i);
}
qr(On, { activity: {}, state: {}, size: {} }, [], [], !0);
var ii = /* @__PURE__ */ D('<p class="subtitle svelte-1otr6dx"> </p>'), li = /* @__PURE__ */ D('<section class="step svelte-1otr6dx" aria-live="polite"><div class="title-wrap"><h2 class="svelte-1otr6dx"> </h2> <!></div> <div class="slot svelte-1otr6dx"><!></div></section>');
const ai = {
  hash: "svelte-1otr6dx",
  code: ".step.svelte-1otr6dx {display:grid;gap:0.75rem;}h2.svelte-1otr6dx {font-size:clamp(1.3rem, 2.8vw, 1.75rem);margin:0;color:#0f172a;}.subtitle.svelte-1otr6dx {margin:0.2rem 0 0;font-size:0.95rem;color:#475569;}.slot.svelte-1otr6dx {display:flex;flex-wrap:wrap;gap:0.65rem;align-items:center;}"
};
function oi(e, t) {
  Yt(t, !1), $r(e, ai);
  let r = yt(t, "title", 12, ""), n = yt(t, "subtitle", 12, "");
  var s = {
    get title() {
      return r();
    },
    set title(d) {
      r(d), lt();
    },
    get subtitle() {
      return n();
    },
    set subtitle(d) {
      n(d), lt();
    }
  }, i = li(), l = w(i), a = w(l), o = w(a, !0);
  b(a);
  var f = k(a, 2);
  {
    var u = (d) => {
      var g = ii(), E = w(g, !0);
      b(g), Ie(() => se(E, n())), O(d, g);
    };
    $e(f, (d) => {
      n() && d(u);
    });
  }
  b(l);
  var h = k(l, 2), v = w(h);
  return Ws(v, t, "default", {}), b(h), b(i), Ie(() => se(o, r())), O(e, i), Vt(s);
}
qr(oi, { title: {}, subtitle: {} }, ["default"], [], !0);
var fi = /* @__PURE__ */ D('<button type="button"><span class="step-number svelte-1gqp2ed"></span> <span class="step-label svelte-1gqp2ed"> </span></button>'), ui = /* @__PURE__ */ D('<div class="question-header svelte-1gqp2ed"><span class="question-icon svelte-1gqp2ed" aria-hidden="true"> </span> <div><h2 class="question-title svelte-1gqp2ed"> </h2> <p class="question-subtitle svelte-1gqp2ed"> </p></div></div> <p class="help-text svelte-1gqp2ed"> </p> <div class="decision-section svelte-1gqp2ed"><div class="button-group svelte-1gqp2ed"><button type="button">Yes</button> <button type="button">No</button></div></div>', 1), ci = /* @__PURE__ */ D(`<div class="result yes svelte-1gqp2ed"><h2 class="svelte-1gqp2ed">Yes, this is platform work</h2> <p class="svelte-1gqp2ed">All four essential conditions are met. According to the
              definition, this qualifies as platform work because:</p> <ul class="criteria-explanation svelte-1gqp2ed"><li class="svelte-1gqp2ed"><strong>Labour is being exchanged</strong> — workers provide services
                through the platform</li> <li class="svelte-1gqp2ed"><strong>The platform actively matches</strong> — it connects workers
                to tasks or clients</li> <li class="svelte-1gqp2ed"><strong>Work is requested</strong> — clients or the platform initiate
                the work</li> <li class="svelte-1gqp2ed"><strong>It's done for payment</strong> — workers earn income or profit
                from the activity</li></ul></div>`), di = /* @__PURE__ */ D(`<li class="svelte-1gqp2ed"><strong>No labour exchange</strong> — This involves selling goods
                  or renting assets rather than providing services</li>`), vi = /* @__PURE__ */ D(`<li class="svelte-1gqp2ed"><strong>No active matching</strong> — The platform doesn't actively
                  connect workers to tasks (it's a passive marketplace)</li>`), pi = /* @__PURE__ */ D(`<li class="svelte-1gqp2ed"><strong>Work is not requested</strong> — The work is self-initiated
                  rather than requested by clients</li>`), hi = /* @__PURE__ */ D(`<li class="svelte-1gqp2ed"><strong>Not done for payment</strong> — This is unpaid or voluntary
                  work</li>`), gi = /* @__PURE__ */ D(`<div class="result no svelte-1gqp2ed"><h2>No, this is not platform work</h2> <p class="svelte-1gqp2ed">Platform work requires all four conditions to be met. Based on
              your answers, this does not qualify because:</p> <ul class="criteria-explanation svelte-1gqp2ed"><!> <!> <!> <!></ul> <p class="note svelte-1gqp2ed">Even one missing condition means it doesn't meet the definition of
              platform work.</p></div>`), _i = /* @__PURE__ */ D('<div class="table-row svelte-1gqp2ed"><span class="criterion-icon svelte-1gqp2ed" aria-hidden="true"> </span> <span class="criterion-name svelte-1gqp2ed"> </span> <span> </span></div>'), mi = /* @__PURE__ */ D('<div class="card-wrap"><!></div>'), bi = /* @__PURE__ */ D('<div class="examples-section svelte-1gqp2ed"><div class="section-title svelte-1gqp2ed">Examples matching your scenario</div> <div class="grid svelte-1gqp2ed"></div></div>'), wi = /* @__PURE__ */ D('<div class="result-section svelte-1gqp2ed"><!> <div class="summary-table svelte-1gqp2ed"><div class="section-title svelte-1gqp2ed">Your answers</div> <!></div> <!></div>'), yi = /* @__PURE__ */ D('<span class="step-label svelte-1gqp2ed">All questions answered</span>'), $i = /* @__PURE__ */ D('<span class="step-label svelte-1gqp2ed"> </span>'), qi = /* @__PURE__ */ D('<section class="infographic svelte-1gqp2ed"><header class="top svelte-1gqp2ed"><div><p class="eyebrow svelte-1gqp2ed">Platform work</p> <h1 class="svelte-1gqp2ed">Is this platform work?</h1> <p class="sub svelte-1gqp2ed">Answer four key questions to find out</p></div></header> <nav class="progress-nav svelte-1gqp2ed" aria-label="Progress"><!> <button type="button" aria-label="Final result"><span class="step-number svelte-1gqp2ed">✓</span> <span class="step-label svelte-1gqp2ed">Result</span></button></nav> <div class="panel svelte-1gqp2ed" aria-live="polite"><!></div> <footer class="nav svelte-1gqp2ed"><button type="button" class="ghost svelte-1gqp2ed">Back</button> <div class="nav-right svelte-1gqp2ed"><!> <button type="button" class="primary svelte-1gqp2ed">Start Over</button></div></footer></section>');
const xi = {
  hash: "svelte-1gqp2ed",
  code: `.infographic.svelte-1gqp2ed {display:grid;gap:1.5rem;color:#1e293b;}.top.svelte-1gqp2ed {text-align:center;margin-bottom:1rem;}.eyebrow.svelte-1gqp2ed {margin:0;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;font-weight:600;}h1.svelte-1gqp2ed {margin:0.5rem 0 0;font-size:clamp(1.6rem, 3vw, 2rem);font-weight:700;color:#0f172a;}.sub.svelte-1gqp2ed {margin:0.5rem 0 0;color:#64748b;font-size:0.95rem;}.progress-nav.svelte-1gqp2ed {display:flex;gap:0.75rem;align-items:center;justify-content:center;overflow-x:auto;padding:0.5rem;}.progress-step.svelte-1gqp2ed {display:flex;flex-direction:column;align-items:center;gap:0.25rem;padding:0.75rem 1rem;border-radius:8px;border:1px solid #e2e8f0;background:#ffffff;color:#94a3b8;font-weight:500;font-size:0.8rem;cursor:pointer;transition:all 150ms ease;min-width:75px;}.progress-step.svelte-1gqp2ed:hover:not(:disabled) {border-color:#cbd5e1;background:#f1f5f9;}.progress-step.completed.svelte-1gqp2ed {border-color:#cbd5e1;color:#64748b;background:#f1f5f9;}.progress-step.active.svelte-1gqp2ed {border-color:#0f172a;background:#0f172a;color:#f8fafc;}.progress-step.svelte-1gqp2ed:disabled {cursor:not-allowed;opacity:0.5;}.progress-step.result-step.completed.svelte-1gqp2ed {border-color:#22c55e;background:#f0fdf4;color:#166534;}.progress-step.result-step.active.svelte-1gqp2ed {border-color:#22c55e;background:#22c55e;color:#ffffff;}.step-number.svelte-1gqp2ed {font-weight:700;font-size:1rem;}.step-label.svelte-1gqp2ed {font-size:0.75rem;text-align:center;}.panel.svelte-1gqp2ed {padding:1.5rem;border:1px solid #e2e8f0;border-radius:12px;}.question-header.svelte-1gqp2ed {display:flex;gap:1rem;align-items:center;margin-bottom:1rem;}.question-icon.svelte-1gqp2ed {font-size:2.5rem;flex-shrink:0;}.question-title.svelte-1gqp2ed {margin:0;font-size:clamp(1.25rem, 2.5vw, 1.5rem);font-weight:600;color:#0f172a;}.question-subtitle.svelte-1gqp2ed {margin:0.25rem 0 0;font-size:0.85rem;color:#94a3b8;font-weight:500;}.grid.svelte-1gqp2ed {display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:0.75rem;}.grid.compact.svelte-1gqp2ed {grid-template-columns:repeat(auto-fit, minmax(120px, 1fr));gap:0.6rem;}.section-title.svelte-1gqp2ed {font-size:0.75rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.25rem;}.filtered.svelte-1gqp2ed {display:grid;gap:0.6rem;}.summary.svelte-1gqp2ed {display:grid;gap:1.5rem;}.nav.svelte-1gqp2ed {display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;}.nav-right.svelte-1gqp2ed {display:flex;gap:0.75rem;align-items:center;}.step-label.svelte-1gqp2ed {color:#475569;font-weight:600;font-size:0.9rem;}.primary.svelte-1gqp2ed,\r
  .ghost.svelte-1gqp2ed {border-radius:999px;border:1px solid transparent;padding:0.5rem 1rem;font-weight:600;cursor:pointer;font-size:0.9rem;}.primary.svelte-1gqp2ed {background:#0f172a;color:#f8fafc;}.primary.svelte-1gqp2ed:disabled,\r
  .ghost.svelte-1gqp2ed:disabled {opacity:0.4;cursor:not-allowed;}.ghost.svelte-1gqp2ed {background:#f1f5f9;color:#0f172a;border-color:rgba(15, 23, 42, 0.12);}.help-text.svelte-1gqp2ed {margin:0.5rem 0 0;color:#64748b;font-size:0.95rem;line-height:1.5;}.decision-section.svelte-1gqp2ed {margin-top:1.5rem;}.button-group.svelte-1gqp2ed {display:flex;gap:1rem;}.decision-btn.svelte-1gqp2ed {flex:1;padding:1rem 1.5rem;border-radius:8px;border:2px solid #e2e8f0;background:#ffffff;color:#64748b;font-weight:600;font-size:1rem;cursor:pointer;transition:all 150ms ease;}.decision-btn.svelte-1gqp2ed:hover {border-color:#cbd5e1;background:#f8fafc;}.decision-btn.active.svelte-1gqp2ed {border-color:#0f172a;background:#0f172a;color:#ffffff;}.decision-btn.active.svelte-1gqp2ed:hover {background:#1e293b;border-color:#1e293b;}.examples-section.svelte-1gqp2ed {margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid rgba(15, 23, 42, 0.08);}.result-section.svelte-1gqp2ed {display:grid;gap:1.5rem;}.result.svelte-1gqp2ed {padding:1.5rem;border-radius:8px;border:2px solid #e2e8f0;}.result.yes.svelte-1gqp2ed {background:#f0fdf4;border-color:#86efac;}.result.yes.svelte-1gqp2ed h2:where(.svelte-1gqp2ed) {color:#166534;margin:0 0 0.5rem;}.result.yes.svelte-1gqp2ed p:where(.svelte-1gqp2ed) {margin:0 0 0.75rem;color:#365314;font-size:0.95rem;line-height:1.5;}.result.no.svelte-1gqp2ed p:where(.svelte-1gqp2ed) {margin:0 0 0.75rem;color:#5f1313;font-size:0.95rem;line-height:1.5;}.criteria-explanation.svelte-1gqp2ed {margin:0.75rem 0 0;padding-left:1.2rem;list-style:none;}.criteria-explanation.svelte-1gqp2ed li:where(.svelte-1gqp2ed) {position:relative;margin-bottom:0.5rem;line-height:1.5;}.criteria-explanation.svelte-1gqp2ed li:where(.svelte-1gqp2ed)::before {content:"•";position:absolute;left:-1rem;font-weight:bold;}.result.yes.svelte-1gqp2ed .criteria-explanation:where(.svelte-1gqp2ed) li:where(.svelte-1gqp2ed)::before {color:#16a34a;}.result.no.svelte-1gqp2ed .criteria-explanation:where(.svelte-1gqp2ed) li:where(.svelte-1gqp2ed)::before {color:#dc2626;}.note.svelte-1gqp2ed {margin-top:0.75rem !important;font-style:italic;opacity:0.9;}.summary-table.svelte-1gqp2ed {display:grid;gap:0.5rem;}.table-row.svelte-1gqp2ed {display:grid;grid-template-columns:auto 1fr auto;gap:0.75rem;padding:0.75rem 1rem;background:#f8fafc;border-radius:6px;align-items:center;}.criterion-icon.svelte-1gqp2ed {font-size:1.25rem;}.criterion-name.svelte-1gqp2ed {font-weight:600;color:#0f172a;}.answer.svelte-1gqp2ed {font-weight:600;padding:0.25rem 0.6rem;border-radius:6px;font-size:0.85rem;}.answer.yes.svelte-1gqp2ed {background:#e0f2fe;color:#0c4a6e;}.answer.no.svelte-1gqp2ed {background:#fee2e2;color:#7c2d12;}.grid.svelte-1gqp2ed {display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:0.75rem;}.grid.compact.svelte-1gqp2ed {grid-template-columns:repeat(auto-fit, minmax(120px, 1fr));gap:0.6rem;}.section-title.svelte-1gqp2ed {font-size:0.75rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.25rem;}\r
\r
  @media (max-width: 720px) {.nav.svelte-1gqp2ed {flex-direction:column;align-items:stretch;}.nav-right.svelte-1gqp2ed {justify-content:space-between;}.button-group.svelte-1gqp2ed {flex-direction:column;}.decision-btn.svelte-1gqp2ed {padding:0.8rem 1rem;}\r
  }\r
\r
  @media (prefers-reduced-motion: reduce) {* {transition:none !important;\r
      animation: none !important;animation-duration:0.01ms !important;}\r
  }`
};
function Ei(e, t) {
  Yt(t, !1), $r(e, xi);
  const r = /* @__PURE__ */ Be(), n = /* @__PURE__ */ Be(), s = /* @__PURE__ */ Be(), i = [
    {
      id: "labour",
      label: "Labour",
      icon: "👷",
      question: "Is labour being exchanged?",
      help: "The activity involves services provided by workers through the platform (not just selling goods or renting assets)."
    },
    {
      id: "matching",
      label: "Matching",
      icon: "🔗",
      question: "Does the platform actively match tasks and workers?",
      help: "The platform plays a role in connecting workers to tasks—either assigning work, allowing workers to choose from available tasks, or letting clients select workers."
    },
    {
      id: "requested",
      label: "Requested",
      icon: "📋",
      question: "Is the work requested by someone?",
      help: "Someone (a client or the platform on behalf of customers) initiates or requests the work to be done."
    },
    {
      id: "paid",
      label: "Paid",
      icon: "💰",
      question: "Is it done for pay or profit?",
      help: "Workers earn income or profit from the activity. This includes deferred payment or profit."
    }
  ], l = [
    {
      id: "ride",
      label: "Ride-hailing",
      icon: "",
      flags: { labour: !0, matching: !0, requested: !0, paid: !0 }
    },
    {
      id: "delivery",
      label: "Food delivery",
      icon: "",
      flags: { labour: !0, matching: !0, requested: !0, paid: !0 }
    },
    {
      id: "design",
      label: "Freelance design",
      icon: "",
      flags: { labour: !0, matching: !0, requested: !0, paid: !0 }
    },
    {
      id: "selling",
      label: "Selling goods",
      icon: "",
      flags: { labour: !1, matching: !1, requested: !1, paid: !0 }
    },
    {
      id: "renting",
      label: "Renting accommodation",
      icon: "",
      flags: { labour: !1, matching: !1, requested: !0, paid: !0 }
    },
    {
      id: "ugc",
      label: "Social media content",
      icon: "",
      flags: { labour: !1, matching: !1, requested: !1, paid: !0 }
    },
    {
      id: "lending",
      label: "Peer-to-peer lending",
      icon: "",
      flags: { labour: !1, matching: !1, requested: !0, paid: !0 }
    },
    {
      id: "volunteer",
      label: "Volunteering / Wikipedia",
      icon: "",
      flags: { labour: !0, matching: !1, requested: !1, paid: !1 }
    }
  ];
  let a = /* @__PURE__ */ Be({ labour: null, matching: null, requested: null, paid: null }), o = /* @__PURE__ */ Be(0);
  const f = i.length;
  function u(T, A) {
    ws(a, c(a)[T] = A), c(o) < f - 1 && I(o, c(o) + 1);
  }
  function h() {
    I(a, { labour: null, matching: null, requested: null, paid: null }), I(o, 0);
  }
  function v() {
    c(o) > 0 && I(o, c(o) - 1);
  }
  Xt(() => c(a), () => {
    I(r, Object.values(c(a)).every((T) => T !== null));
  }), Xt(() => (c(r), c(a)), () => {
    I(n, c(r) && Object.values(c(a)).every((T) => T === !0));
  }), Xt(() => c(a), () => {
    I(s, l.filter((T) => Object.entries(c(a)).every(([A, H]) => H === null ? !0 : T.flags[A] === H)));
  }), Ss(), Rn();
  var d = qi(), g = k(w(d), 2), E = w(g);
  Qt(E, 1, () => i, Hs, (T, A, H) => {
    var Y = fi();
    let Ze;
    var ye = w(Y);
    ye.textContent = H + 1;
    var Re = k(ye, 2), ht = w(Re, !0);
    b(Re), b(Y), Ie(() => {
      Ze = rt(Y, 1, "progress-step svelte-1gqp2ed", null, Ze, {
        completed: c(a)[c(A).id] !== null,
        active: c(o) === H && !c(r)
      }), Nn(Y, "aria-label", (c(A), R(() => `Step ${H + 1}: ${c(A).label}`))), se(ht, (c(A), R(() => c(A).label)));
    }), gt("click", Y, () => !c(r) && I(o, H)), O(T, Y);
  });
  var p = k(E, 2);
  let _;
  b(g);
  var $ = k(g, 2), Z = w($);
  {
    var B = (T) => {
      var A = ui(), H = $s(A), Y = w(H), Ze = w(Y, !0);
      b(Y);
      var ye = k(Y, 2), Re = w(ye), ht = w(Re, !0);
      b(Re);
      var Tt = k(Re, 2), V = w(Tt);
      b(Tt), b(ye), b(H);
      var N = k(H, 2), oe = w(N, !0);
      b(N);
      var ee = k(N, 2), Ce = w(ee), K = w(Ce), Oe = k(K, 2);
      b(Ce), b(ee), Ie(() => {
        se(Ze, (c(o), R(() => i[c(o)].icon))), se(ht, (c(o), R(() => i[c(o)].question))), se(V, `Question ${c(o) + 1} of ${f ?? ""}`), se(oe, (c(o), R(() => i[c(o)].help))), rt(
          K,
          1,
          (c(a), c(o), R(() => `decision-btn yes ${c(a)[i[c(o)].id] === !0 ? "active" : ""}`)),
          "svelte-1gqp2ed"
        ), rt(
          Oe,
          1,
          (c(a), c(o), R(() => `decision-btn no ${c(a)[i[c(o)].id] === !1 ? "active" : ""}`)),
          "svelte-1gqp2ed"
        );
      }), gt("click", K, () => u(i[c(o)].id, !0)), gt("click", Oe, () => u(i[c(o)].id, !1)), O(T, A);
    }, me = (T) => {
      var A = wi(), H = w(A);
      {
        var Y = (V) => {
          var N = ci();
          O(V, N);
        }, Ze = (V) => {
          var N = gi(), oe = k(w(N), 4), ee = w(oe);
          {
            var Ce = (U) => {
              var je = di();
              O(U, je);
            };
            $e(ee, (U) => {
              c(a), R(() => !c(a).labour) && U(Ce);
            });
          }
          var K = k(ee, 2);
          {
            var Oe = (U) => {
              var je = vi();
              O(U, je);
            };
            $e(K, (U) => {
              c(a), R(() => !c(a).matching) && U(Oe);
            });
          }
          var et = k(K, 2);
          {
            var St = (U) => {
              var je = pi();
              O(U, je);
            };
            $e(et, (U) => {
              c(a), R(() => !c(a).requested) && U(St);
            });
          }
          var Jt = k(et, 2);
          {
            var Pn = (U) => {
              var je = hi();
              O(U, je);
            };
            $e(Jt, (U) => {
              c(a), R(() => !c(a).paid) && U(Pn);
            });
          }
          b(oe), Ur(2), b(N), O(V, N);
        };
        $e(H, (V) => {
          c(n) ? V(Y) : V(Ze, !1);
        });
      }
      var ye = k(H, 2), Re = k(w(ye), 2);
      Qt(Re, 1, () => i, (V) => V.id, (V, N) => {
        var oe = _i(), ee = w(oe), Ce = w(ee, !0);
        b(ee);
        var K = k(ee, 2), Oe = w(K, !0);
        b(K);
        var et = k(K, 2);
        let St;
        var Jt = w(et, !0);
        b(et), b(oe), Ie(() => {
          se(Ce, (c(N), R(() => c(N).icon))), se(Oe, (c(N), R(() => c(N).label))), St = rt(et, 1, "answer svelte-1gqp2ed", null, St, {
            yes: c(a)[c(N).id],
            no: !c(a)[c(N).id]
          }), se(Jt, (c(a), c(N), R(() => c(a)[c(N).id] ? "Yes" : "No")));
        }), O(V, oe);
      }), b(ye);
      var ht = k(ye, 2);
      {
        var Tt = (V) => {
          var N = bi(), oe = k(w(N), 2);
          Qt(oe, 5, () => c(s), (ee) => ee.id, (ee, Ce) => {
            var K = mi(), Oe = w(K);
            On(Oe, {
              get activity() {
                return c(Ce);
              },
              state: "included"
            }), b(K), O(ee, K);
          }), b(oe), b(N), O(V, N);
        };
        $e(ht, (V) => {
          c(s), R(() => c(s).length > 0) && V(Tt);
        });
      }
      b(A), O(T, A);
    };
    $e(Z, (T) => {
      c(r) ? T(me, !1) : T(B);
    });
  }
  b($);
  var be = k($, 2), F = w(be), pe = k(F, 2), we = w(pe);
  {
    var M = (T) => {
      var A = yi();
      O(T, A);
    }, Gt = (T) => {
      var A = $i(), H = w(A);
      b(A), Ie(
        (Y) => se(H, `${Y ?? ""} of ${f ?? ""}
          answered`),
        [
          () => (c(a), R(() => Object.values(c(a)).filter((Y) => Y !== null).length))
        ]
      ), O(T, A);
    };
    $e(we, (T) => {
      c(r) ? T(M) : T(Gt, !1);
    });
  }
  var Kt = k(we, 2);
  b(pe), b(be), b(d), Ie(() => {
    _ = rt(p, 1, "progress-step result-step svelte-1gqp2ed", null, _, { completed: c(r), active: c(r) }), p.disabled = !c(r), F.disabled = c(o) === 0;
  }), gt("click", F, v), gt("click", Kt, h), O(e, d), Vt();
}
customElements.define("platform-work-checker", qr(Ei, {}, [], [], !0));
