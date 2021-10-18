
import type { AppProps } from 'next/app'
import '../styles/style.scss'


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
  /* You can have the layout such as header or footer to wrap this component pageProps  */
}
export default MyApp
