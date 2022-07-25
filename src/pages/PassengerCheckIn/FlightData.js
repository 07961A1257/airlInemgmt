import * as React from 'react';
import { List, ListItem, Button } from '@mui/material';
import { Flight } from '@mui/icons-material';
import useClasses from '../../hooks/useClasses';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
    textAlign: 'center'
  }
});

const FlightData = ({ getSelectedFlight }) => {
  const classes = useClasses(styles);

  const [flightId, setSelectedFlightId] = React.useState(1);
  const flights = [
    {
      id: 1,
      name: 'Flight 1',
      time: '10:00 AM'
    },
    {
      id: 2,
      name: 'Flight 2',
      time: '12:00 PM'
    },
    {
      id: 3,
      name: 'Flight 3',
      time: '16:00 PM'
    },
    {
      id: 4,
      name: 'Flight 4',
      time: '23:00 PM'
    }
  ];

  const onFlightSelected = (flight) => {
    setSelectedFlightId(flight.id);
    getSelectedFlight(flight.id);
  };

  return (
    <List>
      <ListItem>
        {flights.map((flight) => (
          <Button
            key={flight.id}
            variant="contained"
            color={flight.id === flightId ? 'primary' : 'warning'}
            className={classes.button}
            startIcon={<Flight />}
            onClick={() => onFlightSelected(flight)}>
            {flight.name + ' ( ' + flight.time + ' ) '}
          </Button>
        ))}
      </ListItem>
    </List>
  );
};

FlightData.propTypes = {
  getSelectedFlight: PropTypes.func.isRequired
};

export default FlightData;
