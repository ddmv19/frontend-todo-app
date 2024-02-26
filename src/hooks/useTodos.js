import { useContext } from 'react'
import { TodosContext } from '../context/todos'
import { createTask, deleteTask } from '../helpers/api'
import { getNameMonth } from '../helpers/constants'
import { toast } from 'sonner'

export const useTodos = () => {
  const { todos, setTodos } = useContext(TodosContext)

  const activeTodos = todos.filter(
    ({ state }) => state !== 'Completed' && state !== 'Archive'
  )
  const completedTodos = todos.filter(({ state }) => state === 'Completed')
  const archiveTodos = todos.filter(({ state }) => state === 'Archive')

  const numberActiveTasks = activeTodos.length
  const numberNotStartedTasks = activeTodos.filter(({state}) => state === 'Not Started').length
  const numberInProgressTasks = activeTodos.filter(({state}) => state === 'In Progress').length
  const numberCompletedTasks = completedTodos.length
  const numberArchiveTasks = archiveTodos.length

  const createNewTodo = async (event, inputValue, setInputValue) => {
    event.preventDefault()
    const repeated = todos.find(({task}) => task === inputValue)
    if (!inputValue) {
      toast.warning('You must write something')
      return false
    } else if (repeated) {
      toast.error(`${inputValue} is repeated`)
      return false
    }
    
    const date = new Date()

    const newTask = {
      task: inputValue,
      createdAt: {
        month: getNameMonth[date.getMonth() + 1],
        day: date.getDate(),
        year: date.getFullYear()
      },
      deleted: false,
      priority: 'Media',
      state: 'Not Started',
    }

    setTodos([...todos, newTask])
    const response = await createTask(inputValue)
    if (response) toast.success(`New Task: ${inputValue}`)
    setInputValue('')
  }

  const handleDelete = async ({ target }) => {
    const elementClicked = target.tagName
    let taskToDelete = {}
    if (elementClicked === 'svg') {
      taskToDelete = {
        task: target.previousSibling.previousSibling.previousSibling.previousSibling.innerText,
      }
    } else if (elementClicked === 'path') {
      taskToDelete = {
        task: target.parentElement.previousSibling.previousSibling
          .previousSibling.previousSibling.innerText,
      }
    }
    const response = await deleteTask(taskToDelete)
    if (response) toast.success(`Delete: ${taskToDelete.task}`)
    const newTodos = [...todos]
    const todoIndex = newTodos.findIndex(
      ({ task }) => task === taskToDelete.task
    )
    newTodos[todoIndex].deleted = true
    setTodos(newTodos.filter(({ deleted }) => !deleted))
  }

  return {
    todos,
    setTodos,
    numberActiveTasks,
    numberCompletedTasks,
    numberArchiveTasks,
    numberNotStartedTasks,
    numberInProgressTasks,
    createNewTodo,
    handleDelete,
    activeTodos,
    completedTodos,
    archiveTodos,
  }
}
