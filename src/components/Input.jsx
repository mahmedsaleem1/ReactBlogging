// Import React hooks - useId creates unique IDs for accessibility
import { useId, } from 'react'

// React.forwardRef allows parent components to access this input directly
// Useful for form libraries and focusing inputs programmatically
const Input = React.forwardRef(function Input (
    {   label,              // Optional text to show above input
        type = 'text',      // Input type (text, email, password, etc.) - defaults to 'text'
        className = '',     // Additional CSS classes from parent - defaults to empty
        ...props            // All other props (placeholder, required, onChange, etc.) passed from parent
    }, ref                  // Reference passed from parent to access this input element
) {
    // Generate unique ID for this input - connects label to input for accessibility
    const id = useId()
    
    return (
        <div className='w-full'>
            {/* Only show label if one is provided */}
            {  label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}  // Links this label to the input below (accessibility & SEO)
            >
                {label}       {/* Display the label text */}
            </label>  }
            
            {/* The actual input field */}
            <input 
                type={type}   // Use the type passed from parent (text, email, etc.)
                className={`px-3 py-2 rounded-lg bg-white text-black
                    outline-non focus:bg-gray-50 duration-200 border
                    border-gray-200 w-full ${className}`}  // Base styling + any extra classes
                ref={ref}     // Forward the ref so parent can access this input element
                {...props}    // Spread all other props (placeholder, onChange, value, etc.)
                id={id}       // Same ID as htmlFor above - connects label to input

            />
        </div>
    )
}) 

export default Input