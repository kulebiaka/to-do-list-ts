import React from 'react'
import s from './Task.module.scss'

const Task = (props: any) => {
  let task = props.task

  function changeStatusEdit() {
    props.changeStatusEdit(props.id)
  }

  function editTaskText(e: any) {
    props.editTaskText(props.id, e.target.value)
  }

  function changeStatusSelected() {
    props.changeStatusSelected(props.id)
  }

  function changeStatusDone() {
    props.changeStatusDone(props.id)
  }

  return (
    <div className={s.task} id={task.id}>
      {task.isEditing ?
        (<textarea value={task.text} onChange={editTaskText} />) :
        (<>
          <input type='checkbox' id={'task' + ':' + task.id} className={s.checkbox} checked={task.isSelected} onClick={changeStatusSelected} />
          <div className={s.text} style={{ textDecoration: task.isDone ? 'line-through 2px' : 'none' }}>{task.text || `task:${task.id}`}</div>
        </>)}

      <div className={s.btns}>
        {task.isEditing ? (<button className={s.save} onClick={changeStatusEdit}></button>) : (<><button className={s.edit} onClick={changeStatusEdit}></button> <button className={s.done} onClick={changeStatusDone}></button></>)}
        <button className={s.remove} onClick={() => { props.removeTask(task.id) }}></button>
      </div>
    </div>
  )
}

export default Task;