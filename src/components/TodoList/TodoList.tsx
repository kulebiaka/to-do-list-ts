import React, { useState, useId } from 'react'
import Task from '../Task/Task';
import s from './TodoList.module.scss'
import { link } from 'fs';

interface Item {
  id: number;
  text: string;
  isDone: boolean;
  isEditing: boolean;
  isSelected: boolean;
  date: any;
}


const TodoList = () => {

  let initialState: Array<Item> = [{ id: 0, text: 'Your first task', isDone: false, isEditing: false, isSelected: false, date: Date.now() }]

  let [input, setInput] = useState('')
  let [taskList, setTaskList] = useState(initialState)
  let [nextId, setNextId] = useState(1);
  let selectedQuantity = (taskList.reduce((acc, t: Item) => { return t.isSelected ? acc + 1 : acc }, 0))
  let isSelectedAll = ((taskList.length > 0) && (selectedQuantity === taskList.length))
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

  function changeStatusSelected(id: number) {
    setTaskList(taskList.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          isSelected: !t.isSelected
        }
      } else {
        return t
      }
    }))
    sortTaskList()
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

  function selectAllTask(e: any) {
    if (e.target.checked === true) {
      setTaskList(
        taskList.map((t: Item) => {
          return { ...t, isSelected: true }
        })
      )
    } else {
      setTaskList(
        taskList.map((t: Item) => {
          return { ...t, isSelected: false }
        })
      )
    }
  }

  function removeAllSelectedTask() {
    setTaskList(taskList.filter(t => !t.isSelected))
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


  function onAddTaskClick() {
    debugger;
    let newTask: Item = {
      id: nextId,
      text: input,
      isDone: false,
      isEditing: false,
      isSelected: false,
      date: Date.now()
    }
    setNextId(nextId + 1)
    setTaskList(taskList => [newTask, ...taskList])
    setInput('')
    sortTaskList();
  }

  return (
    <div className={s.container}>
      <h1>ToDo List</h1>
      <div className={s.form}>
        <textarea className={s.add_input} placeholder='Write some text' value={input} onChange={onInputChange} />
        <button className={s.add_btn} onClick={onAddTaskClick}>Add</button>
      </div>

      <h2>List of Tasks</h2>

      <div className={s.list_head}>
        <div>
          <input type="checkbox" className={s.checkbox_all} checked={isSelectedAll} onClick={selectAllTask} />
          <span>All</span>
        </div>
        <button onClick={removeAllSelectedTask}>{`Remove(${selectedQuantity})`}</button>
      </div>

      <div>
        {taskList.map((t: Item) => (<Task key={t.id} id={t.id} text={t.text}
          task={t} removeTask={removeTask} sortTaskList={sortTaskList} setTaskList={setTaskList}
          changeStatusEdit={changeStatusEdit} editTaskText={editTaskText}
          changeStatusSelected={changeStatusSelected}
          changeStatusDone={changeStatusDone}
        />))}
      </div>

    </div >
  )
}

export default TodoList;