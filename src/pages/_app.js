import React from "react";
import "../styles/global.css";
import { useState } from "react";
import SessionExpiryModal from "../components/modals/session_expiry";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0/client";

function MyApp({ Component, pageProps }) {
  const [expiryModal, setExpiryModal] = useState(false);

  const openExpiryModal = () => {
    setExpiryModal(true);
  };

  const closeModal = () => {
    setExpiryModal(false);
  };

  return (
    <UserProvider>
    <div>
     
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SessionExpiryModal expiryModal={expiryModal} closeModal={closeModal} />

      <Component openExpiryModal={openExpiryModal} {...pageProps} />
     
    </div>
    </UserProvider>
  );
}

export default MyApp;



