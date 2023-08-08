import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAuthContext } from '../../contexts/AuthContext';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import userServices from '../../services/getUsers';
import { GridApiCommunity } from '@mui/x-data-grid/models/api/gridApiCommunity';
import UserToolbar from './Toolbar/UserToolbar';
import { format } from '../../utils/format';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'username',
    headerName: 'Username',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'lastLogin',
    headerName: 'Last login time',
    flex: 1,
  },
  {
    field: 'registrationDate',
    headerName: 'Registration time',
    flex: 1,
  },
  {
    field: 'blocked',
    headerName: 'Status',
    width: 160,
  },
];

const UsersTable = () => {
  const authContext = useAuthContext();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const apiRef = useRef() as React.MutableRefObject<GridApiCommunity>;

  const handleSelectionChange = () => {
    const ids: number[] = [];
    const selectedRows = apiRef.current.getSelectedRows();
    selectedRows.forEach((value) => {
      ids.push(value.id);
    });
    setSelectedIds(ids);
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ['todos', authContext.user?.id],
    queryFn: async () => {
      const response = await userServices.getUsers(authContext.token);
      if (!response) throw new Error('Failed to fetch data');

      return format(response.data.users);
    },
    enabled: !!authContext.token,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError || !data) {
    return <span>Error</span>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <UserToolbar selectedIds={selectedIds} />
      <DataGrid
        apiRef={apiRef}
        onRowSelectionModelChange={handleSelectionChange}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default UsersTable;
