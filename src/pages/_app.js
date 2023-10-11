import React from 'react';
import '../styles/global.css'
import { useState } from "react";
import SessionExpiryModal from '../components/modals/session_expiry';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {

  const [expiryModal, setExpiryModal] = useState(false);

  const openExpiryModal = () => {
    setExpiryModal(true);
  };

  const closeModal = () => {
    setExpiryModal(false);
  };

  return (
    <div>
      <Head>
  <link rel="icon" href="/favicon.svg" />
</Head>
       <SessionExpiryModal expiryModal={expiryModal} closeModal={closeModal} />
      
       <Component openExpiryModal={openExpiryModal} {...pageProps} />
    </div>
  );
}

export default MyApp;
