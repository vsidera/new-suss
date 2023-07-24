import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import MiniDrawer from '../../../../components/sidebar2/sidebar2';
import { Card, CardContent, Select, Button, Input, MenuItem, InputLabel, Typography, TextField, TextareaAutosize } from '@mui/material';
import { groupsAction } from '../../../api/actions/groups/groupsActions';
import { useRouter } from "next/router";
import { appservicesAction } from '../../../api/actions/appservices/appservicesAction';
import { broadcastMessages } from '../../../api/actions/messages/messagesAction';
import { v4 as uuidv4 } from "uuid";
import SnackbarAlert from '../../../../components/utils/snackbar';
 
 
const SendForm = () => {


    const router = useRouter();
    const app_id = router.query.appId;

    const randomUuid = uuidv4();

    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");

    const [appservices, setAppservices] = useState([]);
    const [selectedSenderId, setSelectedSenderId] = useState("");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [state, setState] = React.useState({
      content: "",
    });

    const handleChange = (e) => {
      const value = e.target.value;
      setState({
        ...state,
        [e.target.name]: value,
      });
    };

    const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
    const [eventType, setEventType] = useState("");
    const [eventMessage, setEventMessage] = useState("");
    const [eventTitle, setEventTitle] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
  
      const newSms = {
        name: "FirstCampaign",
        group_id: selectedGroup,
        description: "Campaign desc",
        service_id: selectedSenderId,
        requestid: randomUuid,
        content: state.content,
        scheduled:"2023-07-24T06:06:42.821Z"
    };
  
      const res = broadcastMessages({selectedSenderId,newSms}).then((res) => {
        if (res.status === 200) {
          setEventType("success");
          setEventMessage("Bulk SMS Sent");
          setEventTitle("BROADCAST");
          setIsSnackBarAlertOpen(true);
        } else {
          setEventType("fail");
          setEventMessage("FAILED to send message!");
          setEventTitle("MESSAGE SEND");
          setIsSnackBarAlertOpen(true);
        }
      });
  
      return res;
    };

  
    const getGroups = () => {
      groupsAction({ app_id, limit, page })
        .then((res) => {
          if (res.errors) {
            console.log("AN ERROR HAS OCCURED");
          } else {
            setGroups(res.data);
            setSelectedGroup(res.data[0]?.group_id || "");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getAppServices = () => {
      
      appservicesAction(app_id)
        .then((res) => {
          if (res.errors) {
            console.log("AN ERROR HAS OCCURED");
          } else {
            setAppservices(res.data);
            setSelectedSenderId(res.data[0]?.appid || "");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      getGroups();

    }, [page, limit, app_id]);

    useEffect(() => {
      getAppServices();
    }, [app_id]);
 
    return (
        <MiniDrawer>
          <SnackbarAlert
          open={isSnackBarAlertOpen}
          type={eventType}
          message={eventMessage}
          handleClose={() => setIsSnackBarAlertOpen(false)}
          title={eventTitle}
        />
        <React.Fragment>
            <div className='m-16'>
            <h2 className='mt-4 text-xl font-semibold'>Broadcast Mesage</h2>
            <p className='mb-24 text-gray-700'>Send message to a group of contacts</p>
            <Card>
            <CardContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
            Fields marked with <span style={{ color: 'red' }}>*</span> are required.
            </Typography>
                <form className="m-4" onSubmit={handleSubmit}>

                <InputLabel htmlFor="select-option">
                  <span style={{ color: "red" }}>*</span>Select Group
                </InputLabel>
                <Select
                  id="select-option"
                  value={selectedGroup}
                  onChange={(event) => setSelectedGroup(event.target.value)}
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                >
                  {groups.map((group) => (
                    <MenuItem key={group.group_id} value={group.group_id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>

                <InputLabel htmlFor="select-option"><span style={{ color: 'red' }}>*</span>Select Sender Id</InputLabel>
                <Select
                    id="select-option"
                    value={selectedSenderId}
                    onChange={(event) => setSelectedSenderId(event.target.value)}
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                >
                    {appservices.map((appservice) => (
                    <MenuItem key={appservice.appid} value={appservice.appid}>
                      {appservice.appname}
                    </MenuItem>
                  ))}
                </Select>
     
                <InputLabel htmlFor="file-upload"><span style={{ color: 'red' }}>*</span>Type your message here</InputLabel>
                 <TextareaAutosize
                      id="content"
                      name="content"
                      aria-label="empty textarea"
                      placeholder="This allows a maximum of 140 characters"
                      value={state.content}
                      onChange={handleChange}
                      minRows={3}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
               
               <Button variant="contained" sx={{ backgroundColor: '#094C95 !important', color: '#FFFFFF !important', '&:hover': { backgroundColor: '#001041 !important' } }} type="submit">
                Send
                </Button>
                </form>
            </CardContent>
            </Card>
            </div>
     
        </React.Fragment>
        </MiniDrawer>
    )
}
 
export default SendForm;