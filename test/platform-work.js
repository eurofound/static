typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
let $t = !1, Mn = !1;
function In() {
  $t = !0;
}
In();
const Dn = 1, Fn = 2, Dr = 4, Ln = 8, zn = 16, jn = 2, Bn = 8, Hn = 1, Yn = 2, Fr = "[", zt = "[!", or = "]", at = {}, j = /* @__PURE__ */ Symbol(), Vn = "http://www.w3.org/1999/xhtml", Qt = !1;
var Lr = Array.isArray, Un = Array.prototype.indexOf, jt = Array.from, Ot = Object.keys, Pt = Object.defineProperty, Ve = Object.getOwnPropertyDescriptor, zr = Object.getOwnPropertyDescriptors, Wn = Object.prototype, Gn = Array.prototype, fr = Object.getPrototypeOf, qr = Object.isExtensible;
function Kn(e) {
  return e();
}
function Zt(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function jr() {
  var e, t, r = new Promise((n, s) => {
    e = n, t = s;
  });
  return { promise: r, resolve: e, reject: t };
}
const H = 2, Mt = 4, qt = 8, Br = 1 << 24, Se = 16, Ae = 32, ze = 64, ur = 128, ae = 512, B = 1024, G = 2048, ge = 4096, re = 8192, xe = 16384, Bt = 32768, ot = 65536, Er = 1 << 17, Hr = 1 << 18, Qe = 1 << 19, Yr = 1 << 20, qe = 1 << 25, Ke = 32768, er = 1 << 21, cr = 1 << 22, De = 1 << 23, it = /* @__PURE__ */ Symbol("$state"), Vr = /* @__PURE__ */ Symbol("legacy props"), nt = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), dr = 3, vt = 8;
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
let E;
function Q(e) {
  if (e === null)
    throw Ht(), at;
  return E = e;
}
function Et() {
  return Q(/* @__PURE__ */ _e(E));
}
function b(e) {
  if (q) {
    if (/* @__PURE__ */ _e(E) !== null)
      throw Ht(), at;
    E = e;
  }
}
function Ur(e = 1) {
  if (q) {
    for (var t = e, r = E; t--; )
      r = /** @type {TemplateNode} */
      /* @__PURE__ */ _e(r);
    E = r;
  }
}
function It(e = !0) {
  for (var t = 0, r = E; ; ) {
    if (r.nodeType === vt) {
      var n = (
        /** @type {Comment} */
        r.data
      );
      if (n === or) {
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
let O = null;
function ft(e) {
  O = e;
}
function Yt(e, t = !1, r) {
  O = {
    p: O,
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
    O
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      pn(n);
  }
  return e !== void 0 && (t.x = e), t.i = !0, O = t.p, e ?? /** @type {T} */
  {};
}
function xt() {
  return !$t || O !== null && O.l === null;
}
let He = [];
function Jr() {
  var e = He;
  He = [], Zt(e);
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
    if ((t.f & ur) === 0)
      throw e;
    t.b.error(e);
  } else
    ut(e, t);
}
function ut(e, t) {
  for (; t !== null; ) {
    if ((t.f & ur) !== 0)
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
function M(e, t) {
  e.f = e.f & us | t;
}
function vr(e) {
  (e.f & ae) !== 0 || e.deps === null ? M(e, B) : M(e, ge);
}
function Qr(e) {
  if (e !== null)
    for (const t of e)
      (t.f & H) === 0 || (t.f & Ke) === 0 || (t.f ^= Ke, Qr(
        /** @type {Derived} */
        t.deps
      ));
}
function Zr(e, t, r) {
  (e.f & G) !== 0 ? t.add(e) : (e.f & ge) !== 0 && r.add(e), Qr(e.deps), M(e, B);
}
const At = /* @__PURE__ */ new Set();
let A = null, fe = null, ie = [], Ut = null, tr = !1, bt = !1;
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
    this.is_fork || this.#f(), this.is_deferred() ? (this.#o(n), this.#o(r)) : (A = null, xr(n), xr(r), this.#l?.resolve()), fe = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #a(t, r, n) {
    t.f ^= B;
    for (var s = t.first, i = null; s !== null; ) {
      var l = s.f, a = (l & (Ae | ze)) !== 0, o = a && (l & B) !== 0, f = o || (l & re) !== 0 || this.skipped_effects.has(s);
      if (!f && s.fn !== null) {
        a ? s.f ^= B : i !== null && (l & (Mt | qt | Br)) !== 0 ? i.b.defer_effect(s) : (l & Mt) !== 0 ? r.push(s) : ht(s) && ((l & Se) !== 0 && this.#s.add(s), dt(s));
        var c = s.first;
        if (c !== null) {
          s = c;
          continue;
        }
      }
      var p = s.parent;
      for (s = s.next; s === null && p !== null; )
        p === i && (i = null), s = p.next, p = p.parent;
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
    r !== j && !this.previous.has(t) && this.previous.set(t, r), (t.f & De) === 0 && (this.current.set(t, t.v), fe?.set(t, t.v));
  }
  activate() {
    A = this, this.apply();
  }
  deactivate() {
    A === this && (A = null, fe = null);
  }
  flush() {
    if (this.activate(), ie.length > 0) {
      if (en(), A !== null && A !== this)
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
            A = s, s.apply();
            for (const f of ie)
              s.#a(f, [], []);
            s.deactivate();
          }
          ie = n;
        }
      }
      A = null, fe = t;
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
      this.#n.delete(t), M(t, G), Te(t);
    for (const t of this.#n)
      M(t, ge), Te(t);
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
    if (A === null) {
      const t = A = new ue();
      At.add(A), bt || ue.enqueue(() => {
        A === t && t.flush();
      });
    }
    return A;
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
      if (fs(), ie.length === 0 && (A?.flush(), ie.length === 0))
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
  tr = !0;
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
    tr = !1, Ft(e), Ut = null;
  }
}
function cs() {
  try {
    es();
  } catch (e) {
    ut(e, Ut);
  }
}
let $e = null;
function xr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (xe | re)) === 0 && ht(n) && ($e = /* @__PURE__ */ new Set(), dt(n), n.deps === null && n.first === null && n.nodes === null && (n.teardown === null && n.ac === null ? mn(n) : n.fn = null), $e?.size > 0)) {
        Fe.clear();
        for (const s of $e) {
          if ((s.f & (xe | re)) !== 0) continue;
          const i = [s];
          let l = s.parent;
          for (; l !== null; )
            $e.has(l) && ($e.delete(l), i.push(l)), l = l.parent;
          for (let a = i.length - 1; a >= 0; a--) {
            const o = i[a];
            (o.f & (xe | re)) === 0 && dt(o);
          }
        }
        $e.clear();
      }
    }
    $e = null;
  }
}
function tn(e, t, r, n) {
  if (!r.has(e) && (r.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & H) !== 0 ? tn(
        /** @type {Derived} */
        s,
        t,
        r,
        n
      ) : (i & (cr | Se)) !== 0 && (i & G) === 0 && rn(s, t, n) && (M(s, G), Te(
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
      if ((s.f & H) !== 0 && rn(
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
function Te(e) {
  for (var t = Ut = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (tr && t === y && (r & Se) !== 0 && (r & Hr) === 0)
      return;
    if ((r & (ze | Ae)) !== 0) {
      if ((r & B) === 0) return;
      t.f ^= B;
    }
  }
  ie.push(t);
}
function ds(e) {
  let t = 0, r = Je(0), n;
  return () => {
    mr() && (u(r), Wt(() => (t === 0 && (n = R(() => e(() => wt(r)))), t += 1, () => {
      kt(() => {
        t -= 1, t === 0 && (n?.(), n = void 0, wt(r));
      });
    })));
  };
}
var vs = ot | Qe | ur;
function hs(e, t, r) {
  new ps(e, t, r);
}
class ps {
  /** @type {Boundary | null} */
  parent;
  is_pending = !1;
  /** @type {TemplateNode} */
  #e;
  /** @type {TemplateNode | null} */
  #t = q ? E : null;
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
  #h = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #p = /* @__PURE__ */ new Set();
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
    y.b, this.is_pending = !!this.#r.pending, this.#l = br(() => {
      if (y.b = this, q) {
        const i = this.#t;
        Et(), /** @type {Comment} */
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
    }, vs), q && (this.#e = E);
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
    Zr(t, this.#h, this.#p);
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
    var r = y, n = m, s = O;
    pe(this.#l), X(this.#l), ft(this.#l.ctx);
    try {
      return t();
    } catch (i) {
      return Xr(i), null;
    } finally {
      pe(r), X(n), ft(s);
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
      for (const r of this.#h)
        M(r, G), Te(r);
      for (const r of this.#p)
        M(r, ge), Te(r);
      this.#h.clear(), this.#p.clear(), this.#n && Ue(this.#n, () => {
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
    return this.#w(), u(
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
  const s = xt() ? hr : pr;
  if (r.length === 0 && e.length === 0) {
    n(t.map(s));
    return;
  }
  var i = A, l = (
    /** @type {Effect} */
    y
  ), a = _s();
  function o() {
    Promise.all(r.map((f) => /* @__PURE__ */ ms(f))).then((f) => {
      a();
      try {
        n([...t.map(s), ...f]);
      } catch (c) {
        (l.f & xe) === 0 && ut(c, l);
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
  var e = y, t = m, r = O, n = A;
  return function(i = !0) {
    pe(e), X(t), ft(r), i && n?.activate();
  };
}
function Dt() {
  pe(null), X(null), ft(null);
}
// @__NO_SIDE_EFFECTS__
function hr(e) {
  var t = H | G, r = m !== null && (m.f & H) !== 0 ? (
    /** @type {Derived} */
    m
  ) : null;
  return y !== null && (y.f |= Qe), {
    ctx: O,
    deps: null,
    effects: null,
    equals: Gr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      j
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
    j
  ), a = !m, o = /* @__PURE__ */ new Map();
  return Ss(() => {
    var f = jr();
    i = f.promise;
    try {
      Promise.resolve(e()).then(f.resolve, f.reject).then(() => {
        c === A && c.committed && c.deactivate(), Dt();
      });
    } catch (d) {
      f.reject(d), Dt();
    }
    var c = (
      /** @type {Batch} */
      A
    );
    if (a) {
      var p = s.is_rendered();
      s.update_pending_count(1), c.increment(p), o.get(c)?.reject(nt), o.delete(c), o.set(c, f);
    }
    const v = (d, g = void 0) => {
      if (c.activate(), g)
        g !== nt && (l.f |= De, ct(l, g));
      else {
        (l.f & De) !== 0 && (l.f ^= De), ct(l, d);
        for (const [x, h] of o) {
          if (o.delete(x), x === c) break;
          h.reject(nt);
        }
      }
      a && (s.update_pending_count(-1), c.decrement(p));
    };
    f.promise.then(v, (d) => v(null, d || "unknown"));
  }), hn(() => {
    for (const f of o.values())
      f.reject(nt);
  }), new Promise((f) => {
    function c(p) {
      function v() {
        p === i ? f(l) : c(i);
      }
      p.then(v, v);
    }
    c(i);
  });
}
// @__NO_SIDE_EFFECTS__
function pr(e) {
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
    if ((t.f & H) === 0)
      return (t.f & xe) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function gr(e) {
  var t, r = y;
  pe(bs(e));
  try {
    e.f &= ~Ke, nn(e), t = xn(e);
  } finally {
    pe(r);
  }
  return t;
}
function sn(e) {
  var t = gr(e);
  if (!e.equals(t) && (e.wv = qn(), (!A?.is_fork || e.deps === null) && (e.v = t, e.deps === null))) {
    M(e, B);
    return;
  }
  Le || (fe !== null ? (mr() || A?.is_fork) && fe.set(e, t) : vr(e));
}
let rr = /* @__PURE__ */ new Set();
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
  return Rs(r), r;
}
// @__NO_SIDE_EFFECTS__
function Be(e, t = !1, r = !0) {
  const n = Je(e);
  return t || (n.equals = Kr), $t && r && O !== null && O.l !== null && (O.l.s ??= []).push(n), n;
}
function ws(e, t) {
  return D(
    e,
    R(() => u(e))
  ), t;
}
function D(e, t, r = !1) {
  m !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!ce || (m.f & Er) !== 0) && xt() && (m.f & (H | Se | cr | Er)) !== 0 && !ke?.includes(e) && is();
  let n = r ? st(t) : t;
  return ct(e, n);
}
function ct(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    Le ? Fe.set(e, t) : Fe.set(e, r), e.v = t;
    var n = ue.ensure();
    if (n.capture(e, r), (e.f & H) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & G) !== 0 && gr(s), vr(s);
    }
    e.wv = qn(), an(e, G), xt() && y !== null && (y.f & B) !== 0 && (y.f & (Ae | ze)) === 0 && (ne === null ? Cs([e]) : ne.push(e)), !n.is_fork && rr.size > 0 && !ln && ys();
  }
  return t;
}
function ys() {
  ln = !1;
  var e = We;
  Ft(!0);
  const t = Array.from(rr);
  try {
    for (const r of t)
      (r.f & B) !== 0 && M(r, ge), ht(r) && dt(r);
  } finally {
    Ft(e);
  }
  rr.clear();
}
function wt(e) {
  D(e, e.v + 1);
}
function an(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = xt(), s = r.length, i = 0; i < s; i++) {
      var l = r[i], a = l.f;
      if (!(!n && l === y)) {
        var o = (a & G) === 0;
        if (o && M(l, t), (a & H) !== 0) {
          var f = (
            /** @type {Derived} */
            l
          );
          fe?.delete(f), (a & Ke) === 0 && (a & ae && (l.f |= Ke), an(f, ge));
        } else o && ((a & Se) !== 0 && $e !== null && $e.add(
          /** @type {Effect} */
          l
        ), Te(
          /** @type {Effect} */
          l
        ));
      }
    }
}
function st(e) {
  if (typeof e != "object" || e === null || it in e)
    return e;
  const t = fr(e);
  if (t !== Wn && t !== Gn)
    return e;
  var r = /* @__PURE__ */ new Map(), n = Lr(e), s = /* @__PURE__ */ Pe(0), i = Ge, l = (a) => {
    if (Ge === i)
      return a();
    var o = m, f = Ge;
    X(null), Nr(i);
    var c = a();
    return X(o), Nr(f), c;
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
        var c = r.get(o);
        return c === void 0 ? c = l(() => {
          var p = /* @__PURE__ */ Pe(f.value);
          return r.set(o, p), p;
        }) : D(c, f.value, !0), !0;
      },
      deleteProperty(a, o) {
        var f = r.get(o);
        if (f === void 0) {
          if (o in a) {
            const c = l(() => /* @__PURE__ */ Pe(j));
            r.set(o, c), wt(s);
          }
        } else
          D(f, j), wt(s);
        return !0;
      },
      get(a, o, f) {
        if (o === it)
          return e;
        var c = r.get(o), p = o in a;
        if (c === void 0 && (!p || Ve(a, o)?.writable) && (c = l(() => {
          var d = st(p ? a[o] : j), g = /* @__PURE__ */ Pe(d);
          return g;
        }), r.set(o, c)), c !== void 0) {
          var v = u(c);
          return v === j ? void 0 : v;
        }
        return Reflect.get(a, o, f);
      },
      getOwnPropertyDescriptor(a, o) {
        var f = Reflect.getOwnPropertyDescriptor(a, o);
        if (f && "value" in f) {
          var c = r.get(o);
          c && (f.value = u(c));
        } else if (f === void 0) {
          var p = r.get(o), v = p?.v;
          if (p !== void 0 && v !== j)
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
        var f = r.get(o), c = f !== void 0 && f.v !== j || Reflect.has(a, o);
        if (f !== void 0 || y !== null && (!c || Ve(a, o)?.writable)) {
          f === void 0 && (f = l(() => {
            var v = c ? st(a[o]) : j, d = /* @__PURE__ */ Pe(v);
            return d;
          }), r.set(o, f));
          var p = u(f);
          if (p === j)
            return !1;
        }
        return c;
      },
      set(a, o, f, c) {
        var p = r.get(o), v = o in a;
        if (n && o === "length")
          for (var d = f; d < /** @type {Source<number>} */
          p.v; d += 1) {
            var g = r.get(d + "");
            g !== void 0 ? D(g, j) : d in a && (g = l(() => /* @__PURE__ */ Pe(j)), r.set(d + "", g));
          }
        if (p === void 0)
          (!v || Ve(a, o)?.writable) && (p = l(() => /* @__PURE__ */ Pe(void 0)), D(p, st(f)), r.set(o, p));
        else {
          v = p.v !== j;
          var x = l(() => st(f));
          D(p, x);
        }
        var h = Reflect.getOwnPropertyDescriptor(a, o);
        if (h?.set && h.set.call(c, f), !v) {
          if (n && typeof o == "string") {
            var _ = (
              /** @type {Source<number>} */
              r.get("length")
            ), $ = Number(o);
            Number.isInteger($) && $ >= _.v && D(_, $ + 1);
          }
          wt(s);
        }
        return !0;
      },
      ownKeys(a) {
        u(s);
        var o = Reflect.ownKeys(a).filter((p) => {
          var v = r.get(p);
          return v === void 0 || v.v !== j;
        });
        for (var [f, c] of r)
          c.v !== j && !(f in a) && o.push(f);
        return o;
      },
      setPrototypeOf() {
        ss();
      }
    }
  );
}
var kr, on, fn, un;
function nr() {
  if (kr === void 0) {
    kr = window, on = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, r = Text.prototype;
    fn = Ve(t, "firstChild").get, un = Ve(t, "nextSibling").get, qr(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), qr(r) && (r.__t = void 0);
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
  var r = /* @__PURE__ */ Xe(E);
  if (r === null)
    r = E.appendChild(de());
  else if (t && r.nodeType !== dr) {
    var n = de();
    return r?.before(n), Q(n), n;
  }
  return Q(r), r;
}
function Tr(e, t = !1) {
  if (!q) {
    var r = /* @__PURE__ */ Xe(e);
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ _e(r) : r;
  }
  if (t && E?.nodeType !== dr) {
    var n = de();
    return E?.before(n), Q(n), n;
  }
  return E;
}
function S(e, t = 1, r = !1) {
  let n = q ? E : e;
  for (var s; t--; )
    s = n, n = /** @type {TemplateNode} */
    /* @__PURE__ */ _e(n);
  if (!q)
    return n;
  if (r && n?.nodeType !== dr) {
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
function _r(e) {
  var t = m, r = y;
  X(null), pe(null);
  try {
    return e();
  } finally {
    X(t), pe(r);
  }
}
function vn(e) {
  y === null && (m === null && Zn(), Qn()), Le && Xn();
}
function $s(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function ve(e, t, r) {
  var n = y;
  n !== null && (n.f & re) !== 0 && (e |= re);
  var s = {
    ctx: O,
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
  else t !== null && Te(s);
  var i = s;
  if (r && i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
  (i.f & Qe) === 0 && (i = i.first, (e & Se) !== 0 && (e & ot) !== 0 && i !== null && (i.f |= ot)), i !== null && (i.parent = n, n !== null && $s(i, n), m !== null && (m.f & H) !== 0 && (e & ze) === 0)) {
    var l = (
      /** @type {Derived} */
      m
    );
    (l.effects ??= []).push(i);
  }
  return s;
}
function mr() {
  return m !== null && !ce;
}
function hn(e) {
  const t = ve(qt, null, !1);
  return M(t, B), t.teardown = e, t;
}
function Sr(e) {
  vn();
  var t = (
    /** @type {Effect} */
    y.f
  ), r = !m && (t & Ae) !== 0 && (t & Bt) === 0;
  if (r) {
    var n = (
      /** @type {ComponentContext} */
      O
    );
    (n.e ??= []).push(e);
  } else
    return pn(e);
}
function pn(e) {
  return ve(Mt | Yr, e, !1);
}
function qs(e) {
  return vn(), ve(qt | Yr, e, !0);
}
function Es(e) {
  ue.ensure();
  const t = ve(ze | Qe, e, !0);
  return () => {
    W(t);
  };
}
function xs(e) {
  ue.ensure();
  const t = ve(ze | Qe, e, !0);
  return (r = {}) => new Promise((n) => {
    r.outro ? Ue(t, () => {
      W(t), n(void 0);
    }) : (W(t), n(void 0));
  });
}
function ks(e) {
  return ve(Mt, e, !1);
}
function Jt(e, t) {
  var r = (
    /** @type {ComponentContextLegacy} */
    O
  ), n = { effect: null, ran: !1, deps: e };
  r.l.$.push(n), n.effect = Wt(() => {
    e(), !n.ran && (n.ran = !0, R(t));
  });
}
function Ts() {
  var e = (
    /** @type {ComponentContextLegacy} */
    O
  );
  Wt(() => {
    for (var t of e.l.$) {
      t.deps();
      var r = t.effect;
      (r.f & B) !== 0 && r.deps !== null && M(r, ge), ht(r) && dt(r), t.ran = !1;
    }
  });
}
function Ss(e) {
  return ve(cr | Qe, e, !0);
}
function Wt(e, t = 0) {
  return ve(qt | t, e, !0);
}
function Ie(e, t = [], r = [], n = []) {
  gs(n, t, r, (s) => {
    ve(qt, () => e(...s.map(u)), !0);
  });
}
function br(e, t = 0) {
  var r = ve(Se | t, e, !0);
  return r;
}
function le(e) {
  return ve(Ae | Qe, e, !0);
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
    s !== null && _r(() => {
      s.abort(nt);
    });
    var n = r.next;
    (r.f & ze) !== 0 ? r.parent = null : W(r, t), r = n;
  }
}
function As(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & Ae) === 0 && W(t), t = r;
  }
}
function W(e, t = !0) {
  var r = !1;
  (t || (e.f & Hr) !== 0) && e.nodes !== null && e.nodes.end !== null && (Ns(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), r = !0), _n(e, t && !r), Lt(e, 0), M(e, xe);
  var n = e.nodes && e.nodes.t;
  if (n !== null)
    for (const i of n)
      i.stop();
  gn(e);
  var s = e.parent;
  s !== null && s.first !== null && mn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function Ns(e, t) {
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
      (s.f & Ae) !== 0 && (e.f & Se) !== 0;
      bn(s, t, l ? r : !1), s = i;
    }
  }
}
function wr(e) {
  wn(e, !0);
}
function wn(e, t) {
  if ((e.f & re) !== 0) {
    e.f ^= re, (e.f & B) === 0 && (M(e, G), Te(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, s = (r.f & ot) !== 0 || (r.f & Ae) !== 0;
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
function pe(e) {
  y = e;
}
let ke = null;
function Rs(e) {
  m !== null && (ke === null ? ke = [e] : ke.push(e));
}
let J = null, te = 0, ne = null;
function Cs(e) {
  ne = e;
}
let $n = 1, Ye = 0, Ge = Ye;
function Nr(e) {
  Ge = e;
}
function qn() {
  return ++$n;
}
function ht(e) {
  var t = e.f;
  if ((t & G) !== 0)
    return !0;
  if (t & H && (e.f &= ~Ke), (t & ge) !== 0) {
    for (var r = (
      /** @type {Value[]} */
      e.deps
    ), n = r.length, s = 0; s < n; s++) {
      var i = r[s];
      if (ht(
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
    fe === null && M(e, B);
  }
  return !1;
}
function En(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !ke?.includes(e))
    for (var s = 0; s < n.length; s++) {
      var i = n[s];
      (i.f & H) !== 0 ? En(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (r ? M(i, G) : (i.f & B) !== 0 && M(i, ge), Te(
        /** @type {Effect} */
        i
      ));
    }
}
function xn(e) {
  var t = J, r = te, n = ne, s = m, i = ke, l = O, a = ce, o = Ge, f = e.f;
  J = /** @type {null | Value[]} */
  null, te = 0, ne = null, m = (f & (Ae | ze)) === 0 ? e : null, ke = null, ft(e.ctx), ce = !1, Ge = ++Ye, e.ac !== null && (_r(() => {
    e.ac.abort(nt);
  }), e.ac = null);
  try {
    e.f |= er;
    var c = (
      /** @type {Function} */
      e.fn
    ), p = c(), v = e.deps;
    if (J !== null) {
      var d;
      if (Lt(e, te), v !== null && te > 0)
        for (v.length = te + J.length, d = 0; d < J.length; d++)
          v[te + d] = J[d];
      else
        e.deps = v = J;
      if (mr() && (e.f & ae) !== 0)
        for (d = te; d < v.length; d++)
          (v[d].reactions ??= []).push(e);
    } else v !== null && te < v.length && (Lt(e, te), v.length = te);
    if (xt() && ne !== null && !ce && v !== null && (e.f & (H | ge | G)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      ne.length; d++)
        En(
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
    return (e.f & De) !== 0 && (e.f ^= De), p;
  } catch (g) {
    return Xr(g);
  } finally {
    e.f ^= er, J = t, te = r, ne = n, m = s, ke = i, ft(l), ce = a, Ge = o;
  }
}
function Os(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = Un.call(r, e);
    if (n !== -1) {
      var s = r.length - 1;
      s === 0 ? r = t.reactions = null : (r[n] = r[s], r.pop());
    }
  }
  if (r === null && (t.f & H) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (J === null || !J.includes(t))) {
    var i = (
      /** @type {Derived} */
      t
    );
    (i.f & ae) !== 0 && (i.f ^= ae, i.f &= ~Ke), vr(i), nn(i), Lt(i, 0);
  }
}
function Lt(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      Os(e, r[n]);
}
function dt(e) {
  var t = e.f;
  if ((t & xe) === 0) {
    M(e, B);
    var r = y, n = We;
    y = e, We = !0;
    try {
      (t & (Se | Br)) !== 0 ? As(e) : _n(e), gn(e);
      var s = xn(e);
      e.teardown = typeof s == "function" ? s : null, e.wv = $n;
      var i;
      Qt && Mn && (e.f & G) !== 0 && e.deps;
    } finally {
      We = n, y = r;
    }
  }
}
function u(e) {
  var t = e.f, r = (t & H) !== 0;
  if (m !== null && !ce) {
    var n = y !== null && (y.f & xe) !== 0;
    if (!n && !ke?.includes(e)) {
      var s = m.deps;
      if ((m.f & er) !== 0)
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
      return ((l.f & B) === 0 && l.reactions !== null || Tn(l)) && (a = gr(l)), Fe.set(l, a), a;
    }
    var o = (l.f & ae) === 0 && !ce && m !== null && (We || (m.f & ae) !== 0), f = l.deps === null;
    ht(l) && (o && (l.f |= ae), sn(l)), o && !f && kn(l);
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
      (t.reactions ??= []).push(e), (t.f & H) !== 0 && (t.f & ae) === 0 && kn(
        /** @type {Derived} */
        t
      );
  }
}
function Tn(e) {
  if (e.v === j) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Fe.has(t) || (t.f & H) !== 0 && Tn(
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
function sr(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (it in e)
      ir(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const r = e[t];
        typeof r == "object" && r && it in r && ir(r);
      }
  }
}
function ir(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let n in e)
      try {
        ir(e[n], t);
      } catch {
      }
    const r = fr(e);
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
const Ps = /* @__PURE__ */ new Set(), Rr = /* @__PURE__ */ new Set();
function Ms(e, t, r, n = {}) {
  function s(i) {
    if (n.capture || _t.call(t, i), !i.cancelBubble)
      return _r(() => r?.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? kt(() => {
    t.addEventListener(e, s, n);
  }) : t.addEventListener(e, s, n), s;
}
function gt(e, t, r, n, s) {
  var i = { capture: n, passive: s }, l = Ms(e, t, r, i);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && hn(() => {
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
    var c = m, p = y;
    X(null), pe(null);
    try {
      for (var v, d = []; i !== null; ) {
        var g = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var x = i["__" + n];
          x != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i) && x.call(i, e);
        } catch (h) {
          v ? d.push(h) : v = h;
        }
        if (e.cancelBubble || g === t || g === null)
          break;
        i = g;
      }
      if (v) {
        for (let h of d)
          queueMicrotask(() => {
            throw h;
          });
        throw v;
      }
    } finally {
      e.__root = t, delete e.currentTarget, X(c), pe(p);
    }
  }
}
function Is(e) {
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
function F(e, t) {
  var r = (t & Hn) !== 0, n = (t & Yn) !== 0, s, i = !e.startsWith("<!>");
  return () => {
    if (q)
      return Rt(E, null), E;
    s === void 0 && (s = Is(i ? e : "<!>" + e), r || (s = /** @type {TemplateNode} */
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
function P(e, t) {
  if (q) {
    var r = (
      /** @type {Effect & { nodes: EffectNodes }} */
      y
    );
    ((r.f & Bt) === 0 || r.nodes.end === null) && (r.nodes.end = E), Et();
    return;
  }
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const Ds = ["touchstart", "touchmove"];
function Fs(e) {
  return Ds.includes(e);
}
function se(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ??= e.nodeValue) && (e.__t = r, e.nodeValue = r + "");
}
function Sn(e, t) {
  return An(e, t);
}
function Ls(e, t) {
  nr(), t.intro = t.intro ?? !1;
  const r = t.target, n = q, s = E;
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
    return l !== at && console.warn("Failed to hydrate: ", l), t.recover === !1 && ts(), nr(), cn(r), Ee(!1), Sn(e, t);
  } finally {
    Ee(n), Q(s);
  }
}
const tt = /* @__PURE__ */ new Map();
function An(e, { target: t, anchor: r, props: n = {}, events: s, context: i, intro: l = !0 }) {
  nr();
  var a = /* @__PURE__ */ new Set(), o = (p) => {
    for (var v = 0; v < p.length; v++) {
      var d = p[v];
      if (!a.has(d)) {
        a.add(d);
        var g = Fs(d);
        t.addEventListener(d, _t, { passive: g });
        var x = tt.get(d);
        x === void 0 ? (document.addEventListener(d, _t, { passive: g }), tt.set(d, 1)) : tt.set(d, x + 1);
      }
    }
  };
  o(jt(Ps)), Rr.add(o);
  var f = void 0, c = xs(() => {
    var p = r ?? t.appendChild(de());
    return hs(
      /** @type {TemplateNode} */
      p,
      {
        pending: () => {
        }
      },
      (v) => {
        if (i) {
          Yt({});
          var d = (
            /** @type {ComponentContext} */
            O
          );
          d.c = i;
        }
        if (s && (n.$$events = s), q && Rt(
          /** @type {TemplateNode} */
          v,
          null
        ), f = e(v, n) || {}, q && (y.nodes.end = E, E === null || E.nodeType !== vt || /** @type {Comment} */
        E.data !== or))
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
      Rr.delete(o), p !== r && p.parentNode?.removeChild(p);
    };
  });
  return lr.set(f, c), f;
}
let lr = /* @__PURE__ */ new WeakMap();
function zs(e, t) {
  const r = lr.get(e);
  return r ? (lr.delete(e), r(t)) : Promise.resolve();
}
class js {
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
      A
    );
    if (this.#e.has(t)) {
      var r = (
        /** @type {Key} */
        this.#e.get(t)
      ), n = this.#t.get(r);
      if (n)
        wr(n), this.#i.delete(r);
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
      A
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
      q && (this.anchor = E), this.#s();
  }
}
function ye(e, t, r = !1) {
  q && Et();
  var n = new js(e), s = r ? ot : 0;
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
  br(() => {
    var l = !1;
    t((a, o = !0) => {
      l = !0, i(o, a);
    }), l || i(!1, null);
  }, s);
}
function Bs(e, t) {
  return t;
}
function Hs(e, t, r) {
  for (var n = [], s = t.length, i, l = t.length, a = 0; a < s; a++) {
    let p = t[a];
    Ue(
      p,
      () => {
        if (i) {
          if (i.pending.delete(p), i.done.add(p), i.pending.size === 0) {
            var v = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            ar(jt(i.done)), v.delete(i), v.size === 0 && (e.outrogroups = null);
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
      ), c = (
        /** @type {Element} */
        f.parentNode
      );
      cn(c), c.append(f), e.items.clear();
    }
    ar(t, !o);
  } else
    i = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(i);
}
function ar(e, t = !0) {
  for (var r = 0; r < e.length; r++)
    W(e[r], t);
}
var Or;
function Xt(e, t, r, n, s, i = null) {
  var l = e, a = /* @__PURE__ */ new Map(), o = (t & Dr) !== 0;
  if (o) {
    var f = (
      /** @type {Element} */
      e
    );
    l = q ? Q(/* @__PURE__ */ Xe(f)) : f.appendChild(de());
  }
  q && Et();
  var c = null, p = /* @__PURE__ */ pr(() => {
    var _ = r();
    return Lr(_) ? _ : _ == null ? [] : jt(_);
  }), v, d = !0;
  function g() {
    h.fallback = c, Ys(h, v, l, t, n), c !== null && (v.length === 0 ? (c.f & qe) === 0 ? wr(c) : (c.f ^= qe, mt(c, null, l)) : Ue(c, () => {
      c = null;
    }));
  }
  var x = br(() => {
    v = /** @type {V[]} */
    u(p);
    var _ = v.length;
    let $ = !1;
    if (q) {
      var Z = Wr(l) === zt;
      Z !== (_ === 0) && (l = It(), Q(l), Ee(!1), $ = !0);
    }
    for (var Y = /* @__PURE__ */ new Set(), me = (
      /** @type {Batch} */
      A
    ), be = dn(), L = 0; L < _; L += 1) {
      q && E.nodeType === vt && /** @type {Comment} */
      E.data === or && (l = /** @type {Comment} */
      E, $ = !0, Ee(!1));
      var he = v[L], Ne = n(he, L), I = d ? null : a.get(Ne);
      I ? (I.v && ct(I.v, he), I.i && ct(I.i, L), be && me.skipped_effects.delete(I.e)) : (I = Vs(
        a,
        d ? l : Or ??= de(),
        he,
        Ne,
        L,
        s,
        t,
        r
      ), d || (I.e.f |= qe), a.set(Ne, I)), Y.add(Ne);
    }
    if (_ === 0 && i && !c && (d ? c = le(() => i(l)) : (c = le(() => i(Or ??= de())), c.f |= qe)), q && _ > 0 && Q(It()), !d)
      if (be) {
        for (const [Gt, k] of a)
          Y.has(Gt) || me.skipped_effects.add(k.e);
        me.oncommit(g), me.ondiscard(() => {
        });
      } else
        g();
    $ && Ee(!0), u(p);
  }), h = { effect: x, items: a, outrogroups: null, fallback: c };
  d = !1, q && (l = E);
}
function Ys(e, t, r, n, s) {
  var i = (n & Ln) !== 0, l = t.length, a = e.items, o = e.effect.first, f, c = null, p, v = [], d = [], g, x, h, _;
  if (i)
    for (_ = 0; _ < l; _ += 1)
      g = t[_], x = s(g, _), h = /** @type {EachItem} */
      a.get(x).e, (h.f & qe) === 0 && (h.nodes?.a?.measure(), (p ??= /* @__PURE__ */ new Set()).add(h));
  for (_ = 0; _ < l; _ += 1) {
    if (g = t[_], x = s(g, _), h = /** @type {EachItem} */
    a.get(x).e, e.outrogroups !== null)
      for (const I of e.outrogroups)
        I.pending.delete(h), I.done.delete(h);
    if ((h.f & qe) !== 0)
      if (h.f ^= qe, h === o)
        mt(h, null, r);
      else {
        var $ = c ? c.next : o;
        h === e.effect.last && (e.effect.last = h.prev), h.prev && (h.prev.next = h.next), h.next && (h.next.prev = h.prev), Me(e, c, h), Me(e, h, $), mt(h, $, r), c = h, v = [], d = [], o = c.next;
        continue;
      }
    if ((h.f & re) !== 0 && (wr(h), i && (h.nodes?.a?.unfix(), (p ??= /* @__PURE__ */ new Set()).delete(h))), h !== o) {
      if (f !== void 0 && f.has(h)) {
        if (v.length < d.length) {
          var Z = d[0], Y;
          c = Z.prev;
          var me = v[0], be = v[v.length - 1];
          for (Y = 0; Y < v.length; Y += 1)
            mt(v[Y], Z, r);
          for (Y = 0; Y < d.length; Y += 1)
            f.delete(d[Y]);
          Me(e, me.prev, be.next), Me(e, c, me), Me(e, be, Z), o = Z, c = be, _ -= 1, v = [], d = [];
        } else
          f.delete(h), mt(h, o, r), Me(e, h.prev, h.next), Me(e, h, c === null ? e.effect.first : c.next), Me(e, c, h), c = h;
        continue;
      }
      for (v = [], d = []; o !== null && o !== h; )
        (f ??= /* @__PURE__ */ new Set()).add(o), d.push(o), o = o.next;
      if (o === null)
        continue;
    }
    (h.f & qe) === 0 && v.push(h), c = h, o = h.next;
  }
  if (e.outrogroups !== null) {
    for (const I of e.outrogroups)
      I.pending.size === 0 && (ar(jt(I.done)), e.outrogroups?.delete(I));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (o !== null || f !== void 0) {
    var L = [];
    if (f !== void 0)
      for (h of f)
        (h.f & re) === 0 && L.push(h);
    for (; o !== null; )
      (o.f & re) === 0 && o !== e.fallback && L.push(o), o = o.next;
    var he = L.length;
    if (he > 0) {
      var Ne = (n & Dr) !== 0 && l === 0 ? r : null;
      if (i) {
        for (_ = 0; _ < he; _ += 1)
          L[_].nodes?.a?.measure();
        for (_ = 0; _ < he; _ += 1)
          L[_].nodes?.a?.fix();
      }
      Hs(e, L, Ne);
    }
  }
  i && kt(() => {
    if (p !== void 0)
      for (h of p)
        h.nodes?.a?.apply();
  });
}
function Vs(e, t, r, n, s, i, l, a) {
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
    for (var n = e.nodes.start, s = e.nodes.end, i = t && (t.f & qe) === 0 ? (
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
function Us(e, t, r, n, s) {
  q && Et();
  var i = t.$$slots?.[r], l = !1;
  i === !0 && (i = t.children, l = !0), i === void 0 || i(e, l ? () => n : n);
}
function yr(e, t) {
  ks(() => {
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
function Ws(e, t, r) {
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
    var a = Ws(r, n, i);
    (!q || a !== e.getAttribute("class")) && (a == null ? e.removeAttribute("class") : e.className = a), e.__className = r;
  } else if (i && s !== i)
    for (var o in i) {
      var f = !!i[o];
      (s == null || f !== !!s[o]) && e.classList.toggle(o, f);
    }
  return i;
}
const Gs = /* @__PURE__ */ Symbol("is custom element"), Ks = /* @__PURE__ */ Symbol("is html");
function Nn(e, t, r, n) {
  var s = Js(e);
  q && (s[t] = e.getAttribute(t)), s[t] !== (s[t] = r) && (r == null ? e.removeAttribute(t) : typeof r != "string" && Xs(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function Js(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [Gs]: e.nodeName.includes("-"),
      [Ks]: e.namespaceURI === Vn
    }
  );
}
var Mr = /* @__PURE__ */ new Map();
function Xs(e) {
  var t = e.getAttribute("is") || e.nodeName, r = Mr.get(t);
  if (r) return r;
  Mr.set(t, r = []);
  for (var n, s = e, i = Element.prototype; i !== s; ) {
    n = zr(s);
    for (var l in n)
      n[l].set && r.push(l);
    s = fr(s);
  }
  return r;
}
function Rn(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    O
  ), r = t.l.u;
  if (!r) return;
  let n = () => sr(t.s);
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
    n = () => u(l);
  }
  r.b.length && qs(() => {
    Ir(t, n), Zt(r.b);
  }), Sr(() => {
    const s = R(() => r.m.map(Kn));
    return () => {
      for (const i of s)
        typeof i == "function" && i();
    };
  }), r.a.length && Sr(() => {
    Ir(t, n), Zt(r.a);
  });
}
function Ir(e, t) {
  if (e.l.s)
    for (const r of e.l.s) u(r);
  t();
}
let Nt = !1;
function Qs(e) {
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
    var c = it in e || Vr in e;
    f = Ve(e, t)?.set ?? (c && t in e ? ($) => e[t] = $ : void 0);
  }
  var p, v = !1;
  [p, v] = Qs(() => (
    /** @type {V} */
    e[t]
  )), p === void 0 && n !== void 0 && (p = o(), f && (s && rs(), f(p)));
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
  var x = !1, h = /* @__PURE__ */ pr(() => (x = !1, d()));
  u(h);
  var _ = (
    /** @type {Effect} */
    y
  );
  return (
    /** @type {() => V} */
    (function($, Z) {
      if (arguments.length > 0) {
        const Y = Z ? u(h) : s && i ? st($) : $;
        return D(h, Y), x = !0, l !== void 0 && (l = Y), $;
      }
      return Le && x || (_.f & xe) !== 0 ? h.v : u(h);
    })
  );
}
function Zs(e) {
  return new ei(e);
}
class ei {
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
          return u(r.get(l) ?? n(l, Reflect.get(i, l)));
        },
        has(i, l) {
          return l === Vr ? !0 : (u(r.get(l) ?? n(l, Reflect.get(i, l))), Reflect.has(i, l));
        },
        set(i, l, a) {
          return D(r.get(l) ?? n(l, a), a), Reflect.set(i, l, a);
        }
      }
    );
    this.#t = (t.hydrate ? Ls : Sn)(t.component, {
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
      zs(this.#t);
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
          s !== "default" && (l.name = s), P(i, l);
        };
      };
      var e = t;
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const r = {}, n = ti(this);
      for (const s of this.$$s)
        s in n && (s === "default" && !this.$$d.children ? (this.$$d.children = t(s), r.default = !0) : r[s] = t(s));
      for (const s of this.attributes) {
        const i = this.$$g_p(s.name);
        i in this.$$d || (this.$$d[i] = Ct(i, s.value, this.$$p_d, "toProp"));
      }
      for (const s in this.$$p_d)
        !(s in this.$$d) && this[s] !== void 0 && (this.$$d[s] = this[s], delete this[s]);
      this.$$c = Zs({
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
function ti(e) {
  const t = {};
  return e.childNodes.forEach((r) => {
    t[
      /** @type {Element} node */
      r.slot || "default"
    ] = !0;
  }), t;
}
function $r(e, t, r, n, s, i) {
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
          var c = Ve(f, a)?.get;
          c ? f[a] = o : f.$set({ [a]: o });
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
var ri = /* @__PURE__ */ F('<article><span class="label svelte-itdw9l"> </span></article>');
const ni = {
  hash: "svelte-itdw9l",
  code: `.card.svelte-itdw9l {display:flex;align-items:center;justify-content:center;padding:0.75rem 0.75rem;border-radius:8px;border:1px solid #e2e8f0;background:#ffffff;color:#1e293b;min-height:70px;text-align:center;transition:opacity 150ms ease,\r
      background 150ms ease;}.card.excluded.svelte-itdw9l {opacity:0.5;background:#f8fafc;border-color:#e2e8f0;}.card.compact.svelte-itdw9l {padding:0.5rem 0.5rem;min-height:56px;border-radius:6px;font-size:0.8rem;}.label.svelte-itdw9l {font-size:0.85rem;font-weight:500;line-height:1.3;word-break:break-word;}\r
\r
  @media (max-width: 640px) {.card.svelte-itdw9l {min-height:72px;}\r
  }`
};
function On(e, t) {
  Yt(t, !1), yr(e, ni);
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
  var l = ri(), a = w(l), o = w(a, !0);
  return b(a), b(l), Ie(() => {
    rt(l, 1, `card ${n()} ${s()}`, "svelte-itdw9l"), Nn(l, "aria-label", (sr(r()), R(() => r().label))), se(o, (sr(r()), R(() => r().label)));
  }), P(e, l), Vt(i);
}
$r(On, { activity: {}, state: {}, size: {} }, [], [], !0);
var si = /* @__PURE__ */ F('<p class="subtitle svelte-1otr6dx"> </p>'), ii = /* @__PURE__ */ F('<section class="step svelte-1otr6dx" aria-live="polite"><div class="title-wrap"><h2 class="svelte-1otr6dx"> </h2> <!></div> <div class="slot svelte-1otr6dx"><!></div></section>');
const li = {
  hash: "svelte-1otr6dx",
  code: ".step.svelte-1otr6dx {display:grid;gap:0.75rem;}h2.svelte-1otr6dx {font-size:clamp(1.3rem, 2.8vw, 1.75rem);margin:0;color:#0f172a;}.subtitle.svelte-1otr6dx {margin:0.2rem 0 0;font-size:0.95rem;color:#475569;}.slot.svelte-1otr6dx {display:flex;flex-wrap:wrap;gap:0.65rem;align-items:center;}"
};
function ai(e, t) {
  Yt(t, !1), yr(e, li);
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
  }, i = ii(), l = w(i), a = w(l), o = w(a, !0);
  b(a);
  var f = S(a, 2);
  {
    var c = (d) => {
      var g = si(), x = w(g, !0);
      b(g), Ie(() => se(x, n())), P(d, g);
    };
    ye(f, (d) => {
      n() && d(c);
    });
  }
  b(l);
  var p = S(l, 2), v = w(p);
  return Us(v, t, "default", {}), b(p), b(i), Ie(() => se(o, r())), P(e, i), Vt(s);
}
$r(ai, { title: {}, subtitle: {} }, ["default"], [], !0);
var oi = /* @__PURE__ */ F('<button type="button"><span class="step-number svelte-1gqp2ed"></span> <span class="step-label svelte-1gqp2ed"> </span></button>'), fi = /* @__PURE__ */ F('<div class="question-header svelte-1gqp2ed"><span class="question-icon svelte-1gqp2ed" aria-hidden="true"> </span> <div><h2 class="question-title svelte-1gqp2ed"> </h2> <p class="question-subtitle svelte-1gqp2ed"> </p></div></div> <p class="help-text svelte-1gqp2ed"> </p> <div class="decision-section svelte-1gqp2ed"><div class="button-group svelte-1gqp2ed"><button type="button">Yes</button> <button type="button">No</button></div></div>', 1), ui = /* @__PURE__ */ F(`<div class="result yes svelte-1gqp2ed"><h2 class="svelte-1gqp2ed">Yes, this is platform work</h2> <p class="svelte-1gqp2ed">All four essential conditions are met. According to the
              definition, this qualifies as platform work because:</p> <ul class="criteria-explanation svelte-1gqp2ed"><li class="svelte-1gqp2ed"><strong>Labour is being exchanged</strong> — workers provide services
                through the platform</li> <li class="svelte-1gqp2ed"><strong>The platform actively matches</strong> — it connects workers
                to tasks or clients</li> <li class="svelte-1gqp2ed"><strong>Work is requested</strong> — clients or the platform initiate
                the work</li> <li class="svelte-1gqp2ed"><strong>It's done for payment</strong> — workers earn income or profit
                from the activity</li></ul></div>`), ci = /* @__PURE__ */ F(`<li class="svelte-1gqp2ed"><strong>No labour exchange</strong> — This involves selling goods
                  or renting assets rather than providing services</li>`), di = /* @__PURE__ */ F(`<li class="svelte-1gqp2ed"><strong>No active matching</strong> — The platform doesn't actively
                  connect workers to tasks (it's a passive marketplace)</li>`), vi = /* @__PURE__ */ F(`<li class="svelte-1gqp2ed"><strong>Work is not requested</strong> — The work is self-initiated
                  rather than requested by clients</li>`), hi = /* @__PURE__ */ F(`<li class="svelte-1gqp2ed"><strong>Not done for payment</strong> — This is unpaid or voluntary
                  work</li>`), pi = /* @__PURE__ */ F(`<div class="result no svelte-1gqp2ed"><h2>No, this is not platform work</h2> <p class="svelte-1gqp2ed">Platform work requires all four conditions to be met. Based on
              your answers, this does not qualify because:</p> <ul class="criteria-explanation svelte-1gqp2ed"><!> <!> <!> <!></ul> <p class="note svelte-1gqp2ed">Even one missing condition means it doesn't meet the definition of
              platform work.</p></div>`), gi = /* @__PURE__ */ F('<div class="table-row svelte-1gqp2ed"><span class="criterion-icon svelte-1gqp2ed" aria-hidden="true"> </span> <span class="criterion-name svelte-1gqp2ed"> </span> <span> </span></div>'), _i = /* @__PURE__ */ F('<div class="card-wrap"><!></div>'), mi = /* @__PURE__ */ F('<div class="examples-section svelte-1gqp2ed"><div class="section-title svelte-1gqp2ed">Examples matching your scenario</div> <div class="grid svelte-1gqp2ed"></div></div>'), bi = /* @__PURE__ */ F('<div class="result-section svelte-1gqp2ed"><!> <div class="summary-table svelte-1gqp2ed"><div class="section-title svelte-1gqp2ed">Your answers</div> <!></div> <!></div>'), wi = /* @__PURE__ */ F('<span class="step-label svelte-1gqp2ed">All questions answered</span> <button type="button" class="primary svelte-1gqp2ed">Start Over</button>', 1), yi = /* @__PURE__ */ F('<span class="step-label svelte-1gqp2ed"> </span>'), $i = /* @__PURE__ */ F('<section class="infographic svelte-1gqp2ed"><nav class="progress-nav svelte-1gqp2ed" aria-label="Progress"><!> <button type="button" aria-label="Final result"><span class="step-number svelte-1gqp2ed">✓</span> <span class="step-label svelte-1gqp2ed">Result</span></button></nav> <div class="panel svelte-1gqp2ed" aria-live="polite"><!></div> <footer class="nav svelte-1gqp2ed"><button type="button" class="ghost svelte-1gqp2ed">Back</button> <div class="nav-right svelte-1gqp2ed"><!></div></footer></section>');
const qi = {
  hash: "svelte-1gqp2ed",
  code: `.infographic.svelte-1gqp2ed {display:grid;gap:1.5rem;color:#1e293b;}.progress-nav.svelte-1gqp2ed {display:flex;gap:0.75rem;align-items:center;justify-content:center;overflow-x:auto;padding:0.5rem;}.progress-step.svelte-1gqp2ed {display:flex;flex-direction:column;align-items:center;gap:0.25rem;padding:0.75rem 1rem;border-radius:8px;border:1px solid #e2e8f0;background:#ffffff;color:#94a3b8;font-weight:500;font-size:0.8rem;cursor:pointer;transition:all 150ms ease;min-width:75px;}.progress-step.svelte-1gqp2ed:hover:not(:disabled) {border-color:#cbd5e1;background:#f1f5f9;}.progress-step.completed.svelte-1gqp2ed {border-color:#cbd5e1;color:#64748b;background:#f1f5f9;}.progress-step.active.svelte-1gqp2ed {border-color:#03354a;background:#03354a;color:#ffffff;}.progress-step.svelte-1gqp2ed:disabled {cursor:not-allowed;opacity:0.5;}.progress-step.result-step.completed.svelte-1gqp2ed {border-color:#22c55e;background:#f0fdf4;color:#166534;}.progress-step.result-step.active.svelte-1gqp2ed {border-color:#03354a;background:#03354a;color:#ffffff;}.step-number.svelte-1gqp2ed {font-weight:700;font-size:1rem;color:inherit;}.step-label.svelte-1gqp2ed {font-size:0.75rem;text-align:center;color:inherit;}.panel.svelte-1gqp2ed {padding:1.5rem;border:1px solid #e2e8f0;border-radius:12px;}.question-header.svelte-1gqp2ed {display:flex;gap:1rem;align-items:center;margin-bottom:1rem;}.question-icon.svelte-1gqp2ed {font-size:2.5rem;flex-shrink:0;}.question-title.svelte-1gqp2ed {margin:0;font-size:clamp(1.25rem, 2.5vw, 1.5rem);font-weight:600;color:#0f172a;}.question-subtitle.svelte-1gqp2ed {margin:0.25rem 0 0;font-size:0.85rem;color:#94a3b8;font-weight:500;}.grid.svelte-1gqp2ed {display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:0.75rem;}.grid.compact.svelte-1gqp2ed {grid-template-columns:repeat(auto-fit, minmax(120px, 1fr));gap:0.6rem;}.section-title.svelte-1gqp2ed {font-size:0.75rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.25rem;}.filtered.svelte-1gqp2ed {display:grid;gap:0.6rem;}.summary.svelte-1gqp2ed {display:grid;gap:1.5rem;}.nav.svelte-1gqp2ed {display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;}.nav-right.svelte-1gqp2ed {display:flex;gap:0.75rem;align-items:center;}.step-label.svelte-1gqp2ed {color:#475569;font-weight:600;font-size:0.9rem;}.primary.svelte-1gqp2ed,\r
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
  Yt(t, !1), yr(e, qi);
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
  function c(k, T) {
    ws(a, u(a)[k] = T), u(o) < f - 1 && D(o, u(o) + 1);
  }
  function p() {
    D(a, { labour: null, matching: null, requested: null, paid: null }), D(o, 0);
  }
  function v() {
    u(o) > 0 && D(o, u(o) - 1);
  }
  Jt(() => u(a), () => {
    D(r, Object.values(u(a)).every((k) => k !== null));
  }), Jt(() => (u(r), u(a)), () => {
    D(n, u(r) && Object.values(u(a)).every((k) => k === !0));
  }), Jt(() => u(a), () => {
    D(s, l.filter((k) => Object.entries(u(a)).every(([T, C]) => C === null ? !0 : k.flags[T] === C)));
  }), Ts(), Rn();
  var d = $i(), g = w(d), x = w(g);
  Xt(x, 1, () => i, Bs, (k, T, C) => {
    var z = oi();
    let Ze;
    var we = w(z);
    we.textContent = C + 1;
    var Re = S(we, 2), pt = w(Re, !0);
    b(Re), b(z), Ie(() => {
      Ze = rt(z, 1, "progress-step svelte-1gqp2ed", null, Ze, {
        completed: u(a)[u(T).id] !== null,
        active: u(o) === C && !u(r)
      }), z.disabled = C > u(o), Nn(z, "aria-label", (u(T), R(() => `Step ${C + 1}: ${u(T).label}`))), se(pt, (u(T), R(() => u(T).label)));
    }), gt("click", z, () => !u(r) && C <= u(o) && D(o, C)), P(k, z);
  });
  var h = S(x, 2);
  let _;
  b(g);
  var $ = S(g, 2), Z = w($);
  {
    var Y = (k) => {
      var T = fi(), C = Tr(T), z = w(C), Ze = w(z, !0);
      b(z);
      var we = S(z, 2), Re = w(we), pt = w(Re, !0);
      b(Re);
      var Tt = S(Re, 2), V = w(Tt);
      b(Tt), b(we), b(C);
      var N = S(C, 2), oe = w(N, !0);
      b(N);
      var ee = S(N, 2), Ce = w(ee), K = w(Ce), Oe = S(K, 2);
      b(Ce), b(ee), Ie(() => {
        se(Ze, (u(o), R(() => i[u(o)].icon))), se(pt, (u(o), R(() => i[u(o)].question))), se(V, `Question ${u(o) + 1} of ${f ?? ""}`), se(oe, (u(o), R(() => i[u(o)].help))), rt(
          K,
          1,
          (u(a), u(o), R(() => `decision-btn yes ${u(a)[i[u(o)].id] === !0 ? "active" : ""}`)),
          "svelte-1gqp2ed"
        ), rt(
          Oe,
          1,
          (u(a), u(o), R(() => `decision-btn no ${u(a)[i[u(o)].id] === !1 ? "active" : ""}`)),
          "svelte-1gqp2ed"
        );
      }), gt("click", K, () => c(i[u(o)].id, !0)), gt("click", Oe, () => c(i[u(o)].id, !1)), P(k, T);
    }, me = (k) => {
      var T = bi(), C = w(T);
      {
        var z = (V) => {
          var N = ui();
          P(V, N);
        }, Ze = (V) => {
          var N = pi(), oe = S(w(N), 4), ee = w(oe);
          {
            var Ce = (U) => {
              var je = ci();
              P(U, je);
            };
            ye(ee, (U) => {
              u(a), R(() => !u(a).labour) && U(Ce);
            });
          }
          var K = S(ee, 2);
          {
            var Oe = (U) => {
              var je = di();
              P(U, je);
            };
            ye(K, (U) => {
              u(a), R(() => !u(a).matching) && U(Oe);
            });
          }
          var et = S(K, 2);
          {
            var St = (U) => {
              var je = vi();
              P(U, je);
            };
            ye(et, (U) => {
              u(a), R(() => !u(a).requested) && U(St);
            });
          }
          var Kt = S(et, 2);
          {
            var Pn = (U) => {
              var je = hi();
              P(U, je);
            };
            ye(Kt, (U) => {
              u(a), R(() => !u(a).paid) && U(Pn);
            });
          }
          b(oe), Ur(2), b(N), P(V, N);
        };
        ye(C, (V) => {
          u(n) ? V(z) : V(Ze, !1);
        });
      }
      var we = S(C, 2), Re = S(w(we), 2);
      Xt(Re, 1, () => i, (V) => V.id, (V, N) => {
        var oe = gi(), ee = w(oe), Ce = w(ee, !0);
        b(ee);
        var K = S(ee, 2), Oe = w(K, !0);
        b(K);
        var et = S(K, 2);
        let St;
        var Kt = w(et, !0);
        b(et), b(oe), Ie(() => {
          se(Ce, (u(N), R(() => u(N).icon))), se(Oe, (u(N), R(() => u(N).label))), St = rt(et, 1, "answer svelte-1gqp2ed", null, St, {
            yes: u(a)[u(N).id],
            no: !u(a)[u(N).id]
          }), se(Kt, (u(a), u(N), R(() => u(a)[u(N).id] ? "Yes" : "No")));
        }), P(V, oe);
      }), b(we);
      var pt = S(we, 2);
      {
        var Tt = (V) => {
          var N = mi(), oe = S(w(N), 2);
          Xt(oe, 5, () => u(s), (ee) => ee.id, (ee, Ce) => {
            var K = _i(), Oe = w(K);
            On(Oe, {
              get activity() {
                return u(Ce);
              },
              state: "included"
            }), b(K), P(ee, K);
          }), b(oe), b(N), P(V, N);
        };
        ye(pt, (V) => {
          u(s), R(() => u(s).length > 0) && V(Tt);
        });
      }
      b(T), P(k, T);
    };
    ye(Z, (k) => {
      u(r) ? k(me, !1) : k(Y);
    });
  }
  b($);
  var be = S($, 2), L = w(be), he = S(L, 2), Ne = w(he);
  {
    var I = (k) => {
      var T = wi(), C = S(Tr(T), 2);
      gt("click", C, p), P(k, T);
    }, Gt = (k) => {
      var T = yi(), C = w(T);
      b(T), Ie(
        (z) => se(C, `${z ?? ""} of ${f ?? ""}
          answered`),
        [
          () => (u(a), R(() => Object.values(u(a)).filter((z) => z !== null).length))
        ]
      ), P(k, T);
    };
    ye(Ne, (k) => {
      u(r) ? k(I) : k(Gt, !1);
    });
  }
  b(he), b(be), b(d), Ie(() => {
    _ = rt(h, 1, "progress-step result-step svelte-1gqp2ed", null, _, { completed: u(r), active: u(r) }), h.disabled = !u(r), L.disabled = u(o) === 0;
  }), gt("click", L, v), P(e, d), Vt();
}
customElements.define("platform-work-checker", $r(Ei, {}, [], [], !0));
