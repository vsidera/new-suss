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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { signOut } from "next-auth/react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useRouter } from "next/router";
import GroupsIcon from "@mui/icons-material/Groups";
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';


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

  const router = useRouter();
  const { id } = router.query;

  let appId = null;

  if (typeof window !== "undefined") {
    appId = localStorage.getItem("appId");
  }

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

  const handleLogout = (e) => {
    localStorage.clear();
    signOut();
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
            color: "#FFFFFF8F",
            fontSize: "15px",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          // subheader={
          //   <ListSubheader component="div" id="nested-list-subheader">
          //     Nested List Items
          //   </ListSubheader>
          // }
        >
          <NextLink href={`/apps/${appId}/home`} passHref>
            <ListItemButton>
              <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2" style={{ fontSize: 15 }}>
                  Dashboard
                </Typography>
              </ListItemText>
            </ListItemButton>
          </NextLink>
     
          <ListItemButton onClick={handleClick}>
            <ListItemIcon style={{ color: "#FFFFFF8F" }}>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" style={{ fontSize: 15 }}>
                Contacts
              </Typography>
            </ListItemText>
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <NextLink href={`/apps/${appId}/contacts`} passHref>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2" style={{ fontSize: 15 }}>
                      List Contacts
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
          </NextLink>
          <NextLink href={`/apps/${appId}/contacts/add`} passHref>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2" style={{ fontSize: 15 }}>
                      Create Contact
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
          </NextLink>
          <NextLink href={`/apps/${appId}/contacts/upload`} passHref>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2" style={{ fontSize: 15 }}>
                      Create Bulk Contacts
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
          </NextLink>


          <ListItemButton onClick={handleClick}>
            <ListItemIcon style={{ color: "#FFFFFF8F" }}>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" style={{ fontSize: 15 }}>
                Groups
              </Typography>
            </ListItemText>
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <NextLink href={`/apps/${appId}/groups`} passHref>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2" style={{ fontSize: 15 }}>
                      List Groups
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
          </NextLink>
          <NextLink href={`/apps/${appId}/groups/add`} passHref>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2" style={{ fontSize: 15 }}>
                      Create Group
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
          </NextLink>

     
          <NextLink href={`/apps/${appId}/messages`} passHref>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                <MailIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2" style={{ fontSize: 15 }}>
                  Messages
                </Typography>
              </ListItemText>
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <NextLink href={`/apps/${appId}/messages/send`} passHref>
              <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                      <SendIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="body2" style={{ fontSize: 15 }}>
                        Send SMS
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Collapse>
            </NextLink>
            <NextLink href={`/apps/${appId}/messages/broadcast`} passHref>
              <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                      <ShareIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="body2" style={{ fontSize: 15 }}>
                        Send Bulk SMS
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Collapse>
            </NextLink>
          </NextLink>
          <NextLink href={`/apps/${appId}/org-senderIds`} passHref>
            <ListItemButton>
              <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2" style={{ fontSize: 15 }}>
                  Sender Ids
                </Typography>
              </ListItemText>
            </ListItemButton>
          </NextLink>
          <NextLink href={`/apps/${appId}/analytics`} passHref>
            <ListItemButton>
              <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2" style={{ fontSize: 15 }}>
                  Analytics
                </Typography>
              </ListItemText>
            </ListItemButton>
          </NextLink>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon style={{ color: "#FFFFFF8F" }}>
              <RequestQuoteIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" style={{ fontSize: 15 }}>
                Request Units
              </Typography>
            </ListItemText>
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <NextLink href="/requestUnits/senderIds" passHref>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                    <ShoppingBasketIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2" style={{ fontSize: 15 }}>
                      Buy Sender Id
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
          </NextLink>
          <NextLink href="/requestUnits/SMS" passHref>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                    <ShoppingBagIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2" style={{ fontSize: 15 }}>
                      Buy SMS Units
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
          </NextLink>
          <NextLink
            href="https://swagger.io/solutions/api-documentation/"
            passHref
          >
            <Divider />
            <ListItemButton>
              <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2" style={{ fontSize: 15 }}>
                  Developer
                </Typography>
              </ListItemText>
            </ListItemButton>
          </NextLink>
          <NextLink href="/support" passHref>
            <Divider />
            <ListItemButton>
              <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                <SosIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2" style={{ fontSize: 15 }}>
                  Support/Faqs
                </Typography>
              </ListItemText>
            </ListItemButton>
          </NextLink>
          <NextLink href="/login" passHref>
            <Divider />
            <ListItemButton>
              <ListItemIcon style={{ color: "#FFFFFF8F" }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="body2"
                  style={{ fontSize: 15 }}
                  onClick={handleLogout}
                >
                  Logout
                </Typography>
              </ListItemText>
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
            SOCIALS |
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
              sx={{ ml: 1, cursor: "pointer", color: "#094C95" }}
            >
              Facebook
            </Typography>
          </NextLink>
          <NextLink href="https://twitter.com/Sussdigital" passHref>
            <Typography
              variant="caption"
              color="textPrimary"
              sx={{ ml: 1, cursor: "pointer", color: "#094C95" }}
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
              sx={{ ml: 1, cursor: "pointer", color: "#094C95" }}
            >
              LinkedIn |
            </Typography>
          </NextLink>
          <NextLink href="https://suss.co.ke/privacy-policy/" passHref>
            <Typography
              variant="caption"
              color="textPrimary"
              sx={{ ml: 1, cursor: "pointer", color: "#094C95" }}
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
