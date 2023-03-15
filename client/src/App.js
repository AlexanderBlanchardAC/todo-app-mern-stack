import { useState, useEffect } from 'react';


const API_BASE = 'http://localhost:3002'

function App() {

  

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [popupActive, setPopupActive] = useState(false);
  

    useEffect(() => {
         GetTodos();

         console.log(todos)
    }, [])

    const GetTodos = () => {
        fetch(API_BASE + '/todos')
        .then(res => res.json())
        .then(data => setTodos(data))
        .catch(error => console.error("Error: ", error))
    }

    const completeTodo = async (id) => {
        const data = await fetch(API_BASE + '/todo/complete/' + id)
            .then(res => res.json())

        setTodos(todos => todos.map(todo => {
            if(todo._id === data._id){
                todo.complete = data.complete
               
                
            }
            return todo
        }))


    }

    const addTodo = async () => {
        const data = await fetch(API_BASE + '/todo/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: newTodo
            })
        }).then(res => res.json())
            setTodos([...todos, data])
            setPopupActive(false)
            setNewTodo('')
    }

    const deleteTodo = async (id) => {
        const data = await fetch(API_BASE + '/todo/delete/' + id, { method: 'DELETE'
    }).then(res => res.json())

        setTodos(todos => todos.filter(todo => todo._id !== data._id))
    }

  
   
        

	return (
		<div className="App">
			<h2 className="title">Alexander,</h2>
            <h5>Your List:</h5>
            <div className="todos">
                {todos.length > 0 ? todos.map(todo => (  
                    
                    
                     <div className={'todo ' + (todo.complete ? 'isComplete' : '')} key={todo._id} onClick={() => completeTodo(todo._id)}>
                         <div className="checkbox"></div>
                        <div className="text">{todo.text}</div>
                         <div className="deleteTodo" onClick={() => deleteTodo (todo._id)}>X</div>
                     </div>
                )) : (
                    <div className='noTodos'>Your list is clear!</div>
                )}
               
                


            </div>

            <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

            {popupActive ? (
                <div className='popup'>
                    <div className='closePopup' onClick={() => setPopupActive(false)}>X</div>
                    <div className='content'>
                        <h4 className='popUpText'>Add Task</h4>
                        
                        <input type='text' className='addTodoInput' onChange={e =>setNewTodo(e.target.value)} value={newTodo}/>
                        <div className='button' onClick={addTodo}>Add Task</div>
                    </div>
                </div>
            ): ''}
		</div>
	);
}

export default App;
