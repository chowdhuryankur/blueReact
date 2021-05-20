import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  const [state,setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [userData,setuserData] = useState([]);
  const [taskData,settaskData] = useState([]);
  const [usr,setSelectusr] = useState();
  const [open,setOpen] = useState(false);
  const [pName,setpName] = useState();
  const [uName,setuName] = useState();
  //const [UserData,setUserData] = useState();
  const [proStatus,setproStatus] = useState({
    checkedA: true,
    checkedB: true,
  });

  const selectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const unpstData = (event) => {
    setuName(event.target.value);
  }

  const propstData = (event) => {
    setpName(event.target.value);
  }

  const cngproStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setproStatus({ ...proStatus, [event.target.name]: event.target.checked });
  }

  useEffect(()=>{
      axios.get('api/todos')
        .then(res=> {
            console.log(res.data.todos)
            settaskData(res.data.todos) 
        })
        .catch(err=>{
            console.log(err)
        })
  },[])

  useEffect(()=>{
      axios.get('api/users')
        .then(res=> {
            console.log(res.data.users)
            setuserData(res.data.users) 
        })
        .catch(err=>{
            console.log(err)
        })
  },[])

  const getUserData = (e) => {
      axios.get('api/user/' + e)
      .then(res=> {
      const UserData = res.data.user.firstName+' '+ res.data.user.lastName
      console.log(UserData);
      //setUserData(UserData);
      })
  }
    
 const searchUsr = (e) => {
    axios.get('api/user/' + e.target.value +'/todos')
      .then(res=> {
          console.log(res)
          //settaskData(res.data) 
      })
      .catch(err=>{
          console.log(err)
      })
 }

 const searchName = (e) => {
    if(e.target.value.length > 0)
    {
      const searchData = taskData.filter(task => task.name.includes(e.target.value));
      settaskData(searchData)
    }
    else
    {
      axios.get('api/todos')
        .then(res=> {
            settaskData(res.data.todos) 
        })
    }
    
 }

 const editTask = (e) => {
    alert(e);
 }
 const saveTask = () => {
    axios.post('api/todo/create', {
      isComplete: proStatus.checkedA,
      name: pName,
      user: Number(uName)
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
 }
 const deleteTask = (e) => {
    fetch('api/todo/' + e +'/delete', {
          method: 'DELETE',
          mode: 'CORS'
      }).then(res => res)

    axios.get('api/todos')
        .then(res=> {
            console.log(res.data.todos)
            settaskData(res.data.todos) 
    })
 }
  
 const handleClickOpen = () => {
    setOpen(true);
 };

 const handleClose = () => {
    setOpen(false);
 };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">

          <div className={classes.root}>
            
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  Project Name: <input type='text' onChange={searchName} />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <select name="users" onChange={searchUsr}>
                    <option value={0}>Select User</option>
                    {userData.map((ro) => (
                        <option key={ro.id} value={ro.id}>{ro.firstName} {ro.lastName}</option>
                    ))}
                  </select>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <Switch
                    checked={state.checkedA}
                    onChange={selectChange}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  /> Completed
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
                    {taskData && taskData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell>{row.user}</TableCell>
                        <TableCell>{row.isComplete ? 'Completed' : 'Pending'}</TableCell>
                        <TableCell align="right">
                          <a onClick={() => editTask(row.id)}>Edit</a> |&nbsp;
                          <a onClick={() => deleteTask(row.id)}>Delete</a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
           </div>

          <Button onClick={handleClickOpen} style={{color: "blue", float: "right"}} size="small" variant="outlined">Add Task</Button>
         </div>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <form>
        <DialogTitle id="alert-dialog-title">{"Add Task to User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
              <Grid container spacing={3}>
                <TextField id="projectNamemm" onChange={propstData} name="projectNamem" label="Project Name" />
                
                <select name="postSelect" onChange={unpstData}>
                  <option value={0}>Select User</option>
                  {userData.map((ro) => (
                      <option key={ro.id} value={ro.id}>{ro.firstName} {ro.lastName}</option>
                  ))}
                </select>

                <Switch
                    checked={proStatus.checkedA}
                    onChange={cngproStatus}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                /> Completed
              </Grid>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={saveTask} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
        </form>
       </Dialog>

       </div>
      </header>
    </div>
  );
}

export default App;
