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
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/images/appsback.jpg")' }}>
    <Box
  className="absolute top-1/2 left-0 flex flex-col items-center ml-32"
  style={{ width: '50%', zIndex: 10 }}
>
<Select
  id="select-organisation"
  value={selectedAppCode}
  onChange={handleAppSelect}
  displayEmpty
  style={{ width: '30%', color: '#71797E' }}
  MenuProps={{
    PaperProps: {
      sx: {
        color: 'white',
        background: '#094C95', // Set the background color to transparent
        '& .MuiMenuItem-root': {
          padding: 1,
        },
      },
    },
  }}
>
  <MenuItem value="" disabled>
    SELECT AN ORGANISATION
  </MenuItem>
    {apps.map((app, index) => (
      <MenuItem value={app.code} key={index}>
        {app.name}
      </MenuItem>
    ))}
  </Select>
  <button
    className="bg-[#094C95] text-white px-20 py-2 mt-8 rounded-full"
    onClick={handleApply}
    disabled={!selectedAppCode}
  >
    Apply
  </button>
</Box>

  </div>
   ) : (
    <div>
      <h1>LOADING...</h1>
    </div>
  )}
</>
  );
};

export default Applications;
