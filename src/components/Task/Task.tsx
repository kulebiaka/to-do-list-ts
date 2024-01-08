import React from 'react'
import s from './Task.module.scss'

type PropsType = {

}

const Task = (props: any) => {
  let task = props.task

  function changeStatusEdit() {
    props.changeStatusEdit(props.id)
  }

  function editTaskText(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
        (<textarea value={task.text} onChange={editTaskText} style={{maxWidth: '1000px', minWidth: '1000px'}}/>) :
        (<>
          <input type='checkbox' id={'task' + ':' + task.id} className={s.checkbox} checked={task.isSelected} onChange={changeStatusSelected} />
          <div className={s.text} style={{ textDecoration: task.isDone ? 'line-through 2px' : 'none' }}>{task.text || `some text`}</div>
          <div className={s.date}>{task.date}</div>
        </>)}

      <div className={s.btns}>
        {task.isEditing ? (<button className={s.save} onClick={changeStatusEdit}></button>) : (<><button className={s.edit} onClick={changeStatusEdit}></button> <button className={s.done} onClick={changeStatusDone}></button></>)}
        <button className={s.remove} onClick={() => { props.removeTask(task.id) }}></button>
      </div>
    </div>
  )
}

export default Task;