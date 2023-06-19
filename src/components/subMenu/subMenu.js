import React, { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Link from 'next/link';



// Sidebar item with submenu
// Sidebar item with submenu
export default function SidebarItemWithSubmenu({ primary, icon, submenuItems }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
    <ListItemButton onClick={handleToggle}>
      <ListItemIcon>{icon}</ListItemIcon>
      <Link href="/contacts" passHref>
        <ListItemText primary={primary} sx={{ color: '#D1D1D1' }} /> {/* Change text color here */}
      </Link>
      {open ? <ExpandLessIcon sx={{ color: '#D1D1D1' }} /> : <ExpandMoreIcon sx={{ color: '#D1D1D1' }} />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {submenuItems.map((item) => (
          <ListItemButton key={item.primary} sx={{ pl: 4 }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Link href={item.href} passHref>
              <ListItemText primary={item.primary} sx={{ color: '#D1D1D1' }} /> {/* Change text color here */}
            </Link>
          </ListItemButton>
        ))}
      </List>
    </Collapse>
  </>

  );
}


