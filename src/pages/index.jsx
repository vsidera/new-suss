import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { useState } from "react";
import { loginAction } from "../pages/api/actions/login/loginAction";
// import { useNavigate } from "react-router-dom";
import SnackbarAlert from "../components/utils/snackbar";
import { useRouter } from "next/router";
import SessionExpiryModal from "../components/modals/session_expiry";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withAuth } from '@auth0/nextjs-auth0';
// import 'styles/global.css'

const Login = ({ openExpiryModal  }) => {
  const { user, error, isLoading } = useUser();
  // const navigate = useNavigate();
  const router = useRouter();

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const greenButton = {
    backgroundColor: "green",
    color: "white",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const formValues = {
      username: username,
      password: password,
    };
    loginAction(formValues)
      .then((res) => {
        if (res.errors) {
          setEventType("fail");
          setEventMessage("Login Failed");
          setEventTitle("LOGIN");
          setIsSnackBarAlertOpen(true);
          setIsButtonClicked(false);
        } else {
          console.log("ADMIN OR CLIENT!!!!!!!", res);
          setEventType("success");
          setEventMessage("Logged In Successfully!");
          setEventTitle("LOGIN");
          setIsSnackBarAlertOpen(true);
          if (res.data.type == "CLIENT") {
            setTimeout(() => {
              router.push("/apps");
            }, 1000);
          } else {
            setTimeout(() => {
              localStorage.setItem("appId", 1);
              // router.push("/apps");
              router.push("/apps/1/admin");
            }, 1000);
          }

          setIsButtonClicked(false);

          setTimeout(function () {
            openExpiryModal();
          }, 60 * 60 * 1000);
        }
      })
      .catch((err) => {
        setIsButtonClicked(false);
      });
  };

  const logoUrl = `/images/logo.jpg`;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user){
    return (
      user && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <a href="/api/auth/logout" className="mt-2 text-blue-500 hover:underline">
            Log out
          </a>
          </div>
      )
  );

  }
  
  return (
    <>

      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="flex flex-col items-center justify-center mb-4">
          <img src={logoUrl} alt="Logo" />
          <a href="/api/auth/login" className="mt-2 text-blue-500 hover:underline">
            Log in
          </a>
         
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default Login;
