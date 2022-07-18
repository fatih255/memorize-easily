import React from 'react'

export default function InputError({ error, extraclass }) {
    return (
        error ? <span className={`text-red-600 text-sm block ${extraclass ?? ''}`}>{error.message}</span> : null
    )
}
