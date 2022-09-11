import { useEffect, useState } from 'react'
import axios from 'axios'
import TodoItems from './TodoItems'
import './App.css';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop';
import CreateNewItem from './CreateNewItem';
import { useSnackbar } from 'notistack';

const App = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [todoItems, setTodoItems] = useState([])
  const [completeItems, setCompleted] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    getTodoItems()
  }, [])
  const getTodoItems = () => {
    axios
    .get('https://localhost:7059/api/all-items')
    .then(response => {
      setTodoItems(response.data.filter(x => !x.isComplete))
      setCompleted(response.data.filter(x => x.isComplete))
    })
    .catch(e => {
      enqueueSnackbar(e.message, { variant: 'error' });
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
      enqueueSnackbar(response.data, { variant: 'success' });
      getTodoItems()
    })
    .catch(e => {
      enqueueSnackbar(e.message, { variant: 'error' });
    })
  }
  const setAsCompleteHandler = (id) => {
    setLoading(true)
    axios
    .patch(`https://localhost:7059/api/complete/${id}`)
    .then(response => {
      enqueueSnackbar(response.data, { variant: 'success' });
      getTodoItems()
    })
    .catch(e => {
      enqueueSnackbar(e.message, { variant: 'error' });
    })
  }
  const addNewTodoItem = (newItem) => {
    const newTodo = {
      todo: newItem
    };
    setLoading(true)
    axios
    .post('https://localhost:7059/api/create', newTodo)
    .then(response => {
      enqueueSnackbar(response.data, { variant: 'success' });
      getTodoItems()
    })
    .catch(e => {
      enqueueSnackbar(e.message, { variant: 'error' });
    })
    .finally(() => {
      setLoading(false)
    })
  }
  return (
    <div className='App'>
      <Typography className="title" align='center' sx={{mt:5}} variant="h6" gutterBottom>
        Small Todo App (Full-stack)
      </Typography>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress />
      </Backdrop>
      <CreateNewItem
        newTodoItem={addNewTodoItem} />
      {!todoItems.length && 
      <Typography className="title" align='center' sx={{mt:5}} variant="subtitle2" gutterBottom>
        No items available. Maybe add?
      </Typography>}
      {todoItems.length > 0 && 
      <TodoItems 
        title="Current"
        items={todoItems} 
        delete={deleteItemHandler}
        complete={setAsCompleteHandler}
        />}
      {completeItems.length > 0 && 
      <TodoItems
        title="Completed"
        sx={{mt:5}}
        delete={deleteItemHandler}
        items={completeItems} 
        />}
    </div>
  );
}

export default App;
