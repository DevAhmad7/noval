"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Initialize {
  static handleStore() {
    const initialState = Initialize.initialState;
    const observers = (0, _react.useRef)(new Set());
    const store = (0, _react.useRef)(initialState);
    const fire = (0, _react.useCallback)(() => observers.current.forEach(callback => callback()), []);
    const state = (0, _react.useCallback)(() => store.current, []);
    const update = (0, _react.useCallback)((values, selector) => {
      var _Object$keys;
      if (((_Object$keys = Object.keys(values)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) === 0) {
        throw new Error("update not fire without values");
      }
      addState(values, selector);
      fire();
    }, []);
    const addState = (0, _react.useCallback)((values, selector) => {
      let current = store.current;
      if (selector) {
        eval(`current.${selector} = { ...current?.${selector === null || selector === void 0 ? void 0 : selector.replace(/[.]/g, "?.")}, ...values };`);
        store.current = {
          ...current
        };
      } else {
        store.current = {
          ...current,
          ...values
        };
      }
    }, []);
    const reuseable = (0, _react.useCallback)((selector, type) => {
      let current = store.current;
      const selectors = typeof selector === "string" ? [selector] : selector;
      selectors === null || selectors === void 0 ? void 0 : selectors.forEach(sel => {
        if (type) {
          const key = sel === null || sel === void 0 ? void 0 : sel.replace(/[.]/g, "?.");
          eval(`current.${sel} = initialState?.${key}`);
        } else eval(`delete current.${sel === null || sel === void 0 ? void 0 : sel.replace(/[.]/g, "?.")}`);
      });
      store.current = {
        ...current
      };
      fire();
    }, []);
    const dirty = (0, _react.useCallback)(selector => {
      reuseable(selector);
    }, []);
    const reset = (0, _react.useCallback)(selector => {
      reuseable(selector, true);
    }, []);
    const subscribe = (0, _react.useCallback)(callback => {
      observers.current.add(callback);
      return () => observers.current.delete(callback);
    }, []);
    return {
      state,
      reset,
      dirty,
      update,
      addState,
      subscribe
    };
  }
  static init(initialState = {}, dispatcher = null) {
    Initialize.dispatch = dispatcher;
    Initialize.initialState = initialState;
    return ({
      children
    }) => {
      const Context = Initialize.StoreContext;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(Context.Provider, {
        value: Initialize.handleStore(),
        children: children
      });
    };
  }
}
exports.default = Initialize;
_defineProperty(Initialize, "Actions", {});
_defineProperty(Initialize, "StoreContext", /*#__PURE__*/(0, _react.createContext)(null));