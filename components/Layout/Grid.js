import React from 'react'

function Grid({ children }) {
    return (
        <div className='flex flex-col items-center justify-center lg:grid grid-cols-3 gap-10  py-[3rem] '>{children}</div>
    )
}

export default Grid