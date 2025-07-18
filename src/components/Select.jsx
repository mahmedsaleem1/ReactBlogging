import {useId} from 'react'

const Select = ({
    options,
    label,
    classNme = '',
    ...props
}, ref) => {
    const id = useId()
  return (
    <div className='w-full'>
        {label && 
            <label
                className=''
                htmlFor={id}
            >
             {label}
            </label>}
        <select
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none
                 focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classNme}`}
        >
           {
            options?.map((option) => {
                <option key={option} value={option}>
                    {option}
                </option>
            })
           } 
        </select>
    </div>
  )
}

export default React.forwardRef(Select)