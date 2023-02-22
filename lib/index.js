"use strict";

exports.__esModule = true;
exports.useSelector = exports.useDispatch = exports.default = exports.ProviderNoval = void 0;
var _initialize = _interopRequireDefault(require("./initialize"));
var _react = require("react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Noval extends _initialize.default {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "useSelector", (selector, fallback) => {
      const store = (0, _react.useContext)(this.StoreContext);
      if (store) {
        const collectData = (0, _react.useCallback)((collect, back) => collect === undefined ? back : collect, []);
        const extractData = data => {
          switch (typeof selector) {
            case "string":
              const role = selector.replace(/[.]/g, "?.");
              const isFallback = typeof fallback === "function";
              fallback = isFallback ? fallback(data) : fallback;
              return collectData(eval(`data?.${role}`), fallback);
            case "function":
              return collectData(selector(data), fallback);
            default:
              return data;
          }
        };
        return (0, _react.useSyncExternalStore)(store.subscribe, () => extractData(store.state()), () => extractData(this.initialState));
      }
    });
    _defineProperty(this, "useDispatch", () => {
      const store = (0, _react.useContext)(this.StoreContext);
      if (store) {
        const {
          update,
          addState,
          state
        } = store;
        const thunk = (0, _react.useCallback)(callback => {
          const tools = {
            addState,
            update,
            state: state()
          };
          return callback(tools);
        }, []);
        const dispatch = (any, payload = null) => {
          switch (typeof any) {
            case "object":
              return update(any, payload);
            case "function":
              return thunk(any);
            case "string":
            default:
              this.Actions[any] = any;
              const data = {
                type: any,
                payload
              };
              const tools = {
                thunk,
                update,
                addState,
                state: state()
              };
              if (!this.dispatch) break;
              return this.dispatch(data, tools, this.Actions);
          }
        };
        return {
          addState,
          dispatch
        };
      }
    });
  }
}
const extractor = new Noval();
const noval = extractor.init;
var _default = noval;
exports.default = _default;
const ProviderNoval = noval();
exports.ProviderNoval = ProviderNoval;
const useSelector = extractor.useSelector;
exports.useSelector = useSelector;
const useDispatch = extractor.useDispatch;
exports.useDispatch = useDispatch;