import { useEffect, useState } from 'react'
import TodoItems from './TodoItems'
import './App.css';
import ApiRequests from './ApiRequests';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop';

const App = () => {
  const [todoItems, setTodoItems] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true)
    ApiRequests.getTodoItems()
      .then(response => {
        setTodoItems(response.data)
        setLoading(false)
      })
  }, [])

  const deleteItemHandler = (e) => {
    setLoading(true)
    ApiRequests.deleteItem(e.target.id)
      .then(() => {
        ApiRequests.getTodoItems()
          .then(response => {
            setTodoItems(response.data)
            setLoading(false)
          })
      })
  }
  const setAsCompleteHandler = (e) => {
    console.log(e.target.id)
  }
  return (
    <div className="App">
      <Typography sx={{mt:5}} variant="h6" gutterBottom>
        Small Todo App (Full-stack)
      </Typography>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress />
      </Backdrop>
      <TodoItems 
        items={todoItems} 
        delete={deleteItemHandler}
        complete={setAsCompleteHandler}
        />
    </div>
  );
}

export default App;
