import { ReactElement, useEffect, useRef, useState } from "react";
import { Paper, Box, Grid } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  const contentRef = useRef(null);

  return (
        <Grid container spacing={2}>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>How do I load my units?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="#094C95">
                  Click on the request units tab . Select the package that you need and submit your request.Our team will load your units within 2 hrs.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography> What format should I use for bulk upload of contacts?</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Typography variant="body2" color="#094C95">
                  On the upload contacts page, you can download a csv file that has the format of columns and mobile numbers.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>What is the maximum amount of SMSs I can send?</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Typography variant="body2" color="#094C95">
                  You can send any amount of SMSs at any time of the day
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>
                  How long does it take for an SMS to be delivered?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Typography variant="body2" color="#094C95">
                  It depends on the amount of contacts it is being sent to.They are delivered in the same order as in the group.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Where are you located ?</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Typography variant="body2" color="#094C95">We are located on the 5th floor of The Attrium on Chaka road</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>What is the maximum amount of SMSs I can send?</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Typography variant="body2" color="#094C95">
                  You can send any amount of SMSs at any time of the day
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Grid>

  );
};

export default Faq;
