import { ReactElement } from "react";

export as namespace noval;

export declare function useSelector(
  selector: undefined | array | string | Function,
  fallback: any
): any;

export declare function useDispatch(): {
  reset: (values: string | array) => undefined;
  dirty: (values: string | array) => undefined;
  addState: (values: object, selector: string) => undefined;
  dispatch: (param1: any, param2: any) => Function | Promise;
};

export declare function ProviderNoval(): ReactElement;

export default function noval(
  initialState: object,
  createDispatch: Function
): typeof ProviderNoval;
