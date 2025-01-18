import React, {useState} from 'react';

export default function TodoList(){

    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    function handleNewTask(event){
        setTask(() => event.target.value);
    }

    function handleAddTask(){
        if(task.trim() !== ""){
            setTodos(t => [...t, task]);
            setTask(() => "");
        }
    }

    function handleKeyPress(event){
        if(event.key === "Enter"){
            handleAddTask();
        }
    }

    function handleDeleteTask(index){
        setTodos(t => t.filter( (todo,i) => i!==index));
    }

    function handleMoveUpTask(index){
        if(index > 0){
            const newTodos = [...todos];
            [newTodos[index], newTodos[index-1]] = [newTodos[index-1], newTodos[index]];
            setTodos(() => newTodos);
        }
    }

    function handleMoveDownTask(index){
        if(index < todos.length-1){
            const newTodos = [...todos];
            [newTodos[index], newTodos[index+1]] = [newTodos[index+1], newTodos[index]];
            setTodos(() => newTodos);
        }
    }

    const todosList = todos.map((todo,index) => <li key={index} >
                                                    <span className="text">{todo}</span> 
                                                    &nbsp;
                                                    <button className="delete-button" onClick={() => handleDeleteTask(index)}>Delete</button>
                                                    &nbsp;
                                                    <button className="move-button" onClick={() => handleMoveUpTask(index)}>⬆️</button>
                                                    &nbsp;
                                                    <button className="move-button" onClick={() => handleMoveDownTask(index)}>⬇️</button>
                                                    &nbsp;
                                                </li>)

    return (
        <div className="to-do-list">
            <h1>My To-do List</h1>
            <input type="text" value={task} placeholder="Add new task" onChange={handleNewTask} onKeyDown={handleKeyPress}/>
            <button className="add-button" onClick={handleAddTask}>Add</button>
            <ol>{todosList}</ol>
        </div>
    )
}