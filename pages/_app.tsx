/*import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;*/

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    const { session, ...restPageProps } = pageProps;

    return (
        <SessionProvider session={session}>
            <Component {...restPageProps} />
        </SessionProvider>
    );
}

export default MyApp;
