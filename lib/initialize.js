/**
 * //////////////////////////
 * @name noval
 * @author Ahmad Hasan
 * @copyright (c) 2022-2023
 * //////////////////////////
**/

import React, {
  useRef,
  useCallback,
  createContext,
} from "react";

function isObjectEmpty(values) {
  return Object.keys(values).length === 0
}

class InitializeStore {
  constructor() {
      this.Actions = {};
      this.StoreContext = createContext(null);
  }

  handleStore = () => {
      const observers = useRef(new Set());
      const store = useRef(this.initialState);

      const state = useCallback(() => store.current, []);
      const update = useCallback((values, selector) => {
          if (isObjectEmpty(values)) {
              throw new Error("update not fire without values")
          }
          addState(values, selector);
          observers.current.forEach((callback) => callback());
      }, []);

      const addState = useCallback((values, selector) => {
          let current = store.current;
          if (selector) {
              const role = selector.replace(/[.]/g, "?.");
              eval(`current.${selector} = { ...current?.${role}, ...values };`);
          } else {
              current = { ...current, ...values };
          }
          store.current = current
      }, []);

      const subscribe = useCallback((callback) => {
          observers.current.add(callback);
          return () => observers.current.delete(callback);
      }, []);

      return {
          state,
          update,
          addState,
          subscribe,
      };
  };

  init = (initialState = {}, dispatcher = null) => {
      this.dispatch = dispatcher;
      this.initialState = initialState;

      return ({ children }) => {
          const Context = this.StoreContext;

          return <Context.Provider
              value={this.handleStore()}>
              {children}
          </Context.Provider>;
      }
  }
}

export default InitializeStore;