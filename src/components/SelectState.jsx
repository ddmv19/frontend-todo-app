/* eslint-disable react/prop-types */

import { useState } from 'react'
import { updateTask } from '../helpers/api'
import { toast } from 'sonner'

export const SelectState = ({ actualState, todos, updateTodos }) => {
  const [option, setOption] = useState(actualState)

  const bgColor =
    option === 'In Progress'
      ? 'bg-blue-400'
      : option === 'Not Started'
      ? 'bg-gray-400'
      : option === 'Completed'
      ? 'bg-green-500'
      : 'bg-gray-200'

  const handleChange = async ({ target }) => {
    const taskToChange = target.parentElement.previousSibling.innerText
    const newTodos = [...todos]
    const todoIndex = todos.findIndex(({ task }) => taskToChange === task)
    newTodos[todoIndex].state = target.value
    console.log(newTodos[todoIndex])
    if (target.value === 'Completed') newTodos[todoIndex].priority = 'Low'
    setOption(target.value)
    updateTodos(newTodos)
    const response = await updateTask(newTodos[todoIndex]) // in DB
    if (response)
      toast.info(`${newTodos[todoIndex].task} State updated: ${target.value}`)
  }

  const options = ['In Progress', 'Not Started', 'Completed', 'Archive']
  return (
    <span
      className={`${bgColor} py-1 px-3 rounded-lg text-xs font-semibold cursor-pointer hover:translate-y-[-3px] transition-transform`}
    >
      <select
        className="bg-transparent outline-none px-1 rounded-lg h-full cursor-pointer dark:text-black"
        value={option}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </span>
  )
}
