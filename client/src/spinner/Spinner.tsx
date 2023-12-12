import React from 'react'
import './spiner.css'
const Spinner = () => {
    return (
        <div className='flex absolute  h-screen items-center justify-center right-0 left-0 top-0 bottom-0 '>

            <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
        </div>
    )
}

export default Spinner