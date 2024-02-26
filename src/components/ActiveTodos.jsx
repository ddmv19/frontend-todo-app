import { DeleteIcon } from './Icons'
import { SelectPriority } from './SelectPriority'
import { SelectState } from './SelectState'
import { useTodos } from '../hooks/useTodos'

export const ActiveTodos = () => {
  const {
    todos,
    setTodos,
    activeTodos,
    handleDelete,
    numberNotStartedTasks,
    numberInProgressTasks,
  } = useTodos()

  return (
    <>
      <div className="flex flex-row items-center gap-4 mt-7 pb-4 border-b-2 border-gray-400">
        <h3 className="text-xl font-semibold">On Hold</h3>
        <span className="px-3 py-1 text-xs font-bold rounded-lg border-2 border-gray-700 bg-gray-400 shadow-md shadow-gray-400 dark:text-black dark:bg-gray-600 dark:shadow-gray-600 dark:border-none">
          Not Started{' '}
          <span className="font-extrabold text-gray-200 text-[0.60rem] dark:text-gray-400">
            ({numberNotStartedTasks})
          </span>
        </span>
        <span
          className="px-3 py-1 text-xs font-bold rounded-lg border-2 border-blue-700 bg-blue-400 shadow-md shadow-blue-400 dark:text-black
        dark:bg-blue-500 dark:shadow-blue-600 dark:border-none"
        >
          In Progress{' '}
          <span className="font-extrabold text-blue-700 text-[0.60rem] dark:text-blue-300">
            ({numberInProgressTasks})
          </span>
        </span>
      </div>
      <section className="flex flex-col mt-4">
        {activeTodos.map(({ task, state, priority, createdAt }) => (
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
              <span className="font-bold text-xs py-1 px-2 bg-slate-500 text-gray-200 rounded-md dark:bg-slate-300 dark:text-gray-900">
                created:
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-100">
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
