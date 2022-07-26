/* eslint-disable no-unused-vars */
import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import { DataGrid, Column, Editing, Scrolling, RequiredRule } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.material.teal.dark.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAncillaryDetails,
  loadAncillaryList,
  saveUpdateAncillaryList
} from '../../redux/actions/ancillaryAction';
import { Typography } from '@mui/material';

const initialServiceList = {
  flight: '',
  service: '',
  id: '',
  type: ''
};
const AncillaryServicePage = () => {
  const dispatch = useDispatch();
  const ancillaryList = useSelector((state) => state.ancillaryList);
  const users = useSelector((state) => state.auth.users);
  React.useEffect(() => {
    dispatch(loadAncillaryList());
  }, []);

  const onRowUpdating = (e) => {
    const initialServiceList = { ...e.oldData };
    const updatedService = Object.assign({}, initialServiceList, { ...e.newData });

    dispatch(saveUpdateAncillaryList(updatedService));
  };

  const onRowInserting = (e) => {
    dispatch(saveUpdateAncillaryList(e.data));
  };

  const onRowRemoving = (e) => {
    const { id } = e.data;
    dispatch(deleteAncillaryDetails(id));
  };

  return (
    <React.Fragment>
      <Typography variant="h5">Ancillary Services</Typography>
      <DataGrid
        id="grid"
        showBorders={true}
        dataSource={ancillaryList}
        repaintChangesOnly={true}
        columnAutoWidth={true}
        onRowUpdating={onRowUpdating}
        onRowInserting={onRowInserting}
        onRowRemoving={onRowRemoving}>
        <Editing
          refreshMode={'full'}
          mode="row"
          allowAdding={users.isAdmin}
          allowDeleting={users.isAdmin}
          allowUpdating={users.isAdmin}
        />
        <Column dataField="flight">
          <RequiredRule />
        </Column>
        <Column dataField="service">
          <RequiredRule />
        </Column>
        <Column dataField="type">
          <RequiredRule />
        </Column>
        <Scrolling mode="virtual" />
      </DataGrid>
    </React.Fragment>
  );
};

export default AncillaryServicePage;
