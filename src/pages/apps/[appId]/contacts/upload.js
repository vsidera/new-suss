import React, {useState} from 'react';
import Link from 'next/link';
import MiniDrawer from '../../../../components/sidebar2/sidebar2';
import { Card, CardContent, Select, Button, Input, MenuItem, InputLabel, Typography } from '@mui/material';
import { saveAs } from 'file-saver';

 
 
const UploadForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, mobile) 
    }

    function handleDownloadTemplate() {
        // Create the template data in the desired format (e.g., JSON)
        const templateData = [
          { firstName: 'John', lastName: 'Doe', email: 'john@example.com', mobile: '0711223344' },
          { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', mobile: '0722334455' },
          // Add more sample data as needed
        ];
      
        // Convert the template data to an Excel-compatible format (e.g., CSV)
        const csvData = convertToCsv(templateData);
      
        // Create a Blob from the CSV data
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      
        // Save the Blob as a file with the desired filename
        saveAs(blob, 'contact_template.csv');
      }
      
      function convertToCsv(data) {
        // Convert the data to CSV format (you can use a library like `papaparse` for more complex formatting)
        const csvRows = [];
        const headers = Object.keys(data[0]);
      
        csvRows.push(headers.join(','));
      
        for (const row of data) {
          const values = headers.map((header) => row[header]);
          csvRows.push(values.join(','));
        }
      
        return csvRows.join('\n');
      }
      
 
    return (
        <MiniDrawer>
        <React.Fragment>
            <div className='m-16'>
            <h2 className='mt-4 text-xl font-semibold'>Upload Contacts</h2>
            <p className='mb-24 text-[#094C95]'>Bulk upload contacts from a csv file</p>
            Use this as a template:
            <Button
            variant="contained"
            sx={{
                backgroundColor: '#094C95 !important',
                color: '#FFFFFF !important',
                '&:hover': { backgroundColor: '#001041 !important' }
            }}
            onClick={handleDownloadTemplate}
            >
            Download Template
            </Button>
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