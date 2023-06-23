import React, {useState} from 'react';
import Link from 'next/link';
import MiniDrawer2 from '../../components/adminSidebar2/adminSidebar2';
import { Card, CardContent, TextField, Button, Stack, Typography } from '@mui/material';
 
 
const RegisterForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, mobile) 
    }
 
    return (
        <MiniDrawer2>
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
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    onChange={e => setMobile(e.target.value)}
                    value={mobile}
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