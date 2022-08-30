import { useEffect, useState } from 'react'
import './App.css';
import ApiRequests from './ApiRequests';

const App = () => {
  const [todoItems, setTodoItems] = useState([])
  useEffect(() => {
    ApiRequests.getTodoItems()
      .then(response => {
        setTodoItems(response.data)
      })
  }, [])

  const deleteItemHandler = (e) => {
    ApiRequests.deleteItem(e.target.id)
      .then(() => {
        ApiRequests.getTodoItems()
          .then(response => {
            setTodoItems(response.data)
          })
      })
  }
  return (
    <div className="App">
      {todoItems.map(item => (
          <p
            id={item.id}
            key={item.id} 
            onClick={deleteItemHandler}>
            {item.todo} 
            {!item.isComplete ? ' incomplete' : ' complete'},  
            {item.created}
          </p>
        ))}
    </div>
  );
}

export default App;
