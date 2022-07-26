import * as React from 'react';
import { connect } from 'react-redux';
import { Paper, Grid, Typography, Divider } from '@mui/material';
import { Container } from '@mui/system';
import { PropTypes } from 'prop-types';

const DashboardPage = ({ auth: { users } }) => {
  const renderUserInfo = (users) => {
    if (!users) {
      return (
        <Typography color="textSecondary" textAlign="center" variant="h4" component="span">
          Loading..
        </Typography>
      );
    } else {
      return (
        <>
          <Typography color="textSecondary" textAlign="center" variant="h4" component="h1">
            Welcome {users?.name}
          </Typography>
          <Divider
            variant="inset"
            sx={{
              margin: 3
            }}
          />
          <Typography variant="body1" textAlign="center" component="p">
            You are successfully Logged into the system. You access is settled as a{' '}
            <strong>
              <em>{users.isAdmin ? 'Admin' : 'User'}</em>
            </strong>{' '}
            role.
          </Typography>
        </>
      );
    }
  };
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid alignItems="center" justifyContent="center" item xs={12} sm={12} md={12}>
          <Paper
            sx={{
              padding: 3,
              margin: 3
            }}>
            {renderUserInfo(users)}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

DashboardPage.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(DashboardPage);
