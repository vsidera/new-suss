import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const SessionExpiryModal = ({
expiryModal,
closeModal
}) => {
  const router = useRouter();
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-40%, -20%)",
    width: 500,
    height: 350,
    bgcolor: "#ffff",
    outline: "none",
    border: "none",
    // boxShadow: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  };

  const handleLogout = (e) => {
    localStorage.clear();
    signOut();
    router.push("/login");
    closeModal();
  };

  const logoUrl = `/images/logo.jpg`;
  
  return (
    <>
      <Modal
        open={expiryModal}
        sx={{ border: "none", boxShadow: "none" }}
      >
        <div>
          <Box sx={style}>
            <CardContent>
              <div className="text-center content-center">

              <div class="flex items-center justify-center mb-4">
          <img src={logoUrl} alt="Logo" />
            </div>

                <span className="text-[#5F6062] text-[22px] font-medium text-center">
                  Your Token has Expired. Login Again to continue using the platform
                </span>
            
                <button

                type="submit"
                class="w-full mt-4 text-white bg-[#2268AA] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              
                onClick={handleLogout}
              >
                Sign In
              </button>
              </div>
            </CardContent>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default SessionExpiryModal;
