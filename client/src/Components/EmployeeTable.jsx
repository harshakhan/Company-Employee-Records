import * as React from 'react';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'joining_date', headerName: 'Joining Date', type: 'number', width: 90 },
  { field: 'department', headerName: 'Department', width: 120 },
  { field: 'gender', headerName: 'Gender', width: 90, valueGetter: params => `${{ 'M': 'Male', 'F': 'Female', 'O': 'Others' }[params.getValue('gender')] || 'Others'}`},
  { field: 'payment', headerName: 'Total No of Payment', width: 90, valueGetter: params => {
    return `${params?.data?.payment?.length}`}
  }
]

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

export default function EmployeeTable({ employee = [], loading, limit, totalResults, totalPages, page, setPage }) {
  const history = useHistory()
  return (
    <div style={{ height: 650, width: '60%', background:'#B2DFDB', margin:'auto'   }}>
      <DataGrid rows={employee} components={{ loadingOverlay: CustomLoadingOverlay }}
       onRowClick={value => {
          window.localStorage.setItem('employeeId', value.data._id)
          history.push(value.data._id)  
        }}
       loading={loading} columns={columns} paginationMode='server' 
       rowCount={totalResults} 
       onPageChange={e => setPage(e.page)} pageSize={limit} 
       pagination={true} page={page} checkboxSelection={false} />
    </div>
  );
}