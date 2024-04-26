import './App.css';
import { useState } from 'react';

var count = 0
function App() 
{
  const [editingFlag, setEditingFlag] = useState(-1)
  const [todoList, setTodoList] = useState([
    {
      id: count++,
      todo: "Need to complete Homework",
      completed: false
    },
    {
      id: count++,
      todo: "Need to buy groceries",
      completed: false
    },
    {
      id: count++,
      todo: "Have to fix vehical",
      completed: false
    },
    {
      id: count++,
      todo: "Complete project",
      completed: false
    }
  ])

  const addTodo = () =>
  {
    // console.log("Add todo");
    // console.log("Text readed: ", document.getElementById("input").value);
    
    // console.log("todoList: ", todoList);
    //[] => ['A']
    //[] => ['A', 'B']
    //[] => ['A', 'B', 'C', 'D'] => ['A', 'B', 'C', 'D', 'E']
    //[{id: 0, todo: 'A'}, {id: 1, todo: 'B'}, {id: 2, todo: 'C'}, {id: 3, todo: 'D'}, {id: 4, todo: 'E'}]
    const text = document.getElementById("input").value
    const todoObject = {
      id: count++,
      todo: text,
      completed: false
    }
    setTodoList([...todoList, todoObject])
  }

  const deleteTodo = (id) =>
  {
    console.log("deleteTodo: ", id);
    var tempTodoList = todoList.filter(iterator => 
      {
        return id != iterator.id        
        
        // if(id === iterator.id)
        // {
        //   return false
        // }
        // else
        // {
        //   return true
        // }
      })
    setTodoList([...tempTodoList])
  }

  const completeTodo = (id) =>
  {
    console.log("completeTodo:, ", id);

    var tempTodoList = todoList.map(iterator => 
      {
        if(id === iterator.id)
        {
          iterator.completed = !iterator.completed   
          return iterator  
        }
        else
        {
          return iterator
        }
      })
      setTodoList([...tempTodoList])
  }

  const editTodo = (id) =>
  {
    console.log("editTodo: ", id);
    setEditingFlag(id)
  }

  const saveEditedTodo = () =>
  {
    console.log("saveEditedTodo: ");
    const updatedTodoText = document.getElementById("editingTodo").value
    console.log("updatedTodoText: ", updatedTodoText);
    var tempTodoList = todoList.map(iterator => 
      {
        if(editingFlag == iterator.id)
        {
          iterator.todo = updatedTodoText
          return iterator
        }
        else
        {
          return iterator
        }
      })
    setTodoList(tempTodoList)
    setEditingFlag(-1)
  }

  return (
    <div>
      <h1>Todo Application</h1>
      <h4>(By Aditya Gupta)</h4>

      <input type='text' id='input' placeholder='Enter todo here...'/>
      <button onClick={addTodo}>Add Todo</button>

      <div>
        <ul>
          {todoList.map(iterator => 
              {
                return <li key={iterator.id}>                  
                  { 
                    iterator.completed == true ?
                    <>
                      <input type='checkbox' onChange={()=>completeTodo(iterator.id)} checked/> 
                      <s>{iterator.todo}</s>
                    </> : 
                    <>
                      {editingFlag === iterator.id ? 
                      <>
                        <input type='checkbox' onChange={()=>completeTodo(iterator.id)}/>
                        <input type='text' defaultValue={iterator.todo} id='editingTodo'/>
                        <button onClick={()=>deleteTodo(iterator.id)}>Delete</button>
                        <button onClick={saveEditedTodo}>Save</button>
                      </> :
                      <>
                        <input type='checkbox' onChange={()=>completeTodo(iterator.id)}/>
                        {iterator.todo}
                        <button onClick={()=>deleteTodo(iterator.id)}>Delete</button>
                        <button onClick={()=>editTodo(iterator.id)}>Edit</button>
                      </>}
                    </>
                  }                  
                  </li>
              })
          }
        </ul>
      </div>

    </div>
  );
}

export default App;
