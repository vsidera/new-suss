import React from 'react';
import '../styles/global.css'
import { useState } from "react";
import SessionExpiryModal from '../components/modals/session_expiry';


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
       <SessionExpiryModal expiryModal={expiryModal} closeModal={closeModal} />
      
       <Component openExpiryModal={openExpiryModal} {...pageProps} />
    </div>
  );
}

export default MyApp;
