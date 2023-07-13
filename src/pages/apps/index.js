import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { userApps } from "../../pages/api/actions/applications/appsActions";
import AppsCard from "../../components/appsCard/appsCard";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Grid, Paper, Container, Box } from '@mui/material';
import Image from 'next/image';


const Applications = () => {
  const [apps, setApps] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const handleAppClick = (appId) => {
    if (typeof window !== 'undefined') {
      const storedAppId = localStorage.getItem('appId');
      if (storedAppId !== appId) {
        localStorage.removeItem('appId');
      }
      localStorage.setItem('appId', appId);
      if (appId == 1){
        router.push(`/apps/${appId}/admin`);
      }{
        router.push(`/apps/${appId}/home`);
      }
      
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
    // <div className="flex justify-center h-screen bg-blue-100">
    //   <div className="flex justify-center items-center m-auto w-2/3 h-2/3">
    //     <Card sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
    //       <CardContent>
    //       <h4 className="text-xl text-primary flex justify-center m-16">
    //           Welcome to the Suss-SMS Platform.
    //         </h4>
    //         <h4 className="text-lg text-blue flex justify-center m-16 text-[#094C95]">
    //           SELECT AN ORGANISATION
    //         </h4>
    //         <div className="flex flex-col justify-center items-center gap-4"> {/* Add the gap-4 class to create margin between cards */}
    //           {apps.map((app, index) => (
    //             <button
    //               className="bg-[#233044] text-white rounded-lg shadow-md p-4 w-2/4 h-24 flex flex-col justify-center items-center m-8"
    //               onClick={() => handleAppClick(app.code)}
    //               key={index}
    //             >
    //               <AppsCard {...app} />
    //             </button>
    //           ))}
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </div>
    // </div>
    <Grid container spacing={0} sx={{ height: '100vh' }}>
      <Grid item xs={7} sm={7}>
        <Box
          sx={{
            height: '100%',
            backgroundImage: 'url("/images/backgirl5.jpg")',
            backgroundSize: 'cover',
            border:'none',
            backgroundPosition: 'center',
          }}
        ></Box>
      </Grid>
      <Grid item xs={5} sm={5} sx={{ bgcolor: 'bg-blue-900',border:'none', }}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            border:'none',
            justifyContent: 'center',
            background: 'linear-gradient(to right, #EDF2F7, #A5B4FC)',
          }}
          component={Paper}
          elevation={2}
        >
          <div
          style={{background: 'linear-gradient(to right, #EDF2F7, #A5B4FC)',border:'none'}}
         
          >
            <p className="text-2xl font-bold ml-4 text-blue-900">Welcome to</p>
            <div className="border-none">
              <img src="/images/logo.png" alt="Logo" />
            </div>
            <h4 className="text-lg text-blue flex justify-center m-16 text-[#094C95]">
              SELECT AN ORGANISATION
            </h4>
            <div className="flex flex-col justify-center items-center gap-4">
              {/* Add the gap-4 class to create margin between cards */}
              {apps.map((app, index) => (
                <button
                  className="bg-[#233044] text-white rounded-lg shadow-md p-2 w-2/4 h-12 flex flex-col justify-center items-center m-1"
                  onClick={() => handleAppClick(app.code)}
                  key={index}
                >
                  <AppsCard {...app} />
                </button>
              ))}
            </div>
          </div>
        </Box>
      </Grid>
    </Grid>
  ) : (
    <div>
      <h1>LOADING...</h1>
    </div>
  )}
</>
  );
};

export default Applications;
