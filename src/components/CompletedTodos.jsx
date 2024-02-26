/* eslint-disable react/prop-types */
import { DeleteIcon } from './Icons'
import { SelectPriority } from './SelectPriority'
import { SelectState } from './SelectState'
import { useTodos } from '../hooks/useTodos'

export const CompletedTodos = () => {
  const {
    todos,
    setTodos,
    completedTodos,
    handleDelete,
    numberCompletedTasks,
  } = useTodos()

  return (
    <>
      <div className="flex flex-row items-center gap-4 mt-7 pb-4 border-b-2 border-gray-400">
        <h3 className="text-xl font-semibold">
          Completed{' '}
          <span className="text-xs font-extrabold text-green-500">
            ({numberCompletedTasks})
          </span>
        </h3>
        <span className="px-3 py-1 text-xs font-bold rounded-lg border-2 border-green-700 bg-green-400 shadow-md shadow-green-400 dark:text-black dark:bg-green-800 dark:shadow-green-700 dark:border-none">
          Completed
        </span>
      </div>
      <section className="flex flex-col mt-4">
        {completedTodos.map(({ task, state, priority, createdAt }) => (
          <div
            className="flex flex-row items-center justify-between py-3 border-b border-gray-400"
            key={task}
          >
            <h4>{task}</h4>
            <SelectState
              actualState={state}
              todos={todos}
              updateTodos={setTodos}
            />
            <SelectPriority
              actualPriority={priority}
              todos={todos}
              updateTodos={setTodos}
            />
            <div className="flex flex-row gap-2 items-center">
              <span className="font-bold text-xs py-1 px-2 bg-slate-500 text-gray-200 rounded-md dark:text-gray-900">
                created:
              </span>
              <span className="text-sm font-semibold text-slate-700">
                {createdAt.month} {createdAt.day}
              </span>
            </div>
            <DeleteIcon
              className="w-6 h-6 cursor-pointer hover:bg-red-500 transition-all hover:rounded-sm hover:scale-125 dark:text-slate-300 dark:hover:text-slate-500"
              onClick={handleDelete}
            />
          </div>
        ))}
      </section>
    </>
  )
}
