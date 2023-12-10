import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialIsButtonClicked = localStorage.getItem('isButtonClicked') === 'true';
      setIsButtonClicked(initialIsButtonClicked);
    }
  }, []);

  

  const {  data: session, status } = useSession();
  console.log("THE STATUS IS!!!!!!!!!!!!",status, session, isButtonClicked)
  useEffect(() => {
    if (status === "authenticated" && session && isButtonClicked) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isButtonClicked');
      }
      void router.push("/apps");
    }
    
  }, [status, session]);
  const logoUrl = `/images/logo.jpg`;
  const iconSize = 96;

  const greenButton = {
    backgroundColor: "green",
    color: "white",
  };


  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex flex-col items-center justify-center mb-4">
                <img src={logoUrl} alt="Logo" />
                <div className="mt-4">
                <AccountCircleIcon style={{ fontSize: `${iconSize}px` }} />
                </div>
                
 
                <p className="mt-4 text-xl ">
                  Welcome Back !
                </p>
                <p className="mt-4 text-sm ">
                Sign in to your account to continue
                </p>
                <button
                href="/api/auth/signin"
                type="submit"
                class="w-full text-white bg-[#2268AA] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                style={{
                  marginTop: "2rem",
                  alignSelf: "center",
                  ...(isButtonClicked ? greenButton : {}),
                }}      
                onClick={(e) => {
                  e.preventDefault();
                  signIn("auth0");
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('isButtonClicked', 'true');
                  }
                  
                }}
              >
                {isButtonClicked ? "authenticating..." : "Sign In"}
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
