import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { useState } from "react";
import { loginAction } from "../api/actions/login/loginAction";
// import { useNavigate } from "react-router-dom";
import SnackbarAlert from "../../components/utils/snackbar";
import {useRouter} from "next/router";
import SessionExpiryModal from "../../components/modals/session_expiry";
// import 'styles/global.css'

const Login = ({openExpiryModal}) => {
  // const navigate = useNavigate();
  const router = useRouter();

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventMessage, setEventMessage] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  
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
          setEventType('fail');
          setEventMessage('Login Failed');
          setEventTitle('LOGIN');
          setIsSnackBarAlertOpen(true);
          setIsButtonClicked(false)
        } else {
          console.log("ADMIN OR CLIENT!!!!!!!", res)
          setEventType('success');
          setEventMessage('Logged In Successfully!');
          setEventTitle('LOGIN');
          setIsSnackBarAlertOpen(true);
          if (res.data.type == 'CLIENT'){
            setTimeout(() => {
              router.push("/apps");
            }, 1000);

          }else{
            setTimeout(() => {
              localStorage.setItem('appId', 1);
              // router.push("/apps");
              router.push("/apps/1/admin");
            }, 1000);

          }

          setIsButtonClicked(false)

        setTimeout(function () {
 
          openExpiryModal()
        }, 60 * 60 * 1000); 
        }

      })
      .catch((err) => {
        setIsButtonClicked(false)
      });
  };

  const logoUrl = `/images/logo.jpg`;

  return (
    <>
   
     <SnackbarAlert
        open={isSnackBarAlertOpen}
        type={eventType}
        message={eventMessage}
        handleClose={() => setIsSnackBarAlertOpen(false)}
        title={eventTitle}
      />
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="flex items-center justify-center mb-4">
          <img src={logoUrl} alt="Logo" />
            </div>
     
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-lg font-thin text-black dark:text-white text-center"
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-lg font-thin text-gray-900 dark:text-white text-center"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-thin hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button

                type="submit"
                class="w-full text-white bg-[#2268AA] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                style={{
                  marginTop: "2rem",
                  alignSelf: "center",
                  ...(isButtonClicked ? greenButton : {}),
                }}      
                onClick={(e) => {
                  handleLogin(e);
                  setIsButtonClicked(true);
                }}       
              >
                {isButtonClicked ? "authenticating..." : "Sign In"}
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
              
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Login;
