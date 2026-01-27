import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { logout } from '../../features/auth/authSlice';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CloseIcon from '@mui/icons-material/Close';
import { ModeSwitch } from '../ui/ModeSwitch'

const drawerWidth = 240;
const FOOTER_HEIGHT = 48;

interface Props {
  children?: ReactNode;
}

export default function AppLayout({ children }: Props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    navigate('/login');
  };

const drawerContent = (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* Header */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1,
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h6" fontWeight="bold" noWrap>
        Incident Hub
      </Typography>
      <IconButton onClick={handleDrawerToggle}>
        <CloseIcon />
      </IconButton>
    </Box>

    <Divider />

    {/* Navigation (takes remaining space) */}
    <Box sx={{ flexGrow: 1 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/dashboard"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/incidents"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Incidents" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>

    {/* Bottom section */}
    <Divider />
    <Box
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ModeSwitch />
    </Box>
  </Box>
);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
          // sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>



          <Typography variant="h5" noWrap sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1, // space between icon & text
            justifyContent: 'center'
          }}>
            <ManageAccountsIcon fontSize='large' />

            System Management
          </Typography>


          <div>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>{user?.email || 'User'}</MenuItem>
              <MenuItem disabled>
                <Typography sx={{textTransform: 'none'}}>
                  {user?.role || 'User'}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>



      <Drawer
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open={openDrawer}
      >
        {drawerContent}
      </Drawer>


      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* Render children or nested routes via Outlet */}
        {children || <Outlet />}
      </Box>

            <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: FOOTER_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Incident Hub
        </Typography>
      </Box>
    </Box>

    
  );
}
