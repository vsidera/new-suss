import React, {useState} from 'react';
import Link from 'next/link';
import { Card, CardContent, TextField, Button, Stack, Typography } from '@mui/material';
import MiniDrawer2 from '../../../../components/adminSidebar2/adminSidebar2';
import { appCreate } from '../../../api/actions/applications/appsActions';
import SnackbarAlert from '../../../../components/utils/snackbar';
 
 
const CreateOrg = () => {

    const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
    const [eventType, setEventType] = useState('');
    const [eventMessage, setEventMessage] = useState('');
    const [eventTitle, setEventTitle] = useState('');
  
    const [state, setState] = React.useState({
      name: '',
      secret: '',
      email: '',
      country_code: ''
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
  
      const newApp = {
        name: state.name,
        secret: state.secret,
        email: state.email,
        country_code: state.country_code
      };
  
      const res = appCreate(newApp).then((res) => {
        if (res.status === 201) {
          setEventType('success');
          setEventMessage('Org Successfully Created');
          setEventTitle('ORG CREATE');
          setIsSnackBarAlertOpen(true);
        } else {
          setEventType('fail');
          setEventMessage('Org NOT Created');
          setEventTitle('ORG CREATE');
          setIsSnackBarAlertOpen(true);
        }
      });
  
      return res;
    };

 
    return (
        <MiniDrawer2>
            <SnackbarAlert
        open={isSnackBarAlertOpen}
        type={eventType}
        message={eventMessage}
        handleClose={() => setIsSnackBarAlertOpen(false)}
        title={eventTitle}
      />
        <React.Fragment>
            <div className='m-16'>
            <h2 className='mt-4 text-xl font-semibold'>Add Organisation</h2>
            <p className='mb-24'>This will create an Organisation</p>
            <Card>
                <CardContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                Fields marked with <span style={{ color: 'red' }}>*</span> are required.
                </Typography>
            <form className="m-4" onSubmit={handleSubmit} action={<Link to="/login" />}>
    
                <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Name"
                        onChange={handleChange}
                        name="name"
                        value={state.name}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    value={state.email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    name="secret"
                    onChange={handleChange}
                    value={state.secret}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Country Code"
                    onChange={handleChange}
                    name="country_code"
                    value={state.country_code}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
    
                <Button variant="contained" sx={{ backgroundColor: '#094C95 !important', color: '#FFFFFF !important', '&:hover': { backgroundColor: '#001041 !important' } }} type="submit">
                Create
                </Button>
            </form>
            </CardContent>
      </Card>
            </div>
     
        </React.Fragment>
        </MiniDrawer2>
    )
}
 
export default CreateOrg;