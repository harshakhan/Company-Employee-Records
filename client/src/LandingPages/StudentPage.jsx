import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import PaymentCard from '../Components/PaymentCard';
import AddPayment from '../Components/AddPayment';
import { Box, Button, CircularProgress } from '@material-ui/core';
import Axios from 'axios'

const StudentPage = () => {
  const { id } = useParams()
  const [student, setStudent] = useState({})
  const [testModal, setTestModal] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    Axios.get(`http://localhost:5000/harsha/${id}`)
      .then((res) => {
        setStudent(res.data);
        setLoading(false)
      })
      .catch(error => {
        console.log(error.message);
        setLoading(false)
      })
  }, [testModal, id])

  console.log(student);
  return (
    <>
      <AddPayment open={testModal} {...student} handleClose={() => setTestModal(false)} />

      <Box display='flex' justifyContent='flex-end' margin='1rem' >
        <Button color='secondary' onClick={() => setTestModal(true)} variant='contained' >Add Test</Button>
      </Box>
      <Box display='flex' justifyContent="center" >
        {loading && <CircularProgress />}
      </Box>
      {student && student.length > 0 && student?.map(test => <PaymentCard key={test._id} {...test} />)}
    </>
  )
}

export default StudentPage;