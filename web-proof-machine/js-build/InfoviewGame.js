const global = window;

import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import require$$0, { createContext, memo, useState, useContext, forwardRef, useCallback, useMemo, useRef, useEffect, useLayoutEffect, createElement } from 'react';
import 'react-dom';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function cc(names) {
  if (typeof names === "string" || typeof names === "number") return "" + names

  let out = "";

  if (Array.isArray(names)) {
    for (let i = 0, tmp; i < names.length; i++) {
      if ((tmp = cc(names[i])) !== "") {
        out += (out && " ") + tmp;
      }
    }
  } else {
    for (let k in names) {
      if (names[k]) out += (out && " ") + k;
    }
  }

  return out
}

var noop = {value: () => {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames$1(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames$1(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get$1(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set$1(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

var xhtml = "http://www.w3.org/1999/xhtml";

var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function creator(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

function none() {}

function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

function empty() {
  return [];
}

function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}

function selection_selectAll(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection$1(subgroups, parents);
}

function matcher(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

function selection_selectChild(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : childMatcher(match)));
}

var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

function selection_selectChildren(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

function sparse(update) {
  return new Array(update.length);
}

function selection_enter() {
  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

function constant$3(x) {
  return function() {
    return x;
  };
}

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

function selection_data(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant$3(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection$1(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}

function selection_exit() {
  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
}

function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

function selection_merge(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection$1(merges, this._parents);
}

function selection_order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

function selection_sort(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection$1(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

function selection_nodes() {
  return Array.from(this);
}

function selection_node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

function selection_size() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}

function selection_empty() {
  return !this.node();
}

function selection_each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant$1(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS$1(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction$1(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS$1(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function selection_attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
      : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
}

function defaultView(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

function styleRemove$1(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant$1(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction$1(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

function selection_style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove$1 : typeof value === "function"
            ? styleFunction$1
            : styleConstant$1)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

function selection_property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function selection_classed(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

function textRemove() {
  this.textContent = "";
}

function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction$1(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction$1
          : textConstant$1)(value))
      : this.node().textContent;
}

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function selection_html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function selection_raise() {
  return this.each(raise);
}

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function selection_lower() {
  return this.each(lower);
}

function selection_append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

function constantNull() {
  return null;
}

function selection_insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function selection_remove() {
  return this.each(remove);
}

function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

function selection_on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function selection_dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

function* selection_iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

var root = [null];

function Selection$1(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection$1([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection$1.prototype = selection.prototype = {
  constructor: Selection$1,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator
};

function select(selector) {
  return typeof selector === "string"
      ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
      : new Selection$1([[selector]], root);
}

function sourceEvent(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}

function pointer(event, node) {
  event = sourceEvent(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

// These are typically used in conjunction with noevent to ensure that we can
// preventDefault on the event.
const nonpassive = {passive: false};
const nonpassivecapture = {capture: true, passive: false};

function nopropagation$1(event) {
  event.stopImmediatePropagation();
}

function noevent$1(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

function dragDisable(view) {
  var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", noevent$1, nonpassivecapture);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
}

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", noevent$1, nonpassivecapture);
    setTimeout(function() { selection.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

var constant$2 = x => () => x;

function DragEvent(type, {
  sourceEvent,
  subject,
  target,
  identifier,
  active,
  x, y, dx, dy,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    subject: {value: subject, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    identifier: {value: identifier, enumerable: true, configurable: true},
    active: {value: active, enumerable: true, configurable: true},
    x: {value: x, enumerable: true, configurable: true},
    y: {value: y, enumerable: true, configurable: true},
    dx: {value: dx, enumerable: true, configurable: true},
    dy: {value: dy, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}

DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

// Ignore right-click, since that should open the context menu.
function defaultFilter$1(event) {
  return !event.ctrlKey && !event.button;
}

function defaultContainer() {
  return this.parentNode;
}

function defaultSubject(event, d) {
  return d == null ? {x: event.x, y: event.y} : d;
}

function defaultTouchable$1() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function drag() {
  var filter = defaultFilter$1,
      container = defaultContainer,
      subject = defaultSubject,
      touchable = defaultTouchable$1,
      gestures = {},
      listeners = dispatch("start", "drag", "end"),
      active = 0,
      mousedownx,
      mousedowny,
      mousemoving,
      touchending,
      clickDistance2 = 0;

  function drag(selection) {
    selection
        .on("mousedown.drag", mousedowned)
      .filter(touchable)
        .on("touchstart.drag", touchstarted)
        .on("touchmove.drag", touchmoved, nonpassive)
        .on("touchend.drag touchcancel.drag", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  function mousedowned(event, d) {
    if (touchending || !filter.call(this, event, d)) return;
    var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
    if (!gesture) return;
    select(event.view)
      .on("mousemove.drag", mousemoved, nonpassivecapture)
      .on("mouseup.drag", mouseupped, nonpassivecapture);
    dragDisable(event.view);
    nopropagation$1(event);
    mousemoving = false;
    mousedownx = event.clientX;
    mousedowny = event.clientY;
    gesture("start", event);
  }

  function mousemoved(event) {
    noevent$1(event);
    if (!mousemoving) {
      var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag", event);
  }

  function mouseupped(event) {
    select(event.view).on("mousemove.drag mouseup.drag", null);
    yesdrag(event.view, mousemoving);
    noevent$1(event);
    gestures.mouse("end", event);
  }

  function touchstarted(event, d) {
    if (!filter.call(this, event, d)) return;
    var touches = event.changedTouches,
        c = container.call(this, event, d),
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
        nopropagation$1(event);
        gesture("start", event, touches[i]);
      }
    }
  }

  function touchmoved(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        noevent$1(event);
        gesture("drag", event, touches[i]);
      }
    }
  }

  function touchended(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        nopropagation$1(event);
        gesture("end", event, touches[i]);
      }
    }
  }

  function beforestart(that, container, event, d, identifier, touch) {
    var dispatch = listeners.copy(),
        p = pointer(touch || event, container), dx, dy,
        s;

    if ((s = subject.call(that, new DragEvent("beforestart", {
        sourceEvent: event,
        target: drag,
        identifier,
        active,
        x: p[0],
        y: p[1],
        dx: 0,
        dy: 0,
        dispatch
      }), d)) == null) return;

    dx = s.x - p[0] || 0;
    dy = s.y - p[1] || 0;

    return function gesture(type, event, touch) {
      var p0 = p, n;
      switch (type) {
        case "start": gestures[identifier] = gesture, n = active++; break;
        case "end": delete gestures[identifier], --active; // falls through
        case "drag": p = pointer(touch || event, container), n = active; break;
      }
      dispatch.call(
        type,
        that,
        new DragEvent(type, {
          sourceEvent: event,
          subject: s,
          target: drag,
          identifier,
          active: n,
          x: p[0] + dx,
          y: p[1] + dy,
          dx: p[0] - p0[0],
          dy: p[1] - p0[1],
          dispatch
        }),
        d
      );
    };
  }

  drag.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$2(!!_), drag) : filter;
  };

  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : constant$2(_), drag) : container;
  };

  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : constant$2(_), drag) : subject;
  };

  drag.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$2(!!_), drag) : touchable;
  };

  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };

  drag.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };

  return drag;
}

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var constant$1 = x => () => x;

function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
}

var interpolateRgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb$1(start, end) {
    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$1.gamma = rgbGamma;

  return rgb$1;
})(1);

function interpolateNumber(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function interpolateString(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

var degrees = 180 / Math.PI;

var identity$2 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity$2 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}

function parseSvg(value) {
  if (value == null) return identity$2;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

var epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

var interpolateZoom = (function zoomRho(rho, rho2, rho4) {

  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
        dx = ux1 - ux0,
        dy = uy1 - uy0,
        d2 = dx * dx + dy * dy,
        i,
        S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S,
            coshr0 = cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }

    i.duration = S * 1000 * rho / Math.SQRT2;

    return i;
  }

  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };

  return zoom;
})(Math.SQRT2, 2, 4);

var frame = 0, // is an animation frame pending?
    timeout$1 = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

function timeout(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(elapsed => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init$1(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return timeout(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

function interrupt(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}

function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}

function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

function transition_tween(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = get(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get(node, id).value[name];
  };
}

function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? interpolateNumber
      : b instanceof color ? interpolateRgb
      : (c = color(b)) ? (b = c, interpolateRgb)
      : interpolateString)(a, b);
}

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}

function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

function delayFunction(id, value) {
  return function() {
    init$1(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init$1(this, id).delay = value;
  };
}

function transition_delay(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : get(this.node(), id).delay;
}

function durationFunction(id, value) {
  return function() {
    set(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    set(this, id).duration = value;
  };
}

function transition_duration(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : get(this.node(), id).duration;
}

function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    set(this, id).ease = value;
  };
}

function transition_ease(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : get(this.node(), id).ease;
}

function easeVarying(id, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error;
    set(this, id).ease = v;
  };
}

function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error;
  return this.each(easeVarying(this._id, value));
}

function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
}

function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
}

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init$1 : set;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

function transition_on(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? get(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}

function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}

function transition_select(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
}

function transition_selectAll(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
}

var Selection = selection.prototype.constructor;

function transition_selection() {
  return new Selection(this._groups, this._parents);
}

function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function styleFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = set(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, styleRemove(name))
    : typeof value === "function" ? this
      .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, styleConstant(name, i, value), priority)
      .on("end.style." + name, null);
}

function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

function transition_text(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction(tweenValue(this, "text", value))
      : textConstant(value == null ? "" : value + ""));
}

function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, textTween(value));
}

function transition_transition() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
}

function transition_end() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = set(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}

var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function newId() {
  return ++id;
}

var selection_prototype = selection.prototype;

Transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  easeVarying: transition_easeVarying,
  end: transition_end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

function selection_transition(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;

var constant = x => () => x;

function ZoomEvent(type, {
  sourceEvent,
  target,
  transform,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    transform: {value: transform, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}

function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var identity$1 = new Transform(1, 0, 0);

transform.prototype = Transform.prototype;

function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity$1;
  return node.__zoom;
}

function nopropagation(event) {
  event.stopImmediatePropagation();
}

function noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// Ignore right-click, since that should open the context menu.
// except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === 'wheel') && !event.button;
}

function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}

function defaultTransform() {
  return this.__zoom || identity$1;
}

function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
}

function defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}

function zoom() {
  var filter = defaultFilter,
      extent = defaultExtent,
      constrain = defaultConstrain,
      wheelDelta = defaultWheelDelta,
      touchable = defaultTouchable,
      scaleExtent = [0, Infinity],
      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
      duration = 250,
      interpolate = interpolateZoom,
      listeners = dispatch("start", "zoom", "end"),
      touchstarting,
      touchfirst,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0,
      tapDistance = 10;

  function zoom(selection) {
    selection
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled, {passive: false})
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform, point, event) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform, point, event);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments)
          .event(event)
          .start()
          .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
          .end();
      });
    }
  };

  zoom.scaleBy = function(selection, k, p, event) {
    zoom.scaleTo(selection, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };

  zoom.scaleTo = function(selection, k, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };

  zoom.translateBy = function(selection, x, y, event) {
    zoom.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };

  zoom.translateTo = function(selection, x, y, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity$1.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    }, p, event);
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, point, event) {
    transition
        .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args).event(event),
              e = extent.apply(that, args),
              p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) t = b; // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args, clean) {
    return (!clean && that.__zooming) || new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }

  Gesture.prototype = {
    event: function(event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      var d = select(this.that).datum();
      listeners.call(
        type,
        this.that,
        new ZoomEvent(type, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          type,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };

  function wheeled(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, args).event(event),
        t = this.__zoom,
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = pointer(event);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }

    noevent(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned(event, ...args) {
    if (touchending || !filter.apply(this, arguments)) return;
    var currentTarget = event.currentTarget,
        g = gesture(this, args, true).event(event),
        v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = pointer(event, currentTarget),
        x0 = event.clientX,
        y0 = event.clientY;

    dragDisable(event.view);
    nopropagation(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();

    function mousemoved(event) {
      noevent(event);
      if (!g.moved) {
        var dx = event.clientX - x0, dy = event.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event)
       .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped(event) {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event.view, g.moved);
      noevent(event);
      g.event(event).end();
    }
  }

  function dblclicked(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
        p1 = t0.invert(p0),
        k1 = t0.k * (event.shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

    noevent(event);
    if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
    else select(this).call(zoom.transform, t1, p0, event);
  }

  function touchstarted(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var touches = event.touches,
        n = touches.length,
        g = gesture(this, args, event.changedTouches.length === n).event(event),
        started, i, t, p;

    nopropagation(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }

    if (touchstarting) touchstarting = clearTimeout(touchstarting);

    if (started) {
      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      interrupt(this);
      g.start();
    }
  }

  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t, p, l;

    noevent(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;

    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t;

    nopropagation(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
      if (g.taps === 2) {
        t = pointer(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
  };

  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };

  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };

  zoom.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
  };

  return zoom;
}

const errorMessages = {
    error001: () => '[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001',
    error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
    error003: (nodeType) => `Node type "${nodeType}" not found. Using fallback type "default".`,
    error004: () => 'The React Flow parent container needs a width and a height to render the graph.',
    error005: () => 'Only child nodes can use a parent extent.',
    error006: () => "Can't create edge. An edge needs a source and a target.",
    error007: (id) => `The old edge with id=${id} does not exist.`,
    error009: (type) => `Marker type "${type}" doesn't exist.`,
    error008: (handleType, { id, sourceHandle, targetHandle }) => `Couldn't create edge for ${handleType} handle id: "${!sourceHandle ? sourceHandle : targetHandle}", edge id: ${id}.`,
    error010: () => 'Handle: No node id found. Make sure to only use a Handle inside a custom Node.',
    error011: (edgeType) => `Edge type "${edgeType}" not found. Using fallback type "default".`,
    error012: (id) => `Node with id "${id}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
    error013: (lib = 'react') => `It seems that you haven't loaded the styles. Please import '@xyflow/${lib}/dist/style.css' or base.css to make sure everything is working properly.`,
};
const infiniteExtent = [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
];
const elementSelectionKeys = ['Enter', ' ', 'Escape'];

var ConnectionMode;
(function (ConnectionMode) {
    ConnectionMode["Strict"] = "strict";
    ConnectionMode["Loose"] = "loose";
})(ConnectionMode || (ConnectionMode = {}));
var PanOnScrollMode;
(function (PanOnScrollMode) {
    PanOnScrollMode["Free"] = "free";
    PanOnScrollMode["Vertical"] = "vertical";
    PanOnScrollMode["Horizontal"] = "horizontal";
})(PanOnScrollMode || (PanOnScrollMode = {}));
var SelectionMode;
(function (SelectionMode) {
    SelectionMode["Partial"] = "partial";
    SelectionMode["Full"] = "full";
})(SelectionMode || (SelectionMode = {}));
const initialConnection = {
    inProgress: false,
    isValid: null,
    from: null,
    fromHandle: null,
    fromPosition: null,
    fromNode: null,
    to: null,
    toHandle: null,
    toPosition: null,
    toNode: null,
};

var ConnectionLineType;
(function (ConnectionLineType) {
    ConnectionLineType["Bezier"] = "default";
    ConnectionLineType["Straight"] = "straight";
    ConnectionLineType["Step"] = "step";
    ConnectionLineType["SmoothStep"] = "smoothstep";
    ConnectionLineType["SimpleBezier"] = "simplebezier";
})(ConnectionLineType || (ConnectionLineType = {}));
var MarkerType;
(function (MarkerType) {
    MarkerType["Arrow"] = "arrow";
    MarkerType["ArrowClosed"] = "arrowclosed";
})(MarkerType || (MarkerType = {}));

var Position;
(function (Position) {
    Position["Left"] = "left";
    Position["Top"] = "top";
    Position["Right"] = "right";
    Position["Bottom"] = "bottom";
})(Position || (Position = {}));
const oppositePosition = {
    [Position.Left]: Position.Right,
    [Position.Right]: Position.Left,
    [Position.Top]: Position.Bottom,
    [Position.Bottom]: Position.Top,
};
function getConnectionStatus(isValid) {
    return isValid === null ? null : isValid ? 'valid' : 'invalid';
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Test whether an object is useable as an Edge
 * @public
 * @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Edge if it returns true
 * @param element - The element to test
 * @returns A boolean indicating whether the element is an Edge
 */
const isEdgeBase = (element) => 'id' in element && 'source' in element && 'target' in element;
/**
 * Test whether an object is useable as a Node
 * @public
 * @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Node if it returns true
 * @param element - The element to test
 * @returns A boolean indicating whether the element is an Node
 */
const isNodeBase = (element) => 'id' in element && 'position' in element && !('source' in element) && !('target' in element);
const isInternalNodeBase = (element) => 'id' in element && 'internals' in element && !('source' in element) && !('target' in element);
/**
 * Pass in a node, and get connected nodes where edge.source === node.id
 * @public
 * @param node - The node to get the connected nodes from
 * @param nodes - The array of all nodes
 * @param edges - The array of all edges
 * @returns An array of nodes that are connected over eges where the source is the given node
 */
const getOutgoers = (node, nodes, edges) => {
    if (!node.id) {
        return [];
    }
    const outgoerIds = new Set();
    edges.forEach((edge) => {
        if (edge.source === node.id) {
            outgoerIds.add(edge.target);
        }
    });
    return nodes.filter((n) => outgoerIds.has(n.id));
};
/**
 * Pass in a node, and get connected nodes where edge.target === node.id
 * @public
 * @param node - The node to get the connected nodes from
 * @param nodes - The array of all nodes
 * @param edges - The array of all edges
 * @returns An array of nodes that are connected over eges where the target is the given node
 */
const getIncomers = (node, nodes, edges) => {
    if (!node.id) {
        return [];
    }
    const incomersIds = new Set();
    edges.forEach((edge) => {
        if (edge.target === node.id) {
            incomersIds.add(edge.source);
        }
    });
    return nodes.filter((n) => incomersIds.has(n.id));
};
const getNodePositionWithOrigin = (node, nodeOrigin = [0, 0]) => {
    const { width, height } = getNodeDimensions(node);
    const origin = node.origin ?? nodeOrigin;
    const offsetX = width * origin[0];
    const offsetY = height * origin[1];
    return {
        x: node.position.x - offsetX,
        y: node.position.y - offsetY,
    };
};
/**
 * Determines a bounding box that contains all given nodes in an array
 * @internal
 */
const getInternalNodesBounds = (nodeLookup, params = {}) => {
    if (nodeLookup.size === 0) {
        return { x: 0, y: 0, width: 0, height: 0 };
    }
    let box = { x: Infinity, y: Infinity, x2: -Infinity, y2: -Infinity };
    nodeLookup.forEach((node) => {
        if (params.filter === undefined || params.filter(node)) {
            const nodeBox = nodeToBox(node);
            box = getBoundsOfBoxes(box, nodeBox);
        }
    });
    return boxToRect(box);
};
const getNodesInside = (nodes, rect, [tx, ty, tScale] = [0, 0, 1], partially = false, 
// set excludeNonSelectableNodes if you want to pay attention to the nodes "selectable" attribute
excludeNonSelectableNodes = false) => {
    const paneRect = {
        ...pointToRendererPoint(rect, [tx, ty, tScale]),
        width: rect.width / tScale,
        height: rect.height / tScale,
    };
    const visibleNodes = [];
    for (const [, node] of nodes) {
        const { measured, selectable = true, hidden = false } = node;
        const width = measured.width ?? node.width ?? node.initialWidth ?? null;
        const height = measured.height ?? node.height ?? node.initialHeight ?? null;
        if ((excludeNonSelectableNodes && !selectable) || hidden) {
            continue;
        }
        const overlappingArea = getOverlappingArea(paneRect, nodeToRect(node));
        const notInitialized = width === null || height === null;
        const partiallyVisible = partially && overlappingArea > 0;
        const area = (width ?? 0) * (height ?? 0);
        const isVisible = notInitialized || partiallyVisible || overlappingArea >= area;
        if (isVisible || node.dragging) {
            visibleNodes.push(node);
        }
    }
    return visibleNodes;
};
/**
 * Get all connecting edges for a given set of nodes
 * @param nodes - Nodes you want to get the connected edges for
 * @param edges - All edges
 * @returns Array of edges that connect any of the given nodes with each other
 */
const getConnectedEdges = (nodes, edges) => {
    const nodeIds = new Set();
    nodes.forEach((node) => {
        nodeIds.add(node.id);
    });
    return edges.filter((edge) => nodeIds.has(edge.source) || nodeIds.has(edge.target));
};
function getFitViewNodes(nodeLookup, options) {
    const fitViewNodes = new Map();
    const optionNodeIds = options?.nodes ? new Set(options.nodes.map((node) => node.id)) : null;
    nodeLookup.forEach((n) => {
        const isVisible = n.measured.width && n.measured.height && (options?.includeHiddenNodes || !n.hidden);
        if (isVisible && (!optionNodeIds || optionNodeIds.has(n.id))) {
            fitViewNodes.set(n.id, n);
        }
    });
    return fitViewNodes;
}
async function fitView({ nodes, width, height, panZoom, minZoom, maxZoom }, options) {
    if (nodes.size === 0) {
        return Promise.resolve(false);
    }
    const bounds = getInternalNodesBounds(nodes);
    const viewport = getViewportForBounds(bounds, width, height, options?.minZoom ?? minZoom, options?.maxZoom ?? maxZoom, options?.padding ?? 0.1);
    await panZoom.setViewport(viewport, { duration: options?.duration });
    return Promise.resolve(true);
}
/**
 * This function clamps the passed extend by the node's width and height.
 * This is needed to prevent the node from being dragged outside of its extent.
 *
 * @param node
 * @param extent
 * @returns
 */
function clampNodeExtent(node, extent) {
    if (!extent || extent === 'parent') {
        return extent;
    }
    return [extent[0], [extent[1][0] - (node.measured?.width ?? 0), extent[1][1] - (node.measured?.height ?? 0)]];
}
/**
 * This function calculates the next position of a node, taking into account the node's extent, parent node, and origin.
 *
 * @internal
 * @returns position, positionAbsolute
 */
function calculateNodePosition({ nodeId, nextPosition, nodeLookup, nodeOrigin = [0, 0], nodeExtent, onError, }) {
    const node = nodeLookup.get(nodeId);
    const parentNode = node.parentId ? nodeLookup.get(node.parentId) : undefined;
    const { x: parentX, y: parentY } = parentNode ? parentNode.internals.positionAbsolute : { x: 0, y: 0 };
    const origin = node.origin ?? nodeOrigin;
    let currentExtent = clampNodeExtent(node, node.extent || nodeExtent);
    if (node.extent === 'parent' && !node.expandParent) {
        if (!parentNode) {
            onError?.('005', errorMessages['error005']());
        }
        else {
            const nodeWidth = node.measured.width;
            const nodeHeight = node.measured.height;
            const parentWidth = parentNode.measured.width;
            const parentHeight = parentNode.measured.height;
            if (nodeWidth && nodeHeight && parentWidth && parentHeight) {
                currentExtent = [
                    [parentX, parentY],
                    [parentX + parentWidth - nodeWidth, parentY + parentHeight - nodeHeight],
                ];
            }
        }
    }
    else if (parentNode && isCoordinateExtent(node.extent)) {
        currentExtent = [
            [node.extent[0][0] + parentX, node.extent[0][1] + parentY],
            [node.extent[1][0] + parentX, node.extent[1][1] + parentY],
        ];
    }
    const positionAbsolute = isCoordinateExtent(currentExtent)
        ? clampPosition(nextPosition, currentExtent)
        : nextPosition;
    return {
        position: {
            // TODO: is there a better way to do this?
            x: positionAbsolute.x - parentX + node.measured.width * origin[0],
            y: positionAbsolute.y - parentY + node.measured.height * origin[1],
        },
        positionAbsolute,
    };
}
/**
 * Pass in nodes & edges to delete, get arrays of nodes and edges that actually can be deleted
 * @internal
 * @param param.nodesToRemove - The nodes to remove
 * @param param.edgesToRemove - The edges to remove
 * @param param.nodes - All nodes
 * @param param.edges - All edges
 * @param param.onBeforeDelete - Callback to check which nodes and edges can be deleted
 * @returns nodes: nodes that can be deleted, edges: edges that can be deleted
 */
async function getElementsToRemove({ nodesToRemove = [], edgesToRemove = [], nodes, edges, onBeforeDelete, }) {
    const nodeIds = new Set(nodesToRemove.map((node) => node.id));
    const matchingNodes = [];
    for (const node of nodes) {
        if (node.deletable === false) {
            continue;
        }
        const isIncluded = nodeIds.has(node.id);
        const parentHit = !isIncluded && node.parentId && matchingNodes.find((n) => n.id === node.parentId);
        if (isIncluded || parentHit) {
            matchingNodes.push(node);
        }
    }
    const edgeIds = new Set(edgesToRemove.map((edge) => edge.id));
    const deletableEdges = edges.filter((edge) => edge.deletable !== false);
    const connectedEdges = getConnectedEdges(matchingNodes, deletableEdges);
    const matchingEdges = connectedEdges;
    for (const edge of deletableEdges) {
        const isIncluded = edgeIds.has(edge.id);
        if (isIncluded && !matchingEdges.find((e) => e.id === edge.id)) {
            matchingEdges.push(edge);
        }
    }
    if (!onBeforeDelete) {
        return {
            edges: matchingEdges,
            nodes: matchingNodes,
        };
    }
    const onBeforeDeleteResult = await onBeforeDelete({
        nodes: matchingNodes,
        edges: matchingEdges,
    });
    if (typeof onBeforeDeleteResult === 'boolean') {
        return onBeforeDeleteResult ? { edges: matchingEdges, nodes: matchingNodes } : { edges: [], nodes: [] };
    }
    return onBeforeDeleteResult;
}

const clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);
const clampPosition = (position = { x: 0, y: 0 }, extent) => ({
    x: clamp(position.x, extent[0][0], extent[1][0]),
    y: clamp(position.y, extent[0][1], extent[1][1]),
});
/**
 * Calculates the velocity of panning when the mouse is close to the edge of the canvas
 * @internal
 * @param value - One dimensional poition of the mouse (x or y)
 * @param min - Minimal position on canvas before panning starts
 * @param max - Maximal position on canvas before panning starts
 * @returns - A number between 0 and 1 that represents the velocity of panning
 */
const calcAutoPanVelocity = (value, min, max) => {
    if (value < min) {
        return clamp(Math.abs(value - min), 1, min) / min;
    }
    else if (value > max) {
        return -clamp(Math.abs(value - max), 1, min) / min;
    }
    return 0;
};
const calcAutoPan = (pos, bounds, speed = 15, distance = 40) => {
    const xMovement = calcAutoPanVelocity(pos.x, distance, bounds.width - distance) * speed;
    const yMovement = calcAutoPanVelocity(pos.y, distance, bounds.height - distance) * speed;
    return [xMovement, yMovement];
};
const getBoundsOfBoxes = (box1, box2) => ({
    x: Math.min(box1.x, box2.x),
    y: Math.min(box1.y, box2.y),
    x2: Math.max(box1.x2, box2.x2),
    y2: Math.max(box1.y2, box2.y2),
});
const rectToBox = ({ x, y, width, height }) => ({
    x,
    y,
    x2: x + width,
    y2: y + height,
});
const boxToRect = ({ x, y, x2, y2 }) => ({
    x,
    y,
    width: x2 - x,
    height: y2 - y,
});
const nodeToRect = (node, nodeOrigin = [0, 0]) => {
    const { x, y } = isInternalNodeBase(node)
        ? node.internals.positionAbsolute
        : getNodePositionWithOrigin(node, nodeOrigin);
    return {
        x,
        y,
        width: node.measured?.width ?? node.width ?? node.initialWidth ?? 0,
        height: node.measured?.height ?? node.height ?? node.initialHeight ?? 0,
    };
};
const nodeToBox = (node, nodeOrigin = [0, 0]) => {
    const { x, y } = isInternalNodeBase(node)
        ? node.internals.positionAbsolute
        : getNodePositionWithOrigin(node, nodeOrigin);
    return {
        x,
        y,
        x2: x + (node.measured?.width ?? node.width ?? node.initialWidth ?? 0),
        y2: y + (node.measured?.height ?? node.height ?? node.initialHeight ?? 0),
    };
};
const getBoundsOfRects = (rect1, rect2) => boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)));
const getOverlappingArea = (rectA, rectB) => {
    const xOverlap = Math.max(0, Math.min(rectA.x + rectA.width, rectB.x + rectB.width) - Math.max(rectA.x, rectB.x));
    const yOverlap = Math.max(0, Math.min(rectA.y + rectA.height, rectB.y + rectB.height) - Math.max(rectA.y, rectB.y));
    return Math.ceil(xOverlap * yOverlap);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRectObject = (obj) => isNumeric(obj.width) && isNumeric(obj.height) && isNumeric(obj.x) && isNumeric(obj.y);
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const isNumeric = (n) => !isNaN(n) && isFinite(n);
// used for a11y key board controls for nodes and edges
const devWarn = (id, message) => {
};
const snapPosition = (position, snapGrid = [1, 1]) => {
    return {
        x: snapGrid[0] * Math.round(position.x / snapGrid[0]),
        y: snapGrid[1] * Math.round(position.y / snapGrid[1]),
    };
};
const pointToRendererPoint = ({ x, y }, [tx, ty, tScale], snapToGrid = false, snapGrid = [1, 1]) => {
    const position = {
        x: (x - tx) / tScale,
        y: (y - ty) / tScale,
    };
    return snapToGrid ? snapPosition(position, snapGrid) : position;
};
const rendererPointToPoint = ({ x, y }, [tx, ty, tScale]) => {
    return {
        x: x * tScale + tx,
        y: y * tScale + ty,
    };
};
/**
 * Returns a viewport that encloses the given bounds with optional padding.
 * @public
 * @remarks You can determine bounds of nodes with {@link getNodesBounds} and {@link getBoundsOfRects}
 * @param bounds - Bounds to fit inside viewport
 * @param width - Width of the viewport
 * @param height  - Height of the viewport
 * @param minZoom - Minimum zoom level of the resulting viewport
 * @param maxZoom - Maximum zoom level of the resulting viewport
 * @param padding - Optional padding around the bounds
 * @returns A transforned {@link Viewport} that encloses the given bounds which you can pass to e.g. {@link setViewport}
 * @example
 * const { x, y, zoom } = getViewportForBounds(
  { x: 0, y: 0, width: 100, height: 100},
  1200, 800, 0.5, 2);
 */
const getViewportForBounds = (bounds, width, height, minZoom, maxZoom, padding) => {
    const xZoom = width / (bounds.width * (1 + padding));
    const yZoom = height / (bounds.height * (1 + padding));
    const zoom = Math.min(xZoom, yZoom);
    const clampedZoom = clamp(zoom, minZoom, maxZoom);
    const boundsCenterX = bounds.x + bounds.width / 2;
    const boundsCenterY = bounds.y + bounds.height / 2;
    const x = width / 2 - boundsCenterX * clampedZoom;
    const y = height / 2 - boundsCenterY * clampedZoom;
    return { x, y, zoom: clampedZoom };
};
const isMacOs = () => typeof navigator !== 'undefined' && navigator?.userAgent?.indexOf('Mac') >= 0;
function isCoordinateExtent(extent) {
    return extent !== undefined && extent !== 'parent';
}
function getNodeDimensions(node) {
    return {
        width: node.measured?.width ?? node.width ?? node.initialWidth ?? 0,
        height: node.measured?.height ?? node.height ?? node.initialHeight ?? 0,
    };
}
function nodeHasDimensions(node) {
    return ((node.measured?.width ?? node.width ?? node.initialWidth) !== undefined &&
        (node.measured?.height ?? node.height ?? node.initialHeight) !== undefined);
}
/**
 * Convert child position to aboslute position
 *
 * @internal
 * @param position
 * @param parentId
 * @param nodeLookup
 * @param nodeOrigin
 * @returns an internal node with an absolute position
 */
function evaluateAbsolutePosition(position, dimensions = { width: 0, height: 0 }, parentId, nodeLookup, nodeOrigin) {
    let nextParentId = parentId;
    const positionAbsolute = { ...position };
    while (nextParentId) {
        const parent = nodeLookup.get(nextParentId);
        nextParentId = parent?.parentId;
        if (parent) {
            const origin = parent.origin || nodeOrigin;
            positionAbsolute.x += parent.internals.positionAbsolute.x - (dimensions.width ?? 0) * origin[0];
            positionAbsolute.y += parent.internals.positionAbsolute.y - (dimensions.height ?? 0) * origin[1];
        }
    }
    return positionAbsolute;
}

function getPointerPosition(event, { snapGrid = [0, 0], snapToGrid = false, transform }) {
    const { x, y } = getEventPosition(event);
    const pointerPos = pointToRendererPoint({ x, y }, transform);
    const { x: xSnapped, y: ySnapped } = snapToGrid ? snapPosition(pointerPos, snapGrid) : pointerPos;
    // we need the snapped position in order to be able to skip unnecessary drag events
    return {
        xSnapped,
        ySnapped,
        ...pointerPos,
    };
}
const getDimensions = (node) => ({
    width: node.offsetWidth,
    height: node.offsetHeight,
});
const getHostForElement = (element) => element.getRootNode?.() || window?.document;
const inputTags = ['INPUT', 'SELECT', 'TEXTAREA'];
function isInputDOMNode(event) {
    // using composed path for handling shadow dom
    const target = (event.composedPath?.()?.[0] || event.target);
    const isInput = inputTags.includes(target?.nodeName) || target?.hasAttribute('contenteditable');
    // when an input field is focused we don't want to trigger deletion or movement of nodes
    return isInput || !!target?.closest('.nokey');
}
const isMouseEvent = (event) => 'clientX' in event;
const getEventPosition = (event, bounds) => {
    const isMouse = isMouseEvent(event);
    const evtX = isMouse ? event.clientX : event.touches?.[0].clientX;
    const evtY = isMouse ? event.clientY : event.touches?.[0].clientY;
    return {
        x: evtX - (bounds?.left ?? 0),
        y: evtY - (bounds?.top ?? 0),
    };
};
// The handle bounds are calculated relative to the node element.
// We store them in the internals object of the node in order to avoid
// unnecessary recalculations.
const getHandleBounds = (type, nodeElement, nodeBounds, zoom, nodeId) => {
    const handles = nodeElement.querySelectorAll(`.${type}`);
    if (!handles || !handles.length) {
        return null;
    }
    return Array.from(handles).map((handle) => {
        const handleBounds = handle.getBoundingClientRect();
        return {
            id: handle.getAttribute('data-handleid'),
            type,
            nodeId,
            position: handle.getAttribute('data-handlepos'),
            x: (handleBounds.left - nodeBounds.left) / zoom,
            y: (handleBounds.top - nodeBounds.top) / zoom,
            ...getDimensions(handle),
        };
    });
};

function getBezierEdgeCenter({ sourceX, sourceY, targetX, targetY, sourceControlX, sourceControlY, targetControlX, targetControlY, }) {
    // cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
    // https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve
    const centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;
    const centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
    const offsetX = Math.abs(centerX - sourceX);
    const offsetY = Math.abs(centerY - sourceY);
    return [centerX, centerY, offsetX, offsetY];
}
function calculateControlOffset(distance, curvature) {
    if (distance >= 0) {
        return 0.5 * distance;
    }
    return curvature * 25 * Math.sqrt(-distance);
}
function getControlWithCurvature({ pos, x1, y1, x2, y2, c }) {
    switch (pos) {
        case Position.Left:
            return [x1 - calculateControlOffset(x1 - x2, c), y1];
        case Position.Right:
            return [x1 + calculateControlOffset(x2 - x1, c), y1];
        case Position.Top:
            return [x1, y1 - calculateControlOffset(y1 - y2, c)];
        case Position.Bottom:
            return [x1, y1 + calculateControlOffset(y2 - y1, c)];
    }
}
/**
 * Get a bezier path from source to target handle
 * @param params.sourceX - The x position of the source handle
 * @param params.sourceY - The y position of the source handle
 * @param params.sourcePosition - The position of the source handle (default: Position.Bottom)
 * @param params.targetX - The x position of the target handle
 * @param params.targetY - The y position of the target handle
 * @param params.targetPosition - The position of the target handle (default: Position.Top)
 * @param params.curvature - The curvature of the bezier edge
 * @returns A path string you can use in an SVG, the labelX and labelY position (center of path) and offsetX, offsetY between source handle and label
 * @example
 *  const source = { x: 0, y: 20 };
    const target = { x: 150, y: 100 };
    
    const [path, labelX, labelY, offsetX, offsetY] = getBezierPath({
      sourceX: source.x,
      sourceY: source.y,
      sourcePosition: Position.Right,
      targetX: target.x,
      targetY: target.y,
      targetPosition: Position.Left,
});
 */
function getBezierPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = 0.25, }) {
    const [sourceControlX, sourceControlY] = getControlWithCurvature({
        pos: sourcePosition,
        x1: sourceX,
        y1: sourceY,
        x2: targetX,
        y2: targetY,
        c: curvature,
    });
    const [targetControlX, targetControlY] = getControlWithCurvature({
        pos: targetPosition,
        x1: targetX,
        y1: targetY,
        x2: sourceX,
        y2: sourceY,
        c: curvature,
    });
    const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourceControlX,
        sourceControlY,
        targetControlX,
        targetControlY,
    });
    return [
        `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
        labelX,
        labelY,
        offsetX,
        offsetY,
    ];
}

// this is used for straight edges and simple smoothstep edges (LTR, RTL, BTT, TTB)
function getEdgeCenter({ sourceX, sourceY, targetX, targetY, }) {
    const xOffset = Math.abs(targetX - sourceX) / 2;
    const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
    const yOffset = Math.abs(targetY - sourceY) / 2;
    const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
    return [centerX, centerY, xOffset, yOffset];
}
function getElevatedEdgeZIndex({ sourceNode, targetNode, selected = false, zIndex = 0, elevateOnSelect = false, }) {
    if (!elevateOnSelect) {
        return zIndex;
    }
    const edgeOrConnectedNodeSelected = selected || targetNode.selected || sourceNode.selected;
    const selectedZIndex = Math.max(sourceNode.internals.z || 0, targetNode.internals.z || 0, 1000);
    return zIndex + (edgeOrConnectedNodeSelected ? selectedZIndex : 0);
}
function isEdgeVisible({ sourceNode, targetNode, width, height, transform }) {
    const edgeBox = getBoundsOfBoxes(nodeToBox(sourceNode), nodeToBox(targetNode));
    if (edgeBox.x === edgeBox.x2) {
        edgeBox.x2 += 1;
    }
    if (edgeBox.y === edgeBox.y2) {
        edgeBox.y2 += 1;
    }
    const viewRect = {
        x: -transform[0] / transform[2],
        y: -transform[1] / transform[2],
        width: width / transform[2],
        height: height / transform[2],
    };
    return getOverlappingArea(viewRect, boxToRect(edgeBox)) > 0;
}
const getEdgeId = ({ source, sourceHandle, target, targetHandle }) => `xy-edge__${source}${sourceHandle || ''}-${target}${targetHandle || ''}`;
const connectionExists = (edge, edges) => {
    return edges.some((el) => el.source === edge.source &&
        el.target === edge.target &&
        (el.sourceHandle === edge.sourceHandle || (!el.sourceHandle && !edge.sourceHandle)) &&
        (el.targetHandle === edge.targetHandle || (!el.targetHandle && !edge.targetHandle)));
};
/**
 * This util is a convenience function to add a new Edge to an array of edges
 * @remarks It also performs some validation to make sure you don't add an invalid edge or duplicate an existing one.
 * @public
 * @param edgeParams - Either an Edge or a Connection you want to add
 * @param edges -  The array of all current edges
 * @returns A new array of edges with the new edge added
 */
const addEdge = (edgeParams, edges) => {
    if (!edgeParams.source || !edgeParams.target) {
        return edges;
    }
    let edge;
    if (isEdgeBase(edgeParams)) {
        edge = { ...edgeParams };
    }
    else {
        edge = {
            ...edgeParams,
            id: getEdgeId(edgeParams),
        };
    }
    if (connectionExists(edge, edges)) {
        return edges;
    }
    if (edge.sourceHandle === null) {
        delete edge.sourceHandle;
    }
    if (edge.targetHandle === null) {
        delete edge.targetHandle;
    }
    return edges.concat(edge);
};

/**
 * Get a straight path from source to target handle
 * @param params.sourceX - The x position of the source handle
 * @param params.sourceY - The y position of the source handle
 * @param params.targetX - The x position of the target handle
 * @param params.targetY - The y position of the target handle
 * @returns A path string you can use in an SVG, the labelX and labelY position (center of path) and offsetX, offsetY between source handle and label
 * @example
 *  const source = { x: 0, y: 20 };
    const target = { x: 150, y: 100 };
    
    const [path, labelX, labelY, offsetX, offsetY] = getStraightPath({
      sourceX: source.x,
      sourceY: source.y,
      sourcePosition: Position.Right,
      targetX: target.x,
      targetY: target.y,
      targetPosition: Position.Left,
    });
 */
function getStraightPath({ sourceX, sourceY, targetX, targetY, }) {
    const [labelX, labelY, offsetX, offsetY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    return [`M ${sourceX},${sourceY}L ${targetX},${targetY}`, labelX, labelY, offsetX, offsetY];
}

const handleDirections = {
    [Position.Left]: { x: -1, y: 0 },
    [Position.Right]: { x: 1, y: 0 },
    [Position.Top]: { x: 0, y: -1 },
    [Position.Bottom]: { x: 0, y: 1 },
};
const getDirection = ({ source, sourcePosition = Position.Bottom, target, }) => {
    if (sourcePosition === Position.Left || sourcePosition === Position.Right) {
        return source.x < target.x ? { x: 1, y: 0 } : { x: -1, y: 0 };
    }
    return source.y < target.y ? { x: 0, y: 1 } : { x: 0, y: -1 };
};
const distance$1 = (a, b) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
// ith this function we try to mimic a orthogonal edge routing behaviour
// It's not as good as a real orthogonal edge routing but it's faster and good enough as a default for step and smooth step edges
function getPoints({ source, sourcePosition = Position.Bottom, target, targetPosition = Position.Top, center, offset, }) {
    const sourceDir = handleDirections[sourcePosition];
    const targetDir = handleDirections[targetPosition];
    const sourceGapped = { x: source.x + sourceDir.x * offset, y: source.y + sourceDir.y * offset };
    const targetGapped = { x: target.x + targetDir.x * offset, y: target.y + targetDir.y * offset };
    const dir = getDirection({
        source: sourceGapped,
        sourcePosition,
        target: targetGapped,
    });
    const dirAccessor = dir.x !== 0 ? 'x' : 'y';
    const currDir = dir[dirAccessor];
    let points = [];
    let centerX, centerY;
    const sourceGapOffset = { x: 0, y: 0 };
    const targetGapOffset = { x: 0, y: 0 };
    const [defaultCenterX, defaultCenterY, defaultOffsetX, defaultOffsetY] = getEdgeCenter({
        sourceX: source.x,
        sourceY: source.y,
        targetX: target.x,
        targetY: target.y,
    });
    // opposite handle positions, default case
    if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
        centerX = center.x ?? defaultCenterX;
        centerY = center.y ?? defaultCenterY;
        //    --->
        //    |
        // >---
        const verticalSplit = [
            { x: centerX, y: sourceGapped.y },
            { x: centerX, y: targetGapped.y },
        ];
        //    |
        //  ---
        //  |
        const horizontalSplit = [
            { x: sourceGapped.x, y: centerY },
            { x: targetGapped.x, y: centerY },
        ];
        if (sourceDir[dirAccessor] === currDir) {
            points = dirAccessor === 'x' ? verticalSplit : horizontalSplit;
        }
        else {
            points = dirAccessor === 'x' ? horizontalSplit : verticalSplit;
        }
    }
    else {
        // sourceTarget means we take x from source and y from target, targetSource is the opposite
        const sourceTarget = [{ x: sourceGapped.x, y: targetGapped.y }];
        const targetSource = [{ x: targetGapped.x, y: sourceGapped.y }];
        // this handles edges with same handle positions
        if (dirAccessor === 'x') {
            points = sourceDir.x === currDir ? targetSource : sourceTarget;
        }
        else {
            points = sourceDir.y === currDir ? sourceTarget : targetSource;
        }
        if (sourcePosition === targetPosition) {
            const diff = Math.abs(source[dirAccessor] - target[dirAccessor]);
            // if an edge goes from right to right for example (sourcePosition === targetPosition) and the distance between source.x and target.x is less than the offset, the added point and the gapped source/target will overlap. This leads to a weird edge path. To avoid this we add a gapOffset to the source/target
            if (diff <= offset) {
                const gapOffset = Math.min(offset - 1, offset - diff);
                if (sourceDir[dirAccessor] === currDir) {
                    sourceGapOffset[dirAccessor] = (sourceGapped[dirAccessor] > source[dirAccessor] ? -1 : 1) * gapOffset;
                }
                else {
                    targetGapOffset[dirAccessor] = (targetGapped[dirAccessor] > target[dirAccessor] ? -1 : 1) * gapOffset;
                }
            }
        }
        // these are conditions for handling mixed handle positions like Right -> Bottom for example
        if (sourcePosition !== targetPosition) {
            const dirAccessorOpposite = dirAccessor === 'x' ? 'y' : 'x';
            const isSameDir = sourceDir[dirAccessor] === targetDir[dirAccessorOpposite];
            const sourceGtTargetOppo = sourceGapped[dirAccessorOpposite] > targetGapped[dirAccessorOpposite];
            const sourceLtTargetOppo = sourceGapped[dirAccessorOpposite] < targetGapped[dirAccessorOpposite];
            const flipSourceTarget = (sourceDir[dirAccessor] === 1 && ((!isSameDir && sourceGtTargetOppo) || (isSameDir && sourceLtTargetOppo))) ||
                (sourceDir[dirAccessor] !== 1 && ((!isSameDir && sourceLtTargetOppo) || (isSameDir && sourceGtTargetOppo)));
            if (flipSourceTarget) {
                points = dirAccessor === 'x' ? sourceTarget : targetSource;
            }
        }
        const sourceGapPoint = { x: sourceGapped.x + sourceGapOffset.x, y: sourceGapped.y + sourceGapOffset.y };
        const targetGapPoint = { x: targetGapped.x + targetGapOffset.x, y: targetGapped.y + targetGapOffset.y };
        const maxXDistance = Math.max(Math.abs(sourceGapPoint.x - points[0].x), Math.abs(targetGapPoint.x - points[0].x));
        const maxYDistance = Math.max(Math.abs(sourceGapPoint.y - points[0].y), Math.abs(targetGapPoint.y - points[0].y));
        // we want to place the label on the longest segment of the edge
        if (maxXDistance >= maxYDistance) {
            centerX = (sourceGapPoint.x + targetGapPoint.x) / 2;
            centerY = points[0].y;
        }
        else {
            centerX = points[0].x;
            centerY = (sourceGapPoint.y + targetGapPoint.y) / 2;
        }
    }
    const pathPoints = [
        source,
        { x: sourceGapped.x + sourceGapOffset.x, y: sourceGapped.y + sourceGapOffset.y },
        ...points,
        { x: targetGapped.x + targetGapOffset.x, y: targetGapped.y + targetGapOffset.y },
        target,
    ];
    return [pathPoints, centerX, centerY, defaultOffsetX, defaultOffsetY];
}
function getBend(a, b, c, size) {
    const bendSize = Math.min(distance$1(a, b) / 2, distance$1(b, c) / 2, size);
    const { x, y } = b;
    // no bend
    if ((a.x === x && x === c.x) || (a.y === y && y === c.y)) {
        return `L${x} ${y}`;
    }
    // first segment is horizontal
    if (a.y === y) {
        const xDir = a.x < c.x ? -1 : 1;
        const yDir = a.y < c.y ? 1 : -1;
        return `L ${x + bendSize * xDir},${y}Q ${x},${y} ${x},${y + bendSize * yDir}`;
    }
    const xDir = a.x < c.x ? 1 : -1;
    const yDir = a.y < c.y ? -1 : 1;
    return `L ${x},${y + bendSize * yDir}Q ${x},${y} ${x + bendSize * xDir},${y}`;
}
/**
 * Get a smooth step path from source to target handle
 * @param params.sourceX - The x position of the source handle
 * @param params.sourceY - The y position of the source handle
 * @param params.sourcePosition - The position of the source handle (default: Position.Bottom)
 * @param params.targetX - The x position of the target handle
 * @param params.targetY - The y position of the target handle
 * @param params.targetPosition - The position of the target handle (default: Position.Top)
 * @returns A path string you can use in an SVG, the labelX and labelY position (center of path) and offsetX, offsetY between source handle and label
 * @example
 *  const source = { x: 0, y: 20 };
    const target = { x: 150, y: 100 };
    
    const [path, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({
      sourceX: source.x,
      sourceY: source.y,
      sourcePosition: Position.Right,
      targetX: target.x,
      targetY: target.y,
      targetPosition: Position.Left,
    });
 */
function getSmoothStepPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, borderRadius = 5, centerX, centerY, offset = 20, }) {
    const [points, labelX, labelY, offsetX, offsetY] = getPoints({
        source: { x: sourceX, y: sourceY },
        sourcePosition,
        target: { x: targetX, y: targetY },
        targetPosition,
        center: { x: centerX, y: centerY },
        offset,
    });
    const path = points.reduce((res, p, i) => {
        let segment = '';
        if (i > 0 && i < points.length - 1) {
            segment = getBend(points[i - 1], p, points[i + 1], borderRadius);
        }
        else {
            segment = `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`;
        }
        res += segment;
        return res;
    }, '');
    return [path, labelX, labelY, offsetX, offsetY];
}

function isNodeInitialized(node) {
    return (node &&
        !!(node.internals.handleBounds || node.handles?.length) &&
        !!(node.measured.width || node.width || node.initialWidth));
}
function getEdgePosition(params) {
    const { sourceNode, targetNode } = params;
    if (!isNodeInitialized(sourceNode) || !isNodeInitialized(targetNode)) {
        return null;
    }
    const sourceHandleBounds = sourceNode.internals.handleBounds || toHandleBounds(sourceNode.handles);
    const targetHandleBounds = targetNode.internals.handleBounds || toHandleBounds(targetNode.handles);
    const sourceHandle = getHandle(sourceHandleBounds?.source ?? [], params.sourceHandle);
    const targetHandle = getHandle(
    // when connection type is loose we can define all handles as sources and connect source -> source
    params.connectionMode === ConnectionMode.Strict
        ? targetHandleBounds?.target ?? []
        : (targetHandleBounds?.target ?? []).concat(targetHandleBounds?.source ?? []), params.targetHandle);
    if (!sourceHandle || !targetHandle) {
        params.onError?.('008', errorMessages['error008'](!sourceHandle ? 'source' : 'target', {
            id: params.id,
            sourceHandle: params.sourceHandle,
            targetHandle: params.targetHandle,
        }));
        return null;
    }
    const sourcePosition = sourceHandle?.position || Position.Bottom;
    const targetPosition = targetHandle?.position || Position.Top;
    const source = getHandlePosition(sourceNode, sourceHandle, sourcePosition);
    const target = getHandlePosition(targetNode, targetHandle, targetPosition);
    return {
        sourceX: source.x,
        sourceY: source.y,
        targetX: target.x,
        targetY: target.y,
        sourcePosition,
        targetPosition,
    };
}
function toHandleBounds(handles) {
    if (!handles) {
        return null;
    }
    const source = [];
    const target = [];
    for (const handle of handles) {
        handle.width = handle.width ?? 1;
        handle.height = handle.height ?? 1;
        if (handle.type === 'source') {
            source.push(handle);
        }
        else if (handle.type === 'target') {
            target.push(handle);
        }
    }
    return {
        source,
        target,
    };
}
function getHandlePosition(node, handle, fallbackPosition = Position.Left, center = false) {
    const x = (handle?.x ?? 0) + node.internals.positionAbsolute.x;
    const y = (handle?.y ?? 0) + node.internals.positionAbsolute.y;
    const { width, height } = handle ?? getNodeDimensions(node);
    if (center) {
        return { x: x + width / 2, y: y + height / 2 };
    }
    const position = handle?.position ?? fallbackPosition;
    switch (position) {
        case Position.Top:
            return { x: x + width / 2, y };
        case Position.Right:
            return { x: x + width, y: y + height / 2 };
        case Position.Bottom:
            return { x: x + width / 2, y: y + height };
        case Position.Left:
            return { x, y: y + height / 2 };
    }
}
function getHandle(bounds, handleId) {
    if (!bounds) {
        return null;
    }
    // if no handleId is given, we use the first handle, otherwise we check for the id
    return (!handleId ? bounds[0] : bounds.find((d) => d.id === handleId)) || null;
}

function getMarkerId(marker, id) {
    if (!marker) {
        return '';
    }
    if (typeof marker === 'string') {
        return marker;
    }
    const idPrefix = id ? `${id}__` : '';
    return `${idPrefix}${Object.keys(marker)
        .sort()
        .map((key) => `${key}=${marker[key]}`)
        .join('&')}`;
}
function createMarkerIds(edges, { id, defaultColor, defaultMarkerStart, defaultMarkerEnd, }) {
    const ids = new Set();
    return edges
        .reduce((markers, edge) => {
        [edge.markerStart || defaultMarkerStart, edge.markerEnd || defaultMarkerEnd].forEach((marker) => {
            if (marker && typeof marker === 'object') {
                const markerId = getMarkerId(marker, id);
                if (!ids.has(markerId)) {
                    markers.push({ id: markerId, color: marker.color || defaultColor, ...marker });
                    ids.add(markerId);
                }
            }
        });
        return markers;
    }, [])
        .sort((a, b) => a.id.localeCompare(b.id));
}

const defaultOptions = {
    nodeOrigin: [0, 0],
    elevateNodesOnSelect: true,
    defaults: {},
};
const adoptUserNodesDefaultOptions = {
    ...defaultOptions,
    checkEquality: true,
};
function updateAbsolutePositions(nodeLookup, parentLookup, options) {
    const _options = { ...defaultOptions, ...options };
    for (const node of nodeLookup.values()) {
        if (!node.parentId) {
            continue;
        }
        updateChildPosition(node, nodeLookup, parentLookup, _options);
    }
}
function adoptUserNodes(nodes, nodeLookup, parentLookup, options) {
    const _options = { ...adoptUserNodesDefaultOptions, ...options };
    const tmpLookup = new Map(nodeLookup);
    nodeLookup.clear();
    parentLookup.clear();
    const selectedNodeZ = options?.elevateNodesOnSelect ? 1000 : 0;
    for (const userNode of nodes) {
        let internalNode = tmpLookup.get(userNode.id);
        if (_options.checkEquality && userNode === internalNode?.internals.userNode) {
            nodeLookup.set(userNode.id, internalNode);
        }
        else {
            internalNode = {
                ..._options.defaults,
                ...userNode,
                measured: {
                    width: userNode.measured?.width,
                    height: userNode.measured?.height,
                },
                internals: {
                    positionAbsolute: getNodePositionWithOrigin(userNode, _options.nodeOrigin),
                    // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
                    handleBounds: !userNode.measured ? undefined : internalNode?.internals.handleBounds,
                    z: calculateZ(userNode, selectedNodeZ),
                    userNode,
                },
            };
            nodeLookup.set(userNode.id, internalNode);
        }
        if (userNode.parentId) {
            updateChildPosition(internalNode, nodeLookup, parentLookup, options);
        }
    }
}
function updateChildPosition(node, nodeLookup, parentLookup, options) {
    const _options = { ...defaultOptions, ...options };
    const parentId = node.parentId;
    const parentNode = nodeLookup.get(parentId);
    if (!parentNode) {
        console.warn(`Parent node ${parentId} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
        return;
    }
    // update the parentLookup
    const childNodes = parentLookup.get(parentId);
    if (childNodes) {
        childNodes.set(node.id, node);
    }
    else {
        parentLookup.set(parentId, new Map([[node.id, node]]));
    }
    const selectedNodeZ = options?.elevateNodesOnSelect ? 1000 : 0;
    const { x, y, z } = calculateChildXYZ(node, parentNode, _options.nodeOrigin, selectedNodeZ);
    const currPosition = node.internals.positionAbsolute;
    const positionChanged = x !== currPosition.x || y !== currPosition.y;
    if (positionChanged || z !== node.internals.z) {
        node.internals = {
            ...node.internals,
            positionAbsolute: positionChanged ? { x, y } : currPosition,
            z,
        };
    }
}
function calculateZ(node, selectedNodeZ) {
    return (isNumeric(node.zIndex) ? node.zIndex : 0) + (node.selected ? selectedNodeZ : 0);
}
function calculateChildXYZ(childNode, parentNode, nodeOrigin, selectedNodeZ) {
    const position = getNodePositionWithOrigin(childNode, nodeOrigin);
    const childZ = calculateZ(childNode, selectedNodeZ);
    const parentZ = parentNode.internals.z ?? 0;
    return {
        x: parentNode.internals.positionAbsolute.x + position.x,
        y: parentNode.internals.positionAbsolute.y + position.y,
        z: parentZ > childZ ? parentZ : childZ,
    };
}
function handleExpandParent(children, nodeLookup, parentLookup, nodeOrigin = [0, 0]) {
    const changes = [];
    const parentExpansions = new Map();
    // determine the expanded rectangle the child nodes would take for each parent
    for (const child of children) {
        const parent = nodeLookup.get(child.parentId);
        if (!parent) {
            continue;
        }
        const parentRect = parentExpansions.get(child.parentId)?.expandedRect ?? nodeToRect(parent);
        const expandedRect = getBoundsOfRects(parentRect, child.rect);
        parentExpansions.set(child.parentId, { expandedRect, parent });
    }
    if (parentExpansions.size > 0) {
        parentExpansions.forEach(({ expandedRect, parent }, parentId) => {
            // determine the position & dimensions of the parent
            const positionAbsolute = parent.internals.positionAbsolute;
            const dimensions = getNodeDimensions(parent);
            const origin = parent.origin ?? nodeOrigin;
            // determine how much the parent expands in width and position
            const xChange = expandedRect.x < positionAbsolute.x ? Math.round(Math.abs(positionAbsolute.x - expandedRect.x)) : 0;
            const yChange = expandedRect.y < positionAbsolute.y ? Math.round(Math.abs(positionAbsolute.y - expandedRect.y)) : 0;
            const newWidth = Math.max(dimensions.width, Math.round(expandedRect.width));
            const newHeight = Math.max(dimensions.height, Math.round(expandedRect.height));
            const widthChange = (newWidth - dimensions.width) * origin[0];
            const heightChange = (newHeight - dimensions.height) * origin[1];
            // We need to correct the position of the parent node if the origin is not [0,0]
            if (xChange > 0 || yChange > 0 || widthChange || heightChange) {
                changes.push({
                    id: parentId,
                    type: 'position',
                    position: {
                        x: parent.position.x - xChange + widthChange,
                        y: parent.position.y - yChange + heightChange,
                    },
                });
                // We move all child nodes in the oppsite direction
                // so the x,y changes of the parent do not move the children
                parentLookup.get(parentId)?.forEach((childNode) => {
                    if (!children.some((child) => child.id === childNode.id)) {
                        changes.push({
                            id: childNode.id,
                            type: 'position',
                            position: {
                                x: childNode.position.x + xChange,
                                y: childNode.position.y + yChange,
                            },
                        });
                    }
                });
            }
            // We need to correct the dimensions of the parent node if the origin is not [0,0]
            if (dimensions.width < expandedRect.width || dimensions.height < expandedRect.height || xChange || yChange) {
                changes.push({
                    id: parentId,
                    type: 'dimensions',
                    setAttributes: true,
                    dimensions: {
                        width: newWidth + (xChange ? origin[0] * xChange - widthChange : 0),
                        height: newHeight + (yChange ? origin[1] * yChange - heightChange : 0),
                    },
                });
            }
        });
    }
    return changes;
}
function updateNodeInternals(updates, nodeLookup, parentLookup, domNode, nodeOrigin) {
    const viewportNode = domNode?.querySelector('.xyflow__viewport');
    let updatedInternals = false;
    if (!viewportNode) {
        return { changes: [], updatedInternals };
    }
    const changes = [];
    const style = window.getComputedStyle(viewportNode);
    const { m22: zoom } = new window.DOMMatrixReadOnly(style.transform);
    // in this array we collect nodes, that might trigger changes (like expanding parent)
    const parentExpandChildren = [];
    for (const update of updates.values()) {
        const node = nodeLookup.get(update.id);
        if (!node) {
            continue;
        }
        if (node.hidden) {
            node.internals = {
                ...node.internals,
                handleBounds: undefined,
            };
            updatedInternals = true;
        }
        else {
            const dimensions = getDimensions(update.nodeElement);
            const dimensionChanged = node.measured.width !== dimensions.width || node.measured.height !== dimensions.height;
            const doUpdate = !!(dimensions.width &&
                dimensions.height &&
                (dimensionChanged || !node.internals.handleBounds || update.force));
            if (doUpdate) {
                const nodeBounds = update.nodeElement.getBoundingClientRect();
                node.measured = dimensions;
                node.internals = {
                    ...node.internals,
                    positionAbsolute: getNodePositionWithOrigin(node, nodeOrigin),
                    handleBounds: {
                        source: getHandleBounds('source', update.nodeElement, nodeBounds, zoom, node.id),
                        target: getHandleBounds('target', update.nodeElement, nodeBounds, zoom, node.id),
                    },
                };
                if (node.parentId) {
                    updateChildPosition(node, nodeLookup, parentLookup, { nodeOrigin });
                }
                updatedInternals = true;
                if (dimensionChanged) {
                    changes.push({
                        id: node.id,
                        type: 'dimensions',
                        dimensions,
                    });
                    if (node.expandParent && node.parentId) {
                        parentExpandChildren.push({
                            id: node.id,
                            parentId: node.parentId,
                            rect: nodeToRect(node, nodeOrigin),
                        });
                    }
                }
            }
        }
    }
    if (parentExpandChildren.length > 0) {
        const parentExpandChanges = handleExpandParent(parentExpandChildren, nodeLookup, parentLookup, nodeOrigin);
        changes.push(...parentExpandChanges);
    }
    return { changes, updatedInternals };
}
async function panBy({ delta, panZoom, transform, translateExtent, width, height, }) {
    if (!panZoom || (!delta.x && !delta.y)) {
        return Promise.resolve(false);
    }
    const nextViewport = await panZoom.setViewportConstrained({
        x: transform[0] + delta.x,
        y: transform[1] + delta.y,
        zoom: transform[2],
    }, [
        [0, 0],
        [width, height],
    ], translateExtent);
    const transformChanged = !!nextViewport &&
        (nextViewport.x !== transform[0] || nextViewport.y !== transform[1] || nextViewport.k !== transform[2]);
    return Promise.resolve(transformChanged);
}
function updateConnectionLookup(connectionLookup, edgeLookup, edges) {
    connectionLookup.clear();
    edgeLookup.clear();
    for (const edge of edges) {
        const { source, target, sourceHandle = null, targetHandle = null } = edge;
        const sourceKey = `${source}-source-${sourceHandle}`;
        const targetKey = `${target}-target-${targetHandle}`;
        const prevSource = connectionLookup.get(sourceKey) || new Map();
        const prevTarget = connectionLookup.get(targetKey) || new Map();
        const connection = { edgeId: edge.id, source, target, sourceHandle, targetHandle };
        edgeLookup.set(edge.id, edge);
        connectionLookup.set(sourceKey, prevSource.set(`${target}-${targetHandle}`, connection));
        connectionLookup.set(targetKey, prevTarget.set(`${source}-${sourceHandle}`, connection));
    }
}

function isParentSelected(node, nodeLookup) {
    if (!node.parentId) {
        return false;
    }
    const parentNode = nodeLookup.get(node.parentId);
    if (!parentNode) {
        return false;
    }
    if (parentNode.selected) {
        return true;
    }
    return isParentSelected(parentNode, nodeLookup);
}
function hasSelector(target, selector, domNode) {
    let current = target;
    do {
        if (current?.matches(selector))
            return true;
        if (current === domNode)
            return false;
        current = current.parentElement;
    } while (current);
    return false;
}
// looks for all selected nodes and created a NodeDragItem for each of them
function getDragItems(nodeLookup, nodesDraggable, mousePos, nodeId) {
    const dragItems = new Map();
    for (const [id, node] of nodeLookup) {
        if ((node.selected || node.id === nodeId) &&
            (!node.parentId || !isParentSelected(node, nodeLookup)) &&
            (node.draggable || (nodesDraggable && typeof node.draggable === 'undefined'))) {
            const internalNode = nodeLookup.get(id);
            if (internalNode) {
                dragItems.set(id, {
                    id,
                    position: internalNode.position || { x: 0, y: 0 },
                    distance: {
                        x: mousePos.x - internalNode.internals.positionAbsolute.x,
                        y: mousePos.y - internalNode.internals.positionAbsolute.y,
                    },
                    extent: internalNode.extent,
                    parentId: internalNode.parentId,
                    origin: internalNode.origin,
                    expandParent: internalNode.expandParent,
                    internals: {
                        positionAbsolute: internalNode.internals.positionAbsolute || { x: 0, y: 0 },
                    },
                    measured: {
                        width: internalNode.measured.width ?? 0,
                        height: internalNode.measured.height ?? 0,
                    },
                });
            }
        }
    }
    return dragItems;
}
// returns two params:
// 1. the dragged node (or the first of the list, if we are dragging a node selection)
// 2. array of selected nodes (for multi selections)
function getEventHandlerParams({ nodeId, dragItems, nodeLookup, dragging = true, }) {
    const nodesFromDragItems = [];
    for (const [id, dragItem] of dragItems) {
        const node = nodeLookup.get(id)?.internals.userNode;
        if (node) {
            nodesFromDragItems.push({
                ...node,
                position: dragItem.position,
                dragging,
            });
        }
    }
    if (!nodeId) {
        return [nodesFromDragItems[0], nodesFromDragItems];
    }
    const node = nodeLookup.get(nodeId).internals.userNode;
    return [
        {
            ...node,
            position: dragItems.get(nodeId)?.position || node.position,
            dragging,
        },
        nodesFromDragItems,
    ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function XYDrag({ onNodeMouseDown, getStoreItems, onDragStart, onDrag, onDragStop, }) {
    let lastPos = { x: null, y: null };
    let autoPanId = 0;
    let dragItems = new Map();
    let autoPanStarted = false;
    let mousePosition = { x: 0, y: 0 };
    let containerBounds = null;
    let dragStarted = false;
    let d3Selection = null;
    let abortDrag = false; // prevents unintentional dragging on multitouch
    // public functions
    function update({ noDragClassName, handleSelector, domNode, isSelectable, nodeId, nodeClickDistance = 0, }) {
        d3Selection = select(domNode);
        function updateNodes({ x, y }, dragEvent) {
            const { nodeLookup, nodeExtent, snapGrid, snapToGrid, nodeOrigin, onNodeDrag, onSelectionDrag, onError, updateNodePositions, } = getStoreItems();
            lastPos = { x, y };
            let hasChange = false;
            let nodesBox = { x: 0, y: 0, x2: 0, y2: 0 };
            if (dragItems.size > 1 && nodeExtent) {
                const rect = getInternalNodesBounds(dragItems);
                nodesBox = rectToBox(rect);
            }
            for (const [id, dragItem] of dragItems) {
                let nextPosition = { x: x - dragItem.distance.x, y: y - dragItem.distance.y };
                if (snapToGrid) {
                    nextPosition = snapPosition(nextPosition, snapGrid);
                }
                // if there is selection with multiple nodes and a node extent is set, we need to adjust the node extent for each node
                // based on its position so that the node stays at it's position relative to the selection.
                let adjustedNodeExtent = [
                    [nodeExtent[0][0], nodeExtent[0][1]],
                    [nodeExtent[1][0], nodeExtent[1][1]],
                ];
                if (dragItems.size > 1 && nodeExtent && !dragItem.extent) {
                    const { positionAbsolute } = dragItem.internals;
                    const x1 = positionAbsolute.x - nodesBox.x + nodeExtent[0][0];
                    const x2 = positionAbsolute.x + dragItem.measured.width - nodesBox.x2 + nodeExtent[1][0];
                    const y1 = positionAbsolute.y - nodesBox.y + nodeExtent[0][1];
                    const y2 = positionAbsolute.y + dragItem.measured.height - nodesBox.y2 + nodeExtent[1][1];
                    adjustedNodeExtent = [
                        [x1, y1],
                        [x2, y2],
                    ];
                }
                const { position, positionAbsolute } = calculateNodePosition({
                    nodeId: id,
                    nextPosition,
                    nodeLookup,
                    nodeExtent: adjustedNodeExtent,
                    nodeOrigin,
                    onError,
                });
                // we want to make sure that we only fire a change event when there is a change
                hasChange = hasChange || dragItem.position.x !== position.x || dragItem.position.y !== position.y;
                dragItem.position = position;
                dragItem.internals.positionAbsolute = positionAbsolute;
            }
            if (!hasChange) {
                return;
            }
            updateNodePositions(dragItems, true);
            if (dragEvent && (onDrag || onNodeDrag || (!nodeId && onSelectionDrag))) {
                const [currentNode, currentNodes] = getEventHandlerParams({
                    nodeId,
                    dragItems,
                    nodeLookup,
                });
                onDrag?.(dragEvent, dragItems, currentNode, currentNodes);
                onNodeDrag?.(dragEvent, currentNode, currentNodes);
                if (!nodeId) {
                    onSelectionDrag?.(dragEvent, currentNodes);
                }
            }
        }
        async function autoPan() {
            if (!containerBounds) {
                return;
            }
            const { transform, panBy, autoPanSpeed } = getStoreItems();
            const [xMovement, yMovement] = calcAutoPan(mousePosition, containerBounds, autoPanSpeed);
            if (xMovement !== 0 || yMovement !== 0) {
                lastPos.x = (lastPos.x ?? 0) - xMovement / transform[2];
                lastPos.y = (lastPos.y ?? 0) - yMovement / transform[2];
                if (await panBy({ x: xMovement, y: yMovement })) {
                    updateNodes(lastPos, null);
                }
            }
            autoPanId = requestAnimationFrame(autoPan);
        }
        function startDrag(event) {
            const { nodeLookup, multiSelectionActive, nodesDraggable, transform, snapGrid, snapToGrid, selectNodesOnDrag, onNodeDragStart, onSelectionDragStart, unselectNodesAndEdges, } = getStoreItems();
            dragStarted = true;
            if ((!selectNodesOnDrag || !isSelectable) && !multiSelectionActive && nodeId) {
                if (!nodeLookup.get(nodeId)?.selected) {
                    // we need to reset selected nodes when selectNodesOnDrag=false
                    unselectNodesAndEdges();
                }
            }
            if (isSelectable && selectNodesOnDrag && nodeId) {
                onNodeMouseDown?.(nodeId);
            }
            const pointerPos = getPointerPosition(event.sourceEvent, { transform, snapGrid, snapToGrid });
            lastPos = pointerPos;
            dragItems = getDragItems(nodeLookup, nodesDraggable, pointerPos, nodeId);
            if (dragItems.size > 0 && (onDragStart || onNodeDragStart || (!nodeId && onSelectionDragStart))) {
                const [currentNode, currentNodes] = getEventHandlerParams({
                    nodeId,
                    dragItems,
                    nodeLookup,
                });
                onDragStart?.(event.sourceEvent, dragItems, currentNode, currentNodes);
                onNodeDragStart?.(event.sourceEvent, currentNode, currentNodes);
                if (!nodeId) {
                    onSelectionDragStart?.(event.sourceEvent, currentNodes);
                }
            }
        }
        const d3DragInstance = drag()
            .clickDistance(nodeClickDistance)
            .on('start', (event) => {
            const { domNode, nodeDragThreshold, transform, snapGrid, snapToGrid } = getStoreItems();
            abortDrag = false;
            if (nodeDragThreshold === 0) {
                startDrag(event);
            }
            const pointerPos = getPointerPosition(event.sourceEvent, { transform, snapGrid, snapToGrid });
            lastPos = pointerPos;
            containerBounds = domNode?.getBoundingClientRect() || null;
            mousePosition = getEventPosition(event.sourceEvent, containerBounds);
        })
            .on('drag', (event) => {
            const { autoPanOnNodeDrag, transform, snapGrid, snapToGrid, nodeDragThreshold } = getStoreItems();
            const pointerPos = getPointerPosition(event.sourceEvent, { transform, snapGrid, snapToGrid });
            if (event.sourceEvent.type === 'touchmove' && event.sourceEvent.touches.length > 1) {
                abortDrag = true;
            }
            if (abortDrag) {
                return;
            }
            if (!autoPanStarted && autoPanOnNodeDrag && dragStarted) {
                autoPanStarted = true;
                autoPan();
            }
            if (!dragStarted) {
                const x = pointerPos.xSnapped - (lastPos.x ?? 0);
                const y = pointerPos.ySnapped - (lastPos.y ?? 0);
                const distance = Math.sqrt(x * x + y * y);
                if (distance > nodeDragThreshold) {
                    startDrag(event);
                }
            }
            // skip events without movement
            if ((lastPos.x !== pointerPos.xSnapped || lastPos.y !== pointerPos.ySnapped) && dragItems && dragStarted) {
                // dragEvent = event.sourceEvent as MouseEvent;
                mousePosition = getEventPosition(event.sourceEvent, containerBounds);
                updateNodes(pointerPos, event.sourceEvent);
            }
        })
            .on('end', (event) => {
            if (!dragStarted || abortDrag) {
                return;
            }
            autoPanStarted = false;
            dragStarted = false;
            cancelAnimationFrame(autoPanId);
            if (dragItems.size > 0) {
                const { nodeLookup, updateNodePositions, onNodeDragStop, onSelectionDragStop } = getStoreItems();
                updateNodePositions(dragItems, false);
                if (onDragStop || onNodeDragStop || (!nodeId && onSelectionDragStop)) {
                    const [currentNode, currentNodes] = getEventHandlerParams({
                        nodeId,
                        dragItems,
                        nodeLookup,
                        dragging: false,
                    });
                    onDragStop?.(event.sourceEvent, dragItems, currentNode, currentNodes);
                    onNodeDragStop?.(event.sourceEvent, currentNode, currentNodes);
                    if (!nodeId) {
                        onSelectionDragStop?.(event.sourceEvent, currentNodes);
                    }
                }
            }
        })
            .filter((event) => {
            const target = event.target;
            const isDraggable = !event.button &&
                (!noDragClassName || !hasSelector(target, `.${noDragClassName}`, domNode)) &&
                (!handleSelector || hasSelector(target, handleSelector, domNode));
            return isDraggable;
        });
        d3Selection.call(d3DragInstance);
    }
    function destroy() {
        d3Selection?.on('.drag', null);
    }
    return {
        update,
        destroy,
    };
}

// this functions collects all handles and adds an absolute position
// so that we can later find the closest handle to the mouse position
function getHandles(node, handleBounds, type, currentHandle) {
    let excludedHandle = null;
    const handles = (handleBounds[type] || []).reduce((res, handle) => {
        if (node.id === currentHandle.nodeId && type === currentHandle.handleType && handle.id === currentHandle.handleId) {
            excludedHandle = handle;
        }
        else {
            const handleXY = getHandlePosition(node, handle, handle.position, true);
            res.push({ ...handle, ...handleXY });
        }
        return res;
    }, []);
    return [handles, excludedHandle];
}
function getClosestHandle(pos, connectionRadius, handleLookup) {
    let closestHandles = [];
    let minDistance = Infinity;
    for (const handle of handleLookup.values()) {
        const distance = Math.sqrt(Math.pow(handle.x - pos.x, 2) + Math.pow(handle.y - pos.y, 2));
        if (distance <= connectionRadius) {
            if (distance < minDistance) {
                closestHandles = [handle];
            }
            else if (distance === minDistance) {
                // when multiple handles are on the same distance we collect all of them
                closestHandles.push(handle);
            }
            minDistance = distance;
        }
    }
    if (!closestHandles.length) {
        return null;
    }
    return closestHandles.length === 1
        ? closestHandles[0]
        : // if multiple handles are layouted on top of each other we take the one with type = target because it's more likely that the user wants to connect to this one
            closestHandles.find((handle) => handle.type === 'target') || closestHandles[0];
}
function getHandleLookup({ nodeLookup, nodeId, handleId, handleType, }) {
    const connectionHandles = new Map();
    const currentHandle = { nodeId, handleId, handleType };
    let matchingHandle = null;
    for (const node of nodeLookup.values()) {
        if (node.internals.handleBounds) {
            const [sourceHandles, excludedSource] = getHandles(node, node.internals.handleBounds, 'source', currentHandle);
            const [targetHandles, excludedTarget] = getHandles(node, node.internals.handleBounds, 'target', currentHandle);
            matchingHandle = matchingHandle ? matchingHandle : excludedSource ?? excludedTarget;
            [...sourceHandles, ...targetHandles].forEach((handle) => connectionHandles.set(`${handle.nodeId}-${handle.type}-${handle.id}`, handle));
        }
    }
    // if the user only works with handles that are type="source" + connectionMode="loose"
    // it happens that we can't find a matching handle. The reason for this is, that the
    // edge don't know about the handles and always assumes that there is source and a target.
    // In this case we need to find the matching handle by switching the handleType
    if (!matchingHandle) {
        const node = nodeLookup.get(nodeId);
        if (node?.internals.handleBounds) {
            currentHandle.handleType = handleType === 'source' ? 'target' : 'source';
            const [, excluded] = getHandles(node, node.internals.handleBounds, currentHandle.handleType, currentHandle);
            matchingHandle = excluded;
        }
    }
    return [connectionHandles, matchingHandle];
}
function getHandleType(edgeUpdaterType, handleDomNode) {
    if (edgeUpdaterType) {
        return edgeUpdaterType;
    }
    else if (handleDomNode?.classList.contains('target')) {
        return 'target';
    }
    else if (handleDomNode?.classList.contains('source')) {
        return 'source';
    }
    return null;
}
function isConnectionValid(isInsideConnectionRadius, isHandleValid) {
    let isValid = null;
    if (isHandleValid) {
        isValid = true;
    }
    else if (isInsideConnectionRadius && !isHandleValid) {
        isValid = false;
    }
    return isValid;
}

const alwaysValid = () => true;
function onPointerDown(event, { connectionMode, connectionRadius, handleId, nodeId, edgeUpdaterType, isTarget, domNode, nodeLookup, lib, autoPanOnConnect, flowId, panBy, cancelConnection, onConnectStart, onConnect, onConnectEnd, isValidConnection = alwaysValid, onReconnectEnd, updateConnection, getTransform, getFromHandle, autoPanSpeed, }) {
    // when xyflow is used inside a shadow root we can't use document
    const doc = getHostForElement(event.target);
    let autoPanId = 0;
    let closestHandle;
    const { x, y } = getEventPosition(event);
    const clickedHandle = doc?.elementFromPoint(x, y);
    const handleType = getHandleType(edgeUpdaterType, clickedHandle);
    const containerBounds = domNode?.getBoundingClientRect();
    if (!containerBounds || !handleType) {
        return;
    }
    let position = getEventPosition(event, containerBounds);
    let autoPanStarted = false;
    let connection = null;
    let isValid = false;
    let handleDomNode = null;
    const [handleLookup, fromHandleInternal] = getHandleLookup({
        nodeLookup,
        nodeId,
        handleId,
        handleType,
    });
    // when the user is moving the mouse close to the edge of the canvas while connecting we move the canvas
    function autoPan() {
        if (!autoPanOnConnect || !containerBounds) {
            return;
        }
        const [x, y] = calcAutoPan(position, containerBounds, autoPanSpeed);
        panBy({ x, y });
        autoPanId = requestAnimationFrame(autoPan);
    }
    // Stays the same for all consecutive pointermove events
    const fromHandle = {
        ...fromHandleInternal,
        nodeId,
        type: handleType,
        position: fromHandleInternal.position,
    };
    const fromNodeInternal = nodeLookup.get(nodeId);
    const from = getHandlePosition(fromNodeInternal, fromHandle, Position.Left, true);
    const newConnection = {
        inProgress: true,
        isValid: null,
        from,
        fromHandle,
        fromPosition: fromHandle.position,
        fromNode: fromNodeInternal,
        to: position,
        toHandle: null,
        toPosition: oppositePosition[fromHandle.position],
        toNode: null,
    };
    updateConnection(newConnection);
    let previousConnection = newConnection;
    onConnectStart?.(event, { nodeId, handleId, handleType });
    function onPointerMove(event) {
        if (!getFromHandle() || !fromHandle) {
            onPointerUp(event);
            return;
        }
        const transform = getTransform();
        position = getEventPosition(event, containerBounds);
        closestHandle = getClosestHandle(pointToRendererPoint(position, transform, false, [1, 1]), connectionRadius, handleLookup);
        if (!autoPanStarted) {
            autoPan();
            autoPanStarted = true;
        }
        const result = isValidHandle(event, {
            handle: closestHandle,
            connectionMode,
            fromNodeId: nodeId,
            fromHandleId: handleId,
            fromType: isTarget ? 'target' : 'source',
            isValidConnection,
            doc,
            lib,
            flowId,
            handleLookup,
        });
        handleDomNode = result.handleDomNode;
        connection = result.connection;
        isValid = isConnectionValid(!!closestHandle, result.isValid);
        const newConnection = {
            // from stays the same
            ...previousConnection,
            isValid,
            to: closestHandle && isValid
                ? rendererPointToPoint({ x: closestHandle.x, y: closestHandle.y }, transform)
                : position,
            toHandle: result.toHandle,
            toPosition: isValid && result.toHandle ? result.toHandle.position : oppositePosition[fromHandle.position],
            toNode: result.toHandle ? nodeLookup.get(result.toHandle.nodeId) : null,
        };
        // we don't want to trigger an update when the connection
        // is snapped to the same handle as before
        if (isValid &&
            closestHandle &&
            previousConnection.toHandle &&
            newConnection.toHandle &&
            previousConnection.toHandle.type === newConnection.toHandle.type &&
            previousConnection.toHandle.nodeId === newConnection.toHandle.nodeId &&
            previousConnection.toHandle.id === newConnection.toHandle.id) {
            return;
        }
        updateConnection(newConnection);
        previousConnection = newConnection;
    }
    function onPointerUp(event) {
        if ((closestHandle || handleDomNode) && connection && isValid) {
            onConnect?.(connection);
        }
        // it's important to get a fresh reference from the store here
        // in order to get the latest state of onConnectEnd
        onConnectEnd?.(event);
        if (edgeUpdaterType) {
            onReconnectEnd?.(event);
        }
        cancelConnection();
        cancelAnimationFrame(autoPanId);
        autoPanStarted = false;
        isValid = false;
        connection = null;
        handleDomNode = null;
        doc.removeEventListener('mousemove', onPointerMove);
        doc.removeEventListener('mouseup', onPointerUp);
        doc.removeEventListener('touchmove', onPointerMove);
        doc.removeEventListener('touchend', onPointerUp);
    }
    doc.addEventListener('mousemove', onPointerMove);
    doc.addEventListener('mouseup', onPointerUp);
    doc.addEventListener('touchmove', onPointerMove);
    doc.addEventListener('touchend', onPointerUp);
}
// checks if  and returns connection in fom of an object { source: 123, target: 312 }
function isValidHandle(event, { handle, connectionMode, fromNodeId, fromHandleId, fromType, doc, lib, flowId, isValidConnection = alwaysValid, handleLookup, }) {
    const isTarget = fromType === 'target';
    const handleDomNode = handle
        ? doc.querySelector(`.${lib}-flow__handle[data-id="${flowId}-${handle?.nodeId}-${handle?.id}-${handle?.type}"]`)
        : null;
    const { x, y } = getEventPosition(event);
    const handleBelow = doc.elementFromPoint(x, y);
    // we always want to prioritize the handle below the mouse cursor over the closest distance handle,
    // because it could be that the center of another handle is closer to the mouse pointer than the handle below the cursor
    const handleToCheck = handleBelow?.classList.contains(`${lib}-flow__handle`) ? handleBelow : handleDomNode;
    const result = {
        handleDomNode: handleToCheck,
        isValid: false,
        connection: null,
        toHandle: null,
    };
    if (handleToCheck) {
        const handleType = getHandleType(undefined, handleToCheck);
        const handleNodeId = handleToCheck.getAttribute('data-nodeid');
        const handleId = handleToCheck.getAttribute('data-handleid');
        const connectable = handleToCheck.classList.contains('connectable');
        const connectableEnd = handleToCheck.classList.contains('connectableend');
        if (!handleNodeId) {
            return result;
        }
        const connection = {
            source: isTarget ? handleNodeId : fromNodeId,
            sourceHandle: isTarget ? handleId : fromHandleId,
            target: isTarget ? fromNodeId : handleNodeId,
            targetHandle: isTarget ? fromHandleId : handleId,
        };
        result.connection = connection;
        const isConnectable = connectable && connectableEnd;
        // in strict mode we don't allow target to target or source to source connections
        const isValid = isConnectable &&
            (connectionMode === ConnectionMode.Strict
                ? (isTarget && handleType === 'source') || (!isTarget && handleType === 'target')
                : handleNodeId !== fromNodeId || handleId !== fromHandleId);
        result.isValid = isValid && isValidConnection(connection);
        const toHandle = handleLookup?.get(`${handleNodeId}-${handleType}-${handleId}`);
        if (toHandle) {
            result.toHandle = {
                ...toHandle,
            };
        }
    }
    return result;
}
const XYHandle = {
    onPointerDown,
    isValid: isValidHandle,
};

function XYMinimap({ domNode, panZoom, getTransform, getViewScale }) {
    const selection = select(domNode);
    function update({ translateExtent, width, height, zoomStep = 10, pannable = true, zoomable = true, inversePan = false, }) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const zoomHandler = (event) => {
            const transform = getTransform();
            if (event.sourceEvent.type !== 'wheel' || !panZoom) {
                return;
            }
            const pinchDelta = -event.sourceEvent.deltaY *
                (event.sourceEvent.deltaMode === 1 ? 0.05 : event.sourceEvent.deltaMode ? 1 : 0.002) *
                zoomStep;
            const nextZoom = transform[2] * Math.pow(2, pinchDelta);
            panZoom.scaleTo(nextZoom);
        };
        let panStart = [0, 0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const panStartHandler = (event) => {
            if (event.sourceEvent.type === 'mousedown' || event.sourceEvent.type === 'touchstart') {
                panStart = [
                    event.sourceEvent.clientX ?? event.sourceEvent.touches[0].clientX,
                    event.sourceEvent.clientY ?? event.sourceEvent.touches[0].clientY,
                ];
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const panHandler = (event) => {
            const transform = getTransform();
            if ((event.sourceEvent.type !== 'mousemove' && event.sourceEvent.type !== 'touchmove') || !panZoom) {
                return;
            }
            const panCurrent = [
                event.sourceEvent.clientX ?? event.sourceEvent.touches[0].clientX,
                event.sourceEvent.clientY ?? event.sourceEvent.touches[0].clientY,
            ];
            const panDelta = [panCurrent[0] - panStart[0], panCurrent[1] - panStart[1]];
            panStart = panCurrent;
            const moveScale = getViewScale() * Math.max(transform[2], Math.log(transform[2])) * (inversePan ? -1 : 1);
            const position = {
                x: transform[0] - panDelta[0] * moveScale,
                y: transform[1] - panDelta[1] * moveScale,
            };
            const extent = [
                [0, 0],
                [width, height],
            ];
            panZoom.setViewportConstrained({
                x: position.x,
                y: position.y,
                zoom: transform[2],
            }, extent, translateExtent);
        };
        const zoomAndPanHandler = zoom()
            .on('start', panStartHandler)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .on('zoom', pannable ? panHandler : null)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .on('zoom.wheel', zoomable ? zoomHandler : null);
        selection.call(zoomAndPanHandler, {});
    }
    function destroy() {
        selection.on('zoom', null);
    }
    return {
        update,
        destroy,
        pointer,
    };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const viewChanged = (prevViewport, eventViewport) => prevViewport.x !== eventViewport.x || prevViewport.y !== eventViewport.y || prevViewport.zoom !== eventViewport.k;
const transformToViewport = (transform) => ({
    x: transform.x,
    y: transform.y,
    zoom: transform.k,
});
const viewportToTransform = ({ x, y, zoom }) => identity$1.translate(x, y).scale(zoom);
const isWrappedWithClass = (event, className) => event.target.closest(`.${className}`);
const isRightClickPan = (panOnDrag, usedButton) => usedButton === 2 && Array.isArray(panOnDrag) && panOnDrag.includes(2);
const getD3Transition = (selection, duration = 0, onEnd = () => { }) => {
    const hasDuration = typeof duration === 'number' && duration > 0;
    if (!hasDuration) {
        onEnd();
    }
    return hasDuration ? selection.transition().duration(duration).on('end', onEnd) : selection;
};
const wheelDelta = (event) => {
    const factor = event.ctrlKey && isMacOs() ? 10 : 1;
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * factor;
};

function createPanOnScrollHandler({ zoomPanValues, noWheelClassName, d3Selection, d3Zoom, panOnScrollMode, panOnScrollSpeed, zoomOnPinch, onPanZoomStart, onPanZoom, onPanZoomEnd, }) {
    return (event) => {
        if (isWrappedWithClass(event, noWheelClassName)) {
            return false;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        const currentZoom = d3Selection.property('__zoom').k || 1;
        // macos sets ctrlKey=true for pinch gesture on a trackpad
        if (event.ctrlKey && zoomOnPinch) {
            const point = pointer(event);
            const pinchDelta = wheelDelta(event);
            const zoom = currentZoom * Math.pow(2, pinchDelta);
            // @ts-ignore
            d3Zoom.scaleTo(d3Selection, zoom, point, event);
            return;
        }
        // increase scroll speed in firefox
        // firefox: deltaMode === 1; chrome: deltaMode === 0
        const deltaNormalize = event.deltaMode === 1 ? 20 : 1;
        let deltaX = panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize;
        let deltaY = panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize;
        // this enables vertical scrolling with shift + scroll on windows
        if (!isMacOs() && event.shiftKey && panOnScrollMode !== PanOnScrollMode.Vertical) {
            deltaX = event.deltaY * deltaNormalize;
            deltaY = 0;
        }
        d3Zoom.translateBy(d3Selection, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed, 
        // @ts-ignore
        { internal: true });
        const nextViewport = transformToViewport(d3Selection.property('__zoom'));
        clearTimeout(zoomPanValues.panScrollTimeout);
        // for pan on scroll we need to handle the event calls on our own
        // we can't use the start, zoom and end events from d3-zoom
        // because start and move gets called on every scroll event and not once at the beginning
        if (!zoomPanValues.isPanScrolling) {
            zoomPanValues.isPanScrolling = true;
            onPanZoomStart?.(event, nextViewport);
        }
        if (zoomPanValues.isPanScrolling) {
            onPanZoom?.(event, nextViewport);
            zoomPanValues.panScrollTimeout = setTimeout(() => {
                onPanZoomEnd?.(event, nextViewport);
                zoomPanValues.isPanScrolling = false;
            }, 150);
        }
    };
}
function createZoomOnScrollHandler({ noWheelClassName, preventScrolling, d3ZoomHandler }) {
    return function (event, d) {
        // we still want to enable pinch zooming even if preventScrolling is set to false
        const preventZoom = !preventScrolling && event.type === 'wheel' && !event.ctrlKey;
        if (preventZoom || isWrappedWithClass(event, noWheelClassName)) {
            return null;
        }
        event.preventDefault();
        d3ZoomHandler.call(this, event, d);
    };
}
function createPanZoomStartHandler({ zoomPanValues, onDraggingChange, onPanZoomStart }) {
    return (event) => {
        if (event.sourceEvent?.internal) {
            return;
        }
        const viewport = transformToViewport(event.transform);
        // we need to remember it here, because it's always 0 in the "zoom" event
        zoomPanValues.mouseButton = event.sourceEvent?.button || 0;
        zoomPanValues.isZoomingOrPanning = true;
        zoomPanValues.prevViewport = viewport;
        if (event.sourceEvent?.type === 'mousedown') {
            onDraggingChange(true);
        }
        if (onPanZoomStart) {
            onPanZoomStart?.(event.sourceEvent, viewport);
        }
    };
}
function createPanZoomHandler({ zoomPanValues, panOnDrag, onPaneContextMenu, onTransformChange, onPanZoom, }) {
    return (event) => {
        zoomPanValues.usedRightMouseButton = !!(onPaneContextMenu && isRightClickPan(panOnDrag, zoomPanValues.mouseButton ?? 0));
        if (!event.sourceEvent?.sync) {
            onTransformChange([event.transform.x, event.transform.y, event.transform.k]);
        }
        if (onPanZoom && !event.sourceEvent?.internal) {
            onPanZoom?.(event.sourceEvent, transformToViewport(event.transform));
        }
    };
}
function createPanZoomEndHandler({ zoomPanValues, panOnDrag, panOnScroll, onDraggingChange, onPanZoomEnd, onPaneContextMenu, }) {
    return (event) => {
        if (event.sourceEvent?.internal) {
            return;
        }
        zoomPanValues.isZoomingOrPanning = false;
        if (onPaneContextMenu &&
            isRightClickPan(panOnDrag, zoomPanValues.mouseButton ?? 0) &&
            !zoomPanValues.usedRightMouseButton &&
            event.sourceEvent) {
            onPaneContextMenu(event.sourceEvent);
        }
        zoomPanValues.usedRightMouseButton = false;
        onDraggingChange(false);
        if (onPanZoomEnd && viewChanged(zoomPanValues.prevViewport, event.transform)) {
            const viewport = transformToViewport(event.transform);
            zoomPanValues.prevViewport = viewport;
            clearTimeout(zoomPanValues.timerId);
            zoomPanValues.timerId = setTimeout(() => {
                onPanZoomEnd?.(event.sourceEvent, viewport);
            }, 
            // we need a setTimeout for panOnScroll to supress multiple end events fired during scroll
            panOnScroll ? 150 : 0);
        }
    };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function createFilter({ zoomActivationKeyPressed, zoomOnScroll, zoomOnPinch, panOnDrag, panOnScroll, zoomOnDoubleClick, userSelectionActive, noWheelClassName, noPanClassName, lib, }) {
    return (event) => {
        const zoomScroll = zoomActivationKeyPressed || zoomOnScroll;
        const pinchZoom = zoomOnPinch && event.ctrlKey;
        if (event.button === 1 &&
            event.type === 'mousedown' &&
            (isWrappedWithClass(event, `${lib}-flow__node`) || isWrappedWithClass(event, `${lib}-flow__edge`))) {
            return true;
        }
        // if all interactions are disabled, we prevent all zoom events
        if (!panOnDrag && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) {
            return false;
        }
        // during a selection we prevent all other interactions
        if (userSelectionActive) {
            return false;
        }
        // if the target element is inside an element with the nowheel class, we prevent zooming
        if (isWrappedWithClass(event, noWheelClassName) && event.type === 'wheel') {
            return false;
        }
        // if the target element is inside an element with the nopan class, we prevent panning
        if (isWrappedWithClass(event, noPanClassName) &&
            (event.type !== 'wheel' || (panOnScroll && event.type === 'wheel' && !zoomActivationKeyPressed))) {
            return false;
        }
        if (!zoomOnPinch && event.ctrlKey && event.type === 'wheel') {
            return false;
        }
        if (!zoomOnPinch && event.type === 'touchstart' && event.touches?.length > 1) {
            event.preventDefault(); // if you manage to start with 2 touches, we prevent native zoom
            return false;
        }
        // when there is no scroll handling enabled, we prevent all wheel events
        if (!zoomScroll && !panOnScroll && !pinchZoom && event.type === 'wheel') {
            return false;
        }
        // if the pane is not movable, we prevent dragging it with mousestart or touchstart
        if (!panOnDrag && (event.type === 'mousedown' || event.type === 'touchstart')) {
            return false;
        }
        // if the pane is only movable using allowed clicks
        if (Array.isArray(panOnDrag) && !panOnDrag.includes(event.button) && event.type === 'mousedown') {
            return false;
        }
        // We only allow right clicks if pan on drag is set to right click
        const buttonAllowed = (Array.isArray(panOnDrag) && panOnDrag.includes(event.button)) || !event.button || event.button <= 1;
        // default filter for d3-zoom
        return (!event.ctrlKey || event.type === 'wheel') && buttonAllowed;
    };
}

function XYPanZoom({ domNode, minZoom, maxZoom, paneClickDistance, translateExtent, viewport, onPanZoom, onPanZoomStart, onPanZoomEnd, onTransformChange, onDraggingChange, }) {
    const zoomPanValues = {
        isZoomingOrPanning: false,
        usedRightMouseButton: false,
        prevViewport: { x: 0, y: 0, zoom: 0 },
        mouseButton: 0,
        timerId: undefined,
        panScrollTimeout: undefined,
        isPanScrolling: false,
    };
    const bbox = domNode.getBoundingClientRect();
    const d3ZoomInstance = zoom()
        .clickDistance(!isNumeric(paneClickDistance) || paneClickDistance < 0 ? 0 : paneClickDistance)
        .scaleExtent([minZoom, maxZoom])
        .translateExtent(translateExtent);
    const d3Selection = select(domNode).call(d3ZoomInstance);
    setViewportConstrained({
        x: viewport.x,
        y: viewport.y,
        zoom: clamp(viewport.zoom, minZoom, maxZoom),
    }, [
        [0, 0],
        [bbox.width, bbox.height],
    ], translateExtent);
    const d3ZoomHandler = d3Selection.on('wheel.zoom');
    const d3DblClickZoomHandler = d3Selection.on('dblclick.zoom');
    d3ZoomInstance.wheelDelta(wheelDelta);
    function setTransform(transform, options) {
        if (d3Selection) {
            return new Promise((resolve) => {
                d3ZoomInstance?.transform(getD3Transition(d3Selection, options?.duration, () => resolve(true)), transform);
            });
        }
        return Promise.resolve(false);
    }
    // public functions
    function update({ noWheelClassName, noPanClassName, onPaneContextMenu, userSelectionActive, panOnScroll, panOnDrag, panOnScrollMode, panOnScrollSpeed, preventScrolling, zoomOnPinch, zoomOnScroll, zoomOnDoubleClick, zoomActivationKeyPressed, lib, }) {
        if (userSelectionActive && !zoomPanValues.isZoomingOrPanning) {
            destroy();
        }
        const isPanOnScroll = panOnScroll && !zoomActivationKeyPressed && !userSelectionActive;
        const wheelHandler = isPanOnScroll
            ? createPanOnScrollHandler({
                zoomPanValues,
                noWheelClassName,
                d3Selection,
                d3Zoom: d3ZoomInstance,
                panOnScrollMode,
                panOnScrollSpeed,
                zoomOnPinch,
                onPanZoomStart,
                onPanZoom,
                onPanZoomEnd,
            })
            : createZoomOnScrollHandler({
                noWheelClassName,
                preventScrolling,
                d3ZoomHandler,
            });
        d3Selection.on('wheel.zoom', wheelHandler, { passive: false });
        if (!userSelectionActive) {
            // pan zoom start
            const startHandler = createPanZoomStartHandler({
                zoomPanValues,
                onDraggingChange,
                onPanZoomStart,
            });
            d3ZoomInstance.on('start', startHandler);
            // pan zoom
            const panZoomHandler = createPanZoomHandler({
                zoomPanValues,
                panOnDrag,
                onPaneContextMenu: !!onPaneContextMenu,
                onPanZoom,
                onTransformChange,
            });
            d3ZoomInstance.on('zoom', panZoomHandler);
            // pan zoom end
            const panZoomEndHandler = createPanZoomEndHandler({
                zoomPanValues,
                panOnDrag,
                panOnScroll,
                onPaneContextMenu,
                onPanZoomEnd,
                onDraggingChange,
            });
            d3ZoomInstance.on('end', panZoomEndHandler);
        }
        const filter = createFilter({
            zoomActivationKeyPressed,
            panOnDrag,
            zoomOnScroll,
            panOnScroll,
            zoomOnDoubleClick,
            zoomOnPinch,
            userSelectionActive,
            noPanClassName,
            noWheelClassName,
            lib,
        });
        d3ZoomInstance.filter(filter);
        // We cannot add zoomOnDoubleClick to the filter above because
        // double tapping on touch screens circumvents the filter and
        // dblclick.zoom is fired on the selection directly
        if (zoomOnDoubleClick) {
            d3Selection.on('dblclick.zoom', d3DblClickZoomHandler);
        }
        else {
            d3Selection.on('dblclick.zoom', null);
        }
    }
    function destroy() {
        d3ZoomInstance.on('zoom', null);
    }
    async function setViewportConstrained(viewport, extent, translateExtent) {
        const nextTransform = viewportToTransform(viewport);
        const contrainedTransform = d3ZoomInstance?.constrain()(nextTransform, extent, translateExtent);
        if (contrainedTransform) {
            await setTransform(contrainedTransform);
        }
        return new Promise((resolve) => resolve(contrainedTransform));
    }
    async function setViewport(viewport, options) {
        const nextTransform = viewportToTransform(viewport);
        await setTransform(nextTransform, options);
        return new Promise((resolve) => resolve(nextTransform));
    }
    function syncViewport(viewport) {
        if (d3Selection) {
            const nextTransform = viewportToTransform(viewport);
            const currentTransform = d3Selection.property('__zoom');
            if (currentTransform.k !== viewport.zoom ||
                currentTransform.x !== viewport.x ||
                currentTransform.y !== viewport.y) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                d3ZoomInstance?.transform(d3Selection, nextTransform, null, { sync: true });
            }
        }
    }
    function getViewport() {
        const transform$1 = d3Selection ? transform(d3Selection.node()) : { x: 0, y: 0, k: 1 };
        return { x: transform$1.x, y: transform$1.y, zoom: transform$1.k };
    }
    function scaleTo(zoom, options) {
        if (d3Selection) {
            return new Promise((resolve) => {
                d3ZoomInstance?.scaleTo(getD3Transition(d3Selection, options?.duration, () => resolve(true)), zoom);
            });
        }
        return Promise.resolve(false);
    }
    function scaleBy(factor, options) {
        if (d3Selection) {
            return new Promise((resolve) => {
                d3ZoomInstance?.scaleBy(getD3Transition(d3Selection, options?.duration, () => resolve(true)), factor);
            });
        }
        return Promise.resolve(false);
    }
    function setScaleExtent(scaleExtent) {
        d3ZoomInstance?.scaleExtent(scaleExtent);
    }
    function setTranslateExtent(translateExtent) {
        d3ZoomInstance?.translateExtent(translateExtent);
    }
    function setClickDistance(distance) {
        const validDistance = !isNumeric(distance) || distance < 0 ? 0 : distance;
        d3ZoomInstance?.clickDistance(validDistance);
    }
    return {
        update,
        destroy,
        setViewport,
        setViewportConstrained,
        getViewport,
        scaleTo,
        scaleBy,
        setScaleExtent,
        setTranslateExtent,
        syncViewport,
        setClickDistance,
    };
}

var ResizeControlVariant;
(function (ResizeControlVariant) {
    ResizeControlVariant["Line"] = "line";
    ResizeControlVariant["Handle"] = "handle";
})(ResizeControlVariant || (ResizeControlVariant = {}));

/**
 * Get all connecting edges for a given set of nodes
 * @param width - new width of the node
 * @param prevWidth - previous width of the node
 * @param height - new height of the node
 * @param prevHeight - previous height of the node
 * @param affectsX - whether to invert the resize direction for the x axis
 * @param affectsY - whether to invert the resize direction for the y axis
 * @returns array of two numbers representing the direction of the resize for each axis, 0 = no change, 1 = increase, -1 = decrease
 */
function getResizeDirection({ width, prevWidth, height, prevHeight, affectsX, affectsY, }) {
    const deltaWidth = width - prevWidth;
    const deltaHeight = height - prevHeight;
    const direction = [deltaWidth > 0 ? 1 : deltaWidth < 0 ? -1 : 0, deltaHeight > 0 ? 1 : deltaHeight < 0 ? -1 : 0];
    if (deltaWidth && affectsX) {
        direction[0] = direction[0] * -1;
    }
    if (deltaHeight && affectsY) {
        direction[1] = direction[1] * -1;
    }
    return direction;
}
/**
 * Parses the control position that is being dragged to dimensions that are being resized
 * @param controlPosition - position of the control that is being dragged
 * @returns isHorizontal, isVertical, affectsX, affectsY,
 */
function getControlDirection(controlPosition) {
    const isHorizontal = controlPosition.includes('right') || controlPosition.includes('left');
    const isVertical = controlPosition.includes('bottom') || controlPosition.includes('top');
    const affectsX = controlPosition.includes('left');
    const affectsY = controlPosition.includes('top');
    return {
        isHorizontal,
        isVertical,
        affectsX,
        affectsY,
    };
}
function getLowerExtentClamp(lowerExtent, lowerBound) {
    return Math.max(0, lowerBound - lowerExtent);
}
function getUpperExtentClamp(upperExtent, upperBound) {
    return Math.max(0, upperExtent - upperBound);
}
function getSizeClamp(size, minSize, maxSize) {
    return Math.max(0, minSize - size, size - maxSize);
}
function xor(a, b) {
    return a ? !b : b;
}
/**
 * Calculates new width & height and x & y of node after resize based on pointer position
 * @description - Buckle up, this is a chunky one... If you want to determine the new dimensions of a node after a resize,
 * you have to account for all possible restrictions: min/max width/height of the node, the maximum extent the node is allowed
 * to move in (in this case: resize into) determined by the parent node, the minimal extent determined by child nodes
 * with expandParent or extent: 'parent' set and oh yeah, these things also have to work with keepAspectRatio!
 * The way this is done is by determining how much each of these restricting actually restricts the resize and then applying the
 * strongest restriction. Because the resize affects x, y and width, height and width, height of a opposing side with keepAspectRatio,
 * the resize amount is always kept in distX & distY amount (the distance in mouse movement)
 * Instead of clamping each value, we first calculate the biggest 'clamp' (for the lack of a better name) and then apply it to all values.
 * To complicate things nodeOrigin has to be taken into account as well. This is done by offsetting the nodes as if their origin is [0, 0],
 * then calculating the restrictions as usual
 * @param startValues - starting values of resize
 * @param controlDirection - dimensions affected by the resize
 * @param pointerPosition - the current pointer position corrected for snapping
 * @param boundaries - minimum and maximum dimensions of the node
 * @param keepAspectRatio - prevent changes of asprect ratio
 * @returns x, y, width and height of the node after resize
 */
function getDimensionsAfterResize(startValues, controlDirection, pointerPosition, boundaries, keepAspectRatio, nodeOrigin, extent, childExtent) {
    let { affectsX, affectsY } = controlDirection;
    const { isHorizontal, isVertical } = controlDirection;
    const isDiagonal = isHorizontal && isVertical;
    const { xSnapped, ySnapped } = pointerPosition;
    const { minWidth, maxWidth, minHeight, maxHeight } = boundaries;
    const { x: startX, y: startY, width: startWidth, height: startHeight, aspectRatio } = startValues;
    let distX = Math.floor(isHorizontal ? xSnapped - startValues.pointerX : 0);
    let distY = Math.floor(isVertical ? ySnapped - startValues.pointerY : 0);
    const newWidth = startWidth + (affectsX ? -distX : distX);
    const newHeight = startHeight + (affectsY ? -distY : distY);
    const originOffsetX = -nodeOrigin[0] * startWidth;
    const originOffsetY = -nodeOrigin[1] * startHeight;
    // Check if maxWidth, minWWidth, maxHeight, minHeight are restricting the resize
    let clampX = getSizeClamp(newWidth, minWidth, maxWidth);
    let clampY = getSizeClamp(newHeight, minHeight, maxHeight);
    // Check if extent is restricting the resize
    if (extent) {
        let xExtentClamp = 0;
        let yExtentClamp = 0;
        if (affectsX && distX < 0) {
            xExtentClamp = getLowerExtentClamp(startX + distX + originOffsetX, extent[0][0]);
        }
        else if (!affectsX && distX > 0) {
            xExtentClamp = getUpperExtentClamp(startX + newWidth + originOffsetX, extent[1][0]);
        }
        if (affectsY && distY < 0) {
            yExtentClamp = getLowerExtentClamp(startY + distY + originOffsetY, extent[0][1]);
        }
        else if (!affectsY && distY > 0) {
            yExtentClamp = getUpperExtentClamp(startY + newHeight + originOffsetY, extent[1][1]);
        }
        clampX = Math.max(clampX, xExtentClamp);
        clampY = Math.max(clampY, yExtentClamp);
    }
    // Check if the child extent is restricting the resize
    if (childExtent) {
        let xExtentClamp = 0;
        let yExtentClamp = 0;
        if (affectsX && distX > 0) {
            xExtentClamp = getUpperExtentClamp(startX + distX, childExtent[0][0]);
        }
        else if (!affectsX && distX < 0) {
            xExtentClamp = getLowerExtentClamp(startX + newWidth, childExtent[1][0]);
        }
        if (affectsY && distY > 0) {
            yExtentClamp = getUpperExtentClamp(startY + distY, childExtent[0][1]);
        }
        else if (!affectsY && distY < 0) {
            yExtentClamp = getLowerExtentClamp(startY + newHeight, childExtent[1][1]);
        }
        clampX = Math.max(clampX, xExtentClamp);
        clampY = Math.max(clampY, yExtentClamp);
    }
    // Check if the aspect ratio resizing of the other side is restricting the resize
    if (keepAspectRatio) {
        if (isHorizontal) {
            // Check if the max dimensions might be restricting the resize
            const aspectHeightClamp = getSizeClamp(newWidth / aspectRatio, minHeight, maxHeight) * aspectRatio;
            clampX = Math.max(clampX, aspectHeightClamp);
            // Check if the extent is restricting the resize
            if (extent) {
                let aspectExtentClamp = 0;
                if ((!affectsX && !affectsY) || (affectsX && !affectsY && isDiagonal)) {
                    aspectExtentClamp =
                        getUpperExtentClamp(startY + originOffsetY + newWidth / aspectRatio, extent[1][1]) * aspectRatio;
                }
                else {
                    aspectExtentClamp =
                        getLowerExtentClamp(startY + originOffsetY + (affectsX ? distX : -distX) / aspectRatio, extent[0][1]) *
                            aspectRatio;
                }
                clampX = Math.max(clampX, aspectExtentClamp);
            }
            // Check if the child extent is restricting the resize
            if (childExtent) {
                let aspectExtentClamp = 0;
                if ((!affectsX && !affectsY) || (affectsX && !affectsY && isDiagonal)) {
                    aspectExtentClamp = getLowerExtentClamp(startY + newWidth / aspectRatio, childExtent[1][1]) * aspectRatio;
                }
                else {
                    aspectExtentClamp =
                        getUpperExtentClamp(startY + (affectsX ? distX : -distX) / aspectRatio, childExtent[0][1]) * aspectRatio;
                }
                clampX = Math.max(clampX, aspectExtentClamp);
            }
        }
        // Do the same thing for vertical resizing
        if (isVertical) {
            const aspectWidthClamp = getSizeClamp(newHeight * aspectRatio, minWidth, maxWidth) / aspectRatio;
            clampY = Math.max(clampY, aspectWidthClamp);
            if (extent) {
                let aspectExtentClamp = 0;
                if ((!affectsX && !affectsY) || (affectsY && !affectsX && isDiagonal)) {
                    aspectExtentClamp =
                        getUpperExtentClamp(startX + newHeight * aspectRatio + originOffsetX, extent[1][0]) / aspectRatio;
                }
                else {
                    aspectExtentClamp =
                        getLowerExtentClamp(startX + (affectsY ? distY : -distY) * aspectRatio + originOffsetX, extent[0][0]) /
                            aspectRatio;
                }
                clampY = Math.max(clampY, aspectExtentClamp);
            }
            if (childExtent) {
                let aspectExtentClamp = 0;
                if ((!affectsX && !affectsY) || (affectsY && !affectsX && isDiagonal)) {
                    aspectExtentClamp = getLowerExtentClamp(startX + newHeight * aspectRatio, childExtent[1][0]) / aspectRatio;
                }
                else {
                    aspectExtentClamp =
                        getUpperExtentClamp(startX + (affectsY ? distY : -distY) * aspectRatio, childExtent[0][0]) / aspectRatio;
                }
                clampY = Math.max(clampY, aspectExtentClamp);
            }
        }
    }
    distY = distY + (distY < 0 ? clampY : -clampY);
    distX = distX + (distX < 0 ? clampX : -clampX);
    if (keepAspectRatio) {
        if (isDiagonal) {
            if (newWidth > newHeight * aspectRatio) {
                distY = (xor(affectsX, affectsY) ? -distX : distX) / aspectRatio;
            }
            else {
                distX = (xor(affectsX, affectsY) ? -distY : distY) * aspectRatio;
            }
        }
        else {
            if (isHorizontal) {
                distY = distX / aspectRatio;
                affectsY = affectsX;
            }
            else {
                distX = distY * aspectRatio;
                affectsX = affectsY;
            }
        }
    }
    const x = affectsX ? startX + distX : startX;
    const y = affectsY ? startY + distY : startY;
    return {
        width: startWidth + (affectsX ? -distX : distX),
        height: startHeight + (affectsY ? -distY : distY),
        x: nodeOrigin[0] * distX * (!affectsX ? 1 : -1) + x,
        y: nodeOrigin[1] * distY * (!affectsY ? 1 : -1) + y,
    };
}

const initPrevValues$1 = { width: 0, height: 0, x: 0, y: 0 };
const initStartValues = {
    ...initPrevValues$1,
    pointerX: 0,
    pointerY: 0,
    aspectRatio: 1,
};
function nodeToParentExtent(node) {
    return [
        [0, 0],
        [node.measured.width, node.measured.height],
    ];
}
function nodeToChildExtent(child, parent, nodeOrigin) {
    const x = parent.position.x + child.position.x;
    const y = parent.position.y + child.position.y;
    const width = child.measured.width ?? 0;
    const height = child.measured.height ?? 0;
    const originOffsetX = nodeOrigin[0] * width;
    const originOffsetY = nodeOrigin[1] * height;
    return [
        [x - originOffsetX, y - originOffsetY],
        [x + width - originOffsetX, y + height - originOffsetY],
    ];
}
function XYResizer({ domNode, nodeId, getStoreItems, onChange, onEnd }) {
    const selection = select(domNode);
    function update({ controlPosition, boundaries, keepAspectRatio, onResizeStart, onResize, onResizeEnd, shouldResize, }) {
        let prevValues = { ...initPrevValues$1 };
        let startValues = { ...initStartValues };
        const controlDirection = getControlDirection(controlPosition);
        let node = undefined;
        let childNodes = [];
        let parentNode = undefined; // Needed to fix expandParent
        let parentExtent = undefined;
        let childExtent = undefined;
        const dragHandler = drag()
            .on('start', (event) => {
            const { nodeLookup, transform, snapGrid, snapToGrid, nodeOrigin } = getStoreItems();
            node = nodeLookup.get(nodeId);
            if (!node) {
                return;
            }
            const { xSnapped, ySnapped } = getPointerPosition(event.sourceEvent, { transform, snapGrid, snapToGrid });
            prevValues = {
                width: node.measured.width ?? 0,
                height: node.measured.height ?? 0,
                x: node.position.x ?? 0,
                y: node.position.y ?? 0,
            };
            startValues = {
                ...prevValues,
                pointerX: xSnapped,
                pointerY: ySnapped,
                aspectRatio: prevValues.width / prevValues.height,
            };
            parentNode = undefined;
            if (node.parentId && (node.extent === 'parent' || node.expandParent)) {
                parentNode = nodeLookup.get(node.parentId);
                parentExtent = parentNode && node.extent === 'parent' ? nodeToParentExtent(parentNode) : undefined;
            }
            // Collect all child nodes to correct their relative positions when top/left changes
            // Determine largest minimal extent the parent node is allowed to resize to
            childNodes = [];
            childExtent = undefined;
            for (const [childId, child] of nodeLookup) {
                if (child.parentId === nodeId) {
                    childNodes.push({
                        id: childId,
                        position: { ...child.position },
                        extent: child.extent,
                    });
                    if (child.extent === 'parent' || child.expandParent) {
                        const extent = nodeToChildExtent(child, node, child.origin ?? nodeOrigin);
                        if (childExtent) {
                            childExtent = [
                                [Math.min(extent[0][0], childExtent[0][0]), Math.min(extent[0][1], childExtent[0][1])],
                                [Math.max(extent[1][0], childExtent[1][0]), Math.max(extent[1][1], childExtent[1][1])],
                            ];
                        }
                        else {
                            childExtent = extent;
                        }
                    }
                }
            }
            onResizeStart?.(event, { ...prevValues });
        })
            .on('drag', (event) => {
            const { transform, snapGrid, snapToGrid, nodeOrigin: storeNodeOrigin } = getStoreItems();
            const pointerPosition = getPointerPosition(event.sourceEvent, { transform, snapGrid, snapToGrid });
            const childChanges = [];
            if (!node) {
                return;
            }
            const { x: prevX, y: prevY, width: prevWidth, height: prevHeight } = prevValues;
            const change = {};
            const nodeOrigin = node.origin ?? storeNodeOrigin;
            const { width, height, x, y } = getDimensionsAfterResize(startValues, controlDirection, pointerPosition, boundaries, keepAspectRatio, nodeOrigin, parentExtent, childExtent);
            const isWidthChange = width !== prevWidth;
            const isHeightChange = height !== prevHeight;
            const isXPosChange = x !== prevX && isWidthChange;
            const isYPosChange = y !== prevY && isHeightChange;
            if (!isXPosChange && !isYPosChange && !isWidthChange && !isHeightChange) {
                return;
            }
            if (isXPosChange || isYPosChange || nodeOrigin[0] === 1 || nodeOrigin[1] === 1) {
                change.x = isXPosChange ? x : prevValues.x;
                change.y = isYPosChange ? y : prevValues.y;
                prevValues.x = change.x;
                prevValues.y = change.y;
                // when top/left changes, correct the relative positions of child nodes
                // so that they stay in the same position
                if (childNodes.length > 0) {
                    const xChange = x - prevX;
                    const yChange = y - prevY;
                    for (const childNode of childNodes) {
                        childNode.position = {
                            x: childNode.position.x - xChange + nodeOrigin[0] * (width - prevWidth),
                            y: childNode.position.y - yChange + nodeOrigin[1] * (height - prevHeight),
                        };
                        childChanges.push(childNode);
                    }
                }
            }
            if (isWidthChange || isHeightChange) {
                change.width = isWidthChange ? width : prevValues.width;
                change.height = isHeightChange ? height : prevValues.height;
                prevValues.width = change.width;
                prevValues.height = change.height;
            }
            // Fix expandParent when resizing from top/left
            if (parentNode && node.expandParent) {
                const xLimit = nodeOrigin[0] * (change.width ?? 0);
                if (change.x && change.x < xLimit) {
                    prevValues.x = xLimit;
                    startValues.x = startValues.x - (change.x - xLimit);
                }
                const yLimit = nodeOrigin[1] * (change.height ?? 0);
                if (change.y && change.y < yLimit) {
                    prevValues.y = yLimit;
                    startValues.y = startValues.y - (change.y - yLimit);
                }
            }
            const direction = getResizeDirection({
                width: prevValues.width,
                prevWidth,
                height: prevValues.height,
                prevHeight,
                affectsX: controlDirection.affectsX,
                affectsY: controlDirection.affectsY,
            });
            const nextValues = { ...prevValues, direction };
            const callResize = shouldResize?.(event, nextValues);
            if (callResize === false) {
                return;
            }
            onResize?.(event, nextValues);
            onChange(change, childChanges);
        })
            .on('end', (event) => {
            onResizeEnd?.(event, { ...prevValues });
            onEnd?.();
        });
        selection.call(dragHandler);
    }
    function destroy() {
        selection.on('.drag', null);
    }
    return {
        update,
        destroy,
    };
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var withSelector = {exports: {}};

var withSelector_production_min = {};

var shim = {exports: {}};

var useSyncExternalStoreShim_production_min = {};

/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e=require$$0;function h$1(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var k="function"===typeof Object.is?Object.is:h$1,l=e.useState,m$1=e.useEffect,n$1=e.useLayoutEffect,p$2=e.useDebugValue;function q$1(a,b){var d=b(),f=l({inst:{value:d,getSnapshot:b}}),c=f[0].inst,g=f[1];n$1(function(){c.value=d;c.getSnapshot=b;r$1(c)&&g({inst:c});},[a,d,b]);m$1(function(){r$1(c)&&g({inst:c});return a(function(){r$1(c)&&g({inst:c});})},[a]);p$2(d);return d}
function r$1(a){var b=a.getSnapshot;a=a.value;try{var d=b();return !k(a,d)}catch(f){return !0}}function t$1(a,b){return b()}var u$1="undefined"===typeof window.document||"undefined"===typeof window.document.createElement?t$1:q$1;useSyncExternalStoreShim_production_min.useSyncExternalStore=void 0!==e.useSyncExternalStore?e.useSyncExternalStore:u$1;

{
  shim.exports = useSyncExternalStoreShim_production_min;
}

var shimExports = shim.exports;

/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h=require$$0,n=shimExports;function p$1(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var q="function"===typeof Object.is?Object.is:p$1,r=n.useSyncExternalStore,t=h.useRef,u=h.useEffect,v=h.useMemo,w=h.useDebugValue;
withSelector_production_min.useSyncExternalStoreWithSelector=function(a,b,e,l,g){var c=t(null);if(null===c.current){var f={hasValue:!1,value:null};c.current=f;}else f=c.current;c=v(function(){function a(a){if(!c){c=!0;d=a;a=l(a);if(void 0!==g&&f.hasValue){var b=f.value;if(g(b,a))return k=b}return k=a}b=k;if(q(d,a))return b;var e=l(a);if(void 0!==g&&g(b,e))return b;d=a;return k=e}var c=!1,d,k,m=void 0===e?null:e;return [function(){return a(b())},null===m?void 0:function(){return a(m())}]},[b,e,l,g]);var d=r(a,c[0],c[1]);
u(function(){f.hasValue=!0;f.value=d;},[d]);w(d);return d};

{
  withSelector.exports = withSelector_production_min;
}

var withSelectorExports = withSelector.exports;
var useSyncExternalStoreExports = /*@__PURE__*/getDefaultExportFromCjs(withSelectorExports);

const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore$1 = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

const { useDebugValue } = require$$0;
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
const identity = (arg) => arg;
function useStoreWithEqualityFn(api, selector = identity, equalityFn) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}
const createWithEqualityFnImpl = (createState, defaultEqualityFn) => {
  const api = createStore$1(createState);
  const useBoundStoreWithEqualityFn = (selector, equalityFn = defaultEqualityFn) => useStoreWithEqualityFn(api, selector, equalityFn);
  Object.assign(useBoundStoreWithEqualityFn, api);
  return useBoundStoreWithEqualityFn;
};
const createWithEqualityFn = (createState, defaultEqualityFn) => createState ? createWithEqualityFnImpl(createState, defaultEqualityFn) : createWithEqualityFnImpl;

function shallow$1(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false;
    for (const [key, value] of objA) {
      if (!Object.is(value, objB.get(key))) {
        return false;
      }
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false;
    for (const value of objA) {
      if (!objB.has(value)) {
        return false;
      }
    }
    return true;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (const keyA of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, keyA) || !Object.is(objA[keyA], objB[keyA])) {
      return false;
    }
  }
  return true;
}

const StoreContext = createContext(null);
const Provider$1 = StoreContext.Provider;

const zustandErrorMessage = errorMessages['error001']();
/**
 * Hook for accessing the internal store. Should only be used in rare cases.
 *
 * @public
 * @param selector
 * @param equalityFn
 * @returns The selected state slice
 *
 * @example
 * const nodes = useStore((state: ReactFlowState<MyNodeType>) => state.nodes);
 *
 */
function useStore(selector, equalityFn) {
    const store = useContext(StoreContext);
    if (store === null) {
        throw new Error(zustandErrorMessage);
    }
    return useStoreWithEqualityFn(store, selector, equalityFn);
}
function useStoreApi() {
    const store = useContext(StoreContext);
    if (store === null) {
        throw new Error(zustandErrorMessage);
    }
    return useMemo(() => ({
        getState: store.getState,
        setState: store.setState,
        subscribe: store.subscribe,
    }), [store]);
}

const style = { display: 'none' };
const ariaLiveStyle = {
    position: 'absolute',
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: 'hidden',
    clip: 'rect(0px, 0px, 0px, 0px)',
    clipPath: 'inset(100%)',
};
const ARIA_NODE_DESC_KEY = 'react-flow__node-desc';
const ARIA_EDGE_DESC_KEY = 'react-flow__edge-desc';
const ARIA_LIVE_MESSAGE = 'react-flow__aria-live';
const selector$p = (s) => s.ariaLiveMessage;
function AriaLiveMessage({ rfId }) {
    const ariaLiveMessage = useStore(selector$p);
    return (jsx("div", { id: `${ARIA_LIVE_MESSAGE}-${rfId}`, "aria-live": "assertive", "aria-atomic": "true", style: ariaLiveStyle, children: ariaLiveMessage }));
}
function A11yDescriptions({ rfId, disableKeyboardA11y }) {
    return (jsxs(Fragment, { children: [jsxs("div", { id: `${ARIA_NODE_DESC_KEY}-${rfId}`, style: style, children: ["Press enter or space to select a node.", !disableKeyboardA11y && 'You can then use the arrow keys to move the node around.', " Press delete to remove it and escape to cancel.", ' '] }), jsx("div", { id: `${ARIA_EDGE_DESC_KEY}-${rfId}`, style: style, children: "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel." }), !disableKeyboardA11y && jsx(AriaLiveMessage, { rfId: rfId })] }));
}

const selector$o = (s) => (s.userSelectionActive ? 'none' : 'all');
function Panel({ position = 'top-left', children, className, style, ...rest }) {
    const pointerEvents = useStore(selector$o);
    const positionClasses = `${position}`.split('-');
    return (jsx("div", { className: cc(['react-flow__panel', className, ...positionClasses]), style: { ...style, pointerEvents }, ...rest, children: children }));
}

function Attribution({ proOptions, position = 'bottom-right' }) {
    if (proOptions?.hideAttribution) {
        return null;
    }
    return (jsx(Panel, { position: position, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) }));
}

const selector$n = (s) => {
    const selectedNodes = [];
    const selectedEdges = [];
    for (const [, node] of s.nodeLookup) {
        if (node.selected) {
            selectedNodes.push(node.internals.userNode);
        }
    }
    for (const [, edge] of s.edgeLookup) {
        if (edge.selected) {
            selectedEdges.push(edge);
        }
    }
    return { selectedNodes, selectedEdges };
};
const selectId = (obj) => obj.id;
function areEqual(a, b) {
    return (shallow$1(a.selectedNodes.map(selectId), b.selectedNodes.map(selectId)) &&
        shallow$1(a.selectedEdges.map(selectId), b.selectedEdges.map(selectId)));
}
function SelectionListenerInner({ onSelectionChange }) {
    const store = useStoreApi();
    const { selectedNodes, selectedEdges } = useStore(selector$n, areEqual);
    useEffect(() => {
        const params = { nodes: selectedNodes, edges: selectedEdges };
        onSelectionChange?.(params);
        store.getState().onSelectionChangeHandlers.forEach((fn) => fn(params));
    }, [selectedNodes, selectedEdges, onSelectionChange]);
    return null;
}
const changeSelector = (s) => !!s.onSelectionChangeHandlers;
function SelectionListener({ onSelectionChange }) {
    const storeHasSelectionChangeHandlers = useStore(changeSelector);
    if (onSelectionChange || storeHasSelectionChangeHandlers) {
        return jsx(SelectionListenerInner, { onSelectionChange: onSelectionChange });
    }
    return null;
}

const defaultNodeOrigin = [0, 0];
const defaultViewport = { x: 0, y: 0, zoom: 1 };

/*
 * This component helps us to update the store with the vlues coming from the user.
 * We distinguish between values we can update directly with `useDirectStoreUpdater` (like `snapGrid`)
 * and values that have a dedicated setter function in the store (like `setNodes`).
 */
// these fields exist in the global store and we need to keep them up to date
const reactFlowFieldsToTrack = [
    'nodes',
    'edges',
    'defaultNodes',
    'defaultEdges',
    'onConnect',
    'onConnectStart',
    'onConnectEnd',
    'onClickConnectStart',
    'onClickConnectEnd',
    'nodesDraggable',
    'nodesConnectable',
    'nodesFocusable',
    'edgesFocusable',
    'edgesReconnectable',
    'elevateNodesOnSelect',
    'elevateEdgesOnSelect',
    'minZoom',
    'maxZoom',
    'nodeExtent',
    'onNodesChange',
    'onEdgesChange',
    'elementsSelectable',
    'connectionMode',
    'snapGrid',
    'snapToGrid',
    'translateExtent',
    'connectOnClick',
    'defaultEdgeOptions',
    'fitView',
    'fitViewOptions',
    'onNodesDelete',
    'onEdgesDelete',
    'onDelete',
    'onNodeDrag',
    'onNodeDragStart',
    'onNodeDragStop',
    'onSelectionDrag',
    'onSelectionDragStart',
    'onSelectionDragStop',
    'onMoveStart',
    'onMove',
    'onMoveEnd',
    'noPanClassName',
    'nodeOrigin',
    'autoPanOnConnect',
    'autoPanOnNodeDrag',
    'onError',
    'connectionRadius',
    'isValidConnection',
    'selectNodesOnDrag',
    'nodeDragThreshold',
    'onBeforeDelete',
    'debug',
    'autoPanSpeed',
    'paneClickDistance',
];
// rfId doesn't exist in ReactFlowProps, but it's one of the fields we want to update
const fieldsToTrack = [...reactFlowFieldsToTrack, 'rfId'];
const selector$m = (s) => ({
    setNodes: s.setNodes,
    setEdges: s.setEdges,
    setMinZoom: s.setMinZoom,
    setMaxZoom: s.setMaxZoom,
    setTranslateExtent: s.setTranslateExtent,
    setNodeExtent: s.setNodeExtent,
    reset: s.reset,
    setDefaultNodesAndEdges: s.setDefaultNodesAndEdges,
    setPaneClickDistance: s.setPaneClickDistance,
});
const initPrevValues = {
    // these are values that are also passed directly to other components
    // than the StoreUpdater. We can reduce the number of setStore calls
    // by setting the same values here as prev fields.
    translateExtent: infiniteExtent,
    nodeOrigin: defaultNodeOrigin,
    minZoom: 0.5,
    maxZoom: 2,
    elementsSelectable: true,
    noPanClassName: 'nopan',
    rfId: '1',
    paneClickDistance: 0,
};
function StoreUpdater(props) {
    const { setNodes, setEdges, setMinZoom, setMaxZoom, setTranslateExtent, setNodeExtent, reset, setDefaultNodesAndEdges, setPaneClickDistance, } = useStore(selector$m, shallow$1);
    const store = useStoreApi();
    useEffect(() => {
        setDefaultNodesAndEdges(props.defaultNodes, props.defaultEdges);
        return () => {
            // when we reset the store we also need to reset the previous fields
            previousFields.current = initPrevValues;
            reset();
        };
    }, []);
    const previousFields = useRef(initPrevValues);
    useEffect(() => {
        for (const fieldName of fieldsToTrack) {
            const fieldValue = props[fieldName];
            const previousFieldValue = previousFields.current[fieldName];
            if (fieldValue === previousFieldValue)
                continue;
            if (typeof props[fieldName] === 'undefined')
                continue;
            // Custom handling with dedicated setters for some fields
            if (fieldName === 'nodes')
                setNodes(fieldValue);
            else if (fieldName === 'edges')
                setEdges(fieldValue);
            else if (fieldName === 'minZoom')
                setMinZoom(fieldValue);
            else if (fieldName === 'maxZoom')
                setMaxZoom(fieldValue);
            else if (fieldName === 'translateExtent')
                setTranslateExtent(fieldValue);
            else if (fieldName === 'nodeExtent')
                setNodeExtent(fieldValue);
            else if (fieldName === 'paneClickDistance')
                setPaneClickDistance(fieldValue);
            // Renamed fields
            else if (fieldName === 'fitView')
                store.setState({ fitViewOnInit: fieldValue });
            else if (fieldName === 'fitViewOptions')
                store.setState({ fitViewOnInitOptions: fieldValue });
            // General case
            else
                store.setState({ [fieldName]: fieldValue });
        }
        previousFields.current = props;
    }, 
    // Only re-run the effect if one of the fields we track changes
    fieldsToTrack.map((fieldName) => props[fieldName]));
    return null;
}

function getMediaQuery() {
    if (!window.matchMedia) {
        return null;
    }
    return window.matchMedia('(prefers-color-scheme: dark)');
}
/**
 * Hook for receiving the current color mode class 'dark' or 'light'.
 *
 * @internal
 * @param colorMode - The color mode to use ('dark', 'light' or 'system')
 */
function useColorModeClass(colorMode) {
    const [colorModeClass, setColorModeClass] = useState(colorMode === 'system' ? null : colorMode);
    useEffect(() => {
        if (colorMode !== 'system') {
            setColorModeClass(colorMode);
            return;
        }
        const mediaQuery = getMediaQuery();
        const updateColorModeClass = () => setColorModeClass(mediaQuery?.matches ? 'dark' : 'light');
        updateColorModeClass();
        mediaQuery?.addEventListener('change', updateColorModeClass);
        return () => {
            mediaQuery?.removeEventListener('change', updateColorModeClass);
        };
    }, [colorMode]);
    return colorModeClass !== null ? colorModeClass : getMediaQuery()?.matches ? 'dark' : 'light';
}

const defaultDoc = typeof document !== 'undefined' ? document : null;
/**
 * Hook for handling key events.
 *
 * @public
 * @param param.keyCode - The key code (string or array of strings) to use
 * @param param.options - Options
 * @returns boolean
 */
function useKeyPress(
// the keycode can be a string 'a' or an array of strings ['a', 'a+d']
// a string means a single key 'a' or a combination when '+' is used 'a+d'
// an array means different possibilites. Explainer: ['a', 'd+s'] here the
// user can use the single key 'a' or the combination 'd' + 's'
keyCode = null, options = { target: defaultDoc, actInsideInputWithModifier: true }) {
    const [keyPressed, setKeyPressed] = useState(false);
    // we need to remember if a modifier key is pressed in order to track it
    const modifierPressed = useRef(false);
    // we need to remember the pressed keys in order to support combinations
    const pressedKeys = useRef(new Set([]));
    // keyCodes = array with single keys [['a']] or key combinations [['a', 's']]
    // keysToWatch = array with all keys flattened ['a', 'd', 'ShiftLeft']
    // used to check if we store event.code or event.key. When the code is in the list of keysToWatch
    // we use the code otherwise the key. Explainer: When you press the left "command" key, the code is "MetaLeft"
    // and the key is "Meta". We want users to be able to pass keys and codes so we assume that the key is meant when
    // we can't find it in the list of keysToWatch.
    const [keyCodes, keysToWatch] = useMemo(() => {
        if (keyCode !== null) {
            const keyCodeArr = Array.isArray(keyCode) ? keyCode : [keyCode];
            const keys = keyCodeArr.filter((kc) => typeof kc === 'string').map((kc) => kc.split('+'));
            const keysFlat = keys.reduce((res, item) => res.concat(...item), []);
            return [keys, keysFlat];
        }
        return [[], []];
    }, [keyCode]);
    useEffect(() => {
        const target = options?.target || defaultDoc;
        if (keyCode !== null) {
            const downHandler = (event) => {
                modifierPressed.current = event.ctrlKey || event.metaKey || event.shiftKey;
                const preventAction = (!modifierPressed.current || (modifierPressed.current && !options.actInsideInputWithModifier)) &&
                    isInputDOMNode(event);
                if (preventAction) {
                    return false;
                }
                const keyOrCode = useKeyOrCode(event.code, keysToWatch);
                pressedKeys.current.add(event[keyOrCode]);
                if (isMatchingKey(keyCodes, pressedKeys.current, false)) {
                    event.preventDefault();
                    setKeyPressed(true);
                }
            };
            const upHandler = (event) => {
                const preventAction = (!modifierPressed.current || (modifierPressed.current && !options.actInsideInputWithModifier)) &&
                    isInputDOMNode(event);
                if (preventAction) {
                    return false;
                }
                const keyOrCode = useKeyOrCode(event.code, keysToWatch);
                if (isMatchingKey(keyCodes, pressedKeys.current, true)) {
                    setKeyPressed(false);
                    pressedKeys.current.clear();
                }
                else {
                    pressedKeys.current.delete(event[keyOrCode]);
                }
                // fix for Mac: when cmd key is pressed, keyup is not triggered for any other key, see: https://stackoverflow.com/questions/27380018/when-cmd-key-is-kept-pressed-keyup-is-not-triggered-for-any-other-key
                if (event.key === 'Meta') {
                    pressedKeys.current.clear();
                }
                modifierPressed.current = false;
            };
            const resetHandler = () => {
                pressedKeys.current.clear();
                setKeyPressed(false);
            };
            target?.addEventListener('keydown', downHandler);
            target?.addEventListener('keyup', upHandler);
            window.addEventListener('blur', resetHandler);
            window.addEventListener('contextmenu', resetHandler);
            return () => {
                target?.removeEventListener('keydown', downHandler);
                target?.removeEventListener('keyup', upHandler);
                window.removeEventListener('blur', resetHandler);
                window.removeEventListener('contextmenu', resetHandler);
            };
        }
    }, [keyCode, setKeyPressed]);
    return keyPressed;
}
// utils
function isMatchingKey(keyCodes, pressedKeys, isUp) {
    return (keyCodes
        // we only want to compare same sizes of keyCode definitions
        // and pressed keys. When the user specified 'Meta' as a key somewhere
        // this would also be truthy without this filter when user presses 'Meta' + 'r'
        .filter((keys) => isUp || keys.length === pressedKeys.size)
        // since we want to support multiple possibilities only one of the
        // combinations need to be part of the pressed keys
        .some((keys) => keys.every((k) => pressedKeys.has(k))));
}
function useKeyOrCode(eventCode, keysToWatch) {
    return keysToWatch.includes(eventCode) ? 'code' : 'key';
}

/**
 * Hook for getting viewport helper functions.
 *
 * @internal
 * @returns viewport helper functions
 */
const useViewportHelper = () => {
    const store = useStoreApi();
    return useMemo(() => {
        return {
            zoomIn: (options) => {
                const { panZoom } = store.getState();
                return panZoom ? panZoom.scaleBy(1.2, { duration: options?.duration }) : Promise.resolve(false);
            },
            zoomOut: (options) => {
                const { panZoom } = store.getState();
                return panZoom ? panZoom.scaleBy(1 / 1.2, { duration: options?.duration }) : Promise.resolve(false);
            },
            zoomTo: (zoomLevel, options) => {
                const { panZoom } = store.getState();
                return panZoom ? panZoom.scaleTo(zoomLevel, { duration: options?.duration }) : Promise.resolve(false);
            },
            getZoom: () => store.getState().transform[2],
            setViewport: async (viewport, options) => {
                const { transform: [tX, tY, tZoom], panZoom, } = store.getState();
                if (!panZoom) {
                    return Promise.resolve(false);
                }
                await panZoom.setViewport({
                    x: viewport.x ?? tX,
                    y: viewport.y ?? tY,
                    zoom: viewport.zoom ?? tZoom,
                }, { duration: options?.duration });
                return Promise.resolve(true);
            },
            getViewport: () => {
                const [x, y, zoom] = store.getState().transform;
                return { x, y, zoom };
            },
            fitView: (options) => {
                const { nodeLookup, width, height, minZoom, maxZoom, panZoom } = store.getState();
                const fitViewNodes = getFitViewNodes(nodeLookup, options);
                return panZoom
                    ? fitView({
                        nodes: fitViewNodes,
                        width,
                        height,
                        minZoom,
                        maxZoom,
                        panZoom,
                    }, options)
                    : Promise.resolve(false);
            },
            setCenter: async (x, y, options) => {
                const { width, height, maxZoom, panZoom } = store.getState();
                const nextZoom = typeof options?.zoom !== 'undefined' ? options.zoom : maxZoom;
                const centerX = width / 2 - x * nextZoom;
                const centerY = height / 2 - y * nextZoom;
                if (!panZoom) {
                    return Promise.resolve(false);
                }
                await panZoom.setViewport({
                    x: centerX,
                    y: centerY,
                    zoom: nextZoom,
                }, { duration: options?.duration });
                return Promise.resolve(true);
            },
            fitBounds: async (bounds, options) => {
                const { width, height, minZoom, maxZoom, panZoom } = store.getState();
                const viewport = getViewportForBounds(bounds, width, height, minZoom, maxZoom, options?.padding ?? 0.1);
                if (!panZoom) {
                    return Promise.resolve(false);
                }
                await panZoom.setViewport(viewport, { duration: options?.duration });
                return Promise.resolve(true);
            },
            screenToFlowPosition: (clientPosition, options = { snapToGrid: true }) => {
                const { transform, snapGrid, domNode } = store.getState();
                if (!domNode) {
                    return clientPosition;
                }
                const { x: domX, y: domY } = domNode.getBoundingClientRect();
                const correctedPosition = {
                    x: clientPosition.x - domX,
                    y: clientPosition.y - domY,
                };
                return pointToRendererPoint(correctedPosition, transform, options.snapToGrid, snapGrid);
            },
            flowToScreenPosition: (flowPosition) => {
                const { transform, domNode } = store.getState();
                if (!domNode) {
                    return flowPosition;
                }
                const { x: domX, y: domY } = domNode.getBoundingClientRect();
                const rendererPosition = rendererPointToPoint(flowPosition, transform);
                return {
                    x: rendererPosition.x + domX,
                    y: rendererPosition.y + domY,
                };
            },
        };
    }, []);
};

// This function applies changes to nodes or edges that are triggered by React Flow internally.
// When you drag a node for example, React Flow will send a position change update.
// This function then applies the changes and returns the updated elements.
function applyChanges(changes, elements) {
    const updatedElements = [];
    // By storing a map of changes for each element, we can a quick lookup as we
    // iterate over the elements array!
    const changesMap = new Map();
    for (const change of changes) {
        if (change.type === 'add') {
            updatedElements.push(change.item);
            continue;
        }
        else if (change.type === 'remove' || change.type === 'replace') {
            // For a 'remove' change we can safely ignore any other changes queued for
            // the same element, it's going to be removed anyway!
            changesMap.set(change.id, [change]);
        }
        else {
            const elementChanges = changesMap.get(change.id);
            if (elementChanges) {
                // If we have some changes queued already, we can do a mutable update of
                // that array and save ourselves some copying.
                elementChanges.push(change);
            }
            else {
                changesMap.set(change.id, [change]);
            }
        }
    }
    for (const element of elements) {
        const changes = changesMap.get(element.id);
        // When there are no changes for an element we can just push it unmodified,
        // no need to copy it.
        if (!changes) {
            updatedElements.push(element);
            continue;
        }
        // If we have a 'remove' change queued, it'll be the only change in the array
        if (changes[0].type === 'remove') {
            continue;
        }
        if (changes[0].type === 'replace') {
            updatedElements.push({ ...changes[0].item });
            continue;
        }
        // For other types of changes, we want to start with a shallow copy of the
        // object so React knows this element has changed. Sequential changes will
        /// each _mutate_ this object, so there's only ever one copy.
        const updatedElement = { ...element };
        for (const change of changes) {
            applyChange(change, updatedElement);
        }
        updatedElements.push(updatedElement);
    }
    return updatedElements;
}
// Applies a single change to an element. This is a *mutable* update.
function applyChange(change, element) {
    switch (change.type) {
        case 'select': {
            element.selected = change.selected;
            break;
        }
        case 'position': {
            if (typeof change.position !== 'undefined') {
                element.position = change.position;
            }
            if (typeof change.dragging !== 'undefined') {
                element.dragging = change.dragging;
            }
            break;
        }
        case 'dimensions': {
            if (typeof change.dimensions !== 'undefined') {
                element.measured ??= {};
                element.measured.width = change.dimensions.width;
                element.measured.height = change.dimensions.height;
                if (change.setAttributes) {
                    element.width = change.dimensions.width;
                    element.height = change.dimensions.height;
                }
            }
            if (typeof change.resizing === 'boolean') {
                element.resizing = change.resizing;
            }
            break;
        }
    }
}
/**
 * Drop in function that applies node changes to an array of nodes.
 * @public
 * @remarks Various events on the <ReactFlow /> component can produce an {@link NodeChange} that describes how to update the edges of your flow in some way.
 If you don't need any custom behaviour, this util can be used to take an array of these changes and apply them to your edges.
 * @param changes - Array of changes to apply
 * @param nodes - Array of nodes to apply the changes to
 * @returns Array of updated nodes
 * @example
 *  const onNodesChange = useCallback(
      (changes) => {
        setNodes((oldNodes) => applyNodeChanges(changes, oldNodes));
      },
      [setNodes],
    );
  
    return (
      <ReactFLow nodes={nodes} edges={edges} onNodesChange={onNodesChange} />
    );
 */
function applyNodeChanges(changes, nodes) {
    return applyChanges(changes, nodes);
}
/**
 * Drop in function that applies edge changes to an array of edges.
 * @public
 * @remarks Various events on the <ReactFlow /> component can produce an {@link EdgeChange} that describes how to update the edges of your flow in some way.
 If you don't need any custom behaviour, this util can be used to take an array of these changes and apply them to your edges.
 * @param changes - Array of changes to apply
 * @param edges - Array of edge to apply the changes to
 * @returns Array of updated edges
 * @example
 *  const onEdgesChange = useCallback(
      (changes) => {
        setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
      },
      [setEdges],
    );
  
    return (
      <ReactFlow nodes={nodes} edges={edges} onEdgesChange={onEdgesChange} />
    );
 */
function applyEdgeChanges(changes, edges) {
    return applyChanges(changes, edges);
}
function createSelectionChange(id, selected) {
    return {
        id,
        type: 'select',
        selected,
    };
}
function getSelectionChanges(items, selectedIds = new Set(), mutateItem = false) {
    const changes = [];
    for (const [id, item] of items) {
        const willBeSelected = selectedIds.has(id);
        // we don't want to set all items to selected=false on the first selection
        if (!(item.selected === undefined && !willBeSelected) && item.selected !== willBeSelected) {
            if (mutateItem) {
                // this hack is needed for nodes. When the user dragged a node, it's selected.
                // When another node gets dragged, we need to deselect the previous one,
                // in order to have only one selected node at a time - the onNodesChange callback comes too late here :/
                item.selected = willBeSelected;
            }
            changes.push(createSelectionChange(item.id, willBeSelected));
        }
    }
    return changes;
}
function getElementsDiffChanges({ items = [], lookup, }) {
    const changes = [];
    const itemsLookup = new Map(items.map((item) => [item.id, item]));
    for (const item of items) {
        const lookupItem = lookup.get(item.id);
        const storeItem = lookupItem?.internals?.userNode ?? lookupItem;
        if (storeItem !== undefined && storeItem !== item) {
            changes.push({ id: item.id, item: item, type: 'replace' });
        }
        if (storeItem === undefined) {
            changes.push({ item: item, type: 'add' });
        }
    }
    for (const [id] of lookup) {
        const nextNode = itemsLookup.get(id);
        if (nextNode === undefined) {
            changes.push({ id, type: 'remove' });
        }
    }
    return changes;
}
function elementToRemoveChange(item) {
    return {
        id: item.id,
        type: 'remove',
    };
}

/**
 * Test whether an object is useable as a Node
 * @public
 * @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Node if it returns true
 * @param element - The element to test
 * @returns A boolean indicating whether the element is an Node
 */
const isNode = (element) => isNodeBase(element);
/**
 * Test whether an object is useable as an Edge
 * @public
 * @remarks In TypeScript this is a type guard that will narrow the type of whatever you pass in to Edge if it returns true
 * @param element - The element to test
 * @returns A boolean indicating whether the element is an Edge
 */
const isEdge = (element) => isEdgeBase(element);
// eslint-disable-next-line @typescript-eslint/ban-types
function fixedForwardRef(render) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return forwardRef(render);
}

// we need this hook to prevent a warning when using react-flow in SSR
const useIsomorphicLayoutEffect = useLayoutEffect ;

/**
 * This hook returns a queue that can be used to batch updates.
 *
 * @param runQueue - a function that gets called when the queue is flushed
 * @internal
 *
 * @returns a Queue object
 */
function useQueue(runQueue) {
    // Because we're using a ref above, we need some way to let React know when to
    // actually process the queue. We flip this bit of state to `true` any time we
    // mutate the queue and then flip it back to `false` after flushing the queue.
    const [shouldFlush, setShouldFlush] = useState(false);
    // A reference of all the batched updates to process before the next render. We
    // want a reference here so multiple synchronous calls to `setNodes` etc can be
    // batched together.
    const [queue] = useState(() => createQueue(() => setShouldFlush(true)));
    // Layout effects are guaranteed to run before the next render which means we
    // shouldn't run into any issues with stale state or weird issues that come from
    // rendering things one frame later than expected (we used to use `setTimeout`).
    useIsomorphicLayoutEffect(() => {
        // Because we need to flip the state back to false after flushing, this should
        // trigger the hook again (!). If the hook is being run again we know that any
        // updates should have been processed by now and we can safely clear the queue
        // and bail early.
        if (!shouldFlush) {
            queue.reset();
            return;
        }
        const queueItems = queue.get();
        if (queueItems.length) {
            runQueue(queueItems);
            queue.reset();
        }
        // Beacuse we're using reactive state to trigger this effect, we need to flip
        // it back to false.
        setShouldFlush(false);
    }, [shouldFlush]);
    return queue;
}
function createQueue(cb) {
    let queue = [];
    return {
        get: () => queue,
        reset: () => {
            queue = [];
        },
        push: (item) => {
            queue.push(item);
            cb();
        },
    };
}

const BatchContext = createContext(null);
/**
 * This is a context provider that holds and processes the node and edge update queues
 * that are needed to handle setNodes, addNodes, setEdges and addEdges.
 *
 * @internal
 */
function BatchProvider({ children, }) {
    const store = useStoreApi();
    const nodeQueueHandler = useCallback((queueItems) => {
        const { nodes = [], setNodes, hasDefaultNodes, onNodesChange, nodeLookup } = store.getState();
        // This is essentially an `Array.reduce` in imperative clothing. Processing
        // this queue is a relatively hot path so we'd like to avoid the overhead of
        // array methods where we can.
        let next = nodes;
        for (const payload of queueItems) {
            next = typeof payload === 'function' ? payload(next) : payload;
        }
        if (hasDefaultNodes) {
            setNodes(next);
        }
        else if (onNodesChange) {
            onNodesChange(getElementsDiffChanges({
                items: next,
                lookup: nodeLookup,
            }));
        }
    }, []);
    const nodeQueue = useQueue(nodeQueueHandler);
    const edgeQueueHandler = useCallback((queueItems) => {
        const { edges = [], setEdges, hasDefaultEdges, onEdgesChange, edgeLookup } = store.getState();
        let next = edges;
        for (const payload of queueItems) {
            next = typeof payload === 'function' ? payload(next) : payload;
        }
        if (hasDefaultEdges) {
            setEdges(next);
        }
        else if (onEdgesChange) {
            onEdgesChange(getElementsDiffChanges({
                items: next,
                lookup: edgeLookup,
            }));
        }
    }, []);
    const edgeQueue = useQueue(edgeQueueHandler);
    const value = useMemo(() => ({ nodeQueue, edgeQueue }), []);
    return jsx(BatchContext.Provider, { value: value, children: children });
}
function useBatchContext() {
    const batchContext = useContext(BatchContext);
    if (!batchContext) {
        throw new Error('useBatchContext must be used within a BatchProvider');
    }
    return batchContext;
}

const selector$l = (s) => !!s.panZoom;
/**
 * Hook for accessing the ReactFlow instance.
 *
 * @public
 * @returns ReactFlowInstance
 */
function useReactFlow() {
    const viewportHelper = useViewportHelper();
    const store = useStoreApi();
    const batchContext = useBatchContext();
    const viewportInitialized = useStore(selector$l);
    const generalHelper = useMemo(() => {
        const getInternalNode = (id) => store.getState().nodeLookup.get(id);
        const setNodes = (payload) => {
            batchContext.nodeQueue.push(payload);
        };
        const setEdges = (payload) => {
            batchContext.edgeQueue.push(payload);
        };
        const getNodeRect = (node) => {
            const { nodeLookup, nodeOrigin } = store.getState();
            const nodeToUse = isNode(node) ? node : nodeLookup.get(node.id);
            const position = nodeToUse.parentId
                ? evaluateAbsolutePosition(nodeToUse.position, nodeToUse.measured, nodeToUse.parentId, nodeLookup, nodeOrigin)
                : nodeToUse.position;
            const nodeWithPosition = {
                id: nodeToUse.id,
                position,
                width: nodeToUse.measured?.width ?? nodeToUse.width,
                height: nodeToUse.measured?.height ?? nodeToUse.height,
                data: nodeToUse.data,
            };
            return nodeToRect(nodeWithPosition);
        };
        const updateNode = (id, nodeUpdate, options = { replace: false }) => {
            setNodes((prevNodes) => prevNodes.map((node) => {
                if (node.id === id) {
                    const nextNode = typeof nodeUpdate === 'function' ? nodeUpdate(node) : nodeUpdate;
                    return options.replace && isNode(nextNode) ? nextNode : { ...node, ...nextNode };
                }
                return node;
            }));
        };
        const updateEdge = (id, edgeUpdate, options = { replace: false }) => {
            setEdges((prevEdges) => prevEdges.map((edge) => {
                if (edge.id === id) {
                    const nextEdge = typeof edgeUpdate === 'function' ? edgeUpdate(edge) : edgeUpdate;
                    return options.replace && isEdge(nextEdge) ? nextEdge : { ...edge, ...nextEdge };
                }
                return edge;
            }));
        };
        return {
            getNodes: () => store.getState().nodes.map((n) => ({ ...n })),
            getNode: (id) => getInternalNode(id)?.internals.userNode,
            getInternalNode,
            getEdges: () => {
                const { edges = [] } = store.getState();
                return edges.map((e) => ({ ...e }));
            },
            getEdge: (id) => store.getState().edgeLookup.get(id),
            setNodes,
            setEdges,
            addNodes: (payload) => {
                const newNodes = Array.isArray(payload) ? payload : [payload];
                batchContext.nodeQueue.push((nodes) => [...nodes, ...newNodes]);
            },
            addEdges: (payload) => {
                const newEdges = Array.isArray(payload) ? payload : [payload];
                batchContext.edgeQueue.push((edges) => [...edges, ...newEdges]);
            },
            toObject: () => {
                const { nodes = [], edges = [], transform } = store.getState();
                const [x, y, zoom] = transform;
                return {
                    nodes: nodes.map((n) => ({ ...n })),
                    edges: edges.map((e) => ({ ...e })),
                    viewport: {
                        x,
                        y,
                        zoom,
                    },
                };
            },
            deleteElements: async ({ nodes: nodesToRemove = [], edges: edgesToRemove = [] }) => {
                const { nodes, edges, onNodesDelete, onEdgesDelete, triggerNodeChanges, triggerEdgeChanges, onDelete, onBeforeDelete, } = store.getState();
                const { nodes: matchingNodes, edges: matchingEdges } = await getElementsToRemove({
                    nodesToRemove,
                    edgesToRemove,
                    nodes,
                    edges,
                    onBeforeDelete,
                });
                const hasMatchingEdges = matchingEdges.length > 0;
                const hasMatchingNodes = matchingNodes.length > 0;
                if (hasMatchingEdges) {
                    const edgeChanges = matchingEdges.map(elementToRemoveChange);
                    onEdgesDelete?.(matchingEdges);
                    triggerEdgeChanges(edgeChanges);
                }
                if (hasMatchingNodes) {
                    const nodeChanges = matchingNodes.map(elementToRemoveChange);
                    onNodesDelete?.(matchingNodes);
                    triggerNodeChanges(nodeChanges);
                }
                if (hasMatchingNodes || hasMatchingEdges) {
                    onDelete?.({ nodes: matchingNodes, edges: matchingEdges });
                }
                return { deletedNodes: matchingNodes, deletedEdges: matchingEdges };
            },
            getIntersectingNodes: (nodeOrRect, partially = true, nodes) => {
                const isRect = isRectObject(nodeOrRect);
                const nodeRect = isRect ? nodeOrRect : getNodeRect(nodeOrRect);
                const hasNodesOption = nodes !== undefined;
                if (!nodeRect) {
                    return [];
                }
                return (nodes || store.getState().nodes).filter((n) => {
                    const internalNode = store.getState().nodeLookup.get(n.id);
                    if (internalNode && !isRect && (n.id === nodeOrRect.id || !internalNode.internals.positionAbsolute)) {
                        return false;
                    }
                    const currNodeRect = nodeToRect(hasNodesOption ? n : internalNode);
                    const overlappingArea = getOverlappingArea(currNodeRect, nodeRect);
                    const partiallyVisible = partially && overlappingArea > 0;
                    return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
                });
            },
            isNodeIntersecting: (nodeOrRect, area, partially = true) => {
                const isRect = isRectObject(nodeOrRect);
                const nodeRect = isRect ? nodeOrRect : getNodeRect(nodeOrRect);
                if (!nodeRect) {
                    return false;
                }
                const overlappingArea = getOverlappingArea(nodeRect, area);
                const partiallyVisible = partially && overlappingArea > 0;
                return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
            },
            updateNode,
            updateNodeData: (id, dataUpdate, options = { replace: false }) => {
                updateNode(id, (node) => {
                    const nextData = typeof dataUpdate === 'function' ? dataUpdate(node) : dataUpdate;
                    return options.replace ? { ...node, data: nextData } : { ...node, data: { ...node.data, ...nextData } };
                }, options);
            },
            updateEdge,
            updateEdgeData: (id, dataUpdate, options = { replace: false }) => {
                updateEdge(id, (edge) => {
                    const nextData = typeof dataUpdate === 'function' ? dataUpdate(edge) : dataUpdate;
                    return options.replace ? { ...edge, data: nextData } : { ...edge, data: { ...edge.data, ...nextData } };
                }, options);
            },
        };
    }, []);
    return useMemo(() => {
        return {
            ...generalHelper,
            ...viewportHelper,
            viewportInitialized,
        };
    }, [viewportInitialized]);
}

const selected = (item) => item.selected;
const deleteKeyOptions = { actInsideInputWithModifier: false };
const win$1 = window ;
/**
 * Hook for handling global key events.
 *
 * @internal
 */
function useGlobalKeyHandler({ deleteKeyCode, multiSelectionKeyCode, }) {
    const store = useStoreApi();
    const { deleteElements } = useReactFlow();
    const deleteKeyPressed = useKeyPress(deleteKeyCode, deleteKeyOptions);
    const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode, { target: win$1 });
    useEffect(() => {
        if (deleteKeyPressed) {
            const { edges, nodes } = store.getState();
            deleteElements({ nodes: nodes.filter(selected), edges: edges.filter(selected) });
            store.setState({ nodesSelectionActive: false });
        }
    }, [deleteKeyPressed]);
    useEffect(() => {
        store.setState({ multiSelectionActive: multiSelectionKeyPressed });
    }, [multiSelectionKeyPressed]);
}

/**
 * Hook for handling resize events.
 *
 * @internal
 */
function useResizeHandler(domNode) {
    const store = useStoreApi();
    useEffect(() => {
        const updateDimensions = () => {
            if (!domNode.current) {
                return false;
            }
            const size = getDimensions(domNode.current);
            if (size.height === 0 || size.width === 0) {
                store.getState().onError?.('004', errorMessages['error004']());
            }
            store.setState({ width: size.width || 500, height: size.height || 500 });
        };
        if (domNode.current) {
            updateDimensions();
            window.addEventListener('resize', updateDimensions);
            const resizeObserver = new ResizeObserver(() => updateDimensions());
            resizeObserver.observe(domNode.current);
            return () => {
                window.removeEventListener('resize', updateDimensions);
                if (resizeObserver && domNode.current) {
                    resizeObserver.unobserve(domNode.current);
                }
            };
        }
    }, []);
}

const containerStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
};

const selector$k = (s) => ({
    userSelectionActive: s.userSelectionActive,
    lib: s.lib,
});
function ZoomPane({ onPaneContextMenu, zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panOnScrollSpeed = 0.5, panOnScrollMode = PanOnScrollMode.Free, zoomOnDoubleClick = true, panOnDrag = true, defaultViewport, translateExtent, minZoom, maxZoom, zoomActivationKeyCode, preventScrolling = true, children, noWheelClassName, noPanClassName, onViewportChange, isControlledViewport, paneClickDistance, }) {
    const store = useStoreApi();
    const zoomPane = useRef(null);
    const { userSelectionActive, lib } = useStore(selector$k, shallow$1);
    const zoomActivationKeyPressed = useKeyPress(zoomActivationKeyCode);
    const panZoom = useRef();
    useResizeHandler(zoomPane);
    useEffect(() => {
        if (zoomPane.current) {
            panZoom.current = XYPanZoom({
                domNode: zoomPane.current,
                minZoom,
                maxZoom,
                translateExtent,
                viewport: defaultViewport,
                paneClickDistance,
                onTransformChange: (transform) => {
                    onViewportChange?.({ x: transform[0], y: transform[1], zoom: transform[2] });
                    if (!isControlledViewport) {
                        store.setState({ transform });
                    }
                },
                onDraggingChange: (paneDragging) => store.setState({ paneDragging }),
                onPanZoomStart: (event, vp) => {
                    const { onViewportChangeStart, onMoveStart } = store.getState();
                    onMoveStart?.(event, vp);
                    onViewportChangeStart?.(vp);
                },
                onPanZoom: (event, vp) => {
                    const { onViewportChange, onMove } = store.getState();
                    onMove?.(event, vp);
                    onViewportChange?.(vp);
                },
                onPanZoomEnd: (event, vp) => {
                    const { onViewportChangeEnd, onMoveEnd } = store.getState();
                    onMoveEnd?.(event, vp);
                    onViewportChangeEnd?.(vp);
                },
            });
            const { x, y, zoom } = panZoom.current.getViewport();
            store.setState({
                panZoom: panZoom.current,
                transform: [x, y, zoom],
                domNode: zoomPane.current.closest('.react-flow'),
            });
            return () => {
                panZoom.current?.destroy();
            };
        }
    }, []);
    useEffect(() => {
        panZoom.current?.update({
            onPaneContextMenu,
            zoomOnScroll,
            zoomOnPinch,
            panOnScroll,
            panOnScrollSpeed,
            panOnScrollMode,
            zoomOnDoubleClick,
            panOnDrag,
            zoomActivationKeyPressed,
            preventScrolling,
            noPanClassName,
            userSelectionActive,
            noWheelClassName,
            lib,
        });
    }, [
        onPaneContextMenu,
        zoomOnScroll,
        zoomOnPinch,
        panOnScroll,
        panOnScrollSpeed,
        panOnScrollMode,
        zoomOnDoubleClick,
        panOnDrag,
        zoomActivationKeyPressed,
        preventScrolling,
        noPanClassName,
        userSelectionActive,
        noWheelClassName,
        lib,
    ]);
    return (jsx("div", { className: "react-flow__renderer", ref: zoomPane, style: containerStyle, children: children }));
}

const selector$j = (s) => ({
    userSelectionActive: s.userSelectionActive,
    userSelectionRect: s.userSelectionRect,
});
function UserSelection() {
    const { userSelectionActive, userSelectionRect } = useStore(selector$j, shallow$1);
    const isActive = userSelectionActive && userSelectionRect;
    if (!isActive) {
        return null;
    }
    return (jsx("div", { className: "react-flow__selection react-flow__container", style: {
            width: userSelectionRect.width,
            height: userSelectionRect.height,
            transform: `translate(${userSelectionRect.x}px, ${userSelectionRect.y}px)`,
        } }));
}

const wrapHandler = (handler, containerRef) => {
    return (event) => {
        if (event.target !== containerRef.current) {
            return;
        }
        handler?.(event);
    };
};
const selector$i = (s) => ({
    userSelectionActive: s.userSelectionActive,
    elementsSelectable: s.elementsSelectable,
    dragging: s.paneDragging,
});
function Pane({ isSelecting, selectionKeyPressed, selectionMode = SelectionMode.Full, panOnDrag, selectionOnDrag, onSelectionStart, onSelectionEnd, onPaneClick, onPaneContextMenu, onPaneScroll, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, children, }) {
    const container = useRef(null);
    const store = useStoreApi();
    const prevSelectedNodesCount = useRef(0);
    const prevSelectedEdgesCount = useRef(0);
    const containerBounds = useRef();
    const edgeIdLookup = useRef(new Map());
    const { userSelectionActive, elementsSelectable, dragging } = useStore(selector$i, shallow$1);
    const hasActiveSelection = elementsSelectable && (isSelecting || userSelectionActive);
    // Used to prevent click events when the user lets go of the selectionKey during a selection
    const selectionInProgress = useRef(false);
    const selectionStarted = useRef(false);
    const resetUserSelection = () => {
        store.setState({ userSelectionActive: false, userSelectionRect: null });
        prevSelectedNodesCount.current = 0;
        prevSelectedEdgesCount.current = 0;
    };
    const onClick = (event) => {
        // We prevent click events when the user let go of the selectionKey during a selection
        if (selectionInProgress.current) {
            selectionInProgress.current = false;
            return;
        }
        onPaneClick?.(event);
        store.getState().resetSelectedElements();
        store.setState({ nodesSelectionActive: false });
    };
    const onContextMenu = (event) => {
        if (Array.isArray(panOnDrag) && panOnDrag?.includes(2)) {
            event.preventDefault();
            return;
        }
        onPaneContextMenu?.(event);
    };
    const onWheel = onPaneScroll ? (event) => onPaneScroll(event) : undefined;
    const onPointerDown = (event) => {
        const { resetSelectedElements, domNode, edgeLookup } = store.getState();
        containerBounds.current = domNode?.getBoundingClientRect();
        event.target?.setPointerCapture?.(event.pointerId);
        if (!elementsSelectable ||
            !isSelecting ||
            event.button !== 0 ||
            event.target !== container.current ||
            !containerBounds.current) {
            return;
        }
        selectionStarted.current = true;
        selectionInProgress.current = false;
        edgeIdLookup.current = new Map();
        for (const [id, edge] of edgeLookup) {
            edgeIdLookup.current.set(edge.source, edgeIdLookup.current.get(edge.source)?.add(id) || new Set([id]));
            edgeIdLookup.current.set(edge.target, edgeIdLookup.current.get(edge.target)?.add(id) || new Set([id]));
        }
        const { x, y } = getEventPosition(event.nativeEvent, containerBounds.current);
        resetSelectedElements();
        store.setState({
            userSelectionRect: {
                width: 0,
                height: 0,
                startX: x,
                startY: y,
                x,
                y,
            },
        });
        onSelectionStart?.(event);
    };
    const onPointerMove = (event) => {
        const { userSelectionRect, edgeLookup, transform, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = store.getState();
        if (!containerBounds.current || !userSelectionRect) {
            return;
        }
        selectionInProgress.current = true;
        const { x: mouseX, y: mouseY } = getEventPosition(event.nativeEvent, containerBounds.current);
        const { startX, startY } = userSelectionRect;
        const nextUserSelectRect = {
            startX,
            startY,
            x: mouseX < startX ? mouseX : startX,
            y: mouseY < startY ? mouseY : startY,
            width: Math.abs(mouseX - startX),
            height: Math.abs(mouseY - startY),
        };
        const selectedNodes = getNodesInside(nodeLookup, nextUserSelectRect, transform, selectionMode === SelectionMode.Partial, true);
        const selectedEdgeIds = new Set();
        const selectedNodeIds = new Set();
        for (const selectedNode of selectedNodes) {
            selectedNodeIds.add(selectedNode.id);
            const edgeIds = edgeIdLookup.current.get(selectedNode.id);
            if (edgeIds) {
                for (const edgeId of edgeIds) {
                    selectedEdgeIds.add(edgeId);
                }
            }
        }
        if (prevSelectedNodesCount.current !== selectedNodeIds.size) {
            prevSelectedNodesCount.current = selectedNodeIds.size;
            const changes = getSelectionChanges(nodeLookup, selectedNodeIds, true);
            triggerNodeChanges(changes);
        }
        if (prevSelectedEdgesCount.current !== selectedEdgeIds.size) {
            prevSelectedEdgesCount.current = selectedEdgeIds.size;
            const changes = getSelectionChanges(edgeLookup, selectedEdgeIds);
            triggerEdgeChanges(changes);
        }
        store.setState({
            userSelectionRect: nextUserSelectRect,
            userSelectionActive: true,
            nodesSelectionActive: false,
        });
    };
    const onPointerUp = (event) => {
        if (event.button !== 0 || !selectionStarted.current) {
            return;
        }
        event.target?.releasePointerCapture?.(event.pointerId);
        const { userSelectionRect } = store.getState();
        // We only want to trigger click functions when in selection mode if
        // the user did not move the mouse.
        if (!userSelectionActive && userSelectionRect && event.target === container.current) {
            onClick?.(event);
        }
        if (prevSelectedNodesCount.current > 0) {
            store.setState({ nodesSelectionActive: true });
        }
        resetUserSelection();
        onSelectionEnd?.(event);
        // If the user kept holding the selectionKey during the selection,
        // we need to reset the selectionInProgress, so the next click event is not prevented
        if (selectionKeyPressed || selectionOnDrag) {
            selectionInProgress.current = false;
        }
        selectionStarted.current = false;
    };
    return (jsxs("div", { className: cc(['react-flow__pane', { draggable: panOnDrag, dragging, selection: isSelecting }]), onClick: hasActiveSelection ? undefined : wrapHandler(onClick, container), onContextMenu: wrapHandler(onContextMenu, container), onWheel: wrapHandler(onWheel, container), onPointerEnter: hasActiveSelection ? undefined : onPaneMouseEnter, onPointerDown: hasActiveSelection ? onPointerDown : onPaneMouseMove, onPointerMove: hasActiveSelection ? onPointerMove : onPaneMouseMove, onPointerUp: hasActiveSelection ? onPointerUp : undefined, onPointerLeave: onPaneMouseLeave, ref: container, style: containerStyle, children: [children, jsx(UserSelection, {})] }));
}

// this handler is called by
// 1. the click handler when node is not draggable or selectNodesOnDrag = false
// or
// 2. the on drag start handler when node is draggable and selectNodesOnDrag = true
function handleNodeClick({ id, store, unselect = false, nodeRef, }) {
    const { addSelectedNodes, unselectNodesAndEdges, multiSelectionActive, nodeLookup, onError } = store.getState();
    const node = nodeLookup.get(id);
    if (!node) {
        onError?.('012', errorMessages['error012'](id));
        return;
    }
    store.setState({ nodesSelectionActive: false });
    if (!node.selected) {
        addSelectedNodes([id]);
    }
    else if (unselect || (node.selected && multiSelectionActive)) {
        unselectNodesAndEdges({ nodes: [node], edges: [] });
        requestAnimationFrame(() => nodeRef?.current?.blur());
    }
}

/**
 * Hook for calling XYDrag helper from @xyflow/system.
 *
 * @internal
 */
function useDrag({ nodeRef, disabled = false, noDragClassName, handleSelector, nodeId, isSelectable, nodeClickDistance, }) {
    const store = useStoreApi();
    const [dragging, setDragging] = useState(false);
    const xyDrag = useRef();
    useEffect(() => {
        xyDrag.current = XYDrag({
            getStoreItems: () => store.getState(),
            onNodeMouseDown: (id) => {
                handleNodeClick({
                    id,
                    store,
                    nodeRef,
                });
            },
            onDragStart: () => {
                setDragging(true);
            },
            onDragStop: () => {
                setDragging(false);
            },
        });
    }, []);
    useEffect(() => {
        if (disabled) {
            xyDrag.current?.destroy();
        }
        else if (nodeRef.current) {
            xyDrag.current?.update({
                noDragClassName,
                handleSelector,
                domNode: nodeRef.current,
                isSelectable,
                nodeId,
                nodeClickDistance,
            });
            return () => {
                xyDrag.current?.destroy();
            };
        }
    }, [noDragClassName, handleSelector, disabled, isSelectable, nodeRef, nodeId]);
    return dragging;
}

const selectedAndDraggable = (nodesDraggable) => (n) => n.selected && (n.draggable || (nodesDraggable && typeof n.draggable === 'undefined'));
/**
 * Hook for updating node positions by passing a direction and factor
 *
 * @internal
 * @returns function for updating node positions
 */
function useMoveSelectedNodes() {
    const store = useStoreApi();
    const moveSelectedNodes = useCallback((params) => {
        const { nodeExtent, snapToGrid, snapGrid, nodesDraggable, onError, updateNodePositions, nodeLookup, nodeOrigin } = store.getState();
        const nodeUpdates = new Map();
        const isSelected = selectedAndDraggable(nodesDraggable);
        // by default a node moves 5px on each key press
        // if snap grid is enabled, we use that for the velocity
        const xVelo = snapToGrid ? snapGrid[0] : 5;
        const yVelo = snapToGrid ? snapGrid[1] : 5;
        const xDiff = params.direction.x * xVelo * params.factor;
        const yDiff = params.direction.y * yVelo * params.factor;
        for (const [, node] of nodeLookup) {
            if (!isSelected(node)) {
                continue;
            }
            let nextPosition = {
                x: node.internals.positionAbsolute.x + xDiff,
                y: node.internals.positionAbsolute.y + yDiff,
            };
            if (snapToGrid) {
                nextPosition = snapPosition(nextPosition, snapGrid);
            }
            const { position, positionAbsolute } = calculateNodePosition({
                nodeId: node.id,
                nextPosition,
                nodeLookup,
                nodeExtent,
                nodeOrigin,
                onError,
            });
            node.position = position;
            node.internals.positionAbsolute = positionAbsolute;
            nodeUpdates.set(node.id, node);
        }
        updateNodePositions(nodeUpdates);
    }, []);
    return moveSelectedNodes;
}

const NodeIdContext = createContext(null);
const Provider = NodeIdContext.Provider;
NodeIdContext.Consumer;
const useNodeId = () => {
    const nodeId = useContext(NodeIdContext);
    return nodeId;
};

const selector$h = (s) => ({
    connectOnClick: s.connectOnClick,
    noPanClassName: s.noPanClassName,
    rfId: s.rfId,
});
const connectingSelector = (nodeId, handleId, type) => (state) => {
    const { connectionClickStartHandle: clickHandle, connectionMode, connection } = state;
    const { fromHandle, toHandle, isValid } = connection;
    const connectingTo = toHandle?.nodeId === nodeId && toHandle?.id === handleId && toHandle?.type === type;
    return {
        connectingFrom: fromHandle?.nodeId === nodeId && fromHandle?.id === handleId && fromHandle?.type === type,
        connectingTo,
        clickConnecting: clickHandle?.nodeId === nodeId && clickHandle?.id === handleId && clickHandle?.type === type,
        isPossibleEndHandle: connectionMode === ConnectionMode.Strict
            ? fromHandle?.type !== type
            : nodeId !== fromHandle?.nodeId || handleId !== fromHandle?.id,
        connectionInProcess: !!fromHandle,
        valid: connectingTo && isValid,
    };
};
function HandleComponent({ type = 'source', position = Position.Top, isValidConnection, isConnectable = true, isConnectableStart = true, isConnectableEnd = true, id, onConnect, children, className, onMouseDown, onTouchStart, ...rest }, ref) {
    const handleId = id || null;
    const isTarget = type === 'target';
    const store = useStoreApi();
    const nodeId = useNodeId();
    const { connectOnClick, noPanClassName, rfId } = useStore(selector$h, shallow$1);
    const { connectingFrom, connectingTo, clickConnecting, isPossibleEndHandle, connectionInProcess, valid } = useStore(connectingSelector(nodeId, handleId, type), shallow$1);
    if (!nodeId) {
        store.getState().onError?.('010', errorMessages['error010']());
    }
    const onConnectExtended = (params) => {
        const { defaultEdgeOptions, onConnect: onConnectAction, hasDefaultEdges } = store.getState();
        const edgeParams = {
            ...defaultEdgeOptions,
            ...params,
        };
        if (hasDefaultEdges) {
            const { edges, setEdges } = store.getState();
            setEdges(addEdge(edgeParams, edges));
        }
        onConnectAction?.(edgeParams);
        onConnect?.(edgeParams);
    };
    const onPointerDown = (event) => {
        if (!nodeId) {
            return;
        }
        const isMouseTriggered = isMouseEvent(event.nativeEvent);
        if (isConnectableStart &&
            ((isMouseTriggered && event.button === 0) || !isMouseTriggered)) {
            const currentStore = store.getState();
            XYHandle.onPointerDown(event.nativeEvent, {
                autoPanOnConnect: currentStore.autoPanOnConnect,
                connectionMode: currentStore.connectionMode,
                connectionRadius: currentStore.connectionRadius,
                domNode: currentStore.domNode,
                nodeLookup: currentStore.nodeLookup,
                lib: currentStore.lib,
                isTarget,
                handleId,
                nodeId,
                flowId: currentStore.rfId,
                panBy: currentStore.panBy,
                cancelConnection: currentStore.cancelConnection,
                onConnectStart: currentStore.onConnectStart,
                onConnectEnd: currentStore.onConnectEnd,
                updateConnection: currentStore.updateConnection,
                onConnect: onConnectExtended,
                isValidConnection: isValidConnection || currentStore.isValidConnection,
                getTransform: () => store.getState().transform,
                getFromHandle: () => store.getState().connection.fromHandle,
                autoPanSpeed: currentStore.autoPanSpeed,
            });
        }
        if (isMouseTriggered) {
            onMouseDown?.(event);
        }
        else {
            onTouchStart?.(event);
        }
    };
    const onClick = (event) => {
        const { onClickConnectStart, onClickConnectEnd, connectionClickStartHandle, connectionMode, isValidConnection: isValidConnectionStore, lib, rfId: flowId, } = store.getState();
        if (!nodeId || (!connectionClickStartHandle && !isConnectableStart)) {
            return;
        }
        if (!connectionClickStartHandle) {
            onClickConnectStart?.(event.nativeEvent, { nodeId, handleId, handleType: type });
            store.setState({ connectionClickStartHandle: { nodeId, type, id: handleId } });
            return;
        }
        const doc = getHostForElement(event.target);
        const isValidConnectionHandler = isValidConnection || isValidConnectionStore;
        const { connection, isValid } = XYHandle.isValid(event.nativeEvent, {
            handle: {
                nodeId,
                id: handleId,
                type,
            },
            connectionMode,
            fromNodeId: connectionClickStartHandle.nodeId,
            fromHandleId: connectionClickStartHandle.id || null,
            fromType: connectionClickStartHandle.type,
            isValidConnection: isValidConnectionHandler,
            flowId,
            doc,
            lib,
        });
        if (isValid && connection) {
            onConnectExtended(connection);
        }
        onClickConnectEnd?.(event);
        store.setState({ connectionClickStartHandle: null });
    };
    return (jsx("div", { "data-handleid": handleId, "data-nodeid": nodeId, "data-handlepos": position, "data-id": `${rfId}-${nodeId}-${handleId}-${type}`, className: cc([
            'react-flow__handle',
            `react-flow__handle-${position}`,
            'nodrag',
            noPanClassName,
            className,
            {
                source: !isTarget,
                target: isTarget,
                connectable: isConnectable,
                connectablestart: isConnectableStart,
                connectableend: isConnectableEnd,
                clickconnecting: clickConnecting,
                connectingfrom: connectingFrom,
                connectingto: connectingTo,
                valid,
                // shows where you can start a connection from
                // and where you can end it while connecting
                connectionindicator: isConnectable &&
                    (!connectionInProcess || isPossibleEndHandle) &&
                    (connectionInProcess ? isConnectableEnd : isConnectableStart),
            },
        ]), onMouseDown: onPointerDown, onTouchStart: onPointerDown, onClick: connectOnClick ? onClick : undefined, ref: ref, ...rest, children: children }));
}
/**
 * The Handle component is a UI element that is used to connect nodes.
 */
const Handle = memo(fixedForwardRef(HandleComponent));

function InputNode({ data, isConnectable, sourcePosition = Position.Bottom }) {
    return (jsxs(Fragment, { children: [data?.label, jsx(Handle, { type: "source", position: sourcePosition, isConnectable: isConnectable })] }));
}

function DefaultNode({ data, isConnectable, targetPosition = Position.Top, sourcePosition = Position.Bottom, }) {
    return (jsxs(Fragment, { children: [jsx(Handle, { type: "target", position: targetPosition, isConnectable: isConnectable }), data?.label, jsx(Handle, { type: "source", position: sourcePosition, isConnectable: isConnectable })] }));
}

function GroupNode() {
    return null;
}

function OutputNode({ data, isConnectable, targetPosition = Position.Top }) {
    return (jsxs(Fragment, { children: [jsx(Handle, { type: "target", position: targetPosition, isConnectable: isConnectable }), data?.label] }));
}

const arrowKeyDiffs = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
};
const builtinNodeTypes = {
    input: InputNode,
    default: DefaultNode,
    output: OutputNode,
    group: GroupNode,
};
function getNodeInlineStyleDimensions(node) {
    if (node.internals.handleBounds === undefined) {
        return {
            width: node.width ?? node.initialWidth ?? node.style?.width,
            height: node.height ?? node.initialHeight ?? node.style?.height,
        };
    }
    return {
        width: node.width ?? node.style?.width,
        height: node.height ?? node.style?.height,
    };
}

const selector$g = (s) => {
    const { width, height, x, y } = getInternalNodesBounds(s.nodeLookup, {
        filter: (node) => !!node.selected,
    });
    return {
        width: isNumeric(width) ? width : null,
        height: isNumeric(height) ? height : null,
        userSelectionActive: s.userSelectionActive,
        transformString: `translate(${s.transform[0]}px,${s.transform[1]}px) scale(${s.transform[2]}) translate(${x}px,${y}px)`,
    };
};
function NodesSelection({ onSelectionContextMenu, noPanClassName, disableKeyboardA11y, }) {
    const store = useStoreApi();
    const { width, height, transformString, userSelectionActive } = useStore(selector$g, shallow$1);
    const moveSelectedNodes = useMoveSelectedNodes();
    const nodeRef = useRef(null);
    useEffect(() => {
        if (!disableKeyboardA11y) {
            nodeRef.current?.focus({
                preventScroll: true,
            });
        }
    }, [disableKeyboardA11y]);
    useDrag({
        nodeRef,
    });
    if (userSelectionActive || !width || !height) {
        return null;
    }
    const onContextMenu = onSelectionContextMenu
        ? (event) => {
            const selectedNodes = store.getState().nodes.filter((n) => n.selected);
            onSelectionContextMenu(event, selectedNodes);
        }
        : undefined;
    const onKeyDown = (event) => {
        if (Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
            moveSelectedNodes({
                direction: arrowKeyDiffs[event.key],
                factor: event.shiftKey ? 4 : 1,
            });
        }
    };
    return (jsx("div", { className: cc(['react-flow__nodesselection', 'react-flow__container', noPanClassName]), style: {
            transform: transformString,
        }, children: jsx("div", { ref: nodeRef, className: "react-flow__nodesselection-rect", onContextMenu: onContextMenu, tabIndex: disableKeyboardA11y ? undefined : -1, onKeyDown: disableKeyboardA11y ? undefined : onKeyDown, style: {
                width,
                height,
            } }) }));
}

const win = window ;
const selector$f = (s) => {
    return { nodesSelectionActive: s.nodesSelectionActive, userSelectionActive: s.userSelectionActive };
};
function FlowRendererComponent({ children, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneContextMenu, onPaneScroll, paneClickDistance, deleteKeyCode, selectionKeyCode, selectionOnDrag, selectionMode, onSelectionStart, onSelectionEnd, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, elementsSelectable, zoomOnScroll, zoomOnPinch, panOnScroll: _panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag: _panOnDrag, defaultViewport, translateExtent, minZoom, maxZoom, preventScrolling, onSelectionContextMenu, noWheelClassName, noPanClassName, disableKeyboardA11y, onViewportChange, isControlledViewport, }) {
    const { nodesSelectionActive, userSelectionActive } = useStore(selector$f);
    const selectionKeyPressed = useKeyPress(selectionKeyCode, { target: win });
    const panActivationKeyPressed = useKeyPress(panActivationKeyCode, { target: win });
    const panOnDrag = panActivationKeyPressed || _panOnDrag;
    const panOnScroll = panActivationKeyPressed || _panOnScroll;
    const _selectionOnDrag = selectionOnDrag && panOnDrag !== true;
    const isSelecting = selectionKeyPressed || userSelectionActive || _selectionOnDrag;
    useGlobalKeyHandler({ deleteKeyCode, multiSelectionKeyCode });
    return (jsx(ZoomPane, { onPaneContextMenu: onPaneContextMenu, elementsSelectable: elementsSelectable, zoomOnScroll: zoomOnScroll, zoomOnPinch: zoomOnPinch, panOnScroll: panOnScroll, panOnScrollSpeed: panOnScrollSpeed, panOnScrollMode: panOnScrollMode, zoomOnDoubleClick: zoomOnDoubleClick, panOnDrag: !selectionKeyPressed && panOnDrag, defaultViewport: defaultViewport, translateExtent: translateExtent, minZoom: minZoom, maxZoom: maxZoom, zoomActivationKeyCode: zoomActivationKeyCode, preventScrolling: preventScrolling, noWheelClassName: noWheelClassName, noPanClassName: noPanClassName, onViewportChange: onViewportChange, isControlledViewport: isControlledViewport, paneClickDistance: paneClickDistance, children: jsxs(Pane, { onSelectionStart: onSelectionStart, onSelectionEnd: onSelectionEnd, onPaneClick: onPaneClick, onPaneMouseEnter: onPaneMouseEnter, onPaneMouseMove: onPaneMouseMove, onPaneMouseLeave: onPaneMouseLeave, onPaneContextMenu: onPaneContextMenu, onPaneScroll: onPaneScroll, panOnDrag: panOnDrag, isSelecting: !!isSelecting, selectionMode: selectionMode, selectionKeyPressed: selectionKeyPressed, selectionOnDrag: _selectionOnDrag, children: [children, nodesSelectionActive && (jsx(NodesSelection, { onSelectionContextMenu: onSelectionContextMenu, noPanClassName: noPanClassName, disableKeyboardA11y: disableKeyboardA11y }))] }) }));
}
FlowRendererComponent.displayName = 'FlowRenderer';
const FlowRenderer = memo(FlowRendererComponent);

const selector$e = (onlyRenderVisible) => (s) => {
    return onlyRenderVisible
        ? getNodesInside(s.nodeLookup, { x: 0, y: 0, width: s.width, height: s.height }, s.transform, true).map((node) => node.id)
        : Array.from(s.nodeLookup.keys());
};
/**
 * Hook for getting the visible node ids from the store.
 *
 * @internal
 * @param onlyRenderVisible
 * @returns array with visible node ids
 */
function useVisibleNodeIds(onlyRenderVisible) {
    const nodeIds = useStore(useCallback(selector$e(onlyRenderVisible), [onlyRenderVisible]), shallow$1);
    return nodeIds;
}

const selector$d = (s) => s.updateNodeInternals;
function useResizeObserver() {
    const updateNodeInternals = useStore(selector$d);
    const [resizeObserver] = useState(() => {
        if (typeof ResizeObserver === 'undefined') {
            return null;
        }
        return new ResizeObserver((entries) => {
            const updates = new Map();
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('data-id');
                updates.set(id, {
                    id,
                    nodeElement: entry.target,
                    force: true,
                });
            });
            updateNodeInternals(updates);
        });
    });
    useEffect(() => {
        return () => {
            resizeObserver?.disconnect();
        };
    }, [resizeObserver]);
    return resizeObserver;
}

/**
 * Hook to handle the resize observation + internal updates for the passed node.
 *
 * @internal
 * @returns nodeRef - reference to the node element
 */
function useNodeObserver({ node, nodeType, hasDimensions, resizeObserver, }) {
    const store = useStoreApi();
    const nodeRef = useRef(null);
    const observedNode = useRef(null);
    const prevSourcePosition = useRef(node.sourcePosition);
    const prevTargetPosition = useRef(node.targetPosition);
    const prevType = useRef(nodeType);
    const isInitialized = hasDimensions && !!node.internals.handleBounds;
    useEffect(() => {
        if (nodeRef.current && !node.hidden && (!isInitialized || observedNode.current !== nodeRef.current)) {
            if (observedNode.current) {
                resizeObserver?.unobserve(observedNode.current);
            }
            resizeObserver?.observe(nodeRef.current);
            observedNode.current = nodeRef.current;
        }
    }, [isInitialized, node.hidden]);
    useEffect(() => {
        return () => {
            if (observedNode.current) {
                resizeObserver?.unobserve(observedNode.current);
                observedNode.current = null;
            }
        };
    }, []);
    useEffect(() => {
        if (nodeRef.current) {
            // when the user programmatically changes the source or handle position, we need to update the internals
            // to make sure the edges are updated correctly
            const typeChanged = prevType.current !== nodeType;
            const sourcePosChanged = prevSourcePosition.current !== node.sourcePosition;
            const targetPosChanged = prevTargetPosition.current !== node.targetPosition;
            if (typeChanged || sourcePosChanged || targetPosChanged) {
                prevType.current = nodeType;
                prevSourcePosition.current = node.sourcePosition;
                prevTargetPosition.current = node.targetPosition;
                store
                    .getState()
                    .updateNodeInternals(new Map([[node.id, { id: node.id, nodeElement: nodeRef.current, force: true }]]));
            }
        }
    }, [node.id, nodeType, node.sourcePosition, node.targetPosition]);
    return nodeRef;
}

function NodeWrapper({ id, onClick, onMouseEnter, onMouseMove, onMouseLeave, onContextMenu, onDoubleClick, nodesDraggable, elementsSelectable, nodesConnectable, nodesFocusable, resizeObserver, noDragClassName, noPanClassName, disableKeyboardA11y, rfId, nodeTypes, nodeExtent, nodeClickDistance, onError, }) {
    const { node, internals, isParent } = useStore((s) => {
        const node = s.nodeLookup.get(id);
        const isParent = s.parentLookup.has(id);
        return {
            node,
            internals: node.internals,
            isParent,
        };
    }, shallow$1);
    let nodeType = node.type || 'default';
    let NodeComponent = nodeTypes?.[nodeType] || builtinNodeTypes[nodeType];
    if (NodeComponent === undefined) {
        onError?.('003', errorMessages['error003'](nodeType));
        nodeType = 'default';
        NodeComponent = builtinNodeTypes.default;
    }
    const isDraggable = !!(node.draggable || (nodesDraggable && typeof node.draggable === 'undefined'));
    const isSelectable = !!(node.selectable || (elementsSelectable && typeof node.selectable === 'undefined'));
    const isConnectable = !!(node.connectable || (nodesConnectable && typeof node.connectable === 'undefined'));
    const isFocusable = !!(node.focusable || (nodesFocusable && typeof node.focusable === 'undefined'));
    const store = useStoreApi();
    const hasDimensions = nodeHasDimensions(node);
    const nodeRef = useNodeObserver({ node, nodeType, hasDimensions, resizeObserver });
    const dragging = useDrag({
        nodeRef,
        disabled: node.hidden || !isDraggable,
        noDragClassName,
        handleSelector: node.dragHandle,
        nodeId: id,
        isSelectable,
        nodeClickDistance,
    });
    const moveSelectedNodes = useMoveSelectedNodes();
    if (node.hidden) {
        return null;
    }
    const nodeDimensions = getNodeDimensions(node);
    const inlineDimensions = getNodeInlineStyleDimensions(node);
    // TODO: clamping should happen earlier
    const clampedPosition = nodeExtent
        ? clampPosition(internals.positionAbsolute, nodeExtent)
        : internals.positionAbsolute;
    const hasPointerEvents = isSelectable || isDraggable || onClick || onMouseEnter || onMouseMove || onMouseLeave;
    const onMouseEnterHandler = onMouseEnter
        ? (event) => onMouseEnter(event, { ...internals.userNode })
        : undefined;
    const onMouseMoveHandler = onMouseMove
        ? (event) => onMouseMove(event, { ...internals.userNode })
        : undefined;
    const onMouseLeaveHandler = onMouseLeave
        ? (event) => onMouseLeave(event, { ...internals.userNode })
        : undefined;
    const onContextMenuHandler = onContextMenu
        ? (event) => onContextMenu(event, { ...internals.userNode })
        : undefined;
    const onDoubleClickHandler = onDoubleClick
        ? (event) => onDoubleClick(event, { ...internals.userNode })
        : undefined;
    const onSelectNodeHandler = (event) => {
        const { selectNodesOnDrag, nodeDragThreshold } = store.getState();
        if (isSelectable && (!selectNodesOnDrag || !isDraggable || nodeDragThreshold > 0)) {
            // this handler gets called by XYDrag on drag start when selectNodesOnDrag=true
            // here we only need to call it when selectNodesOnDrag=false
            handleNodeClick({
                id,
                store,
                nodeRef,
            });
        }
        if (onClick) {
            onClick(event, { ...internals.userNode });
        }
    };
    const onKeyDown = (event) => {
        if (isInputDOMNode(event.nativeEvent) || disableKeyboardA11y) {
            return;
        }
        if (elementSelectionKeys.includes(event.key) && isSelectable) {
            const unselect = event.key === 'Escape';
            handleNodeClick({
                id,
                store,
                unselect,
                nodeRef,
            });
        }
        else if (isDraggable && node.selected && Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
            store.setState({
                ariaLiveMessage: `Moved selected node ${event.key
                    .replace('Arrow', '')
                    .toLowerCase()}. New position, x: ${~~clampedPosition.x}, y: ${~~clampedPosition.y}`,
            });
            moveSelectedNodes({
                direction: arrowKeyDiffs[event.key],
                factor: event.shiftKey ? 4 : 1,
            });
        }
    };
    return (jsx("div", { className: cc([
            'react-flow__node',
            `react-flow__node-${nodeType}`,
            {
                // this is overwritable by passing `nopan` as a class name
                [noPanClassName]: isDraggable,
            },
            node.className,
            {
                selected: node.selected,
                selectable: isSelectable,
                parent: isParent,
                draggable: isDraggable,
                dragging,
            },
        ]), ref: nodeRef, style: {
            zIndex: internals.z,
            transform: `translate(${clampedPosition.x}px,${clampedPosition.y}px)`,
            pointerEvents: hasPointerEvents ? 'all' : 'none',
            visibility: hasDimensions ? 'visible' : 'hidden',
            ...node.style,
            ...inlineDimensions,
        }, "data-id": id, "data-testid": `rf__node-${id}`, onMouseEnter: onMouseEnterHandler, onMouseMove: onMouseMoveHandler, onMouseLeave: onMouseLeaveHandler, onContextMenu: onContextMenuHandler, onClick: onSelectNodeHandler, onDoubleClick: onDoubleClickHandler, onKeyDown: isFocusable ? onKeyDown : undefined, tabIndex: isFocusable ? 0 : undefined, role: isFocusable ? 'button' : undefined, "aria-describedby": disableKeyboardA11y ? undefined : `${ARIA_NODE_DESC_KEY}-${rfId}`, "aria-label": node.ariaLabel, children: jsx(Provider, { value: id, children: jsx(NodeComponent, { id: id, data: node.data, type: nodeType, positionAbsoluteX: clampedPosition.x, positionAbsoluteY: clampedPosition.y, selected: node.selected, selectable: isSelectable, draggable: isDraggable, deletable: node.deletable ?? true, isConnectable: isConnectable, sourcePosition: node.sourcePosition, targetPosition: node.targetPosition, dragging: dragging, dragHandle: node.dragHandle, zIndex: internals.z, parentId: node.parentId, ...nodeDimensions }) }) }));
}

const selector$c = (s) => ({
    nodesDraggable: s.nodesDraggable,
    nodesConnectable: s.nodesConnectable,
    nodesFocusable: s.nodesFocusable,
    elementsSelectable: s.elementsSelectable,
    onError: s.onError,
});
function NodeRendererComponent(props) {
    const { nodesDraggable, nodesConnectable, nodesFocusable, elementsSelectable, onError } = useStore(selector$c, shallow$1);
    const nodeIds = useVisibleNodeIds(props.onlyRenderVisibleElements);
    const resizeObserver = useResizeObserver();
    return (jsx("div", { className: "react-flow__nodes", style: containerStyle, children: nodeIds.map((nodeId) => {
            return (
            // The split of responsibilities between NodeRenderer and
            // NodeComponentWrapper may appear weird. However, it’s designed to
            // minimize the cost of updates when individual nodes change.
            //
            // For example, when you’re dragging a single node, that node gets
            // updated multiple times per second. If `NodeRenderer` were to update
            // every time, it would have to re-run the `nodes.map()` loop every
            // time. This gets pricey with hundreds of nodes, especially if every
            // loop cycle does more than just rendering a JSX element!
            //
            // As a result of this choice, we took the following implementation
            // decisions:
            // - NodeRenderer subscribes *only* to node IDs – and therefore
            //   rerender *only* when visible nodes are added or removed.
            // - NodeRenderer performs all operations the result of which can be
            //   shared between nodes (such as creating the `ResizeObserver`
            //   instance, or subscribing to `selector`). This means extra prop
            //   drilling into `NodeComponentWrapper`, but it means we need to run
            //   these operations only once – instead of once per node.
            // - Any operations that you’d normally write inside `nodes.map` are
            //   moved into `NodeComponentWrapper`. This ensures they are
            //   memorized – so if `NodeRenderer` *has* to rerender, it only
            //   needs to regenerate the list of nodes, nothing else.
            jsx(NodeWrapper, { id: nodeId, nodeTypes: props.nodeTypes, nodeExtent: props.nodeExtent, onClick: props.onNodeClick, onMouseEnter: props.onNodeMouseEnter, onMouseMove: props.onNodeMouseMove, onMouseLeave: props.onNodeMouseLeave, onContextMenu: props.onNodeContextMenu, onDoubleClick: props.onNodeDoubleClick, noDragClassName: props.noDragClassName, noPanClassName: props.noPanClassName, rfId: props.rfId, disableKeyboardA11y: props.disableKeyboardA11y, resizeObserver: resizeObserver, nodesDraggable: nodesDraggable, nodesConnectable: nodesConnectable, nodesFocusable: nodesFocusable, elementsSelectable: elementsSelectable, nodeClickDistance: props.nodeClickDistance, onError: onError }, nodeId));
        }) }));
}
NodeRendererComponent.displayName = 'NodeRenderer';
const NodeRenderer = memo(NodeRendererComponent);

/**
 * Hook for getting the visible edge ids from the store.
 *
 * @internal
 * @param onlyRenderVisible
 * @returns array with visible edge ids
 */
function useVisibleEdgeIds(onlyRenderVisible) {
    const edgeIds = useStore(useCallback((s) => {
        if (!onlyRenderVisible) {
            return s.edges.map((edge) => edge.id);
        }
        const visibleEdgeIds = [];
        if (s.width && s.height) {
            for (const edge of s.edges) {
                const sourceNode = s.nodeLookup.get(edge.source);
                const targetNode = s.nodeLookup.get(edge.target);
                if (sourceNode &&
                    targetNode &&
                    isEdgeVisible({
                        sourceNode,
                        targetNode,
                        width: s.width,
                        height: s.height,
                        transform: s.transform,
                    })) {
                    visibleEdgeIds.push(edge.id);
                }
            }
        }
        return visibleEdgeIds;
    }, [onlyRenderVisible]), shallow$1);
    return edgeIds;
}

const ArrowSymbol = ({ color = 'none', strokeWidth = 1 }) => {
    return (jsx("polyline", { style: {
            stroke: color,
            strokeWidth,
        }, strokeLinecap: "round", strokeLinejoin: "round", fill: "none", points: "-5,-4 0,0 -5,4" }));
};
const ArrowClosedSymbol = ({ color = 'none', strokeWidth = 1 }) => {
    return (jsx("polyline", { style: {
            stroke: color,
            fill: color,
            strokeWidth,
        }, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" }));
};
const MarkerSymbols = {
    [MarkerType.Arrow]: ArrowSymbol,
    [MarkerType.ArrowClosed]: ArrowClosedSymbol,
};
function useMarkerSymbol(type) {
    const store = useStoreApi();
    const symbol = useMemo(() => {
        const symbolExists = Object.prototype.hasOwnProperty.call(MarkerSymbols, type);
        if (!symbolExists) {
            store.getState().onError?.('009', errorMessages['error009'](type));
            return null;
        }
        return MarkerSymbols[type];
    }, [type]);
    return symbol;
}

const Marker = ({ id, type, color, width = 12.5, height = 12.5, markerUnits = 'strokeWidth', strokeWidth, orient = 'auto-start-reverse', }) => {
    const Symbol = useMarkerSymbol(type);
    if (!Symbol) {
        return null;
    }
    return (jsx("marker", { className: "react-flow__arrowhead", id: id, markerWidth: `${width}`, markerHeight: `${height}`, viewBox: "-10 -10 20 20", markerUnits: markerUnits, orient: orient, refX: "0", refY: "0", children: jsx(Symbol, { color: color, strokeWidth: strokeWidth }) }));
};
// when you have multiple flows on a page and you hide the first one, the other ones have no markers anymore
// when they do have markers with the same ids. To prevent this the user can pass a unique id to the react flow wrapper
// that we can then use for creating our unique marker ids
const MarkerDefinitions = ({ defaultColor, rfId }) => {
    const edges = useStore((s) => s.edges);
    const defaultEdgeOptions = useStore((s) => s.defaultEdgeOptions);
    const markers = useMemo(() => {
        const markers = createMarkerIds(edges, {
            id: rfId,
            defaultColor,
            defaultMarkerStart: defaultEdgeOptions?.markerStart,
            defaultMarkerEnd: defaultEdgeOptions?.markerEnd,
        });
        return markers;
    }, [edges, defaultEdgeOptions, rfId, defaultColor]);
    if (!markers.length) {
        return null;
    }
    return (jsx("svg", { className: "react-flow__marker", children: jsx("defs", { children: markers.map((marker) => (jsx(Marker, { id: marker.id, type: marker.type, color: marker.color, width: marker.width, height: marker.height, markerUnits: marker.markerUnits, strokeWidth: marker.strokeWidth, orient: marker.orient }, marker.id))) }) }));
};
MarkerDefinitions.displayName = 'MarkerDefinitions';
var MarkerDefinitions$1 = memo(MarkerDefinitions);

function EdgeTextComponent({ x, y, label, labelStyle = {}, labelShowBg = true, labelBgStyle = {}, labelBgPadding = [2, 4], labelBgBorderRadius = 2, children, className, ...rest }) {
    const [edgeTextBbox, setEdgeTextBbox] = useState({ x: 1, y: 0, width: 0, height: 0 });
    const edgeTextClasses = cc(['react-flow__edge-textwrapper', className]);
    const edgeTextRef = useRef(null);
    useEffect(() => {
        if (edgeTextRef.current) {
            const textBbox = edgeTextRef.current.getBBox();
            setEdgeTextBbox({
                x: textBbox.x,
                y: textBbox.y,
                width: textBbox.width,
                height: textBbox.height,
            });
        }
    }, [label]);
    if (typeof label === 'undefined' || !label) {
        return null;
    }
    return (jsxs("g", { transform: `translate(${x - edgeTextBbox.width / 2} ${y - edgeTextBbox.height / 2})`, className: edgeTextClasses, visibility: edgeTextBbox.width ? 'visible' : 'hidden', ...rest, children: [labelShowBg && (jsx("rect", { width: edgeTextBbox.width + 2 * labelBgPadding[0], x: -labelBgPadding[0], y: -labelBgPadding[1], height: edgeTextBbox.height + 2 * labelBgPadding[1], className: "react-flow__edge-textbg", style: labelBgStyle, rx: labelBgBorderRadius, ry: labelBgBorderRadius })), jsx("text", { className: "react-flow__edge-text", y: edgeTextBbox.height / 2, dy: "0.3em", ref: edgeTextRef, style: labelStyle, children: label }), children] }));
}
EdgeTextComponent.displayName = 'EdgeText';
const EdgeText = memo(EdgeTextComponent);

function BaseEdge({ id, path, labelX, labelY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, className, interactionWidth = 20, }) {
    return (jsxs(Fragment, { children: [jsx("path", { id: id, style: style, d: path, fill: "none", className: cc(['react-flow__edge-path', className]), markerEnd: markerEnd, markerStart: markerStart }), interactionWidth && (jsx("path", { d: path, fill: "none", strokeOpacity: 0, strokeWidth: interactionWidth, className: "react-flow__edge-interaction" })), label && isNumeric(labelX) && isNumeric(labelY) ? (jsx(EdgeText, { x: labelX, y: labelY, label: label, labelStyle: labelStyle, labelShowBg: labelShowBg, labelBgStyle: labelBgStyle, labelBgPadding: labelBgPadding, labelBgBorderRadius: labelBgBorderRadius })) : null] }));
}

function getControl({ pos, x1, y1, x2, y2 }) {
    if (pos === Position.Left || pos === Position.Right) {
        return [0.5 * (x1 + x2), y1];
    }
    return [x1, 0.5 * (y1 + y2)];
}
function getSimpleBezierPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, }) {
    const [sourceControlX, sourceControlY] = getControl({
        pos: sourcePosition,
        x1: sourceX,
        y1: sourceY,
        x2: targetX,
        y2: targetY,
    });
    const [targetControlX, targetControlY] = getControl({
        pos: targetPosition,
        x1: targetX,
        y1: targetY,
        x2: sourceX,
        y2: sourceY,
    });
    const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourceControlX,
        sourceControlY,
        targetControlX,
        targetControlY,
    });
    return [
        `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
        labelX,
        labelY,
        offsetX,
        offsetY,
    ];
}
function createSimpleBezierEdge(params) {
    // eslint-disable-next-line react/display-name
    return memo(({ id, sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth, }) => {
        const [path, labelX, labelY] = getSimpleBezierPath({
            sourceX,
            sourceY,
            sourcePosition,
            targetX,
            targetY,
            targetPosition,
        });
        const _id = params.isInternal ? undefined : id;
        return (jsx(BaseEdge, { id: _id, path: path, labelX: labelX, labelY: labelY, label: label, labelStyle: labelStyle, labelShowBg: labelShowBg, labelBgStyle: labelBgStyle, labelBgPadding: labelBgPadding, labelBgBorderRadius: labelBgBorderRadius, style: style, markerEnd: markerEnd, markerStart: markerStart, interactionWidth: interactionWidth }));
    });
}
const SimpleBezierEdge = createSimpleBezierEdge({ isInternal: false });
const SimpleBezierEdgeInternal = createSimpleBezierEdge({ isInternal: true });
SimpleBezierEdge.displayName = 'SimpleBezierEdge';
SimpleBezierEdgeInternal.displayName = 'SimpleBezierEdgeInternal';

function createSmoothStepEdge(params) {
    // eslint-disable-next-line react/display-name
    return memo(({ id, sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, sourcePosition = Position.Bottom, targetPosition = Position.Top, markerEnd, markerStart, pathOptions, interactionWidth, }) => {
        const [path, labelX, labelY] = getSmoothStepPath({
            sourceX,
            sourceY,
            sourcePosition,
            targetX,
            targetY,
            targetPosition,
            borderRadius: pathOptions?.borderRadius,
            offset: pathOptions?.offset,
        });
        const _id = params.isInternal ? undefined : id;
        return (jsx(BaseEdge, { id: _id, path: path, labelX: labelX, labelY: labelY, label: label, labelStyle: labelStyle, labelShowBg: labelShowBg, labelBgStyle: labelBgStyle, labelBgPadding: labelBgPadding, labelBgBorderRadius: labelBgBorderRadius, style: style, markerEnd: markerEnd, markerStart: markerStart, interactionWidth: interactionWidth }));
    });
}
const SmoothStepEdge = createSmoothStepEdge({ isInternal: false });
const SmoothStepEdgeInternal = createSmoothStepEdge({ isInternal: true });
SmoothStepEdge.displayName = 'SmoothStepEdge';
SmoothStepEdgeInternal.displayName = 'SmoothStepEdgeInternal';

function createStepEdge(params) {
    // eslint-disable-next-line react/display-name
    return memo(({ id, ...props }) => {
        const _id = params.isInternal ? undefined : id;
        return (jsx(SmoothStepEdge, { ...props, id: _id, pathOptions: useMemo(() => ({ borderRadius: 0, offset: props.pathOptions?.offset }), [props.pathOptions?.offset]) }));
    });
}
const StepEdge = createStepEdge({ isInternal: false });
const StepEdgeInternal = createStepEdge({ isInternal: true });
StepEdge.displayName = 'StepEdge';
StepEdgeInternal.displayName = 'StepEdgeInternal';

function createStraightEdge(params) {
    // eslint-disable-next-line react/display-name
    return memo(({ id, sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth, }) => {
        const [path, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY });
        const _id = params.isInternal ? undefined : id;
        return (jsx(BaseEdge, { id: _id, path: path, labelX: labelX, labelY: labelY, label: label, labelStyle: labelStyle, labelShowBg: labelShowBg, labelBgStyle: labelBgStyle, labelBgPadding: labelBgPadding, labelBgBorderRadius: labelBgBorderRadius, style: style, markerEnd: markerEnd, markerStart: markerStart, interactionWidth: interactionWidth }));
    });
}
const StraightEdge = createStraightEdge({ isInternal: false });
const StraightEdgeInternal = createStraightEdge({ isInternal: true });
StraightEdge.displayName = 'StraightEdge';
StraightEdgeInternal.displayName = 'StraightEdgeInternal';

function createBezierEdge(params) {
    // eslint-disable-next-line react/display-name
    return memo(({ id, sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, pathOptions, interactionWidth, }) => {
        const [path, labelX, labelY] = getBezierPath({
            sourceX,
            sourceY,
            sourcePosition,
            targetX,
            targetY,
            targetPosition,
            curvature: pathOptions?.curvature,
        });
        const _id = params.isInternal ? undefined : id;
        return (jsx(BaseEdge, { id: _id, path: path, labelX: labelX, labelY: labelY, label: label, labelStyle: labelStyle, labelShowBg: labelShowBg, labelBgStyle: labelBgStyle, labelBgPadding: labelBgPadding, labelBgBorderRadius: labelBgBorderRadius, style: style, markerEnd: markerEnd, markerStart: markerStart, interactionWidth: interactionWidth }));
    });
}
const BezierEdge = createBezierEdge({ isInternal: false });
const BezierEdgeInternal = createBezierEdge({ isInternal: true });
BezierEdge.displayName = 'BezierEdge';
BezierEdgeInternal.displayName = 'BezierEdgeInternal';

const builtinEdgeTypes = {
    default: BezierEdgeInternal,
    straight: StraightEdgeInternal,
    step: StepEdgeInternal,
    smoothstep: SmoothStepEdgeInternal,
    simplebezier: SimpleBezierEdgeInternal,
};
const nullPosition = {
    sourceX: null,
    sourceY: null,
    targetX: null,
    targetY: null,
    sourcePosition: null,
    targetPosition: null,
};

const shiftX = (x, shift, position) => {
    if (position === Position.Left)
        return x - shift;
    if (position === Position.Right)
        return x + shift;
    return x;
};
const shiftY = (y, shift, position) => {
    if (position === Position.Top)
        return y - shift;
    if (position === Position.Bottom)
        return y + shift;
    return y;
};
const EdgeUpdaterClassName = 'react-flow__edgeupdater';
function EdgeAnchor({ position, centerX, centerY, radius = 10, onMouseDown, onMouseEnter, onMouseOut, type, }) {
    return (jsx("circle", { onMouseDown: onMouseDown, onMouseEnter: onMouseEnter, onMouseOut: onMouseOut, className: cc([EdgeUpdaterClassName, `${EdgeUpdaterClassName}-${type}`]), cx: shiftX(centerX, radius, position), cy: shiftY(centerY, radius, position), r: radius, stroke: "transparent", fill: "transparent" }));
}

function EdgeUpdateAnchors({ isReconnectable, reconnectRadius, edge, targetHandleId, sourceHandleId, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, onReconnect, onReconnectStart, onReconnectEnd, setReconnecting, setUpdateHover, }) {
    const store = useStoreApi();
    const handleEdgeUpdater = (event, isSourceHandle) => {
        // avoid triggering edge updater if mouse btn is not left
        if (event.button !== 0) {
            return;
        }
        const { autoPanOnConnect, domNode, isValidConnection, connectionMode, connectionRadius, lib, onConnectStart, onConnectEnd, cancelConnection, nodeLookup, rfId: flowId, panBy, updateConnection, } = store.getState();
        const nodeId = isSourceHandle ? edge.target : edge.source;
        const handleId = (isSourceHandle ? targetHandleId : sourceHandleId) || null;
        const handleType = isSourceHandle ? 'target' : 'source';
        const isTarget = isSourceHandle;
        setReconnecting(true);
        onReconnectStart?.(event, edge, handleType);
        const _onReconnectEnd = (evt) => {
            setReconnecting(false);
            onReconnectEnd?.(evt, edge, handleType);
        };
        const onConnectEdge = (connection) => onReconnect?.(edge, connection);
        XYHandle.onPointerDown(event.nativeEvent, {
            autoPanOnConnect,
            connectionMode,
            connectionRadius,
            domNode,
            handleId,
            nodeId,
            nodeLookup,
            isTarget,
            edgeUpdaterType: handleType,
            lib,
            flowId,
            cancelConnection,
            panBy,
            isValidConnection,
            onConnect: onConnectEdge,
            onConnectStart,
            onConnectEnd,
            onReconnectEnd: _onReconnectEnd,
            updateConnection,
            getTransform: () => store.getState().transform,
            getFromHandle: () => store.getState().connection.fromHandle,
        });
    };
    const onReconnectSourceMouseDown = (event) => handleEdgeUpdater(event, true);
    const onReconnectTargetMouseDown = (event) => handleEdgeUpdater(event, false);
    const onReconnectMouseEnter = () => setUpdateHover(true);
    const onReconnectMouseOut = () => setUpdateHover(false);
    return (jsxs(Fragment, { children: [(isReconnectable === 'source' || isReconnectable === true) && (jsx(EdgeAnchor, { position: sourcePosition, centerX: sourceX, centerY: sourceY, radius: reconnectRadius, onMouseDown: onReconnectSourceMouseDown, onMouseEnter: onReconnectMouseEnter, onMouseOut: onReconnectMouseOut, type: "source" })), (isReconnectable === 'target' || isReconnectable === true) && (jsx(EdgeAnchor, { position: targetPosition, centerX: targetX, centerY: targetY, radius: reconnectRadius, onMouseDown: onReconnectTargetMouseDown, onMouseEnter: onReconnectMouseEnter, onMouseOut: onReconnectMouseOut, type: "target" }))] }));
}

function EdgeWrapper({ id, edgesFocusable, edgesReconnectable, elementsSelectable, onClick, onDoubleClick, onContextMenu, onMouseEnter, onMouseMove, onMouseLeave, reconnectRadius, onReconnect, onReconnectStart, onReconnectEnd, rfId, edgeTypes, noPanClassName, onError, disableKeyboardA11y, }) {
    let edge = useStore((s) => s.edgeLookup.get(id));
    const defaultEdgeOptions = useStore((s) => s.defaultEdgeOptions);
    edge = defaultEdgeOptions ? { ...defaultEdgeOptions, ...edge } : edge;
    let edgeType = edge.type || 'default';
    let EdgeComponent = edgeTypes?.[edgeType] || builtinEdgeTypes[edgeType];
    if (EdgeComponent === undefined) {
        onError?.('011', errorMessages['error011'](edgeType));
        edgeType = 'default';
        EdgeComponent = builtinEdgeTypes.default;
    }
    const isFocusable = !!(edge.focusable || (edgesFocusable && typeof edge.focusable === 'undefined'));
    const isReconnectable = typeof onReconnect !== 'undefined' &&
        (edge.reconnectable || (edgesReconnectable && typeof edge.reconnectable === 'undefined'));
    const isSelectable = !!(edge.selectable || (elementsSelectable && typeof edge.selectable === 'undefined'));
    const edgeRef = useRef(null);
    const [updateHover, setUpdateHover] = useState(false);
    const [reconnecting, setReconnecting] = useState(false);
    const store = useStoreApi();
    const { zIndex, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = useStore(useCallback((store) => {
        const sourceNode = store.nodeLookup.get(edge.source);
        const targetNode = store.nodeLookup.get(edge.target);
        if (!sourceNode || !targetNode) {
            return {
                zIndex: edge.zIndex,
                ...nullPosition,
            };
        }
        const edgePosition = getEdgePosition({
            id,
            sourceNode,
            targetNode,
            sourceHandle: edge.sourceHandle || null,
            targetHandle: edge.targetHandle || null,
            connectionMode: store.connectionMode,
            onError,
        });
        const zIndex = getElevatedEdgeZIndex({
            selected: edge.selected,
            zIndex: edge.zIndex,
            sourceNode,
            targetNode,
            elevateOnSelect: store.elevateEdgesOnSelect,
        });
        return {
            zIndex,
            ...(edgePosition || nullPosition),
        };
    }, [edge.source, edge.target, edge.sourceHandle, edge.targetHandle, edge.selected, edge.zIndex]), shallow$1);
    const markerStartUrl = useMemo(() => (edge.markerStart ? `url('#${getMarkerId(edge.markerStart, rfId)}')` : undefined), [edge.markerStart, rfId]);
    const markerEndUrl = useMemo(() => (edge.markerEnd ? `url('#${getMarkerId(edge.markerEnd, rfId)}')` : undefined), [edge.markerEnd, rfId]);
    if (edge.hidden || sourceX === null || sourceY === null || targetX === null || targetY === null) {
        return null;
    }
    const onEdgeClick = (event) => {
        const { addSelectedEdges, unselectNodesAndEdges, multiSelectionActive } = store.getState();
        if (isSelectable) {
            store.setState({ nodesSelectionActive: false });
            if (edge.selected && multiSelectionActive) {
                unselectNodesAndEdges({ nodes: [], edges: [edge] });
                edgeRef.current?.blur();
            }
            else {
                addSelectedEdges([id]);
            }
        }
        if (onClick) {
            onClick(event, edge);
        }
    };
    const onEdgeDoubleClick = onDoubleClick
        ? (event) => {
            onDoubleClick(event, { ...edge });
        }
        : undefined;
    const onEdgeContextMenu = onContextMenu
        ? (event) => {
            onContextMenu(event, { ...edge });
        }
        : undefined;
    const onEdgeMouseEnter = onMouseEnter
        ? (event) => {
            onMouseEnter(event, { ...edge });
        }
        : undefined;
    const onEdgeMouseMove = onMouseMove
        ? (event) => {
            onMouseMove(event, { ...edge });
        }
        : undefined;
    const onEdgeMouseLeave = onMouseLeave
        ? (event) => {
            onMouseLeave(event, { ...edge });
        }
        : undefined;
    const onKeyDown = (event) => {
        if (!disableKeyboardA11y && elementSelectionKeys.includes(event.key) && isSelectable) {
            const { unselectNodesAndEdges, addSelectedEdges } = store.getState();
            const unselect = event.key === 'Escape';
            if (unselect) {
                edgeRef.current?.blur();
                unselectNodesAndEdges({ edges: [edge] });
            }
            else {
                addSelectedEdges([id]);
            }
        }
    };
    return (jsx("svg", { style: { zIndex }, children: jsxs("g", { className: cc([
                'react-flow__edge',
                `react-flow__edge-${edgeType}`,
                edge.className,
                noPanClassName,
                {
                    selected: edge.selected,
                    animated: edge.animated,
                    inactive: !isSelectable && !onClick,
                    updating: updateHover,
                    selectable: isSelectable,
                },
            ]), onClick: onEdgeClick, onDoubleClick: onEdgeDoubleClick, onContextMenu: onEdgeContextMenu, onMouseEnter: onEdgeMouseEnter, onMouseMove: onEdgeMouseMove, onMouseLeave: onEdgeMouseLeave, onKeyDown: isFocusable ? onKeyDown : undefined, tabIndex: isFocusable ? 0 : undefined, role: isFocusable ? 'button' : 'img', "data-id": id, "data-testid": `rf__edge-${id}`, "aria-label": edge.ariaLabel === null ? undefined : edge.ariaLabel || `Edge from ${edge.source} to ${edge.target}`, "aria-describedby": isFocusable ? `${ARIA_EDGE_DESC_KEY}-${rfId}` : undefined, ref: edgeRef, children: [!reconnecting && (jsx(EdgeComponent, { id: id, source: edge.source, target: edge.target, type: edge.type, selected: edge.selected, animated: edge.animated, selectable: isSelectable, deletable: edge.deletable ?? true, label: edge.label, labelStyle: edge.labelStyle, labelShowBg: edge.labelShowBg, labelBgStyle: edge.labelBgStyle, labelBgPadding: edge.labelBgPadding, labelBgBorderRadius: edge.labelBgBorderRadius, sourceX: sourceX, sourceY: sourceY, targetX: targetX, targetY: targetY, sourcePosition: sourcePosition, targetPosition: targetPosition, data: edge.data, style: edge.style, sourceHandleId: edge.sourceHandle, targetHandleId: edge.targetHandle, markerStart: markerStartUrl, markerEnd: markerEndUrl, pathOptions: 'pathOptions' in edge ? edge.pathOptions : undefined, interactionWidth: edge.interactionWidth })), isReconnectable && (jsx(EdgeUpdateAnchors, { edge: edge, isReconnectable: isReconnectable, reconnectRadius: reconnectRadius, onReconnect: onReconnect, onReconnectStart: onReconnectStart, onReconnectEnd: onReconnectEnd, sourceX: sourceX, sourceY: sourceY, targetX: targetX, targetY: targetY, sourcePosition: sourcePosition, targetPosition: targetPosition, setUpdateHover: setUpdateHover, setReconnecting: setReconnecting, sourceHandleId: edge.sourceHandle, targetHandleId: edge.targetHandle }))] }) }));
}

const selector$b = (s) => ({
    width: s.width,
    height: s.height,
    edgesFocusable: s.edgesFocusable,
    edgesReconnectable: s.edgesReconnectable,
    elementsSelectable: s.elementsSelectable,
    connectionMode: s.connectionMode,
    onError: s.onError,
});
function EdgeRendererComponent({ defaultMarkerColor, onlyRenderVisibleElements, rfId, edgeTypes, noPanClassName, onReconnect, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, onEdgeClick, reconnectRadius, onEdgeDoubleClick, onReconnectStart, onReconnectEnd, disableKeyboardA11y, }) {
    const { edgesFocusable, edgesReconnectable, elementsSelectable, onError } = useStore(selector$b, shallow$1);
    const edgeIds = useVisibleEdgeIds(onlyRenderVisibleElements);
    return (jsxs("div", { className: "react-flow__edges", children: [jsx(MarkerDefinitions$1, { defaultColor: defaultMarkerColor, rfId: rfId }), edgeIds.map((id) => {
                return (jsx(EdgeWrapper, { id: id, edgesFocusable: edgesFocusable, edgesReconnectable: edgesReconnectable, elementsSelectable: elementsSelectable, noPanClassName: noPanClassName, onReconnect: onReconnect, onContextMenu: onEdgeContextMenu, onMouseEnter: onEdgeMouseEnter, onMouseMove: onEdgeMouseMove, onMouseLeave: onEdgeMouseLeave, onClick: onEdgeClick, reconnectRadius: reconnectRadius, onDoubleClick: onEdgeDoubleClick, onReconnectStart: onReconnectStart, onReconnectEnd: onReconnectEnd, rfId: rfId, onError: onError, edgeTypes: edgeTypes, disableKeyboardA11y: disableKeyboardA11y }, id));
            })] }));
}
EdgeRendererComponent.displayName = 'EdgeRenderer';
const EdgeRenderer = memo(EdgeRendererComponent);

const selector$a = (s) => `translate(${s.transform[0]}px,${s.transform[1]}px) scale(${s.transform[2]})`;
function Viewport({ children }) {
    const transform = useStore(selector$a);
    return (jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform }, children: children }));
}

/**
 * Hook for calling onInit handler.
 *
 * @internal
 */
function useOnInitHandler(onInit) {
    const rfInstance = useReactFlow();
    const isInitialized = useRef(false);
    useEffect(() => {
        if (!isInitialized.current && rfInstance.viewportInitialized && onInit) {
            setTimeout(() => onInit(rfInstance), 1);
            isInitialized.current = true;
        }
    }, [onInit, rfInstance.viewportInitialized]);
}

const selector$9 = (state) => state.panZoom?.syncViewport;
/**
 * Hook for syncing the viewport with the panzoom instance.
 *
 * @internal
 * @param viewport
 */
function useViewportSync(viewport) {
    const syncViewport = useStore(selector$9);
    const store = useStoreApi();
    useEffect(() => {
        if (viewport) {
            syncViewport?.(viewport);
            store.setState({ transform: [viewport.x, viewport.y, viewport.zoom] });
        }
    }, [viewport, syncViewport]);
    return null;
}

const selector$8 = (s) => {
    return s.connection.inProgress
        ? { ...s.connection, to: pointToRendererPoint(s.connection.to, s.transform) }
        : { ...s.connection };
};
/**
 * Hook for accessing the connection state.
 *
 * @public
 * @returns ConnectionState
 */
function useConnection() {
    return useStore(selector$8, shallow$1);
}

const selector$7 = (s) => ({
    nodesConnectable: s.nodesConnectable,
    isValid: s.connection.isValid,
    inProgress: s.connection.inProgress,
    width: s.width,
    height: s.height,
});
function ConnectionLineWrapper({ containerStyle, style, type, component }) {
    const { nodesConnectable, width, height, isValid, inProgress } = useStore(selector$7, shallow$1);
    const renderConnection = !!(width && nodesConnectable && inProgress);
    if (!renderConnection) {
        return null;
    }
    return (jsx("svg", { style: containerStyle, width: width, height: height, className: "react-flow__connectionline react-flow__container", children: jsx("g", { className: cc(['react-flow__connection', getConnectionStatus(isValid)]), children: jsx(ConnectionLine, { style: style, type: type, CustomComponent: component, isValid: isValid }) }) }));
}
const ConnectionLine = ({ style, type = ConnectionLineType.Bezier, CustomComponent, isValid }) => {
    const { inProgress, from, fromNode, fromHandle, fromPosition, to, toNode, toHandle, toPosition } = useConnection();
    if (!inProgress) {
        return;
    }
    if (CustomComponent) {
        return (jsx(CustomComponent, { connectionLineType: type, connectionLineStyle: style, fromNode: fromNode, fromHandle: fromHandle, fromX: from.x, fromY: from.y, toX: to.x, toY: to.y, fromPosition: fromPosition, toPosition: toPosition, connectionStatus: getConnectionStatus(isValid), toNode: toNode, toHandle: toHandle }));
    }
    let path = '';
    const pathParams = {
        sourceX: from.x,
        sourceY: from.y,
        sourcePosition: fromPosition,
        targetX: to.x,
        targetY: to.y,
        targetPosition: toPosition,
    };
    switch (type) {
        case ConnectionLineType.Bezier:
            [path] = getBezierPath(pathParams);
            break;
        case ConnectionLineType.SimpleBezier:
            [path] = getSimpleBezierPath(pathParams);
            break;
        case ConnectionLineType.Step:
            [path] = getSmoothStepPath({
                ...pathParams,
                borderRadius: 0,
            });
            break;
        case ConnectionLineType.SmoothStep:
            [path] = getSmoothStepPath(pathParams);
            break;
        default:
            [path] = getStraightPath(pathParams);
    }
    return jsx("path", { d: path, fill: "none", className: "react-flow__connection-path", style: style });
};
ConnectionLine.displayName = 'ConnectionLine';

const emptyTypes = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useNodeOrEdgeTypesWarning(nodeOrEdgeTypes = emptyTypes) {
    useRef(nodeOrEdgeTypes);
    useStoreApi();
    useEffect(() => {
    }, [nodeOrEdgeTypes]);
}

function useStylesLoadedWarning() {
    useStoreApi();
    useRef(false);
    useEffect(() => {
    }, []);
}

function GraphViewComponent({ nodeTypes, edgeTypes, onInit, onNodeClick, onEdgeClick, onNodeDoubleClick, onEdgeDoubleClick, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onSelectionContextMenu, onSelectionStart, onSelectionEnd, connectionLineType, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, selectionKeyCode, selectionOnDrag, selectionMode, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, deleteKeyCode, onlyRenderVisibleElements, elementsSelectable, defaultViewport, translateExtent, minZoom, maxZoom, preventScrolling, defaultMarkerColor, zoomOnScroll, zoomOnPinch, panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, paneClickDistance, nodeClickDistance, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, reconnectRadius, onReconnect, onReconnectStart, onReconnectEnd, noDragClassName, noWheelClassName, noPanClassName, disableKeyboardA11y, nodeExtent, rfId, viewport, onViewportChange, }) {
    useNodeOrEdgeTypesWarning(nodeTypes);
    useNodeOrEdgeTypesWarning(edgeTypes);
    useStylesLoadedWarning();
    useOnInitHandler(onInit);
    useViewportSync(viewport);
    return (jsx(FlowRenderer, { onPaneClick: onPaneClick, onPaneMouseEnter: onPaneMouseEnter, onPaneMouseMove: onPaneMouseMove, onPaneMouseLeave: onPaneMouseLeave, onPaneContextMenu: onPaneContextMenu, onPaneScroll: onPaneScroll, paneClickDistance: paneClickDistance, deleteKeyCode: deleteKeyCode, selectionKeyCode: selectionKeyCode, selectionOnDrag: selectionOnDrag, selectionMode: selectionMode, onSelectionStart: onSelectionStart, onSelectionEnd: onSelectionEnd, multiSelectionKeyCode: multiSelectionKeyCode, panActivationKeyCode: panActivationKeyCode, zoomActivationKeyCode: zoomActivationKeyCode, elementsSelectable: elementsSelectable, zoomOnScroll: zoomOnScroll, zoomOnPinch: zoomOnPinch, zoomOnDoubleClick: zoomOnDoubleClick, panOnScroll: panOnScroll, panOnScrollSpeed: panOnScrollSpeed, panOnScrollMode: panOnScrollMode, panOnDrag: panOnDrag, defaultViewport: defaultViewport, translateExtent: translateExtent, minZoom: minZoom, maxZoom: maxZoom, onSelectionContextMenu: onSelectionContextMenu, preventScrolling: preventScrolling, noDragClassName: noDragClassName, noWheelClassName: noWheelClassName, noPanClassName: noPanClassName, disableKeyboardA11y: disableKeyboardA11y, onViewportChange: onViewportChange, isControlledViewport: !!viewport, children: jsxs(Viewport, { children: [jsx(EdgeRenderer, { edgeTypes: edgeTypes, onEdgeClick: onEdgeClick, onEdgeDoubleClick: onEdgeDoubleClick, onReconnect: onReconnect, onReconnectStart: onReconnectStart, onReconnectEnd: onReconnectEnd, onlyRenderVisibleElements: onlyRenderVisibleElements, onEdgeContextMenu: onEdgeContextMenu, onEdgeMouseEnter: onEdgeMouseEnter, onEdgeMouseMove: onEdgeMouseMove, onEdgeMouseLeave: onEdgeMouseLeave, reconnectRadius: reconnectRadius, defaultMarkerColor: defaultMarkerColor, noPanClassName: noPanClassName, disableKeyboardA11y: disableKeyboardA11y, rfId: rfId }), jsx(ConnectionLineWrapper, { style: connectionLineStyle, type: connectionLineType, component: connectionLineComponent, containerStyle: connectionLineContainerStyle }), jsx("div", { className: "react-flow__edgelabel-renderer" }), jsx(NodeRenderer, { nodeTypes: nodeTypes, onNodeClick: onNodeClick, onNodeDoubleClick: onNodeDoubleClick, onNodeMouseEnter: onNodeMouseEnter, onNodeMouseMove: onNodeMouseMove, onNodeMouseLeave: onNodeMouseLeave, onNodeContextMenu: onNodeContextMenu, nodeClickDistance: nodeClickDistance, onlyRenderVisibleElements: onlyRenderVisibleElements, noPanClassName: noPanClassName, noDragClassName: noDragClassName, disableKeyboardA11y: disableKeyboardA11y, nodeExtent: nodeExtent, rfId: rfId }), jsx("div", { className: "react-flow__viewport-portal" })] }) }));
}
GraphViewComponent.displayName = 'GraphView';
const GraphView = memo(GraphViewComponent);

const getInitialState = ({ nodes, edges, defaultNodes, defaultEdges, width, height, fitView, nodeOrigin, } = {}) => {
    const nodeLookup = new Map();
    const parentLookup = new Map();
    const connectionLookup = new Map();
    const edgeLookup = new Map();
    const storeEdges = defaultEdges ?? edges ?? [];
    const storeNodes = defaultNodes ?? nodes ?? [];
    const storeNodeOrigin = nodeOrigin ?? [0, 0];
    updateConnectionLookup(connectionLookup, edgeLookup, storeEdges);
    adoptUserNodes(storeNodes, nodeLookup, parentLookup, {
        nodeOrigin: storeNodeOrigin,
        elevateNodesOnSelect: false,
    });
    let transform = [0, 0, 1];
    if (fitView && width && height) {
        const bounds = getInternalNodesBounds(nodeLookup, {
            filter: (node) => !!((node.width || node.initialWidth) && (node.height || node.initialHeight)),
        });
        const { x, y, zoom } = getViewportForBounds(bounds, width, height, 0.5, 2, 0.1);
        transform = [x, y, zoom];
    }
    return {
        rfId: '1',
        width: 0,
        height: 0,
        transform,
        nodes: storeNodes,
        nodeLookup,
        parentLookup,
        edges: storeEdges,
        edgeLookup,
        connectionLookup,
        onNodesChange: null,
        onEdgesChange: null,
        hasDefaultNodes: defaultNodes !== undefined,
        hasDefaultEdges: defaultEdges !== undefined,
        panZoom: null,
        minZoom: 0.5,
        maxZoom: 2,
        translateExtent: infiniteExtent,
        nodeExtent: infiniteExtent,
        nodesSelectionActive: false,
        userSelectionActive: false,
        userSelectionRect: null,
        connectionMode: ConnectionMode.Strict,
        domNode: null,
        paneDragging: false,
        noPanClassName: 'nopan',
        nodeOrigin: storeNodeOrigin,
        nodeDragThreshold: 1,
        snapGrid: [15, 15],
        snapToGrid: false,
        nodesDraggable: true,
        nodesConnectable: true,
        nodesFocusable: true,
        edgesFocusable: true,
        edgesReconnectable: true,
        elementsSelectable: true,
        elevateNodesOnSelect: true,
        elevateEdgesOnSelect: false,
        fitViewOnInit: false,
        fitViewDone: false,
        fitViewOnInitOptions: undefined,
        selectNodesOnDrag: true,
        multiSelectionActive: false,
        connection: { ...initialConnection },
        connectionClickStartHandle: null,
        connectOnClick: true,
        ariaLiveMessage: '',
        autoPanOnConnect: true,
        autoPanOnNodeDrag: true,
        autoPanSpeed: 15,
        connectionRadius: 20,
        onError: devWarn,
        isValidConnection: undefined,
        onSelectionChangeHandlers: [],
        lib: 'react',
        debug: false,
    };
};

const createStore = ({ nodes, edges, defaultNodes, defaultEdges, width, height, fitView: fitView$1, nodeOrigin, }) => createWithEqualityFn((set, get) => ({
    ...getInitialState({ nodes, edges, width, height, fitView: fitView$1, nodeOrigin, defaultNodes, defaultEdges }),
    setNodes: (nodes) => {
        const { nodeLookup, parentLookup, nodeOrigin, elevateNodesOnSelect } = get();
        // setNodes() is called exclusively in response to user actions:
        // - either when the `<ReactFlow nodes>` prop is updated in the controlled ReactFlow setup,
        // - or when the user calls something like `reactFlowInstance.setNodes()` in an uncontrolled ReactFlow setup.
        //
        // When this happens, we take the note objects passed by the user and extend them with fields
        // relevant for internal React Flow operations.
        adoptUserNodes(nodes, nodeLookup, parentLookup, { nodeOrigin, elevateNodesOnSelect, checkEquality: true });
        set({ nodes });
    },
    setEdges: (edges) => {
        const { connectionLookup, edgeLookup } = get();
        updateConnectionLookup(connectionLookup, edgeLookup, edges);
        set({ edges });
    },
    setDefaultNodesAndEdges: (nodes, edges) => {
        if (nodes) {
            const { setNodes } = get();
            setNodes(nodes);
            set({ hasDefaultNodes: true });
        }
        if (edges) {
            const { setEdges } = get();
            setEdges(edges);
            set({ hasDefaultEdges: true });
        }
    },
    // Every node gets registerd at a ResizeObserver. Whenever a node
    // changes its dimensions, this function is called to measure the
    // new dimensions and update the nodes.
    updateNodeInternals: (updates) => {
        const { triggerNodeChanges, nodeLookup, parentLookup, fitViewOnInit, fitViewDone, fitViewOnInitOptions, domNode, nodeOrigin, debug, fitViewSync, } = get();
        const { changes, updatedInternals } = updateNodeInternals(updates, nodeLookup, parentLookup, domNode, nodeOrigin);
        if (!updatedInternals) {
            return;
        }
        updateAbsolutePositions(nodeLookup, parentLookup, { nodeOrigin });
        // we call fitView once initially after all dimensions are set
        let nextFitViewDone = fitViewDone;
        if (!fitViewDone && fitViewOnInit) {
            nextFitViewDone = fitViewSync({
                ...fitViewOnInitOptions,
                nodes: fitViewOnInitOptions?.nodes,
            });
        }
        // here we are cirmumventing the onNodesChange handler
        // in order to be able to display nodes even if the user
        // has not provided an onNodesChange handler.
        // Nodes are only rendered if they have a width and height
        // attribute which they get from this handler.
        set({ fitViewDone: nextFitViewDone });
        if (changes?.length > 0) {
            if (debug) {
                console.log('React Flow: trigger node changes', changes);
            }
            triggerNodeChanges?.(changes);
        }
    },
    updateNodePositions: (nodeDragItems, dragging = false) => {
        const parentExpandChildren = [];
        const changes = [];
        for (const [id, dragItem] of nodeDragItems) {
            const change = {
                id,
                type: 'position',
                position: dragItem.position,
                dragging,
            };
            if (dragItem?.expandParent && dragItem?.parentId && change.position) {
                parentExpandChildren.push({
                    id,
                    parentId: dragItem.parentId,
                    rect: {
                        ...dragItem.internals.positionAbsolute,
                        width: dragItem.measured.width,
                        height: dragItem.measured.height,
                    },
                });
                change.position.x = Math.max(0, change.position.x);
                change.position.y = Math.max(0, change.position.y);
            }
            changes.push(change);
        }
        if (parentExpandChildren.length > 0) {
            const { nodeLookup, parentLookup, nodeOrigin } = get();
            const parentExpandChanges = handleExpandParent(parentExpandChildren, nodeLookup, parentLookup, nodeOrigin);
            changes.push(...parentExpandChanges);
        }
        get().triggerNodeChanges(changes);
    },
    triggerNodeChanges: (changes) => {
        const { onNodesChange, setNodes, nodes, hasDefaultNodes, debug } = get();
        if (changes?.length) {
            if (hasDefaultNodes) {
                const updatedNodes = applyNodeChanges(changes, nodes);
                setNodes(updatedNodes);
            }
            if (debug) {
                console.log('React Flow: trigger node changes', changes);
            }
            onNodesChange?.(changes);
        }
    },
    triggerEdgeChanges: (changes) => {
        const { onEdgesChange, setEdges, edges, hasDefaultEdges, debug } = get();
        if (changes?.length) {
            if (hasDefaultEdges) {
                const updatedEdges = applyEdgeChanges(changes, edges);
                setEdges(updatedEdges);
            }
            if (debug) {
                console.log('React Flow: trigger edge changes', changes);
            }
            onEdgesChange?.(changes);
        }
    },
    addSelectedNodes: (selectedNodeIds) => {
        const { multiSelectionActive, edgeLookup, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = get();
        if (multiSelectionActive) {
            const nodeChanges = selectedNodeIds.map((nodeId) => createSelectionChange(nodeId, true));
            triggerNodeChanges(nodeChanges);
            return;
        }
        triggerNodeChanges(getSelectionChanges(nodeLookup, new Set([...selectedNodeIds]), true));
        triggerEdgeChanges(getSelectionChanges(edgeLookup));
    },
    addSelectedEdges: (selectedEdgeIds) => {
        const { multiSelectionActive, edgeLookup, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = get();
        if (multiSelectionActive) {
            const changedEdges = selectedEdgeIds.map((edgeId) => createSelectionChange(edgeId, true));
            triggerEdgeChanges(changedEdges);
            return;
        }
        triggerEdgeChanges(getSelectionChanges(edgeLookup, new Set([...selectedEdgeIds])));
        triggerNodeChanges(getSelectionChanges(nodeLookup, new Set(), true));
    },
    unselectNodesAndEdges: ({ nodes, edges } = {}) => {
        const { edges: storeEdges, nodes: storeNodes, triggerNodeChanges, triggerEdgeChanges } = get();
        const nodesToUnselect = nodes ? nodes : storeNodes;
        const edgesToUnselect = edges ? edges : storeEdges;
        const nodeChanges = nodesToUnselect.map((n) => {
            n.selected = false;
            return createSelectionChange(n.id, false);
        });
        const edgeChanges = edgesToUnselect.map((edge) => createSelectionChange(edge.id, false));
        triggerNodeChanges(nodeChanges);
        triggerEdgeChanges(edgeChanges);
    },
    setMinZoom: (minZoom) => {
        const { panZoom, maxZoom } = get();
        panZoom?.setScaleExtent([minZoom, maxZoom]);
        set({ minZoom });
    },
    setMaxZoom: (maxZoom) => {
        const { panZoom, minZoom } = get();
        panZoom?.setScaleExtent([minZoom, maxZoom]);
        set({ maxZoom });
    },
    setTranslateExtent: (translateExtent) => {
        get().panZoom?.setTranslateExtent(translateExtent);
        set({ translateExtent });
    },
    setPaneClickDistance: (clickDistance) => {
        get().panZoom?.setClickDistance(clickDistance);
    },
    resetSelectedElements: () => {
        const { edges, nodes, triggerNodeChanges, triggerEdgeChanges } = get();
        const nodeChanges = nodes.reduce((res, node) => (node.selected ? [...res, createSelectionChange(node.id, false)] : res), []);
        const edgeChanges = edges.reduce((res, edge) => (edge.selected ? [...res, createSelectionChange(edge.id, false)] : res), []);
        triggerNodeChanges(nodeChanges);
        triggerEdgeChanges(edgeChanges);
    },
    setNodeExtent: (nodeExtent) => {
        const { nodeLookup } = get();
        for (const [, node] of nodeLookup) {
            const positionAbsolute = clampPosition(node.position, nodeExtent);
            nodeLookup.set(node.id, {
                ...node,
                internals: {
                    ...node.internals,
                    positionAbsolute,
                },
            });
        }
        set({
            nodeExtent,
        });
    },
    panBy: (delta) => {
        const { transform, width, height, panZoom, translateExtent } = get();
        return panBy({ delta, panZoom, transform, translateExtent, width, height });
    },
    fitView: (options) => {
        const { panZoom, width, height, minZoom, maxZoom, nodeLookup } = get();
        if (!panZoom) {
            return Promise.resolve(false);
        }
        const fitViewNodes = getFitViewNodes(nodeLookup, options);
        return fitView({
            nodes: fitViewNodes,
            width,
            height,
            panZoom,
            minZoom,
            maxZoom,
        }, options);
    },
    // we can't call an asnychronous function in updateNodeInternals
    // for that we created this sync version of fitView
    fitViewSync: (options) => {
        const { panZoom, width, height, minZoom, maxZoom, nodeLookup } = get();
        if (!panZoom) {
            return false;
        }
        const fitViewNodes = getFitViewNodes(nodeLookup, options);
        fitView({
            nodes: fitViewNodes,
            width,
            height,
            panZoom,
            minZoom,
            maxZoom,
        }, options);
        return fitViewNodes.size > 0;
    },
    cancelConnection: () => {
        set({
            connection: { ...initialConnection },
        });
    },
    updateConnection: (connection) => {
        set({ connection });
    },
    reset: () => set({ ...getInitialState() }),
}), Object.is);

function ReactFlowProvider({ initialNodes: nodes, initialEdges: edges, defaultNodes, defaultEdges, initialWidth: width, initialHeight: height, fitView, nodeOrigin, children, }) {
    const [store] = useState(() => createStore({
        nodes,
        edges,
        defaultNodes,
        defaultEdges,
        width,
        height,
        fitView,
        nodeOrigin,
    }));
    return (jsx(Provider$1, { value: store, children: jsx(BatchProvider, { children: children }) }));
}

function Wrapper({ children, nodes, edges, defaultNodes, defaultEdges, width, height, fitView, nodeOrigin, }) {
    const isWrapped = useContext(StoreContext);
    if (isWrapped) {
        // we need to wrap it with a fragment because it's not allowed for children to be a ReactNode
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
        return jsx(Fragment, { children: children });
    }
    return (jsx(ReactFlowProvider, { initialNodes: nodes, initialEdges: edges, defaultNodes: defaultNodes, defaultEdges: defaultEdges, initialWidth: width, initialHeight: height, fitView: fitView, nodeOrigin: nodeOrigin, children: children }));
}

const wrapperStyle = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 0,
};
function ReactFlow({ nodes, edges, defaultNodes, defaultEdges, className, nodeTypes, edgeTypes, onNodeClick, onEdgeClick, onInit, onMove, onMoveStart, onMoveEnd, onConnect, onConnectStart, onConnectEnd, onClickConnectStart, onClickConnectEnd, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onNodeDoubleClick, onNodeDragStart, onNodeDrag, onNodeDragStop, onNodesDelete, onEdgesDelete, onDelete, onSelectionChange, onSelectionDragStart, onSelectionDrag, onSelectionDragStop, onSelectionContextMenu, onSelectionStart, onSelectionEnd, onBeforeDelete, connectionMode, connectionLineType = ConnectionLineType.Bezier, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, deleteKeyCode = 'Backspace', selectionKeyCode = 'Shift', selectionOnDrag = false, selectionMode = SelectionMode.Full, panActivationKeyCode = 'Space', multiSelectionKeyCode = isMacOs() ? 'Meta' : 'Control', zoomActivationKeyCode = isMacOs() ? 'Meta' : 'Control', snapToGrid, snapGrid, onlyRenderVisibleElements = false, selectNodesOnDrag, nodesDraggable, nodesConnectable, nodesFocusable, nodeOrigin = defaultNodeOrigin, edgesFocusable, edgesReconnectable, elementsSelectable = true, defaultViewport: defaultViewport$1 = defaultViewport, minZoom = 0.5, maxZoom = 2, translateExtent = infiniteExtent, preventScrolling = true, nodeExtent, defaultMarkerColor = '#b1b1b7', zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panOnScrollSpeed = 0.5, panOnScrollMode = PanOnScrollMode.Free, zoomOnDoubleClick = true, panOnDrag = true, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, paneClickDistance = 0, nodeClickDistance = 0, children, onReconnect, onReconnectStart, onReconnectEnd, onEdgeContextMenu, onEdgeDoubleClick, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, reconnectRadius = 10, onNodesChange, onEdgesChange, noDragClassName = 'nodrag', noWheelClassName = 'nowheel', noPanClassName = 'nopan', fitView, fitViewOptions, connectOnClick, attributionPosition, proOptions, defaultEdgeOptions, elevateNodesOnSelect, elevateEdgesOnSelect, disableKeyboardA11y = false, autoPanOnConnect, autoPanOnNodeDrag, autoPanSpeed, connectionRadius, isValidConnection, onError, style, id, nodeDragThreshold, viewport, onViewportChange, width, height, colorMode = 'light', debug, ...rest }, ref) {
    const rfId = id || '1';
    const colorModeClassName = useColorModeClass(colorMode);
    return (jsx("div", { ...rest, style: { ...style, ...wrapperStyle }, ref: ref, className: cc(['react-flow', className, colorModeClassName]), "data-testid": "rf__wrapper", id: id, children: jsxs(Wrapper, { nodes: nodes, edges: edges, width: width, height: height, fitView: fitView, nodeOrigin: nodeOrigin, children: [jsx(GraphView, { onInit: onInit, onNodeClick: onNodeClick, onEdgeClick: onEdgeClick, onNodeMouseEnter: onNodeMouseEnter, onNodeMouseMove: onNodeMouseMove, onNodeMouseLeave: onNodeMouseLeave, onNodeContextMenu: onNodeContextMenu, onNodeDoubleClick: onNodeDoubleClick, nodeTypes: nodeTypes, edgeTypes: edgeTypes, connectionLineType: connectionLineType, connectionLineStyle: connectionLineStyle, connectionLineComponent: connectionLineComponent, connectionLineContainerStyle: connectionLineContainerStyle, selectionKeyCode: selectionKeyCode, selectionOnDrag: selectionOnDrag, selectionMode: selectionMode, deleteKeyCode: deleteKeyCode, multiSelectionKeyCode: multiSelectionKeyCode, panActivationKeyCode: panActivationKeyCode, zoomActivationKeyCode: zoomActivationKeyCode, onlyRenderVisibleElements: onlyRenderVisibleElements, defaultViewport: defaultViewport$1, translateExtent: translateExtent, minZoom: minZoom, maxZoom: maxZoom, preventScrolling: preventScrolling, zoomOnScroll: zoomOnScroll, zoomOnPinch: zoomOnPinch, zoomOnDoubleClick: zoomOnDoubleClick, panOnScroll: panOnScroll, panOnScrollSpeed: panOnScrollSpeed, panOnScrollMode: panOnScrollMode, panOnDrag: panOnDrag, onPaneClick: onPaneClick, onPaneMouseEnter: onPaneMouseEnter, onPaneMouseMove: onPaneMouseMove, onPaneMouseLeave: onPaneMouseLeave, onPaneScroll: onPaneScroll, onPaneContextMenu: onPaneContextMenu, paneClickDistance: paneClickDistance, nodeClickDistance: nodeClickDistance, onSelectionContextMenu: onSelectionContextMenu, onSelectionStart: onSelectionStart, onSelectionEnd: onSelectionEnd, onReconnect: onReconnect, onReconnectStart: onReconnectStart, onReconnectEnd: onReconnectEnd, onEdgeContextMenu: onEdgeContextMenu, onEdgeDoubleClick: onEdgeDoubleClick, onEdgeMouseEnter: onEdgeMouseEnter, onEdgeMouseMove: onEdgeMouseMove, onEdgeMouseLeave: onEdgeMouseLeave, reconnectRadius: reconnectRadius, defaultMarkerColor: defaultMarkerColor, noDragClassName: noDragClassName, noWheelClassName: noWheelClassName, noPanClassName: noPanClassName, rfId: rfId, disableKeyboardA11y: disableKeyboardA11y, nodeExtent: nodeExtent, viewport: viewport, onViewportChange: onViewportChange }), jsx(StoreUpdater, { nodes: nodes, edges: edges, defaultNodes: defaultNodes, defaultEdges: defaultEdges, onConnect: onConnect, onConnectStart: onConnectStart, onConnectEnd: onConnectEnd, onClickConnectStart: onClickConnectStart, onClickConnectEnd: onClickConnectEnd, nodesDraggable: nodesDraggable, nodesConnectable: nodesConnectable, nodesFocusable: nodesFocusable, edgesFocusable: edgesFocusable, edgesReconnectable: edgesReconnectable, elementsSelectable: elementsSelectable, elevateNodesOnSelect: elevateNodesOnSelect, elevateEdgesOnSelect: elevateEdgesOnSelect, minZoom: minZoom, maxZoom: maxZoom, nodeExtent: nodeExtent, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, snapToGrid: snapToGrid, snapGrid: snapGrid, connectionMode: connectionMode, translateExtent: translateExtent, connectOnClick: connectOnClick, defaultEdgeOptions: defaultEdgeOptions, fitView: fitView, fitViewOptions: fitViewOptions, onNodesDelete: onNodesDelete, onEdgesDelete: onEdgesDelete, onDelete: onDelete, onNodeDragStart: onNodeDragStart, onNodeDrag: onNodeDrag, onNodeDragStop: onNodeDragStop, onSelectionDrag: onSelectionDrag, onSelectionDragStart: onSelectionDragStart, onSelectionDragStop: onSelectionDragStop, onMove: onMove, onMoveStart: onMoveStart, onMoveEnd: onMoveEnd, noPanClassName: noPanClassName, nodeOrigin: nodeOrigin, rfId: rfId, autoPanOnConnect: autoPanOnConnect, autoPanOnNodeDrag: autoPanOnNodeDrag, autoPanSpeed: autoPanSpeed, onError: onError, connectionRadius: connectionRadius, isValidConnection: isValidConnection, selectNodesOnDrag: selectNodesOnDrag, nodeDragThreshold: nodeDragThreshold, onBeforeDelete: onBeforeDelete, paneClickDistance: paneClickDistance, debug: debug }), jsx(SelectionListener, { onSelectionChange: onSelectionChange }), children, jsx(Attribution, { proOptions: proOptions, position: attributionPosition }), jsx(A11yDescriptions, { rfId: rfId, disableKeyboardA11y: disableKeyboardA11y })] }) }));
}
var index = fixedForwardRef(ReactFlow);

/**
 * Hook for managing the state of nodes - should only be used for prototyping / simple use cases.
 *
 * @public
 * @param initialNodes
 * @returns an array [nodes, setNodes, onNodesChange]
 */
function useNodesState(initialNodes) {
    const [nodes, setNodes] = useState(initialNodes);
    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    return [nodes, setNodes, onNodesChange];
}
/**
 * Hook for managing the state of edges - should only be used for prototyping / simple use cases.
 *
 * @public
 * @param initialEdges
 * @returns an array [edges, setEdges, onEdgesChange]
 */
function useEdgesState(initialEdges) {
    const [edges, setEdges] = useState(initialEdges);
    const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
    return [edges, setEdges, onEdgesChange];
}

function LinePattern({ dimensions, lineWidth, variant, className }) {
    return (jsx("path", { strokeWidth: lineWidth, d: `M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`, className: cc(['react-flow__background-pattern', variant, className]) }));
}
function DotPattern({ radius, className }) {
    return (jsx("circle", { cx: radius, cy: radius, r: radius, className: cc(['react-flow__background-pattern', 'dots', className]) }));
}

var BackgroundVariant;
(function (BackgroundVariant) {
    BackgroundVariant["Lines"] = "lines";
    BackgroundVariant["Dots"] = "dots";
    BackgroundVariant["Cross"] = "cross";
})(BackgroundVariant || (BackgroundVariant = {}));

const defaultSize = {
    [BackgroundVariant.Dots]: 1,
    [BackgroundVariant.Lines]: 1,
    [BackgroundVariant.Cross]: 6,
};
const selector$3 = (s) => ({ transform: s.transform, patternId: `pattern-${s.rfId}` });
function BackgroundComponent({ id, variant = BackgroundVariant.Dots, 
// only used for dots and cross
gap = 20, 
// only used for lines and cross
size, lineWidth = 1, offset = 2, color, bgColor, style, className, patternClassName, }) {
    const ref = useRef(null);
    const { transform, patternId } = useStore(selector$3, shallow$1);
    const patternSize = size || defaultSize[variant];
    const isDots = variant === BackgroundVariant.Dots;
    const isCross = variant === BackgroundVariant.Cross;
    const gapXY = Array.isArray(gap) ? gap : [gap, gap];
    const scaledGap = [gapXY[0] * transform[2] || 1, gapXY[1] * transform[2] || 1];
    const scaledSize = patternSize * transform[2];
    const patternDimensions = isCross ? [scaledSize, scaledSize] : scaledGap;
    const patternOffset = isDots
        ? [scaledSize / offset, scaledSize / offset]
        : [patternDimensions[0] / offset, patternDimensions[1] / offset];
    const _patternId = `${patternId}${id ? id : ''}`;
    return (jsxs("svg", { className: cc(['react-flow__background', className]), style: {
            ...style,
            ...containerStyle,
            '--xy-background-color-props': bgColor,
            '--xy-background-pattern-color-props': color,
        }, ref: ref, "data-testid": "rf__background", children: [jsx("pattern", { id: _patternId, x: transform[0] % scaledGap[0], y: transform[1] % scaledGap[1], width: scaledGap[0], height: scaledGap[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${patternOffset[0]},-${patternOffset[1]})`, children: isDots ? (jsx(DotPattern, { radius: scaledSize / offset, className: patternClassName })) : (jsx(LinePattern, { dimensions: patternDimensions, lineWidth: lineWidth, variant: variant, className: patternClassName })) }), jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${_patternId})` })] }));
}
BackgroundComponent.displayName = 'Background';
memo(BackgroundComponent);

function PlusIcon$1() {
    return (jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) }));
}

function MinusIcon$1() {
    return (jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: jsx("path", { d: "M0 0h32v4.2H0z" }) }));
}

function FitViewIcon() {
    return (jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) }));
}

function LockIcon() {
    return (jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) }));
}

function UnlockIcon() {
    return (jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) }));
}

function ControlButton({ children, className, ...rest }) {
    return (jsx("button", { type: "button", className: cc(['react-flow__controls-button', className]), ...rest, children: children }));
}

const selector$2 = (s) => ({
    isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
    minZoomReached: s.transform[2] <= s.minZoom,
    maxZoomReached: s.transform[2] >= s.maxZoom,
});
function ControlsComponent({ style, showZoom = true, showFitView = true, showInteractive = true, fitViewOptions, onZoomIn, onZoomOut, onFitView, onInteractiveChange, className, children, position = 'bottom-left', orientation = 'vertical', 'aria-label': ariaLabel = 'React Flow controls', }) {
    const store = useStoreApi();
    const { isInteractive, minZoomReached, maxZoomReached } = useStore(selector$2, shallow$1);
    const { zoomIn, zoomOut, fitView } = useReactFlow();
    const onZoomInHandler = () => {
        zoomIn();
        onZoomIn?.();
    };
    const onZoomOutHandler = () => {
        zoomOut();
        onZoomOut?.();
    };
    const onFitViewHandler = () => {
        fitView(fitViewOptions);
        onFitView?.();
    };
    const onToggleInteractivity = () => {
        store.setState({
            nodesDraggable: !isInteractive,
            nodesConnectable: !isInteractive,
            elementsSelectable: !isInteractive,
        });
        onInteractiveChange?.(!isInteractive);
    };
    const orientationClass = orientation === 'horizontal' ? 'horizontal' : 'vertical';
    return (jsxs(Panel, { className: cc(['react-flow__controls', orientationClass, className]), position: position, style: style, "data-testid": "rf__controls", "aria-label": ariaLabel, children: [showZoom && (jsxs(Fragment, { children: [jsx(ControlButton, { onClick: onZoomInHandler, className: "react-flow__controls-zoomin", title: "zoom in", "aria-label": "zoom in", disabled: maxZoomReached, children: jsx(PlusIcon$1, {}) }), jsx(ControlButton, { onClick: onZoomOutHandler, className: "react-flow__controls-zoomout", title: "zoom out", "aria-label": "zoom out", disabled: minZoomReached, children: jsx(MinusIcon$1, {}) })] })), showFitView && (jsx(ControlButton, { className: "react-flow__controls-fitview", onClick: onFitViewHandler, title: "fit view", "aria-label": "fit view", children: jsx(FitViewIcon, {}) })), showInteractive && (jsx(ControlButton, { className: "react-flow__controls-interactive", onClick: onToggleInteractivity, title: "toggle interactivity", "aria-label": "toggle interactivity", children: isInteractive ? jsx(UnlockIcon, {}) : jsx(LockIcon, {}) })), children] }));
}
ControlsComponent.displayName = 'Controls';
const Controls = memo(ControlsComponent);

function MiniMapNodeComponent({ id, x, y, width, height, style, color, strokeColor, strokeWidth, className, borderRadius, shapeRendering, selected, onClick, }) {
    const { background, backgroundColor } = style || {};
    const fill = (color || background || backgroundColor);
    return (jsx("rect", { className: cc(['react-flow__minimap-node', { selected }, className]), x: x, y: y, rx: borderRadius, ry: borderRadius, width: width, height: height, style: {
            fill,
            stroke: strokeColor,
            strokeWidth,
        }, shapeRendering: shapeRendering, onClick: onClick ? (event) => onClick(event, id) : undefined }));
}
const MiniMapNode = memo(MiniMapNodeComponent);

const selectorNodeIds = (s) => s.nodes.map((node) => node.id);
const getAttrFunction = (func) => func instanceof Function ? func : () => func;
function MiniMapNodes({ nodeStrokeColor, nodeColor, nodeClassName = '', nodeBorderRadius = 5, nodeStrokeWidth, 
// We need to rename the prop to be `CapitalCase` so that JSX will render it as
// a component properly.
nodeComponent: NodeComponent = MiniMapNode, onClick, }) {
    const nodeIds = useStore(selectorNodeIds, shallow$1);
    const nodeColorFunc = getAttrFunction(nodeColor);
    const nodeStrokeColorFunc = getAttrFunction(nodeStrokeColor);
    const nodeClassNameFunc = getAttrFunction(nodeClassName);
    const shapeRendering = !!window.chrome ? 'crispEdges' : 'geometricPrecision';
    return (jsx(Fragment, { children: nodeIds.map((nodeId) => (
        // The split of responsibilities between MiniMapNodes and
        // NodeComponentWrapper may appear weird. However, it’s designed to
        // minimize the cost of updates when individual nodes change.
        //
        // For more details, see a similar commit in `NodeRenderer/index.tsx`.
        jsx(NodeComponentWrapper, { id: nodeId, nodeColorFunc: nodeColorFunc, nodeStrokeColorFunc: nodeStrokeColorFunc, nodeClassNameFunc: nodeClassNameFunc, nodeBorderRadius: nodeBorderRadius, nodeStrokeWidth: nodeStrokeWidth, NodeComponent: NodeComponent, onClick: onClick, shapeRendering: shapeRendering }, nodeId))) }));
}
function NodeComponentWrapperInner({ id, nodeColorFunc, nodeStrokeColorFunc, nodeClassNameFunc, nodeBorderRadius, nodeStrokeWidth, shapeRendering, NodeComponent, onClick, }) {
    const { node, x, y } = useStore((s) => {
        const node = s.nodeLookup.get(id);
        const { x, y } = node.internals.positionAbsolute;
        return {
            node,
            x,
            y,
        };
    }, shallow$1);
    if (!node || node.hidden || !nodeHasDimensions(node)) {
        return null;
    }
    const { width, height } = getNodeDimensions(node);
    return (jsx(NodeComponent, { x: x, y: y, width: width, height: height, style: node.style, selected: !!node.selected, className: nodeClassNameFunc(node), color: nodeColorFunc(node), borderRadius: nodeBorderRadius, strokeColor: nodeStrokeColorFunc(node), strokeWidth: nodeStrokeWidth, shapeRendering: shapeRendering, onClick: onClick, id: node.id }));
}
const NodeComponentWrapper = memo(NodeComponentWrapperInner);
var MiniMapNodes$1 = memo(MiniMapNodes);

const defaultWidth = 200;
const defaultHeight = 150;
const selector$1 = (s) => {
    const viewBB = {
        x: -s.transform[0] / s.transform[2],
        y: -s.transform[1] / s.transform[2],
        width: s.width / s.transform[2],
        height: s.height / s.transform[2],
    };
    return {
        viewBB,
        boundingRect: s.nodeLookup.size > 0 ? getBoundsOfRects(getInternalNodesBounds(s.nodeLookup), viewBB) : viewBB,
        rfId: s.rfId,
        panZoom: s.panZoom,
        translateExtent: s.translateExtent,
        flowWidth: s.width,
        flowHeight: s.height,
    };
};
const ARIA_LABEL_KEY = 'react-flow__minimap-desc';
function MiniMapComponent({ style, className, nodeStrokeColor, nodeColor, nodeClassName = '', nodeBorderRadius = 5, nodeStrokeWidth, 
// We need to rename the prop to be `CapitalCase` so that JSX will render it as
// a component properly.
nodeComponent, bgColor, maskColor, maskStrokeColor, maskStrokeWidth, position = 'bottom-right', onClick, onNodeClick, pannable = false, zoomable = false, ariaLabel = 'React Flow mini map', inversePan, zoomStep = 10, offsetScale = 5, }) {
    const store = useStoreApi();
    const svg = useRef(null);
    const { boundingRect, viewBB, rfId, panZoom, translateExtent, flowWidth, flowHeight } = useStore(selector$1, shallow$1);
    const elementWidth = style?.width ?? defaultWidth;
    const elementHeight = style?.height ?? defaultHeight;
    const scaledWidth = boundingRect.width / elementWidth;
    const scaledHeight = boundingRect.height / elementHeight;
    const viewScale = Math.max(scaledWidth, scaledHeight);
    const viewWidth = viewScale * elementWidth;
    const viewHeight = viewScale * elementHeight;
    const offset = offsetScale * viewScale;
    const x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
    const y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
    const width = viewWidth + offset * 2;
    const height = viewHeight + offset * 2;
    const labelledBy = `${ARIA_LABEL_KEY}-${rfId}`;
    const viewScaleRef = useRef(0);
    const minimapInstance = useRef();
    viewScaleRef.current = viewScale;
    useEffect(() => {
        if (svg.current && panZoom) {
            minimapInstance.current = XYMinimap({
                domNode: svg.current,
                panZoom,
                getTransform: () => store.getState().transform,
                getViewScale: () => viewScaleRef.current,
            });
            return () => {
                minimapInstance.current?.destroy();
            };
        }
    }, [panZoom]);
    useEffect(() => {
        minimapInstance.current?.update({
            translateExtent,
            width: flowWidth,
            height: flowHeight,
            inversePan,
            pannable,
            zoomStep,
            zoomable,
        });
    }, [pannable, zoomable, inversePan, zoomStep, translateExtent, flowWidth, flowHeight]);
    const onSvgClick = onClick
        ? (event) => {
            const [x, y] = minimapInstance.current?.pointer(event) || [0, 0];
            onClick(event, { x, y });
        }
        : undefined;
    const onSvgNodeClick = onNodeClick
        ? useCallback((event, nodeId) => {
            const node = store.getState().nodeLookup.get(nodeId);
            onNodeClick(event, node);
        }, [])
        : undefined;
    return (jsx(Panel, { position: position, style: {
            ...style,
            '--xy-minimap-background-color-props': typeof bgColor === 'string' ? bgColor : undefined,
            '--xy-minimap-mask-background-color-props': typeof maskColor === 'string' ? maskColor : undefined,
            '--xy-minimap-mask-stroke-color-props': typeof maskStrokeColor === 'string' ? maskStrokeColor : undefined,
            '--xy-minimap-mask-stroke-width-props': typeof maskStrokeWidth === 'number' ? maskStrokeWidth * viewScale : undefined,
            '--xy-minimap-node-background-color-props': typeof nodeColor === 'string' ? nodeColor : undefined,
            '--xy-minimap-node-stroke-color-props': typeof nodeStrokeColor === 'string' ? nodeStrokeColor : undefined,
            '--xy-minimap-node-stroke-width-props': typeof nodeStrokeWidth === 'string' ? nodeStrokeWidth : undefined,
        }, className: cc(['react-flow__minimap', className]), "data-testid": "rf__minimap", children: jsxs("svg", { width: elementWidth, height: elementHeight, viewBox: `${x} ${y} ${width} ${height}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": labelledBy, ref: svg, onClick: onSvgClick, children: [ariaLabel && jsx("title", { id: labelledBy, children: ariaLabel }), jsx(MiniMapNodes$1, { onClick: onSvgNodeClick, nodeColor: nodeColor, nodeStrokeColor: nodeStrokeColor, nodeBorderRadius: nodeBorderRadius, nodeClassName: nodeClassName, nodeStrokeWidth: nodeStrokeWidth, nodeComponent: nodeComponent }), jsx("path", { className: "react-flow__minimap-mask", d: `M${x - offset},${y - offset}h${width + offset * 2}v${height + offset * 2}h${-width - offset * 2}z
        M${viewBB.x},${viewBB.y}h${viewBB.width}v${viewBB.height}h${-viewBB.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) }));
}
MiniMapComponent.displayName = 'MiniMap';
memo(MiniMapComponent);

function ResizeControl({ nodeId, position, variant = ResizeControlVariant.Handle, className, style = {}, children, color, minWidth = 10, minHeight = 10, maxWidth = Number.MAX_VALUE, maxHeight = Number.MAX_VALUE, keepAspectRatio = false, shouldResize, onResizeStart, onResize, onResizeEnd, }) {
    const contextNodeId = useNodeId();
    const id = typeof nodeId === 'string' ? nodeId : contextNodeId;
    const store = useStoreApi();
    const resizeControlRef = useRef(null);
    const defaultPosition = variant === ResizeControlVariant.Line ? 'right' : 'bottom-right';
    const controlPosition = position ?? defaultPosition;
    const resizer = useRef(null);
    useEffect(() => {
        if (!resizeControlRef.current || !id) {
            return;
        }
        if (!resizer.current) {
            resizer.current = XYResizer({
                domNode: resizeControlRef.current,
                nodeId: id,
                getStoreItems: () => {
                    const { nodeLookup, transform, snapGrid, snapToGrid, nodeOrigin } = store.getState();
                    return {
                        nodeLookup,
                        transform,
                        snapGrid,
                        snapToGrid,
                        nodeOrigin,
                    };
                },
                onChange: (change, childChanges) => {
                    const { triggerNodeChanges, nodeLookup, parentLookup, nodeOrigin } = store.getState();
                    const changes = [];
                    const nextPosition = { x: change.x, y: change.y };
                    const node = nodeLookup.get(id);
                    if (node && node.expandParent && node.parentId) {
                        const origin = node.origin ?? nodeOrigin;
                        const width = change.width ?? node.measured.width;
                        const height = change.height ?? node.measured.height;
                        const child = {
                            id: node.id,
                            parentId: node.parentId,
                            rect: {
                                width,
                                height,
                                ...evaluateAbsolutePosition({
                                    x: change.x ?? node.position.x,
                                    y: change.y ?? node.position.y,
                                }, { width, height }, node.parentId, nodeLookup, origin),
                            },
                        };
                        const parentExpandChanges = handleExpandParent([child], nodeLookup, parentLookup, nodeOrigin);
                        changes.push(...parentExpandChanges);
                        // when the parent was expanded by the child node, its position will be clamped at
                        // 0,0 when node origin is 0,0 and to width, height if it's 1,1
                        nextPosition.x = change.x ? Math.max(origin[0] * width, change.x) : undefined;
                        nextPosition.y = change.y ? Math.max(origin[1] * height, change.y) : undefined;
                    }
                    if (nextPosition.x !== undefined && nextPosition.y !== undefined) {
                        const positionChange = {
                            id,
                            type: 'position',
                            position: { ...nextPosition },
                        };
                        changes.push(positionChange);
                    }
                    if (change.width !== undefined && change.height !== undefined) {
                        const dimensionChange = {
                            id,
                            type: 'dimensions',
                            resizing: true,
                            setAttributes: true,
                            dimensions: {
                                width: change.width,
                                height: change.height,
                            },
                        };
                        changes.push(dimensionChange);
                    }
                    for (const childChange of childChanges) {
                        const positionChange = {
                            ...childChange,
                            type: 'position',
                        };
                        changes.push(positionChange);
                    }
                    triggerNodeChanges(changes);
                },
                onEnd: () => {
                    const dimensionChange = {
                        id: id,
                        type: 'dimensions',
                        resizing: false,
                    };
                    store.getState().triggerNodeChanges([dimensionChange]);
                },
            });
        }
        resizer.current.update({
            controlPosition,
            boundaries: {
                minWidth,
                minHeight,
                maxWidth,
                maxHeight,
            },
            keepAspectRatio,
            onResizeStart,
            onResize,
            onResizeEnd,
            shouldResize,
        });
        return () => {
            resizer.current?.destroy();
        };
    }, [
        controlPosition,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        keepAspectRatio,
        onResizeStart,
        onResize,
        onResizeEnd,
        shouldResize,
    ]);
    const positionClassNames = controlPosition.split('-');
    const colorStyleProp = variant === ResizeControlVariant.Line ? 'borderColor' : 'backgroundColor';
    const controlStyle = color ? { ...style, [colorStyleProp]: color } : style;
    return (jsx("div", { className: cc(['react-flow__resize-control', 'nodrag', ...positionClassNames, variant, className]), ref: resizeControlRef, style: controlStyle, children: children }));
}
memo(ResizeControl);

function isOutputPosition(position) {
    return position === -1;
}
function isInputPosition(position) {
    return !isOutputPosition(position);
}
var OUTPUT_POSITION = -1;

var AssignmentContext = createContext(function (t) { return "y"; });

const CLASS_PART_SEPARATOR = '-';
function createClassUtils(config) {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  function getClassGroupId(className) {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : undefined;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return undefined;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
}
const arbitraryPropertyRegex = /^\[(.+)\]$/;
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      // I use two dots here because one dot is used as prefix for class groups in plugins
      return 'arbitrary..' + property;
    }
  }
}
/**
 * Exported for testing only
 */
function createClassMap(config) {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
  classGroup.forEach(classDefinition => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup]) => {
      processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
    });
  });
}
function getPart(classPartObject, path) {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(pathPart => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map(classDefinition => {
      if (typeof classDefinition === 'string') {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === 'object') {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}

// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: () => undefined,
      set: () => {}
    };
  }
  let cacheSize = 0;
  let cache = new Map();
  let previousCache = new Map();
  function update(key, value) {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map();
    }
  }
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== undefined) {
        return value;
      }
      if ((value = previousCache.get(key)) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
}
const IMPORTANT_MODIFIER = '!';
function createSplitModifiers(config) {
  const separator = config.separator;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  // splitModifiers inspired by https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
  return function splitModifiers(className) {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
}
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach(modifier => {
    const isArbitraryVariant = modifier[0] === '[';
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
}
function createConfigUtils(config) {
  return {
    cache: createLruCache(config.cacheSize),
    splitModifiers: createSplitModifiers(config),
    ...createClassUtils(config)
  };
}
const SPLIT_CLASSES_REGEX = /\s+/;
function mergeClassList(classList, configUtils) {
  const {
    splitModifiers,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  const classGroupsInConflict = new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map(originalClassName => {
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = splitModifiers(originalClassName);
    let classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    if (!classGroupId) {
      if (!maybePostfixModifierPosition) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(':');
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName,
      hasPostfixModifier
    };
  }).reverse()
  // Last class in conflict wins, so we need to filter conflicting classes in reverse order.
  .filter(parsed => {
    if (!parsed.isTailwindClass) {
      return true;
    }
    const {
      modifierId,
      classGroupId,
      hasPostfixModifier
    } = parsed;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach(group => classGroupsInConflict.add(modifierId + group));
    return true;
  }).reverse().map(parsed => parsed.originalClassName).join(' ');
}

/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = '';
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix) {
  if (typeof mix === 'string') {
    return mix;
  }
  let resolvedValue;
  let string = '';
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
function fromTheme(key) {
  const themeGetter = theme => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
}
const arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
const fractionRegex = /^\d+\/\d+$/;
const stringLengths = /*#__PURE__*/new Set(['px', 'full', 'screen']);
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
// Shadow always begins with x and y offset separated by underscore optionally prepended by inset
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function isLength(value) {
  return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
}
function isArbitraryLength(value) {
  return getIsArbitraryValue(value, 'length', isLengthOnly);
}
function isNumber(value) {
  return Boolean(value) && !Number.isNaN(Number(value));
}
function isArbitraryNumber(value) {
  return getIsArbitraryValue(value, 'number', isNumber);
}
function isInteger(value) {
  return Boolean(value) && Number.isInteger(Number(value));
}
function isPercent(value) {
  return value.endsWith('%') && isNumber(value.slice(0, -1));
}
function isArbitraryValue(value) {
  return arbitraryValueRegex.test(value);
}
function isTshirtSize(value) {
  return tshirtUnitRegex.test(value);
}
const sizeLabels = /*#__PURE__*/new Set(['length', 'size', 'percentage']);
function isArbitrarySize(value) {
  return getIsArbitraryValue(value, sizeLabels, isNever);
}
function isArbitraryPosition(value) {
  return getIsArbitraryValue(value, 'position', isNever);
}
const imageLabels = /*#__PURE__*/new Set(['image', 'url']);
function isArbitraryImage(value) {
  return getIsArbitraryValue(value, imageLabels, isImage);
}
function isArbitraryShadow(value) {
  return getIsArbitraryValue(value, '', isShadow);
}
function isAny() {
  return true;
}
function getIsArbitraryValue(value, label, testValue) {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === 'string' ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly(value) {
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  return lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
}
function isNever() {
  return false;
}
function isShadow(value) {
  return shadowRegex.test(value);
}
function isImage(value) {
  return imageRegex.test(value);
}
function getDefaultConfig() {
  const colors = fromTheme('colors');
  const spacing = fromTheme('spacing');
  const blur = fromTheme('blur');
  const brightness = fromTheme('brightness');
  const borderColor = fromTheme('borderColor');
  const borderRadius = fromTheme('borderRadius');
  const borderSpacing = fromTheme('borderSpacing');
  const borderWidth = fromTheme('borderWidth');
  const contrast = fromTheme('contrast');
  const grayscale = fromTheme('grayscale');
  const hueRotate = fromTheme('hueRotate');
  const invert = fromTheme('invert');
  const gap = fromTheme('gap');
  const gradientColorStops = fromTheme('gradientColorStops');
  const gradientColorStopPositions = fromTheme('gradientColorStopPositions');
  const inset = fromTheme('inset');
  const margin = fromTheme('margin');
  const opacity = fromTheme('opacity');
  const padding = fromTheme('padding');
  const saturate = fromTheme('saturate');
  const scale = fromTheme('scale');
  const sepia = fromTheme('sepia');
  const skew = fromTheme('skew');
  const space = fromTheme('space');
  const translate = fromTheme('translate');
  const getOverscroll = () => ['auto', 'contain', 'none'];
  const getOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  const getSpacingWithAutoAndArbitrary = () => ['auto', isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ['', isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ['auto', isNumber, isArbitraryValue];
  const getPositions = () => ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'];
  const getLineStyles = () => ['solid', 'dashed', 'dotted', 'double', 'none'];
  const getBlendModes = () => ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  const getAlign = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
  const getZeroAndEmpty = () => ['', '0', isArbitraryValue];
  const getBreaks = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  const getNumber = () => [isNumber, isArbitraryNumber];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ':',
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ['none', '', isTshirtSize, isArbitraryValue],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumber(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ['auto', 'square', 'video', isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [{
        'break-after': getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [{
        'break-before': getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [{
        'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [{
        'box-decoration': ['slice', 'clone']
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ['border', 'content']
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ['right', 'left', 'none', 'start', 'end']
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ['left', 'right', 'both', 'none', 'start', 'end']
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [{
        object: ['contain', 'cover', 'fill', 'none', 'scale-down']
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [{
        'overflow-x': getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [{
        'overflow-y': getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [{
        'overscroll-x': getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [{
        'overscroll-y': getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [{
        'inset-x': [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [{
        'inset-y': [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ['auto', isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [{
        flex: ['row', 'row-reverse', 'col', 'col-reverse']
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [{
        flex: ['wrap', 'wrap-reverse', 'nowrap']
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ['1', 'auto', 'initial', 'none', isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ['first', 'last', 'none', isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [{
        'grid-cols': [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [{
        col: ['auto', {
          span: ['full', isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [{
        'col-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [{
        'col-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [{
        'grid-rows': [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [{
        row: ['auto', {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [{
        'row-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [{
        'row-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [{
        'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [{
        'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [{
        'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [{
        'gap-x': [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [{
        'gap-y': [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [{
        justify: ['normal', ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [{
        'justify-items': ['start', 'end', 'center', 'stretch']
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [{
        'justify-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [{
        content: ['normal', ...getAlign(), 'baseline']
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [{
        items: ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [{
        self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline']
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [{
        'place-content': [...getAlign(), 'baseline']
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [{
        'place-items': ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [{
        'place-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      'space-x': [{
        'space-x': [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      'space-y': [{
        'space-y': [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-y-reverse': ['space-y-reverse'],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [{
        'min-w': [isArbitraryValue, spacing, 'min', 'max', 'fit']
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [{
        'max-w': [isArbitraryValue, spacing, 'none', 'full', 'min', 'max', 'fit', 'prose', {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [{
        'min-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [{
        'max-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit']
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [{
        text: ['base', isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [{
        font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractons'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [{
        'line-clamp': ['none', isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [{
        'list-image': ['none', isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [{
        list: ['none', 'disc', 'decimal', isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [{
        list: ['inside', 'outside']
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      'placeholder-opacity': [{
        'placeholder-opacity': [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [{
        text: ['left', 'center', 'right', 'justify', 'start', 'end']
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      'text-opacity': [{
        'text-opacity': [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [{
        decoration: [...getLineStyles(), 'wavy']
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [{
        decoration: ['auto', 'from-font', isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [{
        'underline-offset': ['auto', isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      'text-wrap': [{
        text: ['wrap', 'nowrap', 'balance', 'pretty']
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [{
        align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ['normal', 'words', 'all', 'keep']
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ['none', 'manual', 'auto']
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ['none', isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [{
        bg: ['fixed', 'local', 'scroll']
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [{
        'bg-clip': ['border', 'padding', 'content', 'text']
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      'bg-opacity': [{
        'bg-opacity': [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [{
        'bg-origin': ['border', 'padding', 'content']
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [{
        bg: ['no-repeat', {
          repeat: ['', 'x', 'y', 'round', 'space']
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [{
        bg: ['auto', 'cover', 'contain', isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [{
        bg: ['none', {
          'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [{
        'rounded-s': [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [{
        'rounded-e': [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [{
        'rounded-t': [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [{
        'rounded-r': [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [{
        'rounded-b': [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [{
        'rounded-l': [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [{
        'rounded-ss': [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [{
        'rounded-se': [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [{
        'rounded-ee': [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [{
        'rounded-es': [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [{
        'rounded-tl': [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [{
        'rounded-tr': [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [{
        'rounded-br': [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [{
        'rounded-bl': [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [{
        'border-x': [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [{
        'border-y': [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [{
        'border-s': [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [{
        'border-e': [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [{
        'border-t': [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [{
        'border-r': [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [{
        'border-b': [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [{
        'border-l': [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      'border-opacity': [{
        'border-opacity': [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [{
        border: [...getLineStyles(), 'hidden']
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x': [{
        'divide-x': [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y': [{
        'divide-y': [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      'divide-opacity': [{
        'divide-opacity': [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      'divide-style': [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [{
        'border-x': [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [{
        'border-y': [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [{
        'border-t': [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [{
        'border-r': [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [{
        'border-b': [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [{
        'border-l': [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [{
        outline: ['', ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [{
        'outline-offset': [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w': [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      'ring-color': [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      'ring-opacity': [{
        'ring-opacity': [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      'ring-offset-w': [{
        'ring-offset': [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      'ring-offset-color': [{
        'ring-offset': [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ['', 'inner', 'none', isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      'shadow-color': [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [{
        'mix-blend': [...getBlendModes(), 'plus-lighter', 'plus-darker']
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [{
        'bg-blend': getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ['', 'none']
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [{
        'drop-shadow': ['', 'none', isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [{
        'hue-rotate': [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [{
        'backdrop-filter': ['', 'none']
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [{
        'backdrop-blur': [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [{
        'backdrop-brightness': [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [{
        'backdrop-contrast': [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [{
        'backdrop-grayscale': [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [{
        'backdrop-hue-rotate': [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [{
        'backdrop-invert': [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [{
        'backdrop-opacity': [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [{
        'backdrop-saturate': [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [{
        'backdrop-sepia': [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [{
        border: ['collapse', 'separate']
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [{
        'border-spacing': [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [{
        'border-spacing-x': [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [{
        'border-spacing-y': [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [{
        table: ['auto', 'fixed']
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ['top', 'bottom']
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ['', 'gpu', 'none']
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [{
        'scale-x': [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [{
        'scale-y': [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [{
        'translate-x': [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [{
        'translate-y': [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [{
        'skew-x': [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [{
        'skew-y': [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [{
        origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ['auto', colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ['none', 'auto']
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out', isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [{
        'pointer-events': ['none', 'auto']
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ['none', 'y', 'x', '']
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [{
        scroll: ['auto', 'smooth']
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [{
        'scroll-m': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [{
        'scroll-mx': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [{
        'scroll-my': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [{
        'scroll-ms': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [{
        'scroll-me': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [{
        'scroll-mt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [{
        'scroll-mr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [{
        'scroll-mb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [{
        'scroll-ml': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [{
        'scroll-p': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [{
        'scroll-px': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [{
        'scroll-py': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [{
        'scroll-ps': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [{
        'scroll-pe': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [{
        'scroll-pt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [{
        'scroll-pr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [{
        'scroll-pb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [{
        'scroll-pl': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [{
        snap: ['start', 'end', 'center', 'align-none']
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [{
        snap: ['normal', 'always']
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [{
        snap: ['none', 'x', 'y', 'both']
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [{
        snap: ['mandatory', 'proximity']
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ['auto', 'none', 'manipulation']
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-x': [{
        'touch-pan': ['x', 'left', 'right']
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-y': [{
        'touch-pan': ['y', 'up', 'down']
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-pz': ['touch-pinch-zoom'],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ['none', 'text', 'all', 'auto']
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [{
        'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, 'none']
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, 'none']
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ['sr-only', 'not-sr-only'],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      'forced-color-adjust': [{
        'forced-color-adjust': ['auto', 'none']
      }]
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: ['rounded-s', 'rounded-e', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch']
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading']
    }
  };
}
const twMerge = /*#__PURE__*/createTailwindMerge(getDefaultConfig);

function Hole(props) {
    var termString = JSON.stringify(props.term);
    var assignment = useContext(AssignmentContext);
    var value = assignment(props.term);
    var isFunctionHole = function () {
        if ("variable" in props.term) {
            return false;
        }
        else {
            return props.term.args.length !== 0;
        }
    };
    var isFocussed = props.focus.isFocussed(termString);
    return (jsx("div", __assign({ className: twMerge("bg-white w-6 h-6 m-1 border-black border-2 rounded-full select-none relative z-50", isFunctionHole() && "bg-pink", isFocussed && "scale-110 bg-yellow-highlight"), onMouseEnter: function () { return props.focus.focus(termString); }, onMouseLeave: function () { return props.focus.resetFocus(); } }, { children: value })));
}

function SourceConnectorPolygon() {
    return jsx("polygon", { points: "3,2 14,2 19,10 14,18 3,18" });
}
function TargetConnectorPolygon() {
    return jsx("polygon", { points: "10,10 5,2 17,2 22,10 17,18 5,18" });
}
function Connector(_a) {
    var type = _a.type, _b = _a.isConnected, isConnected = _b === void 0 ? false : _b, _c = _a.isInline, isInline = _c === void 0 ? false : _c;
    return jsxs("svg", __assign({ className: twJoin("stroke-[1.5px] stroke-black pointer-events-none fill-white", isInline && "inline"), width: "24", height: "20", xmlns: "http://www.w3.org/2000/svg" }, { children: [type === "source" ? jsx(SourceConnectorPolygon, {}) : jsx(TargetConnectorPolygon, {}), type === "target" && isConnected ? jsx("polyline", { points: "1,2 6,10 1,18", fill: "none" }) : jsx(Fragment, {})] }));
}

function DummyHandle(_a) {
    var position = _a.position;
    if (position === "source") {
        return jsx("div", __assign({ className: "react-flow__handle react-flow__handle-right" }, { children: jsx(Connector, { type: "source", isConnected: false }) }));
    }
    else {
        return jsx("div", __assign({ className: "react-flow__handle react-flow__handle-left" }, { children: jsx(Connector, { type: "target", isConnected: false }) }));
    }
}

function backgroundColorFromAbbreviation(abbreviation) {
    switch (abbreviation) {
        case "r": return "bg-red";
        case "y": return "bg-yellow";
        case "g": return "bg-green";
        case "b": return "bg-blue";
        case "w": return "bg-white";
        case "bl": return "bg-black";
        case "o": return "bg-orange";
        case "p": return "bg-purple";
        case "c": return "bg-cyan";
    }
}
function backgroundFromColorAbbreviation(abbreviation) {
    if (abbreviation.substring(0, 8) === "striped_") {
        var color = abbreviation.substring(8);
        return 'bg-striped ' + backgroundColorFromAbbreviation(color);
    }
    else {
        return backgroundColorFromAbbreviation(abbreviation);
    }
}
function getHandleId(position, gadgetId) {
    return "handle_".concat(JSON.stringify(position), "_of_").concat(gadgetId);
}
function getTermOfHandle(handleId, gadgetTerms) {
    var e_1, _a;
    var position = handleId.split("_")[1];
    try {
        for (var gadgetTerms_1 = __values(gadgetTerms), gadgetTerms_1_1 = gadgetTerms_1.next(); !gadgetTerms_1_1.done; gadgetTerms_1_1 = gadgetTerms_1.next()) {
            var _b = __read(gadgetTerms_1_1.value, 2), termPosition = _b[0], term = _b[1];
            if (JSON.stringify(termPosition) === position) {
                return term;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (gadgetTerms_1_1 && !gadgetTerms_1_1.done && (_a = gadgetTerms_1.return)) _a.call(gadgetTerms_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    throw Error("Term not found for handle " + handleId);
}
function getNodePositionFromHandle(handleId) {
    var position = handleId.split("_")[1];
    return JSON.parse(position);
}
function Node(props) {
    function getHandleProps(id) {
        if (isInputPosition(props.position)) {
            return { type: "target", position: Position.Left, id: id };
        }
        else {
            return { type: "source", position: Position.Right, id: id };
        }
    }
    function renderHandle() {
        if (!props.useDummyHandle) {
            var handleId = getHandleId(props.position, props.gadgetId);
            var handleProps = getHandleProps(handleId);
            return jsx(Handle, __assign({}, handleProps, { children: jsx(Connector, { type: handleProps.type, isConnected: false }) }));
        }
        else {
            var position = (isInputPosition(props.position)) ? "target" : "source";
            return jsx(DummyHandle, { position: position });
        }
    }
    if ("variable" in props.term) {
        console.error("Term cannot be rendered as node:" + props.term);
        return jsx(Fragment, {});
    }
    else {
        var background = backgroundFromColorAbbreviation(props.term.label);
        return (jsxs("div", __assign({ className: "flex items-center" }, { children: [jsx("div", __assign({ className: twMerge("m-1 border-black border-2 rounded-lg p-0.5", background, props.isGoalNode && "outline outline-offset-2 outline-2") }, { children: props.term.args.map(function (arg, idx) { return jsx(Hole, { term: arg, focus: props.holeFocus }, idx); }) })), renderHandle()] })));
    }
}

function pointToString(point) {
    return point.x + " " + point.y;
}
function addOffsetX(p, dx) {
    return { x: p.x + dx, y: p.y };
}
function getCenterRelativeToParent(e) {
    var left = e.offsetLeft;
    var top = e.offsetTop;
    var width = e.offsetWidth;
    var height = e.offsetHeight;
    return { x: left + width / 2, y: top + height / 2 };
}
function getCenter(rect) {
    return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2
    };
}

var CONTROL_POINT_OFFSET = 30;
var CONTROL_POINT_VARIABLE_OFFSET = 10;
function connectionPath(props, index, fixedOffset) {
    if (fixedOffset === void 0) { fixedOffset = CONTROL_POINT_OFFSET; }
    var svg_start_sequence = "M " + pointToString(props.start);
    var offset_start = props.fromInput
        ? fixedOffset
        : -fixedOffset;
    var offset_start_modified = offset_start + index * CONTROL_POINT_VARIABLE_OFFSET;
    var controlPoint1 = addOffsetX(props.start, offset_start_modified);
    var offset_end = props.toOutput
        ? -fixedOffset
        : fixedOffset;
    var controlPoint2 = addOffsetX(props.end, offset_end);
    var svg_curve = "C " +
        pointToString(controlPoint1) +
        ", " +
        pointToString(controlPoint2) +
        ", " +
        pointToString(props.end);
    var path_command = svg_start_sequence + " " + svg_curve;
    return (jsx("path", { d: path_command, strokeWidth: "2px", fill: "transparent" }, index));
}
function ConnectionSvg(_a) {
    var props = __rest(_a, []);
    function drawConnections() {
        var pathElements = props.connections.map(function (connection, index) {
            return connectionPath(connection, index);
        });
        return pathElements;
    }
    return jsx("svg", __assign({ className: "absolute top-0 left-0 w-full h-full z-5 pointer-events-none stroke-black" }, { children: drawConnections() }));
}

var hash = function (str, seed) {
    if (seed === void 0) { seed = 0; }
    var h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (var i = 0, ch = void 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

var DisjointSetWithAssignment = /** @class */ (function () {
    function DisjointSetWithAssignment() {
        this.parent = new Map();
        this.rank = new Map();
        this.assignments = new Map();
    }
    DisjointSetWithAssignment.prototype.makeSet = function (x) {
        this.parent.set(x, x);
        this.rank.set(x, 0);
    };
    DisjointSetWithAssignment.prototype.performPathCompression = function (x) {
        if (this.parent.get(x) !== x) {
            this.parent.set(x, this.findRepresentative(this.parent.get(x)));
        }
    };
    DisjointSetWithAssignment.prototype.findRepresentative = function (x) {
        if (!this.parent.has(x)) {
            this.makeSet(x);
        }
        this.performPathCompression(x);
        return this.parent.get(x);
    };
    DisjointSetWithAssignment.prototype.valueToBeAssigned = function (s1, s2) {
        if (s1 === undefined) {
            return s2;
        }
        else {
            return s1;
        }
    };
    DisjointSetWithAssignment.prototype.setIfNotUndefined = function (key, value) {
        if (value !== undefined) {
            this.assignments.set(key, value);
        }
    };
    DisjointSetWithAssignment.prototype.unite = function (x, y) {
        var rootX = this.findRepresentative(x);
        var rootY = this.findRepresentative(y);
        if (rootX !== rootY) {
            var valueX = this.assignments.get(rootX);
            var valueY = this.assignments.get(rootY);
            var value = this.valueToBeAssigned(valueX, valueY);
            var rankX = this.rank.get(rootX);
            var rankY = this.rank.get(rootY);
            if (rankX < rankY) {
                this.parent.set(rootX, rootY);
                this.setIfNotUndefined(rootY, value);
            }
            else if (rankX > rankY) {
                this.parent.set(rootY, rootX);
                this.setIfNotUndefined(rootX, value);
            }
            else {
                this.parent.set(rootY, rootX);
                this.setIfNotUndefined(rootX, value);
                this.rank.set(rootX, rankX + 1);
            }
        }
    };
    DisjointSetWithAssignment.prototype.assign = function (t, value) {
        var representative = this.findRepresentative(t);
        this.assignments.set(representative, value);
    };
    DisjointSetWithAssignment.prototype.getAssignedValue = function (t) {
        var representative = this.findRepresentative(t);
        return this.assignments.get(representative);
    };
    DisjointSetWithAssignment.prototype.isAssigned = function (t) {
        var representative = this.findRepresentative(t);
        return this.assignments.has(representative);
    };
    DisjointSetWithAssignment.prototype.getAssignedValues = function () {
        return new (Array.bind.apply(Array, __spreadArray([void 0], __read(this.assignments.values()), false)))();
    };
    return DisjointSetWithAssignment;
}());

function hashTerm(t) {
    return hash(JSON.stringify(t));
}
function termHasVariable(term, v) {
    if ("variable" in term) {
        return v === term.variable;
    }
    else {
        var appearsInArg = term.args.map(function (arg) { return termHasVariable(arg, v); });
        return appearsInArg.includes(true);
    }
}
function substitute(t, a) {
    if ("variable" in t) {
        var assigned = a.getAssignedValue(t.variable);
        if (assigned) {
            return assigned;
        }
        else {
            return t;
        }
    }
    else {
        var argsSubstituted = t.args.map(function (term) { return substitute(term, a); });
        return { label: t.label, args: argsSubstituted };
    }
}
function getVariableList(t) {
    if ("variable" in t) {
        return [t.variable];
    }
    else {
        var list_1 = [];
        t.args.forEach(function (arg) {
            return list_1 = list_1.concat(getVariableList(arg));
        });
        return list_1;
    }
}
function getVariableSet(t) {
    return new Set(getVariableList(t));
}
function makeTermWithFreshVariables(t, prefix) {
    var assignment = new DisjointSetWithAssignment();
    getVariableSet(t).forEach(function (variable) {
        return assignment.assign(variable, { variable: prefix + "_" + variable });
    });
    return substitute(t, assignment);
}
function makeAxiomWithFreshVariables(axiom, prefix) {
    var hypotheses = axiom.hypotheses.map(function (h) { return makeTermWithFreshVariables(h, prefix); });
    var conclusion = makeTermWithFreshVariables(axiom.conclusion, prefix);
    return { hypotheses: hypotheses, conclusion: conclusion };
}
function colorsMatch(term1, term2) {
    if ("label" in term1 && "label" in term2) {
        return term1.label === term2.label;
    }
    return false;
}
function sameArity(term1, term2) {
    if ("args" in term1 && "args" in term2) {
        return term1.args.length === term2.args.length;
    }
    return false;
}

function getAllUniquePairs(arr) {
    var pairs = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            pairs.push([arr[i], arr[j]]);
        }
    }
    return pairs;
}
function getPositionsInTerm(v, t) {
    if ("args" in t) {
        var positions = [];
        for (var i = 0; i < t.args.length; i++) {
            var arg = t.args[i];
            if ("variable" in arg) {
                if (arg.variable === v) {
                    positions.push(i);
                }
            }
        }
        return positions;
    }
    else {
        return [];
    }
}
function toConnections(positions) {
    var connections = positions.map(function (pos) {
        var _a = __read(pos, 2), from = _a[0], to = _a[1];
        return { from: from, to: to };
    });
    return connections;
}
function makeConnectionsForVariable(inputs, output, v) {
    var positionsInInputsStructured = inputs.map(function (term, indexOfTerm) {
        return getPositionsInTerm(v, term).map(function (variablePosition) {
            return [indexOfTerm, variablePosition];
        });
    });
    var positionsInOutput = getPositionsInTerm(v, output).map(function (variablePosition) {
        return ["output", variablePosition];
    });
    var positionsInInputs = positionsInInputsStructured.flat();
    if (positionsInOutput.length === 0) {
        var connections = [];
        for (var i = 0; i < positionsInInputs.length - 1; i++) {
            connections.push({ from: positionsInInputs[i], to: positionsInInputs[i + 1] });
        }
        return connections;
    }
    else if (positionsInInputs.length === 0) {
        return toConnections(getAllUniquePairs(positionsInOutput));
    }
    else {
        return (positionsInInputs.map(function (from) {
            return positionsInOutput.map(function (to) { return { from: from, to: to }; });
        })).flat();
    }
}
function makeConnections(inputs, output) {
    var variableList = (inputs.concat(output)).map(getVariableList);
    var variableListDeduplicated = Array.from(new Set(variableList.flat()));
    var connections = variableListDeduplicated.map(function (v) {
        return makeConnectionsForVariable(inputs, output, v);
    });
    return connections.flat();
}

function calculateOutputHolePosition(gadget, holeIndex) {
    var outputNodeContainer = gadget.childNodes[1];
    var outputNode = outputNodeContainer.childNodes[0].childNodes[0];
    var holeElement = outputNode.childNodes[holeIndex];
    return getCenterRelativeToParent(holeElement);
}
function calculateInputHolePosition(gadget, nodeIndex, holeIndex) {
    var inputNodeContainer = gadget.childNodes[0];
    var nodeElement = inputNodeContainer.childNodes[nodeIndex].childNodes[0];
    var holeElement = nodeElement.childNodes[holeIndex];
    return getCenterRelativeToParent(holeElement);
}
function calculateHolePositionFromGadgetHTMLElement(gadget, hole) {
    var _a = __read(hole, 2), nodeIndex = _a[0], holeIndex = _a[1];
    if (nodeIndex === "output") {
        return calculateOutputHolePosition(gadget, holeIndex);
    }
    else {
        return calculateInputHolePosition(gadget, nodeIndex, holeIndex);
    }
}
function calculateHolePosition(gadgetId, hole) {
    var gadget = document.getElementById(gadgetId);
    if (gadget) {
        return calculateHolePositionFromGadgetHTMLElement(gadget, hole);
    }
    else {
        throw new Error("Couldn't find gadget with id " + gadgetId);
    }
}
function Gadget(_a) {
    var props = __rest(_a, []);
    var initialConnectionSetProps = { connections: [] };
    var _b = __read(useState(initialConnectionSetProps), 2), connectionState = _b[0], setConnectionState = _b[1];
    var _c = __read(useState(""), 2), focussedHole = _c[0], setFocussedHole = _c[1];
    var focus = {
        isFocussed: function (hole) { return hole === focussedHole && props.displayHoleFocus; },
        focus: function (hole) { return setFocussedHole(hole); },
        resetFocus: function () { return setFocussedHole(""); }
    };
    function hasOutputNode() {
        var positions = Array.from(props.terms.keys());
        return positions.some(isOutputPosition);
    }
    useLayoutEffect(function () {
        function calculateInternalConnectionDrawingData(internalConnection) {
            var start = calculateHolePosition(props.id, internalConnection.from);
            var end = calculateHolePosition(props.id, internalConnection.to);
            var _a = __read(internalConnection.from, 1), fromNode = _a[0];
            var _b = __read(internalConnection.to, 1), toNode = _b[0];
            var from_input = fromNode !== "output";
            var to_output = toNode === "output";
            return { start: start, end: end, fromInput: from_input, toOutput: to_output };
        }
        if (hasOutputNode()) {
            var inputs = Array.from(props.terms).filter(function (key) { return isInputPosition(key[0]); });
            var inputTerms = inputs.map(function (kv) { return kv[1]; });
            var connections = makeConnections(inputTerms, props.terms.get(OUTPUT_POSITION));
            var drawingData = connections.map(calculateInternalConnectionDrawingData);
            setConnectionState({ connections: drawingData });
        }
    }, [props.terms, props.id]);
    function makeInputNodes() {
        var e_1, _a;
        var buffer = [];
        try {
            for (var _b = __values(props.terms), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), position = _d[0], term = _d[1];
                var nodeDisplayProps = {
                    term: term,
                    position: position,
                    gadgetId: props.id,
                    holeFocus: focus,
                    useDummyHandle: props.isAxiom,
                    isGoalNode: props.id === "goal_gadget",
                };
                if (isInputPosition(position)) {
                    buffer.push(jsx(Node, __assign({}, nodeDisplayProps), position));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return buffer;
    }
    function makeOutputNodeContainer() {
        if (hasOutputNode()) {
            var nodeDisplayProps = {
                term: props.terms.get(OUTPUT_POSITION),
                position: OUTPUT_POSITION,
                gadgetId: props.id,
                holeFocus: focus,
                useDummyHandle: props.isAxiom,
                isGoalNode: false
            };
            return (jsx("div", __assign({ className: "flex flex-col justify-center" }, { children: jsx(Node, __assign({}, nodeDisplayProps)) })));
        }
        else {
            return jsx(Fragment, {});
        }
    }
    function hasInputNodes() {
        return Array.from(props.terms.keys()).some(isInputPosition);
    }
    return (jsxs("div", __assign({ className: "text-center relative" }, { children: [jsxs("div", __assign({ className: twMerge("flex", hasInputNodes() && "space-x-8"), id: props.id }, { children: [jsx("div", __assign({ className: "flex flex-col items-start" }, { children: makeInputNodes() })), makeOutputNodeContainer()] })), jsx(ConnectionSvg, __assign({}, connectionState))] })));
}

function GadgetFlowNode(_a) {
    var data = _a.data;
    return (jsx("div", { children: jsx(Gadget, __assign({}, data)) }));
}

function axiomToGadget(axiom, id) {
    var axiomWithFreshVariables = makeAxiomWithFreshVariables(axiom, id);
    var terms = new Map();
    axiomWithFreshVariables.hypotheses.forEach(function (hypothesis, i) {
        terms.set(i, hypothesis);
    });
    terms.set(OUTPUT_POSITION, axiomWithFreshVariables.conclusion);
    return { terms: terms, id: id, isAxiom: false, displayHoleFocus: true };
}
function axiomTermEnumeration(t) {
    if ("variable" in t) {
        return "";
    }
    else {
        if (t.args.length === 0) { // constant
            return t.label;
        }
        else {
            return "?";
        }
    }
}
function termToString(t) {
    if ("variable" in t) {
        return t.variable;
    }
    else {
        if (t.args.length === 0) { // constant
            return t.label;
        }
        else {
            return t.label + "(" + t.args.map(termToString).join(", ") + ")";
        }
    }
}
function axiomToString(a) {
    var hypotheses = a.hypotheses.map(termToString).join(", ");
    var conclustion = termToString(a.conclusion);
    return hypotheses + " :- " + conclustion;
}

function useIdGenerator(prefix) {
    var counter = useRef(0);
    function getId() {
        counter.current = counter.current + 1;
        return prefix + counter.current;
    }
    function reset() {
        counter.current = 0;
    }
    return [getId, reset];
}

function InsertGadgetButton(_a) {
    var makeGadget = _a.makeGadget, children = _a.children;
    var ref = useRef(null);
    function getPosition() {
        var domRect = ref.current.getBoundingClientRect();
        return { x: domRect.left + domRect.width / 2, y: domRect.top + domRect.height / 2 };
    }
    function onMouseDown(e) {
        makeGadget(getPosition());
    }
    return jsx("div", __assign({ ref: ref, className: "flex justify-center px-1", onMouseDown: onMouseDown }, { children: children }));
}
function GadgetPalette(_a) {
    var props = __rest(_a, []);
    var _b = __read(useIdGenerator("axiom_"), 2), getAxiomId = _b[0], resetIdGenerator = _b[1];
    resetIdGenerator();
    function makeAxiomGadget(axiom) {
        var terms = new Map();
        axiom.hypotheses.forEach(function (hypothesis, i) {
            terms.set(i, hypothesis);
        });
        terms.set(OUTPUT_POSITION, axiom.conclusion);
        return { terms: terms, id: getAxiomId(), isAxiom: true, displayHoleFocus: true };
    }
    return (jsx(Panel, __assign({ position: 'top-center' }, { children: jsx(AssignmentContext.Provider, __assign({ value: axiomTermEnumeration }, { children: jsx("div", __assign({ id: "gadget_palette", className: "absolute min-w-40 h-[calc(100vh-64px)] flex flex-col left-0 top-0 p-1 overflow-y-scroll bg-palette-gray/50" }, { children: props.axioms.map(function (axiom) {
                    return jsx(InsertGadgetButton, __assign({ makeGadget: function (axiomPosition) { return props.makeGadget(axiom, axiomPosition); } }, { children: jsx(Gadget, __assign({}, makeAxiomGadget(axiom))) }), JSON.stringify(axiom));
                }) })) })) })));
}

function CustomEdge(_a) {
    var props = __rest(_a, []);
    var data = {
        start: { x: props.sourceX - 5, y: props.sourceY },
        end: { x: props.targetX + 9, y: props.targetY },
        fromInput: true, toOutput: true
    };
    return (jsx("g", __assign({ className: 'stroke-black' }, { children: connectionPath(data, 0, 20) })));
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = "/* this will be exported as base.css and can be used for a basic styling */\n/* these are the necessary styles for React/Svelte Flow, they get used by base.css and style.css */\n.react-flow {\n  direction: ltr;\n\n  --xy-edge-stroke-default: #b1b1b7;\n  --xy-edge-stroke-width-default: 1;\n  --xy-edge-stroke-selected-default: #555;\n\n  --xy-connectionline-stroke-default: #b1b1b7;\n  --xy-connectionline-stroke-width-default: 1;\n\n  --xy-attribution-background-color-default: rgba(255, 255, 255, 0.5);\n\n  --xy-minimap-background-color-default: #fff;\n  --xy-minimap-mask-background-color-default: rgb(240, 240, 240, 0.6);\n  --xy-minimap-mask-stroke-color-default: transparent;\n  --xy-minimap-mask-stroke-width-default: 1;\n  --xy-minimap-node-background-color-default: #e2e2e2;\n  --xy-minimap-node-stroke-color-default: transparent;\n  --xy-minimap-node-stroke-width-default: 2;\n\n  --xy-background-color-default: transparent;\n  --xy-background-pattern-dots-color-default: #91919a;\n  --xy-background-pattern-lines-color-default: #eee;\n  --xy-background-pattern-cross-color-default: #e2e2e2;\n  background-color: var(--xy-background-color, var(--xy-background-color-default));\n  --xy-node-border-default: 1px solid #bbb;\n  --xy-node-border-selected-default: 1px solid #555;\n\n  --xy-handle-background-color-default: #333;\n\n  --xy-selection-background-color-default: rgba(150, 150, 180, 0.1);\n  --xy-selection-border-default: 1px dotted rgba(155, 155, 155, 0.8);\n  --xy-resize-background-color-default: #3367d9;\n}\n.react-flow.dark {\n  --xy-edge-stroke-default: #3e3e3e;\n  --xy-edge-stroke-width-default: 1;\n  --xy-edge-stroke-selected-default: #727272;\n\n  --xy-connectionline-stroke-default: #b1b1b7;\n  --xy-connectionline-stroke-width-default: 1;\n\n  --xy-attribution-background-color-default: rgba(150, 150, 150, 0.25);\n\n  --xy-minimap-background-color-default: #141414;\n  --xy-minimap-mask-background-color-default: rgb(60, 60, 60, 0.6);\n  --xy-minimap-mask-stroke-color-default: transparent;\n  --xy-minimap-mask-stroke-width-default: 1;\n  --xy-minimap-node-background-color-default: #2b2b2b;\n  --xy-minimap-node-stroke-color-default: transparent;\n  --xy-minimap-node-stroke-width-default: 2;\n\n  --xy-background-color-default: #141414;\n  --xy-background-pattern-dots-color-default: #777;\n  --xy-background-pattern-lines-color-default: #777;\n  --xy-background-pattern-cross-color-default: #777;\n  --xy-node-color-default: #f8f8f8;\n}\n.react-flow__background {\n  background-color: var(--xy-background-color, var(--xy-background-color-props, var(--xy-background-color-default)));\n  pointer-events: none;\n  z-index: -1;\n}\n.react-flow__container {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n.react-flow__pane {\n  z-index: 1;\n}\n.react-flow__pane.selection {\n    cursor: pointer;\n  }\n.react-flow__pane.draggable {\n    cursor: grab;\n  }\n.react-flow__pane.draggable.dragging {\n      cursor: grabbing;\n    }\n.react-flow__viewport {\n  transform-origin: 0 0;\n  z-index: 2;\n  pointer-events: none;\n}\n.react-flow__renderer {\n  z-index: 4;\n}\n.react-flow__selection {\n  z-index: 6;\n}\n.react-flow__nodesselection-rect:focus,\n.react-flow__nodesselection-rect:focus-visible {\n  outline: none;\n}\n.react-flow__edge-path {\n  stroke: var(--xy-edge-stroke, var(--xy-edge-stroke-default));\n  stroke-width: var(--xy-edge-stroke-width, var(--xy-edge-stroke-width-default));\n  fill: none;\n}\n.react-flow__connection-path {\n  stroke: var(--xy-connectionline-stroke, var(--xy-connectionline-stroke-default));\n  stroke-width: var(--xy-connectionline-stroke-width, var(--xy-connectionline-stroke-width-default));\n  fill: none;\n}\n.react-flow__edges {\n  position: absolute;\n}\n.react-flow__edges svg {\n    overflow: visible;\n    position: absolute;\n    pointer-events: none;\n  }\n.react-flow__edge {\n  pointer-events: visibleStroke;\n}\n.react-flow__edge.selectable {\n    cursor: pointer;\n  }\n.react-flow__edge.animated path {\n    stroke-dasharray: 5;\n    animation: dashdraw 0.5s linear infinite;\n  }\n.react-flow__edge.animated path.react-flow__edge-interaction {\n    stroke-dasharray: none;\n    animation: none;\n  }\n.react-flow__edge.inactive {\n    pointer-events: none;\n  }\n.react-flow__edge.selected,\n  .react-flow__edge:focus,\n  .react-flow__edge:focus-visible {\n    outline: none;\n  }\n.react-flow__edge.selected .react-flow__edge-path,\n  .react-flow__edge.selectable:focus .react-flow__edge-path,\n  .react-flow__edge.selectable:focus-visible .react-flow__edge-path {\n    stroke: var(--xy-edge-stroke-selected, var(--xy-edge-stroke-selected-default));\n  }\n.react-flow__edge-textwrapper {\n    pointer-events: all;\n  }\n.react-flow__edge .react-flow__edge-text {\n    pointer-events: none;\n    -webkit-user-select: none;\n            user-select: none;\n  }\n.react-flow__connection {\n  pointer-events: none;\n}\n.react-flow__connection .animated {\n    stroke-dasharray: 5;\n    animation: dashdraw 0.5s linear infinite;\n  }\nsvg.react-flow__connectionline {\n  z-index: 1001;\n  overflow: visible;\n  position: absolute;\n}\n.react-flow__nodes {\n  pointer-events: none;\n  transform-origin: 0 0;\n}\n.react-flow__node {\n  position: absolute;\n  -webkit-user-select: none;\n          user-select: none;\n  pointer-events: all;\n  transform-origin: 0 0;\n  box-sizing: border-box;\n  cursor: default;\n}\n.react-flow__node.selectable {\n    cursor: pointer;\n  }\n.react-flow__node.draggable {\n    cursor: grab;\n    pointer-events: all;\n  }\n.react-flow__node.draggable.dragging {\n      cursor: grabbing;\n    }\n.react-flow__nodesselection {\n  z-index: 3;\n  transform-origin: left top;\n  pointer-events: none;\n}\n.react-flow__nodesselection-rect {\n    position: absolute;\n    pointer-events: all;\n    cursor: grab;\n  }\n.react-flow__handle {\n  position: absolute;\n  pointer-events: none;\n  min-width: 5px;\n  min-height: 5px;\n  background-color: var(--xy-handle-background-color, var(--xy-handle-background-color-default));\n}\n.react-flow__handle.connectingfrom {\n    pointer-events: all;\n  }\n.react-flow__handle.connectionindicator {\n    pointer-events: all;\n    cursor: crosshair;\n  }\n.react-flow__handle-bottom {\n    top: auto;\n    left: 50%;\n    bottom: 0;\n    transform: translate(-50%, 50%);\n  }\n.react-flow__handle-top {\n    top: 0;\n    left: 50%;\n    transform: translate(-50%, -50%);\n  }\n.react-flow__handle-left {\n    top: 50%;\n    left: 0;\n    transform: translate(-50%, -50%);\n  }\n.react-flow__handle-right {\n    top: 50%;\n    right: 0;\n    transform: translate(50%, -50%);\n  }\n.react-flow__edgeupdater {\n  cursor: move;\n  pointer-events: all;\n}\n.react-flow__panel {\n  position: absolute;\n  z-index: 5;\n  margin: 15px;\n}\n.react-flow__panel.top {\n    top: 0;\n  }\n.react-flow__panel.bottom {\n    bottom: 0;\n  }\n.react-flow__panel.left {\n    left: 0;\n  }\n.react-flow__panel.right {\n    right: 0;\n  }\n.react-flow__panel.center {\n    left: 50%;\n    transform: translateX(-50%);\n  }\n.react-flow__attribution {\n  font-size: 10px;\n  background: var(--xy-attribution-background-color, var(--xy-attribution-background-color-default));\n  padding: 2px 3px;\n  margin: 0;\n}\n.react-flow__attribution a {\n    text-decoration: none;\n    color: #999;\n  }\n@keyframes dashdraw {\n  from {\n    stroke-dashoffset: 10;\n  }\n}\n.react-flow__edgelabel-renderer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  -webkit-user-select: none;\n          user-select: none;\n  left: 0;\n  top: 0;\n}\n.react-flow__viewport-portal {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  -webkit-user-select: none;\n          user-select: none;\n}\n.react-flow__minimap {\n  background: var(\n    --xy-minimap-background-color-props,\n    var(--xy-minimap-background-color, var(--xy-minimap-background-color-default))\n  );\n}\n.react-flow__minimap-svg {\n    display: block;\n  }\n.react-flow__minimap-mask {\n    fill: var(\n      --xy-minimap-mask-background-color-props,\n      var(--xy-minimap-mask-background-color, var(--xy-minimap-mask-background-color-default))\n    );\n    stroke: var(\n      --xy-minimap-mask-stroke-color-props,\n      var(--xy-minimap-mask-stroke-color, var(--xy-minimap-mask-stroke-color-default))\n    );\n    stroke-width: var(\n      --xy-minimap-mask-stroke-width-props,\n      var(--xy-minimap-mask-stroke-width, var(--xy-minimap-mask-stroke-width-default))\n    );\n  }\n.react-flow__minimap-node {\n    fill: var(\n      --xy-minimap-node-background-color-props,\n      var(--xy-minimap-node-background-color, var(--xy-minimap-node-background-color-default))\n    );\n    stroke: var(\n      --xy-minimap-node-stroke-color-props,\n      var(--xy-minimap-node-stroke-color, var(--xy-minimap-node-stroke-color-default))\n    );\n    stroke-width: var(\n      --xy-minimap-node-stroke-width-props,\n      var(--xy-minimap-node-stroke-width, var(--xy-minimap-node-stroke-width-default))\n    );\n  }\n.react-flow__background-pattern.dots {\n    fill: var(\n      --xy-background-pattern-color-props,\n      var(--xy-background-pattern-color, var(--xy-background-pattern-dots-color-default))\n    );\n  }\n.react-flow__background-pattern.lines {\n    stroke: var(\n      --xy-background-pattern-color-props,\n      var(--xy-background-pattern-color, var(--xy-background-pattern-lines-color-default))\n    );\n  }\n.react-flow__background-pattern.cross {\n    stroke: var(\n      --xy-background-pattern-color-props,\n      var(--xy-background-pattern-color, var(--xy-background-pattern-cross-color-default))\n    );\n  }\n.react-flow__controls {\n  display: flex;\n  flex-direction: column;\n}\n.react-flow__controls.horizontal {\n    flex-direction: row;\n  }\n.react-flow__controls-button {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 26px;\n    width: 26px;\n    padding: 4px;\n  }\n.react-flow__controls-button svg {\n      width: 100%;\n      max-width: 12px;\n      max-height: 12px;\n      fill: currentColor;\n    }\n.react-flow__node-input,\n.react-flow__node-default,\n.react-flow__node-output,\n.react-flow__node-group {\n  border: var(--xy-node-border, var(--xy-node-border-default));\n  color: var(--xy-node-color, var(--xy-node-color-default));\n}\n.react-flow__node-input.selected,\n  .react-flow__node-input:focus,\n  .react-flow__node-input:focus-visible,\n  .react-flow__node-default.selected,\n  .react-flow__node-default:focus,\n  .react-flow__node-default:focus-visible,\n  .react-flow__node-output.selected,\n  .react-flow__node-output:focus,\n  .react-flow__node-output:focus-visible,\n  .react-flow__node-group.selected,\n  .react-flow__node-group:focus,\n  .react-flow__node-group:focus-visible {\n    outline: none;\n    border: var(--xy-node-border-selected, var(--xy-node-border-selected-default));\n  }\n.react-flow__nodesselection-rect,\n.react-flow__selection {\n  background: var(--xy-selection-background-color, var(--xy-selection-background-color-default));\n  border: var(--xy-selection-border, var(--xy-selection-border-default));\n}\n.react-flow__resize-control {\n  position: absolute;\n}\n.react-flow__resize-control.left,\n.react-flow__resize-control.right {\n  cursor: ew-resize;\n}\n.react-flow__resize-control.top,\n.react-flow__resize-control.bottom {\n  cursor: ns-resize;\n}\n.react-flow__resize-control.top.left,\n.react-flow__resize-control.bottom.right {\n  cursor: nwse-resize;\n}\n.react-flow__resize-control.bottom.left,\n.react-flow__resize-control.top.right {\n  cursor: nesw-resize;\n}\n/* handle styles */\n.react-flow__resize-control.handle {\n  width: 4px;\n  height: 4px;\n  border: 1px solid #fff;\n  border-radius: 1px;\n  background-color: var(--xy-resize-background-color, var(--xy-resize-background-color-default));\n  transform: translate(-50%, -50%);\n}\n.react-flow__resize-control.handle.left {\n  left: 0;\n  top: 50%;\n}\n.react-flow__resize-control.handle.right {\n  left: 100%;\n  top: 50%;\n}\n.react-flow__resize-control.handle.top {\n  left: 50%;\n  top: 0;\n}\n.react-flow__resize-control.handle.bottom {\n  left: 50%;\n  top: 100%;\n}\n.react-flow__resize-control.handle.top.left {\n  left: 0;\n}\n.react-flow__resize-control.handle.bottom.left {\n  left: 0;\n}\n.react-flow__resize-control.handle.top.right {\n  left: 100%;\n}\n.react-flow__resize-control.handle.bottom.right {\n  left: 100%;\n}\n/* line styles */\n.react-flow__resize-control.line {\n  border-color: var(--xy-resize-background-color, var(--xy-resize-background-color-default));\n  border-width: 0;\n  border-style: solid;\n}\n.react-flow__resize-control.line.left,\n.react-flow__resize-control.line.right {\n  width: 1px;\n  transform: translate(-50%, 0);\n  top: 0;\n  height: 100%;\n}\n.react-flow__resize-control.line.left {\n  left: 0;\n  border-left-width: 1px;\n}\n.react-flow__resize-control.line.right {\n  left: 100%;\n  border-right-width: 1px;\n}\n.react-flow__resize-control.line.top,\n.react-flow__resize-control.line.bottom {\n  height: 1px;\n  transform: translate(0, -50%);\n  left: 0;\n  width: 100%;\n}\n.react-flow__resize-control.line.top {\n  top: 0;\n  border-top-width: 1px;\n}\n.react-flow__resize-control.line.bottom {\n  border-bottom-width: 1px;\n  top: 100%;\n}\n";
styleInject(css_248z$1);

var css_248z = ".react-flow__handle {\n    top: auto;\n    width: 24px;\n    height: 20px;\n    transform: none;\n    background-color: transparent;\n}\n\n.react-flow__handle-left {\n    left: -12px;\n}\n\n.react-flow__handle-right {\n    right: -10px;\n}\n\n.react-flow__panel.center {\n    top: auto;\n    left: auto;\n    transform: auto;\n    margin: 0px;\n}\n\n.react-flow__node {\n    border: solid 2px #00000000;\n}\n\n.react-flow__node.selectable:focus {\n    box-shadow: 0px 0px 10px gray;\n    border-radius: 15px\n}\n\n.react-flow__handle.valid svg {\n    fill: #32ff7e;\n}";
styleInject(css_248z);

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded$1t = ["color"];
var Crosshair1Icon = /*#__PURE__*/forwardRef(function (_ref, forwardedRef) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'currentColor' : _ref$color,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$1t);

  return createElement("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props, {
    ref: forwardedRef
  }), createElement("path", {
    d: "M0.877075 7.50207C0.877075 3.84319 3.84319 0.877075 7.50208 0.877075C11.1609 0.877075 14.1271 3.84319 14.1271 7.50207C14.1271 11.1609 11.1609 14.1271 7.50208 14.1271C3.84319 14.1271 0.877075 11.1609 0.877075 7.50207ZM1.84898 7.00003C2.0886 4.26639 4.26639 2.0886 7.00003 1.84898V4.50003C7.00003 4.77617 7.22388 5.00003 7.50003 5.00003C7.77617 5.00003 8.00003 4.77617 8.00003 4.50003V1.84862C10.7356 2.08643 12.9154 4.26502 13.1552 7.00003H10.5C10.2239 7.00003 10 7.22388 10 7.50003C10 7.77617 10.2239 8.00003 10.5 8.00003H13.1555C12.9176 10.7369 10.7369 12.9176 8.00003 13.1555V10.5C8.00003 10.2239 7.77617 10 7.50003 10C7.22388 10 7.00003 10.2239 7.00003 10.5V13.1552C4.26502 12.9154 2.08643 10.7356 1.84862 8.00003H4.50003C4.77617 8.00003 5.00003 7.77617 5.00003 7.50003C5.00003 7.22388 4.77617 7.00003 4.50003 7.00003H1.84898Z",
    fill: color,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});

var _excluded$37 = ["color"];
var MinusIcon = /*#__PURE__*/forwardRef(function (_ref, forwardedRef) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'currentColor' : _ref$color,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$37);

  return createElement("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props, {
    ref: forwardedRef
  }), createElement("path", {
    d: "M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z",
    fill: color,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});

var _excluded$3x = ["color"];
var PlusIcon = /*#__PURE__*/forwardRef(function (_ref, forwardedRef) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'currentColor' : _ref$color,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$3x);

  return createElement("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props, {
    ref: forwardedRef
  }), createElement("path", {
    d: "M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z",
    fill: color,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});

function ControlButtons(props) {
    function fitView() {
        props.rf.fitView({ padding: 0.5 });
    }
    var buttonClassNames = "!w-10 !h-10 border-black border-2 rounded-lg m-0.5 hover:bg-black hover:text-white";
    var svgClassNames = "!max-w-none !max-h-none h-full";
    return jsxs(Controls, __assign({ showZoom: false, showInteractive: false, showFitView: false, position: "bottom-right" }, { children: [jsx(ControlButton, __assign({ className: buttonClassNames, onClick: function () { return props.rf.zoomIn(); } }, { children: jsx(PlusIcon, { className: svgClassNames }) })), jsx(ControlButton, __assign({ className: buttonClassNames, onClick: function () { return props.rf.zoomOut(); } }, { children: jsx(MinusIcon, { className: svgClassNames }) })), jsx(ControlButton, __assign({ className: buttonClassNames, onClick: function () { return fitView(); } }, { children: jsx(Crosshair1Icon, { className: svgClassNames }) }))] }));
}

function hasTargetHandle(e, handleId) {
    if (e.targetHandle) {
        return e.targetHandle === handleId;
    }
    else {
        return false;
    }
}
function init(rf) {
    var _a;
    var rect = (_a = document.getElementById("root")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    var positionX = rect.width * 4 / 5;
    var positionY = rect.height / 2;
    var rfPosition = rf.screenToFlowPosition({ x: positionX, y: positionY });
    var currentZoom = rf.getZoom();
    rf.setViewport({ x: rfPosition.x, y: rfPosition.y, zoom: currentZoom });
}

function onlyContainsValidConnections(edges) {
    return edges.every(function (edge) { return !edge.animated; });
}
function getNumberOfInputTerms(gadget) {
    var inputTerms = Array.from(gadget.terms.keys()).filter(function (pos) { return isInputPosition(pos); });
    return inputTerms.length;
}
function useCompletionCheck(props) {
    var _a = useReactFlow(), getNode = _a.getNode, getEdges = _a.getEdges;
    useEffect(function () {
        function hasUnconnectedInputHandle(node) {
            var edges = getEdges();
            var incomingEdges = edges.filter(function (edge) { return edge.target === node.id; });
            var numberOfInputTerms = getNumberOfInputTerms(node.data);
            return numberOfInputTerms !== incomingEdges.length;
        }
        function isCompleted() {
            var e_1, _a;
            var goalNode = getNode("goal_gadget");
            var observedComponent = [];
            var currentLayer = [goalNode];
            while (true) {
                try {
                    for (var currentLayer_1 = (e_1 = void 0, __values(currentLayer)), currentLayer_1_1 = currentLayer_1.next(); !currentLayer_1_1.done; currentLayer_1_1 = currentLayer_1.next()) {
                        var node = currentLayer_1_1.value;
                        if (hasUnconnectedInputHandle(node)) {
                            return false;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (currentLayer_1_1 && !currentLayer_1_1.done && (_a = currentLayer_1.return)) _a.call(currentLayer_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                observedComponent = observedComponent.concat(currentLayer);
                var nextLayer = currentLayer.map(function (node) { return getIncomers(node, props.nodes, props.edges); }).flat();
                if (nextLayer.length === 0) {
                    break;
                }
                else {
                    currentLayer = nextLayer;
                }
            }
            var edgesInComponent = getConnectedEdges(observedComponent, props.edges);
            return onlyContainsValidConnections(edgesInComponent);
        }
        if (isCompleted()) {
            props.setProblemSolved();
        }
    }, [getNode, props]);
}

var MIN_DISTANCE = 60;
function distance(a, b) {
    return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2));
}
var dummyConnection = { source: { nodeId: "", handleId: "", isSource: false }, target: { nodeId: "", handleId: "", isSource: false } };
function useProximityConnect(rf, isValidConnection, savelyAddEdge) {
    var getHandles = useCallback(function (node) {
        var e_1, _a;
        var gadgetProps = node.data;
        var handleInfos = [];
        try {
            for (var _b = __values(gadgetProps.terms), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), position = _d[0], term = _d[1];
                var handleId = getHandleId(position, gadgetProps.id);
                handleInfos.push({ nodeId: node.id, handleId: handleId, isSource: isOutputPosition(position) });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return handleInfos;
    }, []);
    var getHandlePosition = useCallback(function (handleId) {
        var handle = document.querySelector("[data-handleid=\"".concat(handleId, "\"]"));
        if (handle) {
            var positionOnScreen = getCenter(handle.getBoundingClientRect());
            return rf.screenToFlowPosition(positionOnScreen);
        }
        else {
            throw Error("Trying to access handle which doesn't exist:" + handleId);
        }
    }, []);
    var getHandlesWithPositions = useCallback(function (node) {
        var handles = getHandles(node);
        var handlesWithPositions = handles.flatMap(function (handle) {
            var position = getHandlePosition(handle.handleId);
            if (position !== null) {
                return { handle: handle, position: position };
            }
            else {
                return [];
            }
        });
        return handlesWithPositions;
    }, []);
    var getHandlesWithPositionExcludingNode = useCallback(function (ignoreNode) {
        var allNodes = rf.getNodes();
        var nodesWithoutSelf = allNodes.filter(function (node) { return node.id !== ignoreNode; });
        var allHandlesWithPositions = nodesWithoutSelf.map(getHandlesWithPositions).flat();
        return allHandlesWithPositions;
    }, []);
    var _a = __read(useState(""), 2), connectingSourceHandle = _a[0], setConnectingSourceHandle = _a[1];
    var _b = __read(useState(""), 2), connectingTargetHandle = _b[0], setConnectingTargetHandle = _b[1];
    function makeConnectionInfo(handle1, handle2) {
        if (handle1.isSource) {
            if (!handle2.isSource) {
                return {
                    source: handle1,
                    target: handle2
                };
            }
        }
        if (handle2.isSource) {
            if (!handle1.isSource) {
                return {
                    source: handle2,
                    target: handle1
                };
            }
        }
        return null;
    }
    function connectionFromConnectionInfo(connectionInfo) {
        return {
            source: connectionInfo.source.nodeId,
            target: connectionInfo.target.nodeId,
            sourceHandle: connectionInfo.source.handleId,
            targetHandle: connectionInfo.target.handleId
        };
    }
    var getCandidateProximityConnections = useCallback(function (handle) {
        var otherHandles = getHandlesWithPositionExcludingNode(handle.nodeId);
        var candidateConnections = otherHandles.flatMap(function (otherHandle) {
            var connection = makeConnectionInfo(handle, otherHandle.handle);
            if (connection) {
                return [connection];
            }
            else {
                return [];
            }
        });
        var validConnections = candidateConnections.filter(function (connection) { return isValidConnection(connectionFromConnectionInfo(connection)); });
        var connectionsWithDistances = validConnections.map(function (connection) {
            var sourcePosition = getHandlePosition(connection.source.handleId);
            var targetPosition = getHandlePosition(connection.target.handleId);
            var d = distance(sourcePosition, targetPosition);
            return { connection: connection, distance: d };
        });
        return connectionsWithDistances;
    }, []);
    var getProximityConnection = useCallback(function (node) {
        var handles = getHandles(node);
        var allCandidateConnections = handles.flatMap(function (handle) { return getCandidateProximityConnections(handle); });
        var minimalDistanceConnection = allCandidateConnections.reduce(function (acc, connectionWithDistance) {
            if (connectionWithDistance.distance < acc.distance) {
                return connectionWithDistance;
            }
            else {
                return acc;
            }
        }, { connection: dummyConnection, distance: Infinity });
        if (minimalDistanceConnection.distance < MIN_DISTANCE) {
            return minimalDistanceConnection.connection;
        }
        else {
            return null;
        }
    }, []);
    var onNodeDrag = useCallback(function (event, node) {
        var proximityConnection = getProximityConnection(node);
        if (proximityConnection) {
            setConnectingSourceHandle(proximityConnection.source.handleId);
            setConnectingTargetHandle(proximityConnection.target.handleId);
        }
        else {
            setConnectingSourceHandle("");
            setConnectingTargetHandle("");
        }
    }, []);
    var highlightHandle = useCallback(function (handleId) {
        var handle = document.querySelector("[data-handleid=\"".concat(handleId, "\"]"));
        if (handle) {
            handle.children[0].classList.remove("fill-white");
            handle.children[0].classList.add("fill-green");
        }
    }, []);
    useEffect(function () {
        document.querySelectorAll("[data-handleid]").forEach(function (handle) {
            handle.children[0].classList.remove("fill-green");
            handle.children[0].classList.add("fill-white");
        });
        highlightHandle(connectingSourceHandle);
        highlightHandle(connectingTargetHandle);
    }, [connectingSourceHandle, connectingTargetHandle]);
    var onNodeDragStop = useCallback(function (event, node) {
        var proximityConnection = getProximityConnection(node);
        if (proximityConnection) {
            savelyAddEdge(connectionFromConnectionInfo(proximityConnection));
        }
        setConnectingSourceHandle("");
        setConnectingTargetHandle("");
    }, []);
    return [onNodeDrag, onNodeDragStop];
}

var HANDLE_BROKEN_CLASSES = ["animate-stroke-animation"];

function isGoal(statement) {
    return "goal" in statement;
}
function isAxiom(statement) {
    return "axiom" in statement;
}
function labelledInitialDiagramGadgetToInitialDiagramGadget(gadget) {
    return {
        statement: gadget.statement,
        position: gadget.position
    };
}
function getDiagramGadgetMap(diagrams) {
    if (diagrams instanceof Map) {
        return diagrams;
    }
    else {
        return new Map(diagrams.map(function (gadget) { return [gadget.id, labelledInitialDiagramGadgetToInitialDiagramGadget(gadget)]; }));
    }
}
function getEquationFromInitialConnection(connection, initialDiagram) {
    try {
        var sourceGadget = getDiagramGadgetMap(initialDiagram.gadgets).get(connection.from);
        var targetGadget = getDiagramGadgetMap(initialDiagram.gadgets).get(connection.to[0]);
        if (isGoal(sourceGadget.statement)) {
            throw new Error("Invalid connection in initial diagram: goal gadget cannot be a source.");
        }
        var sourceTerm = sourceGadget.statement.axiom.conclusion;
        var targetTerm = isGoal(targetGadget.statement) ? targetGadget.statement.goal : targetGadget.statement.axiom.hypotheses[connection.to[1]];
        return [makeTermWithFreshVariables(sourceTerm, connection.from), makeTermWithFreshVariables(targetTerm, connection.to[0])];
    }
    catch (error) {
        throw new Error("Invalid connection in initial diagram: possibly gadget ".concat(connection.from, " or ").concat(connection.to, " is missing in the diagram."));
    }
}

var nodeTypes = { 'gadgetNode': GadgetFlowNode };
var edgeTypes = { 'edgeWithEquation': CustomEdge };
var nodesLengthSelector = function (state) {
    return Array.from(state.nodeLookup.values()).length || 0;
};
function containsPoint(rect, point) {
    return rect.left <= point.x && point.x <= rect.right && rect.top <= point.y && point.y <= rect.bottom;
}
function isAbovePalette(position) {
    var paletteElement = document.getElementById("gadget_palette");
    var paletteRect = paletteElement === null || paletteElement === void 0 ? void 0 : paletteElement.getBoundingClientRect();
    return containsPoint(paletteRect, position);
}
function getGadgetProps(id, gadget) {
    if (isAxiom(gadget.statement)) {
        return axiomToGadget(gadget.statement.axiom, id);
    }
    else {
        return {
            id: id,
            terms: new Map([[0, gadget.statement.goal]]),
            isAxiom: false,
            displayHoleFocus: true
        };
    }
}
function getGadgetNode(id, gadget) {
    return {
        id: id,
        type: 'gadgetNode',
        position: gadget.position,
        deletable: id !== "goal_gadget",
        data: getGadgetProps(id, gadget)
    };
}
function Diagram(props) {
    var initialGadgetsArray = Array.from(getDiagramGadgetMap(props.initData.initialDiagram.gadgets));
    var initialNodes = initialGadgetsArray.map(function (_a) {
        var _b = __read(_a, 2), gadgetId = _b[0], gadget = _b[1];
        return getGadgetNode(gadgetId, gadget);
    });
    var getInitialEdge = useCallback(function (connection, label) {
        return {
            id: label,
            source: connection.from,
            sourceHandle: getHandleId(OUTPUT_POSITION, connection.from),
            target: connection.to[0],
            targetHandle: getHandleId(connection.to[1], connection.to[0]),
            type: 'edgeWithEquation',
            animated: true,
            data: { eq: getEquationId(connection.from, connection.to) }
        };
    }, []);
    var getInitialEdges = useCallback(function (initialDiagram) {
        return initialDiagram.connections.map(function (edge, idx) { return getInitialEdge(edge, "edge_".concat(idx)); });
    }, []);
    var initialEdges = getInitialEdges(props.initData.initialDiagram);
    var rf = useReactFlow();
    var _a = __read(useNodesState(initialNodes), 3), nodes = _a[0], setNodes = _a[1], onNodesChange = _a[2];
    var _b = __read(useEdgesState(initialEdges), 3), edges = _b[0], setEdges = _b[1], onEdgesChange = _b[2];
    var getNode = rf.getNode;
    var getNodes = rf.getNodes;
    var getEdges = rf.getEdges;
    var _c = __read(useIdGenerator("gadget_"), 1), generateGadgetId = _c[0];
    var dragStartInfo = useRef(undefined);
    var numberOfNodes = useStore(nodesLengthSelector);
    useEffect(function () {
        if (dragStartInfo.current !== undefined) {
            var nodeToBeDragged = document.querySelector("[data-id='".concat(dragStartInfo.current.id, "']"));
            nodeToBeDragged === null || nodeToBeDragged === void 0 ? void 0 : nodeToBeDragged.dispatchEvent(new MouseEvent("mousedown", {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: dragStartInfo.current.position.x,
                clientY: dragStartInfo.current.position.y,
            }));
        }
        dragStartInfo.current = undefined;
    }, [numberOfNodes]);
    useCompletionCheck({ setProblemSolved: props.setProblemSolved, nodes: nodes, edges: edges });
    var getConnectionInfo = useCallback(function (connection) {
        var fromGadget = connection.source;
        var toGadget = connection.target;
        var toNode = getNodePositionFromHandle(connection.targetHandle);
        return { from: fromGadget, to: [toGadget, toNode] };
    }, []);
    var deleteEquationsOfEdges = useCallback(function (edges) {
        edges.map(function (e) {
            var connectionInfo = getConnectionInfo(e);
            props.removeEquation(connectionInfo.from, connectionInfo.to);
        });
    }, [edges, props]);
    var getEquationFromConnection = useCallback(function (connection) {
        var sourceTerms = getNode(connection.source).data.terms;
        var targetTerms = getNode(connection.target).data.terms;
        var sourceTerm = getTermOfHandle(connection.sourceHandle, sourceTerms);
        var targetTerm = getTermOfHandle(connection.targetHandle, targetTerms);
        var equation = [sourceTerm, targetTerm];
        return equation;
    }, [getNode]);
    var doesNotCreateACycle = useCallback(function (connection) {
        var nodes = getNodes();
        var edges = getEdges();
        var target = nodes.find(function (node) { return node.id === connection.target; });
        var hasCycle = function (node, visited) {
            var e_1, _a;
            if (visited === void 0) { visited = new Set(); }
            if (visited.has(node.id))
                return false;
            visited.add(node.id);
            try {
                for (var _b = __values(getOutgoers(node, nodes, edges)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var outgoer = _c.value;
                    if (outgoer.id === connection.source)
                        return true;
                    if (hasCycle(outgoer, visited))
                        return true;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        if (target.id === connection.source)
            return false;
        return !hasCycle(target);
    }, [getNodes, getEdges]);
    var removeEdgesConnectedToHandle = useCallback(function (handleId) {
        var edges = getEdges();
        var edgesConnectedToThisHandle = edges.filter(function (e) { return hasTargetHandle(e, handleId); });
        deleteEquationsOfEdges(edgesConnectedToThisHandle);
        setEdges(function (edges) {
            return edges.filter(function (e) { return !hasTargetHandle(e, handleId); });
        });
    }, [getEdges, setEdges, props]);
    var savelyAddEdge = useCallback(function (connection) {
        removeEdgesConnectedToHandle(connection.targetHandle);
        var equation = getEquationFromConnection(connection);
        var connectionInfo = getConnectionInfo(connection);
        props.addEquation(connectionInfo.from, connectionInfo.to, equation);
        setEdges(function (edges) {
            return addEdge(__assign(__assign({}, connection), { type: 'edgeWithEquation', animated: true, data: { eq: getEquationId(connectionInfo.from, connectionInfo.to) } }), edges);
        });
    }, [props, setEdges, getEquationFromConnection]);
    function makeGadget(axiom, axiomPosition) {
        var id = generateGadgetId();
        var flowNode = {
            id: id,
            type: 'gadgetNode',
            position: rf.screenToFlowPosition(axiomPosition),
            dragging: true,
            deletable: true,
            data: axiomToGadget(axiom, id)
        };
        props.addGadget(id, axiom);
        setNodes(function (nodes) { return nodes.concat(flowNode); });
        dragStartInfo.current = { id: id, position: axiomPosition };
    }
    var paletteProps = {
        axioms: props.initData.axioms,
        makeGadget: makeGadget
    };
    var disableHoleFocus = useCallback(function () {
        setNodes(function (nodes) { return nodes.map(function (node) {
            return __assign(__assign({}, node), { data: __assign(__assign({}, node.data), { displayHoleFocus: false }) });
        }); });
    }, []);
    var onConnectStart = useCallback(function (event, params) {
        if (params.handleType === "target") {
            removeEdgesConnectedToHandle(params.handleId);
        }
        disableHoleFocus();
    }, [removeEdgesConnectedToHandle]);
    var enableHoleFocus = useCallback(function () {
        setNodes(function (nodes) { return nodes.map(function (node) {
            return __assign(__assign({}, node), { data: __assign(__assign({}, node.data), { displayHoleFocus: true }) });
        }); });
    }, []);
    var onConnect = useCallback(function (connection) {
        savelyAddEdge(connection);
        enableHoleFocus();
    }, []);
    var isInDiagram = useCallback(function (connection) {
        var edges = getEdges();
        return edges.some(function (edge) { return edge.sourceHandle === connection.sourceHandle && edge.targetHandle === connection.targetHandle; });
    }, [edges, getEquationFromConnection]);
    var isValidConnection = useCallback(function (connection) {
        var _a = __read(getEquationFromConnection(connection), 2), source = _a[0], target = _a[1];
        var arityOk = sameArity(source, target);
        var colorsOk = colorsMatch(source, target);
        var noCycle = doesNotCreateACycle(connection);
        var notYetAConection = !isInDiagram(connection);
        return colorsOk && arityOk && noCycle && notYetAConection;
    }, [getEquationFromConnection, getEdges, getNodes]);
    var isSatisfied = props.isSatisfied;
    var updateEdgeAnimation = useCallback(function () {
        function highlightHandle(handleId) {
            var _a;
            var handle = document.querySelector("[data-handleid=\"".concat(handleId, "\"]"));
            if (handle) {
                (_a = handle.children[0].classList).add.apply(_a, __spreadArray([], __read(HANDLE_BROKEN_CLASSES), false));
            }
        }
        document.querySelectorAll("[data-handleid]").forEach(function (handle) {
            var _a;
            (_a = handle.children[0].classList).remove.apply(_a, __spreadArray([], __read(HANDLE_BROKEN_CLASSES), false));
        });
        setEdges(function (edges) { return edges.map(function (edge) {
            var edgeIsSatisfied = isSatisfied.get(edge.data.eq);
            if (edgeIsSatisfied === undefined) {
                throw new Error("There is an edge in the diagram without a corresponding equation");
            }
            if (edgeIsSatisfied === false) {
                highlightHandle(edge.sourceHandle);
                highlightHandle(edge.targetHandle);
            }
            return __assign(__assign({}, edge), { animated: !edgeIsSatisfied });
        }); });
    }, [isSatisfied, setEdges]);
    useEffect(function () {
        updateEdgeAnimation();
    }, [isSatisfied, setEdges, setNodes]);
    var _d = __read(props.proximityConnectEnabled ?
        useProximityConnect(rf, isValidConnection, savelyAddEdge)
        : [function (e, n) { return void 0; }, function (e, n) { return void 0; }], 2), onNodeDrag = _d[0], onNodeDragStopProximityConnect = _d[1];
    var onNodeDragStop = useCallback(function (event, node) {
        if (isAbovePalette({ x: event.clientX, y: event.clientY })) {
            props.removeGadget(node.id);
            var edgesToBeDeleted = getEdges().filter(function (e) { return node.id === e.source || node.id === e.target; });
            deleteEquationsOfEdges(edgesToBeDeleted);
            setNodes(function (nodes) { return nodes.filter(function (n) { return n.id !== node.id || n.deletable === false; }); });
            setEdges(function (edges) { return edges.filter(function (e) { return node.id !== e.source && node.id !== e.target; }); });
        }
        else {
            onNodeDragStopProximityConnect(event, node);
        }
    }, []);
    var onEdgesDelete = useCallback(function (edges) {
        deleteEquationsOfEdges(edges);
    }, []);
    var onNodesDelete = useCallback(function (nodes) {
        nodes.map(function (node) { return props.removeGadget(node.id); });
    }, []);
    return jsxs(Fragment, { children: [jsx(GadgetPalette, __assign({}, paletteProps)), jsx(index, { nodes: nodes, edges: edges, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, onConnect: onConnect, onEdgesDelete: onEdgesDelete, onNodesDelete: onNodesDelete, edgeTypes: edgeTypes, nodeTypes: nodeTypes, onInit: function () { return init(rf); }, onConnectStart: onConnectStart, isValidConnection: isValidConnection, minZoom: 0.1, onNodeDrag: onNodeDrag, onNodeDragStop: onNodeDragStop, nodeOrigin: [0.5, 0.5] }), jsx(ControlButtons, { rf: rf })] });
}

function unifyVariable(currentAssignment, v, term) {
    if (currentAssignment.isAssigned(v)) {
        var value = currentAssignment.getAssignedValue(v);
        return unifyEquation(currentAssignment, [value, term]);
    }
    else {
        if (termHasVariable(term, v)) {
            if ("variable" in term) {
                return true;
            }
            else {
                return false;
            }
        }
        currentAssignment.assign(v, term);
        return true;
    }
}
function unifyVariables(currentAssignment, v1, v2) {
    if (currentAssignment.isAssigned(v1)) {
        var v1Value = currentAssignment.getAssignedValue(v1);
        if (currentAssignment.isAssigned(v2)) {
            var v2Value = currentAssignment.getAssignedValue(v2);
            return unifyEquation(currentAssignment, [v1Value, v2Value]);
        }
        else {
            return unifyEquation(currentAssignment, [v1Value, { variable: v2 }]);
        }
    }
    else {
        if (currentAssignment.isAssigned(v2)) {
            var v2Value = currentAssignment.getAssignedValue(v2);
            return unifyEquation(currentAssignment, [{ variable: v1 }, v2Value]);
        }
        else {
            currentAssignment.unite(v1, v2);
            return true;
        }
    }
}
function unifyEquation(currentAssignment, equation) {
    var _a = __read(equation, 2), lhs = _a[0], rhs = _a[1];
    if ("variable" in lhs) {
        if ("variable" in rhs) {
            return unifyVariables(currentAssignment, lhs.variable, rhs.variable);
        }
        else {
            return unifyVariable(currentAssignment, lhs.variable, rhs);
        }
    }
    else {
        if ("variable" in rhs) {
            return unifyVariable(currentAssignment, rhs.variable, lhs);
        }
        else {
            if (lhs.label !== rhs.label) {
                return false;
            }
            if (lhs.args.length !== rhs.args.length) {
                return false;
            }
            var unifiedSuccessfully = [];
            for (var i = 0; i < lhs.args.length; i++) {
                var lhsArg = lhs.args[i];
                var rhsArg = rhs.args[i];
                unifiedSuccessfully.push(unifyEquation(currentAssignment, [lhsArg, rhsArg]));
            }
            return (!unifiedSuccessfully.includes(false));
        }
    }
}
function unifyEquations(equations) {
    var equationIsSatisfied = new Map();
    var assignment = new DisjointSetWithAssignment();
    equations.forEach(function (equation, key) {
        var unifiedSuccessfully = unifyEquation(assignment, equation);
        equationIsSatisfied.set(key, unifiedSuccessfully);
    });
    return { assignment: assignment, equationIsSatisfied: equationIsSatisfied };
}

function isConstant(t) {
    return "label" in t && t.args.length === 0;
}
function isNumericalConstant(t) {
    if ("variable" in t) {
        return undefined;
    }
    else {
        if (isNaN(Number(t.label)) || t.args.length > 0) {
            return undefined;
        }
        else {
            return Number(t.label);
        }
    }
}
function getNumericalConstantsInTerm(t) {
    var n = isNumericalConstant(t);
    if (n === undefined) {
        if ("variable" in t) {
            return [];
        }
        else {
            return t.args.flatMap(getNumericalConstantsInTerm);
        }
    }
    else {
        return [n];
    }
}
function getNumericalConstantsInAxiom(axiom) {
    return axiom.hypotheses.flatMap(getNumericalConstantsInTerm)
        .concat(getNumericalConstantsInTerm(axiom.conclusion));
}
function getNumericalConstantsInInitializationData(initData) {
    var initialDiagramGadgets = Array.from(getDiagramGadgetMap(initData.initialDiagram.gadgets).values());
    var initialDiagramStatements = initialDiagramGadgets.map(function (gadget) { return gadget.statement; });
    var numericalConstantsInInitialDiagram = initialDiagramStatements.flatMap(function (statement) {
        if (isGoal(statement)) {
            return getNumericalConstantsInTerm(statement.goal);
        }
        else {
            return getNumericalConstantsInAxiom(statement.axiom);
        }
    });
    var numericalConstantsInAxioms = initData.axioms.flatMap(getNumericalConstantsInAxiom);
    return numericalConstantsInAxioms.concat(numericalConstantsInInitialDiagram);
}
function getMaximumNumberInGameData(data: InitializationData) {
    return 1 + Math.max.apply(Math, __spreadArray([], __read(getNumericalConstantsInInitializationData(data)), false));
}
function renameVariablesToEmptyString(t) {
    var assignment = new DisjointSetWithAssignment();
    getVariableSet(t).forEach(function (variable) {
        return assignment.assign(variable, { variable: "" });
    });
    return substitute(t, assignment);
}
function assignTermRecursively(t, assignment) {
    if ("variable" in t) {
        var assignedValue = assignment.getAssignedValue(t.variable);
        if (assignedValue) {
            if (termHasVariable(assignedValue, t.variable)) {
                return t;
            }
            else {
                return assignTermRecursively(assignedValue, assignment);
            }
        }
        else {
            return t;
        }
    }
    else {
        var argsAssigned = t.args.map(function (arg) { return assignTermRecursively(arg, assignment); });
        return { label: t.label, args: argsAssigned };
    }
}
function removeConstants(terms) {
    return terms.filter(function (term) { return !isConstant(term); });
}
var TermEnumerator = /** @class */ (function () {
    function TermEnumerator(offset) {
        this.offset = offset;
        this.enumeration = new Map();
    }
    TermEnumerator.prototype.getIdentifier = function (t) {
        var term = renameVariablesToEmptyString(t);
        var identifier = hashTerm(term);
        return identifier;
    };
    TermEnumerator.prototype.insert = function (t, value) {
        var identifier = this.getIdentifier(t);
        this.enumeration.set(identifier, value);
    };
    TermEnumerator.prototype.isEnumerated = function (t) {
        var identifier = this.getIdentifier(t);
        return this.enumeration.has(identifier);
    };
    TermEnumerator.prototype.getNumber = function (t) {
        var identifier = this.getIdentifier(t);
        return this.enumeration.get(identifier);
    };
    TermEnumerator.prototype.getNextFreeHoleValue = function () {
        var assignedValuesSet = new Set(this.enumeration.values());
        for (var i = this.offset;; i++) {
            if (!assignedValuesSet.has(i)) {
                return i;
            }
        }
    };
    TermEnumerator.prototype.removeSuperfluousTerms = function (terms) {
        var e_1, _a;
        var identifiers = terms.map(this.getIdentifier);
        try {
            for (var _b = __values(this.enumeration.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var identifier = _c.value;
                if (!identifiers.includes(identifier)) {
                    this.enumeration.delete(identifier);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    TermEnumerator.prototype.enumerateTerms = function (terms) {
        var e_2, _a;
        try {
            for (var terms_1 = __values(terms), terms_1_1 = terms_1.next(); !terms_1_1.done; terms_1_1 = terms_1.next()) {
                var term = terms_1_1.value;
                var value = this.getNextFreeHoleValue();
                this.insert(term, value);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (terms_1_1 && !terms_1_1.done && (_a = terms_1.return)) _a.call(terms_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    TermEnumerator.prototype.enumerateNewTerms = function (terms) {
        var _this = this;
        var newTerms = terms.filter(function (term) { return !_this.isEnumerated(term); });
        this.enumerateTerms(newTerms);
    };
    TermEnumerator.prototype.updateEnumeration = function (termAssignment) {
        var termsInAssignment = termAssignment.getAssignedValues();
        var termsWithoutConstants = removeConstants(termsInAssignment);
        var fullyAssignedTerms = termsWithoutConstants.map(function (term) {
            return assignTermRecursively(term, termAssignment);
        });
        this.removeSuperfluousTerms(fullyAssignedTerms);
        this.enumerateNewTerms(fullyAssignedTerms);
    };
    TermEnumerator.prototype.toHoleValue = function (t, termAssignment) {
        var fullyAssignedTerm = assignTermRecursively(t, termAssignment);
        if ("variable" in fullyAssignedTerm) {
            throw Error("Cannot get hole value for a variable" + fullyAssignedTerm);
        }
        else {
            if (fullyAssignedTerm.args.length === 0) {
                return fullyAssignedTerm.label;
            }
            else {
                var value = this.getNumber(fullyAssignedTerm);
                if (value) {
                    return value.toString();
                }
                else {
                    return "?";
                }
            }
        }
    };
    TermEnumerator.prototype.getHoleValueAssignment = function (termAssignment) {
        var _this = this;
        return (function (t) {
            if ("variable" in t) {
                var term = termAssignment.getAssignedValue(t.variable);
                if (term) {
                    return _this.toHoleValue(term, termAssignment);
                }
                else {
                    return "";
                }
            }
            else {
                return _this.toHoleValue(t, termAssignment);
            }
        });
    };
    return TermEnumerator;
}());

var GameHistory = /** @class */ (function () {
    function GameHistory(problemId) {
        this.completed = false;
        this.startTime = new Date();
        this.log = [];
        this.problemId = problemId;
    }
    GameHistory.prototype.logEvent = function (event) {
        this.log.push([event, new Date()]);
    };
    return GameHistory;
}());

var eo=Object.create;var Ie=Object.defineProperty;var to=Object.getOwnPropertyDescriptor;var ro=Object.getOwnPropertyNames;var no=Object.getPrototypeOf,io=Object.prototype.hasOwnProperty;var so=(r,e,t)=>e in r?Ie(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):
r[e]=t;var a=(r,e)=>Ie(r,"name",{value:e,configurable:!0});var z=(r,e)=>()=>(r&&(e=r(r=0)),e);var T=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),ie=(r,e)=>{for(var t in e)
Ie(r,t,{get:e[t],enumerable:!0});},An=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e==
"function")for(let i of ro(e))!io.call(r,i)&&i!==t&&Ie(r,i,{get:()=>e[i],enumerable:!(n=
to(e,i))||n.enumerable});return r};var Qe=(r,e,t)=>(t=r!=null?eo(no(r)):{},An(e||!r||!r.__esModule?Ie(t,"default",{
value:r,enumerable:!0}):t,r)),N=r=>An(Ie({},"__esModule",{value:!0}),r);var _=(r,e,t)=>so(r,typeof e!="symbol"?e+"":e,t);var Tn=T(nt=>{p();nt.byteLength=ao;nt.toByteArray=co;nt.fromByteArray=
fo;var ae=[],te=[],oo=typeof Uint8Array<"u"?Uint8Array:Array,It="ABCDEFGHIJKLMNO\
PQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(Ee=0,Cn=It.length;Ee<Cn;++Ee)
ae[Ee]=It[Ee],te[It.charCodeAt(Ee)]=Ee;var Ee,Cn;te[45]=62;te[95]=63;function In(r){
var e=r.length;if(e%4>0)throw new Error("Invalid string. Length must be a multip\
le of 4");var t=r.indexOf("=");t===-1&&(t=e);var n=t===e?0:4-t%4;return [t,n]}a(In,
"getLens");function ao(r){var e=In(r),t=e[0],n=e[1];return (t+n)*3/4-n}a(ao,"byte\
Length");function uo(r,e,t){return (e+t)*3/4-t}a(uo,"_byteLength");function co(r){
var e,t=In(r),n=t[0],i=t[1],s=new oo(uo(r,n,i)),o=0,u=i>0?n-4:n,c;for(c=0;c<u;c+=
4)e=te[r.charCodeAt(c)]<<18|te[r.charCodeAt(c+1)]<<12|te[r.charCodeAt(c+2)]<<6|te[r.
charCodeAt(c+3)],s[o++]=e>>16&255,s[o++]=e>>8&255,s[o++]=e&255;return i===2&&(e=
te[r.charCodeAt(c)]<<2|te[r.charCodeAt(c+1)]>>4,s[o++]=e&255),i===1&&(e=te[r.charCodeAt(
c)]<<10|te[r.charCodeAt(c+1)]<<4|te[r.charCodeAt(c+2)]>>2,s[o++]=e>>8&255,s[o++]=
e&255),s}a(co,"toByteArray");function ho(r){return ae[r>>18&63]+ae[r>>12&63]+ae[r>>
6&63]+ae[r&63]}a(ho,"tripletToBase64");function lo(r,e,t){for(var n,i=[],s=e;s<t;s+=
3)n=(r[s]<<16&16711680)+(r[s+1]<<8&65280)+(r[s+2]&255),i.push(ho(n));return i.join(
"")}a(lo,"encodeChunk");function fo(r){for(var e,t=r.length,n=t%3,i=[],s=16383,o=0,
u=t-n;o<u;o+=s)i.push(lo(r,o,o+s>u?u:o+s));return n===1?(e=r[t-1],i.push(ae[e>>2]+
ae[e<<4&63]+"==")):n===2&&(e=(r[t-2]<<8)+r[t-1],i.push(ae[e>>10]+ae[e>>4&63]+ae[e<<
2&63]+"=")),i.join("")}a(fo,"fromByteArray");});var Pn=T(Tt=>{p();Tt.read=function(r,e,t,n,i){var s,o,u=i*8-n-1,c=(1<<u)-1,h=c>>
1,l=-7,y=t?i-1:0,x=t?-1:1,C=r[e+y];for(y+=x,s=C&(1<<-l)-1,C>>=-l,l+=u;l>0;s=s*256+
r[e+y],y+=x,l-=8);for(o=s&(1<<-l)-1,s>>=-l,l+=n;l>0;o=o*256+r[e+y],y+=x,l-=8);if(s===
0)s=1-h;else {if(s===c)return o?NaN:(C?-1:1)*(1/0);o=o+Math.pow(2,n),s=s-h;}return (C?
-1:1)*o*Math.pow(2,s-n)};Tt.write=function(r,e,t,n,i,s){var o,u,c,h=s*8-i-1,l=(1<<
h)-1,y=l>>1,x=i===23?Math.pow(2,-24)-Math.pow(2,-77):0,C=n?0:s-1,B=n?1:-1,W=e<0||
e===0&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(u=isNaN(e)?1:0,o=l):(o=Math.
floor(Math.log(e)/Math.LN2),e*(c=Math.pow(2,-o))<1&&(o--,c*=2),o+y>=1?e+=x/c:e+=
x*Math.pow(2,1-y),e*c>=2&&(o++,c/=2),o+y>=l?(u=0,o=l):o+y>=1?(u=(e*c-1)*Math.pow(
2,i),o=o+y):(u=e*Math.pow(2,y-1)*Math.pow(2,i),o=0));i>=8;r[t+C]=u&255,C+=B,u/=256,
i-=8);for(o=o<<i|u,h+=i;h>0;r[t+C]=o&255,C+=B,o/=256,h-=8);r[t+C-B]|=W*128;};});var $n=T(Le=>{p();var Pt=Tn(),Pe=Pn(),Bn=typeof Symbol=="function"&&
typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;Le.Buffer=
f;Le.SlowBuffer=bo;Le.INSPECT_MAX_BYTES=50;var it=2147483647;Le.kMaxLength=it;f.
TYPED_ARRAY_SUPPORT=po();!f.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.
error=="function"&&console.error("This browser lacks typed array (Uint8Array) su\
pport which is required by `buffer` v5.x. Use `buffer` v4.x if you require old b\
rowser support.");function po(){try{let r=new Uint8Array(1),e={foo:a(function(){
return 42},"foo")};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(
r,e),r.foo()===42}catch{return !1}}a(po,"typedArraySupport");Object.defineProperty(
f.prototype,"parent",{enumerable:!0,get:a(function(){if(f.isBuffer(this))return this.
buffer},"get")});Object.defineProperty(f.prototype,"offset",{enumerable:!0,get:a(
function(){if(f.isBuffer(this))return this.byteOffset},"get")});function fe(r){if(r>
it)throw new RangeError('The value "'+r+'" is invalid for option "size"');let e=new Uint8Array(
r);return Object.setPrototypeOf(e,f.prototype),e}a(fe,"createBuffer");function f(r,e,t){
if(typeof r=="number"){if(typeof e=="string")throw new TypeError('The "string" a\
rgument must be of type string. Received type number');return Ft(r)}return Mn(r,
e,t)}a(f,"Buffer");f.poolSize=8192;function Mn(r,e,t){if(typeof r=="string")return mo(
r,e);if(ArrayBuffer.isView(r))return go(r);if(r==null)throw new TypeError("The f\
irst argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-l\
ike Object. Received type "+typeof r);if(ue(r,ArrayBuffer)||r&&ue(r.buffer,ArrayBuffer)||
typeof SharedArrayBuffer<"u"&&(ue(r,SharedArrayBuffer)||r&&ue(r.buffer,SharedArrayBuffer)))
return Lt(r,e,t);if(typeof r=="number")throw new TypeError('The "value" argument\
 must not be of type number. Received type number');let n=r.valueOf&&r.valueOf();
if(n!=null&&n!==r)return f.from(n,e,t);let i=wo(r);if(i)return i;if(typeof Symbol<
"u"&&Symbol.toPrimitive!=null&&typeof r[Symbol.toPrimitive]=="function")return f.
from(r[Symbol.toPrimitive]("string"),e,t);throw new TypeError("The first argumen\
t must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. \
Received type "+typeof r)}a(Mn,"from");f.from=function(r,e,t){return Mn(r,e,t)};
Object.setPrototypeOf(f.prototype,Uint8Array.prototype);Object.setPrototypeOf(f,
Uint8Array);function Dn(r){if(typeof r!="number")throw new TypeError('"size" arg\
ument must be of type number');if(r<0)throw new RangeError('The value "'+r+'" is\
 invalid for option "size"')}a(Dn,"assertSize");function yo(r,e,t){return Dn(r),
r<=0?fe(r):e!==void 0?typeof t=="string"?fe(r).fill(e,t):fe(r).fill(e):fe(r)}a(yo,
"alloc");f.alloc=function(r,e,t){return yo(r,e,t)};function Ft(r){return Dn(r),fe(
r<0?0:Mt(r)|0)}a(Ft,"allocUnsafe");f.allocUnsafe=function(r){return Ft(r)};f.allocUnsafeSlow=
function(r){return Ft(r)};function mo(r,e){if((typeof e!="string"||e==="")&&(e="\
utf8"),!f.isEncoding(e))throw new TypeError("Unknown encoding: "+e);let t=kn(r,e)|
0,n=fe(t),i=n.write(r,e);return i!==t&&(n=n.slice(0,i)),n}a(mo,"fromString");function Bt(r){
let e=r.length<0?0:Mt(r.length)|0,t=fe(e);for(let n=0;n<e;n+=1)t[n]=r[n]&255;return t}
a(Bt,"fromArrayLike");function go(r){if(ue(r,Uint8Array)){let e=new Uint8Array(r);
return Lt(e.buffer,e.byteOffset,e.byteLength)}return Bt(r)}a(go,"fromArrayView");
function Lt(r,e,t){if(e<0||r.byteLength<e)throw new RangeError('"offset" is outs\
ide of buffer bounds');if(r.byteLength<e+(t||0))throw new RangeError('"length" i\
s outside of buffer bounds');let n;return e===void 0&&t===void 0?n=new Uint8Array(
r):t===void 0?n=new Uint8Array(r,e):n=new Uint8Array(r,e,t),Object.setPrototypeOf(
n,f.prototype),n}a(Lt,"fromArrayBuffer");function wo(r){if(f.isBuffer(r)){let e=Mt(
r.length)|0,t=fe(e);return t.length===0||r.copy(t,0,0,e),t}if(r.length!==void 0)
return typeof r.length!="number"||kt(r.length)?fe(0):Bt(r);if(r.type==="Buffer"&&
Array.isArray(r.data))return Bt(r.data)}a(wo,"fromObject");function Mt(r){if(r>=
it)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+
it.toString(16)+" bytes");return r|0}a(Mt,"checked");function bo(r){return +r!=r&&
(r=0),f.alloc(+r)}a(bo,"SlowBuffer");f.isBuffer=a(function(e){return e!=null&&e.
_isBuffer===!0&&e!==f.prototype},"isBuffer");f.compare=a(function(e,t){if(ue(e,Uint8Array)&&
(e=f.from(e,e.offset,e.byteLength)),ue(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),
!f.isBuffer(e)||!f.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments\
 must be one of type Buffer or Uint8Array');if(e===t)return 0;let n=e.length,i=t.
length;for(let s=0,o=Math.min(n,i);s<o;++s)if(e[s]!==t[s]){n=e[s],i=t[s];break}return n<
i?-1:i<n?1:0},"compare");f.isEncoding=a(function(e){switch(String(e).toLowerCase()){case"\
hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"\
ucs2":case"ucs-2":case"utf16le":case"utf-16le":return !0;default:return !1}},"isEn\
coding");f.concat=a(function(e,t){if(!Array.isArray(e))throw new TypeError('"lis\
t" argument must be an Array of Buffers');if(e.length===0)return f.alloc(0);let n;
if(t===void 0)for(t=0,n=0;n<e.length;++n)t+=e[n].length;let i=f.allocUnsafe(t),s=0;
for(n=0;n<e.length;++n){let o=e[n];if(ue(o,Uint8Array))s+o.length>i.length?(f.isBuffer(
o)||(o=f.from(o)),o.copy(i,s)):Uint8Array.prototype.set.call(i,o,s);else if(f.isBuffer(
o))o.copy(i,s);else throw new TypeError('"list" argument must be an Array of Buf\
fers');s+=o.length;}return i},"concat");function kn(r,e){if(f.isBuffer(r))return r.
length;if(ArrayBuffer.isView(r)||ue(r,ArrayBuffer))return r.byteLength;if(typeof r!=
"string")throw new TypeError('The "string" argument must be one of type string, \
Buffer, or ArrayBuffer. Received type '+typeof r);let t=r.length,n=arguments.length>
2&&arguments[2]===!0;if(!n&&t===0)return 0;let i=!1;for(;;)switch(e){case"ascii":case"\
latin1":case"binary":return t;case"utf8":case"utf-8":return Rt(r).length;case"uc\
s2":case"ucs-2":case"utf16le":case"utf-16le":return t*2;case"hex":return t>>>1;case"\
base64":return Gn(r).length;default:if(i)return n?-1:Rt(r).length;e=(""+e).toLowerCase(),
i=!0;}}a(kn,"byteLength");f.byteLength=kn;function So(r,e,t){let n=!1;if((e===void 0||
e<0)&&(e=0),e>this.length||((t===void 0||t>this.length)&&(t=this.length),t<=0)||
(t>>>=0,e>>>=0,t<=e))return "";for(r||(r="utf8");;)switch(r){case"hex":return Bo(
this,e,t);case"utf8":case"utf-8":return On(this,e,t);case"ascii":return To(this,
e,t);case"latin1":case"binary":return Po(this,e,t);case"base64":return Co(this,e,
t);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Lo(this,e,t);default:
if(n)throw new TypeError("Unknown encoding: "+r);r=(r+"").toLowerCase(),n=!0;}}a(
So,"slowToString");f.prototype._isBuffer=!0;function _e(r,e,t){let n=r[e];r[e]=r[t],
r[t]=n;}a(_e,"swap");f.prototype.swap16=a(function(){let e=this.length;if(e%2!==0)
throw new RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<
e;t+=2)_e(this,t,t+1);return this},"swap16");f.prototype.swap32=a(function(){let e=this.
length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bit\
s");for(let t=0;t<e;t+=4)_e(this,t,t+3),_e(this,t+1,t+2);return this},"swap32");
f.prototype.swap64=a(function(){let e=this.length;if(e%8!==0)throw new RangeError(
"Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)_e(this,t,t+7),
_e(this,t+1,t+6),_e(this,t+2,t+5),_e(this,t+3,t+4);return this},"swap64");f.prototype.
toString=a(function(){let e=this.length;return e===0?"":arguments.length===0?On(
this,0,e):So.apply(this,arguments)},"toString");f.prototype.toLocaleString=f.prototype.
toString;f.prototype.equals=a(function(e){if(!f.isBuffer(e))throw new TypeError(
"Argument must be a Buffer");return this===e?!0:f.compare(this,e)===0},"equals");
f.prototype.inspect=a(function(){let e="",t=Le.INSPECT_MAX_BYTES;return e=this.toString(
"hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+
e+">"},"inspect");Bn&&(f.prototype[Bn]=f.prototype.inspect);f.prototype.compare=
a(function(e,t,n,i,s){if(ue(e,Uint8Array)&&(e=f.from(e,e.offset,e.byteLength)),!f.
isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffe\
r or Uint8Array. Received type '+typeof e);if(t===void 0&&(t=0),n===void 0&&(n=e?
e.length:0),i===void 0&&(i=0),s===void 0&&(s=this.length),t<0||n>e.length||i<0||
s>this.length)throw new RangeError("out of range index");if(i>=s&&t>=n)return 0;
if(i>=s)return -1;if(t>=n)return 1;if(t>>>=0,n>>>=0,i>>>=0,s>>>=0,this===e)return 0;
let o=s-i,u=n-t,c=Math.min(o,u),h=this.slice(i,s),l=e.slice(t,n);for(let y=0;y<c;++y)
if(h[y]!==l[y]){o=h[y],u=l[y];break}return o<u?-1:u<o?1:0},"compare");function Un(r,e,t,n,i){
if(r.length===0)return -1;if(typeof t=="string"?(n=t,t=0):t>2147483647?t=2147483647:
t<-2147483648&&(t=-2147483648),t=+t,kt(t)&&(t=i?0:r.length-1),t<0&&(t=r.length+t),
t>=r.length){if(i)return -1;t=r.length-1;}else if(t<0)if(i)t=0;else return -1;if(typeof e==
"string"&&(e=f.from(e,n)),f.isBuffer(e))return e.length===0?-1:Ln(r,e,t,n,i);if(typeof e==
"number")return e=e&255,typeof Uint8Array.prototype.indexOf=="function"?i?Uint8Array.
prototype.indexOf.call(r,e,t):Uint8Array.prototype.lastIndexOf.call(r,e,t):Ln(r,
[e],t,n,i);throw new TypeError("val must be string, number or Buffer")}a(Un,"bid\
irectionalIndexOf");function Ln(r,e,t,n,i){let s=1,o=r.length,u=e.length;if(n!==
void 0&&(n=String(n).toLowerCase(),n==="ucs2"||n==="ucs-2"||n==="utf16le"||n==="\
utf-16le")){if(r.length<2||e.length<2)return -1;s=2,o/=2,u/=2,t/=2;}function c(l,y){
return s===1?l[y]:l.readUInt16BE(y*s)}a(c,"read");let h;if(i){let l=-1;for(h=t;h<
o;h++)if(c(r,h)===c(e,l===-1?0:h-l)){if(l===-1&&(l=h),h-l+1===u)return l*s}else l!==
-1&&(h-=h-l),l=-1;}else for(t+u>o&&(t=o-u),h=t;h>=0;h--){let l=!0;for(let y=0;y<u;y++)
if(c(r,h+y)!==c(e,y)){l=!1;break}if(l)return h}return -1}a(Ln,"arrayIndexOf");f.prototype.
includes=a(function(e,t,n){return this.indexOf(e,t,n)!==-1},"includes");f.prototype.
indexOf=a(function(e,t,n){return Un(this,e,t,n,!0)},"indexOf");f.prototype.lastIndexOf=
a(function(e,t,n){return Un(this,e,t,n,!1)},"lastIndexOf");function xo(r,e,t,n){
t=Number(t)||0;let i=r.length-t;n?(n=Number(n),n>i&&(n=i)):n=i;let s=e.length;n>
s/2&&(n=s/2);let o;for(o=0;o<n;++o){let u=parseInt(e.substr(o*2,2),16);if(kt(u))
return o;r[t+o]=u;}return o}a(xo,"hexWrite");function vo(r,e,t,n){return st(Rt(e,
r.length-t),r,t,n)}a(vo,"utf8Write");function Eo(r,e,t,n){return st(Do(e),r,t,n)}
a(Eo,"asciiWrite");function _o(r,e,t,n){return st(Gn(e),r,t,n)}a(_o,"base64Write");
function Ao(r,e,t,n){return st(ko(e,r.length-t),r,t,n)}a(Ao,"ucs2Write");f.prototype.
write=a(function(e,t,n,i){if(t===void 0)i="utf8",n=this.length,t=0;else if(n===void 0&&
typeof t=="string")i=t,n=this.length,t=0;else if(isFinite(t))t=t>>>0,isFinite(n)?
(n=n>>>0,i===void 0&&(i="utf8")):(i=n,n=void 0);else throw new Error("Buffer.wri\
te(string, encoding, offset[, length]) is no longer supported");let s=this.length-
t;if((n===void 0||n>s)&&(n=s),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError(
"Attempt to write outside buffer bounds");i||(i="utf8");let o=!1;for(;;)switch(i){case"\
hex":return xo(this,e,t,n);case"utf8":case"utf-8":return vo(this,e,t,n);case"asc\
ii":case"latin1":case"binary":return Eo(this,e,t,n);case"base64":return _o(this,
e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Ao(this,e,t,n);default:
if(o)throw new TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),o=!0;}},"\
write");f.prototype.toJSON=a(function(){return {type:"Buffer",data:Array.prototype.
slice.call(this._arr||this,0)}},"toJSON");function Co(r,e,t){return e===0&&t===r.
length?Pt.fromByteArray(r):Pt.fromByteArray(r.slice(e,t))}a(Co,"base64Slice");function On(r,e,t){
t=Math.min(r.length,t);let n=[],i=e;for(;i<t;){let s=r[i],o=null,u=s>239?4:s>223?
3:s>191?2:1;if(i+u<=t){let c,h,l,y;switch(u){case 1:s<128&&(o=s);break;case 2:c=
r[i+1],(c&192)===128&&(y=(s&31)<<6|c&63,y>127&&(o=y));break;case 3:c=r[i+1],h=r[i+
2],(c&192)===128&&(h&192)===128&&(y=(s&15)<<12|(c&63)<<6|h&63,y>2047&&(y<55296||
y>57343)&&(o=y));break;case 4:c=r[i+1],h=r[i+2],l=r[i+3],(c&192)===128&&(h&192)===
128&&(l&192)===128&&(y=(s&15)<<18|(c&63)<<12|(h&63)<<6|l&63,y>65535&&y<1114112&&
(o=y));}}o===null?(o=65533,u=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|
o&1023),n.push(o),i+=u;}return Io(n)}a(On,"utf8Slice");var Rn=4096;function Io(r){
let e=r.length;if(e<=Rn)return String.fromCharCode.apply(String,r);let t="",n=0;
for(;n<e;)t+=String.fromCharCode.apply(String,r.slice(n,n+=Rn));return t}a(Io,"d\
ecodeCodePointsArray");function To(r,e,t){let n="";t=Math.min(r.length,t);for(let i=e;i<
t;++i)n+=String.fromCharCode(r[i]&127);return n}a(To,"asciiSlice");function Po(r,e,t){
let n="";t=Math.min(r.length,t);for(let i=e;i<t;++i)n+=String.fromCharCode(r[i]);
return n}a(Po,"latin1Slice");function Bo(r,e,t){let n=r.length;(!e||e<0)&&(e=0),
(!t||t<0||t>n)&&(t=n);let i="";for(let s=e;s<t;++s)i+=Uo[r[s]];return i}a(Bo,"he\
xSlice");function Lo(r,e,t){let n=r.slice(e,t),i="";for(let s=0;s<n.length-1;s+=
2)i+=String.fromCharCode(n[s]+n[s+1]*256);return i}a(Lo,"utf16leSlice");f.prototype.
slice=a(function(e,t){let n=this.length;e=~~e,t=t===void 0?n:~~t,e<0?(e+=n,e<0&&
(e=0)):e>n&&(e=n),t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),t<e&&(t=e);let i=this.subarray(
e,t);return Object.setPrototypeOf(i,f.prototype),i},"slice");function q(r,e,t){if(r%
1!==0||r<0)throw new RangeError("offset is not uint");if(r+e>t)throw new RangeError(
"Trying to access beyond buffer length")}a(q,"checkOffset");f.prototype.readUintLE=
f.prototype.readUIntLE=a(function(e,t,n){e=e>>>0,t=t>>>0,n||q(e,t,this.length);let i=this[e],
s=1,o=0;for(;++o<t&&(s*=256);)i+=this[e+o]*s;return i},"readUIntLE");f.prototype.
readUintBE=f.prototype.readUIntBE=a(function(e,t,n){e=e>>>0,t=t>>>0,n||q(e,t,this.
length);let i=this[e+--t],s=1;for(;t>0&&(s*=256);)i+=this[e+--t]*s;return i},"re\
adUIntBE");f.prototype.readUint8=f.prototype.readUInt8=a(function(e,t){return e=
e>>>0,t||q(e,1,this.length),this[e]},"readUInt8");f.prototype.readUint16LE=f.prototype.
readUInt16LE=a(function(e,t){return e=e>>>0,t||q(e,2,this.length),this[e]|this[e+
1]<<8},"readUInt16LE");f.prototype.readUint16BE=f.prototype.readUInt16BE=a(function(e,t){
return e=e>>>0,t||q(e,2,this.length),this[e]<<8|this[e+1]},"readUInt16BE");f.prototype.
readUint32LE=f.prototype.readUInt32LE=a(function(e,t){return e=e>>>0,t||q(e,4,this.
length),(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216},"readUInt32LE");
f.prototype.readUint32BE=f.prototype.readUInt32BE=a(function(e,t){return e=e>>>0,
t||q(e,4,this.length),this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])},"\
readUInt32BE");f.prototype.readBigUInt64LE=ge(a(function(e){e=e>>>0,Be(e,"offset");
let t=this[e],n=this[e+7];(t===void 0||n===void 0)&&We(e,this.length-8);let i=t+
this[++e]*2**8+this[++e]*2**16+this[++e]*2**24,s=this[++e]+this[++e]*2**8+this[++e]*
2**16+n*2**24;return BigInt(i)+(BigInt(s)<<BigInt(32))},"readBigUInt64LE"));f.prototype.
readBigUInt64BE=ge(a(function(e){e=e>>>0,Be(e,"offset");let t=this[e],n=this[e+7];
(t===void 0||n===void 0)&&We(e,this.length-8);let i=t*2**24+this[++e]*2**16+this[++e]*
2**8+this[++e],s=this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+n;return (BigInt(
i)<<BigInt(32))+BigInt(s)},"readBigUInt64BE"));f.prototype.readIntLE=a(function(e,t,n){
e=e>>>0,t=t>>>0,n||q(e,t,this.length);let i=this[e],s=1,o=0;for(;++o<t&&(s*=256);)
i+=this[e+o]*s;return s*=128,i>=s&&(i-=Math.pow(2,8*t)),i},"readIntLE");f.prototype.
readIntBE=a(function(e,t,n){e=e>>>0,t=t>>>0,n||q(e,t,this.length);let i=t,s=1,o=this[e+
--i];for(;i>0&&(s*=256);)o+=this[e+--i]*s;return s*=128,o>=s&&(o-=Math.pow(2,8*t)),
o},"readIntBE");f.prototype.readInt8=a(function(e,t){return e=e>>>0,t||q(e,1,this.
length),this[e]&128?(255-this[e]+1)*-1:this[e]},"readInt8");f.prototype.readInt16LE=
a(function(e,t){e=e>>>0,t||q(e,2,this.length);let n=this[e]|this[e+1]<<8;return n&
32768?n|4294901760:n},"readInt16LE");f.prototype.readInt16BE=a(function(e,t){e=e>>>
0,t||q(e,2,this.length);let n=this[e+1]|this[e]<<8;return n&32768?n|4294901760:n},
"readInt16BE");f.prototype.readInt32LE=a(function(e,t){return e=e>>>0,t||q(e,4,this.
length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},"readInt32LE");f.prototype.
readInt32BE=a(function(e,t){return e=e>>>0,t||q(e,4,this.length),this[e]<<24|this[e+
1]<<16|this[e+2]<<8|this[e+3]},"readInt32BE");f.prototype.readBigInt64LE=ge(a(function(e){
e=e>>>0,Be(e,"offset");let t=this[e],n=this[e+7];(t===void 0||n===void 0)&&We(e,
this.length-8);let i=this[e+4]+this[e+5]*2**8+this[e+6]*2**16+(n<<24);return (BigInt(
i)<<BigInt(32))+BigInt(t+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24)},"readB\
igInt64LE"));f.prototype.readBigInt64BE=ge(a(function(e){e=e>>>0,Be(e,"offset");
let t=this[e],n=this[e+7];(t===void 0||n===void 0)&&We(e,this.length-8);let i=(t<<
24)+this[++e]*2**16+this[++e]*2**8+this[++e];return (BigInt(i)<<BigInt(32))+BigInt(
this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+n)},"readBigInt64BE"));f.prototype.
readFloatLE=a(function(e,t){return e=e>>>0,t||q(e,4,this.length),Pe.read(this,e,
!0,23,4)},"readFloatLE");f.prototype.readFloatBE=a(function(e,t){return e=e>>>0,
t||q(e,4,this.length),Pe.read(this,e,!1,23,4)},"readFloatBE");f.prototype.readDoubleLE=
a(function(e,t){return e=e>>>0,t||q(e,8,this.length),Pe.read(this,e,!0,52,8)},"r\
eadDoubleLE");f.prototype.readDoubleBE=a(function(e,t){return e=e>>>0,t||q(e,8,this.
length),Pe.read(this,e,!1,52,8)},"readDoubleBE");function Y(r,e,t,n,i,s){if(!f.isBuffer(
r))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<
s)throw new RangeError('"value" argument is out of bounds');if(t+n>r.length)throw new RangeError(
"Index out of range")}a(Y,"checkInt");f.prototype.writeUintLE=f.prototype.writeUIntLE=
a(function(e,t,n,i){if(e=+e,t=t>>>0,n=n>>>0,!i){let u=Math.pow(2,8*n)-1;Y(this,e,
t,n,u,0);}let s=1,o=0;for(this[t]=e&255;++o<n&&(s*=256);)this[t+o]=e/s&255;return t+
n},"writeUIntLE");f.prototype.writeUintBE=f.prototype.writeUIntBE=a(function(e,t,n,i){
if(e=+e,t=t>>>0,n=n>>>0,!i){let u=Math.pow(2,8*n)-1;Y(this,e,t,n,u,0);}let s=n-1,
o=1;for(this[t+s]=e&255;--s>=0&&(o*=256);)this[t+s]=e/o&255;return t+n},"writeUI\
ntBE");f.prototype.writeUint8=f.prototype.writeUInt8=a(function(e,t,n){return e=
+e,t=t>>>0,n||Y(this,e,t,1,255,0),this[t]=e&255,t+1},"writeUInt8");f.prototype.writeUint16LE=
f.prototype.writeUInt16LE=a(function(e,t,n){return e=+e,t=t>>>0,n||Y(this,e,t,2,
65535,0),this[t]=e&255,this[t+1]=e>>>8,t+2},"writeUInt16LE");f.prototype.writeUint16BE=
f.prototype.writeUInt16BE=a(function(e,t,n){return e=+e,t=t>>>0,n||Y(this,e,t,2,
65535,0),this[t]=e>>>8,this[t+1]=e&255,t+2},"writeUInt16BE");f.prototype.writeUint32LE=
f.prototype.writeUInt32LE=a(function(e,t,n){return e=+e,t=t>>>0,n||Y(this,e,t,4,
4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=e&255,t+
4},"writeUInt32LE");f.prototype.writeUint32BE=f.prototype.writeUInt32BE=a(function(e,t,n){
return e=+e,t=t>>>0,n||Y(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,
this[t+2]=e>>>8,this[t+3]=e&255,t+4},"writeUInt32BE");function Nn(r,e,t,n,i){Hn(
e,n,i,r,t,7);let s=Number(e&BigInt(4294967295));r[t++]=s,s=s>>8,r[t++]=s,s=s>>8,
r[t++]=s,s=s>>8,r[t++]=s;let o=Number(e>>BigInt(32)&BigInt(4294967295));return r[t++]=
o,o=o>>8,r[t++]=o,o=o>>8,r[t++]=o,o=o>>8,r[t++]=o,t}a(Nn,"wrtBigUInt64LE");function qn(r,e,t,n,i){
Hn(e,n,i,r,t,7);let s=Number(e&BigInt(4294967295));r[t+7]=s,s=s>>8,r[t+6]=s,s=s>>
8,r[t+5]=s,s=s>>8,r[t+4]=s;let o=Number(e>>BigInt(32)&BigInt(4294967295));return r[t+
3]=o,o=o>>8,r[t+2]=o,o=o>>8,r[t+1]=o,o=o>>8,r[t]=o,t+8}a(qn,"wrtBigUInt64BE");f.
prototype.writeBigUInt64LE=ge(a(function(e,t=0){return Nn(this,e,t,BigInt(0),BigInt(
"0xffffffffffffffff"))},"writeBigUInt64LE"));f.prototype.writeBigUInt64BE=ge(a(function(e,t=0){
return qn(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))},"writeBigUInt64BE"));
f.prototype.writeIntLE=a(function(e,t,n,i){if(e=+e,t=t>>>0,!i){let c=Math.pow(2,
8*n-1);Y(this,e,t,n,c-1,-c);}let s=0,o=1,u=0;for(this[t]=e&255;++s<n&&(o*=256);)e<
0&&u===0&&this[t+s-1]!==0&&(u=1),this[t+s]=(e/o>>0)-u&255;return t+n},"writeIntL\
E");f.prototype.writeIntBE=a(function(e,t,n,i){if(e=+e,t=t>>>0,!i){let c=Math.pow(
2,8*n-1);Y(this,e,t,n,c-1,-c);}let s=n-1,o=1,u=0;for(this[t+s]=e&255;--s>=0&&(o*=
256);)e<0&&u===0&&this[t+s+1]!==0&&(u=1),this[t+s]=(e/o>>0)-u&255;return t+n},"w\
riteIntBE");f.prototype.writeInt8=a(function(e,t,n){return e=+e,t=t>>>0,n||Y(this,
e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=e&255,t+1},"writeInt8");f.prototype.writeInt16LE=
a(function(e,t,n){return e=+e,t=t>>>0,n||Y(this,e,t,2,32767,-32768),this[t]=e&255,
this[t+1]=e>>>8,t+2},"writeInt16LE");f.prototype.writeInt16BE=a(function(e,t,n){
return e=+e,t=t>>>0,n||Y(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=e&255,
t+2},"writeInt16BE");f.prototype.writeInt32LE=a(function(e,t,n){return e=+e,t=t>>>
0,n||Y(this,e,t,4,2147483647,-2147483648),this[t]=e&255,this[t+1]=e>>>8,this[t+2]=
e>>>16,this[t+3]=e>>>24,t+4},"writeInt32LE");f.prototype.writeInt32BE=a(function(e,t,n){
return e=+e,t=t>>>0,n||Y(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+
1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e&255,t+4},"writeIn\
t32BE");f.prototype.writeBigInt64LE=ge(a(function(e,t=0){return Nn(this,e,t,-BigInt(
"0x8000000000000000"),BigInt("0x7fffffffffffffff"))},"writeBigInt64LE"));f.prototype.
writeBigInt64BE=ge(a(function(e,t=0){return qn(this,e,t,-BigInt("0x8000000000000\
000"),BigInt("0x7fffffffffffffff"))},"writeBigInt64BE"));function Qn(r,e,t,n,i,s){
if(t+n>r.length)throw new RangeError("Index out of range");if(t<0)throw new RangeError(
"Index out of range")}a(Qn,"checkIEEE754");function Wn(r,e,t,n,i){return e=+e,t=
t>>>0,i||Qn(r,e,t,4),Pe.write(r,e,t,n,
23,4),t+4}a(Wn,"writeFloat");f.prototype.writeFloatLE=a(function(e,t,n){return Wn(
this,e,t,!0,n)},"writeFloatLE");f.prototype.writeFloatBE=a(function(e,t,n){return Wn(
this,e,t,!1,n)},"writeFloatBE");function jn(r,e,t,n,i){return e=+e,t=t>>>0,i||Qn(
r,e,t,8),Pe.write(r,e,t,n,52,8),t+8}
a(jn,"writeDouble");f.prototype.writeDoubleLE=a(function(e,t,n){return jn(this,e,
t,!0,n)},"writeDoubleLE");f.prototype.writeDoubleBE=a(function(e,t,n){return jn(
this,e,t,!1,n)},"writeDoubleBE");f.prototype.copy=a(function(e,t,n,i){if(!f.isBuffer(
e))throw new TypeError("argument should be a Buffer");if(n||(n=0),!i&&i!==0&&(i=
this.length),t>=e.length&&(t=e.length),t||(t=0),i>0&&i<n&&(i=n),i===n||e.length===
0||this.length===0)return 0;if(t<0)throw new RangeError("targetStart out of boun\
ds");if(n<0||n>=this.length)throw new RangeError("Index out of range");if(i<0)throw new RangeError(
"sourceEnd out of bounds");i>this.length&&(i=this.length),e.length-t<i-n&&(i=e.length-
t+n);let s=i-n;return this===e&&typeof Uint8Array.prototype.copyWithin=="functio\
n"?this.copyWithin(t,n,i):Uint8Array.prototype.set.call(e,this.subarray(n,i),t),
s},"copy");f.prototype.fill=a(function(e,t,n,i){if(typeof e=="string"){if(typeof t==
"string"?(i=t,t=0,n=this.length):typeof n=="string"&&(i=n,n=this.length),i!==void 0&&
typeof i!="string")throw new TypeError("encoding must be a string");if(typeof i==
"string"&&!f.isEncoding(i))throw new TypeError("Unknown encoding: "+i);if(e.length===
1){let o=e.charCodeAt(0);(i==="utf8"&&o<128||i==="latin1")&&(e=o);}}else typeof e==
"number"?e=e&255:typeof e=="boolean"&&(e=Number(e));if(t<0||this.length<t||this.
length<n)throw new RangeError("Out of range index");if(n<=t)return this;t=t>>>0,
n=n===void 0?this.length:n>>>0,e||(e=0);let s;if(typeof e=="number")for(s=t;s<n;++s)
this[s]=e;else {let o=f.isBuffer(e)?e:f.from(e,i),u=o.length;if(u===0)throw new TypeError(
'The value "'+e+'" is invalid for argument "value"');for(s=0;s<n-t;++s)this[s+t]=
o[s%u];}return this},"fill");var Te={};function Dt(r,e,t){var n;Te[r]=(n=class extends t{constructor(){
super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,
configurable:!0}),this.name=`${this.name} [${r}]`,this.stack,delete this.name;}get code(){
return r}set code(s){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,
value:s,writable:!0});}toString(){return `${this.name} [${r}]: ${this.message}`}},
a(n,"NodeError"),n);}a(Dt,"E");Dt("ERR_BUFFER_OUT_OF_BOUNDS",function(r){return r?
`${r} is outside of buffer bounds`:"Attempt to access memory outside buffer boun\
ds"},RangeError);Dt("ERR_INVALID_ARG_TYPE",function(r,e){return `The "${r}" argum\
ent must be of type number. Received type ${typeof e}`},TypeError);Dt("ERR_OUT_O\
F_RANGE",function(r,e,t){let n=`The value of "${r}" is out of range.`,i=t;return Number.
isInteger(t)&&Math.abs(t)>2**32?i=Fn(String(t)):typeof t=="bigint"&&(i=String(t),
(t>BigInt(2)**BigInt(32)||t<-(BigInt(2)**BigInt(32)))&&(i=Fn(i)),i+="n"),n+=` It\
 must be ${e}. Received ${i}`,n},RangeError);function Fn(r){let e="",t=r.length,
n=r[0]==="-"?1:0;for(;t>=n+4;t-=3)e=`_${r.slice(t-3,t)}${e}`;return `${r.slice(0,
t)}${e}`}a(Fn,"addNumericalSeparator");function Ro(r,e,t){Be(e,"offset"),(r[e]===
void 0||r[e+t]===void 0)&&We(e,r.length-(t+1));}a(Ro,"checkBounds");function Hn(r,e,t,n,i,s){
if(r>t||r<e){let o=typeof e=="bigint"?"n":"",u;throw s>3?e===0||e===BigInt(0)?u=
`>= 0${o} and < 2${o} ** ${(s+1)*8}${o}`:u=`>= -(2${o} ** ${(s+1)*8-1}${o}) and \
< 2 ** ${(s+1)*8-1}${o}`:u=`>= ${e}${o} and <= ${t}${o}`,new Te.ERR_OUT_OF_RANGE(
"value",u,r)}Ro(n,i,s);}a(Hn,"checkIntBI");function Be(r,e){if(typeof r!="number")
throw new Te.ERR_INVALID_ARG_TYPE(e,"number",r)}a(Be,"validateNumber");function We(r,e,t){
throw Math.floor(r)!==r?(Be(r,t),new Te.ERR_OUT_OF_RANGE(t||"offset","an integer",
r)):e<0?new Te.ERR_BUFFER_OUT_OF_BOUNDS:new Te.ERR_OUT_OF_RANGE(t||"offset",`>= ${t?
1:0} and <= ${e}`,r)}a(We,"boundsError");var Fo=/[^+/0-9A-Za-z-_]/g;function Mo(r){
if(r=r.split("=")[0],r=r.trim().replace(Fo,""),r.length<2)return "";for(;r.length%
4!==0;)r=r+"=";return r}a(Mo,"base64clean");function Rt(r,e){e=e||1/0;let t,n=r.
length,i=null,s=[];for(let o=0;o<n;++o){if(t=r.charCodeAt(o),t>55295&&t<57344){if(!i){
if(t>56319){(e-=3)>-1&&s.push(239,191,189);continue}else if(o+1===n){(e-=3)>-1&&
s.push(239,191,189);continue}i=t;continue}if(t<56320){(e-=3)>-1&&s.push(239,191,
189),i=t;continue}t=(i-55296<<10|t-56320)+65536;}else i&&(e-=3)>-1&&s.push(239,191,
189);if(i=null,t<128){if((e-=1)<0)break;s.push(t);}else if(t<2048){if((e-=2)<0)break;
s.push(t>>6|192,t&63|128);}else if(t<65536){if((e-=3)<0)break;s.push(t>>12|224,t>>
6&63|128,t&63|128);}else if(t<1114112){if((e-=4)<0)break;s.push(t>>18|240,t>>12&63|
128,t>>6&63|128,t&63|128);}else throw new Error("Invalid code point")}return s}a(
Rt,"utf8ToBytes");function Do(r){let e=[];for(let t=0;t<r.length;++t)e.push(r.charCodeAt(
t)&255);return e}a(Do,"asciiToBytes");function ko(r,e){let t,n,i,s=[];for(let o=0;o<
r.length&&!((e-=2)<0);++o)t=r.charCodeAt(o),n=t>>8,i=t%256,s.push(i),s.push(n);return s}
a(ko,"utf16leToBytes");function Gn(r){return Pt.toByteArray(Mo(r))}a(Gn,"base64T\
oBytes");function st(r,e,t,n){let i;for(i=0;i<n&&!(i+t>=e.length||i>=r.length);++i)
e[i+t]=r[i];return i}a(st,"blitBuffer");function ue(r,e){return r instanceof e||
r!=null&&r.constructor!=null&&r.constructor.name!=null&&r.constructor.name===e.name}
a(ue,"isInstance");function kt(r){return r!==r}a(kt,"numberIsNaN");var Uo=function(){
let r="0123456789abcdef",e=new Array(256);for(let t=0;t<16;++t){let n=t*16;for(let i=0;i<
16;++i)e[n+i]=r[t]+r[i];}return e}();function ge(r){return typeof BigInt>"u"?Oo:r}
a(ge,"defineBigIntMethod");function Oo(){throw new Error("BigInt not supported")}
a(Oo,"BufferBigIntNotDefined");});var b,S,g,d,m,p=z(()=>{b=globalThis,S=globalThis.setImmediate??(r=>setTimeout(
r,0)),g=globalThis.crypto??{};
g.subtle??(g.subtle={});d=typeof globalThis.Buffer=="function"&&typeof globalThis.
Buffer.allocUnsafe=="function"?globalThis.Buffer:$n().Buffer,m=globalThis.process??
{};m.env??(m.env={});try{m.nextTick(()=>{});}catch{let e=Promise.resolve();m.nextTick=
e.then.bind(e);}});var we=T((Jc,Ut)=>{p();var Re=typeof Reflect=="object"?Reflect:null,
Vn=Re&&typeof Re.apply=="function"?Re.apply:a(function(e,t,n){return Function.prototype.
apply.call(e,t,n)},"ReflectApply"),ot;Re&&typeof Re.ownKeys=="function"?ot=Re.ownKeys:
Object.getOwnPropertySymbols?ot=a(function(e){return Object.getOwnPropertyNames(
e).concat(Object.getOwnPropertySymbols(e))},"ReflectOwnKeys"):ot=a(function(e){return Object.
getOwnPropertyNames(e)},"ReflectOwnKeys");function No(r){console&&console.warn&&
console.warn(r);}a(No,"ProcessEmitWarning");var zn=Number.isNaN||a(function(e){return e!==
e},"NumberIsNaN");function L(){L.init.call(this);}a(L,"EventEmitter");Ut.exports=
L;Ut.exports.once=jo;L.EventEmitter=L;L.prototype._events=void 0;L.prototype._eventsCount=
0;L.prototype._maxListeners=void 0;var Kn=10;function at(r){if(typeof r!="functi\
on")throw new TypeError('The "listener" argument must be of type Function. Recei\
ved type '+typeof r)}a(at,"checkListener");Object.defineProperty(L,"defaultMaxLi\
steners",{enumerable:!0,get:a(function(){return Kn},"get"),set:a(function(r){if(typeof r!=
"number"||r<0||zn(r))throw new RangeError('The value of "defaultMaxListeners" is\
 out of range. It must be a non-negative number. Received '+r+".");Kn=r;},"set")});
L.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this).
_events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=
this._maxListeners||void 0;};L.prototype.setMaxListeners=a(function(e){if(typeof e!=
"number"||e<0||zn(e))throw new RangeError('The value of "n" is out of range. It \
must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},
"setMaxListeners");function Yn(r){return r._maxListeners===void 0?L.defaultMaxListeners:
r._maxListeners}a(Yn,"_getMaxListeners");L.prototype.getMaxListeners=a(function(){
return Yn(this)},"getMaxListeners");L.prototype.emit=a(function(e){for(var t=[],
n=1;n<arguments.length;n++)t.push(arguments[n]);var i=e==="error",s=this._events;
if(s!==void 0)i=i&&s.error===void 0;else if(!i)return !1;if(i){var o;if(t.length>
0&&(o=t[0]),o instanceof Error)throw o;var u=new Error("Unhandled error."+(o?" ("+
o.message+")":""));throw u.context=o,u}var c=s[e];if(c===void 0)return !1;if(typeof c==
"function")Vn(c,this,t);else for(var h=c.length,l=ti(c,h),n=0;n<h;++n)Vn(l[n],this,
t);return !0},"emit");function Zn(r,e,t,n){var i,s,o;if(at(t),s=r._events,s===void 0?
(s=r._events=Object.create(null),r._eventsCount=0):(s.newListener!==void 0&&(r.emit(
"newListener",e,t.listener?t.listener:t),s=r._events),o=s[e]),o===void 0)o=s[e]=
t,++r._eventsCount;else if(typeof o=="function"?o=s[e]=n?[t,o]:[o,t]:n?o.unshift(
t):o.push(t),i=Yn(r),i>0&&o.length>i&&!o.warned){o.warned=!0;var u=new Error("Po\
ssible EventEmitter memory leak detected. "+o.length+" "+String(e)+" listeners a\
dded. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExce\
ededWarning",u.emitter=r,u.type=e,u.count=o.length,No(u);}return r}a(Zn,"_addList\
ener");L.prototype.addListener=a(function(e,t){return Zn(this,e,t,!1)},"addListe\
ner");L.prototype.on=L.prototype.addListener;L.prototype.prependListener=a(function(e,t){
return Zn(this,e,t,!0)},"prependListener");function qo(){if(!this.fired)return this.
target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?
this.listener.call(this.target):this.listener.apply(this.target,arguments)}a(qo,
"onceWrapper");function Jn(r,e,t){var n={fired:!1,wrapFn:void 0,target:r,type:e,
listener:t},i=qo.bind(n);return i.listener=t,n.wrapFn=i,i}a(Jn,"_onceWrap");L.prototype.
once=a(function(e,t){return at(t),this.on(e,Jn(this,e,t)),this},"once");L.prototype.
prependOnceListener=a(function(e,t){return at(t),this.prependListener(e,Jn(this,
e,t)),this},"prependOnceListener");L.prototype.removeListener=a(function(e,t){var n,
i,s,o,u;if(at(t),i=this._events,i===void 0)return this;if(n=i[e],n===void 0)return this;
if(n===t||n.listener===t)--this._eventsCount===0?this._events=Object.create(null):
(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if(typeof n!=
"function"){for(s=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){u=n[o].
listener,s=o;break}if(s<0)return this;s===0?n.shift():Qo(n,s),n.length===1&&(i[e]=
n[0]),i.removeListener!==void 0&&this.emit("removeListener",e,u||t);}return this},
"removeListener");L.prototype.off=L.prototype.removeListener;L.prototype.removeAllListeners=
a(function(e){var t,n,i;if(n=this._events,n===void 0)return this;if(n.removeListener===
void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=
0):n[e]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete n[e]),
this;if(arguments.length===0){var s=Object.keys(n),o;for(i=0;i<s.length;++i)o=s[i],
o!=="removeListener"&&this.removeAllListeners(o);return this.removeAllListeners(
"removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(t=
n[e],typeof t=="function")this.removeListener(e,t);else if(t!==void 0)for(i=t.length-
1;i>=0;i--)this.removeListener(e,t[i]);return this},"removeAllListeners");function Xn(r,e,t){
var n=r._events;if(n===void 0)return [];var i=n[e];return i===void 0?[]:typeof i==
"function"?t?[i.listener||i]:[i]:t?Wo(i):ti(i,i.length)}a(Xn,"_listeners");L.prototype.
listeners=a(function(e){return Xn(this,e,!0)},"listeners");L.prototype.rawListeners=
a(function(e){return Xn(this,e,!1)},"rawListeners");L.listenerCount=function(r,e){
return typeof r.listenerCount=="function"?r.listenerCount(e):ei.call(r,e)};L.prototype.
listenerCount=ei;function ei(r){var e=this._events;if(e!==void 0){var t=e[r];if(typeof t==
"function")return 1;if(t!==void 0)return t.length}return 0}a(ei,"listenerCount");
L.prototype.eventNames=a(function(){return this._eventsCount>0?ot(this._events):
[]},"eventNames");function ti(r,e){for(var t=new Array(e),n=0;n<e;++n)t[n]=r[n];
return t}a(ti,"arrayClone");function Qo(r,e){for(;e+1<r.length;e++)r[e]=r[e+1];r.
pop();}a(Qo,"spliceOne");function Wo(r){for(var e=new Array(r.length),t=0;t<e.length;++t)
e[t]=r[t].listener||r[t];return e}a(Wo,"unwrapListeners");function jo(r,e){return new Promise(
function(t,n){function i(o){r.removeListener(e,s),n(o);}a(i,"errorListener");function s(){
typeof r.removeListener=="function"&&r.removeListener("error",i),t([].slice.call(
arguments));}a(s,"resolver"),ri(r,e,s,{once:!0}),e!=="error"&&Ho(r,i,{once:!0});})}
a(jo,"once");function Ho(r,e,t){typeof r.on=="function"&&ri(r,"error",e,t);}a(Ho,
"addErrorHandlerIfEventEmitter");function ri(r,e,t,n){if(typeof r.on=="function")
n.once?r.once(e,t):r.on(e,t);else if(typeof r.addEventListener=="function")r.addEventListener(
e,a(function i(s){n.once&&r.removeEventListener(e,i),t(s);},"wrapListener"));else
throw new TypeError('The "emitter" argument must be of type EventEmitter. Receiv\
ed type '+typeof r)}a(ri,"eventTargetAgnosticAddListener");});var je={};ie(je,{default:()=>Go});var Go,He=z(()=>{p();Go={};});function Ge(r){let e=1779033703,t=3144134277,n=1013904242,i=2773480762,s=1359893119,
o=2600822924,u=528734635,c=1541459225,h=0,l=0,y=[1116352408,1899447441,3049323471,
3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,
1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,
604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,
3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,
1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,
3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,
883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,
2361852424,2428436474,2756734187,3204031479,3329325298],x=a((A,w)=>A>>>w|A<<32-w,
"rrot"),C=new Uint32Array(64),B=new Uint8Array(64),W=a(()=>{for(let R=0,G=0;R<16;R++,
G+=4)C[R]=B[G]<<24|B[G+1]<<16|B[G+2]<<8|B[G+3];for(let R=16;R<64;R++){let G=x(C[R-
15],7)^x(C[R-15],18)^C[R-15]>>>3,he=x(C[R-2],17)^x(C[R-2],19)^C[R-2]>>>10;C[R]=C[R-
16]+G+C[R-7]+he|0;}let A=e,w=t,P=n,V=i,k=s,j=o,ce=u,ee=c;for(let R=0;R<64;R++){let G=x(
k,6)^x(k,11)^x(k,25),he=k&j^~k&ce,ye=ee+G+he+y[R]+C[R]|0,ve=x(A,2)^x(A,13)^x(A,22),
me=A&w^A&P^w&P,se=ve+me|0;ee=ce,ce=j,j=k,k=V+ye|0,V=P,P=w,w=A,A=ye+se|0;}e=e+A|0,
t=t+w|0,n=n+P|0,i=i+V|0,s=s+k|0,o=o+j|0,u=u+ce|0,c=c+ee|0,l=0;},"process"),X=a(A=>{
typeof A=="string"&&(A=new TextEncoder().encode(A));for(let w=0;w<A.length;w++)B[l++]=
A[w],l===64&&W();h+=A.length;},"add"),de=a(()=>{if(B[l++]=128,l==64&&W(),l+8>64){
for(;l<64;)B[l++]=0;W();}for(;l<58;)B[l++]=0;let A=h*8;B[l++]=A/1099511627776&255,
B[l++]=A/4294967296&255,B[l++]=A>>>24,B[l++]=A>>>16&255,B[l++]=A>>>8&255,B[l++]=
A&255,W();let w=new Uint8Array(32);return w[0]=e>>>24,w[1]=e>>>16&255,w[2]=e>>>8&
255,w[3]=e&255,w[4]=t>>>24,w[5]=t>>>16&255,w[6]=t>>>8&255,w[7]=t&255,w[8]=n>>>24,
w[9]=n>>>16&255,w[10]=n>>>8&255,w[11]=n&255,w[12]=i>>>24,w[13]=i>>>16&255,w[14]=
i>>>8&255,w[15]=i&255,w[16]=s>>>24,w[17]=s>>>16&255,w[18]=s>>>8&255,w[19]=s&255,
w[20]=o>>>24,w[21]=o>>>16&255,w[22]=o>>>8&255,w[23]=o&255,w[24]=u>>>24,w[25]=u>>>
16&255,w[26]=u>>>8&255,w[27]=u&255,w[28]=c>>>24,w[29]=c>>>16&255,w[30]=c>>>8&255,
w[31]=c&255,w},"digest");return r===void 0?{add:X,digest:de}:(X(r),de())}var ni=z(
()=>{p();a(Ge,"sha256");});var U,$e,ii=z(()=>{p();U=class U{constructor(){_(this,"_dataLength",
0);_(this,"_bufferLength",0);_(this,"_state",new Int32Array(4));_(this,"_buffer",
new ArrayBuffer(68));_(this,"_buffer8");_(this,"_buffer32");this._buffer8=new Uint8Array(
this._buffer,0,68),this._buffer32=new Uint32Array(this._buffer,0,17),this.start();}static hashByteArray(e,t=!1){
return this.onePassHasher.start().appendByteArray(e).end(t)}static hashStr(e,t=!1){
return this.onePassHasher.start().appendStr(e).end(t)}static hashAsciiStr(e,t=!1){
return this.onePassHasher.start().appendAsciiStr(e).end(t)}static _hex(e){let t=U.
hexChars,n=U.hexOut,i,s,o,u;for(u=0;u<4;u+=1)for(s=u*8,i=e[u],o=0;o<8;o+=2)n[s+1+
o]=t.charAt(i&15),i>>>=4,n[s+0+o]=t.charAt(i&15),i>>>=4;return n.join("")}static _md5cycle(e,t){
let n=e[0],i=e[1],s=e[2],o=e[3];n+=(i&s|~i&o)+t[0]-680876936|0,n=(n<<7|n>>>25)+i|
0,o+=(n&i|~n&s)+t[1]-389564586|0,o=(o<<12|o>>>20)+n|0,s+=(o&n|~o&i)+t[2]+606105819|
0,s=(s<<17|s>>>15)+o|0,i+=(s&o|~s&n)+t[3]-1044525330|0,i=(i<<22|i>>>10)+s|0,n+=(i&
s|~i&o)+t[4]-176418897|0,n=(n<<7|n>>>25)+i|0,o+=(n&i|~n&s)+t[5]+1200080426|0,o=(o<<
12|o>>>20)+n|0,s+=(o&n|~o&i)+t[6]-1473231341|0,s=(s<<17|s>>>15)+o|0,i+=(s&o|~s&n)+
t[7]-45705983|0,i=(i<<22|i>>>10)+s|0,n+=(i&s|~i&o)+t[8]+1770035416|0,n=(n<<7|n>>>
25)+i|0,o+=(n&i|~n&s)+t[9]-1958414417|0,o=(o<<12|o>>>20)+n|0,s+=(o&n|~o&i)+t[10]-
42063|0,s=(s<<17|s>>>15)+o|0,i+=(s&o|~s&n)+t[11]-1990404162|0,i=(i<<22|i>>>10)+s|
0,n+=(i&s|~i&o)+t[12]+1804603682|0,n=(n<<7|n>>>25)+i|0,o+=(n&i|~n&s)+t[13]-40341101|
0,o=(o<<12|o>>>20)+n|0,s+=(o&n|~o&i)+t[14]-1502002290|0,s=(s<<17|s>>>15)+o|0,i+=
(s&o|~s&n)+t[15]+1236535329|0,i=(i<<22|i>>>10)+s|0,n+=(i&o|s&~o)+t[1]-165796510|
0,n=(n<<5|n>>>27)+i|0,o+=(n&s|i&~s)+t[6]-1069501632|0,o=(o<<9|o>>>23)+n|0,s+=(o&
i|n&~i)+t[11]+643717713|0,s=(s<<14|s>>>18)+o|0,i+=(s&n|o&~n)+t[0]-373897302|0,i=
(i<<20|i>>>12)+s|0,n+=(i&o|s&~o)+t[5]-701558691|0,n=(n<<5|n>>>27)+i|0,o+=(n&s|i&
~s)+t[10]+38016083|0,o=(o<<9|o>>>23)+n|0,s+=(o&i|n&~i)+t[15]-660478335|0,s=(s<<14|
s>>>18)+o|0,i+=(s&n|o&~n)+t[4]-405537848|0,i=(i<<20|i>>>12)+s|0,n+=(i&o|s&~o)+t[9]+
568446438|0,n=(n<<5|n>>>27)+i|0,o+=(n&s|i&~s)+t[14]-1019803690|0,o=(o<<9|o>>>23)+
n|0,s+=(o&i|n&~i)+t[3]-187363961|0,s=(s<<14|s>>>18)+o|0,i+=(s&n|o&~n)+t[8]+1163531501|
0,i=(i<<20|i>>>12)+s|0,n+=(i&o|s&~o)+t[13]-1444681467|0,n=(n<<5|n>>>27)+i|0,o+=(n&
s|i&~s)+t[2]-51403784|0,o=(o<<9|o>>>23)+n|0,s+=(o&i|n&~i)+t[7]+1735328473|0,s=(s<<
14|s>>>18)+o|0,i+=(s&n|o&~n)+t[12]-1926607734|0,i=(i<<20|i>>>12)+s|0,n+=(i^s^o)+
t[5]-378558|0,n=(n<<4|n>>>28)+i|0,o+=(n^i^s)+t[8]-2022574463|0,o=(o<<11|o>>>21)+
n|0,s+=(o^n^i)+t[11]+1839030562|0,s=(s<<16|s>>>16)+o|0,i+=(s^o^n)+t[14]-35309556|
0,i=(i<<23|i>>>9)+s|0,n+=(i^s^o)+t[1]-1530992060|0,n=(n<<4|n>>>28)+i|0,o+=(n^i^s)+
t[4]+1272893353|0,o=(o<<11|o>>>21)+n|0,s+=(o^n^i)+t[7]-155497632|0,s=(s<<16|s>>>
16)+o|0,i+=(s^o^n)+t[10]-1094730640|0,i=(i<<23|i>>>9)+s|0,n+=(i^s^o)+t[13]+681279174|
0,n=(n<<4|n>>>28)+i|0,o+=(n^i^s)+t[0]-358537222|0,o=(o<<11|o>>>21)+n|0,s+=(o^n^i)+
t[3]-722521979|0,s=(s<<16|s>>>16)+o|0,i+=(s^o^n)+t[6]+76029189|0,i=(i<<23|i>>>9)+
s|0,n+=(i^s^o)+t[9]-640364487|0,n=(n<<4|n>>>28)+i|0,o+=(n^i^s)+t[12]-421815835|0,
o=(o<<11|o>>>21)+n|0,s+=(o^n^i)+t[15]+530742520|0,s=(s<<16|s>>>16)+o|0,i+=(s^o^n)+
t[2]-995338651|0,i=(i<<23|i>>>9)+s|0,n+=(s^(i|~o))+t[0]-198630844|0,n=(n<<6|n>>>
26)+i|0,o+=(i^(n|~s))+t[7]+1126891415|0,o=(o<<10|o>>>22)+n|0,s+=(n^(o|~i))+t[14]-
1416354905|0,s=(s<<15|s>>>17)+o|0,i+=(o^(s|~n))+t[5]-57434055|0,i=(i<<21|i>>>11)+
s|0,n+=(s^(i|~o))+t[12]+1700485571|0,n=(n<<6|n>>>26)+i|0,o+=(i^(n|~s))+t[3]-1894986606|
0,o=(o<<10|o>>>22)+n|0,s+=(n^(o|~i))+t[10]-1051523|0,s=(s<<15|s>>>17)+o|0,i+=(o^
(s|~n))+t[1]-2054922799|0,i=(i<<21|i>>>11)+s|0,n+=(s^(i|~o))+t[8]+1873313359|0,n=
(n<<6|n>>>26)+i|0,o+=(i^(n|~s))+t[15]-30611744|0,o=(o<<10|o>>>22)+n|0,s+=(n^(o|~i))+
t[6]-1560198380|0,s=(s<<15|s>>>17)+o|0,i+=(o^(s|~n))+t[13]+1309151649|0,i=(i<<21|
i>>>11)+s|0,n+=(s^(i|~o))+t[4]-145523070|0,n=(n<<6|n>>>26)+i|0,o+=(i^(n|~s))+t[11]-
1120210379|0,o=(o<<10|o>>>22)+n|0,s+=(n^(o|~i))+t[2]+718787259|0,s=(s<<15|s>>>17)+
o|0,i+=(o^(s|~n))+t[9]-343485551|0,i=(i<<21|i>>>11)+s|0,e[0]=n+e[0]|0,e[1]=i+e[1]|
0,e[2]=s+e[2]|0,e[3]=o+e[3]|0;}start(){return this._dataLength=0,this._bufferLength=
0,this._state.set(U.stateIdentity),this}appendStr(e){let t=this._buffer8,n=this.
_buffer32,i=this._bufferLength,s,o;for(o=0;o<e.length;o+=1){if(s=e.charCodeAt(o),
s<128)t[i++]=s;else if(s<2048)t[i++]=(s>>>6)+192,t[i++]=s&63|128;else if(s<55296||
s>56319)t[i++]=(s>>>12)+224,t[i++]=s>>>6&63|128,t[i++]=s&63|128;else {if(s=(s-55296)*
1024+(e.charCodeAt(++o)-56320)+65536,s>1114111)throw new Error("Unicode standard\
 supports code points up to U+10FFFF");t[i++]=(s>>>18)+240,t[i++]=s>>>12&63|128,
t[i++]=s>>>6&63|128,t[i++]=s&63|128;}i>=64&&(this._dataLength+=64,U._md5cycle(this.
_state,n),i-=64,n[0]=n[16]);}return this._bufferLength=i,this}appendAsciiStr(e){let t=this.
_buffer8,n=this._buffer32,i=this._bufferLength,s,o=0;for(;;){for(s=Math.min(e.length-
o,64-i);s--;)t[i++]=e.charCodeAt(o++);if(i<64)break;this._dataLength+=64,U._md5cycle(
this._state,n),i=0;}return this._bufferLength=i,this}appendByteArray(e){let t=this.
_buffer8,n=this._buffer32,i=this._bufferLength,s,o=0;for(;;){for(s=Math.min(e.length-
o,64-i);s--;)t[i++]=e[o++];if(i<64)break;this._dataLength+=64,U._md5cycle(this._state,
n),i=0;}return this._bufferLength=i,this}getState(){let e=this._state;return {buffer:String.
fromCharCode.apply(null,Array.from(this._buffer8)),buflen:this._bufferLength,length:this.
_dataLength,state:[e[0],e[1],e[2],e[3]]}}setState(e){let t=e.buffer,n=e.state,i=this.
_state,s;for(this._dataLength=e.length,this._bufferLength=e.buflen,i[0]=n[0],i[1]=
n[1],i[2]=n[2],i[3]=n[3],s=0;s<t.length;s+=1)this._buffer8[s]=t.charCodeAt(s);}end(e=!1){
let t=this._bufferLength,n=this._buffer8,i=this._buffer32,s=(t>>2)+1;this._dataLength+=
t;let o=this._dataLength*8;if(n[t]=128,n[t+1]=n[t+2]=n[t+3]=0,i.set(U.buffer32Identity.
subarray(s),s),t>55&&(U._md5cycle(this._state,i),i.set(U.buffer32Identity)),o<=4294967295)
i[14]=o;else {let u=o.toString(16).match(/(.*?)(.{0,8})$/);if(u===null)return;let c=parseInt(
u[2],16),h=parseInt(u[1],16)||0;i[14]=c,i[15]=h;}return U._md5cycle(this._state,i),
e?this._state:U._hex(this._state)}};a(U,"Md5"),_(U,"stateIdentity",new Int32Array(
[1732584193,-271733879,-1732584194,271733878])),_(U,"buffer32Identity",new Int32Array(
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])),_(U,"hexChars","0123456789abcdef"),_(U,"hexO\
ut",[]),_(U,"onePassHasher",new U);$e=U;});var Ot={};ie(Ot,{createHash:()=>Vo,createHmac:()=>Ko,randomBytes:()=>$o});function $o(r){
return g.getRandomValues(d.alloc(r))}function Vo(r){if(r==="sha256")return {update:a(
function(e){return {digest:a(function(){return d.from(Ge(e))},"digest")}},"update")};
if(r==="md5")return {update:a(function(e){return {digest:a(function(){return typeof e==
"string"?$e.hashStr(e):$e.hashByteArray(e)},"digest")}},"update")};throw new Error(
`Hash type '${r}' not supported`)}function Ko(r,e){if(r!=="sha256")throw new Error(
`Only sha256 is supported (requested: '${r}')`);return {update:a(function(t){return {
digest:a(function(){typeof e=="string"&&(e=new TextEncoder().encode(e)),typeof t==
"string"&&(t=new TextEncoder().encode(t));let n=e.length;if(n>64)e=Ge(e);else if(n<
64){let c=new Uint8Array(64);c.set(e),e=c;}let i=new Uint8Array(64),s=new Uint8Array(
64);for(let c=0;c<64;c++)i[c]=54^e[c],s[c]=92^e[c];let o=new Uint8Array(t.length+
64);o.set(i,0),o.set(t,64);let u=new Uint8Array(96);return u.set(s,0),u.set(Ge(o),
64),d.from(Ge(u))},"digest")}},"update")}}var Nt=z(()=>{p();ni();ii();
a($o,"randomBytes");a(Vo,"createHash");a(Ko,"createHmac");});var Qt=T(si=>{p();si.parse=function(r,e){return new qt(r,e).parse()};
var ut=class ut{constructor(e,t){this.source=e,this.transform=t||zo,this.position=
0,this.entries=[],this.recorded=[],this.dimension=0;}isEof(){return this.position>=
this.source.length}nextCharacter(){var e=this.source[this.position++];return e===
"\\"?{value:this.source[this.position++],escaped:!0}:{value:e,escaped:!1}}record(e){
this.recorded.push(e);}newEntry(e){var t;(this.recorded.length>0||e)&&(t=this.recorded.
join(""),t==="NULL"&&!e&&(t=null),t!==null&&(t=this.transform(t)),this.entries.push(
t),this.recorded=[]);}consumeDimensions(){if(this.source[0]==="[")for(;!this.isEof();){
var e=this.nextCharacter();if(e.value==="=")break}}parse(e){var t,n,i;for(this.consumeDimensions();!this.
isEof();)if(t=this.nextCharacter(),t.value==="{"&&!i)this.dimension++,this.dimension>
1&&(n=new ut(this.source.substr(this.position-1),this.transform),this.entries.push(
n.parse(!0)),this.position+=n.position-2);else if(t.value==="}"&&!i){if(this.dimension--,
!this.dimension&&(this.newEntry(),e))return this.entries}else t.value==='"'&&!t.
escaped?(i&&this.newEntry(!0),i=!i):t.value===","&&!i?this.newEntry():this.record(
t.value);if(this.dimension!==0)throw new Error("array dimension not balanced");return this.
entries}};a(ut,"ArrayParser");var qt=ut;function zo(r){return r}a(zo,"identity");});var Wt=T((yh,oi)=>{p();var Yo=Qt();oi.exports={create:a(function(r,e){return {parse:a(
function(){return Yo.parse(r,e)},"parse")}},"create")};});var ci=T((wh,ui)=>{p();var Zo=/(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/,
Jo=/^(\d{1,})-(\d{2})-(\d{2})( BC)?$/,Xo=/([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/,ea=/^-?infinity$/;
ui.exports=a(function(e){if(ea.test(e))return Number(e.replace("i","I"));var t=Zo.
exec(e);if(!t)return ta(e)||null;var n=!!t[8],i=parseInt(t[1],10);n&&(i=ai(i));var s=parseInt(
t[2],10)-1,o=t[3],u=parseInt(t[4],10),c=parseInt(t[5],10),h=parseInt(t[6],10),l=t[7];
l=l?1e3*parseFloat(l):0;var y,x=ra(e);return x!=null?(y=new Date(Date.UTC(i,s,o,
u,c,h,l)),jt(i)&&y.setUTCFullYear(i),x!==0&&y.setTime(y.getTime()-x)):(y=new Date(
i,s,o,u,c,h,l),jt(i)&&y.setFullYear(i)),y},"parseDate");function ta(r){var e=Jo.
exec(r);if(e){var t=parseInt(e[1],10),n=!!e[4];n&&(t=ai(t));var i=parseInt(e[2],
10)-1,s=e[3],o=new Date(t,i,s);return jt(t)&&o.setFullYear(t),o}}a(ta,"getDate");
function ra(r){if(r.endsWith("+00"))return 0;var e=Xo.exec(r.split(" ")[1]);if(e){
var t=e[1];if(t==="Z")return 0;var n=t==="-"?-1:1,i=parseInt(e[2],10)*3600+parseInt(
e[3]||0,10)*60+parseInt(e[4]||0,10);return i*n*1e3}}a(ra,"timeZoneOffset");function ai(r){
return -(r-1)}a(ai,"bcYearToNegativeYear");function jt(r){return r>=0&&r<100}a(jt,
"is0To99");});var li=T((xh,hi)=>{p();hi.exports=ia;var na=Object.prototype.hasOwnProperty;function ia(r){
for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)na.call(t,
n)&&(r[n]=t[n]);}return r}a(ia,"extend");});var di=T((_h,pi)=>{p();var sa=li();pi.exports=Fe;function Fe(r){if(!(this instanceof
Fe))return new Fe(r);sa(this,ga(r));}a(Fe,"PostgresInterval");var oa=["seconds","\
minutes","hours","days","months","years"];Fe.prototype.toPostgres=function(){var r=oa.
filter(this.hasOwnProperty,this);return this.milliseconds&&r.indexOf("seconds")<
0&&r.push("seconds"),r.length===0?"0":r.map(function(e){var t=this[e]||0;return e===
"seconds"&&this.milliseconds&&(t=(t+this.milliseconds/1e3).toFixed(6).replace(/\.?0+$/,
"")),t+" "+e},this).join(" ")};var aa={years:"Y",months:"M",days:"D",hours:"H",minutes:"\
M",seconds:"S"},ua=["years","months","days"],ca=["hours","minutes","seconds"];Fe.
prototype.toISOString=Fe.prototype.toISO=function(){var r=ua.map(t,this).join(""),
e=ca.map(t,this).join("");return "P"+r+"T"+e;function t(n){var i=this[n]||0;return n===
"seconds"&&this.milliseconds&&(i=(i+this.milliseconds/1e3).toFixed(6).replace(/0+$/,
"")),i+aa[n]}};var Ht="([+-]?\\d+)",ha=Ht+"\\s+years?",la=Ht+"\\s+mons?",fa=Ht+"\
\\s+days?",pa="([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?",da=new RegExp([
ha,la,fa,pa].map(function(r){return "("+r+")?"}).join("\\s*")),fi={years:2,months:4,
days:6,hours:9,minutes:10,seconds:11,milliseconds:12},ya=["hours","minutes","sec\
onds","milliseconds"];function ma(r){var e=r+"000000".slice(r.length);return parseInt(
e,10)/1e3}a(ma,"parseMilliseconds");function ga(r){if(!r)return {};var e=da.exec(
r),t=e[8]==="-";return Object.keys(fi).reduce(function(n,i){var s=fi[i],o=e[s];return !o||
(o=i==="milliseconds"?ma(o):parseInt(o,10),!o)||(t&&~ya.indexOf(i)&&(o*=-1),n[i]=
o),n},{})}a(ga,"parse");});var mi=T((Ih,yi)=>{p();yi.exports=a(function(e){if(/^\\x/.test(e))return new d(
e.substr(2),"hex");for(var t="",n=0;n<e.length;)if(e[n]!=="\\")t+=e[n],++n;else if(/[0-7]{3}/.
test(e.substr(n+1,3)))t+=String.fromCharCode(parseInt(e.substr(n+1,3),8)),n+=4;else {
for(var i=1;n+i<e.length&&e[n+i]==="\\";)i++;for(var s=0;s<Math.floor(i/2);++s)t+=
"\\";n+=Math.floor(i/2)*2;}return new d(t,"binary")},"parseBytea");});var Ei=T((Bh,vi)=>{p();var Ve=Qt(),Ke=Wt(),ct=ci(),wi=di(),bi=mi();function ht(r){
return a(function(t){return t===null?t:r(t)},"nullAllowed")}a(ht,"allowNull");function Si(r){
return r===null?r:r==="TRUE"||r==="t"||r==="true"||r==="y"||r==="yes"||r==="on"||
r==="1"}a(Si,"parseBool");function wa(r){return r?Ve.parse(r,Si):null}a(wa,"pars\
eBoolArray");function ba(r){return parseInt(r,10)}a(ba,"parseBaseTenInt");function Gt(r){
return r?Ve.parse(r,ht(ba)):null}a(Gt,"parseIntegerArray");function Sa(r){return r?
Ve.parse(r,ht(function(e){return xi(e).trim()})):null}a(Sa,"parseBigIntegerArray");
var xa=a(function(r){if(!r)return null;var e=Ke.create(r,function(t){return t!==
null&&(t=zt(t)),t});return e.parse()},"parsePointArray"),$t=a(function(r){if(!r)
return null;var e=Ke.create(r,function(t){return t!==null&&(t=parseFloat(t)),t});
return e.parse()},"parseFloatArray"),re=a(function(r){if(!r)return null;var e=Ke.
create(r);return e.parse()},"parseStringArray"),Vt=a(function(r){if(!r)return null;
var e=Ke.create(r,function(t){return t!==null&&(t=ct(t)),t});return e.parse()},"\
parseDateArray"),va=a(function(r){if(!r)return null;var e=Ke.create(r,function(t){
return t!==null&&(t=wi(t)),t});return e.parse()},"parseIntervalArray"),Ea=a(function(r){
return r?Ve.parse(r,ht(bi)):null},"parseByteAArray"),Kt=a(function(r){return parseInt(
r,10)},"parseInteger"),xi=a(function(r){var e=String(r);return /^\d+$/.test(e)?e:
r},"parseBigInteger"),gi=a(function(r){return r?Ve.parse(r,ht(JSON.parse)):null},
"parseJsonArray"),zt=a(function(r){return r[0]!=="("?null:(r=r.substring(1,r.length-
1).split(","),{x:parseFloat(r[0]),y:parseFloat(r[1])})},"parsePoint"),_a=a(function(r){
if(r[0]!=="<"&&r[1]!=="(")return null;for(var e="(",t="",n=!1,i=2;i<r.length-1;i++){
if(n||(e+=r[i]),r[i]===")"){n=!0;continue}else if(!n)continue;r[i]!==","&&(t+=r[i]);}
var s=zt(e);return s.radius=parseFloat(t),s},"parseCircle"),Aa=a(function(r){r(20,
xi),r(21,Kt),r(23,Kt),r(26,Kt),r(700,parseFloat),r(701,parseFloat),r(16,Si),r(1082,
ct),r(1114,ct),r(1184,ct),r(600,zt),r(651,re),r(718,_a),r(1e3,wa),r(1001,Ea),r(1005,
Gt),r(1007,Gt),r(1028,Gt),r(1016,Sa),r(1017,xa),r(1021,$t),r(1022,$t),r(1231,$t),
r(1014,re),r(1015,re),r(1008,re),r(1009,re),r(1040,re),r(1041,re),r(1115,Vt),r(1182,
Vt),r(1185,Vt),r(1186,wi),r(1187,va),r(17,bi),r(114,JSON.parse.bind(JSON)),r(3802,
JSON.parse.bind(JSON)),r(199,gi),r(3807,gi),r(3907,re),r(2951,re),r(791,re),r(1183,
re),r(1270,re);},"init");vi.exports={init:Aa};});var Ai=T((Fh,_i)=>{p();var Z=1e6;function Ca(r){var e=r.readInt32BE(
0),t=r.readUInt32BE(4),n="";e<0&&(e=~e+(t===0),t=~t+1>>>0,n="-");var i="",s,o,u,
c,h,l;{if(s=e%Z,e=e/Z>>>0,o=4294967296*s+t,t=o/Z>>>0,u=""+(o-Z*t),t===0&&e===0)return n+
u+i;for(c="",h=6-u.length,l=0;l<h;l++)c+="0";i=c+u+i;}{if(s=e%Z,e=e/Z>>>0,o=4294967296*
s+t,t=o/Z>>>0,u=""+(o-Z*t),t===0&&e===0)return n+u+i;for(c="",h=6-u.length,l=0;l<
h;l++)c+="0";i=c+u+i;}{if(s=e%Z,e=e/Z>>>0,o=4294967296*s+t,t=o/Z>>>0,u=""+(o-Z*t),
t===0&&e===0)return n+u+i;for(c="",h=6-u.length,l=0;l<h;l++)c+="0";i=c+u+i;}return s=
e%Z,o=4294967296*s+t,u=""+o%Z,n+u+i}a(Ca,"readInt8");_i.exports=Ca;});var Bi=T((kh,Pi)=>{p();var Ia=Ai(),F=a(function(r,e,t,n,i){t=t||0,n=n||!1,i=i||function(C,B,W){
return C*Math.pow(2,W)+B};var s=t>>3,o=a(function(C){return n?~C&255:C},"inv"),u=255,
c=8-t%8;e<c&&(u=255<<8-e&255,c=e),t&&(u=u>>t%8);var h=0;t%8+e>=8&&(h=i(0,o(r[s])&
u,c));for(var l=e+t>>3,y=s+1;y<l;y++)h=i(h,o(r[y]),8);var x=(e+t)%8;return x>0&&
(h=i(h,o(r[l])>>8-x,x)),h},"parseBits"),Ti=a(function(r,e,t){var n=Math.pow(2,t-
1)-1,i=F(r,1),s=F(r,t,1);if(s===0)return 0;var o=1,u=a(function(h,l,y){h===0&&(h=
1);for(var x=1;x<=y;x++)o/=2,(l&1<<y-x)>0&&(h+=o);return h},"parsePrecisionBits"),
c=F(r,e,t+1,!1,u);return s==Math.pow(2,t+1)-1?c===0?i===0?1/0:-1/0:NaN:(i===0?1:
-1)*Math.pow(2,s-n)*c},"parseFloatFromBits"),Ta=a(function(r){return F(r,1)==1?-1*
(F(r,15,1,!0)+1):F(r,15,1)},"parseInt16"),Ci=a(function(r){return F(r,1)==1?-1*(F(
r,31,1,!0)+1):F(r,31,1)},"parseInt32"),Pa=a(function(r){return Ti(r,23,8)},"pars\
eFloat32"),Ba=a(function(r){return Ti(r,52,11)},"parseFloat64"),La=a(function(r){
var e=F(r,16,32);if(e==49152)return NaN;for(var t=Math.pow(1e4,F(r,16,16)),n=0,i=[],
s=F(r,16),o=0;o<s;o++)n+=F(r,16,64+16*o)*t,t/=1e4;var u=Math.pow(10,F(r,16,48));
return (e===0?1:-1)*Math.round(n*u)/u},"parseNumeric"),Ii=a(function(r,e){var t=F(
e,1),n=F(e,63,1),i=new Date((t===0?1:-1)*n/1e3+9466848e5);return r||i.setTime(i.
getTime()+i.getTimezoneOffset()*6e4),i.usec=n%1e3,i.getMicroSeconds=function(){return this.
usec},i.setMicroSeconds=function(s){this.usec=s;},i.getUTCMicroSeconds=function(){
return this.usec},i},"parseDate"),ze=a(function(r){for(var e=F(r,32),t=F(r,32,32),
n=F(r,32,64),i=96,s=[],o=0;o<e;o++)s[o]=F(r,32,i),i+=32,i+=32;var u=a(function(h){
var l=F(r,32,i);if(i+=32,l==4294967295)return null;var y;if(h==23||h==20)return y=
F(r,l*8,i),i+=l*8,y;if(h==25)return y=r.toString(this.encoding,i>>3,(i+=l<<3)>>3),
y;console.log("ERROR: ElementType not implemented: "+h);},"parseElement"),c=a(function(h,l){
var y=[],x;if(h.length>1){var C=h.shift();for(x=0;x<C;x++)y[x]=c(h,l);h.unshift(
C);}else for(x=0;x<h[0];x++)y[x]=u(l);return y},"parse");return c(s,n)},"parseArr\
ay"),Ra=a(function(r){return r.toString("utf8")},"parseText"),Fa=a(function(r){return r===
null?null:F(r,8)>0},"parseBool"),Ma=a(function(r){r(20,Ia),r(21,Ta),r(23,Ci),r(26,
Ci),r(1700,La),r(700,Pa),r(701,Ba),r(16,Fa),r(1114,Ii.bind(null,!1)),r(1184,Ii.bind(
null,!0)),r(1e3,ze),r(1007,ze),r(1016,ze),r(1008,ze),r(1009,ze),r(25,Ra);},"init");
Pi.exports={init:Ma};});var Ri=T((Nh,Li)=>{p();Li.exports={BOOL:16,BYTEA:17,CHAR:18,INT8:20,INT2:21,INT4:23,
REGPROC:24,TEXT:25,OID:26,TID:27,XID:28,CID:29,JSON:114,XML:142,PG_NODE_TREE:194,
SMGR:210,PATH:602,POLYGON:604,CIDR:650,FLOAT4:700,FLOAT8:701,ABSTIME:702,RELTIME:703,
TINTERVAL:704,CIRCLE:718,MACADDR8:774,MONEY:790,MACADDR:829,INET:869,ACLITEM:1033,
BPCHAR:1042,VARCHAR:1043,DATE:1082,TIME:1083,TIMESTAMP:1114,TIMESTAMPTZ:1184,INTERVAL:1186,
TIMETZ:1266,BIT:1560,VARBIT:1562,NUMERIC:1700,REFCURSOR:1790,REGPROCEDURE:2202,REGOPER:2203,
REGOPERATOR:2204,REGCLASS:2205,REGTYPE:2206,UUID:2950,TXID_SNAPSHOT:2970,PG_LSN:3220,
PG_NDISTINCT:3361,PG_DEPENDENCIES:3402,TSVECTOR:3614,TSQUERY:3615,GTSVECTOR:3642,
REGCONFIG:3734,REGDICTIONARY:3769,JSONB:3802,REGNAMESPACE:4089,REGROLE:4096};});var Je=T(Ze=>{p();var Da=Ei(),ka=Bi(),Ua=Wt(),Oa=Ri();Ze.getTypeParser=Na;Ze.setTypeParser=
qa;Ze.arrayParser=Ua;Ze.builtins=Oa;var Ye={text:{},binary:{}};function Fi(r){return String(
r)}a(Fi,"noParse");function Na(r,e){return e=e||"text",Ye[e]&&Ye[e][r]||Fi}a(Na,
"getTypeParser");function qa(r,e,t){typeof e=="function"&&(t=e,e="text"),Ye[e][r]=
t;}a(qa,"setTypeParser");Da.init(function(r,e){Ye.text[r]=e;});ka.init(function(r,e){
Ye.binary[r]=e;});});var Xe=T((Hh,Yt)=>{p();Yt.exports={host:"localhost",user:m.platform===
"win32"?m.env.USERNAME:m.env.USER,database:void 0,password:null,connectionString:void 0,
port:5432,rows:0,binary:!1,max:10,idleTimeoutMillis:3e4,client_encoding:"",ssl:!1,
application_name:void 0,fallback_application_name:void 0,options:void 0,parseInputDatesAsUTC:!1,
statement_timeout:!1,lock_timeout:!1,idle_in_transaction_session_timeout:!1,query_timeout:!1,
connect_timeout:0,keepalives:1,keepalives_idle:0};var Me=Je(),Qa=Me.getTypeParser(
20,"text"),Wa=Me.getTypeParser(1016,"text");Yt.exports.__defineSetter__("parseIn\
t8",function(r){Me.setTypeParser(20,"text",r?Me.getTypeParser(23,"text"):Qa),Me.
setTypeParser(1016,"text",r?Me.getTypeParser(1007,"text"):Wa);});});var et=T(($h,Di)=>{p();var ja=(Nt(),N(Ot)),Ha=Xe();function Ga(r){var e=r.
replace(/\\/g,"\\\\").replace(/"/g,'\\"');return '"'+e+'"'}a(Ga,"escapeElement");
function Mi(r){for(var e="{",t=0;t<r.length;t++)t>0&&(e=e+","),r[t]===null||typeof r[t]>
"u"?e=e+"NULL":Array.isArray(r[t])?e=e+Mi(r[t]):r[t]instanceof d?e+="\\\\x"+r[t].
toString("hex"):e+=Ga(lt(r[t]));return e=e+"}",e}a(Mi,"arrayString");var lt=a(function(r,e){
if(r==null)return null;if(r instanceof d)return r;if(ArrayBuffer.isView(r)){var t=d.
from(r.buffer,r.byteOffset,r.byteLength);return t.length===r.byteLength?t:t.slice(
r.byteOffset,r.byteOffset+r.byteLength)}return r instanceof Date?Ha.parseInputDatesAsUTC?
Ka(r):Va(r):Array.isArray(r)?Mi(r):typeof r=="object"?$a(r,e):r.toString()},"pre\
pareValue");function $a(r,e){if(r&&typeof r.toPostgres=="function"){if(e=e||[],e.
indexOf(r)!==-1)throw new Error('circular reference detected while preparing "'+
r+'" for query');return e.push(r),lt(r.toPostgres(lt),e)}return JSON.stringify(r)}
a($a,"prepareObject");function H(r,e){for(r=""+r;r.length<e;)r="0"+r;return r}a(
H,"pad");function Va(r){var e=-r.getTimezoneOffset(),t=r.getFullYear(),n=t<1;n&&
(t=Math.abs(t)+1);var i=H(t,4)+"-"+H(r.getMonth()+1,2)+"-"+H(r.getDate(),2)+"T"+
H(r.getHours(),2)+":"+H(r.getMinutes(),2)+":"+H(r.getSeconds(),2)+"."+H(r.getMilliseconds(),
3);return e<0?(i+="-",e*=-1):i+="+",i+=H(Math.floor(e/60),2)+":"+H(e%60,2),n&&(i+=
" BC"),i}a(Va,"dateToString");function Ka(r){var e=r.getUTCFullYear(),t=e<1;t&&(e=
Math.abs(e)+1);var n=H(e,4)+"-"+H(r.getUTCMonth()+1,2)+"-"+H(r.getUTCDate(),2)+"\
T"+H(r.getUTCHours(),2)+":"+H(r.getUTCMinutes(),2)+":"+H(r.getUTCSeconds(),2)+"."+
H(r.getUTCMilliseconds(),3);return n+="+00:00",t&&(n+=" BC"),n}a(Ka,"dateToStrin\
gUTC");function za(r,e,t){return r=typeof r=="string"?{text:r}:r,e&&(typeof e=="\
function"?r.callback=e:r.values=e),t&&(r.callback=t),r}a(za,"normalizeQueryConfi\
g");var Zt=a(function(r){return ja.createHash("md5").update(r,"utf-8").digest("h\
ex")},"md5"),Ya=a(function(r,e,t){var n=Zt(e+r),i=Zt(d.concat([d.from(n),t]));return "\
md5"+i},"postgresMd5PasswordHash");Di.exports={prepareValue:a(function(e){return lt(
e)},"prepareValueWrapper"),normalizeQueryConfig:za,postgresMd5PasswordHash:Ya,md5:Zt};});var qi=T((zh,Ni)=>{p();var Jt=(Nt(),N(Ot));function Za(r){if(r.indexOf(
"SCRAM-SHA-256")===-1)throw new Error("SASL: Only mechanism SCRAM-SHA-256 is cur\
rently supported");let e=Jt.randomBytes(18).toString("base64");return {mechanism:"\
SCRAM-SHA-256",clientNonce:e,response:"n,,n=*,r="+e,message:"SASLInitialResponse"}}
a(Za,"startSession");function Ja(r,e,t){if(r.message!=="SASLInitialResponse")throw new Error(
"SASL: Last message was not SASLInitialResponse");if(typeof e!="string")throw new Error(
"SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");if(typeof t!=
"string")throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a\
 string");let n=tu(t);if(n.nonce.startsWith(r.clientNonce)){if(n.nonce.length===
r.clientNonce.length)throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server n\
once is too short")}else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serv\
er nonce does not start with client nonce");var i=d.from(n.salt,"base64"),s=iu(e,
i,n.iteration),o=De(s,"Client Key"),u=nu(o),c="n=*,r="+r.clientNonce,h="r="+n.nonce+
",s="+n.salt+",i="+n.iteration,l="c=biws,r="+n.nonce,y=c+","+h+","+l,x=De(u,y),C=Oi(
o,x),B=C.toString("base64"),W=De(s,"Server Key"),X=De(W,y);r.message="SASLRespon\
se",r.serverSignature=X.toString("base64"),r.response=l+",p="+B;}a(Ja,"continueSe\
ssion");function Xa(r,e){if(r.message!=="SASLResponse")throw new Error("SASL: La\
st message was not SASLResponse");if(typeof e!="string")throw new Error("SASL: S\
CRAM-SERVER-FINAL-MESSAGE: serverData must be a string");let{serverSignature:t}=ru(
e);if(t!==r.serverSignature)throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: s\
erver signature does not match")}a(Xa,"finalizeSession");function eu(r){if(typeof r!=
"string")throw new TypeError("SASL: text must be a string");return r.split("").map(
(e,t)=>r.charCodeAt(t)).every(e=>e>=33&&e<=43||e>=45&&e<=126)}a(eu,"isPrintableC\
hars");function ki(r){return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.
test(r)}a(ki,"isBase64");function Ui(r){if(typeof r!="string")throw new TypeError(
"SASL: attribute pairs text must be a string");return new Map(r.split(",").map(e=>{
if(!/^.=/.test(e))throw new Error("SASL: Invalid attribute pair entry");let t=e[0],
n=e.substring(2);return [t,n]}))}a(Ui,"parseAttributePairs");function tu(r){let e=Ui(
r),t=e.get("r");if(t){if(!eu(t))throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAG\
E: nonce must only contain printable characters")}else throw new Error("SASL: SC\
RAM-SERVER-FIRST-MESSAGE: nonce missing");let n=e.get("s");if(n){if(!ki(n))throw new Error(
"SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64")}else throw new Error("S\
ASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");let i=e.get("i");if(i){if(!/^[1-9][0-9]*$/.
test(i))throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration cou\
nt")}else throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
let s=parseInt(i,10);return {nonce:t,salt:n,iteration:s}}a(tu,"parseServerFirstMe\
ssage");function ru(r){let t=Ui(r).get("v");if(t){if(!ki(t))throw new Error("SAS\
L: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64")}else throw new Error(
"SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");return {serverSignature:t}}
a(ru,"parseServerFinalMessage");function Oi(r,e){if(!d.isBuffer(r))throw new TypeError(
"first argument must be a Buffer");if(!d.isBuffer(e))throw new TypeError("second\
 argument must be a Buffer");if(r.length!==e.length)throw new Error("Buffer leng\
ths must match");if(r.length===0)throw new Error("Buffers cannot be empty");return d.
from(r.map((t,n)=>r[n]^e[n]))}a(Oi,"xorBuffers");function nu(r){return Jt.createHash(
"sha256").update(r).digest()}a(nu,"sha256");function De(r,e){return Jt.createHmac(
"sha256",r).update(e).digest()}a(De,"hmacSha256");function iu(r,e,t){for(var n=De(
r,d.concat([e,d.from([0,0,0,1])])),i=n,s=0;s<t-1;s++)n=De(r,n),i=Oi(i,n);return i}
a(iu,"Hi");Ni.exports={startSession:Za,continueSession:Ja,finalizeSession:Xa};});var Xt={};ie(Xt,{join:()=>su});function su(...r){return r.join("/")}var er=z(()=>{
p();a(su,"join");});var tr={};ie(tr,{stat:()=>ou});function ou(r,e){e(new Error("No filesystem"));}var rr=z(
()=>{p();a(ou,"stat");});var nr={};ie(nr,{default:()=>au});var au,ir=z(()=>{p();au={};});var Qi={};ie(Qi,{StringDecoder:()=>sr});var or,sr,Wi=z(()=>{p();or=
class or{constructor(e){_(this,"td");this.td=new TextDecoder(e);}write(e){return this.
td.decode(e,{stream:!0})}end(e){return this.td.decode(e)}};a(or,"StringDecoder");
sr=or;});var $i=T((sl,Gi)=>{p();var{Transform:uu}=(ir(),N(nr)),{StringDecoder:cu}=(Wi(),N(Qi)),
be=Symbol("last"),ft=Symbol("decoder");function hu(r,e,t){let n;if(this.overflow){
if(n=this[ft].write(r).split(this.matcher),n.length===1)return t();n.shift(),this.
overflow=!1;}else this[be]+=this[ft].write(r),n=this[be].split(this.matcher);this[be]=
n.pop();for(let i=0;i<n.length;i++)try{Hi(this,this.mapper(n[i]));}catch(s){return t(
s)}if(this.overflow=this[be].length>this.maxLength,this.overflow&&!this.skipOverflow){
t(new Error("maximum buffer reached"));return}t();}a(hu,"transform");function lu(r){
if(this[be]+=this[ft].end(),this[be])try{Hi(this,this.mapper(this[be]));}catch(e){
return r(e)}r();}a(lu,"flush");function Hi(r,e){e!==void 0&&r.push(e);}a(Hi,"push");
function ji(r){return r}a(ji,"noop");function fu(r,e,t){switch(r=r||/\r?\n/,e=e||
ji,t=t||{},arguments.length){case 1:typeof r=="function"?(e=r,r=/\r?\n/):typeof r==
"object"&&!(r instanceof RegExp)&&!r[Symbol.split]&&(t=r,r=/\r?\n/);break;case 2:
typeof r=="function"?(t=e,e=r,r=/\r?\n/):typeof e=="object"&&(t=e,e=ji);}t=Object.
assign({},t),t.autoDestroy=!0,t.transform=hu,t.flush=lu,t.readableObjectMode=!0;
let n=new uu(t);return n[be]="",n[ft]=new cu("utf8"),n.matcher=r,n.mapper=e,n.maxLength=
t.maxLength,n.skipOverflow=t.skipOverflow||!1,n.overflow=!1,n._destroy=function(i,s){
this._writableState.errorEmitted=!1,s(i);},n}a(fu,"split");Gi.exports=fu;});var zi=T((ul,pe)=>{p();var Vi=(er(),N(Xt)),pu=(ir(),N(nr)).Stream,du=$i(),
Ki=(He(),N(je)),yu=5432,pt=m.platform==="win32",tt=m.stderr,mu=56,gu=7,wu=61440,
bu=32768;function Su(r){return (r&wu)==bu}a(Su,"isRegFile");var ke=["host","port",
"database","user","password"],ar=ke.length,xu=ke[ar-1];function ur(){var r=tt instanceof
pu&&tt.writable===!0;if(r){var e=Array.prototype.slice.call(arguments).concat(`
`);tt.write(Ki.format.apply(Ki,e));}}a(ur,"warn");Object.defineProperty(pe.exports,
"isWin",{get:a(function(){return pt},"get"),set:a(function(r){pt=r;},"set")});pe.
exports.warnTo=function(r){var e=tt;return tt=r,e};pe.exports.getFileName=function(r){
var e=r||m.env,t=e.PGPASSFILE||(pt?Vi.join(e.APPDATA||"./","postgresql","pgpass.\
conf"):Vi.join(e.HOME||"./",".pgpass"));return t};pe.exports.usePgPass=function(r,e){
return Object.prototype.hasOwnProperty.call(m.env,"PGPASSWORD")?!1:pt?!0:(e=e||"\
<unkn>",Su(r.mode)?r.mode&(mu|gu)?(ur('WARNING: password file "%s" has group or \
world access; permissions should be u=rw (0600) or less',e),!1):!0:(ur('WARNING:\
 password file "%s" is not a plain file',e),!1))};var vu=pe.exports.match=function(r,e){
return ke.slice(0,-1).reduce(function(t,n,i){return i==1&&Number(r[n]||yu)===Number(
e[n])?t&&!0:t&&(e[n]==="*"||e[n]===r[n])},!0)};pe.exports.getPassword=function(r,e,t){
var n,i=e.pipe(du());function s(c){var h=Eu(c);h&&_u(h)&&vu(r,h)&&(n=h[xu],i.end());}
a(s,"onLine");var o=a(function(){e.destroy(),t(n);},"onEnd"),u=a(function(c){e.destroy(),
ur("WARNING: error on reading file: %s",c),t(void 0);},"onErr");e.on("error",u),i.
on("data",s).on("end",o).on("error",u);};var Eu=pe.exports.parseLine=function(r){
if(r.length<11||r.match(/^\s+#/))return null;for(var e="",t="",n=0,i=0,s=0,o={},
u=!1,c=a(function(l,y,x){var C=r.substring(y,x);Object.hasOwnProperty.call(m.env,
"PGPASS_NO_DEESCAPE")||(C=C.replace(/\\([:\\])/g,"$1")),o[ke[l]]=C;},"addToObj"),
h=0;h<r.length-1;h+=1){if(e=r.charAt(h+1),t=r.charAt(h),u=n==ar-1,u){c(n,i);break}
h>=0&&e==":"&&t!=="\\"&&(c(n,i,h+1),i=h+2,n+=1);}return o=Object.keys(o).length===
ar?o:null,o},_u=pe.exports.isValidEntry=function(r){for(var e={0:function(o){return o.
length>0},1:function(o){return o==="*"?!0:(o=Number(o),isFinite(o)&&o>0&&o<9007199254740992&&
Math.floor(o)===o)},2:function(o){return o.length>0},3:function(o){return o.length>
0},4:function(o){return o.length>0}},t=0;t<ke.length;t+=1){var n=e[t],i=r[ke[t]]||
"",s=n(i);if(!s)return !1}return !0};});var Zi=T((fl,cr)=>{p();(er(),N(Xt));var Yi=(rr(),N(tr)),dt=zi();
cr.exports=function(r,e){var t=dt.getFileName();Yi.stat(t,function(n,i){if(n||!dt.
usePgPass(i,t))return e(void 0);var s=Yi.createReadStream(t);dt.getPassword(r,s,
e);});};cr.exports.warnTo=dt.warnTo;});var hr=T((dl,Ji)=>{p();var Au=Je();function yt(r){this._types=r||Au,
this.text={},this.binary={};}a(yt,"TypeOverrides");yt.prototype.getOverrides=function(r){
switch(r){case"text":return this.text;case"binary":return this.binary;default:return {}}};
yt.prototype.setTypeParser=function(r,e,t){typeof e=="function"&&(t=e,e="text"),
this.getOverrides(e)[r]=t;};yt.prototype.getTypeParser=function(r,e){return e=e||
"text",this.getOverrides(e)[r]||this._types.getTypeParser(r,e)};Ji.exports=yt;});var Xi={};ie(Xi,{default:()=>Cu});var Cu,es=z(()=>{p();Cu={};});var ts={};ie(ts,{parse:()=>lr});function lr(r,e=!1){let{protocol:t}=new URL(r),n="\
http:"+r.substring(t.length),{username:i,password:s,host:o,hostname:u,port:c,pathname:h,
search:l,searchParams:y,hash:x}=new URL(n);s=decodeURIComponent(s),i=decodeURIComponent(
i),h=decodeURIComponent(h);let C=i+":"+s,B=e?Object.fromEntries(y.entries()):l;return {
href:r,protocol:t,auth:C,username:i,password:s,host:o,hostname:u,port:c,pathname:h,
search:l,query:B,hash:x}}var fr=z(()=>{p();a(lr,"parse");});var ns=T((Sl,rs)=>{p();var Iu=(fr(),N(ts)),pr=(rr(),N(tr));function dr(r){
if(r.charAt(0)==="/"){var t=r.split(" ");return {host:t[0],database:t[1]}}var e=Iu.
parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r)?encodeURI(r).replace(/\%25(\d\d)/g,
"%$1"):r,!0),t=e.query;for(var n in t)Array.isArray(t[n])&&(t[n]=t[n][t[n].length-
1]);var i=(e.auth||":").split(":");if(t.user=i[0],t.password=i.splice(1).join(":"),
t.port=e.port,e.protocol=="socket:")return t.host=decodeURI(e.pathname),t.database=
e.query.db,t.client_encoding=e.query.encoding,t;t.host||(t.host=e.hostname);var s=e.
pathname;if(!t.host&&s&&/^%2f/i.test(s)){var o=s.split("/");t.host=decodeURIComponent(
o[0]),s=o.splice(1).join("/");}switch(s&&s.charAt(0)==="/"&&(s=s.slice(1)||null),
t.database=s&&decodeURI(s),(t.ssl==="true"||t.ssl==="1")&&(t.ssl=!0),t.ssl==="0"&&
(t.ssl=!1),(t.sslcert||t.sslkey||t.sslrootcert||t.sslmode)&&(t.ssl={}),t.sslcert&&
(t.ssl.cert=pr.readFileSync(t.sslcert).toString()),t.sslkey&&(t.ssl.key=pr.readFileSync(
t.sslkey).toString()),t.sslrootcert&&(t.ssl.ca=pr.readFileSync(t.sslrootcert).toString()),
t.sslmode){case"disable":{t.ssl=!1;break}case"prefer":case"require":case"verify-\
ca":case"verify-full":break;case"no-verify":{t.ssl.rejectUnauthorized=!1;break}}
return t}a(dr,"parse");rs.exports=dr;dr.parse=dr;});var mt=T((El,os)=>{p();var Tu=(es(),N(Xi)),ss=Xe(),is=ns().parse,$=a(
function(r,e,t){return t===void 0?t=m.env["PG"+r.toUpperCase()]:t===!1||(t=m.env[t]),
e[r]||t||ss[r]},"val"),Pu=a(function(){switch(m.env.PGSSLMODE){case"disable":return !1;case"\
prefer":case"require":case"verify-ca":case"verify-full":return !0;case"no-verify":
return {rejectUnauthorized:!1}}return ss.ssl},"readSSLConfigFromEnvironment"),Ue=a(
function(r){return "'"+(""+r).replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"'"},"quo\
teParamValue"),ne=a(function(r,e,t){var n=e[t];n!=null&&r.push(t+"="+Ue(n));},"ad\
d"),mr=class mr{constructor(e){e=typeof e=="string"?is(e):e||{},e.connectionString&&
(e=Object.assign({},e,is(e.connectionString))),this.user=$("user",e),this.database=
$("database",e),this.database===void 0&&(this.database=this.user),this.port=parseInt(
$("port",e),10),this.host=$("host",e),Object.defineProperty(this,"password",{configurable:!0,
enumerable:!1,writable:!0,value:$("password",e)}),this.binary=$("binary",e),this.
options=$("options",e),this.ssl=typeof e.ssl>"u"?Pu():e.ssl,typeof this.ssl=="st\
ring"&&this.ssl==="true"&&(this.ssl=!0),this.ssl==="no-verify"&&(this.ssl={rejectUnauthorized:!1}),
this.ssl&&this.ssl.key&&Object.defineProperty(this.ssl,"key",{enumerable:!1}),this.
client_encoding=$("client_encoding",e),this.replication=$("replication",e),this.
isDomainSocket=!(this.host||"").indexOf("/"),this.application_name=$("applicatio\
n_name",e,"PGAPPNAME"),this.fallback_application_name=$("fallback_application_na\
me",e,!1),this.statement_timeout=$("statement_timeout",e,!1),this.lock_timeout=$(
"lock_timeout",e,!1),this.idle_in_transaction_session_timeout=$("idle_in_transac\
tion_session_timeout",e,!1),this.query_timeout=$("query_timeout",e,!1),e.connectionTimeoutMillis===
void 0?this.connect_timeout=m.env.PGCONNECT_TIMEOUT||0:this.connect_timeout=Math.
floor(e.connectionTimeoutMillis/1e3),e.keepAlive===!1?this.keepalives=0:e.keepAlive===
!0&&(this.keepalives=1),typeof e.keepAliveInitialDelayMillis=="number"&&(this.keepalives_idle=
Math.floor(e.keepAliveInitialDelayMillis/1e3));}getLibpqConnectionString(e){var t=[];
ne(t,this,"user"),ne(t,this,"password"),ne(t,this,"port"),ne(t,this,"application\
_name"),ne(t,this,"fallback_application_name"),ne(t,this,"connect_timeout"),ne(t,
this,"options");var n=typeof this.ssl=="object"?this.ssl:this.ssl?{sslmode:this.
ssl}:{};if(ne(t,n,"sslmode"),ne(t,n,"sslca"),ne(t,n,"sslkey"),ne(t,n,"sslcert"),
ne(t,n,"sslrootcert"),this.database&&t.push("dbname="+Ue(this.database)),this.replication&&
t.push("replication="+Ue(this.replication)),this.host&&t.push("host="+Ue(this.host)),
this.isDomainSocket)return e(null,t.join(" "));this.client_encoding&&t.push("cli\
ent_encoding="+Ue(this.client_encoding)),Tu.lookup(this.host,function(i,s){return i?
e(i,null):(t.push("hostaddr="+Ue(s)),e(null,t.join(" ")))});}};a(mr,"ConnectionPa\
rameters");var yr=mr;os.exports=yr;});var cs=T((Cl,us)=>{p();var Bu=Je(),as=/^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/,
wr=class wr{constructor(e,t){this.command=null,this.rowCount=null,this.oid=null,
this.rows=[],this.fields=[],this._parsers=void 0,this._types=t,this.RowCtor=null,
this.rowAsArray=e==="array",this.rowAsArray&&(this.parseRow=this._parseRowAsArray);}addCommandComplete(e){
var t;e.text?t=as.exec(e.text):t=as.exec(e.command),t&&(this.command=t[1],t[3]?(this.
oid=parseInt(t[2],10),this.rowCount=parseInt(t[3],10)):t[2]&&(this.rowCount=parseInt(
t[2],10)));}_parseRowAsArray(e){for(var t=new Array(e.length),n=0,i=e.length;n<i;n++){
var s=e[n];s!==null?t[n]=this._parsers[n](s):t[n]=null;}return t}parseRow(e){for(var t={},
n=0,i=e.length;n<i;n++){var s=e[n],o=this.fields[n].name;s!==null?t[o]=this._parsers[n](
s):t[o]=null;}return t}addRow(e){this.rows.push(e);}addFields(e){this.fields=e,this.
fields.length&&(this._parsers=new Array(e.length));for(var t=0;t<e.length;t++){var n=e[t];
this._types?this._parsers[t]=this._types.getTypeParser(n.dataTypeID,n.format||"t\
ext"):this._parsers[t]=Bu.getTypeParser(n.dataTypeID,n.format||"text");}}};a(wr,"\
Result");var gr=wr;us.exports=gr;});var ps=T((Pl,fs)=>{p();var{EventEmitter:Lu}=we(),hs=cs(),ls=et(),Sr=class Sr extends Lu{constructor(e,t,n){
super(),e=ls.normalizeQueryConfig(e,t,n),this.text=e.text,this.values=e.values,this.
rows=e.rows,this.types=e.types,this.name=e.name,this.binary=e.binary,this.portal=
e.portal||"",this.callback=e.callback,this._rowMode=e.rowMode,m.domain&&e.callback&&
(this.callback=m.domain.bind(e.callback)),this._result=new hs(this._rowMode,this.
types),this._results=this._result,this.isPreparedStatement=!1,this._canceledDueToError=
!1,this._promise=null;}requiresPreparation(){return this.name||this.rows?!0:!this.
text||!this.values?!1:this.values.length>0}_checkForMultirow(){this._result.command&&
(Array.isArray(this._results)||(this._results=[this._result]),this._result=new hs(
this._rowMode,this.types),this._results.push(this._result));}handleRowDescription(e){
this._checkForMultirow(),this._result.addFields(e.fields),this._accumulateRows=this.
callback||!this.listeners("row").length;}handleDataRow(e){let t;if(!this._canceledDueToError){
try{t=this._result.parseRow(e.fields);}catch(n){this._canceledDueToError=n;return}
this.emit("row",t,this._result),this._accumulateRows&&this._result.addRow(t);}}handleCommandComplete(e,t){
this._checkForMultirow(),this._result.addCommandComplete(e),this.rows&&t.sync();}handleEmptyQuery(e){
this.rows&&e.sync();}handleError(e,t){if(this._canceledDueToError&&(e=this._canceledDueToError,
this._canceledDueToError=!1),this.callback)return this.callback(e);this.emit("er\
ror",e);}handleReadyForQuery(e){if(this._canceledDueToError)return this.handleError(
this._canceledDueToError,e);if(this.callback)try{this.callback(null,this._results);}catch(t){
m.nextTick(()=>{throw t});}this.emit("end",this._results);}submit(e){if(typeof this.
text!="string"&&typeof this.name!="string")return new Error("A query must have e\
ither text or a name. Supplying neither is unsupported.");let t=e.parsedStatements[this.
name];return this.text&&t&&this.text!==t?new Error(`Prepared statements must be \
unique - '${this.name}' was used for a different statement`):this.values&&!Array.
isArray(this.values)?new Error("Query values must be an array"):(this.requiresPreparation()?
this.prepare(e):e.query(this.text),null)}hasBeenParsed(e){return this.name&&e.parsedStatements[this.
name]}handlePortalSuspended(e){this._getRows(e,this.rows);}_getRows(e,t){e.execute(
{portal:this.portal,rows:t}),t?e.flush():e.sync();}prepare(e){this.isPreparedStatement=
!0,this.hasBeenParsed(e)||e.parse({text:this.text,name:this.name,types:this.types});
try{e.bind({portal:this.portal,statement:this.name,values:this.values,binary:this.
binary,valueMapper:ls.prepareValue});}catch(t){this.handleError(t,e);return}e.describe(
{type:"P",name:this.portal||""}),this._getRows(e,this.rows);}handleCopyInResponse(e){
e.sendCopyFail("No source stream defined");}handleCopyData(e,t){}};a(Sr,"Query");
var br=Sr;fs.exports=br;});var ys={};ie(ys,{Socket:()=>Ae,isIP:()=>Ru});function Ru(r){return 0}var ds,Fu,E,
Ae,gt=z(()=>{p();ds=Qe(we(),1);a(Ru,"isIP");Fu=a(r=>r.replace(/^[^.]+\./,
"api."),"transformHost"),E=class E extends ds.EventEmitter{constructor(){super(...arguments);
_(this,"opts",{});_(this,"connecting",!1);_(this,"pending",!0);_(this,"writable",
!0);_(this,"encrypted",!1);_(this,"authorized",!1);_(this,"destroyed",!1);_(this,
"ws",null);_(this,"writeBuffer");_(this,"tlsState",0);_(this,"tlsRead");_(this,"\
tlsWrite");}static get poolQueryViaFetch(){return E.opts.poolQueryViaFetch??E.defaults.
poolQueryViaFetch}static set poolQueryViaFetch(t){E.opts.poolQueryViaFetch=t;}static get fetchEndpoint(){
return E.opts.fetchEndpoint??E.defaults.fetchEndpoint}static set fetchEndpoint(t){
E.opts.fetchEndpoint=t;}static get fetchConnectionCache(){return !0}static set fetchConnectionCache(t){
console.warn("The `fetchConnectionCache` option is deprecated (now always `true`\
)");}static get fetchFunction(){return E.opts.fetchFunction??E.defaults.fetchFunction}static set fetchFunction(t){
E.opts.fetchFunction=t;}static get webSocketConstructor(){return E.opts.webSocketConstructor??
E.defaults.webSocketConstructor}static set webSocketConstructor(t){E.opts.webSocketConstructor=
t;}get webSocketConstructor(){return this.opts.webSocketConstructor??E.webSocketConstructor}set webSocketConstructor(t){
this.opts.webSocketConstructor=t;}static get wsProxy(){return E.opts.wsProxy??E.defaults.
wsProxy}static set wsProxy(t){E.opts.wsProxy=t;}get wsProxy(){return this.opts.wsProxy??
E.wsProxy}set wsProxy(t){this.opts.wsProxy=t;}static get coalesceWrites(){return E.
opts.coalesceWrites??E.defaults.coalesceWrites}static set coalesceWrites(t){E.opts.
coalesceWrites=t;}get coalesceWrites(){return this.opts.coalesceWrites??E.coalesceWrites}set coalesceWrites(t){
this.opts.coalesceWrites=t;}static get useSecureWebSocket(){return E.opts.useSecureWebSocket??
E.defaults.useSecureWebSocket}static set useSecureWebSocket(t){E.opts.useSecureWebSocket=
t;}get useSecureWebSocket(){return this.opts.useSecureWebSocket??E.useSecureWebSocket}set useSecureWebSocket(t){
this.opts.useSecureWebSocket=t;}static get forceDisablePgSSL(){return E.opts.forceDisablePgSSL??
E.defaults.forceDisablePgSSL}static set forceDisablePgSSL(t){E.opts.forceDisablePgSSL=
t;}get forceDisablePgSSL(){return this.opts.forceDisablePgSSL??E.forceDisablePgSSL}set forceDisablePgSSL(t){
this.opts.forceDisablePgSSL=t;}static get disableSNI(){return E.opts.disableSNI??
E.defaults.disableSNI}static set disableSNI(t){E.opts.disableSNI=t;}get disableSNI(){
return this.opts.disableSNI??E.disableSNI}set disableSNI(t){this.opts.disableSNI=
t;}static get pipelineConnect(){return E.opts.pipelineConnect??E.defaults.pipelineConnect}static set pipelineConnect(t){
E.opts.pipelineConnect=t;}get pipelineConnect(){return this.opts.pipelineConnect??
E.pipelineConnect}set pipelineConnect(t){this.opts.pipelineConnect=t;}static get subtls(){
return E.opts.subtls??E.defaults.subtls}static set subtls(t){E.opts.subtls=t;}get subtls(){
return this.opts.subtls??E.subtls}set subtls(t){this.opts.subtls=t;}static get pipelineTLS(){
return E.opts.pipelineTLS??E.defaults.pipelineTLS}static set pipelineTLS(t){E.opts.
pipelineTLS=t;}get pipelineTLS(){return this.opts.pipelineTLS??E.pipelineTLS}set pipelineTLS(t){
this.opts.pipelineTLS=t;}static get rootCerts(){return E.opts.rootCerts??E.defaults.
rootCerts}static set rootCerts(t){E.opts.rootCerts=t;}get rootCerts(){return this.
opts.rootCerts??E.rootCerts}set rootCerts(t){this.opts.rootCerts=t;}wsProxyAddrForHost(t,n){
let i=this.wsProxy;if(i===void 0)throw new Error("No WebSocket proxy is configur\
ed. Please see https://github.com/neondatabase/serverless/blob/main/CONFIG.md#ws\
proxy-string--host-string-port-number--string--string");return typeof i=="functi\
on"?i(t,n):`${i}?address=${t}:${n}`}setNoDelay(){return this}setKeepAlive(){return this}ref(){
return this}unref(){return this}connect(t,n,i){this.connecting=!0,i&&this.once("\
connect",i);let s=a(()=>{this.connecting=!1,this.pending=!1,this.emit("connect"),
this.emit("ready");},"handleWebSocketOpen"),o=a((c,h=!1)=>{c.binaryType="arraybuf\
fer",c.addEventListener("error",l=>{this.emit("error",l),this.emit("close");}),c.
addEventListener("message",l=>{if(this.tlsState===0){let y=d.from(l.data);this.emit(
"data",y);}}),c.addEventListener("close",()=>{this.emit("close");}),h?s():c.addEventListener(
"open",s);},"configureWebSocket"),u;try{u=this.wsProxyAddrForHost(n,typeof t=="st\
ring"?parseInt(t,10):t);}catch(c){this.emit("error",c),this.emit("close");return}
try{let h=(this.useSecureWebSocket?"wss:":"ws:")+"//"+u;if(this.webSocketConstructor!==
void 0)this.ws=new this.webSocketConstructor(h),o(this.ws);else try{this.ws=new WebSocket(
h),o(this.ws);}catch{this.ws=new __unstable_WebSocket(h),o(this.ws);}}catch(c){let l=(this.
useSecureWebSocket?"https:":"http:")+"//"+u;fetch(l,{headers:{Upgrade:"websocket"}}).
then(y=>{if(this.ws=y.webSocket,this.ws==null)throw c;this.ws.accept(),o(this.ws,
!0);}).catch(y=>{this.emit("error",new Error(`All attempts to open a WebSocket to\
 connect to the database failed. Please refer to https://github.com/neondatabase\
/serverless/blob/main/CONFIG.md#websocketconstructor-typeof-websocket--undefined\
. Details: ${y.message}`)),this.emit("close");});}}async startTls(t){if(this.subtls===
void 0)throw new Error("For Postgres SSL connections, you must set `neonConfig.s\
ubtls` to the subtls library. See https://github.com/neondatabase/serverless/blo\
b/main/CONFIG.md for more information.");this.tlsState=1;let n=this.subtls.TrustedCert.
fromPEM(this.rootCerts),i=new this.subtls.WebSocketReadQueue(this.ws),s=i.read.bind(
i),o=this.rawWrite.bind(this),[u,c]=await this.subtls.startTls(t,n,s,o,{useSNI:!this.
disableSNI,expectPreData:this.pipelineTLS?new Uint8Array([83]):void 0});this.tlsRead=
u,this.tlsWrite=c,this.tlsState=2,this.encrypted=!0,this.authorized=!0,this.emit(
"secureConnection",this),this.tlsReadLoop();}async tlsReadLoop(){for(;;){let t=await this.
tlsRead();if(t===void 0)break;{let n=d.from(t);this.emit("data",n);}}}rawWrite(t){
if(!this.coalesceWrites){this.ws.send(t);return}if(this.writeBuffer===void 0)this.
writeBuffer=t,setTimeout(()=>{this.ws.send(this.writeBuffer),this.writeBuffer=void 0;},
0);else {let n=new Uint8Array(this.writeBuffer.length+t.length);n.set(this.writeBuffer),
n.set(t,this.writeBuffer.length),this.writeBuffer=n;}}write(t,n="utf8",i=s=>{}){return t.
length===0?(i(),!0):(typeof t=="string"&&(t=d.from(t,n)),this.tlsState===0?(this.
rawWrite(t),i()):this.tlsState===1?this.once("secureConnection",()=>{this.write(
t,n,i);}):(this.tlsWrite(t),i()),!0)}end(t=d.alloc(0),n="utf8",i=()=>{}){return this.
write(t,n,()=>{this.ws.close(),i();}),this}destroy(){return this.destroyed=!0,this.
end()}};a(E,"Socket"),_(E,"defaults",{poolQueryViaFetch:!1,fetchEndpoint:a(t=>"h\
ttps://"+Fu(t)+"/sql","fetchEndpoint"),fetchConnectionCache:!0,fetchFunction:void 0,
webSocketConstructor:void 0,wsProxy:a(t=>t+"/v2","wsProxy"),useSecureWebSocket:!0,
forceDisablePgSSL:!0,coalesceWrites:!0,pipelineConnect:"password",subtls:void 0,
rootCerts:"",pipelineTLS:!1,disableSNI:!1}),_(E,"opts",{});Ae=E;});var zr=T(I=>{p();Object.defineProperty(I,"__esModule",{value:!0});I.
NoticeMessage=I.DataRowMessage=I.CommandCompleteMessage=I.ReadyForQueryMessage=I.
NotificationResponseMessage=I.BackendKeyDataMessage=I.AuthenticationMD5Password=
I.ParameterStatusMessage=I.ParameterDescriptionMessage=I.RowDescriptionMessage=I.
Field=I.CopyResponse=I.CopyDataMessage=I.DatabaseError=I.copyDone=I.emptyQuery=I.
replicationStart=I.portalSuspended=I.noData=I.closeComplete=I.bindComplete=I.parseComplete=
void 0;I.parseComplete={name:"parseComplete",length:5};I.bindComplete={name:"bin\
dComplete",length:5};I.closeComplete={name:"closeComplete",length:5};I.noData={name:"\
noData",length:5};I.portalSuspended={name:"portalSuspended",length:5};I.replicationStart=
{name:"replicationStart",length:4};I.emptyQuery={name:"emptyQuery",length:4};I.copyDone=
{name:"copyDone",length:4};var Dr=class Dr extends Error{constructor(e,t,n){super(
e),this.length=t,this.name=n;}};a(Dr,"DatabaseError");var xr=Dr;I.DatabaseError=xr;
var kr=class kr{constructor(e,t){this.length=e,this.chunk=t,this.name="copyData";}};
a(kr,"CopyDataMessage");var vr=kr;I.CopyDataMessage=vr;var Ur=class Ur{constructor(e,t,n,i){
this.length=e,this.name=t,this.binary=n,this.columnTypes=new Array(i);}};a(Ur,"Co\
pyResponse");var Er=Ur;I.CopyResponse=Er;var Or=class Or{constructor(e,t,n,i,s,o,u){
this.name=e,this.tableID=t,this.columnID=n,this.dataTypeID=i,this.dataTypeSize=s,
this.dataTypeModifier=o,this.format=u;}};a(Or,"Field");var _r=Or;I.Field=_r;var Nr=class Nr{constructor(e,t){
this.length=e,this.fieldCount=t,this.name="rowDescription",this.fields=new Array(
this.fieldCount);}};a(Nr,"RowDescriptionMessage");var Ar=Nr;I.RowDescriptionMessage=
Ar;var qr=class qr{constructor(e,t){this.length=e,this.parameterCount=t,this.name=
"parameterDescription",this.dataTypeIDs=new Array(this.parameterCount);}};a(qr,"P\
arameterDescriptionMessage");var Cr=qr;I.ParameterDescriptionMessage=Cr;var Qr=class Qr{constructor(e,t,n){
this.length=e,this.parameterName=t,this.parameterValue=n,this.name="parameterSta\
tus";}};a(Qr,"ParameterStatusMessage");var Ir=Qr;I.ParameterStatusMessage=Ir;var Wr=class Wr{constructor(e,t){
this.length=e,this.salt=t,this.name="authenticationMD5Password";}};a(Wr,"Authenti\
cationMD5Password");var Tr=Wr;I.AuthenticationMD5Password=Tr;var jr=class jr{constructor(e,t,n){
this.length=e,this.processID=t,this.secretKey=n,this.name="backendKeyData";}};a(jr,
"BackendKeyDataMessage");var Pr=jr;I.BackendKeyDataMessage=Pr;var Hr=class Hr{constructor(e,t,n,i){
this.length=e,this.processId=t,this.channel=n,this.payload=i,this.name="notifica\
tion";}};a(Hr,"NotificationResponseMessage");var Br=Hr;I.NotificationResponseMessage=
Br;var Gr=class Gr{constructor(e,t){this.length=e,this.status=t,this.name="ready\
ForQuery";}};a(Gr,"ReadyForQueryMessage");var Lr=Gr;I.ReadyForQueryMessage=Lr;var $r=class $r{constructor(e,t){
this.length=e,this.text=t,this.name="commandComplete";}};a($r,"CommandCompleteMes\
sage");var Rr=$r;I.CommandCompleteMessage=Rr;var Vr=class Vr{constructor(e,t){this.
length=e,this.fields=t,this.name="dataRow",this.fieldCount=t.length;}};a(Vr,"Data\
RowMessage");var Fr=Vr;I.DataRowMessage=Fr;var Kr=class Kr{constructor(e,t){this.
length=e,this.message=t,this.name="notice";}};a(Kr,"NoticeMessage");var Mr=Kr;I.NoticeMessage=
Mr;});var ms=T(wt=>{p();Object.defineProperty(wt,"__esModule",{value:!0});
wt.Writer=void 0;var Zr=class Zr{constructor(e=256){this.size=e,this.offset=5,this.
headerPosition=0,this.buffer=d.allocUnsafe(e);}ensure(e){var t=this.buffer.length-
this.offset;if(t<e){var n=this.buffer,i=n.length+(n.length>>1)+e;this.buffer=d.allocUnsafe(
i),n.copy(this.buffer);}}addInt32(e){return this.ensure(4),this.buffer[this.offset++]=
e>>>24&255,this.buffer[this.offset++]=e>>>16&255,this.buffer[this.offset++]=e>>>
8&255,this.buffer[this.offset++]=e>>>0&255,this}addInt16(e){return this.ensure(2),
this.buffer[this.offset++]=e>>>8&255,this.buffer[this.offset++]=e>>>0&255,this}addCString(e){
if(!e)this.ensure(1);else {var t=d.byteLength(e);this.ensure(t+1),this.buffer.write(
e,this.offset,"utf-8"),this.offset+=t;}return this.buffer[this.offset++]=0,this}addString(e=""){
var t=d.byteLength(e);return this.ensure(t),this.buffer.write(e,this.offset),this.
offset+=t,this}add(e){return this.ensure(e.length),e.copy(this.buffer,this.offset),
this.offset+=e.length,this}join(e){if(e){this.buffer[this.headerPosition]=e;let t=this.
offset-(this.headerPosition+1);this.buffer.writeInt32BE(t,this.headerPosition+1);}
return this.buffer.slice(e?0:5,this.offset)}flush(e){var t=this.join(e);return this.
offset=5,this.headerPosition=0,this.buffer=d.allocUnsafe(this.size),t}};a(Zr,"Wr\
iter");var Yr=Zr;wt.Writer=Yr;});var ws$1=T(St=>{p();Object.defineProperty(St,"__esModule",{value:!0});
St.serialize=void 0;var Jr=ms(),M=new Jr.Writer,Mu=a(r=>{M.addInt16(3).addInt16(
0);for(let n of Object.keys(r))M.addCString(n).addCString(r[n]);M.addCString("cl\
ient_encoding").addCString("UTF8");var e=M.addCString("").flush(),t=e.length+4;return new Jr.
Writer().addInt32(t).add(e).flush()},"startup"),Du=a(()=>{let r=d.allocUnsafe(8);
return r.writeInt32BE(8,0),r.writeInt32BE(80877103,4),r},"requestSsl"),ku=a(r=>M.
addCString(r).flush(112),"password"),Uu=a(function(r,e){return M.addCString(r).addInt32(
d.byteLength(e)).addString(e),M.flush(112)},"sendSASLInitialResponseMessage"),Ou=a(
function(r){return M.addString(r).flush(112)},"sendSCRAMClientFinalMessage"),Nu=a(
r=>M.addCString(r).flush(81),"query"),gs=[],qu=a(r=>{let e=r.name||"";e.length>63&&
(console.error("Warning! Postgres only supports 63 characters for query names."),
console.error("You supplied %s (%s)",e,e.length),console.error("This can cause c\
onflicts and silent errors executing queries"));let t=r.types||gs;for(var n=t.length,
i=M.addCString(e).addCString(r.text).addInt16(n),s=0;s<n;s++)i.addInt32(t[s]);return M.
flush(80)},"parse"),Oe=new Jr.Writer,Qu=a(function(r,e){for(let t=0;t<r.length;t++){
let n=e?e(r[t],t):r[t];n==null?(M.addInt16(0),Oe.addInt32(-1)):n instanceof d?(M.
addInt16(1),Oe.addInt32(n.length),Oe.add(n)):(M.addInt16(0),Oe.addInt32(d.byteLength(
n)),Oe.addString(n));}},"writeValues"),Wu=a((r={})=>{let e=r.portal||"",t=r.statement||
"",n=r.binary||!1,i=r.values||gs,s=i.length;return M.addCString(e).addCString(t),
M.addInt16(s),Qu(i,r.valueMapper),M.addInt16(s),M.add(Oe.flush()),M.addInt16(n?1:
0),M.flush(66)},"bind"),ju=d.from([69,0,0,0,9,0,0,0,0,0]),Hu=a(r=>{if(!r||!r.portal&&
!r.rows)return ju;let e=r.portal||"",t=r.rows||0,n=d.byteLength(e),i=4+n+1+4,s=d.
allocUnsafe(1+i);return s[0]=69,s.writeInt32BE(i,1),s.write(e,5,"utf-8"),s[n+5]=
0,s.writeUInt32BE(t,s.length-4),s},"execute"),Gu=a((r,e)=>{let t=d.allocUnsafe(16);
return t.writeInt32BE(16,0),t.writeInt16BE(1234,4),t.writeInt16BE(5678,6),t.writeInt32BE(
r,8),t.writeInt32BE(e,12),t},"cancel"),Xr=a((r,e)=>{let n=4+d.byteLength(e)+1,i=d.
allocUnsafe(1+n);return i[0]=r,i.writeInt32BE(n,1),i.write(e,5,"utf-8"),i[n]=0,i},
"cstringMessage"),$u=M.addCString("P").flush(68),Vu=M.addCString("S").flush(68),
Ku=a(r=>r.name?Xr(68,`${r.type}${r.name||""}`):r.type==="P"?$u:Vu,"describe"),zu=a(
r=>{let e=`${r.type}${r.name||""}`;return Xr(67,e)},"close"),Yu=a(r=>M.add(r).flush(
100),"copyData"),Zu=a(r=>Xr(102,r),"copyFail"),bt=a(r=>d.from([r,0,0,0,4]),"code\
OnlyBuffer"),Ju=bt(72),Xu=bt(83),ec=bt(88),tc=bt(99),rc={startup:Mu,password:ku,
requestSsl:Du,sendSASLInitialResponseMessage:Uu,sendSCRAMClientFinalMessage:Ou,query:Nu,
parse:qu,bind:Wu,execute:Hu,describe:Ku,close:zu,flush:a(()=>Ju,"flush"),sync:a(
()=>Xu,"sync"),end:a(()=>ec,"end"),copyData:Yu,copyDone:a(()=>tc,"copyDone"),copyFail:Zu,
cancel:Gu};St.serialize=rc;});var bs=T(xt=>{p();Object.defineProperty(xt,"__esModule",{value:!0});
xt.BufferReader=void 0;var nc=d.allocUnsafe(0),tn=class tn{constructor(e=0){this.
offset=e,this.buffer=nc,this.encoding="utf-8";}setBuffer(e,t){this.offset=e,this.
buffer=t;}int16(){let e=this.buffer.readInt16BE(this.offset);return this.offset+=
2,e}byte(){let e=this.buffer[this.offset];return this.offset++,e}int32(){let e=this.
buffer.readInt32BE(this.offset);return this.offset+=4,e}string(e){let t=this.buffer.
toString(this.encoding,this.offset,this.offset+e);return this.offset+=e,t}cstring(){
let e=this.offset,t=e;for(;this.buffer[t++]!==0;);return this.offset=t,this.buffer.
toString(this.encoding,e,t-1)}bytes(e){let t=this.buffer.slice(this.offset,this.
offset+e);return this.offset+=e,t}};a(tn,"BufferReader");var en=tn;xt.BufferReader=
en;});var vs=T(vt=>{p();Object.defineProperty(vt,"__esModule",{value:!0});
vt.Parser=void 0;var D=zr(),ic=bs(),rn=1,sc=4,Ss=rn+sc,xs=d.allocUnsafe(0),sn=class sn{constructor(e){
if(this.buffer=xs,this.bufferLength=0,this.bufferOffset=0,this.reader=new ic.BufferReader,
e?.mode==="binary")throw new Error("Binary mode not supported yet");this.mode=e?.
mode||"text";}parse(e,t){this.mergeBuffer(e);let n=this.bufferOffset+this.bufferLength,
i=this.bufferOffset;for(;i+Ss<=n;){let s=this.buffer[i],o=this.buffer.readUInt32BE(
i+rn),u=rn+o;if(u+i<=n){let c=this.handlePacket(i+Ss,s,o,this.buffer);t(c),i+=u;}else
break}i===n?(this.buffer=xs,this.bufferLength=0,this.bufferOffset=0):(this.bufferLength=
n-i,this.bufferOffset=i);}mergeBuffer(e){if(this.bufferLength>0){let t=this.bufferLength+
e.byteLength;if(t+this.bufferOffset>this.buffer.byteLength){let i;if(t<=this.buffer.
byteLength&&this.bufferOffset>=this.bufferLength)i=this.buffer;else {let s=this.buffer.
byteLength*2;for(;t>=s;)s*=2;i=d.allocUnsafe(s);}this.buffer.copy(i,0,this.bufferOffset,
this.bufferOffset+this.bufferLength),this.buffer=i,this.bufferOffset=0;}e.copy(this.
buffer,this.bufferOffset+this.bufferLength),this.bufferLength=t;}else this.buffer=
e,this.bufferOffset=0,this.bufferLength=e.byteLength;}handlePacket(e,t,n,i){switch(t){case 50:
return D.bindComplete;case 49:return D.parseComplete;case 51:return D.closeComplete;case 110:
return D.noData;case 115:return D.portalSuspended;case 99:return D.copyDone;case 87:
return D.replicationStart;case 73:return D.emptyQuery;case 68:return this.parseDataRowMessage(
e,n,i);case 67:return this.parseCommandCompleteMessage(e,n,i);case 90:return this.
parseReadyForQueryMessage(e,n,i);case 65:return this.parseNotificationMessage(e,
n,i);case 82:return this.parseAuthenticationResponse(e,n,i);case 83:return this.
parseParameterStatusMessage(e,n,i);case 75:return this.parseBackendKeyData(e,n,i);case 69:
return this.parseErrorMessage(e,n,i,"error");case 78:return this.parseErrorMessage(
e,n,i,"notice");case 84:return this.parseRowDescriptionMessage(e,n,i);case 116:return this.
parseParameterDescriptionMessage(e,n,i);case 71:return this.parseCopyInMessage(e,
n,i);case 72:return this.parseCopyOutMessage(e,n,i);case 100:return this.parseCopyData(
e,n,i);default:return new D.DatabaseError("received invalid response: "+t.toString(
16),n,"error")}}parseReadyForQueryMessage(e,t,n){this.reader.setBuffer(e,n);let i=this.
reader.string(1);return new D.ReadyForQueryMessage(t,i)}parseCommandCompleteMessage(e,t,n){
this.reader.setBuffer(e,n);let i=this.reader.cstring();return new D.CommandCompleteMessage(
t,i)}parseCopyData(e,t,n){let i=n.slice(e,e+(t-4));return new D.CopyDataMessage(
t,i)}parseCopyInMessage(e,t,n){return this.parseCopyMessage(e,t,n,"copyInRespons\
e")}parseCopyOutMessage(e,t,n){return this.parseCopyMessage(e,t,n,"copyOutRespon\
se")}parseCopyMessage(e,t,n,i){this.reader.setBuffer(e,n);let s=this.reader.byte()!==
0,o=this.reader.int16(),u=new D.CopyResponse(t,i,s,o);for(let c=0;c<o;c++)u.columnTypes[c]=
this.reader.int16();return u}parseNotificationMessage(e,t,n){this.reader.setBuffer(
e,n);let i=this.reader.int32(),s=this.reader.cstring(),o=this.reader.cstring();return new D.
NotificationResponseMessage(t,i,s,o)}parseRowDescriptionMessage(e,t,n){this.reader.
setBuffer(e,n);let i=this.reader.int16(),s=new D.RowDescriptionMessage(t,i);for(let o=0;o<
i;o++)s.fields[o]=this.parseField();return s}parseField(){let e=this.reader.cstring(),
t=this.reader.int32(),n=this.reader.int16(),i=this.reader.int32(),s=this.reader.
int16(),o=this.reader.int32(),u=this.reader.int16()===0?"text":"binary";return new D.
Field(e,t,n,i,s,o,u)}parseParameterDescriptionMessage(e,t,n){this.reader.setBuffer(
e,n);let i=this.reader.int16(),s=new D.ParameterDescriptionMessage(t,i);for(let o=0;o<
i;o++)s.dataTypeIDs[o]=this.reader.int32();return s}parseDataRowMessage(e,t,n){this.
reader.setBuffer(e,n);let i=this.reader.int16(),s=new Array(i);for(let o=0;o<i;o++){
let u=this.reader.int32();s[o]=u===-1?null:this.reader.string(u);}return new D.DataRowMessage(
t,s)}parseParameterStatusMessage(e,t,n){this.reader.setBuffer(e,n);let i=this.reader.
cstring(),s=this.reader.cstring();return new D.ParameterStatusMessage(t,i,s)}parseBackendKeyData(e,t,n){
this.reader.setBuffer(e,n);let i=this.reader.int32(),s=this.reader.int32();return new D.
BackendKeyDataMessage(t,i,s)}parseAuthenticationResponse(e,t,n){this.reader.setBuffer(
e,n);let i=this.reader.int32(),s={name:"authenticationOk",length:t};switch(i){case 0:
break;case 3:s.length===8&&(s.name="authenticationCleartextPassword");break;case 5:
if(s.length===12){s.name="authenticationMD5Password";let u=this.reader.bytes(4);
return new D.AuthenticationMD5Password(t,u)}break;case 10:s.name="authentication\
SASL",s.mechanisms=[];let o;do o=this.reader.cstring(),o&&s.mechanisms.push(o);while(o);
break;case 11:s.name="authenticationSASLContinue",s.data=this.reader.string(t-8);
break;case 12:s.name="authenticationSASLFinal",s.data=this.reader.string(t-8);break;default:
throw new Error("Unknown authenticationOk message type "+i)}return s}parseErrorMessage(e,t,n,i){
this.reader.setBuffer(e,n);let s={},o=this.reader.string(1);for(;o!=="\0";)s[o]=
this.reader.cstring(),o=this.reader.string(1);let u=s.M,c=i==="notice"?new D.NoticeMessage(
t,u):new D.DatabaseError(u,t,i);return c.severity=s.S,c.code=s.C,c.detail=s.D,c.
hint=s.H,c.position=s.P,c.internalPosition=s.p,c.internalQuery=s.q,c.where=s.W,c.
schema=s.s,c.table=s.t,c.column=s.c,c.dataType=s.d,c.constraint=s.n,c.file=s.F,c.
line=s.L,c.routine=s.R,c}};a(sn,"Parser");var nn=sn;vt.Parser=nn;});var on=T(Se=>{p();Object.defineProperty(Se,"__esModule",{value:!0});
Se.DatabaseError=Se.serialize=Se.parse=void 0;var oc=zr();Object.defineProperty(
Se,"DatabaseError",{enumerable:!0,get:a(function(){return oc.DatabaseError},"get")});
var ac=ws$1();Object.defineProperty(Se,"serialize",{enumerable:!0,get:a(function(){
return ac.serialize},"get")});var uc=vs();function cc(r,e){let t=new uc.Parser;return r.
on("data",n=>t.parse(n,e)),new Promise(n=>r.on("end",()=>n()))}a(cc,"parse");Se.
parse=cc;});var Es={};ie(Es,{connect:()=>hc});function hc({socket:r,servername:e}){return r.
startTls(e),r}var _s=z(()=>{p();a(hc,"connect");});var cn=T((ef,Is)=>{p();var As=(gt(),N(ys)),lc=we().EventEmitter,{parse:fc,
serialize:Q}=on(),Cs=Q.flush(),pc=Q.sync(),dc=Q.end(),un=class un extends lc{constructor(e){
super(),e=e||{},this.stream=e.stream||new As.Socket,this._keepAlive=e.keepAlive,
this._keepAliveInitialDelayMillis=e.keepAliveInitialDelayMillis,this.lastBuffer=
!1,this.parsedStatements={},this.ssl=e.ssl||!1,this._ending=!1,this._emitMessage=
!1;var t=this;this.on("newListener",function(n){n==="message"&&(t._emitMessage=!0);});}connect(e,t){
var n=this;this._connecting=!0,this.stream.setNoDelay(!0),this.stream.connect(e,
t),this.stream.once("connect",function(){n._keepAlive&&n.stream.setKeepAlive(!0,
n._keepAliveInitialDelayMillis),n.emit("connect");});let i=a(function(s){n._ending&&
(s.code==="ECONNRESET"||s.code==="EPIPE")||n.emit("error",s);},"reportStreamError");
if(this.stream.on("error",i),this.stream.on("close",function(){n.emit("end");}),!this.
ssl)return this.attachListeners(this.stream);this.stream.once("data",function(s){
var o=s.toString("utf8");switch(o){case"S":break;case"N":return n.stream.end(),n.
emit("error",new Error("The server does not support SSL connections"));default:return n.
stream.end(),n.emit("error",new Error("There was an error establishing an SSL co\
nnection"))}var u=(_s(),N(Es));let c={socket:n.stream};n.ssl!==!0&&(Object.assign(
c,n.ssl),"key"in n.ssl&&(c.key=n.ssl.key)),As.isIP(t)===0&&(c.servername=t);try{
n.stream=u.connect(c);}catch(h){return n.emit("error",h)}n.attachListeners(n.stream),
n.stream.on("error",i),n.emit("sslconnect");});}attachListeners(e){e.on("end",()=>{
this.emit("end");}),fc(e,t=>{var n=t.name==="error"?"errorMessage":t.name;this._emitMessage&&
this.emit("message",t),this.emit(n,t);});}requestSsl(){this.stream.write(Q.requestSsl());}startup(e){
this.stream.write(Q.startup(e));}cancel(e,t){this._send(Q.cancel(e,t));}password(e){
this._send(Q.password(e));}sendSASLInitialResponseMessage(e,t){this._send(Q.sendSASLInitialResponseMessage(
e,t));}sendSCRAMClientFinalMessage(e){this._send(Q.sendSCRAMClientFinalMessage(e));}_send(e){
return this.stream.writable?this.stream.write(e):!1}query(e){this._send(Q.query(
e));}parse(e){this._send(Q.parse(e));}bind(e){this._send(Q.bind(e));}execute(e){this.
_send(Q.execute(e));}flush(){this.stream.writable&&this.stream.write(Cs);}sync(){this.
_ending=!0,this._send(Cs),this._send(pc);}ref(){this.stream.ref();}unref(){this.stream.
unref();}end(){if(this._ending=!0,!this._connecting||!this.stream.writable){this.
stream.end();return}return this.stream.write(dc,()=>{this.stream.end();})}close(e){
this._send(Q.close(e));}describe(e){this._send(Q.describe(e));}sendCopyFromChunk(e){
this._send(Q.copyData(e));}endCopyFrom(){this._send(Q.copyDone());}sendCopyFail(e){
this._send(Q.copyFail(e));}};a(un,"Connection");var an=un;Is.exports=an;});var Bs=T((sf,Ps)=>{p();var yc=we().EventEmitter;(He(),N(je));var mc=et(),
hn=qi(),gc=Zi(),wc=hr(),bc=mt(),Ts=ps(),Sc=Xe(),xc=cn(),ln=class ln extends yc{constructor(e){
super(),this.connectionParameters=new bc(e),this.user=this.connectionParameters.
user,this.database=this.connectionParameters.database,this.port=this.connectionParameters.
port,this.host=this.connectionParameters.host,Object.defineProperty(this,"passwo\
rd",{configurable:!0,enumerable:!1,writable:!0,value:this.connectionParameters.password}),
this.replication=this.connectionParameters.replication;var t=e||{};this._Promise=
t.Promise||b.Promise,this._types=new wc(t.types),this._ending=!1,this._connecting=
!1,this._connected=!1,this._connectionError=!1,this._queryable=!0,this.connection=
t.connection||new xc({stream:t.stream,ssl:this.connectionParameters.ssl,keepAlive:t.
keepAlive||!1,keepAliveInitialDelayMillis:t.keepAliveInitialDelayMillis||0,encoding:this.
connectionParameters.client_encoding||"utf8"}),this.queryQueue=[],this.binary=t.
binary||Sc.binary,this.processID=null,this.secretKey=null,this.ssl=this.connectionParameters.
ssl||!1,this.ssl&&this.ssl.key&&Object.defineProperty(this.ssl,"key",{enumerable:!1}),
this._connectionTimeoutMillis=t.connectionTimeoutMillis||0;}_errorAllQueries(e){let t=a(
n=>{m.nextTick(()=>{n.handleError(e,this.connection);});},"enqueueError");this.activeQuery&&
(t(this.activeQuery),this.activeQuery=null),this.queryQueue.forEach(t),this.queryQueue.
length=0;}_connect(e){var t=this,n=this.connection;if(this._connectionCallback=e,
this._connecting||this._connected){let i=new Error("Client has already been conn\
ected. You cannot reuse a client.");m.nextTick(()=>{e(i);});return}this._connecting=
!0,this.connectionTimeoutHandle,this._connectionTimeoutMillis>0&&(this.connectionTimeoutHandle=
setTimeout(()=>{n._ending=!0,n.stream.destroy(new Error("timeout expired"));},this.
_connectionTimeoutMillis)),this.host&&this.host.indexOf("/")===0?n.connect(this.
host+"/.s.PGSQL."+this.port):n.connect(this.port,this.host),n.on("connect",function(){
t.ssl?n.requestSsl():n.startup(t.getStartupConf());}),n.on("sslconnect",function(){
n.startup(t.getStartupConf());}),this._attachListeners(n),n.once("end",()=>{let i=this.
_ending?new Error("Connection terminated"):new Error("Connection terminated unex\
pectedly");clearTimeout(this.connectionTimeoutHandle),this._errorAllQueries(i),this.
_ending||(this._connecting&&!this._connectionError?this._connectionCallback?this.
_connectionCallback(i):this._handleErrorEvent(i):this._connectionError||this._handleErrorEvent(
i)),m.nextTick(()=>{this.emit("end");});});}connect(e){if(e){this._connect(e);return}
return new this._Promise((t,n)=>{this._connect(i=>{i?n(i):t();});})}_attachListeners(e){
e.on("authenticationCleartextPassword",this._handleAuthCleartextPassword.bind(this)),
e.on("authenticationMD5Password",this._handleAuthMD5Password.bind(this)),e.on("a\
uthenticationSASL",this._handleAuthSASL.bind(this)),e.on("authenticationSASLCont\
inue",this._handleAuthSASLContinue.bind(this)),e.on("authenticationSASLFinal",this.
_handleAuthSASLFinal.bind(this)),e.on("backendKeyData",this._handleBackendKeyData.
bind(this)),e.on("error",this._handleErrorEvent.bind(this)),e.on("errorMessage",
this._handleErrorMessage.bind(this)),e.on("readyForQuery",this._handleReadyForQuery.
bind(this)),e.on("notice",this._handleNotice.bind(this)),e.on("rowDescription",this.
_handleRowDescription.bind(this)),e.on("dataRow",this._handleDataRow.bind(this)),
e.on("portalSuspended",this._handlePortalSuspended.bind(this)),e.on("emptyQuery",
this._handleEmptyQuery.bind(this)),e.on("commandComplete",this._handleCommandComplete.
bind(this)),e.on("parseComplete",this._handleParseComplete.bind(this)),e.on("cop\
yInResponse",this._handleCopyInResponse.bind(this)),e.on("copyData",this._handleCopyData.
bind(this)),e.on("notification",this._handleNotification.bind(this));}_checkPgPass(e){
let t=this.connection;typeof this.password=="function"?this._Promise.resolve().then(
()=>this.password()).then(n=>{if(n!==void 0){if(typeof n!="string"){t.emit("erro\
r",new TypeError("Password must be a string"));return}this.connectionParameters.
password=this.password=n;}else this.connectionParameters.password=this.password=null;
e();}).catch(n=>{t.emit("error",n);}):this.password!==null?e():gc(this.connectionParameters,
n=>{n!==void 0&&(this.connectionParameters.password=this.password=n),e();});}_handleAuthCleartextPassword(e){
this._checkPgPass(()=>{this.connection.password(this.password);});}_handleAuthMD5Password(e){
this._checkPgPass(()=>{let t=mc.postgresMd5PasswordHash(this.user,this.password,
e.salt);this.connection.password(t);});}_handleAuthSASL(e){this._checkPgPass(()=>{
this.saslSession=hn.startSession(e.mechanisms),this.connection.sendSASLInitialResponseMessage(
this.saslSession.mechanism,this.saslSession.response);});}_handleAuthSASLContinue(e){
hn.continueSession(this.saslSession,this.password,e.data),this.connection.sendSCRAMClientFinalMessage(
this.saslSession.response);}_handleAuthSASLFinal(e){hn.finalizeSession(this.saslSession,
e.data),this.saslSession=null;}_handleBackendKeyData(e){this.processID=e.processID,
this.secretKey=e.secretKey;}_handleReadyForQuery(e){this._connecting&&(this._connecting=
!1,this._connected=!0,clearTimeout(this.connectionTimeoutHandle),this._connectionCallback&&
(this._connectionCallback(null,this),this._connectionCallback=null),this.emit("c\
onnect"));let{activeQuery:t}=this;this.activeQuery=null,this.readyForQuery=!0,t&&
t.handleReadyForQuery(this.connection),this._pulseQueryQueue();}_handleErrorWhileConnecting(e){
if(!this._connectionError){if(this._connectionError=!0,clearTimeout(this.connectionTimeoutHandle),
this._connectionCallback)return this._connectionCallback(e);this.emit("error",e);}}_handleErrorEvent(e){
if(this._connecting)return this._handleErrorWhileConnecting(e);this._queryable=!1,
this._errorAllQueries(e),this.emit("error",e);}_handleErrorMessage(e){if(this._connecting)
return this._handleErrorWhileConnecting(e);let t=this.activeQuery;if(!t){this._handleErrorEvent(
e);return}this.activeQuery=null,t.handleError(e,this.connection);}_handleRowDescription(e){
this.activeQuery.handleRowDescription(e);}_handleDataRow(e){this.activeQuery.handleDataRow(
e);}_handlePortalSuspended(e){this.activeQuery.handlePortalSuspended(this.connection);}_handleEmptyQuery(e){
this.activeQuery.handleEmptyQuery(this.connection);}_handleCommandComplete(e){this.
activeQuery.handleCommandComplete(e,this.connection);}_handleParseComplete(e){this.
activeQuery.name&&(this.connection.parsedStatements[this.activeQuery.name]=this.
activeQuery.text);}_handleCopyInResponse(e){this.activeQuery.handleCopyInResponse(
this.connection);}_handleCopyData(e){this.activeQuery.handleCopyData(e,this.connection);}_handleNotification(e){
this.emit("notification",e);}_handleNotice(e){this.emit("notice",e);}getStartupConf(){
var e=this.connectionParameters,t={user:e.user,database:e.database},n=e.application_name||
e.fallback_application_name;return n&&(t.application_name=n),e.replication&&(t.replication=
""+e.replication),e.statement_timeout&&(t.statement_timeout=String(parseInt(e.statement_timeout,
10))),e.lock_timeout&&(t.lock_timeout=String(parseInt(e.lock_timeout,10))),e.idle_in_transaction_session_timeout&&
(t.idle_in_transaction_session_timeout=String(parseInt(e.idle_in_transaction_session_timeout,
10))),e.options&&(t.options=e.options),t}cancel(e,t){if(e.activeQuery===t){var n=this.
connection;this.host&&this.host.indexOf("/")===0?n.connect(this.host+"/.s.PGSQL."+
this.port):n.connect(this.port,this.host),n.on("connect",function(){n.cancel(e.processID,
e.secretKey);});}else e.queryQueue.indexOf(t)!==-1&&e.queryQueue.splice(e.queryQueue.
indexOf(t),1);}setTypeParser(e,t,n){return this._types.setTypeParser(e,t,n)}getTypeParser(e,t){
return this._types.getTypeParser(e,t)}escapeIdentifier(e){return '"'+e.replace(/"/g,
'""')+'"'}escapeLiteral(e){for(var t=!1,n="'",i=0;i<e.length;i++){var s=e[i];s===
"'"?n+=s+s:s==="\\"?(n+=s+s,t=!0):n+=s;}return n+="'",t===!0&&(n=" E"+n),n}_pulseQueryQueue(){
if(this.readyForQuery===!0)if(this.activeQuery=this.queryQueue.shift(),this.activeQuery){
this.readyForQuery=!1,this.hasExecuted=!0;let e=this.activeQuery.submit(this.connection);
e&&m.nextTick(()=>{this.activeQuery.handleError(e,this.connection),this.readyForQuery=
!0,this._pulseQueryQueue();});}else this.hasExecuted&&(this.activeQuery=null,this.
emit("drain"));}query(e,t,n){var i,s,o,u,c;if(e==null)throw new TypeError("Client\
 was passed a null or undefined query");return typeof e.submit=="function"?(o=e.
query_timeout||this.connectionParameters.query_timeout,s=i=e,typeof t=="function"&&
(i.callback=i.callback||t)):(o=this.connectionParameters.query_timeout,i=new Ts(
e,t,n),i.callback||(s=new this._Promise((h,l)=>{i.callback=(y,x)=>y?l(y):h(x);}))),
o&&(c=i.callback,u=setTimeout(()=>{var h=new Error("Query read timeout");m.nextTick(
()=>{i.handleError(h,this.connection);}),c(h),i.callback=()=>{};var l=this.queryQueue.
indexOf(i);l>-1&&this.queryQueue.splice(l,1),this._pulseQueryQueue();},o),i.callback=
(h,l)=>{clearTimeout(u),c(h,l);}),this.binary&&!i.binary&&(i.binary=!0),i._result&&
!i._result._types&&(i._result._types=this._types),this._queryable?this._ending?(m.
nextTick(()=>{i.handleError(new Error("Client was closed and is not queryable"),
this.connection);}),s):(this.queryQueue.push(i),this._pulseQueryQueue(),s):(m.nextTick(
()=>{i.handleError(new Error("Client has encountered a connection error and is n\
ot queryable"),this.connection);}),s)}ref(){this.connection.ref();}unref(){this.connection.
unref();}end(e){if(this._ending=!0,!this.connection._connecting)if(e)e();else return this.
_Promise.resolve();if(this.activeQuery||!this._queryable?this.connection.stream.
destroy():this.connection.end(),e)this.connection.once("end",e);else return new this.
_Promise(t=>{this.connection.once("end",t);})}};a(ln,"Client");var Et=ln;Et.Query=
Ts;Ps.exports=Et;});var Ms=T((uf,Fs)=>{p();var vc=we().EventEmitter,Ls=a(function(){},"\
NOOP"),Rs=a((r,e)=>{let t=r.findIndex(e);return t===-1?void 0:r.splice(t,1)[0]},
"removeWhere"),dn=class dn{constructor(e,t,n){this.client=e,this.idleListener=t,
this.timeoutId=n;}};a(dn,"IdleItem");var fn=dn,yn=class yn{constructor(e){this.callback=
e;}};a(yn,"PendingItem");var Ne=yn;function Ec(){throw new Error("Release called \
on client which has already been released to the pool.")}a(Ec,"throwOnDoubleRele\
ase");function _t(r,e){if(e)return {callback:e,result:void 0};let t,n,i=a(function(o,u){
o?t(o):n(u);},"cb"),s=new r(function(o,u){n=o,t=u;}).catch(o=>{throw Error.captureStackTrace(
o),o});return {callback:i,result:s}}a(_t,"promisify");function _c(r,e){return a(function t(n){
n.client=e,e.removeListener("error",t),e.on("error",()=>{r.log("additional clien\
t error after disconnection due to error",n);}),r._remove(e),r.emit("error",n,e);},
"idleListener")}a(_c,"makeIdleListener");var mn=class mn extends vc{constructor(e,t){
super(),this.options=Object.assign({},e),e!=null&&"password"in e&&Object.defineProperty(
this.options,"password",{configurable:!0,enumerable:!1,writable:!0,value:e.password}),
e!=null&&e.ssl&&e.ssl.key&&Object.defineProperty(this.options.ssl,"key",{enumerable:!1}),
this.options.max=this.options.max||this.options.poolSize||10,this.options.maxUses=
this.options.maxUses||1/0,this.options.allowExitOnIdle=this.options.allowExitOnIdle||
!1,this.options.maxLifetimeSeconds=this.options.maxLifetimeSeconds||0,this.log=this.
options.log||function(){},this.Client=this.options.Client||t||At().Client,this.Promise=
this.options.Promise||b.Promise,typeof this.options.idleTimeoutMillis>"u"&&(this.
options.idleTimeoutMillis=1e4),this._clients=[],this._idle=[],this._expired=new WeakSet,
this._pendingQueue=[],this._endCallback=void 0,this.ending=!1,this.ended=!1;}_isFull(){
return this._clients.length>=this.options.max}_pulseQueue(){if(this.log("pulse q\
ueue"),this.ended){this.log("pulse queue ended");return}if(this.ending){this.log(
"pulse queue on ending"),this._idle.length&&this._idle.slice().map(t=>{this._remove(
t.client);}),this._clients.length||(this.ended=!0,this._endCallback());return}if(!this.
_pendingQueue.length){this.log("no queued requests");return}if(!this._idle.length&&
this._isFull())return;let e=this._pendingQueue.shift();if(this._idle.length){let t=this.
_idle.pop();clearTimeout(t.timeoutId);let n=t.client;n.ref&&n.ref();let i=t.idleListener;
return this._acquireClient(n,e,i,!1)}if(!this._isFull())return this.newClient(e);
throw new Error("unexpected condition")}_remove(e){let t=Rs(this._idle,n=>n.client===
e);t!==void 0&&clearTimeout(t.timeoutId),this._clients=this._clients.filter(n=>n!==
e),e.end(),this.emit("remove",e);}connect(e){if(this.ending){let i=new Error("Can\
not use a pool after calling end on the pool");return e?e(i):this.Promise.reject(
i)}let t=_t(this.Promise,e),n=t.result;if(this._isFull()||this._idle.length){if(this.
_idle.length&&m.nextTick(()=>this._pulseQueue()),!this.options.connectionTimeoutMillis)
return this._pendingQueue.push(new Ne(t.callback)),n;let i=a((u,c,h)=>{clearTimeout(
o),t.callback(u,c,h);},"queueCallback"),s=new Ne(i),o=setTimeout(()=>{Rs(this._pendingQueue,
u=>u.callback===i),s.timedOut=!0,t.callback(new Error("timeout exceeded when try\
ing to connect"));},this.options.connectionTimeoutMillis);return this._pendingQueue.
push(s),n}return this.newClient(new Ne(t.callback)),n}newClient(e){let t=new this.
Client(this.options);this._clients.push(t);let n=_c(this,t);this.log("checking c\
lient timeout");let i,s=!1;this.options.connectionTimeoutMillis&&(i=setTimeout(()=>{
this.log("ending client due to timeout"),s=!0,t.connection?t.connection.stream.destroy():
t.end();},this.options.connectionTimeoutMillis)),this.log("connecting new client"),
t.connect(o=>{if(i&&clearTimeout(i),t.on("error",n),o)this.log("client failed to\
 connect",o),this._clients=this._clients.filter(u=>u!==t),s&&(o.message="Connect\
ion terminated due to connection timeout"),this._pulseQueue(),e.timedOut||e.callback(
o,void 0,Ls);else {if(this.log("new client connected"),this.options.maxLifetimeSeconds!==
0){let u=setTimeout(()=>{this.log("ending client due to expired lifetime"),this.
_expired.add(t),this._idle.findIndex(h=>h.client===t)!==-1&&this._acquireClient(
t,new Ne((h,l,y)=>y()),n,!1);},this.options.maxLifetimeSeconds*1e3);u.unref(),t.once(
"end",()=>clearTimeout(u));}return this._acquireClient(t,e,n,!0)}});}_acquireClient(e,t,n,i){
i&&this.emit("connect",e),this.emit("acquire",e),e.release=this._releaseOnce(e,n),
e.removeListener("error",n),t.timedOut?i&&this.options.verify?this.options.verify(
e,e.release):e.release():i&&this.options.verify?this.options.verify(e,s=>{if(s)return e.
release(s),t.callback(s,void 0,Ls);t.callback(void 0,e,e.release);}):t.callback(void 0,
e,e.release);}_releaseOnce(e,t){let n=!1;return i=>{n&&Ec(),n=!0,this._release(e,
t,i);}}_release(e,t,n){if(e.on("error",t),e._poolUseCount=(e._poolUseCount||0)+1,
this.emit("release",n,e),n||this.ending||!e._queryable||e._ending||e._poolUseCount>=
this.options.maxUses){e._poolUseCount>=this.options.maxUses&&this.log("remove ex\
pended client"),this._remove(e),this._pulseQueue();return}if(this._expired.has(e)){
this.log("remove expired client"),this._expired.delete(e),this._remove(e),this._pulseQueue();
return}let s;this.options.idleTimeoutMillis&&(s=setTimeout(()=>{this.log("remove\
 idle client"),this._remove(e);},this.options.idleTimeoutMillis),this.options.allowExitOnIdle&&
s.unref()),this.options.allowExitOnIdle&&e.unref(),this._idle.push(new fn(e,t,s)),
this._pulseQueue();}query(e,t,n){if(typeof e=="function"){let s=_t(this.Promise,e);
return S(function(){return s.callback(new Error("Passing a function as the first\
 parameter to pool.query is not supported"))}),s.result}typeof t=="function"&&(n=
t,t=void 0);let i=_t(this.Promise,n);return n=i.callback,this.connect((s,o)=>{if(s)
return n(s);let u=!1,c=a(h=>{u||(u=!0,o.release(h),n(h));},"onError");o.once("err\
or",c),this.log("dispatching query");try{o.query(e,t,(h,l)=>{if(this.log("query \
dispatched"),o.removeListener("error",c),!u)return u=!0,o.release(h),h?n(h):n(void 0,
l)});}catch(h){return o.release(h),n(h)}}),i.result}end(e){if(this.log("ending"),
this.ending){let n=new Error("Called end on pool more than once");return e?e(n):
this.Promise.reject(n)}this.ending=!0;let t=_t(this.Promise,e);return this._endCallback=
t.callback,this._pulseQueue(),t.result}get waitingCount(){return this._pendingQueue.
length}get idleCount(){return this._idle.length}get expiredCount(){return this._clients.
reduce((e,t)=>e+(this._expired.has(t)?1:0),0)}get totalCount(){return this._clients.
length}};a(mn,"Pool");var pn=mn;Fs.exports=pn;});var Ds={};ie(Ds,{default:()=>Ac});var Ac,ks=z(()=>{p();Ac={};});var Us=T((ff,Cc)=>{Cc.exports={name:"pg",version:"8.8.0",description:"PostgreSQL\
 client - pure javascript & libpq with the same API",keywords:["database","libpq",
"pg","postgre","postgres","postgresql","rdbms"],homepage:"https://github.com/bri\
anc/node-postgres",repository:{type:"git",url:"git://github.com/brianc/node-post\
gres.git",directory:"packages/pg"},author:"Brian Carlson <brian.m.carlson@gmail.\
com>",main:"./lib",dependencies:{"buffer-writer":"2.0.0","packet-reader":"1.0.0",
"pg-connection-string":"^2.5.0","pg-pool":"^3.5.2","pg-protocol":"^1.5.0","pg-ty\
pes":"^2.1.0",pgpass:"1.x"},devDependencies:{async:"2.6.4",bluebird:"3.5.2",co:"\
4.6.0","pg-copy-streams":"0.3.0"},peerDependencies:{"pg-native":">=3.0.1"},peerDependenciesMeta:{
"pg-native":{optional:!0}},scripts:{test:"make test-all"},files:["lib","SPONSORS\
.md"],license:"MIT",engines:{node:">= 8.0.0"},gitHead:"c99fb2c127ddf8d712500db2c\
7b9a5491a178655"};});var qs=T((pf,Ns)=>{p();var Os=we().EventEmitter,Ic=(He(),N(je)),gn=et(),
qe=Ns.exports=function(r,e,t){Os.call(this),r=gn.normalizeQueryConfig(r,e,t),this.
text=r.text,this.values=r.values,this.name=r.name,this.callback=r.callback,this.
state="new",this._arrayMode=r.rowMode==="array",this._emitRowEvents=!1,this.on("\
newListener",function(n){n==="row"&&(this._emitRowEvents=!0);}.bind(this));};Ic.inherits(
qe,Os);var Tc={sqlState:"code",statementPosition:"position",messagePrimary:"mess\
age",context:"where",schemaName:"schema",tableName:"table",columnName:"column",dataTypeName:"\
dataType",constraintName:"constraint",sourceFile:"file",sourceLine:"line",sourceFunction:"\
routine"};qe.prototype.handleError=function(r){var e=this.native.pq.resultErrorFields();
if(e)for(var t in e){var n=Tc[t]||t;r[n]=e[t];}this.callback?this.callback(r):this.
emit("error",r),this.state="error";};qe.prototype.then=function(r,e){return this.
_getPromise().then(r,e)};qe.prototype.catch=function(r){return this._getPromise().
catch(r)};qe.prototype._getPromise=function(){return this._promise?this._promise:
(this._promise=new Promise(function(r,e){this._once("end",r),this._once("error",
e);}.bind(this)),this._promise)};qe.prototype.submit=function(r){this.state="runn\
ing";var e=this;this.native=r.native,r.native.arrayMode=this._arrayMode;var t=a(
function(s,o,u){if(r.native.arrayMode=!1,S(function(){e.emit("_done");}),s)return e.
handleError(s);e._emitRowEvents&&(u.length>1?o.forEach((c,h)=>{c.forEach(l=>{e.emit(
"row",l,u[h]);});}):o.forEach(function(c){e.emit("row",c,u);})),e.state="end",e.emit(
"end",u),e.callback&&e.callback(null,u);},"after");if(m.domain&&(t=m.domain.bind(
t)),this.name){this.name.length>63&&(console.error("Warning! Postgres only suppo\
rts 63 characters for query names."),console.error("You supplied %s (%s)",this.name,
this.name.length),console.error("This can cause conflicts and silent errors exec\
uting queries"));var n=(this.values||[]).map(gn.prepareValue);if(r.namedQueries[this.
name]){if(this.text&&r.namedQueries[this.name]!==this.text){let s=new Error(`Pre\
pared statements must be unique - '${this.name}' was used for a different statem\
ent`);return t(s)}return r.native.execute(this.name,n,t)}return r.native.prepare(
this.name,this.text,n.length,function(s){return s?t(s):(r.namedQueries[e.name]=e.
text,e.native.execute(e.name,n,t))})}else if(this.values){if(!Array.isArray(this.
values)){let s=new Error("Query values must be an array");return t(s)}var i=this.
values.map(gn.prepareValue);r.native.query(this.text,i,t);}else r.native.query(this.
text,t);};});var Hs=T((gf,js)=>{p();var Pc=(ks(),N(Ds)),Bc=hr();Us();var Qs=we().
EventEmitter,Lc=(He(),N(je)),Rc=mt(),Ws=qs(),J=js.exports=function(r){Qs.call(this),
r=r||{},this._Promise=r.Promise||b.Promise,this._types=new Bc(r.types),this.native=
new Pc({types:this._types}),this._queryQueue=[],this._ending=!1,this._connecting=
!1,this._connected=!1,this._queryable=!0;var e=this.connectionParameters=new Rc(
r);this.user=e.user,Object.defineProperty(this,"password",{configurable:!0,enumerable:!1,
writable:!0,value:e.password}),this.database=e.database,this.host=e.host,this.port=
e.port,this.namedQueries={};};J.Query=Ws;Lc.inherits(J,Qs);J.prototype._errorAllQueries=
function(r){let e=a(t=>{m.nextTick(()=>{t.native=this.native,t.handleError(r);});},
"enqueueError");this._hasActiveQuery()&&(e(this._activeQuery),this._activeQuery=
null),this._queryQueue.forEach(e),this._queryQueue.length=0;};J.prototype._connect=
function(r){var e=this;if(this._connecting){m.nextTick(()=>r(new Error("Client h\
as already been connected. You cannot reuse a client.")));return}this._connecting=
!0,this.connectionParameters.getLibpqConnectionString(function(t,n){if(t)return r(
t);e.native.connect(n,function(i){if(i)return e.native.end(),r(i);e._connected=!0,
e.native.on("error",function(s){e._queryable=!1,e._errorAllQueries(s),e.emit("er\
ror",s);}),e.native.on("notification",function(s){e.emit("notification",{channel:s.
relname,payload:s.extra});}),e.emit("connect"),e._pulseQueryQueue(!0),r();});});};J.
prototype.connect=function(r){if(r){this._connect(r);return}return new this._Promise(
(e,t)=>{this._connect(n=>{n?t(n):e();});})};J.prototype.query=function(r,e,t){var n,
i,s,o,u;if(r==null)throw new TypeError("Client was passed a null or undefined qu\
ery");if(typeof r.submit=="function")s=r.query_timeout||this.connectionParameters.
query_timeout,i=n=r,typeof e=="function"&&(r.callback=e);else if(s=this.connectionParameters.
query_timeout,n=new Ws(r,e,t),!n.callback){let c,h;i=new this._Promise((l,y)=>{c=
l,h=y;}),n.callback=(l,y)=>l?h(l):c(y);}return s&&(u=n.callback,o=setTimeout(()=>{
var c=new Error("Query read timeout");m.nextTick(()=>{n.handleError(c,this.connection);}),
u(c),n.callback=()=>{};var h=this._queryQueue.indexOf(n);h>-1&&this._queryQueue.
splice(h,1),this._pulseQueryQueue();},s),n.callback=(c,h)=>{clearTimeout(o),u(c,h);}),
this._queryable?this._ending?(n.native=this.native,m.nextTick(()=>{n.handleError(
new Error("Client was closed and is not queryable"));}),i):(this._queryQueue.push(
n),this._pulseQueryQueue(),i):(n.native=this.native,m.nextTick(()=>{n.handleError(
new Error("Client has encountered a connection error and is not queryable"));}),i)};
J.prototype.end=function(r){var e=this;this._ending=!0,this._connected||this.once(
"connect",this.end.bind(this,r));var t;return r||(t=new this._Promise(function(n,i){
r=a(s=>s?i(s):n(),"cb");})),this.native.end(function(){e._errorAllQueries(new Error(
"Connection terminated")),m.nextTick(()=>{e.emit("end"),r&&r();});}),t};J.prototype.
_hasActiveQuery=function(){return this._activeQuery&&this._activeQuery.state!=="\
error"&&this._activeQuery.state!=="end"};J.prototype._pulseQueryQueue=function(r){
if(this._connected&&!this._hasActiveQuery()){var e=this._queryQueue.shift();if(!e){
r||this.emit("drain");return}this._activeQuery=e,e.submit(this);var t=this;e.once(
"_done",function(){t._pulseQueryQueue();});}};J.prototype.cancel=function(r){this.
_activeQuery===r?this.native.cancel(function(){}):this._queryQueue.indexOf(r)!==
-1&&this._queryQueue.splice(this._queryQueue.indexOf(r),1);};J.prototype.ref=function(){};
J.prototype.unref=function(){};J.prototype.setTypeParser=function(r,e,t){return this.
_types.setTypeParser(r,e,t)};J.prototype.getTypeParser=function(r,e){return this.
_types.getTypeParser(r,e)};});var wn=T((Sf,Gs)=>{p();Gs.exports=Hs();});var At=T((vf,rt)=>{p();var Fc=Bs(),Mc=Xe(),Dc=cn(),kc=Ms(),{DatabaseError:Uc}=on(),
Oc=a(r=>{var e;return e=class extends kc{constructor(n){super(n,r);}},a(e,"BoundP\
ool"),e},"poolFactory"),bn=a(function(r){this.defaults=Mc,this.Client=r,this.Query=
this.Client.Query,this.Pool=Oc(this.Client),this._pools=[],this.Connection=Dc,this.
types=Je(),this.DatabaseError=Uc;},"PG");typeof m.env.NODE_PG_FORCE_NATIVE<"u"?rt.
exports=new bn(wn()):(rt.exports=new bn(Fc),Object.defineProperty(rt.exports,"na\
tive",{configurable:!0,enumerable:!1,get(){var r=null;try{r=new bn(wn());}catch(e){
if(e.code!=="MODULE_NOT_FOUND")throw e}return Object.defineProperty(rt.exports,"\
native",{value:r}),r}}));});p();var Ct=Qe(At());gt();p();fr();gt();var Ks=Qe(et());var Sn=class Sn extends Error{constructor(){super(...arguments);_(this,"name","N\
eonDbError");_(this,"severity");_(this,"code");_(this,"detail");_(this,"hint");_(
this,"position");_(this,"internalPosition");_(this,"internalQuery");_(this,"wher\
e");_(this,"schema");_(this,"table");_(this,"column");_(this,"dataType");_(this,
"constraint");_(this,"file");_(this,"line");_(this,"routine");_(this,"sourceErro\
r");}};a(Sn,"NeonDbError");var Ce=Sn,$s="transaction() expects an array of querie\
s, or a function returning an array of queries",Nc=["severity","code","detail","\
hint","position","internalPosition","internalQuery","where","schema","table","co\
lumn","dataType","constraint","file","line","routine"];function zs(r,{arrayMode:e,
fullResults:t,fetchOptions:n,isolationLevel:i,readOnly:s,deferrable:o,queryCallback:u,
resultCallback:c}={}){if(!r)throw new Error("No database connection string was p\
rovided to `neon()`. Perhaps an environment variable has not been set?");let h;try{
h=lr(r);}catch{throw new Error("Database connection string provided to `neon()` i\
s not a valid URL. Connection string: "+String(r))}let{protocol:l,username:y,password:x,
hostname:C,port:B,pathname:W}=h;if(l!=="postgres:"&&l!=="postgresql:"||!y||!x||!C||
!W)throw new Error("Database connection string format for `neon()` should be: po\
stgresql://user:password@host.tld/dbname?option=value");function X(A,...w){let P,
V;if(typeof A=="string")P=A,V=w[1],w=w[0]??[];else {P="";for(let j=0;j<A.length;j++)
P+=A[j],j<w.length&&(P+="$"+(j+1));}w=w.map(j=>(0, Ks.prepareValue)(j));let k={query:P,
params:w};return u&&u(k),qc(de,k,V)}a(X,"resolve"),X.transaction=async(A,w)=>{if(typeof A==
"function"&&(A=A(X)),!Array.isArray(A))throw new Error($s);A.forEach(k=>{if(k[Symbol.
toStringTag]!=="NeonQueryPromise")throw new Error($s)});let P=A.map(k=>k.parameterizedQuery),
V=A.map(k=>k.opts??{});return de(P,V,w)};async function de(A,w,P){let{fetchEndpoint:V,
fetchFunction:k}=Ae,j=typeof V=="function"?V(C,B):V,ce=Array.isArray(A)?{queries:A}:
A,ee=n??{},R=e??!1,G=t??!1,he=i,ye=s,ve=o;P!==void 0&&(P.fetchOptions!==void 0&&
(ee={...ee,...P.fetchOptions}),P.arrayMode!==void 0&&(R=P.arrayMode),P.fullResults!==
void 0&&(G=P.fullResults),P.isolationLevel!==void 0&&(he=P.isolationLevel),P.readOnly!==
void 0&&(ye=P.readOnly),P.deferrable!==void 0&&(ve=P.deferrable)),w!==void 0&&!Array.
isArray(w)&&w.fetchOptions!==void 0&&(ee={...ee,...w.fetchOptions});let me={"Neo\
n-Connection-String":r,"Neon-Raw-Text-Output":"true","Neon-Array-Mode":"true"};Array.
isArray(A)&&(he!==void 0&&(me["Neon-Batch-Isolation-Level"]=he),ye!==void 0&&(me["\
Neon-Batch-Read-Only"]=String(ye)),ve!==void 0&&(me["Neon-Batch-Deferrable"]=String(
ve)));let se;try{se=await(k??fetch)(j,{method:"POST",body:JSON.stringify(ce),headers:me,
...ee});}catch(oe){let O=new Ce(`Error connecting to database: ${oe.message}`);throw O.
sourceError=oe,O}if(se.ok){let oe=await se.json();if(Array.isArray(A)){let O=oe.
results;if(!Array.isArray(O))throw new Ce("Neon internal error: unexpected resul\
t format");return O.map((K,le)=>{let _n=w[le]??{},Js=_n.arrayMode??R,Xs=_n.fullResults??
G;return Vs(K,{arrayMode:Js,fullResults:Xs,parameterizedQuery:A[le],resultCallback:c})})}else {
let O=w??{},K=O.arrayMode??R,le=O.fullResults??G;return Vs(oe,{arrayMode:K,fullResults:le,
parameterizedQuery:A,resultCallback:c})}}else {let{status:oe}=se;if(oe===400){let O=await se.
json(),K=new Ce(O.message);for(let le of Nc)K[le]=O[le]??void 0;throw K}else {let O=await se.
text();throw new Ce(`Server error (HTTP status ${oe}): ${O}`)}}}return a(de,"exe\
cute"),X}a(zs,"neon");function qc(r,e,t){return {[Symbol.toStringTag]:"NeonQueryP\
romise",parameterizedQuery:e,opts:t,then:a((n,i)=>r(e,t).then(n,i),"then"),catch:a(
n=>r(e,t).catch(n),"catch"),finally:a(n=>r(e,t).finally(n),"finally")}}a(qc,"cre\
ateNeonQueryPromise");function Vs(r,{arrayMode:e,fullResults:t,parameterizedQuery:n,
resultCallback:i}){let s=r.fields.map(c=>c.name),o=r.fields.map(c=>xe.types.getTypeParser(
c.dataTypeID)),u=e===!0?r.rows.map(c=>c.map((h,l)=>h===null?null:o[l](h))):r.rows.
map(c=>Object.fromEntries(c.map((h,l)=>[s[l],h===null?null:o[l](h)])));return i&&
i(n,r,u,{arrayMode:e,fullResults:t}),t?(r.viaNeonFetch=!0,r.rowAsArray=e,r.rows=
u,r):u}a(Vs,"processQueryResult");var Zs=Qe(mt()),xe=Qe(At());var vn=class vn extends Ct.Client{constructor(t){super(t);this.config=t;}get neonConfig(){
return this.connection.stream}connect(t){let{neonConfig:n}=this;n.forceDisablePgSSL&&
(this.ssl=this.connection.ssl=!1),this.ssl&&n.useSecureWebSocket&&console.warn("\
SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string\
 + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = tru\
e). Double encryption will increase latency and CPU usage. It may be appropriate\
 to disable SSL in the Postgres connection parameters or set forceDisablePgSSL =\
 true.");let i=this.config?.host!==void 0||this.config?.connectionString!==void 0||
m.env.PGHOST!==void 0,s=m.env.USER??m.env.USERNAME;if(!i&&this.host==="localhost"&&
this.user===s&&this.database===s&&this.password===null)throw new Error(`No datab\
ase host or connection string was set, and key parameters have default values (h\
ost: localhost, user: ${s}, db: ${s}, password: null). Is an environment variabl\
e missing? Alternatively, if you intended to connect with these parameters, plea\
se set the host to 'localhost' explicitly.`);let o=super.connect(t),u=n.pipelineTLS&&
this.ssl,c=n.pipelineConnect==="password";if(!u&&!n.pipelineConnect)return o;let h=this.
connection;if(u&&h.on("connect",()=>h.stream.emit("data","S")),c){h.removeAllListeners(
"authenticationCleartextPassword"),h.removeAllListeners("readyForQuery"),h.once(
"readyForQuery",()=>h.on("readyForQuery",this._handleReadyForQuery.bind(this)));
let l=this.ssl?"sslconnect":"connect";h.on(l,()=>{this._handleAuthCleartextPassword(),
this._handleReadyForQuery();});}return o}async _handleAuthSASLContinue(t){let n=this.
saslSession,i=this.password,s=t.data;if(n.message!=="SASLInitialResponse"||typeof i!=
"string"||typeof s!="string")throw new Error("SASL: protocol error");let o=Object.
fromEntries(s.split(",").map(O=>{if(!/^.=/.test(O))throw new Error("SASL: Invali\
d attribute pair entry");let K=O[0],le=O.substring(2);return [K,le]})),u=o.r,c=o.
s,h=o.i;if(!u||!/^[!-+--~]+$/.test(u))throw new Error("SASL: SCRAM-SERVER-FIRST-\
MESSAGE: nonce missing/unprintable");if(!c||!/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.
test(c))throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base\
64");if(!h||!/^[1-9][0-9]*$/.test(h))throw new Error("SASL: SCRAM-SERVER-FIRST-M\
ESSAGE: missing/invalid iteration count");if(!u.startsWith(n.clientNonce))throw new Error(
"SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
if(u.length===n.clientNonce.length)throw new Error("SASL: SCRAM-SERVER-FIRST-MES\
SAGE: server nonce is too short");let l=parseInt(h,10),y=d.from(c,"base64"),x=new TextEncoder,
C=x.encode(i),B=await g.subtle.importKey("raw",C,{name:"HMAC",hash:{name:"SHA-25\
6"}},!1,["sign"]),W=new Uint8Array(await g.subtle.sign("HMAC",B,d.concat([y,d.from(
[0,0,0,1])]))),X=W;for(var de=0;de<l-1;de++)W=new Uint8Array(await g.subtle.sign(
"HMAC",B,W)),X=d.from(X.map((O,K)=>X[K]^W[K]));let A=X,w=await g.subtle.importKey(
"raw",A,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign"]),P=new Uint8Array(await g.
subtle.sign("HMAC",w,x.encode("Client Key"))),V=await g.subtle.digest("SHA-256",
P),k="n=*,r="+n.clientNonce,j="r="+u+",s="+c+",i="+l,ce="c=biws,r="+u,ee=k+","+j+
","+ce,R=await g.subtle.importKey("raw",V,{name:"HMAC",hash:{name:"SHA-256"}},!1,
["sign"]);var G=new Uint8Array(await g.subtle.sign("HMAC",R,x.encode(ee))),he=d.
from(P.map((O,K)=>P[K]^G[K])),ye=he.toString("base64");let ve=await g.subtle.importKey(
"raw",A,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign"]),me=await g.subtle.sign(
"HMAC",ve,x.encode("Server Key")),se=await g.subtle.importKey("raw",me,{name:"HM\
AC",hash:{name:"SHA-256"}},!1,["sign"]);var oe=d.from(await g.subtle.sign("HMAC",
se,x.encode(ee)));n.message="SASLResponse",n.serverSignature=oe.toString("base64"),
n.response=ce+",p="+ye,this.connection.sendSCRAMClientFinalMessage(this.saslSession.
response);}};a(vn,"NeonClient");var xn=vn;function Qc(r,e){if(e)return {callback:e,
result:void 0};let t,n,i=a(function(o,u){o?t(o):n(u);},"cb"),s=new r(function(o,u){
n=o,t=u;});return {callback:i,result:s}}a(Qc,"promisify");var En=class En extends Ct.Pool{constructor(){
super(...arguments);_(this,"Client",xn);_(this,"hasFetchUnsupportedListeners",!1);}on(t,n){
return t!=="error"&&(this.hasFetchUnsupportedListeners=!0),super.on(t,n)}query(t,n,i){
if(!Ae.poolQueryViaFetch||this.hasFetchUnsupportedListeners||typeof t=="function")
return super.query(t,n,i);typeof n=="function"&&(i=n,n=void 0);let s=Qc(this.Promise,
i);i=s.callback;try{let o=new Zs.default(this.options),u=encodeURIComponent,c=encodeURI,
h=`postgresql://${u(o.user)}:${u(o.password)}@${u(o.host)}/${c(o.database)}`,l=typeof t==
"string"?t:t.text,y=n??t.values??[];zs(h,{fullResults:!0,arrayMode:t.rowMode==="\
array"})(l,y).then(C=>i(void 0,C)).catch(C=>i(C));}catch(o){i(o);}return s.result}};
a(En,"NeonPool");var Ys=En;xe.ClientBase;xe.Connection;xe.DatabaseError;
xe.Query;xe.defaults;xe.types;
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/

// src/create-pool.ts

// src/error.ts
var VercelPostgresError = class extends Error {
  constructor(code, message) {
    super(`VercelPostgresError - '${code}': ${message}`);
    this.code = code;
    this.name = "VercelPostgresError";
  }
};

// src/postgres-connection-string.ts
function postgresConnectionString(type = "pool") {
  let connectionString;
  switch (type) {
    case "pool": {
      connectionString = process.env.POSTGRES_URL;
      break;
    }
    case "direct": {
      connectionString = process.env.POSTGRES_URL_NON_POOLING;
      break;
    }
    default: {
      const _exhaustiveCheck = type;
      const str = _exhaustiveCheck;
      throw new VercelPostgresError(
        "invalid_connection_type",
        `Unhandled type: ${str}`
      );
    }
  }
  if (connectionString === "undefined")
    connectionString = void 0;
  return connectionString;
}
function isPooledConnectionString(connectionString) {
  return connectionString.includes("-pooler.");
}
function isLocalhostConnectionString(connectionString) {
  try {
    const withHttpsProtocol = connectionString.replace(
      /^postgresql:\/\//,
      "https://"
    );
    return new URL(withHttpsProtocol).hostname === "localhost";
  } catch (err) {
    if (err instanceof TypeError) {
      return false;
    }
    if (typeof err === "object" && err !== null && "message" in err && typeof err.message === "string" && err.message === "Invalid URL") {
      return false;
    }
    throw err;
  }
}

// src/sql-template.ts
function sqlTemplate(strings, ...values) {
  var _a, _b;
  if (!isTemplateStringsArray(strings) || !Array.isArray(values)) {
    throw new VercelPostgresError(
      "incorrect_tagged_template_call",
      "It looks like you tried to call `sql` as a function. Make sure to use it as a tagged template.\n	Example: sql`SELECT * FROM users`, not sql('SELECT * FROM users')"
    );
  }
  let result = (_a = strings[0]) != null ? _a : "";
  for (let i = 1; i < strings.length; i++) {
    result += `$${i}${(_b = strings[i]) != null ? _b : ""}`;
  }
  return [result, values];
}
function isTemplateStringsArray(strings) {
  return Array.isArray(strings) && "raw" in strings && Array.isArray(strings.raw);
}
var VercelClient = class extends xn {
  /**
   * A template literal tag providing safe, easy to use SQL parameterization.
   * Parameters are substituted using the underlying Postgres database, and so must follow
   * the rules of Postgres parameterization.
   * @example
   * ```ts
   * const pool = createClient();
   * const userId = 123;
   * await client.connect();
   * const result = await pool.sql`SELECT * FROM users WHERE id = ${userId}`;
   * // Equivalent to: await pool.query('SELECT * FROM users WHERE id = $1', [id]);
   * await client.end();
   * ```
   * @returns A promise that resolves to the query result.
   */
  async sql(strings, ...values) {
    const [query, params] = sqlTemplate(strings, ...values);
    return this.query(query, params);
  }
};

// src/create-pool.ts
var VercelPool = class extends Ys {
  constructor(config) {
    var _a;
    super(config);
    this.Client = VercelClient;
    this.connectionString = (_a = config.connectionString) != null ? _a : "";
  }
  /**
   * A template literal tag providing safe, easy to use SQL parameterization.
   * Parameters are substituted using the underlying Postgres database, and so must follow
   * the rules of Postgres parameterization.
   * @example
   * ```ts
   * const pool = createPool();
   * const userId = 123;
   * const result = await pool.sql`SELECT * FROM users WHERE id = ${userId}`;
   * // Equivalent to: await pool.query('SELECT * FROM users WHERE id = $1', [id]);
   * ```
   * @returns A promise that resolves to the query result.
   */
  async sql(strings, ...values) {
    const [query, params] = sqlTemplate(strings, ...values);
    const sql2 = zs(this.connectionString, {
      fullResults: true
    });
    return sql2(query, params);
  }
  connect(callback) {
    return super.connect(
      callback
    );
  }
};
function createPool(config) {
  var _a;
  const connectionString = (_a = void 0 ) != null ? _a : postgresConnectionString("pool");
  if (!connectionString)
    throw new VercelPostgresError(
      "missing_connection_string",
      "You did not supply a 'connectionString' and no 'POSTGRES_URL' env var was found."
    );
  if (!isLocalhostConnectionString(connectionString) && !isPooledConnectionString(connectionString))
    throw new VercelPostgresError(
      "invalid_connection_string",
      "This connection string is meant to be used with a direct connection. Make sure to use a pooled connection string or try `createClient()` instead."
    );
  let maxUses = void 0 ;
  let max = void 0 ;
  if (typeof EdgeRuntime !== "undefined") {
    if (maxUses && maxUses !== 1) {
      console.warn(
        "@vercel/postgres: Overriding `maxUses` to 1 because the EdgeRuntime does not support client reuse."
      );
    }
    if (max && max !== 1e4) {
      console.warn(
        "@vercel/postgres: Overriding `max` to 10,000 because the EdgeRuntime does not support client reuse."
      );
    }
    maxUses = 1;
    max = 1e4;
  }
  const pool2 = new VercelPool({
    ...config,
    connectionString,
    maxUses,
    max
  });
  return pool2;
}
var pool;
var sql = new Proxy(
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- [@vercel/style-guide@5 migration]
  () => {
  },
  {
    get(_, prop) {
      if (!pool) {
        pool = createPool();
      }
      const val = Reflect.get(pool, prop);
      if (typeof val === "function") {
        return val.bind(pool);
      }
      return val;
    },
    apply(_, __, argumentsList) {
      if (!pool) {
        pool = createPool();
      }
      return pool.sql(...argumentsList);
    }
  }
);

var browser = function () {
  throw new Error(
    'ws does not work in the browser. Browser clients must use the native ' +
      'WebSocket object'
  );
};

var ws = /*@__PURE__*/getDefaultExportFromCjs(browser);

if (Ae) {
  Ae.webSocketConstructor = ws;
}

var headers$2 = {exports: {}};

var requestCookies = {};

var cookies$1 = {};

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  RequestCookies: () => RequestCookies,
  ResponseCookies: () => ResponseCookies,
  parseCookie: () => parseCookie,
  parseSetCookie: () => parseSetCookie,
  stringifyCookie: () => stringifyCookie
});
var cookies = __toCommonJS(src_exports);

// src/serialize.ts
function stringifyCookie(c) {
  var _a;
  const attrs = [
    "path" in c && c.path && `Path=${c.path}`,
    "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
    "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
    "domain" in c && c.domain && `Domain=${c.domain}`,
    "secure" in c && c.secure && "Secure",
    "httpOnly" in c && c.httpOnly && "HttpOnly",
    "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
    "partitioned" in c && c.partitioned && "Partitioned",
    "priority" in c && c.priority && `Priority=${c.priority}`
  ].filter(Boolean);
  const stringified = `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}`;
  return attrs.length === 0 ? stringified : `${stringified}; ${attrs.join("; ")}`;
}
function parseCookie(cookie) {
  const map = /* @__PURE__ */ new Map();
  for (const pair of cookie.split(/; */)) {
    if (!pair)
      continue;
    const splitAt = pair.indexOf("=");
    if (splitAt === -1) {
      map.set(pair, "true");
      continue;
    }
    const [key, value] = [pair.slice(0, splitAt), pair.slice(splitAt + 1)];
    try {
      map.set(key, decodeURIComponent(value != null ? value : "true"));
    } catch {
    }
  }
  return map;
}
function parseSetCookie(setCookie) {
  if (!setCookie) {
    return void 0;
  }
  const [[name, value], ...attributes] = parseCookie(setCookie);
  const {
    domain,
    expires,
    httponly,
    maxage,
    path,
    samesite,
    secure,
    partitioned,
    priority
  } = Object.fromEntries(
    attributes.map(([key, value2]) => [key.toLowerCase(), value2])
  );
  const cookie = {
    name,
    value: decodeURIComponent(value),
    domain,
    ...expires && { expires: new Date(expires) },
    ...httponly && { httpOnly: true },
    ...typeof maxage === "string" && { maxAge: Number(maxage) },
    path,
    ...samesite && { sameSite: parseSameSite(samesite) },
    ...secure && { secure: true },
    ...priority && { priority: parsePriority(priority) },
    ...partitioned && { partitioned: true }
  };
  return compact(cookie);
}
function compact(t) {
  const newT = {};
  for (const key in t) {
    if (t[key]) {
      newT[key] = t[key];
    }
  }
  return newT;
}
var SAME_SITE = ["strict", "lax", "none"];
function parseSameSite(string) {
  string = string.toLowerCase();
  return SAME_SITE.includes(string) ? string : void 0;
}
var PRIORITY = ["low", "medium", "high"];
function parsePriority(string) {
  string = string.toLowerCase();
  return PRIORITY.includes(string) ? string : void 0;
}
function splitCookiesString(cookiesString) {
  if (!cookiesString)
    return [];
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

// src/request-cookies.ts
var RequestCookies = class {
  constructor(requestHeaders) {
    /** @internal */
    this._parsed = /* @__PURE__ */ new Map();
    this._headers = requestHeaders;
    const header = requestHeaders.get("cookie");
    if (header) {
      const parsed = parseCookie(header);
      for (const [name, value] of parsed) {
        this._parsed.set(name, { name, value });
      }
    }
  }
  [Symbol.iterator]() {
    return this._parsed[Symbol.iterator]();
  }
  /**
   * The amount of cookies received from the client
   */
  get size() {
    return this._parsed.size;
  }
  get(...args) {
    const name = typeof args[0] === "string" ? args[0] : args[0].name;
    return this._parsed.get(name);
  }
  getAll(...args) {
    var _a;
    const all = Array.from(this._parsed);
    if (!args.length) {
      return all.map(([_, value]) => value);
    }
    const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
    return all.filter(([n]) => n === name).map(([_, value]) => value);
  }
  has(name) {
    return this._parsed.has(name);
  }
  set(...args) {
    const [name, value] = args.length === 1 ? [args[0].name, args[0].value] : args;
    const map = this._parsed;
    map.set(name, { name, value });
    this._headers.set(
      "cookie",
      Array.from(map).map(([_, value2]) => stringifyCookie(value2)).join("; ")
    );
    return this;
  }
  /**
   * Delete the cookies matching the passed name or names in the request.
   */
  delete(names) {
    const map = this._parsed;
    const result = !Array.isArray(names) ? map.delete(names) : names.map((name) => map.delete(name));
    this._headers.set(
      "cookie",
      Array.from(map).map(([_, value]) => stringifyCookie(value)).join("; ")
    );
    return result;
  }
  /**
   * Delete all the cookies in the cookies in the request.
   */
  clear() {
    this.delete(Array.from(this._parsed.keys()));
    return this;
  }
  /**
   * Format the cookies in the request as a string for logging
   */
  [Symbol.for("edge-runtime.inspect.custom")]() {
    return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
  }
  toString() {
    return [...this._parsed.values()].map((v) => `${v.name}=${encodeURIComponent(v.value)}`).join("; ");
  }
};

// src/response-cookies.ts
var ResponseCookies = class {
  constructor(responseHeaders) {
    /** @internal */
    this._parsed = /* @__PURE__ */ new Map();
    var _a, _b, _c;
    this._headers = responseHeaders;
    const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
    const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
    for (const cookieString of cookieStrings) {
      const parsed = parseSetCookie(cookieString);
      if (parsed)
        this._parsed.set(parsed.name, parsed);
    }
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */
  get(...args) {
    const key = typeof args[0] === "string" ? args[0] : args[0].name;
    return this._parsed.get(key);
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */
  getAll(...args) {
    var _a;
    const all = Array.from(this._parsed.values());
    if (!args.length) {
      return all;
    }
    const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
    return all.filter((c) => c.name === key);
  }
  has(name) {
    return this._parsed.has(name);
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */
  set(...args) {
    const [name, value, cookie] = args.length === 1 ? [args[0].name, args[0].value, args[0]] : args;
    const map = this._parsed;
    map.set(name, normalizeCookie({ name, value, ...cookie }));
    replace(map, this._headers);
    return this;
  }
  /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */
  delete(...args) {
    const [name, path, domain] = typeof args[0] === "string" ? [args[0]] : [args[0].name, args[0].path, args[0].domain];
    return this.set({ name, path, domain, value: "", expires: /* @__PURE__ */ new Date(0) });
  }
  [Symbol.for("edge-runtime.inspect.custom")]() {
    return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
  }
  toString() {
    return [...this._parsed.values()].map(stringifyCookie).join("; ");
  }
};
function replace(bag, headers) {
  headers.delete("set-cookie");
  for (const [, value] of bag) {
    const serialized = stringifyCookie(value);
    headers.append("set-cookie", serialized);
  }
}
function normalizeCookie(cookie = { name: "", value: "" }) {
  if (typeof cookie.expires === "number") {
    cookie.expires = new Date(cookie.expires);
  }
  if (cookie.maxAge) {
    cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
  }
  if (cookie.path === null || cookie.path === void 0) {
    cookie.path = "/";
  }
  return cookie;
}

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    RequestCookies: function() {
	        return _cookies.RequestCookies;
	    },
	    ResponseCookies: function() {
	        return _cookies.ResponseCookies;
	    }
	});
	const _cookies = cookies;

	
} (cookies$1));

var reflect = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "ReflectAdapter", {
	    enumerable: true,
	    get: function() {
	        return ReflectAdapter;
	    }
	});
	class ReflectAdapter {
	    static get(target, prop, receiver) {
	        const value = Reflect.get(target, prop, receiver);
	        if (typeof value === "function") {
	            return value.bind(target);
	        }
	        return value;
	    }
	    static set(target, prop, value, receiver) {
	        return Reflect.set(target, prop, value, receiver);
	    }
	    static has(target, prop) {
	        return Reflect.has(target, prop);
	    }
	    static deleteProperty(target, prop) {
	        return Reflect.deleteProperty(target, prop);
	    }
	}

	
} (reflect));

var staticGenerationAsyncStorage_external = {exports: {}};

var staticGenerationAsyncStorageInstance = {exports: {}};

var asyncLocalStorage = {exports: {}};

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "createAsyncLocalStorage", {
	    enumerable: true,
	    get: function() {
	        return createAsyncLocalStorage;
	    }
	});
	const sharedAsyncLocalStorageNotAvailableError = new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
	class FakeAsyncLocalStorage {
	    disable() {
	        throw sharedAsyncLocalStorageNotAvailableError;
	    }
	    getStore() {
	        // This fake implementation of AsyncLocalStorage always returns `undefined`.
	        return undefined;
	    }
	    run() {
	        throw sharedAsyncLocalStorageNotAvailableError;
	    }
	    exit() {
	        throw sharedAsyncLocalStorageNotAvailableError;
	    }
	    enterWith() {
	        throw sharedAsyncLocalStorageNotAvailableError;
	    }
	}
	const maybeGlobalAsyncLocalStorage = globalThis.AsyncLocalStorage;
	function createAsyncLocalStorage() {
	    if (maybeGlobalAsyncLocalStorage) {
	        return new maybeGlobalAsyncLocalStorage();
	    }
	    return new FakeAsyncLocalStorage();
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (asyncLocalStorage, asyncLocalStorage.exports));

var asyncLocalStorageExports = asyncLocalStorage.exports;

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "staticGenerationAsyncStorage", {
	    enumerable: true,
	    get: function() {
	        return staticGenerationAsyncStorage;
	    }
	});
	const _asynclocalstorage = asyncLocalStorageExports;
	const staticGenerationAsyncStorage = (0, _asynclocalstorage.createAsyncLocalStorage)();

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (staticGenerationAsyncStorageInstance, staticGenerationAsyncStorageInstance.exports));

var staticGenerationAsyncStorageInstanceExports = staticGenerationAsyncStorageInstance.exports;

(function (module, exports) {
	"TURBOPACK { transition: next-shared }";
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "staticGenerationAsyncStorage", {
	    enumerable: true,
	    get: function() {
	        return _staticgenerationasyncstorageinstance.staticGenerationAsyncStorage;
	    }
	});
	const _staticgenerationasyncstorageinstance = staticGenerationAsyncStorageInstanceExports;

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (staticGenerationAsyncStorage_external, staticGenerationAsyncStorage_external.exports));

var staticGenerationAsyncStorage_externalExports = staticGenerationAsyncStorage_external.exports;

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    MutableRequestCookiesAdapter: function() {
	        return MutableRequestCookiesAdapter;
	    },
	    ReadonlyRequestCookiesError: function() {
	        return ReadonlyRequestCookiesError;
	    },
	    RequestCookiesAdapter: function() {
	        return RequestCookiesAdapter;
	    },
	    appendMutableCookies: function() {
	        return appendMutableCookies;
	    },
	    getModifiedCookieValues: function() {
	        return getModifiedCookieValues;
	    }
	});
	const _cookies = cookies$1;
	const _reflect = reflect;
	const _staticgenerationasyncstorageexternal = staticGenerationAsyncStorage_externalExports;
	class ReadonlyRequestCookiesError extends Error {
	    constructor(){
	        super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
	    }
	    static callable() {
	        throw new ReadonlyRequestCookiesError();
	    }
	}
	class RequestCookiesAdapter {
	    static seal(cookies) {
	        return new Proxy(cookies, {
	            get (target, prop, receiver) {
	                switch(prop){
	                    case "clear":
	                    case "delete":
	                    case "set":
	                        return ReadonlyRequestCookiesError.callable;
	                    default:
	                        return _reflect.ReflectAdapter.get(target, prop, receiver);
	                }
	            }
	        });
	    }
	}
	const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for("next.mutated.cookies");
	function getModifiedCookieValues(cookies) {
	    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
	    if (!modified || !Array.isArray(modified) || modified.length === 0) {
	        return [];
	    }
	    return modified;
	}
	function appendMutableCookies(headers, mutableCookies) {
	    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
	    if (modifiedCookieValues.length === 0) {
	        return false;
	    }
	    // Return a new response that extends the response with
	    // the modified cookies as fallbacks. `res` cookies
	    // will still take precedence.
	    const resCookies = new _cookies.ResponseCookies(headers);
	    const returnedCookies = resCookies.getAll();
	    // Set the modified cookies as fallbacks.
	    for (const cookie of modifiedCookieValues){
	        resCookies.set(cookie);
	    }
	    // Set the original cookies as the final values.
	    for (const cookie of returnedCookies){
	        resCookies.set(cookie);
	    }
	    return true;
	}
	class MutableRequestCookiesAdapter {
	    static wrap(cookies, onUpdateCookies) {
	        const responseCookies = new _cookies.ResponseCookies(new Headers());
	        for (const cookie of cookies.getAll()){
	            responseCookies.set(cookie);
	        }
	        let modifiedValues = [];
	        const modifiedCookies = new Set();
	        const updateResponseCookies = ()=>{
	            // TODO-APP: change method of getting staticGenerationAsyncStore
	            const staticGenerationAsyncStore = _staticgenerationasyncstorageexternal.staticGenerationAsyncStorage.getStore();
	            if (staticGenerationAsyncStore) {
	                staticGenerationAsyncStore.pathWasRevalidated = true;
	            }
	            const allCookies = responseCookies.getAll();
	            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
	            if (onUpdateCookies) {
	                const serializedCookies = [];
	                for (const cookie of modifiedValues){
	                    const tempCookies = new _cookies.ResponseCookies(new Headers());
	                    tempCookies.set(cookie);
	                    serializedCookies.push(tempCookies.toString());
	                }
	                onUpdateCookies(serializedCookies);
	            }
	        };
	        return new Proxy(responseCookies, {
	            get (target, prop, receiver) {
	                switch(prop){
	                    // A special symbol to get the modified cookie values
	                    case SYMBOL_MODIFY_COOKIE_VALUES:
	                        return modifiedValues;
	                    // TODO: Throw error if trying to set a cookie after the response
	                    // headers have been set.
	                    case "delete":
	                        return function(...args) {
	                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
	                            try {
	                                target.delete(...args);
	                            } finally{
	                                updateResponseCookies();
	                            }
	                        };
	                    case "set":
	                        return function(...args) {
	                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
	                            try {
	                                return target.set(...args);
	                            } finally{
	                                updateResponseCookies();
	                            }
	                        };
	                    default:
	                        return _reflect.ReflectAdapter.get(target, prop, receiver);
	                }
	            }
	        });
	    }
	}

	
} (requestCookies));

var headers$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    HeadersAdapter: function() {
	        return HeadersAdapter;
	    },
	    ReadonlyHeadersError: function() {
	        return ReadonlyHeadersError;
	    }
	});
	const _reflect = reflect;
	class ReadonlyHeadersError extends Error {
	    constructor(){
	        super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
	    }
	    static callable() {
	        throw new ReadonlyHeadersError();
	    }
	}
	class HeadersAdapter extends Headers {
	    constructor(headers){
	        // We've already overridden the methods that would be called, so we're just
	        // calling the super constructor to ensure that the instanceof check works.
	        super();
	        this.headers = new Proxy(headers, {
	            get (target, prop, receiver) {
	                // Because this is just an object, we expect that all "get" operations
	                // are for properties. If it's a "get" for a symbol, we'll just return
	                // the symbol.
	                if (typeof prop === "symbol") {
	                    return _reflect.ReflectAdapter.get(target, prop, receiver);
	                }
	                const lowercased = prop.toLowerCase();
	                // Let's find the original casing of the key. This assumes that there is
	                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
	                // headers object.
	                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
	                // If the original casing doesn't exist, return undefined.
	                if (typeof original === "undefined") return;
	                // If the original casing exists, return the value.
	                return _reflect.ReflectAdapter.get(target, original, receiver);
	            },
	            set (target, prop, value, receiver) {
	                if (typeof prop === "symbol") {
	                    return _reflect.ReflectAdapter.set(target, prop, value, receiver);
	                }
	                const lowercased = prop.toLowerCase();
	                // Let's find the original casing of the key. This assumes that there is
	                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
	                // headers object.
	                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
	                // If the original casing doesn't exist, use the prop as the key.
	                return _reflect.ReflectAdapter.set(target, original ?? prop, value, receiver);
	            },
	            has (target, prop) {
	                if (typeof prop === "symbol") return _reflect.ReflectAdapter.has(target, prop);
	                const lowercased = prop.toLowerCase();
	                // Let's find the original casing of the key. This assumes that there is
	                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
	                // headers object.
	                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
	                // If the original casing doesn't exist, return false.
	                if (typeof original === "undefined") return false;
	                // If the original casing exists, return true.
	                return _reflect.ReflectAdapter.has(target, original);
	            },
	            deleteProperty (target, prop) {
	                if (typeof prop === "symbol") return _reflect.ReflectAdapter.deleteProperty(target, prop);
	                const lowercased = prop.toLowerCase();
	                // Let's find the original casing of the key. This assumes that there is
	                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
	                // headers object.
	                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
	                // If the original casing doesn't exist, return true.
	                if (typeof original === "undefined") return true;
	                // If the original casing exists, delete the property.
	                return _reflect.ReflectAdapter.deleteProperty(target, original);
	            }
	        });
	    }
	    /**
	   * Seals a Headers instance to prevent modification by throwing an error when
	   * any mutating method is called.
	   */ static seal(headers) {
	        return new Proxy(headers, {
	            get (target, prop, receiver) {
	                switch(prop){
	                    case "append":
	                    case "delete":
	                    case "set":
	                        return ReadonlyHeadersError.callable;
	                    default:
	                        return _reflect.ReflectAdapter.get(target, prop, receiver);
	                }
	            }
	        });
	    }
	    /**
	   * Merges a header value into a string. This stores multiple values as an
	   * array, so we need to merge them into a string.
	   *
	   * @param value a header value
	   * @returns a merged header value (a string)
	   */ merge(value) {
	        if (Array.isArray(value)) return value.join(", ");
	        return value;
	    }
	    /**
	   * Creates a Headers instance from a plain object or a Headers instance.
	   *
	   * @param headers a plain object or a Headers instance
	   * @returns a headers instance
	   */ static from(headers) {
	        if (headers instanceof Headers) return headers;
	        return new HeadersAdapter(headers);
	    }
	    append(name, value) {
	        const existing = this.headers[name];
	        if (typeof existing === "string") {
	            this.headers[name] = [
	                existing,
	                value
	            ];
	        } else if (Array.isArray(existing)) {
	            existing.push(value);
	        } else {
	            this.headers[name] = value;
	        }
	    }
	    delete(name) {
	        delete this.headers[name];
	    }
	    get(name) {
	        const value = this.headers[name];
	        if (typeof value !== "undefined") return this.merge(value);
	        return null;
	    }
	    has(name) {
	        return typeof this.headers[name] !== "undefined";
	    }
	    set(name, value) {
	        this.headers[name] = value;
	    }
	    forEach(callbackfn, thisArg) {
	        for (const [name, value] of this.entries()){
	            callbackfn.call(thisArg, value, name, this);
	        }
	    }
	    *entries() {
	        for (const key of Object.keys(this.headers)){
	            const name = key.toLowerCase();
	            // We assert here that this is a string because we got it from the
	            // Object.keys() call above.
	            const value = this.get(name);
	            yield [
	                name,
	                value
	            ];
	        }
	    }
	    *keys() {
	        for (const key of Object.keys(this.headers)){
	            const name = key.toLowerCase();
	            yield name;
	        }
	    }
	    *values() {
	        for (const key of Object.keys(this.headers)){
	            // We assert here that this is a string because we got it from the
	            // Object.keys() call above.
	            const value = this.get(key);
	            yield value;
	        }
	    }
	    [Symbol.iterator]() {
	        return this.entries();
	    }
	}

	
} (headers$1));

var actionAsyncStorage_external = {exports: {}};

var actionAsyncStorageInstance = {exports: {}};

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "actionAsyncStorage", {
	    enumerable: true,
	    get: function() {
	        return actionAsyncStorage;
	    }
	});
	const _asynclocalstorage = asyncLocalStorageExports;
	const actionAsyncStorage = (0, _asynclocalstorage.createAsyncLocalStorage)();

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (actionAsyncStorageInstance, actionAsyncStorageInstance.exports));

var actionAsyncStorageInstanceExports = actionAsyncStorageInstance.exports;

(function (module, exports) {
	"TURBOPACK { transition: next-shared }";
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "actionAsyncStorage", {
	    enumerable: true,
	    get: function() {
	        return _actionasyncstorageinstance.actionAsyncStorage;
	    }
	});
	const _actionasyncstorageinstance = actionAsyncStorageInstanceExports;

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (actionAsyncStorage_external, actionAsyncStorage_external.exports));

var actionAsyncStorage_externalExports = actionAsyncStorage_external.exports;

var draftMode = {exports: {}};

var dynamicRendering = {};

var hooksServerContext = {exports: {}};

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    DynamicServerError: function() {
	        return DynamicServerError;
	    },
	    isDynamicServerError: function() {
	        return isDynamicServerError;
	    }
	});
	const DYNAMIC_ERROR_CODE = "DYNAMIC_SERVER_USAGE";
	class DynamicServerError extends Error {
	    constructor(description){
	        super("Dynamic server usage: " + description);
	        this.description = description;
	        this.digest = DYNAMIC_ERROR_CODE;
	    }
	}
	function isDynamicServerError(err) {
	    if (typeof err !== "object" || err === null || !("digest" in err) || typeof err.digest !== "string") {
	        return false;
	    }
	    return err.digest === DYNAMIC_ERROR_CODE;
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (hooksServerContext, hooksServerContext.exports));

var hooksServerContextExports = hooksServerContext.exports;

var staticGenerationBailout = {exports: {}};

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    StaticGenBailoutError: function() {
	        return StaticGenBailoutError;
	    },
	    isStaticGenBailoutError: function() {
	        return isStaticGenBailoutError;
	    }
	});
	const NEXT_STATIC_GEN_BAILOUT = "NEXT_STATIC_GEN_BAILOUT";
	class StaticGenBailoutError extends Error {
	    constructor(...args){
	        super(...args);
	        this.code = NEXT_STATIC_GEN_BAILOUT;
	    }
	}
	function isStaticGenBailoutError(error) {
	    if (typeof error !== "object" || error === null || !("code" in error)) {
	        return false;
	    }
	    return error.code === NEXT_STATIC_GEN_BAILOUT;
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (staticGenerationBailout, staticGenerationBailout.exports));

var staticGenerationBailoutExports = staticGenerationBailout.exports;

var url = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    getPathname: function() {
	        return getPathname;
	    },
	    isFullStringUrl: function() {
	        return isFullStringUrl;
	    }
	});
	const DUMMY_ORIGIN = "http://n";
	function getUrlWithoutHost(url) {
	    return new URL(url, DUMMY_ORIGIN);
	}
	function getPathname(url) {
	    return getUrlWithoutHost(url).pathname;
	}
	function isFullStringUrl(url) {
	    return /https?:\/\//.test(url);
	}

	
} (url));

/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    Postpone: function() {
	        return Postpone;
	    },
	    createPostponedAbortSignal: function() {
	        return createPostponedAbortSignal;
	    },
	    createPrerenderState: function() {
	        return createPrerenderState;
	    },
	    formatDynamicAPIAccesses: function() {
	        return formatDynamicAPIAccesses;
	    },
	    markCurrentScopeAsDynamic: function() {
	        return markCurrentScopeAsDynamic;
	    },
	    trackDynamicDataAccessed: function() {
	        return trackDynamicDataAccessed;
	    },
	    trackDynamicFetch: function() {
	        return trackDynamicFetch;
	    },
	    usedDynamicAPIs: function() {
	        return usedDynamicAPIs;
	    }
	});
	const _react = /*#__PURE__*/ _interop_require_default(require$$0);
	const _hooksservercontext = hooksServerContextExports;
	const _staticgenerationbailout = staticGenerationBailoutExports;
	const _url = url;
	function _interop_require_default(obj) {
	    return obj && obj.__esModule ? obj : {
	        default: obj
	    };
	}
	const hasPostpone = typeof _react.default.unstable_postpone === "function";
	function createPrerenderState(isDebugSkeleton) {
	    return {
	        isDebugSkeleton,
	        dynamicAccesses: []
	    };
	}
	function markCurrentScopeAsDynamic(store, expression) {
	    const pathname = (0, _url.getPathname)(store.urlPathname);
	    if (store.isUnstableCacheCallback) {
	        // inside cache scopes marking a scope as dynamic has no effect because the outer cache scope
	        // creates a cache boundary. This is subtly different from reading a dynamic data source which is
	        // forbidden inside a cache scope.
	        return;
	    } else if (store.dynamicShouldError) {
	        throw new _staticgenerationbailout.StaticGenBailoutError(`Route ${pathname} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
	    } else if (// We are in a prerender (PPR enabled, during build)
	    store.prerenderState) {
	        // We track that we had a dynamic scope that postponed.
	        // This will be used by the renderer to decide whether
	        // the prerender requires a resume
	        postponeWithTracking(store.prerenderState, expression, pathname);
	    } else {
	        store.revalidate = 0;
	        if (store.isStaticGeneration) {
	            // We aren't prerendering but we are generating a static page. We need to bail out of static generation
	            const err = new _hooksservercontext.DynamicServerError(`Route ${pathname} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
	            store.dynamicUsageDescription = expression;
	            store.dynamicUsageStack = err.stack;
	            throw err;
	        }
	    }
	}
	function trackDynamicDataAccessed(store, expression) {
	    const pathname = (0, _url.getPathname)(store.urlPathname);
	    if (store.isUnstableCacheCallback) {
	        throw new Error(`Route ${pathname} used "${expression}" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "${expression}" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
	    } else if (store.dynamicShouldError) {
	        throw new _staticgenerationbailout.StaticGenBailoutError(`Route ${pathname} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
	    } else if (// We are in a prerender (PPR enabled, during build)
	    store.prerenderState) {
	        // We track that we had a dynamic scope that postponed.
	        // This will be used by the renderer to decide whether
	        // the prerender requires a resume
	        postponeWithTracking(store.prerenderState, expression, pathname);
	    } else {
	        store.revalidate = 0;
	        if (store.isStaticGeneration) {
	            // We aren't prerendering but we are generating a static page. We need to bail out of static generation
	            const err = new _hooksservercontext.DynamicServerError(`Route ${pathname} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
	            store.dynamicUsageDescription = expression;
	            store.dynamicUsageStack = err.stack;
	            throw err;
	        }
	    }
	}
	function Postpone({ reason, prerenderState, pathname }) {
	    postponeWithTracking(prerenderState, reason, pathname);
	}
	function trackDynamicFetch(store, expression) {
	    if (store.prerenderState) {
	        postponeWithTracking(store.prerenderState, expression, store.urlPathname);
	    }
	}
	function postponeWithTracking(prerenderState, expression, pathname) {
	    assertPostpone();
	    const reason = `Route ${pathname} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
	    prerenderState.dynamicAccesses.push({
	        // When we aren't debugging, we don't need to create another error for the
	        // stack trace.
	        stack: prerenderState.isDebugSkeleton ? new Error().stack : undefined,
	        expression
	    });
	    _react.default.unstable_postpone(reason);
	}
	function usedDynamicAPIs(prerenderState) {
	    return prerenderState.dynamicAccesses.length > 0;
	}
	function formatDynamicAPIAccesses(prerenderState) {
	    return prerenderState.dynamicAccesses.filter((access)=>typeof access.stack === "string" && access.stack.length > 0).map(({ expression, stack })=>{
	        stack = stack.split("\n")// Remove the "Error: " prefix from the first line of the stack trace as
	        // well as the first 4 lines of the stack trace which is the distance
	        // from the user code and the `new Error().stack` call.
	        .slice(4).filter((line)=>{
	            // Exclude Next.js internals from the stack trace.
	            if (line.includes("node_modules/next/")) {
	                return false;
	            }
	            // Exclude anonymous functions from the stack trace.
	            if (line.includes(" (<anonymous>)")) {
	                return false;
	            }
	            // Exclude Node.js internals from the stack trace.
	            if (line.includes(" (node:")) {
	                return false;
	            }
	            return true;
	        }).join("\n");
	        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
	    });
	}
	function assertPostpone() {
	    if (!hasPostpone) {
	        throw new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`);
	    }
	}
	function createPostponedAbortSignal(reason) {
	    assertPostpone();
	    const controller = new AbortController();
	    // We get our hands on a postpone instance by calling postpone and catching the throw
	    try {
	        _react.default.unstable_postpone(reason);
	    } catch (x) {
	        controller.abort(x);
	    }
	    return controller.signal;
	}

	
} (dynamicRendering));

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "DraftMode", {
	    enumerable: true,
	    get: function() {
	        return DraftMode;
	    }
	});
	const _staticgenerationasyncstorageexternal = staticGenerationAsyncStorage_externalExports;
	const _dynamicrendering = dynamicRendering;
	class DraftMode {
	    get isEnabled() {
	        return this._provider.isEnabled;
	    }
	    enable() {
	        const store = _staticgenerationasyncstorageexternal.staticGenerationAsyncStorage.getStore();
	        if (store) {
	            // We we have a store we want to track dynamic data access to ensure we
	            // don't statically generate routes that manipulate draft mode.
	            (0, _dynamicrendering.trackDynamicDataAccessed)(store, "draftMode().enable()");
	        }
	        return this._provider.enable();
	    }
	    disable() {
	        const store = _staticgenerationasyncstorageexternal.staticGenerationAsyncStorage.getStore();
	        if (store) {
	            // We we have a store we want to track dynamic data access to ensure we
	            // don't statically generate routes that manipulate draft mode.
	            (0, _dynamicrendering.trackDynamicDataAccessed)(store, "draftMode().disable()");
	        }
	        return this._provider.disable();
	    }
	    constructor(provider){
	        this._provider = provider;
	    }
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (draftMode, draftMode.exports));

var draftModeExports = draftMode.exports;

var requestAsyncStorage_external = {exports: {}};

var requestAsyncStorageInstance = {exports: {}};

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "requestAsyncStorage", {
	    enumerable: true,
	    get: function() {
	        return requestAsyncStorage;
	    }
	});
	const _asynclocalstorage = asyncLocalStorageExports;
	const requestAsyncStorage = (0, _asynclocalstorage.createAsyncLocalStorage)();

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (requestAsyncStorageInstance, requestAsyncStorageInstance.exports));

var requestAsyncStorageInstanceExports = requestAsyncStorageInstance.exports;

(function (module, exports) {
	"TURBOPACK { transition: next-shared }";
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    getExpectedRequestStore: function() {
	        return getExpectedRequestStore;
	    },
	    requestAsyncStorage: function() {
	        return _requestasyncstorageinstance.requestAsyncStorage;
	    }
	});
	const _requestasyncstorageinstance = requestAsyncStorageInstanceExports;
	function getExpectedRequestStore(callingExpression) {
	    const store = _requestasyncstorageinstance.requestAsyncStorage.getStore();
	    if (store) return store;
	    throw new Error("`" + callingExpression + "` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context");
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (requestAsyncStorage_external, requestAsyncStorage_external.exports));

var requestAsyncStorage_externalExports = requestAsyncStorage_external.exports;

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    cookies: function() {
	        return cookies;
	    },
	    draftMode: function() {
	        return draftMode;
	    },
	    headers: function() {
	        return headers;
	    }
	});
	const _requestcookies = requestCookies;
	const _headers = headers$1;
	const _cookies = cookies$1;
	const _actionasyncstorageexternal = actionAsyncStorage_externalExports;
	const _draftmode = draftModeExports;
	const _dynamicrendering = dynamicRendering;
	const _staticgenerationasyncstorageexternal = staticGenerationAsyncStorage_externalExports;
	const _requestasyncstorageexternal = requestAsyncStorage_externalExports;
	function headers() {
	    const callingExpression = "headers";
	    const staticGenerationStore = _staticgenerationasyncstorageexternal.staticGenerationAsyncStorage.getStore();
	    if (staticGenerationStore) {
	        if (staticGenerationStore.forceStatic) {
	            // When we are forcing static we don't mark this as a Dynamic read and we return an empty headers object
	            return _headers.HeadersAdapter.seal(new Headers({}));
	        } else {
	            // We will return a real headers object below so we mark this call as reading from a dynamic data source
	            (0, _dynamicrendering.trackDynamicDataAccessed)(staticGenerationStore, callingExpression);
	        }
	    }
	    return (0, _requestasyncstorageexternal.getExpectedRequestStore)(callingExpression).headers;
	}
	function cookies() {
	    const callingExpression = "cookies";
	    const staticGenerationStore = _staticgenerationasyncstorageexternal.staticGenerationAsyncStorage.getStore();
	    if (staticGenerationStore) {
	        if (staticGenerationStore.forceStatic) {
	            // When we are forcing static we don't mark this as a Dynamic read and we return an empty cookies object
	            return _requestcookies.RequestCookiesAdapter.seal(new _cookies.RequestCookies(new Headers({})));
	        } else {
	            // We will return a real headers object below so we mark this call as reading from a dynamic data source
	            (0, _dynamicrendering.trackDynamicDataAccessed)(staticGenerationStore, callingExpression);
	        }
	    }
	    const requestStore = (0, _requestasyncstorageexternal.getExpectedRequestStore)(callingExpression);
	    const asyncActionStore = _actionasyncstorageexternal.actionAsyncStorage.getStore();
	    if ((asyncActionStore == null ? void 0 : asyncActionStore.isAction) || (asyncActionStore == null ? void 0 : asyncActionStore.isAppRoute)) {
	        // We can't conditionally return different types here based on the context.
	        // To avoid confusion, we always return the readonly type here.
	        return requestStore.mutableCookies;
	    }
	    return requestStore.cookies;
	}
	function draftMode() {
	    const callingExpression = "draftMode";
	    const requestStore = (0, _requestasyncstorageexternal.getExpectedRequestStore)(callingExpression);
	    return new _draftmode.DraftMode(requestStore.draftMode);
	}

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (headers$2, headers$2.exports));

var headersExports = headers$2.exports;

var headers = headersExports;

function getPlayerId() {
    return __awaiter(this, void 0, void 0, function () {
        var playerId, newPlayerId, MILLISECONDS_IN_A_YEAR;
        return __generator(this, function (_a) {
            playerId = headers.cookies().get('id');
            if (playerId === undefined) {
                newPlayerId = Math.random().toString(36).substring(2);
                MILLISECONDS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 365;
                headers.cookies().set('id', newPlayerId, { expires: new Date(Date.now() + MILLISECONDS_IN_A_YEAR) });
                return [2 /*return*/, newPlayerId];
            }
            else {
                return [2 /*return*/, playerId.value];
            }
        });
    });
}
function synchronizeHistory(historyString) {
    "use server";
    return __awaiter(this, void 0, void 0, function () {
        var playerId, history_1, log, config, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, getPlayerId()];
                case 1:
                    playerId = _a.sent();
                    history_1 = JSON.parse(historyString);
                    if (!(history_1.log.length !== 0 && history_1.problemId !== undefined)) return [3 /*break*/, 5];
                    log = JSON.stringify(history_1.log);
                    history_1.lastSynchronized = new Date().toISOString();
                    config = headers.cookies().get('config').value;
                    if (!(config === "pilot1")) return [3 /*break*/, 3];
                    return [4 /*yield*/, sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["INSERT INTO pilot1 (player_id, problem_id, start, latest, history, completed) VALUES \n                    (", ", ", ", ", ", ", ", ", ", ", ")\n                    ON CONFLICT (player_id, problem_id, start) DO UPDATE\n                    SET latest= ", ", \n                        history= ", ",\n                        completed=", "\n                    WHERE pilot1.completed=false;"], ["INSERT INTO pilot1 (player_id, problem_id, start, latest, history, completed) VALUES \n                    (", ", ", ", ", ", ", ", ", ", ", ")\n                    ON CONFLICT (player_id, problem_id, start) DO UPDATE\n                    SET latest= ", ", \n                        history= ", ",\n                        completed=", "\n                    WHERE pilot1.completed=false;"])), playerId, history_1.problemId, history_1.startTime, history_1.lastSynchronized, log, history_1.completed, history_1.lastSynchronized, log, history_1.completed)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["INSERT INTO testing_0 (player_id, problem_id, start, latest, history, completed) VALUES \n                    (", ", ", ", ", ", ", ", ", ", ", ")\n                    ON CONFLICT (player_id, problem_id, start) DO UPDATE\n                    SET latest= ", ", \n                        history= ", ",\n                        completed=", "\n                    WHERE testing_0.completed=false;"], ["INSERT INTO testing_0 (player_id, problem_id, start, latest, history, completed) VALUES \n                    (", ", ", ", ", ", ", ", ", ", ", ")\n                    ON CONFLICT (player_id, problem_id, start) DO UPDATE\n                    SET latest= ", ", \n                        history= ", ",\n                        completed=", "\n                    WHERE testing_0.completed=false;"])), playerId, history_1.problemId, history_1.startTime, history_1.lastSynchronized, log, history_1.completed, history_1.lastSynchronized, log, history_1.completed)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log("Error synchronizing history.");
                    console.log(error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
var templateObject_1, templateObject_2;

function getInitialEquations(initData) {
    var equations = new Map();
    initData.initialDiagram.connections.forEach(function (connection) {
        var equationId = getEquationId(connection.from, connection.to);
        var equation = getEquationFromInitialConnection(connection, initData.initialDiagram);
        equations.set(equationId, equation);
    });
    return equations;
}
function getEquationId(from, to) {
    return "equation-".concat(from, "-to-").concat(to[0], "_").concat(to[1]);
}
function Game(props) {
    var enumerationOffset = getMaximumNumberInGameData(props.initData);
    var _a = __read(useState(getInitialEquations(props.initData)), 2), equations = _a[0], setEquations = _a[1];
    var enumeration = useRef(new TermEnumerator(enumerationOffset));
    var history = useRef(new GameHistory(props.problemId));
    var _b = __read(useMemo(function () {
        var unificationResult = unifyEquations(equations);
        enumeration.current.updateEnumeration(unificationResult.assignment);
        var termEnumeration = enumeration.current.getHoleValueAssignment(unificationResult.assignment);
        return [termEnumeration, unificationResult.equationIsSatisfied];
    }, [equations]), 2), termEnumeration = _b[0], eqSatisfied = _b[1];
    function addGadget(gadgetId, axiom) {
        history.current.logEvent({ GadgetAdded: { gadgetId: gadgetId, axiom: axiomToString(axiom) } });
        synchronizeHistory(JSON.stringify(history.current));
    }
    function removeGadget(gadgetId) {
        history.current.logEvent({ GadgetRemoved: { gadgetId: gadgetId } });
        synchronizeHistory(JSON.stringify(history.current));
    }
    var addEquation = useCallback(function (from, to, newEquation) {
        history.current.logEvent({ EquationAdded: { from: from, to: to } });
        var newEquations = new Map(equations);
        newEquations.set(getEquationId(from, to), newEquation);
        setEquations(function (equations) { return (new Map(equations)).set(getEquationId(from, to), newEquation); });
    }, [equations]);
    var removeEquation = useCallback(function (from, to) {
        history.current.logEvent({ EquationRemoved: { from: from, to: to } });
        setEquations(function (equations) {
            var newEquations = new Map(equations);
            newEquations.delete(getEquationId(from, to));
            return newEquations;
        });
    }, [equations]);
    var setProblemSolvedAndWriteToHistory = useCallback(function () {
        props.setProblemSolved();
        if (!history.current.completed) {
            history.current.logEvent({ Completed: null });
            history.current.completed = true;
            synchronizeHistory(JSON.stringify(history.current));
        }
    }, []);
    useEffect(function () {
        try {
            var historyString = JSON.stringify(history.current);
            synchronizeHistory(historyString);
        }
        catch (e) {
            console.error(e);
        }
    }, [equations]);
    return jsx(AssignmentContext.Provider, __assign({ value: termEnumeration }, { children: jsx(ReactFlowProvider, { children: jsx(Diagram, { initData: props.initData, addGadget: addGadget, removeGadget: removeGadget, addEquation: addEquation, removeEquation: removeEquation, isSatisfied: eqSatisfied, setProblemSolved: setProblemSolvedAndWriteToHistory, proximityConnectEnabled: props.proximityConnectEnabled }) }) }));
}

function InfoviewGame(initData) {
    return jsx(Game, { initData: initData, setProblemSolved: function () { }, proximityConnectEnabled: true });
}

export { InfoviewGame as default };
