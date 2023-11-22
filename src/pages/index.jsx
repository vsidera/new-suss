// import { useUser } from "@auth0/nextjs-auth0/client";
// import { useSession } from '@auth0/nextjs-auth0';
import {signIn} from "next-auth/react";

const Login = () => {
  // const { user, error, isLoading } = useUser();
  // const [session, loading] = useSession();

  // Check if the user is authenticated
  // const isAuthenticated = session && session.user;

  // Access the access token from the session if authenticated
  // const accessToken = isAuthenticated ? session.accessToken : null;


  // console.log('Access TokenAUTH000000000000!!!!!!!!:', accessToken);


  // useEffect(() => {
  //   // Check if the session is available and not loading
  //   if (session && !loading) {
  //     // Access the access token from the session
  //     const accessToken = session.accessToken;

  //     // Log the access token
  //     
  //   }
  // }, [session, loading]);


  const logoUrl = `/images/logo.jpg`;

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;
  // if (user){
  //   return (
  //     user && (
  //         <div>
  //           <img src={user.picture} alt={user.name} />
  //           <h2>{user.name}</h2>
  //           <p>{user.email}</p>
  //           <a href="/api/auth/logout" className="mt-2 text-blue-500 hover:underline">
  //           Log out
  //         </a>
  //         </div>
  //     )
  // );

  // }

  
  
  return (
    <>

      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="flex flex-col items-center justify-center mb-4">
          <img src={logoUrl} alt="Logo" />
          <a href="/api/auth/signin" className="mt-2 text-blue-500 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            signIn("auth0");
        }}>
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
