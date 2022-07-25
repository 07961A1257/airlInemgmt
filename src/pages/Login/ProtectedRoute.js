/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, auth: { isAuthenticated } }) => {
  return isAuthenticated === true ? children : <Navigate to="/login" replace />;
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
