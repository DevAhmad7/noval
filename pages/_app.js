import noval from 'noval'
import '../styles/globals.css'

const ProviderNoval = noval(
  {
    first: "Ahmad",
    last: "Hassan",
    info: { color: "green" },
  } /* createDispatch (optional) */
);

export default function App({ Component, pageProps }) {

  return <ProviderNoval>
    <Component {...pageProps} />
  </ProviderNoval>
}
