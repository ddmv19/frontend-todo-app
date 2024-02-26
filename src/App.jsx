import './App.css'
import { useState } from 'react'
import { Toaster } from 'sonner'
import { ActiveTodos } from './components/ActiveTodos'
import { CompletedTodos } from './components/CompletedTodos'
import { ArchiveTodos } from './components/ArchiveTodos'
import { useTodos } from './hooks/useTodos'

function App() {
  const { numberActiveTasks, createNewTodo } = useTodos()
  const [inputValue, setInputValue] = useState('')

  const handleChange = ({ target }) => {
    setInputValue(target.value)
  }

  return (
    <main className="w-[100%] min-h-[100vh] p-12 px-20 bg-cyan-50 dark:bg-[#171717] dark:text-white">
      <h1 className="text-3xl font-extrabold">
        You've got{' '}
        <span className="text-blue-500">{numberActiveTasks} task</span>
      </h1>
      <form
        className="flex flex-row items-center gap-5 mt-5"
        onSubmit={(event) => createNewTodo(event, inputValue, setInputValue)}
      >
        <input
          className="flex-1 h-fit py-3 px-3 border-2 border-green-500 rounded-lg text-green-500 text-lg font-semibold focus:outline-none focus:border-green-600 dark:bg-transparent dark:border-green-800 dark:focus:border-green-700"
          type="text"
          placeholder="New Task..."
          value={inputValue}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="flex-3 h-fit py-4 px-6 bg-red-600 font-semibold text-white rounded-md hover:bg-red-500 transition-all"
        >
          Create
        </button>
      </form>
      <ActiveTodos />
      <CompletedTodos />
      <ArchiveTodos />
      <Toaster richColors />
    </main>
  )
}

export default App
