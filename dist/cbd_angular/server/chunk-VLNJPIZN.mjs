import "./polyfills.server.mjs";
import {
  A as _,
  B as c,
  Ba as st,
  C as He,
  D as A,
  E as r,
  F as l,
  Fa as rt,
  G as g,
  H as X,
  I as J,
  Ia as lt,
  J as G,
  Ja as ct,
  K as re,
  L as x,
  M as v,
  N as H,
  O as N,
  P as ee,
  Q as ke,
  R as k,
  S as B,
  T as d,
  U as pe,
  V as y,
  W as O,
  X as D,
  Y as Je,
  Z as Te,
  a as je,
  b as $e,
  c as Qe,
  d as j,
  da as de,
  e as F,
  f as h,
  fa as P,
  g as $,
  ga as xe,
  h as be,
  ha as et,
  i as Ye,
  ia as Ae,
  j as U,
  k as q,
  ka as ue,
  l as Q,
  la as tt,
  m as Y,
  ma as we,
  n as ne,
  na as me,
  o as ae,
  oa as Le,
  p as Ee,
  pa as K,
  q as Ze,
  qa as te,
  r as u,
  ra as it,
  s as S,
  sa as nt,
  t as Xe,
  ta as at,
  u as Se,
  ua as Be,
  v as Ie,
  va as Ve,
  w as Pe,
  wa as We,
  x as Z,
  xa as Ue,
  y as oe,
  ya as ot,
  z as m,
} from "./chunk-BLMCL55L.mjs";
import { a as se } from "./chunk-VVCT4QZE.mjs";
var pt = (() => {
  class n {
    constructor() {
      this.title = "cbd-vital";
    }
    static {
      this.ɵfac = function (t) {
        return new (t || n)();
      };
    }
    static {
      this.ɵcmp = h({
        type: n,
        selectors: [["app-root"]],
        standalone: !0,
        features: [y],
        decls: 2,
        vars: 0,
        template: function (t, i) {
          t & 1 && (r(0, "div"), g(1, "router-outlet"), l());
        },
        dependencies: [rt],
      });
    }
  }
  return n;
})();
var V = class {
  formatMasage() {
    let o = `Ola, selecionei os seguintes produtos na loja.
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
var dt = (() => {
  class n {
    constructor() {}
    sendMensage() {
      new V().sendMensage();
    }
    static {
      this.ɵfac = function (t) {
        return new (t || n)();
      };
    }
    static {
      this.ɵcmp = h({
        type: n,
        selectors: [["app-header"]],
        standalone: !0,
        features: [y],
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
        template: function (t, i) {
          t & 1 &&
            (r(0, "header", 0)(1, "div", 0),
            g(2, "img", 1)(3, "div", 2),
            r(4, "div", 3)(5, "h1", 4),
            d(6, " A ci\xEAncia que transforma a sa\xFAde "),
            l(),
            r(7, "button", 5),
            x("click", function () {
              return i.sendMensage();
            }),
            d(8, " Clique e saiba mais "),
            l()(),
            g(9, "div", 6),
            l(),
            r(10, "nav", 7)(11, "ul", 8)(12, "li")(13, "a", 9),
            d(14, "Sobre"),
            l()(),
            r(15, "li")(16, "a", 10),
            d(17, "Como funciona"),
            l()(),
            r(18, "li")(19, "a", 11),
            d(20, "Depoimentos"),
            l()(),
            r(21, "li")(22, "a", 12),
            d(23, "Benef\xEDcios"),
            l()(),
            r(24, "li")(25, "a", 13),
            d(26, "Fale conosco"),
            l()()()()());
        },
        encapsulation: 2,
      });
    }
  }
  return n;
})();
var ut = (() => {
  class n {
    constructor() {}
    sendMensage() {
      new V().sendMensage();
    }
    static {
      this.ɵfac = function (t) {
        return new (t || n)();
      };
    }
    static {
      this.ɵcmp = h({
        type: n,
        selectors: [["app-features"]],
        standalone: !0,
        features: [y],
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
            "assets/media/ampola1.png",
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
        template: function (t, i) {
          t & 1 &&
            (r(0, "section", 0)(1, "div", 1)(2, "div", 2),
            g(3, "img", 3),
            r(4, "div", 4)(5, "div", 5)(6, "p", 6),
            d(7, "+500"),
            l(),
            r(8, "p", 7),
            d(9, "Pessoas atendidas"),
            l()(),
            r(10, "div", 5)(11, "p", 6),
            d(12, "+300"),
            l(),
            r(13, "p", 7),
            d(14, "Tratamentos iniciados"),
            l()()()(),
            r(15, "div", 8)(16, "div", 9)(17, "h2", 10),
            d(18, " Entenda mais sobre "),
            l(),
            r(19, "h3", 11),
            d(20, " Um produto que eleva sua sa\xFAde e qualidade de vida "),
            l(),
            r(21, "p", 12),
            d(
              22,
              " A medicina natural, bioid\xEAntica e comprovada cientificamente est\xE1 \xE0 sua disposi\xE7\xE3o. Vamos promover sa\xFAde, bem-estar e qualidade de vida a todos que precisam. "
            ),
            l(),
            r(23, "button", 13),
            x("click", function () {
              return i.sendMensage();
            }),
            d(24, " Fale Conosco "),
            l()()()()());
        },
        encapsulation: 2,
      });
    }
  }
  return n;
})();
var mt = (() => {
  class n {
    static {
      this.ɵfac = function (t) {
        return new (t || n)();
      };
    }
    static {
      this.ɵcmp = h({
        type: n,
        selectors: [["app-how-to-buy"]],
        standalone: !0,
        features: [y],
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
        template: function (t, i) {
          t & 1 &&
            (r(0, "section", 0)(1, "div", 1)(2, "h2", 2),
            d(3, "Como Comprar?"),
            l(),
            r(4, "div", 3)(5, "div", 4)(6, "div", 5),
            d(7, " 1 "),
            l(),
            r(8, "h3", 6),
            d(9, " Consulta M\xE9dica "),
            l(),
            r(10, "p", 7),
            d(
              11,
              " Ao entrar em contato conosco, voc\xEA ir\xE1 falar com um m\xE9dico para lhe prescrever a receita. "
            ),
            l()(),
            r(12, "div", 4)(13, "div", 5),
            d(14, " 2 "),
            l(),
            r(15, "h3", 6),
            d(16, "Autoriza\xE7\xE3o"),
            l(),
            r(17, "p", 7),
            d(
              18,
              " A autoriza\xE7\xE3o da Anvisa para o uso do produto ser\xE1 feita de forma r\xE1pida e pr\xE1tica pela nossa equipe especializada. "
            ),
            l()(),
            r(19, "div", 4)(20, "div", 5),
            d(21, " 3 "),
            l(),
            r(22, "h3", 6),
            d(23, "Entrega"),
            l(),
            r(24, "p", 7),
            d(
              25,
              " A partir disso, o produto ser\xE1 entregue em sua resid\xEAncia de forma r\xE1pida e segura. "
            ),
            l()()()()());
        },
        encapsulation: 2,
      });
    }
  }
  return n;
})();
var Oe = class n {
    static isArray(o, e = !0) {
      return Array.isArray(o) && (e || o.length !== 0);
    }
    static isObject(o, e = !0) {
      return (
        typeof o == "object" &&
        !Array.isArray(o) &&
        o != null &&
        (e || Object.keys(o).length !== 0)
      );
    }
    static equals(o, e, t) {
      return t
        ? this.resolveFieldData(o, t) === this.resolveFieldData(e, t)
        : this.equalsByValue(o, e);
    }
    static equalsByValue(o, e) {
      if (o === e) return !0;
      if (o && e && typeof o == "object" && typeof e == "object") {
        var t = Array.isArray(o),
          i = Array.isArray(e),
          a,
          s,
          p;
        if (t && i) {
          if (((s = o.length), s != e.length)) return !1;
          for (a = s; a-- !== 0; )
            if (!this.equalsByValue(o[a], e[a])) return !1;
          return !0;
        }
        if (t != i) return !1;
        var f = this.isDate(o),
          I = this.isDate(e);
        if (f != I) return !1;
        if (f && I) return o.getTime() == e.getTime();
        var b = o instanceof RegExp,
          E = e instanceof RegExp;
        if (b != E) return !1;
        if (b && E) return o.toString() == e.toString();
        var T = Object.keys(o);
        if (((s = T.length), s !== Object.keys(e).length)) return !1;
        for (a = s; a-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(e, T[a])) return !1;
        for (a = s; a-- !== 0; )
          if (((p = T[a]), !this.equalsByValue(o[p], e[p]))) return !1;
        return !0;
      }
      return o !== o && e !== e;
    }
    static resolveFieldData(o, e) {
      if (o && e) {
        if (this.isFunction(e)) return e(o);
        if (e.indexOf(".") == -1) return o[e];
        {
          let t = e.split("."),
            i = o;
          for (let a = 0, s = t.length; a < s; ++a) {
            if (i == null) return null;
            i = i[t[a]];
          }
          return i;
        }
      } else return null;
    }
    static isFunction(o) {
      return !!(o && o.constructor && o.call && o.apply);
    }
    static reorderArray(o, e, t) {
      let i;
      o &&
        e !== t &&
        (t >= o.length && ((t %= o.length), (e %= o.length)),
        o.splice(t, 0, o.splice(e, 1)[0]));
    }
    static insertIntoOrderedArray(o, e, t, i) {
      if (t.length > 0) {
        let a = !1;
        for (let s = 0; s < t.length; s++)
          if (this.findIndexInList(t[s], i) > e) {
            t.splice(s, 0, o), (a = !0);
            break;
          }
        a || t.push(o);
      } else t.push(o);
    }
    static findIndexInList(o, e) {
      let t = -1;
      if (e) {
        for (let i = 0; i < e.length; i++)
          if (e[i] == o) {
            t = i;
            break;
          }
      }
      return t;
    }
    static contains(o, e) {
      if (o != null && e && e.length) {
        for (let t of e) if (this.equals(o, t)) return !0;
      }
      return !1;
    }
    static removeAccents(o) {
      return (
        o &&
          (o = o
            .normalize("NFKD")
            .replace(new RegExp("\\p{Diacritic}", "gu"), "")),
        o
      );
    }
    static isDate(o) {
      return Object.prototype.toString.call(o) === "[object Date]";
    }
    static isEmpty(o) {
      return (
        o == null ||
        o === "" ||
        (Array.isArray(o) && o.length === 0) ||
        (!this.isDate(o) && typeof o == "object" && Object.keys(o).length === 0)
      );
    }
    static isNotEmpty(o) {
      return !this.isEmpty(o);
    }
    static compare(o, e, t, i = 1) {
      let a = -1,
        s = this.isEmpty(o),
        p = this.isEmpty(e);
      return (
        s && p
          ? (a = 0)
          : s
          ? (a = i)
          : p
          ? (a = -i)
          : typeof o == "string" && typeof e == "string"
          ? (a = o.localeCompare(e, t, { numeric: !0 }))
          : (a = o < e ? -1 : o > e ? 1 : 0),
        a
      );
    }
    static sort(o, e, t = 1, i, a = 1) {
      let s = n.compare(o, e, i, t),
        p = t;
      return (n.isEmpty(o) || n.isEmpty(e)) && (p = a === 1 ? t : a), p * s;
    }
    static merge(o, e) {
      if (!(o == null && e == null)) {
        {
          if (
            (o == null || typeof o == "object") &&
            (e == null || typeof e == "object")
          )
            return se(se({}, o || {}), e || {});
          if (
            (o == null || typeof o == "string") &&
            (e == null || typeof e == "string")
          )
            return [o || "", e || ""].join(" ");
        }
        return e || o;
      }
    }
    static isPrintableCharacter(o = "") {
      return this.isNotEmpty(o) && o.length === 1 && o.match(/\S| /);
    }
    static getItemValue(o, ...e) {
      return this.isFunction(o) ? o(...e) : o;
    }
    static findLastIndex(o, e) {
      let t = -1;
      if (this.isNotEmpty(o))
        try {
          t = o.findLastIndex(e);
        } catch {
          t = o.lastIndexOf([...o].reverse().find(e));
        }
      return t;
    }
    static findLast(o, e) {
      let t;
      if (this.isNotEmpty(o))
        try {
          t = o.findLast(e);
        } catch {
          t = [...o].reverse().find(e);
        }
      return t;
    }
    static deepEquals(o, e) {
      if (o === e) return !0;
      if (o && e && typeof o == "object" && typeof e == "object") {
        var t = Array.isArray(o),
          i = Array.isArray(e),
          a,
          s,
          p;
        if (t && i) {
          if (((s = o.length), s != e.length)) return !1;
          for (a = s; a-- !== 0; ) if (!this.deepEquals(o[a], e[a])) return !1;
          return !0;
        }
        if (t != i) return !1;
        var f = o instanceof Date,
          I = e instanceof Date;
        if (f != I) return !1;
        if (f && I) return o.getTime() == e.getTime();
        var b = o instanceof RegExp,
          E = e instanceof RegExp;
        if (b != E) return !1;
        if (b && E) return o.toString() == e.toString();
        var T = Object.keys(o);
        if (((s = T.length), s !== Object.keys(e).length)) return !1;
        for (a = s; a-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(e, T[a])) return !1;
        for (a = s; a-- !== 0; )
          if (((p = T[a]), !this.deepEquals(o[p], e[p]))) return !1;
        return !0;
      }
      return o !== o && e !== e;
    }
  },
  ft = 0;
function Re(n = "pn_id_") {
  return ft++, `${n}${ft}`;
}
function Dt() {
  let n = [],
    o = (a, s) => {
      let p = n.length > 0 ? n[n.length - 1] : { key: a, value: s },
        f = p.value + (p.key === a ? 0 : s) + 2;
      return n.push({ key: a, value: f }), f;
    },
    e = (a) => {
      n = n.filter((s) => s.value !== a);
    },
    t = () => (n.length > 0 ? n[n.length - 1].value : 0),
    i = (a) => (a && parseInt(a.style.zIndex, 10)) || 0;
  return {
    get: i,
    set: (a, s, p) => {
      s && (s.style.zIndex = String(o(a, p)));
    },
    clear: (a) => {
      a && (e(i(a)), (a.style.zIndex = ""));
    },
    getCurrent: () => t(),
  };
}
var rn = Dt();
var ht = ["*"];
var R = (() => {
  class n {
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
  return n;
})();
var Fe = (() => {
    class n {
      ripple = !1;
      inputStyle = Pe("outlined");
      overlayOptions = {};
      csp = Pe({ nonce: void 0 });
      filterMatchModeOptions = {
        text: [
          R.STARTS_WITH,
          R.CONTAINS,
          R.NOT_CONTAINS,
          R.ENDS_WITH,
          R.EQUALS,
          R.NOT_EQUALS,
        ],
        numeric: [
          R.EQUALS,
          R.NOT_EQUALS,
          R.LESS_THAN,
          R.LESS_THAN_OR_EQUAL_TO,
          R.GREATER_THAN,
          R.GREATER_THAN_OR_EQUAL_TO,
        ],
        date: [R.DATE_IS, R.DATE_IS_NOT, R.DATE_BEFORE, R.DATE_AFTER],
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
      translationSource = new je();
      translationObserver = this.translationSource.asObservable();
      getTranslation(e) {
        return this.translation[e];
      }
      setTranslation(e) {
        (this.translation = se(se({}, this.translation), e)),
          this.translationSource.next(this.translation);
      }
      static ɵfac = function (t) {
        return new (t || n)();
      };
      static ɵprov = Qe({ token: n, factory: n.ɵfac, providedIn: "root" });
    }
    return n;
  })(),
  De = (() => {
    class n {
      static ɵfac = function (t) {
        return new (t || n)();
      };
      static ɵcmp = h({
        type: n,
        selectors: [["p-header"]],
        standalone: !0,
        features: [y],
        ngContentSelectors: ht,
        decls: 1,
        vars: 0,
        template: function (t, i) {
          t & 1 && (H(), N(0));
        },
        encapsulation: 2,
      });
    }
    return n;
  })(),
  gt = (() => {
    class n {
      static ɵfac = function (t) {
        return new (t || n)();
      };
      static ɵcmp = h({
        type: n,
        selectors: [["p-footer"]],
        standalone: !0,
        features: [y],
        ngContentSelectors: ht,
        decls: 1,
        vars: 0,
        template: function (t, i) {
          t & 1 && (H(), N(0));
        },
        encapsulation: 2,
      });
    }
    return n;
  })(),
  W = (() => {
    class n {
      template;
      type;
      name;
      constructor(e) {
        this.template = e;
      }
      getType() {
        return this.name;
      }
      static ɵfac = function (t) {
        return new (t || n)(S(Xe));
      };
      static ɵdir = be({
        type: n,
        selectors: [["", "pTemplate", ""]],
        inputs: { type: "type", name: [F.None, "pTemplate", "name"] },
        standalone: !0,
      });
    }
    return n;
  })(),
  fe = (() => {
    class n {
      static ɵfac = function (t) {
        return new (t || n)();
      };
      static ɵmod = $({ type: n });
      static ɵinj = j({});
    }
    return n;
  })();
var Nt = ["*"],
  ie = (() => {
    class n {
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
        let e = Oe.isEmpty(this.label);
        (this.role = e ? void 0 : "img"),
          (this.ariaLabel = e ? void 0 : this.label),
          (this.ariaHidden = e);
      }
      getClassNames() {
        return `p-icon ${this.styleClass ? this.styleClass + " " : ""}${
          this.spin ? "p-icon-spin" : ""
        }`;
      }
      static ɵfac = function (t) {
        return new (t || n)();
      };
      static ɵcmp = h({
        type: n,
        selectors: [["ng-component"]],
        hostAttrs: [1, "p-element", "p-icon-wrapper"],
        inputs: {
          label: "label",
          spin: [F.HasDecoratorInputTransform, "spin", "spin", P],
          styleClass: "styleClass",
        },
        standalone: !0,
        features: [oe, y],
        ngContentSelectors: Nt,
        decls: 1,
        vars: 0,
        template: function (t, i) {
          t & 1 && (H(), N(0));
        },
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return n;
  })();
var le = (() => {
  class n extends ie {
    static ɵfac = (() => {
      let e;
      return function (i) {
        return (e || (e = Y(n)))(i || n);
      };
    })();
    static ɵcmp = h({
      type: n,
      selectors: [["ChevronDownIcon"]],
      standalone: !0,
      features: [Z, y],
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
      template: function (t, i) {
        t & 1 && (Q(), r(0, "svg", 0), g(1, "path", 1), l()),
          t & 2 &&
            (A(i.getClassNames()),
            _("aria-label", i.ariaLabel)("aria-hidden", i.ariaHidden)(
              "role",
              i.role
            ));
      },
      encapsulation: 2,
    });
  }
  return n;
})();
var qe = (() => {
  class n extends ie {
    static ɵfac = (() => {
      let e;
      return function (i) {
        return (e || (e = Y(n)))(i || n);
      };
    })();
    static ɵcmp = h({
      type: n,
      selectors: [["ChevronLeftIcon"]],
      standalone: !0,
      features: [Z, y],
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
      template: function (t, i) {
        t & 1 && (Q(), r(0, "svg", 0), g(1, "path", 1), l()),
          t & 2 &&
            (A(i.getClassNames()),
            _("aria-label", i.ariaLabel)("aria-hidden", i.ariaHidden)(
              "role",
              i.role
            ));
      },
      encapsulation: 2,
    });
  }
  return n;
})();
var ce = (() => {
  class n extends ie {
    static ɵfac = (() => {
      let e;
      return function (i) {
        return (e || (e = Y(n)))(i || n);
      };
    })();
    static ɵcmp = h({
      type: n,
      selectors: [["ChevronRightIcon"]],
      standalone: !0,
      features: [Z, y],
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
      template: function (t, i) {
        t & 1 && (Q(), r(0, "svg", 0), g(1, "path", 1), l()),
          t & 2 &&
            (A(i.getClassNames()),
            _("aria-label", i.ariaLabel)("aria-hidden", i.ariaHidden)(
              "role",
              i.role
            ));
      },
      encapsulation: 2,
    });
  }
  return n;
})();
var Ge = (() => {
  class n extends ie {
    static ɵfac = (() => {
      let e;
      return function (i) {
        return (e || (e = Y(n)))(i || n);
      };
    })();
    static ɵcmp = h({
      type: n,
      selectors: [["ChevronUpIcon"]],
      standalone: !0,
      features: [Z, y],
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
      template: function (t, i) {
        t & 1 && (Q(), r(0, "svg", 0), g(1, "path", 1), l()),
          t & 2 &&
            (A(i.getClassNames()),
            _("aria-label", i.ariaLabel)("aria-hidden", i.ariaHidden)(
              "role",
              i.role
            ));
      },
      encapsulation: 2,
    });
  }
  return n;
})();
var C = (() => {
  class n {
    static zindex = 1e3;
    static calculatedScrollbarWidth = null;
    static calculatedScrollbarHeight = null;
    static browser;
    static addClass(e, t) {
      e && t && (e.classList ? e.classList.add(t) : (e.className += " " + t));
    }
    static addMultipleClasses(e, t) {
      if (e && t)
        if (e.classList) {
          let i = t.trim().split(" ");
          for (let a = 0; a < i.length; a++) e.classList.add(i[a]);
        } else {
          let i = t.split(" ");
          for (let a = 0; a < i.length; a++) e.className += " " + i[a];
        }
    }
    static removeClass(e, t) {
      e &&
        t &&
        (e.classList
          ? e.classList.remove(t)
          : (e.className = e.className.replace(
              new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"),
              " "
            )));
    }
    static removeMultipleClasses(e, t) {
      e &&
        t &&
        [t]
          .flat()
          .filter(Boolean)
          .forEach((i) => i.split(" ").forEach((a) => this.removeClass(e, a)));
    }
    static hasClass(e, t) {
      return e && t
        ? e.classList
          ? e.classList.contains(t)
          : new RegExp("(^| )" + t + "( |$)", "gi").test(e.className)
        : !1;
    }
    static siblings(e) {
      return Array.prototype.filter.call(e.parentNode.children, function (t) {
        return t !== e;
      });
    }
    static find(e, t) {
      return Array.from(e.querySelectorAll(t));
    }
    static findSingle(e, t) {
      return this.isElement(e) ? e.querySelector(t) : null;
    }
    static index(e) {
      let t = e.parentNode.childNodes,
        i = 0;
      for (var a = 0; a < t.length; a++) {
        if (t[a] == e) return i;
        t[a].nodeType == 1 && i++;
      }
      return -1;
    }
    static indexWithinGroup(e, t) {
      let i = e.parentNode ? e.parentNode.childNodes : [],
        a = 0;
      for (var s = 0; s < i.length; s++) {
        if (i[s] == e) return a;
        i[s].attributes && i[s].attributes[t] && i[s].nodeType == 1 && a++;
      }
      return -1;
    }
    static appendOverlay(e, t, i = "self") {
      i !== "self" && e && t && this.appendChild(e, t);
    }
    static alignOverlay(e, t, i = "self", a = !0) {
      e &&
        t &&
        (a && (e.style.minWidth = `${n.getOuterWidth(t)}px`),
        i === "self"
          ? this.relativePosition(e, t)
          : this.absolutePosition(e, t));
    }
    static relativePosition(e, t, i = !0) {
      let a = (_e) => {
          if (_e)
            return getComputedStyle(_e).getPropertyValue("position") ===
              "relative"
              ? _e
              : a(_e.parentElement);
        },
        s = e.offsetParent
          ? { width: e.offsetWidth, height: e.offsetHeight }
          : this.getHiddenElementDimensions(e),
        p = t.offsetHeight ?? t.getBoundingClientRect().height,
        f = t.getBoundingClientRect(),
        I = this.getWindowScrollTop(),
        b = this.getWindowScrollLeft(),
        E = this.getViewport(),
        L = a(e)?.getBoundingClientRect() || { top: -1 * I, left: -1 * b },
        M,
        z;
      f.top + p + s.height > E.height
        ? ((M = f.top - L.top - s.height),
          (e.style.transformOrigin = "bottom"),
          f.top + M < 0 && (M = -1 * f.top))
        : ((M = p + f.top - L.top), (e.style.transformOrigin = "top"));
      let ze = f.left + s.width - E.width,
        Ft = f.left - L.left;
      s.width > E.width
        ? (z = (f.left - L.left) * -1)
        : ze > 0
        ? (z = Ft - ze)
        : (z = f.left - L.left),
        (e.style.top = M + "px"),
        (e.style.left = z + "px"),
        i &&
          (e.style.marginTop =
            origin === "bottom"
              ? "calc(var(--p-anchor-gutter) * -1)"
              : "calc(var(--p-anchor-gutter))");
    }
    static absolutePosition(e, t, i = !0) {
      let a = e.offsetParent
          ? { width: e.offsetWidth, height: e.offsetHeight }
          : this.getHiddenElementDimensions(e),
        s = a.height,
        p = a.width,
        f = t.offsetHeight ?? t.getBoundingClientRect().height,
        I = t.offsetWidth ?? t.getBoundingClientRect().width,
        b = t.getBoundingClientRect(),
        E = this.getWindowScrollTop(),
        T = this.getWindowScrollLeft(),
        L = this.getViewport(),
        M,
        z;
      b.top + f + s > L.height
        ? ((M = b.top + E - s),
          (e.style.transformOrigin = "bottom"),
          M < 0 && (M = E))
        : ((M = f + b.top + E), (e.style.transformOrigin = "top")),
        b.left + p > L.width
          ? (z = Math.max(0, b.left + T + I - p))
          : (z = b.left + T),
        (e.style.top = M + "px"),
        (e.style.left = z + "px"),
        i &&
          (e.style.marginTop =
            origin === "bottom"
              ? "calc(var(--p-anchor-gutter) * -1)"
              : "calc(var(--p-anchor-gutter))");
    }
    static getParents(e, t = []) {
      return e.parentNode === null
        ? t
        : this.getParents(e.parentNode, t.concat([e.parentNode]));
    }
    static getScrollableParents(e) {
      let t = [];
      if (e) {
        let i = this.getParents(e),
          a = /(auto|scroll)/,
          s = (p) => {
            let f = window.getComputedStyle(p, null);
            return (
              a.test(f.getPropertyValue("overflow")) ||
              a.test(f.getPropertyValue("overflowX")) ||
              a.test(f.getPropertyValue("overflowY"))
            );
          };
        for (let p of i) {
          let f = p.nodeType === 1 && p.dataset.scrollselectors;
          if (f) {
            let I = f.split(",");
            for (let b of I) {
              let E = this.findSingle(p, b);
              E && s(E) && t.push(E);
            }
          }
          p.nodeType !== 9 && s(p) && t.push(p);
        }
      }
      return t;
    }
    static getHiddenElementOuterHeight(e) {
      (e.style.visibility = "hidden"), (e.style.display = "block");
      let t = e.offsetHeight;
      return (e.style.display = "none"), (e.style.visibility = "visible"), t;
    }
    static getHiddenElementOuterWidth(e) {
      (e.style.visibility = "hidden"), (e.style.display = "block");
      let t = e.offsetWidth;
      return (e.style.display = "none"), (e.style.visibility = "visible"), t;
    }
    static getHiddenElementDimensions(e) {
      let t = {};
      return (
        (e.style.visibility = "hidden"),
        (e.style.display = "block"),
        (t.width = e.offsetWidth),
        (t.height = e.offsetHeight),
        (e.style.display = "none"),
        (e.style.visibility = "visible"),
        t
      );
    }
    static scrollInView(e, t) {
      let i = getComputedStyle(e).getPropertyValue("borderTopWidth"),
        a = i ? parseFloat(i) : 0,
        s = getComputedStyle(e).getPropertyValue("paddingTop"),
        p = s ? parseFloat(s) : 0,
        f = e.getBoundingClientRect(),
        b =
          t.getBoundingClientRect().top +
          document.body.scrollTop -
          (f.top + document.body.scrollTop) -
          a -
          p,
        E = e.scrollTop,
        T = e.clientHeight,
        L = this.getOuterHeight(t);
      b < 0
        ? (e.scrollTop = E + b)
        : b + L > T && (e.scrollTop = E + b - T + L);
    }
    static fadeIn(e, t) {
      e.style.opacity = 0;
      let i = +new Date(),
        a = 0,
        s = function () {
          (a =
            +e.style.opacity.replace(",", ".") +
            (new Date().getTime() - i) / t),
            (e.style.opacity = a),
            (i = +new Date()),
            +a < 1 &&
              ((window.requestAnimationFrame && requestAnimationFrame(s)) ||
                setTimeout(s, 16));
        };
      s();
    }
    static fadeOut(e, t) {
      var i = 1,
        a = 50,
        s = t,
        p = a / s;
      let f = setInterval(() => {
        (i = i - p),
          i <= 0 && ((i = 0), clearInterval(f)),
          (e.style.opacity = i);
      }, a);
    }
    static getWindowScrollTop() {
      let e = document.documentElement;
      return (window.pageYOffset || e.scrollTop) - (e.clientTop || 0);
    }
    static getWindowScrollLeft() {
      let e = document.documentElement;
      return (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0);
    }
    static matches(e, t) {
      var i = Element.prototype,
        a =
          i.matches ||
          i.webkitMatchesSelector ||
          i.mozMatchesSelector ||
          i.msMatchesSelector ||
          function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
          };
      return a.call(e, t);
    }
    static getOuterWidth(e, t) {
      let i = e.offsetWidth;
      if (t) {
        let a = getComputedStyle(e);
        i += parseFloat(a.marginLeft) + parseFloat(a.marginRight);
      }
      return i;
    }
    static getHorizontalPadding(e) {
      let t = getComputedStyle(e);
      return parseFloat(t.paddingLeft) + parseFloat(t.paddingRight);
    }
    static getHorizontalMargin(e) {
      let t = getComputedStyle(e);
      return parseFloat(t.marginLeft) + parseFloat(t.marginRight);
    }
    static innerWidth(e) {
      let t = e.offsetWidth,
        i = getComputedStyle(e);
      return (t += parseFloat(i.paddingLeft) + parseFloat(i.paddingRight)), t;
    }
    static width(e) {
      let t = e.offsetWidth,
        i = getComputedStyle(e);
      return (t -= parseFloat(i.paddingLeft) + parseFloat(i.paddingRight)), t;
    }
    static getInnerHeight(e) {
      let t = e.offsetHeight,
        i = getComputedStyle(e);
      return (t += parseFloat(i.paddingTop) + parseFloat(i.paddingBottom)), t;
    }
    static getOuterHeight(e, t) {
      let i = e.offsetHeight;
      if (t) {
        let a = getComputedStyle(e);
        i += parseFloat(a.marginTop) + parseFloat(a.marginBottom);
      }
      return i;
    }
    static getHeight(e) {
      let t = e.offsetHeight,
        i = getComputedStyle(e);
      return (
        (t -=
          parseFloat(i.paddingTop) +
          parseFloat(i.paddingBottom) +
          parseFloat(i.borderTopWidth) +
          parseFloat(i.borderBottomWidth)),
        t
      );
    }
    static getWidth(e) {
      let t = e.offsetWidth,
        i = getComputedStyle(e);
      return (
        (t -=
          parseFloat(i.paddingLeft) +
          parseFloat(i.paddingRight) +
          parseFloat(i.borderLeftWidth) +
          parseFloat(i.borderRightWidth)),
        t
      );
    }
    static getViewport() {
      let e = window,
        t = document,
        i = t.documentElement,
        a = t.getElementsByTagName("body")[0],
        s = e.innerWidth || i.clientWidth || a.clientWidth,
        p = e.innerHeight || i.clientHeight || a.clientHeight;
      return { width: s, height: p };
    }
    static getOffset(e) {
      var t = e.getBoundingClientRect();
      return {
        top:
          t.top +
          (window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0),
        left:
          t.left +
          (window.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft ||
            0),
      };
    }
    static replaceElementWith(e, t) {
      let i = e.parentNode;
      if (!i) throw "Can't replace element";
      return i.replaceChild(t, e);
    }
    static getUserAgent() {
      if (navigator && this.isClient()) return navigator.userAgent;
    }
    static isIE() {
      var e = window.navigator.userAgent,
        t = e.indexOf("MSIE ");
      if (t > 0) return !0;
      var i = e.indexOf("Trident/");
      if (i > 0) {
        var a = e.indexOf("rv:");
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
    static appendChild(e, t) {
      if (this.isElement(t)) t.appendChild(e);
      else if (t && t.el && t.el.nativeElement)
        t.el.nativeElement.appendChild(e);
      else throw "Cannot append " + t + " to " + e;
    }
    static removeChild(e, t) {
      if (this.isElement(t)) t.removeChild(e);
      else if (t.el && t.el.nativeElement) t.el.nativeElement.removeChild(e);
      else throw "Cannot remove " + e + " from " + t;
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
        let t = getComputedStyle(e);
        return (
          e.offsetWidth -
          e.clientWidth -
          parseFloat(t.borderLeftWidth) -
          parseFloat(t.borderRightWidth)
        );
      } else {
        if (this.calculatedScrollbarWidth !== null)
          return this.calculatedScrollbarWidth;
        let t = document.createElement("div");
        (t.className = "p-scrollbar-measure"), document.body.appendChild(t);
        let i = t.offsetWidth - t.clientWidth;
        return (
          document.body.removeChild(t), (this.calculatedScrollbarWidth = i), i
        );
      }
    }
    static calculateScrollbarHeight() {
      if (this.calculatedScrollbarHeight !== null)
        return this.calculatedScrollbarHeight;
      let e = document.createElement("div");
      (e.className = "p-scrollbar-measure"), document.body.appendChild(e);
      let t = e.offsetHeight - e.clientHeight;
      return (
        document.body.removeChild(e), (this.calculatedScrollbarWidth = t), t
      );
    }
    static invokeElementMethod(e, t, i) {
      e[t].apply(e, i);
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
        t =
          /(chrome)[ \/]([\w.]+)/.exec(e) ||
          /(webkit)[ \/]([\w.]+)/.exec(e) ||
          /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) ||
          /(msie) ([\w.]+)/.exec(e) ||
          (e.indexOf("compatible") < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)) ||
          [];
      return { browser: t[1] || "", version: t[2] || "0" };
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
    static focus(e, t) {
      e && document.activeElement !== e && e.focus(t);
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
    static getFocusableElements(e, t = "") {
      let i = this.find(e, this.getFocusableSelectorString(t)),
        a = [];
      for (let s of i) {
        let p = getComputedStyle(s);
        this.isVisible(s) &&
          p.display != "none" &&
          p.visibility != "hidden" &&
          a.push(s);
      }
      return a;
    }
    static getFocusableElement(e, t = "") {
      let i = this.findSingle(e, this.getFocusableSelectorString(t));
      if (i) {
        let a = getComputedStyle(i);
        if (
          this.isVisible(i) &&
          a.display != "none" &&
          a.visibility != "hidden"
        )
          return i;
      }
      return null;
    }
    static getFirstFocusableElement(e, t = "") {
      let i = this.getFocusableElements(e, t);
      return i.length > 0 ? i[0] : null;
    }
    static getLastFocusableElement(e, t) {
      let i = this.getFocusableElements(e, t);
      return i.length > 0 ? i[i.length - 1] : null;
    }
    static getNextFocusableElement(e, t = !1) {
      let i = n.getFocusableElements(e),
        a = 0;
      if (i && i.length > 0) {
        let s = i.indexOf(i[0].ownerDocument.activeElement);
        t
          ? s == -1 || s === 0
            ? (a = i.length - 1)
            : (a = s - 1)
          : s != -1 && s !== i.length - 1 && (a = s + 1);
      }
      return i[a];
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
    static getTargetElement(e, t) {
      if (!e) return null;
      switch (e) {
        case "document":
          return document;
        case "window":
          return window;
        case "@next":
          return t?.nextElementSibling;
        case "@prev":
          return t?.previousElementSibling;
        case "@parent":
          return t?.parentElement;
        case "@grandparent":
          return t?.parentElement.parentElement;
        default:
          let i = typeof e;
          if (i === "string") return document.querySelector(e);
          if (i === "object" && e.hasOwnProperty("nativeElement"))
            return this.isExist(e.nativeElement) ? e.nativeElement : void 0;
          let s = ((p) => !!(p && p.constructor && p.call && p.apply))(e)
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
    static getAttribute(e, t) {
      if (e) {
        let i = e.getAttribute(t);
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
    static createElement(e, t = {}, ...i) {
      if (e) {
        let a = document.createElement(e);
        return this.setAttributes(a, t), a.append(...i), a;
      }
    }
    static setAttribute(e, t = "", i) {
      this.isElement(e) && i !== null && i !== void 0 && e.setAttribute(t, i);
    }
    static setAttributes(e, t = {}) {
      if (this.isElement(e)) {
        let i = (a, s) => {
          let p = e?.$attrs?.[a] ? [e?.$attrs?.[a]] : [];
          return [s].flat().reduce((f, I) => {
            if (I != null) {
              let b = typeof I;
              if (b === "string" || b === "number") f.push(I);
              else if (b === "object") {
                let E = Array.isArray(I)
                  ? i(a, I)
                  : Object.entries(I).map(([T, L]) =>
                      a === "style" && (L || L === 0)
                        ? `${T.replace(
                            /([a-z])([A-Z])/g,
                            "$1-$2"
                          ).toLowerCase()}:${L}`
                        : L
                        ? T
                        : void 0
                    );
                f = E.length ? f.concat(E.filter((T) => !!T)) : f;
              }
            }
            return f;
          }, p);
        };
        Object.entries(t).forEach(([a, s]) => {
          if (s != null) {
            let p = a.match(/^on(.+)/);
            p
              ? e.addEventListener(p[1].toLowerCase(), s)
              : a === "pBind"
              ? this.setAttributes(e, s)
              : ((s =
                  a === "class"
                    ? [...new Set(i("class", s))].join(" ").trim()
                    : a === "style"
                    ? i("style", s).join(";").trim()
                    : s),
                (e.$attrs = e.$attrs || {}) && (e.$attrs[a] = s),
                e.setAttribute(a, s));
          }
        });
      }
    }
    static isFocusableElement(e, t = "") {
      return this.isElement(e)
        ? e.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`)
        : !1;
    }
  }
  return n;
})();
var Ct = (() => {
    class n {
      document;
      platformId;
      renderer;
      el;
      zone;
      config;
      constructor(e, t, i, a, s, p) {
        (this.document = e),
          (this.platformId = t),
          (this.renderer = i),
          (this.el = a),
          (this.zone = s),
          (this.config = p);
      }
      animationListener;
      mouseDownListener;
      timeout;
      ngAfterViewInit() {
        te(this.platformId) &&
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
        let t = this.getInk();
        if (
          !t ||
          this.document.defaultView?.getComputedStyle(t, null).display ===
            "none"
        )
          return;
        if (
          (C.removeClass(t, "p-ink-active"), !C.getHeight(t) && !C.getWidth(t))
        ) {
          let p = Math.max(
            C.getOuterWidth(this.el.nativeElement),
            C.getOuterHeight(this.el.nativeElement)
          );
          (t.style.height = p + "px"), (t.style.width = p + "px");
        }
        let i = C.getOffset(this.el.nativeElement),
          a =
            e.pageX - i.left + this.document.body.scrollTop - C.getWidth(t) / 2,
          s =
            e.pageY -
            i.top +
            this.document.body.scrollLeft -
            C.getHeight(t) / 2;
        this.renderer.setStyle(t, "top", s + "px"),
          this.renderer.setStyle(t, "left", a + "px"),
          C.addClass(t, "p-ink-active"),
          (this.timeout = setTimeout(() => {
            let p = this.getInk();
            p && C.removeClass(p, "p-ink-active");
          }, 401));
      }
      getInk() {
        let e = this.el.nativeElement.children;
        for (let t = 0; t < e.length; t++)
          if (
            typeof e[t].className == "string" &&
            e[t].className.indexOf("p-ink") !== -1
          )
            return e[t];
        return null;
      }
      resetInk() {
        let e = this.getInk();
        e && C.removeClass(e, "p-ink-active");
      }
      onAnimationEnd(e) {
        this.timeout && clearTimeout(this.timeout),
          C.removeClass(e.currentTarget, "p-ink-active");
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
          C.removeElement(e));
      }
      ngOnDestroy() {
        this.config && this.config.ripple && this.remove();
      }
      static ɵfac = function (t) {
        return new (t || n)(S(Ae), S(Ee), S(Se), S(ne), S(Ie), S(Fe, 8));
      };
      static ɵdir = be({
        type: n,
        selectors: [["", "pRipple", ""]],
        hostAttrs: [1, "p-ripple", "p-element"],
        standalone: !0,
      });
    }
    return n;
  })(),
  yt = (() => {
    class n {
      static ɵfac = function (t) {
        return new (t || n)();
      };
      static ɵmod = $({ type: n });
      static ɵinj = j({});
    }
    return n;
  })();
var Ht = ["itemsContainer"],
  kt = ["indicatorContent"],
  Bt = [[["p-header"]], [["p-footer"]]],
  Vt = ["p-header", "p-footer"],
  Wt = (n, o) => ({
    "p-carousel p-component": !0,
    "p-carousel-vertical": n,
    "p-carousel-horizontal": o,
  }),
  Ut = (n) => ({ height: n }),
  qt = (n) => ({ "p-carousel-prev p-link": !0, "p-disabled": n }),
  vt = (n, o, e) => ({
    "p-carousel-item p-carousel-item-cloned": !0,
    "p-carousel-item-active": n,
    "p-carousel-item-start": o,
    "p-carousel-item-end": e,
  }),
  Ke = (n) => ({ $implicit: n }),
  Gt = (n, o, e) => ({
    "p-carousel-item": !0,
    "p-carousel-item-active": n,
    "p-carousel-item-start": o,
    "p-carousel-item-end": e,
  }),
  Kt = (n) => ({ "p-carousel-next p-link": !0, "p-disabled": n }),
  zt = (n) => ({ "p-carousel-indicator": !0, "p-highlight": n });
function jt(n, o) {
  n & 1 && G(0);
}
function $t(n, o) {
  if (
    (n & 1 && (r(0, "div", 12), N(1), m(2, jt, 1, 0, "ng-container", 13), l()),
    n & 2)
  ) {
    let e = v();
    u(2), c("ngTemplateOutlet", e.headerTemplate);
  }
}
function Qt(n, o) {
  n & 1 && g(0, "ChevronLeftIcon", 18),
    n & 2 && c("styleClass", "carousel-prev-icon");
}
function Yt(n, o) {
  n & 1 && g(0, "ChevronUpIcon", 18),
    n & 2 && c("styleClass", "carousel-prev-icon");
}
function Zt(n, o) {
  if (
    (n & 1 &&
      (X(0),
      m(1, Qt, 1, 1, "ChevronLeftIcon", 17)(2, Yt, 1, 1, "ChevronUpIcon", 17),
      J()),
    n & 2)
  ) {
    let e = v(2);
    u(), c("ngIf", !e.isVertical()), u(), c("ngIf", e.isVertical());
  }
}
function Xt(n, o) {}
function Jt(n, o) {
  n & 1 && m(0, Xt, 0, 0, "ng-template");
}
function ei(n, o) {
  if ((n & 1 && (r(0, "span", 19), m(1, Jt, 1, 0, null, 13), l()), n & 2)) {
    let e = v(2);
    u(), c("ngTemplateOutlet", e.previousIconTemplate);
  }
}
function ti(n, o) {
  if (n & 1) {
    let e = re();
    r(0, "button", 14),
      x("click", function (i) {
        U(e);
        let a = v();
        return q(a.navBackward(i));
      }),
      m(1, Zt, 3, 2, "ng-container", 15)(2, ei, 2, 1, "span", 16),
      l();
  }
  if (n & 2) {
    let e = v();
    c("ngClass", D(5, qt, e.isBackwardNavDisabled()))(
      "disabled",
      e.isBackwardNavDisabled()
    ),
      _("aria-label", e.ariaPrevButtonLabel()),
      u(),
      c("ngIf", !e.previousIconTemplate),
      u(),
      c("ngIf", e.previousIconTemplate);
  }
}
function ii(n, o) {
  n & 1 && G(0);
}
function ni(n, o) {
  if (
    (n & 1 && (r(0, "div", 4), m(1, ii, 1, 0, "ng-container", 20), l()), n & 2)
  ) {
    let e = o.$implicit,
      t = o.index,
      i = v();
    c(
      "ngClass",
      Te(
        6,
        vt,
        i.totalShiftedItems * -1 === i.value.length,
        t === 0,
        i.clonedItemsForStarting.length - 1 === t
      )
    ),
      _("aria-hidden", i.totalShiftedItems * -1 !== i.value.length)(
        "aria-label",
        i.ariaSlideNumber(t)
      )("aria-roledescription", i.ariaSlideLabel()),
      u(),
      c("ngTemplateOutlet", i.itemTemplate)(
        "ngTemplateOutletContext",
        D(10, Ke, e)
      );
  }
}
function ai(n, o) {
  n & 1 && G(0);
}
function oi(n, o) {
  if (
    (n & 1 && (r(0, "div", 4), m(1, ai, 1, 0, "ng-container", 20), l()), n & 2)
  ) {
    let e = o.$implicit,
      t = o.index,
      i = v();
    c(
      "ngClass",
      Te(
        6,
        Gt,
        i.firstIndex() <= t && i.lastIndex() >= t,
        i.firstIndex() === t,
        i.lastIndex() === t
      )
    ),
      _("aria-hidden", i.totalShiftedItems * -1 !== i.value.length)(
        "aria-label",
        i.ariaSlideNumber(t)
      )("aria-roledescription", i.ariaSlideLabel()),
      u(),
      c("ngTemplateOutlet", i.itemTemplate)(
        "ngTemplateOutletContext",
        D(10, Ke, e)
      );
  }
}
function si(n, o) {
  n & 1 && G(0);
}
function ri(n, o) {
  if (
    (n & 1 && (r(0, "div", 4), m(1, si, 1, 0, "ng-container", 20), l()), n & 2)
  ) {
    let e = o.$implicit,
      t = o.index,
      i = v();
    c(
      "ngClass",
      Te(
        3,
        vt,
        i.totalShiftedItems * -1 === i.numVisible,
        t === 0,
        i.clonedItemsForFinishing.length - 1 === t
      )
    ),
      u(),
      c("ngTemplateOutlet", i.itemTemplate)(
        "ngTemplateOutletContext",
        D(7, Ke, e)
      );
  }
}
function li(n, o) {
  n & 1 && g(0, "ChevronRightIcon", 18),
    n & 2 && c("styleClass", "carousel-prev-icon");
}
function ci(n, o) {
  n & 1 && g(0, "ChevronDownIcon", 18),
    n & 2 && c("styleClass", "carousel-prev-icon");
}
function pi(n, o) {
  if (
    (n & 1 &&
      (X(0),
      m(1, li, 1, 1, "ChevronRightIcon", 17)(
        2,
        ci,
        1,
        1,
        "ChevronDownIcon",
        17
      ),
      J()),
    n & 2)
  ) {
    let e = v(2);
    u(), c("ngIf", !e.isVertical()), u(), c("ngIf", e.isVertical());
  }
}
function di(n, o) {}
function ui(n, o) {
  n & 1 && m(0, di, 0, 0, "ng-template");
}
function mi(n, o) {
  if ((n & 1 && (r(0, "span", 19), m(1, ui, 1, 0, null, 13), l()), n & 2)) {
    let e = v(2);
    u(), c("ngTemplateOutlet", e.nextIconTemplate);
  }
}
function fi(n, o) {
  if (n & 1) {
    let e = re();
    r(0, "button", 14),
      x("click", function (i) {
        U(e);
        let a = v();
        return q(a.navForward(i));
      }),
      m(1, pi, 3, 2, "ng-container", 15)(2, mi, 2, 1, "span", 16),
      l();
  }
  if (n & 2) {
    let e = v();
    c("ngClass", D(5, Kt, e.isForwardNavDisabled()))(
      "disabled",
      e.isForwardNavDisabled()
    ),
      _("aria-label", e.ariaNextButtonLabel()),
      u(),
      c("ngIf", !e.nextIconTemplate),
      u(),
      c("ngIf", e.nextIconTemplate);
  }
}
function hi(n, o) {
  if (n & 1) {
    let e = re();
    r(0, "li", 4)(1, "button", 22),
      x("click", function (i) {
        let a = U(e).index,
          s = v(2);
        return q(s.onDotClick(i, a));
      }),
      l()();
  }
  if (n & 2) {
    let e = o.index,
      t = v(2);
    c("ngClass", D(9, zt, t._page === e)),
      _("data-pc-section", "indicator"),
      u(),
      A(t.indicatorStyleClass),
      c("ngClass", "p-link")("ngStyle", t.indicatorStyle)(
        "tabindex",
        t._page === e ? 0 : -1
      ),
      _("aria-label", t.ariaPageLabel(e + 1))(
        "aria-current",
        t._page === e ? "page" : void 0
      );
  }
}
function gi(n, o) {
  if (n & 1) {
    let e = re();
    r(0, "ul", 21, 1),
      x("keydown", function (i) {
        U(e);
        let a = v();
        return q(a.onIndicatorKeydown(i));
      }),
      m(2, hi, 2, 11, "li", 9),
      l();
  }
  if (n & 2) {
    let e = v();
    A(e.indicatorsContentClass),
      c("ngClass", "p-carousel-indicators p-reset")(
        "ngStyle",
        e.indicatorsContentStyle
      ),
      u(2),
      c("ngForOf", e.totalDotsArray());
  }
}
function Ci(n, o) {
  n & 1 && G(0);
}
function yi(n, o) {
  if (
    (n & 1 &&
      (r(0, "div", 23), N(1, 1), m(2, Ci, 1, 0, "ng-container", 13), l()),
    n & 2)
  ) {
    let e = v();
    u(2), c("ngTemplateOutlet", e.footerTemplate);
  }
}
var _t = (() => {
    class n {
      el;
      zone;
      cd;
      renderer;
      document;
      platformId;
      config;
      updateSlideAccessibility(e, t) {
        e.querySelectorAll(
          "a, button, input, select, textarea, [tabindex]"
        ).forEach((a) => {
          a.tabIndex = t ? 0 : -1;
        });
      }
      updateCarouselItemsAccessibility() {
        this.el.nativeElement
          .querySelectorAll(".p-carousel-item")
          .forEach((t, i) => {
            let a = i === this._page;
            t.setAttribute("aria-hidden", a ? "false" : "true"),
              this.updateSlideAccessibility(t, a);
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
      onPage = new ae();
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
      constructor(e, t, i, a, s, p, f) {
        (this.el = e),
          (this.zone = t),
          (this.cd = i),
          (this.renderer = a),
          (this.document = s),
          (this.platformId = p),
          (this.config = f),
          (this.totalShiftedItems = this.page * this.numScroll * -1),
          (this.window = this.document.defaultView);
      }
      ngOnChanges(e) {
        te(this.platformId) &&
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
        (this.id = Re()),
          te(this.platformId) &&
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
        if (te(this.platformId)) {
          let e = this.isCircular(),
            t = this.totalShiftedItems;
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
              (t = i * this._numScroll * -1),
              e && (t -= this._numVisible),
              i === this.totalDots() - 1 && this.remainingItems > 0
                ? ((t += -1 * this.remainingItems + this._numScroll),
                  (this.isRemainingItemsAdded = !0))
                : (this.isRemainingItemsAdded = !1),
              t !== this.totalShiftedItems && (this.totalShiftedItems = t),
              (this._oldNumScroll = this._numScroll),
              (this.prevState.numScroll = this._numScroll),
              (this.prevState.numVisible = this._numVisible),
              (this.prevState.value = [...this._value]),
              this.totalDots() > 0 &&
                this.itemsContainer.nativeElement &&
                (this.itemsContainer.nativeElement.style.transform =
                  this.isVertical()
                    ? `translate3d(0, ${t * (100 / this._numVisible)}%, 0)`
                    : `translate3d(${t * (100 / this._numVisible)}%, 0, 0)`),
              (this.isCreated = !0),
              this.autoplayInterval &&
                this.isAutoplay() &&
                this.startAutoplay();
          }
          e &&
            (this.page === 0
              ? (t = -1 * this._numVisible)
              : t === 0 &&
                ((t = -1 * this.value.length),
                this.remainingItems > 0 && (this.isRemainingItemsAdded = !0)),
            t !== this.totalShiftedItems && (this.totalShiftedItems = t));
        }
      }
      createStyle() {
        this.carouselStyle ||
          ((this.carouselStyle = this.renderer.createElement("style")),
          (this.carouselStyle.type = "text/css"),
          C.setAttribute(
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
          this.responsiveOptions.sort((t, i) => {
            let a = t.breakpoint,
              s = i.breakpoint,
              p = null;
            return (
              a == null && s != null
                ? (p = -1)
                : a != null && s == null
                ? (p = 1)
                : a == null && s == null
                ? (p = 0)
                : typeof a == "string" && typeof s == "string"
                ? (p = a.localeCompare(s, void 0, { numeric: !0 }))
                : (p = a < s ? -1 : a > s ? 1 : 0),
              -1 * p
            );
          });
          for (let t = 0; t < this.responsiveOptions.length; t++) {
            let i = this.responsiveOptions[t];
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
            let t = window.innerWidth;
            for (let i = 0; i < this.responsiveOptions.length; i++) {
              let a = this.responsiveOptions[i];
              parseInt(a.breakpoint, 10) >= t && (e = a);
            }
          }
          if (this._numScroll !== e.numScroll) {
            let t = this._page;
            t = Math.floor((t * this._numScroll) / e.numScroll);
            let i = e.numScroll * this.page * -1;
            this.isCircular() && (i -= e.numVisible),
              (this.totalShiftedItems = i),
              (this._numScroll = e.numScroll),
              (this._page = t),
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
      navForward(e, t) {
        (this.isCircular() || this._page < this.totalDots() - 1) &&
          this.step(-1, t),
          this.autoplayInterval && this.stopAutoplay(),
          e && e.cancelable && e.preventDefault();
      }
      navBackward(e, t) {
        (this.isCircular() || this._page !== 0) && this.step(1, t),
          this.autoplayInterval && this.stopAutoplay(),
          e && e.cancelable && e.preventDefault();
      }
      onDotClick(e, t) {
        let i = this._page;
        this.autoplayInterval && this.stopAutoplay(),
          t > i ? this.navForward(e, t) : t < i && this.navBackward(e, t);
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
            ...C.find(
              this.indicatorContent.nativeElement,
              '[data-pc-section="indicator"]'
            ),
          ],
          t = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(
          t,
          t + 1 === e.length ? e.length - 1 : t + 1
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
            ...C.find(
              this.indicatorContent.nativeElement,
              '[data-pc-section="indicator"]r'
            ),
          ],
          t = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(t, e.length - 1);
      }
      onTabKey() {
        let e = [
            ...C.find(
              this.indicatorContent.nativeElement,
              '[data-pc-section="indicator"]'
            ),
          ],
          t = e.findIndex((s) => C.getAttribute(s, "data-p-highlight") === !0),
          i = C.findSingle(
            this.indicatorContent.nativeElement,
            '[data-pc-section="indicator"] > button[tabindex="0"]'
          ),
          a = e.findIndex((s) => s === i.parentElement);
        (e[a].children[0].tabIndex = "-1"), (e[t].children[0].tabIndex = "0");
      }
      findFocusedIndicatorIndex() {
        let e = [
            ...C.find(
              this.indicatorContent.nativeElement,
              '[data-pc-section="indicator"]'
            ),
          ],
          t = C.findSingle(
            this.indicatorContent.nativeElement,
            '[data-pc-section="indicator"] > button[tabindex="0"]'
          );
        return e.findIndex((i) => i === t.parentElement);
      }
      changedFocusedIndicator(e, t) {
        let i = [
          ...C.find(
            this.indicatorContent.nativeElement,
            '[data-pc-section="indicator"]'
          ),
        ];
        (i[e].children[0].tabIndex = "-1"),
          (i[t].children[0].tabIndex = "0"),
          i[t].children[0].focus();
      }
      step(e, t) {
        let i = this.totalShiftedItems,
          a = this.isCircular();
        if (t != null)
          (i = this._numScroll * t * -1),
            a && (i -= this._numVisible),
            (this.isRemainingItemsAdded = !1);
        else {
          (i += this._numScroll * e),
            this.isRemainingItemsAdded &&
              ((i += this.remainingItems - this._numScroll * e),
              (this.isRemainingItemsAdded = !1));
          let s = a ? i + this._numVisible : i;
          t = Math.abs(Math.floor(s / this._numScroll));
        }
        a && this.page === this.totalDots() - 1 && e === -1
          ? ((i = -1 * (this.value.length + this._numVisible)), (t = 0))
          : a && this.page === 0 && e === 1
          ? ((i = 0), (t = this.totalDots() - 1))
          : t === this.totalDots() - 1 &&
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
          (this._page = t),
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
        let t = e.changedTouches[0];
        this.startPos = { x: t.pageX, y: t.pageY };
      }
      onTouchMove(e) {
        e.cancelable && e.preventDefault();
      }
      onTouchEnd(e) {
        let t = e.changedTouches[0];
        this.isVertical()
          ? this.changePageOnTouch(e, t.pageY - this.startPos.y)
          : this.changePageOnTouch(e, t.pageX - this.startPos.x);
      }
      changePageOnTouch(e, t) {
        Math.abs(t) > this.swipeThreshold &&
          (t < 0 ? this.navForward(e) : this.navBackward(e));
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
        te(this.platformId) &&
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
        te(this.platformId) &&
          this.documentResizeListener &&
          (this.documentResizeListener(), (this.documentResizeListener = null));
      }
      ngOnDestroy() {
        this.responsiveOptions && this.unbindDocumentListeners(),
          this.autoplayInterval && this.stopAutoplay();
      }
      static ɵfac = function (t) {
        return new (t || n)(S(ne), S(Ie), S(de), S(Se), S(Ae), S(Ee), S(Fe));
      };
      static ɵcmp = h({
        type: n,
        selectors: [["p-carousel"]],
        contentQueries: function (t, i, a) {
          if ((t & 1 && (ee(a, De, 5), ee(a, gt, 5), ee(a, W, 4)), t & 2)) {
            let s;
            k((s = B())) && (i.headerFacet = s.first),
              k((s = B())) && (i.footerFacet = s.first),
              k((s = B())) && (i.templates = s);
          }
        },
        viewQuery: function (t, i) {
          if ((t & 1 && (ke(Ht, 5), ke(kt, 5)), t & 2)) {
            let a;
            k((a = B())) && (i.itemsContainer = a.first),
              k((a = B())) && (i.indicatorContent = a.first);
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
          circular: [F.HasDecoratorInputTransform, "circular", "circular", P],
          showIndicators: [
            F.HasDecoratorInputTransform,
            "showIndicators",
            "showIndicators",
            P,
          ],
          showNavigators: [
            F.HasDecoratorInputTransform,
            "showNavigators",
            "showNavigators",
            P,
          ],
          autoplayInterval: [
            F.HasDecoratorInputTransform,
            "autoplayInterval",
            "autoplayInterval",
            xe,
          ],
          style: "style",
          styleClass: "styleClass",
        },
        outputs: { onPage: "onPage" },
        features: [oe, Ye],
        ngContentSelectors: Vt,
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
        template: function (t, i) {
          if (t & 1) {
            let a = re();
            H(Bt),
              r(0, "div", 2),
              m(1, $t, 3, 1, "div", 3),
              r(2, "div", 4)(3, "div", 5),
              m(4, ti, 3, 7, "button", 6),
              r(5, "div", 7),
              x("touchend", function (p) {
                return U(a), q(i.onTouchEnd(p));
              })("touchstart", function (p) {
                return U(a), q(i.onTouchStart(p));
              })("touchmove", function (p) {
                return U(a), q(i.onTouchMove(p));
              }),
              r(6, "div", 8, 0),
              x("transitionend", function () {
                return U(a), q(i.onTransitionEnd());
              }),
              m(8, ni, 2, 12, "div", 9)(9, oi, 2, 12, "div", 9)(
                10,
                ri,
                2,
                9,
                "div",
                9
              ),
              l()(),
              m(11, fi, 3, 7, "button", 6),
              l(),
              m(12, gi, 3, 5, "ul", 10),
              l(),
              m(13, yi, 3, 1, "div", 11),
              l();
          }
          t & 2 &&
            (A(i.styleClass),
            c("ngClass", Je(18, Wt, i.isVertical(), !i.isVertical()))(
              "ngStyle",
              i.style
            ),
            _("id", i.id),
            u(),
            c("ngIf", i.headerFacet || i.headerTemplate),
            u(),
            A(i.contentClass),
            c("ngClass", "p-carousel-content"),
            u(),
            _("aria-live", i.allowAutoplay ? "polite" : "off"),
            u(),
            c("ngIf", i.showNavigators),
            u(),
            c(
              "ngStyle",
              D(21, Ut, i.isVertical() ? i.verticalViewPortHeight : "auto")
            ),
            u(3),
            c("ngForOf", i.clonedItemsForStarting),
            u(),
            c("ngForOf", i.value),
            u(),
            c("ngForOf", i.clonedItemsForFinishing),
            u(),
            c("ngIf", i.showNavigators),
            u(),
            c("ngIf", i.showIndicators),
            u(),
            c("ngIf", i.footerFacet || i.footerTemplate));
        },
        dependencies: () => [ue, tt, we, Le, me, Ct, ce, qe, le, Ge],
        styles: [
          `@layer primeng{.p-carousel{display:flex;flex-direction:column}.p-carousel-content{display:flex;flex-direction:column;overflow:auto}.p-carousel-prev,.p-carousel-next{align-self:center;flex-grow:0;flex-shrink:0;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-carousel-container{display:flex;flex-direction:row}.p-carousel-items-content{overflow:hidden;width:100%}.p-carousel-items-container{display:flex;flex-direction:row}.p-carousel-indicators{display:flex;flex-direction:row;justify-content:center;flex-wrap:wrap}.p-carousel-indicator>button{display:flex;align-items:center;justify-content:center}.p-carousel-vertical .p-carousel-container{flex-direction:column}.p-carousel-vertical .p-carousel-items-container{flex-direction:column;height:100%}.p-items-hidden .p-carousel-item{visibility:hidden}.p-items-hidden .p-carousel-item.p-carousel-item-active{visibility:visible}}
`,
        ],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return n;
  })(),
  bt = (() => {
    class n {
      static ɵfac = function (t) {
        return new (t || n)();
      };
      static ɵmod = $({ type: n });
      static ɵinj = j({ imports: [K, fe, yt, ce, qe, le, Ge, K, fe] });
    }
    return n;
  })();
function _i(n, o) {
  if (
    (n & 1 &&
      (r(0, "div", 7)(1, "div", 8),
      g(2, "img", 9),
      l(),
      r(3, "div", 10),
      d(4),
      l(),
      r(5, "div", 11),
      d(6),
      l()()),
    n & 2)
  ) {
    let e = o.$implicit;
    u(2),
      c("src", e.image, Ze)("alt", e.name),
      u(2),
      pe(" ", e.message, " "),
      u(2),
      pe(" ", e.name, " ");
  }
}
var Et = (() => {
  class n {
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
            image: "assets/media/ampola1.png",
          },
          {
            name: "Rafaela M. Schneider",
            message:
              '"Perder minha m\xE3e foi o momento mais doloroso da minha vida, e isso me levou a uma tristeza constante. Eu n\xE3o tinha energia para nada, nem mesmo para cuidar de mim. O \xF3leo da CBD Vital Med foi essencial para virar essa p\xE1gina. Ele me ajudou a retomar o equil\xEDbrio emocional e trouxe de volta a disposi\xE7\xE3o para seguir em frente."',
            image: "assets/media/ampola1.png",
          },
          {
            name: "Giovanna T. Goulart",
            message:
              '"Minha ins\xF4nia estava ligada ao meu estilo de vida sedent\xE1rio. Era dif\xEDcil dormir e ainda mais complicado acordar com energia. Desde que comecei a usar o \xF3leo da CBD Vital Med, senti mudan\xE7as em v\xE1rias \xE1reas. Meu sono melhorou muito e, com mais disposi\xE7\xE3o, consegui voltar a me exercitar. Foi um ciclo positivo que come\xE7ou com o \xF3leo."',
            image: "assets/media/ampola1.png",
          },
          {
            name: "Renato L. Kowalski",
            message:
              '"Trabalhei por anos em atividades pesadas e, como resultado, desenvolvi uma h\xE9rnia de disco. As dores me acompanhavam o tempo todo, afetando at\xE9 tarefas simples como caminhar. Com o \xF3leo da CBD Vital Med, finalmente encontrei o al\xEDvio que precisava. Ele me devolveu a liberdade de fazer o que gosto, sem o sofrimento constante."',
            image: "assets/media/ampola1.png",
          },
          {
            name: "Antonio C. Oliveira ",
            message:
              '"Desde pequeno, enfrento crises epil\xE9pticas que limitaram minha vida de muitas formas. Foram d\xE9cadas lidando com isso, at\xE9 que, aos 40 anos, comecei a usar o \xF3leo da CBD Vital Med. As crises diminu\xEDram tanto que hoje posso levar uma vida muito mais tranquila e sem aquele medo constante. \xC9 um al\xEDvio que eu n\xE3o sabia que era poss\xEDvel."',
            image: "assets/media/ampola1.png",
          },
        ]);
    }
    static {
      this.ɵfac = function (t) {
        return new (t || n)();
      };
    }
    static {
      this.ɵcmp = h({
        type: n,
        selectors: [["app-feedbacks"]],
        standalone: !0,
        features: [y],
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
        template: function (t, i) {
          t & 1 &&
            (r(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3),
            d(4, "O QUE FALAM DE N\xD3S?"),
            l(),
            r(5, "p", 4),
            d(
              6,
              " Conhe\xE7a mais do nosso \xF3leo de CBD por meio de feedbacks de pessoas que confiam em nosso produto. "
            ),
            l()(),
            r(7, "p-carousel", 5),
            m(8, _i, 7, 4, "ng-template", 6),
            l()()()),
            t & 2 &&
              (u(7),
              c("value", i.feedbacks)("numVisible", 2)("numScroll", 1)(
                "circular",
                !0
              )("responsiveOptions", i.responsiveOptions));
        },
        dependencies: [bt, _t, W, K],
        encapsulation: 2,
      });
    }
  }
  return n;
})();
var St = (() => {
  class n {
    constructor() {}
    sendMensage() {
      new V().sendMensage();
    }
    static {
      this.ɵfac = function (t) {
        return new (t || n)();
      };
    }
    static {
      this.ɵcmp = h({
        type: n,
        selectors: [["app-infos"]],
        standalone: !0,
        features: [y],
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
        template: function (t, i) {
          t & 1 &&
            (r(0, "section", 0)(1, "div", 1)(2, "p", 2),
            d(3, "Fale conosco!"),
            l(),
            r(4, "p", 3),
            d(
              5,
              " A medicina natural, bioid\xEAntica e comprovada cientificamente est\xE1 \xE0 sua disposi\xE7\xE3o. Vamos promover sa\xFAde, bem-estar e qualidade de vida a todos que precisam. "
            ),
            l(),
            r(6, "button", 4),
            x("click", function () {
              return i.sendMensage();
            }),
            d(7, " Clique aqui para falar conosco "),
            l()(),
            r(8, "div", 5)(9, "p"),
            d(10, "CBD VITAL MED"),
            g(11, "br"),
            l(),
            r(12, "p"),
            d(13, "\xA9 2024 Todos os direitos reservados"),
            l()()());
        },
        encapsulation: 2,
      });
    }
  }
  return n;
})();
var bi = ["*", [["p-header"]]],
  Ei = ["*", "p-header"],
  Si = (n) => ({ $implicit: n }),
  It = (n) => ({ transitionParams: n }),
  Ii = (n) => ({ value: "visible", params: n }),
  Ti = (n) => ({ value: "hidden", params: n });
function xi(n, o) {
  if ((n & 1 && g(0, "span", 11), n & 2)) {
    let e = v(3);
    A(e.accordion.collapseIcon),
      c("ngClass", e.iconClass),
      _("aria-hidden", !0);
  }
}
function Ai(n, o) {
  if ((n & 1 && g(0, "ChevronDownIcon", 11), n & 2)) {
    let e = v(3);
    c("ngClass", e.iconClass), _("aria-hidden", !0);
  }
}
function wi(n, o) {
  if (
    (n & 1 &&
      (X(0),
      m(1, xi, 1, 4, "span", 9)(2, Ai, 1, 2, "ChevronDownIcon", 10),
      J()),
    n & 2)
  ) {
    let e = v(2);
    u(),
      c("ngIf", e.accordion.collapseIcon),
      u(),
      c("ngIf", !e.accordion.collapseIcon);
  }
}
function Li(n, o) {
  if ((n & 1 && g(0, "span", 11), n & 2)) {
    let e = v(3);
    A(e.accordion.expandIcon), c("ngClass", e.iconClass), _("aria-hidden", !0);
  }
}
function Oi(n, o) {
  if ((n & 1 && g(0, "ChevronRightIcon", 11), n & 2)) {
    let e = v(3);
    c("ngClass", e.iconClass), _("aria-hidden", !0);
  }
}
function Ri(n, o) {
  if (
    (n & 1 &&
      (X(0),
      m(1, Li, 1, 4, "span", 9)(2, Oi, 1, 2, "ChevronRightIcon", 10),
      J()),
    n & 2)
  ) {
    let e = v(2);
    u(),
      c("ngIf", e.accordion.expandIcon),
      u(),
      c("ngIf", !e.accordion.expandIcon);
  }
}
function Fi(n, o) {
  if (
    (n & 1 &&
      (X(0),
      m(1, wi, 3, 2, "ng-container", 3)(2, Ri, 3, 2, "ng-container", 3),
      J()),
    n & 2)
  ) {
    let e = v();
    u(), c("ngIf", e.selected), u(), c("ngIf", !e.selected);
  }
}
function Di(n, o) {}
function Ni(n, o) {
  n & 1 && m(0, Di, 0, 0, "ng-template");
}
function Mi(n, o) {
  if ((n & 1 && (r(0, "span", 12), d(1), l()), n & 2)) {
    let e = v();
    u(), pe(" ", e.header, " ");
  }
}
function Pi(n, o) {
  n & 1 && G(0);
}
function Hi(n, o) {
  n & 1 && N(0, 1, ["*ngIf", "hasHeaderFacet"]);
}
function ki(n, o) {
  n & 1 && G(0);
}
function Bi(n, o) {
  if ((n & 1 && (X(0), m(1, ki, 1, 0, "ng-container", 6), J()), n & 2)) {
    let e = v();
    u(), c("ngTemplateOutlet", e.contentTemplate);
  }
}
var Vi = ["*"],
  ge = (() => {
    class n {
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
      selectedChange = new ae();
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
      constructor(e, t, i) {
        (this.el = t),
          (this.changeDetector = i),
          (this.accordion = e),
          (this.id = Re());
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
        let t = this.findTabIndex();
        if (this.selected)
          (this.selected = !1),
            this.accordion.onClose.emit({ originalEvent: e, index: t });
        else {
          if (!this.accordion.multiple)
            for (var i = 0; i < this.accordion.tabs.length; i++)
              this.accordion.tabs[i].selected &&
                ((this.accordion.tabs[i].selected = !1),
                this.accordion.tabs[i].selectedChange.emit(!1),
                this.accordion.tabs[i].changeDetector.markForCheck());
          (this.selected = !0),
            (this.loaded = !0),
            this.accordion.onOpen.emit({ originalEvent: e, index: t });
        }
        this.selectedChange.emit(this.selected),
          this.accordion.updateActiveIndex(),
          this.changeDetector.markForCheck(),
          e?.preventDefault();
      }
      findTabIndex() {
        let e = -1;
        for (var t = 0; t < this.accordion.tabs.length; t++)
          if (this.accordion.tabs[t] == this) {
            e = t;
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
      static ɵfac = function (t) {
        return new (t || n)(S($e(() => Ce)), S(ne), S(de));
      };
      static ɵcmp = h({
        type: n,
        selectors: [["p-accordionTab"]],
        contentQueries: function (t, i, a) {
          if ((t & 1 && (ee(a, De, 4), ee(a, W, 4)), t & 2)) {
            let s;
            k((s = B())) && (i.headerFacet = s),
              k((s = B())) && (i.templates = s);
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
          disabled: [F.HasDecoratorInputTransform, "disabled", "disabled", P],
          cache: [F.HasDecoratorInputTransform, "cache", "cache", P],
          transitionOptions: "transitionOptions",
          iconPos: "iconPos",
          selected: "selected",
          headerAriaLevel: [
            F.HasDecoratorInputTransform,
            "headerAriaLevel",
            "headerAriaLevel",
            xe,
          ],
        },
        outputs: { selectedChange: "selectedChange" },
        features: [oe],
        ngContentSelectors: Ei,
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
        template: function (t, i) {
          t & 1 &&
            (H(bi),
            r(0, "div", 0)(1, "div", 1)(2, "a", 2),
            x("click", function (s) {
              return i.toggle(s);
            })("keydown", function (s) {
              return i.onKeydown(s);
            }),
            m(3, Fi, 3, 2, "ng-container", 3)(4, Ni, 1, 0, null, 4)(
              5,
              Mi,
              2,
              1,
              "span",
              5
            )(6, Pi, 1, 0, "ng-container", 6)(7, Hi, 1, 0, "ng-content", 3),
            l()(),
            r(8, "div", 7)(9, "div", 8),
            N(10),
            m(11, Bi, 2, 1, "ng-container", 3),
            l()()()),
            t & 2 &&
              (He("p-accordion-tab-active", i.selected),
              c("ngClass", i.tabStyleClass)("ngStyle", i.tabStyle),
              _("data-pc-name", "accordiontab"),
              u(),
              He("p-highlight", i.selected)("p-disabled", i.disabled),
              _("aria-level", i.headerAriaLevel)("data-p-disabled", i.disabled)(
                "data-pc-section",
                "header"
              ),
              u(),
              c("ngClass", i.headerStyleClass)("ngStyle", i.headerStyle),
              _("tabindex", i.disabled ? null : 0)(
                "id",
                i.getTabHeaderActionId(i.id)
              )("aria-controls", i.getTabContentId(i.id))(
                "aria-expanded",
                i.selected
              )("aria-disabled", i.disabled)("data-pc-section", "headeraction"),
              u(),
              c("ngIf", !i.iconTemplate),
              u(),
              c("ngTemplateOutlet", i.iconTemplate)(
                "ngTemplateOutletContext",
                D(34, Si, i.selected)
              ),
              u(),
              c("ngIf", !i.hasHeaderFacet),
              u(),
              c("ngTemplateOutlet", i.headerTemplate),
              u(),
              c("ngIf", i.hasHeaderFacet),
              u(),
              c(
                "@tabContent",
                i.selected
                  ? D(38, Ii, D(36, It, i.transitionOptions))
                  : D(42, Ti, D(40, It, i.transitionOptions))
              ),
              _("id", i.getTabContentId(i.id))("aria-hidden", !i.selected)(
                "aria-labelledby",
                i.getTabHeaderActionId(i.id)
              )("data-pc-section", "toggleablecontent"),
              u(),
              c("ngClass", i.contentStyleClass)("ngStyle", i.contentStyle),
              u(2),
              c(
                "ngIf",
                i.contentTemplate && (i.cache ? i.loaded : i.selected)
              ));
        },
        dependencies: () => [ue, we, Le, me, ce, le],
        styles: [
          `@layer primeng{.p-accordion-header-link{cursor:pointer;display:flex;align-items:center;-webkit-user-select:none;user-select:none;position:relative;text-decoration:none}.p-accordion-header-link:focus{z-index:1}.p-accordion-header-text{line-height:1}.p-accordion .p-toggleable-content{overflow:hidden}.p-accordion .p-accordion-tab-active>.p-toggleable-content:not(.ng-animating){overflow:inherit}.p-accordion-toggle-icon-end{order:1;margin-left:auto}.p-accordion-toggle-icon{order:0}}
`,
        ],
        encapsulation: 2,
        data: {
          animation: [
            at("tabContent", [
              We("hidden", Ve({ height: "0", visibility: "hidden" })),
              We("visible", Ve({ height: "*", visibility: "visible" })),
              Ue("visible <=> hidden", [Be("{{transitionParams}}")]),
              Ue("void => *", Be(0)),
            ]),
          ],
        },
        changeDetection: 0,
      });
    }
    return n;
  })(),
  Ce = (() => {
    class n {
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
      onClose = new ae();
      onOpen = new ae();
      activeIndexChange = new ae();
      tabList;
      tabListSubscription = null;
      _activeIndex;
      _headerAriaLevel = 2;
      preventActiveIndexPropagation = !1;
      tabs = [];
      constructor(e, t) {
        (this.el = e), (this.changeDetector = t);
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
          let t = this.findNextHeaderAction(
            e.target.parentElement.parentElement.parentElement
          );
          t ? this.changeFocusedTab(t) : this.onTabHomeKey(e),
            e.preventDefault();
        }
      }
      onTabArrowUpKey(e) {
        if (this.focusedElementIsAccordionHeader()) {
          let t = this.findPrevHeaderAction(
            e.target.parentElement.parentElement.parentElement
          );
          t ? this.changeFocusedTab(t) : this.onTabEndKey(e),
            e.preventDefault();
        }
      }
      onTabHomeKey(e) {
        let t = this.findFirstHeaderAction();
        this.changeFocusedTab(t), e.preventDefault();
      }
      changeFocusedTab(e) {
        e &&
          (C.focus(e),
          this.selectOnFocus &&
            this.tabs.forEach((t, i) => {
              let a = this.multiple
                ? this._activeIndex.includes(i)
                : i === this._activeIndex;
              this.multiple
                ? (this._activeIndex || (this._activeIndex = []),
                  t.id == e.id &&
                    ((t.selected = !t.selected),
                    this._activeIndex.includes(i)
                      ? (this._activeIndex = this._activeIndex.filter(
                          (s) => s !== i
                        ))
                      : this._activeIndex.push(i)))
                : t.id == e.id
                ? ((t.selected = !t.selected), (this._activeIndex = i))
                : (t.selected = !1),
                t.selectedChange.emit(a),
                this.activeIndexChange.emit(this._activeIndex),
                t.changeDetector.markForCheck();
            }));
      }
      findNextHeaderAction(e, t = !1) {
        let i = t ? e : e.nextElementSibling,
          a = C.findSingle(i, '[data-pc-section="header"]');
        return a
          ? C.getAttribute(a, "data-p-disabled")
            ? this.findNextHeaderAction(a.parentElement.parentElement)
            : C.findSingle(a, '[data-pc-section="headeraction"]')
          : null;
      }
      findPrevHeaderAction(e, t = !1) {
        let i = t ? e : e.previousElementSibling,
          a = C.findSingle(i, '[data-pc-section="header"]');
        return a
          ? C.getAttribute(a, "data-p-disabled")
            ? this.findPrevHeaderAction(a.parentElement.parentElement)
            : C.findSingle(a, '[data-pc-section="headeraction"]')
          : null;
      }
      findFirstHeaderAction() {
        let e = this.el.nativeElement.firstElementChild.childNodes[0];
        return this.findNextHeaderAction(e, !0);
      }
      findLastHeaderAction() {
        let e = this.el.nativeElement.firstElementChild.childNodes,
          t = e[e.length - 1];
        return this.findPrevHeaderAction(t, !0);
      }
      onTabEndKey(e) {
        let t = this.findLastHeaderAction();
        this.changeFocusedTab(t), e.preventDefault();
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
            let t = this.multiple
              ? this._activeIndex.includes(e)
              : e === this._activeIndex;
            t !== this.tabs[e].selected &&
              ((this.tabs[e].selected = t),
              this.tabs[e].selectedChange.emit(t),
              this.tabs[e].changeDetector.markForCheck());
          }
      }
      isTabActive(e) {
        return this.multiple
          ? this._activeIndex && this._activeIndex.includes(e)
          : this._activeIndex === e;
      }
      getTabProp(e, t) {
        return e.props ? e.props[t] : void 0;
      }
      updateActiveIndex() {
        let e = this.multiple ? [] : null;
        this.tabs.forEach((t, i) => {
          if (t.selected)
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
      static ɵfac = function (t) {
        return new (t || n)(S(ne), S(de));
      };
      static ɵcmp = h({
        type: n,
        selectors: [["p-accordion"]],
        contentQueries: function (t, i, a) {
          if ((t & 1 && ee(a, ge, 5), t & 2)) {
            let s;
            k((s = B())) && (i.tabList = s);
          }
        },
        hostAttrs: [1, "p-element"],
        hostBindings: function (t, i) {
          t & 1 &&
            x("keydown", function (s) {
              return i.onKeydown(s);
            });
        },
        inputs: {
          multiple: [F.HasDecoratorInputTransform, "multiple", "multiple", P],
          style: "style",
          styleClass: "styleClass",
          expandIcon: "expandIcon",
          collapseIcon: "collapseIcon",
          activeIndex: "activeIndex",
          selectOnFocus: [
            F.HasDecoratorInputTransform,
            "selectOnFocus",
            "selectOnFocus",
            P,
          ],
          headerAriaLevel: "headerAriaLevel",
        },
        outputs: {
          onClose: "onClose",
          onOpen: "onOpen",
          activeIndexChange: "activeIndexChange",
        },
        features: [oe],
        ngContentSelectors: Vi,
        decls: 2,
        vars: 4,
        consts: [[3, "ngClass", "ngStyle"]],
        template: function (t, i) {
          t & 1 && (H(), r(0, "div", 0), N(1), l()),
            t & 2 &&
              (A(i.styleClass),
              c("ngClass", "p-accordion p-component")("ngStyle", i.style));
        },
        dependencies: [ue, me],
        encapsulation: 2,
        changeDetection: 0,
      });
    }
    return n;
  })(),
  Ne = (() => {
    class n {
      static ɵfac = function (t) {
        return new (t || n)();
      };
      static ɵmod = $({ type: n });
      static ɵinj = j({ imports: [K, ce, le, fe] });
    }
    return n;
  })();
var Me = () => ({
  "background-color": "transparent",
  "border-bottom": "1px solid #3B4B10",
  "border-radius": "0px",
});
function Wi(n, o) {
  n & 1 && (r(0, "span", 10)(1, "span", 11), d(2, " Gest\xE3o da dor "), l()());
}
function Ui(n, o) {
  n & 1 && (r(0, "span", 10)(1, "span", 11), d(2, " Melhoria do Sono "), l()());
}
function qi(n, o) {
  n & 1 &&
    (r(0, "span", 10)(1, "span", 11),
    d(2, " Doen\xE7as neurol\xF3gicas "),
    l()());
}
function Gi(n, o) {
  n & 1 && (r(0, "span", 10)(1, "span", 11), d(2, " Sa\xFAde mental "), l()());
}
var xt = (() => {
  class n {
    static {
      this.ɵfac = function (t) {
        return new (t || n)();
      };
    }
    static {
      this.ɵcmp = h({
        type: n,
        selectors: [["app-beneficios"]],
        standalone: !0,
        features: [y],
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
            "assets/media/ampola-vertical1.png",
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
        template: function (t, i) {
          t & 1 &&
            (r(0, "section", 0)(1, "div", 1)(2, "div", 2),
            g(3, "img", 3),
            l(),
            r(4, "div", 4)(5, "p", 5),
            d(
              6,
              " Potenciais benef\xEDcios do tratamento com cannabis medicinal "
            ),
            l(),
            r(7, "p-accordion", 6)(8, "p-accordionTab", 7),
            m(9, Wi, 3, 0, "ng-template", 8),
            r(10, "p", 9),
            d(
              11,
              " A mesma pode atuar no al\xEDvio de dores cr\xF4nicas e agudas, proporcionando uma alternativa natural e eficaz para pacientes que sofrem com desconforto cont\xEDnuo. "
            ),
            l()(),
            r(12, "p-accordionTab", 7),
            m(13, Ui, 3, 0, "ng-template", 8),
            r(14, "p", 9),
            d(
              15,
              " A adenosina \xE9 um composto org\xE2nico respons\xE1vel pelo controle da nossa sensa\xE7\xE3o de cansa\xE7o. O CBD ajuda a regular a quantidade de adenosina produzida pelo corpo, promovendo assim a qualidade do sono. "
            ),
            l()(),
            r(16, "p-accordionTab", 7),
            m(17, qi, 3, 0, "ng-template", 8),
            r(18, "p", 9),
            d(
              19,
              " O tratamento com cannabis medicinal tem sido explorado em diversas condi\xE7\xF5es neurol\xF3gicas, como epilepsia e esclerose m\xFAltipla, oferecendo uma alternativa terap\xEAutica promissora para esses pacientes. "
            ),
            l()(),
            r(20, "p-accordionTab", 7),
            m(21, Gi, 3, 0, "ng-template", 8),
            r(22, "p", 9),
            d(
              23,
              " Al\xE9m de aliviar a ansiedade, o tratamento com CBD tem demonstrado benef\xEDcios no apoio ao tratamento de depress\xE3o e transtorno de estresse p\xF3s-traum\xE1tico (TEPT), proporcionando maior qualidade de vida aos pacientes que convivem com esses dist\xFArbios. "
            ),
            l()()()()()()),
            t & 2 &&
              (u(8),
              c("headerStyle", O(4, Me)),
              u(4),
              c("headerStyle", O(5, Me)),
              u(4),
              c("headerStyle", O(6, Me)),
              u(4),
              c("headerStyle", O(7, Me)));
        },
        dependencies: [Ne, Ce, ge, W],
        encapsulation: 2,
      });
    }
  }
  return n;
})();
var ye = () => ({
    "background-color": "#3B4B1026",
    "border-radius": "8px",
    "margin-bottom": "8px",
  }),
  ve = () => ({
    "background-color": "#3B4B10",
    color: "#FFFFFF",
    "border-radius": "8px",
    padding: "16px",
  });
function Ki(n, o) {
  n & 1 &&
    (r(0, "span", 11)(1, "span", 12),
    d(2, " O que \xE9 Cannabis Medicinal? "),
    l()());
}
function zi(n, o) {
  n & 1 &&
    (r(0, "span", 11)(1, "span", 12),
    d(2, " O \xF3leo de Cannabis causa depend\xEAncia?"),
    l()());
}
function ji(n, o) {
  n & 1 &&
    (r(0, "span", 11)(1, "span", 12),
    d(2, "Como o \xF3leo de Cannabis atua no corpo?"),
    l()());
}
function $i(n, o) {
  n & 1 &&
    (r(0, "span", 11)(1, "span", 12),
    d(2, "Quais patologias a CBD ajuda a amenizar?"),
    l()());
}
function Qi(n, o) {
  n & 1 &&
    (r(0, "span", 11)(1, "span", 12),
    d(2, "Posso utilizar o \xF3leo em qualquer hor\xE1rio?"),
    l()());
}
var At = (() => {
  class n {
    constructor() {}
    sendMensage() {
      new V().sendMensage();
    }
    static {
      this.ɵfac = function (t) {
        return new (t || n)();
      };
    }
    static {
      this.ɵcmp = h({
        type: n,
        selectors: [["app-conheca"]],
        standalone: !0,
        features: [y],
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
        template: function (t, i) {
          t & 1 &&
            (r(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(
              4,
              "h2",
              4
            ),
            d(5, " Conhe\xE7a o"),
            g(6, "br"),
            d(7, " CBD Vital "),
            l(),
            r(8, "p"),
            d(
              9,
              " O canabidiol ou CBD \xE9 um fitocanabinoide sem propriedades intoxicantes. Possui capacidades analg\xE9sicas, anti-inflamat\xF3rias, antioxidantes, ansiol\xEDticas, antidepressivas, anticonvulsivas, estimulante \xF3sseo, antin\xE1usea, neuroprotetora e tem efeito imunomodulat\xF3rio. "
            ),
            l(),
            r(10, "button", 5),
            x("click", function () {
              return i.sendMensage();
            }),
            d(11, " Fale Conosco "),
            l()()(),
            r(12, "div", 6)(13, "p-accordion", 7)(14, "p-accordionTab", 8),
            m(15, Ki, 3, 0, "ng-template", 9),
            r(16, "p", 10),
            d(
              17,
              " O \xF3leo de Cannabis\xA0\xE9 um produto medicinal comumente usado no tratamento de condi\xE7\xF5es, para amenizar os efeitos colaterais de quem faz. "
            ),
            l()(),
            r(18, "p-accordionTab", 8),
            m(19, zi, 3, 0, "ng-template", 9),
            r(20, "p", 10),
            d(
              21,
              " o \xF3leo de cannabis medicinal n\xE3o causa depend\xEAncia qu\xEDmica. Seus compostos naturais s\xE3o considerados seguros para uso prolongado. "
            ),
            l()(),
            r(22, "p-accordionTab", 8),
            m(23, ji, 3, 0, "ng-template", 9),
            r(24, "p", 10),
            d(
              25,
              " o \xF3leo\xA0atua como relaxante muscular e anti-inflamat\xF3rio. Dentre os benef\xEDcios, produz efeito anticonvulsivo, anti-inflamat\xF3rio, antidepressivo e anti-hipertensivo. "
            ),
            l()(),
            r(26, "p-accordionTab", 8),
            m(27, $i, 3, 0, "ng-template", 9),
            r(28, "p", 10),
            d(
              29,
              " O mesmo ajuda a amenizar mais de 50 patologias, entre elas: a\xA0doen\xE7a\xA0de Parkinson, Alzheimer, diabetes, n\xE1useas, e c\xE2ncer. Al\xE9m disso, atua como analg\xE9sico e imunossupressor, em dist\xFArbios de ansiedade, do sono e do movimento. "
            ),
            l()(),
            r(30, "p-accordionTab", 8),
            m(31, Qi, 3, 0, "ng-template", 9),
            r(32, "p", 10),
            d(
              33,
              " \xA0o hor\xE1rio ideal para tomar \xF3leo de CBD varia de acordo com as necessidades de cada pessoa e os efeitos terap\xEAuticos desejados.\xA0Por isso, \xE9 sempre recomendado consultar um profissional de sa\xFAde para obter orienta\xE7\xE3o personalizada "
            ),
            l()()()()()()),
            t & 2 &&
              (u(14),
              c("headerStyle", O(10, ye))("contentStyle", O(11, ve)),
              u(4),
              c("headerStyle", O(12, ye))("contentStyle", O(13, ve)),
              u(4),
              c("headerStyle", O(14, ye))("contentStyle", O(15, ve)),
              u(4),
              c("headerStyle", O(16, ye))("contentStyle", O(17, ve)),
              u(4),
              c("headerStyle", O(18, ye))("contentStyle", O(19, ve)));
        },
        dependencies: [Ne, Ce, ge, W],
        encapsulation: 2,
      });
    }
  }
  return n;
})();
var wt = (() => {
  class n {
    static {
      this.ɵfac = function (t) {
        return new (t || n)();
      };
    }
    static {
      this.ɵcmp = h({
        type: n,
        selectors: [["app-main-page"]],
        standalone: !0,
        features: [y],
        decls: 7,
        vars: 0,
        consts: [[1, "montserrat"]],
        template: function (t, i) {
          t & 1 &&
            g(0, "app-header", 0)(1, "app-features", 0)(2, "app-conheca", 0)(
              3,
              "app-how-to-buy",
              0
            )(4, "app-feedbacks", 0)(5, "app-beneficios", 0)(6, "app-infos", 0);
        },
        dependencies: [K, dt, ut, mt, Et, St, xt, At],
        encapsulation: 2,
      });
    }
  }
  return n;
})();
var Lt = [
  { path: "", pathMatch: "full", redirectTo: "pagina-principal" },
  { path: "pagina-principal", component: wt },
];
var Ot = { providers: [lt(Lt, ct()), nt(), ot()] };
var Yi = { providers: [st()] },
  Rt = et(Ot, Yi);
var Zi = () => it(pt, Rt),
  no = Zi;
export { no as a };
