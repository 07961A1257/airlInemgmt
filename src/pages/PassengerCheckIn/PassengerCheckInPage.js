import React from 'react';
import { Grid, Paper, Box } from '@mui/material';
import useClasses from '../../hooks/useClasses';
import FlightData from './FlightData';
import DataGrid, {
  Scrolling,
  Paging,
  Sorting,
  HeaderFilter,
  SearchPanel,
  Editing,
  Column,
  RequiredRule,
  Lookup
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.material.teal.dark.css';
import {
  getCheckInPassengersByFlight,
  saveCheckInPassenger,
  deleteCheckInPassenger
} from '../../api/passengerService';

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing(1),
    textAlign: 'center'
  },
  corridor: {
    margin: theme.spacing(1)
  }
});

const PassengerCheckInPage = () => {
  const classes = useClasses(styles);
  const [flightId, setFlightId] = React.useState(1);
  const [data, setData] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const seats = [
    {
      id: 1,
      value: 'S1'
    },
    {
      id: 2,
      value: 'S2'
    },
    {
      id: 3,
      value: 'S3'
    },
    {
      id: 4,
      value: 'S4'
    }
  ];

  const fetchData = async (flightId) => {
    await getCheckInPassengersByFlight(flightId).then((response) => {
      if (response) {
        setData(response);
      }
    });
  };

  React.useEffect(() => {
    fetchData(flightId);
  }, [flightId]);

  const selectedFlight = (value) => {
    console.log(value);
    setFlightId(value);
  };

  const onRowUpdating = async (e) => {
    const initialServiceList = { ...e.oldData };
    const updatedService = Object.assign({}, initialServiceList, { ...e.newData });
    await saveCheckInPassenger(updatedService)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const onRowRemoving = async (e) => {
    const { id } = e.data;
    await deleteCheckInPassenger(id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Paper className={classes.paper}>
            <Box component={'div'}>
              <FlightData getSelectedFlight={selectedFlight} />
            </Box>
            <Box component={'div'}>
              <DataGrid
                dataSource={data}
                showBorders={true}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                onRowUpdating={onRowUpdating}
                onRowRemoving={onRowRemoving}>
                <Editing
                  refreshMode={'full'}
                  mode="row"
                  allowDeleting={true}
                  allowUpdating={true}
                />
                <Scrolling rowRenderingMode="virtual"></Scrolling>
                <Sorting mode="multiple" />

                <HeaderFilter visible />
                <SearchPanel visible width={240} placeholder="Search..." />
                <Paging defaultPageSize={10} />

                <Column dataField="name" allowEditing={false}>
                  <RequiredRule />
                </Column>
                <Column dataField="flight" allowEditing={false}>
                  <RequiredRule />
                </Column>
                <Column dataField="seat">
                  <Lookup dataSource={seats} displayExpr={'value'} valueExpr={'value'}></Lookup>
                  <RequiredRule />
                </Column>
                <Column dataField="isInfant"></Column>
                <Column dataField="isSpecialMeal"></Column>
                <Column dataField="isWheelChair"></Column>
              </DataGrid>
            </Box>
          </Paper>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default PassengerCheckInPage;
