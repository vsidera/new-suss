import React, {useState} from 'react';
import Link from 'next/link';
import MiniDrawer from '../../../../components/sidebar2/sidebar2';
import { Card, CardContent, Select, Button, Input, MenuItem, InputLabel, Typography } from '@mui/material';
 
 
const UploadForm = () => {
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
            <h2 className='mt-4 text-xl font-semibold'>Upload Contacts</h2>
            <p className='mb-24 text-[#094C95]'>Bulk upload contacts from a csv file</p>
            <Card>
            <CardContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
            Fields marked with <span style={{ color: 'red' }}>*</span> are required.
            </Typography>
                <form className="m-4" onSubmit={handleSubmit}>

                <InputLabel htmlFor="select-option"><span style={{ color: 'red' }}>*</span>Select Group</InputLabel>
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
                    <MenuItem value="option1">Group 1</MenuItem>
                    <MenuItem value="option2">Group 2</MenuItem>
                </Select>
                <InputLabel htmlFor="file-upload"><span style={{ color: 'red' }}>*</span>Upload CSV Group File to Upload</InputLabel>
                <Input
                    id="file-upload"
                    type="file"
                    variant='outlined'
                    color='secondary'
                    // onChange={handleFileUpload}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
               
               <Button variant="contained" sx={{ backgroundColor: '#094C95 !important', color: '#FFFFFF !important', '&:hover': { backgroundColor: '#001041 !important' } }} type="submit">
                Upload
                </Button>
                </form>
            </CardContent>
            </Card>
            </div>
     
        </React.Fragment>
        </MiniDrawer>
    )
}
 
export default UploadForm;