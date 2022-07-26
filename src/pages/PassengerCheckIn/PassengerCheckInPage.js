import React from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
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
  loadPassengersList,
  saveUpdatePassengersList,
  deletePassengerDetails
} from '../../redux/actions/passengerAction';

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
  const dispatch = useDispatch();
  const passengers = useSelector((state) => console.log(state) || state.passengers);
  const users = useSelector((state) => state.auth.users);
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

  React.useEffect(() => {
    if (passengers.length === 0) dispatch(loadPassengersList());

    const response = passengers.filter((x) => x.flight === flightId.toString());
    setData(response);
  }, [flightId]);

  const selectedFlight = (value) => {
    setFlightId(value);
  };

  const onRowUpdating = async (e) => {
    const initialServiceList = { ...e.oldData };
    const updatedService = Object.assign({}, initialServiceList, { ...e.newData });
    dispatch(saveUpdatePassengersList(updatedService));
  };

  const onRowRemoving = async (e) => {
    const { id } = e.data;
    dispatch(deletePassengerDetails(id));
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Passengers Check-in</Typography>
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
                  allowDeleting={users.isAdmin}
                  allowUpdating={users.isAdmin}
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
