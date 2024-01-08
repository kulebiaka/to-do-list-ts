import React, { useState, useId, useEffect } from 'react'
import Task from '../Task/Task';
import s from './TodoList.module.scss'

interface Item {
  id: number;
  text: string;
  isDone: boolean;
  isEditing: boolean;
  isSelected: boolean;
  isShown: boolean
  date: string;
}

const TodoList = () => {

  let savedInitialState = localStorage.getItem("taskList") || JSON.stringify([{ id: 0, text: 'Your first task', isDone: false, isEditing: false, isSelected: false, isShown: true, date: '' }])
  let initialState: Array<Item> = JSON.parse(savedInitialState)

  let [input, setInput] = useState<string>('')
  let [taskList, setTaskList] = useState<Array<Item>>(initialState)
  let [filter, setFilter] = useState<string>('all')
  let [shownTaskList, setShownTaskList] = useState(taskList.map((t:Item) => t))

  localStorage.setItem("taskList", JSON.stringify(taskList))

  useEffect(() => {
    setShownTaskList(taskList.filter((t:Item) => t.isShown))
  }, [taskList])
  useEffect(updateTaskListByFilter, [filter])

  let selectedQuantity = (taskList.reduce((acc: number, t: Item) => { return t.isSelected ? acc + 1 : acc }, 0))
  let isSelectedAll = ((shownTaskList.length > 0) && (selectedQuantity === shownTaskList.length))

  function updateTaskListByFilter(){
    if(filter === 'finished'){
      setTaskList(taskList.map((t:Item) => { return t.isDone ? {...t, isShown: true } : {...t, isShown: false, isSelected: false}}))
    }else if(filter === 'unfinished'){
      setTaskList(taskList.map((t:Item) => { return !t.isDone ? {...t, isShown: true } : {...t, isShown: false, isSelected: false}}))
    }else{
      setTaskList(taskList.map((t:Item) => { return {...t, isShown: true}}))
    }
  }
  
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
    let dateNow = new Date();
    let date = `${dateNow.getDate()}.${dateNow.getMonth()+1}.${dateNow.getFullYear()} ${dateNow.getHours()}:${(dateNow.getMinutes() / 10 < 1 )? '0' + dateNow.getMinutes().toString() : dateNow.getMinutes() }`;
    let newTask: Item = {
      id: Date.now(),
      text: input,
      isDone: false,
      isEditing: false,
      isSelected: false,
      isShown: filter === 'finished' ? false : true,
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

  function updateFilter(e: React.ChangeEvent<HTMLSelectElement>){
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
        return {
          ...t,
          isEditing: false
        }
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
          isDone: !t.isDone,
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

  function onInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
        <button className={s.add_btn} onClick={onAddTaskClick}>Add</button>
      </div>

      <div className={s.list_head}>
        <div>
          <input type="checkbox" className={s.checkbox_all} checked={isSelectedAll} onChange={selectAllTask} />
          <span>All</span>
        </div>
        <select name="filter" id = "filter" value={filter} onChange={updateFilter}>
          <option value="all">All</option>
          <option value="finished">Finished</option>
          <option value="unfinished">Unfinished</option>
        </select>
        <button onClick={removeAllSelectedTask} className={s.remove}>{`Remove (${selectedQuantity})`}</button>
      </div>

      <div>
        {shownTaskList.map((t: Item, n: number) => (<Task key={n} id={t.id} text={t.text}
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

