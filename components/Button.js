import React from 'react'


const defaultcolor = 'blue';
export default function Button({ twcolor, text, onClick,type }) {
    return (
        <input
            onClick={onClick}
            value={text}
            type={type}
            className={`cursor-pointer inline-block px-7 py-3 bg-${twcolor ?? defaultcolor}-600 select-none text-white font-medium text-sm leading-snug  rounded shadow-md hover:bg-${twcolor ?? defaultcolor}-700 hover:shadow-lg focus:bg-${twcolor ?? defaultcolor}-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-${twcolor ?? defaultcolor}-800 active:shadow-lg transition duration-150 ease-in-out`} />


    )
}
