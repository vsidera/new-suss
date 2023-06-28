import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { userApps } from "../../pages/api/actions/applications/appsActions";
import AppsCard from "../../components/appsCard/appsCard";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  const getApps = () => {
    userApps()
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setApps(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAppClick = (appId) => {
    const storedAppId = localStorage.getItem('appId');
    if (storedAppId !== appId) {
      // Clear the previous appId from local storage
      localStorage.removeItem('appId');
    }
    // Set the new appId in local storage
    localStorage.setItem('appId', appId);
    router.push(`/apps/${appId}/home`);
  };

  useEffect(() => {
    getApps();
  }, []);

  return (
    <>
    {isLoaded ? <div className="flex justify-center h-screen">
  <div
    className="flex flex-col justify-center items-center mt-6 mx-auto"
    style={{ width: "60vw" }}
  >
     <h4 className="text-lg text-primary flex justify-center mb-6 font-serif">
        Select an Organisation
      </h4>
    {apps.map((app, index) => (
        <button className="bg-white rounded-lg shadow-md p-4 m-2 w-2/4 h-24 flex flex-col justify-center items-center" onClick={() => handleAppClick(app.code)}>
        <AppsCard key={index} {...app} />
        </button>
    ))}
  </div>
</div> :
<div>
  <h1>LOADING...</h1>
</div> }
     
      


    </>
  );
};

export default Applications;
