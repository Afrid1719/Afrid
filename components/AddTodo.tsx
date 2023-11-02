'use client'

import React, { useId, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

type DueDateType = {
  startDate: Date | null
  endDate: Date | null
}

const AddTodo = () => {
  const descriptionInputId = useId()
  const titleInputId = useId()
  const dueDateInputId = useId()
  const [dueDate, dueDateChanged] = useState<DueDateType>({
    startDate: null,
    endDate: null,
  })

  const handleDueDateChange = (newVal: any) => {
    console.log('due date', newVal)
    dueDateChanged(newVal)
  }

  return (
    <div className="w-11/12 rounded border-2 border-slate-400 shadow-xl shadow-slate-500 my-3 mx-auto p-5">
      <form className="">
        <div className="mb-6">
          <label
            htmlFor={titleInputId}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Todo
          </label>
          <input
            type="text"
            id={titleInputId}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor={descriptionInputId}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id={descriptionInputId}
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your description here..."
            required
          ></textarea>
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor={dueDateInputId}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Due Date
          </label>
          <div className="relatve w-8/12">
            <Datepicker
              inputClassName={
                'relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-2 border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white   disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500'
              }
              inputId={dueDateInputId}
              value={dueDate}
              onChange={handleDueDateChange}
              asSingle={true}
              useRange={false}
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto block"
        >
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo
