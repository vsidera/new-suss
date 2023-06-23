import React, {useState} from 'react';
import Link from 'next/link';
import MiniDrawer from '../../../../components/sidebar2/sidebar2';
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
        <MiniDrawer>
        <React.Fragment>
            <div className='m-16'>
            <h2 className='mt-4 text-xl font-semibold'>Add Contact</h2>
            <p className='mb-24 text-[#094C95]'>Manually add a new contact to a group</p>
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
                        placeholder='John'
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
                        placeholder='Doe'
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
                    placeholder='john.doe@gmail.com'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Mobile"
                    placeholder='0711223344'
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
        </MiniDrawer>
    )
}
 
export default RegisterForm;