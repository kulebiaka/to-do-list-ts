import React, { useState, useId, useEffect } from 'react'
import Task from '../Task/Task';
import s from './TodoList.module.scss'
import { link } from 'fs';

interface Item {
  id: number;
  text: string;
  isDone: boolean;
  isEditing: boolean;
  isSelected: boolean;
  isShown: boolean
  date: any;
}


const TodoList = () => {

  let savedInitialState = localStorage.getItem("taskList") || JSON.stringify([{ id: 0, text: 'Your first task', isDone: false, isEditing: false, isSelected: false, isShown: true, date: Date.now() }])
  let initialState: Array<Item> = JSON.parse(savedInitialState)

  let [input, setInput] = useState('')
  let [taskList, setTaskList] = useState(initialState)
  let [filter, setFilter] = useState('all')
  let [shownTaskList, setShownTaskList] = useState(taskList.filter((t:Item) => {
    // if(filter === 'finished'){
    //   return (t.isDone === true)
    // }else if(filter === 'unfinished'){
    //   return (t.isDone === false)
    // }else{
    //   return t;
    // }
    return t.isShown
  }))

  useEffect(() => {
    setShownTaskList(taskList.filter((t:Item) => t.isShown))
  }, [taskList])
  useEffect(() => {
    if(filter === 'finished'){
      setTaskList(taskList.map((t:Item) => { return t.isDone ? {...t, isShown: true } : {...t, isShown: false, isSelected: false}}))
    }else if(filter === 'unfinished'){
      setTaskList(taskList.map((t:Item) => { return !t.isDone ? {...t, isShown: true } : {...t, isShown: false, isSelected: false}}))
    }else{
      setTaskList(taskList.map((t:Item) => { return {...t, isShown: true}}))
    }
  },[filter])
  useEffect(() => {

  })

  let selectedQuantity = (taskList.reduce((acc, t: Item) => { return t.isSelected ? acc + 1 : acc }, 0))
  let isSelectedAll = ((shownTaskList.length > 0) && (selectedQuantity === shownTaskList.length))

  console.log(taskList)
  // localStorage.clear()
  localStorage.setItem("taskList", JSON.stringify(taskList))

  function defaultSort(a: Item, b:Item){
    if (a.isDone > b.isDone) {
      return 1
    } else if (a.isDone < b.isDone) {
      return -1;
    }
    return b.id - a.id
  }

  function sortTaskList(funcForSort = defaultSort) {
    setTaskList(taskList => [...taskList].sort(funcForSort))
  }

  function onAddTaskClick() {
    debugger;
    let dateNow = new Date();
    let date = `${dateNow.getDate()}.${dateNow.getMonth()+1}.${dateNow.getFullYear()} ${dateNow.getHours()}:${(dateNow.getMinutes() / 10 < 1 )? '0' + dateNow.getMinutes().toString() : dateNow.getMinutes() }`;
    let newTask: Item = {
      id: Date.now(),
      text: input,
      isDone: false,
      isEditing: false,
      isSelected: false,
      isShown: true,
      date: date
    }
    setTaskList(taskList => [newTask, ...taskList])
    setInput('')
    sortTaskList();
  }
  
  function selectAllTask(e: any) {
    if (e.target.checked === true) {
      setTaskList(
        taskList.map((t: Item) => {
          return { ...t, isSelected: true && t.isShown}
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

  function updateFilter(e:any){
    setFilter(e.target.value)
    console.log(e.target.value)
  }

  function removeAllSelectedTask() {
    setTaskList(taskList.filter(t => !t.isSelected))
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



  return (
    <div className={s.container}>
      <h1>ToDo List</h1>
      <div className={s.form}>
        <textarea className={s.add_input} placeholder='Write some text' value={input} onChange={onInputChange} />
        {/* <input type="datetime-local" /> */}
        <button className={s.add_btn} onClick={onAddTaskClick}>Add</button>
      </div>

      <h2>List of Tasks</h2>

      <div className={s.list_head}>
        <div>
          <input type="checkbox" className={s.checkbox_all} checked={isSelectedAll} onClick={selectAllTask} />
          <span>All</span>
        </div>
        <select name="" id = "" value={filter} onChange={updateFilter}>
          <option value="all">All</option>
          <option value="finished">Finished</option>
          <option value="unfinished">Unfinished</option>
        </select>
        <button onClick={removeAllSelectedTask} className={s.remove}>{`Remove(${selectedQuantity})`}</button>
      </div>

      <div>
        {shownTaskList.map((t: Item) => (<Task key={t.id} id={t.id} text={t.text}
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