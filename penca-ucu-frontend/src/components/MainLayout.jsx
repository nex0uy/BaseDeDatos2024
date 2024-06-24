import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab, Toolbar, Typography, Box, Container, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Dashboard from '../pages/Dashboard';
import Participants from '../pages/Participants';
import Fixture from '../pages/Fixture';
import AccuracyByCareer from '../pages/AccuracyByCareer';
import useMediaQuery from '@mui/material/useMediaQuery';

const CustomAppBar = styled(AppBar)({
  backgroundColor: '#333',
});

const CustomTab = styled(Tab)({
  color: '#fff',
  '&.Mui-selected': {
    color: '#f50057',
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
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/participants" selected={value === '/participants'}>
          <ListItemText primary="Participants" />
        </ListItem>
        <ListItem button component={Link} to="/fixture" selected={value === '/fixture'}>
          <ListItemText primary="Fixture" />
        </ListItem>
        <ListItem button component={Link} to="/accuracy-by-career" selected={value === '/accuracy-by-career'}>
          <ListItemText primary="Accuracy by Career" />
        </ListItem>
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
              <CustomTab label="Dashboard" value="/dashboard" component={Link} to="/dashboard" />
              <CustomTab label="Participants" value="/participants" component={Link} to="/participants" />
              <CustomTab label="Fixture" value="/fixture" component={Link} to="/fixture" />
              <CustomTab label="Accuracy by Career" value="/accuracy-by-career" component={Link} to="/accuracy-by-career" />
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
          </Routes>
        </Box>
      </Container>
    </>
  );
};

export default MainLayout;
