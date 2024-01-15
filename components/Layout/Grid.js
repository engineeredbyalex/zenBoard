import React from 'react'

function Grid({ children }) {
    return (
        <div className='flex flex-col items-center justify-center 2xl:grid grid-cols-2 gap-5 '>{children}</div>
    )
}

export default Grid