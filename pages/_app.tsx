import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
         <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
          <link rel="android-chrome-192x192" type="image/png" sizes="192x192" href="/images/android-chrome-192x192.png"/>
          <link rel="android-chrome-512x512" type="image/png" sizes="512x512" href="/images/android-chrome-192x192.png"/>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
