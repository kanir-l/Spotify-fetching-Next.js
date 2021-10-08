import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
  /* You can have the layout such as header or footer to wrap this component pageProps  */
}
export default MyApp
