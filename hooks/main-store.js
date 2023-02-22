// @ts-ignore
import useHybrid from "use-hybrid";

const createState = {
    first: "Ahmad",
    last: "Hassan",
    info: { color: "green" }
};

//////////////// optional ////////////////
// const createDispatch = (data, tools, actions) => {
//     const { type, payload } = data; // return action as type and payload
//     const { update, state } = tools; // you can use thunk function from tools
//     /*
//       Update is a function that takes two parameters
//       1- value type: object => payload. like { age: 30 } - required
//       2- selector type: string => Where is the update. like "info"
//       This example will only update the age in 'info' key
//     */

//     const setAge = () => {
//         const age = payload.value;
//         update({ age }, "info")
//     }

//     const setName = () => {
//         const [first, last] = payload.split(" ")
//         update({ first, last })
//     }

//     switch (type) { // action type
//         case actions.setAge: // actions type
//             return setAge();
//         case actions.setName: // actions type
//             return setName();
//         default:
//             break;
//     }
// };

const flexState = new useHybrid(createState, /* createDispatch */);

export const MainProvider = flexState.Provider;
export const useMainSelector = flexState.useSelector;
export const useMainDispatch = flexState.useDispatch;