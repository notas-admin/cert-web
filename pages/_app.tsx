import '../styles/globals.css';
import initAuth from '../initAuth'
import type {AppProps} from 'next/app';

initAuth();

function MyApp({Component, pageProps}: AppProps){
  const state = {role: "admin"}
  return (<div suppressHydrationWarning>
  {typeof window === 'undefined' ? null : <Component {...pageProps} />}
  </div>)
}
export default MyApp;
