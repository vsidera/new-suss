import React, {useState} from 'react';
import Link from 'next/link';
import MiniDrawer2 from '../../../../components/adminSidebar2/adminSidebar2';
import { Card, CardContent, TextField, Button, Stack, Typography } from '@mui/material';
import SnackbarAlert from '../../../../components/utils/snackbar';
import { userCreate } from '../../../api/actions/login/loginAction';
import { useRouter } from 'next/router';
 
const RegisterForm = () => {

    const router = useRouter();
    const app_id = router.query.appId;

    const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
    const [eventType, setEventType] = useState('');
    const [eventMessage, setEventMessage] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);
  
    const [state, setState] = React.useState({
      email: '',
      firstname: '',
      lastname: '',
      password: ''
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
  
      const newUser = {
        email: state.email,
        firstname: state.firstname,
        lastname: state.lastname,
        password: state.password
      };
  
      const res = userCreate({newUser,app_id}).then((res) => {
        if (res.status === 201) {
          setEventType('success');
          setEventMessage('User Successfully Created');
          setEventTitle('USER CREATE');
          setIsSnackBarAlertOpen(true);
        } else {
          setEventType('fail');
          setEventMessage('USER NOT Created');
          setEventTitle('USER CREATE');
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
            <h2 className='mt-4 text-xl font-semibold'>Add User</h2>
            <p className='mb-24'>Amin can create a user for the system</p>
            <Card>
                <CardContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                Fields marked with <span style={{ color: 'red' }}>*</span> are required.
                </Typography>
            <form className="m-4" onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={handleChange}
                        name='firstname'
                        value={state.firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={handleChange}
                        name='lastname'
                        value={state.lastName}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={handleChange}
                    value={state.email}
                    name='email'
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    onChange={handleChange}
                    value={state.password}
                    name='password'
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
    
                <Button variant="contained" sx={{ backgroundColor: '#094C95 !important', color: '#FFFFFF !important', '&:hover': { backgroundColor: '#001041 !important' } }} type="submit">
                Add
                </Button>
            </form>
            </CardContent>
      </Card>
            </div>
     
        </React.Fragment>
        </MiniDrawer2>
    )
}
 
export default RegisterForm;