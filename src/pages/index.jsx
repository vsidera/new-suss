import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const { status } = useSession();
  console.log("THE STATUS IS!!!!!!!!!!!!",status)
  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/apps");
    }
  }, [status]);
  const logoUrl = `/images/logo.jpg`;
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex flex-col items-center justify-center mb-4">
                <img src={logoUrl} alt="Logo" />
                {/* <AccountCircleIcon/>
                <a
                  href="/api/auth/signin"
                  className="mt-2 text-blue-500 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    signIn("auth0");
                  }}
                >
                  Log in
                </a> */}
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

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);

//   console.log("THIS IS THE SESSION LOGIN!!!!!!", session);

//   return {
//     props: {
//       session,
//     },
//   };
// };
