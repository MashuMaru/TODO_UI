import { List, ListItem, IconButton, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle'

const TodoItems = (props) => {
  const deleteItem = (e) => {
    props.delete(e.target.id)
  }
  const setAsComplete = (e) => {
    props.complete(e.target.id)
  }
  return (
    <List sx={{ width: '100%', mt:5, mx:'auto', maxWidth: 360, bgcolor: 'background.paper' }}>
        {props.items.map((value) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem
              disabled={value.isCompleted}
              divider
              key={value.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
                  <DeleteIcon color='error' />
                </IconButton>
              }
              disablePadding>
              <ListItemButton role={undefined} dense>
                <CheckCircle color='primary' onClick={setAsComplete}/>
                <ListItemText id={labelId} primary={value.todo} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
  )
}

export default TodoItems;