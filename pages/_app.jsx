import '../styles/globals.css';
import '../styles/buttons.css';

import '../engine/polyfills';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
