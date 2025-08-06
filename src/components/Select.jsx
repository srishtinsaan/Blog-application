import { useId } from "react"
function Select({
    options , 
    label,
    className = '',
    ...props
}, ref) {

    const Id = useId()


  return (
    <div className="w-full">
        { label && <label htmlFor={Id} className="" ></label>}
        <select 
            {...props}
            id={Id}
            ref = {ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 
                duration-200 border border-gray-200 w-full ${className}`}

            
        >

            {/* {options.map((item) => )}  we can't do this */}
              {/* what if options array has no value then map will crash */}
              {/* solution : either we can check by if else that options.length >0 or not or simply do this... ? : thing */}
               
               {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
               )
            )}

        </select>
    </div>
  )
}

export default React.forwardRef(Select)

