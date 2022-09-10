import { useEffect, useState } from 'react'
import axios from 'axios'
import TodoItems from './TodoItems'
import './App.css';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const App = () => {
  const [todoItems, setTodoItems] = useState([])
  const [completeItems, setCompleted] = useState([])
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ active: false, message: null });

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    setLoading(true)
    getTodoItems()
  }, [])
  const closeNotification = () => {
    setNotification({
      active: false,
      message: null
    })
  }
  const getTodoItems = () => {
    axios
    .get('https://localhost:7059/api/all-items')
    .then(response => {
      setTodoItems(response.data.filter(x => !x.isComplete))
      setCompleted(response.data.filter(x => x.isComplete))
    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => {
      setLoading(false)
    })
  }
  const deleteItemHandler = (id) => {
    setLoading(true)
    axios
    .delete(`https://localhost:7059/api/delete/${id}`)
    .then(response => {
      setNotification({
        active: true,
        message: response.data
      })
      setTimeout(() => {
        closeNotification()
      }, 5000)
      getTodoItems()
    })
    .catch(e => {
      console.log(e)
    })
  }
  const setAsCompleteHandler = (id) => {
    setLoading(true)
    axios
    .patch(`https://localhost:7059/api/complete/${id}`)
    .then(response => {
      setNotification({
        active: true,
        message: response.data
      })
      setTimeout(() => {
        closeNotification()
      }, 5000)
      getTodoItems()
    })
    .catch(e => {
      console.log(e)
    })
  }
  const stateTodoItems = (
    <TodoItems 
      title="Current"
      items={todoItems} 
      delete={deleteItemHandler}
      complete={setAsCompleteHandler}
      />
  )
  const stateCompletedItems = (
    <TodoItems
      title="Completed"
      sx={{mt:5}}
      delete={deleteItemHandler}
      items={completeItems} 
      />
  )
  return (
    <div className='App'>
      <Snackbar open={notification.active} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
      <Typography className="title" align='center' sx={{mt:5}} variant="h6" gutterBottom>
        Small Todo App (Full-stack)
      </Typography>
      <Typography className="title" align='center' sx={{mt:5}} variant="subtitle2" gutterBottom>
        {!todoItems.length ? 'No items available. Try adding?' : void 0}
      </Typography>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress />
      </Backdrop>
      {todoItems.length > 0 && stateTodoItems}
      {completeItems.length > 0 && stateCompletedItems}
    </div>
  );
}

export default App;
