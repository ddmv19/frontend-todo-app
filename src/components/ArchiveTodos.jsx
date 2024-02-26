/* eslint-disable react/prop-types */
import { DeleteIcon } from './Icons'
import { SelectPriority } from './SelectPriority'
import { SelectState } from './SelectState'
import { useTodos } from '../hooks/useTodos'

export const ArchiveTodos = () => {
  const { todos, setTodos, archiveTodos, handleDelete, numberArchiveTasks } =
    useTodos()

  return (
    <>
      <div className="flex flex-row items-center gap-4 mt-7 pb-4 border-b-2 border-gray-400">
        <h3 className="text-xl font-semibold">
          Archives{' '}
          <span className="text-xs font-extrabold text-gray-400">
            ({numberArchiveTasks})
          </span>
        </h3>
        <span className="px-4 py-1 text-xs font-bold rounded-lg border-2 border-gray-200 bg-gray-300 shadow-md shadow-gray-400 dark:text-black">
          Archive
        </span>
      </div>
      <section className="flex flex-col mt-4 opacity-35">
        {archiveTodos.map(({ task, state, priority, createdAt }) => (
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
