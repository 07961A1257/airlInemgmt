import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataGrid, {
  Scrolling,
  Editing,
  Column,
  RequiredRule,
  Pager,
  Paging,
  Sorting,
  FilterRow,
  HeaderFilter,
  SearchPanel
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.material.teal.dark.css';
import { Typography } from '@mui/material';
import {
  loadPassengersList,
  saveUpdatePassengersList,
  deletePassengerDetails
} from '../../redux/actions/passengerAction';

const PassengerList = () => {
  const dispatch = useDispatch();
  const passengers = useSelector((state) => state.passengers);
  const allowedPageSizes = [10, 20, 30, 40, 50];
  console.log(passengers);

  React.useEffect(() => {
    dispatch(loadPassengersList());
  }, []);

  const onRowUpdating = (e) => {
    const initialServiceList = { ...e.oldData };
    const updatedService = Object.assign({}, initialServiceList, { ...e.newData });

    dispatch(saveUpdatePassengersList(updatedService));
  };

  const onRowInserting = (e) => {
    dispatch(saveUpdatePassengersList(e.data));
  };

  const onRowRemoving = (e) => {
    const { id } = e.data;
    dispatch(deletePassengerDetails(id));
  };

  return (
    <div>
      <Typography variant="h3">Passengers List</Typography>
      <DataGrid
        dataSource={passengers}
        showBorders={true}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        onRowUpdating={onRowUpdating}
        onRowInserting={onRowInserting}
        onRowRemoving={onRowRemoving}>
        <Editing
          refreshMode={'full'}
          mode="row"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />
        <Scrolling rowRenderingMode="virtual"></Scrolling>
        <Column dataField="name">
          <RequiredRule />
        </Column>
        <Column dataField="passport">
          <RequiredRule />
        </Column>
        <Column dataField="address">
          <RequiredRule />
        </Column>
        <Column dataField="isInfant"></Column>
        <Column dataField="isWheelChair"></Column>
        <Column dataField="isSpecialMeal"></Column>
        <Column dataField="flight">
          <RequiredRule />
        </Column>
        <Column dataField="seat">
          <RequiredRule />
        </Column>
        <Column dataField="checkedIn"></Column>
        <Sorting mode="multiple" />
        <FilterRow visible applyFilter />
        <HeaderFilter visible />
        <SearchPanel visible width={240} placeholder="Search..." />
        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          showPageSizeSelector
          showInfo
          showNavigationButtons
        />
      </DataGrid>
    </div>
  );
};

export default PassengerList;
