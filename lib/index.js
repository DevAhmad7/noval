"use strict";

exports.__esModule = true;
exports.useSelector = exports.useDispatch = exports.default = exports.ProviderNoval = void 0;
var _react = require("react");
var _initialize = _interopRequireDefault(require("./initialize"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Noval extends _initialize.default {
  static useSelector(selector, fallback) {
    const store = (0, _react.useContext)(super.StoreContext);
    if (store) {
      const collectData = (0, _react.useCallback)((collect, back) => collect === undefined ? back : collect, []);
      const extractData = data => {
        switch (typeof selector) {
          case "string":
            const isFallback = typeof fallback === "function";
            fallback = isFallback ? fallback(data) : fallback;
            return collectData(eval(`data?.${selector.replace(/[.]/g, "?.")}`), fallback);
          case "function":
            return collectData(selector(data), fallback);
          default:
            return data;
        }
      };
      return (0, _react.useSyncExternalStore)(store.subscribe, () => extractData(store.state()), () => extractData(super.initialState));
    }
  }
  static useDispatch() {
    const store = (0, _react.useContext)(super.StoreContext);
    if (store) {
      const {
        update,
        addState,
        state,
        dirty
      } = store;
      const thunk = (0, _react.useCallback)(callback => {
        const tools = {
          addState,
          update,
          dirty,
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
            super.Actions[any] = any;
            const data = {
              type: any,
              payload
            };
            const tools = {
              thunk,
              update,
              dirty,
              addState,
              state: state()
            };
            if (!super.dispatch) break;
            return super.dispatch(data, tools, super.Actions);
        }
      };
      return {
        dirty,
        addState,
        dispatch
      };
    }
  }
}
var _default = Noval.init;
exports.default = _default;
const ProviderNoval = Noval.init();
exports.ProviderNoval = ProviderNoval;
const useSelector = Noval.useSelector;
exports.useSelector = useSelector;
const useDispatch = Noval.useDispatch;
exports.useDispatch = useDispatch;