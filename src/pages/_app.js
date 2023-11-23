import React from "react";
import "../styles/global.css";
import { useState } from "react";
import SessionExpiryModal from "../components/modals/session_expiry";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SessionProvider } from "next-auth/react"
// import { Provider as NextAuthProvider } from 'next-auth/providers';

function MyApp({ Component, pageProps }) {
  const [expiryModal, setExpiryModal] = useState(false);

  const openExpiryModal = () => {
    setExpiryModal(true);
  };

  const closeModal = () => {
    setExpiryModal(false);
  };

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
    <UserProvider>
    <div>
     
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SessionExpiryModal expiryModal={expiryModal} closeModal={closeModal} />

      <Component openExpiryModal={openExpiryModal} {...pageProps} />
     
    </div>
    </UserProvider>
   </SessionProvider>
  );
}

export default MyApp;



