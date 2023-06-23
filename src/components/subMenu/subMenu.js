import React, { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Box } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Link from 'next/link';

export default function SidebarItemWithSubmenu({ primary, icon, submenuItems, href }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSubmenuItem = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <ListItemButton onClick={handleToggle}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemIcon>{icon}</ListItemIcon>
          <Link href={href} passHref>
            <ListItemText primary={primary} sx={{ color: '#C4C7CF' }} /> {/* Change text color here */}
          </Link>
        </Box>
        {open ? <ExpandLessIcon sx={{ color: '#C4C7CF' }} /> : <ExpandMoreIcon sx={{ color: '#C4C7CF' }} />}
      </ListItemButton>
      {open && (
        <List component="div" disablePadding>
          {submenuItems && submenuItems.map((item) => (
            <ListItemButton key={item.primary} sx={{ pl: 4 }} onClick={handleSubmenuItem}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Link href={item.href} passHref >
                <ListItemText primary={item.primary} sx={{ color: '#C4C7CF' }} /> {/* Change text color here */}
              </Link>
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
}
