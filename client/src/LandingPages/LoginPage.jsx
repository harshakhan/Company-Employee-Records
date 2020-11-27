import React, { useState } from 'react';
import Form from '../Components/Form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/action';
import { Box } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  
  const dispatch = useDispatch()
  
  const handleLogin = e => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }
  
  const { error, message, auth } = useSelector(state => state.auth)
  const getError = (name) => {
    if (error && message?.includes(name)) {
      return message
    }
    return ''
  }

  if (auth) return <Redirect to='/' />

  return (
    <>
    <div style={{display:"flex", boxShadow:'5px 10px 8px 10px #888888',margin:'auto', marginTop:'5%', width:'70%', padding:'20px', borderRadius:'15px'}}>
      <div style={{marginTop:'8%'}}>
        <Form onSubmit={handleLogin} >
          <Typography align='center' variant='h3' > Login </Typography>
          <TextField label='Email' value={email} onChange={e => setEmail(e.target.value)} error={Boolean(getError('email'))} helperText={getError('email')} type='email' placeholder='Enter your email here!' variant='outlined' required />
          <TextField label='Password' value={password} error={Boolean(getError('password'))} 
            helperText={getError('password')} onChange={e => setPassword(e.target.value)} 
            type='password' placeholder='Enter your password here!' variant='outlined' required />
          <Button variant='contained' style={{background:'#FFA726', color:'white'}} onClick={handleLogin}>Login</Button>
          <Box marginTop='2rem' paddingTop='2rem' borderTop='1px solid #c4c4c4'>
            <Button variant='contained' fullWidth color='inherit' onClick={() => history.push('/register')}>Register Here</Button>
          </Box>
        </Form>
      </div >
      <div style={{ marginLeft:'5%'}}>
        <img style={{width:'600px', height:'400px', margin:'120px 40px'}} src="/logo3.svg" alt="logo"/>

      </div>
    </div>
    </>
  )
}

export default LoginPage;