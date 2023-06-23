import React, {useState} from 'react';
import Link from 'next/link';
import { Card, CardContent, TextField, Button, Stack, Typography } from '@mui/material';
import MiniDrawer2 from '../../components/adminSidebar2/adminSidebar2';
 
 
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
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
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
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Country Code"
                    onChange={e => setMobile(e.target.value)}
                    value={mobile}
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
 
export default RegisterForm;