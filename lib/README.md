# noval

- A library based on (ContextApi) for managing state in the application.
- Supported for (react/react-native/next)


### :white_check_mark:noval:white_check_mark:

- when change state just component with current selector re-render
<div>
    <img src="https://i.ibb.co/THLdmXP/react-store.gif" alt="noval" />
</div>

### :x:normal-store:exclamation:

- when change state all components re-render
<div>
     <img src="https://i.ibb.co/17Jwgwj/normal-store.gif" alt="normal-store" />
</div>

## Install

```js
npm install noval
```

- or

```js
yarn add noval
```

## Create Store

- in root file like (App.js)

```js
import noval from "noval";
// create store
const ProviderNoval = noval(
  {
    first: "Ahmad",
    last: "Hassan",
    info: { color: "green" },
  } /* createDispatch (optional) */
);

/* 
// or get ProviderNoval without create store
// like import { ProviderNoval } from "noval";
*/

// add Provider to wrap main component
export default function MyApp() {
  return <ProviderNoval>{/* children */}</ProviderNoval>;
}
```

## Create Dispatcher (optional)

- skip if you want.

```js
import noval from "noval";

// create dispatch
const createDispatch = (data, tools, actions) => {
  // returns action type and payload
  const { type, payload } = data;
  // you can use thunk function from tools
  const { update /* addState, state, thunk */ } = tools;

  /*
    update is a function that takes two parameters
    1- param1 (payload) => type: object. like { age: 30 } - (required)
    2- param2 (selector) => type: string. like "info" - (optional)
    /////  update({ age: 30 }, "info");
    This example will only update the age at 'info'
  */

  const setAge = () => {
    const age = payload.value;
    update({ age }, "info");
  };

  switch (
    type // action type
  ) {
    /*
    actions => return all actions that you logged
    when you call dispatch("setAge", { value: 28 })
    (setAge) is the action
  */
    case actions.setAge:
      return setAge();
    default:
      break;
  }
};

const ProviderNoval = noval(/* { ...state } */, createDispatch);

// add Provider to wrap main component
export default function MyApp() {
  return <ProviderNoval>{/* children */}</ProviderNoval>;
}
```

Check out the [example](https://github.com/DevAhmad7/noval) and [documentation](https://github.com/DevAhmad7/noval#readme).

Clone the repo and navigate into the resulting noval directory. Then run npm install.

goto [WhatsApp](https://api.whatsapp.com/send?phone=201112785677)
