import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useState } from 'react';

const CreateNewItem = (props) => {
  const [todoItem, setTodoItem] = useState('');
  const [error, setError] = useState(false);
  const handleInput = (e) => {
    setTodoItem(e.target.value);
    setError(false);
  }
  const inputIsValid = () => {
    if (!todoItem.length) {
      setError(true)
      return false
    } else {
      setError(false)
      return true
    }
  }
  const emitNewTodoItem = () => {
    if (!inputIsValid()) {
      return
    }
    props.newTodoItem(todoItem)
    setTodoItem('');
  }
  return (
    <>
      <TextField
        className="inputClass"
        startAdornment={
          <InputAdornment position="start">
            <AddIcon />
          </InputAdornment>
        }
        type="text"
        value={todoItem}
        onChange={handleInput}
        helperText={error && 'Provide todo entry.'}
        error={error}
        sx={{ mt:2, mb:1, maxWidth: 360, width: '100%', mx:'auto' }}
        color="success"
        id="new-todo-item-input" 
        label="Add new item" 
        variant="outlined" />
      <Button   
        sx={{ maxWidth: 360, width: '100%', mx:'auto' }} 
        color="success"
        variant="contained" 
        size="large"
        id="new-todo-item-button"
        onClick={emitNewTodoItem}
        endIcon={<AddIcon />}>
        Add
      </Button>
    </>
  )
}

export default CreateNewItem;