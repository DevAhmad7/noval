/**
 * //////////////////////////
 * @name noval
 * @update 2023-2-23
 * @author Ahmad Hasan
 * @copyright (c) 2022-2023
 * //////////////////////////
**/

import InitializeStore from "./initialize";
import { useContext, useCallback, useSyncExternalStore } from "react";

class Noval extends InitializeStore {

  useSelector = (selector, fallback) => {
    const store = useContext(this.StoreContext);

    if (store) {
      const collectData = useCallback((collect, back) =>
        collect === undefined ? back : collect, []);

      const extractData = (data) => {
        switch (typeof selector) {
          case "string":
            const role = selector.replace(/[.]/g, "?.");
            const isFallback = typeof fallback === "function"
            fallback = isFallback ? fallback(data) : fallback
            return collectData(eval(`data?.${role}`), fallback)
          case "function":
            return collectData(selector(data), fallback)
          default:
            return data
        }
      };

      return useSyncExternalStore(
        store.subscribe,
        () => extractData(store.state()),
        () => extractData(this.initialState)
      );
    }
  };

  useDispatch = () => {
    const store = useContext(this.StoreContext);
    if (store) {
      const { update, addState, state } = store;

      const thunk = useCallback((callback) => {
        const tools = {
          addState, update,
          state: state(),
        }
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
            const data = { type: any, payload };
            const tools = {
              thunk,
              update,
              addState,
              state: state(),
            };
            if (!this.dispatch) break;
            return this.dispatch(data, tools, this.Actions);
        }
      }

      return { addState, dispatch };
    }
  };
}

const extractor = new Noval();
const noval = extractor.init
export default noval;

export const ProviderNoval = noval();
export const useSelector = extractor.useSelector;
export const useDispatch = extractor.useDispatch;