import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import MiniDrawer from '../../../../components/sidebar2/sidebar2';
import { Card, CardContent, Select, Button, Input, MenuItem, InputLabel, Typography, TextField, TextareaAutosize } from '@mui/material';
import { groupsAction } from '../../../api/actions/groups/groupsActions';
import { useRouter } from "next/router";
 
 
const SendForm = () => {


    const router = useRouter();
    const app_id = router.query.appId;

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')

    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

  
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
  
    useEffect(() => {
      getGroups();
    //   setIsLoaded(true);
    }, [page, limit]);
 
    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, mobile) 
    }
 
    return (
        <MiniDrawer>
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
     
                <InputLabel htmlFor="file-upload"><span style={{ color: 'red' }}>*</span>Type your message here</InputLabel>
                 <TextareaAutosize
                      id="content"
                      name="content"
                      aria-label="empty textarea"
                      placeholder="This allows a maximum of 140 characters"
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