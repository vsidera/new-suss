import * as React from "react";
import NextLink from "next/link";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SidebarItemWithSubmenu from "../subMenu/subMenu";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";
import ShareIcon from "@mui/icons-material/Share";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SosIcon from "@mui/icons-material/Sos";
import CodeIcon from "@mui/icons-material/Code";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListSubheader from "@mui/material/ListSubheader";
import DraftsIcon from "@mui/icons-material/Drafts";
// import SendIcon from '@mui/icons-material/Send';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Collapse from "@mui/material/Collapse";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#233044",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "#233044",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(true);

  const handleClick = () => {
    setOpen1(!open1);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "#FFFFFF" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: "#000F2D",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="caption"
            noWrap
            component="div"
            sx={{ color: "#000F2D" }}
          >
            Unlock the Power of Communication: Send Messages That Make an
            Impact!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: "#FFFFFF" }}>
          <img src="/images/logo.png" alt="Logo" height={30} />{" "}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "#233044", 
            color: "#C4C7CF",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          // subheader={
          //   <ListSubheader component="div" id="nested-list-subheader">
          //     Nested List Items
          //   </ListSubheader>
          // }
        >
          <NextLink href="/home" passHref>
            <ListItemButton>
              <ListItemIcon style={{ color: "#C4C7CF" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </NextLink>
          <NextLink href="/contacts" passHref>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon style={{ color: "#C4C7CF" }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <NextLink href="/contacts/add" passHref>
              <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon style={{ color: "#C4C7CF" }}>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add" />
                  </ListItemButton>
                </List>
              </Collapse>
            </NextLink>
            <NextLink href="/contacts/upload" passHref>
              <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon style={{ color: "#C4C7CF" }}>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Upload" />
                  </ListItemButton>
                </List>
              </Collapse>
            </NextLink>
          </NextLink>
          <NextLink href="/messages" passHref>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon style={{ color: "#C4C7CF" }}>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" />
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <NextLink href="/messages/send" passHref>
              <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon style={{ color: "#C4C7CF" }}>
                      <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Send Sms" />
                  </ListItemButton>
                </List>
              </Collapse>
            </NextLink>
            <NextLink href="/messages/broadcast" passHref>
              <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon style={{ color: "#C4C7CF" }}>
                      <ShareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Send Bulk" />
                  </ListItemButton>
                </List>
              </Collapse>
            </NextLink>
          </NextLink>
          <NextLink href="/org-senderIds" passHref>
            <ListItemButton>
              <ListItemIcon style={{ color: "#C4C7CF" }}>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText primary="Org Sender Ids" />
            </ListItemButton>
          </NextLink>
          <NextLink href="/analytics" passHref>
            <ListItemButton>
              <ListItemIcon style={{ color: "#C4C7CF" }}>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </NextLink>
          <NextLink href="#" passHref>
            <Divider />
            <ListItemButton>
              <ListItemIcon style={{ color: "#C4C7CF" }}>
                <RequestQuoteIcon />
              </ListItemIcon>
              <ListItemText primary="Request Units" />
            </ListItemButton>
          </NextLink>
          <NextLink href="#" passHref>
            <Divider />
            <ListItemButton>
              <ListItemIcon style={{ color: "#C4C7CF" }}>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="Developer" />
            </ListItemButton>
          </NextLink>
          <NextLink href="/#" passHref>
            <Divider />
            <ListItemButton>
              <ListItemIcon style={{ color: "#C4C7CF" }}>
                <SosIcon />
              </ListItemIcon>
              <ListItemText primary="Support" />
            </ListItemButton>
          </NextLink>
          <NextLink href="/#" passHref>
            <Divider />
            <ListItemButton>
              <ListItemIcon style={{ color: "#C4C7CF" }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </NextLink>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
      <AppBar position="fixed" open={open} sx={{ top: "auto", bottom: 0 }}>
        <Toolbar
          sx={{
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            color="textPrimary"
            sx={{ position: "relative", paddingRight: 1 }}
          >
            Socials |
            <span
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
                height: "50%",
                width: 1,
                backgroundColor: "#000000",
              }}
            />
          </Typography>
          <NextLink
            href="https://www.facebook.com/Suss-103409912014881"
            passHref
          >
            <Typography
              variant="caption"
              color="textPrimary"
              sx={{ ml: 1, cursor: "pointer" }}
            >
              Facebook
            </Typography>
          </NextLink>
          <NextLink href="https://twitter.com/Sussdigital" passHref>
            <Typography
              variant="caption"
              color="textPrimary"
              sx={{ ml: 1, cursor: "pointer" }}
            >
              Twitter
            </Typography>
          </NextLink>
          <NextLink
            href="https://www.linkedin.com/company/suss-digital-africa/"
            passHref
          >
            <Typography
              variant="caption"
              color="textPrimary"
              sx={{ ml: 1, cursor: "pointer" }}
            >
              LinkedIn |
            </Typography>
          </NextLink>
          <NextLink href="https://suss.co.ke/privacy-policy/" passHref>
            <Typography
              variant="caption"
              color="textPrimary"
              sx={{ ml: 1, cursor: "pointer" }}
            >
              Privacy Policy |
            </Typography>
          </NextLink>
          {/* Add more social media site names and links as needed */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
