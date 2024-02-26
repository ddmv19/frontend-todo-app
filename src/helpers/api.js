import { API_URL, getNameMonth } from './constants'

export const loadAllTodos = async (updateTodos) => {
  try {
    const response = await fetch(API_URL)
    const { tasks } = await response.json()
    const allTasks = tasks.map(({task, state, priority, createdAt, deleted}) => {
      const date = new Date(createdAt)
      return {
        task,
        state,
        priority,
        createdAt: {
          month: getNameMonth[date.getMonth() + 1],
          day: date.getDate(),
          year: date.getFullYear(),
        },
        deleted,
      }
    })
    updateTodos(allTasks)
    return tasks.length
  } catch (error) {
    console.log(error)
  }
}

export const createTask = async (task) => {
  const newTask = { task }
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
    return response.ok
  } catch (error) {
    throw new Error(`Error al crear la tarea: ${error}`)
  }
}

export const updateTask = async (body) => {
  try {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return response.ok
  } catch (error) {
    throw new Error(`Error al actualizar la tarea: ${error}`)
  }
}

export const deleteTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    return response.ok
  } catch (error) {
    throw new Error(`Error al actualizar la tarea: ${error}`)
  }
}
