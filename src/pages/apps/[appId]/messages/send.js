import React, {useState} from 'react';
import Link from 'next/link';
import MiniDrawer from '../../../../components/sidebar2/sidebar2';
import { Card, CardContent, Select, Button, Input, MenuItem, InputLabel, Typography, TextField, TextareaAutosize } from '@mui/material';
 
 
const SendForm = () => {
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
            <h2 className='mt-4 text-xl font-semibold'>Send Message</h2>
            <p className='mb-24 text-[#094C95]'>Send message to one contact</p>
            <Card>
            <CardContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
            Fields marked with <span style={{ color: 'red' }}>*</span> are required.
            </Typography>
                <form className="m-4" onSubmit={handleSubmit}>

                <InputLabel htmlFor="select-option"><span style={{ color: 'red' }}>*</span>Select Sender Id</InputLabel>
                <Select
                    id="select-option"
                    // value={selectedOption}
                    // onChange={handleSelectChange}
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                >
                    <MenuItem value="option1">Sender ID 1</MenuItem>
                    <MenuItem value="option2">Sender ID 2</MenuItem>
                </Select>
                <InputLabel htmlFor="file-upload"><span style={{ color: 'red' }}>*</span>Enter Mobile Number</InputLabel>
                <TextField
                    type="number"
                    variant='outlined'
                    color='secondary'
                    label="Mobile"
                    placeholder='0711438911'
                    onChange={e => setMobile(e.target.value)}
                    value={mobile}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                <InputLabel htmlFor="file-upload"><span style={{ color: 'red' }}>*</span>Type your message here</InputLabel>
                 <TextareaAutosize
                      id="content"
                      name="content"
                      aria-label="empty textarea"
                      placeholder="Hello Client, This is to notify you ..."
                    //   value={state.content}
                    //   onChange={handleChange}
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