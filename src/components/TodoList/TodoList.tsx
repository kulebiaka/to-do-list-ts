import React, { useState, useId } from 'react'
import Task from '../Task/Task';
import s from './TodoList.module.scss'

interface Item {
  id: number;
  text: string;
  isDone: boolean;
  isEditing: boolean;
  date: any;
}


const TodoList = () => {

  let initialState: Array<Item> = [{ id: 0, text: 'Your first task', isDone: false, isEditing: false, date: Date.now()}]

  let [input, setInput] = useState('')
  let [taskList, setTaskList] = useState(initialState)
  let [nextId, setNextId] = useState(1);
  console.log(taskList)

  function sortTaskList() {
    setTaskList(taskList => [...taskList].sort((a, b) => {
      if (a.isDone > b.isDone) {
        return 1
      } else if (a.isDone < b.isDone) {
        return -1;
      }
      return b.date - a.date
    }))
    console.log(taskList)
  }

  function changeStatusEdit(id: number) {
    setTaskList(taskList.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          isEditing: !t.isEditing
        }
      } else {
        return t
      }
    }))
  }

  function changeStatusDone(id: number) {
    setTaskList(taskList.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          isDone: !t.isDone
        }
      } else {
        return t
      }
    }))
    sortTaskList()
  }

  function editTaskText(id: number, text: string) {
    setTaskList(taskList.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          text: text
        }
      } else {
        return t
      }
    }))
  }

  function onInputChange(e: any) {
    setInput(e.target.value)
  }

  function removeTask(id: number) {
    setTaskList(
      taskList.filter((t: Item) => (t.id != id))
    )
  }
  function onAddTaskKeypress(e: any) {
    // if(e.keyCode === 13) {  
    //   onAddTaskClick()
    //   console.log(input)
    //   setInput('')
    //   console.log(input)

    // }
  }
  function onAddTaskClick() {
    debugger;
    let newTask: Item = {
      id: nextId,
      text: input,
      isDone: false,
      isEditing: false,
      date: Date.now()
    }
    setNextId(nextId + 1)
    setTaskList(taskList => [newTask, ...taskList])
    setInput('')
    sortTaskList();
  }

  return (
    <div>
      <h1>ToDo List</h1>
      <div className={s.form}>
        <textarea className={s.add_input} placeholder='Write some text' value={input} onKeyDown={onAddTaskKeypress} onChange={onInputChange} />
        <button className={s.add_btn} onClick={onAddTaskClick}>Add</button>
      </div>
      <h2>List of Tasks</h2>
      {/* <div>
        <div>
          <input type="checkbox" className={s.checkbox_all} />
          <span>All</span>
        </div>
        <div>
          <select name="" id=""></select>
          <select name="" id=""></select>
        </div>
      </div> */}
      <div>
        {taskList.map((t: Item) => (<Task key={t.id} id={t.id} text={t.text}
          task={t} removeTask={removeTask} sortTaskList={sortTaskList} setTaskList={setTaskList}
          changeStatusEdit={changeStatusEdit} editTaskText={editTaskText}
          changeStatusDone={changeStatusDone}
        />))}
      </div>
    </div>
  )
}

export default TodoList;