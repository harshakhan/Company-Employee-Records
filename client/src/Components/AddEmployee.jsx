import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomModal from './Modal';
import Form from './Form';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    form: {
        backgroundColor: '#fff',
    }
}))

export default function AddEmployee({ open, handleClose }) {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [gender, setGender] = useState('')
    const [joining_date, setJoinDate] = useState(23)

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeDepartment = (e) => {
        setDepartment(e.target.value)
    }

    const handleChangeGender = (e) => {
        setGender(e.target.value)
    }

    const handleChangeJoinDate = (e) => {
        setJoinDate(e.target.value)
    }

    const addStudent = () => {
        let payload = {
            name: name,
            department: department,
            gender: gender,
            joining_date: joining_date,
        }
        Axios.post('http://localhost:5000/harsha', payload)
            .then((data) => {
                console.log('Employee Added');
                handleClose()
            })
            .catch((error) => console.log(error.message))
    }

    return (
        <CustomModal open={open} handleClose={handleClose} >
            <Form className={classes.form} onSubmit={addStudent} >
                <Typography variant='h4' align='center' >Add Employee</Typography>
                <TextField label='Name' value={name} name="name" onChange={handleChangeName} type='text' placeholder='Enter student name here!' variant='outlined' required />
                <TextField label='Department' value={department} name="department" onChange={handleChangeDepartment} type='text' placeholder='Enter student grade here!' variant='outlined' required />
                <FormControl variant='outlined' >
                    <InputLabel id='gender-selector' htmlFor='gender'>Gender </InputLabel>
                    <Select label='Gender' id='gender' value={gender} labelId='gender-selector' name="gender" onChange={handleChangeGender} placeholder='Enter student gender here!' variant='outlined' required >
                        <MenuItem value={'M'}>Male</MenuItem>
                        <MenuItem value={'F'}>Female</MenuItem>
                        <MenuItem value={'O'}>Others</MenuItem>
                    </Select>
                </FormControl>
                <TextField label='Joining Date' value={joining_date} name="age" onChange={handleChangeJoinDate} type='number' min={1} max={150} placeholder='Enter date name here!' variant='outlined' required />
                {/* <TextField value={joining_date} name="age" onChange={handleChangeJoinDate} type='date'  variant='outlined' required /> */}
                <Button variant='contained' color='secondary' type='submit'>Add</Button>
                <Button variant='contained' color='default' onClick={handleClose}>Cancel</Button>
            </Form>
        </CustomModal>
    );
}