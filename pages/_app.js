import noval from 'noval'
import '../styles/globals.css'

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

export default function App({ Component, pageProps }) {

  return <ProviderNoval>
    <Component {...pageProps} />
  </ProviderNoval>
}
