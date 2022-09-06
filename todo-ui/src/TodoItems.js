import { List, ListItem, IconButton, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle'
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

const TodoItems = (props) => {
  const deleteItem = (id) => {
    props.delete(id)
  }
  const setAsComplete = (id) => {
    props.complete(id)
  }
  return (
    <div>
      {props.title &&
      <Typography className='title' align='center' sx={{mt:5}} variant="subtitle2" gutterBottom>
        {props.title}
      </Typography>}
      <List 
        className="list-item" 
        sx={{ width: '100%', mx:'auto', color:'#fff', maxWidth: 360, bgcolor: '#38424a' }}>
          {props.items.map((item) => {
            const labelId = `checkbox-list-label-${item}`;
            return (
              <ListItem
                divider
                key={item.id}
                secondaryAction={
                  <Tooltip arrow title="Delete item">
                    <IconButton 
                      edge="end"
                      aria-label="delete" 
                      onClick={() => deleteItem(item.id)}>
                      <DeleteIcon color='error' />
                    </IconButton>
                  </Tooltip>
                }
                disablePadding>
                <ListItemButton role={undefined} dense>
                  {!item.isComplete && 
                    <Tooltip arrow title="Mark as complete">
                      <IconButton 
                        edge="center"
                        aria-label="complete" 
                        onClick={() => setAsComplete(item.id)}>
                      <CheckCircle htmlColor='#DAF7A6'/>
                      </IconButton>
                    </Tooltip>}
                  <ListItemText sx={{ml:2}} id={labelId} primary={item.todo} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </div>
  )
}

export default TodoItems;