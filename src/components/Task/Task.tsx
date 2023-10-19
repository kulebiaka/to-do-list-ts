import React, { useState } from 'react'
import s from './Task.module.scss'

// let taskDependOnStatus = {
//   'pending': (<div className={s.task}>
//       <div className={s.text}>{props.text}</div>
//       <div>Date</div>
//       <button className={s.edit} onClick={() => (props.changeStatusEdit(props.id))}>Edit</button>
//       <button className={s.remove} onClick={()=>{props.removeTask(props.id)}}>Remove</button>
//   </div>),
//   'done': (<div className={s.task}>
//     <div className={s.text}>{props.text}</div>
//     <div>Date</div>
//     <button className={s.edit} onClick={() => (props.changeStatusEdit(props.id))}>Edit</button>
//     <button className={s.remove} onClick={()=>{props.removeTask(props.id)}}>Remove</button>
//   </div>),
//   'editing':(<div className={s.task}>
//     <div className={s.text}>{props.text}</div>
//     <div>Date</div>
//     <button className={s.edit} onClick={() => (props.changeStatusEdit(props.id))}>Edit</button>
//     <button className={s.remove} onClick={()=>{props.removeTask(props.id)}}>Remove</button>
//   </div>)
// }

const Task = (props: any) => {

  let [task, setTask] = useState(props.task)

  function changeStatusEdit(){
    setTask({
      ...task,
      status: 'editing'
    })
  }

  function changeStatusPending(){
    setTask({
      ...task,
      status: 'pending'
    })
  }

  function editTaskText(e: any){
    setTask({
      ...task,
      text: e.target.value
    })
  }

  return (
    <div className={s.task}>
      {task.status == 'editing' ? (<input value={task.text} onChange={editTaskText}/>) : (<div className={s.text}>{task.text}</div>)}
      <div>Date</div>
      {task.status == 'editing' ? (<button className={s.edit} onClick={changeStatusPending}>Save</button>) : (<button className={s.edit} onClick={changeStatusEdit}>Edit</button>)}
      <button className={s.remove} onClick={()=>{props.removeTask(task.id)}}>Remove</button>
    </div>
  )
}

export default Task;