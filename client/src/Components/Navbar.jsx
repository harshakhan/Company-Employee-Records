import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/action';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    '& a': {
      textDecoration: 'none',
      color: 'white'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { auth, name } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <div className={classes.root}>
      <AppBar style={{backgroundColor: "#FFA726"}} position="static">
        <Toolbar>
          <Typography variant="h6" style={{color:'black'}} className={classes.title}>
          Company Employee Records
          </Typography>
          {
            auth ? (<>
              <Typography variant='body1' style={{color:'black'}}> {name}</Typography>
              <Button onClick={() => dispatch(logout())} color="black">Logout</Button>
            </>) :
              (<>
                <Link to='/login'>
                  <Button color="black">Login</Button>
                </Link>
              </>)
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}