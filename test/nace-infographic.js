typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
let nt = !1, Ln = !1;
function jn() {
  nt = !0;
}
jn();
const Hn = 1, qn = 2, zn = 16, Bn = 2, Vt = "[", yt = "[!", $t = "]", Re = {}, A = /* @__PURE__ */ Symbol(), Vn = "http://www.w3.org/1999/xhtml", ot = !1;
var Yt = Array.isArray, Yn = Array.prototype.indexOf, rt = Array.from, Je = Object.keys, Qe = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, Un = Object.getOwnPropertyDescriptors, Wn = Object.prototype, Gn = Array.prototype, Ut = Object.getPrototypeOf, kt = Object.isExtensible;
function Kn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Wt() {
  var e, t, n = new Promise((i, r) => {
    e = i, t = r;
  });
  return { promise: n, resolve: e, reject: t };
}
const S = 2, Xe = 4, it = 8, Gt = 1 << 24, ie = 16, ve = 32, _e = 64, wt = 128, q = 512, C = 1024, R = 2048, se = 4096, F = 8192, oe = 16384, bt = 32768, ze = 65536, Ot = 1 << 17, Kt = 1 << 18, Ee = 1 << 19, Jn = 1 << 20, ae = 1 << 25, we = 32768, ct = 1 << 21, Et = 1 << 22, ce = 1 << 23, ut = /* @__PURE__ */ Symbol("$state"), Qn = /* @__PURE__ */ Symbol("legacy props"), Se = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Jt = 3, Pe = 8;
function Xn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Zn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function er() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function tr() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function nr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function rr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ir() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function st(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function sr() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let m = !1;
function pe(e) {
  m = e;
}
let y;
function z(e) {
  if (e === null)
    throw st(), Re;
  return y = e;
}
function xt() {
  return z(/* @__PURE__ */ le(y));
}
function I(e) {
  if (m) {
    if (/* @__PURE__ */ le(y) !== null)
      throw st(), Re;
    y = e;
  }
}
function Qt(e = 1) {
  if (m) {
    for (var t = e, n = y; t--; )
      n = /** @type {TemplateNode} */
      /* @__PURE__ */ le(n);
    y = n;
  }
}
function dt(e = !0) {
  for (var t = 0, n = y; ; ) {
    if (n.nodeType === Pe) {
      var i = (
        /** @type {Comment} */
        n.data
      );
      if (i === $t) {
        if (t === 0) return n;
        t -= 1;
      } else (i === Vt || i === yt) && (t += 1);
    }
    var r = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ le(n)
    );
    e && n.remove(), n = r;
  }
}
function lr(e) {
  if (!e || e.nodeType !== Pe)
    throw st(), Re;
  return (
    /** @type {Comment} */
    e.data
  );
}
function Xt(e) {
  return e === this.v;
}
function fr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Zt(e) {
  return !fr(e, this.v);
}
let N = null;
function ke(e) {
  N = e;
}
function ur(e, t = !1, n) {
  N = {
    p: N,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: nt && !t ? { s: null, u: null, $: [] } : null
  };
}
function ar(e) {
  var t = (
    /** @type {ComponentContext} */
    N
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var i of n)
      Tr(i);
  }
  return t.i = !0, N = t.p, /** @type {T} */
  {};
}
function Ye() {
  return !nt || N !== null && N.l === null;
}
let ge = [];
function en() {
  var e = ge;
  ge = [], Kn(e);
}
function lt(e) {
  if (ge.length === 0 && !He) {
    var t = ge;
    queueMicrotask(() => {
      t === ge && en();
    });
  }
  ge.push(e);
}
function or() {
  for (; ge.length > 0; )
    en();
}
function tn(e) {
  var t = p;
  if (t === null)
    return _.f |= ce, e;
  if ((t.f & bt) === 0) {
    if ((t.f & wt) === 0)
      throw e;
    t.b.error(e);
  } else
    Oe(e, t);
}
function Oe(e, t) {
  for (; t !== null; ) {
    if ((t.f & wt) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    t = t.parent;
  }
  throw e;
}
const cr = -7169;
function T(e, t) {
  e.f = e.f & cr | t;
}
function Tt(e) {
  (e.f & q) !== 0 || e.deps === null ? T(e, C) : T(e, se);
}
function nn(e) {
  if (e !== null)
    for (const t of e)
      (t.f & S) === 0 || (t.f & we) === 0 || (t.f ^= we, nn(
        /** @type {Derived} */
        t.deps
      ));
}
function rn(e, t, n) {
  (e.f & R) !== 0 ? t.add(e) : (e.f & se) !== 0 && n.add(e), nn(e.deps), T(e, C);
}
const We = /* @__PURE__ */ new Set();
let b = null, U = null, H = [], ft = null, ht = !1, He = !1;
class W {
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
  #i = 0;
  /**
   * The number of async effects that are currently in flight, _not_ inside a pending boundary
   */
  #f = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #s = null;
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #r = /* @__PURE__ */ new Set();
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
    return this.is_fork || this.#f > 0;
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    H = [], this.apply();
    var n = [], i = [];
    for (const r of t)
      this.#l(r, n, i);
    this.is_fork || this.#a(), this.is_deferred() ? (this.#u(i), this.#u(n)) : (b = null, Mt(i), Mt(n), this.#s?.resolve()), U = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #l(t, n, i) {
    t.f ^= C;
    for (var r = t.first, s = null; r !== null; ) {
      var l = r.f, f = (l & (ve | _e)) !== 0, a = f && (l & C) !== 0, u = a || (l & F) !== 0 || this.skipped_effects.has(r);
      if (!u && r.fn !== null) {
        f ? r.f ^= C : s !== null && (l & (Xe | it | Gt)) !== 0 ? s.b.defer_effect(r) : (l & Xe) !== 0 ? n.push(r) : Ue(r) && ((l & ie) !== 0 && this.#r.add(r), Ve(r));
        var o = r.first;
        if (o !== null) {
          r = o;
          continue;
        }
      }
      var d = r.parent;
      for (r = r.next; r === null && d !== null; )
        d === s && (s = null), r = d.next, d = d.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #u(t) {
    for (var n = 0; n < t.length; n += 1)
      rn(t[n], this.#r, this.#n);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, n) {
    n !== A && !this.previous.has(t) && this.previous.set(t, n), (t.f & ce) === 0 && (this.current.set(t, t.v), U?.set(t, t.v));
  }
  activate() {
    b = this, this.apply();
  }
  deactivate() {
    b === this && (b = null, U = null);
  }
  flush() {
    if (this.activate(), H.length > 0) {
      if (sn(), b !== null && b !== this)
        return;
    } else this.#i === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#t) t(this);
    this.#t.clear();
  }
  #a() {
    if (this.#f === 0) {
      for (const t of this.#e) t();
      this.#e.clear();
    }
    this.#i === 0 && this.#o();
  }
  #o() {
    if (We.size > 1) {
      this.previous.clear();
      var t = U, n = !0;
      for (const r of We) {
        if (r === this) {
          n = !1;
          continue;
        }
        const s = [];
        for (const [f, a] of this.current) {
          if (r.current.has(f))
            if (n && a !== r.current.get(f))
              r.current.set(f, a);
            else
              continue;
          s.push(f);
        }
        if (s.length === 0)
          continue;
        const l = [...r.current.keys()].filter((f) => !this.current.has(f));
        if (l.length > 0) {
          var i = H;
          H = [];
          const f = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
          for (const u of s)
            ln(u, l, f, a);
          if (H.length > 0) {
            b = r, r.apply();
            for (const u of H)
              r.#l(u, [], []);
            r.deactivate();
          }
          H = i;
        }
      }
      b = null, U = t;
    }
    this.committed = !0, We.delete(this);
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(t) {
    this.#i += 1, t && (this.#f += 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(t) {
    this.#i -= 1, t && (this.#f -= 1), this.revive();
  }
  revive() {
    for (const t of this.#r)
      this.#n.delete(t), T(t, R), re(t);
    for (const t of this.#n)
      T(t, se), re(t);
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
    return (this.#s ??= Wt()).promise;
  }
  static ensure() {
    if (b === null) {
      const t = b = new W();
      We.add(b), He || W.enqueue(() => {
        b === t && t.flush();
      });
    }
    return b;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    lt(t);
  }
  apply() {
  }
}
function dr(e) {
  var t = He;
  He = !0;
  try {
    for (var n; ; ) {
      if (or(), H.length === 0 && (b?.flush(), H.length === 0))
        return ft = null, /** @type {T} */
        n;
      sn();
    }
  } finally {
    He = t;
  }
}
function sn() {
  var e = ye;
  ht = !0;
  var t = null;
  try {
    var n = 0;
    for (et(!0); H.length > 0; ) {
      var i = W.ensure();
      if (n++ > 1e3) {
        var r, s;
        hr();
      }
      i.process(H), de.clear();
    }
  } finally {
    ht = !1, et(e), ft = null;
  }
}
function hr() {
  try {
    Zn();
  } catch (e) {
    Oe(e, ft);
  }
}
let ee = null;
function Mt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var i = e[n++];
      if ((i.f & (oe | F)) === 0 && Ue(i) && (ee = /* @__PURE__ */ new Set(), Ve(i), i.deps === null && i.first === null && i.nodes === null && (i.teardown === null && i.ac === null ? En(i) : i.fn = null), ee?.size > 0)) {
        de.clear();
        for (const r of ee) {
          if ((r.f & (oe | F)) !== 0) continue;
          const s = [r];
          let l = r.parent;
          for (; l !== null; )
            ee.has(l) && (ee.delete(l), s.push(l)), l = l.parent;
          for (let f = s.length - 1; f >= 0; f--) {
            const a = s[f];
            (a.f & (oe | F)) === 0 && Ve(a);
          }
        }
        ee.clear();
      }
    }
    ee = null;
  }
}
function ln(e, t, n, i) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const r of e.reactions) {
      const s = r.f;
      (s & S) !== 0 ? ln(
        /** @type {Derived} */
        r,
        t,
        n,
        i
      ) : (s & (Et | ie)) !== 0 && (s & R) === 0 && fn(r, t, i) && (T(r, R), re(
        /** @type {Effect} */
        r
      ));
    }
}
function fn(e, t, n) {
  const i = n.get(e);
  if (i !== void 0) return i;
  if (e.deps !== null)
    for (const r of e.deps) {
      if (t.includes(r))
        return !0;
      if ((r.f & S) !== 0 && fn(
        /** @type {Derived} */
        r,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          r,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function re(e) {
  for (var t = ft = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (ht && t === p && (n & ie) !== 0 && (n & Kt) === 0)
      return;
    if ((n & (_e | ve)) !== 0) {
      if ((n & C) === 0) return;
      t.f ^= C;
    }
  }
  H.push(t);
}
function vr(e) {
  let t = 0, n = be(0), i;
  return () => {
    Nt() && (w(n), yn(() => (t === 0 && (i = Fr(() => e(() => qe(n)))), t += 1, () => {
      lt(() => {
        t -= 1, t === 0 && (i?.(), i = void 0, qe(n));
      });
    })));
  };
}
var _r = ze | Ee | wt;
function pr(e, t, n) {
  new gr(e, t, n);
}
class gr {
  /** @type {Boundary | null} */
  parent;
  is_pending = !1;
  /** @type {TemplateNode} */
  #e;
  /** @type {TemplateNode | null} */
  #t = m ? y : null;
  /** @type {BoundaryProps} */
  #i;
  /** @type {((anchor: Node) => void)} */
  #f;
  /** @type {Effect} */
  #s;
  /** @type {Effect | null} */
  #r = null;
  /** @type {Effect | null} */
  #n = null;
  /** @type {Effect | null} */
  #l = null;
  /** @type {DocumentFragment | null} */
  #u = null;
  /** @type {TemplateNode | null} */
  #a = null;
  #o = 0;
  #c = 0;
  #h = !1;
  /** @type {Set<Effect>} */
  #v = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #_ = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #d = null;
  #$ = vr(() => (this.#d = be(this.#o), () => {
    this.#d = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(t, n, i) {
    this.#e = t, this.#i = n, this.#f = i, this.parent = /** @type {Effect} */
    p.b, this.is_pending = !!this.#i.pending, this.#s = $n(() => {
      if (p.b = this, m) {
        const s = this.#t;
        xt(), /** @type {Comment} */
        s.nodeType === Pe && /** @type {Comment} */
        s.data === yt ? this.#b() : (this.#w(), this.#c === 0 && (this.is_pending = !1));
      } else {
        var r = this.#m();
        try {
          this.#r = J(() => i(r));
        } catch (s) {
          this.error(s);
        }
        this.#c > 0 ? this.#g() : this.is_pending = !1;
      }
      return () => {
        this.#a?.remove();
      };
    }, _r), m && (this.#e = y);
  }
  #w() {
    try {
      this.#r = J(() => this.#f(this.#e));
    } catch (t) {
      this.error(t);
    }
  }
  #b() {
    const t = this.#i.pending;
    t && (this.#n = J(() => t(this.#e)), W.enqueue(() => {
      var n = this.#m();
      this.#r = this.#p(() => (W.ensure(), J(() => this.#f(n)))), this.#c > 0 ? this.#g() : (Ne(
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
    return this.is_pending && (this.#a = he(), this.#e.before(this.#a), t = this.#a), t;
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    rn(t, this.#v, this.#_);
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#i.pending;
  }
  /**
   * @param {() => Effect | null} fn
   */
  #p(t) {
    var n = p, i = _, r = N;
    Q(this.#s), M(this.#s), ke(this.#s.ctx);
    try {
      return t();
    } catch (s) {
      return tn(s), null;
    } finally {
      Q(n), M(i), ke(r);
    }
  }
  #g() {
    const t = (
      /** @type {(anchor: Node) => void} */
      this.#i.pending
    );
    this.#r !== null && (this.#u = document.createDocumentFragment(), this.#u.append(
      /** @type {TemplateNode} */
      this.#a
    ), Or(this.#r, this.#u)), this.#n === null && (this.#n = J(() => t(this.#e)));
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   */
  #y(t) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#y(t);
      return;
    }
    if (this.#c += t, this.#c === 0) {
      this.is_pending = !1;
      for (const n of this.#v)
        T(n, R), re(n);
      for (const n of this.#_)
        T(n, se), re(n);
      this.#v.clear(), this.#_.clear(), this.#n && Ne(this.#n, () => {
        this.#n = null;
      }), this.#u && (this.#e.before(this.#u), this.#u = null);
    }
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(t) {
    this.#y(t), this.#o += t, this.#d && Me(this.#d, this.#o);
  }
  get_effect_pending() {
    return this.#$(), w(
      /** @type {Source<number>} */
      this.#d
    );
  }
  /** @param {unknown} error */
  error(t) {
    var n = this.#i.onerror;
    let i = this.#i.failed;
    if (this.#h || !n && !i)
      throw t;
    this.#r && (B(this.#r), this.#r = null), this.#n && (B(this.#n), this.#n = null), this.#l && (B(this.#l), this.#l = null), m && (z(
      /** @type {TemplateNode} */
      this.#t
    ), Qt(), z(dt()));
    var r = !1, s = !1;
    const l = () => {
      if (r) {
        sr();
        return;
      }
      r = !0, s && ir(), W.ensure(), this.#o = 0, this.#l !== null && Ne(this.#l, () => {
        this.#l = null;
      }), this.is_pending = this.has_pending_snippet(), this.#r = this.#p(() => (this.#h = !1, J(() => this.#f(this.#e)))), this.#c > 0 ? this.#g() : this.is_pending = !1;
    };
    var f = _;
    try {
      M(null), s = !0, n?.(t, l), s = !1;
    } catch (a) {
      Oe(a, this.#s && this.#s.parent);
    } finally {
      M(f);
    }
    i && lt(() => {
      this.#l = this.#p(() => {
        W.ensure(), this.#h = !0;
        try {
          return J(() => {
            i(
              this.#e,
              () => t,
              () => l
            );
          });
        } catch (a) {
          return Oe(
            a,
            /** @type {Effect} */
            this.#s.parent
          ), null;
        } finally {
          this.#h = !1;
        }
      });
    });
  }
}
function mr(e, t, n, i) {
  const r = Ye() ? un : an;
  if (n.length === 0 && e.length === 0) {
    i(t.map(r));
    return;
  }
  var s = b, l = (
    /** @type {Effect} */
    p
  ), f = yr();
  function a() {
    Promise.all(n.map((u) => /* @__PURE__ */ $r(u))).then((u) => {
      f();
      try {
        i([...t.map(r), ...u]);
      } catch (o) {
        (l.f & oe) === 0 && Oe(o, l);
      }
      s?.deactivate(), Ze();
    }).catch((u) => {
      Oe(u, l);
    });
  }
  e.length > 0 ? Promise.all(e).then(() => {
    f();
    try {
      return a();
    } finally {
      s?.deactivate(), Ze();
    }
  }) : a();
}
function yr() {
  var e = p, t = _, n = N, i = b;
  return function(s = !0) {
    Q(e), M(t), ke(n), s && i?.activate();
  };
}
function Ze() {
  Q(null), M(null), ke(null);
}
// @__NO_SIDE_EFFECTS__
function un(e) {
  var t = S | R, n = _ !== null && (_.f & S) !== 0 ? (
    /** @type {Derived} */
    _
  ) : null;
  return p !== null && (p.f |= Ee), {
    ctx: N,
    deps: null,
    effects: null,
    equals: Xt,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      A
    ),
    wv: 0,
    parent: n ?? p,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function $r(e, t, n) {
  let i = (
    /** @type {Effect | null} */
    p
  );
  i === null && Xn();
  var r = (
    /** @type {Boundary} */
    i.b
  ), s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), l = be(
    /** @type {V} */
    A
  ), f = !_, a = /* @__PURE__ */ new Map();
  return Nr(() => {
    var u = Wt();
    s = u.promise;
    try {
      Promise.resolve(e()).then(u.resolve, u.reject).then(() => {
        o === b && o.committed && o.deactivate(), Ze();
      });
    } catch (v) {
      u.reject(v), Ze();
    }
    var o = (
      /** @type {Batch} */
      b
    );
    if (f) {
      var d = r.is_rendered();
      r.update_pending_count(1), o.increment(d), a.get(o)?.reject(Se), a.delete(o), a.set(o, u);
    }
    const h = (v, c = void 0) => {
      if (o.activate(), c)
        c !== Se && (l.f |= ce, Me(l, c));
      else {
        (l.f & ce) !== 0 && (l.f ^= ce), Me(l, v);
        for (const [$, g] of a) {
          if (a.delete($), $ === o) break;
          g.reject(Se);
        }
      }
      f && (r.update_pending_count(-1), o.decrement(d));
    };
    u.promise.then(h, (v) => h(null, v || "unknown"));
  }), mn(() => {
    for (const u of a.values())
      u.reject(Se);
  }), new Promise((u) => {
    function o(d) {
      function h() {
        d === s ? u(l) : o(s);
      }
      d.then(h, h);
    }
    o(s);
  });
}
// @__NO_SIDE_EFFECTS__
function an(e) {
  const t = /* @__PURE__ */ un(e);
  return t.equals = Zt, t;
}
function on(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      B(
        /** @type {Effect} */
        t[n]
      );
  }
}
function wr(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & S) === 0)
      return (t.f & oe) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function At(e) {
  var t, n = p;
  Q(wr(e));
  try {
    e.f &= ~we, on(e), t = Rn(e);
  } finally {
    Q(n);
  }
  return t;
}
function cn(e) {
  var t = At(e);
  if (!e.equals(t) && (e.wv = Cn(), (!b?.is_fork || e.deps === null) && (e.v = t, e.deps === null))) {
    T(e, C);
    return;
  }
  Ie || (U !== null ? (Nt() || b?.is_fork) && U.set(e, t) : Tt(e));
}
let vt = /* @__PURE__ */ new Set();
const de = /* @__PURE__ */ new Map();
let dn = !1;
function be(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Xt,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function fe(e, t) {
  const n = be(e);
  return Mr(n), n;
}
// @__NO_SIDE_EFFECTS__
function St(e, t = !1, n = !0) {
  const i = be(e);
  return t || (i.equals = Zt), nt && n && N !== null && N.l !== null && (N.l.s ??= []).push(i), i;
}
function te(e, t, n = !1) {
  _ !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!G || (_.f & Ot) !== 0) && Ye() && (_.f & (S | ie | Et | Ot)) !== 0 && !ne?.includes(e) && rr();
  let i = n ? De(t) : t;
  return Me(e, i);
}
function Me(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    Ie ? de.set(e, t) : de.set(e, n), e.v = t;
    var i = W.ensure();
    if (i.capture(e, n), (e.f & S) !== 0) {
      const r = (
        /** @type {Derived} */
        e
      );
      (e.f & R) !== 0 && At(r), Tt(r);
    }
    e.wv = Cn(), hn(e, R), Ye() && p !== null && (p.f & C) !== 0 && (p.f & (ve | _e)) === 0 && (j === null ? Ir([e]) : j.push(e)), !i.is_fork && vt.size > 0 && !dn && br();
  }
  return t;
}
function br() {
  dn = !1;
  var e = ye;
  et(!0);
  const t = Array.from(vt);
  try {
    for (const n of t)
      (n.f & C) !== 0 && T(n, se), Ue(n) && Ve(n);
  } finally {
    et(e);
  }
  vt.clear();
}
function qe(e) {
  te(e, e.v + 1);
}
function hn(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var i = Ye(), r = n.length, s = 0; s < r; s++) {
      var l = n[s], f = l.f;
      if (!(!i && l === p)) {
        var a = (f & R) === 0;
        if (a && T(l, t), (f & S) !== 0) {
          var u = (
            /** @type {Derived} */
            l
          );
          U?.delete(u), (f & we) === 0 && (f & q && (l.f |= we), hn(u, se));
        } else a && ((f & ie) !== 0 && ee !== null && ee.add(
          /** @type {Effect} */
          l
        ), re(
          /** @type {Effect} */
          l
        ));
      }
    }
}
function De(e) {
  if (typeof e != "object" || e === null || ut in e)
    return e;
  const t = Ut(e);
  if (t !== Wn && t !== Gn)
    return e;
  var n = /* @__PURE__ */ new Map(), i = Yt(e), r = /* @__PURE__ */ fe(0), s = $e, l = (f) => {
    if ($e === s)
      return f();
    var a = _, u = $e;
    M(null), Ft(s);
    var o = f();
    return M(a), Ft(u), o;
  };
  return i && n.set("length", /* @__PURE__ */ fe(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(f, a, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && tr();
        var o = n.get(a);
        return o === void 0 ? o = l(() => {
          var d = /* @__PURE__ */ fe(u.value);
          return n.set(a, d), d;
        }) : te(o, u.value, !0), !0;
      },
      deleteProperty(f, a) {
        var u = n.get(a);
        if (u === void 0) {
          if (a in f) {
            const o = l(() => /* @__PURE__ */ fe(A));
            n.set(a, o), qe(r);
          }
        } else
          te(u, A), qe(r);
        return !0;
      },
      get(f, a, u) {
        if (a === ut)
          return e;
        var o = n.get(a), d = a in f;
        if (o === void 0 && (!d || Ce(f, a)?.writable) && (o = l(() => {
          var v = De(d ? f[a] : A), c = /* @__PURE__ */ fe(v);
          return c;
        }), n.set(a, o)), o !== void 0) {
          var h = w(o);
          return h === A ? void 0 : h;
        }
        return Reflect.get(f, a, u);
      },
      getOwnPropertyDescriptor(f, a) {
        var u = Reflect.getOwnPropertyDescriptor(f, a);
        if (u && "value" in u) {
          var o = n.get(a);
          o && (u.value = w(o));
        } else if (u === void 0) {
          var d = n.get(a), h = d?.v;
          if (d !== void 0 && h !== A)
            return {
              enumerable: !0,
              configurable: !0,
              value: h,
              writable: !0
            };
        }
        return u;
      },
      has(f, a) {
        if (a === ut)
          return !0;
        var u = n.get(a), o = u !== void 0 && u.v !== A || Reflect.has(f, a);
        if (u !== void 0 || p !== null && (!o || Ce(f, a)?.writable)) {
          u === void 0 && (u = l(() => {
            var h = o ? De(f[a]) : A, v = /* @__PURE__ */ fe(h);
            return v;
          }), n.set(a, u));
          var d = w(u);
          if (d === A)
            return !1;
        }
        return o;
      },
      set(f, a, u, o) {
        var d = n.get(a), h = a in f;
        if (i && a === "length")
          for (var v = u; v < /** @type {Source<number>} */
          d.v; v += 1) {
            var c = n.get(v + "");
            c !== void 0 ? te(c, A) : v in f && (c = l(() => /* @__PURE__ */ fe(A)), n.set(v + "", c));
          }
        if (d === void 0)
          (!h || Ce(f, a)?.writable) && (d = l(() => /* @__PURE__ */ fe(void 0)), te(d, De(u)), n.set(a, d));
        else {
          h = d.v !== A;
          var $ = l(() => De(u));
          te(d, $);
        }
        var g = Reflect.getOwnPropertyDescriptor(f, a);
        if (g?.set && g.set.call(o, u), !h) {
          if (i && typeof a == "string") {
            var k = (
              /** @type {Source<number>} */
              n.get("length")
            ), x = Number(a);
            Number.isInteger(x) && x >= k.v && te(k, x + 1);
          }
          qe(r);
        }
        return !0;
      },
      ownKeys(f) {
        w(r);
        var a = Reflect.ownKeys(f).filter((d) => {
          var h = n.get(d);
          return h === void 0 || h.v !== A;
        });
        for (var [u, o] of n)
          o.v !== A && !(u in f) && a.push(u);
        return a;
      },
      setPrototypeOf() {
        nr();
      }
    }
  );
}
var It, vn, _n, pn;
function _t() {
  if (It === void 0) {
    It = window, vn = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    _n = Ce(t, "firstChild").get, pn = Ce(t, "nextSibling").get, kt(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), kt(n) && (n.__t = void 0);
  }
}
function he(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return (
    /** @type {TemplateNode | null} */
    _n.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function le(e) {
  return (
    /** @type {TemplateNode | null} */
    pn.call(e)
  );
}
function Y(e, t) {
  if (!m)
    return /* @__PURE__ */ Be(e);
  var n = /* @__PURE__ */ Be(y);
  if (n === null)
    n = y.appendChild(he());
  else if (t && n.nodeType !== Jt) {
    var i = he();
    return n?.before(i), z(i), i;
  }
  return z(n), n;
}
function xe(e, t = 1, n = !1) {
  let i = m ? y : e;
  for (var r; t--; )
    r = i, i = /** @type {TemplateNode} */
    /* @__PURE__ */ le(i);
  if (!m)
    return i;
  if (n && i?.nodeType !== Jt) {
    var s = he();
    return i === null ? r?.after(s) : i.before(s), z(s), s;
  }
  return z(i), i;
}
function gn(e) {
  e.textContent = "";
}
function Er() {
  return !1;
}
function Ct(e) {
  var t = _, n = p;
  M(null), Q(null);
  try {
    return e();
  } finally {
    M(t), Q(n);
  }
}
function xr(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function X(e, t, n) {
  var i = p;
  i !== null && (i.f & F) !== 0 && (e |= F);
  var r = {
    ctx: N,
    deps: null,
    nodes: null,
    f: e | R | q,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: i,
    b: i && i.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (n)
    try {
      Ve(r), r.f |= bt;
    } catch (f) {
      throw B(r), f;
    }
  else t !== null && re(r);
  var s = r;
  if (n && s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
  (s.f & Ee) === 0 && (s = s.first, (e & ie) !== 0 && (e & ze) !== 0 && s !== null && (s.f |= ze)), s !== null && (s.parent = i, i !== null && xr(s, i), _ !== null && (_.f & S) !== 0 && (e & _e) === 0)) {
    var l = (
      /** @type {Derived} */
      _
    );
    (l.effects ??= []).push(s);
  }
  return r;
}
function Nt() {
  return _ !== null && !G;
}
function mn(e) {
  const t = X(it, null, !1);
  return T(t, C), t.teardown = e, t;
}
function Tr(e) {
  return X(Xe | Jn, e, !1);
}
function Ar(e) {
  W.ensure();
  const t = X(_e | Ee, e, !0);
  return () => {
    B(t);
  };
}
function Sr(e) {
  W.ensure();
  const t = X(_e | Ee, e, !0);
  return (n = {}) => new Promise((i) => {
    n.outro ? Ne(t, () => {
      B(t), i(void 0);
    }) : (B(t), i(void 0));
  });
}
function Cr(e) {
  return X(Xe, e, !1);
}
function Nr(e) {
  return X(Et | Ee, e, !0);
}
function yn(e, t = 0) {
  return X(it | t, e, !0);
}
function at(e, t = [], n = [], i = []) {
  mr(i, t, n, (r) => {
    X(it, () => e(...r.map(w)), !0);
  });
}
function $n(e, t = 0) {
  var n = X(ie | t, e, !0);
  return n;
}
function J(e) {
  return X(ve | Ee, e, !0);
}
function wn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = Ie, i = _;
    Pt(!0), M(null);
    try {
      t.call(null);
    } finally {
      Pt(n), M(i);
    }
  }
}
function bn(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const r = n.ac;
    r !== null && Ct(() => {
      r.abort(Se);
    });
    var i = n.next;
    (n.f & _e) !== 0 ? n.parent = null : B(n, t), n = i;
  }
}
function Rr(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & ve) === 0 && B(t), t = n;
  }
}
function B(e, t = !0) {
  var n = !1;
  (t || (e.f & Kt) !== 0) && e.nodes !== null && e.nodes.end !== null && (kr(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), bn(e, t && !n), tt(e, 0), T(e, oe);
  var i = e.nodes && e.nodes.t;
  if (i !== null)
    for (const s of i)
      s.stop();
  wn(e);
  var r = e.parent;
  r !== null && r.first !== null && En(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function kr(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ le(e);
    e.remove(), e = n;
  }
}
function En(e) {
  var t = e.parent, n = e.prev, i = e.next;
  n !== null && (n.next = i), i !== null && (i.prev = n), t !== null && (t.first === e && (t.first = i), t.last === e && (t.last = n));
}
function Ne(e, t, n = !0) {
  var i = [];
  xn(e, i, !0);
  var r = () => {
    n && B(e), t && t();
  }, s = i.length;
  if (s > 0) {
    var l = () => --s || r();
    for (var f of i)
      f.out(l);
  } else
    r();
}
function xn(e, t, n) {
  if ((e.f & F) === 0) {
    e.f ^= F;
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const f of i)
        (f.is_global || n) && t.push(f);
    for (var r = e.first; r !== null; ) {
      var s = r.next, l = (r.f & ze) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (r.f & ve) !== 0 && (e.f & ie) !== 0;
      xn(r, t, l ? n : !1), r = s;
    }
  }
}
function Tn(e) {
  An(e, !0);
}
function An(e, t) {
  if ((e.f & F) !== 0) {
    e.f ^= F, (e.f & C) === 0 && (T(e, R), re(e));
    for (var n = e.first; n !== null; ) {
      var i = n.next, r = (n.f & ze) !== 0 || (n.f & ve) !== 0;
      An(n, r ? t : !1), n = i;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const l of s)
        (l.is_global || t) && l.in();
  }
}
function Or(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, i = e.nodes.end; n !== null; ) {
      var r = n === i ? null : /* @__PURE__ */ le(n);
      t.append(n), n = r;
    }
}
let ye = !1;
function et(e) {
  ye = e;
}
let Ie = !1;
function Pt(e) {
  Ie = e;
}
let _ = null, G = !1;
function M(e) {
  _ = e;
}
let p = null;
function Q(e) {
  p = e;
}
let ne = null;
function Mr(e) {
  _ !== null && (ne === null ? ne = [e] : ne.push(e));
}
let O = null, P = 0, j = null;
function Ir(e) {
  j = e;
}
let Sn = 1, me = 0, $e = me;
function Ft(e) {
  $e = e;
}
function Cn() {
  return ++Sn;
}
function Ue(e) {
  var t = e.f;
  if ((t & R) !== 0)
    return !0;
  if (t & S && (e.f &= ~we), (t & se) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), i = n.length, r = 0; r < i; r++) {
      var s = n[r];
      if (Ue(
        /** @type {Derived} */
        s
      ) && cn(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & q) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    U === null && T(e, C);
  }
  return !1;
}
function Nn(e, t, n = !0) {
  var i = e.reactions;
  if (i !== null && !ne?.includes(e))
    for (var r = 0; r < i.length; r++) {
      var s = i[r];
      (s.f & S) !== 0 ? Nn(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? T(s, R) : (s.f & C) !== 0 && T(s, se), re(
        /** @type {Effect} */
        s
      ));
    }
}
function Rn(e) {
  var t = O, n = P, i = j, r = _, s = ne, l = N, f = G, a = $e, u = e.f;
  O = /** @type {null | Value[]} */
  null, P = 0, j = null, _ = (u & (ve | _e)) === 0 ? e : null, ne = null, ke(e.ctx), G = !1, $e = ++me, e.ac !== null && (Ct(() => {
    e.ac.abort(Se);
  }), e.ac = null);
  try {
    e.f |= ct;
    var o = (
      /** @type {Function} */
      e.fn
    ), d = o(), h = e.deps;
    if (O !== null) {
      var v;
      if (tt(e, P), h !== null && P > 0)
        for (h.length = P + O.length, v = 0; v < O.length; v++)
          h[P + v] = O[v];
      else
        e.deps = h = O;
      if (Nt() && (e.f & q) !== 0)
        for (v = P; v < h.length; v++)
          (h[v].reactions ??= []).push(e);
    } else h !== null && P < h.length && (tt(e, P), h.length = P);
    if (Ye() && j !== null && !G && h !== null && (e.f & (S | se | R)) === 0)
      for (v = 0; v < /** @type {Source[]} */
      j.length; v++)
        Nn(
          j[v],
          /** @type {Effect} */
          e
        );
    if (r !== null && r !== e) {
      if (me++, r.deps !== null)
        for (let c = 0; c < n; c += 1)
          r.deps[c].rv = me;
      if (t !== null)
        for (const c of t)
          c.rv = me;
      j !== null && (i === null ? i = j : i.push(.../** @type {Source[]} */
      j));
    }
    return (e.f & ce) !== 0 && (e.f ^= ce), d;
  } catch (c) {
    return tn(c);
  } finally {
    e.f ^= ct, O = t, P = n, j = i, _ = r, ne = s, ke(l), G = f, $e = a;
  }
}
function Pr(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var i = Yn.call(n, e);
    if (i !== -1) {
      var r = n.length - 1;
      r === 0 ? n = t.reactions = null : (n[i] = n[r], n.pop());
    }
  }
  if (n === null && (t.f & S) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (O === null || !O.includes(t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & q) !== 0 && (s.f ^= q, s.f &= ~we), Tt(s), on(s), tt(s, 0);
  }
}
function tt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var i = t; i < n.length; i++)
      Pr(e, n[i]);
}
function Ve(e) {
  var t = e.f;
  if ((t & oe) === 0) {
    T(e, C);
    var n = p, i = ye;
    p = e, ye = !0;
    try {
      (t & (ie | Gt)) !== 0 ? Rr(e) : bn(e), wn(e);
      var r = Rn(e);
      e.teardown = typeof r == "function" ? r : null, e.wv = Sn;
      var s;
      ot && Ln && (e.f & R) !== 0 && e.deps;
    } finally {
      ye = i, p = n;
    }
  }
}
function w(e) {
  var t = e.f, n = (t & S) !== 0;
  if (_ !== null && !G) {
    var i = p !== null && (p.f & oe) !== 0;
    if (!i && !ne?.includes(e)) {
      var r = _.deps;
      if ((_.f & ct) !== 0)
        e.rv < me && (e.rv = me, O === null && r !== null && r[P] === e ? P++ : O === null ? O = [e] : O.push(e));
      else {
        (_.deps ??= []).push(e);
        var s = e.reactions;
        s === null ? e.reactions = [_] : s.includes(_) || s.push(_);
      }
    }
  }
  if (Ie && de.has(e))
    return de.get(e);
  if (n) {
    var l = (
      /** @type {Derived} */
      e
    );
    if (Ie) {
      var f = l.v;
      return ((l.f & C) === 0 && l.reactions !== null || On(l)) && (f = At(l)), de.set(l, f), f;
    }
    var a = (l.f & q) === 0 && !G && _ !== null && (ye || (_.f & q) !== 0), u = l.deps === null;
    Ue(l) && (a && (l.f |= q), cn(l)), a && !u && kn(l);
  }
  if (U?.has(e))
    return U.get(e);
  if ((e.f & ce) !== 0)
    throw e.v;
  return e.v;
}
function kn(e) {
  if (e.deps !== null) {
    e.f |= q;
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & S) !== 0 && (t.f & q) === 0 && kn(
        /** @type {Derived} */
        t
      );
  }
}
function On(e) {
  if (e.v === A) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (de.has(t) || (t.f & S) !== 0 && On(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Fr(e) {
  var t = G;
  try {
    return G = !0, e();
  } finally {
    G = t;
  }
}
const Dr = /* @__PURE__ */ new Set(), Dt = /* @__PURE__ */ new Set();
function Lr(e, t, n, i = {}) {
  function r(s) {
    if (i.capture || Le.call(t, s), !s.cancelBubble)
      return Ct(() => n?.call(this, s));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? lt(() => {
    t.addEventListener(e, r, i);
  }) : t.addEventListener(e, r, i), r;
}
function jr(e, t, n, i, r) {
  var s = { capture: i, passive: r }, l = Lr(e, t, n, s);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && mn(() => {
    t.removeEventListener(e, l, s);
  });
}
let Lt = null;
function Le(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), i = e.type, r = e.composedPath?.() || [], s = (
    /** @type {null | Element} */
    r[0] || e.target
  );
  Lt = e;
  var l = 0, f = Lt === e && e.__root;
  if (f) {
    var a = r.indexOf(f);
    if (a !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var u = r.indexOf(t);
    if (u === -1)
      return;
    a <= u && (l = a);
  }
  if (s = /** @type {Element} */
  r[l] || e.target, s !== t) {
    Qe(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var o = _, d = p;
    M(null), Q(null);
    try {
      for (var h, v = []; s !== null; ) {
        var c = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var $ = s["__" + i];
          $ != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && $.call(s, e);
        } catch (g) {
          h ? v.push(g) : h = g;
        }
        if (e.cancelBubble || c === t || c === null)
          break;
        s = c;
      }
      if (h) {
        for (let g of v)
          queueMicrotask(() => {
            throw g;
          });
        throw h;
      }
    } finally {
      e.__root = t, delete e.currentTarget, M(o), Q(d);
    }
  }
}
function Hr(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function pt(e, t) {
  var n = (
    /** @type {Effect} */
    p
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function Rt(e, t) {
  var n = (t & Bn) !== 0, i, r = !e.startsWith("<!>");
  return () => {
    if (m)
      return pt(y, null), y;
    i === void 0 && (i = Hr(r ? e : "<!>" + e), i = /** @type {TemplateNode} */
    /* @__PURE__ */ Be(i));
    var s = (
      /** @type {TemplateNode} */
      n || vn ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    return pt(s, s), s;
  };
}
function Ge(e, t) {
  if (m) {
    var n = (
      /** @type {Effect & { nodes: EffectNodes }} */
      p
    );
    ((n.f & bt) === 0 || n.nodes.end === null) && (n.nodes.end = y), xt();
    return;
  }
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const qr = ["touchstart", "touchmove"];
function zr(e) {
  return qr.includes(e);
}
function Te(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = n + "");
}
function Mn(e, t) {
  return In(e, t);
}
function Br(e, t) {
  _t(), t.intro = t.intro ?? !1;
  const n = t.target, i = m, r = y;
  try {
    for (var s = /* @__PURE__ */ Be(n); s && (s.nodeType !== Pe || /** @type {Comment} */
    s.data !== Vt); )
      s = /* @__PURE__ */ le(s);
    if (!s)
      throw Re;
    pe(!0), z(
      /** @type {Comment} */
      s
    );
    const l = In(e, { ...t, anchor: s });
    return pe(!1), /**  @type {Exports} */
    l;
  } catch (l) {
    if (l instanceof Error && l.message.split(`
`).some((f) => f.startsWith("https://svelte.dev/e/")))
      throw l;
    return l !== Re && console.warn("Failed to hydrate: ", l), t.recover === !1 && er(), _t(), gn(n), pe(!1), Mn(e, t);
  } finally {
    pe(i), z(r);
  }
}
const Ae = /* @__PURE__ */ new Map();
function In(e, { target: t, anchor: n, props: i = {}, events: r, context: s, intro: l = !0 }) {
  _t();
  var f = /* @__PURE__ */ new Set(), a = (d) => {
    for (var h = 0; h < d.length; h++) {
      var v = d[h];
      if (!f.has(v)) {
        f.add(v);
        var c = zr(v);
        t.addEventListener(v, Le, { passive: c });
        var $ = Ae.get(v);
        $ === void 0 ? (document.addEventListener(v, Le, { passive: c }), Ae.set(v, 1)) : Ae.set(v, $ + 1);
      }
    }
  };
  a(rt(Dr)), Dt.add(a);
  var u = void 0, o = Sr(() => {
    var d = n ?? t.appendChild(he());
    return pr(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (h) => {
        if (s) {
          ur({});
          var v = (
            /** @type {ComponentContext} */
            N
          );
          v.c = s;
        }
        if (r && (i.$$events = r), m && pt(
          /** @type {TemplateNode} */
          h,
          null
        ), u = e(h, i) || {}, m && (p.nodes.end = y, y === null || y.nodeType !== Pe || /** @type {Comment} */
        y.data !== $t))
          throw st(), Re;
        s && ar();
      }
    ), () => {
      for (var h of f) {
        t.removeEventListener(h, Le);
        var v = (
          /** @type {number} */
          Ae.get(h)
        );
        --v === 0 ? (document.removeEventListener(h, Le), Ae.delete(h)) : Ae.set(h, v);
      }
      Dt.delete(a), d !== n && d.parentNode?.removeChild(d);
    };
  });
  return gt.set(u, o), u;
}
let gt = /* @__PURE__ */ new WeakMap();
function Vr(e, t) {
  const n = gt.get(e);
  return n ? (gt.delete(e), n(t)) : Promise.resolve();
}
function jt(e, t) {
  return t;
}
function Yr(e, t, n) {
  for (var i = [], r = t.length, s, l = t.length, f = 0; f < r; f++) {
    let d = t[f];
    Ne(
      d,
      () => {
        if (s) {
          if (s.pending.delete(d), s.done.add(d), s.pending.size === 0) {
            var h = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            mt(rt(s.done)), h.delete(s), h.size === 0 && (e.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var a = i.length === 0 && n !== null;
    if (a) {
      var u = (
        /** @type {Element} */
        n
      ), o = (
        /** @type {Element} */
        u.parentNode
      );
      gn(o), o.append(u), e.items.clear();
    }
    mt(t, !a);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(s);
}
function mt(e, t = !0) {
  for (var n = 0; n < e.length; n++)
    B(e[n], t);
}
var Ht;
function qt(e, t, n, i, r, s = null) {
  var l = e, f = /* @__PURE__ */ new Map();
  {
    var a = (
      /** @type {Element} */
      e
    );
    l = m ? z(/* @__PURE__ */ Be(a)) : a.appendChild(he());
  }
  m && xt();
  var u = null, o = /* @__PURE__ */ an(() => {
    var g = n();
    return Yt(g) ? g : g == null ? [] : rt(g);
  }), d, h = !0;
  function v() {
    $.fallback = u, Ur($, d, l, t, i), u !== null && (d.length === 0 ? (u.f & ae) === 0 ? Tn(u) : (u.f ^= ae, je(u, null, l)) : Ne(u, () => {
      u = null;
    }));
  }
  var c = $n(() => {
    d = /** @type {V[]} */
    w(o);
    var g = d.length;
    let k = !1;
    if (m) {
      var x = lr(l) === yt;
      x !== (g === 0) && (l = dt(), z(l), pe(!1), k = !0);
    }
    for (var D = /* @__PURE__ */ new Set(), E = (
      /** @type {Batch} */
      b
    ), L = Er(), K = 0; K < g; K += 1) {
      m && y.nodeType === Pe && /** @type {Comment} */
      y.data === $t && (l = /** @type {Comment} */
      y, k = !0, pe(!1));
      var Fe = d[K], V = i(Fe, K), Z = h ? null : f.get(V);
      Z ? (Z.v && Me(Z.v, Fe), Z.i && Me(Z.i, K), L && E.skipped_effects.delete(Z.e)) : (Z = Wr(
        f,
        h ? l : Ht ??= he(),
        Fe,
        V,
        K,
        r,
        t,
        n
      ), h || (Z.e.f |= ae), f.set(V, Z)), D.add(V);
    }
    if (g === 0 && s && !u && (h ? u = J(() => s(l)) : (u = J(() => s(Ht ??= he())), u.f |= ae)), m && g > 0 && z(dt()), !h)
      if (L) {
        for (const [Fn, Dn] of f)
          D.has(Fn) || E.skipped_effects.add(Dn.e);
        E.oncommit(v), E.ondiscard(() => {
        });
      } else
        v();
    k && pe(!0), w(o);
  }), $ = { effect: c, items: f, outrogroups: null, fallback: u };
  h = !1, m && (l = y);
}
function Ur(e, t, n, i, r) {
  var s = t.length, l = e.items, f = e.effect.first, a, u = null, o = [], d = [], h, v, c, $;
  for ($ = 0; $ < s; $ += 1) {
    if (h = t[$], v = r(h, $), c = /** @type {EachItem} */
    l.get(v).e, e.outrogroups !== null)
      for (const V of e.outrogroups)
        V.pending.delete(c), V.done.delete(c);
    if ((c.f & ae) !== 0)
      if (c.f ^= ae, c === f)
        je(c, null, n);
      else {
        var g = u ? u.next : f;
        c === e.effect.last && (e.effect.last = c.prev), c.prev && (c.prev.next = c.next), c.next && (c.next.prev = c.prev), ue(e, u, c), ue(e, c, g), je(c, g, n), u = c, o = [], d = [], f = u.next;
        continue;
      }
    if ((c.f & F) !== 0 && Tn(c), c !== f) {
      if (a !== void 0 && a.has(c)) {
        if (o.length < d.length) {
          var k = d[0], x;
          u = k.prev;
          var D = o[0], E = o[o.length - 1];
          for (x = 0; x < o.length; x += 1)
            je(o[x], k, n);
          for (x = 0; x < d.length; x += 1)
            a.delete(d[x]);
          ue(e, D.prev, E.next), ue(e, u, D), ue(e, E, k), f = k, u = E, $ -= 1, o = [], d = [];
        } else
          a.delete(c), je(c, f, n), ue(e, c.prev, c.next), ue(e, c, u === null ? e.effect.first : u.next), ue(e, u, c), u = c;
        continue;
      }
      for (o = [], d = []; f !== null && f !== c; )
        (a ??= /* @__PURE__ */ new Set()).add(f), d.push(f), f = f.next;
      if (f === null)
        continue;
    }
    (c.f & ae) === 0 && o.push(c), u = c, f = c.next;
  }
  if (e.outrogroups !== null) {
    for (const V of e.outrogroups)
      V.pending.size === 0 && (mt(rt(V.done)), e.outrogroups?.delete(V));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (f !== null || a !== void 0) {
    var L = [];
    if (a !== void 0)
      for (c of a)
        (c.f & F) === 0 && L.push(c);
    for (; f !== null; )
      (f.f & F) === 0 && f !== e.fallback && L.push(f), f = f.next;
    var K = L.length;
    if (K > 0) {
      var Fe = s === 0 ? n : null;
      Yr(e, L, Fe);
    }
  }
}
function Wr(e, t, n, i, r, s, l, f) {
  var a = (l & Hn) !== 0 ? (l & zn) === 0 ? /* @__PURE__ */ St(n, !1, !1) : be(n) : null, u = (l & qn) !== 0 ? be(r) : null;
  return {
    v: a,
    i: u,
    e: J(() => (s(t, a ?? n, u ?? r, f), () => {
      e.delete(i);
    }))
  };
}
function je(e, t, n) {
  if (e.nodes)
    for (var i = e.nodes.start, r = e.nodes.end, s = t && (t.f & ae) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; i !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ le(i)
      );
      if (s.before(i), i === r)
        return;
      i = l;
    }
}
function ue(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function Gr(e, t) {
  Cr(() => {
    var n = e.getRootNode(), i = (
      /** @type {ShadowRoot} */
      n.host ? (
        /** @type {ShadowRoot} */
        n
      ) : (
        /** @type {Document} */
        n.head ?? /** @type {Document} */
        n.ownerDocument.head
      )
    );
    if (!i.querySelector("#" + t.hash)) {
      const r = document.createElement("style");
      r.id = t.hash, r.textContent = t.code, i.appendChild(r);
    }
  });
}
const zt = [...` 	
\r\f \v\uFEFF`];
function Kr(e, t, n) {
  var i = "" + e;
  if (n) {
    for (var r in n)
      if (n[r])
        i = i ? i + " " + r : r;
      else if (i.length)
        for (var s = r.length, l = 0; (l = i.indexOf(r, l)) >= 0; ) {
          var f = l + s;
          (l === 0 || zt.includes(i[l - 1])) && (f === i.length || zt.includes(i[f])) ? i = (l === 0 ? "" : i.substring(0, l)) + i.substring(f + 1) : l = f;
        }
  }
  return i === "" ? null : i;
}
function Jr(e, t, n, i, r, s) {
  var l = e.__className;
  if (m || l !== n || l === void 0) {
    var f = Kr(n, i, s);
    (!m || f !== e.getAttribute("class")) && (f == null ? e.removeAttribute("class") : e.className = f), e.__className = n;
  } else if (s && r !== s)
    for (var a in s) {
      var u = !!s[a];
      (r == null || u !== !!r[a]) && e.classList.toggle(a, u);
    }
  return s;
}
const Qr = /* @__PURE__ */ Symbol("is custom element"), Xr = /* @__PURE__ */ Symbol("is html");
function Zr(e, t, n, i) {
  var r = ei(e);
  m && (r[t] = e.getAttribute(t)), r[t] !== (r[t] = n) && (n == null ? e.removeAttribute(t) : typeof n != "string" && ti(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function ei(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [Qr]: e.nodeName.includes("-"),
      [Xr]: e.namespaceURI === Vn
    }
  );
}
var Bt = /* @__PURE__ */ new Map();
function ti(e) {
  var t = e.getAttribute("is") || e.nodeName, n = Bt.get(t);
  if (n) return n;
  Bt.set(t, n = []);
  for (var i, r = e, s = Element.prototype; s !== r; ) {
    i = Un(r);
    for (var l in i)
      i[l].set && n.push(l);
    r = Ut(r);
  }
  return n;
}
function ni(e) {
  return new ri(e);
}
class ri {
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
    var n = /* @__PURE__ */ new Map(), i = (s, l) => {
      var f = /* @__PURE__ */ St(l, !1, !1);
      return n.set(s, f), f;
    };
    const r = new Proxy(
      { ...t.props || {}, $$events: {} },
      {
        get(s, l) {
          return w(n.get(l) ?? i(l, Reflect.get(s, l)));
        },
        has(s, l) {
          return l === Qn ? !0 : (w(n.get(l) ?? i(l, Reflect.get(s, l))), Reflect.has(s, l));
        },
        set(s, l, f) {
          return te(n.get(l) ?? i(l, f), f), Reflect.set(s, l, f);
        }
      }
    );
    this.#t = (t.hydrate ? Br : Mn)(t.component, {
      target: t.target,
      anchor: t.anchor,
      props: r,
      context: t.context,
      intro: t.intro ?? !1,
      recover: t.recover
    }), (!t?.props?.$$host || t.sync === !1) && dr(), this.#e = r.$$events;
    for (const s of Object.keys(this.#t))
      s === "$set" || s === "$destroy" || s === "$on" || Qe(this, s, {
        get() {
          return this.#t[s];
        },
        /** @param {any} value */
        set(l) {
          this.#t[s] = l;
        },
        enumerable: !0
      });
    this.#t.$set = /** @param {Record<string, any>} next */
    (s) => {
      Object.assign(r, s);
    }, this.#t.$destroy = () => {
      Vr(this.#t);
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
  $on(t, n) {
    this.#e[t] = this.#e[t] || [];
    const i = (...r) => n.call(this, ...r);
    return this.#e[t].push(i), () => {
      this.#e[t] = this.#e[t].filter(
        /** @param {any} fn */
        (r) => r !== i
      );
    };
  }
  $destroy() {
    this.#t.$destroy();
  }
}
let Pn;
typeof HTMLElement == "function" && (Pn = class extends HTMLElement {
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
  constructor(e, t, n) {
    super(), this.$$ctor = e, this.$$s = t, n && this.attachShadow({ mode: "open" });
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(e, t, n) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
      const i = this.$$c.$on(e, t);
      this.$$l_u.set(t, i);
    }
    super.addEventListener(e, t, n);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(e, t, n) {
    if (super.removeEventListener(e, t, n), this.$$c) {
      const i = this.$$l_u.get(t);
      i && (i(), this.$$l_u.delete(t));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let t = function(r) {
        return (s) => {
          const l = document.createElement("slot");
          r !== "default" && (l.name = r), Ge(s, l);
        };
      };
      var e = t;
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const n = {}, i = ii(this);
      for (const r of this.$$s)
        r in i && (r === "default" && !this.$$d.children ? (this.$$d.children = t(r), n.default = !0) : n[r] = t(r));
      for (const r of this.attributes) {
        const s = this.$$g_p(r.name);
        s in this.$$d || (this.$$d[s] = Ke(s, r.value, this.$$p_d, "toProp"));
      }
      for (const r in this.$$p_d)
        !(r in this.$$d) && this[r] !== void 0 && (this.$$d[r] = this[r], delete this[r]);
      this.$$c = ni({
        component: this.$$ctor,
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: n,
          $$host: this
        }
      }), this.$$me = Ar(() => {
        yn(() => {
          this.$$r = !0;
          for (const r of Je(this.$$c)) {
            if (!this.$$p_d[r]?.reflect) continue;
            this.$$d[r] = this.$$c[r];
            const s = Ke(
              r,
              this.$$d[r],
              this.$$p_d,
              "toAttribute"
            );
            s == null ? this.removeAttribute(this.$$p_d[r].attribute || r) : this.setAttribute(this.$$p_d[r].attribute || r, s);
          }
          this.$$r = !1;
        });
      });
      for (const r in this.$$l)
        for (const s of this.$$l[r]) {
          const l = this.$$c.$on(r, s);
          this.$$l_u.set(s, l);
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
  attributeChangedCallback(e, t, n) {
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = Ke(e, n, this.$$p_d, "toProp"), this.$$c?.$set({ [e]: this.$$d[e] }));
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
    return Je(this.$$p_d).find(
      (t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e
    ) || e;
  }
});
function Ke(e, t, n, i) {
  const r = n[e]?.type;
  if (t = r === "Boolean" && typeof t != "boolean" ? t != null : t, !i || !n[e])
    return t;
  if (i === "toAttribute")
    switch (r) {
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
    switch (r) {
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
function ii(e) {
  const t = {};
  return e.childNodes.forEach((n) => {
    t[
      /** @type {Element} node */
      n.slot || "default"
    ] = !0;
  }), t;
}
function si(e, t, n, i, r, s) {
  let l = class extends Pn {
    constructor() {
      super(e, n, r), this.$$p_d = t;
    }
    static get observedAttributes() {
      return Je(t).map(
        (f) => (t[f].attribute || f).toLowerCase()
      );
    }
  };
  return Je(t).forEach((f) => {
    Qe(l.prototype, f, {
      get() {
        return this.$$c && f in this.$$c ? this.$$c[f] : this.$$d[f];
      },
      set(a) {
        a = Ke(f, a, t), this.$$d[f] = a;
        var u = this.$$c;
        if (u) {
          var o = Ce(u, f)?.get;
          o ? u[f] = a : u.$set({ [f]: a });
        }
      }
    });
  }), i.forEach((f) => {
    Qe(l.prototype, f, {
      get() {
        return this.$$c?.[f];
      }
    });
  }), e.element = /** @type {any} */
  l, l;
}
var li = /* @__PURE__ */ Rt('<button role="tab"> </button>'), fi = /* @__PURE__ */ Rt('<span class="chip svelte-tfnydu"> </span>'), ui = /* @__PURE__ */ Rt('<div class="card svelte-tfnydu"><div class="header svelte-tfnydu"><div><h3 class="svelte-tfnydu"> </h3> <p class="sub svelte-tfnydu">NACE sector snapshot</p></div> <span class="badge svelte-tfnydu"> </span></div> <div class="tabs svelte-tfnydu" role="tablist" aria-label="NACE sectors"></div> <p class="desc svelte-tfnydu"> </p> <div class="examples svelte-tfnydu"><div class="examples-header svelte-tfnydu"><span class="label svelte-tfnydu">Examples</span> <span class="count svelte-tfnydu"> </span></div> <div class="example-list svelte-tfnydu"></div></div></div>');
const ai = {
  hash: "svelte-tfnydu",
  code: ':host {display:block;font-family:"Inter", system-ui, sans-serif;max-width:460px;color:#1f2937;}.card.svelte-tfnydu {border-radius:16px;padding:1.25rem 1.25rem 1.1rem;background:linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);border:1px solid #e5e7eb;}.header.svelte-tfnydu {display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:0.75rem;}h3.svelte-tfnydu {margin:0;font-size:1.05rem;letter-spacing:-0.01em;}.sub.svelte-tfnydu {margin:0.2rem 0 0;font-size:0.82rem;color:#6b7280;}.badge.svelte-tfnydu {min-width:2rem;height:2rem;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;background:#111827;color:#ffffff;}.tabs.svelte-tfnydu {display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:0.5rem;margin:0.8rem 0 1rem;}button.svelte-tfnydu {padding:0.55rem 0.6rem;cursor:pointer;border:1px solid #e5e7eb;background:#ffffff;border-radius:10px;font-weight:600;color:#374151;transition:all 0.15s ease;}button.svelte-tfnydu:hover {transform:translateY(-1px);border-color:#d1d5db;}button.active.svelte-tfnydu {background:linear-gradient(135deg, #111827 0%, #374151 100%);color:#ffffff;border-color:#111827;}.desc.svelte-tfnydu {margin:0;font-size:0.95rem;line-height:1.5;color:#374151;}.examples.svelte-tfnydu {margin-top:1rem;padding:0.75rem 0.8rem;border-radius:12px;background:#f3f4f6;border:1px solid #e5e7eb;}.examples-header.svelte-tfnydu {display:flex;align-items:center;justify-content:space-between;margin-bottom:0.6rem;}.label.svelte-tfnydu {display:inline-flex;font-size:0.75rem;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;}.count.svelte-tfnydu {font-size:0.75rem;color:#6b7280;background:#ffffff;border:1px solid #e5e7eb;padding:0.1rem 0.45rem;border-radius:999px;}.example-list.svelte-tfnydu {display:flex;flex-wrap:wrap;gap:0.5rem;}.chip.svelte-tfnydu {display:inline-flex;align-items:center;padding:0.35rem 0.6rem;border-radius:999px;background:#ffffff;border:1px solid #e5e7eb;font-size:0.85rem;color:#374151;}'
};
function oi(e) {
  Gr(e, ai);
  const t = {
    C: {
      name: "Manufacturing (NACE C)",
      description: "Includes the physical or chemical transformation of materials into new products. Covers food, textiles, chemicals, machinery, and more.",
      examples: ["Food production", "Machinery", "Automotive"]
    },
    G: {
      name: "Wholesale & Retail Trade (NACE G)",
      description: "Covers the resale of goods without transformation, including wholesale, retail, and motor vehicle trade.",
      examples: ["Retail shops", "Supermarkets", "Car dealerships"]
    },
    Q: {
      name: "Human Health & Social Work (NACE Q)",
      description: "Includes hospitals, medical practices, residential care, and social work activities.",
      examples: ["Hospitals", "Elder care", "Medical clinics"]
    }
  };
  let n = /* @__PURE__ */ St("C");
  var i = ui(), r = Y(i), s = Y(r), l = Y(s), f = Y(l, !0);
  I(l), Qt(2), I(s);
  var a = xe(s, 2), u = Y(a, !0);
  I(a), I(r);
  var o = xe(r, 2);
  qt(o, 5, () => Object.keys(t), jt, (x, D) => {
    var E = li();
    let L;
    var K = Y(E, !0);
    I(E), at(() => {
      Zr(E, "aria-selected", w(n) === w(D)), L = Jr(E, 1, "svelte-tfnydu", null, L, { active: w(n) === w(D) }), Te(K, w(D));
    }), jr("click", E, () => te(n, w(D))), Ge(x, E);
  }), I(o);
  var d = xe(o, 2), h = Y(d, !0);
  I(d);
  var v = xe(d, 2), c = Y(v), $ = xe(Y(c), 2), g = Y($, !0);
  I($), I(c);
  var k = xe(c, 2);
  qt(k, 5, () => t[w(n)].examples, jt, (x, D) => {
    var E = fi(), L = Y(E, !0);
    I(E), at(() => Te(L, w(D))), Ge(x, E);
  }), I(k), I(v), I(i), at(() => {
    Te(f, t[w(n)].name), Te(u, w(n)), Te(h, t[w(n)].description), Te(g, t[w(n)].examples.length);
  }), Ge(e, i);
}
customElements.define("nace-infographic", si(oi, {}, [], [], !0));
