/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from 'react'
import { loadAllTodos } from '../helpers/api'

export const TodosContext = createContext()

export const TodosProvider = ({children}) => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    loadAllTodos(setTodos)
  }, [])

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}