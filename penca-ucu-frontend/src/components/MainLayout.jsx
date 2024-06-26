import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab, Toolbar, Typography, Box, Container, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Dashboard from '../pages/Dashboard';
import Participants from '../pages/Participants';
import Fixture from '../pages/Fixture';
import AccuracyByCareer from '../pages/AccuracyByCareer';
import AdminDashboard from '../pages/AdminDashboard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuth } from '../context/AuthContext';

const CustomAppBar = styled(AppBar)({
  backgroundColor: '#1e88e5',
});

const CustomTab = styled(Tab)({
  color: '#fff',
  '&.Mui-selected': {
    color: '#ffeb3b',
  },
});

const CustomToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const CustomTitle = styled(Typography)({
  color: '#fff',
});

const MainLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const [value, setValue] = React.useState(currentPath);
  const { user } = useAuth();

  React.useEffect(() => {
    setValue(currentPath);
  }, [currentPath]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/dashboard" selected={value === '/dashboard'}>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button component={Link} to="/participants" selected={value === '/participants'}>
          <ListItemText primary="Participantes" />
        </ListItem>
        <ListItem button component={Link} to="/fixture" selected={value === '/fixture'}>
          <ListItemText primary="Fixture" />
        </ListItem>
        <ListItem button component={Link} to="/accuracy-by-career" selected={value === '/accuracy-by-career'}>
          <ListItemText primary="Aciertos por Carrera" />
        </ListItem>
        {user?.roleId === 2 && (
          <ListItem button component={Link} to="/admin-dashboard" selected={value === '/admin-dashboard'}>
            <ListItemText primary="Admin Dashboard" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <CustomAppBar position="static">
        <CustomToolbar>
          <CustomTitle variant="h6">
            Penca UCU
          </CustomTitle>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
            >
              <CustomTab label="Inicio" value="/dashboard" component={Link} to="/dashboard" />
              <CustomTab label="Participantes" value="/participants" component={Link} to="/participants" />
              <CustomTab label="Fixture" value="/fixture" component={Link} to="/fixture" />
              <CustomTab label="Aciertos por Carrera" value="/accuracy-by-career" component={Link} to="/accuracy-by-career" />
              {user?.roleId === 2 && (
                <CustomTab label="Admin Dashboard" value="/admin-dashboard" component={Link} to="/admin-dashboard" />
              )}
            </Tabs>
          )}
        </CustomToolbar>
      </CustomAppBar>
      <Container>
        <Box mt={2}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/fixture" element={<Fixture />} />
            <Route path="/accuracy-by-career" element={<AccuracyByCareer />} />
            {user?.roleId === 2 && <Route path="/admin-dashboard" element={<AdminDashboard />} />}
          </Routes>
        </Box>
      </Container>
    </>
  );
};

export default MainLayout;
