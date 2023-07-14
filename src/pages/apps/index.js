import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { userApps } from "../../pages/api/actions/applications/appsActions";
import AppsCard from "../../components/appsCard/appsCard";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Grid, Paper, Container, Box, Select, MenuItem } from '@mui/material';
import Image from 'next/image';


const Applications = () => {
  const [apps, setApps] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedAppCode, setSelectedAppCode] = useState('');

  const router = useRouter();
  const backUrl = `/images/back.jpg`;

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

  const handleAppSelect = (event) => {
    setSelectedAppCode(event.target.value);
  };

  const handleAppClick = (appId) => {
    if (typeof window !== 'undefined') {
      const storedAppId = localStorage.getItem('appId');
      if (storedAppId !== appId) {
        localStorage.removeItem('appId');
      }
      localStorage.setItem('appId', appId);
      if (appId === 'app1') {
        router.push(`/apps/${appId}/admin`);
      } else {
        router.push(`/apps/${appId}/home`);
      }
    }
  };

  const handleApply = () => {
    const selectedApp = apps.find((app) => app.code === selectedAppCode);
    if (selectedApp) {
      handleAppClick(selectedApp.code);
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
  {isLoaded ? (
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/images/main.png")' }}>
    {/* Content inside the div */}
    <Box
      className="absolute top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-center"
      style={{ width: '50%', zIndex: 10 }}
    >
      {/* <label htmlFor="select-organisation" className="text-black text-lg font-bold mb-2">
        Select an Organisation:
      </label> */}
      <Select
        id="select-organisation"
        value={selectedAppCode}
        onChange={handleAppSelect}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select an Organisation
        </MenuItem>
        {apps.map((app, index) => (
          <MenuItem value={app.code} key={index}>
            {app.name}
          </MenuItem>
        ))}
      </Select>
      <button
        className="bg-blue-500 text-white px-20 py-2 mt-2 rounded"
        onClick={handleApply}
        disabled={!selectedAppCode}
      >
        Apply
      </button>
    </Box>
  </div>  ) : (
    <div>
      <h1>LOADING...</h1>
    </div>
  )}
</>
  );
};

export default Applications;
