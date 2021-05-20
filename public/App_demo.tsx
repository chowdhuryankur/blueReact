import React,{useState,useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormHelperText from '@material-ui/core/FormHelperText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const[userData,setuserData] = useState([]);
  const[taskData,settaskData] = useState([]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  fetch('api/users')
  .then(response => response.json())
  .then(data => { console.log(data)
                  setuserData(data.users)
  });

  fetch('api/todos')
  .then(response => response.json())
  .then(data => { console.log(data) 
                  settaskData(data.todos)
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">

          <div className={classes.root}>
            
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <TextField id="projectName" label="Project Name" />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <InputLabel id="select-label">User</InputLabel>
                  <Select
                    labelId="select-label"
                    id="simple-select">
                    {userData.map((ro) => (
                      <MenuItem value={ro.id}>{ro.firstName} {ro.lastName}</MenuItem>
                    ))}
                  </Select>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <FormControlLabel control={<Switch checked={state.checkedA}  onChange={handleChange} name="checkedA" />} label="Completed" />
                </Paper>
              </Grid>
            </Grid>
         
           <div className="separetor">
              
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Project Name</b></TableCell>
                      <TableCell><b>User</b></TableCell>
                      <TableCell><b>Status</b></TableCell>
                      <TableCell><b>Action</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taskData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell>{row.user}</TableCell>
                        <TableCell>{row.isComplete}</TableCell>
                        <TableCell align="right">{row.id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
           </div>

          <Button style={{color: "blue", float: "right"}} size="small" variant="outlined">Add Task</Button>
         </div>

        </div>
      </header>
    </div>
  );
}

export default App;
