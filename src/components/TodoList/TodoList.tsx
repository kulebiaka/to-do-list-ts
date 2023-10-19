import React, { useState } from 'react'
import Task from '../Task/Task';
import s from './TodoList.module.scss'

type status = 'pending' | 'done' | 'editing' 

interface Item{
  id: number;
  text: string;
  status: status;
}

let initialState: Array<Item> = [{id:0, text:'Your first task', status:'pending'}]


const TodoList = () => {

  let [input, setInput] = useState('')
  let [taskList, setTaskList] = useState(initialState)

  function onInputChacnge(e:any){
    setInput(e.target.value)
  }

  function removeTask(id:number){
    setTaskList(
      taskList.filter((t : Item) => (t.id != id))
    )
  }
  
  function onAddTaskClick(){  
    let newTask: Item ={
      id: taskList.length-1,
      text: input,
      status: 'pending'
    }
    setTaskList(taskList => [...taskList, newTask])
  }

  return(
    <div>
      <h1>ToDo List</h1>
      <input placeholder='Write some text' value={input} onChange={onInputChacnge}/>
      <button onClick={onAddTaskClick}>add</button>
      <h2>List of Tasks</h2>
      <div>
        {taskList.map((t : Item) => (<Task key={t.id} id={t.id} text={t.text} 
        status={t.status} task={t} removeTask={removeTask}
        />))}
      </div>
    </div>
  )
}

export default TodoList;