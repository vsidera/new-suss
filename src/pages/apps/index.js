import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { userApps } from "../../pages/api/actions/applications/appsActions";
import AppsCard from "../../components/appsCard/appsCard";
import Link from "next/link";
import { useRouter } from "next/router";
import { Grid, Paper, Container, Box, Select, MenuItem } from "@mui/material";
import Image from "next/image";
import CircularIndeterminate from "../../components/utils/spinner";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

export default function Applications() {

  const { data: session, status } = useSession({ required: true });

  console.log("THIS IS THE SESSION in APLICATIONS!!!!!!", session);

  const [apps, setApps] = useState([]);

  const [selectedAppCode, setSelectedAppCode] = useState("");

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const router = useRouter();
  const backUrl = `/images/back.jpg`;

  const email = session && session.user.email

  const getApps = () => {
    userApps({email})
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
    const selectedApp = apps.find((app) => app.id === selectedAppCode);
    if (selectedApp) {
      handleAppClick(selectedApp.id);
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
    <div>
      {isLoaded ? (
        <div
          className="relative flex items-center justify-center h-screen bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/appsback.jpg")' }}
        >
          <Box
            className="absolute top-1/2 left-0 flex flex-col items-center ml-32"
            style={{ width: "50%", zIndex: 10 }}
          >
            <Select
              id="select-organisation"
              value={selectedAppCode}
              onChange={handleAppSelect}
              displayEmpty
              style={{ width: "30%", color: "#71797E" }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    color: "white",
                    background: "#094C95", // Set the background color to transparent
                    "& .MuiMenuItem-root": {
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
                <MenuItem value={app.id} key={index}>
                  {app.name}
                </MenuItem>
              ))}
            </Select>
            <button
              className="bg-[#094C95] text-white px-20 py-2 mt-8 rounded-full"
              // onClick={handleApply}
              onClick={() => {
                setIsButtonClicked(true);
                handleApply();
              }}
              disabled={!selectedAppCode}
            >
              {isButtonClicked ? "applying..." : "Apply"}
            </button>
          </Box>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <CircularIndeterminate />
        </div>
      )}
      {session ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
      {session && (
        <div>
          <p>Signed in as {session.user.email}</p>
          <p>Name {session.user.name}</p>
        </div>
      )}
    </div>
  );
}

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);  
//   console.log("THIS IS THE SESSION APPS!!!!!!",session)
//   return {
//     props: {
//       session
//     },
//   };
// };
