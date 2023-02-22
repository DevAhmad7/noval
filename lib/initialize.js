"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function isObjectEmpty(values) {
    return Object.keys(values).length === 0;
}
class InitializeStore {
    constructor() {
        _defineProperty(this, "handleStore", () => {
            const observers = (0, _react.useRef)(new Set());
            const store = (0, _react.useRef)(this.initialState);
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
        });
        _defineProperty(this, "init", (initialState = {}, dispatcher = null) => {
            this.dispatch = dispatcher;
            this.initialState = initialState;
            return ({
                children
            }) => {
                const Context = this.StoreContext;
                return /*#__PURE__*/_react.default.createElement(Context.Provider, {
                    value: this.handleStore()
                }, children);
            };
        });
        this.Actions = {};
        this.StoreContext = /*#__PURE__*/(0, _react.createContext)(null);
    }
}
var _default = InitializeStore;
exports.default = _default;