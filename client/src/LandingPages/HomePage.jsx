import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputBase, NativeSelect, Typography, withStyles } from '@material-ui/core';
import EmployeeTable from '../Components/EmployeeTable';
import AddEmployee from '../Components/AddEmployee'
import SearchBar from '../Components/SearchBar'
import Axios from 'axios';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const HomePage = () => {
  const [addEmployeeModal, setAddEmployeeModal] = useState(false)
  const [employee, setEmployee] = useState({})
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let payload ={}
    payload.page = page
    payload.limit = limit
    
    if(query && query.length > 0){
      payload.query = query
    }
    setLoading(true)
    Axios.get('http://localhost:5000/harsha', { 
      params: payload
    })
      .then(res => {
        setEmployee(res.data)
        setLoading(false)
      }).catch(error => {
        console.log(error.message);
        setLoading(false)
      })
  }, [addEmployeeModal, page, query, limit])

  return (
    <>
      <AddEmployee open={addEmployeeModal} handleClose={() => setAddEmployeeModal(false)} />

      <Box display='flex' justifyContent='space-between' alignItems='center' margin='1rem' >
        <Box display='flex' alignItems='center'>
          <SearchBar setValue={value => setQuery(value)} />

          <Typography style={{ marginLeft: '0.5rem' }} variant='h5' > Filter: </Typography>
          <FormControl style={{ padding: '0.2rem' }}>
            <NativeSelect
              id="demo-customized-select-native"
              value={limit}
              onChange={(e) => { setLimit(e.target.value)}}
              input={<BootstrapInput />}
            >
              <option aria-label="None" value="" />
              <option value={5}>5</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
            </NativeSelect>

          </FormControl>

        </Box>
        <Button style={{background:'#004D40', color:'white'}} onClick={() => setAddEmployeeModal(true)} variant='contained' >Add Employee</Button>
      </Box>
      {
        <Box padding='1rem 2rem'>
          <EmployeeTable page={page} loading={loading} totalPages={employee?.totalPages} 
          totalResults={employee?.totalResults} limit={limit} setPage={setPage} 
          employee={employee?.data?.map((item, i) => ({ ...item, id: i }))} 
          />
        </Box>
      }
    </>
  )
}

export default HomePage;