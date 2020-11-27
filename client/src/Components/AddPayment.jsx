import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomModal from './Modal';
import Form from './Form';
import { Button, TextField, Typography } from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: '#fff',
  }
}));

export default function AddPayment({ open, handleClose }) {
  const classes = useStyles();
  const dateObj = new Date()
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  const newDate = year + "-" + month + "-" + day;
  const [date, setDate] = useState(newDate)
  const [amount, setAmount] = useState(0)

  const addPayment = () => {
    let payload = {
      id: window.localStorage.getItem('employeeId'),
      date: date,
      amount: amount
    }
    Axios.post('http://localhost:5000/harsha/addPayment', payload)
      .then(res => {
        console.log('Payment Added')
        handleClose()
      })
      .catch((error) => console.log(error.message))
  }

  return (
    <CustomModal open={open} handleClose={handleClose} >
      <Form className={classes.form} onSubmit={addPayment} >
        <Typography variant='h4' align='center' >Add Payment</Typography>
        <TextField label='amount' value={amount} name="amount" onChange={(e) => { setAmount(e.target.value) }} type='number' min={1} max={100} placeholder='Enter student amount here!' variant='outlined' required />
        <TextField label='date' value={date} name="date" onChange={(e) => { setDate(e.target.value) }} type='date' placeholder='Enter test date!' variant='outlined' required />
        <Button variant='contained' style={{background:'#FFA726', color:'white'}} type='submit'>Add</Button>
        <Button variant='contained' color='default' onClick={handleClose}>Cancel</Button>
      </Form>
    </CustomModal>
  );
}