import * as React from 'react';
import {
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LockOutlined, KeyboardArrowRight } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PropTypes } from 'prop-types';
import { signInUser } from '../../redux/actions/userAction';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Axios from '../../config/api.config';
import { createUser } from './../../api/authenticationService';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://localhost:3000/">
        Airline Management
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({});

const SignIn = ({ user, signInUser }) => {
  const { state } = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user.isAuthenticated) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [user.isAuthenticated]);

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      signInUser({ ...values })
        .then((data) => {
          if (!data.validState) setErrorMessage('Invalid Username or Password.');
          else {
            setErrorMessage('');
            navigate(state?.path || '/');
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  const googleSuccessResponse = async (response) => {
    const id = response.profileObj.googleId;

    Axios.get(`/users/${id}`)
      .then((profileObj) => {
        window.localStorage.setItem('user', JSON.stringify(profileObj.data));
        return signInUser({
          ...profileObj.data,
          googleAuth: true
        });
      })
      // eslint-disable-next-line no-unused-vars
      .catch(async (err) => {
        const user = await createUser({
          ...response.profileObj.data,
          id,
          isAdmin: false
        });
        window.localStorage.setItem('user', JSON.stringify(user));
        signInUser({
          user,
          googleAuth: true
        });
      });
  };

  const googleFailureResponse = async (response) => {
    console.log(response);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
              color="primary"
              endIcon={<KeyboardArrowRight />}>
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <GoogleLogin
                  dataTest="nativeLogin"
                  className="GoogleButton"
                  clientId="813755426604-c14fjkrfta5up8p97rptleprf7ua6l3l.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  cookiePolicy={'single_host_origin'}
                  onSuccess={(response) => {
                    googleSuccessResponse(response);
                  }}
                  onFailure={(response) => {
                    googleFailureResponse(response);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth
});

const mapDispatchToProps = {
  signInUser
};

SignIn.propTypes = {
  user: PropTypes.object.isRequired,
  signInUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
