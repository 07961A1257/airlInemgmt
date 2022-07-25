import React from 'react';
// theme
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import ComponentRouter from './ComponentRouter';
import { CircularProgress } from '@mui/material';

const App = () => {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <React.Suspense fallback={<CircularProgress className="circular-center" />}>
        <ComponentRouter />
      </React.Suspense>
    </ThemeProvider>
  );
};

export default App;
