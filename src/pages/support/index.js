import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import Faq from "../../components/faqs/faq";
import MiniDrawer from "../../components/sidebar2/sidebar2";

const Support = () => {

    const [email, setEmail] = useState('')

  return (
    <MiniDrawer>
      <React.Fragment>
        <div className="m-16">
          <h2 className="mt-4 text-xl font-semibold">Faqs</h2>
          <p className="mb-24 text-[#094C95]">Frequently asked questions</p>
          <p className="mb-4">
            Look through some of the frequently asked questions :
          </p>
          <Card>
            
            <CardContent>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <Faq />
                </div>
                <div style={{ flex: 1, marginLeft: "16px" }}>
                <p className='mb-2'>Didn't find any to match your issue ? Talk to us</p>
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
                <TextareaAutosize
                      id="content"
                      name="content"
                      aria-label="empty textarea"
                      placeholder="Type your question here (max 140 characters)"
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
                Ask
                </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </React.Fragment>
    </MiniDrawer>
  );
};

export default Support;
