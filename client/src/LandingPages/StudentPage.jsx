import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import PaymentCard from '../Components/PaymentCard';
import AddPayment from '../Components/AddPayment';
import { Box, Button, CircularProgress } from '@material-ui/core';
import Axios from 'axios'

const EmployeePage = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState({})
  const [paymentModal, setPaymentModal] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    Axios.get(`http://localhost:5000/harsha/${id}`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false)
      })
      .catch(error => {
        console.log(error.message);
        setLoading(false)
      })
  }, [paymentModal, id])

  console.log(employee);
  return (
    <>
      <AddPayment open={paymentModal} {...employee} handleClose={() => setPaymentModal(false)} />

      <Box display='flex' justifyContent='flex-end' margin='1rem' >
        <Button color='secondary' onClick={() => setPaymentModal(true)} variant='contained' >Add Payments</Button>
      </Box>
      <Box display='flex' justifyContent="center" >
        {loading && <CircularProgress />}
      </Box>
      {employee && employee.length > 0 && employee?.map(test => <PaymentCard key={test._id} {...test} />)}
    </>
  )
}

export default EmployeePage;