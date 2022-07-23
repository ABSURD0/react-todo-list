import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'

import './App.css'

function App() {
  //Task todo list STATE

  const [toDo, setToDo] = useState([
    { id: 1, title: 'Task 1', status: false },
    { id: 2, title: 'Task 2', status: false },
  ])

  //TEMP STATE

  const [newTask, setNewTask] = useState('')

  const [updateData, setUpdateData] = useState('')

  //ADD TASK

  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('')
    }
  }

  //DELETE TASK

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id)
    setToDo(newTasks)
  }

  //Mark task as COMPLETED

  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status }
      }
      return task
    })
    setToDo(newTask)
  }

  //CANCLE UPDATE

  const cancelUpdate = (id) => {
    setUpdateData('')
  }

  //CHANGE TASK FOR UPDATE

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    }
    setUpdateData(newEntry)
  }

  //UPDATE TASK

  const updateTask = (e) => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id)
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject)
    setUpdateData('')
  }

  return (
    <div className='container App '>
      <br />
      <br />
      <h1>To Do List (React.js)</h1>
      <br /> <br />
      {/* UPDATE TASK  */}
      {/* ///////////////////////// */}
      {updateData && updateData ? (
        <>
          <div className='row'>
            <div className='col'>
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className='form-control form-control-lg'></input>
            </div>
            <div className='col-auto'>
              <button
                onClick={updateTask}
                className='btn btn-lg btn-success mr-20'>
                Update
              </button>
              <button
                onClick={cancelUpdate}
                className='btn btn-lg btn-warning mr-20'>
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          {/* ADD TASK  */}
          {/* /////////////////////// */}
          <div className='row'>
            <div className='col'>
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className='form-control form-control-lg'></input>
            </div>
            <div className='col-auto'>
              <button onClick={addTask} className='btn btn-lg btn-success'>
                Add Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}
      {/* DISPLAY TODO */}
      {/* ////////////////////////////// */}
      {toDo && toDo.length ? '' : 'No Tasks...'}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className='col taskBg'>
                  <div className={task.status ? 'done' : ''}>
                    <span className='taskNumber'>{index + 1}</span>
                    <span className='taskText'>{task.title}</span>
                  </div>
                  <div className='iconsWrap'>
                    <span>
                      <FontAwesomeIcon
                        title='Mark Task Complete'
                        onClick={(e) => markDone(task.id)}
                        icon={faCircleCheck}
                      />
                    </span>
                    {task.status ? null : (
                      <span>
                        <FontAwesomeIcon
                          onClick={() =>
                            setUpdateData({
                              id: task.id,
                              title: task.title,
                              status: task.status ? true : false,
                            })
                          }
                          title='Edit Task'
                          icon={faPen}
                        />
                      </span>
                    )}

                    <span>
                      <FontAwesomeIcon
                        title='Delete Task'
                        onClick={() => deleteTask(task.id)}
                        icon={faTrashCan}
                      />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            )
          })}
    </div>
  )
}

export default App
