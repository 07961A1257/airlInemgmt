/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Button, Box, Link, Drawer, Typography, Avatar } from '@mui/material';

// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection.js';
//
import navConfig from './NavConfig';

import { logOutApp } from '../../redux/actions/userAction';
// ----------------------------------------------------------------------
import ProfileImage from '../../assets/avatar.jpg';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

const DashboardSidebar = ({ auth, isOpenSidebar, onCloseSidebar }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { users } = auth;
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const handleLogout = () => {
    logOutApp();
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      }}>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={ProfileImage} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {users && users?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* {account.role} */}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={navConfig} />
      <Box sx={{ mt: 2, mb: 5, mx: 2.5 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          disableElevation
          onClick={handleLogout}
          aria-label="Logout">
          Logout
        </Button>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
          aria-label="Drawer">
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
          aria-label="Drawer">
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logOutApp
};

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  logOutApp: PropTypes.func.isRequired,
  auth: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSidebar);
