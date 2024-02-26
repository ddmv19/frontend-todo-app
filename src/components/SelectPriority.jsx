/* eslint-disable react/prop-types */

import { useState } from 'react'
import { updateTask } from '../helpers/api'
import { toast } from 'sonner'

export const SelectPriority = ({ actualPriority, todos, updateTodos }) => {
  const [option, setOption] = useState(actualPriority)

  const bgColor =
    option === 'Media'
      ? 'bg-yellow-500'
      : option === 'High'
      ? 'bg-red-300'
      : 'bg-green-300'

  const handleChange = async ({ target }) => {
    const taskToChange =
      target.parentElement.previousSibling.previousSibling.innerText
    const newTodos = [...todos]
    const todoIndex = newTodos.findIndex(({ task }) => task === taskToChange)
    newTodos[todoIndex].priority = target.value
    setOption(target.value)
    updateTodos(newTodos)
    const response = await updateTask(newTodos[todoIndex]) // in DB
    if (response)
      toast.info(
        `${newTodos[todoIndex].task} Priority updated: ${target.value}`
      )
  }

  const options = ['Media', 'High', 'Low']

  return (
    <span
      className={`${bgColor} py-1 px-3 rounded-lg text-xs font-semibold cursor-pointer hover:translate-y-[3px] transition-all bg-opacity-80`}
    >
      <select
        className="bg-transparent outline-none px-1 rounded-lg h-full cursor-pointer dark:text-black"
        value={option}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </span>
  )
}
