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
    if (typeof window !== 'undefined') {
      const storedAppId = localStorage.getItem('appId');
      if (storedAppId !== appId) {
        localStorage.removeItem('appId');
      }
      localStorage.setItem('appId', appId);
      router.push(`/apps/${appId}/home`);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clear the stored appId if it is not valid or does not exist
      const storedAppId = localStorage.getItem('appId');
      if (!storedAppId || !apps.find((app) => app.id === storedAppId)) {
        localStorage.removeItem('appId');
      }
    }
  }, [apps]);


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
