# noval

- A library based on (ContextApi) for managing state in the application.
- Supported for (react/react-native/next)

### native and light

### :white_check_mark:noval:white_check_mark:

- when change state just component with current selector re-render
<div>
    <img src="https://i.ibb.co/THLdmXP/react-store.gif" alt="noval" />
</div>

### :x:normal-store

- when change state all components re-render
<div>
     <img src="https://i.ibb.co/17Jwgwj/normal-store.gif" alt="normal-store" />
</div>

## Getting Started

To use Noval, the [react](https://www.npmjs.com/package/react) version must be 18 or later

## Install

```js
npm install noval
// or
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

## Usage

- Example useSelector

```js
import { useSelector } from "noval";
...
const ExampleState = () => {
  // you can use this useSelector at any component
  const first = useSelector("first"); // return Ahmad
  // Or useSelector((state) => state.first); // return Ahmad
  // Or call a new key named (fullname) and set fallback, if you want
  // useSelector("fullname", (state) => `${state.first} ${state.last}`); // return Ahmad Hassan
  // In all cases above, it will not be re-render, Except when changing the value of first

  /*
    useSelector is a function that takes two parameters
    1- param1 (selector) type: (string | function) - required
      :string like "first" => "Ahmad or "info.age" return 28
      :function like (state) => state.info.age
    2- param2 (fallback) type: any => if param1 undefined return param2 value from fallback
      :string like useSelector("status", "offline"); // return offline if status undefined
      :array like useSelector("nums", ["one", "two"]); // return ["one", "two"] if nums undefined
      :function like useSelector("fullname", (state) => state.first); // return Ahmad if fullname undefined
  */

  return (<span>{first}</span>);
};
```

- Example useDispatch

```js
import { useDispatch } from "noval";
...
const ExampleDispatch = () => {
  // you can use this useDispatch at any component
  const { dispatch } = useDispatch(); // return object => { dispatch, addState }

  /*
    dispatch is a function that takes two parameters
    1- param1 type: (object | function | string) - required
      :string like dispatch("setName", { value: e.target.value }) use this method if you created dispatcher
      :object like dispatch({ first: e.target.value }) return update function directly
      :function like dispatch(async ({ state, update, addState }) => {
          callback return three valuse
          :state => return all state with last updated value
          :update => learn more about update => See above at createDispatch
          :addState => add nested value in main state without re-render

          try {
            const res = await fetch(`https://api`);
            const data = await res.json();
            addState({ age: 29 }, "info")
            update({ last: data.last });
          } catch (e) {...}
        })

    2- param2 type: any - not-required
      :if param1 type: (object)
        param2 will be the selector example:
        dispatch({ age: 28 }, "info")

      :if param1 type: (string)
        param2 will be the payload example:
        dispatch("setAge", 28 )
  */

  return (<input type="text"
     onChange={(e) => dispatch("setName", { name: e.target.value })}
  />);
};
```

- Example useSelector with useDispatch

```js
import { useSelector, useDispatch } from "noval";
//...
const ExampleValueWithAction = () => {
  const todo = useSelector("todo", null);
  const loading = useSelector("assets.loading");

  // you can use like this
  const { dispatch, addState } = useDispatch();

  const getTodo = async () => {
    dispatch({ loading: true }, "assets");
    const id = todo?.id || 0;
    const url = `https://jsonplaceholder.typicode.com/todos/${id + 1}`;
    const response = await fetch(url);
    const todoData = await response.json();
    addState({ loading: false }, "assets");
    dispatch({ todo: todoData });
  };

  return (
    <>
      <button onClick={getTodo}>{loading ? "loading ..." : "get todo!"}</button>
      {todo && <span>title: {todo.title}</span>}
    </>
  );
};
```

cd noval folder

```js
npm install
```

then

```js
npm run dev
```

goto [WhatsApp](https://api.whatsapp.com/send?phone=201112785677) to learn more
