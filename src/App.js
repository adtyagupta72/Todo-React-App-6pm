import './App.css';
import { useState } from 'react';
import TodoListItem from './TodoListItem';
import MyHeader from './MyHeader';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

var count = 0
const COMPLETED = "COMPLETED"
const INCOMPLETED = "INCOMPLETED"
const ALL = "ALL"
var countOfTodos = 0

function App() 
{
  const [editingFlag, setEditingFlag] = useState(-1)
  const [filter, setFilter] = useState(INCOMPLETED)
  const [modalShow, setModalShow] = useState(false)
  const [todoList, setTodoList] = useState([
    {
      id: count++,
      todo: "Need to complete Homework",
      completed: false
    },
    {
      id: count++,
      todo: "Need to buy groceries",
      completed: true
    },
    {
      id: count++,
      todo: "Have to fix vehical",
      completed: false
    },
    {
      id: count++,
      todo: "Complete project",
      completed: true
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

  const filterTodo = (action) =>
  {
    console.log("filterTodo: ", action);
    switch (action) 
    {
      case INCOMPLETED:
        setFilter(INCOMPLETED)
        break;
      case COMPLETED:
        setFilter(COMPLETED)
        break;
      case ALL:
        setFilter(ALL)
        break;
      default:
        break;
    }
  }

  const setFilterUI = () =>
  {
    switch (filter) 
    {
      case INCOMPLETED:
        return  <div className='filterContainer'>
                  <label className='filter-label-selected' onClick={()=>filterTodo(INCOMPLETED)}>Incomplete</label>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                  <label onClick={()=>filterTodo(COMPLETED)}>Completed</label>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                  <label onClick={()=>filterTodo(ALL)}>All</label>
                </div>
        break;
      case COMPLETED:
        return  <div className='filterContainer'>
                  <label onClick={()=>filterTodo(INCOMPLETED)}>Incomplete</label>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                  <label className='filter-label-selected' onClick={()=>filterTodo(COMPLETED)}>Completed</label>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                  <label onClick={()=>filterTodo(ALL)}>All</label>
                </div>
        break;
      case ALL:
        return  <div className='filterContainer'>
                  <label onClick={()=>filterTodo(INCOMPLETED)}>Incomplete</label>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                  <label onClick={()=>filterTodo(COMPLETED)}>Completed</label>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                  <label className='filter-label-selected' onClick={()=>filterTodo(ALL)}>All</label>
                </div>
        break;
      default:
        break;
    }
  }

  return (
    <div >
      <MyHeader/>
      <h4 className='subHeading'>(By Aditya Gupta)</h4>
      
      {setFilterUI()}

      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>

      <input type='text' id='input' placeholder='Enter todo here...'/>
      <button onClick={addTodo}>Add Todo</button>
      <div>
        <ul className='listStyle'>
          {
            todoList.map(iterator =>
              {
                if(todoList[0].id === iterator.id)
                  countOfTodos = 0
                switch(filter)
                {
                  case INCOMPLETED:
                  {
                    if(!iterator.completed)
                    {
                      countOfTodos +=1
                      //setCountOfTodos(countOfTodos+1)                      
                      return <TodoListItem 
                                iterator={iterator}
                                completeTodo={completeTodo}
                                editingFlag={editingFlag}
                                deleteTodo={deleteTodo}
                                saveEditedTodo={saveEditedTodo}
                                editTodo={editTodo}/>
                    }
                    break;
                  }
                  case COMPLETED:
                    {
                      if(iterator.completed)
                      {
                        countOfTodos +=1
                        //setCountOfTodos(countOfTodos+1)
                        return <TodoListItem
                                  iterator={iterator}
                                  completeTodo={completeTodo}
                                  editingFlag={editingFlag}
                                  deleteTodo={deleteTodo}
                                  saveEditedTodo={saveEditedTodo}
                                  editTodo={editTodo}/>
                      }
                      break;
                    }
                  case ALL:
                    {
                      countOfTodos +=1
                      //setCountOfTodos(countOfTodos+1)
                      return <TodoListItem
                                  iterator={iterator}
                                  completeTodo={completeTodo}
                                  editingFlag={editingFlag}
                                  deleteTodo={deleteTodo}
                                  saveEditedTodo={saveEditedTodo}
                                  editTodo={editTodo}/>
                      break;
                    }
                  default:
                }                
              })
          }
        </ul>
      </div>
      <div>
        Count: {countOfTodos}
      </div>
    </div>
  );
}

function MyVerticallyCenteredModal(props) 
{
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New To-do
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        {/* <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> */}
        <textarea rows={2} cols={50} placeholder='Add to-do here'/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Add</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default App;
