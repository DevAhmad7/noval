"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function isObjectEmpty(values) {
  return Object.keys(values).length === 0;
}
class Initialize {
  static handleStore() {
    const observers = (0, _react.useRef)(new Set());
    const store = (0, _react.useRef)(Initialize.initialState);
    const state = (0, _react.useCallback)(() => store.current, []);
    const update = (0, _react.useCallback)((values, selector) => {
      if (isObjectEmpty(values)) {
        throw new Error("update not fire without values");
      }
      addState(values, selector);
      observers.current.forEach(callback => callback());
    }, []);
    const addState = (0, _react.useCallback)((values, selector) => {
      let current = store.current;
      if (selector) {
        const role = selector.replace(/[.]/g, "?.");
        eval(`current.${selector} = { ...current?.${role}, ...values };`);
      } else {
        current = {
          ...current,
          ...values
        };
      }
      store.current = current;
    }, []);
    const subscribe = (0, _react.useCallback)(callback => {
      observers.current.add(callback);
      return () => observers.current.delete(callback);
    }, []);
    return {
      state,
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
      return /*#__PURE__*/_react.default.createElement(Context.Provider, {
        value: Initialize.handleStore()
      }, children);
    };
  }
}
exports.default = Initialize;
Initialize.Actions = {};
Initialize.StoreContext = /*#__PURE__*/(0, _react.createContext)(null);