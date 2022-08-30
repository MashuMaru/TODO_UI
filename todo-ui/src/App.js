import logo from './logo.svg';
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';

const App = () => {
  const [todoItems, setTodoItems] = useState([])
  useEffect(() => {
    getTodoItems()
  }, [])
  const deleteItem = (e) => {
    axios
      .delete(`https://localhost:7059/api/delete/${e.target.id}`)
      .then(() => {
        getTodoItems()
      })
      .catch(e => {
        console.log(e)
      })
  }
  const getTodoItems = () => {
    axios
      .get('https://localhost:7059/api/all-items')
      .then(response => {
        setTodoItems(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        {todoItems.map(item => (
            <p
              id={item.id}
              key={item.id} 
              onClick={deleteItem}>
              {item.todo}, 
              {!item.isComplete ? 'incomplete' : 'complete'}, 
              {item.created}
            </p>
          ))}
      </header>
    </div>
  );
}

export default App;
