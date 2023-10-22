import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import MiniDrawer from '../../../../components/sidebar2/sidebar2';
import { Card, CardContent, Select, Button, Input, MenuItem, InputLabel, Typography, TextField, TextareaAutosize } from '@mui/material';
import { appservicesAction } from '../../../api/actions/appservices/appservicesAction';
import { useRouter } from 'next/router';
import { sendSms } from '../../../api/actions/messages/messagesAction';
import { v4 as uuidv4 } from "uuid";
import SnackbarAlert from '../../../../components/utils/snackbar';
import MaterialUIPickers from '../../../../components/utils/timePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
 
const SendForm = () => {

    const router = useRouter();
    const app_id = router.query.appId;

    const randomUuid = uuidv4();

    const [appservices, setAppservices] = useState([]);
    const [selectedSenderId, setSelectedSenderId] = useState("");

    const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [eventType, setEventType] = useState("");
    const [eventMessage, setEventMessage] = useState("");
    const [eventTitle, setEventTitle] = useState("");

    const [schedule, setSchedule] = useState(false)

    const currentDateTime = dayjs();

    const [value, setValue] = useState(currentDateTime);
    console.log("NEW VALUE!!!!!!!!", value)
    const handleDateTimeChange = (newValue) => {
      
      setValue(newValue);
    };

    const handleSwitchChange = (event) => {
      setSchedule(event.target.checked);
    };
    const [state, setState] = React.useState({
        destination: "",
        content: "",
        scheduled: value
      });
    
      
      const handleChange = (e) => {
        const value = e.target.value;
        setState({
          ...state,
          [e.target.name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const newSms = {
          destination: state.destination,
          content: state.content,
          requestid: randomUuid,
          scheduled: value,
        };
    
        const res = sendSms({selectedSenderId,newSms}).then((res) => {
          if (res.status === 202) {
            setEventType("success");
            setEventMessage("Message Sent Successfully");
            setEventTitle("MESSAGE SEND");
            setIsSnackBarAlertOpen(true);
          } else {
            setEventType("fail");
            setEventMessage("FAILED to send message!");
            setEventTitle("MESSAGE SEND");
            setIsSnackBarAlertOpen(true);
          }
          setIsButtonClicked(false);
        });
    
        return res;
      };

    const getAppServices = () => {
      
        appservicesAction(app_id)
          .then((res) => {
            if (res.errors) {
              console.log("AN ERROR HAS OCCURED");
            } else {
              setAppservices(res.data);
              setSelectedSenderId(res.data[0]?.service_id || "");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

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
            <h2 className='mt-4 text-xl font-semibold'>Send Message</h2>
            <p className='mb-24 text-gray-700'>Send message to a single contact</p>
            <Card>
            <CardContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
            Fields marked with <span style={{ color: 'red' }}>*</span> are required.
            </Typography>
                <form className="m-4" onSubmit={handleSubmit}>

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
                    <MenuItem key={appservice.service_id} value={appservice.service_id}>
                      {appservice.sendername}
                    </MenuItem>
                  ))}
                </Select>
                <InputLabel htmlFor="file-upload"><span style={{ color: 'red' }}>*</span>Enter Mobile Number</InputLabel>
                <TextField
                    id="destination"
                    name="destination"
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Mobile"
                    placeholder='254711438911'
                    onChange={handleChange}
                    value={state.destination}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
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
           
                  <FormGroup>
                  <FormControlLabel control={<Switch checked={schedule} onChange={handleSwitchChange} />} label="*Turn on to send scheduled SMS*" />
                </FormGroup>
                {schedule ? <div className="my-4">
                    <MaterialUIPickers
                    value={value} onChange={handleDateTimeChange}
                    />
                  </div>   : <></> 
               }
                
               <button
                    className="bg-blue-900 text-white font-normal my-4 py-1.5 px-5 rounded text-[14px]"
                 
                    onClick={(e) => {
                      handleSubmit(e);
                      setIsButtonClicked(true);
                    }}
                  >
                    {isButtonClicked ? "SENDING..." : "SEND"}
                  </button>
                </form>
            </CardContent>
            </Card>
            </div>
     
        </React.Fragment>
        </MiniDrawer>
    )
}
 
export default SendForm;